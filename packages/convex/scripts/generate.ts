#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy models from scripts/convert.ts into an Effect SDK.
 *
 * Output: src/services/{management,deployment,functions}.ts + src/services/index.ts
 *
 * Patches apply in convert, so this script only compiles. Each service uses
 * its own protocol (see src/protocol.ts).
 */
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import { camel, lowerFirst } from "@distilled.cloud/dev/codegen/naming";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";
const PAGINATED_TRAIT = "smithy.api#paginated";
const KEY_DICTIONARY_TRAIT = "com.convex.protocols#keyDictionary";

/** The protocol each service's operations run on, by Smithy namespace. */
const PROTOCOLS: Record<string, string> = {
  "com.convex.api": "ConvexProtocol",
  "com.convex.deployment": "ConvexDeploymentProtocol",
  "com.convex.functions": "ConvexFunctionsProtocol",
};

const protocolFor = (model: { shapes?: Record<string, unknown> }): string => {
  const namespace = Object.keys(model.shapes ?? {})[0]?.split("#")[0] ?? "";
  const protocol = PROTOCOLS[namespace];
  if (protocol === undefined) throw new Error(`No Convex protocol for namespace ${namespace}`);
  return protocol;
};

/**
 * Convex lists by cursor (`cursor`/`limit` in, `pagination.nextCursor` out).
 * The shared OpenAPI converter doesn't detect that shape, so the trait is
 * stamped here. Core's paginateCursor follows it until it comes back null.
 */
const stampPagination = (shapes: Record<string, any>) => {
  for (const shape of Object.values(shapes)) {
    if (shape?.type !== "operation" || shape.traits?.[PAGINATED_TRAIT]) continue;
    const input = shapes[shape.input?.target];
    const output = shapes[shape.output?.target];
    if (!input?.members?.cursor || !output?.members?.pagination) continue;
    shape.traits ??= {};
    shape.traits[PAGINATED_TRAIT] = {
      mode: "cursor",
      inputToken: "cursor",
      outputToken: "pagination.nextCursor",
      items: "items",
      pageSize: "limit",
    };
  }
};

/**
 * Wire names are mixed; the TS surface is camelCase. Leading underscores strip
 * first, or `camel` would capitalize the next letter ("_other" → "Other").
 */
const memberName = (n: string) => lowerFirst(camel(n.replace(/^_+/, "")));

/**
 * Union content decodes opaque (see `union` in `makeSpec`), so the protocol
 * can't rename its keys from the schema. Each member holding such a union gets
 * a key dictionary instead. It sits on the member, not the operation root, so
 * the dictionary never touches user data elsewhere in the payload.
 */
const stampUnionKeys = (shapes: Record<string, any>) => {
  for (const shape of Object.values(shapes)) {
    for (const member of Object.values<any>(shape?.members ?? {})) {
      const union = shapes[member.target];
      if (union?.type !== "union") continue;
      const dict: Record<string, string> = {};
      for (const { target } of Object.values<any>(union.members ?? {})) {
        if (shapes[target]?.type !== "structure") continue;
        for (const wire of Object.keys(shapes[target].members ?? {})) {
          const name = memberName(wire);
          if (name !== wire) dict[name] = wire;
        }
      }
      if (Object.keys(dict).length === 0) continue;
      member.traits = { ...member.traits, [KEY_DICTIONARY_TRAIT]: dict };
    }
  }
};

/** The SDK spec for one Convex service. */
const makeSpec = (protocol: string): SdkSpec => ({
  memberName,
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole output member carrying a bare (array/scalar) response body; as
      // a response's sole member, the response IS the payload. Several Convex
      // lists are bare arrays.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  memberTraitPipes: {
    // Sensitive strings: Redacted-wrapped on decode by the REST protocol.
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
    [KEY_DICTIONARY_TRAIT]: "T.KeyDictionary",
  },
  // ...so their TS type is the Redacted the protocol actually delivers.
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // The spec's oneOf unions are plain value alternatives. Emit the TS union
  // with an opaque schema: the REST protocol passes union content through.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "items",
    },
  },

  sourceNote: ".generated-specs",

  operationDecl: {
    contextType: "ConvexOpContext",
    commonErrorType: "ConvexOpError",
    commonErrorClasses: [],
    protocol,
    retry: "Retry.Retry",
  },

  // No commonErrorClasses → the default header's errors import is empty;
  // drop it rather than shipping a dead `import {} from "../errors.ts"`.
  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) => {
    const withoutErrors = code.replace(/import \{\s*\} from "\.\.\/errors\.ts";\n/, "");
    return withoutErrors.includes("Redacted.Redacted<")
      ? withoutErrors.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport type * as Redacted from "effect/Redacted";\n`,
        )
      : withoutErrors;
  },
});

runGeneratorCli({
  description: "Generate the Convex Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  spec: (model) => {
    stampPagination((model.shapes ?? {}) as Record<string, any>);
    stampUnionKeys((model.shapes ?? {}) as Record<string, any>);
    return makeSpec(protocolFor(model));
  },
});
