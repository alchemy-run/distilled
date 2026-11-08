import * as API from "@distilled.cloud/core/api";
import type { InvalidInput } from "@distilled.cloud/core/protocol-http";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Credentials from "./credentials.ts";
import * as Endpoint from "./endpoint.ts";
import type { EndpointError, ParseError } from "./errors.ts";
import * as Protocol from "./protocol.ts";
import * as Region from "./region.ts";
import { dnsSuffix } from "./rules-engine/aws-functions.ts";
import * as SigV4 from "./sigv4.ts";
import {
  encodeGreedyLabel,
  encodeLabel,
  invalidAwsLabel,
  invalidHostLabel,
} from "./util/serialize-input.ts";

/**
 * Errors returned when resolving credentials or signing a URL, and the
 * `InvalidInput` of an S3 bucket or key that would address another resource.
 */
export type PresignError = Credentials.ProviderError | SigV4.SigningError | InvalidInput;

// The signing errors in `PresignError`, so consumers can name them from here.
export { CryptoError, InvalidSigningHeaders, InvalidSigningUrl } from "./sigv4.ts";

/** `url` parsed, or the `InvalidSigningUrl` the signer would fail it with. */
const parseUrl = (url: string): Effect.Effect<URL, SigV4.InvalidSigningUrl> =>
  Effect.try({
    try: () => new URL(url),
    catch: (cause) => new SigV4.InvalidSigningUrl({ url, cause }),
  });

/** Services required by the presigning helpers. */
export type PresignContext = Credentials.Credentials | Region.Region;

/**
 * Options for {@link presignUrl}.
 */
export interface PresignUrlOptions {
  /**
   * HTTP method the presigned URL authorizes.
   * @default "GET"
   */
  readonly method?: string;
  /**
   * Full URL to presign (scheme + host + path + any query parameters that
   * should be part of the signature).
   */
  readonly url: string;
  /**
   * SigV4 signing service name (e.g. `s3`, `execute-api`, `lambda`).
   */
  readonly service: string;
  /**
   * SigV4 signing region. Defaults to the {@link Region.Region} service.
   */
  readonly region?: string;
  /**
   * Number of seconds the URL remains valid.
   * @default 900
   */
  readonly expiresIn?: number;
  /**
   * Headers to sign into the URL (`X-Amz-SignedHeaders`). The consumer of
   * the presigned URL must send these headers verbatim or the signature
   * fails to validate.
   */
  readonly headers?: Record<string, string>;
  /**
   * Fixed signing datetime in `YYYYMMDDTHHMMSSZ` format. Defaults to now.
   * Signing is deterministic for a fixed datetime + credentials, which
   * makes this useful for tests.
   */
  readonly datetime?: string;
}

/**
 * SigV4 query-string presigning for an arbitrary AWS URL.
 *
 * Pure client-side computation -- no AWS API call is made. Credentials are
 * resolved from the {@link Credentials.Credentials} service (the presigned
 * URL inherits that identity's IAM permissions) and the signing region
 * defaults to the {@link Region.Region} service.
 */
export const presignUrl: (
  options: PresignUrlOptions,
) => Effect.Effect<string, PresignError, PresignContext> = /*@__PURE__*/ Effect.fnUntraced(
  function* (options: PresignUrlOptions) {
    const credentials = yield* yield* Credentials.Credentials;
    const region = options.region ?? (yield* yield* Region.Region);

    const url = yield* parseUrl(options.url);
    url.searchParams.set("X-Amz-Expires", String(options.expiresIn ?? 900));

    const signed = yield* SigV4.sign({
      method: options.method ?? "GET",
      url: url.toString(),
      headers: options.headers,
      accessKeyId: Redacted.value(credentials.accessKeyId),
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
      service: options.service,
      region,
      signQuery: true,
      datetime: options.datetime,
      // The signer excludes `content-type` (among others) from the signature by
      // default (UNSIGNABLE_HEADERS). Callers passing headers here explicitly
      // want them pinned into the signature -- e.g. the AWS SDK's getSignedUrl
      // signs `content-type` when a ContentType is given, which is what pins an
      // uploader to the declared type -- so opt back in.
      allHeaders: options.headers !== undefined,
    });
    return signed.url;
  },
);

/**
 * Options for {@link presignS3Url}.
 */
export interface PresignS3UrlOptions {
  /**
   * HTTP method the presigned URL authorizes.
   * @default "GET"
   */
  readonly method?: "GET" | "PUT" | "HEAD" | "DELETE";
  /**
   * Name of the bucket the object lives in.
   */
  readonly bucket: string;
  /**
   * Key of the object.
   */
  readonly key: string;
  /**
   * Specific object version to access, signed as the `versionId` query
   * parameter. If omitted, S3 uses the current version.
   */
  readonly versionId?: string;
  /**
   * Region the bucket lives in (used for both the endpoint and the SigV4
   * credential scope). Defaults to the {@link Region.Region} service.
   */
  readonly region?: string;
  /**
   * Number of seconds the URL remains valid.
   * @default 900
   */
  readonly expiresIn?: number;
  /**
   * `Content-Type` header to sign into the URL. The consumer (e.g. a PUT
   * uploader) must send exactly this `Content-Type` or S3 rejects the
   * request with a signature mismatch.
   */
  readonly contentType?: string;
  /**
   * `response-content-type` override for GET URLs -- S3 responds with this
   * `Content-Type` regardless of the stored object's metadata.
   */
  readonly responseContentType?: string;
  /**
   * Fixed signing datetime in `YYYYMMDDTHHMMSSZ` format. Defaults to now.
   */
  readonly datetime?: string;
}

