from fastapi import APIRouter, Depends, Path, Query, HTTPException
from typing import List, Union
from .dependencies import do_something
from .database import Neo4j, get_neo4j
from .models.activity_model import ActivityDetail

activityRouter = APIRouter(
    prefix="/activities",
    tags=["activities"]
)

#Recommend activities

#Fields of an activity card
@activityRouter.get("/card/fields", response_model=List[str])
async def query_card_fields():
    fields = ["ActivityName", "ActivityNameEng", "HourTotal", "OpenDate", "CloseDate", "AcademicYear"]
    return fields

#Fields of an activity detail
@activityRouter.get("/detail/fields", response_model=Union[List[str], str])
async def query_detail_fields(neo4j: Neo4j = Depends(get_neo4j)):
    fields = ["ActivityID","ActivityName","ActivityNameENG","AcademicYear","Semester","Description",
              "DayTotal","HourTotal","OpenDate","CloseDate","Organizer"]
    return fields

#Search for activities
@activityRouter.get("/{activity_name}")
async def activity_search(
    activity_name: str = Path(...,description= "The name of the activity"), 
    fields: str = Query("ActivityName,Description",description="The fields to be returned"),
    neo4j: Neo4j = Depends(get_neo4j)
):
    # Implement your Neo4j query to retrieve data based on the activity_name
    try:
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
                'open_date': result['activityNode.OpenDate'].to_native() if 'activityNode.OpenDate' in result else None,
                'close_date': result['activityNode.CloseDate'].to_native() if 'activityNode.CloseDate' in result else None,
                'academic_year': result['activityNode.AcademicYear'] if 'activityNode.AcademicYear' in result else None
            }
            search_results.append(ActivityDetail(**result_data))
        if len(search_results) == 0:
            raise HTTPException(status_code=404, detail="No activity found.")
        return search_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Select an activity

#Join an activity

#Leave an activity

#Activity evaluation

#New activity notification

#Club event notification