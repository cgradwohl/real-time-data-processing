// import { KinesisStreamHandler } from 'aws-lambda';
import 'source-map-support/register';

export interface Context {
  callbackWaitsForEmptyEventLoop: boolean;
  functionName: string;
  functionVersion: string;
  invokedFunctionArn: string;
  memoryLimitInMB: string;
  awsRequestId: string;
  logGroupName: string;
  logStreamName: string;
  identity?: CognitoIdentity;
  clientContext?: ClientContext;

  getRemainingTimeInMillis(): number;

  // Functions for compatibility with earlier Node.js Runtime v0.10.42
  // No longer documented, so they are deprecated, but they still work
  // as of the 12.x runtime, so they are not removed from the types.

  /** @deprecated Use handler callback or promise result */
  done(error?: Error, result?: any): void;
  /** @deprecated Use handler callback with first argument or reject a promise result */
  fail(error: Error | string): void;
  /** @deprecated Use handler callback with second argument or resolve a promise result */
  succeed(messageOrObject: any): void;
  // Unclear what behavior this is supposed to have, I couldn't find any still extant reference,
  // and it behaves like the above, ignoring the object parameter.
  /** @deprecated Use handler callback or promise result */
  succeed(message: string, object: any): void;
}
export type Handler<TEvent = any, TResult = any> = (
  event: TEvent,
  context: Context,
  callback: Callback<TResult>,
) => void | Promise<TResult>;
export type KinesisStreamHandler = Handler<KinesisStreamEvent, void>;
export interface KinesisStreamEvent {
  Records: KinesisStreamRecord[];
}
export interface KinesisStreamRecordPayload {
  approximateArrivalTimestamp: number;
  data: string;
  kinesisSchemaVersion: string;
  partitionKey: string;
  sequenceNumber: string;
}
export interface KinesisStreamRecord {
  awsRegion: string;
  eventID: string;
  eventName: string;
  eventSource: string;
  eventSourceARN: string;
  eventVersion: string;
  invokeIdentityArn: string;
  kinesis: KinesisStreamRecordPayload;
}

export const ingestStream: KinesisStreamHandler = async (event, _context) => {
  event.Records.forEach(record => {
    console.log(':::STREAM:::');
    console.log(record.kinesis.data);
  });
}