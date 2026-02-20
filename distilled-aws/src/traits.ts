import type * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import * as AST from "effect/SchemaAST";
import * as SchemaTransformation from "effect/SchemaTransformation";
import * as Stream from "effect/Stream";
import type { Protocol } from "./client/protocol.ts";
import type { Request as ProtocolRequest } from "./client/request.ts";
import { applyHttpChecksum } from "./middleware/checksum.ts";
import {
  awsJson1_0Protocol,
  awsJson1_1Protocol,
} from "./protocols/aws-json.ts";
import { awsQueryProtocol } from "./protocols/aws-query.ts";
import { ec2QueryProtocol } from "./protocols/ec2-query.ts";
import { restJson1Protocol } from "./protocols/rest-json.ts";
import { restXmlProtocol } from "./protocols/rest-xml.ts";
import type { RuleSetObject } from "./rules-engine/expression.ts";

/**
 * Internal symbol for annotation metadata storage
 */
const annotationMetaSymbol = "distilled-aws/annotation-meta" as const;

/**
 * Any type that has an .annotate() method returning itself.
 * This includes Schema.Schema and Schema.PropertySignature (from S.optional).
 * We use `any` for the annotations parameter because Effect Schema uses
 * specific annotation types for different schema types.
 */
type Annotatable = {
  annotate(annotations: any): Annotatable;
};

/**
 * An Annotation is a callable that can be used with .pipe() AND
 * has symbol properties so it works directly with S.Class() second argument.
 *
 * The index signatures allow TypeScript to accept this as a valid annotations object.
 */
export interface Annotation {
  <A extends Annotatable>(schema: A): A;
  readonly [annotationMetaSymbol]: Array<{ symbol: string; value: unknown }>;
  // Index signatures for compatibility with Schema.Annotations
  readonly [key: symbol]: unknown;
  readonly [key: string]: unknown;
}

/**
 * Create an annotation builder for a given symbol and value
 */
function makeAnnotation<T>(sym: string, value: T): Annotation {
  const fn = <A extends Annotatable>(schema: A): A =>
    schema.annotate({ [sym]: value }) as A;

  (fn as any)[annotationMetaSymbol] = [{ symbol: sym, value }];
  (fn as any)[sym] = value;

  return fn as Annotation;
}

/**
 * Combine multiple annotations into one.
 * Use with S.Class when you need multiple class-level annotations:
 *
 * @example
 * class Foo extends S.Class<Foo>("Foo")({ ... }, A.all(A.XmlName("Foo"), A.OtherAnnotation())) {}
 */
export function all(...annotations: Annotation[]): Annotation {
  const entries: Array<{ symbol: string; value: unknown }> = [];
  const raw: Record<string, unknown> = {};

  for (const a of annotations) {
    for (const entry of a[annotationMetaSymbol]) {
      entries.push(entry);
      raw[entry.symbol] = entry.value;
    }
  }

  const fn = <A extends Annotatable>(schema: A): A => schema.annotate(raw) as A;

  (fn as any)[annotationMetaSymbol] = entries;

  for (const { symbol, value } of entries) {
    (fn as any)[symbol] = value;
  }

  return fn as Annotation;
}

// =============================================================================
// HTTP Binding Traits (smithy.api#http*)
// =============================================================================

/** smithy.api#httpHeader - Bind member to an HTTP header */
export const httpHeaderSymbol = "distilled-aws/http-header" as const;
export const HttpHeader = (name: string) =>
  makeAnnotation(httpHeaderSymbol, name);

/** smithy.api#httpPayload - Bind member to the HTTP body */
export const httpPayloadSymbol = "distilled-aws/http-payload" as const;
export const HttpPayload = () => makeAnnotation(httpPayloadSymbol, true);

/** smithy.api#httpLabel - Bind member to a URI label (path parameter) */
export const httpLabelSymbol = "distilled-aws/http-label" as const;
/**
 * HttpLabel trait - binds a member to a URI label (path parameter).
 * @param labelName - Optional. The name to use in the URI template. If provided, this name
 *                    is used for path substitution instead of the encoded property name.
 *                    This is needed when the property also has a JsonName that differs
 *                    from the URI template placeholder.
 */
export const HttpLabel = (labelName?: string) =>
  makeAnnotation(httpLabelSymbol, labelName ?? true);

/** smithy.api#httpQuery - Bind member to a query string parameter */
export const httpQuerySymbol = "distilled-aws/http-query" as const;
export const HttpQuery = (name: string) =>
  makeAnnotation(httpQuerySymbol, name);

/** smithy.api#httpQueryParams - Bind map members to query string parameters */
export const httpQueryParamsSymbol = "distilled-aws/http-query-params" as const;
export const HttpQueryParams = () =>
  makeAnnotation(httpQueryParamsSymbol, true);

/** smithy.api#httpPrefixHeaders - Bind map members to prefixed HTTP headers */
export const httpPrefixHeadersSymbol =
  "distilled-aws/http-prefix-headers" as const;
export const HttpPrefixHeaders = (prefix: string) =>
  makeAnnotation(httpPrefixHeadersSymbol, prefix);

/** smithy.api#httpResponseCode - Bind member to the HTTP response status code */
export const httpResponseCodeSymbol =
  "distilled-aws/http-response-code" as const;
export const HttpResponseCode = () =>
  makeAnnotation(httpResponseCodeSymbol, true);

// =============================================================================
// XML Serialization Traits (smithy.api#xml*)
// =============================================================================

/** smithy.api#xmlName - Custom XML element name */
export const xmlNameSymbol = "distilled-aws/xml-name" as const;
export const XmlName = (name: string) => makeAnnotation(xmlNameSymbol, name);

/** smithy.api#xmlFlattened - Flatten list/map (no wrapper element) */
export const xmlFlattenedSymbol = "distilled-aws/xml-flattened" as const;
export const XmlFlattened = () => makeAnnotation(xmlFlattenedSymbol, true);

/** smithy.api#sparse - List/map may contain null values */
export const sparseSymbol = "distilled-aws/sparse" as const;
export const Sparse = () => makeAnnotation(sparseSymbol, true);

/** smithy.api#xmlAttribute - Serialize as XML attribute instead of element */
export const xmlAttributeSymbol = "distilled-aws/xml-attribute" as const;
export const XmlAttribute = () => makeAnnotation(xmlAttributeSymbol, true);

