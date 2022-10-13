import Mock from 'aws-sdk-mock';
import { importProductsFile } from '../functions/importProductsFile';

describe('importProductsFile', () => {
  it('Upload file', async () => {
    const name = 'test.csv';
    Mock.mock('S3', 'getSignedUrl', (_a, _p, callback) => {
      callback(null, "https://test.com")
    });

    const response = await importProductsFile({ queryStringParameters: { name } } );

    Mock.restore('S3', 'getSignedUrl');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify("https://test.com"));
  });  
});
