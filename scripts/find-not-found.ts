#!/usr/bin/env bun
/**
 * Find NotFound errors by calling APIs with fake resource IDs.
 *
 * Strategy:
 * 1. For each Delete operation - call with a fake ID → triggers *NotFound
 * 2. For each Create operation with required FK references - call with fake parent ID → triggers *NotFound
 *
 * This is much simpler than dependency chains because we don't need to create anything.
 *
 * Usage:
 *   bun scripts/find-not-found.ts ec2
 *   bun scripts/find-not-found.ts ec2 --limit 50
 */

import { FetchHttpClient } from "@effect/platform";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, Layer } from "effect";
import * as Credentials from "../src/credentials.ts";
import {
  buildDependencyGraph,
  type DependencyGraph,
} from "../src/patch/topology.ts";
import { Region } from "../src/region.ts";

const args = process.argv.slice(2);
const serviceName = args[0] ?? "ec2";
const limitArg = args.indexOf("--limit");
const limit = limitArg >= 0 ? parseInt(args[limitArg + 1] ?? "999", 10) : 999;

// Track errors
const newErrors: Array<{ operation: string; error: string }> = [];
const allErrors: Array<{ operation: string; error: string }> = [];

/**
 * AWS Resource ID prefixes for generating fake IDs.
 * EC2-style resources use prefix-hex format.
 * Reference: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/resource-ids.html
 */
