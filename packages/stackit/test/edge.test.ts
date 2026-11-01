import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { credentials } from "../src/credentials.ts";
import {
  getInstance,
  getKubeconfigByInstanceId,
  getTokenByInstanceId,
} from "../src/services/edge.ts";

const ids = { projectId: "p", regionId: "eu01", instanceId: "i" };

const fake = (status: number, body: unknown) => {
  const urls: URL[] = [];
  const layer = Layer.mergeAll(
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request, url) => {
        urls.push(url);
        return Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response(JSON.stringify(body), {
              status,
              headers: { "content-type": "application/json" },
            }),
          ),
        );
      }),
    ),
    credentials({ token: Redacted.make("stackit-token"), region: "eu01" }),
  );
  return { urls, layer };
};

describe("edge", () => {
  test("a kubeconfig decodes to one Redacted value, whole", async () => {
    const kubeconfig = { apiVersion: "v1", clusters: [{ name: "edge" }] };
    const { layer } = fake(200, { kubeconfig });
    const result = await Effect.runPromise(
      getKubeconfigByInstanceId(ids).pipe(Effect.provide(layer)),
    );
    expect(Redacted.isRedacted(result.kubeconfig)).toBe(true);
    expect(Redacted.value(result.kubeconfig as Redacted.Redacted<unknown>)).toEqual(kubeconfig);
    expect(JSON.stringify(result)).not.toContain("clusters");
  });

  test("a token decodes to a Redacted value", async () => {
    const { layer } = fake(200, { token: "secret" });
    const result = await Effect.runPromise(getTokenByInstanceId(ids).pipe(Effect.provide(layer)));
    expect(Redacted.isRedacted(result.token)).toBe(true);
    expect(JSON.stringify(result)).not.toContain("secret");
  });

  test("a missing instance is the typed NotFound, on the global host", async () => {
    const { layer, urls } = fake(404, { message: "instance not found" });
    const error = await Effect.runPromise(
      getInstance(ids).pipe(Effect.flip, Effect.provide(layer)),
    );
    expect(error._tag).toBe("NotFound");
    expect(urls[0]?.host).toBe("edge.api.stackit.cloud");
    expect(urls[0]?.pathname).toBe("/v1beta1/projects/p/regions/eu01/instances/i");
  });
});
