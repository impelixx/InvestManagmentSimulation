import pymongo


client = pymongo.MongoClient("mongodb://common:password@mongodb")
db = client.get_database("commonDB")
print(client.server_info())

with client.start_session() as session:
    with session.start_transaction():
        db.test.insert_one({"first": 123, "second": [1, 2, 3]}, session=session)
