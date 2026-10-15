import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://organizations.amazonaws.com/doc/2016-11-28/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Organizations",
  serviceShapeName: "AWSOrganizationsV20161128",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "organizations" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-11-28");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({
      authSchemes: [{ name: "sigv4", signingName: "organizations", signingRegion: "us-east-1" }],
    });
    const _p1 = () => ({
      authSchemes: [
        { name: "sigv4", signingName: "organizations", signingRegion: "us-gov-west-1" },
      ],
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://organizations.us-east-1.amazonaws.com", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://organizations-fips.us-east-1.amazonaws.com", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://organizations.cn-northwest-1.amazonaws.com.cn",
              {
                authSchemes: [
                  { name: "sigv4", signingName: "organizations", signingRegion: "cn-northwest-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://organizations.us-gov-west-1.amazonaws.com", _p1(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e("https://organizations.us-gov-west-1.amazonaws.com", _p1(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://organizations.us-iso-east-1.c2s.ic.gov",
              {
                authSchemes: [
                  { name: "sigv4", signingName: "organizations", signingRegion: "us-iso-east-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://organizations.us-isob-east-1.sc2s.sgov.gov",
              {
                authSchemes: [
                  { name: "sigv4", signingName: "organizations", signingRegion: "us-isob-east-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://organizations.us-isof-south-1.csp.hci.ic.gov",
              {
                authSchemes: [
                  { name: "sigv4", signingName: "organizations", signingRegion: "us-isof-south-1" },
                ],
              },
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://organizations-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://organizations-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://organizations.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(`https://organizations.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://organizations.us-east-1.{D}","properties":{"authSchemes":[{"name":"sigv4","signingName":"organizations","signingRegion":"us-east-1"}]},"headers":{}}',
  [
    "us-gov-west-1",
    "us-gov-east-1",
    "aws-us-gov-global",
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AccessDeniedForDependencyException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedForDependencyException>()(
    "AccessDeniedForDependencyException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "AccessDeniedForDependencyExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AccountAlreadyClosedException
  extends /*@__PURE__*/ S.TaggedError<AccountAlreadyClosedException>()(
    "AccountAlreadyClosedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class AccountAlreadyRegisteredException
  extends /*@__PURE__*/ S.TaggedError<AccountAlreadyRegisteredException>()(
    "AccountAlreadyRegisteredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class AccountNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AccountNotFoundException>()(
    "AccountNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class AccountNotRegisteredException
  extends /*@__PURE__*/ S.TaggedError<AccountNotRegisteredException>()(
    "AccountNotRegisteredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class AccountOwnerNotVerifiedException
  extends /*@__PURE__*/ S.TaggedError<AccountOwnerNotVerifiedException>()(
    "AccountOwnerNotVerifiedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AlreadyInOrganizationException
  extends /*@__PURE__*/ S.TaggedError<AlreadyInOrganizationException>()(
    "AlreadyInOrganizationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class AWSOrganizationsNotInUseException
  extends /*@__PURE__*/ S.TaggedError<AWSOrganizationsNotInUseException>()(
    "AWSOrganizationsNotInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ChildNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ChildNotFoundException>()(
    "ChildNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConstraintViolationException
  extends /*@__PURE__*/ S.TaggedError<ConstraintViolationException>()(
    "ConstraintViolationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ConstraintViolationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CreateAccountStatusNotFoundException
  extends /*@__PURE__*/ S.TaggedError<CreateAccountStatusNotFoundException>()(
    "CreateAccountStatusNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class DestinationParentNotFoundException
  extends /*@__PURE__*/ S.TaggedError<DestinationParentNotFoundException>()(
    "DestinationParentNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class DuplicateAccountException
  extends /*@__PURE__*/ S.TaggedError<DuplicateAccountException>()(
    "DuplicateAccountException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DuplicateHandshakeException
  extends /*@__PURE__*/ S.TaggedError<DuplicateHandshakeException>()(
    "DuplicateHandshakeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DuplicateOrganizationalUnitException
  extends /*@__PURE__*/ S.TaggedError<DuplicateOrganizationalUnitException>()(
    "DuplicateOrganizationalUnitException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DuplicatePolicyAttachmentException
  extends /*@__PURE__*/ S.TaggedError<DuplicatePolicyAttachmentException>()(
    "DuplicatePolicyAttachmentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DuplicatePolicyException
  extends /*@__PURE__*/ S.TaggedError<DuplicatePolicyException>()(
    "DuplicatePolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class EffectivePolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EffectivePolicyNotFoundException>()(
    "EffectivePolicyNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class FinalizingOrganizationException
  extends /*@__PURE__*/ S.TaggedError<FinalizingOrganizationException>()(
    "FinalizingOrganizationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class HandshakeAlreadyInStateException
  extends /*@__PURE__*/ S.TaggedError<HandshakeAlreadyInStateException>()(
    "HandshakeAlreadyInStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class HandshakeConstraintViolationException
  extends /*@__PURE__*/ S.TaggedError<HandshakeConstraintViolationException>()(
    "HandshakeConstraintViolationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "HandshakeConstraintViolationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class HandshakeNotFoundException
  extends /*@__PURE__*/ S.TaggedError<HandshakeNotFoundException>()(
    "HandshakeNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class InvalidHandshakeTransitionException
  extends /*@__PURE__*/ S.TaggedError<InvalidHandshakeTransitionException>()(
    "InvalidHandshakeTransitionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "InvalidInputExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidResponsibilityTransferTransitionException
  extends /*@__PURE__*/ S.TaggedError<InvalidResponsibilityTransferTransitionException>()(
    "InvalidResponsibilityTransferTransitionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyDocumentException>()(
    "MalformedPolicyDocumentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MasterCannotLeaveOrganizationException
  extends /*@__PURE__*/ S.TaggedError<MasterCannotLeaveOrganizationException>()(
    "MasterCannotLeaveOrganizationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class OrganizationalUnitNotEmptyException
  extends /*@__PURE__*/ S.TaggedError<OrganizationalUnitNotEmptyException>()(
    "OrganizationalUnitNotEmptyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class OrganizationalUnitNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OrganizationalUnitNotFoundException>()(
    "OrganizationalUnitNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class OrganizationNotEmptyException
  extends /*@__PURE__*/ S.TaggedError<OrganizationNotEmptyException>()(
    "OrganizationNotEmptyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ParentNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ParentNotFoundException>()(
    "ParentNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class PolicyChangesInProgressException
  extends /*@__PURE__*/ S.TaggedError<PolicyChangesInProgressException>()(
    "PolicyChangesInProgressException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PolicyInUseException
  extends /*@__PURE__*/ S.TaggedError<PolicyInUseException>()(
    "PolicyInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class PolicyNotAttachedException
  extends /*@__PURE__*/ S.TaggedError<PolicyNotAttachedException>()(
    "PolicyNotAttachedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class PolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PolicyNotFoundException>()(
    "PolicyNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class PolicyTypeAlreadyEnabledException
  extends /*@__PURE__*/ S.TaggedError<PolicyTypeAlreadyEnabledException>()(
    "PolicyTypeAlreadyEnabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class PolicyTypeNotAvailableForOrganizationException
  extends /*@__PURE__*/ S.TaggedError<PolicyTypeNotAvailableForOrganizationException>()(
    "PolicyTypeNotAvailableForOrganizationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class PolicyTypeNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<PolicyTypeNotEnabledException>()(
    "PolicyTypeNotEnabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourcePolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyNotFoundException>()(
    "ResourcePolicyNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResponsibilityTransferAlreadyInStatusException
  extends /*@__PURE__*/ S.TaggedError<ResponsibilityTransferAlreadyInStatusException>()(
    "ResponsibilityTransferAlreadyInStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResponsibilityTransferNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResponsibilityTransferNotFoundException>()(
    "ResponsibilityTransferNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RootNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RootNotFoundException>()(
    "RootNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class SourceParentNotFoundException
  extends /*@__PURE__*/ S.TaggedError<SourceParentNotFoundException>()(
    "SourceParentNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TargetNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TargetNotFoundException>()(
    "TargetNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      Type: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnsupportedAPIEndpointException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedAPIEndpointException>()(
    "UnsupportedAPIEndpointException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export type HandshakeId = string;
export interface AcceptHandshakeRequest {
  HandshakeId: string;
}
export type HandshakeArn = string;
export type HandshakePartyId = string | redacted.Redacted<string>;
export type HandshakePartyType = "ACCOUNT" | "ORGANIZATION" | "EMAIL" | (string & {});
export interface HandshakeParty {
  Id: string | redacted.Redacted<string>;
  Type: HandshakePartyType;
}
export type HandshakeParties = HandshakeParty[];
export type HandshakeState =
  | "REQUESTED"
  | "OPEN"
  | "CANCELED"
  | "ACCEPTED"
  | "DECLINED"
  | "EXPIRED"
  | (string & {});
export type ActionType =
  | "INVITE"
  | "ENABLE_ALL_FEATURES"
  | "APPROVE_ALL_FEATURES"
  | "ADD_ORGANIZATIONS_SERVICE_LINKED_ROLE"
  | "TRANSFER_RESPONSIBILITY"
  | (string & {});
export type HandshakeResourceValue = string | redacted.Redacted<string>;
export type HandshakeResourceType =
  | "ACCOUNT"
  | "ORGANIZATION"
  | "ORGANIZATION_FEATURE_SET"
  | "EMAIL"
  | "MASTER_EMAIL"
  | "MASTER_NAME"
  | "NOTES"
  | "PARENT_HANDSHAKE"
  | "RESPONSIBILITY_TRANSFER"
  | "TRANSFER_START_TIMESTAMP"
  | "TRANSFER_TYPE"
  | "MANAGEMENT_ACCOUNT"
  | "MANAGEMENT_EMAIL"
  | "MANAGEMENT_NAME"
  | (string & {});
export interface HandshakeResource {
  Value?: string | redacted.Redacted<string>;
  Type?: HandshakeResourceType;
  Resources?: HandshakeResource[];
}
export type HandshakeResources = HandshakeResource[];
export interface Handshake {
  Id?: string;
  Arn?: string;
  Parties?: HandshakeParty[];
  State?: HandshakeState;
  RequestedTimestamp?: Date;
  ExpirationTimestamp?: Date;
  Action?: ActionType;
  Resources?: HandshakeResource[];
}
export interface AcceptHandshakeResponse {
  Handshake?: Handshake;
}
export type PolicyId = string;
export type PolicyTargetId = string;
export interface AttachPolicyRequest {
  PolicyId: string;
  TargetId: string;
}
export interface AttachPolicyResponse {}
export interface CancelHandshakeRequest {
  HandshakeId: string;
}
export interface CancelHandshakeResponse {
  Handshake?: Handshake;
}
export type AccountId = string;
export interface CloseAccountRequest {
  AccountId: string;
}
export interface CloseAccountResponse {}
export type Email = string | redacted.Redacted<string>;
export type CreateAccountName = string | redacted.Redacted<string>;
export type RoleName = string;
export type IAMUserAccessToBilling = "ALLOW" | "DENY" | (string & {});
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type Tags = Tag[];
export interface CreateAccountRequest {
  Email: string | redacted.Redacted<string>;
  AccountName: string | redacted.Redacted<string>;
  RoleName?: string;
  IamUserAccessToBilling?: IAMUserAccessToBilling;
  Tags?: Tag[];
}
export type CreateAccountRequestId = string;
export type CreateAccountState = "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | (string & {});
export type CreateAccountFailureReason =
  | "ACCOUNT_LIMIT_EXCEEDED"
  | "EMAIL_ALREADY_EXISTS"
  | "INVALID_ADDRESS"
  | "INVALID_EMAIL"
  | "CONCURRENT_ACCOUNT_MODIFICATION"
  | "INTERNAL_FAILURE"
  | "GOVCLOUD_ACCOUNT_ALREADY_EXISTS"
  | "MISSING_BUSINESS_VALIDATION"
  | "FAILED_BUSINESS_VALIDATION"
  | "PENDING_BUSINESS_VALIDATION"
  | "INVALID_IDENTITY_FOR_BUSINESS_VALIDATION"
  | "UNKNOWN_BUSINESS_VALIDATION"
  | "MISSING_PAYMENT_INSTRUMENT"
  | "INVALID_PAYMENT_INSTRUMENT"
  | "UPDATE_EXISTING_RESOURCE_POLICY_WITH_TAGS_NOT_SUPPORTED"
  | (string & {});
export interface CreateAccountStatus {
  Id?: string;
  AccountName?: string | redacted.Redacted<string>;
  State?: CreateAccountState;
  RequestedTimestamp?: Date;
  CompletedTimestamp?: Date;
  AccountId?: string;
  GovCloudAccountId?: string;
  FailureReason?: CreateAccountFailureReason;
}
export interface CreateAccountResponse {
  CreateAccountStatus?: CreateAccountStatus;
}
export interface CreateGovCloudAccountRequest {
  Email: string | redacted.Redacted<string>;
  AccountName: string | redacted.Redacted<string>;
  RoleName?: string;
  IamUserAccessToBilling?: IAMUserAccessToBilling;
  Tags?: Tag[];
}
export interface CreateGovCloudAccountResponse {
  CreateAccountStatus?: CreateAccountStatus;
}
export type OrganizationFeatureSet = "ALL" | "CONSOLIDATED_BILLING" | (string & {});
export interface CreateOrganizationRequest {
  FeatureSet?: OrganizationFeatureSet;
}
export type OrganizationId = string;
export type OrganizationArn = string;
export type AccountArn = string;
export type PolicyType =
  | "SERVICE_CONTROL_POLICY"
  | "RESOURCE_CONTROL_POLICY"
  | "TAG_POLICY"
  | "BACKUP_POLICY"
  | "AISERVICES_OPT_OUT_POLICY"
  | "CHATBOT_POLICY"
  | "DECLARATIVE_POLICY_EC2"
  | "SECURITYHUB_POLICY"
  | "INSPECTOR_POLICY"
  | "UPGRADE_ROLLOUT_POLICY"
  | "BEDROCK_POLICY"
  | "S3_POLICY"
  | "NETWORK_SECURITY_DIRECTOR_POLICY"
  | "GUARDDUTY_POLICY"
  | (string & {});
export type PolicyTypeStatus = "ENABLED" | "PENDING_ENABLE" | "PENDING_DISABLE" | (string & {});
export interface PolicyTypeSummary {
  Type?: PolicyType;
  Status?: PolicyTypeStatus;
}
export type PolicyTypes = PolicyTypeSummary[];
export interface Organization {
  Id?: string;
  Arn?: string;
  FeatureSet?: OrganizationFeatureSet;
  MasterAccountArn?: string;
  MasterAccountId?: string;
  MasterAccountEmail?: string | redacted.Redacted<string>;
  AvailablePolicyTypes?: PolicyTypeSummary[];
}
export interface CreateOrganizationResponse {
  Organization?: Organization;
}
export type ParentId = string;
export type OrganizationalUnitName = string;
export interface CreateOrganizationalUnitRequest {
  ParentId: string;
  Name: string;
  Tags?: Tag[];
}
export type OrganizationalUnitId = string;
export type OrganizationalUnitArn = string;
export type Path = string;
export interface OrganizationalUnit {
  Id?: string;
  Arn?: string;
  Name?: string;
  Path?: string;
}
export interface CreateOrganizationalUnitResponse {
  OrganizationalUnit?: OrganizationalUnit;
}
export type PolicyContent = string;
export type PolicyDescription = string;
export type PolicyName = string;
export interface CreatePolicyRequest {
  Content: string;
  Description: string;
  Name: string;
  Type: PolicyType;
  Tags?: Tag[];
}
export type PolicyArn = string;
export type AwsManagedPolicy = boolean;
export interface PolicySummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  Type?: PolicyType;
  AwsManaged?: boolean;
}
export interface Policy {
  PolicySummary?: PolicySummary;
  Content?: string;
}
export interface CreatePolicyResponse {
  Policy?: Policy;
}
export interface DeclineHandshakeRequest {
  HandshakeId: string;
}
export interface DeclineHandshakeResponse {
  Handshake?: Handshake;
}
export interface DeleteOrganizationRequest {}
export interface DeleteOrganizationResponse {}
export interface DeleteOrganizationalUnitRequest {
  OrganizationalUnitId: string;
}
export interface DeleteOrganizationalUnitResponse {}
export interface DeletePolicyRequest {
  PolicyId: string;
}
export interface DeletePolicyResponse {}
export interface DeleteResourcePolicyRequest {}
export interface DeleteResourcePolicyResponse {}
export type ServicePrincipal = string;
export interface DeregisterDelegatedAdministratorRequest {
  AccountId: string;
  ServicePrincipal: string;
}
export interface DeregisterDelegatedAdministratorResponse {}
export interface DescribeAccountRequest {
  AccountId: string;
}
export type AccountName = string | redacted.Redacted<string>;
export type AccountStatus = "ACTIVE" | "SUSPENDED" | "PENDING_CLOSURE" | (string & {});
export type AccountState =
  | "PENDING_ACTIVATION"
  | "ACTIVE"
  | "SUSPENDED"
  | "PENDING_CLOSURE"
  | "CLOSED"
  | (string & {});
export type Paths = string[];
export type AccountJoinedMethod = "INVITED" | "CREATED" | (string & {});
export interface Account {
  Id?: string;
  Arn?: string;
  Email?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
  Status?: AccountStatus;
  State?: AccountState;
  Paths?: string[];
  JoinedMethod?: AccountJoinedMethod;
  JoinedTimestamp?: Date;
}
export interface DescribeAccountResponse {
  Account?: Account;
}
export interface DescribeCreateAccountStatusRequest {
  CreateAccountRequestId: string;
}
export interface DescribeCreateAccountStatusResponse {
  CreateAccountStatus?: CreateAccountStatus;
}
export type EffectivePolicyType =
  | "TAG_POLICY"
  | "BACKUP_POLICY"
  | "AISERVICES_OPT_OUT_POLICY"
  | "CHATBOT_POLICY"
  | "DECLARATIVE_POLICY_EC2"
  | "SECURITYHUB_POLICY"
  | "INSPECTOR_POLICY"
  | "UPGRADE_ROLLOUT_POLICY"
  | "BEDROCK_POLICY"
  | "S3_POLICY"
  | "NETWORK_SECURITY_DIRECTOR_POLICY"
  | "GUARDDUTY_POLICY"
  | (string & {});
export interface DescribeEffectivePolicyRequest {
  PolicyType: EffectivePolicyType;
  TargetId?: string;
}
export interface EffectivePolicy {
  PolicyContent?: string;
  LastUpdatedTimestamp?: Date;
  TargetId?: string;
  PolicyType?: EffectivePolicyType;
}
export interface DescribeEffectivePolicyResponse {
  EffectivePolicy?: EffectivePolicy;
}
export interface DescribeHandshakeRequest {
  HandshakeId: string;
}
export interface DescribeHandshakeResponse {
  Handshake?: Handshake;
}
export interface DescribeOrganizationRequest {}
export interface DescribeOrganizationResponse {
  Organization?: Organization;
}
export interface DescribeOrganizationalUnitRequest {
  OrganizationalUnitId: string;
}
export interface DescribeOrganizationalUnitResponse {
  OrganizationalUnit?: OrganizationalUnit;
}
export interface DescribePolicyRequest {
  PolicyId: string;
}
export interface DescribePolicyResponse {
  Policy?: Policy;
}
export interface DescribeResourcePolicyRequest {}
export type ResourcePolicyId = string;
export type ResourcePolicyArn = string;
export interface ResourcePolicySummary {
  Id?: string;
  Arn?: string;
}
export type ResourcePolicyContent = string;
export interface ResourcePolicy {
  ResourcePolicySummary?: ResourcePolicySummary;
  Content?: string;
}
export interface DescribeResourcePolicyResponse {
  ResourcePolicy?: ResourcePolicy;
}
export type ResponsibilityTransferId = string;
export interface DescribeResponsibilityTransferRequest {
  Id: string;
}
export type ResponsibilityTransferArn = string;
export type ResponsibilityTransferName = string | redacted.Redacted<string>;
export type ResponsibilityTransferType = "BILLING" | (string & {});
export type ResponsibilityTransferStatus =
  | "REQUESTED"
  | "DECLINED"
  | "CANCELED"
  | "EXPIRED"
  | "ACCEPTED"
  | "WITHDRAWN"
  | (string & {});
export interface TransferParticipant {
  ManagementAccountId?: string;
  ManagementAccountEmail?: string | redacted.Redacted<string>;
}
export interface ResponsibilityTransfer {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Id?: string;
  Type?: ResponsibilityTransferType;
  Status?: ResponsibilityTransferStatus;
  Source?: TransferParticipant;
  Target?: TransferParticipant;
  StartTimestamp?: Date;
  EndTimestamp?: Date;
  ActiveHandshakeId?: string;
}
export interface DescribeResponsibilityTransferResponse {
  ResponsibilityTransfer?: ResponsibilityTransfer;
}
export interface DetachPolicyRequest {
  PolicyId: string;
  TargetId: string;
}
export interface DetachPolicyResponse {}
export interface DisableAWSServiceAccessRequest {
  ServicePrincipal: string;
}
export interface DisableAWSServiceAccessResponse {}
export type RootId = string;
export interface DisablePolicyTypeRequest {
  RootId: string;
  PolicyType: PolicyType;
}
export type RootArn = string;
export type RootName = string;
export interface Root {
  Id?: string;
  Arn?: string;
  Name?: string;
  PolicyTypes?: PolicyTypeSummary[];
}
export interface DisablePolicyTypeResponse {
  Root?: Root;
}
export interface EnableAllFeaturesRequest {}
export interface EnableAllFeaturesResponse {
  Handshake?: Handshake;
}
export interface EnableAWSServiceAccessRequest {
  ServicePrincipal: string;
}
export interface EnableAWSServiceAccessResponse {}
export interface EnablePolicyTypeRequest {
  RootId: string;
  PolicyType: PolicyType;
}
export interface EnablePolicyTypeResponse {
  Root?: Root;
}
export type HandshakeNotes = string | redacted.Redacted<string>;
export interface InviteAccountToOrganizationRequest {
  Target: HandshakeParty;
  Notes?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export interface InviteAccountToOrganizationResponse {
  Handshake?: Handshake;
}
export interface InviteOrganizationToTransferResponsibilityRequest {
  Type: ResponsibilityTransferType;
  Target: HandshakeParty;
  Notes?: string | redacted.Redacted<string>;
  StartTimestamp: Date;
  SourceName: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export interface InviteOrganizationToTransferResponsibilityResponse {
  Handshake?: Handshake;
}
export interface LeaveOrganizationRequest {}
export interface LeaveOrganizationResponse {}
export type NextToken = string;
export type MaxResults = number;
export interface ListAccountsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type Accounts = Account[];
export interface ListAccountsResponse {
  Accounts?: Account[];
  NextToken?: string;
}
export interface ListAccountsForParentRequest {
  ParentId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListAccountsForParentResponse {
  Accounts?: Account[];
  NextToken?: string;
}
export interface ListAccountsWithInvalidEffectivePolicyRequest {
  PolicyType: EffectivePolicyType;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListAccountsWithInvalidEffectivePolicyResponse {
  Accounts?: Account[];
  PolicyType?: EffectivePolicyType;
  NextToken?: string;
}
export interface ListAWSServiceAccessForOrganizationRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface EnabledServicePrincipal {
  ServicePrincipal?: string;
  DateEnabled?: Date;
}
export type EnabledServicePrincipals = EnabledServicePrincipal[];
export interface ListAWSServiceAccessForOrganizationResponse {
  EnabledServicePrincipals?: EnabledServicePrincipal[];
  NextToken?: string;
}
export type ChildType = "ACCOUNT" | "ORGANIZATIONAL_UNIT" | (string & {});
export interface ListChildrenRequest {
  ParentId: string;
  ChildType: ChildType;
  NextToken?: string;
  MaxResults?: number;
}
export type ChildId = string;
export interface Child {
  Id?: string;
  Type?: ChildType;
}
export type Children = Child[];
export interface ListChildrenResponse {
  Children?: Child[];
  NextToken?: string;
}
export type CreateAccountStates = CreateAccountState[];
export interface ListCreateAccountStatusRequest {
  States?: CreateAccountState[];
  NextToken?: string;
  MaxResults?: number;
}
export type CreateAccountStatuses = CreateAccountStatus[];
export interface ListCreateAccountStatusResponse {
  CreateAccountStatuses?: CreateAccountStatus[];
  NextToken?: string;
}
export interface ListDelegatedAdministratorsRequest {
  ServicePrincipal?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DelegatedAdministrator {
  Id?: string;
  Arn?: string;
  Email?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
  Status?: AccountStatus;
  State?: AccountState;
  JoinedMethod?: AccountJoinedMethod;
  JoinedTimestamp?: Date;
  DelegationEnabledDate?: Date;
}
export type DelegatedAdministrators = DelegatedAdministrator[];
export interface ListDelegatedAdministratorsResponse {
  DelegatedAdministrators?: DelegatedAdministrator[];
  NextToken?: string;
}
export interface ListDelegatedServicesForAccountRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface DelegatedService {
  ServicePrincipal?: string;
  DelegationEnabledDate?: Date;
}
export type DelegatedServices = DelegatedService[];
export interface ListDelegatedServicesForAccountResponse {
  DelegatedServices?: DelegatedService[];
  NextToken?: string;
}
export interface ListEffectivePolicyValidationErrorsRequest {
  AccountId: string;
  PolicyType: EffectivePolicyType;
  NextToken?: string;
  MaxResults?: number;
}
export type ErrorCode = string;
export type ErrorMessage = string;
export type PathToError = string;
export type PolicyIds = string[];
export interface EffectivePolicyValidationError {
  ErrorCode?: string;
  ErrorMessage?: string;
  PathToError?: string;
  ContributingPolicies?: string[];
}
export type EffectivePolicyValidationErrors = EffectivePolicyValidationError[];
export interface ListEffectivePolicyValidationErrorsResponse {
  AccountId?: string;
  PolicyType?: EffectivePolicyType;
  Path?: string;
  EvaluationTimestamp?: Date;
  NextToken?: string;
  EffectivePolicyValidationErrors?: EffectivePolicyValidationError[];
}
export interface HandshakeFilter {
  ActionType?: ActionType;
  ParentHandshakeId?: string;
}
export interface ListHandshakesForAccountRequest {
  Filter?: HandshakeFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type Handshakes = Handshake[];
export interface ListHandshakesForAccountResponse {
  Handshakes?: Handshake[];
  NextToken?: string;
}
export interface ListHandshakesForOrganizationRequest {
  Filter?: HandshakeFilter;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListHandshakesForOrganizationResponse {
  Handshakes?: Handshake[];
  NextToken?: string;
}
export interface ListInboundResponsibilityTransfersRequest {
  Type: ResponsibilityTransferType;
  Id?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ResponsibilityTransfers = ResponsibilityTransfer[];
export interface ListInboundResponsibilityTransfersResponse {
  ResponsibilityTransfers?: ResponsibilityTransfer[];
  NextToken?: string;
}
export interface ListOrganizationalUnitsForParentRequest {
  ParentId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type OrganizationalUnits = OrganizationalUnit[];
export interface ListOrganizationalUnitsForParentResponse {
  OrganizationalUnits?: OrganizationalUnit[];
  NextToken?: string;
}
export interface ListOutboundResponsibilityTransfersRequest {
  Type: ResponsibilityTransferType;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListOutboundResponsibilityTransfersResponse {
  ResponsibilityTransfers?: ResponsibilityTransfer[];
  NextToken?: string;
}
export interface ListParentsRequest {
  ChildId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ParentType = "ROOT" | "ORGANIZATIONAL_UNIT" | (string & {});
export interface Parent {
  Id?: string;
  Type?: ParentType;
}
export type Parents = Parent[];
export interface ListParentsResponse {
  Parents?: Parent[];
  NextToken?: string;
}
export interface ListPoliciesRequest {
  Filter: PolicyType;
  NextToken?: string;
  MaxResults?: number;
}
export type Policies = PolicySummary[];
export interface ListPoliciesResponse {
  Policies?: PolicySummary[];
  NextToken?: string;
}
export interface ListPoliciesForTargetRequest {
  TargetId: string;
  Filter: PolicyType;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListPoliciesForTargetResponse {
  Policies?: PolicySummary[];
  NextToken?: string;
}
export interface ListRootsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type Roots = Root[];
export interface ListRootsResponse {
  Roots?: Root[];
  NextToken?: string;
}
export type TaggableResourceId = string;
export interface ListTagsForResourceRequest {
  ResourceId: string;
  NextToken?: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export interface ListTargetsForPolicyRequest {
  PolicyId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type GenericArn = string;
export type TargetName = string;
export type TargetType = "ACCOUNT" | "ORGANIZATIONAL_UNIT" | "ROOT" | (string & {});
export interface PolicyTargetSummary {
  TargetId?: string;
  Arn?: string;
  Name?: string;
  Type?: TargetType;
}
export type PolicyTargets = PolicyTargetSummary[];
export interface ListTargetsForPolicyResponse {
  Targets?: PolicyTargetSummary[];
  NextToken?: string;
}
export interface MoveAccountRequest {
  AccountId: string;
  SourceParentId: string;
  DestinationParentId: string;
}
export interface MoveAccountResponse {}
export interface PutResourcePolicyRequest {
  Content: string;
  Tags?: Tag[];
}
export interface PutResourcePolicyResponse {
  ResourcePolicy?: ResourcePolicy;
}
export interface RegisterDelegatedAdministratorRequest {
  AccountId: string;
  ServicePrincipal: string;
}
export interface RegisterDelegatedAdministratorResponse {}
export interface RemoveAccountFromOrganizationRequest {
  AccountId: string;
}
export interface RemoveAccountFromOrganizationResponse {}
export interface TagResourceRequest {
  ResourceId: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export interface TerminateResponsibilityTransferRequest {
  Id: string;
  EndTimestamp?: Date;
}
export interface TerminateResponsibilityTransferResponse {
  ResponsibilityTransfer?: ResponsibilityTransfer;
}
export type TagKeys = string[];
export interface UntagResourceRequest {
  ResourceId: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateOrganizationalUnitRequest {
  OrganizationalUnitId: string;
  Name?: string;
}
export interface UpdateOrganizationalUnitResponse {
  OrganizationalUnit?: OrganizationalUnit;
}
export interface UpdatePolicyRequest {
  PolicyId: string;
  Name?: string;
  Description?: string;
  Content?: string;
}
export interface UpdatePolicyResponse {
  Policy?: Policy;
}
export interface UpdateResponsibilityTransferRequest {
  Id: string;
  Name: string | redacted.Redacted<string>;
}
export interface UpdateResponsibilityTransferResponse {
  ResponsibilityTransfer?: ResponsibilityTransfer;
}
export type ExceptionMessage = string;
export type AccessDeniedForDependencyExceptionReason =
  | "ACCESS_DENIED_DURING_CREATE_SERVICE_LINKED_ROLE"
  | (string & {});
export type ConstraintViolationExceptionReason =
  | "ACCOUNT_NUMBER_LIMIT_EXCEEDED"
  | "HANDSHAKE_RATE_LIMIT_EXCEEDED"
  | "OU_NUMBER_LIMIT_EXCEEDED"
  | "OU_DEPTH_LIMIT_EXCEEDED"
  | "POLICY_NUMBER_LIMIT_EXCEEDED"
  | "POLICY_CONTENT_LIMIT_EXCEEDED"
  | "MAX_POLICY_TYPE_ATTACHMENT_LIMIT_EXCEEDED"
  | "MIN_POLICY_TYPE_ATTACHMENT_LIMIT_EXCEEDED"
  | "ACCOUNT_CANNOT_LEAVE_ORGANIZATION"
  | "ACCOUNT_CANNOT_LEAVE_WITHOUT_EULA"
  | "ACCOUNT_CANNOT_LEAVE_WITHOUT_PHONE_VERIFICATION"
  | "MASTER_ACCOUNT_PAYMENT_INSTRUMENT_REQUIRED"
  | "MEMBER_ACCOUNT_PAYMENT_INSTRUMENT_REQUIRED"
  | "ACCOUNT_CREATION_RATE_LIMIT_EXCEEDED"
  | "MASTER_ACCOUNT_ADDRESS_DOES_NOT_MATCH_MARKETPLACE"
  | "MASTER_ACCOUNT_MISSING_CONTACT_INFO"
  | "MASTER_ACCOUNT_NOT_GOVCLOUD_ENABLED"
  | "ORGANIZATION_NOT_IN_ALL_FEATURES_MODE"
  | "CREATE_ORGANIZATION_IN_BILLING_MODE_UNSUPPORTED_REGION"
  | "EMAIL_VERIFICATION_CODE_EXPIRED"
  | "WAIT_PERIOD_ACTIVE"
  | "MAX_TAG_LIMIT_EXCEEDED"
  | "TAG_POLICY_VIOLATION"
  | "MAX_DELEGATED_ADMINISTRATORS_FOR_SERVICE_LIMIT_EXCEEDED"
  | "CANNOT_REGISTER_MASTER_AS_DELEGATED_ADMINISTRATOR"
  | "CANNOT_REMOVE_DELEGATED_ADMINISTRATOR_FROM_ORG"
  | "DELEGATED_ADMINISTRATOR_EXISTS_FOR_THIS_SERVICE"
  | "POLICY_TYPE_ENABLED_FOR_THIS_SERVICE"
  | "MASTER_ACCOUNT_MISSING_BUSINESS_LICENSE"
  | "CANNOT_CLOSE_MANAGEMENT_ACCOUNT"
  | "CLOSE_ACCOUNT_QUOTA_EXCEEDED"
  | "CLOSE_ACCOUNT_REQUESTS_LIMIT_EXCEEDED"
  | "SERVICE_ACCESS_NOT_ENABLED"
  | "INVALID_PAYMENT_INSTRUMENT"
  | "ACCOUNT_CREATION_NOT_COMPLETE"
  | "CANNOT_REGISTER_SUSPENDED_ACCOUNT_AS_DELEGATED_ADMINISTRATOR"
  | "ALL_FEATURES_MIGRATION_ORGANIZATION_SIZE_LIMIT_EXCEEDED"
  | "RESPONSIBILITY_TRANSFER_MAX_LEVEL_VIOLATION"
  | "RESPONSIBILITY_TRANSFER_MAX_INBOUND_QUOTA_VIOLATION"
  | "RESPONSIBILITY_TRANSFER_MAX_OUTBOUND_QUOTA_VIOLATION"
  | "RESPONSIBILITY_TRANSFER_MAX_TRANSFERS_QUOTA_VIOLATION"
  | "ACTIVE_RESPONSIBILITY_TRANSFER_PROCESS"
  | "TRANSFER_RESPONSIBILITY_TARGET_DELETION_IN_PROGRESS"
  | "TRANSFER_RESPONSIBILITY_SOURCE_DELETION_IN_PROGRESS"
  | "UNSUPPORTED_PRICING"
  | "UNMET_BILLING_PREREQUISITE"
  | "ACCOUNT_NOT_ACTIVE_FOR_TRANSFER_RESPONSIBILITY"
  | "TRANSFER_RESPONSIBILITY_UPDATE_NOT_ALLOWED"
  | (string & {});
export type HandshakeConstraintViolationExceptionReason =
  | "ACCOUNT_NUMBER_LIMIT_EXCEEDED"
  | "HANDSHAKE_RATE_LIMIT_EXCEEDED"
  | "ALREADY_IN_AN_ORGANIZATION"
  | "ORGANIZATION_ALREADY_HAS_ALL_FEATURES"
  | "ORGANIZATION_IS_ALREADY_PENDING_ALL_FEATURES_MIGRATION"
  | "INVITE_DISABLED_DURING_ENABLE_ALL_FEATURES"
  | "PAYMENT_INSTRUMENT_REQUIRED"
  | "ORGANIZATION_FROM_DIFFERENT_SELLER_OF_RECORD"
  | "ORGANIZATION_MEMBERSHIP_CHANGE_RATE_LIMIT_EXCEEDED"
  | "MANAGEMENT_ACCOUNT_EMAIL_NOT_VERIFIED"
  | "RESPONSIBILITY_TRANSFER_ALREADY_EXISTS"
  | "SOURCE_AND_TARGET_CANNOT_MATCH"
  | "UNUSED_PREPAYMENT_BALANCE"
  | "LEGACY_PERMISSIONS_STILL_IN_USE"
  | "PAST_DUE_INVOICE"
  | "TARGET_ACCOUNT_VALIDATION_FAILURE"
  | (string & {});
export type InvalidInputExceptionReason =
  | "INVALID_PARTY_TYPE_TARGET"
  | "INVALID_SYNTAX_ORGANIZATION_ARN"
  | "INVALID_SYNTAX_POLICY_ID"
  | "INVALID_ENUM"
  | "INVALID_ENUM_POLICY_TYPE"
  | "INVALID_LIST_MEMBER"
  | "MAX_LENGTH_EXCEEDED"
  | "MAX_VALUE_EXCEEDED"
  | "MIN_LENGTH_EXCEEDED"
  | "MIN_VALUE_EXCEEDED"
  | "IMMUTABLE_POLICY"
  | "INVALID_PATTERN"
  | "INVALID_PATTERN_TARGET_ID"
  | "INPUT_REQUIRED"
  | "INVALID_NEXT_TOKEN"
  | "MAX_LIMIT_EXCEEDED_FILTER"
  | "MOVING_ACCOUNT_BETWEEN_DIFFERENT_ROOTS"
  | "INVALID_FULL_NAME_TARGET"
  | "UNRECOGNIZED_SERVICE_PRINCIPAL"
  | "INVALID_ROLE_NAME"
  | "INVALID_SYSTEM_TAGS_PARAMETER"
  | "DUPLICATE_TAG_KEY"
  | "TARGET_NOT_SUPPORTED"
  | "INVALID_EMAIL_ADDRESS_TARGET"
  | "INVALID_RESOURCE_POLICY_JSON"
  | "INVALID_PRINCIPAL"
  | "UNSUPPORTED_ACTION_IN_RESOURCE_POLICY"
  | "UNSUPPORTED_POLICY_TYPE_IN_RESOURCE_POLICY"
  | "UNSUPPORTED_RESOURCE_IN_RESOURCE_POLICY"
  | "NON_DETACHABLE_POLICY"
  | "CALLER_REQUIRED_FIELD_MISSING"
  | "UNSUPPORTED_ACTION_IN_RESPONSIBILITY_TRANSFER"
  | "START_DATE_NOT_BEGINNING_OF_MONTH"
  | "START_DATE_NOT_BEGINNING_OF_DAY"
  | "START_DATE_TOO_EARLY"
  | "START_DATE_TOO_LATE"
  | "INVALID_START_DATE"
  | "END_DATE_NOT_END_OF_MONTH"
  | "END_DATE_TOO_EARLY"
  | "END_DATE_TOO_LATE"
  | "INVALID_END_DATE"
  | (string & {});
export type ExceptionType = string;
export type AcceptHandshakeError =
  | AccessDeniedException
  | AccessDeniedForDependencyException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | HandshakeAlreadyInStateException
  | HandshakeConstraintViolationException
  | HandshakeNotFoundException
  | InvalidHandshakeTransitionException
  | InvalidInputException
  | MasterCannotLeaveOrganizationException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Accepts a handshake by sending an `ACCEPTED` response to the sender. You
 * can view accepted handshakes in API responses for 30 days before they are
 * deleted.
 *
 * Only the management account can accept the following
 * handshakes:
 *
 * - Enable all features final confirmation
 * (`APPROVE_ALL_FEATURES`)
 *
 * - Billing transfer (`TRANSFER_RESPONSIBILITY`)
 *
 * For more information, see Enabling all features and Responding to a billing transfer invitation in the
 * *Organizations User Guide*.
 *
 * Only a member account can accept the following
 * handshakes:
 *
 * - Invitation to join (`INVITE`)
 *
 * - Approve all features request (`ENABLE_ALL_FEATURES`)
 *
 * For more information, see Responding to invitations and Enabling all features in the *Organizations User Guide*.
 *
 * When a handshake is accepted, Organizations logs membership events in CloudTrail, available
 * only in the management account's event history. If the account was standalone and joined
 * a new organization, an `AccountJoinedOrganization` event is logged with
 * `joinedMethod:INVITED` and `joinedTime` fields. If the account
 * departed one organization and joined another, both an
 * `AccountDepartedOrganization` event with `departureMethod:LEFT`
 * and `departureTime` and an `AccountJoinedOrganization` event with
 * `joinedMethod:INVITED` and `joinedTime` are logged in their
 * respective management accounts.
 *
 * When a billing transfer (`TRANSFER_RESPONSIBILITY`) handshake is accepted,
 * Organizations publishes a `ResponsibilityTransferAccepted` service event to CloudTrail.
 * Each affected account receives this event, including upstream participants such as
 * distributors in a chained transfer. For an example log entry, see Example log entries: AcceptResponsibilityTransfer in the
 * *Organizations User Guide*.
 */
export const acceptHandshake: API.OperationMethod<
  AcceptHandshakeRequest,
  AcceptHandshakeResponse,
  AcceptHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<AcceptHandshakeRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<AcceptHandshakeResponse>,
  errors: [
    AccessDeniedException,
    AccessDeniedForDependencyException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    HandshakeAlreadyInStateException,
    HandshakeConstraintViolationException,
    HandshakeNotFoundException,
    InvalidHandshakeTransitionException,
    InvalidInputException,
    MasterCannotLeaveOrganizationException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptHandshake",
}));

export type AttachPolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicatePolicyAttachmentException
  | InvalidInputException
  | PolicyChangesInProgressException
  | PolicyNotFoundException
  | PolicyTypeNotEnabledException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Attaches a policy to a root, an organizational unit (OU), or an individual account.
 * How the policy affects accounts depends on the type of policy. Refer to the
 * *Organizations User Guide* for information about each policy type:
 *
 * - SERVICE_CONTROL_POLICY
 *
 * - RESOURCE_CONTROL_POLICY
 *
 * - DECLARATIVE_POLICY_EC2
 *
 * - BACKUP_POLICY
 *
 * - TAG_POLICY
 *
 * - CHATBOT_POLICY
 *
 * - AISERVICES_OPT_OUT_POLICY
 *
 * - SECURITYHUB_POLICY
 *
 * - UPGRADE_ROLLOUT_POLICY
 *
 * - INSPECTOR_POLICY
 *
 * - BEDROCK_POLICY
 *
 * - S3_POLICY
 *
 * - NETWORK_SECURITY_DIRECTOR_POLICY
 *
 * - GUARDDUTY_POLICY
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const attachPolicy: API.OperationMethod<
  AttachPolicyRequest,
  AttachPolicyResponse,
  AttachPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<AttachPolicyRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<AttachPolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicatePolicyAttachmentException,
    InvalidInputException,
    PolicyChangesInProgressException,
    PolicyNotFoundException,
    PolicyTypeNotEnabledException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachPolicy",
}));

export type CancelHandshakeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | HandshakeAlreadyInStateException
  | HandshakeNotFoundException
  | InvalidHandshakeTransitionException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Cancels a Handshake.
 *
 * Only the account that sent a handshake can call this operation. The recipient of the handshake can't cancel it, but can use DeclineHandshake to decline. After a handshake is canceled, the
 * recipient can no longer respond to the handshake.
 *
 * You can view canceled handshakes in API responses for 30 days before they are
 * deleted.
 */
export const cancelHandshake: API.OperationMethod<
  CancelHandshakeRequest,
  CancelHandshakeResponse,
  CancelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<CancelHandshakeRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<CancelHandshakeResponse>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    HandshakeAlreadyInStateException,
    HandshakeNotFoundException,
    InvalidHandshakeTransitionException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelHandshake",
}));

export type CloseAccountError =
  | AccessDeniedException
  | AccountAlreadyClosedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConflictException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Closes an Amazon Web Services member account within an organization. You can close an account when
 * all
 * features are enabled . You can't close the management account with this API.
 * This is an asynchronous request that Amazon Web Services performs in the background. Because
 * `CloseAccount` operates asynchronously, it can return a successful
 * completion message even though account closure might still be in progress. You need to
 * wait a few minutes before the account is fully closed. To check the status of the
 * request, do one of the following:
 *
 * - Use the `AccountId` that you sent in the `CloseAccount`
 * request to provide as a parameter to the DescribeAccount
 * operation.
 *
 * While the close account request is in progress, Account status will indicate
 * PENDING_CLOSURE. When the close account request completes, the status will
 * change to SUSPENDED.
 *
 * - Check the CloudTrail log for the `CloseAccountResult` event that gets
 * published after the account closes successfully. For information on using CloudTrail
 * with Organizations, see Logging and monitoring in Organizations in the
 * *Organizations User Guide*.
 *
 * - Resources remaining within the account after closing will be automatically deleted after 90 days. During this 90-day period,
 * the resources won't be available unless you contact Amazon Web Services Support to reopen the account. After 90 days, you can't reopen an account.
 * You might still receive a bill after account closure.
 *
 * - Within a rolling 30 day period you can close the higher of either 250 or 20% of the member accounts in your organization,
 * up to a maximum of 1,000. This quota is not bound by a calendar month, but
 * starts when you close an account. After you reach this limit, you can't
 * close additional accounts. For more information, see Closing a member
 * account in your organization and Quotas for
 * Organizations in the *Organizations User Guide*.
 *
 * - To reinstate a closed account, contact Amazon Web Services Support within the 90-day
 * grace period while the account is in SUSPENDED status.
 *
 * - If the Amazon Web Services account you attempt to close is linked to an Amazon Web Services GovCloud
 * (US) account, the `CloseAccount` request will close both
 * accounts. To learn important pre-closure details, see
 * Closing an Amazon Web Services GovCloud (US) account in the
 * Amazon Web Services GovCloud User Guide.
 *
 * After the permanent termination of the account after the 90-day waiting period,
 * Organizations logs a membership event in CloudTrail. The event is an
 * `AccountDepartedOrganization` event with
 * `departureMethod:CLEANED` and `departureTime`. This event is
 * available only in the management account's event history.
 */
export const closeAccount: API.OperationMethod<
  CloseAccountRequest,
  CloseAccountResponse,
  CloseAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<CloseAccountRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<CloseAccountResponse>,
  errors: [
    AccessDeniedException,
    AccountAlreadyClosedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConflictException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloseAccount",
}));

export type CreateAccountError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FinalizingOrganizationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Creates an Amazon Web Services account that is automatically a member of the organization whose
 * credentials made the request. This is an asynchronous request that Amazon Web Services performs in the
 * background. Because `CreateAccount` operates asynchronously, it can return a
 * successful completion message even though account initialization might still be in
 * progress. You might need to wait a few minutes before you can successfully access the
 * account. To check the status of the request, do one of the following:
 *
 * - Use the `Id` value of the `CreateAccountStatus` response
 * element from this operation to provide as a parameter to the DescribeCreateAccountStatus operation.
 *
 * - Check the CloudTrail log for the `CreateAccountResult` event. For
 * information on using CloudTrail with Organizations, see Logging and monitoring in Organizations in the
 * *Organizations User Guide*.
 *
 * Additionally, the `AccountJoinedOrganization` event is logged in CloudTrail and
 * is available only in the management account's event history. This event includes
 * `joinedMethod:Created` and `joinedTime` fields to provide context
 * on how and when the account joined the organization.
 *
 * The user who calls the API to create an account must have the
 * `organizations:CreateAccount` permission. If you enabled all features in
 * the organization, Organizations creates the required service-linked role named
 * `AWSServiceRoleForOrganizations`. For more information, see Organizations and service-linked roles in the
 * *Organizations User Guide*.
 *
 * If the request includes tags, then the requester must have the
 * `organizations:TagResource` permission.
 *
 * Organizations preconfigures the new member account with a role (named
 * `OrganizationAccountAccessRole` by default) that grants users in the
 * management account administrator permissions in the new member account. Principals in
 * the management account can assume the role. Organizations clones the company name and address
 * information for the new account from the organization's management account.
 *
 * You can only call this operation from the management account.
 *
 * For more information about creating accounts, see Creating
 * a member account in your organization in the
 * *Organizations User Guide*.
 *
 * - When you create an account in an organization using the Organizations console,
 * API, or CLI commands, the information required for the account to operate
 * as a standalone account, such as a payment method is
 * *not* automatically collected. If you must remove an
 * account from your organization later, you can do so only after you provide
 * the missing information. For more information, see Considerations before removing an account from an organization
 * in the *Organizations User Guide*.
 *
 * - If you get an exception that indicates that you exceeded your account
 * limits for the organization, contact Amazon Web Services Support.
 *
 * - If you get an exception that indicates that the operation failed because
 * your organization is still initializing, wait one hour and then try again.
 * If the error persists, contact Amazon Web Services Support.
 *
 * - It isn't recommended to use `CreateAccount` to create multiple
 * temporary accounts, and using the `CreateAccount` API to close
 * accounts is subject to a 30-day usage quota. For information on the
 * requirements and process for closing an account, see Closing a member
 * account in your organization in the
 * *Organizations User Guide*.
 *
 * When you create a member account with this operation, you can choose whether to
 * create the account with the IAM User and Role Access to
 * Billing Information switch enabled. If you enable it, IAM users and
 * roles that have appropriate permissions can view billing information for the
 * account. If you disable it, only the account root user can access billing
 * information. For information about how to disable this switch for an account, see
 * Granting access to
 * your billing information and tools.
 */
export const createAccount: API.OperationMethod<
  CreateAccountRequest,
  CreateAccountResponse,
  CreateAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<CreateAccountRequest>,
  output: __S(176, __c22, 0) as any as S.Schema<CreateAccountResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FinalizingOrganizationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccount",
}));

export type CreateGovCloudAccountError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FinalizingOrganizationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * This action is available if all of the following are true:
 *
 * - You're authorized to create accounts in the Amazon Web Services GovCloud (US) Region. For
 * more information on the Amazon Web Services GovCloud (US) Region, see the
 * *Amazon Web Services GovCloud User Guide*.
 *
 * - You already have an account in the Amazon Web Services GovCloud (US) Region that is paired
 * with a management account of an organization in the commercial Region.
 *
 * - You call this action from the management account of your organization in the
 * commercial Region.
 *
 * - You have the `organizations:CreateGovCloudAccount` permission.
 *
 * Organizations automatically creates the required service-linked role named
 * `AWSServiceRoleForOrganizations`. For more information, see Organizations and service-linked roles in the
 * *Organizations User Guide*.
 *
 * Amazon Web Services automatically enables CloudTrail for Amazon Web Services GovCloud (US) accounts, but you should also
 * do the following:
 *
 * - Verify that CloudTrail is enabled to store logs.
 *
 * - Create an Amazon S3 bucket for CloudTrail log storage.
 *
 * For more information, see Verifying CloudTrail Is
 * Enabled in the *Amazon Web Services GovCloud User Guide*.
 *
 * If the request includes tags, then the requester must have the
 * `organizations:TagResource` permission. The tags are attached to the
 * commercial account associated with the GovCloud account, rather than the GovCloud
 * account itself. To add tags to the GovCloud account, call the TagResource operation in the GovCloud Region after the new GovCloud
 * account exists.
 *
 * You call this action from the management account of your organization in the
 * commercial Region to create a standalone Amazon Web Services account in the Amazon Web Services GovCloud (US)
 * Region. After the account is created, the management account of an organization in the
 * Amazon Web Services GovCloud (US) Region can invite it to that organization. For more information on
 * inviting standalone accounts in the Amazon Web Services GovCloud (US) to join an organization, see
 * Organizations in the
 * *Amazon Web Services GovCloud User Guide*.
 *
 * Calling `CreateGovCloudAccount` is an asynchronous request that Amazon Web Services
 * performs in the background. Because `CreateGovCloudAccount` operates
 * asynchronously, it can return a successful completion message even though account
 * initialization might still be in progress. You might need to wait a few minutes before
 * you can successfully access the account. To check the status of the request, do one of
 * the following:
 *
 * - Use the `Id` response element from this operation to
 * provide as a parameter to the DescribeCreateAccountStatus
 * operation.
 *
 * - Check the CloudTrail log for the `CreateAccountResult` event. For
 * information on using CloudTrail with Organizations, see Logging and
 * monitoring in Organizations in the
 * *Organizations User Guide*.
 *
 * Additionally, the `AccountJoinedOrganization` event is logged in CloudTrail and
 * is available only in the management account's event history only for the linked
 * commercial account. This event includes `joinedMethod:Created` and
 * `joinedTime` fields to provide context on how and when the account joined
 * the organization.
 *
 * When you call the `CreateGovCloudAccount` action, you create two accounts:
 * a standalone account in the Amazon Web Services GovCloud (US) Region and an associated account in the
 * commercial Region for billing and support purposes. The account in the commercial Region
 * is automatically a member of the organization whose credentials made the request. Both
 * accounts are associated with the same email address.
 *
 * A role is created in the new account in the commercial Region that allows the
 * management account in the organization in the commercial Region to assume it. An Amazon Web Services
 * GovCloud (US) account is then created and associated with the commercial account that
 * you just created. A role is also created in the new Amazon Web Services GovCloud (US) account that can
 * be assumed by the Amazon Web Services GovCloud (US) account that is associated with the management
 * account of the commercial organization. For more information and to view a diagram that
 * explains how account access works, see Organizations in the
 * *Amazon Web Services GovCloud User Guide*.
 *
 * For more information about creating accounts, see Creating
 * a member account in your organization in the
 * *Organizations User Guide*.
 *
 * - When you create an account in an organization using the Organizations console,
 * API, or CLI commands, the information required for the account to operate as
 * a standalone account is *not* automatically collected.
 * This includes a payment method and signing the end user license agreement
 * (EULA). If you must remove an account from your organization later, you can
 * do so only after you provide the missing information. For more information,
 * see Considerations before removing an account from an organization
 * in the *Organizations User Guide*.
 *
 * - If you get an exception that indicates that you exceeded your account
 * limits for the organization, contact Amazon Web Services Support.
 *
 * - If you get an exception that indicates that the operation failed because
 * your organization is still initializing, wait one hour and then try again.
 * If the error persists, contact Amazon Web Services Support.
 *
 * - Using `CreateGovCloudAccount` to create multiple temporary
 * accounts isn't recommended. You can only close an account from the Amazon Web Services
 * Billing and Cost Management console, and you must be signed in as the root user. For information on
 * the requirements and process for closing an account, see Closing a member
 * account in your organization in the
 * *Organizations User Guide*.
 *
 * When you create a member account with this operation, you can choose whether to
 * create the account with the IAM User and Role Access to
 * Billing Information switch enabled. If you enable it, IAM users and
 * roles that have appropriate permissions can view billing information for the
 * account. If you disable it, only the account root user can access billing
 * information. For information about how to disable this switch for an account, see
 * Granting
 * access to your billing information and tools.
 */
export const createGovCloudAccount: API.OperationMethod<
  CreateGovCloudAccountRequest,
  CreateGovCloudAccountResponse,
  CreateGovCloudAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<CreateGovCloudAccountRequest>,
  output: __S(176, __c22, 0) as any as S.Schema<CreateGovCloudAccountResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FinalizingOrganizationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGovCloudAccount",
}));

export type CreateOrganizationError =
  | AccessDeniedException
  | AccessDeniedForDependencyException
  | AlreadyInOrganizationException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an Amazon Web Services organization. The account whose user is calling the
 * `CreateOrganization` operation automatically becomes the management account of the new organization.
 *
 * This operation must be called using credentials from the account that is to become the
 * new organization's management account. The principal must also have the relevant IAM
 * permissions.
 *
 * By default (or if you set the `FeatureSet` parameter to `ALL`),
 * the new organization is created with all features enabled and service control policies
 * automatically enabled in the root. If you instead choose to create the organization
 * supporting only the consolidated billing features by setting the `FeatureSet`
 * parameter to `CONSOLIDATED_BILLING`, no policy types are enabled by default
 * and you can't use organization policies.
 *
 * The `AccountJoinedOrganization` event is logged in CloudTrail and
 * is available only in the management account's event history. This event includes
 * `joinedMethod:INVITED` and `joinedTime` fields to provide
 * context on how and when the account joined the organization.
 */
export const createOrganization: API.OperationMethod<
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  CreateOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<CreateOrganizationRequest>,
  output: __S(209, __c26, 1) as any as S.Schema<CreateOrganizationResponse>,
  errors: [
    AccessDeniedException,
    AccessDeniedForDependencyException,
    AlreadyInOrganizationException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOrganization",
}));

export type CreateOrganizationalUnitError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicateOrganizationalUnitException
  | InvalidInputException
  | ParentNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an organizational unit (OU) within a root or parent OU. An OU is a container
 * for accounts that enables you to organize your accounts to apply policies according to
 * your business requirements. The number of levels deep that you can nest OUs is dependent
 * upon the policy types enabled for that root. For service control policies, the limit is
 * five.
 *
 * For more information about OUs, see Managing organizational units (OUs) in the
 * *Organizations User Guide*.
 *
 * If the request includes tags, then the requester must have the
 * `organizations:TagResource` permission.
 *
 * You can only call this operation from the management account.
 */
export const createOrganizationalUnit: API.OperationMethod<
  CreateOrganizationalUnitRequest,
  CreateOrganizationalUnitResponse,
  CreateOrganizationalUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<CreateOrganizationalUnitRequest>,
  output: __S(232, __c29, 0) as any as S.Schema<CreateOrganizationalUnitResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicateOrganizationalUnitException,
    InvalidInputException,
    ParentNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOrganizationalUnit",
}));

export type CreatePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicatePolicyException
  | InvalidInputException
  | MalformedPolicyDocumentException
  | PolicyTypeNotAvailableForOrganizationException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Creates a policy of a specified type that you can attach to a root, an organizational
 * unit (OU), or an individual Amazon Web Services account.
 *
 * For more information about policies and their use, see Managing
 * Organizations policies.
 *
 * If the request includes tags, then the requester must have the
 * `organizations:TagResource` permission.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<CreatePolicyRequest>,
  output: __S(257, __c32, 1) as any as S.Schema<CreatePolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicatePolicyException,
    InvalidInputException,
    MalformedPolicyDocumentException,
    PolicyTypeNotAvailableForOrganizationException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicy",
}));

export type DeclineHandshakeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | HandshakeAlreadyInStateException
  | HandshakeNotFoundException
  | InvalidHandshakeTransitionException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Declines a Handshake.
 *
 * Only the account that receives a handshake can call this operation. The sender of the handshake can use CancelHandshake to
 * cancel if the handshake hasn't yet been responded to.
 *
 * You can view canceled handshakes in API responses for 30 days before they are
 * deleted.
 */
export const declineHandshake: API.OperationMethod<
  DeclineHandshakeRequest,
  DeclineHandshakeResponse,
  DeclineHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<DeclineHandshakeRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DeclineHandshakeResponse>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    HandshakeAlreadyInStateException,
    HandshakeNotFoundException,
    InvalidHandshakeTransitionException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeclineHandshake",
}));

export type DeleteOrganizationError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | OrganizationNotEmptyException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the organization. You can delete an organization only by using credentials
 * from the management account. The organization must be empty of member accounts.
 *
 * When an organization is deleted, Organizations logs a membership event in CloudTrail. The
 * event is an `AccountDepartedOrganization` event with
 * `departureMethod:LEFT` and `departureTime`. This event is available
 * only in the management account's event history.
 */
export const deleteOrganization: API.OperationMethod<
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  DeleteOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<DeleteOrganizationRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteOrganizationResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    OrganizationNotEmptyException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOrganization",
}));

export type DeleteOrganizationalUnitError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | InvalidInputException
  | OrganizationalUnitNotEmptyException
  | OrganizationalUnitNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an organizational unit (OU) from a root or another OU. You must first remove
 * all accounts and child OUs from the OU that you want to delete.
 *
 * You can only call this operation from the management account.
 */
export const deleteOrganizationalUnit: API.OperationMethod<
  DeleteOrganizationalUnitRequest,
  DeleteOrganizationalUnitResponse,
  DeleteOrganizationalUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<DeleteOrganizationalUnitRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteOrganizationalUnitResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    InvalidInputException,
    OrganizationalUnitNotEmptyException,
    OrganizationalUnitNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOrganizationalUnit",
}));

export type DeletePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | InvalidInputException
  | PolicyInUseException
  | PolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Deletes the specified policy from your organization. Before you perform this
 * operation, you must first detach the policy from all organizational units (OUs), roots,
 * and accounts.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<DeletePolicyRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeletePolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    InvalidInputException,
    PolicyInUseException,
    PolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | ResourcePolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Deletes the resource policy from your organization.
 *
 * You can only call this operation from the management account.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    ResourcePolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeregisterDelegatedAdministratorError =
  | AccessDeniedException
  | AccountNotFoundException
  | AccountNotRegisteredException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Removes the specified member Amazon Web Services account as a delegated administrator for the
 * specified Amazon Web Services service.
 *
 * Deregistering a delegated administrator can have unintended impacts on the
 * functionality of the enabled Amazon Web Services service. See the documentation for the enabled
 * service before you deregister a delegated administrator so that you understand any
 * potential impacts.
 *
 * You can run this action only for Amazon Web Services services that support this
 * feature. For a current list of services that support it, see the column Supports
 * Delegated Administrator in the table at Amazon Web Services Services that you can use with
 * Organizations in the *Organizations User Guide.*
 *
 * You can only call this operation from the management account.
 */
export const deregisterDelegatedAdministrator: API.OperationMethod<
  DeregisterDelegatedAdministratorRequest,
  DeregisterDelegatedAdministratorResponse,
  DeregisterDelegatedAdministratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<DeregisterDelegatedAdministratorRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeregisterDelegatedAdministratorResponse>,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AccountNotRegisteredException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterDelegatedAdministrator",
}));

export type DescribeAccountError =
  | AccessDeniedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves Organizations-related information about the specified account.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const describeAccount: API.OperationMethod<
  DescribeAccountRequest,
  DescribeAccountResponse,
  DescribeAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<DescribeAccountRequest>,
  output: __S(321, __c40, 1) as any as S.Schema<DescribeAccountResponse>,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccount",
}));

export type DescribeCreateAccountStatusError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | CreateAccountStatusNotFoundException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Retrieves the current status of an asynchronous request to create an account.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const describeCreateAccountStatus: API.OperationMethod<
  DescribeCreateAccountStatusRequest,
  DescribeCreateAccountStatusResponse,
  DescribeCreateAccountStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<DescribeCreateAccountStatusRequest>,
  output: __S(176, __c22, 0) as any as S.Schema<DescribeCreateAccountStatusResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    CreateAccountStatusNotFoundException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCreateAccountStatus",
}));

export type DescribeEffectivePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | EffectivePolicyNotFoundException
  | InvalidInputException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Returns the contents of the effective policy for specified policy type and account.
 * The effective policy is the aggregation of any policies of the specified type that the
 * account inherits, plus any policy of that type that is directly attached to the
 * account.
 *
 * This operation applies only to management policies. It does not apply to authorization
 * policies: service control policies (SCPs) and resource control policies (RCPs).
 *
 * For more information about policy inheritance, see Understanding
 * management policy inheritance in the
 * *Organizations User Guide*.
 *
 * You can call this operation from any account in a organization.
 */
export const describeEffectivePolicy: API.OperationMethod<
  DescribeEffectivePolicyRequest,
  DescribeEffectivePolicyResponse,
  DescribeEffectivePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<DescribeEffectivePolicyRequest>,
  output: __S(354, __c44, 2) as any as S.Schema<DescribeEffectivePolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    EffectivePolicyNotFoundException,
    InvalidInputException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEffectivePolicy",
}));

export type DescribeHandshakeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | HandshakeNotFoundException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details for a handshake. A handshake is the secure exchange of information
 * between two Amazon Web Services accounts: a sender and a recipient.
 *
 * You can view `ACCEPTED`, `DECLINED`, or `CANCELED`
 * handshakes in API Responses for 30 days before they are deleted.
 *
 * You can call this operation from any account in a organization.
 */
export const describeHandshake: API.OperationMethod<
  DescribeHandshakeRequest,
  DescribeHandshakeResponse,
  DescribeHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<DescribeHandshakeRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DescribeHandshakeResponse>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    HandshakeNotFoundException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHandshake",
}));

export type DescribeOrganizationError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the organization that the user's account belongs
 * to.
 *
 * You can call this operation from any account in a organization.
 *
 * Even if a policy type is shown as available in the organization, you can disable
 * it separately at the root level with DisablePolicyType. Use ListRoots to see the status of policy types for a specified
 * root.
 */
export const describeOrganization: API.OperationMethod<
  DescribeOrganizationRequest,
  DescribeOrganizationResponse,
  DescribeOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<DescribeOrganizationRequest>,
  output: __S(209, __c26, 1) as any as S.Schema<DescribeOrganizationResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganization",
}));

export type DescribeOrganizationalUnitError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | OrganizationalUnitNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about an organizational unit (OU).
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const describeOrganizationalUnit: API.OperationMethod<
  DescribeOrganizationalUnitRequest,
  DescribeOrganizationalUnitResponse,
  DescribeOrganizationalUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<DescribeOrganizationalUnitRequest>,
  output: __S(232, __c29, 0) as any as S.Schema<DescribeOrganizationalUnitResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    OrganizationalUnitNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationalUnit",
}));

export type DescribePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | PolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Retrieves information about a policy.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const describePolicy: API.OperationMethod<
  DescribePolicyRequest,
  DescribePolicyResponse,
  DescribePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<DescribePolicyRequest>,
  output: __S(257, __c32, 1) as any as S.Schema<DescribePolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    PolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePolicy",
}));

export type DescribeResourcePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | ResourcePolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Retrieves information about a resource policy.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<DescribeResourcePolicyRequest>,
  output: __S(402, __c50, 2) as any as S.Schema<DescribeResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    ResourcePolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicy",
}));

export type DescribeResponsibilityTransferError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ResponsibilityTransferNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Returns details for a transfer. A *transfer* is an arrangement
 * between two management accounts where one account designates the other with specified
 * responsibilities for their organization.
 */
export const describeResponsibilityTransfer: API.OperationMethod<
  DescribeResponsibilityTransferRequest,
  DescribeResponsibilityTransferResponse,
  DescribeResponsibilityTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(408, __c51, 0) as any as S.Schema<DescribeResponsibilityTransferRequest>,
  output: __S(416, __c52, 0) as any as S.Schema<DescribeResponsibilityTransferResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ResponsibilityTransferNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResponsibilityTransfer",
}));

