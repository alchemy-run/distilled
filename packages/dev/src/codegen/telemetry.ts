/**
 * Telemetry traits: what an operation's trace span carries, stated in the
 * Smithy model, so any generator reading the model produces the same spans.
 * The full specification is `telemetry-traits.md` next to this file.
 *
 *   com.distilled.telemetry#service     service shape (or model metadata
 *                                        when the model has no service shape)
 *   com.distilled.telemetry#operation   operation shape
 *   com.distilled.telemetry#attributes  input structure member
 *
 * Every converted model gets these traits in its last convert step
 * ({@link applyTelemetryTraits}, called from `finalizeConvert` and from
 * AWS's convert), after patches: a value a patch already set is kept, so a
 * patch overrides any default field by field.
 */
import { readFileSync } from "node:fs";
import * as path from "node:path";

export const SERVICE_TRAIT = "com.distilled.telemetry#service";
export const OPERATION_TRAIT = "com.distilled.telemetry#operation";
export const ATTRIBUTES_TRAIT = "com.distilled.telemetry#attributes";

/**
 * How a value becomes an attribute value. A closed set, so every generator
 * implements the same ones:
 *
 *   (none)           the value as is (string, number, boolean)
 *   list             [value]
 *   keys             the keys of an object value
 *   count            the length of an array value
 *   lastPathSegment  the text after the last `/` of a string
 *   arnResource      the text after the last `:` of a string
 */
export type Transform =
  | "list"
  | "keys"
  | "count"
  | "lastPathSegment"
  | "arnResource"
  | "arn"
  | "jsonList"
  | "nonZero";

export type Scalar = string | number | boolean;

/** One span attribute read from a value. */
export interface AttributeRule {
  readonly name: string;
  /** Dotted path into the member's value (`maxTokens`), read before the transform. */
  readonly field?: string;
  readonly transform?: Transform;
}

/** One span attribute read from a response header. */
export interface HeaderRule extends AttributeRule {
  /** Lower-case header name. */
  readonly header: string;
}

/** Facts for requests to a host ending in `suffix` (S3-compatible services). */
export interface HostRule {
  /** Host suffix with its leading dot, e.g. `.r2.cloudflarestorage.com`. */
  readonly suffix: string;
  readonly attributes?: Readonly<Record<string, Scalar>>;
  /** Attribute for the host label just before the suffix. */
  readonly hostLabel?: string;
  /** Copy attribute values under a second name: `{ from: to }`. */
  readonly copy?: Readonly<Record<string, string>>;
}

/**
 * Where an operation carries W3C trace context in its messages, by Smithy
 * member names: `member` of the input (or output), or `member` of every
 * element of the `list` member.
 */
export interface MessageContext {
  /**
   * `awsMessageAttributes`: W3C `traceparent` in a map of
   * `{ DataType, StringValue }` (SQS, SNS); `xrayTraceHeader`: an X-Ray
   * trace header in a string member (EventBridge entries' `TraceHeader`);
   * `lambdaClientContext`: `custom.traceparent` in a base64 JSON Lambda
   * client context.
   */
  readonly format: "awsMessageAttributes" | "xrayTraceHeader" | "lambdaClientContext";
  readonly member: string;
  readonly list?: string;
  /** Extract only: the input member listing attribute names to return. */
  readonly request?: string;
  /** Extract only: the body member, read as an SNS notification envelope. */
  readonly envelope?: string;
  /** Extract only: the system-attributes member, read for `AWSTraceHeader`. */
  readonly system?: string;
  /** Extract only: the input member listing system attributes to return. */
  readonly systemRequest?: string;
  /** Extract only: the message's id member, recorded on each link as `messaging.message.id`. */
  readonly messageId?: string;
}

/** `com.distilled.telemetry#service`. */
export interface ServiceTrait {
  /** `rpc.system.name` of every operation span. */
  readonly system: string;
  /** Attributes on every operation span. */
  readonly attributes?: Readonly<Record<string, Scalar>>;
  /** Response headers recorded on every operation span. */
  readonly responseHeaders?: ReadonlyArray<HeaderRule>;
  readonly hosts?: ReadonlyArray<HostRule>;
  /**
   * How requests carry the span's context: `w3c`, a `traceparent` header;
   * `xray`, an `X-Amzn-Trace-Id` header.
   */
  readonly propagation?: "w3c" | "xray";
}

