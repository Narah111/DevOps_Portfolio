import os
import boto3

cognito = boto3.client('cognito-idp')

USER_POOL_ID = os.environ['USER_POOL_ID']
CLIENT_ID = os.environ['CLIENT_ID']
FRONTEND_URL = os.environ['FRONTEND_URL']

def get_cors_headers():
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': FRONTEND_URL,
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true'
    }

def get_user_from_cookie(event):
    # Extract access token from cookie header
    cookies = event.get('headers', {}).get('Cookie', '') or \
              event.get('headers', {}).get('cookie', '')

    if not cookies:
        return None

    token = None
    for cookie in cookies.split(';'):
        cookie = cookie.strip()
        if cookie.startswith('access_token='):
            token = cookie.split('=', 1)[1]
            break

    if not token:
        return None

    try:
        response = cognito.get_user(AccessToken=token)
        user = {'sub': None, 'email': None}
        for attr in response['UserAttributes']:
            if attr['Name'] == 'sub':
                user['sub'] = attr['Value']
            elif attr['Name'] == 'email':
                user['email'] = attr['Value']
        return user
    except Exception:
        return None

def unauthorized(headers):
    return {
        'statusCode': 401,
        'headers': headers,
        'body': '{"error": "Unauthorized"}'
    }