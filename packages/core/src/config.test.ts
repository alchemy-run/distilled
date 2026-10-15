import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import * as Config from "./config.ts";

const withEnv = (env: Record<string, string>) =>
  Effect.provideService(ConfigProvider.ConfigProvider, ConfigProvider.fromEnv({ env }));

describe("core/config", () => {
  test("reads from a provided ConfigProvider", async () => {
    const program = Config.all({
      token: Config.Redacted("TOKEN"),
      url: Config.String("URL").pipe(Config.withDefault("https://default")),
      region: Config.String("A").pipe(Config.orElse(() => Config.String("B"))),
      project: Config.option(Config.String("PROJECT")),
    });
    const out = await Effect.runPromise(program.pipe(withEnv({ TOKEN: "t", B: "eu" })));
    expect(Redacted.value(out.token)).toBe("t");
    expect(out.url).toBe("https://default");
    expect(out.region).toBe("eu");
    expect(Option.isNone(out.project)).toBe(true);
  });

  test("a missing required value fails with tag ConfigError", async () => {
    const exit = await Effect.runPromise(
      Effect.result(Config.String("NOPE_NOT_SET").pipe(withEnv({}))),
    );
    expect(exit._tag).toBe("Failure");
  });

  test("falls back to process.env without a provider", async () => {
    process.env.DISTILLED_CONFIG_TEST = "yes";
    expect(await Effect.runPromise(Config.String("DISTILLED_CONFIG_TEST"))).toBe("yes");
  });
});
