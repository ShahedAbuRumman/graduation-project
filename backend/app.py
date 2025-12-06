from flask import Flask
from flask_cors import CORS



app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})



from routes.auth_routes import auth_bp
app.register_blueprint(auth_bp, url_prefix="/api")
from routes.scanner_routes import scanner_bp
app.register_blueprint(scanner_bp, url_prefix="/api")

@app.route("/")
def home():
    return {"message": "Flask running"}

if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=True)
