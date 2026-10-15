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
const ns = /*@__PURE__*/ T.XmlNamespace("http://memorydb.amazonaws.com/doc/2021-01-01/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "MemoryDB",
  serviceShapeName: "AmazonMemoryDB",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "memorydb" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-01-01");
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
              `https://memory-db-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://memory-db-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://memory-db.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        if (Region === "fips") {
          return e(
            "https://memory-db-fips.us-west-1.amazonaws.com",
            {
              authSchemes: [{ name: "sigv4", signingName: "memorydb", signingRegion: "us-west-1" }],
            },
            {},
          );
        }
        return e(`https://memory-db.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://memory-db.{R}.{D}","properties":{},"headers":{}}');

export class ACLAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ACLAlreadyExistsFault>()(
    "ACLAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ACLAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ACLNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ACLNotFoundFault>()(
    "ACLNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ACLNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ACLQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ACLQuotaExceededFault>()(
    "ACLQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ACLQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class APICallRateForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<APICallRateForCustomerExceededFault>()(
    "APICallRateForCustomerExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "APICallRateForCustomerExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterAlreadyExistsFault>()(
    "ClusterAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ClusterAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterNotFoundFault>()(
    "ClusterNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ClusterNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterQuotaForCustomerExceededFault>()(
    "ClusterQuotaForCustomerExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ClusterQuotaForCustomerExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DefaultUserRequired
  extends /*@__PURE__*/ S.TaggedError<DefaultUserRequired>()(
    "DefaultUserRequired",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DefaultUserRequired", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateUserNameFault
  extends /*@__PURE__*/ S.TaggedError<DuplicateUserNameFault>()(
    "DuplicateUserNameFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DuplicateUserName", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientClusterCapacityFault>()(
    "InsufficientClusterCapacityFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InsufficientClusterCapacity", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidACLStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidACLStateFault>()(
    "InvalidACLStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidACLState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidARNFault
  extends /*@__PURE__*/ S.TaggedError<InvalidARNFault>()(
    "InvalidARNFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidARN", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterStateFault>()(
    "InvalidClusterStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidClusterState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCredentialsException
  extends /*@__PURE__*/ S.TaggedError<InvalidCredentialsException>()(
    "InvalidCredentialsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidCredentialsException", httpResponseCode: 408 }),
      /*@__PURE__*/ T.HttpError(408),
    ),
  ).pipe(C.withTimeoutError) {}
export class InvalidKMSKeyFault
  extends /*@__PURE__*/ S.TaggedError<InvalidKMSKeyFault>()(
    "InvalidKMSKeyFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidKMSKeyFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidMultiRegionClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidMultiRegionClusterStateFault>()(
    "InvalidMultiRegionClusterStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvalidMultiRegionClusterState",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidNodeStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidNodeStateFault>()(
    "InvalidNodeStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidNodeState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameterCombination", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterGroupStateFault>()(
    "InvalidParameterGroupStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameterGroupState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameterValue", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSnapshotStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidSnapshotStateFault>()(
    "InvalidSnapshotStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSnapshotState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSubnet
  extends /*@__PURE__*/ S.TaggedError<InvalidSubnet>()(
    "InvalidSubnet",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSubnet", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidUserStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidUserStateFault>()(
    "InvalidUserStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidUserState", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidVPCNetworkStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidVPCNetworkStateFault>()(
    "InvalidVPCNetworkStateFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidVPCNetworkStateFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MultiRegionClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<MultiRegionClusterAlreadyExistsFault>()(
    "MultiRegionClusterAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "MultiRegionClusterAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class MultiRegionClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<MultiRegionClusterNotFoundFault>()(
    "MultiRegionClusterNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "MultiRegionClusterNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class MultiRegionParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<MultiRegionParameterGroupNotFoundFault>()(
    "MultiRegionParameterGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "MultiRegionParameterGroupNotFoundFault",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeQuotaForClusterExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeQuotaForClusterExceededFault>()(
    "NodeQuotaForClusterExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NodeQuotaForClusterExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeQuotaForCustomerExceededFault>()(
    "NodeQuotaForCustomerExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "NodeQuotaForCustomerExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NoOperationFault
  extends /*@__PURE__*/ S.TaggedError<NoOperationFault>()(
    "NoOperationFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "NoOperationFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ParameterGroupAlreadyExistsFault>()(
    "ParameterGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ParameterGroupAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ParameterGroupNotFoundFault>()(
    "ParameterGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ParameterGroupNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ParameterGroupQuotaExceededFault>()(
    "ParameterGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ParameterGroupQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeAlreadyExistsFault>()(
    "ReservedNodeAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ReservedNodeAlreadyExists", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ReservedNodeNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeNotFoundFault>()(
    "ReservedNodeNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ReservedNodeNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeQuotaExceededFault>()(
    "ReservedNodeQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ReservedNodeQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodesOfferingNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodesOfferingNotFoundFault>()(
    "ReservedNodesOfferingNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ReservedNodesOfferingNotFound",
        httpResponseCode: 404,
      }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceLinkedRoleNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServiceLinkedRoleNotFoundFault>()(
    "ServiceLinkedRoleNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ServiceLinkedRoleNotFoundFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceUpdateNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServiceUpdateNotFoundFault>()(
    "ServiceUpdateNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ServiceUpdateNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ShardNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ShardNotFoundFault>()(
    "ShardNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ShardNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ShardsPerClusterQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ShardsPerClusterQuotaExceededFault>()(
    "ShardsPerClusterQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ShardsPerClusterQuotaExceeded",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotAlreadyExistsFault>()(
    "SnapshotAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SnapshotAlreadyExistsFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SnapshotNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotNotFoundFault>()(
    "SnapshotNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SnapshotNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotQuotaExceededFault>()(
    "SnapshotQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SnapshotQuotaExceededFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupAlreadyExistsFault>()(
    "SubnetGroupAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetGroupAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SubnetGroupInUseFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupInUseFault>()(
    "SubnetGroupInUseFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetGroupInUse", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupNotFoundFault>()(
    "SubnetGroupNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetGroupNotFoundFault", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SubnetGroupQuotaExceededFault>()(
    "SubnetGroupQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetGroupQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetInUse
  extends /*@__PURE__*/ S.TaggedError<SubnetInUse>()(
    "SubnetInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetInUse", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class SubnetNotAllowedFault
  extends /*@__PURE__*/ S.TaggedError<SubnetNotAllowedFault>()(
    "SubnetNotAllowedFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetNotAllowedFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SubnetQuotaExceededFault>()(
    "SubnetQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetQuotaExceededFault", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<TagNotFoundFault>()(
    "TagNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TagNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagQuotaPerResourceExceeded
  extends /*@__PURE__*/ S.TaggedError<TagQuotaPerResourceExceeded>()(
    "TagQuotaPerResourceExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TagQuotaPerResourceExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TestFailoverNotAvailableFault
  extends /*@__PURE__*/ S.TaggedError<TestFailoverNotAvailableFault>()(
    "TestFailoverNotAvailableFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "TestFailoverNotAvailableFault",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UserAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<UserAlreadyExistsFault>()(
    "UserAlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UserAlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class UserNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<UserNotFoundFault>()(
    "UserNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UserNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UserQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<UserQuotaExceededFault>()(
    "UserQuotaExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UserQuotaExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type ClusterNameList = string[];
export interface ServiceUpdateRequest {
  ServiceUpdateNameToApply?: string;
}
export interface BatchUpdateClusterRequest {
  ClusterNames: string[];
  ServiceUpdate?: ServiceUpdateRequest;
}
export interface SlotMigration {
  ProgressPercentage?: number;
}
export interface ReshardingStatus {
  SlotMigration?: SlotMigration;
}
export type ACLName = string;
export interface ACLsUpdateStatus {
  ACLToApply?: string;
}
export type ServiceUpdateStatus =
  | "available"
  | "in-progress"
  | "complete"
  | "scheduled"
  | (string & {});
export interface PendingModifiedServiceUpdate {
  ServiceUpdateName?: string;
  Status?: ServiceUpdateStatus;
}
export type PendingModifiedServiceUpdateList = PendingModifiedServiceUpdate[];
export interface ClusterPendingUpdates {
  Resharding?: ReshardingStatus;
  ACLs?: ACLsUpdateStatus;
  ServiceUpdates?: PendingModifiedServiceUpdate[];
}
export interface Endpoint {
  Address?: string;
  Port?: number;
}
const Endpoint = /*@__PURE__*/ __L.at(__c3, 0) as any as S.Schema<Endpoint>;
export interface Node {
  Name?: string;
  Status?: string;
  AvailabilityZone?: string;
  CreateTime?: Date;
  Endpoint?: Endpoint;
}
export type NodeList = Node[];
export interface Shard {
  Name?: string;
  Status?: string;
  Slots?: string;
  Nodes?: Node[];
  NumberOfNodes?: number;
}
export type ShardList = Shard[];
export type AZStatus = "singleaz" | "multiaz" | (string & {});
export interface SecurityGroupMembership {
  SecurityGroupId?: string;
  Status?: string;
}
export type SecurityGroupMembershipList = SecurityGroupMembership[];
export type DataTieringStatus = "true" | "false" | (string & {});
export type NetworkType = "ipv4" | "ipv6" | "dual_stack" | (string & {});
export type IpDiscovery = "ipv4" | "ipv6" | (string & {});
export interface Cluster {
  Name?: string;
  Description?: string;
  Status?: string;
  PendingUpdates?: ClusterPendingUpdates;
  MultiRegionClusterName?: string;
  NumberOfShards?: number;
  Shards?: Shard[];
  AvailabilityMode?: AZStatus;
  ClusterEndpoint?: Endpoint;
  NodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  EnginePatchVersion?: string;
  ParameterGroupName?: string;
  ParameterGroupStatus?: string;
  SecurityGroups?: SecurityGroupMembership[];
  SubnetGroupName?: string;
  TLSEnabled?: boolean;
  KmsKeyId?: string;
  ARN?: string;
  SnsTopicArn?: string;
  SnsTopicStatus?: string;
  SnapshotRetentionLimit?: number;
  MaintenanceWindow?: string;
  SnapshotWindow?: string;
  ACLName?: string;
  AutoMinorVersionUpgrade?: boolean;
  DataTiering?: DataTieringStatus;
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
}
export type ClusterList = Cluster[];
export interface UnprocessedCluster {
  ClusterName?: string;
  ErrorType?: string;
  ErrorMessage?: string;
}
export type UnprocessedClusterList = UnprocessedCluster[];
export interface BatchUpdateClusterResponse {
  ProcessedClusters?: Cluster[];
  UnprocessedClusters?: UnprocessedCluster[];
}
export type TargetBucket = string;
export type KmsKeyId = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface CopySnapshotRequest {
  SourceSnapshotName: string;
  TargetSnapshotName: string;
  TargetBucket?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export interface ShardConfiguration {
  Slots?: string;
  ReplicaCount?: number;
}
export interface ShardDetail {
  Name?: string;
  Configuration?: ShardConfiguration;
  Size?: string;
  SnapshotCreationTime?: Date;
}
export type ShardDetails = ShardDetail[];
export interface ClusterConfiguration {
  Name?: string;
  Description?: string;
  NodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  MaintenanceWindow?: string;
  TopicArn?: string;
  Port?: number;
  ParameterGroupName?: string;
  SubnetGroupName?: string;
  VpcId?: string;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  NumShards?: number;
  Shards?: ShardDetail[];
  MultiRegionParameterGroupName?: string;
  MultiRegionClusterName?: string;
}
export interface Snapshot {
  Name?: string;
  Status?: string;
  Source?: string;
  KmsKeyId?: string;
  ARN?: string;
  ClusterConfiguration?: ClusterConfiguration;
  DataTiering?: DataTieringStatus;
}
export interface CopySnapshotResponse {
  Snapshot?: Snapshot;
}
export type UserName = string;
export type UserNameListInput = string[];
export interface CreateACLRequest {
  ACLName: string;
  UserNames?: string[];
  Tags?: Tag[];
}
export type UserNameList = string[];
export interface ACLPendingChanges {
  UserNamesToRemove?: string[];
  UserNamesToAdd?: string[];
}
export type ACLClusterNameList = string[];
export interface ACL {
  Name?: string;
  Status?: string;
  UserNames?: string[];
  MinimumEngineVersion?: string;
  PendingChanges?: ACLPendingChanges;
  Clusters?: string[];
  ARN?: string;
}
export interface CreateACLResponse {
  ACL?: ACL;
}
export type SecurityGroupIdsList = string[];
export type SnapshotArnsList = string[];
export interface CreateClusterRequest {
  ClusterName: string;
  NodeType: string;
  MultiRegionClusterName?: string;
  ParameterGroupName?: string;
  Description?: string;
  NumShards?: number;
  NumReplicasPerShard?: number;
  SubnetGroupName?: string;
  SecurityGroupIds?: string[];
  MaintenanceWindow?: string;
  Port?: number;
  SnsTopicArn?: string;
  TLSEnabled?: boolean;
  KmsKeyId?: string;
  SnapshotArns?: string[];
  SnapshotName?: string;
  SnapshotRetentionLimit?: number;
  Tags?: Tag[];
  SnapshotWindow?: string;
  ACLName: string;
  Engine?: string;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  DataTiering?: boolean;
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
}
export interface CreateClusterResponse {
  Cluster?: Cluster;
}
export interface CreateMultiRegionClusterRequest {
  MultiRegionClusterNameSuffix: string;
  Description?: string;
  Engine?: string;
  EngineVersion?: string;
  NodeType: string;
  MultiRegionParameterGroupName?: string;
  NumShards?: number;
  TLSEnabled?: boolean;
  Tags?: Tag[];
}
export interface RegionalCluster {
  ClusterName?: string;
  Region?: string;
  Status?: string;
  ARN?: string;
}
export type RegionalClusterList = RegionalCluster[];
export interface MultiRegionCluster {
  MultiRegionClusterName?: string;
  Description?: string;
  Status?: string;
  NodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  NumberOfShards?: number;
  Clusters?: RegionalCluster[];
  MultiRegionParameterGroupName?: string;
  TLSEnabled?: boolean;
  ARN?: string;
}
export interface CreateMultiRegionClusterResponse {
  MultiRegionCluster?: MultiRegionCluster;
}
export interface CreateParameterGroupRequest {
  ParameterGroupName: string;
  Family: string;
  Description?: string;
  Tags?: Tag[];
}
export interface ParameterGroup {
  Name?: string;
  Family?: string;
  Description?: string;
  ARN?: string;
}
export interface CreateParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export interface CreateSnapshotRequest {
  ClusterName: string;
  SnapshotName: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export interface CreateSnapshotResponse {
  Snapshot?: Snapshot;
}
export type SubnetIdentifierList = string[];
export interface CreateSubnetGroupRequest {
  SubnetGroupName: string;
  Description?: string;
  SubnetIds: string[];
  Tags?: Tag[];
}
export interface AvailabilityZone {
  Name?: string;
}
export type NetworkTypeList = NetworkType[];
export interface Subnet {
  Identifier?: string;
  AvailabilityZone?: AvailabilityZone;
  SupportedNetworkTypes?: NetworkType[];
}
export type SubnetList = Subnet[];
export interface SubnetGroup {
  Name?: string;
  Description?: string;
  VpcId?: string;
  Subnets?: Subnet[];
  ARN?: string;
  SupportedNetworkTypes?: NetworkType[];
}
export interface CreateSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export type InputAuthenticationType = "password" | "iam" | (string & {});
export type PasswordListInput = string[];
export interface AuthenticationMode {
  Type?: InputAuthenticationType;
  Passwords?: Array<string | redacted.Redacted<string>>;
}
export type AccessString = string;
export interface CreateUserRequest {
  UserName: string;
  AuthenticationMode: AuthenticationMode;
  AccessString: string;
  Tags?: Tag[];
}
export type ACLNameList = string[];
export type AuthenticationType = "password" | "no-password" | "iam" | (string & {});
export interface Authentication {
  Type?: AuthenticationType;
  PasswordCount?: number;
}
export interface User {
  Name?: string;
  Status?: string;
  AccessString?: string;
  ACLNames?: string[];
  MinimumEngineVersion?: string;
  Authentication?: Authentication;
  ARN?: string;
}
export interface CreateUserResponse {
  User?: User;
}
export interface DeleteACLRequest {
  ACLName: string;
}
export interface DeleteACLResponse {
  ACL?: ACL;
}
export interface DeleteClusterRequest {
  ClusterName: string;
  MultiRegionClusterName?: string;
  FinalSnapshotName?: string;
}
export interface DeleteClusterResponse {
  Cluster?: Cluster;
}
export interface DeleteMultiRegionClusterRequest {
  MultiRegionClusterName: string;
}
export interface DeleteMultiRegionClusterResponse {
  MultiRegionCluster?: MultiRegionCluster;
}
export interface DeleteParameterGroupRequest {
  ParameterGroupName: string;
}
export interface DeleteParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export interface DeleteSnapshotRequest {
  SnapshotName: string;
}
export interface DeleteSnapshotResponse {
  Snapshot?: Snapshot;
}
export interface DeleteSubnetGroupRequest {
  SubnetGroupName: string;
}
export interface DeleteSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export interface DeleteUserRequest {
  UserName: string;
}
export interface DeleteUserResponse {
  User?: User;
}
export interface DescribeACLsRequest {
  ACLName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ACLList = ACL[];
export interface DescribeACLsResponse {
  ACLs?: ACL[];
  NextToken?: string;
}
export interface DescribeClustersRequest {
  ClusterName?: string;
  MaxResults?: number;
  NextToken?: string;
  ShowShardDetails?: boolean;
}
export interface DescribeClustersResponse {
  NextToken?: string;
  Clusters?: Cluster[];
}
export interface DescribeEngineVersionsRequest {
  Engine?: string;
  EngineVersion?: string;
  ParameterGroupFamily?: string;
  MaxResults?: number;
  NextToken?: string;
  DefaultOnly?: boolean;
}
export interface EngineVersionInfo {
  Engine?: string;
  EngineVersion?: string;
  EnginePatchVersion?: string;
  ParameterGroupFamily?: string;
}
export type EngineVersionInfoList = EngineVersionInfo[];
export interface DescribeEngineVersionsResponse {
  NextToken?: string;
  EngineVersions?: EngineVersionInfo[];
}
export type SourceType =
  | "node"
  | "parameter-group"
  | "subnet-group"
  | "cluster"
  | "user"
  | "acl"
  | (string & {});
export interface DescribeEventsRequest {
  SourceName?: string;
  SourceType?: SourceType;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  MaxResults?: number;
  NextToken?: string;
}
export interface Event {
  SourceName?: string;
  SourceType?: SourceType;
  Message?: string;
  Date?: Date;
}
export type EventList = Event[];
export interface DescribeEventsResponse {
  NextToken?: string;
  Events?: Event[];
}
export interface DescribeMultiRegionClustersRequest {
  MultiRegionClusterName?: string;
  MaxResults?: number;
  NextToken?: string;
  ShowClusterDetails?: boolean;
}
export type MultiRegionClusterList = MultiRegionCluster[];
export interface DescribeMultiRegionClustersResponse {
  NextToken?: string;
  MultiRegionClusters?: MultiRegionCluster[];
}
export interface DescribeMultiRegionParameterGroupsRequest {
  MultiRegionParameterGroupName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface MultiRegionParameterGroup {
  Name?: string;
  Family?: string;
  Description?: string;
  ARN?: string;
}
export type MultiRegionParameterGroupList = MultiRegionParameterGroup[];
export interface DescribeMultiRegionParameterGroupsResponse {
  NextToken?: string;
  MultiRegionParameterGroups?: MultiRegionParameterGroup[];
}
export interface DescribeMultiRegionParametersRequest {
  MultiRegionParameterGroupName: string;
  Source?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface MultiRegionParameter {
  Name?: string;
  Value?: string;
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  MinimumEngineVersion?: string;
}
export type MultiRegionParametersList = MultiRegionParameter[];
export interface DescribeMultiRegionParametersResponse {
  NextToken?: string;
  MultiRegionParameters?: MultiRegionParameter[];
}
export interface DescribeParameterGroupsRequest {
  ParameterGroupName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ParameterGroupList = ParameterGroup[];
export interface DescribeParameterGroupsResponse {
  NextToken?: string;
  ParameterGroups?: ParameterGroup[];
}
export interface DescribeParametersRequest {
  ParameterGroupName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface Parameter {
  Name?: string;
  Value?: string;
  Description?: string;
  DataType?: string;
  AllowedValues?: string;
  MinimumEngineVersion?: string;
}
export type ParametersList = Parameter[];
export interface DescribeParametersResponse {
  NextToken?: string;
  Parameters?: Parameter[];
}
export interface DescribeReservedNodesRequest {
  ReservationId?: string;
  ReservedNodesOfferingId?: string;
  NodeType?: string;
  Duration?: string;
  OfferingType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface RecurringCharge {
  RecurringChargeAmount?: number;
  RecurringChargeFrequency?: string;
}
export type RecurringChargeList = RecurringCharge[];
export interface ReservedNode {
  ReservationId?: string;
  ReservedNodesOfferingId?: string;
  NodeType?: string;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  NodeCount?: number;
  OfferingType?: string;
  State?: string;
  RecurringCharges?: RecurringCharge[];
  ARN?: string;
}
export type ReservedNodeList = ReservedNode[];
export interface DescribeReservedNodesResponse {
  NextToken?: string;
  ReservedNodes?: ReservedNode[];
}
export interface DescribeReservedNodesOfferingsRequest {
  ReservedNodesOfferingId?: string;
  NodeType?: string;
  Duration?: string;
  OfferingType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ReservedNodesOffering {
  ReservedNodesOfferingId?: string;
  NodeType?: string;
  Duration?: number;
  FixedPrice?: number;
  OfferingType?: string;
  RecurringCharges?: RecurringCharge[];
}
export type ReservedNodesOfferingList = ReservedNodesOffering[];
export interface DescribeReservedNodesOfferingsResponse {
  NextToken?: string;
  ReservedNodesOfferings?: ReservedNodesOffering[];
}
export type ServiceUpdateStatusList = ServiceUpdateStatus[];
export interface DescribeServiceUpdatesRequest {
  ServiceUpdateName?: string;
  ClusterNames?: string[];
  Status?: ServiceUpdateStatus[];
  MaxResults?: number;
  NextToken?: string;
}
export type ServiceUpdateType = "security-update" | (string & {});
export interface ServiceUpdate {
  ClusterName?: string;
  ServiceUpdateName?: string;
  ReleaseDate?: Date;
  Description?: string;
  Status?: ServiceUpdateStatus;
  Type?: ServiceUpdateType;
  Engine?: string;
  NodesUpdated?: string;
  AutoUpdateStartDate?: Date;
}
export type ServiceUpdateList = ServiceUpdate[];
export interface DescribeServiceUpdatesResponse {
  NextToken?: string;
  ServiceUpdates?: ServiceUpdate[];
}
export interface DescribeSnapshotsRequest {
  ClusterName?: string;
  SnapshotName?: string;
  Source?: string;
  NextToken?: string;
  MaxResults?: number;
  ShowDetail?: boolean;
}
export type SnapshotList = Snapshot[];
export interface DescribeSnapshotsResponse {
  NextToken?: string;
  Snapshots?: Snapshot[];
}
export interface DescribeSubnetGroupsRequest {
  SubnetGroupName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type SubnetGroupList = SubnetGroup[];
export interface DescribeSubnetGroupsResponse {
  NextToken?: string;
  SubnetGroups?: SubnetGroup[];
}
export type FilterName = string;
export type FilterValue = string;
export type FilterValueList = string[];
export interface Filter {
  Name: string;
  Values: string[];
}
export type FilterList = Filter[];
export interface DescribeUsersRequest {
  UserName?: string;
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type UserList = User[];
export interface DescribeUsersResponse {
  Users?: User[];
  NextToken?: string;
}
export interface FailoverShardRequest {
  ClusterName: string;
  ShardName: string;
}
export interface FailoverShardResponse {
  Cluster?: Cluster;
}
export interface ListAllowedMultiRegionClusterUpdatesRequest {
  MultiRegionClusterName: string;
}
export type NodeTypeList = string[];
export interface ListAllowedMultiRegionClusterUpdatesResponse {
  ScaleUpNodeTypes?: string[];
  ScaleDownNodeTypes?: string[];
}
export interface ListAllowedNodeTypeUpdatesRequest {
  ClusterName: string;
}
export interface ListAllowedNodeTypeUpdatesResponse {
  ScaleUpNodeTypes?: string[];
  ScaleDownNodeTypes?: string[];
}
export interface ListTagsRequest {
  ResourceArn: string;
}
export interface ListTagsResponse {
  TagList?: Tag[];
}
export interface PurchaseReservedNodesOfferingRequest {
  ReservedNodesOfferingId: string;
  ReservationId?: string;
  NodeCount?: number;
  Tags?: Tag[];
}
export interface PurchaseReservedNodesOfferingResponse {
  ReservedNode?: ReservedNode;
}
export type ParameterNameList = string[];
export interface ResetParameterGroupRequest {
  ParameterGroupName: string;
  AllParameters?: boolean;
  ParameterNames?: string[];
}
export interface ResetParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {
  TagList?: Tag[];
}
export type KeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {
  TagList?: Tag[];
}
export interface UpdateACLRequest {
  ACLName: string;
  UserNamesToAdd?: string[];
  UserNamesToRemove?: string[];
}
export interface UpdateACLResponse {
  ACL?: ACL;
}
export interface ReplicaConfigurationRequest {
  ReplicaCount?: number;
}
export interface ShardConfigurationRequest {
  ShardCount?: number;
}
export interface UpdateClusterRequest {
  ClusterName: string;
  Description?: string;
  SecurityGroupIds?: string[];
  MaintenanceWindow?: string;
  SnsTopicArn?: string;
  SnsTopicStatus?: string;
  ParameterGroupName?: string;
  SnapshotWindow?: string;
  SnapshotRetentionLimit?: number;
  NodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  ReplicaConfiguration?: ReplicaConfigurationRequest;
  ShardConfiguration?: ShardConfigurationRequest;
  ACLName?: string;
  IpDiscovery?: IpDiscovery;
}
export interface UpdateClusterResponse {
  Cluster?: Cluster;
}
export type UpdateStrategy = "coordinated" | "uncoordinated" | (string & {});
export interface UpdateMultiRegionClusterRequest {
  MultiRegionClusterName: string;
  NodeType?: string;
  Description?: string;
  EngineVersion?: string;
  ShardConfiguration?: ShardConfigurationRequest;
  MultiRegionParameterGroupName?: string;
  UpdateStrategy?: UpdateStrategy;
}
export interface UpdateMultiRegionClusterResponse {
  MultiRegionCluster?: MultiRegionCluster;
}
export interface ParameterNameValue {
  ParameterName?: string;
  ParameterValue?: string;
}
export type ParameterNameValueList = ParameterNameValue[];
export interface UpdateParameterGroupRequest {
  ParameterGroupName: string;
  ParameterNameValues: ParameterNameValue[];
}
export interface UpdateParameterGroupResponse {
  ParameterGroup?: ParameterGroup;
}
export interface UpdateSubnetGroupRequest {
  SubnetGroupName: string;
  Description?: string;
  SubnetIds?: string[];
}
export interface UpdateSubnetGroupResponse {
  SubnetGroup?: SubnetGroup;
}
export interface UpdateUserRequest {
  UserName: string;
  AuthenticationMode?: AuthenticationMode;
  AccessString?: string;
}
export interface UpdateUserResponse {
  User?: User;
}
export type AwsQueryErrorMessage = string;
export type ExceptionMessage = string;
export type BatchUpdateClusterError =
  | InvalidParameterValueException
  | ServiceUpdateNotFoundFault
  | InvalidParameterCombinationException
  | CommonErrors;
/**
 * Apply the service update to a list of clusters supplied. For more information on service updates and applying them, see Applying the service updates.
 */
export const batchUpdateCluster: API.OperationMethod<
  BatchUpdateClusterRequest,
  BatchUpdateClusterResponse,
  BatchUpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(33, __c2, 1) as any as S.Schema<BatchUpdateClusterRequest>,
  output: __S(36, __c2, 4) as any as S.Schema<BatchUpdateClusterResponse>,
  errors: [
    InvalidParameterValueException,
    ServiceUpdateNotFoundFault,
    InvalidParameterCombinationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateCluster",
}));

export type CopySnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidSnapshotStateFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotAlreadyExistsFault
  | SnapshotNotFoundFault
  | SnapshotQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Makes a copy of an existing snapshot.
 */
export const copySnapshot: API.OperationMethod<
  CopySnapshotRequest,
  CopySnapshotResponse,
  CopySnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<CopySnapshotRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<CopySnapshotResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidSnapshotStateFault,
    ServiceLinkedRoleNotFoundFault,
    SnapshotAlreadyExistsFault,
    SnapshotNotFoundFault,
    SnapshotQuotaExceededFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopySnapshot",
}));

export type CreateACLError =
  | ACLAlreadyExistsFault
  | ACLQuotaExceededFault
  | DefaultUserRequired
  | DuplicateUserNameFault
  | InvalidParameterValueException
  | TagQuotaPerResourceExceeded
  | UserNotFoundFault
  | CommonErrors;
/**
 * Creates an Access Control List. For more information, see Authenticating users with Access Contol Lists (ACLs).
 */
export const createACL: API.OperationMethod<
  CreateACLRequest,
  CreateACLResponse,
  CreateACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<CreateACLRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<CreateACLResponse>,
  errors: [
    ACLAlreadyExistsFault,
    ACLQuotaExceededFault,
    DefaultUserRequired,
    DuplicateUserNameFault,
    InvalidParameterValueException,
    TagQuotaPerResourceExceeded,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateACL",
}));

export type CreateClusterError =
  | ACLNotFoundFault
  | ClusterAlreadyExistsFault
  | ClusterQuotaForCustomerExceededFault
  | InsufficientClusterCapacityFault
  | InvalidACLStateFault
  | InvalidCredentialsException
  | InvalidMultiRegionClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidVPCNetworkStateFault
  | MultiRegionClusterNotFoundFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | ShardsPerClusterQuotaExceededFault
  | SubnetGroupNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a cluster. All nodes in the cluster run the same protocol-compliant engine software.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(225, __c14, 1) as any as S.Schema<CreateClusterRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<CreateClusterResponse>,
  errors: [
    ACLNotFoundFault,
    ClusterAlreadyExistsFault,
    ClusterQuotaForCustomerExceededFault,
    InsufficientClusterCapacityFault,
    InvalidACLStateFault,
    InvalidCredentialsException,
    InvalidMultiRegionClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidVPCNetworkStateFault,
    MultiRegionClusterNotFoundFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    ShardsPerClusterQuotaExceededFault,
    SubnetGroupNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateMultiRegionClusterError =
  | ClusterQuotaForCustomerExceededFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionClusterAlreadyExistsFault
  | MultiRegionParameterGroupNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a new multi-Region cluster.
 */
export const createMultiRegionCluster: API.OperationMethod<
  CreateMultiRegionClusterRequest,
  CreateMultiRegionClusterResponse,
  CreateMultiRegionClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<CreateMultiRegionClusterRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<CreateMultiRegionClusterResponse>,
  errors: [
    ClusterQuotaForCustomerExceededFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterAlreadyExistsFault,
    MultiRegionParameterGroupNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiRegionCluster",
}));

export type CreateParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupAlreadyExistsFault
  | ParameterGroupQuotaExceededFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a new MemoryDB parameter group. A parameter group is a collection of parameters and their values that are applied to all of the nodes in any cluster. For
 * more information, see Configuring engine parameters using parameter groups.
 */
export const createParameterGroup: API.OperationMethod<
  CreateParameterGroupRequest,
  CreateParameterGroupResponse,
  CreateParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<CreateParameterGroupRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<CreateParameterGroupResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupAlreadyExistsFault,
    ParameterGroupQuotaExceededFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateParameterGroup",
}));

export type CreateSnapshotError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | SnapshotAlreadyExistsFault
  | SnapshotQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a copy of an entire cluster at a specific moment in time.
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotRequest,
  CreateSnapshotResponse,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<CreateSnapshotRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<CreateSnapshotResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    SnapshotAlreadyExistsFault,
    SnapshotQuotaExceededFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
}));

export type CreateSubnetGroupError =
  | InvalidSubnet
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupAlreadyExistsFault
  | SubnetGroupQuotaExceededFault
  | SubnetNotAllowedFault
  | SubnetQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a subnet group. A subnet group is a collection of subnets (typically private) that you can designate for your clusters running in an Amazon Virtual Private Cloud (VPC) environment.
 *
 * When you create a cluster in an Amazon VPC, you must specify a subnet group. MemoryDB uses that subnet group to choose a subnet and IP addresses within that subnet to associate with your nodes.
 * For more information, see Subnets and subnet groups.
 */
export const createSubnetGroup: API.OperationMethod<
  CreateSubnetGroupRequest,
  CreateSubnetGroupResponse,
  CreateSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<CreateSubnetGroupRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<CreateSubnetGroupResponse>,
  errors: [
    InvalidSubnet,
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupAlreadyExistsFault,
    SubnetGroupQuotaExceededFault,
    SubnetNotAllowedFault,
    SubnetQuotaExceededFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubnetGroup",
}));

export type CreateUserError =
  | DuplicateUserNameFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | TagQuotaPerResourceExceeded
  | UserAlreadyExistsFault
  | UserQuotaExceededFault
  | CommonErrors;
/**
 * Creates a MemoryDB user. For more information, see Authenticating users with Access Contol Lists (ACLs).
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<CreateUserRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<CreateUserResponse>,
  errors: [
    DuplicateUserNameFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    TagQuotaPerResourceExceeded,
    UserAlreadyExistsFault,
    UserQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type DeleteACLError =
  | ACLNotFoundFault
  | InvalidACLStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Deletes an Access Control List. The ACL must first be disassociated from the cluster before it can be deleted. For more information, see Authenticating users with Access Contol Lists (ACLs).
 */
export const deleteACL: API.OperationMethod<
  DeleteACLRequest,
  DeleteACLResponse,
  DeleteACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<DeleteACLRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteACLResponse>,
  errors: [ACLNotFoundFault, InvalidACLStateFault, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteACL",
}));

export type DeleteClusterError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | SnapshotAlreadyExistsFault
  | CommonErrors;
/**
 * Deletes a cluster. It also deletes all associated nodes and node endpoints.
 *
 * `CreateSnapshot` permission is required to create a final snapshot.
 * Without this permission, the API call will fail with an `Access Denied` exception.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<DeleteClusterRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<DeleteClusterResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    SnapshotAlreadyExistsFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteMultiRegionClusterError =
  | InvalidMultiRegionClusterStateFault
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | CommonErrors;
/**
 * Deletes an existing multi-Region cluster.
 */
export const deleteMultiRegionCluster: API.OperationMethod<
  DeleteMultiRegionClusterRequest,
  DeleteMultiRegionClusterResponse,
  DeleteMultiRegionClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<DeleteMultiRegionClusterRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<DeleteMultiRegionClusterResponse>,
  errors: [
    InvalidMultiRegionClusterStateFault,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiRegionCluster",
}));

export type DeleteParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified parameter group. You cannot delete a parameter group if it is associated with any clusters.
 * You cannot delete the default parameter groups in your account.
 */
export const deleteParameterGroup: API.OperationMethod<
  DeleteParameterGroupRequest,
  DeleteParameterGroupResponse,
  DeleteParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<DeleteParameterGroupRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<DeleteParameterGroupResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteParameterGroup",
}));

export type DeleteSnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidSnapshotStateFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotNotFoundFault
  | CommonErrors;
/**
 * Deletes an existing snapshot. When you receive a successful response from this operation, MemoryDB immediately begins deleting the snapshot; you cannot cancel or revert this operation.
 */
export const deleteSnapshot: API.OperationMethod<
  DeleteSnapshotRequest,
  DeleteSnapshotResponse,
  DeleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<DeleteSnapshotRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteSnapshotResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidSnapshotStateFault,
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
}));

export type DeleteSubnetGroupError =
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupInUseFault
  | SubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Deletes a subnet group. You cannot delete a default subnet group or one that is associated with any clusters.
 */
export const deleteSubnetGroup: API.OperationMethod<
  DeleteSubnetGroupRequest,
  DeleteSubnetGroupResponse,
  DeleteSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<DeleteSubnetGroupRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<DeleteSubnetGroupResponse>,
  errors: [ServiceLinkedRoleNotFoundFault, SubnetGroupInUseFault, SubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubnetGroup",
}));

export type DeleteUserError =
  | InvalidParameterValueException
  | InvalidUserStateFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Deletes a user. The user will be removed from all ACLs and in turn removed from all clusters.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<DeleteUserRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<DeleteUserResponse>,
  errors: [InvalidParameterValueException, InvalidUserStateFault, UserNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DescribeACLsError =
  | ACLNotFoundFault
  | InvalidParameterCombinationException
  | CommonErrors;
/**
 * Returns a list of ACLs.
 */
export const describeACLs: API.PaginatedOperationMethod<
  DescribeACLsRequest,
  DescribeACLsResponse,
  DescribeACLsError,
  Credentials | HttpClient.HttpClient,
  ACL
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<DescribeACLsRequest>,
  output: __S(642, __c40, 2) as any as S.Schema<DescribeACLsResponse>,
  errors: [ACLNotFoundFault, InvalidParameterCombinationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeACLs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ACLs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeClustersError =
  | ClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns information about all provisioned clusters if no cluster identifier is specified, or about a specific cluster if a cluster name is supplied.
 */
export const describeClusters: API.PaginatedOperationMethod<
  DescribeClustersRequest,
  DescribeClustersResponse,
  DescribeClustersError,
  Credentials | HttpClient.HttpClient,
  Cluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<DescribeClustersRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<DescribeClustersResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Clusters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeEngineVersionsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns a list of the available Redis OSS engine versions.
 */
export const describeEngineVersions: API.PaginatedOperationMethod<
  DescribeEngineVersionsRequest,
  DescribeEngineVersionsResponse,
  DescribeEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  EngineVersionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<DescribeEngineVersionsRequest>,
  output: __S(675, __c42, 3) as any as S.Schema<DescribeEngineVersionsResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EngineVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeEventsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns events related to clusters, security groups, and parameter groups. You can obtain events specific to a particular cluster, security group, or parameter group by providing the name as a parameter.
 *
 * By default, only the events occurring within the last hour are returned; however, you can retrieve up to 14 days' worth of events if necessary.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsRequest,
  DescribeEventsResponse,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<DescribeEventsRequest>,
  output: __S(691, __c43, 3) as any as S.Schema<DescribeEventsResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMultiRegionClustersError =
  | ClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | CommonErrors;
/**
 * Returns details about one or more multi-Region clusters.
 */
export const describeMultiRegionClusters: API.PaginatedOperationMethod<
  DescribeMultiRegionClustersRequest,
  DescribeMultiRegionClustersResponse,
  DescribeMultiRegionClustersError,
  Credentials | HttpClient.HttpClient,
  MultiRegionCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<DescribeMultiRegionClustersRequest>,
  output: __S(706, __c44, 2) as any as S.Schema<DescribeMultiRegionClustersResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiRegionClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MultiRegionClusters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMultiRegionParameterGroupsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns a list of multi-region parameter groups.
 */
export const describeMultiRegionParameterGroups: API.OperationMethod<
  DescribeMultiRegionParameterGroupsRequest,
  DescribeMultiRegionParameterGroupsResponse,
  DescribeMultiRegionParameterGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<DescribeMultiRegionParameterGroupsRequest>,
  output: __S(722, __c45, 2) as any as S.Schema<DescribeMultiRegionParameterGroupsResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiRegionParameterGroups",
}));

export type DescribeMultiRegionParametersError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns the detailed parameter list for a particular multi-region parameter group.
 */
export const describeMultiRegionParameters: API.OperationMethod<
  DescribeMultiRegionParametersRequest,
  DescribeMultiRegionParametersResponse,
  DescribeMultiRegionParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<DescribeMultiRegionParametersRequest>,
  output: __S(739, __c46, 3) as any as S.Schema<DescribeMultiRegionParametersResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiRegionParameters",
}));

export type DescribeParameterGroupsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns a list of parameter group descriptions. If a parameter group name is specified, the list contains only the descriptions for that group.
 */
export const describeParameterGroups: API.PaginatedOperationMethod<
  DescribeParameterGroupsRequest,
  DescribeParameterGroupsResponse,
  DescribeParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  ParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<DescribeParameterGroupsRequest>,
  output: __S(754, __c47, 2) as any as S.Schema<DescribeParameterGroupsResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeParameterGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ParameterGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeParametersError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns the detailed parameter list for a particular parameter group.
 */
export const describeParameters: API.PaginatedOperationMethod<
  DescribeParametersRequest,
  DescribeParametersResponse,
  DescribeParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<DescribeParametersRequest>,
  output: __S(771, __c48, 3) as any as S.Schema<DescribeParametersResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeParameters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Parameters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeReservedNodesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedNodeNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Returns information about reserved nodes for this account, or about a specified reserved node.
 */
export const describeReservedNodes: API.PaginatedOperationMethod<
  DescribeReservedNodesRequest,
  DescribeReservedNodesResponse,
  DescribeReservedNodesError,
  Credentials | HttpClient.HttpClient,
  ReservedNode
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<DescribeReservedNodesRequest>,
  output: __S(786, __c49, 2) as any as S.Schema<DescribeReservedNodesResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedNodeNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReservedNodes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeReservedNodesOfferingsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedNodesOfferingNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Lists available reserved node offerings.
 */
export const describeReservedNodesOfferings: API.PaginatedOperationMethod<
  DescribeReservedNodesOfferingsRequest,
  DescribeReservedNodesOfferingsResponse,
  DescribeReservedNodesOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedNodesOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<DescribeReservedNodesOfferingsRequest>,
  output: __S(835, __c52, 3) as any as S.Schema<DescribeReservedNodesOfferingsResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedNodesOfferingNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodesOfferings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReservedNodesOfferings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeServiceUpdatesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns details of the service updates.
 */
export const describeServiceUpdates: API.PaginatedOperationMethod<
  DescribeServiceUpdatesRequest,
  DescribeServiceUpdatesResponse,
  DescribeServiceUpdatesError,
  Credentials | HttpClient.HttpClient,
  ServiceUpdate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<DescribeServiceUpdatesRequest>,
  output: __S(851, __c53, 3) as any as S.Schema<DescribeServiceUpdatesResponse>,
  errors: [InvalidParameterCombinationException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceUpdates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceUpdates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSnapshotsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | SnapshotNotFoundFault
  | CommonErrors;
/**
 * Returns information about cluster snapshots. By default, DescribeSnapshots lists all of your snapshots; it can optionally describe a single snapshot,
 * or just the snapshots associated with a particular cluster.
 */
export const describeSnapshots: API.PaginatedOperationMethod<
  DescribeSnapshotsRequest,
  DescribeSnapshotsResponse,
  DescribeSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<DescribeSnapshotsRequest>,
  output: __S(866, __c54, 2) as any as S.Schema<DescribeSnapshotsResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Snapshots",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSubnetGroupsError =
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a list of subnet group descriptions. If a subnet group name is specified, the list contains only the description of that group.
 */
export const describeSubnetGroups: API.PaginatedOperationMethod<
  DescribeSubnetGroupsRequest,
  DescribeSubnetGroupsResponse,
  DescribeSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  SubnetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<DescribeSubnetGroupsRequest>,
  output: __S(882, __c55, 2) as any as S.Schema<DescribeSubnetGroupsResponse>,
  errors: [ServiceLinkedRoleNotFoundFault, SubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubnetGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SubnetGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeUsersError =
  | InvalidParameterCombinationException
  | UserNotFoundFault
  | CommonErrors;
/**
 * Returns a list of users.
 */
export const describeUsers: API.PaginatedOperationMethod<
  DescribeUsersRequest,
  DescribeUsersResponse,
  DescribeUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(898, __c56, 2) as any as S.Schema<DescribeUsersRequest>,
  output: __S(900, __c56, 4) as any as S.Schema<DescribeUsersResponse>,
  errors: [InvalidParameterCombinationException, UserNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type FailoverShardError =
  | APICallRateForCustomerExceededFault
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidKMSKeyFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ShardNotFoundFault
  | TestFailoverNotAvailableFault
  | CommonErrors;
/**
 * Used to failover a shard. This API is designed for testing the behavior of your application in case of MemoryDB failover. It is not designed to be used as a production-level tool for initiating
 * a failover to overcome a problem you may have with the cluster. Moreover, in certain conditions such as large scale operational events, Amazon may block this API.
 */
export const failoverShard: API.OperationMethod<
  FailoverShardRequest,
  FailoverShardResponse,
  FailoverShardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<FailoverShardRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<FailoverShardResponse>,
  errors: [
    APICallRateForCustomerExceededFault,
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidKMSKeyFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ShardNotFoundFault,
    TestFailoverNotAvailableFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverShard",
}));

export type ListAllowedMultiRegionClusterUpdatesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | CommonErrors;
/**
 * Lists the allowed updates for a multi-Region cluster.
 */
export const listAllowedMultiRegionClusterUpdates: API.OperationMethod<
  ListAllowedMultiRegionClusterUpdatesRequest,
  ListAllowedMultiRegionClusterUpdatesResponse,
  ListAllowedMultiRegionClusterUpdatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<ListAllowedMultiRegionClusterUpdatesRequest>,
  output: __S(944, __c59, 0) as any as S.Schema<ListAllowedMultiRegionClusterUpdatesResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAllowedMultiRegionClusterUpdates",
}));

export type ListAllowedNodeTypeUpdatesError =
  | ClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Lists all available node types that you can scale to from your cluster's current node type.
 *
 * When you use the UpdateCluster operation to scale your cluster, the value of the NodeType parameter must be one of the node types returned by this operation.
 */
export const listAllowedNodeTypeUpdates: API.OperationMethod<
  ListAllowedNodeTypeUpdatesRequest,
  ListAllowedNodeTypeUpdatesResponse,
  ListAllowedNodeTypeUpdatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<ListAllowedNodeTypeUpdatesRequest>,
  output: __S(944, __c59, 0) as any as S.Schema<ListAllowedNodeTypeUpdatesResponse>,
  errors: [
    ClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAllowedNodeTypeUpdates",
}));