/**
 * SigV4 query-string presigning for S3 objects.
 *
 * Produces a virtual-hosted-style URL
 * (`https://{bucket}.s3.{region}.{dnsSuffix}/{key}`, with the DNS suffix of
 * the region's partition, e.g. `amazonaws.eu` in `aws-eusc`), or a
 * path-style URL under the custom {@link Endpoint.Endpoint} when one is
 * provided (e.g. LocalStack or S3-compatible stores).
 *
 * Pure client-side computation -- no AWS API call is made. The URL inherits
 * the IAM permissions of the identity resolved from the
 * {@link Credentials.Credentials} service.
 *
 * Fails with `InvalidInput`, before anything is signed, for a bucket or key
 * that would address another resource: an empty value, a `.` or `..` bucket
 * or key segment, or (without a custom endpoint) a bucket that is not
 * plain host-name text.
 */
export const presignS3Url: (
  options: PresignS3UrlOptions,
) => Effect.Effect<string, PresignError, PresignContext> = /*@__PURE__*/ Effect.fnUntraced(
  function* (options: PresignS3UrlOptions) {
    const region = options.region ?? (yield* yield* Region.Region);
    const customEndpoint = yield* yield* Effect.serviceOption(Endpoint.Endpoint).pipe(
      Effect.map(Option.getOrElse(() => Effect.undefined)),
    );

    const invalid =
      invalidAwsLabel("bucket", options.bucket, false) ??
      invalidAwsLabel("key", options.key, true) ??
      (!customEndpoint && encodeLabel(options.bucket) !== options.bucket
        ? invalidHostLabel("bucket", options.bucket)
        : undefined);
    if (invalid !== undefined) return yield* invalid;
    const encodedKey = encodeGreedyLabel(options.key);
    const url = yield* parseUrl(
      customEndpoint
        ? `${customEndpoint.replace(/\/+$/, "")}/${encodeLabel(options.bucket)}/${encodedKey}`
        : `https://${options.bucket}.s3.${region}.${dnsSuffix(region)}/${encodedKey}`,
    );
    if (options.versionId !== undefined) {
      url.searchParams.set("versionId", options.versionId);
    }
    if (options.responseContentType !== undefined) {
      url.searchParams.set("response-content-type", options.responseContentType);
    }

    return yield* presignUrl({
      method: options.method ?? "GET",
      url: url.toString(),
      service: "s3",
      region,
      expiresIn: options.expiresIn,
      headers:
        options.contentType !== undefined ? { "content-type": options.contentType } : undefined,
      datetime: options.datetime,
    });
  },
);

/**
 * Errors returned by {@link presignRequest}: those of {@link PresignError},
 * an input that does not match the operation's schema, and an input the
 * endpoint rules refuse.
 */
export type PresignRequestError = PresignError | ParseError | EndpointError;

/**
 * Options for {@link presignRequest}.
 */
export interface PresignRequestOptions {
  /**
   * Number of seconds the URL remains valid.
   * @default 900
   */
  readonly expiresIn?: number;
  /**
   * Fixed signing datetime in `YYYYMMDDTHHMMSSZ` format. Defaults to now.
   */
  readonly datetime?: string;
}

/**
 * A request presigned by {@link presignRequest}.
 */
export interface PresignedRequest {
  /** HTTP method the URL authorizes. */
  readonly method: string;
  /** The URL, with the signature and the input's `x-amz-*` fields in its query string. */
  readonly url: string;
  /**
   * Headers (lower-case names) the request must be sent with, each covered
   * by the signature. Empty when every field went into the URL.
   */
  readonly headers: Record<string, string>;
}

/**
 * SigV4 query-string presigning for any operation, from its typed input,
 * like the AWS SDK's `getSignedUrl(client, command)`.
 *
 * The input is serialized and its endpoint resolved exactly as a call to
 * `operation` would, so every member the operation models can be pinned:
 *
 * - query members (`versionId`, `partNumber`, the `response-*` overrides)
 *   are signed into the URL;
 * - `x-amz-*` header members (`x-amz-meta-*`, `x-amz-tagging`,
 *   `x-amz-storage-class`, ...) are signed into the URL as query parameters,
 *   except the server-side encryption and checksum headers, which S3 reads
 *   only as headers;
 * - every other header member (`Content-Type`, `Content-Length`,
 *   `Content-MD5`, `If-None-Match`, `Range`, ...) and those exceptions are
 *   returned in `headers`: the request must send them with these values or
 *   S3 rejects the signature.
 *
 * The body is not part of the signature (`UNSIGNED-PAYLOAD`) and no
 * checksum is computed for it; pin it with `ContentLength`, `ContentMD5` or
 * a `Checksum*` member.
 *
 * Pure client-side computation -- no API call is made. The URL inherits the
 * IAM permissions of the identity resolved from the
 * {@link Credentials.Credentials} service. The region is the input's
 * `region`, else the `Region` layer, else the credentials' region, and a
 * custom `Endpoint` is used as for any call.
 *
 * @example
 * ```ts
 * const upload = yield* Presign.presignRequest(
 *   S3.putObject,
 *   { Bucket: "uploads", Key: "avatar.png", ContentType: "image/png", ContentLength: 1024, IfNoneMatch: "*" },
 *   { expiresIn: 300 },
 * );
 * // fetch(upload.url, { method: upload.method, headers: upload.headers, body })
 * ```
 */
export const presignRequest = <I, O, E, R>(
  operation: API.OperationMethod<I, O, E, R>,
  input: Omit<I, "Body">,
  options?: PresignRequestOptions,
): Effect.Effect<PresignedRequest, PresignRequestError, Credentials.Credentials> =>
  Protocol.presign(API.configOf(operation), input, options ?? {});
