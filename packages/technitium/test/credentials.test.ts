// The hand-written credentials: where the token and the server address come from.
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Redacted from "effect/Redacted";
import { describe, expect, it } from "vitest";
import { Credentials, CredentialsFromEnv, normalizeApiUrl } from "../src/credentials.ts";

const fromEnv = (env: Record<string, string>) =>
  Effect.runPromiseExit(
    Effect.flatMap(Credentials, (resolve) => resolve).pipe(
      Effect.map(({ apiToken, apiUrl }) => ({ token: Redacted.value(apiToken), apiUrl })),
      Effect.provide(CredentialsFromEnv),
      Effect.provideService(ConfigProvider.ConfigProvider, ConfigProvider.fromEnv({ env })),
    ),
  );

describe("normalizeApiUrl", () => {
  const normalize = (url: string) => Effect.runSync(Effect.exit(normalizeApiUrl(url)));

  it("returns the origin of an HTTPS address", () => {
    expect(normalize("https://dns.example.com:53443/")).toEqual(
      Exit.succeed("https://dns.example.com:53443"),
    );
  });

  it("accepts plain HTTP on loopback only", () => {
    expect(normalize("http://127.0.0.1:5380")).toEqual(Exit.succeed("http://127.0.0.1:5380"));
    expect(normalize("http://[::1]:5380")).toEqual(Exit.succeed("http://[::1]:5380"));
    expect(Exit.isFailure(normalize("http://192.168.10.5:5380"))).toBe(true);
  });

  it("rejects paths, queries and credentials in the address", () => {
    for (const url of [
      "https://dns.example.com/api",
      "https://dns.example.com/?token=x",
      "https://user:pass@dns.example.com",
      "dns.example.com",
    ])
      expect(Exit.isFailure(normalize(url))).toBe(true);
  });
});

describe("CredentialsFromEnv", () => {
  it("reads the token and the address", async () => {
    expect(
      await fromEnv({
        TECHNITIUM_API_TOKEN: "t0ken",
        TECHNITIUM_API_URL: "https://dns.example.com:53443/",
      }),
    ).toEqual(Exit.succeed({ token: "t0ken", apiUrl: "https://dns.example.com:53443" }));
  });

  it("requires both variables and an HTTPS address", async () => {
    expect(Exit.isFailure(await fromEnv({ TECHNITIUM_API_TOKEN: "t0ken" }))).toBe(true);
    expect(
      Exit.isFailure(
        await fromEnv({
          TECHNITIUM_API_TOKEN: "t0ken",
          TECHNITIUM_API_URL: "http://dns.example.com:5380",
        }),
      ),
    ).toBe(true);
  });
});
