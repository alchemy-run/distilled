/**
 * Azure Adhybridhealthservice API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AdDomainServiceMembersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    isGroupbySite: Schema.Boolean,
    query: Schema.optional(Schema.String),
    nextPartitionKey: Schema.Literals([" "]),
    nextRowKey: Schema.Literals([" "]),
    takeCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/addomainservicemembers",
    }),
  );
export type AdDomainServiceMembersListInput =
  typeof AdDomainServiceMembersListInput.Type;

// Output Schema
export const AdDomainServiceMembersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          domainName: Schema.optional(Schema.String),
          siteName: Schema.optional(Schema.String),
          addsRoles: Schema.optional(Schema.Array(Schema.String)),
          gcReachable: Schema.optional(Schema.Boolean),
          isAdvertising: Schema.optional(Schema.Boolean),
          pdcReachable: Schema.optional(Schema.Boolean),
          sysvolState: Schema.optional(Schema.Boolean),
          dcTypes: Schema.optional(Schema.Array(Schema.String)),
          serviceMemberId: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          tenantId: Schema.optional(Schema.String),
          activeAlerts: Schema.optional(Schema.Number),
          additionalInformation: Schema.optional(Schema.String),
          createdDate: Schema.optional(Schema.String),
          dimensions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          disabled: Schema.optional(Schema.Boolean),
          disabledReason: Schema.optional(Schema.Number),
          installedQfes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                kbName: Schema.optional(Schema.String),
                link: Schema.optional(Schema.String),
                installedDate: Schema.optional(Schema.String),
              }),
            ),
          ),
          lastDisabled: Schema.optional(Schema.String),
          lastReboot: Schema.optional(Schema.String),
          lastServerReportedMonitoringLevelChange: Schema.optional(
            Schema.String,
          ),
          lastUpdated: Schema.optional(Schema.String),
          machineId: Schema.optional(Schema.String),
          machineName: Schema.optional(Schema.String),
          monitoringConfigurationsComputed: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          monitoringConfigurationsCustomized: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          osName: Schema.optional(Schema.String),
          osVersion: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          recommendedQfes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                kbName: Schema.optional(Schema.String),
                link: Schema.optional(Schema.String),
                installedDate: Schema.optional(Schema.String),
              }),
            ),
          ),
          resolvedAlerts: Schema.optional(Schema.Number),
          role: Schema.optional(Schema.String),
          serverReportedMonitoringLevel: Schema.optional(
            Schema.Literals(["Partial", "Full", "Off"]),
          ),
          status: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type AdDomainServiceMembersListOutput =
  typeof AdDomainServiceMembersListOutput.Type;

// The operation
/**
 * Gets the details of the servers, for a given Active Directory Domain Service, that are onboarded to Azure Active Directory Connect Health.
 *
 * @param serviceName - The name of the service.
 * @param $filter - The server property filter to apply.
 * @param isGroupbySite - Indicates if the result should be grouped by site or not.
 * @param query - The custom query.
 * @param nextPartitionKey - The next partition key to query for.
 * @param nextRowKey - The next row key to query for.
 * @param takeCount - The take count , which specifies the number of elements that can be returned from a sequence.
 */
export const adDomainServiceMembersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AdDomainServiceMembersListInput,
    outputSchema: AdDomainServiceMembersListOutput,
  }),
);
// Input Schema
export const AddsServiceGetMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    groupKey: Schema.optional(Schema.String),
    fromDate: Schema.optional(Schema.String),
    toDate: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/metrics/{metricName}/groups/{groupName}",
    }),
  );
export type AddsServiceGetMetricsInput = typeof AddsServiceGetMetricsInput.Type;

// Output Schema
export const AddsServiceGetMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sets: Schema.optional(
      Schema.Array(
        Schema.Struct({
          setName: Schema.optional(Schema.String),
          values: Schema.optional(Schema.Array(Schema.Number)),
        }),
      ),
    ),
    timeStamps: Schema.optional(Schema.Array(Schema.String)),
  });
export type AddsServiceGetMetricsOutput =
  typeof AddsServiceGetMetricsOutput.Type;

// The operation
/**
 * Gets the server related metrics for a given metric and group combination.
 *
 * @param serviceName - The name of the service.
 * @param metricName - The metric name
 * @param groupName - The group name
 * @param groupKey - The group key
 * @param fromDate - The start date.
 * @param toDate - The end date.
 */
export const addsServiceGetMetrics = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AddsServiceGetMetricsInput,
    outputSchema: AddsServiceGetMetricsOutput,
  }),
);
// Input Schema
export const AddsServiceMembersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
    confirm: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/servicemembers/{serviceMemberId}",
    }),
  );
export type AddsServiceMembersDeleteInput =
  typeof AddsServiceMembersDeleteInput.Type;

// Output Schema
export const AddsServiceMembersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AddsServiceMembersDeleteOutput =
  typeof AddsServiceMembersDeleteOutput.Type;

// The operation
/**
 * Deletes a Active Directory Domain Controller server that has been onboarded to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service.
 * @param serviceMemberId - The server Id.
 * @param confirm - Indicates if the server will be permanently deleted or disabled. True indicates that the server will be permanently deleted and False indicates that the server will be marked disabled and then deleted after 30 days, if it is not re-registered.
 */
export const addsServiceMembersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AddsServiceMembersDeleteInput,
    outputSchema: AddsServiceMembersDeleteOutput,
  }),
);
// Input Schema
export const AddsServiceMembersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/servicemembers/{serviceMemberId}",
    }),
  );
export type AddsServiceMembersGetInput = typeof AddsServiceMembersGetInput.Type;

// Output Schema
export const AddsServiceMembersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceMemberId: Schema.optional(Schema.String),
    serviceId: Schema.optional(Schema.String),
    tenantId: Schema.optional(Schema.String),
    activeAlerts: Schema.optional(Schema.Number),
    additionalInformation: Schema.optional(Schema.String),
    createdDate: Schema.optional(Schema.String),
    dimensions: Schema.optional(Schema.Unknown),
    disabled: Schema.optional(Schema.Boolean),
    disabledReason: Schema.optional(Schema.Number),
    installedQfes: Schema.optional(Schema.Unknown),
    lastDisabled: Schema.optional(Schema.String),
    lastReboot: Schema.optional(Schema.String),
    lastServerReportedMonitoringLevelChange: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
    machineId: Schema.optional(Schema.String),
    machineName: Schema.optional(Schema.String),
    monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
    monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
    osName: Schema.optional(Schema.String),
    osVersion: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.Unknown),
    recommendedQfes: Schema.optional(Schema.Unknown),
    resolvedAlerts: Schema.optional(Schema.Number),
    role: Schema.optional(Schema.String),
    serverReportedMonitoringLevel: Schema.optional(
      Schema.Literals(["Partial", "Full", "Off"]),
    ),
    status: Schema.optional(Schema.String),
  });
export type AddsServiceMembersGetOutput =
  typeof AddsServiceMembersGetOutput.Type;

// The operation
/**
 * Gets the details of a server, for a given Active Directory Domain Controller service, that are onboarded to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service.
 * @param serviceMemberId - The server Id.
 */
export const addsServiceMembersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AddsServiceMembersGetInput,
    outputSchema: AddsServiceMembersGetOutput,
  }),
);
// Input Schema
export const AddsServiceMembersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/addsservicemembers",
    }),
  );
export type AddsServiceMembersListInput =
  typeof AddsServiceMembersListInput.Type;

// Output Schema
export const AddsServiceMembersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          domainName: Schema.optional(Schema.String),
          siteName: Schema.optional(Schema.String),
          addsRoles: Schema.optional(Schema.Array(Schema.String)),
          gcReachable: Schema.optional(Schema.Boolean),
          isAdvertising: Schema.optional(Schema.Boolean),
          pdcReachable: Schema.optional(Schema.Boolean),
          sysvolState: Schema.optional(Schema.Boolean),
          dcTypes: Schema.optional(Schema.Array(Schema.String)),
          serviceMemberId: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          tenantId: Schema.optional(Schema.String),
          activeAlerts: Schema.optional(Schema.Number),
          additionalInformation: Schema.optional(Schema.String),
          createdDate: Schema.optional(Schema.String),
          dimensions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          disabled: Schema.optional(Schema.Boolean),
          disabledReason: Schema.optional(Schema.Number),
          installedQfes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                kbName: Schema.optional(Schema.String),
                link: Schema.optional(Schema.String),
                installedDate: Schema.optional(Schema.String),
              }),
            ),
          ),
          lastDisabled: Schema.optional(Schema.String),
          lastReboot: Schema.optional(Schema.String),
          lastServerReportedMonitoringLevelChange: Schema.optional(
            Schema.String,
          ),
          lastUpdated: Schema.optional(Schema.String),
          machineId: Schema.optional(Schema.String),
          machineName: Schema.optional(Schema.String),
          monitoringConfigurationsComputed: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          monitoringConfigurationsCustomized: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          osName: Schema.optional(Schema.String),
          osVersion: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          recommendedQfes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                kbName: Schema.optional(Schema.String),
                link: Schema.optional(Schema.String),
                installedDate: Schema.optional(Schema.String),
              }),
            ),
          ),
          resolvedAlerts: Schema.optional(Schema.Number),
          role: Schema.optional(Schema.String),
          serverReportedMonitoringLevel: Schema.optional(
            Schema.Literals(["Partial", "Full", "Off"]),
          ),
          status: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type AddsServiceMembersListOutput =
  typeof AddsServiceMembersListOutput.Type;

// The operation
/**
 * Gets the details of the Active Directory Domain servers, for a given Active Directory Domain Service, that are onboarded to Azure Active Directory Connect Health.
 *
 * @param serviceName - The name of the service.
 * @param $filter - The server property filter to apply.
 */
export const addsServiceMembersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AddsServiceMembersListInput,
    outputSchema: AddsServiceMembersListOutput,
  }),
);
// Input Schema
export const AddsServiceMembersListCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/servicemembers/{serviceMemberId}/credentials",
    }),
  );
export type AddsServiceMembersListCredentialsInput =
  typeof AddsServiceMembersListCredentialsInput.Type;

// Output Schema
export const AddsServiceMembersListCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          identifier: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          credentialData: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type AddsServiceMembersListCredentialsOutput =
  typeof AddsServiceMembersListCredentialsOutput.Type;

// The operation
/**
 * Gets the credentials of the server which is needed by the agent to connect to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service.
 * @param $filter - The property filter to apply.
 * @param serviceMemberId - The server Id.
 */
export const addsServiceMembersListCredentials =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServiceMembersListCredentialsInput,
    outputSchema: AddsServiceMembersListCredentialsOutput,
  }));
// Input Schema
export const AddsServicesAddInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.ADHybridHealthService/addsservices",
  }),
);
export type AddsServicesAddInput = typeof AddsServicesAddInput.Type;

// Output Schema
export const AddsServicesAddOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  activeAlerts: Schema.optional(Schema.Number),
  additionalInformation: Schema.optional(Schema.String),
  createdDate: Schema.optional(Schema.String),
  customNotificationEmails: Schema.optional(Schema.Array(Schema.String)),
  disabled: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  health: Schema.optional(Schema.String),
  lastDisabled: Schema.optional(Schema.String),
  lastUpdated: Schema.optional(Schema.String),
  monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
  monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
  notificationEmailEnabled: Schema.optional(Schema.Boolean),
  notificationEmailEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
  notificationEmailsEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
  notificationEmails: Schema.optional(Schema.Array(Schema.String)),
  originalDisabledState: Schema.optional(Schema.Boolean),
  resolvedAlerts: Schema.optional(Schema.Number),
  serviceId: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  simpleProperties: Schema.optional(Schema.Unknown),
  tenantId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type AddsServicesAddOutput = typeof AddsServicesAddOutput.Type;

// The operation
/**
 * Onboards a service for a given tenant in Azure Active Directory Connect Health.
 */
export const addsServicesAdd = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddsServicesAddInput,
  outputSchema: AddsServicesAddOutput,
}));
// Input Schema
export const AddsServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    confirm: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}",
    }),
  );
export type AddsServicesDeleteInput = typeof AddsServicesDeleteInput.Type;

// Output Schema
export const AddsServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AddsServicesDeleteOutput = typeof AddsServicesDeleteOutput.Type;

// The operation
/**
 * Deletes an Active Directory Domain Service which is onboarded to Azure Active Directory Connect Health.
 *
 * @param serviceName - The name of the service which needs to be deleted.
 * @param confirm - Indicates if the service will be permanently deleted or disabled. True indicates that the service will be permanently deleted and False indicates that the service will be marked disabled and then deleted after 30 days, if it is not re-registered.
 */
export const addsServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddsServicesDeleteInput,
  outputSchema: AddsServicesDeleteOutput,
}));
// Input Schema
export const AddsServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serviceName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}",
  }),
);
export type AddsServicesGetInput = typeof AddsServicesGetInput.Type;

