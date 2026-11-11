import { join } from "node:path";
import { describe, expect, test } from "vitest";
import {
  applyGraphQLTelemetry,
  applyTelemetryTraits,
  ATTRIBUTES_TRAIT,
  OPERATION_TRAIT,
  SERVICE_TRAIT,
  generateGraphQLTelemetry,
  providerDefaults,
  snakeCase,
} from "../../src/codegen/telemetry.ts";

const model = () => ({
  shapes: {
    "com.test#Zones": { type: "service", operations: [{ target: "com.test#GetZone" }] },
    "com.test#GetZone": {
      type: "operation",
      input: { target: "com.test#GetZoneRequest" },
      traits: { "smithy.api#http": { method: "GET", uri: "/zones/{zoneId}?expand=1" } },
    },
    "com.test#GetZoneRequest": {
      type: "structure",
      members: {
        zoneId: { target: "smithy.api#String", traits: { "smithy.api#httpLabel": {} } },
        apiKey: {
          target: "smithy.api#String",
          traits: { "smithy.api#httpLabel": {}, "smithy.api#sensitive": {} },
        },
        secretRef: { target: "com.test#Secret", traits: { "smithy.api#httpLabel": {} } },
        name: { target: "smithy.api#String" },
      },
    },
    "com.test#Secret": { type: "string", traits: { "smithy.api#sensitive": {} } },
  } as Record<string, any>,
  metadata: {} as Record<string, any>,
});

const options = {
  system: "test-api",
  prefix: "Test",
  labelNamespace: "test",
  responseHeaders: [{ header: "x-request-id", name: "http.response.header.x-request-id" }],
};

describe("applyTelemetryTraits", () => {
  test("stamps service, operation and label member traits", () => {
    const m = model();
    applyTelemetryTraits(m, "zones", options);
    expect(m.shapes["com.test#Zones"].traits[SERVICE_TRAIT]).toEqual({
      system: "test-api",
      responseHeaders: [{ header: "x-request-id", name: "http.response.header.x-request-id" }],
    });
    expect(m.shapes["com.test#GetZone"].traits[OPERATION_TRAIT]).toEqual({
      name: "Test.GetZone",
      method: "Zones/GetZone",
      attributes: { "url.template": "/zones/{zoneId}" },
    });
    const members = m.shapes["com.test#GetZoneRequest"].members;
    expect(members.zoneId.traits[ATTRIBUTES_TRAIT]).toEqual([{ name: "test.zone_id" }]);
    // Sensitive on the member or on its target: never an attribute.
    expect(members.apiKey.traits[ATTRIBUTES_TRAIT]).toBeUndefined();
    expect(members.secretRef.traits[ATTRIBUTES_TRAIT]).toBeUndefined();
    expect(members.name.traits).toBeUndefined();
  });

  test("keeps what a patch already set, field by field", () => {
    const m = model();
    m.shapes["com.test#GetZone"].traits[OPERATION_TRAIT] = {
      kind: "producer",
      attributes: { "url.template": "/custom" },
    };
    m.shapes["com.test#GetZoneRequest"].members.zoneId.traits[ATTRIBUTES_TRAIT] = [];
    applyTelemetryTraits(m, "zones", options);
    expect(m.shapes["com.test#GetZone"].traits[OPERATION_TRAIT]).toEqual({
      name: "Test.GetZone",
      method: "Zones/GetZone",
      kind: "producer",
      attributes: { "url.template": "/custom" },
    });
    expect(m.shapes["com.test#GetZoneRequest"].members.zoneId.traits[ATTRIBUTES_TRAIT]).toEqual([]);
  });

  test("a model without a service shape carries the service trait in metadata", () => {
    const m = model();
    delete m.shapes["com.test#Zones"];
    m.metadata.service = "compute";
    applyTelemetryTraits(m, "compute_v1", { ...options, prefix: "service" });
    expect(m.metadata[SERVICE_TRAIT].system).toBe("test-api");
    expect(m.shapes["com.test#GetZone"].traits[OPERATION_TRAIT].name).toBe("Compute.GetZone");
    expect(m.shapes["com.test#GetZone"].traits[OPERATION_TRAIT].method).toBe("compute/GetZone");
  });
});

test("snakeCase", () => {
  expect(snakeCase("zoneId")).toBe("zone_id");
  expect(snakeCase("zone_id")).toBe("zone_id");
  expect(snakeCase("ZoneID")).toBe("zone_id");
  expect(snakeCase("accountIDList")).toBe("account_id_list");
  expect(snakeCase("project-id")).toBe("project_id");
});

