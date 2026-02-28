import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as Hyperdrive from "~/services/hyperdrive.ts";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic config name for tests.
 * Follows the convention: distilled-cf-hyperdrive-{testname}
 */
const configName = (name: string) => `distilled-cf-hyperdrive-${name}`;

/**
 * Valid origin configuration using localhost — Cloudflare rejects private/
 * non-routable addresses with PrivateHostNotAllowed (code 2009).
 */
const dummyOrigin = {
  database: "testdb",
  host: "localhost",
  password: "testpassword",
  port: 5432,
  scheme: "postgres" as const,
  user: "testuser",
};

// ============================================================================
// Hyperdrive Tests
// ============================================================================

describe("Hyperdrive", () => {
  // --------------------------------------------------------------------------
  // createConfig
  // --------------------------------------------------------------------------
  describe("createConfig", () => {
    test("error - PrivateHostNotAllowed for localhost origin", () =>
      Hyperdrive.createConfig({
        accountId: accountId(),
        name: configName("create-happy"),
        origin: dummyOrigin,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PrivateHostNotAllowed")),
      ));

    test("error - PrivateHostNotAllowed for localhost origin with caching disabled", () =>
      Hyperdrive.createConfig({
        accountId: accountId(),
        name: configName("create-cache-off"),
        origin: dummyOrigin,
        caching: { disabled: true },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PrivateHostNotAllowed")),
      ));

    test("error - PrivateHostNotAllowed for localhost origin with caching options", () =>
      Hyperdrive.createConfig({
        accountId: accountId(),
        name: configName("create-cache-opts"),
        origin: dummyOrigin,
        caching: {
          disabled: false,
          maxAge: 300,
          staleWhileRevalidate: 60,
        },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PrivateHostNotAllowed")),
      ));

    test("error - PrivateHostNotAllowed for localhost origin with mysql scheme", () =>
      Hyperdrive.createConfig({
        accountId: accountId(),
        name: configName("create-mysql"),
        origin: {
          database: "testdb",
          host: "localhost",
          password: "testpassword",
          port: 3306,
          scheme: "mysql" as const,
          user: "testuser",
        },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PrivateHostNotAllowed")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      Hyperdrive.createConfig({
        accountId: "invalid-account-id-000",
        name: configName("create-invalid-account"),
        origin: dummyOrigin,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - InvalidHyperdriveConfig for empty name", () =>
      Hyperdrive.createConfig({
        accountId: accountId(),
        name: "",
        origin: dummyOrigin,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidHyperdriveConfig")),
      ));

    test("error - InvalidHyperdriveConfig for missing origin fields", () =>
      Hyperdrive.createConfig({
        accountId: accountId(),
        name: configName("create-bad-origin"),
        origin: {
          database: "",
          host: "",
          password: "",
          port: 0,
          scheme: "postgres" as const,
          user: "",
        },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidHyperdriveConfig")),
      ));
  });

  // --------------------------------------------------------------------------
  // getConfig
  // --------------------------------------------------------------------------
  describe("getConfig", () => {
    test("error - HyperdriveConfigNotFound for non-existent hyperdriveId", () =>
      Hyperdrive.getConfig({
        accountId: accountId(),
        hyperdriveId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("HyperdriveConfigNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      Hyperdrive.getConfig({
        accountId: "invalid-account-id-000",
        hyperdriveId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - CloudflareHttpError for empty hyperdriveId", () =>
      Hyperdrive.getConfig({
        accountId: accountId(),
        hyperdriveId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));
  });

  // --------------------------------------------------------------------------
  // listConfigs
  // --------------------------------------------------------------------------
  describe("listConfigs", () => {
    test("happy path - lists all configs in account", () =>
      Effect.gen(function* () {
        const result = yield* Hyperdrive.listConfigs({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        // The result could be an array or a wrapper with a result property
        const configs = Array.isArray(result)
          ? result
          : ((result as any)?.result ?? []);
        expect(Array.isArray(configs)).toBe(true);
      }));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      Hyperdrive.listConfigs({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // updateConfig
  // --------------------------------------------------------------------------
  describe("updateConfig", () => {
    test("error - HyperdriveConfigNotFound for non-existent hyperdriveId", () =>
      Hyperdrive.updateConfig({
        accountId: accountId(),
        hyperdriveId: "00000000000000000000000000000000",
        name: configName("update-nonexistent"),
        origin: dummyOrigin,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("HyperdriveConfigNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      Hyperdrive.updateConfig({
        accountId: "invalid-account-id-000",
        hyperdriveId: "00000000000000000000000000000000",
        name: configName("update-invalid-account"),
        origin: dummyOrigin,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - MethodNotAllowed for empty hyperdriveId", () =>
      Hyperdrive.updateConfig({
        accountId: accountId(),
        hyperdriveId: "",
        name: configName("update-empty-id"),
        origin: dummyOrigin,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("MethodNotAllowed")),
      ));
  });

  // --------------------------------------------------------------------------
  // patchConfig
  // --------------------------------------------------------------------------
  describe("patchConfig", () => {
    test("error - HyperdriveConfigNotFound for non-existent hyperdriveId", () =>
      Hyperdrive.patchConfig({
        accountId: accountId(),
        hyperdriveId: "00000000000000000000000000000000",
        name: configName("patch-nonexistent"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("HyperdriveConfigNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      Hyperdrive.patchConfig({
        accountId: "invalid-account-id-000",
        hyperdriveId: "00000000000000000000000000000000",
        name: configName("patch-invalid-account"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - MethodNotAllowed for empty hyperdriveId", () =>
      Hyperdrive.patchConfig({
        accountId: accountId(),
        hyperdriveId: "",
        name: configName("patch-empty-id"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("MethodNotAllowed")),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteConfig
  // --------------------------------------------------------------------------
  describe("deleteConfig", () => {
    test("error - HyperdriveConfigNotFound for non-existent hyperdriveId", () =>
      Hyperdrive.deleteConfig({
        accountId: accountId(),
        hyperdriveId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("HyperdriveConfigNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      Hyperdrive.deleteConfig({
        accountId: "invalid-account-id-000",
        hyperdriveId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - MethodNotAllowed for empty hyperdriveId", () =>
      Hyperdrive.deleteConfig({
        accountId: accountId(),
        hyperdriveId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("MethodNotAllowed")),
      ));
  });
});
