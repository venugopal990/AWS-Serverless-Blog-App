import json
import boto3

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = 'BlogPosts'  # DynamoDB table name
# Get DynamoDB table
table = dynamodb.Table(table_name)


def lambda_handler(event, context):
    # Print the event object
    print("Received event:", json.dumps(event))
    # Get postId from path parameter
    post_id = event['postId']

    # Delete post from DynamoDB
    try:
        table.delete_item(Key={'postId': post_id})
        response = {
            'statusCode': 200,
            'body': json.dumps({'message': 'Post deleted successfully'})
        }
    except Exception as e:
        response = {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error deleting post: ' + str(e)})
        }

    return response