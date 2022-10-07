import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from 'aws-lambda';
import { middyfy } from "../../libs/lambda";

const BUCKET = "yura703-task5";

export const importProductsFile = async (event: APIGatewayProxyEvent) => {
  const s3 = new AWS.S3({ region: "eu-west-1" });
  const { name } = event.queryStringParameters;
  const params = {
    Bucket: BUCKET,
    Key: `uploaded/${name}`,    
    Expires: 120,
    ContentType: "text/csv"
  };

  const body = JSON.stringify(s3.getSignedUrl("putObject", params));

  return {
    statusCode: 201,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: body,
  };
};

export const main = middyfy(importProductsFile);