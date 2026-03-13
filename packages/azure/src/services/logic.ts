/**
 * Azure Logic API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const IntegrationAccountAgreementsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    agreementName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/agreements/{agreementName}",
    }),
  );
export type IntegrationAccountAgreementsCreateOrUpdateInput =
  typeof IntegrationAccountAgreementsCreateOrUpdateInput.Type;

// Output Schema
export const IntegrationAccountAgreementsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountAgreementsCreateOrUpdateOutput =
  typeof IntegrationAccountAgreementsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an integration account agreement.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param agreementName - The integration account agreement name.
 */
export const IntegrationAccountAgreementsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountAgreementsCreateOrUpdateInput,
    outputSchema: IntegrationAccountAgreementsCreateOrUpdateOutput,
  }));
// Input Schema
export const IntegrationAccountAgreementsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    agreementName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/agreements/{agreementName}",
    }),
  );
export type IntegrationAccountAgreementsDeleteInput =
  typeof IntegrationAccountAgreementsDeleteInput.Type;

// Output Schema
export const IntegrationAccountAgreementsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationAccountAgreementsDeleteOutput =
  typeof IntegrationAccountAgreementsDeleteOutput.Type;

// The operation
/**
 * Deletes an integration account agreement.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param agreementName - The integration account agreement name.
 */
export const IntegrationAccountAgreementsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountAgreementsDeleteInput,
    outputSchema: IntegrationAccountAgreementsDeleteOutput,
  }));
// Input Schema
export const IntegrationAccountAgreementsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    agreementName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/agreements/{agreementName}",
    }),
  );
export type IntegrationAccountAgreementsGetInput =
  typeof IntegrationAccountAgreementsGetInput.Type;

// Output Schema
export const IntegrationAccountAgreementsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountAgreementsGetOutput =
  typeof IntegrationAccountAgreementsGetOutput.Type;

// The operation
/**
 * Gets an integration account agreement.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param agreementName - The integration account agreement name.
 */
export const IntegrationAccountAgreementsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountAgreementsGetInput,
    outputSchema: IntegrationAccountAgreementsGetOutput,
  }));
// Input Schema
export const IntegrationAccountAgreementsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/agreements",
    }),
  );
export type IntegrationAccountAgreementsListInput =
  typeof IntegrationAccountAgreementsListInput.Type;

// Output Schema
export const IntegrationAccountAgreementsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationAccountAgreementsListOutput =
  typeof IntegrationAccountAgreementsListOutput.Type;

// The operation
/**
 * Gets a list of integration account agreements.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param $top - The number of items to be included in the result.
 * @param $filter - The filter to apply on the operation. Options for filters include: AgreementType.
 */
export const IntegrationAccountAgreementsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountAgreementsListInput,
    outputSchema: IntegrationAccountAgreementsListOutput,
  }));
// Input Schema
export const IntegrationAccountAgreementsListContentCallbackUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    agreementName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/agreements/{agreementName}/listContentCallbackUrl",
    }),
  );
export type IntegrationAccountAgreementsListContentCallbackUrlInput =
  typeof IntegrationAccountAgreementsListContentCallbackUrlInput.Type;

// Output Schema
export const IntegrationAccountAgreementsListContentCallbackUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.String),
    method: Schema.optional(Schema.String),
    basePath: Schema.optional(Schema.String),
    relativePath: Schema.optional(Schema.String),
    relativePathParameters: Schema.optional(Schema.Array(Schema.String)),
    queries: Schema.optional(
      Schema.Struct({
        "api-version": Schema.optional(Schema.String),
        sp: Schema.optional(Schema.String),
        sv: Schema.optional(Schema.String),
        sig: Schema.optional(Schema.String),
        se: Schema.optional(Schema.String),
      }),
    ),
  });
export type IntegrationAccountAgreementsListContentCallbackUrlOutput =
  typeof IntegrationAccountAgreementsListContentCallbackUrlOutput.Type;

// The operation
/**
 * Get the content callback url.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param agreementName - The integration account agreement name.
 */
export const IntegrationAccountAgreementsListContentCallbackUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountAgreementsListContentCallbackUrlInput,
    outputSchema: IntegrationAccountAgreementsListContentCallbackUrlOutput,
  }));
// Input Schema
export const IntegrationAccountAssembliesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    assemblyArtifactName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/assemblies/{assemblyArtifactName}",
    }),
  );
export type IntegrationAccountAssembliesCreateOrUpdateInput =
  typeof IntegrationAccountAssembliesCreateOrUpdateInput.Type;

// Output Schema
export const IntegrationAccountAssembliesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountAssembliesCreateOrUpdateOutput =
  typeof IntegrationAccountAssembliesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an assembly for an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param assemblyArtifactName - The assembly artifact name.
 */
export const IntegrationAccountAssembliesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountAssembliesCreateOrUpdateInput,
    outputSchema: IntegrationAccountAssembliesCreateOrUpdateOutput,
  }));
// Input Schema
export const IntegrationAccountAssembliesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    assemblyArtifactName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/assemblies/{assemblyArtifactName}",
    }),
  );
export type IntegrationAccountAssembliesDeleteInput =
  typeof IntegrationAccountAssembliesDeleteInput.Type;

// Output Schema
export const IntegrationAccountAssembliesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationAccountAssembliesDeleteOutput =
  typeof IntegrationAccountAssembliesDeleteOutput.Type;

// The operation
/**
 * Delete an assembly for an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param assemblyArtifactName - The assembly artifact name.
 */
export const IntegrationAccountAssembliesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountAssembliesDeleteInput,
    outputSchema: IntegrationAccountAssembliesDeleteOutput,
  }));
// Input Schema
export const IntegrationAccountAssembliesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    assemblyArtifactName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/assemblies/{assemblyArtifactName}",
    }),
  );
export type IntegrationAccountAssembliesGetInput =
  typeof IntegrationAccountAssembliesGetInput.Type;

// Output Schema
export const IntegrationAccountAssembliesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountAssembliesGetOutput =
  typeof IntegrationAccountAssembliesGetOutput.Type;

// The operation
/**
 * Get an assembly for an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param assemblyArtifactName - The assembly artifact name.
 */
export const IntegrationAccountAssembliesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountAssembliesGetInput,
    outputSchema: IntegrationAccountAssembliesGetOutput,
  }));
// Input Schema
export const IntegrationAccountAssembliesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/assemblies",
    }),
  );
export type IntegrationAccountAssembliesListInput =
  typeof IntegrationAccountAssembliesListInput.Type;

// Output Schema
export const IntegrationAccountAssembliesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
  });
export type IntegrationAccountAssembliesListOutput =
  typeof IntegrationAccountAssembliesListOutput.Type;

// The operation
/**
 * List the assemblies for an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 */
export const IntegrationAccountAssembliesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountAssembliesListInput,
    outputSchema: IntegrationAccountAssembliesListOutput,
  }));
// Input Schema
export const IntegrationAccountAssembliesListContentCallbackUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    assemblyArtifactName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/assemblies/{assemblyArtifactName}/listContentCallbackUrl",
    }),
  );
export type IntegrationAccountAssembliesListContentCallbackUrlInput =
  typeof IntegrationAccountAssembliesListContentCallbackUrlInput.Type;

// Output Schema
export const IntegrationAccountAssembliesListContentCallbackUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.String),
    method: Schema.optional(Schema.String),
    basePath: Schema.optional(Schema.String),
    relativePath: Schema.optional(Schema.String),
    relativePathParameters: Schema.optional(Schema.Array(Schema.String)),
    queries: Schema.optional(
      Schema.Struct({
        "api-version": Schema.optional(Schema.String),
        sp: Schema.optional(Schema.String),
        sv: Schema.optional(Schema.String),
        sig: Schema.optional(Schema.String),
        se: Schema.optional(Schema.String),
      }),
    ),
  });
export type IntegrationAccountAssembliesListContentCallbackUrlOutput =
  typeof IntegrationAccountAssembliesListContentCallbackUrlOutput.Type;

// The operation
/**
 * Get the content callback url for an integration account assembly.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param assemblyArtifactName - The assembly artifact name.
 */
export const IntegrationAccountAssembliesListContentCallbackUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountAssembliesListContentCallbackUrlInput,
    outputSchema: IntegrationAccountAssembliesListContentCallbackUrlOutput,
  }));
// Input Schema
export const IntegrationAccountBatchConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    batchConfigurationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/batchConfigurations/{batchConfigurationName}",
    }),
  );
export type IntegrationAccountBatchConfigurationsCreateOrUpdateInput =
  typeof IntegrationAccountBatchConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const IntegrationAccountBatchConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountBatchConfigurationsCreateOrUpdateOutput =
  typeof IntegrationAccountBatchConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a batch configuration for an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param batchConfigurationName - The batch configuration name.
 */
export const IntegrationAccountBatchConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountBatchConfigurationsCreateOrUpdateInput,
    outputSchema: IntegrationAccountBatchConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const IntegrationAccountBatchConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    batchConfigurationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/batchConfigurations/{batchConfigurationName}",
    }),
  );
export type IntegrationAccountBatchConfigurationsDeleteInput =
  typeof IntegrationAccountBatchConfigurationsDeleteInput.Type;

// Output Schema
export const IntegrationAccountBatchConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationAccountBatchConfigurationsDeleteOutput =
  typeof IntegrationAccountBatchConfigurationsDeleteOutput.Type;

// The operation
/**
 * Delete a batch configuration for an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param batchConfigurationName - The batch configuration name.
 */
export const IntegrationAccountBatchConfigurationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountBatchConfigurationsDeleteInput,
    outputSchema: IntegrationAccountBatchConfigurationsDeleteOutput,
  }));
