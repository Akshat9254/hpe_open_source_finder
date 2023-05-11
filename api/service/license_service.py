from flask import jsonify
from dao.license_dao import license_dao

license_dao = license_dao()

class license_service():
    def find_all(self):
        return license_dao.find_all()

