import json
import boto3

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = 'BlogPosts'  # DynamoDB table name

def lambda_handler(event, context):
    # Get DynamoDB table
    table = dynamodb.Table(table_name)

    # Retrieve all posts from DynamoDB
    try:
        response = table.scan()
        items = response.get('Items', [])

        # Sort the items by post ID
        sorted_items = sorted(items, key=lambda x: x.get('postId', ''), reverse=True)

        # Prepare the response
        response = {
            'statusCode': 200,
            'body': sorted_items
        }
    except Exception as e:
        response = {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error retrieving posts: ' + str(e)})
        }

    return response
