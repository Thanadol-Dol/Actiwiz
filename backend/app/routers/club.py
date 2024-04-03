from fastapi import APIRouter, Depends, HTTPException, Path, Request, Response, Query
from typing import List, Union
from ..models.club_model import ClubDetail
from ..utils.database import Neo4j, get_neo4j
from fastapi_microsoft_identity import initialize, requires_auth, AuthError, validate_scope
import os

clubRouter = APIRouter(
    prefix="/clubs",
    tags=["clubs"],
)
initialize(
    tenant_id_=os.environ.get('AZURE_AD_TENANT_ID'), 
    client_id_=os.environ.get('AZURE_AD_CLIENT_ID')
)

token_scp = os.environ.get('AZURE_AD_ACCESS_TOKEN_SCP')

#Recommend clubs

@clubRouter.get("/{club_name}", response_model=Union[List[ClubDetail], str])
@requires_auth
async def club_search(
    request: Request,
    club_name: str = Path(...,description="The name of the club"), 
    neo4j: Neo4j = Depends(get_neo4j)
):
    # Implement your Neo4j query to retrieve data based on the club_name
    try:
        validate_scope(token_scp,request)
        query = f"""MATCH (clubNode:Club) WHERE clubNode.ClubName 
        CONTAINS $club_name OR clubNode.ClubNameEng CONTAINS $club_name RETURN clubNode"""
        params = {"club_name": club_name}
        results = await neo4j.query(query, params, fetch_all=True)
        search_results = []
        for result in results:
            result_node = result['clubNode']
            result_data = {
                'club_name': result_node['ClubName'],
                'club_name_eng': result_node['ClubNameEng'] if 'ClubNameEng' in result_node else None,
                'club_id': result_node['ClubID']
            }
            search_results.append(ClubDetail(**result_data))
        if(len(search_results) == 0):
            raise HTTPException(status_code=404, detail="No club found.")
        return search_results
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