import requests
from app import app
from flask import request
from dao.repository_dao import repository_dao
from config.config import api_config

repository_dao = repository_dao()


@app.route("/repository", methods=["GET"])
def get_repositories_by_keywords():
    # res = repository_dao.get_repositories_by_keywords(keywords)
    keywords = request.args.getlist('keywords')
    # print(keywords)
    # return "ok"
    # if len(res) == 0:
    # print(api_config['api_key'], keywords)
    # return "ok"
    url = "https://libraries.io/api/search"
    res = requests.get(url, params={
        "api_key": api_config['api_key'],
        "q": keywords
    })
    res = res.json()
    return res

    # repo_data = {}
    # repo_keywords = {}
    # repo_licenses = {}
    # repo_platform = {}

    # for data in res:
    #     name = data['name']

    #     repo_data[name] = {
    #         "name": data['name'],
    #         "description": data['description'],
    #         "latest_release_number": data['latest_release_number'],
    #         "latest_release_published_at": data['latest_release_published_at'],
    #         "homepage": data['homepage'],
    #         "package_manager_url": data['package_manager_url'],
    #         "latest_download_url": data['latest_download_url'],
    #         "rank_": data['rank'],
    #         "stars": data['stars'],
    #         "forks": data['forks'],
    #         "dependencies_count": data['dependencies_count']
    #     }

    #     repo_keywords[name] = data["keywords"]
    #     repo_licenses[name] = data['normalized_licenses']
    #     repo_platform[name] = data['platform']
