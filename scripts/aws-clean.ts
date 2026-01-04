#!/usr/bin/env bun
/**
 * AWS Account Cleanup Script
 *
 * Finds and deletes AWS resources across multiple services:
 * - S3 buckets (empties them first)
 * - Lambda functions
 * - ECS clusters (with services and tasks)
 * - SQS queues
 * - SNS topics
 * - DynamoDB tables
 * - VPCs (with dependencies: subnets, internet gateways, NAT gateways, route tables, security groups)
 * - IAM roles (optionally, with --iam flag)
 *
 * Usage:
 *   bun aws:clean                    # Clean against real AWS
 *   LOCAL=1 bun aws:clean            # Clean against LocalStack
 *   bun aws:clean --dry-run          # Show what would be deleted
 *   bun aws:clean --iam              # Also clean IAM roles (dangerous!)
 *   bun aws:clean --prefix itty      # Only delete resources with this prefix
 */

import { Command, Options } from "@effect/cli";
import { FetchHttpClient } from "@effect/platform";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, Layer, Logger, LogLevel, Option, Ref } from "effect";
import * as Credentials from "../src/aws/credentials.ts";
import { Endpoint } from "../src/aws/endpoint.ts";
import { Region } from "../src/aws/region.ts";

// Service imports
import { deleteTable, listTables } from "../src/services/dynamodb.ts";
import {
  deleteInternetGateway,
  deleteNatGateway,
  deleteRouteTable,
  deleteSecurityGroup,
  deleteSubnet,
  deleteVpc,
  describeInternetGateways,
  describeNatGateways,
  describeRouteTables,
  describeSecurityGroups,
  describeSubnets,
  describeVpcs,
  detachInternetGateway,
  disassociateRouteTable,
} from "../src/services/ec2.ts";
import {
  deleteCluster,
  deleteService,
  listClusters,
  listServices,
  listTasks,
  stopTask,
  updateService,
} from "../src/services/ecs.ts";
import {
  deleteRole,
  deleteRolePolicy,
  detachRolePolicy,
  listAttachedRolePolicies,
  listRolePolicies,
  listRoles,
} from "../src/services/iam.ts";
import { deleteFunction, listFunctions } from "../src/services/lambda.ts";
import {
  deleteBucket,
  deleteObject,
  deleteObjects,
  listBuckets,
  listObjectsV2,
  listObjectVersions,
} from "../src/services/s3.ts";
import { deleteTopic, listTopics } from "../src/services/sns.ts";
import { deleteQueue, listQueues } from "../src/services/sqs.ts";

// ============================================================================
// CLI Options
// ============================================================================

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription(
    "Show what would be deleted without actually deleting",
  ),
  Options.withDefault(false),
);

const iamOption = Options.boolean("iam").pipe(
  Options.withDescription("Also delete IAM roles (use with caution!)"),
  Options.withDefault(false),
);

const prefixOption = Options.text("prefix").pipe(
  Options.withDescription(
    "Only delete resources with names starting with this prefix",
  ),
  Options.optional,
);

// ============================================================================
// Configuration Context
// ============================================================================

interface CleanupConfig {
  readonly dryRun: boolean;
  readonly cleanIam: boolean;
  readonly prefix: string;
}

const CleanupConfig = Ref.unsafeMake<CleanupConfig>({
  dryRun: false,
  cleanIam: false,
  prefix: "",
});

const getConfig = Ref.get(CleanupConfig);

// ============================================================================
// Helper functions
// ============================================================================

const log = (emoji: string, message: string) =>
  Console.log(`${emoji} ${message}`);

const warn = (message: string) => Console.warn(`⚠️  ${message}`);

const matchesPrefix = (prefix: string, name: string | undefined): boolean => {
  if (!prefix) return true;
  return name?.startsWith(prefix) ?? false;
};

// ============================================================================
// S3 Cleanup
// ============================================================================