export type DetachPolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | PolicyChangesInProgressException
  | PolicyNotAttachedException
  | PolicyNotFoundException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Detaches a policy from a target root, organizational unit (OU), or account.
 *
 * If the policy being detached is a service control policy (SCP), the changes to
 * permissions for Identity and Access Management (IAM) users and roles in affected accounts are
 * immediate.
 *
 * Every root, OU, and account must have at least one SCP attached. If you want to
 * replace the default `FullAWSAccess` policy with an SCP that limits the
 * permissions that can be delegated, you must attach the replacement SCP before you can
 * remove the default SCP. This is the authorization strategy of an "allow list". If you instead attach a second SCP and
 * leave the `FullAWSAccess` SCP still attached, and specify "Effect":
 * "Deny" in the second SCP to override the `"Effect": "Allow"` in
 * the `FullAWSAccess` policy (or any other attached SCP), you're using the
 * authorization strategy of a "deny list".
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const detachPolicy: API.OperationMethod<
  DetachPolicyRequest,
  DetachPolicyResponse,
  DetachPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c54, 0) as any as S.Schema<DetachPolicyRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DetachPolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    PolicyChangesInProgressException,
    PolicyNotAttachedException,
    PolicyNotFoundException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachPolicy",
}));

export type DisableAWSServiceAccessError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Disables the integration of an Amazon Web Services service (the service that is specified by
 * `ServicePrincipal`) with Organizations. When you disable integration, the
 * specified service no longer can create a service-linked role in
 * *new* accounts in your organization. This means the service can't
 * perform operations on your behalf on any new accounts in your organization. The service
 * can still perform operations in older accounts until the service completes its clean-up
 * from Organizations.
 *
 * We
 * *strongly recommend*
 * that
 * you don't use this command to disable integration between Organizations and the specified
 * Amazon Web Services service. Instead, use the console or commands that are provided by the
 * specified service. This lets the trusted service perform any required initialization
 * when enabling trusted access, such as creating any required resources and any
 * required clean up of resources when disabling trusted access.
 *
 * For information about how to disable trusted service access to your organization
 * using the trusted service, see the **Learn more** link
 * under the **Supports Trusted Access** column at Amazon Web Services services that you can use with Organizations. on this page.
 *
 * If you disable access by using this command, it causes the following actions to
 * occur:
 *
 * - The service can no longer create a service-linked role in the accounts in
 * your organization. This means that the service can't perform operations on
 * your behalf on any new accounts in your organization. The service can still
 * perform operations in older accounts until the service completes its
 * clean-up from Organizations.
 *
 * - The service can no longer perform tasks in the member accounts in the
 * organization, unless those operations are explicitly permitted by the IAM
 * policies that are attached to your roles. This includes any data aggregation
 * from the member accounts to the management account, or to a delegated
 * administrator account, where relevant.
 *
 * - Some services detect this and clean up any remaining data or resources
 * related to the integration, while other services stop accessing the
 * organization but leave any historical data and configuration in place to
 * support a possible re-enabling of the integration.
 *
 * Using the other service's console or commands to disable the integration ensures
 * that the other service is aware that it can clean up any resources that are required
 * only for the integration. How the service cleans up its resources in the
 * organization's accounts depends on that service. For more information, see the
 * documentation for the other Amazon Web Services service.
 *
 * After you perform the `DisableAWSServiceAccess` operation, the specified
 * service can no longer perform operations in your organization's accounts
 *
 * For more information about integrating other services with Organizations, including the
 * list of services that work with Organizations, see Using Organizations with other Amazon Web Services
 * services in the *Organizations User Guide*.
 *
 * You can only call this operation from the management account.
 */
