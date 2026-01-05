# src/rules-engine

Smithy rules engine for endpoint resolution. Evaluates rule sets to compute endpoint URL, headers, and auth scheme.

→ Parent: [src/AGENTS.md](../AGENTS.md)

## FILES

| File                    | Purpose                                                       |
| ----------------------- | ------------------------------------------------------------- |
| `resolver.ts`           | `makeRulesResolver(operation)` — creates resolver from schema |
| `evaluator.ts`          | `resolveEndpoint(ruleSet, params)` — walks rule tree          |
| `model.ts`              | `RuleSetObject`, `EndpointParams` types                       |
| `standard-functions.ts` | `isSet`, `parseURL`, `substring`, `stringEquals`              |
| `aws-functions.ts`      | `aws.partition`, `aws.isVirtualHostableS3Bucket`              |
| `partitions.json`       | AWS partition data (copied from Smithy)                       |

## HOW IT WORKS

1. **`makeRulesResolver`** — Pre-computes context param extraction from schema
2. **Input → EndpointParams** — Extracts `Region`, `Bucket`, etc. from input + static context
3. **`resolveEndpoint`** — Walks rule tree, evaluates conditions, returns first match
4. **Result** — `{ url, headers, authSchemes }` used to configure request

## SMITHY TRAITS

| Trait                              | Purpose                             |
| ---------------------------------- | ----------------------------------- |
| `smithy.rules#endpointRuleSet`     | Rule set JSON (on input schema)     |
| `smithy.rules#contextParam`        | Bind input member to endpoint param |
| `smithy.rules#staticContextParams` | Static params per operation         |
| `smithy.rules#clientContextParams` | Client-level endpoint params        |

## ADDING FUNCTIONS

Standard functions go in `standard-functions.ts`. AWS-specific in `aws-functions.ts`.

Functions must match the Smithy spec exactly — see `smithy/docs/source-2.0/aws/rules-engine/library-functions.rst`.
