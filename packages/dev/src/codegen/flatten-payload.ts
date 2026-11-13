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
 * It runs in generate (`transformModel`) and not in convert, so the request
 * shapes it copies already carry their patches.
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
 * Flatten every operation's structure payload into its input, in place.
 * Returns a one-line summary for the generate log.
 */
export const flattenStructurePayloads = (model: { shapes: Record<string, any> }): string | void => {
  const shapes = model.shapes;
  let flattened = 0;
  let shadowed = 0;
  for (const def of Object.values(shapes)) {
    if (def?.type !== "operation" || def.input?.target === undefined) continue;
    const inputId: string = def.input.target;
    const input = shapes[inputId];
    if (input?.type !== "structure") continue;
    const entries = Object.entries<any>(input.members ?? {});
    const payload = entries.find(([, m]) => PAYLOAD_TRAIT in (m.traits ?? {}));
    if (payload === undefined) continue;
    const body = shapes[payload[1].target];
    if (
      body?.type !== "structure" ||
      Object.keys(body.members ?? {}).length === 0 ||
      ADDITIONAL_PROPERTIES_TRAIT in (body.traits ?? {})
    ) {
      continue;
    }
    const members: Record<string, any> = {};
    for (const [name, m] of entries) if (name !== payload[0]) members[name] = m;
    for (const [name, m] of Object.entries<any>(body.members)) {
      if (name in members) {
        shadowed++;
        continue;
      }
      members[name] = m;
    }
    shapes[inputId] = { ...input, members };
    flattened++;
  }
  if (flattened === 0) return;
  return `flattened ${flattened} request bodies (${shadowed} body fields shadowed by a parameter)`;
};
