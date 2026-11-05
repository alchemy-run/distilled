import { createHash, createPrivateKey, createPublicKey, randomBytes, verify } from "node:crypto";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import * as SigV4 from "../src/index.ts";
import { N, p1363ToDer, pkcs8, publicPoint, toBigInt } from "../src/p256.ts";

// The aws-c-auth / aws-sdk SigV4A test-suite credentials ("get-vanilla").
const accessKeyId = "AKIDEXAMPLE";
const secretAccessKey = Redacted.make("wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY");

const hexToB64Url = (h: string) => Buffer.from(h, "hex").toString("base64url");

const canonicalOf = (signed: SigV4.SignedRequest, body: string) => {
  // Rebuild the string to sign from the signed request (non-S3: double-encoded path, no query).
  const auth = signed.headers.authorization!;
  const signedHeaders = /SignedHeaders=([^,]+)/.exec(auth)![1]!;
  const scope = /Credential=[^/]+\/([^,]+)/.exec(auth)![1]!;
  const url = new URL(signed.url);
  const canonicalHeaders = signedHeaders
    .split(";")
    .map((h) => `${h}:${h === "host" ? url.host : signed.headers[h]}`)
    .join("\n");
  const sha = (s: string) => createHash("sha256").update(s).digest("hex");
  const canonical = [
    signed.method,
    url.pathname,
    "",
    canonicalHeaders + "\n",
    signedHeaders,
    sha(body),
  ].join("\n");
  return ["AWS4-ECDSA-P256-SHA256", signed.headers["x-amz-date"], scope, sha(canonical)].join("\n");
};

describe("SigV4A", () => {
  // The platform derives the point from PKCS#8 (node:crypto, WebCrypto);
  // the JavaScript fallback must agree with both.
  test.each(["auto", "webcrypto", "javascript"] as const)(
    "derives the published aws-c-auth signing key (%s)",
    async (via) => {
      const key = await Effect.runPromise(
        SigV4.signingPublicKeyV4a(accessKeyId, secretAccessKey, via),
      );
      expect(key).toEqual({
        x: "b6618f6a65740a99e650b33b6b4b5bd0d43b176d721a3edfea7e7d2d56d936b1",
        y: "865ed22a7eadc9c5cb9d2cbaca1b3699139fedc5043dc6661864218330c8e518",
      });
    },
  );

  test("signs with a region set and a region-less scope, verifiable with the derived key", async () => {
    const body = JSON.stringify({ Entries: [] });
    const signed = await Effect.runPromise(
      SigV4.signV4a({
        method: "POST",
        url: "https://abcde.veo.endpoint.events.amazonaws.com/",
        headers: { "X-Amz-Target": "AWSEvents.PutEvents" },
        body,
        accessKeyId,
        secretAccessKey,
        service: "events",
        regionSet: ["*"],
        datetime: "20150830T123600Z",
      }),
    );
    expect(signed.headers["x-amz-region-set"]).toBe("*");
    expect(signed.headers.authorization).toMatch(
      /^AWS4-ECDSA-P256-SHA256 Credential=AKIDEXAMPLE\/20150830\/events\/aws4_request, SignedHeaders=host;x-amz-date;x-amz-region-set;x-amz-target, Signature=30[0-9a-f]+$/,
    );
    const { x, y } = await Effect.runPromise(
      SigV4.signingPublicKeyV4a(accessKeyId, secretAccessKey),
    );
    const publicKey = createPublicKey({
      key: { kty: "EC", crv: "P-256", x: hexToB64Url(x), y: hexToB64Url(y) },
      format: "jwk",
    });
    const signature = Buffer.from(
      /Signature=([0-9a-f]+)/.exec(signed.headers.authorization!)![1]!,
      "hex",
    );
    expect(
      verify(
        "sha256",
        Buffer.from(canonicalOf(signed, body)),
        { key: publicKey, dsaEncoding: "der" },
        signature,
      ),
    ).toBe(true);
  });

  test("the plucked noble point arithmetic agrees with node:crypto", () => {
    const random = Array.from({ length: 32 }, () => (toBigInt(randomBytes(32)) % (N - 1n)) + 1n);
    for (const d of [1n, 2n, 3n, N - 2n, N - 1n, ...random]) {
      const jwk = createPrivateKey({
        key: Buffer.from(pkcs8(d)),
        format: "der",
        type: "pkcs8",
      }).export({
        format: "jwk",
      });
      const { x, y } = publicPoint(d);
      expect([x, y]).toEqual([
        toBigInt(Buffer.from(jwk.x!, "base64url")),
        toBigInt(Buffer.from(jwk.y!, "base64url")),
      ]);
    }
  });

  test("encodes P1363 signatures as DER", () => {
    const raw = new Uint8Array(64);
    raw[0] = 0x80; // high bit set: needs a 0x00 pad
    raw[63] = 0x01; // leading zeros stripped
    expect(Buffer.from(p1363ToDer(raw)).toString("hex")).toBe(
      "3026022100" + "80" + "00".repeat(31) + "020101",
    );
  });
});
