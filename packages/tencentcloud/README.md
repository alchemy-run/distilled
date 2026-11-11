# @distilled.cloud/tencentcloud

Effect-native Tencent Cloud API 3.0 SDK, generated from the API models Tencent
ships in its own CLI,
[TencentCloud/tencentcloud-cli](https://github.com/TencentCloud/tencentcloud-cli)
(`tccli/services/<product>/<version>/api.json`). It covers every product the
CLI covers (263 products, 15,381 operations): CVM, VPC, CBS, CLB, TKE, CDN,
SSL, DNSPod, CAM, SCF, TencentDB, Lighthouse, Auto Scaling, CLS, Monitor and
the rest.

## Installation

```bash
npm install @distilled.cloud/tencentcloud effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as TencentCloud from "@distilled.cloud/tencentcloud";

const program = Effect.gen(function* () {
  const { Vpc } = yield* TencentCloud.vpc.createVpc({
    VpcName: "distilled-demo",
    CidrBlock: "10.0.0.0/16",
  });

  const { TotalCount } = yield* TencentCloud.cvm.describeInstances({
    Filters: [{ Name: "vpc-id", Values: [Vpc!.VpcId!] }],
    Limit: 20,
  });

  yield* TencentCloud.vpc.deleteVpc({ VpcId: Vpc!.VpcId! });
  return TotalCount;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  TencentCloud.CredentialsFromEnv,
  TencentCloud.Region.of("ap-guangzhou"),
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

Each product is a namespace on the root (`TencentCloud.cvm`,
`TencentCloud.autoscaling`) and its own entry point
(`@distilled.cloud/tencentcloud/cvm`). Operations and members keep Tencent's
names: `describeInstances` is the `DescribeInstances` action, and its input
members are `InstanceIds`, `Filters`, `Limit`.

## Auth

Every call is `POST https://<service>.tencentcloudapi.com/` with a JSON body,
signed with TC3-HMAC-SHA256.

`CredentialsFromEnv` reads the variables Tencent's CLI and SDKs read:

| Variable | |
| --- | --- |
| `TENCENTCLOUD_SECRET_ID` | API key SecretId (required) |
| `TENCENTCLOUD_SECRET_KEY` | API key SecretKey (required) |
| `TENCENTCLOUD_SESSION_TOKEN` | session token of temporary credentials, sent as `X-TC-Token` |
| `TENCENTCLOUD_REGION` | default region |

Or pass them yourself:

```ts
import * as Redacted from "effect/Redacted";

TencentCloud.credentials({
  secretId: "AKID...",
  secretKey: Redacted.make(process.env.MY_SECRET_KEY!),
  region: "ap-singapore",
});
```

## Regions

A call goes to the first region it finds (`X-TC-Region`):

1. the call's own `region` member: `cvm.describeInstances({ region: "ap-beijing" })`
2. the `Region` layer: `Effect.provide(TencentCloud.Region.of("ap-shanghai"))`
3. the credentials' `region` (`TENCENTCLOUD_REGION`)

With none, the request has no region header. Products that are not regional
(CAM, DNSPod, SSL, Tag, ...) expect that.

## Errors

A failed call answers `{ Response: { Error: { Code, Message }, RequestId } }`.
The [common error codes](https://www.tencentcloud.com/document/api/213/33281)
each have a class, matched on the code's first segment, with the full code
kept: `ResourceNotFound.InstanceNotExist` fails with `ResourceNotFound`
(`code: "ResourceNotFound.InstanceNotExist"`). `RequestLimitExceeded` and
`InternalError` are retried by the default policy. A product's own code
(`InvalidInstanceId.NotFound`) is an `UnknownTencentCloudError` with `code`.

```ts
TencentCloud.cvm.describeInstances({ InstanceIds: ["ins-xxxxxxxx"] }).pipe(
  Effect.catchTag("ResourceNotFound", (e) => Effect.succeed(e.code)),
);
```

## Not covered

- Member and operation docs: Tencent writes them in Chinese only, and the
  generated source stays Latin-1, so they are left out. See the product's
  page under https://www.tencentcloud.com/document/api.
- Pagination helpers: the models do not mark list operations; page with
  `Offset`/`Limit` (or the product's token member) yourself.
- `multipart/form-data` requests. The SDK sends JSON only. Two actions have
  a binary `File` member (`cii.describeQualityScore`,
  `cii.uploadMedicalFile`); it is typed as a string and sent in the JSON
  body, which is untested.
- COS (object storage) is not an API 3.0 product. Use
  [`@distilled.cloud/s3`](../s3) against `cos.<region>.myqcloud.com`.
