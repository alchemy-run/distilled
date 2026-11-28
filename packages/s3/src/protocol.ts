import * as API from "@distilled.cloud/core/api";
import type {
  DeclaredError,
  DeclaredErrorClass,
  DecodeArgs,
  EncodeArgs,
  Operation as ProtocolOperation,
  Protocol,
  ProtocolOf,
} from "@distilled.cloud/core/protocol";
import { invalidHostLabel, InvalidInput } from "@distilled.cloud/core/protocol-http";
import { SdkError } from "@distilled.cloud/core/sdk-error";
import * as Send from "@distilled.cloud/core/send";
import * as Telemetry from "@distilled.cloud/core/telemetry";
/**
 * AwsProtocol -- AWS's implementation of `@distilled.cloud/core`'s Protocol.
 *
 * Generated operations are plain `API.make(() => ({ input, output, errors,
 * serviceErrors, protocol: AwsProtocol, retry: Retry.Retry, operationName }))`
 * calls; this protocol supplies everything AWS-specific per request:
 *
 *   encode:  idempotency-token fill -> wire-family serializer (awsJson 1.0/1.1,
 *            awsQuery, ec2Query, restJson1, restXml, rpcv2Cbor -- discovered from the
 *            input schema's protocol trait) -> annotation middleware
 *            (checksums, streaming bodies) -> endpoint resolution (custom
 *            Endpoint service, compiled Smithy endpoint rules, or the
 *            `https://{service}.{region}.{dnsSuffix}` fallback) -> SigV4
 *            signing with per-request lazy Credentials/Region.
 *
 *   decode:  wire-family deserializer -> event-stream parsing -> output schema
 *            decode; error responses map wire codes onto the classes the
 *            operation and its service declare (its `errors`, then its
 *            `serviceErrors`), stamping server `retryAfterSeconds` hints as
 *            the `retryAfter` Duration core's default retry policy honors.
 *
 *   call:    the whole call as one effect. An operation whose request and
 *            response need no effects of their own (no middleware, no
 *            streaming members, SigV4 with synchronous crypto) builds,
 *            signs and decodes synchronously around a single
 *            `client.execute`; every other operation runs encode -> execute
 *            -> decode.
 *
 * Per-operation preprocessing (serializer construction, error maps, endpoint
 * rules) is keyed off the operation config's identity, which `API.make`
 * memoizes -- so it runs once per operation per process.
 */
import * as Context from "effect/Context";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as HttpBody from "effect/http/HttpBody";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import type { Operation } from "./client/operation.ts";
import { type PresignSettings, Presigning } from "./client/presigning.ts";
import {
  loadHandler,
  serializeFailure,
  type LazyHandler,
  type ProtocolHandler,
} from "./client/protocol.ts";
import { makeRequestBuilder } from "./client/request-builder.ts";
import type { Request } from "./client/request.ts";
import {
  type Decoded,
  makeResponseParser,
  makeSuccessDecoder,
  type ResponseParseError,
} from "./client/response-parser.ts";
import type { Response } from "./client/response.ts";
import * as Credentials from "./credentials.ts";
import * as Endpoint from "./endpoint.ts";
import { EndpointError, type ParseError } from "./errors.ts";
import * as Region from "./region.ts";
import { dnsSuffix } from "./rules-engine/aws-functions.ts";
import { makeEndpointResolver } from "./rules-engine/endpoint-resolver.ts";
import { Signer } from "./signer.ts";
import * as SigV4 from "./sigv4.ts";
import {
  type AwsAuthSigv2Trait,
  getAnnotationUnwrap,
  getAwsApiService,
  getAwsAuthSigv2,
  getAwsAuthSigv4,
  getProtocol,
  hasHttpPayload,
  isStreamingType,
  type ProtocolAnnotationValue,
  protocolSymbol,
} from "./traits.ts";
import { getIdentifier, getPropertySignatures } from "./util/ast.ts";
import { invalidRegion } from "./util/serialize-input.ts";
import { bodyStream, isOneShotBody, isStreamBody, type StreamBody } from "./util/stream.ts";

/**
 * Context (requirements) shared by every generated AWS operation.
 *
 * `Region` is deliberately absent: it is an optional override (see
 * `region.ts`), falling back to the region the credentials carry, so callers
 * who already configured a region for their credentials don't have to state
 * it again.
 */
