/**
 * Cloudflare runtime cases — the alchemy-hot services, one list-style GET and
 * one write-style op each:
 *
 *   workers  listScripts        / putScriptSecret
 *   kv       listNamespaces     / createNamespace
 *   d1       listDatabases      / createDatabase
 *   r2       listBuckets        / createBucket
 *   zones    listZones          / createZone
 *
 * Stages:
 *   encode        Schema.encodeUnknownSync(input schema)     — codec only
 *   decode        Schema.decodeUnknownSync(output schema)    — codec only, on camelCased data.
 *                                                              NOT on the hot path today: the
 *                                                              Cloudflare protocol maps keys and
 *                                                              returns without validating.
 *   wire-decode   JSON.parse + protocol key mapping          — what decode actually costs per
 *                                                              response (mirrors protocol.ts)
 *   build         core/protocol-http buildRequest(...)       — trait-driven request build
 *                                                              (labels, query, snake_case body)
 *   call          op(input) via CloudflareProtocol + mock    — credentials, envelope unwrap,
 *                                                              wire→camelCase key mapping, retry wrapper
 *   call-error    envelope { success:false } → typed error
 *
 * Deep imports (`@distilled.cloud/cloudflare/<service>`).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as Schema from "effect/Schema";

import {
  buildRequest,
  getAnn,
  getProps,
  hasPropAnn,
  mapKeys,
  nameOf,
} from "@distilled.cloud/core/protocol-http";
import { bodySymbol, keyDictionarySymbol } from "@distilled.cloud/core/trait";
import {
  envelopePayloadRootSymbol,
  envelopePayloadSymbol,
  resultInfoSymbol,
} from "@distilled.cloud/cloudflare/Traits";
import * as Credentials from "@distilled.cloud/cloudflare/Credentials";
import * as D1 from "@distilled.cloud/cloudflare/d1";
import * as KV from "@distilled.cloud/cloudflare/kv";
import * as R2 from "@distilled.cloud/cloudflare/r2";
import * as Workers from "@distilled.cloud/cloudflare/workers";
import * as Zones from "@distilled.cloud/cloudflare/zones";

import {
  type Case,
  buildLayer,
  decoder,
  encoder,
  mockHttpLayer,
  runPromise,
} from "./harness.ts";

//#region Fixtures

const ACCOUNT = "023e105f4ecef8ad9ca31a8372d0c353";

const envelope = (result: unknown, extra?: Record<string, unknown>) =>
  JSON.stringify({ success: true, errors: [], messages: [], result, ...extra });

const errorEnvelope = (code: number, message: string) =>
  JSON.stringify({
    success: false,
    errors: [{ code, message }],
    messages: [],
    result: null,
  });

const resultInfo = { page: 1, per_page: 20, count: 20, total_count: 20 };

const scriptItem = (i: number) => ({
  id: `alchemy-worker-${i}`,
  tag: `tag${i.toString(16).padStart(6, "0")}`,
  etag: `etag-${i}`,
  handlers: ["fetch"],
  named_handlers: [{ name: "MyDO", handlers: ["fetch"] }],
  created_on: "2025-01-01T12:34:56.000Z",
  modified_on: "2025-01-02T12:34:56.000Z",
  usage_model: "standard",
  compatibility_date: "2025-01-01",
  compatibility_flags: ["nodejs_compat"],
  has_assets: false,
  has_modules: true,
  logpush: false,
  last_deployed_from: "wrangler",
  observability: {
    enabled: true,
    head_sampling_rate: 1,
    logs: { enabled: true, invocation_logs: true },
  },
  placement: { mode: "smart", status: "SUCCESS" },
  placement_mode: "smart",
  placement_status: "SUCCESS",
  routes: [
    {
      id: `route-${i}`,
      pattern: `example.com/${i}/*`,
      script: `alchemy-worker-${i}`,
    },
  ],
  tags: ["alchemy", "bench"],
  tail_consumers: [],
});

const listScriptsBody = envelope(
  Array.from({ length: 20 }, (_, i) => scriptItem(i)),
  { result_info: resultInfo },
);

const putScriptSecretBody = envelope({ name: "API_KEY", type: "secret_text" });

const listNamespacesBody = envelope(
  Array.from({ length: 20 }, (_, i) => ({
    id: `ns${i.toString(16).padStart(30, "0")}`,
    title: `alchemy-kv-${i}`,
    supports_url_encoding: true,
  })),
  { result_info: resultInfo },
);

const createNamespaceBody = envelope({
  id: "0f2ac74b498b48028cb68387c421e279",
  title: "alchemy-kv",
  supports_url_encoding: true,
});

const kvNotFoundBody = errorEnvelope(10013, "namespace not found");

const listDatabasesBody = envelope(
  Array.from({ length: 20 }, (_, i) => ({
    uuid: `d1-${i.toString(16).padStart(30, "0")}`,
    name: `alchemy-db-${i}`,
    version: "production",
    created_at: "2025-01-01T12:34:56.000Z",
    jurisdiction: null,
  })),
  { result_info: resultInfo },
);

const createDatabaseBody = envelope({
  uuid: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  name: "alchemy-db",
  version: "production",
  created_at: "2025-01-01T12:34:56.000Z",
  file_size: 12288,
  num_tables: 3,
  read_replication: { mode: "disabled" },
});

const listBucketsBody = envelope({
  buckets: Array.from({ length: 20 }, (_, i) => ({
    name: `alchemy-bucket-${i}`,
    creation_date: "2025-01-01T12:34:56.000Z",
    location: "ENAM",
    storage_class: "Standard",
    jurisdiction: "default",
  })),
});

const createBucketBody = envelope({
  name: "alchemy-bucket",
  creation_date: "2025-01-01T12:34:56.000Z",
  location: "ENAM",
  storage_class: "Standard",
  jurisdiction: "default",
});

const zoneItem = (i: number) => ({
  id: `zone${i.toString(16).padStart(28, "0")}`,
  name: `alchemy-${i}.example.com`,
  status: "active",
  paused: false,
  type: "full",
  development_mode: 0,
  name_servers: ["ns1.cloudflare.com", "ns2.cloudflare.com"],
  original_name_servers: ["ns1.registrar.com", "ns2.registrar.com"],
  original_registrar: "Example Registrar",
  original_dnshost: "Example Host",
  modified_on: "2025-01-02T12:34:56.000Z",
  created_on: "2025-01-01T12:34:56.000Z",
  activated_on: "2025-01-01T13:00:00.000Z",
  meta: {
    step: 4,
    custom_certificate_quota: 1,
    page_rule_quota: 3,
    phishing_detected: false,
    multiple_railguns_allowed: false,
  },
  owner: { id: ACCOUNT, type: "organization", name: "Alchemy" },
  account: { id: ACCOUNT, name: "Alchemy" },
  tenant: { id: null, name: null },
  tenant_unit: { id: null },
  permissions: ["#zone:read", "#zone:edit"],
  plan: {
    id: "0feeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    name: "Free Website",
    price: 0,
    currency: "USD",
    frequency: "",
    legacy_id: "free",
    is_subscribed: false,
    can_subscribe: false,
  },
  verification_key: null,
  vanity_name_servers: [],
  cname_suffix: null,
});

const listZonesBody = envelope(
  Array.from({ length: 20 }, (_, i) => zoneItem(i)),
  { result_info: resultInfo },
);

const createZoneBody = envelope(zoneItem(0));

//#endregion

//#region Inputs

const listScriptsInput: Workers.ListScriptsRequest = { accountId: ACCOUNT };
const putScriptSecretInput: Workers.PutScriptSecretRequest = {
  accountId: ACCOUNT,
  scriptName: "alchemy-worker-0",
  name: "API_KEY",
  text: "not-a-real-secret-value",
  type: "secret_text",
};

const listNamespacesInput: KV.ListNamespacesRequest = {
  accountId: ACCOUNT,
  perPage: 20,
};
const createNamespaceInput: KV.CreateNamespaceRequest = {
  accountId: ACCOUNT,
  title: "alchemy-kv",
};
const getNamespaceInput: KV.GetNamespaceRequest = {
  accountId: ACCOUNT,
  namespaceId: "0f2ac74b498b48028cb68387c421e279",
};

const listDatabasesInput: D1.ListDatabasesRequest = {
  accountId: ACCOUNT,
  perPage: 20,
};
const createDatabaseInput: D1.CreateDatabaseRequest = {
  accountId: ACCOUNT,
  name: "alchemy-db",
  primaryLocationHint: "enam",
};

const listBucketsInput: R2.ListBucketsRequest = {
  accountId: ACCOUNT,
  perPage: 20,
};
const createBucketInput: R2.CreateBucketRequest = {
  accountId: ACCOUNT,
  name: "alchemy-bucket",
  locationHint: "enam",
  storageClass: "Standard",
};

const listZonesInput: Zones.ListZonesRequest = {
  account: { id: ACCOUNT },
  perPage: 20,
};
const createZoneInput: Zones.CreateZoneRequest = {
  account: { id: ACCOUNT },
  name: "alchemy.example.com",
  type: "full",
};

//#endregion

//#region Context

const credentials = Credentials.fromApiToken({ apiToken: "cf-test-token" });
const resolvedCreds = Credentials.apiTokenCredentials({
  apiToken: "cf-test-token",
});
const baseHeaders = Credentials.formatHeaders(resolvedCreds);

type Ctx = Context.Context<Credentials.Credentials | HttpClient.HttpClient>;

const cfContext = (body: string, status = 200): Promise<Ctx> =>
  buildLayer(
    Layer.merge(
      credentials,
      mockHttpLayer({
        status,
        headers: { "content-type": "application/json" },
        body,
      }),
    ),
  );

/**
 * The trait-driven request builder from core, with the same arguments the
 * Cloudflare protocol passes (base URL + auth headers + snake_case for unknown
 * keys) — everything `encode` does except resolving the credentials effect.
 */
