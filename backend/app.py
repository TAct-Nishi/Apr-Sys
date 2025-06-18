from flask import Flask, request, jsonify
import jwt
from sql import get_db_connection

app = Flask(__name__)
SECRET_KEY = "kakinotane"


@app.route('/')
def index():
    return 'Hello World'


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    user = cur.fetchone()
    cur.close()
    conn.close()
    if user:
        token = jwt.encode({'username': username},
                           SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401


if __name__ == '__main__':
    # ポートの設定を9000にする
    app.run(host='0.0.0.0', port=9000, debug=True)
