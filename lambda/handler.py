import json
from utils import get_cors_headers, get_user_from_cookie, unauthorized
from auth import register, confirm, login, logout, get_me
from bugs import get_all_bugs, create_bug, update_bug, delete_bug


def lambda_handler(event, context):
    method = event['httpMethod']
    path = event['path']
    headers = get_cors_headers()

    # CORS preflight
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    try:
        # Auth routes
        if path == '/auth/register' and method == 'POST':
            return register(event, headers)
        elif path == '/auth/confirm' and method == 'POST':
            return confirm(event, headers)
        elif path == '/auth/login' and method == 'POST':
            return login(event, headers)
        elif path == '/auth/logout' and method == 'POST':
            return logout(event, headers)
        elif path == '/auth/me' and method == 'GET':
            return get_me(event, headers)

        # Bug routes - require authentication
        user = get_user_from_cookie(event)
        if not user:
            return unauthorized(headers)

        if method == 'GET' and path == '/bugs':
            return get_all_bugs(user['sub'], headers)
        elif method == 'POST' and path == '/bugs':
            body = json.loads(event['body'])
            return create_bug(body, user['sub'], headers)
        elif method == 'PUT' and '/bugs/' in path:
            bug_id = path.split('/')[-1]
            body = json.loads(event['body'])
            return update_bug(bug_id, body, user['sub'], headers)
        elif method == 'DELETE' and '/bugs/' in path:
            bug_id = path.split('/')[-1]
            return delete_bug(bug_id, user['sub'], headers)
        else:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Route not found'})
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }