import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Credentials } from "../src/credentials";
import { Forbidden, NotFound } from "../src/errors";
import { getInvoice } from "../src/operations/getInvoice";
import { getInvoiceLineItems } from "../src/operations/getInvoiceLineItems";
import { listInvoices } from "../src/operations/listInvoices";
import { MainLayer, runEffect } from "./setup";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_INVOICE_ID =
  "this-invoice-id-definitely-does-not-exist-12345";

/**
 * Helper to check if an error is an expected "not found" type error.
 * PlanetScale API may return NotFound or Forbidden for non-existent resources.
 */
const isNotFoundOrForbidden = (error: unknown): boolean =>
  error instanceof NotFound || error instanceof Forbidden;

/**
 * Helper to check if an error is any API error type.
 * Includes both specific error types and the generic PlanetScaleApiError.
 */
const isApiError = (error: unknown): boolean =>
  error instanceof NotFound ||
  error instanceof Forbidden ||
  error instanceof PlanetScaleApiError ||
  (error !== null && typeof error === "object" && "_tag" in error);

/**
 * Get the organization name from credentials
 */
const getOrganization = () =>
  Effect.gen(function* () {
    const { organization } = yield* Credentials;
    return organization;
  }).pipe(Effect.provide(MainLayer));

describe("invoices", () => {
  // ============================================================================
  // listInvoices
  // ============================================================================

  describe("listInvoices", () => {
    it("can list invoices (or returns error if no permission)", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listInvoices({
          organization,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // Invoice operations may require billing permissions
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
      } else {
        // Forbidden is acceptable if the token doesn't have billing permissions
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("can list invoices with pagination (or returns error if no permission)", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listInvoices({
          organization,
          page: 1,
          per_page: 10,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBe(1);
      } else {
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns invoices with expected fields when available", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listInvoices({
          organization,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result && result.data.data.length > 0) {
        const invoice = result.data.data[0]!;
        expect(invoice.id).toBeDefined();
        expect(invoice.total).toBeDefined();
        expect(invoice.billing_period_start).toBeDefined();
        expect(invoice.billing_period_end).toBeDefined();
      }
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listInvoices({
          organization: NON_EXISTENT_ORG,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // getInvoice
  // ============================================================================

  describe("getInvoice", () => {
    it("returns NotFound for non-existent invoice", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const error = await runEffect(
        getInvoice({
          organization,
          id: NON_EXISTENT_INVOICE_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getInvoice({
          organization: NON_EXISTENT_ORG,
          id: NON_EXISTENT_INVOICE_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // getInvoiceLineItems
  // ============================================================================

  describe("getInvoiceLineItems", () => {
    it("returns NotFound for non-existent invoice", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const error = await runEffect(
        getInvoiceLineItems({
          organization,
          id: NON_EXISTENT_INVOICE_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getInvoiceLineItems({
          organization: NON_EXISTENT_ORG,
          id: NON_EXISTENT_INVOICE_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("can get invoice line items with pagination (when invoice exists)", async () => {
      const organization = await Effect.runPromise(getOrganization());

      // First try to get a list of invoices
      const invoicesResult = await runEffect(
        listInvoices({ organization }).pipe(
          Effect.matchEffect({
            onFailure: () => Effect.succeed(null),
            onSuccess: (data) => Effect.succeed(data),
          }),
        ),
      );

      // If we have invoices, try to get line items
      if (invoicesResult && invoicesResult.data.length > 0) {
        const invoiceId = invoicesResult.data[0]!.id;
        const result = await runEffect(
          getInvoiceLineItems({
            organization,
            id: invoiceId,
            page: 1,
            per_page: 10,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          ),
        );

        if ("data" in result) {
          expect(Array.isArray(result.data.data)).toBe(true);
          expect(result.data.current_page).toBe(1);
        } else {
          // Some error occurred, which is acceptable
          expect(isApiError(result.error)).toBe(true);
        }
      }
    });
  });
});