export type AwsOpContext = Credentials.Credentials | HttpClient.HttpClient;

/** What a response parser fails with. */
type ParseFailure = DeclaredError | ResponseParseError;

interface Prepared {
  readonly op: Operation;
  /** Set by {@link planOf}. */
  readonly plan?: Plan;
  readonly handler: ProtocolHandler | LazyHandler | undefined;
  readonly hostPrefix: string | undefined;
  readonly operationName: string | undefined;
  /**
   * How many classes the operation declares itself. Core hands `decode` and
   * `call` those classes first, then the ones the operation's service
   * declares.
   */
  readonly ownErrors: number;
  /** Set by {@link parserOf}. */
  readonly parseResponse?: (response: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: string | StreamBody;
  }) => Effect.Effect<any, ParseFailure>;
  readonly sigv4: { name: string } | undefined;
  /** Legacy SigV2 (SimpleDB only) -- signs via body parameters, no header. */
  readonly sigv2: AwsAuthSigv2Trait | undefined;
  readonly serviceSdkId: string | undefined;
  readonly resolveEndpoint: ReturnType<typeof makeEndpointResolver>;
  /**
   * The output has no streaming or payload member, so the body is only ever
   * read as text: read it as text directly instead of piping it through an
   * Effect Stream and a web ReadableStream.
   */
  readonly textBody: boolean;
  /**
   * The input's `region` is the call's region ({@link Region.RegionInput}).
   * False when the operation models a `region` member of its own.
   */
  readonly regionInput: boolean;
}

// Keyed by the operation config object, which API.make memoizes per
// operation -- one entry per operation per process.
const preparedOps = /*@__PURE__*/ new WeakMap<API.ProtocolOperationConfig, Prepared>();

const prepare = (config: API.ProtocolOperationConfig): Prepared => {
  const cached = preparedOps.get(config);
  if (cached) return cached;

  // The wire machinery predates the core seam and is typed against the v0
  // Operation shape; the config carries the same information.
  const op: Operation = {
    input: config.input as any,
    output: config.output as any,
    // Filled by `parserOf`: only `decode` and `call` receive the classes.
    errors: [],
    operationName: config.operationName,
    pagination: config.pagination as Operation["pagination"],
  };
  const inputAst = op.input.ast;
  const serviceSdkId = getAwsApiService(inputAst)?.sdkId;
  const operationName =
    config.operationName ?? getIdentifier(inputAst)?.replace(/(?:Request|Input|Message)$/, "");

  // One protocol handler per operation, shared by the request builder, the
  // response parser and the call plan.
  const factory = getProtocol(inputAst);
  const handler = factory?.(op);
  const prepared: Prepared = {
    op,
    handler,
    hostPrefix: config.endpointHostPrefix,
    operationName,
    ownErrors: config.errors?.length ?? 0,
    sigv4: getAwsAuthSigv4(inputAst),
    sigv2: getAwsAuthSigv2(inputAst),
    serviceSdkId,
    resolveEndpoint: makeEndpointResolver(op),
    textBody:
      getAnnotationUnwrap<ProtocolAnnotationValue>(inputAst, protocolSymbol)?.binaryBody !== true &&
      getPropertySignatures(op.output.ast).every(
        (prop) => !hasHttpPayload(prop) && !isStreamingType(prop.type),
      ),
    regionInput: !getPropertySignatures(inputAst).some((prop) => prop.name === "region"),
  };
  preparedOps.set(config, prepared);
  return prepared;
};

/**
 * The operation's response parser, built on its first response. `errors` is
 * what core hands `decode` and `call`: the classes the operation declares,
 * then the ones its service declares. The parser matches a failed response
 * against both, and an operation's class replaces the service's class of
 * the same name.
 */
const parserOf = (
  prepared: Prepared,
  errors: ReadonlyArray<DeclaredErrorClass>,
  handler: ProtocolHandler,
): NonNullable<Prepared["parseResponse"]> => {
  if (prepared.parseResponse !== undefined) return prepared.parseResponse;
  prepared.op.errors = errors.slice(0, prepared.ownErrors);
  prepared.op.serviceErrors = errors.slice(prepared.ownErrors);
  return ((prepared as { parseResponse?: Prepared["parseResponse"] }).parseResponse =
    makeResponseParser(prepared.op, {
      protocol: () => handler,
      service: prepared.serviceSdkId,
      operation: prepared.operationName,
      // Validation follows the caller's ResponseValidation layer
      // (@distilled.cloud/core, lenient by default).
    }));
};

