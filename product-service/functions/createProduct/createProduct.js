import AWS from 'aws-sdk';
import { v4 } from 'uuid';

const Client = new AWS.DynamoDB.DocumentClient();

export const handler = async event => {
  const body = JSON.parse(event.body);
  const product = {
    ...body,
    id: v4(),
  };

  await Client.put({
    TableName: 'ProductsTable',    
    Item: product,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(product),
  };
} 