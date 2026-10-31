/**
 * Sign every request an Effect `HttpClient` sends with SigV4: the Effect
 * counterpart of `aws4fetch`'s `AwsClient`. Works with AWS and with any API
 * that speaks SigV4 (Cloudflare R2, Backblaze B2, MinIO, Ceph, ...).
 *
 * ```ts
 * import * as AwsClient from "@distilled.cloud/aws4signer/AwsClient";
 * import * as HttpClient from "effect/http/HttpClient";
 *
 * const program = Effect.gen(function* () {
 *   const r2 = yield* AwsClient.make({
 *     credentials: { accessKeyId, secretAccessKey: Redacted.make(secret) },
 *     // service "s3" and region "auto" are guessed from the R2 host
 *   });
 *   const res = yield* r2.get(`https://${accountId}.r2.cloudflarestorage.com/my-bucket/key`);
 *   return yield* res.text;
 * });
 * ```
 *
 * `aws4fetch` retries 5xx and 429 responses itself; here, pipe the client
 * through `HttpClient.retryTransient` for the same.
 */
import * as Clock from "effect/Clock";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Option from "effect/Option";
import type * as Redacted from "effect/Redacted";
import * as Signer from "./index.ts";

/** An access key pair, plus the session token of temporary credentials. */
export interface Credentials {
  readonly accessKeyId: string;
  readonly secretAccessKey: Redacted.Redacted<string>;
  readonly sessionToken?: Redacted.Redacted<string> | undefined;
}

export interface Options<E = never, R = never> extends Pick<
  Signer.WithoutScope<Signer.SignOptions>,
  "service" | "region" | "signQuery" | "allHeaders" | "appendSessionToken" | "singleEncode"
> {
  /**
   * The keys, or an effect that reads them. The effect runs once per
   * request, so it can refresh temporary credentials; cache it yourself
   * (`Effect.cachedWithTTL`) when reading them is expensive.
   */
  readonly credentials: Credentials | Effect.Effect<Credentials, E, R>;
}

/**
 * The request body is a stream or form data, which the signer cannot hash.
 * Set the `X-Amz-Content-Sha256` header (for example to `UNSIGNED-PAYLOAD`,
 * where the service accepts it) or send the body as bytes or text.
 */
export class UnsignableBody
  extends /*@__PURE__*/ Data.TaggedError("AWS::SigV4::UnsignableBody")<{
    readonly body: "FormData" | "Stream" | "Raw";
  }> {}

export type SignRequestError = Signer.SigningError | UnsignableBody;

/** `YYYYMMDDTHHMMSSZ` for epoch milliseconds. */
const amzDate = (millis: number) => new Date(millis).toISOString().replace(/[:-]|\.\d{3}/g, "");

const credentialsOf = <E, R>(
  credentials: Options<E, R>["credentials"],
): Effect.Effect<Credentials, E, R> =>
  Effect.isEffect(credentials) ? credentials : Effect.succeed(credentials);

/** The body as the signer hashes it; `undefined` when it does not need it. */
const signableBody = (
  request: HttpClientRequest.HttpClientRequest,
  url: URL,
  service: string | undefined,
): Signer.SignableBody | undefined | UnsignableBody => {
  const body = request.body;
  switch (body._tag) {
    case "Empty":
      return undefined;
    case "Uint8Array":
      return body.body;
    case "Raw":
      if (
        typeof body.body === "string" ||
        body.body instanceof ArrayBuffer ||
        ArrayBuffer.isView(body.body)
      ) {
        return body.body;
      }
  }
  // S3 signs UNSIGNED-PAYLOAD unless told otherwise; a set payload hash is used as is.
  if (request.headers["x-amz-content-sha256"] !== undefined) return undefined;
  if ((service ?? Signer.guessServiceRegion(url)[0]) === "s3") return undefined;
  return new UnsignableBody({ body: body._tag });
};

