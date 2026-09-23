import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { credentials } from "./credentials.ts";
import * as Retry from "./retry.ts";
import { deleteRecord, getRecord, RecordNotFound } from "./services/dns.ts";

// Recorded API error: https://github.com/cloudflare/terraform-provider-cloudflare/issues/1621
describe("DNS missing record errors", () => {
  for (const operation of [getRecord, deleteRecord]) {
    for (const code of [81044, 10000]) {
      test(`${operation === getRecord ? "getRecord" : "deleteRecord"} only specializes code 81044 (received ${code})`, async () => {
        const message =
          code === 81044 ? "Record does not exist." : "Authentication error";
        const error = await Effect.runPromise(
          operation({
            zoneId: "test-zone",
            dnsRecordId: "missing-record",
          }).pipe(
            Retry.none,
            Effect.provide(
              Layer.mergeAll(
                credentials({ apiToken: "test-token" }),
                Layer.succeed(
                  HttpClient.HttpClient,
                  HttpClient.make((request) =>
                    Effect.succeed(
                      HttpClientResponse.fromWeb(
                        request,
                        Response.json(
                          {
                            result: null,
                            success: false,
                            errors: [{ code, message }],
                            messages: [],
                          },
                          { status: 404 },
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            Effect.flip,
          ),
        );
        if (code === 81044) {
          expect(error).toBeInstanceOf(RecordNotFound);
          expect(error).toMatchObject({
            _tag: "RecordNotFound",
            code,
            message,
          });
        } else {
          // An unrelated error must not become a successful idempotent delete.
          expect(error).not.toBeInstanceOf(RecordNotFound);
        }
      });
    }
  }
});
