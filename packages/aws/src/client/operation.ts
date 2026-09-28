import type { AnyErrorClass } from "@distilled.cloud/core/error-class";
import type { PaginatedTrait } from "@distilled.cloud/core/pagination";
import type { Struct } from "@distilled.cloud/core/shape";
import type { EndpointResolverFn } from "../rules-engine/resolver-types.ts";
import type { Protocol } from "./protocol.ts";

/** aws.protocols#httpChecksum */
export interface HttpChecksumTrait {
  readonly requestAlgorithmMember?: string;
  readonly requestChecksumRequired?: boolean;
  readonly responseAlgorithms?: readonly string[];
}

/** Service-wide facts, emitted once per generated service module. */
export interface ServiceInfo {
  readonly sdkId: string;
  /** The Smithy service shape name (awsJson `X-Amz-Target` prefix). */
  readonly target: string;
  readonly version: string;
  /** SigV4 signing name. */
  readonly sigv4?: string;
  /** Legacy SigV2 signing name (SimpleDB). */
  readonly sigv2?: string;
  /** The wire protocol implementation. */
  readonly protocol: Protocol;
  /** Service XML namespace (restXml / awsQuery). */
  readonly xmlns?: string;
  /** Compiled Smithy endpoint rules. */
  readonly rules?: EndpointResolverFn;
}

/**
 * What an operation's protocol needs at runtime. Built lazily on the first
 * call; see `@distilled.cloud/core/shape` for the member vocabulary.
 */
export interface OperationDescriptor {
  readonly service: ServiceInfo;
  /** `METHOD /uri` for REST protocols. */
  readonly http?: string;
  readonly input?: Struct;
  readonly output?: Struct;
  readonly checksum?: HttpChecksumTrait;
  readonly staticContext?: Readonly<
    Record<string, { readonly value: unknown }>
  >;
  /** aws.customizations#s3UnwrappedXmlOutput: the member holding the root text. */
  readonly unwrapped?: string;
  /**
   * restJson: the input has members bound to the body (an empty `{}` is sent
   * when none are set). restXml: the body's root element name.
   */
  readonly body?: true | string;
}

export interface Operation {
  readonly descriptor: OperationDescriptor;
  readonly errors: readonly AnyErrorClass[];
  readonly operationName: string;
  readonly endpointHostPrefix?: string;
  readonly pagination?: PaginatedTrait;
}
