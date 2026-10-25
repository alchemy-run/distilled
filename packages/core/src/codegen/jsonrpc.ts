import { errorUnionAlias, operationConst } from "./emit.ts";
import type { OperationEmit, SdkSpec } from "./generator.ts";
import { lowerFirst } from "./naming.ts";
/**
 * JSON-RPC — the codegen half of distilled's JSON-RPC protocol family.
 *
 * ## IR (Smithy traits)
 *
 * A JSON-RPC API is a Smithy model like any other; operations carry:
 *
 *   com.distilled.jsonrpc#method        "session/prompt"   wire method name
 *   com.distilled.jsonrpc#notification  {}                 no response
 *   com.distilled.jsonrpc#inbound       {}                 the PEER calls US
 *
 * and the service carries `com.distilled.jsonrpc#jsonRpc2` ({ params:
 * "named" }). Operation input = params, output = result. Errors are ordinary
 * error shapes whose `errorMatchers` match the JSON-RPC error `code` —
 * patchable like every other provider.
 *
 * ## Dialect: `json-schema-rpc`
 *
 * {@link convertJsonSchemaRpcToSmithy} takes a JSON Schema definitions map
 * plus an explicit method list. Each package's `convert.ts` derives the list
 * from its own source format (ACP: `x-side`/`x-method` annotations; Codex:
 * the per-direction request/notification unions), so the dialect stays
 * format-agnostic. Schema conversion reuses the OpenAPI converter through a
 * synthetic OAS 3.1 document — the same nullability, union, naming and
 * sensitivity handling every OpenAPI provider gets.
 *
 * ## Emission
 *
 * {@link jsonRpcEmission} supplies the `SdkSpec` hooks: outbound requests and
 * notifications become `JsonRpc.request` / `JsonRpc.notify` callables,
 * inbound notifications become `JsonRpc.notifications` streams, and every
 * inbound method lands in a generated `inbound` table + `InboundHandlers`
 * interface + `handlers(impl)` binder.
 */
import { convertOpenApiToSmithy, type OpenApiConvertOptions } from "./openapi.ts";

export const JSONRPC_SERVICE_TRAIT = "com.distilled.jsonrpc#jsonRpc2";
export const JSONRPC_METHOD_TRAIT = "com.distilled.jsonrpc#method";
export const JSONRPC_NOTIFICATION_TRAIT = "com.distilled.jsonrpc#notification";
export const JSONRPC_INBOUND_TRAIT = "com.distilled.jsonrpc#inbound";
/** The method takes no params: callers pass nothing and no `params` member is sent. */
export const JSONRPC_NO_PARAMS_TRAIT = "com.distilled.jsonrpc#noParams";

//#region Dialect

/** One method of a JSON-RPC API. */
export interface JsonRpcMethodSpec {
  /** The wire method name (`session/prompt`). */
  readonly method: string;
  /** `outbound`: we call the peer. `inbound`: the peer calls us. */
  readonly direction: "outbound" | "inbound";
  readonly kind: "request" | "notification";
  /** Definition name of the params schema (omit for no params). */
  readonly params?: string;
  /** Definition name of the result schema (requests; omit for an empty result). */
  readonly result?: string;
  /** PascalCase operation name; default derived from {@link method}. */
  readonly name?: string;
  readonly documentation?: string;
}

export interface JsonSchemaRpcConvertOptions {
  readonly namespace: string;
  readonly serviceName: string;
  readonly version?: string;
  /** JSON Schema definitions, keyed by name (`$defs` / `definitions`). */
  readonly definitions: Readonly<Record<string, unknown>>;
  readonly methods: ReadonlyArray<JsonRpcMethodSpec>;
  /** Passed through to the OpenAPI schema converter. */
  readonly openapi?: Partial<OpenApiConvertOptions>;
}

/** `session/request_permission` → `SessionRequestPermission`; `$/cancel_request` → `CancelRequest`. */
export const methodToOperationName = (method: string): string =>
  method
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join("");

/** Rewrite every `#/definitions/X` / `#/$defs/X` reference to `#/components/schemas/X`. */
const rewriteRefs = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(rewriteRefs);
  if (value === null || typeof value !== "object") return value;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) {
    if (k === "$ref" && typeof v === "string") {
      out[k] = v.replace(/^#\/(?:definitions|\$defs)\//, "#/components/schemas/");
    } else if (k === "definitions" || k === "$defs") {
      // Nested definition maps are hoisted by the caller; drop them here.
      continue;
    } else {
      out[k] = rewriteRefs(v);
    }
  }
  return out;
};

