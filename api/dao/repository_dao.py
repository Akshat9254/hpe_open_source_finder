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
        query = "SELECT * FROM repository WHERE name IN ("
        placeholders = ",".join(["%s"] * len(keywords))
        query += placeholders + ")"
        self.cur.execute(query, keywords)
        result = self.cur.fetchall()
        return result
