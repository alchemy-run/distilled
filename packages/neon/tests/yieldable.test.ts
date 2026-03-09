import { Effect, Layer } from "effect";
import { describe, expect, it } from "vitest";
import { listProjects } from "../src/operations/listProjects";
import { runEffect } from "./setup";

describe("OperationMethod yieldable", () => {
  it("direct call - yield* operation(input) works with services in context", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const projects = yield* listProjects({});
        return projects;
      }),
    );
    expect(result).toBeDefined();
    expect(Array.isArray(result.projects)).toBe(true);
  });

  it("yield first - yield* operation captures services and returns requirement-free function", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        // yield* the operation itself (not calling it) to capture Credentials + HttpClient
        const list = yield* listProjects;

        // The returned function has Effect<..., ..., never> — no requirements
        const projects = yield* list({});
        return projects;
      }),
    );
    expect(result).toBeDefined();
    expect(Array.isArray(result.projects)).toBe(true);
  });

  it("yield first function works without service context", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        // Capture services into a requirement-free function
        const list = yield* listProjects;

        // Run the requirement-free function with an empty layer —
        // proves the returned function truly has no requirements
        const projects = yield* list({}).pipe(Effect.provide(Layer.empty));
        return projects;
      }),
    );
    expect(result).toBeDefined();
    expect(Array.isArray(result.projects)).toBe(true);
  });
});