const AWS_ID_PREFIXES: Record<string, string> = {
  // Core networking
  Vpc: "vpc",
  Subnet: "subnet",
  SecurityGroup: "sg",
  NetworkInterface: "eni",
  NetworkAcl: "acl",
  RouteTable: "rtb",
  InternetGateway: "igw",
  NatGateway: "nat",
  EgressOnlyInternetGateway: "eigw",
  CarrierGateway: "cagw",

  // Compute
  Instance: "i",
  Image: "ami",
  Volume: "vol",
  Snapshot: "snap",
  KeyPair: "key",
  LaunchTemplate: "lt",
  PlacementGroup: "pg",
  Host: "h",
  CapacityReservation: "cr",
  CapacityReservationFleet: "crf",
  Fleet: "fleet",
  FpgaImage: "afi",
  Bundle: "bun",

  // VPN & Direct Connect
  VpnGateway: "vgw",
  CustomerGateway: "cgw",
  VpnConnection: "vpn",
  DhcpOptions: "dopt",

  // VPC Endpoints
  VpcEndpoint: "vpce",
  VpcEndpointService: "vpce-svc",
  Service: "vpce-svc", // For ServiceId fields

  // Peering
  VpcPeeringConnection: "pcx",

  // Transit Gateway
  TransitGateway: "tgw",
  TransitGatewayAttachment: "tgw-attach",
  TransitGatewayRouteTable: "tgw-rtb",
  TransitGatewayMulticastDomain: "tgw-mcast-domain",
  TransitGatewayPolicyTable: "tgw-ptb",
  TransitGatewayConnectPeer: "tgw-connect-peer",
  TransitGatewayMeteringPolicy: "tgw-mp",

  // Client VPN
  ClientVpnEndpoint: "cvpn-endpoint",
  ClientVpnRoute: "cvpn-route",

  // IPAM
  Ipam: "ipam",
  IpamPool: "ipam-pool",
  IpamScope: "ipam-scope",
  IpamResourceDiscovery: "ipam-res-disco",
  IpamResourceDiscoveryAssociation: "ipam-res-disco-assoc",
  IpamExternalResourceVerificationToken: "ipam-ext-res-ver-token",
  IpamPolicy: "ipam-policy",
  IpamPrefixListResolver: "ipam-plr",

  // Route Server
  RouteServer: "rs",
  RouteServerEndpoint: "rse",
  RouteServerPeer: "rsp",

  // Verified Access
  VerifiedAccessInstance: "vai",
  VerifiedAccessGroup: "vag",
  VerifiedAccessEndpoint: "vae",
  VerifiedAccessTrustProvider: "vatp",

  // Traffic Mirroring
  TrafficMirrorFilter: "tmf",
  TrafficMirrorSession: "tms",
  TrafficMirrorTarget: "tmt",
  TrafficMirrorFilterRule: "tmfr",

  // Network Insights
  NetworkInsightsPath: "nip",
  NetworkInsightsAnalysis: "nia",
  NetworkInsightsAccessScope: "nis",
  NetworkInsightsAccessScopeAnalysis: "nisa",

  // Flow Logs
  FlowLog: "fl",

  // Local Gateway
  LocalGateway: "lgw",
  LocalGatewayRouteTable: "lgw-rtb",
  LocalGatewayVirtualInterface: "lgw-vif",
  LocalGatewayVirtualInterfaceGroup: "lgw-vif-grp",
  LocalGatewayRouteTableVpcAssociation: "lgw-vpc-assoc",

  // Elastic IP
  Allocation: "eipalloc",
  Address: "eipalloc",
  Association: "eipassoc",

  // Prefix Lists
  PrefixList: "pl",

  // CoIP (Carrier IP)
  CoipPool: "ipv4pool-coip",

  // Public IPv4 Pools
  PublicIpv4Pool: "ipv4pool-ec2",
  Pool: "ipv4pool-ec2", // Generic Pool references
  Ipv6Pool: "ipv6pool-ec2",

  // Spot
  SpotInstanceRequest: "sir",
  SpotInstanceRequests: "sir", // Plural form

  // Reserved Instances
  ReservedInstance: "ri",
  ReservedInstancesListing: "ril",
  ReservedInstancesOffering: "rio",

  // Instance Connect
  InstanceConnectEndpoint: "eice",

  // Instance Event Window
  InstanceEventWindow: "iew",

  // VPC Block Public Access
  Exclusion: "vbpae",
  VpcBlockPublicAccessExclusion: "vbpae",

  // VPC Encryption Control
  VpcEncryptionControl: "vpc-ec",

  // Security Group Rules
  SecurityGroupRule: "sgr",

  // Network Interface Permissions
  NetworkInterfacePermission: "eni-perm",

  // Replace Root Volume
  ReplaceRootVolumeTask: "replacevol",

  // Export/Import Tasks
  ExportTask: "export",
  ExportImageTask: "export-ami-",
  ImportTask: "import-ami-",
  ConversionTask: "import-i-",

  // Scheduled Instances
  ScheduledInstance: "sci",

  // Elastic GPU
  ElasticGpu: "egpu",

  // Outpost
  Outpost: "op",

  // Declarative Policies
  Report: "dp-report",

  // MAC Modification
  MacModificationTask: "mac-mod",

  // IAM Instance Profile associations
  IamInstanceProfile: "iip-assoc",

  // Subnet CIDR Reservation
  SubnetCidrReservation: "scr",

  // Gateway Load Balancer Endpoint
  GatewayLoadBalancerEndpoint: "gwlbe",

  // Connection Notification
  ConnectionNotification: "vpce-nfn",

  // Additional Transit Gateway resources
  TransitGatewayRouteTableAnnouncement: "tgw-rtb-ann",

  // Local Gateway extended
  LocalGatewayRouteTableVirtualInterfaceGroupAssociation: "lgw-vif-grp-assoc",

  // Capacity Manager
  CapacityManagerDataExport: "cmde",

  // VPN Concentrator (AWS Outposts)
  VpnConcentrator: "vpn-conc",

  // IPAM extended
  IpamPrefixListResolverTarget: "ipam-plr-target",

  // Reports
  ImageUsageReport: "img-usage-report",
  DeclarativePoliciesReport: "dp-report",
  Report: "report",

  // Source references (use same prefix as target)
  SourceCapacityReservation: "cr",
  SourceFpgaImage: "afi",
  SourceVolume: "vol",
  SourceImage: "ami",
  SourceSnapshot: "snap",

  // Group (Security Group)
  Group: "sg",

  // Additional missing resources from Malformed analysis
  CoipPool: "ipv4pool-coip",
  Exclusion: "vbpae",
  ExportImageTask: "export-ami",
  ExportTask: "export",
  ImportTask: "import",
  HostResourceGroup: "hrg",
  OutpostLag: "lag",
  PeerTransitGateway: "tgw",
  PeeringAttachment: "tgw-attach",
  ServiceLinkVirtualInterface: "slvif",
  DestinationCapacityReservation: "cr",
  DestinationIpamScope: "ipam-scope",
  CurrentIpamScope: "ipam-scope",
  CapacityBlock: "cr",
  Offering: "ri",
  IpamPrefixListResolver: "ipam-plr",
  VpnConcentrator: "vpn-conc",
  AddMiddleboxAttachment: "tgw-attach",
  RemoveMiddleboxAttachment: "tgw-attach",
};

