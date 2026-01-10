#!/usr/bin/env bun
/**
 * Explore a service to discover missing errors.
 *
 * 1. Runs all test chains from topology
 * 2. Cleans up all resources in the service
 * 3. Reports discovered errors
 *
 * Usage:
 *   bun scripts/explore-service.ts ec2
 *   bun scripts/explore-service.ts ec2 --limit 10
 */

import { FetchHttpClient } from "@effect/platform";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, Layer } from "effect";
import * as Credentials from "../src/credentials.ts";
import {
  computeDeletionOrder as computeOrder,
  getCleanableResources as getCleanable,
} from "../src/patch/service-cleaner.ts";
import {
  buildDependencyGraph,
  generateTestSequences,
  type InputValue,
  type Placeholder,
  type Ref,
  type Step,
} from "../src/patch/topology.ts";
import { Region } from "../src/region.ts";

const args = process.argv.slice(2);
const serviceName = args[0] ?? "ec2";
const limitArg = args.indexOf("--limit");
const limit = limitArg >= 0 ? parseInt(args[limitArg + 1] ?? "999", 10) : 999;
const filterArg = args.indexOf("--filter");
const filter = filterArg >= 0 ? args[filterArg + 1] : undefined;

// Track errors - only truly new ones (UnknownAwsError means not in SDK)
const newErrors: Array<{ operation: string; error: string }> = [];
// Track all errors we encounter (including known ones)
const allErrors: Array<{ operation: string; error: string }> = [];

/**
 * Resolve an input value using the context of previous step outputs.
 */
const resolveValue = (
  value: InputValue,
  context: Record<string, unknown>,
): unknown => {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if ("$ref" in value) {
    const [varName, ...props] = (value as Ref).$ref.split(".");
    let result: unknown = context[varName];
    for (const prop of props) {
      if (result && typeof result === "object") {
        result = (result as Record<string, unknown>)[prop];
      }
    }
    return result;
  }

  if ("$placeholder" in value) {
    const ph = (value as Placeholder).$placeholder;
    return generatePlaceholderValue(ph.name, ph.type);
  }

  return undefined;
};

/**
 * Resources to skip during cleanup ONLY because they include public/shared data.
 * We still want to explore these via chains - just not delete them.
 */
const SKIP_RESOURCES = new Set([
  "Snapshot", // describeSnapshots includes public snapshots
  "Image", // describeImages includes public AMIs
  "FpgaImage", // includes AWS marketplace images
  "SpotPrice", // pricing data, not a resource
  "InstanceTypeOffering", // availability data
  "AvailabilityZone", // AWS infrastructure
  "Region", // AWS infrastructure
  "PrefixList", // includes AWS-managed prefix lists
]);

/**
 * AWS Resource ID prefixes by resource type.
 * These follow the pattern: prefix-{hex} (8 or 17 hex chars).
 * Only includes resources that actually use AWS-generated IDs.
 */
