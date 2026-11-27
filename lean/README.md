# distilled for Lean (experiment)

An experiment: distilled's cloud SDKs as [Lean 4](https://lean-lang.org) modules, generated from the same Smithy models. Each operation is a function that returns an effect whose errors are a closed type, so a proof can cover every response the model lists. Not published, and not part of the pnpm workspace.

```lean
import Distilled
open Distilled

def firstKeys (bucket : String) : Eff AWS.S3.api AWS.S3.ListObjectsV2Error (List String) := do
  let out ← AWS.S3.listObjectsV2 { bucket, maxKeys := some 3 }
  return (out.contents.getD []).filterMap (·.key)
```

## What is here

| Path | What it holds |
|---|---|
| `Distilled/Core.lean` | `Api`, `Eff api ε α`, `Model api`, `Eff.run` (against a model, for proofs) and `Eff.io` (over the network) |
| `Distilled/Schema.lean` | Schemas, HTTP bindings and the `Shape` class the generated types implement |
| `Distilled/Protocol.lean`, `Distilled/Protocol/Codec.lean` | The five AWS protocols: awsJson, restJson, restXml, awsQuery, ec2Query |
| `Distilled/Http.lean`, `Distilled/Net.lean`, `c/net.c` | HTTP/1.1 and TLS, linked against the OpenSSL the Lean toolchain ships |
| `Distilled/SigV4.lean`, `Distilled/AWS/Client.lean` | Request signing and the AWS client |
| `Generate.lean` | The generator: a Smithy model in, a Lean module out |
| `Distilled/AWS/Services/` | Generated: SQS, SNS, Lambda, S3, DynamoDB, EC2 |
| `Check.lean` | Known-answer checks for hashing, signing and each protocol, plus live calls to public endpoints |

## Build and check

```sh
curl https://elan.lean-lang.org/elan-init.sh -sSf | sh
lake build                # EC2 takes about four minutes
lake exe distilled-check
```

## Regenerate

```sh
git submodule update --init --depth 1 packages/aws/specs/spec-mirror-aws
./generate.sh
```

The generator reads the models as the mirror has them. It does not apply `packages/aws/patches` yet.

## Not done

- No signed AWS call has been tested; the checks only call public endpoints.
- Shapes that refer to themselves are left out, and with them 16 DynamoDB operations (`AttributeValue`).
- No rpcv2Cbor, event streams, streaming bodies, pagination or retries.
