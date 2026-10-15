import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Lambda",
  serviceShapeName: "AWSGirApiService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "lambda" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-03-31");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://lambda.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://lambda.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://lambda.{R}.{D}","properties":{},"headers":{}}');

export class AliasLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AliasLimitExceededException>()(
    "AliasLimitExceededException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CallbackTimeoutException
  extends /*@__PURE__*/ S.TaggedError<CallbackTimeoutException>()(
    "CallbackTimeoutException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CapacityProviderLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CapacityProviderLimitExceededException>()(
    "CapacityProviderLimitExceededException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CodeArtifactUserDeletedException
  extends /*@__PURE__*/ S.TaggedError<CodeArtifactUserDeletedException>()(
    "CodeArtifactUserDeletedException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CodeArtifactUserFailedException
  extends /*@__PURE__*/ S.TaggedError<CodeArtifactUserFailedException>()(
    "CodeArtifactUserFailedException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CodeArtifactUserPendingException
  extends /*@__PURE__*/ S.TaggedError<CodeArtifactUserPendingException>()(
    "CodeArtifactUserPendingException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CodeSigningConfigNotFoundException
  extends /*@__PURE__*/ S.TaggedError<CodeSigningConfigNotFoundException>()(
    "CodeSigningConfigNotFoundException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class CodeStorageExceededException
  extends /*@__PURE__*/ S.TaggedError<CodeStorageExceededException>()(
    "CodeStorageExceededException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CodeVerificationFailedException
  extends /*@__PURE__*/ S.TaggedError<CodeVerificationFailedException>()(
    "CodeVerificationFailedException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DurableExecutionAlreadyStartedException
  extends /*@__PURE__*/ S.TaggedError<DurableExecutionAlreadyStartedException>()(
    "DurableExecutionAlreadyStartedException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class EC2AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<EC2AccessDeniedException>()(
    "EC2AccessDeniedException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError, C.withAuthError) {}
export class EC2ThrottledException
  extends /*@__PURE__*/ S.TaggedError<EC2ThrottledException>()(
    "EC2ThrottledException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class EC2UnexpectedException
  extends /*@__PURE__*/ S.TaggedError<EC2UnexpectedException>()(
    "EC2UnexpectedException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      EC2ErrorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class EFSIOException
  extends /*@__PURE__*/ S.TaggedError<EFSIOException>()(
    "EFSIOException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class EFSMountConnectivityException
  extends /*@__PURE__*/ S.TaggedError<EFSMountConnectivityException>()(
    "EFSMountConnectivityException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class EFSMountFailureException
  extends /*@__PURE__*/ S.TaggedError<EFSMountFailureException>()(
    "EFSMountFailureException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class EFSMountTimeoutException
  extends /*@__PURE__*/ S.TaggedError<EFSMountTimeoutException>()(
    "EFSMountTimeoutException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class ENILimitReachedException
  extends /*@__PURE__*/ S.TaggedError<ENILimitReachedException>()(
    "ENILimitReachedException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class ENINotReadyException
  extends /*@__PURE__*/ S.TaggedError<ENINotReadyException>()(
    "ENINotReadyException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class ExecutionRoleMissingPermissions
  extends /*@__PURE__*/ S.TaggedError<ExecutionRoleMissingPermissions>()(
    "ExecutionRoleMissingPermissions",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterValueException",
      message: {
        matches:
          "The function execution role does not have permissions to call|Cannot access stream|Please ensure the role can perform the GetRecords",
      },
    }),
  ) {}
export class ExecutionRoleMissingVpcPermissions
  extends /*@__PURE__*/ S.TaggedError<ExecutionRoleMissingVpcPermissions>()(
    "ExecutionRoleMissingVpcPermissions",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterValueException",
      message: { includes: "does not have permissions to call CreateNetworkInterface" },
    }),
  ) {}
export class ExecutionRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<ExecutionRoleNotAssumable>()(
    "ExecutionRoleNotAssumable",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterValueException",
      message: { matches: "cannot be assumed by Lambda|Please add Lambda as a Trusted Entity" },
    }),
  ) {}
export class FunctionVersionsPerCapacityProviderLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<FunctionVersionsPerCapacityProviderLimitExceededException>()(
    "FunctionVersionsPerCapacityProviderLimitExceededException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidCodeSignatureException
  extends /*@__PURE__*/ S.TaggedError<InvalidCodeSignatureException>()(
    "InvalidCodeSignatureException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestContentException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestContentException>()(
    "InvalidRequestContentException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRuntimeException
  extends /*@__PURE__*/ S.TaggedError<InvalidRuntimeException>()(
    "InvalidRuntimeException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class InvalidSecurityGroupIDException
  extends /*@__PURE__*/ S.TaggedError<InvalidSecurityGroupIDException>()(
    "InvalidSecurityGroupIDException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class InvalidSubnetIDException
  extends /*@__PURE__*/ S.TaggedError<InvalidSubnetIDException>()(
    "InvalidSubnetIDException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class InvalidZipFileException
  extends /*@__PURE__*/ S.TaggedError<InvalidZipFileException>()(
    "InvalidZipFileException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class KMSAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<KMSAccessDeniedException>()(
    "KMSAccessDeniedException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError, C.withAuthError) {}
export class KMSDisabledException
  extends /*@__PURE__*/ S.TaggedError<KMSDisabledException>()(
    "KMSDisabledException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class KmsGrantPrincipalNotReady
  extends /*@__PURE__*/ S.TaggedError<KmsGrantPrincipalNotReady>()(
    "KmsGrantPrincipalNotReady",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterValueException",
      message: {
        matches:
          "KMS key is invalid for CreateGrant[\\s\\S]*ARN does not refer to a valid principal",
      },
    }),
  ) {}
export class KMSInvalidStateException
  extends /*@__PURE__*/ S.TaggedError<KMSInvalidStateException>()(
    "KMSInvalidStateException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class KMSNotFoundException
  extends /*@__PURE__*/ S.TaggedError<KMSNotFoundException>()(
    "KMSNotFoundException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class LambdaInternalKmsError
  extends /*@__PURE__*/ S.TaggedError<LambdaInternalKmsError>()(
    "LambdaInternalKmsError",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterValueException",
      message: "Internal KMS service error. Try again.",
    }),
  ).pipe(C.withRetryableError) {}
export class ModeNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ModeNotSupportedException>()(
    "ModeNotSupportedException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NoPublishedVersionException
  extends /*@__PURE__*/ S.TaggedError<NoPublishedVersionException>()(
    "NoPublishedVersionException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ParseError
  extends /*@__PURE__*/ S.TaggedError<ParseError>()("ParseError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PolicyLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<PolicyLengthExceededException>()(
    "PolicyLengthExceededException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PreconditionFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailedException>()(
    "PreconditionFailedException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(412),
  ) {}
export class ProvisionedConcurrencyConfigNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ProvisionedConcurrencyConfigNotFoundException>()(
    "ProvisionedConcurrencyConfigNotFoundException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class PublicPolicyException
  extends /*@__PURE__*/ S.TaggedError<PublicPolicyException>()(
    "PublicPolicyException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RecursiveInvocationException
  extends /*@__PURE__*/ S.TaggedError<RecursiveInvocationException>()(
    "RecursiveInvocationException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<RequestLimitExceeded>()("RequestLimitExceeded", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError) {}
export class RequestTooLargeException
  extends /*@__PURE__*/ S.TaggedError<RequestTooLargeException>()(
    "RequestTooLargeException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotReadyException>()(
    "ResourceNotReadyException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class S3FilesMountConnectivityException
  extends /*@__PURE__*/ S.TaggedError<S3FilesMountConnectivityException>()(
    "S3FilesMountConnectivityException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class S3FilesMountFailureException
  extends /*@__PURE__*/ S.TaggedError<S3FilesMountFailureException>()(
    "S3FilesMountFailureException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class S3FilesMountTimeoutException
  extends /*@__PURE__*/ S.TaggedError<S3FilesMountTimeoutException>()(
    "S3FilesMountTimeoutException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class SecurityGroupNotFound
  extends /*@__PURE__*/ S.TaggedError<SecurityGroupNotFound>()(
    "SecurityGroupNotFound",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterValueException",
      message: { includes: "InvalidGroup.NotFound" },
    }),
  ) {}
export class SerializedRequestEntityTooLargeException
  extends /*@__PURE__*/ S.TaggedError<SerializedRequestEntityTooLargeException>()(
    "SerializedRequestEntityTooLargeException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class SnapStartException
  extends /*@__PURE__*/ S.TaggedError<SnapStartException>()(
    "SnapStartException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class SnapStartNotReadyException
  extends /*@__PURE__*/ S.TaggedError<SnapStartNotReadyException>()(
    "SnapStartNotReadyException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class SnapStartRegenerationFailureException
  extends /*@__PURE__*/ S.TaggedError<SnapStartRegenerationFailureException>()(
    "SnapStartRegenerationFailureException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class SnapStartTimeoutException
  extends /*@__PURE__*/ S.TaggedError<SnapStartTimeoutException>()(
    "SnapStartTimeoutException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class SubnetIPAddressLimitReachedException
  extends /*@__PURE__*/ S.TaggedError<SubnetIPAddressLimitReachedException>()(
    "SubnetIPAddressLimitReachedException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ThrottleReason" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnsupportedMediaTypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedMediaTypeException>()(
    "UnsupportedMediaTypeException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(415),
  ).pipe(C.withBadRequestError) {}
export type LayerName = string;
export type LayerVersionNumber = number;
export type StatementId = string;
export type LayerPermissionAllowedAction = string;
export type LayerPermissionAllowedPrincipal = string;
export type OrganizationId = string;
export interface AddLayerVersionPermissionRequest {
  LayerName: string;
  VersionNumber: number;
  StatementId: string;
  Action: string;
  Principal: string;
  OrganizationId?: string;
  RevisionId?: string;
}
export interface AddLayerVersionPermissionResponse {
  Statement?: string;
  RevisionId?: string;
}
export type NamespacedFunctionName = string;
export type Action = string;
export type Principal = string;
export type Arn = string;
export type FunctionUrlAuthType = "NONE" | "AWS_IAM" | (string & {});
export type InvokedViaFunctionUrl = boolean;
export type SourceOwner = string;
export type EventSourceToken = string;
export type NumericLatestPublishedOrAliasQualifier = string;
export type PrincipalOrgID = string;
export interface AddPermissionRequest {
  FunctionName: string;
  StatementId: string;
  Action: string;
  Principal: string;
  SourceArn?: string;
  FunctionUrlAuthType?: FunctionUrlAuthType;
  InvokedViaFunctionUrl?: boolean;
  SourceAccount?: string;
  EventSourceToken?: string;
  Qualifier?: string;
  RevisionId?: string;
  PrincipalOrgID?: string;
}
export interface AddPermissionResponse {
  Statement?: string;
}
export type DurableExecutionArn = string;
export type CheckpointToken = string;
export type OperationId = string;
export type OperationName = string;
export type OperationType =
  | "EXECUTION"
  | "CONTEXT"
  | "STEP"
  | "WAIT"
  | "CALLBACK"
  | "CHAINED_INVOKE"
  | (string & {});
export type OperationSubType = string;
export type OperationAction = "START" | "SUCCEED" | "FAIL" | "RETRY" | "CANCEL" | (string & {});
export type OperationPayload = string | redacted.Redacted<string>;
export type ErrorMessage = string | redacted.Redacted<string>;
export type ErrorType = string | redacted.Redacted<string>;
export type ErrorData = string | redacted.Redacted<string>;
export type StackTraceEntry = string | redacted.Redacted<string>;
export type StackTraceEntries = (string | redacted.Redacted<string>)[];
export interface ErrorObject {
  ErrorMessage?: string | redacted.Redacted<string>;
  ErrorType?: string | redacted.Redacted<string>;
  ErrorData?: string | redacted.Redacted<string>;
  StackTrace?: (string | redacted.Redacted<string>)[];
}
export type ReplayChildren = boolean;
export interface ContextOptions {
  ReplayChildren?: boolean;
}
export type DurationSeconds = number;
export interface StepOptions {
  NextAttemptDelaySeconds?: number;
}
export interface WaitOptions {
  WaitSeconds?: number;
}
export interface CallbackOptions {
  TimeoutSeconds?: number;
  HeartbeatTimeoutSeconds?: number;
}
export type TenantId = string;
export interface ChainedInvokeOptions {
  FunctionName: string;
  TenantId?: string;
}
export interface OperationUpdate {
  Id: string;
  ParentId?: string;
  Name?: string;
  Type: OperationType;
  SubType?: string;
  Action: OperationAction;
  Payload?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
  ContextOptions?: ContextOptions;
  StepOptions?: StepOptions;
  WaitOptions?: WaitOptions;
  CallbackOptions?: CallbackOptions;
  ChainedInvokeOptions?: ChainedInvokeOptions;
}
export type OperationUpdates = OperationUpdate[];
export type ClientToken = string;
export interface CheckpointDurableExecutionRequest {
  DurableExecutionArn: string;
  CheckpointToken: string;
  Updates?: OperationUpdate[];
  ClientToken?: string;
}
export type ExecutionTimestamp = Date;
export type OperationStatus =
  | "STARTED"
  | "PENDING"
  | "READY"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED"
  | "TIMED_OUT"
  | "STOPPED"
  | (string & {});
export type InputPayload = string | redacted.Redacted<string>;
export interface ExecutionDetails {
  InputPayload?: string | redacted.Redacted<string>;
}
export interface ContextDetails {
  ReplayChildren?: boolean;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export type AttemptCount = number;
export interface StepDetails {
  Attempt?: number;
  NextAttemptTimestamp?: Date;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export interface WaitDetails {
  ScheduledEndTimestamp?: Date;
}
export type CallbackId = string;
export interface CallbackDetails {
  CallbackId?: string;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export interface ChainedInvokeDetails {
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export interface Operation {
  Id: string;
  ParentId?: string;
  Name?: string;
  Type: OperationType;
  SubType?: string;
  StartTimestamp: Date;
  EndTimestamp?: Date;
  Status: OperationStatus;
  ExecutionDetails?: ExecutionDetails;
  ContextDetails?: ContextDetails;
  StepDetails?: StepDetails;
  WaitDetails?: WaitDetails;
  CallbackDetails?: CallbackDetails;
  ChainedInvokeDetails?: ChainedInvokeDetails;
}
export type Operations = Operation[];
export interface CheckpointUpdatedExecutionState {
  Operations?: Operation[];
  NextMarker?: string;
}
export interface CheckpointDurableExecutionResponse {
  CheckpointToken?: string;
  NewExecutionState: CheckpointUpdatedExecutionState;
}
export type FunctionName = string;
export type Alias = string;
export type VersionWithLatestPublished = string;
export type Description = string;
export type AdditionalVersion = string;
export type Weight = number;
export type AdditionalVersionWeights = { [key: string]: number | undefined };
export interface AliasRoutingConfiguration {
  AdditionalVersionWeights?: { [key: string]: number | undefined };
}
export interface CreateAliasRequest {
  FunctionName: string;
  Name: string;
  FunctionVersion: string;
  Description?: string;
  RoutingConfig?: AliasRoutingConfiguration;
}
export type FunctionArn = string;
export type Version = string;
export interface AliasConfiguration {
  AliasArn?: string;
  Name?: string;
  FunctionVersion?: string;
  Description?: string;
  RoutingConfig?: AliasRoutingConfiguration;
  RevisionId?: string;
}
export type CapacityProviderName = string;
export type SubnetId = string;
export type CapacityProviderSubnetIds = string[];
export type SecurityGroupId = string;
export type CapacityProviderSecurityGroupIds = string[];
export interface CapacityProviderVpcConfig {
  SubnetIds: string[];
  SecurityGroupIds: string[];
}
export type RoleArn = string;
export interface CapacityProviderPermissionsConfig {
  CapacityProviderOperatorRoleArn: string;
}
export type Architecture = "x86_64" | "arm64" | (string & {});
export type ArchitecturesList = Architecture[];
export type InstanceType = string;
export type InstanceTypeSet = string[];
export interface InstanceRequirements {
  Architectures?: Architecture[];
  AllowedInstanceTypes?: string[];
  ExcludedInstanceTypes?: string[];
}
export type CapacityProviderMaxVCpuCount = number;
export type CapacityProviderScalingMode = "Auto" | "Manual" | (string & {});
export type CapacityProviderPredefinedMetricType =
  | "LambdaCapacityProviderAverageCPUUtilization"
  | (string & {});
export type MetricTargetValue = number;
export interface TargetTrackingScalingPolicy {
  PredefinedMetricType: CapacityProviderPredefinedMetricType;
  TargetValue: number;
}
export type CapacityProviderScalingPoliciesList = TargetTrackingScalingPolicy[];
export interface CapacityProviderScalingConfig {
  MaxVCpuCount?: number;
  ScalingMode?: CapacityProviderScalingMode;
  ScalingPolicies?: TargetTrackingScalingPolicy[];
}
export type KMSKeyArnNonEmpty = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type PropagateTagsMode = "None" | "Explicit" | (string & {});
export interface PropagateTags {
  Mode?: PropagateTagsMode;
  ExplicitTags?: { [key: string]: string | undefined };
}
export type SystemLogLevel = "DEBUG" | "INFO" | "WARN" | (string & {});
export type LogGroup = string;
export interface CapacityProviderLoggingConfig {
  SystemLogLevel?: SystemLogLevel;
  LogGroup?: string;
}
export interface CapacityProviderTelemetryConfig {
  LoggingConfig?: CapacityProviderLoggingConfig;
}
export interface CreateCapacityProviderRequest {
  CapacityProviderName: string;
  VpcConfig: CapacityProviderVpcConfig;
  PermissionsConfig: CapacityProviderPermissionsConfig;
  InstanceRequirements?: InstanceRequirements;
  CapacityProviderScalingConfig?: CapacityProviderScalingConfig;
  KmsKeyArn?: string;
  Tags?: { [key: string]: string | undefined };
  PropagateTags?: PropagateTags;
  TelemetryConfig?: CapacityProviderTelemetryConfig;
}
export type CapacityProviderArn = string;
export type CapacityProviderState = "Pending" | "Active" | "Failed" | "Deleting" | (string & {});
export type KMSKeyArn = string;
export interface CapacityProvider {
  CapacityProviderArn: string;
  State: CapacityProviderState;
  VpcConfig: CapacityProviderVpcConfig;
  PermissionsConfig: CapacityProviderPermissionsConfig;
  InstanceRequirements?: InstanceRequirements;
  CapacityProviderScalingConfig?: CapacityProviderScalingConfig;
  KmsKeyArn?: string;
  LastModified?: string;
  PropagateTags?: PropagateTags;
  TelemetryConfig?: CapacityProviderTelemetryConfig;
}
export interface CreateCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export type SigningProfileVersionArns = string[];
export interface AllowedPublishers {
  SigningProfileVersionArns: string[];
}
export type CodeSigningPolicy = "Warn" | "Enforce" | (string & {});
export interface CodeSigningPolicies {
  UntrustedArtifactOnDeployment?: CodeSigningPolicy;
}
export interface CreateCodeSigningConfigRequest {
  Description?: string;
  AllowedPublishers: AllowedPublishers;
  CodeSigningPolicies?: CodeSigningPolicies;
  Tags?: { [key: string]: string | undefined };
}
export type CodeSigningConfigId = string;
export type CodeSigningConfigArn = string;
export interface CodeSigningConfig {
  CodeSigningConfigId: string;
  CodeSigningConfigArn: string;
  Description?: string;
  AllowedPublishers: AllowedPublishers;
  CodeSigningPolicies: CodeSigningPolicies;
  LastModified: string;
}
export interface CreateCodeSigningConfigResponse {
  CodeSigningConfig: CodeSigningConfig;
}
export type Enabled = boolean;
export type BatchSize = number;
export type Pattern = string;
export interface Filter {
  Pattern?: string;
}
export type FilterList = Filter[];
export interface FilterCriteria {
  Filters?: Filter[];
}
export type EventSourceMappingMetric = "EventCount" | "ErrorCount" | "KafkaMetrics" | (string & {});
export type EventSourceMappingMetricList = EventSourceMappingMetric[];
export interface EventSourceMappingMetricsConfig {
  Metrics?: EventSourceMappingMetric[];
}
export type EventSourceMappingSystemLogLevel = "DEBUG" | "INFO" | "WARN" | (string & {});
export interface EventSourceMappingLoggingConfig {
  SystemLogLevel?: EventSourceMappingSystemLogLevel;
}
export type MaximumConcurrency = number;
export interface ScalingConfig {
  MaximumConcurrency?: number;
}
export type MaximumBatchingWindowInSeconds = number;
export type ParallelizationFactor = number;
export type EventSourcePosition = "TRIM_HORIZON" | "LATEST" | "AT_TIMESTAMP" | (string & {});
export type DestinationArn = string;
export interface OnSuccess {
  Destination?: string;
}
export interface OnFailure {
  Destination?: string;
}
export interface DestinationConfig {
  OnSuccess?: OnSuccess;
  OnFailure?: OnFailure;
}
export type MaximumRecordAgeInSeconds = number;
export type BisectBatchOnFunctionError = boolean;
export type MaximumRetryAttemptsEventSourceMapping = number;
export type TumblingWindowInSeconds = number;
export type Topic = string;
export type Topics = string[];
export type Queue = string;
export type Queues = string[];
export type SourceAccessType =
  | "BASIC_AUTH"
  | "VPC_SUBNET"
  | "VPC_SECURITY_GROUP"
  | "SASL_SCRAM_512_AUTH"
  | "SASL_SCRAM_256_AUTH"
  | "VIRTUAL_HOST"
  | "CLIENT_CERTIFICATE_TLS_AUTH"
  | "SERVER_ROOT_CA_CERTIFICATE"
  | "OAUTHBEARER_AUTH"
  | "OAUTHBEARER_SCOPE"
  | "OAUTHBEARER_AUDIENCE"
  | "OAUTHBEARER_LOGICAL_CLUSTER"
  | "OAUTHBEARER_IDENTITY_POOL"
  | "IAM_AUTH"
  | "IAM_OAUTHBEARER_AUTH"
  | (string & {});
export type URI = string;
export interface SourceAccessConfiguration {
  Type?: SourceAccessType;
  URI?: string;
}
export type SourceAccessConfigurations = SourceAccessConfiguration[];
export type EndPointType = "KAFKA_BOOTSTRAP_SERVERS" | (string & {});
export type Endpoint = string;
export type EndpointLists = string[];
export type Endpoints = { [key in EndPointType]?: string[] };
export interface SelfManagedEventSource {
  Endpoints?: { [key: string]: string[] | undefined };
}
export type FunctionResponseType = "ReportBatchItemFailures" | (string & {});
export type FunctionResponseTypeList = FunctionResponseType[];
export type SchemaRegistryUri = string;
export type SchemaRegistryEventRecordFormat = "JSON" | "SOURCE" | (string & {});
export type KafkaSchemaRegistryAuthType =
  | "BASIC_AUTH"
  | "CLIENT_CERTIFICATE_TLS_AUTH"
  | "SERVER_ROOT_CA_CERTIFICATE"
  | "OAUTHBEARER_AUTH"
  | (string & {});
export interface KafkaSchemaRegistryAccessConfig {
  Type?: KafkaSchemaRegistryAuthType;
  URI?: string;
}
export type KafkaSchemaRegistryAccessConfigList = KafkaSchemaRegistryAccessConfig[];
export type KafkaSchemaValidationAttribute = "KEY" | "VALUE" | (string & {});
export interface KafkaSchemaValidationConfig {
  Attribute?: KafkaSchemaValidationAttribute;
}
export type KafkaSchemaValidationConfigList = KafkaSchemaValidationConfig[];
export interface KafkaSchemaRegistryConfig {
  SchemaRegistryURI?: string;
  EventRecordFormat?: SchemaRegistryEventRecordFormat;
  AccessConfigs?: KafkaSchemaRegistryAccessConfig[];
  SchemaValidationConfigs?: KafkaSchemaValidationConfig[];
}
export interface AmazonManagedKafkaEventSourceConfig {
  ConsumerGroupId?: string;
  SchemaRegistryConfig?: KafkaSchemaRegistryConfig;
}
export interface SelfManagedKafkaEventSourceConfig {
  ConsumerGroupId?: string;
  SchemaRegistryConfig?: KafkaSchemaRegistryConfig;
}
export type DatabaseName = string;
export type CollectionName = string;
export type FullDocument = "UpdateLookup" | "Default" | (string & {});
export interface DocumentDBEventSourceConfig {
  DatabaseName?: string;
  CollectionName?: string;
  FullDocument?: FullDocument;
}
export type MinimumNumberOfPollers = number;
export type MaximumNumberOfPollers = number;
export type ProvisionedPollerGroupName = string;
export interface ProvisionedPollerConfig {
  MinimumPollers?: number;
  MaximumPollers?: number;
  PollerGroupName?: string;
}
export interface CreateEventSourceMappingRequest {
  EventSourceArn?: string;
  FunctionName: string;
  Enabled?: boolean;
  BatchSize?: number;
  FilterCriteria?: FilterCriteria;
  KMSKeyArn?: string;
  MetricsConfig?: EventSourceMappingMetricsConfig;
  LoggingConfig?: EventSourceMappingLoggingConfig;
  ScalingConfig?: ScalingConfig;
  MaximumBatchingWindowInSeconds?: number;
  ParallelizationFactor?: number;
  StartingPosition?: EventSourcePosition;
  StartingPositionTimestamp?: Date;
  DestinationConfig?: DestinationConfig;
  MaximumRecordAgeInSeconds?: number;
  BisectBatchOnFunctionError?: boolean;
  MaximumRetryAttempts?: number;
  Tags?: { [key: string]: string | undefined };
  TumblingWindowInSeconds?: number;
  Topics?: string[];
  Queues?: string[];
  SourceAccessConfigurations?: SourceAccessConfiguration[];
  SelfManagedEventSource?: SelfManagedEventSource;
  FunctionResponseTypes?: FunctionResponseType[];
  AmazonManagedKafkaEventSourceConfig?: AmazonManagedKafkaEventSourceConfig;
  SelfManagedKafkaEventSourceConfig?: SelfManagedKafkaEventSourceConfig;
  DocumentDBEventSourceConfig?: DocumentDBEventSourceConfig;
  ProvisionedPollerConfig?: ProvisionedPollerConfig;
}
export type UUIDString = string;
export type FilterCriteriaErrorCode = string;
export type FilterCriteriaErrorMessage = string;
export interface FilterCriteriaError {
  ErrorCode?: string;
  Message?: string;
}
export type EventSourceMappingArn = string;
export interface EventSourceMappingConfiguration {
  UUID?: string;
  StartingPosition?: EventSourcePosition;
  StartingPositionTimestamp?: Date;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
  ParallelizationFactor?: number;
  EventSourceArn?: string;
  FilterCriteria?: FilterCriteria;
  FilterCriteriaError?: FilterCriteriaError;
  KMSKeyArn?: string;
  MetricsConfig?: EventSourceMappingMetricsConfig;
  LoggingConfig?: EventSourceMappingLoggingConfig;
  ScalingConfig?: ScalingConfig;
  FunctionArn?: string;
  LastModified?: Date;
  LastProcessingResult?: string;
  State?: string;
  StateTransitionReason?: string;
  DestinationConfig?: DestinationConfig;
  Topics?: string[];
  Queues?: string[];
  SourceAccessConfigurations?: SourceAccessConfiguration[];
  SelfManagedEventSource?: SelfManagedEventSource;
  MaximumRecordAgeInSeconds?: number;
  BisectBatchOnFunctionError?: boolean;
  MaximumRetryAttempts?: number;
  TumblingWindowInSeconds?: number;
  FunctionResponseTypes?: FunctionResponseType[];
  AmazonManagedKafkaEventSourceConfig?: AmazonManagedKafkaEventSourceConfig;
  SelfManagedKafkaEventSourceConfig?: SelfManagedKafkaEventSourceConfig;
  DocumentDBEventSourceConfig?: DocumentDBEventSourceConfig;
  EventSourceMappingArn?: string;
  ProvisionedPollerConfig?: ProvisionedPollerConfig;
}
export type Runtime =
  | "nodejs"
  | "nodejs4.3"
  | "nodejs6.10"
  | "nodejs8.10"
  | "nodejs10.x"
  | "nodejs12.x"
  | "nodejs14.x"
  | "nodejs16.x"
  | "nodejs18.x"
  | "nodejs20.x"
  | "nodejs22.x"
  | "nodejs24.x"
  | "java8"
  | "java8.al2"
  | "java11"
  | "java17"
  | "java21"
  | "java25"
  | "python2.7"
  | "python3.6"
  | "python3.7"
  | "python3.8"
  | "python3.9"
  | "python3.10"
  | "python3.11"
  | "python3.12"
  | "python3.13"
  | "python3.14"
  | "dotnetcore1.0"
  | "dotnetcore2.0"
  | "dotnetcore2.1"
  | "dotnetcore3.1"
  | "dotnet6"
  | "dotnet8"
  | "dotnet10"
  | "nodejs4.3-edge"
  | "go1.x"
  | "ruby2.5"
  | "ruby2.7"
  | "ruby3.2"
  | "ruby3.3"
  | "ruby3.4"
  | "ruby4.0"
  | "provided"
  | "provided.al2"
  | "provided.al2023"
  | "nodejs26.x"
  | "python3.15"
  | "java8.al2023"
  | "java11.al2023"
  | "java17.al2023"
  | (string & {});
export type Handler = string;
export type S3Bucket = string;
export type S3Key = string;
export type S3ObjectVersion = string;
export type S3ObjectStorageMode = "COPY" | "REFERENCE" | (string & {});
export interface FunctionCode {
  ZipFile?: Uint8Array | redacted.Redacted<Uint8Array>;
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  S3ObjectStorageMode?: S3ObjectStorageMode;
  ImageUri?: string;
  SourceKMSKeyArn?: string;
}
export type Timeout = number;
export type MemorySize = number;
export type FunctionVersionLatestPublished = "LATEST_PUBLISHED" | (string & {});
export type SubnetIds = string[];
export type SecurityGroupIds = string[];
export interface VpcConfig {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Ipv6AllowedForDualStack?: boolean;
}
export type PackageType = "Zip" | "Image" | (string & {});
export type ResourceArn = string;
export interface DeadLetterConfig {
  TargetArn?: string;
}
export type EnvironmentVariableName = string | redacted.Redacted<string>;
export type EnvironmentVariableValue = string | redacted.Redacted<string>;
export type EnvironmentVariables = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface Environment {
  Variables?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type TracingMode = "Active" | "PassThrough" | (string & {});
export interface TracingConfig {
  Mode?: TracingMode;
}
export type LayerVersionArn = string;
export type LayerList = string[];
export type FileSystemArn = string;
export type LocalMountPath = string;
export type DirectS3Read = "ENABLED" | "DISABLED" | "AUTO" | (string & {});
export interface S3FilesConfig {
  DirectS3Read?: DirectS3Read;
}
export interface FileSystemConfig {
  Arn: string;
  LocalMountPath: string;
  S3FilesConfig?: S3FilesConfig;
}
export type FileSystemConfigList = FileSystemConfig[];
export type StringList = string[];
export type WorkingDirectory = string;
export interface ImageConfig {
  EntryPoint?: string[];
  Command?: string[];
  WorkingDirectory?: string;
}
export type EphemeralStorageSize = number;
export interface EphemeralStorage {
  Size: number;
}
export type SnapStartApplyOn = "PublishedVersions" | "None" | (string & {});
export interface SnapStart {
  ApplyOn?: SnapStartApplyOn;
}
export type LogFormat = "JSON" | "Text" | (string & {});
export type ApplicationLogLevel =
  | "TRACE"
  | "DEBUG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | (string & {});
export interface LoggingConfig {
  LogFormat?: LogFormat;
  ApplicationLogLevel?: ApplicationLogLevel;
  SystemLogLevel?: SystemLogLevel;
  LogGroup?: string;
}
export type TenantIsolationMode = "PER_TENANT" | (string & {});
export interface TenancyConfig {
  TenantIsolationMode: TenantIsolationMode;
}
export type PerExecutionEnvironmentMaxConcurrency = number;
export type ExecutionEnvironmentMemoryGiBPerVCpu = number;
export interface LambdaManagedInstancesCapacityProviderConfig {
  CapacityProviderArn: string;
  PerExecutionEnvironmentMaxConcurrency?: number;
  ExecutionEnvironmentMemoryGiBPerVCpu?: number;
}
export interface CapacityProviderConfig {
  LambdaManagedInstancesCapacityProviderConfig: LambdaManagedInstancesCapacityProviderConfig;
}
export type RetentionPeriodInDays = number;
export type ExecutionTimeout = number;
export interface DurableConfig {
  KMSKeyArn?: string;
  RetentionPeriodInDays?: number;
  ExecutionTimeout?: number;
}
export interface CreateFunctionRequest {
  FunctionName: string;
  Runtime?: Runtime;
  Role: string;
  Handler?: string;
  Code: FunctionCode;
  Description?: string;
  Timeout?: number;
  MemorySize?: number;
  Publish?: boolean;
  PublishTo?: FunctionVersionLatestPublished;
  VpcConfig?: VpcConfig;
  PackageType?: PackageType;
  DeadLetterConfig?: DeadLetterConfig;
  Environment?: Environment;
  KMSKeyArn?: string;
  TracingConfig?: TracingConfig;
  Tags?: { [key: string]: string | undefined };
  Layers?: string[];
  FileSystemConfigs?: FileSystemConfig[];
  CodeSigningConfigArn?: string;
  ImageConfig?: ImageConfig;
  Architectures?: Architecture[];
  EphemeralStorage?: EphemeralStorage;
  SnapStart?: SnapStart;
  LoggingConfig?: LoggingConfig;
  TenancyConfig?: TenancyConfig;
  CapacityProviderConfig?: CapacityProviderConfig;
  DurableConfig?: DurableConfig;
}
export type NameSpacedFunctionArn = string;
export type VpcId = string;
export interface VpcConfigResponse {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  VpcId?: string;
  Ipv6AllowedForDualStack?: boolean;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface EnvironmentError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export interface EnvironmentResponse {
  Variables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  Error?: EnvironmentError;
}
export interface TracingConfigResponse {
  Mode?: TracingMode;
}
export interface Layer {
  Arn?: string;
  CodeSize?: number;
  SigningProfileVersionArn?: string;
  SigningJobArn?: string;
}
export type LayersReferenceList = Layer[];
export type State =
  | "Pending"
  | "Active"
  | "Inactive"
  | "Failed"
  | "Deactivating"
  | "Deactivated"
  | "ActiveNonInvocable"
  | "Deleting"
  | (string & {});
export type StateReason = string;
export type StateReasonCode =
  | "Idle"
  | "Creating"
  | "Restoring"
  | "EniLimitExceeded"
  | "InsufficientRolePermissions"
  | "InvalidConfiguration"
  | "InternalError"
  | "SubnetOutOfIPAddresses"
  | "InvalidSubnet"
  | "InvalidSecurityGroup"
  | "ImageDeleted"
  | "ImageAccessDenied"
  | "InvalidImage"
  | "KMSKeyAccessDenied"
  | "KMSKeyNotFound"
  | "InvalidStateKMSKey"
  | "DisabledKMSKey"
  | "EFSIOError"
  | "EFSMountConnectivityError"
  | "EFSMountFailure"
  | "EFSMountTimeout"
  | "InvalidRuntime"
  | "InvalidZipFileException"
  | "FunctionError"
  | "ServiceQuotaExceededException"
  | "VcpuLimitExceeded"
  | "CapacityProviderScalingLimitExceeded"
  | "InsufficientCapacity"
  | "EC2RequestLimitExceeded"
  | "FunctionError.InitTimeout"
  | "FunctionError.RuntimeInitError"
  | "FunctionError.ExtensionInitError"
  | "FunctionError.InvalidEntryPoint"
  | "FunctionError.InvalidWorkingDirectory"
  | "FunctionError.PermissionDenied"
  | "FunctionError.TooManyExtensions"
  | "FunctionError.InitResourceExhausted"
  | "DisallowedByVpcEncryptionControl"
  | "DrainingDurableExecutions"
  | "DependencyError"
  | (string & {});
export type LastUpdateStatus = "Successful" | "Failed" | "InProgress" | (string & {});
export type LastUpdateStatusReason = string;
export type LastUpdateStatusReasonCode =
  | "EniLimitExceeded"
  | "InsufficientRolePermissions"
  | "InvalidConfiguration"
  | "InternalError"
  | "SubnetOutOfIPAddresses"
  | "InvalidSubnet"
  | "InvalidSecurityGroup"
  | "ImageDeleted"
  | "ImageAccessDenied"
  | "InvalidImage"
  | "KMSKeyAccessDenied"
  | "KMSKeyNotFound"
  | "InvalidStateKMSKey"
  | "DisabledKMSKey"
  | "EFSIOError"
  | "EFSMountConnectivityError"
  | "EFSMountFailure"
  | "EFSMountTimeout"
  | "InvalidRuntime"
  | "InvalidZipFileException"
  | "FunctionError"
  | "ServiceQuotaExceededException"
  | "VcpuLimitExceeded"
  | "CapacityProviderScalingLimitExceeded"
  | "InsufficientCapacity"
  | "EC2RequestLimitExceeded"
  | "FunctionError.InitTimeout"
  | "FunctionError.RuntimeInitError"
  | "FunctionError.ExtensionInitError"
  | "FunctionError.InvalidEntryPoint"
  | "FunctionError.InvalidWorkingDirectory"
  | "FunctionError.PermissionDenied"
  | "FunctionError.TooManyExtensions"
  | "FunctionError.InitResourceExhausted"
  | "DisallowedByVpcEncryptionControl"
  | "DependencyError"
  | "Creating"
  | (string & {});
export interface ImageConfigError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export interface ImageConfigResponse {
  ImageConfig?: ImageConfig;
  Error?: ImageConfigError;
}
export type SnapStartOptimizationStatus = "On" | "Off" | (string & {});
export interface SnapStartResponse {
  ApplyOn?: SnapStartApplyOn;
  OptimizationStatus?: SnapStartOptimizationStatus;
}
export type RuntimeVersionArn = string;
export interface RuntimeVersionError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export interface RuntimeVersionConfig {
  RuntimeVersionArn?: string;
  Error?: RuntimeVersionError;
}
export interface FunctionConfiguration {
  FunctionName?: string;
  FunctionArn?: string;
  Runtime?: Runtime;
  Role?: string;
  Handler?: string;
  CodeSize?: number;
  Description?: string;
  Timeout?: number;
  MemorySize?: number;
  LastModified?: string;
  CodeSha256?: string;
  Version?: string;
  VpcConfig?: VpcConfigResponse;
  DeadLetterConfig?: DeadLetterConfig;
  Environment?: EnvironmentResponse;
  KMSKeyArn?: string;
  TracingConfig?: TracingConfigResponse;
  MasterArn?: string;
  RevisionId?: string;
  Layers?: Layer[];
  State?: State;
  StateReason?: string;
  StateReasonCode?: StateReasonCode;
  LastUpdateStatus?: LastUpdateStatus;
  LastUpdateStatusReason?: string;
  LastUpdateStatusReasonCode?: LastUpdateStatusReasonCode;
  FileSystemConfigs?: FileSystemConfig[];
  SigningProfileVersionArn?: string;
  SigningJobArn?: string;
  PackageType?: PackageType;
  ImageConfigResponse?: ImageConfigResponse;
  Architectures?: Architecture[];
  EphemeralStorage?: EphemeralStorage;
  SnapStart?: SnapStartResponse;
  RuntimeVersionConfig?: RuntimeVersionConfig;
  LoggingConfig?: LoggingConfig;
  TenancyConfig?: TenancyConfig;
  CapacityProviderConfig?: CapacityProviderConfig;
  ConfigSha256?: string;
  DurableConfig?: DurableConfig;
}
export type FunctionUrlFunctionName = string;
export type FunctionUrlQualifier = string;
export type AllowCredentials = boolean;
export type Header = string;
export type HeadersList = string[];
export type Method = string;
export type AllowMethodsList = string[];
export type Origin = string;
export type AllowOriginsList = string[];
export type MaxAge = number;
export interface Cors {
  AllowCredentials?: boolean;
  AllowHeaders?: string[];
  AllowMethods?: string[];
  AllowOrigins?: string[];
  ExposeHeaders?: string[];
  MaxAge?: number;
}
export type InvokeMode = "BUFFERED" | "RESPONSE_STREAM" | (string & {});
export interface CreateFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  InvokeMode?: InvokeMode;
}
export type FunctionUrl = string;
export interface CreateFunctionUrlConfigResponse {
  FunctionUrl: string;
  FunctionArn: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  CreationTime: string;
  InvokeMode?: InvokeMode;
}
export interface DeleteAliasRequest {
  FunctionName: string;
  Name: string;
}
export interface DeleteAliasResponse {}
export interface DeleteCapacityProviderRequest {
  CapacityProviderName: string;
}
export interface DeleteCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export interface DeleteCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
}
export interface DeleteCodeSigningConfigResponse {}
export interface DeleteEventSourceMappingRequest {
  UUID: string;
}
export interface DeleteFunctionRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface DeleteFunctionResponse {
  StatusCode?: number;
}
export interface DeleteFunctionCodeSigningConfigRequest {
  FunctionName: string;
}
export interface DeleteFunctionCodeSigningConfigResponse {}
export interface DeleteFunctionConcurrencyRequest {
  FunctionName: string;
}
export interface DeleteFunctionConcurrencyResponse {}
export interface DeleteFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface DeleteFunctionEventInvokeConfigResponse {}
export interface DeleteFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface DeleteFunctionUrlConfigResponse {}
export interface DeleteLayerVersionRequest {
  LayerName: string;
  VersionNumber: number;
}
export interface DeleteLayerVersionResponse {}
export type Qualifier = string;
export interface DeleteProvisionedConcurrencyConfigRequest {
  FunctionName: string;
  Qualifier: string;
}
export interface DeleteProvisionedConcurrencyConfigResponse {}
export type PolicyResourceArn = string;
export type RevisionId = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
  RevisionId?: string;
}
export interface DeleteResourcePolicyResponse {}
export interface GetAccountSettingsRequest {}
export type UnreservedConcurrentExecutions = number;
export interface AccountLimit {
  TotalCodeSize?: number;
  CodeSizeUnzipped?: number;
  CodeSizeZipped?: number;
  ConcurrentExecutions?: number;
  UnreservedConcurrentExecutions?: number;
}
export interface AccountUsage {
  TotalCodeSize?: number;
  FunctionCount?: number;
}
export interface GetAccountSettingsResponse {
  AccountLimit?: AccountLimit;
  AccountUsage?: AccountUsage;
}
export interface GetAliasRequest {
  FunctionName: string;
  Name: string;
}
export interface GetCapacityProviderRequest {
  CapacityProviderName: string;
}
export interface GetCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export interface GetCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
}
export interface GetCodeSigningConfigResponse {
  CodeSigningConfig: CodeSigningConfig;
}
export type IncludeExecutionData = boolean;
export interface GetDurableExecutionRequest {
  DurableExecutionArn: string;
  IncludeExecutionData?: boolean;
}
export type DurableExecutionName = string;
export type OutputPayload = string | redacted.Redacted<string>;
export type ExecutionStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | "STOPPED"
  | (string & {});
export type XAmznTraceId = string;
export interface TraceHeader {
  XAmznTraceId?: string;
}
export type ExecutionDataIncluded = boolean;
export interface GetDurableExecutionResponse {
  DurableExecutionArn: string;
  DurableExecutionName: string;
  FunctionArn: string;
  InputPayload?: string | redacted.Redacted<string>;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
  StartTimestamp: Date;
  Status: ExecutionStatus;
  EndTimestamp?: Date;
  Version?: string;
  TraceHeader?: TraceHeader;
  ExecutionDataIncluded?: boolean;
  DurableConfig?: DurableConfig;
}
export type ItemCount = number;
export type ReverseOrder = boolean;
export interface GetDurableExecutionHistoryRequest {
  DurableExecutionArn: string;
  IncludeExecutionData?: boolean;
  MaxItems?: number;
  Marker?: string;
  ReverseOrder?: boolean;
}
export type EventType =
  | "ExecutionStarted"
  | "ExecutionSucceeded"
  | "ExecutionFailed"
  | "ExecutionTimedOut"
  | "ExecutionStopped"
  | "ContextStarted"
  | "ContextSucceeded"
  | "ContextFailed"
  | "WaitStarted"
  | "WaitSucceeded"
  | "WaitCancelled"
  | "StepStarted"
  | "StepSucceeded"
  | "StepFailed"
  | "ChainedInvokeStarted"
  | "ChainedInvokeSucceeded"
  | "ChainedInvokeFailed"
  | "ChainedInvokeTimedOut"
  | "ChainedInvokeStopped"
  | "CallbackStarted"
  | "CallbackSucceeded"
  | "CallbackFailed"
  | "CallbackTimedOut"
  | "InvocationCompleted"
  | (string & {});
export type EventId = number;
export type Truncated = boolean;
export interface EventInput {
  Payload?: string | redacted.Redacted<string>;
  Truncated?: boolean;
}
export interface ExecutionStartedDetails {
  Input: EventInput;
  ExecutionTimeout: number;
}
export interface EventResult {
  Payload?: string | redacted.Redacted<string>;
  Truncated?: boolean;
}
export interface ExecutionSucceededDetails {
  Result: EventResult;
}
export interface EventError {
  Payload?: ErrorObject;
  Truncated?: boolean;
}
export interface ExecutionFailedDetails {
  Error: EventError;
}
export interface ExecutionTimedOutDetails {
  Error?: EventError;
}
export interface ExecutionStoppedDetails {
  Error: EventError;
}
export interface ContextStartedDetails {}
export interface ContextSucceededDetails {
  Result: EventResult;
}
export interface ContextFailedDetails {
  Error: EventError;
}
export interface WaitStartedDetails {
  Duration: number;
  ScheduledEndTimestamp: Date;
}
export interface WaitSucceededDetails {
  Duration?: number;
}
export interface WaitCancelledDetails {
  Error?: EventError;
}
export interface StepStartedDetails {}
export interface RetryDetails {
  CurrentAttempt?: number;
  NextAttemptDelaySeconds?: number;
}
export interface StepSucceededDetails {
  Result: EventResult;
  RetryDetails: RetryDetails;
}
export interface StepFailedDetails {
  Error: EventError;
  RetryDetails: RetryDetails;
}
export interface ChainedInvokeStartedDetails {
  FunctionName: string;
  TenantId?: string;
  Input?: EventInput;
  ExecutedVersion?: string;
  DurableExecutionArn?: string;
}
export interface ChainedInvokeSucceededDetails {
  Result: EventResult;
}
export interface ChainedInvokeFailedDetails {
  Error: EventError;
}
export interface ChainedInvokeTimedOutDetails {
  Error: EventError;
}
export interface ChainedInvokeStoppedDetails {
  Error: EventError;
}
export interface CallbackStartedDetails {
  CallbackId: string;
  HeartbeatTimeout?: number;
  Timeout?: number;
}
export interface CallbackSucceededDetails {
  Result: EventResult;
}
export interface CallbackFailedDetails {
  Error: EventError;
}
export interface CallbackTimedOutDetails {
  Error: EventError;
}
export interface InvocationCompletedDetails {
  StartTimestamp: Date;
  EndTimestamp: Date;
  RequestId: string;
  Error?: EventError;
}
export interface Event {
  EventType?: EventType;
  SubType?: string;
  EventId?: number;
  Id?: string;
  Name?: string;
  EventTimestamp?: Date;
  ParentId?: string;
  ExecutionStartedDetails?: ExecutionStartedDetails;
  ExecutionSucceededDetails?: ExecutionSucceededDetails;
  ExecutionFailedDetails?: ExecutionFailedDetails;
  ExecutionTimedOutDetails?: ExecutionTimedOutDetails;
  ExecutionStoppedDetails?: ExecutionStoppedDetails;
  ContextStartedDetails?: ContextStartedDetails;
  ContextSucceededDetails?: ContextSucceededDetails;
  ContextFailedDetails?: ContextFailedDetails;
  WaitStartedDetails?: WaitStartedDetails;
  WaitSucceededDetails?: WaitSucceededDetails;
  WaitCancelledDetails?: WaitCancelledDetails;
  StepStartedDetails?: StepStartedDetails;
  StepSucceededDetails?: StepSucceededDetails;
  StepFailedDetails?: StepFailedDetails;
  ChainedInvokeStartedDetails?: ChainedInvokeStartedDetails;
  ChainedInvokeSucceededDetails?: ChainedInvokeSucceededDetails;
  ChainedInvokeFailedDetails?: ChainedInvokeFailedDetails;
  ChainedInvokeTimedOutDetails?: ChainedInvokeTimedOutDetails;
  ChainedInvokeStoppedDetails?: ChainedInvokeStoppedDetails;
  CallbackStartedDetails?: CallbackStartedDetails;
  CallbackSucceededDetails?: CallbackSucceededDetails;
  CallbackFailedDetails?: CallbackFailedDetails;
  CallbackTimedOutDetails?: CallbackTimedOutDetails;
  InvocationCompletedDetails?: InvocationCompletedDetails;
}
export type Events = Event[];
export interface GetDurableExecutionHistoryResponse {
  Events: Event[];
  NextMarker?: string;
}
export interface GetDurableExecutionStateRequest {
  DurableExecutionArn: string;
  CheckpointToken: string;
  Marker?: string;
  MaxItems?: number;
}
export interface GetDurableExecutionStateResponse {
  Operations: Operation[];
  NextMarker?: string;
}
export interface GetEventSourceMappingRequest {
  UUID: string;
}
export interface GetFunctionRequest {
  FunctionName: string;
  Qualifier?: string;
}
export type SensitiveStringOnServerOnly = string;
export interface ResolvedS3Object {
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
}
export interface FunctionCodeLocationError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export interface FunctionCodeLocation {
  RepositoryType?: string;
  Location?: string;
  ImageUri?: string;
  ResolvedImageUri?: string;
  ResolvedS3Object?: ResolvedS3Object;
  SourceKMSKeyArn?: string;
  Error?: FunctionCodeLocationError;
}
export type TagsErrorCode = string;
export type TagsErrorMessage = string;
export interface TagsError {
  ErrorCode: string;
  Message: string;
}
export type ReservedConcurrentExecutions = number;
export interface Concurrency {
  ReservedConcurrentExecutions?: number;
}
export interface GetFunctionResponse {
  Configuration?: FunctionConfiguration;
  Code?: FunctionCodeLocation;
  Tags?: { [key: string]: string | undefined };
  TagsError?: TagsError;
  Concurrency?: Concurrency;
}
export interface GetFunctionCodeSigningConfigRequest {
  FunctionName: string;
}
export interface GetFunctionCodeSigningConfigResponse {
  CodeSigningConfigArn: string;
  FunctionName: string;
}
export interface GetFunctionConcurrencyRequest {
  FunctionName: string;
}
export interface GetFunctionConcurrencyResponse {
  ReservedConcurrentExecutions?: number;
}
export interface GetFunctionConfigurationRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface GetFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export type MaximumRetryAttempts = number;
export type MaximumEventAgeInSeconds = number;
export interface FunctionEventInvokeConfig {
  LastModified?: Date;
  FunctionArn?: string;
  MaximumRetryAttempts?: number;
  MaximumEventAgeInSeconds?: number;
  DestinationConfig?: DestinationConfig;
}
export type UnqualifiedFunctionName = string;
export interface GetFunctionRecursionConfigRequest {
  FunctionName: string;
}
export type RecursiveLoop = "Allow" | "Terminate" | (string & {});
export interface GetFunctionRecursionConfigResponse {
  RecursiveLoop?: RecursiveLoop;
}
export type PublishedFunctionQualifier = string;
export interface GetFunctionScalingConfigRequest {
  FunctionName: string;
  Qualifier: string;
}
export type FunctionScalingConfigExecutionEnvironments = number;
export interface FunctionScalingConfig {
  MinExecutionEnvironments?: number;
  MaxExecutionEnvironments?: number;
}
export interface GetFunctionScalingConfigResponse {
  FunctionArn?: string;
  AppliedFunctionScalingConfig?: FunctionScalingConfig;
  RequestedFunctionScalingConfig?: FunctionScalingConfig;
}
export interface GetFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface GetFunctionUrlConfigResponse {
  FunctionUrl: string;
  FunctionArn: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  CreationTime: string;
  LastModifiedTime: string;
  InvokeMode?: InvokeMode;
}
export interface GetLayerVersionRequest {
  LayerName: string;
  VersionNumber: number;
}
export interface LayerVersionContentOutput {
  Location?: string;
  CodeSha256?: string;
  CodeSize?: number;
  SigningProfileVersionArn?: string;
  SigningJobArn?: string;
  ResolvedS3Object?: ResolvedS3Object;
}
export type LayerArn = string;
export type CompatibleArchitectures = Architecture[];
export type CompatibleRuntimes = Runtime[];
export type LicenseInfo = string;
export interface GetLayerVersionResponse {
  Content?: LayerVersionContentOutput;
  LayerArn?: string;
  LayerVersionArn?: string;
  Description?: string;
  CreatedDate?: string;
  Version?: number;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export interface GetLayerVersionByArnRequest {
  Arn: string;
}
export interface GetLayerVersionPolicyRequest {
  LayerName: string;
  VersionNumber: number;
}
export interface GetLayerVersionPolicyResponse {
  Policy?: string;
  RevisionId?: string;
}
export interface GetPolicyRequest {
  FunctionName: string;
  Qualifier?: string;
}
export interface GetPolicyResponse {
  Policy?: string;
  RevisionId?: string;
}
export interface GetProvisionedConcurrencyConfigRequest {
  FunctionName: string;
  Qualifier: string;
}
export type PositiveInteger = number;
export type NonNegativeInteger = number;
export type ProvisionedConcurrencyStatusEnum = "IN_PROGRESS" | "READY" | "FAILED" | (string & {});
export interface GetProvisionedConcurrencyConfigResponse {
  RequestedProvisionedConcurrentExecutions?: number;
  AvailableProvisionedConcurrentExecutions?: number;
  AllocatedProvisionedConcurrentExecutions?: number;
  Status?: ProvisionedConcurrencyStatusEnum;
  StatusReason?: string;
  LastModified?: string;
}
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export type ResourcePolicy = string;
export interface GetResourcePolicyResponse {
  Policy?: string;
  RevisionId?: string;
}
export interface GetRuntimeManagementConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export type UpdateRuntimeOn = "Auto" | "Manual" | "FunctionUpdate" | (string & {});
export interface GetRuntimeManagementConfigResponse {
  UpdateRuntimeOn?: UpdateRuntimeOn;
  FunctionArn?: string;
  RuntimeVersionArn?: string;
}
export type InvocationType = "Event" | "RequestResponse" | "DryRun" | (string & {});
export type LogType = "None" | "Tail" | (string & {});
export interface InvocationRequest {
  FunctionName: string;
  InvocationType?: InvocationType;
  LogType?: LogType;
  ClientContext?: string;
  DurableExecutionName?: string;
  Payload?: T.StreamingInputBody;
  Qualifier?: string;
  TenantId?: string;
}
export interface InvocationResponse {
  StatusCode?: number;
  FunctionError?: string;
  LogResult?: string;
  Payload?: T.StreamingOutputBody;
  ExecutedVersion?: string;
  DurableExecutionArn?: string;
}
export interface InvokeAsyncRequest {
  FunctionName: string;
  InvokeArgs: T.StreamingInputBody;
}
export type HttpStatus = number;
export interface InvokeAsyncResponse {
  Status?: number;
}
export type ResponseStreamingInvocationType = "RequestResponse" | "DryRun" | (string & {});
export interface InvokeWithResponseStreamRequest {
  FunctionName: string;
  LogType?: LogType;
  ClientContext?: string;
  Qualifier?: string;
  Payload?: T.StreamingInputBody;
  TenantId?: string;
  InvocationType?: ResponseStreamingInvocationType;
}
export interface InvokeResponseStreamUpdate {
  Payload?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface InvokeWithResponseStreamCompleteEvent {
  ErrorCode?: string;
  ErrorDetails?: string;
  LogResult?: string;
}
export type InvokeWithResponseStreamResponseEvent =
  | { PayloadChunk: InvokeResponseStreamUpdate; InvokeComplete?: never }
  | { PayloadChunk?: never; InvokeComplete: InvokeWithResponseStreamCompleteEvent };
export interface InvokeWithResponseStreamResponse {
  StatusCode?: number;
  ExecutedVersion?: string;
  EventStream?: stream.Stream<InvokeWithResponseStreamResponseEvent, Error, never>;
  ResponseStreamContentType?: string;
}
export type MaxListItems = number;
export interface ListAliasesRequest {
  FunctionName: string;
  FunctionVersion?: string;
  Marker?: string;
  MaxItems?: number;
}
export type AliasList = AliasConfiguration[];
export interface ListAliasesResponse {
  NextMarker?: string;
  Aliases?: AliasConfiguration[];
}
export type MaxFiftyListItems = number;
export interface ListCapacityProvidersRequest {
  State?: CapacityProviderState;
  Marker?: string;
  MaxItems?: number;
}
export type CapacityProvidersList = CapacityProvider[];
export interface ListCapacityProvidersResponse {
  CapacityProviders: CapacityProvider[];
  NextMarker?: string;
}
export interface ListCodeSigningConfigsRequest {
  Marker?: string;
  MaxItems?: number;
}
export type CodeSigningConfigList = CodeSigningConfig[];
export interface ListCodeSigningConfigsResponse {
  NextMarker?: string;
  CodeSigningConfigs?: CodeSigningConfig[];
}
export type ExecutionStatusList = ExecutionStatus[];
export interface ListDurableExecutionsByFunctionRequest {
  FunctionName: string;
  Qualifier?: string;
  DurableExecutionName?: string;
  Statuses?: ExecutionStatus[];
  StartedAfter?: Date;
  StartedBefore?: Date;
  ReverseOrder?: boolean;
  Marker?: string;
  MaxItems?: number;
}
export interface Execution {
  DurableExecutionArn: string;
  DurableExecutionName: string;
  FunctionArn: string;
  Status: ExecutionStatus;
  StartTimestamp: Date;
  EndTimestamp?: Date;
  KMSKeyArn?: string;
}
export type DurableExecutions = Execution[];
export interface ListDurableExecutionsByFunctionResponse {
  DurableExecutions?: Execution[];
  NextMarker?: string;
}
export interface ListEventSourceMappingsRequest {
  EventSourceArn?: string;
  FunctionName?: string;
  Marker?: string;
  MaxItems?: number;
}
export type EventSourceMappingsList = EventSourceMappingConfiguration[];
export interface ListEventSourceMappingsResponse {
  NextMarker?: string;
  EventSourceMappings?: EventSourceMappingConfiguration[];
}
export type MaxFunctionEventInvokeConfigListItems = number;
export interface ListFunctionEventInvokeConfigsRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export type FunctionEventInvokeConfigList = FunctionEventInvokeConfig[];
export interface ListFunctionEventInvokeConfigsResponse {
  FunctionEventInvokeConfigs?: FunctionEventInvokeConfig[];
  NextMarker?: string;
}
export type MasterRegion = string;
export type FunctionVersion = "ALL" | (string & {});
export interface ListFunctionsRequest {
  MasterRegion?: string;
  FunctionVersion?: FunctionVersion;
  Marker?: string;
  MaxItems?: number;
}
export type FunctionList = FunctionConfiguration[];
export interface ListFunctionsResponse {
  NextMarker?: string;
  Functions?: FunctionConfiguration[];
}
export interface ListFunctionsByCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
  Marker?: string;
  MaxItems?: number;
}
export type FunctionArnList = string[];
export interface ListFunctionsByCodeSigningConfigResponse {
  NextMarker?: string;
  FunctionArns?: string[];
}
export type MaxItems = number;
export interface ListFunctionUrlConfigsRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface FunctionUrlConfig {
  FunctionUrl: string;
  FunctionArn: string;
  CreationTime: string;
  LastModifiedTime: string;
  Cors?: Cors;
  AuthType: FunctionUrlAuthType;
  InvokeMode?: InvokeMode;
}
export type FunctionUrlConfigList = FunctionUrlConfig[];
export interface ListFunctionUrlConfigsResponse {
  FunctionUrlConfigs: FunctionUrlConfig[];
  NextMarker?: string;
}
export interface ListFunctionVersionsByCapacityProviderRequest {
  CapacityProviderName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface FunctionVersionsByCapacityProviderListItem {
  FunctionArn: string;
  State: State;
}
export type FunctionVersionsByCapacityProviderList = FunctionVersionsByCapacityProviderListItem[];
export interface ListFunctionVersionsByCapacityProviderResponse {
  CapacityProviderArn: string;
  FunctionVersions: FunctionVersionsByCapacityProviderListItem[];
  NextMarker?: string;
}
export type MaxLayerListItems = number;
export interface ListLayersRequest {
  CompatibleArchitecture?: Architecture;
  CompatibleRuntime?: Runtime;
  Marker?: string;
  MaxItems?: number;
}
export interface LayerVersionsListItem {
  LayerVersionArn?: string;
  Version?: number;
  Description?: string;
  CreatedDate?: string;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export interface LayersListItem {
  LayerName?: string;
  LayerArn?: string;
  LatestMatchingVersion?: LayerVersionsListItem;
}
export type LayersList = LayersListItem[];
export interface ListLayersResponse {
  NextMarker?: string;
  Layers?: LayersListItem[];
}
export interface ListLayerVersionsRequest {
  CompatibleArchitecture?: Architecture;
  CompatibleRuntime?: Runtime;
  LayerName: string;
  Marker?: string;
  MaxItems?: number;
}
export type LayerVersionsList = LayerVersionsListItem[];
export interface ListLayerVersionsResponse {
  NextMarker?: string;
  LayerVersions?: LayerVersionsListItem[];
}
export type MaxProvisionedConcurrencyConfigListItems = number;
export interface ListProvisionedConcurrencyConfigsRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ProvisionedConcurrencyConfigListItem {
  FunctionArn?: string;
  RequestedProvisionedConcurrentExecutions?: number;
  AvailableProvisionedConcurrentExecutions?: number;
  AllocatedProvisionedConcurrentExecutions?: number;
  Status?: ProvisionedConcurrencyStatusEnum;
  StatusReason?: string;
  LastModified?: string;
}
export type ProvisionedConcurrencyConfigList = ProvisionedConcurrencyConfigListItem[];
export interface ListProvisionedConcurrencyConfigsResponse {
  ProvisionedConcurrencyConfigs?: ProvisionedConcurrencyConfigListItem[];
  NextMarker?: string;
}
export type TaggableResource = string;
export interface ListTagsRequest {
  Resource: string;
}
export interface ListTagsResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListVersionsByFunctionRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export interface ListVersionsByFunctionResponse {
  NextMarker?: string;
  Versions?: FunctionConfiguration[];
}
export interface LayerVersionContentInput {
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  S3ObjectStorageMode?: S3ObjectStorageMode;
  ZipFile?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface PublishLayerVersionRequest {
  LayerName: string;
  Description?: string;
  Content: LayerVersionContentInput;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export interface PublishLayerVersionResponse {
  Content?: LayerVersionContentOutput;
  LayerArn?: string;
  LayerVersionArn?: string;
  Description?: string;
  CreatedDate?: string;
  Version?: number;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export interface PublishVersionRequest {
  FunctionName: string;
  CodeSha256?: string;
  Description?: string;
  RevisionId?: string;
  PublishTo?: FunctionVersionLatestPublished;
}
export interface PutFunctionCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
  FunctionName: string;
}
export interface PutFunctionCodeSigningConfigResponse {
  CodeSigningConfigArn: string;
  FunctionName: string;
}
export interface PutFunctionConcurrencyRequest {
  FunctionName: string;
  ReservedConcurrentExecutions: number;
}
export interface PutFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  MaximumRetryAttempts?: number;
  MaximumEventAgeInSeconds?: number;
  DestinationConfig?: DestinationConfig;
}
export interface PutFunctionRecursionConfigRequest {
  FunctionName: string;
  RecursiveLoop: RecursiveLoop;
}
export interface PutFunctionRecursionConfigResponse {
  RecursiveLoop?: RecursiveLoop;
}
export interface PutFunctionScalingConfigRequest {
  FunctionName: string;
  Qualifier: string;
  FunctionScalingConfig?: FunctionScalingConfig;
}
export interface PutFunctionScalingConfigResponse {
  FunctionState?: State;
}
export interface PutProvisionedConcurrencyConfigRequest {
  FunctionName: string;
  Qualifier: string;
  ProvisionedConcurrentExecutions: number;
}
export interface PutProvisionedConcurrencyConfigResponse {
  RequestedProvisionedConcurrentExecutions?: number;
  AllocatedProvisionedConcurrentExecutions?: number;
  AvailableProvisionedConcurrentExecutions?: number;
  Status?: ProvisionedConcurrencyStatusEnum;
  StatusReason?: string;
  LastModified?: string;
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
  RevisionId?: string;
}
export interface PutResourcePolicyResponse {
  Policy?: string;
  RevisionId?: string;
}
export interface PutRuntimeManagementConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  UpdateRuntimeOn: UpdateRuntimeOn;
  RuntimeVersionArn?: string;
}
export interface PutRuntimeManagementConfigResponse {
  UpdateRuntimeOn: UpdateRuntimeOn;
  FunctionArn: string;
  RuntimeVersionArn?: string;
}
export interface RemoveLayerVersionPermissionRequest {
  LayerName: string;
  VersionNumber: number;
  StatementId: string;
  RevisionId?: string;
}
export interface RemoveLayerVersionPermissionResponse {}
export type NamespacedStatementId = string;
export interface RemovePermissionRequest {
  FunctionName: string;
  StatementId: string;
  Qualifier?: string;
  RevisionId?: string;
}
export interface RemovePermissionResponse {}
export interface SendDurableExecutionCallbackFailureRequest {
  CallbackId: string;
  Error?: ErrorObject;
}
export interface SendDurableExecutionCallbackFailureResponse {}
export interface SendDurableExecutionCallbackHeartbeatRequest {
  CallbackId: string;
}
export interface SendDurableExecutionCallbackHeartbeatResponse {}
export interface SendDurableExecutionCallbackSuccessRequest {
  CallbackId: string;
  Result?: T.StreamingInputBody;
}
export interface SendDurableExecutionCallbackSuccessResponse {}
export interface StopDurableExecutionRequest {
  DurableExecutionArn: string;
  Error?: ErrorObject;
}
export interface StopDurableExecutionResponse {
  StopTimestamp: Date;
}
export interface TagResourceRequest {
  Resource: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  Resource: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAliasRequest {
  FunctionName: string;
  Name: string;
  FunctionVersion?: string;
  Description?: string;
  RoutingConfig?: AliasRoutingConfiguration;
  RevisionId?: string;
}
export interface UpdateCapacityProviderRequest {
  CapacityProviderName: string;
  CapacityProviderScalingConfig?: CapacityProviderScalingConfig;
  PropagateTags?: PropagateTags;
  TelemetryConfig?: CapacityProviderTelemetryConfig;
}
export interface UpdateCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export interface UpdateCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
  Description?: string;
  AllowedPublishers?: AllowedPublishers;
  CodeSigningPolicies?: CodeSigningPolicies;
}
export interface UpdateCodeSigningConfigResponse {
  CodeSigningConfig: CodeSigningConfig;
}
export interface UpdateEventSourceMappingRequest {
  UUID: string;
  FunctionName?: string;
  Enabled?: boolean;
  BatchSize?: number;
  FilterCriteria?: FilterCriteria;
  KMSKeyArn?: string;
  MetricsConfig?: EventSourceMappingMetricsConfig;
  LoggingConfig?: EventSourceMappingLoggingConfig;
  ScalingConfig?: ScalingConfig;
  MaximumBatchingWindowInSeconds?: number;
  ParallelizationFactor?: number;
  DestinationConfig?: DestinationConfig;
  MaximumRecordAgeInSeconds?: number;
  BisectBatchOnFunctionError?: boolean;
  MaximumRetryAttempts?: number;
  TumblingWindowInSeconds?: number;
  SourceAccessConfigurations?: SourceAccessConfiguration[];
  FunctionResponseTypes?: FunctionResponseType[];
  AmazonManagedKafkaEventSourceConfig?: AmazonManagedKafkaEventSourceConfig;
  SelfManagedKafkaEventSourceConfig?: SelfManagedKafkaEventSourceConfig;
  DocumentDBEventSourceConfig?: DocumentDBEventSourceConfig;
  ProvisionedPollerConfig?: ProvisionedPollerConfig;
}
export interface UpdateFunctionCodeRequest {
  FunctionName: string;
  ZipFile?: Uint8Array | redacted.Redacted<Uint8Array>;
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  S3ObjectStorageMode?: S3ObjectStorageMode;
  ImageUri?: string;
  Architectures?: Architecture[];
  Publish?: boolean;
  PublishTo?: FunctionVersionLatestPublished;
  DryRun?: boolean;
  RevisionId?: string;
  SourceKMSKeyArn?: string;
}
export interface UpdateFunctionConfigurationRequest {
  FunctionName: string;
  Role?: string;
  Handler?: string;
  Description?: string;
  Timeout?: number;
  MemorySize?: number;
  VpcConfig?: VpcConfig;
  Environment?: Environment;
  Runtime?: Runtime;
  DeadLetterConfig?: DeadLetterConfig;
  KMSKeyArn?: string;
  TracingConfig?: TracingConfig;
  RevisionId?: string;
  Layers?: string[];
  FileSystemConfigs?: FileSystemConfig[];
  ImageConfig?: ImageConfig;
  EphemeralStorage?: EphemeralStorage;
  SnapStart?: SnapStart;
  LoggingConfig?: LoggingConfig;
  CapacityProviderConfig?: CapacityProviderConfig;
  DurableConfig?: DurableConfig;
}
export interface UpdateFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  MaximumRetryAttempts?: number;
  MaximumEventAgeInSeconds?: number;
  DestinationConfig?: DestinationConfig;
}
export interface UpdateFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  AuthType?: FunctionUrlAuthType;
  Cors?: Cors;
  InvokeMode?: InvokeMode;
}
export interface UpdateFunctionUrlConfigResponse {
  FunctionUrl: string;
  FunctionArn: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  CreationTime: string;
  LastModifiedTime: string;
  InvokeMode?: InvokeMode;
}
export type ThrottleReason =
  | "ConcurrentInvocationLimitExceeded"
  | "FunctionInvocationRateLimitExceeded"
  | "ReservedFunctionConcurrentInvocationLimitExceeded"
  | "ReservedFunctionInvocationRateLimitExceeded"
  | "CallerRateLimitExceeded"
  | "ConcurrentSnapshotCreateLimitExceeded"
  | (string & {});
export type AddLayerVersionPermissionError =
  | InvalidParameterValueException
  | PolicyLengthExceededException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Adds permissions to the resource-based policy of a version of an Lambda layer. Use this action to grant layer usage permission to other accounts. You can grant permission to a single account, all accounts in an organization, or all Amazon Web Services accounts.
 *
 * To revoke permission, call RemoveLayerVersionPermission with the statement ID that you specified when you added it.
 */
export const addLayerVersionPermission: API.OperationMethod<
  AddLayerVersionPermissionRequest,
  AddLayerVersionPermissionResponse,
  AddLayerVersionPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<AddLayerVersionPermissionRequest>,
  output: __S(1825, __c57, 1) as any as S.Schema<AddLayerVersionPermissionResponse>,
  errors: [
    InvalidParameterValueException,
    PolicyLengthExceededException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddLayerVersionPermission",
}));

export type AddPermissionError =
  | InvalidParameterValueException
  | PolicyLengthExceededException
  | PreconditionFailedException
  | PublicPolicyException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Grants a principal permission to use a function. You can apply the policy at the function level, or specify a qualifier to restrict access to a single version or alias. If you use a qualifier, the invoker must use the full Amazon Resource Name (ARN) of that version or alias to invoke the function. Note: Lambda does not support adding policies to version $LATEST.
 *
 * To grant permission to another account, specify the account ID as the `Principal`. To grant permission to an organization defined in Organizations, specify the organization ID as the `PrincipalOrgID`. For Amazon Web Services services, the principal is a domain-style identifier that the service defines, such as `s3.amazonaws.com` or `sns.amazonaws.com`. For Amazon Web Services services, you can also specify the ARN of the associated resource as the `SourceArn`. If you grant permission to a service principal without specifying the source, other accounts could potentially configure resources in their account to invoke your Lambda function.
 *
 * This operation adds a statement to a resource-based permissions policy for the function. For more information about function policies, see Using resource-based policies for Lambda.
 */
export const addPermission: API.OperationMethod<
  AddPermissionRequest,
  AddPermissionResponse,
  AddPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<AddPermissionRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<AddPermissionResponse>,
  errors: [
    InvalidParameterValueException,
    PolicyLengthExceededException,
    PreconditionFailedException,
    PublicPolicyException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddPermission",
}));

export type CheckpointDurableExecutionError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Saves the progress of a durable function execution during runtime. This API is used by the Lambda durable functions SDK to checkpoint completed steps and schedule asynchronous operations. You typically don't need to call this API directly as the SDK handles checkpointing automatically.
 *
 * Each checkpoint operation consumes the current checkpoint token and returns a new one for the next checkpoint. This ensures that checkpoints are applied in the correct order and prevents duplicate or out-of-order state updates.
 */
export const checkpointDurableExecution: API.OperationMethod<
  CheckpointDurableExecutionRequest,
  CheckpointDurableExecutionResponse,
  CheckpointDurableExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1895, __c59, 7) as any as S.Schema<CheckpointDurableExecutionRequest>,
  output: __S(1897, __c59, 9) as any as S.Schema<CheckpointDurableExecutionResponse>,
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckpointDurableExecution",
}));

export type CreateAliasError =
  | AliasLimitExceededException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates an alias for a Lambda Event Function version. Use aliases to provide clients with a function identifier that you can update to invoke a different version.
 *
 * You can also map an alias to split invocation requests between two versions. Use the `RoutingConfig` parameter to specify a second version and the percentage of invocation requests that it receives.
 */
export const createAlias: API.OperationMethod<
  CreateAliasRequest,
  AliasConfiguration,
  CreateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<CreateAliasRequest>,
  output: __S(2018, __c63, 2) as any as S.Schema<AliasConfiguration>,
  errors: [
    AliasLimitExceededException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAlias",
}));

export type CreateCapacityProviderError =
  | CapacityProviderLimitExceededException
  | InvalidParameterValueException
  | ResourceConflictException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a capacity provider that manages compute resources for Lambda Event Functions
 */
export const createCapacityProvider: API.OperationMethod<
  CreateCapacityProviderRequest,
  CreateCapacityProviderResponse,
  CreateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<CreateCapacityProviderRequest>,
  output: __S(2208, __c69, 0) as any as S.Schema<CreateCapacityProviderResponse>,
  errors: [
    CapacityProviderLimitExceededException,
    InvalidParameterValueException,
    ResourceConflictException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapacityProvider",
}));

export type CreateCodeSigningConfigError =
  | InvalidParameterValueException
  | ServiceException
  | CommonErrors;
/**
 * Creates a code signing configuration. A code signing configuration defines a list of allowed signing profiles and defines the code-signing validation policy (action to be taken if deployment validation checks fail).
 */
export const createCodeSigningConfig: API.OperationMethod<
  CreateCodeSigningConfigRequest,
  CreateCodeSigningConfigResponse,
  CreateCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<CreateCodeSigningConfigRequest>,
  output: __S(2304, __c72, 0) as any as S.Schema<CreateCodeSigningConfigResponse>,
  errors: [InvalidParameterValueException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCodeSigningConfig",
}));

export type CreateEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ResourceInUseException
  | ExecutionRoleNotAssumable
  | ExecutionRoleMissingPermissions
  | CommonErrors;
/**
 * Creates a mapping between an event source and an Lambda Event Function. Lambda reads items from the event source and invokes the function.
 *
 * For details about how to configure different event sources, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 *
 * The following error handling options are available for stream sources (DynamoDB, Kinesis, Amazon MSK, and self-managed Apache Kafka):
 *
 * - `BisectBatchOnFunctionError` - If the function returns an error, split the batch in two and retry.
 *
 * - `MaximumRecordAgeInSeconds` - Discard records older than the specified age. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires
 *
 * - `MaximumRetryAttempts` - Discard records after the specified number of retries. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires.
 *
 * - `OnFailure` - Send discarded records to an Amazon SQS queue, Amazon SNS topic, Kafka topic, or Amazon S3 bucket. For more information, see Adding a destination.
 *
 * The following option is available only for DynamoDB and Kinesis event sources:
 *
 * - `ParallelizationFactor` - Process multiple batches from each shard concurrently.
 *
 * For information about which configuration parameters apply to each event source, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 */
export const createEventSourceMapping: API.OperationMethod<
  CreateEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  CreateEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<CreateEventSourceMappingRequest>,
  output: __S(2385, __c74, 17) as any as S.Schema<EventSourceMappingConfiguration>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ResourceInUseException,
    ExecutionRoleNotAssumable,
    ExecutionRoleMissingPermissions,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventSourceMapping",
}));

export type CreateFunctionError =
  | CodeSigningConfigNotFoundException
  | CodeStorageExceededException
  | CodeVerificationFailedException
  | FunctionVersionsPerCapacityProviderLimitExceededException
  | InvalidCodeSignatureException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | LambdaInternalKmsError
  | ExecutionRoleNotAssumable
  | ExecutionRoleMissingVpcPermissions
  | KmsGrantPrincipalNotReady
  | SecurityGroupNotFound
  | CommonErrors;
/**
 * Creates a Lambda Event Function. To create a function, you need a deployment package and an execution role. The deployment package is a .zip file archive or container image that contains your function code. The execution role grants the function permission to use Amazon Web Services services, such as Amazon CloudWatch Logs for log streaming and X-Ray for request tracing.
 *
 * If the deployment package is a container image, then you set the package type to `Image`. For a container image, the code property must include the URI of a container image in the Amazon ECR registry. You do not need to specify the handler and runtime properties.
 *
 * If the deployment package is a .zip file archive, then you set the package type to `Zip`. For a .zip file archive, the code property specifies the location of the .zip file. You must also specify the handler and runtime properties. The code in the deployment package must be compatible with the target instruction set architecture of the function (`x86-64` or `arm64`). If you do not specify the architecture, then the default value is `x86-64`.
 *
 * When you create a function, Lambda provisions an instance of the function and its supporting resources. If your function connects to a VPC, this process can take a minute or so. During this time, you can't invoke or modify the function. The `State`, `StateReason`, and `StateReasonCode` fields in the response from GetFunctionConfiguration indicate when the function is ready to invoke. For more information, see Lambda function states.
 *
 * A function has an unpublished version, and can have published versions and aliases. The unpublished version changes when you update your function's code and configuration. A published version is a snapshot of your function code and configuration that can't be changed. An alias is a named resource that maps to a version, and can be changed to map to a different version. Use the `Publish` parameter to create version `1` of your function from its initial configuration.
 *
 * The other parameters let you configure version-specific and function-level settings. You can modify version-specific settings later with UpdateFunctionConfiguration. Function-level settings apply to both the unpublished and published versions of the function, and include tags (TagResource) and per-function concurrency limits (PutFunctionConcurrency).
 *
 * You can use code signing if your deployment package is a .zip file archive. To enable code signing for this function, specify the ARN of a code-signing configuration. When a user attempts to deploy a code package with UpdateFunctionCode, Lambda checks that the code package has a valid signature from a trusted publisher. The code-signing configuration includes set of signing profiles, which define the trusted publishers for this function.
 *
 * If another Amazon Web Services account or an Amazon Web Services service invokes your function, use AddPermission to grant permission by creating a resource-based Identity and Access Management (IAM) policy. You can grant permissions at the function level, on a version, or on an alias.
 *
 * To invoke your function directly, use Invoke. To invoke your function in response to events in other Amazon Web Services services, create an event source mapping (CreateEventSourceMapping), or configure a function trigger in the other service. For more information, see Invoking Lambda functions.
 */
export const createFunction: API.OperationMethod<
  CreateFunctionRequest,
  FunctionConfiguration,
  CreateFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2433, __c76, 1) as any as S.Schema<CreateFunctionRequest>,
  output: __S(2548, __c79, 20) as any as S.Schema<FunctionConfiguration>,
  errors: [
    CodeSigningConfigNotFoundException,
    CodeStorageExceededException,
    CodeVerificationFailedException,
    FunctionVersionsPerCapacityProviderLimitExceededException,
    InvalidCodeSignatureException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    LambdaInternalKmsError,
    ExecutionRoleNotAssumable,
    ExecutionRoleMissingVpcPermissions,
    KmsGrantPrincipalNotReady,
    SecurityGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunction",
}));

export type CreateFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates a Lambda function URL with the specified configuration parameters. A function URL is a dedicated HTTP(S) endpoint that you can use to invoke your function.
 */
export const createFunctionUrlConfig: API.OperationMethod<
  CreateFunctionUrlConfigRequest,
  CreateFunctionUrlConfigResponse,
  CreateFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<CreateFunctionUrlConfigRequest>,
  output: __S(2561, __c80, 1) as any as S.Schema<CreateFunctionUrlConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunctionUrlConfig",
}));

export type DeleteAliasError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | CommonErrors;
/**
 * Deletes a Lambda Event Function alias.
 */
export const deleteAlias: API.OperationMethod<
  DeleteAliasRequest,
  DeleteAliasResponse,
  DeleteAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<DeleteAliasRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<DeleteAliasResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlias",
}));

export type DeleteCapacityProviderError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a capacity provider. You cannot delete a capacity provider that is currently being used by Lambda functions.
 */
export const deleteCapacityProvider: API.OperationMethod<
  DeleteCapacityProviderRequest,
  DeleteCapacityProviderResponse,
  DeleteCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<DeleteCapacityProviderRequest>,
  output: __S(2208, __c69, 0) as any as S.Schema<DeleteCapacityProviderResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCapacityProvider",
}));

export type DeleteCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes the code signing configuration. You can delete the code signing configuration only if no function is using it.
 */
export const deleteCodeSigningConfig: API.OperationMethod<
  DeleteCodeSigningConfigRequest,
  DeleteCodeSigningConfigResponse,
  DeleteCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<DeleteCodeSigningConfigRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<DeleteCodeSigningConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCodeSigningConfig",
}));

