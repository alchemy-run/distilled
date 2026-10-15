import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://dynamodb.amazonaws.com/doc/2012-08-10/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "DynamoDB Streams",
  serviceShapeName: "DynamoDBStreams_20120810",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "dynamodb" });
const ver = /*@__PURE__*/ T.ServiceVersion("2012-08-10");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
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
          return e(`https://streams.dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://streams.dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://streams.dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://streams.dynamodb.{R}.{D}","properties":{},"headers":{}}');

export class ExpiredIteratorException
  extends /*@__PURE__*/ S.TaggedError<ExpiredIteratorException>()("ExpiredIteratorException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()("InternalServerError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TrimmedDataAccessException
  extends /*@__PURE__*/ S.TaggedError<TrimmedDataAccessException>()("TrimmedDataAccessException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
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
export type StreamStatus = "ENABLING" | "ENABLED" | "DISABLING" | "DISABLED" | (string & {});
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
export type DescribeStreamError = InternalServerError | ResourceNotFoundException | CommonErrors;
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
  input: __S(1, __c0, 1) as any as S.Schema<DescribeStreamInput>,
  output: __S(8, __c0, 8) as any as S.Schema<DescribeStreamOutput>,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStream",
}));

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
  input: __S(16, __c1, 0) as any as S.Schema<GetRecordsInput>,
  output: __S(27, __c1, 11) as any as S.Schema<GetRecordsOutput>,
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
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<GetShardIteratorInput>,
  output: __S(33, __c2, 1) as any as S.Schema<GetShardIteratorOutput>,
  errors: [InternalServerError, ResourceNotFoundException, TrimmedDataAccessException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetShardIterator",
}));

export type ListStreamsError = InternalServerError | ResourceNotFoundException | CommonErrors;
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
  input: __S(48, __c3, 0) as any as S.Schema<ListStreamsInput>,
  output: __S(51, __c3, 3) as any as S.Schema<ListStreamsOutput>,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), ShardId: S.optional(S.String) }),
      ).annotate({ identifier: "ShardFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamArn: S.String,
          Limit: S.optional(S.Number),
          ExclusiveStartShardId: S.optional(S.String),
          ShardFilter: S.optional(__S(0, __c0, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeStreamInput" });
    case 2:
      return S.suspend(() => S.Struct({ AttributeName: S.String, KeyType: S.String })).annotate({
        identifier: "KeySchemaElement",
      });
    case 3:
      return S.Array(__S(2, __c0, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          StartingSequenceNumber: S.optional(S.String),
          EndingSequenceNumber: S.optional(S.String),
        }),
      ).annotate({ identifier: "SequenceNumberRange" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ShardId: S.optional(S.String),
          SequenceNumberRange: S.optional(__S(4, __c0, 4)),
          ParentShardId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Shard" });
    case 6:
      return S.Array(__S(5, __c0, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          StreamArn: S.optional(S.String),
          StreamLabel: S.optional(S.String),
          StreamStatus: S.optional(S.String),
          StreamViewType: S.optional(S.String),
          CreationRequestDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TableName: S.optional(S.String),
          KeySchema: S.optional(__S(3, __c0, 3)),
          Shards: S.optional(__S(6, __c0, 6)),
          LastEvaluatedShardId: S.optional(S.String),
        }),
      ).annotate({ identifier: "StreamDescription" });
    case 8:
      return S.suspend(() =>
        S.Struct({ StreamDescription: S.optional(__S(7, __c0, 7)) }).pipe(ns),
      ).annotate({ identifier: "DescribeStreamOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ShardIterator: S.String, Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRecordsInput" });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.Array(T.Blob);
    case 3:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend(() => __S(21, __c1, 5))
          .annotate({ identifier: "AttributeValue" })
          .pipe(S.optional),
      );
    case 4:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(21, __c1, 5)).annotate({ identifier: "AttributeValue" }),
      );
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ S: S.String }),
        /*@__PURE__*/ S.Struct({ N: S.String }),
        /*@__PURE__*/ S.Struct({ B: T.Blob }),
        /*@__PURE__*/ S.Struct({ SS: __S(17, __c1, 1) }),
        /*@__PURE__*/ S.Struct({ NS: __S(17, __c1, 1) }),
        /*@__PURE__*/ S.Struct({ BS: __S(18, __c1, 2) }),
        /*@__PURE__*/ S.Struct({
          M: /*@__PURE__*/ S.suspend(() => __S(19, __c1, 3)).annotate({
            identifier: "MapAttributeValue",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          L: /*@__PURE__*/ S.suspend(() => __S(20, __c1, 4)).annotate({
            identifier: "ListAttributeValue",
          }),
        }),
        /*@__PURE__*/ S.Struct({ NULL: S.Boolean }),
        /*@__PURE__*/ S.Struct({ BOOL: S.Boolean }),
      ]);
    case 6:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend(() => __S(21, __c1, 5))
          .annotate({ identifier: "AttributeValue" })
          .pipe(S.optional),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({
          ApproximateCreationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Keys: S.optional(__S(22, __c1, 6)),
          NewImage: S.optional(__S(22, __c1, 6)),
          OldImage: S.optional(__S(22, __c1, 6)),
          SequenceNumber: S.optional(S.String),
          SizeBytes: S.optional(S.Number),
          StreamViewType: S.optional(S.String),
        }),
      ).annotate({ identifier: "StreamRecord" });
    case 8:
      return S.suspend(() =>
        S.Struct({ PrincipalId: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "Identity" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          eventID: S.optional(S.String),
          eventName: S.optional(S.String),
          eventVersion: S.optional(S.String),
          eventSource: S.optional(S.String),
          awsRegion: S.optional(S.String),
          dynamodb: S.optional(__S(23, __c1, 7)),
          userIdentity: S.optional(__S(24, __c1, 8)),
        }),
      ).annotate({ identifier: "Record" });
    case 10:
      return S.Array(__S(25, __c1, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          Records: S.optional(__S(26, __c1, 10)),
          NextShardIterator: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetRecordsOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamArn: S.String,
          ShardId: S.String,
          ShardIteratorType: S.String,
          SequenceNumber: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetShardIteratorInput" });
    case 1:
      return S.suspend(() => S.Struct({ ShardIterator: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GetShardIteratorOutput",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TableName: S.optional(S.String),
          Limit: S.optional(S.Number),
          ExclusiveStartStreamArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListStreamsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamArn: S.optional(S.String),
          TableName: S.optional(S.String),
          StreamLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "Stream" });
    case 2:
      return S.Array(__S(49, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Streams: S.optional(__S(50, __c3, 2)),
          LastEvaluatedStreamArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListStreamsOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