// Input Schema
export const IntegrationAccountBatchConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    batchConfigurationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/batchConfigurations/{batchConfigurationName}",
    }),
  );
export type IntegrationAccountBatchConfigurationsGetInput =
  typeof IntegrationAccountBatchConfigurationsGetInput.Type;

// Output Schema
export const IntegrationAccountBatchConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountBatchConfigurationsGetOutput =
  typeof IntegrationAccountBatchConfigurationsGetOutput.Type;

// The operation
/**
 * Get a batch configuration for an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param batchConfigurationName - The batch configuration name.
 */
export const IntegrationAccountBatchConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountBatchConfigurationsGetInput,
    outputSchema: IntegrationAccountBatchConfigurationsGetOutput,
  }));
// Input Schema
export const IntegrationAccountBatchConfigurationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/batchConfigurations",
    }),
  );
export type IntegrationAccountBatchConfigurationsListInput =
  typeof IntegrationAccountBatchConfigurationsListInput.Type;

// Output Schema
export const IntegrationAccountBatchConfigurationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
  });
export type IntegrationAccountBatchConfigurationsListOutput =
  typeof IntegrationAccountBatchConfigurationsListOutput.Type;

// The operation
/**
 * List the batch configurations for an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 */
export const IntegrationAccountBatchConfigurationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountBatchConfigurationsListInput,
    outputSchema: IntegrationAccountBatchConfigurationsListOutput,
  }));
// Input Schema
export const IntegrationAccountCertificatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/certificates/{certificateName}",
    }),
  );
export type IntegrationAccountCertificatesCreateOrUpdateInput =
  typeof IntegrationAccountCertificatesCreateOrUpdateInput.Type;

// Output Schema
export const IntegrationAccountCertificatesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountCertificatesCreateOrUpdateOutput =
  typeof IntegrationAccountCertificatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an integration account certificate.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param certificateName - The integration account certificate name.
 */
export const IntegrationAccountCertificatesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountCertificatesCreateOrUpdateInput,
    outputSchema: IntegrationAccountCertificatesCreateOrUpdateOutput,
  }));
// Input Schema
export const IntegrationAccountCertificatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/certificates/{certificateName}",
    }),
  );
export type IntegrationAccountCertificatesDeleteInput =
  typeof IntegrationAccountCertificatesDeleteInput.Type;

// Output Schema
export const IntegrationAccountCertificatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationAccountCertificatesDeleteOutput =
  typeof IntegrationAccountCertificatesDeleteOutput.Type;

// The operation
/**
 * Deletes an integration account certificate.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param certificateName - The integration account certificate name.
 */
export const IntegrationAccountCertificatesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountCertificatesDeleteInput,
    outputSchema: IntegrationAccountCertificatesDeleteOutput,
  }));
// Input Schema
export const IntegrationAccountCertificatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/certificates/{certificateName}",
    }),
  );
export type IntegrationAccountCertificatesGetInput =
  typeof IntegrationAccountCertificatesGetInput.Type;

// Output Schema
export const IntegrationAccountCertificatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountCertificatesGetOutput =
  typeof IntegrationAccountCertificatesGetOutput.Type;

// The operation
/**
 * Gets an integration account certificate.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param certificateName - The integration account certificate name.
 */
export const IntegrationAccountCertificatesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountCertificatesGetInput,
    outputSchema: IntegrationAccountCertificatesGetOutput,
  }));
// Input Schema
export const IntegrationAccountCertificatesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/certificates",
    }),
  );
export type IntegrationAccountCertificatesListInput =
  typeof IntegrationAccountCertificatesListInput.Type;

// Output Schema
export const IntegrationAccountCertificatesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationAccountCertificatesListOutput =
  typeof IntegrationAccountCertificatesListOutput.Type;

// The operation
/**
 * Gets a list of integration account certificates.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param $top - The number of items to be included in the result.
 */
export const IntegrationAccountCertificatesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountCertificatesListInput,
    outputSchema: IntegrationAccountCertificatesListOutput,
  }));
// Input Schema
export const IntegrationAccountMapsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    mapName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/maps/{mapName}",
    }),
  );
export type IntegrationAccountMapsCreateOrUpdateInput =
  typeof IntegrationAccountMapsCreateOrUpdateInput.Type;

// Output Schema
export const IntegrationAccountMapsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountMapsCreateOrUpdateOutput =
  typeof IntegrationAccountMapsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an integration account map. If the map is larger than 4 MB, you need to store the map in an Azure blob and use the blob's Shared Access Signature (SAS) URL as the 'contentLink' property value.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param mapName - The integration account map name.
 */
export const IntegrationAccountMapsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountMapsCreateOrUpdateInput,
    outputSchema: IntegrationAccountMapsCreateOrUpdateOutput,
  }));
// Input Schema
export const IntegrationAccountMapsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    mapName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/maps/{mapName}",
    }),
  );
export type IntegrationAccountMapsDeleteInput =
  typeof IntegrationAccountMapsDeleteInput.Type;

// Output Schema
export const IntegrationAccountMapsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationAccountMapsDeleteOutput =
  typeof IntegrationAccountMapsDeleteOutput.Type;

// The operation
/**
 * Deletes an integration account map.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param mapName - The integration account map name.
 */
export const IntegrationAccountMapsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountMapsDeleteInput,
    outputSchema: IntegrationAccountMapsDeleteOutput,
  }));
// Input Schema
export const IntegrationAccountMapsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    mapName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/maps/{mapName}",
    }),
  );
export type IntegrationAccountMapsGetInput =
  typeof IntegrationAccountMapsGetInput.Type;

// Output Schema
export const IntegrationAccountMapsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountMapsGetOutput =
  typeof IntegrationAccountMapsGetOutput.Type;

// The operation
/**
 * Gets an integration account map.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param mapName - The integration account map name.
 */
export const IntegrationAccountMapsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationAccountMapsGetInput,
    outputSchema: IntegrationAccountMapsGetOutput,
  }),
);
// Input Schema
export const IntegrationAccountMapsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/maps",
    }),
  );
export type IntegrationAccountMapsListInput =
  typeof IntegrationAccountMapsListInput.Type;

// Output Schema
export const IntegrationAccountMapsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationAccountMapsListOutput =
  typeof IntegrationAccountMapsListOutput.Type;

// The operation
/**
 * Gets a list of integration account maps.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param $top - The number of items to be included in the result.
 * @param $filter - The filter to apply on the operation. Options for filters include: MapType.
 */
export const IntegrationAccountMapsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationAccountMapsListInput,
    outputSchema: IntegrationAccountMapsListOutput,
  }),
);
// Input Schema
export const IntegrationAccountMapsListContentCallbackUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    mapName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/maps/{mapName}/listContentCallbackUrl",
    }),
  );
export type IntegrationAccountMapsListContentCallbackUrlInput =
  typeof IntegrationAccountMapsListContentCallbackUrlInput.Type;

// Output Schema
export const IntegrationAccountMapsListContentCallbackUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.String),
    method: Schema.optional(Schema.String),
    basePath: Schema.optional(Schema.String),
    relativePath: Schema.optional(Schema.String),
    relativePathParameters: Schema.optional(Schema.Array(Schema.String)),
    queries: Schema.optional(
      Schema.Struct({
        "api-version": Schema.optional(Schema.String),
        sp: Schema.optional(Schema.String),
        sv: Schema.optional(Schema.String),
        sig: Schema.optional(Schema.String),
        se: Schema.optional(Schema.String),
      }),
    ),
  });
export type IntegrationAccountMapsListContentCallbackUrlOutput =
  typeof IntegrationAccountMapsListContentCallbackUrlOutput.Type;

// The operation
/**
 * Get the content callback url.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param mapName - The integration account map name.
 */
export const IntegrationAccountMapsListContentCallbackUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountMapsListContentCallbackUrlInput,
    outputSchema: IntegrationAccountMapsListContentCallbackUrlOutput,
  }));
// Input Schema
export const IntegrationAccountPartnersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    partnerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/partners/{partnerName}",
    }),
  );
export type IntegrationAccountPartnersCreateOrUpdateInput =
  typeof IntegrationAccountPartnersCreateOrUpdateInput.Type;

// Output Schema
export const IntegrationAccountPartnersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountPartnersCreateOrUpdateOutput =
  typeof IntegrationAccountPartnersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an integration account partner.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param partnerName - The integration account partner name.
 */
export const IntegrationAccountPartnersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountPartnersCreateOrUpdateInput,
    outputSchema: IntegrationAccountPartnersCreateOrUpdateOutput,
  }));
// Input Schema
export const IntegrationAccountPartnersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    partnerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/partners/{partnerName}",
    }),
  );
export type IntegrationAccountPartnersDeleteInput =
  typeof IntegrationAccountPartnersDeleteInput.Type;

// Output Schema
export const IntegrationAccountPartnersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationAccountPartnersDeleteOutput =
  typeof IntegrationAccountPartnersDeleteOutput.Type;

// The operation
/**
 * Deletes an integration account partner.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param partnerName - The integration account partner name.
 */
export const IntegrationAccountPartnersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountPartnersDeleteInput,
    outputSchema: IntegrationAccountPartnersDeleteOutput,
  }));
// Input Schema
export const IntegrationAccountPartnersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    partnerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/partners/{partnerName}",
    }),
  );
export type IntegrationAccountPartnersGetInput =
  typeof IntegrationAccountPartnersGetInput.Type;

// Output Schema
export const IntegrationAccountPartnersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountPartnersGetOutput =
  typeof IntegrationAccountPartnersGetOutput.Type;

