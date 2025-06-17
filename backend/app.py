from flask import Flask, request, jsonify
import jwt

app = Flask(__name__)
SECRET_KEY = "your_secret_key"


@app.route('/api/login', methods=['POST'])
def login():
    data = request.jsoncd
    username = data.get('username')
    password = data.get('password')
    # ここでDBと照合
    if username == "test" and password == "password":
        token = jwt.encode({'username': username},
                           SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401
