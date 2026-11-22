/**
 * Idempotency keys sent as a header named `Idempotency-Key`, the standard
 * name (draft-ietf-httpapi-idempotency-key-header), whichever converter made
 * the model. Run by `finalizeConvert` before the package's patches, so a
 * patch can still remove or change the mark.
 */

const TOKEN_TRAIT = "smithy.api#idempotencyToken";

/**
 * Mark every member bound to an `Idempotency-Key` request header with
 * `smithy.api#idempotencyToken`; core then fills a missing key once per
 * call, the same on every retry. Returns the number of members marked.
 */
export const markIdempotencyKeyHeaders = (model: {
  shapes?: Record<string, { members?: Record<string, { traits?: Record<string, unknown> }> }>;
}): number => {
  let marked = 0;
  for (const shape of Object.values(model.shapes ?? {})) {
    for (const member of Object.values(shape.members ?? {})) {
      const header = member.traits?.["smithy.api#httpHeader"];
      if (typeof header !== "string" || header.toLowerCase() !== "idempotency-key") continue;
      if (member.traits![TOKEN_TRAIT] !== undefined) continue;
      member.traits![TOKEN_TRAIT] = {};
      marked++;
    }
  }
  return marked;
};
