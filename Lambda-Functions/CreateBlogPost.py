import json
import boto3
from boto3.dynamodb.conditions import Key

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = 'BlogPosts'  # DynamoDB table name
# Get DynamoDB table
table = dynamodb.Table(table_name)



def lambda_handler(event, context):
    # Parse request body
    title = event['title']
    content = event['content']
    url = event.get('url')



    # Insert post into DynamoDB
    try:
        item = {
            'postId': generate_post_id(),
            'title': title,
            'content': content
        }
        if url:  # Check if URL is provided
            item['url'] = url

        table.put_item(Item=item)
        response = {
            'statusCode': 200,
            'body': json.dumps({'message': 'Post created successfully'})
        }
    except Exception as e:
        response = {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error creating post: ' + str(e)})
        }

    return response


def get_max_post_id():
    response = table.scan(
        Select='SPECIFIC_ATTRIBUTES',  # Specify the attributes to return
        ProjectionExpression='postId',  # Only return the postId attribute
    )
    max_post_id = 0
    for item in response['Items']:
        post_id = item.get('postId')
        if post_id and post_id > max_post_id:
            max_post_id = post_id
    return max_post_id




def generate_post_id():
    max_post_id = get_max_post_id()
    print(max_post_id)
    next_post_id = max_post_id + 1
    return next_post_id