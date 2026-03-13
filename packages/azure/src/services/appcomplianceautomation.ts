/**
 * Azure Appcomplianceautomation API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const EvidenceCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportName: Schema.String.pipe(T.PathParam()),
    evidenceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/evidences/{evidenceName}",
    }),
  );
export type EvidenceCreateOrUpdateInput =
  typeof EvidenceCreateOrUpdateInput.Type;

// Output Schema
export const EvidenceCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EvidenceCreateOrUpdateOutput =
  typeof EvidenceCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update an evidence a specified report
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param evidenceName - The evidence name.
 */
export const EvidenceCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EvidenceCreateOrUpdateInput,
    outputSchema: EvidenceCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EvidenceDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  evidenceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/evidences/{evidenceName}",
  }),
);
export type EvidenceDeleteInput = typeof EvidenceDeleteInput.Type;

// Output Schema
export const EvidenceDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EvidenceDeleteOutput = typeof EvidenceDeleteOutput.Type;

// The operation
/**
 * Delete an existent evidence from a specified report
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param evidenceName - The evidence name.
 */
export const EvidenceDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EvidenceDeleteInput,
  outputSchema: EvidenceDeleteOutput,
}));
// Input Schema
export const EvidenceDownloadInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  evidenceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/evidences/{evidenceName}/download",
  }),
);
export type EvidenceDownloadInput = typeof EvidenceDownloadInput.Type;

// Output Schema
export const EvidenceDownloadOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    evidenceFile: Schema.optional(
      Schema.Struct({
        url: Schema.optional(Schema.String),
      }),
    ),
  },
);
export type EvidenceDownloadOutput = typeof EvidenceDownloadOutput.Type;

// The operation
/**
 * Download evidence file.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param evidenceName - The evidence name.
 */
export const EvidenceDownload = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EvidenceDownloadInput,
  outputSchema: EvidenceDownloadOutput,
}));
// Input Schema
export const EvidenceGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  evidenceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/evidences/{evidenceName}",
  }),
);
export type EvidenceGetInput = typeof EvidenceGetInput.Type;

// Output Schema
export const EvidenceGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EvidenceGetOutput = typeof EvidenceGetOutput.Type;

// The operation
/**
 * Get the evidence metadata
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param evidenceName - The evidence name.
 */
export const EvidenceGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EvidenceGetInput,
  outputSchema: EvidenceGetOutput,
}));
// Input Schema
export const EvidenceListByReportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/evidences",
    }),
  );
export type EvidenceListByReportInput = typeof EvidenceListByReportInput.Type;

// Output Schema
export const EvidenceListByReportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type EvidenceListByReportOutput = typeof EvidenceListByReportOutput.Type;

// The operation
/**
 * Returns a paginated list of evidences for a specified report.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const EvidenceListByReport = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EvidenceListByReportInput,
    outputSchema: EvidenceListByReportOutput,
  }),
);
// Input Schema
export const ProviderActionsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.AppComplianceAutomation/checkNameAvailability",
    }),
  );
export type ProviderActionsCheckNameAvailabilityInput =
  typeof ProviderActionsCheckNameAvailabilityInput.Type;

// Output Schema
export const ProviderActionsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type ProviderActionsCheckNameAvailabilityOutput =
  typeof ProviderActionsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check if the given name is available for a report.
 *
 * @param api-version - The API version to use for this operation.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const ProviderActionsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderActionsCheckNameAvailabilityInput,
    outputSchema: ProviderActionsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ProviderActionsGetCollectionCountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.AppComplianceAutomation/getCollectionCount",
    }),
  );
export type ProviderActionsGetCollectionCountInput =
  typeof ProviderActionsGetCollectionCountInput.Type;

// Output Schema
export const ProviderActionsGetCollectionCountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    count: Schema.optional(Schema.Number),
  });
export type ProviderActionsGetCollectionCountOutput =
  typeof ProviderActionsGetCollectionCountOutput.Type;

// The operation
/**
 * Get the count of reports.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ProviderActionsGetCollectionCount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderActionsGetCollectionCountInput,
    outputSchema: ProviderActionsGetCollectionCountOutput,
  }));
// Input Schema
export const ProviderActionsGetOverviewStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.AppComplianceAutomation/getOverviewStatus",
    }),
  );
export type ProviderActionsGetOverviewStatusInput =
  typeof ProviderActionsGetOverviewStatusInput.Type;

// Output Schema
export const ProviderActionsGetOverviewStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    statusList: Schema.optional(
      Schema.Array(
        Schema.Struct({
          statusName: Schema.optional(Schema.String),
          statusValue: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ProviderActionsGetOverviewStatusOutput =
  typeof ProviderActionsGetOverviewStatusOutput.Type;

// The operation
/**
 * Get the resource overview status.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ProviderActionsGetOverviewStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderActionsGetOverviewStatusInput,
    outputSchema: ProviderActionsGetOverviewStatusOutput,
  }));
// Input Schema
export const ProviderActionsListInUseStorageAccountsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.AppComplianceAutomation/listInUseStorageAccounts",
    }),
  );
export type ProviderActionsListInUseStorageAccountsInput =
  typeof ProviderActionsListInUseStorageAccountsInput.Type;

// Output Schema
export const ProviderActionsListInUseStorageAccountsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageAccountList: Schema.optional(
      Schema.Array(
        Schema.Struct({
          subscriptionId: Schema.optional(Schema.String),
          resourceGroup: Schema.optional(Schema.String),
          accountName: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ProviderActionsListInUseStorageAccountsOutput =
  typeof ProviderActionsListInUseStorageAccountsOutput.Type;

// The operation
/**
 * List the storage accounts which are in use by related reports
 *
 * @param api-version - The API version to use for this operation.
 */
