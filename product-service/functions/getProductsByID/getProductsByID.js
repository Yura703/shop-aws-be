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
const tableName = 'ProductsTable';

export const handler = async event => {
  const _id = event.pathParameters.id;

  const output = await Client.get({
    TableName: tableName,
    Key: {
      id: _id
    }
  }).promise()

  if (!output.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'product not found' })
    }
  } else return {
    statusCode: 200,
    body: JSON.stringify(output.Item),
  };
} 