export const disableAWSServiceAccess: API.OperationMethod<
  DisableAWSServiceAccessRequest,
  DisableAWSServiceAccessResponse,
  DisableAWSServiceAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(440, __c55, 0) as any as S.Schema<DisableAWSServiceAccessRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DisableAWSServiceAccessResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAWSServiceAccess",
}));

export type DisablePolicyTypeError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | PolicyChangesInProgressException
  | PolicyTypeNotEnabledException
  | RootNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Disables an organizational policy type in a root. A policy of a certain type can be
 * attached to entities in a root only if that type is enabled in the root. After you
 * perform this operation, you no longer can attach policies of the specified type to that
 * root or to any organizational unit (OU) or account in that root. You can undo this by
 * using the EnablePolicyType operation.
 *
 * This is an asynchronous request that Amazon Web Services performs in the background. If you disable
 * a policy type for a root, it still appears enabled for the organization if all features are enabled for the organization. Amazon Web Services recommends that you
 * first use ListRoots to see the status of policy types for a specified
 * root, and then use this operation.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 *
 * To view the status of available policy types in the organization, use ListRoots.
 */
export const disablePolicyType: API.OperationMethod<
  DisablePolicyTypeRequest,
  DisablePolicyTypeResponse,
  DisablePolicyTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c56, 0) as any as S.Schema<DisablePolicyTypeRequest>,
  output: __S(456, __c57, 0) as any as S.Schema<DisablePolicyTypeResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    PolicyChangesInProgressException,
    PolicyTypeNotEnabledException,
    RootNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisablePolicyType",
}));

