/**
 * AWS traits - re-exports shared traits and adds AWS/Smithy-specific ones.
 *
 * AWS operations use Smithy model traits extensively for:
 * - HTTP bindings (HttpHeader, HttpPayload, HttpLabel, HttpQuery, etc.)
 * - Protocol selection (restJson1, restXml, awsQuery, ec2Query, awsJson)
 * - Streaming and event streams
 * - Endpoint resolution
 * - XML serialization (XmlName, XmlNamespace, XmlFlattened, etc.)
 */
export * from "@distilled.cloud/sdk-core/traits";

import {
  makeAnnotation,
  type Annotation,
} from "@distilled.cloud/sdk-core/traits";

// =============================================================================
// AWS-Specific Trait Symbols
// =============================================================================

export const protocolSymbol = Symbol.for("@distilled.cloud/aws/protocol");
export const httpLabelSymbol = Symbol.for("@distilled.cloud/aws/httpLabel");
export const httpHeaderSymbol = Symbol.for("@distilled.cloud/aws/httpHeader");
export const httpPayloadSymbol = Symbol.for("@distilled.cloud/aws/httpPayload");
export const httpQuerySymbol = Symbol.for("@distilled.cloud/aws/httpQuery");
export const httpPrefixHeadersSymbol = Symbol.for(
  "@distilled.cloud/aws/httpPrefixHeaders",
);
export const xmlNameSymbol = Symbol.for("@distilled.cloud/aws/xmlName");
export const xmlNamespaceSymbol = Symbol.for(
  "@distilled.cloud/aws/xmlNamespace",
);
export const xmlFlattenedSymbol = Symbol.for(
  "@distilled.cloud/aws/xmlFlattened",
);
export const jsonNameSymbol = Symbol.for("@distilled.cloud/aws/jsonName");
export const timestampFormatSymbol = Symbol.for(
  "@distilled.cloud/aws/timestampFormat",
);
export const streamingSymbol = Symbol.for("@distilled.cloud/aws/streaming");
export const eventStreamSymbol = Symbol.for("@distilled.cloud/aws/eventStream");
export const idempotencyTokenSymbol = Symbol.for(
  "@distilled.cloud/aws/idempotencyToken",
);
export const hostPrefixSymbol = Symbol.for("@distilled.cloud/aws/hostPrefix");
export const endpointRulesSymbol = Symbol.for(
  "@distilled.cloud/aws/endpointRules",
);
export const awsApiServiceSymbol = Symbol.for(
  "@distilled.cloud/aws/apiService",
);
export const awsAuthSigv4Symbol = Symbol.for("@distilled.cloud/aws/authSigv4");
export const awsQueryErrorSymbol = Symbol.for(
  "@distilled.cloud/aws/queryError",
);
export const middlewareSymbol = Symbol.for("@distilled.cloud/aws/middleware");
export const checksumSymbol = Symbol.for("@distilled.cloud/aws/checksum");
export const paginationSymbol = Symbol.for("@distilled.cloud/aws/pagination");

// =============================================================================
// AWS Trait Builders
// =============================================================================

export const Protocol = (protocol: string) =>
  makeAnnotation(protocolSymbol, protocol);
export const HttpLabel = () => makeAnnotation(httpLabelSymbol, true);
export const HttpHeader = (name: string) =>
  makeAnnotation(httpHeaderSymbol, name);
export const HttpPayload = () => makeAnnotation(httpPayloadSymbol, true);
export const HttpQuery = (name: string) =>
  makeAnnotation(httpQuerySymbol, name);
export const HttpPrefixHeaders = (prefix: string) =>
  makeAnnotation(httpPrefixHeadersSymbol, prefix);
export const XmlName = (name: string) => makeAnnotation(xmlNameSymbol, name);
export const XmlNamespace = (ns: { uri: string; prefix?: string }) =>
  makeAnnotation(xmlNamespaceSymbol, ns);
export const XmlFlattened = () => makeAnnotation(xmlFlattenedSymbol, true);
export const JsonName = (name: string) => makeAnnotation(jsonNameSymbol, name);
export const TimestampFormat = (format: string) =>
  makeAnnotation(timestampFormatSymbol, format);
