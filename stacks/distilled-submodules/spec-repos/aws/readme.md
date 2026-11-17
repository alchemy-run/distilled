# spec-mirror-aws

A git mirror of the AWS Smithy service models from
[aws/api-models-aws](https://github.com/aws/api-models-aws), reduced to exactly
what the [`@distilled.cloud/aws`](https://github.com/alchemy-run/distilled)
generator reads:

- `specs/models/<service>/service/<version>/<service>-<version>.json` — one
  Smithy model per AWS service (~430 of them)
- `specs/partitions.json` — the endpoint rules engine's region → partition
  table, from
  [smithy-lang/smithy](https://github.com/smithy-lang/smithy)
- `specs/event-schemas/aws.events/<schema>.json` — the OpenAPI 3 schema of
  each event an AWS service sends, such as `aws.ses@EmailBounced`, from the
  EventBridge schema registry's AWS-managed `aws.events` registry

The models are pulled with a blobless, sparse, depth-1 clone: the working tree
is narrowed to `models/` before any checkout happens, so the gradle build, the
docs and the entire history are never transferred.

The event schemas are published nowhere else in machine-readable form. The
registry is an AWS API that takes signed requests only, so the workflow reads
the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` Actions secrets. They
belong to an IAM user that can only read `aws.events` schemas. Locally, run
the fetch with any AWS credentials (`AWS_PROFILE=<profile>`); without them,
the event schemas on disk are left as they are.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-aws.git
```

## Updating specs

From `.meta/`:

```sh
pnpm install
pnpm run fetch-specs
```

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated — edit it there, not here.
