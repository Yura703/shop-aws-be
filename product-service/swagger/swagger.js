// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "Music-Shop API",
    "version": "1"
  },
  "paths": {
    "/products/{productId}": {
      "get": {
        "summary": "getProductsByID",
        "description": "",
        "operationId": "getProductsByID.get.products/{productId}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Access-Control-Allow-Origin": []
          }
        ]
      }
    },
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Access-Control-Allow-Origin": []
          }
        ]
      }
    }
  },
  "definitions": {},
  "securityDefinitions": {
    "Access-Control-Allow-Origin": {
      "type": "apiKey",
      "name": "Access-Control-Allow-Origin",
      "in": "header"
    }
  },
  "basePath": "/dev",
  "host": "vrsbboexy5.execute-api.eu-west-1.amazonaws.com"
};