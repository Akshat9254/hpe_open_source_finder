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
            print("repository_dao Connection failed")

    def get_repositories_by_keywords(self, keywords, licenses):
        name_conditions = ' OR '.join(
            ['r.name COLLATE utf8mb4_general_ci LIKE %s'] * len(keywords))
        description_conditions = ' OR '.join(
            ['r.description COLLATE utf8mb4_general_ci LIKE %s'] * len(keywords))
        keyword_conditions = ' OR '.join(
            ['k.word COLLATE utf8mb4_general_ci LIKE %s'] * len(keywords))

        q = ""
        parameters = [f'%{keyword}%' for keyword in keywords] + \
            [f'%{keyword}%' for keyword in keywords] + \
            [f'%{keyword}%' for keyword in keywords]

        if licenses and len(licenses) > 0:
            license_conditions = ' OR '.join(['l.name = %s'] * len(licenses))
            q += "SELECT DISTINCT r.*, l.name AS 'license' FROM repository r"
            q += " INNER JOIN repository_keyword rk ON r.id = rk.repository_id"
            q += " INNER JOIN keyword k ON k.id = rk.keyword_id"
            q += " INNER JOIN repository_license rl ON r.id = rl.repository_id"
            q += " INNER JOIN license l ON l.id = rl.license_id"
            q += " WHERE (({name_conditions} OR {description_conditions}) OR k.word COLLATE utf8mb4_general_ci LIKE %s) AND l.name COLLATE utf8mb4_general_ci IN ({license_conditions}) LIMIT 5"
            parameters += licenses
        else:
            q += "SELECT DISTINCT r.* FROM repository r"
            q += " INNER JOIN repository_keyword rk ON r.id = rk.repository_id"
            q += " INNER JOIN keyword k ON k.id = rk.keyword_id"
            q += " WHERE ({name_conditions} OR {description_conditions}) OR k.word COLLATE utf8mb4_general_ci LIKE %s LIMIT 5"

        self.cur.execute(q.format(
            name_conditions=name_conditions,
            description_conditions=description_conditions,
            keyword_conditions=keyword_conditions,
            license_conditions=license_conditions if licenses else ""
        ), tuple(parameters))
        result = self.cur.fetchall()

        return result

    def get_repositories(self):
        query = "SELECT * FROM repository LIMIT 5"
        self.cur.execute(query)
        return self.cur.fetchall()

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