/** smithy.api#xmlNamespace - XML namespace URI for the element */
export const xmlNamespaceSymbol = "distilled-aws/xml-namespace" as const;
export const XmlNamespace = (uri: string) =>
  makeAnnotation(xmlNamespaceSymbol, uri);

// =============================================================================
// JSON Serialization Traits (smithy.api#json*)
// =============================================================================

/** smithy.api#jsonName - Custom JSON key name */
export const jsonNameSymbol = "distilled-aws/json-name" as const;

/** Symbol used to detect PropertySignature types */
const propertySignatureSymbol = "effect/PropertySignature" as const;

/**
 * JsonName trait - uses Effect Schema's fromKey for automatic key renaming.
 *
 * When applied to a PropertySignature (from S.optional), pipes S.fromKey.
 * When applied to a Schema, wraps in S.propertySignature and pipes S.fromKey.
 *
 * This allows Effect Schema's encode/decode to handle key renaming automatically,
 * eliminating the need for manual renameKeys logic in protocols.
 */
export const JsonName = (name: string) => {
  return <A extends Annotatable>(schema: A): A => {
    return schema.annotate({ [jsonNameSymbol]: name }) as A;
  };
};

// =============================================================================
// EC2 Query Protocol Traits (aws.protocols#ec2QueryName)
// =============================================================================

/** aws.protocols#ec2QueryName - Custom query key name for EC2 protocol */
export const ec2QueryNameSymbol =
  "distilled-aws/aws.protocols#ec2QueryName" as const;
export const Ec2QueryName = (name: string) =>
  makeAnnotation(ec2QueryNameSymbol, name);

// =============================================================================
// Timestamp Traits
// =============================================================================

/**
 * DateFromString - String ↔ Date transformation via ISO 8601.
 * Use this instead of bare S.Date when the wire format is a string.
 */
export const DateFromString = S.Date.pipe(
  S.encodeTo(
    S.String,
    SchemaTransformation.transform({
      decode: (s: string) => new Date(s),
      encode: (d: Date) => d.toISOString(),
    }),
  ),
);

/** smithy.api#timestampFormat - Timestamp serialization format */
export const timestampFormatSymbol = "distilled-aws/timestamp-format" as const;
export type TimestampFormatType = "date-time" | "http-date" | "epoch-seconds";

/**
 * TimestampFormat trait - applies both annotation and transform.
 * When piped to S.Date, transforms to the appropriate wire format.
 *
 * - "epoch-seconds": Date ↔ number (Unix timestamp)
 * - "http-date": Date ↔ string (RFC 7231)
 * - "date-time": Date ↔ string (ISO 8601)
 */
export const TimestampFormat = (format: TimestampFormatType) => {
  return <A extends S.Top>(schema: A): A => {
    // Apply the appropriate transform based on format
    const transformed =
      format === "epoch-seconds"
        ? S.Number.pipe(
            S.decodeTo(
              S.Date,
              SchemaTransformation.transform({
                decode: (n) => new Date(n * 1000),
                encode: (d) => d.getTime() / 1000,
              }),
            ),
          )
        : format === "http-date"
          ? S.String.pipe(
              S.decodeTo(
                S.Date,
                SchemaTransformation.transform({
                  decode: (s) => new Date(s),
                  encode: (d) => d.toUTCString(),
                }),
              ),
            )
          : // date-time (ISO 8601) - S.Date already handles this
            schema;

    // Add the annotation
    return transformed.annotate({ [timestampFormatSymbol]: format }) as any;
  };
};

// =============================================================================
// Operation-Level HTTP Trait (smithy.api#http)
// =============================================================================

/** smithy.api#http - HTTP binding for an operation (applied to request schema) */
export const httpSymbol = "distilled-aws/smithy.api#http" as const;
export interface HttpTrait {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
  uri: string;
}
export const Http = (trait: HttpTrait) => makeAnnotation(httpSymbol, trait);

// =============================================================================
// AWS Service Traits (aws.api#*, aws.auth#*)
// =============================================================================

/** aws.api#service - AWS service identification */
export const awsApiServiceSymbol = "distilled-aws/aws.api#service" as const;
export interface AwsApiServiceTrait {
  sdkId: string;
  arnNamespace?: string;
  cloudFormationName?: string;
  cloudTrailEventSource?: string;
  endpointPrefix?: string;
  /** The service shape name from the Smithy model (e.g., "TrentService" for KMS) - used for X-Amz-Target */
  serviceShapeName?: string;
}
export const AwsApiService = (trait: AwsApiServiceTrait) =>
  makeAnnotation(awsApiServiceSymbol, trait);

/** aws.auth#sigv4 - SigV4 authentication configuration */
export const awsAuthSigv4Symbol = "distilled-aws/aws.auth#sigv4" as const;
export interface AwsAuthSigv4Trait {
  name: string;
}
export const AwsAuthSigv4 = (trait: AwsAuthSigv4Trait) =>
  makeAnnotation(awsAuthSigv4Symbol, trait);

// =============================================================================
// AWS Protocol Traits (aws.protocols#*)
// Each protocol annotation embeds its implementation for optimal tree-shaking
// =============================================================================

/** Protocol annotation value - includes trait data and implementation */
export interface ProtocolAnnotationValue {
  protocol: Protocol;
}

/** Common symbol for discovering the protocol from any annotation */
export const protocolSymbol = "distilled-aws/protocol" as const;

/**
 * Helper to create protocol annotations with embedded implementation.
 * Reduces boilerplate by handling the common pattern of:
 * - Creating value with protocol + optional trait data
 * - Setting both protocol-specific and common protocol symbols
 * - Setting up annotationMetaSymbol array
 */
function makeProtocolAnnotation<T extends object = object>(
  sym: string,
  protocol: Protocol,
  trait?: T,
): Annotation {
  const value: ProtocolAnnotationValue & T = {
    ...trait,
    protocol,
  } as ProtocolAnnotationValue & T;

  const fn = <A extends Annotatable>(schema: A): A =>
    schema.annotate({
      [sym]: value,
      [protocolSymbol]: value,
    }) as A;

  (fn as any)[annotationMetaSymbol] = [
    { symbol: sym, value },
    { symbol: protocolSymbol, value },
  ];
  (fn as any)[sym] = value;
  (fn as any)[protocolSymbol] = value;

  return fn as Annotation;
}

