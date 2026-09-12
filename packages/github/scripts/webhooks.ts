import * as Schema from "effect/Schema";
import {
  convertOpenApiToSmithy,
  type SmithyModel,
} from "@distilled.cloud/core/codegen/openapi";
import { generateService } from "@distilled.cloud/core/codegen/generator";

interface WebhookDescription {
  post: {
    "x-github": { subcategory: string };
    requestBody: { content: Record<string, { schema: unknown }> };
  };
}

/** Reuse the OpenAPI converter for incoming JSON bodies, grouped by event header. */
export const convertWebhooks = (document: {
  "x-webhooks": Record<string, WebhookDescription>;
  components: unknown;
  info: unknown;
  openapi: string;
}) => {
  const events = new Map<string, unknown[]>();
  for (const webhook of Object.values(document["x-webhooks"])) {
    // Header examples contain typos ("discussions", "project-v2"). The
    // webhook category is authoritative; wire event names use underscores.
    const name = webhook.post["x-github"].subcategory.replaceAll("-", "_");
    const schema = webhook.post.requestBody.content["application/json"]?.schema;
    if (!name || !schema)
      throw new Error(
        "GitHub webhook is missing its event name or JSON payload schema",
      );
    const variants = events.get(name) ?? [];
    variants.push(schema);
    events.set(name, variants);
  }
  const paths = Object.fromEntries(
    [...events]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, variants]) => [
        `/events/${name}`,
        {
          get: {
            operationId: `get-${name}-payload`,
            responses: {
              "200": {
                description: `${name} webhook payload`,
                content: {
                  "application/json": {
                    schema:
                      variants.length === 1 ? variants[0] : { oneOf: variants },
                  },
                },
              },
            },
          },
        },
      ]),
  );
  const model = convertOpenApiToSmithy(
    { ...document, paths },
    {
      namespace: "com.github.webhooks",
      serviceName: "Webhooks",
    },
  );
  const payloads: Record<string, string> = {};
  for (const [id, shape] of Object.entries(model.shapes)) {
    if (shape.type === "operation") {
      const name = shape.traits["smithy.api#http"].uri.slice("/events/".length);
      payloads[name] = shape.output.target;
      delete model.shapes[shape.input.target];
      delete model.shapes[id];
    } else if (shape.type === "service") {
      delete model.shapes[id];
    }
  }
  // These are schema roots, not callable REST operations.
  model.metadata.githubWebhookPayloads = payloads;
  return model;
};

export const WebhookModel = Schema.Struct({
  smithy: Schema.Literal("2.0"),
  metadata: Schema.Struct({
    githubWebhookPayloads: Schema.Record(Schema.String, Schema.String),
  }),
  shapes: Schema.Record(Schema.String, Schema.Unknown),
});

/** Generate schemas plus a delivery union correlated by X-GitHub-Event. */
export const generateWebhooks = (model: typeof WebhookModel.Type) => {
  const payloads = model.metadata.githubWebhookPayloads;
  const shapes: SmithyModel["shapes"] = model.shapes;
  const { code } = generateService(model, {
    nullableTrait: "com.distilled.openapi#nullable",
    extraRoots: () => Object.values(payloads),
    // Webhook schemas decode the wire JSON directly, without the REST protocol's
    // field-name mapping (for example, reaction counts named "+1" and "-1").
    structPipes: ({ id }) => {
      const keys = Object.fromEntries(
        Object.entries<{ traits?: Record<string, string> }>(
          shapes[id].members ?? {},
        ).flatMap(([name, member]) => {
          const wireName = member.traits?.["smithy.api#jsonName"];
          return wireName === undefined || wireName === name
            ? []
            : [[name, wireName]];
        }),
      );
      return Object.keys(keys).length
        ? [`S.encodeKeys(${JSON.stringify(keys)})`]
        : [];
    },
    extraBindings: [
      {
        trait: "com.distilled.openapi#rawResponse",
        binding: "rawResponse",
        pipe: "T.RawResponse()",
        rootPipe: "T.RawResponseRoot()",
      },
    ],
    header: () =>
      '// Generated from GitHub x-webhooks. Do not edit.\nimport * as S from "@distilled.cloud/core/schema";\nimport * as T from "./traits.ts";\n',
    operation: () => "",
    // Incoming payload schemas are pure codecs with no runtime services.
    postProcess: (code) => code.replaceAll("S.Schema<", "S.Codec<"),
    shapeOverride: ({ id, def, name, selfIdx, ref, tsRef }) => {
      if (def.type === "enum" || def.type === "intEnum") {
        const values = Object.values<{
          traits: Record<string, string | number>;
        }>(def.members).map((member) => member.traits["smithy.api#enumValue"]);
        return [
          `export type ${name} = ${values.map((value) => JSON.stringify(value)).join(" | ")};`,
          `export const ${name}: S.Codec<${name}> = /*@__PURE__*/ S.Literals(${JSON.stringify(values)});`,
        ];
      }
      if (def.type === "union") {
        const targets = Object.values<{ target: string }>(def.members)
          .map((member) => member.target)
          .filter((target) => target !== id);
        return [
          `export type ${name} = ${targets.map(tsRef).join(" | ")};`,
          `export const ${name} = /*@__PURE__*/ S.suspend(() => S.Union([${targets.map((target) => ref(target, selfIdx)).join(", ")}])) as S.Schema<${name}>;`,
        ];
      }
    },
  });
  const entries = Object.entries(payloads).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  const localName = (target: string) => target.split("#")[1]!;
  return (
    code +
    `
/** Payload schemas indexed by the X-GitHub-Event header. */
export const WebhookPayloadSchemas = {
${entries.map(([name, target]) => `  ${JSON.stringify(name)}: ${localName(target)},`).join("\n")}
};

export interface WebhookPayloads {
${entries.map(([name, target]) => `  ${JSON.stringify(name)}: ${localName(target)};`).join("\n")}
}

export type WebhookEventName = keyof WebhookPayloads;
export const WebhookEventName: S.Codec<WebhookEventName> = /*@__PURE__*/ S.Literals(${JSON.stringify(entries.map(([name]) => name))});

/** A delivery whose name determines its payload, including action variants. */
export const WebhookEvent: S.Codec<WebhookEvent> = /*@__PURE__*/ S.Union([
${entries.map(([name, target]) => `  S.Struct({ id: S.NonEmptyString, name: S.Literal(${JSON.stringify(name)}), payload: ${localName(target)} }),`).join("\n")}
]);

export type WebhookEvent<Name extends WebhookEventName = WebhookEventName> = {
  [K in Name]: { readonly id: string; readonly name: K; readonly payload: WebhookPayloads[K] }
}[Name];
`
  );
};
