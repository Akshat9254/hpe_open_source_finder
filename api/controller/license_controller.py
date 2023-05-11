from app import app
from flask import request
from service.license_service import license_service

license_service = license_service()


@app.route("/license/all", methods=["GET"])
def get_all_licenses():
    return license_service.find_all()