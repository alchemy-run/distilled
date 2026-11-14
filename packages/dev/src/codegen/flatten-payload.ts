/**
 * Inline structure request bodies into the operation input (dev-time only).
 *
 * Google discovery documents describe every request body as a `$ref` to a
 * named schema, which the GCP and Google Workspace converters model as one
 * `body` member with `smithy.api#httpPayload`. Every other distilled SDK
 * flattens an object body into top-level input fields, so this transform
 * does the same on the patched model, just before generation:
 *
 *   compute.patchFirewalls({ project, firewall, body: { sourceRanges } })
 *     → compute.patchFirewalls({ project, firewall, sourceRanges })
 *
 * It runs in generate (`transformModel`) and not in convert, so the body
 * shapes already carry their patches.
 *
 * The payload member is re-marked with {@link SPREAD_TRAIT} rather than its
 * fields copied: the generator then emits the input as the body extended
 * with the path and query members (`interface … extends Firewall`,
 * `S.Extend(Firewall, S.Struct({ … }))`), so a body shared by insert, patch
 * and update is still emitted once.
 *
 * A payload stays a `body` member when its target is not a structure with
 * members (a map, a list, a document, an empty request object), or when the
 * structure also takes undeclared keys. On a name clash, the path or query
 * parameter wins and the body field is left out — the rule the OpenAPI
 * converter follows ("labels win, then query, then body").
 */
import { ADDITIONAL_PROPERTIES_TRAIT } from "./members.ts";

const PAYLOAD_TRAIT = "smithy.api#httpPayload";

/**
 * Member-level marker: the member's structure target is inlined into the
 * owning input structure. The generator emits no member for it; the input
 * extends the target instead.
 */
export const SPREAD_TRAIT = "com.distilled.codegen#spread";

/**
 * Mark every operation's structure payload to be inlined into its input, in
 * place. Returns a one-line summary for the generate log.
 */
export const flattenStructurePayloads = (model: { shapes: Record<string, any> }): string | void => {
  const shapes = model.shapes;
  let flattened = 0;
  let shadowed = 0;
  for (const def of Object.values(shapes)) {
    if (def?.type !== "operation" || def.input?.target === undefined) continue;
    const input = shapes[def.input.target];
    if (input?.type !== "structure") continue;
    const entries = Object.entries<any>(input.members ?? {});
    const payload = entries.find(([, m]) => PAYLOAD_TRAIT in (m.traits ?? {}));
    if (payload === undefined) continue;
    const [payloadName, member] = payload;
    const body = shapes[member.target];
    if (
      body?.type !== "structure" ||
      Object.keys(body.members ?? {}).length === 0 ||
      ADDITIONAL_PROPERTIES_TRAIT in (body.traits ?? {})
    ) {
      continue;
    }
    for (const name of Object.keys(body.members)) {
      if (name !== payloadName && name in input.members) shadowed++;
    }
    const { [PAYLOAD_TRAIT]: _payload, ...traits } = member.traits;
    input.members[payloadName] = { ...member, traits: { ...traits, [SPREAD_TRAIT]: {} } };
    flattened++;
  }
  if (flattened === 0) return;
  return `flattened ${flattened} request bodies (${shadowed} body fields shadowed by a parameter)`;
};
