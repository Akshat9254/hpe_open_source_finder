import mysql.connector
import json
from config.config import db_config


class repository_dao():
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
            print("Connection failed")

    def get_repositories_by_keywords(self, keywords):
        placeholders = ', '.join(['%s'] * len(keywords))

        name_conditions = ' OR '.join(
            ['r.name COLLATE utf8mb4_general_ci LIKE %s'] * len(keywords))
        description_conditions = ' OR '.join(
            ['r.description COLLATE utf8mb4_general_ci LIKE %s'] * len(keywords))
        keyword_conditions = ' OR '.join(
            ['k.word COLLATE utf8mb4_general_ci LIKE %s'] * len(keywords))

        q = f"SELECT DISTINCT r.* FROM repository r, repository_keyword rk, keyword k WHERE ({name_conditions} OR {description_conditions}) OR (r.id = rk.repository_id AND k.id = rk.keyword_id AND {keyword_conditions}) LIMIT 5"

        parameters = [f'%{keyword}%' for keyword in keywords] + \
            [f'%{keyword}%' for keyword in keywords] + \
            [f'%{keyword}%' for keyword in keywords]

        self.cur.execute(q, parameters)
        result = self.cur.fetchall()

        return result

    def save(self, repository):
        query = "INSERT INTO repository (name, description, latest_release_number, latest_release_published_at, homepage, package_manager_url, latest_download_url, rank_, stars, forks, dependencies_count, platform_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

        values = (repository['name'], repository['description'], repository['latest_release_number'], repository['latest_release_published_at'], repository['homepage'], repository['package_manager_url'],
                  repository['latest_download_url'], repository['rank_'], repository['stars'], repository['forks'], repository['dependencies_count'], repository['platform_id'])

        self.cur.execute(query, values)

    def find_by_name(self, name):
        query = f"SELECT * FROM repository WHERE name = '{name}'"
        self.cur.execute(query)
        result = self.cur.fetchone()
        self.cur.fetchall()
        return result

    def find_by_id(self, repo_id):
        query = f"SELECT * FROM repository WHERE id = {repo_id}"
        self.cur.execute(query)
        return self.cur.fetchone()