// The operation
/**
 * Gets an integration account partner.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param partnerName - The integration account partner name.
 */
export const IntegrationAccountPartnersGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountPartnersGetInput,
    outputSchema: IntegrationAccountPartnersGetOutput,
  }));
// Input Schema
export const IntegrationAccountPartnersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/partners",
    }),
  );
export type IntegrationAccountPartnersListInput =
  typeof IntegrationAccountPartnersListInput.Type;

// Output Schema
export const IntegrationAccountPartnersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationAccountPartnersListOutput =
  typeof IntegrationAccountPartnersListOutput.Type;

// The operation
/**
 * Gets a list of integration account partners.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param $top - The number of items to be included in the result.
 * @param $filter - The filter to apply on the operation. Options for filters include: PartnerType.
 */
export const IntegrationAccountPartnersList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountPartnersListInput,
    outputSchema: IntegrationAccountPartnersListOutput,
  }));
// Input Schema
export const IntegrationAccountPartnersListContentCallbackUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    partnerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/partners/{partnerName}/listContentCallbackUrl",
    }),
  );
export type IntegrationAccountPartnersListContentCallbackUrlInput =
  typeof IntegrationAccountPartnersListContentCallbackUrlInput.Type;

// Output Schema
export const IntegrationAccountPartnersListContentCallbackUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.String),
    method: Schema.optional(Schema.String),
    basePath: Schema.optional(Schema.String),
    relativePath: Schema.optional(Schema.String),
    relativePathParameters: Schema.optional(Schema.Array(Schema.String)),
    queries: Schema.optional(
      Schema.Struct({
        "api-version": Schema.optional(Schema.String),
        sp: Schema.optional(Schema.String),
        sv: Schema.optional(Schema.String),
        sig: Schema.optional(Schema.String),
        se: Schema.optional(Schema.String),
      }),
    ),
  });
export type IntegrationAccountPartnersListContentCallbackUrlOutput =
  typeof IntegrationAccountPartnersListContentCallbackUrlOutput.Type;

// The operation
/**
 * Get the content callback url.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param partnerName - The integration account partner name.
 */
export const IntegrationAccountPartnersListContentCallbackUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountPartnersListContentCallbackUrlInput,
    outputSchema: IntegrationAccountPartnersListContentCallbackUrlOutput,
  }));
// Input Schema
export const IntegrationAccountSchemasCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/schemas/{schemaName}",
    }),
  );
export type IntegrationAccountSchemasCreateOrUpdateInput =
  typeof IntegrationAccountSchemasCreateOrUpdateInput.Type;

// Output Schema
export const IntegrationAccountSchemasCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountSchemasCreateOrUpdateOutput =
  typeof IntegrationAccountSchemasCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an integration account schema.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param schemaName - The integration account schema name.
 */
export const IntegrationAccountSchemasCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountSchemasCreateOrUpdateInput,
    outputSchema: IntegrationAccountSchemasCreateOrUpdateOutput,
  }));
// Input Schema
export const IntegrationAccountSchemasDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/schemas/{schemaName}",
    }),
  );
export type IntegrationAccountSchemasDeleteInput =
  typeof IntegrationAccountSchemasDeleteInput.Type;

// Output Schema
export const IntegrationAccountSchemasDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationAccountSchemasDeleteOutput =
  typeof IntegrationAccountSchemasDeleteOutput.Type;

// The operation
/**
 * Deletes an integration account schema.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param schemaName - The integration account schema name.
 */
export const IntegrationAccountSchemasDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountSchemasDeleteInput,
    outputSchema: IntegrationAccountSchemasDeleteOutput,
  }));
// Input Schema
export const IntegrationAccountSchemasGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/schemas/{schemaName}",
    }),
  );
export type IntegrationAccountSchemasGetInput =
  typeof IntegrationAccountSchemasGetInput.Type;

// Output Schema
export const IntegrationAccountSchemasGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountSchemasGetOutput =
  typeof IntegrationAccountSchemasGetOutput.Type;

// The operation
/**
 * Gets an integration account schema.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param schemaName - The integration account schema name.
 */
export const IntegrationAccountSchemasGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountSchemasGetInput,
    outputSchema: IntegrationAccountSchemasGetOutput,
  }));
// Input Schema
export const IntegrationAccountSchemasListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/schemas",
    }),
  );
export type IntegrationAccountSchemasListInput =
  typeof IntegrationAccountSchemasListInput.Type;

// Output Schema
export const IntegrationAccountSchemasListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationAccountSchemasListOutput =
  typeof IntegrationAccountSchemasListOutput.Type;

// The operation
/**
 * Gets a list of integration account schemas.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param $top - The number of items to be included in the result.
 * @param $filter - The filter to apply on the operation. Options for filters include: SchemaType.
 */
export const IntegrationAccountSchemasList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountSchemasListInput,
    outputSchema: IntegrationAccountSchemasListOutput,
  }));
// Input Schema
export const IntegrationAccountSchemasListContentCallbackUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/schemas/{schemaName}/listContentCallbackUrl",
    }),
  );
export type IntegrationAccountSchemasListContentCallbackUrlInput =
  typeof IntegrationAccountSchemasListContentCallbackUrlInput.Type;

// Output Schema
export const IntegrationAccountSchemasListContentCallbackUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.String),
    method: Schema.optional(Schema.String),
    basePath: Schema.optional(Schema.String),
    relativePath: Schema.optional(Schema.String),
    relativePathParameters: Schema.optional(Schema.Array(Schema.String)),
    queries: Schema.optional(
      Schema.Struct({
        "api-version": Schema.optional(Schema.String),
        sp: Schema.optional(Schema.String),
        sv: Schema.optional(Schema.String),
        sig: Schema.optional(Schema.String),
        se: Schema.optional(Schema.String),
      }),
    ),
  });
export type IntegrationAccountSchemasListContentCallbackUrlOutput =
  typeof IntegrationAccountSchemasListContentCallbackUrlOutput.Type;

// The operation
/**
 * Get the content callback url.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param schemaName - The integration account schema name.
 */
export const IntegrationAccountSchemasListContentCallbackUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountSchemasListContentCallbackUrlInput,
    outputSchema: IntegrationAccountSchemasListContentCallbackUrlOutput,
  }));
// Input Schema
export const IntegrationAccountsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}",
    }),
  );
export type IntegrationAccountsCreateOrUpdateInput =
  typeof IntegrationAccountsCreateOrUpdateInput.Type;

// Output Schema
export const IntegrationAccountsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountsCreateOrUpdateOutput =
  typeof IntegrationAccountsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 */
export const IntegrationAccountsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountsCreateOrUpdateInput,
    outputSchema: IntegrationAccountsCreateOrUpdateOutput,
  }));
// Input Schema
export const IntegrationAccountsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}",
    }),
  );
export type IntegrationAccountsDeleteInput =
  typeof IntegrationAccountsDeleteInput.Type;

// Output Schema
export const IntegrationAccountsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationAccountsDeleteOutput =
  typeof IntegrationAccountsDeleteOutput.Type;

// The operation
/**
 * Deletes an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 */
export const IntegrationAccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationAccountsDeleteInput,
    outputSchema: IntegrationAccountsDeleteOutput,
  }),
);
// Input Schema
export const IntegrationAccountSessionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    sessionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/sessions/{sessionName}",
    }),
  );
export type IntegrationAccountSessionsCreateOrUpdateInput =
  typeof IntegrationAccountSessionsCreateOrUpdateInput.Type;

// Output Schema
export const IntegrationAccountSessionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountSessionsCreateOrUpdateOutput =
  typeof IntegrationAccountSessionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an integration account session.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param sessionName - The integration account session name.
 */
export const IntegrationAccountSessionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountSessionsCreateOrUpdateInput,
    outputSchema: IntegrationAccountSessionsCreateOrUpdateOutput,
  }));
// Input Schema
export const IntegrationAccountSessionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    sessionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/sessions/{sessionName}",
    }),
  );
export type IntegrationAccountSessionsDeleteInput =
  typeof IntegrationAccountSessionsDeleteInput.Type;

// Output Schema
export const IntegrationAccountSessionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationAccountSessionsDeleteOutput =
  typeof IntegrationAccountSessionsDeleteOutput.Type;

// The operation
/**
 * Deletes an integration account session.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param sessionName - The integration account session name.
 */
export const IntegrationAccountSessionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountSessionsDeleteInput,
    outputSchema: IntegrationAccountSessionsDeleteOutput,
  }));
// Input Schema
export const IntegrationAccountSessionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    sessionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/sessions/{sessionName}",
    }),
  );
export type IntegrationAccountSessionsGetInput =
  typeof IntegrationAccountSessionsGetInput.Type;

// Output Schema
export const IntegrationAccountSessionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountSessionsGetOutput =
  typeof IntegrationAccountSessionsGetOutput.Type;

// The operation
/**
 * Gets an integration account session.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param sessionName - The integration account session name.
 */
export const IntegrationAccountSessionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountSessionsGetInput,
    outputSchema: IntegrationAccountSessionsGetOutput,
  }));
// Input Schema
export const IntegrationAccountSessionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/sessions",
    }),
  );
export type IntegrationAccountSessionsListInput =
  typeof IntegrationAccountSessionsListInput.Type;

// Output Schema
export const IntegrationAccountSessionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationAccountSessionsListOutput =
  typeof IntegrationAccountSessionsListOutput.Type;

// The operation
/**
 * Gets a list of integration account sessions.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 * @param $top - The number of items to be included in the result.
 * @param $filter - The filter to apply on the operation. Options for filters include: ChangedTime.
 */
export const IntegrationAccountSessionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountSessionsListInput,
    outputSchema: IntegrationAccountSessionsListOutput,
  }));
