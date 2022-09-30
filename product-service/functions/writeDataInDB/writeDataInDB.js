import AWS from 'aws-sdk';
//import { v4 } from 'uuid';

const products = [
  {
    "count": 5,
    "description": "The Beatles - Let It Be [LP] 2020",
    "price": 10,
    "title": "The Beatles 1970", 
    "imageId": "000001"
  },
  {
    "count": 1,
    "description": "Jimi Hendrix - Both Sides Of The Sky [2LP] 1970",
    "price": 150,
    "title": "Jimi Hendrix 1970", 
    "imageId": "000002"
  },
  {
    "count": 10,
    "description": "The Beatles - Abbey Road [LP] 2019",
    "price": 23,
    "title": "The Beatles 1969", 
    "imageId": "000003"
  },
  {
    "count": 1,
    "description": "Short Product Description7",
    "price": 15,
    "title": "The Beatles", 
    "imageId": "000004"
  },
  {
    "count": 1,
    "description": "Queen - Greatest Hits [2LP] 2016",
    "price": 23,
    "title": "Queen 1981", 
    "imageId": "000005"
  },
  {
    "count": 1,
    "description": "Nirvana - Nevermind [LP] 2015",
    "price": 15,
    "title": "Nirvana 1991", 
    "imageId": "000006"
  },
  {
    "count": 1,
    "description": "Joe Cocker - The Life Of A Man. The Ultimate Hits 1968 - 2013 [2LP] 2016",
    "price": 23,
    "title": "Joe Cocker", 
    "imageId": "000007"
  },
  {
    "count": 1,
    "description": "Andrea Bocelli - Andrea [2LP] 2015",
    "price": 15,
    "title": "Andrea Bocelli", 
    "imageId": "000008"
  }
];

const Client = new AWS.DynamoDB.DocumentClient();

export const handler = async event => {
  try {  

    for await (let _product of products) {
      const {count, ...rest} = _product;

      const product = {
        ...rest,
        id: Date.now().toString(),
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
    };    

    return {
      statusCode: 201,
      body: JSON.stringify("Data entered"),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" })
    }; 
  }  
} 