export type DeleteEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an event source mapping. You can get the identifier of a mapping from the output of ListEventSourceMappings.
 *
 * When you delete an event source mapping, it enters a `Deleting` state and might not be completely deleted for several seconds.
 */
export const deleteEventSourceMapping: API.OperationMethod<
  DeleteEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  DeleteEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<DeleteEventSourceMappingRequest>,
  output: __S(2385, __c74, 17) as any as S.Schema<EventSourceMappingConfiguration>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSourceMapping",
}));

export type DeleteFunctionError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Lambda Event Function. To delete a specific function version, use the `Qualifier` parameter. Otherwise, all versions and aliases are deleted. This doesn't require the user to have explicit permissions for DeleteAlias.
 *
 * A deleted Lambda function cannot be recovered. Ensure that you specify the correct function name and version before deleting.
 *
 * To delete Lambda event source mappings that invoke a function, use DeleteEventSourceMapping. For Amazon Web Services services and resources that invoke your function directly, delete the trigger in the service where you originally configured it.
 */
export const deleteFunction: API.OperationMethod<
  DeleteFunctionRequest,
  DeleteFunctionResponse,
  DeleteFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<DeleteFunctionRequest>,
  output: __S(2785, __c87, 1) as any as S.Schema<DeleteFunctionResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunction",
}));