// Output Schema
export const AddsServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  activeAlerts: Schema.optional(Schema.Number),
  additionalInformation: Schema.optional(Schema.String),
  createdDate: Schema.optional(Schema.String),
  customNotificationEmails: Schema.optional(Schema.Array(Schema.String)),
  disabled: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  health: Schema.optional(Schema.String),
  lastDisabled: Schema.optional(Schema.String),
  lastUpdated: Schema.optional(Schema.String),
  monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
  monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
  notificationEmailEnabled: Schema.optional(Schema.Boolean),
  notificationEmailEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
  notificationEmailsEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
  notificationEmails: Schema.optional(Schema.Array(Schema.String)),
  originalDisabledState: Schema.optional(Schema.Boolean),
  resolvedAlerts: Schema.optional(Schema.Number),
  serviceId: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  simpleProperties: Schema.optional(Schema.Unknown),
  tenantId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type AddsServicesGetOutput = typeof AddsServicesGetOutput.Type;

// The operation
/**
 * Gets the details of an Active Directory Domain Service for a tenant having Azure AD Premium license and is onboarded to Azure Active Directory Connect Health.
 *
 * @param serviceName - The name of the service.
 */
export const addsServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddsServicesGetInput,
  outputSchema: AddsServicesGetOutput,
}));
// Input Schema
export const AddsServicesGetForestSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/forestsummary",
    }),
  );
export type AddsServicesGetForestSummaryInput =
  typeof AddsServicesGetForestSummaryInput.Type;

// Output Schema
export const AddsServicesGetForestSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    forestName: Schema.optional(Schema.String),
    domainCount: Schema.optional(Schema.Number),
    siteCount: Schema.optional(Schema.Number),
    monitoredDcCount: Schema.optional(Schema.Number),
    totalDcCount: Schema.optional(Schema.Number),
    domains: Schema.optional(Schema.Array(Schema.String)),
    sites: Schema.optional(Schema.Array(Schema.String)),
  });
export type AddsServicesGetForestSummaryOutput =
  typeof AddsServicesGetForestSummaryOutput.Type;

// The operation
/**
 * Gets the forest summary for a given Active Directory Domain Service, that is onboarded to Azure Active Directory Connect Health.
 *
 * @param serviceName - The name of the service.
 */
export const addsServicesGetForestSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesGetForestSummaryInput,
    outputSchema: AddsServicesGetForestSummaryOutput,
  }));
// Input Schema
export const AddsServicesGetMetricMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/metricmetadata/{metricName}",
    }),
  );
export type AddsServicesGetMetricMetadataInput =
  typeof AddsServicesGetMetricMetadataInput.Type;

// Output Schema
export const AddsServicesGetMetricMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    metricsProcessorClassName: Schema.optional(Schema.String),
    metricName: Schema.optional(Schema.String),
    groupings: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          invisibleForUi: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
    displayName: Schema.optional(Schema.String),
    valueKind: Schema.optional(Schema.String),
    minValue: Schema.optional(Schema.Number),
    maxValue: Schema.optional(Schema.Number),
    kind: Schema.optional(Schema.String),
    isDefault: Schema.optional(Schema.Boolean),
    isPerfCounter: Schema.optional(Schema.Boolean),
    isDevOps: Schema.optional(Schema.Boolean),
  });
export type AddsServicesGetMetricMetadataOutput =
  typeof AddsServicesGetMetricMetadataOutput.Type;

// The operation
/**
 * Gets the service related metric information.
 *
 * @param serviceName - The name of the service.
 * @param metricName - The metric name
 */
export const addsServicesGetMetricMetadata =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesGetMetricMetadataInput,
    outputSchema: AddsServicesGetMetricMetadataOutput,
  }));
// Input Schema
export const AddsServicesGetMetricMetadataForGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    groupKey: Schema.optional(Schema.String),
    fromDate: Schema.optional(Schema.String),
    toDate: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/metricmetadata/{metricName}/groups/{groupName}",
    }),
  );
export type AddsServicesGetMetricMetadataForGroupInput =
  typeof AddsServicesGetMetricMetadataForGroupInput.Type;

// Output Schema
export const AddsServicesGetMetricMetadataForGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sets: Schema.optional(
      Schema.Array(
        Schema.Struct({
          setName: Schema.optional(Schema.String),
          values: Schema.optional(Schema.Array(Schema.Number)),
        }),
      ),
    ),
    timeStamps: Schema.optional(Schema.Array(Schema.String)),
  });
export type AddsServicesGetMetricMetadataForGroupOutput =
  typeof AddsServicesGetMetricMetadataForGroupOutput.Type;

// The operation
/**
 * Gets the service related metrics for a given metric and group combination.
 *
 * @param serviceName - The name of the service.
 * @param metricName - The metric name
 * @param groupName - The group name
 * @param groupKey - The group key
 * @param fromDate - The start date.
 * @param toDate - The end date.
 */
export const addsServicesGetMetricMetadataForGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesGetMetricMetadataForGroupInput,
    outputSchema: AddsServicesGetMetricMetadataForGroupOutput,
  }));
// Input Schema
export const AddsServicesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  $filter: Schema.optional(Schema.String),
  serviceType: Schema.optional(Schema.String),
  skipCount: Schema.optional(Schema.Number),
  takeCount: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ADHybridHealthService/addsservices",
  }),
);
export type AddsServicesListInput = typeof AddsServicesListInput.Type;

// Output Schema
export const AddsServicesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          activeAlerts: Schema.optional(Schema.Number),
          additionalInformation: Schema.optional(Schema.String),
          createdDate: Schema.optional(Schema.String),
          customNotificationEmails: Schema.optional(
            Schema.Array(Schema.String),
          ),
          disabled: Schema.optional(Schema.Boolean),
          displayName: Schema.optional(Schema.String),
          health: Schema.optional(Schema.String),
          lastDisabled: Schema.optional(Schema.String),
          lastUpdated: Schema.optional(Schema.String),
          monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
          monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
          notificationEmailEnabled: Schema.optional(Schema.Boolean),
          notificationEmailEnabledForGlobalAdmins: Schema.optional(
            Schema.Boolean,
          ),
          notificationEmailsEnabledForGlobalAdmins: Schema.optional(
            Schema.Boolean,
          ),
          notificationEmails: Schema.optional(Schema.Array(Schema.String)),
          originalDisabledState: Schema.optional(Schema.Boolean),
          resolvedAlerts: Schema.optional(Schema.Number),
          serviceId: Schema.optional(Schema.String),
          serviceName: Schema.optional(Schema.String),
          signature: Schema.optional(Schema.String),
          simpleProperties: Schema.optional(Schema.Unknown),
          tenantId: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  },
);
export type AddsServicesListOutput = typeof AddsServicesListOutput.Type;

// The operation
/**
 * Gets the details of Active Directory Domain Service, for a tenant, that are onboarded to Azure Active Directory Connect Health.
 *
 * @param $filter - The service property filter to apply.
 * @param serviceType - The service type for the services onboarded to Azure Active Directory Connect Health. Depending on whether the service is monitoring, ADFS, Sync or ADDS roles, the service type can either be AdFederationService or AadSyncService or AdDomainService.
 * @param skipCount - The skip count, which specifies the number of elements that can be bypassed from a sequence and then return the remaining elements.
 * @param takeCount - The take count , which specifies the number of elements that can be returned from a sequence.
 */
export const addsServicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddsServicesListInput,
  outputSchema: AddsServicesListOutput,
}));
// Input Schema
export const AddsServicesListMetricMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    perfCounter: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/metricmetadata",
    }),
  );
export type AddsServicesListMetricMetadataInput =
  typeof AddsServicesListMetricMetadataInput.Type;

// Output Schema
export const AddsServicesListMetricMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          metricsProcessorClassName: Schema.optional(Schema.String),
          metricName: Schema.optional(Schema.String),
          groupings: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                displayName: Schema.optional(Schema.String),
                invisibleForUi: Schema.optional(Schema.Boolean),
              }),
            ),
          ),
          displayName: Schema.optional(Schema.String),
          valueKind: Schema.optional(Schema.String),
          minValue: Schema.optional(Schema.Number),
          maxValue: Schema.optional(Schema.Number),
          kind: Schema.optional(Schema.String),
          isDefault: Schema.optional(Schema.Boolean),
          isPerfCounter: Schema.optional(Schema.Boolean),
          isDevOps: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type AddsServicesListMetricMetadataOutput =
  typeof AddsServicesListMetricMetadataOutput.Type;

// The operation
/**
 * Gets the service related metrics information.
 *
 * @param $filter - The metric metadata property filter to apply.
 * @param serviceName - The name of the service.
 * @param perfCounter - Indicates if only performance counter metrics are requested.
 */
export const addsServicesListMetricMetadata =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesListMetricMetadataInput,
    outputSchema: AddsServicesListMetricMetadataOutput,
  }));
// Input Schema
export const AddsServicesListMetricsAverageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/metrics/{metricName}/groups/{groupName}/average",
    }),
  );
export type AddsServicesListMetricsAverageInput =
  typeof AddsServicesListMetricsAverageInput.Type;

// Output Schema
export const AddsServicesListMetricsAverageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type AddsServicesListMetricsAverageOutput =
  typeof AddsServicesListMetricsAverageOutput.Type;

// The operation
/**
 * Gets the average of the metric values for a given metric and group combination.
 *
 * @param serviceName - The name of the service.
 * @param metricName - The metric name
 * @param groupName - The group name
 */
export const addsServicesListMetricsAverage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesListMetricsAverageInput,
    outputSchema: AddsServicesListMetricsAverageOutput,
  }));
// Input Schema
export const AddsServicesListMetricsSumInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/metrics/{metricName}/groups/{groupName}/sum",
    }),
  );
export type AddsServicesListMetricsSumInput =
  typeof AddsServicesListMetricsSumInput.Type;

// Output Schema
export const AddsServicesListMetricsSumOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type AddsServicesListMetricsSumOutput =
  typeof AddsServicesListMetricsSumOutput.Type;

// The operation
/**
 * Gets the sum of the metric values for a given metric and group combination.
 *
 * @param serviceName - The name of the service.
 * @param metricName - The metric name
 * @param groupName - The group name
 */
export const addsServicesListMetricsSum = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AddsServicesListMetricsSumInput,
    outputSchema: AddsServicesListMetricsSumOutput,
  }),
);
// Input Schema
export const AddsServicesListPremiumServicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    serviceType: Schema.optional(Schema.String),
    skipCount: Schema.optional(Schema.Number),
    takeCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/premiumCheck",
    }),
  );
export type AddsServicesListPremiumServicesInput =
  typeof AddsServicesListPremiumServicesInput.Type;

// Output Schema
export const AddsServicesListPremiumServicesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          activeAlerts: Schema.optional(Schema.Number),
          additionalInformation: Schema.optional(Schema.String),
          createdDate: Schema.optional(Schema.String),
          customNotificationEmails: Schema.optional(
            Schema.Array(Schema.String),
          ),
          disabled: Schema.optional(Schema.Boolean),
          displayName: Schema.optional(Schema.String),
          health: Schema.optional(Schema.String),
          lastDisabled: Schema.optional(Schema.String),
          lastUpdated: Schema.optional(Schema.String),
          monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
          monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
          notificationEmailEnabled: Schema.optional(Schema.Boolean),
          notificationEmailEnabledForGlobalAdmins: Schema.optional(
            Schema.Boolean,
          ),
          notificationEmailsEnabledForGlobalAdmins: Schema.optional(
            Schema.Boolean,
          ),
          notificationEmails: Schema.optional(Schema.Array(Schema.String)),
          originalDisabledState: Schema.optional(Schema.Boolean),
          resolvedAlerts: Schema.optional(Schema.Number),
          serviceId: Schema.optional(Schema.String),
          serviceName: Schema.optional(Schema.String),
          signature: Schema.optional(Schema.String),
          simpleProperties: Schema.optional(Schema.Unknown),
          tenantId: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type AddsServicesListPremiumServicesOutput =
  typeof AddsServicesListPremiumServicesOutput.Type;

// The operation
/**
 * Gets the details of Active Directory Domain Services for a tenant having Azure AD Premium license and is onboarded to Azure Active Directory Connect Health.
 *
 * @param $filter - The service property filter to apply.
 * @param serviceType - The service type for the services onboarded to Azure Active Directory Connect Health. Depending on whether the service is monitoring, ADFS, Sync or ADDS roles, the service type can either be AdFederationService or AadSyncService or AdDomainService.
 * @param skipCount - The skip count, which specifies the number of elements that can be bypassed from a sequence and then return the remaining elements.
 * @param takeCount - The take count , which specifies the number of elements that can be returned from a sequence.
 */
export const addsServicesListPremiumServices =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesListPremiumServicesInput,
    outputSchema: AddsServicesListPremiumServicesOutput,
  }));
// Input Schema
export const AddsServicesListReplicationDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    withDetails: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/replicationdetails",
    }),
  );
export type AddsServicesListReplicationDetailsInput =
  typeof AddsServicesListReplicationDetailsInput.Type;

