/**
 * Cloudflare WORKERS-FOR-PLATFORMS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service workers-for-platforms
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
// DispatchNamespace
// =============================================================================

export interface GetDispatchNamespaceRequest {
  dispatchNamespace: string;
  /** Identifier. */
  accountId: string;
}

export const GetDispatchNamespaceRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}",
  }),
) as unknown as Schema.Schema<GetDispatchNamespaceRequest>;

export interface GetDispatchNamespaceResponse {
  /** Identifier. */
  createdBy?: string;
  /** When the script was created. */
  createdOn?: string;
  /** Identifier. */
  modifiedBy?: string;
  /** When the script was last modified. */
  modifiedOn?: string;
  /** API Resource UUID tag. */
  namespaceId?: string;
  /** Name of the Workers for Platforms dispatch namespace. */
  namespaceName?: string;
  /** The current number of scripts in this Dispatch Namespace. */
  scriptCount?: number;
  /** Whether the Workers in the namespace are executed in a "trusted" manner. When a Worker is trusted, it has access to the shared caches for the zone in the Cache API, and has access to the `request.cf`  */
  trustedWorkers?: boolean;
}

export const GetDispatchNamespaceResponse = Schema.Struct({
  createdBy: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  modifiedBy: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  namespaceId: Schema.optional(Schema.String),
  namespaceName: Schema.optional(Schema.String),
  scriptCount: Schema.optional(Schema.Number),
  trustedWorkers: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    createdBy: "created_by",
    createdOn: "created_on",
    modifiedBy: "modified_by",
    modifiedOn: "modified_on",
    namespaceId: "namespace_id",
    namespaceName: "namespace_name",
    scriptCount: "script_count",
    trustedWorkers: "trusted_workers",
  }),
) as unknown as Schema.Schema<GetDispatchNamespaceResponse>;

export const getDispatchNamespace: API.OperationMethod<
  GetDispatchNamespaceRequest,
  GetDispatchNamespaceResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDispatchNamespaceRequest,
  output: GetDispatchNamespaceResponse,
  errors: [],
}));

export interface ListDispatchNamespacesRequest {
  /** Identifier. */
  accountId: string;
}

export const ListDispatchNamespacesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/dispatch/namespaces",
  }),
) as unknown as Schema.Schema<ListDispatchNamespacesRequest>;

export type ListDispatchNamespacesResponse = {
  createdBy?: string;
  createdOn?: string;
  modifiedBy?: string;
  modifiedOn?: string;
  namespaceId?: string;
  namespaceName?: string;
  scriptCount?: number;
  trustedWorkers?: boolean;
}[];

export const ListDispatchNamespacesResponse = Schema.Array(
  Schema.Struct({
    createdBy: Schema.optional(Schema.String),
    createdOn: Schema.optional(Schema.String),
    modifiedBy: Schema.optional(Schema.String),
    modifiedOn: Schema.optional(Schema.String),
    namespaceId: Schema.optional(Schema.String),
    namespaceName: Schema.optional(Schema.String),
    scriptCount: Schema.optional(Schema.Number),
    trustedWorkers: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({
      createdBy: "created_by",
      createdOn: "created_on",
      modifiedBy: "modified_by",
      modifiedOn: "modified_on",
      namespaceId: "namespace_id",
      namespaceName: "namespace_name",
      scriptCount: "script_count",
      trustedWorkers: "trusted_workers",
    }),
  ),
) as unknown as Schema.Schema<ListDispatchNamespacesResponse>;

export const listDispatchNamespaces: API.OperationMethod<
  ListDispatchNamespacesRequest,
  ListDispatchNamespacesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDispatchNamespacesRequest,
  output: ListDispatchNamespacesResponse,
  errors: [],
}));

export interface CreateDispatchNamespaceRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The name of the dispatch namespace. */
  name?: string;
}

export const CreateDispatchNamespaceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/workers/dispatch/namespaces",
  }),
) as unknown as Schema.Schema<CreateDispatchNamespaceRequest>;

export interface CreateDispatchNamespaceResponse {
  /** Identifier. */
  createdBy?: string;
  /** When the script was created. */
  createdOn?: string;
  /** Identifier. */
  modifiedBy?: string;
  /** When the script was last modified. */
  modifiedOn?: string;
  /** API Resource UUID tag. */
  namespaceId?: string;
  /** Name of the Workers for Platforms dispatch namespace. */
  namespaceName?: string;
  /** The current number of scripts in this Dispatch Namespace. */
  scriptCount?: number;
  /** Whether the Workers in the namespace are executed in a "trusted" manner. When a Worker is trusted, it has access to the shared caches for the zone in the Cache API, and has access to the `request.cf`  */
  trustedWorkers?: boolean;
}

export const CreateDispatchNamespaceResponse = Schema.Struct({
  createdBy: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  modifiedBy: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  namespaceId: Schema.optional(Schema.String),
  namespaceName: Schema.optional(Schema.String),
  scriptCount: Schema.optional(Schema.Number),
  trustedWorkers: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    createdBy: "created_by",
    createdOn: "created_on",
    modifiedBy: "modified_by",
    modifiedOn: "modified_on",
    namespaceId: "namespace_id",
    namespaceName: "namespace_name",
    scriptCount: "script_count",
    trustedWorkers: "trusted_workers",
  }),
) as unknown as Schema.Schema<CreateDispatchNamespaceResponse>;

export const createDispatchNamespace: API.OperationMethod<
  CreateDispatchNamespaceRequest,
  CreateDispatchNamespaceResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDispatchNamespaceRequest,
  output: CreateDispatchNamespaceResponse,
  errors: [],
}));

export interface DeleteDispatchNamespaceRequest {
  dispatchNamespace: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteDispatchNamespaceRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}",
  }),
) as unknown as Schema.Schema<DeleteDispatchNamespaceRequest>;

export type DeleteDispatchNamespaceResponse = unknown;

export const DeleteDispatchNamespaceResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteDispatchNamespaceResponse>;

export const deleteDispatchNamespace: API.OperationMethod<
  DeleteDispatchNamespaceRequest,
  DeleteDispatchNamespaceResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDispatchNamespaceRequest,
  output: DeleteDispatchNamespaceResponse,
  errors: [],
}));

// =============================================================================
// DispatchNamespaceScript
// =============================================================================

export interface GetDispatchNamespaceScriptRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const GetDispatchNamespaceScriptRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}",
  }),
) as unknown as Schema.Schema<GetDispatchNamespaceScriptRequest>;

export interface GetDispatchNamespaceScriptResponse {
  /** When the script was created. */
  createdOn?: string;
  /** Name of the Workers for Platforms dispatch namespace. */
  dispatchNamespace?: string;
  /** When the script was last modified. */
  modifiedOn?: string;
  script?: unknown;
}

export const GetDispatchNamespaceScriptResponse = Schema.Struct({
  createdOn: Schema.optional(Schema.String),
  dispatchNamespace: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  script: Schema.optional(Schema.Unknown),
}).pipe(
  Schema.encodeKeys({
    createdOn: "created_on",
    dispatchNamespace: "dispatch_namespace",
    modifiedOn: "modified_on",
    script: "script",
  }),
) as unknown as Schema.Schema<GetDispatchNamespaceScriptResponse>;

export const getDispatchNamespaceScript: API.OperationMethod<
  GetDispatchNamespaceScriptRequest,
  GetDispatchNamespaceScriptResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDispatchNamespaceScriptRequest,
  output: GetDispatchNamespaceScriptResponse,
  errors: [],
}));

export interface PutDispatchNamespaceScriptRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: JSON-encoded metadata about the uploaded parts and Worker configuration. */
  metadata: {
    assets?: {
      config?: {
        headers?: string;
        redirects?: string;
        htmlHandling?:
          | "auto-trailing-slash"
          | "force-trailing-slash"
          | "drop-trailing-slash"
          | "none";
        notFoundHandling?: "none" | "404-page" | "single-page-application";
        runWorkerFirst?: string[] | boolean;
        serveDirectly?: boolean;
      };
      jwt?: string;
    };
    bindings?: (
      | { name: string; type: "ai" }
      | { dataset: string; name: string; type: "analytics_engine" }
      | { name: string; type: "assets" }
      | { name: string; type: "browser" }
      | { id: string; name: string; type: "d1" }
      | { name: string; part: string; type: "data_blob" }
      | {
          name: string;
          namespace: string;
          type: "dispatch_namespace";
          outbound?: {
            params?: string[];
            worker?: { environment?: string; service?: string };
          };
        }
      | {
          name: string;
          type: "durable_object_namespace";
          className?: string;
          environment?: string;
          namespaceId?: string;
          scriptName?: string;
        }
      | { id: string; name: string; type: "hyperdrive" }
      | { name: string; type: "inherit"; oldName?: string; versionId?: string }
      | { name: string; type: "images" }
      | { json: string; name: string; type: "json" }
      | { name: string; namespaceId: string; type: "kv_namespace" }
      | { certificateId: string; name: string; type: "mtls_certificate" }
      | { name: string; text: string; type: "plain_text" }
      | { name: string; pipeline: string; type: "pipelines" }
      | { name: string; queueName: string; type: "queue" }
      | {
          bucketName: string;
          name: string;
          type: "r2_bucket";
          jurisdiction?: "eu" | "fedramp";
        }
      | { name: string; text: string; type: "secret_text" }
      | {
          name: string;
          type: "send_email";
          allowedDestinationAddresses?: string[];
          allowedSenderAddresses?: string[];
          destinationAddress?: string;
        }
      | { name: string; service: string; type: "service"; environment?: string }
      | { name: string; part: string; type: "text_blob" }
      | { indexName: string; name: string; type: "vectorize" }
      | { name: string; type: "version_metadata" }
      | {
          name: string;
          secretName: string;
          storeId: string;
          type: "secrets_store_secret";
        }
      | {
          algorithm: unknown;
          format: "raw" | "pkcs8" | "spki" | "jwk";
          name: string;
          type: "secret_key";
          usages: (
            | "encrypt"
            | "decrypt"
            | "sign"
            | "verify"
            | "deriveKey"
            | "deriveBits"
            | "wrapKey"
            | "unwrapKey"
          )[];
          keyBase64?: string;
          keyJwk?: unknown;
        }
      | {
          name: string;
          type: "workflow";
          workflowName: string;
          className?: string;
          scriptName?: string;
        }
      | { name: string; part: string; type: "wasm_module" }
    )[];
    bodyPart?: string;
    compatibilityDate?: string;
    compatibilityFlags?: string[];
    keepAssets?: boolean;
    keepBindings?: string[];
    limits?: { cpuMs?: number };
    logpush?: boolean;
    mainModule?: string;
    migrations?:
      | unknown
      | { newTag?: string; oldTag?: string; steps?: unknown[] };
    observability?: {
      enabled: boolean;
      headSamplingRate?: number | null;
      logs?: {
        enabled: boolean;
        invocationLogs: boolean;
        destinations?: string[];
        headSamplingRate?: number | null;
        persist?: boolean;
      } | null;
    };
    placement?:
      | { mode: "smart" }
      | { region: string }
      | { hostname: string }
      | { host: string };
    tags?: string[];
    tailConsumers?: unknown[] | null;
    usageModel?: "standard" | "bundled" | "unbound";
  };
  /** Body param: An array of modules (often JavaScript files) comprising a Worker script. At least one module must be present and referenced in the metadata as `main_module` or `body_part` by filename.<br/ */
  files?: (File | Blob)[];
}

export const PutDispatchNamespaceScriptRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  metadata: Schema.Struct({
    assets: Schema.optional(
      Schema.Struct({
        config: Schema.optional(
          Schema.Struct({
            headers: Schema.optional(Schema.String),
            redirects: Schema.optional(Schema.String),
            htmlHandling: Schema.optional(
              Schema.Literals([
                "auto-trailing-slash",
                "force-trailing-slash",
                "drop-trailing-slash",
                "none",
              ]),
            ),
            notFoundHandling: Schema.optional(
              Schema.Literals(["none", "404-page", "single-page-application"]),
            ),
            runWorkerFirst: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Boolean]),
            ),
            serveDirectly: Schema.optional(Schema.Boolean),
          }).pipe(
            Schema.encodeKeys({
              headers: "_headers",
              redirects: "_redirects",
              htmlHandling: "html_handling",
              notFoundHandling: "not_found_handling",
              runWorkerFirst: "run_worker_first",
              serveDirectly: "serve_directly",
            }),
          ),
        ),
        jwt: Schema.optional(Schema.String),
      }),
    ),
    bindings: Schema.optional(
      Schema.Array(
        Schema.Union([
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("ai"),
          }),
          Schema.Struct({
            dataset: Schema.String,
            name: Schema.String,
            type: Schema.Literal("analytics_engine"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("assets"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("browser"),
          }),
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
            type: Schema.Literal("d1"),
          }),
          Schema.Struct({
            name: Schema.String,
            part: Schema.String,
            type: Schema.Literal("data_blob"),
          }),
          Schema.Struct({
            name: Schema.String,
            namespace: Schema.String,
            type: Schema.Literal("dispatch_namespace"),
            outbound: Schema.optional(
              Schema.Struct({
                params: Schema.optional(Schema.Array(Schema.String)),
                worker: Schema.optional(
                  Schema.Struct({
                    environment: Schema.optional(Schema.String),
                    service: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("durable_object_namespace"),
            className: Schema.optional(Schema.String),
            environment: Schema.optional(Schema.String),
            namespaceId: Schema.optional(Schema.String),
            scriptName: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              className: "class_name",
              environment: "environment",
              namespaceId: "namespace_id",
              scriptName: "script_name",
            }),
          ),
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
            type: Schema.Literal("hyperdrive"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("inherit"),
            oldName: Schema.optional(Schema.String),
            versionId: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              oldName: "old_name",
              versionId: "version_id",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("images"),
          }),
          Schema.Struct({
            json: Schema.String,
            name: Schema.String,
            type: Schema.Literal("json"),
          }),
          Schema.Struct({
            name: Schema.String,
            namespaceId: Schema.String,
            type: Schema.Literal("kv_namespace"),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              namespaceId: "namespace_id",
              type: "type",
            }),
          ),
          Schema.Struct({
            certificateId: Schema.String,
            name: Schema.String,
            type: Schema.Literal("mtls_certificate"),
          }).pipe(
            Schema.encodeKeys({
              certificateId: "certificate_id",
              name: "name",
              type: "type",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            text: Schema.String,
            type: Schema.Literal("plain_text"),
          }),
          Schema.Struct({
            name: Schema.String,
            pipeline: Schema.String,
            type: Schema.Literal("pipelines"),
          }),
          Schema.Struct({
            name: Schema.String,
            queueName: Schema.String,
            type: Schema.Literal("queue"),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              queueName: "queue_name",
              type: "type",
            }),
          ),
          Schema.Struct({
            bucketName: Schema.String,
            name: Schema.String,
            type: Schema.Literal("r2_bucket"),
            jurisdiction: Schema.optional(Schema.Literals(["eu", "fedramp"])),
          }).pipe(
            Schema.encodeKeys({
              bucketName: "bucket_name",
              name: "name",
              type: "type",
              jurisdiction: "jurisdiction",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            text: Schema.String,
            type: Schema.Literal("secret_text"),
          }),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("send_email"),
            allowedDestinationAddresses: Schema.optional(
              Schema.Array(Schema.String),
            ),
            allowedSenderAddresses: Schema.optional(
              Schema.Array(Schema.String),
            ),
            destinationAddress: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              allowedDestinationAddresses: "allowed_destination_addresses",
              allowedSenderAddresses: "allowed_sender_addresses",
              destinationAddress: "destination_address",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            service: Schema.String,
            type: Schema.Literal("service"),
            environment: Schema.optional(Schema.String),
          }),
          Schema.Struct({
            name: Schema.String,
            part: Schema.String,
            type: Schema.Literal("text_blob"),
          }),
          Schema.Struct({
            indexName: Schema.String,
            name: Schema.String,
            type: Schema.Literal("vectorize"),
          }).pipe(
            Schema.encodeKeys({
              indexName: "index_name",
              name: "name",
              type: "type",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("version_metadata"),
          }),
          Schema.Struct({
            name: Schema.String,
            secretName: Schema.String,
            storeId: Schema.String,
            type: Schema.Literal("secrets_store_secret"),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              secretName: "secret_name",
              storeId: "store_id",
              type: "type",
            }),
          ),
          Schema.Struct({
            algorithm: Schema.Unknown,
            format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
            name: Schema.String,
            type: Schema.Literal("secret_key"),
            usages: Schema.Array(
              Schema.Literals([
                "encrypt",
                "decrypt",
                "sign",
                "verify",
                "deriveKey",
                "deriveBits",
                "wrapKey",
                "unwrapKey",
              ]),
            ),
            keyBase64: Schema.optional(Schema.String),
            keyJwk: Schema.optional(Schema.Unknown),
          }).pipe(
            Schema.encodeKeys({
              algorithm: "algorithm",
              format: "format",
              name: "name",
              type: "type",
              usages: "usages",
              keyBase64: "key_base64",
              keyJwk: "key_jwk",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            type: Schema.Literal("workflow"),
            workflowName: Schema.String,
            className: Schema.optional(Schema.String),
            scriptName: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              name: "name",
              type: "type",
              workflowName: "workflow_name",
              className: "class_name",
              scriptName: "script_name",
            }),
          ),
          Schema.Struct({
            name: Schema.String,
            part: Schema.String,
            type: Schema.Literal("wasm_module"),
          }),
        ]),
      ),
    ),
    bodyPart: Schema.optional(Schema.String),
    compatibilityDate: Schema.optional(Schema.String),
    compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
    keepAssets: Schema.optional(Schema.Boolean),
    keepBindings: Schema.optional(Schema.Array(Schema.String)),
    limits: Schema.optional(
      Schema.Struct({
        cpuMs: Schema.optional(Schema.Number),
      }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
    ),
    logpush: Schema.optional(Schema.Boolean),
    mainModule: Schema.optional(Schema.String),
    migrations: Schema.optional(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          newTag: Schema.optional(Schema.String),
          oldTag: Schema.optional(Schema.String),
          steps: Schema.optional(Schema.Array(Schema.Unknown)),
        }).pipe(
          Schema.encodeKeys({
            newTag: "new_tag",
            oldTag: "old_tag",
            steps: "steps",
          }),
        ),
      ]),
    ),
    observability: Schema.optional(
      Schema.Struct({
        enabled: Schema.Boolean,
        headSamplingRate: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        logs: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
              invocationLogs: Schema.Boolean,
              destinations: Schema.optional(Schema.Array(Schema.String)),
              headSamplingRate: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              persist: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                enabled: "enabled",
                invocationLogs: "invocation_logs",
                destinations: "destinations",
                headSamplingRate: "head_sampling_rate",
                persist: "persist",
              }),
            ),
            Schema.Null,
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          enabled: "enabled",
          headSamplingRate: "head_sampling_rate",
          logs: "logs",
        }),
      ),
    ),
    placement: Schema.optional(
      Schema.Union([
        Schema.Struct({
          mode: Schema.Literal("smart"),
        }),
        Schema.Struct({
          region: Schema.String,
        }),
        Schema.Struct({
          hostname: Schema.String,
        }),
        Schema.Struct({
          host: Schema.String,
        }),
      ]),
    ),
    tags: Schema.optional(Schema.Array(Schema.String)),
    tailConsumers: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
    usageModel: Schema.optional(
      Schema.Literals(["standard", "bundled", "unbound"]),
    ),
  }).pipe(
    Schema.encodeKeys({
      assets: "assets",
      bindings: "bindings",
      bodyPart: "body_part",
      compatibilityDate: "compatibility_date",
      compatibilityFlags: "compatibility_flags",
      keepAssets: "keep_assets",
      keepBindings: "keep_bindings",
      limits: "limits",
      logpush: "logpush",
      mainModule: "main_module",
      migrations: "migrations",
      observability: "observability",
      placement: "placement",
      tags: "tags",
      tailConsumers: "tail_consumers",
      usageModel: "usage_model",
    }),
  ),
  files: Schema.optional(
    Schema.Array(UploadableSchema.pipe(T.HttpFormDataFile())),
  ),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}",
    contentType: "multipart",
  }),
) as unknown as Schema.Schema<PutDispatchNamespaceScriptRequest>;

