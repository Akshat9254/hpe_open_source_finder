from app import app
from flask import request, jsonify
from dao.repository_dao import repository_dao
from service.repository_service import repository_service


repository_dao = repository_dao()
repository_service = repository_service()


@app.route("/repository/all", methods=["GET"])
def get_repositories_by_keywords():
    keywords = request.args.getlist('keywords')
    licenses = request.args.getlist('licenses')
    res = repository_service.search_by_keywords(keywords, licenses)
    return jsonify(res)


@app.route("/repository", methods=["GET"])
def get_repository_by_id():
    repo_id = request.args.get('id')
    return repository_service.find_by_id(repo_id)
