/**
 * Cloudflare PAGES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service pages
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";
import { UploadableSchema } from "../schemas.ts";

// =============================================================================
// BuildCacheProject
// =============================================================================

export interface PurgeBuildCacheProjectRequest {
  projectName: string;
  /** Identifier. */
  accountId: string;
}

export const PurgeBuildCacheProjectRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/pages/projects/{projectName}/purge_build_cache",
  }),
) as unknown as Schema.Schema<PurgeBuildCacheProjectRequest>;

export type PurgeBuildCacheProjectResponse = unknown;

export const PurgeBuildCacheProjectResponse =
  Schema.Unknown as unknown as Schema.Schema<PurgeBuildCacheProjectResponse>;

export const purgeBuildCacheProject: (
  input: PurgeBuildCacheProjectRequest,
) => Effect.Effect<
  PurgeBuildCacheProjectResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PurgeBuildCacheProjectRequest,
  output: PurgeBuildCacheProjectResponse,
  errors: [],
}));

// =============================================================================
// Project
// =============================================================================

export interface GetProjectRequest {
  projectName: string;
  /** Identifier. */
  accountId: string;
}

export const GetProjectRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pages/projects/{projectName}",
  }),
) as unknown as Schema.Schema<GetProjectRequest>;

export interface GetProjectResponse {
  /** ID of the project. */
  id: string;
  /** Most recent production deployment of the project. */
  canonicalDeployment: {
    id: string;
    aliases: string[] | null;
    buildConfig: {
      webAnalyticsTag: string | null;
      webAnalyticsToken: string | null;
      buildCaching?: boolean | null;
      buildCommand?: string | null;
      destinationDir?: string | null;
      rootDir?: string | null;
    };
    createdOn: string;
    deploymentTrigger: {
      metadata: {
        branch: string;
        commitDirty: boolean;
        commitHash: string;
        commitMessage: string;
      };
      type: "github:push" | "ad_hoc" | "deploy_hook";
    };
    envVars: Record<string, unknown> | null;
    environment: "preview" | "production";
    isSkipped: boolean;
    latestStage: unknown;
    modifiedOn: string;
    projectId: string;
    projectName: string;
    shortId: string;
    source: {
      config: {
        deploymentsEnabled?: boolean;
        owner?: string;
        ownerId?: string;
        pathExcludes?: string[];
        pathIncludes?: string[];
        prCommentsEnabled?: boolean;
        previewBranchExcludes?: string[];
        previewBranchIncludes?: string[];
        previewDeploymentSetting?: "all" | "none" | "custom";
        productionBranch?: string;
        productionDeploymentsEnabled?: boolean;
        repoId?: string;
        repoName?: string;
      };
      type: "github" | "gitlab";
    };
    stages: unknown[];
    url: string;
    usesFunctions?: boolean | null;
  } | null;
  /** When the project was created. */
  createdOn: string;
  /** Configs for deployments in a project. */
  deploymentConfigs: {
    preview: {
      aiBindings?: Record<string, unknown>;
      alwaysUseLatestCompatibilityDate?: boolean;
      analyticsEngineDatasets?: Record<string, unknown>;
      browsers?: Record<string, unknown>;
      buildImageMajorVersion?: number;
      compatibilityDate?: string;
      compatibilityFlags?: string[];
      d1Databases?: Record<string, unknown>;
      durableObjectNamespaces?: Record<string, unknown>;
      envVars?: Record<string, unknown>;
      failOpen?: boolean;
      hyperdriveBindings?: Record<string, unknown>;
      kvNamespaces?: Record<string, unknown>;
      limits?: { cpuMs: number };
      mtlsCertificates?: Record<string, unknown>;
      placement?: { mode: string };
      queueProducers?: Record<string, unknown>;
      r2Buckets?: Record<string, unknown>;
      services?: Record<string, unknown>;
      usageModel?: "standard" | "bundled" | "unbound";
      vectorizeBindings?: Record<string, unknown>;
      wranglerConfigHash?: string;
    };
    production: {
      aiBindings?: Record<string, unknown>;
      alwaysUseLatestCompatibilityDate?: boolean;
      analyticsEngineDatasets?: Record<string, unknown>;
      browsers?: Record<string, unknown>;
      buildImageMajorVersion?: number;
      compatibilityDate?: string;
      compatibilityFlags?: string[];
      d1Databases?: Record<string, unknown>;
      durableObjectNamespaces?: Record<string, unknown>;
      envVars?: Record<string, unknown>;
      failOpen?: boolean;
      hyperdriveBindings?: Record<string, unknown>;
      kvNamespaces?: Record<string, unknown>;
      limits?: { cpuMs: number };
      mtlsCertificates?: Record<string, unknown>;
      placement?: { mode: string };
      queueProducers?: Record<string, unknown>;
      r2Buckets?: Record<string, unknown>;
      services?: Record<string, unknown>;
      usageModel?: "standard" | "bundled" | "unbound";
      vectorizeBindings?: Record<string, unknown>;
      wranglerConfigHash?: string;
    };
  };
  /** Framework the project is using. */
  framework: string;
  /** Version of the framework the project is using. */
  frameworkVersion: string;
  /** Most recent deployment of the project. */
  latestDeployment: {
    id: string;
    aliases: string[] | null;
    buildConfig: {
      webAnalyticsTag: string | null;
      webAnalyticsToken: string | null;
      buildCaching?: boolean | null;
      buildCommand?: string | null;
      destinationDir?: string | null;
      rootDir?: string | null;
    };
    createdOn: string;
    deploymentTrigger: {
      metadata: {
        branch: string;
        commitDirty: boolean;
        commitHash: string;
        commitMessage: string;
      };
      type: "github:push" | "ad_hoc" | "deploy_hook";
    };
    envVars: Record<string, unknown> | null;
    environment: "preview" | "production";
    isSkipped: boolean;
    latestStage: unknown;
    modifiedOn: string;
    projectId: string;
    projectName: string;
    shortId: string;
    source: {
      config: {
        deploymentsEnabled?: boolean;
        owner?: string;
        ownerId?: string;
        pathExcludes?: string[];
        pathIncludes?: string[];
        prCommentsEnabled?: boolean;
        previewBranchExcludes?: string[];
        previewBranchIncludes?: string[];
        previewDeploymentSetting?: "all" | "none" | "custom";
        productionBranch?: string;
        productionDeploymentsEnabled?: boolean;
        repoId?: string;
        repoName?: string;
      };
      type: "github" | "gitlab";
    };
    stages: unknown[];
    url: string;
    usesFunctions?: boolean | null;
  } | null;
  /** Name of the project. */
  name: string;
  /** Name of the preview script. */
  previewScriptName: string;
  /** Production branch of the project. Used to identify production deployments. */
  productionBranch: string;
  /** Name of the production script. */
  productionScriptName: string;
  /** Whether the project uses functions. */
  usesFunctions: boolean | null;
  /** Configs for the project build process. */
  buildConfig?: {
    webAnalyticsTag: string | null;
    webAnalyticsToken: string | null;
    buildCaching?: boolean | null;
    buildCommand?: string | null;
    destinationDir?: string | null;
    rootDir?: string | null;
  };
  /** A list of associated custom domains for the project. */
  domains?: string[];
  /** Configs for the project source control. */
  source?: {
    config: {
      deploymentsEnabled?: boolean;
      owner?: string;
      ownerId?: string;
      pathExcludes?: string[];
      pathIncludes?: string[];
      prCommentsEnabled?: boolean;
      previewBranchExcludes?: string[];
      previewBranchIncludes?: string[];
      previewDeploymentSetting?: "all" | "none" | "custom";
      productionBranch?: string;
      productionDeploymentsEnabled?: boolean;
      repoId?: string;
      repoName?: string;
    };
    type: "github" | "gitlab";
  };
  /** The Cloudflare subdomain associated with the project. */
  subdomain?: string;
}

export const GetProjectResponse = Schema.Struct({
  id: Schema.String,
  canonicalDeployment: Schema.Union([
    Schema.Struct({
      id: Schema.String,
      aliases: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      buildConfig: Schema.Struct({
        webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
        webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
        buildCaching: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        buildCommand: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        destinationDir: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          webAnalyticsTag: "web_analytics_tag",
          webAnalyticsToken: "web_analytics_token",
          buildCaching: "build_caching",
          buildCommand: "build_command",
          destinationDir: "destination_dir",
          rootDir: "root_dir",
        }),
      ),
      createdOn: Schema.String,
      deploymentTrigger: Schema.Struct({
        metadata: Schema.Struct({
          branch: Schema.String,
          commitDirty: Schema.Boolean,
          commitHash: Schema.String,
          commitMessage: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            commitDirty: "commit_dirty",
            commitHash: "commit_hash",
            commitMessage: "commit_message",
          }),
        ),
        type: Schema.Literals(["github:push", "ad_hoc", "deploy_hook"]),
      }),
      envVars: Schema.Union([Schema.Struct({}), Schema.Null]),
      environment: Schema.Literals(["preview", "production"]),
      isSkipped: Schema.Boolean,
      latestStage: Schema.Unknown,
      modifiedOn: Schema.String,
      projectId: Schema.String,
      projectName: Schema.String,
      shortId: Schema.String,
      source: Schema.Struct({
        config: Schema.Struct({
          deploymentsEnabled: Schema.optional(Schema.Boolean),
          owner: Schema.optional(Schema.String),
          ownerId: Schema.optional(Schema.String),
          pathExcludes: Schema.optional(Schema.Array(Schema.String)),
          pathIncludes: Schema.optional(Schema.Array(Schema.String)),
          prCommentsEnabled: Schema.optional(Schema.Boolean),
          previewBranchExcludes: Schema.optional(Schema.Array(Schema.String)),
          previewBranchIncludes: Schema.optional(Schema.Array(Schema.String)),
          previewDeploymentSetting: Schema.optional(
            Schema.Literals(["all", "none", "custom"]),
          ),
          productionBranch: Schema.optional(Schema.String),
          productionDeploymentsEnabled: Schema.optional(Schema.Boolean),
          repoId: Schema.optional(Schema.String),
          repoName: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            deploymentsEnabled: "deployments_enabled",
            ownerId: "owner_id",
            pathExcludes: "path_excludes",
            pathIncludes: "path_includes",
            prCommentsEnabled: "pr_comments_enabled",
            previewBranchExcludes: "preview_branch_excludes",
            previewBranchIncludes: "preview_branch_includes",
            previewDeploymentSetting: "preview_deployment_setting",
            productionBranch: "production_branch",
            productionDeploymentsEnabled: "production_deployments_enabled",
            repoId: "repo_id",
            repoName: "repo_name",
          }),
        ),
        type: Schema.Literals(["github", "gitlab"]),
      }),
      stages: Schema.Array(Schema.Unknown),
      url: Schema.String,
      usesFunctions: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        buildConfig: "build_config",
        createdOn: "created_on",
        deploymentTrigger: "deployment_trigger",
        envVars: "env_vars",
        isSkipped: "is_skipped",
        latestStage: "latest_stage",
        modifiedOn: "modified_on",
        projectId: "project_id",
        projectName: "project_name",
        shortId: "short_id",
        usesFunctions: "uses_functions",
      }),
    ),
    Schema.Null,
  ]),
  createdOn: Schema.String,
  deploymentConfigs: Schema.Struct({
    preview: Schema.Struct({
      aiBindings: Schema.optional(Schema.Struct({})),
      alwaysUseLatestCompatibilityDate: Schema.optional(Schema.Boolean),
      analyticsEngineDatasets: Schema.optional(Schema.Struct({})),
      browsers: Schema.optional(Schema.Struct({})),
      buildImageMajorVersion: Schema.optional(Schema.Number),
      compatibilityDate: Schema.optional(Schema.String),
      compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
      d1Databases: Schema.optional(Schema.Struct({})),
      durableObjectNamespaces: Schema.optional(Schema.Struct({})),
      envVars: Schema.optional(Schema.Struct({})),
      failOpen: Schema.optional(Schema.Boolean),
      hyperdriveBindings: Schema.optional(Schema.Struct({})),
      kvNamespaces: Schema.optional(Schema.Struct({})),
      limits: Schema.optional(
        Schema.Struct({
          cpuMs: Schema.Number,
        }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
      ),
      mtlsCertificates: Schema.optional(Schema.Struct({})),
      placement: Schema.optional(
        Schema.Struct({
          mode: Schema.String,
        }),
      ),
      queueProducers: Schema.optional(Schema.Struct({})),
      r2Buckets: Schema.optional(Schema.Struct({})),
      services: Schema.optional(Schema.Struct({})),
      usageModel: Schema.optional(
        Schema.Literals(["standard", "bundled", "unbound"]),
      ),
      vectorizeBindings: Schema.optional(Schema.Struct({})),
      wranglerConfigHash: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        aiBindings: "ai_bindings",
        alwaysUseLatestCompatibilityDate:
          "always_use_latest_compatibility_date",
        analyticsEngineDatasets: "analytics_engine_datasets",
        buildImageMajorVersion: "build_image_major_version",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        d1Databases: "d1_databases",
        durableObjectNamespaces: "durable_object_namespaces",
        envVars: "env_vars",
        failOpen: "fail_open",
        hyperdriveBindings: "hyperdrive_bindings",
        kvNamespaces: "kv_namespaces",
        mtlsCertificates: "mtls_certificates",
        queueProducers: "queue_producers",
        r2Buckets: "r2_buckets",
        usageModel: "usage_model",
        vectorizeBindings: "vectorize_bindings",
        wranglerConfigHash: "wrangler_config_hash",
      }),
    ),
    production: Schema.Struct({
      aiBindings: Schema.optional(Schema.Struct({})),
      alwaysUseLatestCompatibilityDate: Schema.optional(Schema.Boolean),
      analyticsEngineDatasets: Schema.optional(Schema.Struct({})),
      browsers: Schema.optional(Schema.Struct({})),
      buildImageMajorVersion: Schema.optional(Schema.Number),
      compatibilityDate: Schema.optional(Schema.String),
      compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
      d1Databases: Schema.optional(Schema.Struct({})),
      durableObjectNamespaces: Schema.optional(Schema.Struct({})),
      envVars: Schema.optional(Schema.Struct({})),
      failOpen: Schema.optional(Schema.Boolean),
      hyperdriveBindings: Schema.optional(Schema.Struct({})),
      kvNamespaces: Schema.optional(Schema.Struct({})),
      limits: Schema.optional(
        Schema.Struct({
          cpuMs: Schema.Number,
        }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
      ),
      mtlsCertificates: Schema.optional(Schema.Struct({})),
      placement: Schema.optional(
        Schema.Struct({
          mode: Schema.String,
        }),
      ),
      queueProducers: Schema.optional(Schema.Struct({})),
      r2Buckets: Schema.optional(Schema.Struct({})),
      services: Schema.optional(Schema.Struct({})),
      usageModel: Schema.optional(
        Schema.Literals(["standard", "bundled", "unbound"]),
      ),
      vectorizeBindings: Schema.optional(Schema.Struct({})),
      wranglerConfigHash: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        aiBindings: "ai_bindings",
        alwaysUseLatestCompatibilityDate:
          "always_use_latest_compatibility_date",
        analyticsEngineDatasets: "analytics_engine_datasets",
        buildImageMajorVersion: "build_image_major_version",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        d1Databases: "d1_databases",
        durableObjectNamespaces: "durable_object_namespaces",
        envVars: "env_vars",
        failOpen: "fail_open",
        hyperdriveBindings: "hyperdrive_bindings",
        kvNamespaces: "kv_namespaces",
        mtlsCertificates: "mtls_certificates",
        queueProducers: "queue_producers",
        r2Buckets: "r2_buckets",
        usageModel: "usage_model",
        vectorizeBindings: "vectorize_bindings",
        wranglerConfigHash: "wrangler_config_hash",
      }),
    ),
  }),
  framework: Schema.String,
  frameworkVersion: Schema.String,
  latestDeployment: Schema.Union([
    Schema.Struct({
      id: Schema.String,
      aliases: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      buildConfig: Schema.Struct({
        webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
        webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
        buildCaching: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        buildCommand: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        destinationDir: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          webAnalyticsTag: "web_analytics_tag",
          webAnalyticsToken: "web_analytics_token",
          buildCaching: "build_caching",
          buildCommand: "build_command",
          destinationDir: "destination_dir",
          rootDir: "root_dir",
        }),
      ),
      createdOn: Schema.String,
      deploymentTrigger: Schema.Struct({
        metadata: Schema.Struct({
          branch: Schema.String,
          commitDirty: Schema.Boolean,
          commitHash: Schema.String,
          commitMessage: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            commitDirty: "commit_dirty",
            commitHash: "commit_hash",
            commitMessage: "commit_message",
          }),
        ),
        type: Schema.Literals(["github:push", "ad_hoc", "deploy_hook"]),
      }),
      envVars: Schema.Union([Schema.Struct({}), Schema.Null]),
      environment: Schema.Literals(["preview", "production"]),
      isSkipped: Schema.Boolean,
      latestStage: Schema.Unknown,
      modifiedOn: Schema.String,
      projectId: Schema.String,
      projectName: Schema.String,
      shortId: Schema.String,
      source: Schema.Struct({
        config: Schema.Struct({
          deploymentsEnabled: Schema.optional(Schema.Boolean),
          owner: Schema.optional(Schema.String),
          ownerId: Schema.optional(Schema.String),
          pathExcludes: Schema.optional(Schema.Array(Schema.String)),
          pathIncludes: Schema.optional(Schema.Array(Schema.String)),
          prCommentsEnabled: Schema.optional(Schema.Boolean),
          previewBranchExcludes: Schema.optional(Schema.Array(Schema.String)),
          previewBranchIncludes: Schema.optional(Schema.Array(Schema.String)),
          previewDeploymentSetting: Schema.optional(
            Schema.Literals(["all", "none", "custom"]),
          ),
          productionBranch: Schema.optional(Schema.String),
          productionDeploymentsEnabled: Schema.optional(Schema.Boolean),
          repoId: Schema.optional(Schema.String),
          repoName: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            deploymentsEnabled: "deployments_enabled",
            ownerId: "owner_id",
            pathExcludes: "path_excludes",
            pathIncludes: "path_includes",
            prCommentsEnabled: "pr_comments_enabled",
            previewBranchExcludes: "preview_branch_excludes",
            previewBranchIncludes: "preview_branch_includes",
            previewDeploymentSetting: "preview_deployment_setting",
            productionBranch: "production_branch",
            productionDeploymentsEnabled: "production_deployments_enabled",
            repoId: "repo_id",
            repoName: "repo_name",
          }),
        ),
        type: Schema.Literals(["github", "gitlab"]),
      }),
      stages: Schema.Array(Schema.Unknown),
      url: Schema.String,
      usesFunctions: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        buildConfig: "build_config",
        createdOn: "created_on",
        deploymentTrigger: "deployment_trigger",
        envVars: "env_vars",
        isSkipped: "is_skipped",
        latestStage: "latest_stage",
        modifiedOn: "modified_on",
        projectId: "project_id",
        projectName: "project_name",
        shortId: "short_id",
        usesFunctions: "uses_functions",
      }),
    ),
    Schema.Null,
  ]),
  name: Schema.String,
  previewScriptName: Schema.String,
  productionBranch: Schema.String,
  productionScriptName: Schema.String,
  usesFunctions: Schema.Union([Schema.Boolean, Schema.Null]),
  buildConfig: Schema.optional(
    Schema.Struct({
      webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
      webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
      buildCaching: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      buildCommand: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      destinationDir: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        webAnalyticsTag: "web_analytics_tag",
        webAnalyticsToken: "web_analytics_token",
        buildCaching: "build_caching",
        buildCommand: "build_command",
        destinationDir: "destination_dir",
        rootDir: "root_dir",
      }),
    ),
  ),
  domains: Schema.optional(Schema.Array(Schema.String)),
  source: Schema.optional(
    Schema.Struct({
      config: Schema.Struct({
        deploymentsEnabled: Schema.optional(Schema.Boolean),
        owner: Schema.optional(Schema.String),
        ownerId: Schema.optional(Schema.String),
        pathExcludes: Schema.optional(Schema.Array(Schema.String)),
        pathIncludes: Schema.optional(Schema.Array(Schema.String)),
        prCommentsEnabled: Schema.optional(Schema.Boolean),
        previewBranchExcludes: Schema.optional(Schema.Array(Schema.String)),
        previewBranchIncludes: Schema.optional(Schema.Array(Schema.String)),
        previewDeploymentSetting: Schema.optional(
          Schema.Literals(["all", "none", "custom"]),
        ),
        productionBranch: Schema.optional(Schema.String),
        productionDeploymentsEnabled: Schema.optional(Schema.Boolean),
        repoId: Schema.optional(Schema.String),
        repoName: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          deploymentsEnabled: "deployments_enabled",
          ownerId: "owner_id",
          pathExcludes: "path_excludes",
          pathIncludes: "path_includes",
          prCommentsEnabled: "pr_comments_enabled",
          previewBranchExcludes: "preview_branch_excludes",
          previewBranchIncludes: "preview_branch_includes",
          previewDeploymentSetting: "preview_deployment_setting",
          productionBranch: "production_branch",
          productionDeploymentsEnabled: "production_deployments_enabled",
          repoId: "repo_id",
          repoName: "repo_name",
        }),
      ),
      type: Schema.Literals(["github", "gitlab"]),
    }),
  ),
  subdomain: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    canonicalDeployment: "canonical_deployment",
    createdOn: "created_on",
    deploymentConfigs: "deployment_configs",
    frameworkVersion: "framework_version",
    latestDeployment: "latest_deployment",
    previewScriptName: "preview_script_name",
    productionBranch: "production_branch",
    productionScriptName: "production_script_name",
    usesFunctions: "uses_functions",
    buildConfig: "build_config",
  }),
) as unknown as Schema.Schema<GetProjectResponse>;