/**
 * Resources that use name-based identifiers (not AWS-generated IDs).
 * These get fake names like "itty-fake-{resource}-notfound".
 */
const NAME_BASED_RESOURCES = new Set([
  "Bucket", // S3 buckets use user-chosen names
  "Table", // DynamoDB tables use user-chosen names
  "Function", // Lambda functions use user-chosen names
  "Queue", // SQS queues use user-chosen names
  "Topic", // SNS topics use user-chosen names
  "Stream", // Kinesis streams use user-chosen names
  "Cluster", // ECS/EKS clusters use user-chosen names
  "Repository", // ECR repositories use user-chosen names
  "Secret", // Secrets Manager secrets use user-chosen names
  "Parameter", // SSM parameters use user-chosen names
  "Stack", // CloudFormation stacks use user-chosen names
  "Trail", // CloudTrail trails use user-chosen names
  "Alarm", // CloudWatch alarms use user-chosen names
  "Rule", // EventBridge rules use user-chosen names
  "Domain", // Various domain-based resources
]);

// 17-char hex for resources
const FAKE_HEX = "0123456789abcdef0"; // 17 chars

/**
 * Resources that expect ARNs instead of IDs.
 * We generate fake ARNs for these.
 */
const ARN_BASED_RESOURCES = new Set([
  "Certificate", // ACM certificate ARN
  "Principal", // IAM principal ARN
  "Role", // IAM role ARN
  "ServerCertificate", // IAM server certificate ARN
  "DomainCertificate", // ACM domain certificate ARN
]);

/**
 * Resources that expect special formats (not ID or ARN).
 */
const SPECIAL_FORMAT_RESOURCES: Record<string, string> = {
  Address: "192.0.2.1", // IP address (TEST-NET-1)
  Bundle: "bun-12345678", // Bundle task ID (8-char hex)
  ConversionTask: "import-i-12345678", // Conversion task ID
};

/**
 * Generate a fake ID for a resource type.
 */
const generateFakeId = (resourceType: string): string => {
  // Special format resources
  if (SPECIAL_FORMAT_RESOURCES[resourceType]) {
    return SPECIAL_FORMAT_RESOURCES[resourceType];
  }

  // ARN-based resources get fake ARNs
  if (ARN_BASED_RESOURCES.has(resourceType)) {
    const type = resourceType.toLowerCase();
    return `arn:aws:acm:us-east-1:123456789012:${type}/fake-${type}-notfound`;
  }

  // Name-based resources get fake names
  if (NAME_BASED_RESOURCES.has(resourceType)) {
    return `itty-fake-${resourceType.toLowerCase()}-notfound`;
  }

  // EC2-style resources get prefix-hex IDs
  const prefix = AWS_ID_PREFIXES[resourceType];
  if (prefix) {
    return `${prefix}-${FAKE_HEX}`;
  }

  // Infer prefix from resource type for unknown EC2-style resources
  const inferredPrefix = resourceType.toLowerCase().slice(0, 4);
  return `${inferredPrefix}-${FAKE_HEX}`;
};

/**
 * Generate fake inputs for an operation based on its inputs.
 * For read/list operations, also includes optional ID fields.
 */
