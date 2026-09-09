/**
 * Fixture registry. Every fixture is an entry file under `fixtures/` plus
 * the tree-shake expectations checked against the bundle text.
 *
 * Markers are regexes over string literals (operation names / route URIs)
 * rather than identifiers so they survive `minify: true` (whitespace and
 * identifier mangling) unchanged.
 */
export interface ShakeMarker {
  /** Human label shown in the report. */
  readonly label: string;
  /** Pattern searched in the output chunk. */
  readonly pattern: RegExp;
}

export interface Fixture {
  readonly name: string;
  readonly entry: string;
  readonly description: string;
  /** Must be present — proves the used operation survived. */
  readonly expect: ReadonlyArray<ShakeMarker>;
  /** Must be absent — services / operations the entry never references. */
  readonly forbid: ReadonlyArray<ShakeMarker>;
  /**
   * Service source files whose operations are counted (`operationName: "`
   * for AWS, `uri: "` for Cloudflare) to report "ops retained / ops total".
   */
  readonly services: ReadonlyArray<ServiceRef>;
}

export interface ServiceRef {
  readonly pkg: "aws" | "cloudflare";
  readonly file: string;
}

// --- markers ----------------------------------------------------------------
const s3GetObject: ShakeMarker = {
  label: "s3.GetObject",
  pattern: /operationName:\s*[`"']GetObject[`"']/,
};
const s3PutObject: ShakeMarker = {
  label: "s3.PutObject (unused op, same service)",
  pattern: /operationName:\s*[`"']PutObject[`"']/,
};
const s3ListBuckets: ShakeMarker = {
  label: "s3.ListBuckets (unused op, same service)",
  pattern: /operationName:\s*[`"']ListBuckets[`"']/,
};
const ddbPutItem: ShakeMarker = {
  label: "dynamodb.PutItem",
  pattern: /operationName:\s*[`"']PutItem[`"']/,
};
const lambdaInvoke: ShakeMarker = {
  label: "lambda.Invoke",
  pattern: /operationName:\s*[`"']Invoke[`"']/,
};
const cfListScripts: ShakeMarker = {
  label: "workers.listScripts",
  pattern: /["'`]\/accounts\/\{account_id\}\/workers\/scripts["'`]/,
};
const cfScriptSecrets: ShakeMarker = {
  label: "workers.listScriptSecrets (unused op, same service)",
  pattern: /\/workers\/scripts\/\{script_name\}\/secrets/,
};
const cfKv: ShakeMarker = {
  label: "kv.*",
  pattern: /\/storage\/kv\/namespaces/,
};
const cfD1: ShakeMarker = {
  label: "d1.*",
  pattern: /\/d1\/database/,
};

const awsS3: ServiceRef = { pkg: "aws", file: "s3.ts" };
const cfWorkers: ServiceRef = { pkg: "cloudflare", file: "workers.ts" };

const awsForbid = [
  s3PutObject,
  s3ListBuckets,
  ddbPutItem,
  lambdaInvoke,
  cfKv,
  cfD1,
];
const cfForbid = [cfScriptSecrets, cfKv, cfD1, ddbPutItem, lambdaInvoke];

export const fixtures: ReadonlyArray<Fixture> = [
  {
    name: "aws-s3-deep",
    entry: "fixtures/aws-s3-deep.ts",
    description:
      "`@distilled.cloud/aws/s3` + `/Credentials`, one op (GetObject)",
    expect: [s3GetObject],
    forbid: [...awsForbid, cfListScripts],
    services: [awsS3],
  },
  {
    name: "aws-barrel",
    entry: "fixtures/aws-barrel.ts",
    description: "`@distilled.cloud/aws` root barrel (+ `/s3` deep) — same op",
    expect: [s3GetObject],
    forbid: [...awsForbid, cfListScripts],
    services: [awsS3],
  },
  {
    name: "aws-services-index",
    entry: "fixtures/aws-services-index.ts",
    description:
      "`@distilled.cloud/aws/index` — all ~430 services as namespaces, only S3.getObject used",
    expect: [s3GetObject],
    forbid: [...awsForbid, cfListScripts],
    services: [awsS3],
  },
  {
    name: "cf-workers-deep",
    entry: "fixtures/cf-workers-deep.ts",
    description:
      "`@distilled.cloud/cloudflare/workers` + `/Credentials`, one paginated op (listScripts)",
    expect: [cfListScripts],
    forbid: [...cfForbid, s3GetObject],
    services: [cfWorkers],
  },
  {
    name: "cf-barrel",
    entry: "fixtures/cf-barrel.ts",
    description:
      "`@distilled.cloud/cloudflare` root barrel (Services.* — ~120 services), same op",
    expect: [cfListScripts],
    forbid: [...cfForbid, s3GetObject],
    services: [cfWorkers],
  },
  {
    name: "combined-worker",
    entry: "fixtures/combined-worker.ts",
    description:
      "alchemy-worker-shaped: s3.getObject + workers.listScripts (two deep imports)",
    expect: [s3GetObject, cfListScripts],
    forbid: [
      s3PutObject,
      s3ListBuckets,
      ddbPutItem,
      lambdaInvoke,
      cfScriptSecrets,
      cfKv,
      cfD1,
    ],
    services: [awsS3, cfWorkers],
  },
];