const emptyBucket = (bucket: string) =>
  Effect.gen(function* () {
    // Delete all object versions (for versioned buckets)
    let versionKeyMarker: string | undefined;
    let versionIdMarker: string | undefined;
    do {
      const versions = yield* listObjectVersions({
        Bucket: bucket,
        KeyMarker: versionKeyMarker,
        VersionIdMarker: versionIdMarker,
      }).pipe(
        Effect.catchAll(() =>
          Effect.succeed({
            Versions: [],
            DeleteMarkers: [],
            NextKeyMarker: undefined,
            NextVersionIdMarker: undefined,
          }),
        ),
      );

      const toDelete = [
        ...(versions.Versions ?? []).map((v) => ({
          Key: v.Key!,
          VersionId: v.VersionId,
        })),
        ...(versions.DeleteMarkers ?? []).map((d) => ({
          Key: d.Key!,
          VersionId: d.VersionId,
        })),
      ];

      if (toDelete.length > 0) {
        yield* deleteObjects({
          Bucket: bucket,
          Delete: { Objects: toDelete },
        }).pipe(Effect.ignore);
        yield* log("  🗑️", `Deleted ${toDelete.length} object versions`);
      }

      versionKeyMarker = versions.NextKeyMarker;
      versionIdMarker = versions.NextVersionIdMarker;
    } while (versionKeyMarker);

    // Delete regular objects (for non-versioned buckets)
    let continuationToken: string | undefined;
    do {
      const objects = yield* listObjectsV2({
        Bucket: bucket,
        ContinuationToken: continuationToken,
      }).pipe(
        Effect.catchAll(() =>
          Effect.succeed({ Contents: [], NextContinuationToken: undefined }),
        ),
      );

      for (const obj of objects.Contents ?? []) {
        if (obj.Key) {
          yield* deleteObject({ Bucket: bucket, Key: obj.Key }).pipe(
            Effect.ignore,
          );
        }
      }

      if ((objects.Contents?.length ?? 0) > 0) {
        yield* log("  🗑️", `Deleted ${objects.Contents?.length} objects`);
      }

      continuationToken = objects.NextContinuationToken;
    } while (continuationToken);
  });

const cleanS3 = Effect.gen(function* () {
  const { dryRun, prefix } = yield* getConfig;
  yield* log("📦", "Cleaning S3 buckets...");

  const buckets = yield* listBuckets({});
  const toDelete = (buckets.Buckets ?? []).filter((b) =>
    matchesPrefix(prefix, b.Name),
  );

  if (toDelete.length === 0) {
    yield* log("  ✓", "No S3 buckets to delete");
    return;
  }

  for (const bucket of toDelete) {
    if (!bucket.Name) continue;

    if (dryRun) {
      yield* log("  📋", `Would delete bucket: ${bucket.Name}`);
    } else {
      yield* log("  🗑️", `Deleting bucket: ${bucket.Name}`);
      yield* emptyBucket(bucket.Name);
      yield* deleteBucket({ Bucket: bucket.Name }).pipe(Effect.ignore);
    }
  }

  yield* log("  ✓", `Processed ${toDelete.length} S3 buckets`);
});

// ============================================================================
// Lambda Cleanup
// ============================================================================

const cleanLambda = Effect.gen(function* () {
  const { dryRun, prefix } = yield* getConfig;
  yield* log("λ", "Cleaning Lambda functions...");

  let marker: string | undefined;
  let totalDeleted = 0;

  do {
    const functions = yield* listFunctions({ Marker: marker });

    const toDelete = (functions.Functions ?? []).filter((f) =>
      matchesPrefix(prefix, f.FunctionName),
    );

    for (const fn of toDelete) {
      if (!fn.FunctionName) continue;

      if (dryRun) {
        yield* log("  📋", `Would delete function: ${fn.FunctionName}`);
      } else {
        yield* log("  🗑️", `Deleting function: ${fn.FunctionName}`);
        yield* deleteFunction({ FunctionName: fn.FunctionName }).pipe(
          Effect.ignore,
        );
      }
      totalDeleted++;
    }

    marker = functions.NextMarker;
  } while (marker);

  if (totalDeleted === 0) {
    yield* log("  ✓", "No Lambda functions to delete");
  } else {
    yield* log("  ✓", `Processed ${totalDeleted} Lambda functions`);
  }
});

// ============================================================================
// ECS Cleanup
// ============================================================================

