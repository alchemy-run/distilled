/**
 * Presigning as a mode of the request pipeline: `Presign.presignRequest`
 * provides {@link Presigning} around `API.encodeRequest`, and the AWS
 * protocol's `encode` then signs the request it built into its query string
 * ({@link presignedRequestOf}) instead of its headers. Serialization,
 * middleware and endpoint resolution are the call's own.
 */
import { InvalidInput } from "@distilled.cloud/core/protocol-http";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type { HttpMethod } from "effect/http/HttpMethod";
import * as Redacted from "effect/Redacted";
import type * as Credentials from "../credentials.ts";
import * as SigV4 from "../sigv4.ts";
import type { Request } from "./request.ts";

export interface PresignSettings {
  /** Seconds the URL stays valid (`X-Amz-Expires`). */
  readonly expiresIn: number;
  /** Fixed `YYYYMMDDTHHMMSSZ` signing time; defaults to now. */
  readonly datetime: string | undefined;
}

/** Present while `Presign.presignRequest` encodes a request. */
export class Presigning
  extends /*@__PURE__*/ Context.Service<Presigning, PresignSettings>()(
    "@distilled.cloud/s3/Presigning",
  ) {}

// `x-amz-*` headers S3 reads only as headers, so a presigned request keeps
// them as signed headers (the AWS SDK's S3 presigner does the same for SSE).
const UNHOISTABLE = /^x-amz-(?:server-side-encryption|checksum-|sdk-checksum-algorithm$)/;

type Fiber = Parameters<typeof SigV4.signSync>[1];

/**
 * The request the protocol built and resolved, signed into its query string:
 * the input's `x-amz-*` headers move into the query (except
 * {@link UNHOISTABLE}), every other header stays and is signed, and the
 * payload is `UNSIGNED-PAYLOAD`. A body, or a signer other than SigV4, fails
 * with `InvalidInput`: a URL can't carry either.
 */
export const presignedRequestOf = (
  settings: PresignSettings,
  request: {
    readonly operation: string | undefined;
    readonly method: string;
    readonly url: string;
    readonly headers: Record<string, string>;
    readonly body: Request["body"];
    /** Set when the endpoint or operation signs with something other than SigV4. */
    readonly signer: "SigV4A" | "SigV2" | undefined;
    readonly service: string;
    readonly region: string;
    readonly credentials: Credentials.ResolvedCredentials;
  },
  fiber: Fiber,
):
  | HttpClientRequest.HttpClientRequest
  | Effect.Effect<HttpClientRequest.HttpClientRequest, InvalidInput | SigV4.SigningError> => {
  const refuse = (message: string) =>
    Effect.fail(new InvalidInput({ member: request.operation ?? "input", message }));
  if (request.signer !== undefined) {
    return refuse(`The request signs with ${request.signer}, which presigning does not support.`);
  }
  const body = request.body;
  if (body instanceof ReadableStream || (body !== undefined && body.length > 0)) {
    return refuse("The input serializes into a request body, which a presigned URL cannot carry.");
  }
  let url: URL;
  try {
    url = new URL(request.url);
  } catch (cause) {
    return Effect.fail(new SigV4.InvalidSigningUrl({ url: request.url, cause }));
  }
  const headers: Record<string, string> = {};
  for (const [name, value] of Object.entries(request.headers)) {
    const lower = name.toLowerCase();
    if (lower === "user-agent" || lower === "x-amz-content-sha256") continue;
    if (lower.startsWith("x-amz-") && !UNHOISTABLE.test(lower)) url.searchParams.set(lower, value);
    else headers[lower] = value;
  }
  // The signer assumes UNSIGNED-PAYLOAD only for the signing name `s3`;
  // access points sign S3 operations under other names.
  if (request.service !== "s3") headers["x-amz-content-sha256"] = "UNSIGNED-PAYLOAD";
  url.searchParams.set("X-Amz-Expires", String(settings.expiresIn));

  const options: SigV4.SignOptions = {
    method: request.method,
    url: url.toString(),
    headers,
    accessKeyId: Redacted.value(request.credentials.accessKeyId),
    secretAccessKey: request.credentials.secretAccessKey,
    sessionToken: request.credentials.sessionToken,
    service: request.service,
    region: request.region,
    datetime: settings.datetime,
    signQuery: true,
    // Pin every header the input set, content-type and content-length included.
    allHeaders: true,
  };
  // The client sends exactly these headers, and no body the URL describes.
  const toRequest = (signed: SigV4.SignedRequest) =>
    HttpClientRequest.setHeaders(
      HttpClientRequest.make(signed.method as HttpMethod)(signed.url),
      signed.headers,
    );
  let signed: SigV4.SignedRequest | undefined;
  try {
    signed = SigV4.signSync(options, fiber);
  } catch (e) {
    return Effect.fail(e as SigV4.SigningError);
  }
  return signed === undefined ? Effect.map(SigV4.sign(options), toRequest) : toRequest(signed);
};
