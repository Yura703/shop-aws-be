import AWS from 'aws-sdk';

const Client = new AWS.DynamoDB.DocumentClient();

export const handler = async event => {

  try {
    const _id = event.pathParameters.id;
    console.log(_id);

    const outputProduct = await Client.get({
      TableName: 'Products',
      Key: {
        id: _id
      }
    }).promise()

    const outputStocks = await Client.get({
      TableName: 'Stocks',
      Key: {
        product_id: _id
      }
    }).promise()

    if (outputProduct.Item && outputStocks.Item) {
      const { count } = outputStocks.Item;
      console.log({...outputProduct.Item, count});

      return {
        headers: {
          'Content-Type': 'application/json',      
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify({...outputProduct.Item, count} ),      
      }      
    } else return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Product not found' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" })
    }    
  } 
} 
