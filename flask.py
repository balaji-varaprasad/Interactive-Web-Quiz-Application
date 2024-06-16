from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="your_mysql_username",
            password="your_mysql_password",
            database="quiz_app"
        )
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection

@app.route('/submit', methods=['POST'])
def submit_score():
    data = request.get_json()
    name = data['name']
    score = data['score']

    connection = create_connection()
    cursor = connection.cursor()
    query = "INSERT INTO results (name, score) VALUES (%s, %s)"
    cursor.execute(query, (name, score))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Score submitted successfully!"}), 200

if __name__ == "__main__":
    app.run(debug=True)
