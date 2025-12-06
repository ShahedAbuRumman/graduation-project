from flask import Blueprint, request, jsonify
from controllers.auth_controller import AuthController
from flask_cors import cross_origin

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST", "OPTIONS"])
@cross_origin()
def register():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    try:
        data = request.json
        print(f"📥 Received registration data: {data}")
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        
        if not username or not email or not password:
            return jsonify({"error": "Missing required fields"}), 400
        
        result = AuthController.register(username, email, password)
        return jsonify(result), 201
        
    except Exception as e:
        print(f"❌ Registration error: {str(e)}")
        return jsonify({"error": str(e)}), 500


@auth_bp.route("/login", methods=["POST"])
def login_route():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    result, status = AuthController.login(email, password)
    return jsonify(result), status

@auth_bp.route("/reset-password", methods=["POST", "OPTIONS"])
def reset_password_route():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    try:
        data = request.json
        email = data.get("email")
        new_password = data.get("password")

        if not email or not new_password:
            return jsonify({"error": "Missing email or password"}), 400

        result = AuthController.reset_password(email, new_password)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500