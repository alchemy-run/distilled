/**
 * Legacy Signature Version 2 request signing, used by SimpleDB only. It is
 * reached through the `AwsAuthSigv2` trait, so programs that do not use
 * SimpleDB do not bundle it.
 */
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as HttpBody from "effect/http/HttpBody";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import type { Request } from "./client/request.ts";
import type { ResolvedCredentials } from "./credentials-service.ts";

/**
 * Legacy Signature Version 2 (SimpleDB is the sole remaining SigV2-only
 * service). The signature is an HMAC-SHA256 over the sorted,
 * RFC3986-encoded form parameters and travels IN the form-encoded body --
 * there is no Authorization header. The classic endpoint rejects SigV4
 * with `AuthFailure: access credentials are missing`.
 */
export const signV2 = (
  resolvedRequest: Request,
  endpoint: string,
  fullPath: string,
  credentials: ResolvedCredentials,
): Effect.Effect<HttpClientRequest.HttpClientRequest> => {
  const rfc3986 = (s: string) =>
    encodeURIComponent(s).replace(
      /[!'()*]/g,
      (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase(),
    );
  const pairs: Array<[string, string]> = [];
  const bodyStr = typeof resolvedRequest.body === "string" ? resolvedRequest.body : "";
  for (const part of bodyStr.split("&")) {
    if (!part) continue;
    const eq = part.indexOf("=");
    pairs.push([
      decodeURIComponent(eq === -1 ? part : part.slice(0, eq)),
      eq === -1 ? "" : decodeURIComponent(part.slice(eq + 1)),
    ]);
  }
  pairs.push(
    ["AWSAccessKeyId", Redacted.value(credentials.accessKeyId)],
    ["SignatureVersion", "2"],
    ["SignatureMethod", "HmacSHA256"],
    ["Timestamp", new Date().toISOString().replace(/\.\d{3}/, "")],
  );
  if (credentials.sessionToken) {
    pairs.push(["SecurityToken", Redacted.value(credentials.sessionToken)]);
  }
  const canonical = pairs
    .map(([k, v]) => [rfc3986(k), rfc3986(v)] as const)
    .sort(([a, av], [b, bv]) => (a < b ? -1 : a > b ? 1 : av < bv ? -1 : av > bv ? 1 : 0))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  const requestUrl = new URL(`${endpoint}${fullPath}`);
  const stringToSign = [
    resolvedRequest.method,
    requestUrl.host,
    requestUrl.pathname || "/",
    canonical,
  ].join("\n");
  return Effect.map(
    Effect.promise(async () => {
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(Redacted.value(credentials.secretAccessKey)),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      );
      return crypto.subtle.sign("HMAC", key, new TextEncoder().encode(stringToSign));
    }),
    (signatureBytes) => {
      const signature = Buffer.from(signatureBytes).toString("base64");
      const signedBody = `${canonical}&Signature=${rfc3986(signature)}`;
      const contentTypeV2 =
        resolvedRequest.headers["Content-Type"] ??
        resolvedRequest.headers["content-type"] ??
        "application/x-www-form-urlencoded";

      return pipe(
        HttpClientRequest.make(resolvedRequest.method as "GET" | "POST" | "PUT" | "DELETE")(
          requestUrl.toString(),
        ),
        HttpClientRequest.setHeaders(resolvedRequest.headers),
        HttpClientRequest.setBody(HttpBody.text(signedBody, contentTypeV2)),
      );
    },
  );
};