const camelToSnake = (key: string): string =>
  key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();

const build = (schema: Schema.Top) => {
  const inputAst = schema.ast;
  return (input: unknown) =>
    buildRequest({
      input,
      inputAst,
      baseUrl: resolvedCreds.apiBaseUrl,
      headers: baseHeaders,
      unknownKeyToWire: camelToSnake,
    });
};

const call =
  <A, E>(
    ctx: Ctx,
    effect: () => Effect.Effect<
      A,
      E,
      Credentials.Credentials | HttpClient.HttpClient
    >,
  ) =>
  () =>
    runPromise(Effect.provideContext(effect(), ctx));

/**
 * The wire→TS half of the Cloudflare protocol's decode: JSON.parse the
 * envelope and rename keys (snake_case → camelCase) per the output schema's
 * annotations and key dictionary. The protocol does exactly this for each
 * output member; the schema decoder itself is never run on the hot path
 * (responses are not validated), so this is the per-response cost.
 */
const wireDecode = (schema: Schema.Top, body: string) => {
  const ast = schema.ast;
  const dict = getAnn(ast, keyDictionarySymbol) as
    | Record<string, string>
    | undefined;
  const root = getAnn(ast, envelopePayloadRootSymbol) !== undefined;
  const props = getProps(ast);
  return () => {
    const payload = JSON.parse(body).result;
    if (root) return mapKeys(ast, payload, "decode", dict);
    const result: Record<string, unknown> = {};
    for (const prop of props) {
      const key = String(prop.name);
      if (hasPropAnn(prop, envelopePayloadSymbol)) {
        result[key] = mapKeys(prop.type, payload, "decode", dict);
      } else if (hasPropAnn(prop, resultInfoSymbol)) {
        continue;
      } else {
        const wire = nameOf(prop, bodySymbol);
        if (payload && typeof payload === "object" && wire in payload) {
          result[key] = mapKeys(prop.type, payload[wire], "decode", dict);
        }
      }
    }
    return result;
  };
};

