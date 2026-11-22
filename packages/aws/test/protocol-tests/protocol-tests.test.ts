/**
 * The official Smithy AWS protocol tests (see README.md): each
 * test service is generated with the AWS generator, and each client test case
 * is replayed through a fake HttpClient. A request case checks the request
 * the operation sends; a response case checks what the operation decodes
 * from the canned response, a result or a typed error.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { generateService } from "@distilled.cloud/dev/codegen/generator";
import { inheritServiceErrors } from "@distilled.cloud/dev/codegen/operations";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import { awsSpec, supportedProtocol } from "../../scripts/spec.ts";
import * as Credentials from "../../src/credentials.ts";
import * as Endpoint from "../../src/endpoint.ts";
import { decodeCbor } from "../../src/protocols/cbor.ts";
import * as Retry from "../../src/retry.ts";

const dir = import.meta.dirname;
const generatedDir = path.join(dir, ".generated");
const model: { shapes: Record<string, Shape> } = JSON.parse(
  fs.readFileSync(path.join(dir, "model.json"), "utf8"),
);

/** The test services of the protocols the runtime implements. */
const SERVICES = [
  "aws.protocoltests.json10#JsonRpc10",
  "aws.protocoltests.json10#QueryCompatibleJsonRpc10",
  "aws.protocoltests.json#JsonProtocol",
  "aws.protocoltests.query#AwsQuery",
  "aws.protocoltests.ec2#AwsEc2",
  "aws.protocoltests.restjson#RestJson",
  "aws.protocoltests.restxml#RestXml",
  "aws.protocoltests.restxml.xmlns#RestXmlWithNamespace",
  "aws.protocoltests.rpcv2cbor#NonQueryCompatibleRpcV2Protocol",
  "aws.protocoltests.rpcv2cbor#QueryCompatibleRpcV2Protocol",
  "smithy.protocoltests.rpcv2Cbor#RpcV2Protocol",
];

interface Ref {
  readonly target: string;
  readonly traits?: Record<string, any>;
}

interface Shape {
  readonly type: string;
  readonly traits?: Record<string, any>;
  readonly members?: Record<string, Ref>;
  readonly member?: Ref;
  readonly key?: Ref;
  readonly value?: Ref;
  readonly operations?: ReadonlyArray<Ref>;
  readonly resources?: ReadonlyArray<Ref>;
  readonly errors?: ReadonlyArray<Ref>;
  readonly input?: Ref;
  readonly output?: Ref;
  readonly rename?: Record<string, string>;
}

interface TestCase {
  readonly id: string;
  readonly protocol: string;
  readonly appliesTo?: "client" | "server";
  readonly tags?: ReadonlyArray<string>;
  readonly params?: Record<string, unknown>;
  readonly body?: string;
  readonly bodyMediaType?: string;
  readonly headers?: Record<string, string>;
  readonly forbidHeaders?: ReadonlyArray<string>;
  readonly requireHeaders?: ReadonlyArray<string>;
  // Request cases.
  readonly method?: string;
  readonly uri?: string;
  readonly host?: string;
  readonly resolvedHost?: string;
  readonly queryParams?: ReadonlyArray<string>;
  readonly forbidQueryParams?: ReadonlyArray<string>;
  readonly requireQueryParams?: ReadonlyArray<string>;
  // Response cases.
  readonly code?: number;
}

// ---------------------------------------------------------------------------
// Test services
// ---------------------------------------------------------------------------

/**
 * The service and every shape it reaches, as the one-service model the
 * generator compiles. The service's `rename` map is applied to the shape ids,
 * which is what it means for code generated from the service.
 */
