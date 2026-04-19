import json
import boto3
from utils import get_cors_headers, CLIENT_ID, USER_POOL_ID

cognito = boto3.client('cognito-idp')

def register(event, headers):
    body = json.loads(event['body'])
    email = body['email']
    password = body['password']

    cognito.sign_up(
        ClientId=CLIENT_ID,
        Username=email,
        Password=password,
        UserAttributes=[{'Name': 'email', 'Value': email}]
    )

    return {
        'statusCode': 201,
        'headers': headers,
        'body': json.dumps({
            'message': 'Registration successful. Please check your email for a verification code.',
            'email': email
        })
    }


def confirm(event, headers):
    body = json.loads(event['body'])
    email = body['email']
    code = body['code']

    cognito.confirm_sign_up(
        ClientId=CLIENT_ID,
        Username=email,
        ConfirmationCode=code
    )

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'message': 'Email confirmed successfully'})
    }


def login(event, headers):
    body = json.loads(event['body'])
    email = body['email']
    password = body['password']

    response = cognito.initiate_auth(
        ClientId=CLIENT_ID,
        AuthFlow='USER_PASSWORD_AUTH',
        AuthParameters={
            'USERNAME': email,
            'PASSWORD': password
        }
    )

    tokens = response['AuthenticationResult']
    id_token = tokens['IdToken']
    access_token = tokens['AccessToken']
    refresh_token = tokens['RefreshToken']

    cookie_opts = 'HttpOnly; Secure; SameSite=None; Path=/; Max-Age=3600'
    refresh_opts = 'HttpOnly; Secure; SameSite=None; Path=/; Max-Age=2592000'

    return {
        'statusCode': 200,
        'headers': headers,
        'multiValueHeaders': {
            'Set-Cookie': [
                f'id_token={id_token}; {cookie_opts}',
                f'access_token={access_token}; {cookie_opts}',
                f'refresh_token={refresh_token}; {refresh_opts}'
            ]
        },
        'body': json.dumps({'email': email})
    }


def logout(event, headers):
    clear_opts = 'HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0'

    return {
        'statusCode': 200,
        'headers': headers,
        'multiValueHeaders': {
            'Set-Cookie': [
                f'id_token=; {clear_opts}',
                f'access_token=; {clear_opts}',
                f'refresh_token=; {clear_opts}'
            ]
        },
        'body': json.dumps({'message': 'Logged out successfully'})
    }


def get_me(event, headers):
    from utils import get_user_from_cookie
    user = get_user_from_cookie(event)
    if not user:
        return {
            'statusCode': 401,
            'headers': headers,
            'body': json.dumps({'error': 'Unauthorized'})
        }
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'email': user['email'], 'sub': user['sub']})
    }