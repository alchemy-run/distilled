import { makeAnnotation } from "@distilled.cloud/core/trait";
/**
 * The AWS protocol traits other than restXml (which ships with
 * `@distilled.cloud/s3`), and the SigV2 auth trait. `./traits.ts` re-exports
 * them next to the shared traits, so generated services read every trait
 * from one `T` namespace.
 */
import {
  type AwsAuthSigv2Trait,
  awsAuthSigv2Symbol,
  hasAnnotation,
  lazyProtocol,
  makeProtocolAnnotation,
} from "@distilled.cloud/s3/Traits";
import type * as AST from "effect/SchemaAST";
import { signV2 } from "./sigv2.ts";

const restJson1Protocol = /*@__PURE__*/ lazyProtocol(() =>
  import("./protocols/rest-json.ts").then((m) => m.restJson1Protocol),
);
const awsJson1_0Protocol = /*@__PURE__*/ lazyProtocol(() =>
  import("./protocols/aws-json.ts").then((m) => m.awsJson1_0Protocol),
);
const awsJson1_1Protocol = /*@__PURE__*/ lazyProtocol(() =>
  import("./protocols/aws-json.ts").then((m) => m.awsJson1_1Protocol),
);
const awsQueryProtocol = /*@__PURE__*/ lazyProtocol(() =>
  import("./protocols/aws-query.ts").then((m) => m.awsQueryProtocol),
);
const ec2QueryProtocol = /*@__PURE__*/ lazyProtocol(() =>
  import("./protocols/ec2-query.ts").then((m) => m.ec2QueryProtocol),
);
const rpcv2CborProtocol = /*@__PURE__*/ lazyProtocol(() =>
  import("./protocols/rpcv2-cbor.ts").then((m) => m.rpcv2CborProtocol),
);

/** Legacy Signature Version 2 auth (SimpleDB); see `AwsAuthSigv2Trait`. */
export const AwsAuthSigv2 = (trait: { name: string }) =>
  makeAnnotation(awsAuthSigv2Symbol, { ...trait, sign: signV2 } satisfies AwsAuthSigv2Trait);

/** aws.protocols#restJson1 */
export const awsProtocolsRestJson1Symbol = "distilled-aws/aws.protocols#restJson1" as const;
export interface AwsProtocolsRestJson1Trait {
  http?: string[];
  eventStreamHttp?: string[];
}
export const AwsProtocolsRestJson1 = (trait?: AwsProtocolsRestJson1Trait) =>
  makeProtocolAnnotation(awsProtocolsRestJson1Symbol, restJson1Protocol, trait);

/** aws.protocols#awsJson1_0 */
export const awsProtocolsAwsJson1_0Symbol = "distilled-aws/aws.protocols#awsJson1_0" as const;
export interface AwsProtocolsAwsJson1_0Trait {
  http?: string[];
  eventStreamHttp?: string[];
  /** `aws.protocols#awsQueryCompatible`: the service was an awsQuery one. */
  awsQueryCompatible?: boolean;
}
export const AwsProtocolsAwsJson1_0 = (trait?: AwsProtocolsAwsJson1_0Trait) =>
  makeProtocolAnnotation(awsProtocolsAwsJson1_0Symbol, awsJson1_0Protocol, trait);

/** aws.protocols#awsJson1_1 */
export const awsProtocolsAwsJson1_1Symbol = "distilled-aws/aws.protocols#awsJson1_1" as const;
export interface AwsProtocolsAwsJson1_1Trait {
  http?: string[];
  eventStreamHttp?: string[];
  /** `aws.protocols#awsQueryCompatible`: the service was an awsQuery one. */
  awsQueryCompatible?: boolean;
}
export const AwsProtocolsAwsJson1_1 = (trait?: AwsProtocolsAwsJson1_1Trait) =>
  makeProtocolAnnotation(awsProtocolsAwsJson1_1Symbol, awsJson1_1Protocol, trait);

/** aws.protocols#awsQuery */
export const awsProtocolsAwsQuerySymbol = "distilled-aws/aws.protocols#awsQuery" as const;
export const AwsProtocolsAwsQuery = () =>
  makeProtocolAnnotation(awsProtocolsAwsQuerySymbol, awsQueryProtocol);

/** aws.protocols#ec2Query */
export const awsProtocolsEc2QuerySymbol = "distilled-aws/aws.protocols#ec2Query" as const;
export const AwsProtocolsEc2Query = () =>
  makeProtocolAnnotation(awsProtocolsEc2QuerySymbol, ec2QueryProtocol);

/** smithy.protocols#rpcv2Cbor */
export const smithyProtocolsRpcv2CborSymbol = "distilled-aws/smithy.protocols#rpcv2Cbor" as const;
export interface SmithyProtocolsRpcv2CborTrait {
  http?: string[];
  eventStreamHttp?: string[];
  /** `aws.protocols#awsQueryCompatible`: the service was an awsQuery one. */
  awsQueryCompatible?: boolean;
}
export const SmithyProtocolsRpcv2Cbor = (trait?: SmithyProtocolsRpcv2CborTrait) =>
  makeProtocolAnnotation(smithyProtocolsRpcv2CborSymbol, rpcv2CborProtocol, {
    ...trait,
    // CBOR bodies are binary: never read one as text.
    binaryBody: true,
  });

/**
 * The operation has no input (`smithy.api#Unit`); its generated input is an
 * empty structure. rpcv2Cbor sends no body for it, and an empty map for an
 * input structure with no members.
 */
export const unitInputSymbol = "distilled-aws/unitInput" as const;
export const UnitInput = () => makeAnnotation(unitInputSymbol, true);
export const hasUnitInput = (ast: AST.AST): boolean => hasAnnotation(ast, unitInputSymbol);

export const hasRestJson1Protocol = (ast: AST.AST): boolean =>
  hasAnnotation(ast, awsProtocolsRestJson1Symbol);

export const hasAwsJson1_0Protocol = (ast: AST.AST): boolean =>
  hasAnnotation(ast, awsProtocolsAwsJson1_0Symbol);

export const hasAwsJson1_1Protocol = (ast: AST.AST): boolean =>
  hasAnnotation(ast, awsProtocolsAwsJson1_1Symbol);

export const hasAwsQueryProtocol = (ast: AST.AST): boolean =>
  hasAnnotation(ast, awsProtocolsAwsQuerySymbol);

export const hasEc2QueryProtocol = (ast: AST.AST): boolean =>
  hasAnnotation(ast, awsProtocolsEc2QuerySymbol);
