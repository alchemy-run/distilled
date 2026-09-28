/**
 * AWS provider spec for the shared smithy→SDK compiler
 * (`@distilled.cloud/core/codegen/generator`).
 *
 * The driver owns the pipeline: operation discovery, Unit-I/O synthesis,
 * reachability (plus this spec's `extraRoots` for error-member deps),
 * cycle-tolerant topological order, and the shape/error/operation emission
 * loops. Everything AWS-specific lives here as sync functions over the
 * in-memory model:
 *
 * - `shapeOverride` owns every shape kind: newtypes (string/number/boolean/
 *   blob/timestamp/document aliases incl. sensitive wrappers and the
 *   reservedNewtypeNames suppression), enums (with spec-patch overrides),
 *   intEnums (S.Literals), sparse lists/maps, enum-key maps, structural
 *   unions incl. event streams, and structures (timestamp formats, streaming
 *   members, encodeKeys for jsonName, soft-required output intersections,
 *   operation-level annotations, Tarjan-driven typed suspend thunks).
 * - `errors.override` owns error classes: category decorators from HTTP
 *   status + name heuristics, T.AwsQueryError/T.Retryable/T.HttpError/
 *   T.SyntheticError annotations, and ErrorMemberPatch merges. Patched and
 *   synthetic errors from spec patches are materialized into the model as
 *   `aws.patched#`/`aws.synthetic#` shapes before generation so the driver's
 *   error collection sees them.
 * - `operation` owns op consts: the `& { pages; items }` paginated typing
 *   with item-type resolution, per-op derived request schemas for shared
 *   inputs with conflicting @http traits, `operationName`/
 *   `endpointHostPrefix` config lines, and htmlToJsdoc op docs.
 * - `header`/`postProcess` own the service consts (svc/auth/proto/ver/ns/
 *   rules via compile-rules) and conditional-import placeholder pruning.
 */
import { cyclicShapeIds } from "@distilled.cloud/core/codegen/graph";
import { mergePaginated } from "@distilled.cloud/core/codegen/pagination";
import { operationConst, PURE } from "@distilled.cloud/core/codegen/emit";
import {
  makeDescriptorCompiler,
  type DescriptorCompiler,
  type DescriptorProtocol,
} from "@distilled.cloud/core/codegen/descriptors";
import { tsKey } from "@distilled.cloud/core/codegen/naming";
import {
  errorCategories,
  type SdkSpec,
} from "@distilled.cloud/core/codegen/generator";
import { generateRuleSetCode, type RuleSetObject } from "./compile-rules.ts";
import type { ServiceSpec, SyntheticError } from "./spec-schema.ts";
import type { SmithyModel, ServiceShape } from "./model-schema.ts";

/** Internal traits carried by materialized (patch-born) error shapes. */
const ERROR_TAG_TRAIT = "aws.codegen#errorTag";
const SYNTHETIC_TRAIT = "aws.codegen#synthetic";

// =============================================================================
// Naming
// =============================================================================

/**
 * Shape id → TS-facing name. Type names are always capitalized (Smithy
 * models sometimes use lowercase names like `teamId`); `lowercase` yields
 * the exported operation-const casing.
 */
