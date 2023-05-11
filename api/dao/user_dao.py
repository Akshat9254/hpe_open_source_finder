import mysql.connector
import json
from config.config import db_config


class user_dao():
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

    def find_by_email(self, email):
        query = f"SELECT * FROM user WHERE email = '{email}'"
        self.cur.execute(query)
        result = self.cur.fetchone()
        self.cur.fetchall()
        return result

    def save(self, name, email, password):
        query = f"INSERT INTO user(name, email, password) VALUES ('{name}', '{email}', '{password}')"
        self.cur.execute(query)

    
