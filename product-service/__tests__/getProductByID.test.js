'use strict';

import { handler } from '../functions/getProductsByID/getProductsByID.js';

describe('getProductsByID', () => {

  it('get Product By ID test', async () => {
    const event = {
      pathParameters: {: "7567ec4b-b10c-48c5-9345-fc73c48a80aa"},
    }
    const response = await handler(event);

    const body = JSON.parse(response.body);    
    const {count, description, price, title, imageId} = body;
    const { statusCode, headers } = response;

    expect(response).toBeDefined();
    expect(count).toBe(5);
    expect(description).toBe("The Beatles - Let It Be [LP] 2020");
    expect(price).toBe(10);
    expect(imageId).toBe("000001");
    expect(title).toBe("The Beatles 1970");
    expect(statusCode).toBe(200);
  });
});
