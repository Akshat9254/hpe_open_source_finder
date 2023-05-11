from app import app
from service.platform_service import platform_service

platform_service = platform_service()


@app.route("/platform", methods=["GET"])
def get_platforms():
    return platform_service.get_all_platforms()