export type ListTagsError =
  | ACLNotFoundFault
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | MultiRegionClusterNotFoundFault
  | MultiRegionParameterGroupNotFoundFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotNotFoundFault
  | SubnetGroupNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Lists all tags currently on a named resource. A tag is a key-value pair where the key and value are case-sensitive. You can use tags to categorize and track your MemoryDB resources. For more information, see Tagging your MemoryDB resources.
 *
 * When you add or remove tags from multi region clusters, you might not immediately see the latest effective tags in the ListTags API response due to it being eventually consistent specifically for multi region clusters. For more information, see Tagging your MemoryDB resources.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<ListTagsRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<ListTagsResponse>,
  errors: [
    ACLNotFoundFault,
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    MultiRegionClusterNotFoundFault,
    MultiRegionParameterGroupNotFoundFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
    SubnetGroupNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

export type PurchaseReservedNodesOfferingError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeQuotaExceededFault
  | ReservedNodesOfferingNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Allows you to purchase a reserved node offering. Reserved nodes are not eligible for cancellation and are non-refundable.
 */
export const purchaseReservedNodesOffering: API.OperationMethod<
  PurchaseReservedNodesOfferingRequest,
  PurchaseReservedNodesOfferingResponse,
  PurchaseReservedNodesOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<PurchaseReservedNodesOfferingRequest>,
  output: __S(1009, __c63, 1) as any as S.Schema<PurchaseReservedNodesOfferingResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeQuotaExceededFault,
    ReservedNodesOfferingNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseReservedNodesOffering",
}));

