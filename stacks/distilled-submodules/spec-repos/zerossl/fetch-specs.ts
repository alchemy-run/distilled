#!/usr/bin/env node
/**
 * Fetches the ZeroSSL API reference to ../specs/.
 *
 * ZeroSSL publishes no OpenAPI document. Its REST API reference is Markdown
 * in https://github.com/zerossl/documentation, one page per endpoint:
 *
 *   docs/api/*.md   the REST API (certificates, verification, CSR checks)
 *   docs/acme/*.md  ACME helpers on the same API (EAB credentials)
 *
 * This mirror snapshots both directories at the default branch's head:
 *
 *   ../specs/api/<page>.md
 *   ../specs/acme/<page>.md
 *   ../specs/_manifest.json   upstream commit and the page list
 *
 * Usage:
 *   node fetch-specs.ts
 */

import { mkdirSync, readdirSync, rmSync } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";

const REPO = "zerossl/documentation";
const DIRS = ["docs/api", "docs/acme"];
const SPECS_DIR = "../specs";
const USER_AGENT = "distilled.cloud-zerossl-spec-mirror";

async function get(url: string, accept: string): Promise<Response> {
  const res = await fetch(url, { headers: { accept, "user-agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  return res;
}

async function main() {
  const head = (await (
    await get(`https://api.github.com/repos/${REPO}/commits/HEAD`, "application/vnd.github+json")
  ).json()) as { sha: string };
  console.log(`${REPO} @ ${head.sha}`);

  const pages: string[] = [];
  for (const dir of DIRS) {
    const listing = (await (
      await get(
        `https://api.github.com/repos/${REPO}/contents/${dir}?ref=${head.sha}`,
        "application/vnd.github+json",
      )
    ).json()) as Array<{ name: string; type: string }>;
    const names = listing
      .filter((e) => e.type === "file" && e.name.endsWith(".md"))
      .map((e) => e.name);
    if (names.length === 0) throw new Error(`${REPO}/${dir} has no Markdown pages`);

    const out = join(SPECS_DIR, dir.replace(/^docs\//, ""));
    mkdirSync(out, { recursive: true });
    for (const f of readdirSync(out)) if (!names.includes(f)) rmSync(join(out, f));
    for (const name of names) {
      const text = await (
        await get(
          `https://raw.githubusercontent.com/${REPO}/${head.sha}/${dir}/${name}`,
          "text/plain",
        )
      ).text();
      await writeFile(join(out, name), text.endsWith("\n") ? text : text + "\n");
      pages.push(`${dir.replace(/^docs\//, "")}/${name}`);
    }
  }

  await writeFile(
    join(SPECS_DIR, "_manifest.json"),
    JSON.stringify({ repository: REPO, commit: head.sha, pages }, null, 2) + "\n",
  );
  console.log(`Done: ${pages.length} pages.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