const AWS_ID_PREFIXES: Record<string, string> = {
  // EC2 resources
  Vpc: "vpc",
  Subnet: "subnet",
  Instance: "i",
  SecurityGroup: "sg",
  NetworkInterface: "eni",
  InternetGateway: "igw",
  RouteTable: "rtb",
  NetworkAcl: "acl",
  Volume: "vol",
  Snapshot: "snap",
  Image: "ami",
  KeyPair: "key",
  Allocation: "eipalloc",
  Association: "eipassoc",
  NatGateway: "nat",
  VpnGateway: "vgw",
  CustomerGateway: "cgw",
  VpnConnection: "vpn",
  DhcpOptions: "dopt",
  // Transit Gateway resources
  TransitGateway: "tgw",
  TransitAssociationGateway: "tgw", // Alias - same as TransitGateway
  TransitGatewayAttachment: "tgw-attach",
  TransitGatewayRouteTable: "tgw-rtb",
  TransitGatewayPolicyTable: "tgw-ptb",
  TransitGatewayMulticastDomain: "tgw-mcast",
  // Local Gateway resources
  LocalGateway: "lgw",
  LocalGatewayRouteTable: "lgw-rtb",
  LocalGatewayRoutetable: "lgw-rtb", // Smithy typo - lowercase 't'
  LocalGatewayVirtualInterface: "lgw-vif",
  LocalGatewayVirtualInterfaceGroup: "lgw-vif-grp",
  // Other EC2 resources
  LaunchTemplate: "lt",
  PlacementGroup: "pg",
  Fleet: "fleet",
  SpotInstanceRequest: "sir",
  ReservedInstance: "ri",
  CapacityReservation: "cr",
  CarrierGateway: "cagw",
  EgressOnlyInternetGateway: "eigw",
  PrefixList: "pl",
  FlowLog: "fl",
  VpcEndpoint: "vpce",
  VpcPeeringConnection: "pcx",
  ClientVpnEndpoint: "cvpn-endpoint",
  // IPAM resources
  Ipam: "ipam",
  IpamPool: "ipam-pool",
  IpamScope: "ipam-scope",
  IpamResourceDiscovery: "ipam-res-disco",
  // Route Server
  RouteServer: "rs",
  RouteServerEndpoint: "rse",
  RouteServerPeer: "rsp",
  // VPC encryption
  VpcEncryptionControl: "vpc-encryption",
  // Verified Access
  VerifiedAccessInstance: "vai",
  VerifiedAccessGroup: "vag",
  VerifiedAccessEndpoint: "vae",
  VerifiedAccessTrustProvider: "vatp",
  // Traffic Mirror
  TrafficMirrorFilter: "tmf",
  TrafficMirrorSession: "tms",
  TrafficMirrorTarget: "tmt",
  // Transit Gateway Metering
  TransitGatewayMeteringPolicy: "tgw-mp",
  TransitGatewayMeteringPolicyEntry: "tgw-mpe",
  // Network Insights
  NetworkInsightsPath: "nip",
  NetworkInsightsAnalysis: "nia",
  NetworkInsightsAccessScope: "nis",
  NetworkInsightsAccessScopeAnalysis: "nisa",
  // VPN
  VpnConnection: "vpn",
  // Image
  ImageUsageReport: "iur",
  // Instance Connect
  InstanceConnectEndpoint: "eice",
  // Subnet CIDR
  SubnetCidrReservation: "scr",
  // Public IPv4 Pool
  PublicIpv4Pool: "ipv4pool-ec2",
};

/**
 * Generate a placeholder value based on the field name and type.
 * Uses Smithy type conventions and AWS naming patterns.
 *
 * Strategy:
 * 1. Use Smithy patterns where documented (AccountID, IpAddress, etc.)
 * 2. Use AWS ID conventions for resource IDs (vpc-xxx, subnet-xxx, etc.)
 * 3. Use field name heuristics for common patterns
 * 4. Generate fake IDs for unknown ID types (will trigger NotFound - which we want!)
 */
