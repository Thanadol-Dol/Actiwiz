from fastapi import APIRouter, Depends, Path, Query, HTTPException, Request
from typing import List, Union
from ..utils.database import Neo4j, get_neo4j
from ..models.activity_model import ActivityDetail
from fastapi_microsoft_identity import initialize, requires_auth, AuthError, validate_scope
import os
import pytz

activityRouter = APIRouter(
    prefix="/activities",
    tags=["activities"]
)

token_scp = os.environ.get('AZURE_AD_ACCESS_TOKEN_SCP')

@activityRouter.get("/recommend")
@requires_auth
async def recommend_activities(
    request: Request,
    neo4j: Neo4j = Depends(get_neo4j)
):
    # Implement your Neo4j query to retrieve data based on the activity_name
    try:
        # Validate the scope of the request
        validate_scope(token_scp,request)

        # Query to search for activities
        activity_query = f"""MATCH (activityNode:Activity) WHERE activityNode.OpenDate IS NOT NULL RETURN activityNode 
        ORDER BY activityNode.OpenDate DESC LIMIT 10"""
        results = await neo4j.query(activity_query, fetch_all=True)
        search_results = []
        for result in results:
            result_node = result['activityNode']
            result_data = {
                'activity_id': result_node['ActivityID'],
                'activity_name': result_node['ActivityName'],
                'activity_name_eng': result_node.get('ActivityNameENG', None),
                'description': result_node['Description'],
                'hour_total': result_node['HourTotal'],
                'day_total': result_node['DayTotal'],
                'semester': result_node['Semester'],
                'organizer': result_node['Organizer'],
                'open_date': result_node['OpenDate'].to_native().astimezone(pytz.timezone('Asia/Bangkok')),
                'close_date': result_node['CloseDate'].to_native().astimezone(pytz.timezone('Asia/Bangkok')),
                'academic_year': result_node['AcademicYear']
            }
            search_results.append(ActivityDetail(**result_data))
        if len(search_results) == 0:
            raise HTTPException(status_code=404, detail="No activity found.")
        return search_results
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@activityRouter.get("/{activity_name}", response_model=List[ActivityDetail])
@requires_auth
async def activities_search(
    request: Request,
    activity_name: str = Path(...,description= "The name of the activity"),
    page_number: int = Query(1, description="Page number, starting from 1"),
    results_size: int = Query(10, description="Number of items per page"),
    neo4j: Neo4j = Depends(get_neo4j)
):
    try:
        # Validate the scope of the request
        validate_scope(token_scp,request)

        # Calculate SKIP and LIMIT values for pagination
        skip = (page_number - 1) * results_size
        limit = results_size

        # Query to search for activities with pagination
        activity_params = {"activity_name": activity_name, "skip": skip, "limit": limit}
        activity_query = (
            f"""MATCH (activityNode:Activity) WHERE activityNode.ActivityName 
            CONTAINS $activity_name OR activityNode.ActivityNameENG CONTAINS $activity_name 
            RETURN activityNode SKIP $skip LIMIT $limit"""
        )
        results = await neo4j.query(activity_query, activity_params, fetch_all=True)
        if results is None:
            raise HTTPException(status_code=404, detail="No activity found.")
        
        search_results = []
        for result in results:
            result_node = result['activityNode']
            result_data = {
                'activity_id': result_node['ActivityID'],
                'activity_name': result_node['ActivityName'],
                'activity_name_eng': result_node.get('ActivityNameENG', None),
                'description': result_node['Description'],
                'hour_total': result_node['HourTotal'],
                'day_total': result_node['DayTotal'],
                'semester': result_node['Semester'],
                'organizer': result_node['Organizer'],
                'open_date': result_node['OpenDate'].to_native().astimezone(pytz.timezone('Asia/Bangkok')),
                'close_date': result_node['CloseDate'].to_native().astimezone(pytz.timezone('Asia/Bangkok')),
                'academic_year': result_node['AcademicYear']
            }
            search_results.append(ActivityDetail(**result_data))
        return search_results
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@activityRouter.post("/join/{activity_id}")
@requires_auth
async def join_activity(
    request: Request,
    activity_id: int = Path(...,description="The ID of the activity to join"),
    user_id: int = Query(...,description="The ID of the user joining the activity"),
    neo4j: Neo4j = Depends(get_neo4j)
):
    try:
        validate_scope(token_scp,request)
        query = f"""MATCH (userNode:User), (activityNode:Activity) 
        WHERE userNode.UserID = $user_id AND activityNode.ActivityID = $activity_id
        CREATE (userNode)-[:JOINED]->(activityNode)"""
        params = {"user_id": user_id, "activity_id": activity_id}
        await neo4j.run(query, params)
        return {"message": "User joined the activity successfully."}
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Activity evaluation

#New activity notification

#Club event notification