export type DeleteFunctionCodeSigningConfigError =
  | CodeSigningConfigNotFoundException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the code signing configuration from the function.
 */
export const deleteFunctionCodeSigningConfig: API.OperationMethod<
  DeleteFunctionCodeSigningConfigRequest,
  DeleteFunctionCodeSigningConfigResponse,
  DeleteFunctionCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<DeleteFunctionCodeSigningConfigRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<DeleteFunctionCodeSigningConfigResponse>,
  errors: [
    CodeSigningConfigNotFoundException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionCodeSigningConfig",
}));

export type DeleteFunctionConcurrencyError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Removes a concurrent execution limit from a function.
 */
export const deleteFunctionConcurrency: API.OperationMethod<
  DeleteFunctionConcurrencyRequest,
  DeleteFunctionConcurrencyResponse,
  DeleteFunctionConcurrencyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<DeleteFunctionConcurrencyRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<DeleteFunctionConcurrencyResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionConcurrency",
}));

export type DeleteFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes the configuration for asynchronous invocation for a function, version, or alias.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const deleteFunctionEventInvokeConfig: API.OperationMethod<
  DeleteFunctionEventInvokeConfigRequest,
  DeleteFunctionEventInvokeConfigResponse,
  DeleteFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2880, __c90, 0) as any as S.Schema<DeleteFunctionEventInvokeConfigRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<DeleteFunctionEventInvokeConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionEventInvokeConfig",
}));

