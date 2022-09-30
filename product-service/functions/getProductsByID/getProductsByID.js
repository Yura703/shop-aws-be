//import products from '../productList.json';
/*import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
};

const handlerGetByID = (products = {}, status = 200) => ( 
  {
    headers: {
      'Content-Type': 'application/json',      
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: status,
    body: JSON.stringify(products),
  }
);

// export const handler = async (event) => {
//   const { productId } = event.pathParameters || null;

//   const product = await products.find(({ id }) => id === productId);
  
//   if (!product)  { 
//     return handlerGetByID({ message: 'Error: Product not found!' }, 400);
//   }
//     return handlerGetByID({ ...product }, 200);
// };

export const handler = async event => {
  const { productId } = event.pathParameters || null;
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const { rows: product } = await client.query(`select * from products where id='${productId}'`);
    return await handlerGetByID(product, 200);

  } catch (error) {
    console.error('Error: ' + error);
  } finally {
    client.end();
  }
}*/

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