export type ResetParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Modifies the parameters of a parameter group to the engine or system default value. You can reset specific parameters by submitting a list of parameter names. To reset the entire parameter group, specify the AllParameters and ParameterGroupName parameters.
 */
export const resetParameterGroup: API.OperationMethod<
  ResetParameterGroupRequest,
  ResetParameterGroupResponse,
  ResetParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<ResetParameterGroupRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<ResetParameterGroupResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetParameterGroup",
}));

export type TagResourceError =
  | ACLNotFoundFault
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | MultiRegionParameterGroupNotFoundFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotNotFoundFault
  | SubnetGroupNotFoundFault
  | TagQuotaPerResourceExceeded
  | UserNotFoundFault
  | CommonErrors;
/**
 * Use this operation to add tags to a resource. A tag is a key-value pair where the key and value are case-sensitive. You can use tags to categorize and track all your MemoryDB resources. For more information, see Tagging your MemoryDB resources.
 *
 * When you add tags to multi region clusters, you might not immediately see the latest effective tags in the ListTags API response due to it being eventually consistent specifically for multi region clusters. For more information, see Tagging your MemoryDB resources.
 *
 * You can specify cost-allocation tags for your MemoryDB resources, Amazon generates a cost allocation report as a comma-separated value
 * (CSV) file with your usage and costs aggregated by your tags. You can apply tags that represent business categories
 * (such as cost centers, application names, or owners) to organize your costs across multiple services.
 *
 * For more information, see Using Cost Allocation Tags.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    ACLNotFoundFault,
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
    MultiRegionParameterGroupNotFoundFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
    SubnetGroupNotFoundFault,
    TagQuotaPerResourceExceeded,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ACLNotFoundFault
  | ClusterNotFoundFault
  | InvalidARNFault
  | InvalidClusterStateFault
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | MultiRegionParameterGroupNotFoundFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | SnapshotNotFoundFault
  | SubnetGroupNotFoundFault
  | TagNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Use this operation to remove tags on a resource. A tag is a key-value pair where the key and value are case-sensitive. You can use tags to categorize and track all your MemoryDB resources. For more information, see Tagging your MemoryDB resources.
 *
 * When you remove tags from multi region clusters, you might not immediately see the latest effective tags in the ListTags API response due to it being eventually consistent specifically for multi region clusters. For more information, see Tagging your MemoryDB resources.
 *
 * You can specify cost-allocation tags for your MemoryDB resources, Amazon generates a cost allocation report as a comma-separated value
 * (CSV) file with your usage and costs aggregated by your tags. You can apply tags that represent business categories
 * (such as cost centers, application names, or owners) to organize your costs across multiple services.
 *
 * For more information, see Using Cost Allocation Tags.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    ACLNotFoundFault,
    ClusterNotFoundFault,
    InvalidARNFault,
    InvalidClusterStateFault,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
    MultiRegionParameterGroupNotFoundFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    SnapshotNotFoundFault,
    SubnetGroupNotFoundFault,
    TagNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateACLError =
  | ACLNotFoundFault
  | DefaultUserRequired
  | DuplicateUserNameFault
  | InvalidACLStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | UserNotFoundFault
  | CommonErrors;
/**
 * Changes the list of users that belong to the Access Control List.
 */