/** aws.protocols#restXml */
export const awsProtocolsRestXmlSymbol =
  "distilled-aws/aws.protocols#restXml" as const;
export interface AwsProtocolsRestXmlTrait {
  noErrorWrapping?: boolean;
}
export const AwsProtocolsRestXml = (trait?: AwsProtocolsRestXmlTrait) =>
  makeProtocolAnnotation(awsProtocolsRestXmlSymbol, restXmlProtocol, trait);

/** aws.protocols#restJson1 */
export const awsProtocolsRestJson1Symbol =
  "distilled-aws/aws.protocols#restJson1" as const;
export interface AwsProtocolsRestJson1Trait {
  http?: string[];
  eventStreamHttp?: string[];
}
export const AwsProtocolsRestJson1 = (trait?: AwsProtocolsRestJson1Trait) =>
  makeProtocolAnnotation(awsProtocolsRestJson1Symbol, restJson1Protocol, trait);

/** aws.protocols#awsJson1_0 */
export const awsProtocolsAwsJson1_0Symbol =
  "distilled-aws/aws.protocols#awsJson1_0" as const;
export interface AwsProtocolsAwsJson1_0Trait {
  http?: string[];
  eventStreamHttp?: string[];
}
export const AwsProtocolsAwsJson1_0 = (trait?: AwsProtocolsAwsJson1_0Trait) =>
  makeProtocolAnnotation(
    awsProtocolsAwsJson1_0Symbol,
    awsJson1_0Protocol,
    trait,
  );

/** aws.protocols#awsJson1_1 */
export const awsProtocolsAwsJson1_1Symbol =
  "distilled-aws/aws.protocols#awsJson1_1" as const;
export interface AwsProtocolsAwsJson1_1Trait {
  http?: string[];
  eventStreamHttp?: string[];
}
export const AwsProtocolsAwsJson1_1 = (trait?: AwsProtocolsAwsJson1_1Trait) =>
  makeProtocolAnnotation(
    awsProtocolsAwsJson1_1Symbol,
    awsJson1_1Protocol,
    trait,
  );

/** aws.protocols#awsQuery */
export const awsProtocolsAwsQuerySymbol =
  "distilled-aws/aws.protocols#awsQuery" as const;
export const AwsProtocolsAwsQuery = () =>
  makeProtocolAnnotation(awsProtocolsAwsQuerySymbol, awsQueryProtocol);

/** aws.protocols#ec2Query */
export const awsProtocolsEc2QuerySymbol =
  "distilled-aws/aws.protocols#ec2Query" as const;
export const AwsProtocolsEc2Query = () =>
  makeProtocolAnnotation(awsProtocolsEc2QuerySymbol, ec2QueryProtocol);

/** Middleware function type - applied to requests */
export type MiddlewareFn = (
  schema: S.Top,
  request: ProtocolRequest,
) => Effect.Effect<ProtocolRequest>;

/** Middleware annotation value - includes trait data and implementation */
export interface MiddlewareAnnotationValue {
  middleware: MiddlewareFn;
}

/** Common symbol for discovering middleware from annotations */
export const middlewareSymbol = "distilled-aws/middleware" as const;

/** aws.protocols#httpChecksum - HTTP checksum configuration with embedded middleware */
export const awsProtocolsHttpChecksumSymbol =
  "distilled-aws/aws.protocols#httpChecksum" as const;
export interface AwsProtocolsHttpChecksumTrait {
  requestAlgorithmMember?: string;
  requestChecksumRequired?: boolean;
  responseAlgorithms?: string[];
}
export const AwsProtocolsHttpChecksum = (
  trait: AwsProtocolsHttpChecksumTrait,
) => {
  const value: MiddlewareAnnotationValue & AwsProtocolsHttpChecksumTrait = {
    ...trait,
    middleware: applyHttpChecksum,
  };
  // Create annotation with both checksum-specific symbol and common middleware symbol
  const fn = <A extends Annotatable>(schema: A): A =>
    schema.annotate({
      [awsProtocolsHttpChecksumSymbol]: value,
      [middlewareSymbol]: [...(getMiddlewareList(schema) || []), value],
    }) as A;
  (fn as any)[annotationMetaSymbol] = [
    { symbol: awsProtocolsHttpChecksumSymbol, value },
    { symbol: middlewareSymbol, value },
  ];
  (fn as any)[awsProtocolsHttpChecksumSymbol] = value;
  (fn as any)[middlewareSymbol] = value;
  return fn as Annotation;
};

/** Helper to get existing middleware list from a schema */
function getMiddlewareList(
  schema: Annotatable,
): MiddlewareAnnotationValue[] | undefined {
  // @ts-expect-error - accessing internal annotations
  return schema?.ast?.annotations?.[middlewareSymbol];
}

// =============================================================================
// Service Version (property on service shapes, not a Smithy trait)
// =============================================================================

/** Service API version (from service shape's version property) */
export const serviceVersionSymbol = "distilled-aws/service-version" as const;
export const ServiceVersion = (version: string) =>
  makeAnnotation(serviceVersionSymbol, version);

// =============================================================================
// Endpoint Routing Traits (smithy.rules#*)
// =============================================================================

/** smithy.rules#endpointRuleSet - Endpoint resolution rule set (legacy JSON) */
export const endpointRuleSetSymbol =
  "distilled-aws/smithy.rules#endpointRuleSet" as const;
export const EndpointRuleSet = (ruleSet: unknown) =>
  makeAnnotation(endpointRuleSetSymbol, ruleSet);

/** Endpoint resolver result type */
export type EndpointResolverResult =
  | {
      type: "endpoint";
      endpoint: {
        url: string;
        properties: Record<string, unknown>;
        headers: Record<string, string[]>;
      };
    }
  | { type: "error"; message: string };

/** Runtime helpers for endpoint resolution */
export interface EndpointResolverHelpers {
  partition: (region: unknown) => unknown;
  parseArn: (value: unknown) => unknown;
  isVirtualHostableS3Bucket: (
    value: unknown,
    allowSubDomains?: unknown,
  ) => boolean;
  parseURL: (url: unknown) => unknown;
  substring: (
    input: unknown,
    start: unknown,
    stop: unknown,
    reverse: unknown,
  ) => unknown;
  uriEncode: (value: unknown) => unknown;
  isValidHostLabel: (value: unknown, allowSubDomains: unknown) => boolean;
  getAttr: (value: unknown, path: string) => unknown;
  resolveTemplates: <T>(value: T) => T;
}