const cleanECS = Effect.gen(function* () {
  const { dryRun, prefix } = yield* getConfig;
  yield* log("🐳", "Cleaning ECS clusters...");

  let nextToken: string | undefined;
  let totalDeleted = 0;

  do {
    const clusters = yield* listClusters({ nextToken });

    for (const clusterArn of clusters.clusterArns ?? []) {
      const clusterName = clusterArn.split("/").pop() ?? "";
      if (!matchesPrefix(prefix, clusterName)) continue;

      if (dryRun) {
        yield* log("  📋", `Would delete cluster: ${clusterName}`);
        totalDeleted++;
        continue;
      }

      yield* log("  🗑️", `Deleting cluster: ${clusterName}`);

      // Stop all running tasks
      let tasksNextToken: string | undefined;
      do {
        const tasks = yield* listTasks({
          cluster: clusterArn,
          nextToken: tasksNextToken,
        }).pipe(
          Effect.catchAll(() =>
            Effect.succeed({ taskArns: [], nextToken: undefined }),
          ),
        );

        for (const taskArn of tasks.taskArns ?? []) {
          yield* stopTask({
            cluster: clusterArn,
            task: taskArn,
            reason: "Cleanup script",
          }).pipe(Effect.ignore);
        }

        tasksNextToken = tasks.nextToken;
      } while (tasksNextToken);

      // Delete all services
      let servicesNextToken: string | undefined;
      do {
        const services = yield* listServices({
          cluster: clusterArn,
          nextToken: servicesNextToken,
        }).pipe(
          Effect.catchAll(() =>
            Effect.succeed({ serviceArns: [], nextToken: undefined }),
          ),
        );

        for (const serviceArn of services.serviceArns ?? []) {
          // Scale down to 0 first
          yield* updateService({
            cluster: clusterArn,
            service: serviceArn,
            desiredCount: 0,
          }).pipe(Effect.ignore);

          yield* deleteService({
            cluster: clusterArn,
            service: serviceArn,
            force: true,
          }).pipe(Effect.ignore);
        }

        servicesNextToken = services.nextToken;
      } while (servicesNextToken);

      // Delete the cluster
      yield* deleteCluster({ cluster: clusterArn }).pipe(Effect.ignore);
      totalDeleted++;
    }

    nextToken = clusters.nextToken;
  } while (nextToken);

  if (totalDeleted === 0) {
    yield* log("  ✓", "No ECS clusters to delete");
  } else {
    yield* log("  ✓", `Processed ${totalDeleted} ECS clusters`);
  }
});

// ============================================================================
// SQS Cleanup
// ============================================================================

const cleanSQS = Effect.gen(function* () {
  const { dryRun, prefix } = yield* getConfig;
  yield* log("📨", "Cleaning SQS queues...");

  let nextToken: string | undefined;
  let totalDeleted = 0;

  do {
    const queues = yield* listQueues({
      NextToken: nextToken,
      QueueNamePrefix: prefix || undefined,
    });

    for (const queueUrl of queues.QueueUrls ?? []) {
      const queueName = queueUrl.split("/").pop() ?? "";

      if (dryRun) {
        yield* log("  📋", `Would delete queue: ${queueName}`);
      } else {
        yield* log("  🗑️", `Deleting queue: ${queueName}`);
        yield* deleteQueue({ QueueUrl: queueUrl }).pipe(Effect.ignore);
      }
      totalDeleted++;
    }

    nextToken = queues.NextToken;
  } while (nextToken);

  if (totalDeleted === 0) {
    yield* log("  ✓", "No SQS queues to delete");
  } else {
    yield* log("  ✓", `Processed ${totalDeleted} SQS queues`);
  }
});

// ============================================================================
// SNS Cleanup
// ============================================================================

const cleanSNS = Effect.gen(function* () {
  const { dryRun, prefix } = yield* getConfig;
  yield* log("📢", "Cleaning SNS topics...");

  let nextToken: string | undefined;
  let totalDeleted = 0;

  do {
    const topics = yield* listTopics({ NextToken: nextToken });

    for (const topic of topics.Topics ?? []) {
      if (!topic.TopicArn) continue;

      const topicName = topic.TopicArn.split(":").pop() ?? "";
      if (!matchesPrefix(prefix, topicName)) continue;

      if (dryRun) {
        yield* log("  📋", `Would delete topic: ${topicName}`);
      } else {
        yield* log("  🗑️", `Deleting topic: ${topicName}`);
        yield* deleteTopic({ TopicArn: topic.TopicArn }).pipe(Effect.ignore);
      }
      totalDeleted++;
    }

    nextToken = topics.NextToken;
  } while (nextToken);

  if (totalDeleted === 0) {
    yield* log("  ✓", "No SNS topics to delete");
  } else {
    yield* log("  ✓", `Processed ${totalDeleted} SNS topics`);
  }
});

