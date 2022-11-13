(()=>{"use strict";var e={807:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.catalogBatchProcess=void 0;const s=r(o(336)),n=o(828),a=new s.default.DynamoDB.DocumentClient;t.catalogBatchProcess=async e=>{const t=new s.default.SNS({region:"eu-west-1"}),o=await e.Records.map((({body:e})=>JSON.parse(e)));for await(let e of o)try{const{count:o,...r}=e,s={...r,id:(0,n.v4)()},i={count:o,product_id:s.id};await a.put({TableName:"Products",Item:s}),await a.put({TableName:"Stocks",Item:i}),t.publish({Subject:"Added new record",Message:JSON.stringify(e),TopicArn:process.env.SNS_ARN,MessageAttributes:{countCategory:{DataType:"String",StringValue:e.count>=5?"High":"Low"}}})}catch(e){return{statusCode:500,body:JSON.stringify({error:"Something went wrong"})}}return{statusCode:201,headers:{"Access-Control-Allow-Methods":"OPTIONS,POST,GET","Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":!0,"Content-Type":"application/JSON","Access-Control-Allow-Headers":"Content-Type"},body:JSON.stringify(o),isBase64Encoded:!1}}},336:e=>{e.exports=require("aws-sdk")},828:e=>{e.exports=require("uuid")}},t={};!function o(r){var s=t[r];if(void 0!==s)return s.exports;var n=t[r]={exports:{}};return e[r].call(n.exports,n,n.exports,o),n.exports}(807)})();