export const Streaming = () => makeAnnotation(streamingSymbol, true);
export const EventStream = () => makeAnnotation(eventStreamSymbol, true);
export const IdempotencyToken = () =>
  makeAnnotation(idempotencyTokenSymbol, true);
export const HostPrefix = (prefix: string) =>
  makeAnnotation(hostPrefixSymbol, prefix);

export interface AwsApiServiceTrait {
  sdkId: string;
  arnNamespace?: string;
  cloudFormationName?: string;
  endpointPrefix?: string;
}

export const AwsApiService = (trait: AwsApiServiceTrait) =>
  makeAnnotation(awsApiServiceSymbol, trait);

export interface AwsAuthSigv4Trait {
  name: string;
}

export const AwsAuthSigv4 = (trait: AwsAuthSigv4Trait) =>
  makeAnnotation(awsAuthSigv4Symbol, trait);

export const AwsQueryError = (trait: { code: string }) =>
  makeAnnotation(awsQueryErrorSymbol, trait);

export interface PaginationTrait {
  inputToken: string;
  outputToken: string;
  items?: string;
  pageSize?: string;
}

export const Pagination = (trait: PaginationTrait) =>
  makeAnnotation(paginationSymbol, trait);

// =============================================================================
// AWS Trait Getters
// =============================================================================

import { getAnnotation } from "@distilled.cloud/sdk-core/traits";
import * as AST from "effect/SchemaAST";

export const getProtocol = (ast: AST.AST) =>
  getAnnotation<string>(ast, protocolSymbol);

export const getHttpLabel = (ast: AST.AST) =>
  getAnnotation<boolean>(ast, httpLabelSymbol);

export const getHttpHeader = (ast: AST.AST) =>
  getAnnotation<string>(ast, httpHeaderSymbol);

export const getHttpPayload = (ast: AST.AST) =>
  getAnnotation<boolean>(ast, httpPayloadSymbol);

export const getHttpQuery = (ast: AST.AST) =>
  getAnnotation<string>(ast, httpQuerySymbol);

export const getHttpPrefixHeaders = (ast: AST.AST) =>
  getAnnotation<string>(ast, httpPrefixHeadersSymbol);

export const getXmlName = (ast: AST.AST) =>
  getAnnotation<string>(ast, xmlNameSymbol);

export const getXmlNamespace = (ast: AST.AST) =>
  getAnnotation<{ uri: string; prefix?: string }>(ast, xmlNamespaceSymbol);

export const getXmlFlattened = (ast: AST.AST) =>
  getAnnotation<boolean>(ast, xmlFlattenedSymbol);

export const getJsonName = (ast: AST.AST) =>
  getAnnotation<string>(ast, jsonNameSymbol);

export const getTimestampFormat = (ast: AST.AST) =>
  getAnnotation<string>(ast, timestampFormatSymbol);

export const getStreaming = (ast: AST.AST) =>
  getAnnotation<boolean>(ast, streamingSymbol);

export const getEventStream = (ast: AST.AST) =>
  getAnnotation<boolean>(ast, eventStreamSymbol);

export const getIdempotencyToken = (ast: AST.AST) =>
  getAnnotation<boolean>(ast, idempotencyTokenSymbol);

export const getHostPrefix = (ast: AST.AST) =>
  getAnnotation<string>(ast, hostPrefixSymbol);

export const getAwsApiService = (ast: AST.AST) =>
  getAnnotation<AwsApiServiceTrait>(ast, awsApiServiceSymbol);

export const getAwsAuthSigv4 = (ast: AST.AST) =>
  getAnnotation<AwsAuthSigv4Trait>(ast, awsAuthSigv4Symbol);

export const getAwsQueryError = (ast: AST.AST) =>
  getAnnotation<{ code: string }>(ast, awsQueryErrorSymbol);

export const getMiddleware = (ast: AST.AST) =>
  getAnnotation<any[]>(ast, middlewareSymbol) ?? [];

export const getPagination = (ast: AST.AST) =>
  getAnnotation<PaginationTrait>(ast, paginationSymbol);