type Fiber = Parameters<typeof SigV4.signSync>[1];

/**
 * Credentials, region and the custom endpoint from `context`, then `f` on
 * them. Each service holds an effect; an already-resolved one costs no
 * fiber step (see `API.withValue`).
 */
const withAwsContext = <A, E, R>(
  context: Context.Context<any>,
  callRegion: string | undefined,
  f: (
    credentials: Credentials.ResolvedCredentials,
    region: string,
    customEndpoint: string | undefined,
  ) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | Credentials.ProviderError, R> =>
  API.withValue(Context.get(context, Credentials.Credentials), (credentials) => {
    // The call's own `region`, else this scope's `Region` override, else
    // the region the credentials authenticated against. `Region` is
    // optional -- it isn't in any operation's requirements.
    const withRegion = (region: string) => {
      const endpoint = Context.getOrUndefined(context, Endpoint.Endpoint);
      return endpoint === undefined
        ? f(credentials, region, undefined)
        : API.withValue(endpoint, (custom) => f(credentials, region, custom));
    };
    if (callRegion !== undefined) return withRegion(callRegion);
    const regionOverride = Context.getOrUndefined(context, Region.Region);
    return regionOverride === undefined
      ? withRegion(credentials.region)
      : API.withValue(regionOverride, withRegion);
  });

/**
 * Turn a serialized request into the signed HTTP request: endpoint
 * resolution, host prefix, query string and signing (into the query string
 * when `presign` is set). Synchronous unless the request needs an effect
 * (SigV2, a payload digest, asynchronous crypto) or fails, in which case the
 * effect is returned instead.
 */
const toHttpRequest = (
  prepared: Prepared,
  input: unknown,
  request: Request,
  credentials: Credentials.ResolvedCredentials,
  region: string,
  customEndpoint: string | undefined,
  fiber: Fiber,
  presign: PresignSettings | undefined,
):
  | HttpClientRequest.HttpClientRequest
  | Effect.Effect<
      HttpClientRequest.HttpClientRequest,
      EndpointError | InvalidInput | SigV4.SigningError | SdkError
    > => {
  const { sigv4, sigv2, serviceSdkId, resolveEndpoint: rulesResolver } = prepared;
  const serviceName = sigv4?.name ?? "s3";

  // The region from the input, the `Region` layer or the credentials. It is
  // checked before any endpoint is built, custom endpoints included.
  const regionError = invalidRegion(region);
  if (regionError !== undefined) return Effect.fail(regionError);

  // Resolve endpoint and adjust request path if needed
  let endpoint: string;
  let resolvedRequest = request;
  let signingRegion = region; // Default to context region
  let signingServiceName = serviceName; // Default to service name from sigv4 trait
  // SigV4A region set, when the endpoint rules require the asymmetric signer
  // (EventBridge global endpoints, S3 Multi-Region Access Points).
  let signingRegionSet: readonly string[] | undefined;

  if (customEndpoint) {
    // User provided a custom endpoint - use it directly
    endpoint = customEndpoint;
  } else if (rulesResolver) {
    // Use the rules resolver - it handles endpoint resolution AND path adjustment
    const resolved = rulesResolver({
      input,
      region,
      request,
    });
    if (resolved instanceof EndpointError) return Effect.fail(resolved);
    endpoint = resolved.endpoint.url;
    resolvedRequest = resolved.request;

    // Extract signing region from endpoint authSchemes if present
    // Global services like IAM return a specific signingRegion (e.g., us-east-1)
    const authSchemes = resolved.endpoint.properties?.authSchemes as
      | Array<{
          name?: string;
          signingName?: string;
          signingRegion?: string;
          signingRegionSet?: string[];
        }>
      | undefined;
    // Only when SigV4 is not offered as well: services listing both (e.g.
    // Sustainability, S3 on Outposts) keep signing with SigV4, as before.
    if (authSchemes?.[0]?.name === "sigv4a" && !authSchemes.some((s) => s.name === "sigv4")) {
      signingRegionSet = authSchemes[0].signingRegionSet ?? ["*"];
    }
    if (authSchemes?.[0]?.signingRegion) {
      signingRegion = authSchemes[0].signingRegion;
    }
    if (authSchemes?.[0]?.signingName) {
      signingServiceName = authSchemes[0].signingName;
    }
  } else {
    // Fallback to static endpoint
    endpoint = `https://${serviceName}.${region}.${dnsSuffix(region)}`;
  }

  // Apply the Smithy `smithy.api#endpoint` hostPrefix (e.g. "sync-" for
  // Step Functions StartSyncExecution -> sync-states.{region}). Skipped for a
  // custom endpoint: an emulator or proxy (LocalStack, MinIO, R2) serves every
  // operation on the one host it names. The AWS SDKs apply it there too,
  // unless `disableHostPrefix` is set. Labels of the
  // form {memberName} are substituted from the operation input; a value that
  // is not a host name ("attacker.invalid/") would move the request to
  // another host, so it fails with InvalidInput before anything is signed.
  if (prepared.hostPrefix !== undefined && !customEndpoint) {
    let resolvedPrefix = prepared.hostPrefix;
    for (const [label, member = ""] of prepared.hostPrefix.matchAll(/\{(\w+)\}/g)) {
      const value = String((input as Record<string, unknown>)?.[member] ?? "");
      const invalid = invalidHostLabel(member, value, true);
      if (invalid !== undefined) return Effect.fail(invalid);
      resolvedPrefix = resolvedPrefix.replace(label, value);
    }
    // The endpoint rules engine may already have baked the same label into
    // the host (e.g. S3 Control resolves `{AccountId}.s3-control.{region}`
    // from the AccountId context param, and the operations ALSO carry the
    // `{AccountId}.` hostPrefix trait). Only prepend when the resolved
    // endpoint does not already start with the prefix, else the label is
    // applied twice and TLS fails on the doubled host.
    const hostStart = endpoint.indexOf("://") + 3;
    if (!endpoint.startsWith(resolvedPrefix, hostStart)) {
      endpoint = endpoint.replace("://", `://${resolvedPrefix}`);
    }
  }

  // A query name or value with a lone UTF-16 surrogate (`"\ud800"`) can't be
  // percent-encoded: `encodeURIComponent` throws `URIError` on it. The `=`
  // keeps a surrogate at the end of the name from pairing with the value's.
  for (const [name, value] of Object.entries(resolvedRequest.query)) {
    if (!`${name}=${value}`.isWellFormed()) {
      return Effect.fail(
        new InvalidInput({
          member: name,
          message: `Query parameter ${name} has a lone UTF-16 surrogate, which a URL cannot carry`,
        }),
      );
    }
  }

  // Build full URL with query string
  const queryString = Object.entries(resolvedRequest.query)
    .filter(([, v]) => v !== undefined)
    .flatMap(([k, v]) => {
      // Handle arrays as repeated query parameters (e.g., tagKeys=A&tagKeys=B)
      if (Array.isArray(v)) {
        return v.map((item) =>
          item ? `${encodeURIComponent(k)}=${encodeURIComponent(item)}` : encodeURIComponent(k),
        );
      }
      return v ? `${encodeURIComponent(k)}=${encodeURIComponent(v)}` : encodeURIComponent(k);
    })
    .join("&");

  const fullPath = queryString ? `${resolvedRequest.path}?${queryString}` : resolvedRequest.path;

  if (presign !== undefined) {
    return presign.presign(
      {
        operation: prepared.operationName,
        method: resolvedRequest.method,
        url: `${endpoint}${fullPath}`,
        headers: resolvedRequest.headers,
        body: resolvedRequest.body,
        signer: signingRegionSet !== undefined ? "SigV4A" : sigv2 ? "SigV2" : undefined,
        service: signingServiceName,
        region: signingRegion,
        credentials,
      },
      fiber,
    );
  }

  if (sigv2) {
    // The SigV2 signer parses this URL synchronously; fail an unparseable
    // one (e.g. a malformed custom endpoint) as SigV4 does.
    const url = `${endpoint}${fullPath}`;
    try {
      void new URL(url);
    } catch (cause) {
      return Effect.fail(new SigV4.InvalidSigningUrl({ url, cause }));
    }
    return sigv2.sign(resolvedRequest, endpoint, fullPath, credentials);
  }

  // For streaming bodies, we can't compute a hash
  // so we use UNSIGNED-PAYLOAD and don't pass the body to the signer
  const isStreamingBody = isStreamBody(resolvedRequest.body);
  // Check if content-sha256 header is already set (e.g., by checksum middleware)
  // Check if service provides its own checksum (e.g., EBS x-amz-Checksum header)
  // In this case, the body should not be included in SigV4 signing
  const hasHeader = (name: string) =>
    Object.keys(resolvedRequest.headers).some((k) => k.toLowerCase() === name);
  const hasContentSha256 = hasHeader("x-amz-content-sha256");
  const hasServiceChecksum = hasHeader("x-amz-checksum");
  // Check if there's a body to sign
  const hasBody = resolvedRequest.body !== undefined;
  // Operations with a streaming input payload (smithy `@streaming` blob)
  // sign as UNSIGNED-PAYLOAD even when the caller supplied a buffered
  // value -- except for services that reject it and require the real
  // payload hash (they reconstruct the canonical request from the body):
  // Glacier, SageMaker Runtime, AppConfig, API Gateway Management,
  // Bedrock Runtime, IoT Data Plane, IoT Wireless, and Lambda.
  const hasStreamingInput =
    resolvedRequest.hasStreamingInput === true &&
    serviceSdkId !== "Glacier" &&
    serviceSdkId !== "SageMaker Runtime" &&
    serviceSdkId !== "AppConfig" &&
    serviceSdkId !== "ApiGatewayManagementApi" &&
    serviceSdkId !== "Bedrock Runtime" &&
    serviceSdkId !== "IoT Data Plane" &&
    serviceSdkId !== "IoT Wireless" &&
    serviceSdkId !== "Lambda";
  // Use unsigned payload for streaming bodies OR streaming-input
  // operations OR when service provides checksum with body
  const useUnsignedPayload =
    (isStreamingBody || hasStreamingInput || (hasServiceChecksum && hasBody)) && !hasContentSha256;
  const signingHeaders = useUnsignedPayload
    ? {
        ...resolvedRequest.headers,
        "X-Amz-Content-Sha256": "UNSIGNED-PAYLOAD",
      }
    : resolvedRequest.headers;

  const options: SigV4.SignOptions = {
    method: resolvedRequest.method,
    url: `${endpoint}${fullPath}`,
    headers: signingHeaders,
    // Don't pass body to signer when using unsigned payload. A streaming
    // body only reaches here with an explicit x-amz-content-sha256, in
    // which case the signer never reads the body.
    body:
      useUnsignedPayload || isStreamingBody
        ? undefined
        : (resolvedRequest.body as SigV4.SignableBody | undefined),
    accessKeyId: Redacted.value(credentials.accessKeyId),
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
    service: signingServiceName,
    region: signingRegion,
    // S3 Control rejects UNSIGNED-PAYLOAD on several routes (access point
    // operations fail with `InvalidRequest: "Request body cannot be
    // unsigned"`). The signer injects UNSIGNED-PAYLOAD for any service signing
    // as "s3" when the header is absent, so pre-compute the real payload
    // SHA-256 here (matching the official SDK's applyChecksum behavior).
    // Glacier likewise REQUIRES the x-amz-content-sha256 header on
    // payload-bearing requests (UploadArchive / UploadMultipartPart) -- the
    // service reconstructs the canonical request from that header, so
    // omitting it fails with InvalidSignatureException (the official SDK's
    // addChecksumHeaders middleware always sets it).
    hashPayload:
      (serviceSdkId === "S3 Control" || serviceSdkId === "Glacier") &&
      !useUnsignedPayload &&
      !hasContentSha256 &&
      !isStreamingBody,
  };
  const toRequest = (signed: SigV4.SignedRequest) =>
    httpRequestOf(signed, resolvedRequest.body, isStreamingBody);
  // A Signer in context signs in place of the local key (see `signer.ts`).
  const signer = Context.getOrUndefined(fiber.context as Context.Context<any>, Signer);
  if (signer !== undefined) {
    const {
      accessKeyId: _id,
      secretAccessKey: _secret,
      sessionToken: _token,
      ...unsigned
    } = options;
    return Effect.map(
      signer.sign(
        signingRegionSet === undefined ? unsigned : { ...unsigned, regionSet: signingRegionSet },
      ),
      toRequest,
    );
  }
  if (signingRegionSet !== undefined) {
    const { region: _, ...v4a } = options;
    return Effect.map(SigV4.signV4a({ ...v4a, regionSet: signingRegionSet }), toRequest);
  }
  let signed: SigV4.SignedRequest | undefined;
  try {
    signed = SigV4.signSync(options, fiber);
  } catch (e) {
    // signSync throws a SigningError; anything else is a bug in the signer.
    return Effect.fail(
      e instanceof SigV4.InvalidSigningUrl ||
        e instanceof SigV4.InvalidSigningHeaders ||
        e instanceof SigV4.CryptoError
        ? e
        : new SdkError({
            message: `SigV4 signing threw: ${e instanceof Error ? e.message : String(e)}`,
          }),
    );
  }
  return signed === undefined ? Effect.map(SigV4.sign(options), toRequest) : toRequest(signed);
};

/** The `HttpClientRequest` for a signed request and its body. */
const httpRequestOf = (
  signedRequest: SigV4.SignedRequest,
  body: Request["body"],
  isStreamingBody: boolean,
): HttpClientRequest.HttpClientRequest => {
  const signedHeaders = signedRequest.headers;

  // Get content type from signed headers for body constructor
  const contentType = signedHeaders["content-type"];

  // Build HttpBody based on body type
  // We must pass the content type to avoid HttpBody overriding the signed Content-Type header,
  // and a stream's content length, or setBody removes Content-Length and the body goes out chunked
  let httpBody: HttpBody.HttpBody;
  if (isStreamingBody && isStreamBody(body)) {
    // An Effect stream goes to the HttpClient as is, so it runs in this fiber.
    const contentLength = signedHeaders["content-length"];
    httpBody = HttpBody.stream(
      bodyStream(body),
      contentType,
      contentLength === undefined ? undefined : Number(contentLength),
    );
  } else if (body === undefined) {
    httpBody = HttpBody.empty;
  } else if (typeof body === "string") {
    httpBody = HttpBody.text(body, contentType);
  } else if (body instanceof Uint8Array) {
    httpBody = HttpBody.uint8Array(body, contentType);
  } else {
    httpBody = HttpBody.empty;
  }

  // setBody must come after setHeaders because it adds
  // content-type/content-length from the HttpBody, which should match our
  // signed headers.
  return pipe(
    HttpClientRequest.make(
      signedRequest.method as "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS",
    )(signedRequest.url),
    HttpClientRequest.setHeaders(signedHeaders),
    HttpClientRequest.setBody(httpBody),
    // Empty bodies clear Content-Type, which S3 also uses for object metadata.
    (request) =>
      httpBody._tag === "Empty" && contentType !== undefined
        ? HttpClientRequest.setHeader(request, "content-type", contentType)
        : request,
  );
};

/** `f` on a request that may still be an effect. */
const thenSend = <A, E1, E2, R>(
  r: HttpClientRequest.HttpClientRequest | Effect.Effect<HttpClientRequest.HttpClientRequest, E1>,
  f: (request: HttpClientRequest.HttpClientRequest) => Effect.Effect<A, E2, R>,
): Effect.Effect<A, E1 | E2, R> =>
  HttpClientRequest.isHttpClientRequest(r) ? f(r) : Effect.flatMap(r, f);

/**
 * Stamp a server-provided `retryAfterSeconds` hint (modeled on several AWS
 * throttling errors) as the `retryAfter` Duration that core's default retry
 * policy treats as the least it waits (RFC 9110).
 */
const stampRetryAfter = <E>(error: E): E => {
  if (typeof error !== "object" || error === null) return error;
  const e = error as Record<string, unknown>;
  if (e.retryAfter !== undefined) return error;
  const seconds = Number(e.retryAfterSeconds ?? e.RetryAfterSeconds ?? NaN);
  if (Number.isFinite(seconds) && seconds >= 0) {
    e.retryAfter = Duration.seconds(seconds);
  }
  return error;
};

/**
 * The parts of an operation that run without effects, compiled once its
 * protocol module has loaded: the request builder, and the 2xx decoder for
 * outputs that are read as text. Missing parts run as effects.
 */
interface Plan {
  readonly protocol: ProtocolHandler;
  readonly build: (
    input: unknown,
  ) => Request | Effect.Effect<Request, ParseError | InvalidInput | SdkError>;
  readonly decodeText:
    | ((context: Context.Context<any>, response: Response, text: string) => Decoded)
    | undefined;
}

/** The operation's plan, compiled on first use (its protocol module loads then). */
const planOf = (prepared: Prepared): Effect.Effect<Plan, SdkError> => {
  if (prepared.plan !== undefined) return Effect.succeed(prepared.plan);
  const handler = prepared.handler;
  if (handler === undefined)
    return Effect.fail(new SdkError({ message: "No protocol found on input schema" }));
  return Effect.map(loadHandler(handler), (protocol) => {
    const decodeSuccess = makeSuccessDecoder(prepared.op, {
      service: prepared.serviceSdkId,
      operation: prepared.operationName,
    });
    const plan: Plan = {
      protocol,
      build: makeRequestBuilder(prepared.op, protocol),
      decodeText: prepared.textBody
        ? (context, response, text) =>
            decodeSuccess(
              context,
              protocol.deserializeText({
                status: response.status,
                statusText: "OK",
                headers: response.headers as Record<string, string>,
                body: text,
              }),
            )
        : undefined,
    };
    return ((prepared as { plan?: Plan }).plan = plan);
  });
};

/**
 * The signed (or, given `presign`, presigned) HTTP request for `input`, on
 * the calling fiber. `f` also learns whether the body is the caller's own
 * stream, which can be sent only once.
 */
const encodeWith = <A, E, R>(
  prepared: Prepared,
  plan: Plan,
  fiber: Fiber,
  input: unknown,
  f: (request: HttpClientRequest.HttpClientRequest, oneShot: boolean) => Effect.Effect<A, E, R>,
  presign?: PresignSettings,
) => {
  const context = fiber.context as Context.Context<any>;
  const traceDebug = Telemetry.isDebug(context);
  const callRegion = prepared.regionInput
    ? (input as Partial<Region.RegionInput> | undefined)?.region
    : undefined;
  const sendSigned = (request: Request) =>
    withAwsContext(context, callRegion, (credentials, region, custom) => {
      Telemetry.annotate(context, "cloud.region", region);
      const oneShot = isOneShotBody(request.body);
      const fWith = (r: HttpClientRequest.HttpClientRequest) => f(r, oneShot);
      if (!traceDebug) {
        return thenSend(
          toHttpRequest(prepared, input, request, credentials, region, custom, fiber, presign),
          fWith,
        );
      }
      // BRAINSTORM: endpoint rules + SigV4 as one debug span.
      return Effect.flatMap(
        Telemetry.phase(
          context,
          "aws.endpoint_and_sign",
          Effect.suspend(() => {
            const r = toHttpRequest(
              prepared,
              input,
              request,
              credentials,
              region,
              custom,
              fiber,
              presign,
            );
            return HttpClientRequest.isHttpClientRequest(r) ? Effect.succeed(r) : r;
          }),
          { "aws.signing.name": prepared.sigv4?.name },
        ),
        fWith,
      );
    });
  // Serialize the input (protocol serializer + annotation middleware)
  if (traceDebug) {
    // BRAINSTORM: serialization as its own debug span.
    return Effect.flatMap(
      Telemetry.phase(
        context,
        "aws.serialize",
        Effect.suspend(() => {
          try {
            const r = plan.build(input);
            return Effect.isEffect(r) ? r : Effect.succeed(r);
          } catch (e) {
            return serializeFailure(prepared.operationName, e);
          }
        }),
      ),
      sendSigned,
    );
  }
  let request: Request | Effect.Effect<Request, ParseError | InvalidInput | SdkError>;
  try {
    request = plan.build(input);
  } catch (e) {
    return serializeFailure(prepared.operationName, e);
  }
  return Effect.isEffect(request) ? Effect.flatMap(request, sendSigned) : sendSigned(request);
};

/**
 * The call's result from the response: a 2xx text body through the
 * synchronous decoder, anything else through the operation's response
 * parser (success -> protocol deserialization + schema decoding + event
 * streams; error -> typed error matching).
 */
const decodeWith = (
  prepared: Prepared,
  plan: Plan,
  context: Context.Context<any>,
  response: HttpClientResponse.HttpClientResponse,
  errors: ReadonlyArray<DeclaredErrorClass>,
): Effect.Effect<unknown, ParseFailure | HttpClientError.HttpClientError> => {
  // HEAD requests never have a body, and some responses have no body (204,
  // etc.) -- Effect's HttpClientResponse.stream raises on empty bodies, so
  // detect those up front.
  const empty =
    response.request.method === "HEAD" ||
    (response.headers as Record<string, string>)["content-length"] === "0" ||
    response.status === 204;
  const parse = (body: string | StreamBody) =>
    Effect.mapError(
      parserOf(
        prepared,
        errors,
        plan.protocol,
      )({
        status: response.status,
        statusText: "OK",
        headers: response.headers as Record<string, string>,
        body,
      }),
      stampRetryAfter,
    );
  const fromText = (text: string) => {
    if (plan.decodeText === undefined || response.status < 200 || response.status >= 300) {
      return parse(text);
    }
    const decoded = plan.decodeText(context, response as unknown as Response, text);
    return decoded.ok ? Effect.succeed(decoded.value) : Effect.fail(stampRetryAfter(decoded.error));
  };
  const decoded = prepared.textBody
    ? empty
      ? fromText("")
      : Effect.flatMap(response.text, fromText)
    : empty
      ? parse(Stream.empty)
      : // The HttpClient's stream as is: the caller reads it in its own fiber.
        parse(response.stream);
  return decoded;
};

/**
 * One operation call on the calling fiber: encode -> one `client.execute`
 * -> decode. The operation's plan is compiled on its first call (the
 * protocol implementation loads then).
 */
const call = (op: ProtocolOperation, input: unknown) =>
  Effect.withFiber((fiber) => {
    const prepared = prepare(op.config);
    const context = fiber.context as Context.Context<any>;
    const run = (plan: Plan) => {
      const client = Context.get(context, HttpClient.HttpClient);
      return encodeWith(prepared, plan, fiber as unknown as Fiber, input, (request, oneShot) =>
        Effect.flatMap(Send.send(context, client, request, oneShot), (response) =>
          Telemetry.phase(
            context,
            "aws.deserialize",
            decodeWith(prepared, plan, context, response, op.errors),
          ),
        ),
      );
    };
    return prepared.plan
      ? run(prepared.plan)
      : Effect.flatMap(
          Telemetry.phase(context, "aws.load_protocol", planOf(prepared), {
            "distilled.setup.first_call": true,
          }),
          run,
        );
  });

const awsProtocolMethods = {
  encode: ({ input, config }: EncodeArgs) =>
    Effect.withFiber((fiber) => {
      const prepared = prepare(config);
      // `Presign.presignRequest` sets `Presigning` to sign into the query string.
      const presign = Context.getOrUndefined(fiber.context, Presigning);
      return Effect.flatMap(planOf(prepared), (plan) =>
        encodeWith(prepared, plan, fiber as unknown as Fiber, input, Effect.succeed, presign),
      );
    }),
  decode: ({ response, config, errors }: DecodeArgs) =>
    Effect.withFiber((fiber) => {
      const prepared = prepare(config);
      return Effect.flatMap(planOf(prepared), (plan) =>
        decodeWith(prepared, plan, fiber.context as Context.Context<any>, response, errors),
      );
    }),
  call,
} satisfies Protocol<unknown, unknown>;

/**
 * The protocol every generated AWS operation references. Its type is read
 * from its methods ({@link ProtocolOf}): what they fail with, besides the
 * errors an operation and its service declare, is what the protocol
 * declares.
 *
 * - `ParseError`: an input or a response that does not match its schema, or
 *   an error response the wire protocol can't read.
 * - `UnknownAwsError`: an error code that no declared class answers to.
 * - `InternalError`: a 5xx without an error code.
 * - `InvalidInput`: a path or host label that would address another
 *   resource, refused before anything is signed.
 * - `SdkError`: this SDK can't make the call (a protocol, middleware or
 *   codec module that did not load, an operation without a protocol).
 * - `EndpointError`: the endpoint rules reject the call's parameters.
 * - `SigV4.SigningError`: the request can't be signed.
 * - `HttpClientError`: the request failed, or the response body could not
 *   be read.
 * - `Credentials.ProviderError`: what the provided `Credentials`, `Region`
 *   and `Endpoint` fail with.
 *
 * It is one module-level value shared by every operation, so nothing here
 * captures credentials: they, the region and the endpoint are read from the
 * calling fiber's context on every request.
 */
export const AwsProtocol: ProtocolOf<typeof awsProtocolMethods> = awsProtocolMethods;
