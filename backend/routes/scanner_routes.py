from flask import Blueprint, request, jsonify
from controllers.scanner_controller import ScannerController

scanner_bp = Blueprint("scanner", __name__)

@scanner_bp.route("/scan", methods=["POST"])
def scan_url():
    data = request.json
    url_to_scan = data.get("url")
    if not url_to_scan:
        return jsonify({"error": "Missing URL"}), 400

    try:
        result = ScannerController.scan(url_to_scan)
        return jsonify({"success": True, "report": result}), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
