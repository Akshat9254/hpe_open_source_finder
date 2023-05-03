from flask import Flask, request
# from elasticsearch import Elasticsearch

# es = Elasticsearch(hosts=["http://127.0.0.1:9200"])

# print(f"Connected to ElasticSearch cluster `{es.info().body['cluster_name']}`")

app = Flask(__name__)

MAX_SIZE = 15


# @app.route("/search")
# def search_autocomplete():
#     query = request.args.get("q", "").lower()
#     tokens = query.split(",")
#     clauses = [
#         {
#             "span_multi": {
#                 "match": {"fuzzy": {"name": {"value": i, "fuzziness": "AUTO"}}}
#             }
#         }
#         for i in tokens
#     ]
#     payload = {
#         "bool": {
#             "must": [{"span_near": {"clauses": clauses, "slop": 0, "in_order": False}}]
#         }
#     }

#     resp = es.search(index="cars", query=payload, size=MAX_SIZE)
#     return [result['_source']['name'] for result in resp['hits']['hits']]


try:
    from controller import *
except Exception as e:
    print(e)


if __name__ == "__main__":
    app.run(debug=True)