export interface PutDispatchNamespaceScriptResponse {
  startupTimeMs: number;
  /** The name used to identify the script. */
  id?: string;
  /** Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker. */
  compatibilityDate?: string;
  /** Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`. */
  compatibilityFlags?: string[];
  /** When the script was created. */
  createdOn?: string;
  /** The entry point for the script. */
  entryPoint?: string;
  /** Hashed script content, can be used in a If-None-Match header when updating. */
  etag?: string;
  /** The names of handlers exported as part of the default export. */
  handlers?: string[];
  /** Whether a Worker contains assets. */
  hasAssets?: boolean;
  /** Whether a Worker contains modules. */
  hasModules?: boolean;
  /** The client most recently used to deploy this Worker. */
  lastDeployedFrom?: string;
  /** Whether Logpush is turned on for the Worker. */
  logpush?: boolean;
  /** The tag of the Durable Object migration that was most recently applied for this Worker. */
  migrationTag?: string;
  /** When the script was last modified. */
  modifiedOn?: string;
  /** Named exports, such as Durable Object class implementations and named entrypoints. */
  namedHandlers?: { handlers?: string[]; name?: string }[];
  /** Observability settings for the Worker. */
  observability?: {
    enabled: boolean;
    headSamplingRate?: number | null;
    logs?: {
      enabled: boolean;
      invocationLogs: boolean;
      destinations?: string[];
      headSamplingRate?: number | null;
      persist?: boolean;
    } | null;
  };
  /** Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify either mode for Smart Placement, or one of region/hostname/host for targeted place */
  placement?:
    | {
        mode: "smart";
        lastAnalyzedAt?: string;
        status?:
          | "SUCCESS"
          | "UNSUPPORTED_APPLICATION"
          | "INSUFFICIENT_INVOCATIONS";
      }
    | {
        region: string;
        lastAnalyzedAt?: string;
        status?:
          | "SUCCESS"
          | "UNSUPPORTED_APPLICATION"
          | "INSUFFICIENT_INVOCATIONS";
      }
    | {
        hostname: string;
        lastAnalyzedAt?: string;
        status?:
          | "SUCCESS"
          | "UNSUPPORTED_APPLICATION"
          | "INSUFFICIENT_INVOCATIONS";
      }
    | {
        host: string;
        lastAnalyzedAt?: string;
        status?:
          | "SUCCESS"
          | "UNSUPPORTED_APPLICATION"
          | "INSUFFICIENT_INVOCATIONS";
      };
  /** @deprecated */
  placementMode?: "smart";
  /** @deprecated */
  placementStatus?:
    | "SUCCESS"
    | "UNSUPPORTED_APPLICATION"
    | "INSUFFICIENT_INVOCATIONS";
  /** The immutable ID of the script. */
  tag?: string;
  /** Tags associated with the Worker. */
  tags?: string[] | null;
  /** List of Workers that will consume logs from the attached Worker. */
  tailConsumers?: unknown[] | null;
  /** Usage model for the Worker invocations. */
  usageModel?: "standard" | "bundled" | "unbound";
}

export const PutDispatchNamespaceScriptResponse = Schema.Struct({
  startupTimeMs: Schema.Number,
  id: Schema.optional(Schema.String),
  compatibilityDate: Schema.optional(Schema.String),
  compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
  createdOn: Schema.optional(Schema.String),
  entryPoint: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  handlers: Schema.optional(Schema.Array(Schema.String)),
  hasAssets: Schema.optional(Schema.Boolean),
  hasModules: Schema.optional(Schema.Boolean),
  lastDeployedFrom: Schema.optional(Schema.String),
  logpush: Schema.optional(Schema.Boolean),
  migrationTag: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  namedHandlers: Schema.optional(
    Schema.Array(
      Schema.Struct({
        handlers: Schema.optional(Schema.Array(Schema.String)),
        name: Schema.optional(Schema.String),
      }),
    ),
  ),
  observability: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
      headSamplingRate: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      logs: Schema.optional(
        Schema.Union([
          Schema.Struct({
            enabled: Schema.Boolean,
            invocationLogs: Schema.Boolean,
            destinations: Schema.optional(Schema.Array(Schema.String)),
            headSamplingRate: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            persist: Schema.optional(Schema.Boolean),
          }).pipe(
            Schema.encodeKeys({
              enabled: "enabled",
              invocationLogs: "invocation_logs",
              destinations: "destinations",
              headSamplingRate: "head_sampling_rate",
              persist: "persist",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        enabled: "enabled",
        headSamplingRate: "head_sampling_rate",
        logs: "logs",
      }),
    ),
  ),
  placement: Schema.optional(
    Schema.Union([
      Schema.Struct({
        mode: Schema.Literal("smart"),
        lastAnalyzedAt: Schema.optional(Schema.String),
        status: Schema.optional(
          Schema.Literals([
            "SUCCESS",
            "UNSUPPORTED_APPLICATION",
            "INSUFFICIENT_INVOCATIONS",
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          mode: "mode",
          lastAnalyzedAt: "last_analyzed_at",
          status: "status",
        }),
      ),
      Schema.Struct({
        region: Schema.String,
        lastAnalyzedAt: Schema.optional(Schema.String),
        status: Schema.optional(
          Schema.Literals([
            "SUCCESS",
            "UNSUPPORTED_APPLICATION",
            "INSUFFICIENT_INVOCATIONS",
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          region: "region",
          lastAnalyzedAt: "last_analyzed_at",
          status: "status",
        }),
      ),
      Schema.Struct({
        hostname: Schema.String,
        lastAnalyzedAt: Schema.optional(Schema.String),
        status: Schema.optional(
          Schema.Literals([
            "SUCCESS",
            "UNSUPPORTED_APPLICATION",
            "INSUFFICIENT_INVOCATIONS",
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          hostname: "hostname",
          lastAnalyzedAt: "last_analyzed_at",
          status: "status",
        }),
      ),
      Schema.Struct({
        host: Schema.String,
        lastAnalyzedAt: Schema.optional(Schema.String),
        status: Schema.optional(
          Schema.Literals([
            "SUCCESS",
            "UNSUPPORTED_APPLICATION",
            "INSUFFICIENT_INVOCATIONS",
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          host: "host",
          lastAnalyzedAt: "last_analyzed_at",
          status: "status",
        }),
      ),
    ]),
  ),
  placementMode: Schema.optional(Schema.Literal("smart")),
  placementStatus: Schema.optional(
    Schema.Literals([
      "SUCCESS",
      "UNSUPPORTED_APPLICATION",
      "INSUFFICIENT_INVOCATIONS",
    ]),
  ),
  tag: Schema.optional(Schema.String),
  tags: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  tailConsumers: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  usageModel: Schema.optional(
    Schema.Literals(["standard", "bundled", "unbound"]),
  ),
}).pipe(
  Schema.encodeKeys({
    startupTimeMs: "startup_time_ms",
    id: "id",
    compatibilityDate: "compatibility_date",
    compatibilityFlags: "compatibility_flags",
    createdOn: "created_on",
    entryPoint: "entry_point",
    etag: "etag",
    handlers: "handlers",
    hasAssets: "has_assets",
    hasModules: "has_modules",
    lastDeployedFrom: "last_deployed_from",
    logpush: "logpush",
    migrationTag: "migration_tag",
    modifiedOn: "modified_on",
    namedHandlers: "named_handlers",
    observability: "observability",
    placement: "placement",
    placementMode: "placement_mode",
    placementStatus: "placement_status",
    tag: "tag",
    tags: "tags",
    tailConsumers: "tail_consumers",
    usageModel: "usage_model",
  }),
) as unknown as Schema.Schema<PutDispatchNamespaceScriptResponse>;

export const putDispatchNamespaceScript: API.OperationMethod<
  PutDispatchNamespaceScriptRequest,
  PutDispatchNamespaceScriptResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutDispatchNamespaceScriptRequest,
  output: PutDispatchNamespaceScriptResponse,
  errors: [],
}));

export interface DeleteDispatchNamespaceScriptRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: If set to true, delete will not be stopped by associated service binding, durable object, or other binding. Any of these associated bindings/durable objects will be deleted along with the */
  force?: boolean;
}

export const DeleteDispatchNamespaceScriptRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}",
  }),
) as unknown as Schema.Schema<DeleteDispatchNamespaceScriptRequest>;

export type DeleteDispatchNamespaceScriptResponse = unknown;

export const DeleteDispatchNamespaceScriptResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteDispatchNamespaceScriptResponse>;

export const deleteDispatchNamespaceScript: API.OperationMethod<
  DeleteDispatchNamespaceScriptRequest,
  DeleteDispatchNamespaceScriptResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDispatchNamespaceScriptRequest,
  output: DeleteDispatchNamespaceScriptResponse,
  errors: [],
}));

// =============================================================================
// DispatchNamespaceScriptAssetUpload
// =============================================================================

export interface CreateDispatchNamespaceScriptAssetUploadRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: A manifest ([path]: {hash, size}) map of files to upload. As an example, `/blog/hello-world.html` would be a valid path key. */
  manifest: Record<string, unknown>;
}

export const CreateDispatchNamespaceScriptAssetUploadRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  manifest: Schema.Struct({}),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/assets-upload-session",
  }),
) as unknown as Schema.Schema<CreateDispatchNamespaceScriptAssetUploadRequest>;

export interface CreateDispatchNamespaceScriptAssetUploadResponse {
  /** The requests to make to upload assets. */
  buckets?: string[][];
  /** A JWT to use as authentication for uploading assets. */
  jwt?: string;
}

export const CreateDispatchNamespaceScriptAssetUploadResponse = Schema.Struct({
  buckets: Schema.optional(Schema.Array(Schema.Array(Schema.String))),
  jwt: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<CreateDispatchNamespaceScriptAssetUploadResponse>;

export const createDispatchNamespaceScriptAssetUpload: API.OperationMethod<
  CreateDispatchNamespaceScriptAssetUploadRequest,
  CreateDispatchNamespaceScriptAssetUploadResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDispatchNamespaceScriptAssetUploadRequest,
  output: CreateDispatchNamespaceScriptAssetUploadResponse,
  errors: [],
}));

// =============================================================================
// DispatchNamespaceScriptBinding
// =============================================================================

export interface GetDispatchNamespaceScriptBindingRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const GetDispatchNamespaceScriptBindingRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/bindings",
  }),
) as unknown as Schema.Schema<GetDispatchNamespaceScriptBindingRequest>;

