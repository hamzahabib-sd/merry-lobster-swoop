import os
from pymongo import MongoClient

# Dependency
def get_db():
    client = MongoClient(os.getenv("MONGODB_URI"))
    try:
        db = client.get_database("food_ordering_db")
        yield db
    finally:
        client.close()