/** Endpoint resolver function type */
export type EndpointResolverFn = (
  params: Record<string, unknown>,
  helpers: EndpointResolverHelpers,
) => EndpointResolverResult;

/** Endpoint resolver - compiled function for endpoint resolution */
export const endpointResolverSymbol =
  "distilled-aws/endpoint-resolver" as const;
export const EndpointResolver = (resolver: EndpointResolverFn) =>
  makeAnnotation(endpointResolverSymbol, resolver);

/** smithy.rules#clientContextParams - Client-level endpoint parameters */
export const clientContextParamsSymbol =
  "distilled-aws/smithy.rules#clientContextParams" as const;
export interface ClientContextParamDefinition {
  type: string;
  documentation?: string;
}
export const ClientContextParams = (
  params: Record<string, ClientContextParamDefinition>,
) => makeAnnotation(clientContextParamsSymbol, params);

/** smithy.rules#contextParam - Endpoint routing context parameter */
export const contextParamSymbol = "distilled-aws/context-param" as const;
export const ContextParam = (name: string) =>
  makeAnnotation(contextParamSymbol, name);

/** smithy.rules#staticContextParams - Static endpoint parameters for an operation */
export const staticContextParamsSymbol =
  "distilled-aws/smithy.rules#staticContextParams" as const;
export type StaticContextParamsDefinition = Record<string, { value: unknown }>;
export const StaticContextParams = (params: StaticContextParamsDefinition) =>
  makeAnnotation(staticContextParamsSymbol, params);

/** smithy.api#hostLabel - Bind member to a label in the endpoint hostPrefix */
export const hostLabelSymbol = "distilled-aws/host-label" as const;
export const HostLabel = () => makeAnnotation(hostLabelSymbol, true);

/** smithy.api#httpError - Custom HTTP status code for error responses */
export const httpErrorSymbol = "distilled-aws/http-error" as const;
export const HttpError = (statusCode: number) =>
  makeAnnotation(httpErrorSymbol, statusCode);

/** smithy.api#retryable - Indicates that an error MAY be retried by the client */
export const retryableSymbol = "distilled-aws/retryable" as const;
export interface RetryableTrait {
  throttling?: boolean;
}
export const Retryable = (trait?: RetryableTrait) =>
  makeAnnotation(retryableSymbol, trait ?? {});

/** smithy.api#httpChecksumRequired - Indicates operation requires Content-MD5 checksum */
export const httpChecksumRequiredSymbol =
  "distilled-aws/http-checksum-required" as const;
export const HttpChecksumRequired = () =>
  makeAnnotation(httpChecksumRequiredSymbol, true);

/** aws.protocols#awsQueryError - Custom error Code and HTTP response code for awsQuery protocol */
export const awsQueryErrorSymbol =
  "distilled-aws/aws.protocols#awsQueryError" as const;
export interface AwsQueryErrorTrait {
  code: string;
  httpResponseCode: number;
}
export const AwsQueryError = (trait: AwsQueryErrorTrait) =>
  makeAnnotation(awsQueryErrorSymbol, trait);

/** aws.customizations#s3UnwrappedXmlOutput - S3 output not wrapped in operation-level XML node */
export const s3UnwrappedXmlOutputSymbol =
  "distilled-aws/aws.customizations#s3UnwrappedXmlOutput" as const;
export const S3UnwrappedXmlOutput = () =>
  makeAnnotation(s3UnwrappedXmlOutputSymbol, true);

// =============================================================================
// Idempotency Token Trait (smithy.api#idempotencyToken)
// =============================================================================

/**
 * smithy.api#idempotencyToken - Marks a member as an idempotency token.
 * When set, the SDK will automatically generate a UUID if the value is not provided.
 */
export const idempotencyTokenSymbol =
  "distilled-aws/idempotency-token" as const;
export const IdempotencyToken = () =>
  makeAnnotation(idempotencyTokenSymbol, true);

/** Check if a PropertySignature has the idempotencyToken annotation */
export const hasIdempotencyToken = (prop: AST.PropertySignature): boolean =>
  hasPropAnnotation(prop, idempotencyTokenSymbol);

/** Check if an AST has the idempotencyToken annotation */
export const isIdempotencyToken = (ast: AST.AST): boolean =>
  hasAnnotation(ast, idempotencyTokenSymbol);

// =============================================================================
// Blob Type (smithy.api#blob without @streaming)
// =============================================================================

/**
 * Smithy blob type - binary data that encodes to base64 on the wire.
 * Used for non-streaming blobs in request/response bodies.
 *
 * For streaming blobs (@httpPayload with @streaming), use StreamingInput/StreamingOutput.
 */

export const Blob = S.String.pipe(
  S.decodeTo(
    // wire format: base64 string
    S.instanceOf(Uint8Array<ArrayBufferLike>), // internal: Uint8Array (accepts Buffer too)
    SchemaTransformation.transform({
      decode: (s) =>
        Uint8Array.from(atob(s), (c) =>
          c.charCodeAt(0),
        ) as any as Uint8Array<ArrayBufferLike>,
      encode: (u) => btoa(String.fromCharCode(...u)),
    }),
  ),
).annotate({ identifier: "Blob" });

// =============================================================================
// Streaming Body (smithy.api#blob + smithy.api#streaming)
// =============================================================================

/** smithy.api#streaming - Marks a type as streaming/blob (raw body, not serialized) */
export const streamingSymbol = "distilled-aws/streaming" as const;

/**
 * Streaming trait - behavior depends on what it's applied to:
 * - On a blob: marks it as a streaming body (raw bytes)
 * - On a union: transforms it into a Stream of those event types
 *
 * For unions (event streams), the output schema type is Stream.Stream<EventType>.
 */
