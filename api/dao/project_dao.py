import mysql.connector
import json
from config.config import db_config


class project_dao():
    def __init__(self):
        try:
            self.con = mysql.connector.connect(
                host=db_config['host'],
                user=db_config["user"],
                password=db_config['password'],
                database=db_config['database'])
            self.con.autocommit = True
            self.cur = self.con.cursor(dictionary=True)
        except:
            print("project_dao Connection failed")

    def find_by_user_id(self, user_id):
        query = f"SELECT * FROM project WHERE owner_id = {user_id}"
        self.cur.execute(query)
        return self.cur.fetchall()

    def find_repositories_by_project_id(self, project_id):
        query = f"SELECT r.* FROM project_repository pr, repository r WHERE r.id = pr.repository_id AND pr.project_id = {project_id}"
        self.cur.execute(query)
        return self.cur.fetchall()

    def save(self, name, owner_id):
        query = f"INSERT INTO project(name, owner_id) VALUES ('{name}', '{owner_id}')"
        self.cur.execute(query)

    def delete_project_repository(self, project_id, repository_id):
        query = f"DELETE FROM project_repository WHERE project_id = {project_id} AND repository_id = {repository_id}"
        self.cur.execute(query)

    def add_project_repository(self, project_id, repository_id):
        query = f"INSERT INTO project_repository(project_id, repository_id) VALUES({project_id}, {repository_id})"
        self.cur.execute(query)
