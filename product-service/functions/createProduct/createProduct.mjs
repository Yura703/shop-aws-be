import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const Client = new AWS.DynamoDB.DocumentClient();

export const handler = async event => {
  try {    
    const body = JSON.parse(event.body);
    console.log(body);
    const {count, ...rest} = body;

    if (!body.hasOwnProperty('title') || !body.hasOwnProperty('description') || 
      !body.hasOwnProperty('price') || !body.hasOwnProperty('count')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Product data is invalid" }),
      };
    }  
 
    const product = {
      ...rest,
      id: uuidv4(),
    };  
    
    const stocks = {    
        count,
        product_id: product.id,
    }  

    await Client.put({
      TableName: 'Products',    
      Item: product,
    }).promise();

    await Client.put({
      TableName: 'Stocks',    
      Item: stocks,
    }).promise();

    return {
      headers: {
        'Content-Type': 'application/json',      
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 201,
      body: JSON.stringify(product) + "\n" + JSON.stringify(stocks),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" })
    }; 
  }
  
} 