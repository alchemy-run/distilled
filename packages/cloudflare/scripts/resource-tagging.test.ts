import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { fromApiToken } from "../src/credentials.ts";
import {
  getAccountTag,
  listResourceTaggings,
} from "../src/services/resource_tagging.ts";

const client = (result: object) =>
  HttpClient.make((request) =>
    Effect.sync(() =>
      HttpClientResponse.fromWeb(
        request,
        new Response(JSON.stringify({ success: true, result }), {
          headers: { "content-type": "application/json" },
        }),
      ),
    ),
  );

const resource = {
  id: "monitor",
  name: "monitor",
  etag: "etag",
  tags: { team: "infra" },
  type: "load_balancer_monitor",
};
const timestamp = "2026-09-15T00:00:00Z";

// HTTP fixtures exercise dictionary mapping through the opaque union decoder.
describe("resource-tagging response decoding", () => {
  test("GET preserves the tag version on the selected union arm", () =>
    Effect.runPromise(
      getAccountTag({
        accountId: "account",
        resourceId: resource.id,
        resourceType: resource.type,
      }).pipe(
        Effect.tap((result) =>
          Effect.sync(() => {
            expect(result.tagsUpdatedAt).toBe(timestamp);
            expect(result).toEqual({ ...resource, tagsUpdatedAt: timestamp });
          }),
        ),
        Effect.provideService(
          HttpClient.HttpClient,
          client({ ...resource, tags_updated_at: timestamp }),
        ),
        Effect.provide(fromApiToken({ apiToken: "fixture" })),
      ),
    ));

  test("LIST preserves tag versions and variant-specific fields", () =>
    Effect.runPromise(
      listResourceTaggings({ accountId: "account" }).pipe(
        Effect.tap((response) =>
          Effect.sync(() => {
            expect(response.result).toEqual([
              { ...resource, tagsUpdatedAt: timestamp },
              {
                ...resource,
                id: "worker-version",
                type: "worker_version",
                workerId: "worker",
                tagsUpdatedAt: timestamp,
              },
              {
                ...resource,
                id: "dns-record",
                type: "dns_record",
                zoneId: "zone",
                tagsUpdatedAt: timestamp,
              },
            ]);
          }),
        ),
        Effect.provideService(
          HttpClient.HttpClient,
          client([
            { ...resource, tags_updated_at: timestamp },
            {
              ...resource,
              id: "worker-version",
              type: "worker_version",
              worker_id: "worker",
              tags_updated_at: timestamp,
            },
            {
              ...resource,
              id: "dns-record",
              type: "dns_record",
              zone_id: "zone",
              tags_updated_at: timestamp,
            },
          ]),
        ),
        Effect.provide(fromApiToken({ apiToken: "fixture" })),
      ),
    ));
});