export const getProject: (
  input: GetProjectRequest,
) => Effect.Effect<
  GetProjectResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectRequest,
  output: GetProjectResponse,
  errors: [],
}));

export interface CreateProjectRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Name of the project. */
  name: string;
  /** Body param: Production branch of the project. Used to identify production deployments. */
  productionBranch: string;
  /** Body param: Configs for the project build process. */
  buildConfig?: {
    buildCaching?: boolean;
    buildCommand?: string;
    destinationDir?: string;
    rootDir?: string;
    webAnalyticsTag?: string | null;
    webAnalyticsToken?: string | null;
  };
  /** Body param: Configs for deployments in a project. */
  deploymentConfigs?: {
    preview?: {
      aiBindings?: Record<string, unknown>;
      alwaysUseLatestCompatibilityDate?: boolean;
      analyticsEngineDatasets?: Record<string, unknown>;
      browsers?: Record<string, unknown>;
      buildImageMajorVersion?: number;
      compatibilityDate?: string;
      compatibilityFlags?: string[];
      d1Databases?: Record<string, unknown>;
      durableObjectNamespaces?: Record<string, unknown>;
      envVars?: Record<string, unknown>;
      failOpen?: boolean;
      hyperdriveBindings?: Record<string, unknown>;
      kvNamespaces?: Record<string, unknown>;
      limits?: { cpuMs: number };
      mtlsCertificates?: Record<string, unknown>;
      placement?: { mode: string };
      queueProducers?: Record<string, unknown>;
      r2Buckets?: Record<string, unknown>;
      services?: Record<string, unknown>;
      usageModel?: "standard" | "bundled" | "unbound";
      vectorizeBindings?: Record<string, unknown>;
      wranglerConfigHash?: string;
    };
    production?: {
      aiBindings?: Record<string, unknown>;
      alwaysUseLatestCompatibilityDate?: boolean;
      analyticsEngineDatasets?: Record<string, unknown>;
      browsers?: Record<string, unknown>;
      buildImageMajorVersion?: number;
      compatibilityDate?: string;
      compatibilityFlags?: string[];
      d1Databases?: Record<string, unknown>;
      durableObjectNamespaces?: Record<string, unknown>;
      envVars?: Record<string, unknown>;
      failOpen?: boolean;
      hyperdriveBindings?: Record<string, unknown>;
      kvNamespaces?: Record<string, unknown>;
      limits?: { cpuMs: number };
      mtlsCertificates?: Record<string, unknown>;
      placement?: { mode: string };
      queueProducers?: Record<string, unknown>;
      r2Buckets?: Record<string, unknown>;
      services?: Record<string, unknown>;
      usageModel?: "standard" | "bundled" | "unbound";
      vectorizeBindings?: Record<string, unknown>;
      wranglerConfigHash?: string;
    };
  };
  /** Body param: Configs for the project source control. */
  source?: {
    config: {
      deploymentsEnabled?: boolean;
      owner?: string;
      ownerId?: string;
      pathExcludes?: string[];
      pathIncludes?: string[];
      prCommentsEnabled?: boolean;
      previewBranchExcludes?: string[];
      previewBranchIncludes?: string[];
      previewDeploymentSetting?: "all" | "none" | "custom";
      productionBranch?: string;
      productionDeploymentsEnabled?: boolean;
      repoId?: string;
      repoName?: string;
    };
    type: "github" | "gitlab";
  };
}