// Output Schema
export const AddsServicesListReplicationDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          targetServer: Schema.optional(Schema.String),
          site: Schema.optional(Schema.String),
          domain: Schema.optional(Schema.String),
          status: Schema.optional(Schema.Number),
          lastAttemptedSync: Schema.optional(Schema.String),
          lastSuccessfulSync: Schema.optional(Schema.String),
          inboundNeighborCollection: Schema.optional(
            Schema.Array(
              Schema.Struct({
                sourceDomainController: Schema.optional(Schema.String),
                consecutiveFailureCount: Schema.optional(Schema.Number),
                namingContext: Schema.optional(Schema.String),
                status: Schema.optional(Schema.Number),
                lastAttemptedSync: Schema.optional(Schema.String),
                lastSuccessfulSync: Schema.optional(Schema.String),
                lastErrorCode: Schema.optional(Schema.Number),
                lastErrorMessage: Schema.optional(Schema.String),
                errorTitle: Schema.optional(Schema.String),
                errorDescription: Schema.optional(Schema.String),
                fixLink: Schema.optional(Schema.String),
                fixDetails: Schema.optional(Schema.String),
                additionalInfo: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
    nextLink: Schema.optional(Schema.String),
  });
export type AddsServicesListReplicationDetailsOutput =
  typeof AddsServicesListReplicationDetailsOutput.Type;

// The operation
/**
 * Gets complete domain controller list along with replication details for a given Active Directory Domain Service, that is onboarded to Azure Active Directory Connect Health.
 *
 * @param serviceName - The name of the service.
 * @param $filter - The server property filter to apply.
 * @param withDetails - Indicates if InboundReplicationNeighbor details are required or not.
 */
export const addsServicesListReplicationDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesListReplicationDetailsInput,
    outputSchema: AddsServicesListReplicationDetailsOutput,
  }));
// Input Schema
export const AddsServicesListReplicationSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    isGroupbySite: Schema.Boolean,
    query: Schema.String,
    nextPartitionKey: Schema.Literals([" "]),
    nextRowKey: Schema.Literals([" "]),
    takeCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/replicationsummary",
    }),
  );
export type AddsServicesListReplicationSummaryInput =
  typeof AddsServicesListReplicationSummaryInput.Type;

// Output Schema
export const AddsServicesListReplicationSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          targetServer: Schema.optional(Schema.String),
          site: Schema.optional(Schema.String),
          domain: Schema.optional(Schema.String),
          status: Schema.optional(Schema.Number),
          lastAttemptedSync: Schema.optional(Schema.String),
          lastSuccessfulSync: Schema.optional(Schema.String),
          inboundNeighborCollection: Schema.optional(
            Schema.Array(
              Schema.Struct({
                sourceDomainController: Schema.optional(Schema.String),
                consecutiveFailureCount: Schema.optional(Schema.Number),
                namingContext: Schema.optional(Schema.String),
                status: Schema.optional(Schema.Number),
                lastAttemptedSync: Schema.optional(Schema.String),
                lastSuccessfulSync: Schema.optional(Schema.String),
                lastErrorCode: Schema.optional(Schema.Number),
                lastErrorMessage: Schema.optional(Schema.String),
                errorTitle: Schema.optional(Schema.String),
                errorDescription: Schema.optional(Schema.String),
                fixLink: Schema.optional(Schema.String),
                fixDetails: Schema.optional(Schema.String),
                additionalInfo: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type AddsServicesListReplicationSummaryOutput =
  typeof AddsServicesListReplicationSummaryOutput.Type;

// The operation
/**
 * Gets complete domain controller list along with replication details for a given Active Directory Domain Service, that is onboarded to Azure Active Directory Connect Health.
 *
 * @param serviceName - The name of the service.
 * @param $filter - The server property filter to apply.
 * @param isGroupbySite - Indicates if the result should be grouped by site or not.
 * @param query - The custom query.
 * @param nextPartitionKey - The next partition key to query for.
 * @param nextRowKey - The next row key to query for.
 * @param takeCount - The take count , which specifies the number of elements that can be returned from a sequence.
 */
export const addsServicesListReplicationSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesListReplicationSummaryInput,
    outputSchema: AddsServicesListReplicationSummaryOutput,
  }));
// Input Schema
export const AddsServicesListServerAlertsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceMemberId: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    from: Schema.optional(Schema.String),
    to: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/servicemembers/{serviceMemberId}/alerts",
    }),
  );
export type AddsServicesListServerAlertsInput =
  typeof AddsServicesListServerAlertsInput.Type;

// Output Schema
export const AddsServicesListServerAlertsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          alertId: Schema.optional(Schema.String),
          level: Schema.optional(
            Schema.Literals(["Warning", "Error", "PreWarning"]),
          ),
          state: Schema.optional(
            Schema.Literals([
              "Active",
              "ResolvedByPositiveResult",
              "ResolvedManually",
              "ResolvedByTimer",
              "ResolvedByStateChange",
            ]),
          ),
          shortName: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          remediation: Schema.optional(Schema.String),
          relatedLinks: Schema.optional(
            Schema.Array(
              Schema.Struct({
                title: Schema.optional(Schema.String),
                url: Schema.optional(Schema.String),
              }),
            ),
          ),
          scope: Schema.optional(Schema.String),
          additionalInformation: Schema.optional(
            Schema.Array(
              Schema.Struct({
                titleName: Schema.optional(Schema.String),
                titleValue: Schema.optional(Schema.String),
                properties: Schema.optional(Schema.Unknown),
                hasProperties: Schema.optional(Schema.Boolean),
              }),
            ),
          ),
          createdDate: Schema.optional(Schema.String),
          resolvedDate: Schema.optional(Schema.String),
          lastUpdated: Schema.optional(Schema.String),
          monitorRoleType: Schema.optional(Schema.String),
          activeAlertProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          resolvedAlertProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          tenantId: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          serviceMemberId: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type AddsServicesListServerAlertsOutput =
  typeof AddsServicesListServerAlertsOutput.Type;

// The operation
/**
 * Gets the details of an alert for a given Active Directory Domain Controller service and server combination.
 *
 * @param serviceMemberId - The server Id for which the alert details needs to be queried.
 * @param serviceName - The name of the service.
 * @param $filter - The alert property filter to apply.
 * @param state - The alert state to query for.
 * @param from - The start date to query for.
 * @param to - The end date till when to query for.
 */
export const addsServicesListServerAlerts =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesListServerAlertsInput,
    outputSchema: AddsServicesListServerAlertsOutput,
  }));
// Input Schema
export const AddsServicesReplicationStatusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/replicationstatus",
    }),
  );
export type AddsServicesReplicationStatusGetInput =
  typeof AddsServicesReplicationStatusGetInput.Type;

// Output Schema
export const AddsServicesReplicationStatusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    forestName: Schema.optional(Schema.String),
    totalDcCount: Schema.optional(Schema.Number),
    errorDcCount: Schema.optional(Schema.Number),
  });
export type AddsServicesReplicationStatusGetOutput =
  typeof AddsServicesReplicationStatusGetOutput.Type;

// The operation
/**
 * Gets Replication status for a given Active Directory Domain Service, that is onboarded to Azure Active Directory Connect Health.
 *
 * @param serviceName - The name of the service.
 */
export const addsServicesReplicationStatusGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesReplicationStatusGetInput,
    outputSchema: AddsServicesReplicationStatusGetOutput,
  }));
// Input Schema
export const AddsServicesServiceMembersAddInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/servicemembers",
    }),
  );
export type AddsServicesServiceMembersAddInput =
  typeof AddsServicesServiceMembersAddInput.Type;

// Output Schema
export const AddsServicesServiceMembersAddOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceMemberId: Schema.optional(Schema.String),
    serviceId: Schema.optional(Schema.String),
    tenantId: Schema.optional(Schema.String),
    activeAlerts: Schema.optional(Schema.Number),
    additionalInformation: Schema.optional(Schema.String),
    createdDate: Schema.optional(Schema.String),
    dimensions: Schema.optional(Schema.Unknown),
    disabled: Schema.optional(Schema.Boolean),
    disabledReason: Schema.optional(Schema.Number),
    installedQfes: Schema.optional(Schema.Unknown),
    lastDisabled: Schema.optional(Schema.String),
    lastReboot: Schema.optional(Schema.String),
    lastServerReportedMonitoringLevelChange: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
    machineId: Schema.optional(Schema.String),
    machineName: Schema.optional(Schema.String),
    monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
    monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
    osName: Schema.optional(Schema.String),
    osVersion: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.Unknown),
    recommendedQfes: Schema.optional(Schema.Unknown),
    resolvedAlerts: Schema.optional(Schema.Number),
    role: Schema.optional(Schema.String),
    serverReportedMonitoringLevel: Schema.optional(
      Schema.Literals(["Partial", "Full", "Off"]),
    ),
    status: Schema.optional(Schema.String),
  });
export type AddsServicesServiceMembersAddOutput =
  typeof AddsServicesServiceMembersAddOutput.Type;

// The operation
/**
 * Onboards  a server, for a given Active Directory Domain Controller service, to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service under which the server is to be onboarded.
 */
export const addsServicesServiceMembersAdd =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesServiceMembersAddInput,
    outputSchema: AddsServicesServiceMembersAddOutput,
  }));
// Input Schema
export const AddsServicesServiceMembersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    dimensionType: Schema.optional(Schema.String),
    dimensionSignature: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/servicemembers",
    }),
  );
export type AddsServicesServiceMembersListInput =
  typeof AddsServicesServiceMembersListInput.Type;

// Output Schema
export const AddsServicesServiceMembersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          serviceMemberId: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          tenantId: Schema.optional(Schema.String),
          activeAlerts: Schema.optional(Schema.Number),
          additionalInformation: Schema.optional(Schema.String),
          createdDate: Schema.optional(Schema.String),
          dimensions: Schema.optional(Schema.Unknown),
          disabled: Schema.optional(Schema.Boolean),
          disabledReason: Schema.optional(Schema.Number),
          installedQfes: Schema.optional(Schema.Unknown),
          lastDisabled: Schema.optional(Schema.String),
          lastReboot: Schema.optional(Schema.String),
          lastServerReportedMonitoringLevelChange: Schema.optional(
            Schema.String,
          ),
          lastUpdated: Schema.optional(Schema.String),
          machineId: Schema.optional(Schema.String),
          machineName: Schema.optional(Schema.String),
          monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
          monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
          osName: Schema.optional(Schema.String),
          osVersion: Schema.optional(Schema.String),
          properties: Schema.optional(Schema.Unknown),
          recommendedQfes: Schema.optional(Schema.Unknown),
          resolvedAlerts: Schema.optional(Schema.Number),
          role: Schema.optional(Schema.String),
          serverReportedMonitoringLevel: Schema.optional(
            Schema.Literals(["Partial", "Full", "Off"]),
          ),
          status: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type AddsServicesServiceMembersListOutput =
  typeof AddsServicesServiceMembersListOutput.Type;

// The operation
/**
 * Gets the details of the servers, for a given Active Directory Domain Controller service, that are onboarded to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service.
 * @param $filter - The server property filter to apply.
 * @param dimensionType - The server specific dimension.
 * @param dimensionSignature - The value of the dimension.
 */
export const addsServicesServiceMembersList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesServiceMembersListInput,
    outputSchema: AddsServicesServiceMembersListOutput,
  }));
// Input Schema
export const AddsServicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}",
    }),
  );
export type AddsServicesUpdateInput = typeof AddsServicesUpdateInput.Type;

// Output Schema
export const AddsServicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    activeAlerts: Schema.optional(Schema.Number),
    additionalInformation: Schema.optional(Schema.String),
    createdDate: Schema.optional(Schema.String),
    customNotificationEmails: Schema.optional(Schema.Array(Schema.String)),
    disabled: Schema.optional(Schema.Boolean),
    displayName: Schema.optional(Schema.String),
    health: Schema.optional(Schema.String),
    lastDisabled: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
    monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
    monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
    notificationEmailEnabled: Schema.optional(Schema.Boolean),
    notificationEmailEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
    notificationEmailsEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
    notificationEmails: Schema.optional(Schema.Array(Schema.String)),
    originalDisabledState: Schema.optional(Schema.Boolean),
    resolvedAlerts: Schema.optional(Schema.Number),
    serviceId: Schema.optional(Schema.String),
    serviceName: Schema.optional(Schema.String),
    signature: Schema.optional(Schema.String),
    simpleProperties: Schema.optional(Schema.Unknown),
    tenantId: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type AddsServicesUpdateOutput = typeof AddsServicesUpdateOutput.Type;

// The operation
/**
 * Updates an Active Directory Domain Service properties of an onboarded service.
 *
 * @param serviceName - The name of the service which needs to be deleted.
 */
export const addsServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddsServicesUpdateInput,
  outputSchema: AddsServicesUpdateOutput,
}));
// Input Schema
export const AddsServicesUserPreferenceAddInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    featureName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/features/{featureName}/userpreference",
    }),
  );
export type AddsServicesUserPreferenceAddInput =
  typeof AddsServicesUserPreferenceAddInput.Type;

// Output Schema
export const AddsServicesUserPreferenceAddOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AddsServicesUserPreferenceAddOutput =
  typeof AddsServicesUserPreferenceAddOutput.Type;

// The operation
/**
 * Adds the user preferences for a given feature.
 *
 * @param serviceName - The name of the service.
 * @param featureName - The name of the feature.
 */
