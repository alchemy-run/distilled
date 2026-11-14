// The shared calls plus a Node-only credential provider (`fromIni`, loaded on
// first use from `@distilled.cloud/aws/Credentials`).
import * as AwsCredentials from "@distilled.cloud/aws/Credentials";
import * as Effect from "effect/Effect";
import { report, runShared } from "./shared.mjs";

await runShared();
await report(
  "aws lazy provider (fromIni)",
  Effect.gen(function* () {
    return yield* yield* AwsCredentials.Credentials;
  }).pipe(Effect.provide(AwsCredentials.fromIni({ profile: "does-not-exist" }))),
);
