/**
 * Presigning as a mode of the request pipeline: `Presign.presignRequest`
 * provides {@link Presigning} around `API.encodeRequest`, and the AWS
 * protocol's `encode` then hands the request it built and resolved to
 * {@link PresignSettings.presign} instead of signing it into its headers.
 * Serialization, middleware and endpoint resolution are the call's own.
 *
 * Only the service lives here: the protocol imports it on every call path,
 * so the presign signer stays in `presign.ts` and is bundled only by
 * programs that presign.
 */
import type { InvalidInput } from "@distilled.cloud/core/protocol-http";
import * as Context from "effect/Context";
import type * as Effect from "effect/Effect";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as Credentials from "../credentials.ts";
import type * as SigV4 from "../sigv4.ts";
import type { Request } from "./request.ts";

/** The request the protocol built and resolved, ready to presign. */
export interface ResolvedRequest {
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
}

export interface PresignSettings {
  /** Sign `request` into its query string. */
  readonly presign: (
    request: ResolvedRequest,
    fiber: Parameters<typeof SigV4.signSync>[1],
  ) =>
    | HttpClientRequest.HttpClientRequest
    | Effect.Effect<HttpClientRequest.HttpClientRequest, InvalidInput | SigV4.SigningError>;
}

/** Present while `Presign.presignRequest` encodes a request. */
export class Presigning
  extends /*@__PURE__*/ Context.Service<Presigning, PresignSettings>()(
    "@distilled.cloud/s3/Presigning",
  ) {}