const serviceModel = (serviceId: string) => {
  const shapes = model.shapes;
  const seen = new Set<string>();
  const visit = (ref: Ref | undefined) => {
    if (ref === undefined || seen.has(ref.target) || !(ref.target in shapes)) return;
    seen.add(ref.target);
    const shape = shapes[ref.target]!;
    for (const next of [
      ...(shape.operations ?? []),
      ...(shape.resources ?? []),
      ...(shape.errors ?? []),
      ...Object.values(shape.members ?? {}),
      shape.input,
      shape.output,
      shape.member,
      shape.key,
      shape.value,
    ]) {
      visit(next);
    }
  };
  visit({ target: serviceId });
  let json = JSON.stringify(Object.fromEntries([...seen].map((id) => [id, shapes[id]])));
  // The protocol-agnostic Smithy test services have no AWS service traits;
  // the AWS generator needs an SDK id and a signing name.
  const service = shapes[serviceId]!;
  if (service.traits?.["aws.api#service"] === undefined) {
    const parsed = JSON.parse(json);
    const name = serviceId.split("#")[1]!;
    parsed[serviceId] = {
      ...service,
      traits: {
        ...service.traits,
        "aws.api#service": { sdkId: name },
        "aws.auth#sigv4": { name: name.toLowerCase() },
      },
    };
    json = JSON.stringify(parsed);
  }
  for (const [from, to] of Object.entries(shapes[serviceId]!.rename ?? {})) {
    json = json.replaceAll(`"${from}"`, `"${from.split("#")[0]}#${to}"`);
  }
  // No AWS model uses byte or short, so the generator has no schema for them.
  // On every AWS protocol they travel exactly like an integer.
  json = json
    .replaceAll('"smithy.api#Byte"', '"smithy.api#Integer"')
    .replaceAll('"smithy.api#Short"', '"smithy.api#Integer"');
  return { smithy: "2.0", shapes: JSON.parse(json) as Record<string, Shape> };
};

/** Generate the service module with the AWS generator spec, and load it. */
const loadService = async (name: string, smithy: ReturnType<typeof serviceModel>) => {
  const copy = structuredClone(smithy) as any;
  inheritServiceErrors(copy.shapes);
  const { code } = generateService(copy, awsSpec(copy));
  // Generated services live in src/services; these import the same modules.
  const text = code.replaceAll('from "../', 'from "../../../src/');
  const file = path.join(generatedDir, `${name}.ts`);
  fs.writeFileSync(file, text);
  return (await import(file)) as Record<string, any>;
};

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------

const PRELUDE: Record<string, string> = {
  "smithy.api#String": "string",
  "smithy.api#Blob": "blob",
  "smithy.api#Boolean": "boolean",
  "smithy.api#PrimitiveBoolean": "boolean",
  "smithy.api#Byte": "byte",
  "smithy.api#PrimitiveByte": "byte",
  "smithy.api#Short": "short",
  "smithy.api#PrimitiveShort": "short",
  "smithy.api#Integer": "integer",
  "smithy.api#PrimitiveInteger": "integer",
  "smithy.api#Long": "long",
  "smithy.api#PrimitiveLong": "long",
  "smithy.api#Float": "float",
  "smithy.api#PrimitiveFloat": "float",
  "smithy.api#Double": "double",
  "smithy.api#PrimitiveDouble": "double",
  "smithy.api#BigInteger": "bigInteger",
  "smithy.api#BigDecimal": "bigDecimal",
  "smithy.api#Timestamp": "timestamp",
  "smithy.api#Document": "document",
  "smithy.api#Unit": "structure",
};

const typeOf = (shapes: Record<string, Shape>, target: string): Shape =>
  shapes[target] ?? { type: PRELUDE[target] ?? "document" };

const utf8 = new TextEncoder();
const fromUtf8 = new TextDecoder();

/** A test case's `params` value as the value an SDK user passes or gets back. */
const toRuntime = (shapes: Record<string, Shape>, target: string, value: unknown): unknown => {
  if (value === null || value === undefined) return value;
  const shape = typeOf(shapes, target);
  switch (shape.type) {
    case "timestamp":
      return typeof value === "number" ? new Date(value * 1000) : new Date(value as string);
    case "blob":
      return typeof value === "string" ? utf8.encode(value) : value;
    case "float":
    case "double":
      return typeof value === "string" ? Number(value) : value;
    case "list":
    case "set":
      return (value as unknown[]).map((v) => toRuntime(shapes, shape.member!.target, v));
    case "map":
      return Object.fromEntries(
        Object.entries(value as object).map(([k, v]) => [
          k,
          toRuntime(shapes, shape.value!.target, v),
        ]),
      );
    case "structure":
    case "union":
      // A null member is an absent one: SDK users leave it out.
      return Object.fromEntries(
        Object.entries(value as object)
          .filter(([, v]) => v !== null)
          .map(([k, v]) => {
            const member = shape.members?.[k];
            return [k, member === undefined ? v : toRuntime(shapes, member.target, v)];
          }),
      );
    default:
      return value;
  }
};

