from app import app
from flask import request
from service.user_service import user_service

user_service = user_service()


@app.route("/user/register", methods=["POST"])
def register_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    return user_service.register_user(name, email, password)

@app.route("/user/login", methods=["POST"])
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    return user_service.login_user(email, password)