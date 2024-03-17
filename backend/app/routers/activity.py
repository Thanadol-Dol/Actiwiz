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
initialize(
    tenant_id_=os.environ.get('AZURE_AD_TENANT_ID'), 
    client_id_=os.environ.get('AZURE_AD_CLIENT_ID')
)

scopes = "data.read"

#Recommend activities

#Fields of an activity card
@activityRouter.get("/card/fields", response_model=List[str])
@requires_auth
async def query_card_fields(request: Request):
    try:
        validate_scope(scopes,request)
        fields = ["ActivityName", "ActivityNameEng", "HourTotal", "OpenDate", "CloseDate", "AcademicYear"]
        return fields
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))

#Fields of an activity detail
@activityRouter.get("/detail/fields", response_model=Union[List[str], str])
@requires_auth
async def query_detail_fields(request: Request):
    try:
        validate_scope(scopes,request)
        fields = ["ActivityID","ActivityName","ActivityNameENG","AcademicYear","Semester","Description",
              "DayTotal","HourTotal","OpenDate","CloseDate","Organizer"]
        return fields
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))

#Search for activities
@activityRouter.get("/{activity_name}")
@requires_auth
async def activity_search(
    request: Request,
    activity_name: str = Path(...,description= "The name of the activity"), 
    fields: str = Query("ActivityName,Description",description="The fields to be returned"),
    neo4j: Neo4j = Depends(get_neo4j)
):
    # Implement your Neo4j query to retrieve data based on the activity_name
    try:
        validate_scope(scopes,request)
        fields_query = "MATCH (activityNode:Activity) RETURN activityNode LIMIT 1"
        activity_params = {"activity_name": activity_name}
        results = await neo4j.query(fields_query, fetch_all=True)
        all_fields = list(results[0]['activityNode'].keys())
        fields = fields.split(',')
        fields = ["activityNode."+ field for field in fields if field in all_fields]
        if("activityNode.ActivityName" not in fields):
            fields.append("activityNode.ActivityName")
        activity_query = f"""MATCH (activityNode:Activity) WHERE activityNode.ActivityName 
        CONTAINS $activity_name OR activityNode.ActivityNameEng CONTAINS $activity_name RETURN {', '.join(fields)}"""
        results = await neo4j.query(activity_query, activity_params, fetch_all=True)
        search_results = []
        for result in results:
            result_data = {
                'activity_id': result['activityNode.ActivityID'] if 'activityNode.ActivityID' in result else None,
                'activity_name': result['activityNode.ActivityName'],
                'activity_name_eng': result['activityNode.ActivityNameEng'] if 'activityNode.ActivityNameEng' in result else None,
                'description': result['activityNode.Description'] if 'activityNode.Description' in result else None,
                'hour_total': result['activityNode.HourTotal'] if 'activityNode.HourTotal' in result else None,
                'day_total': result['activityNode.DayTotal'] if 'activityNode.DayTotal' in result else None,
                'semester': result['activityNode.Semester'] if 'activityNode.Semester' in result else None,
                'organizer': result['activityNode.Organizer'] if 'activityNode.Organizer' in result else None,
                'open_date': result['activityNode.OpenDate'].to_native().astimezone(pytz.timezone('Asia/Bangkok')) if 'activityNode.OpenDate' in result else None,
                'close_date': result['activityNode.CloseDate'].to_native().astimezone(pytz.timezone('Asia/Bangkok')) if 'activityNode.CloseDate' in result else None,
                'academic_year': result['activityNode.AcademicYear'] if 'activityNode.AcademicYear' in result else None
            }
            search_results.append(ActivityDetail(**result_data))
        if len(search_results) == 0:
            raise HTTPException(status_code=404, detail="No activity found.")
        return search_results
    except AuthError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Select an activity

#Join an activity

#Leave an activity

#Activity evaluation

#New activity notification

#Club event notification