export const CreateProjectRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  productionBranch: Schema.String,
  buildConfig: Schema.optional(
    Schema.Struct({
      buildCaching: Schema.optional(Schema.Boolean),
      buildCommand: Schema.optional(Schema.String),
      destinationDir: Schema.optional(Schema.String),
      rootDir: Schema.optional(Schema.String),
      webAnalyticsTag: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      webAnalyticsToken: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        buildCaching: "build_caching",
        buildCommand: "build_command",
        destinationDir: "destination_dir",
        rootDir: "root_dir",
        webAnalyticsTag: "web_analytics_tag",
        webAnalyticsToken: "web_analytics_token",
      }),
    ),
  ),
  deploymentConfigs: Schema.optional(
    Schema.Struct({
      preview: Schema.optional(
        Schema.Struct({
          aiBindings: Schema.optional(Schema.Struct({})),
          alwaysUseLatestCompatibilityDate: Schema.optional(Schema.Boolean),
          analyticsEngineDatasets: Schema.optional(Schema.Struct({})),
          browsers: Schema.optional(Schema.Struct({})),
          buildImageMajorVersion: Schema.optional(Schema.Number),
          compatibilityDate: Schema.optional(Schema.String),
          compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
          d1Databases: Schema.optional(Schema.Struct({})),
          durableObjectNamespaces: Schema.optional(Schema.Struct({})),
          envVars: Schema.optional(Schema.Struct({})),
          failOpen: Schema.optional(Schema.Boolean),
          hyperdriveBindings: Schema.optional(Schema.Struct({})),
          kvNamespaces: Schema.optional(Schema.Struct({})),
          limits: Schema.optional(
            Schema.Struct({
              cpuMs: Schema.Number,
            }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
          ),
          mtlsCertificates: Schema.optional(Schema.Struct({})),
          placement: Schema.optional(
            Schema.Struct({
              mode: Schema.String,
            }),
          ),
          queueProducers: Schema.optional(Schema.Struct({})),
          r2Buckets: Schema.optional(Schema.Struct({})),
          services: Schema.optional(Schema.Struct({})),
          usageModel: Schema.optional(
            Schema.Literals(["standard", "bundled", "unbound"]),
          ),
          vectorizeBindings: Schema.optional(Schema.Struct({})),
          wranglerConfigHash: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            aiBindings: "ai_bindings",
            alwaysUseLatestCompatibilityDate:
              "always_use_latest_compatibility_date",
            analyticsEngineDatasets: "analytics_engine_datasets",
            buildImageMajorVersion: "build_image_major_version",
            compatibilityDate: "compatibility_date",
            compatibilityFlags: "compatibility_flags",
            d1Databases: "d1_databases",
            durableObjectNamespaces: "durable_object_namespaces",
            envVars: "env_vars",
            failOpen: "fail_open",
            hyperdriveBindings: "hyperdrive_bindings",
            kvNamespaces: "kv_namespaces",
            mtlsCertificates: "mtls_certificates",
            queueProducers: "queue_producers",
            r2Buckets: "r2_buckets",
            usageModel: "usage_model",
            vectorizeBindings: "vectorize_bindings",
            wranglerConfigHash: "wrangler_config_hash",
          }),
        ),
      ),
      production: Schema.optional(
        Schema.Struct({
          aiBindings: Schema.optional(Schema.Struct({})),
          alwaysUseLatestCompatibilityDate: Schema.optional(Schema.Boolean),
          analyticsEngineDatasets: Schema.optional(Schema.Struct({})),
          browsers: Schema.optional(Schema.Struct({})),
          buildImageMajorVersion: Schema.optional(Schema.Number),
          compatibilityDate: Schema.optional(Schema.String),
          compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
          d1Databases: Schema.optional(Schema.Struct({})),
          durableObjectNamespaces: Schema.optional(Schema.Struct({})),
          envVars: Schema.optional(Schema.Struct({})),
          failOpen: Schema.optional(Schema.Boolean),
          hyperdriveBindings: Schema.optional(Schema.Struct({})),
          kvNamespaces: Schema.optional(Schema.Struct({})),
          limits: Schema.optional(
            Schema.Struct({
              cpuMs: Schema.Number,
            }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
          ),
          mtlsCertificates: Schema.optional(Schema.Struct({})),
          placement: Schema.optional(
            Schema.Struct({
              mode: Schema.String,
            }),
          ),
          queueProducers: Schema.optional(Schema.Struct({})),
          r2Buckets: Schema.optional(Schema.Struct({})),
          services: Schema.optional(Schema.Struct({})),
          usageModel: Schema.optional(
            Schema.Literals(["standard", "bundled", "unbound"]),
          ),
          vectorizeBindings: Schema.optional(Schema.Struct({})),
          wranglerConfigHash: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            aiBindings: "ai_bindings",
            alwaysUseLatestCompatibilityDate:
              "always_use_latest_compatibility_date",
            analyticsEngineDatasets: "analytics_engine_datasets",
            buildImageMajorVersion: "build_image_major_version",
            compatibilityDate: "compatibility_date",
            compatibilityFlags: "compatibility_flags",
            d1Databases: "d1_databases",
            durableObjectNamespaces: "durable_object_namespaces",
            envVars: "env_vars",
            failOpen: "fail_open",
            hyperdriveBindings: "hyperdrive_bindings",
            kvNamespaces: "kv_namespaces",
            mtlsCertificates: "mtls_certificates",
            queueProducers: "queue_producers",
            r2Buckets: "r2_buckets",
            usageModel: "usage_model",
            vectorizeBindings: "vectorize_bindings",
            wranglerConfigHash: "wrangler_config_hash",
          }),
        ),
      ),
    }),
  ),
  source: Schema.optional(
    Schema.Struct({
      config: Schema.Struct({
        deploymentsEnabled: Schema.optional(Schema.Boolean),
        owner: Schema.optional(Schema.String),
        ownerId: Schema.optional(Schema.String),
        pathExcludes: Schema.optional(Schema.Array(Schema.String)),
        pathIncludes: Schema.optional(Schema.Array(Schema.String)),
        prCommentsEnabled: Schema.optional(Schema.Boolean),
        previewBranchExcludes: Schema.optional(Schema.Array(Schema.String)),
        previewBranchIncludes: Schema.optional(Schema.Array(Schema.String)),
        previewDeploymentSetting: Schema.optional(
          Schema.Literals(["all", "none", "custom"]),
        ),
        productionBranch: Schema.optional(Schema.String),
        productionDeploymentsEnabled: Schema.optional(Schema.Boolean),
        repoId: Schema.optional(Schema.String),
        repoName: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          deploymentsEnabled: "deployments_enabled",
          ownerId: "owner_id",
          pathExcludes: "path_excludes",
          pathIncludes: "path_includes",
          prCommentsEnabled: "pr_comments_enabled",
          previewBranchExcludes: "preview_branch_excludes",
          previewBranchIncludes: "preview_branch_includes",
          previewDeploymentSetting: "preview_deployment_setting",
          productionBranch: "production_branch",
          productionDeploymentsEnabled: "production_deployments_enabled",
          repoId: "repo_id",
          repoName: "repo_name",
        }),
      ),
      type: Schema.Literals(["github", "gitlab"]),
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    productionBranch: "production_branch",
    buildConfig: "build_config",
    deploymentConfigs: "deployment_configs",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/pages/projects" }),
) as unknown as Schema.Schema<CreateProjectRequest>;

export interface CreateProjectResponse {
  /** ID of the project. */
  id: string;
  /** Most recent production deployment of the project. */
  canonicalDeployment: {
    id: string;
    aliases: string[] | null;
    buildConfig: {
      webAnalyticsTag: string | null;
      webAnalyticsToken: string | null;
      buildCaching?: boolean | null;
      buildCommand?: string | null;
      destinationDir?: string | null;
      rootDir?: string | null;
    };
    createdOn: string;
    deploymentTrigger: {
      metadata: {
        branch: string;
        commitDirty: boolean;
        commitHash: string;
        commitMessage: string;
      };
      type: "github:push" | "ad_hoc" | "deploy_hook";
    };
    envVars: Record<string, unknown> | null;
    environment: "preview" | "production";
    isSkipped: boolean;
    latestStage: unknown;
    modifiedOn: string;
    projectId: string;
    projectName: string;
    shortId: string;
    source: {
      config: {
        deploymentsEnabled?: boolean;
        owner?: string;
        ownerId?: string;
        pathExcludes?: string[];
        pathIncludes?: string[];
        prCommentsEnabled?: boolean;
        previewBranchExcludes?: string[];
        previewBranchIncludes?: string[];
        previewDeploymentSetting?: "all" | "none" | "custom";
        productionBranch?: string;
        productionDeploymentsEnabled?: boolean;
        repoId?: string;
        repoName?: string;
      };
      type: "github" | "gitlab";
    };
    stages: unknown[];
    url: string;
    usesFunctions?: boolean | null;
  } | null;
  /** When the project was created. */
  createdOn: string;
  /** Configs for deployments in a project. */
  deploymentConfigs: {
    preview: {
      aiBindings?: Record<string, unknown>;
      alwaysUseLatestCompatibilityDate?: boolean;
      analyticsEngineDatasets?: Record<string, unknown>;
      browsers?: Record<string, unknown>;
      buildImageMajorVersion?: number;
      compatibilityDate?: string;
      compatibilityFlags?: string[];
      d1Databases?: Record<string, unknown>;
      durableObjectNamespaces?: Record<string, unknown>;
      envVars?: Record<string, unknown>;
      failOpen?: boolean;
      hyperdriveBindings?: Record<string, unknown>;
      kvNamespaces?: Record<string, unknown>;
      limits?: { cpuMs: number };
      mtlsCertificates?: Record<string, unknown>;
      placement?: { mode: string };
      queueProducers?: Record<string, unknown>;
      r2Buckets?: Record<string, unknown>;
      services?: Record<string, unknown>;
      usageModel?: "standard" | "bundled" | "unbound";
      vectorizeBindings?: Record<string, unknown>;
      wranglerConfigHash?: string;
    };
    production: {
      aiBindings?: Record<string, unknown>;
      alwaysUseLatestCompatibilityDate?: boolean;
      analyticsEngineDatasets?: Record<string, unknown>;
      browsers?: Record<string, unknown>;
      buildImageMajorVersion?: number;
      compatibilityDate?: string;
      compatibilityFlags?: string[];
      d1Databases?: Record<string, unknown>;
      durableObjectNamespaces?: Record<string, unknown>;
      envVars?: Record<string, unknown>;
      failOpen?: boolean;
      hyperdriveBindings?: Record<string, unknown>;
      kvNamespaces?: Record<string, unknown>;
      limits?: { cpuMs: number };
      mtlsCertificates?: Record<string, unknown>;
      placement?: { mode: string };
      queueProducers?: Record<string, unknown>;
      r2Buckets?: Record<string, unknown>;
      services?: Record<string, unknown>;
      usageModel?: "standard" | "bundled" | "unbound";
      vectorizeBindings?: Record<string, unknown>;
      wranglerConfigHash?: string;
    };
  };
  /** Framework the project is using. */
  framework: string;
  /** Version of the framework the project is using. */
  frameworkVersion: string;
  /** Most recent deployment of the project. */
  latestDeployment: {
    id: string;
    aliases: string[] | null;
    buildConfig: {
      webAnalyticsTag: string | null;
      webAnalyticsToken: string | null;
      buildCaching?: boolean | null;
      buildCommand?: string | null;
      destinationDir?: string | null;
      rootDir?: string | null;
    };
    createdOn: string;
    deploymentTrigger: {
      metadata: {
        branch: string;
        commitDirty: boolean;
        commitHash: string;
        commitMessage: string;
      };
      type: "github:push" | "ad_hoc" | "deploy_hook";
    };
    envVars: Record<string, unknown> | null;
    environment: "preview" | "production";
    isSkipped: boolean;
    latestStage: unknown;
    modifiedOn: string;
    projectId: string;
    projectName: string;
    shortId: string;
    source: {
      config: {
        deploymentsEnabled?: boolean;
        owner?: string;
        ownerId?: string;
        pathExcludes?: string[];
        pathIncludes?: string[];
        prCommentsEnabled?: boolean;
        previewBranchExcludes?: string[];
        previewBranchIncludes?: string[];
        previewDeploymentSetting?: "all" | "none" | "custom";
        productionBranch?: string;
        productionDeploymentsEnabled?: boolean;
        repoId?: string;
        repoName?: string;
      };
      type: "github" | "gitlab";
    };
    stages: unknown[];
    url: string;
    usesFunctions?: boolean | null;
  } | null;
  /** Name of the project. */
  name: string;
  /** Name of the preview script. */
  previewScriptName: string;
  /** Production branch of the project. Used to identify production deployments. */
  productionBranch: string;
  /** Name of the production script. */
  productionScriptName: string;
  /** Whether the project uses functions. */
  usesFunctions: boolean | null;
  /** Configs for the project build process. */
  buildConfig?: {
    webAnalyticsTag: string | null;
    webAnalyticsToken: string | null;
    buildCaching?: boolean | null;
    buildCommand?: string | null;
    destinationDir?: string | null;
    rootDir?: string | null;
  };
  /** A list of associated custom domains for the project. */
  domains?: string[];
  /** Configs for the project source control. */
  source?: {
    config: {
      deploymentsEnabled?: boolean;
      owner?: string;
      ownerId?: string;
      pathExcludes?: string[];
      pathIncludes?: string[];
      prCommentsEnabled?: boolean;
      previewBranchExcludes?: string[];
      previewBranchIncludes?: string[];
      previewDeploymentSetting?: "all" | "none" | "custom";
      productionBranch?: string;
      productionDeploymentsEnabled?: boolean;
      repoId?: string;
      repoName?: string;
    };
    type: "github" | "gitlab";
  };
  /** The Cloudflare subdomain associated with the project. */
  subdomain?: string;
}

export const CreateProjectResponse = Schema.Struct({
  id: Schema.String,
  canonicalDeployment: Schema.Union([
    Schema.Struct({
      id: Schema.String,
      aliases: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      buildConfig: Schema.Struct({
        webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
        webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
        buildCaching: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        buildCommand: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        destinationDir: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          webAnalyticsTag: "web_analytics_tag",
          webAnalyticsToken: "web_analytics_token",
          buildCaching: "build_caching",
          buildCommand: "build_command",
          destinationDir: "destination_dir",
          rootDir: "root_dir",
        }),
      ),
      createdOn: Schema.String,
      deploymentTrigger: Schema.Struct({
        metadata: Schema.Struct({
          branch: Schema.String,
          commitDirty: Schema.Boolean,
          commitHash: Schema.String,
          commitMessage: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            commitDirty: "commit_dirty",
            commitHash: "commit_hash",
            commitMessage: "commit_message",
          }),
        ),
        type: Schema.Literals(["github:push", "ad_hoc", "deploy_hook"]),
      }),
      envVars: Schema.Union([Schema.Struct({}), Schema.Null]),
      environment: Schema.Literals(["preview", "production"]),
      isSkipped: Schema.Boolean,
      latestStage: Schema.Unknown,
      modifiedOn: Schema.String,
      projectId: Schema.String,
      projectName: Schema.String,
      shortId: Schema.String,
      source: Schema.Struct({
        config: Schema.Struct({
          deploymentsEnabled: Schema.optional(Schema.Boolean),
          owner: Schema.optional(Schema.String),
          ownerId: Schema.optional(Schema.String),
          pathExcludes: Schema.optional(Schema.Array(Schema.String)),
          pathIncludes: Schema.optional(Schema.Array(Schema.String)),
          prCommentsEnabled: Schema.optional(Schema.Boolean),
          previewBranchExcludes: Schema.optional(Schema.Array(Schema.String)),
          previewBranchIncludes: Schema.optional(Schema.Array(Schema.String)),
          previewDeploymentSetting: Schema.optional(
            Schema.Literals(["all", "none", "custom"]),
          ),
          productionBranch: Schema.optional(Schema.String),
          productionDeploymentsEnabled: Schema.optional(Schema.Boolean),
          repoId: Schema.optional(Schema.String),
          repoName: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            deploymentsEnabled: "deployments_enabled",
            ownerId: "owner_id",
            pathExcludes: "path_excludes",
            pathIncludes: "path_includes",
            prCommentsEnabled: "pr_comments_enabled",
            previewBranchExcludes: "preview_branch_excludes",
            previewBranchIncludes: "preview_branch_includes",
            previewDeploymentSetting: "preview_deployment_setting",
            productionBranch: "production_branch",
            productionDeploymentsEnabled: "production_deployments_enabled",
            repoId: "repo_id",
            repoName: "repo_name",
          }),
        ),
        type: Schema.Literals(["github", "gitlab"]),
      }),
      stages: Schema.Array(Schema.Unknown),
      url: Schema.String,
      usesFunctions: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        buildConfig: "build_config",
        createdOn: "created_on",
        deploymentTrigger: "deployment_trigger",
        envVars: "env_vars",
        isSkipped: "is_skipped",
        latestStage: "latest_stage",
        modifiedOn: "modified_on",
        projectId: "project_id",
        projectName: "project_name",
        shortId: "short_id",
        usesFunctions: "uses_functions",
      }),
    ),
    Schema.Null,
  ]),
  createdOn: Schema.String,
  deploymentConfigs: Schema.Struct({
    preview: Schema.Struct({
      aiBindings: Schema.optional(Schema.Struct({})),
      alwaysUseLatestCompatibilityDate: Schema.optional(Schema.Boolean),
      analyticsEngineDatasets: Schema.optional(Schema.Struct({})),
      browsers: Schema.optional(Schema.Struct({})),
      buildImageMajorVersion: Schema.optional(Schema.Number),
      compatibilityDate: Schema.optional(Schema.String),
      compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
      d1Databases: Schema.optional(Schema.Struct({})),
      durableObjectNamespaces: Schema.optional(Schema.Struct({})),
      envVars: Schema.optional(Schema.Struct({})),
      failOpen: Schema.optional(Schema.Boolean),
      hyperdriveBindings: Schema.optional(Schema.Struct({})),
      kvNamespaces: Schema.optional(Schema.Struct({})),
      limits: Schema.optional(
        Schema.Struct({
          cpuMs: Schema.Number,
        }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
      ),
      mtlsCertificates: Schema.optional(Schema.Struct({})),
      placement: Schema.optional(
        Schema.Struct({
          mode: Schema.String,
        }),
      ),
      queueProducers: Schema.optional(Schema.Struct({})),
      r2Buckets: Schema.optional(Schema.Struct({})),
      services: Schema.optional(Schema.Struct({})),
      usageModel: Schema.optional(
        Schema.Literals(["standard", "bundled", "unbound"]),
      ),
      vectorizeBindings: Schema.optional(Schema.Struct({})),
      wranglerConfigHash: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        aiBindings: "ai_bindings",
        alwaysUseLatestCompatibilityDate:
          "always_use_latest_compatibility_date",
        analyticsEngineDatasets: "analytics_engine_datasets",
        buildImageMajorVersion: "build_image_major_version",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        d1Databases: "d1_databases",
        durableObjectNamespaces: "durable_object_namespaces",
        envVars: "env_vars",
        failOpen: "fail_open",
        hyperdriveBindings: "hyperdrive_bindings",
        kvNamespaces: "kv_namespaces",
        mtlsCertificates: "mtls_certificates",
        queueProducers: "queue_producers",
        r2Buckets: "r2_buckets",
        usageModel: "usage_model",
        vectorizeBindings: "vectorize_bindings",
        wranglerConfigHash: "wrangler_config_hash",
      }),
    ),
    production: Schema.Struct({
      aiBindings: Schema.optional(Schema.Struct({})),
      alwaysUseLatestCompatibilityDate: Schema.optional(Schema.Boolean),
      analyticsEngineDatasets: Schema.optional(Schema.Struct({})),
      browsers: Schema.optional(Schema.Struct({})),
      buildImageMajorVersion: Schema.optional(Schema.Number),
      compatibilityDate: Schema.optional(Schema.String),
      compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
      d1Databases: Schema.optional(Schema.Struct({})),
      durableObjectNamespaces: Schema.optional(Schema.Struct({})),
      envVars: Schema.optional(Schema.Struct({})),
      failOpen: Schema.optional(Schema.Boolean),
      hyperdriveBindings: Schema.optional(Schema.Struct({})),
      kvNamespaces: Schema.optional(Schema.Struct({})),
      limits: Schema.optional(
        Schema.Struct({
          cpuMs: Schema.Number,
        }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
      ),
      mtlsCertificates: Schema.optional(Schema.Struct({})),
      placement: Schema.optional(
        Schema.Struct({
          mode: Schema.String,
        }),
      ),
      queueProducers: Schema.optional(Schema.Struct({})),
      r2Buckets: Schema.optional(Schema.Struct({})),
      services: Schema.optional(Schema.Struct({})),
      usageModel: Schema.optional(
        Schema.Literals(["standard", "bundled", "unbound"]),
      ),
      vectorizeBindings: Schema.optional(Schema.Struct({})),
      wranglerConfigHash: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        aiBindings: "ai_bindings",
        alwaysUseLatestCompatibilityDate:
          "always_use_latest_compatibility_date",
        analyticsEngineDatasets: "analytics_engine_datasets",
        buildImageMajorVersion: "build_image_major_version",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        d1Databases: "d1_databases",
        durableObjectNamespaces: "durable_object_namespaces",
        envVars: "env_vars",
        failOpen: "fail_open",
        hyperdriveBindings: "hyperdrive_bindings",
        kvNamespaces: "kv_namespaces",
        mtlsCertificates: "mtls_certificates",
        queueProducers: "queue_producers",
        r2Buckets: "r2_buckets",
        usageModel: "usage_model",
        vectorizeBindings: "vectorize_bindings",
        wranglerConfigHash: "wrangler_config_hash",
      }),
    ),
  }),
  framework: Schema.String,
  frameworkVersion: Schema.String,
  latestDeployment: Schema.Union([
    Schema.Struct({
      id: Schema.String,
      aliases: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      buildConfig: Schema.Struct({
        webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
        webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
        buildCaching: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        buildCommand: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        destinationDir: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          webAnalyticsTag: "web_analytics_tag",
          webAnalyticsToken: "web_analytics_token",
          buildCaching: "build_caching",
          buildCommand: "build_command",
          destinationDir: "destination_dir",
          rootDir: "root_dir",
        }),
      ),
      createdOn: Schema.String,
      deploymentTrigger: Schema.Struct({
        metadata: Schema.Struct({
          branch: Schema.String,
          commitDirty: Schema.Boolean,
          commitHash: Schema.String,
          commitMessage: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            commitDirty: "commit_dirty",
            commitHash: "commit_hash",
            commitMessage: "commit_message",
          }),
        ),
        type: Schema.Literals(["github:push", "ad_hoc", "deploy_hook"]),
      }),
      envVars: Schema.Union([Schema.Struct({}), Schema.Null]),
      environment: Schema.Literals(["preview", "production"]),
      isSkipped: Schema.Boolean,
      latestStage: Schema.Unknown,
      modifiedOn: Schema.String,
      projectId: Schema.String,
      projectName: Schema.String,
      shortId: Schema.String,
      source: Schema.Struct({
        config: Schema.Struct({
          deploymentsEnabled: Schema.optional(Schema.Boolean),
          owner: Schema.optional(Schema.String),
          ownerId: Schema.optional(Schema.String),
          pathExcludes: Schema.optional(Schema.Array(Schema.String)),
          pathIncludes: Schema.optional(Schema.Array(Schema.String)),
          prCommentsEnabled: Schema.optional(Schema.Boolean),
          previewBranchExcludes: Schema.optional(Schema.Array(Schema.String)),
          previewBranchIncludes: Schema.optional(Schema.Array(Schema.String)),
          previewDeploymentSetting: Schema.optional(
            Schema.Literals(["all", "none", "custom"]),
          ),
          productionBranch: Schema.optional(Schema.String),
          productionDeploymentsEnabled: Schema.optional(Schema.Boolean),
          repoId: Schema.optional(Schema.String),
          repoName: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            deploymentsEnabled: "deployments_enabled",
            ownerId: "owner_id",
            pathExcludes: "path_excludes",
            pathIncludes: "path_includes",
            prCommentsEnabled: "pr_comments_enabled",
            previewBranchExcludes: "preview_branch_excludes",
            previewBranchIncludes: "preview_branch_includes",
            previewDeploymentSetting: "preview_deployment_setting",
            productionBranch: "production_branch",
            productionDeploymentsEnabled: "production_deployments_enabled",
            repoId: "repo_id",
            repoName: "repo_name",
          }),
        ),
        type: Schema.Literals(["github", "gitlab"]),
      }),
      stages: Schema.Array(Schema.Unknown),
      url: Schema.String,
      usesFunctions: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        buildConfig: "build_config",
        createdOn: "created_on",
        deploymentTrigger: "deployment_trigger",
        envVars: "env_vars",
        isSkipped: "is_skipped",
        latestStage: "latest_stage",
        modifiedOn: "modified_on",
        projectId: "project_id",
        projectName: "project_name",
        shortId: "short_id",
        usesFunctions: "uses_functions",
      }),
    ),
    Schema.Null,
  ]),
  name: Schema.String,
  previewScriptName: Schema.String,
  productionBranch: Schema.String,
  productionScriptName: Schema.String,
  usesFunctions: Schema.Union([Schema.Boolean, Schema.Null]),
  buildConfig: Schema.optional(
    Schema.Struct({
      webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
      webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
      buildCaching: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      buildCommand: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      destinationDir: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        webAnalyticsTag: "web_analytics_tag",
        webAnalyticsToken: "web_analytics_token",
        buildCaching: "build_caching",
        buildCommand: "build_command",
        destinationDir: "destination_dir",
        rootDir: "root_dir",
      }),
    ),
  ),
  domains: Schema.optional(Schema.Array(Schema.String)),
  source: Schema.optional(
    Schema.Struct({
      config: Schema.Struct({
        deploymentsEnabled: Schema.optional(Schema.Boolean),
        owner: Schema.optional(Schema.String),
        ownerId: Schema.optional(Schema.String),
        pathExcludes: Schema.optional(Schema.Array(Schema.String)),
        pathIncludes: Schema.optional(Schema.Array(Schema.String)),
        prCommentsEnabled: Schema.optional(Schema.Boolean),
        previewBranchExcludes: Schema.optional(Schema.Array(Schema.String)),
        previewBranchIncludes: Schema.optional(Schema.Array(Schema.String)),
        previewDeploymentSetting: Schema.optional(
          Schema.Literals(["all", "none", "custom"]),
        ),
        productionBranch: Schema.optional(Schema.String),
        productionDeploymentsEnabled: Schema.optional(Schema.Boolean),
        repoId: Schema.optional(Schema.String),
        repoName: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          deploymentsEnabled: "deployments_enabled",
          ownerId: "owner_id",
          pathExcludes: "path_excludes",
          pathIncludes: "path_includes",
          prCommentsEnabled: "pr_comments_enabled",
          previewBranchExcludes: "preview_branch_excludes",
          previewBranchIncludes: "preview_branch_includes",
          previewDeploymentSetting: "preview_deployment_setting",
          productionBranch: "production_branch",
          productionDeploymentsEnabled: "production_deployments_enabled",
          repoId: "repo_id",
          repoName: "repo_name",
        }),
      ),
      type: Schema.Literals(["github", "gitlab"]),
    }),
  ),
  subdomain: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    canonicalDeployment: "canonical_deployment",
    createdOn: "created_on",
    deploymentConfigs: "deployment_configs",
    frameworkVersion: "framework_version",
    latestDeployment: "latest_deployment",
    previewScriptName: "preview_script_name",
    productionBranch: "production_branch",
    productionScriptName: "production_script_name",
    usesFunctions: "uses_functions",
    buildConfig: "build_config",
  }),
) as unknown as Schema.Schema<CreateProjectResponse>;

