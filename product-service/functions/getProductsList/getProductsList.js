import AWS from 'aws-sdk';

const Client = new AWS.DynamoDB.DocumentClient();

export const handler = async event => {
 try {  
  const outputProduct = await Client.scan({
    TableName: 'Products',
  }).promise()

  const outputStocks = await Client.scan({
    TableName: 'Stocks',
  }).promise()  

  const arr = outputProduct.Items;
  
  return {
    statusCode: 200,
    body: JSON.stringify(arr.map((item, index) => {
      return {...item, ...outputStocks.Items[index]}
    }))
  }; 

 } catch (error) {
  return {
    statusCode: 500,
    body: JSON.stringify({ error })
  }; 
 }   
} 
