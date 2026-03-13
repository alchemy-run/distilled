/**
 * Azure Automation API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ActivityGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  moduleName: Schema.String.pipe(T.PathParam()),
  activityName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}/activities/{activityName}",
  }),
);
export type ActivityGetInput = typeof ActivityGetInput.Type;

// Output Schema
export const ActivityGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      definition: Schema.optional(Schema.String),
      parameterSets: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            parameters: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                  type: Schema.optional(Schema.String),
                  isMandatory: Schema.optional(Schema.Boolean),
                  isDynamic: Schema.optional(Schema.Boolean),
                  position: Schema.optional(Schema.Number),
                  valueFromPipeline: Schema.optional(Schema.Boolean),
                  valueFromPipelineByPropertyName: Schema.optional(
                    Schema.Boolean,
                  ),
                  valueFromRemainingArguments: Schema.optional(Schema.Boolean),
                  description: Schema.optional(Schema.String),
                  validationSet: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        memberValue: Schema.optional(Schema.String),
                      }),
                    ),
                  ),
                }),
              ),
            ),
          }),
        ),
      ),
      outputTypes: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            type: Schema.optional(Schema.String),
          }),
        ),
      ),
      creationTime: Schema.optional(Schema.String),
      lastModifiedTime: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ),
});
export type ActivityGetOutput = typeof ActivityGetOutput.Type;

// The operation
/**
 * Retrieve the activity in the module identified by module name and activity name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param moduleName - The name of module.
 * @param activityName - The name of activity.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ActivityGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ActivityGetInput,
  outputSchema: ActivityGetOutput,
}));
// Input Schema
export const ActivityListByModuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    moduleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}/activities",
    }),
  );
export type ActivityListByModuleInput = typeof ActivityListByModuleInput.Type;

// Output Schema
export const ActivityListByModuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              definition: Schema.optional(Schema.String),
              parameterSets: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    parameters: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          type: Schema.optional(Schema.String),
                          isMandatory: Schema.optional(Schema.Boolean),
                          isDynamic: Schema.optional(Schema.Boolean),
                          position: Schema.optional(Schema.Number),
                          valueFromPipeline: Schema.optional(Schema.Boolean),
                          valueFromPipelineByPropertyName: Schema.optional(
                            Schema.Boolean,
                          ),
                          valueFromRemainingArguments: Schema.optional(
                            Schema.Boolean,
                          ),
                          description: Schema.optional(Schema.String),
                          validationSet: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                memberValue: Schema.optional(Schema.String),
                              }),
                            ),
                          ),
                        }),
                      ),
                    ),
                  }),
                ),
              ),
              outputTypes: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                  }),
                ),
              ),
              creationTime: Schema.optional(Schema.String),
              lastModifiedTime: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ActivityListByModuleOutput = typeof ActivityListByModuleOutput.Type;

// The operation
/**
 * Retrieve a list of activities in the module identified by module name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param moduleName - The name of module.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ActivityListByModule = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ActivityListByModuleInput,
    outputSchema: ActivityListByModuleOutput,
  }),
);
// Input Schema
export const AgentRegistrationInformationGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/agentRegistrationInformation",
    }),
  );
export type AgentRegistrationInformationGetInput =
  typeof AgentRegistrationInformationGetInput.Type;

// Output Schema
export const AgentRegistrationInformationGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dscMetaConfiguration: Schema.optional(Schema.String),
    endpoint: Schema.optional(Schema.String),
    keys: Schema.optional(
      Schema.Struct({
        primary: Schema.optional(Schema.String),
        secondary: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
  });
export type AgentRegistrationInformationGetOutput =
  typeof AgentRegistrationInformationGetOutput.Type;

// The operation
/**
 * Retrieve the automation agent registration information.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param api-version - Client Api Version.
 */
export const AgentRegistrationInformationGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AgentRegistrationInformationGetInput,
    outputSchema: AgentRegistrationInformationGetOutput,
  }));
// Input Schema
export const AgentRegistrationInformationRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/agentRegistrationInformation/regenerateKey",
    }),
  );
export type AgentRegistrationInformationRegenerateKeyInput =
  typeof AgentRegistrationInformationRegenerateKeyInput.Type;

// Output Schema
export const AgentRegistrationInformationRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dscMetaConfiguration: Schema.optional(Schema.String),
    endpoint: Schema.optional(Schema.String),
    keys: Schema.optional(
      Schema.Struct({
        primary: Schema.optional(Schema.String),
        secondary: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
  });
export type AgentRegistrationInformationRegenerateKeyOutput =
  typeof AgentRegistrationInformationRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerate a primary or secondary agent registration key
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param api-version - Client Api Version.
 */
export const AgentRegistrationInformationRegenerateKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AgentRegistrationInformationRegenerateKeyInput,
    outputSchema: AgentRegistrationInformationRegenerateKeyOutput,
  }));
// Input Schema
export const AutomationAccountCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}",
    }),
  );
export type AutomationAccountCreateOrUpdateInput =
  typeof AutomationAccountCreateOrUpdateInput.Type;

// Output Schema
export const AutomationAccountCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutomationAccountCreateOrUpdateOutput =
  typeof AutomationAccountCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update automation account.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const AutomationAccountCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutomationAccountCreateOrUpdateInput,
    outputSchema: AutomationAccountCreateOrUpdateOutput,
  }));
// Input Schema
export const AutomationAccountDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}",
    }),
  );
export type AutomationAccountDeleteInput =
  typeof AutomationAccountDeleteInput.Type;

// Output Schema
export const AutomationAccountDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AutomationAccountDeleteOutput =
  typeof AutomationAccountDeleteOutput.Type;

// The operation
/**
 * Delete an automation account.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const AutomationAccountDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutomationAccountDeleteInput,
    outputSchema: AutomationAccountDeleteOutput,
  }),
);
// Input Schema
export const AutomationAccountGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}",
    }),
  );
export type AutomationAccountGetInput = typeof AutomationAccountGetInput.Type;

// Output Schema
export const AutomationAccountGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutomationAccountGetOutput = typeof AutomationAccountGetOutput.Type;

// The operation
/**
 * Get information about an Automation Account.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const AutomationAccountGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutomationAccountGetInput,
    outputSchema: AutomationAccountGetOutput,
  }),
);
// Input Schema
export const AutomationAccountListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Automation/automationAccounts",
    }),
  );
export type AutomationAccountListInput = typeof AutomationAccountListInput.Type;

// Output Schema
export const AutomationAccountListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AutomationAccountListOutput =
  typeof AutomationAccountListOutput.Type;

// The operation
/**
 * Lists the Automation Accounts within an Azure subscription.
 *
 * Retrieve a list of accounts within a given subscription.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const AutomationAccountList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutomationAccountListInput,
    outputSchema: AutomationAccountListOutput,
  }),
);
// Input Schema
export const AutomationAccountListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts",
    }),
  );
export type AutomationAccountListByResourceGroupInput =
  typeof AutomationAccountListByResourceGroupInput.Type;

// Output Schema
export const AutomationAccountListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AutomationAccountListByResourceGroupOutput =
  typeof AutomationAccountListByResourceGroupOutput.Type;

// The operation
/**
 * Retrieve a list of accounts within a given resource group.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const AutomationAccountListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutomationAccountListByResourceGroupInput,
    outputSchema: AutomationAccountListByResourceGroupOutput,
  }));
// Input Schema
export const AutomationAccountListDeletedRunbooksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/listDeletedRunbooks",
    }),
  );
export type AutomationAccountListDeletedRunbooksInput =
  typeof AutomationAccountListDeletedRunbooksInput.Type;

// Output Schema
export const AutomationAccountListDeletedRunbooksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              runbookId: Schema.optional(Schema.String),
              runbookType: Schema.optional(Schema.String),
              runtime: Schema.optional(Schema.String),
              runtimeEnvironment: Schema.optional(Schema.NullOr(Schema.String)),
              creationTime: Schema.optional(Schema.String),
              deletionTime: Schema.optional(Schema.String),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AutomationAccountListDeletedRunbooksOutput =
  typeof AutomationAccountListDeletedRunbooksOutput.Type;

// The operation
/**
 * Retrieve the deleted runbooks for an automation account.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const AutomationAccountListDeletedRunbooks =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutomationAccountListDeletedRunbooksInput,
    outputSchema: AutomationAccountListDeletedRunbooksOutput,
  }));
// Input Schema
export const AutomationAccountUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}",
    }),
  );
export type AutomationAccountUpdateInput =
  typeof AutomationAccountUpdateInput.Type;

// Output Schema
export const AutomationAccountUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AutomationAccountUpdateOutput =
  typeof AutomationAccountUpdateOutput.Type;

// The operation
/**
 * Update an automation account.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const AutomationAccountUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutomationAccountUpdateInput,
    outputSchema: AutomationAccountUpdateOutput,
  }),
);
// Input Schema
export const CertificateCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/certificates/{certificateName}",
    }),
  );
export type CertificateCreateOrUpdateInput =
  typeof CertificateCreateOrUpdateInput.Type;

// Output Schema
export const CertificateCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CertificateCreateOrUpdateOutput =
  typeof CertificateCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a certificate.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param certificateName - The parameters supplied to the create or update certificate operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const CertificateCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CertificateCreateOrUpdateInput,
    outputSchema: CertificateCreateOrUpdateOutput,
  }),
);
// Input Schema
export const CertificateDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/certificates/{certificateName}",
  }),
);
export type CertificateDeleteInput = typeof CertificateDeleteInput.Type;

// Output Schema
export const CertificateDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CertificateDeleteOutput = typeof CertificateDeleteOutput.Type;

// The operation
/**
 * Delete the certificate.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param certificateName - The name of certificate.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const CertificateDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CertificateDeleteInput,
  outputSchema: CertificateDeleteOutput,
}));
// Input Schema
export const CertificateGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  certificateName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/certificates/{certificateName}",
  }),
);
export type CertificateGetInput = typeof CertificateGetInput.Type;

// Output Schema
export const CertificateGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type CertificateGetOutput = typeof CertificateGetOutput.Type;

// The operation
/**
 * Retrieve the certificate identified by certificate name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param certificateName - The name of certificate.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const CertificateGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CertificateGetInput,
  outputSchema: CertificateGetOutput,
}));
// Input Schema
export const CertificateListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/certificates",
    }),
  );
export type CertificateListByAutomationAccountInput =
  typeof CertificateListByAutomationAccountInput.Type;

// Output Schema
export const CertificateListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type CertificateListByAutomationAccountOutput =
  typeof CertificateListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of certificates.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const CertificateListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CertificateListByAutomationAccountInput,
    outputSchema: CertificateListByAutomationAccountOutput,
  }));
// Input Schema
export const CertificateUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/certificates/{certificateName}",
  }),
);
export type CertificateUpdateInput = typeof CertificateUpdateInput.Type;

// Output Schema
export const CertificateUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CertificateUpdateOutput = typeof CertificateUpdateOutput.Type;

// The operation
/**
 * Update a certificate.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param certificateName - The parameters supplied to the update certificate operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const CertificateUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CertificateUpdateInput,
  outputSchema: CertificateUpdateOutput,
}));
// Input Schema
export const ConnectionCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connections/{connectionName}",
    }),
  );
export type ConnectionCreateOrUpdateInput =
  typeof ConnectionCreateOrUpdateInput.Type;

// Output Schema
export const ConnectionCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConnectionCreateOrUpdateOutput =
  typeof ConnectionCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a connection.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param connectionName - The parameters supplied to the create or update connection operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ConnectionCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectionCreateOrUpdateInput,
    outputSchema: ConnectionCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ConnectionDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connections/{connectionName}",
  }),
);
export type ConnectionDeleteInput = typeof ConnectionDeleteInput.Type;

// Output Schema
export const ConnectionDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectionDeleteOutput = typeof ConnectionDeleteOutput.Type;

// The operation
/**
 * Delete the connection.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param connectionName - The name of connection.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ConnectionDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectionDeleteInput,
  outputSchema: ConnectionDeleteOutput,
}));
// Input Schema
export const ConnectionGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connections/{connectionName}",
  }),
);
export type ConnectionGetInput = typeof ConnectionGetInput.Type;

// Output Schema
export const ConnectionGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ConnectionGetOutput = typeof ConnectionGetOutput.Type;

// The operation
/**
 * Retrieve the connection identified by connection name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param connectionName - The name of connection.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ConnectionGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectionGetInput,
  outputSchema: ConnectionGetOutput,
}));
// Input Schema
export const ConnectionListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connections",
    }),
  );
export type ConnectionListByAutomationAccountInput =
  typeof ConnectionListByAutomationAccountInput.Type;

// Output Schema
export const ConnectionListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ConnectionListByAutomationAccountOutput =
  typeof ConnectionListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of connections.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ConnectionListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectionListByAutomationAccountInput,
    outputSchema: ConnectionListByAutomationAccountOutput,
  }));
// Input Schema
export const ConnectionTypeCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    connectionTypeName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connectionTypes/{connectionTypeName}",
    }),
  );
export type ConnectionTypeCreateOrUpdateInput =
  typeof ConnectionTypeCreateOrUpdateInput.Type;

// Output Schema
export const ConnectionTypeCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        isGlobal: Schema.optional(Schema.Boolean),
        fieldDefinitions: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              isEncrypted: Schema.optional(Schema.Boolean),
              isOptional: Schema.optional(Schema.Boolean),
              type: Schema.String,
            }),
          ),
        ),
        creationTime: Schema.optional(Schema.String),
        lastModifiedTime: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
      }),
    ),
  });
export type ConnectionTypeCreateOrUpdateOutput =
  typeof ConnectionTypeCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a connection type.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param connectionTypeName - The parameters supplied to the create or update connection type operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ConnectionTypeCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectionTypeCreateOrUpdateInput,
    outputSchema: ConnectionTypeCreateOrUpdateOutput,
  }));
// Input Schema
export const ConnectionTypeDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    connectionTypeName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connectionTypes/{connectionTypeName}",
    }),
  );
export type ConnectionTypeDeleteInput = typeof ConnectionTypeDeleteInput.Type;

// Output Schema
export const ConnectionTypeDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectionTypeDeleteOutput = typeof ConnectionTypeDeleteOutput.Type;

// The operation
/**
 * Delete the connection type.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param connectionTypeName - The name of connection type.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ConnectionTypeDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectionTypeDeleteInput,
    outputSchema: ConnectionTypeDeleteOutput,
  }),
);
// Input Schema
export const ConnectionTypeGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    connectionTypeName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connectionTypes/{connectionTypeName}",
  }),
);
export type ConnectionTypeGetInput = typeof ConnectionTypeGetInput.Type;

// Output Schema
export const ConnectionTypeGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        isGlobal: Schema.optional(Schema.Boolean),
        fieldDefinitions: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              isEncrypted: Schema.optional(Schema.Boolean),
              isOptional: Schema.optional(Schema.Boolean),
              type: Schema.String,
            }),
          ),
        ),
        creationTime: Schema.optional(Schema.String),
        lastModifiedTime: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
      }),
    ),
  });
export type ConnectionTypeGetOutput = typeof ConnectionTypeGetOutput.Type;

// The operation
/**
 * Retrieve the connection type identified by connection type name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param connectionTypeName - The name of connection type.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ConnectionTypeGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectionTypeGetInput,
  outputSchema: ConnectionTypeGetOutput,
}));
// Input Schema
export const ConnectionTypeListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connectionTypes",
    }),
  );
export type ConnectionTypeListByAutomationAccountInput =
  typeof ConnectionTypeListByAutomationAccountInput.Type;

// Output Schema
export const ConnectionTypeListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              isGlobal: Schema.optional(Schema.Boolean),
              fieldDefinitions: Schema.optional(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    isEncrypted: Schema.optional(Schema.Boolean),
                    isOptional: Schema.optional(Schema.Boolean),
                    type: Schema.String,
                  }),
                ),
              ),
              creationTime: Schema.optional(Schema.String),
              lastModifiedTime: Schema.optional(Schema.String),
              description: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConnectionTypeListByAutomationAccountOutput =
  typeof ConnectionTypeListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of connection types.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ConnectionTypeListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectionTypeListByAutomationAccountInput,
    outputSchema: ConnectionTypeListByAutomationAccountOutput,
  }));
// Input Schema
export const ConnectionUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/connections/{connectionName}",
  }),
);
export type ConnectionUpdateInput = typeof ConnectionUpdateInput.Type;

// Output Schema
export const ConnectionUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ConnectionUpdateOutput = typeof ConnectionUpdateOutput.Type;

// The operation
/**
 * Update a connection.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param connectionName - The parameters supplied to the update a connection operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ConnectionUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectionUpdateInput,
  outputSchema: ConnectionUpdateOutput,
}));
// Input Schema
export const ConvertGraphRunbookContentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/convertGraphRunbookContent",
    }),
  );
export type ConvertGraphRunbookContentInput =
  typeof ConvertGraphRunbookContentInput.Type;

// Output Schema
export const ConvertGraphRunbookContentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    rawContent: Schema.optional(
      Schema.Struct({
        schemaVersion: Schema.optional(Schema.String),
        runbookDefinition: Schema.optional(Schema.String),
        runbookType: Schema.optional(
          Schema.Literals(["GraphPowerShell", "GraphPowerShellWorkflow"]),
        ),
      }),
    ),
    graphRunbookJson: Schema.optional(Schema.NullOr(Schema.String)),
  });
export type ConvertGraphRunbookContentOutput =
  typeof ConvertGraphRunbookContentOutput.Type;

// The operation
/**
 * Post operation to serialize or deserialize GraphRunbookContent
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const convertGraphRunbookContent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConvertGraphRunbookContentInput,
    outputSchema: ConvertGraphRunbookContentOutput,
  }),
);
// Input Schema
export const CredentialCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    credentialName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/credentials/{credentialName}",
    }),
  );
export type CredentialCreateOrUpdateInput =
  typeof CredentialCreateOrUpdateInput.Type;

// Output Schema
export const CredentialCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CredentialCreateOrUpdateOutput =
  typeof CredentialCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a credential.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param credentialName - The parameters supplied to the create or update credential operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const CredentialCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CredentialCreateOrUpdateInput,
    outputSchema: CredentialCreateOrUpdateOutput,
  }),
);
// Input Schema
export const CredentialDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  credentialName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/credentials/{credentialName}",
  }),
);
export type CredentialDeleteInput = typeof CredentialDeleteInput.Type;

// Output Schema
export const CredentialDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CredentialDeleteOutput = typeof CredentialDeleteOutput.Type;

// The operation
/**
 * Delete the credential.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param credentialName - The name of credential.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const CredentialDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CredentialDeleteInput,
  outputSchema: CredentialDeleteOutput,
}));
// Input Schema
export const CredentialGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  credentialName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/credentials/{credentialName}",
  }),
);
export type CredentialGetInput = typeof CredentialGetInput.Type;

// Output Schema
export const CredentialGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type CredentialGetOutput = typeof CredentialGetOutput.Type;

// The operation
/**
 * Retrieve the credential identified by credential name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param credentialName - The name of credential.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const CredentialGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CredentialGetInput,
  outputSchema: CredentialGetOutput,
}));
// Input Schema
export const CredentialListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/credentials",
    }),
  );
export type CredentialListByAutomationAccountInput =
  typeof CredentialListByAutomationAccountInput.Type;

// Output Schema
export const CredentialListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type CredentialListByAutomationAccountOutput =
  typeof CredentialListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of credentials.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const CredentialListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CredentialListByAutomationAccountInput,
    outputSchema: CredentialListByAutomationAccountOutput,
  }));
// Input Schema
export const CredentialUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  credentialName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/credentials/{credentialName}",
  }),
);
export type CredentialUpdateInput = typeof CredentialUpdateInput.Type;

// Output Schema
export const CredentialUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type CredentialUpdateOutput = typeof CredentialUpdateOutput.Type;

// The operation
/**
 * Update a credential.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param credentialName - The parameters supplied to the Update credential operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const CredentialUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CredentialUpdateInput,
  outputSchema: CredentialUpdateOutput,
}));
// Input Schema
export const DeletedAutomationAccountsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Automation/deletedAutomationAccounts",
    }),
  );
export type DeletedAutomationAccountsListBySubscriptionInput =
  typeof DeletedAutomationAccountsListBySubscriptionInput.Type;

// Output Schema
export const DeletedAutomationAccountsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              automationAccountResourceId: Schema.optional(Schema.String),
              automationAccountId: Schema.optional(Schema.String),
              location: Schema.optional(Schema.String),
              deletionTime: Schema.optional(Schema.String),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type DeletedAutomationAccountsListBySubscriptionOutput =
  typeof DeletedAutomationAccountsListBySubscriptionOutput.Type;

// The operation
/**
 * Retrieve deleted automation account.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const deletedAutomationAccountsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeletedAutomationAccountsListBySubscriptionInput,
    outputSchema: DeletedAutomationAccountsListBySubscriptionOutput,
  }));
// Input Schema
export const DscConfigurationCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations/{configurationName}",
    }),
  );
export type DscConfigurationCreateOrUpdateInput =
  typeof DscConfigurationCreateOrUpdateInput.Type;

// Output Schema
export const DscConfigurationCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DscConfigurationCreateOrUpdateOutput =
  typeof DscConfigurationCreateOrUpdateOutput.Type;

// The operation
/**
 * Create the configuration identified by configuration name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param configurationName - The create or update parameters for configuration.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const DscConfigurationCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DscConfigurationCreateOrUpdateInput,
    outputSchema: DscConfigurationCreateOrUpdateOutput,
  }));
// Input Schema
export const DscConfigurationDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations/{configurationName}",
    }),
  );
export type DscConfigurationDeleteInput =
  typeof DscConfigurationDeleteInput.Type;

// Output Schema
export const DscConfigurationDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DscConfigurationDeleteOutput =
  typeof DscConfigurationDeleteOutput.Type;

// The operation
/**
 * Delete the dsc configuration identified by configuration name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param configurationName - The configuration name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const DscConfigurationDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DscConfigurationDeleteInput,
    outputSchema: DscConfigurationDeleteOutput,
  }),
);
// Input Schema
export const DscConfigurationGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations/{configurationName}",
    }),
  );
export type DscConfigurationGetInput = typeof DscConfigurationGetInput.Type;

// Output Schema
export const DscConfigurationGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DscConfigurationGetOutput = typeof DscConfigurationGetOutput.Type;

// The operation
/**
 * Retrieve the configuration identified by configuration name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param configurationName - The configuration name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const DscConfigurationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DscConfigurationGetInput,
  outputSchema: DscConfigurationGetOutput,
}));
// Input Schema
export const DscConfigurationGetContentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations/{configurationName}/content",
    }),
  );
export type DscConfigurationGetContentInput =
  typeof DscConfigurationGetContentInput.Type;

// Output Schema
export const DscConfigurationGetContentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type DscConfigurationGetContentOutput =
  typeof DscConfigurationGetContentOutput.Type;

// The operation
/**
 * Retrieve the configuration script identified by configuration name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param configurationName - The configuration name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const DscConfigurationGetContent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DscConfigurationGetContentInput,
    outputSchema: DscConfigurationGetContentOutput,
  }),
);
// Input Schema
export const DscConfigurationListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
    $inlinecount: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations",
    }),
  );
export type DscConfigurationListByAutomationAccountInput =
  typeof DscConfigurationListByAutomationAccountInput.Type;

// Output Schema
export const DscConfigurationListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
    totalCount: Schema.optional(Schema.Number),
  });
export type DscConfigurationListByAutomationAccountOutput =
  typeof DscConfigurationListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of configurations.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 * @param $filter - The filter to apply on the operation.
 * @param $skip - The number of rows to skip.
 * @param $top - The number of rows to take.
 * @param $inlinecount - Return total rows.
 */
