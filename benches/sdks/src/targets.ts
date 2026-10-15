/**
 * Which credentials layer and which operations each SDK is measured with.
 *
 * A target is a handful of import aliases plus two JS expressions over
 * them: `auth` (a Layer that provides the SDK's credentials) and `call`
 * (an Effect that runs one operation). The same text is evaluated by the
 * runtime probe (against `lib/*.js`) and pasted into the bundle and
 * typecheck fixtures, so every suite measures the same program.
 *
 * Every SDK gets one target per protocol its operations use: each distinct
 * `protocol:` layer in the generated operations (Cloudflare's paginated
 * layer, Fly.io's Machines / API / Sprites / GraphQL layers, …) and, for
 * AWS, each wire family (`restXml`, `restJson1`, `awsJson1_0`,
 * `awsJson1_1`, `awsQuery`, `ec2Query`) the single AwsProtocol layer
 * dispatches on. One target per SDK is `primary`: its numbers are the
 * SDK-level numbers, so history stays comparable when protocols are added.
 *
 * Targets are picked once by static analysis of `src/services/*.ts` plus a
 * mocked-transport trial run (`discover`), then frozen in `targets.json`
 * so later runs stay comparable. `OVERRIDES` / `PROTOCOL_OVERRIDES` pin the
 * picks that the generic ranking would get wrong or unrepresentative.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { BENCH_DIR, PACKAGES, readJson } from "./util.ts";

/**
 * Import specifiers used by targets:
 *   `pkg:<path>`   a module of the SDK, path under src/ without extension
 *   `core:<path>`  a module of @distilled.cloud/core
 *   anything else  a bare specifier (effect/…)
 */
export type ImportSpec = string;

export interface CannedResponse {
  readonly status: number;
  readonly headers: Record<string, string>;
  readonly body: string;
}

export interface Target {
  readonly pkg: string;
  /** Protocol this target exercises (see `protocolOf`). */
  readonly protocol: string;
  /** The SDK-level program: its numbers are the SDK's numbers. */
  readonly primary?: boolean;
  /** Alias → import spec. `Op` and `Credentials` are always present. */
  readonly imports: Record<string, ImportSpec>;
  /** Layer expression providing the SDK's credentials (and any other context it needs). */
  readonly auth: string;
  /** Effect expression for one operation call. */
  readonly call: string;
  /** Short human label, e.g. `s3.getObject`. */
  readonly label: string;
  /** Env vars the auth layer reads (dummy values; never real secrets). */
  readonly env: Record<string, string>;
  /** Canned 2xx response the mock transport returns. */
  readonly response: CannedResponse;
  /** A response the call accepts under ResponseValidation.strict, when `response` is not. */
  readonly strictResponse?: CannedResponse;
  /** Set for targets from `OVERRIDES`; `--rediscover` leaves them alone. */
  readonly pinned?: boolean;
  readonly note?: string;
}

/** Aliases every expression may use without declaring them. */
export const BUILTIN_IMPORTS: Record<string, string> = {
  Effect: "effect/Effect",
  Layer: "effect/Layer",
  Redacted: "effect/Redacted",
};

//#region Static analysis

export interface OpInfo {
  readonly module: string;
  readonly op: string;
  readonly request: string;
  readonly required: Record<string, unknown>;
  readonly requiredCount: number;
  readonly method?: string;
  readonly protocol: string;
}

const OP_RE = /^export const (\w+): API\.(?:Paginated)?OperationMethod<\s*(\w+),/gm;

/** AWS service files declare their wire family once: `const proto = T.AwsProtocolsRestXml()`. */
const AWS_FAMILY_RE = /^const proto = (?:\/\*[@#]__PURE__\*\/ )?T\.AwsProtocols(\w+)\(/m;
const awsFamily = (trait: string): string => trait.charAt(0).toLowerCase() + trait.slice(1);

/** Name of the `protocol:` layer in the operation definition that starts at `index`. */
const protocolLayerAt = (source: string, index: number): string | undefined => {
  const end = source.indexOf("\nexport const ", index + 1);
  const block = source.slice(index, end === -1 ? index + 4000 : Math.min(end, index + 4000));
  return /\bprotocol: (\w+),/.exec(block)?.[1];
};

/** Protocol label for SDKs without generated operations (hand-written targets). */
export const FIXED_PROTOCOL = "graphql";

/** Placeholder value for a required member, from its declared TS type text. */
const placeholder = (type: string): unknown => {
  const t = type.trim().replace(/;$/, "");
  if (/^string\b/.test(t) || t.startsWith("Redacted.Redacted<string>")) return "bench";
  if (/^number\b/.test(t)) return 1;
  if (/^boolean\b/.test(t)) return true;
  if (/^(Array<|.*\[\]$)/.test(t)) return [];
  const literal = /^"([^"]*)"/.exec(t);
  if (literal) return literal[1];
  return {};
};