export type GetDispatchNamespaceScriptBindingResponse = (
  | { name: string; type: "ai" }
  | { dataset: string; name: string; type: "analytics_engine" }
  | { name: string; type: "assets" }
  | { name: string; type: "browser" }
  | { id: string; name: string; type: "d1" }
  | { name: string; part: string; type: "data_blob" }
  | {
      name: string;
      namespace: string;
      type: "dispatch_namespace";
      outbound?: {
        params?: string[];
        worker?: { environment?: string; service?: string };
      };
    }
  | {
      name: string;
      type: "durable_object_namespace";
      className?: string;
      environment?: string;
      namespaceId?: string;
      scriptName?: string;
    }
  | { id: string; name: string; type: "hyperdrive" }
  | { name: string; type: "inherit"; oldName?: string; versionId?: string }
  | { name: string; type: "images" }
  | { json: string; name: string; type: "json" }
  | { name: string; namespaceId: string; type: "kv_namespace" }
  | { certificateId: string; name: string; type: "mtls_certificate" }
  | { name: string; text: string; type: "plain_text" }
  | { name: string; pipeline: string; type: "pipelines" }
  | { name: string; queueName: string; type: "queue" }
  | {
      bucketName: string;
      name: string;
      type: "r2_bucket";
      jurisdiction?: "eu" | "fedramp";
    }
  | { name: string; type: "secret_text" }
  | {
      name: string;
      type: "send_email";
      allowedDestinationAddresses?: string[];
      allowedSenderAddresses?: string[];
      destinationAddress?: string;
    }
  | { name: string; service: string; type: "service"; environment?: string }
  | { name: string; part: string; type: "text_blob" }
  | { indexName: string; name: string; type: "vectorize" }
  | { name: string; type: "version_metadata" }
  | {
      name: string;
      secretName: string;
      storeId: string;
      type: "secrets_store_secret";
    }
  | {
      algorithm: unknown;
      format: "raw" | "pkcs8" | "spki" | "jwk";
      name: string;
      type: "secret_key";
      usages: (
        | "encrypt"
        | "decrypt"
        | "sign"
        | "verify"
        | "deriveKey"
        | "deriveBits"
        | "wrapKey"
        | "unwrapKey"
      )[];
    }
  | {
      name: string;
      type: "workflow";
      workflowName: string;
      className?: string;
      scriptName?: string;
    }
  | { name: string; part: string; type: "wasm_module" }
)[];

export const GetDispatchNamespaceScriptBindingResponse = Schema.Array(
  Schema.Union([
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("ai"),
    }),
    Schema.Struct({
      dataset: Schema.String,
      name: Schema.String,
      type: Schema.Literal("analytics_engine"),
    }),
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("assets"),
    }),
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("browser"),
    }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      type: Schema.Literal("d1"),
    }),
    Schema.Struct({
      name: Schema.String,
      part: Schema.String,
      type: Schema.Literal("data_blob"),
    }),
    Schema.Struct({
      name: Schema.String,
      namespace: Schema.String,
      type: Schema.Literal("dispatch_namespace"),
      outbound: Schema.optional(
        Schema.Struct({
          params: Schema.optional(Schema.Array(Schema.String)),
          worker: Schema.optional(
            Schema.Struct({
              environment: Schema.optional(Schema.String),
              service: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    }),
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("durable_object_namespace"),
      className: Schema.optional(Schema.String),
      environment: Schema.optional(Schema.String),
      namespaceId: Schema.optional(Schema.String),
      scriptName: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        name: "name",
        type: "type",
        className: "class_name",
        environment: "environment",
        namespaceId: "namespace_id",
        scriptName: "script_name",
      }),
    ),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      type: Schema.Literal("hyperdrive"),
    }),
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("inherit"),
      oldName: Schema.optional(Schema.String),
      versionId: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        name: "name",
        type: "type",
        oldName: "old_name",
        versionId: "version_id",
      }),
    ),
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("images"),
    }),
    Schema.Struct({
      json: Schema.String,
      name: Schema.String,
      type: Schema.Literal("json"),
    }),
    Schema.Struct({
      name: Schema.String,
      namespaceId: Schema.String,
      type: Schema.Literal("kv_namespace"),
    }).pipe(
      Schema.encodeKeys({
        name: "name",
        namespaceId: "namespace_id",
        type: "type",
      }),
    ),
    Schema.Struct({
      certificateId: Schema.String,
      name: Schema.String,
      type: Schema.Literal("mtls_certificate"),
    }).pipe(
      Schema.encodeKeys({
        certificateId: "certificate_id",
        name: "name",
        type: "type",
      }),
    ),
    Schema.Struct({
      name: Schema.String,
      text: Schema.String,
      type: Schema.Literal("plain_text"),
    }),
    Schema.Struct({
      name: Schema.String,
      pipeline: Schema.String,
      type: Schema.Literal("pipelines"),
    }),
    Schema.Struct({
      name: Schema.String,
      queueName: Schema.String,
      type: Schema.Literal("queue"),
    }).pipe(
      Schema.encodeKeys({
        name: "name",
        queueName: "queue_name",
        type: "type",
      }),
    ),
    Schema.Struct({
      bucketName: Schema.String,
      name: Schema.String,
      type: Schema.Literal("r2_bucket"),
      jurisdiction: Schema.optional(Schema.Literals(["eu", "fedramp"])),
    }).pipe(
      Schema.encodeKeys({
        bucketName: "bucket_name",
        name: "name",
        type: "type",
        jurisdiction: "jurisdiction",
      }),
    ),
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("secret_text"),
    }),
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("send_email"),
      allowedDestinationAddresses: Schema.optional(Schema.Array(Schema.String)),
      allowedSenderAddresses: Schema.optional(Schema.Array(Schema.String)),
      destinationAddress: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        name: "name",
        type: "type",
        allowedDestinationAddresses: "allowed_destination_addresses",
        allowedSenderAddresses: "allowed_sender_addresses",
        destinationAddress: "destination_address",
      }),
    ),
    Schema.Struct({
      name: Schema.String,
      service: Schema.String,
      type: Schema.Literal("service"),
      environment: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      name: Schema.String,
      part: Schema.String,
      type: Schema.Literal("text_blob"),
    }),
    Schema.Struct({
      indexName: Schema.String,
      name: Schema.String,
      type: Schema.Literal("vectorize"),
    }).pipe(
      Schema.encodeKeys({
        indexName: "index_name",
        name: "name",
        type: "type",
      }),
    ),
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("version_metadata"),
    }),
    Schema.Struct({
      name: Schema.String,
      secretName: Schema.String,
      storeId: Schema.String,
      type: Schema.Literal("secrets_store_secret"),
    }).pipe(
      Schema.encodeKeys({
        name: "name",
        secretName: "secret_name",
        storeId: "store_id",
        type: "type",
      }),
    ),
    Schema.Struct({
      algorithm: Schema.Unknown,
      format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
      name: Schema.String,
      type: Schema.Literal("secret_key"),
      usages: Schema.Array(
        Schema.Literals([
          "encrypt",
          "decrypt",
          "sign",
          "verify",
          "deriveKey",
          "deriveBits",
          "wrapKey",
          "unwrapKey",
        ]),
      ),
    }),
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("workflow"),
      workflowName: Schema.String,
      className: Schema.optional(Schema.String),
      scriptName: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        name: "name",
        type: "type",
        workflowName: "workflow_name",
        className: "class_name",
        scriptName: "script_name",
      }),
    ),
    Schema.Struct({
      name: Schema.String,
      part: Schema.String,
      type: Schema.Literal("wasm_module"),
    }),
  ]),
) as unknown as Schema.Schema<GetDispatchNamespaceScriptBindingResponse>;

export const getDispatchNamespaceScriptBinding: API.OperationMethod<
  GetDispatchNamespaceScriptBindingRequest,
  GetDispatchNamespaceScriptBindingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDispatchNamespaceScriptBindingRequest,
  output: GetDispatchNamespaceScriptBindingResponse,
  errors: [],
}));

// =============================================================================
// DispatchNamespaceScriptContent
// =============================================================================

export interface GetDispatchNamespaceScriptContentRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const GetDispatchNamespaceScriptContentRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/content",
  }),
) as unknown as Schema.Schema<GetDispatchNamespaceScriptContentRequest>;

export type GetDispatchNamespaceScriptContentResponse = unknown;

export const GetDispatchNamespaceScriptContentResponse =
  Schema.Unknown as unknown as Schema.Schema<GetDispatchNamespaceScriptContentResponse>;

export const getDispatchNamespaceScriptContent: API.OperationMethod<
  GetDispatchNamespaceScriptContentRequest,
  GetDispatchNamespaceScriptContentResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDispatchNamespaceScriptContentRequest,
  output: GetDispatchNamespaceScriptContentResponse,
  errors: [],
}));

export interface PutDispatchNamespaceScriptContentRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Header param: The multipart name of a script upload part containing script content in service worker format. Alternative to including in a metadata part. */
  "CF-WORKER-BODY-PART"?: string;
  /** Header param: The multipart name of a script upload part containing script content in es module format. Alternative to including in a metadata part. */
  "CF-WORKER-MAIN-MODULE-PART"?: string;
  /** Body param: JSON-encoded metadata about the uploaded parts and Worker configuration. */
  metadata: unknown;
  /** Body param: An array of modules (often JavaScript files) comprising a Worker script. At least one module must be present and referenced in the metadata as `main_module` or `body_part` by filename.<br/ */
  files?: (File | Blob)[];
}

export const PutDispatchNamespaceScriptContentRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  "CF-WORKER-BODY-PART": Schema.optional(Schema.String).pipe(
    T.HttpHeader("'CF-WORKER-BODY-PART'"),
  ),
  "CF-WORKER-MAIN-MODULE-PART": Schema.optional(Schema.String).pipe(
    T.HttpHeader("'CF-WORKER-MAIN-MODULE-PART'"),
  ),
  metadata: Schema.Unknown,
  files: Schema.optional(
    Schema.Array(UploadableSchema.pipe(T.HttpFormDataFile())),
  ),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/content",
    contentType: "multipart",
  }),
) as unknown as Schema.Schema<PutDispatchNamespaceScriptContentRequest>;

export type PutDispatchNamespaceScriptContentResponse = unknown;

export const PutDispatchNamespaceScriptContentResponse =
  Schema.Unknown as unknown as Schema.Schema<PutDispatchNamespaceScriptContentResponse>;

export const putDispatchNamespaceScriptContent: API.OperationMethod<
  PutDispatchNamespaceScriptContentRequest,
  PutDispatchNamespaceScriptContentResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutDispatchNamespaceScriptContentRequest,
  output: PutDispatchNamespaceScriptContentResponse,
  errors: [],
}));

// =============================================================================
// DispatchNamespaceScriptSecret
// =============================================================================

