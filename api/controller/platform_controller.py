from app import app
from dao.platform_dao import platform_dao

platform_dao = platform_dao()


@app.route("/platform", methods=["GET"])
def get_platforms():
    return platform_dao.get_all_platforms()
