from dao.platform_dao import platform_dao

platform_dao = platform_dao()


class platform_service():
    def get_all_platforms(self):
        return platform_dao.get_all_platforms()

    def find_by_name(self, name):
        return platform_dao.find_by_name(name)
