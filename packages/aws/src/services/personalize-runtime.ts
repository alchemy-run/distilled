import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Personalize Runtime",
  target: "AmazonPersonalizeRuntime",
  version: "2018-05-22",
  sigv4: "personalize",
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
                `https://personalize-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://personalize-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://personalize-runtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://personalize-runtime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInputException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export type Arn = string;
export type UserID = string;
export type NumResults = number;
export type FilterAttributeName = string;
export type FilterAttributeValue = string | redacted.Redacted<string>;
export type FilterValues = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface GetActionRecommendationsRequest {
  campaignArn?: string;
  userId?: string;
  numResults?: number;
  filterArn?: string;
  filterValues?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export type ActionID = string;
export type Score = number;
export interface PredictedAction {
  actionId?: string;
  score?: number;
}
export type ActionList = PredictedAction[];
export type RecommendationID = string;
export interface GetActionRecommendationsResponse {
  actionList?: PredictedAction[];
  recommendationId?: string;
}
export type ItemID = string;
export type InputList = string[];
export type AttributeName = string;
export type AttributeValue = string | redacted.Redacted<string>;
export type Context = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type DatasetType = string;
export type ColumnName = string;
export type ColumnNamesList = string[];
export type MetadataColumns = { [key: string]: string[] | undefined };
export interface GetPersonalizedRankingRequest {
  campaignArn: string;
  inputList: string[];
  userId: string;
  context?: { [key: string]: string | redacted.Redacted<string> | undefined };
  filterArn?: string;
  filterValues?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  metadataColumns?: { [key: string]: string[] | undefined };
}
export type Name = string;
export type ColumnValue = string;
export type Metadata = { [key: string]: string | undefined };
export type Reason = string;
export type ReasonList = string[];
export interface PredictedItem {
  itemId?: string;
  score?: number;
  promotionName?: string;
  metadata?: { [key: string]: string | undefined };
  reason?: string[];
}
export type ItemList = PredictedItem[];
export interface GetPersonalizedRankingResponse {
  personalizedRanking?: PredictedItem[];
  recommendationId?: string;
}
export type PercentPromotedItems = number;
export interface Promotion {
  name?: string;
  percentPromotedItems?: number;
  filterArn?: string;
  filterValues?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export type PromotionList = Promotion[];
export interface GetRecommendationsRequest {
  campaignArn?: string;
  itemId?: string;
  userId?: string;
  numResults?: number;
  context?: { [key: string]: string | redacted.Redacted<string> | undefined };
  filterArn?: string;
  filterValues?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  recommenderArn?: string;
  promotions?: Promotion[];
  metadataColumns?: { [key: string]: string[] | undefined };
}
export interface GetRecommendationsResponse {
  itemList?: PredictedItem[];
  recommendationId?: string;
}
export type ErrorMessage = string;
export type GetActionRecommendationsError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of recommended actions in sorted in descending order by prediction score.
 * Use the `GetActionRecommendations` API if you have a custom
 * campaign that deploys a solution version trained with a PERSONALIZED_ACTIONS recipe.
 *
 * For more information about PERSONALIZED_ACTIONS recipes, see PERSONALIZED_ACTIONS recipes.
 * For more information about getting action recommendations, see Getting action recommendations.
 */
export const getActionRecommendations: API.OperationMethod<
  GetActionRecommendationsRequest,
  GetActionRecommendationsResponse,
  GetActionRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /action-recommendations",
    input: {
      campaignArn: 0,
      userId: 0,
      numResults: 0,
      filterArn: 0,
      filterValues: 0,
    },
    body: true,
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetActionRecommendations",
})) as any;

export type GetPersonalizedRankingError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Re-ranks a list of recommended items for the given user. The first item in the list is
 * deemed the most likely item to be of interest to the user.
 *
 * The solution backing the campaign must have been created using a recipe of type
 * PERSONALIZED_RANKING.
 */
export const getPersonalizedRanking: API.OperationMethod<
  GetPersonalizedRankingRequest,
  GetPersonalizedRankingResponse,
  GetPersonalizedRankingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /personalize-ranking",
    input: {
      campaignArn: 0,
      inputList: 0,
      userId: 0,
      context: 0,
      filterArn: 0,
      filterValues: 0,
      metadataColumns: 0,
    },
    body: true,
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPersonalizedRanking",
})) as any;

export type GetRecommendationsError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of recommended items. For campaigns, the campaign's Amazon Resource Name (ARN) is required and the required user and item input depends on the recipe type used to
 * create the solution backing the campaign as follows:
 *
 * - USER_PERSONALIZATION - `userId` required, `itemId` not used
 *
 * - RELATED_ITEMS - `itemId` required, `userId` not used
 *
 * Campaigns that are backed by a solution created using a recipe of type
 * PERSONALIZED_RANKING use the API.
 *
 * For recommenders, the recommender's ARN is required and the required item and user input depends on the use case (domain-based recipe) backing the recommender.
 * For information on use case requirements see Choosing recommender use cases.
 */
export const getRecommendations: API.OperationMethod<
  GetRecommendationsRequest,
  GetRecommendationsResponse,
  GetRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /recommendations",
    input: {
      campaignArn: 0,
      itemId: 0,
      userId: 0,
      numResults: 0,
      context: 0,
      filterArn: 0,
      filterValues: 0,
      recommenderArn: 0,
      promotions: D.list({
        name: 0,
        percentPromotedItems: 0,
        filterArn: 0,
        filterValues: 0,
      }),
      metadataColumns: 0,
    },
    body: true,
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendations",
})) as any;
