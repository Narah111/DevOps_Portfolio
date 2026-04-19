import json
import boto3
import uuid
import os
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME']) # type: ignore


def get_all_bugs(user_id, headers):
    response = table.scan(
        FilterExpression='userId = :uid',
        ExpressionAttributeValues={':uid': user_id}
    )
    bugs = sorted(response['Items'], key=lambda x: x['createdAt'], reverse=True)
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(bugs)
    }


def create_bug(body, user_id, headers):
    bug = {
        'id': str(uuid.uuid4()),
        'userId': user_id,
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


def update_bug(bug_id, body, user_id, headers):
    response = table.update_item(
        Key={'id': bug_id},
        UpdateExpression='SET #s = :s',
        ConditionExpression='userId = :uid',
        ExpressionAttributeNames={'#s': 'status'},
        ExpressionAttributeValues={
            ':s': body['status'],
            ':uid': user_id
        },
        ReturnValues='ALL_NEW'
    )
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(response['Attributes'])
    }


def delete_bug(bug_id, user_id, headers):
    table.delete_item(
        Key={'id': bug_id},
        ConditionExpression='userId = :uid',
        ExpressionAttributeValues={':uid': user_id}
    )
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'message': 'Bug deleted'})
    }