describe("applyGraphQLTelemetry", () => {
  const graphqlModel = () => ({
    queryType: "Query",
    mutationType: "Mutation",
    types: {
      Query: {
        fields: {
          project: { type: "Project!", args: { id: { type: "String!" } } },
          environment: {
            type: "Environment!",
            args: { id: { type: "String!" }, projectId: { type: "String" } },
          },
          projects: { type: "[Project!]!", args: { input: { type: "ProjectsInput" } } },
        },
      },
      Mutation: {
        fields: { projectDelete: { type: "Boolean!", args: { id: { type: "String!" } } } },
      },
      Project: { fields: {} },
      Environment: { fields: {} },
    },
  });

  test("names id arguments by the type they return and *Id arguments by themselves", () => {
    const m: any = graphqlModel();
    applyGraphQLTelemetry(m, {
      system: "railway-api",
      prefix: "Railway",
      labelNamespace: "railway",
    });
    expect(m.telemetry).toEqual({
      system: "railway-api",
      prefix: "Railway",
      fields: {
        "query.project": { id: [{ name: "railway.project_id" }] },
        "query.environment": {
          id: [{ name: "railway.environment_id" }],
          projectId: [{ name: "railway.project_id" }],
        },
      },
    });
    expect(generateGraphQLTelemetry(m)).toContain(
      'export const TELEMETRY: GraphQLTelemetry = {"system":"railway-api"',
    );
  });

  test("keeps a patched telemetry entry", () => {
    const m: any = { ...graphqlModel(), telemetry: { system: "custom", prefix: "X" } };
    applyGraphQLTelemetry(m, {
      system: "railway-api",
      prefix: "Railway",
      labelNamespace: "railway",
    });
    expect(m.telemetry.system).toBe("custom");
    expect(m.telemetry.prefix).toBe("X");
  });
});

test("Cloudflare R2 members also record the names the S3 SDK path uses", () => {
  const m = {
    shapes: {
      "com.cloudflare.r2#R2": { type: "service" },
      "com.cloudflare.r2#GetObject": {
        type: "operation",
        input: { target: "com.cloudflare.r2#GetObjectRequest" },
      },
      "com.cloudflare.r2#GetObjectRequest": {
        type: "structure",
        members: {
          bucket_name: { target: "smithy.api#String", traits: { "smithy.api#httpLabel": {} } },
          object_name: { target: "smithy.api#String", traits: { "smithy.api#httpLabel": {} } },
        },
      },
    } as Record<string, any>,
  };
  applyTelemetryTraits(m, "r2", providerDefaults(join(import.meta.dirname, "../../../cloudflare")));
  const members = m.shapes["com.cloudflare.r2#GetObjectRequest"].members;
  expect(members.bucket_name.traits[ATTRIBUTES_TRAIT]).toEqual([
    { name: "cloudflare.bucket_name" },
    { name: "cloudflare.r2.bucket" },
  ]);
  expect(members.object_name.traits[ATTRIBUTES_TRAIT]).toEqual([
    { name: "cloudflare.object_name" },
    { name: "cloudflare.r2.object_key" },
  ]);
});

describe("output members and provider rules", () => {
  test("outputMember stamps rules on the output structure, never on sensitive members", () => {
    const m = {
      shapes: {
        "com.test#Svc": { type: "service" },
        "com.test#Get": {
          type: "operation",
          input: { target: "com.test#GetIn" },
          output: { target: "com.test#GetOut" },
        },
        "com.test#GetIn": { type: "structure", members: {} },
        "com.test#GetOut": {
          type: "structure",
          members: {
            Count: { target: "smithy.api#Integer" },
            Token: { target: "smithy.api#String", traits: { "smithy.api#sensitive": {} } },
          },
        },
      } as Record<string, any>,
    };
    applyTelemetryTraits(m, "svc", {
      system: "test-api",
      outputMember: ({ member }) => [{ name: `test.${member.toLowerCase()}` }],
    });
    const out = m.shapes["com.test#GetOut"].members;
    expect(out.Count.traits[ATTRIBUTES_TRAIT]).toEqual([{ name: "test.count" }]);
    expect(out.Token.traits[ATTRIBUTES_TRAIT]).toBeUndefined();
  });

  test("Azure records the resource provider and its request id; GCP the client service", () => {
    const azure = providerDefaults(join(import.meta.dirname, "../../../azure"));
    const op = azure.operation!({
      service: "Compute",
      name: "GetVm",
      def: {
        traits: {
          "smithy.api#http": {
            uri: "/subscriptions/{s}/providers/Microsoft.Compute/virtualMachines/{vm}/providers/Microsoft.Insights/metrics",
          },
        },
      },
    });
    expect(op?.attributes).toEqual({ "azure.resource_provider.namespace": "Microsoft.Insights" });
    expect(azure.propagation).toBe("w3c");
    expect(azure.labelNames).toEqual({ resourceGroupName: "azure.resource_group.name" });
    expect(azure.responseHeaders).toContainEqual({
      header: "x-ms-request-id",
      name: "azure.service.request.id",
    });
    const gcp = providerDefaults(join(import.meta.dirname, "../../../gcp"));
    expect(
      gcp.modelAttributes!({ metadata: { baseUrl: "https://compute.googleapis.com/compute/v1/" } }),
    ).toEqual({ "gcp.client.service": "compute" });
  });
});
