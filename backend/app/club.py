import os
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Union
from .dependencies import do_something
from .models.club_model import SearchClub
from .database import Neo4j, get_neo4j

clubRouter = APIRouter(
    prefix="/clubs",
    tags=["clubs"],
    dependencies=[Depends(do_something)],
    responses={404: {"description": "Not found"}}
)

@clubRouter.get("/")
async def read_root():
    return {"message": "This is all clubs information."}

#Recommend clubs

#Search for clubs
@clubRouter.get("/{club_name}", response_model=Union[List[SearchClub], str])
async def club_search(club_name: str, neo4j: Neo4j = Depends(get_neo4j)):
    # Implement your Neo4j query to retrieve data based on the club_name
    query = f"MATCH (clubNode:Club) WHERE clubNode.ClubName CONTAINS $club_name OR clubNode.ClubNameEng CONTAINS $club_name RETURN clubNode"
    params = {"club_name": club_name}
    try:
        results = await neo4j.query(query, params, fetch_all=True)
        search_results = []
        for result in results:
            result_node = result['clubNode']
            result_data = {
                'club_name': result_node['ClubName'],
                'club_name_eng': result_node['ClubNameEng'] if 'ClubNameEng' in result_node else None,
                'club_id': result_node['ClubID']
            }
            search_results.append(SearchClub(**result_data))
        if(len(search_results) == 0):
            raise HTTPException(status_code=404, detail="No club found.")
        return search_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Select an club

#Join an club

#Leave an club