import mysql.connector
import json
import requests
from config.config import api_config, db_config


class platform_dao():
    def __init__(self):
        try:
            self.con = mysql.connector.connect(
                host=db_config['host'],
                user=db_config["user"],
                password=db_config['password'],
                database=db_config['database'])
            self.con.autocommit = True
            self.cur = self.con.cursor(dictionary=True)
            print("connection successful")
        except:
            print("platform_dao Connection failed")

    def hello(self):
        return "hello"

    def insert_platforms(self):
        api_key = api_config['api_key']
        endpoint = "https://libraries.io/api/platforms"
        res = requests.get(endpoint, params={api_key: api_key})
        res = res.json()

        query = "INSERT INTO platform(name, project_count, homepage) VALUES "

        if len(res) > 0:
            for data in res:
                query += f"('{data['name']}', {data['project_count']}, '{data['homepage']}'), "
            query = query.rstrip(", ")
            query += ";"
            self.cur.execute(query)
            return f"{len(res)} rows inserted!"
        else:
            return "no platforms found"

    def get_all_platforms(self):
        self.cur.execute("SELECT * FROM platform LIMIT 10")
        return self.cur.fetchall()

    def find_by_name(self, name):
        self.cur.execute(f"SELECT * FROM platform WHERE name = '{name}'")
        result = self.cur.fetchone()
        self.cur.fetchall()
        return result
