from ..models.activity_model import ActivityDetail
from ..utils.database import get_database
import pytz

def extract_activity_data(activity_nodes):
    activity_data = []
    for activity_node in activity_nodes:
        current_node = activity_node['activityNode']
        current_node['ActivityNameENG'] = current_node.get('ActivityNameENG', None)
        current_node['OpenDate'] = current_node['OpenDate'].to_native().astimezone(pytz.timezone('Asia/Bangkok'))
        current_node['CloseDate'] = current_node['CloseDate'].to_native().astimezone(pytz.timezone('Asia/Bangkok'))
        activity_data.append(ActivityDetail(**current_node))
    return activity_data

async def get_total_activities_by_name(activity_name: str):
    database = get_database()
    count_query = f"""MATCH (activityNode:Activity) 
        WHERE activityNode.ActivityName CONTAINS $activity_name 
        OR activityNode.ActivityNameENG CONTAINS $activity_name 
        RETURN COUNT(activityNode) AS total_activities"""
    count_params = {"activity_name": activity_name}
    count_result = await database.query(count_query, count_params)
    total_activities = count_result['total_activities'] if count_result else 0
    return total_activities

async def get_total_recommend_activities_v1(user_id: int, priority: int):
    database = get_database()
    recommend_query = f"""MATCH (activityNode:Activity)-[:DESCRIPT_BY_PRINCIPLE_AS]->(activityClassNode:No_Group_Principle_Cluster)
        <-[interest:INTEREST_IN]-(userNode:User) 
        WHERE userNode.UserID = $user_id AND interest.Priority = $priority
        RETURN COUNT(activityNode) AS total_activities"""
    recommend_params = {"user_id": user_id, "priority": priority}
    count_result = await database.query(recommend_query, recommend_params)
    total_activities = count_result['total_activities'] if count_result else 0
    return total_activities

async def get_total_recommend_activities_v2(user_id: int):
    database = get_database()
    recommend_query = f"""MATCH (userNode:User)-[r:RECOMMENDED]->(activityNode:Activity) WHERE userNode.UserID = $user_id 
        RETURN COUNT(activityNode) AS total_activities"""
    recommend_params = {"user_id": user_id}
    count_result = await database.query(recommend_query, recommend_params)
    total_activities = count_result['total_activities'] if count_result else 0
    return total_activities

async def get_total_activities_class():
    database = get_database()
    class_query = f"""MATCH (activityClassNode:No_Group_Principle_Cluster) RETURN count(activityClassNode) AS total_classes"""
    count_result = await database.query(class_query)
    total_classes = count_result['total_classes'] if count_result else 0
    return total_classes