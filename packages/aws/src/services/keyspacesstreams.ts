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
  sdkId: "KeyspacesStreams",
  target: "KeyspacesStreams",
  version: "2024-09-09",
  sigv4: "cassandra",
  protocol: awsJson1_0Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://cassandra-streams-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://cassandra-streams.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly errorCode?: ValidationExceptionType;
  }> {}
export type ShardIterator = string;
export interface GetRecordsInput {
  shardIterator: string;
  maxResults?: number;
}
export type OriginType = "USER" | "REPLICATION" | "TTL" | (string & {});
export interface KeyspacesMetadata {
  expirationTime?: string;
  writeTime?: string;
}
export interface KeyspacesCell {
  value?: KeyspacesCellValue;
  metadata?: KeyspacesMetadata;
}
export type KeyspacesCellList = KeyspacesCell[];
export interface KeyspacesCellMapDefinition {
  key?: KeyspacesCellValue;
  value?: KeyspacesCellValue;
  metadata?: KeyspacesMetadata;
}
export type KeyspacesCellMap = KeyspacesCellMapDefinition[];
export type KeyspacesUdtMap = { [key: string]: KeyspacesCell | undefined };
export type KeyspacesCellValue =
  | {
      asciiT: string;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT: string;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT: Uint8Array;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT: boolean;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT: string;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT: string;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT: string;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT: string;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT: string;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT: string;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT: string;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT: string;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT: KeyspacesCell[];
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT: KeyspacesCellMapDefinition[];
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT: KeyspacesCell[];
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT: string;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT: string;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT: string;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT: string;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT: string;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT: string;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT: KeyspacesCell[];
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT: string;
      varcharT?: never;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT: string;
      varintT?: never;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT: string;
      udtT?: never;
    }
  | {
      asciiT?: never;
      bigintT?: never;
      blobT?: never;
      boolT?: never;
      counterT?: never;
      dateT?: never;
      decimalT?: never;
      doubleT?: never;
      durationT?: never;
      floatT?: never;
      inetT?: never;
      intT?: never;
      listT?: never;
      mapT?: never;
      setT?: never;
      smallintT?: never;
      textT?: never;
      timeT?: never;
      timestampT?: never;
      timeuuidT?: never;
      tinyintT?: never;
      tupleT?: never;
      uuidT?: never;
      varcharT?: never;
      varintT?: never;
      udtT: { [key: string]: KeyspacesCell | undefined };
    };
export type KeyspacesKeysMap = {
  [key: string]: KeyspacesCellValue | undefined;
};
export type KeyspacesCells = { [key: string]: KeyspacesCell | undefined };
export interface KeyspacesRow {
  valueCells?: { [key: string]: KeyspacesCell | undefined };
  staticCells?: { [key: string]: KeyspacesCell | undefined };
  rowMetadata?: KeyspacesMetadata;
}
export type SequenceNumber = string;
export interface Record {
  eventVersion?: string;
  createdAt?: Date;
  origin?: OriginType;
  partitionKeys?: { [key: string]: KeyspacesCellValue | undefined };
  clusteringKeys?: { [key: string]: KeyspacesCellValue | undefined };
  newImage?: KeyspacesRow;
  oldImage?: KeyspacesRow;
  sequenceNumber?: string;
}
export type RecordList = Record[];
export type IteratorPosition = "AT_TIP" | "BEHIND_TIP" | (string & {});
export interface IteratorDescription {
  iteratorPosition?: IteratorPosition;
}
export interface GetRecordsOutput {
  changeRecords?: Record[];
  nextShardIterator?: string;
  iteratorDescription?: IteratorDescription;
}
export type StreamArn = string;
export type ShardId = string;
export type ShardIteratorType =
  | "TRIM_HORIZON"
  | "LATEST"
  | "AT_SEQUENCE_NUMBER"
  | "AFTER_SEQUENCE_NUMBER"
  | (string & {});
