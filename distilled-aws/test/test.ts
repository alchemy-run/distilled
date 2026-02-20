import { NodeServices } from "@effect/platform-node";
import {
  afterAll as _afterAll,
  beforeAll as _beforeAll,
  it,
  type TestContext,
} from "@effect/vitest";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Logger from "effect/Logger";
import * as Path from "effect/Path";
import { MinimumLogLevel } from "effect/References";
import * as Scope from "effect/Scope";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as Credentials from "../src/credentials.ts";
import { Endpoint } from "../src/endpoint.ts";
import { Region } from "../src/region.ts";
import * as Retry from "../src/retry.ts";

type Provided =
  | Scope.Scope
  | HttpClient.HttpClient
  | FileSystem.FileSystem
  | Path.Path
  | Region
  | Credentials.Credentials;

const platform = Layer.mergeAll(
  NodeServices.layer,
  FetchHttpClient.layer,
  Logger.layer([Logger.consolePretty()]),
);

type TestCase =
  | Effect.Effect<void, any, Provided>
  | ((ctx: TestContext) => Effect.Effect<void, any, Provided>);

export function test(
  name: string,
  options: { timeout?: number },
  testCase: TestCase,
): void;

export function test(name: string, testCase: TestCase): void;

export function test(
  name: string,
  ...args: [{ timeout?: number }, TestCase] | [TestCase]
) {
  const [options = {}, testCase] =
    args.length === 1 ? [undefined, args[0]] : args;

  return it.live(
    name,
    (ctx) => {
      const effect = typeof testCase === "function" ? testCase(ctx) : testCase;
      return provideTestEnv(
        Effect.gen(function* () {
          const fs = yield* FileSystem.FileSystem;
          if (yield* fs.exists(".env")) {
            const configProvider = ConfigProvider.orElse(
              yield* ConfigProvider.fromDotEnv({ path: ".env" }),
              ConfigProvider.fromEnv(),
            );
            return yield* effect.pipe(
              Effect.provideService(
                ConfigProvider.ConfigProvider,
                configProvider,
              ),
            );
          } else {
            return yield* effect.pipe(
              Effect.provideService(
                ConfigProvider.ConfigProvider,
                ConfigProvider.fromEnv(),
              ),
            );
          }
        }),
      );
    },
    options.timeout ?? 120_000,
  );
}

test.skip = function (
  name: string,
  ...args: [{ timeout?: number }, TestCase] | [TestCase]
) {
  const [options = {}] = args.length === 1 ? [undefined] : args;
  return it.skip(name, () => {}, options.timeout ?? 120_000);
};

/** Run an Effect for use in beforeAll/beforeEach hooks */
export async function run<E>(
  effect: Effect.Effect<void, E, Provided>,
): Promise<void> {
  await Effect.runPromise(provideTestEnv(Effect.scoped(effect)));
}

export const beforeAll = (
  effect: Effect.Effect<void, any, Provided>,
  timeout?: number,
) => _beforeAll(() => run(effect), timeout ?? 120_000);

export const afterAll = (
  effect: Effect.Effect<void, any, Provided>,
  timeout?: number,
) => _afterAll(() => run(effect), timeout ?? 120_000);

/** Provide common layers and services to an effect */
function provideTestEnv<A, E, R extends Provided>(
  effect: Effect.Effect<A, E, R>,
) {
  let eff = effect.pipe(
    Effect.provide(platform),
    Effect.provideService(Region, "us-east-1"),
    Effect.provideService(
      MinimumLogLevel,
      process.env.DEBUG ? "Debug" : "Info",
    ),
    Effect.provide(NodeServices.layer),
    Retry.transient,
  );

  if (process.env.LOCAL) {
    return eff.pipe(
      Effect.provideService(
        Endpoint,
        process.env.LOCALSTACK_HOST ?? "http://localhost:4566",
      ),
      Effect.provide(Credentials.mock),
    );
  } else {
    return eff.pipe(Effect.provide(Credentials.fromChain()));
  }
}

/**
 * Effect-native file snapshot helper.
 * Writes JSON snapshots to __snapshots__/{suite}/{testname}.json.
 * If filename is not provided, derives it from the describe block and test name.
 */
export const expectSnapshot = (
  ctx: TestContext,
  value: unknown,
  filename?: string,
): Effect.Effect<void> => {
  const sanitize = (s: string) =>
    s
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  // Get the suite (describe block) name if available
  const suite = ctx.task.suite?.name ? sanitize(ctx.task.suite.name) : null;
  const testName = sanitize(ctx.task.name);

  const path =
    filename ?? (suite ? `${suite}/${testName}.json` : `${testName}.json`);

  return Effect.promise(() =>
    ctx
      .expect(JSON.stringify(value, null, 2))
      .toMatchFileSnapshot(`__snapshots__/${path}`),
  );
};
