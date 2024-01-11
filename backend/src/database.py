from neo4j import GraphDatabase

# Neo4j configuration
uri = "your_neo4j_uri"
user = "your_neo4j_username"
password = "your_neo4j_password"

class Neo4j:
    def __init__(self):
        self._driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self._driver.close()

    def query(self, query, parameters=None, fetch_all=False):
        with self._driver.session() as session:
            result = session.run(query, parameters)
            return result.data() if fetch_all else result.single().data()

def get_neo4j():
    neo4j = Neo4j()
    try:
        yield neo4j
    finally:
        neo4j.close()