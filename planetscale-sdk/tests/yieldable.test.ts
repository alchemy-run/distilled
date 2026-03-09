import { Effect, Layer } from "effect";
import { describe, expect, it } from "vitest";
import { Credentials } from "../src/credentials";
import { getOrganization } from "../src/operations/getOrganization";
import { runEffect } from "./setup";

describe("OperationMethod yieldable", () => {
  it("direct call - yield* operation(input) works with services in context", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const { organization } = yield* Credentials;
        const org = yield* getOrganization({ organization });
        return org;
      }),
    );
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBeDefined();
  });

  it("yield first - yield* operation captures services and returns requirement-free function", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const { organization } = yield* Credentials;
        // yield* the operation itself (not calling it) to capture Credentials + HttpClient
        const getOrg = yield* getOrganization;

        // The returned function has Effect<..., ..., never> — no requirements
        const org = yield* getOrg({ organization });
        return org;
      }),
    );
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBeDefined();
  });

  it("yield first function works without service context", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const { organization } = yield* Credentials;
        // Capture services into a requirement-free function
        const getOrg = yield* getOrganization;

        // Run the requirement-free function with an empty layer —
        // proves the returned function truly has no requirements
        const org = yield* getOrg({ organization }).pipe(
          Effect.provide(Layer.empty),
        );
        return org;
      }),
    );
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBeDefined();
  });
});
