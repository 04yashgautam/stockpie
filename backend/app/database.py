from pymongo import MongoClient
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

username = "04yashgautam"
password = quote_plus("04yashgautam@mongodb")


load_dotenv()
MONGO_URI = f"mongodb+srv://{username}:{password}@cluster0.nhkxkgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(MONGO_URI)
db = client["stockpie"]
users_collection = db["users"]


#os.getenv("MONGO_URI") or