// ============================================================================
// DynamoDB Cleanup
// ============================================================================

const cleanDynamoDB = Effect.gen(function* () {
  const { dryRun, prefix } = yield* getConfig;
  yield* log("🗃️", "Cleaning DynamoDB tables...");

  let lastEvaluatedTableName: string | undefined;
  let totalDeleted = 0;

  do {
    const tables = yield* listTables({
      ExclusiveStartTableName: lastEvaluatedTableName,
    });

    for (const tableName of tables.TableNames ?? []) {
      if (!matchesPrefix(prefix, tableName)) continue;

      if (dryRun) {
        yield* log("  📋", `Would delete table: ${tableName}`);
      } else {
        yield* log("  🗑️", `Deleting table: ${tableName}`);
        yield* deleteTable({ TableName: tableName }).pipe(Effect.ignore);
      }
      totalDeleted++;
    }

    lastEvaluatedTableName = tables.LastEvaluatedTableName;
  } while (lastEvaluatedTableName);

  if (totalDeleted === 0) {
    yield* log("  ✓", "No DynamoDB tables to delete");
  } else {
    yield* log("  ✓", `Processed ${totalDeleted} DynamoDB tables`);
  }
});

// ============================================================================
// VPC Cleanup (most complex due to dependencies)
// ============================================================================

