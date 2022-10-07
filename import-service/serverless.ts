import type { AWS } from '@serverless/typescript';

//import hello from '@functions/hello';
import {
  importProductsFile, 
  importFileParser
} from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',

  plugins: [
    'serverless-esbuild',
    'serverless-webpack',
    'serverless-offline',
    'serverless-dotenv-plugin',
  ],

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    stage: 'dev',
    httpApi: {
      cors: true,
    },

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: [
          `arn:aws:s3:::yura703-task5`,
        ],
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: [
          `arn:aws:s3:::yura703-task5/*`,
        ],
      },
    ],
  },

  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },

  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
    },

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],//[]
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
