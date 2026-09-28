import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Connect Contact Lens",
  target: "AmazonConnectContactLens",
  version: "2020-08-21",
  sigv4: "connect",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://contact-lens.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://contact-lens.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
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
export type SentimentValue =
  | "POSITIVE"
  | "NEUTRAL"
  | "NEGATIVE"
  | (string & {});
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
    PostContactSummary: PostContactSummary & {
      Status: PostContactSummaryStatus;
    };
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
  descriptor: {
    service: svc,
    http: "POST /realtime-contact-analysis/analysis-segments",
    input: { InstanceId: 0, ContactId: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
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
