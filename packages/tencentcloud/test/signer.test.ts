import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { sign, utcDate } from "../src/signer.ts";

// The worked example of https://www.tencentcloud.com/document/api/213/33224
// ("Signature v3"): DescribeInstances in ap-guangzhou, signed with the
// documented placeholder key pair, which is literally asterisks.
const example = {
  secretId: "AKID********************************",
  secretKey: Redacted.make("********************************"),
  service: "cvm",
  host: "cvm.tencentcloudapi.com",
  action: "DescribeInstances",
  timestamp: 1551113065,
  contentType: "application/json; charset=utf-8",
  payload: '{"Limit": 1, "Filters": [{"Values": ["unnamed"], "Name": "instance-name"}]}',
  signedHeaders: ["content-type", "host"],
} as const;

describe("TC3-HMAC-SHA256", () => {
  test("reproduces the documented example", async () => {
    const signed = await Effect.runPromise(sign(example));
    expect(signed.canonicalRequest).toBe(
      [
        "POST",
        "/",
        "",
        "content-type:application/json; charset=utf-8",
        "host:cvm.tencentcloudapi.com",
        "",
        "content-type;host",
        "99d58dfbc6745f6747f36bfca17dee5e6881dc0428a0a36f96199342bc5b4907",
      ].join("\n"),
    );
    expect(signed.stringToSign).toBe(
      [
        "TC3-HMAC-SHA256",
        "1551113065",
        "2019-02-25/cvm/tc3_request",
        "2815843035062fffda5fd6f2a44ea8a34818b0dc46f024b8b3786976a3adda7a",
      ].join("\n"),
    );
    expect(signed.signature).toBe(
      "a7b8551448762bd123d6f79e81815e31a92013640a6cef36a08ad4b292a4d2f2",
    );
    expect(signed.authorization).toBe(
      "TC3-HMAC-SHA256 Credential=AKID********************************/2019-02-25/cvm/tc3_request, SignedHeaders=content-type;host, Signature=a7b8551448762bd123d6f79e81815e31a92013640a6cef36a08ad4b292a4d2f2",
    );
  });

  test("dates the scope in UTC", () => {
    // 2019-02-26 00:44:25 in UTC+8, the documented midnight pitfall.
    expect(utcDate(1551113065)).toBe("2019-02-25");
  });

  test("signs the lowercased action by default, headers sorted", async () => {
    const { signedHeaders: _, ...input } = example;
    const signed = await Effect.runPromise(sign(input));
    expect(signed.canonicalRequest.split("\n").slice(3, 7)).toEqual([
      "content-type:application/json; charset=utf-8",
      "host:cvm.tencentcloudapi.com",
      "x-tc-action:describeinstances",
      "",
    ]);
    expect(signed.authorization).toContain("SignedHeaders=content-type;host;x-tc-action,");
    expect(signed.signature).not.toBe(
      "a7b8551448762bd123d6f79e81815e31a92013640a6cef36a08ad4b292a4d2f2",
    );
  });
});
