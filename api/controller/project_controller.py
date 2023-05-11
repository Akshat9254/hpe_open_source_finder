from app import app
from flask import request
from service.project_service import project_service

project_service = project_service()

@app.route("/project", methods=["POST"])
def create_project():
    data = request.get_json()
    name = data.get("projectName")
    owner_id = data.get("ownerId")
    project_service.save(name, owner_id)
    return "Project created"

@app.route("/project/owner", methods=["GET"])
def get_all_projects_by_owner_id():
    owner_id = request.args.get('ownerId')
    return project_service.get_all_projects_by_owner_id(owner_id)

@app.route("/project/repository", methods=["DELETE"])
def delete_project_repository():
    project_id = request.args.get('projectId')
    repository_id = request.args.get('repositoryId')
    project_service.delete_project_repository(project_id, repository_id)
    return "project_repository deleted"

@app.route("/project/repository", methods=["POST"])
def add_project_repository():
    data = request.get_json()
    project_id = data['projectId']
    repository_id = data['repositoryId']
    project_service.add_project_repository(project_id, repository_id)
    return "project_repository added"
