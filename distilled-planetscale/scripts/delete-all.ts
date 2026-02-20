import { FetchHttpClient } from "@effect/platform";
import "dotenv/config";
import { Effect, Layer } from "effect";
import { Credentials, CredentialsFromEnv } from "../src/credentials";
import { deleteDatabase } from "../src/operations/deleteDatabase";
import { listDatabases } from "../src/operations/listDatabases";

const MainLayer = Layer.merge(CredentialsFromEnv, FetchHttpClient.layer);

const program = Effect.gen(function* () {
  const { organization } = yield* Credentials;

  console.log(`Fetching all databases for organization: ${organization}`);

  // Fetch all pages manually
  const allDatabases: { name: string }[] = [];
  let page = 1;

  while (true) {
    const result = yield* listDatabases({ organization, page, per_page: 100 });
    allDatabases.push(...result.data);

    if (result.next_page === null) {
      break;
    }
    page = result.next_page;
  }

  console.log(`Found ${allDatabases.length} database(s)`);

  if (allDatabases.length === 0) {
    console.log("Nothing to delete.");
    return;
  }

  for (const db of allDatabases) {
    console.log(`Deleting database: ${db.name}`);
    yield* deleteDatabase({ organization, database: db.name }).pipe(
      Effect.catch((e) =>
        Effect.sync(() => console.error(`  Failed to delete ${db.name}:`, e)),
      ),
    );
  }

  console.log("Done.");
});

async function main() {
  await Effect.runPromise(program.pipe(Effect.provide(MainLayer)));
}

main().catch(console.error);