export const Streaming: {
  // Overload for union schemas - returns Stream type
  <A>(
    schema: S.Schema<A> & { ast: { _tag: "Union" } },
  ): S.Schema<Stream.Stream<A, Error, never>>;
  // Overload for other schemas - preserves type with annotation
  <A>(schema: S.Schema<A>): S.Schema<A>;
  // Overload for pipe() usage - returns a function
  (): <A>(
    schema: S.Schema<A>,
  ) => S.Schema<Stream.Stream<A, Error, never>> | S.Schema<A>;
} = (<A>(schema?: S.Schema<A>) => {
  if (schema) {
    // Direct call with schema argument
    const ast = schema.ast;
    if (ast._tag === "Union") {
      // For unions, return a Stream type declaration
      return S.declare((u): u is Stream.Stream<A, Error, never> =>
        isEffectStream(u),
      ).annotate({
        [streamingSymbol]: true,
        identifier: "StreamingUnion",
        eventSchema: schema,
      });
    }
    // For non-unions, just add the annotation
    return schema.annotate({ [streamingSymbol]: true });
  }

  // Called as annotation factory (for .pipe())
  return <B>(s: S.Schema<B>) => {
    const ast = s.ast;
    if (ast._tag === "Union") {
      return S.declare((u): u is Stream.Stream<B, Error, never> =>
        isEffectStream(u),
      ).annotate({
        [streamingSymbol]: true,
        identifier: "StreamingUnion",
        eventSchema: s,
      });
    }
    return s.annotate({ [streamingSymbol]: true });
  };
}) as any;

/** Check if an AST represents a streaming/blob type */
export const isStreamingType = (ast: AST.AST): boolean => {
  // Check direct annotation
  if (ast.annotations?.[streamingSymbol]) return true;

  // For Union types, check if any member has the annotation
  if (ast._tag === "Union") {
    return (ast as AST.Union).types.some((t) => isStreamingType(t));
  }

  return false;
};

// =============================================================================
// Requires Length Trait (smithy.api#requiresLength)
// =============================================================================

/**
 * smithy.api#requiresLength - Indicates that the streaming blob MUST be finite
 * and have a known size when sending data from a client to a server.
 *
 * In HTTP-based protocols, this means Content-Length header MUST be sent.
 * Note: While Smithy suggests chunked encoding is possible without this trait,
 * many AWS services (including S3) don't support it. We buffer all streaming
 * bodies when Content-Length is not provided.
 */
export const requiresLengthSymbol = "distilled-aws/requires-length" as const;
export const RequiresLength = () => makeAnnotation(requiresLengthSymbol, true);

/** Check if an AST has the requiresLength trait */
export const hasRequiresLength = (ast: AST.AST): boolean =>
  hasAnnotation(ast, requiresLengthSymbol);

/**
 * Streaming input body - accepts multiple source types.
 * The protocol converts these to the appropriate format for fetch.
 *
 * Used for @httpPayload members with @streaming trait (e.g., S3 PutObject Body).
 *
 * Note: We use Uint8Array<ArrayBufferLike> instead of Uint8Array<ArrayBuffer>
 * to accept Node.js Buffer which extends Uint8Array<ArrayBufferLike>.
 */
export type StreamingInputBody =
  | string
  | Uint8Array<ArrayBufferLike>
  | ArrayBuffer
  | globalThis.Blob
  | ReadableStream<Uint8Array<ArrayBufferLike>>
  | Stream.Stream<Uint8Array<ArrayBufferLike>, unknown, unknown>;

/**
 * Schema for streaming input bodies.
 * Validates that the input is one of the accepted streaming types.
 */
export const StreamingInput = S.declare(
  (u): u is StreamingInputBody =>
    typeof u === "string" ||
    ArrayBuffer.isView(u) || // Accepts Uint8Array, Buffer, and other TypedArrays
    u instanceof ArrayBuffer ||
    (typeof globalThis.Blob !== "undefined" && u instanceof globalThis.Blob) ||
    u instanceof ReadableStream ||
    isEffectStream(u),
).annotate({
  [streamingSymbol]: true,
  identifier: "StreamingInput",
  jsonSchema: { type: "string" },
});

/**
 * Streaming output body - always Effect Stream for composability.
 * Provides lazy, backpressure-aware consumption of response data.
 *
 * Used for @httpPayload members with @streaming trait (e.g., S3 GetObject Body).
 */

export const StreamingOutput = S.declare(
  (u): u is Stream.Stream<Uint8Array<ArrayBufferLike>, Error, never> =>
    isEffectStream(u),
).annotate({
  [streamingSymbol]: true,
  identifier: "StreamingOutput",
  jsonSchema: { type: "string" },
});

/**
 * Type alias for streaming output bodies.
 * Used in generated interfaces for @httpPayload members with @streaming trait.
 */
export type StreamingOutputBody = Stream.Stream<
  Uint8Array<ArrayBufferLike>,
  Error,
  never
>;

/**
 * Check if a value is an Effect Stream.
 * Uses duck typing since Stream doesn't have a built-in type guard.
 */
function isEffectStream(
  u: unknown,
): u is Stream.Stream<unknown, unknown, unknown> {
  return (
    u !== null &&
    typeof u === "object" &&
    "~effect/Stream" in Object.getPrototypeOf(u as object)
  );
}

/** Legacy StreamBody type - kept for backwards compatibility */
export type StreamBody = string | Uint8Array<ArrayBufferLike> | ReadableStream;
export const StreamBody = () =>
  S.Union([
    S.String,
    S.instanceOf(Uint8Array<ArrayBufferLike>),
    S.instanceOf(ReadableStream),
  ]).annotate({
    [streamingSymbol]: true,
  });

// =============================================================================
// Event Stream Traits (smithy.api#eventHeader, smithy.api#eventPayload)
// =============================================================================

/** smithy.api#eventHeader - Bind member to an event stream header */
export const eventHeaderSymbol = "distilled-aws/event-header" as const;
export const EventHeader = () => makeAnnotation(eventHeaderSymbol, true);

/** smithy.api#eventPayload - Bind member to the event payload */
export const eventPayloadSymbol = "distilled-aws/event-payload" as const;
export const EventPayload = () => makeAnnotation(eventPayloadSymbol, true);

/**
 * Event stream schema helper - wraps a union schema into a Stream type.
 * Used for @streaming unions in generated code (output event streams).
 *
 * This creates a schema where the TypeScript type is Stream<EventType>
 * but at runtime it validates that the value is an Effect Stream.
 */
