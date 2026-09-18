# Local integration fixture

The live test uses an isolated Celld v0.5.0 node and a disposable S3-compatible
store. It publishes the fixture with the existing AWS SDK, then exercises the
generated administrative and D1/KV/Queue operator APIs. It invokes neither
`celld deploy` nor Wrangler. Signing and publication code in this directory are
test fixtures, not part of the shipped SDK.

Run these commands from the repository root. They use ports 19000, 18080, and
18081; change them consistently if occupied. Use a fresh store for each run.
The credentials and peer key are fixed public test values. All host ports bind
only to loopback; never reuse this configuration for a real fleet.

```sh
docker network create distilled-celld-sdk-test
docker run -d --rm --name distilled-celld-sdk-store \
  --network distilled-celld-sdk-test -p 127.0.0.1:19000:9000 \
  -e MINIO_ROOT_USER=distilled-test \
  -e MINIO_ROOT_PASSWORD=distilled-test-secret \
  quay.io/minio/minio:RELEASE.2025-04-22T22-12-26Z server /data
curl --fail http://127.0.0.1:19000/minio/health/live
CELLD_TEST_STORAGE_URL=http://127.0.0.1:19000 \
  bun packages/celld/test/prepare-live.ts

docker run -d --rm --name distilled-celld-sdk-v050 \
  --network distilled-celld-sdk-test \
  -p 127.0.0.1:18080:8080 -p 127.0.0.1:18081:8081 \
  -e AWS_ACCESS_KEY_ID=distilled-test \
  -e AWS_SECRET_ACCESS_KEY=distilled-test-secret \
  -e CELLD_NODE=sdk-test-node -e CELLD_READY_FLEET_GATE_MS=0 \
  ghcr.io/denoland/celld@sha256:df8e74bb9a059df5779644368984933eba76acd6a2d196672732f4368f760fc8 \
  --bucket distilled-celld-sdk-test \
  --endpoint http://distilled-celld-sdk-store:9000 --region us-east-1 \
  --listen 0.0.0.0:8080 --internal-listen 0.0.0.0:8081 \
  --advertise distilled-celld-sdk-v050:8081
curl --fail http://127.0.0.1:18080/
CELLD_TEST_NODE_URL=http://127.0.0.1:18081 CELLD_TEST_SHUTDOWN=1 \
  bun test packages/celld/test/sdk.live.test.ts
```

Wait for each health request to succeed before the next step. The live test has
a 90-second deadline. `CELLD_TEST_SHUTDOWN=1` additionally exercises shutdown;
without it the node remains available for inspection. The test refuses non-loopback
URLs and assumes the exact fixture identities and key created by `prepare-live.ts`.

Clean up even after a failed test:

```sh
docker stop --timeout 10 distilled-celld-sdk-v050
docker stop --timeout 10 distilled-celld-sdk-store
docker network rm distilled-celld-sdk-test
```

A successful shutdown may already have removed the node container. The test
covers all fifteen operator request variants, an empty queue's controls, D1
migration and queries, KV round trips, and nonce replay rejection. It is not a
multi-node failover, queue-delivery, or full deployment-publication acceptance
suite. Eviction uses a D1 cell: v0.5.0 can retain KV cells with imminent expiration
alarms, leaving an administrative eviction request waiting.
