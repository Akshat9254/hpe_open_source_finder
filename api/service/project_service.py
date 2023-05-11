from flask import jsonify
from dao.project_dao import project_dao

project_dao = project_dao()

class project_service():
    def save(self, name, owner_id):
        project_dao.save(name, owner_id)

    def get_all_projects_by_owner_id(self, owner_id):
        projects = project_dao.find_by_user_id(owner_id)
        projects_dto = []

        for project in projects:
            repositories = project_dao.find_repositories_by_project_id(project["id"])
            project_data = {
                "id": project["id"],
                "name": project["name"],
                "repositories": repositories
            }
            projects_dto.append(project_data)

        return projects_dto
    
    def delete_project_repository(self, project_id, repository_id):
        project_dao.delete_project_repository(project_id, repository_id)

    def add_project_repository(self, project_id, repository_id):
        project_dao.add_project_repository(project_id, repository_id)
