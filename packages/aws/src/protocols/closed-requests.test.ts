import { describe, expect, it } from "bun:test";
import * as Effect from "effect/Effect";
import type { Operation } from "../client/operation.ts";
import { makeRequestBuilder } from "../client/request-builder.ts";
import * as ecs from "../services/ecs.ts";
import * as sqs from "../services/sqs.ts";

const build = (op: unknown, input: unknown) =>
  Effect.runPromise(makeRequestBuilder(op as Operation)(input));

describe("request structures are closed", () => {
  it("drops keys the model doesn't have (awsJson)", async () => {
    // UpdateService models no `launchType`; ECS rejects it if sent.
    const request = await build(ecs.updateService, {
      service: "svc",
      launchType: "FARGATE",
      networkConfiguration: {
        awsvpcConfiguration: { subnets: ["subnet-1"], extra: true },
      },
    });
    expect(JSON.parse(request.body as string)).toEqual({
      service: "svc",
      networkConfiguration: { awsvpcConfiguration: { subnets: ["subnet-1"] } },
    });
  });

  it("drops keys the model doesn't have (awsJson 1.0)", async () => {
    const request = await build(sqs.getQueueUrl, {
      QueueName: "q",
      Unmodeled: 1,
    });
    expect(JSON.parse(request.body as string)).toEqual({ QueueName: "q" });
  });
});

describe("request timestamps", () => {
  it("restJson query timestamps use the protocol's epoch-seconds default", async () => {
    const iotsitewise = await import("../services/iotsitewise.ts");
    const request = await build(iotsitewise.getAssetPropertyValueHistory, {
      propertyId: "p",
      startDate: new Date("2026-01-01T00:00:00.500Z"),
      endDate: new Date("2026-01-01T00:10:00Z"),
    });
    expect(request.query.startDate).toBe("1767225600");
    expect(request.query.endDate).toBe("1767226200");
  });
});
