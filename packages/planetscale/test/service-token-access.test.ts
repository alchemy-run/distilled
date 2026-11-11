import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import {
  addServiceTokenAccess,
  fromOAuth,
  listServiceTokenAccesses,
  type PlanetScaleOpContext,
  removeServiceTokenAccess,
  Retry,
} from "../src/index.ts";

const access = {
  id: "hjqui654yu71",
  type: "DatabaseAccess",
  resource: {
    id: "1lbjwnp48b6r",
    type: "Database",
    name: "hidden-river-4209",
    created_at: "2021-01-14T10:19:23.000Z",
    updated_at: "2021-01-14T10:19:23.000Z",
  },
  access: "read_comment",
};
const responseBody = { type: "list", next_page: null, prev_page: null, data: [access] };

const run = <A, E>(
  operation: Effect.Effect<A, E, PlanetScaleOpContext>,
  response: Response,
  check: (request: HttpClientRequest.HttpClientRequest) => void,
) =>
  Effect.runPromise(
    operation.pipe(
      Retry.none,
      Effect.provide(ResponseValidation.strict),
      Effect.provide(
        Layer.mergeAll(
          fromOAuth({
            accessToken: Redacted.make("test-oauth-token"),
            organization: "my-org",
            apiBaseUrl: "https://planetscale.test/v1",
          }),
          Layer.succeed(
            HttpClient.HttpClient,
            HttpClient.make((request) =>
              Effect.sync(() => {
                check(request);
                return HttpClientResponse.fromWeb(request, response);
              }),
            ),
          ),
        ),
      ),
    ),
  );

const json = (body: unknown) =>
  new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
  });

const bodyOf = (request: HttpClientRequest.HttpClientRequest) => {
  expect(request.body._tag).toBe("Uint8Array");
  return request.body._tag === "Uint8Array"
    ? JSON.parse(new TextDecoder().decode(request.body.body))
    : undefined;
};

describe("Service token accesses", () => {
  test("lists individual accesses from the data envelope", async () => {
    const result = await run(
      listServiceTokenAccesses({ organization: "my-org", id: "1234" }),
      json(responseBody),
      (request) => {
        expect(request.method).toBe("GET");
        expect(request.url).toBe(
          "https://planetscale.test/v1/organizations/my-org/service-tokens/1234/access",
        );
        expect(request.body._tag).toBe("Empty");
      },
    );

    expect(result).toEqual(responseBody);
  });

  test("grants a database access using the singular access array", async () => {
    const result = await run(
      addServiceTokenAccess({
        organization: "my-org",
        id: "1234",
        database: "hidden-river-4209",
        access: ["read_comment"],
      }),
      json(responseBody),
      (request) => {
        expect(request.method).toBe("POST");
        expect(request.url).toBe(
          "https://planetscale.test/v1/organizations/my-org/service-tokens/1234/access",
        );
        expect(bodyOf(request)).toEqual({
          database: "hidden-river-4209",
          access: ["read_comment"],
        });
      },
    );

    expect(result).toEqual(responseBody);
  });

  test("removes organization access with an empty database and a DELETE body", async () => {
    const result = await run(
      removeServiceTokenAccess({
        organization: "my-org",
        id: "1234",
        database: "",
        access: ["read_organization"],
      }),
      new Response(null),
      (request) => {
        expect(request.method).toBe("DELETE");
        expect(request.url).toBe(
          "https://planetscale.test/v1/organizations/my-org/service-tokens/1234/access",
        );
        expect(bodyOf(request)).toEqual({
          database: "",
          access: ["read_organization"],
        });
      },
    );

    expect(result).toEqual({});
  });
});

describe("Service token access errors", () => {
  test("surfaces a 404 as NotFound", async () => {
    const error = await run(
      Effect.flip(
        removeServiceTokenAccess({
          organization: "my-org",
          id: "missing",
          database: "hidden-river-4209",
          access: ["read_comment"],
        }),
      ),
      new Response(JSON.stringify({ code: "not_found", message: "Not Found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }),
      () => {},
    );

    expect(error._tag).toBe("NotFound");
  });
});
