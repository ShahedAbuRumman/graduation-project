import os
from dotenv import load_dotenv
import mysql.connector

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    DB_CONFIG = {
        "host": os.getenv("DB_HOST"),
        "user": os.getenv("DB_USER"),
        "password": os.getenv("DB_PASS"),
        "database": os.getenv("DB_NAME"),
        "port": int(os.getenv("DB_PORT"))
    }

def get_db_connection():
    try:
        conn = mysql.connector.connect(**Config.DB_CONFIG)
        print("✅ Connected to MySQL successfully!")
        return conn
    except mysql.connector.Error as err:
        print(f"❌ Error connecting to MySQL: {err}")
        raise
