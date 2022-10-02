'use strict';

import { handler } from '../functions/getProductsList/getProductsList.js';

describe('getProductsList', () => {

   it('get All Products test', async () => {
    const response = await handler();
    const { headers, statusCode, body } = response;

    expect(response).toBeDefined();
		expect(body || headers).toBeTruthy();
		expect(headers['Content-Type'] === 'application/json').toBeTruthy();
		expect(statusCode).toBe(200);
  });
});
