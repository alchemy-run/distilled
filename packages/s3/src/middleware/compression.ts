import { SdkError } from "@distilled.cloud/core/sdk-error";
import * as Effect from "effect/Effect";
import type * as S from "effect/Schema";
import type { Request as ProtocolRequest } from "../client/request.ts";
import { getRequestCompression } from "../traits.ts";
import { isStreamBody } from "../util/stream.ts";

/**
 * The smallest body the AWS SDKs compress (`request_min_compression_size_bytes`
 * defaults to 10 KiB): a smaller one is sent as is.
 */
export const MIN_COMPRESSION_SIZE_BYTES = 10240;

/**
 * `@requestCompression`: gzip a buffered body of at least
 * {@link MIN_COMPRESSION_SIZE_BYTES} and append `gzip` to its
 * Content-Encoding, as the AWS SDKs do (smithy-typescript
 * `compressionMiddleware`). gzip is the only encoding Smithy defines. A
 * streaming body is sent as is: no AWS operation streams a compressed input.
 */
export const applyRequestCompression = (
  schema: S.Top,
  request: ProtocolRequest,
): Effect.Effect<ProtocolRequest, SdkError> => {
  const body = request.body;
  if (
    body === undefined ||
    isStreamBody(body) ||
    !getRequestCompression(schema.ast)?.encodings.includes("gzip")
  ) {
    return Effect.succeed(request);
  }
  const bytes = typeof body === "string" ? new TextEncoder().encode(body) : body;
  if (bytes.byteLength < MIN_COMPRESSION_SIZE_BYTES) return Effect.succeed(request);
  return Effect.map(gzip(bytes), (compressed) => {
    const headers = { ...request.headers };
    const name = Object.keys(headers).find((k) => k.toLowerCase() === "content-encoding");
    if (name === undefined) headers["Content-Encoding"] = "gzip";
    else headers[name] = `${headers[name]}, gzip`;
    return { ...request, body: compressed, headers };
  });
};

/**
 * gzip with the Compression Streams API (Node, Bun, workerd and browsers).
 * A failure is an {@link SdkError}, which the protocol declares.
 */
const gzip = (bytes: Uint8Array): Effect.Effect<Uint8Array, SdkError> =>
  Effect.tryPromise({
    try: async () =>
      new Uint8Array(
        await new Response(
          new Blob([bytes as Uint8Array<ArrayBuffer>])
            .stream()
            .pipeThrough(new CompressionStream("gzip")),
        ).arrayBuffer(),
      ),
    catch: (cause) =>
      new SdkError({
        message: `gzip compression of the request body failed: ${cause instanceof Error ? cause.message : String(cause)}`,
      }),
  });
