# schema-lab

The same real shapes (extracted from distilled's generated services) in
several schema representations, measured on what distilled pays for
schemas: source size, import heap, first-use heap, validation speed,
correctness, and the bundle for one operation.

```sh
node --conditions=bun extract.ts                       # .out/corpus/*.json
node --conditions=bun --expose-gc run.ts [corpus…] [--only a,b] [--dedupe]
node --conditions=bun dupes.ts                          # structural duplicates per corpus
node --conditions=bun --expose-gc aot.ts <corpus> --dedupe   # Effect SchemaAOTCompiler
```

Candidates: `effect-eager` (effect/Schema), `effect-lazy` (core/schema),
`effect-jit` (SchemaJITCompiler), `valibot`, `zod-mini`, `typebox`, and
static descriptors: `desc-obj` (object literals), `desc-str` (one string
per shape, parsed on first use), `desc-pruned` (only fields that carry
wire metadata; lenient decode only, so it fails the correctness check by
design).