export type EnableAllFeaturesError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | HandshakeConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables all features in an organization. This enables the use of organization policies
 * that can restrict the services and actions that can be called in each account. Until you
 * enable all features, you have access only to consolidated billing, and you can't use any
 * of the advanced account administration features that Organizations supports. For more
 * information, see Enabling all features in your organization in the
 * *Organizations User Guide*.
 *
 * This operation is required only for organizations that were created explicitly
 * with only the consolidated billing features enabled. Calling this operation sends a
 * handshake to every invited account in the organization. The feature set change can
 * be finalized and the additional features enabled only after all administrators in
 * the invited accounts approve the change by accepting the handshake.
 *
 * After you enable all features, you can separately enable or disable individual policy
 * types in a root using EnablePolicyType and DisablePolicyType. To see the status of policy types in a root, use
 * ListRoots.
 *
 * After all invited member accounts accept the handshake, you finalize the feature set
 * change by accepting the handshake that contains "Action":
 * "ENABLE_ALL_FEATURES". This completes the change.
 *
 * After you enable all features in your organization, the management account in the
 * organization can apply policies on all member accounts. These policies can restrict what
 * users and even administrators in those accounts can do. The management account can apply
 * policies that prevent accounts from leaving the organization. Ensure that your account
 * administrators are aware of this.
 *
 * You can only call this operation from the management account.
 */
