/**
 * Structure-member analysis for the SDK generators (dev-time only).
 *
 * The TS-facing name policy is the provider's (cloudflare camelCases wire
 * names, AWS keeps them) — supplied as `nameFn`. Wire-name resolution from
 * the smithy HTTP binding traits is generic smithy semantics.
 */
import { oneLine } from "./naming.ts";

/**
 * Structure-level marker: the object also carries keys it does not declare
 * (OpenAPI `additionalProperties` next to `properties`). The generator adds
 * `[key: string]: unknown` to the interface and an `unknown`-valued index
 * signature to the schema (`S.StructWithRest`).
 */
export const ADDITIONAL_PROPERTIES_TRAIT = "com.distilled.openapi#additionalProperties";

/**
 * Smithy 2.0 `@default`: the value a member has when the wire leaves it out.
 * A response always carries such a member (proto3 fields without presence).
 */
export const DEFAULT_TRAIT = "smithy.api#default";

/**
 * A server-streaming gRPC operation, whose output collects the stream as
 * `{ items }`; generated as `API.makeStreaming` (see the proto converter).
 */
export const SERVER_STREAMING_TRAIT = "com.distilled.grpc#serverStreaming";

/**
 * An operation that streams only when its input asks, e.g. a REST route
 * that answers NDJSON for `stream: true` and JSON otherwise:
 * `{ "input": { "<member>": <value>, … }, "items": "<frame shape id>" }`.
 * The plain call keeps the operation's output; `.stream()` sets `input`
 * over the caller's and emits each frame as `items`. Generated as
 * `API.makeStreaming` with `streamInput` and `items` in its config.
 */
export const STREAM_WHEN_TRAIT = "com.distilled.openapi#streamWhen";

/** The operation streams: server streaming, or streaming when its input asks. */
export const streamsOutput = (traits: Record<string, unknown> | undefined): boolean =>
  traits !== undefined && (SERVER_STREAMING_TRAIT in traits || STREAM_WHEN_TRAIT in traits);

export interface MemberBase {
  /** Original smithy member name. */
  readonly name: string;
  /** TS-facing name (per `nameFn`, deduplicated within the structure). */
  readonly tsName: string;
  readonly target: string;
  readonly required: boolean;
  readonly doc: string | undefined;
  readonly traits: Record<string, any>;
}

/**
 * Base analysis of a structure's members: TS naming (with collision
 * dedup — a clashing name falls back to the original, then a numeric
 * suffix), required-ness, and one-line docs. Binding classification and
 * anything provider-specific layer on top via `traits`.
 */
export const memberBases = (
  def: any,
  nameFn: (memberName: string) => string = (n) => n,
): MemberBase[] => {
  const used = new Set<string>();
  return Object.entries(def.members ?? {}).map(([mn, m]: [string, any]) => {
    const traits = m.traits ?? {};
    let tsName = nameFn(mn);
    if (used.has(tsName)) tsName = mn;
    let k = 2;
    while (used.has(tsName)) tsName = `${nameFn(mn)}${k++}`;
    used.add(tsName);
    return {
      name: mn,
      tsName,
      target: m.target,
      required: "smithy.api#required" in traits,
      doc: oneLine(traits["smithy.api#documentation"]),
      traits,
    };
  });
};

/**
 * The wire name a bound member serializes under, per the smithy HTTP
 * binding traits: labels use the member name (URI placeholders), query and
 * header use the trait value when it's a non-empty string, everything else
 * uses `jsonName` when present.
 */
export const smithyWireName = (
  traits: Record<string, any>,
  memberName: string,
  binding: "label" | "query" | "header" | "other",
): string => {
  if (binding === "label") return memberName;
  if (binding === "query") {
    const v = traits["smithy.api#httpQuery"];
    return typeof v === "string" && v ? v : memberName;
  }
  if (binding === "header") {
    const v = traits["smithy.api#httpHeader"];
    return typeof v === "string" && v ? v : memberName;
  }
  return traits["smithy.api#jsonName"] ?? memberName;
};