export const createProject: (
  input: CreateProjectRequest,
) => Effect.Effect<
  CreateProjectResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectRequest,
  output: CreateProjectResponse,
  errors: [],
}));

export interface PatchProjectRequest {
  projectName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Configs for the project build process. */
  buildConfig?: {
    buildCaching?: boolean;
    buildCommand?: string;
    destinationDir?: string;
    rootDir?: string;
    webAnalyticsTag?: string | null;
    webAnalyticsToken?: string | null;
  };
  /** Body param: Configs for deployments in a project. */
  deploymentConfigs?: {
    preview?: {
      aiBindings?: Record<string, unknown>;
      alwaysUseLatestCompatibilityDate?: boolean;
      analyticsEngineDatasets?: Record<string, unknown>;
      browsers?: Record<string, unknown>;
      buildImageMajorVersion?: number;
      compatibilityDate?: string;
      compatibilityFlags?: string[];
      d1Databases?: Record<string, unknown>;
      durableObjectNamespaces?: Record<string, unknown>;
      envVars?: Record<string, unknown>;
      failOpen?: boolean;
      hyperdriveBindings?: Record<string, unknown>;
      kvNamespaces?: Record<string, unknown>;
      limits?: { cpuMs: number };
      mtlsCertificates?: Record<string, unknown>;
      placement?: { mode: string };
      queueProducers?: Record<string, unknown>;
      r2Buckets?: Record<string, unknown>;
      services?: Record<string, unknown>;
      usageModel?: "standard" | "bundled" | "unbound";
      vectorizeBindings?: Record<string, unknown>;
      wranglerConfigHash?: string;
    };
    production?: {
      aiBindings?: Record<string, unknown>;
      alwaysUseLatestCompatibilityDate?: boolean;
      analyticsEngineDatasets?: Record<string, unknown>;
      browsers?: Record<string, unknown>;
      buildImageMajorVersion?: number;
      compatibilityDate?: string;
      compatibilityFlags?: string[];
      d1Databases?: Record<string, unknown>;
      durableObjectNamespaces?: Record<string, unknown>;
      envVars?: Record<string, unknown>;
      failOpen?: boolean;
      hyperdriveBindings?: Record<string, unknown>;
      kvNamespaces?: Record<string, unknown>;
      limits?: { cpuMs: number };
      mtlsCertificates?: Record<string, unknown>;
      placement?: { mode: string };
      queueProducers?: Record<string, unknown>;
      r2Buckets?: Record<string, unknown>;
      services?: Record<string, unknown>;
      usageModel?: "standard" | "bundled" | "unbound";
      vectorizeBindings?: Record<string, unknown>;
      wranglerConfigHash?: string;
    };
  };
  /** Body param: Name of the project. */
  name?: string;
  /** Body param: Production branch of the project. Used to identify production deployments. */
  productionBranch?: string;
  /** Body param: Configs for the project source control. */
  source?: {
    config: {
      deploymentsEnabled?: boolean;
      owner?: string;
      ownerId?: string;
      pathExcludes?: string[];
      pathIncludes?: string[];
      prCommentsEnabled?: boolean;
      previewBranchExcludes?: string[];
      previewBranchIncludes?: string[];
      previewDeploymentSetting?: "all" | "none" | "custom";
      productionBranch?: string;
      productionDeploymentsEnabled?: boolean;
      repoId?: string;
      repoName?: string;
    };
    type: "github" | "gitlab";
  };
}

export const PatchProjectRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  buildConfig: Schema.optional(
    Schema.Struct({
      buildCaching: Schema.optional(Schema.Boolean),
      buildCommand: Schema.optional(Schema.String),
      destinationDir: Schema.optional(Schema.String),
      rootDir: Schema.optional(Schema.String),
      webAnalyticsTag: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      webAnalyticsToken: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        buildCaching: "build_caching",
        buildCommand: "build_command",
        destinationDir: "destination_dir",
        rootDir: "root_dir",
        webAnalyticsTag: "web_analytics_tag",
        webAnalyticsToken: "web_analytics_token",
      }),
    ),
  ),
  deploymentConfigs: Schema.optional(
    Schema.Struct({
      preview: Schema.optional(
        Schema.Struct({
          aiBindings: Schema.optional(Schema.Struct({})),
          alwaysUseLatestCompatibilityDate: Schema.optional(Schema.Boolean),
          analyticsEngineDatasets: Schema.optional(Schema.Struct({})),
          browsers: Schema.optional(Schema.Struct({})),
          buildImageMajorVersion: Schema.optional(Schema.Number),
          compatibilityDate: Schema.optional(Schema.String),
          compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
          d1Databases: Schema.optional(Schema.Struct({})),
          durableObjectNamespaces: Schema.optional(Schema.Struct({})),
          envVars: Schema.optional(Schema.Struct({})),
          failOpen: Schema.optional(Schema.Boolean),
          hyperdriveBindings: Schema.optional(Schema.Struct({})),
          kvNamespaces: Schema.optional(Schema.Struct({})),
          limits: Schema.optional(
            Schema.Struct({
              cpuMs: Schema.Number,
            }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
          ),
          mtlsCertificates: Schema.optional(Schema.Struct({})),
          placement: Schema.optional(
            Schema.Struct({
              mode: Schema.String,
            }),
          ),
          queueProducers: Schema.optional(Schema.Struct({})),
          r2Buckets: Schema.optional(Schema.Struct({})),
          services: Schema.optional(Schema.Struct({})),
          usageModel: Schema.optional(
            Schema.Literals(["standard", "bundled", "unbound"]),
          ),
          vectorizeBindings: Schema.optional(Schema.Struct({})),
          wranglerConfigHash: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            aiBindings: "ai_bindings",
            alwaysUseLatestCompatibilityDate:
              "always_use_latest_compatibility_date",
            analyticsEngineDatasets: "analytics_engine_datasets",
            buildImageMajorVersion: "build_image_major_version",
            compatibilityDate: "compatibility_date",
            compatibilityFlags: "compatibility_flags",
            d1Databases: "d1_databases",
            durableObjectNamespaces: "durable_object_namespaces",
            envVars: "env_vars",
            failOpen: "fail_open",
            hyperdriveBindings: "hyperdrive_bindings",
            kvNamespaces: "kv_namespaces",
            mtlsCertificates: "mtls_certificates",
            queueProducers: "queue_producers",
            r2Buckets: "r2_buckets",
            usageModel: "usage_model",
            vectorizeBindings: "vectorize_bindings",
            wranglerConfigHash: "wrangler_config_hash",
          }),
        ),
      ),
      production: Schema.optional(
        Schema.Struct({
          aiBindings: Schema.optional(Schema.Struct({})),
          alwaysUseLatestCompatibilityDate: Schema.optional(Schema.Boolean),
          analyticsEngineDatasets: Schema.optional(Schema.Struct({})),
          browsers: Schema.optional(Schema.Struct({})),
          buildImageMajorVersion: Schema.optional(Schema.Number),
          compatibilityDate: Schema.optional(Schema.String),
          compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
          d1Databases: Schema.optional(Schema.Struct({})),
          durableObjectNamespaces: Schema.optional(Schema.Struct({})),
          envVars: Schema.optional(Schema.Struct({})),
          failOpen: Schema.optional(Schema.Boolean),
          hyperdriveBindings: Schema.optional(Schema.Struct({})),
          kvNamespaces: Schema.optional(Schema.Struct({})),
          limits: Schema.optional(
            Schema.Struct({
              cpuMs: Schema.Number,
            }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
          ),
          mtlsCertificates: Schema.optional(Schema.Struct({})),
          placement: Schema.optional(
            Schema.Struct({
              mode: Schema.String,
            }),
          ),
          queueProducers: Schema.optional(Schema.Struct({})),
          r2Buckets: Schema.optional(Schema.Struct({})),
          services: Schema.optional(Schema.Struct({})),
          usageModel: Schema.optional(
            Schema.Literals(["standard", "bundled", "unbound"]),
          ),
          vectorizeBindings: Schema.optional(Schema.Struct({})),
          wranglerConfigHash: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            aiBindings: "ai_bindings",
            alwaysUseLatestCompatibilityDate:
              "always_use_latest_compatibility_date",
            analyticsEngineDatasets: "analytics_engine_datasets",
            buildImageMajorVersion: "build_image_major_version",
            compatibilityDate: "compatibility_date",
            compatibilityFlags: "compatibility_flags",
            d1Databases: "d1_databases",
            durableObjectNamespaces: "durable_object_namespaces",
            envVars: "env_vars",
            failOpen: "fail_open",
            hyperdriveBindings: "hyperdrive_bindings",
            kvNamespaces: "kv_namespaces",
            mtlsCertificates: "mtls_certificates",
            queueProducers: "queue_producers",
            r2Buckets: "r2_buckets",
            usageModel: "usage_model",
            vectorizeBindings: "vectorize_bindings",
            wranglerConfigHash: "wrangler_config_hash",
          }),
        ),
      ),
    }),
  ),
  name: Schema.optional(Schema.String),
  productionBranch: Schema.optional(Schema.String),
  source: Schema.optional(
    Schema.Struct({
      config: Schema.Struct({
        deploymentsEnabled: Schema.optional(Schema.Boolean),
        owner: Schema.optional(Schema.String),
        ownerId: Schema.optional(Schema.String),
        pathExcludes: Schema.optional(Schema.Array(Schema.String)),
        pathIncludes: Schema.optional(Schema.Array(Schema.String)),
        prCommentsEnabled: Schema.optional(Schema.Boolean),
        previewBranchExcludes: Schema.optional(Schema.Array(Schema.String)),
        previewBranchIncludes: Schema.optional(Schema.Array(Schema.String)),
        previewDeploymentSetting: Schema.optional(
          Schema.Literals(["all", "none", "custom"]),
        ),
        productionBranch: Schema.optional(Schema.String),
        productionDeploymentsEnabled: Schema.optional(Schema.Boolean),
        repoId: Schema.optional(Schema.String),
        repoName: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          deploymentsEnabled: "deployments_enabled",
          ownerId: "owner_id",
          pathExcludes: "path_excludes",
          pathIncludes: "path_includes",
          prCommentsEnabled: "pr_comments_enabled",
          previewBranchExcludes: "preview_branch_excludes",
          previewBranchIncludes: "preview_branch_includes",
          previewDeploymentSetting: "preview_deployment_setting",
          productionBranch: "production_branch",
          productionDeploymentsEnabled: "production_deployments_enabled",
          repoId: "repo_id",
          repoName: "repo_name",
        }),
      ),
      type: Schema.Literals(["github", "gitlab"]),
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    buildConfig: "build_config",
    deploymentConfigs: "deployment_configs",
    productionBranch: "production_branch",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/pages/projects/{projectName}",
  }),
) as unknown as Schema.Schema<PatchProjectRequest>;