export const DscConfigurationListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DscConfigurationListByAutomationAccountInput,
    outputSchema: DscConfigurationListByAutomationAccountOutput,
  }));
// Input Schema
export const DscConfigurationUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations/{configurationName}",
    }),
  );
export type DscConfigurationUpdateInput =
  typeof DscConfigurationUpdateInput.Type;

// Output Schema
export const DscConfigurationUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DscConfigurationUpdateOutput =
  typeof DscConfigurationUpdateOutput.Type;

// The operation
/**
 * Create the configuration identified by configuration name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param configurationName - The create or update parameters for configuration.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const DscConfigurationUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DscConfigurationUpdateInput,
    outputSchema: DscConfigurationUpdateOutput,
  }),
);
// Input Schema
export const DscNodeConfigurationCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    nodeConfigurationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodeConfigurations/{nodeConfigurationName}",
    }),
  );
export type DscNodeConfigurationCreateOrUpdateInput =
  typeof DscNodeConfigurationCreateOrUpdateInput.Type;

// Output Schema
export const DscNodeConfigurationCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DscNodeConfigurationCreateOrUpdateOutput =
  typeof DscNodeConfigurationCreateOrUpdateOutput.Type;

// The operation
/**
 * Create the node configuration identified by node configuration name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param nodeConfigurationName - The Dsc node configuration name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const DscNodeConfigurationCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DscNodeConfigurationCreateOrUpdateInput,
    outputSchema: DscNodeConfigurationCreateOrUpdateOutput,
  }));
// Input Schema
export const DscNodeConfigurationDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    nodeConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodeConfigurations/{nodeConfigurationName}",
    }),
  );
export type DscNodeConfigurationDeleteInput =
  typeof DscNodeConfigurationDeleteInput.Type;

// Output Schema
export const DscNodeConfigurationDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DscNodeConfigurationDeleteOutput =
  typeof DscNodeConfigurationDeleteOutput.Type;

// The operation
/**
 * Delete the Dsc node configurations by node configuration.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param nodeConfigurationName - The Dsc node configuration name.
 * @param api-version - Client Api Version.
 */
export const DscNodeConfigurationDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DscNodeConfigurationDeleteInput,
    outputSchema: DscNodeConfigurationDeleteOutput,
  }),
);
// Input Schema
export const DscNodeConfigurationGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    nodeConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodeConfigurations/{nodeConfigurationName}",
    }),
  );
export type DscNodeConfigurationGetInput =
  typeof DscNodeConfigurationGetInput.Type;

// Output Schema
export const DscNodeConfigurationGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DscNodeConfigurationGetOutput =
  typeof DscNodeConfigurationGetOutput.Type;

// The operation
/**
 * Retrieve the Dsc node configurations by node configuration.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param nodeConfigurationName - The Dsc node configuration name.
 * @param api-version - Client Api Version.
 */
export const DscNodeConfigurationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DscNodeConfigurationGetInput,
    outputSchema: DscNodeConfigurationGetOutput,
  }),
);
// Input Schema
export const DscNodeConfigurationListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
    $inlinecount: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodeConfigurations",
    }),
  );
export type DscNodeConfigurationListByAutomationAccountInput =
  typeof DscNodeConfigurationListByAutomationAccountInput.Type;

// Output Schema
export const DscNodeConfigurationListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
    totalCount: Schema.optional(Schema.Number),
  });
export type DscNodeConfigurationListByAutomationAccountOutput =
  typeof DscNodeConfigurationListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of dsc node configurations.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 * @param $filter - The filter to apply on the operation.
 * @param $skip - The number of rows to skip.
 * @param $top - The number of rows to take.
 * @param $inlinecount - Return total rows.
 */
export const DscNodeConfigurationListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DscNodeConfigurationListByAutomationAccountInput,
    outputSchema: DscNodeConfigurationListByAutomationAccountOutput,
  }));
// Input Schema
export const DscNodeDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  nodeId: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodes/{nodeId}",
  }),
);
export type DscNodeDeleteInput = typeof DscNodeDeleteInput.Type;

// Output Schema
export const DscNodeDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DscNodeDeleteOutput = typeof DscNodeDeleteOutput.Type;

