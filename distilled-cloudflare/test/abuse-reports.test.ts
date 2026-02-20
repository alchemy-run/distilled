import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as AbuseReports from "~/services/abuse-reports.ts";

const accountId = () => getAccountId();

// ============================================================================
// AbuseReports Tests
// ============================================================================

describe("AbuseReports", () => {
  // --------------------------------------------------------------------------
  // listAbuseReports
  // --------------------------------------------------------------------------
  describe("listAbuseReports", () => {
    test("happy path - lists abuse reports for account", () =>
      Effect.gen(function* () {
        const result = yield* AbuseReports.listAbuseReports({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        // reports is null when no reports exist, or an array of report objects
        if (result.reports !== null) {
          expect(Array.isArray(result.reports)).toBe(true);
        }
      }));

    test("error - InvalidAccountId for invalid accountId", () =>
      AbuseReports.listAbuseReports({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));
  });

  // --------------------------------------------------------------------------
  // getAbuseReport
  // --------------------------------------------------------------------------
  describe("getAbuseReport", () => {
    // -- Error: not found for non-existent report --
    test("error - AbuseReportNotFound for non-existent reportParam", () =>
      AbuseReports.getAbuseReport({
        reportParam: "distilled-cf-abuse-reports-nonexistent-xyz-000",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("AbuseReportNotFound")),
      ));

    // -- Error: invalid accountId --
    test("error - InvalidAccountId for invalid accountId", () =>
      AbuseReports.getAbuseReport({
        reportParam: "distilled-cf-abuse-reports-bad-acct",
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    // -- Error: empty reportParam --
    test("error - empty reportParam string", () =>
      AbuseReports.getAbuseReport({
        reportParam: "",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        // Empty reportParam returns 200 with null reports, which causes schema decode error
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    // -- Error: empty accountId --
    test("error - InvalidAccountId for empty accountId", () =>
      AbuseReports.getAbuseReport({
        reportParam: "distilled-cf-abuse-reports-empty-acct",
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));
  });

  // --------------------------------------------------------------------------
  // createAbuseReport
  // --------------------------------------------------------------------------
  describe("createAbuseReport", () => {
    // NOTE: We cannot create a real abuse report in tests since it submits
    // an actual DMCA/abuse report to Cloudflare. Instead we test error cases.

    test("error - InvalidRequest for invalid accountId", () =>
      AbuseReports.createAbuseReport({
        reportParam: "distilled-cf-abuse-reports-create-bad-acct",
        accountId: "invalid-account-id-000",
        act: "abuse_dmca",
        address1: "123 Test St",
        agentName: "Test Agent",
        agree: "1",
        city: "Test City",
        country: "US",
        email: "test@example.com",
        email2: "test@example.com",
        hostNotification: "send",
        name: "Test User",
        originalWork: "Test Work",
        ownerNotification: "send",
        signature: "Test User",
        state: "CA",
        urls: "https://example.com",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ));
  });
});
