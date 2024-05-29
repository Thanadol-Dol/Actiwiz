from fastapi import APIRouter, Depends, Path, Query, HTTPException, Request, Security
from typing import List, Union
from ..utils.database import Database, get_database
from ..models.activity_model import (
    RecommendActivitiesV1, 
    RecommendActivitiesV2, 
    SearchActivities, 
    ActivityDetail,
    CheckJoinActivityStatus,
    ReadActivityStatus,
    JoinActivityStatus 
)
from fastapi_microsoft_identity import requires_auth, AuthError, validate_scope
from ..utils.activity_util import (
    extract_activity_data, 
    get_total_activities_by_name, 
    get_total_recommend_activities_v1,
    get_total_recommend_activities_v2, 
    get_total_activities_class
)
from ..config.auth import token_scp, api_token_header

activityRouter = APIRouter(
    prefix="/activities",
    tags=["activities"]
)
    
@activityRouter.get("/v1/recommend/user/{user_id}", response_model=RecommendActivitiesV1)
@requires_auth
async def recommend_activities(
    request: Request,
    user_id: int = Path(...,description="The ID of the user to retrieve"),
    page_number: int = Query(1, description="Page number, starting from 1"),
    results_size: int = Query(6, description="Number of items per page"),
    priority: int = Query(1, description="Priority of the recommendation"),
    database: Database = Depends(get_database),
    api_token = Security(api_token_header)
):
    try:
        # Validate the scope of the request
        validate_scope(token_scp,request)

        # Calculate SKIP and LIMIT values for pagination
        skip = (page_number - 1) * results_size
        
        # Get total classes
        total_classes = await get_total_activities_class()
        if total_classes == 0:
            raise HTTPException(status_code=404, detail="No class found.")
        if total_classes < priority:
            raise HTTPException(status_code=404, detail="Priority out of range.")

        # Get total activities
        total_activities = await get_total_recommend_activities_v1(user_id,priority)
        if total_activities == 0:
            raise HTTPException(status_code=404, detail="No activity found.")

        # Query to recommend activities with pagination
        recommend_query = f"""MATCH (activityNode:Activity)-[:DESCRIPT_BY_PRINCIPLE_AS]->(activityClassNode:No_Group_Principle_Cluster)
        <-[interest:INTEREST_IN]-(userNode:User)
        WHERE userNode.UserID = $user_id AND interest.Priority = $priority
        RETURN activityNode ORDER BY activityNode.OpenDate DESC SKIP $skip LIMIT $limit"""
        recommend_params = {"user_id": user_id, "priority": priority, "skip": skip, "limit": results_size}
        results = await database.query(recommend_query, recommend_params, fetch_all=True)
        activities_data = extract_activity_data(results)

        has_next_page = True if total_activities > skip + len(activities_data) else False
        if has_next_page:
            next_page = page_number + 1
            next_priority = priority
        else:
            priority_query = f"""MATCH (activityNode:Activity)-[:DESCRIPT_BY_PRINCIPLE_AS]->(activityClassNode:No_Group_Principle_Cluster)
            <-[interest:INTEREST_IN]-(userNode:User)
            WHERE userNode.UserID = $user_id RETURN DISTINCT interest.Priority ORDER BY interest.Priority"""
            priority_results = await database.query(priority_query, {"user_id": user_id}, fetch_all=True)

            priority_list = [item["interest.Priority"] for item in priority_results]
            now_priority = priority_list.index(priority)
            if now_priority + 1 < len(priority_list):
                next_page = 1
                next_priority = priority_list[now_priority + 1]
            else:
                next_page = None
                next_priority = None
        return {"activities": activities_data, "next_page": next_page, "next_priority": next_priority}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@activityRouter.get("/v2/recommend/user/{user_id}", response_model=RecommendActivitiesV2)
@requires_auth
async def recommend_activities(
    request: Request,
    user_id: int = Path(...,description="The ID of the user to retrieve"),
    page_number: int = Query(1, description="Page number, starting from 1"),
    results_size: int = Query(6, description="Number of items per page"),
    database: Database = Depends(get_database),
    api_token = Security(api_token_header)
):
    try:
        # Validate the scope of the request
        validate_scope(token_scp,request)

        # Calculate SKIP and LIMIT values for pagination
        skip = (page_number - 1) * results_size

        # Get total activities
        total_activities = await get_total_recommend_activities_v2(user_id)
        if total_activities == 0:
            raise HTTPException(status_code=404, detail="No activity found.")
        if total_activities < skip:
            raise HTTPException(status_code=404, detail="Page number out of range.")

        # Query to recommend activities with pagination
        recommend_query = f"""MATCH (userNode:User)-[r:RECOMMENDED]->(activityNode:Activity) WHERE userNode.UserID = $user_id 
        RETURN activityNode ORDER BY r.interest_distance SKIP $skip LIMIT $limit"""
        recommend_params = {"user_id": user_id, "skip": skip, "limit": results_size}
        results = await database.query(recommend_query, recommend_params, fetch_all=True)
        activities_data = extract_activity_data(results)

        next_page = page_number + 1 if total_activities > skip + len(activities_data) else None
        return {"activities": activities_data, "next_page": next_page}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@activityRouter.get("/{activity_name}", response_model=SearchActivities)
