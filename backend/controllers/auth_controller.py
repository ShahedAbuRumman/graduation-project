from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from utils.jwt_helper import create_jwt

class AuthController:
    @staticmethod
    def register(username, email, password):
        password_hash = generate_password_hash(password)
        User.create_user(username, email, password_hash)
        return {"message": "User registered successfully"}

    @staticmethod
    def login(email, password):
        user = User.get_user_by_email(email)
        if not user:
            return {"error": "User not found"}, 404
        
        if not check_password_hash(user["password"], password):
            return {"error": "Invalid password"}, 401

        token = create_jwt({"email": user["email"]})
        return {"token": token, "user": {"email": user["email"], "username": user["username"]}}

    @staticmethod
    def reset_password(email, new_password):
        user = User.get_user_by_email(email)
        if not user:
            return {"error": "User not found"}, 404
        password_hash = generate_password_hash(new_password)
        User.update_password(email, password_hash)
        return {"message": "Password updated successfully"}