export interface GetDispatchNamespaceScriptSecretRequest {
  dispatchNamespace: string;
  scriptName: string;
  secretName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Flag that indicates whether the secret name is URL encoded. */
  urlEncoded?: boolean;
}

export const GetDispatchNamespaceScriptSecretRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  secretName: Schema.String.pipe(T.HttpPath("secretName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  urlEncoded: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("url_encoded")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/secrets/{secretName}",
  }),
) as unknown as Schema.Schema<GetDispatchNamespaceScriptSecretRequest>;

export type GetDispatchNamespaceScriptSecretResponse =
  | { name: string; type: "secret_text" }
  | {
      algorithm: unknown;
      format: "raw" | "pkcs8" | "spki" | "jwk";
      name: string;
      type: "secret_key";
      usages: (
        | "encrypt"
        | "decrypt"
        | "sign"
        | "verify"
        | "deriveKey"
        | "deriveBits"
        | "wrapKey"
        | "unwrapKey"
      )[];
    };

export const GetDispatchNamespaceScriptSecretResponse = Schema.Union([
  Schema.Struct({
    name: Schema.String,
    type: Schema.Literal("secret_text"),
  }),
  Schema.Struct({
    algorithm: Schema.Unknown,
    format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
    name: Schema.String,
    type: Schema.Literal("secret_key"),
    usages: Schema.Array(
      Schema.Literals([
        "encrypt",
        "decrypt",
        "sign",
        "verify",
        "deriveKey",
        "deriveBits",
        "wrapKey",
        "unwrapKey",
      ]),
    ),
  }),
]) as unknown as Schema.Schema<GetDispatchNamespaceScriptSecretResponse>;

export const getDispatchNamespaceScriptSecret: API.OperationMethod<
  GetDispatchNamespaceScriptSecretRequest,
  GetDispatchNamespaceScriptSecretResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDispatchNamespaceScriptSecretRequest,
  output: GetDispatchNamespaceScriptSecretResponse,
  errors: [],
}));

export interface ListDispatchNamespaceScriptSecretsRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const ListDispatchNamespaceScriptSecretsRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/secrets",
  }),
) as unknown as Schema.Schema<ListDispatchNamespaceScriptSecretsRequest>;

export type ListDispatchNamespaceScriptSecretsResponse = (
  | { name: string; type: "secret_text" }
  | {
      algorithm: unknown;
      format: "raw" | "pkcs8" | "spki" | "jwk";
      name: string;
      type: "secret_key";
      usages: (
        | "encrypt"
        | "decrypt"
        | "sign"
        | "verify"
        | "deriveKey"
        | "deriveBits"
        | "wrapKey"
        | "unwrapKey"
      )[];
    }
)[];

export const ListDispatchNamespaceScriptSecretsResponse = Schema.Array(
  Schema.Union([
    Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("secret_text"),
    }),
    Schema.Struct({
      algorithm: Schema.Unknown,
      format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
      name: Schema.String,
      type: Schema.Literal("secret_key"),
      usages: Schema.Array(
        Schema.Literals([
          "encrypt",
          "decrypt",
          "sign",
          "verify",
          "deriveKey",
          "deriveBits",
          "wrapKey",
          "unwrapKey",
        ]),
      ),
    }),
  ]),
) as unknown as Schema.Schema<ListDispatchNamespaceScriptSecretsResponse>;

export const listDispatchNamespaceScriptSecrets: API.OperationMethod<
  ListDispatchNamespaceScriptSecretsRequest,
  ListDispatchNamespaceScriptSecretsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDispatchNamespaceScriptSecretsRequest,
  output: ListDispatchNamespaceScriptSecretsResponse,
  errors: [],
}));

export interface PutDispatchNamespaceScriptSecretRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: A JavaScript variable name for the binding. */
  name: string;
  /** Body param: The secret value to use. */
  text: string;
  /** Body param: The kind of resource that the binding provides. */
  type: "secret_text";
}

export const PutDispatchNamespaceScriptSecretRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  text: Schema.String,
  type: Schema.Literal("secret_text"),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/secrets",
  }),
) as unknown as Schema.Schema<PutDispatchNamespaceScriptSecretRequest>;

export type PutDispatchNamespaceScriptSecretResponse =
  | { name: string; type: "secret_text" }
  | {
      algorithm: unknown;
      format: "raw" | "pkcs8" | "spki" | "jwk";
      name: string;
      type: "secret_key";
      usages: (
        | "encrypt"
        | "decrypt"
        | "sign"
        | "verify"
        | "deriveKey"
        | "deriveBits"
        | "wrapKey"
        | "unwrapKey"
      )[];
    };

export const PutDispatchNamespaceScriptSecretResponse = Schema.Union([
  Schema.Struct({
    name: Schema.String,
    type: Schema.Literal("secret_text"),
  }),
  Schema.Struct({
    algorithm: Schema.Unknown,
    format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
    name: Schema.String,
    type: Schema.Literal("secret_key"),
    usages: Schema.Array(
      Schema.Literals([
        "encrypt",
        "decrypt",
        "sign",
        "verify",
        "deriveKey",
        "deriveBits",
        "wrapKey",
        "unwrapKey",
      ]),
    ),
  }),
]) as unknown as Schema.Schema<PutDispatchNamespaceScriptSecretResponse>;

export const putDispatchNamespaceScriptSecret: API.OperationMethod<
  PutDispatchNamespaceScriptSecretRequest,
  PutDispatchNamespaceScriptSecretResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutDispatchNamespaceScriptSecretRequest,
  output: PutDispatchNamespaceScriptSecretResponse,
  errors: [],
}));

export interface DeleteDispatchNamespaceScriptSecretRequest {
  dispatchNamespace: string;
  scriptName: string;
  secretName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Flag that indicates whether the secret name is URL encoded. */
  urlEncoded?: boolean;
}

export const DeleteDispatchNamespaceScriptSecretRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  secretName: Schema.String.pipe(T.HttpPath("secretName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  urlEncoded: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("url_encoded")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/secrets/{secretName}",
  }),
) as unknown as Schema.Schema<DeleteDispatchNamespaceScriptSecretRequest>;

export type DeleteDispatchNamespaceScriptSecretResponse = unknown;

export const DeleteDispatchNamespaceScriptSecretResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteDispatchNamespaceScriptSecretResponse>;

export const deleteDispatchNamespaceScriptSecret: API.OperationMethod<
  DeleteDispatchNamespaceScriptSecretRequest,
  DeleteDispatchNamespaceScriptSecretResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDispatchNamespaceScriptSecretRequest,
  output: DeleteDispatchNamespaceScriptSecretResponse,
  errors: [],
}));

// =============================================================================
// DispatchNamespaceScriptSetting
// =============================================================================

export interface GetDispatchNamespaceScriptSettingRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const GetDispatchNamespaceScriptSettingRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/settings",
  }),
) as unknown as Schema.Schema<GetDispatchNamespaceScriptSettingRequest>;

export interface GetDispatchNamespaceScriptSettingResponse {
  /** List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings. */
  bindings?: (
    | { name: string; type: "ai" }
    | { dataset: string; name: string; type: "analytics_engine" }
    | { name: string; type: "assets" }
    | { name: string; type: "browser" }
    | { id: string; name: string; type: "d1" }
    | { name: string; part: string; type: "data_blob" }
    | {
        name: string;
        namespace: string;
        type: "dispatch_namespace";
        outbound?: {
          params?: string[];
          worker?: { environment?: string; service?: string };
        };
      }
    | {
        name: string;
        type: "durable_object_namespace";
        className?: string;
        environment?: string;
        namespaceId?: string;
        scriptName?: string;
      }
    | { id: string; name: string; type: "hyperdrive" }
    | { name: string; type: "inherit"; oldName?: string; versionId?: string }
    | { name: string; type: "images" }
    | { json: string; name: string; type: "json" }
    | { name: string; namespaceId: string; type: "kv_namespace" }
    | { certificateId: string; name: string; type: "mtls_certificate" }
    | { name: string; text: string; type: "plain_text" }
    | { name: string; pipeline: string; type: "pipelines" }
    | { name: string; queueName: string; type: "queue" }
    | {
        bucketName: string;
        name: string;
        type: "r2_bucket";
        jurisdiction?: "eu" | "fedramp";
      }
    | { name: string; type: "secret_text" }
    | {
        name: string;
        type: "send_email";
        allowedDestinationAddresses?: string[];
        allowedSenderAddresses?: string[];
        destinationAddress?: string;
      }
    | { name: string; service: string; type: "service"; environment?: string }
    | { name: string; part: string; type: "text_blob" }
    | { indexName: string; name: string; type: "vectorize" }
    | { name: string; type: "version_metadata" }
    | {
        name: string;
        secretName: string;
        storeId: string;
        type: "secrets_store_secret";
      }
    | {
        algorithm: unknown;
        format: "raw" | "pkcs8" | "spki" | "jwk";
        name: string;
        type: "secret_key";
        usages: (
          | "encrypt"
          | "decrypt"
          | "sign"
          | "verify"
          | "deriveKey"
          | "deriveBits"
          | "wrapKey"
          | "unwrapKey"
        )[];
      }
    | {
        name: string;
        type: "workflow";
        workflowName: string;
        className?: string;
        scriptName?: string;
      }
    | { name: string; part: string; type: "wasm_module" }
  )[];
  /** Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker. */
  compatibilityDate?: string;
  /** Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`. */
  compatibilityFlags?: string[];
  /** Limits to apply for this Worker. */
  limits?: { cpuMs?: number };
  /** Whether Logpush is turned on for the Worker. */
  logpush?: boolean;
  /** Observability settings for the Worker. */
  observability?: {
    enabled: boolean;
    headSamplingRate?: number | null;
    logs?: {
      enabled: boolean;
      invocationLogs: boolean;
      destinations?: string[];
      headSamplingRate?: number | null;
      persist?: boolean;
    } | null;
  };
  /** Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify either mode for Smart Placement, or one of region/hostname/host for targeted place */
  placement?:
    | { mode: "smart" }
    | { region: string }
    | { hostname: string }
    | { host: string };
  /** Tags associated with the Worker. */
  tags?: string[] | null;
  /** List of Workers that will consume logs from the attached Worker. */
  tailConsumers?: unknown[] | null;
  /** Usage model for the Worker invocations. */
  usageModel?: "standard" | "bundled" | "unbound";
}