export const updateACL: API.OperationMethod<
  UpdateACLRequest,
  UpdateACLResponse,
  UpdateACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<UpdateACLRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<UpdateACLResponse>,
  errors: [
    ACLNotFoundFault,
    DefaultUserRequired,
    DuplicateUserNameFault,
    InvalidACLStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateACL",
}));

export type UpdateClusterError =
  | ACLNotFoundFault
  | ClusterNotFoundFault
  | ClusterQuotaForCustomerExceededFault
  | InvalidACLStateFault
  | InvalidClusterStateFault
  | InvalidKMSKeyFault
  | InvalidNodeStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | NoOperationFault
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | ShardsPerClusterQuotaExceededFault
  | CommonErrors;
/**
 * Modifies the settings for a cluster. You can use this operation to change one or more cluster configuration settings by specifying the settings and the new values.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterRequest,
  UpdateClusterResponse,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1089, __c68, 1) as any as S.Schema<UpdateClusterRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<UpdateClusterResponse>,
  errors: [
    ACLNotFoundFault,
    ClusterNotFoundFault,
    ClusterQuotaForCustomerExceededFault,
    InvalidACLStateFault,
    InvalidClusterStateFault,
    InvalidKMSKeyFault,
    InvalidNodeStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    NoOperationFault,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    ShardsPerClusterQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
}));

export type UpdateMultiRegionClusterError =
  | InvalidMultiRegionClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MultiRegionClusterNotFoundFault
  | MultiRegionParameterGroupNotFoundFault
  | CommonErrors;
/**
 * Updates the configuration of an existing multi-Region cluster.
 */
