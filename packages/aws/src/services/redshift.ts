import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsQueryProtocol } from "../protocols/aws-query.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Redshift",
  target: "RedshiftServiceVersion20121201",
  version: "2012-12-01",
  sigv4: "redshift",
  protocol: awsQueryProtocol,
  xmlns: "http://redshift.amazonaws.com/doc/2012-12-01/",
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
                `https://redshift-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://redshift.${Region}.amazonaws.com`);
              }
              return e(
                `https://redshift-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://redshift.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://redshift.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessToClusterDeniedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessToClusterDeniedFault",
    ["BadRequestError"],
    { code: "AccessToClusterDenied", status: 400 },
  )<{ readonly message?: string }> {}
export class AccessToSnapshotDeniedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessToSnapshotDeniedFault",
    ["BadRequestError"],
    { code: "AccessToSnapshotDenied", status: 400 },
  )<{ readonly message?: string }> {}
export class AuthenticationProfileAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthenticationProfileAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class AuthenticationProfileNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthenticationProfileNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class AuthenticationProfileQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthenticationProfileQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class AuthorizationAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthorizationAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "AuthorizationAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class AuthorizationNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthorizationNotFoundFault",
    ["BadRequestError"],
    { code: "AuthorizationNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class AuthorizationQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AuthorizationQuotaExceededFault",
    ["BadRequestError"],
    { code: "AuthorizationQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class BatchDeleteRequestSizeExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "BatchDeleteRequestSizeExceededFault",
    ["BadRequestError"],
    { code: "BatchDeleteRequestSizeExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class BatchModifyClusterSnapshotsLimitExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "BatchModifyClusterSnapshotsLimitExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class BucketNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "BucketNotFoundFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ClusterAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterNotFoundFault",
    ["BadRequestError"],
    { code: "ClusterNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ClusterOnLatestRevisionFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterOnLatestRevisionFault",
    ["BadRequestError"],
    { code: "ClusterOnLatestRevision", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterParameterGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ClusterParameterGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterParameterGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterParameterGroupNotFoundFault",
    ["BadRequestError"],
    { code: "ClusterParameterGroupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ClusterParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterParameterGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "ClusterParameterGroupQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterQuotaExceededFault",
    ["BadRequestError"],
    { code: "ClusterQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterSecurityGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterSecurityGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ClusterSecurityGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterSecurityGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterSecurityGroupNotFoundFault",
    ["BadRequestError"],
    { code: "ClusterSecurityGroupNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ClusterSecurityGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterSecurityGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "QuotaExceeded.ClusterSecurityGroup", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterSnapshotAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ClusterSnapshotAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterSnapshotNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterSnapshotNotFoundFault",
    ["BadRequestError"],
    { code: "ClusterSnapshotNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ClusterSnapshotQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterSnapshotQuotaExceededFault",
    ["BadRequestError"],
    { code: "ClusterSnapshotQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterSubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterSubnetGroupAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ClusterSubnetGroupAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterSubnetGroupNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterSubnetGroupNotFoundFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterSubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterSubnetGroupQuotaExceededFault",
    ["BadRequestError"],
    { code: "ClusterSubnetGroupQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ClusterSubnetQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterSubnetQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictPolicyUpdateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictPolicyUpdateFault",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class CopyToRegionDisabledFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CopyToRegionDisabledFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CustomCnameAssociationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomCnameAssociationFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CustomDomainAssociationNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "CustomDomainAssociationNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class DependentServiceAccessDeniedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DependentServiceAccessDeniedFault",
    ["AuthError"],
    { code: "DependentServiceAccessDenied", status: 403 },
  )<{ readonly message?: string }> {}
export class DependentServiceRequestThrottlingFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DependentServiceRequestThrottlingFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DependentServiceUnavailableFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DependentServiceUnavailableFault",
    ["BadRequestError", "ServerError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class EndpointAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "EndpointAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class EndpointAuthorizationAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointAuthorizationAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "EndpointAuthorizationAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class EndpointAuthorizationNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointAuthorizationNotFoundFault",
    ["BadRequestError"],
    { code: "EndpointAuthorizationNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class EndpointAuthorizationsPerClusterLimitExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointAuthorizationsPerClusterLimitExceededFault",
    ["BadRequestError"],
    { code: "EndpointAuthorizationsPerClusterLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class EndpointNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointNotFoundFault",
    ["BadRequestError"],
    { code: "EndpointNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class EndpointsPerAuthorizationLimitExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointsPerAuthorizationLimitExceededFault",
    ["BadRequestError"],
    { code: "EndpointsPerAuthorizationLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class EndpointsPerClusterLimitExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "EndpointsPerClusterLimitExceededFault",
    ["BadRequestError"],
    { code: "EndpointsPerClusterLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class EventSubscriptionQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "EventSubscriptionQuotaExceededFault",
    ["BadRequestError"],
    { code: "EventSubscriptionQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class HsmClientCertificateAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "HsmClientCertificateAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class HsmClientCertificateNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "HsmClientCertificateNotFoundFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class HsmClientCertificateQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "HsmClientCertificateQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class HsmConfigurationAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "HsmConfigurationAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class HsmConfigurationNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "HsmConfigurationNotFoundFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class HsmConfigurationQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "HsmConfigurationQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IncompatibleOrderableOptions
  extends /*@__PURE__*/ TE.TaggedError(
    "IncompatibleOrderableOptions",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InProgressTableRestoreQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InProgressTableRestoreQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientClusterCapacityFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientClusterCapacityFault",
    ["BadRequestError"],
    { code: "InsufficientClusterCapacity", status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientS3BucketPolicyFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientS3BucketPolicyFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IntegrationAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IntegrationConflictOperationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationConflictOperationFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IntegrationConflictStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationConflictStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IntegrationNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class IntegrationQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IntegrationSourceNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationSourceNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class IntegrationTargetNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IntegrationTargetNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class InvalidAuthenticationProfileRequestFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidAuthenticationProfileRequestFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidAuthorizationStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidAuthorizationStateFault",
    ["BadRequestError"],
    { code: "InvalidAuthorizationState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidClusterParameterGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClusterParameterGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidClusterParameterGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidClusterSecurityGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClusterSecurityGroupStateFault",
    ["BadRequestError"],
    { code: "InvalidClusterSecurityGroupState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidClusterSnapshotScheduleStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClusterSnapshotScheduleStateFault",
    ["BadRequestError"],
    { code: "InvalidClusterSnapshotScheduleState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidClusterSnapshotStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClusterSnapshotStateFault",
    ["BadRequestError"],
    { code: "InvalidClusterSnapshotState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidClusterStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClusterStateFault",
    ["BadRequestError"],
    { code: "InvalidClusterState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidClusterSubnetGroupStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClusterSubnetGroupStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidClusterSubnetStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClusterSubnetStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidClusterTrackFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClusterTrackFault",
    ["BadRequestError"],
    { code: "InvalidClusterTrack", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidDataShareFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDataShareFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidElasticIpFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidElasticIpFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidEndpointStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidEndpointStateFault",
    ["BadRequestError"],
    { code: "InvalidEndpointState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidHsmClientCertificateStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidHsmClientCertificateStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidHsmConfigurationStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidHsmConfigurationStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidNamespaceFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNamespaceFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidPolicyFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPolicyFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidReservedNodeStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidReservedNodeStateFault",
    ["BadRequestError"],
    { code: "InvalidReservedNodeState", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRestoreFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRestoreFault",
    ["BadRequestError"],
    { code: "InvalidRestore", status: 406 },
  )<{ readonly message?: string }> {}
export class InvalidRetentionPeriodFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRetentionPeriodFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidS3BucketNameFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidS3BucketNameFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidS3KeyPrefixFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidS3KeyPrefixFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidScheduledActionFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidScheduledActionFault",
    ["BadRequestError"],
    { code: "InvalidScheduledAction", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidScheduleFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidScheduleFault",
    ["BadRequestError"],
    { code: "InvalidSchedule", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSnapshotCopyGrantStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSnapshotCopyGrantStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSubnet
  extends /*@__PURE__*/ TE.TaggedError("InvalidSubnet", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidSubscriptionStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSubscriptionStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTableRestoreArgumentFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTableRestoreArgumentFault",
    ["BadRequestError"],
    { code: "InvalidTableRestoreArgument", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTagFault
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagFault", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class InvalidUsageLimitFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidUsageLimitFault",
    ["BadRequestError"],
    { code: "InvalidUsageLimit", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidVPCNetworkStateFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidVPCNetworkStateFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class Ipv6CidrBlockNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "Ipv6CidrBlockNotFoundFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NumberOfNodesPerClusterLimitExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "NumberOfNodesPerClusterLimitExceededFault",
    ["BadRequestError"],
    { code: "NumberOfNodesPerClusterLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class NumberOfNodesQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "NumberOfNodesQuotaExceededFault",
    ["BadRequestError"],
    { code: "NumberOfNodesQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class PartnerNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "PartnerNotFoundFault",
    ["BadRequestError"],
    { code: "PartnerNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class Qev2IdcApplicationAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "Qev2IdcApplicationAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "Qev2IdcApplicationAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class Qev2IdcApplicationNotExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "Qev2IdcApplicationNotExistsFault",
    ["BadRequestError"],
    { code: "Qev2IdcApplicationNotExists", status: 404 },
  )<{ readonly message?: string }> {}
export class RedshiftIdcApplicationAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "RedshiftIdcApplicationAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "RedshiftIdcApplicationAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class RedshiftIdcApplicationNotExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "RedshiftIdcApplicationNotExistsFault",
    ["BadRequestError"],
    { code: "RedshiftIdcApplicationNotExists", status: 404 },
  )<{ readonly message?: string }> {}
export class RedshiftIdcApplicationQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "RedshiftIdcApplicationQuotaExceededFault",
    ["BadRequestError"],
    { code: "RedshiftIdcApplicationQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class RedshiftInvalidParameterFault
  extends /*@__PURE__*/ TE.TaggedError(
    "RedshiftInvalidParameterFault",
    ["BadRequestError"],
    { code: "RedshiftInvalidParameter", status: 400 },
  )<{ readonly message?: string }> {}
export class ReservedNodeAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedNodeAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ReservedNodeAlreadyExists", status: 404 },
  )<{ readonly message?: string }> {}
export class ReservedNodeAlreadyMigratedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedNodeAlreadyMigratedFault",
    ["BadRequestError"],
    { code: "ReservedNodeAlreadyMigrated", status: 400 },
  )<{ readonly message?: string }> {}
export class ReservedNodeExchangeNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedNodeExchangeNotFoundFault",
    ["BadRequestError"],
    { code: "ReservedNodeExchangeNotFond", status: 404 },
  )<{ readonly message?: string }> {}
export class ReservedNodeNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedNodeNotFoundFault",
    ["BadRequestError"],
    { code: "ReservedNodeNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ReservedNodeOfferingNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedNodeOfferingNotFoundFault",
    ["BadRequestError"],
    { code: "ReservedNodeOfferingNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ReservedNodeQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ReservedNodeQuotaExceededFault",
    ["BadRequestError"],
    { code: "ReservedNodeQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ResizeNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ResizeNotFoundFault",
    ["BadRequestError"],
    { code: "ResizeNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ScheduledActionAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ScheduledActionAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "ScheduledActionAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class ScheduledActionNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ScheduledActionNotFoundFault",
    ["BadRequestError"],
    { code: "ScheduledActionNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class ScheduledActionQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ScheduledActionQuotaExceededFault",
    ["BadRequestError"],
    { code: "ScheduledActionQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ScheduledActionTypeUnsupportedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ScheduledActionTypeUnsupportedFault",
    ["BadRequestError"],
    { code: "ScheduledActionTypeUnsupported", status: 400 },
  )<{ readonly message?: string }> {}
export class ScheduleDefinitionTypeUnsupportedFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ScheduleDefinitionTypeUnsupportedFault",
    ["BadRequestError"],
    { code: "ScheduleDefinitionTypeUnsupported", status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotCopyAlreadyDisabledFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotCopyAlreadyDisabledFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotCopyAlreadyEnabledFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotCopyAlreadyEnabledFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotCopyDisabledFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotCopyDisabledFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotCopyGrantAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotCopyGrantAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotCopyGrantNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotCopyGrantNotFoundFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotCopyGrantQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotCopyGrantQuotaExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotScheduleAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotScheduleAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "SnapshotScheduleAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotScheduleNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotScheduleNotFoundFault",
    ["BadRequestError"],
    { code: "SnapshotScheduleNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotScheduleQuotaExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotScheduleQuotaExceededFault",
    ["BadRequestError"],
    { code: "SnapshotScheduleQuotaExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class SnapshotScheduleUpdateInProgressFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotScheduleUpdateInProgressFault",
    ["BadRequestError"],
    { code: "SnapshotScheduleUpdateInProgress", status: 400 },
  )<{ readonly message?: string }> {}
export class SNSInvalidTopicFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SNSInvalidTopicFault",
    ["BadRequestError"],
    { code: "SNSInvalidTopic", status: 400 },
  )<{ readonly message?: string }> {}
export class SNSNoAuthorizationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SNSNoAuthorizationFault",
    ["BadRequestError"],
    { code: "SNSNoAuthorization", status: 400 },
  )<{ readonly message?: string }> {}
export class SNSTopicArnNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SNSTopicArnNotFoundFault",
    ["BadRequestError"],
    { code: "SNSTopicArnNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class SourceNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SourceNotFoundFault",
    ["BadRequestError"],
    { code: "SourceNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class SubnetAlreadyInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetAlreadyInUse",
    ["BadRequestError", "DependencyViolationError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SubscriptionAlreadyExistFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionAlreadyExistFault",
    ["BadRequestError"],
    { code: "SubscriptionAlreadyExist", status: 400 },
  )<{ readonly message?: string }> {}
export class SubscriptionCategoryNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionCategoryNotFoundFault",
    ["BadRequestError"],
    { code: "SubscriptionCategoryNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class SubscriptionEventIdNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionEventIdNotFoundFault",
    ["BadRequestError"],
    { code: "SubscriptionEventIdNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class SubscriptionNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionNotFoundFault",
    ["BadRequestError"],
    { code: "SubscriptionNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class SubscriptionSeverityNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionSeverityNotFoundFault",
    ["BadRequestError"],
    { code: "SubscriptionSeverityNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class TableLimitExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "TableLimitExceededFault",
    ["BadRequestError"],
    { code: "TableLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class TableRestoreNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "TableRestoreNotFoundFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TagLimitExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "TagLimitExceededFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnauthorizedOperation
  extends /*@__PURE__*/ TE.TaggedError(
    "UnauthorizedOperation",
    ["BadRequestError", "AuthError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnauthorizedPartnerIntegrationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UnauthorizedPartnerIntegrationFault",
    ["AuthError"],
    { code: "UnauthorizedPartnerIntegration", status: 401 },
  )<{ readonly message?: string }> {}
export class UnknownSnapshotCopyRegionFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UnknownSnapshotCopyRegionFault",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class UnsupportedOperationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedOperationFault",
    ["BadRequestError"],
    { code: "UnsupportedOperation", status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedOptionFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedOptionFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UsageLimitAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UsageLimitAlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "UsageLimitAlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class UsageLimitNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "UsageLimitNotFoundFault",
    ["BadRequestError"],
    { code: "UsageLimitNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export interface AcceptReservedNodeExchangeInputMessage {
  ReservedNodeId?: string;
  TargetReservedNodeOfferingId?: string;
}
export interface RecurringCharge {
  RecurringChargeAmount?: number;
  RecurringChargeFrequency?: string;
}
export type RecurringChargeList = RecurringCharge[];
export type ReservedNodeOfferingType = "Regular" | "Upgradable" | (string & {});
export interface ReservedNode {
  ReservedNodeId?: string;
  ReservedNodeOfferingId?: string;
  NodeType?: string;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  NodeCount?: number;
  State?: string;
  OfferingType?: string;
  RecurringCharges?: RecurringCharge[];
  ReservedNodeOfferingType?: ReservedNodeOfferingType;
}
export interface AcceptReservedNodeExchangeOutputMessage {
  ExchangedReservedNode?: ReservedNode;
}
export type PartnerIntegrationAccountId = string;
export type PartnerIntegrationClusterIdentifier = string;
export type PartnerIntegrationDatabaseName = string;
export type PartnerIntegrationPartnerName = string;
export interface PartnerIntegrationInputMessage {
  AccountId?: string;
  ClusterIdentifier?: string;
  DatabaseName?: string;
  PartnerName?: string;
}
export interface PartnerIntegrationOutputMessage {
  DatabaseName?: string;
  PartnerName?: string;
}
export interface AssociateDataShareConsumerMessage {
  DataShareArn?: string;
  AssociateEntireAccount?: boolean;
  ConsumerArn?: string;
  ConsumerRegion?: string;
  AllowWrites?: boolean;
}
export type DataShareStatus =
  | "ACTIVE"
  | "PENDING_AUTHORIZATION"
  | "AUTHORIZED"
  | "DEAUTHORIZED"
  | "REJECTED"
  | "AVAILABLE"
  | (string & {});
export interface DataShareAssociation {
  ConsumerIdentifier?: string;
  Status?: DataShareStatus;
  ConsumerRegion?: string;
  CreatedDate?: Date;
  StatusChangeDate?: Date;
  ProducerAllowedWrites?: boolean;
  ConsumerAcceptedWrites?: boolean;
}
export type DataShareAssociationList = DataShareAssociation[];
export type DataShareType = "INTERNAL" | (string & {});
export interface DataShare {
  DataShareArn?: string;
  ProducerArn?: string;
  AllowPubliclyAccessibleConsumers?: boolean;
  DataShareAssociations?: DataShareAssociation[];
  ManagedBy?: string;
  DataShareType?: DataShareType;
}
export interface AuthorizeClusterSecurityGroupIngressMessage {
  ClusterSecurityGroupName?: string;
  CIDRIP?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface EC2SecurityGroup {
  Status?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
  Tags?: Tag[];
}
export type EC2SecurityGroupList = EC2SecurityGroup[];
export interface IPRange {
  Status?: string;
  CIDRIP?: string;
  Tags?: Tag[];
}
export type IPRangeList = IPRange[];
export interface ClusterSecurityGroup {
  ClusterSecurityGroupName?: string;
  Description?: string;
  EC2SecurityGroups?: EC2SecurityGroup[];
  IPRanges?: IPRange[];
  Tags?: Tag[];
}
export interface AuthorizeClusterSecurityGroupIngressResult {
  ClusterSecurityGroup?: ClusterSecurityGroup;
}
export interface AuthorizeDataShareMessage {
  DataShareArn?: string;
  ConsumerIdentifier?: string;
  AllowWrites?: boolean;
}
export type VpcIdentifierList = string[];
export interface AuthorizeEndpointAccessMessage {
  ClusterIdentifier?: string;
  Account?: string;
  VpcIds?: string[];
}
export type AuthorizationStatus = "Authorized" | "Revoking" | (string & {});
export interface EndpointAuthorization {
  Grantor?: string;
  Grantee?: string;
  ClusterIdentifier?: string;
  AuthorizeTime?: Date;
  ClusterStatus?: string;
  Status?: AuthorizationStatus;
  AllowedAllVPCs?: boolean;
  AllowedVPCs?: string[];
  EndpointCount?: number;
}
export interface AuthorizeSnapshotAccessMessage {
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotClusterIdentifier?: string;
  AccountWithRestoreAccess?: string;
}
export interface AccountWithRestoreAccess {
  AccountId?: string;
  AccountAlias?: string;
}
export type AccountsWithRestoreAccessList = AccountWithRestoreAccess[];
export type RestorableNodeTypeList = string[];
export interface Snapshot {
  SnapshotIdentifier?: string;
  ClusterIdentifier?: string;
  SnapshotCreateTime?: Date;
  Status?: string;
  Port?: number;
  AvailabilityZone?: string;
  ClusterCreateTime?: Date;
  MasterUsername?: string;
  ClusterVersion?: string;
  EngineFullVersion?: string;
  SnapshotType?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  DBName?: string;
  VpcId?: string;
  Encrypted?: boolean;
  KmsKeyId?: string;
  EncryptedWithHSM?: boolean;
  AccountsWithRestoreAccess?: AccountWithRestoreAccess[];
  OwnerAccount?: string;
  TotalBackupSizeInMegaBytes?: number;
  ActualIncrementalBackupSizeInMegaBytes?: number;
  BackupProgressInMegaBytes?: number;
  CurrentBackupRateInMegaBytesPerSecond?: number;
  EstimatedSecondsToCompletion?: number;
  ElapsedTimeInSeconds?: number;
  SourceRegion?: string;
  Tags?: Tag[];
  RestorableNodeTypes?: string[];
  EnhancedVpcRouting?: boolean;
  MaintenanceTrackName?: string;
  ManualSnapshotRetentionPeriod?: number;
  ManualSnapshotRemainingDays?: number;
  SnapshotRetentionStartTime?: Date;
  MasterPasswordSecretArn?: string;
  MasterPasswordSecretKmsKeyId?: string;
  SnapshotArn?: string;
}
export interface AuthorizeSnapshotAccessResult {
  Snapshot?: Snapshot;
}
export interface DeleteClusterSnapshotMessage {
  SnapshotIdentifier?: string;
  SnapshotClusterIdentifier?: string;
}
export type DeleteClusterSnapshotMessageList = DeleteClusterSnapshotMessage[];
export interface BatchDeleteClusterSnapshotsRequest {
  Identifiers?: DeleteClusterSnapshotMessage[];
}
export type SnapshotIdentifierList = string[];
export interface SnapshotErrorMessage {
  SnapshotIdentifier?: string;
  SnapshotClusterIdentifier?: string;
  FailureCode?: string;
  FailureReason?: string;
}
export type BatchSnapshotOperationErrorList = SnapshotErrorMessage[];
export interface BatchDeleteClusterSnapshotsResult {
  Resources?: string[];
  Errors?: SnapshotErrorMessage[];
}
export interface BatchModifyClusterSnapshotsMessage {
  SnapshotIdentifierList?: string[];
  ManualSnapshotRetentionPeriod?: number;
  Force?: boolean;
}
export type BatchSnapshotOperationErrors = SnapshotErrorMessage[];
export interface BatchModifyClusterSnapshotsOutputMessage {
  Resources?: string[];
  Errors?: SnapshotErrorMessage[];
}
export interface CancelResizeMessage {
  ClusterIdentifier?: string;
}
export type ImportTablesCompleted = string[];
export type ImportTablesInProgress = string[];
export type ImportTablesNotStarted = string[];
export interface ResizeProgressMessage {
  TargetNodeType?: string;
  TargetNumberOfNodes?: number;
  TargetClusterType?: string;
  Status?: string;
  ImportTablesCompleted?: string[];
  ImportTablesInProgress?: string[];
  ImportTablesNotStarted?: string[];
  AvgResizeRateInMegaBytesPerSecond?: number;
  TotalResizeDataInMegaBytes?: number;
  ProgressInMegaBytes?: number;
  ElapsedTimeInSeconds?: number;
  EstimatedTimeToCompletionInSeconds?: number;
  ResizeType?: string;
  Message?: string;
  TargetEncryptionType?: string;
  DataTransferProgressPercent?: number;
}
export interface CopyClusterSnapshotMessage {
  SourceSnapshotIdentifier?: string;
  SourceSnapshotClusterIdentifier?: string;
  TargetSnapshotIdentifier?: string;
  ManualSnapshotRetentionPeriod?: number;
}
export interface CopyClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export type AuthenticationProfileNameString = string;
export interface CreateAuthenticationProfileMessage {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export interface CreateAuthenticationProfileResult {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export type SensitiveString = string | redacted.Redacted<string>;
export type ClusterSecurityGroupNameList = string[];
export type VpcSecurityGroupIdList = string[];
export type IamRoleArnList = string[];
export type AquaConfigurationStatus =
  | "enabled"
  | "disabled"
  | "auto"
  | (string & {});
export type CatalogNameString = string;
export interface CreateClusterMessage {
  DBName?: string;
  ClusterIdentifier?: string;
  ClusterType?: string;
  NodeType?: string;
  MasterUsername?: string;
  MasterUserPassword?: string | redacted.Redacted<string>;
  ClusterSecurityGroups?: string[];
  VpcSecurityGroupIds?: string[];
  ClusterSubnetGroupName?: string;
  AvailabilityZone?: string;
  PreferredMaintenanceWindow?: string;
  ClusterParameterGroupName?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  Port?: number;
  ClusterVersion?: string;
  AllowVersionUpgrade?: boolean;
  NumberOfNodes?: number;
  PubliclyAccessible?: boolean;
  Encrypted?: boolean;
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  ElasticIp?: string;
  Tags?: Tag[];
  KmsKeyId?: string;
  EnhancedVpcRouting?: boolean;
  AdditionalInfo?: string;
  IamRoles?: string[];
  MaintenanceTrackName?: string;
  SnapshotScheduleIdentifier?: string;
  AvailabilityZoneRelocation?: boolean;
  AquaConfigurationStatus?: AquaConfigurationStatus;
  DefaultIamRoleArn?: string;
  LoadSampleData?: string;
  ManageMasterPassword?: boolean;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: boolean;
  RedshiftIdcApplicationArn?: string;
  CatalogName?: string;
  ExtraComputeForAutomaticOptimization?: boolean;
}
export interface NetworkInterface {
  NetworkInterfaceId?: string;
  SubnetId?: string;
  PrivateIpAddress?: string;
  AvailabilityZone?: string;
  Ipv6Address?: string;
}
export type NetworkInterfaceList = NetworkInterface[];
export interface VpcEndpoint {
  VpcEndpointId?: string;
  VpcId?: string;
  NetworkInterfaces?: NetworkInterface[];
}
export type VpcEndpointsList = VpcEndpoint[];
export interface Endpoint {
  Address?: string;
  Port?: number;
  VpcEndpoints?: VpcEndpoint[];
}
export interface ClusterSecurityGroupMembership {
  ClusterSecurityGroupName?: string;
  Status?: string;
}
export type ClusterSecurityGroupMembershipList =
  ClusterSecurityGroupMembership[];
export interface VpcSecurityGroupMembership {
  VpcSecurityGroupId?: string;
  Status?: string;
}
export type VpcSecurityGroupMembershipList = VpcSecurityGroupMembership[];
export interface ClusterParameterStatus {
  ParameterName?: string;
  ParameterApplyStatus?: string;
  ParameterApplyErrorDescription?: string;
}
export type ClusterParameterStatusList = ClusterParameterStatus[];
export interface ClusterParameterGroupStatus {
  ParameterGroupName?: string;
  ParameterApplyStatus?: string;
  ClusterParameterStatusList?: ClusterParameterStatus[];
}
export type ClusterParameterGroupStatusList = ClusterParameterGroupStatus[];
export interface PendingModifiedValues {
  MasterUserPassword?: string | redacted.Redacted<string>;
  NodeType?: string;
  NumberOfNodes?: number;
  ClusterType?: string;
  ClusterVersion?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ClusterIdentifier?: string;
  PubliclyAccessible?: boolean;
  EnhancedVpcRouting?: boolean;
  MaintenanceTrackName?: string;
  EncryptionType?: string;
}
export interface RestoreStatus {
  Status?: string;
  CurrentRestoreRateInMegaBytesPerSecond?: number;
  SnapshotSizeInMegaBytes?: number;
  ProgressInMegaBytes?: number;
  ElapsedTimeInSeconds?: number;
  EstimatedTimeToCompletionInSeconds?: number;
}
export interface DataTransferProgress {
  Status?: string;
  CurrentRateInMegaBytesPerSecond?: number;
  TotalDataInMegaBytes?: number;
  DataTransferredInMegaBytes?: number;
  EstimatedTimeToCompletionInSeconds?: number;
  ElapsedTimeInSeconds?: number;
}
export interface HsmStatus {
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  Status?: string;
}
export interface ClusterSnapshotCopyStatus {
  DestinationRegion?: string;
  RetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  SnapshotCopyGrantName?: string;
}
export interface ClusterNode {
  NodeRole?: string;
  PrivateIPAddress?: string;
  PublicIPAddress?: string;
}
export type ClusterNodesList = ClusterNode[];
export interface ElasticIpStatus {
  ElasticIp?: string;
  Status?: string;
}
export interface ClusterIamRole {
  IamRoleArn?: string;
  ApplyStatus?: string;
}
export type ClusterIamRoleList = ClusterIamRole[];
export type PendingActionsList = string[];
export interface DeferredMaintenanceWindow {
  DeferMaintenanceIdentifier?: string;
  DeferMaintenanceStartTime?: Date;
  DeferMaintenanceEndTime?: Date;
}
export type DeferredMaintenanceWindowsList = DeferredMaintenanceWindow[];
export type ScheduleState = "MODIFYING" | "ACTIVE" | "FAILED" | (string & {});
export interface ResizeInfo {
  ResizeType?: string;
  AllowCancelResize?: boolean;
}
export type AquaStatus = "enabled" | "disabled" | "applying" | (string & {});
export interface AquaConfiguration {
  AquaStatus?: AquaStatus;
  AquaConfigurationStatus?: AquaConfigurationStatus;
}
export type ReservedNodeExchangeStatusType =
  | "REQUESTED"
  | "PENDING"
  | "IN_PROGRESS"
  | "RETRYING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export interface ReservedNodeExchangeStatus {
  ReservedNodeExchangeRequestId?: string;
  Status?: ReservedNodeExchangeStatusType;
  RequestTime?: Date;
  SourceReservedNodeId?: string;
  SourceReservedNodeType?: string;
  SourceReservedNodeCount?: number;
  TargetReservedNodeOfferingId?: string;
  TargetReservedNodeType?: string;
  TargetReservedNodeCount?: number;
}
export interface SecondaryClusterInfo {
  AvailabilityZone?: string;
  ClusterNodes?: ClusterNode[];
}
export type LogTypeList = string[];
export type S3TableLastIngestionTimeMap = { [key: string]: string | undefined };
export interface S3TablePublishStatus {
  S3Tables?: string[];
  S3TableNamespace?: string;
  S3TableGranularity?: string;
  EnabledAll?: boolean;
  LastIngestionTimes?: { [key: string]: string | undefined };
}
export interface LoggingPublishStatus {
  S3Tables?: S3TablePublishStatus;
}
export interface Cluster {
  ClusterIdentifier?: string;
  NodeType?: string;
  ClusterStatus?: string;
  ClusterAvailabilityStatus?: string;
  ModifyStatus?: string;
  MasterUsername?: string;
  DBName?: string;
  Endpoint?: Endpoint;
  ClusterCreateTime?: Date;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  ClusterSecurityGroups?: ClusterSecurityGroupMembership[];
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  ClusterParameterGroups?: ClusterParameterGroupStatus[];
  ClusterSubnetGroupName?: string;
  VpcId?: string;
  AvailabilityZone?: string;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: PendingModifiedValues;
  ClusterVersion?: string;
  AllowVersionUpgrade?: boolean;
  NumberOfNodes?: number;
  PubliclyAccessible?: boolean;
  Encrypted?: boolean;
  RestoreStatus?: RestoreStatus;
  DataTransferProgress?: DataTransferProgress;
  HsmStatus?: HsmStatus;
  ClusterSnapshotCopyStatus?: ClusterSnapshotCopyStatus;
  ClusterPublicKey?: string;
  ClusterNodes?: ClusterNode[];
  ElasticIpStatus?: ElasticIpStatus;
  ClusterRevisionNumber?: string;
  Tags?: Tag[];
  KmsKeyId?: string;
  EnhancedVpcRouting?: boolean;
  IamRoles?: ClusterIamRole[];
  PendingActions?: string[];
  MaintenanceTrackName?: string;
  ElasticResizeNumberOfNodeOptions?: string;
  DeferredMaintenanceWindows?: DeferredMaintenanceWindow[];
  SnapshotScheduleIdentifier?: string;
  SnapshotScheduleState?: ScheduleState;
  ExpectedNextSnapshotScheduleTime?: Date;
  ExpectedNextSnapshotScheduleTimeStatus?: string;
  NextMaintenanceWindowStartTime?: Date;
  ResizeInfo?: ResizeInfo;
  AvailabilityZoneRelocationStatus?: string;
  ClusterNamespaceArn?: string;
  TotalStorageCapacityInMegaBytes?: number;
  AquaConfiguration?: AquaConfiguration;
  DefaultIamRoleArn?: string;
  ReservedNodeExchangeStatus?: ReservedNodeExchangeStatus;
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  CustomDomainCertificateExpiryDate?: Date;
  MasterPasswordSecretArn?: string;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: string;
  MultiAZSecondary?: SecondaryClusterInfo;
  LakehouseRegistrationStatus?: string;
  CatalogArn?: string;
  ExtraComputeForAutomaticOptimization?: string;
  LoggingPublishStatus?: LoggingPublishStatus;
}
export interface CreateClusterResult {
  Cluster?: Cluster;
}
export interface CreateClusterParameterGroupMessage {
  ParameterGroupName?: string;
  ParameterGroupFamily?: string;
  Description?: string;
  Tags?: Tag[];
}
export interface ClusterParameterGroup {
  ParameterGroupName?: string;
  ParameterGroupFamily?: string;
  Description?: string;
  Tags?: Tag[];
}
export interface CreateClusterParameterGroupResult {
  ClusterParameterGroup?: ClusterParameterGroup;
}
export interface CreateClusterSecurityGroupMessage {
  ClusterSecurityGroupName?: string;
  Description?: string;
  Tags?: Tag[];
}
export interface CreateClusterSecurityGroupResult {
  ClusterSecurityGroup?: ClusterSecurityGroup;
}
export interface CreateClusterSnapshotMessage {
  SnapshotIdentifier?: string;
  ClusterIdentifier?: string;
  ManualSnapshotRetentionPeriod?: number;
  Tags?: Tag[];
}
export interface CreateClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export type SubnetIdentifierList = string[];
export interface CreateClusterSubnetGroupMessage {
  ClusterSubnetGroupName?: string;
  Description?: string;
  SubnetIds?: string[];
  Tags?: Tag[];
}
export interface SupportedPlatform {
  Name?: string;
}
export type SupportedPlatformsList = SupportedPlatform[];
export interface AvailabilityZone {
  Name?: string;
  SupportedPlatforms?: SupportedPlatform[];
}
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AvailabilityZone;
  SubnetStatus?: string;
}
export type SubnetList = Subnet[];
export type ValueStringList = string[];
export interface ClusterSubnetGroup {
  ClusterSubnetGroupName?: string;
  Description?: string;
  VpcId?: string;
  SubnetGroupStatus?: string;
  Subnets?: Subnet[];
  Tags?: Tag[];
  SupportedClusterIpAddressTypes?: string[];
}
export interface CreateClusterSubnetGroupResult {
  ClusterSubnetGroup?: ClusterSubnetGroup;
}
export type CustomDomainNameString = string;
export type CustomDomainCertificateArnString = string;
export interface CreateCustomDomainAssociationMessage {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
}
export interface CreateCustomDomainAssociationResult {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
  CustomDomainCertExpiryTime?: string;
}
export interface CreateEndpointAccessMessage {
  ClusterIdentifier?: string;
  ResourceOwner?: string;
  EndpointName?: string;
  SubnetGroupName?: string;
  VpcSecurityGroupIds?: string[];
}
export interface EndpointAccess {
  ClusterIdentifier?: string;
  ResourceOwner?: string;
  SubnetGroupName?: string;
  EndpointStatus?: string;
  EndpointName?: string;
  EndpointCreateTime?: Date;
  Port?: number;
  Address?: string;
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  VpcEndpoint?: VpcEndpoint;
}
export type SourceIdsList = string[];
export type EventCategoriesList = string[];
export interface CreateEventSubscriptionMessage {
  SubscriptionName?: string;
  SnsTopicArn?: string;
  SourceType?: string;
  SourceIds?: string[];
  EventCategories?: string[];
  Severity?: string;
  Enabled?: boolean;
  Tags?: Tag[];
}
export interface EventSubscription {
  CustomerAwsId?: string;
  CustSubscriptionId?: string;
  SnsTopicArn?: string;
  Status?: string;
  SubscriptionCreationTime?: Date;
  SourceType?: string;
  SourceIdsList?: string[];
  EventCategoriesList?: string[];
  Severity?: string;
  Enabled?: boolean;
  Tags?: Tag[];
}
export interface CreateEventSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export interface CreateHsmClientCertificateMessage {
  HsmClientCertificateIdentifier?: string;
  Tags?: Tag[];
}
export interface HsmClientCertificate {
  HsmClientCertificateIdentifier?: string;
  HsmClientCertificatePublicKey?: string;
  Tags?: Tag[];
}
export interface CreateHsmClientCertificateResult {
  HsmClientCertificate?: HsmClientCertificate;
}
export interface CreateHsmConfigurationMessage {
  HsmConfigurationIdentifier?: string;
  Description?: string;
  HsmIpAddress?: string;
  HsmPartitionName?: string;
  HsmPartitionPassword?: string;
  HsmServerPublicCertificate?: string;
  Tags?: Tag[];
}
export interface HsmConfiguration {
  HsmConfigurationIdentifier?: string;
  Description?: string;
  HsmIpAddress?: string;
  HsmPartitionName?: string;
  Tags?: Tag[];
}
export interface CreateHsmConfigurationResult {
  HsmConfiguration?: HsmConfiguration;
}
export type SourceArn = string;
export type TargetArn = string;
export type IntegrationName = string;
export type EncryptionContextMap = { [key: string]: string | undefined };
export type IntegrationDescription = string;
export interface CreateIntegrationMessage {
  SourceArn?: string;
  TargetArn?: string;
  IntegrationName?: string;
  KMSKeyId?: string;
  TagList?: Tag[];
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Description?: string;
}
export type IntegrationArn = string;
export type ZeroETLIntegrationStatus =
  | "creating"
  | "active"
  | "modifying"
  | "failed"
  | "deleting"
  | "syncing"
  | "needs_attention"
  | (string & {});
export interface IntegrationError {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type IntegrationErrorList = IntegrationError[];
export type Description = string;
export interface Integration {
  IntegrationArn?: string;
  IntegrationName?: string;
  SourceArn?: string;
  TargetArn?: string;
  Status?: ZeroETLIntegrationStatus;
  Errors?: (IntegrationError & { ErrorCode: string })[];
  CreateTime?: Date;
  Description?: string;
  KMSKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
}
export type Qev2IdcApplicationName = string;
export type IdcDisplayNameString = string;
export interface CreateQev2IdcApplicationMessage {
  IdcInstanceArn?: string;
  Qev2IdcApplicationName?: string;
  IdcDisplayName?: string;
  Tags?: Tag[];
}
export interface Qev2IdcApplication {
  IdcInstanceArn?: string;
  Qev2IdcApplicationName?: string;
  Qev2IdcApplicationArn?: string;
  IdcManagedApplicationArn?: string;
  IdcOnboardStatus?: string;
  IdcDisplayName?: string;
  Tags?: Tag[];
}
export interface CreateQev2IdcApplicationResult {
  Qev2IdcApplication?: Qev2IdcApplication;
}
export type RedshiftIdcApplicationName = string;
export type IdentityNamespaceString = string;
export type AuthorizedAudienceList = string[];
export interface AuthorizedTokenIssuer {
  TrustedTokenIssuerArn?: string;
  AuthorizedAudiencesList?: string[];
}
export type AuthorizedTokenIssuerList = AuthorizedTokenIssuer[];
export type ServiceAuthorization = "Enabled" | "Disabled" | (string & {});
export interface LakeFormationQuery {
  Authorization?: ServiceAuthorization;
}
export type LakeFormationScopeUnion = {
  LakeFormationQuery: LakeFormationQuery;
};
export type LakeFormationServiceIntegrations = LakeFormationScopeUnion[];
export interface ReadWriteAccess {
  Authorization?: ServiceAuthorization;
}
export type S3AccessGrantsScopeUnion = { ReadWriteAccess: ReadWriteAccess };
export type S3AccessGrantsServiceIntegrations = S3AccessGrantsScopeUnion[];
export interface Connect {
  Authorization?: ServiceAuthorization;
}
export type RedshiftScopeUnion = { Connect: Connect };
export type RedshiftServiceIntegrations = RedshiftScopeUnion[];
export type ServiceIntegrationsUnion =
  | {
      LakeFormation: LakeFormationScopeUnion[];
      S3AccessGrants?: never;
      Redshift?: never;
    }
  | {
      LakeFormation?: never;
      S3AccessGrants: S3AccessGrantsScopeUnion[];
      Redshift?: never;
    }
  | {
      LakeFormation?: never;
      S3AccessGrants?: never;
      Redshift: RedshiftScopeUnion[];
    };
export type ServiceIntegrationList = ServiceIntegrationsUnion[];
export type ApplicationType = "None" | "Lakehouse" | (string & {});
export type TagKeyList = string[];
export interface CreateRedshiftIdcApplicationMessage {
  IdcInstanceArn?: string;
  RedshiftIdcApplicationName?: string;
  IdentityNamespace?: string;
  IdcDisplayName?: string;
  IamRoleArn?: string;
  AuthorizedTokenIssuerList?: AuthorizedTokenIssuer[];
  ServiceIntegrations?: ServiceIntegrationsUnion[];
  ApplicationType?: ApplicationType;
  Tags?: Tag[];
  SsoTagKeys?: string[];
}
export interface RedshiftIdcApplication {
  IdcInstanceArn?: string;
  RedshiftIdcApplicationName?: string;
  RedshiftIdcApplicationArn?: string;
  IdentityNamespace?: string;
  IdcDisplayName?: string;
  IamRoleArn?: string;
  IdcManagedApplicationArn?: string;
  IdcOnboardStatus?: string;
  AuthorizedTokenIssuerList?: AuthorizedTokenIssuer[];
  ServiceIntegrations?: ServiceIntegrationsUnion[];
  ApplicationType?: ApplicationType;
  Tags?: Tag[];
  SsoTagKeys?: string[];
}
export interface CreateRedshiftIdcApplicationResult {
  RedshiftIdcApplication?: RedshiftIdcApplication;
}
export interface ResizeClusterMessage {
  ClusterIdentifier?: string;
  ClusterType?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  Classic?: boolean;
  ReservedNodeId?: string;
  TargetReservedNodeOfferingId?: string;
}
export interface PauseClusterMessage {
  ClusterIdentifier?: string;
}
export interface ResumeClusterMessage {
  ClusterIdentifier?: string;
}
export interface ScheduledActionType {
  ResizeCluster?: ResizeClusterMessage;
  PauseCluster?: PauseClusterMessage;
  ResumeCluster?: ResumeClusterMessage;
}
export interface CreateScheduledActionMessage {
  ScheduledActionName?: string;
  TargetAction?: ScheduledActionType;
  Schedule?: string;
  IamRole?: string;
  ScheduledActionDescription?: string;
  StartTime?: Date;
  EndTime?: Date;
  Enable?: boolean;
}
export type ScheduledActionState = "ACTIVE" | "DISABLED" | (string & {});
export type ScheduledActionTimeList = Date[];
export interface ScheduledAction {
  ScheduledActionName?: string;
  TargetAction?: ScheduledActionType & {
    ResizeCluster: ResizeClusterMessage & { ClusterIdentifier: string };
    PauseCluster: PauseClusterMessage & { ClusterIdentifier: string };
    ResumeCluster: ResumeClusterMessage & { ClusterIdentifier: string };
  };
  Schedule?: string;
  IamRole?: string;
  ScheduledActionDescription?: string;
  State?: ScheduledActionState;
  NextInvocations?: Date[];
  StartTime?: Date;
  EndTime?: Date;
}
export interface CreateSnapshotCopyGrantMessage {
  SnapshotCopyGrantName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export interface SnapshotCopyGrant {
  SnapshotCopyGrantName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export interface CreateSnapshotCopyGrantResult {
  SnapshotCopyGrant?: SnapshotCopyGrant;
}
export type ScheduleDefinitionList = string[];
export interface CreateSnapshotScheduleMessage {
  ScheduleDefinitions?: string[];
  ScheduleIdentifier?: string;
  ScheduleDescription?: string;
  Tags?: Tag[];
  DryRun?: boolean;
  NextInvocations?: number;
}
export type ScheduledSnapshotTimeList = Date[];
export interface ClusterAssociatedToSchedule {
  ClusterIdentifier?: string;
  ScheduleAssociationState?: ScheduleState;
}
export type AssociatedClusterList = ClusterAssociatedToSchedule[];
export interface SnapshotSchedule {
  ScheduleDefinitions?: string[];
  ScheduleIdentifier?: string;
  ScheduleDescription?: string;
  Tags?: Tag[];
  NextInvocations?: Date[];
  AssociatedClusterCount?: number;
  AssociatedClusters?: ClusterAssociatedToSchedule[];
}
export interface CreateTagsMessage {
  ResourceName?: string;
  Tags?: Tag[];
}
export interface CreateTagsResponse {}
export type UsageLimitFeatureType =
  | "spectrum"
  | "concurrency-scaling"
  | "cross-region-datasharing"
  | "extra-compute-for-automatic-optimization"
  | (string & {});
export type UsageLimitLimitType = "time" | "data-scanned" | (string & {});
export type UsageLimitPeriod = "daily" | "weekly" | "monthly" | (string & {});
export type UsageLimitBreachAction =
  | "log"
  | "emit-metric"
  | "disable"
  | (string & {});
export interface CreateUsageLimitMessage {
  ClusterIdentifier?: string;
  FeatureType?: UsageLimitFeatureType;
  LimitType?: UsageLimitLimitType;
  Amount?: number;
  Period?: UsageLimitPeriod;
  BreachAction?: UsageLimitBreachAction;
  Tags?: Tag[];
}
export interface UsageLimit {
  UsageLimitId?: string;
  ClusterIdentifier?: string;
  FeatureType?: UsageLimitFeatureType;
  LimitType?: UsageLimitLimitType;
  Amount?: number;
  Period?: UsageLimitPeriod;
  BreachAction?: UsageLimitBreachAction;
  Tags?: Tag[];
}
export interface DeauthorizeDataShareMessage {
  DataShareArn?: string;
  ConsumerIdentifier?: string;
}
export interface DeleteAuthenticationProfileMessage {
  AuthenticationProfileName?: string;
}
export interface DeleteAuthenticationProfileResult {
  AuthenticationProfileName?: string;
}
export interface DeleteClusterMessage {
  ClusterIdentifier?: string;
  SkipFinalClusterSnapshot?: boolean;
  FinalClusterSnapshotIdentifier?: string;
  FinalClusterSnapshotRetentionPeriod?: number;
}
export interface DeleteClusterResult {
  Cluster?: Cluster;
}
export interface DeleteClusterParameterGroupMessage {
  ParameterGroupName?: string;
}
export interface DeleteClusterParameterGroupResponse {}
export interface DeleteClusterSecurityGroupMessage {
  ClusterSecurityGroupName?: string;
}
export interface DeleteClusterSecurityGroupResponse {}
export interface DeleteClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export interface DeleteClusterSubnetGroupMessage {
  ClusterSubnetGroupName?: string;
}
export interface DeleteClusterSubnetGroupResponse {}
export interface DeleteCustomDomainAssociationMessage {
  ClusterIdentifier?: string;
  CustomDomainName?: string;
}
export interface DeleteCustomDomainAssociationResponse {}
export interface DeleteEndpointAccessMessage {
  EndpointName?: string;
}
export interface DeleteEventSubscriptionMessage {
  SubscriptionName?: string;
}
export interface DeleteEventSubscriptionResponse {}
export interface DeleteHsmClientCertificateMessage {
  HsmClientCertificateIdentifier?: string;
}
export interface DeleteHsmClientCertificateResponse {}
export interface DeleteHsmConfigurationMessage {
  HsmConfigurationIdentifier?: string;
}
export interface DeleteHsmConfigurationResponse {}
export interface DeleteIntegrationMessage {
  IntegrationArn?: string;
}
export interface DeleteQev2IdcApplicationMessage {
  Qev2IdcApplicationArn?: string;
}
export interface DeleteQev2IdcApplicationResponse {}
export interface DeleteRedshiftIdcApplicationMessage {
  RedshiftIdcApplicationArn?: string;
}
export interface DeleteRedshiftIdcApplicationResponse {}
export interface DeleteResourcePolicyMessage {
  ResourceArn?: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteScheduledActionMessage {
  ScheduledActionName?: string;
}
export interface DeleteScheduledActionResponse {}
export interface DeleteSnapshotCopyGrantMessage {
  SnapshotCopyGrantName?: string;
}
export interface DeleteSnapshotCopyGrantResponse {}
export interface DeleteSnapshotScheduleMessage {
  ScheduleIdentifier?: string;
}
export interface DeleteSnapshotScheduleResponse {}
export interface DeleteTagsMessage {
  ResourceName?: string;
  TagKeys?: string[];
}
export interface DeleteTagsResponse {}
export interface DeleteUsageLimitMessage {
  UsageLimitId?: string;
}
export interface DeleteUsageLimitResponse {}
export interface ServerlessIdentifier {
  NamespaceIdentifier?: string;
  WorkgroupIdentifier?: string;
}
export interface ProvisionedIdentifier {
  ClusterIdentifier?: string;
}
export type NamespaceIdentifierUnion =
  | {
      ServerlessIdentifier: ServerlessIdentifier;
      ProvisionedIdentifier?: never;
    }
  | {
      ServerlessIdentifier?: never;
      ProvisionedIdentifier: ProvisionedIdentifier;
    };
export type ConsumerIdentifierList = string[];
export interface DeregisterNamespaceInputMessage {
  NamespaceIdentifier?: NamespaceIdentifierUnion;
  ConsumerIdentifiers?: string[];
}
export type NamespaceRegistrationStatus =
  | "Registering"
  | "Deregistering"
  | (string & {});
export interface DeregisterNamespaceOutputMessage {
  Status?: NamespaceRegistrationStatus;
}
export type AttributeNameList = string[];
export interface DescribeAccountAttributesMessage {
  AttributeNames?: string[];
}
export interface AttributeValueTarget {
  AttributeValue?: string;
}
export type AttributeValueList = AttributeValueTarget[];
export interface AccountAttribute {
  AttributeName?: string;
  AttributeValues?: AttributeValueTarget[];
}
export type AttributeList = AccountAttribute[];
export interface AccountAttributeList {
  AccountAttributes?: AccountAttribute[];
}
export interface DescribeAuthenticationProfilesMessage {
  AuthenticationProfileName?: string;
}
export interface AuthenticationProfile {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export type AuthenticationProfileList = AuthenticationProfile[];
export interface DescribeAuthenticationProfilesResult {
  AuthenticationProfiles?: AuthenticationProfile[];
}
export interface DescribeClusterDbRevisionsMessage {
  ClusterIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface RevisionTarget {
  DatabaseRevision?: string;
  Description?: string;
  DatabaseRevisionReleaseDate?: Date;
}
export type RevisionTargetsList = RevisionTarget[];
export interface ClusterDbRevision {
  ClusterIdentifier?: string;
  CurrentDatabaseRevision?: string;
  DatabaseRevisionReleaseDate?: Date;
  RevisionTargets?: RevisionTarget[];
}
export type ClusterDbRevisionsList = ClusterDbRevision[];
export interface ClusterDbRevisionsMessage {
  Marker?: string;
  ClusterDbRevisions?: ClusterDbRevision[];
}
export type TagValueList = string[];
export interface DescribeClusterParameterGroupsMessage {
  ParameterGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type ParameterGroupList = ClusterParameterGroup[];
export interface ClusterParameterGroupsMessage {
  Marker?: string;
  ParameterGroups?: ClusterParameterGroup[];
}
export interface DescribeClusterParametersMessage {
  ParameterGroupName?: string;
  Source?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type ParameterApplyType = "static" | "dynamic" | (string & {});
export interface Parameter {
  ParameterName?: string;
  ParameterValue?: string;
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  ApplyType?: ParameterApplyType;
  IsModifiable?: boolean;
  MinimumEngineVersion?: string;
}
export type ParametersList = Parameter[];
export interface ClusterParameterGroupDetails {
  Parameters?: Parameter[];
  Marker?: string;
}
export interface DescribeClustersMessage {
  ClusterIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type ClusterList = Cluster[];
export interface ClustersMessage {
  Marker?: string;
  Clusters?: Cluster[];
}
export interface DescribeClusterSecurityGroupsMessage {
  ClusterSecurityGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type ClusterSecurityGroups = ClusterSecurityGroup[];
export interface ClusterSecurityGroupMessage {
  Marker?: string;
  ClusterSecurityGroups?: ClusterSecurityGroup[];
}
export type SnapshotAttributeToSortBy =
  | "SOURCE_TYPE"
  | "TOTAL_SIZE"
  | "CREATE_TIME"
  | (string & {});
export type SortByOrder = "ASC" | "DESC" | (string & {});
export interface SnapshotSortingEntity {
  Attribute?: SnapshotAttributeToSortBy;
  SortOrder?: SortByOrder;
}
export type SnapshotSortingEntityList = SnapshotSortingEntity[];
export interface DescribeClusterSnapshotsMessage {
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotType?: string;
  StartTime?: Date;
  EndTime?: Date;
  MaxRecords?: number;
  Marker?: string;
  OwnerAccount?: string;
  TagKeys?: string[];
  TagValues?: string[];
  ClusterExists?: boolean;
  SortingEntities?: SnapshotSortingEntity[];
}
export type SnapshotList = Snapshot[];
export interface SnapshotMessage {
  Marker?: string;
  Snapshots?: Snapshot[];
}
export interface DescribeClusterSubnetGroupsMessage {
  ClusterSubnetGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type ClusterSubnetGroups = ClusterSubnetGroup[];
export interface ClusterSubnetGroupMessage {
  Marker?: string;
  ClusterSubnetGroups?: ClusterSubnetGroup[];
}
export interface DescribeClusterTracksMessage {
  MaintenanceTrackName?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface SupportedOperation {
  OperationName?: string;
}
export type SupportedOperationList = SupportedOperation[];
export interface UpdateTarget {
  MaintenanceTrackName?: string;
  DatabaseVersion?: string;
  SupportedOperations?: SupportedOperation[];
}
export type EligibleTracksToUpdateList = UpdateTarget[];
export interface MaintenanceTrack {
  MaintenanceTrackName?: string;
  DatabaseVersion?: string;
  UpdateTargets?: UpdateTarget[];
}
export type TrackList = MaintenanceTrack[];
export interface TrackListMessage {
  MaintenanceTracks?: MaintenanceTrack[];
  Marker?: string;
}
export interface DescribeClusterVersionsMessage {
  ClusterVersion?: string;
  ClusterParameterGroupFamily?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface ClusterVersion {
  ClusterVersion?: string;
  ClusterParameterGroupFamily?: string;
  Description?: string;
}
export type ClusterVersionList = ClusterVersion[];
export interface ClusterVersionsMessage {
  Marker?: string;
  ClusterVersions?: ClusterVersion[];
}
export interface DescribeCustomDomainAssociationsMessage {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface CertificateAssociation {
  CustomDomainName?: string;
  ClusterIdentifier?: string;
}
export type CertificateAssociationList = CertificateAssociation[];
export interface Association {
  CustomDomainCertificateArn?: string;
  CustomDomainCertificateExpiryDate?: Date;
  CertificateAssociations?: CertificateAssociation[];
}
export type AssociationList = Association[];
export interface CustomDomainAssociationsMessage {
  Marker?: string;
  Associations?: Association[];
}
export interface DescribeDataSharesMessage {
  DataShareArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type DataShareList = DataShare[];
export interface DescribeDataSharesResult {
  DataShares?: DataShare[];
  Marker?: string;
}
export type DataShareStatusForConsumer = "ACTIVE" | "AVAILABLE" | (string & {});
export interface DescribeDataSharesForConsumerMessage {
  ConsumerArn?: string;
  Status?: DataShareStatusForConsumer;
  MaxRecords?: number;
  Marker?: string;
}
export interface DescribeDataSharesForConsumerResult {
  DataShares?: DataShare[];
  Marker?: string;
}
export type DataShareStatusForProducer =
  | "ACTIVE"
  | "AUTHORIZED"
  | "PENDING_AUTHORIZATION"
  | "DEAUTHORIZED"
  | "REJECTED"
  | (string & {});
export interface DescribeDataSharesForProducerMessage {
  ProducerArn?: string;
  Status?: DataShareStatusForProducer;
  MaxRecords?: number;
  Marker?: string;
}
export interface DescribeDataSharesForProducerResult {
  DataShares?: DataShare[];
  Marker?: string;
}
export interface DescribeDefaultClusterParametersMessage {
  ParameterGroupFamily?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface DefaultClusterParameters {
  ParameterGroupFamily?: string;
  Marker?: string;
  Parameters?: Parameter[];
}
export interface DescribeDefaultClusterParametersResult {
  DefaultClusterParameters?: DefaultClusterParameters;
}
export interface DescribeEndpointAccessMessage {
  ClusterIdentifier?: string;
  ResourceOwner?: string;
  EndpointName?: string;
  VpcId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type EndpointAccesses = EndpointAccess[];
export interface EndpointAccessList {
  EndpointAccessList?: EndpointAccess[];
  Marker?: string;
}
export interface DescribeEndpointAuthorizationMessage {
  ClusterIdentifier?: string;
  Account?: string;
  Grantee?: boolean;
  MaxRecords?: number;
  Marker?: string;
}
export type EndpointAuthorizations = EndpointAuthorization[];
export interface EndpointAuthorizationList {
  EndpointAuthorizationList?: EndpointAuthorization[];
  Marker?: string;
}
export interface DescribeEventCategoriesMessage {
  SourceType?: string;
}
export interface EventInfoMap {
  EventId?: string;
  EventCategories?: string[];
  EventDescription?: string;
  Severity?: string;
}
export type EventInfoMapList = EventInfoMap[];
export interface EventCategoriesMap {
  SourceType?: string;
  Events?: EventInfoMap[];
}
export type EventCategoriesMapList = EventCategoriesMap[];
export interface EventCategoriesMessage {
  EventCategoriesMapList?: EventCategoriesMap[];
}
export type SourceType =
  | "cluster"
  | "cluster-parameter-group"
  | "cluster-security-group"
  | "cluster-snapshot"
  | "scheduled-action"
  | (string & {});
export interface DescribeEventsMessage {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  MaxRecords?: number;
  Marker?: string;
}
export interface Event {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  Message?: string;
  EventCategories?: string[];
  Severity?: string;
  Date?: Date;
  EventId?: string;
}
export type EventList = Event[];
export interface EventsMessage {
  Marker?: string;
  Events?: Event[];
}
export interface DescribeEventSubscriptionsMessage {
  SubscriptionName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type EventSubscriptionsList = EventSubscription[];
export interface EventSubscriptionsMessage {
  Marker?: string;
  EventSubscriptionsList?: EventSubscription[];
}
export interface DescribeHsmClientCertificatesMessage {
  HsmClientCertificateIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type HsmClientCertificateList = HsmClientCertificate[];
export interface HsmClientCertificateMessage {
  Marker?: string;
  HsmClientCertificates?: HsmClientCertificate[];
}
export interface DescribeHsmConfigurationsMessage {
  HsmConfigurationIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type HsmConfigurationList = HsmConfiguration[];
export interface HsmConfigurationMessage {
  Marker?: string;
  HsmConfigurations?: HsmConfiguration[];
}
export type InboundIntegrationArn = string;
export interface DescribeInboundIntegrationsMessage {
  IntegrationArn?: string;
  TargetArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface InboundIntegration {
  IntegrationArn?: string;
  SourceArn?: string;
  TargetArn?: string;
  Status?: ZeroETLIntegrationStatus;
  Errors?: IntegrationError[];
  CreateTime?: Date;
}
export type InboundIntegrationList = InboundIntegration[];
export interface InboundIntegrationsMessage {
  Marker?: string;
  InboundIntegrations?: (InboundIntegration & {
    Errors: (IntegrationError & { ErrorCode: string })[];
  })[];
}
export type DescribeIntegrationsFilterName =
  | "integration-arn"
  | "source-arn"
  | "source-types"
  | "status"
  | (string & {});
export type DescribeIntegrationsFilterValueList = string[];
export interface DescribeIntegrationsFilter {
  Name?: DescribeIntegrationsFilterName;
  Values?: string[];
}
export type DescribeIntegrationsFilterList = DescribeIntegrationsFilter[];
export interface DescribeIntegrationsMessage {
  IntegrationArn?: string;
  MaxRecords?: number;
  Marker?: string;
  Filters?: DescribeIntegrationsFilter[];
}
export type IntegrationList = Integration[];
export interface IntegrationsMessage {
  Marker?: string;
  Integrations?: (Integration & {
    Errors: (IntegrationError & { ErrorCode: string })[];
  })[];
}
export interface DescribeLoggingStatusMessage {
  ClusterIdentifier?: string;
}
export type S3KeyPrefixValue = string;
export type LogDestinationType =
  | "s3"
  | "cloudwatch"
  | "s3table"
  | (string & {});
export interface LoggingStatus {
  LoggingEnabled?: boolean;
  BucketName?: string;
  S3KeyPrefix?: string;
  LastSuccessfulDeliveryTime?: Date;
  LastFailureTime?: Date;
  LastFailureMessage?: string;
  LogDestinationType?: LogDestinationType;
  LogExports?: string[];
  S3Tables?: S3TablePublishStatus;
}
export type ActionType =
  | "restore-cluster"
  | "recommend-node-config"
  | "resize-cluster"
  | (string & {});
export type NodeConfigurationOptionsFilterName =
  | "NodeType"
  | "NumberOfNodes"
  | "EstimatedDiskUtilizationPercent"
  | "Mode"
  | (string & {});
export type OperatorType =
  | "eq"
  | "lt"
  | "gt"
  | "le"
  | "ge"
  | "in"
  | "between"
  | (string & {});
export interface NodeConfigurationOptionsFilter {
  Name?: NodeConfigurationOptionsFilterName;
  Operator?: OperatorType;
  Values?: string[];
}
export type NodeConfigurationOptionsFilterList =
  NodeConfigurationOptionsFilter[];
export interface DescribeNodeConfigurationOptionsMessage {
  ActionType?: ActionType;
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  OwnerAccount?: string;
  Filters?: NodeConfigurationOptionsFilter[];
  Marker?: string;
  MaxRecords?: number;
}
export type Mode = "standard" | "high-performance" | (string & {});
export interface NodeConfigurationOption {
  NodeType?: string;
  NumberOfNodes?: number;
  EstimatedDiskUtilizationPercent?: number;
  Mode?: Mode;
}
export type NodeConfigurationOptionList = NodeConfigurationOption[];
export interface NodeConfigurationOptionsMessage {
  NodeConfigurationOptionList?: NodeConfigurationOption[];
  Marker?: string;
}
export interface DescribeOrderableClusterOptionsMessage {
  ClusterVersion?: string;
  NodeType?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type AvailabilityZoneList = AvailabilityZone[];
export interface OrderableClusterOption {
  ClusterVersion?: string;
  ClusterType?: string;
  NodeType?: string;
  AvailabilityZones?: AvailabilityZone[];
}
export type OrderableClusterOptionsList = OrderableClusterOption[];
export interface OrderableClusterOptionsMessage {
  OrderableClusterOptions?: OrderableClusterOption[];
  Marker?: string;
}
export interface DescribePartnersInputMessage {
  AccountId?: string;
  ClusterIdentifier?: string;
  DatabaseName?: string;
  PartnerName?: string;
}
export type PartnerIntegrationStatus =
  | "Active"
  | "Inactive"
  | "RuntimeFailure"
  | "ConnectionFailure"
  | (string & {});
export type PartnerIntegrationStatusMessage = string;
export interface PartnerIntegrationInfo {
  DatabaseName?: string;
  PartnerName?: string;
  Status?: PartnerIntegrationStatus;
  StatusMessage?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type PartnerIntegrationInfoList = PartnerIntegrationInfo[];
export interface DescribePartnersOutputMessage {
  PartnerIntegrationInfoList?: PartnerIntegrationInfo[];
}
export interface DescribeQev2IdcApplicationsMessage {
  Qev2IdcApplicationArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type Qev2IdcApplicationList = Qev2IdcApplication[];
export interface DescribeQev2IdcApplicationsResult {
  Qev2IdcApplications?: Qev2IdcApplication[];
  Marker?: string;
}
export interface DescribeRedshiftIdcApplicationsMessage {
  RedshiftIdcApplicationArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type RedshiftIdcApplicationList = RedshiftIdcApplication[];
export interface DescribeRedshiftIdcApplicationsResult {
  RedshiftIdcApplications?: RedshiftIdcApplication[];
  Marker?: string;
}
export interface DescribeReservedNodeExchangeStatusInputMessage {
  ReservedNodeId?: string;
  ReservedNodeExchangeRequestId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type ReservedNodeExchangeStatusList = ReservedNodeExchangeStatus[];
export interface DescribeReservedNodeExchangeStatusOutputMessage {
  ReservedNodeExchangeStatusDetails?: ReservedNodeExchangeStatus[];
  Marker?: string;
}
export interface DescribeReservedNodeOfferingsMessage {
  ReservedNodeOfferingId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface ReservedNodeOffering {
  ReservedNodeOfferingId?: string;
  NodeType?: string;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  OfferingType?: string;
  RecurringCharges?: RecurringCharge[];
  ReservedNodeOfferingType?: ReservedNodeOfferingType;
}
export type ReservedNodeOfferingList = ReservedNodeOffering[];
export interface ReservedNodeOfferingsMessage {
  Marker?: string;
  ReservedNodeOfferings?: ReservedNodeOffering[];
}
export interface DescribeReservedNodesMessage {
  ReservedNodeId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type ReservedNodeList = ReservedNode[];
export interface ReservedNodesMessage {
  Marker?: string;
  ReservedNodes?: ReservedNode[];
}
export interface DescribeResizeMessage {
  ClusterIdentifier?: string;
}
export type ScheduledActionTypeValues =
  | "ResizeCluster"
  | "PauseCluster"
  | "ResumeCluster"
  | (string & {});
export type ScheduledActionFilterName =
  | "cluster-identifier"
  | "iam-role"
  | (string & {});
export interface ScheduledActionFilter {
  Name?: ScheduledActionFilterName;
  Values?: string[];
}
export type ScheduledActionFilterList = ScheduledActionFilter[];
export interface DescribeScheduledActionsMessage {
  ScheduledActionName?: string;
  TargetActionType?: ScheduledActionTypeValues;
  StartTime?: Date;
  EndTime?: Date;
  Active?: boolean;
  Filters?: ScheduledActionFilter[];
  Marker?: string;
  MaxRecords?: number;
}
export type ScheduledActionList = ScheduledAction[];
export interface ScheduledActionsMessage {
  Marker?: string;
  ScheduledActions?: (ScheduledAction & {
    TargetAction: ScheduledActionType & {
      ResizeCluster: ResizeClusterMessage & { ClusterIdentifier: string };
      PauseCluster: PauseClusterMessage & { ClusterIdentifier: string };
      ResumeCluster: ResumeClusterMessage & { ClusterIdentifier: string };
    };
  })[];
}
export interface DescribeSnapshotCopyGrantsMessage {
  SnapshotCopyGrantName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type SnapshotCopyGrantList = SnapshotCopyGrant[];
export interface SnapshotCopyGrantMessage {
  Marker?: string;
  SnapshotCopyGrants?: SnapshotCopyGrant[];
}
export interface DescribeSnapshotSchedulesMessage {
  ClusterIdentifier?: string;
  ScheduleIdentifier?: string;
  TagKeys?: string[];
  TagValues?: string[];
  Marker?: string;
  MaxRecords?: number;
}
export type SnapshotScheduleList = SnapshotSchedule[];
export interface DescribeSnapshotSchedulesOutputMessage {
  SnapshotSchedules?: SnapshotSchedule[];
  Marker?: string;
}
export interface DescribeStorageRequest {}
export interface CustomerStorageMessage {
  TotalBackupSizeInMegaBytes?: number;
  TotalProvisionedStorageInMegaBytes?: number;
}
export interface DescribeTableRestoreStatusMessage {
  ClusterIdentifier?: string;
  TableRestoreRequestId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type TableRestoreStatusType =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export interface TableRestoreStatus {
  TableRestoreRequestId?: string;
  Status?: TableRestoreStatusType;
  Message?: string;
  RequestTime?: Date;
  ProgressInMegaBytes?: number;
  TotalDataInMegaBytes?: number;
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SourceDatabaseName?: string;
  SourceSchemaName?: string;
  SourceTableName?: string;
  TargetDatabaseName?: string;
  TargetSchemaName?: string;
  NewTableName?: string;
}
export type TableRestoreStatusList = TableRestoreStatus[];
export interface TableRestoreStatusMessage {
  TableRestoreStatusDetails?: TableRestoreStatus[];
  Marker?: string;
}
export interface DescribeTagsMessage {
  ResourceName?: string;
  ResourceType?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export interface TaggedResource {
  Tag?: Tag;
  ResourceName?: string;
  ResourceType?: string;
}
export type TaggedResourceList = TaggedResource[];
export interface TaggedResourceListMessage {
  TaggedResources?: TaggedResource[];
  Marker?: string;
}
export interface DescribeUsageLimitsMessage {
  UsageLimitId?: string;
  ClusterIdentifier?: string;
  FeatureType?: UsageLimitFeatureType;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export type UsageLimits = UsageLimit[];
export interface UsageLimitList {
  UsageLimits?: UsageLimit[];
  Marker?: string;
}
export interface DisableLoggingMessage {
  ClusterIdentifier?: string;
  LogDestinationType?: LogDestinationType;
  LogExports?: string[];
}
export interface DisableSnapshotCopyMessage {
  ClusterIdentifier?: string;
}
export interface DisableSnapshotCopyResult {
  Cluster?: Cluster;
}
export interface DisassociateDataShareConsumerMessage {
  DataShareArn?: string;
  DisassociateEntireAccount?: boolean;
  ConsumerArn?: string;
  ConsumerRegion?: string;
}
export interface EnableLoggingMessage {
  ClusterIdentifier?: string;
  BucketName?: string;
  S3KeyPrefix?: string;
  LogDestinationType?: LogDestinationType;
  LogExports?: string[];
  S3TableKmsKeyId?: string;
  S3TableGranularity?: string;
}
export interface EnableSnapshotCopyMessage {
  ClusterIdentifier?: string;
  DestinationRegion?: string;
  RetentionPeriod?: number;
  SnapshotCopyGrantName?: string;
  ManualSnapshotRetentionPeriod?: number;
}
export interface EnableSnapshotCopyResult {
  Cluster?: Cluster;
}
export interface FailoverPrimaryComputeInputMessage {
  ClusterIdentifier?: string;
}
export interface FailoverPrimaryComputeResult {
  Cluster?: Cluster;
}
export type DbGroupList = string[];
export interface GetClusterCredentialsMessage {
  DbUser?: string;
  DbName?: string;
  ClusterIdentifier?: string;
  DurationSeconds?: number;
  AutoCreate?: boolean;
  DbGroups?: string[];
  CustomDomainName?: string;
}
export interface ClusterCredentials {
  DbUser?: string;
  DbPassword?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export interface GetClusterCredentialsWithIAMMessage {
  DbName?: string;
  ClusterIdentifier?: string;
  DurationSeconds?: number;
  CustomDomainName?: string;
}
export interface ClusterExtendedCredentials {
  DbUser?: string;
  DbPassword?: string | redacted.Redacted<string>;
  Expiration?: Date;
  NextRefreshTime?: Date;
}
export type ClusterIdentifierList = string[];
export interface GetIdentityCenterAuthTokenRequest {
  ClusterIds?: string[];
}
export interface GetIdentityCenterAuthTokenResponse {
  Token?: string | redacted.Redacted<string>;
  ExpirationTime?: Date;
}
export type ReservedNodeExchangeActionType =
  | "restore-cluster"
  | "resize-cluster"
  | (string & {});
export interface GetReservedNodeExchangeConfigurationOptionsInputMessage {
  ActionType?: ReservedNodeExchangeActionType;
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface ReservedNodeConfigurationOption {
  SourceReservedNode?: ReservedNode;
  TargetReservedNodeCount?: number;
  TargetReservedNodeOffering?: ReservedNodeOffering;
}
export type ReservedNodeConfigurationOptionList =
  ReservedNodeConfigurationOption[];
export interface GetReservedNodeExchangeConfigurationOptionsOutputMessage {
  Marker?: string;
  ReservedNodeConfigurationOptionList?: ReservedNodeConfigurationOption[];
}
export interface GetReservedNodeExchangeOfferingsInputMessage {
  ReservedNodeId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export interface GetReservedNodeExchangeOfferingsOutputMessage {
  Marker?: string;
  ReservedNodeOfferings?: ReservedNodeOffering[];
}
export interface GetResourcePolicyMessage {
  ResourceArn?: string;
}
export interface ResourcePolicy {
  ResourceArn?: string;
  Policy?: string;
}
export interface GetResourcePolicyResult {
  ResourcePolicy?: ResourcePolicy;
}
export interface ListRecommendationsMessage {
  ClusterIdentifier?: string;
  NamespaceArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export type ImpactRankingType = "HIGH" | "MEDIUM" | "LOW" | (string & {});
export type RecommendedActionType = "SQL" | "CLI" | (string & {});
export interface RecommendedAction {
  Text?: string;
  Database?: string;
  Command?: string;
  Type?: RecommendedActionType;
}
export type RecommendedActionList = RecommendedAction[];
export interface ReferenceLink {
  Text?: string;
  Link?: string;
}
export type ReferenceLinkList = ReferenceLink[];
export interface Recommendation {
  Id?: string;
  ClusterIdentifier?: string;
  NamespaceArn?: string;
  CreatedAt?: Date;
  RecommendationType?: string;
  Title?: string;
  Description?: string;
  Observation?: string;
  ImpactRanking?: ImpactRankingType;
  RecommendationText?: string;
  RecommendedActions?: RecommendedAction[];
  ReferenceLinks?: ReferenceLink[];
}
export type RecommendationList = Recommendation[];
export interface ListRecommendationsResult {
  Recommendations?: Recommendation[];
  Marker?: string;
}
export interface ModifyAquaInputMessage {
  ClusterIdentifier?: string;
  AquaConfigurationStatus?: AquaConfigurationStatus;
}
export interface ModifyAquaOutputMessage {
  AquaConfiguration?: AquaConfiguration;
}
export interface ModifyAuthenticationProfileMessage {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export interface ModifyAuthenticationProfileResult {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export interface ModifyClusterMessage {
  ClusterIdentifier?: string;
  ClusterType?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  ClusterSecurityGroups?: string[];
  VpcSecurityGroupIds?: string[];
  MasterUserPassword?: string | redacted.Redacted<string>;
  ClusterParameterGroupName?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  PreferredMaintenanceWindow?: string;
  ClusterVersion?: string;
  AllowVersionUpgrade?: boolean;
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  NewClusterIdentifier?: string;
  PubliclyAccessible?: boolean;
  ElasticIp?: string;
  EnhancedVpcRouting?: boolean;
  MaintenanceTrackName?: string;
  Encrypted?: boolean;
  KmsKeyId?: string;
  AvailabilityZoneRelocation?: boolean;
  AvailabilityZone?: string;
  Port?: number;
  ManageMasterPassword?: boolean;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: boolean;
  ExtraComputeForAutomaticOptimization?: boolean;
}
export interface ModifyClusterResult {
  Cluster?: Cluster;
}
export interface ModifyClusterDbRevisionMessage {
  ClusterIdentifier?: string;
  RevisionTarget?: string;
}
export interface ModifyClusterDbRevisionResult {
  Cluster?: Cluster;
}
export interface ModifyClusterIamRolesMessage {
  ClusterIdentifier?: string;
  AddIamRoles?: string[];
  RemoveIamRoles?: string[];
  DefaultIamRoleArn?: string;
}
export interface ModifyClusterIamRolesResult {
  Cluster?: Cluster;
}
export interface ModifyClusterMaintenanceMessage {
  ClusterIdentifier?: string;
  DeferMaintenance?: boolean;
  DeferMaintenanceIdentifier?: string;
  DeferMaintenanceStartTime?: Date;
  DeferMaintenanceEndTime?: Date;
  DeferMaintenanceDuration?: number;
}
export interface ModifyClusterMaintenanceResult {
  Cluster?: Cluster;
}
export interface ModifyClusterParameterGroupMessage {
  ParameterGroupName?: string;
  Parameters?: Parameter[];
}
export interface ClusterParameterGroupNameMessage {
  ParameterGroupName?: string;
  ParameterGroupStatus?: string;
}
export interface ModifyClusterSnapshotMessage {
  SnapshotIdentifier?: string;
  ManualSnapshotRetentionPeriod?: number;
  Force?: boolean;
}
export interface ModifyClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export interface ModifyClusterSnapshotScheduleMessage {
  ClusterIdentifier?: string;
  ScheduleIdentifier?: string;
  DisassociateSchedule?: boolean;
}
export interface ModifyClusterSnapshotScheduleResponse {}
export interface ModifyClusterSubnetGroupMessage {
  ClusterSubnetGroupName?: string;
  Description?: string;
  SubnetIds?: string[];
}
export interface ModifyClusterSubnetGroupResult {
  ClusterSubnetGroup?: ClusterSubnetGroup;
}
export interface ModifyCustomDomainAssociationMessage {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
}
export interface ModifyCustomDomainAssociationResult {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
  CustomDomainCertExpiryTime?: string;
}
export interface ModifyEndpointAccessMessage {
  EndpointName?: string;
  VpcSecurityGroupIds?: string[];
}
export interface ModifyEventSubscriptionMessage {
  SubscriptionName?: string;
  SnsTopicArn?: string;
  SourceType?: string;
  SourceIds?: string[];
  EventCategories?: string[];
  Severity?: string;
  Enabled?: boolean;
}
export interface ModifyEventSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export interface ModifyIntegrationMessage {
  IntegrationArn?: string;
  Description?: string;
  IntegrationName?: string;
}
export type LakehouseRegistration = "Register" | "Deregister" | (string & {});
export type LakehouseIdcRegistration =
  | "Associate"
  | "Disassociate"
  | (string & {});
export interface ModifyLakehouseConfigurationMessage {
  ClusterIdentifier?: string;
  LakehouseRegistration?: LakehouseRegistration;
  CatalogName?: string;
  LakehouseIdcRegistration?: LakehouseIdcRegistration;
  LakehouseIdcApplicationArn?: string;
  DryRun?: boolean;
}
export interface LakehouseConfiguration {
  ClusterIdentifier?: string;
  LakehouseIdcApplicationArn?: string;
  LakehouseRegistrationStatus?: string;
  CatalogArn?: string;
}
export interface ModifyQev2IdcApplicationMessage {
  Qev2IdcApplicationArn?: string;
  IdcDisplayName?: string;
}
export interface ModifyQev2IdcApplicationResult {
  Qev2IdcApplication?: Qev2IdcApplication;
}
export interface ModifyRedshiftIdcApplicationMessage {
  RedshiftIdcApplicationArn?: string;
  IdentityNamespace?: string;
  IamRoleArn?: string;
  IdcDisplayName?: string;
  AuthorizedTokenIssuerList?: AuthorizedTokenIssuer[];
  ServiceIntegrations?: ServiceIntegrationsUnion[];
}
export interface ModifyRedshiftIdcApplicationResult {
  RedshiftIdcApplication?: RedshiftIdcApplication;
}
export interface ModifyScheduledActionMessage {
  ScheduledActionName?: string;
  TargetAction?: ScheduledActionType;
  Schedule?: string;
  IamRole?: string;
  ScheduledActionDescription?: string;
  StartTime?: Date;
  EndTime?: Date;
  Enable?: boolean;
}
export interface ModifySnapshotCopyRetentionPeriodMessage {
  ClusterIdentifier?: string;
  RetentionPeriod?: number;
  Manual?: boolean;
}
export interface ModifySnapshotCopyRetentionPeriodResult {
  Cluster?: Cluster;
}
export interface ModifySnapshotScheduleMessage {
  ScheduleIdentifier?: string;
  ScheduleDefinitions?: string[];
}
export interface ModifyUsageLimitMessage {
  UsageLimitId?: string;
  Amount?: number;
  BreachAction?: UsageLimitBreachAction;
}
export interface PauseClusterResult {
  Cluster?: Cluster;
}
export interface PurchaseReservedNodeOfferingMessage {
  ReservedNodeOfferingId?: string;
  NodeCount?: number;
}
export interface PurchaseReservedNodeOfferingResult {
  ReservedNode?: ReservedNode;
}
export interface PutResourcePolicyMessage {
  ResourceArn?: string;
  Policy?: string;
}
export interface PutResourcePolicyResult {
  ResourcePolicy?: ResourcePolicy;
}
export interface RebootClusterMessage {
  ClusterIdentifier?: string;
}
export interface RebootClusterResult {
  Cluster?: Cluster;
}
export interface RegisterNamespaceInputMessage {
  NamespaceIdentifier?: NamespaceIdentifierUnion;
  ConsumerIdentifiers?: string[];
}
export interface RegisterNamespaceOutputMessage {
  Status?: NamespaceRegistrationStatus;
}
export interface RejectDataShareMessage {
  DataShareArn?: string;
}
export interface ResetClusterParameterGroupMessage {
  ParameterGroupName?: string;
  ResetAllParameters?: boolean;
  Parameters?: Parameter[];
}
export interface ResizeClusterResult {
  Cluster?: Cluster;
}
export interface RestoreFromClusterSnapshotMessage {
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotClusterIdentifier?: string;
  Port?: number;
  AvailabilityZone?: string;
  AllowVersionUpgrade?: boolean;
  ClusterSubnetGroupName?: string;
  PubliclyAccessible?: boolean;
  OwnerAccount?: string;
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  ElasticIp?: string;
  ClusterParameterGroupName?: string;
  ClusterSecurityGroups?: string[];
  VpcSecurityGroupIds?: string[];
  PreferredMaintenanceWindow?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  KmsKeyId?: string;
  NodeType?: string;
  EnhancedVpcRouting?: boolean;
  AdditionalInfo?: string;
  IamRoles?: string[];
  MaintenanceTrackName?: string;
  SnapshotScheduleIdentifier?: string;
  NumberOfNodes?: number;
  AvailabilityZoneRelocation?: boolean;
  AquaConfigurationStatus?: AquaConfigurationStatus;
  DefaultIamRoleArn?: string;
  ReservedNodeId?: string;
  TargetReservedNodeOfferingId?: string;
  Encrypted?: boolean;
  ManageMasterPassword?: boolean;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: boolean;
  CatalogName?: string;
  RedshiftIdcApplicationArn?: string;
}
export interface RestoreFromClusterSnapshotResult {
  Cluster?: Cluster;
}
export interface RestoreTableFromClusterSnapshotMessage {
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SourceDatabaseName?: string;
  SourceSchemaName?: string;
  SourceTableName?: string;
  TargetDatabaseName?: string;
  TargetSchemaName?: string;
  NewTableName?: string;
  EnableCaseSensitiveIdentifier?: boolean;
}
export interface RestoreTableFromClusterSnapshotResult {
  TableRestoreStatus?: TableRestoreStatus;
}
export interface ResumeClusterResult {
  Cluster?: Cluster;
}
export interface RevokeClusterSecurityGroupIngressMessage {
  ClusterSecurityGroupName?: string;
  CIDRIP?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export interface RevokeClusterSecurityGroupIngressResult {
  ClusterSecurityGroup?: ClusterSecurityGroup;
}
export interface RevokeEndpointAccessMessage {
  ClusterIdentifier?: string;
  Account?: string;
  VpcIds?: string[];
  Force?: boolean;
}
export interface RevokeSnapshotAccessMessage {
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotClusterIdentifier?: string;
  AccountWithRestoreAccess?: string;
}
export interface RevokeSnapshotAccessResult {
  Snapshot?: Snapshot;
}
export interface RotateEncryptionKeyMessage {
  ClusterIdentifier?: string;
}
export interface RotateEncryptionKeyResult {
  Cluster?: Cluster;
}
export interface UpdatePartnerStatusInputMessage {
  AccountId?: string;
  ClusterIdentifier?: string;
  DatabaseName?: string;
  PartnerName?: string;
  Status?: PartnerIntegrationStatus;
  StatusMessage?: string;
}
export type ExceptionMessage = string;
export type AcceptReservedNodeExchangeError =
  | DependentServiceUnavailableFault
  | InvalidReservedNodeStateFault
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Exchanges a DC1 Reserved Node for a DC2 Reserved Node with no changes to the
 * configuration (term, payment type, or number of nodes) and no additional costs.
 */
export const acceptReservedNodeExchange: API.OperationMethod<
  AcceptReservedNodeExchangeInputMessage,
  AcceptReservedNodeExchangeOutputMessage,
  AcceptReservedNodeExchangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReservedNodeId: 0, TargetReservedNodeOfferingId: 0 },
    output: { ExchangedReservedNode: o_ReservedNode },
  },
  errors: [
    DependentServiceUnavailableFault,
    InvalidReservedNodeStateFault,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptReservedNodeExchange",
})) as any;

export type AddPartnerError =
  | ClusterNotFoundFault
  | PartnerNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Adds a partner integration to a cluster.
 * This operation authorizes a partner to push status updates for the specified database.
 * To complete the integration, you also set up the integration on the partner website.
 */
export const addPartner: API.OperationMethod<
  PartnerIntegrationInputMessage,
  PartnerIntegrationOutputMessage,
  AddPartnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      ClusterIdentifier: 0,
      DatabaseName: 0,
      PartnerName: 0,
    },
  },
  errors: [
    ClusterNotFoundFault,
    PartnerNotFoundFault,
    UnauthorizedPartnerIntegrationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddPartner",
})) as any;

export type AssociateDataShareConsumerError =
  | InvalidDataShareFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * From a datashare consumer account, associates a datashare with the
 * account (AssociateEntireAccount) or the specified namespace (ConsumerArn). If you make this association, the consumer
 * can consume the datashare.
 */
export const associateDataShareConsumer: API.OperationMethod<
  AssociateDataShareConsumerMessage,
  DataShare,
  AssociateDataShareConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DataShareArn: 0,
      AssociateEntireAccount: 0,
      ConsumerArn: 0,
      ConsumerRegion: 0,
      AllowWrites: 0,
    },
    output: {
      AllowPubliclyAccessibleConsumers: D.bool,
      DataShareAssociations: D.list(o_DataShareAssociation),
    },
  },
  errors: [InvalidDataShareFault, InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDataShareConsumer",
})) as any;

export type AuthorizeClusterSecurityGroupIngressError =
  | AuthorizationAlreadyExistsFault
  | AuthorizationQuotaExceededFault
  | ClusterSecurityGroupNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | CommonErrors;
/**
 * Adds an inbound (ingress) rule to an Amazon Redshift security group. Depending on whether
 * the application accessing your cluster is running on the Internet or an Amazon EC2
 * instance, you can authorize inbound access to either a Classless Interdomain Routing
 * (CIDR)/Internet Protocol (IP) range or to an Amazon EC2 security group. You can add as
 * many as 20 ingress rules to an Amazon Redshift security group.
 *
 * If you authorize access to an Amazon EC2 security group, specify
 * *EC2SecurityGroupName* and
 * *EC2SecurityGroupOwnerId*. The Amazon EC2 security group and
 * Amazon Redshift cluster must be in the same Amazon Web Services Region.
 *
 * If you authorize access to a CIDR/IP address range, specify
 * *CIDRIP*. For an overview of CIDR blocks, see the Wikipedia
 * article on Classless Inter-Domain Routing.
 *
 * You must also associate the security group with a cluster so that clients running
 * on these IP addresses or the EC2 instance are authorized to connect to the cluster. For
 * information about managing security groups, go to Working with Security
 * Groups in the *Amazon Redshift Cluster Management Guide*.
 */
export const authorizeClusterSecurityGroupIngress: API.OperationMethod<
  AuthorizeClusterSecurityGroupIngressMessage,
  AuthorizeClusterSecurityGroupIngressResult,
  AuthorizeClusterSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterSecurityGroupName: 0,
      CIDRIP: 0,
      EC2SecurityGroupName: 0,
      EC2SecurityGroupOwnerId: 0,
    },
    output: { ClusterSecurityGroup: o_ClusterSecurityGroup },
  },
  errors: [
    AuthorizationAlreadyExistsFault,
    AuthorizationQuotaExceededFault,
    ClusterSecurityGroupNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeClusterSecurityGroupIngress",
})) as any;

export type AuthorizeDataShareError = InvalidDataShareFault | CommonErrors;
/**
 * From a data producer account, authorizes the sharing of a datashare with one or more
 * consumer accounts or managing entities. To authorize a datashare for a data consumer,
 * the producer account must have the correct access permissions.
 */
export const authorizeDataShare: API.OperationMethod<
  AuthorizeDataShareMessage,
  DataShare,
  AuthorizeDataShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DataShareArn: 0, ConsumerIdentifier: 0, AllowWrites: 0 },
    output: {
      AllowPubliclyAccessibleConsumers: D.bool,
      DataShareAssociations: D.list(o_DataShareAssociation),
    },
  },
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeDataShare",
})) as any;

export type AuthorizeEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointAuthorizationAlreadyExistsFault
  | EndpointAuthorizationsPerClusterLimitExceededFault
  | InvalidAuthorizationStateFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Grants access to a cluster.
 */
export const authorizeEndpointAccess: API.OperationMethod<
  AuthorizeEndpointAccessMessage,
  EndpointAuthorization,
  AuthorizeEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      Account: 0,
      VpcIds: D.list(0, { item: "VpcIdentifier" }),
    },
    output: {
      AuthorizeTime: D.ts,
      AllowedAllVPCs: D.bool,
      AllowedVPCs: D.list(0, { item: "VpcIdentifier" }),
      EndpointCount: D.num,
    },
  },
  errors: [
    ClusterNotFoundFault,
    EndpointAuthorizationAlreadyExistsFault,
    EndpointAuthorizationsPerClusterLimitExceededFault,
    InvalidAuthorizationStateFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeEndpointAccess",
})) as any;

export type AuthorizeSnapshotAccessError =
  | AuthorizationAlreadyExistsFault
  | AuthorizationQuotaExceededFault
  | ClusterSnapshotNotFoundFault
  | DependentServiceRequestThrottlingFault
  | InvalidClusterSnapshotStateFault
  | LimitExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Authorizes the specified Amazon Web Services account to restore the specified
 * snapshot.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const authorizeSnapshotAccess: API.OperationMethod<
  AuthorizeSnapshotAccessMessage,
  AuthorizeSnapshotAccessResult,
  AuthorizeSnapshotAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SnapshotIdentifier: 0,
      SnapshotArn: 0,
      SnapshotClusterIdentifier: 0,
      AccountWithRestoreAccess: 0,
    },
    output: { Snapshot: o_Snapshot },
  },
  errors: [
    AuthorizationAlreadyExistsFault,
    AuthorizationQuotaExceededFault,
    ClusterSnapshotNotFoundFault,
    DependentServiceRequestThrottlingFault,
    InvalidClusterSnapshotStateFault,
    LimitExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeSnapshotAccess",
})) as any;

export type BatchDeleteClusterSnapshotsError =
  | BatchDeleteRequestSizeExceededFault
  | CommonErrors;
/**
 * Deletes a set of cluster snapshots.
 */
export const batchDeleteClusterSnapshots: API.OperationMethod<
  BatchDeleteClusterSnapshotsRequest,
  BatchDeleteClusterSnapshotsResult,
  BatchDeleteClusterSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Identifiers: D.list(
        { SnapshotIdentifier: 0, SnapshotClusterIdentifier: 0 },
        { item: "DeleteClusterSnapshotMessage" },
      ),
    },
    output: {
      Resources: D.list(0, { item: "String" }),
      Errors: D.list({}, { item: "SnapshotErrorMessage" }),
    },
  },
  errors: [BatchDeleteRequestSizeExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteClusterSnapshots",
})) as any;

export type BatchModifyClusterSnapshotsError =
  | BatchModifyClusterSnapshotsLimitExceededFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Modifies the settings for a set of cluster snapshots.
 */
export const batchModifyClusterSnapshots: API.OperationMethod<
  BatchModifyClusterSnapshotsMessage,
  BatchModifyClusterSnapshotsOutputMessage,
  BatchModifyClusterSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SnapshotIdentifierList: D.list(0, { item: "String" }),
      ManualSnapshotRetentionPeriod: 0,
      Force: 0,
    },
    output: {
      Resources: D.list(0, { item: "String" }),
      Errors: D.list({}, { item: "SnapshotErrorMessage" }),
    },
  },
  errors: [
    BatchModifyClusterSnapshotsLimitExceededFault,
    InvalidRetentionPeriodFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchModifyClusterSnapshots",
})) as any;

export type CancelResizeError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | ResizeNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Cancels a resize operation for a cluster.
 */
export const cancelResize: API.OperationMethod<
  CancelResizeMessage,
  ResizeProgressMessage,
  CancelResizeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0 },
    output: {
      TargetNumberOfNodes: D.num,
      ImportTablesCompleted: D.list(),
      ImportTablesInProgress: D.list(),
      ImportTablesNotStarted: D.list(),
      AvgResizeRateInMegaBytesPerSecond: D.num,
      TotalResizeDataInMegaBytes: D.num,
      ProgressInMegaBytes: D.num,
      ElapsedTimeInSeconds: D.num,
      EstimatedTimeToCompletionInSeconds: D.num,
      DataTransferProgressPercent: D.num,
    },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    ResizeNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelResize",
})) as any;

export type CopyClusterSnapshotError =
  | ClusterNotFoundFault
  | ClusterSnapshotAlreadyExistsFault
  | ClusterSnapshotNotFoundFault
  | ClusterSnapshotQuotaExceededFault
  | InvalidClusterSnapshotStateFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Copies the specified automated cluster snapshot to a new manual cluster snapshot.
 * The source must be an automated snapshot and it must be in the available
 * state.
 *
 * When you delete a cluster, Amazon Redshift deletes any automated snapshots of the
 * cluster. Also, when the retention period of the snapshot expires, Amazon Redshift
 * automatically deletes it. If you want to keep an automated snapshot for a longer period,
 * you can make a manual copy of the snapshot. Manual snapshots are retained until you
 * delete them.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const copyClusterSnapshot: API.OperationMethod<
  CopyClusterSnapshotMessage,
  CopyClusterSnapshotResult,
  CopyClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceSnapshotIdentifier: 0,
      SourceSnapshotClusterIdentifier: 0,
      TargetSnapshotIdentifier: 0,
      ManualSnapshotRetentionPeriod: 0,
    },
    output: { Snapshot: o_Snapshot },
  },
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotAlreadyExistsFault,
    ClusterSnapshotNotFoundFault,
    ClusterSnapshotQuotaExceededFault,
    InvalidClusterSnapshotStateFault,
    InvalidRetentionPeriodFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyClusterSnapshot",
})) as any;

export type CreateAuthenticationProfileError =
  | AuthenticationProfileAlreadyExistsFault
  | AuthenticationProfileQuotaExceededFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Creates an authentication profile with the specified parameters.
 */
export const createAuthenticationProfile: API.OperationMethod<
  CreateAuthenticationProfileMessage,
  CreateAuthenticationProfileResult,
  CreateAuthenticationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AuthenticationProfileName: 0, AuthenticationProfileContent: 0 },
  },
  errors: [
    AuthenticationProfileAlreadyExistsFault,
    AuthenticationProfileQuotaExceededFault,
    InvalidAuthenticationProfileRequestFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuthenticationProfile",
})) as any;

export type CreateClusterError =
  | ClusterAlreadyExistsFault
  | ClusterParameterGroupNotFoundFault
  | ClusterQuotaExceededFault
  | ClusterSecurityGroupNotFoundFault
  | ClusterSubnetGroupNotFoundFault
  | DependentServiceAccessDeniedFault
  | DependentServiceRequestThrottlingFault
  | DependentServiceUnavailableFault
  | HsmClientCertificateNotFoundFault
  | HsmConfigurationNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterSubnetGroupStateFault
  | InvalidClusterTrackFault
  | InvalidElasticIpFault
  | InvalidRetentionPeriodFault
  | InvalidSubnet
  | InvalidTagFault
  | InvalidVPCNetworkStateFault
  | Ipv6CidrBlockNotFoundFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | RedshiftIdcApplicationNotExistsFault
  | SnapshotScheduleNotFoundFault
  | TagLimitExceededFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a new cluster with the specified parameters.
 *
 * To create a cluster in Virtual Private Cloud (VPC), you must provide a cluster
 * subnet group name. The cluster subnet group identifies the subnets of your VPC that
 * Amazon Redshift uses when creating the cluster.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 */
export const createCluster: API.OperationMethod<
  CreateClusterMessage,
  CreateClusterResult,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DBName: 0,
      ClusterIdentifier: 0,
      ClusterType: 0,
      NodeType: 0,
      MasterUsername: 0,
      MasterUserPassword: 0,
      ClusterSecurityGroups: D.list(0, { item: "ClusterSecurityGroupName" }),
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      ClusterSubnetGroupName: 0,
      AvailabilityZone: 0,
      PreferredMaintenanceWindow: 0,
      ClusterParameterGroupName: 0,
      AutomatedSnapshotRetentionPeriod: 0,
      ManualSnapshotRetentionPeriod: 0,
      Port: 0,
      ClusterVersion: 0,
      AllowVersionUpgrade: 0,
      NumberOfNodes: 0,
      PubliclyAccessible: 0,
      Encrypted: 0,
      HsmClientCertificateIdentifier: 0,
      HsmConfigurationIdentifier: 0,
      ElasticIp: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      KmsKeyId: 0,
      EnhancedVpcRouting: 0,
      AdditionalInfo: 0,
      IamRoles: D.list(0, { item: "IamRoleArn" }),
      MaintenanceTrackName: 0,
      SnapshotScheduleIdentifier: 0,
      AvailabilityZoneRelocation: 0,
      AquaConfigurationStatus: 0,
      DefaultIamRoleArn: 0,
      LoadSampleData: 0,
      ManageMasterPassword: 0,
      MasterPasswordSecretKmsKeyId: 0,
      IpAddressType: 0,
      MultiAZ: 0,
      RedshiftIdcApplicationArn: 0,
      CatalogName: 0,
      ExtraComputeForAutomaticOptimization: 0,
    },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterAlreadyExistsFault,
    ClusterParameterGroupNotFoundFault,
    ClusterQuotaExceededFault,
    ClusterSecurityGroupNotFoundFault,
    ClusterSubnetGroupNotFoundFault,
    DependentServiceAccessDeniedFault,
    DependentServiceRequestThrottlingFault,
    DependentServiceUnavailableFault,
    HsmClientCertificateNotFoundFault,
    HsmConfigurationNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterSubnetGroupStateFault,
    InvalidClusterTrackFault,
    InvalidElasticIpFault,
    InvalidRetentionPeriodFault,
    InvalidSubnet,
    InvalidTagFault,
    InvalidVPCNetworkStateFault,
    Ipv6CidrBlockNotFoundFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    RedshiftIdcApplicationNotExistsFault,
    SnapshotScheduleNotFoundFault,
    TagLimitExceededFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
})) as any;

export type CreateClusterParameterGroupError =
  | ClusterParameterGroupAlreadyExistsFault
  | ClusterParameterGroupQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift parameter group.
 *
 * Creating parameter groups is independent of creating clusters. You can associate a
 * cluster with a parameter group when you create the cluster. You can also associate an
 * existing cluster with a parameter group after the cluster is created by using ModifyCluster.
 *
 * Parameters in the parameter group define specific behavior that applies to the
 * databases you create on the cluster.
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterParameterGroup: API.OperationMethod<
  CreateClusterParameterGroupMessage,
  CreateClusterParameterGroupResult,
  CreateClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ParameterGroupName: 0,
      ParameterGroupFamily: 0,
      Description: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { ClusterParameterGroup: o_ClusterParameterGroup },
  },
  errors: [
    ClusterParameterGroupAlreadyExistsFault,
    ClusterParameterGroupQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterParameterGroup",
})) as any;

export type CreateClusterSecurityGroupError =
  | ClusterSecurityGroupAlreadyExistsFault
  | ClusterSecurityGroupQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates a new Amazon Redshift security group. You use security groups to control access
 * to non-VPC clusters.
 *
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterSecurityGroup: API.OperationMethod<
  CreateClusterSecurityGroupMessage,
  CreateClusterSecurityGroupResult,
  CreateClusterSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterSecurityGroupName: 0,
      Description: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { ClusterSecurityGroup: o_ClusterSecurityGroup },
  },
  errors: [
    ClusterSecurityGroupAlreadyExistsFault,
    ClusterSecurityGroupQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterSecurityGroup",
})) as any;

export type CreateClusterSnapshotError =
  | ClusterNotFoundFault
  | ClusterSnapshotAlreadyExistsFault
  | ClusterSnapshotQuotaExceededFault
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates a manual snapshot of the specified cluster. The cluster must be in the
 * `available` state.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterSnapshot: API.OperationMethod<
  CreateClusterSnapshotMessage,
  CreateClusterSnapshotResult,
  CreateClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SnapshotIdentifier: 0,
      ClusterIdentifier: 0,
      ManualSnapshotRetentionPeriod: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { Snapshot: o_Snapshot },
  },
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotAlreadyExistsFault,
    ClusterSnapshotQuotaExceededFault,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterSnapshot",
})) as any;

export type CreateClusterSubnetGroupError =
  | ClusterSubnetGroupAlreadyExistsFault
  | ClusterSubnetGroupQuotaExceededFault
  | ClusterSubnetQuotaExceededFault
  | DependentServiceRequestThrottlingFault
  | InvalidSubnet
  | InvalidTagFault
  | TagLimitExceededFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Creates a new Amazon Redshift subnet group. You must provide a list of one or more
 * subnets in your existing Amazon Virtual Private Cloud (Amazon VPC) when creating
 * Amazon Redshift subnet group.
 *
 * For information about subnet groups, go to
 * Amazon Redshift Cluster Subnet Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterSubnetGroup: API.OperationMethod<
  CreateClusterSubnetGroupMessage,
  CreateClusterSubnetGroupResult,
  CreateClusterSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterSubnetGroupName: 0,
      Description: 0,
      SubnetIds: D.list(0, { item: "SubnetIdentifier" }),
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { ClusterSubnetGroup: o_ClusterSubnetGroup },
  },
  errors: [
    ClusterSubnetGroupAlreadyExistsFault,
    ClusterSubnetGroupQuotaExceededFault,
    ClusterSubnetQuotaExceededFault,
    DependentServiceRequestThrottlingFault,
    InvalidSubnet,
    InvalidTagFault,
    TagLimitExceededFault,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterSubnetGroup",
})) as any;

export type CreateCustomDomainAssociationError =
  | ClusterNotFoundFault
  | CustomCnameAssociationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Used to create a custom domain name for a cluster. Properties include the custom domain name, the
 * cluster the custom domain is associated with, and the certificate Amazon Resource Name (ARN).
 */
export const createCustomDomainAssociation: API.OperationMethod<
  CreateCustomDomainAssociationMessage,
  CreateCustomDomainAssociationResult,
  CreateCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CustomDomainName: 0,
      CustomDomainCertificateArn: 0,
      ClusterIdentifier: 0,
    },
  },
  errors: [
    ClusterNotFoundFault,
    CustomCnameAssociationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomDomainAssociation",
})) as any;

export type CreateEndpointAccessError =
  | AccessToClusterDeniedFault
  | ClusterNotFoundFault
  | ClusterSubnetGroupNotFoundFault
  | EndpointAlreadyExistsFault
  | EndpointsPerAuthorizationLimitExceededFault
  | EndpointsPerClusterLimitExceededFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a Redshift-managed VPC endpoint.
 */
export const createEndpointAccess: API.OperationMethod<
  CreateEndpointAccessMessage,
  EndpointAccess,
  CreateEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      ResourceOwner: 0,
      EndpointName: 0,
      SubnetGroupName: 0,
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
    },
    output: {
      EndpointCreateTime: D.ts,
      Port: D.num,
      VpcSecurityGroups: D.list({}, { item: "VpcSecurityGroup" }),
      VpcEndpoint: o_VpcEndpoint,
    },
  },
  errors: [
    AccessToClusterDeniedFault,
    ClusterNotFoundFault,
    ClusterSubnetGroupNotFoundFault,
    EndpointAlreadyExistsFault,
    EndpointsPerAuthorizationLimitExceededFault,
    EndpointsPerClusterLimitExceededFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpointAccess",
})) as any;

export type CreateEventSubscriptionError =
  | EventSubscriptionQuotaExceededFault
  | InvalidTagFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | SNSTopicArnNotFoundFault
  | SourceNotFoundFault
  | SubscriptionAlreadyExistFault
  | SubscriptionCategoryNotFoundFault
  | SubscriptionEventIdNotFoundFault
  | SubscriptionSeverityNotFoundFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift event notification subscription. This action requires an ARN
 * (Amazon Resource Name) of an Amazon SNS topic created by either the Amazon Redshift console,
 * the Amazon SNS console, or the Amazon SNS API. To obtain an ARN with Amazon SNS, you
 * must create a topic in Amazon SNS and subscribe to the topic. The ARN is displayed in
 * the SNS console.
 *
 * You can specify the source type, and lists of Amazon Redshift source IDs, event
 * categories, and event severities. Notifications will be sent for all events you want
 * that match those criteria. For example, you can specify source type = cluster, source ID
 * = my-cluster-1 and mycluster2, event categories = Availability, Backup, and severity =
 * ERROR. The subscription will only send notifications for those ERROR events in the
 * Availability and Backup categories for the specified clusters.
 *
 * If you specify both the source type and source IDs, such as source type = cluster
 * and source identifier = my-cluster-1, notifications will be sent for all the cluster
 * events for my-cluster-1. If you specify a source type but do not specify a source
 * identifier, you will receive notice of the events for the objects of that type in your
 * Amazon Web Services account. If you do not specify either the SourceType nor the SourceIdentifier, you
 * will be notified of events generated from all Amazon Redshift sources belonging to your Amazon Web Services account. You must specify a source type if you specify a source ID.
 */
export const createEventSubscription: API.OperationMethod<
  CreateEventSubscriptionMessage,
  CreateEventSubscriptionResult,
  CreateEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SubscriptionName: 0,
      SnsTopicArn: 0,
      SourceType: 0,
      SourceIds: D.list(0, { item: "SourceId" }),
      EventCategories: D.list(0, { item: "EventCategory" }),
      Severity: 0,
      Enabled: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { EventSubscription: o_EventSubscription },
  },
  errors: [
    EventSubscriptionQuotaExceededFault,
    InvalidTagFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
    SNSTopicArnNotFoundFault,
    SourceNotFoundFault,
    SubscriptionAlreadyExistFault,
    SubscriptionCategoryNotFoundFault,
    SubscriptionEventIdNotFoundFault,
    SubscriptionSeverityNotFoundFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventSubscription",
})) as any;

export type CreateHsmClientCertificateError =
  | HsmClientCertificateAlreadyExistsFault
  | HsmClientCertificateQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an HSM client certificate that an Amazon Redshift cluster will use to connect to
 * the client's HSM in order to store and retrieve the keys used to encrypt the cluster
 * databases.
 *
 * The command returns a public key, which you must store in the HSM. In addition to
 * creating the HSM certificate, you must create an Amazon Redshift HSM configuration that
 * provides a cluster the information needed to store and use encryption keys in the HSM.
 * For more information, go to Hardware Security Modules
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createHsmClientCertificate: API.OperationMethod<
  CreateHsmClientCertificateMessage,
  CreateHsmClientCertificateResult,
  CreateHsmClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HsmClientCertificateIdentifier: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { HsmClientCertificate: o_HsmClientCertificate },
  },
  errors: [
    HsmClientCertificateAlreadyExistsFault,
    HsmClientCertificateQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHsmClientCertificate",
})) as any;

export type CreateHsmConfigurationError =
  | HsmConfigurationAlreadyExistsFault
  | HsmConfigurationQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an HSM configuration that contains the information required by an Amazon Redshift
 * cluster to store and use database encryption keys in a Hardware Security Module (HSM).
 * After creating the HSM configuration, you can specify it as a parameter when creating a
 * cluster. The cluster will then store its encryption keys in the HSM.
 *
 * In addition to creating an HSM configuration, you must also create an HSM client
 * certificate. For more information, go to Hardware Security Modules
 * in the Amazon Redshift Cluster Management Guide.
 */
export const createHsmConfiguration: API.OperationMethod<
  CreateHsmConfigurationMessage,
  CreateHsmConfigurationResult,
  CreateHsmConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HsmConfigurationIdentifier: 0,
      Description: 0,
      HsmIpAddress: 0,
      HsmPartitionName: 0,
      HsmPartitionPassword: 0,
      HsmServerPublicCertificate: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { HsmConfiguration: o_HsmConfiguration },
  },
  errors: [
    HsmConfigurationAlreadyExistsFault,
    HsmConfigurationQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHsmConfiguration",
})) as any;

export type CreateIntegrationError =
  | IntegrationAlreadyExistsFault
  | IntegrationConflictOperationFault
  | IntegrationQuotaExceededFault
  | IntegrationSourceNotFoundFault
  | IntegrationTargetNotFoundFault
  | InvalidClusterStateFault
  | InvalidTagFault
  | TagLimitExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a zero-ETL integration or S3 event integration with Amazon Redshift.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationMessage,
  Integration,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceArn: 0,
      TargetArn: 0,
      IntegrationName: 0,
      KMSKeyId: 0,
      TagList: D.list(i_Tag, { item: "Tag" }),
      AdditionalEncryptionContext: D.map(),
      Description: 0,
    },
    output: {
      Errors: D.list({}, { item: "IntegrationError" }),
      CreateTime: D.ts,
      AdditionalEncryptionContext: D.map(),
      Tags: D.list({}, { item: "Tag" }),
    },
  },
  errors: [
    IntegrationAlreadyExistsFault,
    IntegrationConflictOperationFault,
    IntegrationQuotaExceededFault,
    IntegrationSourceNotFoundFault,
    IntegrationTargetNotFoundFault,
    InvalidClusterStateFault,
    InvalidTagFault,
    TagLimitExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegration",
})) as any;

export type CreateQev2IdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationAlreadyExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift Query Editor (QEV2) IAM Identity Center application.
 */
export const createQev2IdcApplication: API.OperationMethod<
  CreateQev2IdcApplicationMessage,
  CreateQev2IdcApplicationResult,
  CreateQev2IdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IdcInstanceArn: 0,
      Qev2IdcApplicationName: 0,
      IdcDisplayName: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { Qev2IdcApplication: o_Qev2IdcApplication },
  },
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationAlreadyExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQev2IdcApplication",
})) as any;

export type CreateRedshiftIdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | InvalidTagFault
  | RedshiftIdcApplicationAlreadyExistsFault
  | RedshiftIdcApplicationQuotaExceededFault
  | TagLimitExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift application for use with IAM Identity Center.
 */
export const createRedshiftIdcApplication: API.OperationMethod<
  CreateRedshiftIdcApplicationMessage,
  CreateRedshiftIdcApplicationResult,
  CreateRedshiftIdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      IdcInstanceArn: 0,
      RedshiftIdcApplicationName: 0,
      IdentityNamespace: 0,
      IdcDisplayName: 0,
      IamRoleArn: 0,
      AuthorizedTokenIssuerList: D.list(i_AuthorizedTokenIssuer),
      ServiceIntegrations: D.list(i_ServiceIntegrationsUnion),
      ApplicationType: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      SsoTagKeys: D.list(0, { item: "TagKey" }),
    },
    output: { RedshiftIdcApplication: o_RedshiftIdcApplication },
  },
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    InvalidTagFault,
    RedshiftIdcApplicationAlreadyExistsFault,
    RedshiftIdcApplicationQuotaExceededFault,
    TagLimitExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRedshiftIdcApplication",
})) as any;

export type CreateScheduledActionError =
  | ClusterNotFoundFault
  | InvalidScheduledActionFault
  | InvalidScheduleFault
  | ScheduledActionAlreadyExistsFault
  | ScheduledActionQuotaExceededFault
  | ScheduledActionTypeUnsupportedFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a scheduled action. A scheduled action contains a schedule and an Amazon Redshift API action.
 * For example, you can create a schedule of when to run the `ResizeCluster` API operation.
 */
export const createScheduledAction: API.OperationMethod<
  CreateScheduledActionMessage,
  ScheduledAction,
  CreateScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ScheduledActionName: 0,
      TargetAction: i_ScheduledActionType,
      Schedule: 0,
      IamRole: 0,
      ScheduledActionDescription: 0,
      StartTime: 0,
      EndTime: 0,
      Enable: 0,
    },
    output: {
      TargetAction: o_ScheduledActionType,
      NextInvocations: D.list(D.ts, { item: "ScheduledActionTime" }),
      StartTime: D.ts,
      EndTime: D.ts,
    },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidScheduledActionFault,
    InvalidScheduleFault,
    ScheduledActionAlreadyExistsFault,
    ScheduledActionQuotaExceededFault,
    ScheduledActionTypeUnsupportedFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduledAction",
})) as any;

export type CreateSnapshotCopyGrantError =
  | DependentServiceRequestThrottlingFault
  | InvalidTagFault
  | LimitExceededFault
  | SnapshotCopyGrantAlreadyExistsFault
  | SnapshotCopyGrantQuotaExceededFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates a snapshot copy grant that permits Amazon Redshift to use an encrypted symmetric key
 * from Key Management Service (KMS) to encrypt copied snapshots in a
 * destination region.
 *
 * For more information about managing snapshot copy grants, go to
 * Amazon Redshift Database Encryption
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createSnapshotCopyGrant: API.OperationMethod<
  CreateSnapshotCopyGrantMessage,
  CreateSnapshotCopyGrantResult,
  CreateSnapshotCopyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SnapshotCopyGrantName: 0,
      KmsKeyId: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { SnapshotCopyGrant: o_SnapshotCopyGrant },
  },
  errors: [
    DependentServiceRequestThrottlingFault,
    InvalidTagFault,
    LimitExceededFault,
    SnapshotCopyGrantAlreadyExistsFault,
    SnapshotCopyGrantQuotaExceededFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshotCopyGrant",
})) as any;

export type CreateSnapshotScheduleError =
  | InvalidScheduleFault
  | InvalidTagFault
  | ScheduleDefinitionTypeUnsupportedFault
  | SnapshotScheduleAlreadyExistsFault
  | SnapshotScheduleQuotaExceededFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Create a snapshot schedule that can be associated to a cluster and which overrides the default system backup schedule.
 */
export const createSnapshotSchedule: API.OperationMethod<
  CreateSnapshotScheduleMessage,
  SnapshotSchedule,
  CreateSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ScheduleDefinitions: D.list(0, { item: "ScheduleDefinition" }),
      ScheduleIdentifier: 0,
      ScheduleDescription: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
      DryRun: 0,
      NextInvocations: 0,
    },
    output: {
      ScheduleDefinitions: D.list(0, { item: "ScheduleDefinition" }),
      Tags: D.list({}, { item: "Tag" }),
      NextInvocations: D.list(D.ts, { item: "SnapshotTime" }),
      AssociatedClusterCount: D.num,
      AssociatedClusters: D.list({}, { item: "ClusterAssociatedToSchedule" }),
    },
  },
  errors: [
    InvalidScheduleFault,
    InvalidTagFault,
    ScheduleDefinitionTypeUnsupportedFault,
    SnapshotScheduleAlreadyExistsFault,
    SnapshotScheduleQuotaExceededFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshotSchedule",
})) as any;

export type CreateTagsError =
  | InvalidClusterStateFault
  | InvalidTagFault
  | ResourceNotFoundFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Adds tags to a cluster.
 *
 * A resource can have up to 50 tags. If you try to create more than 50 tags for a
 * resource, you will receive an error and the attempt will fail.
 *
 * If you specify a key that already exists for the resource, the value for that key
 * will be updated with the new value.
 */
export const createTags: API.OperationMethod<
  CreateTagsMessage,
  CreateTagsResponse,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceName: 0, Tags: D.list(i_Tag, { item: "Tag" }) },
  },
  errors: [
    InvalidClusterStateFault,
    InvalidTagFault,
    ResourceNotFoundFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
})) as any;

export type CreateUsageLimitError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidUsageLimitFault
  | LimitExceededFault
  | TagLimitExceededFault
  | UnsupportedOperationFault
  | UsageLimitAlreadyExistsFault
  | CommonErrors;
/**
 * Creates a usage limit for a specified Amazon Redshift feature on a cluster.
 * The usage limit is identified by the returned usage limit identifier.
 */
export const createUsageLimit: API.OperationMethod<
  CreateUsageLimitMessage,
  UsageLimit,
  CreateUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      FeatureType: 0,
      LimitType: 0,
      Amount: 0,
      Period: 0,
      BreachAction: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { Amount: D.num, Tags: D.list({}, { item: "Tag" }) },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidUsageLimitFault,
    LimitExceededFault,
    TagLimitExceededFault,
    UnsupportedOperationFault,
    UsageLimitAlreadyExistsFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsageLimit",
})) as any;

export type DeauthorizeDataShareError = InvalidDataShareFault | CommonErrors;
/**
 * From a datashare producer account, removes authorization from the specified datashare.
 */
export const deauthorizeDataShare: API.OperationMethod<
  DeauthorizeDataShareMessage,
  DataShare,
  DeauthorizeDataShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DataShareArn: 0, ConsumerIdentifier: 0 },
    output: {
      AllowPubliclyAccessibleConsumers: D.bool,
      DataShareAssociations: D.list(o_DataShareAssociation),
    },
  },
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeauthorizeDataShare",
})) as any;

export type DeleteAuthenticationProfileError =
  | AuthenticationProfileNotFoundFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Deletes an authentication profile.
 */
export const deleteAuthenticationProfile: API.OperationMethod<
  DeleteAuthenticationProfileMessage,
  DeleteAuthenticationProfileResult,
  DeleteAuthenticationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AuthenticationProfileName: 0 } },
  errors: [
    AuthenticationProfileNotFoundFault,
    InvalidAuthenticationProfileRequestFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuthenticationProfile",
})) as any;

export type DeleteClusterError =
  | ClusterNotFoundFault
  | ClusterSnapshotAlreadyExistsFault
  | ClusterSnapshotQuotaExceededFault
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Deletes a previously provisioned cluster without its final snapshot being created. A successful response from the web
 * service indicates that the request was received correctly. Use DescribeClusters to monitor the status of the deletion. The delete
 * operation cannot be canceled or reverted once submitted.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * If you want to shut down the cluster and retain it for future use, set
 * *SkipFinalClusterSnapshot* to `false` and specify a
 * name for *FinalClusterSnapshotIdentifier*. You can later restore this
 * snapshot to resume using the cluster. If a final cluster snapshot is requested, the
 * status of the cluster will be "final-snapshot" while the snapshot is being taken, then
 * it's "deleting" once Amazon Redshift begins deleting the cluster.
 *
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterMessage,
  DeleteClusterResult,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      SkipFinalClusterSnapshot: 0,
      FinalClusterSnapshotIdentifier: 0,
      FinalClusterSnapshotRetentionPeriod: 0,
    },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotAlreadyExistsFault,
    ClusterSnapshotQuotaExceededFault,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
})) as any;

export type DeleteClusterParameterGroupError =
  | ClusterParameterGroupNotFoundFault
  | InvalidClusterParameterGroupStateFault
  | CommonErrors;
/**
 * Deletes a specified Amazon Redshift parameter group.
 *
 * You cannot delete a parameter group if it is associated with a
 * cluster.
 */
export const deleteClusterParameterGroup: API.OperationMethod<
  DeleteClusterParameterGroupMessage,
  DeleteClusterParameterGroupResponse,
  DeleteClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ParameterGroupName: 0 } },
  errors: [
    ClusterParameterGroupNotFoundFault,
    InvalidClusterParameterGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterParameterGroup",
})) as any;

export type DeleteClusterSecurityGroupError =
  | ClusterSecurityGroupNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift security group.
 *
 * You cannot delete a security group that is associated with any clusters. You
 * cannot delete the default security group.
 *
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const deleteClusterSecurityGroup: API.OperationMethod<
  DeleteClusterSecurityGroupMessage,
  DeleteClusterSecurityGroupResponse,
  DeleteClusterSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClusterSecurityGroupName: 0 } },
  errors: [
    ClusterSecurityGroupNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterSecurityGroup",
})) as any;

export type DeleteClusterSnapshotError =
  | ClusterSnapshotNotFoundFault
  | InvalidClusterSnapshotStateFault
  | CommonErrors;
/**
 * Deletes the specified manual snapshot. The snapshot must be in the
 * `available` state, with no other users authorized to access the snapshot.
 *
 * Unlike automated snapshots, manual snapshots are retained even after you delete
 * your cluster. Amazon Redshift does not delete your manual snapshots. You must delete manual
 * snapshot explicitly to avoid getting charged. If other accounts are authorized to access
 * the snapshot, you must revoke all of the authorizations before you can delete the
 * snapshot.
 */
export const deleteClusterSnapshot: API.OperationMethod<
  DeleteClusterSnapshotMessage,
  DeleteClusterSnapshotResult,
  DeleteClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SnapshotIdentifier: 0, SnapshotClusterIdentifier: 0 },
    output: { Snapshot: o_Snapshot },
  },
  errors: [ClusterSnapshotNotFoundFault, InvalidClusterSnapshotStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterSnapshot",
})) as any;

export type DeleteClusterSubnetGroupError =
  | ClusterSubnetGroupNotFoundFault
  | InvalidClusterSubnetGroupStateFault
  | InvalidClusterSubnetStateFault
  | CommonErrors;
/**
 * Deletes the specified cluster subnet group.
 */
export const deleteClusterSubnetGroup: API.OperationMethod<
  DeleteClusterSubnetGroupMessage,
  DeleteClusterSubnetGroupResponse,
  DeleteClusterSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClusterSubnetGroupName: 0 } },
  errors: [
    ClusterSubnetGroupNotFoundFault,
    InvalidClusterSubnetGroupStateFault,
    InvalidClusterSubnetStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterSubnetGroup",
})) as any;

export type DeleteCustomDomainAssociationError =
  | ClusterNotFoundFault
  | CustomCnameAssociationFault
  | CustomDomainAssociationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Contains information about deleting a custom domain association for a cluster.
 */
export const deleteCustomDomainAssociation: API.OperationMethod<
  DeleteCustomDomainAssociationMessage,
  DeleteCustomDomainAssociationResponse,
  DeleteCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0, CustomDomainName: 0 },
  },
  errors: [
    ClusterNotFoundFault,
    CustomCnameAssociationFault,
    CustomDomainAssociationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomDomainAssociation",
})) as any;

export type DeleteEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidEndpointStateFault
  | CommonErrors;
/**
 * Deletes a Redshift-managed VPC endpoint.
 */
export const deleteEndpointAccess: API.OperationMethod<
  DeleteEndpointAccessMessage,
  EndpointAccess,
  DeleteEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { EndpointName: 0 },
    output: {
      EndpointCreateTime: D.ts,
      Port: D.num,
      VpcSecurityGroups: D.list({}, { item: "VpcSecurityGroup" }),
      VpcEndpoint: o_VpcEndpoint,
    },
  },
  errors: [
    ClusterNotFoundFault,
    EndpointNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidEndpointStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpointAccess",
})) as any;

export type DeleteEventSubscriptionError =
  | InvalidSubscriptionStateFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift event notification subscription.
 */
export const deleteEventSubscription: API.OperationMethod<
  DeleteEventSubscriptionMessage,
  DeleteEventSubscriptionResponse,
  DeleteEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SubscriptionName: 0 } },
  errors: [InvalidSubscriptionStateFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSubscription",
})) as any;

export type DeleteHsmClientCertificateError =
  | HsmClientCertificateNotFoundFault
  | InvalidHsmClientCertificateStateFault
  | CommonErrors;
/**
 * Deletes the specified HSM client certificate.
 */
export const deleteHsmClientCertificate: API.OperationMethod<
  DeleteHsmClientCertificateMessage,
  DeleteHsmClientCertificateResponse,
  DeleteHsmClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HsmClientCertificateIdentifier: 0 } },
  errors: [
    HsmClientCertificateNotFoundFault,
    InvalidHsmClientCertificateStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHsmClientCertificate",
})) as any;

export type DeleteHsmConfigurationError =
  | HsmConfigurationNotFoundFault
  | InvalidHsmConfigurationStateFault
  | CommonErrors;
/**
 * Deletes the specified Amazon Redshift HSM configuration.
 */
export const deleteHsmConfiguration: API.OperationMethod<
  DeleteHsmConfigurationMessage,
  DeleteHsmConfigurationResponse,
  DeleteHsmConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HsmConfigurationIdentifier: 0 } },
  errors: [HsmConfigurationNotFoundFault, InvalidHsmConfigurationStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHsmConfiguration",
})) as any;

export type DeleteIntegrationError =
  | IntegrationConflictOperationFault
  | IntegrationConflictStateFault
  | IntegrationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes a zero-ETL integration or S3 event integration with Amazon Redshift.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationMessage,
  Integration,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IntegrationArn: 0 },
    output: {
      Errors: D.list({}, { item: "IntegrationError" }),
      CreateTime: D.ts,
      AdditionalEncryptionContext: D.map(),
      Tags: D.list({}, { item: "Tag" }),
    },
  },
  errors: [
    IntegrationConflictOperationFault,
    IntegrationConflictStateFault,
    IntegrationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
})) as any;

export type DeletePartnerError =
  | ClusterNotFoundFault
  | PartnerNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes a partner integration from a cluster. Data can still flow to the cluster until the integration is deleted at the partner's website.
 */
export const deletePartner: API.OperationMethod<
  PartnerIntegrationInputMessage,
  PartnerIntegrationOutputMessage,
  DeletePartnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      ClusterIdentifier: 0,
      DatabaseName: 0,
      PartnerName: 0,
    },
  },
  errors: [
    ClusterNotFoundFault,
    PartnerNotFoundFault,
    UnauthorizedPartnerIntegrationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePartner",
})) as any;

export type DeleteQev2IdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift Query Editor (QEV2) IAM Identity Center application.
 */
export const deleteQev2IdcApplication: API.OperationMethod<
  DeleteQev2IdcApplicationMessage,
  DeleteQev2IdcApplicationResponse,
  DeleteQev2IdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Qev2IdcApplicationArn: 0 } },
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQev2IdcApplication",
})) as any;

export type DeleteRedshiftIdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | RedshiftIdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift IAM Identity Center application.
 */
export const deleteRedshiftIdcApplication: API.OperationMethod<
  DeleteRedshiftIdcApplicationMessage,
  DeleteRedshiftIdcApplicationResponse,
  DeleteRedshiftIdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RedshiftIdcApplicationArn: 0 } },
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    RedshiftIdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRedshiftIdcApplication",
})) as any;

export type DeleteResourcePolicyError =
  | ResourceNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes the resource policy for a specified resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyMessage,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [ResourceNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteScheduledActionError =
  | ScheduledActionNotFoundFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Deletes a scheduled action.
 */
export const deleteScheduledAction: API.OperationMethod<
  DeleteScheduledActionMessage,
  DeleteScheduledActionResponse,
  DeleteScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ScheduledActionName: 0 } },
  errors: [ScheduledActionNotFoundFault, UnauthorizedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAction",
})) as any;

export type DeleteSnapshotCopyGrantError =
  | InvalidSnapshotCopyGrantStateFault
  | SnapshotCopyGrantNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified snapshot copy grant.
 */
export const deleteSnapshotCopyGrant: API.OperationMethod<
  DeleteSnapshotCopyGrantMessage,
  DeleteSnapshotCopyGrantResponse,
  DeleteSnapshotCopyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SnapshotCopyGrantName: 0 } },
  errors: [InvalidSnapshotCopyGrantStateFault, SnapshotCopyGrantNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshotCopyGrant",
})) as any;

export type DeleteSnapshotScheduleError =
  | InvalidClusterSnapshotScheduleStateFault
  | SnapshotScheduleNotFoundFault
  | CommonErrors;
/**
 * Deletes a snapshot schedule.
 */
export const deleteSnapshotSchedule: API.OperationMethod<
  DeleteSnapshotScheduleMessage,
  DeleteSnapshotScheduleResponse,
  DeleteSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ScheduleIdentifier: 0 } },
  errors: [
    InvalidClusterSnapshotScheduleStateFault,
    SnapshotScheduleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshotSchedule",
})) as any;

export type DeleteTagsError =
  | InvalidTagFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes tags from a resource. You must provide the ARN of the resource
 * from which you want to delete the tag or tags.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsMessage,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceName: 0, TagKeys: D.list(0, { item: "TagKey" }) },
  },
  errors: [InvalidTagFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
})) as any;

export type DeleteUsageLimitError =
  | UnsupportedOperationFault
  | UsageLimitNotFoundFault
  | CommonErrors;
/**
 * Deletes a usage limit from a cluster.
 */
export const deleteUsageLimit: API.OperationMethod<
  DeleteUsageLimitMessage,
  DeleteUsageLimitResponse,
  DeleteUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UsageLimitId: 0 } },
  errors: [UnsupportedOperationFault, UsageLimitNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageLimit",
})) as any;

export type DeregisterNamespaceError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * Deregisters a cluster or serverless namespace from the Amazon Web Services Glue Data Catalog.
 */
export const deregisterNamespace: API.OperationMethod<
  DeregisterNamespaceInputMessage,
  DeregisterNamespaceOutputMessage,
  DeregisterNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NamespaceIdentifier: i_NamespaceIdentifierUnion,
      ConsumerIdentifiers: 0,
    },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidNamespaceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterNamespace",
})) as any;

export type DescribeAccountAttributesError = CommonErrors;
/**
 * Returns a list of attributes attached to an account
 */
export const describeAccountAttributes: API.OperationMethod<
  DescribeAccountAttributesMessage,
  AccountAttributeList,
  DescribeAccountAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AttributeNames: D.list(0, { item: "AttributeName" }) },
    output: {
      AccountAttributes: D.list(
        { AttributeValues: D.list({}, { item: "AttributeValueTarget" }) },
        { item: "AccountAttribute" },
      ),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAttributes",
})) as any;

export type DescribeAuthenticationProfilesError =
  | AuthenticationProfileNotFoundFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Describes an authentication profile.
 */
export const describeAuthenticationProfiles: API.OperationMethod<
  DescribeAuthenticationProfilesMessage,
  DescribeAuthenticationProfilesResult,
  DescribeAuthenticationProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AuthenticationProfileName: 0 },
    output: { AuthenticationProfiles: D.list({}) },
  },
  errors: [
    AuthenticationProfileNotFoundFault,
    InvalidAuthenticationProfileRequestFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuthenticationProfiles",
})) as any;

export type DescribeClusterDbRevisionsError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Returns an array of `ClusterDbRevision` objects.
 */
export const describeClusterDbRevisions: API.PaginatedOperationMethod<
  DescribeClusterDbRevisionsMessage,
  ClusterDbRevisionsMessage,
  DescribeClusterDbRevisionsError,
  Credentials | HttpClient.HttpClient,
  ClusterDbRevision
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0, MaxRecords: 0, Marker: 0 },
    output: {
      ClusterDbRevisions: D.list(
        {
          DatabaseRevisionReleaseDate: D.ts,
          RevisionTargets: D.list(
            { DatabaseRevisionReleaseDate: D.ts },
            { item: "RevisionTarget" },
          ),
        },
        { item: "ClusterDbRevision" },
      ),
    },
  },
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterDbRevisions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterDbRevisions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterParameterGroupsError =
  | ClusterParameterGroupNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns a list of Amazon Redshift parameter groups, including parameter groups you
 * created and the default parameter group. For each parameter group, the response includes
 * the parameter group name, description, and parameter group family name. You can
 * optionally specify a name to retrieve the description of a specific parameter
 * group.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all parameter groups that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all parameter groups that
 * have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, parameter groups are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeClusterParameterGroups: API.PaginatedOperationMethod<
  DescribeClusterParameterGroupsMessage,
  ClusterParameterGroupsMessage,
  DescribeClusterParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  ClusterParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ParameterGroupName: 0,
      MaxRecords: 0,
      Marker: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
    },
    output: {
      ParameterGroups: D.list(o_ClusterParameterGroup, {
        item: "ClusterParameterGroup",
      }),
    },
  },
  errors: [ClusterParameterGroupNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterParameterGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ParameterGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterParametersError =
  | ClusterParameterGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a detailed list of parameters contained within the specified Amazon Redshift
 * parameter group. For each parameter the response includes information such as parameter
 * name, description, data type, value, whether the parameter value is modifiable, and so
 * on.
 *
 * You can specify *source* filter to retrieve parameters of only
 * specific type. For example, to retrieve parameters that were modified by a user action
 * such as from ModifyClusterParameterGroup, you can specify
 * *source* equal to *user*.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeClusterParameters: API.PaginatedOperationMethod<
  DescribeClusterParametersMessage,
  ClusterParameterGroupDetails,
  DescribeClusterParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ParameterGroupName: 0, Source: 0, MaxRecords: 0, Marker: 0 },
    output: { Parameters: D.list(o_Parameter, { item: "Parameter" }) },
  },
  errors: [ClusterParameterGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClustersError =
  | ClusterNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns properties of provisioned clusters including general cluster properties,
 * cluster database properties, maintenance and backup properties, and security and access
 * properties. This operation supports pagination.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all clusters that match any combination of the specified keys and values. For example,
 * if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all clusters that have any
 * combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, clusters are returned
 * regardless of whether they have tag keys or values associated with them.
 */
export const describeClusters: API.PaginatedOperationMethod<
  DescribeClustersMessage,
  ClustersMessage,
  DescribeClustersError,
  Credentials | HttpClient.HttpClient,
  Cluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      MaxRecords: 0,
      Marker: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
    },
    output: { Clusters: D.list(o_Cluster, { item: "Cluster" }) },
  },
  errors: [ClusterNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Clusters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterSecurityGroupsError =
  | ClusterSecurityGroupNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns information about Amazon Redshift security groups. If the name of a security
 * group is specified, the response will contain only information about only that security
 * group.
 *
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all security groups that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all security groups that
 * have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, security groups are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeClusterSecurityGroups: API.PaginatedOperationMethod<
  DescribeClusterSecurityGroupsMessage,
  ClusterSecurityGroupMessage,
  DescribeClusterSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  ClusterSecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterSecurityGroupName: 0,
      MaxRecords: 0,
      Marker: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
    },
    output: {
      ClusterSecurityGroups: D.list(o_ClusterSecurityGroup, {
        item: "ClusterSecurityGroup",
      }),
    },
  },
  errors: [ClusterSecurityGroupNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterSecurityGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterSecurityGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterSnapshotsError =
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | InvalidTagFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns one or more snapshot objects, which contain metadata about your cluster
 * snapshots. By default, this operation returns information about all snapshots of all
 * clusters that are owned by your Amazon Web Services account. No information is returned for
 * snapshots owned by inactive Amazon Web Services accounts.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all snapshots that match any combination of the specified keys and values. For example,
 * if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all snapshots that have any
 * combination of those values are returned. Only snapshots that you own are returned in
 * the response; shared snapshots are not returned with the tag key and tag value request
 * parameters.
 *
 * If both tag keys and values are omitted from the request, snapshots are returned
 * regardless of whether they have tag keys or values associated with them.
 */
export const describeClusterSnapshots: API.PaginatedOperationMethod<
  DescribeClusterSnapshotsMessage,
  SnapshotMessage,
  DescribeClusterSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      SnapshotIdentifier: 0,
      SnapshotArn: 0,
      SnapshotType: 0,
      StartTime: 0,
      EndTime: 0,
      MaxRecords: 0,
      Marker: 0,
      OwnerAccount: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
      ClusterExists: 0,
      SortingEntities: D.list(
        { Attribute: 0, SortOrder: 0 },
        { item: "SnapshotSortingEntity" },
      ),
    },
    output: { Snapshots: D.list(o_Snapshot, { item: "Snapshot" }) },
  },
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    InvalidTagFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterSnapshots",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Snapshots",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterSubnetGroupsError =
  | ClusterSubnetGroupNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns one or more cluster subnet group objects, which contain metadata about your
 * cluster subnet groups. By default, this operation returns information about all cluster
 * subnet groups that are defined in your Amazon Web Services account.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all subnet groups that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all subnet groups that have
 * any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, subnet groups are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeClusterSubnetGroups: API.PaginatedOperationMethod<
  DescribeClusterSubnetGroupsMessage,
  ClusterSubnetGroupMessage,
  DescribeClusterSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  ClusterSubnetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterSubnetGroupName: 0,
      MaxRecords: 0,
      Marker: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
    },
    output: {
      ClusterSubnetGroups: D.list(o_ClusterSubnetGroup, {
        item: "ClusterSubnetGroup",
      }),
    },
  },
  errors: [ClusterSubnetGroupNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterSubnetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterSubnetGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterTracksError =
  | InvalidClusterTrackFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Returns a list of all the available maintenance tracks.
 */
export const describeClusterTracks: API.PaginatedOperationMethod<
  DescribeClusterTracksMessage,
  TrackListMessage,
  DescribeClusterTracksError,
  Credentials | HttpClient.HttpClient,
  MaintenanceTrack
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaintenanceTrackName: 0, MaxRecords: 0, Marker: 0 },
    output: {
      MaintenanceTracks: D.list(
        {
          UpdateTargets: D.list(
            { SupportedOperations: D.list({}, { item: "SupportedOperation" }) },
            { item: "UpdateTarget" },
          ),
        },
        { item: "MaintenanceTrack" },
      ),
    },
  },
  errors: [InvalidClusterTrackFault, UnauthorizedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterTracks",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "MaintenanceTracks",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterVersionsError = CommonErrors;
/**
 * Returns descriptions of the available Amazon Redshift cluster versions. You can call this
 * operation even before creating any clusters to learn more about the Amazon Redshift versions.
 *
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeClusterVersions: API.PaginatedOperationMethod<
  DescribeClusterVersionsMessage,
  ClusterVersionsMessage,
  DescribeClusterVersionsError,
  Credentials | HttpClient.HttpClient,
  ClusterVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterVersion: 0,
      ClusterParameterGroupFamily: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: { ClusterVersions: D.list({}, { item: "ClusterVersion" }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterVersions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeCustomDomainAssociationsError =
  | CustomDomainAssociationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Contains information about custom domain associations for a cluster.
 */
export const describeCustomDomainAssociations: API.PaginatedOperationMethod<
  DescribeCustomDomainAssociationsMessage,
  CustomDomainAssociationsMessage,
  DescribeCustomDomainAssociationsError,
  Credentials | HttpClient.HttpClient,
  Association
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      CustomDomainName: 0,
      CustomDomainCertificateArn: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      Associations: D.list(
        {
          CustomDomainCertificateExpiryDate: D.ts,
          CertificateAssociations: D.list(
            {},
            { item: "CertificateAssociation" },
          ),
        },
        { item: "Association" },
      ),
    },
  },
  errors: [CustomDomainAssociationNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomDomainAssociations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Associations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDataSharesError = InvalidDataShareFault | CommonErrors;
/**
 * Shows the status of any inbound or outbound datashares available in the specified
 * account.
 */
export const describeDataShares: API.PaginatedOperationMethod<
  DescribeDataSharesMessage,
  DescribeDataSharesResult,
  DescribeDataSharesError,
  Credentials | HttpClient.HttpClient,
  DataShare
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DataShareArn: 0, MaxRecords: 0, Marker: 0 },
    output: { DataShares: D.list(o_DataShare) },
  },
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataShares",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DataShares",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDataSharesForConsumerError =
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * Returns a list of datashares where the account identifier being called is a consumer account identifier.
 */
export const describeDataSharesForConsumer: API.PaginatedOperationMethod<
  DescribeDataSharesForConsumerMessage,
  DescribeDataSharesForConsumerResult,
  DescribeDataSharesForConsumerError,
  Credentials | HttpClient.HttpClient,
  DataShare
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ConsumerArn: 0, Status: 0, MaxRecords: 0, Marker: 0 },
    output: { DataShares: D.list(o_DataShare) },
  },
  errors: [InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSharesForConsumer",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DataShares",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDataSharesForProducerError =
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * Returns a list of datashares when the account identifier being called is a producer account identifier.
 */
export const describeDataSharesForProducer: API.PaginatedOperationMethod<
  DescribeDataSharesForProducerMessage,
  DescribeDataSharesForProducerResult,
  DescribeDataSharesForProducerError,
  Credentials | HttpClient.HttpClient,
  DataShare
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ProducerArn: 0, Status: 0, MaxRecords: 0, Marker: 0 },
    output: { DataShares: D.list(o_DataShare) },
  },
  errors: [InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSharesForProducer",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DataShares",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDefaultClusterParametersError = CommonErrors;
/**
 * Returns a list of parameter settings for the specified parameter group
 * family.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeDefaultClusterParameters: API.PaginatedOperationMethod<
  DescribeDefaultClusterParametersMessage,
  DescribeDefaultClusterParametersResult,
  DescribeDefaultClusterParametersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ParameterGroupFamily: 0, MaxRecords: 0, Marker: 0 },
    output: {
      DefaultClusterParameters: {
        Parameters: D.list(o_Parameter, { item: "Parameter" }),
      },
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDefaultClusterParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "DefaultClusterParameters.Marker",
    items: "DefaultClusterParameters.Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Describes a Redshift-managed VPC endpoint.
 */
export const describeEndpointAccess: API.PaginatedOperationMethod<
  DescribeEndpointAccessMessage,
  EndpointAccessList,
  DescribeEndpointAccessError,
  Credentials | HttpClient.HttpClient,
  EndpointAccess
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      ResourceOwner: 0,
      EndpointName: 0,
      VpcId: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      EndpointAccessList: D.list({
        EndpointCreateTime: D.ts,
        Port: D.num,
        VpcSecurityGroups: D.list({}, { item: "VpcSecurityGroup" }),
        VpcEndpoint: o_VpcEndpoint,
      }),
    },
  },
  errors: [
    ClusterNotFoundFault,
    EndpointNotFoundFault,
    InvalidClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointAccess",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "EndpointAccessList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointAuthorizationError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Describes an endpoint authorization.
 */
export const describeEndpointAuthorization: API.PaginatedOperationMethod<
  DescribeEndpointAuthorizationMessage,
  EndpointAuthorizationList,
  DescribeEndpointAuthorizationError,
  Credentials | HttpClient.HttpClient,
  EndpointAuthorization
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      Account: 0,
      Grantee: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      EndpointAuthorizationList: D.list({
        AuthorizeTime: D.ts,
        AllowedAllVPCs: D.bool,
        AllowedVPCs: D.list(0, { item: "VpcIdentifier" }),
        EndpointCount: D.num,
      }),
    },
  },
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointAuthorization",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "EndpointAuthorizationList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventCategoriesError = CommonErrors;
/**
 * Displays a list of event categories for all event source types, or for a specified
 * source type. For a list of the event categories and source types, go to Amazon Redshift Event
 * Notifications.
 */
export const describeEventCategories: API.OperationMethod<
  DescribeEventCategoriesMessage,
  EventCategoriesMessage,
  DescribeEventCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { SourceType: 0 },
    output: {
      EventCategoriesMapList: D.list(
        {
          Events: D.list(
            { EventCategories: D.list(0, { item: "EventCategory" }) },
            { item: "EventInfoMap" },
          ),
        },
        { item: "EventCategoriesMap" },
      ),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventCategories",
})) as any;

export type DescribeEventsError = CommonErrors;
/**
 * Returns events related to clusters, security groups, snapshots, and parameter
 * groups for the past 14 days. Events specific to a particular cluster, security group,
 * snapshot or parameter group can be obtained by providing the name as a parameter. By
 * default, the past hour of events are returned.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsMessage,
  EventsMessage,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceIdentifier: 0,
      SourceType: 0,
      StartTime: 0,
      EndTime: 0,
      Duration: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      Events: D.list(
        { EventCategories: D.list(0, { item: "EventCategory" }), Date: D.ts },
        { item: "Event" },
      ),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Events",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventSubscriptionsError =
  | InvalidTagFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Lists descriptions of all the Amazon Redshift event notification subscriptions for a
 * customer account. If you specify a subscription name, lists the description for that
 * subscription.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all event notification subscriptions that match any combination of the specified keys
 * and values. For example, if you have `owner` and `environment` for
 * tag keys, and `admin` and `test` for tag values, all subscriptions
 * that have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, subscriptions are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeEventSubscriptions: API.PaginatedOperationMethod<
  DescribeEventSubscriptionsMessage,
  EventSubscriptionsMessage,
  DescribeEventSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  EventSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SubscriptionName: 0,
      MaxRecords: 0,
      Marker: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
    },
    output: {
      EventSubscriptionsList: D.list(o_EventSubscription, {
        item: "EventSubscription",
      }),
    },
  },
  errors: [InvalidTagFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventSubscriptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "EventSubscriptionsList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeHsmClientCertificatesError =
  | HsmClientCertificateNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns information about the specified HSM client certificate. If no certificate
 * ID is specified, returns information about all the HSM certificates owned by your Amazon Web Services account.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all HSM client certificates that match any combination of the specified keys and values.
 * For example, if you have `owner` and `environment` for tag keys,
 * and `admin` and `test` for tag values, all HSM client certificates
 * that have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, HSM client certificates
 * are returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeHsmClientCertificates: API.PaginatedOperationMethod<
  DescribeHsmClientCertificatesMessage,
  HsmClientCertificateMessage,
  DescribeHsmClientCertificatesError,
  Credentials | HttpClient.HttpClient,
  HsmClientCertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      HsmClientCertificateIdentifier: 0,
      MaxRecords: 0,
      Marker: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
    },
    output: {
      HsmClientCertificates: D.list(o_HsmClientCertificate, {
        item: "HsmClientCertificate",
      }),
    },
  },
  errors: [HsmClientCertificateNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHsmClientCertificates",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "HsmClientCertificates",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeHsmConfigurationsError =
  | HsmConfigurationNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns information about the specified Amazon Redshift HSM configuration. If no
 * configuration ID is specified, returns information about all the HSM configurations
 * owned by your Amazon Web Services account.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all HSM connections that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all HSM connections that
 * have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, HSM connections are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeHsmConfigurations: API.PaginatedOperationMethod<
  DescribeHsmConfigurationsMessage,
  HsmConfigurationMessage,
  DescribeHsmConfigurationsError,
  Credentials | HttpClient.HttpClient,
  HsmConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      HsmConfigurationIdentifier: 0,
      MaxRecords: 0,
      Marker: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
    },
    output: {
      HsmConfigurations: D.list(o_HsmConfiguration, {
        item: "HsmConfiguration",
      }),
    },
  },
  errors: [HsmConfigurationNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHsmConfigurations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "HsmConfigurations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeInboundIntegrationsError =
  | IntegrationNotFoundFault
  | InvalidNamespaceFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a list of inbound integrations.
 */
export const describeInboundIntegrations: API.PaginatedOperationMethod<
  DescribeInboundIntegrationsMessage,
  InboundIntegrationsMessage,
  DescribeInboundIntegrationsError,
  Credentials | HttpClient.HttpClient,
  InboundIntegration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { IntegrationArn: 0, TargetArn: 0, MaxRecords: 0, Marker: 0 },
    output: {
      InboundIntegrations: D.list(
        { Errors: D.list({}, { item: "IntegrationError" }), CreateTime: D.ts },
        { item: "InboundIntegration" },
      ),
    },
  },
  errors: [
    IntegrationNotFoundFault,
    InvalidNamespaceFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundIntegrations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "InboundIntegrations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeIntegrationsError =
  | IntegrationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Describes one or more zero-ETL or S3 event integrations with Amazon Redshift.
 */
export const describeIntegrations: API.PaginatedOperationMethod<
  DescribeIntegrationsMessage,
  IntegrationsMessage,
  DescribeIntegrationsError,
  Credentials | HttpClient.HttpClient,
  Integration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      IntegrationArn: 0,
      MaxRecords: 0,
      Marker: 0,
      Filters: D.list(
        { Name: 0, Values: D.list(0, { item: "Value" }) },
        { item: "DescribeIntegrationsFilter" },
      ),
    },
    output: {
      Integrations: D.list(
        {
          Errors: D.list({}, { item: "IntegrationError" }),
          CreateTime: D.ts,
          AdditionalEncryptionContext: D.map(),
          Tags: D.list({}, { item: "Tag" }),
        },
        { item: "Integration" },
      ),
    },
  },
  errors: [IntegrationNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIntegrations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Integrations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeLoggingStatusError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Describes whether information, such as queries and connection attempts, is being
 * logged for the specified Amazon Redshift cluster.
 */
export const describeLoggingStatus: API.OperationMethod<
  DescribeLoggingStatusMessage,
  LoggingStatus,
  DescribeLoggingStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0 },
    output: {
      LoggingEnabled: D.bool,
      LastSuccessfulDeliveryTime: D.ts,
      LastFailureTime: D.ts,
      LogExports: D.list(),
      S3Tables: o_S3TablePublishStatus,
    },
  },
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoggingStatus",
})) as any;

export type DescribeNodeConfigurationOptionsError =
  | AccessToSnapshotDeniedFault
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | InvalidClusterSnapshotStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns properties of possible node configurations such as node type, number of nodes, and
 * disk usage for the specified action type.
 */
export const describeNodeConfigurationOptions: API.PaginatedOperationMethod<
  DescribeNodeConfigurationOptionsMessage,
  NodeConfigurationOptionsMessage,
  DescribeNodeConfigurationOptionsError,
  Credentials | HttpClient.HttpClient,
  NodeConfigurationOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ActionType: 0,
      ClusterIdentifier: 0,
      SnapshotIdentifier: 0,
      SnapshotArn: 0,
      OwnerAccount: 0,
      Filters: D.m({
        wire: "Filter",
        shape: D.list(
          {
            Name: 0,
            Operator: 0,
            Values: D.m({ wire: "Value", shape: D.list(0, { item: "item" }) }),
          },
          { item: "NodeConfigurationOptionsFilter" },
        ),
      }),
      Marker: 0,
      MaxRecords: 0,
    },
    output: {
      NodeConfigurationOptionList: D.list(
        { NumberOfNodes: D.num, EstimatedDiskUtilizationPercent: D.num },
        { item: "NodeConfigurationOption" },
      ),
    },
  },
  errors: [
    AccessToSnapshotDeniedFault,
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    InvalidClusterSnapshotStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNodeConfigurationOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "NodeConfigurationOptionList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeOrderableClusterOptionsError = CommonErrors;
/**
 * Returns a list of orderable cluster options. Before you create a new cluster you
 * can use this operation to find what options are available, such as the EC2 Availability
 * Zones (AZ) in the specific Amazon Web Services Region that you can specify, and the node types you can
 * request. The node types differ by available storage, memory, CPU and price. With the
 * cost involved you might want to obtain a list of cluster options in the specific region
 * and specify values when creating a cluster.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeOrderableClusterOptions: API.PaginatedOperationMethod<
  DescribeOrderableClusterOptionsMessage,
  OrderableClusterOptionsMessage,
  DescribeOrderableClusterOptionsError,
  Credentials | HttpClient.HttpClient,
  OrderableClusterOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ClusterVersion: 0, NodeType: 0, MaxRecords: 0, Marker: 0 },
    output: {
      OrderableClusterOptions: D.list(
        {
          AvailabilityZones: D.list(o_AvailabilityZone, {
            item: "AvailabilityZone",
          }),
        },
        { item: "OrderableClusterOption" },
      ),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrderableClusterOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "OrderableClusterOptions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribePartnersError =
  | ClusterNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns information about the partner integrations defined for a cluster.
 */
export const describePartners: API.OperationMethod<
  DescribePartnersInputMessage,
  DescribePartnersOutputMessage,
  DescribePartnersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      ClusterIdentifier: 0,
      DatabaseName: 0,
      PartnerName: 0,
    },
    output: {
      PartnerIntegrationInfoList: D.list(
        { CreatedAt: D.ts, UpdatedAt: D.ts },
        { item: "PartnerIntegrationInfo" },
      ),
    },
  },
  errors: [
    ClusterNotFoundFault,
    UnauthorizedPartnerIntegrationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePartners",
})) as any;

export type DescribeQev2IdcApplicationsError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Lists the Amazon Redshift Query Editor (QEV2) IAM Identity Center applications. To retrieve additional results, use the MaxRecords and Marker parameters.
 */
export const describeQev2IdcApplications: API.PaginatedOperationMethod<
  DescribeQev2IdcApplicationsMessage,
  DescribeQev2IdcApplicationsResult,
  DescribeQev2IdcApplicationsError,
  Credentials | HttpClient.HttpClient,
  Qev2IdcApplication
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Qev2IdcApplicationArn: 0, MaxRecords: 0, Marker: 0 },
    output: { Qev2IdcApplications: D.list(o_Qev2IdcApplication) },
  },
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQev2IdcApplications",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Qev2IdcApplications",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeRedshiftIdcApplicationsError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | RedshiftIdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Lists the Amazon Redshift IAM Identity Center applications.
 */
export const describeRedshiftIdcApplications: API.PaginatedOperationMethod<
  DescribeRedshiftIdcApplicationsMessage,
  DescribeRedshiftIdcApplicationsResult,
  DescribeRedshiftIdcApplicationsError,
  Credentials | HttpClient.HttpClient,
  RedshiftIdcApplication
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { RedshiftIdcApplicationArn: 0, MaxRecords: 0, Marker: 0 },
    output: { RedshiftIdcApplications: D.list(o_RedshiftIdcApplication) },
  },
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    RedshiftIdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRedshiftIdcApplications",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "RedshiftIdcApplications",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedNodeExchangeStatusError =
  | ReservedNodeExchangeNotFoundFault
  | ReservedNodeNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns exchange status details and associated metadata for a reserved-node
 * exchange. Statuses include such values as in progress and requested.
 */
export const describeReservedNodeExchangeStatus: API.PaginatedOperationMethod<
  DescribeReservedNodeExchangeStatusInputMessage,
  DescribeReservedNodeExchangeStatusOutputMessage,
  DescribeReservedNodeExchangeStatusError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeExchangeStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ReservedNodeId: 0,
      ReservedNodeExchangeRequestId: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      ReservedNodeExchangeStatusDetails: D.list(o_ReservedNodeExchangeStatus, {
        item: "ReservedNodeExchangeStatus",
      }),
    },
  },
  errors: [
    ReservedNodeExchangeNotFoundFault,
    ReservedNodeNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodeExchangeStatus",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeExchangeStatusDetails",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedNodeOfferingsError =
  | DependentServiceUnavailableFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a list of the available reserved node offerings by Amazon Redshift with their
 * descriptions including the node type, the fixed and recurring costs of reserving the
 * node and duration the node will be reserved for you. These descriptions help you
 * determine which reserve node offering you want to purchase. You then use the unique
 * offering ID in you call to PurchaseReservedNodeOffering to reserve one
 * or more nodes for your Amazon Redshift cluster.
 *
 * For more information about reserved node offerings, go to
 * Purchasing Reserved Nodes
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeReservedNodeOfferings: API.PaginatedOperationMethod<
  DescribeReservedNodeOfferingsMessage,
  ReservedNodeOfferingsMessage,
  DescribeReservedNodeOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ReservedNodeOfferingId: 0, MaxRecords: 0, Marker: 0 },
    output: {
      ReservedNodeOfferings: D.list(o_ReservedNodeOffering, {
        item: "ReservedNodeOffering",
      }),
    },
  },
  errors: [
    DependentServiceUnavailableFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodeOfferings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeOfferings",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedNodesError =
  | DependentServiceUnavailableFault
  | ReservedNodeNotFoundFault
  | CommonErrors;
/**
 * Returns the descriptions of the reserved nodes.
 */
export const describeReservedNodes: API.PaginatedOperationMethod<
  DescribeReservedNodesMessage,
  ReservedNodesMessage,
  DescribeReservedNodesError,
  Credentials | HttpClient.HttpClient,
  ReservedNode
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ReservedNodeId: 0, MaxRecords: 0, Marker: 0 },
    output: { ReservedNodes: D.list(o_ReservedNode, { item: "ReservedNode" }) },
  },
  errors: [DependentServiceUnavailableFault, ReservedNodeNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodes",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodes",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeResizeError =
  | ClusterNotFoundFault
  | ResizeNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns information about the last resize operation for the specified cluster. If
 * no resize operation has ever been initiated for the specified cluster, a HTTP
 * 404 error is returned. If a resize operation was initiated and completed, the
 * status of the resize remains as `SUCCEEDED` until the next resize.
 *
 * A resize operation can be requested using ModifyCluster and
 * specifying a different number or type of nodes for the cluster.
 */
export const describeResize: API.OperationMethod<
  DescribeResizeMessage,
  ResizeProgressMessage,
  DescribeResizeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0 },
    output: {
      TargetNumberOfNodes: D.num,
      ImportTablesCompleted: D.list(),
      ImportTablesInProgress: D.list(),
      ImportTablesNotStarted: D.list(),
      AvgResizeRateInMegaBytesPerSecond: D.num,
      TotalResizeDataInMegaBytes: D.num,
      ProgressInMegaBytes: D.num,
      ElapsedTimeInSeconds: D.num,
      EstimatedTimeToCompletionInSeconds: D.num,
      DataTransferProgressPercent: D.num,
    },
  },
  errors: [
    ClusterNotFoundFault,
    ResizeNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResize",
})) as any;

export type DescribeScheduledActionsError =
  | ScheduledActionNotFoundFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Describes properties of scheduled actions.
 */
export const describeScheduledActions: API.PaginatedOperationMethod<
  DescribeScheduledActionsMessage,
  ScheduledActionsMessage,
  DescribeScheduledActionsError,
  Credentials | HttpClient.HttpClient,
  ScheduledAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ScheduledActionName: 0,
      TargetActionType: 0,
      StartTime: 0,
      EndTime: 0,
      Active: 0,
      Filters: D.list(
        { Name: 0, Values: D.list(0, { item: "item" }) },
        { item: "ScheduledActionFilter" },
      ),
      Marker: 0,
      MaxRecords: 0,
    },
    output: {
      ScheduledActions: D.list(
        {
          TargetAction: o_ScheduledActionType,
          NextInvocations: D.list(D.ts, { item: "ScheduledActionTime" }),
          StartTime: D.ts,
          EndTime: D.ts,
        },
        { item: "ScheduledAction" },
      ),
    },
  },
  errors: [ScheduledActionNotFoundFault, UnauthorizedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScheduledActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ScheduledActions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeSnapshotCopyGrantsError =
  | InvalidTagFault
  | SnapshotCopyGrantNotFoundFault
  | CommonErrors;
/**
 * Returns a list of snapshot copy grants owned by the Amazon Web Services account in the destination
 * region.
 *
 * For more information about managing snapshot copy grants, go to
 * Amazon Redshift Database Encryption
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeSnapshotCopyGrants: API.PaginatedOperationMethod<
  DescribeSnapshotCopyGrantsMessage,
  SnapshotCopyGrantMessage,
  DescribeSnapshotCopyGrantsError,
  Credentials | HttpClient.HttpClient,
  SnapshotCopyGrant
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SnapshotCopyGrantName: 0,
      MaxRecords: 0,
      Marker: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
    },
    output: {
      SnapshotCopyGrants: D.list(o_SnapshotCopyGrant, {
        item: "SnapshotCopyGrant",
      }),
    },
  },
  errors: [InvalidTagFault, SnapshotCopyGrantNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshotCopyGrants",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SnapshotCopyGrants",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeSnapshotSchedulesError = CommonErrors;
/**
 * Returns a list of snapshot schedules.
 */
export const describeSnapshotSchedules: API.PaginatedOperationMethod<
  DescribeSnapshotSchedulesMessage,
  DescribeSnapshotSchedulesOutputMessage,
  DescribeSnapshotSchedulesError,
  Credentials | HttpClient.HttpClient,
  SnapshotSchedule
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      ScheduleIdentifier: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
      Marker: 0,
      MaxRecords: 0,
    },
    output: {
      SnapshotSchedules: D.list(
        {
          ScheduleDefinitions: D.list(0, { item: "ScheduleDefinition" }),
          Tags: D.list({}, { item: "Tag" }),
          NextInvocations: D.list(D.ts, { item: "SnapshotTime" }),
          AssociatedClusterCount: D.num,
          AssociatedClusters: D.list(
            {},
            { item: "ClusterAssociatedToSchedule" },
          ),
        },
        { item: "SnapshotSchedule" },
      ),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshotSchedules",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SnapshotSchedules",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeStorageError = CommonErrors;
/**
 * Returns account level backups storage size and provisional storage.
 */
export const describeStorage: API.OperationMethod<
  DescribeStorageRequest,
  CustomerStorageMessage,
  DescribeStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    output: {
      TotalBackupSizeInMegaBytes: D.num,
      TotalProvisionedStorageInMegaBytes: D.num,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStorage",
})) as any;

export type DescribeTableRestoreStatusError =
  | ClusterNotFoundFault
  | TableRestoreNotFoundFault
  | CommonErrors;
/**
 * Lists the status of one or more table restore requests made using the RestoreTableFromClusterSnapshot API action. If you don't specify a value
 * for the `TableRestoreRequestId` parameter, then
 * `DescribeTableRestoreStatus` returns the status of all table restore
 * requests ordered by the date and time of the request in ascending order. Otherwise
 * `DescribeTableRestoreStatus` returns the status of the table specified by
 * `TableRestoreRequestId`.
 */
export const describeTableRestoreStatus: API.PaginatedOperationMethod<
  DescribeTableRestoreStatusMessage,
  TableRestoreStatusMessage,
  DescribeTableRestoreStatusError,
  Credentials | HttpClient.HttpClient,
  TableRestoreStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      TableRestoreRequestId: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      TableRestoreStatusDetails: D.list(o_TableRestoreStatus, {
        item: "TableRestoreStatus",
      }),
    },
  },
  errors: [ClusterNotFoundFault, TableRestoreNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTableRestoreStatus",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "TableRestoreStatusDetails",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeTagsError =
  | InvalidTagFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a list of tags. You can return tags from a specific resource by specifying
 * an ARN, or you can return all tags for a given type of resource, such as clusters,
 * snapshots, and so on.
 *
 * The following are limitations for `DescribeTags`:
 *
 * - You cannot specify an ARN and a resource-type value together in the same
 * request.
 *
 * - You cannot use the `MaxRecords` and `Marker`
 * parameters together with the ARN parameter.
 *
 * - The `MaxRecords` parameter can be a range from 10 to 50 results
 * to return in a request.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all resources that match any combination of the specified keys and values. For example,
 * if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all resources that have any
 * combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, resources are returned
 * regardless of whether they have tag keys or values associated with them.
 */
export const describeTags: API.PaginatedOperationMethod<
  DescribeTagsMessage,
  TaggedResourceListMessage,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient,
  TaggedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceName: 0,
      ResourceType: 0,
      MaxRecords: 0,
      Marker: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
    },
    output: {
      TaggedResources: D.list({ Tag: {} }, { item: "TaggedResource" }),
    },
  },
  errors: [InvalidTagFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "TaggedResources",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeUsageLimitsError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Shows usage limits on a cluster.
 * Results are filtered based on the combination of input usage limit identifier, cluster identifier, and feature type parameters:
 *
 * - If usage limit identifier, cluster identifier, and feature type are not provided,
 * then all usage limit objects for the current account in the current region are returned.
 *
 * - If usage limit identifier is provided,
 * then the corresponding usage limit object is returned.
 *
 * - If cluster identifier is provided,
 * then all usage limit objects for the specified cluster are returned.
 *
 * - If cluster identifier and feature type are provided,
 * then all usage limit objects for the combination of cluster and feature are returned.
 */
export const describeUsageLimits: API.PaginatedOperationMethod<
  DescribeUsageLimitsMessage,
  UsageLimitList,
  DescribeUsageLimitsError,
  Credentials | HttpClient.HttpClient,
  UsageLimit
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      UsageLimitId: 0,
      ClusterIdentifier: 0,
      FeatureType: 0,
      MaxRecords: 0,
      Marker: 0,
      TagKeys: D.list(0, { item: "TagKey" }),
      TagValues: D.list(0, { item: "TagValue" }),
    },
    output: {
      UsageLimits: D.list({ Amount: D.num, Tags: D.list({}, { item: "Tag" }) }),
    },
  },
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsageLimits",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "UsageLimits",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DisableLoggingError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Stops logging information, such as queries and connection attempts, for the
 * specified Amazon Redshift cluster.
 */
export const disableLogging: API.OperationMethod<
  DisableLoggingMessage,
  LoggingStatus,
  DisableLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0, LogDestinationType: 0, LogExports: 0 },
    output: {
      LoggingEnabled: D.bool,
      LastSuccessfulDeliveryTime: D.ts,
      LastFailureTime: D.ts,
      LogExports: D.list(),
      S3Tables: o_S3TablePublishStatus,
    },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableLogging",
})) as any;

export type DisableSnapshotCopyError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | SnapshotCopyAlreadyDisabledFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Disables the automatic copying of snapshots from one region to another region for a
 * specified cluster.
 *
 * If your cluster and its snapshots are encrypted using an encrypted symmetric key
 * from Key Management Service, use DeleteSnapshotCopyGrant to delete the grant that
 * grants Amazon Redshift permission to the key in the destination region.
 */
export const disableSnapshotCopy: API.OperationMethod<
  DisableSnapshotCopyMessage,
  DisableSnapshotCopyResult,
  DisableSnapshotCopyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0 },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    SnapshotCopyAlreadyDisabledFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableSnapshotCopy",
})) as any;

export type DisassociateDataShareConsumerError =
  | InvalidDataShareFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * From a datashare consumer account, remove association for the specified datashare.
 */
export const disassociateDataShareConsumer: API.OperationMethod<
  DisassociateDataShareConsumerMessage,
  DataShare,
  DisassociateDataShareConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DataShareArn: 0,
      DisassociateEntireAccount: 0,
      ConsumerArn: 0,
      ConsumerRegion: 0,
    },
    output: {
      AllowPubliclyAccessibleConsumers: D.bool,
      DataShareAssociations: D.list(o_DataShareAssociation),
    },
  },
  errors: [InvalidDataShareFault, InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDataShareConsumer",
})) as any;

export type EnableLoggingError =
  | BucketNotFoundFault
  | ClusterNotFoundFault
  | InsufficientS3BucketPolicyFault
  | InvalidClusterStateFault
  | InvalidS3BucketNameFault
  | InvalidS3KeyPrefixFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Starts logging information, such as queries and connection attempts, for the
 * specified Amazon Redshift cluster.
 */
export const enableLogging: API.OperationMethod<
  EnableLoggingMessage,
  LoggingStatus,
  EnableLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      BucketName: 0,
      S3KeyPrefix: 0,
      LogDestinationType: 0,
      LogExports: 0,
      S3TableKmsKeyId: 0,
      S3TableGranularity: 0,
    },
    output: {
      LoggingEnabled: D.bool,
      LastSuccessfulDeliveryTime: D.ts,
      LastFailureTime: D.ts,
      LogExports: D.list(),
      S3Tables: o_S3TablePublishStatus,
    },
  },
  errors: [
    BucketNotFoundFault,
    ClusterNotFoundFault,
    InsufficientS3BucketPolicyFault,
    InvalidClusterStateFault,
    InvalidS3BucketNameFault,
    InvalidS3KeyPrefixFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableLogging",
})) as any;

export type EnableSnapshotCopyError =
  | ClusterNotFoundFault
  | CopyToRegionDisabledFault
  | DependentServiceRequestThrottlingFault
  | IncompatibleOrderableOptions
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | LimitExceededFault
  | SnapshotCopyAlreadyEnabledFault
  | SnapshotCopyGrantNotFoundFault
  | UnauthorizedOperation
  | UnknownSnapshotCopyRegionFault
  | CommonErrors;
/**
 * Enables the automatic copy of snapshots from one region to another region for a
 * specified cluster.
 */
export const enableSnapshotCopy: API.OperationMethod<
  EnableSnapshotCopyMessage,
  EnableSnapshotCopyResult,
  EnableSnapshotCopyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      DestinationRegion: 0,
      RetentionPeriod: 0,
      SnapshotCopyGrantName: 0,
      ManualSnapshotRetentionPeriod: 0,
    },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterNotFoundFault,
    CopyToRegionDisabledFault,
    DependentServiceRequestThrottlingFault,
    IncompatibleOrderableOptions,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
    LimitExceededFault,
    SnapshotCopyAlreadyEnabledFault,
    SnapshotCopyGrantNotFoundFault,
    UnauthorizedOperation,
    UnknownSnapshotCopyRegionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSnapshotCopy",
})) as any;

export type FailoverPrimaryComputeError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Fails over the primary compute unit of the specified Multi-AZ cluster to another Availability Zone.
 */
export const failoverPrimaryCompute: API.OperationMethod<
  FailoverPrimaryComputeInputMessage,
  FailoverPrimaryComputeResult,
  FailoverPrimaryComputeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0 },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverPrimaryCompute",
})) as any;

export type GetClusterCredentialsError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a database user name and temporary password with temporary authorization to
 * log on to an Amazon Redshift database. The action returns the database user name
 * prefixed with `IAM:` if `AutoCreate` is `False` or
 * `IAMA:` if `AutoCreate` is `True`. You can
 * optionally specify one or more database user groups that the user will join at log on.
 * By default, the temporary credentials expire in 900 seconds. You can optionally specify
 * a duration between 900 seconds (15 minutes) and 3600 seconds (60 minutes). For more
 * information, see Using IAM Authentication
 * to Generate Database User Credentials in the Amazon Redshift Cluster Management Guide.
 *
 * The Identity and Access Management (IAM) user or role that runs
 * GetClusterCredentials must have an IAM policy attached that allows access to all
 * necessary actions and resources. For more information about permissions, see Resource Policies for GetClusterCredentials in the
 * Amazon Redshift Cluster Management Guide.
 *
 * If the `DbGroups` parameter is specified, the IAM policy must allow the
 * `redshift:JoinGroup` action with access to the listed
 * `dbgroups`.
 *
 * In addition, if the `AutoCreate` parameter is set to `True`,
 * then the policy must include the `redshift:CreateClusterUser`
 * permission.
 *
 * If the `DbName` parameter is specified, the IAM policy must allow access
 * to the resource `dbname` for the specified database name.
 */
export const getClusterCredentials: API.OperationMethod<
  GetClusterCredentialsMessage,
  ClusterCredentials,
  GetClusterCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DbUser: 0,
      DbName: 0,
      ClusterIdentifier: 0,
      DurationSeconds: 0,
      AutoCreate: 0,
      DbGroups: D.list(0, { item: "DbGroup" }),
      CustomDomainName: 0,
    },
    output: { DbPassword: D.secret, Expiration: D.ts },
  },
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterCredentials",
})) as any;

export type GetClusterCredentialsWithIAMError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a database user name and temporary password with temporary authorization to
 * log in to an Amazon Redshift database.
 * The database user is mapped 1:1 to the source Identity and Access Management (IAM) identity.
 * For more information about IAM identities, see IAM Identities (users, user groups, and roles) in the
 * Amazon Web Services Identity and Access Management User Guide.
 *
 * The Identity and Access Management (IAM) identity that runs
 * this operation must have an IAM policy attached that allows access to all
 * necessary actions and resources.
 * For more information about permissions, see Using identity-based policies (IAM policies) in the
 * Amazon Redshift Cluster Management Guide.
 */
export const getClusterCredentialsWithIAM: API.OperationMethod<
  GetClusterCredentialsWithIAMMessage,
  ClusterExtendedCredentials,
  GetClusterCredentialsWithIAMError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DbName: 0,
      ClusterIdentifier: 0,
      DurationSeconds: 0,
      CustomDomainName: 0,
    },
    output: { DbPassword: D.secret, Expiration: D.ts, NextRefreshTime: D.ts },
  },
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterCredentialsWithIAM",
})) as any;

export type GetIdentityCenterAuthTokenError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | RedshiftInvalidParameterFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Generates an encrypted authentication token that propagates the caller's
 * Amazon Web Services IAM Identity Center identity to Amazon Redshift clusters. This API extracts the
 * Amazon Web Services IAM Identity Center identity from enhanced credentials and creates a secure token
 * that Amazon Redshift drivers can use for authentication.
 *
 * The token is encrypted using Key Management Service (KMS) and can only be
 * decrypted by the specified Amazon Redshift clusters. The token contains the caller's
 * Amazon Web Services IAM Identity Center identity information and is valid for a limited time period.
 *
 * This API is exclusively for use with Amazon Web Services IAM Identity Center enhanced credentials. If the
 * caller is not using enhanced credentials with embedded Amazon Web Services IAM Identity Center identity, the API will
 * return an error.
 */
export const getIdentityCenterAuthToken: API.OperationMethod<
  GetIdentityCenterAuthTokenRequest,
  GetIdentityCenterAuthTokenResponse,
  GetIdentityCenterAuthTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIds: D.list(0, { item: "ClusterIdentifier" }) },
    output: { Token: D.secret, ExpirationTime: D.ts },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    RedshiftInvalidParameterFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityCenterAuthToken",
})) as any;

export type GetReservedNodeExchangeConfigurationOptionsError =
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | DependentServiceUnavailableFault
  | InvalidReservedNodeStateFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Gets the configuration options for the reserved-node exchange. These options
 * include information about the source reserved node and target reserved node offering.
 * Details include the node type, the price, the node count, and the offering type.
 */
export const getReservedNodeExchangeConfigurationOptions: API.PaginatedOperationMethod<
  GetReservedNodeExchangeConfigurationOptionsInputMessage,
  GetReservedNodeExchangeConfigurationOptionsOutputMessage,
  GetReservedNodeExchangeConfigurationOptionsError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeConfigurationOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ActionType: 0,
      ClusterIdentifier: 0,
      SnapshotIdentifier: 0,
      MaxRecords: 0,
      Marker: 0,
    },
    output: {
      ReservedNodeConfigurationOptionList: D.list(
        {
          SourceReservedNode: o_ReservedNode,
          TargetReservedNodeCount: D.num,
          TargetReservedNodeOffering: o_ReservedNodeOffering,
        },
        { item: "ReservedNodeConfigurationOption" },
      ),
    },
  },
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    DependentServiceUnavailableFault,
    InvalidReservedNodeStateFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservedNodeExchangeConfigurationOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeConfigurationOptionList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type GetReservedNodeExchangeOfferingsError =
  | DependentServiceUnavailableFault
  | InvalidReservedNodeStateFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns an array of DC2 ReservedNodeOfferings that matches the payment type, term,
 * and usage price of the given DC1 reserved node.
 */
export const getReservedNodeExchangeOfferings: API.PaginatedOperationMethod<
  GetReservedNodeExchangeOfferingsInputMessage,
  GetReservedNodeExchangeOfferingsOutputMessage,
  GetReservedNodeExchangeOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ReservedNodeId: 0, MaxRecords: 0, Marker: 0 },
    output: {
      ReservedNodeOfferings: D.list(o_ReservedNodeOffering, {
        item: "ReservedNodeOffering",
      }),
    },
  },
  errors: [
    DependentServiceUnavailableFault,
    InvalidReservedNodeStateFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservedNodeExchangeOfferings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeOfferings",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type GetResourcePolicyError =
  | InvalidPolicyFault
  | ResourceNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Get the resource policy for a specified resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyMessage,
  GetResourcePolicyResult,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { ResourcePolicy: {} },
  },
  errors: [
    InvalidPolicyFault,
    ResourceNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type ListRecommendationsError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * List the Amazon Redshift Advisor recommendations for one or multiple Amazon Redshift clusters in an Amazon Web Services account.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsMessage,
  ListRecommendationsResult,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  Recommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0, NamespaceArn: 0, MaxRecords: 0, Marker: 0 },
    output: {
      Recommendations: D.list(
        {
          CreatedAt: D.ts,
          RecommendedActions: D.list({}, { item: "RecommendedAction" }),
          ReferenceLinks: D.list({}, { item: "ReferenceLink" }),
        },
        { item: "Recommendation" },
      ),
    },
  },
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Recommendations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type ModifyAquaConfigurationError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * This operation is retired. Calling this operation does not change AQUA configuration. Amazon Redshift automatically determines whether to use AQUA (Advanced Query Accelerator).
 */
export const modifyAquaConfiguration: API.OperationMethod<
  ModifyAquaInputMessage,
  ModifyAquaOutputMessage,
  ModifyAquaConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0, AquaConfigurationStatus: 0 },
    output: { AquaConfiguration: {} },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyAquaConfiguration",
})) as any;

export type ModifyAuthenticationProfileError =
  | AuthenticationProfileNotFoundFault
  | AuthenticationProfileQuotaExceededFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Modifies an authentication profile.
 */
export const modifyAuthenticationProfile: API.OperationMethod<
  ModifyAuthenticationProfileMessage,
  ModifyAuthenticationProfileResult,
  ModifyAuthenticationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AuthenticationProfileName: 0, AuthenticationProfileContent: 0 },
  },
  errors: [
    AuthenticationProfileNotFoundFault,
    AuthenticationProfileQuotaExceededFault,
    InvalidAuthenticationProfileRequestFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyAuthenticationProfile",
})) as any;

export type ModifyClusterError =
  | ClusterAlreadyExistsFault
  | ClusterNotFoundFault
  | ClusterParameterGroupNotFoundFault
  | ClusterSecurityGroupNotFoundFault
  | CustomCnameAssociationFault
  | DependentServiceRequestThrottlingFault
  | HsmClientCertificateNotFoundFault
  | HsmConfigurationNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidClusterTrackFault
  | InvalidElasticIpFault
  | InvalidRetentionPeriodFault
  | Ipv6CidrBlockNotFoundFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | TableLimitExceededFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | UnsupportedOptionFault
  | CommonErrors;
/**
 * Modifies the settings for a cluster.
 *
 * You can also change node type and the number of nodes to scale up or down the
 * cluster. When resizing a cluster, you must specify both the number of nodes and the node
 * type even if one of the parameters does not change.
 *
 * You can add another security or
 * parameter group, or change the admin user password. Resetting a cluster password or modifying the security groups associated with a cluster do not need a reboot. However, modifying a parameter group requires a reboot for parameters to take effect.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 */
export const modifyCluster: API.OperationMethod<
  ModifyClusterMessage,
  ModifyClusterResult,
  ModifyClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      ClusterType: 0,
      NodeType: 0,
      NumberOfNodes: 0,
      ClusterSecurityGroups: D.list(0, { item: "ClusterSecurityGroupName" }),
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      MasterUserPassword: 0,
      ClusterParameterGroupName: 0,
      AutomatedSnapshotRetentionPeriod: 0,
      ManualSnapshotRetentionPeriod: 0,
      PreferredMaintenanceWindow: 0,
      ClusterVersion: 0,
      AllowVersionUpgrade: 0,
      HsmClientCertificateIdentifier: 0,
      HsmConfigurationIdentifier: 0,
      NewClusterIdentifier: 0,
      PubliclyAccessible: 0,
      ElasticIp: 0,
      EnhancedVpcRouting: 0,
      MaintenanceTrackName: 0,
      Encrypted: 0,
      KmsKeyId: 0,
      AvailabilityZoneRelocation: 0,
      AvailabilityZone: 0,
      Port: 0,
      ManageMasterPassword: 0,
      MasterPasswordSecretKmsKeyId: 0,
      IpAddressType: 0,
      MultiAZ: 0,
      ExtraComputeForAutomaticOptimization: 0,
    },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterAlreadyExistsFault,
    ClusterNotFoundFault,
    ClusterParameterGroupNotFoundFault,
    ClusterSecurityGroupNotFoundFault,
    CustomCnameAssociationFault,
    DependentServiceRequestThrottlingFault,
    HsmClientCertificateNotFoundFault,
    HsmConfigurationNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidClusterTrackFault,
    InvalidElasticIpFault,
    InvalidRetentionPeriodFault,
    Ipv6CidrBlockNotFoundFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    TableLimitExceededFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
    UnsupportedOptionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCluster",
})) as any;

export type ModifyClusterDbRevisionError =
  | ClusterNotFoundFault
  | ClusterOnLatestRevisionFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies the database revision of a cluster. The database revision is a unique
 * revision of the database running in a cluster.
 */
export const modifyClusterDbRevision: API.OperationMethod<
  ModifyClusterDbRevisionMessage,
  ModifyClusterDbRevisionResult,
  ModifyClusterDbRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0, RevisionTarget: 0 },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterNotFoundFault,
    ClusterOnLatestRevisionFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterDbRevision",
})) as any;

export type ModifyClusterIamRolesError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Modifies the list of Identity and Access Management (IAM) roles that can be
 * used by the cluster to access other Amazon Web Services services.
 *
 * The maximum number of IAM roles that you can associate is subject to a quota.
 * For more information, go to Quotas and limits
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const modifyClusterIamRoles: API.OperationMethod<
  ModifyClusterIamRolesMessage,
  ModifyClusterIamRolesResult,
  ModifyClusterIamRolesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      AddIamRoles: D.list(0, { item: "IamRoleArn" }),
      RemoveIamRoles: D.list(0, { item: "IamRoleArn" }),
      DefaultIamRoleArn: 0,
    },
    output: { Cluster: o_Cluster },
  },
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterIamRoles",
})) as any;

export type ModifyClusterMaintenanceError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Modifies the maintenance settings of a cluster.
 */
export const modifyClusterMaintenance: API.OperationMethod<
  ModifyClusterMaintenanceMessage,
  ModifyClusterMaintenanceResult,
  ModifyClusterMaintenanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      DeferMaintenance: 0,
      DeferMaintenanceIdentifier: 0,
      DeferMaintenanceStartTime: 0,
      DeferMaintenanceEndTime: 0,
      DeferMaintenanceDuration: 0,
    },
    output: { Cluster: o_Cluster },
  },
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterMaintenance",
})) as any;

export type ModifyClusterParameterGroupError =
  | ClusterParameterGroupNotFoundFault
  | InvalidClusterParameterGroupStateFault
  | CommonErrors;
/**
 * Modifies the parameters of a parameter group. For the parameters parameter, it can't contain ASCII characters.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const modifyClusterParameterGroup: API.OperationMethod<
  ModifyClusterParameterGroupMessage,
  ClusterParameterGroupNameMessage,
  ModifyClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ParameterGroupName: 0,
      Parameters: D.list(i_Parameter, { item: "Parameter" }),
    },
  },
  errors: [
    ClusterParameterGroupNotFoundFault,
    InvalidClusterParameterGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterParameterGroup",
})) as any;

export type ModifyClusterSnapshotError =
  | ClusterSnapshotNotFoundFault
  | InvalidClusterSnapshotStateFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Modifies the settings for a snapshot.
 *
 * This exanmple modifies the manual retention period setting for a cluster snapshot.
 */
export const modifyClusterSnapshot: API.OperationMethod<
  ModifyClusterSnapshotMessage,
  ModifyClusterSnapshotResult,
  ModifyClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SnapshotIdentifier: 0,
      ManualSnapshotRetentionPeriod: 0,
      Force: 0,
    },
    output: { Snapshot: o_Snapshot },
  },
  errors: [
    ClusterSnapshotNotFoundFault,
    InvalidClusterSnapshotStateFault,
    InvalidRetentionPeriodFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterSnapshot",
})) as any;

export type ModifyClusterSnapshotScheduleError =
  | ClusterNotFoundFault
  | InvalidClusterSnapshotScheduleStateFault
  | SnapshotScheduleNotFoundFault
  | CommonErrors;
/**
 * Modifies a snapshot schedule for a cluster.
 */
export const modifyClusterSnapshotSchedule: API.OperationMethod<
  ModifyClusterSnapshotScheduleMessage,
  ModifyClusterSnapshotScheduleResponse,
  ModifyClusterSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      ScheduleIdentifier: 0,
      DisassociateSchedule: 0,
    },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterSnapshotScheduleStateFault,
    SnapshotScheduleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterSnapshotSchedule",
})) as any;

export type ModifyClusterSubnetGroupError =
  | ClusterSubnetGroupNotFoundFault
  | ClusterSubnetQuotaExceededFault
  | DependentServiceRequestThrottlingFault
  | InvalidSubnet
  | SubnetAlreadyInUse
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Modifies a cluster subnet group to include the specified list of VPC subnets. The
 * operation replaces the existing list of subnets with the new list of subnets.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 */
export const modifyClusterSubnetGroup: API.OperationMethod<
  ModifyClusterSubnetGroupMessage,
  ModifyClusterSubnetGroupResult,
  ModifyClusterSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterSubnetGroupName: 0,
      Description: 0,
      SubnetIds: D.list(0, { item: "SubnetIdentifier" }),
    },
    output: { ClusterSubnetGroup: o_ClusterSubnetGroup },
  },
  errors: [
    ClusterSubnetGroupNotFoundFault,
    ClusterSubnetQuotaExceededFault,
    DependentServiceRequestThrottlingFault,
    InvalidSubnet,
    SubnetAlreadyInUse,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterSubnetGroup",
})) as any;

export type ModifyCustomDomainAssociationError =
  | ClusterNotFoundFault
  | CustomCnameAssociationFault
  | CustomDomainAssociationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Contains information for changing a custom domain association.
 */
export const modifyCustomDomainAssociation: API.OperationMethod<
  ModifyCustomDomainAssociationMessage,
  ModifyCustomDomainAssociationResult,
  ModifyCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CustomDomainName: 0,
      CustomDomainCertificateArn: 0,
      ClusterIdentifier: 0,
    },
  },
  errors: [
    ClusterNotFoundFault,
    CustomCnameAssociationFault,
    CustomDomainAssociationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCustomDomainAssociation",
})) as any;

export type ModifyEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidEndpointStateFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Modifies a Redshift-managed VPC endpoint.
 */
export const modifyEndpointAccess: API.OperationMethod<
  ModifyEndpointAccessMessage,
  EndpointAccess,
  ModifyEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EndpointName: 0,
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
    },
    output: {
      EndpointCreateTime: D.ts,
      Port: D.num,
      VpcSecurityGroups: D.list({}, { item: "VpcSecurityGroup" }),
      VpcEndpoint: o_VpcEndpoint,
    },
  },
  errors: [
    ClusterNotFoundFault,
    EndpointNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidEndpointStateFault,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEndpointAccess",
})) as any;

export type ModifyEventSubscriptionError =
  | InvalidSubscriptionStateFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | SNSTopicArnNotFoundFault
  | SourceNotFoundFault
  | SubscriptionCategoryNotFoundFault
  | SubscriptionEventIdNotFoundFault
  | SubscriptionNotFoundFault
  | SubscriptionSeverityNotFoundFault
  | CommonErrors;
/**
 * Modifies an existing Amazon Redshift event notification subscription.
 */
export const modifyEventSubscription: API.OperationMethod<
  ModifyEventSubscriptionMessage,
  ModifyEventSubscriptionResult,
  ModifyEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SubscriptionName: 0,
      SnsTopicArn: 0,
      SourceType: 0,
      SourceIds: D.list(0, { item: "SourceId" }),
      EventCategories: D.list(0, { item: "EventCategory" }),
      Severity: 0,
      Enabled: 0,
    },
    output: { EventSubscription: o_EventSubscription },
  },
  errors: [
    InvalidSubscriptionStateFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
    SNSTopicArnNotFoundFault,
    SourceNotFoundFault,
    SubscriptionCategoryNotFoundFault,
    SubscriptionEventIdNotFoundFault,
    SubscriptionNotFoundFault,
    SubscriptionSeverityNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEventSubscription",
})) as any;

export type ModifyIntegrationError =
  | IntegrationAlreadyExistsFault
  | IntegrationConflictOperationFault
  | IntegrationConflictStateFault
  | IntegrationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies a zero-ETL integration or S3 event integration with Amazon Redshift.
 */
export const modifyIntegration: API.OperationMethod<
  ModifyIntegrationMessage,
  Integration,
  ModifyIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { IntegrationArn: 0, Description: 0, IntegrationName: 0 },
    output: {
      Errors: D.list({}, { item: "IntegrationError" }),
      CreateTime: D.ts,
      AdditionalEncryptionContext: D.map(),
      Tags: D.list({}, { item: "Tag" }),
    },
  },
  errors: [
    IntegrationAlreadyExistsFault,
    IntegrationConflictOperationFault,
    IntegrationConflictStateFault,
    IntegrationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyIntegration",
})) as any;

export type ModifyLakehouseConfigurationError =
  | ClusterNotFoundFault
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | InvalidClusterStateFault
  | RedshiftIdcApplicationNotExistsFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies the lakehouse configuration for a cluster. This operation allows you to manage Amazon Redshift federated permissions and Amazon Web Services IAM Identity Center trusted identity propagation.
 */
export const modifyLakehouseConfiguration: API.OperationMethod<
  ModifyLakehouseConfigurationMessage,
  LakehouseConfiguration,
  ModifyLakehouseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      LakehouseRegistration: 0,
      CatalogName: 0,
      LakehouseIdcRegistration: 0,
      LakehouseIdcApplicationArn: 0,
      DryRun: 0,
    },
  },
  errors: [
    ClusterNotFoundFault,
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    InvalidClusterStateFault,
    RedshiftIdcApplicationNotExistsFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyLakehouseConfiguration",
})) as any;

export type ModifyQev2IdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies an Amazon Redshift Query Editor (QEV2) IAM Identity Center application.
 */
export const modifyQev2IdcApplication: API.OperationMethod<
  ModifyQev2IdcApplicationMessage,
  ModifyQev2IdcApplicationResult,
  ModifyQev2IdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Qev2IdcApplicationArn: 0, IdcDisplayName: 0 },
    output: { Qev2IdcApplication: o_Qev2IdcApplication },
  },
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyQev2IdcApplication",
})) as any;

export type ModifyRedshiftIdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | RedshiftIdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Changes an existing Amazon Redshift IAM Identity Center application.
 */
export const modifyRedshiftIdcApplication: API.OperationMethod<
  ModifyRedshiftIdcApplicationMessage,
  ModifyRedshiftIdcApplicationResult,
  ModifyRedshiftIdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RedshiftIdcApplicationArn: 0,
      IdentityNamespace: 0,
      IamRoleArn: 0,
      IdcDisplayName: 0,
      AuthorizedTokenIssuerList: D.list(i_AuthorizedTokenIssuer),
      ServiceIntegrations: D.list(i_ServiceIntegrationsUnion),
    },
    output: { RedshiftIdcApplication: o_RedshiftIdcApplication },
  },
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    RedshiftIdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyRedshiftIdcApplication",
})) as any;

export type ModifyScheduledActionError =
  | ClusterNotFoundFault
  | InvalidScheduledActionFault
  | InvalidScheduleFault
  | ScheduledActionNotFoundFault
  | ScheduledActionTypeUnsupportedFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies a scheduled action.
 */
export const modifyScheduledAction: API.OperationMethod<
  ModifyScheduledActionMessage,
  ScheduledAction,
  ModifyScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ScheduledActionName: 0,
      TargetAction: i_ScheduledActionType,
      Schedule: 0,
      IamRole: 0,
      ScheduledActionDescription: 0,
      StartTime: 0,
      EndTime: 0,
      Enable: 0,
    },
    output: {
      TargetAction: o_ScheduledActionType,
      NextInvocations: D.list(D.ts, { item: "ScheduledActionTime" }),
      StartTime: D.ts,
      EndTime: D.ts,
    },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidScheduledActionFault,
    InvalidScheduleFault,
    ScheduledActionNotFoundFault,
    ScheduledActionTypeUnsupportedFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyScheduledAction",
})) as any;

export type ModifySnapshotCopyRetentionPeriodError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | SnapshotCopyDisabledFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Modifies the number of days to retain snapshots in the destination Amazon Web Services Region after
 * they are copied from the source Amazon Web Services Region. By default, this operation only changes the
 * retention period of copied automated snapshots. The retention periods for both new and
 * existing copied automated snapshots are updated with the new retention period. You can
 * set the manual option to change only the retention periods of copied manual snapshots.
 * If you set this option, only newly copied manual snapshots have the new retention
 * period.
 */
export const modifySnapshotCopyRetentionPeriod: API.OperationMethod<
  ModifySnapshotCopyRetentionPeriodMessage,
  ModifySnapshotCopyRetentionPeriodResult,
  ModifySnapshotCopyRetentionPeriodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0, RetentionPeriod: 0, Manual: 0 },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
    SnapshotCopyDisabledFault,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifySnapshotCopyRetentionPeriod",
})) as any;

export type ModifySnapshotScheduleError =
  | InvalidScheduleFault
  | SnapshotScheduleNotFoundFault
  | SnapshotScheduleUpdateInProgressFault
  | CommonErrors;
/**
 * Modifies a snapshot schedule. Any schedule associated with a cluster is modified
 * asynchronously.
 */
export const modifySnapshotSchedule: API.OperationMethod<
  ModifySnapshotScheduleMessage,
  SnapshotSchedule,
  ModifySnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ScheduleIdentifier: 0,
      ScheduleDefinitions: D.list(0, { item: "ScheduleDefinition" }),
    },
    output: {
      ScheduleDefinitions: D.list(0, { item: "ScheduleDefinition" }),
      Tags: D.list({}, { item: "Tag" }),
      NextInvocations: D.list(D.ts, { item: "SnapshotTime" }),
      AssociatedClusterCount: D.num,
      AssociatedClusters: D.list({}, { item: "ClusterAssociatedToSchedule" }),
    },
  },
  errors: [
    InvalidScheduleFault,
    SnapshotScheduleNotFoundFault,
    SnapshotScheduleUpdateInProgressFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifySnapshotSchedule",
})) as any;

export type ModifyUsageLimitError =
  | InvalidUsageLimitFault
  | UnsupportedOperationFault
  | UsageLimitNotFoundFault
  | CommonErrors;
/**
 * Modifies a usage limit in a cluster.
 * You can't modify the feature type or period of a usage limit.
 */
export const modifyUsageLimit: API.OperationMethod<
  ModifyUsageLimitMessage,
  UsageLimit,
  ModifyUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UsageLimitId: 0, Amount: 0, BreachAction: 0 },
    output: { Amount: D.num, Tags: D.list({}, { item: "Tag" }) },
  },
  errors: [
    InvalidUsageLimitFault,
    UnsupportedOperationFault,
    UsageLimitNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyUsageLimit",
})) as any;

export type PauseClusterError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Pauses a cluster.
 */
export const pauseCluster: API.OperationMethod<
  PauseClusterMessage,
  PauseClusterResult,
  PauseClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0 },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseCluster",
})) as any;

export type PurchaseReservedNodeOfferingError =
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeOfferingNotFoundFault
  | ReservedNodeQuotaExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Allows you to purchase reserved nodes. Amazon Redshift offers a predefined set of
 * reserved node offerings. You can purchase one or more of the offerings. You can call the
 * DescribeReservedNodeOfferings API to obtain the available reserved
 * node offerings. You can call this API by providing a specific reserved node offering and
 * the number of nodes you want to reserve.
 *
 * For more information about reserved node offerings, go to
 * Purchasing Reserved Nodes
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const purchaseReservedNodeOffering: API.OperationMethod<
  PurchaseReservedNodeOfferingMessage,
  PurchaseReservedNodeOfferingResult,
  PurchaseReservedNodeOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReservedNodeOfferingId: 0, NodeCount: 0 },
    output: { ReservedNode: o_ReservedNode },
  },
  errors: [
    ReservedNodeAlreadyExistsFault,
    ReservedNodeOfferingNotFoundFault,
    ReservedNodeQuotaExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseReservedNodeOffering",
})) as any;

export type PutResourcePolicyError =
  | ConflictPolicyUpdateFault
  | InvalidPolicyFault
  | ResourceNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Updates the resource policy for a specified resource.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyMessage,
  PutResourcePolicyResult,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, Policy: 0 },
    output: { ResourcePolicy: {} },
  },
  errors: [
    ConflictPolicyUpdateFault,
    InvalidPolicyFault,
    ResourceNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type RebootClusterError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Reboots a cluster. This action is taken as soon as possible. It results in a
 * momentary outage to the cluster, during which the cluster status is set to
 * `rebooting`. A cluster event is created when the reboot is completed. Any
 * pending cluster modifications (see ModifyCluster) are applied at this
 * reboot.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const rebootCluster: API.OperationMethod<
  RebootClusterMessage,
  RebootClusterResult,
  RebootClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0 },
    output: { Cluster: o_Cluster },
  },
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootCluster",
})) as any;

export type RegisterNamespaceError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * Registers a cluster or serverless namespace to the Amazon Web Services Glue Data Catalog.
 */
export const registerNamespace: API.OperationMethod<
  RegisterNamespaceInputMessage,
  RegisterNamespaceOutputMessage,
  RegisterNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NamespaceIdentifier: i_NamespaceIdentifierUnion,
      ConsumerIdentifiers: 0,
    },
  },
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidNamespaceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterNamespace",
})) as any;

export type RejectDataShareError = InvalidDataShareFault | CommonErrors;
/**
 * From a datashare consumer account, rejects the specified datashare.
 */
export const rejectDataShare: API.OperationMethod<
  RejectDataShareMessage,
  DataShare,
  RejectDataShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DataShareArn: 0 },
    output: {
      AllowPubliclyAccessibleConsumers: D.bool,
      DataShareAssociations: D.list(o_DataShareAssociation),
    },
  },
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectDataShare",
})) as any;

export type ResetClusterParameterGroupError =
  | ClusterParameterGroupNotFoundFault
  | InvalidClusterParameterGroupStateFault
  | CommonErrors;
/**
 * Sets one or more parameters of the specified parameter group to their default
 * values and sets the source values of the parameters to "engine-default". To reset the
 * entire parameter group specify the *ResetAllParameters* parameter.
 * For parameter changes to take effect you must reboot any associated clusters.
 */
export const resetClusterParameterGroup: API.OperationMethod<
  ResetClusterParameterGroupMessage,
  ClusterParameterGroupNameMessage,
  ResetClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ParameterGroupName: 0,
      ResetAllParameters: 0,
      Parameters: D.list(i_Parameter, { item: "Parameter" }),
    },
  },
  errors: [
    ClusterParameterGroupNotFoundFault,
    InvalidClusterParameterGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetClusterParameterGroup",
})) as any;

export type ResizeClusterError =
  | ClusterNotFoundFault
  | DependentServiceUnavailableFault
  | InsufficientClusterCapacityFault
  | InvalidClusterStateFault
  | InvalidReservedNodeStateFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | UnsupportedOptionFault
  | CommonErrors;
/**
 * Changes the size of the cluster. You can change the cluster's type, or change the
 * number or type of nodes. The default behavior is to use the elastic resize method. With
 * an elastic resize, your cluster is available for read and write operations more quickly
 * than with the classic resize method.
 *
 * Elastic resize operations have the following restrictions:
 *
 * - You can only resize clusters of the following types:
 *
 * - dc2.large
 *
 * - dc2.8xlarge
 *
 * - rg.large
 *
 * - rg.xlarge
 *
 * - rg.4xlarge
 *
 * - rg.12xlarge
 *
 * - ra3.large
 *
 * - ra3.xlplus
 *
 * - ra3.4xlarge
 *
 * - ra3.16xlarge
 *
 * - The type of nodes that you add must match the node type for the
 * cluster.
 */
export const resizeCluster: API.OperationMethod<
  ResizeClusterMessage,
  ResizeClusterResult,
  ResizeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      ClusterType: 0,
      NodeType: 0,
      NumberOfNodes: 0,
      Classic: 0,
      ReservedNodeId: 0,
      TargetReservedNodeOfferingId: 0,
    },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterNotFoundFault,
    DependentServiceUnavailableFault,
    InsufficientClusterCapacityFault,
    InvalidClusterStateFault,
    InvalidReservedNodeStateFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
    UnsupportedOptionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResizeCluster",
})) as any;

export type RestoreFromClusterSnapshotError =
  | AccessToSnapshotDeniedFault
  | ClusterAlreadyExistsFault
  | ClusterParameterGroupNotFoundFault
  | ClusterQuotaExceededFault
  | ClusterSecurityGroupNotFoundFault
  | ClusterSnapshotNotFoundFault
  | ClusterSubnetGroupNotFoundFault
  | DependentServiceAccessDeniedFault
  | DependentServiceRequestThrottlingFault
  | DependentServiceUnavailableFault
  | HsmClientCertificateNotFoundFault
  | HsmConfigurationNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterSnapshotStateFault
  | InvalidClusterSubnetGroupStateFault
  | InvalidClusterTrackFault
  | InvalidElasticIpFault
  | InvalidReservedNodeStateFault
  | InvalidRestoreFault
  | InvalidSubnet
  | InvalidTagFault
  | InvalidVPCNetworkStateFault
  | Ipv6CidrBlockNotFoundFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | RedshiftIdcApplicationNotExistsFault
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | SnapshotScheduleNotFoundFault
  | TagLimitExceededFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a new cluster from a snapshot. By default, Amazon Redshift creates the resulting
 * cluster with the same configuration as the original cluster from which the snapshot was
 * created, except that the new cluster is created with the default cluster security and
 * parameter groups. After Amazon Redshift creates the cluster, you can use the ModifyCluster API to associate a different security group and different
 * parameter group with the restored cluster. If you are using a DS node type, you can also
 * choose to change to another DS node type of the same size during restore.
 *
 * If you restore a cluster into a VPC, you must provide a cluster subnet group where
 * you want the cluster restored.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const restoreFromClusterSnapshot: API.OperationMethod<
  RestoreFromClusterSnapshotMessage,
  RestoreFromClusterSnapshotResult,
  RestoreFromClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      SnapshotIdentifier: 0,
      SnapshotArn: 0,
      SnapshotClusterIdentifier: 0,
      Port: 0,
      AvailabilityZone: 0,
      AllowVersionUpgrade: 0,
      ClusterSubnetGroupName: 0,
      PubliclyAccessible: 0,
      OwnerAccount: 0,
      HsmClientCertificateIdentifier: 0,
      HsmConfigurationIdentifier: 0,
      ElasticIp: 0,
      ClusterParameterGroupName: 0,
      ClusterSecurityGroups: D.list(0, { item: "ClusterSecurityGroupName" }),
      VpcSecurityGroupIds: D.list(0, { item: "VpcSecurityGroupId" }),
      PreferredMaintenanceWindow: 0,
      AutomatedSnapshotRetentionPeriod: 0,
      ManualSnapshotRetentionPeriod: 0,
      KmsKeyId: 0,
      NodeType: 0,
      EnhancedVpcRouting: 0,
      AdditionalInfo: 0,
      IamRoles: D.list(0, { item: "IamRoleArn" }),
      MaintenanceTrackName: 0,
      SnapshotScheduleIdentifier: 0,
      NumberOfNodes: 0,
      AvailabilityZoneRelocation: 0,
      AquaConfigurationStatus: 0,
      DefaultIamRoleArn: 0,
      ReservedNodeId: 0,
      TargetReservedNodeOfferingId: 0,
      Encrypted: 0,
      ManageMasterPassword: 0,
      MasterPasswordSecretKmsKeyId: 0,
      IpAddressType: 0,
      MultiAZ: 0,
      CatalogName: 0,
      RedshiftIdcApplicationArn: 0,
    },
    output: { Cluster: o_Cluster },
  },
  errors: [
    AccessToSnapshotDeniedFault,
    ClusterAlreadyExistsFault,
    ClusterParameterGroupNotFoundFault,
    ClusterQuotaExceededFault,
    ClusterSecurityGroupNotFoundFault,
    ClusterSnapshotNotFoundFault,
    ClusterSubnetGroupNotFoundFault,
    DependentServiceAccessDeniedFault,
    DependentServiceRequestThrottlingFault,
    DependentServiceUnavailableFault,
    HsmClientCertificateNotFoundFault,
    HsmConfigurationNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterSnapshotStateFault,
    InvalidClusterSubnetGroupStateFault,
    InvalidClusterTrackFault,
    InvalidElasticIpFault,
    InvalidReservedNodeStateFault,
    InvalidRestoreFault,
    InvalidSubnet,
    InvalidTagFault,
    InvalidVPCNetworkStateFault,
    Ipv6CidrBlockNotFoundFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    RedshiftIdcApplicationNotExistsFault,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    SnapshotScheduleNotFoundFault,
    TagLimitExceededFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromClusterSnapshot",
})) as any;

export type RestoreTableFromClusterSnapshotError =
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | InProgressTableRestoreQuotaExceededFault
  | InvalidClusterSnapshotStateFault
  | InvalidClusterStateFault
  | InvalidTableRestoreArgumentFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a new table from a table in an Amazon Redshift cluster snapshot. You must
 * create the new table within the Amazon Redshift cluster that the snapshot was taken
 * from.
 *
 * You cannot use `RestoreTableFromClusterSnapshot` to restore a table with
 * the same name as an existing table in an Amazon Redshift cluster. That is, you cannot
 * overwrite an existing table in a cluster with a restored table. If you want to replace
 * your original table with a new, restored table, then rename or drop your original table
 * before you call `RestoreTableFromClusterSnapshot`. When you have renamed your
 * original table, then you can pass the original name of the table as the
 * `NewTableName` parameter value in the call to
 * `RestoreTableFromClusterSnapshot`. This way, you can replace the original
 * table with the table created from the snapshot.
 *
 * You can't use this operation to restore tables with
 * interleaved sort keys.
 */
export const restoreTableFromClusterSnapshot: API.OperationMethod<
  RestoreTableFromClusterSnapshotMessage,
  RestoreTableFromClusterSnapshotResult,
  RestoreTableFromClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      SnapshotIdentifier: 0,
      SourceDatabaseName: 0,
      SourceSchemaName: 0,
      SourceTableName: 0,
      TargetDatabaseName: 0,
      TargetSchemaName: 0,
      NewTableName: 0,
      EnableCaseSensitiveIdentifier: 0,
    },
    output: { TableRestoreStatus: o_TableRestoreStatus },
  },
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    InProgressTableRestoreQuotaExceededFault,
    InvalidClusterSnapshotStateFault,
    InvalidClusterStateFault,
    InvalidTableRestoreArgumentFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableFromClusterSnapshot",
})) as any;

export type ResumeClusterError =
  | ClusterNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Resumes a paused cluster.
 */
export const resumeCluster: API.OperationMethod<
  ResumeClusterMessage,
  ResumeClusterResult,
  ResumeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0 },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeCluster",
})) as any;

export type RevokeClusterSecurityGroupIngressError =
  | AuthorizationNotFoundFault
  | ClusterSecurityGroupNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | CommonErrors;
/**
 * Revokes an ingress rule in an Amazon Redshift security group for a previously authorized
 * IP range or Amazon EC2 security group. To add an ingress rule, see AuthorizeClusterSecurityGroupIngress.
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const revokeClusterSecurityGroupIngress: API.OperationMethod<
  RevokeClusterSecurityGroupIngressMessage,
  RevokeClusterSecurityGroupIngressResult,
  RevokeClusterSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterSecurityGroupName: 0,
      CIDRIP: 0,
      EC2SecurityGroupName: 0,
      EC2SecurityGroupOwnerId: 0,
    },
    output: { ClusterSecurityGroup: o_ClusterSecurityGroup },
  },
  errors: [
    AuthorizationNotFoundFault,
    ClusterSecurityGroupNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeClusterSecurityGroupIngress",
})) as any;

export type RevokeEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointAuthorizationNotFoundFault
  | EndpointNotFoundFault
  | InvalidAuthorizationStateFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidEndpointStateFault
  | CommonErrors;
/**
 * Revokes access to a cluster.
 */
export const revokeEndpointAccess: API.OperationMethod<
  RevokeEndpointAccessMessage,
  EndpointAuthorization,
  RevokeEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterIdentifier: 0,
      Account: 0,
      VpcIds: D.list(0, { item: "VpcIdentifier" }),
      Force: 0,
    },
    output: {
      AuthorizeTime: D.ts,
      AllowedAllVPCs: D.bool,
      AllowedVPCs: D.list(0, { item: "VpcIdentifier" }),
      EndpointCount: D.num,
    },
  },
  errors: [
    ClusterNotFoundFault,
    EndpointAuthorizationNotFoundFault,
    EndpointNotFoundFault,
    InvalidAuthorizationStateFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidEndpointStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeEndpointAccess",
})) as any;

export type RevokeSnapshotAccessError =
  | AccessToSnapshotDeniedFault
  | AuthorizationNotFoundFault
  | ClusterSnapshotNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Removes the ability of the specified Amazon Web Services account to restore the specified
 * snapshot. If the account is currently restoring the snapshot, the restore will run to
 * completion.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const revokeSnapshotAccess: API.OperationMethod<
  RevokeSnapshotAccessMessage,
  RevokeSnapshotAccessResult,
  RevokeSnapshotAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SnapshotIdentifier: 0,
      SnapshotArn: 0,
      SnapshotClusterIdentifier: 0,
      AccountWithRestoreAccess: 0,
    },
    output: { Snapshot: o_Snapshot },
  },
  errors: [
    AccessToSnapshotDeniedFault,
    AuthorizationNotFoundFault,
    ClusterSnapshotNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeSnapshotAccess",
})) as any;

export type RotateEncryptionKeyError =
  | ClusterNotFoundFault
  | DependentServiceRequestThrottlingFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Rotates the encryption keys for a cluster.
 */
export const rotateEncryptionKey: API.OperationMethod<
  RotateEncryptionKeyMessage,
  RotateEncryptionKeyResult,
  RotateEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterIdentifier: 0 },
    output: { Cluster: o_Cluster },
  },
  errors: [
    ClusterNotFoundFault,
    DependentServiceRequestThrottlingFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RotateEncryptionKey",
})) as any;

export type UpdatePartnerStatusError =
  | ClusterNotFoundFault
  | PartnerNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Updates the status of a partner integration.
 */
export const updatePartnerStatus: API.OperationMethod<
  UpdatePartnerStatusInputMessage,
  PartnerIntegrationOutputMessage,
  UpdatePartnerStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      ClusterIdentifier: 0,
      DatabaseName: 0,
      PartnerName: 0,
      Status: 0,
      StatusMessage: 0,
    },
  },
  errors: [
    ClusterNotFoundFault,
    PartnerNotFoundFault,
    UnauthorizedPartnerIntegrationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePartnerStatus",
})) as any;

const i_AuthorizedTokenIssuer: D.LazyStruct = () => ({
  TrustedTokenIssuerArn: 0,
  AuthorizedAudiencesList: 0,
});
const i_NamespaceIdentifierUnion: D.LazyStruct = () => ({
  ServerlessIdentifier: { NamespaceIdentifier: 0, WorkgroupIdentifier: 0 },
  ProvisionedIdentifier: { ClusterIdentifier: 0 },
});
const i_Parameter: D.LazyStruct = () => ({
  ParameterName: 0,
  ParameterValue: 0,
  Description: 0,
  Source: 0,
  DataType: 0,
  AllowedValues: 0,
  ApplyType: 0,
  IsModifiable: 0,
  MinimumEngineVersion: 0,
});
const i_ScheduledActionType: D.LazyStruct = () => ({
  ResizeCluster: {
    ClusterIdentifier: 0,
    ClusterType: 0,
    NodeType: 0,
    NumberOfNodes: 0,
    Classic: 0,
    ReservedNodeId: 0,
    TargetReservedNodeOfferingId: 0,
  },
  PauseCluster: { ClusterIdentifier: 0 },
  ResumeCluster: { ClusterIdentifier: 0 },
});
const i_ServiceIntegrationsUnion: D.LazyStruct = () => ({
  LakeFormation: D.list({ LakeFormationQuery: { Authorization: 0 } }),
  S3AccessGrants: D.list({ ReadWriteAccess: { Authorization: 0 } }),
  Redshift: D.list({ Connect: { Authorization: 0 } }),
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_AvailabilityZone: D.LazyStruct = () => ({
  SupportedPlatforms: D.list({}, { item: "SupportedPlatform" }),
});
const o_Cluster: D.LazyStruct = () => ({
  Endpoint: {
    Port: D.num,
    VpcEndpoints: D.list(o_VpcEndpoint, { item: "VpcEndpoint" }),
  },
  ClusterCreateTime: D.ts,
  AutomatedSnapshotRetentionPeriod: D.num,
  ManualSnapshotRetentionPeriod: D.num,
  ClusterSecurityGroups: D.list({}, { item: "ClusterSecurityGroup" }),
  VpcSecurityGroups: D.list({}, { item: "VpcSecurityGroup" }),
  ClusterParameterGroups: D.list(
    { ClusterParameterStatusList: D.list({}) },
    { item: "ClusterParameterGroup" },
  ),
  PendingModifiedValues: {
    MasterUserPassword: D.secret,
    NumberOfNodes: D.num,
    AutomatedSnapshotRetentionPeriod: D.num,
    PubliclyAccessible: D.bool,
    EnhancedVpcRouting: D.bool,
  },
  AllowVersionUpgrade: D.bool,
  NumberOfNodes: D.num,
  PubliclyAccessible: D.bool,
  Encrypted: D.bool,
  RestoreStatus: {
    CurrentRestoreRateInMegaBytesPerSecond: D.num,
    SnapshotSizeInMegaBytes: D.num,
    ProgressInMegaBytes: D.num,
    ElapsedTimeInSeconds: D.num,
    EstimatedTimeToCompletionInSeconds: D.num,
  },
  DataTransferProgress: {
    CurrentRateInMegaBytesPerSecond: D.num,
    TotalDataInMegaBytes: D.num,
    DataTransferredInMegaBytes: D.num,
    EstimatedTimeToCompletionInSeconds: D.num,
    ElapsedTimeInSeconds: D.num,
  },
  HsmStatus: {},
  ClusterSnapshotCopyStatus: {
    RetentionPeriod: D.num,
    ManualSnapshotRetentionPeriod: D.num,
  },
  ClusterNodes: D.list({}),
  ElasticIpStatus: {},
  Tags: D.list({}, { item: "Tag" }),
  EnhancedVpcRouting: D.bool,
  IamRoles: D.list({}, { item: "ClusterIamRole" }),
  PendingActions: D.list(),
  DeferredMaintenanceWindows: D.list(
    { DeferMaintenanceStartTime: D.ts, DeferMaintenanceEndTime: D.ts },
    { item: "DeferredMaintenanceWindow" },
  ),
  ExpectedNextSnapshotScheduleTime: D.ts,
  NextMaintenanceWindowStartTime: D.ts,
  ResizeInfo: { AllowCancelResize: D.bool },
  TotalStorageCapacityInMegaBytes: D.num,
  AquaConfiguration: {},
  ReservedNodeExchangeStatus: o_ReservedNodeExchangeStatus,
  CustomDomainCertificateExpiryDate: D.ts,
  MultiAZSecondary: { ClusterNodes: D.list({}) },
  LoggingPublishStatus: { S3Tables: o_S3TablePublishStatus },
});
const o_ClusterParameterGroup: D.LazyStruct = () => ({
  Tags: D.list({}, { item: "Tag" }),
});
const o_ClusterSecurityGroup: D.LazyStruct = () => ({
  EC2SecurityGroups: D.list(
    { Tags: D.list({}, { item: "Tag" }) },
    { item: "EC2SecurityGroup" },
  ),
  IPRanges: D.list({ Tags: D.list({}, { item: "Tag" }) }, { item: "IPRange" }),
  Tags: D.list({}, { item: "Tag" }),
});
const o_ClusterSubnetGroup: D.LazyStruct = () => ({
  Subnets: D.list(
    { SubnetAvailabilityZone: o_AvailabilityZone },
    { item: "Subnet" },
  ),
  Tags: D.list({}, { item: "Tag" }),
  SupportedClusterIpAddressTypes: D.list(0, { item: "item" }),
});
const o_DataShare: D.LazyStruct = () => ({
  AllowPubliclyAccessibleConsumers: D.bool,
  DataShareAssociations: D.list(o_DataShareAssociation),
});
const o_DataShareAssociation: D.LazyStruct = () => ({
  CreatedDate: D.ts,
  StatusChangeDate: D.ts,
  ProducerAllowedWrites: D.bool,
  ConsumerAcceptedWrites: D.bool,
});
const o_EventSubscription: D.LazyStruct = () => ({
  SubscriptionCreationTime: D.ts,
  SourceIdsList: D.list(0, { item: "SourceId" }),
  EventCategoriesList: D.list(0, { item: "EventCategory" }),
  Enabled: D.bool,
  Tags: D.list({}, { item: "Tag" }),
});
const o_HsmClientCertificate: D.LazyStruct = () => ({
  Tags: D.list({}, { item: "Tag" }),
});
const o_HsmConfiguration: D.LazyStruct = () => ({
  Tags: D.list({}, { item: "Tag" }),
});
const o_Parameter: D.LazyStruct = () => ({ IsModifiable: D.bool });
const o_Qev2IdcApplication: D.LazyStruct = () => ({
  Tags: D.list({}, { item: "Tag" }),
});
const o_RedshiftIdcApplication: D.LazyStruct = () => ({
  AuthorizedTokenIssuerList: D.list({ AuthorizedAudiencesList: D.list() }),
  ServiceIntegrations: D.list({
    LakeFormation: D.list({ LakeFormationQuery: {} }),
    S3AccessGrants: D.list({ ReadWriteAccess: {} }),
    Redshift: D.list({ Connect: {} }),
  }),
  Tags: D.list({}, { item: "Tag" }),
  SsoTagKeys: D.list(0, { item: "TagKey" }),
});
const o_ReservedNode: D.LazyStruct = () => ({
  StartTime: D.ts,
  Duration: D.num,
  FixedPrice: D.num,
  UsagePrice: D.num,
  NodeCount: D.num,
  RecurringCharges: D.list(o_RecurringCharge, { item: "RecurringCharge" }),
});
const o_ReservedNodeExchangeStatus: D.LazyStruct = () => ({
  RequestTime: D.ts,
  SourceReservedNodeCount: D.num,
  TargetReservedNodeCount: D.num,
});
const o_ReservedNodeOffering: D.LazyStruct = () => ({
  Duration: D.num,
  FixedPrice: D.num,
  UsagePrice: D.num,
  RecurringCharges: D.list(o_RecurringCharge, { item: "RecurringCharge" }),
});
const o_S3TablePublishStatus: D.LazyStruct = () => ({
  S3Tables: D.list(),
  EnabledAll: D.bool,
  LastIngestionTimes: D.map(),
});
const o_ScheduledActionType: D.LazyStruct = () => ({
  ResizeCluster: { NumberOfNodes: D.num, Classic: D.bool },
  PauseCluster: {},
  ResumeCluster: {},
});
const o_Snapshot: D.LazyStruct = () => ({
  SnapshotCreateTime: D.ts,
  Port: D.num,
  ClusterCreateTime: D.ts,
  NumberOfNodes: D.num,
  Encrypted: D.bool,
  EncryptedWithHSM: D.bool,
  AccountsWithRestoreAccess: D.list({}, { item: "AccountWithRestoreAccess" }),
  TotalBackupSizeInMegaBytes: D.num,
  ActualIncrementalBackupSizeInMegaBytes: D.num,
  BackupProgressInMegaBytes: D.num,
  CurrentBackupRateInMegaBytesPerSecond: D.num,
  EstimatedSecondsToCompletion: D.num,
  ElapsedTimeInSeconds: D.num,
  Tags: D.list({}, { item: "Tag" }),
  RestorableNodeTypes: D.list(0, { item: "NodeType" }),
  EnhancedVpcRouting: D.bool,
  ManualSnapshotRetentionPeriod: D.num,
  ManualSnapshotRemainingDays: D.num,
  SnapshotRetentionStartTime: D.ts,
});
const o_SnapshotCopyGrant: D.LazyStruct = () => ({
  Tags: D.list({}, { item: "Tag" }),
});
const o_TableRestoreStatus: D.LazyStruct = () => ({
  RequestTime: D.ts,
  ProgressInMegaBytes: D.num,
  TotalDataInMegaBytes: D.num,
});
const o_VpcEndpoint: D.LazyStruct = () => ({
  NetworkInterfaces: D.list({}, { item: "NetworkInterface" }),
});
const o_RecurringCharge: D.LazyStruct = () => ({
  RecurringChargeAmount: D.num,
});