export interface PatchProjectResponse {
  /** ID of the project. */
  id: string;
  /** Most recent production deployment of the project. */
  canonicalDeployment: {
    id: string;
    aliases: string[] | null;
    buildConfig: {
      webAnalyticsTag: string | null;
      webAnalyticsToken: string | null;
      buildCaching?: boolean | null;
      buildCommand?: string | null;
      destinationDir?: string | null;
      rootDir?: string | null;
    };
    createdOn: string;
    deploymentTrigger: {
      metadata: {
        branch: string;
        commitDirty: boolean;
        commitHash: string;
        commitMessage: string;
      };
      type: "github:push" | "ad_hoc" | "deploy_hook";
    };
    envVars: Record<string, unknown> | null;
    environment: "preview" | "production";
    isSkipped: boolean;
    latestStage: unknown;
    modifiedOn: string;
    projectId: string;
    projectName: string;
    shortId: string;
    source: {
      config: {
        deploymentsEnabled?: boolean;
        owner?: string;
        ownerId?: string;
        pathExcludes?: string[];
        pathIncludes?: string[];
        prCommentsEnabled?: boolean;
        previewBranchExcludes?: string[];
        previewBranchIncludes?: string[];
        previewDeploymentSetting?: "all" | "none" | "custom";
        productionBranch?: string;
        productionDeploymentsEnabled?: boolean;
        repoId?: string;
        repoName?: string;
      };
      type: "github" | "gitlab";
    };
    stages: unknown[];
    url: string;
    usesFunctions?: boolean | null;
  } | null;
  /** When the project was created. */
  createdOn: string;
  /** Configs for deployments in a project. */
  deploymentConfigs: {
    preview: {
      aiBindings?: Record<string, unknown>;
      alwaysUseLatestCompatibilityDate?: boolean;
      analyticsEngineDatasets?: Record<string, unknown>;
      browsers?: Record<string, unknown>;
      buildImageMajorVersion?: number;
      compatibilityDate?: string;
      compatibilityFlags?: string[];
      d1Databases?: Record<string, unknown>;
      durableObjectNamespaces?: Record<string, unknown>;
      envVars?: Record<string, unknown>;
      failOpen?: boolean;
      hyperdriveBindings?: Record<string, unknown>;
      kvNamespaces?: Record<string, unknown>;
      limits?: { cpuMs: number };
      mtlsCertificates?: Record<string, unknown>;
      placement?: { mode: string };
      queueProducers?: Record<string, unknown>;
      r2Buckets?: Record<string, unknown>;
      services?: Record<string, unknown>;
      usageModel?: "standard" | "bundled" | "unbound";
      vectorizeBindings?: Record<string, unknown>;
      wranglerConfigHash?: string;
    };
    production: {
      aiBindings?: Record<string, unknown>;
      alwaysUseLatestCompatibilityDate?: boolean;
      analyticsEngineDatasets?: Record<string, unknown>;
      browsers?: Record<string, unknown>;
      buildImageMajorVersion?: number;
      compatibilityDate?: string;
      compatibilityFlags?: string[];
      d1Databases?: Record<string, unknown>;
      durableObjectNamespaces?: Record<string, unknown>;
      envVars?: Record<string, unknown>;
      failOpen?: boolean;
      hyperdriveBindings?: Record<string, unknown>;
      kvNamespaces?: Record<string, unknown>;
      limits?: { cpuMs: number };
      mtlsCertificates?: Record<string, unknown>;
      placement?: { mode: string };
      queueProducers?: Record<string, unknown>;
      r2Buckets?: Record<string, unknown>;
      services?: Record<string, unknown>;
      usageModel?: "standard" | "bundled" | "unbound";
      vectorizeBindings?: Record<string, unknown>;
      wranglerConfigHash?: string;
    };
  };
  /** Framework the project is using. */
  framework: string;
  /** Version of the framework the project is using. */
  frameworkVersion: string;
  /** Most recent deployment of the project. */
  latestDeployment: {
    id: string;
    aliases: string[] | null;
    buildConfig: {
      webAnalyticsTag: string | null;
      webAnalyticsToken: string | null;
      buildCaching?: boolean | null;
      buildCommand?: string | null;
      destinationDir?: string | null;
      rootDir?: string | null;
    };
    createdOn: string;
    deploymentTrigger: {
      metadata: {
        branch: string;
        commitDirty: boolean;
        commitHash: string;
        commitMessage: string;
      };
      type: "github:push" | "ad_hoc" | "deploy_hook";
    };
    envVars: Record<string, unknown> | null;
    environment: "preview" | "production";
    isSkipped: boolean;
    latestStage: unknown;
    modifiedOn: string;
    projectId: string;
    projectName: string;
    shortId: string;
    source: {
      config: {
        deploymentsEnabled?: boolean;
        owner?: string;
        ownerId?: string;
        pathExcludes?: string[];
        pathIncludes?: string[];
        prCommentsEnabled?: boolean;
        previewBranchExcludes?: string[];
        previewBranchIncludes?: string[];
        previewDeploymentSetting?: "all" | "none" | "custom";
        productionBranch?: string;
        productionDeploymentsEnabled?: boolean;
        repoId?: string;
        repoName?: string;
      };
      type: "github" | "gitlab";
    };
    stages: unknown[];
    url: string;
    usesFunctions?: boolean | null;
  } | null;
  /** Name of the project. */
  name: string;
  /** Name of the preview script. */
  previewScriptName: string;
  /** Production branch of the project. Used to identify production deployments. */
  productionBranch: string;
  /** Name of the production script. */
  productionScriptName: string;
  /** Whether the project uses functions. */
  usesFunctions: boolean | null;
  /** Configs for the project build process. */
  buildConfig?: {
    webAnalyticsTag: string | null;
    webAnalyticsToken: string | null;
    buildCaching?: boolean | null;
    buildCommand?: string | null;
    destinationDir?: string | null;
    rootDir?: string | null;
  };
  /** A list of associated custom domains for the project. */
  domains?: string[];
  /** Configs for the project source control. */
  source?: {
    config: {
      deploymentsEnabled?: boolean;
      owner?: string;
      ownerId?: string;
      pathExcludes?: string[];
      pathIncludes?: string[];
      prCommentsEnabled?: boolean;
      previewBranchExcludes?: string[];
      previewBranchIncludes?: string[];
      previewDeploymentSetting?: "all" | "none" | "custom";
      productionBranch?: string;
      productionDeploymentsEnabled?: boolean;
      repoId?: string;
      repoName?: string;
    };
    type: "github" | "gitlab";
  };
  /** The Cloudflare subdomain associated with the project. */
  subdomain?: string;
}

