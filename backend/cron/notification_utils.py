from exponent_server_sdk import (
    DeviceNotRegisteredError,
    PushClient,
    PushMessage,
    PushServerError,
    PushTicketError,
)
from database import Database, get_database

def new_activity_notification():
    database: Database = get_database()
    query = f"""MATCH (activityNode:Activity)-[:SHOULD_NOTIFY_THIS]->(userNode:User)-[:HAVE_TOKENS]->(tokenNode:Token)
    RETURN tokenNode.ExpoPushToken, activityNode.ActivityName"""
    results = database.query(query, fetch_all=True)
    for result in results:
        print(result.get('tokenNode.ExpoPushToken'))
        print(result.get('activityNode.ActivityName'))
        PushClient().publish(
            PushMessage(
                to=result.get('tokenNode.ExpoPushToken'),
                title="กิจกรรมใหม่ที่คุณอาจสนใจ",
                body=result.get('activityNode.ActivityName')
            )
        )
    database.close()

def activity_evaluation_notification():
    database: Database = get_database()
    query = f"""MATCH (tokenNode:Token)<-[:HAVE_TOKENS]-(userNode:User)-[:EVALUATE_AVAILABLE]->(activityNode:Activity) 
    RETURN tokenNode.ExpoPushToken, activityNode.ActivityName"""
    results = database.query(query, fetch_all=True)
    for result in results:
        print(result.get('tokenNode.ExpoPushToken'))
        print(result.get('activityNode.ActivityName'))
        PushClient().publish(
            PushMessage(
                to=result.get('tokenNode.ExpoPushToken'),
                title="กิจกรรมที่คุณเคยเข้าร่วมพร้อมให้ประเมินแล้ว",
                body=result.get('activityNode.ActivityName')
            )
        )
    database.close()

def new_club_notification():
    database: Database = get_database()
    query = f"""MATCH (clubNode:Club)-[:SHOULD_NOTIFY_THIS]->(userNode:User)-[:HAVE_TOKENS]->(tokenNode:Token)
    RETURN tokenNode.ExpoPushToken, clubNode.ClubName"""
    results = database.query(query, fetch_all=True)
    for result in results:
        print(result.get('tokenNode.ExpoPushToken'))
        print(result.get('clubNode.ClubName'))
        PushClient().publish(
            PushMessage(
                to=result.get('tokenNode.ExpoPushToken'),
                title="ชมรมใหม่ที่คุณอาจสนใจ",
                body=result.get('clubNode.ClubName')
            )
        )
    database.close()