export const addsServicesUserPreferenceAdd =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesUserPreferenceAddInput,
    outputSchema: AddsServicesUserPreferenceAddOutput,
  }));
// Input Schema
export const AddsServicesUserPreferenceDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    featureName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/features/{featureName}/userpreference",
    }),
  );
export type AddsServicesUserPreferenceDeleteInput =
  typeof AddsServicesUserPreferenceDeleteInput.Type;

// Output Schema
export const AddsServicesUserPreferenceDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AddsServicesUserPreferenceDeleteOutput =
  typeof AddsServicesUserPreferenceDeleteOutput.Type;

// The operation
/**
 * Deletes the user preferences for a given feature.
 *
 * @param serviceName - The name of the service.
 * @param featureName - The name of the feature.
 */
export const addsServicesUserPreferenceDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesUserPreferenceDeleteInput,
    outputSchema: AddsServicesUserPreferenceDeleteOutput,
  }));
// Input Schema
export const AddsServicesUserPreferenceGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    featureName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/features/{featureName}/userpreference",
    }),
  );
export type AddsServicesUserPreferenceGetInput =
  typeof AddsServicesUserPreferenceGetInput.Type;

// Output Schema
export const AddsServicesUserPreferenceGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    metricNames: Schema.optional(Schema.Array(Schema.String)),
  });
export type AddsServicesUserPreferenceGetOutput =
  typeof AddsServicesUserPreferenceGetOutput.Type;

// The operation
/**
 * Gets the user preferences for a given feature.
 *
 * @param serviceName - The name of the service.
 * @param featureName - The name of the feature.
 */
export const addsServicesUserPreferenceGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddsServicesUserPreferenceGetInput,
    outputSchema: AddsServicesUserPreferenceGetOutput,
  }));
// Input Schema
export const AlertsListAddsAlertsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    from: Schema.optional(Schema.String),
    to: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/alerts",
    }),
  );
export type AlertsListAddsAlertsInput = typeof AlertsListAddsAlertsInput.Type;

// Output Schema
export const AlertsListAddsAlertsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          alertId: Schema.optional(Schema.String),
          level: Schema.optional(
            Schema.Literals(["Warning", "Error", "PreWarning"]),
          ),
          state: Schema.optional(
            Schema.Literals([
              "Active",
              "ResolvedByPositiveResult",
              "ResolvedManually",
              "ResolvedByTimer",
              "ResolvedByStateChange",
            ]),
          ),
          shortName: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          remediation: Schema.optional(Schema.String),
          relatedLinks: Schema.optional(
            Schema.Array(
              Schema.Struct({
                title: Schema.optional(Schema.String),
                url: Schema.optional(Schema.String),
              }),
            ),
          ),
          scope: Schema.optional(Schema.String),
          additionalInformation: Schema.optional(
            Schema.Array(
              Schema.Struct({
                titleName: Schema.optional(Schema.String),
                titleValue: Schema.optional(Schema.String),
                properties: Schema.optional(Schema.Unknown),
                hasProperties: Schema.optional(Schema.Boolean),
              }),
            ),
          ),
          createdDate: Schema.optional(Schema.String),
          resolvedDate: Schema.optional(Schema.String),
          lastUpdated: Schema.optional(Schema.String),
          monitorRoleType: Schema.optional(Schema.String),
          activeAlertProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          resolvedAlertProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          tenantId: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          serviceMemberId: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type AlertsListAddsAlertsOutput = typeof AlertsListAddsAlertsOutput.Type;

// The operation
/**
 * Gets the alerts for a given Active Directory Domain Service.
 *
 * @param serviceName - The name of the service.
 * @param $filter - The alert property filter to apply.
 * @param state - The alert state to query for.
 * @param from - The start date to query for.
 * @param to - The end date till when to query for.
 */
export const alertsListAddsAlerts = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AlertsListAddsAlertsInput,
    outputSchema: AlertsListAddsAlertsOutput,
  }),
);
// Input Schema
export const ConfigurationAddInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.ADHybridHealthService/configuration",
  }),
);
export type ConfigurationAddInput = typeof ConfigurationAddInput.Type;

// Output Schema
export const ConfigurationAddOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tenantId: Schema.optional(Schema.String),
    aadLicense: Schema.optional(Schema.String),
    aadPremium: Schema.optional(Schema.Boolean),
    agentAutoUpdate: Schema.optional(Schema.Boolean),
    alertSuppressionTimeInMins: Schema.optional(Schema.Number),
    consentedToMicrosoftDevOps: Schema.optional(Schema.Boolean),
    countryLetterCode: Schema.optional(Schema.String),
    createdDate: Schema.optional(Schema.String),
    devOpsTtl: Schema.optional(Schema.String),
    disabled: Schema.optional(Schema.Boolean),
    disabledReason: Schema.optional(Schema.Number),
    globalAdminsEmail: Schema.optional(Schema.Array(Schema.String)),
    initialDomain: Schema.optional(Schema.String),
    lastDisabled: Schema.optional(Schema.String),
    lastVerified: Schema.optional(Schema.String),
    onboardingAllowed: Schema.optional(Schema.Boolean),
    onboarded: Schema.optional(Schema.Boolean),
    pksCertificate: Schema.optional(Schema.Unknown),
    privatePreviewTenant: Schema.optional(Schema.Boolean),
    tenantInQuarantine: Schema.optional(Schema.Boolean),
    tenantName: Schema.optional(Schema.String),
  },
);
export type ConfigurationAddOutput = typeof ConfigurationAddOutput.Type;

// The operation
/**
 * Onboards a tenant in Azure Active Directory Connect Health.
 */
export const configurationAdd = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConfigurationAddInput,
  outputSchema: ConfigurationAddOutput,
}));
// Input Schema
export const ConfigurationGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ADHybridHealthService/configuration",
  }),
);
export type ConfigurationGetInput = typeof ConfigurationGetInput.Type;

// Output Schema
export const ConfigurationGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tenantId: Schema.optional(Schema.String),
    aadLicense: Schema.optional(Schema.String),
    aadPremium: Schema.optional(Schema.Boolean),
    agentAutoUpdate: Schema.optional(Schema.Boolean),
    alertSuppressionTimeInMins: Schema.optional(Schema.Number),
    consentedToMicrosoftDevOps: Schema.optional(Schema.Boolean),
    countryLetterCode: Schema.optional(Schema.String),
    createdDate: Schema.optional(Schema.String),
    devOpsTtl: Schema.optional(Schema.String),
    disabled: Schema.optional(Schema.Boolean),
    disabledReason: Schema.optional(Schema.Number),
    globalAdminsEmail: Schema.optional(Schema.Array(Schema.String)),
    initialDomain: Schema.optional(Schema.String),
    lastDisabled: Schema.optional(Schema.String),
    lastVerified: Schema.optional(Schema.String),
    onboardingAllowed: Schema.optional(Schema.Boolean),
    onboarded: Schema.optional(Schema.Boolean),
    pksCertificate: Schema.optional(Schema.Unknown),
    privatePreviewTenant: Schema.optional(Schema.Boolean),
    tenantInQuarantine: Schema.optional(Schema.Boolean),
    tenantName: Schema.optional(Schema.String),
  },
);
export type ConfigurationGetOutput = typeof ConfigurationGetOutput.Type;

// The operation
/**
 * Gets the details of a tenant onboarded to Azure Active Directory Connect Health.
 */
export const configurationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConfigurationGetInput,
  outputSchema: ConfigurationGetOutput,
}));
// Input Schema
export const ConfigurationListAddsConfigurationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    grouping: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/configuration",
    }),
  );
export type ConfigurationListAddsConfigurationsInput =
  typeof ConfigurationListAddsConfigurationsInput.Type;

// Output Schema
export const ConfigurationListAddsConfigurationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type ConfigurationListAddsConfigurationsOutput =
  typeof ConfigurationListAddsConfigurationsOutput.Type;

// The operation
/**
 * Gets the service configurations.
 *
 * @param serviceName - The name of the service.
 * @param grouping - The grouping for configurations.
 */
export const configurationListAddsConfigurations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationListAddsConfigurationsInput,
    outputSchema: ConfigurationListAddsConfigurationsOutput,
  }));
// Input Schema
export const ConfigurationUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.ADHybridHealthService/configuration",
    }),
  );
export type ConfigurationUpdateInput = typeof ConfigurationUpdateInput.Type;

// Output Schema
export const ConfigurationUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tenantId: Schema.optional(Schema.String),
    aadLicense: Schema.optional(Schema.String),
    aadPremium: Schema.optional(Schema.Boolean),
    agentAutoUpdate: Schema.optional(Schema.Boolean),
    alertSuppressionTimeInMins: Schema.optional(Schema.Number),
    consentedToMicrosoftDevOps: Schema.optional(Schema.Boolean),
    countryLetterCode: Schema.optional(Schema.String),
    createdDate: Schema.optional(Schema.String),
    devOpsTtl: Schema.optional(Schema.String),
    disabled: Schema.optional(Schema.Boolean),
    disabledReason: Schema.optional(Schema.Number),
    globalAdminsEmail: Schema.optional(Schema.Array(Schema.String)),
    initialDomain: Schema.optional(Schema.String),
    lastDisabled: Schema.optional(Schema.String),
    lastVerified: Schema.optional(Schema.String),
    onboardingAllowed: Schema.optional(Schema.Boolean),
    onboarded: Schema.optional(Schema.Boolean),
    pksCertificate: Schema.optional(Schema.Unknown),
    privatePreviewTenant: Schema.optional(Schema.Boolean),
    tenantInQuarantine: Schema.optional(Schema.Boolean),
    tenantName: Schema.optional(Schema.String),
  });
export type ConfigurationUpdateOutput = typeof ConfigurationUpdateOutput.Type;

// The operation
/**
 * Updates tenant properties for tenants onboarded to Azure Active Directory Connect Health.
 */
export const configurationUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConfigurationUpdateInput,
  outputSchema: ConfigurationUpdateOutput,
}));
// Input Schema
export const DimensionsListAddsDimensionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    dimension: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/dimensions/{dimension}",
    }),
  );
export type DimensionsListAddsDimensionsInput =
  typeof DimensionsListAddsDimensionsInput.Type;

// Output Schema
export const DimensionsListAddsDimensionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          health: Schema.optional(
            Schema.Literals([
              "Healthy",
              "Warning",
              "Error",
              "NotMonitored",
              "Missing",
            ]),
          ),
          simpleProperties: Schema.optional(Schema.Unknown),
          activeAlerts: Schema.optional(Schema.Number),
          additionalInformation: Schema.optional(Schema.String),
          lastUpdated: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          resolvedAlerts: Schema.optional(Schema.Number),
          signature: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type DimensionsListAddsDimensionsOutput =
  typeof DimensionsListAddsDimensionsOutput.Type;

// The operation
/**
 * Gets the dimensions for a given dimension type in a server.
 *
 * @param serviceName - The name of the service.
 * @param dimension - The dimension type.
 */
export const dimensionsListAddsDimensions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DimensionsListAddsDimensionsInput,
    outputSchema: DimensionsListAddsDimensionsOutput,
  }));
// Input Schema
export const ListIPAddressAggregatesByServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    skiptoken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/ipAddressAggregates",
    }),
  );
export type ListIPAddressAggregatesByServiceInput =
  typeof ListIPAddressAggregatesByServiceInput.Type;

// Output Schema
export const ListIPAddressAggregatesByServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          tenantId: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          ipAddress: Schema.optional(Schema.String),
          timestamp: Schema.optional(Schema.String),
          firstAuditTimestamp: Schema.optional(Schema.String),
          lastAuditTimestamp: Schema.optional(Schema.String),
          extranetLockoutErrorCount: Schema.optional(Schema.Number),
          badPasswordErrorCount: Schema.optional(Schema.Number),
          uniqueUsernamesAttemptedCount: Schema.optional(Schema.Number),
          attemptCountThresholdIsExceeded: Schema.optional(Schema.Boolean),
          timeSpan: Schema.optional(Schema.String),
          isWhitelistedIpAddress: Schema.optional(Schema.Boolean),
          networkLocation: Schema.optional(Schema.String),
          attemptCountThresholdOnTrigger: Schema.optional(Schema.Number),
          attemptThresholdTypeOnTrigger: Schema.optional(Schema.String),
          geographicLocation: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type ListIPAddressAggregatesByServiceOutput =
  typeof ListIPAddressAggregatesByServiceOutput.Type;

// The operation
/**
 * Gets the IP address aggregates for a given service.
 *
 * @param serviceName - The name of the service.
 * @param skiptoken - A continuationtoken value returned in paginated result to load different pages.
 */
export const listIPAddressAggregatesByService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListIPAddressAggregatesByServiceInput,
    outputSchema: ListIPAddressAggregatesByServiceOutput,
  }));
// Input Schema
export const ListIPAddressAggregateSettingsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/ipAddressAggregateSettings",
    }),
  );
export type ListIPAddressAggregateSettingsInput =
  typeof ListIPAddressAggregateSettingsInput.Type;

