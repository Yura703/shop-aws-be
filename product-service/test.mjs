import { v4 as uuidv4 } from 'uuid';

const aaa = uuidv4();
console.log(uuidv4());

export const handler = async event => { 
  
  return {
    statusCode: 200,
    body: JSON.stringify(aaa)
  };  
} 