/** Required input members filled in, for response cases that send a request. */
const placeholder = (shapes: Record<string, Shape>, target: string): unknown => {
  const shape = typeOf(shapes, target);
  switch (shape.type) {
    case "string":
      return "a";
    case "enum":
      return Object.values(shape.members ?? {})[0]?.traits?.["smithy.api#enumValue"] ?? "a";
    case "intEnum":
      return Object.values(shape.members ?? {})[0]?.traits?.["smithy.api#enumValue"] ?? 0;
    case "boolean":
      return false;
    case "timestamp":
      return new Date(0);
    case "blob":
      return new Uint8Array();
    case "list":
    case "set":
      return [];
    case "map":
    case "document":
      return {};
    case "union": {
      const [name, member] = Object.entries(shape.members ?? {})[0]!;
      return { [name]: placeholder(shapes, member.target) };
    }
    case "structure":
      return Object.fromEntries(
        Object.entries(shape.members ?? {})
          .filter(([, m]) => m.traits?.["smithy.api#required"] !== undefined)
          .map(([name, m]) => [name, placeholder(shapes, m.target)]),
      );
    default:
      return 0;
  }
};

/** A value in a form `toEqual` compares: dates, bytes, secrets and streams unwrapped. */
const canonical = async (value: unknown): Promise<unknown> => {
  if (value === null || value === undefined) return value;
  if (value instanceof Date) return { date: value.getTime() };
  if (value instanceof Uint8Array) return { bytes: fromUtf8.decode(value) };
  if (Redacted.isRedacted(value)) return canonical(Redacted.value(value));
  if (value instanceof ReadableStream) {
    return { bytes: await new Response(value).text() };
  }
  if (Stream.isStream(value)) {
    const chunks = await Effect.runPromise(Stream.runCollect(value as Stream.Stream<Uint8Array>));
    return { bytes: fromUtf8.decode(Buffer.concat(Array.from(chunks))) };
  }
  if (Array.isArray(value)) return Promise.all(value.map(canonical));
  if (typeof value === "object") {
    const entries = await Promise.all(
      Object.entries(value).map(async ([k, v]) => [k, await canonical(v)] as const),
    );
    return Object.fromEntries(entries.filter(([, v]) => v !== undefined));
  }
  return value;
};

// ---------------------------------------------------------------------------
// Bodies
// ---------------------------------------------------------------------------

const decodeEntities = (text: string) =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&amp;", "&");

interface XmlNode {
  readonly open: string;
  readonly name: string;
  readonly children: Array<XmlNode | string>;
}

/**
 * XML with the differences that carry no meaning removed: the declaration,
 * whitespace between elements, attribute order, quoting, entity spelling,
 * self-closing tags, and the order of differently named siblings. A
 * structure's members can come in any order; elements with the same name
 * (list items) keep theirs.
 */
