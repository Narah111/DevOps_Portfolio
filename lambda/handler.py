import json
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('bugs')

def lambda_handler(event, context):
    method = event['httpMethod']
    path = event['path']

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }

    # CORS preflight
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    try:
        if method == 'GET' and path == '/bugs':
            return get_all_bugs(headers)

        elif method == 'POST' and path == '/bugs':
            body = json.loads(event['body'])
            return create_bug(body, headers)

        elif method == 'PUT' and '/bugs/' in path:
            bug_id = path.split('/')[-1]
            body = json.loads(event['body'])
            return update_bug(bug_id, body, headers)

        elif method == 'DELETE' and '/bugs/' in path:
            bug_id = path.split('/')[-1]
            return delete_bug(bug_id, headers)

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


def get_all_bugs(headers):
    response = table.scan()
    bugs = sorted(response['Items'], key=lambda x: x['createdAt'], reverse=True)
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(bugs)
    }


def create_bug(body, headers):
    bug = {
        'id': str(uuid.uuid4()),
        'title': body['title'],
        'description': body.get('description', ''),
        'priority': body.get('priority', 'Medium'),
        'status': 'Open',
        'createdAt': datetime.utcnow().isoformat()
    }
    table.put_item(Item=bug)
    return {
        'statusCode': 201,
        'headers': headers,
        'body': json.dumps(bug)
    }


def update_bug(bug_id, body, headers):
    response = table.update_item(
        Key={'id': bug_id},
        UpdateExpression='SET #s = :s',
        ExpressionAttributeNames={'#s': 'status'},
        ExpressionAttributeValues={':s': body['status']},
        ReturnValues='ALL_NEW'
    )
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(response['Attributes'])
    }


def delete_bug(bug_id, headers):
    table.delete_item(Key={'id': bug_id})
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'message': 'Bug deleted'})
    }