const cleanVPC = Effect.gen(function* () {
  const { dryRun, prefix } = yield* getConfig;
  yield* log("🌐", "Cleaning VPCs...");

  let nextToken: string | undefined;
  let totalDeleted = 0;

  do {
    const vpcs = yield* describeVpcs({ NextToken: nextToken });

    for (const vpc of vpcs.Vpcs ?? []) {
      if (!vpc.VpcId) continue;

      // Skip default VPC
      if (vpc.IsDefault) continue;

      // Check prefix against VPC name tag
      const nameTag = vpc.Tags?.find((t) => t.Key === "Name")?.Value ?? "";
      if (!matchesPrefix(prefix, nameTag) && !matchesPrefix(prefix, vpc.VpcId))
        continue;

      if (dryRun) {
        yield* log("  📋", `Would delete VPC: ${vpc.VpcId} (${nameTag})`);
        totalDeleted++;
        continue;
      }

      yield* log("  🗑️", `Deleting VPC: ${vpc.VpcId} (${nameTag})`);

      // 1. Delete NAT Gateways
      const natGateways = yield* describeNatGateways({
        Filter: [{ Name: "vpc-id", Values: [vpc.VpcId] }],
      }).pipe(Effect.catchAll(() => Effect.succeed({ NatGateways: [] })));

      for (const nat of natGateways.NatGateways ?? []) {
        if (nat.NatGatewayId && nat.State !== "deleted") {
          yield* log("    🗑️", `Deleting NAT Gateway: ${nat.NatGatewayId}`);
          yield* deleteNatGateway({ NatGatewayId: nat.NatGatewayId }).pipe(
            Effect.ignore,
          );
        }
      }

      // 2. Detach and delete Internet Gateways
      const igws = yield* describeInternetGateways({
        Filters: [{ Name: "attachment.vpc-id", Values: [vpc.VpcId] }],
      }).pipe(Effect.catchAll(() => Effect.succeed({ InternetGateways: [] })));

      for (const igw of igws.InternetGateways ?? []) {
        if (igw.InternetGatewayId) {
          yield* log("    🗑️", `Detaching IGW: ${igw.InternetGatewayId}`);
          yield* detachInternetGateway({
            InternetGatewayId: igw.InternetGatewayId,
            VpcId: vpc.VpcId,
          }).pipe(Effect.ignore);
          yield* deleteInternetGateway({
            InternetGatewayId: igw.InternetGatewayId,
          }).pipe(Effect.ignore);
        }
      }

      // 3. Delete Subnets
      const subnets = yield* describeSubnets({
        Filters: [{ Name: "vpc-id", Values: [vpc.VpcId] }],
      }).pipe(Effect.catchAll(() => Effect.succeed({ Subnets: [] })));

      for (const subnet of subnets.Subnets ?? []) {
        if (subnet.SubnetId) {
          yield* log("    🗑️", `Deleting Subnet: ${subnet.SubnetId}`);
          yield* deleteSubnet({ SubnetId: subnet.SubnetId }).pipe(
            Effect.ignore,
          );
        }
      }

      // 4. Delete Route Tables (except main)
      const routeTables = yield* describeRouteTables({
        Filters: [{ Name: "vpc-id", Values: [vpc.VpcId] }],
      }).pipe(Effect.catchAll(() => Effect.succeed({ RouteTables: [] })));

      for (const rt of routeTables.RouteTables ?? []) {
        if (!rt.RouteTableId) continue;

        // Skip main route table
        const isMain = rt.Associations?.some((a) => a.Main);
        if (isMain) continue;

        // Disassociate from subnets first
        for (const assoc of rt.Associations ?? []) {
          if (assoc.RouteTableAssociationId && !assoc.Main) {
            yield* disassociateRouteTable({
              AssociationId: assoc.RouteTableAssociationId,
            }).pipe(Effect.ignore);
          }
        }

        yield* log("    🗑️", `Deleting Route Table: ${rt.RouteTableId}`);
        yield* deleteRouteTable({ RouteTableId: rt.RouteTableId }).pipe(
          Effect.ignore,
        );
      }

      // 5. Delete Security Groups (except default)
      const securityGroups = yield* describeSecurityGroups({
        Filters: [{ Name: "vpc-id", Values: [vpc.VpcId] }],
      }).pipe(Effect.catchAll(() => Effect.succeed({ SecurityGroups: [] })));

      for (const sg of securityGroups.SecurityGroups ?? []) {
        if (!sg.GroupId || sg.GroupName === "default") continue;

        yield* log("    🗑️", `Deleting Security Group: ${sg.GroupId}`);
        yield* deleteSecurityGroup({ GroupId: sg.GroupId }).pipe(Effect.ignore);
      }

      // 6. Finally delete the VPC
      yield* deleteVpc({ VpcId: vpc.VpcId }).pipe(Effect.ignore);
      totalDeleted++;
    }

    nextToken = vpcs.NextToken;
  } while (nextToken);

  if (totalDeleted === 0) {
    yield* log("  ✓", "No VPCs to delete (excluding default VPC)");
  } else {
    yield* log("  ✓", `Processed ${totalDeleted} VPCs`);
  }
});

// ============================================================================
// IAM Cleanup (optional, dangerous)
// ============================================================================

const cleanIAM = Effect.gen(function* () {
  const { dryRun, prefix, cleanIam } = yield* getConfig;

  if (!cleanIam) {
    yield* log("🔐", "Skipping IAM roles (use --iam to enable)");
    return;
  }

  yield* warn("Cleaning IAM roles - this is dangerous!");
  yield* log("🔐", "Cleaning IAM roles...");

  let marker: string | undefined;
  let totalDeleted = 0;

  do {
    const roles = yield* listRoles({ Marker: marker });

    for (const role of roles.Roles ?? []) {
      if (!role.RoleName) continue;
      if (!matchesPrefix(prefix, role.RoleName)) continue;

      // Skip AWS service-linked roles
      if (role.Path?.startsWith("/aws-service-role/")) continue;

      if (dryRun) {
        yield* log("  📋", `Would delete role: ${role.RoleName}`);
        totalDeleted++;
        continue;
      }

      yield* log("  🗑️", `Deleting role: ${role.RoleName}`);

      // Detach managed policies
      const attachedPolicies = yield* listAttachedRolePolicies({
        RoleName: role.RoleName,
      }).pipe(Effect.catchAll(() => Effect.succeed({ AttachedPolicies: [] })));

      for (const policy of attachedPolicies.AttachedPolicies ?? []) {
        if (policy.PolicyArn) {
          yield* detachRolePolicy({
            RoleName: role.RoleName,
            PolicyArn: policy.PolicyArn,
          }).pipe(Effect.ignore);
        }
      }

      // Delete inline policies
      const inlinePolicies = yield* listRolePolicies({
        RoleName: role.RoleName,
      }).pipe(Effect.catchAll(() => Effect.succeed({ PolicyNames: [] })));

      for (const policyName of inlinePolicies.PolicyNames ?? []) {
        yield* deleteRolePolicy({
          RoleName: role.RoleName,
          PolicyName: policyName,
        }).pipe(Effect.ignore);
      }

      // Delete the role
      yield* deleteRole({ RoleName: role.RoleName }).pipe(Effect.ignore);
      totalDeleted++;
    }

    marker = roles.Marker;
  } while (marker);

  if (totalDeleted === 0) {
    yield* log("  ✓", "No IAM roles to delete");
  } else {
    yield* log("  ✓", `Processed ${totalDeleted} IAM roles`);
  }
});

