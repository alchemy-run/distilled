import { describe, expect, test } from "bun:test";
import { buildRequest, mapKeys } from "@distilled.cloud/core/protocol-http";
import {
  CreateSubscriptionRequest,
  GetSubscriptionResponse,
} from "./services/queues.ts";

/**
 * An `email.sending` subscription source names its sending domain by
 * `zone_id` and `domain`; both survive encoding the create request and
 * decoding a read, instead of being dropped as an unknown union case.
 */
describe("email.sending subscription source", () => {
  test("the create request sends zone_id and domain", () => {
    const request = buildRequest({
      input: {
        accountId: "account",
        name: "mail-events",
        enabled: true,
        events: ["message.bounced"],
        destination: { type: "queues.queue", queueId: "queue" },
        source: {
          type: "email.sending",
          zoneId: "zone",
          domain: "mail.example.com",
        },
      },
      inputAst: CreateSubscriptionRequest.ast,
      baseUrl: "https://api.cloudflare.com/client/v4",
    });
    const body = JSON.parse(String((request.body as { body: string }).body));
    expect(body.source).toEqual({
      type: "email.sending",
      zone_id: "zone",
      domain: "mail.example.com",
    });
  });

  test("a read keeps zoneId and domain", () => {
    const source = mapKeys(
      GetSubscriptionResponse.ast,
      {
        source: {
          type: "email.sending",
          zone_id: "zone",
          domain: "mail.example.com",
        },
      },
      "decode",
    ) as { source: unknown };
    expect(source.source).toEqual({
      type: "email.sending",
      zoneId: "zone",
      domain: "mail.example.com",
    });
  });
});