export const PatchProjectResponse = Schema.Struct({
  id: Schema.String,
  canonicalDeployment: Schema.Union([
    Schema.Struct({
      id: Schema.String,
      aliases: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      buildConfig: Schema.Struct({
        webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
        webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
        buildCaching: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        buildCommand: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        destinationDir: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          webAnalyticsTag: "web_analytics_tag",
          webAnalyticsToken: "web_analytics_token",
          buildCaching: "build_caching",
          buildCommand: "build_command",
          destinationDir: "destination_dir",
          rootDir: "root_dir",
        }),
      ),
      createdOn: Schema.String,
      deploymentTrigger: Schema.Struct({
        metadata: Schema.Struct({
          branch: Schema.String,
          commitDirty: Schema.Boolean,
          commitHash: Schema.String,
          commitMessage: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            commitDirty: "commit_dirty",
            commitHash: "commit_hash",
            commitMessage: "commit_message",
          }),
        ),
        type: Schema.Literals(["github:push", "ad_hoc", "deploy_hook"]),
      }),
      envVars: Schema.Union([Schema.Struct({}), Schema.Null]),
      environment: Schema.Literals(["preview", "production"]),
      isSkipped: Schema.Boolean,
      latestStage: Schema.Unknown,
      modifiedOn: Schema.String,
      projectId: Schema.String,
      projectName: Schema.String,
      shortId: Schema.String,
      source: Schema.Struct({
        config: Schema.Struct({
          deploymentsEnabled: Schema.optional(Schema.Boolean),
          owner: Schema.optional(Schema.String),
          ownerId: Schema.optional(Schema.String),
          pathExcludes: Schema.optional(Schema.Array(Schema.String)),
          pathIncludes: Schema.optional(Schema.Array(Schema.String)),
          prCommentsEnabled: Schema.optional(Schema.Boolean),
          previewBranchExcludes: Schema.optional(Schema.Array(Schema.String)),
          previewBranchIncludes: Schema.optional(Schema.Array(Schema.String)),
          previewDeploymentSetting: Schema.optional(
            Schema.Literals(["all", "none", "custom"]),
          ),
          productionBranch: Schema.optional(Schema.String),
          productionDeploymentsEnabled: Schema.optional(Schema.Boolean),
          repoId: Schema.optional(Schema.String),
          repoName: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            deploymentsEnabled: "deployments_enabled",
            ownerId: "owner_id",
            pathExcludes: "path_excludes",
            pathIncludes: "path_includes",
            prCommentsEnabled: "pr_comments_enabled",
            previewBranchExcludes: "preview_branch_excludes",
            previewBranchIncludes: "preview_branch_includes",
            previewDeploymentSetting: "preview_deployment_setting",
            productionBranch: "production_branch",
            productionDeploymentsEnabled: "production_deployments_enabled",
            repoId: "repo_id",
            repoName: "repo_name",
          }),
        ),
        type: Schema.Literals(["github", "gitlab"]),
      }),
      stages: Schema.Array(Schema.Unknown),
      url: Schema.String,
      usesFunctions: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        buildConfig: "build_config",
        createdOn: "created_on",
        deploymentTrigger: "deployment_trigger",
        envVars: "env_vars",
        isSkipped: "is_skipped",
        latestStage: "latest_stage",
        modifiedOn: "modified_on",
        projectId: "project_id",
        projectName: "project_name",
        shortId: "short_id",
        usesFunctions: "uses_functions",
      }),
    ),
    Schema.Null,
  ]),
  createdOn: Schema.String,
  deploymentConfigs: Schema.Struct({
    preview: Schema.Struct({
      aiBindings: Schema.optional(Schema.Struct({})),
      alwaysUseLatestCompatibilityDate: Schema.optional(Schema.Boolean),
      analyticsEngineDatasets: Schema.optional(Schema.Struct({})),
      browsers: Schema.optional(Schema.Struct({})),
      buildImageMajorVersion: Schema.optional(Schema.Number),
      compatibilityDate: Schema.optional(Schema.String),
      compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
      d1Databases: Schema.optional(Schema.Struct({})),
      durableObjectNamespaces: Schema.optional(Schema.Struct({})),
      envVars: Schema.optional(Schema.Struct({})),
      failOpen: Schema.optional(Schema.Boolean),
      hyperdriveBindings: Schema.optional(Schema.Struct({})),
      kvNamespaces: Schema.optional(Schema.Struct({})),
      limits: Schema.optional(
        Schema.Struct({
          cpuMs: Schema.Number,
        }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
      ),
      mtlsCertificates: Schema.optional(Schema.Struct({})),
      placement: Schema.optional(
        Schema.Struct({
          mode: Schema.String,
        }),
      ),
      queueProducers: Schema.optional(Schema.Struct({})),
      r2Buckets: Schema.optional(Schema.Struct({})),
      services: Schema.optional(Schema.Struct({})),
      usageModel: Schema.optional(
        Schema.Literals(["standard", "bundled", "unbound"]),
      ),
      vectorizeBindings: Schema.optional(Schema.Struct({})),
      wranglerConfigHash: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        aiBindings: "ai_bindings",
        alwaysUseLatestCompatibilityDate:
          "always_use_latest_compatibility_date",
        analyticsEngineDatasets: "analytics_engine_datasets",
        buildImageMajorVersion: "build_image_major_version",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        d1Databases: "d1_databases",
        durableObjectNamespaces: "durable_object_namespaces",
        envVars: "env_vars",
        failOpen: "fail_open",
        hyperdriveBindings: "hyperdrive_bindings",
        kvNamespaces: "kv_namespaces",
        mtlsCertificates: "mtls_certificates",
        queueProducers: "queue_producers",
        r2Buckets: "r2_buckets",
        usageModel: "usage_model",
        vectorizeBindings: "vectorize_bindings",
        wranglerConfigHash: "wrangler_config_hash",
      }),
    ),
    production: Schema.Struct({
      aiBindings: Schema.optional(Schema.Struct({})),
      alwaysUseLatestCompatibilityDate: Schema.optional(Schema.Boolean),
      analyticsEngineDatasets: Schema.optional(Schema.Struct({})),
      browsers: Schema.optional(Schema.Struct({})),
      buildImageMajorVersion: Schema.optional(Schema.Number),
      compatibilityDate: Schema.optional(Schema.String),
      compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
      d1Databases: Schema.optional(Schema.Struct({})),
      durableObjectNamespaces: Schema.optional(Schema.Struct({})),
      envVars: Schema.optional(Schema.Struct({})),
      failOpen: Schema.optional(Schema.Boolean),
      hyperdriveBindings: Schema.optional(Schema.Struct({})),
      kvNamespaces: Schema.optional(Schema.Struct({})),
      limits: Schema.optional(
        Schema.Struct({
          cpuMs: Schema.Number,
        }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
      ),
      mtlsCertificates: Schema.optional(Schema.Struct({})),
      placement: Schema.optional(
        Schema.Struct({
          mode: Schema.String,
        }),
      ),
      queueProducers: Schema.optional(Schema.Struct({})),
      r2Buckets: Schema.optional(Schema.Struct({})),
      services: Schema.optional(Schema.Struct({})),
      usageModel: Schema.optional(
        Schema.Literals(["standard", "bundled", "unbound"]),
      ),
      vectorizeBindings: Schema.optional(Schema.Struct({})),
      wranglerConfigHash: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        aiBindings: "ai_bindings",
        alwaysUseLatestCompatibilityDate:
          "always_use_latest_compatibility_date",
        analyticsEngineDatasets: "analytics_engine_datasets",
        buildImageMajorVersion: "build_image_major_version",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        d1Databases: "d1_databases",
        durableObjectNamespaces: "durable_object_namespaces",
        envVars: "env_vars",
        failOpen: "fail_open",
        hyperdriveBindings: "hyperdrive_bindings",
        kvNamespaces: "kv_namespaces",
        mtlsCertificates: "mtls_certificates",
        queueProducers: "queue_producers",
        r2Buckets: "r2_buckets",
        usageModel: "usage_model",
        vectorizeBindings: "vectorize_bindings",
        wranglerConfigHash: "wrangler_config_hash",
      }),
    ),
  }),
  framework: Schema.String,
  frameworkVersion: Schema.String,
  latestDeployment: Schema.Union([
    Schema.Struct({
      id: Schema.String,
      aliases: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      buildConfig: Schema.Struct({
        webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
        webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
        buildCaching: Schema.optional(
          Schema.Union([Schema.Boolean, Schema.Null]),
        ),
        buildCommand: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        destinationDir: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          webAnalyticsTag: "web_analytics_tag",
          webAnalyticsToken: "web_analytics_token",
          buildCaching: "build_caching",
          buildCommand: "build_command",
          destinationDir: "destination_dir",
          rootDir: "root_dir",
        }),
      ),
      createdOn: Schema.String,
      deploymentTrigger: Schema.Struct({
        metadata: Schema.Struct({
          branch: Schema.String,
          commitDirty: Schema.Boolean,
          commitHash: Schema.String,
          commitMessage: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            commitDirty: "commit_dirty",
            commitHash: "commit_hash",
            commitMessage: "commit_message",
          }),
        ),
        type: Schema.Literals(["github:push", "ad_hoc", "deploy_hook"]),
      }),
      envVars: Schema.Union([Schema.Struct({}), Schema.Null]),
      environment: Schema.Literals(["preview", "production"]),
      isSkipped: Schema.Boolean,
      latestStage: Schema.Unknown,
      modifiedOn: Schema.String,
      projectId: Schema.String,
      projectName: Schema.String,
      shortId: Schema.String,
      source: Schema.Struct({
        config: Schema.Struct({
          deploymentsEnabled: Schema.optional(Schema.Boolean),
          owner: Schema.optional(Schema.String),
          ownerId: Schema.optional(Schema.String),
          pathExcludes: Schema.optional(Schema.Array(Schema.String)),
          pathIncludes: Schema.optional(Schema.Array(Schema.String)),
          prCommentsEnabled: Schema.optional(Schema.Boolean),
          previewBranchExcludes: Schema.optional(Schema.Array(Schema.String)),
          previewBranchIncludes: Schema.optional(Schema.Array(Schema.String)),
          previewDeploymentSetting: Schema.optional(
            Schema.Literals(["all", "none", "custom"]),
          ),
          productionBranch: Schema.optional(Schema.String),
          productionDeploymentsEnabled: Schema.optional(Schema.Boolean),
          repoId: Schema.optional(Schema.String),
          repoName: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            deploymentsEnabled: "deployments_enabled",
            ownerId: "owner_id",
            pathExcludes: "path_excludes",
            pathIncludes: "path_includes",
            prCommentsEnabled: "pr_comments_enabled",
            previewBranchExcludes: "preview_branch_excludes",
            previewBranchIncludes: "preview_branch_includes",
            previewDeploymentSetting: "preview_deployment_setting",
            productionBranch: "production_branch",
            productionDeploymentsEnabled: "production_deployments_enabled",
            repoId: "repo_id",
            repoName: "repo_name",
          }),
        ),
        type: Schema.Literals(["github", "gitlab"]),
      }),
      stages: Schema.Array(Schema.Unknown),
      url: Schema.String,
      usesFunctions: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        buildConfig: "build_config",
        createdOn: "created_on",
        deploymentTrigger: "deployment_trigger",
        envVars: "env_vars",
        isSkipped: "is_skipped",
        latestStage: "latest_stage",
        modifiedOn: "modified_on",
        projectId: "project_id",
        projectName: "project_name",
        shortId: "short_id",
        usesFunctions: "uses_functions",
      }),
    ),
    Schema.Null,
  ]),
  name: Schema.String,
  previewScriptName: Schema.String,
  productionBranch: Schema.String,
  productionScriptName: Schema.String,
  usesFunctions: Schema.Union([Schema.Boolean, Schema.Null]),
  buildConfig: Schema.optional(
    Schema.Struct({
      webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
      webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
      buildCaching: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      buildCommand: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      destinationDir: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        webAnalyticsTag: "web_analytics_tag",
        webAnalyticsToken: "web_analytics_token",
        buildCaching: "build_caching",
        buildCommand: "build_command",
        destinationDir: "destination_dir",
        rootDir: "root_dir",
      }),
    ),
  ),
  domains: Schema.optional(Schema.Array(Schema.String)),
  source: Schema.optional(
    Schema.Struct({
      config: Schema.Struct({
        deploymentsEnabled: Schema.optional(Schema.Boolean),
        owner: Schema.optional(Schema.String),
        ownerId: Schema.optional(Schema.String),
        pathExcludes: Schema.optional(Schema.Array(Schema.String)),
        pathIncludes: Schema.optional(Schema.Array(Schema.String)),
        prCommentsEnabled: Schema.optional(Schema.Boolean),
        previewBranchExcludes: Schema.optional(Schema.Array(Schema.String)),
        previewBranchIncludes: Schema.optional(Schema.Array(Schema.String)),
        previewDeploymentSetting: Schema.optional(
          Schema.Literals(["all", "none", "custom"]),
        ),
        productionBranch: Schema.optional(Schema.String),
        productionDeploymentsEnabled: Schema.optional(Schema.Boolean),
        repoId: Schema.optional(Schema.String),
        repoName: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          deploymentsEnabled: "deployments_enabled",
          ownerId: "owner_id",
          pathExcludes: "path_excludes",
          pathIncludes: "path_includes",
          prCommentsEnabled: "pr_comments_enabled",
          previewBranchExcludes: "preview_branch_excludes",
          previewBranchIncludes: "preview_branch_includes",
          previewDeploymentSetting: "preview_deployment_setting",
          productionBranch: "production_branch",
          productionDeploymentsEnabled: "production_deployments_enabled",
          repoId: "repo_id",
          repoName: "repo_name",
        }),
      ),
      type: Schema.Literals(["github", "gitlab"]),
    }),
  ),
  subdomain: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    canonicalDeployment: "canonical_deployment",
    createdOn: "created_on",
    deploymentConfigs: "deployment_configs",
    frameworkVersion: "framework_version",
    latestDeployment: "latest_deployment",
    previewScriptName: "preview_script_name",
    productionBranch: "production_branch",
    productionScriptName: "production_script_name",
    usesFunctions: "uses_functions",
    buildConfig: "build_config",
  }),
) as unknown as Schema.Schema<PatchProjectResponse>;

export const patchProject: (
  input: PatchProjectRequest,
) => Effect.Effect<
  PatchProjectResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectRequest,
  output: PatchProjectResponse,
  errors: [],
}));

export interface DeleteProjectRequest {
  projectName: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteProjectRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/pages/projects/{projectName}",
  }),
) as unknown as Schema.Schema<DeleteProjectRequest>;

export type DeleteProjectResponse = unknown;

export const DeleteProjectResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteProjectResponse>;

export const deleteProject: (
  input: DeleteProjectRequest,
) => Effect.Effect<
  DeleteProjectResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectRequest,
  output: DeleteProjectResponse,
  errors: [],
}));

// =============================================================================
// ProjectDeployment
// =============================================================================

export interface GetProjectDeploymentRequest {
  projectName: string;
  deploymentId: string;
  /** Identifier. */
  accountId: string;
}

export const GetProjectDeploymentRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  deploymentId: Schema.String.pipe(T.HttpPath("deploymentId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pages/projects/{projectName}/deployments/{deploymentId}",
  }),
) as unknown as Schema.Schema<GetProjectDeploymentRequest>;

export interface GetProjectDeploymentResponse {
  /** Id of the deployment. */
  id: string;
  /** A list of alias URLs pointing to this deployment. */
  aliases: string[] | null;
  /** Configs for the project build process. */
  buildConfig: {
    webAnalyticsTag: string | null;
    webAnalyticsToken: string | null;
    buildCaching?: boolean | null;
    buildCommand?: string | null;
    destinationDir?: string | null;
    rootDir?: string | null;
  };
  /** When the deployment was created. */
  createdOn: string;
  /** Info about what caused the deployment. */
  deploymentTrigger: {
    metadata: {
      branch: string;
      commitDirty: boolean;
      commitHash: string;
      commitMessage: string;
    };
    type: "github:push" | "ad_hoc" | "deploy_hook";
  };
  /** Environment variables used for builds and Pages Functions. */
  envVars: Record<string, unknown> | null;
  /** Type of deploy. */
  environment: "preview" | "production";
  /** If the deployment has been skipped. */
  isSkipped: boolean;
  /** The status of the deployment. */
  latestStage: unknown;
  /** When the deployment was last modified. */
  modifiedOn: string;
  /** Id of the project. */
  projectId: string;
  /** Name of the project. */
  projectName: string;
  /** Short Id (8 character) of the deployment. */
  shortId: string;
  /** Configs for the project source control. */
  source: {
    config: {
      deploymentsEnabled: boolean;
      owner: string;
      ownerId: string;
      pathExcludes: string[];
      pathIncludes: string[];
      prCommentsEnabled: boolean;
      previewBranchExcludes: string[];
      previewBranchIncludes: string[];
      previewDeploymentSetting: "all" | "none" | "custom";
      productionBranch: string;
      productionDeploymentsEnabled: boolean;
      repoId: string;
      repoName: string;
    };
    type: "github" | "gitlab";
  };
  /** List of past stages. */
  stages: unknown[];
  /** The live URL to view this deployment. */
  url: string;
  /** Whether the deployment uses functions. */
  usesFunctions?: boolean | null;
}

export const GetProjectDeploymentResponse = Schema.Struct({
  id: Schema.String,
  aliases: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  buildConfig: Schema.Struct({
    webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
    webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
    buildCaching: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    buildCommand: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    destinationDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      webAnalyticsTag: "web_analytics_tag",
      webAnalyticsToken: "web_analytics_token",
      buildCaching: "build_caching",
      buildCommand: "build_command",
      destinationDir: "destination_dir",
      rootDir: "root_dir",
    }),
  ),
  createdOn: Schema.String,
  deploymentTrigger: Schema.Struct({
    metadata: Schema.Struct({
      branch: Schema.String,
      commitDirty: Schema.Boolean,
      commitHash: Schema.String,
      commitMessage: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        commitDirty: "commit_dirty",
        commitHash: "commit_hash",
        commitMessage: "commit_message",
      }),
    ),
    type: Schema.Literals(["github:push", "ad_hoc", "deploy_hook"]),
  }),
  envVars: Schema.Union([Schema.Struct({}), Schema.Null]),
  environment: Schema.Literals(["preview", "production"]),
  isSkipped: Schema.Boolean,
  latestStage: Schema.Unknown,
  modifiedOn: Schema.String,
  projectId: Schema.String,
  projectName: Schema.String,
  shortId: Schema.String,
  source: Schema.Struct({
    config: Schema.Struct({
      deploymentsEnabled: Schema.Boolean,
      owner: Schema.String,
      ownerId: Schema.String,
      pathExcludes: Schema.Array(Schema.String),
      pathIncludes: Schema.Array(Schema.String),
      prCommentsEnabled: Schema.Boolean,
      previewBranchExcludes: Schema.Array(Schema.String),
      previewBranchIncludes: Schema.Array(Schema.String),
      previewDeploymentSetting: Schema.Literals(["all", "none", "custom"]),
      productionBranch: Schema.String,
      productionDeploymentsEnabled: Schema.Boolean,
      repoId: Schema.String,
      repoName: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        deploymentsEnabled: "deployments_enabled",
        ownerId: "owner_id",
        pathExcludes: "path_excludes",
        pathIncludes: "path_includes",
        prCommentsEnabled: "pr_comments_enabled",
        previewBranchExcludes: "preview_branch_excludes",
        previewBranchIncludes: "preview_branch_includes",
        previewDeploymentSetting: "preview_deployment_setting",
        productionBranch: "production_branch",
        productionDeploymentsEnabled: "production_deployments_enabled",
        repoId: "repo_id",
        repoName: "repo_name",
      }),
    ),
    type: Schema.Literals(["github", "gitlab"]),
  }),
  stages: Schema.Array(Schema.Unknown),
  url: Schema.String,
  usesFunctions: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    buildConfig: "build_config",
    createdOn: "created_on",
    deploymentTrigger: "deployment_trigger",
    envVars: "env_vars",
    isSkipped: "is_skipped",
    latestStage: "latest_stage",
    modifiedOn: "modified_on",
    projectId: "project_id",
    projectName: "project_name",
    shortId: "short_id",
    usesFunctions: "uses_functions",
  }),
) as unknown as Schema.Schema<GetProjectDeploymentResponse>;

export const getProjectDeployment: (
  input: GetProjectDeploymentRequest,
) => Effect.Effect<
  GetProjectDeploymentResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectDeploymentRequest,
  output: GetProjectDeploymentResponse,
  errors: [],
}));