// Output Schema
export const ListIPAddressAggregateSettingsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    badPasswordAndExtranetLockoutCombinedDailyThreshold: Schema.optional(
      Schema.Number,
    ),
    badPasswordAndExtranetLockoutCombinedHourlyThreshold: Schema.optional(
      Schema.Number,
    ),
    extranetLockoutDailyThreshold: Schema.optional(Schema.Number),
    extranetLockoutHourlyThreshold: Schema.optional(Schema.Number),
    emailNotificationEnabled: Schema.optional(Schema.Boolean),
  });
export type ListIPAddressAggregateSettingsOutput =
  typeof ListIPAddressAggregateSettingsOutput.Type;

// The operation
/**
 * Gets the IP address aggregate settings.
 *
 * @param serviceName - The name of the service.
 */
export const listIPAddressAggregateSettings =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListIPAddressAggregateSettingsInput,
    outputSchema: ListIPAddressAggregateSettingsOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ADHybridHealthService/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        display: Schema.optional(Schema.Unknown),
      }),
    ),
  ),
  totalCount: Schema.optional(Schema.Number),
  continuationToken: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists the available Azure Data Factory API operations.
 */
export const operationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const ReportsGetDevOpsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ADHybridHealthService/reports/DevOps/IsDevOps",
  }),
);
export type ReportsGetDevOpsInput = typeof ReportsGetDevOpsInput.Type;

// Output Schema
export const ReportsGetDevOpsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(Schema.Boolean),
  },
);
export type ReportsGetDevOpsOutput = typeof ReportsGetDevOpsOutput.Type;

// The operation
/**
 * Checks if the user is enabled for Dev Ops access.
 */
export const reportsGetDevOps = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReportsGetDevOpsInput,
  outputSchema: ReportsGetDevOpsOutput,
}));
// Input Schema
export const ServiceGetMetricsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    serviceName: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    groupKey: Schema.optional(Schema.String),
    fromDate: Schema.optional(Schema.String),
    toDate: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/metrics/{metricName}/groups/{groupName}",
  }),
);
export type ServiceGetMetricsInput = typeof ServiceGetMetricsInput.Type;

// Output Schema
export const ServiceGetMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sets: Schema.optional(
      Schema.Array(
        Schema.Struct({
          setName: Schema.optional(Schema.String),
          values: Schema.optional(Schema.Array(Schema.Number)),
        }),
      ),
    ),
    timeStamps: Schema.optional(Schema.Array(Schema.String)),
  });
export type ServiceGetMetricsOutput = typeof ServiceGetMetricsOutput.Type;

// The operation
/**
 * Gets the server related metrics for a given metric and group combination.
 *
 * @param serviceName - The name of the service.
 * @param metricName - The metric name
 * @param groupName - The group name
 * @param groupKey - The group key
 * @param fromDate - The start date.
 * @param toDate - The end date.
 */
export const serviceGetMetrics = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServiceGetMetricsInput,
  outputSchema: ServiceGetMetricsOutput,
}));
// Input Schema
export const ServiceMembersAddInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    serviceName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers",
  }),
);
export type ServiceMembersAddInput = typeof ServiceMembersAddInput.Type;

// Output Schema
export const ServiceMembersAddOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceMemberId: Schema.optional(Schema.String),
    serviceId: Schema.optional(Schema.String),
    tenantId: Schema.optional(Schema.String),
    activeAlerts: Schema.optional(Schema.Number),
    additionalInformation: Schema.optional(Schema.String),
    createdDate: Schema.optional(Schema.String),
    dimensions: Schema.optional(Schema.Unknown),
    disabled: Schema.optional(Schema.Boolean),
    disabledReason: Schema.optional(Schema.Number),
    installedQfes: Schema.optional(Schema.Unknown),
    lastDisabled: Schema.optional(Schema.String),
    lastReboot: Schema.optional(Schema.String),
    lastServerReportedMonitoringLevelChange: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
    machineId: Schema.optional(Schema.String),
    machineName: Schema.optional(Schema.String),
    monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
    monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
    osName: Schema.optional(Schema.String),
    osVersion: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.Unknown),
    recommendedQfes: Schema.optional(Schema.Unknown),
    resolvedAlerts: Schema.optional(Schema.Number),
    role: Schema.optional(Schema.String),
    serverReportedMonitoringLevel: Schema.optional(
      Schema.Literals(["Partial", "Full", "Off"]),
    ),
    status: Schema.optional(Schema.String),
  });
export type ServiceMembersAddOutput = typeof ServiceMembersAddOutput.Type;

// The operation
/**
 * Onboards  a server, for a given service, to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service under which the server is to be onboarded.
 */
export const serviceMembersAdd = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServiceMembersAddInput,
  outputSchema: ServiceMembersAddOutput,
}));
// Input Schema
export const ServiceMembersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
    confirm: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers/{serviceMemberId}",
    }),
  );
export type ServiceMembersDeleteInput = typeof ServiceMembersDeleteInput.Type;

// Output Schema
export const ServiceMembersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServiceMembersDeleteOutput = typeof ServiceMembersDeleteOutput.Type;

// The operation
/**
 * Deletes a server that has been onboarded to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service.
 * @param serviceMemberId - The server Id.
 * @param confirm - Indicates if the server will be permanently deleted or disabled. True indicates that the server will be permanently deleted and False indicates that the server will be marked disabled and then deleted after 30 days, if it is not re-registered.
 */
export const serviceMembersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServiceMembersDeleteInput,
    outputSchema: ServiceMembersDeleteOutput,
  }),
);
// Input Schema
export const ServiceMembersDeleteDataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers/{serviceMemberId}/data",
    }),
  );
export type ServiceMembersDeleteDataInput =
  typeof ServiceMembersDeleteDataInput.Type;

// Output Schema
export const ServiceMembersDeleteDataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServiceMembersDeleteDataOutput =
  typeof ServiceMembersDeleteDataOutput.Type;

// The operation
/**
 * Deletes the data uploaded by the server to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service.
 * @param serviceMemberId - The server Id.
 */
export const serviceMembersDeleteData = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServiceMembersDeleteDataInput,
    outputSchema: ServiceMembersDeleteDataOutput,
  }),
);
// Input Schema
export const ServiceMembersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers/{serviceMemberId}",
  }),
);
export type ServiceMembersGetInput = typeof ServiceMembersGetInput.Type;

// Output Schema
export const ServiceMembersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceMemberId: Schema.optional(Schema.String),
    serviceId: Schema.optional(Schema.String),
    tenantId: Schema.optional(Schema.String),
    activeAlerts: Schema.optional(Schema.Number),
    additionalInformation: Schema.optional(Schema.String),
    createdDate: Schema.optional(Schema.String),
    dimensions: Schema.optional(Schema.Unknown),
    disabled: Schema.optional(Schema.Boolean),
    disabledReason: Schema.optional(Schema.Number),
    installedQfes: Schema.optional(Schema.Unknown),
    lastDisabled: Schema.optional(Schema.String),
    lastReboot: Schema.optional(Schema.String),
    lastServerReportedMonitoringLevelChange: Schema.optional(Schema.String),
    lastUpdated: Schema.optional(Schema.String),
    machineId: Schema.optional(Schema.String),
    machineName: Schema.optional(Schema.String),
    monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
    monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
    osName: Schema.optional(Schema.String),
    osVersion: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.Unknown),
    recommendedQfes: Schema.optional(Schema.Unknown),
    resolvedAlerts: Schema.optional(Schema.Number),
    role: Schema.optional(Schema.String),
    serverReportedMonitoringLevel: Schema.optional(
      Schema.Literals(["Partial", "Full", "Off"]),
    ),
    status: Schema.optional(Schema.String),
  });
export type ServiceMembersGetOutput = typeof ServiceMembersGetOutput.Type;

// The operation
/**
 * Gets the details of a server, for a given service, that are onboarded to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service.
 * @param serviceMemberId - The server Id.
 */
export const serviceMembersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServiceMembersGetInput,
  outputSchema: ServiceMembersGetOutput,
}));
// Input Schema
export const ServiceMembersGetConnectorMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers/{serviceMemberId}/metrics/{metricName}",
    }),
  );
export type ServiceMembersGetConnectorMetadataInput =
  typeof ServiceMembersGetConnectorMetadataInput.Type;

// Output Schema
export const ServiceMembersGetConnectorMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectors: Schema.optional(
      Schema.Array(
        Schema.Struct({
          connectorId: Schema.optional(Schema.String),
          connectorDisplayName: Schema.optional(Schema.String),
        }),
      ),
    ),
    runProfileNames: Schema.optional(Schema.Array(Schema.String)),
  });
export type ServiceMembersGetConnectorMetadataOutput =
  typeof ServiceMembersGetConnectorMetadataOutput.Type;

// The operation
/**
 * Gets the list of connectors and run profile names.
 *
 * @param serviceName - The name of the service.
 * @param serviceMemberId - The service member id.
 * @param metricName - The name of the metric.
 */
export const serviceMembersGetConnectorMetadata =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceMembersGetConnectorMetadataInput,
    outputSchema: ServiceMembersGetConnectorMetadataOutput,
  }));
// Input Schema
export const ServiceMembersGetMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
    groupKey: Schema.optional(Schema.String),
    fromDate: Schema.optional(Schema.String),
    toDate: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers/{serviceMemberId}/metrics/{metricName}/groups/{groupName}",
    }),
  );
export type ServiceMembersGetMetricsInput =
  typeof ServiceMembersGetMetricsInput.Type;

// Output Schema
export const ServiceMembersGetMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sets: Schema.optional(
      Schema.Array(
        Schema.Struct({
          setName: Schema.optional(Schema.String),
          values: Schema.optional(Schema.Array(Schema.Number)),
        }),
      ),
    ),
    timeStamps: Schema.optional(Schema.Array(Schema.String)),
  });
export type ServiceMembersGetMetricsOutput =
  typeof ServiceMembersGetMetricsOutput.Type;

// The operation
/**
 * Gets the server related metrics for a given metric and group combination.
 *
 * @param serviceName - The name of the service.
 * @param metricName - The metric name
 * @param groupName - The group name
 * @param serviceMemberId - The server id.
 * @param groupKey - The group key
 * @param fromDate - The start date.
 * @param toDate - The end date.
 */
export const serviceMembersGetMetrics = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServiceMembersGetMetricsInput,
    outputSchema: ServiceMembersGetMetricsOutput,
  }),
);
// Input Schema
export const ServiceMembersGetServiceConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers/{serviceMemberId}/serviceconfiguration",
    }),
  );
export type ServiceMembersGetServiceConfigurationInput =
  typeof ServiceMembersGetServiceConfigurationInput.Type;

// Output Schema
export const ServiceMembersGetServiceConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    version: Schema.optional(Schema.String),
    serviceType: Schema.optional(Schema.Number),
    serviceAccount: Schema.optional(Schema.String),
    sqlServer: Schema.optional(Schema.String),
    sqlVersion: Schema.optional(Schema.String),
    sqlEdition: Schema.optional(Schema.String),
    sqlInstance: Schema.optional(Schema.String),
    sqlDatabaseName: Schema.optional(Schema.String),
    sqlDatabaseSize: Schema.optional(Schema.Number),
  });
export type ServiceMembersGetServiceConfigurationOutput =
  typeof ServiceMembersGetServiceConfigurationOutput.Type;

// The operation
/**
 * Gets the service configuration.
 *
 * @param serviceName - The name of the service.
 * @param serviceMemberId - The server Id.
 */
export const serviceMembersGetServiceConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceMembersGetServiceConfigurationInput,
    outputSchema: ServiceMembersGetServiceConfigurationOutput,
  }));
// Input Schema
export const ServiceMembersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    dimensionType: Schema.optional(Schema.String),
    dimensionSignature: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers",
    }),
  );
export type ServiceMembersListInput = typeof ServiceMembersListInput.Type;

// Output Schema
export const ServiceMembersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          serviceMemberId: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          tenantId: Schema.optional(Schema.String),
          activeAlerts: Schema.optional(Schema.Number),
          additionalInformation: Schema.optional(Schema.String),
          createdDate: Schema.optional(Schema.String),
          dimensions: Schema.optional(Schema.Unknown),
          disabled: Schema.optional(Schema.Boolean),
          disabledReason: Schema.optional(Schema.Number),
          installedQfes: Schema.optional(Schema.Unknown),
          lastDisabled: Schema.optional(Schema.String),
          lastReboot: Schema.optional(Schema.String),
          lastServerReportedMonitoringLevelChange: Schema.optional(
            Schema.String,
          ),
          lastUpdated: Schema.optional(Schema.String),
          machineId: Schema.optional(Schema.String),
          machineName: Schema.optional(Schema.String),
          monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
          monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
          osName: Schema.optional(Schema.String),
          osVersion: Schema.optional(Schema.String),
          properties: Schema.optional(Schema.Unknown),
          recommendedQfes: Schema.optional(Schema.Unknown),
          resolvedAlerts: Schema.optional(Schema.Number),
          role: Schema.optional(Schema.String),
          serverReportedMonitoringLevel: Schema.optional(
            Schema.Literals(["Partial", "Full", "Off"]),
          ),
          status: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type ServiceMembersListOutput = typeof ServiceMembersListOutput.Type;