export const enableAllFeatures: API.OperationMethod<
  EnableAllFeaturesRequest,
  EnableAllFeaturesResponse,
  EnableAllFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(472, __c59, 0) as any as S.Schema<EnableAllFeaturesRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<EnableAllFeaturesResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    HandshakeConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAllFeatures",
}));

export type EnableAWSServiceAccessError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Provides an Amazon Web Services service (the service that is specified by
 * `ServicePrincipal`) with permissions to view the structure of an
 * organization, create a service-linked role in
 * all the accounts in the organization, and allow the service to perform operations on
 * behalf of the organization and its accounts. Establishing these permissions can be a
 * first step in enabling the integration of an Amazon Web Services service with Organizations.
 *
 * We recommend that you enable integration between Organizations and the specified Amazon Web Services
 * service by using the console or commands that are provided by the specified service.
 * Doing so ensures that the service is aware that it can create the resources that are
 * required for the integration. How the service creates those resources in the
 * organization's accounts depends on that service. For more information, see the
 * documentation for the other Amazon Web Services service.
 *
 * For more information about enabling services to integrate with Organizations, see Using
 * Organizations with other Amazon Web Services services in the
 * *Organizations User Guide*.
 *
 * You can only call this operation from the management account.
 */
export const enableAWSServiceAccess: API.OperationMethod<
  EnableAWSServiceAccessRequest,
  EnableAWSServiceAccessResponse,
  EnableAWSServiceAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c60, 0) as any as S.Schema<EnableAWSServiceAccessRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<EnableAWSServiceAccessResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAWSServiceAccess",
}));