export interface CreateProjectDeploymentRequest {
  projectName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Headers configuration file for the deployment. */
  headers?: File | Blob;
  /** Body param: Redirects configuration file for the deployment. */
  redirects?: File | Blob;
  /** Body param: Routes configuration file defining routing rules. */
  "Routes.json"?: File | Blob;
  /** Body param: Worker bundle file in multipart/form-data format. Mutually exclusive with `_worker.js`. Cannot specify both `_worker.js` and `_worker.bundle` in the same request. Maximum size: 25 MiB. */
  "Worker.bundle"?: File | Blob;
  /** Body param: Worker JavaScript file. Mutually exclusive with `_worker.bundle`. Cannot specify both `_worker.js` and `_worker.bundle` in the same request. */
  "Worker.js"?: File | Blob;
  /** Body param: The branch to build the new deployment from. The `HEAD` of the branch will be used. If omitted, the production branch will be used by default. */
  branch?: string;
  /** Body param: Boolean string indicating if the working directory has uncommitted changes. */
  commitDirty?: true | false;
  /** Body param: Git commit SHA associated with this deployment. */
  commitHash?: string;
  /** Body param: Git commit message associated with this deployment. */
  commitMessage?: string;
  /** Body param: Functions routing configuration file. */
  "functionsFilepathRoutingConfig.json"?: File | Blob;
  /** Body param: JSON string containing a manifest of files to deploy. Maps file paths to their content hashes. Required for direct upload deployments. Maximum 20,000 entries. */
  manifest?: string;
  /** Body param: The build output directory path. */
  pagesBuildOutputDir?: string;
  /** Body param: Hash of the Wrangler configuration file used for this deployment. */
  wranglerConfigHash?: string;
}

export const CreateProjectDeploymentRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  headers: Schema.optional(UploadableSchema.pipe(T.HttpFormDataFile())),
  redirects: Schema.optional(UploadableSchema.pipe(T.HttpFormDataFile())),
  "Routes.json": Schema.optional(UploadableSchema.pipe(T.HttpFormDataFile())),
  "Worker.bundle": Schema.optional(UploadableSchema.pipe(T.HttpFormDataFile())),
  "Worker.js": Schema.optional(UploadableSchema.pipe(T.HttpFormDataFile())),
  branch: Schema.optional(Schema.String),
  commitDirty: Schema.optional(Schema.Literals([true, false])),
  commitHash: Schema.optional(Schema.String),
  commitMessage: Schema.optional(Schema.String),
  "functionsFilepathRoutingConfig.json": Schema.optional(
    UploadableSchema.pipe(T.HttpFormDataFile()),
  ),
  manifest: Schema.optional(Schema.String),
  pagesBuildOutputDir: Schema.optional(Schema.String),
  wranglerConfigHash: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    headers: "_headers",
    redirects: "_redirects",
    "Routes.json": "'_routes.json'",
    "Worker.bundle": "'_worker.bundle'",
    "Worker.js": "'_worker.js'",
    commitDirty: "commit_dirty",
    commitHash: "commit_hash",
    commitMessage: "commit_message",
    "functionsFilepathRoutingConfig.json":
      "'functions-filepath-routing-config.json'",
    pagesBuildOutputDir: "pages_build_output_dir",
    wranglerConfigHash: "wrangler_config_hash",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/pages/projects/{projectName}/deployments",
    contentType: "multipart",
  }),
) as unknown as Schema.Schema<CreateProjectDeploymentRequest>;

export interface CreateProjectDeploymentResponse {
  /** Id of the deployment. */
  id: string;
  /** A list of alias URLs pointing to this deployment. */
  aliases: string[] | null;
  /** Configs for the project build process. */
  buildConfig: {
    webAnalyticsTag: string | null;
    webAnalyticsToken: string | null;
    buildCaching?: boolean | null;
    buildCommand?: string | null;
    destinationDir?: string | null;
    rootDir?: string | null;
  };
  /** When the deployment was created. */
  createdOn: string;
  /** Info about what caused the deployment. */
  deploymentTrigger: {
    metadata: {
      branch: string;
      commitDirty: boolean;
      commitHash: string;
      commitMessage: string;
    };
    type: "github:push" | "ad_hoc" | "deploy_hook";
  };
  /** Environment variables used for builds and Pages Functions. */
  envVars: Record<string, unknown> | null;
  /** Type of deploy. */
  environment: "preview" | "production";
  /** If the deployment has been skipped. */
  isSkipped: boolean;
  /** The status of the deployment. */
  latestStage: unknown;
  /** When the deployment was last modified. */
  modifiedOn: string;
  /** Id of the project. */
  projectId: string;
  /** Name of the project. */
  projectName: string;
  /** Short Id (8 character) of the deployment. */
  shortId: string;
  /** Configs for the project source control. */
  source: {
    config: {
      deploymentsEnabled: boolean;
      owner: string;
      ownerId: string;
      pathExcludes: string[];
      pathIncludes: string[];
      prCommentsEnabled: boolean;
      previewBranchExcludes: string[];
      previewBranchIncludes: string[];
      previewDeploymentSetting: "all" | "none" | "custom";
      productionBranch: string;
      productionDeploymentsEnabled: boolean;
      repoId: string;
      repoName: string;
    };
    type: "github" | "gitlab";
  };
  /** List of past stages. */
  stages: unknown[];
  /** The live URL to view this deployment. */
  url: string;
  /** Whether the deployment uses functions. */
  usesFunctions?: boolean | null;
}

export const CreateProjectDeploymentResponse = Schema.Struct({
  id: Schema.String,
  aliases: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  buildConfig: Schema.Struct({
    webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
    webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
    buildCaching: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    buildCommand: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    destinationDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      webAnalyticsTag: "web_analytics_tag",
      webAnalyticsToken: "web_analytics_token",
      buildCaching: "build_caching",
      buildCommand: "build_command",
      destinationDir: "destination_dir",
      rootDir: "root_dir",
    }),
  ),
  createdOn: Schema.String,
  deploymentTrigger: Schema.Struct({
    metadata: Schema.Struct({
      branch: Schema.String,
      commitDirty: Schema.Boolean,
      commitHash: Schema.String,
      commitMessage: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        commitDirty: "commit_dirty",
        commitHash: "commit_hash",
        commitMessage: "commit_message",
      }),
    ),
    type: Schema.Literals(["github:push", "ad_hoc", "deploy_hook"]),
  }),
  envVars: Schema.Union([Schema.Struct({}), Schema.Null]),
  environment: Schema.Literals(["preview", "production"]),
  isSkipped: Schema.Boolean,
  latestStage: Schema.Unknown,
  modifiedOn: Schema.String,
  projectId: Schema.String,
  projectName: Schema.String,
  shortId: Schema.String,
  source: Schema.Struct({
    config: Schema.Struct({
      deploymentsEnabled: Schema.Boolean,
      owner: Schema.String,
      ownerId: Schema.String,
      pathExcludes: Schema.Array(Schema.String),
      pathIncludes: Schema.Array(Schema.String),
      prCommentsEnabled: Schema.Boolean,
      previewBranchExcludes: Schema.Array(Schema.String),
      previewBranchIncludes: Schema.Array(Schema.String),
      previewDeploymentSetting: Schema.Literals(["all", "none", "custom"]),
      productionBranch: Schema.String,
      productionDeploymentsEnabled: Schema.Boolean,
      repoId: Schema.String,
      repoName: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        deploymentsEnabled: "deployments_enabled",
        ownerId: "owner_id",
        pathExcludes: "path_excludes",
        pathIncludes: "path_includes",
        prCommentsEnabled: "pr_comments_enabled",
        previewBranchExcludes: "preview_branch_excludes",
        previewBranchIncludes: "preview_branch_includes",
        previewDeploymentSetting: "preview_deployment_setting",
        productionBranch: "production_branch",
        productionDeploymentsEnabled: "production_deployments_enabled",
        repoId: "repo_id",
        repoName: "repo_name",
      }),
    ),
    type: Schema.Literals(["github", "gitlab"]),
  }),
  stages: Schema.Array(Schema.Unknown),
  url: Schema.String,
  usesFunctions: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    buildConfig: "build_config",
    createdOn: "created_on",
    deploymentTrigger: "deployment_trigger",
    envVars: "env_vars",
    isSkipped: "is_skipped",
    latestStage: "latest_stage",
    modifiedOn: "modified_on",
    projectId: "project_id",
    projectName: "project_name",
    shortId: "short_id",
    usesFunctions: "uses_functions",
  }),
) as unknown as Schema.Schema<CreateProjectDeploymentResponse>;

export const createProjectDeployment: (
  input: CreateProjectDeploymentRequest,
) => Effect.Effect<
  CreateProjectDeploymentResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectDeploymentRequest,
  output: CreateProjectDeploymentResponse,
  errors: [],
}));

export interface DeleteProjectDeploymentRequest {
  projectName: string;
  deploymentId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteProjectDeploymentRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  deploymentId: Schema.String.pipe(T.HttpPath("deploymentId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/pages/projects/{projectName}/deployments/{deploymentId}",
  }),
) as unknown as Schema.Schema<DeleteProjectDeploymentRequest>;

export type DeleteProjectDeploymentResponse = unknown;

export const DeleteProjectDeploymentResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteProjectDeploymentResponse>;

export const deleteProjectDeployment: (
  input: DeleteProjectDeploymentRequest,
) => Effect.Effect<
  DeleteProjectDeploymentResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectDeploymentRequest,
  output: DeleteProjectDeploymentResponse,
  errors: [],
}));

export interface RetryProjectDeploymentRequest {
  projectName: string;
  deploymentId: string;
  /** Identifier. */
  accountId: string;
}

export const RetryProjectDeploymentRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  deploymentId: Schema.String.pipe(T.HttpPath("deploymentId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/pages/projects/{projectName}/deployments/{deploymentId}/retry",
  }),
) as unknown as Schema.Schema<RetryProjectDeploymentRequest>;

export interface RetryProjectDeploymentResponse {
  /** Id of the deployment. */
  id: string;
  /** A list of alias URLs pointing to this deployment. */
  aliases: string[] | null;
  /** Configs for the project build process. */
  buildConfig: {
    webAnalyticsTag: string | null;
    webAnalyticsToken: string | null;
    buildCaching?: boolean | null;
    buildCommand?: string | null;
    destinationDir?: string | null;
    rootDir?: string | null;
  };
  /** When the deployment was created. */
  createdOn: string;
  /** Info about what caused the deployment. */
  deploymentTrigger: {
    metadata: {
      branch: string;
      commitDirty: boolean;
      commitHash: string;
      commitMessage: string;
    };
    type: "github:push" | "ad_hoc" | "deploy_hook";
  };
  /** Environment variables used for builds and Pages Functions. */
  envVars: Record<string, unknown> | null;
  /** Type of deploy. */
  environment: "preview" | "production";
  /** If the deployment has been skipped. */
  isSkipped: boolean;
  /** The status of the deployment. */
  latestStage: unknown;
  /** When the deployment was last modified. */
  modifiedOn: string;
  /** Id of the project. */
  projectId: string;
  /** Name of the project. */
  projectName: string;
  /** Short Id (8 character) of the deployment. */
  shortId: string;
  /** Configs for the project source control. */
  source: {
    config: {
      deploymentsEnabled: boolean;
      owner: string;
      ownerId: string;
      pathExcludes: string[];
      pathIncludes: string[];
      prCommentsEnabled: boolean;
      previewBranchExcludes: string[];
      previewBranchIncludes: string[];
      previewDeploymentSetting: "all" | "none" | "custom";
      productionBranch: string;
      productionDeploymentsEnabled: boolean;
      repoId: string;
      repoName: string;
    };
    type: "github" | "gitlab";
  };
  /** List of past stages. */
  stages: unknown[];
  /** The live URL to view this deployment. */
  url: string;
  /** Whether the deployment uses functions. */
  usesFunctions?: boolean | null;
}

export const RetryProjectDeploymentResponse = Schema.Struct({
  id: Schema.String,
  aliases: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  buildConfig: Schema.Struct({
    webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
    webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
    buildCaching: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    buildCommand: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    destinationDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      webAnalyticsTag: "web_analytics_tag",
      webAnalyticsToken: "web_analytics_token",
      buildCaching: "build_caching",
      buildCommand: "build_command",
      destinationDir: "destination_dir",
      rootDir: "root_dir",
    }),
  ),
  createdOn: Schema.String,
  deploymentTrigger: Schema.Struct({
    metadata: Schema.Struct({
      branch: Schema.String,
      commitDirty: Schema.Boolean,
      commitHash: Schema.String,
      commitMessage: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        commitDirty: "commit_dirty",
        commitHash: "commit_hash",
        commitMessage: "commit_message",
      }),
    ),
    type: Schema.Literals(["github:push", "ad_hoc", "deploy_hook"]),
  }),
  envVars: Schema.Union([Schema.Struct({}), Schema.Null]),
  environment: Schema.Literals(["preview", "production"]),
  isSkipped: Schema.Boolean,
  latestStage: Schema.Unknown,
  modifiedOn: Schema.String,
  projectId: Schema.String,
  projectName: Schema.String,
  shortId: Schema.String,
  source: Schema.Struct({
    config: Schema.Struct({
      deploymentsEnabled: Schema.Boolean,
      owner: Schema.String,
      ownerId: Schema.String,
      pathExcludes: Schema.Array(Schema.String),
      pathIncludes: Schema.Array(Schema.String),
      prCommentsEnabled: Schema.Boolean,
      previewBranchExcludes: Schema.Array(Schema.String),
      previewBranchIncludes: Schema.Array(Schema.String),
      previewDeploymentSetting: Schema.Literals(["all", "none", "custom"]),
      productionBranch: Schema.String,
      productionDeploymentsEnabled: Schema.Boolean,
      repoId: Schema.String,
      repoName: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        deploymentsEnabled: "deployments_enabled",
        ownerId: "owner_id",
        pathExcludes: "path_excludes",
        pathIncludes: "path_includes",
        prCommentsEnabled: "pr_comments_enabled",
        previewBranchExcludes: "preview_branch_excludes",
        previewBranchIncludes: "preview_branch_includes",
        previewDeploymentSetting: "preview_deployment_setting",
        productionBranch: "production_branch",
        productionDeploymentsEnabled: "production_deployments_enabled",
        repoId: "repo_id",
        repoName: "repo_name",
      }),
    ),
    type: Schema.Literals(["github", "gitlab"]),
  }),
  stages: Schema.Array(Schema.Unknown),
  url: Schema.String,
  usesFunctions: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    buildConfig: "build_config",
    createdOn: "created_on",
    deploymentTrigger: "deployment_trigger",
    envVars: "env_vars",
    isSkipped: "is_skipped",
    latestStage: "latest_stage",
    modifiedOn: "modified_on",
    projectId: "project_id",
    projectName: "project_name",
    shortId: "short_id",
    usesFunctions: "uses_functions",
  }),
) as unknown as Schema.Schema<RetryProjectDeploymentResponse>;

export const retryProjectDeployment: (
  input: RetryProjectDeploymentRequest,
) => Effect.Effect<
  RetryProjectDeploymentResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: RetryProjectDeploymentRequest,
  output: RetryProjectDeploymentResponse,
  errors: [],
}));

export interface RollbackProjectDeploymentRequest {
  projectName: string;
  deploymentId: string;
  /** Identifier. */
  accountId: string;
}

export const RollbackProjectDeploymentRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  deploymentId: Schema.String.pipe(T.HttpPath("deploymentId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/pages/projects/{projectName}/deployments/{deploymentId}/rollback",
  }),
) as unknown as Schema.Schema<RollbackProjectDeploymentRequest>;