// The operation
/**
 * Gets the details of the servers, for a given service, that are onboarded to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service.
 * @param $filter - The server property filter to apply.
 * @param dimensionType - The server specific dimension.
 * @param dimensionSignature - The value of the dimension.
 */
export const serviceMembersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServiceMembersListInput,
  outputSchema: ServiceMembersListOutput,
}));
// Input Schema
export const ServiceMembersListAlertsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceMemberId: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    from: Schema.optional(Schema.String),
    to: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers/{serviceMemberId}/alerts",
    }),
  );
export type ServiceMembersListAlertsInput =
  typeof ServiceMembersListAlertsInput.Type;

// Output Schema
export const ServiceMembersListAlertsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          alertId: Schema.optional(Schema.String),
          level: Schema.optional(
            Schema.Literals(["Warning", "Error", "PreWarning"]),
          ),
          state: Schema.optional(
            Schema.Literals([
              "Active",
              "ResolvedByPositiveResult",
              "ResolvedManually",
              "ResolvedByTimer",
              "ResolvedByStateChange",
            ]),
          ),
          shortName: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          remediation: Schema.optional(Schema.String),
          relatedLinks: Schema.optional(
            Schema.Array(
              Schema.Struct({
                title: Schema.optional(Schema.String),
                url: Schema.optional(Schema.String),
              }),
            ),
          ),
          scope: Schema.optional(Schema.String),
          additionalInformation: Schema.optional(
            Schema.Array(
              Schema.Struct({
                titleName: Schema.optional(Schema.String),
                titleValue: Schema.optional(Schema.String),
                properties: Schema.optional(Schema.Unknown),
                hasProperties: Schema.optional(Schema.Boolean),
              }),
            ),
          ),
          createdDate: Schema.optional(Schema.String),
          resolvedDate: Schema.optional(Schema.String),
          lastUpdated: Schema.optional(Schema.String),
          monitorRoleType: Schema.optional(Schema.String),
          activeAlertProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          resolvedAlertProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          tenantId: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          serviceMemberId: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type ServiceMembersListAlertsOutput =
  typeof ServiceMembersListAlertsOutput.Type;

// The operation
/**
 * Gets the details of an alert for a given service and server combination.
 *
 * @param serviceMemberId - The server Id for which the alert details needs to be queried.
 * @param serviceName - The name of the service.
 * @param $filter - The alert property filter to apply.
 * @param state - The alert state to query for.
 * @param from - The start date to query for.
 * @param to - The end date till when to query for.
 */
export const serviceMembersListAlerts = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServiceMembersListAlertsInput,
    outputSchema: ServiceMembersListAlertsOutput,
  }),
);
// Input Schema
export const ServiceMembersListConnectorsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/service/{serviceName}/servicemembers/{serviceMemberId}/connectors",
    }),
  );
export type ServiceMembersListConnectorsInput =
  typeof ServiceMembersListConnectorsInput.Type;

// Output Schema
export const ServiceMembersListConnectorsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          connectorId: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          version: Schema.optional(Schema.Number),
          type: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          schemaXml: Schema.optional(Schema.String),
          passwordManagementSettings: Schema.optional(Schema.Unknown),
          passwordHashSyncConfiguration: Schema.optional(Schema.Unknown),
          timeCreated: Schema.optional(Schema.String),
          timeLastModified: Schema.optional(Schema.String),
          partitions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                dn: Schema.optional(Schema.String),
                enabled: Schema.optional(Schema.Boolean),
                timeCreated: Schema.optional(Schema.String),
                timeLastModified: Schema.optional(Schema.String),
                partitionScope: Schema.optional(
                  Schema.Struct({
                    isDefault: Schema.optional(Schema.Boolean),
                    objectClasses: Schema.optional(Schema.Array(Schema.String)),
                    containersIncluded: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    containersExcluded: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                  }),
                ),
                name: Schema.optional(Schema.String),
                isDomain: Schema.optional(Schema.Boolean),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
          runProfiles: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                runSteps: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      batchSize: Schema.optional(Schema.Number),
                      objectProcessLimit: Schema.optional(Schema.Number),
                      objectDeleteLimit: Schema.optional(Schema.Number),
                      pageSize: Schema.optional(Schema.Number),
                      partitionId: Schema.optional(Schema.String),
                      operationType: Schema.optional(Schema.Number),
                      timeout: Schema.optional(Schema.Number),
                    }),
                  ),
                ),
              }),
            ),
          ),
          classesIncluded: Schema.optional(Schema.Array(Schema.String)),
          attributesIncluded: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type ServiceMembersListConnectorsOutput =
  typeof ServiceMembersListConnectorsOutput.Type;

// The operation
/**
 * Gets the connector details for a service.
 *
 * @param serviceName - The name of the service.
 * @param serviceMemberId - The server Id.
 */
export const serviceMembersListConnectors =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceMembersListConnectorsInput,
    outputSchema: ServiceMembersListConnectorsOutput,
  }));
// Input Schema
export const ServiceMembersListCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers/{serviceMemberId}/credentials",
    }),
  );
export type ServiceMembersListCredentialsInput =
  typeof ServiceMembersListCredentialsInput.Type;

// Output Schema
export const ServiceMembersListCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          identifier: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          credentialData: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type ServiceMembersListCredentialsOutput =
  typeof ServiceMembersListCredentialsOutput.Type;

// The operation
/**
 * Gets the credentials of the server which is needed by the agent to connect to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service.
 * @param $filter - The property filter to apply.
 * @param serviceMemberId - The server Id.
 */
export const serviceMembersListCredentials =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceMembersListCredentialsInput,
    outputSchema: ServiceMembersListCredentialsOutput,
  }));
// Input Schema
export const ServiceMembersListDataFreshnessInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers/{serviceMemberId}/datafreshness",
    }),
  );
export type ServiceMembersListDataFreshnessInput =
  typeof ServiceMembersListDataFreshnessInput.Type;

// Output Schema
export const ServiceMembersListDataFreshnessOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ServiceMembersListDataFreshnessOutput =
  typeof ServiceMembersListDataFreshnessOutput.Type;

// The operation
/**
 * Gets the last time when the server uploaded data to Azure Active Directory Connect Health Service.
 *
 * @param serviceName - The name of the service.
 * @param serviceMemberId - The server Id.
 */
export const serviceMembersListDataFreshness =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceMembersListDataFreshnessInput,
    outputSchema: ServiceMembersListDataFreshnessOutput,
  }));
// Input Schema
export const ServiceMembersListExportStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers/{serviceMemberId}/exportstatus",
    }),
  );
export type ServiceMembersListExportStatusInput =
  typeof ServiceMembersListExportStatusInput.Type;

// Output Schema
export const ServiceMembersListExportStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          serviceId: Schema.optional(Schema.String),
          serviceMemberId: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          runStepResultId: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type ServiceMembersListExportStatusOutput =
  typeof ServiceMembersListExportStatusOutput.Type;

// The operation
/**
 * Gets the export status.
 *
 * @param serviceName - The name of the service.
 * @param serviceMemberId - The server Id.
 */
export const serviceMembersListExportStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceMembersListExportStatusInput,
    outputSchema: ServiceMembersListExportStatusOutput,
  }));
// Input Schema
export const ServiceMembersListGlobalConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    serviceMemberId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/servicemembers/{serviceMemberId}/globalconfiguration",
    }),
  );
export type ServiceMembersListGlobalConfigurationInput =
  typeof ServiceMembersListGlobalConfigurationInput.Type;

// Output Schema
export const ServiceMembersListGlobalConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          version: Schema.optional(Schema.Number),
          schemaXml: Schema.optional(Schema.String),
          passwordSyncEnabled: Schema.optional(Schema.Boolean),
          numSavedPwdEvent: Schema.optional(Schema.Number),
          featureSet: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type ServiceMembersListGlobalConfigurationOutput =
  typeof ServiceMembersListGlobalConfigurationOutput.Type;

// The operation
/**
 * Gets the global configuration.
 *
 * @param serviceName - The name of the service.
 * @param serviceMemberId - The server id.
 */
export const serviceMembersListGlobalConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServiceMembersListGlobalConfigurationInput,
    outputSchema: ServiceMembersListGlobalConfigurationOutput,
  }));
// Input Schema
export const ServicesAddInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.ADHybridHealthService/services",
  }),
);
export type ServicesAddInput = typeof ServicesAddInput.Type;

// Output Schema
export const ServicesAddOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  activeAlerts: Schema.optional(Schema.Number),
  additionalInformation: Schema.optional(Schema.String),
  createdDate: Schema.optional(Schema.String),
  customNotificationEmails: Schema.optional(Schema.Array(Schema.String)),
  disabled: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  health: Schema.optional(Schema.String),
  lastDisabled: Schema.optional(Schema.String),
  lastUpdated: Schema.optional(Schema.String),
  monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
  monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
  notificationEmailEnabled: Schema.optional(Schema.Boolean),
  notificationEmailEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
  notificationEmailsEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
  notificationEmails: Schema.optional(Schema.Array(Schema.String)),
  originalDisabledState: Schema.optional(Schema.Boolean),
  resolvedAlerts: Schema.optional(Schema.Number),
  serviceId: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  simpleProperties: Schema.optional(Schema.Unknown),
  tenantId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ServicesAddOutput = typeof ServicesAddOutput.Type;

// The operation
/**
 * Onboards a service for a given tenant in Azure Active Directory Connect Health.
 */
export const servicesAdd = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesAddInput,
  outputSchema: ServicesAddOutput,
}));
// Input Schema
export const ServicesAddAlertFeedbackInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/feedbacktype/alerts/feedback",
    }),
  );
export type ServicesAddAlertFeedbackInput =
  typeof ServicesAddAlertFeedbackInput.Type;

// Output Schema
export const ServicesAddAlertFeedbackOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    level: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    shortName: Schema.optional(Schema.String),
    feedback: Schema.optional(Schema.String),
    comment: Schema.optional(Schema.String),
    consentedToShare: Schema.optional(Schema.Boolean),
    serviceMemberId: Schema.optional(Schema.String),
    createdDate: Schema.optional(Schema.String),
  });
export type ServicesAddAlertFeedbackOutput =
  typeof ServicesAddAlertFeedbackOutput.Type;

// The operation
/**
 * Adds an alert feedback submitted by customer.
 *
 * @param serviceName - The name of the service.
 */
export const servicesAddAlertFeedback = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesAddAlertFeedbackInput,
    outputSchema: ServicesAddAlertFeedbackOutput,
  }),
);
// Input Schema
export const ServicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serviceName: Schema.String.pipe(T.PathParam()),
  confirm: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}",
  }),
);
export type ServicesDeleteInput = typeof ServicesDeleteInput.Type;

// Output Schema
export const ServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesDeleteOutput = typeof ServicesDeleteOutput.Type;

// The operation
/**
 * Deletes a service which is onboarded to Azure Active Directory Connect Health.
 *
 * @param serviceName - The name of the service which needs to be deleted.
 * @param confirm - Indicates if the service will be permanently deleted or disabled. True indicates that the service will be permanently deleted and False indicates that the service will be marked disabled and then deleted after 30 days, if it is not re-registered.
 */
export const servicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesDeleteInput,
  outputSchema: ServicesDeleteOutput,
}));
// Input Schema
export const ServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serviceName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}",
  }),
);
export type ServicesGetInput = typeof ServicesGetInput.Type;

// Output Schema
export const ServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  activeAlerts: Schema.optional(Schema.Number),
  additionalInformation: Schema.optional(Schema.String),
  createdDate: Schema.optional(Schema.String),
  customNotificationEmails: Schema.optional(Schema.Array(Schema.String)),
  disabled: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  health: Schema.optional(Schema.String),
  lastDisabled: Schema.optional(Schema.String),
  lastUpdated: Schema.optional(Schema.String),
  monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
  monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
  notificationEmailEnabled: Schema.optional(Schema.Boolean),
  notificationEmailEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
  notificationEmailsEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
  notificationEmails: Schema.optional(Schema.Array(Schema.String)),
  originalDisabledState: Schema.optional(Schema.Boolean),
  resolvedAlerts: Schema.optional(Schema.Number),
  serviceId: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  simpleProperties: Schema.optional(Schema.Unknown),
  tenantId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ServicesGetOutput = typeof ServicesGetOutput.Type;

// The operation
/**
 * Gets the details of a service for a tenant having Azure AD Premium license and is onboarded to Azure Active Directory Connect Health.
 *
 * @param serviceName - The name of the service.
 */
export const servicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesGetInput,
  outputSchema: ServicesGetOutput,
}));
// Input Schema
export const ServicesGetFeatureAvailibilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    featureName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/checkServiceFeatureAvailibility/{featureName}",
    }),
  );
export type ServicesGetFeatureAvailibilityInput =
  typeof ServicesGetFeatureAvailibilityInput.Type;

// Output Schema
export const ServicesGetFeatureAvailibilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Boolean),
  });
export type ServicesGetFeatureAvailibilityOutput =
  typeof ServicesGetFeatureAvailibilityOutput.Type;

