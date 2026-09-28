import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "SSM",
  target: "AmazonSSM",
  version: "2014-11-06",
  sigv4: "ssm",
  protocol: awsJson1_1Protocol,
  xmlns: "http://ssm.amazonaws.com/doc/2014-11-06/",
  rules: (p, _) => {
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
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
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
              return e(
                `https://ssm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ssm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ssm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message: string;
  }> {}
export class AlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("AlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class AssociatedInstances
  extends /*@__PURE__*/ TE.TaggedError("AssociatedInstances")<{
    readonly message?: string;
  }> {}
export class AssociationAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError("AssociationAlreadyExists", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class AssociationDoesNotExist
  extends /*@__PURE__*/ TE.TaggedError("AssociationDoesNotExist")<{
    readonly message?: string;
  }> {}
export class AssociationExecutionDoesNotExist
  extends /*@__PURE__*/ TE.TaggedError("AssociationExecutionDoesNotExist")<{
    readonly message?: string;
  }> {}
export class AssociationLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("AssociationLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class AssociationVersionLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("AssociationVersionLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class AutomationDefinitionNotApprovedException
  extends /*@__PURE__*/ TE.TaggedError(
    "AutomationDefinitionNotApprovedException",
    [],
    { code: "AutomationDefinitionNotApproved" },
  )<{ readonly message?: string }> {}
export class AutomationDefinitionNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "AutomationDefinitionNotFoundException",
    [],
    { code: "AutomationDefinitionNotFound" },
  )<{ readonly message?: string }> {}
export class AutomationDefinitionVersionNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "AutomationDefinitionVersionNotFoundException",
    [],
    { code: "AutomationDefinitionVersionNotFound" },
  )<{ readonly message?: string }> {}
export class AutomationExecutionLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "AutomationExecutionLimitExceededException",
    [],
    { code: "AutomationExecutionLimitExceeded" },
  )<{ readonly message?: string }> {}
export class AutomationExecutionNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "AutomationExecutionNotFoundException",
    [],
    { code: "AutomationExecutionNotFound" },
  )<{ readonly message?: string }> {}
export class AutomationStepNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("AutomationStepNotFoundException")<{
    readonly message?: string;
  }> {}
export class ComplianceTypeCountLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ComplianceTypeCountLimitExceededException",
    [],
    { code: "ComplianceTypeCountLimitExceeded" },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
  }> {}
export class CustomSchemaCountLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomSchemaCountLimitExceededException",
    [],
    { code: "CustomSchemaCountLimitExceeded" },
  )<{ readonly message?: string }> {}
export class DocumentAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError("DocumentAlreadyExists", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class DocumentLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("DocumentLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class DocumentPermissionLimit
  extends /*@__PURE__*/ TE.TaggedError("DocumentPermissionLimit")<{
    readonly message?: string;
  }> {}
export class DocumentVersionLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("DocumentVersionLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class DoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("DoesNotExistException")<{
    readonly message?: string;
  }> {}
export class DuplicateDocumentContent
  extends /*@__PURE__*/ TE.TaggedError("DuplicateDocumentContent")<{
    readonly message?: string;
  }> {}
export class DuplicateDocumentVersionName
  extends /*@__PURE__*/ TE.TaggedError("DuplicateDocumentVersionName")<{
    readonly message?: string;
  }> {}
export class DuplicateInstanceId
  extends /*@__PURE__*/ TE.TaggedError("DuplicateInstanceId")<{
    readonly message?: string;
  }> {}
export class FeatureNotAvailableException
  extends /*@__PURE__*/ TE.TaggedError("FeatureNotAvailableException")<{
    readonly message?: string;
  }> {}
export class HierarchyLevelLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("HierarchyLevelLimitExceededException")<{
    readonly message?: string;
  }> {}
export class HierarchyTypeMismatchException
  extends /*@__PURE__*/ TE.TaggedError("HierarchyTypeMismatchException")<{
    readonly message?: string;
  }> {}
export class IdempotentParameterMismatch
  extends /*@__PURE__*/ TE.TaggedError("IdempotentParameterMismatch", [
    "ConflictError",
  ])<{ readonly message?: string }> {}
export class IncompatiblePolicyException
  extends /*@__PURE__*/ TE.TaggedError("IncompatiblePolicyException")<{
    readonly message?: string;
  }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError")<{
    readonly message?: string;
  }> {}
export class InvalidActivation
  extends /*@__PURE__*/ TE.TaggedError("InvalidActivation")<{
    readonly message?: string;
  }> {}
export class InvalidActivationId
  extends /*@__PURE__*/ TE.TaggedError("InvalidActivationId")<{
    readonly message?: string;
  }> {}
export class InvalidAggregatorException
  extends /*@__PURE__*/ TE.TaggedError("InvalidAggregatorException", [], {
    code: "InvalidAggregator",
  })<{ readonly message?: string }> {}
export class InvalidAllowedPatternException
  extends /*@__PURE__*/ TE.TaggedError("InvalidAllowedPatternException")<{
    readonly message?: string;
  }> {}
export class InvalidAssociation
  extends /*@__PURE__*/ TE.TaggedError("InvalidAssociation")<{
    readonly message?: string;
  }> {}
export class InvalidAssociationVersion
  extends /*@__PURE__*/ TE.TaggedError("InvalidAssociationVersion")<{
    readonly message?: string;
  }> {}
export class InvalidAutomationExecutionParametersException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidAutomationExecutionParametersException",
    [],
    { code: "InvalidAutomationExecutionParameters" },
  )<{ readonly message?: string }> {}
export class InvalidAutomationSignalException
  extends /*@__PURE__*/ TE.TaggedError("InvalidAutomationSignalException")<{
    readonly message?: string;
  }> {}
export class InvalidAutomationStatusUpdateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidAutomationStatusUpdateException",
  )<{ readonly message?: string }> {}
export class InvalidCommandId
  extends /*@__PURE__*/ TE.TaggedError("InvalidCommandId")<{
    readonly message?: string;
  }> {}
export class InvalidDeleteInventoryParametersException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDeleteInventoryParametersException",
    [],
    { code: "InvalidDeleteInventoryParameters" },
  )<{ readonly message?: string }> {}
export class InvalidDeletionIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidDeletionIdException", [], {
    code: "InvalidDeletionId",
  })<{ readonly message?: string }> {}
export class InvalidDocument
  extends /*@__PURE__*/ TE.TaggedError("InvalidDocument")<{
    readonly message?: string;
  }> {}
export class InvalidDocumentContent
  extends /*@__PURE__*/ TE.TaggedError("InvalidDocumentContent")<{
    readonly message?: string;
  }> {}
export class InvalidDocumentOperation
  extends /*@__PURE__*/ TE.TaggedError("InvalidDocumentOperation")<{
    readonly message?: string;
  }> {}
export class InvalidDocumentSchemaVersion
  extends /*@__PURE__*/ TE.TaggedError("InvalidDocumentSchemaVersion")<{
    readonly message?: string;
  }> {}
export class InvalidDocumentType
  extends /*@__PURE__*/ TE.TaggedError("InvalidDocumentType")<{
    readonly message?: string;
  }> {}
export class InvalidDocumentVersion
  extends /*@__PURE__*/ TE.TaggedError("InvalidDocumentVersion")<{
    readonly message?: string;
  }> {}
export class InvalidFilter
  extends /*@__PURE__*/ TE.TaggedError("InvalidFilter")<{
    readonly message?: string;
  }> {}
export class InvalidFilterKey
  extends /*@__PURE__*/ TE.TaggedError("InvalidFilterKey")<{
    readonly message?: string;
  }> {}
export class InvalidFilterOption
  extends /*@__PURE__*/ TE.TaggedError("InvalidFilterOption")<{
    readonly message?: string;
  }> {}
export class InvalidFilterValue
  extends /*@__PURE__*/ TE.TaggedError("InvalidFilterValue")<{
    readonly message?: string;
  }> {}
export class InvalidInstanceId
  extends /*@__PURE__*/ TE.TaggedError("InvalidInstanceId")<{
    readonly message?: string;
  }> {}
export class InvalidInstanceInformationFilterValue
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInstanceInformationFilterValue",
  )<{ readonly message?: string }> {}
export class InvalidInstancePropertyFilterValue
  extends /*@__PURE__*/ TE.TaggedError("InvalidInstancePropertyFilterValue")<{
    readonly message?: string;
  }> {}
export class InvalidInventoryGroupException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInventoryGroupException", [], {
    code: "InvalidInventoryGroup",
  })<{ readonly message?: string }> {}
export class InvalidInventoryItemContextException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInventoryItemContextException",
    [],
    { code: "InvalidInventoryItemContext" },
  )<{ readonly message?: string }> {}
export class InvalidInventoryRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInventoryRequestException", [], {
    code: "InvalidInventoryRequest",
  })<{ readonly message?: string }> {}
export class InvalidItemContentException
  extends /*@__PURE__*/ TE.TaggedError("InvalidItemContentException", [], {
    code: "InvalidItemContent",
  })<{ readonly TypeName?: string; readonly message?: string }> {}
export class InvalidKeyId
  extends /*@__PURE__*/ TE.TaggedError("InvalidKeyId")<{
    readonly message?: string;
  }> {}
export class InvalidNextToken
  extends /*@__PURE__*/ TE.TaggedError("InvalidNextToken")<{
    readonly message?: string;
  }> {}
export class InvalidNotificationConfig
  extends /*@__PURE__*/ TE.TaggedError("InvalidNotificationConfig")<{
    readonly message?: string;
  }> {}
export class InvalidOptionException
  extends /*@__PURE__*/ TE.TaggedError("InvalidOptionException", [], {
    code: "InvalidOption",
  })<{ readonly message?: string }> {}
export class InvalidOutputFolder
  extends /*@__PURE__*/ TE.TaggedError("InvalidOutputFolder")<{
    readonly message?: string;
  }> {}
export class InvalidOutputLocation
  extends /*@__PURE__*/ TE.TaggedError("InvalidOutputLocation")<{
    readonly message?: string;
  }> {}
export class InvalidParameters
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameters")<{
    readonly message?: string;
  }> {}
export class InvalidPermissionType
  extends /*@__PURE__*/ TE.TaggedError("InvalidPermissionType")<{
    readonly message?: string;
  }> {}
export class InvalidPluginName
  extends /*@__PURE__*/ TE.TaggedError("InvalidPluginName")<{
    readonly message?: string;
  }> {}
export class InvalidPolicyAttributeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPolicyAttributeException")<{
    readonly message?: string;
  }> {}
export class InvalidPolicyTypeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPolicyTypeException")<{
    readonly message?: string;
  }> {}
export class InvalidResourceId
  extends /*@__PURE__*/ TE.TaggedError("InvalidResourceId")<{
    readonly message?: string;
  }> {}
export class InvalidResourceType
  extends /*@__PURE__*/ TE.TaggedError("InvalidResourceType")<{
    readonly message?: string;
  }> {}
export class InvalidResultAttributeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidResultAttributeException", [], {
    code: "InvalidResultAttribute",
  })<{ readonly message?: string }> {}
export class InvalidRole
  extends /*@__PURE__*/ TE.TaggedError("InvalidRole")<{
    readonly message?: string;
  }> {}
export class InvalidSchedule
  extends /*@__PURE__*/ TE.TaggedError("InvalidSchedule")<{
    readonly message?: string;
  }> {}
export class InvalidTag
  extends /*@__PURE__*/ TE.TaggedError("InvalidTag")<{
    readonly message?: string;
  }> {}
export class InvalidTarget
  extends /*@__PURE__*/ TE.TaggedError("InvalidTarget")<{
    readonly message?: string;
  }> {}
export class InvalidTargetMaps
  extends /*@__PURE__*/ TE.TaggedError("InvalidTargetMaps")<{
    readonly message?: string;
  }> {}
export class InvalidTypeNameException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTypeNameException", [], {
    code: "InvalidTypeName",
  })<{ readonly message?: string }> {}
export class InvalidUpdate
  extends /*@__PURE__*/ TE.TaggedError("InvalidUpdate")<{
    readonly message?: string;
  }> {}
export class InvocationDoesNotExist
  extends /*@__PURE__*/ TE.TaggedError("InvocationDoesNotExist")<{
    readonly message?: string;
  }> {}
export class ItemContentMismatchException
  extends /*@__PURE__*/ TE.TaggedError("ItemContentMismatchException", [], {
    code: "ItemContentMismatch",
  })<{ readonly TypeName?: string; readonly message?: string }> {}
export class ItemSizeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("ItemSizeLimitExceededException", [], {
    code: "ItemSizeLimitExceeded",
  })<{ readonly TypeName?: string; readonly message?: string }> {}
export class MalformedResourcePolicyDocumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "MalformedResourcePolicyDocumentException",
  )<{ readonly message?: string }> {}
export class MaxDocumentSizeExceeded
  extends /*@__PURE__*/ TE.TaggedError("MaxDocumentSizeExceeded")<{
    readonly message?: string;
  }> {}
export class NoLongerSupportedException
  extends /*@__PURE__*/ TE.TaggedError("NoLongerSupportedException", [], {
    code: "NoLongerSupported",
  })<{ readonly message?: string }> {}
export class OpsItemAccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("OpsItemAccessDeniedException", [
    "AuthError",
  ])<{ readonly message?: string }> {}
export class OpsItemAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("OpsItemAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string; readonly OpsItemId?: string }> {}
export class OpsItemConflictException
  extends /*@__PURE__*/ TE.TaggedError("OpsItemConflictException")<{
    readonly message?: string;
  }> {}
export class OpsItemInvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("OpsItemInvalidParameterException")<{
    readonly ParameterNames?: string[];
    readonly message?: string;
  }> {}
export class OpsItemLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("OpsItemLimitExceededException")<{
    readonly ResourceTypes?: string[];
    readonly Limit?: number;
    readonly LimitType?: string;
    readonly message?: string;
  }> {}
export class OpsItemNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("OpsItemNotFoundException")<{
    readonly message?: string;
  }> {}
export class OpsItemRelatedItemAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "OpsItemRelatedItemAlreadyExistsException",
    ["AlreadyExistsError"],
  )<{
    readonly message?: string;
    readonly ResourceUri?: string;
    readonly OpsItemId?: string;
  }> {}
export class OpsItemRelatedItemAssociationNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "OpsItemRelatedItemAssociationNotFoundException",
  )<{ readonly message?: string }> {}
export class OpsMetadataAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("OpsMetadataAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class OpsMetadataInvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError("OpsMetadataInvalidArgumentException")<{
    readonly message?: string;
  }> {}
export class OpsMetadataKeyLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("OpsMetadataKeyLimitExceededException")<{
    readonly message?: string;
  }> {}
export class OpsMetadataLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("OpsMetadataLimitExceededException")<{
    readonly message?: string;
  }> {}
export class OpsMetadataNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("OpsMetadataNotFoundException")<{
    readonly message?: string;
  }> {}
export class OpsMetadataTooManyUpdatesException
  extends /*@__PURE__*/ TE.TaggedError("OpsMetadataTooManyUpdatesException")<{
    readonly message?: string;
  }> {}
export class ParameterAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError("ParameterAlreadyExists", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ParameterLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("ParameterLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class ParameterMaxVersionLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("ParameterMaxVersionLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class ParameterNotFound
  extends /*@__PURE__*/ TE.TaggedError("ParameterNotFound")<{
    readonly message?: string;
  }> {}
export class ParameterPatternMismatchException
  extends /*@__PURE__*/ TE.TaggedError("ParameterPatternMismatchException")<{
    readonly message?: string;
  }> {}
export class ParameterVersionLabelLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("ParameterVersionLabelLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly message?: string }> {}
export class ParameterVersionNotFound
  extends /*@__PURE__*/ TE.TaggedError("ParameterVersionNotFound")<{
    readonly message?: string;
  }> {}
export class PoliciesLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("PoliciesLimitExceededException")<{
    readonly message?: string;
  }> {}
export class ResourceDataSyncAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceDataSyncAlreadyExistsException",
    ["AlreadyExistsError"],
    { code: "ResourceDataSyncAlreadyExists" },
  )<{ readonly SyncName?: string; readonly message?: string }> {}
export class ResourceDataSyncConflictException
  extends /*@__PURE__*/ TE.TaggedError("ResourceDataSyncConflictException")<{
    readonly message?: string;
  }> {}
export class ResourceDataSyncCountExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceDataSyncCountExceededException",
    [],
    { code: "ResourceDataSyncCountExceeded" },
  )<{ readonly message?: string }> {}
export class ResourceDataSyncInvalidConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceDataSyncInvalidConfigurationException",
    [],
    { code: "ResourceDataSyncInvalidConfiguration" },
  )<{ readonly message?: string }> {}
export class ResourceDataSyncNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceDataSyncNotFoundException",
    [],
    { code: "ResourceDataSyncNotFound" },
  )<{
    readonly SyncName?: string;
    readonly SyncType?: string;
    readonly message?: string;
  }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException")<{
    readonly message?: string;
  }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("ResourceLimitExceededException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class ResourcePolicyConflictException
  extends /*@__PURE__*/ TE.TaggedError("ResourcePolicyConflictException")<{
    readonly message?: string;
  }> {}
export class ResourcePolicyInvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourcePolicyInvalidParameterException",
  )<{ readonly ParameterNames?: string[]; readonly message?: string }> {}
export class ResourcePolicyLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("ResourcePolicyLimitExceededException")<{
    readonly Limit?: number;
    readonly LimitType?: string;
    readonly message?: string;
  }> {}
export class ResourcePolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourcePolicyNotFoundException")<{
    readonly message?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError("ServiceQuotaExceededException")<{
    readonly message: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
    readonly QuotaCode: string;
    readonly ServiceCode: string;
  }> {}
export class ServiceSettingNotFound
  extends /*@__PURE__*/ TE.TaggedError("ServiceSettingNotFound")<{
    readonly message?: string;
  }> {}
export class StatusUnchanged
  extends /*@__PURE__*/ TE.TaggedError("StatusUnchanged")<{
    readonly message?: string;
  }> {}
export class SubTypeCountLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "SubTypeCountLimitExceededException",
    [],
    { code: "SubTypeCountLimitExceeded" },
  )<{ readonly message?: string }> {}
export class TargetInUseException
  extends /*@__PURE__*/ TE.TaggedError("TargetInUseException")<{
    readonly message?: string;
  }> {}
export class TargetNotConnected
  extends /*@__PURE__*/ TE.TaggedError("TargetNotConnected")<{
    readonly message?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
    readonly message: string;
    readonly QuotaCode?: string;
    readonly ServiceCode?: string;
  }> {}
export class TooManyTagsError
  extends /*@__PURE__*/ TE.TaggedError("TooManyTagsError")<{
    readonly message?: string;
  }> {}
export class TooManyUpdates
  extends /*@__PURE__*/ TE.TaggedError("TooManyUpdates")<{
    readonly message?: string;
  }> {}
export class TotalSizeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("TotalSizeLimitExceededException", [], {
    code: "TotalSizeLimitExceeded",
  })<{ readonly message?: string }> {}
export class UnsupportedCalendarException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedCalendarException")<{
    readonly message?: string;
  }> {}
export class UnsupportedFeatureRequiredException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedFeatureRequiredException")<{
    readonly message?: string;
  }> {}
export class UnsupportedInventoryItemContextException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedInventoryItemContextException",
    [],
    { code: "UnsupportedInventoryItemContext" },
  )<{ readonly TypeName?: string; readonly message?: string }> {}
export class UnsupportedInventorySchemaVersionException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedInventorySchemaVersionException",
    [],
    { code: "UnsupportedInventorySchemaVersion" },
  )<{ readonly message?: string }> {}
export class UnsupportedOperatingSystem
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedOperatingSystem")<{
    readonly message?: string;
  }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedOperationException", [], {
    code: "UnsupportedOperation",
  })<{ readonly message?: string }> {}
export class UnsupportedParameterType
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedParameterType")<{
    readonly message?: string;
  }> {}
export class UnsupportedPlatformType
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedPlatformType")<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
    readonly ReasonCode?: string;
  }> {}
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
  AssociationId?: string;
}
export type CommandId = string;
export type InstanceId = string;
export type InstanceIdList = string[];
export interface CancelCommandRequest {
  CommandId: string;
  InstanceIds?: string[];
}
export interface CancelCommandResult {}
export type MaintenanceWindowExecutionId = string;
export interface CancelMaintenanceWindowExecutionRequest {
  WindowExecutionId: string;
}
export interface CancelMaintenanceWindowExecutionResult {
  WindowExecutionId?: string;
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
  Description?: string;
  DefaultInstanceName?: string;
  IamRole: string;
  RegistrationLimit?: number;
  ExpirationDate?: Date;
  Tags?: Tag[];
  RegistrationMetadata?: RegistrationMetadataItem[];
}
export type ActivationId = string;
export type ActivationCode = string;
export interface CreateActivationResult {
  ActivationId?: string;
  ActivationCode?: string;
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
  Key?: string;
  Values?: string[];
}
export type Targets = Target[];
export type ScheduleExpression = string;
export type S3Region = string;
export type S3BucketName = string;
export type S3KeyPrefix = string;
export interface S3OutputLocation {
  OutputS3Region?: string;
  OutputS3BucketName?: string;
  OutputS3KeyPrefix?: string;
}
export interface InstanceAssociationOutputLocation {
  S3Location?: S3OutputLocation;
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
  IgnorePollAlarmFailure?: boolean;
  Alarms: Alarm[];
}
export type ExcludeAccount = string;
export type ExcludeAccounts = string[];
export type AutomationTargets = Target[];
export interface TargetLocation {
  Accounts?: string[];
  Regions?: string[];
  TargetLocationMaxConcurrency?: string;
  TargetLocationMaxErrors?: string;
  ExecutionRoleName?: string;
  TargetLocationAlarmConfiguration?: AlarmConfiguration;
  IncludeChildOrganizationUnits?: boolean;
  ExcludeAccounts?: string[];
  Targets?: Target[];
  TargetsMaxConcurrency?: string;
  TargetsMaxErrors?: string;
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
  DocumentVersion?: string;
  InstanceId?: string;
  Parameters?: { [key: string]: string[] | undefined };
  Targets?: Target[];
  ScheduleExpression?: string;
  OutputLocation?: InstanceAssociationOutputLocation;
  AssociationName?: string;
  AutomationTargetParameterName?: string;
  MaxErrors?: string;
  MaxConcurrency?: string;
  ComplianceSeverity?: AssociationComplianceSeverity;
  SyncCompliance?: AssociationSyncCompliance;
  ApplyOnlyAtCronInterval?: boolean;
  CalendarNames?: string[];
  TargetLocations?: TargetLocation[];
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
  Tags?: Tag[];
  AlarmConfiguration?: AlarmConfiguration;
  AssociationDispatchAssumeRole?: string;
}
export type AssociationVersion = string;
export type AssociationStatusName =
  | "Pending"
  | "Success"
  | "Failed"
  | (string & {});
export type StatusMessage = string;
export type StatusAdditionalInfo = string;
export interface AssociationStatus {
  Date: Date;
  Name: AssociationStatusName;
  Message: string;
  AdditionalInfo?: string;
}
export type StatusName = string;
export type InstanceCount = number;
export type AssociationStatusAggregatedCount = {
  [key: string]: number | undefined;
};
export interface AssociationOverview {
  Status?: string;
  DetailedStatus?: string;
  AssociationStatusAggregatedCount?: { [key: string]: number | undefined };
}
export type AssociationId = string;
export type ExternalAlarmState = "UNKNOWN" | "ALARM" | (string & {});
export interface AlarmStateInformation {
  Name: string;
  State: ExternalAlarmState;
}
export type AlarmStateInformationList = AlarmStateInformation[];
export interface AssociationDescription {
  Name?: string;
  InstanceId?: string;
  AssociationVersion?: string;
  Date?: Date;
  LastUpdateAssociationDate?: Date;
  Status?: AssociationStatus;
  Overview?: AssociationOverview;
  DocumentVersion?: string;
  AutomationTargetParameterName?: string;
  Parameters?: { [key: string]: string[] | undefined };
  AssociationId?: string;
  Targets?: Target[];
  ScheduleExpression?: string;
  OutputLocation?: InstanceAssociationOutputLocation;
  LastExecutionDate?: Date;
  LastSuccessfulExecutionDate?: Date;
  AssociationName?: string;
  MaxErrors?: string;
  MaxConcurrency?: string;
  ComplianceSeverity?: AssociationComplianceSeverity;
  SyncCompliance?: AssociationSyncCompliance;
  ApplyOnlyAtCronInterval?: boolean;
  CalendarNames?: string[];
  TargetLocations?: TargetLocation[];
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
  AssociationDispatchAssumeRole?: string;
}
export interface CreateAssociationResult {
  AssociationDescription?: AssociationDescription;
}
export interface CreateAssociationBatchRequestEntry {
  Name: string;
  InstanceId?: string;
  Parameters?: { [key: string]: string[] | undefined };
  AutomationTargetParameterName?: string;
  DocumentVersion?: string;
  Targets?: Target[];
  ScheduleExpression?: string;
  OutputLocation?: InstanceAssociationOutputLocation;
  AssociationName?: string;
  MaxErrors?: string;
  MaxConcurrency?: string;
  ComplianceSeverity?: AssociationComplianceSeverity;
  SyncCompliance?: AssociationSyncCompliance;
  ApplyOnlyAtCronInterval?: boolean;
  CalendarNames?: string[];
  TargetLocations?: TargetLocation[];
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
  AlarmConfiguration?: AlarmConfiguration;
}
export type CreateAssociationBatchRequestEntries =
  CreateAssociationBatchRequestEntry[];
export interface CreateAssociationBatchRequest {
  Entries: CreateAssociationBatchRequestEntry[];
  AssociationDispatchAssumeRole?: string;
}
export type AssociationDescriptionList = AssociationDescription[];
export type BatchErrorMessage = string;
export type Fault = "Client" | "Server" | "Unknown" | (string & {});
export interface FailedCreateAssociation {
  Entry?: CreateAssociationBatchRequestEntry;
  Message?: string;
  Fault?: Fault;
}
export type FailedCreateAssociationList = FailedCreateAssociation[];
export interface CreateAssociationBatchResult {
  Successful?: AssociationDescription[];
  Failed?: FailedCreateAssociation[];
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
  DisplayName?: string;
}
export type AzureSubscriptionList = AzureSubscription[];
export type ConfigurationTargets = { Subscriptions: AzureSubscription[] };
export interface AzureConfiguration {
  TenantId: string;
  TenantDisplayName?: string;
  ApplicationId: string;
  ApplicationDisplayName?: string;
  Targets?: ConfigurationTargets;
}
export type CloudConnectorConfiguration = {
  AzureConfiguration: AzureConfiguration;
};
export type ConfigConnectorArn = string;
export interface CreateCloudConnectorRequest {
  DisplayName: string;
  RoleArn: string;
  Description?: string;
  Configuration: CloudConnectorConfiguration;
  ConfigConnectorArn: string;
  Tags?: Tag[];
}
export type CloudConnectorId = string;
export interface CreateCloudConnectorResult {
  CloudConnectorId?: string;
}
export type DocumentContent = string;
export type RequireType = string;
export type DocumentVersionName = string;
export interface DocumentRequires {
  Name: string;
  Version?: string;
  RequireType?: string;
  VersionName?: string;
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
  Key?: AttachmentsSourceKey;
  Values?: string[];
  Name?: string;
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
  Requires?: DocumentRequires[];
  Attachments?: AttachmentsSource[];
  Name: string;
  DisplayName?: string;
  VersionName?: string;
  DocumentType?: DocumentType;
  DocumentFormat?: DocumentFormat;
  TargetType?: string;
  Tags?: Tag[];
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
  Name?: string;
  Type?: DocumentParameterType;
  Description?: string;
  DefaultValue?: string;
}
export type DocumentParameterList = DocumentParameter[];
export type PlatformType = "Windows" | "Linux" | "MacOS" | (string & {});
export type PlatformTypeList = PlatformType[];
export type DocumentSchemaVersion = string;
export type AttachmentName = string;
export interface AttachmentInformation {
  Name?: string;
}
export type AttachmentInformationList = AttachmentInformation[];
export type DocumentAuthor = string;
export type ReviewStatus =
  | "APPROVED"
  | "NOT_REVIEWED"
  | "PENDING"
  | "REJECTED"
  | (string & {});
export type Reviewer = string;
export interface ReviewInformation {
  ReviewedTime?: Date;
  Status?: ReviewStatus;
  Reviewer?: string;
}
export type ReviewInformationList = ReviewInformation[];
export type Category = string;
export type CategoryList = string[];
export type CategoryEnumList = string[];
export interface DocumentDescription {
  Sha1?: string;
  Hash?: string;
  HashType?: DocumentHashType;
  Name?: string;
  DisplayName?: string;
  VersionName?: string;
  Owner?: string;
  CreatedDate?: Date;
  Status?: DocumentStatus;
  StatusInformation?: string;
  DocumentVersion?: string;
  Description?: string;
  Parameters?: DocumentParameter[];
  PlatformTypes?: PlatformType[];
  DocumentType?: DocumentType;
  SchemaVersion?: string;
  LatestVersion?: string;
  DefaultVersion?: string;
  DocumentFormat?: DocumentFormat;
  TargetType?: string;
  Tags?: Tag[];
  AttachmentsInformation?: AttachmentInformation[];
  Requires?: DocumentRequires[];
  Author?: string;
  ReviewInformation?: ReviewInformation[];
  ApprovedVersion?: string;
  PendingReviewVersion?: string;
  ReviewStatus?: ReviewStatus;
  Category?: string[];
  CategoryEnum?: string[];
}
export interface CreateDocumentResult {
  DocumentDescription?: DocumentDescription;
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
  Description?: string | redacted.Redacted<string>;
  StartDate?: string;
  EndDate?: string;
  Schedule: string;
  ScheduleTimezone?: string;
  ScheduleOffset?: number;
  Duration: number;
  Cutoff: number;
  AllowUnassociatedTargets: boolean;
  ClientToken?: string;
  Tags?: Tag[];
}
export type MaintenanceWindowId = string;
export interface CreateMaintenanceWindowResult {
  WindowId?: string;
}
export type OpsItemDescription = string;
export type OpsItemType = string;
export type OpsItemDataKey = string;
export type OpsItemDataValueString = string;
export type OpsItemDataType = "SearchableString" | "String" | (string & {});
export interface OpsItemDataValue {
  Value?: string;
  Type?: OpsItemDataType;
}
export type OpsItemOperationalData = {
  [key: string]: OpsItemDataValue | undefined;
};
export interface OpsItemNotification {
  Arn?: string;
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
  OpsItemType?: string;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined };
  Notifications?: OpsItemNotification[];
  Priority?: number;
  RelatedOpsItems?: RelatedOpsItem[];
  Source: string;
  Title: string;
  Tags?: Tag[];
  Category?: string;
  Severity?: string;
  ActualStartTime?: Date;
  ActualEndTime?: Date;
  PlannedStartTime?: Date;
  PlannedEndTime?: Date;
  AccountId?: string;
}
export type OpsItemArn = string;
export interface CreateOpsItemResponse {
  OpsItemId?: string;
  OpsItemArn?: string;
}
export type OpsMetadataResourceId = string;
export type MetadataKey = string;
export type MetadataValueString = string;
export interface MetadataValue {
  Value?: string;
}
export type MetadataMap = { [key: string]: MetadataValue | undefined };
export interface CreateOpsMetadataRequest {
  ResourceId: string;
  Metadata?: { [key: string]: MetadataValue | undefined };
  Tags?: Tag[];
}
export type OpsMetadataArn = string;
export interface CreateOpsMetadataResult {
  OpsMetadataArn?: string;
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
  ComplianceLevel?: PatchComplianceLevel;
  ApproveAfterDays?: number;
  ApproveUntilDate?: string;
  EnableNonSecurity?: boolean;
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
export type PatchComplianceStatus =
  | "COMPLIANT"
  | "NON_COMPLIANT"
  | (string & {});
export interface CreatePatchBaselineRequest {
  OperatingSystem?: OperatingSystem;
  Name: string;
  GlobalFilters?: PatchFilterGroup;
  ApprovalRules?: PatchRuleGroup;
  ApprovedPatches?: string[];
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel;
  ApprovedPatchesEnableNonSecurity?: boolean;
  RejectedPatches?: string[];
  RejectedPatchesAction?: PatchAction;
  Description?: string;
  Sources?: PatchSource[];
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus;
  ClientToken?: string;
  Tags?: Tag[];
}
export type BaselineId = string;
export interface CreatePatchBaselineResult {
  BaselineId?: string;
}
export type ResourceDataSyncName = string;
export type ResourceDataSyncS3BucketName = string;
export type ResourceDataSyncS3Prefix = string;
export type ResourceDataSyncS3Format = "JsonSerDe" | (string & {});
export type ResourceDataSyncS3Region = string;
export type ResourceDataSyncAWSKMSKeyARN = string;
export type ResourceDataSyncDestinationDataSharingType = string;
export interface ResourceDataSyncDestinationDataSharing {
  DestinationDataSharingType?: string;
}
export interface ResourceDataSyncS3Destination {
  BucketName: string;
  Prefix?: string;
  SyncFormat: ResourceDataSyncS3Format;
  Region: string;
  AWSKMSKeyARN?: string;
  DestinationDataSharing?: ResourceDataSyncDestinationDataSharing;
}
export type ResourceDataSyncType = string;
export type ResourceDataSyncSourceType = string;
export type ResourceDataSyncOrganizationSourceType = string;
export type ResourceDataSyncOrganizationalUnitId = string;
export interface ResourceDataSyncOrganizationalUnit {
  OrganizationalUnitId?: string;
}
export type ResourceDataSyncOrganizationalUnitList =
  ResourceDataSyncOrganizationalUnit[];
export interface ResourceDataSyncAwsOrganizationsSource {
  OrganizationSourceType: string;
  OrganizationalUnits?: ResourceDataSyncOrganizationalUnit[];
}
export type ResourceDataSyncSourceRegion = string;
export type ResourceDataSyncSourceRegionList = string[];
export type ResourceDataSyncIncludeFutureRegions = boolean;
export type ResourceDataSyncEnableAllOpsDataSources = boolean;
export interface ResourceDataSyncSource {
  SourceType: string;
  AwsOrganizationsSource?: ResourceDataSyncAwsOrganizationsSource;
  SourceRegions: string[];
  IncludeFutureRegions?: boolean;
  EnableAllOpsDataSources?: boolean;
}
export interface CreateResourceDataSyncRequest {
  SyncName: string;
  S3Destination?: ResourceDataSyncS3Destination;
  SyncType?: string;
  SyncSource?: ResourceDataSyncSource;
}
export interface CreateResourceDataSyncResult {}
export interface DeleteActivationRequest {
  ActivationId: string;
}
export interface DeleteActivationResult {}
export interface DeleteAssociationRequest {
  Name?: string;
  InstanceId?: string;
  AssociationId?: string;
}
export interface DeleteAssociationResult {}
export interface DeleteCloudConnectorRequest {
  CloudConnectorId: string;
}
export interface DeleteCloudConnectorResult {
  CloudConnectorId?: string;
}
export interface DeleteDocumentRequest {
  Name: string;
  DocumentVersion?: string;
  VersionName?: string;
  Force?: boolean;
}
export interface DeleteDocumentResult {}
export type InventoryItemTypeName = string;
export type InventorySchemaDeleteOption =
  | "DisableSchema"
  | "DeleteSchema"
  | (string & {});
export type DryRun = boolean;
export type UUID = string;
export interface DeleteInventoryRequest {
  TypeName: string;
  SchemaDeleteOption?: InventorySchemaDeleteOption;
  DryRun?: boolean;
  ClientToken?: string;
}
export type TotalCount = number;
export type RemainingCount = number;
export type InventoryItemSchemaVersion = string;
export type ResourceCount = number;
export interface InventoryDeletionSummaryItem {
  Version?: string;
  Count?: number;
  RemainingCount?: number;
}
export type InventoryDeletionSummaryItems = InventoryDeletionSummaryItem[];
export interface InventoryDeletionSummary {
  TotalCount?: number;
  RemainingCount?: number;
  SummaryItems?: InventoryDeletionSummaryItem[];
}
export interface DeleteInventoryResult {
  DeletionId?: string;
  TypeName?: string;
  DeletionSummary?: InventoryDeletionSummary;
}
export interface DeleteMaintenanceWindowRequest {
  WindowId: string;
}
export interface DeleteMaintenanceWindowResult {
  WindowId?: string;
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
  DeletedParameters?: string[];
  InvalidParameters?: string[];
}
export interface DeletePatchBaselineRequest {
  BaselineId: string;
}
export interface DeletePatchBaselineResult {
  BaselineId?: string;
}
export interface DeleteResourceDataSyncRequest {
  SyncName: string;
  SyncType?: string;
}
export interface DeleteResourceDataSyncResult {}
export type ResourceArnString = string;
export type PolicyId = string;
export type PolicyHash = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
  PolicyId: string;
  PolicyHash: string;
}
export interface DeleteResourcePolicyResponse {}
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
  BaselineId?: string;
  PatchGroup?: string;
}
export type MaintenanceWindowTargetId = string;
export interface DeregisterTargetFromMaintenanceWindowRequest {
  WindowId: string;
  WindowTargetId: string;
  Safe?: boolean;
}
export interface DeregisterTargetFromMaintenanceWindowResult {
  WindowId?: string;
  WindowTargetId?: string;
}
export type MaintenanceWindowTaskId = string;
export interface DeregisterTaskFromMaintenanceWindowRequest {
  WindowId: string;
  WindowTaskId: string;
}
export interface DeregisterTaskFromMaintenanceWindowResult {
  WindowId?: string;
  WindowTaskId?: string;
}
export type DescribeActivationsFilterKeys =
  | "ActivationIds"
  | "DefaultInstanceName"
  | "IamRole"
  | (string & {});
export type StringList = string[];
export interface DescribeActivationsFilter {
  FilterKey?: DescribeActivationsFilterKeys;
  FilterValues?: string[];
}
export type DescribeActivationsFilterList = DescribeActivationsFilter[];
export type MaxResults = number;
export type NextToken = string;
export interface DescribeActivationsRequest {
  Filters?: DescribeActivationsFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type RegistrationsCount = number;
export type CreatedDate = Date;
export interface Activation {
  ActivationId?: string;
  Description?: string;
  DefaultInstanceName?: string;
  IamRole?: string;
  RegistrationLimit?: number;
  RegistrationsCount?: number;
  ExpirationDate?: Date;
  Expired?: boolean;
  CreatedDate?: Date;
  Tags?: Tag[];
}
export type ActivationList = Activation[];
export interface DescribeActivationsResult {
  ActivationList?: Activation[];
  NextToken?: string;
}
export interface DescribeAssociationRequest {
  Name?: string;
  InstanceId?: string;
  AssociationId?: string;
  AssociationVersion?: string;
}
export interface DescribeAssociationResult {
  AssociationDescription?: AssociationDescription;
}
export type AssociationExecutionFilterKey =
  | "ExecutionId"
  | "Status"
  | "CreatedTime"
  | (string & {});
export type AssociationExecutionFilterValue = string;
export type AssociationFilterOperatorType =
  | "EQUAL"
  | "LESS_THAN"
  | "GREATER_THAN"
  | (string & {});
export interface AssociationExecutionFilter {
  Key: AssociationExecutionFilterKey;
  Value: string;
  Type: AssociationFilterOperatorType;
}
export type AssociationExecutionFilterList = AssociationExecutionFilter[];
export interface DescribeAssociationExecutionsRequest {
  AssociationId: string;
  Filters?: AssociationExecutionFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type AssociationExecutionId = string;
export type ResourceCountByStatus = string;
export interface AssociationExecution {
  AssociationId?: string;
  AssociationVersion?: string;
  ExecutionId?: string;
  Status?: string;
  DetailedStatus?: string;
  CreatedTime?: Date;
  LastExecutionDate?: Date;
  ResourceCountByStatus?: string;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
}
export type AssociationExecutionsList = AssociationExecution[];
export interface DescribeAssociationExecutionsResult {
  AssociationExecutions?: AssociationExecution[];
  NextToken?: string;
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
export type AssociationExecutionTargetsFilterList =
  AssociationExecutionTargetsFilter[];
export interface DescribeAssociationExecutionTargetsRequest {
  AssociationId: string;
  ExecutionId: string;
  Filters?: AssociationExecutionTargetsFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type AssociationResourceId = string;
export type AssociationResourceType = string;
export type OutputSourceId = string;
export type OutputSourceType = string;
export interface OutputSource {
  OutputSourceId?: string;
  OutputSourceType?: string;
}
export interface AssociationExecutionTarget {
  AssociationId?: string;
  AssociationVersion?: string;
  ExecutionId?: string;
  ResourceId?: string;
  ResourceType?: string;
  Status?: string;
  DetailedStatus?: string;
  LastExecutionDate?: Date;
  OutputSource?: OutputSource;
}
export type AssociationExecutionTargetsList = AssociationExecutionTarget[];
export interface DescribeAssociationExecutionTargetsResult {
  AssociationExecutionTargets?: AssociationExecutionTarget[];
  NextToken?: string;
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
  Filters?: AutomationExecutionFilter[];
  MaxResults?: number;
  NextToken?: string;
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
  ParameterValues?: string[];
  Truncated?: boolean;
}
export type AutomationType = "CrossAccount" | "Local" | (string & {});
export type TargetLocationsURL = string;
export type AutomationSubtype =
  | "ChangeRequest"
  | "AccessRequest"
  | (string & {});
export interface Runbook {
  DocumentName: string;
  DocumentVersion?: string;
  Parameters?: { [key: string]: string[] | undefined };
  TargetParameterName?: string;
  Targets?: Target[];
  TargetMaps?: { [key: string]: string[] | undefined }[];
  MaxConcurrency?: string;
  MaxErrors?: string;
  TargetLocations?: TargetLocation[];
}
export type Runbooks = Runbook[];
export type ChangeRequestName = string;
export interface AutomationExecutionMetadata {
  AutomationExecutionId?: string;
  DocumentName?: string;
  DocumentVersion?: string;
  AutomationExecutionStatus?: AutomationExecutionStatus;
  ExecutionStartTime?: Date;
  ExecutionEndTime?: Date;
  ExecutedBy?: string;
  LogFile?: string;
  Outputs?: { [key: string]: string[] | undefined };
  Mode?: ExecutionMode;
  ParentAutomationExecutionId?: string;
  CurrentStepName?: string;
  CurrentAction?: string;
  FailureMessage?: string;
  WarningMessage?: string;
  TargetParameterName?: string;
  Targets?: Target[];
  TargetMaps?: { [key: string]: string[] | undefined }[];
  ResolvedTargets?: ResolvedTargets;
  MaxConcurrency?: string;
  MaxErrors?: string;
  Target?: string;
  AutomationType?: AutomationType;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
  TargetLocationsURL?: string;
  AutomationSubtype?: AutomationSubtype;
  ScheduledTime?: Date;
  Runbooks?: Runbook[];
  OpsItemId?: string;
  AssociationId?: string;
  ChangeRequestName?: string;
}
export type AutomationExecutionMetadataList = AutomationExecutionMetadata[];
export interface DescribeAutomationExecutionsResult {
  AutomationExecutionMetadataList?: AutomationExecutionMetadata[];
  NextToken?: string;
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
  Filters?: StepExecutionFilter[];
  NextToken?: string;
  MaxResults?: number;
  ReverseOrder?: boolean;
}
export type AutomationActionName = string;
export type NormalStringMap = { [key: string]: string | undefined };
export interface FailureDetails {
  FailureStage?: string;
  FailureType?: string;
  Details?: { [key: string]: string[] | undefined };
}
export type ValidNextStep = string;
export type ValidNextStepList = string[];
export interface ParentStepDetails {
  StepExecutionId?: string;
  StepName?: string;
  Action?: string;
  Iteration?: number;
  IteratorValue?: string;
}
export interface StepExecution {
  StepName?: string;
  Action?: string;
  TimeoutSeconds?: number;
  OnFailure?: string;
  MaxAttempts?: number;
  ExecutionStartTime?: Date;
  ExecutionEndTime?: Date;
  StepStatus?: AutomationExecutionStatus;
  ResponseCode?: string;
  Inputs?: { [key: string]: string | undefined };
  Outputs?: { [key: string]: string[] | undefined };
  Response?: string;
  FailureMessage?: string;
  WarningMessage?: string;
  FailureDetails?: FailureDetails;
  StepExecutionId?: string;
  OverriddenParameters?: { [key: string]: string[] | undefined };
  IsEnd?: boolean;
  NextStep?: string;
  IsCritical?: boolean;
  ValidNextSteps?: string[];
  Targets?: Target[];
  TargetLocation?: TargetLocation;
  TriggeredAlarms?: AlarmStateInformation[];
  ParentStepDetails?: ParentStepDetails;
}
export type StepExecutionList = StepExecution[];
export interface DescribeAutomationStepExecutionsResult {
  StepExecutions?: StepExecution[];
  NextToken?: string;
}
export type PatchOrchestratorFilterKey = string;
export type PatchOrchestratorFilterValue = string;
export type PatchOrchestratorFilterValues = string[];
export interface PatchOrchestratorFilter {
  Key?: string;
  Values?: string[];
}
export type PatchOrchestratorFilterList = PatchOrchestratorFilter[];
export type PatchBaselineMaxResults = number;
export interface DescribeAvailablePatchesRequest {
  Filters?: PatchOrchestratorFilter[];
  MaxResults?: number;
  NextToken?: string;
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
  Id?: string;
  ReleaseDate?: Date;
  Title?: string;
  Description?: string;
  ContentUrl?: string;
  Vendor?: string;
  ProductFamily?: string;
  Product?: string;
  Classification?: string;
  MsrcSeverity?: string;
  KbNumber?: string;
  MsrcNumber?: string;
  Language?: string;
  AdvisoryIds?: string[];
  BugzillaIds?: string[];
  CVEIds?: string[];
  Name?: string;
  Epoch?: number;
  Version?: string;
  Release?: string;
  Arch?: string;
  Severity?: string;
  Repository?: string;
}
export type PatchList = Patch[];
export interface DescribeAvailablePatchesResult {
  Patches?: Patch[];
  NextToken?: string;
}
export interface DescribeDocumentRequest {
  Name: string;
  DocumentVersion?: string;
  VersionName?: string;
}
export interface DescribeDocumentResult {
  Document?: DocumentDescription;
}
export type DocumentPermissionType = "Share" | (string & {});
export type DocumentPermissionMaxResults = number;
export interface DescribeDocumentPermissionRequest {
  Name: string;
  PermissionType: DocumentPermissionType;
  MaxResults?: number;
  NextToken?: string;
}
export type AccountId = string;
export type AccountIdList = string[];
export type SharedDocumentVersion = string;
export interface AccountSharingInfo {
  AccountId?: string;
  SharedDocumentVersion?: string;
}
export type AccountSharingInfoList = AccountSharingInfo[];
export interface DescribeDocumentPermissionResponse {
  AccountIds?: string[];
  AccountSharingInfoList?: AccountSharingInfo[];
  NextToken?: string;
}
export type EffectiveInstanceAssociationMaxResults = number;
export interface DescribeEffectiveInstanceAssociationsRequest {
  InstanceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface InstanceAssociation {
  AssociationId?: string;
  InstanceId?: string;
  Content?: string;
  AssociationVersion?: string;
}
export type InstanceAssociationList = InstanceAssociation[];
export interface DescribeEffectiveInstanceAssociationsResult {
  Associations?: InstanceAssociation[];
  NextToken?: string;
}
export interface DescribeEffectivePatchesForPatchBaselineRequest {
  BaselineId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type PatchDeploymentStatus =
  | "APPROVED"
  | "PENDING_APPROVAL"
  | "EXPLICIT_APPROVED"
  | "EXPLICIT_REJECTED"
  | (string & {});
export interface PatchStatus {
  DeploymentStatus?: PatchDeploymentStatus;
  ComplianceLevel?: PatchComplianceLevel;
  ApprovalDate?: Date;
}
export interface EffectivePatch {
  Patch?: Patch;
  PatchStatus?: PatchStatus;
}
export type EffectivePatchList = EffectivePatch[];
export interface DescribeEffectivePatchesForPatchBaselineResult {
  EffectivePatches?: EffectivePatch[];
  NextToken?: string;
}
export interface DescribeInstanceAssociationsStatusRequest {
  InstanceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type InstanceAssociationExecutionSummary = string;
export type AgentErrorCode = string;
export type Url = string;
export interface S3OutputUrl {
  OutputUrl?: string;
}
export interface InstanceAssociationOutputUrl {
  S3OutputUrl?: S3OutputUrl;
}
export interface InstanceAssociationStatusInfo {
  AssociationId?: string;
  Name?: string;
  DocumentVersion?: string;
  AssociationVersion?: string;
  InstanceId?: string;
  ExecutionDate?: Date;
  Status?: string;
  DetailedStatus?: string;
  ExecutionSummary?: string;
  ErrorCode?: string;
  OutputUrl?: InstanceAssociationOutputUrl;
  AssociationName?: string;
}
export type InstanceAssociationStatusInfos = InstanceAssociationStatusInfo[];
export interface DescribeInstanceAssociationsStatusResult {
  InstanceAssociationStatusInfos?: InstanceAssociationStatusInfo[];
  NextToken?: string;
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
export type InstanceInformationStringFilterList =
  InstanceInformationStringFilter[];
export type MaxResultsEC2Compatible = number;
export interface DescribeInstanceInformationRequest {
  InstanceInformationFilterList?: InstanceInformationFilter[];
  Filters?: InstanceInformationStringFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type PingStatus =
  | "Online"
  | "ConnectionLost"
  | "Inactive"
  | (string & {});
export type Version = string;
export type ResourceType = "ManagedInstance" | "EC2Instance" | (string & {});
export type IPAddress = string | redacted.Redacted<string>;
export type ComputerName = string;
export type InstanceAssociationStatusAggregatedCount = {
  [key: string]: number | undefined;
};
export interface InstanceAggregatedAssociationOverview {
  DetailedStatus?: string;
  InstanceAssociationStatusAggregatedCount?: {
    [key: string]: number | undefined;
  };
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
  InstanceId?: string;
  PingStatus?: PingStatus;
  LastPingDateTime?: Date;
  AgentVersion?: string;
  IsLatestVersion?: boolean;
  PlatformType?: PlatformType;
  PlatformName?: string;
  PlatformVersion?: string;
  ActivationId?: string;
  IamRole?: string;
  RegistrationDate?: Date;
  ResourceType?: ResourceType;
  Name?: string;
  IPAddress?: string | redacted.Redacted<string>;
  ComputerName?: string;
  AssociationStatus?: string;
  LastAssociationExecutionDate?: Date;
  LastSuccessfulAssociationExecutionDate?: Date;
  AssociationOverview?: InstanceAggregatedAssociationOverview;
  SourceId?: string;
  SourceType?: SourceType;
  SourceLocation?: string;
}
export type InstanceInformationList = InstanceInformation[];
export interface DescribeInstanceInformationResult {
  InstanceInformationList?: InstanceInformation[];
  NextToken?: string;
}
export type PatchComplianceMaxResults = number;
export interface DescribeInstancePatchesRequest {
  InstanceId: string;
  Filters?: PatchOrchestratorFilter[];
  NextToken?: string;
  MaxResults?: number;
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
  CVEIds?: string;
}
export type PatchComplianceDataList = PatchComplianceData[];
export interface DescribeInstancePatchesResult {
  Patches?: PatchComplianceData[];
  NextToken?: string;
}
export interface DescribeInstancePatchStatesRequest {
  InstanceIds: string[];
  NextToken?: string;
  MaxResults?: number;
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
  SnapshotId?: string;
  InstallOverrideList?: string;
  OwnerInformation?: string | redacted.Redacted<string>;
  InstalledCount?: number;
  InstalledOtherCount?: number;
  InstalledPendingRebootCount?: number;
  InstalledRejectedCount?: number;
  MissingCount?: number;
  FailedCount?: number;
  UnreportedNotApplicableCount?: number;
  NotApplicableCount?: number;
  AvailableSecurityUpdateCount?: number;
  OperationStartTime: Date;
  OperationEndTime: Date;
  Operation: PatchOperationType;
  LastNoRebootInstallOperationTime?: Date;
  RebootOption?: RebootOption;
  CriticalNonCompliantCount?: number;
  SecurityNonCompliantCount?: number;
  OtherNonCompliantCount?: number;
}
export type InstancePatchStateList = InstancePatchState[];
export interface DescribeInstancePatchStatesResult {
  InstancePatchStates?: InstancePatchState[];
  NextToken?: string;
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
  Filters?: InstancePatchStateFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export type InstancePatchStatesList = InstancePatchState[];
export interface DescribeInstancePatchStatesForPatchGroupResult {
  InstancePatchStates?: InstancePatchState[];
  NextToken?: string;
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
  Operator?: InstancePropertyFilterOperator;
}
export type InstancePropertyStringFilterList = InstancePropertyStringFilter[];
export type DescribeInstancePropertiesMaxResults = number;
export interface DescribeInstancePropertiesRequest {
  InstancePropertyFilterList?: InstancePropertyFilter[];
  FiltersWithOperator?: InstancePropertyStringFilter[];
  MaxResults?: number;
  NextToken?: string;
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
  Name?: string;
  InstanceId?: string;
  InstanceType?: string;
  InstanceRole?: string;
  KeyName?: string;
  InstanceState?: string;
  Architecture?: string;
  IPAddress?: string | redacted.Redacted<string>;
  LaunchTime?: Date;
  PingStatus?: PingStatus;
  LastPingDateTime?: Date;
  AgentVersion?: string;
  PlatformType?: PlatformType;
  PlatformName?: string;
  PlatformVersion?: string;
  ActivationId?: string;
  IamRole?: string;
  RegistrationDate?: Date;
  ResourceType?: string;
  ComputerName?: string;
  AssociationStatus?: string;
  LastAssociationExecutionDate?: Date;
  LastSuccessfulAssociationExecutionDate?: Date;
  AssociationOverview?: InstanceAggregatedAssociationOverview;
  SourceId?: string;
  SourceType?: SourceType;
  SourceLocation?: string;
  AvailabilityZone?: string;
}
export type InstanceProperties = InstanceProperty[];
export interface DescribeInstancePropertiesResult {
  InstanceProperties?: InstanceProperty[];
  NextToken?: string;
}
export interface DescribeInventoryDeletionsRequest {
  DeletionId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type InventoryDeletionStartTime = Date;
export type InventoryDeletionStatus = "InProgress" | "Complete" | (string & {});
export type InventoryDeletionLastStatusMessage = string;
export type InventoryDeletionLastStatusUpdateTime = Date;
export interface InventoryDeletionStatusItem {
  DeletionId?: string;
  TypeName?: string;
  DeletionStartTime?: Date;
  LastStatus?: InventoryDeletionStatus;
  LastStatusMessage?: string;
  DeletionSummary?: InventoryDeletionSummary;
  LastStatusUpdateTime?: Date;
}
export type InventoryDeletionsList = InventoryDeletionStatusItem[];
export interface DescribeInventoryDeletionsResult {
  InventoryDeletions?: InventoryDeletionStatusItem[];
  NextToken?: string;
}
export type MaintenanceWindowFilterKey = string;
export type MaintenanceWindowFilterValue = string;
export type MaintenanceWindowFilterValues = string[];
export interface MaintenanceWindowFilter {
  Key?: string;
  Values?: string[];
}
export type MaintenanceWindowFilterList = MaintenanceWindowFilter[];
export type MaintenanceWindowMaxResults = number;
export interface DescribeMaintenanceWindowExecutionsRequest {
  WindowId: string;
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
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
  WindowId?: string;
  WindowExecutionId?: string;
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
}
export type MaintenanceWindowExecutionList = MaintenanceWindowExecution[];
export interface DescribeMaintenanceWindowExecutionsResult {
  WindowExecutions?: MaintenanceWindowExecution[];
  NextToken?: string;
}
export type MaintenanceWindowExecutionTaskId = string;
export interface DescribeMaintenanceWindowExecutionTaskInvocationsRequest {
  WindowExecutionId: string;
  TaskId: string;
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type MaintenanceWindowExecutionTaskInvocationId = string;
export type MaintenanceWindowExecutionTaskExecutionId = string;
export type MaintenanceWindowTaskType =
  | "RUN_COMMAND"
  | "AUTOMATION"
  | "STEP_FUNCTIONS"
  | "LAMBDA"
  | (string & {});
export type MaintenanceWindowExecutionTaskInvocationParameters =
  | string
  | redacted.Redacted<string>;
export type MaintenanceWindowTaskTargetId = string;
export interface MaintenanceWindowExecutionTaskInvocationIdentity {
  WindowExecutionId?: string;
  TaskExecutionId?: string;
  InvocationId?: string;
  ExecutionId?: string;
  TaskType?: MaintenanceWindowTaskType;
  Parameters?: string | redacted.Redacted<string>;
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
  OwnerInformation?: string | redacted.Redacted<string>;
  WindowTargetId?: string;
}
export type MaintenanceWindowExecutionTaskInvocationIdentityList =
  MaintenanceWindowExecutionTaskInvocationIdentity[];
export interface DescribeMaintenanceWindowExecutionTaskInvocationsResult {
  WindowExecutionTaskInvocationIdentities?: MaintenanceWindowExecutionTaskInvocationIdentity[];
  NextToken?: string;
}
export interface DescribeMaintenanceWindowExecutionTasksRequest {
  WindowExecutionId: string;
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type MaintenanceWindowTaskArn = string;
export interface MaintenanceWindowExecutionTaskIdentity {
  WindowExecutionId?: string;
  TaskExecutionId?: string;
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
  TaskArn?: string;
  TaskType?: MaintenanceWindowTaskType;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
}
export type MaintenanceWindowExecutionTaskIdentityList =
  MaintenanceWindowExecutionTaskIdentity[];
export interface DescribeMaintenanceWindowExecutionTasksResult {
  WindowExecutionTaskIdentities?: MaintenanceWindowExecutionTaskIdentity[];
  NextToken?: string;
}
export interface DescribeMaintenanceWindowsRequest {
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type MaintenanceWindowEnabled = boolean;
export interface MaintenanceWindowIdentity {
  WindowId?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  Enabled?: boolean;
  Duration?: number;
  Cutoff?: number;
  Schedule?: string;
  ScheduleTimezone?: string;
  ScheduleOffset?: number;
  EndDate?: string;
  StartDate?: string;
  NextExecutionTime?: string;
}
export type MaintenanceWindowIdentityList = MaintenanceWindowIdentity[];
export interface DescribeMaintenanceWindowsResult {
  WindowIdentities?: MaintenanceWindowIdentity[];
  NextToken?: string;
}
export type MaintenanceWindowResourceType =
  | "INSTANCE"
  | "RESOURCE_GROUP"
  | (string & {});
export type MaintenanceWindowSearchMaxResults = number;
export interface DescribeMaintenanceWindowScheduleRequest {
  WindowId?: string;
  Targets?: Target[];
  ResourceType?: MaintenanceWindowResourceType;
  Filters?: PatchOrchestratorFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export interface ScheduledWindowExecution {
  WindowId?: string;
  Name?: string;
  ExecutionTime?: string;
}
export type ScheduledWindowExecutionList = ScheduledWindowExecution[];
export interface DescribeMaintenanceWindowScheduleResult {
  ScheduledWindowExecutions?: ScheduledWindowExecution[];
  NextToken?: string;
}
export interface DescribeMaintenanceWindowsForTargetRequest {
  Targets: Target[];
  ResourceType: MaintenanceWindowResourceType;
  MaxResults?: number;
  NextToken?: string;
}
export interface MaintenanceWindowIdentityForTarget {
  WindowId?: string;
  Name?: string;
}
export type MaintenanceWindowsForTargetList =
  MaintenanceWindowIdentityForTarget[];
export interface DescribeMaintenanceWindowsForTargetResult {
  WindowIdentities?: MaintenanceWindowIdentityForTarget[];
  NextToken?: string;
}
export interface DescribeMaintenanceWindowTargetsRequest {
  WindowId: string;
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export interface MaintenanceWindowTarget {
  WindowId?: string;
  WindowTargetId?: string;
  ResourceType?: MaintenanceWindowResourceType;
  Targets?: Target[];
  OwnerInformation?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
}
export type MaintenanceWindowTargetList = MaintenanceWindowTarget[];
export interface DescribeMaintenanceWindowTargetsResult {
  Targets?: MaintenanceWindowTarget[];
  NextToken?: string;
}
export interface DescribeMaintenanceWindowTasksRequest {
  WindowId: string;
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type MaintenanceWindowTaskParameterName = string;
export type MaintenanceWindowTaskParameterValue =
  | string
  | redacted.Redacted<string>;
export type MaintenanceWindowTaskParameterValueList = (
  | string
  | redacted.Redacted<string>
)[];
export interface MaintenanceWindowTaskParameterValueExpression {
  Values?: (string | redacted.Redacted<string>)[];
}
export type MaintenanceWindowTaskParameters = {
  [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
};
export type MaintenanceWindowTaskPriority = number;
export interface LoggingInfo {
  S3BucketName: string;
  S3KeyPrefix?: string;
  S3Region: string;
}
export type ServiceRole = string;
export type MaintenanceWindowTaskCutoffBehavior =
  | "CONTINUE_TASK"
  | "CANCEL_TASK"
  | (string & {});
export interface MaintenanceWindowTask {
  WindowId?: string;
  WindowTaskId?: string;
  TaskArn?: string;
  Type?: MaintenanceWindowTaskType;
  Targets?: Target[];
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  };
  Priority?: number;
  LoggingInfo?: LoggingInfo;
  ServiceRoleArn?: string;
  MaxConcurrency?: string;
  MaxErrors?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior;
  AlarmConfiguration?: AlarmConfiguration;
}
export type MaintenanceWindowTaskList = MaintenanceWindowTask[];
export interface DescribeMaintenanceWindowTasksResult {
  Tasks?: MaintenanceWindowTask[];
  NextToken?: string;
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
  OpsItemFilters?: OpsItemFilter[];
  MaxResults?: number;
  NextToken?: string;
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
  CreatedBy?: string;
  CreatedTime?: Date;
  LastModifiedBy?: string;
  LastModifiedTime?: Date;
  Priority?: number;
  Source?: string;
  Status?: OpsItemStatus;
  OpsItemId?: string;
  Title?: string;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined };
  Category?: string;
  Severity?: string;
  OpsItemType?: string;
  ActualStartTime?: Date;
  ActualEndTime?: Date;
  PlannedStartTime?: Date;
  PlannedEndTime?: Date;
}
export type OpsItemSummaries = OpsItemSummary[];
export interface DescribeOpsItemsResponse {
  NextToken?: string;
  OpsItemSummaries?: OpsItemSummary[];
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
  Option?: string;
  Values?: string[];
}
export type ParameterStringFilterList = ParameterStringFilter[];
export interface DescribeParametersRequest {
  Filters?: ParametersFilter[];
  ParameterFilters?: ParameterStringFilter[];
  MaxResults?: number;
  NextToken?: string;
  Shared?: boolean;
}
export type ParameterType =
  | "String"
  | "StringList"
  | "SecureString"
  | (string & {});
export type ParameterKeyId = string;
export type ParameterDescription = string;
export type AllowedPattern = string;
export type PSParameterVersion = number;
export type ParameterTier =
  | "Standard"
  | "Advanced"
  | "Intelligent-Tiering"
  | (string & {});
export interface ParameterInlinePolicy {
  PolicyText?: string;
  PolicyType?: string;
  PolicyStatus?: string;
}
export type ParameterPolicyList = ParameterInlinePolicy[];
export type ParameterDataType = string;
export interface ParameterMetadata {
  Name?: string;
  ARN?: string;
  Type?: ParameterType;
  KeyId?: string;
  LastModifiedDate?: Date;
  LastModifiedUser?: string;
  Description?: string;
  AllowedPattern?: string;
  Version?: number;
  Tier?: ParameterTier;
  Policies?: ParameterInlinePolicy[];
  DataType?: string;
}
export type ParameterMetadataList = ParameterMetadata[];
export interface DescribeParametersResult {
  Parameters?: ParameterMetadata[];
  NextToken?: string;
}
export interface DescribePatchBaselinesRequest {
  Filters?: PatchOrchestratorFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type DefaultBaseline = boolean;
export interface PatchBaselineIdentity {
  BaselineId?: string;
  BaselineName?: string;
  OperatingSystem?: OperatingSystem;
  BaselineDescription?: string;
  DefaultBaseline?: boolean;
}
export type PatchBaselineIdentityList = PatchBaselineIdentity[];
export interface DescribePatchBaselinesResult {
  BaselineIdentities?: PatchBaselineIdentity[];
  NextToken?: string;
}
export interface DescribePatchGroupsRequest {
  MaxResults?: number;
  Filters?: PatchOrchestratorFilter[];
  NextToken?: string;
}
export interface PatchGroupPatchBaselineMapping {
  PatchGroup?: string;
  BaselineIdentity?: PatchBaselineIdentity;
}
export type PatchGroupPatchBaselineMappingList =
  PatchGroupPatchBaselineMapping[];
export interface DescribePatchGroupsResult {
  Mappings?: PatchGroupPatchBaselineMapping[];
  NextToken?: string;
}
export interface DescribePatchGroupStateRequest {
  PatchGroup: string;
}
export type InstancesCount = number;
export interface DescribePatchGroupStateResult {
  Instances?: number;
  InstancesWithInstalledPatches?: number;
  InstancesWithInstalledOtherPatches?: number;
  InstancesWithInstalledPendingRebootPatches?: number;
  InstancesWithInstalledRejectedPatches?: number;
  InstancesWithMissingPatches?: number;
  InstancesWithFailedPatches?: number;
  InstancesWithNotApplicablePatches?: number;
  InstancesWithUnreportedNotApplicablePatches?: number;
  InstancesWithCriticalNonCompliantPatches?: number;
  InstancesWithSecurityNonCompliantPatches?: number;
  InstancesWithOtherNonCompliantPatches?: number;
  InstancesWithAvailableSecurityUpdates?: number;
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
  PatchSet?: PatchSet;
  MaxResults?: number;
  NextToken?: string;
}
export type AttributeName = string;
export type AttributeValue = string;
export type PatchPropertyEntry = { [key: string]: string | undefined };
export type PatchPropertiesList = { [key: string]: string | undefined }[];
export interface DescribePatchPropertiesResult {
  Properties?: { [key: string]: string | undefined }[];
  NextToken?: string;
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
  MaxResults?: number;
  NextToken?: string;
  Filters?: SessionFilter[];
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
  S3OutputUrl?: string;
  CloudWatchOutputUrl?: string;
}
export type MaxSessionDuration = string;
export type AccessType = "Standard" | "JustInTime" | (string & {});
export interface Session {
  SessionId?: string;
  Target?: string;
  Status?: SessionStatus;
  StartDate?: Date;
  EndDate?: Date;
  DocumentName?: string;
  Owner?: string;
  Reason?: string;
  Details?: string;
  OutputUrl?: SessionManagerOutputUrl;
  MaxSessionDuration?: string;
  AccessType?: AccessType;
}
export type SessionList = Session[];
export interface DescribeSessionsResponse {
  Sessions?: Session[];
  NextToken?: string;
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
  Credentials?: Credentials;
  AccessRequestStatus?: AccessRequestStatus;
}
export interface GetAutomationExecutionRequest {
  AutomationExecutionId: string;
}
export interface ProgressCounters {
  TotalSteps?: number;
  SuccessSteps?: number;
  FailedSteps?: number;
  CancelledSteps?: number;
  TimedOutSteps?: number;
}
export interface AutomationExecution {
  AutomationExecutionId?: string;
  DocumentName?: string;
  DocumentVersion?: string;
  ExecutionStartTime?: Date;
  ExecutionEndTime?: Date;
  AutomationExecutionStatus?: AutomationExecutionStatus;
  StepExecutions?: StepExecution[];
  StepExecutionsTruncated?: boolean;
  Parameters?: { [key: string]: string[] | undefined };
  Outputs?: { [key: string]: string[] | undefined };
  FailureMessage?: string;
  WarningMessage?: string;
  Mode?: ExecutionMode;
  ParentAutomationExecutionId?: string;
  ExecutedBy?: string;
  CurrentStepName?: string;
  CurrentAction?: string;
  TargetParameterName?: string;
  Targets?: Target[];
  TargetMaps?: { [key: string]: string[] | undefined }[];
  ResolvedTargets?: ResolvedTargets;
  MaxConcurrency?: string;
  MaxErrors?: string;
  Target?: string;
  TargetLocations?: TargetLocation[];
  ProgressCounters?: ProgressCounters;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
  TargetLocationsURL?: string;
  AutomationSubtype?: AutomationSubtype;
  ScheduledTime?: Date;
  Runbooks?: Runbook[];
  OpsItemId?: string;
  AssociationId?: string;
  ChangeRequestName?: string;
  Variables?: { [key: string]: string[] | undefined };
}
export interface GetAutomationExecutionResult {
  AutomationExecution?: AutomationExecution;
}
export type ISO8601String = string;
export interface GetCalendarStateRequest {
  CalendarNames: string[];
  AtTime?: string;
}
export type CalendarState = "OPEN" | "CLOSED" | (string & {});
export interface GetCalendarStateResponse {
  State?: CalendarState;
  AtTime?: string;
  NextTransitionTime?: string;
}
export interface GetCloudConnectorRequest {
  CloudConnectorId: string;
}
export type CloudConnectorArn = string;
export interface GetCloudConnectorResult {
  CloudConnectorArn?: string;
  DisplayName?: string;
  Description?: string;
  RoleArn?: string;
  Configuration?: CloudConnectorConfiguration;
  ConfigConnectorArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type CommandPluginName = string;
export interface GetCommandInvocationRequest {
  CommandId: string;
  InstanceId: string;
  PluginName?: string;
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
  CloudWatchLogGroupName?: string;
  CloudWatchOutputEnabled?: boolean;
}
export interface GetCommandInvocationResult {
  CommandId?: string;
  InstanceId?: string;
  Comment?: string;
  DocumentName?: string;
  DocumentVersion?: string;
  PluginName?: string;
  ResponseCode?: number;
  ExecutionStartDateTime?: string;
  ExecutionElapsedTime?: string;
  ExecutionEndDateTime?: string;
  Status?: CommandInvocationStatus;
  StatusDetails?: string;
  StandardOutputContent?: string;
  StandardOutputUrl?: string;
  StandardErrorContent?: string;
  StandardErrorUrl?: string;
  CloudWatchOutputConfig?: CloudWatchOutputConfig;
}
export interface GetConnectionStatusRequest {
  Target: string;
}
export type ConnectionStatus = "connected" | "notconnected" | (string & {});
export interface GetConnectionStatusResponse {
  Target?: string;
  Status?: ConnectionStatus;
}
export interface GetDefaultPatchBaselineRequest {
  OperatingSystem?: OperatingSystem;
}
export interface GetDefaultPatchBaselineResult {
  BaselineId?: string;
  OperatingSystem?: OperatingSystem;
}
export interface BaselineOverride {
  OperatingSystem?: OperatingSystem;
  GlobalFilters?: PatchFilterGroup;
  ApprovalRules?: PatchRuleGroup;
  ApprovedPatches?: string[];
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel;
  RejectedPatches?: string[];
  RejectedPatchesAction?: PatchAction;
  ApprovedPatchesEnableNonSecurity?: boolean;
  Sources?: PatchSource[];
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus;
}
export interface GetDeployablePatchSnapshotForInstanceRequest {
  InstanceId: string;
  SnapshotId: string;
  BaselineOverride?: BaselineOverride;
  UseS3DualStackEndpoint?: boolean;
}
export type SnapshotDownloadUrl = string;
export type Product = string;
export interface GetDeployablePatchSnapshotForInstanceResult {
  InstanceId?: string;
  SnapshotId?: string;
  SnapshotDownloadUrl?: string;
  Product?: string;
}
export interface GetDocumentRequest {
  Name: string;
  VersionName?: string;
  DocumentVersion?: string;
  DocumentFormat?: DocumentFormat;
}
export type ContentLength = number;
export type AttachmentHash = string;
export type AttachmentHashType = "Sha256" | (string & {});
export type AttachmentUrl = string;
export interface AttachmentContent {
  Name?: string;
  Size?: number;
  Hash?: string;
  HashType?: AttachmentHashType;
  Url?: string;
}
export type AttachmentContentList = AttachmentContent[];
export interface GetDocumentResult {
  Name?: string;
  CreatedDate?: Date;
  DisplayName?: string;
  VersionName?: string;
  DocumentVersion?: string;
  Status?: DocumentStatus;
  StatusInformation?: string;
  Content?: string;
  DocumentType?: DocumentType;
  DocumentFormat?: DocumentFormat;
  Requires?: DocumentRequires[];
  AttachmentsContent?: AttachmentContent[];
  ReviewStatus?: ReviewStatus;
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
export type ImpactType =
  | "Mutating"
  | "NonMutating"
  | "Undetermined"
  | (string & {});
export type StepPreviewMap = { [key in ImpactType]?: number };
export type RegionList = string[];
export interface TargetPreview {
  Count?: number;
  TargetType?: string;
}
export type TargetPreviewList = TargetPreview[];
export interface AutomationExecutionPreview {
  StepPreviews?: { [key: string]: number | undefined };
  Regions?: string[];
  TargetPreviews?: TargetPreview[];
  TotalAccounts?: number;
}
export type ExecutionPreview = { Automation: AutomationExecutionPreview };
export interface GetExecutionPreviewResponse {
  ExecutionPreviewId?: string;
  EndedAt?: Date;
  Status?: ExecutionPreviewStatus;
  StatusMessage?: string;
  ExecutionPreview?: ExecutionPreview;
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
  Type?: InventoryQueryOperatorType;
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
  Expression?: string;
  Aggregators?: InventoryAggregator[];
  Groups?: InventoryGroup[];
}
export type InventoryAggregatorList = InventoryAggregator[];
export interface ResultAttribute {
  TypeName: string;
}
export type ResultAttributeList = ResultAttribute[];
export interface GetInventoryRequest {
  Filters?: InventoryFilter[];
  Aggregators?: InventoryAggregator[];
  ResultAttributes?: ResultAttribute[];
  NextToken?: string;
  MaxResults?: number;
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
  CaptureTime?: string;
  ContentHash?: string;
  Content: { [key: string]: string | undefined }[];
}
export type InventoryResultItemMap = {
  [key: string]: InventoryResultItem | undefined;
};
export interface InventoryResultEntity {
  Id?: string;
  Data?: { [key: string]: InventoryResultItem | undefined };
}
export type InventoryResultEntityList = InventoryResultEntity[];
export interface GetInventoryResult {
  Entities?: InventoryResultEntity[];
  NextToken?: string;
}
export type InventoryItemTypeNameFilter = string;
export type GetInventorySchemaMaxResults = number;
export type AggregatorSchemaOnly = boolean;
export type IsSubTypeSchema = boolean;
export interface GetInventorySchemaRequest {
  TypeName?: string;
  NextToken?: string;
  MaxResults?: number;
  Aggregator?: boolean;
  SubType?: boolean;
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
  Version?: string;
  Attributes: InventoryItemAttribute[];
  DisplayName?: string;
}
export type InventoryItemSchemaResultList = InventoryItemSchema[];
export interface GetInventorySchemaResult {
  Schemas?: InventoryItemSchema[];
  NextToken?: string;
}
export interface GetMaintenanceWindowRequest {
  WindowId: string;
}
export interface GetMaintenanceWindowResult {
  WindowId?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  StartDate?: string;
  EndDate?: string;
  Schedule?: string;
  ScheduleTimezone?: string;
  ScheduleOffset?: number;
  NextExecutionTime?: string;
  Duration?: number;
  Cutoff?: number;
  AllowUnassociatedTargets?: boolean;
  Enabled?: boolean;
  CreatedDate?: Date;
  ModifiedDate?: Date;
}
export interface GetMaintenanceWindowExecutionRequest {
  WindowExecutionId: string;
}
export type MaintenanceWindowExecutionTaskIdList = string[];
export interface GetMaintenanceWindowExecutionResult {
  WindowExecutionId?: string;
  TaskIds?: string[];
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
}
export interface GetMaintenanceWindowExecutionTaskRequest {
  WindowExecutionId: string;
  TaskId: string;
}
export type MaintenanceWindowTaskParametersList = {
  [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
}[];
export interface GetMaintenanceWindowExecutionTaskResult {
  WindowExecutionId?: string;
  TaskExecutionId?: string;
  TaskArn?: string;
  ServiceRole?: string;
  Type?: MaintenanceWindowTaskType;
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  }[];
  Priority?: number;
  MaxConcurrency?: string;
  MaxErrors?: string;
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
}
export interface GetMaintenanceWindowExecutionTaskInvocationRequest {
  WindowExecutionId: string;
  TaskId: string;
  InvocationId: string;
}
export interface GetMaintenanceWindowExecutionTaskInvocationResult {
  WindowExecutionId?: string;
  TaskExecutionId?: string;
  InvocationId?: string;
  ExecutionId?: string;
  TaskType?: MaintenanceWindowTaskType;
  Parameters?: string | redacted.Redacted<string>;
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
  OwnerInformation?: string | redacted.Redacted<string>;
  WindowTargetId?: string;
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
  NotificationArn?: string;
  NotificationEvents?: NotificationEvent[];
  NotificationType?: NotificationType;
}
export type TimeoutSeconds = number;
export interface MaintenanceWindowRunCommandParameters {
  Comment?: string;
  CloudWatchOutputConfig?: CloudWatchOutputConfig;
  DocumentHash?: string;
  DocumentHashType?: DocumentHashType;
  DocumentVersion?: string;
  NotificationConfig?: NotificationConfig;
  OutputS3BucketName?: string;
  OutputS3KeyPrefix?: string;
  Parameters?: { [key: string]: string[] | undefined };
  ServiceRoleArn?: string;
  TimeoutSeconds?: number;
}
export interface MaintenanceWindowAutomationParameters {
  DocumentVersion?: string;
  Parameters?: { [key: string]: string[] | undefined };
}
export type MaintenanceWindowStepFunctionsInput =
  | string
  | redacted.Redacted<string>;
export type MaintenanceWindowStepFunctionsName = string;
export interface MaintenanceWindowStepFunctionsParameters {
  Input?: string | redacted.Redacted<string>;
  Name?: string;
}
export type MaintenanceWindowLambdaClientContext = string;
export type MaintenanceWindowLambdaQualifier = string;
export type MaintenanceWindowLambdaPayload =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
export interface MaintenanceWindowLambdaParameters {
  ClientContext?: string;
  Qualifier?: string;
  Payload?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface MaintenanceWindowTaskInvocationParameters {
  RunCommand?: MaintenanceWindowRunCommandParameters;
  Automation?: MaintenanceWindowAutomationParameters;
  StepFunctions?: MaintenanceWindowStepFunctionsParameters;
  Lambda?: MaintenanceWindowLambdaParameters;
}
export interface GetMaintenanceWindowTaskResult {
  WindowId?: string;
  WindowTaskId?: string;
  Targets?: Target[];
  TaskArn?: string;
  ServiceRoleArn?: string;
  TaskType?: MaintenanceWindowTaskType;
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  };
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters;
  Priority?: number;
  MaxConcurrency?: string;
  MaxErrors?: string;
  LoggingInfo?: LoggingInfo;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior;
  AlarmConfiguration?: AlarmConfiguration;
}
export interface GetOpsItemRequest {
  OpsItemId: string;
  OpsItemArn?: string;
}
export interface OpsItem {
  CreatedBy?: string;
  OpsItemType?: string;
  CreatedTime?: Date;
  Description?: string;
  LastModifiedBy?: string;
  LastModifiedTime?: Date;
  Notifications?: OpsItemNotification[];
  Priority?: number;
  RelatedOpsItems?: RelatedOpsItem[];
  Status?: OpsItemStatus;
  OpsItemId?: string;
  Version?: string;
  Title?: string;
  Source?: string;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined };
  Category?: string;
  Severity?: string;
  ActualStartTime?: Date;
  ActualEndTime?: Date;
  PlannedStartTime?: Date;
  PlannedEndTime?: Date;
  OpsItemArn?: string;
}
export interface GetOpsItemResponse {
  OpsItem?: OpsItem;
}
export type GetOpsMetadataMaxResults = number;
export interface GetOpsMetadataRequest {
  OpsMetadataArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface GetOpsMetadataResult {
  ResourceId?: string;
  Metadata?: { [key: string]: MetadataValue | undefined };
  NextToken?: string;
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
  Type?: OpsFilterOperatorType;
}
export type OpsFilterList = OpsFilter[];
export type OpsAggregatorType = string;
export type OpsDataTypeName = string;
export type OpsDataAttributeName = string;
export type OpsAggregatorValueKey = string;
export type OpsAggregatorValue = string;
export type OpsAggregatorValueMap = { [key: string]: string | undefined };
export interface OpsAggregator {
  AggregatorType?: string;
  TypeName?: string;
  AttributeName?: string;
  Values?: { [key: string]: string | undefined };
  Filters?: OpsFilter[];
  Aggregators?: OpsAggregator[];
}
export type OpsAggregatorList = OpsAggregator[];
export interface OpsResultAttribute {
  TypeName: string;
}
export type OpsResultAttributeList = OpsResultAttribute[];
export interface GetOpsSummaryRequest {
  SyncName?: string;
  Filters?: OpsFilter[];
  Aggregators?: OpsAggregator[];
  ResultAttributes?: OpsResultAttribute[];
  NextToken?: string;
  MaxResults?: number;
}
export type OpsEntityId = string;
export type OpsEntityItemKey = string;
export type OpsEntityItemCaptureTime = string;
export type OpsEntityItemEntry = { [key: string]: string | undefined };
export type OpsEntityItemEntryList = { [key: string]: string | undefined }[];
export interface OpsEntityItem {
  CaptureTime?: string;
  Content?: { [key: string]: string | undefined }[];
}
export type OpsEntityItemMap = { [key: string]: OpsEntityItem | undefined };
export interface OpsEntity {
  Id?: string;
  Data?: { [key: string]: OpsEntityItem | undefined };
}
export type OpsEntityList = OpsEntity[];
export interface GetOpsSummaryResult {
  Entities?: OpsEntity[];
  NextToken?: string;
}
export interface GetParameterRequest {
  Name: string;
  WithDecryption?: boolean;
}
export type PSParameterValue = string | redacted.Redacted<string>;
export type PSParameterSelector = string;
export interface Parameter {
  Name?: string;
  Type?: ParameterType;
  Value?: string | redacted.Redacted<string>;
  Version?: number;
  Selector?: string;
  SourceResult?: string;
  LastModifiedDate?: Date;
  ARN?: string;
  DataType?: string;
}
export interface GetParameterResult {
  Parameter?: Parameter;
}
export interface GetParameterHistoryRequest {
  Name: string;
  WithDecryption?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export type ParameterLabel = string;
export type ParameterLabelList = string[];
export interface ParameterHistory {
  Name?: string;
  Type?: ParameterType;
  KeyId?: string;
  LastModifiedDate?: Date;
  LastModifiedUser?: string;
  Description?: string;
  Value?: string | redacted.Redacted<string>;
  AllowedPattern?: string;
  Version?: number;
  Labels?: string[];
  Tier?: ParameterTier;
  Policies?: ParameterInlinePolicy[];
  DataType?: string;
}
export type ParameterHistoryList = ParameterHistory[];
export interface GetParameterHistoryResult {
  Parameters?: ParameterHistory[];
  NextToken?: string;
}
export interface GetParametersRequest {
  Names: string[];
  WithDecryption?: boolean;
}
export type ParameterList = Parameter[];
export interface GetParametersResult {
  Parameters?: Parameter[];
  InvalidParameters?: string[];
}
export type GetParametersByPathMaxResults = number;
export interface GetParametersByPathRequest {
  Path: string;
  Recursive?: boolean;
  ParameterFilters?: ParameterStringFilter[];
  WithDecryption?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export interface GetParametersByPathResult {
  Parameters?: Parameter[];
  NextToken?: string;
}
export interface GetPatchBaselineRequest {
  BaselineId: string;
}
export type PatchGroupList = string[];
export interface GetPatchBaselineResult {
  BaselineId?: string;
  Name?: string;
  OperatingSystem?: OperatingSystem;
  GlobalFilters?: PatchFilterGroup;
  ApprovalRules?: PatchRuleGroup;
  ApprovedPatches?: string[];
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel;
  ApprovedPatchesEnableNonSecurity?: boolean;
  RejectedPatches?: string[];
  RejectedPatchesAction?: PatchAction;
  PatchGroups?: string[];
  CreatedDate?: Date;
  ModifiedDate?: Date;
  Description?: string;
  Sources?: PatchSource[];
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus;
}
export interface GetPatchBaselineForPatchGroupRequest {
  PatchGroup: string;
  OperatingSystem?: OperatingSystem;
}
export interface GetPatchBaselineForPatchGroupResult {
  BaselineId?: string;
  PatchGroup?: string;
  OperatingSystem?: OperatingSystem;
}
export type ResourcePolicyMaxResults = number;
export interface GetResourcePoliciesRequest {
  ResourceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export type Policy = string;
export interface GetResourcePoliciesResponseEntry {
  PolicyId?: string;
  PolicyHash?: string;
  Policy?: string;
}
export type GetResourcePoliciesResponseEntries =
  GetResourcePoliciesResponseEntry[];
export interface GetResourcePoliciesResponse {
  NextToken?: string;
  Policies?: GetResourcePoliciesResponseEntry[];
}
export type ServiceSettingId = string;
export interface GetServiceSettingRequest {
  SettingId: string;
}
export type ServiceSettingValue = string;
export interface ServiceSetting {
  SettingId?: string;
  SettingValue?: string;
  LastModifiedDate?: Date;
  LastModifiedUser?: string;
  ARN?: string;
  Status?: string;
}
export interface GetServiceSettingResult {
  ServiceSetting?: ServiceSetting;
}
export interface LabelParameterVersionRequest {
  Name: string;
  ParameterVersion?: number;
  Labels: string[];
}
export interface LabelParameterVersionResult {
  InvalidLabels?: string[];
  ParameterVersion?: number;
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
  AssociationFilterList?: AssociationFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export interface Association {
  Name?: string;
  InstanceId?: string;
  AssociationId?: string;
  AssociationVersion?: string;
  DocumentVersion?: string;
  Targets?: Target[];
  LastExecutionDate?: Date;
  Overview?: AssociationOverview;
  ScheduleExpression?: string;
  AssociationName?: string;
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
}
export type AssociationList = Association[];
export interface ListAssociationsResult {
  Associations?: Association[];
  NextToken?: string;
}
export interface ListAssociationVersionsRequest {
  AssociationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AssociationVersionInfo {
  AssociationId?: string;
  AssociationVersion?: string;
  CreatedDate?: Date;
  Name?: string;
  DocumentVersion?: string;
  Parameters?: { [key: string]: string[] | undefined };
  Targets?: Target[];
  ScheduleExpression?: string;
  OutputLocation?: InstanceAssociationOutputLocation;
  AssociationName?: string;
  MaxErrors?: string;
  MaxConcurrency?: string;
  ComplianceSeverity?: AssociationComplianceSeverity;
  SyncCompliance?: AssociationSyncCompliance;
  ApplyOnlyAtCronInterval?: boolean;
  CalendarNames?: string[];
  TargetLocations?: TargetLocation[];
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
  AssociationDispatchAssumeRole?: string;
}
export type AssociationVersionList = AssociationVersionInfo[];
export interface ListAssociationVersionsResult {
  AssociationVersions?: AssociationVersionInfo[];
  NextToken?: string;
}
export type CloudConnectorMaxResults = number;
export type CloudConnectorFilterKey =
  | "SubscriptionId"
  | "TenantId"
  | (string & {});
export type CloudConnectorFilterValue = string;
export type CloudConnectorFilterValues = string[];
export interface CloudConnectorFilter {
  FilterKey?: CloudConnectorFilterKey;
  FilterValues?: string[];
}
export type CloudConnectorFilterList = CloudConnectorFilter[];
export interface ListCloudConnectorsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: CloudConnectorFilter[];
}
export interface CloudConnectorSummary {
  CloudConnectorId?: string;
  DisplayName?: string;
  Description?: string;
  RoleArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type CloudConnectorSummaryList = CloudConnectorSummary[];
export interface ListCloudConnectorsResult {
  CloudConnectors?: CloudConnectorSummary[];
  NextToken?: string;
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
  CommandId?: string;
  InstanceId?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: CommandFilter[];
  Details?: boolean;
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
  Name?: string;
  Status?: CommandPluginStatus;
  StatusDetails?: string;
  ResponseCode?: number;
  ResponseStartDateTime?: Date;
  ResponseFinishDateTime?: Date;
  Output?: string;
  StandardOutputUrl?: string;
  StandardErrorUrl?: string;
  OutputS3Region?: string;
  OutputS3BucketName?: string;
  OutputS3KeyPrefix?: string;
}
export type CommandPluginList = CommandPlugin[];
export interface CommandInvocation {
  CommandId?: string;
  InstanceId?: string;
  InstanceName?: string;
  Comment?: string;
  DocumentName?: string;
  DocumentVersion?: string;
  RequestedDateTime?: Date;
  Status?: CommandInvocationStatus;
  StatusDetails?: string;
  TraceOutput?: string;
  StandardOutputUrl?: string;
  StandardErrorUrl?: string;
  CommandPlugins?: CommandPlugin[];
  ServiceRole?: string;
  NotificationConfig?: NotificationConfig;
  CloudWatchOutputConfig?: CloudWatchOutputConfig;
}
export type CommandInvocationList = CommandInvocation[];
export interface ListCommandInvocationsResult {
  CommandInvocations?: CommandInvocation[];
  NextToken?: string;
}
export interface ListCommandsRequest {
  CommandId?: string;
  InstanceId?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: CommandFilter[];
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
  CommandId?: string;
  DocumentName?: string;
  DocumentVersion?: string;
  Comment?: string;
  ExpiresAfter?: Date;
  Parameters?: { [key: string]: string[] | undefined };
  InstanceIds?: string[];
  Targets?: Target[];
  RequestedDateTime?: Date;
  Status?: CommandStatus;
  StatusDetails?: string;
  OutputS3Region?: string;
  OutputS3BucketName?: string;
  OutputS3KeyPrefix?: string;
  MaxConcurrency?: string;
  MaxErrors?: string;
  TargetCount?: number;
  CompletedCount?: number;
  ErrorCount?: number;
  DeliveryTimedOutCount?: number;
  ServiceRole?: string;
  NotificationConfig?: NotificationConfig;
  CloudWatchOutputConfig?: CloudWatchOutputConfig;
  TimeoutSeconds?: number;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
}
export type CommandList = Command[];
export interface ListCommandsResult {
  Commands?: Command[];
  NextToken?: string;
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
  Key?: string;
  Values?: string[];
  Type?: ComplianceQueryOperatorType;
}
export type ComplianceStringFilterList = ComplianceStringFilter[];
export type ComplianceResourceId = string;
export type ComplianceResourceIdList = string[];
export type ComplianceResourceType = string;
export type ComplianceResourceTypeList = string[];
export interface ListComplianceItemsRequest {
  Filters?: ComplianceStringFilter[];
  ResourceIds?: string[];
  ResourceTypes?: string[];
  NextToken?: string;
  MaxResults?: number;
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
  ExecutionId?: string;
  ExecutionType?: string;
}
export type ComplianceItemDetails = { [key: string]: string | undefined };
export interface ComplianceItem {
  ComplianceType?: string;
  ResourceType?: string;
  ResourceId?: string;
  Id?: string;
  Title?: string;
  Status?: ComplianceStatus;
  Severity?: ComplianceSeverity;
  ExecutionSummary?: ComplianceExecutionSummary;
  Details?: { [key: string]: string | undefined };
}
export type ComplianceItemList = ComplianceItem[];
export interface ListComplianceItemsResult {
  ComplianceItems?: ComplianceItem[];
  NextToken?: string;
}
export interface ListComplianceSummariesRequest {
  Filters?: ComplianceStringFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export type ComplianceSummaryCount = number;
export interface SeveritySummary {
  CriticalCount?: number;
  HighCount?: number;
  MediumCount?: number;
  LowCount?: number;
  InformationalCount?: number;
  UnspecifiedCount?: number;
}
export interface CompliantSummary {
  CompliantCount?: number;
  SeveritySummary?: SeveritySummary;
}
export interface NonCompliantSummary {
  NonCompliantCount?: number;
  SeveritySummary?: SeveritySummary;
}
export interface ComplianceSummaryItem {
  ComplianceType?: string;
  CompliantSummary?: CompliantSummary;
  NonCompliantSummary?: NonCompliantSummary;
}
export type ComplianceSummaryItemList = ComplianceSummaryItem[];
export interface ListComplianceSummariesResult {
  ComplianceSummaryItems?: ComplianceSummaryItem[];
  NextToken?: string;
}
export type DocumentMetadataEnum = "DocumentReviews" | (string & {});
export interface ListDocumentMetadataHistoryRequest {
  Name: string;
  DocumentVersion?: string;
  Metadata: DocumentMetadataEnum;
  NextToken?: string;
  MaxResults?: number;
}
export type DocumentReviewCommentType = "Comment" | (string & {});
export type DocumentReviewComment = string;
export interface DocumentReviewCommentSource {
  Type?: DocumentReviewCommentType;
  Content?: string;
}
export type DocumentReviewCommentList = DocumentReviewCommentSource[];
export interface DocumentReviewerResponseSource {
  CreateTime?: Date;
  UpdatedTime?: Date;
  ReviewStatus?: ReviewStatus;
  Comment?: DocumentReviewCommentSource[];
  Reviewer?: string;
}
export type DocumentReviewerResponseList = DocumentReviewerResponseSource[];
export interface DocumentMetadataResponseInfo {
  ReviewerResponse?: DocumentReviewerResponseSource[];
}
export interface ListDocumentMetadataHistoryResponse {
  Name?: string;
  DocumentVersion?: string;
  Author?: string;
  Metadata?: DocumentMetadataResponseInfo;
  NextToken?: string;
}
export type DocumentFilterKey =
  | "Name"
  | "Owner"
  | "PlatformTypes"
  | "DocumentType"
  | (string & {});
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
  Key?: string;
  Values?: string[];
}
export type DocumentKeyValuesFilterList = DocumentKeyValuesFilter[];
export interface ListDocumentsRequest {
  DocumentFilterList?: DocumentFilter[];
  Filters?: DocumentKeyValuesFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export interface DocumentIdentifier {
  Name?: string;
  CreatedDate?: Date;
  DisplayName?: string;
  Owner?: string;
  VersionName?: string;
  PlatformTypes?: PlatformType[];
  DocumentVersion?: string;
  DocumentType?: DocumentType;
  SchemaVersion?: string;
  DocumentFormat?: DocumentFormat;
  TargetType?: string;
  Tags?: Tag[];
  Requires?: DocumentRequires[];
  ReviewStatus?: ReviewStatus;
  Author?: string;
}
export type DocumentIdentifierList = DocumentIdentifier[];
export interface ListDocumentsResult {
  DocumentIdentifiers?: DocumentIdentifier[];
  NextToken?: string;
}
export interface ListDocumentVersionsRequest {
  Name: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DocumentVersionInfo {
  Name?: string;
  DisplayName?: string;
  DocumentVersion?: string;
  VersionName?: string;
  CreatedDate?: Date;
  IsDefaultVersion?: boolean;
  DocumentFormat?: DocumentFormat;
  Status?: DocumentStatus;
  StatusInformation?: string;
  ReviewStatus?: ReviewStatus;
}
export type DocumentVersionList = DocumentVersionInfo[];
export interface ListDocumentVersionsResult {
  DocumentVersions?: DocumentVersionInfo[];
  NextToken?: string;
}
export interface ListInventoryEntriesRequest {
  InstanceId: string;
  TypeName: string;
  Filters?: InventoryFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ListInventoryEntriesResult {
  TypeName?: string;
  InstanceId?: string;
  SchemaVersion?: string;
  CaptureTime?: string;
  Entries?: { [key: string]: string | undefined }[];
  NextToken?: string;
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
export type NodeFilterOperatorType =
  | "Equal"
  | "NotEqual"
  | "BeginWith"
  | (string & {});
export interface NodeFilter {
  Key: NodeFilterKey;
  Values: string[];
  Type?: NodeFilterOperatorType;
}
export type NodeFilterList = NodeFilter[];
export interface ListNodesRequest {
  SyncName?: string;
  Filters?: NodeFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export type NodeCaptureTime = Date;
export type NodeId = string;
export type NodeAccountId = string;
export type NodeOrganizationalUnitId = string;
export type NodeOrganizationalUnitPath = string;
export interface NodeOwnerInfo {
  AccountId?: string;
  OrganizationalUnitId?: string;
  OrganizationalUnitPath?: string;
}
export type NodeRegion = string;
export type AgentType = string;
export type AgentVersion = string;
export type InstanceStatus = string;
export type ManagedStatus = "All" | "Managed" | "Unmanaged" | (string & {});
export type NodeName = string;
export type AvailabilityZoneId = string;
export interface InstanceInfo {
  AgentType?: string;
  AgentVersion?: string;
  ComputerName?: string;
  InstanceStatus?: string;
  IpAddress?: string | redacted.Redacted<string>;
  ManagedStatus?: ManagedStatus;
  Name?: string;
  PlatformType?: PlatformType;
  PlatformName?: string;
  PlatformVersion?: string;
  ResourceType?: ResourceType;
  SourceType?: SourceType;
  SourceId?: string;
  SourceLocation?: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
}
export type NodeType = { Instance: InstanceInfo };
export interface Node {
  CaptureTime?: Date;
  Id?: string;
  Owner?: NodeOwnerInfo;
  Region?: string;
  NodeType?: NodeType;
}
export type NodeList = Node[];
export interface ListNodesResult {
  Nodes?: Node[];
  NextToken?: string;
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
  Aggregators?: NodeAggregator[];
}
export type NodeAggregatorList = NodeAggregator[];
export interface ListNodesSummaryRequest {
  SyncName?: string;
  Filters?: NodeFilter[];
  Aggregators: NodeAggregator[];
  NextToken?: string;
  MaxResults?: number;
}
export type NodeSummary = { [key: string]: string | undefined };
export type NodeSummaryList = { [key: string]: string | undefined }[];
export interface ListNodesSummaryResult {
  Summary?: { [key: string]: string | undefined }[];
  NextToken?: string;
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
  Filters?: OpsItemEventFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export interface OpsItemIdentity {
  Arn?: string;
}
export interface OpsItemEventSummary {
  OpsItemId?: string;
  EventId?: string;
  Source?: string;
  DetailType?: string;
  Detail?: string;
  CreatedBy?: OpsItemIdentity;
  CreatedTime?: Date;
}
export type OpsItemEventSummaries = OpsItemEventSummary[];
export interface ListOpsItemEventsResponse {
  NextToken?: string;
  Summaries?: OpsItemEventSummary[];
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
  OpsItemId?: string;
  Filters?: OpsItemRelatedItemsFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export interface OpsItemRelatedItemSummary {
  OpsItemId?: string;
  AssociationId?: string;
  ResourceType?: string;
  AssociationType?: string;
  ResourceUri?: string;
  CreatedBy?: OpsItemIdentity;
  CreatedTime?: Date;
  LastModifiedBy?: OpsItemIdentity;
  LastModifiedTime?: Date;
}
export type OpsItemRelatedItemSummaries = OpsItemRelatedItemSummary[];
export interface ListOpsItemRelatedItemsResponse {
  NextToken?: string;
  Summaries?: OpsItemRelatedItemSummary[];
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
  Filters?: OpsMetadataFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export interface OpsMetadata {
  ResourceId?: string;
  OpsMetadataArn?: string;
  LastModifiedDate?: Date;
  LastModifiedUser?: string;
  CreationDate?: Date;
}
export type OpsMetadataList = OpsMetadata[];
export interface ListOpsMetadataResult {
  OpsMetadataList?: OpsMetadata[];
  NextToken?: string;
}
export interface ListResourceComplianceSummariesRequest {
  Filters?: ComplianceStringFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ResourceComplianceSummaryItem {
  ComplianceType?: string;
  ResourceType?: string;
  ResourceId?: string;
  Status?: ComplianceStatus;
  OverallSeverity?: ComplianceSeverity;
  ExecutionSummary?: ComplianceExecutionSummary;
  CompliantSummary?: CompliantSummary;
  NonCompliantSummary?: NonCompliantSummary;
}
export type ResourceComplianceSummaryItemList = ResourceComplianceSummaryItem[];
export interface ListResourceComplianceSummariesResult {
  ResourceComplianceSummaryItems?: ResourceComplianceSummaryItem[];
  NextToken?: string;
}
export interface ListResourceDataSyncRequest {
  SyncType?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ResourceDataSyncState = string;
export interface ResourceDataSyncSourceWithState {
  SourceType?: string;
  AwsOrganizationsSource?: ResourceDataSyncAwsOrganizationsSource;
  SourceRegions?: string[];
  IncludeFutureRegions?: boolean;
  State?: string;
  EnableAllOpsDataSources?: boolean;
}
export type LastResourceDataSyncTime = Date;
export type LastSuccessfulResourceDataSyncTime = Date;
export type ResourceDataSyncLastModifiedTime = Date;
export type LastResourceDataSyncStatus =
  | "Successful"
  | "Failed"
  | "InProgress"
  | (string & {});
export type ResourceDataSyncCreatedTime = Date;
export type LastResourceDataSyncMessage = string;
export interface ResourceDataSyncItem {
  SyncName?: string;
  SyncType?: string;
  SyncSource?: ResourceDataSyncSourceWithState;
  S3Destination?: ResourceDataSyncS3Destination;
  LastSyncTime?: Date;
  LastSuccessfulSyncTime?: Date;
  SyncLastModifiedTime?: Date;
  LastStatus?: LastResourceDataSyncStatus;
  SyncCreatedTime?: Date;
  LastSyncStatusMessage?: string;
}
export type ResourceDataSyncItemList = ResourceDataSyncItem[];
export interface ListResourceDataSyncResult {
  ResourceDataSyncItems?: ResourceDataSyncItem[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceType: ResourceTypeForTagging;
  ResourceId: string;
}
export interface ListTagsForResourceResult {
  TagList?: Tag[];
}
export interface ModifyDocumentPermissionRequest {
  Name: string;
  PermissionType: DocumentPermissionType;
  AccountIdsToAdd?: string[];
  AccountIdsToRemove?: string[];
  SharedDocumentVersion?: string;
}
export interface ModifyDocumentPermissionResponse {}
export interface ComplianceItemEntry {
  Id?: string;
  Title?: string;
  Severity: ComplianceSeverity;
  Status: ComplianceStatus;
  Details?: { [key: string]: string | undefined };
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
  ItemContentHash?: string;
  UploadType?: ComplianceUploadType;
}
export interface PutComplianceItemsResult {}
export type InventoryItemContentContext = { [key: string]: string | undefined };
export interface InventoryItem {
  TypeName: string;
  SchemaVersion: string;
  CaptureTime: string;
  ContentHash?: string;
  Content?: { [key: string]: string | undefined }[];
  Context?: { [key: string]: string | undefined };
}
export type InventoryItemList = InventoryItem[];
export interface PutInventoryRequest {
  InstanceId: string;
  Items: InventoryItem[];
}
export type PutInventoryMessage = string;
export interface PutInventoryResult {
  Message?: string;
}
export type ParameterPolicies = string;
export interface PutParameterRequest {
  Name: string;
  Description?: string;
  Value: string | redacted.Redacted<string>;
  Type?: ParameterType;
  KeyId?: string;
  Overwrite?: boolean;
  AllowedPattern?: string;
  Tags?: Tag[];
  Tier?: ParameterTier;
  Policies?: string;
  DataType?: string;
}
export interface PutParameterResult {
  Version?: number;
  Tier?: ParameterTier;
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
  PolicyId?: string;
  PolicyHash?: string;
}
export interface PutResourcePolicyResponse {
  PolicyId?: string;
  PolicyHash?: string;
}
export interface RegisterDefaultPatchBaselineRequest {
  BaselineId: string;
}
export interface RegisterDefaultPatchBaselineResult {
  BaselineId?: string;
}
export interface RegisterPatchBaselineForPatchGroupRequest {
  BaselineId: string;
  PatchGroup: string;
}
export interface RegisterPatchBaselineForPatchGroupResult {
  BaselineId?: string;
  PatchGroup?: string;
}
export interface RegisterTargetWithMaintenanceWindowRequest {
  WindowId: string;
  ResourceType: MaintenanceWindowResourceType;
  Targets: Target[];
  OwnerInformation?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  ClientToken?: string;
}
export interface RegisterTargetWithMaintenanceWindowResult {
  WindowTargetId?: string;
}
export interface RegisterTaskWithMaintenanceWindowRequest {
  WindowId: string;
  Targets?: Target[];
  TaskArn: string;
  ServiceRoleArn?: string;
  TaskType: MaintenanceWindowTaskType;
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  };
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters;
  Priority?: number;
  MaxConcurrency?: string;
  MaxErrors?: string;
  LoggingInfo?: LoggingInfo;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  ClientToken?: string;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior;
  AlarmConfiguration?: AlarmConfiguration;
}
export interface RegisterTaskWithMaintenanceWindowResult {
  WindowTaskId?: string;
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
  ServiceSetting?: ServiceSetting;
}
export interface ResumeSessionRequest {
  SessionId: string;
}
export type TokenValue = string;
export type StreamUrl = string;
export interface ResumeSessionResponse {
  SessionId?: string;
  TokenValue?: string;
  StreamUrl?: string;
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
  Payload?: { [key: string]: string[] | undefined };
}
export interface SendAutomationSignalResult {}
export interface SendCommandRequest {
  InstanceIds?: string[];
  Targets?: Target[];
  DocumentName: string;
  DocumentVersion?: string;
  DocumentHash?: string;
  DocumentHashType?: DocumentHashType;
  TimeoutSeconds?: number;
  Comment?: string;
  Parameters?: { [key: string]: string[] | undefined };
  OutputS3Region?: string;
  OutputS3BucketName?: string;
  OutputS3KeyPrefix?: string;
  MaxConcurrency?: string;
  MaxErrors?: string;
  ServiceRoleArn?: string;
  NotificationConfig?: NotificationConfig;
  CloudWatchOutputConfig?: CloudWatchOutputConfig;
  AlarmConfiguration?: AlarmConfiguration;
}
export interface SendCommandResult {
  Command?: Command;
}
export type String1to256 = string;
export interface StartAccessRequestRequest {
  Reason: string;
  Targets: Target[];
  Tags?: Tag[];
}
export interface StartAccessRequestResponse {
  AccessRequestId?: string;
}
export type AssociationIdList = string[];
export interface StartAssociationsOnceRequest {
  AssociationIds: string[];
}
export interface StartAssociationsOnceResult {}
export type IdempotencyToken = string;
export interface StartAutomationExecutionRequest {
  DocumentName: string;
  DocumentVersion?: string;
  Parameters?: { [key: string]: string[] | undefined };
  ClientToken?: string;
  Mode?: ExecutionMode;
  TargetParameterName?: string;
  Targets?: Target[];
  TargetMaps?: { [key: string]: string[] | undefined }[];
  MaxConcurrency?: string;
  MaxErrors?: string;
  TargetLocations?: TargetLocation[];
  Tags?: Tag[];
  AlarmConfiguration?: AlarmConfiguration;
  TargetLocationsURL?: string;
}
export interface StartAutomationExecutionResult {
  AutomationExecutionId?: string;
}
export type ChangeDetailsValue = string;
export interface StartChangeRequestExecutionRequest {
  ScheduledTime?: Date;
  DocumentName: string;
  DocumentVersion?: string;
  Parameters?: { [key: string]: string[] | undefined };
  ChangeRequestName?: string;
  ClientToken?: string;
  AutoApprove?: boolean;
  Runbooks: Runbook[];
  Tags?: Tag[];
  ScheduledEndTime?: Date;
  ChangeDetails?: string;
}
export interface StartChangeRequestExecutionResult {
  AutomationExecutionId?: string;
}
export interface AutomationExecutionInputs {
  Parameters?: { [key: string]: string[] | undefined };
  TargetParameterName?: string;
  Targets?: Target[];
  TargetMaps?: { [key: string]: string[] | undefined }[];
  TargetLocations?: TargetLocation[];
  TargetLocationsURL?: string;
}
export type ExecutionInputs = { Automation: AutomationExecutionInputs };
export interface StartExecutionPreviewRequest {
  DocumentName: string;
  DocumentVersion?: string;
  ExecutionInputs?: ExecutionInputs;
}
export interface StartExecutionPreviewResponse {
  ExecutionPreviewId?: string;
}
export type SessionManagerParameterName = string;
export type SessionManagerParameterValue = string;
export type SessionManagerParameterValueList = string[];
export type SessionManagerParameters = { [key: string]: string[] | undefined };
export interface StartSessionRequest {
  Target: string;
  DocumentName?: string;
  Reason?: string;
  Parameters?: { [key: string]: string[] | undefined };
}
export interface StartSessionResponse {
  SessionId?: string;
  TokenValue?: string;
  StreamUrl?: string;
}
export type StopType = "Complete" | "Cancel" | (string & {});
export interface StopAutomationExecutionRequest {
  AutomationExecutionId: string;
  Type?: StopType;
}
export interface StopAutomationExecutionResult {}
export interface TerminateSessionRequest {
  SessionId: string;
}
export interface TerminateSessionResponse {
  SessionId?: string;
}
export interface UnlabelParameterVersionRequest {
  Name: string;
  ParameterVersion: number;
  Labels: string[];
}
export interface UnlabelParameterVersionResult {
  RemovedLabels?: string[];
  InvalidLabels?: string[];
}
export interface UpdateAssociationRequest {
  AssociationId: string;
  Parameters?: { [key: string]: string[] | undefined };
  DocumentVersion?: string;
  ScheduleExpression?: string;
  OutputLocation?: InstanceAssociationOutputLocation;
  Name?: string;
  Targets?: Target[];
  AssociationName?: string;
  AssociationVersion?: string;
  AutomationTargetParameterName?: string;
  MaxErrors?: string;
  MaxConcurrency?: string;
  ComplianceSeverity?: AssociationComplianceSeverity;
  SyncCompliance?: AssociationSyncCompliance;
  ApplyOnlyAtCronInterval?: boolean;
  CalendarNames?: string[];
  TargetLocations?: TargetLocation[];
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
  AlarmConfiguration?: AlarmConfiguration;
  AssociationDispatchAssumeRole?: string;
}
export interface UpdateAssociationResult {
  AssociationDescription?: AssociationDescription;
}
export interface UpdateAssociationStatusRequest {
  Name: string;
  InstanceId: string;
  AssociationStatus: AssociationStatus;
}
export interface UpdateAssociationStatusResult {
  AssociationDescription?: AssociationDescription;
}
export interface UpdateCloudConnectorRequest {
  CloudConnectorId: string;
  DisplayName?: string;
  Configuration?: CloudConnectorConfiguration;
  Description?: string;
}
export interface UpdateCloudConnectorResult {
  CloudConnectorId?: string;
}
export interface UpdateDocumentRequest {
  Content: string;
  Attachments?: AttachmentsSource[];
  Name: string;
  DisplayName?: string;
  VersionName?: string;
  DocumentVersion?: string;
  DocumentFormat?: DocumentFormat;
  TargetType?: string;
}
export interface UpdateDocumentResult {
  DocumentDescription?: DocumentDescription;
}
export type DocumentVersionNumber = string;
export interface UpdateDocumentDefaultVersionRequest {
  Name: string;
  DocumentVersion: string;
}
export interface DocumentDefaultVersionDescription {
  Name?: string;
  DefaultVersion?: string;
  DefaultVersionName?: string;
}
export interface UpdateDocumentDefaultVersionResult {
  Description?: DocumentDefaultVersionDescription;
}
export type DocumentReviewAction =
  | "SendForReview"
  | "UpdateReview"
  | "Approve"
  | "Reject"
  | (string & {});
export interface DocumentReviews {
  Action: DocumentReviewAction;
  Comment?: DocumentReviewCommentSource[];
}
export interface UpdateDocumentMetadataRequest {
  Name: string;
  DocumentVersion?: string;
  DocumentReviews: DocumentReviews;
}
export interface UpdateDocumentMetadataResponse {}
export interface UpdateMaintenanceWindowRequest {
  WindowId: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  StartDate?: string;
  EndDate?: string;
  Schedule?: string;
  ScheduleTimezone?: string;
  ScheduleOffset?: number;
  Duration?: number;
  Cutoff?: number;
  AllowUnassociatedTargets?: boolean;
  Enabled?: boolean;
  Replace?: boolean;
}
export interface UpdateMaintenanceWindowResult {
  WindowId?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  StartDate?: string;
  EndDate?: string;
  Schedule?: string;
  ScheduleTimezone?: string;
  ScheduleOffset?: number;
  Duration?: number;
  Cutoff?: number;
  AllowUnassociatedTargets?: boolean;
  Enabled?: boolean;
}
export interface UpdateMaintenanceWindowTargetRequest {
  WindowId: string;
  WindowTargetId: string;
  Targets?: Target[];
  OwnerInformation?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  Replace?: boolean;
}
export interface UpdateMaintenanceWindowTargetResult {
  WindowId?: string;
  WindowTargetId?: string;
  Targets?: Target[];
  OwnerInformation?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
}
export interface UpdateMaintenanceWindowTaskRequest {
  WindowId: string;
  WindowTaskId: string;
  Targets?: Target[];
  TaskArn?: string;
  ServiceRoleArn?: string;
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  };
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters;
  Priority?: number;
  MaxConcurrency?: string;
  MaxErrors?: string;
  LoggingInfo?: LoggingInfo;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  Replace?: boolean;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior;
  AlarmConfiguration?: AlarmConfiguration;
}
export interface UpdateMaintenanceWindowTaskResult {
  WindowId?: string;
  WindowTaskId?: string;
  Targets?: Target[];
  TaskArn?: string;
  ServiceRoleArn?: string;
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  };
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters;
  Priority?: number;
  MaxConcurrency?: string;
  MaxErrors?: string;
  LoggingInfo?: LoggingInfo;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior;
  AlarmConfiguration?: AlarmConfiguration;
}
export interface UpdateManagedInstanceRoleRequest {
  InstanceId: string;
  IamRole: string;
}
export interface UpdateManagedInstanceRoleResult {}
export type OpsItemOpsDataKeysList = string[];
export interface UpdateOpsItemRequest {
  Description?: string;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined };
  OperationalDataToDelete?: string[];
  Notifications?: OpsItemNotification[];
  Priority?: number;
  RelatedOpsItems?: RelatedOpsItem[];
  Status?: OpsItemStatus;
  OpsItemId: string;
  Title?: string;
  Category?: string;
  Severity?: string;
  ActualStartTime?: Date;
  ActualEndTime?: Date;
  PlannedStartTime?: Date;
  PlannedEndTime?: Date;
  OpsItemArn?: string;
}
export interface UpdateOpsItemResponse {}
export type MetadataKeysToDeleteList = string[];
export interface UpdateOpsMetadataRequest {
  OpsMetadataArn: string;
  MetadataToUpdate?: { [key: string]: MetadataValue | undefined };
  KeysToDelete?: string[];
}
export interface UpdateOpsMetadataResult {
  OpsMetadataArn?: string;
}
export interface UpdatePatchBaselineRequest {
  BaselineId: string;
  Name?: string;
  GlobalFilters?: PatchFilterGroup;
  ApprovalRules?: PatchRuleGroup;
  ApprovedPatches?: string[];
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel;
  ApprovedPatchesEnableNonSecurity?: boolean;
  RejectedPatches?: string[];
  RejectedPatchesAction?: PatchAction;
  Description?: string;
  Sources?: PatchSource[];
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus;
  Replace?: boolean;
}
export interface UpdatePatchBaselineResult {
  BaselineId?: string;
  Name?: string;
  OperatingSystem?: OperatingSystem;
  GlobalFilters?: PatchFilterGroup;
  ApprovalRules?: PatchRuleGroup;
  ApprovedPatches?: string[];
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel;
  ApprovedPatchesEnableNonSecurity?: boolean;
  RejectedPatches?: string[];
  RejectedPatchesAction?: PatchAction;
  CreatedDate?: Date;
  ModifiedDate?: Date;
  Description?: string;
  Sources?: PatchSource[];
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus;
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
  MaxResults?: number;
  NextToken?: string;
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
export type ValidationFindingScopeType =
  | "azure:tenant"
  | "azure:subscription"
  | (string & {});
export interface ValidationFindingScope {
  Type?: ValidationFindingScopeType;
  Id?: string;
}
export interface ValidationFinding {
  Type?: ValidationFindingType;
  Code?: ValidationFindingCode;
  Message?: string;
  ProviderMessage?: string;
  Scope?: ValidationFindingScope;
}
export type ValidationFindingList = ValidationFinding[];
export interface ValidateCloudConnectorResult {
  ValidationFindings?: ValidationFinding[];
  NextToken?: string;
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
  AddTagsToResourceRequest,
  AddTagsToResourceResult,
  AddTagsToResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceType: 0, ResourceId: 0, Tags: D.list(i_Tag) },
  },
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
})) as any;

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
  AssociateOpsItemRelatedItemRequest,
  AssociateOpsItemRelatedItemResponse,
  AssociateOpsItemRelatedItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OpsItemId: 0,
      AssociationType: 0,
      ResourceType: 0,
      ResourceUri: 0,
    },
  },
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
})) as any;

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
  CancelCommandRequest,
  CancelCommandResult,
  CancelCommandError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CommandId: 0, InstanceIds: 0 } },
  errors: [
    DuplicateInstanceId,
    InternalServerError,
    InvalidCommandId,
    InvalidInstanceId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCommand",
})) as any;

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
  CancelMaintenanceWindowExecutionRequest,
  CancelMaintenanceWindowExecutionResult,
  CancelMaintenanceWindowExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WindowExecutionId: 0 } },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMaintenanceWindowExecution",
})) as any;

export type CreateActivationError =
  | InternalServerError
  | InvalidParameters
  | CommonErrors;
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
  CreateActivationRequest,
  CreateActivationResult,
  CreateActivationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Description: 0,
      DefaultInstanceName: 0,
      IamRole: 0,
      RegistrationLimit: 0,
      ExpirationDate: 0,
      Tags: D.list(i_Tag),
      RegistrationMetadata: D.list({ Key: 0, Value: 0 }),
    },
  },
  errors: [InternalServerError, InvalidParameters],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateActivation",
})) as any;

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
  CreateAssociationRequest,
  CreateAssociationResult,
  CreateAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      DocumentVersion: 0,
      InstanceId: 0,
      Parameters: 0,
      Targets: D.list(i_Target),
      ScheduleExpression: 0,
      OutputLocation: i_InstanceAssociationOutputLocation,
      AssociationName: 0,
      AutomationTargetParameterName: 0,
      MaxErrors: 0,
      MaxConcurrency: 0,
      ComplianceSeverity: 0,
      SyncCompliance: 0,
      ApplyOnlyAtCronInterval: 0,
      CalendarNames: 0,
      TargetLocations: D.list(i_TargetLocation),
      ScheduleOffset: 0,
      Duration: 0,
      TargetMaps: 0,
      Tags: D.list(i_Tag),
      AlarmConfiguration: i_AlarmConfiguration,
      AssociationDispatchAssumeRole: 0,
    },
    output: { AssociationDescription: o_AssociationDescription },
  },
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
})) as any;

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
  CreateAssociationBatchRequest,
  CreateAssociationBatchResult,
  CreateAssociationBatchError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Entries: D.list({
        Name: 0,
        InstanceId: 0,
        Parameters: 0,
        AutomationTargetParameterName: 0,
        DocumentVersion: 0,
        Targets: D.list(i_Target),
        ScheduleExpression: 0,
        OutputLocation: i_InstanceAssociationOutputLocation,
        AssociationName: 0,
        MaxErrors: 0,
        MaxConcurrency: 0,
        ComplianceSeverity: 0,
        SyncCompliance: 0,
        ApplyOnlyAtCronInterval: 0,
        CalendarNames: 0,
        TargetLocations: D.list(i_TargetLocation),
        ScheduleOffset: 0,
        Duration: 0,
        TargetMaps: 0,
        AlarmConfiguration: i_AlarmConfiguration,
      }),
      AssociationDispatchAssumeRole: 0,
    },
    output: { Successful: D.list(o_AssociationDescription) },
  },
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
})) as any;

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
  CreateCloudConnectorRequest,
  CreateCloudConnectorResult,
  CreateCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DisplayName: 0,
      RoleArn: 0,
      Description: 0,
      Configuration: i_CloudConnectorConfiguration,
      ConfigConnectorArn: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    ConflictException,
    InternalServerError,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudConnector",
})) as any;

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
  CreateDocumentRequest,
  CreateDocumentResult,
  CreateDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Content: 0,
      Requires: D.list({ Name: 0, Version: 0, RequireType: 0, VersionName: 0 }),
      Attachments: D.list(i_AttachmentsSource),
      Name: 0,
      DisplayName: 0,
      VersionName: 0,
      DocumentType: 0,
      DocumentFormat: 0,
      TargetType: 0,
      Tags: D.list(i_Tag),
    },
    output: { DocumentDescription: o_DocumentDescription },
  },
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
})) as any;

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
  CreateMaintenanceWindowRequest,
  CreateMaintenanceWindowResult,
  CreateMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      StartDate: 0,
      EndDate: 0,
      Schedule: 0,
      ScheduleTimezone: 0,
      ScheduleOffset: 0,
      Duration: 0,
      Cutoff: 0,
      AllowUnassociatedTargets: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    IdempotentParameterMismatch,
    InternalServerError,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMaintenanceWindow",
})) as any;

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
  CreateOpsItemRequest,
  CreateOpsItemResponse,
  CreateOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Description: 0,
      OpsItemType: 0,
      OperationalData: D.map(i_OpsItemDataValue),
      Notifications: D.list(i_OpsItemNotification),
      Priority: 0,
      RelatedOpsItems: D.list(i_RelatedOpsItem),
      Source: 0,
      Title: 0,
      Tags: D.list(i_Tag),
      Category: 0,
      Severity: 0,
      ActualStartTime: 0,
      ActualEndTime: 0,
      PlannedStartTime: 0,
      PlannedEndTime: 0,
      AccountId: 0,
    },
  },
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
})) as any;

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
  CreateOpsMetadataRequest,
  CreateOpsMetadataResult,
  CreateOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceId: 0,
      Metadata: D.map(i_MetadataValue),
      Tags: D.list(i_Tag),
    },
  },
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
})) as any;

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
  CreatePatchBaselineRequest,
  CreatePatchBaselineResult,
  CreatePatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OperatingSystem: 0,
      Name: 0,
      GlobalFilters: i_PatchFilterGroup,
      ApprovalRules: i_PatchRuleGroup,
      ApprovedPatches: 0,
      ApprovedPatchesComplianceLevel: 0,
      ApprovedPatchesEnableNonSecurity: 0,
      RejectedPatches: 0,
      RejectedPatchesAction: 0,
      Description: 0,
      Sources: D.list(i_PatchSource),
      AvailableSecurityUpdatesComplianceStatus: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    IdempotentParameterMismatch,
    InternalServerError,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePatchBaseline",
})) as any;

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
  CreateResourceDataSyncRequest,
  CreateResourceDataSyncResult,
  CreateResourceDataSyncError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SyncName: 0,
      S3Destination: {
        BucketName: 0,
        Prefix: 0,
        SyncFormat: 0,
        Region: 0,
        AWSKMSKeyARN: 0,
        DestinationDataSharing: { DestinationDataSharingType: 0 },
      },
      SyncType: 0,
      SyncSource: i_ResourceDataSyncSource,
    },
  },
  errors: [
    InternalServerError,
    ResourceDataSyncAlreadyExistsException,
    ResourceDataSyncCountExceededException,
    ResourceDataSyncInvalidConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceDataSync",
})) as any;

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
  DeleteActivationRequest,
  DeleteActivationResult,
  DeleteActivationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ActivationId: 0 } },
  errors: [
    InternalServerError,
    InvalidActivation,
    InvalidActivationId,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteActivation",
})) as any;

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
  DeleteAssociationRequest,
  DeleteAssociationResult,
  DeleteAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, InstanceId: 0, AssociationId: 0 },
  },
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
})) as any;

export type DeleteCloudConnectorError =
  | ConflictException
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a cloud connector.
 */
export const deleteCloudConnector: API.OperationMethod<
  DeleteCloudConnectorRequest,
  DeleteCloudConnectorResult,
  DeleteCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CloudConnectorId: 0 } },
  errors: [ConflictException, InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudConnector",
})) as any;

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
  DeleteDocumentRequest,
  DeleteDocumentResult,
  DeleteDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, DocumentVersion: 0, VersionName: 0, Force: 0 },
  },
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
})) as any;

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
  DeleteInventoryRequest,
  DeleteInventoryResult,
  DeleteInventoryError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TypeName: 0,
      SchemaDeleteOption: 0,
      DryRun: 0,
      ClientToken: D.m({ idempotency: true }),
    },
  },
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
})) as any;

export type DeleteMaintenanceWindowError = InternalServerError | CommonErrors;
/**
 * Deletes a maintenance window.
 */
export const deleteMaintenanceWindow: API.OperationMethod<
  DeleteMaintenanceWindowRequest,
  DeleteMaintenanceWindowResult,
  DeleteMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WindowId: 0 } },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMaintenanceWindow",
})) as any;

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
  DeleteOpsItemRequest,
  DeleteOpsItemResponse,
  DeleteOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OpsItemId: 0 } },
  errors: [InternalServerError, OpsItemInvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOpsItem",
})) as any;

export type DeleteOpsMetadataError =
  | InternalServerError
  | OpsMetadataInvalidArgumentException
  | OpsMetadataNotFoundException
  | CommonErrors;
/**
 * Delete OpsMetadata related to an application.
 */
export const deleteOpsMetadata: API.OperationMethod<
  DeleteOpsMetadataRequest,
  DeleteOpsMetadataResult,
  DeleteOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OpsMetadataArn: 0 } },
  errors: [
    InternalServerError,
    OpsMetadataInvalidArgumentException,
    OpsMetadataNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOpsMetadata",
})) as any;

export type DeleteParameterError =
  | InternalServerError
  | ParameterNotFound
  | CommonErrors;
/**
 * Delete a parameter from the system. After deleting a parameter, wait for at least 30 seconds
 * to create a parameter with the same name.
 */
export const deleteParameter: API.OperationMethod<
  DeleteParameterRequest,
  DeleteParameterResult,
  DeleteParameterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [InternalServerError, ParameterNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteParameter",
})) as any;

export type DeleteParametersError = InternalServerError | CommonErrors;
/**
 * Delete a list of parameters. After deleting a parameter, wait for at least 30 seconds to
 * create a parameter with the same name.
 */
export const deleteParameters: API.OperationMethod<
  DeleteParametersRequest,
  DeleteParametersResult,
  DeleteParametersError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Names: 0 } },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteParameters",
})) as any;

export type DeletePatchBaselineError =
  | InternalServerError
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes a patch baseline.
 */
export const deletePatchBaseline: API.OperationMethod<
  DeletePatchBaselineRequest,
  DeletePatchBaselineResult,
  DeletePatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { BaselineId: 0 } },
  errors: [InternalServerError, ResourceInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePatchBaseline",
})) as any;

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
  DeleteResourceDataSyncRequest,
  DeleteResourceDataSyncResult,
  DeleteResourceDataSyncError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SyncName: 0, SyncType: 0 } },
  errors: [
    InternalServerError,
    ResourceDataSyncInvalidConfigurationException,
    ResourceDataSyncNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceDataSync",
})) as any;

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
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, PolicyId: 0, PolicyHash: 0 },
  },
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
})) as any;

export type DeregisterManagedInstanceError =
  | InternalServerError
  | InvalidInstanceId
  | CommonErrors;
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
  DeregisterManagedInstanceRequest,
  DeregisterManagedInstanceResult,
  DeregisterManagedInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceId: 0 } },
  errors: [InternalServerError, InvalidInstanceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterManagedInstance",
})) as any;

export type DeregisterPatchBaselineForPatchGroupError =
  | InternalServerError
  | InvalidResourceId
  | CommonErrors;
/**
 * Removes a patch group from a patch baseline.
 */
export const deregisterPatchBaselineForPatchGroup: API.OperationMethod<
  DeregisterPatchBaselineForPatchGroupRequest,
  DeregisterPatchBaselineForPatchGroupResult,
  DeregisterPatchBaselineForPatchGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { BaselineId: 0, PatchGroup: 0 } },
  errors: [InternalServerError, InvalidResourceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterPatchBaselineForPatchGroup",
})) as any;

export type DeregisterTargetFromMaintenanceWindowError =
  | DoesNotExistException
  | InternalServerError
  | TargetInUseException
  | CommonErrors;
/**
 * Removes a target from a maintenance window.
 */
export const deregisterTargetFromMaintenanceWindow: API.OperationMethod<
  DeregisterTargetFromMaintenanceWindowRequest,
  DeregisterTargetFromMaintenanceWindowResult,
  DeregisterTargetFromMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WindowId: 0, WindowTargetId: 0, Safe: 0 },
  },
  errors: [DoesNotExistException, InternalServerError, TargetInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTargetFromMaintenanceWindow",
})) as any;

export type DeregisterTaskFromMaintenanceWindowError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Removes a task from a maintenance window.
 */
export const deregisterTaskFromMaintenanceWindow: API.OperationMethod<
  DeregisterTaskFromMaintenanceWindowRequest,
  DeregisterTaskFromMaintenanceWindowResult,
  DeregisterTaskFromMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WindowId: 0, WindowTaskId: 0 } },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTaskFromMaintenanceWindow",
})) as any;

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
  DescribeActivationsRequest,
  DescribeActivationsResult,
  DescribeActivationsError,
  Creds | HttpClient.HttpClient,
  Activation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list({ FilterKey: 0, FilterValues: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      ActivationList: D.list({ ExpirationDate: D.ts, CreatedDate: D.ts }),
    },
  },
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
  DescribeAssociationRequest,
  DescribeAssociationResult,
  DescribeAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, InstanceId: 0, AssociationId: 0, AssociationVersion: 0 },
    output: { AssociationDescription: o_AssociationDescription },
  },
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
})) as any;

export type DescribeAssociationExecutionsError =
  | AssociationDoesNotExist
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Views all executions for a specific association ID.
 */
export const describeAssociationExecutions: API.PaginatedOperationMethod<
  DescribeAssociationExecutionsRequest,
  DescribeAssociationExecutionsResult,
  DescribeAssociationExecutionsError,
  Creds | HttpClient.HttpClient,
  AssociationExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AssociationId: 0,
      Filters: D.list({ Key: 0, Value: 0, Type: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      AssociationExecutions: D.list({
        CreatedTime: D.ts,
        LastExecutionDate: D.ts,
      }),
    },
  },
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
  DescribeAssociationExecutionTargetsRequest,
  DescribeAssociationExecutionTargetsResult,
  DescribeAssociationExecutionTargetsError,
  Creds | HttpClient.HttpClient,
  AssociationExecutionTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AssociationId: 0,
      ExecutionId: 0,
      Filters: D.list({ Key: 0, Value: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      AssociationExecutionTargets: D.list({ LastExecutionDate: D.ts }),
    },
  },
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
  DescribeAutomationExecutionsRequest,
  DescribeAutomationExecutionsResult,
  DescribeAutomationExecutionsError,
  Creds | HttpClient.HttpClient,
  AutomationExecutionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list({ Key: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      AutomationExecutionMetadataList: D.list({
        ExecutionStartTime: D.ts,
        ExecutionEndTime: D.ts,
        ScheduledTime: D.ts,
      }),
    },
  },
  errors: [
    InternalServerError,
    InvalidFilterKey,
    InvalidFilterValue,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutomationExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AutomationExecutionMetadataList",
    pageSize: "MaxResults",
  } as const,
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
  DescribeAutomationStepExecutionsRequest,
  DescribeAutomationStepExecutionsResult,
  DescribeAutomationStepExecutionsError,
  Creds | HttpClient.HttpClient,
  StepExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AutomationExecutionId: 0,
      Filters: D.list({ Key: 0, Values: 0 }),
      NextToken: 0,
      MaxResults: 0,
      ReverseOrder: 0,
    },
    output: { StepExecutions: D.list(o_StepExecution) },
  },
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
})) as any;

export type DescribeAvailablePatchesError = InternalServerError | CommonErrors;
/**
 * Lists all patches eligible to be included in a patch baseline.
 *
 * Currently, `DescribeAvailablePatches` supports only the Amazon Linux 1, Amazon
 * Linux 2, and Windows Server operating systems.
 */
export const describeAvailablePatches: API.PaginatedOperationMethod<
  DescribeAvailablePatchesRequest,
  DescribeAvailablePatchesResult,
  DescribeAvailablePatchesError,
  Creds | HttpClient.HttpClient,
  Patch
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list(i_PatchOrchestratorFilter),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Patches: D.list(o_Patch) },
  },
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
  DescribeDocumentRequest,
  DescribeDocumentResult,
  DescribeDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, DocumentVersion: 0, VersionName: 0 },
    output: { Document: o_DocumentDescription },
  },
  errors: [InternalServerError, InvalidDocument, InvalidDocumentVersion],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDocument",
})) as any;

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
  DescribeDocumentPermissionRequest,
  DescribeDocumentPermissionResponse,
  DescribeDocumentPermissionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, PermissionType: 0, MaxResults: 0, NextToken: 0 },
  },
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
})) as any;

export type DescribeEffectiveInstanceAssociationsError =
  | InternalServerError
  | InvalidInstanceId
  | InvalidNextToken
  | CommonErrors;
/**
 * All associations for the managed nodes.
 */
export const describeEffectiveInstanceAssociations: API.PaginatedOperationMethod<
  DescribeEffectiveInstanceAssociationsRequest,
  DescribeEffectiveInstanceAssociationsResult,
  DescribeEffectiveInstanceAssociationsError,
  Creds | HttpClient.HttpClient,
  InstanceAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { InstanceId: 0, MaxResults: 0, NextToken: 0 },
  },
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
  DescribeEffectivePatchesForPatchBaselineRequest,
  DescribeEffectivePatchesForPatchBaselineResult,
  DescribeEffectivePatchesForPatchBaselineError,
  Creds | HttpClient.HttpClient,
  EffectivePatch
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { BaselineId: 0, MaxResults: 0, NextToken: 0 },
    output: {
      EffectivePatches: D.list({
        Patch: o_Patch,
        PatchStatus: { ApprovalDate: D.ts },
      }),
    },
  },
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
  DescribeInstanceAssociationsStatusRequest,
  DescribeInstanceAssociationsStatusResult,
  DescribeInstanceAssociationsStatusError,
  Creds | HttpClient.HttpClient,
  InstanceAssociationStatusInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { InstanceId: 0, MaxResults: 0, NextToken: 0 },
    output: { InstanceAssociationStatusInfos: D.list({ ExecutionDate: D.ts }) },
  },
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
  DescribeInstanceInformationRequest,
  DescribeInstanceInformationResult,
  DescribeInstanceInformationError,
  Creds | HttpClient.HttpClient,
  InstanceInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceInformationFilterList: D.list({ key: 0, valueSet: 0 }),
      Filters: D.list({ Key: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      InstanceInformationList: D.list({
        LastPingDateTime: D.ts,
        RegistrationDate: D.ts,
        IPAddress: D.secret,
        LastAssociationExecutionDate: D.ts,
        LastSuccessfulAssociationExecutionDate: D.ts,
      }),
    },
  },
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
  DescribeInstancePatchesRequest,
  DescribeInstancePatchesResult,
  DescribeInstancePatchesError,
  Creds | HttpClient.HttpClient,
  PatchComplianceData
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceId: 0,
      Filters: D.list(i_PatchOrchestratorFilter),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Patches: D.list({ InstalledTime: D.ts }) },
  },
  errors: [
    InternalServerError,
    InvalidFilter,
    InvalidInstanceId,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstancePatches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Patches",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInstancePatchStatesError =
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieves the high-level patch state of one or more managed nodes.
 */
export const describeInstancePatchStates: API.PaginatedOperationMethod<
  DescribeInstancePatchStatesRequest,
  DescribeInstancePatchStatesResult,
  DescribeInstancePatchStatesError,
  Creds | HttpClient.HttpClient,
  InstancePatchState
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { InstanceIds: 0, NextToken: 0, MaxResults: 0 },
    output: { InstancePatchStates: D.list(o_InstancePatchState) },
  },
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
  DescribeInstancePatchStatesForPatchGroupRequest,
  DescribeInstancePatchStatesForPatchGroupResult,
  DescribeInstancePatchStatesForPatchGroupError,
  Creds | HttpClient.HttpClient,
  InstancePatchState
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      PatchGroup: 0,
      Filters: D.list({ Key: 0, Values: 0, Type: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { InstancePatchStates: D.list(o_InstancePatchState) },
  },
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
  DescribeInstancePropertiesRequest,
  DescribeInstancePropertiesResult,
  DescribeInstancePropertiesError,
  Creds | HttpClient.HttpClient,
  InstanceProperty
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      InstancePropertyFilterList: D.list({ key: 0, valueSet: 0 }),
      FiltersWithOperator: D.list({ Key: 0, Values: 0, Operator: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      InstanceProperties: D.list({
        IPAddress: D.secret,
        LaunchTime: D.ts,
        LastPingDateTime: D.ts,
        RegistrationDate: D.ts,
        LastAssociationExecutionDate: D.ts,
        LastSuccessfulAssociationExecutionDate: D.ts,
      }),
    },
  },
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
  DescribeInventoryDeletionsRequest,
  DescribeInventoryDeletionsResult,
  DescribeInventoryDeletionsError,
  Creds | HttpClient.HttpClient,
  InventoryDeletionStatusItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DeletionId: 0, NextToken: 0, MaxResults: 0 },
    output: {
      InventoryDeletions: D.list({
        DeletionStartTime: D.ts,
        LastStatusUpdateTime: D.ts,
      }),
    },
  },
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
})) as any;

export type DescribeMaintenanceWindowExecutionsError =
  | InternalServerError
  | CommonErrors;
/**
 * Lists the executions of a maintenance window. This includes information about when the
 * maintenance window was scheduled to be active, and information about tasks registered and run
 * with the maintenance window.
 */
export const describeMaintenanceWindowExecutions: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowExecutionsRequest,
  DescribeMaintenanceWindowExecutionsResult,
  DescribeMaintenanceWindowExecutionsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      WindowId: 0,
      Filters: D.list(i_MaintenanceWindowFilter),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { WindowExecutions: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
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
  DescribeMaintenanceWindowExecutionTaskInvocationsRequest,
  DescribeMaintenanceWindowExecutionTaskInvocationsResult,
  DescribeMaintenanceWindowExecutionTaskInvocationsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowExecutionTaskInvocationIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      WindowExecutionId: 0,
      TaskId: 0,
      Filters: D.list(i_MaintenanceWindowFilter),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      WindowExecutionTaskInvocationIdentities: D.list({
        Parameters: D.secret,
        StartTime: D.ts,
        EndTime: D.ts,
        OwnerInformation: D.secret,
      }),
    },
  },
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
})) as any;

export type DescribeMaintenanceWindowExecutionTasksError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * For a given maintenance window execution, lists the tasks that were run.
 */
export const describeMaintenanceWindowExecutionTasks: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowExecutionTasksRequest,
  DescribeMaintenanceWindowExecutionTasksResult,
  DescribeMaintenanceWindowExecutionTasksError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowExecutionTaskIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      WindowExecutionId: 0,
      Filters: D.list(i_MaintenanceWindowFilter),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      WindowExecutionTaskIdentities: D.list({ StartTime: D.ts, EndTime: D.ts }),
    },
  },
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
})) as any;

export type DescribeMaintenanceWindowsError =
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the maintenance windows in an Amazon Web Services account.
 */
export const describeMaintenanceWindows: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowsRequest,
  DescribeMaintenanceWindowsResult,
  DescribeMaintenanceWindowsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list(i_MaintenanceWindowFilter),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { WindowIdentities: D.list({ Description: D.secret }) },
  },
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
})) as any;

export type DescribeMaintenanceWindowScheduleError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves information about upcoming executions of a maintenance window.
 */
export const describeMaintenanceWindowSchedule: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowScheduleRequest,
  DescribeMaintenanceWindowScheduleResult,
  DescribeMaintenanceWindowScheduleError,
  Creds | HttpClient.HttpClient,
  ScheduledWindowExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      WindowId: 0,
      Targets: D.list(i_Target),
      ResourceType: 0,
      Filters: D.list(i_PatchOrchestratorFilter),
      MaxResults: 0,
      NextToken: 0,
    },
  },
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
})) as any;

export type DescribeMaintenanceWindowsForTargetError =
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves information about the maintenance window targets or tasks that a managed node is
 * associated with.
 */
export const describeMaintenanceWindowsForTarget: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowsForTargetRequest,
  DescribeMaintenanceWindowsForTargetResult,
  DescribeMaintenanceWindowsForTargetError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowIdentityForTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Targets: D.list(i_Target),
      ResourceType: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
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
})) as any;

export type DescribeMaintenanceWindowTargetsError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Lists the targets registered with the maintenance window.
 */
export const describeMaintenanceWindowTargets: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowTargetsRequest,
  DescribeMaintenanceWindowTargetsResult,
  DescribeMaintenanceWindowTargetsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      WindowId: 0,
      Filters: D.list(i_MaintenanceWindowFilter),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      Targets: D.list({ OwnerInformation: D.secret, Description: D.secret }),
    },
  },
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
  DescribeMaintenanceWindowTasksRequest,
  DescribeMaintenanceWindowTasksResult,
  DescribeMaintenanceWindowTasksError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      WindowId: 0,
      Filters: D.list(i_MaintenanceWindowFilter),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      Tasks: D.list({
        TaskParameters: D.map(o_MaintenanceWindowTaskParameterValueExpression),
        Description: D.secret,
      }),
    },
  },
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
  DescribeOpsItemsRequest,
  DescribeOpsItemsResponse,
  DescribeOpsItemsError,
  Creds | HttpClient.HttpClient,
  OpsItemSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      OpsItemFilters: D.list({ Key: 0, Values: 0, Operator: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      OpsItemSummaries: D.list({
        CreatedTime: D.ts,
        LastModifiedTime: D.ts,
        ActualStartTime: D.ts,
        ActualEndTime: D.ts,
        PlannedStartTime: D.ts,
        PlannedEndTime: D.ts,
      }),
    },
  },
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
  DescribeParametersRequest,
  DescribeParametersResult,
  DescribeParametersError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list({ Key: 0, Values: 0 }),
      ParameterFilters: D.list(i_ParameterStringFilter),
      MaxResults: 0,
      NextToken: 0,
      Shared: 0,
    },
    output: { Parameters: D.list({ LastModifiedDate: D.ts }) },
  },
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
})) as any;

export type DescribePatchBaselinesError = InternalServerError | CommonErrors;
/**
 * Lists the patch baselines in your Amazon Web Services account.
 */
export const describePatchBaselines: API.PaginatedOperationMethod<
  DescribePatchBaselinesRequest,
  DescribePatchBaselinesResult,
  DescribePatchBaselinesError,
  Creds | HttpClient.HttpClient,
  PatchBaselineIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list(i_PatchOrchestratorFilter),
      MaxResults: 0,
      NextToken: 0,
    },
  },
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
})) as any;

export type DescribePatchGroupsError = InternalServerError | CommonErrors;
/**
 * Lists all patch groups that have been registered with patch baselines.
 */
export const describePatchGroups: API.PaginatedOperationMethod<
  DescribePatchGroupsRequest,
  DescribePatchGroupsResult,
  DescribePatchGroupsError,
  Creds | HttpClient.HttpClient,
  PatchGroupPatchBaselineMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      Filters: D.list(i_PatchOrchestratorFilter),
      NextToken: 0,
    },
  },
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
})) as any;

export type DescribePatchGroupStateError =
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Returns high-level aggregated patch compliance state information for a patch group.
 */
export const describePatchGroupState: API.OperationMethod<
  DescribePatchGroupStateRequest,
  DescribePatchGroupStateResult,
  DescribePatchGroupStateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PatchGroup: 0 } },
  errors: [InternalServerError, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePatchGroupState",
})) as any;

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
  DescribePatchPropertiesRequest,
  DescribePatchPropertiesResult,
  DescribePatchPropertiesError,
  Creds | HttpClient.HttpClient,
  { [key: string]: string | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      OperatingSystem: 0,
      Property: 0,
      PatchSet: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
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
  DescribeSessionsRequest,
  DescribeSessionsResponse,
  DescribeSessionsError,
  Creds | HttpClient.HttpClient,
  Session
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      State: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list({ key: 0, value: 0 }),
    },
    output: { Sessions: D.list({ StartDate: D.ts, EndDate: D.ts }) },
  },
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
  DisassociateOpsItemRelatedItemRequest,
  DisassociateOpsItemRelatedItemResponse,
  DisassociateOpsItemRelatedItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OpsItemId: 0, AssociationId: 0 } },
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
})) as any;

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
  GetAccessTokenRequest,
  GetAccessTokenResponse,
  GetAccessTokenError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessRequestId: 0 },
    output: {
      Credentials: {
        SecretAccessKey: D.secret,
        SessionToken: D.secret,
        ExpirationTime: D.ts,
      },
    },
  },
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
})) as any;

export type GetAutomationExecutionError =
  | AutomationExecutionNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Get detailed information about a particular Automation execution.
 */
export const getAutomationExecution: API.OperationMethod<
  GetAutomationExecutionRequest,
  GetAutomationExecutionResult,
  GetAutomationExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutomationExecutionId: 0 },
    output: {
      AutomationExecution: {
        ExecutionStartTime: D.ts,
        ExecutionEndTime: D.ts,
        StepExecutions: D.list(o_StepExecution),
        ScheduledTime: D.ts,
      },
    },
  },
  errors: [AutomationExecutionNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomationExecution",
})) as any;

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
  GetCalendarStateRequest,
  GetCalendarStateResponse,
  GetCalendarStateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CalendarNames: 0, AtTime: 0 } },
  errors: [
    InternalServerError,
    InvalidDocument,
    InvalidDocumentType,
    UnsupportedCalendarException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalendarState",
})) as any;

export type GetCloudConnectorError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns detailed information about a cloud connector.
 */
export const getCloudConnector: API.OperationMethod<
  GetCloudConnectorRequest,
  GetCloudConnectorResult,
  GetCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CloudConnectorId: 0 },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
  },
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudConnector",
})) as any;

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
  GetCommandInvocationRequest,
  GetCommandInvocationResult,
  GetCommandInvocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CommandId: 0, InstanceId: 0, PluginName: 0 },
  },
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
})) as any;

export type GetConnectionStatusError = InternalServerError | CommonErrors;
/**
 * Retrieves the Session Manager connection status for a managed node to determine whether it is running
 * and ready to receive Session Manager connections.
 */
export const getConnectionStatus: API.OperationMethod<
  GetConnectionStatusRequest,
  GetConnectionStatusResponse,
  GetConnectionStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Target: 0 } },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionStatus",
})) as any;

export type GetDefaultPatchBaselineError = InternalServerError | CommonErrors;
/**
 * Retrieves the default patch baseline. Amazon Web Services Systems Manager supports creating multiple default patch
 * baselines. For example, you can create a default patch baseline for each operating system.
 *
 * If you don't specify an operating system value, the default patch baseline for Windows is
 * returned.
 */
export const getDefaultPatchBaseline: API.OperationMethod<
  GetDefaultPatchBaselineRequest,
  GetDefaultPatchBaselineResult,
  GetDefaultPatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { OperatingSystem: 0 } },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultPatchBaseline",
})) as any;

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
  GetDeployablePatchSnapshotForInstanceRequest,
  GetDeployablePatchSnapshotForInstanceResult,
  GetDeployablePatchSnapshotForInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceId: 0,
      SnapshotId: 0,
      BaselineOverride: {
        OperatingSystem: 0,
        GlobalFilters: i_PatchFilterGroup,
        ApprovalRules: i_PatchRuleGroup,
        ApprovedPatches: 0,
        ApprovedPatchesComplianceLevel: 0,
        RejectedPatches: 0,
        RejectedPatchesAction: 0,
        ApprovedPatchesEnableNonSecurity: 0,
        Sources: D.list(i_PatchSource),
        AvailableSecurityUpdatesComplianceStatus: 0,
      },
      UseS3DualStackEndpoint: 0,
    },
  },
  errors: [
    InternalServerError,
    UnsupportedFeatureRequiredException,
    UnsupportedOperatingSystem,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployablePatchSnapshotForInstance",
})) as any;

export type GetDocumentError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | CommonErrors;
/**
 * Gets the contents of the specified Amazon Web Services Systems Manager document (SSM document).
 */
export const getDocument: API.OperationMethod<
  GetDocumentRequest,
  GetDocumentResult,
  GetDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, VersionName: 0, DocumentVersion: 0, DocumentFormat: 0 },
    output: { CreatedDate: D.ts },
  },
  errors: [InternalServerError, InvalidDocument, InvalidDocumentVersion],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocument",
})) as any;

export type GetExecutionPreviewError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Initiates the process of retrieving an existing preview that shows the effects that running
 * a specified Automation runbook would have on the targeted resources.
 */
export const getExecutionPreview: API.OperationMethod<
  GetExecutionPreviewRequest,
  GetExecutionPreviewResponse,
  GetExecutionPreviewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ExecutionPreviewId: 0 },
    output: { EndedAt: D.ts },
  },
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExecutionPreview",
})) as any;

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
  GetInventoryRequest,
  GetInventoryResult,
  GetInventoryError,
  Creds | HttpClient.HttpClient,
  InventoryResultEntity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list(i_InventoryFilter),
      Aggregators: D.list(i_InventoryAggregator),
      ResultAttributes: D.list({ TypeName: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
  },
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
  GetInventorySchemaRequest,
  GetInventorySchemaResult,
  GetInventorySchemaError,
  Creds | HttpClient.HttpClient,
  InventoryItemSchema
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TypeName: 0,
      NextToken: 0,
      MaxResults: 0,
      Aggregator: 0,
      SubType: 0,
    },
  },
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
})) as any;

export type GetMaintenanceWindowError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves a maintenance window.
 */
export const getMaintenanceWindow: API.OperationMethod<
  GetMaintenanceWindowRequest,
  GetMaintenanceWindowResult,
  GetMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WindowId: 0 },
    output: { Description: D.secret, CreatedDate: D.ts, ModifiedDate: D.ts },
  },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindow",
})) as any;

export type GetMaintenanceWindowExecutionError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves details about a specific a maintenance window execution.
 */
export const getMaintenanceWindowExecution: API.OperationMethod<
  GetMaintenanceWindowExecutionRequest,
  GetMaintenanceWindowExecutionResult,
  GetMaintenanceWindowExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WindowExecutionId: 0 },
    output: { StartTime: D.ts, EndTime: D.ts },
  },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowExecution",
})) as any;

export type GetMaintenanceWindowExecutionTaskError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the details about a specific task run as part of a maintenance window
 * execution.
 */
export const getMaintenanceWindowExecutionTask: API.OperationMethod<
  GetMaintenanceWindowExecutionTaskRequest,
  GetMaintenanceWindowExecutionTaskResult,
  GetMaintenanceWindowExecutionTaskError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WindowExecutionId: 0, TaskId: 0 },
    output: {
      TaskParameters: D.list(
        D.map(o_MaintenanceWindowTaskParameterValueExpression),
      ),
      StartTime: D.ts,
      EndTime: D.ts,
    },
  },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowExecutionTask",
})) as any;

export type GetMaintenanceWindowExecutionTaskInvocationError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves information about a specific task running on a specific target.
 */
export const getMaintenanceWindowExecutionTaskInvocation: API.OperationMethod<
  GetMaintenanceWindowExecutionTaskInvocationRequest,
  GetMaintenanceWindowExecutionTaskInvocationResult,
  GetMaintenanceWindowExecutionTaskInvocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WindowExecutionId: 0, TaskId: 0, InvocationId: 0 },
    output: {
      Parameters: D.secret,
      StartTime: D.ts,
      EndTime: D.ts,
      OwnerInformation: D.secret,
    },
  },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowExecutionTaskInvocation",
})) as any;

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
  GetMaintenanceWindowTaskRequest,
  GetMaintenanceWindowTaskResult,
  GetMaintenanceWindowTaskError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WindowId: 0, WindowTaskId: 0 },
    output: {
      TaskParameters: D.map(o_MaintenanceWindowTaskParameterValueExpression),
      TaskInvocationParameters: o_MaintenanceWindowTaskInvocationParameters,
      Description: D.secret,
    },
  },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowTask",
})) as any;

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
  GetOpsItemRequest,
  GetOpsItemResponse,
  GetOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OpsItemId: 0, OpsItemArn: 0 },
    output: {
      OpsItem: {
        CreatedTime: D.ts,
        LastModifiedTime: D.ts,
        ActualStartTime: D.ts,
        ActualEndTime: D.ts,
        PlannedStartTime: D.ts,
        PlannedEndTime: D.ts,
      },
    },
  },
  errors: [
    InternalServerError,
    OpsItemAccessDeniedException,
    OpsItemNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpsItem",
})) as any;

export type GetOpsMetadataError =
  | InternalServerError
  | OpsMetadataInvalidArgumentException
  | OpsMetadataNotFoundException
  | CommonErrors;
/**
 * View operational metadata related to an application in Application Manager.
 */
export const getOpsMetadata: API.OperationMethod<
  GetOpsMetadataRequest,
  GetOpsMetadataResult,
  GetOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { OpsMetadataArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InternalServerError,
    OpsMetadataInvalidArgumentException,
    OpsMetadataNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpsMetadata",
})) as any;

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
  GetOpsSummaryRequest,
  GetOpsSummaryResult,
  GetOpsSummaryError,
  Creds | HttpClient.HttpClient,
  OpsEntity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SyncName: 0,
      Filters: D.list(i_OpsFilter),
      Aggregators: D.list(i_OpsAggregator),
      ResultAttributes: D.list({ TypeName: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
  },
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
  GetParameterRequest,
  GetParameterResult,
  GetParameterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, WithDecryption: 0 },
    output: { Parameter: o_Parameter },
  },
  errors: [
    InternalServerError,
    InvalidKeyId,
    ParameterNotFound,
    ParameterVersionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParameter",
})) as any;

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
 */
export const getParameterHistory: API.PaginatedOperationMethod<
  GetParameterHistoryRequest,
  GetParameterHistoryResult,
  GetParameterHistoryError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, WithDecryption: 0, MaxResults: 0, NextToken: 0 },
    output: { Parameters: D.list({ LastModifiedDate: D.ts, Value: D.secret }) },
  },
  errors: [
    InternalServerError,
    InvalidKeyId,
    InvalidNextToken,
    ParameterNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParameterHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetParametersError =
  | InternalServerError
  | InvalidKeyId
  | CommonErrors;
/**
 * Get information about one or more parameters by specifying multiple parameter names.
 *
 * To get information about a single parameter, you can use the GetParameter
 * operation instead.
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
  GetParametersRequest,
  GetParametersResult,
  GetParametersError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Names: 0, WithDecryption: 0 },
    output: { Parameters: D.list(o_Parameter) },
  },
  errors: [InternalServerError, InvalidKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParameters",
})) as any;

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
  GetParametersByPathRequest,
  GetParametersByPathResult,
  GetParametersByPathError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Path: 0,
      Recursive: 0,
      ParameterFilters: D.list(i_ParameterStringFilter),
      WithDecryption: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Parameters: D.list(o_Parameter) },
  },
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
  GetPatchBaselineRequest,
  GetPatchBaselineResult,
  GetPatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { BaselineId: 0 },
    output: {
      CreatedDate: D.ts,
      ModifiedDate: D.ts,
      Sources: D.list(o_PatchSource),
    },
  },
  errors: [DoesNotExistException, InternalServerError, InvalidResourceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPatchBaseline",
})) as any;

export type GetPatchBaselineForPatchGroupError =
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the patch baseline that should be used for the specified patch group.
 */
export const getPatchBaselineForPatchGroup: API.OperationMethod<
  GetPatchBaselineForPatchGroupRequest,
  GetPatchBaselineForPatchGroupResult,
  GetPatchBaselineForPatchGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PatchGroup: 0, OperatingSystem: 0 } },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPatchBaselineForPatchGroup",
})) as any;

export type GetResourcePoliciesError =
  | InternalServerError
  | ResourceNotFoundException
  | ResourcePolicyInvalidParameterException
  | CommonErrors;
/**
 * Returns an array of the `Policy` object.
 */
export const getResourcePolicies: API.PaginatedOperationMethod<
  GetResourcePoliciesRequest,
  GetResourcePoliciesResponse,
  GetResourcePoliciesError,
  Creds | HttpClient.HttpClient,
  GetResourcePoliciesResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    InternalServerError,
    ResourceNotFoundException,
    ResourcePolicyInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Policies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetServiceSettingError =
  | InternalServerError
  | ServiceSettingNotFound
  | CommonErrors;
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
  GetServiceSettingRequest,
  GetServiceSettingResult,
  GetServiceSettingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SettingId: 0 },
    output: { ServiceSetting: o_ServiceSetting },
  },
  errors: [InternalServerError, ServiceSettingNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSetting",
})) as any;

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
  LabelParameterVersionRequest,
  LabelParameterVersionResult,
  LabelParameterVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, ParameterVersion: 0, Labels: 0 },
  },
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
})) as any;

export type ListAssociationsError =
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Returns all State Manager associations in the current Amazon Web Services account and Amazon Web Services Region. You
 * can limit the results to a specific State Manager association document or managed node by
 * specifying a filter. State Manager is a tool in Amazon Web Services Systems Manager.
 */
export const listAssociations: API.PaginatedOperationMethod<
  ListAssociationsRequest,
  ListAssociationsResult,
  ListAssociationsError,
  Creds | HttpClient.HttpClient,
  Association
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AssociationFilterList: D.list({ key: 0, value: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Associations: D.list({ LastExecutionDate: D.ts }) },
  },
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
  ListAssociationVersionsRequest,
  ListAssociationVersionsResult,
  ListAssociationVersionsError,
  Creds | HttpClient.HttpClient,
  AssociationVersionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { AssociationId: 0, MaxResults: 0, NextToken: 0 },
    output: { AssociationVersions: D.list({ CreatedDate: D.ts }) },
  },
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
})) as any;

export type ListCloudConnectorsError = InternalServerError | CommonErrors;
/**
 * Returns a list of cloud connectors in the current Amazon Web Services account and Amazon Web Services Region.
 */
export const listCloudConnectors: API.PaginatedOperationMethod<
  ListCloudConnectorsRequest,
  ListCloudConnectorsResult,
  ListCloudConnectorsError,
  Creds | HttpClient.HttpClient,
  CloudConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list({ FilterKey: 0, FilterValues: 0 }),
    },
    output: { CloudConnectors: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
  },
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
  ListCommandInvocationsRequest,
  ListCommandInvocationsResult,
  ListCommandInvocationsError,
  Creds | HttpClient.HttpClient,
  CommandInvocation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CommandId: 0,
      InstanceId: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_CommandFilter),
      Details: 0,
    },
    output: {
      CommandInvocations: D.list({
        RequestedDateTime: D.ts,
        CommandPlugins: D.list({
          ResponseStartDateTime: D.ts,
          ResponseFinishDateTime: D.ts,
        }),
      }),
    },
  },
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
  ListCommandsRequest,
  ListCommandsResult,
  ListCommandsError,
  Creds | HttpClient.HttpClient,
  Command
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CommandId: 0,
      InstanceId: 0,
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_CommandFilter),
    },
    output: { Commands: D.list(o_Command) },
  },
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
  ListComplianceItemsRequest,
  ListComplianceItemsResult,
  ListComplianceItemsError,
  Creds | HttpClient.HttpClient,
  ComplianceItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list(i_ComplianceStringFilter),
      ResourceIds: 0,
      ResourceTypes: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ComplianceItems: D.list({
        ExecutionSummary: o_ComplianceExecutionSummary,
      }),
    },
  },
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
  ListComplianceSummariesRequest,
  ListComplianceSummariesResult,
  ListComplianceSummariesError,
  Creds | HttpClient.HttpClient,
  ComplianceSummaryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list(i_ComplianceStringFilter),
      NextToken: 0,
      MaxResults: 0,
    },
  },
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
  ListDocumentMetadataHistoryRequest,
  ListDocumentMetadataHistoryResponse,
  ListDocumentMetadataHistoryError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      DocumentVersion: 0,
      Metadata: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      Metadata: {
        ReviewerResponse: D.list({ CreateTime: D.ts, UpdatedTime: D.ts }),
      },
    },
  },
  errors: [
    InternalServerError,
    InvalidDocument,
    InvalidDocumentVersion,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocumentMetadataHistory",
})) as any;

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
  ListDocumentsRequest,
  ListDocumentsResult,
  ListDocumentsError,
  Creds | HttpClient.HttpClient,
  DocumentIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      DocumentFilterList: D.list({ key: 0, value: 0 }),
      Filters: D.list({ Key: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { DocumentIdentifiers: D.list({ CreatedDate: D.ts }) },
  },
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
  ListDocumentVersionsRequest,
  ListDocumentVersionsResult,
  ListDocumentVersionsError,
  Creds | HttpClient.HttpClient,
  DocumentVersionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, MaxResults: 0, NextToken: 0 },
    output: { DocumentVersions: D.list({ CreatedDate: D.ts }) },
  },
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
  ListInventoryEntriesRequest,
  ListInventoryEntriesResult,
  ListInventoryEntriesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceId: 0,
      TypeName: 0,
      Filters: D.list(i_InventoryFilter),
      NextToken: 0,
      MaxResults: 0,
    },
  },
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
})) as any;

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
  ListNodesRequest,
  ListNodesResult,
  ListNodesError,
  Creds | HttpClient.HttpClient,
  Node
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SyncName: 0,
      Filters: D.list(i_NodeFilter),
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      Nodes: D.list({
        CaptureTime: D.ts,
        NodeType: { Instance: { IpAddress: D.secret } },
      }),
    },
  },
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
  ListNodesSummaryRequest,
  ListNodesSummaryResult,
  ListNodesSummaryError,
  Creds | HttpClient.HttpClient,
  { [key: string]: string | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SyncName: 0,
      Filters: D.list(i_NodeFilter),
      Aggregators: D.list(i_NodeAggregator),
      NextToken: 0,
      MaxResults: 0,
    },
  },
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
  ListOpsItemEventsRequest,
  ListOpsItemEventsResponse,
  ListOpsItemEventsError,
  Creds | HttpClient.HttpClient,
  OpsItemEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list({ Key: 0, Values: 0, Operator: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Summaries: D.list({ CreatedTime: D.ts }) },
  },
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
  ListOpsItemRelatedItemsRequest,
  ListOpsItemRelatedItemsResponse,
  ListOpsItemRelatedItemsError,
  Creds | HttpClient.HttpClient,
  OpsItemRelatedItemSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      OpsItemId: 0,
      Filters: D.list({ Key: 0, Values: 0, Operator: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      Summaries: D.list({ CreatedTime: D.ts, LastModifiedTime: D.ts }),
    },
  },
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
  ListOpsMetadataRequest,
  ListOpsMetadataResult,
  ListOpsMetadataError,
  Creds | HttpClient.HttpClient,
  OpsMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list({ Key: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      OpsMetadataList: D.list({ LastModifiedDate: D.ts, CreationDate: D.ts }),
    },
  },
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
  ListResourceComplianceSummariesRequest,
  ListResourceComplianceSummariesResult,
  ListResourceComplianceSummariesError,
  Creds | HttpClient.HttpClient,
  ResourceComplianceSummaryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list(i_ComplianceStringFilter),
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      ResourceComplianceSummaryItems: D.list({
        ExecutionSummary: o_ComplianceExecutionSummary,
      }),
    },
  },
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
  ListResourceDataSyncRequest,
  ListResourceDataSyncResult,
  ListResourceDataSyncError,
  Creds | HttpClient.HttpClient,
  ResourceDataSyncItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { SyncType: 0, NextToken: 0, MaxResults: 0 },
    output: {
      ResourceDataSyncItems: D.list({
        LastSyncTime: D.ts,
        LastSuccessfulSyncTime: D.ts,
        SyncLastModifiedTime: D.ts,
        SyncCreatedTime: D.ts,
      }),
    },
  },
  errors: [
    InternalServerError,
    InvalidNextToken,
    ResourceDataSyncInvalidConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceDataSync",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceDataSyncItems",
    pageSize: "MaxResults",
  } as const,
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
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceType: 0, ResourceId: 0 } },
  errors: [InternalServerError, InvalidResourceId, InvalidResourceType],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  ModifyDocumentPermissionRequest,
  ModifyDocumentPermissionResponse,
  ModifyDocumentPermissionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      PermissionType: 0,
      AccountIdsToAdd: 0,
      AccountIdsToRemove: 0,
      SharedDocumentVersion: 0,
    },
  },
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
})) as any;

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
  PutComplianceItemsRequest,
  PutComplianceItemsResult,
  PutComplianceItemsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceId: 0,
      ResourceType: 0,
      ComplianceType: 0,
      ExecutionSummary: { ExecutionTime: 0, ExecutionId: 0, ExecutionType: 0 },
      Items: D.list({ Id: 0, Title: 0, Severity: 0, Status: 0, Details: 0 }),
      ItemContentHash: 0,
      UploadType: 0,
    },
  },
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
})) as any;

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
  PutInventoryRequest,
  PutInventoryResult,
  PutInventoryError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceId: 0,
      Items: D.list({
        TypeName: 0,
        SchemaVersion: 0,
        CaptureTime: 0,
        ContentHash: 0,
        Content: 0,
        Context: 0,
      }),
    },
  },
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
})) as any;

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
  PutParameterRequest,
  PutParameterResult,
  PutParameterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      Value: 0,
      Type: 0,
      KeyId: 0,
      Overwrite: 0,
      AllowedPattern: 0,
      Tags: D.list(i_Tag),
      Tier: 0,
      Policies: 0,
      DataType: 0,
    },
  },
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
})) as any;

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
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, Policy: 0, PolicyId: 0, PolicyHash: 0 },
  },
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
})) as any;

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
  RegisterDefaultPatchBaselineRequest,
  RegisterDefaultPatchBaselineResult,
  RegisterDefaultPatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { BaselineId: 0 } },
  errors: [DoesNotExistException, InternalServerError, InvalidResourceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDefaultPatchBaseline",
})) as any;

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
  RegisterPatchBaselineForPatchGroupRequest,
  RegisterPatchBaselineForPatchGroupResult,
  RegisterPatchBaselineForPatchGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { BaselineId: 0, PatchGroup: 0 } },
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
})) as any;

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
  RegisterTargetWithMaintenanceWindowRequest,
  RegisterTargetWithMaintenanceWindowResult,
  RegisterTargetWithMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WindowId: 0,
      ResourceType: 0,
      Targets: D.list(i_Target),
      OwnerInformation: 0,
      Name: 0,
      Description: 0,
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    DoesNotExistException,
    IdempotentParameterMismatch,
    InternalServerError,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterTargetWithMaintenanceWindow",
})) as any;

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
  RegisterTaskWithMaintenanceWindowRequest,
  RegisterTaskWithMaintenanceWindowResult,
  RegisterTaskWithMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WindowId: 0,
      Targets: D.list(i_Target),
      TaskArn: 0,
      ServiceRoleArn: 0,
      TaskType: 0,
      TaskParameters: D.map(i_MaintenanceWindowTaskParameterValueExpression),
      TaskInvocationParameters: i_MaintenanceWindowTaskInvocationParameters,
      Priority: 0,
      MaxConcurrency: 0,
      MaxErrors: 0,
      LoggingInfo: i_LoggingInfo,
      Name: 0,
      Description: 0,
      ClientToken: D.m({ idempotency: true }),
      CutoffBehavior: 0,
      AlarmConfiguration: i_AlarmConfiguration,
    },
  },
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
})) as any;

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
  RemoveTagsFromResourceRequest,
  RemoveTagsFromResourceResult,
  RemoveTagsFromResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceType: 0, ResourceId: 0, TagKeys: 0 },
  },
  errors: [
    InternalServerError,
    InvalidResourceId,
    InvalidResourceType,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
})) as any;

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
  ResetServiceSettingRequest,
  ResetServiceSettingResult,
  ResetServiceSettingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SettingId: 0 },
    output: { ServiceSetting: o_ServiceSetting },
  },
  errors: [InternalServerError, ServiceSettingNotFound, TooManyUpdates],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetServiceSetting",
})) as any;

export type ResumeSessionError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Reconnects a session to a managed node after it has been disconnected. Connections can be
 * resumed for disconnected sessions, but not terminated sessions.
 *
 * This command is primarily for use by client machines to automatically reconnect during
 * intermittent network issues. It isn't intended for any other use.
 */
export const resumeSession: API.OperationMethod<
  ResumeSessionRequest,
  ResumeSessionResponse,
  ResumeSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SessionId: 0 } },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeSession",
})) as any;

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
  SendAutomationSignalRequest,
  SendAutomationSignalResult,
  SendAutomationSignalError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutomationExecutionId: 0, SignalType: 0, Payload: 0 },
  },
  errors: [
    AutomationExecutionNotFoundException,
    AutomationStepNotFoundException,
    InternalServerError,
    InvalidAutomationSignalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendAutomationSignal",
})) as any;

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
  SendCommandRequest,
  SendCommandResult,
  SendCommandError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceIds: 0,
      Targets: D.list(i_Target),
      DocumentName: 0,
      DocumentVersion: 0,
      DocumentHash: 0,
      DocumentHashType: 0,
      TimeoutSeconds: 0,
      Comment: 0,
      Parameters: 0,
      OutputS3Region: 0,
      OutputS3BucketName: 0,
      OutputS3KeyPrefix: 0,
      MaxConcurrency: 0,
      MaxErrors: 0,
      ServiceRoleArn: 0,
      NotificationConfig: i_NotificationConfig,
      CloudWatchOutputConfig: i_CloudWatchOutputConfig,
      AlarmConfiguration: i_AlarmConfiguration,
    },
    output: { Command: o_Command },
  },
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
})) as any;

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
  StartAccessRequestRequest,
  StartAccessRequestResponse,
  StartAccessRequestError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Reason: 0, Targets: D.list(i_Target), Tags: D.list(i_Tag) },
  },
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
})) as any;

export type StartAssociationsOnceError =
  | AssociationDoesNotExist
  | InvalidAssociation
  | CommonErrors;
/**
 * Runs an association immediately and only one time. This operation can be helpful when
 * troubleshooting associations.
 */
export const startAssociationsOnce: API.OperationMethod<
  StartAssociationsOnceRequest,
  StartAssociationsOnceResult,
  StartAssociationsOnceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AssociationIds: 0 } },
  errors: [AssociationDoesNotExist, InvalidAssociation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssociationsOnce",
})) as any;

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
  StartAutomationExecutionRequest,
  StartAutomationExecutionResult,
  StartAutomationExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DocumentName: 0,
      DocumentVersion: 0,
      Parameters: 0,
      ClientToken: 0,
      Mode: 0,
      TargetParameterName: 0,
      Targets: D.list(i_Target),
      TargetMaps: 0,
      MaxConcurrency: 0,
      MaxErrors: 0,
      TargetLocations: D.list(i_TargetLocation),
      Tags: D.list(i_Tag),
      AlarmConfiguration: i_AlarmConfiguration,
      TargetLocationsURL: 0,
    },
  },
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
})) as any;

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
  StartChangeRequestExecutionRequest,
  StartChangeRequestExecutionResult,
  StartChangeRequestExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ScheduledTime: 0,
      DocumentName: 0,
      DocumentVersion: 0,
      Parameters: 0,
      ChangeRequestName: 0,
      ClientToken: 0,
      AutoApprove: 0,
      Runbooks: D.list({
        DocumentName: 0,
        DocumentVersion: 0,
        Parameters: 0,
        TargetParameterName: 0,
        Targets: D.list(i_Target),
        TargetMaps: 0,
        MaxConcurrency: 0,
        MaxErrors: 0,
        TargetLocations: D.list(i_TargetLocation),
      }),
      Tags: D.list(i_Tag),
      ScheduledEndTime: 0,
      ChangeDetails: 0,
    },
  },
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
})) as any;

export type StartExecutionPreviewError =
  | InternalServerError
  | ValidationException
  | CommonErrors;
/**
 * Initiates the process of creating a preview showing the effects that running a specified
 * Automation runbook would have on the targeted resources.
 */
export const startExecutionPreview: API.OperationMethod<
  StartExecutionPreviewRequest,
  StartExecutionPreviewResponse,
  StartExecutionPreviewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DocumentName: 0,
      DocumentVersion: 0,
      ExecutionInputs: {
        Automation: {
          Parameters: 0,
          TargetParameterName: 0,
          Targets: D.list(i_Target),
          TargetMaps: 0,
          TargetLocations: D.list(i_TargetLocation),
          TargetLocationsURL: 0,
        },
      },
    },
  },
  errors: [InternalServerError, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExecutionPreview",
})) as any;

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
  StartSessionRequest,
  StartSessionResponse,
  StartSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Target: 0, DocumentName: 0, Reason: 0, Parameters: 0 },
  },
  errors: [InternalServerError, InvalidDocument, TargetNotConnected],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSession",
})) as any;

export type StopAutomationExecutionError =
  | AutomationExecutionNotFoundException
  | InternalServerError
  | InvalidAutomationStatusUpdateException
  | CommonErrors;
/**
 * Stop an Automation that is currently running.
 */
export const stopAutomationExecution: API.OperationMethod<
  StopAutomationExecutionRequest,
  StopAutomationExecutionResult,
  StopAutomationExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AutomationExecutionId: 0, Type: 0 } },
  errors: [
    AutomationExecutionNotFoundException,
    InternalServerError,
    InvalidAutomationStatusUpdateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAutomationExecution",
})) as any;

export type TerminateSessionError = InternalServerError | CommonErrors;
/**
 * Permanently ends a session and closes the data connection between the Session Manager client and
 * SSM Agent on the managed node. A terminated session can't be resumed.
 */
export const terminateSession: API.OperationMethod<
  TerminateSessionRequest,
  TerminateSessionResponse,
  TerminateSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SessionId: 0 } },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
})) as any;

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
  UnlabelParameterVersionRequest,
  UnlabelParameterVersionResult,
  UnlabelParameterVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, ParameterVersion: 0, Labels: 0 },
  },
  errors: [
    InternalServerError,
    ParameterNotFound,
    ParameterVersionNotFound,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnlabelParameterVersion",
})) as any;

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
  UpdateAssociationRequest,
  UpdateAssociationResult,
  UpdateAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AssociationId: 0,
      Parameters: 0,
      DocumentVersion: 0,
      ScheduleExpression: 0,
      OutputLocation: i_InstanceAssociationOutputLocation,
      Name: 0,
      Targets: D.list(i_Target),
      AssociationName: 0,
      AssociationVersion: 0,
      AutomationTargetParameterName: 0,
      MaxErrors: 0,
      MaxConcurrency: 0,
      ComplianceSeverity: 0,
      SyncCompliance: 0,
      ApplyOnlyAtCronInterval: 0,
      CalendarNames: 0,
      TargetLocations: D.list(i_TargetLocation),
      ScheduleOffset: 0,
      Duration: 0,
      TargetMaps: 0,
      AlarmConfiguration: i_AlarmConfiguration,
      AssociationDispatchAssumeRole: 0,
    },
    output: { AssociationDescription: o_AssociationDescription },
  },
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
})) as any;

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
  UpdateAssociationStatusRequest,
  UpdateAssociationStatusResult,
  UpdateAssociationStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      InstanceId: 0,
      AssociationStatus: { Date: 0, Name: 0, Message: 0, AdditionalInfo: 0 },
    },
    output: { AssociationDescription: o_AssociationDescription },
  },
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
})) as any;

export type UpdateCloudConnectorError =
  | ConflictException
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing cloud connector with new configuration details.
 */
export const updateCloudConnector: API.OperationMethod<
  UpdateCloudConnectorRequest,
  UpdateCloudConnectorResult,
  UpdateCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CloudConnectorId: 0,
      DisplayName: 0,
      Configuration: i_CloudConnectorConfiguration,
      Description: 0,
    },
  },
  errors: [ConflictException, InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCloudConnector",
})) as any;

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
  UpdateDocumentRequest,
  UpdateDocumentResult,
  UpdateDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Content: 0,
      Attachments: D.list(i_AttachmentsSource),
      Name: 0,
      DisplayName: 0,
      VersionName: 0,
      DocumentVersion: 0,
      DocumentFormat: 0,
      TargetType: 0,
    },
    output: { DocumentDescription: o_DocumentDescription },
  },
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
})) as any;

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
  UpdateDocumentDefaultVersionRequest,
  UpdateDocumentDefaultVersionResult,
  UpdateDocumentDefaultVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, DocumentVersion: 0 } },
  errors: [
    InternalServerError,
    InvalidDocument,
    InvalidDocumentSchemaVersion,
    InvalidDocumentVersion,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocumentDefaultVersion",
})) as any;

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
  UpdateDocumentMetadataRequest,
  UpdateDocumentMetadataResponse,
  UpdateDocumentMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      DocumentVersion: 0,
      DocumentReviews: { Action: 0, Comment: D.list({ Type: 0, Content: 0 }) },
    },
  },
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
})) as any;

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
  UpdateMaintenanceWindowRequest,
  UpdateMaintenanceWindowResult,
  UpdateMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WindowId: 0,
      Name: 0,
      Description: 0,
      StartDate: 0,
      EndDate: 0,
      Schedule: 0,
      ScheduleTimezone: 0,
      ScheduleOffset: 0,
      Duration: 0,
      Cutoff: 0,
      AllowUnassociatedTargets: 0,
      Enabled: 0,
      Replace: 0,
    },
    output: { Description: D.secret },
  },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMaintenanceWindow",
})) as any;

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
  UpdateMaintenanceWindowTargetRequest,
  UpdateMaintenanceWindowTargetResult,
  UpdateMaintenanceWindowTargetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WindowId: 0,
      WindowTargetId: 0,
      Targets: D.list(i_Target),
      OwnerInformation: 0,
      Name: 0,
      Description: 0,
      Replace: 0,
    },
    output: { OwnerInformation: D.secret, Description: D.secret },
  },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMaintenanceWindowTarget",
})) as any;

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
  UpdateMaintenanceWindowTaskRequest,
  UpdateMaintenanceWindowTaskResult,
  UpdateMaintenanceWindowTaskError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WindowId: 0,
      WindowTaskId: 0,
      Targets: D.list(i_Target),
      TaskArn: 0,
      ServiceRoleArn: 0,
      TaskParameters: D.map(i_MaintenanceWindowTaskParameterValueExpression),
      TaskInvocationParameters: i_MaintenanceWindowTaskInvocationParameters,
      Priority: 0,
      MaxConcurrency: 0,
      MaxErrors: 0,
      LoggingInfo: i_LoggingInfo,
      Name: 0,
      Description: 0,
      Replace: 0,
      CutoffBehavior: 0,
      AlarmConfiguration: i_AlarmConfiguration,
    },
    output: {
      TaskParameters: D.map(o_MaintenanceWindowTaskParameterValueExpression),
      TaskInvocationParameters: o_MaintenanceWindowTaskInvocationParameters,
      Description: D.secret,
    },
  },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMaintenanceWindowTask",
})) as any;

export type UpdateManagedInstanceRoleError =
  | InternalServerError
  | InvalidInstanceId
  | CommonErrors;
/**
 * Changes the Identity and Access Management (IAM) role that is assigned to the
 * on-premises server, edge device, or virtual machines (VM). IAM roles are first
 * assigned to these hybrid nodes during the activation process. For more information, see CreateActivation.
 */
export const updateManagedInstanceRole: API.OperationMethod<
  UpdateManagedInstanceRoleRequest,
  UpdateManagedInstanceRoleResult,
  UpdateManagedInstanceRoleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { InstanceId: 0, IamRole: 0 } },
  errors: [InternalServerError, InvalidInstanceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateManagedInstanceRole",
})) as any;

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
  UpdateOpsItemRequest,
  UpdateOpsItemResponse,
  UpdateOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Description: 0,
      OperationalData: D.map(i_OpsItemDataValue),
      OperationalDataToDelete: 0,
      Notifications: D.list(i_OpsItemNotification),
      Priority: 0,
      RelatedOpsItems: D.list(i_RelatedOpsItem),
      Status: 0,
      OpsItemId: 0,
      Title: 0,
      Category: 0,
      Severity: 0,
      ActualStartTime: 0,
      ActualEndTime: 0,
      PlannedStartTime: 0,
      PlannedEndTime: 0,
      OpsItemArn: 0,
    },
  },
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
})) as any;

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
  UpdateOpsMetadataRequest,
  UpdateOpsMetadataResult,
  UpdateOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      OpsMetadataArn: 0,
      MetadataToUpdate: D.map(i_MetadataValue),
      KeysToDelete: 0,
    },
  },
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
})) as any;

export type UpdatePatchBaselineError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Modifies an existing patch baseline. Fields not specified in the request are left
 * unchanged.
 *
 * For information about valid key-value pairs in `PatchFilters` for each supported
 * operating system type, see PatchFilter.
 */
export const updatePatchBaseline: API.OperationMethod<
  UpdatePatchBaselineRequest,
  UpdatePatchBaselineResult,
  UpdatePatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      BaselineId: 0,
      Name: 0,
      GlobalFilters: i_PatchFilterGroup,
      ApprovalRules: i_PatchRuleGroup,
      ApprovedPatches: 0,
      ApprovedPatchesComplianceLevel: 0,
      ApprovedPatchesEnableNonSecurity: 0,
      RejectedPatches: 0,
      RejectedPatchesAction: 0,
      Description: 0,
      Sources: D.list(i_PatchSource),
      AvailableSecurityUpdatesComplianceStatus: 0,
      Replace: 0,
    },
    output: {
      CreatedDate: D.ts,
      ModifiedDate: D.ts,
      Sources: D.list(o_PatchSource),
    },
  },
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePatchBaseline",
})) as any;

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
  UpdateResourceDataSyncRequest,
  UpdateResourceDataSyncResult,
  UpdateResourceDataSyncError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SyncName: 0, SyncType: 0, SyncSource: i_ResourceDataSyncSource },
  },
  errors: [
    InternalServerError,
    ResourceDataSyncConflictException,
    ResourceDataSyncInvalidConfigurationException,
    ResourceDataSyncNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceDataSync",
})) as any;

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
  UpdateServiceSettingRequest,
  UpdateServiceSettingResult,
  UpdateServiceSettingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SettingId: 0, SettingValue: 0 } },
  errors: [InternalServerError, ServiceSettingNotFound, TooManyUpdates],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSetting",
})) as any;

export type ValidateCloudConnectorError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Validates the configuration and connectivity of a cloud connector.
 */
export const validateCloudConnector: API.PaginatedOperationMethod<
  ValidateCloudConnectorRequest,
  ValidateCloudConnectorResult,
  ValidateCloudConnectorError,
  Creds | HttpClient.HttpClient,
  ValidationFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CloudConnectorId: 0, MaxResults: 0, NextToken: 0 },
  },
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
})) as any;

const i_AlarmConfiguration: D.LazyStruct = () => ({
  IgnorePollAlarmFailure: 0,
  Alarms: D.list({ Name: 0 }),
});
const i_AttachmentsSource: D.LazyStruct = () => ({
  Key: 0,
  Values: 0,
  Name: 0,
});
const i_CloudConnectorConfiguration: D.LazyStruct = () => ({
  AzureConfiguration: {
    TenantId: 0,
    TenantDisplayName: 0,
    ApplicationId: 0,
    ApplicationDisplayName: 0,
    Targets: { Subscriptions: D.list({ Id: 0, DisplayName: 0 }) },
  },
});
const i_CloudWatchOutputConfig: D.LazyStruct = () => ({
  CloudWatchLogGroupName: 0,
  CloudWatchOutputEnabled: 0,
});
const i_CommandFilter: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_ComplianceStringFilter: D.LazyStruct = () => ({
  Key: 0,
  Values: 0,
  Type: 0,
});
const i_InstanceAssociationOutputLocation: D.LazyStruct = () => ({
  S3Location: {
    OutputS3Region: 0,
    OutputS3BucketName: 0,
    OutputS3KeyPrefix: 0,
  },
});
const i_InventoryAggregator: D.LazyStruct = () => ({
  Expression: 0,
  Aggregators: D.list(i_InventoryAggregator),
  Groups: D.list({ Name: 0, Filters: D.list(i_InventoryFilter) }),
});
const i_InventoryFilter: D.LazyStruct = () => ({ Key: 0, Values: 0, Type: 0 });
const i_LoggingInfo: D.LazyStruct = () => ({
  S3BucketName: 0,
  S3KeyPrefix: 0,
  S3Region: 0,
});
const i_MaintenanceWindowFilter: D.LazyStruct = () => ({ Key: 0, Values: 0 });
const i_MaintenanceWindowTaskInvocationParameters: D.LazyStruct = () => ({
  RunCommand: {
    Comment: 0,
    CloudWatchOutputConfig: i_CloudWatchOutputConfig,
    DocumentHash: 0,
    DocumentHashType: 0,
    DocumentVersion: 0,
    NotificationConfig: i_NotificationConfig,
    OutputS3BucketName: 0,
    OutputS3KeyPrefix: 0,
    Parameters: 0,
    ServiceRoleArn: 0,
    TimeoutSeconds: 0,
  },
  Automation: { DocumentVersion: 0, Parameters: 0 },
  StepFunctions: { Input: 0, Name: 0 },
  Lambda: { ClientContext: 0, Qualifier: 0, Payload: 0 },
});
const i_MaintenanceWindowTaskParameterValueExpression: D.LazyStruct = () => ({
  Values: 0,
});
const i_MetadataValue: D.LazyStruct = () => ({ Value: 0 });
const i_NodeAggregator: D.LazyStruct = () => ({
  AggregatorType: 0,
  TypeName: 0,
  AttributeName: 0,
  Aggregators: D.list(i_NodeAggregator),
});
const i_NodeFilter: D.LazyStruct = () => ({ Key: 0, Values: 0, Type: 0 });
const i_NotificationConfig: D.LazyStruct = () => ({
  NotificationArn: 0,
  NotificationEvents: 0,
  NotificationType: 0,
});
const i_OpsAggregator: D.LazyStruct = () => ({
  AggregatorType: 0,
  TypeName: 0,
  AttributeName: 0,
  Values: 0,
  Filters: D.list(i_OpsFilter),
  Aggregators: D.list(i_OpsAggregator),
});
const i_OpsFilter: D.LazyStruct = () => ({ Key: 0, Values: 0, Type: 0 });
const i_OpsItemDataValue: D.LazyStruct = () => ({ Value: 0, Type: 0 });
const i_OpsItemNotification: D.LazyStruct = () => ({ Arn: 0 });
const i_ParameterStringFilter: D.LazyStruct = () => ({
  Key: 0,
  Option: 0,
  Values: 0,
});
const i_PatchFilterGroup: D.LazyStruct = () => ({
  PatchFilters: D.list({ Key: 0, Values: 0 }),
});
const i_PatchOrchestratorFilter: D.LazyStruct = () => ({ Key: 0, Values: 0 });
const i_PatchRuleGroup: D.LazyStruct = () => ({
  PatchRules: D.list({
    PatchFilterGroup: i_PatchFilterGroup,
    ComplianceLevel: 0,
    ApproveAfterDays: 0,
    ApproveUntilDate: 0,
    EnableNonSecurity: 0,
  }),
});
const i_PatchSource: D.LazyStruct = () => ({
  Name: 0,
  Products: 0,
  Configuration: 0,
});
const i_RelatedOpsItem: D.LazyStruct = () => ({ OpsItemId: 0 });
const i_ResourceDataSyncSource: D.LazyStruct = () => ({
  SourceType: 0,
  AwsOrganizationsSource: {
    OrganizationSourceType: 0,
    OrganizationalUnits: D.list({ OrganizationalUnitId: 0 }),
  },
  SourceRegions: 0,
  IncludeFutureRegions: 0,
  EnableAllOpsDataSources: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_Target: D.LazyStruct = () => ({ Key: 0, Values: 0 });
const i_TargetLocation: D.LazyStruct = () => ({
  Accounts: 0,
  Regions: 0,
  TargetLocationMaxConcurrency: 0,
  TargetLocationMaxErrors: 0,
  ExecutionRoleName: 0,
  TargetLocationAlarmConfiguration: i_AlarmConfiguration,
  IncludeChildOrganizationUnits: 0,
  ExcludeAccounts: 0,
  Targets: D.list(i_Target),
  TargetsMaxConcurrency: 0,
  TargetsMaxErrors: 0,
});
const o_AssociationDescription: D.LazyStruct = () => ({
  Date: D.ts,
  LastUpdateAssociationDate: D.ts,
  Status: { Date: D.ts },
  LastExecutionDate: D.ts,
  LastSuccessfulExecutionDate: D.ts,
});
const o_Command: D.LazyStruct = () => ({
  ExpiresAfter: D.ts,
  RequestedDateTime: D.ts,
});
const o_ComplianceExecutionSummary: D.LazyStruct = () => ({
  ExecutionTime: D.ts,
});
const o_DocumentDescription: D.LazyStruct = () => ({
  CreatedDate: D.ts,
  ReviewInformation: D.list({ ReviewedTime: D.ts }),
});
const o_InstancePatchState: D.LazyStruct = () => ({
  OwnerInformation: D.secret,
  OperationStartTime: D.ts,
  OperationEndTime: D.ts,
  LastNoRebootInstallOperationTime: D.ts,
});
const o_MaintenanceWindowTaskInvocationParameters: D.LazyStruct = () => ({
  StepFunctions: { Input: D.secret },
  Lambda: { Payload: D.secretBlob },
});
const o_MaintenanceWindowTaskParameterValueExpression: D.LazyStruct = () => ({
  Values: D.list(D.secret),
});
const o_Parameter: D.LazyStruct = () => ({
  Value: D.secret,
  LastModifiedDate: D.ts,
});
const o_Patch: D.LazyStruct = () => ({ ReleaseDate: D.ts });
const o_PatchSource: D.LazyStruct = () => ({ Configuration: D.secret });
const o_ServiceSetting: D.LazyStruct = () => ({ LastModifiedDate: D.ts });
const o_StepExecution: D.LazyStruct = () => ({
  ExecutionStartTime: D.ts,
  ExecutionEndTime: D.ts,
});