export interface GetShardIteratorInput {
  streamArn: string;
  shardId: string;
  shardIteratorType: ShardIteratorType;
  sequenceNumber?: string;
}
export interface GetShardIteratorOutput {
  shardIterator?: string;
}
export type ShardFilterType = "CHILD_SHARDS" | (string & {});
export interface ShardFilter {
  type?: ShardFilterType;
  shardId?: string;
}
export type ShardIdToken = string;
export interface GetStreamInput {
  streamArn: string;
  maxResults?: number;
  shardFilter?: ShardFilter;
  nextToken?: string;
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
export type KeyspaceName = string;
export type TableName = string;
export interface SequenceNumberRange {
  startingSequenceNumber?: string;
  endingSequenceNumber?: string;
}
export type ShardIdList = string[];
export interface Shard {
  shardId?: string;
  sequenceNumberRange?: SequenceNumberRange;
  parentShardIds?: string[];
}
export type ShardDescriptionList = Shard[];
export interface GetStreamOutput {
  streamArn: string;
  streamLabel: string;
  streamStatus: StreamStatus;
  streamViewType: StreamViewType;
  creationRequestDateTime: Date;
  keyspaceName: string;
  tableName: string;
  shards?: Shard[];
  nextToken?: string;
}
export type StreamArnToken = string;
export interface ListStreamsInput {
  keyspaceName?: string;
  tableName?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface Stream {
  streamArn: string;
  keyspaceName: string;
  tableName: string;
  streamLabel: string;
}
export type StreamList = Stream[];
export interface ListStreamsOutput {
  streams?: Stream[];
  nextToken?: string;
}
export type ValidationExceptionType =
  | "InvalidFormat"
  | "TrimmedDataAccess"
  | "ExpiredIterator"
  | "ExpiredNextToken"
  | (string & {});
export type GetRecordsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves data records from a specified shard in an Amazon Keyspaces data stream. This operation returns a collection of data records from the shard, including the primary key columns and information about modifications made to the captured table data. Each record represents a single data modification in the Amazon Keyspaces table and includes metadata about when the change occurred.
 */
export const getRecords: API.OperationMethod<
  GetRecordsInput,
  GetRecordsOutput,
  GetRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { shardIterator: 0, maxResults: 0 },
    output: {
      changeRecords: D.list({
        createdAt: D.ts,
        partitionKeys: D.map(o_KeyspacesCellValue),
        clusteringKeys: D.map(o_KeyspacesCellValue),
        newImage: o_KeyspacesRow,
        oldImage: o_KeyspacesRow,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecords",
})) as any;

export type GetShardIteratorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a shard iterator that serves as a bookmark for reading data from a specific position in an Amazon Keyspaces data stream's shard. The shard iterator specifies the shard position from which to start reading data records sequentially. You can specify whether to begin reading at the latest record, the oldest record, or at a particular sequence number within the shard.
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
      streamArn: 0,
      shardId: 0,
      shardIteratorType: 0,
      sequenceNumber: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetShardIterator",
})) as any;

export type GetStreamError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed information about a specific data capture stream for an Amazon Keyspaces table. The information includes the stream's Amazon Resource Name (ARN), creation time, current status, retention period, shard composition, and associated table details. This operation helps you monitor and manage the configuration of your Amazon Keyspaces data streams.
 */
export const getStream: API.PaginatedOperationMethod<
  GetStreamInput,
  GetStreamOutput,
  GetStreamError,
  Credentials | HttpClient.HttpClient,
  Shard
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      streamArn: 0,
      maxResults: 0,
      shardFilter: { type: 0, shardId: 0 },
      nextToken: 0,
    },
    output: { creationRequestDateTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStream",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "shards",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStreamsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all data capture streams associated with your Amazon Keyspaces account or for a specific keyspace or table. The response includes information such as stream ARNs, table associations, creation timestamps, and current status. This operation helps you discover and manage all active data streams in your Amazon Keyspaces environment.
 */
export const listStreams: API.PaginatedOperationMethod<
  ListStreamsInput,
  ListStreamsOutput,
  ListStreamsError,
  Credentials | HttpClient.HttpClient,
  Stream
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { keyspaceName: 0, tableName: 0, maxResults: 0, nextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "streams",
    pageSize: "maxResults",
  } as const,
})) as any;

const o_KeyspacesCellValue: D.LazyStruct = () => ({
  blobT: D.blob,
  listT: D.list(o_KeyspacesCell),
  mapT: D.list({ key: o_KeyspacesCellValue, value: o_KeyspacesCellValue }),
  setT: D.list(o_KeyspacesCell),
  tupleT: D.list(o_KeyspacesCell),
  udtT: D.map(o_KeyspacesCell),
});
const o_KeyspacesRow: D.LazyStruct = () => ({
  valueCells: D.map(o_KeyspacesCell),
  staticCells: D.map(o_KeyspacesCell),
});
const o_KeyspacesCell: D.LazyStruct = () => ({ value: o_KeyspacesCellValue });
