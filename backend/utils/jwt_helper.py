import jwt
import datetime
from config import Config

def create_jwt(payload):
    payload["exp"] = datetime.datetime.utcnow() + datetime.timedelta(hours=5)
    return jwt.encode(payload, Config.SECRET_KEY, algorithm="HS256")

def decode_jwt(token):
    try:
        return jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
    except:
        return None
