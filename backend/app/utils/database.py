import os
from neo4j import GraphDatabase

uri = os.environ.get('NEO4J_URI')
user = os.environ.get('NEO4J_USERNAME')
password = os.environ.get('NEO4J_PASSWORD')

class Neo4j:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._driver = GraphDatabase.driver(uri, auth=(user, password))
        return cls._instance

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

def get_neo4j():
    return Neo4j()