export type DeleteFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes a Lambda function URL. When you delete a function URL, you can't recover it. Creating a new function URL results in a different URL address.
 */
export const deleteFunctionUrlConfig: API.OperationMethod<
  DeleteFunctionUrlConfigRequest,
  DeleteFunctionUrlConfigResponse,
  DeleteFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<DeleteFunctionUrlConfigRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<DeleteFunctionUrlConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionUrlConfig",
}));

export type DeleteLayerVersionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes a version of an Lambda layer. Deleted versions can no longer be viewed or added to functions. To avoid breaking functions, a copy of the version remains in Lambda until no functions refer to it.
 */
export const deleteLayerVersion: API.OperationMethod<
  DeleteLayerVersionRequest,
  DeleteLayerVersionResponse,
  DeleteLayerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<DeleteLayerVersionRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<DeleteLayerVersionResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLayerVersion",
}));

export type DeleteProvisionedConcurrencyConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes the provisioned concurrency configuration for a function.
 */
export const deleteProvisionedConcurrencyConfig: API.OperationMethod<
  DeleteProvisionedConcurrencyConfigRequest,
  DeleteProvisionedConcurrencyConfigResponse,
  DeleteProvisionedConcurrencyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<DeleteProvisionedConcurrencyConfigRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<DeleteProvisionedConcurrencyConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisionedConcurrencyConfig",
}));

export type DeleteResourcePolicyError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a resource-based policy from a Lambda resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type GetAccountSettingsError = ServiceException | TooManyRequestsException | CommonErrors;
/**
 * Retrieves details about your account's limits and usage in an Amazon Web Services Region.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsResponse,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<GetAccountSettingsRequest>,
  output: __S(3043, __c95, 3) as any as S.Schema<GetAccountSettingsResponse>,
  errors: [ServiceException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
}));

export type GetAliasError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details about a Lambda Event Function alias.
 */
export const getAlias: API.OperationMethod<
  GetAliasRequest,
  AliasConfiguration,
  GetAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<GetAliasRequest>,
  output: __S(2018, __c63, 2) as any as S.Schema<AliasConfiguration>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAlias",
}));

export type GetCapacityProviderError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a specific capacity provider, including its configuration, state, and associated resources.
 */
export const getCapacityProvider: API.OperationMethod<
  GetCapacityProviderRequest,
  GetCapacityProviderResponse,
  GetCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<GetCapacityProviderRequest>,
  output: __S(2208, __c69, 0) as any as S.Schema<GetCapacityProviderResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityProvider",
}));

export type GetCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns information about the specified code signing configuration.
 */
export const getCodeSigningConfig: API.OperationMethod<
  GetCodeSigningConfigRequest,
  GetCodeSigningConfigResponse,
  GetCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<GetCodeSigningConfigRequest>,
  output: __S(2304, __c72, 0) as any as S.Schema<GetCodeSigningConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodeSigningConfig",
}));

export type GetDurableExecutionError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific durable execution, including its current status, input payload, result or error information, and execution metadata such as start time and usage statistics.
 */
export const getDurableExecution: API.OperationMethod<
  GetDurableExecutionRequest,
  GetDurableExecutionResponse,
  GetDurableExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3168, __c99, 0) as any as S.Schema<GetDurableExecutionRequest>,
  output: __S(3170, __c99, 2) as any as S.Schema<GetDurableExecutionResponse>,
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDurableExecution",
}));

export type GetDurableExecutionHistoryError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the execution history for a durable execution, showing all the steps, callbacks, and events that occurred during the execution. This provides a detailed audit trail of the execution's progress over time.
 *
 * The history is available while the execution is running and for a retention period after it completes (1-90 days, default 30 days). You can control whether to include execution data such as step results and callback payloads.
 */
export const getDurableExecutionHistory: API.PaginatedOperationMethod<
  GetDurableExecutionHistoryRequest,
  GetDurableExecutionHistoryResponse,
  GetDurableExecutionHistoryError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<GetDurableExecutionHistoryRequest>,
  output: __S(3217, __c100, 17) as any as S.Schema<GetDurableExecutionHistoryResponse>,
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDurableExecutionHistory",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Events",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type GetDurableExecutionStateError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the current execution state required for the replay process during durable function execution. This API is used by the Lambda durable functions SDK to get state information needed for replay. You typically don't need to call this API directly as the SDK handles state management automatically.
 *
 * The response contains operations ordered by start sequence number in ascending order. Completed operations with children don't include child operation details since they don't need to be replayed.
 */
export const getDurableExecutionState: API.PaginatedOperationMethod<
  GetDurableExecutionStateRequest,
  GetDurableExecutionStateResponse,
  GetDurableExecutionStateError,
  Credentials | HttpClient.HttpClient,
  Operation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<GetDurableExecutionStateRequest>,
  output: __S(3233, __c101, 1) as any as S.Schema<GetDurableExecutionStateResponse>,
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDurableExecutionState",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Operations",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type GetEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details about an event source mapping. You can get the identifier of a mapping from the output of ListEventSourceMappings.
 */
export const getEventSourceMapping: API.OperationMethod<
  GetEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  GetEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3264, __c102, 0) as any as S.Schema<GetEventSourceMappingRequest>,
  output: __S(2385, __c74, 17) as any as S.Schema<EventSourceMappingConfiguration>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventSourceMapping",
}));

export type GetFunctionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about the function or function version, with a link to download the deployment package that's valid for 10 minutes. If you specify a function version, only details that are specific to that version are returned.
 */
export const getFunction: API.OperationMethod<
  GetFunctionRequest,
  GetFunctionResponse,
  GetFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<GetFunctionRequest>,
  output: __S(3299, __c103, 3) as any as S.Schema<GetFunctionResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunction",
}));

export type GetFunctionCodeSigningConfigError =
  | CodeSigningConfigNotFoundException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the code signing configuration for the specified function.
 */
export const getFunctionCodeSigningConfig: API.OperationMethod<
  GetFunctionCodeSigningConfigRequest,
  GetFunctionCodeSigningConfigResponse,
  GetFunctionCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3392, __c106, 0) as any as S.Schema<GetFunctionCodeSigningConfigRequest>,
  output: __S(3424, __c107, 0) as any as S.Schema<GetFunctionCodeSigningConfigResponse>,
  errors: [
    CodeSigningConfigNotFoundException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionCodeSigningConfig",
}));

export type GetFunctionConcurrencyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns details about the reserved concurrency configuration for a function. To set a concurrency limit for a function, use PutFunctionConcurrency.
 */
export const getFunctionConcurrency: API.OperationMethod<
  GetFunctionConcurrencyRequest,
  GetFunctionConcurrencyResponse,
  GetFunctionConcurrencyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<GetFunctionConcurrencyRequest>,
  output: __S(3360, __c105, 0) as any as S.Schema<GetFunctionConcurrencyResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionConcurrency",
}));

export type GetFunctionConfigurationError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the version-specific settings of a Lambda Event Function or version. The output includes only options that can vary between versions of a function. To modify these settings, use UpdateFunctionConfiguration.
 *
 * To get all of a function's details, including function-level settings, use GetFunction.
 */
export const getFunctionConfiguration: API.OperationMethod<
  GetFunctionConfigurationRequest,
  FunctionConfiguration,
  GetFunctionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<GetFunctionConfigurationRequest>,
  output: __S(2548, __c79, 20) as any as S.Schema<FunctionConfiguration>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionConfiguration",
}));

export type GetFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves the configuration for asynchronous invocation for a function, version, or alias.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const getFunctionEventInvokeConfig: API.OperationMethod<
  GetFunctionEventInvokeConfigRequest,
  FunctionEventInvokeConfig,
  GetFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<GetFunctionEventInvokeConfigRequest>,
  output: __S(3552, __c111, 0) as any as S.Schema<FunctionEventInvokeConfig>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionEventInvokeConfig",
}));

export type GetFunctionRecursionConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns your function's recursive loop detection configuration.
 */
export const getFunctionRecursionConfig: API.OperationMethod<
  GetFunctionRecursionConfigRequest,
  GetFunctionRecursionConfigResponse,
  GetFunctionRecursionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<GetFunctionRecursionConfigRequest>,
  output: __S(3616, __c113, 0) as any as S.Schema<GetFunctionRecursionConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionRecursionConfig",
}));

export type GetFunctionScalingConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the scaling configuration for a Lambda Managed Instances function.
 */
export const getFunctionScalingConfig: API.OperationMethod<
  GetFunctionScalingConfigRequest,
  GetFunctionScalingConfigResponse,
  GetFunctionScalingConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3648, __c114, 0) as any as S.Schema<GetFunctionScalingConfigRequest>,
  output: __S(3649, __c114, 1) as any as S.Schema<GetFunctionScalingConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionScalingConfig",
}));

export type GetFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details about a Lambda function URL.
 */
export const getFunctionUrlConfig: API.OperationMethod<
  GetFunctionUrlConfigRequest,
  GetFunctionUrlConfigResponse,
  GetFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetFunctionUrlConfigRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<GetFunctionUrlConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionUrlConfig",
}));

export type GetLayerVersionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns information about a version of an Lambda layer, with a link to download the layer archive that's valid for 10 minutes.
 */
export const getLayerVersion: API.OperationMethod<
  GetLayerVersionRequest,
  GetLayerVersionResponse,
  GetLayerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<GetLayerVersionRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<GetLayerVersionResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLayerVersion",
}));

export type GetLayerVersionByArnError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about a version of an Lambda layer, with a link to download the layer archive that's valid for 10 minutes.
 */
export const getLayerVersionByArn: API.OperationMethod<
  GetLayerVersionByArnRequest,
  GetLayerVersionResponse,
  GetLayerVersionByArnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<GetLayerVersionByArnRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<GetLayerVersionResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLayerVersionByArn",
}));

export type GetLayerVersionPolicyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns the permission policy for a version of an Lambda layer. For more information, see AddLayerVersionPermission.
 */
export const getLayerVersionPolicy: API.OperationMethod<
  GetLayerVersionPolicyRequest,
  GetLayerVersionPolicyResponse,
  GetLayerVersionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<GetLayerVersionPolicyRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<GetLayerVersionPolicyResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLayerVersionPolicy",
}));

export type GetPolicyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the resource-based IAM policy for a function, version, or alias.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<GetPolicyRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<GetPolicyResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetProvisionedConcurrencyConfigError =
  | InvalidParameterValueException
  | ProvisionedConcurrencyConfigNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves the provisioned concurrency configuration for a function's alias or version.
 */
export const getProvisionedConcurrencyConfig: API.OperationMethod<
  GetProvisionedConcurrencyConfigRequest,
  GetProvisionedConcurrencyConfigResponse,
  GetProvisionedConcurrencyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<GetProvisionedConcurrencyConfigRequest>,
  output: __S(257, __c8, 1) as any as S.Schema<GetProvisionedConcurrencyConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ProvisionedConcurrencyConfigNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProvisionedConcurrencyConfig",
}));

