from fastapi import APIRouter, Depends, HTTPException, Path, Request, Response, Query
from typing import List, Union
from ..models.club_model import ClubDetail
from ..utils.database import Neo4j, get_neo4j
from ..utils.club_util import extract_club_data, get_total_clubs_by_name, get_total_recommend_clubs, get_total_clubs_class
from fastapi_microsoft_identity import requires_auth, AuthError, validate_scope
import os
from ..utils.model_util import predict_class

clubRouter = APIRouter(
    prefix="/clubs",
    tags=["clubs"],
)

token_scp = os.environ.get('AZURE_AD_ACCESS_TOKEN_SCP')

@clubRouter.post("/predict/user/{user_id}")
@requires_auth
async def recommend_clubs(
    request: Request,
    user_id: int = Path(...,description="The ID of the user to retrieve"),
    neo4j: Neo4j = Depends(get_neo4j)
):
    try:
        # Validate the scope of the request
        validate_scope(token_scp,request)

        sorted_classes = await predict_class('clubs_by_name', user_id)

        # # Delete previous recommendations
        delete_query = f"""MATCH (userNode:User)-[r:INTEREST_IN]->(clubClassNode:Bert_Name) 
        WHERE userNode.UserID = $user_id DELETE r"""
        delete_params = {"user_id": user_id}
        await neo4j.query(delete_query, delete_params)

        # # Predict clubs recommendation based on the predicted group
        predict_query = f"""MATCH (userNode:User), (clubClassNode:Bert_Name)
        WHERE userNode.UserID = $user_id AND clubClassNode.clusterNo = $club_class
        CREATE (userNode)-[r:INTEREST_IN]->(clubClassNode)
        SET r.Priority = $index"""
        predict_params = {"user_id": user_id}
        for index, club_class in enumerate(sorted_classes,start=1):
            predict_params["club_class"] = club_class
            predict_params["index"] = index
            await neo4j.query(predict_query, predict_params)

        return {"message": "Update clubs recommendation successfully."}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@clubRouter.get("/recommend/user/{user_id}")
@requires_auth
async def recommend_clubs(
    request: Request,
    user_id: int = Path(...,description="The ID of the user to retrieve"),
    page_number: int = Query(1, description="Page number, starting from 1"),
    results_size: int = Query(10, description="Number of items per page"),
    priority: int = Query(1, description="Priority of the recommendation"),
    neo4j: Neo4j = Depends(get_neo4j)
):
    try:
        # Validate the scope of the request
        validate_scope(token_scp,request)

        # Calculate SKIP and LIMIT values for pagination
        skip = (page_number - 1) * results_size
        
        # Get total classes
        total_classes = await get_total_clubs_class()
        if total_classes == 0:
            raise HTTPException(status_code=404, detail="No class found.")
        if total_classes < priority:
            raise HTTPException(status_code=404, detail="Priority out of range.")

        # Get total clubs
        total_clubs = await get_total_recommend_clubs(user_id,priority)
        if total_clubs == 0:
            raise HTTPException(status_code=404, detail="No club found.")
        if total_clubs < skip:
            raise HTTPException(status_code=404, detail="Page number out of range.")

        # Query to recommend clubs with pagination
        recommend_query = f"""MATCH (clubNode:Club)-[:DESCRIPT_BY_CLUP_ACTIVITY_NAME_AS]->(clubClassNode:Bert_Name)
        <-[interest:INTEREST_IN]-(userNode:User)
        WHERE userNode.UserID = $user_id AND interest.Priority = $priority
        RETURN clubNode SKIP $skip LIMIT $limit"""
        recommend_params = {"user_id": user_id, "priority": priority, "skip": skip, "limit": results_size}
        results = await neo4j.query(recommend_query, recommend_params, fetch_all=True)
        clubs_data = extract_club_data(results)
        
        has_next_page = True if total_clubs > skip + results_size else False
        has_next_class = True if total_classes > priority + 1 else False
        return {"clubs": clubs_data, "has_next_page": has_next_page, "has_next_class": has_next_class}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@clubRouter.get("/{club_name}")
@requires_auth
async def club_search(
    request: Request,
    club_name: str = Path(...,description="The name of the club"),
    page_number: int = Query(1, description="Page number, starting from 1"),
    results_size: int = Query(10, description="Number of items per page"),
    neo4j: Neo4j = Depends(get_neo4j)
):
    # Implement your Neo4j query to retrieve data based on the club_name
    try:
        # Validate the scope of the request
        validate_scope(token_scp,request)

        # Calculate SKIP and LIMIT values for pagination
        skip = (page_number - 1) * results_size

        # Get total clubs
        total_clubs = await get_total_clubs_by_name(club_name)
        if total_clubs == 0:
            raise HTTPException(status_code=404, detail="No club found.")
        if total_clubs < skip:
            raise HTTPException(status_code=404, detail="Page number out of range.")

        # Query to search for clubs with pagination
        club_params = {"club_name": club_name, "skip": skip, "limit": results_size}
        club_query = f"""MATCH (clubNode:Club) WHERE clubNode.ClubName 
        CONTAINS $club_name OR clubNode.ClubNameEng CONTAINS $club_name 
        RETURN clubNode SKIP $skip LIMIT $limit"""
        results = await neo4j.query(club_query, club_params, fetch_all=True)
        club_data = extract_club_data(results)
        has_next_page = True if total_clubs > skip + results_size else False
        return {"clubs": club_data, "has_next_page": has_next_page}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@clubRouter.post("/join/{club_id}")
@requires_auth
async def join_club(
    request: Request,
    club_id: str = Path(...,description="The ID of the club to join"),
    user_id: int = Query(...,description="The ID of the user joining the club"),
    neo4j: Neo4j = Depends(get_neo4j)
):
    try:
        validate_scope(token_scp,request)
        query = f"""MATCH (userNode:User), (clubNode:Club) WHERE userNode.UserID = $user_id AND clubNode.ClubID = $club_id
        CREATE (userNode)-[:JOINED]->(clubNode)"""
        params = {"user_id": user_id, "club_id": club_id}
        await neo4j.run(query, params)
        return {"message": "User joined the club successfully."}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@clubRouter.delete("/leave/{club_id}")
@requires_auth
async def leave_club(
    request: Request,
    club_id: str = Path(...,description="The ID of the club to leave"),
    user_id: int = Query(...,description="The ID of the user leaving the club"),
    neo4j: Neo4j = Depends(get_neo4j)
):
    try:
        validate_scope(token_scp,request)
        query = f"""MATCH (userNode:User)-[r:JOINED]->(clubNode:Club) 
        WHERE userNode.UserID = $user_id AND clubNode.ClubID = $club_id DELETE r"""
        params = {"user_id": user_id, "club_id": club_id}
        await neo4j.run(query, params)
        return {"message": "User left the club successfully."}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))