export function formatName(shapeId: string, lowercase = false): string {
  let name = shapeId.split("#")[1] ?? "";
  if (lowercase) {
    name = name.charAt(0).toLowerCase() + name.slice(1);
  } else {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  return name;
}

/** Remove dots from error names ("InvalidVpcID.NotFound" → "InvalidVpcIDNotFound"). */
function sanitizeErrorName(name: string): string {
  return name.replace(/\./g, "");
}

/**
 * Drop shapes whose namespace is not the service's (leftovers from an
 * internal service that shares the file). Mutates `model.shapes`.
 */
export const dropForeignNamespaceShapes = (model: SmithyModel): number => {
  const shapes = model.shapes as Record<string, any>;
  const service = Object.keys(shapes).find(
    (name) => shapes[name]?.type === "service",
  );
  if (service === undefined) return 0;
  const namespace = `${service.split("#")[0]}#`;
  const foreign = Object.keys(shapes).filter(
    (name) => !name.startsWith(namespace) && !name.startsWith("smithy."),
  );
  for (const name of foreign) delete shapes[name];
  return foreign.length;
};

const primitiveTarget = (type: string): string => {
  if (type === "boolean") return "smithy.api#Boolean";
  if (type === "number") return "smithy.api#Integer";
  return "smithy.api#String";
};

/**
 * Apply `patches/{sdkId}.json` to a Smithy model (unions, extra/synthetic
 * errors, structure/enum/error-member overrides, httpError status). Mutates
 * in place so `.generated-specs` is original + patches. Idempotent.
 */
export const applyAwsSpecPatches = (
  model: SmithyModel,
  serviceSpec: ServiceSpec,
  patchFileBase: string,
): void => {
  const shapes = model.shapes as Record<string, any>;
  const errorShapeIds = collectErrorShapeIds(model);

  if (serviceSpec.errorHttpStatus) {
    for (const [errorName, status] of Object.entries(
      serviceSpec.errorHttpStatus,
    )) {
      const entry = [...errorShapeIds.entries()].find(
        ([shapeId]) => shapeId.split("#")[1] === errorName,
      );
      if (entry === undefined) {
        throw new Error(
          `patches/${patchFileBase}.json errorHttpStatus patches error "${errorName}" which is not declared by any operation in the model`,
        );
      }
      const errShape = shapes[entry[0]];
      errShape.traits = {
        ...(errShape.traits ?? {}),
        "smithy.api#httpError": status,
      };
    }
  }

  if (serviceSpec.unions) {
    for (const [unionName, override] of Object.entries(serviceSpec.unions)) {
      const shapeEntry = Object.entries(shapes).find(
        ([id, shape]) =>
          id.split("#")[1] === unionName && shape.type === "union",
      );
      if (shapeEntry === undefined) {
        throw new Error(
          `patches/${patchFileBase}.json patches union "${unionName}" which does not exist in the model`,
        );
      }
      const members = shapeEntry[1].members as Record<
        string,
        { target: string }
      >;
      for (const [memberName, target] of Object.entries(override.add)) {
        members[memberName] ??= { target };
      }
    }
  }

  if (serviceSpec.structures) {
    for (const [structName, override] of Object.entries(
      serviceSpec.structures,
    )) {
      const shape = Object.entries(shapes).find(
        ([id, s]) => id.split("#")[1] === structName && s.type === "structure",
      )?.[1];
      if (shape === undefined) continue;
      for (const [memberName, memberOverride] of Object.entries(
        override.members,
      )) {
        const member = shape.members?.[memberName];
        if (member === undefined) continue;
        member.traits = { ...(member.traits ?? {}) };
        if (memberOverride.optional === true) {
          delete member.traits["smithy.api#required"];
        } else if (memberOverride.optional === false) {
          member.traits["smithy.api#required"] = {};
        }
        if (memberOverride.sensitive) {
          const target = shapes[member.target];
          const listTarget =
            target?.type === "list" ? shapes[target.member?.target] : undefined;
          const isString = (t: any, id: string) =>
            id === "smithy.api#String" || t?.type === "string";
          if (
            !isString(target, member.target) &&
            !(
              listTarget !== undefined &&
              isString(listTarget, target.member.target)
            )
          ) {
            throw new Error(
              `patches/${patchFileBase}.json sensitive override on ${structName}.${memberName} requires a plain string or list-of-string member`,
            );
          }
          member.traits["smithy.api#sensitive"] = {};
        }
      }
    }
  }

  if (serviceSpec.enums) {
    for (const [enumName, override] of Object.entries(serviceSpec.enums)) {
      const shapeEntry = Object.entries(shapes).find(
        ([id, s]) =>
          id.split("#")[1] === enumName &&
          (s.type === "enum" || s.type === "intEnum"),
      );
      if (shapeEntry === undefined) continue;
      const shape = shapeEntry[1];
      const values = override.replace ?? [
        ...Object.values(
          (shape.members ?? {}) as Record<string, { traits?: any }>,
        ).map((m) => m.traits?.["smithy.api#enumValue"]),
        ...(override.add ?? []),
      ];
      const members: Record<string, any> = {};
      const seen = new Set<string>();
      for (const value of values) {
        const literal = String(value);
        if (seen.has(literal)) continue;
        seen.add(literal);
        let key = literal.replace(/[^A-Za-z0-9_]/g, "_") || "VALUE";
        while (members[key] !== undefined) key = `${key}_`;
        members[key] = {
          target: "smithy.api#Unit",
          traits: { "smithy.api#enumValue": value },
        };
      }
      shape.members = members;
    }
  }

  const errorLocalToId = new Map<string, string>();
  for (const id of collectErrorShapeIds(model).keys()) {
    const localName = id.split("#")[1] ?? id;
    if (!errorLocalToId.has(localName)) errorLocalToId.set(localName, id);
  }

  const opShapeByExportName = new Map<string, any>();
  for (const [id, shape] of Object.entries(shapes)) {
    if (shape.type === "operation") {
      opShapeByExportName.set(formatName(id, true), shape);
    }
  }

  const orphanedPatchOperations = Object.keys(
    serviceSpec.operations ?? {},
  ).filter((name) => !opShapeByExportName.has(name));
  if (orphanedPatchOperations.length > 0) {
    throw new Error(
      `patches/${patchFileBase}.json patches unknown operation(s): ${orphanedPatchOperations.join(", ")}`,
    );
  }

  const materializePatchedError = (errorName: string): string => {
    const sanitized = sanitizeErrorName(errorName);
    const existing = errorLocalToId.get(sanitized);
    if (existing) return existing;
    const id = `aws.patched#${sanitized}`;
    shapes[id] = {
      type: "structure",
      members: {},
      traits: sanitized !== errorName ? { [ERROR_TAG_TRAIT]: errorName } : {},
    };
    errorLocalToId.set(sanitized, id);
    return id;
  };

  const materializeSyntheticError = (synthetic: SyntheticError): string => {
    const sanitized = sanitizeErrorName(synthetic.name);
    const existing = errorLocalToId.get(sanitized);
    if (existing) return existing;
    const baseId = errorLocalToId.get(sanitizeErrorName(synthetic.from));
    const baseMembers = baseId ? (shapes[baseId].members ?? {}) : {};
    const id = `aws.synthetic#${sanitized}`;
    shapes[id] = {
      type: "structure",
      members: { ...baseMembers },
      traits: {
        [SYNTHETIC_TRAIT]: { from: synthetic.from, message: synthetic.message },
      },
    };
    errorLocalToId.set(sanitized, id);
    return id;
  };

  for (const [opKey, patch] of Object.entries(serviceSpec.operations ?? {})) {
    const opShape = opShapeByExportName.get(opKey)!;
    const additions = [
      ...(patch.errors ?? []).map(materializePatchedError),
      ...(patch.syntheticErrors ?? []).map(materializeSyntheticError),
    ];
    if (additions.length) {
      const existingTargets = new Set(
        ((opShape.errors ?? []) as Array<{ target: string }>).map(
          (e) => e.target,
        ),
      );
      opShape.errors = [
        ...(opShape.errors ?? []),
        ...additions
          .filter((t) => !existingTargets.has(t))
          .map((target) => ({ target })),
      ];
    }
  }

  // After the operation patches so members can land on patch-born
  // (`aws.patched#…`) error shapes too.
  if (serviceSpec.errors) {
    for (const [errorName, members] of Object.entries(serviceSpec.errors)) {
      const shape = Object.entries(shapes).find(
        ([id, s]) => id.split("#")[1] === errorName && s.type === "structure",
      )?.[1];
      if (shape === undefined) continue;
      shape.members = { ...(shape.members ?? {}) };
      for (const [memberName, patch] of Object.entries(members)) {
        const traits: Record<string, unknown> = {};
        if (patch.optional !== false) {
          /* optional: no required trait */
        } else {
          traits["smithy.api#required"] = {};
        }
        if (patch.httpHeader) {
          traits["smithy.api#httpHeader"] = patch.httpHeader;
        }
        shape.members[memberName] = {
          target: primitiveTarget(patch.type),
          ...(Object.keys(traits).length ? { traits } : {}),
        };
      }
    }
  }
};

/**
 * Discriminated union variant with `?: never` props for easier narrowing:
 * `{ S: string; N?: never; B?: never }` instead of just `{ S: string }`.
 */
function generateUnionVariant(
  allMemberNames: string[],
  activeMemberName: string,
  activeMemberType: string,
): string {
  const props = allMemberNames.map((name) =>
    name === activeMemberName
      ? `${name}: ${activeMemberType}`
      : `${name}?: never`,
  );
  return `{ ${props.join("; ")} }`;
}

// Reserved names that should not be generated as newtypes.
// These either shadow built-in types or are trivial primitive aliases.
const reservedNewtypeNames = new Set([
  // Wrapper types that shadow primitives
  "String",
  "Number",
  "Boolean",
  "Object",
  "Array",
  "Date",
  "Error",
  "Function",
  "Symbol",
  "BigInt",
  // Lowercase primitives (TypeScript keywords)
  "string",
  "number",
  "boolean",
  "object",
  "symbol",
  "bigint",
  "undefined",
  "null",
  "never",
  "unknown",
  "any",
  "void",
  // Trivial primitive-like names (just alias the primitive with no meaning)
  "Integer",
  "Long",
  "Double",
  "Float",
  "Short",
  "Byte",
  "Blob",
  "Timestamp",
  // Nullable{X} pattern
  "NullableInteger",
  "NullableLong",
  "NullableDouble",
  "NullableFloat",
  "NullableBoolean",
  // Underscore-prefixed generic primitives
  "__boolean",
  "__integer",
  "__long",
  "__string",
  "__double",
  "__float",
  // Wrapper{X} pattern - generic wrappers around primitives
  "WrapperBoolean",
  "WrapperInt",
  "WrapperInteger",
  "WrapperLong",
  "WrapperDouble",
  "WrapperFloat",
  "WrapperString",
  // {X}Optional pattern - optional primitives
  "BooleanOptional",
  "IntegerOptional",
  "LongOptional",
  "DoubleOptional",
  "FloatOptional",
  "StringOptional",
  // Generic{X} pattern - generic primitives
  "GenericTimestamp",
  "GenericTimeStamp",
  "GenericBoolean",
  "GenericInteger",
  "GenericLong",
  "GenericDouble",
  "GenericFloat",
  "GenericString",
  // Trivial boolean aliases
  "BooleanObject",
  "BooleanType",
  "BooleanValue",
  "Bool",
  "Boolean2",
  "booleanValue",
  "bool",
  // Lowercase primitives
  "long",
  "timestamp",
  "dateType",
  // Trivial timestamp aliases
  "DateTime",
  "TimeStamp",
  "TStamp",
  "Time",
  "DateType",
  "DateTimestamp",
  "TimestampType",
]);

// =============================================================================
// Error categories
// =============================================================================

/**
 * Infer error categories from error name patterns. These heuristics
 * supplement HTTP status code-based categorization. Names are sanitized
 * (dots removed) before this is called.
 */
function inferCategoriesFromName(errorName: string): string[] {
  const categories: string[] = [];
  const name = errorName.toLowerCase();

  // DependencyViolationError - resource can't be deleted/modified because something depends on it
  if (name === "dependencyviolation" || name.endsWith("inuse")) {
    categories.push("DependencyViolationError");
  }
  // AlreadyExistsError - trying to create something that already exists
  if (name.includes("alreadyexists") || name.endsWith("duplicate")) {
    categories.push("AlreadyExistsError");
  }
  // ConflictError - general conflicts (not dependency or already-exists)
  if (name === "cidrconflict" || name === "idempotentparametermismatch") {
    categories.push("ConflictError");
  }
  // AuthError patterns - access denied, unauthorized, auth failures
  if (
    name.includes("accessdenied") ||
    name.includes("unauthorized") ||
    name === "authfailure" ||
    name === "invalidclienttokenid" ||
    name === "signaturedoesnotmatch"
  ) {
    categories.push("AuthError");
  }
  // ThrottlingError patterns - rate/quota limits exceeded
  if (name.endsWith("limitexceeded")) {
    categories.push("ThrottlingError");
  }
  // ServerError patterns - internal errors, service unavailable
  if (name.includes("internalerror") || name.includes("serviceunavailable")) {
    categories.push("ServerError");
  }

  return categories;
}

// =============================================================================
// Model collections (sync passes over the loaded model)
// =============================================================================

interface ErrorShapeTraits {
  httpError?: number;
  awsQueryError?: {
    code: string;
    httpResponseCode: number;
  };
  retryable?: {
    throttling?: boolean;
  };
}

/** Error shape ids declared by operations, with their error traits. */
function collectErrorShapeIds(
  model: SmithyModel,
): Map<string, ErrorShapeTraits> {
  const errorShapeIds = new Map<string, ErrorShapeTraits>();

  for (const [, shape] of Object.entries(model.shapes)) {
    if (shape.type === "operation" && shape.errors) {
      for (const error of shape.errors) {
        const errorShape = model.shapes[error.target];
        const httpError = errorShape?.traits?.["smithy.api#httpError"] as
          | number
          | undefined;
        const awsQueryError = errorShape?.traits?.[
          "aws.protocols#awsQueryError"
        ] as { code: string; httpResponseCode: number } | undefined;
        const retryable = errorShape?.traits?.["smithy.api#retryable"] as
          | { throttling?: boolean }
          | undefined;
        errorShapeIds.set(error.target, {
          httpError,
          awsQueryError,
          retryable,
        });
      }
    }
  }

  return errorShapeIds;
}

interface OperationInputTraits {
  method: string;
  uri: string;
  httpChecksum?: {
    requestAlgorithmMember?: string;
    requestChecksumRequired?: boolean;
    responseAlgorithms?: string[];
  };
  staticContextParams?: Record<string, { value: unknown }>;
}

/**
 * Operation traits for input schemas.
 *
 * - inputTraits: input schema name → traits baked into that schema constant.
 * - inputTraitOverrides: operation name → traits, for operations whose input
 *   shape is SHARED by multiple operations with CONFLICTING traits
 *   (restJson services commonly reuse one `Scalar{X}Request` shape across
 *   Get/Delete/Enable/Disable with different @http bindings). Keying traits
 *   by input shape name alone made the last writer win, so e.g.
 *   rolesanywhere DisableTrustAnchor issued GET /trustanchor/{id} and
 *   silently no-op'd. The operation emitter derives a `${OpName}Request`
 *   schema for each overridden operation.
 */
function collectOperationInputTraits(model: SmithyModel): {
  operationInputTraits: Map<string, OperationInputTraits>;
  operationInputTraitOverrides: Map<string, OperationInputTraits>;
} {
  const inputTraits = new Map<string, OperationInputTraits>();
  const opsByInput = new Map<
    string,
    { opName: string; traits: OperationInputTraits }[]
  >();

  for (const [shapeId, shape] of Object.entries(model.shapes)) {
    if (shape.type === "operation" && shape.input) {
      const httpTrait = (shape.traits?.["smithy.api#http"] as {
        method?: string;
        uri?: string;
      }) ?? {
        method: "POST",
        uri: "/",
      };
      const httpChecksumTrait = shape.traits?.["aws.protocols#httpChecksum"] as
        | OperationInputTraits["httpChecksum"]
        | undefined;
      const staticContextParamsTrait = shape.traits?.[
        "smithy.rules#staticContextParams"
      ] as Record<string, { value: unknown }> | undefined;

      const traits: OperationInputTraits = {
        method: httpTrait.method ?? "POST",
        uri: httpTrait.uri ?? "/",
        httpChecksum: httpChecksumTrait,
        staticContextParams: staticContextParamsTrait,
      };

      // Operations with `smithy.api#Unit` inputs get a synthesized
      // `${OpName}Request` schema (the driver's ensureNamedIo), so key
      // their traits under that name — keying under "Unit" loses the
      // operation's real @http trait and every Unit-input operation
      // silently falls back to POST "/" (observed live: resource-explorer-2
      // GetIndex returned AccessDeniedException because it was posted to
      // "/" instead of "/GetIndex").
      if (shape.input.target === "smithy.api#Unit") {
        inputTraits.set(`${shapeId.split("#")[1]}Request`, traits);
        continue;
      }
      const inputName = formatName(shape.input.target);
      const ops = opsByInput.get(inputName) ?? [];
      ops.push({ opName: shapeId.split("#")[1] ?? "", traits });
      opsByInput.set(inputName, ops);
    }
  }

  const inputTraitOverrides = new Map<string, OperationInputTraits>();
  for (const [inputName, ops] of opsByInput) {
    const distinct = new Set(ops.map((o) => JSON.stringify(o.traits)));
    if (distinct.size === 1) {
      inputTraits.set(inputName, ops[0].traits);
      continue;
    }
    // Conflicting traits on a shared input shape. The op whose natural
    // `${OpName}Request` name matches the shape keeps ownership of the base
    // schema (so no derived name can collide with the base); otherwise the
    // first op in model order owns it. Every other op with different traits
    // gets a per-operation override.
    const owner = ops.find((o) => `${o.opName}Request` === inputName) ?? ops[0];
    inputTraits.set(inputName, owner.traits);
    const ownerKey = JSON.stringify(owner.traits);
    for (const op of ops) {
      if (op === owner || JSON.stringify(op.traits) === ownerKey) continue;
      inputTraitOverrides.set(op.opName, op.traits);
    }
  }

  return {
    operationInputTraits: inputTraits,
    operationInputTraitOverrides: inputTraitOverrides,
  };
}

interface OperationOutputTraits {
  s3UnwrappedXmlOutput?: boolean;
}

/** Operation output schema names and their traits. */
function collectOperationOutputTraits(
  model: SmithyModel,
): Map<string, OperationOutputTraits> {
  const outputTraits = new Map<string, OperationOutputTraits>();

  for (const [, shape] of Object.entries(model.shapes)) {
    if (shape.type === "operation" && shape.output) {
      const outputName = formatName(shape.output.target);
      const s3UnwrappedXmlOutput =
        shape.traits?.["aws.customizations#s3UnwrappedXmlOutput"] != null;

      outputTraits.set(outputName, {
        s3UnwrappedXmlOutput: s3UnwrappedXmlOutput || undefined,
      });
    }
  }

  return outputTraits;
}

/** Shape ids carrying the @sensitive trait. */
function collectSensitiveShapeIds(model: SmithyModel): Set<string> {
  const sensitiveShapeIds = new Set<string>();
  for (const [shapeId, shape] of Object.entries(model.shapes)) {
    if (shape.traits?.["smithy.api#sensitive"]) {
      sensitiveShapeIds.add(shapeId);
    }
  }
  return sensitiveShapeIds;
}

/**
 * `${OpName}Error` alias names for every operation in the service tree —
 * supporting structs with those names are renamed `Name_` to avoid
 * colliding with the per-op error union aliases.
 */
function collectOperationErrorTypeNames(model: SmithyModel): Set<string> {
  const errorTypeNames = new Set<string>();
  const serviceShape = Object.values(model.shapes).find(
    (s) => s.type === "service",
  ) as ServiceShape | undefined;
  if (!serviceShape) return errorTypeNames;

  const allOperationIds: string[] = [];

  for (const op of serviceShape.operations ?? []) {
    allOperationIds.push(op.target);
  }

  const collectResourceOperations = (resourceTarget: string) => {
    const resourceShape = model.shapes[resourceTarget] as any;
    if (!resourceShape || resourceShape.type !== "resource") return;
    if (resourceShape.create) allOperationIds.push(resourceShape.create.target);
    if (resourceShape.put) allOperationIds.push(resourceShape.put.target);
    if (resourceShape.read) allOperationIds.push(resourceShape.read.target);
    if (resourceShape.update) allOperationIds.push(resourceShape.update.target);
    if (resourceShape.delete) allOperationIds.push(resourceShape.delete.target);
    if (resourceShape.list) allOperationIds.push(resourceShape.list.target);
    for (const op of resourceShape.operations ?? []) {
      allOperationIds.push(op.target);
    }
    for (const op of resourceShape.collectionOperations ?? []) {
      allOperationIds.push(op.target);
    }
    for (const nestedResource of resourceShape.resources ?? []) {
      collectResourceOperations(nestedResource.target);
    }
  };

  for (const resource of serviceShape.resources ?? []) {
    collectResourceOperations(resource.target);
  }

  for (const operationId of new Set(allOperationIds)) {
    errorTypeNames.add(`${formatName(operationId)}Error`);
  }

  return errorTypeNames;
}

/**
 * Members with both @clientOptional and @required — "soft required":
 * optional for inputs but shown required in output types.
 */
function collectSoftRequiredMembers(
  model: SmithyModel,
): Map<string, { memberName: string; tsType: string }[]> {
  const result = new Map<string, { memberName: string; tsType: string }[]>();

  for (const [shapeId, shape] of Object.entries(model.shapes)) {
    if (shape.type !== "structure" || !shape.members) continue;

    const softRequiredMembers: { memberName: string; tsType: string }[] = [];

    for (const [memberName, member] of Object.entries(shape.members)) {
      const hasClientOptional =
        member.traits?.["smithy.api#clientOptional"] != null;
      const hasRequired = member.traits?.["smithy.api#required"] != null;

      if (hasClientOptional && hasRequired) {
        const memberTargetShape = model.shapes[member.target];
        const shapeName = formatName(member.target);
        let tsType: string;

        if (member.target.startsWith("smithy.api#")) {
          const primitiveMap: Record<string, string> = {
            "smithy.api#String": "string",
            "smithy.api#Boolean": "boolean",
            "smithy.api#Integer": "number",
            "smithy.api#Long": "number",
            "smithy.api#Short": "number",
            "smithy.api#Byte": "number",
            "smithy.api#Float": "number",
            "smithy.api#Double": "number",
            "smithy.api#BigInteger": "bigint",
            "smithy.api#BigDecimal": "number",
            "smithy.api#Timestamp": "Date",
            "smithy.api#Blob": "Uint8Array",
            "smithy.api#Document": "unknown",
          };
          tsType = primitiveMap[member.target] ?? "unknown";
        } else if (reservedNewtypeNames.has(shapeName)) {
          // Reserved names fall back to TS primitives
          const typeMap: Record<string, string> = {
            boolean: "boolean",
            string: "string",
            integer: "number",
            long: "number",
            double: "number",
            float: "number",
            short: "number",
            byte: "number",
            timestamp: "Date",
            blob: "Uint8Array",
            document: "unknown",
          };
          tsType =
            (memberTargetShape && typeMap[memberTargetShape.type]) ?? "unknown";
        } else {
          tsType = shapeName;
        }

        softRequiredMembers.push({ memberName, tsType });
      }
    }

    if (softRequiredMembers.length > 0) {
      result.set(formatName(shapeId), softRequiredMembers);
    }
  }

  return result;
}

/**
 * The output type for a shape including deep intersections for
 * soft-required members:
 * - Direct: `Api & { Name: string }`
 * - Nested: `Config & { Item: ItemType & { Name: string } }`
 * - Lists: `(Api & { Name: string })[]`
 * - Maps: `{ [key: string]: (Item & { Name: string }) | undefined }`
 * Returns null when no intersection is needed.
 */
function computeOutputIntersection(
  shapeId: string,
  model: SmithyModel,
  softRequiredMembers: Map<string, { memberName: string; tsType: string }[]>,
  visited: Set<string> = new Set(),
): string | null {
  if (visited.has(shapeId)) return null;
  visited.add(shapeId);

  const shape = model.shapes[shapeId] as any;
  if (!shape) return null;

  const typeName = formatName(shapeId);

  if (shape.type === "structure") {
    const directSoftRequired = softRequiredMembers.get(typeName);

    // Member name → intersection field string. Prevents duplicates when a
    // member is both soft-required AND has nested soft-required members.
    const fieldMap = new Map<string, string>();

    if (directSoftRequired && directSoftRequired.length > 0) {
      for (const m of directSoftRequired) {
        fieldMap.set(m.memberName, m.tsType);
      }
    }

    if (shape.members) {
      for (const [memberName, member] of Object.entries(
        shape.members as Record<string, { target: string }>,
      )) {
        const memberIntersection = computeOutputIntersection(
          member.target,
          model,
          softRequiredMembers,
          new Set(visited),
        );
        if (memberIntersection) {
          fieldMap.set(memberName, memberIntersection);
        }
      }
    }

    if (fieldMap.size > 0) {
      const fields = Array.from(fieldMap.entries())
        .map(([name, type]) => `${name}: ${type}`)
        .join("; ");
      return `(${typeName} & { ${fields} })`;
    }

    return null;
  }

  if (shape.type === "list") {
    if (shape.member?.target) {
      const elementIntersection = computeOutputIntersection(
        shape.member.target,
        model,
        softRequiredMembers,
        new Set(visited),
      );
      if (elementIntersection) {
        return `${elementIntersection}[]`;
      }
    }
    return null;
  }

  if (shape.type === "map") {
    if (shape.value?.target) {
      const valueIntersection = computeOutputIntersection(
        shape.value.target,
        model,
        softRequiredMembers,
        new Set(visited),
      );
      if (valueIntersection) {
        return `{ [key: string]: (${valueIntersection}) | undefined }`;
      }
    }
    return null;
  }

  return null;
}

// =============================================================================
// Docs
// =============================================================================

/** AWS's HTML operation docs → a JSDoc block. */
export function htmlToJsdoc(html: string): string {
  const text = html
    // Remove opening JSDoc comment if present
    .replace(/^\/\*\*\s*/, "")
    .replace(/\s*\*\/$/, "")
    // Convert common HTML elements
    .replace(/<\/?p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?note>/gi, "\n")
    .replace(/<\/?important>/gi, "\n")
    .replace(/<li>\s*/gi, "\n- ")
    .replace(/<\/li>/gi, "")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<ul>/gi, "")
    .replace(/<dt>(.*?)<\/dt>/gi, "\n### $1\n")
    .replace(/<dd>/gi, "")
    .replace(/<\/dd>/gi, "\n")
    .replace(/<dl>/gi, "")
    .replace(/<\/dl>/gi, "")
    // Handle code blocks
    .replace(/<code>(.*?)<\/code>/gi, "`$1`")
    // Handle links - extract text only
    .replace(/<a[^>]*>(.*?)<\/a>/gi, "$1")
    // Handle bold/emphasis
    .replace(/<b>(.*?)<\/b>/gi, "**$1**")
    .replace(/<i>(.*?)<\/i>/gi, "*$1*")
    // Remove any remaining HTML tags
    .replace(/<[^>]+>/g, "")
    // Decode HTML entities
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Clean up whitespace
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    // Escape */ to prevent premature closing of JSDoc comment
    .replace(/\*\//g, "*\\/")
    .trim();

  const lines = text.split("\n").map((line) => ` * ${line.trim()}`);
  const dedupedLines = lines.filter(
    (line, i) => !(line === " * " && lines[i - 1] === " * "),
  );
  return `/**\n${dedupedLines.join("\n")}\n */\n`;
}

// =============================================================================
// The spec factory
// =============================================================================

const smithyPrimitiveToTs: Record<string, string> = {
  "smithy.api#String": "string",
  "smithy.api#Boolean": "boolean",
  "smithy.api#Integer": "number",
  "smithy.api#Long": "number",
  "smithy.api#Float": "number",
  "smithy.api#Double": "number",
  "smithy.api#Byte": "number",
  "smithy.api#Short": "number",
  "smithy.api#BigInteger": "bigint",
  "smithy.api#BigDecimal": "number",
  "smithy.api#Blob": "Uint8Array",
  "smithy.api#Timestamp": "Date",
  "smithy.api#Document": "unknown",
};

/**
 * Build the AWS SdkSpec for one loaded model. The model is
 * `.generated-specs/<sdkId>.json` — already patched by scripts/convert.ts
 * (`applyAwsSpecPatches`), so every override is a trait or shape here.
 * `serviceSpec` is only consulted for `errorCategories`, which is an
 * emit-time classification rather than a model fact.
 */
const lcFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const ucFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const XML_NAME = "smithy.api#xmlName";

/** How each AWS wire protocol names members and which facts it needs. */
export const awsDescriptorProtocol = (protocol: string): DescriptorProtocol => {
  switch (protocol) {
    case "aws.protocols#awsJson1_0":
    case "aws.protocols#awsJson1_1":
      return {
        xml: false,
        rest: false,
        closedRequests: true,
        markRequestMaps: false,
        listItemNames: false,
        bodyTimestamp: "epoch-seconds",
        // awsJson ignores jsonName
        wireName: (member) => ({ wire: member, fallback: member }),
      };
    case "aws.protocols#restJson1":
      return {
        xml: false,
        rest: true,
        closedRequests: true,
        markRequestMaps: false,
        listItemNames: false,
        bodyTimestamp: "epoch-seconds",
        wireName: (member, traits) => ({
          wire: (traits["smithy.api#jsonName"] as string) ?? member,
          fallback: member,
        }),
      };
    case "aws.protocols#restXml":
      return {
        xml: true,
        rest: true,
        closedRequests: true,
        markRequestMaps: true,
        listItemNames: true,
        bodyTimestamp: "date-time",
        wireName: (member, traits) => ({
          wire: (traits[XML_NAME] as string) ?? member,
          fallback: member,
        }),
      };
    case "aws.protocols#awsQuery":
      return {
        xml: true,
        rest: false,
        closedRequests: true,
        markRequestMaps: true,
        listItemNames: true,
        bodyTimestamp: "date-time",
        wireName: (member, traits) => ({
          wire: (traits[XML_NAME] as string) ?? member,
          fallback: member,
        }),
      };
    case "aws.protocols#ec2Query":
      return {
        xml: true,
        rest: false,
        closedRequests: true,
        markRequestMaps: true,
        listItemNames: false,
        bodyTimestamp: "date-time",
        wireName: (member, traits, direction) => {
          if (direction === "in") {
            const wire =
              (traits["aws.protocols#ec2QueryName"] as string) ??
              ucFirst((traits[XML_NAME] as string) ?? member);
            return { wire, fallback: ucFirst(member) };
          }
          // Responses: lowerCamel elements; the runtime maps an unmodeled
          // element back by capitalizing it, so emit a rename whenever that
          // round trip doesn't land on the member name.
          const wire = (traits[XML_NAME] as string) ?? lcFirst(member);
          const ok = wire === lcFirst(member) && ucFirst(wire) === member;
          return { wire, fallback: ok ? wire : `\u0000${wire}` };
        },
      };
    default:
      throw new Error(`unsupported protocol ${protocol}`);
  }
};

/** Runtime protocol implementation per Smithy protocol trait. */
const PROTOCOL_IMPORTS: Record<string, [string, string]> = {
  "aws.protocols#restXml": ["restXmlProtocol", "../protocols/rest-xml.ts"],
  "aws.protocols#restJson1": ["restJson1Protocol", "../protocols/rest-json.ts"],
  "aws.protocols#awsJson1_0": [
    "awsJson1_0Protocol",
    "../protocols/aws-json.ts",
  ],
  "aws.protocols#awsJson1_1": [
    "awsJson1_1Protocol",
    "../protocols/aws-json.ts",
  ],
  "aws.protocols#awsQuery": ["awsQueryProtocol", "../protocols/aws-query.ts"],
  "aws.protocols#ec2Query": ["ec2QueryProtocol", "../protocols/ec2-query.ts"],
};

export const awsSpec = (
  model: SmithyModel,
  serviceSpec: ServiceSpec,
): SdkSpec => {
  const shapes = model.shapes as Record<string, any>;

  // --- Service-level facts ---------------------------------------------------
  const serviceEntry = Object.entries(shapes).find(
    ([, s]) => s.type === "service",
  );
  if (!serviceEntry) throw new Error("service shape not found");
  const [serviceShapeId, serviceShape] = serviceEntry as [string, any];
  const protocol: string | undefined = Object.keys(
    serviceShape.traits ?? {},
  ).find((key) => key.startsWith("aws.protocols#"));
  if (protocol == null) throw new Error("protocol not found");

  const serviceShapeName = serviceShapeId.split("#")[1] ?? "";
  const sdkId: string = serviceShape.traits["aws.api#service"].sdkId;
  const sigV4ServiceName: string =
    serviceShape.traits?.["aws.auth#sigv4"]?.name ?? serviceShapeName;
  // Signature Version 2. AWS never defined a Smithy trait for it (SigV2 was
  // dead before Smithy existed), so this is provider-defined — but the
  // runtime trait already exists, and SimpleDB's endpoint rejects SigV4
  // outright, so a model has to be able to say so.
  const sigV2ServiceName: string | undefined =
    serviceShape.traits?.["aws.auth#sigv2"]?.name;
  const version: string = serviceShape.version ?? "";

  const serviceXmlNamespace = (
    serviceShape.traits?.["smithy.api#xmlNamespace"] as
      | { uri: string }
      | undefined
  )?.uri;
  const endpointRuleSet = serviceShape.traits?.["smithy.rules#endpointRuleSet"];
  const servicePaginatedTrait = serviceShape.traits?.[
    "smithy.api#paginated"
  ] as Record<string, string> | undefined;

  const isJsonProtocol =
    protocol === "aws.protocols#restJson1" ||
    protocol === "aws.protocols#awsJson1_0" ||
    protocol === "aws.protocols#awsJson1_1";

  // --- Global collections (same order as the pre-port generator) ------------
  // Cycle analysis over TS-facing names (Tarjan, shared with the other SDK
  // generators): cyclic shapes suspend at reference sites, cyclic STRUCTS
  // additionally get typed suspend thunks to break circular type inference.
  const nameDeps = new Map<string, string[]>();
  const allStructNames = new Set<string>();
  const allUnionNames = new Set<string>();
  const allSchemaNames = new Set<string>();
  for (const [shapeId, shape] of Object.entries(shapes)) {
    const name = formatName(shapeId);
    if (!name) continue;
    const deps: string[] = [];
    if (shape.type === "structure" || shape.type === "union") {
      for (const member of Object.values(
        (shape.members ?? {}) as Record<string, { target: string }>,
      )) {
        const depName = formatName(member.target);
        if (depName) deps.push(depName);
      }
      if (shape.type === "structure") allStructNames.add(name);
      else allUnionNames.add(name);
      allSchemaNames.add(name);
    } else if (shape.type === "list") {
      const depName = formatName(shape.member.target);
      if (depName) deps.push(depName);
      allSchemaNames.add(name);
    } else if (shape.type === "map") {
      const keyName = formatName(shape.key.target);
      const valueName = formatName(shape.value.target);
      if (keyName) deps.push(keyName);
      if (valueName) deps.push(valueName);
      allSchemaNames.add(name);
    } else if (
      shape.type === "string" ||
      shape.type === "integer" ||
      shape.type === "long" ||
      shape.type === "double" ||
      shape.type === "float"
    ) {
      // Newtype aliases (`type Region = string`) participate in name-conflict
      // detection; enums/intEnums historically did not.
      allSchemaNames.add(name);
    }
    nameDeps.set(name, deps);
  }
  const cyclicSchemas = cyclicShapeIds(
    Object.fromEntries([...nameDeps].map(([n, deps]) => [n, { deps }])),
    nameDeps.keys(),
    (rec) => rec?.deps ?? [],
  );
  const cyclicClasses = new Set<string>();
  for (const name of cyclicSchemas) {
    if (allStructNames.has(name)) cyclicClasses.add(name);
  }

  // Import refs aliased only where a generated schema name conflicts.
  const credsRef = allSchemaNames.has("Credentials") ? "Creds" : "Credentials";
  const commonErrorsRef = allSchemaNames.has("CommonErrors")
    ? "CommonErr"
    : "CommonErrors";

  const errorShapeIds = collectErrorShapeIds(model);

  const { operationInputTraits, operationInputTraitOverrides } =
    collectOperationInputTraits(model);
  const operationOutputTraits = collectOperationOutputTraits(model);
  const sensitiveShapeIds = collectSensitiveShapeIds(model);
  const operationErrorTypeNames = collectOperationErrorTypeNames(model);
  const softRequiredMembers = collectSoftRequiredMembers(model);

  // Runtime descriptors: compile every operation first so structures shared
  // between operations are hoisted (and single-use ones inlined).
  const descriptorProtocol = awsDescriptorProtocol(protocol);
  const descriptors: DescriptorCompiler = makeDescriptorCompiler(
    shapes,
    descriptorProtocol,
  );
  const ioTarget = (ref: { target: string } | undefined) =>
    ref === undefined || ref.target === "smithy.api#Unit"
      ? undefined
      : ref.target;
  const compiledOps = new Map<
    string,
    () => { input?: string; output?: string }
  >();
  for (const [shapeId, shape] of Object.entries(shapes)) {
    if (shape.type !== "operation") continue;
    compiledOps.set(
      shapeId,
      descriptors.operation({
        input: ioTarget(shape.input),
        output: ioTarget(shape.output),
      }).render,
    );
  }
  const HTTP_BINDINGS = [
    "smithy.api#httpLabel",
    "smithy.api#httpHeader",
    "smithy.api#httpQuery",
    "smithy.api#httpQueryParams",
    "smithy.api#httpPrefixHeaders",
    "smithy.api#httpPayload",
  ];

  // Blob shapes referenced from at least one generic context. Structure
  // members bound as httpPayload (and streaming members) use the
  // T.Streaming* schemas and never reference the blob's alias — a blob
  // reached ONLY through such members gets no `export type X = Uint8Array`
  // newtype alias.
  const blobAliasTargets = new Set<string>();
  const noteBlobRef = (target: string, payloadBound: boolean) => {
    const t = shapes[target];
    if (t?.type !== "blob") return;
    const streaming = t.traits?.["smithy.api#streaming"] != null;
    if (!streaming && !payloadBound) blobAliasTargets.add(target);
  };
  for (const [, shape] of Object.entries(shapes)) {
    if (shape.type === "structure") {
      for (const member of Object.values(
        (shape.members ?? {}) as Record<
          string,
          { target: string; traits?: Record<string, unknown> }
        >,
      )) {
        noteBlobRef(
          member.target,
          (member.traits ?? {})["smithy.api#httpPayload"] != null,
        );
      }
    } else if (shape.type === "list") {
      noteBlobRef(shape.member.target, false);
    } else if (shape.type === "map") {
      noteBlobRef(shape.key.target, false);
      noteBlobRef(shape.value.target, false);
    } else if (shape.type === "union") {
      for (const member of Object.values(
        (shape.members ?? {}) as Record<string, { target: string }>,
      )) {
        noteBlobRef(member.target, false);
      }
    }
  }

  // The driver synthesizes `${OpName}Response` structures for Unit outputs;
  // they carry the service XML namespace like any op output.
  const unitResponseNames = new Set<string>();
  for (const [shapeId, shape] of Object.entries(shapes)) {
    if (
      shape.type === "operation" &&
      shape.output?.target === "smithy.api#Unit"
    ) {
      unitResponseNames.add(`${shapeId.split("#")[1]}Response`);
    }
  }

  // --- Schema expression / TS type resolution (sync, model-backed) ----------

  /** Structure name with the operation-error-alias conflict rename applied. */
  const structRefName = (shapeId: string): string => {
    const name = formatName(shapeId);
    const isErrorShape = errorShapeIds.has(shapeId);
    const isOpInput = operationInputTraits.has(name);
    const isOpOutput = operationOutputTraits.has(name);
    return !isErrorShape &&
      !isOpInput &&
      !isOpOutput &&
      operationErrorTypeNames.has(name)
      ? `${name}_`
      : name;
  };

  /** A shape target's TypeScript type string (model-backed). */
  const tsTypeOf = (target: string): string => {
    switch (target) {
      case "smithy.api#String":
        return "string";
      case "smithy.api#Boolean":
      case "smithy.api#PrimitiveBoolean":
        return "boolean";
      case "smithy.api#Integer":
      case "smithy.api#PrimitiveInteger":
      case "smithy.api#Long":
      case "smithy.api#PrimitiveLong":
      case "smithy.api#Double":
      case "smithy.api#PrimitiveDouble":
      case "smithy.api#Float":
      case "smithy.api#PrimitiveFloat":
      case "smithy.api#Byte":
      case "smithy.api#PrimitiveByte":
      case "smithy.api#Short":
      case "smithy.api#PrimitiveShort":
      case "smithy.api#BigDecimal":
        return "number";
      case "smithy.api#BigInteger":
        return "bigint";
      case "smithy.api#Timestamp":
        return "Date";
      case "smithy.api#Blob":
        return "Uint8Array";
      case "smithy.api#Document":
        return "any";
      case "smithy.api#Unit":
        return "Record<string, never>";
    }

    const shape = shapes[target];
    if (!shape) throw new Error(`unable to find shape: ${target}`);
    const name = formatName(target);

    switch (shape.type) {
      case "integer":
      case "long":
      case "double":
      case "float":
        return "number";
      case "string":
        return sensitiveShapeIds.has(target)
          ? "string | redacted.Redacted<string>"
          : "string";
      case "blob":
        if (shape.traits?.["smithy.api#streaming"] != null) {
          return "T.StreamBody";
        }
        return sensitiveShapeIds.has(target)
          ? "Uint8Array | redacted.Redacted<Uint8Array>"
          : "Uint8Array";
      case "boolean":
        return "boolean";
      case "timestamp":
        return "Date";
      case "document":
        return "any";
      case "enum":
      case "intEnum":
        return name;
      case "structure":
        return structRefName(target);
      case "list": {
        // Parenthesize union element types (e.g. sensitive members that
        // render as `string | redacted.Redacted<string>`) so the `[]`
        // suffix binds to the whole union, not just the last member.
        const elementType = tsTypeOf(shape.member.target);
        return elementType.includes("|")
          ? `(${elementType})[]`
          : `${elementType}[]`;
      }
      case "map": {
        // Include | undefined so users can pass objects with undefined
        // values (dropped during serialization).
        const valueType = tsTypeOf(shape.value.target);
        return `{ [key: string]: ${valueType} | undefined }`;
      }
      case "union":
        return name;
      default:
        throw new Error(
          `Cannot convert shape type "${shape.type}" to TypeScript type: ${target}`,
        );
    }
  };

  /**
   * TS type of a member/element reference. Enum openness lives on the
   * ALIAS (`type X = "a" | (string & {})`, v0 surface), so references are
   * always the plain alias regardless of direction.
   */
  const tsTypeAt = (target: string, _ownerName: string): string =>
    tsTypeOf(target);

  // --- Member conversion (shared by structures and error classes) -----------

  interface ConvertedMember {
    name: string;
    tsType: string;
    isOptional: boolean;
    isSoftRequired: boolean;
  }

  /** A structure/error member's TypeScript type and optionality. */
  const convertMember = (
    ownerName: string,
    memberName: string,
    member: { target: string; traits?: Record<string, unknown> },
    ctx: { isOperationInput: boolean; isOperationOutput: boolean },
  ): ConvertedMember => {
    const traits = member.traits ?? {};
    const isMemberErrorShape = errorShapeIds.has(member.target);
    const hasHttpPayload = traits["smithy.api#httpPayload"] != null;
    const memberTargetShape = shapes[member.target];
    const isBlob = memberTargetShape?.type === "blob";
    const isStreamingBlob =
      isBlob && memberTargetShape?.traits?.["smithy.api#streaming"] != null;
    // Non-streaming blob with httpPayload also travels as raw bytes
    const isBlobPayload = isBlob && hasHttpPayload && !isStreamingBlob;
    const isEventStream =
      memberTargetShape?.type === "union" &&
      memberTargetShape?.traits?.["smithy.api#streaming"] != null;
    const isTimestamp =
      member.target === "smithy.api#Timestamp" ||
      memberTargetShape?.type === "timestamp";

    let tsType: string;
    if (isStreamingBlob || isBlobPayload) {
      tsType = ctx.isOperationOutput
        ? "T.StreamingOutputBody"
        : ctx.isOperationInput
          ? "T.StreamingInputBody"
          : "T.StreamBody";
    } else if (isEventStream) {
      tsType = `stream.Stream<${tsTypeOf(member.target)}, Error, never>`;
    } else if (isTimestamp) {
      tsType = "Date";
    } else {
      // Request-only owners re-open enum member references inline.
      tsType = tsTypeAt(member.target, ownerName);
    }

    // Member-level @sensitive (stamped by convert from patches/{sdkId}.json;
    // the published model only marks the target string shape): responses
    // decode to Redacted and requests accept raw or Redacted values.
    // Upstream models also put @sensitive on non-string members; those keep
    // their type (the trait is informational there).
    if (traits["smithy.api#sensitive"] != null && !isMemberErrorShape) {
      const isString =
        member.target === "smithy.api#String" ||
        memberTargetShape?.type === "string";
      const listMemberTarget =
        memberTargetShape?.type === "list"
          ? memberTargetShape.member?.target
          : undefined;
      const isStringList =
        listMemberTarget !== undefined &&
        (listMemberTarget === "smithy.api#String" ||
          shapes[listMemberTarget]?.type === "string");
      if (isString) {
        tsType = "string | redacted.Redacted<string>";
      } else if (isStringList) {
        // Sensitive list of strings (e.g. ElastiCache user Passwords)
        tsType = "Array<string | redacted.Redacted<string>>";
      }
    }

    // "Soft required" (@clientOptional + @required): optional in inputs,
    // required in output types.
    const hasClientOptional = traits["smithy.api#clientOptional"] != null;
    const hasRequired = traits["smithy.api#required"] != null;
    const isSoftRequired = hasClientOptional && hasRequired;
    const isOptional = hasClientOptional || !hasRequired;

    // Output structures: deep intersection types surface nested
    // soft-required members as required.
    if (ctx.isOperationOutput) {
      const intersectionType = computeOutputIntersection(
        member.target,
        model,
        softRequiredMembers,
      );
      if (intersectionType) tsType = intersectionType;
    }

    return { name: memberName, tsType, isOptional, isSoftRequired };
  };

  // --- Paginated item-type resolution ---------------------------------------

  const resolvePaginatedItemType = (
    opShape: any,
    paginatedTrait: Record<string, string>,
  ): string => {
    if (!paginatedTrait.items) return "unknown";
    const outputShape = shapes[opShape.output?.target];
    if (outputShape?.type !== "structure" || !outputShape.members) {
      return "unknown";
    }
    const itemsMember = outputShape.members[paginatedTrait.items];
    if (!itemsMember) return "unknown";
    const listShape = shapes[itemsMember.target];
    if (listShape?.type !== "list" || !listShape.member) return "unknown";
    const memberTarget = listShape.member.target;
    if (smithyPrimitiveToTs[memberTarget]) {
      return smithyPrimitiveToTs[memberTarget];
    }
    const memberShape = shapes[memberTarget];
    if (!memberShape) throw new Error(`unable to find shape: ${memberTarget}`);
    const memberName = formatName(memberTarget);
    if (memberShape.type === "structure") return memberName;
    if (allUnionNames.has(memberName)) return memberName;
    if (
      memberShape.type === "string" ||
      memberShape.type === "boolean" ||
      memberShape.type === "integer" ||
      memberShape.type === "long" ||
      memberShape.type === "float" ||
      memberShape.type === "double"
    ) {
      // Simple-type newtypes: primitive if reserved, else the newtype alias
      if (reservedNewtypeNames.has(memberName)) {
        const typeMap: Record<string, string> = {
          string: "string",
          boolean: "boolean",
          integer: "number",
          long: "number",
          float: "number",
          double: "number",
        };
        return typeMap[memberShape.type] ?? "unknown";
      }
      return memberName;
    }
    if (memberShape.type === "enum" || memberShape.type === "intEnum") {
      return memberName;
    }
    if (memberShape.type === "document") return "unknown";
    if (memberShape.type === "map") {
      const valueTarget = memberShape.value.target;
      if (smithyPrimitiveToTs[valueTarget]) {
        return `{ [key: string]: ${smithyPrimitiveToTs[valueTarget]} | undefined }`;
      }
      const valueShape = shapes[valueTarget];
      const valueName = formatName(valueTarget);
      if (
        valueShape &&
        (valueShape.type === "string" ||
          valueShape.type === "integer" ||
          valueShape.type === "long" ||
          valueShape.type === "float" ||
          valueShape.type === "double")
      ) {
        return `{ [key: string]: ${
          smithyPrimitiveToTs[
            `smithy.api#${valueShape.type.charAt(0).toUpperCase() + valueShape.type.slice(1)}`
          ] || valueName
        } | undefined }`;
      }
      return `{ [key: string]: ${valueName} | undefined }`;
    }
    if (memberShape.type === "list") {
      const elemTarget = memberShape.member.target;
      if (smithyPrimitiveToTs[elemTarget]) {
        return `${smithyPrimitiveToTs[elemTarget]}[]`;
      }
      return `${formatName(elemTarget)}[]`;
    }
    if (memberShape.type === "blob") return "Uint8Array";
    if (memberShape.type === "timestamp") return "Date";
    throw new Error(
      `Unhandled paginated item type: ${memberShape.type} for ${memberTarget}`,
    );
  };

  // --- The spec --------------------------------------------------------------

  return {
    shapeDocs: false,
    opExportName: (n) => n.charAt(0).toLowerCase() + n.slice(1),

    // Seed reachability with the error shapes: error-class fields reference
    // schema consts, so their member targets must be emitted.
    extraRoots: (selected) =>
      selected.flatMap((op) =>
        ((op.def.errors ?? []) as Array<{ target: string }>).map(
          (e) => e.target,
        ),
      ),

    shapeOverride: ({ id, def }) => {
      switch (def.type) {
        // ---- Newtypes: simple shapes emit a type alias only; references
        // inline the primitive schema expression. Reserved names (shadowing
        // built-ins or trivial primitive aliases) are suppressed entirely.
        case "string":
        case "boolean":
        case "integer":
        case "long":
        case "double":
        case "float":
        case "timestamp":
        case "document":
        case "blob": {
          if (
            def.type === "blob" &&
            (def.traits?.["smithy.api#streaming"] != null ||
              !blobAliasTargets.has(id))
          ) {
            // Streaming blobs and payload-only blobs have no value alias
            return [];
          }
          const name = formatName(id);
          if (reservedNewtypeNames.has(name)) return [];
          const tsType =
            def.type === "string"
              ? sensitiveShapeIds.has(id)
                ? "string | redacted.Redacted<string>"
                : "string"
              : def.type === "boolean"
                ? "boolean"
                : def.type === "timestamp"
                  ? "Date"
                  : def.type === "document"
                    ? "unknown"
                    : def.type === "blob"
                      ? sensitiveShapeIds.has(id)
                        ? "Uint8Array | redacted.Redacted<Uint8Array>"
                        : "Uint8Array"
                      : "number";
          return [`export type ${name} = ${tsType};`];
        }

        // ---- Open string enums (spec-patch add/replace honored). The
        // alias itself carries the open arm (`type X = "a" | (string & {})`)
        // in BOTH directions — v0 surface, which alchemy is written
        // against; AWS adds enum values without an SDK release.
        case "enum": {
          const name = formatName(id);
          const enumValues = Object.values(
            (def.members ?? {}) as Record<string, any>,
          ).map((m) => m.traits["smithy.api#enumValue"] as string);
          const union = enumValues.length
            ? `${enumValues.map((v) => JSON.stringify(v)).join(" | ")} | (string & {})`
            : "string";
          return [`export type ${name} = ${union};`];
        }

        // ---- Int enums: OPEN numeric literal union aliases (v0 surface).
        case "intEnum": {
          const name = formatName(id);
          const enumValues = Object.values(
            (def.members ?? {}) as Record<string, any>,
          ).map((m) => m.traits["smithy.api#enumValue"] as number);
          const intUnion = enumValues.length
            ? `${enumValues.join(" | ")} | (number & {})`
            : "number";
          return [`export type ${name} = ${intUnion};`];
        }

        // ---- Lists.
        case "list": {
          const name = formatName(id);
          const memberTsType = tsTypeAt(def.member.target, name);
          const memberTsTypeForArray = memberTsType.includes("|")
            ? `(${memberTsType})`
            : memberTsType;
          return [`export type ${name} = ${memberTsTypeForArray}[];`];
        }

        // ---- Maps (enum-key-aware).
        case "map": {
          const name = formatName(id);
          const keyTargetName = formatName(def.key.target);
          const keyShape = def.key.target.startsWith("smithy.api#")
            ? null
            : shapes[def.key.target];
          // Enum keys need a partial mapped type: AWS returns partial maps
          // (not every enum value present).
          const isKeyEnum =
            keyShape != null &&
            (keyShape.type === "enum" || keyShape.type === "intEnum");
          const valueTsType = tsTypeAt(def.value.target, name);
          return [
            isKeyEnum
              ? `export type ${name} = { [key in ${keyTargetName}]?: ${valueTsType} };`
              : `export type ${name} = { [key: string]: ${valueTsType} | undefined };`,
          ];
        }

        // ---- Structural unions (tagged by member key) + event streams.
        case "union": {
          const name = formatName(id);
          const memberEntries = Object.entries(
            (def.members ?? {}) as Record<string, { target: string }>,
          );
          const allMemberNames = memberEntries.map(([mn]) => mn);
          const variantTypes = memberEntries.map(([memberName, member]) =>
            generateUnionVariant(
              allMemberNames,
              memberName,
              tsTypeAt(member.target, name),
            ),
          );
          return [`export type ${name} = ${variantTypes.join(" | ")};`];
        }

        // ---- Structures: the interface (runtime data lives in descriptors).
        case "structure": {
          const name = formatName(id);
          const opTraits = operationInputTraits.get(name);
          const isOperationInput = opTraits !== undefined;
          const opOutputTraits = operationOutputTraits.get(name);
          const isOperationOutput =
            opOutputTraits !== undefined || unitResponseNames.has(name);

          // Rename supporting structs that collide with `${Op}Error` aliases
          const hasErrorTypeConflict =
            !isOperationInput &&
            !isOperationOutput &&
            operationErrorTypeNames.has(name);
          const exportedName = hasErrorTypeConflict ? `${name}_` : name;

          const members = Object.entries(
            (def.members ?? {}) as Record<
              string,
              { target: string; traits?: Record<string, unknown> }
            >,
          ).map(([memberName, member]) =>
            convertMember(name, memberName, member, {
              isOperationInput,
              isOperationOutput,
            }),
          );

          // In output context soft-required members are shown as required.
          const interfaceFields = members
            .map((m) => {
              const showOptional =
                m.isOptional && !(isOperationOutput && m.isSoftRequired);
              return `${m.name}${showOptional ? "?" : ""}: ${m.tsType}`;
            })
            .join("; ");
          return [`export interface ${exportedName} { ${interfaceFields} }`];
        }

        // service / operation / resource never reach emission; suppress.
        default:
          return [];
      }
    },

    errors: {
      override: ({ id, def }) => {
        const name = formatName(id);
        const shapeTraits = (def.traits ?? {}) as Record<string, unknown>;
        const synthetic = shapeTraits[SYNTHETIC_TRAIT] as
          | { from: string; message: SyntheticError["message"] }
          | undefined;
        // Patched errors keep the original AWS wire code (with dots) as tag
        const tag =
          (shapeTraits[ERROR_TAG_TRAIT] as string | undefined) ?? name;

        const members = Object.entries(
          (def.members ?? {}) as Record<
            string,
            { target: string; traits?: Record<string, unknown> }
          >,
        ).map(([memberName, member]) =>
          convertMember(name, memberName, member, {
            isOperationInput: false,
            isOperationOutput: false,
          }),
        );
        // Members patched in from patches/{sdkId}.json (`errors.<name>`)
        // are already real model members with their httpHeader / required
        // traits — convert wrote them — so they flow through convertMember
        // like any other.
        // Canonical message member. AWS spells this `message` in most models,
        // `Message` in the XML-era ones, and omits it from others (every ec2
        // error shape declares no members). Normalize to one `message` member
        // so `Error.message` is always the service's real message; the
        // response parser folds the `Message` wire key onto `message`.
        const hasLowerMessage = members.some((m) => m.name === "message");
        const errorFields = members.map((m) => ({
          name: m.name === "Message" && !hasLowerMessage ? "message" : m.name,
          tsType: m.tsType,
          optional: m.isOptional,
        }));
        if (!errorFields.some((f) => f.name === "message")) {
          errorFields.push({
            name: "message",
            tsType: "string",
            optional: true,
          });
        }
        const fields = errorFields
          .map(
            (f) =>
              `readonly ${tsKey(f.name)}${f.optional ? "?" : ""}: ${f.tsType}`,
          )
          .join("; ");

        // Wire facts the response parser matches on.
        const errorTraits = errorShapeIds.get(id);
        const meta: Record<string, unknown> = {};
        const code = errorTraits?.awsQueryError?.code;
        if (code !== undefined && code !== tag) meta.code = code;
        // Status-based fallback for services whose errors carry no code.
        if (errorTraits?.httpError !== undefined)
          meta.status = errorTraits.httpError;
        if (synthetic) {
          meta.synthetic = { from: synthetic.from, message: synthetic.message };
        }
        const headers: Record<string, unknown> = {};
        const renames: Record<string, string> = {};
        for (const [memberName, member] of Object.entries<any>(
          def.members ?? {},
        )) {
          const t = member.traits ?? {};
          const header = t["smithy.api#httpHeader"] as string | undefined;
          if (header !== undefined) {
            const type =
              shapes[member.target]?.type ??
              member.target.split("#")[1]?.toLowerCase();
            headers[memberName] = [
              "integer",
              "long",
              "double",
              "float",
              "short",
              "byte",
            ].includes(type)
              ? [header, "num"]
              : type === "boolean"
                ? [header, "bool"]
                : header;
          }
          const wire = (
            isJsonProtocol ? t["smithy.api#jsonName"] : t[XML_NAME]
          ) as string | undefined;
          if (wire !== undefined && wire !== memberName)
            renames[memberName] = wire;
        }
        if (Object.keys(headers).length) meta.headers = headers;
        if (Object.keys(renames).length) meta.renames = renames;

        // Categories come from the shared reading of the standard Smithy
        // error traits (`smithy.api#httpError` / `smithy.api#retryable`);
        // the spec file supplies what this model doesn't state, and the
        // name heuristics run last.
        const categories = errorCategories(
          {
            "smithy.api#httpError": errorTraits?.httpError,
            "smithy.api#retryable": errorTraits?.retryable,
          },
          [
            ...(serviceSpec.errorCategories?.[name] ?? []),
            ...inferCategoriesFromName(name),
          ],
        );

        const args = [
          JSON.stringify(tag),
          categories.length || Object.keys(meta).length
            ? JSON.stringify(categories)
            : undefined,
          Object.keys(meta).length ? JSON.stringify(meta) : undefined,
        ].filter((a) => a !== undefined);

        // PURE: without it the heritage call is an unanalyzable side effect
        // and the class can never be tree-shaken (distilled #191).
        return [
          `export class ${name} extends ${PURE}TE.TaggedError(${args.join(", ")})<{ ${fields} }> {}`,
        ];
      },
    },

    operation: (ctx) => {
      const opShape = ctx.op.def;
      const opName = ctx.opName;
      const exportedName = formatName(ctx.op.id, true);
      const operationComment = htmlToJsdoc(
        (opShape.traits?.["smithy.api#documentation"] as string) ?? "",
      );

      const pre: string[] = [];
      let input = formatName(opShape.__input);

      // Input shape shared by multiple operations with CONFLICTING
      // operation-level traits keeps a per-operation request type name;
      // the http trait itself travels in each operation's descriptor.
      const overrideTraits = operationInputTraitOverrides.get(opName);
      if (overrideTraits !== undefined) {
        const baseName = input;
        let derivedName = `${opName}Request`;
        if (derivedName !== baseName) {
          if (allSchemaNames.has(derivedName)) {
            derivedName = `${derivedName}_`;
          }
          pre.push(`export interface ${derivedName} extends ${baseName} {}`);
          input = derivedName;
        }
      }

      const output = formatName(opShape.__output);

      // Error names: model errors, then patched, then synthetic (the
      // materialization pass appended them in that order), deduplicated.
      const seen = new Set<string>();
      const errorNames: string[] = [];
      for (const e of (opShape.errors ?? []) as Array<{ target: string }>) {
        const n = formatName(e.target);
        if (!seen.has(n)) {
          seen.add(n);
          errorNames.push(n);
        }
      }
      const operationErrors =
        errorNames.length === 0 ? "[]" : `[${errorNames.join(", ")}]`;

      // Operation-level pagination merged over service-level defaults
      // (operations may specify partial pagination and inherit the rest).
      const paginatedTrait = mergePaginated(
        opShape.traits?.["smithy.api#paginated"] as any,
        servicePaginatedTrait as any,
      );

      // smithy.api#endpoint hostPrefix: operations like SFN's
      // StartSyncExecution must target a prefixed host (sync-states.{region})
      const endpointHostPrefix = (
        opShape.traits?.["smithy.api#endpoint"] as
          | { hostPrefix?: string }
          | undefined
      )?.hostPrefix;

      // Always emit the Smithy operation name: protocols use it as the wire
      // Action / X-Amz-Target instead of guessing it from the input shape
      // identifier (which fails for e.g. AutoScaling's `...NamesType`).
      const compiled = compiledOps.get(ctx.op.id)?.() ?? {};
      const opTraits = opShape.traits ?? {};
      const http = opTraits["smithy.api#http"] as
        | { method: string; uri: string }
        | undefined;
      const inputShape = ioTarget(opShape.input)
        ? shapes[opShape.input.target]
        : undefined;
      const hasBodyMembers = Object.values<any>(inputShape?.members ?? {}).some(
        (m) => !HTTP_BINDINGS.some((b) => b in (m.traits ?? {})),
      );
      const descriptorParts: string[] = ["service: svc"];
      if (
        http &&
        (protocol === "aws.protocols#restJson1" ||
          protocol === "aws.protocols#restXml")
      ) {
        descriptorParts.push(
          `http: ${JSON.stringify(`${http.method} ${http.uri}`)}`,
        );
      }
      if (compiled.input) descriptorParts.push(`input: ${compiled.input}`);
      if (compiled.output) descriptorParts.push(`output: ${compiled.output}`);
      const checksum = opTraits["aws.protocols#httpChecksum"];
      if (checksum)
        descriptorParts.push(`checksum: ${JSON.stringify(checksum)}`);
      const staticContext = opTraits["smithy.rules#staticContextParams"];
      if (staticContext) {
        descriptorParts.push(`staticContext: ${JSON.stringify(staticContext)}`);
      }
      if (opTraits["aws.customizations#s3UnwrappedXmlOutput"] != null) {
        const outShape = shapes[opShape.output?.target] ?? {};
        const rootName =
          outShape.traits?.[XML_NAME] ?? formatName(opShape.output.target);
        const member = Object.entries<any>(outShape.members ?? {}).find(
          ([mn, m]) => (m.traits?.[XML_NAME] ?? mn) === rootName,
        )?.[0];
        if (member)
          descriptorParts.push(`unwrapped: ${JSON.stringify(member)}`);
      }
      if (hasBodyMembers && protocol === "aws.protocols#restJson1") {
        descriptorParts.push("body: true");
      }
      if (
        hasBodyMembers &&
        protocol === "aws.protocols#restXml" &&
        inputShape
      ) {
        const root =
          inputShape.traits?.[XML_NAME] ?? formatName(opShape.input.target);
        descriptorParts.push(`body: ${JSON.stringify(root)}`);
      }

      const metaParts = [
        `descriptor: { ${descriptorParts.join(", ")} }`,
        `errors: ${operationErrors}`,
        `protocol: AwsProtocol`,
        `retry: Retry`,
        `operationName: ${JSON.stringify(opName)}`,
        ...(endpointHostPrefix !== undefined
          ? [`endpointHostPrefix: ${JSON.stringify(endpointHostPrefix)}`]
          : []),
        ...(paginatedTrait
          ? [`pagination: ${JSON.stringify(paginatedTrait)} as const`]
          : []),
      ];
      const metaObject = `{ ${metaParts.join(", ")} }`;

      const errorTypeName = `${formatName(ctx.op.id)}Error`;
      const allErrorNames =
        errorNames.length > 0
          ? [...errorNames, commonErrorsRef]
          : [commonErrorsRef];
      const errorTypeAlias = `export type ${errorTypeName} =\n  | ${allErrorNames.join("\n  | ")};\n`;

      // Explicit type annotations avoid TypeScript resolving internal
      // imports in emitted .d.ts files (type portability for consumers).
      // `Region` is NOT listed: it's an override resolved with
      // `Effect.serviceOption`, falling back to AWS_REGION (see region.ts).
      const depsType = `${credsRef} | HttpClient.HttpClient`;
      let typeAnnotation: string;
      if (paginatedTrait) {
        const itemType = resolvePaginatedItemType(
          opShape,
          paginatedTrait as Record<string, string>,
        );
        // `API.PaginatedOperationMethod` rather than an inline
        // `OperationMethod & { pages; items }`: the intersection only reaches
        // the operation object, so `const op = yield* listDomains` came back
        // as a bare call function with no streaming methods (distilled#145).
        // The item type still has to be passed explicitly — makePaginated
        // resolves it from a runtime path string (distilled#404).
        typeAnnotation = `API.PaginatedOperationMethod<${input}, ${output}, ${errorTypeName}, ${depsType}, ${itemType}>`;
      } else {
        typeAnnotation = `API.OperationMethod<${input}, ${output}, ${errorTypeName}, ${depsType}>`;
      }

      const opConst = operationConst({
        exportName: exportedName,
        typeAnnotation,
        factory: paginatedTrait ? "API.makePaginated" : "API.make",
        config: metaObject,
        pure: PURE,
        // Schema-free configs carry no I/O types; the explicit annotation
        // (from the emitted interfaces) is the operation's type.
        castToAnnotation: true,
      });

      return [...pre, errorTypeAlias + operationComment + opConst].join("\n");
    },

    header: () => {
      // Type-only imports with aliases only where schema names conflict.
      const credentialsImport =
        credsRef === "Creds"
          ? 'import type { Credentials as Creds } from "../credentials.ts";'
          : 'import type { Credentials } from "../credentials.ts";';
      const commonErrorsImport =
        commonErrorsRef === "CommonErr"
          ? 'import type { CommonErrors as CommonErr } from "../errors.ts";'
          : 'import type { CommonErrors } from "../errors.ts";';
      const [protocolImpl, protocolModule] = PROTOCOL_IMPORTS[protocol]!;

      // Placeholder imports are resolved by postProcess based on usage.
      const imports = [
        'import type * as HttpClient from "effect/unstable/http/HttpClient";',
        "__EFFECT_IMPORT__",
        "__REDACTED_IMPORT__",
        "__STREAM_IMPORT__",
        'import * as API from "@distilled.cloud/core/api";',
        "__DESCRIPTOR_IMPORT__",
        "__ERROR_IMPORT__",
        'import { AwsProtocol } from "../protocol.ts";',
        `import { ${protocolImpl} } from "${protocolModule}";`,
        'import { Retry } from "../retry.ts";',
        'import type * as T from "../types.ts";',
        credentialsImport,
        commonErrorsImport,
      ].join("\n");

      // Service-wide facts every operation's descriptor points at. A plain
      // object literal: bundlers drop it when no operation is imported.
      const serviceParts = [
        `sdkId: ${JSON.stringify(sdkId)}`,
        `target: ${JSON.stringify(serviceShapeName)}`,
        `version: ${JSON.stringify(version)}`,
        sigV2ServiceName !== undefined
          ? `sigv2: ${JSON.stringify(sigV2ServiceName)}`
          : `sigv4: ${JSON.stringify(sigV4ServiceName)}`,
        `protocol: ${protocolImpl}`,
        ...(serviceXmlNamespace
          ? [`xmlns: ${JSON.stringify(serviceXmlNamespace)}`]
          : []),
        ...(endpointRuleSet
          ? [
              `rules: ${generateRuleSetCode(endpointRuleSet as RuleSetObject, {
                typed: true,
              })}`,
            ]
          : []),
      ];
      return `${imports}\nconst svc: T.ServiceInfo = { ${serviceParts.join(",\n")} };\n\n`;
    },

    // Shapes shared between operations: lazy consts, resolved on first use.
    footer: () => {
      const hoisted = descriptors.hoisted();
      return hoisted.length ? [hoisted.join("\n") + "\n"] : [];
    },

    // Resolve the conditional-import placeholders against actual usage.
    postProcess: (code) => {
      let fileContents = code;
      const replacePlaceholder = (
        placeholder: string,
        importLine: string,
        usagePattern: RegExp,
      ) => {
        if (usagePattern.test(fileContents)) {
          fileContents = fileContents.replace(placeholder, importLine);
        } else {
          fileContents = fileContents.replace(placeholder + "\n", "");
        }
      };

      replacePlaceholder(
        "__EFFECT_IMPORT__",
        'import type * as effect from "effect/Effect";',
        /\beffect\.[A-Z]/,
      );
      replacePlaceholder(
        "__REDACTED_IMPORT__",
        'import type * as redacted from "effect/Redacted";',
        /\bredacted\.[A-Z]/,
      );
      replacePlaceholder(
        "__STREAM_IMPORT__",
        'import type * as stream from "effect/Stream";',
        /\bstream\.[A-Z]/,
      );
      replacePlaceholder(
        "__DESCRIPTOR_IMPORT__",
        'import * as D from "@distilled.cloud/core/shape";',
        /\bD\.[a-zA-Z]/,
      );
      replacePlaceholder(
        "__ERROR_IMPORT__",
        'import * as TE from "@distilled.cloud/core/error-class";',
        /\bTE\.TaggedError/,
      );
      return fileContents;
    },
  };
};
