import requests
from dao.repository_dao import repository_dao
from dao.keyword_dao import keyword_dao
from dao.license_dao import license_dao
from config.config import api_config

from utils import fuzzy

from service.platform_service import platform_service

platform_service = platform_service()
repository_dao = repository_dao()
keyword_dao = keyword_dao()
license_dao = license_dao()


class repository_service():
    def search_by_keywords(self, keywords, licenses):
        if len(keywords) == 0:
            return repository_dao.get_repositories()
        else:
            db_keyords = keyword_dao.find_all()
            db_keyords = [row['word'] for row in db_keyords]
            keywords = fuzzy.extract_top_n_words(db_keyords, keywords, n=5)
            res = repository_dao.get_repositories_by_keywords(
                keywords, licenses)
            if len(res) > 0:
                return res
            else:
                self.insert_repositories(keywords)
                return repository_dao.get_repositories_by_keywords(keywords, licenses)

    def find_by_id(self, repo_id):
        return repository_dao.find_by_id(repo_id)

    def insert_repositories(self, keywords):
        url = "https://libraries.io/api/search"
        res = requests.get(url, params={
            "api_key": api_config['api_key'],
            "q": keywords
        })

        res = res.json()

        repo_data = {}
        repo_keywords = {}
        repo_licenses = {}
        repo_platform = {}

        for data in res:
            repo_name = data['name']

            repo_data[repo_name] = {
                "name": data['name'],
                "description": data['description'],
                "latest_release_number": data['latest_release_number'],
                "latest_release_published_at": data['latest_release_published_at'],
                "homepage": data['homepage'],
                "package_manager_url": data['package_manager_url'],
                "latest_download_url": data['latest_download_url'],
                "rank_": data['rank'],
                "stars": data['stars'],
                "forks": data['forks'],
                "dependencies_count": data['dependents_count']
            }

            repo_keywords[repo_name] = data["keywords"]
            repo_licenses[repo_name] = data['normalized_licenses']

            platform = platform_service.find_by_name(data['platform'])
            repo_data[repo_name]['platform_id'] = platform['id']
            repository_dao.save(repo_data[repo_name])

        print('repositories saved!!!')

        repo_keywords_list = []

        print("repo_keywords ", repo_keywords)

        for repo_name in repo_keywords:
            repo = repository_dao.find_by_name(repo_name)

            if len(repo_keywords[repo_name]) != 0:
                for keyword in repo_keywords[repo_name]:
                    keyword_db = keyword_dao.find_by_name(keyword)
                    if keyword_db is None:
                        keyword_dao.save(keyword)
                        keyword_db = keyword_dao.find_by_name(keyword)
                    print(keyword_db)

                repo_keywords_list.append(
                    {'repository_id': repo['id'], 'keyword_id': keyword_db['id']})

            keyword_dao.insert_repository_keyword(repo_keywords_list)
            print('keywords saved!!!')

        repo_license_list = []

        for repo_name in repo_licenses:
            repo = repository_dao.find_by_name(repo_name)

            for license_name in repo_licenses[repo_name]:
                license_db = license_dao.find_by_name(license_name)
                if license_db is None:
                    license_dao.save(license_name)
                    license_db = license_dao.find_by_name(license_name)

            repo_license_list.append(
                {'repository_id': repo['id'], 'license_id': license_db['id']})

        license_dao.insert_repository_license(repo_license_list)
        print('licenses saved!!!')

        return repo_data, repo_keywords, repo_licenses, repo_platform
