/**
 * The R2 jurisdiction comes from the call's `jurisdiction` member or, when
 * the call leaves it out, from the `Jurisdiction` layer
 * (`@distilled.cloud/cloudflare/Jurisdiction`), as AWS's region does. Each
 * operation whose input sends the `cf-r2-jurisdiction` header is marked
 * `com.cloudflare.protocols#jurisdiction`; the generator emits that as
 * `T.Jurisdiction()` and the protocol sets the header from the layer.
 */
export const JURISDICTION_TRAIT = "com.cloudflare.protocols#jurisdiction";
const HEADER = "cf-r2-jurisdiction";

/** Mark the operations whose input has the header; returns how many. */
export const markJurisdictionOperations = (model: { shapes: Record<string, any> }): number => {
  let marked = 0;
  for (const shape of Object.values(model.shapes)) {
    if (shape.type !== "operation" || !shape.input?.target) continue;
    const input = model.shapes[shape.input.target];
    if (input?.type !== "structure") continue;
    const takesHeader = Object.values<any>(input.members ?? {}).some(
      (member) => String(member.traits?.["smithy.api#httpHeader"]).toLowerCase() === HEADER,
    );
    if (!takesHeader) continue;
    shape.traits = { ...shape.traits, [JURISDICTION_TRAIT]: {} };
    marked++;
  }
  return marked;
};