// The operation
/**
 * Checks if the service has all the pre-requisites met to use a feature.
 *
 * @param serviceName - The name of the service.
 * @param featureName - The name of the feature.
 */
export const servicesGetFeatureAvailibility =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesGetFeatureAvailibilityInput,
    outputSchema: ServicesGetFeatureAvailibilityOutput,
  }));
// Input Schema
export const ServicesGetMetricMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/metricmetadata/{metricName}",
    }),
  );
export type ServicesGetMetricMetadataInput =
  typeof ServicesGetMetricMetadataInput.Type;

// Output Schema
export const ServicesGetMetricMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    metricsProcessorClassName: Schema.optional(Schema.String),
    metricName: Schema.optional(Schema.String),
    groupings: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          invisibleForUi: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
    displayName: Schema.optional(Schema.String),
    valueKind: Schema.optional(Schema.String),
    minValue: Schema.optional(Schema.Number),
    maxValue: Schema.optional(Schema.Number),
    kind: Schema.optional(Schema.String),
    isDefault: Schema.optional(Schema.Boolean),
    isPerfCounter: Schema.optional(Schema.Boolean),
    isDevOps: Schema.optional(Schema.Boolean),
  });
export type ServicesGetMetricMetadataOutput =
  typeof ServicesGetMetricMetadataOutput.Type;

// The operation
/**
 * Gets the service related metrics information.
 *
 * @param serviceName - The name of the service.
 * @param metricName - The metric name
 */
export const servicesGetMetricMetadata = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesGetMetricMetadataInput,
    outputSchema: ServicesGetMetricMetadataOutput,
  }),
);
// Input Schema
export const ServicesGetMetricMetadataForGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    groupKey: Schema.optional(Schema.String),
    fromDate: Schema.optional(Schema.String),
    toDate: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/metricmetadata/{metricName}/groups/{groupName}",
    }),
  );
export type ServicesGetMetricMetadataForGroupInput =
  typeof ServicesGetMetricMetadataForGroupInput.Type;

// Output Schema
export const ServicesGetMetricMetadataForGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sets: Schema.optional(
      Schema.Array(
        Schema.Struct({
          setName: Schema.optional(Schema.String),
          values: Schema.optional(Schema.Array(Schema.Number)),
        }),
      ),
    ),
    timeStamps: Schema.optional(Schema.Array(Schema.String)),
  });
export type ServicesGetMetricMetadataForGroupOutput =
  typeof ServicesGetMetricMetadataForGroupOutput.Type;

// The operation
/**
 * Gets the service related metrics for a given metric and group combination.
 *
 * @param serviceName - The name of the service.
 * @param metricName - The metric name
 * @param groupName - The group name
 * @param groupKey - The group key
 * @param fromDate - The start date.
 * @param toDate - The end date.
 */
export const servicesGetMetricMetadataForGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesGetMetricMetadataForGroupInput,
    outputSchema: ServicesGetMetricMetadataForGroupOutput,
  }));
// Input Schema
export const ServicesGetTenantWhitelistingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    featureName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/TenantWhitelisting/{featureName}",
    }),
  );
export type ServicesGetTenantWhitelistingInput =
  typeof ServicesGetTenantWhitelistingInput.Type;

// Output Schema
export const ServicesGetTenantWhitelistingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Boolean),
  });
export type ServicesGetTenantWhitelistingOutput =
  typeof ServicesGetTenantWhitelistingOutput.Type;

// The operation
/**
 * Checks if the tenant, to which a service is registered, is listed as allowed to use a feature.
 *
 * @param serviceName - The name of the service.
 * @param featureName - The name of the feature.
 */
export const servicesGetTenantWhitelisting =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesGetTenantWhitelistingInput,
    outputSchema: ServicesGetTenantWhitelistingOutput,
  }));
// Input Schema
export const ServicesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  $filter: Schema.optional(Schema.String),
  serviceType: Schema.optional(Schema.String),
  skipCount: Schema.optional(Schema.Number),
  takeCount: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ADHybridHealthService/services",
  }),
);
export type ServicesListInput = typeof ServicesListInput.Type;

// Output Schema
export const ServicesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        activeAlerts: Schema.optional(Schema.Number),
        additionalInformation: Schema.optional(Schema.String),
        createdDate: Schema.optional(Schema.String),
        customNotificationEmails: Schema.optional(Schema.Array(Schema.String)),
        disabled: Schema.optional(Schema.Boolean),
        displayName: Schema.optional(Schema.String),
        health: Schema.optional(Schema.String),
        lastDisabled: Schema.optional(Schema.String),
        lastUpdated: Schema.optional(Schema.String),
        monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
        monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
        notificationEmailEnabled: Schema.optional(Schema.Boolean),
        notificationEmailEnabledForGlobalAdmins: Schema.optional(
          Schema.Boolean,
        ),
        notificationEmailsEnabledForGlobalAdmins: Schema.optional(
          Schema.Boolean,
        ),
        notificationEmails: Schema.optional(Schema.Array(Schema.String)),
        originalDisabledState: Schema.optional(Schema.Boolean),
        resolvedAlerts: Schema.optional(Schema.Number),
        serviceId: Schema.optional(Schema.String),
        serviceName: Schema.optional(Schema.String),
        signature: Schema.optional(Schema.String),
        simpleProperties: Schema.optional(Schema.Unknown),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
  ),
  totalCount: Schema.optional(Schema.Number),
  continuationToken: Schema.optional(Schema.String),
});
export type ServicesListOutput = typeof ServicesListOutput.Type;

// The operation
/**
 * Gets the details of services, for a tenant, that are onboarded to Azure Active Directory Connect Health.
 *
 * @param $filter - The service property filter to apply.
 * @param serviceType - The service type for the services onboarded to Azure Active Directory Connect Health. Depending on whether the service is monitoring, ADFS, Sync or ADDS roles, the service type can either be AdFederationService or AadSyncService or AdDomainService.
 * @param skipCount - The skip count, which specifies the number of elements that can be bypassed from a sequence and then return the remaining elements.
 * @param takeCount - The take count , which specifies the number of elements that can be returned from a sequence.
 */
export const servicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesListInput,
  outputSchema: ServicesListOutput,
}));
// Input Schema
export const ServicesListAlertFeedbackInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    shortName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/feedbacktype/alerts/{shortName}/alertfeedback",
    }),
  );
export type ServicesListAlertFeedbackInput =
  typeof ServicesListAlertFeedbackInput.Type;

// Output Schema
export const ServicesListAlertFeedbackOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          level: Schema.optional(Schema.String),
          state: Schema.optional(Schema.String),
          shortName: Schema.optional(Schema.String),
          feedback: Schema.optional(Schema.String),
          comment: Schema.optional(Schema.String),
          consentedToShare: Schema.optional(Schema.Boolean),
          serviceMemberId: Schema.optional(Schema.String),
          createdDate: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ServicesListAlertFeedbackOutput =
  typeof ServicesListAlertFeedbackOutput.Type;

// The operation
/**
 * Gets a list of all alert feedback for a given tenant and alert type.
 *
 * @param serviceName - The name of the service.
 * @param shortName - The name of the alert.
 */
export const servicesListAlertFeedback = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListAlertFeedbackInput,
    outputSchema: ServicesListAlertFeedbackOutput,
  }),
);
// Input Schema
export const ServicesListAlertsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    from: Schema.optional(Schema.String),
    to: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/alerts",
    }),
  );
export type ServicesListAlertsInput = typeof ServicesListAlertsInput.Type;

// Output Schema
export const ServicesListAlertsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          alertId: Schema.optional(Schema.String),
          level: Schema.optional(
            Schema.Literals(["Warning", "Error", "PreWarning"]),
          ),
          state: Schema.optional(
            Schema.Literals([
              "Active",
              "ResolvedByPositiveResult",
              "ResolvedManually",
              "ResolvedByTimer",
              "ResolvedByStateChange",
            ]),
          ),
          shortName: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          remediation: Schema.optional(Schema.String),
          relatedLinks: Schema.optional(
            Schema.Array(
              Schema.Struct({
                title: Schema.optional(Schema.String),
                url: Schema.optional(Schema.String),
              }),
            ),
          ),
          scope: Schema.optional(Schema.String),
          additionalInformation: Schema.optional(
            Schema.Array(
              Schema.Struct({
                titleName: Schema.optional(Schema.String),
                titleValue: Schema.optional(Schema.String),
                properties: Schema.optional(Schema.Unknown),
                hasProperties: Schema.optional(Schema.Boolean),
              }),
            ),
          ),
          createdDate: Schema.optional(Schema.String),
          resolvedDate: Schema.optional(Schema.String),
          lastUpdated: Schema.optional(Schema.String),
          monitorRoleType: Schema.optional(Schema.String),
          activeAlertProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          resolvedAlertProperties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          tenantId: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          serviceMemberId: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type ServicesListAlertsOutput = typeof ServicesListAlertsOutput.Type;

// The operation
/**
 * Gets the alerts for a given service.
 *
 * @param serviceName - The name of the service.
 * @param $filter - The alert property filter to apply.
 * @param state - The alert state to query for.
 * @param from - The start date to query for.
 * @param to - The end date till when to query for.
 */
export const servicesListAlerts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesListAlertsInput,
  outputSchema: ServicesListAlertsOutput,
}));
// Input Schema
export const ServicesListAllRiskyIpDownloadReportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/reports/riskyIp/blobUris",
    }),
  );
export type ServicesListAllRiskyIpDownloadReportInput =
  typeof ServicesListAllRiskyIpDownloadReportInput.Type;

// Output Schema
export const ServicesListAllRiskyIpDownloadReportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tenantId: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          resultSasUri: Schema.optional(Schema.String),
          blobCreateDateTime: Schema.optional(Schema.String),
          jobCompletionTime: Schema.optional(Schema.String),
          status: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ServicesListAllRiskyIpDownloadReportOutput =
  typeof ServicesListAllRiskyIpDownloadReportOutput.Type;

// The operation
/**
 * Gets all Risky IP report URIs for the last 7 days.
 *
 * @param serviceName - The name of the service.
 */
export const servicesListAllRiskyIpDownloadReport =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesListAllRiskyIpDownloadReportInput,
    outputSchema: ServicesListAllRiskyIpDownloadReportOutput,
  }));
// Input Schema
export const ServicesListCurrentRiskyIpDownloadReportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/reports/riskyIp/generateBlobUri",
    }),
  );
export type ServicesListCurrentRiskyIpDownloadReportInput =
  typeof ServicesListCurrentRiskyIpDownloadReportInput.Type;

// Output Schema
export const ServicesListCurrentRiskyIpDownloadReportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tenantId: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          resultSasUri: Schema.optional(Schema.String),
          blobCreateDateTime: Schema.optional(Schema.String),
          jobCompletionTime: Schema.optional(Schema.String),
          status: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ServicesListCurrentRiskyIpDownloadReportOutput =
  typeof ServicesListCurrentRiskyIpDownloadReportOutput.Type;

// The operation
/**
 * Initiate the generation of a new Risky IP report. Returns the URI for the new one.
 *
 * @param serviceName - The name of the service.
 */
export const servicesListCurrentRiskyIpDownloadReport =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesListCurrentRiskyIpDownloadReportInput,
    outputSchema: ServicesListCurrentRiskyIpDownloadReportOutput,
  }));
// Input Schema
export const ServicesListExportErrorsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/exporterrors/counts",
    }),
  );
export type ServicesListExportErrorsInput =
  typeof ServicesListExportErrorsInput.Type;

// Output Schema
export const ServicesListExportErrorsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          errorBucket: Schema.optional(Schema.String),
          count: Schema.optional(Schema.Number),
          truncated: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
  });
export type ServicesListExportErrorsOutput =
  typeof ServicesListExportErrorsOutput.Type;

// The operation
/**
 * Gets the count of latest AAD export errors.
 *
 * @param serviceName - The name of the service.
 */
export const servicesListExportErrors = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListExportErrorsInput,
    outputSchema: ServicesListExportErrorsOutput,
  }),
);
// Input Schema
export const ServicesListExportErrorsV2Input =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    errorBucket: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/exporterrors/listV2",
    }),
  );
export type ServicesListExportErrorsV2Input =
  typeof ServicesListExportErrorsV2Input.Type;

