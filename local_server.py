from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Local JSON file that acts as our "database"
DB_FILE = 'local_db.json'

def read_bugs():
    try:
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def write_bugs(bugs):
    with open(DB_FILE, 'w') as f:
        json.dump(bugs, f, indent=2)

@app.route('/bugs', methods=['GET'])
def get_bugs():
    bugs = read_bugs()
    bugs.sort(key=lambda x: x['createdAt'], reverse=True)
    return jsonify(bugs)

@app.route('/bugs', methods=['POST'])
def create_bug():
    body = request.get_json()
    bug = {
        'id': str(uuid.uuid4()),
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
    body = request.get_json()
    bugs = read_bugs()
    for bug in bugs:
        if bug['id'] == bug_id:
            bug['status'] = body['status']
            write_bugs(bugs)
            return jsonify(bug)
    return jsonify({'error': 'Bug not found'}), 404

@app.route('/bugs/<bug_id>', methods=['DELETE'])
def delete_bug(bug_id):
    bugs = read_bugs()
    bugs = [b for b in bugs if b['id'] != bug_id]
    write_bugs(bugs)
    return jsonify({'message': 'Bug deleted'})

if __name__ == '__main__':
    app.run(port=8000, debug=True)