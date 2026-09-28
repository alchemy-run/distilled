import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "DynamoDB Streams",
  target: "DynamoDBStreams_20120810",
  version: "2012-08-10",
  sigv4: "dynamodb",
  protocol: awsJson1_0Protocol,
  xmlns: "http://dynamodb.amazonaws.com/doc/2012-08-10/",
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://streams-dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://streams-dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://streams-dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://streams-dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://streams-dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://streams-dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://streams.dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://streams.dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://streams.dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://streams.dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://streams.dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ExpiredIteratorException
  extends /*@__PURE__*/ TE.TaggedError("ExpiredIteratorException")<{
    readonly message?: string;
  }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class TrimmedDataAccessException
  extends /*@__PURE__*/ TE.TaggedError("TrimmedDataAccessException")<{
    readonly message?: string;
  }> {}
export type StreamArn = string;
export type PositiveIntegerObject = number;
export type ShardId = string;
export type ShardFilterType = "CHILD_SHARDS" | (string & {});
export interface ShardFilter {
  Type?: ShardFilterType;
  ShardId?: string;
}
export interface DescribeStreamInput {
  StreamArn: string;
  Limit?: number;
  ExclusiveStartShardId?: string;
  ShardFilter?: ShardFilter;
}
export type StreamStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | (string & {});
export type StreamViewType =
  | "NEW_IMAGE"
  | "OLD_IMAGE"
  | "NEW_AND_OLD_IMAGES"
  | "KEYS_ONLY"
  | (string & {});
export type TableName = string;
export type KeySchemaAttributeName = string;
export type KeyType = "HASH" | "RANGE" | (string & {});
export interface KeySchemaElement {
  AttributeName: string;
  KeyType: KeyType;
}
export type KeySchema = KeySchemaElement[];
export type SequenceNumber = string;
export interface SequenceNumberRange {
  StartingSequenceNumber?: string;
  EndingSequenceNumber?: string;
}
export interface Shard {
  ShardId?: string;
  SequenceNumberRange?: SequenceNumberRange;
  ParentShardId?: string;
}
export type ShardDescriptionList = Shard[];
export interface StreamDescription {
  StreamArn?: string;
  StreamLabel?: string;
  StreamStatus?: StreamStatus;
  StreamViewType?: StreamViewType;
  CreationRequestDateTime?: Date;
  TableName?: string;
  KeySchema?: KeySchemaElement[];
  Shards?: Shard[];
  LastEvaluatedShardId?: string;
}
export interface DescribeStreamOutput {
  StreamDescription?: StreamDescription;
}
export type ShardIterator = string;
export interface GetRecordsInput {
  ShardIterator: string;
  Limit?: number;
}
export type OperationType = "INSERT" | "MODIFY" | "REMOVE" | (string & {});
export type AttributeName = string;
export type StringAttributeValue = string;
export type NumberAttributeValue = string;
export type BinaryAttributeValue = Uint8Array;
export type StringSetAttributeValue = string[];
export type NumberSetAttributeValue = string[];
export type BinarySetAttributeValue = Uint8Array[];
export type MapAttributeValue = { [key: string]: AttributeValue | undefined };
export type ListAttributeValue = AttributeValue[];
export type NullAttributeValue = boolean;
export type BooleanAttributeValue = boolean;
export type AttributeValue =
  | {
      S: string;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N: string;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B: Uint8Array;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS: string[];
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS: string[];
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS: Uint8Array[];
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M: { [key: string]: AttributeValue | undefined };
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L: AttributeValue[];
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL: boolean;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL: boolean;
    };
export type AttributeMap = { [key: string]: AttributeValue | undefined };
export type PositiveLongObject = number;
export interface StreamRecord {
  ApproximateCreationDateTime?: Date;
  Keys?: { [key: string]: AttributeValue | undefined };
  NewImage?: { [key: string]: AttributeValue | undefined };
  OldImage?: { [key: string]: AttributeValue | undefined };
  SequenceNumber?: string;
  SizeBytes?: number;
  StreamViewType?: StreamViewType;
}
export interface Identity {
  PrincipalId?: string;
  Type?: string;
}
export interface Record {
  eventID?: string;
  eventName?: OperationType;
  eventVersion?: string;
  eventSource?: string;
  awsRegion?: string;
  dynamodb?: StreamRecord;
  userIdentity?: Identity;
}
export type RecordList = Record[];
export interface GetRecordsOutput {
  Records?: Record[];
  NextShardIterator?: string;
}
export type ShardIteratorType =
  | "TRIM_HORIZON"
  | "LATEST"
  | "AT_SEQUENCE_NUMBER"
  | "AFTER_SEQUENCE_NUMBER"
  | (string & {});