export const ProviderActionsListInUseStorageAccounts =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderActionsListInUseStorageAccountsInput,
    outputSchema: ProviderActionsListInUseStorageAccountsOutput,
  }));
// Input Schema
export const ProviderActionsOnboardInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.AppComplianceAutomation/onboard",
    }),
  );
export type ProviderActionsOnboardInput =
  typeof ProviderActionsOnboardInput.Type;

// Output Schema
export const ProviderActionsOnboardOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionIds: Schema.optional(Schema.Array(Schema.String)),
  });
export type ProviderActionsOnboardOutput =
  typeof ProviderActionsOnboardOutput.Type;

// The operation
/**
 * Onboard given subscriptions to Microsoft.AppComplianceAutomation provider.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ProviderActionsOnboard = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProviderActionsOnboardInput,
    outputSchema: ProviderActionsOnboardOutput,
  }),
);
// Input Schema
export const ProviderActionsTriggerEvaluationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.AppComplianceAutomation/triggerEvaluation",
    }),
  );
export type ProviderActionsTriggerEvaluationInput =
  typeof ProviderActionsTriggerEvaluationInput.Type;

// Output Schema
export const ProviderActionsTriggerEvaluationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        triggerTime: Schema.optional(Schema.String),
        evaluationEndTime: Schema.optional(Schema.String),
        resourceIds: Schema.optional(Schema.Array(Schema.String)),
        quickAssessments: Schema.optional(
          Schema.Array(
            Schema.Struct({
              resourceId: Schema.optional(Schema.String),
              responsibilityId: Schema.optional(Schema.String),
              timestamp: Schema.optional(Schema.String),
              resourceStatus: Schema.optional(
                Schema.Literals(["Healthy", "Unhealthy"]),
              ),
              displayName: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
              remediationLink: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ProviderActionsTriggerEvaluationOutput =
  typeof ProviderActionsTriggerEvaluationOutput.Type;

// The operation
/**
 * Trigger quick evaluation for the given subscriptions.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ProviderActionsTriggerEvaluation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProviderActionsTriggerEvaluationInput,
    outputSchema: ProviderActionsTriggerEvaluationOutput,
  }));
// Input Schema
export const ReportCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}",
    }),
  );
export type ReportCreateOrUpdateInput = typeof ReportCreateOrUpdateInput.Type;

// Output Schema
export const ReportCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ReportCreateOrUpdateOutput = typeof ReportCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new AppComplianceAutomation report or update an exiting AppComplianceAutomation report.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const ReportCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReportCreateOrUpdateInput,
    outputSchema: ReportCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ReportDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}",
  }),
);
export type ReportDeleteInput = typeof ReportDeleteInput.Type;

// Output Schema
export const ReportDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ReportDeleteOutput = typeof ReportDeleteOutput.Type;

// The operation
/**
 * Delete an AppComplianceAutomation report.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const ReportDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReportDeleteInput,
  outputSchema: ReportDeleteOutput,
}));
// Input Schema
export const ReportFixInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/fix",
  }),
);
export type ReportFixInput = typeof ReportFixInput.Type;

// Output Schema
export const ReportFixOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.optional(Schema.Literals(["Succeeded", "Failed"])),
  reason: Schema.optional(Schema.String),
});
export type ReportFixOutput = typeof ReportFixOutput.Type;

// The operation
/**
 * Fix the AppComplianceAutomation report error. e.g: App Compliance Automation Tool service unregistered, automation removed.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const ReportFix = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReportFixInput,
  outputSchema: ReportFixOutput,
}));
// Input Schema
export const ReportGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}",
  }),
);
export type ReportGetInput = typeof ReportGetInput.Type;

// Output Schema
export const ReportGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ReportGetOutput = typeof ReportGetOutput.Type;

// The operation
/**
 * Get the AppComplianceAutomation report and its properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const ReportGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReportGetInput,
  outputSchema: ReportGetOutput,
}));
// Input Schema
export const ReportGetScopingQuestionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/getScopingQuestions",
    }),
  );
export type ReportGetScopingQuestionsInput =
  typeof ReportGetScopingQuestionsInput.Type;

// Output Schema
export const ReportGetScopingQuestionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    questions: Schema.optional(
      Schema.Array(
        Schema.Struct({
          questionId: Schema.String,
          superiorQuestionId: Schema.optional(Schema.String),
          inputType: Schema.Literals([
            "None",
            "Text",
            "Email",
            "MultilineText",
            "Url",
            "Number",
            "Boolean",
            "Telephone",
            "YesNoNa",
            "Date",
            "YearPicker",
            "SingleSelection",
            "SingleSelectDropdown",
            "MultiSelectCheckbox",
            "MultiSelectDropdown",
            "MultiSelectDropdownCustom",
            "Group",
            "Upload",
          ]),
          optionIds: Schema.Array(Schema.String),
          rules: Schema.Array(
            Schema.Literals([
              "Required",
              "CharLength",
              "Url",
              "Urls",
              "Domains",
              "USPrivacyShield",
              "PublicSOX",
              "CreditCardPCI",
              "AzureApplication",
              "ValidGuid",
              "PublisherVerification",
              "DynamicDropdown",
              "PreventNonEnglishChar",
              "ValidEmail",
            ]),
          ),
          showSubQuestionsValue: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ReportGetScopingQuestionsOutput =
  typeof ReportGetScopingQuestionsOutput.Type;

// The operation
/**
 * Fix the AppComplianceAutomation report error. e.g: App Compliance Automation Tool service unregistered, automation removed.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const ReportGetScopingQuestions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReportGetScopingQuestionsInput,
    outputSchema: ReportGetScopingQuestionsOutput,
  }),
);
// Input Schema
export const ReportListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.AppComplianceAutomation/reports",
  }),
);
export type ReportListInput = typeof ReportListInput.Type;

// Output Schema
export const ReportListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type ReportListOutput = typeof ReportListOutput.Type;

// The operation
/**
 * Get the AppComplianceAutomation report list for the tenant.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ReportList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReportListInput,
  outputSchema: ReportListOutput,
}));
// Input Schema
export const ReportNestedResourceCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/checkNameAvailability",
    }),
  );
export type ReportNestedResourceCheckNameAvailabilityInput =
  typeof ReportNestedResourceCheckNameAvailabilityInput.Type;

// Output Schema
export const ReportNestedResourceCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type ReportNestedResourceCheckNameAvailabilityOutput =
  typeof ReportNestedResourceCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks the report's nested resource name availability, e.g: Webhooks, Evidences, Snapshots.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const ReportNestedResourceCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReportNestedResourceCheckNameAvailabilityInput,
    outputSchema: ReportNestedResourceCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ReportSyncCertRecordInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/syncCertRecord",
    }),
  );
export type ReportSyncCertRecordInput = typeof ReportSyncCertRecordInput.Type;

// Output Schema
export const ReportSyncCertRecordOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    certRecord: Schema.optional(
      Schema.Struct({
        offerGuid: Schema.optional(Schema.String),
        certificationStatus: Schema.optional(Schema.String),
        ingestionStatus: Schema.optional(Schema.String),
        controls: Schema.optional(
          Schema.Array(
            Schema.Struct({
              controlId: Schema.optional(Schema.String),
              controlStatus: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ReportSyncCertRecordOutput = typeof ReportSyncCertRecordOutput.Type;

// The operation
/**
 * Synchronize attestation record from app compliance.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const ReportSyncCertRecord = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReportSyncCertRecordInput,
    outputSchema: ReportSyncCertRecordOutput,
  }),
);
// Input Schema
export const ReportUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}",
  }),
);
export type ReportUpdateInput = typeof ReportUpdateInput.Type;

// Output Schema
export const ReportUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ReportUpdateOutput = typeof ReportUpdateOutput.Type;

// The operation
/**
 * Update an exiting AppComplianceAutomation report.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const ReportUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReportUpdateInput,
  outputSchema: ReportUpdateOutput,
}));
// Input Schema
export const ReportVerifyInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/verify",
  }),
);
export type ReportVerifyInput = typeof ReportVerifyInput.Type;

// Output Schema
export const ReportVerifyOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.optional(Schema.Literals(["Succeeded", "Failed"])),
  reason: Schema.optional(Schema.String),
});
export type ReportVerifyOutput = typeof ReportVerifyOutput.Type;

// The operation
/**
 * Verify the AppComplianceAutomation report health status.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const ReportVerify = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReportVerifyInput,
  outputSchema: ReportVerifyOutput,
}));
// Input Schema
export const ScopingConfigurationCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportName: Schema.String.pipe(T.PathParam()),
    scopingConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/scopingConfigurations/{scopingConfigurationName}",
    }),
  );
export type ScopingConfigurationCreateOrUpdateInput =
  typeof ScopingConfigurationCreateOrUpdateInput.Type;

// Output Schema
export const ScopingConfigurationCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScopingConfigurationCreateOrUpdateOutput =
  typeof ScopingConfigurationCreateOrUpdateOutput.Type;

// The operation
/**
 * Get the AppComplianceAutomation scoping configuration of the specific report.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param scopingConfigurationName - The scoping configuration of the specific report.
 */
