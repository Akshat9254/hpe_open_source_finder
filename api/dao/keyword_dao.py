import mysql.connector
import json
from config.config import db_config


class keyword_dao():
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
            print("kewyord_dao Connection failed")

    def find_by_name(self, name):
        query = f"SELECT * FROM keyword WHERE word = '{name}'"
        self.cur.execute(query)
        result = self.cur.fetchone()
        self.cur.fetchall()
        return result

    def find_all(self):
        query = f"SELECT word FROM keyword"
        self.cur.execute(query)
        return self.cur.fetchall()

    def save(self, word):
        query = f"INSERT INTO keyword(word) VALUES ('{word}')"
        self.cur.execute(query)

    def insert_repository_keyword(self, repo_keywords_list):
        if len(repo_keywords_list) == 0:
            return
        query = "INSERT INTO repository_keyword(repository_id, keyword_id) VALUES "

        print("repo_keywords_list", repo_keywords_list)

        flag = False
        for data in repo_keywords_list:
            q = "SELECT * FROM repository_keyword WHERE repository_id = %s AND keyword_id = %s"
            values = (data['repository_id'], data['keyword_id'])
            self.cur.execute(q, values)
            res = self.cur.fetchall()
            if len(res) == 0:
                flag = True
                query += f"({data['repository_id']}, {data['keyword_id']}), "

        if flag == False:
            return
        query = query.rstrip(", ")
        self.cur.execute(query)
        print(
            f"{len(repo_keywords_list)} rows inserted into repository_keyword...")