// The operation
/**
 * Delete the dsc node identified by node id.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param nodeId - The node id.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const DscNodeDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DscNodeDeleteInput,
  outputSchema: DscNodeDeleteOutput,
}));
// Input Schema
export const DscNodeGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  nodeId: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodes/{nodeId}",
  }),
);
export type DscNodeGetInput = typeof DscNodeGetInput.Type;

// Output Schema
export const DscNodeGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DscNodeGetOutput = typeof DscNodeGetOutput.Type;

// The operation
/**
 * Retrieve the dsc node identified by node id.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param nodeId - The node id.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const DscNodeGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DscNodeGetInput,
  outputSchema: DscNodeGetOutput,
}));
// Input Schema
export const DscNodeListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
    $inlinecount: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodes",
    }),
  );
export type DscNodeListByAutomationAccountInput =
  typeof DscNodeListByAutomationAccountInput.Type;

// Output Schema
export const DscNodeListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
    totalCount: Schema.optional(Schema.Number),
  });
export type DscNodeListByAutomationAccountOutput =
  typeof DscNodeListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of dsc nodes.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param $filter - The filter to apply on the operation.
 * @param $skip - The number of rows to skip.
 * @param $top - The number of rows to take.
 * @param $inlinecount - Return total rows.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const DscNodeListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DscNodeListByAutomationAccountInput,
    outputSchema: DscNodeListByAutomationAccountOutput,
  }));
// Input Schema
export const DscNodeUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  nodeId: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodes/{nodeId}",
  }),
);
export type DscNodeUpdateInput = typeof DscNodeUpdateInput.Type;

// Output Schema
export const DscNodeUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DscNodeUpdateOutput = typeof DscNodeUpdateOutput.Type;

// The operation
/**
 * Update the dsc node.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param nodeId - Parameters supplied to the update dsc node.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const DscNodeUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DscNodeUpdateInput,
  outputSchema: DscNodeUpdateOutput,
}));
// Input Schema
export const FieldsListByTypeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  moduleName: Schema.String.pipe(T.PathParam()),
  typeName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}/types/{typeName}/fields",
  }),
);
export type FieldsListByTypeInput = typeof FieldsListByTypeInput.Type;

// Output Schema
export const FieldsListByTypeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  },
);
export type FieldsListByTypeOutput = typeof FieldsListByTypeOutput.Type;

// The operation
/**
 * Retrieve a list of fields of a given type identified by module name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param moduleName - The name of module.
 * @param typeName - The name of type.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const FieldsListByType = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FieldsListByTypeInput,
  outputSchema: FieldsListByTypeOutput,
}));
// Input Schema
export const HybridRunbookWorkerGroupCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}",
    }),
  );
export type HybridRunbookWorkerGroupCreateInput =
  typeof HybridRunbookWorkerGroupCreateInput.Type;

// Output Schema
export const HybridRunbookWorkerGroupCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type HybridRunbookWorkerGroupCreateOutput =
  typeof HybridRunbookWorkerGroupCreateOutput.Type;

// The operation
/**
 * Create a hybrid runbook worker group.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param hybridRunbookWorkerGroupName - The hybrid runbook worker group name
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const HybridRunbookWorkerGroupCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridRunbookWorkerGroupCreateInput,
    outputSchema: HybridRunbookWorkerGroupCreateOutput,
  }));
// Input Schema
export const HybridRunbookWorkerGroupDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}",
    }),
  );
export type HybridRunbookWorkerGroupDeleteInput =
  typeof HybridRunbookWorkerGroupDeleteInput.Type;

// Output Schema
export const HybridRunbookWorkerGroupDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HybridRunbookWorkerGroupDeleteOutput =
  typeof HybridRunbookWorkerGroupDeleteOutput.Type;

// The operation
/**
 * Delete a hybrid runbook worker group.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param hybridRunbookWorkerGroupName - The hybrid runbook worker group name
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const HybridRunbookWorkerGroupDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridRunbookWorkerGroupDeleteInput,
    outputSchema: HybridRunbookWorkerGroupDeleteOutput,
  }));
// Input Schema
export const HybridRunbookWorkerGroupGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}",
    }),
  );
export type HybridRunbookWorkerGroupGetInput =
  typeof HybridRunbookWorkerGroupGetInput.Type;

// Output Schema
export const HybridRunbookWorkerGroupGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type HybridRunbookWorkerGroupGetOutput =
  typeof HybridRunbookWorkerGroupGetOutput.Type;

// The operation
/**
 * Retrieve a hybrid runbook worker group.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param hybridRunbookWorkerGroupName - The hybrid runbook worker group name
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const HybridRunbookWorkerGroupGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridRunbookWorkerGroupGetInput,
    outputSchema: HybridRunbookWorkerGroupGetOutput,
  }),
);
// Input Schema
export const HybridRunbookWorkerGroupListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups",
    }),
  );
export type HybridRunbookWorkerGroupListByAutomationAccountInput =
  typeof HybridRunbookWorkerGroupListByAutomationAccountInput.Type;

// Output Schema
export const HybridRunbookWorkerGroupListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type HybridRunbookWorkerGroupListByAutomationAccountOutput =
  typeof HybridRunbookWorkerGroupListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of hybrid runbook worker groups.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param $filter - The filter to apply on the operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const HybridRunbookWorkerGroupListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridRunbookWorkerGroupListByAutomationAccountInput,
    outputSchema: HybridRunbookWorkerGroupListByAutomationAccountOutput,
  }));
// Input Schema
export const HybridRunbookWorkerGroupUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}",
    }),
  );
export type HybridRunbookWorkerGroupUpdateInput =
  typeof HybridRunbookWorkerGroupUpdateInput.Type;

// Output Schema
export const HybridRunbookWorkerGroupUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type HybridRunbookWorkerGroupUpdateOutput =
  typeof HybridRunbookWorkerGroupUpdateOutput.Type;

// The operation
/**
 * Update a hybrid runbook worker group.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param hybridRunbookWorkerGroupName - The hybrid runbook worker group name
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const HybridRunbookWorkerGroupUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridRunbookWorkerGroupUpdateInput,
    outputSchema: HybridRunbookWorkerGroupUpdateOutput,
  }));
// Input Schema
export const HybridRunbookWorkersCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerGroupName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers/{hybridRunbookWorkerId}",
    }),
  );
export type HybridRunbookWorkersCreateInput =
  typeof HybridRunbookWorkersCreateInput.Type;

// Output Schema
export const HybridRunbookWorkersCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type HybridRunbookWorkersCreateOutput =
  typeof HybridRunbookWorkersCreateOutput.Type;

// The operation
/**
 * Create a hybrid runbook worker.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param hybridRunbookWorkerGroupName - The hybrid runbook worker group name
 * @param hybridRunbookWorkerId - The hybrid runbook worker id
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const HybridRunbookWorkersCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridRunbookWorkersCreateInput,
    outputSchema: HybridRunbookWorkersCreateOutput,
  }),
);
// Input Schema
export const HybridRunbookWorkersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerGroupName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers/{hybridRunbookWorkerId}",
    }),
  );
export type HybridRunbookWorkersDeleteInput =
  typeof HybridRunbookWorkersDeleteInput.Type;

// Output Schema
export const HybridRunbookWorkersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HybridRunbookWorkersDeleteOutput =
  typeof HybridRunbookWorkersDeleteOutput.Type;

// The operation
/**
 * Delete a hybrid runbook worker.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param hybridRunbookWorkerGroupName - The hybrid runbook worker group name
 * @param hybridRunbookWorkerId - The hybrid runbook worker id
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const HybridRunbookWorkersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridRunbookWorkersDeleteInput,
    outputSchema: HybridRunbookWorkersDeleteOutput,
  }),
);
// Input Schema
export const HybridRunbookWorkersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerGroupName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers/{hybridRunbookWorkerId}",
    }),
  );
export type HybridRunbookWorkersGetInput =
  typeof HybridRunbookWorkersGetInput.Type;

// Output Schema
export const HybridRunbookWorkersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type HybridRunbookWorkersGetOutput =
  typeof HybridRunbookWorkersGetOutput.Type;

// The operation
/**
 * Retrieve a hybrid runbook worker.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param hybridRunbookWorkerGroupName - The hybrid runbook worker group name
 * @param hybridRunbookWorkerId - The hybrid runbook worker id
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const HybridRunbookWorkersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridRunbookWorkersGetInput,
    outputSchema: HybridRunbookWorkersGetOutput,
  }),
);
// Input Schema
export const HybridRunbookWorkersListByHybridRunbookWorkerGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers",
    }),
  );
export type HybridRunbookWorkersListByHybridRunbookWorkerGroupInput =
  typeof HybridRunbookWorkersListByHybridRunbookWorkerGroupInput.Type;

// Output Schema
export const HybridRunbookWorkersListByHybridRunbookWorkerGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type HybridRunbookWorkersListByHybridRunbookWorkerGroupOutput =
  typeof HybridRunbookWorkersListByHybridRunbookWorkerGroupOutput.Type;

// The operation
/**
 * Retrieve a list of hybrid runbook workers.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param hybridRunbookWorkerGroupName - The hybrid runbook worker group name
 * @param $filter - The filter to apply on the operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const HybridRunbookWorkersListByHybridRunbookWorkerGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridRunbookWorkersListByHybridRunbookWorkerGroupInput,
    outputSchema: HybridRunbookWorkersListByHybridRunbookWorkerGroupOutput,
  }));
// Input Schema
export const HybridRunbookWorkersMoveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerGroupName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers/{hybridRunbookWorkerId}/move",
    }),
  );
export type HybridRunbookWorkersMoveInput =
  typeof HybridRunbookWorkersMoveInput.Type;

// Output Schema
export const HybridRunbookWorkersMoveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HybridRunbookWorkersMoveOutput =
  typeof HybridRunbookWorkersMoveOutput.Type;

// The operation
/**
 * Move a hybrid worker to a different group.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param hybridRunbookWorkerGroupName - The hybrid runbook worker group name
 * @param hybridRunbookWorkerId - The hybrid runbook worker id
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const HybridRunbookWorkersMove = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridRunbookWorkersMoveInput,
    outputSchema: HybridRunbookWorkersMoveOutput,
  }),
);
// Input Schema
export const HybridRunbookWorkersPatchInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerGroupName: Schema.String.pipe(T.PathParam()),
    hybridRunbookWorkerId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}/hybridRunbookWorkers/{hybridRunbookWorkerId}",
    }),
  );
export type HybridRunbookWorkersPatchInput =
  typeof HybridRunbookWorkersPatchInput.Type;

// Output Schema
export const HybridRunbookWorkersPatchOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type HybridRunbookWorkersPatchOutput =
  typeof HybridRunbookWorkersPatchOutput.Type;

// The operation
/**
 * Update a hybrid runbook worker.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param hybridRunbookWorkerGroupName - The hybrid runbook worker group name
 * @param hybridRunbookWorkerId - The hybrid runbook worker id
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const HybridRunbookWorkersPatch = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridRunbookWorkersPatchInput,
    outputSchema: HybridRunbookWorkersPatchOutput,
  }),
);
// Input Schema
export const JobCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}",
  }),
);
export type JobCreateInput = typeof JobCreateInput.Type;

// Output Schema
export const JobCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobCreateOutput = typeof JobCreateOutput.Type;

// The operation
/**
 * Create a job of the runbook.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param jobName - The job name.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const JobCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobCreateInput,
  outputSchema: JobCreateOutput,
}));
// Input Schema
export const JobGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}",
  }),
);
export type JobGetInput = typeof JobGetInput.Type;

// Output Schema
export const JobGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobGetOutput = typeof JobGetOutput.Type;

// The operation
/**
 * Retrieve the job identified by job name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param jobName - The job name.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const JobGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobGetInput,
  outputSchema: JobGetOutput,
}));
// Input Schema
export const JobGetRunbookContentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/runbookContent",
    }),
  );
export type JobGetRunbookContentInput = typeof JobGetRunbookContentInput.Type;

// Output Schema
export const JobGetRunbookContentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String;
export type JobGetRunbookContentOutput = typeof JobGetRunbookContentOutput.Type;

// The operation
/**
 * Retrieve the runbook content of the job identified by job name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param jobName - The job name.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const JobGetRunbookContent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobGetRunbookContentInput,
    outputSchema: JobGetRunbookContentOutput,
  }),
);
// Input Schema
export const JobListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs",
    }),
  );
export type JobListByAutomationAccountInput =
  typeof JobListByAutomationAccountInput.Type;

// Output Schema
export const JobListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobListByAutomationAccountOutput =
  typeof JobListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of jobs.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param $filter - The filter to apply on the operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const JobListByAutomationAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobListByAutomationAccountInput,
    outputSchema: JobListByAutomationAccountOutput,
  }),
);
// Input Schema
export const JobResumeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/resume",
  }),
);
export type JobResumeInput = typeof JobResumeInput.Type;

// Output Schema
export const JobResumeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobResumeOutput = typeof JobResumeOutput.Type;

// The operation
/**
 * Resume the job identified by jobName.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param jobName - The job name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const JobResume = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobResumeInput,
  outputSchema: JobResumeOutput,
}));
// Input Schema
export const JobScheduleCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    jobScheduleId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobSchedules/{jobScheduleId}",
  }),
);
export type JobScheduleCreateInput = typeof JobScheduleCreateInput.Type;

// Output Schema
export const JobScheduleCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        jobScheduleId: Schema.optional(Schema.String),
        schedule: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
          }),
        ),
        runbook: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
          }),
        ),
        runOn: Schema.optional(Schema.String),
        parameters: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
      }),
    ),
  });
export type JobScheduleCreateOutput = typeof JobScheduleCreateOutput.Type;

// The operation
/**
 * Create a job schedule.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param jobScheduleId - The job schedule name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const JobScheduleCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobScheduleCreateInput,
  outputSchema: JobScheduleCreateOutput,
}));
// Input Schema
export const JobScheduleDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    jobScheduleId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobSchedules/{jobScheduleId}",
  }),
);
export type JobScheduleDeleteInput = typeof JobScheduleDeleteInput.Type;

// Output Schema
export const JobScheduleDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobScheduleDeleteOutput = typeof JobScheduleDeleteOutput.Type;

// The operation
/**
 * Delete the job schedule identified by job schedule name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param jobScheduleId - The job schedule name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const JobScheduleDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobScheduleDeleteInput,
  outputSchema: JobScheduleDeleteOutput,
}));
// Input Schema
export const JobScheduleGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  jobScheduleId: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobSchedules/{jobScheduleId}",
  }),
);
export type JobScheduleGetInput = typeof JobScheduleGetInput.Type;

// Output Schema
export const JobScheduleGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      jobScheduleId: Schema.optional(Schema.String),
      schedule: Schema.optional(
        Schema.Struct({
          name: Schema.optional(Schema.String),
        }),
      ),
      runbook: Schema.optional(
        Schema.Struct({
          name: Schema.optional(Schema.String),
        }),
      ),
      runOn: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ),
});
export type JobScheduleGetOutput = typeof JobScheduleGetOutput.Type;

// The operation
/**
 * Retrieve the job schedule identified by job schedule name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param jobScheduleId - The job schedule name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const JobScheduleGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobScheduleGetInput,
  outputSchema: JobScheduleGetOutput,
}));
// Input Schema
export const JobScheduleListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobSchedules",
    }),
  );
export type JobScheduleListByAutomationAccountInput =
  typeof JobScheduleListByAutomationAccountInput.Type;

// Output Schema
export const JobScheduleListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              jobScheduleId: Schema.optional(Schema.String),
              schedule: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                }),
              ),
              runbook: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                }),
              ),
              runOn: Schema.optional(Schema.String),
              parameters: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type JobScheduleListByAutomationAccountOutput =
  typeof JobScheduleListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of job schedules.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param $filter - The filter to apply on the operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const JobScheduleListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobScheduleListByAutomationAccountInput,
    outputSchema: JobScheduleListByAutomationAccountOutput,
  }));
// Input Schema
export const JobStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/stop",
  }),
);
export type JobStopInput = typeof JobStopInput.Type;

// Output Schema
export const JobStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobStopOutput = typeof JobStopOutput.Type;

// The operation
/**
 * Stop the job identified by jobName.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param jobName - The job name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const JobStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobStopInput,
  outputSchema: JobStopOutput,
}));
// Input Schema
export const JobStreamGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  jobStreamId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/streams/{jobStreamId}",
  }),
);
export type JobStreamGetInput = typeof JobStreamGetInput.Type;

// Output Schema
export const JobStreamGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      jobStreamId: Schema.optional(Schema.String),
      time: Schema.optional(Schema.String),
      streamType: Schema.optional(
        Schema.Literals([
          "Progress",
          "Output",
          "Warning",
          "Error",
          "Debug",
          "Verbose",
          "Any",
        ]),
      ),
      streamText: Schema.optional(Schema.String),
      summary: Schema.optional(Schema.NullOr(Schema.String)),
      value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ),
});
export type JobStreamGetOutput = typeof JobStreamGetOutput.Type;

// The operation
/**
 * Retrieve the job stream identified by job stream id.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param jobName - The job name.
 * @param jobStreamId - The job stream id.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const JobStreamGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobStreamGetInput,
  outputSchema: JobStreamGetOutput,
}));
// Input Schema
export const JobStreamListByJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/streams",
    }),
  );
export type JobStreamListByJobInput = typeof JobStreamListByJobInput.Type;

// Output Schema
export const JobStreamListByJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              jobStreamId: Schema.optional(Schema.String),
              time: Schema.optional(Schema.String),
              streamType: Schema.optional(
                Schema.Literals([
                  "Progress",
                  "Output",
                  "Warning",
                  "Error",
                  "Debug",
                  "Verbose",
                  "Any",
                ]),
              ),
              streamText: Schema.optional(Schema.String),
              summary: Schema.optional(Schema.NullOr(Schema.String)),
              value: Schema.optional(
                Schema.Record(Schema.String, Schema.Unknown),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type JobStreamListByJobOutput = typeof JobStreamListByJobOutput.Type;

// The operation
/**
 * Retrieve a list of jobs streams identified by job name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param jobName - The job name.
 * @param $filter - The filter to apply on the operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const JobStreamListByJob = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobStreamListByJobInput,
  outputSchema: JobStreamListByJobOutput,
}));
// Input Schema
export const JobSuspendInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/suspend",
  }),
);
export type JobSuspendInput = typeof JobSuspendInput.Type;

// Output Schema
export const JobSuspendOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobSuspendOutput = typeof JobSuspendOutput.Type;

// The operation
/**
 * Suspend the job identified by job name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param jobName - The job name.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const JobSuspend = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobSuspendInput,
  outputSchema: JobSuspendOutput,
}));
// Input Schema
export const KeysListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/listKeys",
    }),
  );
export type KeysListByAutomationAccountInput =
  typeof KeysListByAutomationAccountInput.Type;

// Output Schema
export const KeysListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keys: Schema.optional(
      Schema.Array(
        Schema.Struct({
          KeyName: Schema.optional(Schema.Literals(["Primary", "Secondary"])),
          Permissions: Schema.optional(Schema.Literals(["Read", "Full"])),
          Value: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type KeysListByAutomationAccountOutput =
  typeof KeysListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve the automation keys for an account.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const KeysListByAutomationAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KeysListByAutomationAccountInput,
    outputSchema: KeysListByAutomationAccountOutput,
  }),
);
// Input Schema
export const LinkedWorkspaceGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/linkedWorkspace",
    }),
  );
export type LinkedWorkspaceGetInput = typeof LinkedWorkspaceGetInput.Type;

// Output Schema
export const LinkedWorkspaceGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
  });
export type LinkedWorkspaceGetOutput = typeof LinkedWorkspaceGetOutput.Type;

// The operation
/**
 * Retrieve the linked workspace for the account id.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const LinkedWorkspaceGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LinkedWorkspaceGetInput,
  outputSchema: LinkedWorkspaceGetOutput,
}));
// Input Schema
export const ModuleCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    moduleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}",
    }),
  );
export type ModuleCreateOrUpdateInput = typeof ModuleCreateOrUpdateInput.Type;

// Output Schema
export const ModuleCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ModuleCreateOrUpdateOutput = typeof ModuleCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update the module identified by module name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param moduleName - The name of module.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ModuleCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ModuleCreateOrUpdateInput,
    outputSchema: ModuleCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ModuleDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  moduleName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}",
  }),
);
export type ModuleDeleteInput = typeof ModuleDeleteInput.Type;

// Output Schema
export const ModuleDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ModuleDeleteOutput = typeof ModuleDeleteOutput.Type;

// The operation
/**
 * Delete the module by name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param moduleName - The module name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ModuleDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ModuleDeleteInput,
  outputSchema: ModuleDeleteOutput,
}));
// Input Schema
export const ModuleGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  moduleName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}",
  }),
);
export type ModuleGetInput = typeof ModuleGetInput.Type;

// Output Schema
export const ModuleGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ModuleGetOutput = typeof ModuleGetOutput.Type;

// The operation
/**
 * Retrieve the module identified by module name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param moduleName - The module name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ModuleGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ModuleGetInput,
  outputSchema: ModuleGetOutput,
}));
// Input Schema
export const ModuleListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules",
    }),
  );
export type ModuleListByAutomationAccountInput =
  typeof ModuleListByAutomationAccountInput.Type;

// Output Schema
export const ModuleListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ModuleListByAutomationAccountOutput =
  typeof ModuleListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of modules.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ModuleListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ModuleListByAutomationAccountInput,
    outputSchema: ModuleListByAutomationAccountOutput,
  }));
// Input Schema
export const ModuleUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  moduleName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}",
  }),
);
export type ModuleUpdateInput = typeof ModuleUpdateInput.Type;

// Output Schema
export const ModuleUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ModuleUpdateOutput = typeof ModuleUpdateOutput.Type;

// The operation
/**
 * Update the module identified by module name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param moduleName - The name of module.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ModuleUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ModuleUpdateInput,
  outputSchema: ModuleUpdateOutput,
}));
// Input Schema
export const NodeCountInformationGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodecounts/{countType}",
    }),
  );
export type NodeCountInformationGetInput =
  typeof NodeCountInformationGetInput.Type;

// Output Schema
export const NodeCountInformationGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              count: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
  });
export type NodeCountInformationGetOutput =
  typeof NodeCountInformationGetOutput.Type;

// The operation
/**
 * Retrieve counts for Dsc Nodes.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const NodeCountInformationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NodeCountInformationGetInput,
    outputSchema: NodeCountInformationGetOutput,
  }),
);
// Input Schema
export const NodeReportsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  nodeId: Schema.String.pipe(T.PathParam()),
  reportId: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodes/{nodeId}/reports/{reportId}",
  }),
);
export type NodeReportsGetInput = typeof NodeReportsGetInput.Type;

// Output Schema
export const NodeReportsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  endTime: Schema.optional(Schema.NullOr(Schema.String)),
  lastModifiedTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.NullOr(Schema.String)),
  type: Schema.optional(Schema.String),
  reportId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  refreshMode: Schema.optional(Schema.String),
  rebootRequested: Schema.optional(Schema.String),
  reportFormatVersion: Schema.optional(Schema.String),
  configurationVersion: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  errors: Schema.optional(
    Schema.Array(
      Schema.Struct({
        errorSource: Schema.optional(Schema.String),
        resourceId: Schema.optional(Schema.String),
        errorCode: Schema.optional(Schema.String),
        errorMessage: Schema.optional(Schema.String),
        locale: Schema.optional(Schema.String),
        errorDetails: Schema.optional(Schema.String),
      }),
    ),
  ),
  resources: Schema.optional(
    Schema.Array(
      Schema.Struct({
        resourceId: Schema.optional(Schema.String),
        sourceInfo: Schema.optional(Schema.String),
        dependsOn: Schema.optional(
          Schema.Array(
            Schema.Struct({
              resourceId: Schema.optional(Schema.String),
            }),
          ),
        ),
        moduleName: Schema.optional(Schema.String),
        moduleVersion: Schema.optional(Schema.String),
        resourceName: Schema.optional(Schema.String),
        error: Schema.optional(Schema.String),
        status: Schema.optional(Schema.String),
        durationInSeconds: Schema.optional(Schema.Number),
        startDate: Schema.optional(Schema.String),
      }),
    ),
  ),
  metaConfiguration: Schema.optional(
    Schema.Struct({
      configurationModeFrequencyMins: Schema.optional(Schema.Number),
      rebootNodeIfNeeded: Schema.optional(Schema.Boolean),
      configurationMode: Schema.optional(Schema.String),
      actionAfterReboot: Schema.optional(Schema.String),
      certificateId: Schema.optional(Schema.String),
      refreshFrequencyMins: Schema.optional(Schema.Number),
      allowModuleOverwrite: Schema.optional(Schema.Boolean),
    }),
  ),
  hostName: Schema.optional(Schema.String),
  iPV4Addresses: Schema.optional(Schema.Array(Schema.String)),
  iPV6Addresses: Schema.optional(Schema.Array(Schema.String)),
  numberOfResources: Schema.optional(Schema.Number),
  rawErrors: Schema.optional(Schema.String),
});
export type NodeReportsGetOutput = typeof NodeReportsGetOutput.Type;

// The operation
/**
 * Retrieve the Dsc node report data by node id and report id.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param nodeId - The Dsc node id.
 * @param reportId - The report id.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const NodeReportsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NodeReportsGetInput,
  outputSchema: NodeReportsGetOutput,
}));
// Input Schema
export const NodeReportsGetContentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    nodeId: Schema.String.pipe(T.PathParam()),
    reportId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodes/{nodeId}/reports/{reportId}/content",
    }),
  );
export type NodeReportsGetContentInput = typeof NodeReportsGetContentInput.Type;

// Output Schema
export const NodeReportsGetContentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type NodeReportsGetContentOutput =
  typeof NodeReportsGetContentOutput.Type;

// The operation
/**
 * Retrieve the Dsc node reports by node id and report id.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param nodeId - The Dsc node id.
 * @param reportId - The report id.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const NodeReportsGetContent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NodeReportsGetContentInput,
    outputSchema: NodeReportsGetContentOutput,
  }),
);
// Input Schema
export const NodeReportsListByNodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    nodeId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodes/{nodeId}/reports",
    }),
  );
export type NodeReportsListByNodeInput = typeof NodeReportsListByNodeInput.Type;

// Output Schema
export const NodeReportsListByNodeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          endTime: Schema.optional(Schema.NullOr(Schema.String)),
          lastModifiedTime: Schema.optional(Schema.String),
          startTime: Schema.optional(Schema.NullOr(Schema.String)),
          type: Schema.optional(Schema.String),
          reportId: Schema.optional(Schema.String),
          status: Schema.optional(Schema.String),
          refreshMode: Schema.optional(Schema.String),
          rebootRequested: Schema.optional(Schema.String),
          reportFormatVersion: Schema.optional(Schema.String),
          configurationVersion: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          errors: Schema.optional(
            Schema.Array(
              Schema.Struct({
                errorSource: Schema.optional(Schema.String),
                resourceId: Schema.optional(Schema.String),
                errorCode: Schema.optional(Schema.String),
                errorMessage: Schema.optional(Schema.String),
                locale: Schema.optional(Schema.String),
                errorDetails: Schema.optional(Schema.String),
              }),
            ),
          ),
          resources: Schema.optional(
            Schema.Array(
              Schema.Struct({
                resourceId: Schema.optional(Schema.String),
                sourceInfo: Schema.optional(Schema.String),
                dependsOn: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      resourceId: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                moduleName: Schema.optional(Schema.String),
                moduleVersion: Schema.optional(Schema.String),
                resourceName: Schema.optional(Schema.String),
                error: Schema.optional(Schema.String),
                status: Schema.optional(Schema.String),
                durationInSeconds: Schema.optional(Schema.Number),
                startDate: Schema.optional(Schema.String),
              }),
            ),
          ),
          metaConfiguration: Schema.optional(
            Schema.Struct({
              configurationModeFrequencyMins: Schema.optional(Schema.Number),
              rebootNodeIfNeeded: Schema.optional(Schema.Boolean),
              configurationMode: Schema.optional(Schema.String),
              actionAfterReboot: Schema.optional(Schema.String),
              certificateId: Schema.optional(Schema.String),
              refreshFrequencyMins: Schema.optional(Schema.Number),
              allowModuleOverwrite: Schema.optional(Schema.Boolean),
            }),
          ),
          hostName: Schema.optional(Schema.String),
          iPV4Addresses: Schema.optional(Schema.Array(Schema.String)),
          iPV6Addresses: Schema.optional(Schema.Array(Schema.String)),
          numberOfResources: Schema.optional(Schema.Number),
          rawErrors: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NodeReportsListByNodeOutput =
  typeof NodeReportsListByNodeOutput.Type;

// The operation
/**
 * Retrieve the Dsc node report list by node id.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param nodeId - The parameters supplied to the list operation.
 * @param $filter - The filter to apply on the operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const NodeReportsListByNode = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NodeReportsListByNodeInput,
    outputSchema: NodeReportsListByNodeOutput,
  }),
);
// Input Schema
export const ObjectDataTypesListFieldsByModuleAndTypeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    moduleName: Schema.String.pipe(T.PathParam()),
    typeName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}/objectDataTypes/{typeName}/fields",
    }),
  );
export type ObjectDataTypesListFieldsByModuleAndTypeInput =
  typeof ObjectDataTypesListFieldsByModuleAndTypeInput.Type;

// Output Schema
export const ObjectDataTypesListFieldsByModuleAndTypeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ObjectDataTypesListFieldsByModuleAndTypeOutput =
  typeof ObjectDataTypesListFieldsByModuleAndTypeOutput.Type;

// The operation
/**
 * Retrieve a list of fields of a given type identified by module name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param moduleName - The name of module.
 * @param typeName - The name of type.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ObjectDataTypesListFieldsByModuleAndType =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ObjectDataTypesListFieldsByModuleAndTypeInput,
    outputSchema: ObjectDataTypesListFieldsByModuleAndTypeOutput,
  }));
// Input Schema
export const ObjectDataTypesListFieldsByTypeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    typeName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/objectDataTypes/{typeName}/fields",
    }),
  );
export type ObjectDataTypesListFieldsByTypeInput =
  typeof ObjectDataTypesListFieldsByTypeInput.Type;

// Output Schema
export const ObjectDataTypesListFieldsByTypeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ObjectDataTypesListFieldsByTypeOutput =
  typeof ObjectDataTypesListFieldsByTypeOutput.Type;

// The operation
/**
 * Retrieve a list of fields of a given type across all accessible modules.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param typeName - The name of type.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ObjectDataTypesListFieldsByType =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ObjectDataTypesListFieldsByTypeInput,
    outputSchema: ObjectDataTypesListFieldsByTypeOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Automation/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
          }),
        ),
        origin: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            serviceSpecification: Schema.optional(
              Schema.Struct({
                metricSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      displayDescription: Schema.optional(Schema.String),
                      unit: Schema.optional(Schema.String),
                      aggregationType: Schema.optional(Schema.String),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                    }),
                  ),
                ),
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      blobDuration: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
          }),
        ),
      }),
    ),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Automation REST API operations.
 *
 * @param api-version - Client Api Version.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PackageCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runtimeEnvironmentName: Schema.String.pipe(T.PathParam()),
    packageName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}/packages/{packageName}",
    }),
  );
export type PackageCreateOrUpdateInput = typeof PackageCreateOrUpdateInput.Type;

// Output Schema
export const PackageCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PackageCreateOrUpdateOutput =
  typeof PackageCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the package identified by package name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runtimeEnvironmentName - The name of the Runtime Environment.
 * @param packageName - The name of Package.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const PackageCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PackageCreateOrUpdateInput,
    outputSchema: PackageCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PackageDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runtimeEnvironmentName: Schema.String.pipe(T.PathParam()),
  packageName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}/packages/{packageName}",
  }),
);
export type PackageDeleteInput = typeof PackageDeleteInput.Type;

// Output Schema
export const PackageDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PackageDeleteOutput = typeof PackageDeleteOutput.Type;

// The operation
/**
 * Delete the package by name.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param automationAccountName - The name of the automation account.
 * @param runtimeEnvironmentName - The name of the Runtime Environment.
 * @param packageName - The Package name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const PackageDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PackageDeleteInput,
  outputSchema: PackageDeleteOutput,
}));
// Input Schema
export const PackageGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runtimeEnvironmentName: Schema.String.pipe(T.PathParam()),
  packageName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}/packages/{packageName}",
  }),
);
export type PackageGetInput = typeof PackageGetInput.Type;

// Output Schema
export const PackageGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PackageGetOutput = typeof PackageGetOutput.Type;

// The operation
/**
 * Retrieve the Package identified by Package name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runtimeEnvironmentName - The name of the Runtime Environment.
 * @param packageName - The Package name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const PackageGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PackageGetInput,
  outputSchema: PackageGetOutput,
}));
// Input Schema
export const PackageListByRuntimeEnvironmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runtimeEnvironmentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}/packages",
    }),
  );
export type PackageListByRuntimeEnvironmentInput =
  typeof PackageListByRuntimeEnvironmentInput.Type;

// Output Schema
export const PackageListByRuntimeEnvironmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PackageListByRuntimeEnvironmentOutput =
  typeof PackageListByRuntimeEnvironmentOutput.Type;

// The operation
/**
 * Retrieve the a list of Packages
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runtimeEnvironmentName - The name of the Runtime Environment.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const PackageListByRuntimeEnvironment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PackageListByRuntimeEnvironmentInput,
    outputSchema: PackageListByRuntimeEnvironmentOutput,
  }));
// Input Schema
export const PackageUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runtimeEnvironmentName: Schema.String.pipe(T.PathParam()),
  packageName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}/packages/{packageName}",
  }),
);
export type PackageUpdateInput = typeof PackageUpdateInput.Type;

// Output Schema
export const PackageUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PackageUpdateOutput = typeof PackageUpdateOutput.Type;

// The operation
/**
 * Update the Package identified by Package name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runtimeEnvironmentName - The name of the Runtime Environment.
 * @param packageName - The name of Package.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const PackageUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PackageUpdateInput,
  outputSchema: PackageUpdateOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsDeleteInput =
  typeof PrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsDeleteOutput =
  typeof PrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint connection with a given name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param api-version - Client Api Version.
 * @param automationAccountName - The name of the automation account.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets a private endpoint connection.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param api-version - Client Api Version.
 * @param automationAccountName - The name of the automation account.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByAutomationAccountInput =
  typeof PrivateEndpointConnectionsListByAutomationAccountInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type PrivateEndpointConnectionsListByAutomationAccountOutput =
  typeof PrivateEndpointConnectionsListByAutomationAccountOutput.Type;

// The operation
/**
 * List all private endpoint connections on a Automation account.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param api-version - Client Api Version.
 * @param automationAccountName - The name of the automation account.
 */
export const PrivateEndpointConnectionsListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByAutomationAccountInput,
    outputSchema: PrivateEndpointConnectionsListByAutomationAccountOutput,
  }));
// Input Schema
export const PrivateLinkResourcesAutomationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesAutomationInput =
  typeof PrivateLinkResourcesAutomationInput.Type;

// Output Schema
export const PrivateLinkResourcesAutomationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type PrivateLinkResourcesAutomationOutput =
  typeof PrivateLinkResourcesAutomationOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for Automation account.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param api-version - Client Api Version.
 * @param automationAccountName - The name of the automation account.
 */
export const PrivateLinkResourcesAutomation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesAutomationInput,
    outputSchema: PrivateLinkResourcesAutomationOutput,
  }));
// Input Schema
export const Python2PackageCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    packageName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/python2Packages/{packageName}",
    }),
  );
export type Python2PackageCreateOrUpdateInput =
  typeof Python2PackageCreateOrUpdateInput.Type;

// Output Schema
export const Python2PackageCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Python2PackageCreateOrUpdateOutput =
  typeof Python2PackageCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update the python 2 package identified by package name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param packageName - The name of python package.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const Python2PackageCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Python2PackageCreateOrUpdateInput,
    outputSchema: Python2PackageCreateOrUpdateOutput,
  }));