const parseRequired = (source: string, request: string): Record<string, unknown> | undefined => {
  const start = source.indexOf(`export interface ${request} {`);
  if (start === -1) {
    // `export interface X {}` on one line, or a type alias.
    if (source.includes(`export interface ${request} {}`)) return {};
    return undefined;
  }
  const end = source.indexOf("\n}", start);
  const body = source.slice(start, end);
  const required: Record<string, unknown> = {};
  for (const m of body.matchAll(/^ {2}(?:readonly )?("[^"]+"|[\w$]+)(\??): (.+)$/gm)) {
    if (m[2] === "?") continue;
    const name = m[1]!.replace(/^"|"$/g, "");
    required[name] = placeholder(m[3]!);
  }
  return required;
};

/** Every operation in a package, with its required input members. */
export const listOperations = (pkg: string): OpInfo[] => {
  const dir = join(PACKAGES, pkg, "src", "services");
  if (!existsSync(dir)) return [];
  const ops: OpInfo[] = [];
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith(".ts") || file === "index.ts") continue;
    const source = readFileSync(join(dir, file), "utf8");
    const family = AWS_FAMILY_RE.exec(source)?.[1];
    for (const m of source.matchAll(OP_RE)) {
      const required = parseRequired(source, m[2]!);
      if (!required) continue;
      const method = new RegExp(`export const ${m[2]} =[\\s\\S]{0,4000}?method: "(\\w+)"`).exec(
        source,
      )?.[1];
      ops.push({
        module: `services/${file.slice(0, -3)}`,
        op: m[1]!,
        request: m[2]!,
        required,
        requiredCount: Object.keys(required).length,
        method,
        protocol: family ? awsFamily(family) : (protocolLayerAt(source, m.index) ?? "unknown"),
      });
    }
  }
  return ops;
};

/** Operation count per protocol, most-used first. */
export const protocolsOf = (ops: ReadonlyArray<OpInfo>): Array<[protocol: string, ops: number]> => {
  const counts = new Map<string, number>();
  for (const o of ops) counts.set(o.protocol, (counts.get(o.protocol) ?? 0) + 1);
  return [...counts].sort(([a, x], [b, y]) => y - x || a.localeCompare(b));
};

export const countOperations = (pkg: string): { services: number; operations: number } => {
  const dir = join(PACKAGES, pkg, "src", "services");
  if (!existsSync(dir)) return { services: 0, operations: 0 };
  let services = 0;
  let operations = 0;
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".ts") || file === "index.ts") continue;
    services++;
    operations += readFileSync(join(dir, file), "utf8").match(OP_RE)?.length ?? 0;
  }
  return { services, operations };
};

const prefixRank = (op: string): number => {
  const lower = op.toLowerCase();
  if (lower.startsWith("list")) return 0;
  if (lower.startsWith("get") || lower.startsWith("describe")) return 1;
  return 3;
};

/** Candidates in preference order: fewest required inputs, read-only verbs, GET, short names. */
export const rankOperations = (ops: ReadonlyArray<OpInfo>, preferModule?: string): OpInfo[] =>
  [...ops]
    .filter((o) => !preferModule || o.module === preferModule)
    .sort(
      (a, b) =>
        a.requiredCount - b.requiredCount ||
        prefixRank(a.op) - prefixRank(b.op) ||
        Number(b.method === "GET") - Number(a.method === "GET") ||
        a.op.length - b.op.length ||
        a.op.localeCompare(b.op),
    );