// Input Schema
export const IntegrationAccountsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}",
    }),
  );
export type IntegrationAccountsGetInput =
  typeof IntegrationAccountsGetInput.Type;

// Output Schema
export const IntegrationAccountsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountsGetOutput =
  typeof IntegrationAccountsGetOutput.Type;

// The operation
/**
 * Gets an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 */
export const IntegrationAccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationAccountsGetInput,
    outputSchema: IntegrationAccountsGetOutput,
  }),
);
// Input Schema
export const IntegrationAccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts",
    }),
  );
export type IntegrationAccountsListByResourceGroupInput =
  typeof IntegrationAccountsListByResourceGroupInput.Type;

// Output Schema
export const IntegrationAccountsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationAccountsListByResourceGroupOutput =
  typeof IntegrationAccountsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of integration accounts by resource group.
 *
 * @param resourceGroupName - The resource group name.
 * @param $top - The number of items to be included in the result.
 */
export const IntegrationAccountsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountsListByResourceGroupInput,
    outputSchema: IntegrationAccountsListByResourceGroupOutput,
  }));
// Input Schema
export const IntegrationAccountsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Logic/integrationAccounts",
    }),
  );
export type IntegrationAccountsListBySubscriptionInput =
  typeof IntegrationAccountsListBySubscriptionInput.Type;

// Output Schema
export const IntegrationAccountsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationAccountsListBySubscriptionOutput =
  typeof IntegrationAccountsListBySubscriptionOutput.Type;

// The operation
/**
 * Gets a list of integration accounts by subscription.
 *
 * @param $top - The number of items to be included in the result.
 */
export const IntegrationAccountsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountsListBySubscriptionInput,
    outputSchema: IntegrationAccountsListBySubscriptionOutput,
  }));
// Input Schema
export const IntegrationAccountsListCallbackUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/listCallbackUrl",
    }),
  );
export type IntegrationAccountsListCallbackUrlInput =
  typeof IntegrationAccountsListCallbackUrlInput.Type;

// Output Schema
export const IntegrationAccountsListCallbackUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.String),
  });
export type IntegrationAccountsListCallbackUrlOutput =
  typeof IntegrationAccountsListCallbackUrlOutput.Type;

// The operation
/**
 * Gets the integration account callback URL.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 */
export const IntegrationAccountsListCallbackUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountsListCallbackUrlInput,
    outputSchema: IntegrationAccountsListCallbackUrlOutput,
  }));
// Input Schema
export const IntegrationAccountsListKeyVaultKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/listKeyVaultKeys",
    }),
  );
export type IntegrationAccountsListKeyVaultKeysInput =
  typeof IntegrationAccountsListKeyVaultKeysInput.Type;

// Output Schema
export const IntegrationAccountsListKeyVaultKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          kid: Schema.optional(Schema.String),
          attributes: Schema.optional(
            Schema.Struct({
              enabled: Schema.optional(Schema.Boolean),
              created: Schema.optional(Schema.Number),
              updated: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
    skipToken: Schema.optional(Schema.String),
  });
export type IntegrationAccountsListKeyVaultKeysOutput =
  typeof IntegrationAccountsListKeyVaultKeysOutput.Type;

// The operation
/**
 * Gets the integration account's Key Vault keys.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 */
export const IntegrationAccountsListKeyVaultKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountsListKeyVaultKeysInput,
    outputSchema: IntegrationAccountsListKeyVaultKeysOutput,
  }));
// Input Schema
export const IntegrationAccountsLogTrackingEventsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/logTrackingEvents",
    }),
  );
export type IntegrationAccountsLogTrackingEventsInput =
  typeof IntegrationAccountsLogTrackingEventsInput.Type;

// Output Schema
export const IntegrationAccountsLogTrackingEventsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationAccountsLogTrackingEventsOutput =
  typeof IntegrationAccountsLogTrackingEventsOutput.Type;

// The operation
/**
 * Logs the integration account's tracking events.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 */
export const IntegrationAccountsLogTrackingEvents =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountsLogTrackingEventsInput,
    outputSchema: IntegrationAccountsLogTrackingEventsOutput,
  }));
// Input Schema
export const IntegrationAccountsRegenerateAccessKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/regenerateAccessKey",
    }),
  );
export type IntegrationAccountsRegenerateAccessKeyInput =
  typeof IntegrationAccountsRegenerateAccessKeyInput.Type;

// Output Schema
export const IntegrationAccountsRegenerateAccessKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountsRegenerateAccessKeyOutput =
  typeof IntegrationAccountsRegenerateAccessKeyOutput.Type;

// The operation
/**
 * Regenerates the integration account access key.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 */
export const IntegrationAccountsRegenerateAccessKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationAccountsRegenerateAccessKeyInput,
    outputSchema: IntegrationAccountsRegenerateAccessKeyOutput,
  }));
// Input Schema
export const IntegrationAccountsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    integrationAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}",
    }),
  );
export type IntegrationAccountsUpdateInput =
  typeof IntegrationAccountsUpdateInput.Type;

// Output Schema
export const IntegrationAccountsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationAccountsUpdateOutput =
  typeof IntegrationAccountsUpdateOutput.Type;

// The operation
/**
 * Updates an integration account.
 *
 * @param resourceGroupName - The resource group name.
 * @param integrationAccountName - The integration account name.
 */
export const IntegrationAccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationAccountsUpdateInput,
    outputSchema: IntegrationAccountsUpdateOutput,
  }),
);
// Input Schema
export const IntegrationServiceEnvironmentManagedApiOperationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}/managedApis/{apiName}/apiOperations",
    }),
  );
export type IntegrationServiceEnvironmentManagedApiOperationsListInput =
  typeof IntegrationServiceEnvironmentManagedApiOperationsListInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentManagedApiOperationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationServiceEnvironmentManagedApiOperationsListOutput =
  typeof IntegrationServiceEnvironmentManagedApiOperationsListOutput.Type;

// The operation
/**
 * Gets the managed Api operations.
 *
 * @param resourceGroup - The resource group.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 * @param apiName - The api name.
 */
export const IntegrationServiceEnvironmentManagedApiOperationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentManagedApiOperationsListInput,
    outputSchema: IntegrationServiceEnvironmentManagedApiOperationsListOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentManagedApisDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}/managedApis/{apiName}",
    }),
  );
export type IntegrationServiceEnvironmentManagedApisDeleteInput =
  typeof IntegrationServiceEnvironmentManagedApisDeleteInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentManagedApisDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationServiceEnvironmentManagedApisDeleteOutput =
  typeof IntegrationServiceEnvironmentManagedApisDeleteOutput.Type;

// The operation
/**
 * Deletes the integration service environment managed Api.
 *
 * @param resourceGroup - The resource group.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 * @param apiName - The api name.
 */
export const IntegrationServiceEnvironmentManagedApisDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentManagedApisDeleteInput,
    outputSchema: IntegrationServiceEnvironmentManagedApisDeleteOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentManagedApisGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}/managedApis/{apiName}",
    }),
  );
export type IntegrationServiceEnvironmentManagedApisGetInput =
  typeof IntegrationServiceEnvironmentManagedApisGetInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentManagedApisGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationServiceEnvironmentManagedApisGetOutput =
  typeof IntegrationServiceEnvironmentManagedApisGetOutput.Type;

// The operation
/**
 * Gets the integration service environment managed Api.
 *
 * @param resourceGroup - The resource group name.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 * @param apiName - The api name.
 */
export const IntegrationServiceEnvironmentManagedApisGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentManagedApisGetInput,
    outputSchema: IntegrationServiceEnvironmentManagedApisGetOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentManagedApisListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}/managedApis",
    }),
  );
export type IntegrationServiceEnvironmentManagedApisListInput =
  typeof IntegrationServiceEnvironmentManagedApisListInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentManagedApisListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationServiceEnvironmentManagedApisListOutput =
  typeof IntegrationServiceEnvironmentManagedApisListOutput.Type;

// The operation
/**
 * Gets the integration service environment managed Apis.
 *
 * @param resourceGroup - The resource group.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 */
export const IntegrationServiceEnvironmentManagedApisList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentManagedApisListInput,
    outputSchema: IntegrationServiceEnvironmentManagedApisListOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentManagedApisPutInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
    apiName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}/managedApis/{apiName}",
    }),
  );
export type IntegrationServiceEnvironmentManagedApisPutInput =
  typeof IntegrationServiceEnvironmentManagedApisPutInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentManagedApisPutOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationServiceEnvironmentManagedApisPutOutput =
  typeof IntegrationServiceEnvironmentManagedApisPutOutput.Type;

// The operation
/**
 * Puts the integration service environment managed Api.
 *
 * @param resourceGroup - The resource group name.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 * @param apiName - The api name.
 */
export const IntegrationServiceEnvironmentManagedApisPut =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentManagedApisPutInput,
    outputSchema: IntegrationServiceEnvironmentManagedApisPutOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentNetworkHealthGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}/health/network",
    }),
  );