export interface GetShardIteratorInput {
  StreamArn: string;
  ShardId: string;
  ShardIteratorType: ShardIteratorType;
  SequenceNumber?: string;
}
export interface GetShardIteratorOutput {
  ShardIterator?: string;
}
export interface ListStreamsInput {
  TableName?: string;
  Limit?: number;
  ExclusiveStartStreamArn?: string;
}
export interface Stream {
  StreamArn?: string;
  TableName?: string;
  StreamLabel?: string;
}
export type StreamList = Stream[];
export interface ListStreamsOutput {
  Streams?: Stream[];
  LastEvaluatedStreamArn?: string;
}
export type ErrorMessage = string;
export type DescribeStreamError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about a stream, including the current status of the stream, its Amazon Resource Name (ARN), the composition of its shards, and its corresponding DynamoDB table.
 *
 * You can call `DescribeStream` at a maximum rate of 10 times per second.
 *
 * Each shard in the stream has a `SequenceNumberRange` associated with it. If the
 * `SequenceNumberRange` has a `StartingSequenceNumber` but no
 * `EndingSequenceNumber`, then the shard is still open (able to receive more stream
 * records). If both `StartingSequenceNumber` and `EndingSequenceNumber`
 * are present, then that shard is closed and can no longer receive more data.
 */
export const describeStream: API.OperationMethod<
  DescribeStreamInput,
  DescribeStreamOutput,
  DescribeStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamArn: 0,
      Limit: 0,
      ExclusiveStartShardId: 0,
      ShardFilter: { Type: 0, ShardId: 0 },
    },
    output: { StreamDescription: { CreationRequestDateTime: D.ts } },
  },
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStream",
})) as any;

export type GetRecordsError =
  | ExpiredIteratorException
  | InternalServerError
  | LimitExceededException
  | ResourceNotFoundException
  | TrimmedDataAccessException
  | CommonErrors;
/**
 * Retrieves the stream records from a given shard.
 *
 * Specify a shard iterator using the `ShardIterator` parameter. The shard iterator
 * specifies the position in the shard from which you want to start reading stream records
 * sequentially. If there are no stream records available in the portion of the shard that the
 * iterator points to, `GetRecords` returns an empty list. Note that it might take
 * multiple calls to get to a portion of the shard that contains stream records.
 *
 * `GetRecords` can retrieve a maximum of 1 MB of data or 1000 stream records,
 * whichever comes first.
 */
export const getRecords: API.OperationMethod<
  GetRecordsInput,
  GetRecordsOutput,
  GetRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ShardIterator: 0, Limit: 0 },
    output: {
      Records: D.list({
        dynamodb: {
          ApproximateCreationDateTime: D.ts,
          Keys: D.map(o_AttributeValue),
          NewImage: D.map(o_AttributeValue),
          OldImage: D.map(o_AttributeValue),
        },
      }),
    },
  },
  errors: [
    ExpiredIteratorException,
    InternalServerError,
    LimitExceededException,
    ResourceNotFoundException,
    TrimmedDataAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecords",
})) as any;

export type GetShardIteratorError =
  | InternalServerError
  | ResourceNotFoundException
  | TrimmedDataAccessException
  | CommonErrors;
/**
 * Returns a shard iterator. A shard iterator provides information
 * about how to retrieve the stream records from within a shard. Use
 * the shard iterator in a subsequent
 * `GetRecords` request to read the stream records
 * from the shard.
 *
 * A shard iterator expires 15 minutes after it is returned to the requester.
 */
export const getShardIterator: API.OperationMethod<
  GetShardIteratorInput,
  GetShardIteratorOutput,
  GetShardIteratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamArn: 0,
      ShardId: 0,
      ShardIteratorType: 0,
      SequenceNumber: 0,
    },
  },
  errors: [
    InternalServerError,
    ResourceNotFoundException,
    TrimmedDataAccessException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetShardIterator",
})) as any;

export type ListStreamsError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an array of stream ARNs associated with the current account and endpoint. If the
 * `TableName` parameter is present, then `ListStreams` will return only the
 * streams ARNs for that table.
 *
 * You can call `ListStreams` at a maximum rate of 5 times per second.
 */
export const listStreams: API.OperationMethod<
  ListStreamsInput,
  ListStreamsOutput,
  ListStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TableName: 0, Limit: 0, ExclusiveStartStreamArn: 0 },
  },
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
})) as any;

const o_AttributeValue: D.LazyStruct = () => ({
  B: D.blob,
  BS: D.list(D.blob),
  M: D.map(o_AttributeValue),
  L: D.list(o_AttributeValue),
});
