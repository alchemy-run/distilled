import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://config.amazonaws.com/doc/2014-11-12/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Config Service",
  serviceShapeName: "StarlingDoveService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "config" });
const ver = /*@__PURE__*/ T.ServiceVersion("2014-11-12");
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
              `https://config-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://config.${Region}.amazonaws.com`);
            }
            return e(`https://config-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://config.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://config.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://config.{R}.{D}","properties":{},"headers":{}}');

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ConformancePackTemplateValidationException
  extends /*@__PURE__*/ S.TaggedError<ConformancePackTemplateValidationException>()(
    "ConformancePackTemplateValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class IdempotentParameterMismatch
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatch>()(
    "IdempotentParameterMismatch",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withConflictError) {}
export class InsufficientDeliveryPolicyException
  extends /*@__PURE__*/ S.TaggedError<InsufficientDeliveryPolicyException>()(
    "InsufficientDeliveryPolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InsufficientPermissionsException
  extends /*@__PURE__*/ S.TaggedError<InsufficientPermissionsException>()(
    "InsufficientPermissionsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidConfigurationRecorderNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidConfigurationRecorderNameException>()(
    "InvalidConfigurationRecorderNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDeliveryChannelNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeliveryChannelNameException>()(
    "InvalidDeliveryChannelNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidExpressionException
  extends /*@__PURE__*/ S.TaggedError<InvalidExpressionException>()("InvalidExpressionException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidLimitException
  extends /*@__PURE__*/ S.TaggedError<InvalidLimitException>()("InvalidLimitException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()("InvalidNextTokenException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRecordingGroupException
  extends /*@__PURE__*/ S.TaggedError<InvalidRecordingGroupException>()(
    "InvalidRecordingGroupException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidResultTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidResultTokenException>()(
    "InvalidResultTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRoleException
  extends /*@__PURE__*/ S.TaggedError<InvalidRoleException>()("InvalidRoleException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidS3KeyPrefixException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3KeyPrefixException>()(
    "InvalidS3KeyPrefixException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidS3KmsKeyArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3KmsKeyArnException>()(
    "InvalidS3KmsKeyArnException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidSNSTopicARNException
  extends /*@__PURE__*/ S.TaggedError<InvalidSNSTopicARNException>()(
    "InvalidSNSTopicARNException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidTimeRangeException
  extends /*@__PURE__*/ S.TaggedError<InvalidTimeRangeException>()("InvalidTimeRangeException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LastDeliveryChannelDeleteFailedException
  extends /*@__PURE__*/ S.TaggedError<LastDeliveryChannelDeleteFailedException>()(
    "LastDeliveryChannelDeleteFailedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class MaxActiveResourcesExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxActiveResourcesExceededException>()(
    "MaxActiveResourcesExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaxNumberOfConfigRulesExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxNumberOfConfigRulesExceededException>()(
    "MaxNumberOfConfigRulesExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaxNumberOfConfigurationRecordersExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxNumberOfConfigurationRecordersExceededException>()(
    "MaxNumberOfConfigurationRecordersExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaxNumberOfConformancePacksExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxNumberOfConformancePacksExceededException>()(
    "MaxNumberOfConformancePacksExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaxNumberOfConnectorsExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxNumberOfConnectorsExceededException>()(
    "MaxNumberOfConnectorsExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaxNumberOfDeliveryChannelsExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxNumberOfDeliveryChannelsExceededException>()(
    "MaxNumberOfDeliveryChannelsExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaxNumberOfOrganizationConfigRulesExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxNumberOfOrganizationConfigRulesExceededException>()(
    "MaxNumberOfOrganizationConfigRulesExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaxNumberOfOrganizationConformancePacksExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxNumberOfOrganizationConformancePacksExceededException>()(
    "MaxNumberOfOrganizationConformancePacksExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaxNumberOfRetentionConfigurationsExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxNumberOfRetentionConfigurationsExceededException>()(
    "MaxNumberOfRetentionConfigurationsExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoAvailableConfigurationRecorderException
  extends /*@__PURE__*/ S.TaggedError<NoAvailableConfigurationRecorderException>()(
    "NoAvailableConfigurationRecorderException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoAvailableDeliveryChannelException
  extends /*@__PURE__*/ S.TaggedError<NoAvailableDeliveryChannelException>()(
    "NoAvailableDeliveryChannelException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoAvailableOrganizationException
  extends /*@__PURE__*/ S.TaggedError<NoAvailableOrganizationException>()(
    "NoAvailableOrganizationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoRunningConfigurationRecorderException
  extends /*@__PURE__*/ S.TaggedError<NoRunningConfigurationRecorderException>()(
    "NoRunningConfigurationRecorderException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchBucketException
  extends /*@__PURE__*/ S.TaggedError<NoSuchBucketException>()("NoSuchBucketException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NoSuchConfigRuleException
  extends /*@__PURE__*/ S.TaggedError<NoSuchConfigRuleException>()("NoSuchConfigRuleException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NoSuchConfigRuleInConformancePackException
  extends /*@__PURE__*/ S.TaggedError<NoSuchConfigRuleInConformancePackException>()(
    "NoSuchConfigRuleInConformancePackException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchConfigurationAggregatorException
  extends /*@__PURE__*/ S.TaggedError<NoSuchConfigurationAggregatorException>()(
    "NoSuchConfigurationAggregatorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchConfigurationRecorderException
  extends /*@__PURE__*/ S.TaggedError<NoSuchConfigurationRecorderException>()(
    "NoSuchConfigurationRecorderException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchConformancePackException
  extends /*@__PURE__*/ S.TaggedError<NoSuchConformancePackException>()(
    "NoSuchConformancePackException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchDeliveryChannelException
  extends /*@__PURE__*/ S.TaggedError<NoSuchDeliveryChannelException>()(
    "NoSuchDeliveryChannelException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchOrganizationConfigRuleException
  extends /*@__PURE__*/ S.TaggedError<NoSuchOrganizationConfigRuleException>()(
    "NoSuchOrganizationConfigRuleException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchOrganizationConformancePackException
  extends /*@__PURE__*/ S.TaggedError<NoSuchOrganizationConformancePackException>()(
    "NoSuchOrganizationConformancePackException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchRemediationConfigurationException
  extends /*@__PURE__*/ S.TaggedError<NoSuchRemediationConfigurationException>()(
    "NoSuchRemediationConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchRemediationExceptionException
  extends /*@__PURE__*/ S.TaggedError<NoSuchRemediationExceptionException>()(
    "NoSuchRemediationExceptionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchRetentionConfigurationException
  extends /*@__PURE__*/ S.TaggedError<NoSuchRetentionConfigurationException>()(
    "NoSuchRetentionConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class OrganizationAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<OrganizationAccessDeniedException>()(
    "OrganizationAccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class OrganizationAllFeaturesNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<OrganizationAllFeaturesNotEnabledException>()(
    "OrganizationAllFeaturesNotEnabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class OrganizationConformancePackTemplateValidationException
  extends /*@__PURE__*/ S.TaggedError<OrganizationConformancePackTemplateValidationException>()(
    "OrganizationConformancePackTemplateValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class OversizedConfigurationItemException
  extends /*@__PURE__*/ S.TaggedError<OversizedConfigurationItemException>()(
    "OversizedConfigurationItemException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RemediationInProgressException
  extends /*@__PURE__*/ S.TaggedError<RemediationInProgressException>()(
    "RemediationInProgressException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ResourceConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ResourceConcurrentModificationException>()(
    "ResourceConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()("ResourceInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotDiscoveredException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotDiscoveredException>()(
    "ResourceNotDiscoveredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()("TooManyTagsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class UnmodifiableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnmodifiableEntityException>()(
    "UnmodifiableEntityException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type AmazonResourceName = string;
export type ResourceType =
  | "AWS::EC2::CustomerGateway"
  | "AWS::EC2::EIP"
  | "AWS::EC2::Host"
  | "AWS::EC2::Instance"
  | "AWS::EC2::InternetGateway"
  | "AWS::EC2::NetworkAcl"
  | "AWS::EC2::NetworkInterface"
  | "AWS::EC2::RouteTable"
  | "AWS::EC2::SecurityGroup"
  | "AWS::EC2::Subnet"
  | "AWS::CloudTrail::Trail"
  | "AWS::EC2::Volume"
  | "AWS::EC2::VPC"
  | "AWS::EC2::VPNConnection"
  | "AWS::EC2::VPNGateway"
  | "AWS::EC2::RegisteredHAInstance"
  | "AWS::EC2::NatGateway"
  | "AWS::EC2::EgressOnlyInternetGateway"
  | "AWS::EC2::VPCEndpoint"
  | "AWS::EC2::VPCEndpointService"
  | "AWS::EC2::FlowLog"
  | "AWS::EC2::VPCPeeringConnection"
  | "AWS::Elasticsearch::Domain"
  | "AWS::IAM::Group"
  | "AWS::IAM::Policy"
  | "AWS::IAM::Role"
  | "AWS::IAM::User"
  | "AWS::ElasticLoadBalancingV2::LoadBalancer"
  | "AWS::ACM::Certificate"
  | "AWS::RDS::DBInstance"
  | "AWS::RDS::DBSubnetGroup"
  | "AWS::RDS::DBSecurityGroup"
  | "AWS::RDS::DBSnapshot"
  | "AWS::RDS::DBCluster"
  | "AWS::RDS::DBClusterSnapshot"
  | "AWS::RDS::EventSubscription"
  | "AWS::S3::Bucket"
  | "AWS::S3::AccountPublicAccessBlock"
  | "AWS::Redshift::Cluster"
  | "AWS::Redshift::ClusterSnapshot"
  | "AWS::Redshift::ClusterParameterGroup"
  | "AWS::Redshift::ClusterSecurityGroup"
  | "AWS::Redshift::ClusterSubnetGroup"
  | "AWS::Redshift::EventSubscription"
  | "AWS::SSM::ManagedInstanceInventory"
  | "AWS::CloudWatch::Alarm"
  | "AWS::CloudFormation::Stack"
  | "AWS::ElasticLoadBalancing::LoadBalancer"
  | "AWS::AutoScaling::AutoScalingGroup"
  | "AWS::AutoScaling::LaunchConfiguration"
  | "AWS::AutoScaling::ScalingPolicy"
  | "AWS::AutoScaling::ScheduledAction"
  | "AWS::DynamoDB::Table"
  | "AWS::CodeBuild::Project"
  | "AWS::WAF::RateBasedRule"
  | "AWS::WAF::Rule"
  | "AWS::WAF::RuleGroup"
  | "AWS::WAF::WebACL"
  | "AWS::WAFRegional::RateBasedRule"
  | "AWS::WAFRegional::Rule"
  | "AWS::WAFRegional::RuleGroup"
  | "AWS::WAFRegional::WebACL"
  | "AWS::CloudFront::Distribution"
  | "AWS::CloudFront::StreamingDistribution"
  | "AWS::Lambda::Function"
  | "AWS::NetworkFirewall::Firewall"
  | "AWS::NetworkFirewall::FirewallPolicy"
  | "AWS::NetworkFirewall::RuleGroup"
  | "AWS::ElasticBeanstalk::Application"
  | "AWS::ElasticBeanstalk::ApplicationVersion"
  | "AWS::ElasticBeanstalk::Environment"
  | "AWS::WAFv2::WebACL"
  | "AWS::WAFv2::RuleGroup"
  | "AWS::WAFv2::IPSet"
  | "AWS::WAFv2::RegexPatternSet"
  | "AWS::WAFv2::ManagedRuleSet"
  | "AWS::XRay::EncryptionConfig"
  | "AWS::SSM::AssociationCompliance"
  | "AWS::SSM::PatchCompliance"
  | "AWS::Shield::Protection"
  | "AWS::ShieldRegional::Protection"
  | "AWS::Config::ConformancePackCompliance"
  | "AWS::Config::ResourceCompliance"
  | "AWS::ApiGateway::Stage"
  | "AWS::ApiGateway::RestApi"
  | "AWS::ApiGatewayV2::Stage"
  | "AWS::ApiGatewayV2::Api"
  | "AWS::CodePipeline::Pipeline"
  | "AWS::ServiceCatalog::CloudFormationProvisionedProduct"
  | "AWS::ServiceCatalog::CloudFormationProduct"
  | "AWS::ServiceCatalog::Portfolio"
  | "AWS::SQS::Queue"
  | "AWS::KMS::Key"
  | "AWS::QLDB::Ledger"
  | "AWS::SecretsManager::Secret"
  | "AWS::SNS::Topic"
  | "AWS::SSM::FileData"
  | "AWS::Backup::BackupPlan"
  | "AWS::Backup::BackupSelection"
  | "AWS::Backup::BackupVault"
  | "AWS::Backup::RecoveryPoint"
  | "AWS::ECR::Repository"
  | "AWS::ECS::Cluster"
  | "AWS::ECS::Service"
  | "AWS::ECS::TaskDefinition"
  | "AWS::EFS::AccessPoint"
  | "AWS::EFS::FileSystem"
  | "AWS::EKS::Cluster"
  | "AWS::OpenSearch::Domain"
  | "AWS::EC2::TransitGateway"
  | "AWS::Kinesis::Stream"
  | "AWS::Kinesis::StreamConsumer"
  | "AWS::CodeDeploy::Application"
  | "AWS::CodeDeploy::DeploymentConfig"
  | "AWS::CodeDeploy::DeploymentGroup"
  | "AWS::EC2::LaunchTemplate"
  | "AWS::ECR::PublicRepository"
  | "AWS::GuardDuty::Detector"
  | "AWS::EMR::SecurityConfiguration"
  | "AWS::SageMaker::CodeRepository"
  | "AWS::Route53Resolver::ResolverEndpoint"
  | "AWS::Route53Resolver::ResolverRule"
  | "AWS::Route53Resolver::ResolverRuleAssociation"
  | "AWS::DMS::ReplicationSubnetGroup"
  | "AWS::DMS::EventSubscription"
  | "AWS::MSK::Cluster"
  | "AWS::StepFunctions::Activity"
  | "AWS::WorkSpaces::Workspace"
  | "AWS::WorkSpaces::ConnectionAlias"
  | "AWS::SageMaker::Model"
  | "AWS::ElasticLoadBalancingV2::Listener"
  | "AWS::StepFunctions::StateMachine"
  | "AWS::Batch::JobQueue"
  | "AWS::Batch::ComputeEnvironment"
  | "AWS::AccessAnalyzer::Analyzer"
  | "AWS::Athena::WorkGroup"
  | "AWS::Athena::DataCatalog"
  | "AWS::Detective::Graph"
  | "AWS::GlobalAccelerator::Accelerator"
  | "AWS::GlobalAccelerator::EndpointGroup"
  | "AWS::GlobalAccelerator::Listener"
  | "AWS::EC2::TransitGatewayAttachment"
  | "AWS::EC2::TransitGatewayRouteTable"
  | "AWS::DMS::Certificate"
  | "AWS::AppConfig::Application"
  | "AWS::AppSync::GraphQLApi"
  | "AWS::DataSync::LocationSMB"
  | "AWS::DataSync::LocationFSxLustre"
  | "AWS::DataSync::LocationS3"
  | "AWS::DataSync::LocationEFS"
  | "AWS::DataSync::Task"
  | "AWS::DataSync::LocationNFS"
  | "AWS::EC2::NetworkInsightsAccessScopeAnalysis"
  | "AWS::EKS::FargateProfile"
  | "AWS::Glue::Job"
  | "AWS::GuardDuty::ThreatIntelSet"
  | "AWS::GuardDuty::IPSet"
  | "AWS::SageMaker::Workteam"
  | "AWS::SageMaker::NotebookInstanceLifecycleConfig"
  | "AWS::ServiceDiscovery::Service"
  | "AWS::ServiceDiscovery::PublicDnsNamespace"
  | "AWS::SES::ContactList"
  | "AWS::SES::ConfigurationSet"
  | "AWS::Route53::HostedZone"
  | "AWS::IoTEvents::Input"
  | "AWS::IoTEvents::DetectorModel"
  | "AWS::IoTEvents::AlarmModel"
  | "AWS::ServiceDiscovery::HttpNamespace"
  | "AWS::Events::EventBus"
  | "AWS::ImageBuilder::ContainerRecipe"
  | "AWS::ImageBuilder::DistributionConfiguration"
  | "AWS::ImageBuilder::InfrastructureConfiguration"
  | "AWS::DataSync::LocationObjectStorage"
  | "AWS::DataSync::LocationHDFS"
  | "AWS::Glue::Classifier"
  | "AWS::Route53RecoveryReadiness::Cell"
  | "AWS::Route53RecoveryReadiness::ReadinessCheck"
  | "AWS::ECR::RegistryPolicy"
  | "AWS::Backup::ReportPlan"
  | "AWS::Lightsail::Certificate"
  | "AWS::RUM::AppMonitor"
  | "AWS::Events::Endpoint"
  | "AWS::SES::ReceiptRuleSet"
  | "AWS::Events::Archive"
  | "AWS::Events::ApiDestination"
  | "AWS::Lightsail::Disk"
  | "AWS::FIS::ExperimentTemplate"
  | "AWS::DataSync::LocationFSxWindows"
  | "AWS::SES::ReceiptFilter"
  | "AWS::GuardDuty::Filter"
  | "AWS::SES::Template"
  | "AWS::AmazonMQ::Broker"
  | "AWS::AppConfig::Environment"
  | "AWS::AppConfig::ConfigurationProfile"
  | "AWS::Cloud9::EnvironmentEC2"
  | "AWS::EventSchemas::Registry"
  | "AWS::EventSchemas::RegistryPolicy"
  | "AWS::EventSchemas::Discoverer"
  | "AWS::FraudDetector::Label"
  | "AWS::FraudDetector::EntityType"
  | "AWS::FraudDetector::Variable"
  | "AWS::FraudDetector::Outcome"
  | "AWS::IoT::Authorizer"
  | "AWS::IoT::SecurityProfile"
  | "AWS::IoT::RoleAlias"
  | "AWS::IoT::Dimension"
  | "AWS::IoTAnalytics::Datastore"
  | "AWS::Lightsail::Bucket"
  | "AWS::Lightsail::StaticIp"
  | "AWS::MediaPackage::PackagingGroup"
  | "AWS::Route53RecoveryReadiness::RecoveryGroup"
  | "AWS::ResilienceHub::ResiliencyPolicy"
  | "AWS::Transfer::Workflow"
  | "AWS::EKS::IdentityProviderConfig"
  | "AWS::EKS::Addon"
  | "AWS::Glue::MLTransform"
  | "AWS::IoT::Policy"
  | "AWS::IoT::MitigationAction"
  | "AWS::IoTTwinMaker::Workspace"
  | "AWS::IoTTwinMaker::Entity"
  | "AWS::IoTAnalytics::Dataset"
  | "AWS::IoTAnalytics::Pipeline"
  | "AWS::IoTAnalytics::Channel"
  | "AWS::IoTSiteWise::Dashboard"
  | "AWS::IoTSiteWise::Project"
  | "AWS::IoTSiteWise::Portal"
  | "AWS::IoTSiteWise::AssetModel"
  | "AWS::IVS::Channel"
  | "AWS::IVS::RecordingConfiguration"
  | "AWS::IVS::PlaybackKeyPair"
  | "AWS::KinesisAnalyticsV2::Application"
  | "AWS::RDS::GlobalCluster"
  | "AWS::S3::MultiRegionAccessPoint"
  | "AWS::DeviceFarm::TestGridProject"
  | "AWS::Budgets::BudgetsAction"
  | "AWS::Lex::Bot"
  | "AWS::CodeGuruReviewer::RepositoryAssociation"
  | "AWS::IoT::CustomMetric"
  | "AWS::Route53Resolver::FirewallDomainList"
  | "AWS::RoboMaker::RobotApplicationVersion"
  | "AWS::EC2::TrafficMirrorSession"
  | "AWS::IoTSiteWise::Gateway"
  | "AWS::Lex::BotAlias"
  | "AWS::LookoutMetrics::Alert"
  | "AWS::IoT::AccountAuditConfiguration"
  | "AWS::EC2::TrafficMirrorTarget"
  | "AWS::S3::StorageLens"
  | "AWS::IoT::ScheduledAudit"
  | "AWS::Events::Connection"
  | "AWS::EventSchemas::Schema"
  | "AWS::MediaPackage::PackagingConfiguration"
  | "AWS::KinesisVideo::SignalingChannel"
  | "AWS::AppStream::DirectoryConfig"
  | "AWS::LookoutVision::Project"
  | "AWS::Route53RecoveryControl::Cluster"
  | "AWS::Route53RecoveryControl::SafetyRule"
  | "AWS::Route53RecoveryControl::ControlPanel"
  | "AWS::Route53RecoveryControl::RoutingControl"
  | "AWS::Route53RecoveryReadiness::ResourceSet"
  | "AWS::RoboMaker::SimulationApplication"
  | "AWS::RoboMaker::RobotApplication"
  | "AWS::HealthLake::FHIRDatastore"
  | "AWS::Pinpoint::Segment"
  | "AWS::Pinpoint::ApplicationSettings"
  | "AWS::Events::Rule"
  | "AWS::EC2::DHCPOptions"
  | "AWS::EC2::NetworkInsightsPath"
  | "AWS::EC2::TrafficMirrorFilter"
  | "AWS::EC2::IPAM"
  | "AWS::IoTTwinMaker::Scene"
  | "AWS::NetworkManager::TransitGatewayRegistration"
  | "AWS::CustomerProfiles::Domain"
  | "AWS::AutoScaling::WarmPool"
  | "AWS::Connect::PhoneNumber"
  | "AWS::AppConfig::DeploymentStrategy"
  | "AWS::AppFlow::Flow"
  | "AWS::AuditManager::Assessment"
  | "AWS::CloudWatch::MetricStream"
  | "AWS::DeviceFarm::InstanceProfile"
  | "AWS::DeviceFarm::Project"
  | "AWS::EC2::EC2Fleet"
  | "AWS::EC2::SubnetRouteTableAssociation"
  | "AWS::ECR::PullThroughCacheRule"
  | "AWS::GroundStation::Config"
  | "AWS::ImageBuilder::ImagePipeline"
  | "AWS::IoT::FleetMetric"
  | "AWS::IoTWireless::ServiceProfile"
  | "AWS::NetworkManager::Device"
  | "AWS::NetworkManager::GlobalNetwork"
  | "AWS::NetworkManager::Link"
  | "AWS::NetworkManager::Site"
  | "AWS::Panorama::Package"
  | "AWS::Pinpoint::App"
  | "AWS::Redshift::ScheduledAction"
  | "AWS::Route53Resolver::FirewallRuleGroupAssociation"
  | "AWS::SageMaker::AppImageConfig"
  | "AWS::SageMaker::Image"
  | "AWS::ECS::TaskSet"
  | "AWS::Cassandra::Keyspace"
  | "AWS::Signer::SigningProfile"
  | "AWS::Amplify::App"
  | "AWS::AppMesh::VirtualNode"
  | "AWS::AppMesh::VirtualService"
  | "AWS::AppRunner::VpcConnector"
  | "AWS::AppStream::Application"
  | "AWS::CodeArtifact::Repository"
  | "AWS::EC2::PrefixList"
  | "AWS::EC2::SpotFleet"
  | "AWS::Evidently::Project"
  | "AWS::Forecast::Dataset"
  | "AWS::IAM::SAMLProvider"
  | "AWS::IAM::ServerCertificate"
  | "AWS::Pinpoint::Campaign"
  | "AWS::Pinpoint::InAppTemplate"
  | "AWS::SageMaker::Domain"
  | "AWS::Transfer::Agreement"
  | "AWS::Transfer::Connector"
  | "AWS::KinesisFirehose::DeliveryStream"
  | "AWS::Amplify::Branch"
  | "AWS::AppIntegrations::EventIntegration"
  | "AWS::AppMesh::Route"
  | "AWS::Athena::PreparedStatement"
  | "AWS::EC2::IPAMScope"
  | "AWS::Evidently::Launch"
  | "AWS::Forecast::DatasetGroup"
  | "AWS::GreengrassV2::ComponentVersion"
  | "AWS::GroundStation::MissionProfile"
  | "AWS::MediaConnect::FlowEntitlement"
  | "AWS::MediaConnect::FlowVpcInterface"
  | "AWS::MediaTailor::PlaybackConfiguration"
  | "AWS::MSK::Configuration"
  | "AWS::Personalize::Dataset"
  | "AWS::Personalize::Schema"
  | "AWS::Personalize::Solution"
  | "AWS::Pinpoint::EmailTemplate"
  | "AWS::Pinpoint::EventStream"
  | "AWS::ResilienceHub::App"
  | "AWS::ACMPCA::CertificateAuthority"
  | "AWS::AppConfig::HostedConfigurationVersion"
  | "AWS::AppMesh::VirtualGateway"
  | "AWS::AppMesh::VirtualRouter"
  | "AWS::AppRunner::Service"
  | "AWS::CustomerProfiles::ObjectType"
  | "AWS::DMS::Endpoint"
  | "AWS::EC2::CapacityReservation"
  | "AWS::EC2::ClientVpnEndpoint"
  | "AWS::Kendra::Index"
  | "AWS::KinesisVideo::Stream"
  | "AWS::Logs::Destination"
  | "AWS::Pinpoint::EmailChannel"
  | "AWS::S3::AccessPoint"
  | "AWS::NetworkManager::CustomerGatewayAssociation"
  | "AWS::NetworkManager::LinkAssociation"
  | "AWS::IoTWireless::MulticastGroup"
  | "AWS::Personalize::DatasetGroup"
  | "AWS::IoTTwinMaker::ComponentType"
  | "AWS::CodeBuild::ReportGroup"
  | "AWS::SageMaker::FeatureGroup"
  | "AWS::MSK::BatchScramSecret"
  | "AWS::AppStream::Stack"
  | "AWS::IoT::JobTemplate"
  | "AWS::IoTWireless::FuotaTask"
  | "AWS::IoT::ProvisioningTemplate"
  | "AWS::InspectorV2::Filter"
  | "AWS::Route53Resolver::ResolverQueryLoggingConfigAssociation"
  | "AWS::ServiceDiscovery::Instance"
  | "AWS::Transfer::Certificate"
  | "AWS::MediaConnect::FlowSource"
  | "AWS::APS::RuleGroupsNamespace"
  | "AWS::CodeGuruProfiler::ProfilingGroup"
  | "AWS::Route53Resolver::ResolverQueryLoggingConfig"
  | "AWS::Batch::SchedulingPolicy"
  | "AWS::ACMPCA::CertificateAuthorityActivation"
  | "AWS::AppMesh::GatewayRoute"
  | "AWS::AppMesh::Mesh"
  | "AWS::Connect::Instance"
  | "AWS::Connect::QuickConnect"
  | "AWS::EC2::CarrierGateway"
  | "AWS::EC2::IPAMPool"
  | "AWS::EC2::TransitGatewayConnect"
  | "AWS::EC2::TransitGatewayMulticastDomain"
  | "AWS::ECS::CapacityProvider"
  | "AWS::IAM::InstanceProfile"
  | "AWS::IoT::CACertificate"
  | "AWS::IoTTwinMaker::SyncJob"
  | "AWS::KafkaConnect::Connector"
  | "AWS::Lambda::CodeSigningConfig"
  | "AWS::NetworkManager::ConnectPeer"
  | "AWS::ResourceExplorer2::Index"
  | "AWS::AppStream::Fleet"
  | "AWS::Cognito::UserPool"
  | "AWS::Cognito::UserPoolClient"
  | "AWS::Cognito::UserPoolGroup"
  | "AWS::EC2::NetworkInsightsAccessScope"
  | "AWS::EC2::NetworkInsightsAnalysis"
  | "AWS::Grafana::Workspace"
  | "AWS::GroundStation::DataflowEndpointGroup"
  | "AWS::ImageBuilder::ImageRecipe"
  | "AWS::KMS::Alias"
  | "AWS::M2::Environment"
  | "AWS::QuickSight::DataSource"
  | "AWS::QuickSight::Template"
  | "AWS::QuickSight::Theme"
  | "AWS::RDS::OptionGroup"
  | "AWS::Redshift::EndpointAccess"
  | "AWS::Route53Resolver::FirewallRuleGroup"
  | "AWS::SSM::Document"
  | "AWS::AppConfig::ExtensionAssociation"
  | "AWS::AppIntegrations::Application"
  | "AWS::AppSync::ApiCache"
  | "AWS::Bedrock::Guardrail"
  | "AWS::Bedrock::KnowledgeBase"
  | "AWS::Cognito::IdentityPool"
  | "AWS::Connect::Rule"
  | "AWS::Connect::User"
  | "AWS::EC2::ClientVpnTargetNetworkAssociation"
  | "AWS::EC2::EIPAssociation"
  | "AWS::EC2::IPAMResourceDiscovery"
  | "AWS::EC2::IPAMResourceDiscoveryAssociation"
  | "AWS::EC2::InstanceConnectEndpoint"
  | "AWS::EC2::SnapshotBlockPublicAccess"
  | "AWS::EC2::VPCBlockPublicAccessExclusion"
  | "AWS::EC2::VPCBlockPublicAccessOptions"
  | "AWS::EC2::VPCEndpointConnectionNotification"
  | "AWS::EC2::VPNConnectionRoute"
  | "AWS::Evidently::Segment"
  | "AWS::IAM::OIDCProvider"
  | "AWS::InspectorV2::Activation"
  | "AWS::MSK::ClusterPolicy"
  | "AWS::MSK::VpcConnection"
  | "AWS::MediaConnect::Gateway"
  | "AWS::MemoryDB::SubnetGroup"
  | "AWS::OpenSearchServerless::Collection"
  | "AWS::OpenSearchServerless::VpcEndpoint"
  | "AWS::Redshift::EndpointAuthorization"
  | "AWS::Route53Profiles::Profile"
  | "AWS::S3::StorageLensGroup"
  | "AWS::S3Express::BucketPolicy"
  | "AWS::S3Express::DirectoryBucket"
  | "AWS::SageMaker::InferenceExperiment"
  | "AWS::SecurityHub::Standard"
  | "AWS::Transfer::Profile"
  | "AWS::CloudFormation::StackSet"
  | "AWS::MediaPackageV2::Channel"
  | "AWS::S3::AccessGrantsLocation"
  | "AWS::S3::AccessGrant"
  | "AWS::S3::AccessGrantsInstance"
  | "AWS::EMRServerless::Application"
  | "AWS::Config::AggregationAuthorization"
  | "AWS::Bedrock::ApplicationInferenceProfile"
  | "AWS::ApiGatewayV2::Integration"
  | "AWS::SageMaker::MlflowTrackingServer"
  | "AWS::SageMaker::ModelBiasJobDefinition"
  | "AWS::SecretsManager::RotationSchedule"
  | "AWS::Deadline::QueueFleetAssociation"
  | "AWS::ECR::RepositoryCreationTemplate"
  | "AWS::CloudFormation::LambdaHook"
  | "AWS::EC2::SubnetNetworkAclAssociation"
  | "AWS::ApiGateway::UsagePlan"
  | "AWS::AppConfig::Extension"
  | "AWS::Deadline::Fleet"
  | "AWS::EMR::Studio"
  | "AWS::S3Tables::TableBucket"
  | "AWS::CloudFront::RealtimeLogConfig"
  | "AWS::BackupGateway::Hypervisor"
  | "AWS::BCMDataExports::Export"
  | "AWS::CloudFormation::GuardHook"
  | "AWS::CloudFront::PublicKey"
  | "AWS::CloudTrail::EventDataStore"
  | "AWS::EntityResolution::IdMappingWorkflow"
  | "AWS::EntityResolution::SchemaMapping"
  | "AWS::IoT::DomainConfiguration"
  | "AWS::PCAConnectorAD::DirectoryRegistration"
  | "AWS::RDS::Integration"
  | "AWS::Config::ConformancePack"
  | "AWS::RolesAnywhere::Profile"
  | "AWS::CodeArtifact::Domain"
  | "AWS::Backup::RestoreTestingPlan"
  | "AWS::Config::StoredQuery"
  | "AWS::SageMaker::DataQualityJobDefinition"
  | "AWS::SageMaker::ModelExplainabilityJobDefinition"
  | "AWS::SageMaker::ModelQualityJobDefinition"
  | "AWS::SageMaker::StudioLifecycleConfig"
  | "AWS::SES::DedicatedIpPool"
  | "AWS::SES::MailManagerTrafficPolicy"
  | "AWS::SSM::ResourceDataSync"
  | "AWS::BedrockAgentCore::Runtime"
  | "AWS::BedrockAgentCore::BrowserCustom"
  | "AWS::ElasticLoadBalancingV2::TargetGroup"
  | "AWS::EMRContainers::VirtualCluster"
  | "AWS::EntityResolution::MatchingWorkflow"
  | "AWS::IoTCoreDeviceAdvisor::SuiteDefinition"
  | "AWS::EC2::SecurityGroupVpcAssociation"
  | "AWS::EC2::VerifiedAccessInstance"
  | "AWS::KafkaConnect::CustomPlugin"
  | "AWS::NetworkManager::TransitGatewayPeering"
  | "AWS::OpenSearchServerless::SecurityConfig"
  | "AWS::Redshift::Integration"
  | "AWS::RolesAnywhere::TrustAnchor"
  | "AWS::Route53Profiles::ProfileAssociation"
  | "AWS::SSMIncidents::ResponsePlan"
  | "AWS::Transfer::Server"
  | "AWS::Glue::Database"
  | "AWS::Organizations::OrganizationalUnit"
  | "AWS::EC2::IPAMPoolCidr"
  | "AWS::EC2::VPCGatewayAttachment"
  | "AWS::Bedrock::Prompt"
  | "AWS::Comprehend::Flywheel"
  | "AWS::DataSync::Agent"
  | "AWS::MediaTailor::LiveSource"
  | "AWS::MSK::ServerlessCluster"
  | "AWS::IoTSiteWise::Asset"
  | "AWS::B2BI::Capability"
  | "AWS::CloudFront::KeyValueStore"
  | "AWS::Deadline::Monitor"
  | "AWS::GuardDuty::MalwareProtectionPlan"
  | "AWS::Location::APIKey"
  | "AWS::MediaPackageV2::OriginEndpoint"
  | "AWS::PCAConnectorAD::Connector"
  | "AWS::S3Tables::TableBucketPolicy"
  | "AWS::SecretsManager::ResourcePolicy"
  | "AWS::SSMContacts::Contact"
  | "AWS::IoT::ThingGroup"
  | "AWS::ImageBuilder::LifecyclePolicy"
  | "AWS::GameLift::Build"
  | "AWS::ECR::ReplicationConfiguration"
  | "AWS::EC2::SubnetCidrBlock"
  | "AWS::Connect::SecurityProfile"
  | "AWS::CleanRoomsML::TrainingDataset"
  | "AWS::AppStream::AppBlockBuilder"
  | "AWS::Route53::DNSSEC"
  | "AWS::SageMaker::UserProfile"
  | "AWS::ApiGateway::Method"
  | (string & {});
export type ResourceTypeList = ResourceType[];
export interface AssociateResourceTypesRequest {
  ConfigurationRecorderArn: string;
  ResourceTypes: ResourceType[];
}
export type RecorderName = string;
export type AllSupported = boolean;
export type IncludeGlobalResourceTypes = boolean;
export interface ExclusionByResourceTypes {
  resourceTypes?: ResourceType[];
}
export type RecordingStrategyType =
  | "ALL_SUPPORTED_RESOURCE_TYPES"
  | "INCLUSION_BY_RESOURCE_TYPES"
  | "EXCLUSION_BY_RESOURCE_TYPES"
  | (string & {});
export interface RecordingStrategy {
  useOnly?: RecordingStrategyType;
}
export interface RecordingGroup {
  allSupported?: boolean;
  includeGlobalResourceTypes?: boolean;
  resourceTypes?: ResourceType[];
  exclusionByResourceTypes?: ExclusionByResourceTypes;
  recordingStrategy?: RecordingStrategy;
}
export type RecordingFrequency = "CONTINUOUS" | "DAILY" | (string & {});
export type Description = string;
export type RecordingModeResourceTypesList = ResourceType[];
export interface RecordingModeOverride {
  description?: string;
  resourceTypes: ResourceType[];
  recordingFrequency: RecordingFrequency;
}
export type RecordingModeOverrides = RecordingModeOverride[];
export interface RecordingMode {
  recordingFrequency: RecordingFrequency;
  recordingModeOverrides?: RecordingModeOverride[];
}
export type RecordingScope = "INTERNAL" | "PAID" | (string & {});
export type ServicePrincipal = string;
export type ScopeType = string;
export type ScopeValue = string;
export type ScopeValues = string[];
export type ThirdPartyCloudRegion = string;
export type IncludedRegions = string[];
export interface ScopeConfiguration {
  scopeType: string;
  scopeValues?: string[];
  allRegions: boolean;
  includedRegions?: string[];
}
export interface ConfigurationRecorder {
  arn?: string;
  name?: string;
  roleARN?: string;
  recordingGroup?: RecordingGroup;
  recordingMode?: RecordingMode;
  recordingScope?: RecordingScope;
  servicePrincipal?: string;
  connectorArn?: string;
  scopeConfiguration?: ScopeConfiguration;
}
export interface AssociateResourceTypesResponse {
  ConfigurationRecorder: ConfigurationRecorder;
}
export type ConfigurationAggregatorName = string;
export type AccountId = string;
export type AwsRegion = string;
export type ResourceId = string;
export type ResourceName = string;
export interface AggregateResourceIdentifier {
  SourceAccountId: string;
  SourceRegion: string;
  ResourceId: string;
  ResourceType: ResourceType;
  ResourceName?: string;
}
export type ResourceIdentifiersList = AggregateResourceIdentifier[];
export interface BatchGetAggregateResourceConfigRequest {
  ConfigurationAggregatorName: string;
  ResourceIdentifiers: AggregateResourceIdentifier[];
}
export type Version = string;
export type ConfigurationItemCaptureTime = Date;
export type ConfigurationItemStatus =
  | "OK"
  | "ResourceDiscovered"
  | "ResourceNotRecorded"
  | "ResourceDeleted"
  | "ResourceDeletedNotRecorded"
  | (string & {});
export type ConfigurationStateId = string;
export type ARN = string;
export type AvailabilityZone = string;
export type ResourceCreationTime = Date;
export type Configuration = string;
export type SupplementaryConfigurationName = string;
export type SupplementaryConfigurationValue = string;
export type SupplementaryConfiguration = { [key: string]: string | undefined };
export type ConfigurationItemDeliveryTime = Date;
export interface BaseConfigurationItem {
  version?: string;
  accountId?: string;
  configurationItemCaptureTime?: Date;
  configurationItemStatus?: ConfigurationItemStatus;
  configurationStateId?: string;
  arn?: string;
  resourceType?: ResourceType;
  resourceId?: string;
  resourceName?: string;
  awsRegion?: string;
  availabilityZone?: string;
  resourceCreationTime?: Date;
  configuration?: string;
  supplementaryConfiguration?: { [key: string]: string | undefined };
  recordingFrequency?: RecordingFrequency;
  configurationItemDeliveryTime?: Date;
}
export type BaseConfigurationItems = BaseConfigurationItem[];
export type UnprocessedResourceIdentifierList = AggregateResourceIdentifier[];
export interface BatchGetAggregateResourceConfigResponse {
  BaseConfigurationItems?: BaseConfigurationItem[];
  UnprocessedResourceIdentifiers?: AggregateResourceIdentifier[];
}
export interface ResourceKey {
  resourceType: ResourceType;
  resourceId: string;
}
export type ResourceKeys = ResourceKey[];
export interface BatchGetResourceConfigRequest {
  resourceKeys: ResourceKey[];
}
export interface BatchGetResourceConfigResponse {
  baseConfigurationItems?: BaseConfigurationItem[];
  unprocessedResourceKeys?: ResourceKey[];
}
export interface DeleteAggregationAuthorizationRequest {
  AuthorizedAccountId: string;
  AuthorizedAwsRegion: string;
}
export interface DeleteAggregationAuthorizationResponse {}
export type ConfigRuleName = string;
export interface DeleteConfigRuleRequest {
  ConfigRuleName: string;
}
export interface DeleteConfigRuleResponse {}
export interface DeleteConfigurationAggregatorRequest {
  ConfigurationAggregatorName: string;
}
export interface DeleteConfigurationAggregatorResponse {}
export interface DeleteConfigurationRecorderRequest {
  ConfigurationRecorderName: string;
}
export interface DeleteConfigurationRecorderResponse {}
export type ConformancePackName = string;
export interface DeleteConformancePackRequest {
  ConformancePackName: string;
}
export interface DeleteConformancePackResponse {}
export interface DeleteConnectorRequest {
  Arn: string;
}
export interface DeleteConnectorResponse {}
export type ChannelName = string;
export interface DeleteDeliveryChannelRequest {
  DeliveryChannelName: string;
}
export interface DeleteDeliveryChannelResponse {}
export type StringWithCharLimit64 = string;
export interface DeleteEvaluationResultsRequest {
  ConfigRuleName: string;
}
export interface DeleteEvaluationResultsResponse {}
export type OrganizationConfigRuleName = string;
export interface DeleteOrganizationConfigRuleRequest {
  OrganizationConfigRuleName: string;
}
export interface DeleteOrganizationConfigRuleResponse {}
export type OrganizationConformancePackName = string;
export interface DeleteOrganizationConformancePackRequest {
  OrganizationConformancePackName: string;
}
export interface DeleteOrganizationConformancePackResponse {}
export interface DeletePendingAggregationRequestRequest {
  RequesterAccountId: string;
  RequesterAwsRegion: string;
}
export interface DeletePendingAggregationRequestResponse {}
export interface DeleteRemediationConfigurationRequest {
  ConfigRuleName: string;
  ResourceType?: string;
}
export interface DeleteRemediationConfigurationResponse {}
export type StringWithCharLimit256 = string;
export type StringWithCharLimit1024 = string;
export interface RemediationExceptionResourceKey {
  ResourceType?: string;
  ResourceId?: string;
}
export type RemediationExceptionResourceKeys = RemediationExceptionResourceKey[];
export interface DeleteRemediationExceptionsRequest {
  ConfigRuleName: string;
  ResourceKeys: RemediationExceptionResourceKey[];
}
export interface FailedDeleteRemediationExceptionsBatch {
  FailureMessage?: string;
  FailedItems?: RemediationExceptionResourceKey[];
}
export type FailedDeleteRemediationExceptionsBatches = FailedDeleteRemediationExceptionsBatch[];
export interface DeleteRemediationExceptionsResponse {
  FailedBatches?: FailedDeleteRemediationExceptionsBatch[];
}
export type ResourceTypeString = string;
export interface DeleteResourceConfigRequest {
  ResourceType: string;
  ResourceId: string;
}
export interface DeleteResourceConfigResponse {}
export type RetentionConfigurationName = string;
export interface DeleteRetentionConfigurationRequest {
  RetentionConfigurationName: string;
}
export interface DeleteRetentionConfigurationResponse {}
export interface DeleteServiceLinkedConfigurationRecorderRequest {
  ServicePrincipal?: string;
  Arn?: string;
}
export interface DeleteServiceLinkedConfigurationRecorderResponse {
  Arn: string;
  Name: string;
}
export type QueryName = string;
export interface DeleteStoredQueryRequest {
  QueryName: string;
}
export interface DeleteStoredQueryResponse {}
export interface DeliverConfigSnapshotRequest {
  deliveryChannelName: string;
}
export interface DeliverConfigSnapshotResponse {
  configSnapshotId?: string;
}
export type ComplianceType =
  | "COMPLIANT"
  | "NON_COMPLIANT"
  | "NOT_APPLICABLE"
  | "INSUFFICIENT_DATA"
  | (string & {});
export interface ConfigRuleComplianceFilters {
  ConfigRuleName?: string;
  ComplianceType?: ComplianceType;
  AccountId?: string;
  AwsRegion?: string;
}
export type GroupByAPILimit = number;
export type NextToken = string;
export interface DescribeAggregateComplianceByConfigRulesRequest {
  ConfigurationAggregatorName: string;
  Filters?: ConfigRuleComplianceFilters;
  Limit?: number;
  NextToken?: string;
}
export interface ComplianceContributorCount {
  CappedCount?: number;
  CapExceeded?: boolean;
}
export interface Compliance {
  ComplianceType?: ComplianceType;
  ComplianceContributorCount?: ComplianceContributorCount;
}
export interface AggregateComplianceByConfigRule {
  ConfigRuleName?: string;
  Compliance?: Compliance;
  AccountId?: string;
  AwsRegion?: string;
}
export type AggregateComplianceByConfigRuleList = AggregateComplianceByConfigRule[];
export interface DescribeAggregateComplianceByConfigRulesResponse {
  AggregateComplianceByConfigRules?: AggregateComplianceByConfigRule[];
  NextToken?: string;
}
export type ConformancePackComplianceType =
  | "COMPLIANT"
  | "NON_COMPLIANT"
  | "INSUFFICIENT_DATA"
  | (string & {});
export interface AggregateConformancePackComplianceFilters {
  ConformancePackName?: string;
  ComplianceType?: ConformancePackComplianceType;
  AccountId?: string;
  AwsRegion?: string;
}
export type Limit = number;
export interface DescribeAggregateComplianceByConformancePacksRequest {
  ConfigurationAggregatorName: string;
  Filters?: AggregateConformancePackComplianceFilters;
  Limit?: number;
  NextToken?: string;
}
export interface AggregateConformancePackCompliance {
  ComplianceType?: ConformancePackComplianceType;
  CompliantRuleCount?: number;
  NonCompliantRuleCount?: number;
  TotalRuleCount?: number;
}
export interface AggregateComplianceByConformancePack {
  ConformancePackName?: string;
  Compliance?: AggregateConformancePackCompliance;
  AccountId?: string;
  AwsRegion?: string;
}
export type AggregateComplianceByConformancePackList = AggregateComplianceByConformancePack[];
export interface DescribeAggregateComplianceByConformancePacksResponse {
  AggregateComplianceByConformancePacks?: AggregateComplianceByConformancePack[];
  NextToken?: string;
}
export interface DescribeAggregationAuthorizationsRequest {
  Limit?: number;
  NextToken?: string;
}
export interface AggregationAuthorization {
  AggregationAuthorizationArn?: string;
  AuthorizedAccountId?: string;
  AuthorizedAwsRegion?: string;
  CreationTime?: Date;
}
export type AggregationAuthorizationList = AggregationAuthorization[];
export interface DescribeAggregationAuthorizationsResponse {
  AggregationAuthorizations?: AggregationAuthorization[];
  NextToken?: string;
}
export type ConfigRuleNames = string[];
export type ComplianceTypes = ComplianceType[];
export interface DescribeComplianceByConfigRuleRequest {
  ConfigRuleNames?: string[];
  ComplianceTypes?: ComplianceType[];
  NextToken?: string;
}
export interface ComplianceByConfigRule {
  ConfigRuleName?: string;
  Compliance?: Compliance;
}
export type ComplianceByConfigRules = ComplianceByConfigRule[];
export interface DescribeComplianceByConfigRuleResponse {
  ComplianceByConfigRules?: ComplianceByConfigRule[];
  NextToken?: string;
}
export type BaseResourceId = string;
export interface DescribeComplianceByResourceRequest {
  ResourceType?: string;
  ResourceId?: string;
  ComplianceTypes?: ComplianceType[];
  Limit?: number;
  NextToken?: string;
}
export interface ComplianceByResource {
  ResourceType?: string;
  ResourceId?: string;
  Compliance?: Compliance;
}
export type ComplianceByResources = ComplianceByResource[];
export interface DescribeComplianceByResourceResponse {
  ComplianceByResources?: ComplianceByResource[];
  NextToken?: string;
}
export type RuleLimit = number;
export interface DescribeConfigRuleEvaluationStatusRequest {
  ConfigRuleNames?: string[];
  NextToken?: string;
  Limit?: number;
}
export interface ConfigRuleEvaluationStatus {
  ConfigRuleName?: string;
  ConfigRuleArn?: string;
  ConfigRuleId?: string;
  LastSuccessfulInvocationTime?: Date;
  LastFailedInvocationTime?: Date;
  LastSuccessfulEvaluationTime?: Date;
  LastFailedEvaluationTime?: Date;
  FirstActivatedTime?: Date;
  LastDeactivatedTime?: Date;
  LastErrorCode?: string;
  LastErrorMessage?: string;
  FirstEvaluationStarted?: boolean;
  LastDebugLogDeliveryStatus?: string;
  LastDebugLogDeliveryStatusReason?: string;
  LastDebugLogDeliveryTime?: Date;
}
export type ConfigRuleEvaluationStatusList = ConfigRuleEvaluationStatus[];
export interface DescribeConfigRuleEvaluationStatusResponse {
  ConfigRulesEvaluationStatus?: ConfigRuleEvaluationStatus[];
  NextToken?: string;
}
export type EvaluationMode = "DETECTIVE" | "PROACTIVE" | (string & {});
export type RuleEvaluationVisibility = "EXTERNAL" | "INTERNAL" | (string & {});
export interface DescribeConfigRulesFilters {
  EvaluationMode?: EvaluationMode;
  RuleEvaluationVisibility?: RuleEvaluationVisibility;
}
export interface DescribeConfigRulesRequest {
  ConfigRuleNames?: string[];
  Filters?: DescribeConfigRulesFilters;
  NextToken?: string;
}
export type EmptiableStringWithCharLimit256 = string;
export type ComplianceResourceTypes = string[];
export type StringWithCharLimit128 = string;
export type ServicePrincipals = string[];
export interface Scope {
  ComplianceResourceTypes?: string[];
  TagKey?: string;
  TagValue?: string;
  ComplianceResourceId?: string;
  ServicePrincipals?: string[];
}
export type Owner = "CUSTOM_LAMBDA" | "AWS" | "CUSTOM_POLICY" | (string & {});
export type EventSource = "aws.config" | (string & {});
export type MessageType =
  | "ConfigurationItemChangeNotification"
  | "ConfigurationSnapshotDeliveryCompleted"
  | "ScheduledNotification"
  | "OversizedConfigurationItemChangeNotification"
  | (string & {});
export type MaximumExecutionFrequency =
  | "One_Hour"
  | "Three_Hours"
  | "Six_Hours"
  | "Twelve_Hours"
  | "TwentyFour_Hours"
  | (string & {});
export interface SourceDetail {
  EventSource?: EventSource;
  MessageType?: MessageType;
  MaximumExecutionFrequency?: MaximumExecutionFrequency;
}
export type SourceDetails = SourceDetail[];
export type PolicyRuntime = string;
export type PolicyText = string;
export interface CustomPolicyDetails {
  PolicyRuntime: string;
  PolicyText: string;
  EnableDebugLogDelivery?: boolean;
}
export interface Source {
  Owner: Owner;
  SourceIdentifier?: string;
  SourceDetails?: SourceDetail[];
  CustomPolicyDetails?: CustomPolicyDetails;
}
export type ConfigRuleState =
  | "ACTIVE"
  | "DELETING"
  | "DELETING_RESULTS"
  | "EVALUATING"
  | (string & {});
export interface EvaluationModeConfiguration {
  Mode?: EvaluationMode;
}
export type EvaluationModes = EvaluationModeConfiguration[];
export interface ConfigRule {
  ConfigRuleName?: string;
  ConfigRuleArn?: string;
  ConfigRuleId?: string;
  Description?: string;
  Scope?: Scope;
  Source: Source;
  InputParameters?: string;
  MaximumExecutionFrequency?: MaximumExecutionFrequency;
  ConfigRuleState?: ConfigRuleState;
  CreatedBy?: string;
  EvaluationModes?: EvaluationModeConfiguration[];
  RuleEvaluationVisibility?: RuleEvaluationVisibility;
}
export type ConfigRules = ConfigRule[];
export interface DescribeConfigRulesResponse {
  ConfigRules?: ConfigRule[];
  NextToken?: string;
}
export type ConfigurationAggregatorNameList = string[];
export interface DescribeConfigurationAggregatorsRequest {
  ConfigurationAggregatorNames?: string[];
  NextToken?: string;
  Limit?: number;
}
export type ConfigurationAggregatorArn = string;
export type AccountAggregationSourceAccountList = string[];
export type AggregatorRegionList = string[];
export interface AccountAggregationSource {
  AccountIds: string[];
  AllAwsRegions?: boolean;
  AwsRegions?: string[];
}
export type AccountAggregationSourceList = AccountAggregationSource[];
export interface OrganizationAggregationSource {
  RoleArn: string;
  AwsRegions?: string[];
  AllAwsRegions?: boolean;
}
export type AggregatorFilterType = "INCLUDE" | (string & {});
export type ResourceTypeValue = string;
export type ResourceTypeValueList = string[];
export interface AggregatorFilterResourceType {
  Type?: AggregatorFilterType;
  Value?: string[];
}
export type ServicePrincipalValue = string;
export type ServicePrincipalValueList = string[];
export interface AggregatorFilterServicePrincipal {
  Type?: AggregatorFilterType;
  Value?: string[];
}
export interface AggregatorFilters {
  ResourceType?: AggregatorFilterResourceType;
  ServicePrincipal?: AggregatorFilterServicePrincipal;
}
export interface ConfigurationAggregator {
  ConfigurationAggregatorName?: string;
  ConfigurationAggregatorArn?: string;
  AccountAggregationSources?: AccountAggregationSource[];
  OrganizationAggregationSource?: OrganizationAggregationSource;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  CreatedBy?: string;
  AggregatorFilters?: AggregatorFilters;
}
export type ConfigurationAggregatorList = ConfigurationAggregator[];
export interface DescribeConfigurationAggregatorsResponse {
  ConfigurationAggregators?: ConfigurationAggregator[];
  NextToken?: string;
}
export type AggregatedSourceStatusType = "FAILED" | "SUCCEEDED" | "OUTDATED" | (string & {});
export type AggregatedSourceStatusTypeList = AggregatedSourceStatusType[];
export interface DescribeConfigurationAggregatorSourcesStatusRequest {
  ConfigurationAggregatorName: string;
  UpdateStatus?: AggregatedSourceStatusType[];
  NextToken?: string;
  Limit?: number;
}
export type AggregatedSourceType = "ACCOUNT" | "ORGANIZATION" | (string & {});
export interface AggregatedSourceStatus {
  SourceId?: string;
  SourceType?: AggregatedSourceType;
  AwsRegion?: string;
  LastUpdateStatus?: AggregatedSourceStatusType;
  LastUpdateTime?: Date;
  LastErrorCode?: string;
  LastErrorMessage?: string;
}
export type AggregatedSourceStatusList = AggregatedSourceStatus[];
export interface DescribeConfigurationAggregatorSourcesStatusResponse {
  AggregatedSourceStatusList?: AggregatedSourceStatus[];
  NextToken?: string;
}
export type ConfigurationRecorderNameList = string[];
export interface DescribeConfigurationRecordersRequest {
  ConfigurationRecorderNames?: string[];
  ServicePrincipal?: string;
  Arn?: string;
}
export type ConfigurationRecorderList = ConfigurationRecorder[];
export interface DescribeConfigurationRecordersResponse {
  ConfigurationRecorders?: ConfigurationRecorder[];
}
export interface DescribeConfigurationRecorderStatusRequest {
  ConfigurationRecorderNames?: string[];
  ServicePrincipal?: string;
  Arn?: string;
}
export type RecorderStatus = "Pending" | "Success" | "Failure" | "NotApplicable" | (string & {});
export interface ConfigurationRecorderStatus {
  arn?: string;
  name?: string;
  lastStartTime?: Date;
  lastStopTime?: Date;
  recording?: boolean;
  lastStatus?: RecorderStatus;
  lastErrorCode?: string;
  lastErrorMessage?: string;
  lastStatusChangeTime?: Date;
  servicePrincipal?: string;
}
export type ConfigurationRecorderStatusList = ConfigurationRecorderStatus[];
export interface DescribeConfigurationRecorderStatusResponse {
  ConfigurationRecordersStatus?: ConfigurationRecorderStatus[];
}
export type ConformancePackConfigRuleNames = string[];
export interface ConformancePackComplianceFilters {
  ConfigRuleNames?: string[];
  ComplianceType?: ConformancePackComplianceType;
}
export type DescribeConformancePackComplianceLimit = number;
export interface DescribeConformancePackComplianceRequest {
  ConformancePackName: string;
  Filters?: ConformancePackComplianceFilters;
  Limit?: number;
  NextToken?: string;
}
export type ControlsList = string[];
export interface ConformancePackRuleCompliance {
  ConfigRuleName?: string;
  ComplianceType?: ConformancePackComplianceType;
  Controls?: string[];
}
export type ConformancePackRuleComplianceList = ConformancePackRuleCompliance[];
export interface DescribeConformancePackComplianceResponse {
  ConformancePackName: string;
  ConformancePackRuleComplianceList: ConformancePackRuleCompliance[];
  NextToken?: string;
}
export type ConformancePackNamesList = string[];
export type PageSizeLimit = number;
export interface DescribeConformancePacksRequest {
  ConformancePackNames?: string[];
  Limit?: number;
  NextToken?: string;
}
export type ConformancePackArn = string;
export type ConformancePackId = string;
export type DeliveryS3Bucket = string;
export type DeliveryS3KeyPrefix = string;
export type ParameterName = string;
export type ParameterValue = string;
export interface ConformancePackInputParameter {
  ParameterName: string;
  ParameterValue: string;
}
export type ConformancePackInputParameters = ConformancePackInputParameter[];
export type SSMDocumentName = string;
export type SSMDocumentVersion = string;
export interface TemplateSSMDocumentDetails {
  DocumentName: string;
  DocumentVersion?: string;
}
export interface ConformancePackDetail {
  ConformancePackName: string;
  ConformancePackArn: string;
  ConformancePackId: string;
  DeliveryS3Bucket?: string;
  DeliveryS3KeyPrefix?: string;
  ConformancePackInputParameters?: ConformancePackInputParameter[];
  LastUpdateRequestedTime?: Date;
  CreatedBy?: string;
  TemplateSSMDocumentDetails?: TemplateSSMDocumentDetails;
}
export type ConformancePackDetailList = ConformancePackDetail[];
export interface DescribeConformancePacksResponse {
  ConformancePackDetails?: ConformancePackDetail[];
  NextToken?: string;
}
export interface DescribeConformancePackStatusRequest {
  ConformancePackNames?: string[];
  Limit?: number;
  NextToken?: string;
}
export type ConformancePackState =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export type StackArn = string;
export type ConformancePackStatusReason = string;
export interface ConformancePackStatusDetail {
  ConformancePackName: string;
  ConformancePackId: string;
  ConformancePackArn: string;
  ConformancePackState: ConformancePackState;
  StackArn: string;
  ConformancePackStatusReason?: string;
  LastUpdateRequestedTime: Date;
  LastUpdateCompletedTime?: Date;
}
export type ConformancePackStatusDetailsList = ConformancePackStatusDetail[];
export interface DescribeConformancePackStatusResponse {
  ConformancePackStatusDetails?: ConformancePackStatusDetail[];
  NextToken?: string;
}
export type DeliveryChannelNameList = string[];
export interface DescribeDeliveryChannelsRequest {
  DeliveryChannelNames?: string[];
}
export interface ConfigSnapshotDeliveryProperties {
  deliveryFrequency?: MaximumExecutionFrequency;
}
export interface DeliveryChannel {
  name?: string;
  s3BucketName?: string;
  s3KeyPrefix?: string;
  s3KmsKeyArn?: string;
  snsTopicARN?: string;
  configSnapshotDeliveryProperties?: ConfigSnapshotDeliveryProperties;
}
export type DeliveryChannelList = DeliveryChannel[];
export interface DescribeDeliveryChannelsResponse {
  DeliveryChannels?: DeliveryChannel[];
}
export interface DescribeDeliveryChannelStatusRequest {
  DeliveryChannelNames?: string[];
}
export type DeliveryStatus = "Success" | "Failure" | "Not_Applicable" | (string & {});
export interface ConfigExportDeliveryInfo {
  lastStatus?: DeliveryStatus;
  lastErrorCode?: string;
  lastErrorMessage?: string;
  lastAttemptTime?: Date;
  lastSuccessfulTime?: Date;
  nextDeliveryTime?: Date;
}
export interface ConfigStreamDeliveryInfo {
  lastStatus?: DeliveryStatus;
  lastErrorCode?: string;
  lastErrorMessage?: string;
  lastStatusChangeTime?: Date;
}
export interface DeliveryChannelStatus {
  name?: string;
  configSnapshotDeliveryInfo?: ConfigExportDeliveryInfo;
  configHistoryDeliveryInfo?: ConfigExportDeliveryInfo;
  configStreamDeliveryInfo?: ConfigStreamDeliveryInfo;
}
export type DeliveryChannelStatusList = DeliveryChannelStatus[];
export interface DescribeDeliveryChannelStatusResponse {
  DeliveryChannelsStatus?: DeliveryChannelStatus[];
}
export type OrganizationConfigRuleNames = string[];
export type CosmosPageLimit = number;
export interface DescribeOrganizationConfigRulesRequest {
  OrganizationConfigRuleNames?: string[];
  Limit?: number;
  NextToken?: string;
}
export type StringWithCharLimit256Min0 = string;
export type ResourceTypesScope = string[];
export type StringWithCharLimit768 = string;
export interface OrganizationManagedRuleMetadata {
  Description?: string;
  RuleIdentifier: string;
  InputParameters?: string;
  MaximumExecutionFrequency?: MaximumExecutionFrequency;
  ResourceTypesScope?: string[];
  ResourceIdScope?: string;
  TagKeyScope?: string;
  TagValueScope?: string;
}
export type OrganizationConfigRuleTriggerType =
  | "ConfigurationItemChangeNotification"
  | "OversizedConfigurationItemChangeNotification"
  | "ScheduledNotification"
  | (string & {});
export type OrganizationConfigRuleTriggerTypes = OrganizationConfigRuleTriggerType[];
export interface OrganizationCustomRuleMetadata {
  Description?: string;
  LambdaFunctionArn: string;
  OrganizationConfigRuleTriggerTypes: OrganizationConfigRuleTriggerType[];
  InputParameters?: string;
  MaximumExecutionFrequency?: MaximumExecutionFrequency;
  ResourceTypesScope?: string[];
  ResourceIdScope?: string;
  TagKeyScope?: string;
  TagValueScope?: string;
}
export type ExcludedAccounts = string[];
export type OrganizationConfigRuleTriggerTypeNoSN =
  | "ConfigurationItemChangeNotification"
  | "OversizedConfigurationItemChangeNotification"
  | (string & {});
export type OrganizationConfigRuleTriggerTypeNoSNs = OrganizationConfigRuleTriggerTypeNoSN[];
export type DebugLogDeliveryAccounts = string[];
export interface OrganizationCustomPolicyRuleMetadataNoPolicy {
  Description?: string;
  OrganizationConfigRuleTriggerTypes?: OrganizationConfigRuleTriggerTypeNoSN[];
  InputParameters?: string;
  MaximumExecutionFrequency?: MaximumExecutionFrequency;
  ResourceTypesScope?: string[];
  ResourceIdScope?: string;
  TagKeyScope?: string;
  TagValueScope?: string;
  PolicyRuntime?: string;
  DebugLogDeliveryAccounts?: string[];
}
export interface OrganizationConfigRule {
  OrganizationConfigRuleName: string;
  OrganizationConfigRuleArn: string;
  OrganizationManagedRuleMetadata?: OrganizationManagedRuleMetadata;
  OrganizationCustomRuleMetadata?: OrganizationCustomRuleMetadata;
  ExcludedAccounts?: string[];
  LastUpdateTime?: Date;
  OrganizationCustomPolicyRuleMetadata?: OrganizationCustomPolicyRuleMetadataNoPolicy;
}
export type OrganizationConfigRules = OrganizationConfigRule[];
export interface DescribeOrganizationConfigRulesResponse {
  OrganizationConfigRules?: OrganizationConfigRule[];
  NextToken?: string;
}
export interface DescribeOrganizationConfigRuleStatusesRequest {
  OrganizationConfigRuleNames?: string[];
  Limit?: number;
  NextToken?: string;
}
export type OrganizationRuleStatus =
  | "CREATE_SUCCESSFUL"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_SUCCESSFUL"
  | "DELETE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "UPDATE_SUCCESSFUL"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | (string & {});
export interface OrganizationConfigRuleStatus {
  OrganizationConfigRuleName: string;
  OrganizationRuleStatus: OrganizationRuleStatus;
  ErrorCode?: string;
  ErrorMessage?: string;
  LastUpdateTime?: Date;
}
export type OrganizationConfigRuleStatuses = OrganizationConfigRuleStatus[];
export interface DescribeOrganizationConfigRuleStatusesResponse {
  OrganizationConfigRuleStatuses?: OrganizationConfigRuleStatus[];
  NextToken?: string;
}
export type OrganizationConformancePackNames = string[];
export interface DescribeOrganizationConformancePacksRequest {
  OrganizationConformancePackNames?: string[];
  Limit?: number;
  NextToken?: string;
}
export interface OrganizationConformancePack {
  OrganizationConformancePackName: string;
  OrganizationConformancePackArn: string;
  DeliveryS3Bucket?: string;
  DeliveryS3KeyPrefix?: string;
  ConformancePackInputParameters?: ConformancePackInputParameter[];
  ExcludedAccounts?: string[];
  LastUpdateTime: Date;
}
export type OrganizationConformancePacks = OrganizationConformancePack[];
export interface DescribeOrganizationConformancePacksResponse {
  OrganizationConformancePacks?: OrganizationConformancePack[];
  NextToken?: string;
}
export interface DescribeOrganizationConformancePackStatusesRequest {
  OrganizationConformancePackNames?: string[];
  Limit?: number;
  NextToken?: string;
}
export type OrganizationResourceStatus =
  | "CREATE_SUCCESSFUL"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_SUCCESSFUL"
  | "DELETE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "UPDATE_SUCCESSFUL"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | (string & {});
export interface OrganizationConformancePackStatus {
  OrganizationConformancePackName: string;
  Status: OrganizationResourceStatus;
  ErrorCode?: string;
  ErrorMessage?: string;
  LastUpdateTime?: Date;
}
export type OrganizationConformancePackStatuses = OrganizationConformancePackStatus[];
export interface DescribeOrganizationConformancePackStatusesResponse {
  OrganizationConformancePackStatuses?: OrganizationConformancePackStatus[];
  NextToken?: string;
}
export type DescribePendingAggregationRequestsLimit = number;
export interface DescribePendingAggregationRequestsRequest {
  Limit?: number;
  NextToken?: string;
}
export interface PendingAggregationRequest {
  RequesterAccountId?: string;
  RequesterAwsRegion?: string;
}
export type PendingAggregationRequestList = PendingAggregationRequest[];
export interface DescribePendingAggregationRequestsResponse {
  PendingAggregationRequests?: PendingAggregationRequest[];
  NextToken?: string;
}
export interface DescribeRemediationConfigurationsRequest {
  ConfigRuleNames: string[];
}
export type RemediationTargetType = "SSM_DOCUMENT" | (string & {});
export type ResourceValueType = "RESOURCE_ID" | (string & {});
export interface ResourceValue {
  Value: ResourceValueType;
}
export type StaticParameterValues = string[];
export interface StaticValue {
  Values: string[];
}
export interface RemediationParameterValue {
  ResourceValue?: ResourceValue;
  StaticValue?: StaticValue;
}
export type RemediationParameters = { [key: string]: RemediationParameterValue | undefined };
export type Percentage = number;
export interface SsmControls {
  ConcurrentExecutionRatePercentage?: number;
  ErrorPercentage?: number;
}
export interface ExecutionControls {
  SsmControls?: SsmControls;
}
export type AutoRemediationAttempts = number;
export type AutoRemediationAttemptSeconds = number;
export interface RemediationConfiguration {
  ConfigRuleName: string;
  TargetType: RemediationTargetType;
  TargetId: string;
  TargetVersion?: string;
  Parameters?: { [key: string]: RemediationParameterValue | undefined };
  ResourceType?: string;
  Automatic?: boolean;
  ExecutionControls?: ExecutionControls;
  MaximumAutomaticAttempts?: number;
  RetryAttemptSeconds?: number;
  Arn?: string;
  CreatedByService?: string;
}
export type RemediationConfigurations = RemediationConfiguration[];
export interface DescribeRemediationConfigurationsResponse {
  RemediationConfigurations?: RemediationConfiguration[];
}
export interface DescribeRemediationExceptionsRequest {
  ConfigRuleName: string;
  ResourceKeys?: RemediationExceptionResourceKey[];
  Limit?: number;
  NextToken?: string;
}
export interface RemediationException {
  ConfigRuleName: string;
  ResourceType: string;
  ResourceId: string;
  Message?: string;
  ExpirationTime?: Date;
}
export type RemediationExceptions = RemediationException[];
export interface DescribeRemediationExceptionsResponse {
  RemediationExceptions?: RemediationException[];
  NextToken?: string;
}
export interface DescribeRemediationExecutionStatusRequest {
  ConfigRuleName: string;
  ResourceKeys?: ResourceKey[];
  Limit?: number;
  NextToken?: string;
}
export type RemediationExecutionState =
  | "QUEUED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "UNKNOWN"
  | (string & {});
export type RemediationExecutionStepState =
  | "SUCCEEDED"
  | "PENDING"
  | "FAILED"
  | "IN_PROGRESS"
  | "EXITED"
  | "UNKNOWN"
  | (string & {});
export interface RemediationExecutionStep {
  Name?: string;
  State?: RemediationExecutionStepState;
  ErrorMessage?: string;
  StartTime?: Date;
  StopTime?: Date;
}
export type RemediationExecutionSteps = RemediationExecutionStep[];
export interface RemediationExecutionStatus {
  ResourceKey?: ResourceKey;
  State?: RemediationExecutionState;
  StepDetails?: RemediationExecutionStep[];
  InvocationTime?: Date;
  LastUpdatedTime?: Date;
}
export type RemediationExecutionStatuses = RemediationExecutionStatus[];
export interface DescribeRemediationExecutionStatusResponse {
  RemediationExecutionStatuses?: RemediationExecutionStatus[];
  NextToken?: string;
}
export type RetentionConfigurationNameList = string[];
export interface DescribeRetentionConfigurationsRequest {
  RetentionConfigurationNames?: string[];
  NextToken?: string;
}
export type RetentionPeriodInDays = number;
export interface RetentionConfiguration {
  Name: string;
  RetentionPeriodInDays: number;
}
export type RetentionConfigurationList = RetentionConfiguration[];
export interface DescribeRetentionConfigurationsResponse {
  RetentionConfigurations?: RetentionConfiguration[];
  NextToken?: string;
}
export interface DisassociateResourceTypesRequest {
  ConfigurationRecorderArn: string;
  ResourceTypes: ResourceType[];
}
export interface DisassociateResourceTypesResponse {
  ConfigurationRecorder: ConfigurationRecorder;
}
export interface GetAggregateComplianceDetailsByConfigRuleRequest {
  ConfigurationAggregatorName: string;
  ConfigRuleName: string;
  AccountId: string;
  AwsRegion: string;
  ComplianceType?: ComplianceType;
  Limit?: number;
  NextToken?: string;
}
export interface EvaluationResultQualifier {
  ConfigRuleName?: string;
  ResourceType?: string;
  ResourceId?: string;
  EvaluationMode?: EvaluationMode;
}
export type ResourceEvaluationId = string;
export interface EvaluationResultIdentifier {
  EvaluationResultQualifier?: EvaluationResultQualifier;
  OrderingTimestamp?: Date;
  ResourceEvaluationId?: string;
}
export interface AggregateEvaluationResult {
  EvaluationResultIdentifier?: EvaluationResultIdentifier;
  ComplianceType?: ComplianceType;
  ResultRecordedTime?: Date;
  ConfigRuleInvokedTime?: Date;
  Annotation?: string;
  AccountId?: string;
  AwsRegion?: string;
}
export type AggregateEvaluationResultList = AggregateEvaluationResult[];
export interface GetAggregateComplianceDetailsByConfigRuleResponse {
  AggregateEvaluationResults?: AggregateEvaluationResult[];
  NextToken?: string;
}
export interface ConfigRuleComplianceSummaryFilters {
  AccountId?: string;
  AwsRegion?: string;
}
export type ConfigRuleComplianceSummaryGroupKey = "ACCOUNT_ID" | "AWS_REGION" | (string & {});
export interface GetAggregateConfigRuleComplianceSummaryRequest {
  ConfigurationAggregatorName: string;
  Filters?: ConfigRuleComplianceSummaryFilters;
  GroupByKey?: ConfigRuleComplianceSummaryGroupKey;
  Limit?: number;
  NextToken?: string;
}
export interface ComplianceSummary {
  CompliantResourceCount?: ComplianceContributorCount;
  NonCompliantResourceCount?: ComplianceContributorCount;
  ComplianceSummaryTimestamp?: Date;
}
export interface AggregateComplianceCount {
  GroupName?: string;
  ComplianceSummary?: ComplianceSummary;
}
export type AggregateComplianceCountList = AggregateComplianceCount[];
export interface GetAggregateConfigRuleComplianceSummaryResponse {
  GroupByKey?: string;
  AggregateComplianceCounts?: AggregateComplianceCount[];
  NextToken?: string;
}
export interface AggregateConformancePackComplianceSummaryFilters {
  AccountId?: string;
  AwsRegion?: string;
}
export type AggregateConformancePackComplianceSummaryGroupKey =
  | "ACCOUNT_ID"
  | "AWS_REGION"
  | (string & {});
export interface GetAggregateConformancePackComplianceSummaryRequest {
  ConfigurationAggregatorName: string;
  Filters?: AggregateConformancePackComplianceSummaryFilters;
  GroupByKey?: AggregateConformancePackComplianceSummaryGroupKey;
  Limit?: number;
  NextToken?: string;
}
export interface AggregateConformancePackComplianceCount {
  CompliantConformancePackCount?: number;
  NonCompliantConformancePackCount?: number;
}
export interface AggregateConformancePackComplianceSummary {
  ComplianceSummary?: AggregateConformancePackComplianceCount;
  GroupName?: string;
}
export type AggregateConformancePackComplianceSummaryList =
  AggregateConformancePackComplianceSummary[];
export interface GetAggregateConformancePackComplianceSummaryResponse {
  AggregateConformancePackComplianceSummaries?: AggregateConformancePackComplianceSummary[];
  GroupByKey?: string;
  NextToken?: string;
}
export interface ResourceCountFilters {
  ResourceType?: ResourceType;
  AccountId?: string;
  Region?: string;
}
export type ResourceCountGroupKey = "RESOURCE_TYPE" | "ACCOUNT_ID" | "AWS_REGION" | (string & {});
export interface GetAggregateDiscoveredResourceCountsRequest {
  ConfigurationAggregatorName: string;
  Filters?: ResourceCountFilters;
  GroupByKey?: ResourceCountGroupKey;
  Limit?: number;
  NextToken?: string;
}
export interface GroupedResourceCount {
  GroupName: string;
  ResourceCount: number;
}
export type GroupedResourceCountList = GroupedResourceCount[];
export interface GetAggregateDiscoveredResourceCountsResponse {
  TotalDiscoveredResources: number;
  GroupByKey?: string;
  GroupedResourceCounts?: GroupedResourceCount[];
  NextToken?: string;
}
export interface GetAggregateResourceConfigRequest {
  ConfigurationAggregatorName: string;
  ResourceIdentifier: AggregateResourceIdentifier;
}
export type ConfigurationItemMD5Hash = string;
export type Name = string;
export type Value = string;
export type Tags = { [key: string]: string | undefined };
export type RelatedEvent = string;
export type RelatedEventList = string[];
export type RelationshipName = string;
export interface Relationship {
  resourceType?: ResourceType;
  resourceId?: string;
  resourceName?: string;
  relationshipName?: string;
}
export type RelationshipList = Relationship[];
export interface ConfigurationItem {
  version?: string;
  accountId?: string;
  configurationItemCaptureTime?: Date;
  configurationItemStatus?: ConfigurationItemStatus;
  configurationStateId?: string;
  configurationItemMD5Hash?: string;
  arn?: string;
  resourceType?: ResourceType;
  resourceId?: string;
  resourceName?: string;
  awsRegion?: string;
  availabilityZone?: string;
  resourceCreationTime?: Date;
  tags?: { [key: string]: string | undefined };
  relatedEvents?: string[];
  relationships?: Relationship[];
  configuration?: string;
  supplementaryConfiguration?: { [key: string]: string | undefined };
  recordingFrequency?: RecordingFrequency;
  configurationItemDeliveryTime?: Date;
}
export interface GetAggregateResourceConfigResponse {
  ConfigurationItem?: ConfigurationItem;
}
export interface GetComplianceDetailsByConfigRuleRequest {
  ConfigRuleName: string;
  ComplianceTypes?: ComplianceType[];
  Limit?: number;
  NextToken?: string;
}
export interface EvaluationResult {
  EvaluationResultIdentifier?: EvaluationResultIdentifier;
  ComplianceType?: ComplianceType;
  ResultRecordedTime?: Date;
  ConfigRuleInvokedTime?: Date;
  Annotation?: string;
  ResultToken?: string;
}
export type EvaluationResults = EvaluationResult[];
export interface GetComplianceDetailsByConfigRuleResponse {
  EvaluationResults?: EvaluationResult[];
  NextToken?: string;
}
export interface GetComplianceDetailsByResourceRequest {
  ResourceType?: string;
  ResourceId?: string;
  ComplianceTypes?: ComplianceType[];
  NextToken?: string;
  ResourceEvaluationId?: string;
}
export interface GetComplianceDetailsByResourceResponse {
  EvaluationResults?: EvaluationResult[];
  NextToken?: string;
}
export interface GetComplianceSummaryByConfigRuleRequest {}
export interface GetComplianceSummaryByConfigRuleResponse {
  ComplianceSummary?: ComplianceSummary;
}
export type ResourceTypes = string[];
export interface GetComplianceSummaryByResourceTypeRequest {
  ResourceTypes?: string[];
}
export interface ComplianceSummaryByResourceType {
  ResourceType?: string;
  ComplianceSummary?: ComplianceSummary;
}
export type ComplianceSummariesByResourceType = ComplianceSummaryByResourceType[];
export interface GetComplianceSummaryByResourceTypeResponse {
  ComplianceSummariesByResourceType?: ComplianceSummaryByResourceType[];
}
export type ConformancePackComplianceResourceIds = string[];
export interface ConformancePackEvaluationFilters {
  ConfigRuleNames?: string[];
  ComplianceType?: ConformancePackComplianceType;
  ResourceType?: string;
  ResourceIds?: string[];
}
export type GetConformancePackComplianceDetailsLimit = number;
export interface GetConformancePackComplianceDetailsRequest {
  ConformancePackName: string;
  Filters?: ConformancePackEvaluationFilters;
  Limit?: number;
  NextToken?: string;
}
export type Annotation = string;
export interface ConformancePackEvaluationResult {
  ComplianceType: ConformancePackComplianceType;
  EvaluationResultIdentifier: EvaluationResultIdentifier;
  ConfigRuleInvokedTime: Date;
  ResultRecordedTime: Date;
  Annotation?: string;
}
export type ConformancePackRuleEvaluationResultsList = ConformancePackEvaluationResult[];
export interface GetConformancePackComplianceDetailsResponse {
  ConformancePackName: string;
  ConformancePackRuleEvaluationResults?: ConformancePackEvaluationResult[];
  NextToken?: string;
}
export type ConformancePackNamesToSummarizeList = string[];
export interface GetConformancePackComplianceSummaryRequest {
  ConformancePackNames: string[];
  Limit?: number;
  NextToken?: string;
}
export interface ConformancePackComplianceSummary {
  ConformancePackName: string;
  ConformancePackComplianceStatus: ConformancePackComplianceType;
}
export type ConformancePackComplianceSummaryList = ConformancePackComplianceSummary[];
export interface GetConformancePackComplianceSummaryResponse {
  ConformancePackComplianceSummaryList?: ConformancePackComplianceSummary[];
  NextToken?: string;
}
export interface GetConnectorRequest {
  Arn: string;
}
export type ConnectorName = string;
export type AzureTenantIdentifier = string;
export type AzureClientIdentifier = string;
export interface AzureConnectorConfiguration {
  tenantIdentifier: string;
  clientIdentifier: string;
}
export interface ConnectorConfiguration {
  azure?: AzureConnectorConfiguration;
}
export interface Connector {
  name: string;
  arn: string;
  connectorConfiguration: ConnectorConfiguration;
  createdTime: Date;
}
export interface GetConnectorResponse {
  Connector: Connector;
}
export interface GetCustomRulePolicyRequest {
  ConfigRuleName?: string;
}
export interface GetCustomRulePolicyResponse {
  PolicyText?: string;
}
export interface GetDiscoveredResourceCountsRequest {
  resourceTypes?: string[];
  limit?: number;
  nextToken?: string;
}
export interface ResourceCount {
  resourceType?: ResourceType;
  count?: number;
}
export type ResourceCounts = ResourceCount[];
export interface GetDiscoveredResourceCountsResponse {
  totalDiscoveredResources?: number;
  resourceCounts?: ResourceCount[];
  nextToken?: string;
}
export type MemberAccountRuleStatus =
  | "CREATE_SUCCESSFUL"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_SUCCESSFUL"
  | "DELETE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "UPDATE_SUCCESSFUL"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | (string & {});
export interface StatusDetailFilters {
  AccountId?: string;
  MemberAccountRuleStatus?: MemberAccountRuleStatus;
}
export interface GetOrganizationConfigRuleDetailedStatusRequest {
  OrganizationConfigRuleName: string;
  Filters?: StatusDetailFilters;
  Limit?: number;
  NextToken?: string;
}
export interface MemberAccountStatus {
  AccountId: string;
  ConfigRuleName: string;
  MemberAccountRuleStatus: MemberAccountRuleStatus;
  ErrorCode?: string;
  ErrorMessage?: string;
  LastUpdateTime?: Date;
}
export type OrganizationConfigRuleDetailedStatus = MemberAccountStatus[];
export interface GetOrganizationConfigRuleDetailedStatusResponse {
  OrganizationConfigRuleDetailedStatus?: MemberAccountStatus[];
  NextToken?: string;
}
export type OrganizationResourceDetailedStatus =
  | "CREATE_SUCCESSFUL"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_SUCCESSFUL"
  | "DELETE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "UPDATE_SUCCESSFUL"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | (string & {});
export interface OrganizationResourceDetailedStatusFilters {
  AccountId?: string;
  Status?: OrganizationResourceDetailedStatus;
}
export interface GetOrganizationConformancePackDetailedStatusRequest {
  OrganizationConformancePackName: string;
  Filters?: OrganizationResourceDetailedStatusFilters;
  Limit?: number;
  NextToken?: string;
}
export interface OrganizationConformancePackDetailedStatus {
  AccountId: string;
  ConformancePackName: string;
  Status: OrganizationResourceDetailedStatus;
  ErrorCode?: string;
  ErrorMessage?: string;
  LastUpdateTime?: Date;
}
export type OrganizationConformancePackDetailedStatuses =
  OrganizationConformancePackDetailedStatus[];
export interface GetOrganizationConformancePackDetailedStatusResponse {
  OrganizationConformancePackDetailedStatuses?: OrganizationConformancePackDetailedStatus[];
  NextToken?: string;
}
export interface GetOrganizationCustomRulePolicyRequest {
  OrganizationConfigRuleName: string;
}
export interface GetOrganizationCustomRulePolicyResponse {
  PolicyText?: string;
}
export type LaterTime = Date;
export type EarlierTime = Date;
export type ChronologicalOrder = "Reverse" | "Forward" | (string & {});
export interface GetResourceConfigHistoryRequest {
  resourceType: ResourceType;
  resourceId: string;
  laterTime?: Date;
  earlierTime?: Date;
  chronologicalOrder?: ChronologicalOrder;
  limit?: number;
  nextToken?: string;
}
export type ConfigurationItemList = ConfigurationItem[];
export interface GetResourceConfigHistoryResponse {
  configurationItems?: ConfigurationItem[];
  nextToken?: string;
}
export interface GetResourceEvaluationSummaryRequest {
  ResourceEvaluationId: string;
}
export type ResourceEvaluationStatus = "IN_PROGRESS" | "FAILED" | "SUCCEEDED" | (string & {});
export interface EvaluationStatus {
  Status: ResourceEvaluationStatus;
  FailureReason?: string;
}
export type EvaluationContextIdentifier = string;
export interface EvaluationContext {
  EvaluationContextIdentifier?: string;
}
export type ResourceConfiguration = string;
export type ResourceConfigurationSchemaType = "CFN_RESOURCE_SCHEMA" | (string & {});
export interface ResourceDetails {
  ResourceId: string;
  ResourceType: string;
  ResourceConfiguration: string;
  ResourceConfigurationSchemaType?: ResourceConfigurationSchemaType;
}
export interface GetResourceEvaluationSummaryResponse {
  ResourceEvaluationId?: string;
  EvaluationMode?: EvaluationMode;
  EvaluationStatus?: EvaluationStatus;
  EvaluationStartTimestamp?: Date;
  Compliance?: ComplianceType;
  EvaluationContext?: EvaluationContext;
  ResourceDetails?: ResourceDetails;
}
export interface GetStoredQueryRequest {
  QueryName: string;
}
export type QueryId = string;
export type QueryArn = string;
export type QueryDescription = string;
export type QueryExpression = string;
export interface StoredQuery {
  QueryId?: string;
  QueryArn?: string;
  QueryName: string;
  Description?: string;
  Expression?: string;
}
export interface GetStoredQueryResponse {
  StoredQuery?: StoredQuery;
}
export interface ResourceFilters {
  AccountId?: string;
  ResourceId?: string;
  ResourceName?: string;
  Region?: string;
}
export interface ListAggregateDiscoveredResourcesRequest {
  ConfigurationAggregatorName: string;
  ResourceType: ResourceType;
  Filters?: ResourceFilters;
  Limit?: number;
  NextToken?: string;
}
export type DiscoveredResourceIdentifierList = AggregateResourceIdentifier[];
export interface ListAggregateDiscoveredResourcesResponse {
  ResourceIdentifiers?: AggregateResourceIdentifier[];
  NextToken?: string;
}
export type ConfigurationRecorderFilterName = "recordingScope" | (string & {});
export type ConfigurationRecorderFilterValue = string;
export type ConfigurationRecorderFilterValues = string[];
export interface ConfigurationRecorderFilter {
  filterName?: ConfigurationRecorderFilterName;
  filterValue?: string[];
}
export type ConfigurationRecorderFilterList = ConfigurationRecorderFilter[];
export type MaxResults = number;
export interface ListConfigurationRecordersRequest {
  Filters?: ConfigurationRecorderFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type Provider = "AZURE" | (string & {});
export interface ConfigurationRecorderSummary {
  arn: string;
  name: string;
  servicePrincipal?: string;
  recordingScope: RecordingScope;
  provider?: Provider;
}
export type ConfigurationRecorderSummaries = ConfigurationRecorderSummary[];
export interface ListConfigurationRecordersResponse {
  ConfigurationRecorderSummaries: ConfigurationRecorderSummary[];
  NextToken?: string;
}
export type ConformancePackNameFilter = string[];
export interface ConformancePackComplianceScoresFilters {
  ConformancePackNames: string[];
}
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export type SortBy = "SCORE" | (string & {});
export interface ListConformancePackComplianceScoresRequest {
  Filters?: ConformancePackComplianceScoresFilters;
  SortOrder?: SortOrder;
  SortBy?: SortBy;
  Limit?: number;
  NextToken?: string;
}
export type ComplianceScore = string;
export type LastUpdatedTime = Date;
export interface ConformancePackComplianceScore {
  Score?: string;
  ConformancePackName?: string;
  LastUpdatedTime?: Date;
}
export type ConformancePackComplianceScores = ConformancePackComplianceScore[];
export interface ListConformancePackComplianceScoresResponse {
  NextToken?: string;
  ConformancePackComplianceScores: ConformancePackComplianceScore[];
}
export type ListConnectorsMaxResults = number;
export type ConnectorFilterName = "provider" | (string & {});
export type FilterValueList = string[];
export interface ConnectorFilter {
  filterName?: ConnectorFilterName;
  filterValues?: string[];
}
export type ConnectorFilterList = ConnectorFilter[];
export interface ListConnectorsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: ConnectorFilter[];
}
export interface ConnectorSummary {
  arn: string;
  name: string;
  provider: Provider;
  tenantIdentifier: string;
  createdTime: Date;
}
export type ConnectorSummaries = ConnectorSummary[];
export interface ListConnectorsResponse {
  ConnectorSummaries: ConnectorSummary[];
  NextToken?: string;
}
export type ResourceIdList = string[];
export interface ListDiscoveredResourcesRequest {
  resourceType: ResourceType;
  resourceIds?: string[];
  resourceName?: string;
  limit?: number;
  includeDeletedResources?: boolean;
  nextToken?: string;
}
export type ResourceDeletionTime = Date;
export interface ResourceIdentifier {
  resourceType?: ResourceType;
  resourceId?: string;
  resourceName?: string;
  resourceDeletionTime?: Date;
}
export type ResourceIdentifierList = ResourceIdentifier[];
export interface ListDiscoveredResourcesResponse {
  resourceIdentifiers?: ResourceIdentifier[];
  nextToken?: string;
}
export interface TimeWindow {
  StartTime?: Date;
  EndTime?: Date;
}
export interface ResourceEvaluationFilters {
  EvaluationMode?: EvaluationMode;
  TimeWindow?: TimeWindow;
  EvaluationContextIdentifier?: string;
}
export type ListResourceEvaluationsPageItemLimit = number;
export interface ListResourceEvaluationsRequest {
  Filters?: ResourceEvaluationFilters;
  Limit?: number;
  NextToken?: string;
}
export interface ResourceEvaluation {
  ResourceEvaluationId?: string;
  EvaluationMode?: EvaluationMode;
  EvaluationStartTimestamp?: Date;
}
export type ResourceEvaluations = ResourceEvaluation[];
export interface ListResourceEvaluationsResponse {
  ResourceEvaluations?: ResourceEvaluation[];
  NextToken?: string;
}
export interface ListStoredQueriesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface StoredQueryMetadata {
  QueryId: string;
  QueryArn: string;
  QueryName: string;
  Description?: string;
}
export type StoredQueryMetadataList = StoredQueryMetadata[];
export interface ListStoredQueriesResponse {
  StoredQueryMetadata?: StoredQueryMetadata[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
  Limit?: number;
  NextToken?: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export type TagsList = Tag[];
export interface PutAggregationAuthorizationRequest {
  AuthorizedAccountId: string;
  AuthorizedAwsRegion: string;
  Tags?: Tag[];
}
export interface PutAggregationAuthorizationResponse {
  AggregationAuthorization?: AggregationAuthorization;
}
export interface PutConfigRuleRequest {
  ConfigRule: ConfigRule;
  Tags?: Tag[];
}
export interface PutConfigRuleResponse {}
export interface PutConfigurationAggregatorRequest {
  ConfigurationAggregatorName: string;
  AccountAggregationSources?: AccountAggregationSource[];
  OrganizationAggregationSource?: OrganizationAggregationSource;
  Tags?: Tag[];
  AggregatorFilters?: AggregatorFilters;
}
export interface PutConfigurationAggregatorResponse {
  ConfigurationAggregator?: ConfigurationAggregator;
}
export interface PutConfigurationRecorderRequest {
  ConfigurationRecorder: ConfigurationRecorder;
  Tags?: Tag[];
}
export interface PutConfigurationRecorderResponse {}
export type TemplateS3Uri = string;
export type TemplateBody = string;
export interface PutConformancePackRequest {
  ConformancePackName: string;
  TemplateS3Uri?: string;
  TemplateBody?: string;
  DeliveryS3Bucket?: string;
  DeliveryS3KeyPrefix?: string;
  ConformancePackInputParameters?: ConformancePackInputParameter[];
  TemplateSSMDocumentDetails?: TemplateSSMDocumentDetails;
  Tags?: Tag[];
}
export interface PutConformancePackResponse {
  ConformancePackArn?: string;
}
export interface PutConnectorRequest {
  ConnectorConfiguration: ConnectorConfiguration;
  Tags?: Tag[];
}
export interface PutConnectorResponse {
  Arn: string;
}
export interface PutDeliveryChannelRequest {
  DeliveryChannel: DeliveryChannel;
}
export interface PutDeliveryChannelResponse {}
export type OrderingTimestamp = Date;
export interface Evaluation {
  ComplianceResourceType: string;
  ComplianceResourceId: string;
  ComplianceType: ComplianceType;
  Annotation?: string;
  OrderingTimestamp: Date;
}
export type Evaluations = Evaluation[];
export interface PutEvaluationsRequest {
  Evaluations?: Evaluation[];
  ResultToken: string;
  TestMode?: boolean;
}
export interface PutEvaluationsResponse {
  FailedEvaluations?: Evaluation[];
}
export interface ExternalEvaluation {
  ComplianceResourceType: string;
  ComplianceResourceId: string;
  ComplianceType: ComplianceType;
  Annotation?: string;
  OrderingTimestamp: Date;
}
export interface PutExternalEvaluationRequest {
  ConfigRuleName: string;
  ExternalEvaluation: ExternalEvaluation;
}
export interface PutExternalEvaluationResponse {}
export interface OrganizationCustomPolicyRuleMetadata {
  Description?: string;
  OrganizationConfigRuleTriggerTypes?: OrganizationConfigRuleTriggerTypeNoSN[];
  InputParameters?: string;
  MaximumExecutionFrequency?: MaximumExecutionFrequency;
  ResourceTypesScope?: string[];
  ResourceIdScope?: string;
  TagKeyScope?: string;
  TagValueScope?: string;
  PolicyRuntime: string;
  PolicyText: string;
  DebugLogDeliveryAccounts?: string[];
}
export interface PutOrganizationConfigRuleRequest {
  OrganizationConfigRuleName: string;
  OrganizationManagedRuleMetadata?: OrganizationManagedRuleMetadata;
  OrganizationCustomRuleMetadata?: OrganizationCustomRuleMetadata;
  ExcludedAccounts?: string[];
  OrganizationCustomPolicyRuleMetadata?: OrganizationCustomPolicyRuleMetadata;
  Tags?: Tag[];
}
export interface PutOrganizationConfigRuleResponse {
  OrganizationConfigRuleArn?: string;
}
export interface PutOrganizationConformancePackRequest {
  OrganizationConformancePackName: string;
  TemplateS3Uri?: string;
  TemplateBody?: string;
  DeliveryS3Bucket?: string;
  DeliveryS3KeyPrefix?: string;
  ConformancePackInputParameters?: ConformancePackInputParameter[];
  ExcludedAccounts?: string[];
  Tags?: Tag[];
}
export interface PutOrganizationConformancePackResponse {
  OrganizationConformancePackArn?: string;
}
export interface PutRemediationConfigurationsRequest {
  RemediationConfigurations: RemediationConfiguration[];
}
export interface FailedRemediationBatch {
  FailureMessage?: string;
  FailedItems?: RemediationConfiguration[];
}
export type FailedRemediationBatches = FailedRemediationBatch[];
export interface PutRemediationConfigurationsResponse {
  FailedBatches?: FailedRemediationBatch[];
}
export interface PutRemediationExceptionsRequest {
  ConfigRuleName: string;
  ResourceKeys: RemediationExceptionResourceKey[];
  Message?: string;
  ExpirationTime?: Date;
}
export interface FailedRemediationExceptionBatch {
  FailureMessage?: string;
  FailedItems?: RemediationException[];
}
export type FailedRemediationExceptionBatches = FailedRemediationExceptionBatch[];
export interface PutRemediationExceptionsResponse {
  FailedBatches?: FailedRemediationExceptionBatch[];
}
export type SchemaVersionId = string;
export interface PutResourceConfigRequest {
  ResourceType: string;
  SchemaVersionId: string;
  ResourceId: string;
  ResourceName?: string;
  Configuration: string;
  Tags?: { [key: string]: string | undefined };
}
export interface PutResourceConfigResponse {}
export interface PutRetentionConfigurationRequest {
  RetentionPeriodInDays: number;
}
export interface PutRetentionConfigurationResponse {
  RetentionConfiguration?: RetentionConfiguration;
}
export interface PutServiceLinkedConfigurationRecorderRequest {
  ServicePrincipal: string;
  Tags?: Tag[];
}
export interface PutServiceLinkedConfigurationRecorderResponse {
  Arn?: string;
  Name?: string;
}
export interface PutStoredQueryRequest {
  StoredQuery: StoredQuery;
  Tags?: Tag[];
}
export interface PutStoredQueryResponse {
  QueryArn?: string;
}
export interface PutThirdPartyServiceLinkedConfigurationRecorderRequest {
  ServicePrincipal: string;
  ConnectorArn: string;
  ScopeConfiguration: ScopeConfiguration;
  Tags?: Tag[];
}
export interface PutThirdPartyServiceLinkedConfigurationRecorderResponse {
  Arn: string;
  Name: string;
}
export type Expression = string;
export interface SelectAggregateResourceConfigRequest {
  Expression: string;
  ConfigurationAggregatorName: string;
  Limit?: number;
  MaxResults?: number;
  NextToken?: string;
}
export type Results = string[];
export type FieldName = string;
export interface FieldInfo {
  Name?: string;
}
export type FieldInfoList = FieldInfo[];
export interface QueryInfo {
  SelectFields?: FieldInfo[];
}
export interface SelectAggregateResourceConfigResponse {
  Results?: string[];
  QueryInfo?: QueryInfo;
  NextToken?: string;
}
export interface SelectResourceConfigRequest {
  Expression: string;
  Limit?: number;
  NextToken?: string;
}
export interface SelectResourceConfigResponse {
  Results?: string[];
  QueryInfo?: QueryInfo;
  NextToken?: string;
}
export type ReevaluateConfigRuleNames = string[];
export interface StartConfigRulesEvaluationRequest {
  ConfigRuleNames?: string[];
}
export interface StartConfigRulesEvaluationResponse {}
export interface StartConfigurationRecorderRequest {
  ConfigurationRecorderName: string;
}
export interface StartConfigurationRecorderResponse {}
export interface StartRemediationExecutionRequest {
  ConfigRuleName: string;
  ResourceKeys: ResourceKey[];
}
export interface StartRemediationExecutionResponse {
  FailureMessage?: string;
  FailedItems?: ResourceKey[];
}
export type EvaluationTimeout = number;
export type ClientToken = string;
export interface StartResourceEvaluationRequest {
  ResourceDetails: ResourceDetails;
  EvaluationContext?: EvaluationContext;
  EvaluationMode: EvaluationMode;
  EvaluationTimeout?: number;
  ClientToken?: string;
}
export interface StartResourceEvaluationResponse {
  ResourceEvaluationId?: string;
}
export interface StopConfigurationRecorderRequest {
  ConfigurationRecorderName: string;
}
export interface StopConfigurationRecorderResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type ErrorMessage = string;
export type AssociateResourceTypesError =
  | ConflictException
  | NoSuchConfigurationRecorderException
  | ValidationException
  | CommonErrors;
/**
 * Adds all resource types specified in the `ResourceTypes` list to the RecordingGroup of specified configuration recorder and includes those resource types when recording.
 *
 * For this operation, the specified configuration recorder must use a RecordingStrategy that is either `INCLUSION_BY_RESOURCE_TYPES` or `EXCLUSION_BY_RESOURCE_TYPES`.
 */
export const associateResourceTypes: API.OperationMethod<
  AssociateResourceTypesRequest,
  AssociateResourceTypesResponse,
  AssociateResourceTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(584, __c73, 0) as any as S.Schema<AssociateResourceTypesRequest>,
  output: __S(592, __c74, 0) as any as S.Schema<AssociateResourceTypesResponse>,
  errors: [ConflictException, NoSuchConfigurationRecorderException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResourceTypes",
}));

export type BatchGetAggregateResourceConfigError =
  | NoSuchConfigurationAggregatorException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current configuration items for resources that are present in your Config aggregator. The operation also returns a list of resources that are not processed in the current request.
 * If there are no unprocessed resources, the operation returns an empty `unprocessedResourceIdentifiers` list.
 *
 * - The API does not return results for deleted resources.
 *
 * - The API does not return tags and relationships.
 */
export const batchGetAggregateResourceConfig: API.OperationMethod<
  BatchGetAggregateResourceConfigRequest,
  BatchGetAggregateResourceConfigResponse,
  BatchGetAggregateResourceConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(632, __c79, 0) as any as S.Schema<BatchGetAggregateResourceConfigRequest>,
  output: __S(633, __c79, 1) as any as S.Schema<BatchGetAggregateResourceConfigResponse>,
  errors: [NoSuchConfigurationAggregatorException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAggregateResourceConfig",
}));

export type BatchGetResourceConfigError =
  | NoAvailableConfigurationRecorderException
  | ValidationException
  | CommonErrors;
/**
 * Returns the `BaseConfigurationItem` for one or more requested resources.
 * The operation also returns a list of resources that are
 * not processed in the current request. If there are no unprocessed
 * resources, the operation returns an empty unprocessedResourceKeys
 * list.
 *
 * - The API does not return results for deleted
 * resources.
 *
 * - The API does not return any tags for the requested
 * resources. This information is filtered out of the
 * supplementaryConfiguration section of the API
 * response.
 */
export const batchGetResourceConfig: API.OperationMethod<
  BatchGetResourceConfigRequest,
  BatchGetResourceConfigResponse,
  BatchGetResourceConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c84, 0) as any as S.Schema<BatchGetResourceConfigRequest>,
  output: __S(673, __c84, 1) as any as S.Schema<BatchGetResourceConfigResponse>,
  errors: [NoAvailableConfigurationRecorderException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetResourceConfig",
}));

export type DeleteAggregationAuthorizationError = InvalidParameterValueException | CommonErrors;
/**
 * Deletes the authorization granted to the specified
 * configuration aggregator account in a specified region.
 */
export const deleteAggregationAuthorization: API.OperationMethod<
  DeleteAggregationAuthorizationRequest,
  DeleteAggregationAuthorizationResponse,
  DeleteAggregationAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c86, 0) as any as S.Schema<DeleteAggregationAuthorizationRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteAggregationAuthorizationResponse>,
  errors: [InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAggregationAuthorization",
}));

export type DeleteConfigRuleError =
  | NoSuchConfigRuleException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes the specified Config rule and all of its evaluation
 * results.
 *
 * Config sets the state of a rule to `DELETING`
 * until the deletion is complete. You cannot update a rule while it is
 * in this state. If you make a `PutConfigRule` or
 * `DeleteConfigRule` request for the rule, you will
 * receive a `ResourceInUseException`.
 *
 * You can check the state of a rule by using the
 * `DescribeConfigRules` request.
 *
 * **Recommendation: Consider excluding the `AWS::Config::ResourceCompliance` resource type from recording before deleting rules**
 *
 * Deleting rules creates configuration items (CIs) for `AWS::Config::ResourceCompliance`
 * that can affect your costs for the configuration recorder. If you are deleting rules which evaluate a large number of resource types,
 * this can lead to a spike in the number of CIs recorded.
 *
 * To avoid the associated costs, you can opt to disable recording
 * for the `AWS::Config::ResourceCompliance` resource type before deleting rules, and re-enable recording after the rules have been deleted.
 *
 * However, since deleting rules is an asynchronous process, it might take an hour or more to complete. During the time
 * when recording is disabled for `AWS::Config::ResourceCompliance`, rule evaluations will not be recorded in the associated resource's history.
 */
export const deleteConfigRule: API.OperationMethod<
  DeleteConfigRuleRequest,
  DeleteConfigRuleResponse,
  DeleteConfigRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c88, 0) as any as S.Schema<DeleteConfigRuleRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteConfigRuleResponse>,
  errors: [NoSuchConfigRuleException, ResourceInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigRule",
}));

export type DeleteConfigurationAggregatorError =
  | NoSuchConfigurationAggregatorException
  | CommonErrors;
/**
 * Deletes the specified configuration aggregator and the
 * aggregated data associated with the aggregator.
 */
export const deleteConfigurationAggregator: API.OperationMethod<
  DeleteConfigurationAggregatorRequest,
  DeleteConfigurationAggregatorResponse,
  DeleteConfigurationAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(712, __c89, 0) as any as S.Schema<DeleteConfigurationAggregatorRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteConfigurationAggregatorResponse>,
  errors: [NoSuchConfigurationAggregatorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationAggregator",
}));

export type DeleteConfigurationRecorderError =
  | NoSuchConfigurationRecorderException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Deletes the customer managed configuration recorder.
 *
 * This operation does not delete the configuration information that
 * was previously recorded. You will be able to access the previously
 * recorded information by using the
 * GetResourceConfigHistory operation, but you will not
 * be able to access this information in the Config console until
 * you have created a new customer managed configuration recorder.
 */
export const deleteConfigurationRecorder: API.OperationMethod<
  DeleteConfigurationRecorderRequest,
  DeleteConfigurationRecorderResponse,
  DeleteConfigurationRecorderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c90, 0) as any as S.Schema<DeleteConfigurationRecorderRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteConfigurationRecorderResponse>,
  errors: [NoSuchConfigurationRecorderException, UnmodifiableEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationRecorder",
}));

export type DeleteConformancePackError =
  | NoSuchConformancePackException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes the specified conformance pack and all the Config rules, remediation actions, and all evaluation results within that
 * conformance pack.
 *
 * Config sets the conformance pack to `DELETE_IN_PROGRESS` until the deletion is complete.
 * You cannot update a conformance pack while it is in this state.
 *
 * **Recommendation: Consider excluding the `AWS::Config::ResourceCompliance` resource type from recording before deleting rules**
 *
 * Deleting rules creates configuration items (CIs) for `AWS::Config::ResourceCompliance`
 * that can affect your costs for the configuration recorder. If you are deleting rules which evaluate a large number of resource types,
 * this can lead to a spike in the number of CIs recorded.
 *
 * To avoid the associated costs, you can opt to disable recording
 * for the `AWS::Config::ResourceCompliance` resource type before deleting rules, and re-enable recording after the rules have been deleted.
 *
 * However, since deleting rules is an asynchronous process, it might take an hour or more to complete. During the time
 * when recording is disabled for `AWS::Config::ResourceCompliance`, rule evaluations will not be recorded in the associated resource's history.
 */
export const deleteConformancePack: API.OperationMethod<
  DeleteConformancePackRequest,
  DeleteConformancePackResponse,
  DeleteConformancePackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(728, __c91, 0) as any as S.Schema<DeleteConformancePackRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteConformancePackResponse>,
  errors: [NoSuchConformancePackException, ResourceInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConformancePack",
}));

export type DeleteConnectorError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Deletes the specified connector.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c92, 0) as any as S.Schema<DeleteConnectorRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteConnectorResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnector",
}));

export type DeleteDeliveryChannelError =
  | LastDeliveryChannelDeleteFailedException
  | NoSuchDeliveryChannelException
  | CommonErrors;
/**
 * Deletes the delivery channel.
 *
 * Before you can delete the delivery channel, you must stop the customer managed configuration recorder. You can use the StopConfigurationRecorder operation to stop the customer managed configuration recorder.
 */
export const deleteDeliveryChannel: API.OperationMethod<
  DeleteDeliveryChannelRequest,
  DeleteDeliveryChannelResponse,
  DeleteDeliveryChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(744, __c93, 0) as any as S.Schema<DeleteDeliveryChannelRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteDeliveryChannelResponse>,
  errors: [LastDeliveryChannelDeleteFailedException, NoSuchDeliveryChannelException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeliveryChannel",
}));

export type DeleteEvaluationResultsError =
  | NoSuchConfigRuleException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes the evaluation results for the specified Config
 * rule. You can specify one Config rule per request. After you
 * delete the evaluation results, you can call the StartConfigRulesEvaluation API to start evaluating
 * your Amazon Web Services resources against the rule.
 */
export const deleteEvaluationResults: API.OperationMethod<
  DeleteEvaluationResultsRequest,
  DeleteEvaluationResultsResponse,
  DeleteEvaluationResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c94, 0) as any as S.Schema<DeleteEvaluationResultsRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteEvaluationResultsResponse>,
  errors: [NoSuchConfigRuleException, ResourceInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEvaluationResults",
}));

export type DeleteOrganizationConfigRuleError =
  | NoSuchOrganizationConfigRuleException
  | OrganizationAccessDeniedException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes the specified organization Config rule and all of its evaluation results from all member accounts in that organization.
 *
 * Only a management account and a delegated administrator account can delete an organization Config rule.
 * When calling this API with a delegated administrator, you must ensure Organizations
 * `ListDelegatedAdministrator` permissions are added.
 *
 * Config sets the state of a rule to DELETE_IN_PROGRESS until the deletion is complete.
 * You cannot update a rule while it is in this state.
 *
 * **Recommendation: Consider excluding the `AWS::Config::ResourceCompliance` resource type from recording before deleting rules**
 *
 * Deleting rules creates configuration items (CIs) for `AWS::Config::ResourceCompliance`
 * that can affect your costs for the configuration recorder. If you are deleting rules which evaluate a large number of resource types,
 * this can lead to a spike in the number of CIs recorded.
 *
 * To avoid the associated costs, you can opt to disable recording
 * for the `AWS::Config::ResourceCompliance` resource type before deleting rules, and re-enable recording after the rules have been deleted.
 *
 * However, since deleting rules is an asynchronous process, it might take an hour or more to complete. During the time
 * when recording is disabled for `AWS::Config::ResourceCompliance`, rule evaluations will not be recorded in the associated resource's history.
 */
export const deleteOrganizationConfigRule: API.OperationMethod<
  DeleteOrganizationConfigRuleRequest,
  DeleteOrganizationConfigRuleResponse,
  DeleteOrganizationConfigRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(760, __c95, 0) as any as S.Schema<DeleteOrganizationConfigRuleRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteOrganizationConfigRuleResponse>,
  errors: [
    NoSuchOrganizationConfigRuleException,
    OrganizationAccessDeniedException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOrganizationConfigRule",
}));

export type DeleteOrganizationConformancePackError =
  | NoSuchOrganizationConformancePackException
  | OrganizationAccessDeniedException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes the specified organization conformance pack and all of the Config rules and remediation actions from
 * all member accounts in that organization.
 *
 * Only a management account or a delegated administrator account can delete an organization conformance pack.
 * When calling this API with a delegated administrator, you must ensure Organizations
 * `ListDelegatedAdministrator` permissions are added.
 *
 * Config sets the state of a conformance pack to DELETE_IN_PROGRESS until the deletion is complete.
 * You cannot update a conformance pack while it is in this state.
 *
 * **Recommendation: Consider excluding the `AWS::Config::ResourceCompliance` resource type from recording before deleting rules**
 *
 * Deleting rules creates configuration items (CIs) for `AWS::Config::ResourceCompliance`
 * that can affect your costs for the configuration recorder. If you are deleting rules which evaluate a large number of resource types,
 * this can lead to a spike in the number of CIs recorded.
 *
 * To avoid the associated costs, you can opt to disable recording
 * for the `AWS::Config::ResourceCompliance` resource type before deleting rules, and re-enable recording after the rules have been deleted.
 *
 * However, since deleting rules is an asynchronous process, it might take an hour or more to complete. During the time
 * when recording is disabled for `AWS::Config::ResourceCompliance`, rule evaluations will not be recorded in the associated resource's history.
 */
export const deleteOrganizationConformancePack: API.OperationMethod<
  DeleteOrganizationConformancePackRequest,
  DeleteOrganizationConformancePackResponse,
  DeleteOrganizationConformancePackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c96, 0) as any as S.Schema<DeleteOrganizationConformancePackRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteOrganizationConformancePackResponse>,
  errors: [
    NoSuchOrganizationConformancePackException,
    OrganizationAccessDeniedException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOrganizationConformancePack",
}));

export type DeletePendingAggregationRequestError = InvalidParameterValueException | CommonErrors;
/**
 * Deletes pending authorization requests for a specified
 * aggregator account in a specified region.
 */
export const deletePendingAggregationRequest: API.OperationMethod<
  DeletePendingAggregationRequestRequest,
  DeletePendingAggregationRequestResponse,
  DeletePendingAggregationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(776, __c97, 0) as any as S.Schema<DeletePendingAggregationRequestRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeletePendingAggregationRequestResponse>,
  errors: [InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePendingAggregationRequest",
}));

export type DeleteRemediationConfigurationError =
  | InsufficientPermissionsException
  | InvalidParameterValueException
  | NoSuchRemediationConfigurationException
  | RemediationInProgressException
  | CommonErrors;
/**
 * Deletes the remediation configuration.
 */
export const deleteRemediationConfiguration: API.OperationMethod<
  DeleteRemediationConfigurationRequest,
  DeleteRemediationConfigurationResponse,
  DeleteRemediationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c98, 0) as any as S.Schema<DeleteRemediationConfigurationRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteRemediationConfigurationResponse>,
  errors: [
    InsufficientPermissionsException,
    InvalidParameterValueException,
    NoSuchRemediationConfigurationException,
    RemediationInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRemediationConfiguration",
}));

export type DeleteRemediationExceptionsError = NoSuchRemediationExceptionException | CommonErrors;
/**
 * Deletes one or more remediation exceptions mentioned in the resource keys.
 *
 * Config generates a remediation exception when a problem occurs executing a remediation action to a specific resource.
 * Remediation exceptions blocks auto-remediation until the exception is cleared.
 */
export const deleteRemediationExceptions: API.OperationMethod<
  DeleteRemediationExceptionsRequest,
  DeleteRemediationExceptionsResponse,
  DeleteRemediationExceptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(792, __c99, 0) as any as S.Schema<DeleteRemediationExceptionsRequest>,
  output: __S(795, __c99, 3) as any as S.Schema<DeleteRemediationExceptionsResponse>,
  errors: [NoSuchRemediationExceptionException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRemediationExceptions",
}));

export type DeleteResourceConfigError =
  | NoRunningConfigurationRecorderException
  | ValidationException
  | CommonErrors;
/**
 * Records the configuration state for a custom resource that has been deleted. This API records a new ConfigurationItem with a ResourceDeleted status. You can retrieve the ConfigurationItems recorded for this resource in your Config History.
 */
export const deleteResourceConfig: API.OperationMethod<
  DeleteResourceConfigRequest,
  DeleteResourceConfigResponse,
  DeleteResourceConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(808, __c101, 0) as any as S.Schema<DeleteResourceConfigRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteResourceConfigResponse>,
  errors: [NoRunningConfigurationRecorderException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceConfig",
}));

export type DeleteRetentionConfigurationError =
  | InvalidParameterValueException
  | NoSuchRetentionConfigurationException
  | CommonErrors;
/**
 * Deletes the retention configuration.
 */
export const deleteRetentionConfiguration: API.OperationMethod<
  DeleteRetentionConfigurationRequest,
  DeleteRetentionConfigurationResponse,
  DeleteRetentionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c102, 0) as any as S.Schema<DeleteRetentionConfigurationRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteRetentionConfigurationResponse>,
  errors: [InvalidParameterValueException, NoSuchRetentionConfigurationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRetentionConfiguration",
}));

export type DeleteServiceLinkedConfigurationRecorderError =
  | ConflictException
  | NoSuchConfigurationRecorderException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing service-linked configuration recorder.
 *
 * This operation does not delete the configuration information that was previously recorded. You will be able to access the previously
 * recorded information by using the
 * GetResourceConfigHistory operation, but you will not
 * be able to access this information in the Config console until
 * you have created a new service-linked configuration recorder for the same service.
 *
 * **The recording scope determines if you receive configuration items**
 *
 * The recording scope is set by the service that is linked to the configuration recorder and determines whether you receive configuration items (CIs) in the delivery channel. If the recording scope is internal, you will not receive CIs in the delivery channel.
 */
export const deleteServiceLinkedConfigurationRecorder: API.OperationMethod<
  DeleteServiceLinkedConfigurationRecorderRequest,
  DeleteServiceLinkedConfigurationRecorderResponse,
  DeleteServiceLinkedConfigurationRecorderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(824, __c103, 0) as any as S.Schema<DeleteServiceLinkedConfigurationRecorderRequest>,
  output: __S(832, __c104, 0) as any as S.Schema<DeleteServiceLinkedConfigurationRecorderResponse>,
  errors: [ConflictException, NoSuchConfigurationRecorderException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceLinkedConfigurationRecorder",
}));

export type DeleteStoredQueryError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Deletes the stored query for a single Amazon Web Services account and a single Amazon Web Services Region.
 */
export const deleteStoredQuery: API.OperationMethod<
  DeleteStoredQueryRequest,
  DeleteStoredQueryResponse,
  DeleteStoredQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(840, __c105, 0) as any as S.Schema<DeleteStoredQueryRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<DeleteStoredQueryResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStoredQuery",
}));

export type DeliverConfigSnapshotError =
  | NoAvailableConfigurationRecorderException
  | NoRunningConfigurationRecorderException
  | NoSuchDeliveryChannelException
  | CommonErrors;
/**
 * Schedules delivery of a configuration snapshot to the Amazon S3
 * bucket in the specified delivery channel. After the delivery has
 * started, Config sends the following notifications using an
 * Amazon SNS topic that you have specified.
 *
 * - Notification of the start of the delivery.
 *
 * - Notification of the completion of the delivery, if the
 * delivery was successfully completed.
 *
 * - Notification of delivery failure, if the delivery
 * failed.
 */
export const deliverConfigSnapshot: API.OperationMethod<
  DeliverConfigSnapshotRequest,
  DeliverConfigSnapshotResponse,
  DeliverConfigSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c106, 0) as any as S.Schema<DeliverConfigSnapshotRequest>,
  output: __S(849, __c106, 1) as any as S.Schema<DeliverConfigSnapshotResponse>,
  errors: [
    NoAvailableConfigurationRecorderException,
    NoRunningConfigurationRecorderException,
    NoSuchDeliveryChannelException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeliverConfigSnapshot",
}));

export type DescribeAggregateComplianceByConfigRulesError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchConfigurationAggregatorException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of compliant and noncompliant rules with the
 * number of resources for compliant and noncompliant rules. Does not display rules that do not have compliance results.
 *
 * The results can return an empty result page, but if you
 * have a `nextToken`, the results are displayed on the next
 * page.
 */
export const describeAggregateComplianceByConfigRules: API.PaginatedOperationMethod<
  DescribeAggregateComplianceByConfigRulesRequest,
  DescribeAggregateComplianceByConfigRulesResponse,
  DescribeAggregateComplianceByConfigRulesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(857, __c107, 1) as any as S.Schema<DescribeAggregateComplianceByConfigRulesRequest>,
  output: __S(860, __c107, 4) as any as S.Schema<DescribeAggregateComplianceByConfigRulesResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchConfigurationAggregatorException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAggregateComplianceByConfigRules",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "Limit" } as const,
})) as any;

export type DescribeAggregateComplianceByConformancePacksError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchConfigurationAggregatorException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the existing and deleted conformance packs and their associated compliance status with the count of compliant and noncompliant Config rules within each
 * conformance pack. Also returns the total rule count which includes compliant rules, noncompliant rules, and rules that cannot be evaluated due to insufficient data.
 *
 * The results can return an empty result page, but if you have a `nextToken`, the results are displayed on the next page.
 */
export const describeAggregateComplianceByConformancePacks: API.PaginatedOperationMethod<
  DescribeAggregateComplianceByConformancePacksRequest,
  DescribeAggregateComplianceByConformancePacksResponse,
  DescribeAggregateComplianceByConformancePacksError,
  Credentials | HttpClient.HttpClient,
  AggregateComplianceByConformancePack
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(
    881,
    __c110,
    1,
  ) as any as S.Schema<DescribeAggregateComplianceByConformancePacksRequest>,
  output: __S(
    885,
    __c110,
    5,
  ) as any as S.Schema<DescribeAggregateComplianceByConformancePacksResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchConfigurationAggregatorException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAggregateComplianceByConformancePacks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AggregateComplianceByConformancePacks",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeAggregationAuthorizationsError =
  | InvalidLimitException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns a list of authorizations granted to various aggregator
 * accounts and regions.
 */
export const describeAggregationAuthorizations: API.PaginatedOperationMethod<
  DescribeAggregationAuthorizationsRequest,
  DescribeAggregationAuthorizationsResponse,
  DescribeAggregationAuthorizationsError,
  Credentials | HttpClient.HttpClient,
  AggregationAuthorization
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(888, __c111, 0) as any as S.Schema<DescribeAggregationAuthorizationsRequest>,
  output: __S(890, __c111, 2) as any as S.Schema<DescribeAggregationAuthorizationsResponse>,
  errors: [InvalidLimitException, InvalidNextTokenException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAggregationAuthorizations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AggregationAuthorizations",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeComplianceByConfigRuleError =
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchConfigRuleException
  | CommonErrors;
/**
 * Indicates whether the specified Config rules are compliant.
 * If a rule is noncompliant, this operation returns the number of Amazon Web Services
 * resources that do not comply with the rule.
 *
 * A rule is compliant if all of the evaluated resources comply
 * with it. It is noncompliant if any of these resources do not
 * comply.
 *
 * If Config has no current evaluation results for the rule,
 * it returns `INSUFFICIENT_DATA`. This result might
 * indicate one of the following conditions:
 *
 * - Config has never invoked an evaluation for the
 * rule. To check whether it has, use the
 * `DescribeConfigRuleEvaluationStatus` action
 * to get the `LastSuccessfulInvocationTime` and
 * `LastFailedInvocationTime`.
 *
 * - The rule's Lambda function is failing to send
 * evaluation results to Config. Verify that the role you
 * assigned to your configuration recorder includes the
 * `config:PutEvaluations` permission. If the
 * rule is a custom rule, verify that the Lambda execution
 * role includes the `config:PutEvaluations`
 * permission.
 *
 * - The rule's Lambda function has returned
 * `NOT_APPLICABLE` for all evaluation results.
 * This can occur if the resources were deleted or removed from
 * the rule's scope.
 */
export const describeComplianceByConfigRule: API.PaginatedOperationMethod<
  DescribeComplianceByConfigRuleRequest,
  DescribeComplianceByConfigRuleResponse,
  DescribeComplianceByConfigRuleError,
  Credentials | HttpClient.HttpClient,
  ComplianceByConfigRule
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(904, __c113, 0) as any as S.Schema<DescribeComplianceByConfigRuleRequest>,
  output: __S(907, __c113, 3) as any as S.Schema<DescribeComplianceByConfigRuleResponse>,
  errors: [InvalidNextTokenException, InvalidParameterValueException, NoSuchConfigRuleException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComplianceByConfigRule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ComplianceByConfigRules",
  } as const,
})) as any;

export type DescribeComplianceByResourceError =
  | InvalidNextTokenException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Indicates whether the specified Amazon Web Services resources are compliant. If
 * a resource is noncompliant, this operation returns the number of Config rules that the resource does not comply with.
 *
 * A resource is compliant if it complies with all the Config
 * rules that evaluate it. It is noncompliant if it does not comply
 * with one or more of these rules.
 *
 * If Config has no current evaluation results for the
 * resource, it returns `INSUFFICIENT_DATA`. This result
 * might indicate one of the following conditions about the rules that
 * evaluate the resource:
 *
 * - Config has never invoked an evaluation for the
 * rule. To check whether it has, use the
 * `DescribeConfigRuleEvaluationStatus` action
 * to get the `LastSuccessfulInvocationTime` and
 * `LastFailedInvocationTime`.
 *
 * - The rule's Lambda function is failing to send
 * evaluation results to Config. Verify that the role that
 * you assigned to your configuration recorder includes the
 * `config:PutEvaluations` permission. If the
 * rule is a custom rule, verify that the Lambda execution
 * role includes the `config:PutEvaluations`
 * permission.
 *
 * - The rule's Lambda function has returned
 * `NOT_APPLICABLE` for all evaluation results.
 * This can occur if the resources were deleted or removed from
 * the rule's scope.
 */
export const describeComplianceByResource: API.PaginatedOperationMethod<
  DescribeComplianceByResourceRequest,
  DescribeComplianceByResourceResponse,
  DescribeComplianceByResourceError,
  Credentials | HttpClient.HttpClient,
  ComplianceByResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(912, __c114, 0) as any as S.Schema<DescribeComplianceByResourceRequest>,
  output: __S(915, __c114, 3) as any as S.Schema<DescribeComplianceByResourceResponse>,
  errors: [InvalidNextTokenException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComplianceByResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ComplianceByResources",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeConfigRuleEvaluationStatusError =
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchConfigRuleException
  | CommonErrors;
/**
 * Returns status information for each of your Config managed rules. The status includes information such as the last time Config invoked the rule, the last time Config failed to invoke
 * the rule, and the related error for the last failure.
 */
export const describeConfigRuleEvaluationStatus: API.PaginatedOperationMethod<
  DescribeConfigRuleEvaluationStatusRequest,
  DescribeConfigRuleEvaluationStatusResponse,
  DescribeConfigRuleEvaluationStatusError,
  Credentials | HttpClient.HttpClient,
  ConfigRuleEvaluationStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(920, __c115, 0) as any as S.Schema<DescribeConfigRuleEvaluationStatusRequest>,
  output: __S(923, __c115, 3) as any as S.Schema<DescribeConfigRuleEvaluationStatusResponse>,
  errors: [InvalidNextTokenException, InvalidParameterValueException, NoSuchConfigRuleException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigRuleEvaluationStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigRulesEvaluationStatus",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeConfigRulesError =
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchConfigRuleException
  | CommonErrors;
/**
 * Returns details about your Config rules.
 */
export const describeConfigRules: API.PaginatedOperationMethod<
  DescribeConfigRulesRequest,
  DescribeConfigRulesResponse,
  DescribeConfigRulesError,
  Credentials | HttpClient.HttpClient,
  ConfigRule
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(929, __c116, 1) as any as S.Schema<DescribeConfigRulesRequest>,
  output: __S(931, __c116, 3) as any as S.Schema<DescribeConfigRulesResponse>,
  errors: [InvalidNextTokenException, InvalidParameterValueException, NoSuchConfigRuleException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigRules",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "ConfigRules" } as const,
})) as any;

export type DescribeConfigurationAggregatorsError =
  | InvalidLimitException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchConfigurationAggregatorException
  | CommonErrors;
/**
 * Returns the details of one or more configuration aggregators.
 * If the configuration aggregator is not specified, this operation
 * returns the details for all the configuration aggregators associated
 * with the account.
 */
export const describeConfigurationAggregators: API.PaginatedOperationMethod<
  DescribeConfigurationAggregatorsRequest,
  DescribeConfigurationAggregatorsResponse,
  DescribeConfigurationAggregatorsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationAggregator
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(944, __c118, 0) as any as S.Schema<DescribeConfigurationAggregatorsRequest>,
  output: __S(946, __c118, 2) as any as S.Schema<DescribeConfigurationAggregatorsResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    NoSuchConfigurationAggregatorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationAggregators",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationAggregators",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeConfigurationAggregatorSourcesStatusError =
  | InvalidLimitException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchConfigurationAggregatorException
  | CommonErrors;
/**
 * Returns status information for sources within an aggregator.
 * The status includes information about the last time Config verified authorization between the source account and an aggregator account. In case of a failure, the status contains the related error code or message.
 */
export const describeConfigurationAggregatorSourcesStatus: API.PaginatedOperationMethod<
  DescribeConfigurationAggregatorSourcesStatusRequest,
  DescribeConfigurationAggregatorSourcesStatusResponse,
  DescribeConfigurationAggregatorSourcesStatusError,
  Credentials | HttpClient.HttpClient,
  AggregatedSourceStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(
    960,
    __c120,
    0,
  ) as any as S.Schema<DescribeConfigurationAggregatorSourcesStatusRequest>,
  output: __S(
    963,
    __c120,
    3,
  ) as any as S.Schema<DescribeConfigurationAggregatorSourcesStatusResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    NoSuchConfigurationAggregatorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationAggregatorSourcesStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AggregatedSourceStatusList",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeConfigurationRecordersError =
  | NoSuchConfigurationRecorderException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for the configuration recorder you specify.
 *
 * If a configuration recorder is not specified, this operation returns details for the customer managed configuration recorder configured for the
 * account, if applicable.
 *
 * When making a request to this operation, you can only specify one configuration recorder.
 */
export const describeConfigurationRecorders: API.OperationMethod<
  DescribeConfigurationRecordersRequest,
  DescribeConfigurationRecordersResponse,
  DescribeConfigurationRecordersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(968, __c121, 0) as any as S.Schema<DescribeConfigurationRecordersRequest>,
  output: __S(970, __c121, 2) as any as S.Schema<DescribeConfigurationRecordersResponse>,
  errors: [NoSuchConfigurationRecorderException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationRecorders",
}));

export type DescribeConfigurationRecorderStatusError =
  | NoSuchConfigurationRecorderException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current status of the configuration
 * recorder you specify as well as the status of the last recording event for the configuration recorders.
 *
 * For a detailed status of recording events over time, add your Config events to Amazon CloudWatch metrics and use CloudWatch metrics.
 *
 * If a configuration recorder is not specified, this operation returns the status for the customer managed configuration recorder configured for the
 * account, if applicable.
 *
 * When making a request to this operation, you can only specify one configuration recorder.
 */
export const describeConfigurationRecorderStatus: API.OperationMethod<
  DescribeConfigurationRecorderStatusRequest,
  DescribeConfigurationRecorderStatusResponse,
  DescribeConfigurationRecorderStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c122, 0) as any as S.Schema<DescribeConfigurationRecorderStatusRequest>,
  output: __S(979, __c122, 3) as any as S.Schema<DescribeConfigurationRecorderStatusResponse>,
  errors: [NoSuchConfigurationRecorderException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationRecorderStatus",
}));

export type DescribeConformancePackComplianceError =
  | InvalidLimitException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchConfigRuleInConformancePackException
  | NoSuchConformancePackException
  | CommonErrors;
/**
 * Returns compliance details for each rule in that conformance pack.
 *
 * You must provide exact rule names.
 */
export const describeConformancePackCompliance: API.PaginatedOperationMethod<
  DescribeConformancePackComplianceRequest,
  DescribeConformancePackComplianceResponse,
  DescribeConformancePackComplianceError,
  Credentials | HttpClient.HttpClient,
  ConformancePackRuleCompliance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(985, __c123, 1) as any as S.Schema<DescribeConformancePackComplianceRequest>,
  output: __S(988, __c123, 4) as any as S.Schema<DescribeConformancePackComplianceResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    NoSuchConfigRuleInConformancePackException,
    NoSuchConformancePackException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConformancePackCompliance",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConformancePackRuleComplianceList",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeConformancePacksError =
  | InvalidLimitException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchConformancePackException
  | CommonErrors;
/**
 * Returns a list of one or more conformance packs.
 */
export const describeConformancePacks: API.PaginatedOperationMethod<
  DescribeConformancePacksRequest,
  DescribeConformancePacksResponse,
  DescribeConformancePacksError,
  Credentials | HttpClient.HttpClient,
  ConformancePackDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(992, __c124, 0) as any as S.Schema<DescribeConformancePacksRequest>,
  output: __S(995, __c124, 3) as any as S.Schema<DescribeConformancePacksResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    NoSuchConformancePackException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConformancePacks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConformancePackDetails",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeConformancePackStatusError =
  | InvalidLimitException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Provides one or more conformance packs deployment status.
 *
 * If there are no conformance packs then you will see an empty result.
 */
export const describeConformancePackStatus: API.PaginatedOperationMethod<
  DescribeConformancePackStatusRequest,
  DescribeConformancePackStatusResponse,
  DescribeConformancePackStatusError,
  Credentials | HttpClient.HttpClient,
  ConformancePackStatusDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1016, __c127, 0) as any as S.Schema<DescribeConformancePackStatusRequest>,
  output: __S(1019, __c127, 3) as any as S.Schema<DescribeConformancePackStatusResponse>,
  errors: [InvalidLimitException, InvalidNextTokenException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConformancePackStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConformancePackStatusDetails",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeDeliveryChannelsError = NoSuchDeliveryChannelException | CommonErrors;
/**
 * Returns details about the specified delivery channel. If a
 * delivery channel is not specified, this operation returns the details
 * of all delivery channels associated with the account.
 *
 * Currently, you can specify only one delivery channel per
 * region in your account.
 */
export const describeDeliveryChannels: API.OperationMethod<
  DescribeDeliveryChannelsRequest,
  DescribeDeliveryChannelsResponse,
  DescribeDeliveryChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c128, 0) as any as S.Schema<DescribeDeliveryChannelsRequest>,
  output: __S(1026, __c128, 2) as any as S.Schema<DescribeDeliveryChannelsResponse>,
  errors: [NoSuchDeliveryChannelException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDeliveryChannels",
}));

export type DescribeDeliveryChannelStatusError = NoSuchDeliveryChannelException | CommonErrors;
/**
 * Returns the current status of the specified delivery channel.
 * If a delivery channel is not specified, this operation returns the
 * current status of all delivery channels associated with the
 * account.
 *
 * Currently, you can specify only one delivery channel per
 * region in your account.
 */
export const describeDeliveryChannelStatus: API.OperationMethod<
  DescribeDeliveryChannelStatusRequest,
  DescribeDeliveryChannelStatusResponse,
  DescribeDeliveryChannelStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c130, 0) as any as S.Schema<DescribeDeliveryChannelStatusRequest>,
  output: __S(1045, __c130, 5) as any as S.Schema<DescribeDeliveryChannelStatusResponse>,
  errors: [NoSuchDeliveryChannelException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDeliveryChannelStatus",
}));

export type DescribeOrganizationConfigRulesError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchOrganizationConfigRuleException
  | OrganizationAccessDeniedException
  | CommonErrors;
/**
 * Returns a list of organization Config rules.
 *
 * When you specify the limit and the next token, you receive a paginated response.
 *
 * Limit and next token are not applicable if you specify organization Config rule names.
 * It is only applicable, when you request all the organization Config rules.
 *
 * *For accounts within an organization*
 *
 * If you deploy an organizational rule or conformance pack in an organization
 * administrator account, and then establish a delegated administrator and deploy an
 * organizational rule or conformance pack in the delegated administrator account, you
 * won't be able to see the organizational rule or conformance pack in the organization
 * administrator account from the delegated administrator account or see the organizational
 * rule or conformance pack in the delegated administrator account from organization
 * administrator account. The `DescribeOrganizationConfigRules` and
 * `DescribeOrganizationConformancePacks` APIs can only see and interact with
 * the organization-related resource that were deployed from within the account calling
 * those APIs.
 */
export const describeOrganizationConfigRules: API.PaginatedOperationMethod<
  DescribeOrganizationConfigRulesRequest,
  DescribeOrganizationConfigRulesResponse,
  DescribeOrganizationConfigRulesError,
  Credentials | HttpClient.HttpClient,
  OrganizationConfigRule
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1048, __c131, 0) as any as S.Schema<DescribeOrganizationConfigRulesRequest>,
  output: __S(1052, __c131, 4) as any as S.Schema<DescribeOrganizationConfigRulesResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchOrganizationConfigRuleException,
    OrganizationAccessDeniedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfigRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OrganizationConfigRules",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeOrganizationConfigRuleStatusesError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchOrganizationConfigRuleException
  | OrganizationAccessDeniedException
  | CommonErrors;
/**
 * Provides organization Config rule deployment status for an organization.
 *
 * The status is not considered successful until organization Config rule is successfully deployed in all the member
 * accounts with an exception of excluded accounts.
 *
 * When you specify the limit and the next token, you receive a paginated response.
 * Limit and next token are not applicable if you specify organization Config rule names.
 * It is only applicable, when you request all the organization Config rules.
 */
export const describeOrganizationConfigRuleStatuses: API.PaginatedOperationMethod<
  DescribeOrganizationConfigRuleStatusesRequest,
  DescribeOrganizationConfigRuleStatusesResponse,
  DescribeOrganizationConfigRuleStatusesError,
  Credentials | HttpClient.HttpClient,
  OrganizationConfigRuleStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1064, __c133, 0) as any as S.Schema<DescribeOrganizationConfigRuleStatusesRequest>,
  output: __S(1067, __c133, 3) as any as S.Schema<DescribeOrganizationConfigRuleStatusesResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchOrganizationConfigRuleException,
    OrganizationAccessDeniedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfigRuleStatuses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OrganizationConfigRuleStatuses",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeOrganizationConformancePacksError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchOrganizationConformancePackException
  | OrganizationAccessDeniedException
  | CommonErrors;
/**
 * Returns a list of organization conformance packs.
 *
 * When you specify the limit and the next token, you receive a paginated response.
 *
 * Limit and next token are not applicable if you specify organization conformance packs names. They are only applicable,
 * when you request all the organization conformance packs.
 *
 * *For accounts within an organization*
 *
 * If you deploy an organizational rule or conformance pack in an organization
 * administrator account, and then establish a delegated administrator and deploy an
 * organizational rule or conformance pack in the delegated administrator account, you
 * won't be able to see the organizational rule or conformance pack in the organization
 * administrator account from the delegated administrator account or see the organizational
 * rule or conformance pack in the delegated administrator account from organization
 * administrator account. The `DescribeOrganizationConfigRules` and
 * `DescribeOrganizationConformancePacks` APIs can only see and interact with
 * the organization-related resource that were deployed from within the account calling
 * those APIs.
 */
export const describeOrganizationConformancePacks: API.PaginatedOperationMethod<
  DescribeOrganizationConformancePacksRequest,
  DescribeOrganizationConformancePacksResponse,
  DescribeOrganizationConformancePacksError,
  Credentials | HttpClient.HttpClient,
  OrganizationConformancePack
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1072, __c134, 0) as any as S.Schema<DescribeOrganizationConformancePacksRequest>,
  output: __S(1075, __c134, 3) as any as S.Schema<DescribeOrganizationConformancePacksResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchOrganizationConformancePackException,
    OrganizationAccessDeniedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConformancePacks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OrganizationConformancePacks",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeOrganizationConformancePackStatusesError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchOrganizationConformancePackException
  | OrganizationAccessDeniedException
  | CommonErrors;
/**
 * Provides organization conformance pack deployment status for an organization.
 *
 * The status is not considered successful until organization conformance pack is successfully
 * deployed in all the member accounts with an exception of excluded accounts.
 *
 * When you specify the limit and the next token, you receive a paginated response.
 * Limit and next token are not applicable if you specify organization conformance pack names.
 * They are only applicable, when you request all the organization conformance packs.
 */
export const describeOrganizationConformancePackStatuses: API.PaginatedOperationMethod<
  DescribeOrganizationConformancePackStatusesRequest,
  DescribeOrganizationConformancePackStatusesResponse,
  DescribeOrganizationConformancePackStatusesError,
  Credentials | HttpClient.HttpClient,
  OrganizationConformancePackStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(
    1080,
    __c135,
    0,
  ) as any as S.Schema<DescribeOrganizationConformancePackStatusesRequest>,
  output: __S(
    1083,
    __c135,
    3,
  ) as any as S.Schema<DescribeOrganizationConformancePackStatusesResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchOrganizationConformancePackException,
    OrganizationAccessDeniedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConformancePackStatuses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OrganizationConformancePackStatuses",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribePendingAggregationRequestsError =
  | InvalidLimitException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns a list of all pending aggregation requests.
 */
export const describePendingAggregationRequests: API.PaginatedOperationMethod<
  DescribePendingAggregationRequestsRequest,
  DescribePendingAggregationRequestsResponse,
  DescribePendingAggregationRequestsError,
  Credentials | HttpClient.HttpClient,
  PendingAggregationRequest
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1088, __c136, 0) as any as S.Schema<DescribePendingAggregationRequestsRequest>,
  output: __S(1091, __c136, 3) as any as S.Schema<DescribePendingAggregationRequestsResponse>,
  errors: [InvalidLimitException, InvalidNextTokenException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePendingAggregationRequests",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PendingAggregationRequests",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeRemediationConfigurationsError = CommonErrors;
/**
 * Returns the details of one or more remediation configurations.
 */
export const describeRemediationConfigurations: API.OperationMethod<
  DescribeRemediationConfigurationsRequest,
  DescribeRemediationConfigurationsResponse,
  DescribeRemediationConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1096, __c137, 0) as any as S.Schema<DescribeRemediationConfigurationsRequest>,
  output: __S(1097, __c137, 1) as any as S.Schema<DescribeRemediationConfigurationsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRemediationConfigurations",
}));

export type DescribeRemediationExceptionsError =
  | InvalidNextTokenException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns the details of one or more remediation exceptions. A detailed view of a remediation exception for a set of resources that includes an explanation of an exception and the time when the exception will be deleted.
 * When you specify the limit and the next token, you receive a paginated response.
 *
 * Config generates a remediation exception when a problem occurs executing a remediation action to a specific resource.
 * Remediation exceptions blocks auto-remediation until the exception is cleared.
 *
 * When you specify the limit and the next token, you receive a paginated response.
 *
 * Limit and next token are not applicable if you request resources in batch. It is only applicable, when you request all resources.
 */
export const describeRemediationExceptions: API.PaginatedOperationMethod<
  DescribeRemediationExceptionsRequest,
  DescribeRemediationExceptionsResponse,
  DescribeRemediationExceptionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DescribeRemediationExceptionsRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<DescribeRemediationExceptionsResponse>,
  errors: [InvalidNextTokenException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRemediationExceptions",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "Limit" } as const,
})) as any;

export type DescribeRemediationExecutionStatusError =
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchRemediationConfigurationException
  | CommonErrors;
/**
 * Provides a detailed view of a Remediation Execution for a set of resources including state, timestamps for when steps for the remediation execution occur, and any error messages for steps that have failed.
 * When you specify the limit and the next token, you receive a paginated response.
 */
export const describeRemediationExecutionStatus: API.PaginatedOperationMethod<
  DescribeRemediationExecutionStatusRequest,
  DescribeRemediationExecutionStatusResponse,
  DescribeRemediationExecutionStatusError,
  Credentials | HttpClient.HttpClient,
  RemediationExecutionStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<DescribeRemediationExecutionStatusRequest>,
  output: __S(21, __c2, 5) as any as S.Schema<DescribeRemediationExecutionStatusResponse>,
  errors: [
    InvalidNextTokenException,
    InvalidParameterValueException,
    NoSuchRemediationConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRemediationExecutionStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RemediationExecutionStatuses",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeRetentionConfigurationsError =
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchRetentionConfigurationException
  | CommonErrors;
/**
 * Returns the details of one or more retention configurations. If
 * the retention configuration name is not specified, this operation
 * returns the details for all the retention configurations for that
 * account.
 *
 * Currently, Config supports only one retention
 * configuration per region in your account.
 */
export const describeRetentionConfigurations: API.PaginatedOperationMethod<
  DescribeRetentionConfigurationsRequest,
  DescribeRetentionConfigurationsResponse,
  DescribeRetentionConfigurationsError,
  Credentials | HttpClient.HttpClient,
  RetentionConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<DescribeRetentionConfigurationsRequest>,
  output: __S(26, __c3, 2) as any as S.Schema<DescribeRetentionConfigurationsResponse>,
  errors: [
    InvalidNextTokenException,
    InvalidParameterValueException,
    NoSuchRetentionConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRetentionConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RetentionConfigurations",
  } as const,
})) as any;

export type DisassociateResourceTypesError =
  | ConflictException
  | NoSuchConfigurationRecorderException
  | ValidationException
  | CommonErrors;
/**
 * Removes all resource types specified in the `ResourceTypes` list from the RecordingGroup of configuration recorder and excludes these resource types when recording.
 *
 * For this operation, the configuration recorder must use a RecordingStrategy that is either `INCLUSION_BY_RESOURCE_TYPES` or `EXCLUSION_BY_RESOURCE_TYPES`.
 */
export const disassociateResourceTypes: API.OperationMethod<
  DisassociateResourceTypesRequest,
  DisassociateResourceTypesResponse,
  DisassociateResourceTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DisassociateResourceTypesRequest>,
  output: __S(592, __c74, 0) as any as S.Schema<DisassociateResourceTypesResponse>,
  errors: [ConflictException, NoSuchConfigurationRecorderException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResourceTypes",
}));

export type GetAggregateComplianceDetailsByConfigRuleError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchConfigurationAggregatorException
  | ValidationException
  | CommonErrors;
/**
 * Returns the evaluation results for the specified Config
 * rule for a specific resource in a rule. The results indicate which
 * Amazon Web Services resources were evaluated by the rule, when each resource was
 * last evaluated, and whether each resource complies with the rule.
 *
 * The results can return an empty result page. But if you
 * have a `nextToken`, the results are displayed on the next
 * page.
 */
export const getAggregateComplianceDetailsByConfigRule: API.PaginatedOperationMethod<
  GetAggregateComplianceDetailsByConfigRuleRequest,
  GetAggregateComplianceDetailsByConfigRuleResponse,
  GetAggregateComplianceDetailsByConfigRuleError,
  Credentials | HttpClient.HttpClient,
  AggregateEvaluationResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<GetAggregateComplianceDetailsByConfigRuleRequest>,
  output: __S(51, __c6, 3) as any as S.Schema<GetAggregateComplianceDetailsByConfigRuleResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchConfigurationAggregatorException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAggregateComplianceDetailsByConfigRule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AggregateEvaluationResults",
    pageSize: "Limit",
  } as const,
})) as any;

export type GetAggregateConfigRuleComplianceSummaryError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchConfigurationAggregatorException
  | ValidationException
  | CommonErrors;
/**
 * Returns the number of compliant and noncompliant rules for one
 * or more accounts and regions in an aggregator.
 *
 * The results can return an empty result page, but if you
 * have a nextToken, the results are displayed on the next
 * page.
 */
export const getAggregateConfigRuleComplianceSummary: API.PaginatedOperationMethod<
  GetAggregateConfigRuleComplianceSummaryRequest,
  GetAggregateConfigRuleComplianceSummaryResponse,
  GetAggregateConfigRuleComplianceSummaryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<GetAggregateConfigRuleComplianceSummaryRequest>,
  output: __S(67, __c8, 3) as any as S.Schema<GetAggregateConfigRuleComplianceSummaryResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchConfigurationAggregatorException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAggregateConfigRuleComplianceSummary",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "Limit" } as const,
})) as any;

export type GetAggregateConformancePackComplianceSummaryError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchConfigurationAggregatorException
  | ValidationException
  | CommonErrors;
/**
 * Returns the count of compliant and noncompliant conformance packs across all Amazon Web Services accounts and Amazon Web Services Regions in an aggregator. You can filter based on Amazon Web Services account ID or Amazon Web Services Region.
 *
 * The results can return an empty result page, but if you have a nextToken, the results are displayed on the next page.
 */
export const getAggregateConformancePackComplianceSummary: API.PaginatedOperationMethod<
  GetAggregateConformancePackComplianceSummaryRequest,
  GetAggregateConformancePackComplianceSummaryResponse,
  GetAggregateConformancePackComplianceSummaryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<GetAggregateConformancePackComplianceSummaryRequest>,
  output: __S(
    92,
    __c11,
    4,
  ) as any as S.Schema<GetAggregateConformancePackComplianceSummaryResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchConfigurationAggregatorException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAggregateConformancePackComplianceSummary",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "Limit" } as const,
})) as any;

export type GetAggregateDiscoveredResourceCountsError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchConfigurationAggregatorException
  | ValidationException
  | CommonErrors;
/**
 * Returns the resource counts across accounts and regions that are present in your Config aggregator. You can request the resource counts by providing filters and GroupByKey.
 *
 * For example, if the input contains accountID 12345678910 and region us-east-1 in filters, the API returns the count of resources in account ID 12345678910 and region us-east-1.
 * If the input contains ACCOUNT_ID as a GroupByKey, the API returns resource counts for all source accounts that are present in your aggregator.
 */
export const getAggregateDiscoveredResourceCounts: API.PaginatedOperationMethod<
  GetAggregateDiscoveredResourceCountsRequest,
  GetAggregateDiscoveredResourceCountsResponse,
  GetAggregateDiscoveredResourceCountsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(97, __c12, 1) as any as S.Schema<GetAggregateDiscoveredResourceCountsRequest>,
  output: __S(100, __c12, 4) as any as S.Schema<GetAggregateDiscoveredResourceCountsResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchConfigurationAggregatorException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAggregateDiscoveredResourceCounts",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "Limit" } as const,
})) as any;

export type GetAggregateResourceConfigError =
  | NoSuchConfigurationAggregatorException
  | OversizedConfigurationItemException
  | ResourceNotDiscoveredException
  | ValidationException
  | CommonErrors;
/**
 * Returns configuration item that is aggregated for your specific resource in a specific source account and region.
 *
 * The API does not return results for deleted resources.
 */
export const getAggregateResourceConfig: API.OperationMethod<
  GetAggregateResourceConfigRequest,
  GetAggregateResourceConfigResponse,
  GetAggregateResourceConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<GetAggregateResourceConfigRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<GetAggregateResourceConfigResponse>,
  errors: [
    NoSuchConfigurationAggregatorException,
    OversizedConfigurationItemException,
    ResourceNotDiscoveredException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAggregateResourceConfig",
}));

export type GetComplianceDetailsByConfigRuleError =
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchConfigRuleException
  | CommonErrors;
/**
 * Returns the evaluation results for the specified Config
 * rule. The results indicate which Amazon Web Services resources were evaluated by the
 * rule, when each resource was last evaluated, and whether each
 * resource complies with the rule.
 */
export const getComplianceDetailsByConfigRule: API.PaginatedOperationMethod<
  GetComplianceDetailsByConfigRuleRequest,
  GetComplianceDetailsByConfigRuleResponse,
  GetComplianceDetailsByConfigRuleError,
  Credentials | HttpClient.HttpClient,
  EvaluationResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<GetComplianceDetailsByConfigRuleRequest>,
  output: __S(130, __c16, 2) as any as S.Schema<GetComplianceDetailsByConfigRuleResponse>,
  errors: [InvalidNextTokenException, InvalidParameterValueException, NoSuchConfigRuleException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComplianceDetailsByConfigRule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EvaluationResults",
    pageSize: "Limit",
  } as const,
})) as any;

export type GetComplianceDetailsByResourceError = InvalidParameterValueException | CommonErrors;
/**
 * Returns the evaluation results for the specified Amazon Web Services resource.
 * The results indicate which Config rules were used to evaluate
 * the resource, when each rule was last invoked, and whether the resource
 * complies with each rule.
 */
export const getComplianceDetailsByResource: API.PaginatedOperationMethod<
  GetComplianceDetailsByResourceRequest,
  GetComplianceDetailsByResourceResponse,
  GetComplianceDetailsByResourceError,
  Credentials | HttpClient.HttpClient,
  EvaluationResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<GetComplianceDetailsByResourceRequest>,
  output: __S(130, __c16, 2) as any as S.Schema<GetComplianceDetailsByResourceResponse>,
  errors: [InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComplianceDetailsByResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EvaluationResults",
  } as const,
})) as any;

export type GetComplianceSummaryByConfigRuleError = CommonErrors;
/**
 * Returns the number of Config rules that are compliant and
 * noncompliant, up to a maximum of 25 for each.
 */
export const getComplianceSummaryByConfigRule: API.OperationMethod<
  GetComplianceSummaryByConfigRuleRequest,
  GetComplianceSummaryByConfigRuleResponse,
  GetComplianceSummaryByConfigRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<GetComplianceSummaryByConfigRuleRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<GetComplianceSummaryByConfigRuleResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComplianceSummaryByConfigRule",
}));

export type GetComplianceSummaryByResourceTypeError = InvalidParameterValueException | CommonErrors;
/**
 * Returns the number of resources that are compliant and the
 * number that are noncompliant. You can specify one or more resource
 * types to get these numbers for each resource type. The maximum
 * number returned is 100.
 */
export const getComplianceSummaryByResourceType: API.OperationMethod<
  GetComplianceSummaryByResourceTypeRequest,
  GetComplianceSummaryByResourceTypeResponse,
  GetComplianceSummaryByResourceTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<GetComplianceSummaryByResourceTypeRequest>,
  output: __S(155, __c19, 3) as any as S.Schema<GetComplianceSummaryByResourceTypeResponse>,
  errors: [InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComplianceSummaryByResourceType",
}));

export type GetConformancePackComplianceDetailsError =
  | InvalidLimitException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | NoSuchConfigRuleInConformancePackException
  | NoSuchConformancePackException
  | CommonErrors;
/**
 * Returns compliance details of a conformance pack for all Amazon Web Services resources that are monitered by conformance pack.
 */
export const getConformancePackComplianceDetails: API.PaginatedOperationMethod<
  GetConformancePackComplianceDetailsRequest,
  GetConformancePackComplianceDetailsResponse,
  GetConformancePackComplianceDetailsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(161, __c20, 1) as any as S.Schema<GetConformancePackComplianceDetailsRequest>,
  output: __S(164, __c20, 4) as any as S.Schema<GetConformancePackComplianceDetailsResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    InvalidParameterValueException,
    NoSuchConfigRuleInConformancePackException,
    NoSuchConformancePackException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConformancePackComplianceDetails",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "Limit" } as const,
})) as any;

export type GetConformancePackComplianceSummaryError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchConformancePackException
  | CommonErrors;
/**
 * Returns compliance details for the conformance pack based on the cumulative compliance results of all the rules in that conformance pack.
 */
export const getConformancePackComplianceSummary: API.PaginatedOperationMethod<
  GetConformancePackComplianceSummaryRequest,
  GetConformancePackComplianceSummaryResponse,
  GetConformancePackComplianceSummaryError,
  Credentials | HttpClient.HttpClient,
  ConformancePackComplianceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<GetConformancePackComplianceSummaryRequest>,
  output: __S(171, __c21, 3) as any as S.Schema<GetConformancePackComplianceSummaryResponse>,
  errors: [InvalidLimitException, InvalidNextTokenException, NoSuchConformancePackException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConformancePackComplianceSummary",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConformancePackComplianceSummaryList",
    pageSize: "Limit",
  } as const,
})) as any;

export type GetConnectorError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Returns the details of the specified connector.
 */
export const getConnector: API.OperationMethod<
  GetConnectorRequest,
  GetConnectorResponse,
  GetConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<GetConnectorRequest>,
  output: __S(178, __c22, 2) as any as S.Schema<GetConnectorResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnector",
}));

export type GetCustomRulePolicyError = NoSuchConfigRuleException | CommonErrors;
/**
 * Returns the policy definition containing the logic for your Config Custom Policy rule.
 */
export const getCustomRulePolicy: API.OperationMethod<
  GetCustomRulePolicyRequest,
  GetCustomRulePolicyResponse,
  GetCustomRulePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<GetCustomRulePolicyRequest>,
  output: __S(200, __c25, 0) as any as S.Schema<GetCustomRulePolicyResponse>,
  errors: [NoSuchConfigRuleException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomRulePolicy",
}));

export type GetDiscoveredResourceCountsError =
  | InvalidLimitException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Returns the resource types, the number of each resource type,
 * and the total number of resources that Config is recording in
 * this region for your Amazon Web Services account.
 *
 * **Example**
 *
 * - Config is recording three resource types in the US
 * East (Ohio) Region for your account: 25 EC2 instances, 20
 * IAM users, and 15 S3 buckets.
 *
 * - You make a call to the
 * `GetDiscoveredResourceCounts` action and
 * specify that you want all resource types.
 *
 * - Config returns the following:
 *
 * - The resource types (EC2 instances, IAM users,
 * and S3 buckets).
 *
 * - The number of each resource type (25, 20, and
 * 15).
 *
 * - The total number of all resources
 * (60).
 *
 * The response is paginated. By default, Config lists 100
 * ResourceCount objects on each page. You can
 * customize this number with the `limit` parameter. The
 * response includes a `nextToken` string. To get the next
 * page of results, run the request again and specify the string for
 * the `nextToken` parameter.
 *
 * If you make a call to the GetDiscoveredResourceCounts action, you might
 * not immediately receive resource counts in the following
 * situations:
 *
 * - You are a new Config customer.
 *
 * - You just enabled resource recording.
 *
 * It might take a few minutes for Config to record and
 * count your resources. Wait a few minutes and then retry the
 * GetDiscoveredResourceCounts action.
 */
export const getDiscoveredResourceCounts: API.PaginatedOperationMethod<
  GetDiscoveredResourceCountsRequest,
  GetDiscoveredResourceCountsResponse,
  GetDiscoveredResourceCountsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<GetDiscoveredResourceCountsRequest>,
  output: __S(211, __c26, 3) as any as S.Schema<GetDiscoveredResourceCountsResponse>,
  errors: [InvalidLimitException, InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDiscoveredResourceCounts",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", pageSize: "limit" } as const,
})) as any;

export type GetOrganizationConfigRuleDetailedStatusError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchOrganizationConfigRuleException
  | OrganizationAccessDeniedException
  | CommonErrors;
/**
 * Returns detailed status for each member account within an organization for a given organization Config rule.
 */
export const getOrganizationConfigRuleDetailedStatus: API.PaginatedOperationMethod<
  GetOrganizationConfigRuleDetailedStatusRequest,
  GetOrganizationConfigRuleDetailedStatusResponse,
  GetOrganizationConfigRuleDetailedStatusError,
  Credentials | HttpClient.HttpClient,
  MemberAccountStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(217, __c27, 1) as any as S.Schema<GetOrganizationConfigRuleDetailedStatusRequest>,
  output: __S(220, __c27, 4) as any as S.Schema<GetOrganizationConfigRuleDetailedStatusResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchOrganizationConfigRuleException,
    OrganizationAccessDeniedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationConfigRuleDetailedStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OrganizationConfigRuleDetailedStatus",
    pageSize: "Limit",
  } as const,
})) as any;

export type GetOrganizationConformancePackDetailedStatusError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchOrganizationConformancePackException
  | OrganizationAccessDeniedException
  | CommonErrors;
/**
 * Returns detailed status for each member account within an organization for a given organization conformance pack.
 */
export const getOrganizationConformancePackDetailedStatus: API.PaginatedOperationMethod<
  GetOrganizationConformancePackDetailedStatusRequest,
  GetOrganizationConformancePackDetailedStatusResponse,
  GetOrganizationConformancePackDetailedStatusError,
  Credentials | HttpClient.HttpClient,
  OrganizationConformancePackDetailedStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(225, __c28, 1) as any as S.Schema<GetOrganizationConformancePackDetailedStatusRequest>,
  output: __S(
    228,
    __c28,
    4,
  ) as any as S.Schema<GetOrganizationConformancePackDetailedStatusResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchOrganizationConformancePackException,
    OrganizationAccessDeniedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationConformancePackDetailedStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OrganizationConformancePackDetailedStatuses",
    pageSize: "Limit",
  } as const,
})) as any;

export type GetOrganizationCustomRulePolicyError =
  | NoSuchOrganizationConfigRuleException
  | OrganizationAccessDeniedException
  | CommonErrors;
/**
 * Returns the policy definition containing the logic for your organization Config Custom Policy rule.
 */
export const getOrganizationCustomRulePolicy: API.OperationMethod<
  GetOrganizationCustomRulePolicyRequest,
  GetOrganizationCustomRulePolicyResponse,
  GetOrganizationCustomRulePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<GetOrganizationCustomRulePolicyRequest>,
  output: __S(200, __c25, 0) as any as S.Schema<GetOrganizationCustomRulePolicyResponse>,
  errors: [NoSuchOrganizationConfigRuleException, OrganizationAccessDeniedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationCustomRulePolicy",
}));

export type GetResourceConfigHistoryError =
  | InvalidLimitException
  | InvalidNextTokenException
  | InvalidTimeRangeException
  | NoAvailableConfigurationRecorderException
  | ResourceNotDiscoveredException
  | ValidationException
  | CommonErrors;
/**
 * For accurate reporting on the compliance status, you must record the `AWS::Config::ResourceCompliance` resource type.
 *
 * For more information, see Recording Amazon Web Services Resources in the *Config Resources Developer Guide*.
 *
 * Returns a list of configurations items (CIs) for the specified resource.
 *
 * **Contents**
 *
 * The list contains details about each state of the resource
 * during the specified time interval. If you specified a retention
 * period to retain your CIs between a
 * minimum of 30 days and a maximum of 7 years (2557 days), Config
 * returns the CIs for the specified
 * retention period.
 *
 * **Pagination**
 *
 * The response is paginated. By default, Config returns a
 * limit of 10 configuration items per page. You can customize this
 * number with the `limit` parameter. The response includes
 * a `nextToken` string. To get the next page of results,
 * run the request again and specify the string for the
 * `nextToken` parameter.
 *
 * Each call to the API is limited to span a duration of seven
 * days. It is likely that the number of records returned is
 * smaller than the specified `limit`. In such cases,
 * you can make another call, using the
 * `nextToken`.
 */
export const getResourceConfigHistory: API.PaginatedOperationMethod<
  GetResourceConfigHistoryRequest,
  GetResourceConfigHistoryResponse,
  GetResourceConfigHistoryError,
  Credentials | HttpClient.HttpClient,
  ConfigurationItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<GetResourceConfigHistoryRequest>,
  output: __S(242, __c30, 2) as any as S.Schema<GetResourceConfigHistoryResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    InvalidTimeRangeException,
    NoAvailableConfigurationRecorderException,
    ResourceNotDiscoveredException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceConfigHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configurationItems",
    pageSize: "limit",
  } as const,
})) as any;

export type GetResourceEvaluationSummaryError = ResourceNotFoundException | CommonErrors;
/**
 * Returns a summary of resource evaluation for the specified resource evaluation ID from the proactive rules that were run.
 * The results indicate which evaluation context was used to evaluate the rules, which resource details were evaluated,
 * the evaluation mode that was run, and whether the resource details comply with the configuration of the proactive rules.
 *
 * To see additional information about the evaluation result, such as which rule flagged a resource as NON_COMPLIANT, use the GetComplianceDetailsByResource API.
 * For more information, see the Examples section.
 */
export const getResourceEvaluationSummary: API.OperationMethod<
  GetResourceEvaluationSummaryRequest,
  GetResourceEvaluationSummaryResponse,
  GetResourceEvaluationSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<GetResourceEvaluationSummaryRequest>,
  output: __S(250, __c31, 2) as any as S.Schema<GetResourceEvaluationSummaryResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceEvaluationSummary",
}));

export type GetStoredQueryError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Returns the details of a specific stored query.
 */
export const getStoredQuery: API.OperationMethod<
  GetStoredQueryRequest,
  GetStoredQueryResponse,
  GetStoredQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<GetStoredQueryRequest>,
  output: __S(265, __c33, 1) as any as S.Schema<GetStoredQueryResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStoredQuery",
}));

export type ListAggregateDiscoveredResourcesError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchConfigurationAggregatorException
  | ValidationException
  | CommonErrors;
/**
 * Accepts a resource type and returns a list of resource identifiers that are aggregated for a specific resource type across accounts and regions.
 * A resource identifier includes the resource type, ID, (if available) the custom resource name, source account, and source region.
 * You can narrow the results to include only resources that have specific resource IDs, or a resource name, or source account ID, or source region.
 *
 * For example, if the input consists of accountID 12345678910 and the region is us-east-1 for resource type `AWS::EC2::Instance` then the API returns all the EC2 instance identifiers of accountID 12345678910 and region us-east-1.
 */
export const listAggregateDiscoveredResources: API.PaginatedOperationMethod<
  ListAggregateDiscoveredResourcesRequest,
  ListAggregateDiscoveredResourcesResponse,
  ListAggregateDiscoveredResourcesError,
  Credentials | HttpClient.HttpClient,
  AggregateResourceIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(281, __c35, 1) as any as S.Schema<ListAggregateDiscoveredResourcesRequest>,
  output: __S(282, __c35, 2) as any as S.Schema<ListAggregateDiscoveredResourcesResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchConfigurationAggregatorException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAggregateDiscoveredResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceIdentifiers",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListConfigurationRecordersError = ValidationException | CommonErrors;
/**
 * Returns a list of configuration recorders depending on the filters you specify.
 */
export const listConfigurationRecorders: API.PaginatedOperationMethod<
  ListConfigurationRecordersRequest,
  ListConfigurationRecordersResponse,
  ListConfigurationRecordersError,
  Credentials | HttpClient.HttpClient,
  ConfigurationRecorderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(290, __c36, 2) as any as S.Schema<ListConfigurationRecordersRequest>,
  output: __S(293, __c36, 5) as any as S.Schema<ListConfigurationRecordersResponse>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationRecorders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationRecorderSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConformancePackComplianceScoresError =
  | InvalidLimitException
  | InvalidNextTokenException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns a list of conformance pack compliance scores.
 * A compliance score is the percentage of the number of compliant rule-resource combinations in a conformance pack compared to the number of total possible rule-resource combinations in the conformance pack.
 * This metric provides you with a high-level view of the compliance state of your conformance packs. You can use it to identify, investigate, and understand
 * the level of compliance in your conformance packs.
 *
 * Conformance packs with no evaluation results will have a compliance score of `INSUFFICIENT_DATA`.
 */
export const listConformancePackComplianceScores: API.PaginatedOperationMethod<
  ListConformancePackComplianceScoresRequest,
  ListConformancePackComplianceScoresResponse,
  ListConformancePackComplianceScoresError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(297, __c37, 1) as any as S.Schema<ListConformancePackComplianceScoresRequest>,
  output: __S(300, __c37, 4) as any as S.Schema<ListConformancePackComplianceScoresResponse>,
  errors: [InvalidLimitException, InvalidNextTokenException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConformancePackComplianceScores",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "Limit" } as const,
})) as any;

export type ListConnectorsError = ValidationException | CommonErrors;
/**
 * Returns a list of connectors depending on the filters you specify.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  ConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(306, __c38, 2) as any as S.Schema<ListConnectorsRequest>,
  output: __S(309, __c38, 5) as any as S.Schema<ListConnectorsResponse>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectorSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDiscoveredResourcesError =
  | InvalidLimitException
  | InvalidNextTokenException
  | NoAvailableConfigurationRecorderException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of resource
 * resource identifiers for the specified resource types for the resources of that type. A *resource identifier*
 * includes the resource type, ID, and (if available) the custom
 * resource name.
 *
 * The results consist of resources that Config has
 * *discovered*, including those that Config is not currently
 * recording. You can narrow the results to include only resources that
 * have specific resource IDs or a resource name.
 *
 * You can specify either resource IDs or a resource name, but
 * not both, in the same request.
 *
 * *CloudFormation stack recording behavior in Config*
 *
 * When a CloudFormation stack fails to create (for example, it enters the `ROLLBACK_FAILED` state),
 * Config does not record a configuration item (CI) for that stack. Configuration items are only recorded for stacks that reach
 * the following states:
 *
 * - `CREATE_COMPLETE`
 *
 * - `UPDATE_COMPLETE`
 *
 * - `UPDATE_ROLLBACK_COMPLETE`
 *
 * - `UPDATE_ROLLBACK_FAILED`
 *
 * - `DELETE_FAILED`
 *
 * - `DELETE_COMPLETE`
 *
 * Because no CI is created for a failed stack creation, you won't see configuration history
 * for that stack in Config, even after the stack is deleted. This helps make sure that Config only
 * tracks resources that were successfully provisioned.
 */
export const listDiscoveredResources: API.PaginatedOperationMethod<
  ListDiscoveredResourcesRequest,
  ListDiscoveredResourcesResponse,
  ListDiscoveredResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<ListDiscoveredResourcesRequest>,
  output: __S(315, __c39, 3) as any as S.Schema<ListDiscoveredResourcesResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    NoAvailableConfigurationRecorderException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoveredResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resourceIdentifiers",
    pageSize: "limit",
  } as const,
})) as any;

export type ListResourceEvaluationsError =
  | InvalidNextTokenException
  | InvalidParameterValueException
  | InvalidTimeRangeException
  | CommonErrors;
/**
 * Returns a list of proactive resource evaluations.
 */
export const listResourceEvaluations: API.PaginatedOperationMethod<
  ListResourceEvaluationsRequest,
  ListResourceEvaluationsResponse,
  ListResourceEvaluationsError,
  Credentials | HttpClient.HttpClient,
  ResourceEvaluation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(322, __c40, 2) as any as S.Schema<ListResourceEvaluationsRequest>,
  output: __S(325, __c40, 5) as any as S.Schema<ListResourceEvaluationsResponse>,
  errors: [InvalidNextTokenException, InvalidParameterValueException, InvalidTimeRangeException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceEvaluations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceEvaluations",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListStoredQueriesError = InvalidNextTokenException | ValidationException | CommonErrors;
/**
 * Lists the stored queries for a single Amazon Web Services account and a single Amazon Web Services Region. The default is 100.
 */
export const listStoredQueries: API.PaginatedOperationMethod<
  ListStoredQueriesRequest,
  ListStoredQueriesResponse,
  ListStoredQueriesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<ListStoredQueriesRequest>,
  output: __S(331, __c41, 3) as any as S.Schema<ListStoredQueriesResponse>,
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStoredQueries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidLimitException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List the tags for Config resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(337, __c42, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InvalidLimitException,
    InvalidNextTokenException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "Limit",
  } as const,
})) as any;

export type PutAggregationAuthorizationError = InvalidParameterValueException | CommonErrors;
/**
 * Authorizes the aggregator account and region to collect data
 * from the source account and region.
 *
 * **Tags are added at creation and cannot be updated with this operation**
 *
 * `PutAggregationAuthorization` is an idempotent API. Subsequent requests won't create a duplicate resource if one was already created. If a following request has different `tags` values,
 * Config will ignore these differences and treat it as an idempotent request of the previous. In this case, `tags` will not be updated, even if they are different.
 *
 * Use TagResource and UntagResource to update tags after creation.
 */
export const putAggregationAuthorization: API.OperationMethod<
  PutAggregationAuthorizationRequest,
  PutAggregationAuthorizationResponse,
  PutAggregationAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<PutAggregationAuthorizationRequest>,
  output: __S(353, __c44, 1) as any as S.Schema<PutAggregationAuthorizationResponse>,
  errors: [InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAggregationAuthorization",
}));

export type PutConfigRuleError =
  | InsufficientPermissionsException
  | InvalidParameterValueException
  | MaxNumberOfConfigRulesExceededException
  | NoAvailableConfigurationRecorderException
  | ResourceInUseException
  | CommonErrors;
/**
 * Adds or updates an Config rule to evaluate if your
 * Amazon Web Services resources comply with your desired configurations. For information on how many Config rules you can have per account,
 * see
 * **Service Limits**
 * in the *Config Developer Guide*.
 *
 * There are two types of rules: *Config Managed Rules* and *Config Custom Rules*.
 * You can use `PutConfigRule` to create both Config Managed Rules and Config Custom Rules.
 *
 * Config Managed Rules are predefined,
 * customizable rules created by Config. For a list of managed rules, see
 * List of Config
 * Managed Rules. If you are adding an Config managed rule, you must specify the
 * rule's identifier for the `SourceIdentifier` key.
 *
 * Config Custom Rules are rules that you create from scratch. There are two ways to create Config custom rules: with Lambda functions
 * ( Lambda Developer Guide) and with Guard (Guard GitHub
 * Repository), a policy-as-code language.
 *
 * Config custom rules created with Lambda
 * are called *Config Custom Lambda Rules* and Config custom rules created with
 * Guard are called *Config Custom Policy Rules*.
 *
 * If you are adding a new Config Custom Lambda rule,
 * you first need to create an Lambda function that the rule invokes to evaluate
 * your resources. When you use `PutConfigRule` to add a Custom Lambda rule to Config, you must specify the Amazon Resource
 * Name (ARN) that Lambda assigns to the function. You specify the ARN
 * in the `SourceIdentifier` key. This key is part of the
 * `Source` object, which is part of the
 * `ConfigRule` object.
 *
 * For any new Config rule that you add, specify the
 * `ConfigRuleName` in the `ConfigRule`
 * object. Do not specify the `ConfigRuleArn` or the
 * `ConfigRuleId`. These values are generated by Config for new rules.
 *
 * If you are updating a rule that you added previously, you can
 * specify the rule by `ConfigRuleName`,
 * `ConfigRuleId`, or `ConfigRuleArn` in the
 * `ConfigRule` data type that you use in this
 * request.
 *
 * For more information about developing and using Config
 * rules, see Evaluating Resources with Config Rules
 * in the *Config Developer Guide*.
 *
 * **Tags are added at creation and cannot be updated with this operation**
 *
 * `PutConfigRule` is an idempotent API. Subsequent requests won't create a duplicate resource if one was already created. If a following request has different `tags` values,
 * Config will ignore these differences and treat it as an idempotent request of the previous. In this case, `tags` will not be updated, even if they are different.
 *
 * Use TagResource and UntagResource to update tags after creation.
 */
export const putConfigRule: API.OperationMethod<
  PutConfigRuleRequest,
  PutConfigRuleResponse,
  PutConfigRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<PutConfigRuleRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<PutConfigRuleResponse>,
  errors: [
    InsufficientPermissionsException,
    InvalidParameterValueException,
    MaxNumberOfConfigRulesExceededException,
    NoAvailableConfigurationRecorderException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigRule",
}));

export type PutConfigurationAggregatorError =
  | InvalidParameterValueException
  | InvalidRoleException
  | LimitExceededException
  | NoAvailableOrganizationException
  | OrganizationAccessDeniedException
  | OrganizationAllFeaturesNotEnabledException
  | CommonErrors;
/**
 * Creates and updates the configuration aggregator with the
 * selected source accounts and regions. The source account can be
 * individual account(s) or an organization.
 *
 * `accountIds` that are passed will be replaced with existing accounts.
 * If you want to add additional accounts into the aggregator, call `DescribeConfigurationAggregators` to get the previous accounts and then append new ones.
 *
 * Config should be enabled in source accounts and regions
 * you want to aggregate.
 *
 * If your source type is an organization, you must be signed in to the management account or a registered delegated administrator and all the features must be enabled in your organization.
 * If the caller is a management account, Config calls `EnableAwsServiceAccess` API to enable integration between Config and Organizations.
 * If the caller is a registered delegated administrator, Config calls `ListDelegatedAdministrators` API to verify whether the caller is a valid delegated administrator.
 *
 * To register a delegated administrator, see Register a Delegated Administrator in the *Config developer guide*.
 *
 * **Tags are added at creation and cannot be updated with this operation**
 *
 * `PutConfigurationAggregator` is an idempotent API. Subsequent requests won't create a duplicate resource if one was already created. If a following request has different `tags` values,
 * Config will ignore these differences and treat it as an idempotent request of the previous. In this case, `tags` will not be updated, even if they are different.
 *
 * Use TagResource and UntagResource to update tags after creation.
 */
export const putConfigurationAggregator: API.OperationMethod<
  PutConfigurationAggregatorRequest,
  PutConfigurationAggregatorResponse,
  PutConfigurationAggregatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<PutConfigurationAggregatorRequest>,
  output: __S(369, __c46, 1) as any as S.Schema<PutConfigurationAggregatorResponse>,
  errors: [
    InvalidParameterValueException,
    InvalidRoleException,
    LimitExceededException,
    NoAvailableOrganizationException,
    OrganizationAccessDeniedException,
    OrganizationAllFeaturesNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationAggregator",
}));

export type PutConfigurationRecorderError =
  | InvalidConfigurationRecorderNameException
  | InvalidRecordingGroupException
  | InvalidRoleException
  | MaxNumberOfConfigurationRecordersExceededException
  | UnmodifiableEntityException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the customer managed configuration recorder.
 *
 * You can use this operation to create a new customer managed configuration recorder or to update the `roleARN` and the `recordingGroup` for an existing customer managed configuration recorder.
 *
 * To start the customer managed configuration recorder and begin recording configuration changes for the resource types you specify,
 * use the StartConfigurationRecorder operation.
 *
 * For more information, see
 * **Working with the Configuration Recorder**
 * in the *Config Developer Guide*.
 *
 * **One customer managed configuration recorder per account per Region**
 *
 * You can create only one customer managed configuration recorder for each account for each Amazon Web Services Region.
 *
 * **Default is to record all supported resource types, excluding the global IAM resource types**
 *
 * If you have not specified values for the `recordingGroup` field, the default for the customer managed configuration recorder is to record all supported resource
 * types, excluding the global IAM resource types: `AWS::IAM::Group`, `AWS::IAM::Policy`, `AWS::IAM::Role`, and `AWS::IAM::User`.
 *
 * **Tags are added at creation and cannot be updated**
 *
 * `PutConfigurationRecorder` is an idempotent API. Subsequent requests won't create a duplicate resource if one was already created. If a following request has different tags values,
 * Config will ignore these differences and treat it as an idempotent request of the previous. In this case, tags will not be updated, even if they are different.
 *
 * Use TagResource and UntagResource to update tags after creation.
 */
export const putConfigurationRecorder: API.OperationMethod<
  PutConfigurationRecorderRequest,
  PutConfigurationRecorderResponse,
  PutConfigurationRecorderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<PutConfigurationRecorderRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<PutConfigurationRecorderResponse>,
  errors: [
    InvalidConfigurationRecorderNameException,
    InvalidRecordingGroupException,
    InvalidRoleException,
    MaxNumberOfConfigurationRecordersExceededException,
    UnmodifiableEntityException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationRecorder",
}));

export type PutConformancePackError =
  | ConformancePackTemplateValidationException
  | InsufficientPermissionsException
  | InvalidParameterValueException
  | MaxNumberOfConformancePacksExceededException
  | ResourceInUseException
  | CommonErrors;
/**
 * Creates or updates a conformance pack. A conformance pack is a collection of Config rules that can be easily deployed in an account and a region and across an organization.
 * For information on how many conformance packs you can have per account,
 * see
 * **Service Limits**
 * in the *Config Developer Guide*.
 *
 * When you use `PutConformancePack` to deploy conformance packs in your account,
 * the operation can create Config rules and remediation actions without
 * requiring `config:PutConfigRule` or
 * `config:PutRemediationConfigurations` permissions in your account IAM
 * policies.
 *
 * This API uses the `AWSServiceRoleForConfigConforms` service-linked role in your
 * account to create conformance pack resources. This service-linked role includes the
 * permissions to create Config rules and remediation configurations, even
 * if your account IAM policies explicitly deny these actions.
 *
 * This API creates a service-linked role `AWSServiceRoleForConfigConforms` in your account.
 * The service-linked role is created only when the role does not exist in your account.
 *
 * You must specify only one of the follow parameters: `TemplateS3Uri`, `TemplateBody` or `TemplateSSMDocumentDetails`.
 *
 * **Tags are added at creation and cannot be updated with this operation**
 *
 * `PutConformancePack` is an idempotent API. Subsequent requests won't create a duplicate resource if one was already created. If a following request has different `tags` values,
 * Config will ignore these differences and treat it as an idempotent request of the previous. In this case, `tags` will not be updated, even if they are different.
 *
 * Use TagResource and UntagResource to update tags after creation.
 */
export const putConformancePack: API.OperationMethod<
  PutConformancePackRequest,
  PutConformancePackResponse,
  PutConformancePackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<PutConformancePackRequest>,
  output: __S(385, __c48, 1) as any as S.Schema<PutConformancePackResponse>,
  errors: [
    ConformancePackTemplateValidationException,
    InsufficientPermissionsException,
    InvalidParameterValueException,
    MaxNumberOfConformancePacksExceededException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConformancePack",
}));

export type PutConnectorError =
  | ConflictException
  | InsufficientPermissionsException
  | MaxNumberOfConnectorsExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a connector that specifies the connection between a third-party cloud service provider and Config.
 *
 * A connector is required to create a service-linked configuration recorder for a third-party cloud service provider using the PutThirdPartyServiceLinkedConfigurationRecorder operation.
 *
 * This API creates a service-linked role `AWSServiceRoleForConfigThirdParty` in your account. The service-linked role is created only when the role does not exist in your account.
 *
 * **Connectors cannot be updated**
 *
 * To update the connector configuration, you must delete all associated configuration recorders, delete the connector, and recreate it with the updated configuration.
 *
 * **Tags are added at creation and cannot be updated with this operation**
 *
 * Use TagResource and UntagResource to update tags after creation.
 */
export const putConnector: API.OperationMethod<
  PutConnectorRequest,
  PutConnectorResponse,
  PutConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<PutConnectorRequest>,
  output: __S(393, __c49, 1) as any as S.Schema<PutConnectorResponse>,
  errors: [
    ConflictException,
    InsufficientPermissionsException,
    MaxNumberOfConnectorsExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConnector",
}));

export type PutDeliveryChannelError =
  | InsufficientDeliveryPolicyException
  | InvalidDeliveryChannelNameException
  | InvalidS3KeyPrefixException
  | InvalidS3KmsKeyArnException
  | InvalidSNSTopicARNException
  | MaxNumberOfDeliveryChannelsExceededException
  | NoAvailableConfigurationRecorderException
  | NoSuchBucketException
  | CommonErrors;
/**
 * Creates or updates a delivery channel to deliver configuration
 * information and other compliance information.
 *
 * You can use this operation to create a new delivery channel or to update the Amazon S3 bucket and the
 * Amazon SNS topic of an existing delivery channel.
 *
 * For more information, see
 * **Working with the Delivery Channel**
 * in the *Config Developer Guide.*
 *
 * **One delivery channel per account per Region**
 *
 * You can have only one delivery channel for each account for each Amazon Web Services Region.
 */
export const putDeliveryChannel: API.OperationMethod<
  PutDeliveryChannelRequest,
  PutDeliveryChannelResponse,
  PutDeliveryChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c50, 0) as any as S.Schema<PutDeliveryChannelRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<PutDeliveryChannelResponse>,
  errors: [
    InsufficientDeliveryPolicyException,
    InvalidDeliveryChannelNameException,
    InvalidS3KeyPrefixException,
    InvalidS3KmsKeyArnException,
    InvalidSNSTopicARNException,
    MaxNumberOfDeliveryChannelsExceededException,
    NoAvailableConfigurationRecorderException,
    NoSuchBucketException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDeliveryChannel",
}));

export type PutEvaluationsError =
  | InvalidParameterValueException
  | InvalidResultTokenException
  | NoSuchConfigRuleException
  | CommonErrors;
/**
 * Used by an Lambda function to deliver evaluation results to
 * Config. This operation is required in every Lambda function
 * that is invoked by an Config rule.
 */
export const putEvaluations: API.OperationMethod<
  PutEvaluationsRequest,
  PutEvaluationsResponse,
  PutEvaluationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(409, __c51, 1) as any as S.Schema<PutEvaluationsRequest>,
  output: __S(410, __c51, 2) as any as S.Schema<PutEvaluationsResponse>,
  errors: [InvalidParameterValueException, InvalidResultTokenException, NoSuchConfigRuleException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEvaluations",
}));

export type PutExternalEvaluationError =
  | InvalidParameterValueException
  | NoSuchConfigRuleException
  | CommonErrors;
/**
 * Add or updates the evaluations for process checks.
 * This API checks if the rule is a process check when the name of the Config rule is provided.
 */
export const putExternalEvaluation: API.OperationMethod<
  PutExternalEvaluationRequest,
  PutExternalEvaluationResponse,
  PutExternalEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(424, __c53, 0) as any as S.Schema<PutExternalEvaluationRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<PutExternalEvaluationResponse>,
  errors: [InvalidParameterValueException, NoSuchConfigRuleException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutExternalEvaluation",
}));

export type PutOrganizationConfigRuleError =
  | InsufficientPermissionsException
  | InvalidParameterValueException
  | MaxNumberOfOrganizationConfigRulesExceededException
  | NoAvailableOrganizationException
  | OrganizationAccessDeniedException
  | OrganizationAllFeaturesNotEnabledException
  | ResourceInUseException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates an Config rule for your entire organization to evaluate if your Amazon Web Services resources comply with your
 * desired configurations. For information on how many organization Config rules you can have per account,
 * see
 * **Service Limits**
 * in the *Config Developer Guide*.
 *
 * Only a management account and a delegated administrator can create or update an organization Config rule.
 * When calling this API with a delegated administrator, you must ensure Organizations
 * `ListDelegatedAdministrator` permissions are added. An organization can have up to 3 delegated administrators.
 *
 * This API enables organization service access through the `EnableAWSServiceAccess` action and creates a service-linked
 * role `AWSServiceRoleForConfigMultiAccountSetup` in the management or delegated administrator account of your organization.
 * The service-linked role is created only when the role does not exist in the caller account.
 * Config verifies the existence of role with `GetRole` action.
 *
 * To use this API with delegated administrator, register a delegated administrator by calling Amazon Web Services Organization
 * `register-delegated-administrator` for `config-multiaccountsetup.amazonaws.com`.
 *
 * There are two types of rules: *Config Managed Rules* and *Config Custom Rules*.
 * You can use `PutOrganizationConfigRule` to create both Config Managed Rules and Config Custom Rules.
 *
 * Config Managed Rules are predefined,
 * customizable rules created by Config. For a list of managed rules, see
 * List of Config
 * Managed Rules. If you are adding an Config managed rule, you must specify the rule's identifier for the `RuleIdentifier` key.
 *
 * Config Custom Rules are rules that you create from scratch. There are two ways to create Config custom rules: with Lambda functions
 * ( Lambda Developer Guide) and with Guard (Guard GitHub
 * Repository), a policy-as-code language.
 *
 * Config custom rules created with Lambda
 * are called *Config Custom Lambda Rules* and Config custom rules created with
 * Guard are called *Config Custom Policy Rules*.
 *
 * If you are adding a new Config Custom Lambda rule, you first need to create an Lambda function in the management account or a delegated
 * administrator that the rule invokes to evaluate your resources. You also need to create an IAM role in the managed account that can be assumed by the Lambda function.
 * When you use `PutOrganizationConfigRule` to add a Custom Lambda rule to Config, you must
 * specify the Amazon Resource Name (ARN) that Lambda assigns to the function.
 *
 * Prerequisite: Ensure you call `EnableAllFeatures` API to enable all features in an organization.
 *
 * Make sure to specify one of either `OrganizationCustomPolicyRuleMetadata` for Custom Policy rules, `OrganizationCustomRuleMetadata` for Custom Lambda rules, or `OrganizationManagedRuleMetadata` for managed rules.
 */
export const putOrganizationConfigRule: API.OperationMethod<
  PutOrganizationConfigRuleRequest,
  PutOrganizationConfigRuleResponse,
  PutOrganizationConfigRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(433, __c54, 1) as any as S.Schema<PutOrganizationConfigRuleRequest>,
  output: __S(434, __c54, 2) as any as S.Schema<PutOrganizationConfigRuleResponse>,
  errors: [
    InsufficientPermissionsException,
    InvalidParameterValueException,
    MaxNumberOfOrganizationConfigRulesExceededException,
    NoAvailableOrganizationException,
    OrganizationAccessDeniedException,
    OrganizationAllFeaturesNotEnabledException,
    ResourceInUseException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutOrganizationConfigRule",
}));

export type PutOrganizationConformancePackError =
  | InsufficientPermissionsException
  | MaxNumberOfOrganizationConformancePacksExceededException
  | NoAvailableOrganizationException
  | OrganizationAccessDeniedException
  | OrganizationAllFeaturesNotEnabledException
  | OrganizationConformancePackTemplateValidationException
  | ResourceInUseException
  | ValidationException
  | CommonErrors;
/**
 * Deploys conformance packs across member accounts in an Amazon Web Services Organization. For information on how many organization conformance packs and how many Config rules you can have per account,
 * see
 * **Service Limits**
 * in the *Config Developer Guide*.
 *
 * Only a management account and a delegated administrator can call this API.
 * When calling this API with a delegated administrator, you must ensure Organizations
 * `ListDelegatedAdministrator` permissions are added. An organization can have up to 3 delegated administrators.
 *
 * When you use `PutOrganizationConformancePack` to deploy conformance packs across
 * member accounts, the operation can create Config rules and remediation
 * actions without requiring `config:PutConfigRule` or
 * `config:PutRemediationConfigurations` permissions in member account
 * IAM policies.
 *
 * This API uses the `AWSServiceRoleForConfigConforms` service-linked role in each
 * member account to create conformance pack resources. This service-linked role
 * includes the permissions to create Config rules and remediation
 * configurations, even if member account IAM policies explicitly deny these
 * actions.
 *
 * This API enables organization service access for `config-multiaccountsetup.amazonaws.com`
 * through the `EnableAWSServiceAccess` action and creates a
 * service-linked role `AWSServiceRoleForConfigMultiAccountSetup` in the management or delegated administrator account of your organization.
 * The service-linked role is created only when the role does not exist in the caller account.
 * To use this API with delegated administrator, register a delegated administrator by calling Amazon Web Services Organization
 * `register-delegate-admin` for `config-multiaccountsetup.amazonaws.com`.
 *
 * Prerequisite: Ensure you call `EnableAllFeatures` API to enable all features in an organization.
 *
 * You must specify either the `TemplateS3Uri` or the `TemplateBody` parameter, but not both.
 * If you provide both Config uses the `TemplateS3Uri` parameter and ignores the `TemplateBody` parameter.
 *
 * Config sets the state of a conformance pack to CREATE_IN_PROGRESS and UPDATE_IN_PROGRESS until the conformance pack is created or updated.
 * You cannot update a conformance pack while it is in this state.
 */
export const putOrganizationConformancePack: API.OperationMethod<
  PutOrganizationConformancePackRequest,
  PutOrganizationConformancePackResponse,
  PutOrganizationConformancePackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(440, __c55, 0) as any as S.Schema<PutOrganizationConformancePackRequest>,
  output: __S(441, __c55, 1) as any as S.Schema<PutOrganizationConformancePackResponse>,
  errors: [
    InsufficientPermissionsException,
    MaxNumberOfOrganizationConformancePacksExceededException,
    NoAvailableOrganizationException,
    OrganizationAccessDeniedException,
    OrganizationAllFeaturesNotEnabledException,
    OrganizationConformancePackTemplateValidationException,
    ResourceInUseException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutOrganizationConformancePack",
}));

export type PutRemediationConfigurationsError =
  | InsufficientPermissionsException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Adds or updates the remediation configuration with a specific Config rule with the
 * selected target or action.
 * The API creates the `RemediationConfiguration` object for the Config rule.
 * The Config rule must already exist for you to add a remediation configuration.
 * The target (SSM document) must exist and have permissions to use the target.
 *
 * **Be aware of backward incompatible changes**
 *
 * If you make backward incompatible changes to the SSM document,
 * you must call this again to ensure the remediations can run.
 *
 * This API does not support adding remediation configurations for service-linked Config Rules such as Organization Config rules,
 * the rules deployed by conformance packs, and rules deployed by Amazon Web Services Security Hub.
 *
 * **Required fields**
 *
 * For manual remediation configuration, you need to provide a value for `automationAssumeRole` or use a value in the `assumeRole`field to remediate your resources. The SSM automation document can use either as long as it maps to a valid parameter.
 *
 * However, for automatic remediation configuration, the only valid `assumeRole` field value is `AutomationAssumeRole` and you need to provide a value for `AutomationAssumeRole` to remediate your resources.
 *
 * **Auto remediation can be initiated even for compliant resources**
 *
 * If you enable auto remediation for a specific Config rule using the PutRemediationConfigurations API or the Config console,
 * it initiates the remediation process for all non-compliant resources for that specific rule.
 * The auto remediation process relies on the compliance data snapshot which is captured on a periodic basis.
 * Any non-compliant resource that is updated between the snapshot schedule will continue to be remediated based on the last known compliance data snapshot.
 *
 * This means that in some cases auto remediation can be initiated even for compliant resources, since the bootstrap processor uses a database that can have stale evaluation results based on the last known compliance data snapshot.
 */
export const putRemediationConfigurations: API.OperationMethod<
  PutRemediationConfigurationsRequest,
  PutRemediationConfigurationsResponse,
  PutRemediationConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c56, 0) as any as S.Schema<PutRemediationConfigurationsRequest>,
  output: __S(451, __c56, 3) as any as S.Schema<PutRemediationConfigurationsResponse>,
  errors: [InsufficientPermissionsException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRemediationConfigurations",
}));

export type PutRemediationExceptionsError =
  | InsufficientPermissionsException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * A remediation exception is when a specified resource is no longer considered for auto-remediation.
 * This API adds a new exception or updates an existing exception for a specified resource with a specified Config rule.
 *
 * **Exceptions block auto remediation**
 *
 * Config generates a remediation exception when a problem occurs running a remediation action for a specified resource.
 * Remediation exceptions blocks auto-remediation until the exception is cleared.
 *
 * **Manual remediation is recommended when placing an exception**
 *
 * When placing an exception on an Amazon Web Services resource, it is recommended that remediation is set as manual remediation until
 * the given Config rule for the specified resource evaluates the resource as `NON_COMPLIANT`.
 * Once the resource has been evaluated as `NON_COMPLIANT`, you can add remediation exceptions and change the remediation type back from Manual to Auto if you want to use auto-remediation.
 * Otherwise, using auto-remediation before a `NON_COMPLIANT` evaluation result can delete resources before the exception is applied.
 *
 * **Exceptions can only be performed on non-compliant resources**
 *
 * Placing an exception can only be performed on resources that are `NON_COMPLIANT`.
 * If you use this API for `COMPLIANT` resources or resources that are `NOT_APPLICABLE`, a remediation exception will not be generated.
 * For more information on the conditions that initiate the possible Config evaluation results,
 * see Concepts | Config Rules in the *Config Developer Guide*.
 *
 * **Exceptions cannot be placed on service-linked remediation actions**
 *
 * You cannot place an exception on service-linked remediation actions, such as remediation actions put by an organizational conformance pack.
 *
 * **Auto remediation can be initiated even for compliant resources**
 *
 * If you enable auto remediation for a specific Config rule using the PutRemediationConfigurations API or the Config console,
 * it initiates the remediation process for all non-compliant resources for that specific rule.
 * The auto remediation process relies on the compliance data snapshot which is captured on a periodic basis.
 * Any non-compliant resource that is updated between the snapshot schedule will continue to be remediated based on the last known compliance data snapshot.
 *
 * This means that in some cases auto remediation can be initiated even for compliant resources, since the bootstrap processor uses a database that can have stale evaluation results based on the last known compliance data snapshot.
 */
export const putRemediationExceptions: API.OperationMethod<
  PutRemediationExceptionsRequest,
  PutRemediationExceptionsResponse,
  PutRemediationExceptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(456, __c57, 0) as any as S.Schema<PutRemediationExceptionsRequest>,
  output: __S(459, __c57, 3) as any as S.Schema<PutRemediationExceptionsResponse>,
  errors: [InsufficientPermissionsException, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRemediationExceptions",
}));

export type PutResourceConfigError =
  | InsufficientPermissionsException
  | MaxActiveResourcesExceededException
  | NoRunningConfigurationRecorderException
  | ValidationException
  | CommonErrors;
/**
 * Records the configuration state for the resource provided in the request.
 *
 * The configuration state of a resource is represented in Config as Configuration Items.
 * Once this API records the configuration item, you can retrieve the list of configuration items for the custom resource type using existing Config APIs.
 *
 * The custom resource type must be registered with CloudFormation. This API accepts the configuration item registered with CloudFormation.
 *
 * When you call this API, Config only stores configuration state of the resource provided in the request. This API does not change or remediate the configuration of the resource.
 *
 * Write-only schema properites are not recorded as part of the published configuration item.
 */
export const putResourceConfig: API.OperationMethod<
  PutResourceConfigRequest,
  PutResourceConfigResponse,
  PutResourceConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c58, 0) as any as S.Schema<PutResourceConfigRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<PutResourceConfigResponse>,
  errors: [
    InsufficientPermissionsException,
    MaxActiveResourcesExceededException,
    NoRunningConfigurationRecorderException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourceConfig",
}));

export type PutRetentionConfigurationError =
  | InvalidParameterValueException
  | MaxNumberOfRetentionConfigurationsExceededException
  | CommonErrors;
/**
 * Creates and updates the retention configuration with details
 * about retention period (number of days) that Config stores your
 * historical information. The API creates the
 * `RetentionConfiguration` object and names the object
 * as **default**. When you have a
 * `RetentionConfiguration` object named **default**, calling the API modifies the
 * default object.
 *
 * Currently, Config supports only one retention
 * configuration per region in your account.
 */
export const putRetentionConfiguration: API.OperationMethod<
  PutRetentionConfigurationRequest,
  PutRetentionConfigurationResponse,
  PutRetentionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(472, __c59, 0) as any as S.Schema<PutRetentionConfigurationRequest>,
  output: __S(473, __c59, 1) as any as S.Schema<PutRetentionConfigurationResponse>,
  errors: [InvalidParameterValueException, MaxNumberOfRetentionConfigurationsExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRetentionConfiguration",
}));

export type PutServiceLinkedConfigurationRecorderError =
  | ConflictException
  | InsufficientPermissionsException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service-linked configuration recorder that is linked to a specific Amazon Web Services service based on the `ServicePrincipal` you specify.
 *
 * The configuration recorder's `name`, `recordingGroup`, `recordingMode`, and `recordingScope` is set by the service that is linked to the configuration recorder.
 *
 * For more information and a list of supported services/service principals, see
 * **Working with the Configuration Recorder**
 * in the *Config Developer Guide*.
 *
 * This API creates a service-linked role `AWSServiceRoleForConfig` in your account. The service-linked role is created only when the role does not exist in your account.
 *
 * **The recording scope determines if you receive configuration items**
 *
 * The recording scope is set by the service that is linked to the configuration recorder and determines whether you receive configuration items (CIs) in the delivery channel. If the recording scope is internal, you will not receive CIs in the delivery channel.
 *
 * **Tags are added at creation and cannot be updated with this operation**
 *
 * Use TagResource and UntagResource to update tags after creation.
 */
export const putServiceLinkedConfigurationRecorder: API.OperationMethod<
  PutServiceLinkedConfigurationRecorderRequest,
  PutServiceLinkedConfigurationRecorderResponse,
  PutServiceLinkedConfigurationRecorderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c60, 0) as any as S.Schema<PutServiceLinkedConfigurationRecorderRequest>,
  output: __S(481, __c60, 1) as any as S.Schema<PutServiceLinkedConfigurationRecorderResponse>,
  errors: [
    ConflictException,
    InsufficientPermissionsException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutServiceLinkedConfigurationRecorder",
}));

export type PutStoredQueryError =
  | ResourceConcurrentModificationException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Saves a new query or updates an existing saved query. The `QueryName` must be unique for a single Amazon Web Services account and a single Amazon Web Services Region.
 * You can create upto 300 queries in a single Amazon Web Services account and a single Amazon Web Services Region.
 *
 * **Tags are added at creation and cannot be updated**
 *
 * `PutStoredQuery` is an idempotent API. Subsequent requests won't create a duplicate resource if one was already created. If a following request has different `tags` values,
 * Config will ignore these differences and treat it as an idempotent request of the previous. In this case, `tags` will not be updated, even if they are different.
 */
export const putStoredQuery: API.OperationMethod<
  PutStoredQueryRequest,
  PutStoredQueryResponse,
  PutStoredQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(488, __c61, 0) as any as S.Schema<PutStoredQueryRequest>,
  output: __S(489, __c61, 1) as any as S.Schema<PutStoredQueryResponse>,
  errors: [ResourceConcurrentModificationException, TooManyTagsException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutStoredQuery",
}));

export type PutThirdPartyServiceLinkedConfigurationRecorderError =
  | ConflictException
  | InsufficientPermissionsException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a service-linked configuration recorder that is linked to a third-party cloud service provider based on the `ConnectorArn` you specify.
 *
 * The configuration recorder's `name`, `recordingGroup`, `recordingMode`, and `recordingScope` is set by the service that is linked to the configuration recorder.
 *
 * If a service-linked configuration recorder already exists for the specified service principal and connector, calling this operation again updates the `ScopeConfiguration`.
 *
 * **This operation can only be called by the Amazon Web Services service linked to the configuration recorder**
 *
 * Customers cannot call this operation directly. Only the linked Amazon Web Services service can create or update the service-linked configuration recorder.
 *
 * **Tags are added at creation and cannot be updated with this operation**
 *
 * Use TagResource and UntagResource to update tags after creation.
 */
export const putThirdPartyServiceLinkedConfigurationRecorder: API.OperationMethod<
  PutThirdPartyServiceLinkedConfigurationRecorderRequest,
  PutThirdPartyServiceLinkedConfigurationRecorderResponse,
  PutThirdPartyServiceLinkedConfigurationRecorderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    496,
    __c62,
    0,
  ) as any as S.Schema<PutThirdPartyServiceLinkedConfigurationRecorderRequest>,
  output: __S(
    832,
    __c104,
    0,
  ) as any as S.Schema<PutThirdPartyServiceLinkedConfigurationRecorderResponse>,
  errors: [ConflictException, InsufficientPermissionsException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutThirdPartyServiceLinkedConfigurationRecorder",
}));

export type SelectAggregateResourceConfigError =
  | InvalidExpressionException
  | InvalidLimitException
  | InvalidNextTokenException
  | NoSuchConfigurationAggregatorException
  | CommonErrors;
/**
 * Accepts a structured query language (SQL) SELECT command and an aggregator to query configuration state of Amazon Web Services resources across multiple accounts and regions,
 * performs the corresponding search, and returns resource configurations matching the properties.
 *
 * For more information about query components, see the
 *
 * **Query Components**
 * section in the *Config Developer Guide*.
 *
 * If you run an aggregation query (i.e., using `GROUP BY` or using aggregate functions such as `COUNT`; e.g., `SELECT resourceId, COUNT(*) WHERE resourceType = 'AWS::IAM::Role' GROUP BY resourceId`)
 * and do not specify the `MaxResults` or the `Limit` query parameters, the default page size is set to 500.
 *
 * If you run a non-aggregation query (i.e., not using `GROUP BY` or aggregate function; e.g., `SELECT * WHERE resourceType = 'AWS::IAM::Role'`)
 * and do not specify the `MaxResults` or the `Limit` query parameters, the default page size is set to 25.
 */
export const selectAggregateResourceConfig: API.PaginatedOperationMethod<
  SelectAggregateResourceConfigRequest,
  SelectAggregateResourceConfigResponse,
  SelectAggregateResourceConfigError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(504, __c63, 0) as any as S.Schema<SelectAggregateResourceConfigRequest>,
  output: __S(515, __c64, 3) as any as S.Schema<SelectAggregateResourceConfigResponse>,
  errors: [
    InvalidExpressionException,
    InvalidLimitException,
    InvalidNextTokenException,
    NoSuchConfigurationAggregatorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SelectAggregateResourceConfig",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "Limit",
  } as const,
})) as any;

export type SelectResourceConfigError =
  | InvalidExpressionException
  | InvalidLimitException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Accepts a structured query language (SQL) `SELECT` command, performs the corresponding search, and returns resource configurations matching the properties.
 *
 * For more information about query components, see the
 *
 * **Query Components**
 * section in the *Config Developer Guide*.
 */
export const selectResourceConfig: API.PaginatedOperationMethod<
  SelectResourceConfigRequest,
  SelectResourceConfigResponse,
  SelectResourceConfigError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(520, __c65, 0) as any as S.Schema<SelectResourceConfigRequest>,
  output: __S(515, __c64, 3) as any as S.Schema<SelectResourceConfigResponse>,
  errors: [InvalidExpressionException, InvalidLimitException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SelectResourceConfig",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "Limit",
  } as const,
})) as any;

export type StartConfigRulesEvaluationError =
  | InvalidParameterValueException
  | LimitExceededException
  | NoSuchConfigRuleException
  | ResourceInUseException
  | CommonErrors;
/**
 * Runs an on-demand evaluation for the specified Config rules
 * against the last known configuration state of the resources. Use
 * `StartConfigRulesEvaluation` when you want to test
 * that a rule you updated is working as expected.
 * `StartConfigRulesEvaluation` does not re-record the
 * latest configuration state for your resources. It re-runs an
 * evaluation against the last known state of your resources.
 *
 * You can specify up to 25 Config rules per request.
 *
 * An existing `StartConfigRulesEvaluation` call for
 * the specified rules must complete before you can call the API again.
 * If you chose to have Config stream to an Amazon SNS topic, you
 * will receive a `ConfigRuleEvaluationStarted` notification
 * when the evaluation starts.
 *
 * You don't need to call the
 * `StartConfigRulesEvaluation` API to run an
 * evaluation for a new rule. When you create a rule, Config
 * evaluates your resources against the rule automatically.
 *
 * The `StartConfigRulesEvaluation` API is useful if
 * you want to run on-demand evaluations, such as the following
 * example:
 *
 * - You have a custom rule that evaluates your IAM
 * resources every 24 hours.
 *
 * - You update your Lambda function to add additional
 * conditions to your rule.
 *
 * - Instead of waiting for the next periodic evaluation,
 * you call the `StartConfigRulesEvaluation`
 * API.
 *
 * - Config invokes your Lambda function and evaluates
 * your IAM resources.
 *
 * - Your custom rule will still run periodic evaluations
 * every 24 hours.
 */
export const startConfigRulesEvaluation: API.OperationMethod<
  StartConfigRulesEvaluationRequest,
  StartConfigRulesEvaluationResponse,
  StartConfigRulesEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c66, 0) as any as S.Schema<StartConfigRulesEvaluationRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<StartConfigRulesEvaluationResponse>,
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    NoSuchConfigRuleException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConfigRulesEvaluation",
}));

export type StartConfigurationRecorderError =
  | NoAvailableDeliveryChannelException
  | NoSuchConfigurationRecorderException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Starts the customer managed configuration recorder. The customer managed configuration recorder will begin recording configuration changes for the resource types you specify.
 *
 * You must have created a delivery channel to
 * successfully start the customer managed configuration recorder. You can use the PutDeliveryChannel operation to create a delivery channel.
 */
export const startConfigurationRecorder: API.OperationMethod<
  StartConfigurationRecorderRequest,
  StartConfigurationRecorderResponse,
  StartConfigurationRecorderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(536, __c67, 0) as any as S.Schema<StartConfigurationRecorderRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<StartConfigurationRecorderResponse>,
  errors: [
    NoAvailableDeliveryChannelException,
    NoSuchConfigurationRecorderException,
    UnmodifiableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConfigurationRecorder",
}));

export type StartRemediationExecutionError =
  | InsufficientPermissionsException
  | InvalidParameterValueException
  | NoSuchRemediationConfigurationException
  | CommonErrors;
/**
 * Runs an on-demand remediation for the specified Config rules against the last known remediation configuration. It runs an execution against the current state of your resources. Remediation execution is asynchronous.
 *
 * You can specify up to 100 resource keys per request. An existing StartRemediationExecution call for the specified resource keys must complete before you can call the API again.
 */
export const startRemediationExecution: API.OperationMethod<
  StartRemediationExecutionRequest,
  StartRemediationExecutionResponse,
  StartRemediationExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c68, 0) as any as S.Schema<StartRemediationExecutionRequest>,
  output: __S(545, __c68, 1) as any as S.Schema<StartRemediationExecutionResponse>,
  errors: [
    InsufficientPermissionsException,
    InvalidParameterValueException,
    NoSuchRemediationConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRemediationExecution",
}));

export type StartResourceEvaluationError =
  | IdempotentParameterMismatch
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Runs an on-demand evaluation for the specified resource to determine whether the resource details will comply with configured Config rules.
 * You can also use it for evaluation purposes. Config recommends using an evaluation context. It runs an execution against the resource details with all
 * of the Config rules in your account that match with the specified proactive mode and resource type.
 *
 * Ensure you have the `cloudformation:DescribeType` role setup to validate the resource type schema.
 *
 * You can find the
 * Resource type schema in "*Amazon Web Services public extensions*" within the CloudFormation registry or with the following CLI commmand:
 * `aws cloudformation describe-type --type-name "AWS::S3::Bucket" --type RESOURCE`.
 *
 * For more information, see Managing extensions through the CloudFormation registry
 * and Amazon Web Services resource and property types reference in the CloudFormation User Guide.
 */
export const startResourceEvaluation: API.OperationMethod<
  StartResourceEvaluationRequest,
  StartResourceEvaluationResponse,
  StartResourceEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(552, __c69, 0) as any as S.Schema<StartResourceEvaluationRequest>,
  output: __S(553, __c69, 1) as any as S.Schema<StartResourceEvaluationResponse>,
  errors: [IdempotentParameterMismatch, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartResourceEvaluation",
}));

export type StopConfigurationRecorderError =
  | NoSuchConfigurationRecorderException
  | UnmodifiableEntityException
  | CommonErrors;
/**
 * Stops the customer managed configuration recorder. The customer managed configuration recorder will stop recording configuration changes for the resource types you have specified.
 */
export const stopConfigurationRecorder: API.OperationMethod<
  StopConfigurationRecorderRequest,
  StopConfigurationRecorderResponse,
  StopConfigurationRecorderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c70, 0) as any as S.Schema<StopConfigurationRecorderRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<StopConfigurationRecorderResponse>,
  errors: [NoSuchConfigurationRecorderException, UnmodifiableEntityException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopConfigurationRecorder",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `ResourceArn`. If existing tags on a resource are not specified in the request parameters, they are not changed.
 * If existing tags are specified, however, then their values will be updated. When a resource is deleted, the tags associated with that resource are deleted as well.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(568, __c71, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, TooManyTagsException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Deletes specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c72, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(696, __c87, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.String,
          ResourceKeys: S.optional(__S(801, __c100, 1)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRemediationExceptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RemediationExceptions: S.optional(__S(9, __c1, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeRemediationExceptionsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.String,
          ResourceType: S.String,
          ResourceId: S.String,
          Message: S.optional(S.String),
          ExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RemediationException" });
    case 1:
      return S.Array(__S(8, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.String,
          ResourceKeys: S.optional(__S(681, __c85, 1)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRemediationExecutionStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          State: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StopTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RemediationExecutionStep" });
    case 2:
      return S.Array(__S(17, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ResourceKey: S.optional(__S(680, __c85, 0)),
          State: S.optional(S.String),
          StepDetails: S.optional(__S(18, __c2, 2)),
          InvocationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RemediationExecutionStatus" });
    case 4:
      return S.Array(__S(19, __c2, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          RemediationExecutionStatuses: S.optional(__S(20, __c2, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeRemediationExecutionStatusResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RetentionConfigurationNames: S.optional(__S(608, __c76, 0)),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRetentionConfigurationsRequest" });
    case 1:
      return S.Array(__S(32, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RetentionConfigurations: S.optional(__S(25, __c3, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeRetentionConfigurationsResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, RetentionPeriodInDays: S.Number }),
      ).annotate({ identifier: "RetentionConfiguration" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationRecorderArn: S.String, ResourceTypes: __S(600, __c75, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateResourceTypesRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.String,
          ConfigRuleName: S.String,
          AccountId: S.String,
          AwsRegion: S.String,
          ComplianceType: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAggregateComplianceDetailsByConfigRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EvaluationResultIdentifier: S.optional(__S(57, __c7, 1)),
          ComplianceType: S.optional(S.String),
          ResultRecordedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ConfigRuleInvokedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Annotation: S.optional(S.String),
          AccountId: S.optional(S.String),
          AwsRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "AggregateEvaluationResult" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AggregateEvaluationResults: S.optional(__S(50, __c6, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetAggregateComplianceDetailsByConfigRuleResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          EvaluationMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "EvaluationResultQualifier" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EvaluationResultQualifier: S.optional(__S(56, __c7, 0)),
          OrderingTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceEvaluationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "EvaluationResultIdentifier" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.String,
          Filters: S.optional(__S(72, __c9, 0)),
          GroupByKey: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAggregateConfigRuleComplianceSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.optional(S.String),
          ComplianceSummary: S.optional(__S(80, __c10, 0)),
        }),
      ).annotate({ identifier: "AggregateComplianceCount" });
    case 2:
      return S.Array(__S(65, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          GroupByKey: S.optional(S.String),
          AggregateComplianceCounts: S.optional(__S(66, __c8, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetAggregateConfigRuleComplianceSummaryResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), AwsRegion: S.optional(S.String) }),
      ).annotate({ identifier: "ConfigRuleComplianceSummaryFilters" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CompliantResourceCount: S.optional(__S(872, __c109, 0)),
          NonCompliantResourceCount: S.optional(__S(872, __c109, 0)),
          ComplianceSummaryTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ComplianceSummary" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.String,
          Filters: S.optional(__S(72, __c9, 0)),
          GroupByKey: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAggregateConformancePackComplianceSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CompliantConformancePackCount: S.optional(S.Number),
          NonCompliantConformancePackCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AggregateConformancePackComplianceCount" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ComplianceSummary: S.optional(__S(89, __c11, 1)),
          GroupName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AggregateConformancePackComplianceSummary" });
    case 3:
      return S.Array(__S(90, __c11, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          AggregateConformancePackComplianceSummaries: S.optional(__S(91, __c11, 3)),
          GroupByKey: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetAggregateConformancePackComplianceSummaryResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          AccountId: S.optional(S.String),
          Region: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceCountFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.String,
          Filters: S.optional(__S(96, __c12, 0)),
          GroupByKey: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAggregateDiscoveredResourceCountsRequest" });
    case 2:
      return S.suspend(() => S.Struct({ GroupName: S.String, ResourceCount: S.Number })).annotate({
        identifier: "GroupedResourceCount",
      });
    case 3:
      return S.Array(__S(98, __c12, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          TotalDiscoveredResources: S.Number,
          GroupByKey: S.optional(S.String),
          GroupedResourceCounts: S.optional(__S(99, __c12, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetAggregateDiscoveredResourceCountsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.String,
          ResourceIdentifier: __S(640, __c80, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAggregateResourceConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ConfigurationItem: S.optional(__S(114, __c14, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetAggregateResourceConfigResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.optional(S.String),
          resourceId: S.optional(S.String),
          resourceName: S.optional(S.String),
          relationshipName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Relationship" });
    case 1:
      return S.Array(__S(112, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          version: S.optional(S.String),
          accountId: S.optional(S.String),
          configurationItemCaptureTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          configurationItemStatus: S.optional(S.String),
          configurationStateId: S.optional(S.String),
          configurationItemMD5Hash: S.optional(S.String),
          arn: S.optional(S.String),
          resourceType: S.optional(S.String),
          resourceId: S.optional(S.String),
          resourceName: S.optional(S.String),
          awsRegion: S.optional(S.String),
          availabilityZone: S.optional(S.String),
          resourceCreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(664, __c83, 0)),
          relatedEvents: S.optional(__S(608, __c76, 0)),
          relationships: S.optional(__S(113, __c14, 1)),
          configuration: S.optional(S.String),
          supplementaryConfiguration: S.optional(__S(664, __c83, 0)),
          recordingFrequency: S.optional(S.String),
          configurationItemDeliveryTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
        }),
      ).annotate({ identifier: "ConfigurationItem" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.String,
          ComplianceTypes: S.optional(__S(600, __c75, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetComplianceDetailsByConfigRuleRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EvaluationResultIdentifier: S.optional(__S(57, __c7, 1)),
          ComplianceType: S.optional(S.String),
          ResultRecordedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ConfigRuleInvokedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Annotation: S.optional(S.String),
          ResultToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "EvaluationResult" });
    case 1:
      return S.Array(__S(128, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EvaluationResults: S.optional(__S(129, __c16, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetComplianceDetailsByConfigRuleResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ComplianceTypes: S.optional(__S(600, __c75, 0)),
          NextToken: S.optional(S.String),
          ResourceEvaluationId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetComplianceDetailsByResourceRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetComplianceSummaryByConfigRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ComplianceSummary: S.optional(__S(80, __c10, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetComplianceSummaryByConfigRuleResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceTypes: S.optional(__S(608, __c76, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetComplianceSummaryByResourceTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          ComplianceSummary: S.optional(__S(80, __c10, 0)),
        }),
      ).annotate({ identifier: "ComplianceSummaryByResourceType" });
    case 2:
      return S.Array(__S(153, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ComplianceSummariesByResourceType: S.optional(__S(154, __c19, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetComplianceSummaryByResourceTypeResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleNames: S.optional(__S(608, __c76, 0)),
          ComplianceType: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceIds: S.optional(__S(608, __c76, 0)),
        }),
      ).annotate({ identifier: "ConformancePackEvaluationFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConformancePackName: S.String,
          Filters: S.optional(__S(160, __c20, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetConformancePackComplianceDetailsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ComplianceType: S.String,
          EvaluationResultIdentifier: __S(57, __c7, 1),
          ConfigRuleInvokedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ResultRecordedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Annotation: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConformancePackEvaluationResult" });
    case 3:
      return S.Array(__S(162, __c20, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ConformancePackName: S.String,
          ConformancePackRuleEvaluationResults: S.optional(__S(163, __c20, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetConformancePackComplianceDetailsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConformancePackNames: __S(608, __c76, 0),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetConformancePackComplianceSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ConformancePackName: S.String, ConformancePackComplianceStatus: S.String }),
      ).annotate({ identifier: "ConformancePackComplianceSummary" });
    case 2:
      return S.Array(__S(169, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConformancePackComplianceSummaryList: S.optional(__S(170, __c21, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetConformancePackComplianceSummaryResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetConnectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          connectorConfiguration: __S(185, __c23, 1),
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Connector" });
    case 2:
      return S.suspend(() => S.Struct({ Connector: __S(177, __c22, 1) }).pipe(ns)).annotate({
        identifier: "GetConnectorResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tenantIdentifier: S.String, clientIdentifier: S.String }),
      ).annotate({ identifier: "AzureConnectorConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ azure: S.optional(__S(184, __c23, 0)) })).annotate({
        identifier: "ConnectorConfiguration",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigRuleName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCustomRulePolicyRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PolicyText: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GetCustomRulePolicyResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceTypes: S.optional(__S(608, __c76, 0)),
          limit: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDiscoveredResourceCountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceType: S.optional(S.String), count: S.optional(S.Number) }),
      ).annotate({ identifier: "ResourceCount" });
    case 2:
      return S.Array(__S(209, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          totalDiscoveredResources: S.optional(S.Number),
          resourceCounts: S.optional(__S(210, __c26, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetDiscoveredResourceCountsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          MemberAccountRuleStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "StatusDetailFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OrganizationConfigRuleName: S.String,
          Filters: S.optional(__S(216, __c27, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetOrganizationConfigRuleDetailedStatusRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          ConfigRuleName: S.String,
          MemberAccountRuleStatus: S.String,
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MemberAccountStatus" });
    case 3:
      return S.Array(__S(218, __c27, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          OrganizationConfigRuleDetailedStatus: S.optional(__S(219, __c27, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetOrganizationConfigRuleDetailedStatusResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "OrganizationResourceDetailedStatusFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OrganizationConformancePackName: S.String,
          Filters: S.optional(__S(224, __c28, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetOrganizationConformancePackDetailedStatusRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String,
          ConformancePackName: S.String,
          Status: S.String,
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OrganizationConformancePackDetailedStatus" });
    case 3:
      return S.Array(__S(226, __c28, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          OrganizationConformancePackDetailedStatuses: S.optional(__S(227, __c28, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetOrganizationConformancePackDetailedStatusResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationConfigRuleName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOrganizationCustomRulePolicyRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          resourceId: S.String,
          laterTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          earlierTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          chronologicalOrder: S.optional(S.String),
          limit: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetResourceConfigHistoryRequest" });
    case 1:
      return S.Array(__S(114, __c14, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          configurationItems: S.optional(__S(241, __c30, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetResourceConfigHistoryResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceEvaluationId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourceEvaluationSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Status: S.String, FailureReason: S.optional(S.String) }),
      ).annotate({ identifier: "EvaluationStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceEvaluationId: S.optional(S.String),
          EvaluationMode: S.optional(S.String),
          EvaluationStatus: S.optional(__S(249, __c31, 1)),
          EvaluationStartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Compliance: S.optional(S.String),
          EvaluationContext: S.optional(__S(256, __c32, 0)),
          ResourceDetails: S.optional(__S(257, __c32, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GetResourceEvaluationSummaryResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EvaluationContextIdentifier: S.optional(S.String) }),
      ).annotate({ identifier: "EvaluationContext" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.String,
          ResourceType: S.String,
          ResourceConfiguration: S.String,
          ResourceConfigurationSchemaType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceDetails" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetStoredQueryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ StoredQuery: S.optional(__S(272, __c34, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetStoredQueryResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueryId: S.optional(S.String),
          QueryArn: S.optional(S.String),
          QueryName: S.String,
          Description: S.optional(S.String),
          Expression: S.optional(S.String),
        }),
      ).annotate({ identifier: "StoredQuery" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ResourceName: S.optional(S.String),
          Region: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.String,
          ResourceType: S.String,
          Filters: S.optional(__S(280, __c35, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAggregateDiscoveredResourcesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifiers: S.optional(__S(648, __c81, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAggregateDiscoveredResourcesResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ filterName: S.optional(S.String), filterValue: S.optional(__S(608, __c76, 0)) }),
      ).annotate({ identifier: "ConfigurationRecorderFilter" });
    case 1:
      return S.Array(__S(288, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(289, __c36, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConfigurationRecordersRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          servicePrincipal: S.optional(S.String),
          recordingScope: S.String,
          provider: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigurationRecorderSummary" });
    case 4:
      return S.Array(__S(291, __c36, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ConfigurationRecorderSummaries: __S(292, __c36, 4),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListConfigurationRecordersResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ConformancePackNames: __S(608, __c76, 0) })).annotate({
        identifier: "ConformancePackComplianceScoresFilters",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(296, __c37, 0)),
          SortOrder: S.optional(S.String),
          SortBy: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConformancePackComplianceScoresRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Score: S.optional(S.String),
          ConformancePackName: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ConformancePackComplianceScore" });
    case 3:
      return S.Array(__S(298, __c37, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ConformancePackComplianceScores: __S(299, __c37, 3),
        }).pipe(ns),
      ).annotate({ identifier: "ListConformancePackComplianceScoresResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filterName: S.optional(S.String),
          filterValues: S.optional(__S(608, __c76, 0)),
        }),
      ).annotate({ identifier: "ConnectorFilter" });
    case 1:
      return S.Array(__S(304, __c38, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(305, __c38, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConnectorsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          provider: S.String,
          tenantIdentifier: S.String,
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ConnectorSummary" });
    case 4:
      return S.Array(__S(307, __c38, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ ConnectorSummaries: __S(308, __c38, 4), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListConnectorsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          resourceIds: S.optional(__S(608, __c76, 0)),
          resourceName: S.optional(S.String),
          limit: S.optional(S.Number),
          includeDeletedResources: S.optional(S.Boolean),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDiscoveredResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.optional(S.String),
          resourceId: S.optional(S.String),
          resourceName: S.optional(S.String),
          resourceDeletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ResourceIdentifier" });
    case 2:
      return S.Array(__S(313, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          resourceIdentifiers: S.optional(__S(314, __c39, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDiscoveredResourcesResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimeWindow" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EvaluationMode: S.optional(S.String),
          TimeWindow: S.optional(__S(320, __c40, 0)),
          EvaluationContextIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceEvaluationFilters" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(321, __c40, 1)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResourceEvaluationsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ResourceEvaluationId: S.optional(S.String),
          EvaluationMode: S.optional(S.String),
          EvaluationStartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ResourceEvaluation" });
    case 4:
      return S.Array(__S(323, __c40, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ResourceEvaluations: S.optional(__S(324, __c40, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListResourceEvaluationsResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListStoredQueriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryId: S.String,
          QueryArn: S.String,
          QueryName: S.String,
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "StoredQueryMetadata" });
    case 2:
      return S.Array(__S(329, __c41, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          StoredQueryMetadata: S.optional(__S(330, __c41, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListStoredQueriesResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(345, __c43, 1)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(344, __c43, 0));
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthorizedAccountId: S.String,
          AuthorizedAwsRegion: S.String,
          Tags: S.optional(__S(345, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutAggregationAuthorizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AggregationAuthorization: S.optional(__S(896, __c112, 0)) }).pipe(ns),
      ).annotate({ identifier: "PutAggregationAuthorizationResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigRule: __S(943, __c117, 7), Tags: S.optional(__S(345, __c43, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutConfigRuleRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.String,
          AccountAggregationSources: S.optional(__S(953, __c119, 1)),
          OrganizationAggregationSource: S.optional(__S(954, __c119, 2)),
          Tags: S.optional(__S(345, __c43, 1)),
          AggregatorFilters: S.optional(__S(956, __c119, 4)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutConfigurationAggregatorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ConfigurationAggregator: S.optional(__S(957, __c119, 5)) }).pipe(ns),
      ).annotate({ identifier: "PutConfigurationAggregatorResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationRecorder: __S(622, __c77, 6),
          Tags: S.optional(__S(345, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutConfigurationRecorderRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConformancePackName: S.String,
          TemplateS3Uri: S.optional(S.String),
          TemplateBody: S.optional(S.String),
          DeliveryS3Bucket: S.optional(S.String),
          DeliveryS3KeyPrefix: S.optional(S.String),
          ConformancePackInputParameters: S.optional(__S(1009, __c126, 1)),
          TemplateSSMDocumentDetails: S.optional(__S(1000, __c125, 0)),
          Tags: S.optional(__S(345, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutConformancePackRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ConformancePackArn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "PutConformancePackResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorConfiguration: __S(185, __c23, 1),
          Tags: S.optional(__S(345, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutConnectorRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Arn: S.String }).pipe(ns)).annotate({
        identifier: "PutConnectorResponse",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeliveryChannel: __S(1033, __c129, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutDeliveryChannelRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(416, __c52, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Evaluations: S.optional(__S(408, __c51, 0)),
          ResultToken: S.String,
          TestMode: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutEvaluationsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ FailedEvaluations: S.optional(__S(408, __c51, 0)) }).pipe(ns),
      ).annotate({ identifier: "PutEvaluationsResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ComplianceResourceType: S.String,
          ComplianceResourceId: S.String,
          ComplianceType: S.String,
          Annotation: S.optional(S.String),
          OrderingTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Evaluation" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigRuleName: S.String, ExternalEvaluation: __S(416, __c52, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutExternalEvaluationRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          OrganizationConfigRuleTriggerTypes: S.optional(__S(600, __c75, 0)),
          InputParameters: S.optional(S.String),
          MaximumExecutionFrequency: S.optional(S.String),
          ResourceTypesScope: S.optional(__S(608, __c76, 0)),
          ResourceIdScope: S.optional(S.String),
          TagKeyScope: S.optional(S.String),
          TagValueScope: S.optional(S.String),
          PolicyRuntime: S.String,
          PolicyText: S.String,
          DebugLogDeliveryAccounts: S.optional(__S(608, __c76, 0)),
        }),
      ).annotate({ identifier: "OrganizationCustomPolicyRuleMetadata" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OrganizationConfigRuleName: S.String,
          OrganizationManagedRuleMetadata: S.optional(__S(1056, __c132, 0)),
          OrganizationCustomRuleMetadata: S.optional(__S(1057, __c132, 1)),
          ExcludedAccounts: S.optional(__S(608, __c76, 0)),
          OrganizationCustomPolicyRuleMetadata: S.optional(__S(432, __c54, 0)),
          Tags: S.optional(__S(345, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutOrganizationConfigRuleRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ OrganizationConfigRuleArn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "PutOrganizationConfigRuleResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationConformancePackName: S.String,
          TemplateS3Uri: S.optional(S.String),
          TemplateBody: S.optional(S.String),
          DeliveryS3Bucket: S.optional(S.String),
          DeliveryS3KeyPrefix: S.optional(S.String),
          ConformancePackInputParameters: S.optional(__S(1009, __c126, 1)),
          ExcludedAccounts: S.optional(__S(608, __c76, 0)),
          Tags: S.optional(__S(345, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutOrganizationConformancePackRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ OrganizationConformancePackArn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "PutOrganizationConformancePackResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RemediationConfigurations: __S(1111, __c138, 7) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutRemediationConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FailureMessage: S.optional(S.String),
          FailedItems: S.optional(__S(1111, __c138, 7)),
        }),
      ).annotate({ identifier: "FailedRemediationBatch" });
    case 2:
      return S.Array(__S(449, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ FailedBatches: S.optional(__S(450, __c56, 2)) }).pipe(ns),
      ).annotate({ identifier: "PutRemediationConfigurationsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.String,
          ResourceKeys: __S(801, __c100, 1),
          Message: S.optional(S.String),
          ExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutRemediationExceptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FailureMessage: S.optional(S.String),
          FailedItems: S.optional(__S(9, __c1, 1)),
        }),
      ).annotate({ identifier: "FailedRemediationExceptionBatch" });
    case 2:
      return S.Array(__S(457, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ FailedBatches: S.optional(__S(458, __c57, 2)) }).pipe(ns),
      ).annotate({ identifier: "PutRemediationExceptionsResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.String,
          SchemaVersionId: S.String,
          ResourceId: S.String,
          ResourceName: S.optional(S.String),
          Configuration: S.String,
          Tags: S.optional(__S(664, __c83, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutResourceConfigRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RetentionPeriodInDays: S.Number }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutRetentionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RetentionConfiguration: S.optional(__S(32, __c4, 0)) }).pipe(ns),
      ).annotate({ identifier: "PutRetentionConfigurationResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServicePrincipal: S.String, Tags: S.optional(__S(345, __c43, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutServiceLinkedConfigurationRecorderRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "PutServiceLinkedConfigurationRecorderResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StoredQuery: __S(272, __c34, 0), Tags: S.optional(__S(345, __c43, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutStoredQueryRequest" });
    case 1:
      return S.suspend(() => S.Struct({ QueryArn: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "PutStoredQueryResponse",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServicePrincipal: S.String,
          ConnectorArn: S.String,
          ScopeConfiguration: __S(624, __c78, 0),
          Tags: S.optional(__S(345, __c43, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutThirdPartyServiceLinkedConfigurationRecorderRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Expression: S.String,
          ConfigurationAggregatorName: S.String,
          Limit: S.optional(S.Number),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SelectAggregateResourceConfigRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "FieldInfo",
      });
    case 1:
      return S.Array(__S(512, __c64, 0));
    case 2:
      return S.suspend(() => S.Struct({ SelectFields: S.optional(__S(513, __c64, 1)) })).annotate({
        identifier: "QueryInfo",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Results: S.optional(__S(608, __c76, 0)),
          QueryInfo: S.optional(__S(514, __c64, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "SelectAggregateResourceConfigResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Expression: S.String,
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SelectResourceConfigRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigRuleNames: S.optional(__S(608, __c76, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartConfigRulesEvaluationRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationRecorderName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartConfigurationRecorderRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigRuleName: S.String, ResourceKeys: __S(681, __c85, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartRemediationExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FailureMessage: S.optional(S.String),
          FailedItems: S.optional(__S(681, __c85, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "StartRemediationExecutionResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceDetails: __S(257, __c32, 1),
          EvaluationContext: S.optional(__S(256, __c32, 0)),
          EvaluationMode: S.String,
          EvaluationTimeout: S.optional(S.Number),
          ClientToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartResourceEvaluationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceEvaluationId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "StartResourceEvaluationResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationRecorderName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopConfigurationRecorderRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(345, __c43, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(608, __c76, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationRecorderArn: S.String, ResourceTypes: __S(600, __c75, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateResourceTypesRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationRecorder: __S(622, __c77, 6) }).pipe(ns),
      ).annotate({ identifier: "AssociateResourceTypesResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ resourceTypes: S.optional(__S(600, __c75, 0)) })).annotate({
        identifier: "ExclusionByResourceTypes",
      });
    case 1:
      return S.suspend(() => S.Struct({ useOnly: S.optional(S.String) })).annotate({
        identifier: "RecordingStrategy",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          allSupported: S.optional(S.Boolean),
          includeGlobalResourceTypes: S.optional(S.Boolean),
          resourceTypes: S.optional(__S(600, __c75, 0)),
          exclusionByResourceTypes: S.optional(__S(616, __c77, 0)),
          recordingStrategy: S.optional(__S(617, __c77, 1)),
        }),
      ).annotate({ identifier: "RecordingGroup" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          resourceTypes: __S(600, __c75, 0),
          recordingFrequency: S.String,
        }),
      ).annotate({ identifier: "RecordingModeOverride" });
    case 4:
      return S.Array(__S(619, __c77, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          recordingFrequency: S.String,
          recordingModeOverrides: S.optional(__S(620, __c77, 4)),
        }),
      ).annotate({ identifier: "RecordingMode" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          roleARN: S.optional(S.String),
          recordingGroup: S.optional(__S(618, __c77, 2)),
          recordingMode: S.optional(__S(621, __c77, 5)),
          recordingScope: S.optional(S.String),
          servicePrincipal: S.optional(S.String),
          connectorArn: S.optional(S.String),
          scopeConfiguration: S.optional(__S(624, __c78, 0)),
        }),
      ).annotate({ identifier: "ConfigurationRecorder" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeType: S.String,
          scopeValues: S.optional(__S(608, __c76, 0)),
          allRegions: S.Boolean,
          includedRegions: S.optional(__S(608, __c76, 0)),
        }),
      ).annotate({ identifier: "ScopeConfiguration" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.String,
          ResourceIdentifiers: __S(648, __c81, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchGetAggregateResourceConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BaseConfigurationItems: S.optional(__S(657, __c82, 1)),
          UnprocessedResourceIdentifiers: S.optional(__S(648, __c81, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "BatchGetAggregateResourceConfigResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceAccountId: S.String,
          SourceRegion: S.String,
          ResourceId: S.String,
          ResourceType: S.String,
          ResourceName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AggregateResourceIdentifier" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(640, __c80, 0));
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          version: S.optional(S.String),
          accountId: S.optional(S.String),
          configurationItemCaptureTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          configurationItemStatus: S.optional(S.String),
          configurationStateId: S.optional(S.String),
          arn: S.optional(S.String),
          resourceType: S.optional(S.String),
          resourceId: S.optional(S.String),
          resourceName: S.optional(S.String),
          awsRegion: S.optional(S.String),
          availabilityZone: S.optional(S.String),
          resourceCreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          configuration: S.optional(S.String),
          supplementaryConfiguration: S.optional(__S(664, __c83, 0)),
          recordingFrequency: S.optional(S.String),
          configurationItemDeliveryTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
        }),
      ).annotate({ identifier: "BaseConfigurationItem" });
    case 1:
      return S.Array(__S(656, __c82, 0));
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceKeys: __S(681, __c85, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetResourceConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          baseConfigurationItems: S.optional(__S(657, __c82, 1)),
          unprocessedResourceKeys: S.optional(__S(681, __c85, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "BatchGetResourceConfigResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ resourceType: S.String, resourceId: S.String })).annotate({
        identifier: "ResourceKey",
      });
    case 1:
      return S.Array(__S(680, __c85, 0));
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AuthorizedAccountId: S.String, AuthorizedAwsRegion: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAggregationAuthorizationRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAggregationAuthorizationResponse",
      });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigRuleName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConfigRuleRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationAggregatorName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConfigurationAggregatorRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationRecorderName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConfigurationRecorderRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConformancePackName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConformancePackRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConnectorRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeliveryChannelName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDeliveryChannelRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigRuleName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEvaluationResultsRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationConfigRuleName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOrganizationConfigRuleRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OrganizationConformancePackName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOrganizationConformancePackRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RequesterAccountId: S.String, RequesterAwsRegion: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePendingAggregationRequestRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigRuleName: S.String, ResourceType: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRemediationConfigurationRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigRuleName: S.String, ResourceKeys: __S(801, __c100, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRemediationExceptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FailureMessage: S.optional(S.String),
          FailedItems: S.optional(__S(801, __c100, 1)),
        }),
      ).annotate({ identifier: "FailedDeleteRemediationExceptionsBatch" });
    case 2:
      return S.Array(__S(793, __c99, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ FailedBatches: S.optional(__S(794, __c99, 2)) }).pipe(ns),
      ).annotate({ identifier: "DeleteRemediationExceptionsResponse" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.optional(S.String), ResourceId: S.optional(S.String) }),
      ).annotate({ identifier: "RemediationExceptionResourceKey" });
    case 1:
      return S.Array(__S(800, __c100, 0));
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.String, ResourceId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourceConfigRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RetentionConfigurationName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRetentionConfigurationRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServicePrincipal: S.optional(S.String), Arn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteServiceLinkedConfigurationRecorderRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Arn: S.String, Name: S.String }).pipe(ns)).annotate({
        identifier: "DeleteServiceLinkedConfigurationRecorderResponse",
      });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteStoredQueryRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deliveryChannelName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeliverConfigSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ configSnapshotId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DeliverConfigSnapshotResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.optional(S.String),
          ComplianceType: S.optional(S.String),
          AccountId: S.optional(S.String),
          AwsRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigRuleComplianceFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.String,
          Filters: S.optional(__S(856, __c107, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAggregateComplianceByConfigRulesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.optional(S.String),
          Compliance: S.optional(__S(864, __c108, 0)),
          AccountId: S.optional(S.String),
          AwsRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "AggregateComplianceByConfigRule" });
    case 3:
      return S.Array(__S(858, __c107, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          AggregateComplianceByConfigRules: S.optional(__S(859, __c107, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAggregateComplianceByConfigRulesResponse" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ComplianceType: S.optional(S.String),
          ComplianceContributorCount: S.optional(__S(872, __c109, 0)),
        }),
      ).annotate({ identifier: "Compliance" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CappedCount: S.optional(S.Number), CapExceeded: S.optional(S.Boolean) }),
      ).annotate({ identifier: "ComplianceContributorCount" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConformancePackName: S.optional(S.String),
          ComplianceType: S.optional(S.String),
          AccountId: S.optional(S.String),
          AwsRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "AggregateConformancePackComplianceFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.String,
          Filters: S.optional(__S(880, __c110, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAggregateComplianceByConformancePacksRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ComplianceType: S.optional(S.String),
          CompliantRuleCount: S.optional(S.Number),
          NonCompliantRuleCount: S.optional(S.Number),
          TotalRuleCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AggregateConformancePackCompliance" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConformancePackName: S.optional(S.String),
          Compliance: S.optional(__S(882, __c110, 2)),
          AccountId: S.optional(S.String),
          AwsRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "AggregateComplianceByConformancePack" });
    case 4:
      return S.Array(__S(883, __c110, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AggregateComplianceByConformancePacks: S.optional(__S(884, __c110, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAggregateComplianceByConformancePacksResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Limit: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAggregationAuthorizationsRequest" });
    case 1:
      return S.Array(__S(896, __c112, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AggregationAuthorizations: S.optional(__S(889, __c111, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAggregationAuthorizationsResponse" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AggregationAuthorizationArn: S.optional(S.String),
          AuthorizedAccountId: S.optional(S.String),
          AuthorizedAwsRegion: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AggregationAuthorization" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleNames: S.optional(__S(608, __c76, 0)),
          ComplianceTypes: S.optional(__S(600, __c75, 0)),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeComplianceByConfigRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.optional(S.String),
          Compliance: S.optional(__S(864, __c108, 0)),
        }),
      ).annotate({ identifier: "ComplianceByConfigRule" });
    case 2:
      return S.Array(__S(905, __c113, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ComplianceByConfigRules: S.optional(__S(906, __c113, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeComplianceByConfigRuleResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ComplianceTypes: S.optional(__S(600, __c75, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeComplianceByResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          ResourceId: S.optional(S.String),
          Compliance: S.optional(__S(864, __c108, 0)),
        }),
      ).annotate({ identifier: "ComplianceByResource" });
    case 2:
      return S.Array(__S(913, __c114, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ComplianceByResources: S.optional(__S(914, __c114, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeComplianceByResourceResponse" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleNames: S.optional(__S(608, __c76, 0)),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConfigRuleEvaluationStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.optional(S.String),
          ConfigRuleArn: S.optional(S.String),
          ConfigRuleId: S.optional(S.String),
          LastSuccessfulInvocationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastFailedInvocationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastSuccessfulEvaluationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastFailedEvaluationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FirstActivatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastDeactivatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastErrorCode: S.optional(S.String),
          LastErrorMessage: S.optional(S.String),
          FirstEvaluationStarted: S.optional(S.Boolean),
          LastDebugLogDeliveryStatus: S.optional(S.String),
          LastDebugLogDeliveryStatusReason: S.optional(S.String),
          LastDebugLogDeliveryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ConfigRuleEvaluationStatus" });
    case 2:
      return S.Array(__S(921, __c115, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConfigRulesEvaluationStatus: S.optional(__S(922, __c115, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConfigRuleEvaluationStatusResponse" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EvaluationMode: S.optional(S.String),
          RuleEvaluationVisibility: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeConfigRulesFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleNames: S.optional(__S(608, __c76, 0)),
          Filters: S.optional(__S(928, __c116, 0)),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConfigRulesRequest" });
    case 2:
      return S.Array(__S(943, __c117, 7));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConfigRules: S.optional(__S(930, __c116, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConfigRulesResponse" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ComplianceResourceTypes: S.optional(__S(608, __c76, 0)),
          TagKey: S.optional(S.String),
          TagValue: S.optional(S.String),
          ComplianceResourceId: S.optional(S.String),
          ServicePrincipals: S.optional(__S(608, __c76, 0)),
        }),
      ).annotate({ identifier: "Scope" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventSource: S.optional(S.String),
          MessageType: S.optional(S.String),
          MaximumExecutionFrequency: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceDetail" });
    case 2:
      return S.Array(__S(937, __c117, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PolicyRuntime: S.String,
          PolicyText: S.String,
          EnableDebugLogDelivery: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CustomPolicyDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Owner: S.String,
          SourceIdentifier: S.optional(S.String),
          SourceDetails: S.optional(__S(938, __c117, 2)),
          CustomPolicyDetails: S.optional(__S(939, __c117, 3)),
        }),
      ).annotate({ identifier: "Source" });
    case 5:
      return S.suspend(() => S.Struct({ Mode: S.optional(S.String) })).annotate({
        identifier: "EvaluationModeConfiguration",
      });
    case 6:
      return S.Array(__S(941, __c117, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.optional(S.String),
          ConfigRuleArn: S.optional(S.String),
          ConfigRuleId: S.optional(S.String),
          Description: S.optional(S.String),
          Scope: S.optional(__S(936, __c117, 0)),
          Source: __S(940, __c117, 4),
          InputParameters: S.optional(S.String),
          MaximumExecutionFrequency: S.optional(S.String),
          ConfigRuleState: S.optional(S.String),
          CreatedBy: S.optional(S.String),
          EvaluationModes: S.optional(__S(942, __c117, 6)),
          RuleEvaluationVisibility: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigRule" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorNames: S.optional(__S(608, __c76, 0)),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConfigurationAggregatorsRequest" });
    case 1:
      return S.Array(__S(957, __c119, 5));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregators: S.optional(__S(945, __c118, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConfigurationAggregatorsResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountIds: __S(608, __c76, 0),
          AllAwsRegions: S.optional(S.Boolean),
          AwsRegions: S.optional(__S(608, __c76, 0)),
        }),
      ).annotate({ identifier: "AccountAggregationSource" });
    case 1:
      return S.Array(__S(952, __c119, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RoleArn: S.String,
          AwsRegions: S.optional(__S(608, __c76, 0)),
          AllAwsRegions: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "OrganizationAggregationSource" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Value: S.optional(__S(608, __c76, 0)) }),
      ).annotate({ identifier: "AggregatorFilterResourceType" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(__S(955, __c119, 3)),
          ServicePrincipal: S.optional(__S(955, __c119, 3)),
        }),
      ).annotate({ identifier: "AggregatorFilters" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.optional(S.String),
          ConfigurationAggregatorArn: S.optional(S.String),
          AccountAggregationSources: S.optional(__S(953, __c119, 1)),
          OrganizationAggregationSource: S.optional(__S(954, __c119, 2)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(S.String),
          AggregatorFilters: S.optional(__S(956, __c119, 4)),
        }),
      ).annotate({ identifier: "ConfigurationAggregator" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationAggregatorName: S.String,
          UpdateStatus: S.optional(__S(600, __c75, 0)),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConfigurationAggregatorSourcesStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceId: S.optional(S.String),
          SourceType: S.optional(S.String),
          AwsRegion: S.optional(S.String),
          LastUpdateStatus: S.optional(S.String),
          LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastErrorCode: S.optional(S.String),
          LastErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "AggregatedSourceStatus" });
    case 2:
      return S.Array(__S(961, __c120, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AggregatedSourceStatusList: S.optional(__S(962, __c120, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConfigurationAggregatorSourcesStatusResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationRecorderNames: S.optional(__S(608, __c76, 0)),
          ServicePrincipal: S.optional(S.String),
          Arn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConfigurationRecordersRequest" });
    case 1:
      return S.Array(__S(622, __c77, 6));
    case 2:
      return S.suspend(() =>
        S.Struct({ ConfigurationRecorders: S.optional(__S(969, __c121, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeConfigurationRecordersResponse" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationRecorderNames: S.optional(__S(608, __c76, 0)),
          ServicePrincipal: S.optional(S.String),
          Arn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConfigurationRecorderStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          lastStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastStopTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          recording: S.optional(S.Boolean),
          lastStatus: S.optional(S.String),
          lastErrorCode: S.optional(S.String),
          lastErrorMessage: S.optional(S.String),
          lastStatusChangeTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          servicePrincipal: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigurationRecorderStatus" });
    case 2:
      return S.Array(__S(977, __c122, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ConfigurationRecordersStatus: S.optional(__S(978, __c122, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeConfigurationRecorderStatusResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleNames: S.optional(__S(608, __c76, 0)),
          ComplianceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConformancePackComplianceFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConformancePackName: S.String,
          Filters: S.optional(__S(984, __c123, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConformancePackComplianceRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.optional(S.String),
          ComplianceType: S.optional(S.String),
          Controls: S.optional(__S(608, __c76, 0)),
        }),
      ).annotate({ identifier: "ConformancePackRuleCompliance" });
    case 3:
      return S.Array(__S(986, __c123, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ConformancePackName: S.String,
          ConformancePackRuleComplianceList: __S(987, __c123, 3),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConformancePackComplianceResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConformancePackNames: S.optional(__S(608, __c76, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConformancePacksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConformancePackName: S.String,
          ConformancePackArn: S.String,
          ConformancePackId: S.String,
          DeliveryS3Bucket: S.optional(S.String),
          DeliveryS3KeyPrefix: S.optional(S.String),
          ConformancePackInputParameters: S.optional(__S(1009, __c126, 1)),
          LastUpdateRequestedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(S.String),
          TemplateSSMDocumentDetails: S.optional(__S(1000, __c125, 0)),
        }),
      ).annotate({ identifier: "ConformancePackDetail" });
    case 2:
      return S.Array(__S(993, __c124, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConformancePackDetails: S.optional(__S(994, __c124, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConformancePacksResponse" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DocumentName: S.String, DocumentVersion: S.optional(S.String) }),
      ).annotate({ identifier: "TemplateSSMDocumentDetails" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ParameterName: S.String, ParameterValue: S.String }),
      ).annotate({ identifier: "ConformancePackInputParameter" });
    case 1:
      return S.Array(__S(1008, __c126, 0));
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConformancePackNames: S.optional(__S(608, __c76, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeConformancePackStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConformancePackName: S.String,
          ConformancePackId: S.String,
          ConformancePackArn: S.String,
          ConformancePackState: S.String,
          StackArn: S.String,
          ConformancePackStatusReason: S.optional(S.String),
          LastUpdateRequestedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdateCompletedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ConformancePackStatusDetail" });
    case 2:
      return S.Array(__S(1017, __c127, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConformancePackStatusDetails: S.optional(__S(1018, __c127, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConformancePackStatusResponse" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeliveryChannelNames: S.optional(__S(608, __c76, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDeliveryChannelsRequest" });
    case 1:
      return S.Array(__S(1033, __c129, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ DeliveryChannels: S.optional(__S(1025, __c128, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeDeliveryChannelsResponse" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ deliveryFrequency: S.optional(S.String) })).annotate({
        identifier: "ConfigSnapshotDeliveryProperties",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          s3BucketName: S.optional(S.String),
          s3KeyPrefix: S.optional(S.String),
          s3KmsKeyArn: S.optional(S.String),
          snsTopicARN: S.optional(S.String),
          configSnapshotDeliveryProperties: S.optional(__S(1032, __c129, 0)),
        }),
      ).annotate({ identifier: "DeliveryChannel" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeliveryChannelNames: S.optional(__S(608, __c76, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDeliveryChannelStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          lastStatus: S.optional(S.String),
          lastErrorCode: S.optional(S.String),
          lastErrorMessage: S.optional(S.String),
          lastAttemptTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastSuccessfulTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          nextDeliveryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ConfigExportDeliveryInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          lastStatus: S.optional(S.String),
          lastErrorCode: S.optional(S.String),
          lastErrorMessage: S.optional(S.String),
          lastStatusChangeTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ConfigStreamDeliveryInfo" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          configSnapshotDeliveryInfo: S.optional(__S(1041, __c130, 1)),
          configHistoryDeliveryInfo: S.optional(__S(1041, __c130, 1)),
          configStreamDeliveryInfo: S.optional(__S(1042, __c130, 2)),
        }),
      ).annotate({ identifier: "DeliveryChannelStatus" });
    case 4:
      return S.Array(__S(1043, __c130, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ DeliveryChannelsStatus: S.optional(__S(1044, __c130, 4)) }).pipe(ns),
      ).annotate({ identifier: "DescribeDeliveryChannelStatusResponse" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationConfigRuleNames: S.optional(__S(608, __c76, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOrganizationConfigRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          OrganizationConfigRuleTriggerTypes: S.optional(__S(600, __c75, 0)),
          InputParameters: S.optional(S.String),
          MaximumExecutionFrequency: S.optional(S.String),
          ResourceTypesScope: S.optional(__S(608, __c76, 0)),
          ResourceIdScope: S.optional(S.String),
          TagKeyScope: S.optional(S.String),
          TagValueScope: S.optional(S.String),
          PolicyRuntime: S.optional(S.String),
          DebugLogDeliveryAccounts: S.optional(__S(608, __c76, 0)),
        }),
      ).annotate({ identifier: "OrganizationCustomPolicyRuleMetadataNoPolicy" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          OrganizationConfigRuleName: S.String,
          OrganizationConfigRuleArn: S.String,
          OrganizationManagedRuleMetadata: S.optional(__S(1056, __c132, 0)),
          OrganizationCustomRuleMetadata: S.optional(__S(1057, __c132, 1)),
          ExcludedAccounts: S.optional(__S(608, __c76, 0)),
          LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OrganizationCustomPolicyRuleMetadata: S.optional(__S(1049, __c131, 1)),
        }),
      ).annotate({ identifier: "OrganizationConfigRule" });
    case 3:
      return S.Array(__S(1050, __c131, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          OrganizationConfigRules: S.optional(__S(1051, __c131, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeOrganizationConfigRulesResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          RuleIdentifier: S.String,
          InputParameters: S.optional(S.String),
          MaximumExecutionFrequency: S.optional(S.String),
          ResourceTypesScope: S.optional(__S(608, __c76, 0)),
          ResourceIdScope: S.optional(S.String),
          TagKeyScope: S.optional(S.String),
          TagValueScope: S.optional(S.String),
        }),
      ).annotate({ identifier: "OrganizationManagedRuleMetadata" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          LambdaFunctionArn: S.String,
          OrganizationConfigRuleTriggerTypes: __S(600, __c75, 0),
          InputParameters: S.optional(S.String),
          MaximumExecutionFrequency: S.optional(S.String),
          ResourceTypesScope: S.optional(__S(608, __c76, 0)),
          ResourceIdScope: S.optional(S.String),
          TagKeyScope: S.optional(S.String),
          TagValueScope: S.optional(S.String),
        }),
      ).annotate({ identifier: "OrganizationCustomRuleMetadata" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationConfigRuleNames: S.optional(__S(608, __c76, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOrganizationConfigRuleStatusesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OrganizationConfigRuleName: S.String,
          OrganizationRuleStatus: S.String,
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OrganizationConfigRuleStatus" });
    case 2:
      return S.Array(__S(1065, __c133, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          OrganizationConfigRuleStatuses: S.optional(__S(1066, __c133, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeOrganizationConfigRuleStatusesResponse" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationConformancePackNames: S.optional(__S(608, __c76, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOrganizationConformancePacksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OrganizationConformancePackName: S.String,
          OrganizationConformancePackArn: S.String,
          DeliveryS3Bucket: S.optional(S.String),
          DeliveryS3KeyPrefix: S.optional(S.String),
          ConformancePackInputParameters: S.optional(__S(1009, __c126, 1)),
          ExcludedAccounts: S.optional(__S(608, __c76, 0)),
          LastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "OrganizationConformancePack" });
    case 2:
      return S.Array(__S(1073, __c134, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          OrganizationConformancePacks: S.optional(__S(1074, __c134, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeOrganizationConformancePacksResponse" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OrganizationConformancePackNames: S.optional(__S(608, __c76, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeOrganizationConformancePackStatusesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OrganizationConformancePackName: S.String,
          Status: S.String,
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "OrganizationConformancePackStatus" });
    case 2:
      return S.Array(__S(1081, __c135, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          OrganizationConformancePackStatuses: S.optional(__S(1082, __c135, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeOrganizationConformancePackStatusesResponse" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Limit: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePendingAggregationRequestsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RequesterAccountId: S.optional(S.String),
          RequesterAwsRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "PendingAggregationRequest" });
    case 2:
      return S.Array(__S(1089, __c136, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PendingAggregationRequests: S.optional(__S(1090, __c136, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribePendingAggregationRequestsResponse" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigRuleNames: __S(608, __c76, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRemediationConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RemediationConfigurations: S.optional(__S(1111, __c138, 7)) }).pipe(ns),
      ).annotate({ identifier: "DescribeRemediationConfigurationsResponse" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Value: S.String })).annotate({
        identifier: "ResourceValue",
      });
    case 1:
      return S.suspend(() => S.Struct({ Values: __S(608, __c76, 0) })).annotate({
        identifier: "StaticValue",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceValue: S.optional(__S(1104, __c138, 0)),
          StaticValue: S.optional(__S(1105, __c138, 1)),
        }),
      ).annotate({ identifier: "RemediationParameterValue" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(1106, __c138, 2).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ConcurrentExecutionRatePercentage: S.optional(S.Number),
          ErrorPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SsmControls" });
    case 5:
      return S.suspend(() => S.Struct({ SsmControls: S.optional(__S(1108, __c138, 4)) })).annotate({
        identifier: "ExecutionControls",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ConfigRuleName: S.String,
          TargetType: S.String,
          TargetId: S.String,
          TargetVersion: S.optional(S.String),
          Parameters: S.optional(__S(1107, __c138, 3)),
          ResourceType: S.optional(S.String),
          Automatic: S.optional(S.Boolean),
          ExecutionControls: S.optional(__S(1109, __c138, 5)),
          MaximumAutomaticAttempts: S.optional(S.Number),
          RetryAttemptSeconds: S.optional(S.Number),
          Arn: S.optional(S.String),
          CreatedByService: S.optional(S.String),
        }),
      ).annotate({ identifier: "RemediationConfiguration" });
    case 7:
      return S.Array(__S(1110, __c138, 6));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