/**
 * Fixture in TS-cased form, produced by the protocol's own key mapping —
 * what the schema decoder would see if response validation were enabled.
 * Paginated responses wrap the payload as `{ result }`.
 */
const camelized = (schema: Schema.Top, body: string, wrap = false) => {
  const ast = schema.ast;
  const dict = getAnn(ast, keyDictionarySymbol) as
    | Record<string, string>
    | undefined;
  const result = JSON.parse(body).result;
  return mapKeys(ast, wrap ? { result } : result, "decode", dict);
};

//#endregion

export const cloudflareCases = async (): Promise<Case[]> => {
  const cases: Case[] = [];

  // -- workers ---------------------------------------------------------------
  {
    const listCtx = await cfContext(listScriptsBody);
    const putCtx = await cfContext(putScriptSecretBody);
    const encList = encoder(Workers.ListScriptsRequest);
    const encPut = encoder(Workers.PutScriptSecretRequest);
    const decList = decoder(Workers.ListScriptsResponse);
    const listDecodedInput = camelized(
      Workers.ListScriptsResponse,
      listScriptsBody,
      true,
    );
    const buildList = build(Workers.ListScriptsRequest);
    const buildPut = build(Workers.PutScriptSecretRequest);
    cases.push(
      {
        provider: "cloudflare",
        service: "workers",
        op: "listScripts",
        stage: "encode",
        note: "label + optional query",
        fn: () => encList(listScriptsInput),
      },
      {
        provider: "cloudflare",
        service: "workers",
        op: "listScripts",
        stage: "decode",
        note: "20 scripts, ~25 fields each",
        fn: () => decList(listDecodedInput),
      },
      {
        provider: "cloudflare",
        service: "workers",
        op: "listScripts",
        stage: "wire-decode",
        note: "JSON.parse + key mapping, 20 scripts",
        fn: wireDecode(Workers.ListScriptsResponse, listScriptsBody),
      },
      {
        provider: "cloudflare",
        service: "workers",
        op: "listScripts",
        stage: "build",
        note: "GET, path label",
        fn: () => buildList(listScriptsInput),
      },
      {
        provider: "cloudflare",
        service: "workers",
        op: "listScripts",
        stage: "call",
        note: "paginated protocol, 20-script envelope",
        fn: call(listCtx, () => Workers.listScripts(listScriptsInput)),
      },
      {
        provider: "cloudflare",
        service: "workers",
        op: "putScriptSecret",
        stage: "encode",
        note: "2 labels + 3 body fields",
        fn: () => encPut(putScriptSecretInput),
      },
      {
        provider: "cloudflare",
        service: "workers",
        op: "putScriptSecret",
        stage: "build",
        note: "PUT, JSON body",
        fn: () => buildPut(putScriptSecretInput),
      },
      {
        provider: "cloudflare",
        service: "workers",
        op: "putScriptSecret",
        stage: "call",
        note: "EnvelopePayloadRoot response",
        fn: call(putCtx, () => Workers.putScriptSecret(putScriptSecretInput)),
      },
    );
  }

  // -- kv --------------------------------------------------------------------
  {
    const listCtx = await cfContext(listNamespacesBody);
    const createCtx = await cfContext(createNamespaceBody);
    const errCtx = await cfContext(kvNotFoundBody, 404);
    const encList = encoder(KV.ListNamespacesRequest);
    const encCreate = encoder(KV.CreateNamespaceRequest);
    const decList = decoder(KV.ListNamespacesResponse);
    const decCreate = decoder(KV.CreateNamespaceResponse);
    const listDecodedInput = camelized(
      KV.ListNamespacesResponse,
      listNamespacesBody,
      true,
    );
    const createDecodedInput = camelized(
      KV.CreateNamespaceResponse,
      createNamespaceBody,
    );
    const buildList = build(KV.ListNamespacesRequest);
    const buildCreate = build(KV.CreateNamespaceRequest);
    cases.push(
      {
        provider: "cloudflare",
        service: "kv",
        op: "listNamespaces",
        stage: "encode",
        note: "label + per_page query",
        fn: () => encList(listNamespacesInput),
      },
      {
        provider: "cloudflare",
        service: "kv",
        op: "listNamespaces",
        stage: "decode",
        note: "20 namespaces",
        fn: () => decList(listDecodedInput),
      },
      {
        provider: "cloudflare",
        service: "kv",
        op: "listNamespaces",
        stage: "wire-decode",
        note: "JSON.parse + key mapping, 20 namespaces",
        fn: wireDecode(KV.ListNamespacesResponse, listNamespacesBody),
      },
      {
        provider: "cloudflare",
        service: "kv",
        op: "listNamespaces",
        stage: "build",
        note: "GET, label + query",
        fn: () => buildList(listNamespacesInput),
      },
      {
        provider: "cloudflare",
        service: "kv",
        op: "listNamespaces",
        stage: "call",
        note: "paginated protocol, 20-namespace envelope",
        fn: call(listCtx, () => KV.listNamespaces(listNamespacesInput)),
      },
      {
        provider: "cloudflare",
        service: "kv",
        op: "createNamespace",
        stage: "encode",
        note: "label + 1 body field",
        fn: () => encCreate(createNamespaceInput),
      },
      {
        provider: "cloudflare",
        service: "kv",
        op: "createNamespace",
        stage: "decode",
        note: "3 fields",
        fn: () => decCreate(createDecodedInput),
      },
      {
        provider: "cloudflare",
        service: "kv",
        op: "createNamespace",
        stage: "build",
        note: "POST, JSON body",
        fn: () => buildCreate(createNamespaceInput),
      },
      {
        provider: "cloudflare",
        service: "kv",
        op: "createNamespace",
        stage: "call",
        note: "3-field envelope",
        fn: call(createCtx, () => KV.createNamespace(createNamespaceInput)),
      },
      {
        provider: "cloudflare",
        service: "kv",
        op: "getNamespace",
        stage: "call-error",
        note: "404 code 10013 → NamespaceNotFound",
        fn: call(errCtx, () =>
          KV.getNamespace(getNamespaceInput).pipe(Effect.flip),
        ),
      },
    );
  }

  // -- d1 --------------------------------------------------------------------
  {
    const listCtx = await cfContext(listDatabasesBody);
    const createCtx = await cfContext(createDatabaseBody);
    const encList = encoder(D1.ListDatabasesRequest);
    const encCreate = encoder(D1.CreateDatabaseRequest);
    const decList = decoder(D1.ListDatabasesResponse);
    const decCreate = decoder(D1.CreateDatabaseResponse);
    const listDecodedInput = camelized(
      D1.ListDatabasesResponse,
      listDatabasesBody,
      true,
    );
    const createDecodedInput = camelized(
      D1.CreateDatabaseResponse,
      createDatabaseBody,
    );
    const buildList = build(D1.ListDatabasesRequest);
    const buildCreate = build(D1.CreateDatabaseRequest);
    cases.push(
      {
        provider: "cloudflare",
        service: "d1",
        op: "listDatabases",
        stage: "encode",
        note: "label + per_page query",
        fn: () => encList(listDatabasesInput),
      },
      {
        provider: "cloudflare",
        service: "d1",
        op: "listDatabases",
        stage: "decode",
        note: "20 databases",
        fn: () => decList(listDecodedInput),
      },
      {
        provider: "cloudflare",
        service: "d1",
        op: "listDatabases",
        stage: "wire-decode",
        note: "JSON.parse + key mapping, 20 databases",
        fn: wireDecode(D1.ListDatabasesResponse, listDatabasesBody),
      },
      {
        provider: "cloudflare",
        service: "d1",
        op: "listDatabases",
        stage: "build",
        note: "GET, label + query",
        fn: () => buildList(listDatabasesInput),
      },
      {
        provider: "cloudflare",
        service: "d1",
        op: "listDatabases",
        stage: "call",
        note: "paginated protocol, 20-db envelope",
        fn: call(listCtx, () => D1.listDatabases(listDatabasesInput)),
      },
      {
        provider: "cloudflare",
        service: "d1",
        op: "createDatabase",
        stage: "encode",
        note: "label + 2 body fields (snake_case)",
        fn: () => encCreate(createDatabaseInput),
      },
      {
        provider: "cloudflare",
        service: "d1",
        op: "createDatabase",
        stage: "decode",
        note: "7 fields, nested read_replication",
        fn: () => decCreate(createDecodedInput),
      },
      {
        provider: "cloudflare",
        service: "d1",
        op: "createDatabase",
        stage: "build",
        note: "POST, JSON body",
        fn: () => buildCreate(createDatabaseInput),
      },
      {
        provider: "cloudflare",
        service: "d1",
        op: "createDatabase",
        stage: "call",
        note: "7-field envelope",
        fn: call(createCtx, () => D1.createDatabase(createDatabaseInput)),
      },
    );
  }

  // -- r2 --------------------------------------------------------------------
  {
    const listCtx = await cfContext(listBucketsBody);
    const createCtx = await cfContext(createBucketBody);
    const encList = encoder(R2.ListBucketsRequest);
    const encCreate = encoder(R2.CreateBucketRequest);
    const decList = decoder(R2.ListBucketsResponse);
    const decCreate = decoder(R2.CreateBucketResponse);
    const listDecodedInput = camelized(R2.ListBucketsResponse, listBucketsBody);
    const createDecodedInput = camelized(
      R2.CreateBucketResponse,
      createBucketBody,
    );
    const buildList = build(R2.ListBucketsRequest);
    const buildCreate = build(R2.CreateBucketRequest);
    cases.push(
      {
        provider: "cloudflare",
        service: "r2",
        op: "listBuckets",
        stage: "encode",
        note: "label + per_page query",
        fn: () => encList(listBucketsInput),
      },
      {
        provider: "cloudflare",
        service: "r2",
        op: "listBuckets",
        stage: "decode",
        note: "20 buckets",
        fn: () => decList(listDecodedInput),
      },
      {
        provider: "cloudflare",
        service: "r2",
        op: "listBuckets",
        stage: "wire-decode",
        note: "JSON.parse + key mapping, 20 buckets",
        fn: wireDecode(R2.ListBucketsResponse, listBucketsBody),
      },
      {
        provider: "cloudflare",
        service: "r2",
        op: "listBuckets",
        stage: "build",
        note: "GET, label + query",
        fn: () => buildList(listBucketsInput),
      },
      {
        provider: "cloudflare",
        service: "r2",
        op: "listBuckets",
        stage: "call",
        note: "20-bucket envelope",
        fn: call(listCtx, () => R2.listBuckets(listBucketsInput)),
      },
      {
        provider: "cloudflare",
        service: "r2",
        op: "createBucket",
        stage: "encode",
        note: "label + 3 body fields",
        fn: () => encCreate(createBucketInput),
      },
      {
        provider: "cloudflare",
        service: "r2",
        op: "createBucket",
        stage: "decode",
        note: "5 fields",
        fn: () => decCreate(createDecodedInput),
      },
      {
        provider: "cloudflare",
        service: "r2",
        op: "createBucket",
        stage: "build",
        note: "POST, JSON body",
        fn: () => buildCreate(createBucketInput),
      },
      {
        provider: "cloudflare",
        service: "r2",
        op: "createBucket",
        stage: "call",
        note: "5-field envelope",
        fn: call(createCtx, () => R2.createBucket(createBucketInput)),
      },
    );
  }

  // -- zones -----------------------------------------------------------------
  {
    const listCtx = await cfContext(listZonesBody);
    const createCtx = await cfContext(createZoneBody);
    const encList = encoder(Zones.ListZonesRequest);
    const encCreate = encoder(Zones.CreateZoneRequest);
    const decList = decoder(Zones.ListZonesResponse);
    const decCreate = decoder(Zones.CreateZoneResponse);
    const listDecodedInput = camelized(
      Zones.ListZonesResponse,
      listZonesBody,
      true,
    );
    const createDecodedInput = camelized(
      Zones.CreateZoneResponse,
      createZoneBody,
    );
    const buildList = build(Zones.ListZonesRequest);
    const buildCreate = build(Zones.CreateZoneRequest);
    cases.push(
      {
        provider: "cloudflare",
        service: "zones",
        op: "listZones",
        stage: "encode",
        note: "deep query (account.id) + per_page",
        fn: () => encList(listZonesInput),
      },
      {
        provider: "cloudflare",
        service: "zones",
        op: "listZones",
        stage: "decode",
        note: "20 zones, ~30 fields each",
        fn: () => decList(listDecodedInput),
      },
      {
        provider: "cloudflare",
        service: "zones",
        op: "listZones",
        stage: "wire-decode",
        note: "JSON.parse + key mapping, 20 zones",
        fn: wireDecode(Zones.ListZonesResponse, listZonesBody),
      },
      {
        provider: "cloudflare",
        service: "zones",
        op: "listZones",
        stage: "build",
        note: "GET, deep query",
        fn: () => buildList(listZonesInput),
      },
      {
        provider: "cloudflare",
        service: "zones",
        op: "listZones",
        stage: "call",
        note: "paginated protocol, 20-zone envelope",
        fn: call(listCtx, () => Zones.listZones(listZonesInput)),
      },
      {
        provider: "cloudflare",
        service: "zones",
        op: "createZone",
        stage: "encode",
        note: "nested account + 2 fields",
        fn: () => encCreate(createZoneInput),
      },
      {
        provider: "cloudflare",
        service: "zones",
        op: "createZone",
        stage: "decode",
        note: "~30 fields, nested plan/meta/owner",
        fn: () => decCreate(createDecodedInput),
      },
      {
        provider: "cloudflare",
        service: "zones",
        op: "createZone",
        stage: "wire-decode",
        note: "JSON.parse + key mapping, ~30 fields",
        fn: wireDecode(Zones.CreateZoneResponse, createZoneBody),
      },
      {
        provider: "cloudflare",
        service: "zones",
        op: "createZone",
        stage: "build",
        note: "POST, JSON body",
        fn: () => buildCreate(createZoneInput),
      },
      {
        provider: "cloudflare",
        service: "zones",
        op: "createZone",
        stage: "call",
        note: "~30-field envelope",
        fn: call(createCtx, () => Zones.createZone(createZoneInput)),
      },
    );
  }

  return cases;
};
