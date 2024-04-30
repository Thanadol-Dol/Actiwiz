from ..models.club_model import ClubDetail
from ..utils.database import get_database

def extract_club_data(club_nodes):
    club_data = []
    for club_node in club_nodes:
        current_node = club_node['clubNode']
        current_node['ClubNameEng'] = current_node.get('ClubNameEng', None)
        club_data.append(ClubDetail(**current_node))
    return club_data

async def get_total_clubs_by_name(club_name: str):
    database = get_database()
    count_query = f"""MATCH (clubNode:Club) WHERE clubNode.ClubName 
        CONTAINS $club_name OR clubNode.ClubNameEng CONTAINS $club_name 
        RETURN COUNT(clubNode) AS total_clubs"""
    count_params = {"club_name": club_name}
    count_result = await database.query(count_query, count_params)
    total_clubs = count_result['total_clubs'] if count_result else 0
    return total_clubs

async def get_total_recommend_clubs(user_id: int, priority: int):
    database = get_database()
    recommend_query = f"""MATCH (clubNode:Club)-[:DESCRIPT_BY_CLUP_ACTIVITY_NAME_AS]->(clubClassNode:Bert_Name)
        <-[interest:INTEREST_IN]-(userNode:User)
        WHERE userNode.UserID = $user_id AND interest.Priority = $priority
        RETURN COUNT(clubNode) AS total_clubs"""
    recommend_params = {"user_id": user_id, "priority": priority}
    count_result = await database.query(recommend_query, recommend_params)
    total_clubs = count_result['total_clubs'] if count_result else 0
    return total_clubs

async def get_total_clubs_class():
    database = get_database()
    class_query = f"""MATCH (clubClassNode:Bert_Name) RETURN count(clubClassNode) AS total_classes"""
    count_result = await database.query(class_query)
    total_classes = count_result['total_classes'] if count_result else 0
    return total_classes