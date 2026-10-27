import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import { afterEach, expect, it, vi } from "vitest";
import { waitForTask } from "../src/tasks.ts";
import { mockLayer } from "./helpers.ts";

afterEach(() => vi.useRealTimers());
it.each([
  ["OK", 0],
  ["WARNINGS: 3", 3],
] as const)("accepts stopped task %s", async (exitstatus, warnings) => {
  const result = await Effect.runPromise(
    waitForTask("test", "UPID:test:task").pipe(
      Effect.provide(
        mockLayer((request) => {
          expect(request.method).toBe("GET");
          expect(request.url).toContain("UPID%3Atest%3Atask/status");
          return { body: { data: { status: "stopped", exitstatus } } };
        }),
      ),
    ),
  );
  expect(result.warnings).toBe(warnings);
});
it("fails stopped tasks with an error exit status", async () => {
  const error = await Effect.runPromise(
    waitForTask("test", "task").pipe(
      Effect.flip,
      Effect.provide(
        mockLayer(() => ({ body: { data: { status: "stopped", exitstatus: "disk failure" } } })),
      ),
    ),
  );
  expect(error).toMatchObject({ _tag: "TaskFailed", message: "disk failure" });
});
it("polls with backoff until completion", async () => {
  vi.useFakeTimers();
  let polls = 0;
  const result = Effect.runPromise(
    waitForTask("test", "task").pipe(
      Effect.provide(
        mockLayer(() => ({
          body: {
            data: ++polls === 3 ? { status: "stopped", exitstatus: "OK" } : { status: "running" },
          },
        })),
      ),
    ),
  );
  await vi.advanceTimersByTimeAsync(2000);
  expect((await result).warnings).toBe(0);
  expect(polls).toBe(3);
});
it("times out even when an HTTP request never completes", async () => {
  vi.useFakeTimers();
  const result = Effect.runPromise(
    waitForTask("test", "task").pipe(
      Effect.provideService(
        HttpClient.HttpClient,
        HttpClient.make(() => Effect.never),
      ),
      Effect.flip,
      Effect.provide(mockLayer(() => ({ body: { data: {} } }))),
    ),
  );
  await vi.advanceTimersByTimeAsync(120001);
  expect(await result).toMatchObject({ _tag: "TaskTimeout" });
});
it("bounds pending polling by the configured timeout", async () => {
  vi.useFakeTimers();
  let polls = 0;
  let settled = false;
  const result = Effect.runPromise(
    waitForTask("test", "task", { timeout: "10 minutes" }).pipe(
      Effect.flip,
      Effect.provide(
        mockLayer(() => {
          polls++;
          return { body: { data: { status: "running" } } };
        }),
      ),
    ),
  ).finally(() => {
    settled = true;
  });
  await vi.advanceTimersByTimeAsync(599_000);
  expect(settled).toBe(false);
  await vi.advanceTimersByTimeAsync(1001);
  expect(await result).toMatchObject({ _tag: "TaskTimeout" });
  // One immediate poll, six growing delays within about 10s, then one poll every 5s.
  expect(polls).toBe(124);
});
