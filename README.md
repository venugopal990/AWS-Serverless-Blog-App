# Serverless Blog Post with S3 Bucket and CloudFront

## Overview

The Serverless Blog Post project is a simple yet powerful example of leveraging serverless architecture for hosting and managing a blog. Instead of traditional server-based setups, this project utilizes serverless computing, allowing for greater scalability, cost efficiency, and ease of maintenance.


## Features
- **CloudFront Integration:** Amazon CloudFront is seamlessly integrated with the S3 bucket hosting the static website, enabling efficient content delivery across the globe.

- **Improved Performance:** CloudFront caches content at edge locations, reducing latency and improving website load times for users accessing the blog from various geographical locations.

- **Serverless Backend:** The backend remains serverless, utilizing AWS Lambda, API Gateway, and DynamoDB for managing blog post data and API interactions.

- **Seamless Integration:** The frontend and backend components seamlessly integrate to create a cohesive blogging platform, delivering a smooth user experience.

- **Cost Efficiency:** With a serverless architecture and S3 static website hosting, the project maintains a cost-effective infrastructure, scaling resources based on demand.

## Technologies Used
- **Amazon CloudFront:** A content delivery network (CDN) service for distributing static and dynamic web content to edge locations worldwide.

- **Amazon S3:** For storing static website files, including HTML, CSS, JavaScript, and media assets.

- **AWS Lambda, API Gateway, and DynamoDB:** Backend components for managing blog post data and API interactions, deployed in a serverless architecture.

- **AWS IAM:** For managing access to AWS services securely.

- **GitHub:** Version control and collaboration on the project's source code.

## The below diagram explains the structure of my project:

![alt text](https://github.com/venugopal990/AWS-Serverless-Blog-App/blob/master/BlogPost-Aws-Architecture-Diagram.png?raw=true)