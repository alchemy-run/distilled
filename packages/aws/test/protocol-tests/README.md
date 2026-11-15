# Smithy AWS protocol tests

The AWS runtime's wire protocols (`awsJson1_0`, `awsJson1_1`, `awsQuery`, `ec2Query`, `restJson1` in `packages/aws/src/protocols/`, and `restXml` in `packages/s3/src/protocols/`) are checked against the official Smithy protocol tests, [`smithy-aws-protocol-tests`](https://github.com/smithy-lang/smithy/tree/main/smithy-aws-protocol-tests) @ 1.75.0.

`protocol-tests.test.ts` runs them with the rest of the tests (`pnpm vitest run`):

1. It generates each test service from `model.json` with the AWS generator (`scripts/spec.ts`), the same way `pnpm generate aws` does, into the gitignored `.generated/`.
2. It replays each `httpRequestTests` case: it calls the operation with the case's params through a fake `HttpClient` and compares the request it sends.
3. It replays each `httpResponseTests` case: the fake `HttpClient` returns the case's response, and the test compares what the operation returns, or the typed error it fails with.

Cases that apply only to servers are skipped. `rpcv2Cbor` is not run: the runtime has no CBOR protocol.

## Expected failures

`failures.txt` lists the cases the runtime fails today, grouped by cause. The test fails on a failing case missing from the list, and on a listed case that passes, so a fix has to delete its lines.

## Updating

`model.json` is the protocol tests' Smithy model as JSON, with mixins flattened. The generator reads only JSON, and Smithy publishes the tests as `.smithy` files, so `update.sh` converts them with the Smithy CLI. It needs `curl` and `unzip`; the CLI brings its own Java runtime.

```sh
packages/aws/test/protocol-tests/update.sh
```

To move to a new release, change `SMITHY_VERSION` in `update.sh` and the artifact version in `smithy-build.json`, run it, then update `failures.txt` from the test's output.
