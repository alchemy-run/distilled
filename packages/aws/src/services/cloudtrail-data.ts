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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CloudTrail Data",
  serviceShapeName: "CloudTrailDataService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cloudtrail-data" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-08-11");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
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
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://cloudtrail-data-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cloudtrail-data-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudtrail-data.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://cloudtrail-data.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cloudtrail-data.{R}.{D}","properties":{},"headers":{}}');

export class ChannelInsufficientPermission
  extends /*@__PURE__*/ S.TaggedError<ChannelInsufficientPermission>()(
    "ChannelInsufficientPermission",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ChannelNotFound
  extends /*@__PURE__*/ S.TaggedError<ChannelNotFound>()("ChannelNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ChannelUnsupportedSchema
  extends /*@__PURE__*/ S.TaggedError<ChannelUnsupportedSchema>()("ChannelUnsupportedSchema", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class DuplicatedAuditEventId
  extends /*@__PURE__*/ S.TaggedError<DuplicatedAuditEventId>()("DuplicatedAuditEventId", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidChannelARN
  extends /*@__PURE__*/ S.TaggedError<InvalidChannelARN>()("InvalidChannelARN", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export type Uuid = string;
export interface AuditEvent {
  id: string;
  eventData: string;
  eventDataChecksum?: string;
}
export type AuditEvents = AuditEvent[];
export type ChannelArn = string;
export type ExternalId = string;
export interface PutAuditEventsRequest {
  auditEvents: AuditEvent[];
  channelArn: string;
  externalId?: string;
}
export interface AuditEventResultEntry {
  id: string;
  eventID: string;
}
export type AuditEventResultEntries = AuditEventResultEntry[];
export type ErrorCode = string;
export type ErrorMessage = string;
export interface ResultErrorEntry {
  id: string;
  errorCode: string;
  errorMessage: string;
}
export type ResultErrorEntries = ResultErrorEntry[];
export interface PutAuditEventsResponse {
  successful: AuditEventResultEntry[];
  failed: ResultErrorEntry[];
}
export type PutAuditEventsError =
  | ChannelInsufficientPermission
  | ChannelNotFound
  | ChannelUnsupportedSchema
  | DuplicatedAuditEventId
  | InvalidChannelARN
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Ingests your application events into CloudTrail Lake. A required parameter,
 * `auditEvents`, accepts the JSON records (also called
 * *payload*) of events that you want CloudTrail to ingest. You
 * can add up to 100 of these events (or up to 1 MB) per `PutAuditEvents`
 * request.
 */
export const putAuditEvents: API.OperationMethod<
  PutAuditEventsRequest,
  PutAuditEventsResponse,
  PutAuditEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c0, 2) as any as S.Schema<PutAuditEventsRequest>,
  output: __S(7, __c0, 7) as any as S.Schema<PutAuditEventsResponse>,
  errors: [
    ChannelInsufficientPermission,
    ChannelNotFound,
    ChannelUnsupportedSchema,
    DuplicatedAuditEventId,
    InvalidChannelARN,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAuditEvents",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String, eventData: S.String, eventDataChecksum: S.optional(S.String) }),
      ).annotate({ identifier: "AuditEvent" });
    case 1:
      return S.Array(__S(0, __c0, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          auditEvents: __S(1, __c0, 1),
          channelArn: S.String.pipe(T.HttpQuery("channelArn")),
          externalId: S.optional(S.String).pipe(T.HttpQuery("externalId")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/PutAuditEvents" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutAuditEventsRequest" });
    case 3:
      return S.suspend(() => S.Struct({ id: S.String, eventID: S.String })).annotate({
        identifier: "AuditEventResultEntry",
      });
    case 4:
      return S.Array(__S(3, __c0, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ id: S.String, errorCode: S.String, errorMessage: S.String }),
      ).annotate({ identifier: "ResultErrorEntry" });
    case 6:
      return S.Array(__S(5, __c0, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ successful: __S(4, __c0, 4), failed: __S(6, __c0, 6) }),
      ).annotate({ identifier: "PutAuditEventsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