export type IntegrationServiceEnvironmentNetworkHealthGetInput =
  typeof IntegrationServiceEnvironmentNetworkHealthGetInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentNetworkHealthGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Record(
    Schema.String,
    Schema.Struct({
      outboundNetworkDependencies: Schema.optional(
        Schema.Array(
          Schema.Struct({
            category: Schema.optional(
              Schema.Literals([
                "NotSpecified",
                "AzureStorage",
                "AzureManagement",
                "AzureActiveDirectory",
                "SSLCertificateVerification",
                "DiagnosticLogsAndMetrics",
                "IntegrationServiceEnvironmentConnectors",
                "RedisCache",
                "AccessEndpoints",
                "RecoveryService",
                "SQL",
                "RegionalService",
              ]),
            ),
            displayName: Schema.optional(Schema.String),
            endpoints: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  accessibility: Schema.optional(
                    Schema.Literals([
                      "NotSpecified",
                      "Unknown",
                      "Available",
                      "NotAvailable",
                    ]),
                  ),
                  domainName: Schema.optional(Schema.String),
                  ports: Schema.optional(Schema.Array(Schema.String)),
                }),
              ),
            ),
          }),
        ),
      ),
      outboundNetworkHealth: Schema.optional(
        Schema.Struct({
          error: Schema.optional(
            Schema.Struct({
              code: Schema.Literals([
                "NotSpecified",
                "IntegrationServiceEnvironmentNotFound",
                "InternalServerError",
                "InvalidOperationId",
              ]),
              message: Schema.String,
              details: Schema.optional(Schema.Array(Schema.Unknown)),
              innerError: Schema.optional(Schema.Struct({})),
            }),
          ),
          state: Schema.optional(
            Schema.Literals([
              "NotSpecified",
              "Healthy",
              "Unhealthy",
              "Unknown",
            ]),
          ),
        }),
      ),
      networkDependencyHealthState: Schema.Literals([
        "NotSpecified",
        "Unknown",
        "Available",
        "NotAvailable",
      ]),
    }),
  );
export type IntegrationServiceEnvironmentNetworkHealthGetOutput =
  typeof IntegrationServiceEnvironmentNetworkHealthGetOutput.Type;

// The operation
/**
 * Gets the integration service environment network health.
 *
 * @param resourceGroup - The resource group.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 */
export const IntegrationServiceEnvironmentNetworkHealthGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentNetworkHealthGetInput,
    outputSchema: IntegrationServiceEnvironmentNetworkHealthGetOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}",
    }),
  );
export type IntegrationServiceEnvironmentsCreateOrUpdateInput =
  typeof IntegrationServiceEnvironmentsCreateOrUpdateInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationServiceEnvironmentsCreateOrUpdateOutput =
  typeof IntegrationServiceEnvironmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an integration service environment.
 *
 * @param resourceGroup - The resource group.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 */
export const IntegrationServiceEnvironmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentsCreateOrUpdateInput,
    outputSchema: IntegrationServiceEnvironmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}",
    }),
  );
export type IntegrationServiceEnvironmentsDeleteInput =
  typeof IntegrationServiceEnvironmentsDeleteInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationServiceEnvironmentsDeleteOutput =
  typeof IntegrationServiceEnvironmentsDeleteOutput.Type;

// The operation
/**
 * Deletes an integration service environment.
 *
 * @param resourceGroup - The resource group.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 */
export const IntegrationServiceEnvironmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentsDeleteInput,
    outputSchema: IntegrationServiceEnvironmentsDeleteOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}",
    }),
  );
export type IntegrationServiceEnvironmentsGetInput =
  typeof IntegrationServiceEnvironmentsGetInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationServiceEnvironmentsGetOutput =
  typeof IntegrationServiceEnvironmentsGetOutput.Type;

// The operation
/**
 * Gets an integration service environment.
 *
 * @param resourceGroup - The resource group.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 */
export const IntegrationServiceEnvironmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentsGetInput,
    outputSchema: IntegrationServiceEnvironmentsGetOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentSkusListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}/skus",
    }),
  );
export type IntegrationServiceEnvironmentSkusListInput =
  typeof IntegrationServiceEnvironmentSkusListInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentSkusListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.optional(
                Schema.Literals(["NotSpecified", "Premium", "Developer"]),
              ),
              tier: Schema.optional(Schema.String),
            }),
          ),
          capacity: Schema.optional(
            Schema.Struct({
              minimum: Schema.optional(Schema.Number),
              maximum: Schema.optional(Schema.Number),
              default: Schema.optional(Schema.Number),
              scaleType: Schema.optional(
                Schema.Literals(["Manual", "Automatic", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationServiceEnvironmentSkusListOutput =
  typeof IntegrationServiceEnvironmentSkusListOutput.Type;

// The operation
/**
 * Gets a list of integration service environment Skus.
 *
 * @param resourceGroup - The resource group.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 */
export const IntegrationServiceEnvironmentSkusList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentSkusListInput,
    outputSchema: IntegrationServiceEnvironmentSkusListOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments",
    }),
  );
export type IntegrationServiceEnvironmentsListByResourceGroupInput =
  typeof IntegrationServiceEnvironmentsListByResourceGroupInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationServiceEnvironmentsListByResourceGroupOutput =
  typeof IntegrationServiceEnvironmentsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of integration service environments by resource group.
 *
 * @param resourceGroup - The resource group.
 * @param $top - The number of items to be included in the result.
 */
export const IntegrationServiceEnvironmentsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentsListByResourceGroupInput,
    outputSchema: IntegrationServiceEnvironmentsListByResourceGroupOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Logic/integrationServiceEnvironments",
    }),
  );
export type IntegrationServiceEnvironmentsListBySubscriptionInput =
  typeof IntegrationServiceEnvironmentsListBySubscriptionInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationServiceEnvironmentsListBySubscriptionOutput =
  typeof IntegrationServiceEnvironmentsListBySubscriptionOutput.Type;

// The operation
/**
 * Gets a list of integration service environments by subscription.
 *
 * @param $top - The number of items to be included in the result.
 */
export const IntegrationServiceEnvironmentsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentsListBySubscriptionInput,
    outputSchema: IntegrationServiceEnvironmentsListBySubscriptionOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentsRestartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}/restart",
    }),
  );
export type IntegrationServiceEnvironmentsRestartInput =
  typeof IntegrationServiceEnvironmentsRestartInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentsRestartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationServiceEnvironmentsRestartOutput =
  typeof IntegrationServiceEnvironmentsRestartOutput.Type;

// The operation
/**
 * Restarts an integration service environment.
 *
 * @param resourceGroup - The resource group.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 */
export const IntegrationServiceEnvironmentsRestart =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentsRestartInput,
    outputSchema: IntegrationServiceEnvironmentsRestartOutput,
  }));
// Input Schema
export const IntegrationServiceEnvironmentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroup: Schema.String.pipe(T.PathParam()),
    integrationServiceEnvironmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}",
    }),
  );
export type IntegrationServiceEnvironmentsUpdateInput =
  typeof IntegrationServiceEnvironmentsUpdateInput.Type;

// Output Schema
export const IntegrationServiceEnvironmentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type IntegrationServiceEnvironmentsUpdateOutput =
  typeof IntegrationServiceEnvironmentsUpdateOutput.Type;

// The operation
/**
 * Updates an integration service environment.
 *
 * @param resourceGroup - The resource group.
 * @param integrationServiceEnvironmentName - The integration service environment name.
 */
export const IntegrationServiceEnvironmentsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationServiceEnvironmentsUpdateInput,
    outputSchema: IntegrationServiceEnvironmentsUpdateOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Logic/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        origin: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
          }),
        ),
        properties: Schema.optional(Schema.Struct({})),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Logic REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const WorkflowRunActionRepetitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    actionName: Schema.String.pipe(T.PathParam()),
    repetitionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}",
    }),
  );
export type WorkflowRunActionRepetitionsGetInput =
  typeof WorkflowRunActionRepetitionsGetInput.Type;

// Output Schema
export const WorkflowRunActionRepetitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type WorkflowRunActionRepetitionsGetOutput =
  typeof WorkflowRunActionRepetitionsGetOutput.Type;

// The operation
/**
 * Get a workflow run action repetition.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param actionName - The workflow action name.
 * @param repetitionName - The workflow repetition.
 */
export const WorkflowRunActionRepetitionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowRunActionRepetitionsGetInput,
    outputSchema: WorkflowRunActionRepetitionsGetOutput,
  }));
// Input Schema
export const WorkflowRunActionRepetitionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    actionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions",
    }),
  );
export type WorkflowRunActionRepetitionsListInput =
  typeof WorkflowRunActionRepetitionsListInput.Type;

// Output Schema
export const WorkflowRunActionRepetitionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
  });
export type WorkflowRunActionRepetitionsListOutput =
  typeof WorkflowRunActionRepetitionsListOutput.Type;

// The operation
/**
 * Get all of a workflow run action repetitions.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param actionName - The workflow action name.
 */
export const WorkflowRunActionRepetitionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowRunActionRepetitionsListInput,
    outputSchema: WorkflowRunActionRepetitionsListOutput,
  }));
// Input Schema
export const WorkflowRunActionRepetitionsListExpressionTracesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    actionName: Schema.String.pipe(T.PathParam()),
    repetitionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}/listExpressionTraces",
    }),
  );
export type WorkflowRunActionRepetitionsListExpressionTracesInput =
  typeof WorkflowRunActionRepetitionsListExpressionTracesInput.Type;

// Output Schema
export const WorkflowRunActionRepetitionsListExpressionTracesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    inputs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          text: Schema.optional(Schema.String),
          value: Schema.optional(Schema.Unknown),
          subexpressions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                text: Schema.optional(Schema.String),
                value: Schema.optional(Schema.Unknown),
                subexpressions: Schema.optional(Schema.Array(Schema.Unknown)),
                error: Schema.optional(
                  Schema.Struct({
                    code: Schema.String,
                  }),
                ),
              }),
            ),
          ),
          error: Schema.optional(
            Schema.Struct({
              code: Schema.String,
            }),
          ),
        }),
      ),
    ),
  });
export type WorkflowRunActionRepetitionsListExpressionTracesOutput =
  typeof WorkflowRunActionRepetitionsListExpressionTracesOutput.Type;