// Input Schema
export const Python2PackageDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    packageName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/python2Packages/{packageName}",
    }),
  );
export type Python2PackageDeleteInput = typeof Python2PackageDeleteInput.Type;

// Output Schema
export const Python2PackageDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Python2PackageDeleteOutput = typeof Python2PackageDeleteOutput.Type;

// The operation
/**
 * Delete the python 2 package by name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param packageName - The python package name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const Python2PackageDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Python2PackageDeleteInput,
    outputSchema: Python2PackageDeleteOutput,
  }),
);
// Input Schema
export const Python2PackageGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    packageName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/python2Packages/{packageName}",
  }),
);
export type Python2PackageGetInput = typeof Python2PackageGetInput.Type;

// Output Schema
export const Python2PackageGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Python2PackageGetOutput = typeof Python2PackageGetOutput.Type;

// The operation
/**
 * Retrieve the python 2 package identified by package name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param packageName - The python package name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const Python2PackageGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Python2PackageGetInput,
  outputSchema: Python2PackageGetOutput,
}));
// Input Schema
export const Python2PackageListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/python2Packages",
    }),
  );
export type Python2PackageListByAutomationAccountInput =
  typeof Python2PackageListByAutomationAccountInput.Type;

// Output Schema
export const Python2PackageListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Python2PackageListByAutomationAccountOutput =
  typeof Python2PackageListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of python 2 packages.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const Python2PackageListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Python2PackageListByAutomationAccountInput,
    outputSchema: Python2PackageListByAutomationAccountOutput,
  }));
// Input Schema
export const Python2PackageUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    packageName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/python2Packages/{packageName}",
    }),
  );
export type Python2PackageUpdateInput = typeof Python2PackageUpdateInput.Type;

// Output Schema
export const Python2PackageUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Python2PackageUpdateOutput = typeof Python2PackageUpdateOutput.Type;

// The operation
/**
 * Update the python 2 package identified by package name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param packageName - The name of python package.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const Python2PackageUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Python2PackageUpdateInput,
    outputSchema: Python2PackageUpdateOutput,
  }),
);
// Input Schema
export const Python3PackageCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    packageName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/python3Packages/{packageName}",
    }),
  );
export type Python3PackageCreateOrUpdateInput =
  typeof Python3PackageCreateOrUpdateInput.Type;

// Output Schema
export const Python3PackageCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Python3PackageCreateOrUpdateOutput =
  typeof Python3PackageCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update the python 3 package identified by package name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param packageName - The name of python package.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const Python3PackageCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Python3PackageCreateOrUpdateInput,
    outputSchema: Python3PackageCreateOrUpdateOutput,
  }));
// Input Schema
export const Python3PackageDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    packageName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/python3Packages/{packageName}",
    }),
  );
export type Python3PackageDeleteInput = typeof Python3PackageDeleteInput.Type;

// Output Schema
export const Python3PackageDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type Python3PackageDeleteOutput = typeof Python3PackageDeleteOutput.Type;

// The operation
/**
 * Delete the python 3 package by name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param packageName - The python package name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const Python3PackageDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Python3PackageDeleteInput,
    outputSchema: Python3PackageDeleteOutput,
  }),
);
// Input Schema
export const Python3PackageGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    packageName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/python3Packages/{packageName}",
  }),
);
export type Python3PackageGetInput = typeof Python3PackageGetInput.Type;

// Output Schema
export const Python3PackageGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Python3PackageGetOutput = typeof Python3PackageGetOutput.Type;

// The operation
/**
 * Retrieve the python 3 package identified by package name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param packageName - The python package name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const Python3PackageGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: Python3PackageGetInput,
  outputSchema: Python3PackageGetOutput,
}));
// Input Schema
export const Python3PackageListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/python3Packages",
    }),
  );
export type Python3PackageListByAutomationAccountInput =
  typeof Python3PackageListByAutomationAccountInput.Type;

// Output Schema
export const Python3PackageListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type Python3PackageListByAutomationAccountOutput =
  typeof Python3PackageListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of python 3 packages.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const Python3PackageListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: Python3PackageListByAutomationAccountInput,
    outputSchema: Python3PackageListByAutomationAccountOutput,
  }));
// Input Schema
export const Python3PackageUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    packageName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/python3Packages/{packageName}",
    }),
  );
export type Python3PackageUpdateInput = typeof Python3PackageUpdateInput.Type;

// Output Schema
export const Python3PackageUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type Python3PackageUpdateOutput = typeof Python3PackageUpdateOutput.Type;

// The operation
/**
 * Update the python 3 package identified by package name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param packageName - The name of python package.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const Python3PackageUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: Python3PackageUpdateInput,
    outputSchema: Python3PackageUpdateOutput,
  }),
);
// Input Schema
export const RunbookCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runbookName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}",
    }),
  );
export type RunbookCreateOrUpdateInput = typeof RunbookCreateOrUpdateInput.Type;

// Output Schema
export const RunbookCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RunbookCreateOrUpdateOutput =
  typeof RunbookCreateOrUpdateOutput.Type;

// The operation
/**
 * Create the runbook identified by runbook name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const RunbookCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RunbookCreateOrUpdateInput,
    outputSchema: RunbookCreateOrUpdateOutput,
  }),
);
// Input Schema
export const RunbookDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runbookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}",
  }),
);
export type RunbookDeleteInput = typeof RunbookDeleteInput.Type;

// Output Schema
export const RunbookDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RunbookDeleteOutput = typeof RunbookDeleteOutput.Type;

// The operation
/**
 * Delete the runbook by name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const RunbookDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RunbookDeleteInput,
  outputSchema: RunbookDeleteOutput,
}));
// Input Schema
export const RunbookDraftGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runbookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft",
  }),
);
export type RunbookDraftGetInput = typeof RunbookDraftGetInput.Type;

// Output Schema
export const RunbookDraftGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  inEdit: Schema.optional(Schema.Boolean),
  draftContentLink: Schema.optional(
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      contentHash: Schema.optional(
        Schema.Struct({
          algorithm: Schema.String,
          value: Schema.String,
        }),
      ),
      version: Schema.optional(Schema.String),
    }),
  ),
  creationTime: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  parameters: Schema.optional(
    Schema.Record(
      Schema.String,
      Schema.Struct({
        type: Schema.optional(Schema.String),
        isMandatory: Schema.optional(Schema.Boolean),
        position: Schema.optional(Schema.Number),
        defaultValue: Schema.optional(Schema.String),
      }),
    ),
  ),
  outputTypes: Schema.optional(Schema.Array(Schema.String)),
});
export type RunbookDraftGetOutput = typeof RunbookDraftGetOutput.Type;

// The operation
/**
 * Retrieve the runbook draft identified by runbook name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const RunbookDraftGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RunbookDraftGetInput,
  outputSchema: RunbookDraftGetOutput,
}));
// Input Schema
export const RunbookDraftGetContentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runbookName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/content",
    }),
  );
export type RunbookDraftGetContentInput =
  typeof RunbookDraftGetContentInput.Type;

// Output Schema
export const RunbookDraftGetContentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type RunbookDraftGetContentOutput =
  typeof RunbookDraftGetContentOutput.Type;

// The operation
/**
 * Retrieve the content of runbook draft identified by runbook name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const RunbookDraftGetContent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RunbookDraftGetContentInput,
    outputSchema: RunbookDraftGetContentOutput,
  }),
);
// Input Schema
export const RunbookDraftReplaceContentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runbookName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/content",
    }),
  );
export type RunbookDraftReplaceContentInput =
  typeof RunbookDraftReplaceContentInput.Type;

// Output Schema
export const RunbookDraftReplaceContentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type RunbookDraftReplaceContentOutput =
  typeof RunbookDraftReplaceContentOutput.Type;

// The operation
/**
 * Replaces the runbook draft content.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const RunbookDraftReplaceContent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RunbookDraftReplaceContentInput,
    outputSchema: RunbookDraftReplaceContentOutput,
  }),
);
// Input Schema
export const RunbookDraftUndoEditInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runbookName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/undoEdit",
    }),
  );
export type RunbookDraftUndoEditInput = typeof RunbookDraftUndoEditInput.Type;

// Output Schema
export const RunbookDraftUndoEditOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    statusCode: Schema.optional(
      Schema.Literals([
        "Continue",
        "SwitchingProtocols",
        "OK",
        "Created",
        "Accepted",
        "NonAuthoritativeInformation",
        "NoContent",
        "ResetContent",
        "PartialContent",
        "MultipleChoices",
        "Ambiguous",
        "MovedPermanently",
        "Moved",
        "Found",
        "Redirect",
        "SeeOther",
        "RedirectMethod",
        "NotModified",
        "UseProxy",
        "Unused",
        "TemporaryRedirect",
        "RedirectKeepVerb",
        "BadRequest",
        "Unauthorized",
        "PaymentRequired",
        "Forbidden",
        "NotFound",
        "MethodNotAllowed",
        "NotAcceptable",
        "ProxyAuthenticationRequired",
        "RequestTimeout",
        "Conflict",
        "Gone",
        "LengthRequired",
        "PreconditionFailed",
        "RequestEntityTooLarge",
        "RequestUriTooLong",
        "UnsupportedMediaType",
        "RequestedRangeNotSatisfiable",
        "ExpectationFailed",
        "UpgradeRequired",
        "InternalServerError",
        "NotImplemented",
        "BadGateway",
        "ServiceUnavailable",
        "GatewayTimeout",
        "HttpVersionNotSupported",
      ]),
    ),
    requestId: Schema.optional(Schema.String),
  });
export type RunbookDraftUndoEditOutput = typeof RunbookDraftUndoEditOutput.Type;

// The operation
/**
 * Undo draft edit to last known published state identified by runbook name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const RunbookDraftUndoEdit = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RunbookDraftUndoEditInput,
    outputSchema: RunbookDraftUndoEditOutput,
  }),
);
// Input Schema
export const RunbookGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runbookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}",
  }),
);
export type RunbookGetInput = typeof RunbookGetInput.Type;

// Output Schema
export const RunbookGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type RunbookGetOutput = typeof RunbookGetOutput.Type;

// The operation
/**
 * Retrieve the runbook identified by runbook name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const RunbookGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RunbookGetInput,
  outputSchema: RunbookGetOutput,
}));
// Input Schema
export const RunbookGetContentInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runbookName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/content",
  }),
);
export type RunbookGetContentInput = typeof RunbookGetContentInput.Type;

// Output Schema
export const RunbookGetContentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type RunbookGetContentOutput = typeof RunbookGetContentOutput.Type;

// The operation
/**
 * Retrieve the content of runbook identified by runbook name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const RunbookGetContent = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RunbookGetContentInput,
  outputSchema: RunbookGetContentOutput,
}));
// Input Schema
export const RunbookListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks",
    }),
  );
export type RunbookListByAutomationAccountInput =
  typeof RunbookListByAutomationAccountInput.Type;

// Output Schema
export const RunbookListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RunbookListByAutomationAccountOutput =
  typeof RunbookListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of runbooks.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param api-version - Client Api Version.
 */
export const RunbookListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RunbookListByAutomationAccountInput,
    outputSchema: RunbookListByAutomationAccountOutput,
  }));
// Input Schema
export const RunbookPublishInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runbookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/publish",
  }),
);
export type RunbookPublishInput = typeof RunbookPublishInput.Type;

// Output Schema
export const RunbookPublishOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RunbookPublishOutput = typeof RunbookPublishOutput.Type;

// The operation
/**
 * Publish runbook draft.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The parameters supplied to the publish runbook operation.
 * @param api-version - Client Api Version.
 */
export const RunbookPublish = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RunbookPublishInput,
  outputSchema: RunbookPublishOutput,
}));
// Input Schema
export const RunbookUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runbookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}",
  }),
);
export type RunbookUpdateInput = typeof RunbookUpdateInput.Type;

// Output Schema
export const RunbookUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type RunbookUpdateOutput = typeof RunbookUpdateOutput.Type;

// The operation
/**
 * Update the runbook identified by runbook name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const RunbookUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RunbookUpdateInput,
  outputSchema: RunbookUpdateOutput,
}));
// Input Schema
export const RuntimeEnvironmentsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runtimeEnvironmentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}",
    }),
  );
export type RuntimeEnvironmentsCreateInput =
  typeof RuntimeEnvironmentsCreateInput.Type;

// Output Schema
export const RuntimeEnvironmentsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RuntimeEnvironmentsCreateOutput =
  typeof RuntimeEnvironmentsCreateOutput.Type;

// The operation
/**
 * Create or update Runtime Environment
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runtimeEnvironmentName - The name of the Runtime Environment.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const RuntimeEnvironmentsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RuntimeEnvironmentsCreateInput,
    outputSchema: RuntimeEnvironmentsCreateOutput,
  }),
);
// Input Schema
export const RuntimeEnvironmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runtimeEnvironmentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}",
    }),
  );
export type RuntimeEnvironmentsDeleteInput =
  typeof RuntimeEnvironmentsDeleteInput.Type;

// Output Schema
export const RuntimeEnvironmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RuntimeEnvironmentsDeleteOutput =
  typeof RuntimeEnvironmentsDeleteOutput.Type;

// The operation
/**
 * Delete the Runtime Environment.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runtimeEnvironmentName - The name of the Runtime Environment.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const RuntimeEnvironmentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RuntimeEnvironmentsDeleteInput,
    outputSchema: RuntimeEnvironmentsDeleteOutput,
  }),
);
// Input Schema
export const RuntimeEnvironmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runtimeEnvironmentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}",
    }),
  );
export type RuntimeEnvironmentsGetInput =
  typeof RuntimeEnvironmentsGetInput.Type;

// Output Schema
export const RuntimeEnvironmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RuntimeEnvironmentsGetOutput =
  typeof RuntimeEnvironmentsGetOutput.Type;

// The operation
/**
 * Get information about the Runtime Environment
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runtimeEnvironmentName - The name of the Runtime Environment.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const RuntimeEnvironmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RuntimeEnvironmentsGetInput,
    outputSchema: RuntimeEnvironmentsGetOutput,
  }),
);
// Input Schema
export const RuntimeEnvironmentsListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments",
    }),
  );
export type RuntimeEnvironmentsListByAutomationAccountInput =
  typeof RuntimeEnvironmentsListByAutomationAccountInput.Type;

// Output Schema
export const RuntimeEnvironmentsListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RuntimeEnvironmentsListByAutomationAccountOutput =
  typeof RuntimeEnvironmentsListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of RuntimeEnvironments.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param api-version - Client Api Version.
 */
export const RuntimeEnvironmentsListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RuntimeEnvironmentsListByAutomationAccountInput,
    outputSchema: RuntimeEnvironmentsListByAutomationAccountOutput,
  }));
// Input Schema
export const RuntimeEnvironmentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runtimeEnvironmentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}",
    }),
  );
export type RuntimeEnvironmentsUpdateInput =
  typeof RuntimeEnvironmentsUpdateInput.Type;

// Output Schema
export const RuntimeEnvironmentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RuntimeEnvironmentsUpdateOutput =
  typeof RuntimeEnvironmentsUpdateOutput.Type;

// The operation
/**
 * Update an Runtime Environment.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runtimeEnvironmentName - The name of the Runtime Environment.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const RuntimeEnvironmentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RuntimeEnvironmentsUpdateInput,
    outputSchema: RuntimeEnvironmentsUpdateOutput,
  }),
);
// Input Schema
export const ScheduleCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    scheduleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/schedules/{scheduleName}",
    }),
  );
export type ScheduleCreateOrUpdateInput =
  typeof ScheduleCreateOrUpdateInput.Type;

// Output Schema
export const ScheduleCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScheduleCreateOrUpdateOutput =
  typeof ScheduleCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a schedule.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param scheduleName - The schedule name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ScheduleCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScheduleCreateOrUpdateInput,
    outputSchema: ScheduleCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ScheduleDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  scheduleName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/schedules/{scheduleName}",
  }),
);
export type ScheduleDeleteInput = typeof ScheduleDeleteInput.Type;

// Output Schema
export const ScheduleDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScheduleDeleteOutput = typeof ScheduleDeleteOutput.Type;

// The operation
/**
 * Delete the schedule identified by schedule name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param scheduleName - The schedule name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ScheduleDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScheduleDeleteInput,
  outputSchema: ScheduleDeleteOutput,
}));
// Input Schema
export const ScheduleGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  scheduleName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/schedules/{scheduleName}",
  }),
);
export type ScheduleGetInput = typeof ScheduleGetInput.Type;

// Output Schema
export const ScheduleGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScheduleGetOutput = typeof ScheduleGetOutput.Type;

// The operation
/**
 * Retrieve the schedule identified by schedule name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param scheduleName - The schedule name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ScheduleGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScheduleGetInput,
  outputSchema: ScheduleGetOutput,
}));
// Input Schema
export const ScheduleListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/schedules",
    }),
  );
export type ScheduleListByAutomationAccountInput =
  typeof ScheduleListByAutomationAccountInput.Type;

// Output Schema
export const ScheduleListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ScheduleListByAutomationAccountOutput =
  typeof ScheduleListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of schedules.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ScheduleListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduleListByAutomationAccountInput,
    outputSchema: ScheduleListByAutomationAccountOutput,
  }));
// Input Schema
export const ScheduleUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  scheduleName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/schedules/{scheduleName}",
  }),
);
export type ScheduleUpdateInput = typeof ScheduleUpdateInput.Type;

// Output Schema
export const ScheduleUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ScheduleUpdateOutput = typeof ScheduleUpdateOutput.Type;

// The operation
/**
 * Update the schedule identified by schedule name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param scheduleName - The schedule name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const ScheduleUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScheduleUpdateInput,
  outputSchema: ScheduleUpdateOutput,
}));
// Input Schema
export const SoftwareUpdateConfigurationMachineRunsGetByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    softwareUpdateConfigurationMachineRunId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurationMachineRuns/{softwareUpdateConfigurationMachineRunId}",
    }),
  );
export type SoftwareUpdateConfigurationMachineRunsGetByIdInput =
  typeof SoftwareUpdateConfigurationMachineRunsGetByIdInput.Type;

// Output Schema
export const SoftwareUpdateConfigurationMachineRunsGetByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        targetComputer: Schema.optional(Schema.String),
        targetComputerType: Schema.optional(Schema.String),
        softwareUpdateConfiguration: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
          }),
        ),
        status: Schema.optional(Schema.String),
        osType: Schema.optional(Schema.String),
        correlationId: Schema.optional(Schema.String),
        sourceComputerId: Schema.optional(Schema.String),
        startTime: Schema.optional(Schema.String),
        endTime: Schema.optional(Schema.NullOr(Schema.String)),
        configuredDuration: Schema.optional(Schema.String),
        job: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        creationTime: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        lastModifiedTime: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        error: Schema.optional(
          Schema.Struct({
            code: Schema.optional(Schema.String),
            message: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type SoftwareUpdateConfigurationMachineRunsGetByIdOutput =
  typeof SoftwareUpdateConfigurationMachineRunsGetByIdOutput.Type;

// The operation
/**
 * Get a single software update configuration machine run by Id.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param softwareUpdateConfigurationMachineRunId - The Id of the software update configuration machine run.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const SoftwareUpdateConfigurationMachineRunsGetById =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SoftwareUpdateConfigurationMachineRunsGetByIdInput,
    outputSchema: SoftwareUpdateConfigurationMachineRunsGetByIdOutput,
  }));
// Input Schema
export const SoftwareUpdateConfigurationMachineRunsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skip: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurationMachineRuns",
    }),
  );
export type SoftwareUpdateConfigurationMachineRunsListInput =
  typeof SoftwareUpdateConfigurationMachineRunsListInput.Type;

// Output Schema
export const SoftwareUpdateConfigurationMachineRunsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              targetComputer: Schema.optional(Schema.String),
              targetComputerType: Schema.optional(Schema.String),
              softwareUpdateConfiguration: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                }),
              ),
              status: Schema.optional(Schema.String),
              osType: Schema.optional(Schema.String),
              correlationId: Schema.optional(Schema.String),
              sourceComputerId: Schema.optional(Schema.String),
              startTime: Schema.optional(Schema.String),
              endTime: Schema.optional(Schema.NullOr(Schema.String)),
              configuredDuration: Schema.optional(Schema.String),
              job: Schema.optional(
                Schema.Struct({
                  id: Schema.optional(Schema.String),
                }),
              ),
              creationTime: Schema.optional(Schema.String),
              createdBy: Schema.optional(Schema.String),
              lastModifiedTime: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              error: Schema.optional(
                Schema.Struct({
                  code: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SoftwareUpdateConfigurationMachineRunsListOutput =
  typeof SoftwareUpdateConfigurationMachineRunsListOutput.Type;

// The operation
/**
 * Return list of software update configuration machine runs
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 * @param $filter - The filter to apply on the operation. You can use the following filters: 'properties/osType', 'properties/status', 'properties/startTime', and 'properties/softwareUpdateConfiguration/name'
 * @param $skip - number of entries you skip before returning results
 * @param $top - Maximum number of entries returned in the results collection
 */
export const SoftwareUpdateConfigurationMachineRunsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SoftwareUpdateConfigurationMachineRunsListInput,
    outputSchema: SoftwareUpdateConfigurationMachineRunsListOutput,
  }));
// Input Schema
export const SoftwareUpdateConfigurationRunsGetByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    softwareUpdateConfigurationRunId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurationRuns/{softwareUpdateConfigurationRunId}",
    }),
  );
export type SoftwareUpdateConfigurationRunsGetByIdInput =
  typeof SoftwareUpdateConfigurationRunsGetByIdInput.Type;

// Output Schema
export const SoftwareUpdateConfigurationRunsGetByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        softwareUpdateConfiguration: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
          }),
        ),
        status: Schema.optional(Schema.String),
        configuredDuration: Schema.optional(Schema.String),
        osType: Schema.optional(Schema.String),
        startTime: Schema.optional(Schema.String),
        endTime: Schema.optional(Schema.NullOr(Schema.String)),
        computerCount: Schema.optional(Schema.Number),
        failedCount: Schema.optional(Schema.Number),
        creationTime: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        lastModifiedTime: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        tasks: Schema.optional(
          Schema.Struct({
            preTask: Schema.optional(
              Schema.Struct({
                status: Schema.optional(Schema.String),
                source: Schema.optional(Schema.String),
                jobId: Schema.optional(Schema.String),
              }),
            ),
            postTask: Schema.optional(
              Schema.Struct({
                status: Schema.optional(Schema.String),
                source: Schema.optional(Schema.String),
                jobId: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
  });
export type SoftwareUpdateConfigurationRunsGetByIdOutput =
  typeof SoftwareUpdateConfigurationRunsGetByIdOutput.Type;

// The operation
/**
 * Get a single software update configuration Run by Id.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param softwareUpdateConfigurationRunId - The Id of the software update configuration run.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const SoftwareUpdateConfigurationRunsGetById =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SoftwareUpdateConfigurationRunsGetByIdInput,
    outputSchema: SoftwareUpdateConfigurationRunsGetByIdOutput,
  }));
// Input Schema
export const SoftwareUpdateConfigurationRunsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skip: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurationRuns",
    }),
  );
export type SoftwareUpdateConfigurationRunsListInput =
  typeof SoftwareUpdateConfigurationRunsListInput.Type;

// Output Schema
export const SoftwareUpdateConfigurationRunsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              softwareUpdateConfiguration: Schema.optional(
                Schema.Struct({
                  name: Schema.optional(Schema.String),
                }),
              ),
              status: Schema.optional(Schema.String),
              configuredDuration: Schema.optional(Schema.String),
              osType: Schema.optional(Schema.String),
              startTime: Schema.optional(Schema.String),
              endTime: Schema.optional(Schema.NullOr(Schema.String)),
              computerCount: Schema.optional(Schema.Number),
              failedCount: Schema.optional(Schema.Number),
              creationTime: Schema.optional(Schema.String),
              createdBy: Schema.optional(Schema.String),
              lastModifiedTime: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              tasks: Schema.optional(
                Schema.Struct({
                  preTask: Schema.optional(
                    Schema.Struct({
                      status: Schema.optional(Schema.String),
                      source: Schema.optional(Schema.String),
                      jobId: Schema.optional(Schema.String),
                    }),
                  ),
                  postTask: Schema.optional(
                    Schema.Struct({
                      status: Schema.optional(Schema.String),
                      source: Schema.optional(Schema.String),
                      jobId: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SoftwareUpdateConfigurationRunsListOutput =
  typeof SoftwareUpdateConfigurationRunsListOutput.Type;

// The operation
/**
 * Return list of software update configuration runs
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 * @param $filter - The filter to apply on the operation. You can use the following filters: 'properties/osType', 'properties/status', 'properties/startTime', and 'properties/softwareUpdateConfiguration/name'
 * @param $skip - Number of entries you skip before returning results
 * @param $top - Maximum number of entries returned in the results collection
 */
export const SoftwareUpdateConfigurationRunsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SoftwareUpdateConfigurationRunsListInput,
    outputSchema: SoftwareUpdateConfigurationRunsListOutput,
  }));
// Input Schema
export const SoftwareUpdateConfigurationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    softwareUpdateConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurations/{softwareUpdateConfigurationName}",
    }),
  );
export type SoftwareUpdateConfigurationsCreateInput =
  typeof SoftwareUpdateConfigurationsCreateInput.Type;

