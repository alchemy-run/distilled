#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn Convex's OpenAPI specs into Smithy JSON models.
 *
 * Input:  specs/spec-mirror-convex/specs/{management,deployment,public-deployment}-openapi.json
 * Output: .generated-specs/{management,deployment,functions}.json
 *
 * Each document becomes one service, because each API has its own base URL and
 * auth scheme (see src/protocol.ts). Patches live in `patches/<model>/` and
 * apply to the Smithy models here, in `finalizeConvert`.
 *
 * Convex documents almost no errors, so failures are dispatched at runtime by
 * the protocol from the status plus the `code` matchers in `patches/`.
 *
 * Management operation ids contain spaces (`create project`), so names come
 * from `operationNames`, looked up by `"METHOD path"`.
 */
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

await runOpenApiConvert({
  root: `${import.meta.dirname}/..`,
  specs: [
    {
      name: "management",
      specPath: "specs/spec-mirror-convex/specs/management-openapi.json",
      options: {
        namespace: "com.convex.api",
        serviceName: "Convex",
        operationNames: {
          "GET /deployments/{deployment_name}": "getDeployment",
          "GET /projects/{project_id}": "getProject",
          "GET /teams/{team_id_or_slug}/projects/{project_slug}": "getProjectBySlug",
          "GET /projects/{project_id}/deployment": "getProjectDeployment",
          "GET /teams/{team_id_or_slug}/projects/{project_slug}/deployment":
            "getProjectDeploymentBySlug",
          "GET /projects/{project_id}/list_deployments": "listDeployments",
          "GET /teams/{team_id}/list_deployments": "listTeamDeployments",
          "GET /teams/{team_id}/list_local_deployments": "listLocalDeployments",
          "GET /teams/{team_id}/projects": "listProjects",
          "GET /teams/{team_id}/list_project_tags": "listProjectTags",
          "GET /teams/{team_id}/list_pending_invites": "listPendingTeamInvites",
          "GET /teams/{team_id}/list_members": "listTeamMembers",
          "POST /deployments/{deployment_name}/mint_ai_gateway_jwt": "mintAiGatewayJwt",
        },
      },
    },
    {
      name: "deployment",
      specPath: "specs/spec-mirror-convex/specs/deployment-openapi.json",
      options: {
        namespace: "com.convex.deployment",
        serviceName: "ConvexDeployment",
        operationNames: {
          "GET /deployment_info": "getDeploymentInfo",
          "POST /data/sync": "startDataSync",
          "GET /data/sync/{sync_id}": "getActiveSync",
        },
      },
    },
    {
      name: "functions",
      specPath: "specs/spec-mirror-convex/specs/public-deployment-openapi.json",
      // POST /function is an admin route the spec doesn't mark as one: it
      // answers 403 BadDeployKey with no token. This service sends none, so
      // the operation could never succeed, and `run` covers the same call.
      preprocess: (spec) => {
        delete spec.paths["/function"];
      },
      options: {
        namespace: "com.convex.functions",
        serviceName: "ConvexFunctions",
        operationNames: {
          "GET /query": "queryGet",
          "POST /query": "query",
          "POST /query_ts": "getQueryTimestamp",
          "POST /query_at_ts": "queryAtTimestamp",
          "POST /query_batch": "queryBatch",
          "POST /mutation": "mutation",
          "POST /action": "action",
          "POST /run/{*functionIdentifier}": "runFunctionByPath",
        },
      },
    },
  ],
  options: {
    namespace: "com.convex.api",
    serviceName: "Convex",
    statusToErrorClass: {},
    defaultErrorStatuses: ["401", "429", "500", "502", "503", "504"],
    skipDeprecated: true,
  },
});