/** Env var names a package's credentials module reads. */
export const envVarsFor = (pkg: string): Record<string, string> => {
  const file = join(PACKAGES, pkg, "src", "credentials.ts");
  if (!existsSync(file)) return {};
  const source = readFileSync(file, "utf8");
  const names = new Set<string>();
  for (const m of source.matchAll(/process\.env\.([A-Z][A-Z0-9_]+)/g)) names.add(m[1]!);
  for (const m of source.matchAll(/process\.env\[["']([A-Z][A-Z0-9_]+)["']\]/g)) names.add(m[1]!);
  for (const m of source.matchAll(/Config\.\w+\(\s*["']([A-Z][A-Z0-9_]+)["']/g)) names.add(m[1]!);
  const env: Record<string, string> = {};
  for (const name of [...names].sort()) {
    const value = dummyEnvValue(name);
    if (value !== undefined) env[name] = value;
  }
  return env;
};

/**
 * A dummy value by name shape. Optional knobs (versions, modes, regions)
 * stay unset so the SDK uses its defaults.
 */
const dummyEnvValue = (name: string): string | undefined => {
  if (name.endsWith("SUBDOMAIN")) return "bench";
  if (name.endsWith("DOMAIN")) return "bench.example.com";
  if (/(URL|URI|HOST|HOSTNAME|ENDPOINT|SERVER|BASE)$/.test(name)) {
    // Optional base-URL overrides fall back to the SDK default.
    if (name.endsWith("API_BASE_URL") || name.endsWith("_API_URL")) return undefined;
    return "https://bench.example.com";
  }
  if (/(VERSION|STAGING|ENV|SCHEME|TYPE|REGION|ACTOR|USER_AGENT|PATH|PREFIX|WINDOW_MS)$/.test(name))
    return undefined;
  if (/(_ID|ORGANIZATION|ORG_ID|BASIN)$/.test(name)) return "bench-id";
  if (name.endsWith("EMAIL")) return "bench@example.com";
  if (/(KEY|TOKEN|SECRET|PASSWORD|USERNAME)$/.test(name)) return "bench-secret";
  return undefined;
};

//#endregion

//#region Overrides

const JSON_HEADERS = { "content-type": "application/json" };
const json = (body: unknown, status = 200): CannedResponse => ({
  status,
  headers: JSON_HEADERS,
  body: JSON.stringify(body),
});

/**
 * Hand-pinned targets. The four large multi-service SDKs are pinned to the
 * service and call their existing benches/README use (S3 getObject,
 * Workers listScripts, …), and SDKs whose credentials are not a plain
 * `CredentialsFromEnv` get an explicit layer.
 */
export const OVERRIDES: Record<string, Partial<Target> & { module?: string; op?: string }> = {
  aws: {
    module: "services/s3",
    op: "listBuckets",
    imports: { Credentials: "pkg:credentials" },
    auth: `Credentials.fromCredentials({ accessKeyId: Redacted.make("AKIA_BENCH"), secretAccessKey: Redacted.make("bench") }, "us-east-1")`,
    response: {
      status: 200,
      headers: { "content-type": "application/xml" },
      body: `<?xml version="1.0" encoding="UTF-8"?><ListAllMyBucketsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>1</ID></Owner><Buckets><Bucket><Name>bench</Name><CreationDate>2025-01-01T00:00:00.000Z</CreationDate></Bucket></Buckets></ListAllMyBucketsResult>`,
    },
    env: {},
    pinned: true,
  },
  gcp: {
    module: "services/storage_v1",
    op: "listBuckets",
    imports: { Credentials: "pkg:credentials" },
    auth: `Credentials.fromAccessToken({ accessToken: Redacted.make("bench-token"), project: "bench-project" })`,
    response: json({ kind: "storage#buckets", items: [] }),
    env: {},
    pinned: true,
  },
  cloudflare: {
    module: "services/workers",
    op: "listScripts",
    imports: { Credentials: "pkg:credentials" },
    auth: `Credentials.fromApiToken({ apiToken: Redacted.make("bench-token") })`,
    response: json({ success: true, errors: [], messages: [], result: [] }),
    env: {},
    pinned: true,
  },
  azure: { module: "services/resources", pinned: true },
  celld: {
    imports: { Credentials: "pkg:endpoint" },
    auth: `Credentials.of("https://bench.example.com")`,
    env: {},
    pinned: true,
  },
  coinbase: {
    // Requests are signed per call; a throwaway Ed25519 key generated for this bench.
    env: {
      CDP_API_KEY_ID: "bench-id",
      CDP_API_KEY_SECRET:
        "8ko1h627pg6Lm2h0uh8tbXMWXt9KPOZAvuKI0U2n72AjZlp5wiEaA1XjBb94Wl7A3v4qa2aJelkrBoCw9Z/tRA==",
    },
  },
  kubernetes: {
    env: { KUBERNETES_TOKEN: "bench-secret", KUBERNETES_API_URL: "https://bench.example.com" },
  },
  typesense: {
    env: { TYPESENSE_API_KEY: "bench-secret", TYPESENSE_API_URL: "https://bench.example.com" },
  },
  "mongodb-atlas": {
    // CredentialsFromEnv exchanges client credentials over the network; use a static token.
    auth: `Credentials.fromAccessToken({ accessToken: Redacted.make("bench-token") })`,
    env: {},
  },
  railway: {
    label: "Railway.me().email",
    imports: {
      Credentials: "pkg:credentials",
      Railway: "pkg:index",
      Query: "core:query",
    },
    auth: `Layer.provideMerge(Railway.GraphQLLive, Credentials.CredentialsFromEnv)`,
    call: `Query.Query.fn(() => ({ email: Railway.Railway.me().email }))()`,
    response: json({ data: { me: { email: "bench@example.com" } } }),
    env: { RAILWAY_API_TOKEN: "bench-secret" },
    pinned: true,
  },
};

/**
 * Pinned picks for the protocols that are not an SDK's primary one. AWS
 * gets one well-known call per wire family, with a response in that
 * family's wire format.
 */
export const PROTOCOL_OVERRIDES: Record<
  string,
  Record<string, { module: string; op: string; response: CannedResponse }>
> = {
  aws: {
    restJson1: {
      module: "services/lambda",
      op: "listFunctions",
      response: json({ Functions: [] }),
    },
    awsJson1_0: {
      module: "services/dynamodb",
      op: "listTables",
      response: {
        status: 200,
        headers: { "content-type": "application/x-amz-json-1.0" },
        body: JSON.stringify({ TableNames: [] }),
      },
    },
    awsJson1_1: {
      module: "services/kms",
      op: "listKeys",
      response: {
        status: 200,
        headers: { "content-type": "application/x-amz-json-1.1" },
        body: JSON.stringify({ Keys: [], Truncated: false }),
      },
    },
    awsQuery: {
      module: "services/sts",
      op: "getCallerIdentity",
      response: {
        status: 200,
        headers: { "content-type": "text/xml" },
        body: `<GetCallerIdentityResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/"><GetCallerIdentityResult><Arn>arn:aws:iam::123456789012:user/bench</Arn><UserId>AIDABENCH</UserId><Account>123456789012</Account></GetCallerIdentityResult><ResponseMetadata><RequestId>1</RequestId></ResponseMetadata></GetCallerIdentityResponse>`,
      },
    },
    ec2Query: {
      module: "services/ec2",
      op: "describeRegions",
      response: {
        status: 200,
        headers: { "content-type": "text/xml" },
        body: `<DescribeRegionsResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/"><requestId>1</requestId><regionInfo><item><regionName>us-east-1</regionName><regionEndpoint>ec2.us-east-1.amazonaws.com</regionEndpoint><optInStatus>opt-in-not-required</optInStatus></item></regionInfo></DescribeRegionsResponse>`,
      },
    },
  },
};

//#endregion

//#region Persistence

export const TARGETS_FILE = join(BENCH_DIR, "targets.json");

/** pkg → protocol → target. Exactly one target per pkg is `primary`. */
export type TargetsFile = Record<string, Record<string, Target>>;

/** The SDK-level target of a package. */
export const primaryOf = (byProtocol: Record<string, Target> | undefined): Target | undefined =>
  byProtocol ? Object.values(byProtocol).find((t) => t.primary) : undefined;

/** Protocol of an older flat entry (one target per pkg, no `protocol` field). */
const migrateProtocol = (t: Omit<Target, "protocol">): string => {
  const op = /\bOp\.(\w+)\(/.exec(t.call)?.[1];
  const module = t.imports.Op?.replace(/^pkg:/, "");
  if (!op || !module) return FIXED_PROTOCOL;
  return (
    listOperations(t.pkg).find((o) => o.module === module && o.op === op)?.protocol ?? "unknown"
  );
};

export const loadTargets = (): TargetsFile => {
  if (!existsSync(TARGETS_FILE)) return {};
  const raw = readJson<Record<string, any>>(TARGETS_FILE);
  const out: TargetsFile = {};
  for (const [pkg, v] of Object.entries(raw)) {
    if (typeof v.pkg === "string") {
      // Flat shape: the single target becomes the primary one.
      const protocol = migrateProtocol(v);
      out[pkg] = { [protocol]: { ...v, protocol, primary: true } };
    } else out[pkg] = v;
  }
  return out;
};

export const saveTargets = (targets: TargetsFile) => {
  const sorted = Object.fromEntries(
    Object.entries(targets)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([pkg, byProtocol]) => [
        pkg,
        // Primary first, then by name, so diffs of targets.json stay small.
        Object.fromEntries(
          Object.entries(byProtocol).sort(
            ([a, x], [b, y]) => Number(!!y.primary) - Number(!!x.primary) || a.localeCompare(b),
          ),
        ),
      ]),
  );
  writeFileSync(TARGETS_FILE, `${JSON.stringify(sorted, null, 2)}\n`);
};

//#endregion

//#region Building targets

/** A target for `op` in `module`, with the package's default auth. */
export const targetFor = (
  pkg: string,
  info: OpInfo,
  response: CannedResponse,
  primary: boolean,
): Target => {
  const o = OVERRIDES[pkg] ?? {};
  const imports = { Credentials: "pkg:credentials", ...o.imports, Op: `pkg:${info.module}` };
  const input = JSON.stringify(info.required);
  // A pinned label/call belongs to the primary pick; auth, env and imports apply to every protocol.
  const pinned = primary ? o.pinned : !!PROTOCOL_OVERRIDES[pkg]?.[info.protocol];
  return {
    pkg,
    protocol: info.protocol,
    ...(primary ? { primary: true } : {}),
    imports,
    auth: o.auth ?? "Credentials.CredentialsFromEnv",
    call: (primary && o.call) || `Op.${info.op}(${input})`,
    label: (primary && o.label) || `${info.module.replace(/^services\//, "")}.${info.op}`,
    env: o.env ?? envVarsFor(pkg),
    response,
    ...(pinned ? { pinned: true } : {}),
    ...(o.note ? { note: o.note } : {}),
  };
};

/** A fully hand-written target (no generated operation), e.g. railway. */
export const fixedTarget = (pkg: string): Target | undefined => {
  const o = OVERRIDES[pkg];
  if (!o?.call || !o.auth || !o.imports || !o.response) return undefined;
  return {
    pkg,
    protocol: FIXED_PROTOCOL,
    primary: true,
    imports: o.imports,
    auth: o.auth,
    call: o.call,
    label: o.label ?? o.call,
    env: o.env ?? {},
    response: o.response,
    pinned: true,
  };
};

/** Response bodies tried in order during discovery (lenient mode accepts most). */
export const CANDIDATE_RESPONSES: CannedResponse[] = [
  json({}),
  json([]),
  json({ success: true, errors: [], messages: [], result: {} }),
  json({ data: {} }),
  { status: 204, headers: {}, body: "" },
];

//#endregion

//#region Resolution

export interface ResolvedImport {
  readonly alias: string;
  /** Absolute path / bare specifier for the built JS (runtime probe). */
  readonly lib: string;
  /** Absolute path / bare specifier for TS sources (bundle fixtures, the `bun` condition). */
  readonly src: string;
}

export const resolveImports = (target: Target): ResolvedImport[] =>
  Object.entries({ ...BUILTIN_IMPORTS, ...target.imports }).map(([alias, spec]) => {
    if (spec.startsWith("pkg:")) {
      const sub = spec.slice(4);
      return {
        alias,
        lib: join(PACKAGES, target.pkg, "lib", `${sub}.js`),
        src: join(PACKAGES, target.pkg, "src", `${sub}.ts`),
      };
    }
    if (spec.startsWith("core:")) {
      const sub = spec.slice(5);
      return {
        alias,
        lib: join(PACKAGES, "core", "lib", `${sub}.js`),
        src: join(PACKAGES, "core", "src", `${sub}.ts`),
      };
    }
    return { alias, lib: spec, src: spec };
  });

//#endregion