// The operation
/**
 * Lists a workflow run expression trace.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param actionName - The workflow action name.
 * @param repetitionName - The workflow repetition.
 */
export const WorkflowRunActionRepetitionsListExpressionTraces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowRunActionRepetitionsListExpressionTracesInput,
    outputSchema: WorkflowRunActionRepetitionsListExpressionTracesOutput,
  }));
// Input Schema
export const WorkflowRunActionRepetitionsRequestHistoriesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    actionName: Schema.String.pipe(T.PathParam()),
    repetitionName: Schema.String.pipe(T.PathParam()),
    requestHistoryName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}/requestHistories/{requestHistoryName}",
    }),
  );
export type WorkflowRunActionRepetitionsRequestHistoriesGetInput =
  typeof WorkflowRunActionRepetitionsRequestHistoriesGetInput.Type;

// Output Schema
export const WorkflowRunActionRepetitionsRequestHistoriesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type WorkflowRunActionRepetitionsRequestHistoriesGetOutput =
  typeof WorkflowRunActionRepetitionsRequestHistoriesGetOutput.Type;

// The operation
/**
 * Gets a workflow run repetition request history.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param actionName - The workflow action name.
 * @param repetitionName - The workflow repetition.
 * @param requestHistoryName - The request history name.
 */
export const WorkflowRunActionRepetitionsRequestHistoriesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowRunActionRepetitionsRequestHistoriesGetInput,
    outputSchema: WorkflowRunActionRepetitionsRequestHistoriesGetOutput,
  }));
// Input Schema
export const WorkflowRunActionRepetitionsRequestHistoriesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    actionName: Schema.String.pipe(T.PathParam()),
    repetitionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}/requestHistories",
    }),
  );
export type WorkflowRunActionRepetitionsRequestHistoriesListInput =
  typeof WorkflowRunActionRepetitionsRequestHistoriesListInput.Type;

// Output Schema
export const WorkflowRunActionRepetitionsRequestHistoriesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkflowRunActionRepetitionsRequestHistoriesListOutput =
  typeof WorkflowRunActionRepetitionsRequestHistoriesListOutput.Type;

// The operation
/**
 * List a workflow run repetition request history.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param actionName - The workflow action name.
 * @param repetitionName - The workflow repetition.
 */
export const WorkflowRunActionRepetitionsRequestHistoriesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowRunActionRepetitionsRequestHistoriesListInput,
    outputSchema: WorkflowRunActionRepetitionsRequestHistoriesListOutput,
  }));
// Input Schema
export const WorkflowRunActionRequestHistoriesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    actionName: Schema.String.pipe(T.PathParam()),
    requestHistoryName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/requestHistories/{requestHistoryName}",
    }),
  );
export type WorkflowRunActionRequestHistoriesGetInput =
  typeof WorkflowRunActionRequestHistoriesGetInput.Type;

// Output Schema
export const WorkflowRunActionRequestHistoriesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type WorkflowRunActionRequestHistoriesGetOutput =
  typeof WorkflowRunActionRequestHistoriesGetOutput.Type;

// The operation
/**
 * Gets a workflow run request history.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param actionName - The workflow action name.
 * @param requestHistoryName - The request history name.
 */
export const WorkflowRunActionRequestHistoriesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowRunActionRequestHistoriesGetInput,
    outputSchema: WorkflowRunActionRequestHistoriesGetOutput,
  }));
// Input Schema
export const WorkflowRunActionRequestHistoriesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    actionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/requestHistories",
    }),
  );
export type WorkflowRunActionRequestHistoriesListInput =
  typeof WorkflowRunActionRequestHistoriesListInput.Type;

// Output Schema
export const WorkflowRunActionRequestHistoriesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkflowRunActionRequestHistoriesListOutput =
  typeof WorkflowRunActionRequestHistoriesListOutput.Type;

// The operation
/**
 * List a workflow run request history.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param actionName - The workflow action name.
 */
export const WorkflowRunActionRequestHistoriesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowRunActionRequestHistoriesListInput,
    outputSchema: WorkflowRunActionRequestHistoriesListOutput,
  }));
// Input Schema
export const WorkflowRunActionScopeRepetitionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    actionName: Schema.String.pipe(T.PathParam()),
    repetitionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/scopeRepetitions/{repetitionName}",
    }),
  );
export type WorkflowRunActionScopeRepetitionsGetInput =
  typeof WorkflowRunActionScopeRepetitionsGetInput.Type;

// Output Schema
export const WorkflowRunActionScopeRepetitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type WorkflowRunActionScopeRepetitionsGetOutput =
  typeof WorkflowRunActionScopeRepetitionsGetOutput.Type;

// The operation
/**
 * Get a workflow run action scoped repetition.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param actionName - The workflow action name.
 * @param repetitionName - The workflow repetition.
 */
export const WorkflowRunActionScopeRepetitionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowRunActionScopeRepetitionsGetInput,
    outputSchema: WorkflowRunActionScopeRepetitionsGetOutput,
  }));
// Input Schema
export const WorkflowRunActionScopeRepetitionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    actionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/scopeRepetitions",
    }),
  );
export type WorkflowRunActionScopeRepetitionsListInput =
  typeof WorkflowRunActionScopeRepetitionsListInput.Type;

// Output Schema
export const WorkflowRunActionScopeRepetitionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
  });
export type WorkflowRunActionScopeRepetitionsListOutput =
  typeof WorkflowRunActionScopeRepetitionsListOutput.Type;

// The operation
/**
 * List the workflow run action scoped repetitions.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param actionName - The workflow action name.
 */
export const WorkflowRunActionScopeRepetitionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowRunActionScopeRepetitionsListInput,
    outputSchema: WorkflowRunActionScopeRepetitionsListOutput,
  }));
// Input Schema
export const WorkflowRunActionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    actionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}",
    }),
  );
export type WorkflowRunActionsGetInput = typeof WorkflowRunActionsGetInput.Type;

// Output Schema
export const WorkflowRunActionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
  });
export type WorkflowRunActionsGetOutput =
  typeof WorkflowRunActionsGetOutput.Type;

// The operation
/**
 * Gets a workflow run action.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param actionName - The workflow action name.
 */
export const WorkflowRunActionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowRunActionsGetInput,
    outputSchema: WorkflowRunActionsGetOutput,
  }),
);
// Input Schema
export const WorkflowRunActionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions",
    }),
  );
export type WorkflowRunActionsListInput =
  typeof WorkflowRunActionsListInput.Type;

// Output Schema
export const WorkflowRunActionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkflowRunActionsListOutput =
  typeof WorkflowRunActionsListOutput.Type;

// The operation
/**
 * Gets a list of workflow run actions.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param $top - The number of items to be included in the result.
 * @param $filter - The filter to apply on the operation. Options for filters include: Status.
 */
export const WorkflowRunActionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowRunActionsListInput,
    outputSchema: WorkflowRunActionsListOutput,
  }),
);
// Input Schema
export const WorkflowRunActionsListExpressionTracesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    actionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/listExpressionTraces",
    }),
  );
export type WorkflowRunActionsListExpressionTracesInput =
  typeof WorkflowRunActionsListExpressionTracesInput.Type;

// Output Schema
export const WorkflowRunActionsListExpressionTracesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    inputs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          text: Schema.optional(Schema.String),
          value: Schema.optional(Schema.Unknown),
          subexpressions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                text: Schema.optional(Schema.String),
                value: Schema.optional(Schema.Unknown),
                subexpressions: Schema.optional(Schema.Array(Schema.Unknown)),
                error: Schema.optional(
                  Schema.Struct({
                    code: Schema.String,
                  }),
                ),
              }),
            ),
          ),
          error: Schema.optional(
            Schema.Struct({
              code: Schema.String,
            }),
          ),
        }),
      ),
    ),
  });
export type WorkflowRunActionsListExpressionTracesOutput =
  typeof WorkflowRunActionsListExpressionTracesOutput.Type;

// The operation
/**
 * Lists a workflow run expression trace.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param actionName - The workflow action name.
 */
export const WorkflowRunActionsListExpressionTraces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowRunActionsListExpressionTracesInput,
    outputSchema: WorkflowRunActionsListExpressionTracesOutput,
  }));
// Input Schema
export const WorkflowRunOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/operations/{operationId}",
    }),
  );
export type WorkflowRunOperationsGetInput =
  typeof WorkflowRunOperationsGetInput.Type;

// Output Schema
export const WorkflowRunOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
  });
export type WorkflowRunOperationsGetOutput =
  typeof WorkflowRunOperationsGetOutput.Type;

// The operation
/**
 * Gets an operation for a run.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 * @param operationId - The workflow operation id.
 */
export const WorkflowRunOperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowRunOperationsGetInput,
    outputSchema: WorkflowRunOperationsGetOutput,
  }),
);
// Input Schema
export const WorkflowRunsCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    runName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/cancel",
    }),
  );
export type WorkflowRunsCancelInput = typeof WorkflowRunsCancelInput.Type;

// Output Schema
export const WorkflowRunsCancelOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowRunsCancelOutput = typeof WorkflowRunsCancelOutput.Type;

// The operation
/**
 * Cancels a workflow run.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 */
export const WorkflowRunsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowRunsCancelInput,
  outputSchema: WorkflowRunsCancelOutput,
}));
// Input Schema
export const WorkflowRunsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
  runName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}",
  }),
);
export type WorkflowRunsGetInput = typeof WorkflowRunsGetInput.Type;

// Output Schema
export const WorkflowRunsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
});
export type WorkflowRunsGetOutput = typeof WorkflowRunsGetOutput.Type;

// The operation
/**
 * Gets a workflow run.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param runName - The workflow run name.
 */
