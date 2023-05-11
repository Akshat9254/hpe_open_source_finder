from flask import jsonify
from dao.user_dao import user_dao
from dao.project_dao import project_dao

user_dao = user_dao()
project_dao = project_dao()

class user_service():
    def register_user(self, name, email, password):
        user_dao.save(name, email, password)
        return "user registered successfully"

    def login_user(self, email, password):
        user = user_dao.find_by_email(email)
        if user is None:
            return jsonify({"error": "User not found"}), 404    
        
        if password != user["password"]:
            return jsonify({"error": "Invalid credentials"}), 401  

        projects = project_dao.find_by_user_id(user['id'])
        user_data = {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "projects": []
        }


        for project in projects:
            repositories = project_dao.find_repositories_by_project_id(project["id"])
            project_data = {
                "id": project["id"],
                "name": project["name"],
                "repositories": repositories
            }
            user_data["projects"].append(project_data)
        return user_data

    def find_by_email(self, email):
        return user_dao.find_by_email(email)