export type EnablePolicyTypeError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | PolicyChangesInProgressException
  | PolicyTypeAlreadyEnabledException
  | PolicyTypeNotAvailableForOrganizationException
  | RootNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Enables a policy type in a root. After you enable a policy type in a root, you can
 * attach policies of that type to the root, any organizational unit (OU), or account in
 * that root. You can undo this by using the DisablePolicyType
 * operation.
 *
 * This is an asynchronous request that Amazon Web Services performs in the background. Amazon Web Services
 * recommends that you first use ListRoots to see the status of policy
 * types for a specified root, and then use this operation.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 *
 * You can enable a policy type in a root only if that policy type is available in the
 * organization. To view the status of available policy types in the organization, use
 * ListRoots.
 */
export const enablePolicyType: API.OperationMethod<
  EnablePolicyTypeRequest,
  EnablePolicyTypeResponse,
  EnablePolicyTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(488, __c61, 0) as any as S.Schema<EnablePolicyTypeRequest>,
  output: __S(456, __c57, 0) as any as S.Schema<EnablePolicyTypeResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    PolicyChangesInProgressException,
    PolicyTypeAlreadyEnabledException,
    PolicyTypeNotAvailableForOrganizationException,
    RootNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnablePolicyType",
}));

export type InviteAccountToOrganizationError =
  | AccessDeniedException
  | AccountOwnerNotVerifiedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicateHandshakeException
  | FinalizingOrganizationException
  | HandshakeConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends an invitation to another account to join your organization as a member account.
 * Organizations sends email on your behalf to the email address that is associated with the
 * other account's owner. The invitation is implemented as a Handshake
 * whose details are in the response.
 *
 * If you receive an exception that indicates that you exceeded your account limits
 * for the organization or that the operation failed because your organization is still
 * initializing, wait one hour and then try again. If the error persists after an hour,
 * contact Amazon Web Services
 * Support.
 *
 * If the request includes tags, then the requester must have the
 * `organizations:TagResource` permission.
 *
 * You can only call this operation from the management account.
 */
export const inviteAccountToOrganization: API.OperationMethod<
  InviteAccountToOrganizationRequest,
  InviteAccountToOrganizationResponse,
  InviteAccountToOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c62, 0) as any as S.Schema<InviteAccountToOrganizationRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<InviteAccountToOrganizationResponse>,
  errors: [
    AccessDeniedException,
    AccountOwnerNotVerifiedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicateHandshakeException,
    FinalizingOrganizationException,
    HandshakeConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteAccountToOrganization",
}));

export type InviteOrganizationToTransferResponsibilityError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicateHandshakeException
  | HandshakeConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Sends an invitation to another organization's management account to designate your
 * account with the specified responsibilities for their organization. The invitation is
 * implemented as a Handshake whose details are in the response.
 *
 * You can only call this operation from the management account.
 */
export const inviteOrganizationToTransferResponsibility: API.OperationMethod<
  InviteOrganizationToTransferResponsibilityRequest,
  InviteOrganizationToTransferResponsibilityResponse,
  InviteOrganizationToTransferResponsibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(504, __c63, 0) as any as S.Schema<InviteOrganizationToTransferResponsibilityRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<InviteOrganizationToTransferResponsibilityResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicateHandshakeException,
    HandshakeConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteOrganizationToTransferResponsibility",
}));

export type LeaveOrganizationError =
  | AccessDeniedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | MasterCannotLeaveOrganizationException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a member account from its parent organization. This version of the operation
 * is performed by the account that wants to leave. To remove a member account as a user in
 * the management account, use RemoveAccountFromOrganization
 * instead.
 *
 * You can only call from operation from a member account.
 *
 * When an account leaves an organization, Organizations logs a membership event in
 * CloudTrail. The event is an `AccountDepartedOrganization` event with
 * `departureMethod:LEFT` and `departureTime`. This event is available
 * only in the management account's event history.
 *
 * - The management account in an organization with all features enabled can
 * set service control policies (SCPs) that can restrict what administrators of
 * member accounts can do. This includes preventing them from successfully
 * calling `LeaveOrganization` and leaving the organization.
 *
 * - You can leave an organization as a member account only if the account is
 * configured with the information required to operate as a standalone account.
 * When you create an account in an organization using the Organizations console,
 * API, or CLI commands, the information required of standalone accounts is
 * *not* automatically collected. For each account that
 * you want to make standalone, you must perform the following steps. If any of
 * the steps are already completed for this account, that step doesn't
 * appear.
 *
 * - Choose a support plan
 *
 * - Provide and verify the required contact information
 *
 * - Provide a current payment method
 *
 * Amazon Web Services uses the payment method to charge for any billable (not free tier)
 * Amazon Web Services activity that occurs while the account isn't attached to an
 * organization. For more information, see Considerations before removing an account from an organization
 * in the *Organizations User Guide*.
 *
 * - The account that you want to leave must not be a delegated administrator
 * account for any Amazon Web Services service enabled for your organization. If the account
 * is a delegated administrator, you must first change the delegated
 * administrator account to another account that is remaining in the
 * organization.
 *
 * - After the account leaves the organization, all tags that were attached to
 * the account object in the organization are deleted. Amazon Web Services accounts outside
 * of an organization do not support tags.
 *
 * - A newly created account has a waiting period before it can be removed from
 * its organization. You must wait until at least four days after the account
 * was created. Invited accounts aren't subject to this waiting period.
 *
 * - If you are using an organization principal to call
 * `LeaveOrganization` across multiple accounts, you can only do
 * this up to 5 accounts per second in a single organization.
 */
export const leaveOrganization: API.OperationMethod<
  LeaveOrganizationRequest,
  LeaveOrganizationResponse,
  LeaveOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c64, 0) as any as S.Schema<LeaveOrganizationRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<LeaveOrganizationResponse>,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    MasterCannotLeaveOrganizationException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LeaveOrganization",
}));

