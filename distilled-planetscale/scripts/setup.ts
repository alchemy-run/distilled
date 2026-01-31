const OPENAPI_SPEC_URL = "https://api.planetscale.com/v1/openapi-spec";
const OUTPUT_PATH = "specs/openapi.json";

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`,
    );
  }

  const spec = await response.json();

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2));

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
