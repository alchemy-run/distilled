/**
 * Binary downloads carry their media type. A response the model gives as a
 * sole raw `Blob` body (an image, a PDF, a CSV export) decodes as
 * `{ body: Uint8Array, contentType?: string }`: the bytes, and the
 * response's `Content-Type` header, so a caller can tell a JPEG from a PNG
 * or pick a file extension. Run by `finalizeConvert` after the package's
 * patches, so outputs a patch makes binary get the header too.
 */

import { RAW_RESPONSE_TRAIT } from "./generator.ts";

const BLOB = "smithy.api#Blob";

/** The member added next to the body. */
export const CONTENT_TYPE_MEMBER = "contentType";

/**
 * Whether `def` is an output whose only member is a raw `Blob` body: the
 * shape a binary response converts to.
 */
const isBareBinaryOutput = (def: any): boolean => {
  if (def?.type !== "structure") return false;
  const names = Object.keys(def.members ?? {});
  if (names.length !== 1) return false;
  const member = def.members[names[0]!];
  return member?.target === BLOB && member.traits?.[RAW_RESPONSE_TRAIT] !== undefined;
};

/**
 * Add a `contentType` member bound to the `Content-Type` response header to
 * every operation output that is a bare raw `Blob` body. Returns the number
 * of outputs changed.
 */
export const addBinaryContentType = (model: { shapes?: Record<string, any> }): number => {
  const shapes = model.shapes ?? {};
  const outputs = new Set<string>();
  for (const def of Object.values(shapes)) {
    if (def?.type === "operation" && typeof def.output?.target === "string") {
      outputs.add(def.output.target);
    }
  }
  let changed = 0;
  for (const id of outputs) {
    const def = shapes[id];
    if (!isBareBinaryOutput(def)) continue;
    def.members[CONTENT_TYPE_MEMBER] = {
      target: "smithy.api#String",
      traits: {
        "smithy.api#httpHeader": "Content-Type",
        "smithy.api#documentation":
          "Media type of the body, from the response's `Content-Type` header (e.g. `image/jpeg`).",
      },
    };
    changed++;
  }
  return changed;
};
