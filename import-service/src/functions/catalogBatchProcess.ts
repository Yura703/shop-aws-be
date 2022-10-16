import { SQSEvent } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from 'uuid';

const Client = new AWS.DynamoDB.DocumentClient();

export const catalogBatchProcess = async (event: SQSEvent) => {
  
  const sns = new AWS.SNS({ region: "eu-west-1" });
  const bodyEvent = await event.Records.map(({ body }) => JSON.parse(body));
 
  for await (let data of bodyEvent) {    
    try {   
      const {count, ...rest} = data;

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
      
      sns.publish({
        Subject: "Added new record",
        Message: JSON.stringify(data),
        TopicArn: process.env.SNS_ARN,
        MessageAttributes: {
            countCategory: {
              DataType: 'String',
              StringValue: data.count >= 5 ? 'High' : 'Low',
            },
          },
        },
        () => {
          console.log("EMAIL:" + JSON.stringify(bodyEvent));
        }
      );
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Something went wrong" })
      };     
    } 
  }    

  

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,    
      "Content-Type": "application/JSON",
      "Access-Control-Allow-Headers": "Content-Type",              
    },
    body: JSON.stringify(bodyEvent),

    isBase64Encoded: false,
  };
} 
 