const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` });

const LITERAL_KEYS = new Set(["type", "enum", "description", "title"]);

/**
 * JSON Schema features the OpenAPI schema converter doesn't read, rewritten
 * into ones it does:
 *
 *  - `const: x` → `enum: [x]` — JSON-RPC protocols discriminate their unions
 *    with `const` members (`type: "text"`, `sessionUpdate: "plan"`); without
 *    this every discriminator degrades to `string` and unions can't narrow.
 *  - a `oneOf` / `anyOf` whose branches are all string literals (or one-value
 *    enums) → one string `enum`, instead of a union of singleton enums.
 */
export const normalizeJsonSchema = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(normalizeJsonSchema);
  if (value === null || typeof value !== "object") return value;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) {
    // Property maps are keyed by member name; never treat them as keywords.
    out[k] =
      k === "properties" && v && typeof v === "object"
        ? Object.fromEntries(Object.entries(v).map(([p, sub]) => [p, normalizeJsonSchema(sub)]))
        : normalizeJsonSchema(v);
  }
  if (out.const !== undefined && out.enum === undefined) {
    out.enum = [out.const];
    if (out.type === undefined && typeof out.const === "string") out.type = "string";
    delete out.const;
  }
  for (const key of ["oneOf", "anyOf"] as const) {
    const branches = out[key];
    if (!Array.isArray(branches) || branches.length < 2) continue;
    const literal = (b: any) =>
      b &&
      typeof b === "object" &&
      b.type === "string" &&
      Array.isArray(b.enum) &&
      Object.keys(b).every((bk) => LITERAL_KEYS.has(bk));
    if (!branches.every(literal)) continue;
    delete out[key];
    out.type = "string";
    out.enum = [...new Set(branches.flatMap((b: any) => b.enum))];
  }
  // Base properties beside a `oneOf`/`anyOf` of object variants (ACP's
  // `SessionConfigOption`: shared `id`/`name` + per-kind fields) mean "the
  // base AND one variant". Distribute the base into every variant so the
  // union carries all fields; otherwise one side is silently dropped.
  for (const key of ["oneOf", "anyOf"] as const) {
    const branches = out[key];
    const base = out.properties;
    if (!Array.isArray(branches) || !base || typeof base !== "object") continue;
    const isObject = (b: any) =>
      b &&
      typeof b === "object" &&
      b.$ref === undefined &&
      (b.type === "object" || b.properties || b.allOf);
    if (!branches.every(isObject)) continue;
    const required = Array.isArray(out.required) ? (out.required as string[]) : [];
    out[key] = branches.map((b: any) => ({
      ...b,
      type: "object",
      properties: { ...(base as object), ...(b.properties ?? {}) },
      required: [...new Set([...required, ...(Array.isArray(b.required) ? b.required : [])])],
    }));
    delete out.properties;
    delete out.required;
    break;
  }
  return out;
};

/** Convert a JSON Schema definitions map + method list into a Smithy model. */
export const convertJsonSchemaRpcToSmithy = (options: JsonSchemaRpcConvertOptions): any => {
  const schemas: Record<string, unknown> = {};
  for (const [name, schema] of Object.entries(options.definitions)) {
    schemas[name] = rewriteRefs(normalizeJsonSchema(schema));
  }

  const byName = new Map<string, JsonRpcMethodSpec>();
  const paths: Record<string, unknown> = {};
  options.methods.forEach((m, i) => {
    const name = m.name ?? methodToOperationName(m.method);
    if (byName.has(name)) {
      throw new Error(
        `json-schema-rpc: operation name ${name} is used by both ${byName.get(name)!.method} and ${m.method} — set \`name\` on one of them`,
      );
    }
    if (name in schemas) {
      throw new Error(
        `json-schema-rpc: operation name ${name} (from ${m.method}) collides with the definition ${name} — set \`name\` on the method`,
      );
    }
    byName.set(name, m);
    for (const def of [m.params, m.result]) {
      if (def !== undefined && !(def in schemas)) {
        throw new Error(`json-schema-rpc: ${m.method} references unknown definition ${def}`);
      }
    }
    paths[`/__jsonrpc/${i}`] = {
      post: {
        operationId: name,
        ...(m.documentation ? { description: m.documentation } : {}),
        ...(m.params
          ? {
              requestBody: {
                required: true,
                content: { "application/json": { schema: ref(m.params) } },
              },
            }
          : {}),
        responses: {
          "200":
            m.kind === "request" && m.result
              ? { content: { "application/json": { schema: ref(m.result) } } }
              : { description: "no content" },
        },
      },
    };
  });

  const model = convertOpenApiToSmithy(
    {
      openapi: "3.1.0",
      info: { title: options.serviceName, version: options.version ?? "1" },
      components: { schemas },
      paths,
    },
    {
      namespace: options.namespace,
      serviceName: options.serviceName,
      unionCaseTitles: true,
      ...options.openapi,
      // Names are already final (derived from the wire method); the OpenAPI
      // verbNoun heuristic would reorder `SessionCancel` → `CancelSession`.
      operationNaming: "as-is",
    } as OpenApiConvertOptions,
  );

  // Swap the synthetic HTTP binding for the JSON-RPC traits.
  for (const [name, m] of byName) {
    const op = model.shapes[`${options.namespace}#${name}`];
    if (op?.type !== "operation") {
      throw new Error(
        `json-schema-rpc: operation ${name} (from ${m.method}) ${op ? `collides with a ${op.type} shape` : "was dropped by the converter"} — set \`name\` on the method`,
      );
    }
    const { "smithy.api#http": _http, ...traits } = op.traits ?? {};
    op.traits = {
      ...traits,
      [JSONRPC_METHOD_TRAIT]: m.method,
      ...(m.kind === "notification" ? { [JSONRPC_NOTIFICATION_TRAIT]: {} } : {}),
      ...(m.direction === "inbound" ? { [JSONRPC_INBOUND_TRAIT]: {} } : {}),
      ...(m.params === undefined ? { [JSONRPC_NO_PARAMS_TRAIT]: {} } : {}),
    };
    // Non-object params (a union, a scalar) arrive from the converter as a
    // sole `httpPayload` member of a synthesized struct. JSON-RPC sends params
    // as-is, so the operation's input IS that payload type.
    const input = op.input?.target ? model.shapes[op.input.target] : undefined;
    const members = input?.type === "structure" ? Object.values(input.members ?? {}) : [];
    if (
      members.length === 1 &&
      (members[0] as any).traits?.["smithy.api#httpPayload"] !== undefined
    ) {
      op.input = { target: (members[0] as any).target };
    }
  }
  const service = model.shapes[`${options.namespace}#${options.serviceName}`];
  service.traits = { ...service.traits, [JSONRPC_SERVICE_TRAIT]: { params: "named" } };
  return model;
};