export type ListAccountsError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all the accounts in the organization. To request only the accounts in a
 * specified root or organizational unit (OU), use the ListAccountsForParent operation instead.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  ListAccountsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(520, __c65, 0) as any as S.Schema<ListAccountsRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<ListAccountsResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccountsForParentError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ParentNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the accounts in an organization that are contained by the specified target root
 * or organizational unit (OU). If you specify the root, you get a list of all the accounts
 * that aren't in any OU. If you specify an OU, you get a list of all the accounts in only
 * that OU and not in any child OUs. To get a list of all accounts in the organization, use
 * the ListAccounts operation.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listAccountsForParent: API.PaginatedOperationMethod<
  ListAccountsForParentRequest,
  ListAccountsForParentResponse,
  ListAccountsForParentError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c68, 0) as any as S.Schema<ListAccountsForParentRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<ListAccountsForParentResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ParentNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountsForParent",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccountsWithInvalidEffectivePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | EffectivePolicyNotFoundException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists all the accounts in an organization that have invalid effective policies. An
 * *invalid effective policy* is an effective
 * policy that fails validation checks, resulting in the effective policy not
 * being fully enforced on all the intended accounts within an organization.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listAccountsWithInvalidEffectivePolicy: API.PaginatedOperationMethod<
  ListAccountsWithInvalidEffectivePolicyRequest,
  ListAccountsWithInvalidEffectivePolicyResponse,
  ListAccountsWithInvalidEffectivePolicyError,
  Credentials | HttpClient.HttpClient,
  Account
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(552, __c69, 0) as any as S.Schema<ListAccountsWithInvalidEffectivePolicyRequest>,
  output: __S(553, __c69, 1) as any as S.Schema<ListAccountsWithInvalidEffectivePolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    EffectivePolicyNotFoundException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountsWithInvalidEffectivePolicy",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Accounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAWSServiceAccessForOrganizationError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Returns a list of the Amazon Web Services services that you enabled to integrate with your
 * organization. After a service on this list creates the resources that it requires for
 * the integration, it can perform operations on your organization and its accounts.
 *
 * For more information about integrating other services with Organizations, including the
 * list of services that currently work with Organizations, see Using Organizations with other Amazon Web Services
 * services in the *Organizations User Guide*.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listAWSServiceAccessForOrganization: API.PaginatedOperationMethod<
  ListAWSServiceAccessForOrganizationRequest,
  ListAWSServiceAccessForOrganizationResponse,
  ListAWSServiceAccessForOrganizationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(560, __c70, 0) as any as S.Schema<ListAWSServiceAccessForOrganizationRequest>,
  output: __S(563, __c70, 3) as any as S.Schema<ListAWSServiceAccessForOrganizationResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAWSServiceAccessForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChildrenError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ParentNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the organizational units (OUs) or accounts that are contained in the
 * specified parent OU or root. This operation, along with ListParents
 * enables you to traverse the tree structure that makes up this root.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listChildren: API.PaginatedOperationMethod<
  ListChildrenRequest,
  ListChildrenResponse,
  ListChildrenError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(568, __c71, 0) as any as S.Schema<ListChildrenRequest>,
  output: __S(569, __c71, 1) as any as S.Schema<ListChildrenResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ParentNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChildren",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCreateAccountStatusError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists the account creation requests that match the specified status that is currently
 * being tracked for the organization.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listCreateAccountStatus: API.PaginatedOperationMethod<
  ListCreateAccountStatusRequest,
  ListCreateAccountStatusResponse,
  ListCreateAccountStatusError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(585, __c73, 1) as any as S.Schema<ListCreateAccountStatusRequest>,
  output: __S(587, __c73, 3) as any as S.Schema<ListCreateAccountStatusResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCreateAccountStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDelegatedAdministratorsError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists the Amazon Web Services accounts that are designated as delegated administrators in this
 * organization.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listDelegatedAdministrators: API.PaginatedOperationMethod<
  ListDelegatedAdministratorsRequest,
  ListDelegatedAdministratorsResponse,
  ListDelegatedAdministratorsError,
  Credentials | HttpClient.HttpClient,
  DelegatedAdministrator
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(592, __c74, 0) as any as S.Schema<ListDelegatedAdministratorsRequest>,
  output: __S(595, __c74, 3) as any as S.Schema<ListDelegatedAdministratorsResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDelegatedAdministrators",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DelegatedAdministrators",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDelegatedServicesForAccountError =
  | AccessDeniedException
  | AccountNotFoundException
  | AccountNotRegisteredException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * List the Amazon Web Services services for which the specified account is a delegated
 * administrator.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listDelegatedServicesForAccount: API.PaginatedOperationMethod<
  ListDelegatedServicesForAccountRequest,
  ListDelegatedServicesForAccountResponse,
  ListDelegatedServicesForAccountError,
  Credentials | HttpClient.HttpClient,
  DelegatedService
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(600, __c75, 0) as any as S.Schema<ListDelegatedServicesForAccountRequest>,
  output: __S(603, __c75, 3) as any as S.Schema<ListDelegatedServicesForAccountResponse>,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AccountNotRegisteredException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDelegatedServicesForAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DelegatedServices",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEffectivePolicyValidationErrorsError =
  | AccessDeniedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | EffectivePolicyNotFoundException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists all the validation errors on an effective
 * policy for a specified account and policy type.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listEffectivePolicyValidationErrors: API.PaginatedOperationMethod<
  ListEffectivePolicyValidationErrorsRequest,
  ListEffectivePolicyValidationErrorsResponse,
  ListEffectivePolicyValidationErrorsError,
  Credentials | HttpClient.HttpClient,
  EffectivePolicyValidationError
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c76, 0) as any as S.Schema<ListEffectivePolicyValidationErrorsRequest>,
  output: __S(611, __c76, 3) as any as S.Schema<ListEffectivePolicyValidationErrorsResponse>,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    EffectivePolicyNotFoundException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEffectivePolicyValidationErrors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EffectivePolicyValidationErrors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHandshakesForAccountError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the recent handshakes that you have received.
 *
 * You can view `CANCELED`, `ACCEPTED`, `DECLINED`, or
 * `EXPIRED` handshakes in API responses for 30 days before they are
 * deleted.
 *
 * You can call this operation from any account in a organization.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 */
export const listHandshakesForAccount: API.PaginatedOperationMethod<
  ListHandshakesForAccountRequest,
  ListHandshakesForAccountResponse,
  ListHandshakesForAccountError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(616, __c77, 0) as any as S.Schema<ListHandshakesForAccountRequest>,
  output: __S(626, __c78, 2) as any as S.Schema<ListHandshakesForAccountResponse>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHandshakesForAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHandshakesForOrganizationError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the recent handshakes that you have sent.
 *
 * You can view `CANCELED`, `ACCEPTED`, `DECLINED`, or
 * `EXPIRED` handshakes in API responses for 30 days before they are
 * deleted.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 */
export const listHandshakesForOrganization: API.PaginatedOperationMethod<
  ListHandshakesForOrganizationRequest,
  ListHandshakesForOrganizationResponse,
  ListHandshakesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(632, __c79, 0) as any as S.Schema<ListHandshakesForOrganizationRequest>,
  output: __S(626, __c78, 2) as any as S.Schema<ListHandshakesForOrganizationResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHandshakesForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInboundResponsibilityTransfersError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ResponsibilityTransferNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists transfers that allow you to manage the specified responsibilities for another
 * organization. This operation returns both transfer invitations and transfers.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 */
export const listInboundResponsibilityTransfers: API.OperationMethod<
  ListInboundResponsibilityTransfersRequest,
  ListInboundResponsibilityTransfersResponse,
  ListInboundResponsibilityTransfersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c80, 0) as any as S.Schema<ListInboundResponsibilityTransfersRequest>,
  output: __S(649, __c81, 1) as any as S.Schema<ListInboundResponsibilityTransfersResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ResponsibilityTransferNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInboundResponsibilityTransfers",
}));

export type ListOrganizationalUnitsForParentError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ParentNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the organizational units (OUs) in a parent organizational unit or root.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listOrganizationalUnitsForParent: API.PaginatedOperationMethod<
  ListOrganizationalUnitsForParentRequest,
  ListOrganizationalUnitsForParentResponse,
  ListOrganizationalUnitsForParentError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(656, __c82, 0) as any as S.Schema<ListOrganizationalUnitsForParentRequest>,
  output: __S(658, __c82, 2) as any as S.Schema<ListOrganizationalUnitsForParentResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ParentNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationalUnitsForParent",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOutboundResponsibilityTransfersError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists transfers that allow an account outside your organization to manage the
 * specified responsibilities for your organization. This operation returns both transfer
 * invitations and transfers.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 */
export const listOutboundResponsibilityTransfers: API.OperationMethod<
  ListOutboundResponsibilityTransfersRequest,
  ListOutboundResponsibilityTransfersResponse,
  ListOutboundResponsibilityTransfersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(664, __c83, 0) as any as S.Schema<ListOutboundResponsibilityTransfersRequest>,
  output: __S(649, __c81, 1) as any as S.Schema<ListOutboundResponsibilityTransfersResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOutboundResponsibilityTransfers",
}));

export type ListParentsError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ChildNotFoundException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the root or organizational units (OUs) that serve as the immediate parent of the
 * specified child OU or account. This operation, along with ListChildren
 * enables you to traverse the tree structure that makes up this root.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 *
 * In the current release, a child can have only a single parent.
 */
export const listParents: API.PaginatedOperationMethod<
  ListParentsRequest,
  ListParentsResponse,
  ListParentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(672, __c84, 0) as any as S.Schema<ListParentsRequest>,
  output: __S(673, __c84, 1) as any as S.Schema<ListParentsResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ChildNotFoundException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListParents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Retrieves the list of all policies in an organization of a specified type.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(680, __c85, 0) as any as S.Schema<ListPoliciesRequest>,
  output: __S(689, __c86, 1) as any as S.Schema<ListPoliciesResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPoliciesForTargetError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists the policies that are directly attached to the specified target root,
 * organizational unit (OU), or account. You must specify the policy type that you want
 * included in the returned list.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listPoliciesForTarget: API.PaginatedOperationMethod<
  ListPoliciesForTargetRequest,
  ListPoliciesForTargetResponse,
  ListPoliciesForTargetError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(696, __c87, 0) as any as S.Schema<ListPoliciesForTargetRequest>,
  output: __S(689, __c86, 1) as any as S.Schema<ListPoliciesForTargetResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPoliciesForTarget",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRootsError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the roots that are defined in the current organization.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 *
 * Policy types can be enabled and disabled in roots. This is distinct from whether
 * they're available in the organization. When you enable all features, you make policy
 * types available for use in that organization. Individual policy types can then be
 * enabled and disabled in a root. To see the availability of a policy type in an
 * organization, use DescribeOrganization.
 */
export const listRoots: API.PaginatedOperationMethod<
  ListRootsRequest,
  ListRootsResponse,
  ListRootsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListRootsRequest>,
  output: __S(2, __c0, 2) as any as S.Schema<ListRootsResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists tags that are attached to the specified resource.
 *
 * You can attach tags to the following resources in Organizations.
 *
 * - Amazon Web Services account
 *
 * - Organization root
 *
 * - Organizational unit (OU)
 *
 * - Policy (any type)
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(9, __c1, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Tags" } as const,
})) as any;

export type ListTargetsForPolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | PolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists all the roots, organizational units (OUs), and accounts that the specified
 * policy is attached to.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listTargetsForPolicy: API.PaginatedOperationMethod<
  ListTargetsForPolicyRequest,
  ListTargetsForPolicyResponse,
  ListTargetsForPolicyError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<ListTargetsForPolicyRequest>,
  output: __S(19, __c2, 3) as any as S.Schema<ListTargetsForPolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    PolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetsForPolicy",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type MoveAccountError =
  | AccessDeniedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | DestinationParentNotFoundException
  | DuplicateAccountException
  | InvalidInputException
  | ServiceException
  | SourceParentNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Moves an account from its current source parent root or organizational unit (OU) to
 * the specified destination parent root or OU.
 *
 * You can only call this operation from the management account.
 */
export const moveAccount: API.OperationMethod<
  MoveAccountRequest,
  MoveAccountResponse,
  MoveAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<MoveAccountRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<MoveAccountResponse>,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    DestinationParentNotFoundException,
    DuplicateAccountException,
    InvalidInputException,
    ServiceException,
    SourceParentNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MoveAccount",
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Creates or updates a resource policy.
 *
 * You can only call this operation from the management account..
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(402, __c50, 2) as any as S.Schema<PutResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RegisterDelegatedAdministratorError =
  | AccessDeniedException
  | AccountAlreadyRegisteredException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Enables the specified member account to administer the Organizations features of the specified
 * Amazon Web Services service. It grants read-only access to Organizations service data. The account still
 * requires IAM permissions to access and administer the Amazon Web Services service.
 *
 * You can run this action only for Amazon Web Services services that support this
 * feature. For a current list of services that support it, see the column Supports
 * Delegated Administrator in the table at Amazon Web Services Services that you can use with
 * Organizations in the *Organizations User Guide.*
 *
 * You can only call this operation from the management account.
 */
export const registerDelegatedAdministrator: API.OperationMethod<
  RegisterDelegatedAdministratorRequest,
  RegisterDelegatedAdministratorResponse,
  RegisterDelegatedAdministratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<RegisterDelegatedAdministratorRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<RegisterDelegatedAdministratorResponse>,
  errors: [
    AccessDeniedException,
    AccountAlreadyRegisteredException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDelegatedAdministrator",
}));

export type RemoveAccountFromOrganizationError =
  | AccessDeniedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | MasterCannotLeaveOrganizationException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the specified account from the organization.
 *
 * The removed account becomes a standalone account that isn't a member of any
 * organization. It's no longer subject to any policies and is responsible for its own bill
 * payments. The organization's management account is no longer charged for any expenses
 * accrued by the member account after it's removed from the organization.
 *
 * You can only call this operation from the management account. Member accounts can remove themselves with LeaveOrganization instead.
 *
 * When an account is removed from an organization, Organizations logs a membership
 * event in CloudTrail. The event is an
 * `AccountDepartedOrganization` event with
 * `departureMethod:REMOVED` and `departureTime`. This event is
 * available only in the management account's event history.
 *
 * - You can remove an account from your organization only if the account is
 * configured with the information required to operate as a standalone account.
 * When you create an account in an organization using the Organizations console,
 * API, or CLI commands, the information required of standalone accounts is
 * *not* automatically collected. For more information,
 * see Considerations before removing an account from an organization
 * in the *Organizations User Guide*.
 *
 * - The account that you want to leave must not be a delegated administrator
 * account for any Amazon Web Services service enabled for your organization. If the account
 * is a delegated administrator, you must first change the delegated
 * administrator account to another account that is remaining in the
 * organization.
 *
 * - After the account leaves the organization, all tags that were attached to
 * the account object in the organization are deleted. Amazon Web Services accounts outside
 * of an organization do not support tags.
 */
export const removeAccountFromOrganization: API.OperationMethod<
  RemoveAccountFromOrganizationRequest,
  RemoveAccountFromOrganizationResponse,
  RemoveAccountFromOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<RemoveAccountFromOrganizationRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<RemoveAccountFromOrganizationResponse>,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    MasterCannotLeaveOrganizationException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAccountFromOrganization",
}));

