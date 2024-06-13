from database import Database, get_database

def keep_db_alive():
    database: Database = get_database()
    query = f"""MATCH (userNode:User) RETURN userNode.UserID LIMIT 1"""
    results = database.query(query, fetch_all=True)
    database.close()