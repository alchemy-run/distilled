/**
 * Names for the Jira operations whose `operationId` is a Java resource
 * method (`AddonPropertiesResource.getAddonProperty_get`), keyed by that
 * `operationId`. The default naming turns those ids into
 * `getAddonPropertiesResourceGetAddonProperty`; each name here is the
 * method part, or the spec `summary` where the method alone is vague.
 * These are the Atlassian Connect (`/rest/atlassian-connect/1/...`) routes.
 *
 * Every other operation keeps its own `operationId` (`getIssue`,
 * `searchProjects`, ...).
 */
export const operationNames: Record<string, string> = {
  "AddonPropertiesResource.getAddonProperties_get": "getAddonProperties",
  "AddonPropertiesResource.deleteAddonProperty_delete": "deleteAddonProperty",
  "AddonPropertiesResource.getAddonProperty_get": "getAddonProperty",
  "AddonPropertiesResource.putAddonProperty_put": "putAddonProperty",
  "DynamicModulesResource.removeModules_delete": "removeModules",
  "DynamicModulesResource.getModules_get": "getModules",
  "DynamicModulesResource.registerModules_post": "registerModules",
  "AppIssueFieldValueUpdateResource.updateIssueFields_put": "updateIssueFields",
  "MigrationResource.updateEntityPropertiesValue_put": "updateEntityPropertiesValue",
  // "Get workflow transition rule configurations"
  "MigrationResource.workflowRuleSearch_post": "searchWorkflowRules",
  // "Get Connect issue field migration task"
  "ConnectToForgeMigrationFetchTaskResource.fetchMigrationTask_get": "getConnectMigrationTask",
  // "Submit Connect issue field migration task"
  "ConnectToForgeMigrationTaskSubmissionResource.submitTask_post": "submitConnectMigrationTask",
  // "Retrieve the attributes of service registries"
  "ServiceRegistryResource.services_get": "getServiceRegistries",
};