export type TagResourceError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds one or more tags to the specified resource.
 *
 * Currently, you can attach tags to the following resources in Organizations.
 *
 * - Amazon Web Services account
 *
 * - Organization root
 *
 * - Organizational unit (OU)
 *
 * - Policy (any type)
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateResponsibilityTransferError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | InvalidResponsibilityTransferTransitionException
  | ResponsibilityTransferAlreadyInStatusException
  | ResponsibilityTransferNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Ends a transfer. A *transfer* is an arrangement between two
 * management accounts where one account designates the other with specified
 * responsibilities for their organization.
 *
 * When a transfer ends, Organizations publishes a
 * `ResponsibilityTransferTerminated` service event to CloudTrail. Each affected
 * account receives this event, including upstream participants such as distributors in a
 * chained transfer. For an example log entry, see Example log entries: TerminateResponsibilityTransfer in the
 * *Organizations User Guide*.
 */
export const terminateResponsibilityTransfer: API.OperationMethod<
  TerminateResponsibilityTransferRequest,
  TerminateResponsibilityTransferResponse,
  TerminateResponsibilityTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<TerminateResponsibilityTransferRequest>,
  output: __S(416, __c52, 0) as any as S.Schema<TerminateResponsibilityTransferResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    InvalidResponsibilityTransferTransitionException,
    ResponsibilityTransferAlreadyInStatusException,
    ResponsibilityTransferNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateResponsibilityTransfer",
}));

export type UntagResourceError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes any tags with the specified keys from the specified resource.
 *
 * You can attach tags to the following resources in Organizations.
 *
 * - Amazon Web Services account
 *
 * - Organization root
 *
 * - Organizational unit (OU)
 *
 * - Policy (any type)
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateOrganizationalUnitError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | DuplicateOrganizationalUnitException
  | InvalidInputException
  | OrganizationalUnitNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Renames the specified organizational unit (OU). The ID and ARN don't change. The child
 * OUs and accounts remain in place, and any attached policies of the OU remain
 * attached.
 *
 * You can only call this operation from the management account.
 */
export const updateOrganizationalUnit: API.OperationMethod<
  UpdateOrganizationalUnitRequest,
  UpdateOrganizationalUnitResponse,
  UpdateOrganizationalUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<UpdateOrganizationalUnitRequest>,
  output: __S(232, __c29, 0) as any as S.Schema<UpdateOrganizationalUnitResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    DuplicateOrganizationalUnitException,
    InvalidInputException,
    OrganizationalUnitNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationalUnit",
}));

export type UpdatePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicatePolicyException
  | InvalidInputException
  | MalformedPolicyDocumentException
  | PolicyChangesInProgressException
  | PolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Updates an existing policy with a new name, description, or content. If you don't
 * supply any parameter, that value remains unchanged. You can't change a policy's
 * type.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const updatePolicy: API.OperationMethod<
  UpdatePolicyRequest,
  UpdatePolicyResponse,
  UpdatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<UpdatePolicyRequest>,
  output: __S(257, __c32, 1) as any as S.Schema<UpdatePolicyResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicatePolicyException,
    InvalidInputException,
    MalformedPolicyDocumentException,
    PolicyChangesInProgressException,
    PolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicy",
}));

export type UpdateResponsibilityTransferError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ResponsibilityTransferNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Updates a transfer. A *transfer* is the arrangement between two
 * management accounts where one account designates the other with specified
 * responsibilities for their organization.
 *
 * You can update the name assigned to a transfer.
 */
export const updateResponsibilityTransfer: API.OperationMethod<
  UpdateResponsibilityTransferRequest,
  UpdateResponsibilityTransferResponse,
  UpdateResponsibilityTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<UpdateResponsibilityTransferRequest>,
  output: __S(416, __c52, 0) as any as S.Schema<UpdateResponsibilityTransferResponse>,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ResponsibilityTransferNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResponsibilityTransfer",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRootsRequest" });
    case 1:
      return S.Array(__S(464, __c58, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Roots: S.optional(__S(1, __c0, 1)), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListRootsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(169, __c21, 1)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTargetsForPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TargetId: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "PolicyTargetSummary" });
    case 2:
      return S.Array(__S(17, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Targets: S.optional(__S(18, __c2, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTargetsForPolicyResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          SourceParentId: S.String,
          DestinationParentId: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "MoveAccountRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Content: S.String, Tags: S.optional(__S(169, __c21, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String, ServicePrincipal: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterDelegatedAdministratorRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveAccountFromOrganizationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, Tags: __S(169, __c21, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TerminateResponsibilityTransferRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, TagKeys: __S(336, __c42, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationalUnitId: S.String, Name: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateOrganizationalUnitRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyId: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Content: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePolicyRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, Name: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateResponsibilityTransferRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HandshakeId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptHandshakeRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Handshake: S.optional(__S(124, __c15, 4)) }).pipe(ns),
      ).annotate({ identifier: "AcceptHandshakeResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Id: SensitiveString, Type: S.String })).annotate({
        identifier: "HandshakeParty",
      });
    case 1:
      return S.Array(__S(120, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(SensitiveString),
          Type: S.optional(S.String),
          Resources: S.optional(
            S.suspend(() => __S(123, __c15, 3)).annotate({ identifier: "HandshakeResources" }),
          ),
        }),
      ).annotate({ identifier: "HandshakeResource" });
    case 3:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<HandshakeResource> => __S(122, __c15, 2)).annotate({
          identifier: "HandshakeResource",
        }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Parties: S.optional(__S(121, __c15, 1)),
          State: S.optional(S.String),
          RequestedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpirationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Action: S.optional(S.String),
          Resources: S.optional(__S(123, __c15, 3)),
        }),
      ).annotate({ identifier: "Handshake" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PolicyId: S.String, TargetId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AttachPolicyRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AttachPolicyResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HandshakeId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelHandshakeRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CloseAccountRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Email: SensitiveString,
          AccountName: SensitiveString,
          RoleName: S.optional(S.String),
          IamUserAccessToBilling: S.optional(S.String),
          Tags: S.optional(__S(169, __c21, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAccountRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(168, __c21, 0));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CreateAccountStatus: S.optional(__S(184, __c23, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateAccountResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          AccountName: S.optional(SensitiveString),
          State: S.optional(S.String),
          RequestedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CompletedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AccountId: S.optional(S.String),
          GovCloudAccountId: S.optional(S.String),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAccountStatus" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Email: SensitiveString,
          AccountName: SensitiveString,
          RoleName: S.optional(S.String),
          IamUserAccessToBilling: S.optional(S.String),
          Tags: S.optional(__S(169, __c21, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGovCloudAccountRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FeatureSet: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateOrganizationRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          FeatureSet: S.optional(S.String),
          MasterAccountArn: S.optional(S.String),
          MasterAccountId: S.optional(S.String),
          MasterAccountEmail: S.optional(SensitiveString),
          AvailablePolicyTypes: S.optional(__S(217, __c27, 1)),
        }),
      ).annotate({ identifier: "Organization" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Organization: S.optional(__S(208, __c26, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateOrganizationResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "PolicyTypeSummary" });
    case 1:
      return S.Array(__S(216, __c27, 0));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParentId: S.String, Name: S.String, Tags: S.optional(__S(169, __c21, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateOrganizationalUnitRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationalUnit: S.optional(__S(240, __c30, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateOrganizationalUnitResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Path: S.optional(S.String),
        }),
      ).annotate({ identifier: "OrganizationalUnit" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Content: S.String,
          Description: S.String,
          Name: S.String,
          Type: S.String,
          Tags: S.optional(__S(169, __c21, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePolicyRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PolicySummary: S.optional(__S(264, __c33, 0)), Content: S.optional(S.String) }),
      ).annotate({ identifier: "Policy" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Policy: S.optional(__S(256, __c32, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreatePolicyResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          AwsManaged: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PolicySummary" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HandshakeId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeclineHandshakeRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOrganizationRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationalUnitId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOrganizationalUnitRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PolicyId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePolicyRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String, ServicePrincipal: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterDelegatedAdministratorRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Account: S.optional(__S(328, __c41, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeAccountResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Email: S.optional(SensitiveString),
          Name: S.optional(SensitiveString),
          Status: S.optional(S.String),
          State: S.optional(S.String),
          Paths: S.optional(__S(336, __c42, 0)),
          JoinedMethod: S.optional(S.String),
          JoinedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Account" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CreateAccountRequestId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCreateAccountStatusRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PolicyType: S.String, TargetId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEffectivePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PolicyContent: S.optional(S.String),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TargetId: S.optional(S.String),
          PolicyType: S.optional(S.String),
        }),
      ).annotate({ identifier: "EffectivePolicy" });
    case 2:
      return S.suspend(() =>
        S.Struct({ EffectivePolicy: S.optional(__S(353, __c44, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeEffectivePolicyResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HandshakeId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeHandshakeRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeOrganizationRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationalUnitId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeOrganizationalUnitRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PolicyId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePolicyRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeResourcePolicyRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Arn: S.optional(S.String) }),
      ).annotate({ identifier: "ResourcePolicySummary" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourcePolicySummary: S.optional(__S(400, __c50, 0)),
          Content: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourcePolicy" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ResourcePolicy: S.optional(__S(401, __c50, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeResourcePolicyResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeResponsibilityTransferRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResponsibilityTransfer: S.optional(__S(425, __c53, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeResponsibilityTransferResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ManagementAccountId: S.optional(S.String),
          ManagementAccountEmail: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "TransferParticipant" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          Status: S.optional(S.String),
          Source: S.optional(__S(424, __c53, 0)),
          Target: S.optional(__S(424, __c53, 0)),
          StartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActiveHandshakeId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResponsibilityTransfer" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PolicyId: S.String, TargetId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DetachPolicyRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServicePrincipal: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableAWSServiceAccessRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RootId: S.String, PolicyType: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisablePolicyTypeRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Root: S.optional(__S(464, __c58, 0)) }).pipe(ns)).annotate({
        identifier: "DisablePolicyTypeResponse",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          PolicyTypes: S.optional(__S(217, __c27, 1)),
        }),
      ).annotate({ identifier: "Root" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableAllFeaturesRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServicePrincipal: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableAWSServiceAccessRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RootId: S.String, PolicyType: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnablePolicyTypeRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Target: __S(120, __c15, 0),
          Notes: S.optional(SensitiveString),
          Tags: S.optional(__S(169, __c21, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "InviteAccountToOrganizationRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          Target: __S(120, __c15, 0),
          Notes: S.optional(SensitiveString),
          StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          SourceName: SensitiveString,
          Tags: S.optional(__S(169, __c21, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "InviteOrganizationToTransferResponsibilityRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "LeaveOrganizationRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAccountsRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Accounts: S.optional(__S(536, __c67, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAccountsResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(328, __c41, 0));
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParentId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccountsForParentRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyType: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccountsWithInvalidEffectivePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Accounts: S.optional(__S(536, __c67, 0)),
          PolicyType: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAccountsWithInvalidEffectivePolicyResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAWSServiceAccessForOrganizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServicePrincipal: S.optional(S.String),
          DateEnabled: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "EnabledServicePrincipal" });
    case 2:
      return S.Array(__S(561, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EnabledServicePrincipals: S.optional(__S(562, __c70, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAWSServiceAccessForOrganizationResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParentId: S.String,
          ChildType: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListChildrenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Children: S.optional(__S(577, __c72, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListChildrenResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "Child" });
    case 1:
      return S.Array(__S(576, __c72, 0));
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          States: S.optional(__S(584, __c73, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCreateAccountStatusRequest" });
    case 2:
      return S.Array(__S(184, __c23, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CreateAccountStatuses: S.optional(__S(586, __c73, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListCreateAccountStatusResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServicePrincipal: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDelegatedAdministratorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Email: S.optional(SensitiveString),
          Name: S.optional(SensitiveString),
          Status: S.optional(S.String),
          State: S.optional(S.String),
          JoinedMethod: S.optional(S.String),
          JoinedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DelegationEnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DelegatedAdministrator" });
    case 2:
      return S.Array(__S(593, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DelegatedAdministrators: S.optional(__S(594, __c74, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDelegatedAdministratorsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDelegatedServicesForAccountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServicePrincipal: S.optional(S.String),
          DelegationEnabledDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DelegatedService" });
    case 2:
      return S.Array(__S(601, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DelegatedServices: S.optional(__S(602, __c75, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDelegatedServicesForAccountResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          PolicyType: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEffectivePolicyValidationErrorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          PathToError: S.optional(S.String),
          ContributingPolicies: S.optional(__S(336, __c42, 0)),
        }),
      ).annotate({ identifier: "EffectivePolicyValidationError" });
    case 2:
      return S.Array(__S(609, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          PolicyType: S.optional(S.String),
          Path: S.optional(S.String),
          EvaluationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NextToken: S.optional(S.String),
          EffectivePolicyValidationErrors: S.optional(__S(610, __c76, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListEffectivePolicyValidationErrorsResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(624, __c78, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListHandshakesForAccountRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ActionType: S.optional(S.String), ParentHandshakeId: S.optional(S.String) }),
      ).annotate({ identifier: "HandshakeFilter" });
    case 1:
      return S.Array(__S(124, __c15, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Handshakes: S.optional(__S(625, __c78, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListHandshakesForAccountResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(624, __c78, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListHandshakesForOrganizationRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          Id: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInboundResponsibilityTransfersRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(425, __c53, 1));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResponsibilityTransfers: S.optional(__S(648, __c81, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListInboundResponsibilityTransfersResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParentId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOrganizationalUnitsForParentRequest" });
    case 1:
      return S.Array(__S(240, __c30, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          OrganizationalUnits: S.optional(__S(657, __c82, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListOrganizationalUnitsForParentResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOutboundResponsibilityTransfersRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChildId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListParentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Parents: S.optional(__S(577, __c72, 1)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListParentsResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filter: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPoliciesRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(264, __c33, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Policies: S.optional(__S(688, __c86, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListPoliciesResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetId: S.String,
          Filter: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPoliciesForTargetRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
