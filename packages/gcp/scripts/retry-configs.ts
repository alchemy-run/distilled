/**
 * The retry numbers Google's client libraries use, as `distilled.retry#policy`
 * traits for discovery methods.
 *
 * Discovery documents carry no retry policy. googleapis does, per gRPC
 * method, in `*_grpc_service_config.json`; the mirror keeps those files
 * verbatim under `specs/googleapis/`, with `http-rules.json` (each gRPC
 * method's `google.api.http` bindings) and `hosts.json` (each gRPC service's
 * default host). A discovery method gets a gRPC method's policy when the
 * host, the HTTP method and the path all match.
 *
 * Most of those policies are copies of a few generated templates (1.3
 * multiplier, 100ms or 1s initial backoff, 10s or 60s cap): 73% of them on
 * 2026-11-12. A template says nothing about the method, so it is skipped and
 * the method keeps distilled's default. A method listed with no
 * `retryPolicy` gets one attempt ({@link NO_RETRY}). Only the numbers are
 * read: what retries comes from the error's marks (see core
 * `isTransientError`).
 */
import * as fs from "node:fs";
import * as path from "node:path";

export interface RetryTrait {
  maxAttempts?: number;
  baseMs?: number;
  capMs?: number;
  factor?: number;
}

/**
 * A method listed with no `retryPolicy` in a config that gives other
 * methods one: the team chose not to retry it, and Google's clients make
 * one attempt, so distilled does too (e.g. Secret Manager `CreateSecret`,
 * next to a retried `AccessSecretVersion`). A config that retries nothing
 * (a timeout for the whole service) is boilerplate and changes nothing.
 * A GET keeps distilled's default: a read cannot repeat work, and the GETs
 * left unlisted look like methods added after the config was written.
 */
export const NO_RETRY: RetryTrait = { maxAttempts: 1 };

interface RetryPolicy {
  readonly maxAttempts?: number;
  readonly initialBackoff?: string;
  readonly maxBackoff?: string;
  readonly backoffMultiplier?: number;
}

interface MethodConfig {
  readonly name?: ReadonlyArray<{ readonly service?: string; readonly method?: string }>;
  readonly retryPolicy?: RetryPolicy;
}

interface HttpBinding {
  readonly method: string;
  readonly path: string;
}

/** `"0.100s"` → 100. */
const millis = (duration: string | undefined): number | undefined => {
  const match = duration === undefined ? null : /^(\d+(?:\.\d+)?)s$/.exec(duration);
  return match === null ? undefined : Math.round(Number(match[1]) * 1000);
};

/** The trait for a policy, or undefined for a template or an unreadable one. */
export const traitOf = (policy: RetryPolicy): RetryTrait | undefined => {
  const baseMs = millis(policy.initialBackoff);
  const capMs = millis(policy.maxBackoff);
  const factor = policy.backoffMultiplier;
  if (baseMs === undefined || capMs === undefined || factor === undefined) return undefined;
  const template =
    factor === 1.3 && (baseMs === 100 || baseMs === 1000) && (capMs === 10_000 || capMs === 60_000);
  if (template) return undefined;
  return {
    ...(policy.maxAttempts !== undefined ? { maxAttempts: policy.maxAttempts } : {}),
    baseMs,
    capMs,
    factor,
  };
};

/**
 * A path in one form for both sides: `/v1/{name=projects/*}/secrets` (a
 * proto binding) and `v1/projects/{projectsId}/secrets` (a discovery
 * `flatPath`) get the same key.
 */
export const pathKey = (template: string): string =>
  template
    .replace(/^\//, "")
    .replace(/\{[^}=]+=([^}]*)\}/g, "$1")
    .replace(/\{[^}]*\}/g, "*")
    .replace(/\*\*/g, "*");

const key = (host: string, method: string, template: string) =>
  `${host} ${method.toUpperCase()} ${pathKey(template)}`;

const serviceConfigs = (dir: string): string[] =>
  fs
    .readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((p) => p.endsWith("_grpc_service_config.json"))
    .map((p) => path.join(dir, p));

/**
 * The lookup from a discovery method to its trait. `specsDir` is the
 * mirror's `specs/` directory.
 */
export const loadRetryTraits = (
  specsDir: string,
): ((host: string, httpMethod: string, flatPath: string) => RetryTrait | undefined) => {
  const dir = path.join(specsDir, "googleapis");
  const rulesPath = path.join(dir, "http-rules.json");
  if (!fs.existsSync(rulesPath)) {
    throw new Error(
      `${rulesPath} is missing: the spec mirror predates googleapis retry configs; run \`pnpm --filter @distilled.cloud/gcp run specs:update\``,
    );
  }
  const rules: Record<string, HttpBinding[]> = JSON.parse(fs.readFileSync(rulesPath, "utf8"));
  const hosts: Record<string, string> = JSON.parse(
    fs.readFileSync(path.join(dir, "hosts.json"), "utf8"),
  );

  // gRPC method → trait. A method's own entry wins over its service's.
  const byService = new Map<string, RetryTrait | null>();
  const byMethod = new Map<string, RetryTrait | null>();
  for (const file of serviceConfigs(dir)) {
    const config = JSON.parse(fs.readFileSync(file, "utf8")) as {
      methodConfig?: MethodConfig[];
    };
    const retriesSome = (config.methodConfig ?? []).some((e) => e.retryPolicy !== undefined);
    for (const entry of config.methodConfig ?? []) {
      // null: distilled's default applies (a template, or no signal).
      const trait =
        entry.retryPolicy === undefined
          ? retriesSome
            ? NO_RETRY
            : null
          : (traitOf(entry.retryPolicy) ?? null);
      for (const name of entry.name ?? []) {
        if (name.service === undefined) continue;
        if (name.method === undefined) byService.set(name.service, trait);
        else byMethod.set(`${name.service}/${name.method}`, trait);
      }
    }
  }

  const traits = new Map<string, RetryTrait>();
  for (const [grpcMethod, bindings] of Object.entries(rules)) {
    const service = grpcMethod.slice(0, grpcMethod.lastIndexOf("/"));
    const host = hosts[service];
    if (host === undefined) continue;
    const trait = byMethod.has(grpcMethod) ? byMethod.get(grpcMethod) : byService.get(service);
    if (trait == null) continue;
    for (const binding of bindings) traits.set(key(host, binding.method, binding.path), trait);
  }
  return (host, httpMethod, flatPath) => {
    const trait = traits.get(key(host, httpMethod, flatPath));
    return trait === NO_RETRY && httpMethod.toUpperCase() === "GET" ? undefined : trait;
  };
};
