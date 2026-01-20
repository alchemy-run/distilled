/**
 * Distilled-code configuration for generating Cloudflare API tests.
 *
 * This config:
 * 1. Uses parseCode() to extract operations from the Cloudflare TypeScript SDK
 * 2. Generates skeleton test files with TODOs before spawning agents
 * 3. Provides detailed coding conventions in agent descriptions
 */

import { agent, defineConfig, Toolkit } from "distilled-code";
import { Effect } from "effect";
import type { ParsedOperation, ServiceInfo } from "./scripts/model.ts";
import { parseCode } from "./scripts/parse.ts";

const SDK_PATH = "../../cloudflare-typescript/src/resources";

export default defineConfig({
  name: "distilled-cloudflare-tests",
  model: "claude-opus-4-5",
  agents: Effect.gen(function* () {
    const services: ServiceInfo[] = yield* parseCode({ basePath: SDK_PATH });

    return services.flatMap((service) =>
      service.operations.map((op) =>
        agent(`${service.name}/${op.operationName}`, {
          toolkit: Toolkit.Coding,
          tags: [service.name, op.httpMethod.toLowerCase()],
          description: generateAgentDescription(
            service.name,
            op,
            op.operationName,
          ),
        }),
      ),
    );
  }),
});

function generateAgentDescription(
  service: string,
  op: ParsedOperation,
  opName: string,
): string {
  const resources = op.resources;
  const pathParams = op.pathParams
    .map((p) => `  - ${p.name}: ${p.type.kind}`)
    .join("\n");
  const queryParams = op.queryParams
    .map((p) => `  - ${p.name}${p.required ? "" : "?"}: ${p.type.kind}`)
    .join("\n");

  return `Complete the test file for ${opName}.

## Operation
- Method: ${op.httpMethod} ${op.urlTemplate}
- Path params:
${pathParams || "  (none)"}
- Query params:
${queryParams || "  (none)"}

## File Location
test/services/${service}/${opName}.test.ts (skeleton already generated)

## Coding Conventions

### Test Structure
- Use \`test()\` from "../../test.ts" (NOT vitest's \`it\`)
- Wrap test body in \`Effect.gen(function* () { ... })\`
- Use \`yield*\` to call operations (not \`await\`)

### Resource Names
- Always use deterministic names: \`itty-cf-${service}-${opName.toLowerCase()}\`
- Never use Date.now(), Math.random(), or UUIDs

### Happy Path Tests
- Remove \`.skip\` from skeleton tests
- Use with${resources[0] || "Resource"} helper for setup/teardown
- Assert on specific response properties

### Error Discovery Workflow
1. Write a test that should trigger an error
2. Run: \`bun vitest run test/services/${service}/${opName}.test.ts\`
3. When you see \`UnknownCloudflareError\`, note the code
4. Update \`patch/${service}/${opName}.json\`:
   \`\`\`json
   { "errors": { "ErrorName": [{ "code": XXXX }] } }
   \`\`\`
5. Regenerate: \`bun generate --service ${service}\`
6. Import the new error class and update the test

### Error Test Pattern
\`\`\`typescript
describe("NoSuchBucket", () => {
  test("non-existent bucket", () =>
    ${opName}({ accountId: getAccountId(), ... }).pipe(
      Effect.flip,
      Effect.map((e) => expect(e._tag).toBe("NoSuchBucket"))
    )
  );
});
\`\`\`

### Helpers Pattern
- Each helper: cleanup first, create, run test, cleanup in finally
- Use \`Effect.ensuring()\` for cleanup
- Cleanup should never throw: \`Effect.catchAll(() => Effect.void)\`
`;
}

/**
 * Generate skeleton test file content
 */
function generateTestSkeleton(
  service: string,
  op: ParsedOperation,
  opName: string,
): string {
  const resources = op.resources;
  const helpers = resources.map((r) => `with${r}`).join(", ");
  const resourceName = `itty-cf-${service}-${opName.toLowerCase()}`;

  return `/**
 * Tests for ${opName}
 *
 * Operation: ${op.httpMethod} ${op.urlTemplate}
 * Generated skeleton - fill in TODOs
 */
import { describe, expect } from "vitest";
import { test, getAccountId } from "../../test.ts";
import { ${opName} } from "~/services/${service}.ts";
${helpers ? `import { ${helpers} } from "./helpers.ts";` : ""}
import * as Effect from "effect/Effect";

describe("${opName}", () => {
  // =========================================================================
  // Happy Paths
  // =========================================================================
  describe("success", () => {
    // TODO: Implement happy path test
    // - Use deterministic resource name: "${resourceName}"
    // - Use with${resources[0] || "Resource"} helper if resource setup needed
    // - Assert on expected response properties
    test.skip("returns expected result", () =>
      Effect.gen(function* () {
        // TODO: Call ${opName} with valid params
        // const result = yield* ${opName}({ accountId: getAccountId(), ... });
        // expect(result).toBeDefined();
      })
    );
  });

  // =========================================================================
  // Error Cases
  // =========================================================================
  // TODO: Discover errors by running tests and observing UnknownCloudflareError
  // When you see an unknown error:
  // 1. Note the error code from the failure
  // 2. Create/update patch/${service}/${opName}.json:
  //    { "errors": { "ErrorTag": [{ "code": XXXX }] } }
  // 3. Run: bun generate --service ${service}
  // 4. Import the new error class and add tests below

  // Example error test structure:
  // describe("NoSuch${resources[0] || "Resource"}", () => {
  //   test("non-existent resource", () =>
  //     ${opName}({
  //       accountId: getAccountId(),
  //       ${resources[0]?.toLowerCase() || "id"}: "itty-cf-nonexistent-xyz",
  //     }).pipe(
  //       Effect.flip,
  //       Effect.map((e) => expect(e._tag).toBe("NoSuch${resources[0] || "Resource"}"))
  //     )
  //   );
  // });
});
`;
}

/**
 * Generate skeleton helpers file if it doesn't exist
 */
function generateHelpersSkeleton(service: string, resources: string[]): string {
  const helpers = resources.map((r) => {
    const lower = r.toLowerCase();
    return `
/**
 * Create a ${r}, run the test, then clean up.
 * Handles cleanup even if test fails.
 */
export const with${r} = <A, E, R>(
  name: string,
  fn: (${lower}: { name: string }) => Effect.Effect<A, E, R>
) =>
  cleanup${r}(name).pipe(
    Effect.andThen(create${r}({ accountId: getAccountId(), name })),
    Effect.andThen((${lower}) => fn(${lower})),
    Effect.ensuring(cleanup${r}(name))
  );

const cleanup${r} = (name: string) =>
  delete${r}({ accountId: getAccountId(), ${lower}Name: name }).pipe(
    Effect.catchAll(() => Effect.void)
  );
`;
  });

  return `/**
 * Test helpers for ${service} service.
 *
 * Pattern: with${resources[0] || "Resource"} creates resource, runs test, cleans up.
 * All helpers are idempotent and deterministic.
 */
import * as Effect from "effect/Effect";
import { getAccountId } from "../../test.ts";
// TODO: Import create/delete operations from ~/services/${service}.ts
// import { create${resources[0] || "Resource"}, delete${resources[0] || "Resource"} } from "~/services/${service}.ts";

${helpers.join("\n")}
`;
}
