import { catalogBatchProcess } from "../functions/catalogBatchProcess";
import { SQSEvent } from "aws-lambda";

describe('CatalogBatchProcess test', () => {
  it('SQS test', async () => {
    const response = await catalogBatchProcess({
      Records: [
        {
          body: JSON.stringify({
            title: 'title',
            description: 'description',
            price: 100,
            count: 5,
            imageId: "123",
          }),
        },
      ],
    } as SQSEvent);

    expect(response?.statusCode).toBe(201);
  });
});
