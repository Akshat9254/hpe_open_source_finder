from flask import Flask, jsonify, request
import mysql.connector

# create a Flask app instance
app = Flask(__name__)

# configure the MySQL database connection
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="password",
  database="open_source_finder"
)

# create a cursor to execute SQL queries
mycursor = mydb.cursor()

# define an endpoint to save platforms to the database
@app.route('/')
def save_platforms():
    
    return jsonify({'message': 'API Working'})

# run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