/**
 * `signedUrl` already carries the query, so the request's `urlParams` are
 * dropped. `setUrl` with a `URL` replaces them, but `setUrl` with a string
 * keeps them, so the string is set second: the query goes out exactly as
 * signed, not re-encoded.
 */
const withSignedUrl = (request: HttpClientRequest.HttpClientRequest, url: URL, signedUrl: string) =>
  HttpClientRequest.setUrl(
    HttpClientRequest.setUrl(request, new URL(url.origin + url.pathname)),
    signedUrl,
  );

/**
 * `request` signed with SigV4: `aws4fetch`'s `AwsClient.sign`. The signature
 * goes into the `Authorization` header, or into the query string with
 * `signQuery`. The signing time is the effect `Clock`'s, so `TestClock`
 * controls it.
 */
export const signRequest = <E = never, R = never>(
  request: HttpClientRequest.HttpClientRequest,
  options: Options<E, R>,
): Effect.Effect<HttpClientRequest.HttpClientRequest, SignRequestError | E, R> =>
  Effect.flatMap(
    Effect.zip(credentialsOf(options.credentials), Clock.currentTimeMillis),
    ([credentials, now]): Effect.Effect<HttpClientRequest.HttpClientRequest, SignRequestError> => {
      const url = Option.getOrUndefined(HttpClientRequest.toUrl(request));
      if (url === undefined) {
        return Effect.fail(
          new Signer.InvalidSigningUrl({ url: request.url, cause: "not an absolute URL" }),
        );
      }
      url.hash = "";
      const body = signableBody(request, url, options.service);
      if (body instanceof UnsignableBody) return Effect.fail(body);
      return Effect.map(
        Signer.sign(
          Signer.guessScope({
            method: request.method,
            url: url.toString(),
            headers: request.headers,
            datetime: amzDate(now),
            body,
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            service: options.service,
            region: options.region,
            signQuery: options.signQuery,
            allHeaders: options.allHeaders,
            appendSessionToken: options.appendSessionToken,
            singleEncode: options.singleEncode,
          }),
        ),
        (signed) =>
          HttpClientRequest.setHeaders(withSignedUrl(request, url, signed.url), signed.headers),
      );
    },
  );

/**
 * A client that signs each request before `client` sends it.
 *
 * ```ts
 * const s3 = (yield* HttpClient.HttpClient).pipe(
 *   AwsClient.sign({ credentials, service: "s3", region: "eu-west-1" }),
 *   HttpClient.retryTransient({ times: 3 }),
 * );
 * ```
 */
export const sign =
  <E = never, R = never>(options: Options<E, R>) =>
  <E2, R2>(client: HttpClient.HttpClient.With<E2, R2>) =>
    HttpClient.mapRequestEffect(client, (request) => signRequest(request, options));

/** The context's `HttpClient`, signing every request: `aws4fetch`'s `new AwsClient(...)`. */
export const make = <E = never, R = never>(options: Options<E, R>) =>
  Effect.map(HttpClient.HttpClient, sign(options));

/**
 * A presigned URL for `url` with these credentials.
 *
 * ```ts
 * const url = yield* AwsClient.presign("https://my-bucket.s3.amazonaws.com/a.txt", {
 *   credentials,
 *   expiresIn: 600,
 * });
 * ```
 */
export const presign = <E = never, R = never>(
  url: string,
  options: Options<E, R> & {
    readonly method?: string;
    readonly headers?: Record<string, string>;
    readonly expiresIn?: number;
  },
): Effect.Effect<string, Signer.SigningError | E, R> =>
  Effect.flatMap(
    Effect.zip(credentialsOf(options.credentials), Clock.currentTimeMillis),
    ([credentials, now]) =>
      Signer.presign({
        url,
        datetime: amzDate(now),
        method: options.method,
        headers: options.headers,
        expiresIn: options.expiresIn,
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
        service: options.service,
        region: options.region,
        allHeaders: options.allHeaders,
        appendSessionToken: options.appendSessionToken,
        singleEncode: options.singleEncode,
      }),
  );
