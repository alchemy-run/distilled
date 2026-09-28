import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CloudTrail Data",
  target: "CloudTrailDataService",
  version: "2021-08-11",
  sigv4: "cloudtrail-data",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cloudtrail-data.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cloudtrail-data.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ChannelInsufficientPermission
  extends /*@__PURE__*/ TE.TaggedError("ChannelInsufficientPermission")<{
    readonly message?: string;
  }> {}
export class ChannelNotFound
  extends /*@__PURE__*/ TE.TaggedError("ChannelNotFound")<{
    readonly message?: string;
  }> {}
export class ChannelUnsupportedSchema
  extends /*@__PURE__*/ TE.TaggedError("ChannelUnsupportedSchema")<{
    readonly message?: string;
  }> {}
export class DuplicatedAuditEventId
  extends /*@__PURE__*/ TE.TaggedError("DuplicatedAuditEventId")<{
    readonly message?: string;
  }> {}
export class InvalidChannelARN
  extends /*@__PURE__*/ TE.TaggedError("InvalidChannelARN")<{
    readonly message?: string;
  }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedOperationException")<{
    readonly message?: string;
  }> {}
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
  descriptor: {
    service: svc,
    http: "POST /PutAuditEvents",
    input: {
      auditEvents: D.list({ id: 0, eventData: 0, eventDataChecksum: 0 }),
      channelArn: D.m({ query: "channelArn" }),
      externalId: D.m({ query: "externalId" }),
    },
    body: true,
  },
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
})) as any;