// Output Schema
export const SoftwareUpdateConfigurationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.Struct({
      updateConfiguration: Schema.Struct({
        operatingSystem: Schema.Literals(["Windows", "Linux"]),
        windows: Schema.optional(
          Schema.Struct({
            includedUpdateClassifications: Schema.optional(
              Schema.Literals([
                "Unclassified",
                "Critical",
                "Security",
                "UpdateRollup",
                "FeaturePack",
                "ServicePack",
                "Definition",
                "Tools",
                "Updates",
              ]),
            ),
            excludedKbNumbers: Schema.optional(Schema.Array(Schema.String)),
            includedKbNumbers: Schema.optional(Schema.Array(Schema.String)),
            rebootSetting: Schema.optional(Schema.String),
          }),
        ),
        linux: Schema.optional(
          Schema.Struct({
            includedPackageClassifications: Schema.optional(
              Schema.Literals([
                "Unclassified",
                "Critical",
                "Security",
                "Other",
              ]),
            ),
            excludedPackageNameMasks: Schema.optional(
              Schema.Array(Schema.String),
            ),
            includedPackageNameMasks: Schema.optional(
              Schema.Array(Schema.String),
            ),
            rebootSetting: Schema.optional(Schema.String),
          }),
        ),
        duration: Schema.optional(Schema.String),
        azureVirtualMachines: Schema.optional(Schema.Array(Schema.String)),
        nonAzureComputerNames: Schema.optional(Schema.Array(Schema.String)),
        targets: Schema.optional(
          Schema.Struct({
            azureQueries: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  scope: Schema.optional(Schema.Array(Schema.String)),
                  locations: Schema.optional(Schema.Array(Schema.String)),
                  tagSettings: Schema.optional(
                    Schema.Struct({
                      tags: Schema.optional(
                        Schema.Record(
                          Schema.String,
                          Schema.Array(Schema.String),
                        ),
                      ),
                      filterOperator: Schema.optional(
                        Schema.Literals(["All", "Any"]),
                      ),
                    }),
                  ),
                }),
              ),
            ),
            nonAzureQueries: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  functionAlias: Schema.optional(Schema.String),
                  workspaceId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
      }),
      scheduleInfo: Schema.Struct({
        startTime: Schema.optional(Schema.String),
        startTimeOffsetMinutes: Schema.optional(Schema.Number),
        expiryTime: Schema.optional(Schema.NullOr(Schema.String)),
        expiryTimeOffsetMinutes: Schema.optional(Schema.Number),
        isEnabled: Schema.optional(Schema.Boolean),
        nextRun: Schema.optional(Schema.NullOr(Schema.String)),
        nextRunOffsetMinutes: Schema.optional(Schema.Number),
        interval: Schema.optional(Schema.Number),
        frequency: Schema.optional(
          Schema.Literals([
            "OneTime",
            "Day",
            "Hour",
            "Week",
            "Month",
            "Minute",
          ]),
        ),
        timeZone: Schema.optional(Schema.String),
        advancedSchedule: Schema.optional(
          Schema.Struct({
            weekDays: Schema.optional(Schema.Array(Schema.String)),
            monthDays: Schema.optional(Schema.Array(Schema.Number)),
            monthlyOccurrences: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  occurrence: Schema.optional(Schema.Number),
                  day: Schema.optional(
                    Schema.Literals([
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ]),
                  ),
                }),
              ),
            ),
          }),
        ),
        creationTime: Schema.optional(Schema.String),
        lastModifiedTime: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
      }),
      provisioningState: Schema.optional(Schema.String),
      error: Schema.optional(
        Schema.Struct({
          code: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
        }),
      ),
      creationTime: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      lastModifiedTime: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      tasks: Schema.optional(
        Schema.Struct({
          preTask: Schema.optional(
            Schema.Struct({
              parameters: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              source: Schema.optional(Schema.String),
            }),
          ),
          postTask: Schema.optional(
            Schema.Struct({
              parameters: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              source: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    }),
  });
export type SoftwareUpdateConfigurationsCreateOutput =
  typeof SoftwareUpdateConfigurationsCreateOutput.Type;

// The operation
/**
 * Create a new software update configuration with the name given in the URI.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param softwareUpdateConfigurationName - The name of the software update configuration to be created.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const SoftwareUpdateConfigurationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SoftwareUpdateConfigurationsCreateInput,
    outputSchema: SoftwareUpdateConfigurationsCreateOutput,
  }));
// Input Schema
export const SoftwareUpdateConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    softwareUpdateConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurations/{softwareUpdateConfigurationName}",
    }),
  );
export type SoftwareUpdateConfigurationsDeleteInput =
  typeof SoftwareUpdateConfigurationsDeleteInput.Type;

// Output Schema
export const SoftwareUpdateConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SoftwareUpdateConfigurationsDeleteOutput =
  typeof SoftwareUpdateConfigurationsDeleteOutput.Type;

// The operation
/**
 * delete a specific software update configuration.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param softwareUpdateConfigurationName - The name of the software update configuration to be created.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const SoftwareUpdateConfigurationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SoftwareUpdateConfigurationsDeleteInput,
    outputSchema: SoftwareUpdateConfigurationsDeleteOutput,
  }));
// Input Schema
export const SoftwareUpdateConfigurationsGetByNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    softwareUpdateConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurations/{softwareUpdateConfigurationName}",
    }),
  );
export type SoftwareUpdateConfigurationsGetByNameInput =
  typeof SoftwareUpdateConfigurationsGetByNameInput.Type;

// Output Schema
export const SoftwareUpdateConfigurationsGetByNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.Struct({
      updateConfiguration: Schema.Struct({
        operatingSystem: Schema.Literals(["Windows", "Linux"]),
        windows: Schema.optional(
          Schema.Struct({
            includedUpdateClassifications: Schema.optional(
              Schema.Literals([
                "Unclassified",
                "Critical",
                "Security",
                "UpdateRollup",
                "FeaturePack",
                "ServicePack",
                "Definition",
                "Tools",
                "Updates",
              ]),
            ),
            excludedKbNumbers: Schema.optional(Schema.Array(Schema.String)),
            includedKbNumbers: Schema.optional(Schema.Array(Schema.String)),
            rebootSetting: Schema.optional(Schema.String),
          }),
        ),
        linux: Schema.optional(
          Schema.Struct({
            includedPackageClassifications: Schema.optional(
              Schema.Literals([
                "Unclassified",
                "Critical",
                "Security",
                "Other",
              ]),
            ),
            excludedPackageNameMasks: Schema.optional(
              Schema.Array(Schema.String),
            ),
            includedPackageNameMasks: Schema.optional(
              Schema.Array(Schema.String),
            ),
            rebootSetting: Schema.optional(Schema.String),
          }),
        ),
        duration: Schema.optional(Schema.String),
        azureVirtualMachines: Schema.optional(Schema.Array(Schema.String)),
        nonAzureComputerNames: Schema.optional(Schema.Array(Schema.String)),
        targets: Schema.optional(
          Schema.Struct({
            azureQueries: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  scope: Schema.optional(Schema.Array(Schema.String)),
                  locations: Schema.optional(Schema.Array(Schema.String)),
                  tagSettings: Schema.optional(
                    Schema.Struct({
                      tags: Schema.optional(
                        Schema.Record(
                          Schema.String,
                          Schema.Array(Schema.String),
                        ),
                      ),
                      filterOperator: Schema.optional(
                        Schema.Literals(["All", "Any"]),
                      ),
                    }),
                  ),
                }),
              ),
            ),
            nonAzureQueries: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  functionAlias: Schema.optional(Schema.String),
                  workspaceId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
      }),
      scheduleInfo: Schema.Struct({
        startTime: Schema.optional(Schema.String),
        startTimeOffsetMinutes: Schema.optional(Schema.Number),
        expiryTime: Schema.optional(Schema.NullOr(Schema.String)),
        expiryTimeOffsetMinutes: Schema.optional(Schema.Number),
        isEnabled: Schema.optional(Schema.Boolean),
        nextRun: Schema.optional(Schema.NullOr(Schema.String)),
        nextRunOffsetMinutes: Schema.optional(Schema.Number),
        interval: Schema.optional(Schema.Number),
        frequency: Schema.optional(
          Schema.Literals([
            "OneTime",
            "Day",
            "Hour",
            "Week",
            "Month",
            "Minute",
          ]),
        ),
        timeZone: Schema.optional(Schema.String),
        advancedSchedule: Schema.optional(
          Schema.Struct({
            weekDays: Schema.optional(Schema.Array(Schema.String)),
            monthDays: Schema.optional(Schema.Array(Schema.Number)),
            monthlyOccurrences: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  occurrence: Schema.optional(Schema.Number),
                  day: Schema.optional(
                    Schema.Literals([
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ]),
                  ),
                }),
              ),
            ),
          }),
        ),
        creationTime: Schema.optional(Schema.String),
        lastModifiedTime: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
      }),
      provisioningState: Schema.optional(Schema.String),
      error: Schema.optional(
        Schema.Struct({
          code: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
        }),
      ),
      creationTime: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      lastModifiedTime: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      tasks: Schema.optional(
        Schema.Struct({
          preTask: Schema.optional(
            Schema.Struct({
              parameters: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              source: Schema.optional(Schema.String),
            }),
          ),
          postTask: Schema.optional(
            Schema.Struct({
              parameters: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              source: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    }),
  });
export type SoftwareUpdateConfigurationsGetByNameOutput =
  typeof SoftwareUpdateConfigurationsGetByNameOutput.Type;

// The operation
/**
 * Get a single software update configuration by name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param softwareUpdateConfigurationName - The name of the software update configuration to be created.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 */
export const SoftwareUpdateConfigurationsGetByName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SoftwareUpdateConfigurationsGetByNameInput,
    outputSchema: SoftwareUpdateConfigurationsGetByNameOutput,
  }));
// Input Schema
export const SoftwareUpdateConfigurationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurations",
    }),
  );
export type SoftwareUpdateConfigurationsListInput =
  typeof SoftwareUpdateConfigurationsListInput.Type;

// Output Schema
export const SoftwareUpdateConfigurationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          properties: Schema.Struct({
            updateConfiguration: Schema.optional(
              Schema.Struct({
                operatingSystem: Schema.Literals(["Windows", "Linux"]),
                windows: Schema.optional(
                  Schema.Struct({
                    includedUpdateClassifications: Schema.optional(
                      Schema.Literals([
                        "Unclassified",
                        "Critical",
                        "Security",
                        "UpdateRollup",
                        "FeaturePack",
                        "ServicePack",
                        "Definition",
                        "Tools",
                        "Updates",
                      ]),
                    ),
                    excludedKbNumbers: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    includedKbNumbers: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    rebootSetting: Schema.optional(Schema.String),
                  }),
                ),
                linux: Schema.optional(
                  Schema.Struct({
                    includedPackageClassifications: Schema.optional(
                      Schema.Literals([
                        "Unclassified",
                        "Critical",
                        "Security",
                        "Other",
                      ]),
                    ),
                    excludedPackageNameMasks: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    includedPackageNameMasks: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    rebootSetting: Schema.optional(Schema.String),
                  }),
                ),
                duration: Schema.optional(Schema.String),
                azureVirtualMachines: Schema.optional(
                  Schema.Array(Schema.String),
                ),
                nonAzureComputerNames: Schema.optional(
                  Schema.Array(Schema.String),
                ),
                targets: Schema.optional(
                  Schema.Struct({
                    azureQueries: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          scope: Schema.optional(Schema.Array(Schema.String)),
                          locations: Schema.optional(
                            Schema.Array(Schema.String),
                          ),
                          tagSettings: Schema.optional(
                            Schema.Struct({
                              tags: Schema.optional(
                                Schema.Record(
                                  Schema.String,
                                  Schema.Array(Schema.String),
                                ),
                              ),
                              filterOperator: Schema.optional(
                                Schema.Literals(["All", "Any"]),
                              ),
                            }),
                          ),
                        }),
                      ),
                    ),
                    nonAzureQueries: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          functionAlias: Schema.optional(Schema.String),
                          workspaceId: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                  }),
                ),
              }),
            ),
            tasks: Schema.optional(
              Schema.Struct({
                preTask: Schema.optional(
                  Schema.Struct({
                    parameters: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    source: Schema.optional(Schema.String),
                  }),
                ),
                postTask: Schema.optional(
                  Schema.Struct({
                    parameters: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    source: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            frequency: Schema.optional(
              Schema.Literals([
                "OneTime",
                "Day",
                "Hour",
                "Week",
                "Month",
                "Minute",
              ]),
            ),
            startTime: Schema.optional(Schema.String),
            creationTime: Schema.optional(Schema.String),
            lastModifiedTime: Schema.optional(Schema.String),
            provisioningState: Schema.optional(Schema.String),
            nextRun: Schema.optional(Schema.NullOr(Schema.String)),
          }),
        }),
      ),
    ),
  });
export type SoftwareUpdateConfigurationsListOutput =
  typeof SoftwareUpdateConfigurationsListOutput.Type;

// The operation
/**
 * Get all software update configurations for the account.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param api-version - Client Api Version.
 * @param clientRequestId - Identifies this specific client request.
 * @param $filter - The filter to apply on the operation.
 */
export const SoftwareUpdateConfigurationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SoftwareUpdateConfigurationsListInput,
    outputSchema: SoftwareUpdateConfigurationsListOutput,
  }));
// Input Schema
export const SourceControlCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    sourceControlName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}",
    }),
  );
export type SourceControlCreateOrUpdateInput =
  typeof SourceControlCreateOrUpdateInput.Type;

// Output Schema
export const SourceControlCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SourceControlCreateOrUpdateOutput =
  typeof SourceControlCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a source control.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param sourceControlName - The source control name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const SourceControlCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SourceControlCreateOrUpdateInput,
    outputSchema: SourceControlCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SourceControlDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    sourceControlName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}",
    }),
  );
export type SourceControlDeleteInput = typeof SourceControlDeleteInput.Type;

// Output Schema
export const SourceControlDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SourceControlDeleteOutput = typeof SourceControlDeleteOutput.Type;

// The operation
/**
 * Delete the source control.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param sourceControlName - The name of source control.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const SourceControlDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SourceControlDeleteInput,
  outputSchema: SourceControlDeleteOutput,
}));
// Input Schema
export const SourceControlGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  sourceControlName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}",
  }),
);
export type SourceControlGetInput = typeof SourceControlGetInput.Type;

// Output Schema
export const SourceControlGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SourceControlGetOutput = typeof SourceControlGetOutput.Type;

// The operation
/**
 * Retrieve the source control identified by source control name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param sourceControlName - The name of source control.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const SourceControlGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SourceControlGetInput,
  outputSchema: SourceControlGetOutput,
}));
// Input Schema
export const SourceControlListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls",
    }),
  );
export type SourceControlListByAutomationAccountInput =
  typeof SourceControlListByAutomationAccountInput.Type;

// Output Schema
export const SourceControlListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SourceControlListByAutomationAccountOutput =
  typeof SourceControlListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of source controls.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param $filter - The filter to apply on the operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const SourceControlListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SourceControlListByAutomationAccountInput,
    outputSchema: SourceControlListByAutomationAccountOutput,
  }));
// Input Schema
export const SourceControlSyncJobCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    sourceControlName: Schema.String.pipe(T.PathParam()),
    sourceControlSyncJobId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}/sourceControlSyncJobs/{sourceControlSyncJobId}",
    }),
  );
export type SourceControlSyncJobCreateInput =
  typeof SourceControlSyncJobCreateInput.Type;

// Output Schema
export const SourceControlSyncJobCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        sourceControlSyncJobId: Schema.optional(Schema.String),
        creationTime: Schema.optional(Schema.String),
        provisioningState: Schema.optional(
          Schema.Literals(["Completed", "Failed", "Running"]),
        ),
        startTime: Schema.optional(Schema.NullOr(Schema.String)),
        endTime: Schema.optional(Schema.NullOr(Schema.String)),
        syncType: Schema.optional(Schema.Literals(["PartialSync", "FullSync"])),
      }),
    ),
  });
export type SourceControlSyncJobCreateOutput =
  typeof SourceControlSyncJobCreateOutput.Type;

// The operation
/**
 * Creates the sync job for a source control.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param sourceControlName - The source control name.
 * @param sourceControlSyncJobId - The source control sync job id.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const SourceControlSyncJobCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SourceControlSyncJobCreateInput,
    outputSchema: SourceControlSyncJobCreateOutput,
  }),
);
// Input Schema
export const SourceControlSyncJobGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    sourceControlName: Schema.String.pipe(T.PathParam()),
    sourceControlSyncJobId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}/sourceControlSyncJobs/{sourceControlSyncJobId}",
    }),
  );
export type SourceControlSyncJobGetInput =
  typeof SourceControlSyncJobGetInput.Type;

// Output Schema
export const SourceControlSyncJobGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        sourceControlSyncJobId: Schema.optional(Schema.String),
        creationTime: Schema.optional(Schema.String),
        provisioningState: Schema.optional(
          Schema.Literals(["Completed", "Failed", "Running"]),
        ),
        startTime: Schema.optional(Schema.NullOr(Schema.String)),
        endTime: Schema.optional(Schema.NullOr(Schema.String)),
        syncType: Schema.optional(Schema.Literals(["PartialSync", "FullSync"])),
        exception: Schema.optional(Schema.String),
      }),
    ),
  });
export type SourceControlSyncJobGetOutput =
  typeof SourceControlSyncJobGetOutput.Type;

// The operation
/**
 * Retrieve the source control sync job identified by job id.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param sourceControlName - The source control name.
 * @param sourceControlSyncJobId - The source control sync job id.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const SourceControlSyncJobGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SourceControlSyncJobGetInput,
    outputSchema: SourceControlSyncJobGetOutput,
  }),
);
// Input Schema
export const SourceControlSyncJobListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    sourceControlName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}/sourceControlSyncJobs",
    }),
  );
export type SourceControlSyncJobListByAutomationAccountInput =
  typeof SourceControlSyncJobListByAutomationAccountInput.Type;

// Output Schema
export const SourceControlSyncJobListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              sourceControlSyncJobId: Schema.optional(Schema.String),
              creationTime: Schema.optional(Schema.String),
              provisioningState: Schema.optional(
                Schema.Literals(["Completed", "Failed", "Running"]),
              ),
              startTime: Schema.optional(Schema.NullOr(Schema.String)),
              endTime: Schema.optional(Schema.NullOr(Schema.String)),
              syncType: Schema.optional(
                Schema.Literals(["PartialSync", "FullSync"]),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SourceControlSyncJobListByAutomationAccountOutput =
  typeof SourceControlSyncJobListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of source control sync jobs.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param sourceControlName - The source control name.
 * @param $filter - The filter to apply on the operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const SourceControlSyncJobListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SourceControlSyncJobListByAutomationAccountInput,
    outputSchema: SourceControlSyncJobListByAutomationAccountOutput,
  }));
// Input Schema
export const SourceControlSyncJobStreamsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    sourceControlName: Schema.String.pipe(T.PathParam()),
    sourceControlSyncJobId: Schema.String.pipe(T.PathParam()),
    streamId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}/sourceControlSyncJobs/{sourceControlSyncJobId}/streams/{streamId}",
    }),
  );
export type SourceControlSyncJobStreamsGetInput =
  typeof SourceControlSyncJobStreamsGetInput.Type;

// Output Schema
export const SourceControlSyncJobStreamsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        sourceControlSyncJobStreamId: Schema.optional(Schema.String),
        summary: Schema.optional(Schema.String),
        time: Schema.optional(Schema.NullOr(Schema.String)),
        streamType: Schema.optional(Schema.Literals(["Error", "Output"])),
        streamText: Schema.optional(Schema.String),
        value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      }),
    ),
  });
export type SourceControlSyncJobStreamsGetOutput =
  typeof SourceControlSyncJobStreamsGetOutput.Type;

// The operation
/**
 * Retrieve a sync job stream identified by stream id.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param sourceControlName - The source control name.
 * @param sourceControlSyncJobId - The source control sync job id.
 * @param streamId - The id of the sync job stream.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const SourceControlSyncJobStreamsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SourceControlSyncJobStreamsGetInput,
    outputSchema: SourceControlSyncJobStreamsGetOutput,
  }));
// Input Schema
export const SourceControlSyncJobStreamsListBySyncJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    sourceControlName: Schema.String.pipe(T.PathParam()),
    sourceControlSyncJobId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}/sourceControlSyncJobs/{sourceControlSyncJobId}/streams",
    }),
  );
export type SourceControlSyncJobStreamsListBySyncJobInput =
  typeof SourceControlSyncJobStreamsListBySyncJobInput.Type;

// Output Schema
export const SourceControlSyncJobStreamsListBySyncJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              sourceControlSyncJobStreamId: Schema.optional(Schema.String),
              summary: Schema.optional(Schema.String),
              time: Schema.optional(Schema.NullOr(Schema.String)),
              streamType: Schema.optional(Schema.Literals(["Error", "Output"])),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SourceControlSyncJobStreamsListBySyncJobOutput =
  typeof SourceControlSyncJobStreamsListBySyncJobOutput.Type;

// The operation
/**
 * Retrieve a list of sync job streams identified by sync job id.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param sourceControlName - The source control name.
 * @param sourceControlSyncJobId - The source control sync job id.
 * @param $filter - The filter to apply on the operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const SourceControlSyncJobStreamsListBySyncJob =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SourceControlSyncJobStreamsListBySyncJobInput,
    outputSchema: SourceControlSyncJobStreamsListBySyncJobOutput,
  }));
// Input Schema
export const SourceControlUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    sourceControlName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}",
    }),
  );
export type SourceControlUpdateInput = typeof SourceControlUpdateInput.Type;

// Output Schema
export const SourceControlUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SourceControlUpdateOutput = typeof SourceControlUpdateOutput.Type;

// The operation
/**
 * Update a source control.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param sourceControlName - The source control name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const SourceControlUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SourceControlUpdateInput,
  outputSchema: SourceControlUpdateOutput,
}));
// Input Schema
export const StatisticsListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/statistics",
    }),
  );
export type StatisticsListByAutomationAccountInput =
  typeof StatisticsListByAutomationAccountInput.Type;

// Output Schema
export const StatisticsListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          counterProperty: Schema.optional(Schema.String),
          counterValue: Schema.optional(Schema.Number),
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.NullOr(Schema.String)),
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type StatisticsListByAutomationAccountOutput =
  typeof StatisticsListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve the statistics for the account.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param $filter - The filter to apply on the operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const StatisticsListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StatisticsListByAutomationAccountInput,
    outputSchema: StatisticsListByAutomationAccountOutput,
  }));
// Input Schema
export const TestJobCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runbookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob",
  }),
);
export type TestJobCreateInput = typeof TestJobCreateInput.Type;

// Output Schema
export const TestJobCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  creationTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  statusDetails: Schema.optional(Schema.String),
  runOn: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.NullOr(Schema.String)),
  endTime: Schema.optional(Schema.NullOr(Schema.String)),
  exception: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  lastStatusModifiedTime: Schema.optional(Schema.NullOr(Schema.String)),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  logActivityTrace: Schema.optional(Schema.Number),
});
export type TestJobCreateOutput = typeof TestJobCreateOutput.Type;

// The operation
/**
 * Create a test job of the runbook.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The parameters supplied to the create test job operation.
 * @param api-version - Client Api Version.
 */
