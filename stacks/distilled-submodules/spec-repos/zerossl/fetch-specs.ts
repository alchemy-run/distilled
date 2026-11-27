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
 * The pages come from a blobless, depth-1 clone: git downloads the head
 * commit and its trees, and `git show` then fetches only the blobs of the
 * pages. Git over HTTPS has no unauthenticated rate limit, unlike
 * api.github.com (60 requests an hour per IP, shared by every job on a
 * GitHub-hosted runner).
 *
 * Usage:
 *   node fetch-specs.ts
 */

import { spawn } from "child_process";
import { once } from "events";
import { mkdirSync, mkdtempSync, readdirSync, rmSync } from "fs";
import { writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

const REPO = "zerossl/documentation";
const DIRS = ["docs/api", "docs/acme"];
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
  const workdir = mkdtempSync(join(tmpdir(), "spec-mirror-zerossl-"));
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

    const pages: string[] = [];
    for (const dir of DIRS) {
      // Trees are local after a blobless clone: list the directory without any
      // blob. Each line is "<mode> <type> <object>\t<name>".
      const names = (await git(repo, "ls-tree", "HEAD", `${dir}/`))
        .split("\n")
        .map((line) => line.split("\t"))
        .filter(([meta, path]) => meta?.split(" ")[1] === "blob" && path?.endsWith(".md"))
        .map(([, path]) => path!.slice(dir.length + 1));
      if (names.length === 0) throw new Error(`${REPO}/${dir} has no Markdown pages`);

      const out = join(SPECS_DIR, dir.replace(/^docs\//, ""));
      mkdirSync(out, { recursive: true });
      for (const f of readdirSync(out)) if (!names.includes(f)) rmSync(join(out, f));
      for (const name of names) {
        const text = await git(repo, "show", `HEAD:${dir}/${name}`);
        await writeFile(join(out, name), text.endsWith("\n") ? text : text + "\n");
        pages.push(`${dir.replace(/^docs\//, "")}/${name}`);
      }
    }

    await writeFile(
      join(SPECS_DIR, "_manifest.json"),
      JSON.stringify({ repository: REPO, commit: sha, pages }, null, 2) + "\n",
    );
    console.log(`Done: ${pages.length} pages.`);
  } finally {
    rmSync(workdir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
