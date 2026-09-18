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
 * generator emits as `T.StringEncoded()` and the protocol's `buildRequest`
 * honors by sending the value's string spelling. The TS surface becomes
 * `boolean` with the wire unchanged. The model on disk keeps the string
 * enum the description documents.
 *
 * Deliberately narrow:
 *
 *   • request shapes only (`smithy.api#input`) — a response member would
 *     need the mirror-image decode, which the protocol does not do;
 *   • a list member is retargeted only when EVERY reference to that list
 *     comes from a request shape, so a shared list is never rewritten;
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
    if (values.length === 2 && values.includes("true") && values.includes("false")) {
      out.add(id);
    }
  }
  return out;
};

const isRequestShape = (shape: any): boolean =>
  shape?.type === "structure" && "smithy.api#input" in (shape.traits ?? {});

export const booleanStringEnums = (model: any): BooleanStringEnumResult => {
  const shapes: Record<string, any> = model?.shapes ?? {};
  const boolEnums = booleanEnumIds(shapes);
  if (boolEnums.size === 0) return { members: 0, lists: 0 };

  // Lists of a boolean enum, and whether anything outside a request shape
  // refers to them (a shared list keeps its documented string type).
  const boolLists = new Set<string>();
  for (const [id, shape] of Object.entries(shapes)) {
    if (shape?.type === "list" && boolEnums.has(shape.member?.target)) {
      boolLists.add(id);
    }
  }
  const sharedLists = new Set<string>();
  for (const shape of Object.values(shapes)) {
    if (isRequestShape(shape)) continue;
    for (const member of Object.values<any>(shape?.members ?? {})) {
      if (boolLists.has(member?.target)) sharedLists.add(member.target);
    }
    if (boolLists.has(shape?.member?.target)) {
      sharedLists.add(shape.member.target);
    }
  }

  let members = 0;
  const retargeted = new Set<string>();
  for (const shape of Object.values<any>(shapes)) {
    if (!isRequestShape(shape)) continue;
    for (const member of Object.values<any>(shape.members ?? {})) {
      const isList = boolLists.has(member?.target) && !sharedLists.has(member.target);
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