export const ScopingConfigurationCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScopingConfigurationCreateOrUpdateInput,
    outputSchema: ScopingConfigurationCreateOrUpdateOutput,
  }));
// Input Schema
export const ScopingConfigurationDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportName: Schema.String.pipe(T.PathParam()),
    scopingConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/scopingConfigurations/{scopingConfigurationName}",
    }),
  );
export type ScopingConfigurationDeleteInput =
  typeof ScopingConfigurationDeleteInput.Type;

// Output Schema
export const ScopingConfigurationDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScopingConfigurationDeleteOutput =
  typeof ScopingConfigurationDeleteOutput.Type;

// The operation
/**
 * Clean the AppComplianceAutomation scoping configuration of the specific report.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param scopingConfigurationName - The scoping configuration of the specific report.
 */
export const ScopingConfigurationDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScopingConfigurationDeleteInput,
    outputSchema: ScopingConfigurationDeleteOutput,
  }),
);
// Input Schema
export const ScopingConfigurationGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportName: Schema.String.pipe(T.PathParam()),
    scopingConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/scopingConfigurations/{scopingConfigurationName}",
    }),
  );
export type ScopingConfigurationGetInput =
  typeof ScopingConfigurationGetInput.Type;

// Output Schema
export const ScopingConfigurationGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScopingConfigurationGetOutput =
  typeof ScopingConfigurationGetOutput.Type;

