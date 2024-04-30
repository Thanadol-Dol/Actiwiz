from ..models.user_model import UserDetail
from ..utils.database import get_database

def extract_user_data(user_node):
    current_node = user_node['userNode']
    return UserDetail(**current_node)

async def get_user_next_id():
    database = get_database()
    user_query = f"""MATCH (userNode:User) RETURN max(userNode.UserID) AS max_id"""
    result = await database.query(user_query)
    max_id = result["max_id"]
    if max_id is None:
        return 1
    else:
        return max_id + 1