//#endregion

//#region Emission

export interface JsonRpcEmissionOptions {
  /** The package's `JsonRpc.protocol(...)` const (from `../protocol.ts`). */
  readonly protocol: string;
  /** The package's connection tag type — every operation's requirement. */
  readonly connection: string;
  /** Per-op error union base (e.g. `AcpOpError`, exported by `../protocol.ts`). */
  readonly commonErrorType: string;
  /** Error classes appended to every request's `errors: [...]`. */
  readonly commonErrorClasses: readonly string[];
  readonly sourceNote?: string;
}

/**
 * The `SdkSpec` hooks that emit a JSON-RPC module: `operation`, `header`,
 * `footer`. Create one per generator run (it accumulates the inbound table).
 */
export const jsonRpcEmission = (
  o: JsonRpcEmissionOptions,
): Required<Pick<SdkSpec, "operation" | "header" | "footer" | "postProcess">> => {
  const inbound: Array<{
    readonly key: string;
    readonly method: string;
    readonly kind: "request" | "notification";
    readonly params: string;
    readonly paramsType: string;
    readonly result?: string;
    readonly resultType?: string;
  }> = [];

  const operation = (ctx: OperationEmit): string => {
    const traits = ctx.op.def.traits ?? {};
    const method = traits[JSONRPC_METHOD_TRAIT] as string | undefined;
    if (method === undefined) {
      throw new Error(`${ctx.opName}: not a JSON-RPC operation (missing ${JSONRPC_METHOD_TRAIT})`);
    }
    const isNotification = JSONRPC_NOTIFICATION_TRAIT in traits;
    const noParams = JSONRPC_NO_PARAMS_TRAIT in traits;
    // Outbound methods without params take no argument and send no `params`.
    const inputType = noParams ? "void" : ctx.inputName;
    const inputSchema = noParams ? "S.Void" : ctx.inputName;
    const doc = ctx.doc ? `/** ${ctx.doc} */\n` : "";

    if (JSONRPC_INBOUND_TRAIT in traits) {
      inbound.push({
        key: ctx.exportName,
        method,
        kind: isNotification ? "notification" : "request",
        params: ctx.inputName,
        paramsType: ctx.inputName,
        ...(isNotification ? {} : { result: ctx.outputSchema, resultType: ctx.outputTsType }),
      });
      if (!isNotification) return "";
      // Inbound notifications are also a stream any number of consumers can follow.
      return (
        doc +
        `export const ${ctx.exportName}: Stream.Stream<${ctx.inputName}, never, ${o.connection}> = ` +
        `JsonRpc.notifications(() => ({ method: ${JSON.stringify(method)}, params: ${ctx.inputName}, protocol: ${o.protocol} }));\n`
      );
    }

    if (isNotification) {
      return (
        doc +
        operationConst({
          exportName: ctx.exportName,
          typeAnnotation: `JsonRpc.RequestMethod<${inputType}, void, JsonRpc.JsonRpcTransportError, ${o.connection}>`,
          factory: "JsonRpc.notify",
          config: `{ method: ${JSON.stringify(method)}, input: ${inputSchema}, protocol: ${o.protocol} }`,
        })
      );
    }

    const errors = [...ctx.errorNames, ...o.commonErrorClasses];
    return [
      errorUnionAlias(ctx.opName, ctx.errorNames, o.commonErrorType),
      doc +
        operationConst({
          exportName: ctx.exportName,
          typeAnnotation: `JsonRpc.RequestMethod<${inputType}, ${ctx.outputTsType}, ${ctx.opName}Error, ${o.connection}>`,
          factory: "JsonRpc.request",
          config:
            `{\n  method: ${JSON.stringify(method)},\n  input: ${inputSchema},\n` +
            `  output: ${ctx.outputSchema},\n  errors: [${errors.join(", ")}],\n  protocol: ${o.protocol},\n}`,
        }),
    ].join("\n");
  };

  const header = (): string =>
    `// AUTO-GENERATED by scripts/generate.ts${o.sourceNote ? ` from ${o.sourceNote}` : ""}. Do not edit.\n` +
    `import * as JsonRpc from "@distilled.cloud/core/jsonrpc";\n` +
    `import * as S from "@distilled.cloud/core/schema";\n` +
    `import type * as Effect from "effect/Effect";\n` +
    `import type * as Stream from "effect/Stream";\n` +
    `import * as T from "../traits.ts";\n` +
    `import { ${o.protocol}, type ${o.commonErrorType}, type ${o.connection} } from "../protocol.ts";\n` +
    (o.commonErrorClasses.length
      ? `import { ${[...o.commonErrorClasses].sort().join(", ")} } from "../errors.ts";\n`
      : "") +
    `\nexport type { ${o.commonErrorType}, ${o.connection} };\n\n`;

  const footer = (): string[] => {
    const entries = inbound.map(
      (m) =>
        `  ${m.key}: { method: ${JSON.stringify(m.method)}, kind: ${JSON.stringify(m.kind)}, params: ${m.params}` +
        (m.result ? `, result: ${m.result}` : "") +
        ` },`,
    );
    const members = inbound.map((m) =>
      m.kind === "request"
        ? `  readonly ${m.key}?: (params: ${m.paramsType}) => Effect.Effect<${m.resultType}, JsonRpc.HandlerError, R>;`
        : `  readonly ${m.key}?: (params: ${m.paramsType}) => Effect.Effect<void, never, R>;`,
    );
    return [
      `/** Every method the peer may call on us, by handler key. */`,
      `export const inbound = {\n${entries.join("\n")}\n} as const satisfies Record<string, JsonRpc.InboundMethod>;\n`,
      `/** Implementations for the methods the peer calls on us. Unimplemented requests are answered MethodNotFound. */`,
      `export interface InboundHandlers<R = never> {\n${members.join("\n")}\n}\n`,
      `/** Bind typed inbound handlers for a connection (\`JsonRpc.connect(transport, handlers({...}))\`). */`,
      `export const handlers = <R = never>(impl: InboundHandlers<R>): Effect.Effect<JsonRpc.PeerHandlers, never, R> =>\n` +
        `  JsonRpc.bindHandlers<R>(inbound, impl as any);\n`,
    ];
  };

  /**
   * Drop header imports the module turned out not to use. A package with its
   * own `postProcess` should call this one from it.
   */
  const postProcess = (code: string): string =>
    /\bT\./.test(code.replace(`import * as T from "../traits.ts";\n`, ""))
      ? code
      : code.replace(`import * as T from "../traits.ts";\n`, "");

  return { operation, header, footer, postProcess };
};

/** The export name the generator gives an operation (for package code). */
export const operationExportName = (method: string): string =>
  lowerFirst(methodToOperationName(method));

//#endregion
