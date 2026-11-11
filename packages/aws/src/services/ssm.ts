import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://ssm.amazonaws.com/doc/2014-11-06/");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "SSM", serviceShapeName: "AmazonSSM" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ssm" });
const ver = /*@__PURE__*/ T.ServiceVersion("2014-11-06");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://ssm-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://ssm.${Region}.amazonaws.com`);
            }
            return e(`https://ssm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://ssm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://ssm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ssm.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "SSM",
  service: "SSM",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "AlreadyExistsException", httpResponseCode: 400 }),
  ).pipe(C.withAlreadyExistsError) {}
export class AssociatedInstances
  extends /*@__PURE__*/ S.TaggedError<AssociatedInstances>()(
    "AssociatedInstances",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "AssociatedInstances", httpResponseCode: 400 }),
  ) {}
export class AssociationAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<AssociationAlreadyExists>()(
    "AssociationAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "AssociationAlreadyExists", httpResponseCode: 400 }),
  ).pipe(C.withAlreadyExistsError) {}
export class AssociationDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<AssociationDoesNotExist>()(
    "AssociationDoesNotExist",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "AssociationDoesNotExist", httpResponseCode: 404 }),
  ) {}
export class AssociationExecutionDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<AssociationExecutionDoesNotExist>()(
    "AssociationExecutionDoesNotExist",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "AssociationExecutionDoesNotExist",
      httpResponseCode: 404,
    }),
  ) {}
export class AssociationLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<AssociationLimitExceeded>()(
    "AssociationLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "AssociationLimitExceeded", httpResponseCode: 400 }),
  ).pipe(C.withThrottlingError) {}
export class AssociationVersionLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<AssociationVersionLimitExceeded>()(
    "AssociationVersionLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "AssociationVersionLimitExceeded",
      httpResponseCode: 400,
    }),
  ).pipe(C.withThrottlingError) {}
export class AutomationDefinitionNotApprovedException
  extends /*@__PURE__*/ S.TaggedError<AutomationDefinitionNotApprovedException>()(
    "AutomationDefinitionNotApprovedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "AutomationDefinitionNotApproved",
      httpResponseCode: 400,
    }),
  ) {}
export class AutomationDefinitionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AutomationDefinitionNotFoundException>()(
    "AutomationDefinitionNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "AutomationDefinitionNotFound", httpResponseCode: 404 }),
  ) {}
export class AutomationDefinitionVersionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AutomationDefinitionVersionNotFoundException>()(
    "AutomationDefinitionVersionNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "AutomationDefinitionVersionNotFound",
      httpResponseCode: 404,
    }),
  ) {}
export class AutomationExecutionLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AutomationExecutionLimitExceededException>()(
    "AutomationExecutionLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "AutomationExecutionLimitExceeded",
      httpResponseCode: 429,
    }),
  ) {}
export class AutomationExecutionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AutomationExecutionNotFoundException>()(
    "AutomationExecutionNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "AutomationExecutionNotFound", httpResponseCode: 404 }),
  ) {}
export class AutomationStepNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AutomationStepNotFoundException>()(
    "AutomationStepNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "AutomationStepNotFoundException",
      httpResponseCode: 404,
    }),
  ) {}
export class ComplianceTypeCountLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ComplianceTypeCountLimitExceededException>()(
    "ComplianceTypeCountLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "ComplianceTypeCountLimitExceeded",
      httpResponseCode: 400,
    }),
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "ConflictException", httpResponseCode: 409 }),
  ) {}
export class CustomSchemaCountLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CustomSchemaCountLimitExceededException>()(
    "CustomSchemaCountLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "CustomSchemaCountLimitExceeded",
      httpResponseCode: 400,
    }),
  ) {}
export class DocumentAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<DocumentAlreadyExists>()(
    "DocumentAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "DocumentAlreadyExists", httpResponseCode: 400 }),
  ).pipe(C.withAlreadyExistsError) {}
export class DocumentLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<DocumentLimitExceeded>()(
    "DocumentLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "DocumentLimitExceeded", httpResponseCode: 400 }),
  ).pipe(C.withThrottlingError) {}
export class DocumentPermissionLimit
  extends /*@__PURE__*/ S.TaggedError<DocumentPermissionLimit>()(
    "DocumentPermissionLimit",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "DocumentPermissionLimit", httpResponseCode: 400 }),
  ) {}
export class DocumentVersionLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<DocumentVersionLimitExceeded>()(
    "DocumentVersionLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "DocumentVersionLimitExceeded", httpResponseCode: 400 }),
  ).pipe(C.withThrottlingError) {}
export class DoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<DoesNotExistException>()(
    "DoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "DoesNotExistException", httpResponseCode: 404 }),
  ) {}
export class DuplicateDocumentContent
  extends /*@__PURE__*/ S.TaggedError<DuplicateDocumentContent>()(
    "DuplicateDocumentContent",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "DuplicateDocumentContent", httpResponseCode: 400 }),
  ) {}
export class DuplicateDocumentVersionName
  extends /*@__PURE__*/ S.TaggedError<DuplicateDocumentVersionName>()(
    "DuplicateDocumentVersionName",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "DuplicateDocumentVersionName", httpResponseCode: 400 }),
  ) {}
export class DuplicateInstanceId
  extends /*@__PURE__*/ S.TaggedError<DuplicateInstanceId>()(
    "DuplicateInstanceId",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "DuplicateInstanceId", httpResponseCode: 404 }),
  ) {}
export class FeatureNotAvailableException
  extends /*@__PURE__*/ S.TaggedError<FeatureNotAvailableException>()(
    "FeatureNotAvailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "FeatureNotAvailableException", httpResponseCode: 400 }),
  ) {}
export class HierarchyLevelLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<HierarchyLevelLimitExceededException>()(
    "HierarchyLevelLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "HierarchyLevelLimitExceededException",
      httpResponseCode: 400,
    }),
  ) {}
export class HierarchyTypeMismatchException
  extends /*@__PURE__*/ S.TaggedError<HierarchyTypeMismatchException>()(
    "HierarchyTypeMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "HierarchyTypeMismatchException",
      httpResponseCode: 400,
    }),
  ) {}
export class IdempotentParameterMismatch
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatch>()(
    "IdempotentParameterMismatch",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "IdempotentParameterMismatch", httpResponseCode: 400 }),
  ).pipe(C.withConflictError) {}
export class IncompatiblePolicyException
  extends /*@__PURE__*/ S.TaggedError<IncompatiblePolicyException>()(
    "IncompatiblePolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "IncompatiblePolicyException", httpResponseCode: 400 }),
  ) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InternalServerError", httpResponseCode: 500 }),
  ) {}
export class InvalidActivation
  extends /*@__PURE__*/ S.TaggedError<InvalidActivation>()(
    "InvalidActivation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidActivation", httpResponseCode: 404 }),
  ) {}
export class InvalidActivationId
  extends /*@__PURE__*/ S.TaggedError<InvalidActivationId>()(
    "InvalidActivationId",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidActivationId", httpResponseCode: 404 }),
  ) {}
export class InvalidAggregatorException
  extends /*@__PURE__*/ S.TaggedError<InvalidAggregatorException>()(
    "InvalidAggregatorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidAggregator", httpResponseCode: 400 }),
  ) {}
export class InvalidAllowedPatternException
  extends /*@__PURE__*/ S.TaggedError<InvalidAllowedPatternException>()(
    "InvalidAllowedPatternException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "InvalidAllowedPatternException",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidAssociation
  extends /*@__PURE__*/ S.TaggedError<InvalidAssociation>()(
    "InvalidAssociation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidAssociation", httpResponseCode: 400 }),
  ) {}
export class InvalidAssociationVersion
  extends /*@__PURE__*/ S.TaggedError<InvalidAssociationVersion>()(
    "InvalidAssociationVersion",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidAssociationVersion", httpResponseCode: 400 }),
  ) {}
export class InvalidAutomationExecutionParametersException
  extends /*@__PURE__*/ S.TaggedError<InvalidAutomationExecutionParametersException>()(
    "InvalidAutomationExecutionParametersException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "InvalidAutomationExecutionParameters",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidAutomationSignalException
  extends /*@__PURE__*/ S.TaggedError<InvalidAutomationSignalException>()(
    "InvalidAutomationSignalException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "InvalidAutomationSignalException",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidAutomationStatusUpdateException
  extends /*@__PURE__*/ S.TaggedError<InvalidAutomationStatusUpdateException>()(
    "InvalidAutomationStatusUpdateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "InvalidAutomationStatusUpdateException",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidCommandId
  extends /*@__PURE__*/ S.TaggedError<InvalidCommandId>()(
    "InvalidCommandId",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidCommandId", httpResponseCode: 404 }),
  ) {}
export class InvalidDeleteInventoryParametersException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeleteInventoryParametersException>()(
    "InvalidDeleteInventoryParametersException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "InvalidDeleteInventoryParameters",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidDeletionIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeletionIdException>()(
    "InvalidDeletionIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDeletionId", httpResponseCode: 400 }),
  ) {}
export class InvalidDocument
  extends /*@__PURE__*/ S.TaggedError<InvalidDocument>()(
    "InvalidDocument",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDocument", httpResponseCode: 404 }),
  ) {}
export class InvalidDocumentContent
  extends /*@__PURE__*/ S.TaggedError<InvalidDocumentContent>()(
    "InvalidDocumentContent",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDocumentContent", httpResponseCode: 400 }),
  ) {}
export class InvalidDocumentOperation
  extends /*@__PURE__*/ S.TaggedError<InvalidDocumentOperation>()(
    "InvalidDocumentOperation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDocumentOperation", httpResponseCode: 403 }),
  ) {}
export class InvalidDocumentSchemaVersion
  extends /*@__PURE__*/ S.TaggedError<InvalidDocumentSchemaVersion>()(
    "InvalidDocumentSchemaVersion",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDocumentSchemaVersion", httpResponseCode: 400 }),
  ) {}
export class InvalidDocumentType
  extends /*@__PURE__*/ S.TaggedError<InvalidDocumentType>()(
    "InvalidDocumentType",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDocumentType", httpResponseCode: 400 }),
  ) {}
export class InvalidDocumentVersion
  extends /*@__PURE__*/ S.TaggedError<InvalidDocumentVersion>()(
    "InvalidDocumentVersion",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidDocumentVersion", httpResponseCode: 400 }),
  ) {}
export class InvalidFilter
  extends /*@__PURE__*/ S.TaggedError<InvalidFilter>()(
    "InvalidFilter",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidFilter", httpResponseCode: 441 }),
  ) {}
export class InvalidFilterKey
  extends /*@__PURE__*/ S.TaggedError<InvalidFilterKey>()(
    "InvalidFilterKey",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidFilterKey", httpResponseCode: 400 }),
  ) {}
export class InvalidFilterOption
  extends /*@__PURE__*/ S.TaggedError<InvalidFilterOption>()(
    "InvalidFilterOption",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidFilterOption", httpResponseCode: 400 }),
  ) {}
export class InvalidFilterValue
  extends /*@__PURE__*/ S.TaggedError<InvalidFilterValue>()(
    "InvalidFilterValue",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidFilterValue", httpResponseCode: 400 }),
  ) {}
export class InvalidInstanceId
  extends /*@__PURE__*/ S.TaggedError<InvalidInstanceId>()(
    "InvalidInstanceId",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidInstanceId", httpResponseCode: 404 }),
  ) {}
export class InvalidInstanceInformationFilterValue
  extends /*@__PURE__*/ S.TaggedError<InvalidInstanceInformationFilterValue>()(
    "InvalidInstanceInformationFilterValue",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "InvalidInstanceInformationFilterValue",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidInstancePropertyFilterValue
  extends /*@__PURE__*/ S.TaggedError<InvalidInstancePropertyFilterValue>()(
    "InvalidInstancePropertyFilterValue",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "InvalidInstancePropertyFilterValue",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidInventoryGroupException
  extends /*@__PURE__*/ S.TaggedError<InvalidInventoryGroupException>()(
    "InvalidInventoryGroupException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidInventoryGroup", httpResponseCode: 400 }),
  ) {}
export class InvalidInventoryItemContextException
  extends /*@__PURE__*/ S.TaggedError<InvalidInventoryItemContextException>()(
    "InvalidInventoryItemContextException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidInventoryItemContext", httpResponseCode: 400 }),
  ) {}
export class InvalidInventoryRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidInventoryRequestException>()(
    "InvalidInventoryRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidInventoryRequest", httpResponseCode: 400 }),
  ) {}
export class InvalidItemContentException
  extends /*@__PURE__*/ S.TaggedError<InvalidItemContentException>()(
    "InvalidItemContentException",
    {
      TypeName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidItemContent", httpResponseCode: 400 }),
  ) {}
export class InvalidKeyId
  extends /*@__PURE__*/ S.TaggedError<InvalidKeyId>()(
    "InvalidKeyId",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidKeyId", httpResponseCode: 400 }),
  ) {}
export class InvalidNextToken
  extends /*@__PURE__*/ S.TaggedError<InvalidNextToken>()(
    "InvalidNextToken",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidNextToken", httpResponseCode: 400 }),
  ) {}
export class InvalidNotificationConfig
  extends /*@__PURE__*/ S.TaggedError<InvalidNotificationConfig>()(
    "InvalidNotificationConfig",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidNotificationConfig", httpResponseCode: 400 }),
  ) {}
export class InvalidOptionException
  extends /*@__PURE__*/ S.TaggedError<InvalidOptionException>()(
    "InvalidOptionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidOption", httpResponseCode: 400 }),
  ) {}
export class InvalidOutputFolder
  extends /*@__PURE__*/ S.TaggedError<InvalidOutputFolder>()(
    "InvalidOutputFolder",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidOutputFolder", httpResponseCode: 400 }),
  ) {}
export class InvalidOutputLocation
  extends /*@__PURE__*/ S.TaggedError<InvalidOutputLocation>()(
    "InvalidOutputLocation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidOutputLocation", httpResponseCode: 400 }),
  ) {}
export class InvalidParameters
  extends /*@__PURE__*/ S.TaggedError<InvalidParameters>()(
    "InvalidParameters",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameters", httpResponseCode: 400 }),
  ) {}
export class InvalidPermissionType
  extends /*@__PURE__*/ S.TaggedError<InvalidPermissionType>()(
    "InvalidPermissionType",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidPermissionType", httpResponseCode: 400 }),
  ) {}
export class InvalidPluginName
  extends /*@__PURE__*/ S.TaggedError<InvalidPluginName>()(
    "InvalidPluginName",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidPluginName", httpResponseCode: 404 }),
  ) {}
export class InvalidPolicyAttributeException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyAttributeException>()(
    "InvalidPolicyAttributeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "InvalidPolicyAttributeException",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidPolicyTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyTypeException>()(
    "InvalidPolicyTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidPolicyTypeException", httpResponseCode: 400 }),
  ) {}
export class InvalidResourceId
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceId>()(
    "InvalidResourceId",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidResourceId", httpResponseCode: 400 }),
  ) {}
export class InvalidResourceType
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceType>()(
    "InvalidResourceType",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidResourceType", httpResponseCode: 400 }),
  ) {}
export class InvalidResultAttributeException
  extends /*@__PURE__*/ S.TaggedError<InvalidResultAttributeException>()(
    "InvalidResultAttributeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidResultAttribute", httpResponseCode: 400 }),
  ) {}
export class InvalidRole
  extends /*@__PURE__*/ S.TaggedError<InvalidRole>()(
    "InvalidRole",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidRole", httpResponseCode: 400 }),
  ) {}
export class InvalidSchedule
  extends /*@__PURE__*/ S.TaggedError<InvalidSchedule>()(
    "InvalidSchedule",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSchedule", httpResponseCode: 400 }),
  ) {}
export class InvalidTag
  extends /*@__PURE__*/ S.TaggedError<InvalidTag>()(
    "InvalidTag",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidTag", httpResponseCode: 400 }),
  ) {}
export class InvalidTarget
  extends /*@__PURE__*/ S.TaggedError<InvalidTarget>()(
    "InvalidTarget",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidTarget", httpResponseCode: 400 }),
  ) {}
export class InvalidTargetMaps
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetMaps>()(
    "InvalidTargetMaps",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidTargetMaps", httpResponseCode: 400 }),
  ) {}
export class InvalidTypeNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidTypeNameException>()(
    "InvalidTypeNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidTypeName", httpResponseCode: 400 }),
  ) {}
export class InvalidUpdate
  extends /*@__PURE__*/ S.TaggedError<InvalidUpdate>()(
    "InvalidUpdate",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvalidUpdate", httpResponseCode: 400 }),
  ) {}
export class InvocationDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<InvocationDoesNotExist>()(
    "InvocationDoesNotExist",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "InvocationDoesNotExist", httpResponseCode: 400 }),
  ) {}
export class ItemContentMismatchException
  extends /*@__PURE__*/ S.TaggedError<ItemContentMismatchException>()(
    "ItemContentMismatchException",
    {
      TypeName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.AwsQueryError({ code: "ItemContentMismatch", httpResponseCode: 400 }),
  ) {}
export class ItemSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ItemSizeLimitExceededException>()(
    "ItemSizeLimitExceededException",
    {
      TypeName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.AwsQueryError({ code: "ItemSizeLimitExceeded", httpResponseCode: 400 }),
  ) {}
export class MalformedResourcePolicyDocumentException
  extends /*@__PURE__*/ S.TaggedError<MalformedResourcePolicyDocumentException>()(
    "MalformedResourcePolicyDocumentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "MalformedResourcePolicyDocumentException",
      httpResponseCode: 400,
    }),
  ) {}
export class MaxDocumentSizeExceeded
  extends /*@__PURE__*/ S.TaggedError<MaxDocumentSizeExceeded>()(
    "MaxDocumentSizeExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "MaxDocumentSizeExceeded", httpResponseCode: 400 }),
  ) {}
export class NoLongerSupportedException
  extends /*@__PURE__*/ S.TaggedError<NoLongerSupportedException>()(
    "NoLongerSupportedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "NoLongerSupported", httpResponseCode: 400 }),
  ) {}
export class OpsItemAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<OpsItemAccessDeniedException>()(
    "OpsItemAccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "OpsItemAccessDeniedException", httpResponseCode: 403 }),
  ).pipe(C.withAuthError) {}
export class OpsItemAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<OpsItemAlreadyExistsException>()(
    "OpsItemAlreadyExistsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      OpsItemId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.AwsQueryError({ code: "OpsItemAlreadyExistsException", httpResponseCode: 400 }),
  ).pipe(C.withAlreadyExistsError) {}
export class OpsItemConflictException
  extends /*@__PURE__*/ S.TaggedError<OpsItemConflictException>()(
    "OpsItemConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "OpsItemConflictException", httpResponseCode: 409 }),
  ) {}
export class OpsItemInvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<OpsItemInvalidParameterException>()(
    "OpsItemInvalidParameterException",
    {
      ParameterNames: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(3584, __c224, 0)).annotate({
          identifier: "OpsItemParameterNamesList",
        }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.AwsQueryError({
      code: "OpsItemInvalidParameterException",
      httpResponseCode: 400,
    }),
  ) {}
export class OpsItemLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<OpsItemLimitExceededException>()(
    "OpsItemLimitExceededException",
    {
      ResourceTypes: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(3584, __c224, 0)).annotate({
          identifier: "OpsItemParameterNamesList",
        }),
      ),
      Limit: /*@__PURE__*/ S.optional(S.Number),
      LimitType: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.AwsQueryError({ code: "OpsItemLimitExceededException", httpResponseCode: 400 }),
  ) {}
export class OpsItemNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OpsItemNotFoundException>()(
    "OpsItemNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "OpsItemNotFoundException", httpResponseCode: 400 }),
  ) {}
export class OpsItemRelatedItemAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<OpsItemRelatedItemAlreadyExistsException>()(
    "OpsItemRelatedItemAlreadyExistsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceUri: /*@__PURE__*/ S.optional(S.String),
      OpsItemId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.AwsQueryError({
      code: "OpsItemRelatedItemAlreadyExistsException",
      httpResponseCode: 400,
    }),
  ).pipe(C.withAlreadyExistsError) {}
export class OpsItemRelatedItemAssociationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OpsItemRelatedItemAssociationNotFoundException>()(
    "OpsItemRelatedItemAssociationNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "OpsItemRelatedItemAssociationNotFoundException",
      httpResponseCode: 400,
    }),
  ) {}
export class OpsMetadataAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataAlreadyExistsException>()(
    "OpsMetadataAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "OpsMetadataAlreadyExistsException",
      httpResponseCode: 400,
    }),
  ).pipe(C.withAlreadyExistsError) {}
export class OpsMetadataInvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataInvalidArgumentException>()(
    "OpsMetadataInvalidArgumentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "OpsMetadataInvalidArgumentException",
      httpResponseCode: 400,
    }),
  ) {}
export class OpsMetadataKeyLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataKeyLimitExceededException>()(
    "OpsMetadataKeyLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "OpsMetadataKeyLimitExceededException",
      httpResponseCode: 429,
    }),
  ) {}
export class OpsMetadataLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataLimitExceededException>()(
    "OpsMetadataLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "OpsMetadataLimitExceededException",
      httpResponseCode: 429,
    }),
  ) {}
export class OpsMetadataNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataNotFoundException>()(
    "OpsMetadataNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "OpsMetadataNotFoundException", httpResponseCode: 404 }),
  ) {}
export class OpsMetadataTooManyUpdatesException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataTooManyUpdatesException>()(
    "OpsMetadataTooManyUpdatesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "OpsMetadataTooManyUpdatesException",
      httpResponseCode: 429,
    }),
  ) {}
export class ParameterAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<ParameterAlreadyExists>()(
    "ParameterAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "ParameterAlreadyExists", httpResponseCode: 400 }),
  ).pipe(C.withAlreadyExistsError) {}
export class ParameterLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ParameterLimitExceeded>()(
    "ParameterLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "ParameterLimitExceeded", httpResponseCode: 429 }),
  ).pipe(C.withThrottlingError) {}
export class ParameterMaxVersionLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ParameterMaxVersionLimitExceeded>()(
    "ParameterMaxVersionLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "ParameterMaxVersionLimitExceeded",
      httpResponseCode: 400,
    }),
  ).pipe(C.withThrottlingError) {}
export class ParameterNotFound
  extends /*@__PURE__*/ S.TaggedError<ParameterNotFound>()(
    "ParameterNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "ParameterNotFound", httpResponseCode: 404 }),
  ) {}
export class ParameterPatternMismatchException
  extends /*@__PURE__*/ S.TaggedError<ParameterPatternMismatchException>()(
    "ParameterPatternMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "ParameterPatternMismatchException",
      httpResponseCode: 400,
    }),
  ) {}
export class ParameterVersionLabelLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ParameterVersionLabelLimitExceeded>()(
    "ParameterVersionLabelLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "ParameterVersionLabelLimitExceeded",
      httpResponseCode: 400,
    }),
  ).pipe(C.withThrottlingError) {}
export class ParameterVersionNotFound
  extends /*@__PURE__*/ S.TaggedError<ParameterVersionNotFound>()(
    "ParameterVersionNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "ParameterVersionNotFound", httpResponseCode: 400 }),
  ) {}
export class PoliciesLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<PoliciesLimitExceededException>()(
    "PoliciesLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "PoliciesLimitExceededException",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourceDataSyncAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceDataSyncAlreadyExistsException>()(
    "ResourceDataSyncAlreadyExistsException",
    {
      SyncName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.AwsQueryError({ code: "ResourceDataSyncAlreadyExists", httpResponseCode: 400 }),
  ).pipe(C.withAlreadyExistsError) {}
export class ResourceDataSyncConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceDataSyncConflictException>()(
    "ResourceDataSyncConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "ResourceDataSyncConflictException",
      httpResponseCode: 409,
    }),
  ) {}
export class ResourceDataSyncCountExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceDataSyncCountExceededException>()(
    "ResourceDataSyncCountExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "ResourceDataSyncCountExceeded", httpResponseCode: 400 }),
  ) {}
export class ResourceDataSyncInvalidConfigurationException
  extends /*@__PURE__*/ S.TaggedError<ResourceDataSyncInvalidConfigurationException>()(
    "ResourceDataSyncInvalidConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "ResourceDataSyncInvalidConfiguration",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourceDataSyncNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceDataSyncNotFoundException>()(
    "ResourceDataSyncNotFoundException",
    {
      SyncName: /*@__PURE__*/ S.optional(S.String),
      SyncType: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.AwsQueryError({ code: "ResourceDataSyncNotFound", httpResponseCode: 404 }),
  ) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "ResourceInUseException", httpResponseCode: 400 }),
  ) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "ResourceLimitExceededException",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "ResourceNotFoundException", httpResponseCode: 404 }),
  ) {}
export class ResourcePolicyConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyConflictException>()(
    "ResourcePolicyConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "ResourcePolicyConflictException",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourcePolicyInvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyInvalidParameterException>()(
    "ResourcePolicyInvalidParameterException",
    {
      ParameterNames: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(3584, __c224, 0)).annotate({
          identifier: "ResourcePolicyParameterNamesList",
        }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.AwsQueryError({
      code: "ResourcePolicyInvalidParameterException",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourcePolicyLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyLimitExceededException>()(
    "ResourcePolicyLimitExceededException",
    {
      Limit: /*@__PURE__*/ S.optional(S.Number),
      LimitType: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.AwsQueryError({
      code: "ResourcePolicyLimitExceededException",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourcePolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyNotFoundException>()(
    "ResourcePolicyNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "ResourcePolicyNotFoundException",
      httpResponseCode: 404,
    }),
  ) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
      QuotaCode: S.String,
      ServiceCode: S.String,
    },
  ) {}
export class ServiceSettingNotFound
  extends /*@__PURE__*/ S.TaggedError<ServiceSettingNotFound>()(
    "ServiceSettingNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "ServiceSettingNotFound", httpResponseCode: 400 }),
  ) {}
export class StatusUnchanged
  extends /*@__PURE__*/ S.TaggedError<StatusUnchanged>()(
    "StatusUnchanged",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "StatusUnchanged", httpResponseCode: 400 }),
  ) {}
export class SubTypeCountLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<SubTypeCountLimitExceededException>()(
    "SubTypeCountLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "SubTypeCountLimitExceeded", httpResponseCode: 400 }),
  ) {}
export class TargetInUseException
  extends /*@__PURE__*/ S.TaggedError<TargetInUseException>()(
    "TargetInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "TargetInUseException", httpResponseCode: 400 }),
  ) {}
export class TargetNotConnected
  extends /*@__PURE__*/ S.TaggedError<TargetNotConnected>()(
    "TargetNotConnected",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "TargetNotConnected", httpResponseCode: 430 }),
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    QuotaCode: /*@__PURE__*/ S.optional(S.String),
    ServiceCode: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class TooManyTagsError
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsError>()(
    "TooManyTagsError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "TooManyTagsError", httpResponseCode: 400 }),
  ) {}
export class TooManyUpdates
  extends /*@__PURE__*/ S.TaggedError<TooManyUpdates>()(
    "TooManyUpdates",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "TooManyUpdates", httpResponseCode: 429 }),
  ) {}
export class TotalSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TotalSizeLimitExceededException>()(
    "TotalSizeLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "TotalSizeLimitExceeded", httpResponseCode: 400 }),
  ) {}
export class UnsupportedCalendarException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedCalendarException>()(
    "UnsupportedCalendarException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "UnsupportedCalendarException", httpResponseCode: 400 }),
  ) {}
export class UnsupportedFeatureRequiredException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedFeatureRequiredException>()(
    "UnsupportedFeatureRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "UnsupportedFeatureRequiredException",
      httpResponseCode: 400,
    }),
  ) {}
export class UnsupportedInventoryItemContextException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedInventoryItemContextException>()(
    "UnsupportedInventoryItemContextException",
    {
      TypeName: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.AwsQueryError({
      code: "UnsupportedInventoryItemContext",
      httpResponseCode: 400,
    }),
  ) {}
export class UnsupportedInventorySchemaVersionException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedInventorySchemaVersionException>()(
    "UnsupportedInventorySchemaVersionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({
      code: "UnsupportedInventorySchemaVersion",
      httpResponseCode: 400,
    }),
  ) {}
export class UnsupportedOperatingSystem
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperatingSystem>()(
    "UnsupportedOperatingSystem",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "UnsupportedOperatingSystem", httpResponseCode: 400 }),
  ) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "UnsupportedOperation", httpResponseCode: 400 }),
  ) {}
export class UnsupportedParameterType
  extends /*@__PURE__*/ S.TaggedError<UnsupportedParameterType>()(
    "UnsupportedParameterType",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "UnsupportedParameterType", httpResponseCode: 400 }),
  ) {}
export class UnsupportedPlatformType
  extends /*@__PURE__*/ S.TaggedError<UnsupportedPlatformType>()(
    "UnsupportedPlatformType",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.AwsQueryError({ code: "UnsupportedPlatformType", httpResponseCode: 400 }),
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ReasonCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.AwsQueryError({ code: "ValidationException", httpResponseCode: 400 }),
  ) {}
export type ResourceTypeForTagging =
  | "Document"
  | "ManagedInstance"
  | "MaintenanceWindow"
  | "Parameter"
  | "PatchBaseline"
  | "OpsItem"
  | "OpsMetadata"
  | "Automation"
  | "Association"
  | "CloudConnector"
  | (string & {});
export type ResourceId = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface AddTagsToResourceRequest {
  ResourceType: ResourceTypeForTagging;
  ResourceId: string;
  Tags: Tag[];
}
export interface AddTagsToResourceResult {}
export type OpsItemId = string;
export type OpsItemRelatedItemAssociationType = string;
export type OpsItemRelatedItemAssociationResourceType = string;
export type OpsItemRelatedItemAssociationResourceUri = string;
export interface AssociateOpsItemRelatedItemRequest {
  OpsItemId: string;
  AssociationType: string;
  ResourceType: string;
  ResourceUri: string;
}
export type OpsItemRelatedItemAssociationId = string;
export interface AssociateOpsItemRelatedItemResponse {
  AssociationId?: string | undefined;
}
export type CommandId = string;
export type InstanceId = string;
export type InstanceIdList = string[];
export interface CancelCommandRequest {
  CommandId: string;
  InstanceIds?: string[] | undefined;
}
export interface CancelCommandResult {}
export type MaintenanceWindowExecutionId = string;
export interface CancelMaintenanceWindowExecutionRequest {
  WindowExecutionId: string;
}
export interface CancelMaintenanceWindowExecutionResult {
  WindowExecutionId?: string | undefined;
}
export type ActivationDescription = string;
export type DefaultInstanceName = string;
export type IamRole = string;
export type RegistrationLimit = number;
export type ExpirationDate = Date;
export type RegistrationMetadataKey = string;
export type RegistrationMetadataValue = string;
export interface RegistrationMetadataItem {
  Key: string;
  Value: string;
}
export type RegistrationMetadataList = RegistrationMetadataItem[];
export interface CreateActivationRequest {
  Description?: string | undefined;
  DefaultInstanceName?: string | undefined;
  IamRole: string;
  RegistrationLimit?: number | undefined;
  ExpirationDate?: Date | undefined;
  Tags?: Tag[] | undefined;
  RegistrationMetadata?: RegistrationMetadataItem[] | undefined;
}
export type ActivationId = string;
export type ActivationCode = string;
export interface CreateActivationResult {
  ActivationId?: string | undefined;
  ActivationCode?: string | undefined;
}
export type DocumentARN = string;
export type DocumentVersion = string;
export type ParameterName = string;
export type ParameterValue = string;
export type ParameterValueList = string[];
export type Parameters = { [key: string]: string[] | undefined };
export type TargetKey = string;
export type TargetValue = string;
export type TargetValues = string[];
export interface Target {
  Key?: string | undefined;
  Values?: string[] | undefined;
}
export type Targets = Target[];
export type ScheduleExpression = string;
export type S3Region = string;
export type S3BucketName = string;
export type S3KeyPrefix = string;
export interface S3OutputLocation {
  OutputS3Region?: string | undefined;
  OutputS3BucketName?: string | undefined;
  OutputS3KeyPrefix?: string | undefined;
}
export interface InstanceAssociationOutputLocation {
  S3Location?: S3OutputLocation | undefined;
}
export type AssociationName = string;
export type AutomationTargetParameterName = string;
export type MaxErrors = string;
export type MaxConcurrency = string;
export type AssociationComplianceSeverity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "UNSPECIFIED"
  | (string & {});
export type AssociationSyncCompliance = "AUTO" | "MANUAL" | (string & {});
export type ApplyOnlyAtCronInterval = boolean;
export type CalendarNameOrARN = string;
export type CalendarNameOrARNList = string[];
export type Account = string;
export type Accounts = string[];
export type Region = string;
export type Regions = string[];
export type ExecutionRoleName = string;
export type AlarmName = string;
export interface Alarm {
  Name: string;
}
export type AlarmList = Alarm[];
export interface AlarmConfiguration {
  IgnorePollAlarmFailure?: boolean | undefined;
  Alarms: Alarm[];
}
export type ExcludeAccount = string;
export type ExcludeAccounts = string[];
export type AutomationTargets = Target[];
export interface TargetLocation {
  Accounts?: string[] | undefined;
  Regions?: string[] | undefined;
  TargetLocationMaxConcurrency?: string | undefined;
  TargetLocationMaxErrors?: string | undefined;
  ExecutionRoleName?: string | undefined;
  TargetLocationAlarmConfiguration?: AlarmConfiguration | undefined;
  IncludeChildOrganizationUnits?: boolean | undefined;
  ExcludeAccounts?: string[] | undefined;
  Targets?: Target[] | undefined;
  TargetsMaxConcurrency?: string | undefined;
  TargetsMaxErrors?: string | undefined;
}
export type TargetLocations = TargetLocation[];
export type ScheduleOffset = number;
export type Duration = number;
export type TargetMapKey = string;
export type TargetMapValue = string;
export type TargetMapValueList = string[];
export type TargetMap = { [key: string]: string[] | undefined };
export type TargetMaps = { [key: string]: string[] | undefined }[];
export type AssociationDispatchAssumeRoleArn = string;
export interface CreateAssociationRequest {
  Name: string;
  DocumentVersion?: string | undefined;
  InstanceId?: string | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  Targets?: Target[] | undefined;
  ScheduleExpression?: string | undefined;
  OutputLocation?: InstanceAssociationOutputLocation | undefined;
  AssociationName?: string | undefined;
  AutomationTargetParameterName?: string | undefined;
  MaxErrors?: string | undefined;
  MaxConcurrency?: string | undefined;
  ComplianceSeverity?: AssociationComplianceSeverity | undefined;
  SyncCompliance?: AssociationSyncCompliance | undefined;
  ApplyOnlyAtCronInterval?: boolean | undefined;
  CalendarNames?: string[] | undefined;
  TargetLocations?: TargetLocation[] | undefined;
  ScheduleOffset?: number | undefined;
  Duration?: number | undefined;
  TargetMaps?: { [key: string]: string[] | undefined }[] | undefined;
  Tags?: Tag[] | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
  AssociationDispatchAssumeRole?: string | undefined;
}
export type AssociationVersion = string;
export type AssociationStatusName = "Pending" | "Success" | "Failed" | (string & {});
export type StatusMessage = string;
export type StatusAdditionalInfo = string;
export interface AssociationStatus {
  Date: Date;
  Name: AssociationStatusName;
  Message: string;
  AdditionalInfo?: string | undefined;
}
export type StatusName = string;
export type InstanceCount = number;
export type AssociationStatusAggregatedCount = { [key: string]: number | undefined };
export interface AssociationOverview {
  Status?: string | undefined;
  DetailedStatus?: string | undefined;
  AssociationStatusAggregatedCount?: { [key: string]: number | undefined } | undefined;
}
export type AssociationId = string;
export type ExternalAlarmState = "UNKNOWN" | "ALARM" | (string & {});
export interface AlarmStateInformation {
  Name: string;
  State: ExternalAlarmState;
}
export type AlarmStateInformationList = AlarmStateInformation[];
export interface AssociationDescription {
  Name?: string | undefined;
  InstanceId?: string | undefined;
  AssociationVersion?: string | undefined;
  Date?: Date | undefined;
  LastUpdateAssociationDate?: Date | undefined;
  Status?: AssociationStatus | undefined;
  Overview?: AssociationOverview | undefined;
  DocumentVersion?: string | undefined;
  AutomationTargetParameterName?: string | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  AssociationId?: string | undefined;
  Targets?: Target[] | undefined;
  ScheduleExpression?: string | undefined;
  OutputLocation?: InstanceAssociationOutputLocation | undefined;
  LastExecutionDate?: Date | undefined;
  LastSuccessfulExecutionDate?: Date | undefined;
  AssociationName?: string | undefined;
  MaxErrors?: string | undefined;
  MaxConcurrency?: string | undefined;
  ComplianceSeverity?: AssociationComplianceSeverity | undefined;
  SyncCompliance?: AssociationSyncCompliance | undefined;
  ApplyOnlyAtCronInterval?: boolean | undefined;
  CalendarNames?: string[] | undefined;
  TargetLocations?: TargetLocation[] | undefined;
  ScheduleOffset?: number | undefined;
  Duration?: number | undefined;
  TargetMaps?: { [key: string]: string[] | undefined }[] | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
  TriggeredAlarms?: AlarmStateInformation[] | undefined;
  AssociationDispatchAssumeRole?: string | undefined;
}
export interface CreateAssociationResult {
  AssociationDescription?: AssociationDescription | undefined;
}
export interface CreateAssociationBatchRequestEntry {
  Name: string;
  InstanceId?: string | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  AutomationTargetParameterName?: string | undefined;
  DocumentVersion?: string | undefined;
  Targets?: Target[] | undefined;
  ScheduleExpression?: string | undefined;
  OutputLocation?: InstanceAssociationOutputLocation | undefined;
  AssociationName?: string | undefined;
  MaxErrors?: string | undefined;
  MaxConcurrency?: string | undefined;
  ComplianceSeverity?: AssociationComplianceSeverity | undefined;
  SyncCompliance?: AssociationSyncCompliance | undefined;
  ApplyOnlyAtCronInterval?: boolean | undefined;
  CalendarNames?: string[] | undefined;
  TargetLocations?: TargetLocation[] | undefined;
  ScheduleOffset?: number | undefined;
  Duration?: number | undefined;
  TargetMaps?: { [key: string]: string[] | undefined }[] | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
}
export type CreateAssociationBatchRequestEntries = CreateAssociationBatchRequestEntry[];
export interface CreateAssociationBatchRequest {
  Entries: CreateAssociationBatchRequestEntry[];
  AssociationDispatchAssumeRole?: string | undefined;
}
export type AssociationDescriptionList = AssociationDescription[];
export type BatchErrorMessage = string;
export type Fault = "Client" | "Server" | "Unknown" | (string & {});
export interface FailedCreateAssociation {
  Entry?: CreateAssociationBatchRequestEntry | undefined;
  Message?: string | undefined;
  Fault?: Fault | undefined;
}
export type FailedCreateAssociationList = FailedCreateAssociation[];
export interface CreateAssociationBatchResult {
  Successful?: AssociationDescription[] | undefined;
  Failed?: FailedCreateAssociation[] | undefined;
}
export type DisplayName = string;
export type CloudConnectorIamRoleArn = string;
export type CloudConnectorDescription = string;
export type AzureTenantId = string;
export type AzureTenantDisplayName = string;
export type AzureApplicationId = string;
export type AzureApplicationDisplayName = string;
export type AzureSubscriptionId = string;
export type AzureSubscriptionDisplayName = string;
export interface AzureSubscription {
  Id: string;
  DisplayName?: string | undefined;
}
export type AzureSubscriptionList = AzureSubscription[];
export type ConfigurationTargets = { Subscriptions: AzureSubscription[] };
export interface AzureConfiguration {
  TenantId: string;
  TenantDisplayName?: string | undefined;
  ApplicationId: string;
  ApplicationDisplayName?: string | undefined;
  Targets?: ConfigurationTargets | undefined;
}
export type CloudConnectorConfiguration = { AzureConfiguration: AzureConfiguration };
export type ConfigConnectorArn = string;
export interface CreateCloudConnectorRequest {
  DisplayName: string;
  RoleArn: string;
  Description?: string | undefined;
  Configuration: CloudConnectorConfiguration;
  ConfigConnectorArn: string;
  Tags?: Tag[] | undefined;
}
export type CloudConnectorId = string;
export interface CreateCloudConnectorResult {
  CloudConnectorId?: string | undefined;
}
export type DocumentContent = string;
export type RequireType = string;
export type DocumentVersionName = string;
export interface DocumentRequires {
  Name: string;
  Version?: string | undefined;
  RequireType?: string | undefined;
  VersionName?: string | undefined;
}
export type DocumentRequiresList = DocumentRequires[];
export type AttachmentsSourceKey =
  | "SourceUrl"
  | "S3FileUrl"
  | "AttachmentReference"
  | (string & {});
export type AttachmentsSourceValue = string;
export type AttachmentsSourceValues = string[];
export type AttachmentIdentifier = string;
export interface AttachmentsSource {
  Key?: AttachmentsSourceKey | undefined;
  Values?: string[] | undefined;
  Name?: string | undefined;
}
export type AttachmentsSourceList = AttachmentsSource[];
export type DocumentName = string;
export type DocumentDisplayName = string;
export type DocumentType =
  | "Command"
  | "Policy"
  | "Automation"
  | "Session"
  | "Package"
  | "ApplicationConfiguration"
  | "ApplicationConfigurationSchema"
  | "DeploymentStrategy"
  | "ChangeCalendar"
  | "Automation.ChangeTemplate"
  | "ProblemAnalysis"
  | "ProblemAnalysisTemplate"
  | "CloudFormation"
  | "ConformancePackTemplate"
  | "QuickSetup"
  | "ManualApprovalPolicy"
  | "AutoApprovalPolicy"
  | (string & {});
export type DocumentFormat = "YAML" | "JSON" | "TEXT" | (string & {});
export type TargetType = string;
export interface CreateDocumentRequest {
  Content: string;
  Requires?: DocumentRequires[] | undefined;
  Attachments?: AttachmentsSource[] | undefined;
  Name: string;
  DisplayName?: string | undefined;
  VersionName?: string | undefined;
  DocumentType?: DocumentType | undefined;
  DocumentFormat?: DocumentFormat | undefined;
  TargetType?: string | undefined;
  Tags?: Tag[] | undefined;
}
export type DocumentSha1 = string;
export type DocumentHash = string;
export type DocumentHashType = "Sha256" | "Sha1" | (string & {});
export type DocumentOwner = string;
export type DocumentStatus =
  | "Creating"
  | "Active"
  | "Updating"
  | "Deleting"
  | "Failed"
  | (string & {});
export type DocumentStatusInformation = string;
export type DescriptionInDocument = string;
export type DocumentParameterName = string;
export type DocumentParameterType = "String" | "StringList" | (string & {});
export type DocumentParameterDescrption = string;
export type DocumentParameterDefaultValue = string;
export interface DocumentParameter {
  Name?: string | undefined;
  Type?: DocumentParameterType | undefined;
  Description?: string | undefined;
  DefaultValue?: string | undefined;
}
export type DocumentParameterList = DocumentParameter[];
export type PlatformType = "Windows" | "Linux" | "MacOS" | (string & {});
export type PlatformTypeList = PlatformType[];
export type DocumentSchemaVersion = string;
export type AttachmentName = string;
export interface AttachmentInformation {
  Name?: string | undefined;
}
export type AttachmentInformationList = AttachmentInformation[];
export type DocumentAuthor = string;
export type ReviewStatus = "APPROVED" | "NOT_REVIEWED" | "PENDING" | "REJECTED" | (string & {});
export type Reviewer = string;
export interface ReviewInformation {
  ReviewedTime?: Date | undefined;
  Status?: ReviewStatus | undefined;
  Reviewer?: string | undefined;
}
export type ReviewInformationList = ReviewInformation[];
export type Category = string;
export type CategoryList = string[];
export type CategoryEnumList = string[];
export interface DocumentDescription {
  Sha1?: string | undefined;
  Hash?: string | undefined;
  HashType?: DocumentHashType | undefined;
  Name?: string | undefined;
  DisplayName?: string | undefined;
  VersionName?: string | undefined;
  Owner?: string | undefined;
  CreatedDate?: Date | undefined;
  Status?: DocumentStatus | undefined;
  StatusInformation?: string | undefined;
  DocumentVersion?: string | undefined;
  Description?: string | undefined;
  Parameters?: DocumentParameter[] | undefined;
  PlatformTypes?: PlatformType[] | undefined;
  DocumentType?: DocumentType | undefined;
  SchemaVersion?: string | undefined;
  LatestVersion?: string | undefined;
  DefaultVersion?: string | undefined;
  DocumentFormat?: DocumentFormat | undefined;
  TargetType?: string | undefined;
  Tags?: Tag[] | undefined;
  AttachmentsInformation?: AttachmentInformation[] | undefined;
  Requires?: DocumentRequires[] | undefined;
  Author?: string | undefined;
  ReviewInformation?: ReviewInformation[] | undefined;
  ApprovedVersion?: string | undefined;
  PendingReviewVersion?: string | undefined;
  ReviewStatus?: ReviewStatus | undefined;
  Category?: string[] | undefined;
  CategoryEnum?: string[] | undefined;
}
export interface CreateDocumentResult {
  DocumentDescription?: DocumentDescription | undefined;
}
export type MaintenanceWindowName = string;
export type MaintenanceWindowDescription = string | redacted.Redacted<string>;
export type MaintenanceWindowStringDateTime = string;
export type MaintenanceWindowSchedule = string;
export type MaintenanceWindowTimezone = string;
export type MaintenanceWindowOffset = number;
export type MaintenanceWindowDurationHours = number;
export type MaintenanceWindowCutoff = number;
export type MaintenanceWindowAllowUnassociatedTargets = boolean;
export type ClientToken = string;
export interface CreateMaintenanceWindowRequest {
  Name: string;
  Description?: string | redacted.Redacted<string> | undefined;
  StartDate?: string | undefined;
  EndDate?: string | undefined;
  Schedule: string;
  ScheduleTimezone?: string | undefined;
  ScheduleOffset?: number | undefined;
  Duration: number;
  Cutoff: number;
  AllowUnassociatedTargets: boolean;
  ClientToken?: string | undefined;
  Tags?: Tag[] | undefined;
}
export type MaintenanceWindowId = string;
export interface CreateMaintenanceWindowResult {
  WindowId?: string | undefined;
}
export type OpsItemDescription = string;
export type OpsItemType = string;
export type OpsItemDataKey = string;
export type OpsItemDataValueString = string;
export type OpsItemDataType = "SearchableString" | "String" | (string & {});
export interface OpsItemDataValue {
  Value?: string | undefined;
  Type?: OpsItemDataType | undefined;
}
export type OpsItemOperationalData = { [key: string]: OpsItemDataValue | undefined };
export interface OpsItemNotification {
  Arn?: string | undefined;
}
export type OpsItemNotifications = OpsItemNotification[];
export type OpsItemPriority = number;
export interface RelatedOpsItem {
  OpsItemId: string;
}
export type RelatedOpsItems = RelatedOpsItem[];
export type OpsItemSource = string;
export type OpsItemTitle = string;
export type OpsItemCategory = string;
export type OpsItemSeverity = string;
export type OpsItemAccountId = string;
export interface CreateOpsItemRequest {
  Description: string;
  OpsItemType?: string | undefined;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined } | undefined;
  Notifications?: OpsItemNotification[] | undefined;
  Priority?: number | undefined;
  RelatedOpsItems?: RelatedOpsItem[] | undefined;
  Source: string;
  Title: string;
  Tags?: Tag[] | undefined;
  Category?: string | undefined;
  Severity?: string | undefined;
  ActualStartTime?: Date | undefined;
  ActualEndTime?: Date | undefined;
  PlannedStartTime?: Date | undefined;
  PlannedEndTime?: Date | undefined;
  AccountId?: string | undefined;
}
export type OpsItemArn = string;
export interface CreateOpsItemResponse {
  OpsItemId?: string | undefined;
  OpsItemArn?: string | undefined;
}
export type OpsMetadataResourceId = string;
export type MetadataKey = string;
export type MetadataValueString = string;
export interface MetadataValue {
  Value?: string | undefined;
}
export type MetadataMap = { [key: string]: MetadataValue | undefined };
export interface CreateOpsMetadataRequest {
  ResourceId: string;
  Metadata?: { [key: string]: MetadataValue | undefined } | undefined;
  Tags?: Tag[] | undefined;
}
export type OpsMetadataArn = string;
export interface CreateOpsMetadataResult {
  OpsMetadataArn?: string | undefined;
}
export type OperatingSystem =
  | "WINDOWS"
  | "AMAZON_LINUX"
  | "AMAZON_LINUX_2"
  | "AMAZON_LINUX_2022"
  | "UBUNTU"
  | "REDHAT_ENTERPRISE_LINUX"
  | "SUSE"
  | "CENTOS"
  | "ORACLE_LINUX"
  | "DEBIAN"
  | "MACOS"
  | "RASPBIAN"
  | "ROCKY_LINUX"
  | "ALMA_LINUX"
  | "AMAZON_LINUX_2023"
  | (string & {});
export type BaselineName = string;
export type PatchFilterKey =
  | "ARCH"
  | "ADVISORY_ID"
  | "BUGZILLA_ID"
  | "PATCH_SET"
  | "PRODUCT"
  | "PRODUCT_FAMILY"
  | "CLASSIFICATION"
  | "CVE_ID"
  | "EPOCH"
  | "MSRC_SEVERITY"
  | "NAME"
  | "PATCH_ID"
  | "SECTION"
  | "PRIORITY"
  | "REPOSITORY"
  | "RELEASE"
  | "SEVERITY"
  | "SECURITY"
  | "VERSION"
  | (string & {});
export type PatchFilterValue = string;
export type PatchFilterValueList = string[];
export interface PatchFilter {
  Key: PatchFilterKey;
  Values: string[];
}
export type PatchFilterList = PatchFilter[];
export interface PatchFilterGroup {
  PatchFilters: PatchFilter[];
}
export type PatchComplianceLevel =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "INFORMATIONAL"
  | "UNSPECIFIED"
  | (string & {});
export type ApproveAfterDays = number;
export type PatchStringDateTime = string;
export interface PatchRule {
  PatchFilterGroup: PatchFilterGroup;
  ComplianceLevel?: PatchComplianceLevel | undefined;
  ApproveAfterDays?: number | undefined;
  ApproveUntilDate?: string | undefined;
  EnableNonSecurity?: boolean | undefined;
}
export type PatchRuleList = PatchRule[];
export interface PatchRuleGroup {
  PatchRules: PatchRule[];
}
export type PatchId = string;
export type PatchIdList = string[];
export type PatchAction = "ALLOW_AS_DEPENDENCY" | "BLOCK" | (string & {});
export type BaselineDescription = string;
export type PatchSourceName = string;
export type PatchSourceProduct = string;
export type PatchSourceProductList = string[];
export type PatchSourceConfiguration = string | redacted.Redacted<string>;
export interface PatchSource {
  Name: string;
  Products: string[];
  Configuration: string | redacted.Redacted<string>;
}
export type PatchSourceList = PatchSource[];
export type PatchComplianceStatus = "COMPLIANT" | "NON_COMPLIANT" | (string & {});
export interface CreatePatchBaselineRequest {
  OperatingSystem?: OperatingSystem | undefined;
  Name: string;
  GlobalFilters?: PatchFilterGroup | undefined;
  ApprovalRules?: PatchRuleGroup | undefined;
  ApprovedPatches?: string[] | undefined;
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel | undefined;
  ApprovedPatchesEnableNonSecurity?: boolean | undefined;
  RejectedPatches?: string[] | undefined;
  RejectedPatchesAction?: PatchAction | undefined;
  Description?: string | undefined;
  Sources?: PatchSource[] | undefined;
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus | undefined;
  ClientToken?: string | undefined;
  Tags?: Tag[] | undefined;
}
export type BaselineId = string;
export interface CreatePatchBaselineResult {
  BaselineId?: string | undefined;
}
export type ResourceDataSyncName = string;
export type ResourceDataSyncS3BucketName = string;
export type ResourceDataSyncS3Prefix = string;
export type ResourceDataSyncS3Format = "JsonSerDe" | (string & {});
export type ResourceDataSyncS3Region = string;
export type ResourceDataSyncAWSKMSKeyARN = string;
export type ResourceDataSyncDestinationDataSharingType = string;
export interface ResourceDataSyncDestinationDataSharing {
  DestinationDataSharingType?: string | undefined;
}
export interface ResourceDataSyncS3Destination {
  BucketName: string;
  Prefix?: string | undefined;
  SyncFormat: ResourceDataSyncS3Format;
  Region: string;
  AWSKMSKeyARN?: string | undefined;
  DestinationDataSharing?: ResourceDataSyncDestinationDataSharing | undefined;
}
export type ResourceDataSyncType = string;
export type ResourceDataSyncSourceType = string;
export type ResourceDataSyncOrganizationSourceType = string;
export type ResourceDataSyncOrganizationalUnitId = string;
export interface ResourceDataSyncOrganizationalUnit {
  OrganizationalUnitId?: string | undefined;
}
export type ResourceDataSyncOrganizationalUnitList = ResourceDataSyncOrganizationalUnit[];
export interface ResourceDataSyncAwsOrganizationsSource {
  OrganizationSourceType: string;
  OrganizationalUnits?: ResourceDataSyncOrganizationalUnit[] | undefined;
}
export type ResourceDataSyncSourceRegion = string;
export type ResourceDataSyncSourceRegionList = string[];
export type ResourceDataSyncIncludeFutureRegions = boolean;
export type ResourceDataSyncEnableAllOpsDataSources = boolean;
export interface ResourceDataSyncSource {
  SourceType: string;
  AwsOrganizationsSource?: ResourceDataSyncAwsOrganizationsSource | undefined;
  SourceRegions: string[];
  IncludeFutureRegions?: boolean | undefined;
  EnableAllOpsDataSources?: boolean | undefined;
}
export interface CreateResourceDataSyncRequest {
  SyncName: string;
  S3Destination?: ResourceDataSyncS3Destination | undefined;
  SyncType?: string | undefined;
  SyncSource?: ResourceDataSyncSource | undefined;
}
export interface CreateResourceDataSyncResult {}
export interface DeleteActivationRequest {
  ActivationId: string;
}
export interface DeleteActivationResult {}
export interface DeleteAssociationRequest {
  Name?: string | undefined;
  InstanceId?: string | undefined;
  AssociationId?: string | undefined;
}
export interface DeleteAssociationResult {}
export interface DeleteCloudConnectorRequest {
  CloudConnectorId: string;
}
export interface DeleteCloudConnectorResult {
  CloudConnectorId?: string | undefined;
}
export interface DeleteDocumentRequest {
  Name: string;
  DocumentVersion?: string | undefined;
  VersionName?: string | undefined;
  Force?: boolean | undefined;
}
export interface DeleteDocumentResult {}
export type InventoryItemTypeName = string;
export type InventorySchemaDeleteOption = "DisableSchema" | "DeleteSchema" | (string & {});
export type DryRun = boolean;
export type UUID = string;
export interface DeleteInventoryRequest {
  TypeName: string;
  SchemaDeleteOption?: InventorySchemaDeleteOption | undefined;
  DryRun?: boolean | undefined;
  ClientToken?: string | undefined;
}
export type TotalCount = number;
export type RemainingCount = number;
export type InventoryItemSchemaVersion = string;
export type ResourceCount = number;
export interface InventoryDeletionSummaryItem {
  Version?: string | undefined;
  Count?: number | undefined;
  RemainingCount?: number | undefined;
}
export type InventoryDeletionSummaryItems = InventoryDeletionSummaryItem[];
export interface InventoryDeletionSummary {
  TotalCount?: number | undefined;
  RemainingCount?: number | undefined;
  SummaryItems?: InventoryDeletionSummaryItem[] | undefined;
}
export interface DeleteInventoryResult {
  DeletionId?: string | undefined;
  TypeName?: string | undefined;
  DeletionSummary?: InventoryDeletionSummary | undefined;
}
export interface DeleteMaintenanceWindowRequest {
  WindowId: string;
}
export interface DeleteMaintenanceWindowResult {
  WindowId?: string | undefined;
}
export interface DeleteOpsItemRequest {
  OpsItemId: string;
}
export interface DeleteOpsItemResponse {}
export interface DeleteOpsMetadataRequest {
  OpsMetadataArn: string;
}
export interface DeleteOpsMetadataResult {}
export type PSParameterName = string;
export interface DeleteParameterRequest {
  Name: string;
}
export interface DeleteParameterResult {}
export type ParameterNameList = string[];
export interface DeleteParametersRequest {
  Names: string[];
}
export interface DeleteParametersResult {
  DeletedParameters?: string[] | undefined;
  InvalidParameters?: string[] | undefined;
}
export interface DeletePatchBaselineRequest {
  BaselineId: string;
}
export interface DeletePatchBaselineResult {
  BaselineId?: string | undefined;
}
export interface DeleteResourceDataSyncRequest {
  SyncName: string;
  SyncType?: string | undefined;
}
export interface DeleteResourceDataSyncResult {}
export type ResourceArnString = string;
export type PolicyId = string;
export type PolicyHash = string;
export type DeletionMode = "RemoveSharing" | "RollbackMigration" | (string & {});
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
  PolicyId: string;
  PolicyHash: string;
  DeletionMode?: DeletionMode | undefined;
}
export interface DeleteResourcePolicyResponse {}
export interface DeregisterDefaultHostManagementConfigurationRequest {}
export interface DeregisterDefaultHostManagementConfigurationResult {}
export type ManagedInstanceId = string;
export interface DeregisterManagedInstanceRequest {
  InstanceId: string;
}
export interface DeregisterManagedInstanceResult {}
export type PatchGroup = string;
export interface DeregisterPatchBaselineForPatchGroupRequest {
  BaselineId: string;
  PatchGroup: string;
}
export interface DeregisterPatchBaselineForPatchGroupResult {
  BaselineId?: string | undefined;
  PatchGroup?: string | undefined;
}
export type MaintenanceWindowTargetId = string;
export interface DeregisterTargetFromMaintenanceWindowRequest {
  WindowId: string;
  WindowTargetId: string;
  Safe?: boolean | undefined;
}
export interface DeregisterTargetFromMaintenanceWindowResult {
  WindowId?: string | undefined;
  WindowTargetId?: string | undefined;
}
export type MaintenanceWindowTaskId = string;
export interface DeregisterTaskFromMaintenanceWindowRequest {
  WindowId: string;
  WindowTaskId: string;
}
export interface DeregisterTaskFromMaintenanceWindowResult {
  WindowId?: string | undefined;
  WindowTaskId?: string | undefined;
}
export type DescribeActivationsFilterKeys =
  | "ActivationIds"
  | "DefaultInstanceName"
  | "IamRole"
  | (string & {});
export type StringList = string[];
export interface DescribeActivationsFilter {
  FilterKey?: DescribeActivationsFilterKeys | undefined;
  FilterValues?: string[] | undefined;
}
export type DescribeActivationsFilterList = DescribeActivationsFilter[];
export type MaxResults = number;
export type NextToken = string;
export interface DescribeActivationsRequest {
  Filters?: DescribeActivationsFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type RegistrationsCount = number;
export type CreatedDate = Date;
export interface Activation {
  ActivationId?: string | undefined;
  Description?: string | undefined;
  DefaultInstanceName?: string | undefined;
  IamRole?: string | undefined;
  RegistrationLimit?: number | undefined;
  RegistrationsCount?: number | undefined;
  ExpirationDate?: Date | undefined;
  Expired?: boolean | undefined;
  CreatedDate?: Date | undefined;
  Tags?: Tag[] | undefined;
}
export type ActivationList = Activation[];
export interface DescribeActivationsResult {
  ActivationList?: Activation[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeAssociationRequest {
  Name?: string | undefined;
  InstanceId?: string | undefined;
  AssociationId?: string | undefined;
  AssociationVersion?: string | undefined;
}
export interface DescribeAssociationResult {
  AssociationDescription?: AssociationDescription | undefined;
}
export type AssociationExecutionFilterKey =
  | "ExecutionId"
  | "Status"
  | "CreatedTime"
  | (string & {});
export type AssociationExecutionFilterValue = string;
export type AssociationFilterOperatorType = "EQUAL" | "LESS_THAN" | "GREATER_THAN" | (string & {});
export interface AssociationExecutionFilter {
  Key: AssociationExecutionFilterKey;
  Value: string;
  Type: AssociationFilterOperatorType;
}
export type AssociationExecutionFilterList = AssociationExecutionFilter[];
export interface DescribeAssociationExecutionsRequest {
  AssociationId: string;
  Filters?: AssociationExecutionFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type AssociationExecutionId = string;
export type ResourceCountByStatus = string;
export interface AssociationExecution {
  AssociationId?: string | undefined;
  AssociationVersion?: string | undefined;
  ExecutionId?: string | undefined;
  Status?: string | undefined;
  DetailedStatus?: string | undefined;
  CreatedTime?: Date | undefined;
  LastExecutionDate?: Date | undefined;
  ResourceCountByStatus?: string | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
  TriggeredAlarms?: AlarmStateInformation[] | undefined;
}
export type AssociationExecutionsList = AssociationExecution[];
export interface DescribeAssociationExecutionsResult {
  AssociationExecutions?: AssociationExecution[] | undefined;
  NextToken?: string | undefined;
}
export type AssociationExecutionTargetsFilterKey =
  | "Status"
  | "ResourceId"
  | "ResourceType"
  | (string & {});
export type AssociationExecutionTargetsFilterValue = string;
export interface AssociationExecutionTargetsFilter {
  Key: AssociationExecutionTargetsFilterKey;
  Value: string;
}
export type AssociationExecutionTargetsFilterList = AssociationExecutionTargetsFilter[];
export interface DescribeAssociationExecutionTargetsRequest {
  AssociationId: string;
  ExecutionId: string;
  Filters?: AssociationExecutionTargetsFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type AssociationResourceId = string;
export type AssociationResourceType = string;
export type OutputSourceId = string;
export type OutputSourceType = string;
export interface OutputSource {
  OutputSourceId?: string | undefined;
  OutputSourceType?: string | undefined;
}
export interface AssociationExecutionTarget {
  AssociationId?: string | undefined;
  AssociationVersion?: string | undefined;
  ExecutionId?: string | undefined;
  ResourceId?: string | undefined;
  ResourceType?: string | undefined;
  Status?: string | undefined;
  DetailedStatus?: string | undefined;
  LastExecutionDate?: Date | undefined;
  OutputSource?: OutputSource | undefined;
}
export type AssociationExecutionTargetsList = AssociationExecutionTarget[];
export interface DescribeAssociationExecutionTargetsResult {
  AssociationExecutionTargets?: AssociationExecutionTarget[] | undefined;
  NextToken?: string | undefined;
}
export type AutomationExecutionFilterKey =
  | "DocumentNamePrefix"
  | "ExecutionStatus"
  | "ExecutionId"
  | "ParentExecutionId"
  | "CurrentAction"
  | "StartTimeBefore"
  | "StartTimeAfter"
  | "AutomationType"
  | "TagKey"
  | "TargetResourceGroup"
  | "AutomationSubtype"
  | "OpsItemId"
  | (string & {});
export type AutomationExecutionFilterValue = string;
export type AutomationExecutionFilterValueList = string[];
export interface AutomationExecutionFilter {
  Key: AutomationExecutionFilterKey;
  Values: string[];
}
export type AutomationExecutionFilterList = AutomationExecutionFilter[];
export interface DescribeAutomationExecutionsRequest {
  Filters?: AutomationExecutionFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type AutomationExecutionId = string;
export type AutomationExecutionStatus =
  | "Pending"
  | "InProgress"
  | "Waiting"
  | "Success"
  | "TimedOut"
  | "Cancelling"
  | "Cancelled"
  | "Failed"
  | "PendingApproval"
  | "Approved"
  | "Rejected"
  | "Scheduled"
  | "RunbookInProgress"
  | "PendingChangeCalendarOverride"
  | "ChangeCalendarOverrideApproved"
  | "ChangeCalendarOverrideRejected"
  | "CompletedWithSuccess"
  | "CompletedWithFailure"
  | "Exited"
  | (string & {});
export type AutomationParameterKey = string;
export type AutomationParameterValue = string;
export type AutomationParameterValueList = string[];
export type AutomationParameterMap = { [key: string]: string[] | undefined };
export type ExecutionMode = "Auto" | "Interactive" | (string & {});
export type TargetParameterList = string[];
export interface ResolvedTargets {
  ParameterValues?: string[] | undefined;
  Truncated?: boolean | undefined;
}
export type AutomationType = "CrossAccount" | "Local" | (string & {});
export type TargetLocationsURL = string;
export type AutomationSubtype = "ChangeRequest" | "AccessRequest" | (string & {});
export interface Runbook {
  DocumentName: string;
  DocumentVersion?: string | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  TargetParameterName?: string | undefined;
  Targets?: Target[] | undefined;
  TargetMaps?: { [key: string]: string[] | undefined }[] | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  TargetLocations?: TargetLocation[] | undefined;
}
export type Runbooks = Runbook[];
export type ChangeRequestName = string;
export interface AutomationExecutionMetadata {
  AutomationExecutionId?: string | undefined;
  DocumentName?: string | undefined;
  DocumentVersion?: string | undefined;
  AutomationExecutionStatus?: AutomationExecutionStatus | undefined;
  ExecutionStartTime?: Date | undefined;
  ExecutionEndTime?: Date | undefined;
  ExecutedBy?: string | undefined;
  LogFile?: string | undefined;
  Outputs?: { [key: string]: string[] | undefined } | undefined;
  Mode?: ExecutionMode | undefined;
  ParentAutomationExecutionId?: string | undefined;
  CurrentStepName?: string | undefined;
  CurrentAction?: string | undefined;
  FailureMessage?: string | undefined;
  WarningMessage?: string | undefined;
  TargetParameterName?: string | undefined;
  Targets?: Target[] | undefined;
  TargetMaps?: { [key: string]: string[] | undefined }[] | undefined;
  ResolvedTargets?: ResolvedTargets | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  Target?: string | undefined;
  AutomationType?: AutomationType | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
  TriggeredAlarms?: AlarmStateInformation[] | undefined;
  TargetLocationsURL?: string | undefined;
  AutomationSubtype?: AutomationSubtype | undefined;
  ScheduledTime?: Date | undefined;
  Runbooks?: Runbook[] | undefined;
  OpsItemId?: string | undefined;
  AssociationId?: string | undefined;
  ChangeRequestName?: string | undefined;
}
export type AutomationExecutionMetadataList = AutomationExecutionMetadata[];
export interface DescribeAutomationExecutionsResult {
  AutomationExecutionMetadataList?: AutomationExecutionMetadata[] | undefined;
  NextToken?: string | undefined;
}
export type StepExecutionFilterKey =
  | "StartTimeBefore"
  | "StartTimeAfter"
  | "StepExecutionStatus"
  | "StepExecutionId"
  | "StepName"
  | "Action"
  | "ParentStepExecutionId"
  | "ParentStepIteration"
  | "ParentStepIteratorValue"
  | (string & {});
export type StepExecutionFilterValue = string;
export type StepExecutionFilterValueList = string[];
export interface StepExecutionFilter {
  Key: StepExecutionFilterKey;
  Values: string[];
}
export type StepExecutionFilterList = StepExecutionFilter[];
export interface DescribeAutomationStepExecutionsRequest {
  AutomationExecutionId: string;
  Filters?: StepExecutionFilter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  ReverseOrder?: boolean | undefined;
}
export type AutomationActionName = string;
export type NormalStringMap = { [key: string]: string | undefined };
export interface FailureDetails {
  FailureStage?: string | undefined;
  FailureType?: string | undefined;
  Details?: { [key: string]: string[] | undefined } | undefined;
}
export type ValidNextStep = string;
export type ValidNextStepList = string[];
export interface ParentStepDetails {
  StepExecutionId?: string | undefined;
  StepName?: string | undefined;
  Action?: string | undefined;
  Iteration?: number | undefined;
  IteratorValue?: string | undefined;
}
export interface StepExecution {
  StepName?: string | undefined;
  Action?: string | undefined;
  TimeoutSeconds?: number | undefined;
  OnFailure?: string | undefined;
  MaxAttempts?: number | undefined;
  ExecutionStartTime?: Date | undefined;
  ExecutionEndTime?: Date | undefined;
  StepStatus?: AutomationExecutionStatus | undefined;
  ResponseCode?: string | undefined;
  Inputs?: { [key: string]: string | undefined } | undefined;
  Outputs?: { [key: string]: string[] | undefined } | undefined;
  Response?: string | undefined;
  FailureMessage?: string | undefined;
  WarningMessage?: string | undefined;
  FailureDetails?: FailureDetails | undefined;
  StepExecutionId?: string | undefined;
  OverriddenParameters?: { [key: string]: string[] | undefined } | undefined;
  IsEnd?: boolean | undefined;
  NextStep?: string | undefined;
  IsCritical?: boolean | undefined;
  ValidNextSteps?: string[] | undefined;
  Targets?: Target[] | undefined;
  TargetLocation?: TargetLocation | undefined;
  TriggeredAlarms?: AlarmStateInformation[] | undefined;
  ParentStepDetails?: ParentStepDetails | undefined;
}
export type StepExecutionList = StepExecution[];
export interface DescribeAutomationStepExecutionsResult {
  StepExecutions?: StepExecution[] | undefined;
  NextToken?: string | undefined;
}
export type PatchOrchestratorFilterKey = string;
export type PatchOrchestratorFilterValue = string;
export type PatchOrchestratorFilterValues = string[];
export interface PatchOrchestratorFilter {
  Key?: string | undefined;
  Values?: string[] | undefined;
}
export type PatchOrchestratorFilterList = PatchOrchestratorFilter[];
export type PatchBaselineMaxResults = number;
export interface DescribeAvailablePatchesRequest {
  Filters?: PatchOrchestratorFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type PatchTitle = string;
export type PatchDescription = string;
export type PatchContentUrl = string;
export type PatchVendor = string;
export type PatchProductFamily = string;
export type PatchProduct = string;
export type PatchClassification = string;
export type PatchMsrcSeverity = string;
export type PatchKbNumber = string;
export type PatchMsrcNumber = string;
export type PatchLanguage = string;
export type PatchAdvisoryId = string;
export type PatchAdvisoryIdList = string[];
export type PatchBugzillaId = string;
export type PatchBugzillaIdList = string[];
export type PatchCVEId = string;
export type PatchCVEIdList = string[];
export type PatchName = string;
export type PatchEpoch = number;
export type PatchVersion = string;
export type PatchRelease = string;
export type PatchArch = string;
export type PatchSeverity = string;
export type PatchRepository = string;
export interface Patch {
  Id?: string | undefined;
  ReleaseDate?: Date | undefined;
  Title?: string | undefined;
  Description?: string | undefined;
  ContentUrl?: string | undefined;
  Vendor?: string | undefined;
  ProductFamily?: string | undefined;
  Product?: string | undefined;
  Classification?: string | undefined;
  MsrcSeverity?: string | undefined;
  KbNumber?: string | undefined;
  MsrcNumber?: string | undefined;
  Language?: string | undefined;
  AdvisoryIds?: string[] | undefined;
  BugzillaIds?: string[] | undefined;
  CVEIds?: string[] | undefined;
  Name?: string | undefined;
  Epoch?: number | undefined;
  Version?: string | undefined;
  Release?: string | undefined;
  Arch?: string | undefined;
  Severity?: string | undefined;
  Repository?: string | undefined;
}
export type PatchList = Patch[];
export interface DescribeAvailablePatchesResult {
  Patches?: Patch[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeDocumentRequest {
  Name: string;
  DocumentVersion?: string | undefined;
  VersionName?: string | undefined;
}
export interface DescribeDocumentResult {
  Document?: DocumentDescription | undefined;
}
export type DocumentPermissionType = "Share" | (string & {});
export type DocumentPermissionMaxResults = number;
export interface DescribeDocumentPermissionRequest {
  Name: string;
  PermissionType: DocumentPermissionType;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type AccountId = string;
export type AccountIdList = string[];
export type SharedDocumentVersion = string;
export interface AccountSharingInfo {
  AccountId?: string | undefined;
  SharedDocumentVersion?: string | undefined;
}
export type AccountSharingInfoList = AccountSharingInfo[];
export interface DescribeDocumentPermissionResponse {
  AccountIds?: string[] | undefined;
  AccountSharingInfoList?: AccountSharingInfo[] | undefined;
  NextToken?: string | undefined;
}
export type EffectiveInstanceAssociationMaxResults = number;
export interface DescribeEffectiveInstanceAssociationsRequest {
  InstanceId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface InstanceAssociation {
  AssociationId?: string | undefined;
  InstanceId?: string | undefined;
  Content?: string | undefined;
  AssociationVersion?: string | undefined;
}
export type InstanceAssociationList = InstanceAssociation[];
export interface DescribeEffectiveInstanceAssociationsResult {
  Associations?: InstanceAssociation[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeEffectivePatchesForPatchBaselineRequest {
  BaselineId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type PatchDeploymentStatus =
  | "APPROVED"
  | "PENDING_APPROVAL"
  | "EXPLICIT_APPROVED"
  | "EXPLICIT_REJECTED"
  | (string & {});
export interface PatchStatus {
  DeploymentStatus?: PatchDeploymentStatus | undefined;
  ComplianceLevel?: PatchComplianceLevel | undefined;
  ApprovalDate?: Date | undefined;
}
export interface EffectivePatch {
  Patch?: Patch | undefined;
  PatchStatus?: PatchStatus | undefined;
}
export type EffectivePatchList = EffectivePatch[];
export interface DescribeEffectivePatchesForPatchBaselineResult {
  EffectivePatches?: EffectivePatch[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeInstanceAssociationsStatusRequest {
  InstanceId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type InstanceAssociationExecutionSummary = string;
export type AgentErrorCode = string;
export type Url = string;
export interface S3OutputUrl {
  OutputUrl?: string | undefined;
}
export interface InstanceAssociationOutputUrl {
  S3OutputUrl?: S3OutputUrl | undefined;
}
export interface InstanceAssociationStatusInfo {
  AssociationId?: string | undefined;
  Name?: string | undefined;
  DocumentVersion?: string | undefined;
  AssociationVersion?: string | undefined;
  InstanceId?: string | undefined;
  ExecutionDate?: Date | undefined;
  Status?: string | undefined;
  DetailedStatus?: string | undefined;
  ExecutionSummary?: string | undefined;
  ErrorCode?: string | undefined;
  OutputUrl?: InstanceAssociationOutputUrl | undefined;
  AssociationName?: string | undefined;
}
export type InstanceAssociationStatusInfos = InstanceAssociationStatusInfo[];
export interface DescribeInstanceAssociationsStatusResult {
  InstanceAssociationStatusInfos?: InstanceAssociationStatusInfo[] | undefined;
  NextToken?: string | undefined;
}
export type InstanceInformationFilterKey =
  | "InstanceIds"
  | "AgentVersion"
  | "PingStatus"
  | "PlatformTypes"
  | "ActivationIds"
  | "IamRole"
  | "ResourceType"
  | "AssociationStatus"
  | (string & {});
export type InstanceInformationFilterValue = string;
export type InstanceInformationFilterValueSet = string[];
export interface InstanceInformationFilter {
  key: InstanceInformationFilterKey;
  valueSet: string[];
}
export type InstanceInformationFilterList = InstanceInformationFilter[];
export type InstanceInformationStringFilterKey = string;
export interface InstanceInformationStringFilter {
  Key: string;
  Values: string[];
}
export type InstanceInformationStringFilterList = InstanceInformationStringFilter[];
export type MaxResultsEC2Compatible = number;
export interface DescribeInstanceInformationRequest {
  InstanceInformationFilterList?: InstanceInformationFilter[] | undefined;
  Filters?: InstanceInformationStringFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type PingStatus = "Online" | "ConnectionLost" | "Inactive" | (string & {});
export type Version = string;
export type ResourceType = "ManagedInstance" | "EC2Instance" | (string & {});
export type IPAddress = string | redacted.Redacted<string>;
export type ComputerName = string;
export type InstanceAssociationStatusAggregatedCount = { [key: string]: number | undefined };
export interface InstanceAggregatedAssociationOverview {
  DetailedStatus?: string | undefined;
  InstanceAssociationStatusAggregatedCount?: { [key: string]: number | undefined } | undefined;
}
export type SourceId = string;
export type SourceType =
  | "AWS::EC2::Instance"
  | "AWS::IoT::Thing"
  | "AWS::SSM::ManagedInstance"
  | "Microsoft.Compute/virtualMachines"
  | (string & {});
export type SourceLocation = string;
export interface InstanceInformation {
  InstanceId?: string | undefined;
  PingStatus?: PingStatus | undefined;
  LastPingDateTime?: Date | undefined;
  AgentVersion?: string | undefined;
  IsLatestVersion?: boolean | undefined;
  PlatformType?: PlatformType | undefined;
  PlatformName?: string | undefined;
  PlatformVersion?: string | undefined;
  ActivationId?: string | undefined;
  IamRole?: string | undefined;
  RegistrationDate?: Date | undefined;
  ResourceType?: ResourceType | undefined;
  Name?: string | undefined;
  IPAddress?: string | redacted.Redacted<string> | undefined;
  ComputerName?: string | undefined;
  AssociationStatus?: string | undefined;
  LastAssociationExecutionDate?: Date | undefined;
  LastSuccessfulAssociationExecutionDate?: Date | undefined;
  AssociationOverview?: InstanceAggregatedAssociationOverview | undefined;
  SourceId?: string | undefined;
  SourceType?: SourceType | undefined;
  SourceLocation?: string | undefined;
}
export type InstanceInformationList = InstanceInformation[];
export interface DescribeInstanceInformationResult {
  InstanceInformationList?: InstanceInformation[] | undefined;
  NextToken?: string | undefined;
}
export type PatchComplianceMaxResults = number;
export interface DescribeInstancePatchesRequest {
  InstanceId: string;
  Filters?: PatchOrchestratorFilter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type PatchComplianceDataState =
  | "INSTALLED"
  | "INSTALLED_OTHER"
  | "INSTALLED_PENDING_REBOOT"
  | "INSTALLED_REJECTED"
  | "MISSING"
  | "NOT_APPLICABLE"
  | "FAILED"
  | "AVAILABLE_SECURITY_UPDATE"
  | (string & {});
export type PatchCVEIds = string;
export interface PatchComplianceData {
  Title: string;
  KBId: string;
  Classification: string;
  Severity: string;
  State: PatchComplianceDataState;
  InstalledTime: Date;
  CVEIds?: string | undefined;
}
export type PatchComplianceDataList = PatchComplianceData[];
export interface DescribeInstancePatchesResult {
  Patches?: PatchComplianceData[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeInstancePatchStatesRequest {
  InstanceIds: string[];
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type SnapshotId = string;
export type InstallOverrideList = string;
export type OwnerInformation = string | redacted.Redacted<string>;
export type PatchInstalledCount = number;
export type PatchInstalledOtherCount = number;
export type PatchInstalledPendingRebootCount = number;
export type PatchInstalledRejectedCount = number;
export type PatchMissingCount = number;
export type PatchFailedCount = number;
export type PatchUnreportedNotApplicableCount = number;
export type PatchNotApplicableCount = number;
export type PatchAvailableSecurityUpdateCount = number;
export type PatchOperationType = "Scan" | "Install" | (string & {});
export type RebootOption = "RebootIfNeeded" | "NoReboot" | (string & {});
export type PatchCriticalNonCompliantCount = number;
export type PatchSecurityNonCompliantCount = number;
export type PatchOtherNonCompliantCount = number;
export interface InstancePatchState {
  InstanceId: string;
  PatchGroup: string;
  BaselineId: string;
  SnapshotId?: string | undefined;
  InstallOverrideList?: string | undefined;
  OwnerInformation?: string | redacted.Redacted<string> | undefined;
  InstalledCount?: number | undefined;
  InstalledOtherCount?: number | undefined;
  InstalledPendingRebootCount?: number | undefined;
  InstalledRejectedCount?: number | undefined;
  MissingCount?: number | undefined;
  FailedCount?: number | undefined;
  UnreportedNotApplicableCount?: number | undefined;
  NotApplicableCount?: number | undefined;
  AvailableSecurityUpdateCount?: number | undefined;
  OperationStartTime: Date;
  OperationEndTime: Date;
  Operation: PatchOperationType;
  LastNoRebootInstallOperationTime?: Date | undefined;
  RebootOption?: RebootOption | undefined;
  CriticalNonCompliantCount?: number | undefined;
  SecurityNonCompliantCount?: number | undefined;
  OtherNonCompliantCount?: number | undefined;
}
export type InstancePatchStateList = InstancePatchState[];
export interface DescribeInstancePatchStatesResult {
  InstancePatchStates?: InstancePatchState[] | undefined;
  NextToken?: string | undefined;
}
export type InstancePatchStateFilterKey = string;
export type InstancePatchStateFilterValue = string;
export type InstancePatchStateFilterValues = string[];
export type InstancePatchStateOperatorType =
  | "Equal"
  | "NotEqual"
  | "LessThan"
  | "GreaterThan"
  | (string & {});
export interface InstancePatchStateFilter {
  Key: string;
  Values: string[];
  Type: InstancePatchStateOperatorType;
}
export type InstancePatchStateFilterList = InstancePatchStateFilter[];
export interface DescribeInstancePatchStatesForPatchGroupRequest {
  PatchGroup: string;
  Filters?: InstancePatchStateFilter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type InstancePatchStatesList = InstancePatchState[];
export interface DescribeInstancePatchStatesForPatchGroupResult {
  InstancePatchStates?: InstancePatchState[] | undefined;
  NextToken?: string | undefined;
}
export type InstancePropertyFilterKey =
  | "InstanceIds"
  | "AgentVersion"
  | "PingStatus"
  | "PlatformTypes"
  | "DocumentName"
  | "ActivationIds"
  | "IamRole"
  | "ResourceType"
  | "AssociationStatus"
  | (string & {});
export type InstancePropertyFilterValue = string;
export type InstancePropertyFilterValueSet = string[];
export interface InstancePropertyFilter {
  key: InstancePropertyFilterKey;
  valueSet: string[];
}
export type InstancePropertyFilterList = InstancePropertyFilter[];
export type InstancePropertyStringFilterKey = string;
export type InstancePropertyFilterOperator =
  | "Equal"
  | "NotEqual"
  | "BeginWith"
  | "LessThan"
  | "GreaterThan"
  | (string & {});
export interface InstancePropertyStringFilter {
  Key: string;
  Values: string[];
  Operator?: InstancePropertyFilterOperator | undefined;
}
export type InstancePropertyStringFilterList = InstancePropertyStringFilter[];
export type DescribeInstancePropertiesMaxResults = number;
export interface DescribeInstancePropertiesRequest {
  InstancePropertyFilterList?: InstancePropertyFilter[] | undefined;
  FiltersWithOperator?: InstancePropertyStringFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type InstanceName = string;
export type InstanceType = string;
export type InstanceRole = string;
export type KeyName = string;
export type InstanceState = string;
export type Architecture = string;
export type PlatformName = string;
export type PlatformVersion = string;
export type AvailabilityZone = string;
export interface InstanceProperty {
  Name?: string | undefined;
  InstanceId?: string | undefined;
  InstanceType?: string | undefined;
  InstanceRole?: string | undefined;
  KeyName?: string | undefined;
  InstanceState?: string | undefined;
  Architecture?: string | undefined;
  IPAddress?: string | redacted.Redacted<string> | undefined;
  LaunchTime?: Date | undefined;
  PingStatus?: PingStatus | undefined;
  LastPingDateTime?: Date | undefined;
  AgentVersion?: string | undefined;
  PlatformType?: PlatformType | undefined;
  PlatformName?: string | undefined;
  PlatformVersion?: string | undefined;
  ActivationId?: string | undefined;
  IamRole?: string | undefined;
  RegistrationDate?: Date | undefined;
  ResourceType?: string | undefined;
  ComputerName?: string | undefined;
  AssociationStatus?: string | undefined;
  LastAssociationExecutionDate?: Date | undefined;
  LastSuccessfulAssociationExecutionDate?: Date | undefined;
  AssociationOverview?: InstanceAggregatedAssociationOverview | undefined;
  SourceId?: string | undefined;
  SourceType?: SourceType | undefined;
  SourceLocation?: string | undefined;
  AvailabilityZone?: string | undefined;
}
export type InstanceProperties = InstanceProperty[];
export interface DescribeInstancePropertiesResult {
  InstanceProperties?: InstanceProperty[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeInventoryDeletionsRequest {
  DeletionId?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type InventoryDeletionStartTime = Date;
export type InventoryDeletionStatus = "InProgress" | "Complete" | (string & {});
export type InventoryDeletionLastStatusMessage = string;
export type InventoryDeletionLastStatusUpdateTime = Date;
export interface InventoryDeletionStatusItem {
  DeletionId?: string | undefined;
  TypeName?: string | undefined;
  DeletionStartTime?: Date | undefined;
  LastStatus?: InventoryDeletionStatus | undefined;
  LastStatusMessage?: string | undefined;
  DeletionSummary?: InventoryDeletionSummary | undefined;
  LastStatusUpdateTime?: Date | undefined;
}
export type InventoryDeletionsList = InventoryDeletionStatusItem[];
export interface DescribeInventoryDeletionsResult {
  InventoryDeletions?: InventoryDeletionStatusItem[] | undefined;
  NextToken?: string | undefined;
}
export type MaintenanceWindowFilterKey = string;
export type MaintenanceWindowFilterValue = string;
export type MaintenanceWindowFilterValues = string[];
export interface MaintenanceWindowFilter {
  Key?: string | undefined;
  Values?: string[] | undefined;
}
export type MaintenanceWindowFilterList = MaintenanceWindowFilter[];
export type MaintenanceWindowMaxResults = number;
export interface DescribeMaintenanceWindowExecutionsRequest {
  WindowId: string;
  Filters?: MaintenanceWindowFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type MaintenanceWindowExecutionStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "TIMED_OUT"
  | "CANCELLING"
  | "CANCELLED"
  | "SKIPPED_OVERLAPPING"
  | (string & {});
export type MaintenanceWindowExecutionStatusDetails = string;
export interface MaintenanceWindowExecution {
  WindowId?: string | undefined;
  WindowExecutionId?: string | undefined;
  Status?: MaintenanceWindowExecutionStatus | undefined;
  StatusDetails?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
}
export type MaintenanceWindowExecutionList = MaintenanceWindowExecution[];
export interface DescribeMaintenanceWindowExecutionsResult {
  WindowExecutions?: MaintenanceWindowExecution[] | undefined;
  NextToken?: string | undefined;
}
export type MaintenanceWindowExecutionTaskId = string;
export interface DescribeMaintenanceWindowExecutionTaskInvocationsRequest {
  WindowExecutionId: string;
  TaskId: string;
  Filters?: MaintenanceWindowFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type MaintenanceWindowExecutionTaskInvocationId = string;
export type MaintenanceWindowExecutionTaskExecutionId = string;
export type MaintenanceWindowTaskType =
  | "RUN_COMMAND"
  | "AUTOMATION"
  | "STEP_FUNCTIONS"
  | "LAMBDA"
  | (string & {});
export type MaintenanceWindowExecutionTaskInvocationParameters = string | redacted.Redacted<string>;
export type MaintenanceWindowTaskTargetId = string;
export interface MaintenanceWindowExecutionTaskInvocationIdentity {
  WindowExecutionId?: string | undefined;
  TaskExecutionId?: string | undefined;
  InvocationId?: string | undefined;
  ExecutionId?: string | undefined;
  TaskType?: MaintenanceWindowTaskType | undefined;
  Parameters?: string | redacted.Redacted<string> | undefined;
  Status?: MaintenanceWindowExecutionStatus | undefined;
  StatusDetails?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  OwnerInformation?: string | redacted.Redacted<string> | undefined;
  WindowTargetId?: string | undefined;
}
export type MaintenanceWindowExecutionTaskInvocationIdentityList =
  MaintenanceWindowExecutionTaskInvocationIdentity[];
export interface DescribeMaintenanceWindowExecutionTaskInvocationsResult {
  WindowExecutionTaskInvocationIdentities?:
    | MaintenanceWindowExecutionTaskInvocationIdentity[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeMaintenanceWindowExecutionTasksRequest {
  WindowExecutionId: string;
  Filters?: MaintenanceWindowFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type MaintenanceWindowTaskArn = string;
export interface MaintenanceWindowExecutionTaskIdentity {
  WindowExecutionId?: string | undefined;
  TaskExecutionId?: string | undefined;
  Status?: MaintenanceWindowExecutionStatus | undefined;
  StatusDetails?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  TaskArn?: string | undefined;
  TaskType?: MaintenanceWindowTaskType | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
  TriggeredAlarms?: AlarmStateInformation[] | undefined;
}
export type MaintenanceWindowExecutionTaskIdentityList = MaintenanceWindowExecutionTaskIdentity[];
export interface DescribeMaintenanceWindowExecutionTasksResult {
  WindowExecutionTaskIdentities?: MaintenanceWindowExecutionTaskIdentity[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeMaintenanceWindowsRequest {
  Filters?: MaintenanceWindowFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type MaintenanceWindowEnabled = boolean;
export interface MaintenanceWindowIdentity {
  WindowId?: string | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
  Enabled?: boolean | undefined;
  Duration?: number | undefined;
  Cutoff?: number | undefined;
  Schedule?: string | undefined;
  ScheduleTimezone?: string | undefined;
  ScheduleOffset?: number | undefined;
  EndDate?: string | undefined;
  StartDate?: string | undefined;
  NextExecutionTime?: string | undefined;
}
export type MaintenanceWindowIdentityList = MaintenanceWindowIdentity[];
export interface DescribeMaintenanceWindowsResult {
  WindowIdentities?: MaintenanceWindowIdentity[] | undefined;
  NextToken?: string | undefined;
}
export type MaintenanceWindowResourceType = "INSTANCE" | "RESOURCE_GROUP" | (string & {});
export type MaintenanceWindowSearchMaxResults = number;
export interface DescribeMaintenanceWindowScheduleRequest {
  WindowId?: string | undefined;
  Targets?: Target[] | undefined;
  ResourceType?: MaintenanceWindowResourceType | undefined;
  Filters?: PatchOrchestratorFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ScheduledWindowExecution {
  WindowId?: string | undefined;
  Name?: string | undefined;
  ExecutionTime?: string | undefined;
}
export type ScheduledWindowExecutionList = ScheduledWindowExecution[];
export interface DescribeMaintenanceWindowScheduleResult {
  ScheduledWindowExecutions?: ScheduledWindowExecution[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeMaintenanceWindowsForTargetRequest {
  Targets: Target[];
  ResourceType: MaintenanceWindowResourceType;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface MaintenanceWindowIdentityForTarget {
  WindowId?: string | undefined;
  Name?: string | undefined;
}
export type MaintenanceWindowsForTargetList = MaintenanceWindowIdentityForTarget[];
export interface DescribeMaintenanceWindowsForTargetResult {
  WindowIdentities?: MaintenanceWindowIdentityForTarget[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeMaintenanceWindowTargetsRequest {
  WindowId: string;
  Filters?: MaintenanceWindowFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface MaintenanceWindowTarget {
  WindowId?: string | undefined;
  WindowTargetId?: string | undefined;
  ResourceType?: MaintenanceWindowResourceType | undefined;
  Targets?: Target[] | undefined;
  OwnerInformation?: string | redacted.Redacted<string> | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
}
export type MaintenanceWindowTargetList = MaintenanceWindowTarget[];
export interface DescribeMaintenanceWindowTargetsResult {
  Targets?: MaintenanceWindowTarget[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeMaintenanceWindowTasksRequest {
  WindowId: string;
  Filters?: MaintenanceWindowFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type MaintenanceWindowTaskParameterName = string;
export type MaintenanceWindowTaskParameterValue = string | redacted.Redacted<string>;
export type MaintenanceWindowTaskParameterValueList = (string | redacted.Redacted<string>)[];
export interface MaintenanceWindowTaskParameterValueExpression {
  Values?: (string | redacted.Redacted<string>)[] | undefined;
}
export type MaintenanceWindowTaskParameters = {
  [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
};
export type MaintenanceWindowTaskPriority = number;
export interface LoggingInfo {
  S3BucketName: string;
  S3KeyPrefix?: string | undefined;
  S3Region: string;
}
export type ServiceRole = string;
export type MaintenanceWindowTaskCutoffBehavior = "CONTINUE_TASK" | "CANCEL_TASK" | (string & {});
export interface MaintenanceWindowTask {
  WindowId?: string | undefined;
  WindowTaskId?: string | undefined;
  TaskArn?: string | undefined;
  Type?: MaintenanceWindowTaskType | undefined;
  Targets?: Target[] | undefined;
  TaskParameters?:
    | { [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined }
    | undefined;
  Priority?: number | undefined;
  LoggingInfo?: LoggingInfo | undefined;
  ServiceRoleArn?: string | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
}
export type MaintenanceWindowTaskList = MaintenanceWindowTask[];
export interface DescribeMaintenanceWindowTasksResult {
  Tasks?: MaintenanceWindowTask[] | undefined;
  NextToken?: string | undefined;
}
export type OpsItemFilterKey =
  | "Status"
  | "CreatedBy"
  | "Source"
  | "Priority"
  | "Title"
  | "OpsItemId"
  | "CreatedTime"
  | "LastModifiedTime"
  | "ActualStartTime"
  | "ActualEndTime"
  | "PlannedStartTime"
  | "PlannedEndTime"
  | "OperationalData"
  | "OperationalDataKey"
  | "OperationalDataValue"
  | "ResourceId"
  | "AutomationId"
  | "Category"
  | "Severity"
  | "OpsItemType"
  | "AccessRequestByRequesterArn"
  | "AccessRequestByRequesterId"
  | "AccessRequestByApproverArn"
  | "AccessRequestByApproverId"
  | "AccessRequestBySourceAccountId"
  | "AccessRequestBySourceOpsItemId"
  | "AccessRequestBySourceRegion"
  | "AccessRequestByIsReplica"
  | "AccessRequestByTargetResourceId"
  | "ChangeRequestByRequesterArn"
  | "ChangeRequestByRequesterName"
  | "ChangeRequestByApproverArn"
  | "ChangeRequestByApproverName"
  | "ChangeRequestByTemplate"
  | "ChangeRequestByTargetsResourceGroup"
  | "InsightByType"
  | "AccountId"
  | (string & {});
export type OpsItemFilterValue = string;
export type OpsItemFilterValues = string[];
export type OpsItemFilterOperator =
  | "Equal"
  | "Contains"
  | "GreaterThan"
  | "LessThan"
  | (string & {});
export interface OpsItemFilter {
  Key: OpsItemFilterKey;
  Values: string[];
  Operator: OpsItemFilterOperator;
}
export type OpsItemFilters = OpsItemFilter[];
export type OpsItemMaxResults = number;
export interface DescribeOpsItemsRequest {
  OpsItemFilters?: OpsItemFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type OpsItemStatus =
  | "Open"
  | "InProgress"
  | "Resolved"
  | "Pending"
  | "TimedOut"
  | "Cancelling"
  | "Cancelled"
  | "Failed"
  | "CompletedWithSuccess"
  | "CompletedWithFailure"
  | "Scheduled"
  | "RunbookInProgress"
  | "PendingChangeCalendarOverride"
  | "ChangeCalendarOverrideApproved"
  | "ChangeCalendarOverrideRejected"
  | "PendingApproval"
  | "Approved"
  | "Revoked"
  | "Rejected"
  | "Closed"
  | (string & {});
export interface OpsItemSummary {
  CreatedBy?: string | undefined;
  CreatedTime?: Date | undefined;
  LastModifiedBy?: string | undefined;
  LastModifiedTime?: Date | undefined;
  Priority?: number | undefined;
  Source?: string | undefined;
  Status?: OpsItemStatus | undefined;
  OpsItemId?: string | undefined;
  Title?: string | undefined;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined } | undefined;
  Category?: string | undefined;
  Severity?: string | undefined;
  OpsItemType?: string | undefined;
  ActualStartTime?: Date | undefined;
  ActualEndTime?: Date | undefined;
  PlannedStartTime?: Date | undefined;
  PlannedEndTime?: Date | undefined;
}
export type OpsItemSummaries = OpsItemSummary[];
export interface DescribeOpsItemsResponse {
  NextToken?: string | undefined;
  OpsItemSummaries?: OpsItemSummary[] | undefined;
}
export type ParametersFilterKey = "Name" | "Type" | "KeyId" | (string & {});
export type ParametersFilterValue = string;
export type ParametersFilterValueList = string[];
export interface ParametersFilter {
  Key: ParametersFilterKey;
  Values: string[];
}
export type ParametersFilterList = ParametersFilter[];
export type ParameterStringFilterKey = string;
export type ParameterStringQueryOption = string;
export type ParameterStringFilterValue = string;
export type ParameterStringFilterValueList = string[];
export interface ParameterStringFilter {
  Key: string;
  Option?: string | undefined;
  Values?: string[] | undefined;
}
export type ParameterStringFilterList = ParameterStringFilter[];
export interface DescribeParametersRequest {
  Filters?: ParametersFilter[] | undefined;
  ParameterFilters?: ParameterStringFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Shared?: boolean | undefined;
}
export type ParameterType = "String" | "StringList" | "SecureString" | (string & {});
export type ParameterKeyId = string;
export type ParameterDescription = string;
export type AllowedPattern = string;
export type PSParameterVersion = number;
export type ParameterTier = "Standard" | "Advanced" | "Intelligent-Tiering" | (string & {});
export interface ParameterInlinePolicy {
  PolicyText?: string | undefined;
  PolicyType?: string | undefined;
  PolicyStatus?: string | undefined;
}
export type ParameterPolicyList = ParameterInlinePolicy[];
export type ParameterDataType = string;
export interface ParameterMetadata {
  Name?: string | undefined;
  ARN?: string | undefined;
  Type?: ParameterType | undefined;
  KeyId?: string | undefined;
  LastModifiedDate?: Date | undefined;
  LastModifiedUser?: string | undefined;
  Description?: string | undefined;
  AllowedPattern?: string | undefined;
  Version?: number | undefined;
  Tier?: ParameterTier | undefined;
  Policies?: ParameterInlinePolicy[] | undefined;
  DataType?: string | undefined;
}
export type ParameterMetadataList = ParameterMetadata[];
export interface DescribeParametersResult {
  Parameters?: ParameterMetadata[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribePatchBaselinesRequest {
  Filters?: PatchOrchestratorFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type DefaultBaseline = boolean;
export interface PatchBaselineIdentity {
  BaselineId?: string | undefined;
  BaselineName?: string | undefined;
  OperatingSystem?: OperatingSystem | undefined;
  BaselineDescription?: string | undefined;
  DefaultBaseline?: boolean | undefined;
}
export type PatchBaselineIdentityList = PatchBaselineIdentity[];
export interface DescribePatchBaselinesResult {
  BaselineIdentities?: PatchBaselineIdentity[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribePatchGroupsRequest {
  MaxResults?: number | undefined;
  Filters?: PatchOrchestratorFilter[] | undefined;
  NextToken?: string | undefined;
}
export interface PatchGroupPatchBaselineMapping {
  PatchGroup?: string | undefined;
  BaselineIdentity?: PatchBaselineIdentity | undefined;
}
export type PatchGroupPatchBaselineMappingList = PatchGroupPatchBaselineMapping[];
export interface DescribePatchGroupsResult {
  Mappings?: PatchGroupPatchBaselineMapping[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribePatchGroupStateRequest {
  PatchGroup: string;
}
export type InstancesCount = number;
export interface DescribePatchGroupStateResult {
  Instances?: number | undefined;
  InstancesWithInstalledPatches?: number | undefined;
  InstancesWithInstalledOtherPatches?: number | undefined;
  InstancesWithInstalledPendingRebootPatches?: number | undefined;
  InstancesWithInstalledRejectedPatches?: number | undefined;
  InstancesWithMissingPatches?: number | undefined;
  InstancesWithFailedPatches?: number | undefined;
  InstancesWithNotApplicablePatches?: number | undefined;
  InstancesWithUnreportedNotApplicablePatches?: number | undefined;
  InstancesWithCriticalNonCompliantPatches?: number | undefined;
  InstancesWithSecurityNonCompliantPatches?: number | undefined;
  InstancesWithOtherNonCompliantPatches?: number | undefined;
  InstancesWithAvailableSecurityUpdates?: number | undefined;
}
export type PatchProperty =
  | "PRODUCT"
  | "PRODUCT_FAMILY"
  | "CLASSIFICATION"
  | "MSRC_SEVERITY"
  | "PRIORITY"
  | "SEVERITY"
  | (string & {});
export type PatchSet = "OS" | "APPLICATION" | (string & {});
export interface DescribePatchPropertiesRequest {
  OperatingSystem: OperatingSystem;
  Property: PatchProperty;
  PatchSet?: PatchSet | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type AttributeName = string;
export type AttributeValue = string;
export type PatchPropertyEntry = { [key: string]: string | undefined };
export type PatchPropertiesList = { [key: string]: string | undefined }[];
export interface DescribePatchPropertiesResult {
  Properties?: { [key: string]: string | undefined }[] | undefined;
  NextToken?: string | undefined;
}
export type SessionState = "Active" | "History" | (string & {});
export type SessionMaxResults = number;
export type SessionFilterKey =
  | "InvokedAfter"
  | "InvokedBefore"
  | "Target"
  | "Owner"
  | "Status"
  | "SessionId"
  | "AccessType"
  | (string & {});
export type SessionFilterValue = string;
export interface SessionFilter {
  key: SessionFilterKey;
  value: string;
}
export type SessionFilterList = SessionFilter[];
export interface DescribeSessionsRequest {
  State: SessionState;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: SessionFilter[] | undefined;
}
export type SessionId = string;
export type SessionTarget = string;
export type SessionStatus =
  | "Connected"
  | "Connecting"
  | "Disconnected"
  | "Terminated"
  | "Terminating"
  | "Failed"
  | (string & {});
export type SessionOwner = string;
export type SessionReason = string;
export type SessionDetails = string;
export type SessionManagerS3OutputUrl = string;
export type SessionManagerCloudWatchOutputUrl = string;
export interface SessionManagerOutputUrl {
  S3OutputUrl?: string | undefined;
  CloudWatchOutputUrl?: string | undefined;
}
export type MaxSessionDuration = string;
export type AccessType = "Standard" | "JustInTime" | (string & {});
export interface Session {
  SessionId?: string | undefined;
  Target?: string | undefined;
  Status?: SessionStatus | undefined;
  StartDate?: Date | undefined;
  EndDate?: Date | undefined;
  DocumentName?: string | undefined;
  Owner?: string | undefined;
  Reason?: string | undefined;
  Details?: string | undefined;
  OutputUrl?: SessionManagerOutputUrl | undefined;
  MaxSessionDuration?: string | undefined;
  AccessType?: AccessType | undefined;
}
export type SessionList = Session[];
export interface DescribeSessionsResponse {
  Sessions?: Session[] | undefined;
  NextToken?: string | undefined;
}
export interface DisassociateOpsItemRelatedItemRequest {
  OpsItemId: string;
  AssociationId: string;
}
export interface DisassociateOpsItemRelatedItemResponse {}
export type AccessRequestId = string;
export interface GetAccessTokenRequest {
  AccessRequestId: string;
}
export type AccessKeyIdType = string;
export type AccessKeySecretType = string | redacted.Redacted<string>;
export type SessionTokenType = string | redacted.Redacted<string>;
export interface Credentials {
  AccessKeyId: string;
  SecretAccessKey: string | redacted.Redacted<string>;
  SessionToken: string | redacted.Redacted<string>;
  ExpirationTime: Date;
}
export type AccessRequestStatus =
  | "Approved"
  | "Rejected"
  | "Revoked"
  | "Expired"
  | "Pending"
  | (string & {});
export interface GetAccessTokenResponse {
  Credentials?: Credentials | undefined;
  AccessRequestStatus?: AccessRequestStatus | undefined;
}
export interface GetAutomationExecutionRequest {
  AutomationExecutionId: string;
}
export interface ProgressCounters {
  TotalSteps?: number | undefined;
  SuccessSteps?: number | undefined;
  FailedSteps?: number | undefined;
  CancelledSteps?: number | undefined;
  TimedOutSteps?: number | undefined;
}
export interface AutomationExecution {
  AutomationExecutionId?: string | undefined;
  DocumentName?: string | undefined;
  DocumentVersion?: string | undefined;
  ExecutionStartTime?: Date | undefined;
  ExecutionEndTime?: Date | undefined;
  AutomationExecutionStatus?: AutomationExecutionStatus | undefined;
  StepExecutions?: StepExecution[] | undefined;
  StepExecutionsTruncated?: boolean | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  Outputs?: { [key: string]: string[] | undefined } | undefined;
  FailureMessage?: string | undefined;
  WarningMessage?: string | undefined;
  Mode?: ExecutionMode | undefined;
  ParentAutomationExecutionId?: string | undefined;
  ExecutedBy?: string | undefined;
  CurrentStepName?: string | undefined;
  CurrentAction?: string | undefined;
  TargetParameterName?: string | undefined;
  Targets?: Target[] | undefined;
  TargetMaps?: { [key: string]: string[] | undefined }[] | undefined;
  ResolvedTargets?: ResolvedTargets | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  Target?: string | undefined;
  TargetLocations?: TargetLocation[] | undefined;
  ProgressCounters?: ProgressCounters | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
  TriggeredAlarms?: AlarmStateInformation[] | undefined;
  TargetLocationsURL?: string | undefined;
  AutomationSubtype?: AutomationSubtype | undefined;
  ScheduledTime?: Date | undefined;
  Runbooks?: Runbook[] | undefined;
  OpsItemId?: string | undefined;
  AssociationId?: string | undefined;
  ChangeRequestName?: string | undefined;
  Variables?: { [key: string]: string[] | undefined } | undefined;
}
export interface GetAutomationExecutionResult {
  AutomationExecution?: AutomationExecution | undefined;
}
export type ISO8601String = string;
export interface GetCalendarStateRequest {
  CalendarNames: string[];
  AtTime?: string | undefined;
}
export type CalendarState = "OPEN" | "CLOSED" | (string & {});
export interface GetCalendarStateResponse {
  State?: CalendarState | undefined;
  AtTime?: string | undefined;
  NextTransitionTime?: string | undefined;
}
export interface GetCloudConnectorRequest {
  CloudConnectorId: string;
}
export type CloudConnectorArn = string;
export interface GetCloudConnectorResult {
  CloudConnectorArn?: string | undefined;
  DisplayName?: string | undefined;
  Description?: string | undefined;
  RoleArn?: string | undefined;
  Configuration?: CloudConnectorConfiguration | undefined;
  ConfigConnectorArn?: string | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export type CommandPluginName = string;
export interface GetCommandInvocationRequest {
  CommandId: string;
  InstanceId: string;
  PluginName?: string | undefined;
}
export type Comment = string;
export type ResponseCode = number;
export type StringDateTime = string;
export type CommandInvocationStatus =
  | "Pending"
  | "InProgress"
  | "Delayed"
  | "Success"
  | "Cancelled"
  | "TimedOut"
  | "Failed"
  | "Cancelling"
  | (string & {});
export type StatusDetails = string;
export type StandardOutputContent = string;
export type StandardErrorContent = string;
export type CloudWatchLogGroupName = string;
export type CloudWatchOutputEnabled = boolean;
export interface CloudWatchOutputConfig {
  CloudWatchLogGroupName?: string | undefined;
  CloudWatchOutputEnabled?: boolean | undefined;
}
export interface GetCommandInvocationResult {
  CommandId?: string | undefined;
  InstanceId?: string | undefined;
  Comment?: string | undefined;
  DocumentName?: string | undefined;
  DocumentVersion?: string | undefined;
  PluginName?: string | undefined;
  ResponseCode?: number | undefined;
  ExecutionStartDateTime?: string | undefined;
  ExecutionElapsedTime?: string | undefined;
  ExecutionEndDateTime?: string | undefined;
  Status?: CommandInvocationStatus | undefined;
  StatusDetails?: string | undefined;
  StandardOutputContent?: string | undefined;
  StandardOutputUrl?: string | undefined;
  StandardErrorContent?: string | undefined;
  StandardErrorUrl?: string | undefined;
  CloudWatchOutputConfig?: CloudWatchOutputConfig | undefined;
}
export interface GetConnectionStatusRequest {
  Target: string;
}
export type ConnectionStatus = "connected" | "notconnected" | (string & {});
export interface GetConnectionStatusResponse {
  Target?: string | undefined;
  Status?: ConnectionStatus | undefined;
}
export interface GetDefaultPatchBaselineRequest {
  OperatingSystem?: OperatingSystem | undefined;
}
export interface GetDefaultPatchBaselineResult {
  BaselineId?: string | undefined;
  OperatingSystem?: OperatingSystem | undefined;
}
export interface BaselineOverride {
  OperatingSystem?: OperatingSystem | undefined;
  GlobalFilters?: PatchFilterGroup | undefined;
  ApprovalRules?: PatchRuleGroup | undefined;
  ApprovedPatches?: string[] | undefined;
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel | undefined;
  RejectedPatches?: string[] | undefined;
  RejectedPatchesAction?: PatchAction | undefined;
  ApprovedPatchesEnableNonSecurity?: boolean | undefined;
  Sources?: PatchSource[] | undefined;
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus | undefined;
}
export interface GetDeployablePatchSnapshotForInstanceRequest {
  InstanceId: string;
  SnapshotId: string;
  BaselineOverride?: BaselineOverride | undefined;
  UseS3DualStackEndpoint?: boolean | undefined;
}
export type SnapshotDownloadUrl = string;
export type Product = string;
export interface GetDeployablePatchSnapshotForInstanceResult {
  InstanceId?: string | undefined;
  SnapshotId?: string | undefined;
  SnapshotDownloadUrl?: string | undefined;
  Product?: string | undefined;
}
export interface GetDocumentRequest {
  Name: string;
  VersionName?: string | undefined;
  DocumentVersion?: string | undefined;
  DocumentFormat?: DocumentFormat | undefined;
}
export type ContentLength = number;
export type AttachmentHash = string;
export type AttachmentHashType = "Sha256" | (string & {});
export type AttachmentUrl = string;
export interface AttachmentContent {
  Name?: string | undefined;
  Size?: number | undefined;
  Hash?: string | undefined;
  HashType?: AttachmentHashType | undefined;
  Url?: string | undefined;
}
export type AttachmentContentList = AttachmentContent[];
export interface GetDocumentResult {
  Name?: string | undefined;
  CreatedDate?: Date | undefined;
  DisplayName?: string | undefined;
  VersionName?: string | undefined;
  DocumentVersion?: string | undefined;
  Status?: DocumentStatus | undefined;
  StatusInformation?: string | undefined;
  Content?: string | undefined;
  DocumentType?: DocumentType | undefined;
  DocumentFormat?: DocumentFormat | undefined;
  Requires?: DocumentRequires[] | undefined;
  AttachmentsContent?: AttachmentContent[] | undefined;
  ReviewStatus?: ReviewStatus | undefined;
}
export type ExecutionPreviewId = string;
export interface GetExecutionPreviewRequest {
  ExecutionPreviewId: string;
}
export type ExecutionPreviewStatus =
  | "Pending"
  | "InProgress"
  | "Success"
  | "Failed"
  | (string & {});
export type ImpactType = "Mutating" | "NonMutating" | "Undetermined" | (string & {});
export type StepPreviewMap = { [key in ImpactType]?: number | undefined };
export type RegionList = string[];
export interface TargetPreview {
  Count?: number | undefined;
  TargetType?: string | undefined;
}
export type TargetPreviewList = TargetPreview[];
export interface AutomationExecutionPreview {
  StepPreviews?: { [key: string]: number | undefined } | undefined;
  Regions?: string[] | undefined;
  TargetPreviews?: TargetPreview[] | undefined;
  TotalAccounts?: number | undefined;
}
export type ExecutionPreview = { Automation: AutomationExecutionPreview };
export interface GetExecutionPreviewResponse {
  ExecutionPreviewId?: string | undefined;
  EndedAt?: Date | undefined;
  Status?: ExecutionPreviewStatus | undefined;
  StatusMessage?: string | undefined;
  ExecutionPreview?: ExecutionPreview | undefined;
}
export type InventoryFilterKey = string;
export type InventoryFilterValue = string;
export type InventoryFilterValueList = string[];
export type InventoryQueryOperatorType =
  | "Equal"
  | "NotEqual"
  | "BeginWith"
  | "LessThan"
  | "GreaterThan"
  | "Exists"
  | (string & {});
export interface InventoryFilter {
  Key: string;
  Values: string[];
  Type?: InventoryQueryOperatorType | undefined;
}
export type InventoryFilterList = InventoryFilter[];
export type InventoryAggregatorExpression = string;
export type InventoryGroupName = string;
export interface InventoryGroup {
  Name: string;
  Filters: InventoryFilter[];
}
export type InventoryGroupList = InventoryGroup[];
export interface InventoryAggregator {
  Expression?: string | undefined;
  Aggregators?: InventoryAggregator[] | undefined;
  Groups?: InventoryGroup[] | undefined;
}
export type InventoryAggregatorList = InventoryAggregator[];
export interface ResultAttribute {
  TypeName: string;
}
export type ResultAttributeList = ResultAttribute[];
export interface GetInventoryRequest {
  Filters?: InventoryFilter[] | undefined;
  Aggregators?: InventoryAggregator[] | undefined;
  ResultAttributes?: ResultAttribute[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type InventoryResultEntityId = string;
export type InventoryResultItemKey = string;
export type InventoryItemCaptureTime = string;
export type InventoryItemContentHash = string;
export type InventoryItemEntry = { [key: string]: string | undefined };
export type InventoryItemEntryList = { [key: string]: string | undefined }[];
export interface InventoryResultItem {
  TypeName: string;
  SchemaVersion: string;
  CaptureTime?: string | undefined;
  ContentHash?: string | undefined;
  Content: { [key: string]: string | undefined }[];
}
export type InventoryResultItemMap = { [key: string]: InventoryResultItem | undefined };
export interface InventoryResultEntity {
  Id?: string | undefined;
  Data?: { [key: string]: InventoryResultItem | undefined } | undefined;
}
export type InventoryResultEntityList = InventoryResultEntity[];
export interface GetInventoryResult {
  Entities?: InventoryResultEntity[] | undefined;
  NextToken?: string | undefined;
}
export type InventoryItemTypeNameFilter = string;
export type GetInventorySchemaMaxResults = number;
export type AggregatorSchemaOnly = boolean;
export type IsSubTypeSchema = boolean;
export interface GetInventorySchemaRequest {
  TypeName?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Aggregator?: boolean | undefined;
  SubType?: boolean | undefined;
}
export type InventoryItemAttributeName = string;
export type InventoryAttributeDataType = "string" | "number" | (string & {});
export interface InventoryItemAttribute {
  Name: string;
  DataType: InventoryAttributeDataType;
}
export type InventoryItemAttributeList = InventoryItemAttribute[];
export type InventoryTypeDisplayName = string;
export interface InventoryItemSchema {
  TypeName: string;
  Version?: string | undefined;
  Attributes: InventoryItemAttribute[];
  DisplayName?: string | undefined;
}
export type InventoryItemSchemaResultList = InventoryItemSchema[];
export interface GetInventorySchemaResult {
  Schemas?: InventoryItemSchema[] | undefined;
  NextToken?: string | undefined;
}
export interface GetMaintenanceWindowRequest {
  WindowId: string;
}
export interface GetMaintenanceWindowResult {
  WindowId?: string | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
  StartDate?: string | undefined;
  EndDate?: string | undefined;
  Schedule?: string | undefined;
  ScheduleTimezone?: string | undefined;
  ScheduleOffset?: number | undefined;
  NextExecutionTime?: string | undefined;
  Duration?: number | undefined;
  Cutoff?: number | undefined;
  AllowUnassociatedTargets?: boolean | undefined;
  Enabled?: boolean | undefined;
  CreatedDate?: Date | undefined;
  ModifiedDate?: Date | undefined;
}
export interface GetMaintenanceWindowExecutionRequest {
  WindowExecutionId: string;
}
export type MaintenanceWindowExecutionTaskIdList = string[];
export interface GetMaintenanceWindowExecutionResult {
  WindowExecutionId?: string | undefined;
  TaskIds?: string[] | undefined;
  Status?: MaintenanceWindowExecutionStatus | undefined;
  StatusDetails?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
}
export interface GetMaintenanceWindowExecutionTaskRequest {
  WindowExecutionId: string;
  TaskId: string;
}
export type MaintenanceWindowTaskParametersList = {
  [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
}[];
export interface GetMaintenanceWindowExecutionTaskResult {
  WindowExecutionId?: string | undefined;
  TaskExecutionId?: string | undefined;
  TaskArn?: string | undefined;
  ServiceRole?: string | undefined;
  Type?: MaintenanceWindowTaskType | undefined;
  TaskParameters?:
    | { [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined }[]
    | undefined;
  Priority?: number | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  Status?: MaintenanceWindowExecutionStatus | undefined;
  StatusDetails?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
  TriggeredAlarms?: AlarmStateInformation[] | undefined;
}
export interface GetMaintenanceWindowExecutionTaskInvocationRequest {
  WindowExecutionId: string;
  TaskId: string;
  InvocationId: string;
}
export interface GetMaintenanceWindowExecutionTaskInvocationResult {
  WindowExecutionId?: string | undefined;
  TaskExecutionId?: string | undefined;
  InvocationId?: string | undefined;
  ExecutionId?: string | undefined;
  TaskType?: MaintenanceWindowTaskType | undefined;
  Parameters?: string | redacted.Redacted<string> | undefined;
  Status?: MaintenanceWindowExecutionStatus | undefined;
  StatusDetails?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  OwnerInformation?: string | redacted.Redacted<string> | undefined;
  WindowTargetId?: string | undefined;
}
export interface GetMaintenanceWindowTaskRequest {
  WindowId: string;
  WindowTaskId: string;
}
export type NotificationArn = string;
export type NotificationEvent =
  | "All"
  | "InProgress"
  | "Success"
  | "TimedOut"
  | "Cancelled"
  | "Failed"
  | (string & {});
export type NotificationEventList = NotificationEvent[];
export type NotificationType = "Command" | "Invocation" | (string & {});
export interface NotificationConfig {
  NotificationArn?: string | undefined;
  NotificationEvents?: NotificationEvent[] | undefined;
  NotificationType?: NotificationType | undefined;
}
export type TimeoutSeconds = number;
export interface MaintenanceWindowRunCommandParameters {
  Comment?: string | undefined;
  CloudWatchOutputConfig?: CloudWatchOutputConfig | undefined;
  DocumentHash?: string | undefined;
  DocumentHashType?: DocumentHashType | undefined;
  DocumentVersion?: string | undefined;
  NotificationConfig?: NotificationConfig | undefined;
  OutputS3BucketName?: string | undefined;
  OutputS3KeyPrefix?: string | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  ServiceRoleArn?: string | undefined;
  TimeoutSeconds?: number | undefined;
}
export interface MaintenanceWindowAutomationParameters {
  DocumentVersion?: string | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
}
export type MaintenanceWindowStepFunctionsInput = string | redacted.Redacted<string>;
export type MaintenanceWindowStepFunctionsName = string;
export interface MaintenanceWindowStepFunctionsParameters {
  Input?: string | redacted.Redacted<string> | undefined;
  Name?: string | undefined;
}
export type MaintenanceWindowLambdaClientContext = string;
export type MaintenanceWindowLambdaQualifier = string;
export type MaintenanceWindowLambdaPayload = Uint8Array | redacted.Redacted<Uint8Array>;
export interface MaintenanceWindowLambdaParameters {
  ClientContext?: string | undefined;
  Qualifier?: string | undefined;
  Payload?: Uint8Array | redacted.Redacted<Uint8Array> | undefined;
}
export interface MaintenanceWindowTaskInvocationParameters {
  RunCommand?: MaintenanceWindowRunCommandParameters | undefined;
  Automation?: MaintenanceWindowAutomationParameters | undefined;
  StepFunctions?: MaintenanceWindowStepFunctionsParameters | undefined;
  Lambda?: MaintenanceWindowLambdaParameters | undefined;
}
export interface GetMaintenanceWindowTaskResult {
  WindowId?: string | undefined;
  WindowTaskId?: string | undefined;
  Targets?: Target[] | undefined;
  TaskArn?: string | undefined;
  ServiceRoleArn?: string | undefined;
  TaskType?: MaintenanceWindowTaskType | undefined;
  TaskParameters?:
    | { [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined }
    | undefined;
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters | undefined;
  Priority?: number | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  LoggingInfo?: LoggingInfo | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
}
export interface GetOpsItemRequest {
  OpsItemId: string;
  OpsItemArn?: string | undefined;
}
export interface OpsItem {
  CreatedBy?: string | undefined;
  OpsItemType?: string | undefined;
  CreatedTime?: Date | undefined;
  Description?: string | undefined;
  LastModifiedBy?: string | undefined;
  LastModifiedTime?: Date | undefined;
  Notifications?: OpsItemNotification[] | undefined;
  Priority?: number | undefined;
  RelatedOpsItems?: RelatedOpsItem[] | undefined;
  Status?: OpsItemStatus | undefined;
  OpsItemId?: string | undefined;
  Version?: string | undefined;
  Title?: string | undefined;
  Source?: string | undefined;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined } | undefined;
  Category?: string | undefined;
  Severity?: string | undefined;
  ActualStartTime?: Date | undefined;
  ActualEndTime?: Date | undefined;
  PlannedStartTime?: Date | undefined;
  PlannedEndTime?: Date | undefined;
  OpsItemArn?: string | undefined;
}
export interface GetOpsItemResponse {
  OpsItem?: OpsItem | undefined;
}
export type GetOpsMetadataMaxResults = number;
export interface GetOpsMetadataRequest {
  OpsMetadataArn: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface GetOpsMetadataResult {
  ResourceId?: string | undefined;
  Metadata?: { [key: string]: MetadataValue | undefined } | undefined;
  NextToken?: string | undefined;
}
export type OpsFilterKey = string;
export type OpsFilterValue = string;
export type OpsFilterValueList = string[];
export type OpsFilterOperatorType =
  | "Equal"
  | "NotEqual"
  | "BeginWith"
  | "LessThan"
  | "GreaterThan"
  | "Exists"
  | (string & {});
export interface OpsFilter {
  Key: string;
  Values: string[];
  Type?: OpsFilterOperatorType | undefined;
}
export type OpsFilterList = OpsFilter[];
export type OpsAggregatorType = string;
export type OpsDataTypeName = string;
export type OpsDataAttributeName = string;
export type OpsAggregatorValueKey = string;
export type OpsAggregatorValue = string;
export type OpsAggregatorValueMap = { [key: string]: string | undefined };
export interface OpsAggregator {
  AggregatorType?: string | undefined;
  TypeName?: string | undefined;
  AttributeName?: string | undefined;
  Values?: { [key: string]: string | undefined } | undefined;
  Filters?: OpsFilter[] | undefined;
  Aggregators?: OpsAggregator[] | undefined;
}
export type OpsAggregatorList = OpsAggregator[];
export interface OpsResultAttribute {
  TypeName: string;
}
export type OpsResultAttributeList = OpsResultAttribute[];
export interface GetOpsSummaryRequest {
  SyncName?: string | undefined;
  Filters?: OpsFilter[] | undefined;
  Aggregators?: OpsAggregator[] | undefined;
  ResultAttributes?: OpsResultAttribute[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type OpsEntityId = string;
export type OpsEntityItemKey = string;
export type OpsEntityItemCaptureTime = string;
export type OpsEntityItemEntry = { [key: string]: string | undefined };
export type OpsEntityItemEntryList = { [key: string]: string | undefined }[];
export interface OpsEntityItem {
  CaptureTime?: string | undefined;
  Content?: { [key: string]: string | undefined }[] | undefined;
}
export type OpsEntityItemMap = { [key: string]: OpsEntityItem | undefined };
export interface OpsEntity {
  Id?: string | undefined;
  Data?: { [key: string]: OpsEntityItem | undefined } | undefined;
}
export type OpsEntityList = OpsEntity[];
export interface GetOpsSummaryResult {
  Entities?: OpsEntity[] | undefined;
  NextToken?: string | undefined;
}
export interface GetParameterRequest {
  Name: string;
  WithDecryption?: boolean | undefined;
}
export type PSParameterValue = string | redacted.Redacted<string>;
export type PSParameterSelector = string;
export interface Parameter {
  Name?: string | undefined;
  Type?: ParameterType | undefined;
  Value?: string | redacted.Redacted<string> | undefined;
  Version?: number | undefined;
  Selector?: string | undefined;
  SourceResult?: string | undefined;
  LastModifiedDate?: Date | undefined;
  ARN?: string | undefined;
  DataType?: string | undefined;
}
export interface GetParameterResult {
  Parameter?: Parameter | undefined;
}
export interface GetParameterHistoryRequest {
  Name: string;
  WithDecryption?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type ParameterLabel = string;
export type ParameterLabelList = string[];
export interface ParameterHistory {
  Name?: string | undefined;
  Type?: ParameterType | undefined;
  KeyId?: string | undefined;
  LastModifiedDate?: Date | undefined;
  LastModifiedUser?: string | undefined;
  Description?: string | undefined;
  Value?: string | redacted.Redacted<string> | undefined;
  AllowedPattern?: string | undefined;
  Version?: number | undefined;
  Labels?: string[] | undefined;
  Tier?: ParameterTier | undefined;
  Policies?: ParameterInlinePolicy[] | undefined;
  DataType?: string | undefined;
}
export type ParameterHistoryList = ParameterHistory[];
export interface GetParameterHistoryResult {
  Parameters?: ParameterHistory[] | undefined;
  NextToken?: string | undefined;
}
export interface GetParametersRequest {
  Names: string[];
  WithDecryption?: boolean | undefined;
}
export type ParameterList = Parameter[];
export interface GetParametersResult {
  Parameters?: Parameter[] | undefined;
  InvalidParameters?: string[] | undefined;
}
export type GetParametersByPathMaxResults = number;
export interface GetParametersByPathRequest {
  Path: string;
  Recursive?: boolean | undefined;
  ParameterFilters?: ParameterStringFilter[] | undefined;
  WithDecryption?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface GetParametersByPathResult {
  Parameters?: Parameter[] | undefined;
  NextToken?: string | undefined;
}
export interface GetPatchBaselineRequest {
  BaselineId: string;
}
export type PatchGroupList = string[];
export interface GetPatchBaselineResult {
  BaselineId?: string | undefined;
  Name?: string | undefined;
  OperatingSystem?: OperatingSystem | undefined;
  GlobalFilters?: PatchFilterGroup | undefined;
  ApprovalRules?: PatchRuleGroup | undefined;
  ApprovedPatches?: string[] | undefined;
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel | undefined;
  ApprovedPatchesEnableNonSecurity?: boolean | undefined;
  RejectedPatches?: string[] | undefined;
  RejectedPatchesAction?: PatchAction | undefined;
  PatchGroups?: string[] | undefined;
  CreatedDate?: Date | undefined;
  ModifiedDate?: Date | undefined;
  Description?: string | undefined;
  Sources?: PatchSource[] | undefined;
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus | undefined;
}
export interface GetPatchBaselineForPatchGroupRequest {
  PatchGroup: string;
  OperatingSystem?: OperatingSystem | undefined;
}
export interface GetPatchBaselineForPatchGroupResult {
  BaselineId?: string | undefined;
  PatchGroup?: string | undefined;
  OperatingSystem?: OperatingSystem | undefined;
}
export type ResourcePolicyMaxResults = number;
export interface GetResourcePoliciesRequest {
  ResourceArn: string;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type Policy = string;
export interface GetResourcePoliciesResponseEntry {
  PolicyId?: string | undefined;
  PolicyHash?: string | undefined;
  Policy?: string | undefined;
}
export type GetResourcePoliciesResponseEntries = GetResourcePoliciesResponseEntry[];
export interface GetResourcePoliciesResponse {
  NextToken?: string | undefined;
  Policies?: GetResourcePoliciesResponseEntry[] | undefined;
}
export type ServiceSettingId = string;
export interface GetServiceSettingRequest {
  SettingId: string;
}
export type ServiceSettingValue = string;
export interface ServiceSetting {
  SettingId?: string | undefined;
  SettingValue?: string | undefined;
  LastModifiedDate?: Date | undefined;
  LastModifiedUser?: string | undefined;
  ARN?: string | undefined;
  Status?: string | undefined;
}
export interface GetServiceSettingResult {
  ServiceSetting?: ServiceSetting | undefined;
}
export interface LabelParameterVersionRequest {
  Name: string;
  ParameterVersion?: number | undefined;
  Labels: string[];
}
export interface LabelParameterVersionResult {
  InvalidLabels?: string[] | undefined;
  ParameterVersion?: number | undefined;
}
export type AssociationFilterKey =
  | "InstanceId"
  | "Name"
  | "AssociationId"
  | "AssociationStatusName"
  | "LastExecutedBefore"
  | "LastExecutedAfter"
  | "AssociationName"
  | "ResourceGroupName"
  | "CloudConnectorId"
  | (string & {});
export type AssociationFilterValue = string;
export interface AssociationFilter {
  key: AssociationFilterKey;
  value: string;
}
export type AssociationFilterList = AssociationFilter[];
export interface ListAssociationsRequest {
  AssociationFilterList?: AssociationFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface Association {
  Name?: string | undefined;
  InstanceId?: string | undefined;
  AssociationId?: string | undefined;
  AssociationVersion?: string | undefined;
  DocumentVersion?: string | undefined;
  Targets?: Target[] | undefined;
  LastExecutionDate?: Date | undefined;
  Overview?: AssociationOverview | undefined;
  ScheduleExpression?: string | undefined;
  AssociationName?: string | undefined;
  ScheduleOffset?: number | undefined;
  Duration?: number | undefined;
  TargetMaps?: { [key: string]: string[] | undefined }[] | undefined;
}
export type AssociationList = Association[];
export interface ListAssociationsResult {
  Associations?: Association[] | undefined;
  NextToken?: string | undefined;
}
export interface ListAssociationVersionsRequest {
  AssociationId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface AssociationVersionInfo {
  AssociationId?: string | undefined;
  AssociationVersion?: string | undefined;
  CreatedDate?: Date | undefined;
  Name?: string | undefined;
  DocumentVersion?: string | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  Targets?: Target[] | undefined;
  ScheduleExpression?: string | undefined;
  OutputLocation?: InstanceAssociationOutputLocation | undefined;
  AssociationName?: string | undefined;
  MaxErrors?: string | undefined;
  MaxConcurrency?: string | undefined;
  ComplianceSeverity?: AssociationComplianceSeverity | undefined;
  SyncCompliance?: AssociationSyncCompliance | undefined;
  ApplyOnlyAtCronInterval?: boolean | undefined;
  CalendarNames?: string[] | undefined;
  TargetLocations?: TargetLocation[] | undefined;
  ScheduleOffset?: number | undefined;
  Duration?: number | undefined;
  TargetMaps?: { [key: string]: string[] | undefined }[] | undefined;
  AssociationDispatchAssumeRole?: string | undefined;
}
export type AssociationVersionList = AssociationVersionInfo[];
export interface ListAssociationVersionsResult {
  AssociationVersions?: AssociationVersionInfo[] | undefined;
  NextToken?: string | undefined;
}
export type CloudConnectorMaxResults = number;
export type CloudConnectorFilterKey = "SubscriptionId" | "TenantId" | (string & {});
export type CloudConnectorFilterValue = string;
export type CloudConnectorFilterValues = string[];
export interface CloudConnectorFilter {
  FilterKey?: CloudConnectorFilterKey | undefined;
  FilterValues?: string[] | undefined;
}
export type CloudConnectorFilterList = CloudConnectorFilter[];
export interface ListCloudConnectorsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: CloudConnectorFilter[] | undefined;
}
export interface CloudConnectorSummary {
  CloudConnectorId?: string | undefined;
  DisplayName?: string | undefined;
  Description?: string | undefined;
  RoleArn?: string | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export type CloudConnectorSummaryList = CloudConnectorSummary[];
export interface ListCloudConnectorsResult {
  CloudConnectors?: CloudConnectorSummary[] | undefined;
  NextToken?: string | undefined;
}
export type CommandMaxResults = number;
export type CommandFilterKey =
  | "InvokedAfter"
  | "InvokedBefore"
  | "Status"
  | "ExecutionStage"
  | "DocumentName"
  | (string & {});
export type CommandFilterValue = string;
export interface CommandFilter {
  key: CommandFilterKey;
  value: string;
}
export type CommandFilterList = CommandFilter[];
export interface ListCommandInvocationsRequest {
  CommandId?: string | undefined;
  InstanceId?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: CommandFilter[] | undefined;
  Details?: boolean | undefined;
}
export type InstanceTagName = string;
export type InvocationTraceOutput = string;
export type CommandPluginStatus =
  | "Pending"
  | "InProgress"
  | "Success"
  | "TimedOut"
  | "Cancelled"
  | "Failed"
  | (string & {});
export type CommandPluginOutput = string;
export interface CommandPlugin {
  Name?: string | undefined;
  Status?: CommandPluginStatus | undefined;
  StatusDetails?: string | undefined;
  ResponseCode?: number | undefined;
  ResponseStartDateTime?: Date | undefined;
  ResponseFinishDateTime?: Date | undefined;
  Output?: string | undefined;
  StandardOutputUrl?: string | undefined;
  StandardErrorUrl?: string | undefined;
  OutputS3Region?: string | undefined;
  OutputS3BucketName?: string | undefined;
  OutputS3KeyPrefix?: string | undefined;
}
export type CommandPluginList = CommandPlugin[];
export interface CommandInvocation {
  CommandId?: string | undefined;
  InstanceId?: string | undefined;
  InstanceName?: string | undefined;
  Comment?: string | undefined;
  DocumentName?: string | undefined;
  DocumentVersion?: string | undefined;
  RequestedDateTime?: Date | undefined;
  Status?: CommandInvocationStatus | undefined;
  StatusDetails?: string | undefined;
  TraceOutput?: string | undefined;
  StandardOutputUrl?: string | undefined;
  StandardErrorUrl?: string | undefined;
  CommandPlugins?: CommandPlugin[] | undefined;
  ServiceRole?: string | undefined;
  NotificationConfig?: NotificationConfig | undefined;
  CloudWatchOutputConfig?: CloudWatchOutputConfig | undefined;
}
export type CommandInvocationList = CommandInvocation[];
export interface ListCommandInvocationsResult {
  CommandInvocations?: CommandInvocation[] | undefined;
  NextToken?: string | undefined;
}
export interface ListCommandsRequest {
  CommandId?: string | undefined;
  InstanceId?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: CommandFilter[] | undefined;
}
export type CommandStatus =
  | "Pending"
  | "InProgress"
  | "Success"
  | "Cancelled"
  | "Failed"
  | "TimedOut"
  | "Cancelling"
  | (string & {});
export type TargetCount = number;
export type CompletedCount = number;
export type ErrorCount = number;
export type DeliveryTimedOutCount = number;
export interface Command {
  CommandId?: string | undefined;
  DocumentName?: string | undefined;
  DocumentVersion?: string | undefined;
  Comment?: string | undefined;
  ExpiresAfter?: Date | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  InstanceIds?: string[] | undefined;
  Targets?: Target[] | undefined;
  RequestedDateTime?: Date | undefined;
  Status?: CommandStatus | undefined;
  StatusDetails?: string | undefined;
  OutputS3Region?: string | undefined;
  OutputS3BucketName?: string | undefined;
  OutputS3KeyPrefix?: string | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  TargetCount?: number | undefined;
  CompletedCount?: number | undefined;
  ErrorCount?: number | undefined;
  DeliveryTimedOutCount?: number | undefined;
  ServiceRole?: string | undefined;
  NotificationConfig?: NotificationConfig | undefined;
  CloudWatchOutputConfig?: CloudWatchOutputConfig | undefined;
  TimeoutSeconds?: number | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
  TriggeredAlarms?: AlarmStateInformation[] | undefined;
}
export type CommandList = Command[];
export interface ListCommandsResult {
  Commands?: Command[] | undefined;
  NextToken?: string | undefined;
}
export type ComplianceStringFilterKey = string;
export type ComplianceFilterValue = string;
export type ComplianceStringFilterValueList = string[];
export type ComplianceQueryOperatorType =
  | "EQUAL"
  | "NOT_EQUAL"
  | "BEGIN_WITH"
  | "LESS_THAN"
  | "GREATER_THAN"
  | (string & {});
export interface ComplianceStringFilter {
  Key?: string | undefined;
  Values?: string[] | undefined;
  Type?: ComplianceQueryOperatorType | undefined;
}
export type ComplianceStringFilterList = ComplianceStringFilter[];
export type ComplianceResourceId = string;
export type ComplianceResourceIdList = string[];
export type ComplianceResourceType = string;
export type ComplianceResourceTypeList = string[];
export interface ListComplianceItemsRequest {
  Filters?: ComplianceStringFilter[] | undefined;
  ResourceIds?: string[] | undefined;
  ResourceTypes?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type ComplianceTypeName = string;
export type ComplianceItemId = string;
export type ComplianceItemTitle = string;
export type ComplianceStatus = "COMPLIANT" | "NON_COMPLIANT" | (string & {});
export type ComplianceSeverity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "INFORMATIONAL"
  | "UNSPECIFIED"
  | (string & {});
export type ComplianceExecutionId = string;
export type ComplianceExecutionType = string;
export interface ComplianceExecutionSummary {
  ExecutionTime: Date;
  ExecutionId?: string | undefined;
  ExecutionType?: string | undefined;
}
export type ComplianceItemDetails = { [key: string]: string | undefined };
export interface ComplianceItem {
  ComplianceType?: string | undefined;
  ResourceType?: string | undefined;
  ResourceId?: string | undefined;
  Id?: string | undefined;
  Title?: string | undefined;
  Status?: ComplianceStatus | undefined;
  Severity?: ComplianceSeverity | undefined;
  ExecutionSummary?: ComplianceExecutionSummary | undefined;
  Details?: { [key: string]: string | undefined } | undefined;
}
export type ComplianceItemList = ComplianceItem[];
export interface ListComplianceItemsResult {
  ComplianceItems?: ComplianceItem[] | undefined;
  NextToken?: string | undefined;
}
export interface ListComplianceSummariesRequest {
  Filters?: ComplianceStringFilter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type ComplianceSummaryCount = number;
export interface SeveritySummary {
  CriticalCount?: number | undefined;
  HighCount?: number | undefined;
  MediumCount?: number | undefined;
  LowCount?: number | undefined;
  InformationalCount?: number | undefined;
  UnspecifiedCount?: number | undefined;
}
export interface CompliantSummary {
  CompliantCount?: number | undefined;
  SeveritySummary?: SeveritySummary | undefined;
}
export interface NonCompliantSummary {
  NonCompliantCount?: number | undefined;
  SeveritySummary?: SeveritySummary | undefined;
}
export interface ComplianceSummaryItem {
  ComplianceType?: string | undefined;
  CompliantSummary?: CompliantSummary | undefined;
  NonCompliantSummary?: NonCompliantSummary | undefined;
}
export type ComplianceSummaryItemList = ComplianceSummaryItem[];
export interface ListComplianceSummariesResult {
  ComplianceSummaryItems?: ComplianceSummaryItem[] | undefined;
  NextToken?: string | undefined;
}
export type DocumentMetadataEnum = "DocumentReviews" | (string & {});
export interface ListDocumentMetadataHistoryRequest {
  Name: string;
  DocumentVersion?: string | undefined;
  Metadata: DocumentMetadataEnum;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type DocumentReviewCommentType = "Comment" | (string & {});
export type DocumentReviewComment = string;
export interface DocumentReviewCommentSource {
  Type?: DocumentReviewCommentType | undefined;
  Content?: string | undefined;
}
export type DocumentReviewCommentList = DocumentReviewCommentSource[];
export interface DocumentReviewerResponseSource {
  CreateTime?: Date | undefined;
  UpdatedTime?: Date | undefined;
  ReviewStatus?: ReviewStatus | undefined;
  Comment?: DocumentReviewCommentSource[] | undefined;
  Reviewer?: string | undefined;
}
export type DocumentReviewerResponseList = DocumentReviewerResponseSource[];
export interface DocumentMetadataResponseInfo {
  ReviewerResponse?: DocumentReviewerResponseSource[] | undefined;
}
export interface ListDocumentMetadataHistoryResponse {
  Name?: string | undefined;
  DocumentVersion?: string | undefined;
  Author?: string | undefined;
  Metadata?: DocumentMetadataResponseInfo | undefined;
  NextToken?: string | undefined;
}
export type DocumentFilterKey = "Name" | "Owner" | "PlatformTypes" | "DocumentType" | (string & {});
export type DocumentFilterValue = string;
export interface DocumentFilter {
  key: DocumentFilterKey;
  value: string;
}
export type DocumentFilterList = DocumentFilter[];
export type DocumentKeyValuesFilterKey = string;
export type DocumentKeyValuesFilterValue = string;
export type DocumentKeyValuesFilterValues = string[];
export interface DocumentKeyValuesFilter {
  Key?: string | undefined;
  Values?: string[] | undefined;
}
export type DocumentKeyValuesFilterList = DocumentKeyValuesFilter[];
export interface ListDocumentsRequest {
  DocumentFilterList?: DocumentFilter[] | undefined;
  Filters?: DocumentKeyValuesFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DocumentIdentifier {
  Name?: string | undefined;
  CreatedDate?: Date | undefined;
  DisplayName?: string | undefined;
  Owner?: string | undefined;
  VersionName?: string | undefined;
  PlatformTypes?: PlatformType[] | undefined;
  DocumentVersion?: string | undefined;
  DocumentType?: DocumentType | undefined;
  SchemaVersion?: string | undefined;
  DocumentFormat?: DocumentFormat | undefined;
  TargetType?: string | undefined;
  Tags?: Tag[] | undefined;
  Requires?: DocumentRequires[] | undefined;
  ReviewStatus?: ReviewStatus | undefined;
  Author?: string | undefined;
}
export type DocumentIdentifierList = DocumentIdentifier[];
export interface ListDocumentsResult {
  DocumentIdentifiers?: DocumentIdentifier[] | undefined;
  NextToken?: string | undefined;
}
export interface ListDocumentVersionsRequest {
  Name: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DocumentVersionInfo {
  Name?: string | undefined;
  DisplayName?: string | undefined;
  DocumentVersion?: string | undefined;
  VersionName?: string | undefined;
  CreatedDate?: Date | undefined;
  IsDefaultVersion?: boolean | undefined;
  DocumentFormat?: DocumentFormat | undefined;
  Status?: DocumentStatus | undefined;
  StatusInformation?: string | undefined;
  ReviewStatus?: ReviewStatus | undefined;
}
export type DocumentVersionList = DocumentVersionInfo[];
export interface ListDocumentVersionsResult {
  DocumentVersions?: DocumentVersionInfo[] | undefined;
  NextToken?: string | undefined;
}
export interface ListInventoryEntriesRequest {
  InstanceId: string;
  TypeName: string;
  Filters?: InventoryFilter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ListInventoryEntriesResult {
  TypeName?: string | undefined;
  InstanceId?: string | undefined;
  SchemaVersion?: string | undefined;
  CaptureTime?: string | undefined;
  Entries?: { [key: string]: string | undefined }[] | undefined;
  NextToken?: string | undefined;
}
export type NodeFilterKey =
  | "AgentType"
  | "AgentVersion"
  | "ComputerName"
  | "InstanceId"
  | "InstanceStatus"
  | "IpAddress"
  | "ManagedStatus"
  | "PlatformName"
  | "PlatformType"
  | "PlatformVersion"
  | "ResourceType"
  | "OrganizationalUnitId"
  | "OrganizationalUnitPath"
  | "Region"
  | "AccountId"
  | "SourceType"
  | "SourceId"
  | "SourceLocation"
  | "AvailabilityZone"
  | "AvailabilityZoneId"
  | (string & {});
export type NodeFilterValue = string;
export type NodeFilterValueList = string[];
export type NodeFilterOperatorType = "Equal" | "NotEqual" | "BeginWith" | (string & {});
export interface NodeFilter {
  Key: NodeFilterKey;
  Values: string[];
  Type?: NodeFilterOperatorType | undefined;
}
export type NodeFilterList = NodeFilter[];
export interface ListNodesRequest {
  SyncName?: string | undefined;
  Filters?: NodeFilter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type NodeCaptureTime = Date;
export type NodeId = string;
export type NodeAccountId = string;
export type NodeOrganizationalUnitId = string;
export type NodeOrganizationalUnitPath = string;
export interface NodeOwnerInfo {
  AccountId?: string | undefined;
  OrganizationalUnitId?: string | undefined;
  OrganizationalUnitPath?: string | undefined;
}
export type NodeRegion = string;
export type AgentType = string;
export type AgentVersion = string;
export type InstanceStatus = string;
export type ManagedStatus = "All" | "Managed" | "Unmanaged" | (string & {});
export type NodeName = string;
export type AvailabilityZoneId = string;
export interface InstanceInfo {
  AgentType?: string | undefined;
  AgentVersion?: string | undefined;
  ComputerName?: string | undefined;
  InstanceStatus?: string | undefined;
  IpAddress?: string | redacted.Redacted<string> | undefined;
  ManagedStatus?: ManagedStatus | undefined;
  Name?: string | undefined;
  PlatformType?: PlatformType | undefined;
  PlatformName?: string | undefined;
  PlatformVersion?: string | undefined;
  ResourceType?: ResourceType | undefined;
  SourceType?: SourceType | undefined;
  SourceId?: string | undefined;
  SourceLocation?: string | undefined;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
}
export type NodeType = { Instance: InstanceInfo };
export interface Node {
  CaptureTime?: Date | undefined;
  Id?: string | undefined;
  Owner?: NodeOwnerInfo | undefined;
  Region?: string | undefined;
  NodeType?: NodeType | undefined;
}
export type NodeList = Node[];
export interface ListNodesResult {
  Nodes?: Node[] | undefined;
  NextToken?: string | undefined;
}
export type NodeAggregatorType = "Count" | (string & {});
export type NodeTypeName = "Instance" | (string & {});
export type NodeAttributeName =
  | "AgentVersion"
  | "PlatformName"
  | "PlatformType"
  | "PlatformVersion"
  | "Region"
  | "ResourceType"
  | "SourceType"
  | "AvailabilityZone"
  | (string & {});
export interface NodeAggregator {
  AggregatorType: NodeAggregatorType;
  TypeName: NodeTypeName;
  AttributeName: NodeAttributeName;
  Aggregators?: NodeAggregator[] | undefined;
}
export type NodeAggregatorList = NodeAggregator[];
export interface ListNodesSummaryRequest {
  SyncName?: string | undefined;
  Filters?: NodeFilter[] | undefined;
  Aggregators: NodeAggregator[];
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type NodeSummary = { [key: string]: string | undefined };
export type NodeSummaryList = { [key: string]: string | undefined }[];
export interface ListNodesSummaryResult {
  Summary?: { [key: string]: string | undefined }[] | undefined;
  NextToken?: string | undefined;
}
export type OpsItemEventFilterKey = "OpsItemId" | (string & {});
export type OpsItemEventFilterValue = string;
export type OpsItemEventFilterValues = string[];
export type OpsItemEventFilterOperator = "Equal" | (string & {});
export interface OpsItemEventFilter {
  Key: OpsItemEventFilterKey;
  Values: string[];
  Operator: OpsItemEventFilterOperator;
}
export type OpsItemEventFilters = OpsItemEventFilter[];
export type OpsItemEventMaxResults = number;
export interface ListOpsItemEventsRequest {
  Filters?: OpsItemEventFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface OpsItemIdentity {
  Arn?: string | undefined;
}
export interface OpsItemEventSummary {
  OpsItemId?: string | undefined;
  EventId?: string | undefined;
  Source?: string | undefined;
  DetailType?: string | undefined;
  Detail?: string | undefined;
  CreatedBy?: OpsItemIdentity | undefined;
  CreatedTime?: Date | undefined;
}
export type OpsItemEventSummaries = OpsItemEventSummary[];
export interface ListOpsItemEventsResponse {
  NextToken?: string | undefined;
  Summaries?: OpsItemEventSummary[] | undefined;
}
export type OpsItemRelatedItemsFilterKey =
  | "ResourceType"
  | "AssociationId"
  | "ResourceUri"
  | (string & {});
export type OpsItemRelatedItemsFilterValue = string;
export type OpsItemRelatedItemsFilterValues = string[];
export type OpsItemRelatedItemsFilterOperator = "Equal" | (string & {});
export interface OpsItemRelatedItemsFilter {
  Key: OpsItemRelatedItemsFilterKey;
  Values: string[];
  Operator: OpsItemRelatedItemsFilterOperator;
}
export type OpsItemRelatedItemsFilters = OpsItemRelatedItemsFilter[];
export type OpsItemRelatedItemsMaxResults = number;
export interface ListOpsItemRelatedItemsRequest {
  OpsItemId?: string | undefined;
  Filters?: OpsItemRelatedItemsFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface OpsItemRelatedItemSummary {
  OpsItemId?: string | undefined;
  AssociationId?: string | undefined;
  ResourceType?: string | undefined;
  AssociationType?: string | undefined;
  ResourceUri?: string | undefined;
  CreatedBy?: OpsItemIdentity | undefined;
  CreatedTime?: Date | undefined;
  LastModifiedBy?: OpsItemIdentity | undefined;
  LastModifiedTime?: Date | undefined;
}
export type OpsItemRelatedItemSummaries = OpsItemRelatedItemSummary[];
export interface ListOpsItemRelatedItemsResponse {
  NextToken?: string | undefined;
  Summaries?: OpsItemRelatedItemSummary[] | undefined;
}
export type OpsMetadataFilterKey = string;
export type OpsMetadataFilterValue = string;
export type OpsMetadataFilterValueList = string[];
export interface OpsMetadataFilter {
  Key: string;
  Values: string[];
}
export type OpsMetadataFilterList = OpsMetadataFilter[];
export type ListOpsMetadataMaxResults = number;
export interface ListOpsMetadataRequest {
  Filters?: OpsMetadataFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface OpsMetadata {
  ResourceId?: string | undefined;
  OpsMetadataArn?: string | undefined;
  LastModifiedDate?: Date | undefined;
  LastModifiedUser?: string | undefined;
  CreationDate?: Date | undefined;
}
export type OpsMetadataList = OpsMetadata[];
export interface ListOpsMetadataResult {
  OpsMetadataList?: OpsMetadata[] | undefined;
  NextToken?: string | undefined;
}
export interface ListResourceComplianceSummariesRequest {
  Filters?: ComplianceStringFilter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ResourceComplianceSummaryItem {
  ComplianceType?: string | undefined;
  ResourceType?: string | undefined;
  ResourceId?: string | undefined;
  Status?: ComplianceStatus | undefined;
  OverallSeverity?: ComplianceSeverity | undefined;
  ExecutionSummary?: ComplianceExecutionSummary | undefined;
  CompliantSummary?: CompliantSummary | undefined;
  NonCompliantSummary?: NonCompliantSummary | undefined;
}
export type ResourceComplianceSummaryItemList = ResourceComplianceSummaryItem[];
export interface ListResourceComplianceSummariesResult {
  ResourceComplianceSummaryItems?: ResourceComplianceSummaryItem[] | undefined;
  NextToken?: string | undefined;
}
export interface ListResourceDataSyncRequest {
  SyncType?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type ResourceDataSyncState = string;
export interface ResourceDataSyncSourceWithState {
  SourceType?: string | undefined;
  AwsOrganizationsSource?: ResourceDataSyncAwsOrganizationsSource | undefined;
  SourceRegions?: string[] | undefined;
  IncludeFutureRegions?: boolean | undefined;
  State?: string | undefined;
  EnableAllOpsDataSources?: boolean | undefined;
}
export type LastResourceDataSyncTime = Date;
export type LastSuccessfulResourceDataSyncTime = Date;
export type ResourceDataSyncLastModifiedTime = Date;
export type LastResourceDataSyncStatus = "Successful" | "Failed" | "InProgress" | (string & {});
export type ResourceDataSyncCreatedTime = Date;
export type LastResourceDataSyncMessage = string;
export interface ResourceDataSyncItem {
  SyncName?: string | undefined;
  SyncType?: string | undefined;
  SyncSource?: ResourceDataSyncSourceWithState | undefined;
  S3Destination?: ResourceDataSyncS3Destination | undefined;
  LastSyncTime?: Date | undefined;
  LastSuccessfulSyncTime?: Date | undefined;
  SyncLastModifiedTime?: Date | undefined;
  LastStatus?: LastResourceDataSyncStatus | undefined;
  SyncCreatedTime?: Date | undefined;
  LastSyncStatusMessage?: string | undefined;
}
export type ResourceDataSyncItemList = ResourceDataSyncItem[];
export interface ListResourceDataSyncResult {
  ResourceDataSyncItems?: ResourceDataSyncItem[] | undefined;
  NextToken?: string | undefined;
}
export interface ListTagsForResourceRequest {
  ResourceType: ResourceTypeForTagging;
  ResourceId: string;
}
export interface ListTagsForResourceResult {
  TagList?: Tag[] | undefined;
}
export interface ModifyDocumentPermissionRequest {
  Name: string;
  PermissionType: DocumentPermissionType;
  AccountIdsToAdd?: string[] | undefined;
  AccountIdsToRemove?: string[] | undefined;
  SharedDocumentVersion?: string | undefined;
}
export interface ModifyDocumentPermissionResponse {}
export interface ComplianceItemEntry {
  Id?: string | undefined;
  Title?: string | undefined;
  Severity: ComplianceSeverity;
  Status: ComplianceStatus;
  Details?: { [key: string]: string | undefined } | undefined;
}
export type ComplianceItemEntryList = ComplianceItemEntry[];
export type ComplianceItemContentHash = string;
export type ComplianceUploadType = "COMPLETE" | "PARTIAL" | (string & {});
export interface PutComplianceItemsRequest {
  ResourceId: string;
  ResourceType: string;
  ComplianceType: string;
  ExecutionSummary: ComplianceExecutionSummary;
  Items: ComplianceItemEntry[];
  ItemContentHash?: string | undefined;
  UploadType?: ComplianceUploadType | undefined;
}
export interface PutComplianceItemsResult {}
export type InventoryItemContentContext = { [key: string]: string | undefined };
export interface InventoryItem {
  TypeName: string;
  SchemaVersion: string;
  CaptureTime: string;
  ContentHash?: string | undefined;
  Content?: { [key: string]: string | undefined }[] | undefined;
  Context?: { [key: string]: string | undefined } | undefined;
}
export type InventoryItemList = InventoryItem[];
export interface PutInventoryRequest {
  InstanceId: string;
  Items: InventoryItem[];
}
export type PutInventoryMessage = string;
export interface PutInventoryResult {
  Message?: string | undefined;
}
export type ParameterPolicies = string;
export interface PutParameterRequest {
  Name: string;
  Description?: string | undefined;
  Value: string | redacted.Redacted<string>;
  Type?: ParameterType | undefined;
  KeyId?: string | undefined;
  Overwrite?: boolean | undefined;
  AllowedPattern?: string | undefined;
  Tags?: Tag[] | undefined;
  Tier?: ParameterTier | undefined;
  Policies?: string | undefined;
  DataType?: string | undefined;
}
export interface PutParameterResult {
  Version?: number | undefined;
  Tier?: ParameterTier | undefined;
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
  PolicyId?: string | undefined;
  PolicyHash?: string | undefined;
}
export interface PutResourcePolicyResponse {
  PolicyId?: string | undefined;
  PolicyHash?: string | undefined;
}
export type DHMCPermissionModel = "SERVICE_MANAGED" | "SELF_MANAGED" | (string & {});
export type DHMCRoleArn = string;
export interface RegisterDefaultHostManagementConfigurationRequest {
  PermissionModel: DHMCPermissionModel;
  RoleArn?: string | undefined;
  Overwrite?: boolean | undefined;
}
export interface RegisterDefaultHostManagementConfigurationResult {
  RoleArn?: string | undefined;
}
export interface RegisterDefaultPatchBaselineRequest {
  BaselineId: string;
}
export interface RegisterDefaultPatchBaselineResult {
  BaselineId?: string | undefined;
}
export interface RegisterPatchBaselineForPatchGroupRequest {
  BaselineId: string;
  PatchGroup: string;
}
export interface RegisterPatchBaselineForPatchGroupResult {
  BaselineId?: string | undefined;
  PatchGroup?: string | undefined;
}
export interface RegisterTargetWithMaintenanceWindowRequest {
  WindowId: string;
  ResourceType: MaintenanceWindowResourceType;
  Targets: Target[];
  OwnerInformation?: string | redacted.Redacted<string> | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
  ClientToken?: string | undefined;
}
export interface RegisterTargetWithMaintenanceWindowResult {
  WindowTargetId?: string | undefined;
}
export interface RegisterTaskWithMaintenanceWindowRequest {
  WindowId: string;
  Targets?: Target[] | undefined;
  TaskArn: string;
  ServiceRoleArn?: string | undefined;
  TaskType: MaintenanceWindowTaskType;
  TaskParameters?:
    | { [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined }
    | undefined;
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters | undefined;
  Priority?: number | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  LoggingInfo?: LoggingInfo | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
  ClientToken?: string | undefined;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
}
export interface RegisterTaskWithMaintenanceWindowResult {
  WindowTaskId?: string | undefined;
}
export type KeyList = string[];
export interface RemoveTagsFromResourceRequest {
  ResourceType: ResourceTypeForTagging;
  ResourceId: string;
  TagKeys: string[];
}
export interface RemoveTagsFromResourceResult {}
export interface ResetServiceSettingRequest {
  SettingId: string;
}
export interface ResetServiceSettingResult {
  ServiceSetting?: ServiceSetting | undefined;
}
export interface ResumeSessionRequest {
  SessionId: string;
}
export type TokenValue = string;
export type StreamUrl = string;
export interface ResumeSessionResponse {
  SessionId?: string | undefined;
  TokenValue?: string | undefined;
  StreamUrl?: string | undefined;
}
export type SignalType =
  | "Approve"
  | "Reject"
  | "StartStep"
  | "StopStep"
  | "Resume"
  | "Revoke"
  | (string & {});
export interface SendAutomationSignalRequest {
  AutomationExecutionId: string;
  SignalType: SignalType;
  Payload?: { [key: string]: string[] | undefined } | undefined;
}
export interface SendAutomationSignalResult {}
export interface SendCommandRequest {
  InstanceIds?: string[] | undefined;
  Targets?: Target[] | undefined;
  DocumentName: string;
  DocumentVersion?: string | undefined;
  DocumentHash?: string | undefined;
  DocumentHashType?: DocumentHashType | undefined;
  TimeoutSeconds?: number | undefined;
  Comment?: string | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  OutputS3Region?: string | undefined;
  OutputS3BucketName?: string | undefined;
  OutputS3KeyPrefix?: string | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  ServiceRoleArn?: string | undefined;
  NotificationConfig?: NotificationConfig | undefined;
  CloudWatchOutputConfig?: CloudWatchOutputConfig | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
}
export interface SendCommandResult {
  Command?: Command | undefined;
}
export type String1to256 = string;
export interface StartAccessRequestRequest {
  Reason: string;
  Targets: Target[];
  Tags?: Tag[] | undefined;
}
export interface StartAccessRequestResponse {
  AccessRequestId?: string | undefined;
}
export type AssociationIdList = string[];
export interface StartAssociationsOnceRequest {
  AssociationIds: string[];
}
export interface StartAssociationsOnceResult {}
export type IdempotencyToken = string;
export interface StartAutomationExecutionRequest {
  DocumentName: string;
  DocumentVersion?: string | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  ClientToken?: string | undefined;
  Mode?: ExecutionMode | undefined;
  TargetParameterName?: string | undefined;
  Targets?: Target[] | undefined;
  TargetMaps?: { [key: string]: string[] | undefined }[] | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  TargetLocations?: TargetLocation[] | undefined;
  Tags?: Tag[] | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
  TargetLocationsURL?: string | undefined;
}
export interface StartAutomationExecutionResult {
  AutomationExecutionId?: string | undefined;
}
export type ChangeDetailsValue = string;
export interface StartChangeRequestExecutionRequest {
  ScheduledTime?: Date | undefined;
  DocumentName: string;
  DocumentVersion?: string | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  ChangeRequestName?: string | undefined;
  ClientToken?: string | undefined;
  AutoApprove?: boolean | undefined;
  Runbooks: Runbook[];
  Tags?: Tag[] | undefined;
  ScheduledEndTime?: Date | undefined;
  ChangeDetails?: string | undefined;
}
export interface StartChangeRequestExecutionResult {
  AutomationExecutionId?: string | undefined;
}
export interface AutomationExecutionInputs {
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  TargetParameterName?: string | undefined;
  Targets?: Target[] | undefined;
  TargetMaps?: { [key: string]: string[] | undefined }[] | undefined;
  TargetLocations?: TargetLocation[] | undefined;
  TargetLocationsURL?: string | undefined;
}
export type ExecutionInputs = { Automation: AutomationExecutionInputs };
export interface StartExecutionPreviewRequest {
  DocumentName: string;
  DocumentVersion?: string | undefined;
  ExecutionInputs?: ExecutionInputs | undefined;
}
export interface StartExecutionPreviewResponse {
  ExecutionPreviewId?: string | undefined;
}
export type SessionManagerParameterName = string;
export type SessionManagerParameterValue = string;
export type SessionManagerParameterValueList = string[];
export type SessionManagerParameters = { [key: string]: string[] | undefined };
export interface StartSessionRequest {
  Target: string;
  DocumentName?: string | undefined;
  Reason?: string | undefined;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
}
export interface StartSessionResponse {
  SessionId?: string | undefined;
  TokenValue?: string | undefined;
  StreamUrl?: string | undefined;
}
export type StopType = "Complete" | "Cancel" | (string & {});
export interface StopAutomationExecutionRequest {
  AutomationExecutionId: string;
  Type?: StopType | undefined;
}
export interface StopAutomationExecutionResult {}
export interface TerminateSessionRequest {
  SessionId: string;
}
export interface TerminateSessionResponse {
  SessionId?: string | undefined;
}
export interface UnlabelParameterVersionRequest {
  Name: string;
  ParameterVersion: number;
  Labels: string[];
}
export interface UnlabelParameterVersionResult {
  RemovedLabels?: string[] | undefined;
  InvalidLabels?: string[] | undefined;
}
export interface UpdateAssociationRequest {
  AssociationId: string;
  Parameters?: { [key: string]: string[] | undefined } | undefined;
  DocumentVersion?: string | undefined;
  ScheduleExpression?: string | undefined;
  OutputLocation?: InstanceAssociationOutputLocation | undefined;
  Name?: string | undefined;
  Targets?: Target[] | undefined;
  AssociationName?: string | undefined;
  AssociationVersion?: string | undefined;
  AutomationTargetParameterName?: string | undefined;
  MaxErrors?: string | undefined;
  MaxConcurrency?: string | undefined;
  ComplianceSeverity?: AssociationComplianceSeverity | undefined;
  SyncCompliance?: AssociationSyncCompliance | undefined;
  ApplyOnlyAtCronInterval?: boolean | undefined;
  CalendarNames?: string[] | undefined;
  TargetLocations?: TargetLocation[] | undefined;
  ScheduleOffset?: number | undefined;
  Duration?: number | undefined;
  TargetMaps?: { [key: string]: string[] | undefined }[] | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
  AssociationDispatchAssumeRole?: string | undefined;
}
export interface UpdateAssociationResult {
  AssociationDescription?: AssociationDescription | undefined;
}
export interface UpdateAssociationStatusRequest {
  Name: string;
  InstanceId: string;
  AssociationStatus: AssociationStatus;
}
export interface UpdateAssociationStatusResult {
  AssociationDescription?: AssociationDescription | undefined;
}
export interface UpdateCloudConnectorRequest {
  CloudConnectorId: string;
  DisplayName?: string | undefined;
  Configuration?: CloudConnectorConfiguration | undefined;
  Description?: string | undefined;
}
export interface UpdateCloudConnectorResult {
  CloudConnectorId?: string | undefined;
}
export interface UpdateDocumentRequest {
  Content: string;
  Attachments?: AttachmentsSource[] | undefined;
  Name: string;
  DisplayName?: string | undefined;
  VersionName?: string | undefined;
  DocumentVersion?: string | undefined;
  DocumentFormat?: DocumentFormat | undefined;
  TargetType?: string | undefined;
}
export interface UpdateDocumentResult {
  DocumentDescription?: DocumentDescription | undefined;
}
export type DocumentVersionNumber = string;
export interface UpdateDocumentDefaultVersionRequest {
  Name: string;
  DocumentVersion: string;
}
export interface DocumentDefaultVersionDescription {
  Name?: string | undefined;
  DefaultVersion?: string | undefined;
  DefaultVersionName?: string | undefined;
}
export interface UpdateDocumentDefaultVersionResult {
  Description?: DocumentDefaultVersionDescription | undefined;
}
export type DocumentReviewAction =
  | "SendForReview"
  | "UpdateReview"
  | "Approve"
  | "Reject"
  | (string & {});
export interface DocumentReviews {
  Action: DocumentReviewAction;
  Comment?: DocumentReviewCommentSource[] | undefined;
}
export interface UpdateDocumentMetadataRequest {
  Name: string;
  DocumentVersion?: string | undefined;
  DocumentReviews: DocumentReviews;
}
export interface UpdateDocumentMetadataResponse {}
export interface UpdateMaintenanceWindowRequest {
  WindowId: string;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
  StartDate?: string | undefined;
  EndDate?: string | undefined;
  Schedule?: string | undefined;
  ScheduleTimezone?: string | undefined;
  ScheduleOffset?: number | undefined;
  Duration?: number | undefined;
  Cutoff?: number | undefined;
  AllowUnassociatedTargets?: boolean | undefined;
  Enabled?: boolean | undefined;
  Replace?: boolean | undefined;
}
export interface UpdateMaintenanceWindowResult {
  WindowId?: string | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
  StartDate?: string | undefined;
  EndDate?: string | undefined;
  Schedule?: string | undefined;
  ScheduleTimezone?: string | undefined;
  ScheduleOffset?: number | undefined;
  Duration?: number | undefined;
  Cutoff?: number | undefined;
  AllowUnassociatedTargets?: boolean | undefined;
  Enabled?: boolean | undefined;
}
export interface UpdateMaintenanceWindowTargetRequest {
  WindowId: string;
  WindowTargetId: string;
  Targets?: Target[] | undefined;
  OwnerInformation?: string | redacted.Redacted<string> | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
  Replace?: boolean | undefined;
}
export interface UpdateMaintenanceWindowTargetResult {
  WindowId?: string | undefined;
  WindowTargetId?: string | undefined;
  Targets?: Target[] | undefined;
  OwnerInformation?: string | redacted.Redacted<string> | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
}
export interface UpdateMaintenanceWindowTaskRequest {
  WindowId: string;
  WindowTaskId: string;
  Targets?: Target[] | undefined;
  TaskArn?: string | undefined;
  ServiceRoleArn?: string | undefined;
  TaskParameters?:
    | { [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined }
    | undefined;
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters | undefined;
  Priority?: number | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  LoggingInfo?: LoggingInfo | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
  Replace?: boolean | undefined;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
}
export interface UpdateMaintenanceWindowTaskResult {
  WindowId?: string | undefined;
  WindowTaskId?: string | undefined;
  Targets?: Target[] | undefined;
  TaskArn?: string | undefined;
  ServiceRoleArn?: string | undefined;
  TaskParameters?:
    | { [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined }
    | undefined;
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters | undefined;
  Priority?: number | undefined;
  MaxConcurrency?: string | undefined;
  MaxErrors?: string | undefined;
  LoggingInfo?: LoggingInfo | undefined;
  Name?: string | undefined;
  Description?: string | redacted.Redacted<string> | undefined;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior | undefined;
  AlarmConfiguration?: AlarmConfiguration | undefined;
}
export interface UpdateManagedInstanceRoleRequest {
  InstanceId: string;
  IamRole: string;
}
export interface UpdateManagedInstanceRoleResult {}
export type OpsItemOpsDataKeysList = string[];
export interface UpdateOpsItemRequest {
  Description?: string | undefined;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined } | undefined;
  OperationalDataToDelete?: string[] | undefined;
  Notifications?: OpsItemNotification[] | undefined;
  Priority?: number | undefined;
  RelatedOpsItems?: RelatedOpsItem[] | undefined;
  Status?: OpsItemStatus | undefined;
  OpsItemId: string;
  Title?: string | undefined;
  Category?: string | undefined;
  Severity?: string | undefined;
  ActualStartTime?: Date | undefined;
  ActualEndTime?: Date | undefined;
  PlannedStartTime?: Date | undefined;
  PlannedEndTime?: Date | undefined;
  OpsItemArn?: string | undefined;
}
export interface UpdateOpsItemResponse {}
export type MetadataKeysToDeleteList = string[];
export interface UpdateOpsMetadataRequest {
  OpsMetadataArn: string;
  MetadataToUpdate?: { [key: string]: MetadataValue | undefined } | undefined;
  KeysToDelete?: string[] | undefined;
}
export interface UpdateOpsMetadataResult {
  OpsMetadataArn?: string | undefined;
}
export interface UpdatePatchBaselineRequest {
  BaselineId: string;
  Name?: string | undefined;
  GlobalFilters?: PatchFilterGroup | undefined;
  ApprovalRules?: PatchRuleGroup | undefined;
  ApprovedPatches?: string[] | undefined;
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel | undefined;
  ApprovedPatchesEnableNonSecurity?: boolean | undefined;
  RejectedPatches?: string[] | undefined;
  RejectedPatchesAction?: PatchAction | undefined;
  Description?: string | undefined;
  Sources?: PatchSource[] | undefined;
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus | undefined;
  Replace?: boolean | undefined;
}
export interface UpdatePatchBaselineResult {
  BaselineId?: string | undefined;
  Name?: string | undefined;
  OperatingSystem?: OperatingSystem | undefined;
  GlobalFilters?: PatchFilterGroup | undefined;
  ApprovalRules?: PatchRuleGroup | undefined;
  ApprovedPatches?: string[] | undefined;
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel | undefined;
  ApprovedPatchesEnableNonSecurity?: boolean | undefined;
  RejectedPatches?: string[] | undefined;
  RejectedPatchesAction?: PatchAction | undefined;
  CreatedDate?: Date | undefined;
  ModifiedDate?: Date | undefined;
  Description?: string | undefined;
  Sources?: PatchSource[] | undefined;
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus | undefined;
}
export interface UpdateResourceDataSyncRequest {
  SyncName: string;
  SyncType: string;
  SyncSource: ResourceDataSyncSource;
}
export interface UpdateResourceDataSyncResult {}
export interface UpdateServiceSettingRequest {
  SettingId: string;
  SettingValue: string;
}
export interface UpdateServiceSettingResult {}
export type ValidateCloudConnectorMaxResults = number;
export interface ValidateCloudConnectorRequest {
  CloudConnectorId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type ValidationFindingType = "INFO" | "WARN" | "ERROR" | (string & {});
export type ValidationFindingCode =
  | "TargetInaccessible"
  | "TargetUnusable"
  | "TargetStateWarning"
  | "AwsRoleAssumptionFailed"
  | "WebIdentityTokenFailed"
  | "OutboundWebIdentityFederationDisabled"
  | "ProviderCredentialCreationFailed"
  | "TenantSummary"
  | "SubscriptionAccessible"
  | (string & {});
export type ValidationFindingScopeType = "azure:tenant" | "azure:subscription" | (string & {});
export interface ValidationFindingScope {
  Type?: ValidationFindingScopeType | undefined;
  Id?: string | undefined;
}
export interface ValidationFinding {
  Type?: ValidationFindingType | undefined;
  Code?: ValidationFindingCode | undefined;
  Message?: string | undefined;
  ProviderMessage?: string | undefined;
  Scope?: ValidationFindingScope | undefined;
}
export type ValidationFindingList = ValidationFinding[];
export interface ValidateCloudConnectorResult {
  ValidationFindings?: ValidationFinding[] | undefined;
  NextToken?: string | undefined;
}
export type OpsItemParameterNamesList = string[];
export type ResourcePolicyParameterNamesList = string[];
export type AddTagsToResourceError =
  | InternalServerError
  | InvalidResourceId
  | InvalidResourceType
  | TooManyTagsError
  | TooManyUpdates
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for the specified resource. *Tags*
 * are metadata that you can assign to your automations, documents, managed nodes, maintenance
 * windows, Parameter Store parameters, and patch baselines. Tags enable you to categorize your
 * resources in different ways, for example, by purpose, owner, or environment. Each tag consists of
 * a key and an optional value, both of which you define. For example, you could define a set of
 * tags for your account's managed nodes that helps you track each node's owner and stack level. For
 * example:
 *
 * - `Key=Owner,Value=DbAdmin`
 *
 * - `Key=Owner,Value=SysAdmin`
 *
 * - `Key=Owner,Value=Dev`
 *
 * - `Key=Stack,Value=Production`
 *
 * - `Key=Stack,Value=Pre-Production`
 *
 * - `Key=Stack,Value=Test`
 *
 * Most resources can have a maximum of 50 tags. Automations can have a maximum of 5
 * tags.
 *
 * We recommend that you devise a set of tag keys that meets your needs for each resource type.
 * Using a consistent set of tag keys makes it easier for you to manage your resources. You can
 * search and filter the resources based on the tags you add. Tags don't have any semantic meaning
 * to and are interpreted strictly as a string of characters.
 *
 * For more information about using tags with Amazon Elastic Compute Cloud (Amazon EC2) instances, see Tag your Amazon EC2
 * resources in the *Amazon EC2 User Guide*.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceRequest & RegionInput,
  AddTagsToResourceResult,
  AddTagsToResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AddTagsToResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<AddTagsToResourceResult>,
  errors: [
    InternalServerError,
    InvalidResourceId,
    InvalidResourceType,
    TooManyTagsError,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
  telemetry: TELEMETRY,
  span: "AddTagsToResource",
}));

export type AssociateOpsItemRelatedItemError =
  | InternalServerError
  | OpsItemConflictException
  | OpsItemInvalidParameterException
  | OpsItemLimitExceededException
  | OpsItemNotFoundException
  | OpsItemRelatedItemAlreadyExistsException
  | CommonErrors;
/**
 * Associates a related item to a Systems Manager OpsCenter OpsItem. For example, you can associate an
 * Incident Manager incident or analysis with an OpsItem. Incident Manager and OpsCenter are tools in
 * Amazon Web Services Systems Manager.
 */
export const associateOpsItemRelatedItem: API.OperationMethod<
  AssociateOpsItemRelatedItemRequest & RegionInput,
  AssociateOpsItemRelatedItemResponse,
  AssociateOpsItemRelatedItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<AssociateOpsItemRelatedItemRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<AssociateOpsItemRelatedItemResponse>,
  errors: [
    InternalServerError,
    OpsItemConflictException,
    OpsItemInvalidParameterException,
    OpsItemLimitExceededException,
    OpsItemNotFoundException,
    OpsItemRelatedItemAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateOpsItemRelatedItem",
  telemetry: TELEMETRY,
  span: "AssociateOpsItemRelatedItem",
}));

export type CancelCommandError =
  | DuplicateInstanceId
  | InternalServerError
  | InvalidCommandId
  | InvalidInstanceId
  | CommonErrors;
/**
 * Attempts to cancel the command specified by the Command ID. There is no guarantee that the
 * command will be terminated and the underlying process stopped.
 */
export const cancelCommand: API.OperationMethod<
  CancelCommandRequest & RegionInput,
  CancelCommandResult,
  CancelCommandError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<CancelCommandRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CancelCommandResult>,
  errors: [DuplicateInstanceId, InternalServerError, InvalidCommandId, InvalidInstanceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCommand",
  telemetry: TELEMETRY,
  span: "CancelCommand",
}));

export type CancelMaintenanceWindowExecutionError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Stops a maintenance window execution that is already in progress and cancels any tasks in
 * the window that haven't already starting running. Tasks already in progress will continue to
 * completion.
 */
export const cancelMaintenanceWindowExecution: API.OperationMethod<
  CancelMaintenanceWindowExecutionRequest & RegionInput,
  CancelMaintenanceWindowExecutionResult,
  CancelMaintenanceWindowExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CancelMaintenanceWindowExecutionRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<CancelMaintenanceWindowExecutionResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMaintenanceWindowExecution",
  telemetry: TELEMETRY,
  span: "CancelMaintenanceWindowExecution",
}));

export type CreateActivationError = InternalServerError | InvalidParameters | CommonErrors;
/**
 * Generates an activation code and activation ID you can use to register your on-premises
 * servers, edge devices, or virtual machine (VM) with Amazon Web Services Systems Manager. Registering these machines with
 * Systems Manager makes it possible to manage them using Systems Manager tools. You use the activation code and ID when
 * installing SSM Agent on machines in your hybrid environment. For more information about
 * requirements for managing on-premises machines using Systems Manager, see Using Amazon Web Services Systems Manager in
 * hybrid and multicloud environments in the *Amazon Web Services Systems Manager User Guide*.
 *
 * Amazon Elastic Compute Cloud (Amazon EC2) instances, edge devices, and on-premises servers and VMs that are
 * configured for Systems Manager are all called *managed nodes*.
 */
export const createActivation: API.OperationMethod<
  CreateActivationRequest & RegionInput,
  CreateActivationResult,
  CreateActivationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<CreateActivationRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<CreateActivationResult>,
  errors: [InternalServerError, InvalidParameters],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateActivation",
  telemetry: TELEMETRY,
  span: "CreateActivation",
}));

export type CreateAssociationError =
  | AssociationAlreadyExists
  | AssociationLimitExceeded
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | InvalidInstanceId
  | InvalidOutputLocation
  | InvalidParameters
  | InvalidSchedule
  | InvalidTag
  | InvalidTarget
  | InvalidTargetMaps
  | UnsupportedPlatformType
  | CommonErrors;
/**
 * A State Manager association defines the state that you want to maintain on your managed
 * nodes. For example, an association can specify that anti-virus software must be installed and
 * running on your managed nodes, or that certain ports must be closed. For static targets, the
 * association specifies a schedule for when the configuration is reapplied. For dynamic targets,
 * such as an Amazon Web Services resource group or an Amazon Web Services autoscaling group, State Manager, a tool in Amazon Web Services Systems Manager
 * applies the configuration when new managed nodes are added to the group. The association also
 * specifies actions to take when applying the configuration. For example, an association for
 * anti-virus software might run once a day. If the software isn't installed, then State Manager
 * installs it. If the software is installed, but the service isn't running, then the association
 * might instruct State Manager to start the service.
 */
export const createAssociation: API.OperationMethod<
  CreateAssociationRequest & RegionInput,
  CreateAssociationResult,
  CreateAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<CreateAssociationRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<CreateAssociationResult>,
  errors: [
    AssociationAlreadyExists,
    AssociationLimitExceeded,
    InternalServerError,
    InvalidDocument,
    InvalidDocumentVersion,
    InvalidInstanceId,
    InvalidOutputLocation,
    InvalidParameters,
    InvalidSchedule,
    InvalidTag,
    InvalidTarget,
    InvalidTargetMaps,
    UnsupportedPlatformType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssociation",
  telemetry: TELEMETRY,
  span: "CreateAssociation",
}));

export type CreateAssociationBatchError =
  | AssociationLimitExceeded
  | DuplicateInstanceId
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | InvalidInstanceId
  | InvalidOutputLocation
  | InvalidParameters
  | InvalidSchedule
  | InvalidTarget
  | InvalidTargetMaps
  | UnsupportedPlatformType
  | CommonErrors;
/**
 * Associates the specified Amazon Web Services Systems Manager document (SSM document) with the specified managed nodes
 * or targets.
 *
 * When you associate a document with one or more managed nodes using IDs or tags, Amazon Web Services Systems Manager
 * Agent (SSM Agent) running on the managed node processes the document and configures the node as
 * specified.
 *
 * If you associate a document with a managed node that already has an associated document, the
 * system returns the AssociationAlreadyExists exception.
 */
export const createAssociationBatch: API.OperationMethod<
  CreateAssociationBatchRequest & RegionInput,
  CreateAssociationBatchResult,
  CreateAssociationBatchError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(322, __c20, 2) as any as S.Schema<CreateAssociationBatchRequest>,
  output: __S(326, __c20, 6) as any as S.Schema<CreateAssociationBatchResult>,
  errors: [
    AssociationLimitExceeded,
    DuplicateInstanceId,
    InternalServerError,
    InvalidDocument,
    InvalidDocumentVersion,
    InvalidInstanceId,
    InvalidOutputLocation,
    InvalidParameters,
    InvalidSchedule,
    InvalidTarget,
    InvalidTargetMaps,
    UnsupportedPlatformType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssociationBatch",
  telemetry: TELEMETRY,
  span: "CreateAssociationBatch",
}));

export type CreateCloudConnectorError =
  | ConflictException
  | InternalServerError
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a cloud connector that establishes a connection between Systems Manager and a third-party
 * cloud environment.
 */
export const createCloudConnector: API.OperationMethod<
  CreateCloudConnectorRequest & RegionInput,
  CreateCloudConnectorResult,
  CreateCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<CreateCloudConnectorRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<CreateCloudConnectorResult>,
  errors: [ConflictException, InternalServerError, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudConnector",
  telemetry: TELEMETRY,
  span: "CreateCloudConnector",
}));

export type CreateDocumentError =
  | DocumentAlreadyExists
  | DocumentLimitExceeded
  | InternalServerError
  | InvalidDocumentContent
  | InvalidDocumentSchemaVersion
  | MaxDocumentSizeExceeded
  | NoLongerSupportedException
  | TooManyUpdates
  | CommonErrors;
/**
 * Creates a Amazon Web Services Systems Manager (SSM document). An SSM document defines the actions that Systems Manager performs
 * on your managed nodes. For more information about SSM documents, including information about
 * supported schemas, features, and syntax, see Amazon Web Services Systems Manager Documents in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const createDocument: API.OperationMethod<
  CreateDocumentRequest & RegionInput,
  CreateDocumentResult,
  CreateDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<CreateDocumentRequest>,
  output: __S(450, __c28, 2) as any as S.Schema<CreateDocumentResult>,
  errors: [
    DocumentAlreadyExists,
    DocumentLimitExceeded,
    InternalServerError,
    InvalidDocumentContent,
    InvalidDocumentSchemaVersion,
    MaxDocumentSizeExceeded,
    NoLongerSupportedException,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDocument",
  telemetry: TELEMETRY,
  span: "CreateDocument",
}));

export type CreateMaintenanceWindowError =
  | IdempotentParameterMismatch
  | InternalServerError
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Creates a new maintenance window.
 *
 * The value you specify for `Duration` determines the specific end time for the
 * maintenance window based on the time it begins. No maintenance window tasks are permitted to
 * start after the resulting endtime minus the number of hours you specify for `Cutoff`.
 * For example, if the maintenance window starts at 3 PM, the duration is three hours, and the
 * value you specify for `Cutoff` is one hour, no maintenance window tasks can start
 * after 5 PM.
 */
export const createMaintenanceWindow: API.OperationMethod<
  CreateMaintenanceWindowRequest & RegionInput,
  CreateMaintenanceWindowResult,
  CreateMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<CreateMaintenanceWindowRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<CreateMaintenanceWindowResult>,
  errors: [IdempotentParameterMismatch, InternalServerError, ResourceLimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMaintenanceWindow",
  telemetry: TELEMETRY,
  span: "CreateMaintenanceWindow",
}));

export type CreateOpsItemError =
  | InternalServerError
  | OpsItemAccessDeniedException
  | OpsItemAlreadyExistsException
  | OpsItemInvalidParameterException
  | OpsItemLimitExceededException
  | CommonErrors;
/**
 * Creates a new OpsItem. You must have permission in Identity and Access Management (IAM) to create a new OpsItem. For more information, see Set up OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 *
 * Operations engineers and IT professionals use Amazon Web Services Systems Manager OpsCenter to view, investigate, and
 * remediate operational issues impacting the performance and health of their Amazon Web Services resources. For
 * more information, see Amazon Web Services Systems Manager OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const createOpsItem: API.OperationMethod<
  CreateOpsItemRequest & RegionInput,
  CreateOpsItemResponse,
  CreateOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<CreateOpsItemRequest>,
  output: __S(497, __c31, 1) as any as S.Schema<CreateOpsItemResponse>,
  errors: [
    InternalServerError,
    OpsItemAccessDeniedException,
    OpsItemAlreadyExistsException,
    OpsItemInvalidParameterException,
    OpsItemLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOpsItem",
  telemetry: TELEMETRY,
  span: "CreateOpsItem",
}));

export type CreateOpsMetadataError =
  | InternalServerError
  | OpsMetadataAlreadyExistsException
  | OpsMetadataInvalidArgumentException
  | OpsMetadataLimitExceededException
  | OpsMetadataTooManyUpdatesException
  | CommonErrors;
/**
 * If you create a new application in Application Manager, Amazon Web Services Systems Manager calls this API operation to specify
 * information about the new application, including the application type.
 */
export const createOpsMetadata: API.OperationMethod<
  CreateOpsMetadataRequest & RegionInput,
  CreateOpsMetadataResult,
  CreateOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<CreateOpsMetadataRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<CreateOpsMetadataResult>,
  errors: [
    InternalServerError,
    OpsMetadataAlreadyExistsException,
    OpsMetadataInvalidArgumentException,
    OpsMetadataLimitExceededException,
    OpsMetadataTooManyUpdatesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOpsMetadata",
  telemetry: TELEMETRY,
  span: "CreateOpsMetadata",
}));

export type CreatePatchBaselineError =
  | IdempotentParameterMismatch
  | InternalServerError
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Creates a patch baseline.
 *
 * For information about valid key-value pairs in `PatchFilters` for each supported
 * operating system type, see PatchFilter.
 */
export const createPatchBaseline: API.OperationMethod<
  CreatePatchBaselineRequest & RegionInput,
  CreatePatchBaselineResult,
  CreatePatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<CreatePatchBaselineRequest>,
  output: __S(624, __c39, 0) as any as S.Schema<CreatePatchBaselineResult>,
  errors: [IdempotentParameterMismatch, InternalServerError, ResourceLimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePatchBaseline",
  telemetry: TELEMETRY,
  span: "CreatePatchBaseline",
}));

export type CreateResourceDataSyncError =
  | InternalServerError
  | ResourceDataSyncAlreadyExistsException
  | ResourceDataSyncCountExceededException
  | ResourceDataSyncInvalidConfigurationException
  | CommonErrors;
/**
 * A resource data sync helps you view data from multiple sources in a single location.
 * Amazon Web Services Systems Manager offers two types of resource data sync: `SyncToDestination` and
 * `SyncFromSource`.
 *
 * You can configure Systems Manager Inventory to use the `SyncToDestination` type to
 * synchronize Inventory data from multiple Amazon Web Services Regions to a single Amazon Simple Storage Service (Amazon S3) bucket. For more information, see Creating a
 * resource data sync for Inventory in the *Amazon Web Services Systems Manager User Guide*.
 *
 * You can configure Systems Manager Explorer to use the `SyncFromSource` type to synchronize
 * operational work items (OpsItems) and operational data (OpsData) from multiple Amazon Web Services Regions to a
 * single Amazon S3 bucket. This type can synchronize OpsItems and OpsData from multiple
 * Amazon Web Services accounts and Amazon Web Services Regions or `EntireOrganization` by using Organizations. For more
 * information, see Setting up Systems Manager
 * Explorer to display data from multiple accounts and Regions in the
 * *Amazon Web Services Systems Manager User Guide*.
 *
 * A resource data sync is an asynchronous operation that returns immediately. After a
 * successful initial sync is completed, the system continuously syncs data. To check the status of
 * a sync, use the ListResourceDataSync.
 *
 * By default, data isn't encrypted in Amazon S3. We strongly recommend that you
 * enable encryption in Amazon S3 to ensure secure data storage. We also recommend that you
 * secure access to the Amazon S3 bucket by creating a restrictive bucket policy.
 */
export const createResourceDataSync: API.OperationMethod<
  CreateResourceDataSyncRequest & RegionInput,
  CreateResourceDataSyncResult,
  CreateResourceDataSyncError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<CreateResourceDataSyncRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateResourceDataSyncResult>,
  errors: [
    InternalServerError,
    ResourceDataSyncAlreadyExistsException,
    ResourceDataSyncCountExceededException,
    ResourceDataSyncInvalidConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceDataSync",
  telemetry: TELEMETRY,
  span: "CreateResourceDataSync",
}));

export type DeleteActivationError =
  | InternalServerError
  | InvalidActivation
  | InvalidActivationId
  | TooManyUpdates
  | CommonErrors;
/**
 * Deletes an activation. You aren't required to delete an activation. If you delete an
 * activation, you can no longer use it to register additional managed nodes. Deleting an activation
 * doesn't de-register managed nodes. You must manually de-register managed nodes.
 */
export const deleteActivation: API.OperationMethod<
  DeleteActivationRequest & RegionInput,
  DeleteActivationResult,
  DeleteActivationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<DeleteActivationRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteActivationResult>,
  errors: [InternalServerError, InvalidActivation, InvalidActivationId, TooManyUpdates],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteActivation",
  telemetry: TELEMETRY,
  span: "DeleteActivation",
}));

export type DeleteAssociationError =
  | AssociationDoesNotExist
  | InternalServerError
  | InvalidDocument
  | InvalidInstanceId
  | TooManyUpdates
  | CommonErrors;
/**
 * Disassociates the specified Amazon Web Services Systems Manager document (SSM document) from the specified managed
 * node. If you created the association by using the `Targets` parameter, then you must
 * delete the association by using the association ID.
 *
 * When you disassociate a document from a managed node, it doesn't change the configuration of
 * the node. To change the configuration state of a managed node after you disassociate a document,
 * you must create a new document with the desired configuration and associate it with the
 * node.
 */
export const deleteAssociation: API.OperationMethod<
  DeleteAssociationRequest & RegionInput,
  DeleteAssociationResult,
  DeleteAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<DeleteAssociationRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteAssociationResult>,
  errors: [
    AssociationDoesNotExist,
    InternalServerError,
    InvalidDocument,
    InvalidInstanceId,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssociation",
  telemetry: TELEMETRY,
  span: "DeleteAssociation",
}));

export type DeleteCloudConnectorError =
  | ConflictException
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a cloud connector.
 */
export const deleteCloudConnector: API.OperationMethod<
  DeleteCloudConnectorRequest & RegionInput,
  DeleteCloudConnectorResult,
  DeleteCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<DeleteCloudConnectorRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<DeleteCloudConnectorResult>,
  errors: [ConflictException, InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudConnector",
  telemetry: TELEMETRY,
  span: "DeleteCloudConnector",
}));

export type DeleteDocumentError =
  | AssociatedInstances
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentOperation
  | TooManyUpdates
  | CommonErrors;
/**
 * Deletes the Amazon Web Services Systems Manager document (SSM document) and all managed node associations to the
 * document.
 *
 * Before you delete the document, we recommend that you use DeleteAssociation to disassociate all managed nodes that are associated with the document.
 */
export const deleteDocument: API.OperationMethod<
  DeleteDocumentRequest & RegionInput,
  DeleteDocumentResult,
  DeleteDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<DeleteDocumentRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteDocumentResult>,
  errors: [
    AssociatedInstances,
    InternalServerError,
    InvalidDocument,
    InvalidDocumentOperation,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDocument",
  telemetry: TELEMETRY,
  span: "DeleteDocument",
}));

export type DeleteInventoryError =
  | InternalServerError
  | InvalidDeleteInventoryParametersException
  | InvalidInventoryRequestException
  | InvalidOptionException
  | InvalidTypeNameException
  | CommonErrors;
/**
 * Delete a custom inventory type or the data associated with a custom Inventory type. Deleting
 * a custom inventory type is also referred to as deleting a custom inventory schema.
 */
export const deleteInventory: API.OperationMethod<
  DeleteInventoryRequest & RegionInput,
  DeleteInventoryResult,
  DeleteInventoryError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<DeleteInventoryRequest>,
  output: __S(801, __c50, 1) as any as S.Schema<DeleteInventoryResult>,
  errors: [
    InternalServerError,
    InvalidDeleteInventoryParametersException,
    InvalidInventoryRequestException,
    InvalidOptionException,
    InvalidTypeNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInventory",
  telemetry: TELEMETRY,
  span: "DeleteInventory",
}));

export type DeleteMaintenanceWindowError = InternalServerError | CommonErrors;
/**
 * Deletes a maintenance window.
 */
export const deleteMaintenanceWindow: API.OperationMethod<
  DeleteMaintenanceWindowRequest & RegionInput,
  DeleteMaintenanceWindowResult,
  DeleteMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<DeleteMaintenanceWindowRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<DeleteMaintenanceWindowResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMaintenanceWindow",
  telemetry: TELEMETRY,
  span: "DeleteMaintenanceWindow",
}));

export type DeleteOpsItemError =
  | InternalServerError
  | OpsItemInvalidParameterException
  | CommonErrors;
/**
 * Delete an OpsItem. You must have permission in Identity and Access Management (IAM) to
 * delete an OpsItem.
 *
 * Note the following important information about this operation.
 *
 * - Deleting an OpsItem is irreversible. You can't restore a deleted OpsItem.
 *
 * - This operation uses an *eventual consistency model*, which means the
 * system can take a few minutes to complete this operation. If you delete an OpsItem and
 * immediately call, for example, GetOpsItem, the deleted OpsItem might still
 * appear in the response.
 *
 * - This operation is idempotent. The system doesn't throw an exception if you repeatedly
 * call this operation for the same OpsItem. If the first call is successful, all additional calls
 * return the same successful response as the first call.
 *
 * - This operation doesn't support cross-account calls. A delegated administrator or
 * management account can't delete OpsItems in other accounts, even if OpsCenter has been set up for
 * cross-account administration. For more information about cross-account administration, see
 * Setting up
 * OpsCenter to centrally manage OpsItems across accounts in the *Systems Manager User Guide*.
 */
export const deleteOpsItem: API.OperationMethod<
  DeleteOpsItemRequest & RegionInput,
  DeleteOpsItemResponse,
  DeleteOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<DeleteOpsItemRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteOpsItemResponse>,
  errors: [InternalServerError, OpsItemInvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOpsItem",
  telemetry: TELEMETRY,
  span: "DeleteOpsItem",
}));

export type DeleteOpsMetadataError =
  | InternalServerError
  | OpsMetadataInvalidArgumentException
  | OpsMetadataNotFoundException
  | CommonErrors;
/**
 * Delete OpsMetadata related to an application.
 */
export const deleteOpsMetadata: API.OperationMethod<
  DeleteOpsMetadataRequest & RegionInput,
  DeleteOpsMetadataResult,
  DeleteOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<DeleteOpsMetadataRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteOpsMetadataResult>,
  errors: [InternalServerError, OpsMetadataInvalidArgumentException, OpsMetadataNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOpsMetadata",
  telemetry: TELEMETRY,
  span: "DeleteOpsMetadata",
}));

export type DeleteParameterError = InternalServerError | ParameterNotFound | CommonErrors;
/**
 * Delete a parameter from the system. After deleting a parameter, wait for at least 30 seconds
 * to create a parameter with the same name.
 *
 * This operation is authorized against the `ssm:DeleteParameter` action. Denying
 * that action alone doesn't restrict DeleteParameters, which is authorized
 * against its own action. For more information, see Restricting access to
 * specific parameters and paths in the *Amazon Web Services Systems Manager User Guide*.
 */
export const deleteParameter: API.OperationMethod<
  DeleteParameterRequest & RegionInput,
  DeleteParameterResult,
  DeleteParameterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<DeleteParameterRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteParameterResult>,
  errors: [InternalServerError, ParameterNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteParameter",
  telemetry: TELEMETRY,
  span: "DeleteParameter",
}));

export type DeleteParametersError = InternalServerError | CommonErrors;
/**
 * Delete a list of parameters. After deleting a parameter, wait for at least 30 seconds to
 * create a parameter with the same name.
 *
 * This operation is authorized against the `ssm:DeleteParameters` action, not
 * against `ssm:DeleteParameter`. Denying `ssm:DeleteParameter` for a
 * parameter doesn't prevent a principal from deleting that parameter with this operation. For more
 * information, see Restricting access to
 * specific parameters and paths in the *Amazon Web Services Systems Manager User Guide*.
 */
export const deleteParameters: API.OperationMethod<
  DeleteParametersRequest & RegionInput,
  DeleteParametersResult,
  DeleteParametersError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<DeleteParametersRequest>,
  output: __S(897, __c56, 1) as any as S.Schema<DeleteParametersResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteParameters",
  telemetry: TELEMETRY,
  span: "DeleteParameters",
}));

export type DeletePatchBaselineError = InternalServerError | ResourceInUseException | CommonErrors;
/**
 * Deletes a patch baseline.
 */
export const deletePatchBaseline: API.OperationMethod<
  DeletePatchBaselineRequest & RegionInput,
  DeletePatchBaselineResult,
  DeletePatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<DeletePatchBaselineRequest>,
  output: __S(624, __c39, 0) as any as S.Schema<DeletePatchBaselineResult>,
  errors: [InternalServerError, ResourceInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePatchBaseline",
  telemetry: TELEMETRY,
  span: "DeletePatchBaseline",
}));

export type DeleteResourceDataSyncError =
  | InternalServerError
  | ResourceDataSyncInvalidConfigurationException
  | ResourceDataSyncNotFoundException
  | CommonErrors;
/**
 * Deletes a resource data sync configuration. After the configuration is deleted, changes to
 * data on managed nodes are no longer synced to or from the target. Deleting a sync configuration
 * doesn't delete data.
 */
export const deleteResourceDataSync: API.OperationMethod<
  DeleteResourceDataSyncRequest & RegionInput,
  DeleteResourceDataSyncResult,
  DeleteResourceDataSyncError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<DeleteResourceDataSyncRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteResourceDataSyncResult>,
  errors: [
    InternalServerError,
    ResourceDataSyncInvalidConfigurationException,
    ResourceDataSyncNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceDataSync",
  telemetry: TELEMETRY,
  span: "DeleteResourceDataSync",
}));

export type DeleteResourcePolicyError =
  | InternalServerError
  | MalformedResourcePolicyDocumentException
  | ResourceNotFoundException
  | ResourcePolicyConflictException
  | ResourcePolicyInvalidParameterException
  | ResourcePolicyNotFoundException
  | CommonErrors;
/**
 * Deletes a Systems Manager resource policy. A resource policy helps you to define the IAM entity (for example, an Amazon Web Services account) that can manage your Systems Manager resources. The following
 * resources support Systems Manager resource policies.
 *
 * - `OpsItemGroup` - The resource policy for `OpsItemGroup` enables
 * Amazon Web Services accounts to view and interact with OpsCenter operational work items (OpsItems).
 *
 * - `Parameter` - The resource policy is used to share a parameter with other
 * accounts using Resource Access Manager (RAM). For more information about
 * cross-account sharing of parameters, see Working with
 * shared parameters in the *Amazon Web Services Systems Manager User Guide*.
 *
 * - `Document` - Shares the document using Resource Access Manager (RAM). For more information about sharing documents, see Sharing
 * Systems Manager documents in the *Amazon Web Services Systems Manager User Guide*.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest & RegionInput,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [
    InternalServerError,
    MalformedResourcePolicyDocumentException,
    ResourceNotFoundException,
    ResourcePolicyConflictException,
    ResourcePolicyInvalidParameterException,
    ResourcePolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
  telemetry: TELEMETRY,
  span: "DeleteResourcePolicy",
}));

export type DeregisterDefaultHostManagementConfigurationError = InternalServerError | CommonErrors;
/**
 * Removes the Default Host Management Configuration (DHMC) for an Amazon Web Services account and
 * Amazon Web Services Region. After you deregister DHMC, Amazon EC2 instances are no longer automatically managed as
 * managed nodes by Amazon Web Services Systems Manager.
 *
 * To use this operation, you must have the following permissions:
 *
 * - You need the `ssm:GetServiceSetting` and `ssm:ResetServiceSetting`
 * permissions for the `/ssm/managed-instance/default-ec2-instance-management-role`
 * service setting.
 *
 * If the registered role is service-managed, you also need the `iam:DeleteRole`
 * permission so that Amazon Web Services Systems Manager can remove the role it created.
 */
export const deregisterDefaultHostManagementConfiguration: API.OperationMethod<
  DeregisterDefaultHostManagementConfigurationRequest & RegionInput,
  DeregisterDefaultHostManagementConfigurationResult,
  DeregisterDefaultHostManagementConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<DeregisterDefaultHostManagementConfigurationRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeregisterDefaultHostManagementConfigurationResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterDefaultHostManagementConfiguration",
  telemetry: TELEMETRY,
  span: "DeregisterDefaultHostManagementConfiguration",
}));

export type DeregisterManagedInstanceError = InternalServerError | InvalidInstanceId | CommonErrors;
/**
 * Removes the server or virtual machine from the list of registered servers.
 *
 * If you want to reregister an on-premises server, edge device, or VM, you must use a
 * different Activation Code and Activation ID than used to register the machine previously. The
 * Activation Code and Activation ID must not have already been used on the maximum number of
 * activations specified when they were created. For more information, see Deregistering
 * managed nodes in a hybrid and multicloud environment in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const deregisterManagedInstance: API.OperationMethod<
  DeregisterManagedInstanceRequest & RegionInput,
  DeregisterManagedInstanceResult,
  DeregisterManagedInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<DeregisterManagedInstanceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeregisterManagedInstanceResult>,
  errors: [InternalServerError, InvalidInstanceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterManagedInstance",
  telemetry: TELEMETRY,
  span: "DeregisterManagedInstance",
}));

export type DeregisterPatchBaselineForPatchGroupError =
  | InternalServerError
  | InvalidResourceId
  | CommonErrors;
/**
 * Removes a patch group from a patch baseline.
 */
export const deregisterPatchBaselineForPatchGroup: API.OperationMethod<
  DeregisterPatchBaselineForPatchGroupRequest & RegionInput,
  DeregisterPatchBaselineForPatchGroupResult,
  DeregisterPatchBaselineForPatchGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<DeregisterPatchBaselineForPatchGroupRequest>,
  output: __S(1008, __c63, 0) as any as S.Schema<DeregisterPatchBaselineForPatchGroupResult>,
  errors: [InternalServerError, InvalidResourceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterPatchBaselineForPatchGroup",
  telemetry: TELEMETRY,
  span: "DeregisterPatchBaselineForPatchGroup",
}));

export type DeregisterTargetFromMaintenanceWindowError =
  | DoesNotExistException
  | InternalServerError
  | TargetInUseException
  | CommonErrors;
/**
 * Removes a target from a maintenance window.
 */
export const deregisterTargetFromMaintenanceWindow: API.OperationMethod<
  DeregisterTargetFromMaintenanceWindowRequest & RegionInput,
  DeregisterTargetFromMaintenanceWindowResult,
  DeregisterTargetFromMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<DeregisterTargetFromMaintenanceWindowRequest>,
  output: __S(1025, __c64, 1) as any as S.Schema<DeregisterTargetFromMaintenanceWindowResult>,
  errors: [DoesNotExistException, InternalServerError, TargetInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTargetFromMaintenanceWindow",
  telemetry: TELEMETRY,
  span: "DeregisterTargetFromMaintenanceWindow",
}));

export type DeregisterTaskFromMaintenanceWindowError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Removes a task from a maintenance window.
 */
export const deregisterTaskFromMaintenanceWindow: API.OperationMethod<
  DeregisterTaskFromMaintenanceWindowRequest & RegionInput,
  DeregisterTaskFromMaintenanceWindowResult,
  DeregisterTaskFromMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<DeregisterTaskFromMaintenanceWindowRequest>,
  output: __S(1041, __c65, 1) as any as S.Schema<DeregisterTaskFromMaintenanceWindowResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTaskFromMaintenanceWindow",
  telemetry: TELEMETRY,
  span: "DeregisterTaskFromMaintenanceWindow",
}));

export type DescribeActivationsError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | CommonErrors;
/**
 * Describes details about the activation, such as the date and time the activation was
 * created, its expiration date, the Identity and Access Management (IAM) role assigned to
 * the managed nodes in the activation, and the number of nodes registered by using this
 * activation.
 */
export const describeActivations: API.PaginatedOperationMethod<
  DescribeActivationsRequest & RegionInput,
  DescribeActivationsResult,
  DescribeActivationsError,
  Creds | HttpClient.HttpClient,
  Activation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<DescribeActivationsRequest>,
  output: __S(1059, __c66, 3) as any as S.Schema<DescribeActivationsResult>,
  errors: [InternalServerError, InvalidFilter, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActivations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ActivationList",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeActivations",
})) as any;

export type DescribeAssociationError =
  | AssociationDoesNotExist
  | InternalServerError
  | InvalidAssociationVersion
  | InvalidDocument
  | InvalidInstanceId
  | CommonErrors;
/**
 * Describes the association for the specified target or managed node. If you created the
 * association by using the `Targets` parameter, then you must retrieve the association
 * by using the association ID.
 */
export const describeAssociation: API.OperationMethod<
  DescribeAssociationRequest & RegionInput,
  DescribeAssociationResult,
  DescribeAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<DescribeAssociationRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<DescribeAssociationResult>,
  errors: [
    AssociationDoesNotExist,
    InternalServerError,
    InvalidAssociationVersion,
    InvalidDocument,
    InvalidInstanceId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssociation",
  telemetry: TELEMETRY,
  span: "DescribeAssociation",
}));

export type DescribeAssociationExecutionsError =
  | AssociationDoesNotExist
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Views all executions for a specific association ID.
 */
export const describeAssociationExecutions: API.PaginatedOperationMethod<
  DescribeAssociationExecutionsRequest & RegionInput,
  DescribeAssociationExecutionsResult,
  DescribeAssociationExecutionsError,
  Creds | HttpClient.HttpClient,
  AssociationExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1106, __c69, 2) as any as S.Schema<DescribeAssociationExecutionsRequest>,
  output: __S(1109, __c69, 5) as any as S.Schema<DescribeAssociationExecutionsResult>,
  errors: [AssociationDoesNotExist, InternalServerError, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssociationExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssociationExecutions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeAssociationExecutions",
})) as any;

export type DescribeAssociationExecutionTargetsError =
  | AssociationDoesNotExist
  | AssociationExecutionDoesNotExist
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Views information about a specific execution of a specific association.
 */
export const describeAssociationExecutionTargets: API.PaginatedOperationMethod<
  DescribeAssociationExecutionTargetsRequest & RegionInput,
  DescribeAssociationExecutionTargetsResult,
  DescribeAssociationExecutionTargetsError,
  Creds | HttpClient.HttpClient,
  AssociationExecutionTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1122, __c70, 2) as any as S.Schema<DescribeAssociationExecutionTargetsRequest>,
  output: __S(1126, __c70, 6) as any as S.Schema<DescribeAssociationExecutionTargetsResult>,
  errors: [
    AssociationDoesNotExist,
    AssociationExecutionDoesNotExist,
    InternalServerError,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssociationExecutionTargets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssociationExecutionTargets",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeAssociationExecutionTargets",
})) as any;

export type DescribeAutomationExecutionsError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidFilterValue
  | InvalidNextToken
  | CommonErrors;
/**
 * Provides details about all active and terminated Automation executions.
 */
export const describeAutomationExecutions: API.PaginatedOperationMethod<
  DescribeAutomationExecutionsRequest & RegionInput,
  DescribeAutomationExecutionsResult,
  DescribeAutomationExecutionsError,
  Creds | HttpClient.HttpClient,
  AutomationExecutionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1136, __c71, 0) as any as S.Schema<DescribeAutomationExecutionsRequest>,
  output: __S(1139, __c71, 3) as any as S.Schema<DescribeAutomationExecutionsResult>,
  errors: [InternalServerError, InvalidFilterKey, InvalidFilterValue, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutomationExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AutomationExecutionMetadataList",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeAutomationExecutions",
})) as any;

export type DescribeAutomationStepExecutionsError =
  | AutomationExecutionNotFoundException
  | InternalServerError
  | InvalidFilterKey
  | InvalidFilterValue
  | InvalidNextToken
  | CommonErrors;
/**
 * Information about all active and terminated step executions in an Automation
 * workflow.
 */
export const describeAutomationStepExecutions: API.PaginatedOperationMethod<
  DescribeAutomationStepExecutionsRequest & RegionInput,
  DescribeAutomationStepExecutionsResult,
  DescribeAutomationStepExecutionsError,
  Creds | HttpClient.HttpClient,
  StepExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<DescribeAutomationStepExecutionsRequest>,
  output: __S(1185, __c74, 1) as any as S.Schema<DescribeAutomationStepExecutionsResult>,
  errors: [
    AutomationExecutionNotFoundException,
    InternalServerError,
    InvalidFilterKey,
    InvalidFilterValue,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutomationStepExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StepExecutions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeAutomationStepExecutions",
})) as any;

export type DescribeAvailablePatchesError = InternalServerError | CommonErrors;
/**
 * Lists all patches eligible to be included in a patch baseline.
 *
 * Currently, `DescribeAvailablePatches` supports only the Amazon Linux 1, Amazon
 * Linux 2, and Windows Server operating systems.
 */
export const describeAvailablePatches: API.PaginatedOperationMethod<
  DescribeAvailablePatchesRequest & RegionInput,
  DescribeAvailablePatchesResult,
  DescribeAvailablePatchesError,
  Creds | HttpClient.HttpClient,
  Patch
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<DescribeAvailablePatchesRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<DescribeAvailablePatchesResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAvailablePatches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Patches",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeAvailablePatches",
})) as any;

export type DescribeDocumentError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | CommonErrors;
/**
 * Describes the specified Amazon Web Services Systems Manager document (SSM document).
 */
export const describeDocument: API.OperationMethod<
  DescribeDocumentRequest & RegionInput,
  DescribeDocumentResult,
  DescribeDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<DescribeDocumentRequest>,
  output: __S(1265, __c79, 1) as any as S.Schema<DescribeDocumentResult>,
  errors: [InternalServerError, InvalidDocument, InvalidDocumentVersion],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDocument",
  telemetry: TELEMETRY,
  span: "DescribeDocument",
}));

export type DescribeDocumentPermissionError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentOperation
  | InvalidNextToken
  | InvalidPermissionType
  | CommonErrors;
/**
 * Describes the permissions for a Amazon Web Services Systems Manager document (SSM document). If you created the
 * document, you are the owner. If a document is shared, it can either be shared privately (by
 * specifying a user's Amazon Web Services account ID) or publicly (*All*).
 */
export const describeDocumentPermission: API.OperationMethod<
  DescribeDocumentPermissionRequest & RegionInput,
  DescribeDocumentPermissionResponse,
  DescribeDocumentPermissionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<DescribeDocumentPermissionRequest>,
  output: __S(1283, __c80, 3) as any as S.Schema<DescribeDocumentPermissionResponse>,
  errors: [
    InternalServerError,
    InvalidDocument,
    InvalidDocumentOperation,
    InvalidNextToken,
    InvalidPermissionType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDocumentPermission",
  telemetry: TELEMETRY,
  span: "DescribeDocumentPermission",
}));

export type DescribeEffectiveInstanceAssociationsError =
  | InternalServerError
  | InvalidInstanceId
  | InvalidNextToken
  | CommonErrors;
/**
 * All associations for the managed nodes.
 */
export const describeEffectiveInstanceAssociations: API.PaginatedOperationMethod<
  DescribeEffectiveInstanceAssociationsRequest & RegionInput,
  DescribeEffectiveInstanceAssociationsResult,
  DescribeEffectiveInstanceAssociationsError,
  Creds | HttpClient.HttpClient,
  InstanceAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<DescribeEffectiveInstanceAssociationsRequest>,
  output: __S(1315, __c82, 3) as any as S.Schema<DescribeEffectiveInstanceAssociationsResult>,
  errors: [InternalServerError, InvalidInstanceId, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEffectiveInstanceAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Associations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeEffectiveInstanceAssociations",
})) as any;

export type DescribeEffectivePatchesForPatchBaselineError =
  | DoesNotExistException
  | InternalServerError
  | InvalidResourceId
  | UnsupportedOperatingSystem
  | CommonErrors;
/**
 * Retrieves the current effective patches (the patch and the approval state) for the specified
 * patch baseline. Applies to patch baselines for Windows only.
 */
export const describeEffectivePatchesForPatchBaseline: API.PaginatedOperationMethod<
  DescribeEffectivePatchesForPatchBaselineRequest & RegionInput,
  DescribeEffectivePatchesForPatchBaselineResult,
  DescribeEffectivePatchesForPatchBaselineError,
  Creds | HttpClient.HttpClient,
  EffectivePatch
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<DescribeEffectivePatchesForPatchBaselineRequest>,
  output: __S(1332, __c83, 4) as any as S.Schema<DescribeEffectivePatchesForPatchBaselineResult>,
  errors: [
    DoesNotExistException,
    InternalServerError,
    InvalidResourceId,
    UnsupportedOperatingSystem,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEffectivePatchesForPatchBaseline",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EffectivePatches",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeEffectivePatchesForPatchBaseline",
})) as any;

export type DescribeInstanceAssociationsStatusError =
  | InternalServerError
  | InvalidInstanceId
  | InvalidNextToken
  | CommonErrors;
/**
 * The status of the associations for the managed nodes.
 */
export const describeInstanceAssociationsStatus: API.PaginatedOperationMethod<
  DescribeInstanceAssociationsStatusRequest & RegionInput,
  DescribeInstanceAssociationsStatusResult,
  DescribeInstanceAssociationsStatusError,
  Creds | HttpClient.HttpClient,
  InstanceAssociationStatusInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<DescribeInstanceAssociationsStatusRequest>,
  output: __S(1349, __c84, 5) as any as S.Schema<DescribeInstanceAssociationsStatusResult>,
  errors: [InternalServerError, InvalidInstanceId, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceAssociationsStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceAssociationStatusInfos",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeInstanceAssociationsStatus",
})) as any;

export type DescribeInstanceInformationError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidInstanceId
  | InvalidInstanceInformationFilterValue
  | InvalidNextToken
  | CommonErrors;
/**
 * Provides information about one or more of your managed nodes, including the operating system
 * platform, SSM Agent version, association status, and IP address. This operation does not return
 * information for nodes that are either Stopped or Terminated.
 *
 * If you specify one or more node IDs, the operation returns information for those managed
 * nodes. If you don't specify node IDs, it returns information for all your managed nodes. If you
 * specify a node ID that isn't valid or a node that you don't own, you receive an error.
 *
 * The `IamRole` field returned for this API operation is the role assigned to an
 * Amazon EC2 instance configured with a Systems Manager Quick Setup host management configuration or
 * the role assigned to an on-premises managed node.
 */
export const describeInstanceInformation: API.PaginatedOperationMethod<
  DescribeInstanceInformationRequest & RegionInput,
  DescribeInstanceInformationResult,
  DescribeInstanceInformationError,
  Creds | HttpClient.HttpClient,
  InstanceInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1365, __c85, 5) as any as S.Schema<DescribeInstanceInformationRequest>,
  output: __S(1368, __c85, 8) as any as S.Schema<DescribeInstanceInformationResult>,
  errors: [
    InternalServerError,
    InvalidFilterKey,
    InvalidInstanceId,
    InvalidInstanceInformationFilterValue,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceInformation",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceInformationList",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeInstanceInformation",
})) as any;

export type DescribeInstancePatchesError =
  | InternalServerError
  | InvalidFilter
  | InvalidInstanceId
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieves information about the patches on the specified managed node and their state
 * relative to the patch baseline being used for the node.
 */
export const describeInstancePatches: API.PaginatedOperationMethod<
  DescribeInstancePatchesRequest & RegionInput,
  DescribeInstancePatchesResult,
  DescribeInstancePatchesError,
  Creds | HttpClient.HttpClient,
  PatchComplianceData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1392, __c87, 0) as any as S.Schema<DescribeInstancePatchesRequest>,
  output: __S(1395, __c87, 3) as any as S.Schema<DescribeInstancePatchesResult>,
  errors: [InternalServerError, InvalidFilter, InvalidInstanceId, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstancePatches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Patches",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeInstancePatches",
})) as any;

export type DescribeInstancePatchStatesError =
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieves the high-level patch state of one or more managed nodes.
 */
export const describeInstancePatchStates: API.PaginatedOperationMethod<
  DescribeInstancePatchStatesRequest & RegionInput,
  DescribeInstancePatchStatesResult,
  DescribeInstancePatchStatesError,
  Creds | HttpClient.HttpClient,
  InstancePatchState
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<DescribeInstancePatchStatesRequest>,
  output: __S(1426, __c89, 2) as any as S.Schema<DescribeInstancePatchStatesResult>,
  errors: [InternalServerError, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstancePatchStates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstancePatchStates",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeInstancePatchStates",
})) as any;

export type DescribeInstancePatchStatesForPatchGroupError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieves the high-level patch state for the managed nodes in the specified patch
 * group.
 */
export const describeInstancePatchStatesForPatchGroup: API.PaginatedOperationMethod<
  DescribeInstancePatchStatesForPatchGroupRequest & RegionInput,
  DescribeInstancePatchStatesForPatchGroupResult,
  DescribeInstancePatchStatesForPatchGroupError,
  Creds | HttpClient.HttpClient,
  InstancePatchState
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1442, __c90, 2) as any as S.Schema<DescribeInstancePatchStatesForPatchGroupRequest>,
  output: __S(1426, __c89, 2) as any as S.Schema<DescribeInstancePatchStatesForPatchGroupResult>,
  errors: [InternalServerError, InvalidFilter, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstancePatchStatesForPatchGroup",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstancePatchStates",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeInstancePatchStatesForPatchGroup",
})) as any;

export type DescribeInstancePropertiesError =
  | InternalServerError
  | InvalidActivationId
  | InvalidDocument
  | InvalidFilterKey
  | InvalidInstanceId
  | InvalidInstancePropertyFilterValue
  | InvalidNextToken
  | CommonErrors;
/**
 * An API operation used by the Systems Manager console to display information about Systems Manager managed
 * nodes.
 */
export const describeInstanceProperties: API.PaginatedOperationMethod<
  DescribeInstancePropertiesRequest & RegionInput,
  DescribeInstancePropertiesResult,
  DescribeInstancePropertiesError,
  Creds | HttpClient.HttpClient,
  InstanceProperty
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1461, __c91, 5) as any as S.Schema<DescribeInstancePropertiesRequest>,
  output: __S(1464, __c91, 8) as any as S.Schema<DescribeInstancePropertiesResult>,
  errors: [
    InternalServerError,
    InvalidActivationId,
    InvalidDocument,
    InvalidFilterKey,
    InvalidInstanceId,
    InvalidInstancePropertyFilterValue,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceProperties",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceProperties",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeInstanceProperties",
})) as any;

export type DescribeInventoryDeletionsError =
  | InternalServerError
  | InvalidDeletionIdException
  | InvalidNextToken
  | CommonErrors;
/**
 * Describes a specific delete inventory operation.
 */
export const describeInventoryDeletions: API.PaginatedOperationMethod<
  DescribeInventoryDeletionsRequest & RegionInput,
  DescribeInventoryDeletionsResult,
  DescribeInventoryDeletionsError,
  Creds | HttpClient.HttpClient,
  InventoryDeletionStatusItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1472, __c92, 0) as any as S.Schema<DescribeInventoryDeletionsRequest>,
  output: __S(1475, __c92, 3) as any as S.Schema<DescribeInventoryDeletionsResult>,
  errors: [InternalServerError, InvalidDeletionIdException, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInventoryDeletions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InventoryDeletions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeInventoryDeletions",
})) as any;

export type DescribeMaintenanceWindowExecutionsError = InternalServerError | CommonErrors;
/**
 * Lists the executions of a maintenance window. This includes information about when the
 * maintenance window was scheduled to be active, and information about tasks registered and run
 * with the maintenance window.
 */
export const describeMaintenanceWindowExecutions: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowExecutionsRequest & RegionInput,
  DescribeMaintenanceWindowExecutionsResult,
  DescribeMaintenanceWindowExecutionsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1488, __c93, 0) as any as S.Schema<DescribeMaintenanceWindowExecutionsRequest>,
  output: __S(1491, __c93, 3) as any as S.Schema<DescribeMaintenanceWindowExecutionsResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WindowExecutions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeMaintenanceWindowExecutions",
})) as any;

export type DescribeMaintenanceWindowExecutionTaskInvocationsError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the individual task executions (one per target) for a particular task run as part
 * of a maintenance window execution.
 */
export const describeMaintenanceWindowExecutionTaskInvocations: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowExecutionTaskInvocationsRequest & RegionInput,
  DescribeMaintenanceWindowExecutionTaskInvocationsResult,
  DescribeMaintenanceWindowExecutionTaskInvocationsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowExecutionTaskInvocationIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(
    1504,
    __c94,
    0,
  ) as any as S.Schema<DescribeMaintenanceWindowExecutionTaskInvocationsRequest>,
  output: __S(
    1507,
    __c94,
    3,
  ) as any as S.Schema<DescribeMaintenanceWindowExecutionTaskInvocationsResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowExecutionTaskInvocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WindowExecutionTaskInvocationIdentities",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeMaintenanceWindowExecutionTaskInvocations",
})) as any;

export type DescribeMaintenanceWindowExecutionTasksError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * For a given maintenance window execution, lists the tasks that were run.
 */
export const describeMaintenanceWindowExecutionTasks: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowExecutionTasksRequest & RegionInput,
  DescribeMaintenanceWindowExecutionTasksResult,
  DescribeMaintenanceWindowExecutionTasksError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowExecutionTaskIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1520, __c95, 0) as any as S.Schema<DescribeMaintenanceWindowExecutionTasksRequest>,
  output: __S(1523, __c95, 3) as any as S.Schema<DescribeMaintenanceWindowExecutionTasksResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowExecutionTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WindowExecutionTaskIdentities",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeMaintenanceWindowExecutionTasks",
})) as any;

export type DescribeMaintenanceWindowsError = InternalServerError | CommonErrors;
/**
 * Retrieves the maintenance windows in an Amazon Web Services account.
 */
export const describeMaintenanceWindows: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowsRequest & RegionInput,
  DescribeMaintenanceWindowsResult,
  DescribeMaintenanceWindowsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<DescribeMaintenanceWindowsRequest>,
  output: __S(1539, __c96, 3) as any as S.Schema<DescribeMaintenanceWindowsResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WindowIdentities",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeMaintenanceWindows",
})) as any;

export type DescribeMaintenanceWindowScheduleError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves information about upcoming executions of a maintenance window.
 */
export const describeMaintenanceWindowSchedule: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowScheduleRequest & RegionInput,
  DescribeMaintenanceWindowScheduleResult,
  DescribeMaintenanceWindowScheduleError,
  Creds | HttpClient.HttpClient,
  ScheduledWindowExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<DescribeMaintenanceWindowScheduleRequest>,
  output: __S(1555, __c97, 3) as any as S.Schema<DescribeMaintenanceWindowScheduleResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowSchedule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScheduledWindowExecutions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeMaintenanceWindowSchedule",
})) as any;

export type DescribeMaintenanceWindowsForTargetError = InternalServerError | CommonErrors;
/**
 * Retrieves information about the maintenance window targets or tasks that a managed node is
 * associated with.
 */
export const describeMaintenanceWindowsForTarget: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowsForTargetRequest & RegionInput,
  DescribeMaintenanceWindowsForTargetResult,
  DescribeMaintenanceWindowsForTargetError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowIdentityForTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<DescribeMaintenanceWindowsForTargetRequest>,
  output: __S(1571, __c98, 3) as any as S.Schema<DescribeMaintenanceWindowsForTargetResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowsForTarget",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WindowIdentities",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeMaintenanceWindowsForTarget",
})) as any;

export type DescribeMaintenanceWindowTargetsError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Lists the targets registered with the maintenance window.
 */
export const describeMaintenanceWindowTargets: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowTargetsRequest & RegionInput,
  DescribeMaintenanceWindowTargetsResult,
  DescribeMaintenanceWindowTargetsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<DescribeMaintenanceWindowTargetsRequest>,
  output: __S(1587, __c99, 3) as any as S.Schema<DescribeMaintenanceWindowTargetsResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowTargets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Targets",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeMaintenanceWindowTargets",
})) as any;

export type DescribeMaintenanceWindowTasksError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Lists the tasks in a maintenance window.
 *
 * For maintenance window tasks without a specified target, you can't supply values for
 * `--max-errors` and `--max-concurrency`. Instead, the system inserts a
 * placeholder value of `1`, which may be reported in the response to this command.
 * These values don't affect the running of your task and can be ignored.
 */
export const describeMaintenanceWindowTasks: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowTasksRequest & RegionInput,
  DescribeMaintenanceWindowTasksResult,
  DescribeMaintenanceWindowTasksError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<DescribeMaintenanceWindowTasksRequest>,
  output: __S(1603, __c100, 3) as any as S.Schema<DescribeMaintenanceWindowTasksResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tasks",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeMaintenanceWindowTasks",
})) as any;

export type DescribeOpsItemsError = InternalServerError | CommonErrors;
/**
 * Query a set of OpsItems. You must have permission in Identity and Access Management (IAM) to query a list of OpsItems. For more information, see Set up OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 *
 * Operations engineers and IT professionals use Amazon Web Services Systems Manager OpsCenter to view, investigate, and
 * remediate operational issues impacting the performance and health of their Amazon Web Services resources. For
 * more information, see Amazon Web Services Systems Manager OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const describeOpsItems: API.PaginatedOperationMethod<
  DescribeOpsItemsRequest & RegionInput,
  DescribeOpsItemsResponse,
  DescribeOpsItemsError,
  Creds | HttpClient.HttpClient,
  OpsItemSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1648, __c103, 0) as any as S.Schema<DescribeOpsItemsRequest>,
  output: __S(1651, __c103, 3) as any as S.Schema<DescribeOpsItemsResponse>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOpsItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OpsItemSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeOpsItems",
})) as any;

export type DescribeParametersError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidFilterOption
  | InvalidFilterValue
  | InvalidNextToken
  | CommonErrors;
/**
 * Lists the parameters in your Amazon Web Services account or the parameters shared with you when you enable
 * the Shared option.
 *
 * Request results are returned on a best-effort basis. If you specify `MaxResults`
 * in the request, the response includes information up to the limit specified. The number of items
 * returned, however, can be between zero and the value of `MaxResults`. If the service
 * reaches an internal limit while processing the results, it stops the operation and returns the
 * matching values up to that point and a `NextToken`. You can specify the
 * `NextToken` in a subsequent call to get the next set of results.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 *
 * If you change the KMS key alias for the KMS key used to encrypt a parameter,
 * then you must also update the key alias the parameter uses to reference KMS. Otherwise,
 * `DescribeParameters` retrieves whatever the original key alias was
 * referencing.
 */
export const describeParameters: API.PaginatedOperationMethod<
  DescribeParametersRequest & RegionInput,
  DescribeParametersResult,
  DescribeParametersError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1680, __c105, 0) as any as S.Schema<DescribeParametersRequest>,
  output: __S(1683, __c105, 3) as any as S.Schema<DescribeParametersResult>,
  errors: [
    InternalServerError,
    InvalidFilterKey,
    InvalidFilterOption,
    InvalidFilterValue,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeParameters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeParameters",
})) as any;

export type DescribePatchBaselinesError = InternalServerError | CommonErrors;
/**
 * Lists the patch baselines in your Amazon Web Services account.
 */
export const describePatchBaselines: API.PaginatedOperationMethod<
  DescribePatchBaselinesRequest & RegionInput,
  DescribePatchBaselinesResult,
  DescribePatchBaselinesError,
  Creds | HttpClient.HttpClient,
  PatchBaselineIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1728, __c108, 0) as any as S.Schema<DescribePatchBaselinesRequest>,
  output: __S(1730, __c108, 2) as any as S.Schema<DescribePatchBaselinesResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePatchBaselines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BaselineIdentities",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribePatchBaselines",
})) as any;

export type DescribePatchGroupsError = InternalServerError | CommonErrors;
/**
 * Lists all patch groups that have been registered with patch baselines.
 */
export const describePatchGroups: API.PaginatedOperationMethod<
  DescribePatchGroupsRequest & RegionInput,
  DescribePatchGroupsResult,
  DescribePatchGroupsError,
  Creds | HttpClient.HttpClient,
  PatchGroupPatchBaselineMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1760, __c110, 0) as any as S.Schema<DescribePatchGroupsRequest>,
  output: __S(1763, __c110, 3) as any as S.Schema<DescribePatchGroupsResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePatchGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Mappings",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribePatchGroups",
})) as any;

export type DescribePatchGroupStateError = InternalServerError | InvalidNextToken | CommonErrors;
/**
 * Returns high-level aggregated patch compliance state information for a patch group.
 */
export const describePatchGroupState: API.OperationMethod<
  DescribePatchGroupStateRequest & RegionInput,
  DescribePatchGroupStateResult,
  DescribePatchGroupStateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1776, __c111, 0) as any as S.Schema<DescribePatchGroupStateRequest>,
  output: __S(1777, __c111, 1) as any as S.Schema<DescribePatchGroupStateResult>,
  errors: [InternalServerError, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePatchGroupState",
  telemetry: TELEMETRY,
  span: "DescribePatchGroupState",
}));

export type DescribePatchPropertiesError = InternalServerError | CommonErrors;
/**
 * Lists the properties of available patches organized by product, product family,
 * classification, severity, and other properties of available patches. You can use the reported
 * properties in the filters you specify in requests for operations such as CreatePatchBaseline, UpdatePatchBaseline, DescribeAvailablePatches, and DescribePatchBaselines.
 *
 * The following section lists the properties that can be used in filters for each major
 * operating system type:
 *
 * ### AMAZON_LINUX
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### AMAZON_LINUX_2
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### AMAZON_LINUX_2023
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### CENTOS
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### DEBIAN
 *
 * Valid properties: `PRODUCT` | `PRIORITY`
 *
 * ### MACOS
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION`
 *
 * ### ORACLE_LINUX
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### REDHAT_ENTERPRISE_LINUX
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### SUSE
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### UBUNTU
 *
 * Valid properties: `PRODUCT` | `PRIORITY`
 *
 * ### WINDOWS
 *
 * Valid properties: `PRODUCT` | `PRODUCT_FAMILY` |
 * `CLASSIFICATION` | `MSRC_SEVERITY`
 */
export const describePatchProperties: API.PaginatedOperationMethod<
  DescribePatchPropertiesRequest & RegionInput,
  DescribePatchPropertiesResult,
  DescribePatchPropertiesError,
  Creds | HttpClient.HttpClient,
  { [key: string]: string | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1792, __c112, 0) as any as S.Schema<DescribePatchPropertiesRequest>,
  output: __S(1793, __c112, 1) as any as S.Schema<DescribePatchPropertiesResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePatchProperties",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Properties",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribePatchProperties",
})) as any;

export type DescribeSessionsError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieves a list of all active sessions (both connected and disconnected) or terminated
 * sessions from the past 30 days.
 */
export const describeSessions: API.PaginatedOperationMethod<
  DescribeSessionsRequest & RegionInput,
  DescribeSessionsResponse,
  DescribeSessionsError,
  Creds | HttpClient.HttpClient,
  Session
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1824, __c114, 0) as any as S.Schema<DescribeSessionsRequest>,
  output: __S(1828, __c114, 4) as any as S.Schema<DescribeSessionsResponse>,
  errors: [InternalServerError, InvalidFilterKey, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Sessions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeSessions",
})) as any;

export type DisassociateOpsItemRelatedItemError =
  | InternalServerError
  | OpsItemConflictException
  | OpsItemInvalidParameterException
  | OpsItemNotFoundException
  | OpsItemRelatedItemAssociationNotFoundException
  | CommonErrors;
/**
 * Deletes the association between an OpsItem and a related item. For example, this API
 * operation can delete an Incident Manager incident from an OpsItem. Incident Manager is a tool in
 * Amazon Web Services Systems Manager.
 */
export const disassociateOpsItemRelatedItem: API.OperationMethod<
  DisassociateOpsItemRelatedItemRequest & RegionInput,
  DisassociateOpsItemRelatedItemResponse,
  DisassociateOpsItemRelatedItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1872, __c117, 0) as any as S.Schema<DisassociateOpsItemRelatedItemRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DisassociateOpsItemRelatedItemResponse>,
  errors: [
    InternalServerError,
    OpsItemConflictException,
    OpsItemInvalidParameterException,
    OpsItemNotFoundException,
    OpsItemRelatedItemAssociationNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateOpsItemRelatedItem",
  telemetry: TELEMETRY,
  span: "DisassociateOpsItemRelatedItem",
}));

export type GetAccessTokenError =
  | AccessDeniedException
  | InternalServerError
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a credentials set to be used with just-in-time node access.
 */
export const getAccessToken: API.OperationMethod<
  GetAccessTokenRequest & RegionInput,
  GetAccessTokenResponse,
  GetAccessTokenError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c118, 0) as any as S.Schema<GetAccessTokenRequest>,
  output: __S(1890, __c118, 2) as any as S.Schema<GetAccessTokenResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessToken",
  telemetry: TELEMETRY,
  span: "GetAccessToken",
}));

export type GetAutomationExecutionError =
  | AutomationExecutionNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Get detailed information about a particular Automation execution.
 */
export const getAutomationExecution: API.OperationMethod<
  GetAutomationExecutionRequest & RegionInput,
  GetAutomationExecutionResult,
  GetAutomationExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1904, __c119, 0) as any as S.Schema<GetAutomationExecutionRequest>,
  output: __S(1907, __c119, 3) as any as S.Schema<GetAutomationExecutionResult>,
  errors: [AutomationExecutionNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomationExecution",
  telemetry: TELEMETRY,
  span: "GetAutomationExecution",
}));

export type GetCalendarStateError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentType
  | UnsupportedCalendarException
  | CommonErrors;
/**
 * Gets the state of a Amazon Web Services Systems Manager change calendar at the current time or a specified time. If
 * you specify a time, `GetCalendarState` returns the state of the calendar at that
 * specific time, and returns the next time that the change calendar state will transition. If you
 * don't specify a time, `GetCalendarState` uses the current time. Change Calendar
 * entries have two possible states: `OPEN` or `CLOSED`.
 *
 * If you specify more than one calendar in a request, the command returns the status of
 * `OPEN` only if all calendars in the request are open. If one or more calendars in the
 * request are closed, the status returned is `CLOSED`.
 *
 * For more information about Change Calendar, a tool in Amazon Web Services Systems Manager, see Amazon Web Services Systems Manager Change Calendar in the *Amazon Web Services Systems Manager User Guide*.
 */
export const getCalendarState: API.OperationMethod<
  GetCalendarStateRequest & RegionInput,
  GetCalendarStateResponse,
  GetCalendarStateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c120, 0) as any as S.Schema<GetCalendarStateRequest>,
  output: __S(1921, __c120, 1) as any as S.Schema<GetCalendarStateResponse>,
  errors: [InternalServerError, InvalidDocument, InvalidDocumentType, UnsupportedCalendarException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalendarState",
  telemetry: TELEMETRY,
  span: "GetCalendarState",
}));

export type GetCloudConnectorError = InternalServerError | ResourceNotFoundException | CommonErrors;
/**
 * Returns detailed information about a cloud connector.
 */
export const getCloudConnector: API.OperationMethod<
  GetCloudConnectorRequest & RegionInput,
  GetCloudConnectorResult,
  GetCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1936, __c121, 0) as any as S.Schema<GetCloudConnectorRequest>,
  output: __S(1937, __c121, 1) as any as S.Schema<GetCloudConnectorResult>,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudConnector",
  telemetry: TELEMETRY,
  span: "GetCloudConnector",
}));

export type GetCommandInvocationError =
  | InternalServerError
  | InvalidCommandId
  | InvalidInstanceId
  | InvalidPluginName
  | InvocationDoesNotExist
  | CommonErrors;
/**
 * Returns detailed information about command execution for an invocation or plugin. The Run
 * Command API follows an eventual consistency model, due to the distributed nature of the system
 * supporting the API. This means that the result of an API command you run that affects your
 * resources might not be immediately visible to all subsequent commands you run. You should keep
 * this in mind when you carry out an API command that immediately follows a previous API
 * command.
 *
 * `GetCommandInvocation` only gives the execution status of a plugin in a document.
 * To get the command execution status on a specific managed node, use ListCommandInvocations. To get the command execution status across managed nodes,
 * use ListCommands.
 */
export const getCommandInvocation: API.OperationMethod<
  GetCommandInvocationRequest & RegionInput,
  GetCommandInvocationResult,
  GetCommandInvocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c122, 0) as any as S.Schema<GetCommandInvocationRequest>,
  output: __S(1953, __c122, 1) as any as S.Schema<GetCommandInvocationResult>,
  errors: [
    InternalServerError,
    InvalidCommandId,
    InvalidInstanceId,
    InvalidPluginName,
    InvocationDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommandInvocation",
  telemetry: TELEMETRY,
  span: "GetCommandInvocation",
}));

export type GetConnectionStatusError = InternalServerError | CommonErrors;
/**
 * Retrieves the Session Manager connection status for a managed node to determine whether it is running
 * and ready to receive Session Manager connections.
 */
export const getConnectionStatus: API.OperationMethod<
  GetConnectionStatusRequest & RegionInput,
  GetConnectionStatusResponse,
  GetConnectionStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c124, 0) as any as S.Schema<GetConnectionStatusRequest>,
  output: __S(1985, __c124, 1) as any as S.Schema<GetConnectionStatusResponse>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionStatus",
  telemetry: TELEMETRY,
  span: "GetConnectionStatus",
}));

export type GetDefaultPatchBaselineError = InternalServerError | CommonErrors;
/**
 * Retrieves the default patch baseline. Amazon Web Services Systems Manager supports creating multiple default patch
 * baselines. For example, you can create a default patch baseline for each operating system.
 *
 * If you don't specify an operating system value, the default patch baseline for Windows is
 * returned.
 */
export const getDefaultPatchBaseline: API.OperationMethod<
  GetDefaultPatchBaselineRequest & RegionInput,
  GetDefaultPatchBaselineResult,
  GetDefaultPatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2000, __c125, 0) as any as S.Schema<GetDefaultPatchBaselineRequest>,
  output: __S(2001, __c125, 1) as any as S.Schema<GetDefaultPatchBaselineResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultPatchBaseline",
  telemetry: TELEMETRY,
  span: "GetDefaultPatchBaseline",
}));

export type GetDeployablePatchSnapshotForInstanceError =
  | InternalServerError
  | UnsupportedFeatureRequiredException
  | UnsupportedOperatingSystem
  | CommonErrors;
/**
 * Retrieves the current snapshot for the patch baseline the managed node uses. This API is
 * primarily used by the `AWS-RunPatchBaseline` Systems Manager document (SSM document).
 *
 * If you run the command locally, such as with the Command Line Interface (CLI), the system attempts to use your local Amazon Web Services credentials and the operation fails. To avoid
 * this, you can run the command in the Amazon Web Services Systems Manager console. Use Run Command, a tool in Amazon Web Services Systems Manager,
 * with an SSM document that enables you to target a managed node with a script or command. For
 * example, run the command using the `AWS-RunShellScript` document or the
 * `AWS-RunPowerShellScript` document.
 */
export const getDeployablePatchSnapshotForInstance: API.OperationMethod<
  GetDeployablePatchSnapshotForInstanceRequest & RegionInput,
  GetDeployablePatchSnapshotForInstanceResult,
  GetDeployablePatchSnapshotForInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2017, __c126, 1) as any as S.Schema<GetDeployablePatchSnapshotForInstanceRequest>,
  output: __S(2018, __c126, 2) as any as S.Schema<GetDeployablePatchSnapshotForInstanceResult>,
  errors: [InternalServerError, UnsupportedFeatureRequiredException, UnsupportedOperatingSystem],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployablePatchSnapshotForInstance",
  telemetry: TELEMETRY,
  span: "GetDeployablePatchSnapshotForInstance",
}));

export type GetDocumentError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | CommonErrors;
/**
 * Gets the contents of the specified Amazon Web Services Systems Manager document (SSM document).
 */
export const getDocument: API.OperationMethod<
  GetDocumentRequest & RegionInput,
  GetDocumentResult,
  GetDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2032, __c127, 0) as any as S.Schema<GetDocumentRequest>,
  output: __S(2035, __c127, 3) as any as S.Schema<GetDocumentResult>,
  errors: [InternalServerError, InvalidDocument, InvalidDocumentVersion],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocument",
  telemetry: TELEMETRY,
  span: "GetDocument",
}));

export type GetExecutionPreviewError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Initiates the process of retrieving an existing preview that shows the effects that running
 * a specified Automation runbook would have on the targeted resources.
 */
export const getExecutionPreview: API.OperationMethod<
  GetExecutionPreviewRequest & RegionInput,
  GetExecutionPreviewResponse,
  GetExecutionPreviewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c128, 0) as any as S.Schema<GetExecutionPreviewRequest>,
  output: __S(2054, __c128, 6) as any as S.Schema<GetExecutionPreviewResponse>,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExecutionPreview",
  telemetry: TELEMETRY,
  span: "GetExecutionPreview",
}));

export type GetInventoryError =
  | InternalServerError
  | InvalidAggregatorException
  | InvalidFilter
  | InvalidInventoryGroupException
  | InvalidNextToken
  | InvalidResultAttributeException
  | InvalidTypeNameException
  | CommonErrors;
/**
 * Query inventory information. This includes managed node status, such as `Stopped`
 * or `Terminated`.
 */
export const getInventory: API.PaginatedOperationMethod<
  GetInventoryRequest & RegionInput,
  GetInventoryResult,
  GetInventoryError,
  Creds | HttpClient.HttpClient,
  InventoryResultEntity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2069, __c129, 5) as any as S.Schema<GetInventoryRequest>,
  output: __S(2074, __c129, 10) as any as S.Schema<GetInventoryResult>,
  errors: [
    InternalServerError,
    InvalidAggregatorException,
    InvalidFilter,
    InvalidInventoryGroupException,
    InvalidNextToken,
    InvalidResultAttributeException,
    InvalidTypeNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInventory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entities",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetInventory",
})) as any;

export type GetInventorySchemaError =
  | InternalServerError
  | InvalidNextToken
  | InvalidTypeNameException
  | CommonErrors;
/**
 * Return a list of inventory type names for the account, or return a list of attribute names
 * for a specific Inventory item type.
 */
export const getInventorySchema: API.PaginatedOperationMethod<
  GetInventorySchemaRequest & RegionInput,
  GetInventorySchemaResult,
  GetInventorySchemaError,
  Creds | HttpClient.HttpClient,
  InventoryItemSchema
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2144, __c134, 0) as any as S.Schema<GetInventorySchemaRequest>,
  output: __S(2149, __c134, 5) as any as S.Schema<GetInventorySchemaResult>,
  errors: [InternalServerError, InvalidNextToken, InvalidTypeNameException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInventorySchema",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schemas",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetInventorySchema",
})) as any;

export type GetMaintenanceWindowError = DoesNotExistException | InternalServerError | CommonErrors;
/**
 * Retrieves a maintenance window.
 */
export const getMaintenanceWindow: API.OperationMethod<
  GetMaintenanceWindowRequest & RegionInput,
  GetMaintenanceWindowResult,
  GetMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2160, __c135, 0) as any as S.Schema<GetMaintenanceWindowRequest>,
  output: __S(2161, __c135, 1) as any as S.Schema<GetMaintenanceWindowResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindow",
  telemetry: TELEMETRY,
  span: "GetMaintenanceWindow",
}));

export type GetMaintenanceWindowExecutionError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves details about a specific a maintenance window execution.
 */
export const getMaintenanceWindowExecution: API.OperationMethod<
  GetMaintenanceWindowExecutionRequest & RegionInput,
  GetMaintenanceWindowExecutionResult,
  GetMaintenanceWindowExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c136, 0) as any as S.Schema<GetMaintenanceWindowExecutionRequest>,
  output: __S(2177, __c136, 1) as any as S.Schema<GetMaintenanceWindowExecutionResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowExecution",
  telemetry: TELEMETRY,
  span: "GetMaintenanceWindowExecution",
}));

export type GetMaintenanceWindowExecutionTaskError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the details about a specific task run as part of a maintenance window
 * execution.
 */
export const getMaintenanceWindowExecutionTask: API.OperationMethod<
  GetMaintenanceWindowExecutionTaskRequest & RegionInput,
  GetMaintenanceWindowExecutionTaskResult,
  GetMaintenanceWindowExecutionTaskError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2192, __c137, 0) as any as S.Schema<GetMaintenanceWindowExecutionTaskRequest>,
  output: __S(2194, __c137, 2) as any as S.Schema<GetMaintenanceWindowExecutionTaskResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowExecutionTask",
  telemetry: TELEMETRY,
  span: "GetMaintenanceWindowExecutionTask",
}));

export type GetMaintenanceWindowExecutionTaskInvocationError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves information about a specific task running on a specific target.
 */
export const getMaintenanceWindowExecutionTaskInvocation: API.OperationMethod<
  GetMaintenanceWindowExecutionTaskInvocationRequest & RegionInput,
  GetMaintenanceWindowExecutionTaskInvocationResult,
  GetMaintenanceWindowExecutionTaskInvocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    2208,
    __c138,
    0,
  ) as any as S.Schema<GetMaintenanceWindowExecutionTaskInvocationRequest>,
  output: __S(
    2209,
    __c138,
    1,
  ) as any as S.Schema<GetMaintenanceWindowExecutionTaskInvocationResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowExecutionTaskInvocation",
  telemetry: TELEMETRY,
  span: "GetMaintenanceWindowExecutionTaskInvocation",
}));

export type GetMaintenanceWindowTaskError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the details of a maintenance window task.
 *
 * For maintenance window tasks without a specified target, you can't supply values for
 * `--max-errors` and `--max-concurrency`. Instead, the system inserts a
 * placeholder value of `1`, which may be reported in the response to this command.
 * These values don't affect the running of your task and can be ignored.
 *
 * To retrieve a list of tasks in a maintenance window, instead use the DescribeMaintenanceWindowTasks command.
 */
export const getMaintenanceWindowTask: API.OperationMethod<
  GetMaintenanceWindowTaskRequest & RegionInput,
  GetMaintenanceWindowTaskResult,
  GetMaintenanceWindowTaskError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2224, __c139, 0) as any as S.Schema<GetMaintenanceWindowTaskRequest>,
  output: __S(2225, __c139, 1) as any as S.Schema<GetMaintenanceWindowTaskResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowTask",
  telemetry: TELEMETRY,
  span: "GetMaintenanceWindowTask",
}));

export type GetOpsItemError =
  | InternalServerError
  | OpsItemAccessDeniedException
  | OpsItemNotFoundException
  | CommonErrors;
/**
 * Get information about an OpsItem by using the ID. You must have permission in Identity and Access Management (IAM) to view information about an OpsItem. For more information,
 * see Set
 * up OpsCenter in the *Amazon Web Services Systems Manager User Guide*.
 *
 * Operations engineers and IT professionals use Amazon Web Services Systems Manager OpsCenter to view, investigate, and
 * remediate operational issues impacting the performance and health of their Amazon Web Services resources. For
 * more information, see Amazon Web Services Systems Manager OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const getOpsItem: API.OperationMethod<
  GetOpsItemRequest & RegionInput,
  GetOpsItemResponse,
  GetOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c142, 0) as any as S.Schema<GetOpsItemRequest>,
  output: __S(2274, __c142, 2) as any as S.Schema<GetOpsItemResponse>,
  errors: [InternalServerError, OpsItemAccessDeniedException, OpsItemNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpsItem",
  telemetry: TELEMETRY,
  span: "GetOpsItem",
}));

export type GetOpsMetadataError =
  | InternalServerError
  | OpsMetadataInvalidArgumentException
  | OpsMetadataNotFoundException
  | CommonErrors;
/**
 * View operational metadata related to an application in Application Manager.
 */
export const getOpsMetadata: API.OperationMethod<
  GetOpsMetadataRequest & RegionInput,
  GetOpsMetadataResult,
  GetOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2288, __c143, 0) as any as S.Schema<GetOpsMetadataRequest>,
  output: __S(2289, __c143, 1) as any as S.Schema<GetOpsMetadataResult>,
  errors: [InternalServerError, OpsMetadataInvalidArgumentException, OpsMetadataNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpsMetadata",
  telemetry: TELEMETRY,
  span: "GetOpsMetadata",
}));

export type GetOpsSummaryError =
  | InternalServerError
  | InvalidAggregatorException
  | InvalidFilter
  | InvalidNextToken
  | InvalidTypeNameException
  | ResourceDataSyncNotFoundException
  | CommonErrors;
/**
 * View a summary of operations metadata (OpsData) based on specified filters and aggregators.
 * OpsData can include information about Amazon Web Services Systems Manager OpsCenter operational workitems (OpsItems) as
 * well as information about any Amazon Web Services resource or service configured to report OpsData to Amazon Web Services Systems Manager
 * Explorer.
 */
export const getOpsSummary: API.PaginatedOperationMethod<
  GetOpsSummaryRequest & RegionInput,
  GetOpsSummaryResult,
  GetOpsSummaryError,
  Creds | HttpClient.HttpClient,
  OpsEntity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2308, __c144, 4) as any as S.Schema<GetOpsSummaryRequest>,
  output: __S(2313, __c144, 9) as any as S.Schema<GetOpsSummaryResult>,
  errors: [
    InternalServerError,
    InvalidAggregatorException,
    InvalidFilter,
    InvalidNextToken,
    InvalidTypeNameException,
    ResourceDataSyncNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpsSummary",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entities",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetOpsSummary",
})) as any;

export type GetParameterError =
  | InternalServerError
  | InvalidKeyId
  | ParameterNotFound
  | ParameterVersionNotFound
  | CommonErrors;
/**
 * Get information about a single parameter by specifying the parameter name.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 *
 * To get information about more than one parameter at a time, use the GetParameters operation.
 *
 * This operation is authorized against the `ssm:GetParameter` action. Denying that
 * action alone doesn't restrict GetParameters, GetParameterHistory, or GetParametersByPath, each of which is
 * authorized against its own action. For more information, see How Parameter Store
 * authorizes parameter retrieval in the *Amazon Web Services Systems Manager User Guide*.
 *
 * Parameter Store throughput defines the number of API transactions per second (TPS) that
 * Systems Manager can process. This applies to `GetParameter`,
 * `GetParameters`, and `PutParameter` API calls for your Amazon Web Services account and
 * Amazon Web Services Region. By default, Parameter Store is configured with a standard throughput quota suitable
 * for low- to moderate-volume workloads. Applications that retrieve configuration data infrequently
 * or operate at smaller scale can use this default setting without additional cost.
 *
 * For higher-volume workloads, you can enable higher throughput. This increases the maximum
 * number of supported transactions per second for your account and Region. Increased throughput
 * supports applications and workloads that need concurrent access to multiple parameters. If you
 * experience `ThrottlingException: Rate exceeded` errors, enable higher throughput. For
 * more information, see Changing Parameter Store
 * throughput.
 */
export const getParameter: API.OperationMethod<
  GetParameterRequest & RegionInput,
  GetParameterResult,
  GetParameterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2320, __c145, 0) as any as S.Schema<GetParameterRequest>,
  output: __S(2321, __c145, 1) as any as S.Schema<GetParameterResult>,
  errors: [InternalServerError, InvalidKeyId, ParameterNotFound, ParameterVersionNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParameter",
  telemetry: TELEMETRY,
  span: "GetParameter",
}));

export type GetParameterHistoryError =
  | InternalServerError
  | InvalidKeyId
  | InvalidNextToken
  | ParameterNotFound
  | CommonErrors;
/**
 * Retrieves the history of all changes to a parameter.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 *
 * If you change the KMS key alias for the KMS key used to encrypt a parameter,
 * then you must also update the key alias the parameter uses to reference KMS. Otherwise,
 * `GetParameterHistory` retrieves whatever the original key alias was
 * referencing.
 *
 * This operation is authorized against the `ssm:GetParameterHistory` action, not
 * against `ssm:GetParameter`. Because parameter history includes every version of a
 * parameter, including the current one, a principal who is denied
 * `ssm:GetParameter`, `ssm:GetParameters`, and
 * `ssm:GetParametersByPath` but allowed `ssm:GetParameterHistory` can still
 * read the current value. To restrict access to a parameter value, deny every action that can
 * return it. For more information, see
 * How Parameter Store
 * authorizes parameter retrieval in the *Amazon Web Services Systems Manager User Guide*.
 */
export const getParameterHistory: API.PaginatedOperationMethod<
  GetParameterHistoryRequest & RegionInput,
  GetParameterHistoryResult,
  GetParameterHistoryError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2352, __c147, 0) as any as S.Schema<GetParameterHistoryRequest>,
  output: __S(2355, __c147, 3) as any as S.Schema<GetParameterHistoryResult>,
  errors: [InternalServerError, InvalidKeyId, InvalidNextToken, ParameterNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParameterHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetParameterHistory",
})) as any;

export type GetParametersError = InternalServerError | InvalidKeyId | CommonErrors;
/**
 * Get information about one or more parameters by specifying multiple parameter names.
 *
 * To get information about a single parameter, you can use the GetParameter
 * operation instead.
 *
 * This operation is authorized against the `ssm:GetParameters` action, not against
 * `ssm:GetParameter`. Denying `ssm:GetParameter` for a parameter doesn't
 * prevent a principal from retrieving that parameter with this operation. To restrict access to a
 * parameter value, deny every action that can return it. For more information, see How Parameter Store
 * authorizes parameter retrieval in the *Amazon Web Services Systems Manager User Guide*.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 *
 * Parameter Store throughput defines the number of API transactions per second (TPS) that
 * Systems Manager can process. This applies to `GetParameter`,
 * `GetParameters`, and `PutParameter` API calls for your Amazon Web Services account and
 * Amazon Web Services Region. By default, Parameter Store is configured with a standard throughput quota suitable
 * for low- to moderate-volume workloads. Applications that retrieve configuration data infrequently
 * or operate at smaller scale can use this default setting without additional cost.
 *
 * For higher-volume workloads, you can enable higher throughput. This increases the maximum
 * number of supported transactions per second for your account and Region. Increased throughput
 * supports applications and workloads that need concurrent access to multiple parameters. If you
 * experience `ThrottlingException: Rate exceeded` errors, enable higher throughput. For
 * more information, see Changing Parameter Store
 * throughput.
 */
export const getParameters: API.OperationMethod<
  GetParametersRequest & RegionInput,
  GetParametersResult,
  GetParametersError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c148, 0) as any as S.Schema<GetParametersRequest>,
  output: __S(2369, __c148, 1) as any as S.Schema<GetParametersResult>,
  errors: [InternalServerError, InvalidKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParameters",
  telemetry: TELEMETRY,
  span: "GetParameters",
}));

export type GetParametersByPathError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidFilterOption
  | InvalidFilterValue
  | InvalidKeyId
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieve information about one or more parameters under a specified level in a hierarchy.
 *
 * This operation is authorized against the `ssm:GetParametersByPath` action for
 * the path that you specify in the request. It isn't authorized against the individual parameters
 * that it returns, and it isn't authorized against `ssm:GetParameter`. A principal who
 * is allowed to call this operation for the path `/a` with `Recursive` set
 * to `true` receives every parameter under that path, including `/a/b`,
 * even if a policy explicitly denies access to `/a/b`.
 *
 * To prevent a parameter from being returned by this operation, deny the
 * `ssm:GetParametersByPath` action on every ancestor path that could include the
 * parameter in its results. For more information, see Restricting access to
 * specific parameters and paths in the *Amazon Web Services Systems Manager User Guide*.
 *
 * Request results are returned on a best-effort basis. If you specify `MaxResults`
 * in the request, the response includes information up to the limit specified. The number of items
 * returned, however, can be between zero and the value of `MaxResults`. If the service
 * reaches an internal limit while processing the results, it stops the operation and returns the
 * matching values up to that point and a `NextToken`. You can specify the
 * `NextToken` in a subsequent call to get the next set of results.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 */
export const getParametersByPath: API.PaginatedOperationMethod<
  GetParametersByPathRequest & RegionInput,
  GetParametersByPathResult,
  GetParametersByPathError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2400, __c150, 0) as any as S.Schema<GetParametersByPathRequest>,
  output: __S(2401, __c150, 1) as any as S.Schema<GetParametersByPathResult>,
  errors: [
    InternalServerError,
    InvalidFilterKey,
    InvalidFilterOption,
    InvalidFilterValue,
    InvalidKeyId,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParametersByPath",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetParametersByPath",
})) as any;

export type GetPatchBaselineError =
  | DoesNotExistException
  | InternalServerError
  | InvalidResourceId
  | CommonErrors;
/**
 * Retrieves information about a patch baseline.
 */
export const getPatchBaseline: API.OperationMethod<
  GetPatchBaselineRequest & RegionInput,
  GetPatchBaselineResult,
  GetPatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2416, __c151, 0) as any as S.Schema<GetPatchBaselineRequest>,
  output: __S(2417, __c151, 1) as any as S.Schema<GetPatchBaselineResult>,
  errors: [DoesNotExistException, InternalServerError, InvalidResourceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPatchBaseline",
  telemetry: TELEMETRY,
  span: "GetPatchBaseline",
}));

export type GetPatchBaselineForPatchGroupError = InternalServerError | CommonErrors;
/**
 * Retrieves the patch baseline that should be used for the specified patch group.
 */
export const getPatchBaselineForPatchGroup: API.OperationMethod<
  GetPatchBaselineForPatchGroupRequest & RegionInput,
  GetPatchBaselineForPatchGroupResult,
  GetPatchBaselineForPatchGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c152, 0) as any as S.Schema<GetPatchBaselineForPatchGroupRequest>,
  output: __S(2433, __c152, 1) as any as S.Schema<GetPatchBaselineForPatchGroupResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPatchBaselineForPatchGroup",
  telemetry: TELEMETRY,
  span: "GetPatchBaselineForPatchGroup",
}));

export type GetResourcePoliciesError =
  | InternalServerError
  | ResourceNotFoundException
  | ResourcePolicyInvalidParameterException
  | CommonErrors;
/**
 * Returns an array of the `Policy` object.
 */
export const getResourcePolicies: API.PaginatedOperationMethod<
  GetResourcePoliciesRequest & RegionInput,
  GetResourcePoliciesResponse,
  GetResourcePoliciesError,
  Creds | HttpClient.HttpClient,
  GetResourcePoliciesResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2448, __c153, 0) as any as S.Schema<GetResourcePoliciesRequest>,
  output: __S(2451, __c153, 3) as any as S.Schema<GetResourcePoliciesResponse>,
  errors: [InternalServerError, ResourceNotFoundException, ResourcePolicyInvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Policies",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetResourcePolicies",
})) as any;

export type GetServiceSettingError = InternalServerError | ServiceSettingNotFound | CommonErrors;
/**
 * `ServiceSetting` is an account-level setting for an Amazon Web Services service. This setting
 * defines how a user interacts with or uses a service or a feature of a service. For example, if an
 * Amazon Web Services service charges money to the account based on feature or service usage, then the Amazon Web Services
 * service team might create a default setting of `false`. This means the user can't use
 * this feature unless they change the setting to `true` and intentionally opt in for a
 * paid feature.
 *
 * Services map a `SettingId` object to a setting value. Amazon Web Services services teams define
 * the default value for a `SettingId`. You can't create a new `SettingId`,
 * but you can overwrite the default value if you have the `ssm:UpdateServiceSetting`
 * permission for the setting. Use the UpdateServiceSetting API operation to
 * change the default setting. Or use the ResetServiceSetting to change the value
 * back to the original value defined by the Amazon Web Services service team.
 *
 * Query the current service setting for the Amazon Web Services account.
 */
export const getServiceSetting: API.OperationMethod<
  GetServiceSettingRequest & RegionInput,
  GetServiceSettingResult,
  GetServiceSettingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c154, 0) as any as S.Schema<GetServiceSettingRequest>,
  output: __S(2481, __c155, 1) as any as S.Schema<GetServiceSettingResult>,
  errors: [InternalServerError, ServiceSettingNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSetting",
  telemetry: TELEMETRY,
  span: "GetServiceSetting",
}));

export type LabelParameterVersionError =
  | InternalServerError
  | ParameterNotFound
  | ParameterVersionLabelLimitExceeded
  | ParameterVersionNotFound
  | TooManyUpdates
  | CommonErrors;
/**
 * A parameter label is a user-defined alias to help you manage different versions of a
 * parameter. When you modify a parameter, Amazon Web Services Systems Manager automatically saves a new version and
 * increments the version number by one. A label can help you remember the purpose of a parameter
 * when there are multiple versions.
 *
 * Parameter labels have the following requirements and restrictions.
 *
 * - A version of a parameter can have a maximum of 10 labels.
 *
 * - You can't attach the same label to different versions of the same parameter. For example,
 * if version 1 has the label Production, then you can't attach Production to version 2.
 *
 * - You can move a label from one version of a parameter to another.
 *
 * - You can't create a label when you create a new parameter. You must attach a label to a
 * specific version of a parameter.
 *
 * - If you no longer want to use a parameter label, then you can either delete it or move it
 * to a different version of a parameter.
 *
 * - A label can have a maximum of 100 characters.
 *
 * - Labels can contain letters (case sensitive), numbers, periods (.), hyphens (-), or
 * underscores (_).
 *
 * - Labels can't begin with a number, "`aws`" or "`ssm`" (not case
 * sensitive). If a label fails to meet these requirements, then the label isn't associated with a
 * parameter and the system displays it in the list of InvalidLabels.
 *
 * - Parameter names can't contain spaces. The service removes any spaces specified for
 * the beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 */
export const labelParameterVersion: API.OperationMethod<
  LabelParameterVersionRequest & RegionInput,
  LabelParameterVersionResult,
  LabelParameterVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c156, 0) as any as S.Schema<LabelParameterVersionRequest>,
  output: __S(2497, __c156, 1) as any as S.Schema<LabelParameterVersionResult>,
  errors: [
    InternalServerError,
    ParameterNotFound,
    ParameterVersionLabelLimitExceeded,
    ParameterVersionNotFound,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LabelParameterVersion",
  telemetry: TELEMETRY,
  span: "LabelParameterVersion",
}));

export type ListAssociationsError = InternalServerError | InvalidNextToken | CommonErrors;
/**
 * Returns all State Manager associations in the current Amazon Web Services account and Amazon Web Services Region. You
 * can limit the results to a specific State Manager association document or managed node by
 * specifying a filter. State Manager is a tool in Amazon Web Services Systems Manager.
 */
export const listAssociations: API.PaginatedOperationMethod<
  ListAssociationsRequest & RegionInput,
  ListAssociationsResult,
  ListAssociationsError,
  Creds | HttpClient.HttpClient,
  Association
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2513, __c157, 1) as any as S.Schema<ListAssociationsRequest>,
  output: __S(2516, __c157, 4) as any as S.Schema<ListAssociationsResult>,
  errors: [InternalServerError, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Associations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAssociations",
})) as any;

export type ListAssociationVersionsError =
  | AssociationDoesNotExist
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieves all versions of an association for a specific association ID.
 */
export const listAssociationVersions: API.PaginatedOperationMethod<
  ListAssociationVersionsRequest & RegionInput,
  ListAssociationVersionsResult,
  ListAssociationVersionsError,
  Creds | HttpClient.HttpClient,
  AssociationVersionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2528, __c158, 0) as any as S.Schema<ListAssociationVersionsRequest>,
  output: __S(2531, __c158, 3) as any as S.Schema<ListAssociationVersionsResult>,
  errors: [AssociationDoesNotExist, InternalServerError, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociationVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssociationVersions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAssociationVersions",
})) as any;

export type ListCloudConnectorsError = InternalServerError | CommonErrors;
/**
 * Returns a list of cloud connectors in the current Amazon Web Services account and Amazon Web Services Region.
 */
export const listCloudConnectors: API.PaginatedOperationMethod<
  ListCloudConnectorsRequest & RegionInput,
  ListCloudConnectorsResult,
  ListCloudConnectorsError,
  Creds | HttpClient.HttpClient,
  CloudConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2544, __c159, 0) as any as S.Schema<ListCloudConnectorsRequest>,
  output: __S(2547, __c159, 3) as any as S.Schema<ListCloudConnectorsResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CloudConnectors",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCloudConnectors",
})) as any;

export type ListCommandInvocationsError =
  | InternalServerError
  | InvalidCommandId
  | InvalidFilterKey
  | InvalidInstanceId
  | InvalidNextToken
  | CommonErrors;
/**
 * An invocation is copy of a command sent to a specific managed node. A command can apply to
 * one or more managed nodes. A command invocation applies to one managed node. For example, if a
 * user runs `SendCommand` against three managed nodes, then a command invocation is
 * created for each requested managed node ID. `ListCommandInvocations` provide status
 * about command execution.
 */
export const listCommandInvocations: API.PaginatedOperationMethod<
  ListCommandInvocationsRequest & RegionInput,
  ListCommandInvocationsResult,
  ListCommandInvocationsError,
  Creds | HttpClient.HttpClient,
  CommandInvocation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2560, __c160, 0) as any as S.Schema<ListCommandInvocationsRequest>,
  output: __S(2565, __c160, 5) as any as S.Schema<ListCommandInvocationsResult>,
  errors: [
    InternalServerError,
    InvalidCommandId,
    InvalidFilterKey,
    InvalidInstanceId,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommandInvocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CommandInvocations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCommandInvocations",
})) as any;

export type ListCommandsError =
  | InternalServerError
  | InvalidCommandId
  | InvalidFilterKey
  | InvalidInstanceId
  | InvalidNextToken
  | CommonErrors;
/**
 * Lists the commands requested by users of the Amazon Web Services account.
 */
export const listCommands: API.PaginatedOperationMethod<
  ListCommandsRequest & RegionInput,
  ListCommandsResult,
  ListCommandsError,
  Creds | HttpClient.HttpClient,
  Command
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2576, __c161, 0) as any as S.Schema<ListCommandsRequest>,
  output: __S(2578, __c161, 2) as any as S.Schema<ListCommandsResult>,
  errors: [
    InternalServerError,
    InvalidCommandId,
    InvalidFilterKey,
    InvalidInstanceId,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommands",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Commands",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCommands",
})) as any;

export type ListComplianceItemsError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | InvalidResourceId
  | InvalidResourceType
  | CommonErrors;
/**
 * For a specified resource ID, this API operation returns a list of compliance statuses for
 * different resource types. Currently, you can only specify one resource ID per call. List results
 * depend on the criteria specified in the filter.
 */
export const listComplianceItems: API.PaginatedOperationMethod<
  ListComplianceItemsRequest & RegionInput,
  ListComplianceItemsResult,
  ListComplianceItemsError,
  Creds | HttpClient.HttpClient,
  ComplianceItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2608, __c163, 0) as any as S.Schema<ListComplianceItemsRequest>,
  output: __S(2611, __c163, 3) as any as S.Schema<ListComplianceItemsResult>,
  errors: [
    InternalServerError,
    InvalidFilter,
    InvalidNextToken,
    InvalidResourceId,
    InvalidResourceType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComplianceItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ComplianceItems",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListComplianceItems",
})) as any;

export type ListComplianceSummariesError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | CommonErrors;
/**
 * Returns a summary count of compliant and non-compliant resources for a compliance type. For
 * example, this call can return State Manager associations, patches, or custom compliance types
 * according to the filter criteria that you specify.
 */
export const listComplianceSummaries: API.PaginatedOperationMethod<
  ListComplianceSummariesRequest & RegionInput,
  ListComplianceSummariesResult,
  ListComplianceSummariesError,
  Creds | HttpClient.HttpClient,
  ComplianceSummaryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2656, __c166, 0) as any as S.Schema<ListComplianceSummariesRequest>,
  output: __S(2659, __c166, 3) as any as S.Schema<ListComplianceSummariesResult>,
  errors: [InternalServerError, InvalidFilter, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComplianceSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ComplianceSummaryItems",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListComplianceSummaries",
})) as any;

export type ListDocumentMetadataHistoryError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | InvalidNextToken
  | CommonErrors;
/**
 * Amazon Web Services Systems Manager Change Manager is no longer open to new customers. Existing customers can
 * continue to use the service as normal. For more information, see
 * Amazon Web Services Systems Manager Change Manager availability change.
 *
 * Information about approval reviews for a version of a change template in Change Manager.
 */
export const listDocumentMetadataHistory: API.OperationMethod<
  ListDocumentMetadataHistoryRequest & RegionInput,
  ListDocumentMetadataHistoryResponse,
  ListDocumentMetadataHistoryError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c168, 0) as any as S.Schema<ListDocumentMetadataHistoryRequest>,
  output: __S(2692, __c168, 4) as any as S.Schema<ListDocumentMetadataHistoryResponse>,
  errors: [InternalServerError, InvalidDocument, InvalidDocumentVersion, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocumentMetadataHistory",
  telemetry: TELEMETRY,
  span: "ListDocumentMetadataHistory",
}));

export type ListDocumentsError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidNextToken
  | CommonErrors;
/**
 * Returns all Systems Manager (SSM) documents in the current Amazon Web Services account and Amazon Web Services Region. You can
 * limit the results of this request by using a filter.
 */
export const listDocuments: API.PaginatedOperationMethod<
  ListDocumentsRequest & RegionInput,
  ListDocumentsResult,
  ListDocumentsError,
  Creds | HttpClient.HttpClient,
  DocumentIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2721, __c170, 1) as any as S.Schema<ListDocumentsRequest>,
  output: __S(2724, __c170, 4) as any as S.Schema<ListDocumentsResult>,
  errors: [InternalServerError, InvalidFilterKey, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocuments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DocumentIdentifiers",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDocuments",
})) as any;

export type ListDocumentVersionsError =
  | InternalServerError
  | InvalidDocument
  | InvalidNextToken
  | CommonErrors;
/**
 * List all versions for a document.
 */
export const listDocumentVersions: API.PaginatedOperationMethod<
  ListDocumentVersionsRequest & RegionInput,
  ListDocumentVersionsResult,
  ListDocumentVersionsError,
  Creds | HttpClient.HttpClient,
  DocumentVersionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2736, __c171, 0) as any as S.Schema<ListDocumentVersionsRequest>,
  output: __S(2739, __c171, 3) as any as S.Schema<ListDocumentVersionsResult>,
  errors: [InternalServerError, InvalidDocument, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocumentVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DocumentVersions",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDocumentVersions",
})) as any;

export type ListInventoryEntriesError =
  | InternalServerError
  | InvalidFilter
  | InvalidInstanceId
  | InvalidNextToken
  | InvalidTypeNameException
  | CommonErrors;
/**
 * A list of inventory items returned by the request.
 */
export const listInventoryEntries: API.OperationMethod<
  ListInventoryEntriesRequest & RegionInput,
  ListInventoryEntriesResult,
  ListInventoryEntriesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c172, 0) as any as S.Schema<ListInventoryEntriesRequest>,
  output: __S(2753, __c172, 1) as any as S.Schema<ListInventoryEntriesResult>,
  errors: [
    InternalServerError,
    InvalidFilter,
    InvalidInstanceId,
    InvalidNextToken,
    InvalidTypeNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInventoryEntries",
  telemetry: TELEMETRY,
  span: "ListInventoryEntries",
}));

export type ListNodesError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | ResourceDataSyncNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Takes in filters and returns a list of managed nodes matching the filter criteria.
 */
export const listNodes: API.PaginatedOperationMethod<
  ListNodesRequest & RegionInput,
  ListNodesResult,
  ListNodesError,
  Creds | HttpClient.HttpClient,
  Node
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2768, __c173, 0) as any as S.Schema<ListNodesRequest>,
  output: __S(2774, __c173, 6) as any as S.Schema<ListNodesResult>,
  errors: [
    InternalServerError,
    InvalidFilter,
    InvalidNextToken,
    ResourceDataSyncNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Nodes",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListNodes",
})) as any;

export type ListNodesSummaryError =
  | InternalServerError
  | InvalidAggregatorException
  | InvalidFilter
  | InvalidNextToken
  | ResourceDataSyncNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Generates a summary of managed instance/node metadata based on the filters and aggregators
 * you specify. Results are grouped by the input aggregator you specify.
 */
export const listNodesSummary: API.PaginatedOperationMethod<
  ListNodesSummaryRequest & RegionInput,
  ListNodesSummaryResult,
  ListNodesSummaryError,
  Creds | HttpClient.HttpClient,
  { [key: string]: string | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2802, __c175, 2) as any as S.Schema<ListNodesSummaryRequest>,
  output: __S(2803, __c175, 3) as any as S.Schema<ListNodesSummaryResult>,
  errors: [
    InternalServerError,
    InvalidAggregatorException,
    InvalidFilter,
    InvalidNextToken,
    ResourceDataSyncNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodesSummary",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summary",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListNodesSummary",
})) as any;

export type ListOpsItemEventsError =
  | InternalServerError
  | OpsItemInvalidParameterException
  | OpsItemLimitExceededException
  | OpsItemNotFoundException
  | CommonErrors;
/**
 * Returns a list of all OpsItem events in the current Amazon Web Services Region and Amazon Web Services account. You can
 * limit the results to events associated with specific OpsItems by specifying a filter.
 */
export const listOpsItemEvents: API.PaginatedOperationMethod<
  ListOpsItemEventsRequest & RegionInput,
  ListOpsItemEventsResponse,
  ListOpsItemEventsError,
  Creds | HttpClient.HttpClient,
  OpsItemEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2816, __c176, 0) as any as S.Schema<ListOpsItemEventsRequest>,
  output: __S(2819, __c176, 3) as any as S.Schema<ListOpsItemEventsResponse>,
  errors: [
    InternalServerError,
    OpsItemInvalidParameterException,
    OpsItemLimitExceededException,
    OpsItemNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpsItemEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOpsItemEvents",
})) as any;

export type ListOpsItemRelatedItemsError =
  | InternalServerError
  | OpsItemInvalidParameterException
  | CommonErrors;
/**
 * Lists all related-item resources associated with a Systems Manager OpsCenter OpsItem. OpsCenter is a
 * tool in Amazon Web Services Systems Manager.
 */
export const listOpsItemRelatedItems: API.PaginatedOperationMethod<
  ListOpsItemRelatedItemsRequest & RegionInput,
  ListOpsItemRelatedItemsResponse,
  ListOpsItemRelatedItemsError,
  Creds | HttpClient.HttpClient,
  OpsItemRelatedItemSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2832, __c177, 0) as any as S.Schema<ListOpsItemRelatedItemsRequest>,
  output: __S(2835, __c177, 3) as any as S.Schema<ListOpsItemRelatedItemsResponse>,
  errors: [InternalServerError, OpsItemInvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpsItemRelatedItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOpsItemRelatedItems",
})) as any;

export type ListOpsMetadataError =
  | InternalServerError
  | OpsMetadataInvalidArgumentException
  | CommonErrors;
/**
 * Amazon Web Services Systems Manager calls this API operation when displaying all Application Manager OpsMetadata objects or
 * blobs.
 */
export const listOpsMetadata: API.PaginatedOperationMethod<
  ListOpsMetadataRequest & RegionInput,
  ListOpsMetadataResult,
  ListOpsMetadataError,
  Creds | HttpClient.HttpClient,
  OpsMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2850, __c178, 2) as any as S.Schema<ListOpsMetadataRequest>,
  output: __S(2853, __c178, 5) as any as S.Schema<ListOpsMetadataResult>,
  errors: [InternalServerError, OpsMetadataInvalidArgumentException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpsMetadata",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OpsMetadataList",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOpsMetadata",
})) as any;

export type ListResourceComplianceSummariesError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | CommonErrors;
/**
 * Returns a resource-level summary count. The summary includes information about compliant and
 * non-compliant statuses and detailed compliance-item severity counts, according to the filter
 * criteria you specify.
 */
export const listResourceComplianceSummaries: API.PaginatedOperationMethod<
  ListResourceComplianceSummariesRequest & RegionInput,
  ListResourceComplianceSummariesResult,
  ListResourceComplianceSummariesError,
  Creds | HttpClient.HttpClient,
  ResourceComplianceSummaryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2864, __c179, 0) as any as S.Schema<ListResourceComplianceSummariesRequest>,
  output: __S(2867, __c179, 3) as any as S.Schema<ListResourceComplianceSummariesResult>,
  errors: [InternalServerError, InvalidFilter, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceComplianceSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceComplianceSummaryItems",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListResourceComplianceSummaries",
})) as any;

export type ListResourceDataSyncError =
  | InternalServerError
  | InvalidNextToken
  | ResourceDataSyncInvalidConfigurationException
  | CommonErrors;
/**
 * Lists your resource data sync configurations. Includes information about the last time a
 * sync attempted to start, the last sync status, and the last time a sync successfully
 * completed.
 *
 * The number of sync configurations might be too large to return using a single call to
 * `ListResourceDataSync`. You can limit the number of sync configurations returned by
 * using the `MaxResults` parameter. To determine whether there are more sync
 * configurations to list, check the value of `NextToken` in the output. If there are
 * more sync configurations to list, you can request them by specifying the `NextToken`
 * returned in the call to the parameter of a subsequent call.
 */
export const listResourceDataSync: API.PaginatedOperationMethod<
  ListResourceDataSyncRequest & RegionInput,
  ListResourceDataSyncResult,
  ListResourceDataSyncError,
  Creds | HttpClient.HttpClient,
  ResourceDataSyncItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2880, __c180, 0) as any as S.Schema<ListResourceDataSyncRequest>,
  output: __S(2884, __c180, 4) as any as S.Schema<ListResourceDataSyncResult>,
  errors: [InternalServerError, InvalidNextToken, ResourceDataSyncInvalidConfigurationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceDataSync",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceDataSyncItems",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListResourceDataSync",
})) as any;

export type ListTagsForResourceError =
  | InternalServerError
  | InvalidResourceId
  | InvalidResourceType
  | CommonErrors;
/**
 * Returns a list of the tags assigned to the specified resource.
 *
 * For information about the ID format for each supported resource type, see AddTagsToResource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2896, __c181, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2897, __c181, 1) as any as S.Schema<ListTagsForResourceResult>,
  errors: [InternalServerError, InvalidResourceId, InvalidResourceType],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type ModifyDocumentPermissionError =
  | DocumentLimitExceeded
  | DocumentPermissionLimit
  | InternalServerError
  | InvalidDocument
  | InvalidPermissionType
  | CommonErrors;
/**
 * Shares a Amazon Web Services Systems Manager document (SSM document)publicly or privately. If you share a document
 * privately, you must specify the Amazon Web Services user IDs for those people who can use the document. If
 * you share a document publicly, you must specify *All* as the account
 * ID.
 */
export const modifyDocumentPermission: API.OperationMethod<
  ModifyDocumentPermissionRequest & RegionInput,
  ModifyDocumentPermissionResponse,
  ModifyDocumentPermissionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c182, 0) as any as S.Schema<ModifyDocumentPermissionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<ModifyDocumentPermissionResponse>,
  errors: [
    DocumentLimitExceeded,
    DocumentPermissionLimit,
    InternalServerError,
    InvalidDocument,
    InvalidPermissionType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDocumentPermission",
  telemetry: TELEMETRY,
  span: "ModifyDocumentPermission",
}));

export type PutComplianceItemsError =
  | ComplianceTypeCountLimitExceededException
  | InternalServerError
  | InvalidItemContentException
  | InvalidResourceId
  | InvalidResourceType
  | ItemSizeLimitExceededException
  | TotalSizeLimitExceededException
  | CommonErrors;
/**
 * Registers a compliance type and other compliance details on a designated resource. This
 * operation lets you register custom compliance details with a resource. This call overwrites
 * existing compliance information on the resource, so you must provide a full list of compliance
 * items each time that you send the request.
 *
 * ComplianceType can be one of the following:
 *
 * - ExecutionId: The execution ID when the patch, association, or custom compliance item was
 * applied.
 *
 * - ExecutionType: Specify patch, association, or Custom:`string`.
 *
 * - ExecutionTime. The time the patch, association, or custom compliance item was applied to
 * the managed node.
 *
 * For State Manager associations, this represents the time when compliance status was
 * captured by the Systems Manager service during its internal compliance aggregation workflow, not
 * necessarily when the association was executed on the managed node. State Manager updates
 * compliance information for all associations on an instance whenever any association executes,
 * which may result in multiple associations showing the same execution time.
 *
 * - Id: The patch, association, or custom compliance ID.
 *
 * - Title: A title.
 *
 * - Status: The status of the compliance item. For example, `approved` for patches,
 * or `Failed` for associations.
 *
 * - Severity: A patch severity. For example, `Critical`.
 *
 * - DocumentName: An SSM document name. For example, `AWS-RunPatchBaseline`.
 *
 * - DocumentVersion: An SSM document version number. For example, 4.
 *
 * - Classification: A patch classification. For example, `security updates`.
 *
 * - PatchBaselineId: A patch baseline ID.
 *
 * - PatchSeverity: A patch severity. For example, `Critical`.
 *
 * - PatchState: A patch state. For example, `InstancesWithFailedPatches`.
 *
 * - PatchGroup: The name of a patch group.
 *
 * - InstalledTime: The time the association, patch, or custom compliance item was applied to
 * the resource. Specify the time by using the following format:
 * `yyyy-MM-dd'T'HH:mm:ss'Z'`
 */
export const putComplianceItems: API.OperationMethod<
  PutComplianceItemsRequest & RegionInput,
  PutComplianceItemsResult,
  PutComplianceItemsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2930, __c183, 2) as any as S.Schema<PutComplianceItemsRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<PutComplianceItemsResult>,
  errors: [
    ComplianceTypeCountLimitExceededException,
    InternalServerError,
    InvalidItemContentException,
    InvalidResourceId,
    InvalidResourceType,
    ItemSizeLimitExceededException,
    TotalSizeLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutComplianceItems",
  telemetry: TELEMETRY,
  span: "PutComplianceItems",
}));

export type PutInventoryError =
  | CustomSchemaCountLimitExceededException
  | InternalServerError
  | InvalidInstanceId
  | InvalidInventoryItemContextException
  | InvalidItemContentException
  | InvalidTypeNameException
  | ItemContentMismatchException
  | ItemSizeLimitExceededException
  | SubTypeCountLimitExceededException
  | TotalSizeLimitExceededException
  | UnsupportedInventoryItemContextException
  | UnsupportedInventorySchemaVersionException
  | CommonErrors;
/**
 * Bulk update custom inventory items on one or more managed nodes. The request adds an
 * inventory item, if it doesn't already exist, or updates an inventory item, if it does
 * exist.
 */
export const putInventory: API.OperationMethod<
  PutInventoryRequest & RegionInput,
  PutInventoryResult,
  PutInventoryError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2946, __c184, 2) as any as S.Schema<PutInventoryRequest>,
  output: __S(2947, __c184, 3) as any as S.Schema<PutInventoryResult>,
  errors: [
    CustomSchemaCountLimitExceededException,
    InternalServerError,
    InvalidInstanceId,
    InvalidInventoryItemContextException,
    InvalidItemContentException,
    InvalidTypeNameException,
    ItemContentMismatchException,
    ItemSizeLimitExceededException,
    SubTypeCountLimitExceededException,
    TotalSizeLimitExceededException,
    UnsupportedInventoryItemContextException,
    UnsupportedInventorySchemaVersionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInventory",
  telemetry: TELEMETRY,
  span: "PutInventory",
}));

export type PutParameterError =
  | HierarchyLevelLimitExceededException
  | HierarchyTypeMismatchException
  | IncompatiblePolicyException
  | InternalServerError
  | InvalidAllowedPatternException
  | InvalidKeyId
  | InvalidPolicyAttributeException
  | InvalidPolicyTypeException
  | ParameterAlreadyExists
  | ParameterLimitExceeded
  | ParameterMaxVersionLimitExceeded
  | ParameterPatternMismatchException
  | PoliciesLimitExceededException
  | TooManyUpdates
  | UnsupportedParameterType
  | CommonErrors;
/**
 * Create or update a parameter in Parameter Store.
 *
 * Parameter Store throughput defines the number of API transactions per second (TPS) that
 * Systems Manager can process. This applies to `GetParameter`,
 * `GetParameters`, and `PutParameter` API calls for your Amazon Web Services account and
 * Amazon Web Services Region. By default, Parameter Store is configured with a standard throughput quota suitable
 * for low- to moderate-volume workloads. Applications that retrieve configuration data infrequently
 * or operate at smaller scale can use this default setting without additional cost.
 *
 * For higher-volume workloads, you can enable higher throughput. This increases the maximum
 * number of supported transactions per second for your account and Region. Increased throughput
 * supports applications and workloads that need concurrent access to multiple parameters. If you
 * experience `ThrottlingException: Rate exceeded` errors, enable higher throughput. For
 * more information, see Changing Parameter Store
 * throughput.
 */
export const putParameter: API.OperationMethod<
  PutParameterRequest & RegionInput,
  PutParameterResult,
  PutParameterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2960, __c185, 0) as any as S.Schema<PutParameterRequest>,
  output: __S(2961, __c185, 1) as any as S.Schema<PutParameterResult>,
  errors: [
    HierarchyLevelLimitExceededException,
    HierarchyTypeMismatchException,
    IncompatiblePolicyException,
    InternalServerError,
    InvalidAllowedPatternException,
    InvalidKeyId,
    InvalidPolicyAttributeException,
    InvalidPolicyTypeException,
    ParameterAlreadyExists,
    ParameterLimitExceeded,
    ParameterMaxVersionLimitExceeded,
    ParameterPatternMismatchException,
    PoliciesLimitExceededException,
    TooManyUpdates,
    UnsupportedParameterType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutParameter",
  telemetry: TELEMETRY,
  span: "PutParameter",
}));

export type PutResourcePolicyError =
  | InternalServerError
  | MalformedResourcePolicyDocumentException
  | ResourceNotFoundException
  | ResourcePolicyConflictException
  | ResourcePolicyInvalidParameterException
  | ResourcePolicyLimitExceededException
  | ResourcePolicyNotFoundException
  | CommonErrors;
/**
 * Creates or updates a Systems Manager resource policy. A resource policy helps you to define the
 * IAM entity (for example, an Amazon Web Services account) that can manage your Systems Manager resources.
 * The following resources support Systems Manager resource policies.
 *
 * - `OpsItemGroup` - The resource policy for `OpsItemGroup` enables
 * Amazon Web Services accounts to view and interact with OpsCenter operational work items (OpsItems).
 *
 * - `Parameter` - The resource policy is used to share a parameter with other
 * accounts using Resource Access Manager (RAM).
 *
 * To share a parameter, it must be in the advanced parameter tier. For information about
 * parameter tiers, see Managing
 * parameter tiers. For information about changing an existing standard parameter to an
 * advanced parameter, see Changing a standard parameter to an advanced parameter.
 *
 * To share a `SecureString` parameter, it must be encrypted with a customer managed key, and you must share the key separately through Key Management Service. Amazon Web Services managed keys cannot be shared. Parameters encrypted with the default Amazon Web Services managed key can be updated to use a customer managed key instead. For KMS key definitions, see KMS concepts in the
 * *Key Management Service Developer Guide*.
 *
 * While you can share a parameter using the Systems Manager `PutResourcePolicy` operation,
 * we recommend using Resource Access Manager (RAM) instead. This is because using
 * `PutResourcePolicy` requires the extra step of promoting the parameter to a
 * standard RAM Resource Share using the RAM
 * PromoteResourceShareCreatedFromPolicy API operation. Otherwise, the parameter won't
 * be returned by the Systems Manager DescribeParameters API operation using the `--shared` option.
 *
 * For more information, see Sharing a
 * parameter in the *Amazon Web Services Systems Manager User Guide*
 *
 * - `Document` - Shares the document using Resource Access Manager (RAM). For more information about sharing documents, see Sharing
 * Systems Manager documents in the *Amazon Web Services Systems Manager User Guide*.
 *
 * While you can share a document using the Systems Manager `PutResourcePolicy` operation, we
 * recommend using Resource Access Manager (RAM) instead. Using
 * `PutResourcePolicy` requires an extra step. You must promote the document to a
 * standard RAM Resource Share using the RAM PromoteResourceShareCreatedFromPolicy API operation. Otherwise, the Systems Manager ListDocuments API operation won't return the document when filtering for shared
 * documents. The Amazon Web Services Config PutRemediationConfigurations API operation also can't use the document.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest & RegionInput,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c186, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(2977, __c186, 1) as any as S.Schema<PutResourcePolicyResponse>,
  errors: [
    InternalServerError,
    MalformedResourcePolicyDocumentException,
    ResourceNotFoundException,
    ResourcePolicyConflictException,
    ResourcePolicyInvalidParameterException,
    ResourcePolicyLimitExceededException,
    ResourcePolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
  telemetry: TELEMETRY,
  span: "PutResourcePolicy",
}));

export type RegisterDefaultHostManagementConfigurationError = InternalServerError | CommonErrors;
/**
 * Enables Default Host Management Configuration (DHMC) for the current Amazon Web Services account and
 * Amazon Web Services Region. With DHMC enabled, you don't need to configure additional resources, such as an
 * instance profile, to use your Amazon EC2 instances as managed nodes in Amazon Web Services Systems Manager.
 *
 * To use this operation, you must have the following permissions:
 *
 * - You need the `ssm:GetServiceSetting` and `ssm:UpdateServiceSetting`
 * permissions for the `/ssm/managed-instance/default-ec2-instance-management-role`
 * service setting.
 *
 * - You need the `iam:GetRole` and `iam:PassRole` permissions for the
 * role used for Default Host Management Configuration.
 *
 * If `PermissionModel` is `SERVICE_MANAGED`, you also need the
 * `iam:CreateRole` and `iam:AttachRolePolicy` permissions so that Amazon Web Services Systems Manager
 * can create and configure the role on your behalf.
 */
export const registerDefaultHostManagementConfiguration: API.OperationMethod<
  RegisterDefaultHostManagementConfigurationRequest & RegionInput,
  RegisterDefaultHostManagementConfigurationResult,
  RegisterDefaultHostManagementConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2992, __c187, 0) as any as S.Schema<RegisterDefaultHostManagementConfigurationRequest>,
  output: __S(2993, __c187, 1) as any as S.Schema<RegisterDefaultHostManagementConfigurationResult>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDefaultHostManagementConfiguration",
  telemetry: TELEMETRY,
  span: "RegisterDefaultHostManagementConfiguration",
}));

export type RegisterDefaultPatchBaselineError =
  | DoesNotExistException
  | InternalServerError
  | InvalidResourceId
  | CommonErrors;
/**
 * Defines the default patch baseline for the relevant operating system.
 *
 * To reset the Amazon Web Services-predefined patch baseline as the default, specify the full patch baseline
 * Amazon Resource Name (ARN) as the baseline ID value. For example, for CentOS, specify
 * `arn:aws:ssm:us-east-2:733109147000:patchbaseline/pb-0574b43a65ea646ed` instead of
 * `pb-0574b43a65ea646ed`.
 */
export const registerDefaultPatchBaseline: API.OperationMethod<
  RegisterDefaultPatchBaselineRequest & RegionInput,
  RegisterDefaultPatchBaselineResult,
  RegisterDefaultPatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c188, 0) as any as S.Schema<RegisterDefaultPatchBaselineRequest>,
  output: __S(624, __c39, 0) as any as S.Schema<RegisterDefaultPatchBaselineResult>,
  errors: [DoesNotExistException, InternalServerError, InvalidResourceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDefaultPatchBaseline",
  telemetry: TELEMETRY,
  span: "RegisterDefaultPatchBaseline",
}));

export type RegisterPatchBaselineForPatchGroupError =
  | AlreadyExistsException
  | DoesNotExistException
  | InternalServerError
  | InvalidResourceId
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Registers a patch baseline for a patch group.
 */
export const registerPatchBaselineForPatchGroup: API.OperationMethod<
  RegisterPatchBaselineForPatchGroupRequest & RegionInput,
  RegisterPatchBaselineForPatchGroupResult,
  RegisterPatchBaselineForPatchGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3024, __c189, 0) as any as S.Schema<RegisterPatchBaselineForPatchGroupRequest>,
  output: __S(1008, __c63, 0) as any as S.Schema<RegisterPatchBaselineForPatchGroupResult>,
  errors: [
    AlreadyExistsException,
    DoesNotExistException,
    InternalServerError,
    InvalidResourceId,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterPatchBaselineForPatchGroup",
  telemetry: TELEMETRY,
  span: "RegisterPatchBaselineForPatchGroup",
}));

export type RegisterTargetWithMaintenanceWindowError =
  | DoesNotExistException
  | IdempotentParameterMismatch
  | InternalServerError
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Registers a target with a maintenance window.
 */
export const registerTargetWithMaintenanceWindow: API.OperationMethod<
  RegisterTargetWithMaintenanceWindowRequest & RegionInput,
  RegisterTargetWithMaintenanceWindowResult,
  RegisterTargetWithMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c190, 0) as any as S.Schema<RegisterTargetWithMaintenanceWindowRequest>,
  output: __S(3041, __c190, 1) as any as S.Schema<RegisterTargetWithMaintenanceWindowResult>,
  errors: [
    DoesNotExistException,
    IdempotentParameterMismatch,
    InternalServerError,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterTargetWithMaintenanceWindow",
  telemetry: TELEMETRY,
  span: "RegisterTargetWithMaintenanceWindow",
}));

export type RegisterTaskWithMaintenanceWindowError =
  | DoesNotExistException
  | FeatureNotAvailableException
  | IdempotentParameterMismatch
  | InternalServerError
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Adds a new task to a maintenance window.
 */
export const registerTaskWithMaintenanceWindow: API.OperationMethod<
  RegisterTaskWithMaintenanceWindowRequest & RegionInput,
  RegisterTaskWithMaintenanceWindowResult,
  RegisterTaskWithMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3056, __c191, 0) as any as S.Schema<RegisterTaskWithMaintenanceWindowRequest>,
  output: __S(3057, __c191, 1) as any as S.Schema<RegisterTaskWithMaintenanceWindowResult>,
  errors: [
    DoesNotExistException,
    FeatureNotAvailableException,
    IdempotentParameterMismatch,
    InternalServerError,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterTaskWithMaintenanceWindow",
  telemetry: TELEMETRY,
  span: "RegisterTaskWithMaintenanceWindow",
}));

export type RemoveTagsFromResourceError =
  | InternalServerError
  | InvalidResourceId
  | InvalidResourceType
  | TooManyUpdates
  | CommonErrors;
/**
 * Removes tag keys from the specified resource.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceRequest & RegionInput,
  RemoveTagsFromResourceResult,
  RemoveTagsFromResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c192, 0) as any as S.Schema<RemoveTagsFromResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<RemoveTagsFromResourceResult>,
  errors: [InternalServerError, InvalidResourceId, InvalidResourceType, TooManyUpdates],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
  telemetry: TELEMETRY,
  span: "RemoveTagsFromResource",
}));

export type ResetServiceSettingError =
  | InternalServerError
  | ServiceSettingNotFound
  | TooManyUpdates
  | CommonErrors;
/**
 * `ServiceSetting` is an account-level setting for an Amazon Web Services service. This setting
 * defines how a user interacts with or uses a service or a feature of a service. For example, if an
 * Amazon Web Services service charges money to the account based on feature or service usage, then the Amazon Web Services
 * service team might create a default setting of "false". This means the user can't use this
 * feature unless they change the setting to "true" and intentionally opt in for a paid
 * feature.
 *
 * Services map a `SettingId` object to a setting value. Amazon Web Services services teams define
 * the default value for a `SettingId`. You can't create a new `SettingId`,
 * but you can overwrite the default value if you have the `ssm:UpdateServiceSetting`
 * permission for the setting. Use the GetServiceSetting API operation to view the
 * current value. Use the UpdateServiceSetting API operation to change the default
 * setting.
 *
 * Reset the service setting for the account to the default value as provisioned by the Amazon Web Services
 * service team.
 */
export const resetServiceSetting: API.OperationMethod<
  ResetServiceSettingRequest & RegionInput,
  ResetServiceSettingResult,
  ResetServiceSettingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3088, __c193, 0) as any as S.Schema<ResetServiceSettingRequest>,
  output: __S(2481, __c155, 1) as any as S.Schema<ResetServiceSettingResult>,
  errors: [InternalServerError, ServiceSettingNotFound, TooManyUpdates],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetServiceSetting",
  telemetry: TELEMETRY,
  span: "ResetServiceSetting",
}));

export type ResumeSessionError = DoesNotExistException | InternalServerError | CommonErrors;
/**
 * Reconnects a session to a managed node after it has been disconnected. Connections can be
 * resumed for disconnected sessions, but not terminated sessions.
 *
 * This command is primarily for use by client machines to automatically reconnect during
 * intermittent network issues. It isn't intended for any other use.
 */
export const resumeSession: API.OperationMethod<
  ResumeSessionRequest & RegionInput,
  ResumeSessionResponse,
  ResumeSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3104, __c194, 0) as any as S.Schema<ResumeSessionRequest>,
  output: __S(3120, __c195, 0) as any as S.Schema<ResumeSessionResponse>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeSession",
  telemetry: TELEMETRY,
  span: "ResumeSession",
}));

export type SendAutomationSignalError =
  | AutomationExecutionNotFoundException
  | AutomationStepNotFoundException
  | InternalServerError
  | InvalidAutomationSignalException
  | CommonErrors;
/**
 * Sends a signal to an Automation execution to change the current behavior or status of the
 * execution.
 */
export const sendAutomationSignal: API.OperationMethod<
  SendAutomationSignalRequest & RegionInput,
  SendAutomationSignalResult,
  SendAutomationSignalError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3136, __c196, 0) as any as S.Schema<SendAutomationSignalRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<SendAutomationSignalResult>,
  errors: [
    AutomationExecutionNotFoundException,
    AutomationStepNotFoundException,
    InternalServerError,
    InvalidAutomationSignalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendAutomationSignal",
  telemetry: TELEMETRY,
  span: "SendAutomationSignal",
}));

export type SendCommandError =
  | DuplicateInstanceId
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | InvalidInstanceId
  | InvalidNotificationConfig
  | InvalidOutputFolder
  | InvalidParameters
  | InvalidRole
  | MaxDocumentSizeExceeded
  | UnsupportedPlatformType
  | CommonErrors;
/**
 * Runs commands on one or more managed nodes.
 */
export const sendCommand: API.OperationMethod<
  SendCommandRequest & RegionInput,
  SendCommandResult,
  SendCommandError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3152, __c197, 0) as any as S.Schema<SendCommandRequest>,
  output: __S(3153, __c197, 1) as any as S.Schema<SendCommandResult>,
  errors: [
    DuplicateInstanceId,
    InternalServerError,
    InvalidDocument,
    InvalidDocumentVersion,
    InvalidInstanceId,
    InvalidNotificationConfig,
    InvalidOutputFolder,
    InvalidParameters,
    InvalidRole,
    MaxDocumentSizeExceeded,
    UnsupportedPlatformType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendCommand",
  telemetry: TELEMETRY,
  span: "SendCommand",
}));

export type StartAccessRequestError =
  | AccessDeniedException
  | InternalServerError
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the workflow for just-in-time node access sessions.
 */
export const startAccessRequest: API.OperationMethod<
  StartAccessRequestRequest & RegionInput,
  StartAccessRequestResponse,
  StartAccessRequestError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3168, __c198, 0) as any as S.Schema<StartAccessRequestRequest>,
  output: __S(3169, __c198, 1) as any as S.Schema<StartAccessRequestResponse>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAccessRequest",
  telemetry: TELEMETRY,
  span: "StartAccessRequest",
}));

export type StartAssociationsOnceError =
  | AssociationDoesNotExist
  | InvalidAssociation
  | CommonErrors;
/**
 * Runs an association immediately and only one time. This operation can be helpful when
 * troubleshooting associations.
 */
export const startAssociationsOnce: API.OperationMethod<
  StartAssociationsOnceRequest & RegionInput,
  StartAssociationsOnceResult,
  StartAssociationsOnceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3184, __c199, 0) as any as S.Schema<StartAssociationsOnceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<StartAssociationsOnceResult>,
  errors: [AssociationDoesNotExist, InvalidAssociation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssociationsOnce",
  telemetry: TELEMETRY,
  span: "StartAssociationsOnce",
}));

export type StartAutomationExecutionError =
  | AutomationDefinitionNotFoundException
  | AutomationDefinitionVersionNotFoundException
  | AutomationExecutionLimitExceededException
  | IdempotentParameterMismatch
  | InternalServerError
  | InvalidAutomationExecutionParametersException
  | InvalidTarget
  | CommonErrors;
/**
 * Initiates execution of an Automation runbook.
 */
export const startAutomationExecution: API.OperationMethod<
  StartAutomationExecutionRequest & RegionInput,
  StartAutomationExecutionResult,
  StartAutomationExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3200, __c200, 0) as any as S.Schema<StartAutomationExecutionRequest>,
  output: __S(3216, __c201, 0) as any as S.Schema<StartAutomationExecutionResult>,
  errors: [
    AutomationDefinitionNotFoundException,
    AutomationDefinitionVersionNotFoundException,
    AutomationExecutionLimitExceededException,
    IdempotentParameterMismatch,
    InternalServerError,
    InvalidAutomationExecutionParametersException,
    InvalidTarget,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAutomationExecution",
  telemetry: TELEMETRY,
  span: "StartAutomationExecution",
}));

export type StartChangeRequestExecutionError =
  | AutomationDefinitionNotApprovedException
  | AutomationDefinitionNotFoundException
  | AutomationDefinitionVersionNotFoundException
  | AutomationExecutionLimitExceededException
  | IdempotentParameterMismatch
  | InternalServerError
  | InvalidAutomationExecutionParametersException
  | NoLongerSupportedException
  | CommonErrors;
/**
 * Amazon Web Services Systems Manager Change Manager is no longer open to new customers. Existing customers can
 * continue to use the service as normal. For more information, see
 * Amazon Web Services Systems Manager Change Manager availability change.
 *
 * Creates a change request for Change Manager. The Automation runbooks specified in the
 * change request run only after all required approvals for the change request have been
 * received.
 */
export const startChangeRequestExecution: API.OperationMethod<
  StartChangeRequestExecutionRequest & RegionInput,
  StartChangeRequestExecutionResult,
  StartChangeRequestExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3232, __c202, 0) as any as S.Schema<StartChangeRequestExecutionRequest>,
  output: __S(3216, __c201, 0) as any as S.Schema<StartChangeRequestExecutionResult>,
  errors: [
    AutomationDefinitionNotApprovedException,
    AutomationDefinitionNotFoundException,
    AutomationDefinitionVersionNotFoundException,
    AutomationExecutionLimitExceededException,
    IdempotentParameterMismatch,
    InternalServerError,
    InvalidAutomationExecutionParametersException,
    NoLongerSupportedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartChangeRequestExecution",
  telemetry: TELEMETRY,
  span: "StartChangeRequestExecution",
}));

export type StartExecutionPreviewError = InternalServerError | ValidationException | CommonErrors;
/**
 * Initiates the process of creating a preview showing the effects that running a specified
 * Automation runbook would have on the targeted resources.
 */
export const startExecutionPreview: API.OperationMethod<
  StartExecutionPreviewRequest & RegionInput,
  StartExecutionPreviewResponse,
  StartExecutionPreviewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3250, __c203, 2) as any as S.Schema<StartExecutionPreviewRequest>,
  output: __S(3251, __c203, 3) as any as S.Schema<StartExecutionPreviewResponse>,
  errors: [InternalServerError, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExecutionPreview",
  telemetry: TELEMETRY,
  span: "StartExecutionPreview",
}));

export type StartSessionError =
  | InternalServerError
  | InvalidDocument
  | TargetNotConnected
  | CommonErrors;
/**
 * Initiates a connection to a target (for example, a managed node) for a Session Manager session.
 * Returns a URL and token that can be used to open a WebSocket connection for sending input and
 * receiving outputs.
 *
 * Amazon Web Services CLI usage: `start-session` is an interactive command that requires the Session Manager
 * plugin to be installed on the client machine making the call. For information, see Install
 * the Session Manager plugin for the Amazon Web Services CLI in the *Amazon Web Services Systems Manager User Guide*.
 *
 * Amazon Web Services Tools for PowerShell usage: Start-SSMSession isn't currently supported by Amazon Web Services Tools
 * for PowerShell on Windows local machines.
 */
export const startSession: API.OperationMethod<
  StartSessionRequest & RegionInput,
  StartSessionResponse,
  StartSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3264, __c204, 0) as any as S.Schema<StartSessionRequest>,
  output: __S(3120, __c195, 0) as any as S.Schema<StartSessionResponse>,
  errors: [InternalServerError, InvalidDocument, TargetNotConnected],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSession",
  telemetry: TELEMETRY,
  span: "StartSession",
}));

export type StopAutomationExecutionError =
  | AutomationExecutionNotFoundException
  | InternalServerError
  | InvalidAutomationStatusUpdateException
  | CommonErrors;
/**
 * Stop an Automation that is currently running.
 */
export const stopAutomationExecution: API.OperationMethod<
  StopAutomationExecutionRequest & RegionInput,
  StopAutomationExecutionResult,
  StopAutomationExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3280, __c205, 0) as any as S.Schema<StopAutomationExecutionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<StopAutomationExecutionResult>,
  errors: [
    AutomationExecutionNotFoundException,
    InternalServerError,
    InvalidAutomationStatusUpdateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAutomationExecution",
  telemetry: TELEMETRY,
  span: "StopAutomationExecution",
}));

export type TerminateSessionError = InternalServerError | CommonErrors;
/**
 * Permanently ends a session and closes the data connection between the Session Manager client and
 * SSM Agent on the managed node. A terminated session can't be resumed.
 */
export const terminateSession: API.OperationMethod<
  TerminateSessionRequest & RegionInput,
  TerminateSessionResponse,
  TerminateSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3296, __c206, 0) as any as S.Schema<TerminateSessionRequest>,
  output: __S(3297, __c206, 1) as any as S.Schema<TerminateSessionResponse>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
  telemetry: TELEMETRY,
  span: "TerminateSession",
}));

export type UnlabelParameterVersionError =
  | InternalServerError
  | ParameterNotFound
  | ParameterVersionNotFound
  | TooManyUpdates
  | CommonErrors;
/**
 * Remove a label or labels from a parameter.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 */
export const unlabelParameterVersion: API.OperationMethod<
  UnlabelParameterVersionRequest & RegionInput,
  UnlabelParameterVersionResult,
  UnlabelParameterVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3312, __c207, 0) as any as S.Schema<UnlabelParameterVersionRequest>,
  output: __S(3313, __c207, 1) as any as S.Schema<UnlabelParameterVersionResult>,
  errors: [InternalServerError, ParameterNotFound, ParameterVersionNotFound, TooManyUpdates],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnlabelParameterVersion",
  telemetry: TELEMETRY,
  span: "UnlabelParameterVersion",
}));

export type UpdateAssociationError =
  | AssociationDoesNotExist
  | AssociationVersionLimitExceeded
  | InternalServerError
  | InvalidAssociationVersion
  | InvalidDocument
  | InvalidDocumentVersion
  | InvalidOutputLocation
  | InvalidParameters
  | InvalidSchedule
  | InvalidTarget
  | InvalidTargetMaps
  | InvalidUpdate
  | TooManyUpdates
  | CommonErrors;
/**
 * Updates an association. You can update the association name and version, the document
 * version, schedule, parameters, and Amazon Simple Storage Service (Amazon S3) output. When you
 * call `UpdateAssociation`, the system removes all optional parameters from the request
 * and overwrites the association with null values for those parameters. This is by design. You must
 * specify all optional parameters in the call, even if you are not changing the parameters. This
 * includes the `Name` parameter. Before calling this API action, we recommend that you
 * call the DescribeAssociation API operation and make a note of all optional
 * parameters required for your `UpdateAssociation` call.
 *
 * In order to call this API operation, a user, group, or role must be granted permission to
 * call the DescribeAssociation API operation. If you don't have permission to
 * call `DescribeAssociation`, then you receive the following error: An error
 * occurred (AccessDeniedException) when calling the UpdateAssociation operation: User:
 * isn't authorized to perform: ssm:DescribeAssociation on resource:
 *
 * When you update an association, the association immediately runs against the specified
 * targets. You can add the `ApplyOnlyAtCronInterval` parameter to run the association
 * during the next schedule run.
 */
export const updateAssociation: API.OperationMethod<
  UpdateAssociationRequest & RegionInput,
  UpdateAssociationResult,
  UpdateAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3328, __c208, 0) as any as S.Schema<UpdateAssociationRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<UpdateAssociationResult>,
  errors: [
    AssociationDoesNotExist,
    AssociationVersionLimitExceeded,
    InternalServerError,
    InvalidAssociationVersion,
    InvalidDocument,
    InvalidDocumentVersion,
    InvalidOutputLocation,
    InvalidParameters,
    InvalidSchedule,
    InvalidTarget,
    InvalidTargetMaps,
    InvalidUpdate,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssociation",
  telemetry: TELEMETRY,
  span: "UpdateAssociation",
}));

export type UpdateAssociationStatusError =
  | AssociationDoesNotExist
  | InternalServerError
  | InvalidDocument
  | InvalidInstanceId
  | StatusUnchanged
  | TooManyUpdates
  | CommonErrors;
/**
 * Updates the status of the Amazon Web Services Systems Manager document (SSM document) associated with the specified
 * managed node.
 *
 * `UpdateAssociationStatus` is primarily used by the Amazon Web Services Systems Manager Agent (SSM Agent) to
 * report status updates about your associations and is only used for associations created with the
 * `InstanceId` legacy parameter.
 */
export const updateAssociationStatus: API.OperationMethod<
  UpdateAssociationStatusRequest & RegionInput,
  UpdateAssociationStatusResult,
  UpdateAssociationStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3344, __c209, 0) as any as S.Schema<UpdateAssociationStatusRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<UpdateAssociationStatusResult>,
  errors: [
    AssociationDoesNotExist,
    InternalServerError,
    InvalidDocument,
    InvalidInstanceId,
    StatusUnchanged,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssociationStatus",
  telemetry: TELEMETRY,
  span: "UpdateAssociationStatus",
}));

export type UpdateCloudConnectorError =
  | ConflictException
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing cloud connector with new configuration details.
 */
export const updateCloudConnector: API.OperationMethod<
  UpdateCloudConnectorRequest & RegionInput,
  UpdateCloudConnectorResult,
  UpdateCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3360, __c210, 0) as any as S.Schema<UpdateCloudConnectorRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<UpdateCloudConnectorResult>,
  errors: [ConflictException, InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCloudConnector",
  telemetry: TELEMETRY,
  span: "UpdateCloudConnector",
}));

export type UpdateDocumentError =
  | DocumentVersionLimitExceeded
  | DuplicateDocumentContent
  | DuplicateDocumentVersionName
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentContent
  | InvalidDocumentOperation
  | InvalidDocumentSchemaVersion
  | InvalidDocumentVersion
  | MaxDocumentSizeExceeded
  | CommonErrors;
/**
 * Updates one or more values for an SSM document.
 */
export const updateDocument: API.OperationMethod<
  UpdateDocumentRequest & RegionInput,
  UpdateDocumentResult,
  UpdateDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3376, __c211, 0) as any as S.Schema<UpdateDocumentRequest>,
  output: __S(450, __c28, 2) as any as S.Schema<UpdateDocumentResult>,
  errors: [
    DocumentVersionLimitExceeded,
    DuplicateDocumentContent,
    DuplicateDocumentVersionName,
    InternalServerError,
    InvalidDocument,
    InvalidDocumentContent,
    InvalidDocumentOperation,
    InvalidDocumentSchemaVersion,
    InvalidDocumentVersion,
    MaxDocumentSizeExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocument",
  telemetry: TELEMETRY,
  span: "UpdateDocument",
}));

export type UpdateDocumentDefaultVersionError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentSchemaVersion
  | InvalidDocumentVersion
  | CommonErrors;
/**
 * Set the default version of a document.
 *
 * If you change a document version for a State Manager association, Systems Manager immediately runs
 * the association unless you previously specifed the `apply-only-at-cron-interval`
 * parameter.
 */
export const updateDocumentDefaultVersion: API.OperationMethod<
  UpdateDocumentDefaultVersionRequest & RegionInput,
  UpdateDocumentDefaultVersionResult,
  UpdateDocumentDefaultVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3392, __c212, 0) as any as S.Schema<UpdateDocumentDefaultVersionRequest>,
  output: __S(3394, __c212, 2) as any as S.Schema<UpdateDocumentDefaultVersionResult>,
  errors: [
    InternalServerError,
    InvalidDocument,
    InvalidDocumentSchemaVersion,
    InvalidDocumentVersion,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocumentDefaultVersion",
  telemetry: TELEMETRY,
  span: "UpdateDocumentDefaultVersion",
}));

export type UpdateDocumentMetadataError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentOperation
  | InvalidDocumentVersion
  | TooManyUpdates
  | CommonErrors;
/**
 * Amazon Web Services Systems Manager Change Manager is no longer open to new customers. Existing customers can
 * continue to use the service as normal. For more information, see
 * Amazon Web Services Systems Manager Change Manager availability change.
 *
 * Updates information related to approval reviews for a specific version of a change template
 * in Change Manager.
 */
export const updateDocumentMetadata: API.OperationMethod<
  UpdateDocumentMetadataRequest & RegionInput,
  UpdateDocumentMetadataResponse,
  UpdateDocumentMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3409, __c213, 1) as any as S.Schema<UpdateDocumentMetadataRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateDocumentMetadataResponse>,
  errors: [
    InternalServerError,
    InvalidDocument,
    InvalidDocumentOperation,
    InvalidDocumentVersion,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocumentMetadata",
  telemetry: TELEMETRY,
  span: "UpdateDocumentMetadata",
}));

export type UpdateMaintenanceWindowError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Updates an existing maintenance window. Only specified parameters are modified.
 *
 * The value you specify for `Duration` determines the specific end time for the
 * maintenance window based on the time it begins. No maintenance window tasks are permitted to
 * start after the resulting endtime minus the number of hours you specify for `Cutoff`.
 * For example, if the maintenance window starts at 3 PM, the duration is three hours, and the
 * value you specify for `Cutoff` is one hour, no maintenance window tasks can start
 * after 5 PM.
 */
export const updateMaintenanceWindow: API.OperationMethod<
  UpdateMaintenanceWindowRequest & RegionInput,
  UpdateMaintenanceWindowResult,
  UpdateMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3424, __c214, 0) as any as S.Schema<UpdateMaintenanceWindowRequest>,
  output: __S(3425, __c214, 1) as any as S.Schema<UpdateMaintenanceWindowResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMaintenanceWindow",
  telemetry: TELEMETRY,
  span: "UpdateMaintenanceWindow",
}));

export type UpdateMaintenanceWindowTargetError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Modifies the target of an existing maintenance window. You
 * can change the following:
 *
 * - Name
 *
 * - Description
 *
 * - Owner
 *
 * - IDs for an ID target
 *
 * - Tags for a Tag target
 *
 * - From any supported tag type to another. The three supported tag types are ID target, Tag
 * target, and resource group. For more information, see Target.
 *
 * If a parameter is null, then the corresponding field isn't modified.
 */
export const updateMaintenanceWindowTarget: API.OperationMethod<
  UpdateMaintenanceWindowTargetRequest & RegionInput,
  UpdateMaintenanceWindowTargetResult,
  UpdateMaintenanceWindowTargetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3440, __c215, 0) as any as S.Schema<UpdateMaintenanceWindowTargetRequest>,
  output: __S(3441, __c215, 1) as any as S.Schema<UpdateMaintenanceWindowTargetResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMaintenanceWindowTarget",
  telemetry: TELEMETRY,
  span: "UpdateMaintenanceWindowTarget",
}));

export type UpdateMaintenanceWindowTaskError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Modifies a task assigned to a maintenance window. You can't change the task type, but you
 * can change the following values:
 *
 * - `TaskARN`. For example, you can change a `RUN_COMMAND` task from
 * `AWS-RunPowerShellScript` to `AWS-RunShellScript`.
 *
 * - `ServiceRoleArn`
 *
 * - `TaskInvocationParameters`
 *
 * - `Priority`
 *
 * - `MaxConcurrency`
 *
 * - `MaxErrors`
 *
 * One or more targets must be specified for maintenance window Run Command-type tasks.
 * Depending on the task, targets are optional for other maintenance window task types (Automation,
 * Lambda, and Step Functions). For more information about running tasks
 * that don't specify targets, see Registering
 * maintenance window tasks without targets in the
 * *Amazon Web Services Systems Manager User Guide*.
 *
 * If the value for a parameter in `UpdateMaintenanceWindowTask` is null, then the
 * corresponding field isn't modified. If you set `Replace` to true, then all fields
 * required by the RegisterTaskWithMaintenanceWindow operation are required for
 * this request. Optional fields that aren't specified are set to null.
 *
 * When you update a maintenance window task that has options specified in
 * `TaskInvocationParameters`, you must provide again all the
 * `TaskInvocationParameters` values that you want to retain. The values you don't
 * specify again are removed. For example, suppose that when you registered a Run Command task, you
 * specified `TaskInvocationParameters` values for `Comment`,
 * `NotificationConfig`, and `OutputS3BucketName`. If you update the
 * maintenance window task and specify only a different `OutputS3BucketName` value, the
 * values for `Comment` and `NotificationConfig` are removed.
 */
export const updateMaintenanceWindowTask: API.OperationMethod<
  UpdateMaintenanceWindowTaskRequest & RegionInput,
  UpdateMaintenanceWindowTaskResult,
  UpdateMaintenanceWindowTaskError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3456, __c216, 0) as any as S.Schema<UpdateMaintenanceWindowTaskRequest>,
  output: __S(3457, __c216, 1) as any as S.Schema<UpdateMaintenanceWindowTaskResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMaintenanceWindowTask",
  telemetry: TELEMETRY,
  span: "UpdateMaintenanceWindowTask",
}));

export type UpdateManagedInstanceRoleError = InternalServerError | InvalidInstanceId | CommonErrors;
/**
 * Changes the Identity and Access Management (IAM) role that is assigned to the
 * on-premises server, edge device, or virtual machines (VM). IAM roles are first
 * assigned to these hybrid nodes during the activation process. For more information, see CreateActivation.
 */
export const updateManagedInstanceRole: API.OperationMethod<
  UpdateManagedInstanceRoleRequest & RegionInput,
  UpdateManagedInstanceRoleResult,
  UpdateManagedInstanceRoleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3472, __c217, 0) as any as S.Schema<UpdateManagedInstanceRoleRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateManagedInstanceRoleResult>,
  errors: [InternalServerError, InvalidInstanceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateManagedInstanceRole",
  telemetry: TELEMETRY,
  span: "UpdateManagedInstanceRole",
}));

export type UpdateOpsItemError =
  | InternalServerError
  | OpsItemAccessDeniedException
  | OpsItemAlreadyExistsException
  | OpsItemConflictException
  | OpsItemInvalidParameterException
  | OpsItemLimitExceededException
  | OpsItemNotFoundException
  | CommonErrors;
/**
 * Edit or change an OpsItem. You must have permission in Identity and Access Management (IAM) to update an OpsItem. For more information, see Set up OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 *
 * Operations engineers and IT professionals use Amazon Web Services Systems Manager OpsCenter to view, investigate, and
 * remediate operational issues impacting the performance and health of their Amazon Web Services resources. For
 * more information, see Amazon Web Services Systems Manager OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const updateOpsItem: API.OperationMethod<
  UpdateOpsItemRequest & RegionInput,
  UpdateOpsItemResponse,
  UpdateOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3488, __c218, 0) as any as S.Schema<UpdateOpsItemRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateOpsItemResponse>,
  errors: [
    InternalServerError,
    OpsItemAccessDeniedException,
    OpsItemAlreadyExistsException,
    OpsItemConflictException,
    OpsItemInvalidParameterException,
    OpsItemLimitExceededException,
    OpsItemNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOpsItem",
  telemetry: TELEMETRY,
  span: "UpdateOpsItem",
}));

export type UpdateOpsMetadataError =
  | InternalServerError
  | OpsMetadataInvalidArgumentException
  | OpsMetadataKeyLimitExceededException
  | OpsMetadataNotFoundException
  | OpsMetadataTooManyUpdatesException
  | CommonErrors;
/**
 * Amazon Web Services Systems Manager calls this API operation when you edit OpsMetadata in Application Manager.
 */
export const updateOpsMetadata: API.OperationMethod<
  UpdateOpsMetadataRequest & RegionInput,
  UpdateOpsMetadataResult,
  UpdateOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3504, __c219, 0) as any as S.Schema<UpdateOpsMetadataRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<UpdateOpsMetadataResult>,
  errors: [
    InternalServerError,
    OpsMetadataInvalidArgumentException,
    OpsMetadataKeyLimitExceededException,
    OpsMetadataNotFoundException,
    OpsMetadataTooManyUpdatesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOpsMetadata",
  telemetry: TELEMETRY,
  span: "UpdateOpsMetadata",
}));

export type UpdatePatchBaselineError = DoesNotExistException | InternalServerError | CommonErrors;
/**
 * Modifies an existing patch baseline. Fields not specified in the request are left
 * unchanged.
 *
 * For information about valid key-value pairs in `PatchFilters` for each supported
 * operating system type, see PatchFilter.
 */
export const updatePatchBaseline: API.OperationMethod<
  UpdatePatchBaselineRequest & RegionInput,
  UpdatePatchBaselineResult,
  UpdatePatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3520, __c220, 0) as any as S.Schema<UpdatePatchBaselineRequest>,
  output: __S(3521, __c220, 1) as any as S.Schema<UpdatePatchBaselineResult>,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePatchBaseline",
  telemetry: TELEMETRY,
  span: "UpdatePatchBaseline",
}));

export type UpdateResourceDataSyncError =
  | InternalServerError
  | ResourceDataSyncConflictException
  | ResourceDataSyncInvalidConfigurationException
  | ResourceDataSyncNotFoundException
  | CommonErrors;
/**
 * Update a resource data sync. After you create a resource data sync for a Region, you can't
 * change the account options for that sync. For example, if you create a sync in the us-east-2
 * (Ohio) Region and you choose the `Include only the current account` option, you can't
 * edit that sync later and choose the Include all accounts from my Organizations
 * configuration option. Instead, you must delete the first resource data sync, and create a
 * new one.
 *
 * This API operation only supports a resource data sync that was created with a
 * SyncFromSource `SyncType`.
 */
export const updateResourceDataSync: API.OperationMethod<
  UpdateResourceDataSyncRequest & RegionInput,
  UpdateResourceDataSyncResult,
  UpdateResourceDataSyncError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3536, __c221, 0) as any as S.Schema<UpdateResourceDataSyncRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateResourceDataSyncResult>,
  errors: [
    InternalServerError,
    ResourceDataSyncConflictException,
    ResourceDataSyncInvalidConfigurationException,
    ResourceDataSyncNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceDataSync",
  telemetry: TELEMETRY,
  span: "UpdateResourceDataSync",
}));

export type UpdateServiceSettingError =
  | InternalServerError
  | ServiceSettingNotFound
  | TooManyUpdates
  | CommonErrors;
/**
 * `ServiceSetting` is an account-level setting for an Amazon Web Services service. This setting
 * defines how a user interacts with or uses a service or a feature of a service. For example, if an
 * Amazon Web Services service charges money to the account based on feature or service usage, then the Amazon Web Services
 * service team might create a default setting of "false". This means the user can't use this
 * feature unless they change the setting to "true" and intentionally opt in for a paid
 * feature.
 *
 * Services map a `SettingId` object to a setting value. Amazon Web Services services teams define
 * the default value for a `SettingId`. You can't create a new `SettingId`,
 * but you can overwrite the default value if you have the `ssm:UpdateServiceSetting`
 * permission for the setting. Use the GetServiceSetting API operation to view the
 * current value. Or, use the ResetServiceSetting to change the value back to the
 * original value defined by the Amazon Web Services service team.
 *
 * Update the service setting for the account.
 */
export const updateServiceSetting: API.OperationMethod<
  UpdateServiceSettingRequest & RegionInput,
  UpdateServiceSettingResult,
  UpdateServiceSettingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3552, __c222, 0) as any as S.Schema<UpdateServiceSettingRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateServiceSettingResult>,
  errors: [InternalServerError, ServiceSettingNotFound, TooManyUpdates],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSetting",
  telemetry: TELEMETRY,
  span: "UpdateServiceSetting",
}));

export type ValidateCloudConnectorError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Validates the configuration and connectivity of a cloud connector.
 */
export const validateCloudConnector: API.PaginatedOperationMethod<
  ValidateCloudConnectorRequest & RegionInput,
  ValidateCloudConnectorResult,
  ValidateCloudConnectorError,
  Creds | HttpClient.HttpClient,
  ValidationFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3568, __c223, 0) as any as S.Schema<ValidateCloudConnectorRequest>,
  output: __S(3572, __c223, 4) as any as S.Schema<ValidateCloudConnectorResult>,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateCloudConnector",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ValidationFindings",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ValidateCloudConnector",
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.String, ResourceId: S.String, Tags: __S(33, __c2, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsToResourceRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AddTagsToResourceResult",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(32, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OpsItemId: S.String,
          AssociationType: S.String,
          ResourceType: S.String,
          ResourceUri: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateOpsItemRelatedItemRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AssociationId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "AssociateOpsItemRelatedItemResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CommandId: S.String, InstanceIds: S.optional(__S(3584, __c224, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelCommandRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WindowExecutionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelMaintenanceWindowExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ WindowExecutionId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CancelMaintenanceWindowExecutionResult" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          DefaultInstanceName: S.optional(S.String),
          IamRole: S.String,
          RegistrationLimit: S.optional(S.Number),
          ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(33, __c2, 1)),
          RegistrationMetadata: S.optional(__S(33, __c2, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateActivationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ActivationId: S.optional(S.String), ActivationCode: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "CreateActivationResult" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DocumentVersion: S.optional(S.String),
          InstanceId: S.optional(S.String),
          Parameters: S.optional(__S(176, __c11, 0)),
          Targets: S.optional(__S(161, __c10, 1)),
          ScheduleExpression: S.optional(S.String),
          OutputLocation: S.optional(__S(273, __c17, 1)),
          AssociationName: S.optional(S.String),
          AutomationTargetParameterName: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          MaxConcurrency: S.optional(S.String),
          ComplianceSeverity: S.optional(S.String),
          SyncCompliance: S.optional(S.String),
          ApplyOnlyAtCronInterval: S.optional(S.Boolean),
          CalendarNames: S.optional(__S(3584, __c224, 0)),
          TargetLocations: S.optional(__S(224, __c14, 0)),
          ScheduleOffset: S.optional(S.Number),
          Duration: S.optional(S.Number),
          TargetMaps: S.optional(__S(208, __c13, 0)),
          Tags: S.optional(__S(33, __c2, 1)),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
          AssociationDispatchAssumeRole: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAssociationRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String })).annotate({ identifier: "Alarm" });
    case 1:
      return S.Array(__S(128, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ IgnorePollAlarmFailure: S.optional(S.Boolean), Alarms: __S(129, __c8, 1) }),
      ).annotate({ identifier: "AlarmConfiguration" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, State: S.String })).annotate({
        identifier: "AlarmStateInformation",
      });
    case 1:
      return S.Array(__S(144, __c9, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Values: S.optional(__S(3584, __c224, 0)) }),
      ).annotate({ identifier: "Target" });
    case 1:
      return S.Array(__S(160, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(3584, __c224, 0).pipe(S.optional));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Accounts: S.optional(__S(3584, __c224, 0)),
          Regions: S.optional(__S(3584, __c224, 0)),
          TargetLocationMaxConcurrency: S.optional(S.String),
          TargetLocationMaxErrors: S.optional(S.String),
          ExecutionRoleName: S.optional(S.String),
          TargetLocationAlarmConfiguration: S.optional(__S(130, __c8, 2)),
          IncludeChildOrganizationUnits: S.optional(S.Boolean),
          ExcludeAccounts: S.optional(__S(3584, __c224, 0)),
          Targets: S.optional(__S(161, __c10, 1)),
          TargetsMaxConcurrency: S.optional(S.String),
          TargetsMaxErrors: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetLocation" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(176, __c11, 0));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(192, __c12, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          DetailedStatus: S.optional(S.String),
          AssociationStatusAggregatedCount: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "AssociationOverview" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OutputS3Region: S.optional(S.String),
          OutputS3BucketName: S.optional(S.String),
          OutputS3KeyPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3OutputLocation" });
    case 1:
      return S.suspend(() => S.Struct({ S3Location: S.optional(__S(272, __c17, 0)) })).annotate({
        identifier: "InstanceAssociationOutputLocation",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Date: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Name: S.String,
          Message: S.String,
          AdditionalInfo: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociationStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          InstanceId: S.optional(S.String),
          AssociationVersion: S.optional(S.String),
          Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdateAssociationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(__S(288, __c18, 0)),
          Overview: S.optional(__S(256, __c16, 0)),
          DocumentVersion: S.optional(S.String),
          AutomationTargetParameterName: S.optional(S.String),
          Parameters: S.optional(__S(176, __c11, 0)),
          AssociationId: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          ScheduleExpression: S.optional(S.String),
          OutputLocation: S.optional(__S(273, __c17, 1)),
          LastExecutionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSuccessfulExecutionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AssociationName: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          MaxConcurrency: S.optional(S.String),
          ComplianceSeverity: S.optional(S.String),
          SyncCompliance: S.optional(S.String),
          ApplyOnlyAtCronInterval: S.optional(S.Boolean),
          CalendarNames: S.optional(__S(3584, __c224, 0)),
          TargetLocations: S.optional(__S(224, __c14, 0)),
          ScheduleOffset: S.optional(S.Number),
          Duration: S.optional(S.Number),
          TargetMaps: S.optional(__S(208, __c13, 0)),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
          TriggeredAlarms: S.optional(__S(145, __c9, 1)),
          AssociationDispatchAssumeRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociationDescription" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AssociationDescription: S.optional(__S(289, __c18, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateAssociationResult" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          InstanceId: S.optional(S.String),
          Parameters: S.optional(__S(176, __c11, 0)),
          AutomationTargetParameterName: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          ScheduleExpression: S.optional(S.String),
          OutputLocation: S.optional(__S(273, __c17, 1)),
          AssociationName: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          MaxConcurrency: S.optional(S.String),
          ComplianceSeverity: S.optional(S.String),
          SyncCompliance: S.optional(S.String),
          ApplyOnlyAtCronInterval: S.optional(S.Boolean),
          CalendarNames: S.optional(__S(3584, __c224, 0)),
          TargetLocations: S.optional(__S(224, __c14, 0)),
          ScheduleOffset: S.optional(S.Number),
          Duration: S.optional(S.Number),
          TargetMaps: S.optional(__S(208, __c13, 0)),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
        }),
      ).annotate({ identifier: "CreateAssociationBatchRequestEntry" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(320, __c20, 0)
          .pipe(/*@__PURE__*/ T.XmlName("entries"))
          .annotate({ identifier: "CreateAssociationBatchRequestEntry" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Entries: __S(321, __c20, 1),
          AssociationDispatchAssumeRole: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAssociationBatchRequest" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(289, __c18, 1)
          .pipe(/*@__PURE__*/ T.XmlName("AssociationDescription"))
          .annotate({ identifier: "AssociationDescription" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          Entry: S.optional(__S(320, __c20, 0)),
          Message: S.optional(S.String),
          Fault: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailedCreateAssociation" });
    case 5:
      return S.Array(
        /*@__PURE__*/ __S(324, __c20, 4)
          .pipe(/*@__PURE__*/ T.XmlName("FailedCreateAssociationEntry"))
          .annotate({ identifier: "FailedCreateAssociation" }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          Successful: S.optional(__S(323, __c20, 3)),
          Failed: S.optional(__S(325, __c20, 5)),
        }).pipe(ns),
      ).annotate({ identifier: "CreateAssociationBatchResult" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisplayName: S.String,
          RoleArn: S.String,
          Description: S.optional(S.String),
          Configuration: __S(372, __c23, 4),
          ConfigConnectorArn: S.String,
          Tags: S.optional(__S(33, __c2, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCloudConnectorRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CloudConnectorId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateCloudConnectorResult" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String, DisplayName: S.optional(S.String) }),
      ).annotate({ identifier: "AzureSubscription" });
    case 1:
      return S.Array(__S(368, __c23, 0));
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ Subscriptions: __S(369, __c23, 1) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          TenantId: S.String,
          TenantDisplayName: S.optional(S.String),
          ApplicationId: S.String,
          ApplicationDisplayName: S.optional(S.String),
          Targets: S.optional(__S(370, __c23, 2)),
        }),
      ).annotate({ identifier: "AzureConfiguration" });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ AzureConfiguration: __S(371, __c23, 3) })]);
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Content: S.String,
          Requires: S.optional(__S(401, __c25, 1)),
          Attachments: S.optional(__S(449, __c28, 1)),
          Name: S.String,
          DisplayName: S.optional(S.String),
          VersionName: S.optional(S.String),
          DocumentType: S.optional(S.String),
          DocumentFormat: S.optional(S.String),
          TargetType: S.optional(S.String),
          Tags: S.optional(__S(33, __c2, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDocumentRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Version: S.optional(S.String),
          RequireType: S.optional(S.String),
          VersionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentRequires" });
    case 1:
      return S.Array(__S(400, __c25, 0));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("PlatformType")));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          DefaultValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentParameter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(432, __c27, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DocumentParameter"))
          .annotate({ identifier: "DocumentParameter" }),
      );
    case 2:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "AttachmentInformation",
      });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(434, __c27, 2)
          .pipe(/*@__PURE__*/ T.XmlName("AttachmentInformation"))
          .annotate({ identifier: "AttachmentInformation" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          ReviewedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          Reviewer: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReviewInformation" });
    case 5:
      return S.Array(
        /*@__PURE__*/ __S(436, __c27, 4)
          .pipe(/*@__PURE__*/ T.XmlName("ReviewInformation"))
          .annotate({ identifier: "ReviewInformation" }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          Sha1: S.optional(S.String),
          Hash: S.optional(S.String),
          HashType: S.optional(S.String),
          Name: S.optional(S.String),
          DisplayName: S.optional(S.String),
          VersionName: S.optional(S.String),
          Owner: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusInformation: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          Description: S.optional(S.String),
          Parameters: S.optional(__S(433, __c27, 1)),
          PlatformTypes: S.optional(__S(416, __c26, 0)),
          DocumentType: S.optional(S.String),
          SchemaVersion: S.optional(S.String),
          LatestVersion: S.optional(S.String),
          DefaultVersion: S.optional(S.String),
          DocumentFormat: S.optional(S.String),
          TargetType: S.optional(S.String),
          Tags: S.optional(__S(33, __c2, 1)),
          AttachmentsInformation: S.optional(__S(435, __c27, 3)),
          Requires: S.optional(__S(401, __c25, 1)),
          Author: S.optional(S.String),
          ReviewInformation: S.optional(__S(437, __c27, 5)),
          ApprovedVersion: S.optional(S.String),
          PendingReviewVersion: S.optional(S.String),
          ReviewStatus: S.optional(S.String),
          Category: S.optional(__S(3584, __c224, 0)),
          CategoryEnum: S.optional(__S(3584, __c224, 0)),
        }),
      ).annotate({ identifier: "DocumentDescription" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Values: S.optional(__S(3584, __c224, 0)),
          Name: S.optional(S.String),
        }),
      ).annotate({ identifier: "AttachmentsSource" });
    case 1:
      return S.Array(__S(448, __c28, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ DocumentDescription: S.optional(__S(438, __c27, 6)) }).pipe(ns),
      ).annotate({ identifier: "CreateDocumentResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(SensitiveString),
          StartDate: S.optional(S.String),
          EndDate: S.optional(S.String),
          Schedule: S.String,
          ScheduleTimezone: S.optional(S.String),
          ScheduleOffset: S.optional(S.Number),
          Duration: S.Number,
          Cutoff: S.Number,
          AllowUnassociatedTargets: S.Boolean,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(33, __c2, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMaintenanceWindowRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ WindowId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateMaintenanceWindowResult",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.String,
          OpsItemType: S.optional(S.String),
          OperationalData: S.optional(__S(513, __c32, 1)),
          Notifications: S.optional(__S(544, __c34, 0)),
          Priority: S.optional(S.Number),
          RelatedOpsItems: S.optional(__S(546, __c34, 2)),
          Source: S.String,
          Title: S.String,
          Tags: S.optional(__S(33, __c2, 1)),
          Category: S.optional(S.String),
          Severity: S.optional(S.String),
          ActualStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActualEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PlannedStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PlannedEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AccountId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateOpsItemRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ OpsItemId: S.optional(S.String), OpsItemArn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateOpsItemResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "OpsItemDataValue" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(512, __c32, 0).pipe(S.optional));
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "OpsItemNotification",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(528, __c33, 0));
    case 1:
      return S.suspend(() => S.Struct({ OpsItemId: S.String })).annotate({
        identifier: "RelatedOpsItem",
      });
    case 2:
      return S.Array(__S(545, __c34, 1));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.String,
          Metadata: S.optional(__S(577, __c36, 1)),
          Tags: S.optional(__S(33, __c2, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateOpsMetadataRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Value: S.optional(S.String) })).annotate({
        identifier: "MetadataValue",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(576, __c36, 0).pipe(S.optional));
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ OpsMetadataArn: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateOpsMetadataResult",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OperatingSystem: S.optional(S.String),
          Name: S.String,
          GlobalFilters: S.optional(__S(656, __c41, 0)),
          ApprovalRules: S.optional(__S(659, __c41, 3)),
          ApprovedPatches: S.optional(__S(3584, __c224, 0)),
          ApprovedPatchesComplianceLevel: S.optional(S.String),
          ApprovedPatchesEnableNonSecurity: S.optional(S.Boolean),
          RejectedPatches: S.optional(__S(3584, __c224, 0)),
          RejectedPatchesAction: S.optional(S.String),
          Description: S.optional(S.String),
          Sources: S.optional(__S(661, __c41, 5)),
          AvailableSecurityUpdatesComplianceStatus: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(33, __c2, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePatchBaselineRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ BaselineId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreatePatchBaselineResult",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Values: __S(3584, __c224, 0) })).annotate({
        identifier: "PatchFilter",
      });
    case 1:
      return S.Array(__S(640, __c40, 0));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PatchFilters: __S(641, __c40, 1) })).annotate({
        identifier: "PatchFilterGroup",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PatchFilterGroup: __S(656, __c41, 0),
          ComplianceLevel: S.optional(S.String),
          ApproveAfterDays: S.optional(S.Number),
          ApproveUntilDate: S.optional(S.String),
          EnableNonSecurity: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PatchRule" });
    case 2:
      return S.Array(__S(657, __c41, 1));
    case 3:
      return S.suspend(() => S.Struct({ PatchRules: __S(658, __c41, 2) })).annotate({
        identifier: "PatchRuleGroup",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Products: __S(3584, __c224, 0),
          Configuration: SensitiveString,
        }),
      ).annotate({ identifier: "PatchSource" });
    case 5:
      return S.Array(__S(660, __c41, 4));
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SyncName: S.String,
          S3Destination: S.optional(__S(689, __c43, 1)),
          SyncType: S.optional(S.String),
          SyncSource: S.optional(__S(720, __c45, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateResourceDataSyncRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DestinationDataSharingType: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceDataSyncDestinationDataSharing" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.String,
          Prefix: S.optional(S.String),
          SyncFormat: S.String,
          Region: S.String,
          AWSKMSKeyARN: S.optional(S.String),
          DestinationDataSharing: S.optional(__S(688, __c43, 0)),
        }),
      ).annotate({ identifier: "ResourceDataSyncS3Destination" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ OrganizationalUnitId: S.optional(S.String) })).annotate({
        identifier: "ResourceDataSyncOrganizationalUnit",
      });
    case 1:
      return S.Array(__S(704, __c44, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          OrganizationSourceType: S.String,
          OrganizationalUnits: S.optional(__S(705, __c44, 1)),
        }),
      ).annotate({ identifier: "ResourceDataSyncAwsOrganizationsSource" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.String,
          AwsOrganizationsSource: S.optional(__S(706, __c44, 2)),
          SourceRegions: __S(3584, __c224, 0),
          IncludeFutureRegions: S.optional(S.Boolean),
          EnableAllOpsDataSources: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ResourceDataSyncSource" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ActivationId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteActivationRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          InstanceId: S.optional(S.String),
          AssociationId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteAssociationRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CloudConnectorId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCloudConnectorRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DocumentVersion: S.optional(S.String),
          VersionName: S.optional(S.String),
          Force: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteDocumentRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.String,
          SchemaDeleteOption: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteInventoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeletionId: S.optional(S.String),
          TypeName: S.optional(S.String),
          DeletionSummary: S.optional(__S(818, __c51, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteInventoryResult" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Version: S.optional(S.String),
          Count: S.optional(S.Number),
          RemainingCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InventoryDeletionSummaryItem" });
    case 1:
      return S.Array(__S(816, __c51, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TotalCount: S.optional(S.Number),
          RemainingCount: S.optional(S.Number),
          SummaryItems: S.optional(__S(817, __c51, 1)),
        }),
      ).annotate({ identifier: "InventoryDeletionSummary" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WindowId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMaintenanceWindowRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OpsItemId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOpsItemRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OpsMetadataArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOpsMetadataRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteParameterRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Names: __S(3584, __c224, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteParametersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeletedParameters: S.optional(__S(3584, __c224, 0)),
          InvalidParameters: S.optional(__S(3584, __c224, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteParametersResult" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BaselineId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePatchBaselineRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SyncName: S.String, SyncType: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourceDataSyncRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          PolicyId: S.String,
          PolicyHash: S.String,
          DeletionMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterDefaultHostManagementConfigurationRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterManagedInstanceRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BaselineId: S.String, PatchGroup: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterPatchBaselineForPatchGroupRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BaselineId: S.optional(S.String), PatchGroup: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DeregisterPatchBaselineForPatchGroupResult" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.String,
          WindowTargetId: S.String,
          Safe: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeregisterTargetFromMaintenanceWindowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ WindowId: S.optional(S.String), WindowTargetId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DeregisterTargetFromMaintenanceWindowResult" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WindowId: S.String, WindowTaskId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterTaskFromMaintenanceWindowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ WindowId: S.optional(S.String), WindowTaskId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DeregisterTaskFromMaintenanceWindowResult" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1073, __c67, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeActivationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ActivationId: S.optional(S.String),
          Description: S.optional(S.String),
          DefaultInstanceName: S.optional(S.String),
          IamRole: S.optional(S.String),
          RegistrationLimit: S.optional(S.Number),
          RegistrationsCount: S.optional(S.Number),
          ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Expired: S.optional(S.Boolean),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(33, __c2, 1)),
        }),
      ).annotate({ identifier: "Activation" });
    case 2:
      return S.Array(__S(1057, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ActivationList: S.optional(__S(1058, __c66, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeActivationsResult" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FilterKey: S.optional(S.String),
          FilterValues: S.optional(__S(3584, __c224, 0)),
        }),
      ).annotate({ identifier: "DescribeActivationsFilter" });
    case 1:
      return S.Array(__S(1072, __c67, 0));
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          InstanceId: S.optional(S.String),
          AssociationId: S.optional(S.String),
          AssociationVersion: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAssociationRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String, Type: S.String })).annotate(
        { identifier: "AssociationExecutionFilter" },
      );
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1104, __c69, 0)
          .pipe(/*@__PURE__*/ T.XmlName("AssociationExecutionFilter"))
          .annotate({ identifier: "AssociationExecutionFilter" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.String,
          Filters: S.optional(__S(1105, __c69, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAssociationExecutionsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          AssociationVersion: S.optional(S.String),
          ExecutionId: S.optional(S.String),
          Status: S.optional(S.String),
          DetailedStatus: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastExecutionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceCountByStatus: S.optional(S.String),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
          TriggeredAlarms: S.optional(__S(145, __c9, 1)),
        }),
      ).annotate({ identifier: "AssociationExecution" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(1107, __c69, 3)
          .pipe(/*@__PURE__*/ T.XmlName("AssociationExecution"))
          .annotate({ identifier: "AssociationExecution" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          AssociationExecutions: S.optional(__S(1108, __c69, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAssociationExecutionsResult" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "AssociationExecutionTargetsFilter",
      });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1120, __c70, 0)
          .pipe(/*@__PURE__*/ T.XmlName("AssociationExecutionTargetsFilter"))
          .annotate({ identifier: "AssociationExecutionTargetsFilter" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.String,
          ExecutionId: S.String,
          Filters: S.optional(__S(1121, __c70, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAssociationExecutionTargetsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ OutputSourceId: S.optional(S.String), OutputSourceType: S.optional(S.String) }),
      ).annotate({ identifier: "OutputSource" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          AssociationVersion: S.optional(S.String),
          ExecutionId: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Status: S.optional(S.String),
          DetailedStatus: S.optional(S.String),
          LastExecutionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OutputSource: S.optional(__S(1123, __c70, 3)),
        }),
      ).annotate({ identifier: "AssociationExecutionTarget" });
    case 5:
      return S.Array(
        /*@__PURE__*/ __S(1124, __c70, 4)
          .pipe(/*@__PURE__*/ T.XmlName("AssociationExecutionTarget"))
          .annotate({ identifier: "AssociationExecutionTarget" }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          AssociationExecutionTargets: S.optional(__S(1125, __c70, 5)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAssociationExecutionTargetsResult" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(641, __c40, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAutomationExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutomationExecutionId: S.optional(S.String),
          DocumentName: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          AutomationExecutionStatus: S.optional(S.String),
          ExecutionStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExecutionEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExecutedBy: S.optional(S.String),
          LogFile: S.optional(S.String),
          Outputs: S.optional(__S(176, __c11, 0)),
          Mode: S.optional(S.String),
          ParentAutomationExecutionId: S.optional(S.String),
          CurrentStepName: S.optional(S.String),
          CurrentAction: S.optional(S.String),
          FailureMessage: S.optional(S.String),
          WarningMessage: S.optional(S.String),
          TargetParameterName: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          TargetMaps: S.optional(__S(208, __c13, 0)),
          ResolvedTargets: S.optional(__S(1152, __c72, 0)),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          Target: S.optional(S.String),
          AutomationType: S.optional(S.String),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
          TriggeredAlarms: S.optional(__S(145, __c9, 1)),
          TargetLocationsURL: S.optional(S.String),
          AutomationSubtype: S.optional(S.String),
          ScheduledTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Runbooks: S.optional(__S(1169, __c73, 1)),
          OpsItemId: S.optional(S.String),
          AssociationId: S.optional(S.String),
          ChangeRequestName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutomationExecutionMetadata" });
    case 2:
      return S.Array(__S(1137, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AutomationExecutionMetadataList: S.optional(__S(1138, __c71, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAutomationExecutionsResult" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterValues: S.optional(__S(3584, __c224, 0)),
          Truncated: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ResolvedTargets" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DocumentName: S.String,
          DocumentVersion: S.optional(S.String),
          Parameters: S.optional(__S(176, __c11, 0)),
          TargetParameterName: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          TargetMaps: S.optional(__S(208, __c13, 0)),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          TargetLocations: S.optional(__S(224, __c14, 0)),
        }),
      ).annotate({ identifier: "Runbook" });
    case 1:
      return S.Array(__S(1168, __c73, 0));
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutomationExecutionId: S.String,
          Filters: S.optional(__S(641, __c40, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          ReverseOrder: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAutomationStepExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StepExecutions: S.optional(__S(1219, __c76, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAutomationStepExecutionsResult" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FailureStage: S.optional(S.String),
          FailureType: S.optional(S.String),
          Details: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "FailureDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StepExecutionId: S.optional(S.String),
          StepName: S.optional(S.String),
          Action: S.optional(S.String),
          Iteration: S.optional(S.Number),
          IteratorValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "ParentStepDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          StepName: S.optional(S.String),
          Action: S.optional(S.String),
          TimeoutSeconds: S.optional(S.Number),
          OnFailure: S.optional(S.String),
          MaxAttempts: S.optional(S.Number),
          ExecutionStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExecutionEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StepStatus: S.optional(S.String),
          ResponseCode: S.optional(S.String),
          Inputs: S.optional(__S(1200, __c75, 0)),
          Outputs: S.optional(__S(176, __c11, 0)),
          Response: S.optional(S.String),
          FailureMessage: S.optional(S.String),
          WarningMessage: S.optional(S.String),
          FailureDetails: S.optional(__S(1216, __c76, 0)),
          StepExecutionId: S.optional(S.String),
          OverriddenParameters: S.optional(__S(176, __c11, 0)),
          IsEnd: S.optional(S.Boolean),
          NextStep: S.optional(S.String),
          IsCritical: S.optional(S.Boolean),
          ValidNextSteps: S.optional(__S(3584, __c224, 0)),
          Targets: S.optional(__S(161, __c10, 1)),
          TargetLocation: S.optional(__S(192, __c12, 0)),
          TriggeredAlarms: S.optional(__S(145, __c9, 1)),
          ParentStepDetails: S.optional(__S(1217, __c76, 1)),
        }),
      ).annotate({ identifier: "StepExecution" });
    case 3:
      return S.Array(__S(1218, __c76, 2));
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(161, __c10, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAvailablePatchesRequest" });
    case 1:
      return S.Array(__S(1248, __c78, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Patches: S.optional(__S(1233, __c77, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAvailablePatchesResult" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ReleaseDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Title: S.optional(S.String),
          Description: S.optional(S.String),
          ContentUrl: S.optional(S.String),
          Vendor: S.optional(S.String),
          ProductFamily: S.optional(S.String),
          Product: S.optional(S.String),
          Classification: S.optional(S.String),
          MsrcSeverity: S.optional(S.String),
          KbNumber: S.optional(S.String),
          MsrcNumber: S.optional(S.String),
          Language: S.optional(S.String),
          AdvisoryIds: S.optional(__S(3584, __c224, 0)),
          BugzillaIds: S.optional(__S(3584, __c224, 0)),
          CVEIds: S.optional(__S(3584, __c224, 0)),
          Name: S.optional(S.String),
          Epoch: S.optional(S.Number),
          Version: S.optional(S.String),
          Release: S.optional(S.String),
          Arch: S.optional(S.String),
          Severity: S.optional(S.String),
          Repository: S.optional(S.String),
        }),
      ).annotate({ identifier: "Patch" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DocumentVersion: S.optional(S.String),
          VersionName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDocumentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Document: S.optional(__S(438, __c27, 6)) }).pipe(ns),
      ).annotate({ identifier: "DescribeDocumentResult" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          PermissionType: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDocumentPermissionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), SharedDocumentVersion: S.optional(S.String) }),
      ).annotate({ identifier: "AccountSharingInfo" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1281, __c80, 1)
          .pipe(/*@__PURE__*/ T.XmlName("AccountSharingInfo"))
          .annotate({ identifier: "AccountSharingInfo" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccountIds: S.optional(__S(1296, __c81, 0)),
          AccountSharingInfoList: S.optional(__S(1282, __c80, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDocumentPermissionResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AccountId")));
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEffectiveInstanceAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          Content: S.optional(S.String),
          AssociationVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceAssociation" });
    case 2:
      return S.Array(__S(1313, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Associations: S.optional(__S(1314, __c82, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeEffectiveInstanceAssociationsResult" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BaselineId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEffectivePatchesForPatchBaselineRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeploymentStatus: S.optional(S.String),
          ComplianceLevel: S.optional(S.String),
          ApprovalDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PatchStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Patch: S.optional(__S(1248, __c78, 0)),
          PatchStatus: S.optional(__S(1329, __c83, 1)),
        }),
      ).annotate({ identifier: "EffectivePatch" });
    case 3:
      return S.Array(__S(1330, __c83, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          EffectivePatches: S.optional(__S(1331, __c83, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeEffectivePatchesForPatchBaselineResult" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInstanceAssociationsStatusRequest" });
    case 1:
      return S.suspend(() => S.Struct({ OutputUrl: S.optional(S.String) })).annotate({
        identifier: "S3OutputUrl",
      });
    case 2:
      return S.suspend(() => S.Struct({ S3OutputUrl: S.optional(__S(1345, __c84, 1)) })).annotate({
        identifier: "InstanceAssociationOutputUrl",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          Name: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          AssociationVersion: S.optional(S.String),
          InstanceId: S.optional(S.String),
          ExecutionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          DetailedStatus: S.optional(S.String),
          ExecutionSummary: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          OutputUrl: S.optional(__S(1346, __c84, 2)),
          AssociationName: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceAssociationStatusInfo" });
    case 4:
      return S.Array(__S(1347, __c84, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          InstanceAssociationStatusInfos: S.optional(__S(1348, __c84, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeInstanceAssociationsStatusResult" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("InstanceInformationFilterValue")),
      );
    case 1:
      return S.suspend(() => S.Struct({ key: S.String, valueSet: __S(1360, __c85, 0) })).annotate({
        identifier: "InstanceInformationFilter",
      });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1361, __c85, 1)
          .pipe(/*@__PURE__*/ T.XmlName("InstanceInformationFilter"))
          .annotate({ identifier: "InstanceInformationFilter" }),
      );
    case 3:
      return S.suspend(() => S.Struct({ Key: S.String, Values: __S(1360, __c85, 0) })).annotate({
        identifier: "InstanceInformationStringFilter",
      });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(1363, __c85, 3)
          .pipe(/*@__PURE__*/ T.XmlName("InstanceInformationStringFilter"))
          .annotate({ identifier: "InstanceInformationStringFilter" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          InstanceInformationFilterList: S.optional(__S(1362, __c85, 2)),
          Filters: S.optional(__S(1364, __c85, 4)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInstanceInformationRequest" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          PingStatus: S.optional(S.String),
          LastPingDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AgentVersion: S.optional(S.String),
          IsLatestVersion: S.optional(S.Boolean),
          PlatformType: S.optional(S.String),
          PlatformName: S.optional(S.String),
          PlatformVersion: S.optional(S.String),
          ActivationId: S.optional(S.String),
          IamRole: S.optional(S.String),
          RegistrationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceType: S.optional(S.String),
          Name: S.optional(S.String),
          IPAddress: S.optional(SensitiveString),
          ComputerName: S.optional(S.String),
          AssociationStatus: S.optional(S.String),
          LastAssociationExecutionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSuccessfulAssociationExecutionDate: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          AssociationOverview: S.optional(__S(1376, __c86, 0)),
          SourceId: S.optional(S.String),
          SourceType: S.optional(S.String),
          SourceLocation: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceInformation" });
    case 7:
      return S.Array(
        /*@__PURE__*/ __S(1366, __c85, 6)
          .pipe(/*@__PURE__*/ T.XmlName("InstanceInformation"))
          .annotate({ identifier: "InstanceInformation" }),
      );
    case 8:
      return S.suspend(() =>
        S.Struct({
          InstanceInformationList: S.optional(__S(1367, __c85, 7)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeInstanceInformationResult" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetailedStatus: S.optional(S.String),
          InstanceAssociationStatusAggregatedCount: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "InstanceAggregatedAssociationOverview" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String,
          Filters: S.optional(__S(161, __c10, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInstancePatchesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Title: S.String,
          KBId: S.String,
          Classification: S.String,
          Severity: S.String,
          State: S.String,
          InstalledTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          CVEIds: S.optional(S.String),
        }),
      ).annotate({ identifier: "PatchComplianceData" });
    case 2:
      return S.Array(__S(1393, __c87, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Patches: S.optional(__S(1394, __c87, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeInstancePatchesResult" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceIds: __S(3584, __c224, 0),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInstancePatchStatesRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String,
          PatchGroup: S.String,
          BaselineId: S.String,
          SnapshotId: S.optional(S.String),
          InstallOverrideList: S.optional(S.String),
          OwnerInformation: S.optional(SensitiveString),
          InstalledCount: S.optional(S.Number),
          InstalledOtherCount: S.optional(S.Number),
          InstalledPendingRebootCount: S.optional(S.Number),
          InstalledRejectedCount: S.optional(S.Number),
          MissingCount: S.optional(S.Number),
          FailedCount: S.optional(S.Number),
          UnreportedNotApplicableCount: S.optional(S.Number),
          NotApplicableCount: S.optional(S.Number),
          AvailableSecurityUpdateCount: S.optional(S.Number),
          OperationStartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          OperationEndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Operation: S.String,
          LastNoRebootInstallOperationTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          RebootOption: S.optional(S.String),
          CriticalNonCompliantCount: S.optional(S.Number),
          SecurityNonCompliantCount: S.optional(S.Number),
          OtherNonCompliantCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstancePatchState" });
    case 1:
      return S.Array(__S(1424, __c89, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          InstancePatchStates: S.optional(__S(1425, __c89, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeInstancePatchStatesResult" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.String, Values: __S(3584, __c224, 0), Type: S.String }),
      ).annotate({ identifier: "InstancePatchStateFilter" });
    case 1:
      return S.Array(__S(1440, __c90, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PatchGroup: S.String,
          Filters: S.optional(__S(1441, __c90, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInstancePatchStatesForPatchGroupRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("InstancePropertyFilterValue")),
      );
    case 1:
      return S.suspend(() => S.Struct({ key: S.String, valueSet: __S(1456, __c91, 0) })).annotate({
        identifier: "InstancePropertyFilter",
      });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1457, __c91, 1)
          .pipe(/*@__PURE__*/ T.XmlName("InstancePropertyFilter"))
          .annotate({ identifier: "InstancePropertyFilter" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ Key: S.String, Values: __S(1456, __c91, 0), Operator: S.optional(S.String) }),
      ).annotate({ identifier: "InstancePropertyStringFilter" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(1459, __c91, 3)
          .pipe(/*@__PURE__*/ T.XmlName("InstancePropertyStringFilter"))
          .annotate({ identifier: "InstancePropertyStringFilter" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          InstancePropertyFilterList: S.optional(__S(1458, __c91, 2)),
          FiltersWithOperator: S.optional(__S(1460, __c91, 4)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInstancePropertiesRequest" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          InstanceId: S.optional(S.String),
          InstanceType: S.optional(S.String),
          InstanceRole: S.optional(S.String),
          KeyName: S.optional(S.String),
          InstanceState: S.optional(S.String),
          Architecture: S.optional(S.String),
          IPAddress: S.optional(SensitiveString),
          LaunchTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PingStatus: S.optional(S.String),
          LastPingDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AgentVersion: S.optional(S.String),
          PlatformType: S.optional(S.String),
          PlatformName: S.optional(S.String),
          PlatformVersion: S.optional(S.String),
          ActivationId: S.optional(S.String),
          IamRole: S.optional(S.String),
          RegistrationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceType: S.optional(S.String),
          ComputerName: S.optional(S.String),
          AssociationStatus: S.optional(S.String),
          LastAssociationExecutionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSuccessfulAssociationExecutionDate: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          AssociationOverview: S.optional(__S(1376, __c86, 0)),
          SourceId: S.optional(S.String),
          SourceType: S.optional(S.String),
          SourceLocation: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceProperty" });
    case 7:
      return S.Array(
        /*@__PURE__*/ __S(1462, __c91, 6)
          .pipe(/*@__PURE__*/ T.XmlName("InstanceProperty"))
          .annotate({ identifier: "InstanceProperty" }),
      );
    case 8:
      return S.suspend(() =>
        S.Struct({
          InstanceProperties: S.optional(__S(1463, __c91, 7)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeInstancePropertiesResult" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeletionId: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInventoryDeletionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeletionId: S.optional(S.String),
          TypeName: S.optional(S.String),
          DeletionStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastStatus: S.optional(S.String),
          LastStatusMessage: S.optional(S.String),
          DeletionSummary: S.optional(__S(818, __c51, 2)),
          LastStatusUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "InventoryDeletionStatusItem" });
    case 2:
      return S.Array(__S(1473, __c92, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          InventoryDeletions: S.optional(__S(1474, __c92, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeInventoryDeletionsResult" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.String,
          Filters: S.optional(__S(161, __c10, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMaintenanceWindowExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.optional(S.String),
          WindowExecutionId: S.optional(S.String),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MaintenanceWindowExecution" });
    case 2:
      return S.Array(__S(1489, __c93, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          WindowExecutions: S.optional(__S(1490, __c93, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMaintenanceWindowExecutionsResult" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowExecutionId: S.String,
          TaskId: S.String,
          Filters: S.optional(__S(161, __c10, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMaintenanceWindowExecutionTaskInvocationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowExecutionId: S.optional(S.String),
          TaskExecutionId: S.optional(S.String),
          InvocationId: S.optional(S.String),
          ExecutionId: S.optional(S.String),
          TaskType: S.optional(S.String),
          Parameters: S.optional(SensitiveString),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OwnerInformation: S.optional(SensitiveString),
          WindowTargetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "MaintenanceWindowExecutionTaskInvocationIdentity" });
    case 2:
      return S.Array(__S(1505, __c94, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          WindowExecutionTaskInvocationIdentities: S.optional(__S(1506, __c94, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMaintenanceWindowExecutionTaskInvocationsResult" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowExecutionId: S.String,
          Filters: S.optional(__S(161, __c10, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMaintenanceWindowExecutionTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowExecutionId: S.optional(S.String),
          TaskExecutionId: S.optional(S.String),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TaskArn: S.optional(S.String),
          TaskType: S.optional(S.String),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
          TriggeredAlarms: S.optional(__S(145, __c9, 1)),
        }),
      ).annotate({ identifier: "MaintenanceWindowExecutionTaskIdentity" });
    case 2:
      return S.Array(__S(1521, __c95, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          WindowExecutionTaskIdentities: S.optional(__S(1522, __c95, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMaintenanceWindowExecutionTasksResult" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(161, __c10, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMaintenanceWindowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          Enabled: S.optional(S.Boolean),
          Duration: S.optional(S.Number),
          Cutoff: S.optional(S.Number),
          Schedule: S.optional(S.String),
          ScheduleTimezone: S.optional(S.String),
          ScheduleOffset: S.optional(S.Number),
          EndDate: S.optional(S.String),
          StartDate: S.optional(S.String),
          NextExecutionTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "MaintenanceWindowIdentity" });
    case 2:
      return S.Array(__S(1537, __c96, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          WindowIdentities: S.optional(__S(1538, __c96, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMaintenanceWindowsResult" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          ResourceType: S.optional(S.String),
          Filters: S.optional(__S(161, __c10, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMaintenanceWindowScheduleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.optional(S.String),
          Name: S.optional(S.String),
          ExecutionTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledWindowExecution" });
    case 2:
      return S.Array(__S(1553, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScheduledWindowExecutions: S.optional(__S(1554, __c97, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMaintenanceWindowScheduleResult" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Targets: __S(161, __c10, 1),
          ResourceType: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMaintenanceWindowsForTargetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ WindowId: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "MaintenanceWindowIdentityForTarget" });
    case 2:
      return S.Array(__S(1569, __c98, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          WindowIdentities: S.optional(__S(1570, __c98, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMaintenanceWindowsForTargetResult" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.String,
          Filters: S.optional(__S(161, __c10, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMaintenanceWindowTargetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.optional(S.String),
          WindowTargetId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          OwnerInformation: S.optional(SensitiveString),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "MaintenanceWindowTarget" });
    case 2:
      return S.Array(__S(1585, __c99, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Targets: S.optional(__S(1586, __c99, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMaintenanceWindowTargetsResult" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.String,
          Filters: S.optional(__S(161, __c10, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMaintenanceWindowTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.optional(S.String),
          WindowTaskId: S.optional(S.String),
          TaskArn: S.optional(S.String),
          Type: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          TaskParameters: S.optional(__S(1618, __c101, 2)),
          Priority: S.optional(S.Number),
          LoggingInfo: S.optional(__S(1632, __c102, 0)),
          ServiceRoleArn: S.optional(S.String),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          CutoffBehavior: S.optional(S.String),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
        }),
      ).annotate({ identifier: "MaintenanceWindowTask" });
    case 2:
      return S.Array(__S(1601, __c100, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Tasks: S.optional(__S(1602, __c100, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeMaintenanceWindowTasksResult" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() => S.Struct({ Values: S.optional(__S(1616, __c101, 0)) })).annotate({
        identifier: "MaintenanceWindowTaskParameterValueExpression",
      });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(1617, __c101, 1).pipe(S.optional));
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3BucketName: S.String, S3KeyPrefix: S.optional(S.String), S3Region: S.String }),
      ).annotate({ identifier: "LoggingInfo" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OpsItemFilters: S.optional(__S(1665, __c104, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOpsItemsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedBy: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBy: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Priority: S.optional(S.Number),
          Source: S.optional(S.String),
          Status: S.optional(S.String),
          OpsItemId: S.optional(S.String),
          Title: S.optional(S.String),
          OperationalData: S.optional(__S(513, __c32, 1)),
          Category: S.optional(S.String),
          Severity: S.optional(S.String),
          OpsItemType: S.optional(S.String),
          ActualStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActualEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PlannedStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PlannedEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OpsItemSummary" });
    case 2:
      return S.Array(__S(1649, __c103, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          OpsItemSummaries: S.optional(__S(1650, __c103, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeOpsItemsResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.String, Values: __S(3584, __c224, 0), Operator: S.String }),
      ).annotate({ identifier: "OpsItemFilter" });
    case 1:
      return S.Array(__S(1664, __c104, 0));
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(641, __c40, 1)),
          ParameterFilters: S.optional(__S(1713, __c107, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Shared: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeParametersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ARN: S.optional(S.String),
          Type: S.optional(S.String),
          KeyId: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedUser: S.optional(S.String),
          Description: S.optional(S.String),
          AllowedPattern: S.optional(S.String),
          Version: S.optional(S.Number),
          Tier: S.optional(S.String),
          Policies: S.optional(__S(1697, __c106, 1)),
          DataType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ParameterMetadata" });
    case 2:
      return S.Array(__S(1681, __c105, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Parameters: S.optional(__S(1682, __c105, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeParametersResult" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyText: S.optional(S.String),
          PolicyType: S.optional(S.String),
          PolicyStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ParameterInlinePolicy" });
    case 1:
      return S.Array(__S(1696, __c106, 0));
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.String,
          Option: S.optional(S.String),
          Values: S.optional(__S(3584, __c224, 0)),
        }),
      ).annotate({ identifier: "ParameterStringFilter" });
    case 1:
      return S.Array(__S(1712, __c107, 0));
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(161, __c10, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePatchBaselinesRequest" });
    case 1:
      return S.Array(__S(1744, __c109, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          BaselineIdentities: S.optional(__S(1729, __c108, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribePatchBaselinesResult" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BaselineId: S.optional(S.String),
          BaselineName: S.optional(S.String),
          OperatingSystem: S.optional(S.String),
          BaselineDescription: S.optional(S.String),
          DefaultBaseline: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PatchBaselineIdentity" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(161, __c10, 1)),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePatchGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PatchGroup: S.optional(S.String),
          BaselineIdentity: S.optional(__S(1744, __c109, 0)),
        }),
      ).annotate({ identifier: "PatchGroupPatchBaselineMapping" });
    case 2:
      return S.Array(__S(1761, __c110, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Mappings: S.optional(__S(1762, __c110, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribePatchGroupsResult" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PatchGroup: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePatchGroupStateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Instances: S.optional(S.Number),
          InstancesWithInstalledPatches: S.optional(S.Number),
          InstancesWithInstalledOtherPatches: S.optional(S.Number),
          InstancesWithInstalledPendingRebootPatches: S.optional(S.Number),
          InstancesWithInstalledRejectedPatches: S.optional(S.Number),
          InstancesWithMissingPatches: S.optional(S.Number),
          InstancesWithFailedPatches: S.optional(S.Number),
          InstancesWithNotApplicablePatches: S.optional(S.Number),
          InstancesWithUnreportedNotApplicablePatches: S.optional(S.Number),
          InstancesWithCriticalNonCompliantPatches: S.optional(S.Number),
          InstancesWithSecurityNonCompliantPatches: S.optional(S.Number),
          InstancesWithOtherNonCompliantPatches: S.optional(S.Number),
          InstancesWithAvailableSecurityUpdates: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "DescribePatchGroupStateResult" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OperatingSystem: S.String,
          Property: S.String,
          PatchSet: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePatchPropertiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Properties: S.optional(__S(1808, __c113, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribePatchPropertiesResult" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1200, __c75, 0));
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          State: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(1856, __c116, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ S3OutputUrl: S.optional(S.String), CloudWatchOutputUrl: S.optional(S.String) }),
      ).annotate({ identifier: "SessionManagerOutputUrl" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.optional(S.String),
          Target: S.optional(S.String),
          Status: S.optional(S.String),
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DocumentName: S.optional(S.String),
          Owner: S.optional(S.String),
          Reason: S.optional(S.String),
          Details: S.optional(S.String),
          OutputUrl: S.optional(__S(1825, __c114, 1)),
          MaxSessionDuration: S.optional(S.String),
          AccessType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Session" });
    case 3:
      return S.Array(__S(1826, __c114, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Sessions: S.optional(__S(1827, __c114, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSessionsResponse" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "SessionFilter",
      });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1840, __c115, 0));
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OpsItemId: S.String, AssociationId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateOpsItemRelatedItemRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccessRequestId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccessTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessKeyId: S.String,
          SecretAccessKey: SensitiveString,
          SessionToken: SensitiveString,
          ExpirationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Credentials" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Credentials: S.optional(__S(1889, __c118, 1)),
          AccessRequestStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetAccessTokenResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutomationExecutionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAutomationExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TotalSteps: S.optional(S.Number),
          SuccessSteps: S.optional(S.Number),
          FailedSteps: S.optional(S.Number),
          CancelledSteps: S.optional(S.Number),
          TimedOutSteps: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ProgressCounters" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AutomationExecutionId: S.optional(S.String),
          DocumentName: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          ExecutionStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExecutionEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AutomationExecutionStatus: S.optional(S.String),
          StepExecutions: S.optional(__S(1219, __c76, 3)),
          StepExecutionsTruncated: S.optional(S.Boolean),
          Parameters: S.optional(__S(176, __c11, 0)),
          Outputs: S.optional(__S(176, __c11, 0)),
          FailureMessage: S.optional(S.String),
          WarningMessage: S.optional(S.String),
          Mode: S.optional(S.String),
          ParentAutomationExecutionId: S.optional(S.String),
          ExecutedBy: S.optional(S.String),
          CurrentStepName: S.optional(S.String),
          CurrentAction: S.optional(S.String),
          TargetParameterName: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          TargetMaps: S.optional(__S(208, __c13, 0)),
          ResolvedTargets: S.optional(__S(1152, __c72, 0)),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          Target: S.optional(S.String),
          TargetLocations: S.optional(__S(224, __c14, 0)),
          ProgressCounters: S.optional(__S(1905, __c119, 1)),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
          TriggeredAlarms: S.optional(__S(145, __c9, 1)),
          TargetLocationsURL: S.optional(S.String),
          AutomationSubtype: S.optional(S.String),
          ScheduledTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Runbooks: S.optional(__S(1169, __c73, 1)),
          OpsItemId: S.optional(S.String),
          AssociationId: S.optional(S.String),
          ChangeRequestName: S.optional(S.String),
          Variables: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "AutomationExecution" });
    case 3:
      return S.suspend(() =>
        S.Struct({ AutomationExecution: S.optional(__S(1906, __c119, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetAutomationExecutionResult" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CalendarNames: __S(3584, __c224, 0), AtTime: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCalendarStateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          AtTime: S.optional(S.String),
          NextTransitionTime: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetCalendarStateResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CloudConnectorId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCloudConnectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CloudConnectorArn: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Configuration: S.optional(__S(372, __c23, 4)),
          ConfigConnectorArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "GetCloudConnectorResult" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CommandId: S.String,
          InstanceId: S.String,
          PluginName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCommandInvocationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CommandId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          Comment: S.optional(S.String),
          DocumentName: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          PluginName: S.optional(S.String),
          ResponseCode: S.optional(S.Number),
          ExecutionStartDateTime: S.optional(S.String),
          ExecutionElapsedTime: S.optional(S.String),
          ExecutionEndDateTime: S.optional(S.String),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          StandardOutputContent: S.optional(S.String),
          StandardOutputUrl: S.optional(S.String),
          StandardErrorContent: S.optional(S.String),
          StandardErrorUrl: S.optional(S.String),
          CloudWatchOutputConfig: S.optional(__S(1968, __c123, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetCommandInvocationResult" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogGroupName: S.optional(S.String),
          CloudWatchOutputEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CloudWatchOutputConfig" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Target: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetConnectionStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Target: S.optional(S.String), Status: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "GetConnectionStatusResponse" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OperatingSystem: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDefaultPatchBaselineRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BaselineId: S.optional(S.String), OperatingSystem: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "GetDefaultPatchBaselineResult" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OperatingSystem: S.optional(S.String),
          GlobalFilters: S.optional(__S(656, __c41, 0)),
          ApprovalRules: S.optional(__S(659, __c41, 3)),
          ApprovedPatches: S.optional(__S(3584, __c224, 0)),
          ApprovedPatchesComplianceLevel: S.optional(S.String),
          RejectedPatches: S.optional(__S(3584, __c224, 0)),
          RejectedPatchesAction: S.optional(S.String),
          ApprovedPatchesEnableNonSecurity: S.optional(S.Boolean),
          Sources: S.optional(__S(661, __c41, 5)),
          AvailableSecurityUpdatesComplianceStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "BaselineOverride" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String,
          SnapshotId: S.String,
          BaselineOverride: S.optional(__S(2016, __c126, 0)),
          UseS3DualStackEndpoint: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDeployablePatchSnapshotForInstanceRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          SnapshotId: S.optional(S.String),
          SnapshotDownloadUrl: S.optional(S.String),
          Product: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetDeployablePatchSnapshotForInstanceResult" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          VersionName: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          DocumentFormat: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDocumentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Size: S.optional(S.Number),
          Hash: S.optional(S.String),
          HashType: S.optional(S.String),
          Url: S.optional(S.String),
        }),
      ).annotate({ identifier: "AttachmentContent" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(2033, __c127, 1)
          .pipe(/*@__PURE__*/ T.XmlName("AttachmentContent"))
          .annotate({ identifier: "AttachmentContent" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DisplayName: S.optional(S.String),
          VersionName: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          Status: S.optional(S.String),
          StatusInformation: S.optional(S.String),
          Content: S.optional(S.String),
          DocumentType: S.optional(S.String),
          DocumentFormat: S.optional(S.String),
          Requires: S.optional(__S(401, __c25, 1)),
          AttachmentsContent: S.optional(__S(2034, __c127, 2)),
          ReviewStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetDocumentResult" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExecutionPreviewId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetExecutionPreviewRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ Count: S.optional(S.Number), TargetType: S.optional(S.String) }),
      ).annotate({ identifier: "TargetPreview" });
    case 3:
      return S.Array(__S(2050, __c128, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          StepPreviews: S.optional(__S(2049, __c128, 1)),
          Regions: S.optional(__S(3584, __c224, 0)),
          TargetPreviews: S.optional(__S(2051, __c128, 3)),
          TotalAccounts: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AutomationExecutionPreview" });
    case 5:
      return S.Union([/*@__PURE__*/ S.Struct({ Automation: __S(2052, __c128, 4) })]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          ExecutionPreviewId: S.optional(S.String),
          EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          ExecutionPreview: S.optional(__S(2053, __c128, 5)),
        }).pipe(ns),
      ).annotate({ identifier: "GetExecutionPreviewResponse" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Filters: __S(2128, __c133, 0) })).annotate({
        identifier: "InventoryGroup",
      });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2064, __c129, 0)
          .pipe(/*@__PURE__*/ T.XmlName("InventoryGroup"))
          .annotate({ identifier: "InventoryGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Expression: S.optional(S.String),
          Aggregators: S.optional(
            S.suspend(() => __S(2067, __c129, 3)).annotate({
              identifier: "InventoryAggregatorList",
            }),
          ),
          Groups: S.optional(__S(2065, __c129, 1)),
        }),
      ).annotate({ identifier: "InventoryAggregator" });
    case 3:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<InventoryAggregator> => __S(2066, __c129, 2))
          .annotate({ identifier: "InventoryAggregator" })
          .pipe(/*@__PURE__*/ T.XmlName("Aggregator"))
          .annotate({ identifier: "InventoryAggregator" }),
      );
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(2080, __c130, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ResultAttribute"))
          .annotate({ identifier: "ResultAttribute" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(2128, __c133, 0)),
          Aggregators: S.optional(__S(2067, __c129, 3)),
          ResultAttributes: S.optional(__S(2068, __c129, 4)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetInventoryRequest" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.String,
          SchemaVersion: S.String,
          CaptureTime: S.optional(S.String),
          ContentHash: S.optional(S.String),
          Content: __S(1808, __c113, 0),
        }),
      ).annotate({ identifier: "InventoryResultItem" });
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(2070, __c129, 6).pipe(S.optional));
    case 8:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Data: S.optional(__S(2071, __c129, 7)) }),
      ).annotate({ identifier: "InventoryResultEntity" });
    case 9:
      return S.Array(
        /*@__PURE__*/ __S(2072, __c129, 8)
          .pipe(/*@__PURE__*/ T.XmlName("Entity"))
          .annotate({ identifier: "InventoryResultEntity" }),
      );
    case 10:
      return S.suspend(() =>
        S.Struct({
          Entities: S.optional(__S(2073, __c129, 9)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetInventoryResult" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TypeName: S.String })).annotate({
        identifier: "ResultAttribute",
      });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("FilterValue")));
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.String, Values: __S(2096, __c131, 0), Type: S.optional(S.String) }),
      ).annotate({ identifier: "InventoryFilter" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(2112, __c132, 0)
          .pipe(/*@__PURE__*/ T.XmlName("InventoryFilter"))
          .annotate({ identifier: "InventoryFilter" }),
      );
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Aggregator: S.optional(S.Boolean),
          SubType: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetInventorySchemaRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.String, DataType: S.String })).annotate({
        identifier: "InventoryItemAttribute",
      });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(2145, __c134, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Attribute"))
          .annotate({ identifier: "InventoryItemAttribute" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.String,
          Version: S.optional(S.String),
          Attributes: __S(2146, __c134, 2),
          DisplayName: S.optional(S.String),
        }),
      ).annotate({ identifier: "InventoryItemSchema" });
    case 4:
      return S.Array(__S(2147, __c134, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Schemas: S.optional(__S(2148, __c134, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetInventorySchemaResult" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WindowId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMaintenanceWindowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          StartDate: S.optional(S.String),
          EndDate: S.optional(S.String),
          Schedule: S.optional(S.String),
          ScheduleTimezone: S.optional(S.String),
          ScheduleOffset: S.optional(S.Number),
          NextExecutionTime: S.optional(S.String),
          Duration: S.optional(S.Number),
          Cutoff: S.optional(S.Number),
          AllowUnassociatedTargets: S.optional(S.Boolean),
          Enabled: S.optional(S.Boolean),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "GetMaintenanceWindowResult" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WindowExecutionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMaintenanceWindowExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowExecutionId: S.optional(S.String),
          TaskIds: S.optional(__S(3584, __c224, 0)),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "GetMaintenanceWindowExecutionResult" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WindowExecutionId: S.String, TaskId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMaintenanceWindowExecutionTaskRequest" });
    case 1:
      return S.Array(__S(1618, __c101, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          WindowExecutionId: S.optional(S.String),
          TaskExecutionId: S.optional(S.String),
          TaskArn: S.optional(S.String),
          ServiceRole: S.optional(S.String),
          Type: S.optional(S.String),
          TaskParameters: S.optional(__S(2193, __c137, 1)),
          Priority: S.optional(S.Number),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
          TriggeredAlarms: S.optional(__S(145, __c9, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GetMaintenanceWindowExecutionTaskResult" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WindowExecutionId: S.String, TaskId: S.String, InvocationId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMaintenanceWindowExecutionTaskInvocationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowExecutionId: S.optional(S.String),
          TaskExecutionId: S.optional(S.String),
          InvocationId: S.optional(S.String),
          ExecutionId: S.optional(S.String),
          TaskType: S.optional(S.String),
          Parameters: S.optional(SensitiveString),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OwnerInformation: S.optional(SensitiveString),
          WindowTargetId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetMaintenanceWindowExecutionTaskInvocationResult" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WindowId: S.String, WindowTaskId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMaintenanceWindowTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.optional(S.String),
          WindowTaskId: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          TaskArn: S.optional(S.String),
          ServiceRoleArn: S.optional(S.String),
          TaskType: S.optional(S.String),
          TaskParameters: S.optional(__S(1618, __c101, 2)),
          TaskInvocationParameters: S.optional(__S(2260, __c141, 4)),
          Priority: S.optional(S.Number),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          LoggingInfo: S.optional(__S(1632, __c102, 0)),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          CutoffBehavior: S.optional(S.String),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "GetMaintenanceWindowTaskResult" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          NotificationArn: S.optional(S.String),
          NotificationEvents: S.optional(__S(2240, __c140, 0)),
          NotificationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "NotificationConfig" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Comment: S.optional(S.String),
          CloudWatchOutputConfig: S.optional(__S(1968, __c123, 0)),
          DocumentHash: S.optional(S.String),
          DocumentHashType: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          NotificationConfig: S.optional(__S(2241, __c140, 1)),
          OutputS3BucketName: S.optional(S.String),
          OutputS3KeyPrefix: S.optional(S.String),
          Parameters: S.optional(__S(176, __c11, 0)),
          ServiceRoleArn: S.optional(S.String),
          TimeoutSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MaintenanceWindowRunCommandParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DocumentVersion: S.optional(S.String),
          Parameters: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "MaintenanceWindowAutomationParameters" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Input: S.optional(SensitiveString), Name: S.optional(S.String) }),
      ).annotate({ identifier: "MaintenanceWindowStepFunctionsParameters" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ClientContext: S.optional(S.String),
          Qualifier: S.optional(S.String),
          Payload: S.optional(SensitiveBlob),
        }),
      ).annotate({ identifier: "MaintenanceWindowLambdaParameters" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          RunCommand: S.optional(__S(2256, __c141, 0)),
          Automation: S.optional(__S(2257, __c141, 1)),
          StepFunctions: S.optional(__S(2258, __c141, 2)),
          Lambda: S.optional(__S(2259, __c141, 3)),
        }),
      ).annotate({ identifier: "MaintenanceWindowTaskInvocationParameters" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OpsItemId: S.String, OpsItemArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOpsItemRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedBy: S.optional(S.String),
          OpsItemType: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          LastModifiedBy: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Notifications: S.optional(__S(544, __c34, 0)),
          Priority: S.optional(S.Number),
          RelatedOpsItems: S.optional(__S(546, __c34, 2)),
          Status: S.optional(S.String),
          OpsItemId: S.optional(S.String),
          Version: S.optional(S.String),
          Title: S.optional(S.String),
          Source: S.optional(S.String),
          OperationalData: S.optional(__S(513, __c32, 1)),
          Category: S.optional(S.String),
          Severity: S.optional(S.String),
          ActualStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActualEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PlannedStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PlannedEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OpsItemArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "OpsItem" });
    case 2:
      return S.suspend(() =>
        S.Struct({ OpsItem: S.optional(__S(2273, __c142, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetOpsItemResponse" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OpsMetadataArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetOpsMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String),
          Metadata: S.optional(__S(577, __c36, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetOpsMetadataResult" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(2112, __c132, 0)
          .pipe(/*@__PURE__*/ T.XmlName("OpsFilter"))
          .annotate({ identifier: "OpsFilter" }),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          AggregatorType: S.optional(S.String),
          TypeName: S.optional(S.String),
          AttributeName: S.optional(S.String),
          Values: S.optional(__S(1200, __c75, 0)),
          Filters: S.optional(__S(2304, __c144, 0)),
          Aggregators: S.optional(
            S.suspend(() => __S(2306, __c144, 2)).annotate({ identifier: "OpsAggregatorList" }),
          ),
        }),
      ).annotate({ identifier: "OpsAggregator" });
    case 2:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<OpsAggregator> => __S(2305, __c144, 1))
          .annotate({ identifier: "OpsAggregator" })
          .pipe(/*@__PURE__*/ T.XmlName("Aggregator"))
          .annotate({ identifier: "OpsAggregator" }),
      );
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(2080, __c130, 0)
          .pipe(/*@__PURE__*/ T.XmlName("OpsResultAttribute"))
          .annotate({ identifier: "OpsResultAttribute" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          SyncName: S.optional(S.String),
          Filters: S.optional(__S(2304, __c144, 0)),
          Aggregators: S.optional(__S(2306, __c144, 2)),
          ResultAttributes: S.optional(__S(2307, __c144, 3)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetOpsSummaryRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({ CaptureTime: S.optional(S.String), Content: S.optional(__S(1808, __c113, 0)) }),
      ).annotate({ identifier: "OpsEntityItem" });
    case 6:
      return S.Record(S.String, /*@__PURE__*/ __S(2309, __c144, 5).pipe(S.optional));
    case 7:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Data: S.optional(__S(2310, __c144, 6)) }),
      ).annotate({ identifier: "OpsEntity" });
    case 8:
      return S.Array(
        /*@__PURE__*/ __S(2311, __c144, 7)
          .pipe(/*@__PURE__*/ T.XmlName("Entity"))
          .annotate({ identifier: "OpsEntity" }),
      );
    case 9:
      return S.suspend(() =>
        S.Struct({
          Entities: S.optional(__S(2312, __c144, 8)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetOpsSummaryResult" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, WithDecryption: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetParameterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Parameter: S.optional(__S(2336, __c146, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetParameterResult" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          Value: S.optional(SensitiveString),
          Version: S.optional(S.Number),
          Selector: S.optional(S.String),
          SourceResult: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ARN: S.optional(S.String),
          DataType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Parameter" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          WithDecryption: S.optional(S.Boolean),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetParameterHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          KeyId: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedUser: S.optional(S.String),
          Description: S.optional(S.String),
          Value: S.optional(SensitiveString),
          AllowedPattern: S.optional(S.String),
          Version: S.optional(S.Number),
          Labels: S.optional(__S(3584, __c224, 0)),
          Tier: S.optional(S.String),
          Policies: S.optional(__S(1697, __c106, 1)),
          DataType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ParameterHistory" });
    case 2:
      return S.Array(__S(2353, __c147, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Parameters: S.optional(__S(2354, __c147, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetParameterHistoryResult" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Names: __S(3584, __c224, 0), WithDecryption: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetParametersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Parameters: S.optional(__S(2384, __c149, 0)),
          InvalidParameters: S.optional(__S(3584, __c224, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetParametersResult" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2336, __c146, 0));
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Path: S.String,
          Recursive: S.optional(S.Boolean),
          ParameterFilters: S.optional(__S(1713, __c107, 1)),
          WithDecryption: S.optional(S.Boolean),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetParametersByPathRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Parameters: S.optional(__S(2384, __c149, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetParametersByPathResult" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BaselineId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPatchBaselineRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BaselineId: S.optional(S.String),
          Name: S.optional(S.String),
          OperatingSystem: S.optional(S.String),
          GlobalFilters: S.optional(__S(656, __c41, 0)),
          ApprovalRules: S.optional(__S(659, __c41, 3)),
          ApprovedPatches: S.optional(__S(3584, __c224, 0)),
          ApprovedPatchesComplianceLevel: S.optional(S.String),
          ApprovedPatchesEnableNonSecurity: S.optional(S.Boolean),
          RejectedPatches: S.optional(__S(3584, __c224, 0)),
          RejectedPatchesAction: S.optional(S.String),
          PatchGroups: S.optional(__S(3584, __c224, 0)),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          Sources: S.optional(__S(661, __c41, 5)),
          AvailableSecurityUpdatesComplianceStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetPatchBaselineResult" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PatchGroup: S.String, OperatingSystem: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPatchBaselineForPatchGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BaselineId: S.optional(S.String),
          PatchGroup: S.optional(S.String),
          OperatingSystem: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetPatchBaselineForPatchGroupResult" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetResourcePoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PolicyId: S.optional(S.String),
          PolicyHash: S.optional(S.String),
          Policy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetResourcePoliciesResponseEntry" });
    case 2:
      return S.Array(__S(2449, __c153, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Policies: S.optional(__S(2450, __c153, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "GetResourcePoliciesResponse" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SettingId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceSettingRequest" });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SettingId: S.optional(S.String),
          SettingValue: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedUser: S.optional(S.String),
          ARN: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceSetting" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServiceSetting: S.optional(__S(2480, __c155, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetServiceSettingResult" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ParameterVersion: S.optional(S.Number),
          Labels: __S(3584, __c224, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "LabelParameterVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InvalidLabels: S.optional(__S(3584, __c224, 0)),
          ParameterVersion: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "LabelParameterVersionResult" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(1840, __c115, 0)
          .pipe(/*@__PURE__*/ T.XmlName("AssociationFilter"))
          .annotate({ identifier: "AssociationFilter" }),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssociationFilterList: S.optional(__S(2512, __c157, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssociationsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          InstanceId: S.optional(S.String),
          AssociationId: S.optional(S.String),
          AssociationVersion: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          LastExecutionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Overview: S.optional(__S(256, __c16, 0)),
          ScheduleExpression: S.optional(S.String),
          AssociationName: S.optional(S.String),
          ScheduleOffset: S.optional(S.Number),
          Duration: S.optional(S.Number),
          TargetMaps: S.optional(__S(208, __c13, 0)),
        }),
      ).annotate({ identifier: "Association" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(2514, __c157, 2)
          .pipe(/*@__PURE__*/ T.XmlName("Association"))
          .annotate({ identifier: "Association" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          Associations: S.optional(__S(2515, __c157, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAssociationsResult" });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssociationVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          AssociationVersion: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          Parameters: S.optional(__S(176, __c11, 0)),
          Targets: S.optional(__S(161, __c10, 1)),
          ScheduleExpression: S.optional(S.String),
          OutputLocation: S.optional(__S(273, __c17, 1)),
          AssociationName: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          MaxConcurrency: S.optional(S.String),
          ComplianceSeverity: S.optional(S.String),
          SyncCompliance: S.optional(S.String),
          ApplyOnlyAtCronInterval: S.optional(S.Boolean),
          CalendarNames: S.optional(__S(3584, __c224, 0)),
          TargetLocations: S.optional(__S(224, __c14, 0)),
          ScheduleOffset: S.optional(S.Number),
          Duration: S.optional(S.Number),
          TargetMaps: S.optional(__S(208, __c13, 0)),
          AssociationDispatchAssumeRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociationVersionInfo" });
    case 2:
      return S.Array(__S(2529, __c158, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AssociationVersions: S.optional(__S(2530, __c158, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAssociationVersionsResult" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(1073, __c67, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCloudConnectorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CloudConnectorId: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CloudConnectorSummary" });
    case 2:
      return S.Array(__S(2545, __c159, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CloudConnectors: S.optional(__S(2546, __c159, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListCloudConnectorsResult" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CommandId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(1856, __c116, 0)),
          Details: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCommandInvocationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          ResponseCode: S.optional(S.Number),
          ResponseStartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResponseFinishDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Output: S.optional(S.String),
          StandardOutputUrl: S.optional(S.String),
          StandardErrorUrl: S.optional(S.String),
          OutputS3Region: S.optional(S.String),
          OutputS3BucketName: S.optional(S.String),
          OutputS3KeyPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "CommandPlugin" });
    case 2:
      return S.Array(__S(2561, __c160, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CommandId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          InstanceName: S.optional(S.String),
          Comment: S.optional(S.String),
          DocumentName: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          RequestedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          TraceOutput: S.optional(S.String),
          StandardOutputUrl: S.optional(S.String),
          StandardErrorUrl: S.optional(S.String),
          CommandPlugins: S.optional(__S(2562, __c160, 2)),
          ServiceRole: S.optional(S.String),
          NotificationConfig: S.optional(__S(2241, __c140, 1)),
          CloudWatchOutputConfig: S.optional(__S(1968, __c123, 0)),
        }),
      ).annotate({ identifier: "CommandInvocation" });
    case 4:
      return S.Array(__S(2563, __c160, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          CommandInvocations: S.optional(__S(2564, __c160, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListCommandInvocationsResult" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CommandId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(1856, __c116, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCommandsRequest" });
    case 1:
      return S.Array(__S(2592, __c162, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Commands: S.optional(__S(2577, __c161, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListCommandsResult" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CommandId: S.optional(S.String),
          DocumentName: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          Comment: S.optional(S.String),
          ExpiresAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Parameters: S.optional(__S(176, __c11, 0)),
          InstanceIds: S.optional(__S(3584, __c224, 0)),
          Targets: S.optional(__S(161, __c10, 1)),
          RequestedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          OutputS3Region: S.optional(S.String),
          OutputS3BucketName: S.optional(S.String),
          OutputS3KeyPrefix: S.optional(S.String),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          TargetCount: S.optional(S.Number),
          CompletedCount: S.optional(S.Number),
          ErrorCount: S.optional(S.Number),
          DeliveryTimedOutCount: S.optional(S.Number),
          ServiceRole: S.optional(S.String),
          NotificationConfig: S.optional(__S(2241, __c140, 1)),
          CloudWatchOutputConfig: S.optional(__S(1968, __c123, 0)),
          TimeoutSeconds: S.optional(S.Number),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
          TriggeredAlarms: S.optional(__S(145, __c9, 1)),
        }),
      ).annotate({ identifier: "Command" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(2625, __c164, 1)),
          ResourceIds: S.optional(__S(3584, __c224, 0)),
          ResourceTypes: S.optional(__S(3584, __c224, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListComplianceItemsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ComplianceType: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          Id: S.optional(S.String),
          Title: S.optional(S.String),
          Status: S.optional(S.String),
          Severity: S.optional(S.String),
          ExecutionSummary: S.optional(__S(2640, __c165, 0)),
          Details: S.optional(__S(1200, __c75, 0)),
        }),
      ).annotate({ identifier: "ComplianceItem" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(2609, __c163, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Item"))
          .annotate({ identifier: "ComplianceItem" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          ComplianceItems: S.optional(__S(2610, __c163, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListComplianceItemsResult" });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Values: S.optional(__S(2096, __c131, 0)),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComplianceStringFilter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2624, __c164, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ComplianceFilter"))
          .annotate({ identifier: "ComplianceStringFilter" }),
      );
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExecutionTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ExecutionId: S.optional(S.String),
          ExecutionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComplianceExecutionSummary" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(2625, __c164, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListComplianceSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ComplianceType: S.optional(S.String),
          CompliantSummary: S.optional(__S(2673, __c167, 1)),
          NonCompliantSummary: S.optional(__S(2674, __c167, 2)),
        }),
      ).annotate({ identifier: "ComplianceSummaryItem" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(2657, __c166, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Item"))
          .annotate({ identifier: "ComplianceSummaryItem" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          ComplianceSummaryItems: S.optional(__S(2658, __c166, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListComplianceSummariesResult" });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CriticalCount: S.optional(S.Number),
          HighCount: S.optional(S.Number),
          MediumCount: S.optional(S.Number),
          LowCount: S.optional(S.Number),
          InformationalCount: S.optional(S.Number),
          UnspecifiedCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SeveritySummary" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CompliantCount: S.optional(S.Number),
          SeveritySummary: S.optional(__S(2672, __c167, 0)),
        }),
      ).annotate({ identifier: "CompliantSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          NonCompliantCount: S.optional(S.Number),
          SeveritySummary: S.optional(__S(2672, __c167, 0)),
        }),
      ).annotate({ identifier: "NonCompliantSummary" });
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DocumentVersion: S.optional(S.String),
          Metadata: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDocumentMetadataHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReviewStatus: S.optional(S.String),
          Comment: S.optional(__S(2705, __c169, 1)),
          Reviewer: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentReviewerResponseSource" });
    case 2:
      return S.Array(__S(2689, __c168, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ReviewerResponse: S.optional(__S(2690, __c168, 2)) }),
      ).annotate({ identifier: "DocumentMetadataResponseInfo" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          Author: S.optional(S.String),
          Metadata: S.optional(__S(2691, __c168, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDocumentMetadataHistoryResponse" });
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Content: S.optional(S.String) }),
      ).annotate({ identifier: "DocumentReviewCommentSource" });
    case 1:
      return S.Array(__S(2704, __c169, 0));
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(1840, __c115, 0)
          .pipe(/*@__PURE__*/ T.XmlName("DocumentFilter"))
          .annotate({ identifier: "DocumentFilter" }),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          DocumentFilterList: S.optional(__S(2720, __c170, 0)),
          Filters: S.optional(__S(161, __c10, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDocumentsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DisplayName: S.optional(S.String),
          Owner: S.optional(S.String),
          VersionName: S.optional(S.String),
          PlatformTypes: S.optional(__S(416, __c26, 0)),
          DocumentVersion: S.optional(S.String),
          DocumentType: S.optional(S.String),
          SchemaVersion: S.optional(S.String),
          DocumentFormat: S.optional(S.String),
          TargetType: S.optional(S.String),
          Tags: S.optional(__S(33, __c2, 1)),
          Requires: S.optional(__S(401, __c25, 1)),
          ReviewStatus: S.optional(S.String),
          Author: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentIdentifier" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(2722, __c170, 2)
          .pipe(/*@__PURE__*/ T.XmlName("DocumentIdentifier"))
          .annotate({ identifier: "DocumentIdentifier" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          DocumentIdentifiers: S.optional(__S(2723, __c170, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDocumentsResult" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDocumentVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          DisplayName: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          VersionName: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IsDefaultVersion: S.optional(S.Boolean),
          DocumentFormat: S.optional(S.String),
          Status: S.optional(S.String),
          StatusInformation: S.optional(S.String),
          ReviewStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentVersionInfo" });
    case 2:
      return S.Array(__S(2737, __c171, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DocumentVersions: S.optional(__S(2738, __c171, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDocumentVersionsResult" });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.String,
          TypeName: S.String,
          Filters: S.optional(__S(2128, __c133, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInventoryEntriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.optional(S.String),
          InstanceId: S.optional(S.String),
          SchemaVersion: S.optional(S.String),
          CaptureTime: S.optional(S.String),
          Entries: S.optional(__S(1808, __c113, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListInventoryEntriesResult" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SyncName: S.optional(S.String),
          Filters: S.optional(__S(2785, __c174, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListNodesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          OrganizationalUnitId: S.optional(S.String),
          OrganizationalUnitPath: S.optional(S.String),
        }),
      ).annotate({ identifier: "NodeOwnerInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AgentType: S.optional(S.String),
          AgentVersion: S.optional(S.String),
          ComputerName: S.optional(S.String),
          InstanceStatus: S.optional(S.String),
          IpAddress: S.optional(SensitiveString),
          ManagedStatus: S.optional(S.String),
          Name: S.optional(S.String),
          PlatformType: S.optional(S.String),
          PlatformName: S.optional(S.String),
          PlatformVersion: S.optional(S.String),
          ResourceType: S.optional(S.String),
          SourceType: S.optional(S.String),
          SourceId: S.optional(S.String),
          SourceLocation: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceInfo" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ Instance: __S(2770, __c173, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          CaptureTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Id: S.optional(S.String),
          Owner: S.optional(__S(2769, __c173, 1)),
          Region: S.optional(S.String),
          NodeType: S.optional(__S(2771, __c173, 3)),
        }),
      ).annotate({ identifier: "Node" });
    case 5:
      return S.Array(__S(2772, __c173, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ Nodes: S.optional(__S(2773, __c173, 5)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListNodesResult" });
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.String, Values: __S(2096, __c131, 0), Type: S.optional(S.String) }),
      ).annotate({ identifier: "NodeFilter" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2784, __c174, 0)
          .pipe(/*@__PURE__*/ T.XmlName("NodeFilter"))
          .annotate({ identifier: "NodeFilter" }),
      );
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AggregatorType: S.String,
          TypeName: S.String,
          AttributeName: S.String,
          Aggregators: S.optional(
            S.suspend(() => __S(2801, __c175, 1)).annotate({ identifier: "NodeAggregatorList" }),
          ),
        }),
      ).annotate({ identifier: "NodeAggregator" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<NodeAggregator> => __S(2800, __c175, 0))
          .annotate({ identifier: "NodeAggregator" })
          .pipe(/*@__PURE__*/ T.XmlName("NodeAggregator"))
          .annotate({ identifier: "NodeAggregator" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          SyncName: S.optional(S.String),
          Filters: S.optional(__S(2785, __c174, 1)),
          Aggregators: __S(2801, __c175, 1),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListNodesSummaryRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Summary: S.optional(__S(1808, __c113, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListNodesSummaryResult" });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1665, __c104, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOpsItemEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OpsItemId: S.optional(S.String),
          EventId: S.optional(S.String),
          Source: S.optional(S.String),
          DetailType: S.optional(S.String),
          Detail: S.optional(S.String),
          CreatedBy: S.optional(__S(528, __c33, 0)),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OpsItemEventSummary" });
    case 2:
      return S.Array(__S(2817, __c176, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Summaries: S.optional(__S(2818, __c176, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListOpsItemEventsResponse" });
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OpsItemId: S.optional(S.String),
          Filters: S.optional(__S(1665, __c104, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOpsItemRelatedItemsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OpsItemId: S.optional(S.String),
          AssociationId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          AssociationType: S.optional(S.String),
          ResourceUri: S.optional(S.String),
          CreatedBy: S.optional(__S(528, __c33, 0)),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBy: S.optional(__S(528, __c33, 0)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OpsItemRelatedItemSummary" });
    case 2:
      return S.Array(__S(2833, __c177, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Summaries: S.optional(__S(2834, __c177, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListOpsItemRelatedItemsResponse" });
  }
}
function __c178(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Values: __S(3584, __c224, 0) })).annotate({
        identifier: "OpsMetadataFilter",
      });
    case 1:
      return S.Array(__S(2848, __c178, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(2849, __c178, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOpsMetadataRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String),
          OpsMetadataArn: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedUser: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OpsMetadata" });
    case 4:
      return S.Array(__S(2851, __c178, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          OpsMetadataList: S.optional(__S(2852, __c178, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListOpsMetadataResult" });
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(2625, __c164, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourceComplianceSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ComplianceType: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          Status: S.optional(S.String),
          OverallSeverity: S.optional(S.String),
          ExecutionSummary: S.optional(__S(2640, __c165, 0)),
          CompliantSummary: S.optional(__S(2673, __c167, 1)),
          NonCompliantSummary: S.optional(__S(2674, __c167, 2)),
        }),
      ).annotate({ identifier: "ResourceComplianceSummaryItem" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(2865, __c179, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Item"))
          .annotate({ identifier: "ResourceComplianceSummaryItem" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          ResourceComplianceSummaryItems: S.optional(__S(2866, __c179, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListResourceComplianceSummariesResult" });
  }
}
function __c180(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SyncType: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourceDataSyncRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.optional(S.String),
          AwsOrganizationsSource: S.optional(__S(706, __c44, 2)),
          SourceRegions: S.optional(__S(3584, __c224, 0)),
          IncludeFutureRegions: S.optional(S.Boolean),
          State: S.optional(S.String),
          EnableAllOpsDataSources: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ResourceDataSyncSourceWithState" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SyncName: S.optional(S.String),
          SyncType: S.optional(S.String),
          SyncSource: S.optional(__S(2881, __c180, 1)),
          S3Destination: S.optional(__S(689, __c43, 1)),
          LastSyncTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSuccessfulSyncTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SyncLastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastStatus: S.optional(S.String),
          SyncCreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSyncStatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceDataSyncItem" });
    case 3:
      return S.Array(__S(2882, __c180, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ResourceDataSyncItems: S.optional(__S(2883, __c180, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListResourceDataSyncResult" });
  }
}
function __c181(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.String, ResourceId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TagList: S.optional(__S(33, __c2, 1)) }).pipe(ns)).annotate(
        { identifier: "ListTagsForResourceResult" },
      );
  }
}
function __c182(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          PermissionType: S.String,
          AccountIdsToAdd: S.optional(__S(1296, __c81, 0)),
          AccountIdsToRemove: S.optional(__S(1296, __c81, 0)),
          SharedDocumentVersion: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyDocumentPermissionRequest" });
  }
}
function __c183(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Title: S.optional(S.String),
          Severity: S.String,
          Status: S.String,
          Details: S.optional(__S(1200, __c75, 0)),
        }),
      ).annotate({ identifier: "ComplianceItemEntry" });
    case 1:
      return S.Array(__S(2928, __c183, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.String,
          ResourceType: S.String,
          ComplianceType: S.String,
          ExecutionSummary: __S(2640, __c165, 0),
          Items: __S(2929, __c183, 1),
          ItemContentHash: S.optional(S.String),
          UploadType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutComplianceItemsRequest" });
  }
}
function __c184(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TypeName: S.String,
          SchemaVersion: S.String,
          CaptureTime: S.String,
          ContentHash: S.optional(S.String),
          Content: S.optional(__S(1808, __c113, 0)),
          Context: S.optional(__S(1200, __c75, 0)),
        }),
      ).annotate({ identifier: "InventoryItem" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2944, __c184, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Item"))
          .annotate({ identifier: "InventoryItem" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ InstanceId: S.String, Items: __S(2945, __c184, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutInventoryRequest" });
    case 3:
      return S.suspend(() => S.Struct({ Message: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "PutInventoryResult",
      });
  }
}
function __c185(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          Value: SensitiveString,
          Type: S.optional(S.String),
          KeyId: S.optional(S.String),
          Overwrite: S.optional(S.Boolean),
          AllowedPattern: S.optional(S.String),
          Tags: S.optional(__S(33, __c2, 1)),
          Tier: S.optional(S.String),
          Policies: S.optional(S.String),
          DataType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutParameterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Version: S.optional(S.Number), Tier: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "PutParameterResult" });
  }
}
function __c186(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          Policy: S.String,
          PolicyId: S.optional(S.String),
          PolicyHash: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PolicyId: S.optional(S.String), PolicyHash: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "PutResourcePolicyResponse" });
  }
}
function __c187(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PermissionModel: S.String,
          RoleArn: S.optional(S.String),
          Overwrite: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterDefaultHostManagementConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RoleArn: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "RegisterDefaultHostManagementConfigurationResult",
      });
  }
}
function __c188(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BaselineId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterDefaultPatchBaselineRequest" });
  }
}
function __c189(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BaselineId: S.String, PatchGroup: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterPatchBaselineForPatchGroupRequest" });
  }
}
function __c190(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.String,
          ResourceType: S.String,
          Targets: __S(161, __c10, 1),
          OwnerInformation: S.optional(SensitiveString),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterTargetWithMaintenanceWindowRequest" });
    case 1:
      return S.suspend(() => S.Struct({ WindowTargetId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "RegisterTargetWithMaintenanceWindowResult",
      });
  }
}
function __c191(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.String,
          Targets: S.optional(__S(161, __c10, 1)),
          TaskArn: S.String,
          ServiceRoleArn: S.optional(S.String),
          TaskType: S.String,
          TaskParameters: S.optional(__S(1618, __c101, 2)),
          TaskInvocationParameters: S.optional(__S(2260, __c141, 4)),
          Priority: S.optional(S.Number),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          LoggingInfo: S.optional(__S(1632, __c102, 0)),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          CutoffBehavior: S.optional(S.String),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterTaskWithMaintenanceWindowRequest" });
    case 1:
      return S.suspend(() => S.Struct({ WindowTaskId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "RegisterTaskWithMaintenanceWindowResult",
      });
  }
}
function __c192(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.String,
          ResourceId: S.String,
          TagKeys: __S(3584, __c224, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveTagsFromResourceRequest" });
  }
}
function __c193(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SettingId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResetServiceSettingRequest" });
  }
}
function __c194(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResumeSessionRequest" });
  }
}
function __c195(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SessionId: S.optional(S.String),
          TokenValue: S.optional(S.String),
          StreamUrl: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ResumeSessionResponse" });
  }
}
function __c196(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutomationExecutionId: S.String,
          SignalType: S.String,
          Payload: S.optional(__S(176, __c11, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendAutomationSignalRequest" });
  }
}
function __c197(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceIds: S.optional(__S(3584, __c224, 0)),
          Targets: S.optional(__S(161, __c10, 1)),
          DocumentName: S.String,
          DocumentVersion: S.optional(S.String),
          DocumentHash: S.optional(S.String),
          DocumentHashType: S.optional(S.String),
          TimeoutSeconds: S.optional(S.Number),
          Comment: S.optional(S.String),
          Parameters: S.optional(__S(176, __c11, 0)),
          OutputS3Region: S.optional(S.String),
          OutputS3BucketName: S.optional(S.String),
          OutputS3KeyPrefix: S.optional(S.String),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          ServiceRoleArn: S.optional(S.String),
          NotificationConfig: S.optional(__S(2241, __c140, 1)),
          CloudWatchOutputConfig: S.optional(__S(1968, __c123, 0)),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendCommandRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Command: S.optional(__S(2592, __c162, 0)) }).pipe(ns),
      ).annotate({ identifier: "SendCommandResult" });
  }
}
function __c198(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Reason: S.String,
          Targets: __S(161, __c10, 1),
          Tags: S.optional(__S(33, __c2, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartAccessRequestRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AccessRequestId: S.optional(S.String) }).pipe(ns)).annotate(
        { identifier: "StartAccessRequestResponse" },
      );
  }
}
function __c199(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AssociationIds: __S(3584, __c224, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartAssociationsOnceRequest" });
  }
}
function __c200(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DocumentName: S.String,
          DocumentVersion: S.optional(S.String),
          Parameters: S.optional(__S(176, __c11, 0)),
          ClientToken: S.optional(S.String),
          Mode: S.optional(S.String),
          TargetParameterName: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          TargetMaps: S.optional(__S(208, __c13, 0)),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          TargetLocations: S.optional(__S(224, __c14, 0)),
          Tags: S.optional(__S(33, __c2, 1)),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
          TargetLocationsURL: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartAutomationExecutionRequest" });
  }
}
function __c201(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutomationExecutionId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "StartAutomationExecutionResult" });
  }
}
function __c202(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScheduledTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DocumentName: S.String,
          DocumentVersion: S.optional(S.String),
          Parameters: S.optional(__S(176, __c11, 0)),
          ChangeRequestName: S.optional(S.String),
          ClientToken: S.optional(S.String),
          AutoApprove: S.optional(S.Boolean),
          Runbooks: __S(1169, __c73, 1),
          Tags: S.optional(__S(33, __c2, 1)),
          ScheduledEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ChangeDetails: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartChangeRequestExecutionRequest" });
  }
}
function __c203(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Parameters: S.optional(__S(176, __c11, 0)),
          TargetParameterName: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          TargetMaps: S.optional(__S(208, __c13, 0)),
          TargetLocations: S.optional(__S(224, __c14, 0)),
          TargetLocationsURL: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutomationExecutionInputs" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ Automation: __S(3248, __c203, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          DocumentName: S.String,
          DocumentVersion: S.optional(S.String),
          ExecutionInputs: S.optional(__S(3249, __c203, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartExecutionPreviewRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ExecutionPreviewId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "StartExecutionPreviewResponse" });
  }
}
function __c204(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Target: S.String,
          DocumentName: S.optional(S.String),
          Reason: S.optional(S.String),
          Parameters: S.optional(__S(176, __c11, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartSessionRequest" });
  }
}
function __c205(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutomationExecutionId: S.String, Type: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopAutomationExecutionRequest" });
  }
}
function __c206(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TerminateSessionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ SessionId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "TerminateSessionResponse",
      });
  }
}
function __c207(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, ParameterVersion: S.Number, Labels: __S(3584, __c224, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UnlabelParameterVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RemovedLabels: S.optional(__S(3584, __c224, 0)),
          InvalidLabels: S.optional(__S(3584, __c224, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "UnlabelParameterVersionResult" });
  }
}
function __c208(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.String,
          Parameters: S.optional(__S(176, __c11, 0)),
          DocumentVersion: S.optional(S.String),
          ScheduleExpression: S.optional(S.String),
          OutputLocation: S.optional(__S(273, __c17, 1)),
          Name: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          AssociationName: S.optional(S.String),
          AssociationVersion: S.optional(S.String),
          AutomationTargetParameterName: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          MaxConcurrency: S.optional(S.String),
          ComplianceSeverity: S.optional(S.String),
          SyncCompliance: S.optional(S.String),
          ApplyOnlyAtCronInterval: S.optional(S.Boolean),
          CalendarNames: S.optional(__S(3584, __c224, 0)),
          TargetLocations: S.optional(__S(224, __c14, 0)),
          ScheduleOffset: S.optional(S.Number),
          Duration: S.optional(S.Number),
          TargetMaps: S.optional(__S(208, __c13, 0)),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
          AssociationDispatchAssumeRole: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAssociationRequest" });
  }
}
function __c209(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          InstanceId: S.String,
          AssociationStatus: __S(288, __c18, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAssociationStatusRequest" });
  }
}
function __c210(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudConnectorId: S.String,
          DisplayName: S.optional(S.String),
          Configuration: S.optional(__S(372, __c23, 4)),
          Description: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateCloudConnectorRequest" });
  }
}
function __c211(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Content: S.String,
          Attachments: S.optional(__S(449, __c28, 1)),
          Name: S.String,
          DisplayName: S.optional(S.String),
          VersionName: S.optional(S.String),
          DocumentVersion: S.optional(S.String),
          DocumentFormat: S.optional(S.String),
          TargetType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDocumentRequest" });
  }
}
function __c212(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, DocumentVersion: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDocumentDefaultVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          DefaultVersion: S.optional(S.String),
          DefaultVersionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentDefaultVersionDescription" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Description: S.optional(__S(3393, __c212, 1)) }).pipe(ns),
      ).annotate({ identifier: "UpdateDocumentDefaultVersionResult" });
  }
}
function __c213(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Action: S.String, Comment: S.optional(__S(2705, __c169, 1)) }),
      ).annotate({ identifier: "DocumentReviews" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DocumentVersion: S.optional(S.String),
          DocumentReviews: __S(3408, __c213, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDocumentMetadataRequest" });
  }
}
function __c214(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.String,
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          StartDate: S.optional(S.String),
          EndDate: S.optional(S.String),
          Schedule: S.optional(S.String),
          ScheduleTimezone: S.optional(S.String),
          ScheduleOffset: S.optional(S.Number),
          Duration: S.optional(S.Number),
          Cutoff: S.optional(S.Number),
          AllowUnassociatedTargets: S.optional(S.Boolean),
          Enabled: S.optional(S.Boolean),
          Replace: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateMaintenanceWindowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          StartDate: S.optional(S.String),
          EndDate: S.optional(S.String),
          Schedule: S.optional(S.String),
          ScheduleTimezone: S.optional(S.String),
          ScheduleOffset: S.optional(S.Number),
          Duration: S.optional(S.Number),
          Cutoff: S.optional(S.Number),
          AllowUnassociatedTargets: S.optional(S.Boolean),
          Enabled: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateMaintenanceWindowResult" });
  }
}
function __c215(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.String,
          WindowTargetId: S.String,
          Targets: S.optional(__S(161, __c10, 1)),
          OwnerInformation: S.optional(SensitiveString),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          Replace: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateMaintenanceWindowTargetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.optional(S.String),
          WindowTargetId: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          OwnerInformation: S.optional(SensitiveString),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateMaintenanceWindowTargetResult" });
  }
}
function __c216(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.String,
          WindowTaskId: S.String,
          Targets: S.optional(__S(161, __c10, 1)),
          TaskArn: S.optional(S.String),
          ServiceRoleArn: S.optional(S.String),
          TaskParameters: S.optional(__S(1618, __c101, 2)),
          TaskInvocationParameters: S.optional(__S(2260, __c141, 4)),
          Priority: S.optional(S.Number),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          LoggingInfo: S.optional(__S(1632, __c102, 0)),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          Replace: S.optional(S.Boolean),
          CutoffBehavior: S.optional(S.String),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateMaintenanceWindowTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WindowId: S.optional(S.String),
          WindowTaskId: S.optional(S.String),
          Targets: S.optional(__S(161, __c10, 1)),
          TaskArn: S.optional(S.String),
          ServiceRoleArn: S.optional(S.String),
          TaskParameters: S.optional(__S(1618, __c101, 2)),
          TaskInvocationParameters: S.optional(__S(2260, __c141, 4)),
          Priority: S.optional(S.Number),
          MaxConcurrency: S.optional(S.String),
          MaxErrors: S.optional(S.String),
          LoggingInfo: S.optional(__S(1632, __c102, 0)),
          Name: S.optional(S.String),
          Description: S.optional(SensitiveString),
          CutoffBehavior: S.optional(S.String),
          AlarmConfiguration: S.optional(__S(130, __c8, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateMaintenanceWindowTaskResult" });
  }
}
function __c217(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceId: S.String, IamRole: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateManagedInstanceRoleRequest" });
  }
}
function __c218(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          OperationalData: S.optional(__S(513, __c32, 1)),
          OperationalDataToDelete: S.optional(__S(3584, __c224, 0)),
          Notifications: S.optional(__S(544, __c34, 0)),
          Priority: S.optional(S.Number),
          RelatedOpsItems: S.optional(__S(546, __c34, 2)),
          Status: S.optional(S.String),
          OpsItemId: S.String,
          Title: S.optional(S.String),
          Category: S.optional(S.String),
          Severity: S.optional(S.String),
          ActualStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActualEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PlannedStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PlannedEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OpsItemArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateOpsItemRequest" });
  }
}
function __c219(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OpsMetadataArn: S.String,
          MetadataToUpdate: S.optional(__S(577, __c36, 1)),
          KeysToDelete: S.optional(__S(3584, __c224, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateOpsMetadataRequest" });
  }
}
function __c220(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BaselineId: S.String,
          Name: S.optional(S.String),
          GlobalFilters: S.optional(__S(656, __c41, 0)),
          ApprovalRules: S.optional(__S(659, __c41, 3)),
          ApprovedPatches: S.optional(__S(3584, __c224, 0)),
          ApprovedPatchesComplianceLevel: S.optional(S.String),
          ApprovedPatchesEnableNonSecurity: S.optional(S.Boolean),
          RejectedPatches: S.optional(__S(3584, __c224, 0)),
          RejectedPatchesAction: S.optional(S.String),
          Description: S.optional(S.String),
          Sources: S.optional(__S(661, __c41, 5)),
          AvailableSecurityUpdatesComplianceStatus: S.optional(S.String),
          Replace: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePatchBaselineRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BaselineId: S.optional(S.String),
          Name: S.optional(S.String),
          OperatingSystem: S.optional(S.String),
          GlobalFilters: S.optional(__S(656, __c41, 0)),
          ApprovalRules: S.optional(__S(659, __c41, 3)),
          ApprovedPatches: S.optional(__S(3584, __c224, 0)),
          ApprovedPatchesComplianceLevel: S.optional(S.String),
          ApprovedPatchesEnableNonSecurity: S.optional(S.Boolean),
          RejectedPatches: S.optional(__S(3584, __c224, 0)),
          RejectedPatchesAction: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          Sources: S.optional(__S(661, __c41, 5)),
          AvailableSecurityUpdatesComplianceStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "UpdatePatchBaselineResult" });
  }
}
function __c221(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SyncName: S.String, SyncType: S.String, SyncSource: __S(720, __c45, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateResourceDataSyncRequest" });
  }
}
function __c222(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SettingId: S.String, SettingValue: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateServiceSettingRequest" });
  }
}
function __c223(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CloudConnectorId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ValidateCloudConnectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Id: S.optional(S.String) }),
      ).annotate({ identifier: "ValidationFindingScope" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Code: S.optional(S.String),
          Message: S.optional(S.String),
          ProviderMessage: S.optional(S.String),
          Scope: S.optional(__S(3569, __c223, 1)),
        }),
      ).annotate({ identifier: "ValidationFinding" });
    case 3:
      return S.Array(__S(3570, __c223, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ValidationFindings: S.optional(__S(3571, __c223, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ValidateCloudConnectorResult" });
  }
}
function __c224(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