export type GetResourcePolicyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the resource-based policy attached to a Lambda resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<GetResourcePolicyResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetRuntimeManagementConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the runtime management configuration for a function's version. If the runtime update mode is **Manual**, this includes the ARN of the runtime version and the runtime update mode. If the runtime update mode is **Auto** or **Function update**, this includes the runtime update mode and `null` is returned for the ARN. For more information, see Runtime updates.
 */
export const getRuntimeManagementConfig: API.OperationMethod<
  GetRuntimeManagementConfigRequest,
  GetRuntimeManagementConfigResponse,
  GetRuntimeManagementConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<GetRuntimeManagementConfigRequest>,
  output: __S(321, __c10, 1) as any as S.Schema<GetRuntimeManagementConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuntimeManagementConfig",
}));

export type InvokeError =
  | CodeArtifactUserDeletedException
  | CodeArtifactUserFailedException
  | CodeArtifactUserPendingException
  | DurableExecutionAlreadyStartedException
  | EC2AccessDeniedException
  | EC2ThrottledException
  | EC2UnexpectedException
  | EFSIOException
  | EFSMountConnectivityException
  | EFSMountFailureException
  | EFSMountTimeoutException
  | ENILimitReachedException
  | ENINotReadyException
  | InvalidParameterValueException
  | InvalidRequestContentException
  | InvalidRuntimeException
  | InvalidSecurityGroupIDException
  | InvalidSubnetIDException
  | InvalidZipFileException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ModeNotSupportedException
  | NoPublishedVersionException
  | RecursiveInvocationException
  | RequestTooLargeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | S3FilesMountConnectivityException
  | S3FilesMountFailureException
  | S3FilesMountTimeoutException
  | SerializedRequestEntityTooLargeException
  | ServiceException
  | ServiceQuotaExceededException
  | SnapStartException
  | SnapStartNotReadyException
  | SnapStartRegenerationFailureException
  | SnapStartTimeoutException
  | SubnetIPAddressLimitReachedException
  | TooManyRequestsException
  | UnsupportedMediaTypeException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Invokes a Lambda Event Function. You can invoke a function synchronously (and wait for the response), or asynchronously. By default, Lambda invokes your function synchronously (i.e. the`InvocationType` is `RequestResponse`). To invoke a function asynchronously, set `InvocationType` to `Event`. Lambda passes the `ClientContext` object to your function for synchronous invocations only.
 *
 * For synchronous invocations, the maximum payload size is 6 MB. For asynchronous invocations, the maximum payload size is 1 MB.
 *
 * For synchronous invocation, details about the function response, including errors, are included in the response body and headers. For either invocation type, you can find more information in the execution log and trace.
 *
 * When an error occurs, your function may be invoked multiple times. Retry behavior varies by error type, client, event source, and invocation type. For example, if you invoke a function asynchronously and it returns an error, Lambda executes the function up to two more times. For more information, see Error handling and automatic retries in Lambda.
 *
 * For asynchronous invocation, Lambda adds events to a queue before sending them to your function. If your function does not have enough capacity to keep up with the queue, events may be lost. Occasionally, your function may receive the same event multiple times, even if no error occurs. To retain events that were not processed, configure your function with a dead-letter queue.
 *
 * The status code in the API response doesn't reflect function errors. Error codes are reserved for errors that prevent your function from executing, such as permissions errors, quota errors, or issues with your function's code and configuration. For example, Lambda returns `TooManyRequestsException` if running the function would cause you to exceed a concurrency limit at either the account level (`ConcurrentInvocationLimitExceeded`) or function level (`ReservedFunctionConcurrentInvocationLimitExceeded`).
 *
 * For functions with a long timeout, your client might disconnect during synchronous invocation while it waits for a response. Configure your HTTP client, SDK, firewall, proxy, or operating system to allow for long connections with timeout or keep-alive settings.
 *
 * This operation requires permission for the lambda:InvokeFunction action. For details on how to set up permissions for cross-account invocations, see Granting function access to other accounts.
 */
export const invoke: API.OperationMethod<
  InvocationRequest,
  InvocationResponse,
  InvokeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<InvocationRequest>,
  output: __S(353, __c11, 1) as any as S.Schema<InvocationResponse>,
  errors: [
    CodeArtifactUserDeletedException,
    CodeArtifactUserFailedException,
    CodeArtifactUserPendingException,
    DurableExecutionAlreadyStartedException,
    EC2AccessDeniedException,
    EC2ThrottledException,
    EC2UnexpectedException,
    EFSIOException,
    EFSMountConnectivityException,
    EFSMountFailureException,
    EFSMountTimeoutException,
    ENILimitReachedException,
    ENINotReadyException,
    InvalidParameterValueException,
    InvalidRequestContentException,
    InvalidRuntimeException,
    InvalidSecurityGroupIDException,
    InvalidSubnetIDException,
    InvalidZipFileException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ModeNotSupportedException,
    NoPublishedVersionException,
    RecursiveInvocationException,
    RequestTooLargeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    S3FilesMountConnectivityException,
    S3FilesMountFailureException,
    S3FilesMountTimeoutException,
    SerializedRequestEntityTooLargeException,
    ServiceException,
    ServiceQuotaExceededException,
    SnapStartException,
    SnapStartNotReadyException,
    SnapStartRegenerationFailureException,
    SnapStartTimeoutException,
    SubnetIPAddressLimitReachedException,
    TooManyRequestsException,
    UnsupportedMediaTypeException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Invoke",
}));

export type InvokeAsyncError =
  | EC2AccessDeniedException
  | EC2ThrottledException
  | EC2UnexpectedException
  | EFSIOException
  | EFSMountConnectivityException
  | EFSMountFailureException
  | EFSMountTimeoutException
  | ENILimitReachedException
  | InvalidRequestContentException
  | InvalidRuntimeException
  | InvalidSecurityGroupIDException
  | InvalidSubnetIDException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ModeNotSupportedException
  | ResourceConflictException
  | ResourceNotFoundException
  | S3FilesMountConnectivityException
  | S3FilesMountFailureException
  | S3FilesMountTimeoutException
  | ServiceException
  | ServiceQuotaExceededException
  | SnapStartException
  | SnapStartNotReadyException
  | SnapStartRegenerationFailureException
  | SnapStartTimeoutException
  | SubnetIPAddressLimitReachedException
  | CommonErrors;
/**
 * For asynchronous function invocation, use Invoke.
 *
 * Invokes a function asynchronously.
 *
 * The payload limit is 256KB. For larger payloads, for up to 1MB, use Invoke.
 *
 * If you do use the InvokeAsync action, note that it doesn't support the use of X-Ray active tracing. Trace ID is not propagated to the function, even if X-Ray active tracing is turned on.
 */
export const invokeAsync: API.OperationMethod<
  InvokeAsyncRequest,
  InvokeAsyncResponse,
  InvokeAsyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<InvokeAsyncRequest>,
  output: __S(385, __c12, 1) as any as S.Schema<InvokeAsyncResponse>,
  errors: [
    EC2AccessDeniedException,
    EC2ThrottledException,
    EC2UnexpectedException,
    EFSIOException,
    EFSMountConnectivityException,
    EFSMountFailureException,
    EFSMountTimeoutException,
    ENILimitReachedException,
    InvalidRequestContentException,
    InvalidRuntimeException,
    InvalidSecurityGroupIDException,
    InvalidSubnetIDException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ModeNotSupportedException,
    ResourceConflictException,
    ResourceNotFoundException,
    S3FilesMountConnectivityException,
    S3FilesMountFailureException,
    S3FilesMountTimeoutException,
    ServiceException,
    ServiceQuotaExceededException,
    SnapStartException,
    SnapStartNotReadyException,
    SnapStartRegenerationFailureException,
    SnapStartTimeoutException,
    SubnetIPAddressLimitReachedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeAsync",
}));

export type InvokeWithResponseStreamError =
  | CodeArtifactUserDeletedException
  | CodeArtifactUserFailedException
  | CodeArtifactUserPendingException
  | EC2AccessDeniedException
  | EC2ThrottledException
  | EC2UnexpectedException
  | EFSIOException
  | EFSMountConnectivityException
  | EFSMountFailureException
  | EFSMountTimeoutException
  | ENILimitReachedException
  | InvalidParameterValueException
  | InvalidRequestContentException
  | InvalidRuntimeException
  | InvalidSecurityGroupIDException
  | InvalidSubnetIDException
  | InvalidZipFileException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | NoPublishedVersionException
  | RecursiveInvocationException
  | RequestTooLargeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | S3FilesMountConnectivityException
  | S3FilesMountFailureException
  | S3FilesMountTimeoutException
  | SerializedRequestEntityTooLargeException
  | ServiceException
  | ServiceQuotaExceededException
  | SnapStartException
  | SnapStartNotReadyException
  | SnapStartRegenerationFailureException
  | SnapStartTimeoutException
  | SubnetIPAddressLimitReachedException
  | TooManyRequestsException
  | UnsupportedMediaTypeException
  | CommonErrors;
/**
 * Configure your Lambda Event Functions to stream response payloads back to clients. For more information, see Configuring a Lambda function to stream responses.
 *
 * This operation requires permission for the lambda:InvokeFunction action. For details on how to set up permissions for cross-account invocations, see Granting function access to other accounts.
 */
export const invokeWithResponseStream: API.OperationMethod<
  InvokeWithResponseStreamRequest,
  InvokeWithResponseStreamResponse,
  InvokeWithResponseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<InvokeWithResponseStreamRequest>,
  output: __S(420, __c13, 4) as any as S.Schema<InvokeWithResponseStreamResponse>,
  errors: [
    CodeArtifactUserDeletedException,
    CodeArtifactUserFailedException,
    CodeArtifactUserPendingException,
    EC2AccessDeniedException,
    EC2ThrottledException,
    EC2UnexpectedException,
    EFSIOException,
    EFSMountConnectivityException,
    EFSMountFailureException,
    EFSMountTimeoutException,
    ENILimitReachedException,
    InvalidParameterValueException,
    InvalidRequestContentException,
    InvalidRuntimeException,
    InvalidSecurityGroupIDException,
    InvalidSubnetIDException,
    InvalidZipFileException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    NoPublishedVersionException,
    RecursiveInvocationException,
    RequestTooLargeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    S3FilesMountConnectivityException,
    S3FilesMountFailureException,
    S3FilesMountTimeoutException,
    SerializedRequestEntityTooLargeException,
    ServiceException,
    ServiceQuotaExceededException,
    SnapStartException,
    SnapStartNotReadyException,
    SnapStartRegenerationFailureException,
    SnapStartTimeoutException,
    SubnetIPAddressLimitReachedException,
    TooManyRequestsException,
    UnsupportedMediaTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeWithResponseStream",
}));

export type ListAliasesError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of aliases for a Lambda Event Function.
 */
export const listAliases: API.PaginatedOperationMethod<
  ListAliasesRequest,
  ListAliasesResponse,
  ListAliasesError,
  Credentials | HttpClient.HttpClient,
  AliasConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<ListAliasesRequest>,
  output: __S(450, __c14, 2) as any as S.Schema<ListAliasesResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAliases",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Aliases",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListCapacityProvidersError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of capacity providers in your account.
 */
export const listCapacityProviders: API.PaginatedOperationMethod<
  ListCapacityProvidersRequest,
  ListCapacityProvidersResponse,
  ListCapacityProvidersError,
  Credentials | HttpClient.HttpClient,
  CapacityProvider
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<ListCapacityProvidersRequest>,
  output: __S(482, __c15, 2) as any as S.Schema<ListCapacityProvidersResponse>,
  errors: [InvalidParameterValueException, ServiceException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapacityProviders",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "CapacityProviders",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListCodeSigningConfigsError =
  | InvalidParameterValueException
  | ServiceException
  | CommonErrors;
/**
 * Returns a list of code signing configurations. A request returns up to 10,000 configurations per call. You can use the `MaxItems` parameter to return fewer configurations per call.
 */
export const listCodeSigningConfigs: API.PaginatedOperationMethod<
  ListCodeSigningConfigsRequest,
  ListCodeSigningConfigsResponse,
  ListCodeSigningConfigsError,
  Credentials | HttpClient.HttpClient,
  CodeSigningConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<ListCodeSigningConfigsRequest>,
  output: __S(514, __c16, 2) as any as S.Schema<ListCodeSigningConfigsResponse>,
  errors: [InvalidParameterValueException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeSigningConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "CodeSigningConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListDurableExecutionsByFunctionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of durable executions for a specified Lambda function. You can filter the results by execution name, status, and start time range. This API supports pagination for large result sets.
 */
export const listDurableExecutionsByFunction: API.PaginatedOperationMethod<
  ListDurableExecutionsByFunctionRequest,
  ListDurableExecutionsByFunctionResponse,
  ListDurableExecutionsByFunctionError,
  Credentials | HttpClient.HttpClient,
  Execution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<ListDurableExecutionsByFunctionRequest>,
  output: __S(547, __c17, 3) as any as S.Schema<ListDurableExecutionsByFunctionResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDurableExecutionsByFunction",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "DurableExecutions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListEventSourceMappingsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists event source mappings. Specify an `EventSourceArn` to show only event source mappings for a single event source.
 */
export const listEventSourceMappings: API.PaginatedOperationMethod<
  ListEventSourceMappingsRequest,
  ListEventSourceMappingsResponse,
  ListEventSourceMappingsError,
  Credentials | HttpClient.HttpClient,
  EventSourceMappingConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<ListEventSourceMappingsRequest>,
  output: __S(578, __c18, 2) as any as S.Schema<ListEventSourceMappingsResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventSourceMappings",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "EventSourceMappings",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionEventInvokeConfigsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves a list of configurations for asynchronous invocation for a function.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const listFunctionEventInvokeConfigs: API.PaginatedOperationMethod<
  ListFunctionEventInvokeConfigsRequest,
  ListFunctionEventInvokeConfigsResponse,
  ListFunctionEventInvokeConfigsError,
  Credentials | HttpClient.HttpClient,
  FunctionEventInvokeConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<ListFunctionEventInvokeConfigsRequest>,
  output: __S(610, __c19, 2) as any as S.Schema<ListFunctionEventInvokeConfigsResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionEventInvokeConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionEventInvokeConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionsError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of Lambda Event Functions, with the version-specific configuration of each. Lambda returns up to 50 functions per call.
 *
 * Set `FunctionVersion` to `ALL` to include all published versions of each function in addition to the unpublished version.
 *
 * The `ListFunctions` operation returns a subset of the FunctionConfiguration fields. To get the additional fields (State, StateReasonCode, StateReason, LastUpdateStatus, LastUpdateStatusReason, LastUpdateStatusReasonCode, RuntimeVersionConfig) for a function or version, use GetFunction.
 */
export const listFunctions: API.PaginatedOperationMethod<
  ListFunctionsRequest,
  ListFunctionsResponse,
  ListFunctionsError,
  Credentials | HttpClient.HttpClient,
  FunctionConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<ListFunctionsRequest>,
  output: __S(641, __c20, 1) as any as S.Schema<ListFunctionsResponse>,
  errors: [InvalidParameterValueException, ServiceException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctions",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Functions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionsByCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | CommonErrors;
/**
 * List the functions that use the specified code signing configuration. You can use this method prior to deleting a code signing configuration, to verify that no functions are using it.
 */
export const listFunctionsByCodeSigningConfig: API.PaginatedOperationMethod<
  ListFunctionsByCodeSigningConfigRequest,
  ListFunctionsByCodeSigningConfigResponse,
  ListFunctionsByCodeSigningConfigError,
  Credentials | HttpClient.HttpClient,
  FunctionArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<ListFunctionsByCodeSigningConfigRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<ListFunctionsByCodeSigningConfigResponse>,
  errors: [InvalidParameterValueException, ResourceNotFoundException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionsByCodeSigningConfig",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionArns",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionUrlConfigsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of Lambda function URLs for the specified function.
 */
export const listFunctionUrlConfigs: API.PaginatedOperationMethod<
  ListFunctionUrlConfigsRequest,
  ListFunctionUrlConfigsResponse,
  ListFunctionUrlConfigsError,
  Credentials | HttpClient.HttpClient,
  FunctionUrlConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<ListFunctionUrlConfigsRequest>,
  output: __S(739, __c23, 3) as any as S.Schema<ListFunctionUrlConfigsResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionUrlConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionUrlConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionVersionsByCapacityProviderError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of function versions that are configured to use a specific capacity provider.
 */
export const listFunctionVersionsByCapacityProvider: API.PaginatedOperationMethod<
  ListFunctionVersionsByCapacityProviderRequest,
  ListFunctionVersionsByCapacityProviderResponse,
  ListFunctionVersionsByCapacityProviderError,
  Credentials | HttpClient.HttpClient,
  FunctionVersionsByCapacityProviderListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<ListFunctionVersionsByCapacityProviderRequest>,
  output: __S(771, __c24, 3) as any as S.Schema<ListFunctionVersionsByCapacityProviderResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionVersionsByCapacityProvider",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionVersions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListLayersError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists Lambda layers and shows information about the latest version of each. Specify a runtime identifier to list only layers that indicate that they're compatible with that runtime. Specify a compatible architecture to include only layers that are compatible with that instruction set architecture.
 */
export const listLayers: API.PaginatedOperationMethod<
  ListLayersRequest,
  ListLayersResponse,
  ListLayersError,
  Credentials | HttpClient.HttpClient,
  LayersListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<ListLayersRequest>,
  output: __S(803, __c25, 3) as any as S.Schema<ListLayersResponse>,
  errors: [InvalidParameterValueException, ServiceException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLayers",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Layers",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListLayerVersionsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Lists the versions of an Lambda layer. Versions that have been deleted aren't listed. Specify a runtime identifier to list only versions that indicate that they're compatible with that runtime. Specify a compatible architecture to include only layer versions that are compatible with that architecture.
 */
export const listLayerVersions: API.PaginatedOperationMethod<
  ListLayerVersionsRequest,
  ListLayerVersionsResponse,
  ListLayerVersionsError,
  Credentials | HttpClient.HttpClient,
  LayerVersionsListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<ListLayerVersionsRequest>,
  output: __S(866, __c27, 2) as any as S.Schema<ListLayerVersionsResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLayerVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "LayerVersions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListProvisionedConcurrencyConfigsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves a list of provisioned concurrency configurations for a function.
 */
export const listProvisionedConcurrencyConfigs: API.PaginatedOperationMethod<
  ListProvisionedConcurrencyConfigsRequest,
  ListProvisionedConcurrencyConfigsResponse,
  ListProvisionedConcurrencyConfigsError,
  Credentials | HttpClient.HttpClient,
  ProvisionedConcurrencyConfigListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<ListProvisionedConcurrencyConfigsRequest>,
  output: __S(899, __c28, 3) as any as S.Schema<ListProvisionedConcurrencyConfigsResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisionedConcurrencyConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "ProvisionedConcurrencyConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListTagsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns a function, event source mapping, or code signing configuration's tags. You can also view function tags with GetFunction.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<ListTagsRequest>,
  output: __S(929, __c29, 1) as any as S.Schema<ListTagsResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

export type ListVersionsByFunctionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of versions, with the version-specific configuration of each. Lambda returns up to 50 versions per call.
 */
export const listVersionsByFunction: API.PaginatedOperationMethod<
  ListVersionsByFunctionRequest,
  ListVersionsByFunctionResponse,
  ListVersionsByFunctionError,
  Credentials | HttpClient.HttpClient,
  FunctionConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<ListVersionsByFunctionRequest>,
  output: __S(961, __c30, 1) as any as S.Schema<ListVersionsByFunctionResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVersionsByFunction",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Versions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type PublishLayerVersionError =
  | CodeStorageExceededException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates an Lambda layer from a ZIP archive. Each time you call `PublishLayerVersion` with the same layer name, a new version is created.
 *
 * Add layers to your function with CreateFunction or UpdateFunctionConfiguration.
 */
export const publishLayerVersion: API.OperationMethod<
  PublishLayerVersionRequest,
  PublishLayerVersionResponse,
  PublishLayerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(993, __c31, 1) as any as S.Schema<PublishLayerVersionRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<PublishLayerVersionResponse>,
  errors: [
    CodeStorageExceededException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishLayerVersion",
}));

export type PublishVersionError =
  | CodeStorageExceededException
  | FunctionVersionsPerCapacityProviderLimitExceededException
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates a version from the current code and configuration of a function. Use versions to create a snapshot of your function code and configuration that doesn't change.
 *
 * Lambda doesn't publish a version if the function's configuration and code haven't changed since the last version. Use UpdateFunctionCode or UpdateFunctionConfiguration to update the function before publishing a version.
 *
 * Clients can invoke versions directly or with an alias. To create an alias, use CreateAlias.
 */
export const publishVersion: API.OperationMethod<
  PublishVersionRequest,
  FunctionConfiguration,
  PublishVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<PublishVersionRequest>,
  output: __S(2548, __c79, 20) as any as S.Schema<FunctionConfiguration>,
  errors: [
    CodeStorageExceededException,
    FunctionVersionsPerCapacityProviderLimitExceededException,
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishVersion",
}));

export type PutFunctionCodeSigningConfigError =
  | CodeSigningConfigNotFoundException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Update the code signing configuration for the function. Changes to the code signing configuration take effect the next time a user tries to deploy a code package to the function.
 */
export const putFunctionCodeSigningConfig: API.OperationMethod<
  PutFunctionCodeSigningConfigRequest,
  PutFunctionCodeSigningConfigResponse,
  PutFunctionCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<PutFunctionCodeSigningConfigRequest>,
  output: __S(3424, __c107, 0) as any as S.Schema<PutFunctionCodeSigningConfigResponse>,
  errors: [
    CodeSigningConfigNotFoundException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionCodeSigningConfig",
}));

export type PutFunctionConcurrencyError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Sets the maximum number of simultaneous executions for a function, and reserves capacity for that concurrency level.
 *
 * Concurrency settings apply to the function as a whole, including all published versions and the unpublished version. Reserving concurrency both ensures that your function has capacity to process the specified number of events simultaneously, and prevents it from scaling beyond that level. Use GetFunction to see the current setting for a function.
 *
 * Use GetAccountSettings to see your Regional concurrency limit. You can reserve concurrency for as many functions as you like, as long as you leave at least 100 simultaneous executions unreserved for functions that aren't configured with a per-function limit. For more information, see Lambda function scaling.
 */
export const putFunctionConcurrency: API.OperationMethod<
  PutFunctionConcurrencyRequest,
  Concurrency,
  PutFunctionConcurrencyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<PutFunctionConcurrencyRequest>,
  output: __S(3360, __c105, 0) as any as S.Schema<Concurrency>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionConcurrency",
}));

export type PutFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Configures options for asynchronous invocation on a function, version, or alias. If a configuration already exists for a function, version, or alias, this operation overwrites it. If you exclude any settings, they are removed. To set one option without affecting existing settings for other options, use UpdateFunctionEventInvokeConfig.
 *
 * By default, Lambda retries an asynchronous invocation twice if the function returns an error. It retains events in a queue for up to six hours. When an event fails all processing attempts or stays in the asynchronous invocation queue for too long, Lambda discards it. To retain discarded events, configure a dead-letter queue with UpdateFunctionConfiguration.
 *
 * To send an invocation record to a queue, topic, S3 bucket, function, or event bus, specify a destination. You can configure separate destinations for successful invocations (on-success) and events that fail all processing attempts (on-failure). You can configure destinations in addition to or instead of a dead-letter queue.
 *
 * S3 buckets are supported only for on-failure destinations. To retain records of successful invocations, use another destination type.
 */
export const putFunctionEventInvokeConfig: API.OperationMethod<
  PutFunctionEventInvokeConfigRequest,
  FunctionEventInvokeConfig,
  PutFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<PutFunctionEventInvokeConfigRequest>,
  output: __S(3552, __c111, 0) as any as S.Schema<FunctionEventInvokeConfig>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionEventInvokeConfig",
}));

