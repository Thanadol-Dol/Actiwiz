import os
from neo4j import GraphDatabase

uri = os.environ.get('NEO4J_URI')
user = os.environ.get('NEO4J_USERNAME')
password = os.environ.get('NEO4J_PASSWORD')

class Neo4j:
    def __init__(self):
        self._driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self._driver.close()

    async def run(self, query, parameters=None):
        with self._driver.session() as session:
            session.run(query, parameters)

    async def query(self, query, parameters=None, fetch_all=False):
        with self._driver.session() as session:
            result = session.run(query, parameters)
            if result.peek() is None:
                return None
            return result.data() if fetch_all else result.single().data()
    
    async def user_max_id(self):
        user_query = f"""MATCH (userNode:User) RETURN max(userNode.UserID) AS max_id"""
        result = await self.query(user_query)
        max_id = result["max_id"]
        if max_id is None:
            return 1
        else:
            return max_id + 1

def get_neo4j():
    neo4j = Neo4j()
    try:
        yield neo4j
    finally:
        neo4j.close()