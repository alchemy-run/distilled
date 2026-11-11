# @distilled.cloud/aws4signer

Effect-native AWS Signature Version 4 (SigV4): an Effect port of
[aws4fetch](https://github.com/mhart/aws4fetch). Sign or presign one request,
or sign every request an Effect `HttpClient` sends.

Use it to call AWS or any SigV4 API (Cloudflare R2, MinIO, Backblaze B2,
API Gateway, Lambda function URLs, ...) without the full
`@distilled.cloud/aws` SDK. It signs byte for byte like aws4fetch; a test
signs the same requests with both and compares the results. Its only
dependencies are `@distilled.cloud/core` (for crypto) and `effect`.
`@distilled.cloud/aws` uses this package and re-exports it as
`@distilled.cloud/aws/SigV4`.

## Installation

```bash
npm install @distilled.cloud/aws4signer effect
```

## Sign every request: `AwsClient`

`@distilled.cloud/aws4signer/AwsClient` is aws4fetch's `AwsClient` as an
`HttpClient` transform.

```typescript
import * as AwsClient from "@distilled.cloud/aws4signer/AwsClient";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";

const credentials = {
  accessKeyId: process.env.R2_ACCESS_KEY_ID!,
  secretAccessKey: Redacted.make(process.env.R2_SECRET_ACCESS_KEY!),
};

const program = Effect.gen(function* () {
  // service "s3" and region "auto" come from the R2 host.
  const r2 = (yield* HttpClient.HttpClient).pipe(
    AwsClient.sign({ credentials }),
    HttpClient.retryTransient({ times: 3 }),
  );
  const res = yield* r2.get(`https://${accountId}.r2.cloudflarestorage.com/my-bucket/hello.txt`);
  return yield* res.text;
});

program.pipe(Effect.provide(FetchHttpClient.layer), Effect.runPromise);
```

- `AwsClient.make(options)` is the context's `HttpClient` with `sign(options)` applied.
- `AwsClient.signRequest(request, options)` signs one `HttpClientRequest`.
- `AwsClient.presign(url, { credentials, expiresIn })` returns a presigned URL.
- `credentials` can be an `Effect` that returns the keys. It runs once per
  request, so it can refresh temporary credentials.
- The signing time comes from the Effect `Clock`, so `TestClock` controls it.
- A stream or form-data body cannot be hashed. Set the `X-Amz-Content-Sha256`
  header (for example `UNSIGNED-PAYLOAD`), or the request fails with
  `UnsignableBody`. S3 signs `UNSIGNED-PAYLOAD` by default.

## Presign a URL

```typescript
import * as SigV4 from "@distilled.cloud/aws4signer";

const url = yield* SigV4.presign({
  method: "PUT",
  url: `https://${accountId}.r2.cloudflarestorage.com/uploads/avatar.png`,
  accessKeyId,
  secretAccessKey,
  expiresIn: 900,
});
```

## Sign one request

```typescript
const signed = yield* SigV4.sign({
  method: "GET",
  url: `https://${accountId}.r2.cloudflarestorage.com/${bucket}/${key}`,
  accessKeyId,
  secretAccessKey,
  service: "s3",
  region: "auto",
});
const response = yield* Effect.promise(() =>
  fetch(signed.url, { method: signed.method, headers: signed.headers }),
);
```

`sign` needs `service` and `region`. `SigV4.guessScope(options)` fills them
from the host the way aws4fetch does (`*.amazonaws.com`, R2, B2, Lambda
function URLs). `presign` and `AwsClient` guess on their own. The guessing
lives outside `sign`, so a program that always passes both (the AWS SDK) does
not bundle the host rules.

Options that match aws4fetch: `signQuery`, `allHeaders`,
`appendSessionToken`, `singleEncode`, `datetime`. `hashPayload` also sends
the body hash as `X-Amz-Content-Sha256`.

## Errors

`sign` fails with a typed `SigningError`: `InvalidSigningUrl`,
`InvalidSigningHeaders`, or `CryptoError`. `AwsClient` can also fail with
`UnsignableBody`.
