import os
from neo4j import GraphDatabase

# Neo4j configuration
uri = os.environ.get('NEO4J_URI')
user = os.environ.get('NEO4J_USERNAME')
password = os.environ.get('NEO4J_PASSWORD')

class Neo4j:
    def __init__(self):
        self._driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self._driver.close()

    async def query(self, query, parameters=None, fetch_all=False):
        with self._driver.session() as session:
            result = session.run(query, parameters)
            return result.data() if fetch_all else result.single().data()

def get_neo4j():
    neo4j = Neo4j()
    try:
        yield neo4j
    finally:
        neo4j.close()