const generatePlaceholderValue = (name: string, type: string): unknown => {
  // === SMITHY DOCUMENTED PATTERNS ===

  // Account IDs (12 digits, pattern: ^[0-9]{12}$)
  if (
    type === "AccountID" ||
    type === "ComponentAccount" ||
    name === "AccountId" ||
    name === "PeerAccountId" ||
    name === "OwnerId"
  ) {
    return process.env.AWS_ACCOUNT_ID ?? "123456789012";
  }

  // Regions (pattern: ^[a-z]{2}-[a-z]+-[1-9]+$)
  if (
    type === "ComponentRegion" ||
    name.includes("Region") ||
    type.includes("Region")
  ) {
    return "us-east-1";
  }

  // IP addresses (pattern: ^([0-9]{1,3}.){3}[0-9]{1,3}$)
  if (type === "IpAddress" || name.includes("IpAddress") || name === "Ip") {
    return "10.0.0.1";
  }

  // ARNs (pattern: ^arn:aws...)
  if (type.endsWith("Arn") || name.endsWith("Arn")) {
    // Generate a fake ARN that will fail with clear error
    const resource = type.replace(/Arn$/, "").toLowerCase() || "resource";
    return `arn:aws:service:us-east-1:123456789012:${resource}/fake-${resource}`;
  }

  // === AWS RESOURCE ID CONVENTIONS ===
  // Use realistic-looking fake hex (some AWS services reject all-zeros)
  const FAKE_HEX = "0123456789abcdef0"; // 17 hex chars

  // Look up known ID prefix by type name
  if (type.endsWith("Id") && !type.includes("Account")) {
    const resourceType = type.replace(/Id$/, "");
    const prefix = AWS_ID_PREFIXES[resourceType];
    if (prefix) {
      return `${prefix}-${FAKE_HEX}`;
    }
    // Unknown ID type - generate a fake that will trigger NotFound
    const inferredPrefix = resourceType.toLowerCase().slice(0, 4);
    return `${inferredPrefix}-${FAKE_HEX}`;
  }

  // Look up by field name (e.g., "VpcId" field -> Vpc resource)
  if (name.endsWith("Id") && !name.includes("Account")) {
    const resourceType = name.replace(/Id$/, "");
    const prefix = AWS_ID_PREFIXES[resourceType];
    if (prefix) {
      return `${prefix}-${FAKE_HEX}`;
    }
  }

  // === COMMON FIELD PATTERNS ===

  // CIDR blocks
  if (name.includes("Cidr") || type.includes("Cidr")) {
    if (name.includes("Ipv6")) {
      return "2001:db8::/32";
    }
    return name.includes("Subnet") ? "10.99.1.0/24" : "10.99.0.0/16";
  }

  // Availability zones
  if (name.includes("AvailabilityZone") || type.includes("AvailabilityZone")) {
    return "us-east-1a";
  }

  // Port numbers
  if (name.includes("Port") || type.includes("Port")) {
    if (name.includes("From")) return 0;
    if (name.includes("To")) return 65535;
    return 443;
  }

  // Protocol
  if (name === "Protocol" || name === "IpProtocol") {
    return "tcp";
  }

  // Instance types
  if (type === "InstanceType" || name === "InstanceType") {
    return "t3.micro";
  }

  // Address family (IPAM)
  if (type === "AddressFamily" || name === "AddressFamily") {
    return "ipv4";
  }

  // ASN (Autonomous System Number)
  if (name === "Asn" || type.includes("Asn")) {
    return "64512"; // Private ASN range
  }

  // MaxResults for pagination (commonly required)
  if (name === "MaxResults") {
    return 100;
  }

  // Destination CIDR for routes
  if (name === "DestinationCidrBlock") {
    return "0.0.0.0/0";
  }

  // Policy rule numbers
  if (name === "PolicyRuleNumber" || name === "RuleNumber") {
    return 100;
  }

  // BGP options
  if (name === "BgpOptions" || type.includes("BgpOptions")) {
    return { PeerAsn: 64512 };
  }

  // Peer addresses (BGP)
  if (name === "PeerAddress") {
    return "10.0.0.1";
  }

  // Verified Access types
  if (type === "VerifiedAccessEndpointType" || name === "EndpointType") {
    return "network-interface";
  }
  if (
    type === "VerifiedAccessEndpointAttachmentType" ||
    name === "AttachmentType"
  ) {
    return "vpc";
  }

  // Transit Gateway metering
  if (type === "TransitGatewayMeteringPayerType" || name === "MeteredAccount") {
    return "attached-account";
  }

  // Network ACL rule numbers
  if (name === "RuleNumber" || name === "Egress") {
    return typeof name === "RuleNumber" ? 100 : false;
  }

  // Traffic mirror
  if (name === "TrafficDirection") {
    return "ingress";
  }
  if (name === "RuleAction") {
    return "accept";
  }
  if (name === "SessionNumber") {
    return 1;
  }

  // VPN connection types
  if (name === "Type" && type === "String") {
    return "ipsec.1";
  }

  // Lists/Sets - empty array
  if (type.includes("List") || type.includes("Set") || name.endsWith("Ids")) {
    return [];
  }

  // Booleans
  if (type === "Boolean" || type === "PrimitiveBoolean") {
    return false;
  }

  // Numbers
  if (
    type === "Integer" ||
    type === "Long" ||
    type.includes("Int") ||
    type.includes("Long") ||
    type.includes("Count") ||
    type.includes("Size")
  ) {
    return 1;
  }

  // Names (common pattern for resource names)
  if (name.endsWith("Name") || name === "Name") {
    return `itty-test-${Date.now()}`;
  }

  // Descriptions
  if (name === "Description" || name.endsWith("Description")) {
    return "Test resource created by distilled-aws explore";
  }

  // Tags
  if (name === "TagSpecifications" || name === "Tags") {
    return [{ Key: "Name", Value: `itty-test-${Date.now()}` }];
  }

  // Default strings
  if (type === "String") {
    return `itty-test-${name.toLowerCase()}`;
  }

  // Unknown - return undefined and let AWS tell us what's missing
  return undefined;
};

const toCamelCase = (s: string): string =>
  s.charAt(0).toLowerCase() + s.slice(1);

