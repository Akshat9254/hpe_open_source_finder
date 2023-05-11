import mysql.connector
import json
from config.config import db_config


class license_dao():
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

    def find_by_name(self, name):
        query = f"SELECT * FROM license WHERE name = '{name}'"
        self.cur.execute(query)
        result = self.cur.fetchone()
        self.cur.fetchall()
        return result
    
    def find_all(self):
        query = f"SELECT * FROM license LIMIT 10"
        self.cur.execute(query)
        return self.cur.fetchall()

    def save(self, name):
        query = f"INSERT INTO license(name) VALUES ('{name}')"
        self.cur.execute(query)

    def insert_repository_license(self, repo_license_list):
        query = "INSERT INTO repository_license(repository_id, license_id) VALUES "
        if len(repo_license_list) == 0:
            return
        flag = False
        for data in repo_license_list:
            q = "SELECT * FROM repository_license WHERE repository_id = %s AND license_id = %s"
            values = (data['repository_id'], data['license_id'])
            self.cur.execute(q, values)
            res = self.cur.fetchall()
            if len(res) == 0:
                flag = True
                query += f"({data['repository_id']}, {data['license_id']}), "
        if flag == False:
            return
        query = query.rstrip(", ")
        self.cur.execute(query)
        print(
            f"{len(repo_license_list)} rows inserted into repository_license...")
