# test/services

Live AWS integration tests. Idempotent, self-healing, leave no resources behind.

→ Parent: [test.ts](../test.ts) — Test harness (provides Region, Credentials, HttpClient)

## PATTERNS

**`with*`** — Resource lifecycle wrapper:

```typescript
const withBucket = <R, E, A>(name: string, fn: (bucket: string) => Effect<A, E, R>) =>
  cleanup(name).pipe(
    Effect.andThen(createBucket({ Bucket: name })),
    Effect.andThen(fn(name)),
    Effect.ensuring(cleanup(name))
  );
```

**`cleanup*`** — Removes dependencies first, ignores errors:

```typescript
const cleanupUser = (name: string) =>
  deleteAccessKeys(name).pipe(
    Effect.andThen(detachPolicies(name)),
    Effect.andThen(removeFromGroups(name)),
    Effect.andThen(deleteUser({ UserName: name })),
    Effect.ignore
  );
```

**`waitFor*`** — Polls for state with `Effect.retry` + `Schedule`

## NAMING

- **Files:** `{service}.test.ts` — matches `src/services/{service}.ts`
- **Resources:** `itty-{service}-{test}` — e.g., `itty-s3-lifecycle`
- **NEVER** use random suffixes — deterministic names enable cleanup from failed runs

## CLEANUP ORDER

| Service     | Order                                  |
| ----------- | -------------------------------------- |
| S3 Bucket   | Empty objects/versions → Delete bucket |
| IAM User    | Access keys → Policies → Groups → User |
| IAM Role    | Instance profiles → Policies → Role    |
| Lambda      | Event source mappings → Function       |
| ECS Cluster | Stop tasks → Services → Cluster        |

## GOTCHAS

- **SQS** — 60s cooldown after delete. Wrap `createQueue` with retry for `QueueDeletedRecently`.
- **IAM** — Role changes take ~10s to propagate. Retry Lambda/ECS operations.
- **S3 Versioning** — Cannot disable once enabled. Must delete all versions to empty bucket.
- **Lambda State** — Wait for `Active` state before invoking.
- **DynamoDB** — Wait for `ACTIVE` status after create, wait for deletion before recreate.

## RUNNING

```bash
bun vitest run ./test/services/           # All
bun vitest run ./test/services/s3.test.ts # Single
DEBUG=1 bun vitest run ./test/services/s3.test.ts # With logs
LOCAL=1 bun vitest run ./test/services/s3.test.ts # LocalStack (only when explicitly requested to, favor live tests)
```