// The operation
/**
 * Get the AppComplianceAutomation scoping configuration of the specific report.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param scopingConfigurationName - The scoping configuration of the specific report.
 */
export const ScopingConfigurationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScopingConfigurationGetInput,
    outputSchema: ScopingConfigurationGetOutput,
  }),
);
// Input Schema
export const ScopingConfigurationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/scopingConfigurations",
    }),
  );
export type ScopingConfigurationListInput =
  typeof ScopingConfigurationListInput.Type;

// Output Schema
export const ScopingConfigurationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ScopingConfigurationListOutput =
  typeof ScopingConfigurationListOutput.Type;

// The operation
/**
 * Returns a list format of the singleton scopingConfiguration for a specified report.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const ScopingConfigurationList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScopingConfigurationListInput,
    outputSchema: ScopingConfigurationListOutput,
  }),
);
// Input Schema
export const SnapshotDownloadInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  snapshotName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/snapshots/{snapshotName}/download",
  }),
);
export type SnapshotDownloadInput = typeof SnapshotDownloadInput.Type;

// Output Schema
export const SnapshotDownloadOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceList: Schema.optional(
      Schema.Array(
        Schema.Struct({
          subscriptionId: Schema.optional(Schema.String),
          resourceGroup: Schema.optional(Schema.String),
          resourceType: Schema.optional(Schema.String),
          resourceId: Schema.optional(Schema.String),
        }),
      ),
    ),
    complianceReport: Schema.optional(
      Schema.Array(
        Schema.Struct({
          categoryName: Schema.optional(Schema.String),
          controlFamilyName: Schema.optional(Schema.String),
          controlId: Schema.optional(Schema.String),
          controlName: Schema.optional(Schema.String),
          controlStatus: Schema.optional(
            Schema.Literals([
              "Passed",
              "Failed",
              "NotApplicable",
              "PendingApproval",
            ]),
          ),
          responsibilityTitle: Schema.optional(Schema.String),
          responsibilityDescription: Schema.optional(Schema.String),
          resourceId: Schema.optional(Schema.String),
          resourceType: Schema.optional(Schema.String),
          resourceOrigin: Schema.optional(
            Schema.Literals(["Azure", "AWS", "GCP"]),
          ),
          resourceStatus: Schema.optional(
            Schema.Literals(["Healthy", "Unhealthy"]),
          ),
          resourceStatusChangeDate: Schema.optional(Schema.String),
        }),
      ),
    ),
    compliancePdfReport: Schema.optional(
      Schema.Struct({
        sasUri: Schema.optional(Schema.String),
      }),
    ),
    complianceDetailedPdfReport: Schema.optional(
      Schema.Struct({
        sasUri: Schema.optional(Schema.String),
      }),
    ),
  },
);
export type SnapshotDownloadOutput = typeof SnapshotDownloadOutput.Type;

// The operation
/**
 * Download compliance needs from snapshot, like: Compliance Report, Resource List.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param snapshotName - Snapshot Name.
 */
