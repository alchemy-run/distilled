#!/usr/bin/env node
/**
 * Mirrors Meta's WhatsApp Business Platform OpenAPI spec into ../specs/.
 *
 * Meta publishes the spec in https://github.com/facebook/openapi as one YAML
 * file whose name carries the Graph API version it was cut from
 * (`business-messaging-api_v23.0.yaml`). The name changes when Meta bumps the
 * version, so the file is found by listing the repository root at the default
 * branch's head and taking the highest version, never by a fixed name.
 *
 * The listing comes from a blobless, depth-1 clone: git downloads the head
 * commit and its trees, and `git show` then fetches the one blob of the chosen
 * file. No other file and no history is transferred. Git over HTTPS has no
 * unauthenticated rate limit, unlike api.github.com (60 requests an hour per
 * IP, shared by every job on a GitHub-hosted runner).
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.yaml     the spec, verbatim, under a stable name
 *   ../specs/_manifest.json   upstream commit and the file it came from
 */

import { spawn } from "child_process";
import { once } from "events";
import { mkdirSync, mkdtempSync, rmSync } from "fs";
import { writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

const REPO = "facebook/openapi";
const SPEC_FILE = /^business-messaging-api_v(\d+)\.(\d+)\.yaml$/;
const SPECS_DIR = "../specs";

const git = async (cwd: string, ...args: string[]): Promise<string> => {
  const proc = spawn("git", args, { cwd, stdio: ["ignore", "pipe", "inherit"] });
  const chunks: Buffer[] = [];
  proc.stdout.on("data", (chunk: Buffer) => chunks.push(chunk));
  const [code] = await once(proc, "close");
  if (code !== 0) throw new Error(`git ${args.join(" ")} failed with exit code ${code}`);
  return Buffer.concat(chunks).toString("utf8");
};

async function main() {
  const workdir = mkdtempSync(join(tmpdir(), "spec-mirror-whatsapp-"));
  try {
    console.log(`Cloning ${REPO} (blobless, depth 1)...`);
    await git(
      workdir,
      "clone",
      "--filter=blob:none",
      "--no-checkout",
      "--depth=1",
      `https://github.com/${REPO}.git`,
      "repo",
    );
    const repo = join(workdir, "repo");
    const sha = (await git(repo, "rev-parse", "HEAD")).trim();
    console.log(`${REPO} @ ${sha}`);

    // Trees are local after a blobless clone: list the root without any blob.
    const names = (await git(repo, "ls-tree", "--name-only", "HEAD")).split("\n");
    const versioned = names
      .map((name) => ({ name, match: SPEC_FILE.exec(name) }))
      .filter((e): e is { name: string; match: RegExpExecArray } => e.match !== null)
      .map((e) => ({ name: e.name, major: Number(e.match[1]), minor: Number(e.match[2]) }))
      .sort((a, b) => b.major - a.major || b.minor - a.minor);
    const latest = versioned[0];
    if (latest === undefined) {
      throw new Error(`${REPO} has no file matching ${SPEC_FILE}`);
    }
    console.log(`Latest spec: ${latest.name}`);

    const text = await git(repo, "show", `HEAD:${latest.name}`);
    // Refuse anything that is not an OpenAPI 3 document with paths.
    if (!/^openapi: ['"]?3\./m.test(text) || !/^paths:/m.test(text)) {
      throw new Error(`${latest.name} is not an OpenAPI 3 document with paths`);
    }

    mkdirSync(SPECS_DIR, { recursive: true });
    await writeFile(join(SPECS_DIR, "openapi.yaml"), text.endsWith("\n") ? text : text + "\n");
    await writeFile(
      join(SPECS_DIR, "_manifest.json"),
      JSON.stringify({ repository: REPO, commit: sha, file: latest.name }, null, 2) + "\n",
    );
    console.log("Done!");
  } finally {
    rmSync(workdir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
