from flask import Flask, request, jsonify
import jwt
from sql import get_db_connection
from flask import make_response, jsonify

app = Flask(__name__)
SECRET_KEY = "kakinotane"


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
        # トークンを生成
        token = jwt.encode({'username': username},
                           SECRET_KEY, algorithm='HS256')
        # トークンをクッキーに保存
        resp = make_response(jsonify({'token': token}))
        # クッキーの設定(secure=Falseはssl導入後にTrueにする)
        resp.set_cookie("token", token, httponly=True,
                        secure=False, samesite='Lax')
        return resp

    else:
        return jsonify({'error': 'Invalid credentials'}), 401


@app.route('/api/logout', methods=['POST'])
def logout():
    resp = make_response(jsonify({"success": True}))
    resp.set_cookie("token", "", expires=0, httponly=True,
                    secure=False, samesite='Lax')
    return resp


if __name__ == '__main__':
    # ポートの設定を9000にする
    app.run(host='0.0.0.0', port=9000, debug=True)