export type PutFunctionRecursionConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Sets your function's recursive loop detection configuration.
 *
 * When you configure a Lambda function to output to the same service or resource that invokes the function, it's possible to create an infinite recursive loop. For example, a Lambda function might write a message to an Amazon Simple Queue Service (Amazon SQS) queue, which then invokes the same function. This invocation causes the function to write another message to the queue, which in turn invokes the function again.
 *
 * Lambda can detect certain types of recursive loops shortly after they occur. When Lambda detects a recursive loop and your function's recursive loop detection configuration is set to `Terminate`, it stops your function being invoked and notifies you.
 */
export const putFunctionRecursionConfig: API.OperationMethod<
  PutFunctionRecursionConfigRequest,
  PutFunctionRecursionConfigResponse,
  PutFunctionRecursionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<PutFunctionRecursionConfigRequest>,
  output: __S(3616, __c113, 0) as any as S.Schema<PutFunctionRecursionConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionRecursionConfig",
}));

export type PutFunctionScalingConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the scaling configuration for a Lambda Managed Instances function. The scaling configuration defines the minimum and maximum number of execution environments that can be provisioned for the function, allowing you to control scaling behavior and resource allocation.
 */
export const putFunctionScalingConfig: API.OperationMethod<
  PutFunctionScalingConfigRequest,
  PutFunctionScalingConfigResponse,
  PutFunctionScalingConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<PutFunctionScalingConfigRequest>,
  output: __S(1185, __c37, 1) as any as S.Schema<PutFunctionScalingConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionScalingConfig",
}));

export type PutProvisionedConcurrencyConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Adds a provisioned concurrency configuration to a function's alias or version.
 */
export const putProvisionedConcurrencyConfig: API.OperationMethod<
  PutProvisionedConcurrencyConfigRequest,
  PutProvisionedConcurrencyConfigResponse,
  PutProvisionedConcurrencyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<PutProvisionedConcurrencyConfigRequest>,
  output: __S(1217, __c38, 1) as any as S.Schema<PutProvisionedConcurrencyConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProvisionedConcurrencyConfig",
}));

export type PutResourcePolicyError =
  | InvalidParameterValueException
  | PolicyLengthExceededException
  | PreconditionFailedException
  | PublicPolicyException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds a resource-based policy to a Lambda resource. Resource-based policies grant access to other Amazon Web Services accounts, organizations, or services. Resource-based policies apply to a single Lambda resource (for example, a function, function version, or function alias).
 *
 * This operation replaces any existing policy on the Lambda resource. If you previously added permissions using the AddPermission operation, the new policy overwrites those permissions.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<PutResourcePolicyResponse>,
  errors: [
    InvalidParameterValueException,
    PolicyLengthExceededException,
    PreconditionFailedException,
    PublicPolicyException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type PutRuntimeManagementConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the runtime management configuration for a function's version. For more information, see Runtime updates.
 */
export const putRuntimeManagementConfig: API.OperationMethod<
  PutRuntimeManagementConfigRequest,
  PutRuntimeManagementConfigResponse,
  PutRuntimeManagementConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<PutRuntimeManagementConfigRequest>,
  output: __S(1281, __c40, 1) as any as S.Schema<PutRuntimeManagementConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRuntimeManagementConfig",
}));

export type RemoveLayerVersionPermissionError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Removes a statement from the permissions policy for a version of an Lambda layer. For more information, see AddLayerVersionPermission.
 */
export const removeLayerVersionPermission: API.OperationMethod<
  RemoveLayerVersionPermissionRequest,
  RemoveLayerVersionPermissionResponse,
  RemoveLayerVersionPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<RemoveLayerVersionPermissionRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<RemoveLayerVersionPermissionResponse>,
  errors: [
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveLayerVersionPermission",
}));

export type RemovePermissionError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | PublicPolicyException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Revokes function-use permission from an Amazon Web Services service or another Amazon Web Services account. You can get the ID of the statement from the output of GetPolicy.
 */
export const removePermission: API.OperationMethod<
  RemovePermissionRequest,
  RemovePermissionResponse,
  RemovePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<RemovePermissionRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<RemovePermissionResponse>,
  errors: [
    InvalidParameterValueException,
    PreconditionFailedException,
    PublicPolicyException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemovePermission",
}));

export type SendDurableExecutionCallbackFailureError =
  | CallbackTimeoutException
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends a failure response for a callback operation in a durable execution. Use this API when an external system cannot complete a callback operation successfully.
 */
export const sendDurableExecutionCallbackFailure: API.OperationMethod<
  SendDurableExecutionCallbackFailureRequest,
  SendDurableExecutionCallbackFailureResponse,
  SendDurableExecutionCallbackFailureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<SendDurableExecutionCallbackFailureRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<SendDurableExecutionCallbackFailureResponse>,
  errors: [
    CallbackTimeoutException,
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDurableExecutionCallbackFailure",
}));

export type SendDurableExecutionCallbackHeartbeatError =
  | CallbackTimeoutException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends a heartbeat signal for a long-running callback operation to prevent timeout. Use this API to extend the callback timeout period while the external operation is still in progress.
 */
export const sendDurableExecutionCallbackHeartbeat: API.OperationMethod<
  SendDurableExecutionCallbackHeartbeatRequest,
  SendDurableExecutionCallbackHeartbeatResponse,
  SendDurableExecutionCallbackHeartbeatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<SendDurableExecutionCallbackHeartbeatRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<SendDurableExecutionCallbackHeartbeatResponse>,
  errors: [
    CallbackTimeoutException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDurableExecutionCallbackHeartbeat",
}));

export type SendDurableExecutionCallbackSuccessError =
  | CallbackTimeoutException
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends a successful completion response for a callback operation in a durable execution. Use this API when an external system has successfully completed a callback operation.
 */
export const sendDurableExecutionCallbackSuccess: API.OperationMethod<
  SendDurableExecutionCallbackSuccessRequest,
  SendDurableExecutionCallbackSuccessResponse,
  SendDurableExecutionCallbackSuccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<SendDurableExecutionCallbackSuccessRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<SendDurableExecutionCallbackSuccessResponse>,
  errors: [
    CallbackTimeoutException,
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDurableExecutionCallbackSuccess",
}));

export type StopDurableExecutionError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a running durable execution. The execution transitions to STOPPED status and cannot be resumed. Any in-progress operations are terminated.
 */
export const stopDurableExecution: API.OperationMethod<
  StopDurableExecutionRequest,
  StopDurableExecutionResponse,
  StopDurableExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<StopDurableExecutionRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<StopDurableExecutionResponse>,
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDurableExecution",
}));

export type TagResourceError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Adds tags to a function, event source mapping, or code signing configuration.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Removes tags from a function, event source mapping, or code signing configuration.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1537, __c48, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAliasError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Updates the configuration of a Lambda Event Function alias.
 */
export const updateAlias: API.OperationMethod<
  UpdateAliasRequest,
  AliasConfiguration,
  UpdateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<UpdateAliasRequest>,
  output: __S(2018, __c63, 2) as any as S.Schema<AliasConfiguration>,
  errors: [
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAlias",
}));

export type UpdateCapacityProviderError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of an existing capacity provider.
 */
export const updateCapacityProvider: API.OperationMethod<
  UpdateCapacityProviderRequest,
  UpdateCapacityProviderResponse,
  UpdateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<UpdateCapacityProviderRequest>,
  output: __S(2208, __c69, 0) as any as S.Schema<UpdateCapacityProviderResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCapacityProvider",
}));

export type UpdateCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | CommonErrors;
/**
 * Update the code signing configuration. Changes to the code signing configuration take effect the next time a user tries to deploy a code package to the function.
 */
export const updateCodeSigningConfig: API.OperationMethod<
  UpdateCodeSigningConfigRequest,
  UpdateCodeSigningConfigResponse,
  UpdateCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<UpdateCodeSigningConfigRequest>,
  output: __S(2304, __c72, 0) as any as S.Schema<UpdateCodeSigningConfigResponse>,
  errors: [InvalidParameterValueException, ResourceNotFoundException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCodeSigningConfig",
}));

export type UpdateEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | ExecutionRoleNotAssumable
  | ExecutionRoleMissingPermissions
  | CommonErrors;
/**
 * Updates an event source mapping. You can change the function that Lambda invokes, or pause invocation and resume later from the same location.
 *
 * For details about how to configure different event sources, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 *
 * The following error handling options are available for stream sources (DynamoDB, Kinesis, Amazon MSK, and self-managed Apache Kafka):
 *
 * - `BisectBatchOnFunctionError` - If the function returns an error, split the batch in two and retry.
 *
 * - `MaximumRecordAgeInSeconds` - Discard records older than the specified age. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires
 *
 * - `MaximumRetryAttempts` - Discard records after the specified number of retries. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires.
 *
 * - `OnFailure` - Send discarded records to an Amazon SQS queue, Amazon SNS topic, Kafka topic, or Amazon S3 bucket. For more information, see Adding a destination.
 *
 * The following option is available only for DynamoDB and Kinesis event sources:
 *
 * - `ParallelizationFactor` - Process multiple batches from each shard concurrently.
 *
 * For information about which configuration parameters apply to each event source, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 */
export const updateEventSourceMapping: API.OperationMethod<
  UpdateEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  UpdateEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<UpdateEventSourceMappingRequest>,
  output: __S(2385, __c74, 17) as any as S.Schema<EventSourceMappingConfiguration>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
    ExecutionRoleNotAssumable,
    ExecutionRoleMissingPermissions,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventSourceMapping",
}));

export type UpdateFunctionCodeError =
  | CodeSigningConfigNotFoundException
  | CodeStorageExceededException
  | CodeVerificationFailedException
  | InvalidCodeSignatureException
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | ExecutionRoleNotAssumable
  | ExecutionRoleMissingVpcPermissions
  | KmsGrantPrincipalNotReady
  | CommonErrors;
/**
 * Updates a Lambda Event Function's code. If code signing is enabled for the function, the code package must be signed by a trusted publisher. For more information, see Configuring code signing for Lambda.
 *
 * If the function's package type is `Image`, then you must specify the code package in `ImageUri` as the URI of a container image in the Amazon ECR registry.
 *
 * If the function's package type is `Zip`, then you must specify the deployment package as a .zip file archive. Enter the Amazon S3 bucket and key of the code .zip file location. You can also provide the function code inline using the `ZipFile` field.
 *
 * The code in the deployment package must be compatible with the target instruction set architecture of the function (`x86-64` or `arm64`).
 *
 * The function's code is locked when you publish a version. You can't modify the code of a published version, only the unpublished version.
 *
 * For a function defined as a container image, Lambda resolves the image tag to an image digest. In Amazon ECR, if you update the image tag to a new image, Lambda does not automatically update the function.
 */
export const updateFunctionCode: API.OperationMethod<
  UpdateFunctionCodeRequest,
  FunctionConfiguration,
  UpdateFunctionCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<UpdateFunctionCodeRequest>,
  output: __S(2548, __c79, 20) as any as S.Schema<FunctionConfiguration>,
  errors: [
    CodeSigningConfigNotFoundException,
    CodeStorageExceededException,
    CodeVerificationFailedException,
    InvalidCodeSignatureException,
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
    ExecutionRoleNotAssumable,
    ExecutionRoleMissingVpcPermissions,
    KmsGrantPrincipalNotReady,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionCode",
}));

export type UpdateFunctionConfigurationError =
  | CodeSigningConfigNotFoundException
  | CodeVerificationFailedException
  | InvalidCodeSignatureException
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | ExecutionRoleNotAssumable
  | ExecutionRoleMissingVpcPermissions
  | KmsGrantPrincipalNotReady
  | SecurityGroupNotFound
  | CommonErrors;
/**
 * Modifies the version-specific settings of a Lambda Event Function.
 *
 * When you update a function, Lambda provisions an instance of the function and its supporting resources. If your function connects to a VPC, this process can take a minute. During this time, you can't modify the function, but you can still invoke it. The `LastUpdateStatus`, `LastUpdateStatusReason`, and `LastUpdateStatusReasonCode` fields in the response from GetFunctionConfiguration indicate when the update is complete and the function is processing events with the new configuration. For more information, see Lambda function states.
 *
 * These settings can vary between versions of a function and are locked when you publish a version. You can't modify the configuration of a published version, only the unpublished version.
 *
 * To configure function concurrency, use PutFunctionConcurrency. To grant invoke permissions to an Amazon Web Services account or Amazon Web Services service, use AddPermission.
 */
export const updateFunctionConfiguration: API.OperationMethod<
  UpdateFunctionConfigurationRequest,
  FunctionConfiguration,
  UpdateFunctionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<UpdateFunctionConfigurationRequest>,
  output: __S(2548, __c79, 20) as any as S.Schema<FunctionConfiguration>,
  errors: [
    CodeSigningConfigNotFoundException,
    CodeVerificationFailedException,
    InvalidCodeSignatureException,
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
    ExecutionRoleNotAssumable,
    ExecutionRoleMissingVpcPermissions,
    KmsGrantPrincipalNotReady,
    SecurityGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionConfiguration",
}));

export type UpdateFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration for asynchronous invocation for a function, version, or alias.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const updateFunctionEventInvokeConfig: API.OperationMethod<
  UpdateFunctionEventInvokeConfigRequest,
  FunctionEventInvokeConfig,
  UpdateFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<UpdateFunctionEventInvokeConfigRequest>,
  output: __S(3552, __c111, 0) as any as S.Schema<FunctionEventInvokeConfig>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionEventInvokeConfig",
}));

export type UpdateFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Updates the configuration for a Lambda function URL.
 */