export const GetDispatchNamespaceScriptSettingResponse = Schema.Struct({
  bindings: Schema.optional(
    Schema.Array(
      Schema.Union([
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("ai"),
        }),
        Schema.Struct({
          dataset: Schema.String,
          name: Schema.String,
          type: Schema.Literal("analytics_engine"),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("assets"),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("browser"),
        }),
        Schema.Struct({
          id: Schema.String,
          name: Schema.String,
          type: Schema.Literal("d1"),
        }),
        Schema.Struct({
          name: Schema.String,
          part: Schema.String,
          type: Schema.Literal("data_blob"),
        }),
        Schema.Struct({
          name: Schema.String,
          namespace: Schema.String,
          type: Schema.Literal("dispatch_namespace"),
          outbound: Schema.optional(
            Schema.Struct({
              params: Schema.optional(Schema.Array(Schema.String)),
              worker: Schema.optional(
                Schema.Struct({
                  environment: Schema.optional(Schema.String),
                  service: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("durable_object_namespace"),
          className: Schema.optional(Schema.String),
          environment: Schema.optional(Schema.String),
          namespaceId: Schema.optional(Schema.String),
          scriptName: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            type: "type",
            className: "class_name",
            environment: "environment",
            namespaceId: "namespace_id",
            scriptName: "script_name",
          }),
        ),
        Schema.Struct({
          id: Schema.String,
          name: Schema.String,
          type: Schema.Literal("hyperdrive"),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("inherit"),
          oldName: Schema.optional(Schema.String),
          versionId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            type: "type",
            oldName: "old_name",
            versionId: "version_id",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("images"),
        }),
        Schema.Struct({
          json: Schema.String,
          name: Schema.String,
          type: Schema.Literal("json"),
        }),
        Schema.Struct({
          name: Schema.String,
          namespaceId: Schema.String,
          type: Schema.Literal("kv_namespace"),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            namespaceId: "namespace_id",
            type: "type",
          }),
        ),
        Schema.Struct({
          certificateId: Schema.String,
          name: Schema.String,
          type: Schema.Literal("mtls_certificate"),
        }).pipe(
          Schema.encodeKeys({
            certificateId: "certificate_id",
            name: "name",
            type: "type",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          text: Schema.String,
          type: Schema.Literal("plain_text"),
        }),
        Schema.Struct({
          name: Schema.String,
          pipeline: Schema.String,
          type: Schema.Literal("pipelines"),
        }),
        Schema.Struct({
          name: Schema.String,
          queueName: Schema.String,
          type: Schema.Literal("queue"),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            queueName: "queue_name",
            type: "type",
          }),
        ),
        Schema.Struct({
          bucketName: Schema.String,
          name: Schema.String,
          type: Schema.Literal("r2_bucket"),
          jurisdiction: Schema.optional(Schema.Literals(["eu", "fedramp"])),
        }).pipe(
          Schema.encodeKeys({
            bucketName: "bucket_name",
            name: "name",
            type: "type",
            jurisdiction: "jurisdiction",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("secret_text"),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("send_email"),
          allowedDestinationAddresses: Schema.optional(
            Schema.Array(Schema.String),
          ),
          allowedSenderAddresses: Schema.optional(Schema.Array(Schema.String)),
          destinationAddress: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            type: "type",
            allowedDestinationAddresses: "allowed_destination_addresses",
            allowedSenderAddresses: "allowed_sender_addresses",
            destinationAddress: "destination_address",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          service: Schema.String,
          type: Schema.Literal("service"),
          environment: Schema.optional(Schema.String),
        }),
        Schema.Struct({
          name: Schema.String,
          part: Schema.String,
          type: Schema.Literal("text_blob"),
        }),
        Schema.Struct({
          indexName: Schema.String,
          name: Schema.String,
          type: Schema.Literal("vectorize"),
        }).pipe(
          Schema.encodeKeys({
            indexName: "index_name",
            name: "name",
            type: "type",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("version_metadata"),
        }),
        Schema.Struct({
          name: Schema.String,
          secretName: Schema.String,
          storeId: Schema.String,
          type: Schema.Literal("secrets_store_secret"),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            secretName: "secret_name",
            storeId: "store_id",
            type: "type",
          }),
        ),
        Schema.Struct({
          algorithm: Schema.Unknown,
          format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
          name: Schema.String,
          type: Schema.Literal("secret_key"),
          usages: Schema.Array(
            Schema.Literals([
              "encrypt",
              "decrypt",
              "sign",
              "verify",
              "deriveKey",
              "deriveBits",
              "wrapKey",
              "unwrapKey",
            ]),
          ),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("workflow"),
          workflowName: Schema.String,
          className: Schema.optional(Schema.String),
          scriptName: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            type: "type",
            workflowName: "workflow_name",
            className: "class_name",
            scriptName: "script_name",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          part: Schema.String,
          type: Schema.Literal("wasm_module"),
        }),
      ]),
    ),
  ),
  compatibilityDate: Schema.optional(Schema.String),
  compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
  limits: Schema.optional(
    Schema.Struct({
      cpuMs: Schema.optional(Schema.Number),
    }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
  ),
  logpush: Schema.optional(Schema.Boolean),
  observability: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
      headSamplingRate: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      logs: Schema.optional(
        Schema.Union([
          Schema.Struct({
            enabled: Schema.Boolean,
            invocationLogs: Schema.Boolean,
            destinations: Schema.optional(Schema.Array(Schema.String)),
            headSamplingRate: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            persist: Schema.optional(Schema.Boolean),
          }).pipe(
            Schema.encodeKeys({
              enabled: "enabled",
              invocationLogs: "invocation_logs",
              destinations: "destinations",
              headSamplingRate: "head_sampling_rate",
              persist: "persist",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        enabled: "enabled",
        headSamplingRate: "head_sampling_rate",
        logs: "logs",
      }),
    ),
  ),
  placement: Schema.optional(
    Schema.Union([
      Schema.Struct({
        mode: Schema.Literal("smart"),
      }),
      Schema.Struct({
        region: Schema.String,
      }),
      Schema.Struct({
        hostname: Schema.String,
      }),
      Schema.Struct({
        host: Schema.String,
      }),
    ]),
  ),
  tags: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  tailConsumers: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  usageModel: Schema.optional(
    Schema.Literals(["standard", "bundled", "unbound"]),
  ),
}).pipe(
  Schema.encodeKeys({
    bindings: "bindings",
    compatibilityDate: "compatibility_date",
    compatibilityFlags: "compatibility_flags",
    limits: "limits",
    logpush: "logpush",
    observability: "observability",
    placement: "placement",
    tags: "tags",
    tailConsumers: "tail_consumers",
    usageModel: "usage_model",
  }),
) as unknown as Schema.Schema<GetDispatchNamespaceScriptSettingResponse>;

export const getDispatchNamespaceScriptSetting: API.OperationMethod<
  GetDispatchNamespaceScriptSettingRequest,
  GetDispatchNamespaceScriptSettingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDispatchNamespaceScriptSettingRequest,
  output: GetDispatchNamespaceScriptSettingResponse,
  errors: [],
}));

export interface PatchDispatchNamespaceScriptSettingRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  settings?: {
    bindings?: (
      | { name: string; type: "ai" }
      | { dataset: string; name: string; type: "analytics_engine" }
      | { name: string; type: "assets" }
      | { name: string; type: "browser" }
      | { id: string; name: string; type: "d1" }
      | { name: string; part: string; type: "data_blob" }
      | {
          name: string;
          namespace: string;
          type: "dispatch_namespace";
          outbound?: {
            params?: string[];
            worker?: { environment?: string; service?: string };
          };
        }
      | {
          name: string;
          type: "durable_object_namespace";
          className?: string;
          environment?: string;
          namespaceId?: string;
          scriptName?: string;
        }
      | { id: string; name: string; type: "hyperdrive" }
      | { name: string; type: "inherit"; oldName?: string; versionId?: string }
      | { name: string; type: "images" }
      | { json: string; name: string; type: "json" }
      | { name: string; namespaceId: string; type: "kv_namespace" }
      | { certificateId: string; name: string; type: "mtls_certificate" }
      | { name: string; text: string; type: "plain_text" }
      | { name: string; pipeline: string; type: "pipelines" }
      | { name: string; queueName: string; type: "queue" }
      | {
          bucketName: string;
          name: string;
          type: "r2_bucket";
          jurisdiction?: "eu" | "fedramp";
        }
      | { name: string; text: string; type: "secret_text" }
      | {
          name: string;
          type: "send_email";
          allowedDestinationAddresses?: string[];
          allowedSenderAddresses?: string[];
          destinationAddress?: string;
        }
      | { name: string; service: string; type: "service"; environment?: string }
      | { name: string; part: string; type: "text_blob" }
      | { indexName: string; name: string; type: "vectorize" }
      | { name: string; type: "version_metadata" }
      | {
          name: string;
          secretName: string;
          storeId: string;
          type: "secrets_store_secret";
        }
      | {
          algorithm: unknown;
          format: "raw" | "pkcs8" | "spki" | "jwk";
          name: string;
          type: "secret_key";
          usages: (
            | "encrypt"
            | "decrypt"
            | "sign"
            | "verify"
            | "deriveKey"
            | "deriveBits"
            | "wrapKey"
            | "unwrapKey"
          )[];
          keyBase64?: string;
          keyJwk?: unknown;
        }
      | {
          name: string;
          type: "workflow";
          workflowName: string;
          className?: string;
          scriptName?: string;
        }
      | { name: string; part: string; type: "wasm_module" }
    )[];
    compatibilityDate?: string;
    compatibilityFlags?: string[];
    limits?: { cpuMs?: number };
    logpush?: boolean;
    migrations?:
      | unknown
      | { newTag?: string; oldTag?: string; steps?: unknown[] };
    observability?: {
      enabled: boolean;
      headSamplingRate?: number | null;
      logs?: {
        enabled: boolean;
        invocationLogs: boolean;
        destinations?: string[];
        headSamplingRate?: number | null;
        persist?: boolean;
      } | null;
    };
    placement?:
      | { mode: "smart" }
      | { region: string }
      | { hostname: string }
      | { host: string };
    tags?: string[] | null;
    tailConsumers?: unknown[] | null;
    usageModel?: "standard" | "bundled" | "unbound";
  };
}

export const PatchDispatchNamespaceScriptSettingRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  settings: Schema.optional(
    Schema.Struct({
      bindings: Schema.optional(
        Schema.Array(
          Schema.Union([
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("ai"),
            }),
            Schema.Struct({
              dataset: Schema.String,
              name: Schema.String,
              type: Schema.Literal("analytics_engine"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("assets"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("browser"),
            }),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("d1"),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("data_blob"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespace: Schema.String,
              type: Schema.Literal("dispatch_namespace"),
              outbound: Schema.optional(
                Schema.Struct({
                  params: Schema.optional(Schema.Array(Schema.String)),
                  worker: Schema.optional(
                    Schema.Struct({
                      environment: Schema.optional(Schema.String),
                      service: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("durable_object_namespace"),
              className: Schema.optional(Schema.String),
              environment: Schema.optional(Schema.String),
              namespaceId: Schema.optional(Schema.String),
              scriptName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                className: "class_name",
                environment: "environment",
                namespaceId: "namespace_id",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              id: Schema.String,
              name: Schema.String,
              type: Schema.Literal("hyperdrive"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("inherit"),
              oldName: Schema.optional(Schema.String),
              versionId: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                oldName: "old_name",
                versionId: "version_id",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("images"),
            }),
            Schema.Struct({
              json: Schema.String,
              name: Schema.String,
              type: Schema.Literal("json"),
            }),
            Schema.Struct({
              name: Schema.String,
              namespaceId: Schema.String,
              type: Schema.Literal("kv_namespace"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                namespaceId: "namespace_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              certificateId: Schema.String,
              name: Schema.String,
              type: Schema.Literal("mtls_certificate"),
            }).pipe(
              Schema.encodeKeys({
                certificateId: "certificate_id",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              text: Schema.String,
              type: Schema.Literal("plain_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              pipeline: Schema.String,
              type: Schema.Literal("pipelines"),
            }),
            Schema.Struct({
              name: Schema.String,
              queueName: Schema.String,
              type: Schema.Literal("queue"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                queueName: "queue_name",
                type: "type",
              }),
            ),
            Schema.Struct({
              bucketName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("r2_bucket"),
              jurisdiction: Schema.optional(Schema.Literals(["eu", "fedramp"])),
            }).pipe(
              Schema.encodeKeys({
                bucketName: "bucket_name",
                name: "name",
                type: "type",
                jurisdiction: "jurisdiction",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              text: Schema.String,
              type: Schema.Literal("secret_text"),
            }),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("send_email"),
              allowedDestinationAddresses: Schema.optional(
                Schema.Array(Schema.String),
              ),
              allowedSenderAddresses: Schema.optional(
                Schema.Array(Schema.String),
              ),
              destinationAddress: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                allowedDestinationAddresses: "allowed_destination_addresses",
                allowedSenderAddresses: "allowed_sender_addresses",
                destinationAddress: "destination_address",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              service: Schema.String,
              type: Schema.Literal("service"),
              environment: Schema.optional(Schema.String),
            }),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("text_blob"),
            }),
            Schema.Struct({
              indexName: Schema.String,
              name: Schema.String,
              type: Schema.Literal("vectorize"),
            }).pipe(
              Schema.encodeKeys({
                indexName: "index_name",
                name: "name",
                type: "type",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("version_metadata"),
            }),
            Schema.Struct({
              name: Schema.String,
              secretName: Schema.String,
              storeId: Schema.String,
              type: Schema.Literal("secrets_store_secret"),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                secretName: "secret_name",
                storeId: "store_id",
                type: "type",
              }),
            ),
            Schema.Struct({
              algorithm: Schema.Unknown,
              format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
              name: Schema.String,
              type: Schema.Literal("secret_key"),
              usages: Schema.Array(
                Schema.Literals([
                  "encrypt",
                  "decrypt",
                  "sign",
                  "verify",
                  "deriveKey",
                  "deriveBits",
                  "wrapKey",
                  "unwrapKey",
                ]),
              ),
              keyBase64: Schema.optional(Schema.String),
              keyJwk: Schema.optional(Schema.Unknown),
            }).pipe(
              Schema.encodeKeys({
                algorithm: "algorithm",
                format: "format",
                name: "name",
                type: "type",
                usages: "usages",
                keyBase64: "key_base64",
                keyJwk: "key_jwk",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              type: Schema.Literal("workflow"),
              workflowName: Schema.String,
              className: Schema.optional(Schema.String),
              scriptName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                name: "name",
                type: "type",
                workflowName: "workflow_name",
                className: "class_name",
                scriptName: "script_name",
              }),
            ),
            Schema.Struct({
              name: Schema.String,
              part: Schema.String,
              type: Schema.Literal("wasm_module"),
            }),
          ]),
        ),
      ),
      compatibilityDate: Schema.optional(Schema.String),
      compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
      limits: Schema.optional(
        Schema.Struct({
          cpuMs: Schema.optional(Schema.Number),
        }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
      ),
      logpush: Schema.optional(Schema.Boolean),
      migrations: Schema.optional(
        Schema.Union([
          Schema.Unknown,
          Schema.Struct({
            newTag: Schema.optional(Schema.String),
            oldTag: Schema.optional(Schema.String),
            steps: Schema.optional(Schema.Array(Schema.Unknown)),
          }).pipe(
            Schema.encodeKeys({
              newTag: "new_tag",
              oldTag: "old_tag",
              steps: "steps",
            }),
          ),
        ]),
      ),
      observability: Schema.optional(
        Schema.Struct({
          enabled: Schema.Boolean,
          headSamplingRate: Schema.optional(
            Schema.Union([Schema.Number, Schema.Null]),
          ),
          logs: Schema.optional(
            Schema.Union([
              Schema.Struct({
                enabled: Schema.Boolean,
                invocationLogs: Schema.Boolean,
                destinations: Schema.optional(Schema.Array(Schema.String)),
                headSamplingRate: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                persist: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  enabled: "enabled",
                  invocationLogs: "invocation_logs",
                  destinations: "destinations",
                  headSamplingRate: "head_sampling_rate",
                  persist: "persist",
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            enabled: "enabled",
            headSamplingRate: "head_sampling_rate",
            logs: "logs",
          }),
        ),
      ),
      placement: Schema.optional(
        Schema.Union([
          Schema.Struct({
            mode: Schema.Literal("smart"),
          }),
          Schema.Struct({
            region: Schema.String,
          }),
          Schema.Struct({
            hostname: Schema.String,
          }),
          Schema.Struct({
            host: Schema.String,
          }),
        ]),
      ),
      tags: Schema.optional(
        Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      ),
      tailConsumers: Schema.optional(
        Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
      ),
      usageModel: Schema.optional(
        Schema.Literals(["standard", "bundled", "unbound"]),
      ),
    }).pipe(
      Schema.encodeKeys({
        bindings: "bindings",
        compatibilityDate: "compatibility_date",
        compatibilityFlags: "compatibility_flags",
        limits: "limits",
        logpush: "logpush",
        migrations: "migrations",
        observability: "observability",
        placement: "placement",
        tags: "tags",
        tailConsumers: "tail_consumers",
        usageModel: "usage_model",
      }),
    ),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/settings",
  }),
) as unknown as Schema.Schema<PatchDispatchNamespaceScriptSettingRequest>;

export interface PatchDispatchNamespaceScriptSettingResponse {
  /** List of bindings attached to a Worker. You can find more about bindings on our docs: https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#bindings. */
  bindings?: (
    | { name: string; type: "ai" }
    | { dataset: string; name: string; type: "analytics_engine" }
    | { name: string; type: "assets" }
    | { name: string; type: "browser" }
    | { id: string; name: string; type: "d1" }
    | { name: string; part: string; type: "data_blob" }
    | {
        name: string;
        namespace: string;
        type: "dispatch_namespace";
        outbound?: {
          params?: string[];
          worker?: { environment?: string; service?: string };
        };
      }
    | {
        name: string;
        type: "durable_object_namespace";
        className?: string;
        environment?: string;
        namespaceId?: string;
        scriptName?: string;
      }
    | { id: string; name: string; type: "hyperdrive" }
    | { name: string; type: "inherit"; oldName?: string; versionId?: string }
    | { name: string; type: "images" }
    | { json: string; name: string; type: "json" }
    | { name: string; namespaceId: string; type: "kv_namespace" }
    | { certificateId: string; name: string; type: "mtls_certificate" }
    | { name: string; text: string; type: "plain_text" }
    | { name: string; pipeline: string; type: "pipelines" }
    | { name: string; queueName: string; type: "queue" }
    | {
        bucketName: string;
        name: string;
        type: "r2_bucket";
        jurisdiction?: "eu" | "fedramp";
      }
    | { name: string; type: "secret_text" }
    | {
        name: string;
        type: "send_email";
        allowedDestinationAddresses?: string[];
        allowedSenderAddresses?: string[];
        destinationAddress?: string;
      }
    | { name: string; service: string; type: "service"; environment?: string }
    | { name: string; part: string; type: "text_blob" }
    | { indexName: string; name: string; type: "vectorize" }
    | { name: string; type: "version_metadata" }
    | {
        name: string;
        secretName: string;
        storeId: string;
        type: "secrets_store_secret";
      }
    | {
        algorithm: unknown;
        format: "raw" | "pkcs8" | "spki" | "jwk";
        name: string;
        type: "secret_key";
        usages: (
          | "encrypt"
          | "decrypt"
          | "sign"
          | "verify"
          | "deriveKey"
          | "deriveBits"
          | "wrapKey"
          | "unwrapKey"
        )[];
      }
    | {
        name: string;
        type: "workflow";
        workflowName: string;
        className?: string;
        scriptName?: string;
      }
    | { name: string; part: string; type: "wasm_module" }
  )[];
  /** Date indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker. */
  compatibilityDate?: string;
  /** Flags that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`. */
  compatibilityFlags?: string[];
  /** Limits to apply for this Worker. */
  limits?: { cpuMs?: number };
  /** Whether Logpush is turned on for the Worker. */
  logpush?: boolean;
  /** Observability settings for the Worker. */
  observability?: {
    enabled: boolean;
    headSamplingRate?: number | null;
    logs?: {
      enabled: boolean;
      invocationLogs: boolean;
      destinations?: string[];
      headSamplingRate?: number | null;
      persist?: boolean;
    } | null;
  };
  /** Configuration for [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement). Specify either mode for Smart Placement, or one of region/hostname/host for targeted place */
  placement?:
    | { mode: "smart" }
    | { region: string }
    | { hostname: string }
    | { host: string };
  /** Tags associated with the Worker. */
  tags?: string[] | null;
  /** List of Workers that will consume logs from the attached Worker. */
  tailConsumers?: unknown[] | null;
  /** Usage model for the Worker invocations. */
  usageModel?: "standard" | "bundled" | "unbound";
}

export const PatchDispatchNamespaceScriptSettingResponse = Schema.Struct({
  bindings: Schema.optional(
    Schema.Array(
      Schema.Union([
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("ai"),
        }),
        Schema.Struct({
          dataset: Schema.String,
          name: Schema.String,
          type: Schema.Literal("analytics_engine"),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("assets"),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("browser"),
        }),
        Schema.Struct({
          id: Schema.String,
          name: Schema.String,
          type: Schema.Literal("d1"),
        }),
        Schema.Struct({
          name: Schema.String,
          part: Schema.String,
          type: Schema.Literal("data_blob"),
        }),
        Schema.Struct({
          name: Schema.String,
          namespace: Schema.String,
          type: Schema.Literal("dispatch_namespace"),
          outbound: Schema.optional(
            Schema.Struct({
              params: Schema.optional(Schema.Array(Schema.String)),
              worker: Schema.optional(
                Schema.Struct({
                  environment: Schema.optional(Schema.String),
                  service: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("durable_object_namespace"),
          className: Schema.optional(Schema.String),
          environment: Schema.optional(Schema.String),
          namespaceId: Schema.optional(Schema.String),
          scriptName: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            type: "type",
            className: "class_name",
            environment: "environment",
            namespaceId: "namespace_id",
            scriptName: "script_name",
          }),
        ),
        Schema.Struct({
          id: Schema.String,
          name: Schema.String,
          type: Schema.Literal("hyperdrive"),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("inherit"),
          oldName: Schema.optional(Schema.String),
          versionId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            type: "type",
            oldName: "old_name",
            versionId: "version_id",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("images"),
        }),
        Schema.Struct({
          json: Schema.String,
          name: Schema.String,
          type: Schema.Literal("json"),
        }),
        Schema.Struct({
          name: Schema.String,
          namespaceId: Schema.String,
          type: Schema.Literal("kv_namespace"),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            namespaceId: "namespace_id",
            type: "type",
          }),
        ),
        Schema.Struct({
          certificateId: Schema.String,
          name: Schema.String,
          type: Schema.Literal("mtls_certificate"),
        }).pipe(
          Schema.encodeKeys({
            certificateId: "certificate_id",
            name: "name",
            type: "type",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          text: Schema.String,
          type: Schema.Literal("plain_text"),
        }),
        Schema.Struct({
          name: Schema.String,
          pipeline: Schema.String,
          type: Schema.Literal("pipelines"),
        }),
        Schema.Struct({
          name: Schema.String,
          queueName: Schema.String,
          type: Schema.Literal("queue"),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            queueName: "queue_name",
            type: "type",
          }),
        ),
        Schema.Struct({
          bucketName: Schema.String,
          name: Schema.String,
          type: Schema.Literal("r2_bucket"),
          jurisdiction: Schema.optional(Schema.Literals(["eu", "fedramp"])),
        }).pipe(
          Schema.encodeKeys({
            bucketName: "bucket_name",
            name: "name",
            type: "type",
            jurisdiction: "jurisdiction",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("secret_text"),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("send_email"),
          allowedDestinationAddresses: Schema.optional(
            Schema.Array(Schema.String),
          ),
          allowedSenderAddresses: Schema.optional(Schema.Array(Schema.String)),
          destinationAddress: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            type: "type",
            allowedDestinationAddresses: "allowed_destination_addresses",
            allowedSenderAddresses: "allowed_sender_addresses",
            destinationAddress: "destination_address",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          service: Schema.String,
          type: Schema.Literal("service"),
          environment: Schema.optional(Schema.String),
        }),
        Schema.Struct({
          name: Schema.String,
          part: Schema.String,
          type: Schema.Literal("text_blob"),
        }),
        Schema.Struct({
          indexName: Schema.String,
          name: Schema.String,
          type: Schema.Literal("vectorize"),
        }).pipe(
          Schema.encodeKeys({
            indexName: "index_name",
            name: "name",
            type: "type",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("version_metadata"),
        }),
        Schema.Struct({
          name: Schema.String,
          secretName: Schema.String,
          storeId: Schema.String,
          type: Schema.Literal("secrets_store_secret"),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            secretName: "secret_name",
            storeId: "store_id",
            type: "type",
          }),
        ),
        Schema.Struct({
          algorithm: Schema.Unknown,
          format: Schema.Literals(["raw", "pkcs8", "spki", "jwk"]),
          name: Schema.String,
          type: Schema.Literal("secret_key"),
          usages: Schema.Array(
            Schema.Literals([
              "encrypt",
              "decrypt",
              "sign",
              "verify",
              "deriveKey",
              "deriveBits",
              "wrapKey",
              "unwrapKey",
            ]),
          ),
        }),
        Schema.Struct({
          name: Schema.String,
          type: Schema.Literal("workflow"),
          workflowName: Schema.String,
          className: Schema.optional(Schema.String),
          scriptName: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            name: "name",
            type: "type",
            workflowName: "workflow_name",
            className: "class_name",
            scriptName: "script_name",
          }),
        ),
        Schema.Struct({
          name: Schema.String,
          part: Schema.String,
          type: Schema.Literal("wasm_module"),
        }),
      ]),
    ),
  ),
  compatibilityDate: Schema.optional(Schema.String),
  compatibilityFlags: Schema.optional(Schema.Array(Schema.String)),
  limits: Schema.optional(
    Schema.Struct({
      cpuMs: Schema.optional(Schema.Number),
    }).pipe(Schema.encodeKeys({ cpuMs: "cpu_ms" })),
  ),
  logpush: Schema.optional(Schema.Boolean),
  observability: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
      headSamplingRate: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      logs: Schema.optional(
        Schema.Union([
          Schema.Struct({
            enabled: Schema.Boolean,
            invocationLogs: Schema.Boolean,
            destinations: Schema.optional(Schema.Array(Schema.String)),
            headSamplingRate: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            persist: Schema.optional(Schema.Boolean),
          }).pipe(
            Schema.encodeKeys({
              enabled: "enabled",
              invocationLogs: "invocation_logs",
              destinations: "destinations",
              headSamplingRate: "head_sampling_rate",
              persist: "persist",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        enabled: "enabled",
        headSamplingRate: "head_sampling_rate",
        logs: "logs",
      }),
    ),
  ),
  placement: Schema.optional(
    Schema.Union([
      Schema.Struct({
        mode: Schema.Literal("smart"),
      }),
      Schema.Struct({
        region: Schema.String,
      }),
      Schema.Struct({
        hostname: Schema.String,
      }),
      Schema.Struct({
        host: Schema.String,
      }),
    ]),
  ),
  tags: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  tailConsumers: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  usageModel: Schema.optional(
    Schema.Literals(["standard", "bundled", "unbound"]),
  ),
}).pipe(
  Schema.encodeKeys({
    bindings: "bindings",
    compatibilityDate: "compatibility_date",
    compatibilityFlags: "compatibility_flags",
    limits: "limits",
    logpush: "logpush",
    observability: "observability",
    placement: "placement",
    tags: "tags",
    tailConsumers: "tail_consumers",
    usageModel: "usage_model",
  }),
) as unknown as Schema.Schema<PatchDispatchNamespaceScriptSettingResponse>;

export const patchDispatchNamespaceScriptSetting: API.OperationMethod<
  PatchDispatchNamespaceScriptSettingRequest,
  PatchDispatchNamespaceScriptSettingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchDispatchNamespaceScriptSettingRequest,
  output: PatchDispatchNamespaceScriptSettingResponse,
  errors: [],
}));

// =============================================================================
// DispatchNamespaceScriptTag
// =============================================================================

export interface ListDispatchNamespaceScriptTagsRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Identifier. */
  accountId: string;
}

export const ListDispatchNamespaceScriptTagsRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/tags",
  }),
) as unknown as Schema.Schema<ListDispatchNamespaceScriptTagsRequest>;

export type ListDispatchNamespaceScriptTagsResponse = string[];

export const ListDispatchNamespaceScriptTagsResponse = Schema.Array(
  Schema.String,
) as unknown as Schema.Schema<ListDispatchNamespaceScriptTagsResponse>;

export const listDispatchNamespaceScriptTags: API.OperationMethod<
  ListDispatchNamespaceScriptTagsRequest,
  ListDispatchNamespaceScriptTagsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDispatchNamespaceScriptTagsRequest,
  output: ListDispatchNamespaceScriptTagsResponse,
  errors: [],
}));

export interface UpdateDispatchNamespaceScriptTagRequest {
  dispatchNamespace: string;
  scriptName: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Tags associated with the Worker. */
  body: string[] | null;
}

export const UpdateDispatchNamespaceScriptTagRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Union([Schema.Array(Schema.String), Schema.Null]).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/tags",
  }),
) as unknown as Schema.Schema<UpdateDispatchNamespaceScriptTagRequest>;

export type UpdateDispatchNamespaceScriptTagResponse = string[];

export const UpdateDispatchNamespaceScriptTagResponse = Schema.Array(
  Schema.String,
) as unknown as Schema.Schema<UpdateDispatchNamespaceScriptTagResponse>;

export const updateDispatchNamespaceScriptTag: API.OperationMethod<
  UpdateDispatchNamespaceScriptTagRequest,
  UpdateDispatchNamespaceScriptTagResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateDispatchNamespaceScriptTagRequest,
  output: UpdateDispatchNamespaceScriptTagResponse,
  errors: [],
}));

export interface DeleteDispatchNamespaceScriptTagRequest {
  dispatchNamespace: string;
  scriptName: string;
  tag: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteDispatchNamespaceScriptTagRequest = Schema.Struct({
  dispatchNamespace: Schema.String.pipe(T.HttpPath("dispatchNamespace")),
  scriptName: Schema.String.pipe(T.HttpPath("scriptName")),
  tag: Schema.String.pipe(T.HttpPath("tag")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}/tags/{tag}",
  }),
) as unknown as Schema.Schema<DeleteDispatchNamespaceScriptTagRequest>;

export type DeleteDispatchNamespaceScriptTagResponse = unknown;

export const DeleteDispatchNamespaceScriptTagResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteDispatchNamespaceScriptTagResponse>;

export const deleteDispatchNamespaceScriptTag: API.OperationMethod<
  DeleteDispatchNamespaceScriptTagRequest,
  DeleteDispatchNamespaceScriptTagResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDispatchNamespaceScriptTagRequest,
  output: DeleteDispatchNamespaceScriptTagResponse,
  errors: [],
}));