// Output Schema
export const ServicesListExportErrorsV2Output =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          incomingObjectDisplayName: Schema.optional(Schema.String),
          incomingObjectType: Schema.optional(Schema.String),
          userPrincipalName: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          attributeName: Schema.optional(Schema.String),
          attributeValue: Schema.optional(Schema.String),
          timeOccurred: Schema.optional(Schema.String),
          timeFirstOccurred: Schema.optional(Schema.String),
          csObjectId: Schema.optional(Schema.String),
          dn: Schema.optional(Schema.String),
          incomingObject: Schema.optional(
            Schema.Struct({
              displayName: Schema.optional(Schema.String),
              distinguishedName: Schema.optional(Schema.String),
              lastDirSyncTime: Schema.optional(Schema.String),
              mail: Schema.optional(Schema.String),
              objectGuid: Schema.optional(Schema.String),
              objectType: Schema.optional(Schema.String),
              onpremisesUserPrincipalName: Schema.optional(Schema.String),
              proxyAddresses: Schema.optional(Schema.String),
              sourceAnchor: Schema.optional(Schema.String),
              sourceOfAuthority: Schema.optional(Schema.String),
              timeOccurred: Schema.optional(Schema.String),
              userPrincipalName: Schema.optional(Schema.String),
            }),
          ),
          existingObject: Schema.optional(
            Schema.Struct({
              displayName: Schema.optional(Schema.String),
              distinguishedName: Schema.optional(Schema.String),
              lastDirSyncTime: Schema.optional(Schema.String),
              mail: Schema.optional(Schema.String),
              objectGuid: Schema.optional(Schema.String),
              objectType: Schema.optional(Schema.String),
              onpremisesUserPrincipalName: Schema.optional(Schema.String),
              proxyAddresses: Schema.optional(Schema.String),
              sourceAnchor: Schema.optional(Schema.String),
              sourceOfAuthority: Schema.optional(Schema.String),
              timeOccurred: Schema.optional(Schema.String),
              userPrincipalName: Schema.optional(Schema.String),
            }),
          ),
          modifiedOrRemovedAttributeValue: Schema.optional(Schema.String),
          runStepResultId: Schema.optional(Schema.String),
          samAccountName: Schema.optional(Schema.String),
          serverErrorDetail: Schema.optional(Schema.String),
          serviceId: Schema.optional(Schema.String),
          serviceMemberId: Schema.optional(Schema.String),
          mergedEntityId: Schema.optional(Schema.String),
          createdDate: Schema.optional(Schema.String),
          exportErrorStatus: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type ServicesListExportErrorsV2Output =
  typeof ServicesListExportErrorsV2Output.Type;

// The operation
/**
 * Gets the categorized export errors.
 *
 * @param serviceName - The name of the service.
 * @param errorBucket - The error category to query for.
 */
export const servicesListExportErrorsV2 = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListExportErrorsV2Input,
    outputSchema: ServicesListExportErrorsV2Output,
  }),
);
// Input Schema
export const ServicesListExportStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/exportstatus",
    }),
  );
export type ServicesListExportStatusInput =
  typeof ServicesListExportStatusInput.Type;

// Output Schema
export const ServicesListExportStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          serviceId: Schema.optional(Schema.String),
          serviceMemberId: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          runStepResultId: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type ServicesListExportStatusOutput =
  typeof ServicesListExportStatusOutput.Type;

// The operation
/**
 * Gets the export status.
 *
 * @param serviceName - The name of the service.
 */
export const servicesListExportStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListExportStatusInput,
    outputSchema: ServicesListExportStatusOutput,
  }),
);
// Input Schema
export const ServicesListMetricMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    perfCounter: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/metricmetadata",
    }),
  );
export type ServicesListMetricMetadataInput =
  typeof ServicesListMetricMetadataInput.Type;

// Output Schema
export const ServicesListMetricMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          metricsProcessorClassName: Schema.optional(Schema.String),
          metricName: Schema.optional(Schema.String),
          groupings: Schema.optional(
            Schema.Array(
              Schema.Struct({
                key: Schema.optional(Schema.String),
                displayName: Schema.optional(Schema.String),
                invisibleForUi: Schema.optional(Schema.Boolean),
              }),
            ),
          ),
          displayName: Schema.optional(Schema.String),
          valueKind: Schema.optional(Schema.String),
          minValue: Schema.optional(Schema.Number),
          maxValue: Schema.optional(Schema.Number),
          kind: Schema.optional(Schema.String),
          isDefault: Schema.optional(Schema.Boolean),
          isPerfCounter: Schema.optional(Schema.Boolean),
          isDevOps: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type ServicesListMetricMetadataOutput =
  typeof ServicesListMetricMetadataOutput.Type;

// The operation
/**
 * Gets the service related metrics information.
 *
 * @param $filter - The metric metadata property filter to apply.
 * @param serviceName - The name of the service.
 * @param perfCounter - Indicates if only performance counter metrics are requested.
 */
export const servicesListMetricMetadata = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListMetricMetadataInput,
    outputSchema: ServicesListMetricMetadataOutput,
  }),
);
// Input Schema
export const ServicesListMetricsAverageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/metrics/{metricName}/groups/{groupName}/average",
    }),
  );
export type ServicesListMetricsAverageInput =
  typeof ServicesListMetricsAverageInput.Type;

// Output Schema
export const ServicesListMetricsAverageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type ServicesListMetricsAverageOutput =
  typeof ServicesListMetricsAverageOutput.Type;

// The operation
/**
 * Gets the average of the metric values for a given metric and group combination.
 *
 * @param serviceName - The name of the service.
 * @param metricName - The metric name
 * @param groupName - The group name
 */
export const servicesListMetricsAverage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListMetricsAverageInput,
    outputSchema: ServicesListMetricsAverageOutput,
  }),
);
// Input Schema
export const ServicesListMetricsSumInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    metricName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/metrics/{metricName}/groups/{groupName}/sum",
    }),
  );
export type ServicesListMetricsSumInput =
  typeof ServicesListMetricsSumInput.Type;

// Output Schema
export const ServicesListMetricsSumOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type ServicesListMetricsSumOutput =
  typeof ServicesListMetricsSumOutput.Type;

// The operation
/**
 * Gets the sum of the metric values for a given metric and group combination.
 *
 * @param serviceName - The name of the service.
 * @param metricName - The metric name
 * @param groupName - The group name
 */
export const servicesListMetricsSum = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListMetricsSumInput,
    outputSchema: ServicesListMetricsSumOutput,
  }),
);
// Input Schema
export const ServicesListMonitoringConfigurationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/monitoringconfigurations",
    }),
  );
export type ServicesListMonitoringConfigurationsInput =
  typeof ServicesListMonitoringConfigurationsInput.Type;

// Output Schema
export const ServicesListMonitoringConfigurationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          key: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ServicesListMonitoringConfigurationsOutput =
  typeof ServicesListMonitoringConfigurationsOutput.Type;

// The operation
/**
 * Gets the service level monitoring configurations.
 *
 * @param serviceName - The name of the service.
 */
export const servicesListMonitoringConfigurations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesListMonitoringConfigurationsInput,
    outputSchema: ServicesListMonitoringConfigurationsOutput,
  }));
// Input Schema
export const ServicesListPremiumInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    serviceType: Schema.optional(Schema.String),
    skipCount: Schema.optional(Schema.Number),
    takeCount: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/premiumCheck",
    }),
  );
export type ServicesListPremiumInput = typeof ServicesListPremiumInput.Type;

// Output Schema
export const ServicesListPremiumOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          activeAlerts: Schema.optional(Schema.Number),
          additionalInformation: Schema.optional(Schema.String),
          createdDate: Schema.optional(Schema.String),
          customNotificationEmails: Schema.optional(
            Schema.Array(Schema.String),
          ),
          disabled: Schema.optional(Schema.Boolean),
          displayName: Schema.optional(Schema.String),
          health: Schema.optional(Schema.String),
          lastDisabled: Schema.optional(Schema.String),
          lastUpdated: Schema.optional(Schema.String),
          monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
          monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
          notificationEmailEnabled: Schema.optional(Schema.Boolean),
          notificationEmailEnabledForGlobalAdmins: Schema.optional(
            Schema.Boolean,
          ),
          notificationEmailsEnabledForGlobalAdmins: Schema.optional(
            Schema.Boolean,
          ),
          notificationEmails: Schema.optional(Schema.Array(Schema.String)),
          originalDisabledState: Schema.optional(Schema.Boolean),
          resolvedAlerts: Schema.optional(Schema.Number),
          serviceId: Schema.optional(Schema.String),
          serviceName: Schema.optional(Schema.String),
          signature: Schema.optional(Schema.String),
          simpleProperties: Schema.optional(Schema.Unknown),
          tenantId: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    totalCount: Schema.optional(Schema.Number),
    continuationToken: Schema.optional(Schema.String),
  });
export type ServicesListPremiumOutput = typeof ServicesListPremiumOutput.Type;

// The operation
/**
 * Gets the details of services for a tenant having Azure AD Premium license and is onboarded to Azure Active Directory Connect Health.
 *
 * @param $filter - The service property filter to apply.
 * @param serviceType - The service type for the services onboarded to Azure Active Directory Connect Health. Depending on whether the service is monitoring, ADFS, Sync or ADDS roles, the service type can either be AdFederationService or AadSyncService or AdDomainService.
 * @param skipCount - The skip count, which specifies the number of elements that can be bypassed from a sequence and then return the remaining elements.
 * @param takeCount - The take count , which specifies the number of elements that can be returned from a sequence.
 */
export const servicesListPremium = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesListPremiumInput,
  outputSchema: ServicesListPremiumOutput,
}));
// Input Schema
export const ServicesListUserBadPasswordReportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    dataSource: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/reports/badpassword/details/user",
    }),
  );
export type ServicesListUserBadPasswordReportInput =
  typeof ServicesListUserBadPasswordReportInput.Type;

// Output Schema
export const ServicesListUserBadPasswordReportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          userId: Schema.optional(Schema.String),
          ipAddress: Schema.optional(Schema.String),
          lastUpdated: Schema.optional(Schema.String),
          uniqueIpAddresses: Schema.optional(Schema.String),
          totalErrorAttempts: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type ServicesListUserBadPasswordReportOutput =
  typeof ServicesListUserBadPasswordReportOutput.Type;

// The operation
/**
 * Gets the bad password login attempt report for an user
 *
 * @param serviceName - The name of the service.
 * @param dataSource - The source of data, if its test data or customer data.
 */
export const servicesListUserBadPasswordReport =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesListUserBadPasswordReportInput,
    outputSchema: ServicesListUserBadPasswordReportOutput,
  }));
// Input Schema
export const ServicesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serviceName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}",
  }),
);
export type ServicesUpdateInput = typeof ServicesUpdateInput.Type;

// Output Schema
export const ServicesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  activeAlerts: Schema.optional(Schema.Number),
  additionalInformation: Schema.optional(Schema.String),
  createdDate: Schema.optional(Schema.String),
  customNotificationEmails: Schema.optional(Schema.Array(Schema.String)),
  disabled: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  health: Schema.optional(Schema.String),
  lastDisabled: Schema.optional(Schema.String),
  lastUpdated: Schema.optional(Schema.String),
  monitoringConfigurationsComputed: Schema.optional(Schema.Unknown),
  monitoringConfigurationsCustomized: Schema.optional(Schema.Unknown),
  notificationEmailEnabled: Schema.optional(Schema.Boolean),
  notificationEmailEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
  notificationEmailsEnabledForGlobalAdmins: Schema.optional(Schema.Boolean),
  notificationEmails: Schema.optional(Schema.Array(Schema.String)),
  originalDisabledState: Schema.optional(Schema.Boolean),
  resolvedAlerts: Schema.optional(Schema.Number),
  serviceId: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  simpleProperties: Schema.optional(Schema.Unknown),
  tenantId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ServicesUpdateOutput = typeof ServicesUpdateOutput.Type;

// The operation
/**
 * Updates the service properties of an onboarded service.
 *
 * @param serviceName - The name of the service which needs to be deleted.
 */
export const servicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesUpdateInput,
  outputSchema: ServicesUpdateOutput,
}));
// Input Schema
export const ServicesUpdateMonitoringConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/monitoringconfiguration",
    }),
  );
export type ServicesUpdateMonitoringConfigurationInput =
  typeof ServicesUpdateMonitoringConfigurationInput.Type;

// Output Schema
export const ServicesUpdateMonitoringConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesUpdateMonitoringConfigurationOutput =
  typeof ServicesUpdateMonitoringConfigurationOutput.Type;

// The operation
/**
 * Updates the service level monitoring configuration.
 *
 * @param serviceName - The name of the service.
 */
export const servicesUpdateMonitoringConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServicesUpdateMonitoringConfigurationInput,
    outputSchema: ServicesUpdateMonitoringConfigurationOutput,
  }));
// Input Schema
export const UpdateIPAddressAggregateSettingsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/ipAddressAggregateSettings",
    }),
  );
export type UpdateIPAddressAggregateSettingsInput =
  typeof UpdateIPAddressAggregateSettingsInput.Type;

// Output Schema
export const UpdateIPAddressAggregateSettingsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    badPasswordAndExtranetLockoutCombinedDailyThreshold: Schema.optional(
      Schema.Number,
    ),
    badPasswordAndExtranetLockoutCombinedHourlyThreshold: Schema.optional(
      Schema.Number,
    ),
    extranetLockoutDailyThreshold: Schema.optional(Schema.Number),
    extranetLockoutHourlyThreshold: Schema.optional(Schema.Number),
    emailNotificationEnabled: Schema.optional(Schema.Boolean),
  });
export type UpdateIPAddressAggregateSettingsOutput =
  typeof UpdateIPAddressAggregateSettingsOutput.Type;

// The operation
/**
 * Updates the IP address aggregate settings alert thresholds.
 *
 * @param serviceName - The name of the service.
 */
export const updateIPAddressAggregateSettings =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpdateIPAddressAggregateSettingsInput,
    outputSchema: UpdateIPAddressAggregateSettingsOutput,
  }));