export interface RollbackProjectDeploymentResponse {
  /** Id of the deployment. */
  id: string;
  /** A list of alias URLs pointing to this deployment. */
  aliases: string[] | null;
  /** Configs for the project build process. */
  buildConfig: {
    webAnalyticsTag: string | null;
    webAnalyticsToken: string | null;
    buildCaching?: boolean | null;
    buildCommand?: string | null;
    destinationDir?: string | null;
    rootDir?: string | null;
  };
  /** When the deployment was created. */
  createdOn: string;
  /** Info about what caused the deployment. */
  deploymentTrigger: {
    metadata: {
      branch: string;
      commitDirty: boolean;
      commitHash: string;
      commitMessage: string;
    };
    type: "github:push" | "ad_hoc" | "deploy_hook";
  };
  /** Environment variables used for builds and Pages Functions. */
  envVars: Record<string, unknown> | null;
  /** Type of deploy. */
  environment: "preview" | "production";
  /** If the deployment has been skipped. */
  isSkipped: boolean;
  /** The status of the deployment. */
  latestStage: unknown;
  /** When the deployment was last modified. */
  modifiedOn: string;
  /** Id of the project. */
  projectId: string;
  /** Name of the project. */
  projectName: string;
  /** Short Id (8 character) of the deployment. */
  shortId: string;
  /** Configs for the project source control. */
  source: {
    config: {
      deploymentsEnabled: boolean;
      owner: string;
      ownerId: string;
      pathExcludes: string[];
      pathIncludes: string[];
      prCommentsEnabled: boolean;
      previewBranchExcludes: string[];
      previewBranchIncludes: string[];
      previewDeploymentSetting: "all" | "none" | "custom";
      productionBranch: string;
      productionDeploymentsEnabled: boolean;
      repoId: string;
      repoName: string;
    };
    type: "github" | "gitlab";
  };
  /** List of past stages. */
  stages: unknown[];
  /** The live URL to view this deployment. */
  url: string;
  /** Whether the deployment uses functions. */
  usesFunctions?: boolean | null;
}

export const RollbackProjectDeploymentResponse = Schema.Struct({
  id: Schema.String,
  aliases: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  buildConfig: Schema.Struct({
    webAnalyticsTag: Schema.Union([Schema.String, Schema.Null]),
    webAnalyticsToken: Schema.Union([Schema.String, Schema.Null]),
    buildCaching: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    buildCommand: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    destinationDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    rootDir: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      webAnalyticsTag: "web_analytics_tag",
      webAnalyticsToken: "web_analytics_token",
      buildCaching: "build_caching",
      buildCommand: "build_command",
      destinationDir: "destination_dir",
      rootDir: "root_dir",
    }),
  ),
  createdOn: Schema.String,
  deploymentTrigger: Schema.Struct({
    metadata: Schema.Struct({
      branch: Schema.String,
      commitDirty: Schema.Boolean,
      commitHash: Schema.String,
      commitMessage: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        commitDirty: "commit_dirty",
        commitHash: "commit_hash",
        commitMessage: "commit_message",
      }),
    ),
    type: Schema.Literals(["github:push", "ad_hoc", "deploy_hook"]),
  }),
  envVars: Schema.Union([Schema.Struct({}), Schema.Null]),
  environment: Schema.Literals(["preview", "production"]),
  isSkipped: Schema.Boolean,
  latestStage: Schema.Unknown,
  modifiedOn: Schema.String,
  projectId: Schema.String,
  projectName: Schema.String,
  shortId: Schema.String,
  source: Schema.Struct({
    config: Schema.Struct({
      deploymentsEnabled: Schema.Boolean,
      owner: Schema.String,
      ownerId: Schema.String,
      pathExcludes: Schema.Array(Schema.String),
      pathIncludes: Schema.Array(Schema.String),
      prCommentsEnabled: Schema.Boolean,
      previewBranchExcludes: Schema.Array(Schema.String),
      previewBranchIncludes: Schema.Array(Schema.String),
      previewDeploymentSetting: Schema.Literals(["all", "none", "custom"]),
      productionBranch: Schema.String,
      productionDeploymentsEnabled: Schema.Boolean,
      repoId: Schema.String,
      repoName: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        deploymentsEnabled: "deployments_enabled",
        ownerId: "owner_id",
        pathExcludes: "path_excludes",
        pathIncludes: "path_includes",
        prCommentsEnabled: "pr_comments_enabled",
        previewBranchExcludes: "preview_branch_excludes",
        previewBranchIncludes: "preview_branch_includes",
        previewDeploymentSetting: "preview_deployment_setting",
        productionBranch: "production_branch",
        productionDeploymentsEnabled: "production_deployments_enabled",
        repoId: "repo_id",
        repoName: "repo_name",
      }),
    ),
    type: Schema.Literals(["github", "gitlab"]),
  }),
  stages: Schema.Array(Schema.Unknown),
  url: Schema.String,
  usesFunctions: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    buildConfig: "build_config",
    createdOn: "created_on",
    deploymentTrigger: "deployment_trigger",
    envVars: "env_vars",
    isSkipped: "is_skipped",
    latestStage: "latest_stage",
    modifiedOn: "modified_on",
    projectId: "project_id",
    projectName: "project_name",
    shortId: "short_id",
    usesFunctions: "uses_functions",
  }),
) as unknown as Schema.Schema<RollbackProjectDeploymentResponse>;

export const rollbackProjectDeployment: (
  input: RollbackProjectDeploymentRequest,
) => Effect.Effect<
  RollbackProjectDeploymentResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: RollbackProjectDeploymentRequest,
  output: RollbackProjectDeploymentResponse,
  errors: [],
}));

// =============================================================================
// ProjectDeploymentHistoryLog
// =============================================================================

export interface GetProjectDeploymentHistoryLogRequest {
  projectName: string;
  deploymentId: string;
  /** Identifier. */
  accountId: string;
}

export const GetProjectDeploymentHistoryLogRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  deploymentId: Schema.String.pipe(T.HttpPath("deploymentId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pages/projects/{projectName}/deployments/{deploymentId}/history/logs",
  }),
) as unknown as Schema.Schema<GetProjectDeploymentHistoryLogRequest>;

export interface GetProjectDeploymentHistoryLogResponse {
  data: { line: string; ts: string }[];
  includesContainerLogs: boolean;
  total: number;
}

export const GetProjectDeploymentHistoryLogResponse = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      line: Schema.String,
      ts: Schema.String,
    }),
  ),
  includesContainerLogs: Schema.Boolean,
  total: Schema.Number,
}).pipe(
  Schema.encodeKeys({ includesContainerLogs: "includes_container_logs" }),
) as unknown as Schema.Schema<GetProjectDeploymentHistoryLogResponse>;

export const getProjectDeploymentHistoryLog: (
  input: GetProjectDeploymentHistoryLogRequest,
) => Effect.Effect<
  GetProjectDeploymentHistoryLogResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectDeploymentHistoryLogRequest,
  output: GetProjectDeploymentHistoryLogResponse,
  errors: [],
}));

// =============================================================================
// ProjectDomain
// =============================================================================

export interface GetProjectDomainRequest {
  projectName: string;
  domainName: string;
  /** Identifier. */
  accountId: string;
}

export const GetProjectDomainRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  domainName: Schema.String.pipe(T.HttpPath("domainName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/pages/projects/{projectName}/domains/{domainName}",
  }),
) as unknown as Schema.Schema<GetProjectDomainRequest>;

export interface GetProjectDomainResponse {
  id: string;
  certificateAuthority: "google" | "lets_encrypt";
  createdOn: string;
  domainId: string;
  /** The domain name. */
  name: string;
  status:
    | "initializing"
    | "pending"
    | "active"
    | "deactivated"
    | "blocked"
    | "error";
  validationData: {
    method: "http" | "txt";
    status: "initializing" | "pending" | "active" | "deactivated" | "error";
    errorMessage?: string;
    txtName?: string;
    txtValue?: string;
  };
  verificationData: {
    status: "pending" | "active" | "deactivated" | "blocked" | "error";
    errorMessage?: string;
  };
  zoneTag: string;
}

export const GetProjectDomainResponse = Schema.Struct({
  id: Schema.String,
  certificateAuthority: Schema.Literals(["google", "lets_encrypt"]),
  createdOn: Schema.String,
  domainId: Schema.String,
  name: Schema.String,
  status: Schema.Literals([
    "initializing",
    "pending",
    "active",
    "deactivated",
    "blocked",
    "error",
  ]),
  validationData: Schema.Struct({
    method: Schema.Literals(["http", "txt"]),
    status: Schema.Literals([
      "initializing",
      "pending",
      "active",
      "deactivated",
      "error",
    ]),
    errorMessage: Schema.optional(Schema.String),
    txtName: Schema.optional(Schema.String),
    txtValue: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      errorMessage: "error_message",
      txtName: "txt_name",
      txtValue: "txt_value",
    }),
  ),
  verificationData: Schema.Struct({
    status: Schema.Literals([
      "pending",
      "active",
      "deactivated",
      "blocked",
      "error",
    ]),
    errorMessage: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ errorMessage: "error_message" })),
  zoneTag: Schema.String,
}).pipe(
  Schema.encodeKeys({
    certificateAuthority: "certificate_authority",
    createdOn: "created_on",
    domainId: "domain_id",
    validationData: "validation_data",
    verificationData: "verification_data",
    zoneTag: "zone_tag",
  }),
) as unknown as Schema.Schema<GetProjectDomainResponse>;

export const getProjectDomain: (
  input: GetProjectDomainRequest,
) => Effect.Effect<
  GetProjectDomainResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectDomainRequest,
  output: GetProjectDomainResponse,
  errors: [],
}));

export interface CreateProjectDomainRequest {
  projectName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The domain name. */
  name: string;
}

export const CreateProjectDomainRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/pages/projects/{projectName}/domains",
  }),
) as unknown as Schema.Schema<CreateProjectDomainRequest>;

export interface CreateProjectDomainResponse {
  id: string;
  certificateAuthority: "google" | "lets_encrypt";
  createdOn: string;
  domainId: string;
  /** The domain name. */
  name: string;
  status:
    | "initializing"
    | "pending"
    | "active"
    | "deactivated"
    | "blocked"
    | "error";
  validationData: {
    method: "http" | "txt";
    status: "initializing" | "pending" | "active" | "deactivated" | "error";
    errorMessage?: string;
    txtName?: string;
    txtValue?: string;
  };
  verificationData: {
    status: "pending" | "active" | "deactivated" | "blocked" | "error";
    errorMessage?: string;
  };
  zoneTag: string;
}

export const CreateProjectDomainResponse = Schema.Struct({
  id: Schema.String,
  certificateAuthority: Schema.Literals(["google", "lets_encrypt"]),
  createdOn: Schema.String,
  domainId: Schema.String,
  name: Schema.String,
  status: Schema.Literals([
    "initializing",
    "pending",
    "active",
    "deactivated",
    "blocked",
    "error",
  ]),
  validationData: Schema.Struct({
    method: Schema.Literals(["http", "txt"]),
    status: Schema.Literals([
      "initializing",
      "pending",
      "active",
      "deactivated",
      "error",
    ]),
    errorMessage: Schema.optional(Schema.String),
    txtName: Schema.optional(Schema.String),
    txtValue: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      errorMessage: "error_message",
      txtName: "txt_name",
      txtValue: "txt_value",
    }),
  ),
  verificationData: Schema.Struct({
    status: Schema.Literals([
      "pending",
      "active",
      "deactivated",
      "blocked",
      "error",
    ]),
    errorMessage: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ errorMessage: "error_message" })),
  zoneTag: Schema.String,
}).pipe(
  Schema.encodeKeys({
    certificateAuthority: "certificate_authority",
    createdOn: "created_on",
    domainId: "domain_id",
    validationData: "validation_data",
    verificationData: "verification_data",
    zoneTag: "zone_tag",
  }),
) as unknown as Schema.Schema<CreateProjectDomainResponse>;

export const createProjectDomain: (
  input: CreateProjectDomainRequest,
) => Effect.Effect<
  CreateProjectDomainResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectDomainRequest,
  output: CreateProjectDomainResponse,
  errors: [],
}));

export interface PatchProjectDomainRequest {
  projectName: string;
  domainName: string;
  /** Identifier. */
  accountId: string;
}

export const PatchProjectDomainRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  domainName: Schema.String.pipe(T.HttpPath("domainName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/pages/projects/{projectName}/domains/{domainName}",
  }),
) as unknown as Schema.Schema<PatchProjectDomainRequest>;

export interface PatchProjectDomainResponse {
  id: string;
  certificateAuthority: "google" | "lets_encrypt";
  createdOn: string;
  domainId: string;
  /** The domain name. */
  name: string;
  status:
    | "initializing"
    | "pending"
    | "active"
    | "deactivated"
    | "blocked"
    | "error";
  validationData: {
    method: "http" | "txt";
    status: "initializing" | "pending" | "active" | "deactivated" | "error";
    errorMessage?: string;
    txtName?: string;
    txtValue?: string;
  };
  verificationData: {
    status: "pending" | "active" | "deactivated" | "blocked" | "error";
    errorMessage?: string;
  };
  zoneTag: string;
}

export const PatchProjectDomainResponse = Schema.Struct({
  id: Schema.String,
  certificateAuthority: Schema.Literals(["google", "lets_encrypt"]),
  createdOn: Schema.String,
  domainId: Schema.String,
  name: Schema.String,
  status: Schema.Literals([
    "initializing",
    "pending",
    "active",
    "deactivated",
    "blocked",
    "error",
  ]),
  validationData: Schema.Struct({
    method: Schema.Literals(["http", "txt"]),
    status: Schema.Literals([
      "initializing",
      "pending",
      "active",
      "deactivated",
      "error",
    ]),
    errorMessage: Schema.optional(Schema.String),
    txtName: Schema.optional(Schema.String),
    txtValue: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      errorMessage: "error_message",
      txtName: "txt_name",
      txtValue: "txt_value",
    }),
  ),
  verificationData: Schema.Struct({
    status: Schema.Literals([
      "pending",
      "active",
      "deactivated",
      "blocked",
      "error",
    ]),
    errorMessage: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ errorMessage: "error_message" })),
  zoneTag: Schema.String,
}).pipe(
  Schema.encodeKeys({
    certificateAuthority: "certificate_authority",
    createdOn: "created_on",
    domainId: "domain_id",
    validationData: "validation_data",
    verificationData: "verification_data",
    zoneTag: "zone_tag",
  }),
) as unknown as Schema.Schema<PatchProjectDomainResponse>;

export const patchProjectDomain: (
  input: PatchProjectDomainRequest,
) => Effect.Effect<
  PatchProjectDomainResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectDomainRequest,
  output: PatchProjectDomainResponse,
  errors: [],
}));

export interface DeleteProjectDomainRequest {
  projectName: string;
  domainName: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteProjectDomainRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  domainName: Schema.String.pipe(T.HttpPath("domainName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/pages/projects/{projectName}/domains/{domainName}",
  }),
) as unknown as Schema.Schema<DeleteProjectDomainRequest>;

export type DeleteProjectDomainResponse = unknown;

export const DeleteProjectDomainResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteProjectDomainResponse>;

export const deleteProjectDomain: (
  input: DeleteProjectDomainRequest,
) => Effect.Effect<
  DeleteProjectDomainResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectDomainRequest,
  output: DeleteProjectDomainResponse,
  errors: [],
}));