/** `com.distilled.telemetry#operation`. */
export interface OperationTrait {
  /** Span name, e.g. `S3.GetObject`. */
  readonly name: string;
  /**
   * Span name with `{attribute}` placeholders filled from the call's input
   * attributes (`send {messaging.destination.name}`); `name` when one is
   * missing.
   */
  readonly nameTemplate?: string;
  /** Write the span's trace context into the input's messages. */
  readonly inject?: MessageContext;
  /** Link the span to the trace context of the output's messages. */
  readonly extract?: MessageContext;
  /** `rpc.method`, `{service}/{operation}`, e.g. `S3/GetObject`. */
  readonly method: string;
  /** Span kind. Default `client`. */
  readonly kind?: "client" | "producer" | "consumer";
  /** Attributes on this operation's spans, after the service's. */
  readonly attributes?: Readonly<Record<string, Scalar>>;
  /** Attributes recorded under a second name once the request is built: `{ from: to }`. */
  readonly copy?: Readonly<Record<string, string>>;
}

//#region defaults

/** What a provider's convert passes to {@link applyTelemetryTraits}. */
export interface TelemetryOptions {
  /** `rpc.system.name`. Default `<package>-api`. */
  readonly system?: string;
  /**
   * The rpc.method service part. Default the service shape's name, else
   * `metadata.service`, else the model's file name.
   */
  readonly service?: string;
  /**
   * Span-name prefix: the provider's display name (`Cloudflare`), or
   * `"service"` for packages whose models are separate products (each
   * model's service name, `Compute`).
   */
  readonly prefix?: string;
  /** Path-label members recorded under another name: Smithy member -> attribute. */
  readonly labelNames?: Readonly<Record<string, string>>;
  /**
   * Attribute namespace for path-label members (`cloudflare` makes
   * `zone_id` → `cloudflare.zone_id`). `false` records no labels.
   */
  readonly labelNamespace?: string | false;
  readonly attributes?: Readonly<Record<string, Scalar>>;
  readonly responseHeaders?: ReadonlyArray<HeaderRule>;
  readonly hosts?: ReadonlyArray<HostRule>;
  readonly propagation?: "w3c" | "xray";
  /** Service attributes read from the model itself (GCP's `metadata.baseUrl`). */
  readonly modelAttributes?: (model: {
    readonly metadata?: Record<string, any>;
  }) => Readonly<Record<string, Scalar>> | undefined;
  /** Per-operation overrides (kind, attributes). */
  readonly operation?: (op: OperationContext) => Partial<OperationTrait> | undefined;
  /** Attributes for an input member, beyond the label rule. */
  readonly member?: (member: MemberContext) => ReadonlyArray<AttributeRule> | undefined;
  /** Attributes for an output member, recorded when the call succeeds. */
  readonly outputMember?: (member: MemberContext) => ReadonlyArray<AttributeRule> | undefined;
}

export interface OperationContext {
  /** rpc.method service part (`S3`, `Zones`, `compute`). */
  readonly service: string;
  /** Operation shape local name (`GetObject`). */
  readonly name: string;
  readonly def: any;
}

export interface MemberContext extends OperationContext {
  readonly member: string;
  readonly traits: Readonly<Record<string, unknown>>;
}

/** Request id headers most REST APIs send, recorded as OTel `http.response.header.*`. */
const REQUEST_ID_HEADERS = ["x-request-id", "request-id"];

const header = (name: string): HeaderRule => ({
  header: name,
  name: `http.response.header.${name}`,
  transform: "list",
});

/**
 * Display names (span-name prefixes) where PascalCase of the package name
 * misses the brand's casing, and provider-specific request id headers.
 */
const PROVIDERS: Readonly<
  Record<
    string,
    TelemetryOptions & {
      readonly headers?: string[];
      /** Request id headers with a convention name of their own. */
      readonly namedHeaders?: ReadonlyArray<HeaderRule>;
    }
  >