export const TestJobCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TestJobCreateInput,
  outputSchema: TestJobCreateOutput,
}));
// Input Schema
export const TestJobGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runbookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob",
  }),
);
export type TestJobGetInput = typeof TestJobGetInput.Type;

// Output Schema
export const TestJobGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  creationTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  statusDetails: Schema.optional(Schema.String),
  runOn: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.NullOr(Schema.String)),
  endTime: Schema.optional(Schema.NullOr(Schema.String)),
  exception: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  lastStatusModifiedTime: Schema.optional(Schema.NullOr(Schema.String)),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  logActivityTrace: Schema.optional(Schema.Number),
});
export type TestJobGetOutput = typeof TestJobGetOutput.Type;

// The operation
/**
 * Retrieve the test job for the specified runbook.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const TestJobGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TestJobGetInput,
  outputSchema: TestJobGetOutput,
}));
// Input Schema
export const TestJobResumeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runbookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob/resume",
  }),
);
export type TestJobResumeInput = typeof TestJobResumeInput.Type;

// Output Schema
export const TestJobResumeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TestJobResumeOutput = typeof TestJobResumeOutput.Type;

// The operation
/**
 * Resume the test job.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const TestJobResume = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TestJobResumeInput,
  outputSchema: TestJobResumeOutput,
}));
// Input Schema
export const TestJobStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runbookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob/stop",
  }),
);
export type TestJobStopInput = typeof TestJobStopInput.Type;

// Output Schema
export const TestJobStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TestJobStopOutput = typeof TestJobStopOutput.Type;

// The operation
/**
 * Stop the test job.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const TestJobStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TestJobStopInput,
  outputSchema: TestJobStopOutput,
}));
// Input Schema
export const TestJobStreamsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runbookName: Schema.String.pipe(T.PathParam()),
    jobStreamId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob/streams/{jobStreamId}",
  }),
);
export type TestJobStreamsGetInput = typeof TestJobStreamsGetInput.Type;

// Output Schema
export const TestJobStreamsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        jobStreamId: Schema.optional(Schema.String),
        time: Schema.optional(Schema.String),
        streamType: Schema.optional(
          Schema.Literals([
            "Progress",
            "Output",
            "Warning",
            "Error",
            "Debug",
            "Verbose",
            "Any",
          ]),
        ),
        streamText: Schema.optional(Schema.String),
        summary: Schema.optional(Schema.NullOr(Schema.String)),
        value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      }),
    ),
  });
export type TestJobStreamsGetOutput = typeof TestJobStreamsGetOutput.Type;

// The operation
/**
 * Retrieve a test job stream of the test job identified by runbook name and stream id.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param jobStreamId - The job stream id.
 * @param api-version - Client Api Version.
 */
export const TestJobStreamsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TestJobStreamsGetInput,
  outputSchema: TestJobStreamsGetOutput,
}));
// Input Schema
export const TestJobStreamsListByTestJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    runbookName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob/streams",
    }),
  );
export type TestJobStreamsListByTestJobInput =
  typeof TestJobStreamsListByTestJobInput.Type;

// Output Schema
export const TestJobStreamsListByTestJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              jobStreamId: Schema.optional(Schema.String),
              time: Schema.optional(Schema.String),
              streamType: Schema.optional(
                Schema.Literals([
                  "Progress",
                  "Output",
                  "Warning",
                  "Error",
                  "Debug",
                  "Verbose",
                  "Any",
                ]),
              ),
              streamText: Schema.optional(Schema.String),
              summary: Schema.optional(Schema.NullOr(Schema.String)),
              value: Schema.optional(
                Schema.Record(Schema.String, Schema.Unknown),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TestJobStreamsListByTestJobOutput =
  typeof TestJobStreamsListByTestJobOutput.Type;

// The operation
/**
 * Retrieve a list of test job streams identified by runbook name.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param $filter - The filter to apply on the operation.
 * @param api-version - Client Api Version.
 */
export const TestJobStreamsListByTestJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TestJobStreamsListByTestJobInput,
    outputSchema: TestJobStreamsListByTestJobOutput,
  }),
);
// Input Schema
export const TestJobSuspendInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  runbookName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob/suspend",
  }),
);
export type TestJobSuspendInput = typeof TestJobSuspendInput.Type;

// Output Schema
export const TestJobSuspendOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TestJobSuspendOutput = typeof TestJobSuspendOutput.Type;

// The operation
/**
 * Suspend the test job.
 *
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param runbookName - The runbook name.
 * @param api-version - Client Api Version.
 */
export const TestJobSuspend = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TestJobSuspendInput,
  outputSchema: TestJobSuspendOutput,
}));
// Input Schema
export const UsagesListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/usages",
    }),
  );
export type UsagesListByAutomationAccountInput =
  typeof UsagesListByAutomationAccountInput.Type;

// Output Schema
export const UsagesListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          unit: Schema.optional(Schema.String),
          currentValue: Schema.optional(Schema.Number),
          limit: Schema.optional(Schema.Number),
          throttleStatus: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type UsagesListByAutomationAccountOutput =
  typeof UsagesListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve the usage for the account id.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const UsagesListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UsagesListByAutomationAccountInput,
    outputSchema: UsagesListByAutomationAccountOutput,
  }));
// Input Schema
export const VariableCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    variableName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/variables/{variableName}",
    }),
  );
export type VariableCreateOrUpdateInput =
  typeof VariableCreateOrUpdateInput.Type;

// Output Schema
export const VariableCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VariableCreateOrUpdateOutput =
  typeof VariableCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a variable.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param variableName - The variable name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const VariableCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VariableCreateOrUpdateInput,
    outputSchema: VariableCreateOrUpdateOutput,
  }),
);
// Input Schema
export const VariableDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  variableName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/variables/{variableName}",
  }),
);
export type VariableDeleteInput = typeof VariableDeleteInput.Type;

// Output Schema
export const VariableDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VariableDeleteOutput = typeof VariableDeleteOutput.Type;

// The operation
/**
 * Delete the variable.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param variableName - The name of variable.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const VariableDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VariableDeleteInput,
  outputSchema: VariableDeleteOutput,
}));
// Input Schema
export const VariableGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  variableName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/variables/{variableName}",
  }),
);
export type VariableGetInput = typeof VariableGetInput.Type;

// Output Schema
export const VariableGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VariableGetOutput = typeof VariableGetOutput.Type;

// The operation
/**
 * Retrieve the variable identified by variable name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param variableName - The name of variable.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const VariableGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VariableGetInput,
  outputSchema: VariableGetOutput,
}));
// Input Schema
export const VariableListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/variables",
    }),
  );
export type VariableListByAutomationAccountInput =
  typeof VariableListByAutomationAccountInput.Type;

// Output Schema
export const VariableListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type VariableListByAutomationAccountOutput =
  typeof VariableListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of variables.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const VariableListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VariableListByAutomationAccountInput,
    outputSchema: VariableListByAutomationAccountOutput,
  }));
// Input Schema
export const VariableUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  variableName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/variables/{variableName}",
  }),
);
export type VariableUpdateInput = typeof VariableUpdateInput.Type;

// Output Schema
export const VariableUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type VariableUpdateOutput = typeof VariableUpdateOutput.Type;

// The operation
/**
 * Update a variable.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param variableName - The variable name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const VariableUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VariableUpdateInput,
  outputSchema: VariableUpdateOutput,
}));
// Input Schema
export const WatcherDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  watcherName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/watchers/{watcherName}",
  }),
);
export type WatcherDeleteInput = typeof WatcherDeleteInput.Type;

// Output Schema
export const WatcherDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WatcherDeleteOutput = typeof WatcherDeleteOutput.Type;

// The operation
/**
 * Delete the watcher by name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param watcherName - The watcher name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const WatcherDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatcherDeleteInput,
  outputSchema: WatcherDeleteOutput,
}));
// Input Schema
export const WatcherStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  watcherName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/watchers/{watcherName}/start",
  }),
);
export type WatcherStartInput = typeof WatcherStartInput.Type;

// Output Schema
export const WatcherStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WatcherStartOutput = typeof WatcherStartOutput.Type;

// The operation
/**
 * Resume the watcher identified by watcher name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param watcherName - The watcher name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const WatcherStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatcherStartInput,
  outputSchema: WatcherStartOutput,
}));
// Input Schema
export const WatcherStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  watcherName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/watchers/{watcherName}/stop",
  }),
);
export type WatcherStopInput = typeof WatcherStopInput.Type;

// Output Schema
export const WatcherStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WatcherStopOutput = typeof WatcherStopOutput.Type;

// The operation
/**
 * Resume the watcher identified by watcher name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param watcherName - The watcher name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const WatcherStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatcherStopInput,
  outputSchema: WatcherStopOutput,
}));
// Input Schema
export const WebhookCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    webhookName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks/{webhookName}",
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
 * Create the webhook identified by webhook name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param webhookName - The webhook name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const WebhookCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WebhookCreateOrUpdateInput,
    outputSchema: WebhookCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WebhookDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  webhookName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks/{webhookName}",
  }),
);
export type WebhookDeleteInput = typeof WebhookDeleteInput.Type;

// Output Schema
export const WebhookDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WebhookDeleteOutput = typeof WebhookDeleteOutput.Type;

// The operation
/**
 * Delete the webhook by name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param webhookName - The webhook name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const WebhookDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebhookDeleteInput,
  outputSchema: WebhookDeleteOutput,
}));
// Input Schema
export const WebhookGenerateUriInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks/generateUri",
    }),
  );
export type WebhookGenerateUriInput = typeof WebhookGenerateUriInput.Type;

// Output Schema
export const WebhookGenerateUriOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String;
export type WebhookGenerateUriOutput = typeof WebhookGenerateUriOutput.Type;

// The operation
/**
 * Generates a Uri for use in creating a webhook.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const WebhookGenerateUri = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebhookGenerateUriInput,
  outputSchema: WebhookGenerateUriOutput,
}));
// Input Schema
export const WebhookGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  webhookName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks/{webhookName}",
  }),
);
export type WebhookGetInput = typeof WebhookGetInput.Type;

// Output Schema
export const WebhookGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WebhookGetOutput = typeof WebhookGetOutput.Type;

// The operation
/**
 * Retrieve the webhook identified by webhook name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param webhookName - The webhook name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const WebhookGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebhookGetInput,
  outputSchema: WebhookGetOutput,
}));
// Input Schema
export const WebhookListByAutomationAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    automationAccountName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks",
    }),
  );
export type WebhookListByAutomationAccountInput =
  typeof WebhookListByAutomationAccountInput.Type;

// Output Schema
export const WebhookListByAutomationAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WebhookListByAutomationAccountOutput =
  typeof WebhookListByAutomationAccountOutput.Type;

// The operation
/**
 * Retrieve a list of webhooks.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param $filter - The filter to apply on the operation.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const WebhookListByAutomationAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WebhookListByAutomationAccountInput,
    outputSchema: WebhookListByAutomationAccountOutput,
  }));
// Input Schema
export const WebhookUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  automationAccountName: Schema.String.pipe(T.PathParam()),
  webhookName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/webhooks/{webhookName}",
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
 * Update the webhook identified by webhook name.
 *
 * @param resourceGroupName - Name of an Azure Resource group.
 * @param automationAccountName - The name of the automation account.
 * @param webhookName - The webhook name.
 * @param subscriptionId - Gets subscription credentials which uniquely identify Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client Api Version.
 */
export const WebhookUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WebhookUpdateInput,
  outputSchema: WebhookUpdateOutput,
}));