export const updateFunctionUrlConfig: API.OperationMethod<
  UpdateFunctionUrlConfigRequest,
  UpdateFunctionUrlConfigResponse,
  UpdateFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<UpdateFunctionUrlConfigRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<UpdateFunctionUrlConfigResponse>,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionUrlConfig",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2021-10-31/functions/{FunctionName}/url" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionUrlConfigRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionUrl: S.String,
          FunctionArn: S.String,
          AuthType: S.String,
          Cors: S.optional(__S(2592, __c81, 0)),
          CreationTime: S.String,
          LastModifiedTime: S.String,
          InvokeMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetFunctionUrlConfigResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LayerName: S.String.pipe(T.HttpLabel("LayerName")),
          VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2018-10-31/layers/{LayerName}/versions/{VersionNumber}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLayerVersionRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Location: S.optional(S.String),
          CodeSha256: S.optional(S.String),
          CodeSize: S.optional(S.Number),
          SigningProfileVersionArn: S.optional(S.String),
          SigningJobArn: S.optional(S.String),
          ResolvedS3Object: S.optional(__S(3328, __c104, 0)),
        }),
      ).annotate({ identifier: "LayerVersionContentOutput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Content: S.optional(__S(96, __c3, 0)),
          LayerArn: S.optional(S.String),
          LayerVersionArn: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedDate: S.optional(S.String),
          Version: S.optional(S.Number),
          CompatibleArchitectures: S.optional(__S(2144, __c67, 0)),
          CompatibleRuntimes: S.optional(__S(2144, __c67, 0)),
          LicenseInfo: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetLayerVersionResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpQuery("Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2018-10-31/layers?find=LayerVersion" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLayerVersionByArnRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LayerName: S.String.pipe(T.HttpLabel("LayerName")),
          VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2018-10-31/layers/{LayerName}/versions/{VersionNumber}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLayerVersionPolicyRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Policy: S.optional(S.String), RevisionId: S.optional(S.String) }),
      ).annotate({ identifier: "GetLayerVersionPolicyResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2015-03-31/functions/{FunctionName}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPolicyRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.String.pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2019-09-30/functions/{FunctionName}/provisioned-concurrency",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProvisionedConcurrencyConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RequestedProvisionedConcurrentExecutions: S.optional(S.Number),
          AvailableProvisionedConcurrentExecutions: S.optional(S.Number),
          AllocatedProvisionedConcurrentExecutions: S.optional(S.Number),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          LastModified: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetProvisionedConcurrencyConfigResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2026-07-09/resource-policy/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2021-07-20/functions/{FunctionName}/runtime-management-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRuntimeManagementConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateRuntimeOn: S.optional(S.String),
          FunctionArn: S.optional(S.String),
          RuntimeVersionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRuntimeManagementConfigResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          InvocationType: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Invocation-Type")),
          LogType: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Log-Type")),
          ClientContext: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Client-Context")),
          DurableExecutionName: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Durable-Execution-Name"),
          ),
          Payload: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
          TenantId: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Tenant-Id")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2015-03-31/functions/{FunctionName}/invocations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvocationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StatusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
          FunctionError: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Function-Error")),
          LogResult: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Log-Result")),
          Payload: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          ExecutedVersion: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Executed-Version")),
          DurableExecutionArn: S.optional(S.String).pipe(
            T.HttpHeader("X-Amz-Durable-Execution-Arn"),
          ),
        }),
      ).annotate({ identifier: "InvocationResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          InvokeArgs: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2014-11-13/functions/{FunctionName}/invoke-async" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeAsyncRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.Number).pipe(T.HttpResponseCode()) }),
      ).annotate({ identifier: "InvokeAsyncResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          LogType: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Log-Type")),
          ClientContext: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Client-Context")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
          Payload: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
          TenantId: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Tenant-Id")),
          InvocationType: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Invocation-Type")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2021-11-15/functions/{FunctionName}/response-streaming-invocations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeWithResponseStreamRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Payload: S.optional(SensitiveBlob).pipe(T.EventPayload()) }),
      ).annotate({ identifier: "InvokeResponseStreamUpdate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ErrorCode: S.optional(S.String),
          ErrorDetails: S.optional(S.String),
          LogResult: S.optional(S.String),
        }),
      ).annotate({ identifier: "InvokeWithResponseStreamCompleteEvent" });
    case 3:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ PayloadChunk: __S(417, __c13, 1) }),
          /*@__PURE__*/ S.Struct({ InvokeComplete: __S(418, __c13, 2) }),
        ]),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          StatusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
          ExecutedVersion: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Executed-Version")),
          EventStream: S.optional(__S(419, __c13, 3)).pipe(T.HttpPayload()),
          ResponseStreamContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
        }),
      ).annotate({ identifier: "InvokeWithResponseStreamResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          FunctionVersion: S.optional(S.String).pipe(T.HttpQuery("FunctionVersion")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2015-03-31/functions/{FunctionName}/aliases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAliasesRequest" });
    case 1:
      return S.Array(__S(2018, __c63, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Aliases: S.optional(__S(449, __c14, 1)) }),
      ).annotate({ identifier: "ListAliasesResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String).pipe(T.HttpQuery("State")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-11-30/capacity-providers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCapacityProvidersRequest" });
    case 1:
      return S.Array(__S(2185, __c68, 9));
    case 2:
      return S.suspend(() =>
        S.Struct({ CapacityProviders: __S(481, __c15, 1), NextMarker: S.optional(S.String) }),
      ).annotate({ identifier: "ListCapacityProvidersResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2020-04-22/code-signing-configs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCodeSigningConfigsRequest" });
    case 1:
      return S.Array(__S(2274, __c71, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          CodeSigningConfigs: S.optional(__S(513, __c16, 1)),
        }),
      ).annotate({ identifier: "ListCodeSigningConfigsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
          DurableExecutionName: S.optional(S.String).pipe(T.HttpQuery("DurableExecutionName")),
          Statuses: S.optional(__S(2144, __c67, 0)).pipe(T.HttpQuery("Statuses")),
          StartedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("StartedAfter"),
          ),
          StartedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("StartedBefore"),
          ),
          ReverseOrder: S.optional(S.Boolean).pipe(T.HttpQuery("ReverseOrder")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2025-12-01/functions/{FunctionName}/durable-executions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDurableExecutionsByFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DurableExecutionArn: S.String,
          DurableExecutionName: S.String,
          FunctionArn: S.String,
          Status: S.String,
          StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          KMSKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Execution" });
    case 2:
      return S.Array(__S(545, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DurableExecutions: S.optional(__S(546, __c17, 2)),
          NextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDurableExecutionsByFunctionResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventSourceArn: S.optional(S.String).pipe(T.HttpQuery("EventSourceArn")),
          FunctionName: S.optional(S.String).pipe(T.HttpQuery("FunctionName")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2015-03-31/event-source-mappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEventSourceMappingsRequest" });
    case 1:
      return S.Array(__S(2385, __c74, 17));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          EventSourceMappings: S.optional(__S(577, __c18, 1)),
        }),
      ).annotate({ identifier: "ListEventSourceMappingsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2019-09-25/functions/{FunctionName}/event-invoke-config/list",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFunctionEventInvokeConfigsRequest" });
    case 1:
      return S.Array(__S(3552, __c111, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FunctionEventInvokeConfigs: S.optional(__S(609, __c19, 1)),
          NextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFunctionEventInvokeConfigsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MasterRegion: S.optional(S.String).pipe(T.HttpQuery("MasterRegion")),
          FunctionVersion: S.optional(S.String).pipe(T.HttpQuery("FunctionVersion")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2015-03-31/functions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFunctionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Functions: S.optional(__S(672, __c21, 0)) }),
      ).annotate({ identifier: "ListFunctionsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2548, __c79, 20));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CodeSigningConfigArn: S.String.pipe(T.HttpLabel("CodeSigningConfigArn")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2020-04-22/code-signing-configs/{CodeSigningConfigArn}/functions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFunctionsByCodeSigningConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          FunctionArns: S.optional(__S(2080, __c65, 0)),
        }),
      ).annotate({ identifier: "ListFunctionsByCodeSigningConfigResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2021-10-31/functions/{FunctionName}/urls" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFunctionUrlConfigsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionUrl: S.String,
          FunctionArn: S.String,
          CreationTime: S.String,
          LastModifiedTime: S.String,
          Cors: S.optional(__S(2592, __c81, 0)),
          AuthType: S.String,
          InvokeMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "FunctionUrlConfig" });
    case 2:
      return S.Array(__S(737, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ FunctionUrlConfigs: __S(738, __c23, 2), NextMarker: S.optional(S.String) }),
      ).annotate({ identifier: "ListFunctionUrlConfigsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CapacityProviderName: S.String.pipe(T.HttpLabel("CapacityProviderName")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2025-11-30/capacity-providers/{CapacityProviderName}/function-versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFunctionVersionsByCapacityProviderRequest" });
    case 1:
      return S.suspend(() => S.Struct({ FunctionArn: S.String, State: S.String })).annotate({
        identifier: "FunctionVersionsByCapacityProviderListItem",
      });
    case 2:
      return S.Array(__S(769, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CapacityProviderArn: S.String,
          FunctionVersions: __S(770, __c24, 2),
          NextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFunctionVersionsByCapacityProviderResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CompatibleArchitecture: S.optional(S.String).pipe(T.HttpQuery("CompatibleArchitecture")),
          CompatibleRuntime: S.optional(S.String).pipe(T.HttpQuery("CompatibleRuntime")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/2018-10-31/layers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListLayersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LayerName: S.optional(S.String),
          LayerArn: S.optional(S.String),
          LatestMatchingVersion: S.optional(__S(832, __c26, 0)),
        }),
      ).annotate({ identifier: "LayersListItem" });
    case 2:
      return S.Array(__S(801, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Layers: S.optional(__S(802, __c25, 2)) }),
      ).annotate({ identifier: "ListLayersResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LayerVersionArn: S.optional(S.String),
          Version: S.optional(S.Number),
          Description: S.optional(S.String),
          CreatedDate: S.optional(S.String),
          CompatibleArchitectures: S.optional(__S(2144, __c67, 0)),
          CompatibleRuntimes: S.optional(__S(2144, __c67, 0)),
          LicenseInfo: S.optional(S.String),
        }),
      ).annotate({ identifier: "LayerVersionsListItem" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CompatibleArchitecture: S.optional(S.String).pipe(T.HttpQuery("CompatibleArchitecture")),
          CompatibleRuntime: S.optional(S.String).pipe(T.HttpQuery("CompatibleRuntime")),
          LayerName: S.String.pipe(T.HttpLabel("LayerName")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2018-10-31/layers/{LayerName}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLayerVersionsRequest" });
    case 1:
      return S.Array(__S(832, __c26, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextMarker: S.optional(S.String),
          LayerVersions: S.optional(__S(865, __c27, 1)),
        }),
      ).annotate({ identifier: "ListLayerVersionsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2019-09-30/functions/{FunctionName}/provisioned-concurrency?List=ALL",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProvisionedConcurrencyConfigsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionArn: S.optional(S.String),
          RequestedProvisionedConcurrentExecutions: S.optional(S.Number),
          AvailableProvisionedConcurrentExecutions: S.optional(S.Number),
          AllocatedProvisionedConcurrentExecutions: S.optional(S.Number),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          LastModified: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProvisionedConcurrencyConfigListItem" });
    case 2:
      return S.Array(__S(897, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProvisionedConcurrencyConfigs: S.optional(__S(898, __c28, 2)),
          NextMarker: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProvisionedConcurrencyConfigsResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Resource: S.String.pipe(T.HttpLabel("Resource")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2017-03-31/tags/{Resource}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(2112, __c66, 0)) })).annotate({
        identifier: "ListTagsResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2015-03-31/functions/{FunctionName}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVersionsByFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NextMarker: S.optional(S.String), Versions: S.optional(__S(672, __c21, 0)) }),
      ).annotate({ identifier: "ListVersionsByFunctionResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S3Bucket: S.optional(S.String),
          S3Key: S.optional(S.String),
          S3ObjectVersion: S.optional(S.String),
          S3ObjectStorageMode: S.optional(S.String),
          ZipFile: S.optional(SensitiveBlob),
        }),
      ).annotate({ identifier: "LayerVersionContentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LayerName: S.String.pipe(T.HttpLabel("LayerName")),
          Description: S.optional(S.String),
          Content: __S(992, __c31, 0),
          CompatibleArchitectures: S.optional(__S(2144, __c67, 0)),
          CompatibleRuntimes: S.optional(__S(2144, __c67, 0)),
          LicenseInfo: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2018-10-31/layers/{LayerName}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PublishLayerVersionRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          CodeSha256: S.optional(S.String),
          Description: S.optional(S.String),
          RevisionId: S.optional(S.String),
          PublishTo: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2015-03-31/functions/{FunctionName}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PublishVersionRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CodeSigningConfigArn: S.String,
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/2020-06-30/functions/{FunctionName}/code-signing-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutFunctionCodeSigningConfigRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          ReservedConcurrentExecutions: S.Number,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2017-10-31/functions/{FunctionName}/concurrency" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutFunctionConcurrencyRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
          MaximumRetryAttempts: S.optional(S.Number),
          MaximumEventAgeInSeconds: S.optional(S.Number),
          DestinationConfig: S.optional(__S(2401, __c75, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/2019-09-25/functions/{FunctionName}/event-invoke-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutFunctionEventInvokeConfigRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          RecursiveLoop: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2024-08-31/functions/{FunctionName}/recursion-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutFunctionRecursionConfigRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.String.pipe(T.HttpQuery("Qualifier")),
          FunctionScalingConfig: S.optional(__S(3680, __c115, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/2025-11-30/functions/{FunctionName}/function-scaling-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutFunctionScalingConfigRequest" });
    case 1:
      return S.suspend(() => S.Struct({ FunctionState: S.optional(S.String) })).annotate({
        identifier: "PutFunctionScalingConfigResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.String.pipe(T.HttpQuery("Qualifier")),
          ProvisionedConcurrentExecutions: S.Number,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/2019-09-30/functions/{FunctionName}/provisioned-concurrency",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutProvisionedConcurrencyConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RequestedProvisionedConcurrentExecutions: S.optional(S.Number),
          AllocatedProvisionedConcurrentExecutions: S.optional(S.Number),
          AvailableProvisionedConcurrentExecutions: S.optional(S.Number),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          LastModified: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutProvisionedConcurrencyConfigResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Policy: S.String,
          RevisionId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2026-07-09/resource-policy/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
          UpdateRuntimeOn: S.String,
          RuntimeVersionArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/2021-07-20/functions/{FunctionName}/runtime-management-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutRuntimeManagementConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateRuntimeOn: S.String,
          FunctionArn: S.String,
          RuntimeVersionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutRuntimeManagementConfigResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LayerName: S.String.pipe(T.HttpLabel("LayerName")),
          VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
          StatementId: S.String.pipe(T.HttpLabel("StatementId")),
          RevisionId: S.optional(S.String).pipe(T.HttpQuery("RevisionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2018-10-31/layers/{LayerName}/versions/{VersionNumber}/policy/{StatementId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveLayerVersionPermissionRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          StatementId: S.String.pipe(T.HttpLabel("StatementId")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
          RevisionId: S.optional(S.String).pipe(T.HttpQuery("RevisionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2015-03-31/functions/{FunctionName}/policy/{StatementId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemovePermissionRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CallbackId: S.String.pipe(T.HttpLabel("CallbackId")),
          Error: S.optional(__S(1921, __c60, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ErrorObject" }),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2025-12-01/durable-execution-callbacks/{CallbackId}/fail",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendDurableExecutionCallbackFailureRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CallbackId: S.String.pipe(T.HttpLabel("CallbackId")) }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2025-12-01/durable-execution-callbacks/{CallbackId}/heartbeat",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendDurableExecutionCallbackHeartbeatRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CallbackId: S.String.pipe(T.HttpLabel("CallbackId")),
          Result: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2025-12-01/durable-execution-callbacks/{CallbackId}/succeed",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendDurableExecutionCallbackSuccessRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DurableExecutionArn: S.String.pipe(T.HttpLabel("DurableExecutionArn")),
          Error: S.optional(__S(1921, __c60, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ErrorObject" }),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2025-12-01/durable-executions/{DurableExecutionArn}/stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopDurableExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ StopTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
      ).annotate({ identifier: "StopDurableExecutionResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Resource: S.String.pipe(T.HttpLabel("Resource")),
          Tags: __S(2112, __c66, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2017-03-31/tags/{Resource}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Key")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Resource: S.String.pipe(T.HttpLabel("Resource")),
          TagKeys: __S(1536, __c48, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2017-03-31/tags/{Resource}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Name: S.String.pipe(T.HttpLabel("Name")),
          FunctionVersion: S.optional(S.String),
          Description: S.optional(S.String),
          RoutingConfig: S.optional(__S(2017, __c63, 1)),
          RevisionId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2015-03-31/functions/{FunctionName}/aliases/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAliasRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CapacityProviderName: S.String.pipe(T.HttpLabel("CapacityProviderName")),
          CapacityProviderScalingConfig: S.optional(__S(2181, __c68, 5)),
          PropagateTags: S.optional(__S(2182, __c68, 6)),
          TelemetryConfig: S.optional(__S(2184, __c68, 8)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2025-11-30/capacity-providers/{CapacityProviderName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCapacityProviderRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CodeSigningConfigArn: S.String.pipe(T.HttpLabel("CodeSigningConfigArn")),
          Description: S.optional(S.String),
          AllowedPublishers: S.optional(__S(2272, __c71, 0)),
          CodeSigningPolicies: S.optional(__S(2273, __c71, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/2020-04-22/code-signing-configs/{CodeSigningConfigArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCodeSigningConfigRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UUID: S.String.pipe(T.HttpLabel("UUID")),
          FunctionName: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
          BatchSize: S.optional(S.Number),
          FilterCriteria: S.optional(__S(2370, __c74, 2)),
          KMSKeyArn: S.optional(S.String),
          MetricsConfig: S.optional(__S(2371, __c74, 3)),
          LoggingConfig: S.optional(__S(2372, __c74, 4)),
          ScalingConfig: S.optional(__S(2373, __c74, 5)),
          MaximumBatchingWindowInSeconds: S.optional(S.Number),
          ParallelizationFactor: S.optional(S.Number),
          DestinationConfig: S.optional(__S(2401, __c75, 1)),
          MaximumRecordAgeInSeconds: S.optional(S.Number),
          BisectBatchOnFunctionError: S.optional(S.Boolean),
          MaximumRetryAttempts: S.optional(S.Number),
          TumblingWindowInSeconds: S.optional(S.Number),
          SourceAccessConfigurations: S.optional(__S(2375, __c74, 7)),
          FunctionResponseTypes: S.optional(__S(2144, __c67, 0)),
          AmazonManagedKafkaEventSourceConfig: S.optional(__S(2381, __c74, 13)),
          SelfManagedKafkaEventSourceConfig: S.optional(__S(2381, __c74, 13)),
          DocumentDBEventSourceConfig: S.optional(__S(2382, __c74, 14)),
          ProvisionedPollerConfig: S.optional(__S(2383, __c74, 15)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2015-03-31/event-source-mappings/{UUID}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEventSourceMappingRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          ZipFile: S.optional(SensitiveBlob),
          S3Bucket: S.optional(S.String),
          S3Key: S.optional(S.String),
          S3ObjectVersion: S.optional(S.String),
          S3ObjectStorageMode: S.optional(S.String),
          ImageUri: S.optional(S.String),
          Architectures: S.optional(__S(2144, __c67, 0)),
          Publish: S.optional(S.Boolean),
          PublishTo: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
          RevisionId: S.optional(S.String),
          SourceKMSKeyArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2015-03-31/functions/{FunctionName}/code" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFunctionCodeRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Role: S.optional(S.String),
          Handler: S.optional(S.String),
          Description: S.optional(S.String),
          Timeout: S.optional(S.Number),
          MemorySize: S.optional(S.Number),
          VpcConfig: S.optional(__S(2464, __c77, 0)),
          Environment: S.optional(__S(2465, __c77, 1)),
          Runtime: S.optional(S.String),
          DeadLetterConfig: S.optional(__S(2528, __c79, 0)),
          KMSKeyArn: S.optional(S.String),
          TracingConfig: S.optional(__S(2530, __c79, 2)),
          RevisionId: S.optional(S.String),
          Layers: S.optional(__S(2080, __c65, 0)),
          FileSystemConfigs: S.optional(__S(2533, __c79, 5)),
          ImageConfig: S.optional(__S(2534, __c79, 6)),
          EphemeralStorage: S.optional(__S(2535, __c79, 7)),
          SnapStart: S.optional(__S(2466, __c77, 2)),
          LoggingConfig: S.optional(__S(2536, __c79, 8)),
          CapacityProviderConfig: S.optional(__S(2539, __c79, 11)),
          DurableConfig: S.optional(__S(2496, __c78, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2015-03-31/functions/{FunctionName}/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFunctionConfigurationRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
          MaximumRetryAttempts: S.optional(S.Number),
          MaximumEventAgeInSeconds: S.optional(S.Number),
          DestinationConfig: S.optional(__S(2401, __c75, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2019-09-25/functions/{FunctionName}/event-invoke-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFunctionEventInvokeConfigRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
          AuthType: S.optional(S.String),
          Cors: S.optional(__S(2592, __c81, 0)),
          InvokeMode: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/2021-10-31/functions/{FunctionName}/url" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFunctionUrlConfigRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LayerName: S.String.pipe(T.HttpLabel("LayerName")),
          VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
          StatementId: S.String,
          Action: S.String,
          Principal: S.String,
          OrganizationId: S.optional(S.String),
          RevisionId: S.optional(S.String).pipe(T.HttpQuery("RevisionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2018-10-31/layers/{LayerName}/versions/{VersionNumber}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddLayerVersionPermissionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Statement: S.optional(S.String), RevisionId: S.optional(S.String) }),
      ).annotate({ identifier: "AddLayerVersionPermissionResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          StatementId: S.String,
          Action: S.String,
          Principal: S.String,
          SourceArn: S.optional(S.String),
          FunctionUrlAuthType: S.optional(S.String),
          InvokedViaFunctionUrl: S.optional(S.Boolean),
          SourceAccount: S.optional(S.String),
          EventSourceToken: S.optional(S.String),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
          RevisionId: S.optional(S.String),
          PrincipalOrgID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2015-03-31/functions/{FunctionName}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddPermissionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Statement: S.optional(S.String) })).annotate({
        identifier: "AddPermissionResponse",
      });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ReplayChildren: S.optional(S.Boolean) })).annotate({
        identifier: "ContextOptions",
      });
    case 1:
      return S.suspend(() => S.Struct({ NextAttemptDelaySeconds: S.optional(S.Number) })).annotate({
        identifier: "StepOptions",
      });
    case 2:
      return S.suspend(() => S.Struct({ WaitSeconds: S.optional(S.Number) })).annotate({
        identifier: "WaitOptions",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          TimeoutSeconds: S.optional(S.Number),
          HeartbeatTimeoutSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CallbackOptions" });
    case 4:
      return S.suspend(() =>
        S.Struct({ FunctionName: S.String, TenantId: S.optional(S.String) }),
      ).annotate({ identifier: "ChainedInvokeOptions" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          ParentId: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.String,
          SubType: S.optional(S.String),
          Action: S.String,
          Payload: S.optional(SensitiveString),
          Error: S.optional(__S(1921, __c60, 1)),
          ContextOptions: S.optional(__S(1888, __c59, 0)),
          StepOptions: S.optional(__S(1889, __c59, 1)),
          WaitOptions: S.optional(__S(1890, __c59, 2)),
          CallbackOptions: S.optional(__S(1891, __c59, 3)),
          ChainedInvokeOptions: S.optional(__S(1892, __c59, 4)),
        }),
      ).annotate({ identifier: "OperationUpdate" });
    case 6:
      return S.Array(__S(1893, __c59, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          DurableExecutionArn: S.String.pipe(T.HttpLabel("DurableExecutionArn")),
          CheckpointToken: S.String,
          Updates: S.optional(__S(1894, __c59, 6)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/2025-12-01/durable-executions/{DurableExecutionArn}/checkpoint",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CheckpointDurableExecutionRequest" });
    case 8:
      return S.suspend(() =>
        S.Struct({ Operations: S.optional(__S(1959, __c61, 7)), NextMarker: S.optional(S.String) }),
      ).annotate({ identifier: "CheckpointUpdatedExecutionState" });
    case 9:
      return S.suspend(() =>
        S.Struct({ CheckpointToken: S.optional(S.String), NewExecutionState: __S(1896, __c59, 8) }),
      ).annotate({ identifier: "CheckpointDurableExecutionResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ErrorMessage: S.optional(SensitiveString),
          ErrorType: S.optional(SensitiveString),
          ErrorData: S.optional(SensitiveString),
          StackTrace: S.optional(__S(1920, __c60, 0)),
        }),
      ).annotate({ identifier: "ErrorObject" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ InputPayload: S.optional(SensitiveString) })).annotate({
        identifier: "ExecutionDetails",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReplayChildren: S.optional(S.Boolean),
          Result: S.optional(SensitiveString),
          Error: S.optional(__S(1921, __c60, 1)),
        }),
      ).annotate({ identifier: "ContextDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Attempt: S.optional(S.Number),
          NextAttemptTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Result: S.optional(SensitiveString),
          Error: S.optional(__S(1921, __c60, 1)),
        }),
      ).annotate({ identifier: "StepDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScheduledEndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "WaitDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CallbackId: S.optional(S.String),
          Result: S.optional(SensitiveString),
          Error: S.optional(__S(1921, __c60, 1)),
        }),
      ).annotate({ identifier: "CallbackDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Result: S.optional(SensitiveString), Error: S.optional(__S(1921, __c60, 1)) }),
      ).annotate({ identifier: "ChainedInvokeDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          ParentId: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.String,
          SubType: S.optional(S.String),
          StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.String,
          ExecutionDetails: S.optional(__S(1952, __c61, 0)),
          ContextDetails: S.optional(__S(1953, __c61, 1)),
          StepDetails: S.optional(__S(1954, __c61, 2)),
          WaitDetails: S.optional(__S(1955, __c61, 3)),
          CallbackDetails: S.optional(__S(1956, __c61, 4)),
          ChainedInvokeDetails: S.optional(__S(1957, __c61, 5)),
        }),
      ).annotate({ identifier: "Operation" });
    case 7:
      return S.Array(__S(1958, __c61, 6));
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Name: S.String,
          FunctionVersion: S.String,
          Description: S.optional(S.String),
          RoutingConfig: S.optional(__S(2017, __c63, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2015-03-31/functions/{FunctionName}/aliases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAliasRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ AdditionalVersionWeights: S.optional(__S(2016, __c63, 0)) }),
      ).annotate({ identifier: "AliasRoutingConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AliasArn: S.optional(S.String),
          Name: S.optional(S.String),
          FunctionVersion: S.optional(S.String),
          Description: S.optional(S.String),
          RoutingConfig: S.optional(__S(2017, __c63, 1)),
          RevisionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AliasConfiguration" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CapacityProviderName: S.String,
          VpcConfig: __S(2176, __c68, 0),
          PermissionsConfig: __S(2177, __c68, 1),
          InstanceRequirements: S.optional(__S(2178, __c68, 2)),
          CapacityProviderScalingConfig: S.optional(__S(2181, __c68, 5)),
          KmsKeyArn: S.optional(S.String),
          Tags: S.optional(__S(2112, __c66, 0)),
          PropagateTags: S.optional(__S(2182, __c68, 6)),
          TelemetryConfig: S.optional(__S(2184, __c68, 8)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2025-11-30/capacity-providers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCapacityProviderRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubnetIds: __S(2080, __c65, 0), SecurityGroupIds: __S(2080, __c65, 0) }),
      ).annotate({ identifier: "CapacityProviderVpcConfig" });
    case 1:
      return S.suspend(() => S.Struct({ CapacityProviderOperatorRoleArn: S.String })).annotate({
        identifier: "CapacityProviderPermissionsConfig",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Architectures: S.optional(__S(2144, __c67, 0)),
          AllowedInstanceTypes: S.optional(__S(2080, __c65, 0)),
          ExcludedInstanceTypes: S.optional(__S(2080, __c65, 0)),
        }),
      ).annotate({ identifier: "InstanceRequirements" });
    case 3:
      return S.suspend(() =>
        S.Struct({ PredefinedMetricType: S.String, TargetValue: S.Number }),
      ).annotate({ identifier: "TargetTrackingScalingPolicy" });
    case 4:
      return S.Array(__S(2179, __c68, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          MaxVCpuCount: S.optional(S.Number),
          ScalingMode: S.optional(S.String),
          ScalingPolicies: S.optional(__S(2180, __c68, 4)),
        }),
      ).annotate({ identifier: "CapacityProviderScalingConfig" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Mode: S.optional(S.String), ExplicitTags: S.optional(__S(2112, __c66, 0)) }),
      ).annotate({ identifier: "PropagateTags" });
    case 7:
      return S.suspend(() =>
        S.Struct({ SystemLogLevel: S.optional(S.String), LogGroup: S.optional(S.String) }),
      ).annotate({ identifier: "CapacityProviderLoggingConfig" });
    case 8:
      return S.suspend(() => S.Struct({ LoggingConfig: S.optional(__S(2183, __c68, 7)) })).annotate(
        { identifier: "CapacityProviderTelemetryConfig" },
      );
    case 9:
      return S.suspend(() =>
        S.Struct({
          CapacityProviderArn: S.String,
          State: S.String,
          VpcConfig: __S(2176, __c68, 0),
          PermissionsConfig: __S(2177, __c68, 1),
          InstanceRequirements: S.optional(__S(2178, __c68, 2)),
          CapacityProviderScalingConfig: S.optional(__S(2181, __c68, 5)),
          KmsKeyArn: S.optional(S.String),
          LastModified: S.optional(S.String),
          PropagateTags: S.optional(__S(2182, __c68, 6)),
          TelemetryConfig: S.optional(__S(2184, __c68, 8)),
        }),
      ).annotate({ identifier: "CapacityProvider" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CapacityProvider: __S(2185, __c68, 9) })).annotate({
        identifier: "CreateCapacityProviderResponse",
      });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          AllowedPublishers: __S(2272, __c71, 0),
          CodeSigningPolicies: S.optional(__S(2273, __c71, 1)),
          Tags: S.optional(__S(2112, __c66, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2020-04-22/code-signing-configs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCodeSigningConfigRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SigningProfileVersionArns: __S(2080, __c65, 0) })).annotate(
        { identifier: "AllowedPublishers" },
      );
    case 1:
      return S.suspend(() =>
        S.Struct({ UntrustedArtifactOnDeployment: S.optional(S.String) }),
      ).annotate({ identifier: "CodeSigningPolicies" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CodeSigningConfigId: S.String,
          CodeSigningConfigArn: S.String,
          Description: S.optional(S.String),
          AllowedPublishers: __S(2272, __c71, 0),
          CodeSigningPolicies: __S(2273, __c71, 1),
          LastModified: S.String,
        }),
      ).annotate({ identifier: "CodeSigningConfig" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CodeSigningConfig: __S(2274, __c71, 2) })).annotate({
        identifier: "CreateCodeSigningConfigResponse",
      });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventSourceArn: S.optional(S.String),
          FunctionName: S.String,
          Enabled: S.optional(S.Boolean),
          BatchSize: S.optional(S.Number),
          FilterCriteria: S.optional(__S(2370, __c74, 2)),
          KMSKeyArn: S.optional(S.String),
          MetricsConfig: S.optional(__S(2371, __c74, 3)),
          LoggingConfig: S.optional(__S(2372, __c74, 4)),
          ScalingConfig: S.optional(__S(2373, __c74, 5)),
          MaximumBatchingWindowInSeconds: S.optional(S.Number),
          ParallelizationFactor: S.optional(S.Number),
          StartingPosition: S.optional(S.String),
          StartingPositionTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DestinationConfig: S.optional(__S(2401, __c75, 1)),
          MaximumRecordAgeInSeconds: S.optional(S.Number),
          BisectBatchOnFunctionError: S.optional(S.Boolean),
          MaximumRetryAttempts: S.optional(S.Number),
          Tags: S.optional(__S(2112, __c66, 0)),
          TumblingWindowInSeconds: S.optional(S.Number),
          Topics: S.optional(__S(2080, __c65, 0)),
          Queues: S.optional(__S(2080, __c65, 0)),
          SourceAccessConfigurations: S.optional(__S(2375, __c74, 7)),
          SelfManagedEventSource: S.optional(__S(2377, __c74, 9)),
          FunctionResponseTypes: S.optional(__S(2144, __c67, 0)),
          AmazonManagedKafkaEventSourceConfig: S.optional(__S(2381, __c74, 13)),
          SelfManagedKafkaEventSourceConfig: S.optional(__S(2381, __c74, 13)),
          DocumentDBEventSourceConfig: S.optional(__S(2382, __c74, 14)),
          ProvisionedPollerConfig: S.optional(__S(2383, __c74, 15)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2015-03-31/event-source-mappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEventSourceMappingRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Pattern: S.optional(S.String) })).annotate({
        identifier: "Filter",
      });
    case 1:
      return S.Array(__S(2368, __c74, 0));
    case 2:
      return S.suspend(() => S.Struct({ Filters: S.optional(__S(2369, __c74, 1)) })).annotate({
        identifier: "FilterCriteria",
      });
    case 3:
      return S.suspend(() => S.Struct({ Metrics: S.optional(__S(2144, __c67, 0)) })).annotate({
        identifier: "EventSourceMappingMetricsConfig",
      });
    case 4:
      return S.suspend(() => S.Struct({ SystemLogLevel: S.optional(S.String) })).annotate({
        identifier: "EventSourceMappingLoggingConfig",
      });
    case 5:
      return S.suspend(() => S.Struct({ MaximumConcurrency: S.optional(S.Number) })).annotate({
        identifier: "ScalingConfig",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), URI: S.optional(S.String) }),
      ).annotate({ identifier: "SourceAccessConfiguration" });
    case 7:
      return S.Array(__S(2374, __c74, 6));
    case 8:
      return S.Record(S.String, /*@__PURE__*/ __S(2080, __c65, 0).pipe(S.optional));
    case 9:
      return S.suspend(() => S.Struct({ Endpoints: S.optional(__S(2376, __c74, 8)) })).annotate({
        identifier: "SelfManagedEventSource",
      });
    case 10:
      return S.suspend(() => S.Struct({ Attribute: S.optional(S.String) })).annotate({
        identifier: "KafkaSchemaValidationConfig",
      });
    case 11:
      return S.Array(__S(2378, __c74, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          SchemaRegistryURI: S.optional(S.String),
          EventRecordFormat: S.optional(S.String),
          AccessConfigs: S.optional(__S(2375, __c74, 7)),
          SchemaValidationConfigs: S.optional(__S(2379, __c74, 11)),
        }),
      ).annotate({ identifier: "KafkaSchemaRegistryConfig" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          ConsumerGroupId: S.optional(S.String),
          SchemaRegistryConfig: S.optional(__S(2380, __c74, 12)),
        }),
      ).annotate({ identifier: "AmazonManagedKafkaEventSourceConfig" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.optional(S.String),
          CollectionName: S.optional(S.String),
          FullDocument: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentDBEventSourceConfig" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          MinimumPollers: S.optional(S.Number),
          MaximumPollers: S.optional(S.Number),
          PollerGroupName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProvisionedPollerConfig" });
    case 16:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "FilterCriteriaError" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          UUID: S.optional(S.String),
          StartingPosition: S.optional(S.String),
          StartingPositionTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          BatchSize: S.optional(S.Number),
          MaximumBatchingWindowInSeconds: S.optional(S.Number),
          ParallelizationFactor: S.optional(S.Number),
          EventSourceArn: S.optional(S.String),
          FilterCriteria: S.optional(__S(2370, __c74, 2)),
          FilterCriteriaError: S.optional(__S(2384, __c74, 16)),
          KMSKeyArn: S.optional(S.String),
          MetricsConfig: S.optional(__S(2371, __c74, 3)),
          LoggingConfig: S.optional(__S(2372, __c74, 4)),
          ScalingConfig: S.optional(__S(2373, __c74, 5)),
          FunctionArn: S.optional(S.String),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastProcessingResult: S.optional(S.String),
          State: S.optional(S.String),
          StateTransitionReason: S.optional(S.String),
          DestinationConfig: S.optional(__S(2401, __c75, 1)),
          Topics: S.optional(__S(2080, __c65, 0)),
          Queues: S.optional(__S(2080, __c65, 0)),
          SourceAccessConfigurations: S.optional(__S(2375, __c74, 7)),
          SelfManagedEventSource: S.optional(__S(2377, __c74, 9)),
          MaximumRecordAgeInSeconds: S.optional(S.Number),
          BisectBatchOnFunctionError: S.optional(S.Boolean),
          MaximumRetryAttempts: S.optional(S.Number),
          TumblingWindowInSeconds: S.optional(S.Number),
          FunctionResponseTypes: S.optional(__S(2144, __c67, 0)),
          AmazonManagedKafkaEventSourceConfig: S.optional(__S(2381, __c74, 13)),
          SelfManagedKafkaEventSourceConfig: S.optional(__S(2381, __c74, 13)),
          DocumentDBEventSourceConfig: S.optional(__S(2382, __c74, 14)),
          EventSourceMappingArn: S.optional(S.String),
          ProvisionedPollerConfig: S.optional(__S(2383, __c74, 15)),
        }),
      ).annotate({ identifier: "EventSourceMappingConfiguration" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Destination: S.optional(S.String) })).annotate({
        identifier: "OnSuccess",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OnSuccess: S.optional(__S(2400, __c75, 0)),
          OnFailure: S.optional(__S(2400, __c75, 0)),
        }),
      ).annotate({ identifier: "DestinationConfig" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ZipFile: S.optional(SensitiveBlob),
          S3Bucket: S.optional(S.String),
          S3Key: S.optional(S.String),
          S3ObjectVersion: S.optional(S.String),
          S3ObjectStorageMode: S.optional(S.String),
          ImageUri: S.optional(S.String),
          SourceKMSKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "FunctionCode" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String,
          Runtime: S.optional(S.String),
          Role: S.String,
          Handler: S.optional(S.String),
          Code: __S(2432, __c76, 0),
          Description: S.optional(S.String),
          Timeout: S.optional(S.Number),
          MemorySize: S.optional(S.Number),
          Publish: S.optional(S.Boolean),
          PublishTo: S.optional(S.String),
          VpcConfig: S.optional(__S(2464, __c77, 0)),
          PackageType: S.optional(S.String),
          DeadLetterConfig: S.optional(__S(2528, __c79, 0)),
          Environment: S.optional(__S(2465, __c77, 1)),
          KMSKeyArn: S.optional(S.String),
          TracingConfig: S.optional(__S(2530, __c79, 2)),
          Tags: S.optional(__S(2112, __c66, 0)),
          Layers: S.optional(__S(2080, __c65, 0)),
          FileSystemConfigs: S.optional(__S(2533, __c79, 5)),
          CodeSigningConfigArn: S.optional(S.String),
          ImageConfig: S.optional(__S(2534, __c79, 6)),
          Architectures: S.optional(__S(2144, __c67, 0)),
          EphemeralStorage: S.optional(__S(2535, __c79, 7)),
          SnapStart: S.optional(__S(2466, __c77, 2)),
          LoggingConfig: S.optional(__S(2536, __c79, 8)),
          TenancyConfig: S.optional(__S(2537, __c79, 9)),
          CapacityProviderConfig: S.optional(__S(2539, __c79, 11)),
          DurableConfig: S.optional(__S(2496, __c78, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2015-03-31/functions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFunctionRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__S(2080, __c65, 0)),
          SecurityGroupIds: S.optional(__S(2080, __c65, 0)),
          Ipv6AllowedForDualStack: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "VpcConfig" });
    case 1:
      return S.suspend(() => S.Struct({ Variables: S.optional(__S(2529, __c79, 1)) })).annotate({
        identifier: "Environment",
      });
    case 2:
      return S.suspend(() => S.Struct({ ApplyOn: S.optional(S.String) })).annotate({
        identifier: "SnapStart",
      });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KMSKeyArn: S.optional(S.String),
          RetentionPeriodInDays: S.optional(S.Number),
          ExecutionTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DurableConfig" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TargetArn: S.optional(S.String) })).annotate({
        identifier: "DeadLetterConfig",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 2:
      return S.suspend(() => S.Struct({ Mode: S.optional(S.String) })).annotate({
        identifier: "TracingConfig",
      });
    case 3:
      return S.suspend(() => S.Struct({ DirectS3Read: S.optional(S.String) })).annotate({
        identifier: "S3FilesConfig",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          LocalMountPath: S.String,
          S3FilesConfig: S.optional(__S(2531, __c79, 3)),
        }),
      ).annotate({ identifier: "FileSystemConfig" });
    case 5:
      return S.Array(__S(2532, __c79, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          EntryPoint: S.optional(__S(2080, __c65, 0)),
          Command: S.optional(__S(2080, __c65, 0)),
          WorkingDirectory: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImageConfig" });
    case 7:
      return S.suspend(() => S.Struct({ Size: S.Number })).annotate({
        identifier: "EphemeralStorage",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          LogFormat: S.optional(S.String),
          ApplicationLogLevel: S.optional(S.String),
          SystemLogLevel: S.optional(S.String),
          LogGroup: S.optional(S.String),
        }),
      ).annotate({ identifier: "LoggingConfig" });
    case 9:
      return S.suspend(() => S.Struct({ TenantIsolationMode: S.String })).annotate({
        identifier: "TenancyConfig",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          CapacityProviderArn: S.String,
          PerExecutionEnvironmentMaxConcurrency: S.optional(S.Number),
          ExecutionEnvironmentMemoryGiBPerVCpu: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LambdaManagedInstancesCapacityProviderConfig" });
    case 11:
      return S.suspend(() =>
        S.Struct({ LambdaManagedInstancesCapacityProviderConfig: __S(2538, __c79, 10) }),
      ).annotate({ identifier: "CapacityProviderConfig" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__S(2080, __c65, 0)),
          SecurityGroupIds: S.optional(__S(2080, __c65, 0)),
          VpcId: S.optional(S.String),
          Ipv6AllowedForDualStack: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "VpcConfigResponse" });
    case 13:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), Message: S.optional(SensitiveString) }),
      ).annotate({ identifier: "EnvironmentError" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Variables: S.optional(__S(2529, __c79, 1)),
          Error: S.optional(__S(2541, __c79, 13)),
        }),
      ).annotate({ identifier: "EnvironmentResponse" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CodeSize: S.optional(S.Number),
          SigningProfileVersionArn: S.optional(S.String),
          SigningJobArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Layer" });
    case 16:
      return S.Array(__S(2543, __c79, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          ImageConfig: S.optional(__S(2534, __c79, 6)),
          Error: S.optional(__S(2541, __c79, 13)),
        }),
      ).annotate({ identifier: "ImageConfigResponse" });
    case 18:
      return S.suspend(() =>
        S.Struct({ ApplyOn: S.optional(S.String), OptimizationStatus: S.optional(S.String) }),
      ).annotate({ identifier: "SnapStartResponse" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          RuntimeVersionArn: S.optional(S.String),
          Error: S.optional(__S(2541, __c79, 13)),
        }),
      ).annotate({ identifier: "RuntimeVersionConfig" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.optional(S.String),
          FunctionArn: S.optional(S.String),
          Runtime: S.optional(S.String),
          Role: S.optional(S.String),
          Handler: S.optional(S.String),
          CodeSize: S.optional(S.Number),
          Description: S.optional(S.String),
          Timeout: S.optional(S.Number),
          MemorySize: S.optional(S.Number),
          LastModified: S.optional(S.String),
          CodeSha256: S.optional(S.String),
          Version: S.optional(S.String),
          VpcConfig: S.optional(__S(2540, __c79, 12)),
          DeadLetterConfig: S.optional(__S(2528, __c79, 0)),
          Environment: S.optional(__S(2542, __c79, 14)),
          KMSKeyArn: S.optional(S.String),
          TracingConfig: S.optional(__S(2530, __c79, 2)),
          MasterArn: S.optional(S.String),
          RevisionId: S.optional(S.String),
          Layers: S.optional(__S(2544, __c79, 16)),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
          StateReasonCode: S.optional(S.String),
          LastUpdateStatus: S.optional(S.String),
          LastUpdateStatusReason: S.optional(S.String),
          LastUpdateStatusReasonCode: S.optional(S.String),
          FileSystemConfigs: S.optional(__S(2533, __c79, 5)),
          SigningProfileVersionArn: S.optional(S.String),
          SigningJobArn: S.optional(S.String),
          PackageType: S.optional(S.String),
          ImageConfigResponse: S.optional(__S(2545, __c79, 17)),
          Architectures: S.optional(__S(2144, __c67, 0)),
          EphemeralStorage: S.optional(__S(2535, __c79, 7)),
          SnapStart: S.optional(__S(2546, __c79, 18)),
          RuntimeVersionConfig: S.optional(__S(2547, __c79, 19)),
          LoggingConfig: S.optional(__S(2536, __c79, 8)),
          TenancyConfig: S.optional(__S(2537, __c79, 9)),
          CapacityProviderConfig: S.optional(__S(2539, __c79, 11)),
          ConfigSha256: S.optional(S.String),
          DurableConfig: S.optional(__S(2496, __c78, 0)),
        }),
      ).annotate({ identifier: "FunctionConfiguration" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
          AuthType: S.String,
          Cors: S.optional(__S(2592, __c81, 0)),
          InvokeMode: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2021-10-31/functions/{FunctionName}/url" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFunctionUrlConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionUrl: S.String,
          FunctionArn: S.String,
          AuthType: S.String,
          Cors: S.optional(__S(2592, __c81, 0)),
          CreationTime: S.String,
          InvokeMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateFunctionUrlConfigResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AllowCredentials: S.optional(S.Boolean),
          AllowHeaders: S.optional(__S(2080, __c65, 0)),
          AllowMethods: S.optional(__S(2080, __c65, 0)),
          AllowOrigins: S.optional(__S(2080, __c65, 0)),
          ExposeHeaders: S.optional(__S(2080, __c65, 0)),
          MaxAge: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Cors" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2015-03-31/functions/{FunctionName}/aliases/{Name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAliasRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAliasResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CapacityProviderName: S.String.pipe(T.HttpLabel("CapacityProviderName")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2025-11-30/capacity-providers/{CapacityProviderName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCapacityProviderRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CodeSigningConfigArn: S.String.pipe(T.HttpLabel("CodeSigningConfigArn")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2020-04-22/code-signing-configs/{CodeSigningConfigArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCodeSigningConfigRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UUID: S.String.pipe(T.HttpLabel("UUID")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2015-03-31/event-source-mappings/{UUID}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEventSourceMappingRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2015-03-31/functions/{FunctionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ StatusCode: S.optional(S.Number).pipe(T.HttpResponseCode()) }),
      ).annotate({ identifier: "DeleteFunctionResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FunctionName: S.String.pipe(T.HttpLabel("FunctionName")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2020-06-30/functions/{FunctionName}/code-signing-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFunctionCodeSigningConfigRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FunctionName: S.String.pipe(T.HttpLabel("FunctionName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2017-10-31/functions/{FunctionName}/concurrency" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFunctionConcurrencyRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2019-09-25/functions/{FunctionName}/event-invoke-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFunctionEventInvokeConfigRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2021-10-31/functions/{FunctionName}/url" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFunctionUrlConfigRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LayerName: S.String.pipe(T.HttpLabel("LayerName")),
          VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2018-10-31/layers/{LayerName}/versions/{VersionNumber}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLayerVersionRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.String.pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/2019-09-30/functions/{FunctionName}/provisioned-concurrency",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProvisionedConcurrencyConfigRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          RevisionId: S.optional(S.String).pipe(T.HttpQuery("RevisionId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/2026-07-09/resource-policy/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2016-08-19/account-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TotalCodeSize: S.optional(S.Number),
          CodeSizeUnzipped: S.optional(S.Number),
          CodeSizeZipped: S.optional(S.Number),
          ConcurrentExecutions: S.optional(S.Number),
          UnreservedConcurrentExecutions: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AccountLimit" });
    case 2:
      return S.suspend(() =>
        S.Struct({ TotalCodeSize: S.optional(S.Number), FunctionCount: S.optional(S.Number) }),
      ).annotate({ identifier: "AccountUsage" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccountLimit: S.optional(__S(3041, __c95, 1)),
          AccountUsage: S.optional(__S(3042, __c95, 2)),
        }),
      ).annotate({ identifier: "GetAccountSettingsResponse" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2015-03-31/functions/{FunctionName}/aliases/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAliasRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CapacityProviderName: S.String.pipe(T.HttpLabel("CapacityProviderName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-11-30/capacity-providers/{CapacityProviderName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCapacityProviderRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CodeSigningConfigArn: S.String.pipe(T.HttpLabel("CodeSigningConfigArn")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2020-04-22/code-signing-configs/{CodeSigningConfigArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCodeSigningConfigRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DurableExecutionArn: S.String.pipe(T.HttpLabel("DurableExecutionArn")),
          IncludeExecutionData: S.optional(S.Boolean).pipe(T.HttpQuery("IncludeExecutionData")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2025-12-01/durable-executions/{DurableExecutionArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDurableExecutionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ XAmznTraceId: S.optional(S.String) })).annotate({
        identifier: "TraceHeader",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DurableExecutionArn: S.String,
          DurableExecutionName: S.String,
          FunctionArn: S.String,
          InputPayload: S.optional(SensitiveString),
          Result: S.optional(SensitiveString),
          Error: S.optional(__S(1921, __c60, 1)),
          StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Status: S.String,
          EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Version: S.optional(S.String),
          TraceHeader: S.optional(__S(3169, __c99, 1)),
          ExecutionDataIncluded: S.optional(S.Boolean),
          DurableConfig: S.optional(__S(2496, __c78, 0)),
        }),
      ).annotate({ identifier: "GetDurableExecutionResponse" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DurableExecutionArn: S.String.pipe(T.HttpLabel("DurableExecutionArn")),
          IncludeExecutionData: S.optional(S.Boolean).pipe(T.HttpQuery("IncludeExecutionData")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          ReverseOrder: S.optional(S.Boolean).pipe(T.HttpQuery("ReverseOrder")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2025-12-01/durable-executions/{DurableExecutionArn}/history",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDurableExecutionHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Payload: S.optional(SensitiveString), Truncated: S.optional(S.Boolean) }),
      ).annotate({ identifier: "EventInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Input: __S(3201, __c100, 1), ExecutionTimeout: S.Number }),
      ).annotate({ identifier: "ExecutionStartedDetails" });
    case 3:
      return S.suspend(() => S.Struct({ Result: __S(3201, __c100, 1) })).annotate({
        identifier: "ExecutionSucceededDetails",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ Payload: S.optional(__S(1921, __c60, 1)), Truncated: S.optional(S.Boolean) }),
      ).annotate({ identifier: "EventError" });
    case 5:
      return S.suspend(() => S.Struct({ Error: __S(3204, __c100, 4) })).annotate({
        identifier: "ExecutionFailedDetails",
      });
    case 6:
      return S.suspend(() => S.Struct({ Error: S.optional(__S(3204, __c100, 4)) })).annotate({
        identifier: "ExecutionTimedOutDetails",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Duration: S.Number,
          ScheduledEndTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "WaitStartedDetails" });
    case 8:
      return S.suspend(() => S.Struct({ Duration: S.optional(S.Number) })).annotate({
        identifier: "WaitSucceededDetails",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          CurrentAttempt: S.optional(S.Number),
          NextAttemptDelaySeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RetryDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({ Result: __S(3201, __c100, 1), RetryDetails: __S(3209, __c100, 9) }),
      ).annotate({ identifier: "StepSucceededDetails" });
    case 11:
      return S.suspend(() =>
        S.Struct({ Error: __S(3204, __c100, 4), RetryDetails: __S(3209, __c100, 9) }),
      ).annotate({ identifier: "StepFailedDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String,
          TenantId: S.optional(S.String),
          Input: S.optional(__S(3201, __c100, 1)),
          ExecutedVersion: S.optional(S.String),
          DurableExecutionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChainedInvokeStartedDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          CallbackId: S.String,
          HeartbeatTimeout: S.optional(S.Number),
          Timeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CallbackStartedDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RequestId: S.String,
          Error: S.optional(__S(3204, __c100, 4)),
        }),
      ).annotate({ identifier: "InvocationCompletedDetails" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          EventType: S.optional(S.String),
          SubType: S.optional(S.String),
          EventId: S.optional(S.Number),
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          EventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ParentId: S.optional(S.String),
          ExecutionStartedDetails: S.optional(__S(3202, __c100, 2)),
          ExecutionSucceededDetails: S.optional(__S(3203, __c100, 3)),
          ExecutionFailedDetails: S.optional(__S(3205, __c100, 5)),
          ExecutionTimedOutDetails: S.optional(__S(3206, __c100, 6)),
          ExecutionStoppedDetails: S.optional(__S(3205, __c100, 5)),
          ContextStartedDetails: S.optional(__S(2656, __c83, 0)),
          ContextSucceededDetails: S.optional(__S(3203, __c100, 3)),
          ContextFailedDetails: S.optional(__S(3205, __c100, 5)),
          WaitStartedDetails: S.optional(__S(3207, __c100, 7)),
          WaitSucceededDetails: S.optional(__S(3208, __c100, 8)),
          WaitCancelledDetails: S.optional(__S(3206, __c100, 6)),
          StepStartedDetails: S.optional(__S(2656, __c83, 0)),
          StepSucceededDetails: S.optional(__S(3210, __c100, 10)),
          StepFailedDetails: S.optional(__S(3211, __c100, 11)),
          ChainedInvokeStartedDetails: S.optional(__S(3212, __c100, 12)),
          ChainedInvokeSucceededDetails: S.optional(__S(3203, __c100, 3)),
          ChainedInvokeFailedDetails: S.optional(__S(3205, __c100, 5)),
          ChainedInvokeTimedOutDetails: S.optional(__S(3205, __c100, 5)),
          ChainedInvokeStoppedDetails: S.optional(__S(3205, __c100, 5)),
          CallbackStartedDetails: S.optional(__S(3213, __c100, 13)),
          CallbackSucceededDetails: S.optional(__S(3203, __c100, 3)),
          CallbackFailedDetails: S.optional(__S(3205, __c100, 5)),
          CallbackTimedOutDetails: S.optional(__S(3205, __c100, 5)),
          InvocationCompletedDetails: S.optional(__S(3214, __c100, 14)),
        }),
      ).annotate({ identifier: "Event" });
    case 16:
      return S.Array(__S(3215, __c100, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ Events: __S(3216, __c100, 16), NextMarker: S.optional(S.String) }),
      ).annotate({ identifier: "GetDurableExecutionHistoryResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DurableExecutionArn: S.String.pipe(T.HttpLabel("DurableExecutionArn")),
          CheckpointToken: S.String.pipe(T.HttpQuery("CheckpointToken")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
          MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2025-12-01/durable-executions/{DurableExecutionArn}/state",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDurableExecutionStateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Operations: __S(1959, __c61, 7), NextMarker: S.optional(S.String) }),
      ).annotate({ identifier: "GetDurableExecutionStateResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UUID: S.String.pipe(T.HttpLabel("UUID")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2015-03-31/event-source-mappings/{UUID}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEventSourceMappingRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2015-03-31/functions/{FunctionName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RepositoryType: S.optional(S.String),
          Location: S.optional(S.String),
          ImageUri: S.optional(S.String),
          ResolvedImageUri: S.optional(S.String),
          ResolvedS3Object: S.optional(__S(3328, __c104, 0)),
          SourceKMSKeyArn: S.optional(S.String),
          Error: S.optional(__S(2541, __c79, 13)),
        }),
      ).annotate({ identifier: "FunctionCodeLocation" });
    case 2:
      return S.suspend(() => S.Struct({ ErrorCode: S.String, Message: S.String })).annotate({
        identifier: "TagsError",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Configuration: S.optional(__S(2548, __c79, 20)),
          Code: S.optional(__S(3297, __c103, 1)),
          Tags: S.optional(__S(2112, __c66, 0)),
          TagsError: S.optional(__S(3298, __c103, 2)),
          Concurrency: S.optional(__S(3360, __c105, 0)),
        }),
      ).annotate({ identifier: "GetFunctionResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          S3Bucket: S.optional(S.String),
          S3Key: S.optional(S.String),
          S3ObjectVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResolvedS3Object" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReservedConcurrentExecutions: S.optional(S.Number) }),
      ).annotate({ identifier: "Concurrency" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FunctionName: S.String.pipe(T.HttpLabel("FunctionName")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2020-06-30/functions/{FunctionName}/code-signing-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionCodeSigningConfigRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CodeSigningConfigArn: S.String, FunctionName: S.String }),
      ).annotate({ identifier: "GetFunctionCodeSigningConfigResponse" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FunctionName: S.String.pipe(T.HttpLabel("FunctionName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2019-09-30/functions/{FunctionName}/concurrency" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionConcurrencyRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2015-03-31/functions/{FunctionName}/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionConfigurationRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2019-09-25/functions/{FunctionName}/event-invoke-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionEventInvokeConfigRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FunctionArn: S.optional(S.String),
          MaximumRetryAttempts: S.optional(S.Number),
          MaximumEventAgeInSeconds: S.optional(S.Number),
          DestinationConfig: S.optional(__S(2401, __c75, 1)),
        }),
      ).annotate({ identifier: "FunctionEventInvokeConfig" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FunctionName: S.String.pipe(T.HttpLabel("FunctionName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/2024-08-31/functions/{FunctionName}/recursion-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionRecursionConfigRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RecursiveLoop: S.optional(S.String) })).annotate({
        identifier: "GetFunctionRecursionConfigResponse",
      });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
          Qualifier: S.String.pipe(T.HttpQuery("Qualifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/2025-11-30/functions/{FunctionName}/function-scaling-config",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionScalingConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionArn: S.optional(S.String),
          AppliedFunctionScalingConfig: S.optional(__S(3680, __c115, 0)),
          RequestedFunctionScalingConfig: S.optional(__S(3680, __c115, 0)),
        }),
      ).annotate({ identifier: "GetFunctionScalingConfigResponse" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MinExecutionEnvironments: S.optional(S.Number),
          MaxExecutionEnvironments: S.optional(S.Number),
        }),
      ).annotate({ identifier: "FunctionScalingConfig" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
