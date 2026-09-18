/**
 * Boolean-valued string enums on request members (dev-time only).
 *
 * Plenty of APIs document a flag as the string enum `"true" | "false"`
 * rather than a JSON boolean — Cloudflare's `validation_enabled`, Clerk's
 * `include_invalid`, GrowthBook's `deleteMissing`, and so on. Taken
 * literally that surfaces as `"true" | "false" | (string & {})` and every
 * caller writes the ternary itself.
 *
 * {@link generateService} runs this pass over the loaded model before
 * emitting: REQUEST members of such an enum are retargeted to a real
 * `smithy.api#Boolean` and stamped {@link STRING_ENCODED_TRAIT}, which the
 * generator emits as `T.StringEncoded()` and the protocol honors by sending
 * the value's string spelling. The TS surface becomes `boolean` with the
 * wire unchanged. The model on disk keeps the string enum the description
 * documents.
 *
 * Deliberately narrow:
 *
 *   • request-only shapes — an operation input, or a structure or list the
 *     inputs reach and no output or error does. A member a response can
 *     deliver would need the mirror-image decode, which the protocol does
 *     not do, so a shape used both ways keeps its documented string type;
 *   • the enum must be exactly `{"true", "false"}` — a three-value enum
 *     that happens to include them is left alone.
 */

/** Synthetic trait: send this member's value as its string spelling. */
export const STRING_ENCODED_TRAIT = "distilled.protocols#stringEncoded";

const BOOLEAN = "smithy.api#Boolean";

export interface BooleanStringEnumResult {
  /** Request members retargeted to a real boolean. */
  members: number;
  /** List shapes whose element type was retargeted. */
  lists: number;
}

/** Enum shapes whose values are exactly `"true"` and `"false"`. */
const booleanEnumIds = (shapes: Record<string, any>): Set<string> => {
  const out = new Set<string>();
  for (const [id, shape] of Object.entries(shapes)) {
    if (shape?.type !== "enum") continue;
    const values = Object.values(shape.members ?? {}).map(
      (m: any) => m?.traits?.["smithy.api#enumValue"],
    );
    if (
      values.length === 2 &&
      values.includes("true") &&
      values.includes("false")
    ) {
      out.add(id);
    }
  }
  return out;
};

/** Every shape id a shape points at: members, list/map entries, mixins. */
const targetsOf = (shape: any): string[] => {
  const out: string[] = [];
  for (const member of Object.values<any>(shape?.members ?? {})) {
    if (member?.target) out.push(member.target);
  }
  for (const key of ["member", "value", "key"] as const) {
    const target = shape?.[key]?.target;
    if (target) out.push(target);
  }
  for (const mixin of shape?.mixins ?? []) {
    if (mixin?.target) out.push(mixin.target);
  }
  return out;
};

const reachable = (
  shapes: Record<string, any>,
  roots: ReadonlyArray<string | undefined>,
): Set<string> => {
  const seen = new Set<string>();
  const stack = roots.filter((r): r is string => r !== undefined);
  while (stack.length > 0) {
    const id = stack.pop()!;
    if (seen.has(id) || shapes[id] === undefined) continue;
    seen.add(id);
    stack.push(...targetsOf(shapes[id]));
  }
  return seen;
};

/**
 * Shapes an operation input reaches that no output or error does. Operation
 * I/O is the spine; the `smithy.api#input`/`#output`/`#error` traits cover
 * models whose shapes are not wired through an operation, and a structure
 * the inputs never reach counts as a response root — unreachable from a
 * request, it can only describe something the API hands back.
 */
const requestOnlyShapes = (shapes: Record<string, any>): Set<string> => {
  const requestRoots: Array<string | undefined> = [];
  const responseRoots: Array<string | undefined> = [];
  for (const [id, shape] of Object.entries<any>(shapes)) {
    if (shape?.type === "operation") {
      requestRoots.push(shape.input?.target);
      responseRoots.push(shape.output?.target);
      for (const error of shape.errors ?? []) responseRoots.push(error?.target);
      continue;
    }
    const traits = shape?.traits ?? {};
    if ("smithy.api#input" in traits) requestRoots.push(id);
    if ("smithy.api#output" in traits || "smithy.api#error" in traits) {
      responseRoots.push(id);
    }
  }
  const fromRequests = reachable(shapes, requestRoots);
  for (const [id, shape] of Object.entries<any>(shapes)) {
    if (shape?.type === "structure" && !fromRequests.has(id)) {
      responseRoots.push(id);
    }
  }
  const fromResponses = reachable(shapes, responseRoots);
  const out = new Set<string>();
  for (const id of fromRequests) {
    if (!fromResponses.has(id)) out.add(id);
  }
  return out;
};

export const booleanStringEnums = (model: any): BooleanStringEnumResult => {
  const shapes: Record<string, any> = model?.shapes ?? {};
  const boolEnums = booleanEnumIds(shapes);
  if (boolEnums.size === 0) return { members: 0, lists: 0 };

  const requestOnly = requestOnlyShapes(shapes);
  const boolLists = new Set<string>();
  for (const [id, shape] of Object.entries(shapes)) {
    if (
      shape?.type === "list" &&
      boolEnums.has(shape.member?.target) &&
      requestOnly.has(id)
    ) {
      boolLists.add(id);
    }
  }

  let members = 0;
  const retargeted = new Set<string>();
  for (const [id, shape] of Object.entries<any>(shapes)) {
    if (shape?.type !== "structure" || !requestOnly.has(id)) continue;
    for (const member of Object.values<any>(shape.members ?? {})) {
      const isList = boolLists.has(member?.target);
      if (!boolEnums.has(member?.target) && !isList) continue;
      if (isList) {
        retargeted.add(member.target);
      } else {
        member.target = BOOLEAN;
      }
      member.traits = { ...member.traits, [STRING_ENCODED_TRAIT]: {} };
      members++;
    }
  }
  for (const id of retargeted) shapes[id].member.target = BOOLEAN;

  return { members, lists: retargeted.size };
};
