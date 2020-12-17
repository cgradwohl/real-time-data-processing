import { KinesisStreamHandler } from 'aws-lambda';
import 'source-map-support/register';

export const ingestStream: KinesisStreamHandler = async (event, _context) => {
  event.Records.forEach(record => {
    console.log(':::STREAM:::');
    console.log(record.kinesis.data);
  });
}