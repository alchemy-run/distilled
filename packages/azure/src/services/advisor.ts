/**
 * Azure Advisor API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AdvisorScoresGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/advisorScore/{name}",
  }),
);
export type AdvisorScoresGetInput = typeof AdvisorScoresGetInput.Type;

// Output Schema
export const AdvisorScoresGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type AdvisorScoresGetOutput = typeof AdvisorScoresGetOutput.Type;

// The operation
/**
 * Gets the advisor score.
 *
 * @param name - The scope of Advisor score entity.
 */
export const AdvisorScoresGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AdvisorScoresGetInput,
  outputSchema: AdvisorScoresGetOutput,
}));
// Input Schema
export const AdvisorScoresListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/advisorScore",
  }),
);
export type AdvisorScoresListInput = typeof AdvisorScoresListInput.Type;

// Output Schema
export const AdvisorScoresListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type AdvisorScoresListOutput = typeof AdvisorScoresListOutput.Type;

// The operation
/**
 * Gets the list of advisor scores.
 */
export const AdvisorScoresList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AdvisorScoresListInput,
  outputSchema: AdvisorScoresListOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Advisor/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            description: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all the available Advisor REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PredictInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/predict",
  }),
);
export type PredictInput = typeof PredictInput.Type;

// Output Schema
export const PredictOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  properties: Schema.optional(
    Schema.Struct({
      extendedProperties: Schema.optional(Schema.Unknown),
      predictionType: Schema.optional(
        Schema.Literals(["PredictiveRightsizing"]),
      ),
      category: Schema.optional(
        Schema.Literals([
          "HighAvailability",
          "Security",
          "Performance",
          "Cost",
          "OperationalExcellence",
        ]),
      ),
      impact: Schema.optional(Schema.Literals(["High", "Medium", "Low"])),
      impactedField: Schema.optional(Schema.String),
      lastUpdated: Schema.optional(Schema.String),
      shortDescription: Schema.optional(
        Schema.Struct({
          problem: Schema.optional(Schema.String),
          solution: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
});
export type PredictOutput = typeof PredictOutput.Type;

// The operation
/**
 * Predicts a recommendation.
 */
export const Predict = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PredictInput,
  outputSchema: PredictOutput,
}));
// Input Schema
export const RecommendationMetadataGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Advisor/metadata/{name}",
    }),
  );
export type RecommendationMetadataGetInput =
  typeof RecommendationMetadataGetInput.Type;

// Output Schema
export const RecommendationMetadataGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        displayName: Schema.optional(Schema.String),
        dependsOn: Schema.optional(Schema.Array(Schema.String)),
        applicableScenarios: Schema.optional(
          Schema.Array(Schema.Literals(["Alerts"])),
        ),
        supportedValues: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type RecommendationMetadataGetOutput =
  typeof RecommendationMetadataGetOutput.Type;

// The operation
/**
 * Gets the metadata entity.
 *
 * @param name - Name of metadata entity.
 */
export const RecommendationMetadataGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RecommendationMetadataGetInput,
    outputSchema: RecommendationMetadataGetOutput,
  }),
);
// Input Schema
export const RecommendationMetadataListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "GET", path: "/providers/Microsoft.Advisor/metadata" }),
  );
export type RecommendationMetadataListInput =
  typeof RecommendationMetadataListInput.Type;

// Output Schema
export const RecommendationMetadataListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              displayName: Schema.optional(Schema.String),
              dependsOn: Schema.optional(Schema.Array(Schema.String)),
              applicableScenarios: Schema.optional(
                Schema.Array(Schema.Literals(["Alerts"])),
              ),
              supportedValues: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RecommendationMetadataListOutput =
  typeof RecommendationMetadataListOutput.Type;

// The operation
/**
 * Gets the list of metadata entities.
 *
 * @param $filter - The filter to apply to the recommendation metadata.<br>Filter can be applied to properties ['[recommendationCategory](#category)', '[recommendationSubCategory](#recommendationSubCategory)', 'RetirementDate'] with operators ['eq', 'and', 'le', 'ge']<br>The filter can also be applied to property ['[TrackingIds]']<br><br>⚠ **Note:** `recommendationControl` is a legacy filter property and will be deprecated in the future. Please use `recommendationSubCategory` for filtering recommendation subcategory.<br><br>Valid options for recommendationSubCategory: ['BusinessContinuity', 'DisasterRecovery', 'HighAvailability', 'MonitoringAndAlerting', 'Other', 'Personalized', 'PrioritizedRecommendations', 'Scalability', 'ServiceUpgradeAndRetirement', 'Validation']<br><br>Example:<br>- $filter=recommendationCategory eq 'HighAvailability' and recommendationSubCategory eq 'ServiceUpgradeAndRetirement' and retirementDate ge '2024-01-01' and retirementDate le '2028-01-01'. Filter can be applied on trackingIds as well.<br>- $filter=trackingIds/any(t: t eq 'some-guid')<br><br>⚠ **Note:** `trackingIDs` filter can be used for filtering one value at a time. The support to filter multiple values is not currently available. Also the support to add other filters along with `trackingIDs` is not available.
 */
export const RecommendationMetadataList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RecommendationMetadataListInput,
    outputSchema: RecommendationMetadataListOutput,
  }),
);
// Input Schema
export const RecommendationsGenerateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/generateRecommendations",
    }),
  );
export type RecommendationsGenerateInput =
  typeof RecommendationsGenerateInput.Type;

// Output Schema
export const RecommendationsGenerateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RecommendationsGenerateOutput =
  typeof RecommendationsGenerateOutput.Type;

// The operation
/**
 * Initiates the recommendation generation or computation process for a subscription. This operation is asynchronous. The generated recommendations are stored in a cache in the Advisor service.
 */
export const RecommendationsGenerate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RecommendationsGenerateInput,
    outputSchema: RecommendationsGenerateOutput,
  }),
);
// Input Schema
export const RecommendationsGetGenerateStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    operationId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/generateRecommendations/{operationId}",
    }),
  );
export type RecommendationsGetGenerateStatusInput =
  typeof RecommendationsGetGenerateStatusInput.Type;

// Output Schema
export const RecommendationsGetGenerateStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RecommendationsGetGenerateStatusOutput =
  typeof RecommendationsGetGenerateStatusOutput.Type;

// The operation
/**
 * Retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header.
 *
 * @param operationId - The operation ID, which can be found from the Location field in the generate recommendation response header.
 */
export const RecommendationsGetGenerateStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RecommendationsGetGenerateStatusInput,
    outputSchema: RecommendationsGetGenerateStatusOutput,
  }));
// Input Schema
export const SuppressionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceUri: Schema.String.pipe(T.PathParam()),
    recommendationId: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{resourceUri}/providers/Microsoft.Advisor/recommendations/{recommendationId}/suppressions/{name}",
    }),
  );
export type SuppressionsDeleteInput = typeof SuppressionsDeleteInput.Type;

// Output Schema
export const SuppressionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SuppressionsDeleteOutput = typeof SuppressionsDeleteOutput.Type;

// The operation
/**
 * Enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression.
 *
 * @param resourceUri - The fully qualified Azure Resource Manager identifier of the resource to which the recommendation applies.
 * @param recommendationId - The recommendation ID.
 * @param name - The name of the suppression.
 */
export const SuppressionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SuppressionsDeleteInput,
  outputSchema: SuppressionsDeleteOutput,
}));
