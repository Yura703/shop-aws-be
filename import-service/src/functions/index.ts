import { handlerPath } from '@libs/handler-resolver';
const BUCKET = "yura703-task5";

export const importProductsFile = {
  handler: `${handlerPath(__dirname)}/importProductsFile/importProductsFile.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/import',
      },
    },
  ],
};

export const importFileParser = {
  handler: `${handlerPath(__dirname)}/importFileParser/importFileParser.main`,
  events: [
    {
      s3: {
        bucket: BUCKET,
        event: 's3:ObjectCreated:*',
        existing: true,
        rules: [
          {
            prefix: 'uploaded/',
          },
        ],
      },
    },
  ],
};