const generateFakeInputs = (
  graph: DependencyGraph,
  opName: string,
): Record<string, unknown> | null => {
  const op = graph.operations[opName];
  if (!op) return null;

  const inputs: Record<string, unknown> = {};
  const isReadOrList = op.type === "read" || op.type === "list";

  for (const [fieldName, input] of Object.entries(op.inputs)) {
    // For read/list operations, also include optional ID fields
    const shouldInclude =
      input.required ||
      (isReadOrList &&
        (fieldName.endsWith("Id") ||
          fieldName.endsWith("Ids") ||
          input.references));

    if (!shouldInclude) continue;

    // Generate fake value based on type/name
    if (input.references) {
      // FK reference - generate fake ID for the referenced resource
      const fakeId = generateFakeId(input.references);
      inputs[fieldName] = fieldName.endsWith("Ids") ? [fakeId] : fakeId;
    } else if (fieldName.endsWith("Id") || fieldName.endsWith("Ids")) {
      // ID field - generate fake ID based on field name
      const resourceType = fieldName.replace(/Ids?$/, "");
      inputs[fieldName] = fieldName.endsWith("Ids")
        ? [generateFakeId(resourceType)]
        : generateFakeId(resourceType);
    } else if (input.type === "String") {
      inputs[fieldName] = `fake-${fieldName.toLowerCase()}`;
    } else if (input.type === "Integer" || input.type.includes("Int")) {
      inputs[fieldName] = 1;
    } else if (input.type === "Boolean") {
      inputs[fieldName] = false;
    } else if (input.type.includes("List") || input.type.includes("Set")) {
      inputs[fieldName] = [];
    }
  }

  return Object.keys(inputs).length > 0 ? inputs : {};
};

/**
 * Call an operation and record any errors.
 */
const callOperation = (
  opName: string,
  inputs: Record<string, unknown>,
  serviceModule: Record<string, unknown>,
) =>
  Effect.gen(function* () {
    const fn = serviceModule[opName];
    if (typeof fn !== "function") {
      return { skipped: true, reason: "function not found" };
    }

    const result = yield* Effect.try({
      try: () => fn(inputs) as Effect.Effect<unknown, unknown, unknown>,
      catch: (e) => e,
    }).pipe(
      Effect.flatMap((effect) =>
        Effect.isEffect(effect)
          ? (effect as Effect.Effect<unknown, unknown, never>)
          : Effect.succeed(effect),
      ),
      Effect.map(() => ({ success: true as const })),
      Effect.catchAll((error) => {
        const err = error as {
          _tag?: string;
          errorTag?: string;
          message?: string;
        };
        return Effect.succeed({
          success: false as const,
          error: err._tag ?? "Unknown",
          errorTag: err.errorTag,
          message: err.message,
        });
      }),
    );

    if (!result.success) {
      const errorName = result.errorTag ?? result.error;
      allErrors.push({ operation: opName, error: errorName });

      // UnknownAwsError means it's not in the SDK
      if (result.error === "UnknownAwsError" && result.errorTag) {
        newErrors.push({ operation: opName, error: result.errorTag });
      }
    }

    return result;
  });