// ============================================================================
// Main Command
// ============================================================================

const cleanCommand = Command.make(
  "clean",
  { dryRun: dryRunOption, iam: iamOption, prefix: prefixOption },
  ({ dryRun, iam, prefix }) =>
    Effect.gen(function* () {
      const prefixValue = Option.getOrElse(prefix, () => "");

      // Set config
      yield* Ref.set(CleanupConfig, {
        dryRun,
        cleanIam: iam,
        prefix: prefixValue,
      });

      yield* Console.log("🧹 AWS Account Cleanup Script");
      yield* Console.log("============================");

      if (dryRun) {
        yield* Console.log("🔍 DRY RUN MODE - No resources will be deleted\n");
      }

      if (prefixValue) {
        yield* Console.log(
          `🔍 Only cleaning resources with prefix: ${prefixValue}\n`,
        );
      }

      if (process.env.LOCAL) {
        yield* Console.log("🏠 Running against LocalStack\n");
      } else {
        yield* Console.log("☁️  Running against real AWS\n");
      }

      // Run all cleanups
      yield* cleanS3.pipe(
        Effect.catchAll((e) => warn(`S3 cleanup failed: ${e}`)),
      );
      yield* cleanLambda.pipe(
        Effect.catchAll((e) => warn(`Lambda cleanup failed: ${e}`)),
      );
      yield* cleanECS.pipe(
        Effect.catchAll((e) => warn(`ECS cleanup failed: ${e}`)),
      );
      yield* cleanSQS.pipe(
        Effect.catchAll((e) => warn(`SQS cleanup failed: ${e}`)),
      );
      yield* cleanSNS.pipe(
        Effect.catchAll((e) => warn(`SNS cleanup failed: ${e}`)),
      );
      yield* cleanDynamoDB.pipe(
        Effect.catchAll((e) => warn(`DynamoDB cleanup failed: ${e}`)),
      );
      yield* cleanVPC.pipe(
        Effect.catchAll((e) => warn(`VPC cleanup failed: ${e}`)),
      );
      yield* cleanIAM.pipe(
        Effect.catchAll((e) => warn(`IAM cleanup failed: ${e}`)),
      );

      yield* Console.log("\n✨ Cleanup complete!");
    }),
);

// ============================================================================
// CLI Setup
// ============================================================================

const cli = Command.run(cleanCommand, {
  name: "aws-clean",
  version: "1.0.0",
});

// ============================================================================
// Platform and Credentials Layers
// ============================================================================

const platform = Layer.mergeAll(
  NodeContext.layer,
  FetchHttpClient.layer,
  Logger.pretty,
);

const awsLayer = process.env.LOCAL
  ? Layer.mergeAll(
      Layer.succeed(
        Endpoint,
        process.env.LOCALSTACK_HOST ?? "http://localhost:4566",
      ),
      Credentials.mock,
    )
  : Credentials.fromChain();

// ============================================================================
// Run
// ============================================================================

cli(process.argv).pipe(
  Effect.provide(platform),
  Effect.provide(awsLayer),
  Effect.provideService(Region, "us-east-1"),
  Logger.withMinimumLogLevel(
    process.env.DEBUG ? LogLevel.Debug : LogLevel.Info,
  ),
  NodeRuntime.runMain,
);
