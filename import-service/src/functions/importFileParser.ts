
import { middyfy } from "../libs/lambda";
import { S3Event } from "aws-lambda";
import AWS from "aws-sdk";
import parser from "csv-parser";

const results = [];
let BUCKET = "";

export const importFileParser = async (event: S3Event) => {
  const s3 = new AWS.S3({ region: "eu-west-1" });
  const sqs = new AWS.SQS();

  if (!event.Records) {
    return { statusCode: 404 }
  }

  for (let record of event.Records) {
    const key = record.s3.object.key;
    BUCKET = record.s3.bucket.name;

    const params = { Bucket: BUCKET, Key: key };

    await new Promise((resolve, _reject) => {
      s3.getObject(params).createReadStream()
      .pipe(parser(["title", "description", "price", "count", "imageId"]))
      .on("data", (item) => {

        sqs.sendMessage(
          {
            QueueUrl: process.env.SQS_URL,
            MessageBody: JSON.stringify(item),
          }, () => {
            console.log('Send message - ' + item);
          }
        );        
      })
      .on("end", async () => {
        console.log(JSON.stringify(results));

        await s3.copyObject({ 
          Bucket: BUCKET, Key: key.replace("uploaded", "parsed"),
          CopySource: BUCKET + "/" + key
        }).promise();

        await s3.deleteObject({ Bucket: BUCKET, Key: key }).promise();

        resolve(`OK`);
    	});   
    });
  }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
        "Access-Control-Expose-Headers": "*",
        Allow: "GET, PUT, POST, DELETE",
      },
      body: JSON.stringify(results),
    };  
}

export const main = middyfy(importFileParser);