export const updateMultiRegionCluster: API.OperationMethod<
  UpdateMultiRegionClusterRequest,
  UpdateMultiRegionClusterResponse,
  UpdateMultiRegionClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<UpdateMultiRegionClusterRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<UpdateMultiRegionClusterResponse>,
  errors: [
    InvalidMultiRegionClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MultiRegionClusterNotFoundFault,
    MultiRegionParameterGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMultiRegionCluster",
}));

export type UpdateParameterGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterGroupStateFault
  | InvalidParameterValueException
  | ParameterGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Updates the parameters of a parameter group. You can modify up to 20 parameters in a single request by submitting a list parameter name and value pairs.
 */
export const updateParameterGroup: API.OperationMethod<
  UpdateParameterGroupRequest,
  UpdateParameterGroupResponse,
  UpdateParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1138, __c71, 2) as any as S.Schema<UpdateParameterGroupRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<UpdateParameterGroupResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterGroupStateFault,
    InvalidParameterValueException,
    ParameterGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateParameterGroup",
}));

export type UpdateSubnetGroupError =
  | InvalidSubnet
  | ServiceLinkedRoleNotFoundFault
  | SubnetGroupNotFoundFault
  | SubnetInUse
  | SubnetNotAllowedFault
  | SubnetQuotaExceededFault
  | CommonErrors;