export const EventStream = <A>(
  eventSchema: S.Schema<A>,
): S.Schema<Stream.Stream<A, Error, never>> =>
  S.declare((u): u is Stream.Stream<A, Error, never> =>
    isEffectStream(u),
  ).annotate({
    [streamingSymbol]: true,
    identifier: "EventStream",
    eventSchema,
  });

/** Symbol to identify input event streams (request direction) */
export const inputEventStreamSymbol =
  "distilled-aws/input-event-stream" as const;

/**
 * Input event stream schema helper - wraps a union schema into a Stream type for request bodies.
 * Used for @streaming unions in input structures (bi-directional streaming).
 *
 * This is different from EventStream (output) because:
 * - The user provides a Stream of typed events
 * - We need to serialize them to event stream wire format
 *
 * @param eventSchema - The underlying union schema for the event types
 * @param eventPayloadMap - Optional map of event type names to their @eventPayload member names
 */
export const InputEventStream = <A>(
  eventSchema: S.Schema<A>,
  eventPayloadMap?: Record<string, string>,
): S.Schema<Stream.Stream<A, Error, never>> =>
  S.declare((u): u is Stream.Stream<A, Error, never> =>
    isEffectStream(u),
  ).annotate({
    [streamingSymbol]: true,
    [inputEventStreamSymbol]: true,
    identifier: "InputEventStream",
    eventSchema,
    eventPayloadMap,
  });

/**
 * Check if an AST represents an input event stream (streaming union for requests).
 */
export const isInputEventStream = (ast: AST.AST): boolean => {
  if (ast.annotations?.[inputEventStreamSymbol]) return true;
  return false;
};

/**
 * Check if an AST represents an output event stream (streaming union for responses).
 * An output event stream has the "EventStream" identifier but NOT the inputEventStreamSymbol.
 * Also handles S.optional() wrapping (Union with UndefinedKeyword).
 */
export const isOutputEventStream = (ast: AST.AST): boolean => {
  // Direct check
  if (ast.annotations?.identifier === "EventStream") return true;
  if (ast.annotations?.identifier === "InputEventStream") return false;

  // Check if it's a streaming type with an eventSchema annotation
  if (
    ast.annotations?.[streamingSymbol] &&
    ast.annotations?.eventSchema &&
    !ast.annotations?.[inputEventStreamSymbol]
  ) {
    return true;
  }

  // Handle S.optional() wrapping - check union members
  if (ast._tag === "Union") {
    for (const member of ast.types) {
      if (member._tag === "Undefined") continue;
      if (isOutputEventStream(member)) return true;
    }
  }

  return false;
};

/**
 * Get the event schema from an event stream AST (input or output).
 * Also handles S.optional() wrapping (Union with UndefinedKeyword).
 */
export const getEventSchema = (ast: AST.AST): S.Schema<unknown> | undefined => {
  // Direct check
  if (ast.annotations?.eventSchema) {
    return ast.annotations.eventSchema as S.Schema<unknown>;
  }

  // Handle S.optional() wrapping - check union members
  if (ast._tag === "Union") {
    for (const member of ast.types) {
      if (member._tag === "Undefined") continue;
      const schema = getEventSchema(member);
      if (schema) return schema;
    }
  }

  return undefined;
};

/**
 * Get the event payload map from an input event stream AST.
 */
export const getEventPayloadMap = (
  ast: AST.AST,
): Record<string, string> | undefined => {
  return ast.annotations?.eventPayloadMap as Record<string, string> | undefined;
};

// =============================================================================
// Annotation Retrieval Helpers
// =============================================================================

/**
 * Get a single annotation from an AST node
 */
export const getAnnotation = <T>(
  ast: AST.AST,
  symbol: string,
): T | undefined => {
  return ast.annotations?.[symbol] as T | undefined;
};

/**
 * Get annotation from a PropertySignature.
 * PropertySignatures from S.Class have annotations on prop.annotate, not prop.type.annotations.
 */
export const getPropAnnotation = <T>(
  prop: AST.PropertySignature,
  symbol: string,
): T | undefined => {
  // First check the PropertySignature itself (for annotations piped onto S.optional)
  // @ts-expect-error
  const propAnnot = prop.annotations?.[symbol] as T | undefined;
  if (propAnnot !== undefined) return propAnnot;

  // Fall back to checking prop.type (for annotations on the schema before S.optional)
  return getAnnotationUnwrap(prop.type, symbol);
};

/**
 * Check if a PropertySignature has a specific annotation
 */
export const hasPropAnnotation = (
  prop: AST.PropertySignature,
  symbol: string,
): boolean => {
  // @ts-expect-error
  if (prop.annotations?.[symbol] !== undefined) return true;
  return hasAnnotation(prop.type, symbol);
};

/**
 * Get all HTTP binding annotations from a PropertySignature.
 * Checks prop.annotate first (for annotations piped onto S.optional),
 * then falls back to prop.type annotations.
 * Used by request-builder.ts and response-parser.ts
 */
export const getPropAnnotations = (prop: AST.PropertySignature) => {
  return {
    header: getPropAnnotation<string>(prop, httpHeaderSymbol),
    payload: getPropAnnotation<boolean>(prop, httpPayloadSymbol),
    label: getPropAnnotation<boolean>(prop, httpLabelSymbol),
    query: getPropAnnotation<string>(prop, httpQuerySymbol),
    queryParams: getPropAnnotation<boolean>(prop, httpQueryParamsSymbol),
    prefixHeaders: getPropAnnotation<string>(prop, httpPrefixHeadersSymbol),
    responseCode: getPropAnnotation<boolean>(prop, httpResponseCodeSymbol),
    xmlName: getPropAnnotation<string>(prop, xmlNameSymbol),
  };
};

/**
 * Legacy helper: Get all annotations from an AST node as Options
 * @deprecated Use getPropAnnotations for PropertySignatures
 */
export const getAnnotations = (schema: AST.AST) => {
  const header = schema.annotations?.[httpHeaderSymbol] as string | undefined;
  const body = schema.annotations?.[httpPayloadSymbol] as string | undefined;
  const streamBody = schema.annotations?.[httpPayloadSymbol] as
    | boolean
    | undefined;
  const path = schema.annotations?.[contextParamSymbol] as string | undefined;
  const xmlName = schema.annotations?.[xmlNameSymbol] as string | undefined;

  return {
    header,
    body,
    streamBody,
    path,
    xmlName,
  };
};