export const SnapshotDownload = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotDownloadInput,
  outputSchema: SnapshotDownloadOutput,
}));
// Input Schema
export const SnapshotGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  snapshotName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/snapshots/{snapshotName}",
  }),
);
export type SnapshotGetInput = typeof SnapshotGetInput.Type;

// Output Schema
export const SnapshotGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SnapshotGetOutput = typeof SnapshotGetOutput.Type;

// The operation
/**
 * Get the AppComplianceAutomation snapshot and its properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param snapshotName - Snapshot Name.
 */
export const SnapshotGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotGetInput,
  outputSchema: SnapshotGetOutput,
}));
// Input Schema
export const SnapshotListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/snapshots",
  }),
);
export type SnapshotListInput = typeof SnapshotListInput.Type;

// Output Schema
export const SnapshotListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type SnapshotListOutput = typeof SnapshotListOutput.Type;

// The operation
/**
 * Get the AppComplianceAutomation snapshot list.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const SnapshotList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotListInput,
  outputSchema: SnapshotListOutput,
}));
// Input Schema
export const WebhookCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reportName: Schema.String.pipe(T.PathParam()),
    webhookName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/webhooks/{webhookName}",
    }),
  );
export type WebhookCreateOrUpdateInput = typeof WebhookCreateOrUpdateInput.Type;

// Output Schema
export const WebhookCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebhookCreateOrUpdateOutput =
  typeof WebhookCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new AppComplianceAutomation webhook or update an exiting AppComplianceAutomation webhook.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param webhookName - Webhook Name.
 */
export const WebhookCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebhookCreateOrUpdateInput,
    outputSchema: WebhookCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WebhookDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  webhookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/webhooks/{webhookName}",
  }),
);
export type WebhookDeleteInput = typeof WebhookDeleteInput.Type;

// Output Schema
export const WebhookDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebhookDeleteOutput = typeof WebhookDeleteOutput.Type;

// The operation
/**
 * Delete an AppComplianceAutomation webhook.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param webhookName - Webhook Name.
 */
export const WebhookDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebhookDeleteInput,
  outputSchema: WebhookDeleteOutput,
}));
// Input Schema
export const WebhookGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  webhookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/webhooks/{webhookName}",
  }),
);
export type WebhookGetInput = typeof WebhookGetInput.Type;

// Output Schema
export const WebhookGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebhookGetOutput = typeof WebhookGetOutput.Type;

// The operation
/**
 * Get the AppComplianceAutomation webhook and its properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param webhookName - Webhook Name.
 */
export const WebhookGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebhookGetInput,
  outputSchema: WebhookGetOutput,
}));
// Input Schema
export const WebhookListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/webhooks",
  }),
);
export type WebhookListInput = typeof WebhookListInput.Type;

// Output Schema
export const WebhookListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type WebhookListOutput = typeof WebhookListOutput.Type;

// The operation
/**
 * Get the AppComplianceAutomation webhook list.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 */
export const WebhookList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebhookListInput,
  outputSchema: WebhookListOutput,
}));
// Input Schema
export const WebhookUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  reportName: Schema.String.pipe(T.PathParam()),
  webhookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/providers/Microsoft.AppComplianceAutomation/reports/{reportName}/webhooks/{webhookName}",
  }),
);
export type WebhookUpdateInput = typeof WebhookUpdateInput.Type;

// Output Schema
export const WebhookUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type WebhookUpdateOutput = typeof WebhookUpdateOutput.Type;

// The operation
/**
 * Update an exiting AppComplianceAutomation webhook.
 *
 * @param api-version - The API version to use for this operation.
 * @param reportName - Report Name.
 * @param webhookName - Webhook Name.
 */
export const WebhookUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebhookUpdateInput,
  outputSchema: WebhookUpdateOutput,
}));