/**
 * Updates a subnet group. For more information, see Updating a subnet group
 */
export const updateSubnetGroup: API.OperationMethod<
  UpdateSubnetGroupRequest,
  UpdateSubnetGroupResponse,
  UpdateSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<UpdateSubnetGroupRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<UpdateSubnetGroupResponse>,
  errors: [
    InvalidSubnet,
    ServiceLinkedRoleNotFoundFault,
    SubnetGroupNotFoundFault,
    SubnetInUse,
    SubnetNotAllowedFault,
    SubnetQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubnetGroup",
}));

export type UpdateUserError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidUserStateFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Changes user password(s) and/or access string.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<UpdateUserRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<UpdateUserResponse>,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidUserStateFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetGroupName: S.String,
          Description: S.optional(S.String),
          SubnetIds: S.optional(__S(400, __c25, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSubnetGroupRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserName: S.String,
          AuthenticationMode: S.optional(__S(480, __c30, 0)),
          AccessString: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateUserRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ServiceUpdateNameToApply: S.optional(S.String) })).annotate(
        { identifier: "ServiceUpdateRequest" },
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterNames: __S(64, __c4, 0),
          ServiceUpdate: S.optional(__S(32, __c2, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchUpdateClusterRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.optional(S.String),
          ErrorType: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedCluster" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(34, __c2, 2)
          .pipe(/*@__PURE__*/ T.XmlName("UnprocessedCluster"))
          .annotate({ identifier: "UnprocessedCluster" }),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          ProcessedClusters: S.optional(__S(96, __c6, 0)),
          UnprocessedClusters: S.optional(__S(35, __c2, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "BatchUpdateClusterResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Address: S.optional(S.String), Port: S.optional(S.Number) }),
      ).annotate({ identifier: "Endpoint" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ProgressPercentage: S.optional(S.Number) })).annotate({
        identifier: "SlotMigration",
      });
    case 1:
      return S.suspend(() => S.Struct({ SlotMigration: S.optional(__S(80, __c5, 0)) })).annotate({
        identifier: "ReshardingStatus",
      });
    case 2:
      return S.suspend(() => S.Struct({ ACLToApply: S.optional(S.String) })).annotate({
        identifier: "ACLsUpdateStatus",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ ServiceUpdateName: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "PendingModifiedServiceUpdate" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(83, __c5, 3)
          .pipe(/*@__PURE__*/ T.XmlName("PendingModifiedServiceUpdate"))
          .annotate({ identifier: "PendingModifiedServiceUpdate" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          Resharding: S.optional(__S(81, __c5, 1)),
          ACLs: S.optional(__S(82, __c5, 2)),
          ServiceUpdates: S.optional(__S(84, __c5, 4)),
        }),
      ).annotate({ identifier: "ClusterPendingUpdates" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Endpoint: S.optional(Endpoint),
        }),
      ).annotate({ identifier: "Node" });
    case 7:
      return S.Array(
        /*@__PURE__*/ __S(86, __c5, 6)
          .pipe(/*@__PURE__*/ T.XmlName("Node"))
          .annotate({ identifier: "Node" }),
      );
    case 8:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          Slots: S.optional(S.String),
          Nodes: S.optional(__S(87, __c5, 7)),
          NumberOfNodes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Shard" });
    case 9:
      return S.Array(
        /*@__PURE__*/ __S(88, __c5, 8)
          .pipe(/*@__PURE__*/ T.XmlName("Shard"))
          .annotate({ identifier: "Shard" }),
      );
    case 10:
      return S.suspend(() =>
        S.Struct({ SecurityGroupId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "SecurityGroupMembership" });
    case 11:
      return S.Array(__S(90, __c5, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          PendingUpdates: S.optional(__S(85, __c5, 5)),
          MultiRegionClusterName: S.optional(S.String),
          NumberOfShards: S.optional(S.Number),
          Shards: S.optional(__S(89, __c5, 9)),
          AvailabilityMode: S.optional(S.String),
          ClusterEndpoint: S.optional(Endpoint),
          NodeType: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          EnginePatchVersion: S.optional(S.String),
          ParameterGroupName: S.optional(S.String),
          ParameterGroupStatus: S.optional(S.String),
          SecurityGroups: S.optional(__S(91, __c5, 11)),
          SubnetGroupName: S.optional(S.String),
          TLSEnabled: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          ARN: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SnsTopicStatus: S.optional(S.String),
          SnapshotRetentionLimit: S.optional(S.Number),
          MaintenanceWindow: S.optional(S.String),
          SnapshotWindow: S.optional(S.String),
          ACLName: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          DataTiering: S.optional(S.String),
          NetworkType: S.optional(S.String),
          IpDiscovery: S.optional(S.String),
        }),
      ).annotate({ identifier: "Cluster" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ __S(92, __c5, 12)
          .pipe(/*@__PURE__*/ T.XmlName("Cluster"))
          .annotate({ identifier: "Cluster" }),
      );
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceSnapshotName: S.String,
          TargetSnapshotName: S.String,
          TargetBucket: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(129, __c8, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopySnapshotRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(128, __c8, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "Tag" }),
      );
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Snapshot: S.optional(__S(164, __c10, 4)) }).pipe(ns),
      ).annotate({ identifier: "CopySnapshotResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Slots: S.optional(S.String), ReplicaCount: S.optional(S.Number) }),
      ).annotate({ identifier: "ShardConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Configuration: S.optional(__S(160, __c10, 0)),
          Size: S.optional(S.String),
          SnapshotCreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ShardDetail" });
    case 2:
      return S.Array(__S(161, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          NodeType: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          MaintenanceWindow: S.optional(S.String),
          TopicArn: S.optional(S.String),
          Port: S.optional(S.Number),
          ParameterGroupName: S.optional(S.String),
          SubnetGroupName: S.optional(S.String),
          VpcId: S.optional(S.String),
          SnapshotRetentionLimit: S.optional(S.Number),
          SnapshotWindow: S.optional(S.String),
          NumShards: S.optional(S.Number),
          Shards: S.optional(__S(162, __c10, 2)),
          MultiRegionParameterGroupName: S.optional(S.String),
          MultiRegionClusterName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClusterConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          Source: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          ARN: S.optional(S.String),
          ClusterConfiguration: S.optional(__S(163, __c10, 3)),
          DataTiering: S.optional(S.String),
        }),
      ).annotate({ identifier: "Snapshot" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ACLName: S.String,
          UserNames: S.optional(__S(64, __c4, 0)),
          Tags: S.optional(__S(129, __c8, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateACLRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserNamesToRemove: S.optional(__S(64, __c4, 0)),
          UserNamesToAdd: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "ACLPendingChanges" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          UserNames: S.optional(__S(64, __c4, 0)),
          MinimumEngineVersion: S.optional(S.String),
          PendingChanges: S.optional(__S(192, __c12, 0)),
          Clusters: S.optional(__S(64, __c4, 0)),
          ARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "ACL" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ACL: S.optional(__S(193, __c12, 1)) }).pipe(ns)).annotate({
        identifier: "CreateACLResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SnapshotArn")));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.String,
          NodeType: S.String,
          MultiRegionClusterName: S.optional(S.String),
          ParameterGroupName: S.optional(S.String),
          Description: S.optional(S.String),
          NumShards: S.optional(S.Number),
          NumReplicasPerShard: S.optional(S.Number),
          SubnetGroupName: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(256, __c16, 0)),
          MaintenanceWindow: S.optional(S.String),
          Port: S.optional(S.Number),
          SnsTopicArn: S.optional(S.String),
          TLSEnabled: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          SnapshotArns: S.optional(__S(224, __c14, 0)),
          SnapshotName: S.optional(S.String),
          SnapshotRetentionLimit: S.optional(S.Number),
          Tags: S.optional(__S(129, __c8, 1)),
          SnapshotWindow: S.optional(S.String),
          ACLName: S.String,
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          DataTiering: S.optional(S.Boolean),
          NetworkType: S.optional(S.String),
          IpDiscovery: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(92, __c5, 12)) }).pipe(ns),
      ).annotate({ identifier: "CreateClusterResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SecurityGroupId")));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MultiRegionClusterNameSuffix: S.String,
          Description: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          NodeType: S.String,
          MultiRegionParameterGroupName: S.optional(S.String),
          NumShards: S.optional(S.Number),
          TLSEnabled: S.optional(S.Boolean),
          Tags: S.optional(__S(129, __c8, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMultiRegionClusterRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.optional(S.String),
          Region: S.optional(S.String),
          Status: S.optional(S.String),
          ARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegionalCluster" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(288, __c18, 0)
          .pipe(/*@__PURE__*/ T.XmlName("RegionalCluster"))
          .annotate({ identifier: "RegionalCluster" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          MultiRegionClusterName: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          NodeType: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          NumberOfShards: S.optional(S.Number),
          Clusters: S.optional(__S(289, __c18, 1)),
          MultiRegionParameterGroupName: S.optional(S.String),
          TLSEnabled: S.optional(S.Boolean),
          ARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "MultiRegionCluster" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MultiRegionCluster: S.optional(__S(290, __c18, 2)) }).pipe(ns),
      ).annotate({ identifier: "CreateMultiRegionClusterResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.String,
          Family: S.String,
          Description: S.optional(S.String),
          Tags: S.optional(__S(129, __c8, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateParameterGroupRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Family: S.optional(S.String),
          Description: S.optional(S.String),
          ARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "ParameterGroup" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterGroup: S.optional(__S(336, __c21, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateParameterGroupResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.String,
          SnapshotName: S.String,
          KmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(129, __c8, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetGroupName: S.String,
          Description: S.optional(S.String),
          SubnetIds: __S(400, __c25, 0),
          Tags: S.optional(__S(129, __c8, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSubnetGroupRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("SubnetIdentifier")));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubnetGroup: S.optional(__S(451, __c28, 3)) }).pipe(ns),
      ).annotate({ identifier: "CreateSubnetGroupResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "AvailabilityZone",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(S.String),
          AvailabilityZone: S.optional(__S(448, __c28, 0)),
          SupportedNetworkTypes: S.optional(__S(432, __c27, 0)),
        }),
      ).annotate({ identifier: "Subnet" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(449, __c28, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Subnet"))
          .annotate({ identifier: "Subnet" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          VpcId: S.optional(S.String),
          Subnets: S.optional(__S(450, __c28, 2)),
          ARN: S.optional(S.String),
          SupportedNetworkTypes: S.optional(__S(432, __c27, 0)),
        }),
      ).annotate({ identifier: "SubnetGroup" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserName: S.String,
          AuthenticationMode: __S(480, __c30, 0),
          AccessString: S.String,
          Tags: S.optional(__S(129, __c8, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Passwords: S.optional(S.Array(SensitiveString)) }),
      ).annotate({ identifier: "AuthenticationMode" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ User: S.optional(__S(513, __c32, 1)) }).pipe(ns)).annotate({
        identifier: "CreateUserResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), PasswordCount: S.optional(S.Number) }),
      ).annotate({ identifier: "Authentication" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          AccessString: S.optional(S.String),
          ACLNames: S.optional(__S(64, __c4, 0)),
          MinimumEngineVersion: S.optional(S.String),
          Authentication: S.optional(__S(512, __c32, 0)),
          ARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "User" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ACLName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteACLRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.String,
          MultiRegionClusterName: S.optional(S.String),
          FinalSnapshotName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteClusterRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MultiRegionClusterName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMultiRegionClusterRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterGroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteParameterGroupRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SnapshotName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSnapshotRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubnetGroupName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSubnetGroupRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUserRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ACLName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeACLsRequest" });
    case 1:
      return S.Array(__S(193, __c12, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ ACLs: S.optional(__S(641, __c40, 1)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeACLsResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ShowShardDetails: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClustersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Clusters: S.optional(__S(96, __c6, 0)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeClustersResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          ParameterGroupFamily: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          DefaultOnly: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEngineVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          EnginePatchVersion: S.optional(S.String),
          ParameterGroupFamily: S.optional(S.String),
        }),
      ).annotate({ identifier: "EngineVersionInfo" });
    case 2:
      return S.Array(__S(673, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          EngineVersions: S.optional(__S(674, __c42, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeEngineVersionsResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceName: S.optional(S.String),
          SourceType: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Duration: S.optional(S.Number),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceName: S.optional(S.String),
          SourceType: S.optional(S.String),
          Message: S.optional(S.String),
          Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Event" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(689, __c43, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Event"))
          .annotate({ identifier: "Event" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Events: S.optional(__S(690, __c43, 2)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeEventsResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MultiRegionClusterName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ShowClusterDetails: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMultiRegionClustersRequest" });
    case 1:
      return S.Array(__S(290, __c18, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MultiRegionClusters: S.optional(__S(705, __c44, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMultiRegionClustersResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MultiRegionParameterGroupName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMultiRegionParameterGroupsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(336, __c21, 0)
          .pipe(/*@__PURE__*/ T.XmlName("MultiRegionParameterGroup"))
          .annotate({ identifier: "MultiRegionParameterGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MultiRegionParameterGroups: S.optional(__S(721, __c45, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMultiRegionParameterGroupsResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MultiRegionParameterGroupName: S.String,
          Source: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMultiRegionParametersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Value: S.optional(S.String),
          Description: S.optional(S.String),
          Source: S.optional(S.String),
          DataType: S.optional(S.String),
          AllowedValues: S.optional(S.String),
          MinimumEngineVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "MultiRegionParameter" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(737, __c46, 1)
          .pipe(/*@__PURE__*/ T.XmlName("MultiRegionParameter"))
          .annotate({ identifier: "MultiRegionParameter" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MultiRegionParameters: S.optional(__S(738, __c46, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMultiRegionParametersResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeParameterGroupsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(336, __c21, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ParameterGroup"))
          .annotate({ identifier: "ParameterGroup" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ParameterGroups: S.optional(__S(753, __c47, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeParameterGroupsResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeParametersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Value: S.optional(S.String),
          Description: S.optional(S.String),
          DataType: S.optional(S.String),
          AllowedValues: S.optional(S.String),
          MinimumEngineVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Parameter" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(769, __c48, 1)
          .pipe(/*@__PURE__*/ T.XmlName("Parameter"))
          .annotate({ identifier: "Parameter" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Parameters: S.optional(__S(770, __c48, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeParametersResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservationId: S.optional(S.String),
          ReservedNodesOfferingId: S.optional(S.String),
          NodeType: S.optional(S.String),
          Duration: S.optional(S.String),
          OfferingType: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeReservedNodesRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(816, __c51, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ReservedNode"))
          .annotate({ identifier: "ReservedNode" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ReservedNodes: S.optional(__S(785, __c49, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeReservedNodesResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecurringChargeAmount: S.optional(S.Number),
          RecurringChargeFrequency: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecurringCharge" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(800, __c50, 0)
          .pipe(/*@__PURE__*/ T.XmlName("RecurringCharge"))
          .annotate({ identifier: "RecurringCharge" }),
      );
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservationId: S.optional(S.String),
          ReservedNodesOfferingId: S.optional(S.String),
          NodeType: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Duration: S.optional(S.Number),
          FixedPrice: S.optional(S.Number),
          NodeCount: S.optional(S.Number),
          OfferingType: S.optional(S.String),
          State: S.optional(S.String),
          RecurringCharges: S.optional(__S(801, __c50, 1)),
          ARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReservedNode" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedNodesOfferingId: S.optional(S.String),
          NodeType: S.optional(S.String),
          Duration: S.optional(S.String),
          OfferingType: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeReservedNodesOfferingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReservedNodesOfferingId: S.optional(S.String),
          NodeType: S.optional(S.String),
          Duration: S.optional(S.Number),
          FixedPrice: S.optional(S.Number),
          OfferingType: S.optional(S.String),
          RecurringCharges: S.optional(__S(801, __c50, 1)),
        }),
      ).annotate({ identifier: "ReservedNodesOffering" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(833, __c52, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ReservedNodesOffering"))
          .annotate({ identifier: "ReservedNodesOffering" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ReservedNodesOfferings: S.optional(__S(834, __c52, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeReservedNodesOfferingsResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceUpdateName: S.optional(S.String),
          ClusterNames: S.optional(__S(64, __c4, 0)),
          Status: S.optional(__S(432, __c27, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeServiceUpdatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.optional(S.String),
          ServiceUpdateName: S.optional(S.String),
          ReleaseDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          Type: S.optional(S.String),
          Engine: S.optional(S.String),
          NodesUpdated: S.optional(S.String),
          AutoUpdateStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ServiceUpdate" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(849, __c53, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ServiceUpdate"))
          .annotate({ identifier: "ServiceUpdate" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ServiceUpdates: S.optional(__S(850, __c53, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeServiceUpdatesResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.optional(S.String),
          SnapshotName: S.optional(S.String),
          Source: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          ShowDetail: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSnapshotsRequest" });
    case 1:
      return S.Array(__S(164, __c10, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Snapshots: S.optional(__S(865, __c54, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSnapshotsResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetGroupName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSubnetGroupsRequest" });
    case 1:
      return S.Array(__S(451, __c28, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          SubnetGroups: S.optional(__S(881, __c55, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSubnetGroupsResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Values: __S(64, __c4, 0) })).annotate({
        identifier: "Filter",
      });
    case 1:
      return S.Array(__S(896, __c56, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          UserName: S.optional(S.String),
          Filters: S.optional(__S(897, __c56, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeUsersRequest" });
    case 3:
      return S.Array(__S(513, __c32, 1));
    case 4:
      return S.suspend(() =>
        S.Struct({ Users: S.optional(__S(899, __c56, 3)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeUsersResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterName: S.String, ShardName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "FailoverShardRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MultiRegionClusterName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAllowedMultiRegionClusterUpdatesRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScaleUpNodeTypes: S.optional(__S(64, __c4, 0)),
          ScaleDownNodeTypes: S.optional(__S(64, __c4, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "ListAllowedMultiRegionClusterUpdatesResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAllowedNodeTypeUpdatesRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TagList: S.optional(__S(129, __c8, 1)) }).pipe(ns),
      ).annotate({ identifier: "ListTagsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedNodesOfferingId: S.String,
          ReservationId: S.optional(S.String),
          NodeCount: S.optional(S.Number),
          Tags: S.optional(__S(129, __c8, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PurchaseReservedNodesOfferingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReservedNode: S.optional(__S(816, __c51, 0)) }).pipe(ns),
      ).annotate({ identifier: "PurchaseReservedNodesOfferingResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParameterGroupName: S.String,
          AllParameters: S.optional(S.Boolean),
          ParameterNames: S.optional(__S(64, __c4, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ResetParameterGroupRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(129, __c8, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(64, __c4, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ACLName: S.String,
          UserNamesToAdd: S.optional(__S(64, __c4, 0)),
          UserNamesToRemove: S.optional(__S(64, __c4, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateACLRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ReplicaCount: S.optional(S.Number) })).annotate({
        identifier: "ReplicaConfigurationRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterName: S.String,
          Description: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(256, __c16, 0)),
          MaintenanceWindow: S.optional(S.String),
          SnsTopicArn: S.optional(S.String),
          SnsTopicStatus: S.optional(S.String),
          ParameterGroupName: S.optional(S.String),
          SnapshotWindow: S.optional(S.String),
          SnapshotRetentionLimit: S.optional(S.Number),
          NodeType: S.optional(S.String),
          Engine: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          ReplicaConfiguration: S.optional(__S(1088, __c68, 0)),
          ShardConfiguration: S.optional(__S(1104, __c69, 0)),
          ACLName: S.optional(S.String),
          IpDiscovery: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateClusterRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ShardCount: S.optional(S.Number) })).annotate({
        identifier: "ShardConfigurationRequest",
      });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MultiRegionClusterName: S.String,
          NodeType: S.optional(S.String),
          Description: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          ShardConfiguration: S.optional(__S(1104, __c69, 0)),
          MultiRegionParameterGroupName: S.optional(S.String),
          UpdateStrategy: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateMultiRegionClusterRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterName: S.optional(S.String), ParameterValue: S.optional(S.String) }),
      ).annotate({ identifier: "ParameterNameValue" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1136, __c71, 0)
          .pipe(/*@__PURE__*/ T.XmlName("ParameterNameValue"))
          .annotate({ identifier: "ParameterNameValue" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ ParameterGroupName: S.String, ParameterNameValues: __S(1137, __c71, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateParameterGroupRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