// Legacy alias for httpPayloadSymbol (used by xml.ts)
export const requestBodySymbol = httpPayloadSymbol;

/**
 * Check if an AST has a body annotation (httpPayload - raw body content)
 * Handles nested cases like S.optional(A.HttpPayload(...)) by unwrapping Union types
 */
export const hasBodyAnnotation = (ast: AST.AST): boolean => {
  return hasAnnotation(ast, httpPayloadSymbol);
};

/**
 * Get the xmlName annotation from an AST node, checking various locations
 * where the annotation might be stored (direct, transformation, union unwrap)
 */
export const getXmlName = (ast: AST.AST): string | undefined => {
  return getAnnotationUnwrap(ast, xmlNameSymbol);
};

/**
 * Check if an AST has a specific annotation, handling Union/Transformation/Suspend unwrapping
 */
export const hasAnnotation = (ast: AST.AST, symbol: string): boolean => {
  if (ast.annotations?.[symbol] !== undefined) return true;

  if (ast._tag === "Suspend") {
    return hasAnnotation(ast.thunk(), symbol);
  }

  if (ast._tag === "Union") {
    const nonNullishTypes = ast.types.filter(
      (t: AST.AST) =>
        t._tag !== "Undefined" && !(t._tag === "Literal" && t.literal === null),
    );
    return nonNullishTypes.some((t: AST.AST) => hasAnnotation(t, symbol));
  }

  // For Declaration (S.Class), check encoding chain
  if (ast._tag === "Declaration" && ast.encoding?.length) {
    if (ast.encoding[0].to?.annotations?.[symbol] !== undefined) return true;
  }

  // Follow encoding chain for transformed types
  if (ast.encoding && ast.encoding.length > 0) {
    return hasAnnotation(ast.encoding[0].to, symbol);
  }

  return false;
};

/**
 * Get annotation value, unwrapping Union/Transformation/Suspend if needed
 */
export const getAnnotationUnwrap = <T>(
  ast: AST.AST,
  symbol: string,
): T | undefined => {
  const direct = ast.annotations?.[symbol] as T | undefined;
  if (direct !== undefined) return direct;

  if (ast._tag === "Suspend") {
    return getAnnotationUnwrap(ast.thunk(), symbol);
  }

  // For Declaration (S.Class), check encoding chain
  if (ast._tag === "Declaration" && ast.encoding?.length) {
    const toValue = ast.encoding[0].to?.annotations?.[symbol] as T | undefined;
    if (toValue !== undefined) return toValue;
  }

  // Follow encoding chain for transformed types
  if (ast.encoding && ast.encoding.length > 0) {
    const encValue = getAnnotationUnwrap<T>(ast.encoding[0].to, symbol);
    if (encValue !== undefined) return encValue;
  }

  if (ast._tag === "Union") {
    const nonNullishTypes = ast.types.filter(
      (t) =>
        t._tag !== "Undefined" && !(t._tag === "Literal" && t.literal === null),
    );
    if (nonNullishTypes.length === 1) {
      return getAnnotationUnwrap(nonNullishTypes[0], symbol);
    }
  }

  return undefined;
};

// =============================================================================
// Property Annotation Helpers (for use by protocols)
// =============================================================================

/** Get httpHeader annotation value from property */
export const getHttpHeader = (
  prop: AST.PropertySignature,
): string | undefined => getPropAnnotation<string>(prop, httpHeaderSymbol);

/** Check if property has httpLabel annotation */
export const hasHttpLabel = (prop: AST.PropertySignature): boolean =>
  hasPropAnnotation(prop, httpLabelSymbol);

/**
 * Get the httpLabel name from a property, if specified.
 * Returns the explicit label name if set, or undefined if just `true`.
 */
export const getHttpLabelName = (
  prop: AST.PropertySignature,
): string | undefined => {
  const value = getPropAnnotation<string | boolean>(prop, httpLabelSymbol);
  return typeof value === "string" ? value : undefined;
};

/** Get httpQuery annotation value from property */
export const getHttpQuery = (prop: AST.PropertySignature): string | undefined =>
  getPropAnnotation<string>(prop, httpQuerySymbol);

/** Check if property has httpQueryParams annotation */
export const hasHttpQueryParams = (prop: AST.PropertySignature): boolean =>
  hasPropAnnotation(prop, httpQueryParamsSymbol);

/** Get httpPrefixHeaders annotation value from property */
export const getHttpPrefixHeaders = (
  prop: AST.PropertySignature,
): string | undefined =>
  getPropAnnotation<string>(prop, httpPrefixHeadersSymbol);

/** Check if property has httpPayload annotation */
export const hasHttpPayload = (prop: AST.PropertySignature): boolean =>
  hasPropAnnotation(prop, httpPayloadSymbol);

/** Check if property has xmlAttribute annotation */
export const hasXmlAttribute = (prop: AST.PropertySignature): boolean =>
  hasPropAnnotation(prop, xmlAttributeSymbol);

/** Get xmlName annotation value from property */
export const getXmlNameProp = (
  prop: AST.PropertySignature,
): string | undefined => getPropAnnotation<string>(prop, xmlNameSymbol);

/** Check if property has xmlFlattened annotation */
export const hasXmlFlattened = (prop: AST.PropertySignature): boolean =>
  hasPropAnnotation(prop, xmlFlattenedSymbol);

/** Check if property has sparse annotation */
export const hasSparse = (prop: AST.PropertySignature): boolean =>
  hasPropAnnotation(prop, sparseSymbol);

/** Check if an AST has the sparse annotation */
export const isSparse = (ast: AST.AST): boolean =>
  hasAnnotation(ast, sparseSymbol);

/** Get ec2QueryName annotation value from property */
export const getEc2QueryName = (
  prop: AST.PropertySignature,
): string | undefined => getPropAnnotation<string>(prop, ec2QueryNameSymbol);

// =============================================================================
// Operation/Service-Level Annotation Helpers (for extracting from request schemas)
// =============================================================================

/** Get smithy.api#http trait from a schema */
export const getHttpTrait = (ast: AST.AST): HttpTrait | undefined =>
  getAnnotationUnwrap<HttpTrait>(ast, httpSymbol);

/** Get aws.api#service trait from a schema */
export const getAwsApiService = (
  ast: AST.AST,
): AwsApiServiceTrait | undefined =>
  getAnnotationUnwrap<AwsApiServiceTrait>(ast, awsApiServiceSymbol);