@requires_auth
async def activities_search(
    request: Request,
    activity_name: str = Path(...,description= "The name of the activity"),
    page_number: int = Query(1, description="Page number, starting from 1"),
    results_size: int = Query(6, description="Number of items per page"),
    database: Database = Depends(get_database),
    api_token = Security(api_token_header)
):
    try:
        # Validate the scope of the request
        validate_scope(token_scp,request)

        # Calculate SKIP and LIMIT values for pagination
        skip = (page_number - 1) * results_size

        # Get total activities
        total_activities = await get_total_activities_by_name(activity_name)
        if total_activities == 0:
            raise HTTPException(status_code=404, detail="No activity found.")
        if total_activities < skip:
            raise HTTPException(status_code=404, detail="Page number out of range.")

        # Query to search for activities with pagination
        activity_params = {"activity_name": activity_name, "skip": skip, "limit": results_size}
        activity_query = f"""MATCH (activityNode:Activity) WHERE activityNode.ActivityName 
        CONTAINS $activity_name OR activityNode.ActivityNameENG CONTAINS $activity_name 
        RETURN activityNode SKIP $skip LIMIT $limit"""
        results = await database.query(activity_query, activity_params, fetch_all=True)
        activities_data = extract_activity_data(results)

        next_page = page_number + 1 if total_activities > skip + len(activities_data) else None
        return {"activities": activities_data, "next_page": next_page}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@activityRouter.get("/id/{activity_id}", response_model=ActivityDetail)
@requires_auth
async def get_activity_by_id(
    request: Request,
    activity_id: int = Path(...,description="The ID of the activity to join"),
    database: Database = Depends(get_database),
    api_token = Security(api_token_header)
):
    try:
        validate_scope(token_scp,request)
        get_query = f"""MATCH (activityNode:Activity) 
        WHERE activityNode.ActivityID = $activity_id
        RETURN activityNode"""
        get_params = {"activity_id": activity_id}
        results = await database.query(get_query, get_params, fetch_all=True)
        activity_data = extract_activity_data(results)
        return activity_data[0]
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@activityRouter.get("/check/joined/{activity_id}", response_model=CheckJoinActivityStatus)
@requires_auth
async def check_joined_activity(
    request: Request,
    activity_id: int = Path(...,description="The ID of the activity to join"),
    user_id: int = Query(...,description="The ID of the user joining the activity"),
    database: Database = Depends(get_database),
    api_token = Security(api_token_header)
):
    try:
        validate_scope(token_scp,request)
        
        search_query = f"""MATCH p=(userNode:User)-[:PARTICIPATE_IN]->(activityNode:Activity) 
        WHERE userNode.UserID = $user_id AND activityNode.ActivityID = $activity_id RETURN p"""
        params = {"user_id": user_id, "activity_id": activity_id}
        search_results = await database.query(search_query, params)
        if search_results:
            return {"joined": True, "message": "User already joined the activity."}
        return {"joined": False, "message": "User has not joined the activity."}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@activityRouter.post("/read/{activity_id}", response_model=ReadActivityStatus)
@requires_auth
async def read_activity(
    request: Request,
    activity_id: int = Path(...,description="The ID of the activity to join"),
    user_id: int = Query(...,description="The ID of the user joining the activity"),
    database: Database = Depends(get_database),
    api_token = Security(api_token_header)
):
    try:
        validate_scope(token_scp,request)
        merge_query = f"""MATCH (userNode:User), (activityNode:Activity) 
        WHERE userNode.UserID = $user_id AND activityNode.ActivityID = $activity_id
        MERGE (userNode)-[r:READ_THIS]->(activityNode)
        ON CREATE SET r.count = 1
        ON MATCH SET r.count = r.count + 1"""
        params = {"user_id": user_id, "activity_id": activity_id}
        await database.run(merge_query, params)
        return {"message": "User have read the activity."}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@activityRouter.post("/join/{activity_id}", response_model=JoinActivityStatus)
@requires_auth
async def join_activity(
    request: Request,
    activity_id: int = Path(...,description="The ID of the activity to join"),
    user_id: int = Query(...,description="The ID of the user joining the activity"),
    database: Database = Depends(get_database),
    api_token = Security(api_token_header)
):
    try:
        validate_scope(token_scp,request)
        merge_query = f"""MATCH (userNode:User), (activityNode:Activity) 
        WHERE userNode.UserID = $user_id AND activityNode.ActivityID = $activity_id
        MERGE (userNode)-[:PARTICIPATE_IN]->(activityNode)"""
        params = {"user_id": user_id, "activity_id": activity_id}
        await database.run(merge_query, params)
        return {"message": "User joined the activity successfully."}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))