import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Connect Contact Lens",
  serviceShapeName: "AmazonConnectContactLens",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "connect" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-08-21");
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
              `https://contact-lens-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://contact-lens-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://contact-lens.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://contact-lens.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://contact-lens.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type InstanceId = string;
export type ContactId = string;
export type MaxResults = number;
export type NextToken = string;
export interface ListRealtimeContactAnalysisSegmentsRequest {
  InstanceId?: string;
  ContactId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type TranscriptId = string;
export type ParticipantId = string;
export type ParticipantRole = string;
export type TranscriptContent = string;
export type OffsetMillis = number;
export type SentimentValue = "POSITIVE" | "NEUTRAL" | "NEGATIVE" | (string & {});
export type CharacterOffset = number;
export interface CharacterOffsets {
  BeginOffsetChar?: number;
  EndOffsetChar?: number;
}
export interface IssueDetected {
  CharacterOffsets?: CharacterOffsets;
}
export type IssuesDetected = IssueDetected[];
export interface Transcript {
  Id?: string;
  ParticipantId?: string;
  ParticipantRole?: string;
  Content?: string;
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
  Sentiment?: SentimentValue;
  IssuesDetected?: IssueDetected[];
}
export type CategoryName = string;
export type MatchedCategories = string[];
export interface PointOfInterest {
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
}
export type PointsOfInterest = PointOfInterest[];
export interface CategoryDetails {
  PointsOfInterest?: PointOfInterest[];
}
export type MatchedDetails = { [key: string]: CategoryDetails | undefined };
export interface Categories {
  MatchedCategories?: string[];
  MatchedDetails?: { [key: string]: CategoryDetails | undefined };
}
export type PostContactSummaryContent = string;
export type PostContactSummaryStatus = "FAILED" | "COMPLETED" | (string & {});
export type PostContactSummaryFailureCode =
  | "QUOTA_EXCEEDED"
  | "INSUFFICIENT_CONVERSATION_CONTENT"
  | "FAILED_SAFETY_GUIDELINES"
  | "INVALID_ANALYSIS_CONFIGURATION"
  | "INTERNAL_ERROR"
  | (string & {});
export interface PostContactSummary {
  Content?: string;
  Status?: PostContactSummaryStatus;
  FailureCode?: PostContactSummaryFailureCode;
}
export type ExtractionDefinitionId = string;
export type ExtractionDefinitionName = string;
export type ExtractionDefinitionDisplayLabel = string;
export type ExtractedInformationContent = string;
export interface ExtractedInformationValue {
  Content?: string;
  PointsOfInterest?: PointOfInterest[];
}
export type ExtractedInformationValues = ExtractedInformationValue[];
export type ExtractedInformationFailureCode =
  | "QUOTA_EXCEEDED"
  | "INSUFFICIENT_CONVERSATION_CONTENT"
  | "FAILED_SAFETY_GUIDELINES"
  | "INTERNAL_ERROR"
  | "MAX_PACKAGE_FEATURE_ONLY"
  | (string & {});
export interface ExtractedInformation {
  ExtractionDefinitionId?: string;
  ExtractionDefinitionName?: string;
  ExtractionDefinitionDisplayLabel?: string;
  ExtractedValues?: ExtractedInformationValue[];
  FailureCode?: ExtractedInformationFailureCode;
}
export interface RealtimeContactAnalysisSegment {
  Transcript?: Transcript;
  Categories?: Categories;
  PostContactSummary?: PostContactSummary;
  ExtractedInformation?: ExtractedInformation;
}
export type RealtimeContactAnalysisSegments = RealtimeContactAnalysisSegment[];
export interface ListRealtimeContactAnalysisSegmentsResponse {
  Segments: (RealtimeContactAnalysisSegment & {
    Transcript: Transcript & {
      Id: TranscriptId;
      ParticipantId: ParticipantId;
      ParticipantRole: ParticipantRole;
      Content: TranscriptContent;
      BeginOffsetMillis: OffsetMillis;
      EndOffsetMillis: OffsetMillis;
      IssuesDetected: (IssueDetected & {
        CharacterOffsets: CharacterOffsets & {
          BeginOffsetChar: CharacterOffset;
          EndOffsetChar: CharacterOffset;
        };
      })[];
    };
    Categories: Categories & {
      MatchedCategories: MatchedCategories;
      MatchedDetails: {
        [key: string]:
          | (CategoryDetails & {
              PointsOfInterest: (PointOfInterest & {
                BeginOffsetMillis: OffsetMillis;
                EndOffsetMillis: OffsetMillis;
              })[];
            })
          | undefined;
      };
    };
    PostContactSummary: PostContactSummary & { Status: PostContactSummaryStatus };
    ExtractedInformation: ExtractedInformation & {
      ExtractionDefinitionId: ExtractionDefinitionId;
      ExtractionDefinitionName: ExtractionDefinitionName;
      ExtractedValues: (ExtractedInformationValue & {
        Content: ExtractedInformationContent;
        PointsOfInterest: (PointOfInterest & {
          BeginOffsetMillis: OffsetMillis;
          EndOffsetMillis: OffsetMillis;
        })[];
      })[];
    };
  })[];
  NextToken?: string;
}
export type Message = string;
export type ListRealtimeContactAnalysisSegmentsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides a list of analysis segments for a real-time analysis session for
 * voice.
 *
 * Voice data is retained for 24 hours. You must invoke this API during that
 * time.
 */
export const listRealtimeContactAnalysisSegments: API.PaginatedOperationMethod<
  ListRealtimeContactAnalysisSegmentsRequest,
  ListRealtimeContactAnalysisSegmentsResponse,
  ListRealtimeContactAnalysisSegmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListRealtimeContactAnalysisSegmentsRequest>,
  output: __S(17, __c0, 17) as any as S.Schema<ListRealtimeContactAnalysisSegmentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRealtimeContactAnalysisSegments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          ContactId: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/realtime-contact-analysis/analysis-segments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRealtimeContactAnalysisSegmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BeginOffsetChar: S.optional(S.Number), EndOffsetChar: S.optional(S.Number) }),
      ).annotate({ identifier: "CharacterOffsets" });
    case 2:
      return S.suspend(() => S.Struct({ CharacterOffsets: S.optional(__S(1, __c0, 1)) })).annotate({
        identifier: "IssueDetected",
      });
    case 3:
      return S.Array(__S(2, __c0, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ParticipantId: S.optional(S.String),
          ParticipantRole: S.optional(S.String),
          Content: S.optional(S.String),
          BeginOffsetMillis: S.optional(S.Number),
          EndOffsetMillis: S.optional(S.Number),
          Sentiment: S.optional(S.String),
          IssuesDetected: S.optional(__S(3, __c0, 3)),
        }),
      ).annotate({ identifier: "Transcript" });
    case 5:
      return S.Array(S.String);
    case 6:
      return S.suspend(() =>
        S.Struct({
          BeginOffsetMillis: S.optional(S.Number),
          EndOffsetMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PointOfInterest" });
    case 7:
      return S.Array(__S(6, __c0, 6));
    case 8:
      return S.suspend(() => S.Struct({ PointsOfInterest: S.optional(__S(7, __c0, 7)) })).annotate({
        identifier: "CategoryDetails",
      });
    case 9:
      return S.Record(S.String, /*@__PURE__*/ __S(8, __c0, 8).pipe(S.optional));
    case 10:
      return S.suspend(() =>
        S.Struct({
          MatchedCategories: S.optional(__S(5, __c0, 5)),
          MatchedDetails: S.optional(__S(9, __c0, 9)),
        }),
      ).annotate({ identifier: "Categories" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Content: S.optional(S.String),
          Status: S.optional(S.String),
          FailureCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "PostContactSummary" });
    case 12:
      return S.suspend(() =>
        S.Struct({ Content: S.optional(S.String), PointsOfInterest: S.optional(__S(7, __c0, 7)) }),
      ).annotate({ identifier: "ExtractedInformationValue" });
    case 13:
      return S.Array(__S(12, __c0, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          ExtractionDefinitionId: S.optional(S.String),
          ExtractionDefinitionName: S.optional(S.String),
          ExtractionDefinitionDisplayLabel: S.optional(S.String),
          ExtractedValues: S.optional(__S(13, __c0, 13)),
          FailureCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExtractedInformation" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Transcript: S.optional(__S(4, __c0, 4)),
          Categories: S.optional(__S(10, __c0, 10)),
          PostContactSummary: S.optional(__S(11, __c0, 11)),
          ExtractedInformation: S.optional(__S(14, __c0, 14)),
        }),
      ).annotate({ identifier: "RealtimeContactAnalysisSegment" });
    case 16:
      return S.Array(__S(15, __c0, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ Segments: S.optional(__S(16, __c0, 16)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRealtimeContactAnalysisSegmentsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
