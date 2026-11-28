import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Agent Discovery",
  serviceShapeName: "BelfryGlobalDP",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "agent-discovery" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-07-26");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { Region, UseFIPS = false, UseDualStack = false, Endpoint } = p;
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
    {
      const PartitionResult = _.partition(Region);
      if (Region != null && PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          return err("FIPS is enabled but Agent Discovery does not have a FIPS endpoint");
        }
        if (Region === "us-east-1") {
          return e(
            "https://agent-discovery.us-east-1.api.aws",
            {
              authSchemes: [
                { name: "sigv4", signingName: "agent-discovery", signingRegion: "us-east-1" },
              ],
            },
            {},
          );
        }
        if (Region === "eu-west-1") {
          return e(
            "https://agent-discovery.eu-west-1.api.aws",
            {
              authSchemes: [
                { name: "sigv4", signingName: "agent-discovery", signingRegion: "eu-west-1" },
              ],
            },
            {},
          );
        }
        if (Region === "ap-northeast-1") {
          return e(
            "https://agent-discovery.ap-northeast-1.api.aws",
            {
              authSchemes: [
                { name: "sigv4", signingName: "agent-discovery", signingRegion: "ap-northeast-1" },
              ],
            },
            {},
          );
        }
        if (UseDualStack === true) {
          return e(
            `https://agent-discovery.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(`https://agent-discovery.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://agent-discovery.{R}.{D}","properties":{},"headers":{}}',
  ["ap-northeast-1", "eu-west-1", "us-east-1"],
);

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "AgentDiscovery",
  service: "AgentDiscovery",
  propagate: TxXray.propagate,
} as const;

export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorCode: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ArdErrorCode" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorCode: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ArdErrorCode" }),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorCode: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ArdErrorCode" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SearchQuery = string;
export type SearchFilterExpression = unknown;
export type MaxResults = number;
export type NextToken = string;
export interface SearchPublicRecordsRequest {
  searchQuery?: string | undefined;
  filters?: any | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type DomainName = string;
export type IdentifierUri = string;
export type Identifier = { domain: string; uri?: undefined } | { domain?: undefined; uri: string };
export type DisplayName = string;
export type Description = string;
export type RecordType =
  | "AGENT"
  | "TOOL"
  | "SKILL"
  | "CUSTOM"
  | "GATEWAY"
  | "WEB_BOT"
  | (string & {});
export type DescriptorSlotKey = string;
export type DescriptorData = string;
export type DescriptorTypeVersion = string;
export type Url = string;
export interface DescriptorSourceUrl {
  url: string;
}
export interface DescriptorSource {
  fromUrl?: DescriptorSourceUrl | undefined;
}
export interface DescriptorEntry {
  data?: string | undefined;
  version?: string | undefined;
  source?: DescriptorSource | undefined;
  additionalData?: { [key: string]: DescriptorEntry | undefined } | undefined;
}
export type DescriptorMap = { [key: string]: DescriptorEntry | undefined };
export type TrustUri = string;
export type ProvenanceRelation =
  | "publishedFrom"
  | "discoveredFrom"
  | "federatedFrom"
  | (string & {});
export interface ProvenanceLink {
  relation: ProvenanceRelation;
  sourceId: string;
}
export type ProvenanceLinkList = ProvenanceLink[];
export interface TrustManifest {
  contributor: string;
  provenance?: ProvenanceLink[] | undefined;
}
export type TrustManifestList = TrustManifest[];
export type RecordVersion = string;
export interface PublicRecord {
  identifier: Identifier;
  displayName: string;
  description?: string | undefined;
  recordType: RecordType;
  domain?: string | undefined;
  descriptors?: { [key: string]: DescriptorEntry | undefined } | undefined;
  trustManifests?: TrustManifest[] | undefined;
  recordVersion?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type PublicRecordList = PublicRecord[];
export interface SearchPublicRecordsResponse {
  records: PublicRecord[];
  nextToken?: string | undefined;
}
export type ErrorMessage = string;
export type ArdErrorCode =
  | "INVALID_ARGUMENT"
  | "UNAUTHENTICATED"
  | "NOT_FOUND"
  | "RATE_LIMIT_EXCEEDED"
  | "INTERNAL_ERROR"
  | (string & {});
export type SearchPublicRecordsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Search public agent records across the authoritative + crawler indexes. Hybrid keyword +
 * neural ranking, merged and fused (weighted RRF), with filters, org governance policy, and
 * descriptor-visibility enforcement applied server-side. Public, authenticated (D-1).
 */
export const searchPublicRecords: API.PaginatedOperationMethod<
  SearchPublicRecordsRequest & RegionInput,
  SearchPublicRecordsResponse,
  SearchPublicRecordsError,
  Credentials | HttpClient.HttpClient,
  PublicRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<SearchPublicRecordsRequest>,
  output: __S(12, __c0, 12) as any as S.Schema<SearchPublicRecordsResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchPublicRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "records",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchPublicRecords",
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          searchQuery: S.optional(S.String),
          filters: S.optional(S.Any),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ searchQuery: "query" }))
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/records/search" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "SearchPublicRecordsRequest" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ domain: S.String }),
        /*@__PURE__*/ S.Struct({ uri: S.String }),
      ]);
    case 2:
      return S.suspend(() => S.Struct({ url: S.String })).annotate({
        identifier: "DescriptorSourceUrl",
      });
    case 3:
      return S.suspend(() => S.Struct({ fromUrl: S.optional(__S(2, __c0, 2)) })).annotate({
        identifier: "DescriptorSource",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(S.String),
          version: S.optional(S.String),
          source: S.optional(__S(3, __c0, 3)),
          additionalData: S.optional(
            S.suspend(() => __S(5, __c0, 5)).annotate({ identifier: "DescriptorMap" }),
          ),
        }),
      ).annotate({ identifier: "DescriptorEntry" });
    case 5:
      return S.Record(
        S.String,
        /*@__PURE__*/ S.suspend((): S.Schema<DescriptorEntry> => __S(4, __c0, 4))
          .annotate({ identifier: "DescriptorEntry" })
          .pipe(S.optional),
      );
    case 6:
      return S.suspend(() => S.Struct({ relation: S.String, sourceId: S.String })).annotate({
        identifier: "ProvenanceLink",
      });
    case 7:
      return S.Array(__S(6, __c0, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ contributor: S.String, provenance: S.optional(__S(7, __c0, 7)) }),
      ).annotate({ identifier: "TrustManifest" });
    case 9:
      return S.Array(__S(8, __c0, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          identifier: __S(1, __c0, 1),
          displayName: S.String,
          description: S.optional(S.String),
          recordType: S.String,
          domain: S.optional(S.String),
          descriptors: S.optional(__S(5, __c0, 5)),
          trustManifests: S.optional(__S(9, __c0, 9)),
          recordVersion: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PublicRecord" });
    case 11:
      return S.Array(__S(10, __c0, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({ records: __S(11, __c0, 11), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchPublicRecordsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