/**
 * Execute a single step.
 */
const executeStep = (
  step: Step,
  serviceModule: Record<string, unknown>,
  context: Record<string, unknown>,
) =>
  Effect.gen(function* () {
    const fn = serviceModule[step.call];
    if (typeof fn !== "function") {
      return { success: false, error: "Function not found" };
    }

    const resolvedInputs: Record<string, unknown> = {};
    if (step.inputs) {
      for (const [key, value] of Object.entries(step.inputs)) {
        const resolved = resolveValue(value, context);
        if (resolved !== undefined) {
          resolvedInputs[key] = resolved;
        }
      }
    }

    const result = yield* Effect.try({
      try: () => fn(resolvedInputs) as Effect.Effect<unknown, unknown, unknown>,
      catch: (e) => e,
    }).pipe(
      Effect.flatMap((effect) =>
        Effect.isEffect(effect)
          ? (effect as Effect.Effect<unknown, unknown, never>)
          : Effect.succeed(effect),
      ),
      Effect.map((output) => ({ success: true as const, output })),
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

    if (result.success && step.as && result.output) {
      context[step.as] = result.output;
    }

    if (!result.success) {
      const errorName = result.errorTag ?? result.error;
      allErrors.push({ operation: step.call, error: errorName });

      // UnknownAwsError means it's not in the SDK - truly new!
      if (result.error === "UnknownAwsError" && result.errorTag) {
        newErrors.push({ operation: step.call, error: result.errorTag });
      }
    }

    return result;
  });

/**
 * Run cleanup for the service - list and delete all resources.
 */
const cleanupService = (
  graph: ReturnType<typeof buildDependencyGraph> extends Effect.Effect<
    infer T,
    any,
    any
  >
    ? T
    : never,
  serviceModule: Record<string, unknown>,
) =>
  Effect.gen(function* () {
    yield* Console.log("\n🧹 Cleaning up service resources...\n");

    const cleanable = getCleanable(graph);
    const deletionOrder = computeOrder(graph);

    // Sort by deletion order (children first)
    const sorted = cleanable.sort((a, b) => {
      const aIndex = deletionOrder.indexOf(a.name);
      const bIndex = deletionOrder.indexOf(b.name);
      return aIndex - bIndex;
    });

    for (const { name, listOp, deleteOp, resource } of sorted) {
      // Skip resources that include public/shared data
      if (SKIP_RESOURCES.has(name)) {
        continue;
      }

      const listFn = serviceModule[listOp];
      const deleteFn = serviceModule[deleteOp];

      if (typeof listFn !== "function" || typeof deleteFn !== "function") {
        continue;
      }

      // Try to list
      const listResult = yield* Effect.try({
        try: () => listFn({}) as Effect.Effect<unknown, unknown, unknown>,
        catch: (e) => e,
      }).pipe(
        Effect.flatMap((effect) =>
          Effect.isEffect(effect)
            ? (effect as Effect.Effect<unknown, unknown, never>)
            : Effect.succeed(effect),
        ),
        Effect.catchAll((error) => {
          const err = error as { _tag?: string; errorTag?: string };
          const errorName = err.errorTag ?? err._tag ?? "Unknown";
          // MissingParameter on list ops is expected (need parent IDs we don't have)
          // Don't count as error - just skip this resource
          if (errorName !== "MissingParameter") {
            allErrors.push({ operation: listOp, error: errorName });
            if (err._tag === "UnknownAwsError" && err.errorTag) {
              newErrors.push({ operation: listOp, error: err.errorTag });
            }
          }
          return Effect.succeed(null);
        }),
      );

      if (!listResult) continue;

      // Extract instances (no prefix filter - delete everything)
      const instances = extractInstances(name, resource.identifier, listResult);

      if (instances.length === 0) continue;

      yield* Console.log(`  🗑️  Deleting ${instances.length} ${name}(s)...`);

      for (const instance of instances) {
        yield* Effect.try({
          try: () =>
            deleteFn({
              [instance.identifier]: instance.value,
            }) as Effect.Effect<unknown, unknown, unknown>,
          catch: (e) => e,
        }).pipe(
          Effect.flatMap((effect) =>
            Effect.isEffect(effect)
              ? (effect as Effect.Effect<unknown, unknown, never>)
              : Effect.succeed(effect),
          ),
          Effect.catchAll((error) => {
            const err = error as { _tag?: string; errorTag?: string };
            const errorName = err.errorTag ?? err._tag ?? "Unknown";
            allErrors.push({ operation: deleteOp, error: errorName });
            if (err._tag === "UnknownAwsError" && err.errorTag) {
              newErrors.push({ operation: deleteOp, error: err.errorTag });
            }
            return Effect.succeed(null);
          }),
        );
      }
    }
  });

/**
 * Extract resource instances from a list API response.
 */
const extractInstances = (
  resourceName: string,
  identifier: string | null,
  response: unknown,
  prefix?: string,
): Array<{ identifier: string; value: unknown }> => {
  if (!response || typeof response !== "object") return [];
  if (!identifier) return [];

  const instances: Array<{ identifier: string; value: unknown }> = [];

  const pluralName = resourceName + "s";
  const possibleKeys = [
    pluralName,
    resourceName + "List",
    resourceName + "Set",
    "Items",
    "Contents",
    resourceName + "Summaries",
    resourceName,
  ];

  const resp = response as Record<string, unknown>;

  for (const key of possibleKeys) {
    const items = resp[key];
    if (Array.isArray(items)) {
      for (const item of items) {
        if (item && typeof item === "object") {
          const value = (item as Record<string, unknown>)[identifier];
          if (value !== undefined) {
            if (
              prefix &&
              typeof value === "string" &&
              !value.includes(prefix)
            ) {
              continue;
            }
            instances.push({ identifier, value });
          }
        }
      }
      break;
    }
  }

  return instances;
};

const main = Effect.gen(function* () {
  yield* Console.log(`\n🔬 Exploring ${serviceName} service\n`);
  yield* Console.log(`   Running up to ${limit} chains\n`);

  // Build topology
  yield* Console.log("📊 Building topology...");
  const graph = yield* buildDependencyGraph(serviceName);
  const sequences = generateTestSequences(graph);
  yield* Console.log(`   Found ${sequences.length} test sequences\n`);

  // Load service module
  yield* Console.log("📦 Loading service module...");
  const serviceModule = yield* Effect.tryPromise({
    try: () => import(`../src/services/${serviceName}.ts`),
    catch: (e) => new Error(`Failed to load service: ${e}`),
  });

  // Run chains (filter if specified)
  let filtered = sequences;
  if (filter) {
    filtered = sequences.filter((s) =>
      s.description.toLowerCase().includes(filter.toLowerCase()),
    );
    yield* Console.log(
      `   Filtered to ${filtered.length} matching "${filter}"`,
    );
  }
  const toRun = filtered.slice(0, limit);
  yield* Console.log(`\n🏃 Running ${toRun.length} chain(s)...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const sequence of toRun) {
    yield* Console.log(`📋 ${sequence.description}`);
    const context: Record<string, unknown> = {};

    for (const step of sequence.steps) {
      const result = yield* executeStep(
        step,
        serviceModule as Record<string, unknown>,
        context,
      );
      if (result.success) {
        successCount++;
      } else {
        errorCount++;
      }
    }
  }

  // Cleanup
  yield* cleanupService(graph, serviceModule as Record<string, unknown>);

  // Report
  yield* Console.log("\n📊 Summary:");
  yield* Console.log(`   Chains run: ${toRun.length}`);
  yield* Console.log(`   Successful steps: ${successCount}`);
  yield* Console.log(`   Failed steps: ${errorCount}`);

  // Show NEW errors (not in SDK, will be recorded to spec)
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
        `   ${error}: ${ops.slice(0, 3).join(", ")}${ops.length > 3 ? ` (+${ops.length - 3} more)` : ""}`,
      );
    }
  } else {
    yield* Console.log(
      "\n   No new errors discovered (all errors already known)",
    );
  }

  // Show all errors encountered
  if (allErrors.length > 0) {
    yield* Console.log(`\n📋 All errors encountered (${allErrors.length}):`);
    const unique = new Map<string, number>();
    for (const err of allErrors) {
      unique.set(err.error, (unique.get(err.error) ?? 0) + 1);
    }
    const sorted = [...unique.entries()].sort((a, b) => b[1] - a[1]);
    for (const [error, count] of sorted.slice(0, 10)) {
      yield* Console.log(`   ${error}: ${count}x`);
    }
    if (sorted.length > 10) {
      yield* Console.log(`   ... and ${sorted.length - 10} more error types`);
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