const canonicalXml = (xml: string): string => {
  const root: XmlNode = { open: "", name: "", children: [] };
  const stack: XmlNode[] = [root];
  for (const token of xml.replace(/<\?xml[^>]*\?>/, "").match(/<[^>]+>|[^<]+/g) ?? []) {
    const parent = stack[stack.length - 1]!;
    if (!token.startsWith("<")) {
      if (token.trim() !== "") parent.children.push(JSON.stringify(decodeEntities(token)));
      continue;
    }
    if (token.startsWith("</")) {
      stack.pop();
      continue;
    }
    const selfClosing = token.endsWith("/>");
    const inner = token.slice(1, selfClosing ? -2 : -1).trim();
    const name = inner.split(/\s/)[0]!;
    const attributes = [...inner.slice(name.length).matchAll(/([^\s=]+)\s*=\s*("[^"]*"|'[^']*')/g)]
      .map(([, key, quoted]) => `${key}=${JSON.stringify(decodeEntities(quoted!.slice(1, -1)))}`)
      .sort();
    const node: XmlNode = { open: `<${[name, ...attributes].join(" ")}>`, name, children: [] };
    parent.children.push(node);
    if (!selfClosing) stack.push(node);
  }
  const print = (node: XmlNode | string): string => {
    if (typeof node === "string") return node;
    // A stable sort: same-named siblings keep their order.
    const children = [...node.children].sort((a, b) => {
      const [x, y] = [typeof a === "string" ? "" : a.name, typeof b === "string" ? "" : b.name];
      return x < y ? -1 : x > y ? 1 : 0;
    });
    return `${node.open}${children.map(print).join("")}${node.name === "" ? "" : `</${node.name}>`}`;
  };
  return print(root);
};

const formPairs = (body: string) =>
  body
    .split("&")
    .filter((pair) => pair !== "")
    .map((pair) => decodeURIComponent(pair.replaceAll("+", " ")))
    .sort();

/** A CBOR body as a value `toEqual` compares (an empty body is `undefined`). */
const cborValue = async (bytes: Uint8Array): Promise<unknown> =>
  bytes.length === 0 ? undefined : canonical(decodeCbor(bytes));

const expectBody = async (
  actual: string,
  actualBytes: Uint8Array,
  expected: string,
  mediaType: string | undefined,
) => {
  if (mediaType === "application/cbor") {
    // CBOR test bodies are base64. Compared as values: map order, integer
    // widths and definite or indefinite lengths carry no meaning.
    expect(await cborValue(actualBytes)).toEqual(await cborValue(Buffer.from(expected, "base64")));
  } else if (mediaType === "application/json" && expected !== "") {
    expect(actual === "" ? actual : JSON.parse(actual)).toEqual(JSON.parse(expected));
  } else if (mediaType === "application/xml" && expected !== "") {
    expect(canonicalXml(actual)).toBe(canonicalXml(expected));
  } else if (mediaType === "application/x-www-form-urlencoded") {
    expect(formPairs(actual)).toEqual(formPairs(expected));
  } else {
    expect(actual).toBe(expected);
  }
};

const bodyBytes = async (request: HttpClientRequest.HttpClientRequest): Promise<Uint8Array> => {
  const body = request.body;
  switch (body._tag) {
    case "Empty":
      return new Uint8Array();
    case "Uint8Array":
      return body.body;
    case "Raw":
      return typeof body.body === "string"
        ? utf8.encode(body.body)
        : body.body instanceof Uint8Array
          ? body.body
          : new Uint8Array(await new Response(body.body as BodyInit).arrayBuffer());
    case "Stream": {
      const chunks = await Effect.runPromise(Stream.runCollect(body.stream));
      return Buffer.concat(Array.from(chunks));
    }
    default:
      return utf8.encode(`<${body._tag} body>`);
  }
};

// ---------------------------------------------------------------------------
// Running an operation against a fake HttpClient
// ---------------------------------------------------------------------------

interface Canned {
  readonly status: number;
  readonly headers?: Record<string, string>;
  readonly body?: string | Uint8Array;
}

const call = async (
  op: (input: unknown) => Effect.Effect<unknown, unknown, any>,
  input: unknown,
  canned: Canned,
  host = "example.com",
) => {
  let sent: HttpClientRequest.HttpClientRequest | undefined;
  const client = HttpClient.make((request) =>
    Effect.sync(() => {
      sent = request;
      const empty = canned.status === 204 || canned.status === 304 || canned.body === undefined;
      return HttpClientResponse.fromWeb(
        request,
        new Response(empty ? null : (canned.body as BodyInit), {
          status: canned.status,
          headers: canned.headers,
        }),
      );
    }),
  );
  const exit = await Effect.runPromiseExit(
    Effect.suspend(() => op(input)).pipe(
      Retry.none,
      Effect.provide(
        Layer.mergeAll(
          Credentials.fromCredentials(
            { accessKeyId: Redacted.make("AKIDEXAMPLE"), secretAccessKey: Redacted.make("secret") },
            "us-west-2",
          ),
          Endpoint.of(`https://${host}`),
          Layer.succeed(HttpClient.HttpClient, client),
        ),
      ),
    ) as Effect.Effect<unknown, unknown>,
  );
  return { sent, exit };
};

const failureOf = (exit: Exit.Exit<unknown, unknown>): unknown => {
  if (Exit.isSuccess(exit)) return undefined;
  const error = exit.cause.reasons.find((reason) => reason._tag === "Fail");
  return error?._tag === "Fail" ? error.error : exit.cause;
};

// ---------------------------------------------------------------------------
// Cases
// ---------------------------------------------------------------------------

/** `a%20b=c` -> `a b=c`; a key with no `=` has an empty value. */
const decodePair = (pair: string) => {
  const at = pair.indexOf("=");
  const [k, v] = at === -1 ? [pair, ""] : [pair.slice(0, at), pair.slice(at + 1)];
  return `${decodeURIComponent(k)}=${decodeURIComponent(v)}`;
};

const lowerFirst = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);
const shapeName = (id: string) => id.split("#")[1]!;
const header = (headers: Record<string, string>, name: string) => headers[name.toLowerCase()];

/** A request case and a response case can share an id: the name says which. */
const register = (id: string, run: () => Promise<void>) => test(id, run);

// Idempotency tokens the client fills in: the cases expect this one.
beforeAll(() => {
  vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue("00000000-0000-4000-8000-000000000000");
});
afterAll(() => {
  vi.restoreAllMocks();
});

fs.mkdirSync(generatedDir, { recursive: true });

for (const serviceId of SERVICES) {
  const smithy = serviceModel(serviceId);
  const { shapes } = smithy;
  const service = shapes[serviceId]!;
  const protocol = supportedProtocol(service.traits)!;
  // rpcv2Cbor test bodies are base64 CBOR.
  const cannedBody = (body: string | undefined) =>
    body !== undefined && protocol === "smithy.protocols#rpcv2Cbor"
      ? Buffer.from(body, "base64")
      : body;
  const name = shapeName(serviceId);
  // Cases tagged `defaults` expect the client to fill in a member's
  // `@default` when the caller or the server leaves it out. The SDK sends and
  // returns only the values it was given, as the AWS SDK for JavaScript does
  // (it skips these cases too).
  const applies = (c: TestCase) =>
    c.protocol === protocol && c.appliesTo !== "server" && !c.tags?.includes("defaults");

  const operations = Object.entries(shapes).filter(([, s]) => s.type === "operation");

  describe(name, () => {
    let module: Record<string, any> = {};
    beforeAll(async () => {
      module = await loadService(name, smithy);
    });

    for (const [opId, op] of operations) {
      const opName = shapeName(opId);
      const method = async () => {
        const fn = module[lowerFirst(opName)];
        if (typeof fn !== "function") throw new Error(`${name} exports no ${lowerFirst(opName)}`);
        return fn as (input: unknown) => Effect.Effect<unknown, unknown, any>;
      };
      const inputId = op.input?.target ?? "smithy.api#Unit";
      const outputId = op.output?.target ?? "smithy.api#Unit";

      // An `@endpoint` host prefix is skipped for a custom endpoint, and this
      // runner sends every call to one: these cases expect the prefixed host.
      const hostPrefixed = op.traits?.["smithy.api#endpoint"] !== undefined;

      for (const c of (op.traits?.["smithy.test#httpRequestTests"] ?? []) as TestCase[]) {
        if (!applies(c) || hostPrefixed) continue;
        register(`${c.id} (request)`, async () => {
          const input = toRuntime(shapes, inputId, c.params ?? {});
          const { sent } = await call(await method(), input, { status: 200, body: "" }, c.host);
          expect(sent, "no request was sent").toBeDefined();
          const request = sent!;
          const url = request.url;
          const [, rawPath = "/", rawQuery = ""] =
            /^[a-z]+:\/\/[^/?#]*([^?#]*)\??([^#]*)/i.exec(url) ?? [];
          expect(request.method).toBe(c.method);
          expect(rawPath).toBe(c.uri);
          const pairs = [
            ...rawQuery
              .split("&")
              .filter((p) => p !== "")
              .map(decodePair),
            ...request.urlParams.params.map(
              ([k, v]) => `${k}=${typeof v === "string" ? v : Redacted.value(v)}`,
            ),
          ];
          const keys = pairs.map((p) => p.slice(0, p.indexOf("=")));
          for (const param of c.queryParams ?? []) expect(pairs).toContain(decodePair(param));
          for (const k of c.forbidQueryParams ?? []) expect(keys).not.toContain(k);
          for (const k of c.requireQueryParams ?? []) expect(keys).toContain(k);
          const bytes = await bodyBytes(request);
          const body = fromUtf8.decode(bytes);
          // The transport sets Content-Length from a body of known size.
          const headers = {
            ...(request.body._tag === "Uint8Array" ||
            (request.body._tag === "Raw" && typeof request.body.body === "string")
              ? { "content-length": String(bytes.byteLength) }
              : {}),
            ...(request.headers as Record<string, string>),
          };
          for (const [k, v] of Object.entries(c.headers ?? {})) {
            expect(header(headers, k), `header ${k}`).toBe(v);
          }
          for (const k of c.forbidHeaders ?? []) expect(header(headers, k)).toBeUndefined();
          for (const k of c.requireHeaders ?? []) expect(header(headers, k)).toBeDefined();
          if (c.resolvedHost !== undefined) expect(new URL(url).host).toBe(c.resolvedHost);
          if (c.body !== undefined) await expectBody(body, bytes, c.body, c.bodyMediaType);
        });
      }

      for (const c of (op.traits?.["smithy.test#httpResponseTests"] ?? []) as TestCase[]) {
        if (!applies(c)) continue;
        register(`${c.id} (response)`, async () => {
          const { exit } = await call(await method(), placeholder(shapes, inputId), {
            status: c.code!,
            headers: c.headers,
            body: cannedBody(c.body),
          });
          expect(failureOf(exit)).toBeUndefined();
          const value = Exit.isSuccess(exit) ? exit.value : undefined;
          const actual = (await canonical(value)) as Record<string, unknown> | undefined;
          const expected = (await canonical(toRuntime(shapes, outputId, c.params ?? {}))) as
            | Record<string, unknown>
            | undefined;
          // A streaming member the case leaves out is an empty stream: the SDK
          // always returns one (S3 GetObject of an empty object).
          for (const [name, member] of Object.entries(typeOf(shapes, outputId).members ?? {})) {
            const streaming = typeOf(shapes, member.target).traits?.["smithy.api#streaming"];
            if (streaming === undefined || actual === undefined || expected?.[name] !== undefined) {
              continue;
            }
            expect(actual[name], `${name}: an empty stream`).toEqual({ bytes: "" });
            delete actual[name];
          }
          expect(actual).toEqual(expected);
        });
      }
    }

    // An error's response cases run against the first operation that can
    // return it.
    for (const [errorId, error] of Object.entries(shapes)) {
      const cases = (error.traits?.["smithy.test#httpResponseTests"] ?? []) as TestCase[];
      if (error.type !== "structure" || cases.length === 0) continue;
      const found = operations.find(([, op]) =>
        [...(op.errors ?? []), ...(service.errors ?? [])].some((e) => e.target === errorId),
      );
      if (found === undefined) continue;
      const [opId, op] = found;
      for (const c of cases) {
        if (!applies(c)) continue;
        register(`${c.id} (error)`, async () => {
          const fn = module[lowerFirst(shapeName(opId))];
          const { exit } = await call(
            fn,
            placeholder(shapes, op.input?.target ?? "smithy.api#Unit"),
            { status: c.code!, headers: c.headers, body: cannedBody(c.body) },
          );
          const failure = failureOf(exit) as { _tag?: string } | undefined;
          expect(failure?._tag).toBe(shapeName(errorId));
          // The generator names every error's message member `message`
          // (scripts/spec.ts), so `Message` on the wire is `message` here.
          const { Message, ...params } = c.params ?? {};
          const expected = Message === undefined ? params : { ...params, message: Message };
          const wanted = toRuntime(shapes, errorId, expected) as Record<string, unknown>;
          // Error fields can be prototype getters (`message`): read each one.
          const actual = Object.fromEntries(
            Object.keys(wanted).map((k) => [k, (failure as Record<string, unknown>)[k]]),
          );
          expect(await canonical(actual)).toEqual(await canonical(wanted));
        });
      }
    }
  });
}
