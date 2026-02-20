import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Route53 Recovery Readiness",
  serviceShapeName: "Route53RecoveryReadiness",
});
const auth = T.AwsAuthSigv4({ name: "route53-recovery-readiness" });
const ver = T.ServiceVersion("2019-12-02");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
              `https://route53-recovery-readiness-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://route53-recovery-readiness-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://route53-recovery-readiness.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://route53-recovery-readiness.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type __stringMax256 = string;
export type __stringMax64PatternAAZAZ09Z = string;
export type CrossAccountAuthorization = string;
export type __stringPatternAWSAZaZ09AZaZ09 = string;
export type MaxResults = number;
export type LastAuditTimestamp = Date;
export type ReadinessCheckTimestamp = Date;
export type __stringMax64 = string;

//# Schemas
export type __listOf__string = string[];
export const __listOf__string = S.Array(S.String);
export type Tags = { [key: string]: string | undefined };
export const Tags = S.Record(S.String, S.String.pipe(S.optional));
export interface CreateCellRequest {
  CellName?: string;
  Cells?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateCellRequest = S.suspend(() =>
  S.Struct({
    CellName: S.optional(S.String),
    Cells: S.optional(__listOf__string),
    Tags: S.optional(Tags),
  })
    .pipe(S.encodeKeys({ CellName: "cellName", Cells: "cells", Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/cells" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateCellRequest",
}) as any as S.Schema<CreateCellRequest>;
export interface CreateCellResponse {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateCellResponse = S.suspend(() =>
  S.Struct({
    CellArn: S.optional(S.String),
    CellName: S.optional(S.String),
    Cells: S.optional(__listOf__string),
    ParentReadinessScopes: S.optional(__listOf__string),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      CellArn: "cellArn",
      CellName: "cellName",
      Cells: "cells",
      ParentReadinessScopes: "parentReadinessScopes",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateCellResponse",
}) as any as S.Schema<CreateCellResponse>;
export interface CreateCrossAccountAuthorizationRequest {
  CrossAccountAuthorization?: string;
}
export const CreateCrossAccountAuthorizationRequest = S.suspend(() =>
  S.Struct({ CrossAccountAuthorization: S.optional(S.String) })
    .pipe(
      S.encodeKeys({ CrossAccountAuthorization: "crossAccountAuthorization" }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/crossaccountauthorizations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateCrossAccountAuthorizationRequest",
}) as any as S.Schema<CreateCrossAccountAuthorizationRequest>;
export interface CreateCrossAccountAuthorizationResponse {
  CrossAccountAuthorization?: string;
}
export const CreateCrossAccountAuthorizationResponse = S.suspend(() =>
  S.Struct({ CrossAccountAuthorization: S.optional(S.String) }).pipe(
    S.encodeKeys({ CrossAccountAuthorization: "crossAccountAuthorization" }),
  ),
).annotate({
  identifier: "CreateCrossAccountAuthorizationResponse",
}) as any as S.Schema<CreateCrossAccountAuthorizationResponse>;
export interface CreateReadinessCheckRequest {
  ReadinessCheckName?: string;
  ResourceSetName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateReadinessCheckRequest = S.suspend(() =>
  S.Struct({
    ReadinessCheckName: S.optional(S.String),
    ResourceSetName: S.optional(S.String),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        ReadinessCheckName: "readinessCheckName",
        ResourceSetName: "resourceSetName",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/readinesschecks" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateReadinessCheckRequest",
}) as any as S.Schema<CreateReadinessCheckRequest>;
export interface CreateReadinessCheckResponse {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateReadinessCheckResponse = S.suspend(() =>
  S.Struct({
    ReadinessCheckArn: S.optional(S.String),
    ReadinessCheckName: S.optional(S.String),
    ResourceSet: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ReadinessCheckArn: "readinessCheckArn",
      ReadinessCheckName: "readinessCheckName",
      ResourceSet: "resourceSet",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateReadinessCheckResponse",
}) as any as S.Schema<CreateReadinessCheckResponse>;
export interface CreateRecoveryGroupRequest {
  Cells?: string[];
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateRecoveryGroupRequest = S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupName: S.optional(S.String),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        Cells: "cells",
        RecoveryGroupName: "recoveryGroupName",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/recoverygroups" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRecoveryGroupRequest",
}) as any as S.Schema<CreateRecoveryGroupRequest>;
export interface CreateRecoveryGroupResponse {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateRecoveryGroupResponse = S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupArn: S.optional(S.String),
    RecoveryGroupName: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Cells: "cells",
      RecoveryGroupArn: "recoveryGroupArn",
      RecoveryGroupName: "recoveryGroupName",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateRecoveryGroupResponse",
}) as any as S.Schema<CreateRecoveryGroupResponse>;
export interface NLBResource {
  Arn?: string;
}
export const NLBResource = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }).pipe(S.encodeKeys({ Arn: "arn" })),
).annotate({ identifier: "NLBResource" }) as any as S.Schema<NLBResource>;
export interface R53ResourceRecord {
  DomainName?: string;
  RecordSetId?: string;
}
export const R53ResourceRecord = S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    RecordSetId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ DomainName: "domainName", RecordSetId: "recordSetId" }),
  ),
).annotate({
  identifier: "R53ResourceRecord",
}) as any as S.Schema<R53ResourceRecord>;
export interface TargetResource {
  NLBResource?: NLBResource;
  R53Resource?: R53ResourceRecord;
}
export const TargetResource = S.suspend(() =>
  S.Struct({
    NLBResource: S.optional(NLBResource),
    R53Resource: S.optional(R53ResourceRecord),
  }).pipe(
    S.encodeKeys({ NLBResource: "nLBResource", R53Resource: "r53Resource" }),
  ),
).annotate({ identifier: "TargetResource" }) as any as S.Schema<TargetResource>;
export interface DNSTargetResource {
  DomainName?: string;
  HostedZoneArn?: string;
  RecordSetId?: string;
  RecordType?: string;
  TargetResource?: TargetResource;
}
export const DNSTargetResource = S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    HostedZoneArn: S.optional(S.String),
    RecordSetId: S.optional(S.String),
    RecordType: S.optional(S.String),
    TargetResource: S.optional(TargetResource),
  }).pipe(
    S.encodeKeys({
      DomainName: "domainName",
      HostedZoneArn: "hostedZoneArn",
      RecordSetId: "recordSetId",
      RecordType: "recordType",
      TargetResource: "targetResource",
    }),
  ),
).annotate({
  identifier: "DNSTargetResource",
}) as any as S.Schema<DNSTargetResource>;
export interface Resource {
  ComponentId?: string;
  DnsTargetResource?: DNSTargetResource;
  ReadinessScopes?: string[];
  ResourceArn?: string;
}
export const Resource = S.suspend(() =>
  S.Struct({
    ComponentId: S.optional(S.String),
    DnsTargetResource: S.optional(DNSTargetResource),
    ReadinessScopes: S.optional(__listOf__string),
    ResourceArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ComponentId: "componentId",
      DnsTargetResource: "dnsTargetResource",
      ReadinessScopes: "readinessScopes",
      ResourceArn: "resourceArn",
    }),
  ),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type __listOfResource = Resource[];
export const __listOfResource = S.Array(Resource);
export interface CreateResourceSetRequest {
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateResourceSetRequest = S.suspend(() =>
  S.Struct({
    ResourceSetName: S.optional(S.String),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        ResourceSetName: "resourceSetName",
        ResourceSetType: "resourceSetType",
        Resources: "resources",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/resourcesets" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateResourceSetRequest",
}) as any as S.Schema<CreateResourceSetRequest>;
export interface CreateResourceSetResponse {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateResourceSetResponse = S.suspend(() =>
  S.Struct({
    ResourceSetArn: S.optional(S.String),
    ResourceSetName: S.optional(S.String),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ResourceSetArn: "resourceSetArn",
      ResourceSetName: "resourceSetName",
      ResourceSetType: "resourceSetType",
      Resources: "resources",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateResourceSetResponse",
}) as any as S.Schema<CreateResourceSetResponse>;
export interface DeleteCellRequest {
  CellName: string;
}
export const DeleteCellRequest = S.suspend(() =>
  S.Struct({ CellName: S.String.pipe(T.HttpLabel("CellName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/cells/{CellName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCellRequest",
}) as any as S.Schema<DeleteCellRequest>;
export interface DeleteCellResponse {}
export const DeleteCellResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteCellResponse",
}) as any as S.Schema<DeleteCellResponse>;
export interface DeleteCrossAccountAuthorizationRequest {
  CrossAccountAuthorization: string;
}
export const DeleteCrossAccountAuthorizationRequest = S.suspend(() =>
  S.Struct({
    CrossAccountAuthorization: S.String.pipe(
      T.HttpLabel("CrossAccountAuthorization"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/crossaccountauthorizations/{CrossAccountAuthorization}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCrossAccountAuthorizationRequest",
}) as any as S.Schema<DeleteCrossAccountAuthorizationRequest>;
export interface DeleteCrossAccountAuthorizationResponse {}
export const DeleteCrossAccountAuthorizationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCrossAccountAuthorizationResponse",
}) as any as S.Schema<DeleteCrossAccountAuthorizationResponse>;
export interface DeleteReadinessCheckRequest {
  ReadinessCheckName: string;
}
export const DeleteReadinessCheckRequest = S.suspend(() =>
  S.Struct({
    ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/readinesschecks/{ReadinessCheckName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReadinessCheckRequest",
}) as any as S.Schema<DeleteReadinessCheckRequest>;
export interface DeleteReadinessCheckResponse {}
export const DeleteReadinessCheckResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteReadinessCheckResponse",
}) as any as S.Schema<DeleteReadinessCheckResponse>;
export interface DeleteRecoveryGroupRequest {
  RecoveryGroupName: string;
}
export const DeleteRecoveryGroupRequest = S.suspend(() =>
  S.Struct({
    RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/recoverygroups/{RecoveryGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRecoveryGroupRequest",
}) as any as S.Schema<DeleteRecoveryGroupRequest>;
export interface DeleteRecoveryGroupResponse {}
export const DeleteRecoveryGroupResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRecoveryGroupResponse",
}) as any as S.Schema<DeleteRecoveryGroupResponse>;
export interface DeleteResourceSetRequest {
  ResourceSetName: string;
}
export const DeleteResourceSetRequest = S.suspend(() =>
  S.Struct({
    ResourceSetName: S.String.pipe(T.HttpLabel("ResourceSetName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/resourcesets/{ResourceSetName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourceSetRequest",
}) as any as S.Schema<DeleteResourceSetRequest>;
export interface DeleteResourceSetResponse {}
export const DeleteResourceSetResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "DeleteResourceSetResponse" },
) as any as S.Schema<DeleteResourceSetResponse>;
export interface GetArchitectureRecommendationsRequest {
  MaxResults?: number;
  NextToken?: string;
  RecoveryGroupName: string;
}
export const GetArchitectureRecommendationsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/recoverygroups/{RecoveryGroupName}/architectureRecommendations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetArchitectureRecommendationsRequest",
}) as any as S.Schema<GetArchitectureRecommendationsRequest>;
export interface Recommendation {
  RecommendationText?: string;
}
export const Recommendation = S.suspend(() =>
  S.Struct({ RecommendationText: S.optional(S.String) }).pipe(
    S.encodeKeys({ RecommendationText: "recommendationText" }),
  ),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export type __listOfRecommendation = Recommendation[];
export const __listOfRecommendation = S.Array(Recommendation);
export interface GetArchitectureRecommendationsResponse {
  LastAuditTimestamp?: Date;
  NextToken?: string;
  Recommendations?: (Recommendation & { RecommendationText: string })[];
}
export const GetArchitectureRecommendationsResponse = S.suspend(() =>
  S.Struct({
    LastAuditTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NextToken: S.optional(S.String),
    Recommendations: S.optional(__listOfRecommendation),
  }).pipe(
    S.encodeKeys({
      LastAuditTimestamp: "lastAuditTimestamp",
      NextToken: "nextToken",
      Recommendations: "recommendations",
    }),
  ),
).annotate({
  identifier: "GetArchitectureRecommendationsResponse",
}) as any as S.Schema<GetArchitectureRecommendationsResponse>;
export interface GetCellRequest {
  CellName: string;
}
export const GetCellRequest = S.suspend(() =>
  S.Struct({ CellName: S.String.pipe(T.HttpLabel("CellName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cells/{CellName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetCellRequest" }) as any as S.Schema<GetCellRequest>;
export interface GetCellResponse {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const GetCellResponse = S.suspend(() =>
  S.Struct({
    CellArn: S.optional(S.String),
    CellName: S.optional(S.String),
    Cells: S.optional(__listOf__string),
    ParentReadinessScopes: S.optional(__listOf__string),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      CellArn: "cellArn",
      CellName: "cellName",
      Cells: "cells",
      ParentReadinessScopes: "parentReadinessScopes",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetCellResponse",
}) as any as S.Schema<GetCellResponse>;
export interface GetCellReadinessSummaryRequest {
  CellName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetCellReadinessSummaryRequest = S.suspend(() =>
  S.Struct({
    CellName: S.String.pipe(T.HttpLabel("CellName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cellreadiness/{CellName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCellReadinessSummaryRequest",
}) as any as S.Schema<GetCellReadinessSummaryRequest>;
export type Readiness =
  | "READY"
  | "NOT_READY"
  | "UNKNOWN"
  | "NOT_AUTHORIZED"
  | (string & {});
export const Readiness = S.String;
export interface ReadinessCheckSummary {
  Readiness?: Readiness;
  ReadinessCheckName?: string;
}
export const ReadinessCheckSummary = S.suspend(() =>
  S.Struct({
    Readiness: S.optional(Readiness),
    ReadinessCheckName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Readiness: "readiness",
      ReadinessCheckName: "readinessCheckName",
    }),
  ),
).annotate({
  identifier: "ReadinessCheckSummary",
}) as any as S.Schema<ReadinessCheckSummary>;
export type __listOfReadinessCheckSummary = ReadinessCheckSummary[];
export const __listOfReadinessCheckSummary = S.Array(ReadinessCheckSummary);
export interface GetCellReadinessSummaryResponse {
  NextToken?: string;
  Readiness?: Readiness;
  ReadinessChecks?: ReadinessCheckSummary[];
}
export const GetCellReadinessSummaryResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Readiness: S.optional(Readiness),
    ReadinessChecks: S.optional(__listOfReadinessCheckSummary),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      Readiness: "readiness",
      ReadinessChecks: "readinessChecks",
    }),
  ),
).annotate({
  identifier: "GetCellReadinessSummaryResponse",
}) as any as S.Schema<GetCellReadinessSummaryResponse>;
export interface GetReadinessCheckRequest {
  ReadinessCheckName: string;
}
export const GetReadinessCheckRequest = S.suspend(() =>
  S.Struct({
    ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/readinesschecks/{ReadinessCheckName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadinessCheckRequest",
}) as any as S.Schema<GetReadinessCheckRequest>;
export interface GetReadinessCheckResponse {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetReadinessCheckResponse = S.suspend(() =>
  S.Struct({
    ReadinessCheckArn: S.optional(S.String),
    ReadinessCheckName: S.optional(S.String),
    ResourceSet: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ReadinessCheckArn: "readinessCheckArn",
      ReadinessCheckName: "readinessCheckName",
      ResourceSet: "resourceSet",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetReadinessCheckResponse",
}) as any as S.Schema<GetReadinessCheckResponse>;
export interface GetReadinessCheckResourceStatusRequest {
  MaxResults?: number;
  NextToken?: string;
  ReadinessCheckName: string;
  ResourceIdentifier: string;
}
export const GetReadinessCheckResourceStatusRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
    ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/readinesschecks/{ReadinessCheckName}/resource/{ResourceIdentifier}/status",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadinessCheckResourceStatusRequest",
}) as any as S.Schema<GetReadinessCheckResourceStatusRequest>;
export interface Message {
  MessageText?: string;
}
export const Message = S.suspend(() =>
  S.Struct({ MessageText: S.optional(S.String) }).pipe(
    S.encodeKeys({ MessageText: "messageText" }),
  ),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export type __listOfMessage = Message[];
export const __listOfMessage = S.Array(Message);
export interface RuleResult {
  LastCheckedTimestamp?: Date;
  Messages?: Message[];
  Readiness?: Readiness;
  RuleId?: string;
}
export const RuleResult = S.suspend(() =>
  S.Struct({
    LastCheckedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Messages: S.optional(__listOfMessage),
    Readiness: S.optional(Readiness),
    RuleId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      LastCheckedTimestamp: "lastCheckedTimestamp",
      Messages: "messages",
      Readiness: "readiness",
      RuleId: "ruleId",
    }),
  ),
).annotate({ identifier: "RuleResult" }) as any as S.Schema<RuleResult>;
export type __listOfRuleResult = RuleResult[];
export const __listOfRuleResult = S.Array(RuleResult);
export interface GetReadinessCheckResourceStatusResponse {
  NextToken?: string;
  Readiness?: Readiness;
  Rules?: (RuleResult & {
    LastCheckedTimestamp: ReadinessCheckTimestamp;
    Messages: __listOfMessage;
    Readiness: Readiness;
    RuleId: string;
  })[];
}
export const GetReadinessCheckResourceStatusResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Readiness: S.optional(Readiness),
    Rules: S.optional(__listOfRuleResult),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      Readiness: "readiness",
      Rules: "rules",
    }),
  ),
).annotate({
  identifier: "GetReadinessCheckResourceStatusResponse",
}) as any as S.Schema<GetReadinessCheckResourceStatusResponse>;
export interface GetReadinessCheckStatusRequest {
  MaxResults?: number;
  NextToken?: string;
  ReadinessCheckName: string;
}
export const GetReadinessCheckStatusRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/readinesschecks/{ReadinessCheckName}/status",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadinessCheckStatusRequest",
}) as any as S.Schema<GetReadinessCheckStatusRequest>;
export interface ResourceResult {
  ComponentId?: string;
  LastCheckedTimestamp?: Date;
  Readiness?: Readiness;
  ResourceArn?: string;
}
export const ResourceResult = S.suspend(() =>
  S.Struct({
    ComponentId: S.optional(S.String),
    LastCheckedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Readiness: S.optional(Readiness),
    ResourceArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ComponentId: "componentId",
      LastCheckedTimestamp: "lastCheckedTimestamp",
      Readiness: "readiness",
      ResourceArn: "resourceArn",
    }),
  ),
).annotate({ identifier: "ResourceResult" }) as any as S.Schema<ResourceResult>;
export type __listOfResourceResult = ResourceResult[];
export const __listOfResourceResult = S.Array(ResourceResult);
export interface GetReadinessCheckStatusResponse {
  Messages?: Message[];
  NextToken?: string;
  Readiness?: Readiness;
  Resources?: (ResourceResult & {
    LastCheckedTimestamp: ReadinessCheckTimestamp;
    Readiness: Readiness;
  })[];
}
export const GetReadinessCheckStatusResponse = S.suspend(() =>
  S.Struct({
    Messages: S.optional(__listOfMessage),
    NextToken: S.optional(S.String),
    Readiness: S.optional(Readiness),
    Resources: S.optional(__listOfResourceResult),
  }).pipe(
    S.encodeKeys({
      Messages: "messages",
      NextToken: "nextToken",
      Readiness: "readiness",
      Resources: "resources",
    }),
  ),
).annotate({
  identifier: "GetReadinessCheckStatusResponse",
}) as any as S.Schema<GetReadinessCheckStatusResponse>;
export interface GetRecoveryGroupRequest {
  RecoveryGroupName: string;
}
export const GetRecoveryGroupRequest = S.suspend(() =>
  S.Struct({
    RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/recoverygroups/{RecoveryGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRecoveryGroupRequest",
}) as any as S.Schema<GetRecoveryGroupRequest>;
export interface GetRecoveryGroupResponse {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetRecoveryGroupResponse = S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupArn: S.optional(S.String),
    RecoveryGroupName: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Cells: "cells",
      RecoveryGroupArn: "recoveryGroupArn",
      RecoveryGroupName: "recoveryGroupName",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetRecoveryGroupResponse",
}) as any as S.Schema<GetRecoveryGroupResponse>;
export interface GetRecoveryGroupReadinessSummaryRequest {
  MaxResults?: number;
  NextToken?: string;
  RecoveryGroupName: string;
}
export const GetRecoveryGroupReadinessSummaryRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/recoverygroupreadiness/{RecoveryGroupName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRecoveryGroupReadinessSummaryRequest",
}) as any as S.Schema<GetRecoveryGroupReadinessSummaryRequest>;
export interface GetRecoveryGroupReadinessSummaryResponse {
  NextToken?: string;
  Readiness?: Readiness;
  ReadinessChecks?: ReadinessCheckSummary[];
}
export const GetRecoveryGroupReadinessSummaryResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Readiness: S.optional(Readiness),
    ReadinessChecks: S.optional(__listOfReadinessCheckSummary),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      Readiness: "readiness",
      ReadinessChecks: "readinessChecks",
    }),
  ),
).annotate({
  identifier: "GetRecoveryGroupReadinessSummaryResponse",
}) as any as S.Schema<GetRecoveryGroupReadinessSummaryResponse>;
export interface GetResourceSetRequest {
  ResourceSetName: string;
}
export const GetResourceSetRequest = S.suspend(() =>
  S.Struct({
    ResourceSetName: S.String.pipe(T.HttpLabel("ResourceSetName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resourcesets/{ResourceSetName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceSetRequest",
}) as any as S.Schema<GetResourceSetRequest>;
export interface GetResourceSetResponse {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export const GetResourceSetResponse = S.suspend(() =>
  S.Struct({
    ResourceSetArn: S.optional(S.String),
    ResourceSetName: S.optional(S.String),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ResourceSetArn: "resourceSetArn",
      ResourceSetName: "resourceSetName",
      ResourceSetType: "resourceSetType",
      Resources: "resources",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetResourceSetResponse",
}) as any as S.Schema<GetResourceSetResponse>;
export interface ListCellsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListCellsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cells" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCellsRequest",
}) as any as S.Schema<ListCellsRequest>;
export interface CellOutput {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CellOutput = S.suspend(() =>
  S.Struct({
    CellArn: S.optional(S.String),
    CellName: S.optional(S.String),
    Cells: S.optional(__listOf__string),
    ParentReadinessScopes: S.optional(__listOf__string),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      CellArn: "cellArn",
      CellName: "cellName",
      Cells: "cells",
      ParentReadinessScopes: "parentReadinessScopes",
      Tags: "tags",
    }),
  ),
).annotate({ identifier: "CellOutput" }) as any as S.Schema<CellOutput>;
export type __listOfCellOutput = CellOutput[];
export const __listOfCellOutput = S.Array(CellOutput);
export interface ListCellsResponse {
  Cells?: (CellOutput & {
    CellArn: __stringMax256;
    CellName: __stringMax64PatternAAZAZ09Z;
    Cells: __listOf__string;
    ParentReadinessScopes: __listOf__string;
  })[];
  NextToken?: string;
}
export const ListCellsResponse = S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOfCellOutput),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Cells: "cells", NextToken: "nextToken" })),
).annotate({
  identifier: "ListCellsResponse",
}) as any as S.Schema<ListCellsResponse>;
export interface ListCrossAccountAuthorizationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListCrossAccountAuthorizationsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/crossaccountauthorizations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCrossAccountAuthorizationsRequest",
}) as any as S.Schema<ListCrossAccountAuthorizationsRequest>;
export type __listOfCrossAccountAuthorization = string[];
export const __listOfCrossAccountAuthorization = S.Array(S.String);
export interface ListCrossAccountAuthorizationsResponse {
  CrossAccountAuthorizations?: string[];
  NextToken?: string;
}
export const ListCrossAccountAuthorizationsResponse = S.suspend(() =>
  S.Struct({
    CrossAccountAuthorizations: S.optional(__listOfCrossAccountAuthorization),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CrossAccountAuthorizations: "crossAccountAuthorizations",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListCrossAccountAuthorizationsResponse",
}) as any as S.Schema<ListCrossAccountAuthorizationsResponse>;
export interface ListReadinessChecksRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListReadinessChecksRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/readinesschecks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadinessChecksRequest",
}) as any as S.Schema<ListReadinessChecksRequest>;
export interface ReadinessCheckOutput {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export const ReadinessCheckOutput = S.suspend(() =>
  S.Struct({
    ReadinessCheckArn: S.optional(S.String),
    ReadinessCheckName: S.optional(S.String),
    ResourceSet: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ReadinessCheckArn: "readinessCheckArn",
      ReadinessCheckName: "readinessCheckName",
      ResourceSet: "resourceSet",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "ReadinessCheckOutput",
}) as any as S.Schema<ReadinessCheckOutput>;
export type __listOfReadinessCheckOutput = ReadinessCheckOutput[];
export const __listOfReadinessCheckOutput = S.Array(ReadinessCheckOutput);
export interface ListReadinessChecksResponse {
  NextToken?: string;
  ReadinessChecks?: (ReadinessCheckOutput & {
    ReadinessCheckArn: __stringMax256;
    ResourceSet: __stringMax64PatternAAZAZ09Z;
  })[];
}
export const ListReadinessChecksResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ReadinessChecks: S.optional(__listOfReadinessCheckOutput),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      ReadinessChecks: "readinessChecks",
    }),
  ),
).annotate({
  identifier: "ListReadinessChecksResponse",
}) as any as S.Schema<ListReadinessChecksResponse>;
export interface ListRecoveryGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListRecoveryGroupsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/recoverygroups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecoveryGroupsRequest",
}) as any as S.Schema<ListRecoveryGroupsRequest>;
export interface RecoveryGroupOutput {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const RecoveryGroupOutput = S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupArn: S.optional(S.String),
    RecoveryGroupName: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Cells: "cells",
      RecoveryGroupArn: "recoveryGroupArn",
      RecoveryGroupName: "recoveryGroupName",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "RecoveryGroupOutput",
}) as any as S.Schema<RecoveryGroupOutput>;
export type __listOfRecoveryGroupOutput = RecoveryGroupOutput[];
export const __listOfRecoveryGroupOutput = S.Array(RecoveryGroupOutput);
export interface ListRecoveryGroupsResponse {
  NextToken?: string;
  RecoveryGroups?: (RecoveryGroupOutput & {
    Cells: __listOf__string;
    RecoveryGroupArn: __stringMax256;
    RecoveryGroupName: __stringMax64PatternAAZAZ09Z;
  })[];
}
export const ListRecoveryGroupsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    RecoveryGroups: S.optional(__listOfRecoveryGroupOutput),
  }).pipe(
    S.encodeKeys({ NextToken: "nextToken", RecoveryGroups: "recoveryGroups" }),
  ),
).annotate({
  identifier: "ListRecoveryGroupsResponse",
}) as any as S.Schema<ListRecoveryGroupsResponse>;
export interface ListResourceSetsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListResourceSetsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resourcesets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceSetsRequest",
}) as any as S.Schema<ListResourceSetsRequest>;
export interface ResourceSetOutput {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export const ResourceSetOutput = S.suspend(() =>
  S.Struct({
    ResourceSetArn: S.optional(S.String),
    ResourceSetName: S.optional(S.String),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ResourceSetArn: "resourceSetArn",
      ResourceSetName: "resourceSetName",
      ResourceSetType: "resourceSetType",
      Resources: "resources",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "ResourceSetOutput",
}) as any as S.Schema<ResourceSetOutput>;
export type __listOfResourceSetOutput = ResourceSetOutput[];
export const __listOfResourceSetOutput = S.Array(ResourceSetOutput);
export interface ListResourceSetsResponse {
  NextToken?: string;
  ResourceSets?: (ResourceSetOutput & {
    ResourceSetArn: __stringMax256;
    ResourceSetName: __stringMax64PatternAAZAZ09Z;
    ResourceSetType: __stringPatternAWSAZaZ09AZaZ09;
    Resources: __listOfResource;
  })[];
}
export const ListResourceSetsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ResourceSets: S.optional(__listOfResourceSetOutput),
  }).pipe(
    S.encodeKeys({ NextToken: "nextToken", ResourceSets: "resourceSets" }),
  ),
).annotate({
  identifier: "ListResourceSetsResponse",
}) as any as S.Schema<ListResourceSetsResponse>;
export interface ListRulesRequest {
  MaxResults?: number;
  NextToken?: string;
  ResourceType?: string;
}
export const ListRulesRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRulesRequest",
}) as any as S.Schema<ListRulesRequest>;
export interface ListRulesOutput {
  ResourceType?: string;
  RuleDescription?: string;
  RuleId?: string;
}
export const ListRulesOutput = S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(S.String),
    RuleDescription: S.optional(S.String),
    RuleId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ResourceType: "resourceType",
      RuleDescription: "ruleDescription",
      RuleId: "ruleId",
    }),
  ),
).annotate({
  identifier: "ListRulesOutput",
}) as any as S.Schema<ListRulesOutput>;
export type __listOfListRulesOutput = ListRulesOutput[];
export const __listOfListRulesOutput = S.Array(ListRulesOutput);
export interface ListRulesResponse {
  NextToken?: string;
  Rules?: (ListRulesOutput & {
    ResourceType: __stringMax64;
    RuleDescription: __stringMax256;
    RuleId: __stringMax64;
  })[];
}
export const ListRulesResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Rules: S.optional(__listOfListRulesOutput),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", Rules: "rules" })),
).annotate({
  identifier: "ListRulesResponse",
}) as any as S.Schema<ListRulesResponse>;
export interface ListTagsForResourcesRequest {
  ResourceArn: string;
}
export const ListTagsForResourcesRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourcesRequest",
}) as any as S.Schema<ListTagsForResourcesRequest>;
export interface ListTagsForResourcesResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourcesResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "ListTagsForResourcesResponse",
}) as any as S.Schema<ListTagsForResourcesResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: S.optional(Tags),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateCellRequest {
  CellName: string;
  Cells?: string[];
}
export const UpdateCellRequest = S.suspend(() =>
  S.Struct({
    CellName: S.String.pipe(T.HttpLabel("CellName")),
    Cells: S.optional(__listOf__string),
  })
    .pipe(S.encodeKeys({ Cells: "cells" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/cells/{CellName}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateCellRequest",
}) as any as S.Schema<UpdateCellRequest>;
export interface UpdateCellResponse {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const UpdateCellResponse = S.suspend(() =>
  S.Struct({
    CellArn: S.optional(S.String),
    CellName: S.optional(S.String),
    Cells: S.optional(__listOf__string),
    ParentReadinessScopes: S.optional(__listOf__string),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      CellArn: "cellArn",
      CellName: "cellName",
      Cells: "cells",
      ParentReadinessScopes: "parentReadinessScopes",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdateCellResponse",
}) as any as S.Schema<UpdateCellResponse>;
export interface UpdateReadinessCheckRequest {
  ReadinessCheckName: string;
  ResourceSetName?: string;
}
export const UpdateReadinessCheckRequest = S.suspend(() =>
  S.Struct({
    ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
    ResourceSetName: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ ResourceSetName: "resourceSetName" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/readinesschecks/{ReadinessCheckName}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateReadinessCheckRequest",
}) as any as S.Schema<UpdateReadinessCheckRequest>;
export interface UpdateReadinessCheckResponse {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateReadinessCheckResponse = S.suspend(() =>
  S.Struct({
    ReadinessCheckArn: S.optional(S.String),
    ReadinessCheckName: S.optional(S.String),
    ResourceSet: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ReadinessCheckArn: "readinessCheckArn",
      ReadinessCheckName: "readinessCheckName",
      ResourceSet: "resourceSet",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdateReadinessCheckResponse",
}) as any as S.Schema<UpdateReadinessCheckResponse>;
export interface UpdateRecoveryGroupRequest {
  Cells?: string[];
  RecoveryGroupName: string;
}
export const UpdateRecoveryGroupRequest = S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
  })
    .pipe(S.encodeKeys({ Cells: "cells" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/recoverygroups/{RecoveryGroupName}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateRecoveryGroupRequest",
}) as any as S.Schema<UpdateRecoveryGroupRequest>;
export interface UpdateRecoveryGroupResponse {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateRecoveryGroupResponse = S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupArn: S.optional(S.String),
    RecoveryGroupName: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Cells: "cells",
      RecoveryGroupArn: "recoveryGroupArn",
      RecoveryGroupName: "recoveryGroupName",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdateRecoveryGroupResponse",
}) as any as S.Schema<UpdateRecoveryGroupResponse>;
export interface UpdateResourceSetRequest {
  ResourceSetName: string;
  ResourceSetType?: string;
  Resources?: Resource[];
}
export const UpdateResourceSetRequest = S.suspend(() =>
  S.Struct({
    ResourceSetName: S.String.pipe(T.HttpLabel("ResourceSetName")),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
  })
    .pipe(
      S.encodeKeys({
        ResourceSetType: "resourceSetType",
        Resources: "resources",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/resourcesets/{ResourceSetName}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateResourceSetRequest",
}) as any as S.Schema<UpdateResourceSetRequest>;
export interface UpdateResourceSetResponse {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export const UpdateResourceSetResponse = S.suspend(() =>
  S.Struct({
    ResourceSetArn: S.optional(S.String),
    ResourceSetName: S.optional(S.String),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ResourceSetArn: "resourceSetArn",
      ResourceSetName: "resourceSetName",
      ResourceSetType: "resourceSetType",
      Resources: "resources",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdateResourceSetResponse",
}) as any as S.Schema<UpdateResourceSetResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { Message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Creates a cell in an account.
 */
export const createCell: (
  input: CreateCellRequest,
) => effect.Effect<
  CreateCellResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCellRequest,
  output: CreateCellResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a cross-account readiness authorization. This lets you authorize another account to work with Route 53 Application Recovery Controller, for example, to check the readiness status of resources in a separate account.
 */
export const createCrossAccountAuthorization: (
  input: CreateCrossAccountAuthorizationRequest,
) => effect.Effect<
  CreateCrossAccountAuthorizationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCrossAccountAuthorizationRequest,
  output: CreateCrossAccountAuthorizationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a readiness check in an account. A readiness check monitors a resource set in your application, such as a set of Amazon Aurora instances, that Application Recovery Controller is auditing recovery readiness for. The audits run once every minute on every resource that's associated with a readiness check.
 */
export const createReadinessCheck: (
  input: CreateReadinessCheckRequest,
) => effect.Effect<
  CreateReadinessCheckResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateReadinessCheckRequest,
  output: CreateReadinessCheckResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a recovery group in an account. A recovery group corresponds to an application and includes a list of the cells that make up the application.
 */
export const createRecoveryGroup: (
  input: CreateRecoveryGroupRequest,
) => effect.Effect<
  CreateRecoveryGroupResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRecoveryGroupRequest,
  output: CreateRecoveryGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a resource set. A resource set is a set of resources of one type that span multiple cells. You can associate a resource set with a readiness check to monitor the resources for failover readiness.
 */
export const createResourceSet: (
  input: CreateResourceSetRequest,
) => effect.Effect<
  CreateResourceSetResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateResourceSetRequest,
  output: CreateResourceSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Delete a cell. When successful, the response code is 204, with no response body.
 */
export const deleteCell: (
  input: DeleteCellRequest,
) => effect.Effect<
  DeleteCellResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCellRequest,
  output: DeleteCellResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes cross account readiness authorization.
 */
export const deleteCrossAccountAuthorization: (
  input: DeleteCrossAccountAuthorizationRequest,
) => effect.Effect<
  DeleteCrossAccountAuthorizationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCrossAccountAuthorizationRequest,
  output: DeleteCrossAccountAuthorizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a readiness check.
 */
export const deleteReadinessCheck: (
  input: DeleteReadinessCheckRequest,
) => effect.Effect<
  DeleteReadinessCheckResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteReadinessCheckRequest,
  output: DeleteReadinessCheckResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a recovery group.
 */
export const deleteRecoveryGroup: (
  input: DeleteRecoveryGroupRequest,
) => effect.Effect<
  DeleteRecoveryGroupResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRecoveryGroupRequest,
  output: DeleteRecoveryGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a resource set.
 */
export const deleteResourceSet: (
  input: DeleteResourceSetRequest,
) => effect.Effect<
  DeleteResourceSetResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResourceSetRequest,
  output: DeleteResourceSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets recommendations about architecture designs for improving resiliency for an application, based on a recovery group.
 */
export const getArchitectureRecommendations: (
  input: GetArchitectureRecommendationsRequest,
) => effect.Effect<
  GetArchitectureRecommendationsResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetArchitectureRecommendationsRequest,
  output: GetArchitectureRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets information about a cell including cell name, cell Amazon Resource Name (ARN), ARNs of nested cells for this cell, and a list of those cell ARNs with their associated recovery group ARNs.
 */
export const getCell: (
  input: GetCellRequest,
) => effect.Effect<
  GetCellResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCellRequest,
  output: GetCellResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets readiness for a cell. Aggregates the readiness of all the resources that are associated with the cell into a single value.
 */
export const getCellReadinessSummary: {
  (
    input: GetCellReadinessSummaryRequest,
  ): effect.Effect<
    GetCellReadinessSummaryResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: GetCellReadinessSummaryRequest,
  ) => stream.Stream<
    GetCellReadinessSummaryResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetCellReadinessSummaryRequest,
  ) => stream.Stream<
    ReadinessCheckSummary,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetCellReadinessSummaryRequest,
  output: GetCellReadinessSummaryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReadinessChecks",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Gets details about a readiness check.
 */
export const getReadinessCheck: (
  input: GetReadinessCheckRequest,
) => effect.Effect<
  GetReadinessCheckResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetReadinessCheckRequest,
  output: GetReadinessCheckResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Gets individual readiness status for a readiness check. To see the overall readiness status for a recovery group, that considers the readiness status for all the readiness checks in the recovery group, use GetRecoveryGroupReadinessSummary.
 */
export const getReadinessCheckResourceStatus: {
  (
    input: GetReadinessCheckResourceStatusRequest,
  ): effect.Effect<
    GetReadinessCheckResourceStatusResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: GetReadinessCheckResourceStatusRequest,
  ) => stream.Stream<
    GetReadinessCheckResourceStatusResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetReadinessCheckResourceStatusRequest,
  ) => stream.Stream<
    RuleResult,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetReadinessCheckResourceStatusRequest,
  output: GetReadinessCheckResourceStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rules",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Gets the readiness status for an individual readiness check. To see the overall readiness status for a recovery group, that considers the readiness status for all the readiness checks in a recovery group, use GetRecoveryGroupReadinessSummary.
 */
export const getReadinessCheckStatus: {
  (
    input: GetReadinessCheckStatusRequest,
  ): effect.Effect<
    GetReadinessCheckStatusResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: GetReadinessCheckStatusRequest,
  ) => stream.Stream<
    GetReadinessCheckStatusResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetReadinessCheckStatusRequest,
  ) => stream.Stream<
    ResourceResult,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetReadinessCheckStatusRequest,
  output: GetReadinessCheckStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Gets details about a recovery group, including a list of the cells that are included in it.
 */
export const getRecoveryGroup: (
  input: GetRecoveryGroupRequest,
) => effect.Effect<
  GetRecoveryGroupResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRecoveryGroupRequest,
  output: GetRecoveryGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Displays a summary of information about a recovery group's readiness status. Includes the readiness checks for resources in the recovery group and the readiness status of each one.
 */
export const getRecoveryGroupReadinessSummary: {
  (
    input: GetRecoveryGroupReadinessSummaryRequest,
  ): effect.Effect<
    GetRecoveryGroupReadinessSummaryResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: GetRecoveryGroupReadinessSummaryRequest,
  ) => stream.Stream<
    GetRecoveryGroupReadinessSummaryResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetRecoveryGroupReadinessSummaryRequest,
  ) => stream.Stream<
    ReadinessCheckSummary,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetRecoveryGroupReadinessSummaryRequest,
  output: GetRecoveryGroupReadinessSummaryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReadinessChecks",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Displays the details about a resource set, including a list of the resources in the set.
 */
export const getResourceSet: (
  input: GetResourceSetRequest,
) => effect.Effect<
  GetResourceSetResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResourceSetRequest,
  output: GetResourceSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists the cells for an account.
 */
export const listCells: {
  (
    input: ListCellsRequest,
  ): effect.Effect<
    ListCellsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListCellsRequest,
  ) => stream.Stream<
    ListCellsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCellsRequest,
  ) => stream.Stream<
    CellOutput,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCellsRequest,
  output: ListCellsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Cells",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the cross-account readiness authorizations that are in place for an account.
 */
export const listCrossAccountAuthorizations: {
  (
    input: ListCrossAccountAuthorizationsRequest,
  ): effect.Effect<
    ListCrossAccountAuthorizationsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListCrossAccountAuthorizationsRequest,
  ) => stream.Stream<
    ListCrossAccountAuthorizationsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCrossAccountAuthorizationsRequest,
  ) => stream.Stream<
    CrossAccountAuthorization,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCrossAccountAuthorizationsRequest,
  output: ListCrossAccountAuthorizationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CrossAccountAuthorizations",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the readiness checks for an account.
 */
export const listReadinessChecks: {
  (
    input: ListReadinessChecksRequest,
  ): effect.Effect<
    ListReadinessChecksResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListReadinessChecksRequest,
  ) => stream.Stream<
    ListReadinessChecksResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListReadinessChecksRequest,
  ) => stream.Stream<
    ReadinessCheckOutput,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListReadinessChecksRequest,
  output: ListReadinessChecksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReadinessChecks",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the recovery groups in an account.
 */
export const listRecoveryGroups: {
  (
    input: ListRecoveryGroupsRequest,
  ): effect.Effect<
    ListRecoveryGroupsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListRecoveryGroupsRequest,
  ) => stream.Stream<
    ListRecoveryGroupsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRecoveryGroupsRequest,
  ) => stream.Stream<
    RecoveryGroupOutput,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRecoveryGroupsRequest,
  output: ListRecoveryGroupsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecoveryGroups",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the resource sets in an account.
 */
export const listResourceSets: {
  (
    input: ListResourceSetsRequest,
  ): effect.Effect<
    ListResourceSetsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListResourceSetsRequest,
  ) => stream.Stream<
    ListResourceSetsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResourceSetsRequest,
  ) => stream.Stream<
    ResourceSetOutput,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResourceSetsRequest,
  output: ListResourceSetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceSets",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists all readiness rules, or lists the readiness rules for a specific resource type.
 */
export const listRules: {
  (
    input: ListRulesRequest,
  ): effect.Effect<
    ListRulesResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListRulesRequest,
  ) => stream.Stream<
    ListRulesResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRulesRequest,
  ) => stream.Stream<
    ListRulesOutput,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRulesRequest,
  output: ListRulesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rules",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the tags for a resource.
 */
export const listTagsForResources: (
  input: ListTagsForResourcesRequest,
) => effect.Effect<
  ListTagsForResourcesResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourcesRequest,
  output: ListTagsForResourcesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Adds a tag to a resource.
 */
export const tagResource: (
  input: TagResourceRequest,
) => effect.Effect<
  TagResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Removes a tag from a resource.
 */
export const untagResource: (
  input: UntagResourceRequest,
) => effect.Effect<
  UntagResourceResponse,
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Updates a cell to replace the list of nested cells with a new list of nested cells.
 */
export const updateCell: (
  input: UpdateCellRequest,
) => effect.Effect<
  UpdateCellResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCellRequest,
  output: UpdateCellResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates a readiness check.
 */
export const updateReadinessCheck: (
  input: UpdateReadinessCheckRequest,
) => effect.Effect<
  UpdateReadinessCheckResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateReadinessCheckRequest,
  output: UpdateReadinessCheckResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates a recovery group.
 */
export const updateRecoveryGroup: (
  input: UpdateRecoveryGroupRequest,
) => effect.Effect<
  UpdateRecoveryGroupResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRecoveryGroupRequest,
  output: UpdateRecoveryGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates a resource set.
 */
export const updateResourceSet: (
  input: UpdateResourceSetRequest,
) => effect.Effect<
  UpdateResourceSetResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResourceSetRequest,
  output: UpdateResourceSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
