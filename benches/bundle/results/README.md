# benches/bundle/results

`latest.json` is the committed, slim form of the last full bench run. The
website (`website/scripts/build.ts`) reads it at build time to render
`/bench`; if the file is missing that section is omitted.

Refresh it from the repo root:

```sh
pnpm --filter @distilled.cloud/bench-bundle record
# same as: pnpm bench:bundle -- --out benches/bundle/results/latest.json
# runs per fixture: --runs N, else $BENCH_RUNS, else 3 (CI can set BENCH_RUNS=1)
```

Then commit the file. Timings are from one dev box (±30 % on ms); bytes are
deterministic for a given commit and rolldown version.

Shape (`schema: 1`):

```json
{
  "schema": 1,
  "generatedAt": "ISO-8601",
  "commit": "short sha",
  "host": { "platform": "linux-x64", "cpu": "…", "cores": 16, "memoryGb": 31 },
  "rolldown": "1.2.5",
  "bun": "1.3.13",
  "runs": 3,
  "rows": [
    {
      "fixture": "aws-s3-deep",
      "variant": "bun",
      "description": "…",
      "coldMs": 320,
      "warmMs": 310,
      "bytes": 420542,
      "gzipBytes": 121287,
      "moduleCount": 222,
      "opsRetained": [{ "service": "aws/s3", "retained": 1, "total": 112 }],
      "leaks": 0
    }
  ]
}
```

`leaks` = number of failed tree-shake expectations (missing used-op literal
+ present forbidden literals); 0 is clean. `warmMs` is `null` when
`--runs 1`.