const main = Effect.gen(function* () {
  yield* Console.log(`\n🔍 Finding NotFound errors for ${serviceName}\n`);

  // Build topology
  yield* Console.log("📊 Building topology...");
  const graph = yield* buildDependencyGraph(serviceName);

  // Load service module
  yield* Console.log("📦 Loading service module...");
  const serviceModule = yield* Effect.tryPromise({
    try: () => import(`../src/services/${serviceName}.ts`),
    catch: (e) => new Error(`Failed to load service: ${e}`),
  });

  // Find ALL operations with resource references (required OR optional ID fields)
  const opsWithRefs: Array<{ name: string; type: string }> = [];

  for (const [opName, op] of Object.entries(graph.operations)) {
    // Check if operation has any required FK references
    const hasRequiredFKs = Object.values(op.inputs).some(
      (input) => input.required && input.references,
    );

    // Also check for optional ID fields in read/list operations (describe*, list*)
    const hasOptionalIdFields =
      (op.type === "read" || op.type === "list") &&
      Object.entries(op.inputs).some(
        ([name, input]) =>
          !input.required &&
          (name.endsWith("Id") || name.endsWith("Ids") || input.references),
      );

    if (hasRequiredFKs || hasOptionalIdFields) {
      opsWithRefs.push({ name: opName, type: op.type });
    }
  }

  // Group by type for reporting
  const byType: Record<string, string[]> = {};
  for (const op of opsWithRefs) {
    if (!byType[op.type]) byType[op.type] = [];
    byType[op.type].push(op.name);
  }

  yield* Console.log(
    `   Found ${opsWithRefs.length} operations with required resource references:`,
  );
  for (const [type, ops] of Object.entries(byType).sort(
    (a, b) => b[1].length - a[1].length,
  )) {
    yield* Console.log(`     ${type}: ${ops.length}`);
  }
  yield* Console.log("");

  // Test all operations with resource references
  yield* Console.log(
    `🔬 Testing operations with fake resource IDs (limit: ${limit})...\n`,
  );
  let tested = 0;
  let errorsFound = 0;

  for (const op of opsWithRefs.slice(0, limit)) {
    const inputs = generateFakeInputs(graph, op.name);
    if (!inputs) continue;

    const result = yield* callOperation(
      op.name,
      inputs,
      serviceModule as Record<string, unknown>,
    );

    tested++;
    if (!result.success && "errorTag" in result) {
      errorsFound++;
      const errorTag = result.errorTag ?? result.error;
      // Log NotFound, NoSuch, and Malformed errors (the interesting ones)
      if (
        errorTag?.includes("NotFound") ||
        errorTag?.includes("NoSuch") ||
        errorTag?.includes("Malformed")
      ) {
        yield* Console.log(`   ✓ ${op.name} → ${errorTag}`);
      }
    }
  }

  yield* Console.log(
    `\n   Tested ${tested} operations, ${errorsFound} returned errors\n`,
  );

  // Report
  yield* Console.log("📊 Summary:");

  if (newErrors.length > 0) {
    yield* Console.log(
      `\n🆕 NEW errors recorded to spec (${newErrors.length}):`,
    );
    const unique = new Map<string, string[]>();
    for (const err of newErrors) {
      if (!unique.has(err.error)) unique.set(err.error, []);
      unique.get(err.error)!.push(err.operation);
    }
    for (const [error, ops] of unique) {
      yield* Console.log(
        `   ${error}: ${ops.slice(0, 5).join(", ")}${ops.length > 5 ? ` (+${ops.length - 5} more)` : ""}`,
      );
    }
  } else {
    yield* Console.log(
      "\n   No new errors discovered (all errors already known)",
    );
  }

  // Show all NotFound errors
  const notFoundErrors = allErrors.filter(
    (e) => e.error.includes("NotFound") || e.error.includes("NoSuch"),
  );
  if (notFoundErrors.length > 0) {
    yield* Console.log(
      `\n📋 All NotFound/NoSuch errors encountered (${notFoundErrors.length}):`,
    );
    const unique = new Map<string, number>();
    for (const err of notFoundErrors) {
      unique.set(err.error, (unique.get(err.error) ?? 0) + 1);
    }
    const sorted = [...unique.entries()].sort((a, b) => b[1] - a[1]);
    for (const [error, count] of sorted.slice(0, 20)) {
      yield* Console.log(`   ${error}: ${count}x`);
    }
  }

  // Show all Malformed errors
  const malformedErrors = allErrors.filter((e) =>
    e.error.includes("Malformed"),
  );
  if (malformedErrors.length > 0) {
    yield* Console.log(
      `\n📋 All Malformed errors encountered (${malformedErrors.length}):`,
    );
    const unique = new Map<string, number>();
    for (const err of malformedErrors) {
      unique.set(err.error, (unique.get(err.error) ?? 0) + 1);
    }
    const sorted = [...unique.entries()].sort((a, b) => b[1] - a[1]);
    for (const [error, count] of sorted.slice(0, 15)) {
      yield* Console.log(`   ${error}: ${count}x`);
    }
  }

  yield* Console.log("\n✨ Done!\n");
});

// Build layers
const platform = Layer.mergeAll(NodeContext.layer, FetchHttpClient.layer);
const awsLayer = Credentials.fromChain();

main.pipe(
  Effect.provide(platform),
  Effect.provide(awsLayer),
  Effect.provideService(Region, "us-east-1"),
  NodeRuntime.runMain,
);