export const WorkflowRunsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowRunsGetInput,
  outputSchema: WorkflowRunsGetOutput,
}));
// Input Schema
export const WorkflowRunsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
  $top: Schema.optional(Schema.Number),
  $filter: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs",
  }),
);
export type WorkflowRunsListInput = typeof WorkflowRunsListInput.Type;

// Output Schema
export const WorkflowRunsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  },
);
export type WorkflowRunsListOutput = typeof WorkflowRunsListOutput.Type;

// The operation
/**
 * Gets a list of workflow runs.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param $top - The number of items to be included in the result.
 * @param $filter - The filter to apply on the operation. Options for filters include: Status, StartTime, and ClientTrackingId.
 */
export const WorkflowRunsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowRunsListInput,
  outputSchema: WorkflowRunsListOutput,
}));
// Input Schema
export const WorkflowsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}",
    }),
  );
export type WorkflowsCreateOrUpdateInput =
  typeof WorkflowsCreateOrUpdateInput.Type;

// Output Schema
export const WorkflowsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type WorkflowsCreateOrUpdateOutput =
  typeof WorkflowsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a workflow.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowsCreateOrUpdateInput,
    outputSchema: WorkflowsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WorkflowsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}",
  }),
);
export type WorkflowsDeleteInput = typeof WorkflowsDeleteInput.Type;

// Output Schema
export const WorkflowsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowsDeleteOutput = typeof WorkflowsDeleteOutput.Type;

// The operation
/**
 * Deletes a workflow.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowsDeleteInput,
  outputSchema: WorkflowsDeleteOutput,
}));
// Input Schema
export const WorkflowsDisableInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/disable",
  }),
);
export type WorkflowsDisableInput = typeof WorkflowsDisableInput.Type;

// Output Schema
export const WorkflowsDisableOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowsDisableOutput = typeof WorkflowsDisableOutput.Type;

// The operation
/**
 * Disables a workflow.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsDisable = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowsDisableInput,
  outputSchema: WorkflowsDisableOutput,
}));
// Input Schema
export const WorkflowsEnableInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/enable",
  }),
);
export type WorkflowsEnableInput = typeof WorkflowsEnableInput.Type;

// Output Schema
export const WorkflowsEnableOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowsEnableOutput = typeof WorkflowsEnableOutput.Type;

// The operation
/**
 * Enables a workflow.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsEnable = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowsEnableInput,
  outputSchema: WorkflowsEnableOutput,
}));
// Input Schema
export const WorkflowsGenerateUpgradedDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/generateUpgradedDefinition",
    }),
  );
export type WorkflowsGenerateUpgradedDefinitionInput =
  typeof WorkflowsGenerateUpgradedDefinitionInput.Type;

// Output Schema
export const WorkflowsGenerateUpgradedDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkflowsGenerateUpgradedDefinitionOutput =
  typeof WorkflowsGenerateUpgradedDefinitionOutput.Type;

// The operation
/**
 * Generates the upgraded definition for a workflow.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsGenerateUpgradedDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowsGenerateUpgradedDefinitionInput,
    outputSchema: WorkflowsGenerateUpgradedDefinitionOutput,
  }));
// Input Schema
export const WorkflowsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}",
  }),
);
export type WorkflowsGetInput = typeof WorkflowsGetInput.Type;

// Output Schema
export const WorkflowsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type WorkflowsGetOutput = typeof WorkflowsGetOutput.Type;

// The operation
/**
 * Gets a workflow.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowsGetInput,
  outputSchema: WorkflowsGetOutput,
}));
// Input Schema
export const WorkflowsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows",
    }),
  );
export type WorkflowsListByResourceGroupInput =
  typeof WorkflowsListByResourceGroupInput.Type;

// Output Schema
export const WorkflowsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkflowsListByResourceGroupOutput =
  typeof WorkflowsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of workflows by resource group.
 *
 * @param resourceGroupName - The resource group name.
 * @param $top - The number of items to be included in the result.
 * @param $filter - The filter to apply on the operation. Options for filters include: State, Trigger, and ReferencedResourceId.
 */
export const WorkflowsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowsListByResourceGroupInput,
    outputSchema: WorkflowsListByResourceGroupOutput,
  }));
// Input Schema
export const WorkflowsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Logic/workflows",
    }),
  );
export type WorkflowsListBySubscriptionInput =
  typeof WorkflowsListBySubscriptionInput.Type;

// Output Schema
export const WorkflowsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkflowsListBySubscriptionOutput =
  typeof WorkflowsListBySubscriptionOutput.Type;

// The operation
/**
 * Gets a list of workflows by subscription.
 *
 * @param $top - The number of items to be included in the result.
 * @param $filter - The filter to apply on the operation. Options for filters include: State, Trigger, and ReferencedResourceId.
 */
export const WorkflowsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowsListBySubscriptionInput,
    outputSchema: WorkflowsListBySubscriptionOutput,
  }),
);
// Input Schema
export const WorkflowsListCallbackUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/listCallbackUrl",
    }),
  );
export type WorkflowsListCallbackUrlInput =
  typeof WorkflowsListCallbackUrlInput.Type;

// Output Schema
export const WorkflowsListCallbackUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.String),
    method: Schema.optional(Schema.String),
    basePath: Schema.optional(Schema.String),
    relativePath: Schema.optional(Schema.String),
    relativePathParameters: Schema.optional(Schema.Array(Schema.String)),
    queries: Schema.optional(
      Schema.Struct({
        "api-version": Schema.optional(Schema.String),
        sp: Schema.optional(Schema.String),
        sv: Schema.optional(Schema.String),
        sig: Schema.optional(Schema.String),
        se: Schema.optional(Schema.String),
      }),
    ),
  });
export type WorkflowsListCallbackUrlOutput =
  typeof WorkflowsListCallbackUrlOutput.Type;

// The operation
/**
 * Get the workflow callback Url.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsListCallbackUrl = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowsListCallbackUrlInput,
    outputSchema: WorkflowsListCallbackUrlOutput,
  }),
);
// Input Schema
export const WorkflowsListSwaggerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/listSwagger",
    }),
  );
export type WorkflowsListSwaggerInput = typeof WorkflowsListSwaggerInput.Type;

// Output Schema
export const WorkflowsListSwaggerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkflowsListSwaggerOutput = typeof WorkflowsListSwaggerOutput.Type;

// The operation
/**
 * Gets an OpenAPI definition for the workflow.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsListSwagger = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowsListSwaggerInput,
    outputSchema: WorkflowsListSwaggerOutput,
  }),
);
// Input Schema
export const WorkflowsMoveInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/move",
  }),
);
export type WorkflowsMoveInput = typeof WorkflowsMoveInput.Type;

// Output Schema
export const WorkflowsMoveOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowsMoveOutput = typeof WorkflowsMoveOutput.Type;

// The operation
/**
 * Moves an existing workflow.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsMove = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowsMoveInput,
  outputSchema: WorkflowsMoveOutput,
}));
// Input Schema
export const WorkflowsRegenerateAccessKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/regenerateAccessKey",
    }),
  );
export type WorkflowsRegenerateAccessKeyInput =
  typeof WorkflowsRegenerateAccessKeyInput.Type;

// Output Schema
export const WorkflowsRegenerateAccessKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowsRegenerateAccessKeyOutput =
  typeof WorkflowsRegenerateAccessKeyOutput.Type;

// The operation
/**
 * Regenerates the callback URL access key for request triggers.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsRegenerateAccessKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowsRegenerateAccessKeyInput,
    outputSchema: WorkflowsRegenerateAccessKeyOutput,
  }));
// Input Schema
export const WorkflowsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workflowName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}",
  }),
);
export type WorkflowsUpdateInput = typeof WorkflowsUpdateInput.Type;

// Output Schema
export const WorkflowsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type WorkflowsUpdateOutput = typeof WorkflowsUpdateOutput.Type;

// The operation
/**
 * Updates a workflow.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowsUpdateInput,
  outputSchema: WorkflowsUpdateOutput,
}));
// Input Schema
export const WorkflowsValidateByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/locations/{location}/workflows/{workflowName}/validate",
    }),
  );
export type WorkflowsValidateByLocationInput =
  typeof WorkflowsValidateByLocationInput.Type;

// Output Schema
export const WorkflowsValidateByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowsValidateByLocationOutput =
  typeof WorkflowsValidateByLocationOutput.Type;

// The operation
/**
 * Validates the workflow definition.
 *
 * @param resourceGroupName - The resource group name.
 * @param location - The workflow location.
 * @param workflowName - The workflow name.
 */
export const WorkflowsValidateByLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowsValidateByLocationInput,
    outputSchema: WorkflowsValidateByLocationOutput,
  }),
);
// Input Schema
export const WorkflowsValidateByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/validate",
    }),
  );
export type WorkflowsValidateByResourceGroupInput =
  typeof WorkflowsValidateByResourceGroupInput.Type;

// Output Schema
export const WorkflowsValidateByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowsValidateByResourceGroupOutput =
  typeof WorkflowsValidateByResourceGroupOutput.Type;

// The operation
/**
 * Validates the workflow.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 */
export const WorkflowsValidateByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowsValidateByResourceGroupInput,
    outputSchema: WorkflowsValidateByResourceGroupOutput,
  }));
// Input Schema
export const WorkflowTriggerHistoriesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
    historyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/triggers/{triggerName}/histories/{historyName}",
    }),
  );
export type WorkflowTriggerHistoriesGetInput =
  typeof WorkflowTriggerHistoriesGetInput.Type;

// Output Schema
export const WorkflowTriggerHistoriesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
  });
export type WorkflowTriggerHistoriesGetOutput =
  typeof WorkflowTriggerHistoriesGetOutput.Type;

// The operation
/**
 * Gets a workflow trigger history.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param triggerName - The workflow trigger name.
 * @param historyName - The workflow trigger history name. Corresponds to the run name for triggers that resulted in a run.
 */
export const WorkflowTriggerHistoriesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowTriggerHistoriesGetInput,
    outputSchema: WorkflowTriggerHistoriesGetOutput,
  }),
);
// Input Schema
export const WorkflowTriggerHistoriesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/triggers/{triggerName}/histories",
    }),
  );
export type WorkflowTriggerHistoriesListInput =
  typeof WorkflowTriggerHistoriesListInput.Type;

// Output Schema
export const WorkflowTriggerHistoriesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkflowTriggerHistoriesListOutput =
  typeof WorkflowTriggerHistoriesListOutput.Type;

// The operation
/**
 * Gets a list of workflow trigger histories.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param triggerName - The workflow trigger name.
 * @param $top - The number of items to be included in the result.
 * @param $filter - The filter to apply on the operation. Options for filters include: Status, StartTime, and ClientTrackingId.
 */
export const WorkflowTriggerHistoriesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowTriggerHistoriesListInput,
    outputSchema: WorkflowTriggerHistoriesListOutput,
  }));
// Input Schema
export const WorkflowTriggerHistoriesResubmitInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
    historyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/triggers/{triggerName}/histories/{historyName}/resubmit",
    }),
  );
export type WorkflowTriggerHistoriesResubmitInput =
  typeof WorkflowTriggerHistoriesResubmitInput.Type;

// Output Schema
export const WorkflowTriggerHistoriesResubmitOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowTriggerHistoriesResubmitOutput =
  typeof WorkflowTriggerHistoriesResubmitOutput.Type;

// The operation
/**
 * Resubmits a workflow run based on the trigger history.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param triggerName - The workflow trigger name.
 * @param historyName - The workflow trigger history name. Corresponds to the run name for triggers that resulted in a run.
 */
export const WorkflowTriggerHistoriesResubmit =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowTriggerHistoriesResubmitInput,
    outputSchema: WorkflowTriggerHistoriesResubmitOutput,
  }));
// Input Schema
export const WorkflowTriggersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/triggers/{triggerName}",
    }),
  );
export type WorkflowTriggersGetInput = typeof WorkflowTriggersGetInput.Type;

// Output Schema
export const WorkflowTriggersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
  });
export type WorkflowTriggersGetOutput = typeof WorkflowTriggersGetOutput.Type;

// The operation
/**
 * Gets a workflow trigger.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param triggerName - The workflow trigger name.
 */
export const WorkflowTriggersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowTriggersGetInput,
  outputSchema: WorkflowTriggersGetOutput,
}));
// Input Schema
export const WorkflowTriggersGetSchemaJsonInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/triggers/{triggerName}/schemas/json",
    }),
  );
export type WorkflowTriggersGetSchemaJsonInput =
  typeof WorkflowTriggersGetSchemaJsonInput.Type;

// Output Schema
export const WorkflowTriggersGetSchemaJsonOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    title: Schema.optional(Schema.String),
    content: Schema.optional(Schema.String),
  });
export type WorkflowTriggersGetSchemaJsonOutput =
  typeof WorkflowTriggersGetSchemaJsonOutput.Type;

// The operation
/**
 * Get the trigger schema as JSON.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param triggerName - The workflow trigger name.
 */
export const WorkflowTriggersGetSchemaJson =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowTriggersGetSchemaJsonInput,
    outputSchema: WorkflowTriggersGetSchemaJsonOutput,
  }));
// Input Schema
export const WorkflowTriggersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/triggers",
    }),
  );
export type WorkflowTriggersListInput = typeof WorkflowTriggersListInput.Type;

// Output Schema
export const WorkflowTriggersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkflowTriggersListOutput = typeof WorkflowTriggersListOutput.Type;

// The operation
/**
 * Gets a list of workflow triggers.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param $top - The number of items to be included in the result.
 * @param $filter - The filter to apply on the operation.
 */
export const WorkflowTriggersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowTriggersListInput,
    outputSchema: WorkflowTriggersListOutput,
  }),
);
// Input Schema
export const WorkflowTriggersListCallbackUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/triggers/{triggerName}/listCallbackUrl",
    }),
  );
export type WorkflowTriggersListCallbackUrlInput =
  typeof WorkflowTriggersListCallbackUrlInput.Type;

// Output Schema
export const WorkflowTriggersListCallbackUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.String),
    method: Schema.optional(Schema.String),
    basePath: Schema.optional(Schema.String),
    relativePath: Schema.optional(Schema.String),
    relativePathParameters: Schema.optional(Schema.Array(Schema.String)),
    queries: Schema.optional(
      Schema.Struct({
        "api-version": Schema.optional(Schema.String),
        sp: Schema.optional(Schema.String),
        sv: Schema.optional(Schema.String),
        sig: Schema.optional(Schema.String),
        se: Schema.optional(Schema.String),
      }),
    ),
  });
export type WorkflowTriggersListCallbackUrlOutput =
  typeof WorkflowTriggersListCallbackUrlOutput.Type;

// The operation
/**
 * Get the callback URL for a workflow trigger.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param triggerName - The workflow trigger name.
 */
export const WorkflowTriggersListCallbackUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowTriggersListCallbackUrlInput,
    outputSchema: WorkflowTriggersListCallbackUrlOutput,
  }));
// Input Schema
export const WorkflowTriggersResetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/triggers/{triggerName}/reset",
    }),
  );
export type WorkflowTriggersResetInput = typeof WorkflowTriggersResetInput.Type;

// Output Schema
export const WorkflowTriggersResetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowTriggersResetOutput =
  typeof WorkflowTriggersResetOutput.Type;

// The operation
/**
 * Resets a workflow trigger.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param triggerName - The workflow trigger name.
 */
export const WorkflowTriggersReset = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowTriggersResetInput,
    outputSchema: WorkflowTriggersResetOutput,
  }),
);
// Input Schema
export const WorkflowTriggersRunInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/triggers/{triggerName}/run",
    }),
  );
export type WorkflowTriggersRunInput = typeof WorkflowTriggersRunInput.Type;

// Output Schema
export const WorkflowTriggersRunOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowTriggersRunOutput = typeof WorkflowTriggersRunOutput.Type;

// The operation
/**
 * Runs a workflow trigger.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param triggerName - The workflow trigger name.
 */
export const WorkflowTriggersRun = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowTriggersRunInput,
  outputSchema: WorkflowTriggersRunOutput,
}));
// Input Schema
export const WorkflowTriggersSetStateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/triggers/{triggerName}/setState",
    }),
  );
export type WorkflowTriggersSetStateInput =
  typeof WorkflowTriggersSetStateInput.Type;

// Output Schema
export const WorkflowTriggersSetStateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkflowTriggersSetStateOutput =
  typeof WorkflowTriggersSetStateOutput.Type;

// The operation
/**
 * Sets the state of a workflow trigger.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param triggerName - The workflow trigger name.
 */
export const WorkflowTriggersSetState = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowTriggersSetStateInput,
    outputSchema: WorkflowTriggersSetStateOutput,
  }),
);
// Input Schema
export const WorkflowVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    versionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/versions/{versionId}",
    }),
  );
export type WorkflowVersionsGetInput = typeof WorkflowVersionsGetInput.Type;

// Output Schema
export const WorkflowVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type WorkflowVersionsGetOutput = typeof WorkflowVersionsGetOutput.Type;

// The operation
/**
 * Gets a workflow version.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param versionId - The workflow versionId.
 */
export const WorkflowVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowVersionsGetInput,
  outputSchema: WorkflowVersionsGetOutput,
}));
// Input Schema
export const WorkflowVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/versions",
    }),
  );
export type WorkflowVersionsListInput = typeof WorkflowVersionsListInput.Type;

// Output Schema
export const WorkflowVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkflowVersionsListOutput = typeof WorkflowVersionsListOutput.Type;

// The operation
/**
 * Gets a list of workflow versions.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param $top - The number of items to be included in the result.
 */
export const WorkflowVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkflowVersionsListInput,
    outputSchema: WorkflowVersionsListOutput,
  }),
);
// Input Schema
export const WorkflowVersionTriggersListCallbackUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workflowName: Schema.String.pipe(T.PathParam()),
    versionId: Schema.String.pipe(T.PathParam()),
    triggerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/versions/{versionId}/triggers/{triggerName}/listCallbackUrl",
    }),
  );
export type WorkflowVersionTriggersListCallbackUrlInput =
  typeof WorkflowVersionTriggersListCallbackUrlInput.Type;

// Output Schema
export const WorkflowVersionTriggersListCallbackUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.String),
    method: Schema.optional(Schema.String),
    basePath: Schema.optional(Schema.String),
    relativePath: Schema.optional(Schema.String),
    relativePathParameters: Schema.optional(Schema.Array(Schema.String)),
    queries: Schema.optional(
      Schema.Struct({
        "api-version": Schema.optional(Schema.String),
        sp: Schema.optional(Schema.String),
        sv: Schema.optional(Schema.String),
        sig: Schema.optional(Schema.String),
        se: Schema.optional(Schema.String),
      }),
    ),
  });
export type WorkflowVersionTriggersListCallbackUrlOutput =
  typeof WorkflowVersionTriggersListCallbackUrlOutput.Type;

// The operation
/**
 * Get the callback url for a trigger of a workflow version.
 *
 * @param resourceGroupName - The resource group name.
 * @param workflowName - The workflow name.
 * @param versionId - The workflow versionId.
 * @param triggerName - The workflow trigger name.
 */
export const WorkflowVersionTriggersListCallbackUrl =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkflowVersionTriggersListCallbackUrlInput,
    outputSchema: WorkflowVersionTriggersListCallbackUrlOutput,
  }));
