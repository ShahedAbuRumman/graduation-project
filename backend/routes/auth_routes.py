from flask import Blueprint, request, jsonify
from controllers.auth_controller import AuthController
from flask_cors import cross_origin

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST", "OPTIONS"])
@cross_origin()
def register():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    result, status = AuthController.register(username, email, password)
    return jsonify(result), status


@auth_bp.route("/login", methods=["POST", "OPTIONS"])
@cross_origin()
def login_route():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    result, status = AuthController.login(email, password)
    return jsonify(result), status


@auth_bp.route("/reset-password", methods=["POST", "OPTIONS"])
@cross_origin()
def reset_password_route():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    email = data.get("email")
    new_password = data.get("password")

    if not email or not new_password:
        return jsonify({"error": "Missing email or password"}), 400

    result, status = AuthController.reset_password(email, new_password)
    return jsonify(result), status