> = {
  "apache-superset": { prefix: "ApacheSuperset" },
  argocd: { prefix: "ArgoCD" },
  azure: {
    prefix: "service",
    headers: ["x-ms-correlation-request-id"],
    // semconv v1.43+ names the resource group; other labels stay `azure.<label>`.
    labelNames: { resourceGroupName: "azure.resource_group.name" },
    namedHeaders: [{ header: "x-ms-request-id", name: "azure.service.request.id" }],
    // The resource provider the call goes to: the last
    // `/providers/<Namespace>/` of the path.
    operation: ({ def }) => {
      const uri = (def.traits?.["smithy.api#http"] as { uri?: string } | undefined)?.uri;
      const all = uri ? [...uri.matchAll(/\/providers\/(Microsoft\.[A-Za-z0-9]+)(?=\/|$)/gi)] : [];
      const namespace = all.at(-1)?.[1];
      return namespace
        ? { attributes: { "azure.resource_provider.namespace": namespace } }
        : undefined;
    },
  },
  "boat-dev": { prefix: "Boat" },
  cloudflare: {
    headers: ["cf-ray"],
    // R2 buckets and objects under the names the S3 SDK path also records
    // (packages/aws/scripts/telemetry.ts), so both paths line up.
    member: ({ service, member }) =>
      service.startsWith("R2") && member === "bucket_name"
        ? [{ name: "cloudflare.r2.bucket" }]
        : service.startsWith("R2") && member === "object_name"
          ? [{ name: "cloudflare.r2.object_key" }]
          : undefined,
  },
  customerio: { prefix: "CustomerIo" },
  digitalocean: { prefix: "DigitalOcean" },
  "fly-io": { prefix: "Fly", headers: ["fly-request-id"] },
  gcp: {
    prefix: "service",
    headers: ["x-goog-request-id"],
    // `gcp.client.service`: the service domain's first label
    // (`compute.googleapis.com` -> `compute`).
    modelAttributes: ({ metadata }) => {
      const host = /^https?:\/\/([^/:]+)/.exec(String(metadata?.baseUrl ?? ""))?.[1];
      const service = host?.endsWith(".googleapis.com") ? host.split(".")[0] : undefined;
      return service ? { "gcp.client.service": service } : undefined;
    },
  },
  github: { prefix: "GitHub", headers: ["x-github-request-id"] },
  "google-workspace": { prefix: "service" },
  growthbook: { prefix: "GrowthBook" },
  huggingface: { prefix: "HuggingFace" },
  launchdarkly: { prefix: "LaunchDarkly" },
  "mongodb-atlas": { prefix: "MongoDBAtlas" },
  onepassword: { prefix: "OnePassword" },
  opencode: { prefix: "OpenCode" },
  ovh: { prefix: "OVH", headers: ["x-ovh-queryid"] },
  paypal: { prefix: "PayPal", headers: ["paypal-debug-id"] },
  planetscale: { prefix: "PlanetScale" },
  posthog: { prefix: "PostHog" },
  "redis-cloud": { prefix: "RedisCloud" },
  spacetimedb: { prefix: "SpacetimeDB" },
  slack: { headers: ["x-slack-req-id"] },
  stackit: { prefix: "STACKIT" },
  surrealdb: { prefix: "SurrealDB" },
  "trigger-dev": { prefix: "TriggerDev" },
  vercel: { headers: ["x-vercel-id"] },
  workos: { prefix: "WorkOS" },
  zerossl: { prefix: "ZeroSSL" },
};

const pascal = (slug: string): string =>
  slug
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

/** `zoneId` / `zone-id` / `ZoneID` → `zone_id`. */
export const snakeCase = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .toLowerCase();

const slugs = new Map<string, string>();

