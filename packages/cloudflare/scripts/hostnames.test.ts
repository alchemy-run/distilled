import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import model from "../.generated-specs/hostnames.json";
import { fromApiToken } from "../src/credentials.ts";
import { getSettingTls, listSettingsTls } from "../src/services/hostnames.ts";

const request = { zoneId: "zone", settingId: "http2" };

const client = (status: number, body: object, path: string) =>
  HttpClient.make((request) =>
    Effect.sync(() => {
      expect(request.method).toBe("GET");
      expect(request.url).toBe(`https://api.cloudflare.com/client/v4${path}`);
      return HttpClientResponse.fromWeb(
        request,
        new Response(JSON.stringify(body), {
          status,
          headers: { "content-type": "application/json" },
        }),
      );
    }),
  );

const collectionPath = "/zones/zone/hostnames/settings/http2";
const hostnamePath = `${collectionPath}/example.com`;
const setting = { hostname: "example.com", value: "on", status: "active" };

describe("hostname TLS GET/LIST split", () => {
  test("GET is singular and has no pagination trait", () => {
    expect(
      model.shapes["com.cloudflare.hostnames#GetSettingTls"].traits,
    ).not.toHaveProperty("smithy.api#paginated");
    return Effect.runPromise(
      getSettingTls({ ...request, hostname: "example.com" }).pipe(
        Effect.tap((result) =>
          Effect.sync(() => expect(result).toEqual(setting)),
        ),
        Effect.provideService(
          HttpClient.HttpClient,
          client(200, { success: true, result: setting }, hostnamePath),
        ),
        Effect.provide(fromApiToken({ apiToken: "fixture" })),
      ),
    );
  });

  test("LIST returns the bare array on the collection route", () =>
    Effect.runPromise(
      listSettingsTls(request).pipe(
        Effect.tap((result) =>
          Effect.sync(() => expect(result).toEqual([setting])),
        ),
        Effect.provideService(
          HttpClient.HttpClient,
          client(200, { success: true, result: [setting] }, collectionPath),
        ),
        Effect.provide(fromApiToken({ apiToken: "fixture" })),
      ),
    ));

  for (const [status, code, tag] of [
    [403, 1450, "AdvancedCertificateManagerRequired"],
    [403, 0, "Forbidden"],
  ] as const) {
    test(`LIST synthetic ${status}/${code} matches ${tag}`, () =>
      Effect.runPromise(
        listSettingsTls(request).pipe(
          Effect.match({
            onFailure: (error) => expect(error._tag).toBe(tag),
            onSuccess: () => {
              throw new Error("Expected entitlement error");
            },
          }),
          Effect.provideService(
            HttpClient.HttpClient,
            client(
              status,
              {
                success: false,
                errors: [{ code, message: "Synthetic entitlement response" }],
              },
              collectionPath,
            ),
          ),
          Effect.provide(fromApiToken({ apiToken: "fixture" })),
        ),
      ));
  }

  test("GET preserves InvalidRoute for a 404 with code 7003", () =>
    Effect.runPromise(
      getSettingTls({ ...request, hostname: "example.com" }).pipe(
        Effect.match({
          onFailure: (error) => expect(error._tag).toBe("InvalidRoute"),
          onSuccess: () => {
            throw new Error("Expected invalid-route error");
          },
        }),
        Effect.provideService(
          HttpClient.HttpClient,
          client(
            404,
            {
              success: false,
              errors: [
                { code: 7003, message: "Invalid request: invalid route" },
              ],
            },
            hostnamePath,
          ),
        ),
        Effect.provide(fromApiToken({ apiToken: "fixture" })),
      ),
    ));
});