/** Get aws.auth#sigv4 trait from a schema */
export const getAwsAuthSigv4 = (ast: AST.AST): AwsAuthSigv4Trait | undefined =>
  getAnnotationUnwrap<AwsAuthSigv4Trait>(ast, awsAuthSigv4Symbol);

/** Get service version from a schema */
export const getServiceVersion = (ast: AST.AST): string | undefined =>
  getAnnotationUnwrap<string>(ast, serviceVersionSymbol);

/** Check if schema has aws.protocols#restXml trait */
export const hasRestXmlProtocol = (ast: AST.AST): boolean =>
  hasAnnotation(ast, awsProtocolsRestXmlSymbol);

/** Check if schema has aws.protocols#restJson1 trait */
export const hasRestJson1Protocol = (ast: AST.AST): boolean =>
  hasAnnotation(ast, awsProtocolsRestJson1Symbol);

/** Check if schema has aws.protocols#awsJson1_0 trait */
export const hasAwsJson1_0Protocol = (ast: AST.AST): boolean =>
  hasAnnotation(ast, awsProtocolsAwsJson1_0Symbol);

/** Check if schema has aws.protocols#awsJson1_1 trait */
export const hasAwsJson1_1Protocol = (ast: AST.AST): boolean =>
  hasAnnotation(ast, awsProtocolsAwsJson1_1Symbol);

/** Check if schema has aws.protocols#awsQuery trait */
export const hasAwsQueryProtocol = (ast: AST.AST): boolean =>
  hasAnnotation(ast, awsProtocolsAwsQuerySymbol);

/** Check if schema has aws.protocols#ec2Query trait */
export const hasEc2QueryProtocol = (ast: AST.AST): boolean =>
  hasAnnotation(ast, awsProtocolsEc2QuerySymbol);

/** Get aws.protocols#httpChecksum trait from a schema */
export const getAwsProtocolsHttpChecksum = (
  ast: AST.AST,
): AwsProtocolsHttpChecksumTrait | undefined =>
  getAnnotationUnwrap<AwsProtocolsHttpChecksumTrait>(
    ast,
    awsProtocolsHttpChecksumSymbol,
  );

/** Check if schema has smithy.api#httpChecksumRequired trait */
export const hasHttpChecksumRequired = (ast: AST.AST): boolean =>
  hasAnnotation(ast, httpChecksumRequiredSymbol);

/** Get aws.protocols#awsQueryError trait from a schema (for error shapes) */
export const getAwsQueryError = (
  ast: AST.AST,
): AwsQueryErrorTrait | undefined =>
  getAnnotationUnwrap<AwsQueryErrorTrait>(ast, awsQueryErrorSymbol);

/** Get timestampFormat annotation value from property */
export const getTimestampFormat = (
  prop: AST.PropertySignature,
): TimestampFormatType | undefined =>
  getPropAnnotation<TimestampFormatType>(prop, timestampFormatSymbol);

/** Get timestampFormat annotation value from AST */
export const getTimestampFormatFromAST = (
  ast: AST.AST,
): TimestampFormatType | undefined =>
  getAnnotationUnwrap<TimestampFormatType>(ast, timestampFormatSymbol);

/** Check if schema has aws.customizations#s3UnwrappedXmlOutput trait */
export const hasS3UnwrappedXmlOutput = (ast: AST.AST): boolean =>
  hasAnnotation(ast, s3UnwrappedXmlOutputSymbol);

/** Get smithy.rules#endpointRuleSet trait from a schema */
export const getEndpointRuleSet = (ast: AST.AST) =>
  getAnnotationUnwrap<RuleSetObject>(ast, endpointRuleSetSymbol);

/** Get endpoint resolver from a schema */
export const getEndpointResolver = (ast: AST.AST) =>
  getAnnotationUnwrap<EndpointResolverFn>(ast, endpointResolverSymbol);

/** Get smithy.rules#clientContextParams trait from a schema */
export const getClientContextParams = (
  ast: AST.AST,
): Record<string, ClientContextParamDefinition> | undefined =>
  getAnnotationUnwrap<Record<string, ClientContextParamDefinition>>(
    ast,
    clientContextParamsSymbol,
  );

/** Get smithy.rules#contextParam annotation value from property */
export const getContextParam = (
  prop: AST.PropertySignature,
): string | undefined => getPropAnnotation<string>(prop, contextParamSymbol);

/** Get smithy.rules#staticContextParams trait from a schema */
export const getStaticContextParams = (
  ast: AST.AST,
): StaticContextParamsDefinition | undefined =>
  getAnnotationUnwrap<StaticContextParamsDefinition>(
    ast,
    staticContextParamsSymbol,
  );

// =============================================================================
// Protocol and Middleware Discovery (for use by api.ts)
// =============================================================================

/** Get the protocol implementation from a schema's annotations */
export const getProtocol = (ast: AST.AST): Protocol | undefined => {
  const value = getAnnotationUnwrap<ProtocolAnnotationValue>(
    ast,
    protocolSymbol,
  );
  return value?.protocol;
};

/** Get all middleware implementations from a schema's annotations */
export const getMiddleware = (ast: AST.AST): MiddlewareFn[] => {
  const value = getAnnotationUnwrap<
    MiddlewareAnnotationValue | MiddlewareAnnotationValue[]
  >(ast, middlewareSymbol);
  if (!value) {
    return [];
  }
  // Check if it's an array
  if (Array.isArray(value)) {
    return value.map((m) => m.middleware);
  }
  // Single middleware value
  return [value.middleware];
};

// =============================================================================
// Pagination Trait (smithy.api#paginated)
// =============================================================================

/**
 * Pagination trait metadata for operations that support pagination.
 * This is operation-level metadata, not a schema annotation.
 */
export interface PaginatedTrait {
  /** The name of the input member containing the continuation token */
  inputToken: string;
  /** The path to the output member containing the next continuation token */
  outputToken: string;
  /** The path to the output member containing the paginated items */
  items?: string;
  /** The name of the input member that limits page size */
  pageSize?: string;
}

/**
 * Helper to get a value from an object using a dot-separated path.
 * Used for pagination traits where outputToken and items can be paths.
 */
export const getPath = (obj: unknown, path: string): unknown => {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
};