/** `@distilled.cloud/fly-io` → `fly-io`, read from the package root once. */
const slugOf = (root: string): string => {
  let slug = slugs.get(root);
  if (slug === undefined) {
    try {
      const name = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8")).name as string;
      slug = name.replace(/^@distilled\.cloud\//, "");
    } catch {
      slug = path.basename(root);
    }
    slugs.set(root, slug);
  }
  return slug;
};

/**
 * The defaults for a package converted by `finalizeConvert`: span names
 * `<Provider>.<Operation>`, `rpc.system.name` `<package>-api`, path labels
 * as `<package>.<label>`, request id headers.
 */
export const providerDefaults = (root: string, extra?: TelemetryOptions): TelemetryOptions => {
  const slug = slugOf(root);
  const known = PROVIDERS[slug] ?? {};
  const namespace = slug.replaceAll("-", "_");
  return {
    system: `${slug}-api`,
    propagation: "w3c",
    prefix: known.prefix ?? pascal(slug),
    labelNamespace: namespace,
    responseHeaders: [
      ...[...REQUEST_ID_HEADERS, ...(known.headers ?? [])].map(header),
      ...(known.namedHeaders ?? []),
    ],
    ...(known.member ? { member: known.member } : {}),
    ...(known.operation ? { operation: known.operation } : {}),
    ...(known.labelNames ? { labelNames: known.labelNames } : {}),
    ...(known.modelAttributes ? { modelAttributes: known.modelAttributes } : {}),
    ...extra,
  };
};

//#endregion

//#region pass

const local = (id: string): string => id.slice(id.indexOf("#") + 1);

const SENSITIVE = "smithy.api#sensitive";

/** Merge `defaults` under `existing`: fields already set win, attributes merge. */
const fill = <T extends { readonly attributes?: Readonly<Record<string, Scalar>> }>(
  existing: Partial<T> | undefined,
  defaults: T,
): T => {
  const attributes = { ...defaults.attributes, ...existing?.attributes };
  const merged = { ...defaults, ...existing } as T & { attributes?: Record<string, Scalar> };
  if (Object.keys(attributes).length > 0) merged.attributes = attributes;
  else delete merged.attributes;
  return merged;
};

/**
 * Stamp the telemetry traits on one converted model. `resource` is the
 * model's file name; it names the service when the model has no service
 * shape and no `metadata.service`.
 */
export const applyTelemetryTraits = (
  model: { shapes?: Record<string, any>; metadata?: Record<string, any> },
  resource: string,
  options: TelemetryOptions,
): void => {
  const shapes = model.shapes ?? {};
  const serviceId = Object.keys(shapes).find((id) => shapes[id]?.type === "service");
  const service =
    options.service ??
    (serviceId ? local(serviceId) : ((model.metadata?.service as string | undefined) ?? resource));
  const prefix = options.prefix === "service" || !options.prefix ? pascal(service) : options.prefix;

  const serviceTrait: ServiceTrait = fill<ServiceTrait>(
    serviceId ? shapes[serviceId].traits?.[SERVICE_TRAIT] : model.metadata?.[SERVICE_TRAIT],
    {
      system: options.system ?? "unknown-api",
      ...(options.attributes || options.modelAttributes?.(model)
        ? { attributes: { ...options.attributes, ...options.modelAttributes?.(model) } }
        : {}),
      ...(options.responseHeaders?.length ? { responseHeaders: options.responseHeaders } : {}),
      ...(options.hosts?.length ? { hosts: options.hosts } : {}),
      ...(options.propagation ? { propagation: options.propagation } : {}),
    },
  );
  if (serviceId) {
    shapes[serviceId].traits = { ...shapes[serviceId].traits, [SERVICE_TRAIT]: serviceTrait };
  } else {
    model.metadata = { ...model.metadata, [SERVICE_TRAIT]: serviceTrait };
  }

  for (const [id, def] of Object.entries(shapes)) {
    if (def?.type !== "operation") continue;
    const name = local(id);
    const ctx: OperationContext = { service, name, def };
    const http = def.traits?.["smithy.api#http"] as { uri?: string } | undefined;
    const overrides = options.operation?.(ctx);
    const defaults: OperationTrait = {
      name: `${prefix}.${name}`,
      method: `${service}/${name}`,
      ...overrides,
      ...(http?.uri !== undefined || overrides?.attributes
        ? {
            attributes: {
              ...(http?.uri !== undefined ? { "url.template": http.uri.split("?")[0]! } : {}),
              ...overrides?.attributes,
            },
          }
        : {}),
    };
    def.traits = {
      ...def.traits,
      [OPERATION_TRAIT]: fill<OperationTrait>(def.traits?.[OPERATION_TRAIT], defaults),
    };

    const output = def.output?.target ? shapes[def.output.target] : undefined;
    if (output?.type === "structure" && options.outputMember !== undefined) {
      for (const [member, m] of Object.entries<any>(output.members ?? {})) {
        const traits = (m.traits ?? {}) as Record<string, unknown>;
        if (ATTRIBUTES_TRAIT in traits) continue;
        if (SENSITIVE in traits || SENSITIVE in (shapes[m.target]?.traits ?? {})) continue;
        const rules = options.outputMember({ ...ctx, member, traits });
        if (rules?.length) m.traits = { ...traits, [ATTRIBUTES_TRAIT]: rules };
      }
    }

    const input = def.input?.target ? shapes[def.input.target] : undefined;
    if (input?.type !== "structure") continue;
    for (const [member, m] of Object.entries<any>(input.members ?? {})) {
      const traits = (m.traits ?? {}) as Record<string, unknown>;
      if (ATTRIBUTES_TRAIT in traits) continue;
      // Secrets never become attributes, wherever the trait sits.
      if (SENSITIVE in traits || SENSITIVE in (shapes[m.target]?.traits ?? {})) continue;
      const rules: AttributeRule[] = [];
      if (options.labelNamespace && "smithy.api#httpLabel" in traits) {
        rules.push({
          name: options.labelNames?.[member] ?? `${options.labelNamespace}.${snakeCase(member)}`,
        });
      }
      for (const rule of options.member?.({ ...ctx, member, traits }) ?? []) {
        if (!rules.some((r) => r.name === rule.name)) rules.push(rule);
      }
      if (rules.length > 0) m.traits = { ...traits, [ATTRIBUTES_TRAIT]: rules };
    }
  }
};

//#endregion

//#region GraphQL client models

/**
 * The `telemetry` entry of a GraphQL client model (`.generated-graphql/`,
 * which has no Smithy shapes): the service trait plus a span-name prefix
 * and, per `<kind>.<rootField>`, attributes read from root arguments.
 */
export interface GraphQLTelemetryEntry extends ServiceTrait {
  readonly prefix: string;
  readonly fields?: Readonly<
    Record<string, Readonly<Record<string, ReadonlyArray<AttributeRule>>>>
  >;
}

interface GraphQLClientModelLike {
  readonly queryType: string;
  readonly mutationType?: string;
  readonly types: Record<string, { readonly fields?: Record<string, any> }>;
  telemetry?: GraphQLTelemetryEntry;
}

const SCALAR_ARG = /^(String|ID)!?$/;

/**
 * Stamp `model.telemetry`, keeping what a patch already set. Root
 * arguments that identify a resource become attributes under the
 * package's namespace: `projectId` → `railway.project_id`, and `id` on a
 * field returning an object type `Project` → `railway.project_id`.
 */
export const applyGraphQLTelemetry = (
  model: GraphQLClientModelLike,
  options: TelemetryOptions,
): void => {
  const ns = options.labelNamespace;
  const fields: Record<string, Record<string, AttributeRule[]>> = {};
  for (const [kind, typeName] of [
    ["query", model.queryType],
    ["mutation", model.mutationType],
  ] as const) {
    if (typeName === undefined || !ns) continue;
    for (const [field, def] of Object.entries(model.types[typeName]?.fields ?? {})) {
      const returns = String(def.type ?? "").replace(/[[\]!]/g, "");
      const returnsObject = model.types[returns] !== undefined && returns !== typeName;
      const args: Record<string, AttributeRule[]> = {};
      for (const [arg, argDef] of Object.entries<any>(def.args ?? {})) {
        if (!SCALAR_ARG.test(String(argDef?.type ?? ""))) continue;
        const name =
          arg === "id" && returnsObject
            ? `${ns}.${snakeCase(returns)}_id`
            : arg !== "id" && arg.endsWith("Id")
              ? `${ns}.${snakeCase(arg)}`
              : undefined;
        if (name !== undefined) args[arg] = [{ name }];
      }
      if (Object.keys(args).length > 0) fields[`${kind}.${field}`] = args;
    }
  }
  const existing = model.telemetry;
  model.telemetry = {
    system: options.system ?? "unknown-api",
    prefix: options.prefix ?? "GraphQL",
    ...(options.propagation ? { propagation: options.propagation } : {}),
    ...(options.responseHeaders?.length ? { responseHeaders: options.responseHeaders } : {}),
    ...(Object.keys(fields).length > 0 ? { fields } : {}),
    ...existing,
  };
};

/** `src/graphql-telemetry.ts` for a GraphQL client model with a `telemetry` entry. */
export const generateGraphQLTelemetry = (model: GraphQLClientModelLike): string => {
  if (model.telemetry === undefined) throw new Error("GraphQL model has no telemetry entry");
  // The runtime's name for the trait's `propagation`.
  const { propagation, ...entry } = model.telemetry;
  if (propagation !== undefined && propagation !== "w3c") {
    throw new Error(`GraphQL telemetry: unsupported propagation ${propagation}`);
  }
  const telemetry = propagation === undefined ? entry : { ...entry, propagate: propagation };
  return [
    "// AUTO-GENERATED by scripts/generate.ts from the GraphQL model's telemetry entry. Do not edit.",
    'import type { GraphQLTelemetry } from "@distilled.cloud/core/graphql";',
    "",
    "/** Span facts for every document this SDK sends. */",
    `export const TELEMETRY: GraphQLTelemetry = ${JSON.stringify(telemetry)};`,
    "",
  ].join("\n");
};

//#endregion
