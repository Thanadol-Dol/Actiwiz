from fastapi import APIRouter, Depends, HTTPException, Path
from typing import List, Union
from .dependencies import do_something
from .models.club_model import ClubDetail
from .database import Neo4j, get_neo4j

clubRouter = APIRouter(
    prefix="/clubs",
    tags=["clubs"],
    dependencies=[Depends(do_something)]
)

#Recommend clubs

#Search for clubs
@clubRouter.get("/{club_name}", response_model=Union[List[ClubDetail], str])
async def club_search(
    club_name: str = Path(...,description="The name of the club"), 
    neo4j: Neo4j = Depends(get_neo4j)
):
    # Implement your Neo4j query to retrieve data based on the club_name
    try:
        query = f"""MATCH (clubNode:Club) WHERE clubNode.ClubName 
        CONTAINS $club_name OR clubNode.ClubNameEng CONTAINS $club_name RETURN clubNode"""
        params = {"club_name": club_name}
        results = await neo4j.query(query, params, fetch_all=True)
        search_results = []
        for result in results:
            result_node = result['clubNode']
            result_data = {
                'club_name': result_node['ClubName'],
                'club_name_eng': result_node['ClubNameEng'] if 'ClubNameEng' in result_node else None,
                'club_id': result_node['ClubID']
            }
            search_results.append(ClubDetail(**result_data))
        if(len(search_results) == 0):
            raise HTTPException(status_code=404, detail="No club found.")
        return search_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Select a club

#Join a club

#Leave a club