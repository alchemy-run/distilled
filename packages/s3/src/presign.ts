import * as API from "@distilled.cloud/core/api";
import * as CoreCrypto from "@distilled.cloud/core/crypto";
import {
  type InvalidInput,
  InvalidInput as InvalidInputError,
} from "@distilled.cloud/core/protocol-http";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type { HttpMethod } from "effect/http/HttpMethod";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import { type PresignSettings, Presigning } from "./client/presigning.ts";
import * as Credentials from "./credentials.ts";
import * as Endpoint from "./endpoint.ts";
import type { EndpointError, ParseError } from "./errors.ts";
import * as Region from "./region.ts";
import { dnsSuffix } from "./rules-engine/aws-functions.ts";
import * as SigV4 from "./sigv4.ts";
import { toBase64 } from "./util/base64.ts";
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
 * `path` under the bucket's URL: virtual-hosted
 * (`https://{bucket}.s3.{region}.{dnsSuffix}/{path}`), or path-style under a
 * custom {@link Endpoint.Endpoint}. Fails with `InvalidInput` for a bucket or
 * key that would address another resource.
 */
const objectUrl = (
  bucket: string,
  key: string,
  region: string,
  path: string,
): Effect.Effect<URL, InvalidInput | SigV4.InvalidSigningUrl> =>
  Effect.flatMap(
    Effect.flatten(
      Effect.map(
        Effect.serviceOption(Endpoint.Endpoint),
        Option.getOrElse(() => Effect.undefined),
      ),
    ),
    (customEndpoint): Effect.Effect<URL, InvalidInput | SigV4.InvalidSigningUrl> => {
      const invalid =
        invalidAwsLabel("bucket", bucket, false) ??
        invalidAwsLabel("key", key, true) ??
        (!customEndpoint && encodeLabel(bucket) !== bucket
          ? invalidHostLabel("bucket", bucket)
          : undefined);
      if (invalid !== undefined) return Effect.fail(invalid);
      return parseUrl(
        customEndpoint
          ? `${customEndpoint.replace(/\/+$/, "")}/${encodeLabel(bucket)}/${path}`
          : `https://${bucket}.s3.${region}.${dnsSuffix(region)}/${path}`,
      );
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
  readonly method?: "GET" | "PUT" | "HEAD" | "DELETE" | undefined;
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
  readonly versionId?: string | undefined;
  /**
   * Region the bucket lives in (used for both the endpoint and the SigV4
   * credential scope). Defaults to the {@link Region.Region} service.
   */
  readonly region?: string | undefined;
  /**
   * Number of seconds the URL remains valid.
   * @default 900
   */
  readonly expiresIn?: number | undefined;
  /**
   * `Content-Type` header to sign into the URL. The consumer (e.g. a PUT
   * uploader) must send exactly this `Content-Type` or S3 rejects the
   * request with a signature mismatch.
   */
  readonly contentType?: string | undefined;
  /**
   * `response-content-type` override for GET URLs -- S3 responds with this
   * `Content-Type` regardless of the stored object's metadata.
   */
  readonly responseContentType?: string | undefined;
  /**
   * Fixed signing datetime in `YYYYMMDDTHHMMSSZ` format. Defaults to now.
   */
  readonly datetime?: string | undefined;
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
    const url = yield* objectUrl(
      options.bucket,
      options.key,
      region,
      encodeGreedyLabel(options.key),
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
 * Errors returned by {@link presignRequest}: {@link PresignError}, an input
 * the operation's serializer or endpoint rules refuse, and `SdkError` when
 * the operation can't be loaded.
 */
export type PresignRequestError = PresignError | ParseError | EndpointError | SdkError;

/**
 * SigV4 query-string presigning for any operation, from its typed input,
 * like the AWS SDK's `getSignedUrl(client, command)`.
 *
 * The request is the one a call to `operation` would send -- the same
 * serializer, middleware and endpoint rules -- signed into its query string
 * instead of its headers, so every member the input sets is pinned:
 *
 * - query members (`versionId`, `partNumber`, the `response-*` overrides)
 *   are signed into the URL;
 * - `x-amz-*` header members (`x-amz-meta-*`, `x-amz-tagging`,
 *   `x-amz-storage-class`, ...) are signed into the URL as query parameters,
 *   except the server-side encryption and checksum headers, which S3 reads
 *   only as headers;
 * - every other header member (`Content-Type`, `Content-Length`,
 *   `Content-MD5`, `If-None-Match`, `Range`, ...) and those exceptions are
 *   returned in `headers`. The request must send exactly these: a PUT with
 *   `ContentLength: 1024` accepts only a 1024-byte body.
 *
 * A member left out of the input is not signed, and the client may send it.
 * The body is not part of the signature (`UNSIGNED-PAYLOAD`); pin it with
 * `ContentLength`, `ContentMD5` or a `Checksum*` member. An input that
 * serializes into a body (an XML payload such as `PutObjectTagging`'s tag
 * set, or any JSON or query-protocol operation) fails with `InvalidInput`,
 * since a URL cannot carry it, as does an endpoint that signs with SigV4A
 * (an S3 Multi-Region Access Point).
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
  options: PresignRequestOptions = {},
): Effect.Effect<PresignedRequest, PresignRequestError, Exclude<R, HttpClient.HttpClient>> =>
  (
    API.encodeRequest(operation, input as I) as Effect.Effect<
      HttpClientRequest.HttpClientRequest,
      PresignRequestError,
      Exclude<R, HttpClient.HttpClient>
    >
  ).pipe(
    Effect.provideService(Presigning, { presign: presignedRequestOf(options) }),
    Effect.map((request) => ({
      method: request.method,
      url: request.url,
      headers: { ...request.headers },
    })),
  );

// `x-amz-*` headers S3 reads only as headers, so a presigned request keeps
// them as signed headers (the AWS SDK's S3 presigner does the same for SSE).
const UNHOISTABLE = /^x-amz-(?:server-side-encryption|checksum-|sdk-checksum-algorithm$)/;

/**
 * The request the protocol built and resolved, signed into its query string:
 * the input's `x-amz-*` headers move into the query (except
 * {@link UNHOISTABLE}), every other header stays and is signed, and the
 * payload is `UNSIGNED-PAYLOAD`. A body, or a signer other than SigV4, fails
 * with `InvalidInput`: a URL can't carry either.
 */
const presignedRequestOf =
  (options: PresignRequestOptions): PresignSettings["presign"] =>
  (request, fiber) => {
    const refuse = (message: string) =>
      Effect.fail(new InvalidInputError({ member: request.operation ?? "input", message }));
    if (request.signer !== undefined) {
      return refuse(`The request signs with ${request.signer}, which presigning does not support.`);
    }
    const body = request.body;
    if (body instanceof ReadableStream || (body !== undefined && body.length > 0)) {
      return refuse(
        "The input serializes into a request body, which a presigned URL cannot carry.",
      );
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
      if (lower.startsWith("x-amz-") && !UNHOISTABLE.test(lower))
        url.searchParams.set(lower, value);
      else headers[lower] = value;
    }
    // The signer assumes UNSIGNED-PAYLOAD only for the signing name `s3`;
    // access points sign S3 operations under other names.
    if (request.service !== "s3") headers["x-amz-content-sha256"] = "UNSIGNED-PAYLOAD";
    url.searchParams.set("X-Amz-Expires", String(options.expiresIn ?? 900));

    const sign: SigV4.SignOptions = {
      method: request.method,
      url: url.toString(),
      headers,
      accessKeyId: Redacted.value(request.credentials.accessKeyId),
      secretAccessKey: request.credentials.secretAccessKey,
      sessionToken: request.credentials.sessionToken,
      service: request.service,
      region: request.region,
      datetime: options.datetime,
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
      signed = SigV4.signSync(sign, fiber);
    } catch (e) {
      return Effect.fail(e as SigV4.SigningError);
    }
    return signed === undefined ? Effect.map(SigV4.sign(sign), toRequest) : toRequest(signed);
  };

/**
 * A condition in an S3 POST policy: an exact field match (`{ acl: "private" }`),
 * a prefix match (`["starts-with", "$key", "uploads/"]`), or a size range
 * in bytes (`["content-length-range", 0, 10485760]`).
 */
export type PostPolicyCondition =
  | Readonly<Record<string, string>>
  | readonly ["eq" | "starts-with", string, string]
  | readonly ["content-length-range", number, number];

/**
 * Options for {@link presignPost}.
 */
export interface PresignPostOptions {
  /** Bucket the form uploads into. */
  readonly bucket: string;
  /**
   * Key of the uploaded object. A key ending in `${filename}` lets the
   * browser fill in the file's name: the policy then allows any key that
   * starts with the text before it.
   */
  readonly key: string;
  /**
   * Region the bucket lives in (used for both the endpoint and the SigV4
   * credential scope). Defaults to the {@link Region.Region} service.
   */
  readonly region?: string;
  /**
   * Number of seconds the policy remains valid.
   * @default 900
   */
  readonly expiresIn?: number;
  /**
   * Conditions the upload must meet besides the returned fields, for example
   * `["content-length-range", 0, 10485760]` or
   * `["starts-with", "$Content-Type", "image/"]`.
   */
  readonly conditions?: ReadonlyArray<PostPolicyCondition>;
  /**
   * Form fields to send with exactly these values (`Content-Type`, `acl`,
   * `x-amz-meta-*`, `success_action_status`, ...). Each one is also added to
   * the policy as an exact match.
   */
  readonly fields?: Readonly<Record<string, string>>;
  /** Fixed signing datetime in `YYYYMMDDTHHMMSSZ` format. Defaults to now. */
  readonly datetime?: string;
}

/**
 * A browser upload form presigned by {@link presignPost}.
 */
export interface PresignedPost {
  /** The form's `action`: the bucket's URL. */
  readonly url: string;
  /**
   * Fields to send, in this order, before the `file` field, including the
   * policy and its signature.
   */
  readonly fields: Record<string, string>;
}

/** `YYYYMMDDTHHMMSSZ` for `millis`. */
const amzDate = (millis: number) => new Date(millis).toISOString().replace(/[:-]|\.\d{3}/g, "");

/**
 * Presign an S3 POST policy for a browser form upload, like the AWS SDK's
 * `createPresignedPost`. The browser sends a `multipart/form-data` POST to
 * `url` with `fields` and then the `file` field; S3 accepts it while the
 * policy is valid and the upload meets every condition.
 *
 * A policy can allow ranges and prefixes that a presigned URL can't, such as
 * any size up to 10 MB or any key under `uploads/`. For one exact request,
 * use {@link presignS3Url}.
 *
 * Pure client-side computation -- no AWS API call is made. The upload
 * inherits the IAM permissions of the identity resolved from the
 * {@link Credentials.Credentials} service. Fails with `InvalidInput` for a
 * bucket or key that would address another resource, as
 * {@link presignS3Url} does.
 *
 * @example
 * ```ts
 * const post = yield* Presign.presignPost({
 *   bucket: "uploads",
 *   key: "avatars/${filename}",
 *   conditions: [["content-length-range", 0, 10 * 1024 * 1024]],
 *   fields: { "Content-Type": "image/png" },
 * });
 * const form = new FormData();
 * for (const [name, value] of Object.entries(post.fields)) form.append(name, value);
 * form.append("file", file);
 * // fetch(post.url, { method: "POST", body: form })
 * ```
 */
export const presignPost: (
  options: PresignPostOptions,
) => Effect.Effect<PresignedPost, PresignError, PresignContext> = /*@__PURE__*/ Effect.fnUntraced(
  function* (options: PresignPostOptions) {
    const credentials = yield* yield* Credentials.Credentials;
    const region = options.region ?? (yield* yield* Region.Region);
    const url = yield* objectUrl(options.bucket, options.key, region, "");

    const datetime = options.datetime ?? amzDate(yield* Clock.currentTimeMillis);
    const date = datetime.slice(0, 8);
    const signedAt = Date.UTC(
      Number(date.slice(0, 4)),
      Number(date.slice(4, 6)) - 1,
      Number(date.slice(6, 8)),
      Number(datetime.slice(9, 11)),
      Number(datetime.slice(11, 13)),
      Number(datetime.slice(13, 15)),
    );
    const expiration = new Date(signedAt + (options.expiresIn ?? 900) * 1000).toISOString();

    const fields: Record<string, string> = {
      ...options.fields,
      bucket: options.bucket,
      "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
      "X-Amz-Credential": `${Redacted.value(credentials.accessKeyId)}/${date}/${region}/s3/aws4_request`,
      "X-Amz-Date": datetime,
    };
    if (credentials.sessionToken !== undefined) {
      fields["X-Amz-Security-Token"] = Redacted.value(credentials.sessionToken);
    }
    const filename = options.key.lastIndexOf("${filename}");
    const policy = JSON.stringify({
      expiration,
      conditions: [
        ...(options.conditions ?? []),
        ...Object.entries(fields).map(([name, value]) => ({ [name]: value })),
        filename >= 0 && filename === options.key.length - "${filename}".length
          ? ["starts-with", "$key", options.key.slice(0, filename)]
          : { key: options.key },
      ],
    });
    const encodedPolicy = toBase64(new TextEncoder().encode(policy));

    const signingKey = yield* SigV4.deriveSigningKey({
      secretAccessKey: credentials.secretAccessKey,
      date,
      region,
      service: "s3",
    });
    const signature = yield* Effect.mapError(
      signingKey.impl.hmacSha256(signingKey.key, encodedPolicy),
      (e) => new SigV4.CryptoError({ operation: "hmac", cause: e.cause }),
    );
    return {
      url: url.toString(),
      fields: {
        ...fields,
        key: options.key,
        Policy: encodedPolicy,
        "X-Amz-Signature": CoreCrypto.hex(signature),
      },
    };
  },
);
