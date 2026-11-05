/**
 * The R2 jurisdiction is a layer (`@distilled.cloud/cloudflare/Jurisdiction`),
 * as AWS's region is, so no operation input carries it. Each input member
 * sent as the `cf-r2-jurisdiction` header is removed, and its operation is
 * marked `com.cloudflare.protocols#jurisdiction`; the generator emits that
 * as `T.Jurisdiction()` and the protocol sets the header from the layer.
 *
 * Runs after the patches, which still name these members.
 */
export const JURISDICTION_TRAIT = "com.cloudflare.protocols#jurisdiction";
const HEADER = "cf-r2-jurisdiction";

/** Remove the header members and mark their operations; returns how many. */
export const jurisdictionToLayer = (model: { shapes: Record<string, any> }): number => {
  let moved = 0;
  for (const shape of Object.values(model.shapes)) {
    if (shape.type !== "operation" || !shape.input?.target) continue;
    const input = model.shapes[shape.input.target];
    if (input?.type !== "structure") continue;
    for (const [name, member] of Object.entries<any>(input.members ?? {})) {
      if (String(member.traits?.["smithy.api#httpHeader"]).toLowerCase() !== HEADER) continue;
      delete input.members[name];
      shape.traits = { ...shape.traits, [JURISDICTION_TRAIT]: {} };
      moved++;
    }
  }
  return moved;
};
