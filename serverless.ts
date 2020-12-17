import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'real-time-data-processing',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    ingestion: {
      handler: 'handler.ingestStream',
      events: [
        {
          stream: {
            type: 'kinesis',
            arn: { 'Fn::GetAtt': ['SuperSweetStream', 'Arn'] },
          },
        }
      ]
    }
  },  
  resources: {
    Resources: {
      'SuperSweetStream': {
        'Type' : 'AWS::Kinesis::Stream',
        'Properties' : {
            'Name' : '${self:service}-stream',
            'RetentionPeriodHours' : 24,
            'ShardCount' : 3,
          }
      }
    }
  }


}

module.exports = serverlessConfiguration;
