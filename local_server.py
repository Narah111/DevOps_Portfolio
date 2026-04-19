from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import json
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:5173'])

DB_FILE = 'local_db.json'

# ─── Mock user store ──────────────────────────────────────────────────────────

USERS_FILE = 'local_users.json'

def read_users():
    try:
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def write_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

# ─── Mock database ────────────────────────────────────────────────────────────

def read_bugs():
    try:
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def write_bugs(bugs):
    with open(DB_FILE, 'w') as f:
        json.dump(bugs, f, indent=2)

# ─── Auth helpers ─────────────────────────────────────────────────────────────

def get_current_user():
    # Read user from mock session cookie
    user_id = request.cookies.get('access_token')
    if not user_id:
        return None
    users = read_users()
    return users.get(user_id)

# ─── Auth routes ──────────────────────────────────────────────────────────────

@app.route('/auth/register', methods=['POST'])
def register():
    body = request.get_json()
    email = body['email']
    password = body['password']
    name = body['name']
    family_name = body['family_name']

    users = read_users()

    for u in users.values():
        if u['email'] == email:
            return jsonify({'error': 'An account with this email already exists'}), 400

    user_id = str(uuid.uuid4())
    users[user_id] = {
        'sub': user_id,
        'email': email,
        'password': password,
        'name': name,
        'family_name': family_name
    }
    write_users(users)

    return jsonify({
        'message': 'Registration successful. Use any 6-digit code to confirm.',
        'email': email
    }), 201


@app.route('/auth/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body['email']
    password = body['password']

    users = read_users()

    matched_user = None
    matched_id = None
    for user_id, user in users.items():
        if user['email'] == email and user['password'] == password:
            matched_user = user
            matched_id = user_id
            break

    if not matched_user:
        return jsonify({'error': 'Invalid email or password'}), 401

    response = make_response(jsonify({
        'email': email,
        'name': matched_user.get('name', ''),
        'family_name': matched_user.get('family_name', ''),
        'sub': matched_id
    }))
    response.set_cookie(
        'access_token',
        matched_id,
        httponly=True,
        samesite='Lax',
        max_age=3600
    )
    return response


@app.route('/auth/me', methods=['GET'])
def get_me():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    return jsonify({
        'email': user['email'],
        'sub': user['sub'],
        'name': user.get('name', ''),
        'family_name': user.get('family_name', '')
    })

# ─── Bug routes ───────────────────────────────────────────────────────────────

@app.route('/bugs', methods=['GET'])
def get_bugs():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    bugs = read_bugs()
    user_bugs = [b for b in bugs if b.get('userId') == user['sub']]
    user_bugs.sort(key=lambda x: x['createdAt'], reverse=True)
    return jsonify(user_bugs)


@app.route('/bugs', methods=['POST'])
def create_bug():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    body = request.get_json()
    bug = {
        'id': str(uuid.uuid4()),
        'userId': user['sub'],
        'title': body['title'],
        'description': body.get('description', ''),
        'priority': body.get('priority', 'Medium'),
        'status': 'Open',
        'createdAt': datetime.utcnow().isoformat()
    }
    bugs = read_bugs()
    bugs.append(bug)
    write_bugs(bugs)
    return jsonify(bug), 201


@app.route('/bugs/<bug_id>', methods=['PUT'])
def update_bug(bug_id):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    body = request.get_json()
    bugs = read_bugs()
    for bug in bugs:
        if bug['id'] == bug_id and bug.get('userId') == user['sub']:
            bug['status'] = body['status']
            write_bugs(bugs)
            return jsonify(bug)
    return jsonify({'error': 'Bug not found'}), 404


@app.route('/bugs/<bug_id>', methods=['DELETE'])
def delete_bug(bug_id):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    bugs = read_bugs()
    bugs = [b for b in bugs if not (b['id'] == bug_id and b.get('userId') == user['sub'])]
    write_bugs(bugs)
    return jsonify({'message': 'Bug deleted'})


if __name__ == '__main__':
    app.run(port=8000, debug=True)