#!/usr/bin/env bun
/**
 * Create a new SDK package for the Distilled monorepo.
 *
 * Usage:
 *   bun scripts/create-sdk.ts <name> --specs <url-or-repo>... [--register-package]
 *
 * Examples:
 *   # OpenAPI spec URL → creates distilled-spec-* mirror repo
 *   bun scripts/create-sdk.ts stripe --specs https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json --register-package
 *
 *   # Git repo → adds as direct submodule
 *   bun scripts/create-sdk.ts stripe --specs https://github.com/stripe/openapi.git --register-package
 *
 *   # Multiple spec URLs
 *   bun scripts/create-sdk.ts foo --specs https://api.foo.com/v1/openapi.json https://api.foo.com/v2/openapi.json
 *
 * Flags:
 *   --register-package   Publish a 0.0.0 placeholder to npm as @distilled.cloud/<name>
 *   --specs              One or more spec sources (git repo URLs ending in .git, or HTTP URLs to fetch)
 */

import { BunRuntime, BunServices } from "@effect/platform-bun";
import { spawn } from "node:child_process";
import { Console, Data, Effect, type PlatformError, Stream } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { ChildProcess, ChildProcessSpawner } from "effect/unstable/process";
import { Argument, Command, Flag } from "effect/unstable/cli";

// ============================================================================
// Error Types
// ============================================================================

/** Unified error type for both shell commands and filesystem operations. */
type SdkError = CommandError | PlatformError.PlatformError;

class CommandError extends Data.TaggedError("CommandError")<{
  readonly command: string;
  readonly code: number;
  readonly stderr: string;
}> {}

// ============================================================================
// Shell Helpers
// ============================================================================

/**
 * Run a shell command, capturing stdout/stderr. Fails with CommandError on non-zero exit
 * unless ignoreError is set.
 */
const exec = (
  cmd: string,
  args: string[],
  opts?: { cwd?: string; ignoreError?: boolean },
): Effect.Effect<
  { stdout: string; stderr: string; code: number },
  SdkError,
  ChildProcessSpawner.ChildProcessSpawner
> =>
  Effect.gen(function* () {
    const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
    const command = ChildProcess.make(cmd, args, {
      cwd: opts?.cwd,
      shell: process.platform === "win32",
      stdin: "ignore",
    });

    const handle = yield* spawner.spawn(command);
    const stdoutChunks = yield* Stream.runCollect(
      Stream.decodeText(handle.stdout),
    );
    const stderrChunks = yield* Stream.runCollect(
      Stream.decodeText(handle.stderr),
    );
    const exitCode = yield* handle.exitCode;

    const stdout = Array.from(stdoutChunks).join("");
    const stderr = Array.from(stderrChunks).join("");
    const code = exitCode as number;

    if (code !== 0 && !opts?.ignoreError) {
      return yield* new CommandError({
        command: `${cmd} ${args.join(" ")}`,
        code,
        stderr,
      });
    }

    return { stdout, stderr, code };
  }).pipe(Effect.scoped);

/**
 * Run a command interactively (inherits stdio for user prompts like npm publish).
 * Uses node:child_process directly since ChildProcess doesn't support full inherit mode
 * with interactive prompts.
 */
const execInteractive = (
  cmd: string,
  args: string[],
  opts?: { cwd?: string },
): Effect.Effect<{ code: number }, never, never> =>
  Effect.callback<{ code: number }, never>((resume) => {
    const cp = spawn(cmd, args, {
      cwd: opts?.cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    cp.on("close", (code: number) => {
      resume(Effect.succeed({ code: code ?? 1 }));
    });
    cp.on("error", () => {
      resume(Effect.succeed({ code: 1 }));
    });
  });

// ============================================================================
// Opencode Helper
// ============================================================================

interface OpencodeResult {
  readonly stdout: string;
  readonly sessionId: string | undefined;
  readonly killed: boolean;
}

/**
 * Run opencode with inactivity timeout detection and session ID extraction.
 *
 * Uses node:child_process directly because the inactivity timer pattern
 * (reset on each chunk of output) doesn't map cleanly to Effect streams.
 * Wrapped in Effect.async for composability.
 */
const runOpencode = (
  prompt: string,
  opts?: {
    cwd?: string;
    model?: string;
    inactivityTimeoutMs?: number;
    sessionId?: string;
  },
): Effect.Effect<OpencodeResult, CommandError, never> =>
  Effect.callback<OpencodeResult, CommandError>((resume) => {
    const model = opts?.model ?? "anthropic/claude-opus-4-6";
    const inactivityTimeoutMs = opts?.inactivityTimeoutMs ?? 8 * 60 * 1000;

    // Build args: use --session to continue an existing session, or start fresh
    const args = ["run", "--format", "json", "--model", model];
    if (opts?.sessionId) {
      args.push("--session", opts.sessionId);
    }
    args.push(prompt);

    const cp = spawn("opencode", args, {
      cwd: opts?.cwd,
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32",
    });
    let stdout = "";
    let stderr = "";
    let killed = false;
    let sessionId: string | undefined;

    // Reset this timer every time we get output
    let inactivityTimer = setTimeout(onInactive, inactivityTimeoutMs);

    function onInactive() {
      killed = true;
      console.error(
        `\n⚠️  opencode has produced no output for ${inactivityTimeoutMs / 1000}s — killing stuck process`,
      );
      cp.kill("SIGTERM");
      setTimeout(() => {
        try {
          cp.kill("SIGKILL");
        } catch {}
      }, 5000);
    }

    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(onInactive, inactivityTimeoutMs);
    }

    cp.stdout.on("data", (d: Buffer) => {
      const chunk = d.toString();
      stdout += chunk;
      resetInactivityTimer();

      // Parse JSON events and print human-readable output
      for (const line of chunk.split("\n")) {
        if (!line.trim()) continue;
        try {
          const event = JSON.parse(line);

          // Extract sessionID from first event that has one
          if (!sessionId && event.sessionID) {
            sessionId = event.sessionID;
          }

          // Print human-readable output based on event type
          switch (event.type) {
            case "text":
              if (event.part?.text) {
                process.stdout.write(event.part.text);
              }
              break;
            case "tool_use":
              if (event.part?.tool) {
                const tool = event.part.tool;
                const status = event.part.state?.status ?? "";
                const title = event.part.state?.title ?? "";
                if (status === "completed") {
                  console.log(`\n  🔧 ${tool}: ${title}`);
                } else if (status === "running") {
                  console.log(`\n  ⏳ ${tool}: ${title || "(running)"}`);
                }
              }
              break;
            case "step_finish":
              // Print cost/token info if available
              if (event.part?.tokens) {
                const t = event.part.tokens;
                const cost = event.part.cost;
                if (cost > 0) {
                  console.log(
                    `\n  📊 tokens: ${t.total} (in: ${t.input}, out: ${t.output}, cached: ${t.cache?.read ?? 0}) | cost: $${cost.toFixed(4)}`,
                  );
                }
              }
              break;
          }
        } catch {
          // Not JSON — print as-is
          if (line.trim()) {
            process.stdout.write(line);
          }
        }
      }
    });
    cp.stderr.on("data", (d: Buffer) => {
      stderr += d.toString();
      process.stderr.write(d);
      resetInactivityTimer();
    });
    cp.on("close", (code: number) => {
      clearTimeout(inactivityTimer);
      if (killed) {
        // Resolve with killed=true so caller can resume the session
        resume(Effect.succeed({ stdout, sessionId, killed: true }));
      } else if (code === 0) {
        resume(Effect.succeed({ stdout, sessionId, killed: false }));
      } else {
        resume(
          Effect.fail(
            new CommandError({
              command: `opencode ${args.join(" ")}`,
              code,
              stderr,
            }),
          ),
        );
      }
    });
    cp.on("error", (err) => {
      clearTimeout(inactivityTimer);
      resume(
        Effect.fail(
          new CommandError({
            command: `opencode ${args.join(" ")}`,
            code: 1,
            stderr: String(err),
          }),
        ),
      );
    });
  });

// ============================================================================
// Utilities
// ============================================================================

const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

const isGitRepoUrl = (url: string): boolean =>
  url.endsWith(".git") ||
  url.match(/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/) !== null;

/**
 * Write a file only if it doesn't already exist.
 */
const writeIfNotExists = (
  filePath: string,
  content: string,
): Effect.Effect<void, PlatformError.PlatformError, FileSystem.FileSystem> =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const exists = yield* fs.exists(filePath);
    if (!exists) {
      yield* fs.writeFileString(filePath, content);
    }
  });

/**
 * Check if the operations directory has generated files (more than just index.ts).
 */
const hasGeneratedOperations = (
  root: string,
  name: string,
): Effect.Effect<boolean, PlatformError.PlatformError, FileSystem.FileSystem | Path.Path> =>
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;
    const opsDir = path.join(root, "packages", name, "src", "operations");
    const exists = yield* fs.exists(opsDir);
    if (!exists) return false;

    const files = yield* fs.readDirectory(opsDir);
    const tsFiles = files.filter((f: string) => f.endsWith(".ts"));
    return tsFiles.length > 1;
  });

// ============================================================================
// Step 1: Register NPM Package
// ============================================================================

const registerNpmPackage = (
  root: string,
  name: string,
): Effect.Effect<
  void,
  SdkError,
  ChildProcessSpawner.ChildProcessSpawner | FileSystem.FileSystem | Path.Path
> =>
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;
    const pkgName = `@distilled.cloud/${name}`;
    yield* Console.log(`\n📦 Registering npm package: ${pkgName}@0.0.0`);

    // Check if package already exists on npm
    const { code, stdout } = yield* exec(
      "npm",
      ["view", pkgName, "version"],
      { ignoreError: true },
    );

    if (code === 0 && stdout.trim().length > 0) {
      yield* Console.log(
        `⚠️  Package ${pkgName}@${stdout.trim()} already exists on npm, skipping registration`,
      );
      return;
    }

    // Also check specifically for 0.0.0
    const { code: code2 } = yield* exec(
      "npm",
      ["view", `${pkgName}@0.0.0`, "version"],
      { ignoreError: true },
    );

    if (code2 === 0) {
      yield* Console.log(
        `⚠️  Package ${pkgName}@0.0.0 already exists on npm, skipping registration`,
      );
      return;
    }

    // Create a temporary directory for the placeholder package
    const tmpDir = path.join(root, ".ai-workspace", `npm-register-${name}`);
    yield* fs.makeDirectory(tmpDir, { recursive: true });

    const placeholderPkg = {
      name: pkgName,
      version: "0.0.0",
      description: `${capitalize(name)} SDK for Effect (placeholder)`,
      type: "module",
      main: "index.js",
      files: ["index.js"],
      repository: {
        type: "git",
        url: "https://github.com/alchemy-run/distilled",
        directory: `packages/${name}`,
      },
      license: "MIT",
    };

    yield* fs.writeFileString(
      path.join(tmpDir, "package.json"),
      JSON.stringify(placeholderPkg, null, 2),
    );
    yield* fs.writeFileString(
      path.join(tmpDir, "index.js"),
      `// Placeholder — this package will be replaced by the generated SDK.\nexport {};\n`,
    );

    const { code: publishCode } = yield* execInteractive(
      "npm",
      ["publish", "--access", "public"],
      { cwd: tmpDir },
    );

    if (publishCode === 0) {
      yield* Console.log(`✅ Published ${pkgName}@0.0.0`);
    } else {
      yield* Console.log(
        `⚠️  npm publish exited with code ${publishCode} — package may already exist or auth was cancelled. Continuing...`,
      );
    }
  });

// ============================================================================
// Step 2: Setup Specs (Submodule or Spec Mirror Repo)
// ============================================================================

interface SpecInfo {
  readonly submodulePaths: string[];
  readonly hasSpecMirror: boolean;
}

const setupSpecsGitSubmodule = (
  root: string,
  name: string,
  repoUrl: string,
): Effect.Effect<
  string,
  SdkError,
  ChildProcessSpawner.ChildProcessSpawner | FileSystem.FileSystem | Path.Path
> =>
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;
    const submodulePath = `packages/${name}/specs/${repoUrl.split("/").pop()?.replace(/\.git$/, "")}`;

    yield* Console.log(
      `\n🔗 Adding git submodule: ${repoUrl} → ${submodulePath}`,
    );

    // Check if submodule already exists
    const gitmodulesPath = path.join(root, ".gitmodules");
    const gitmodulesExists = yield* fs.exists(gitmodulesPath);
    const gitmodules = gitmodulesExists
      ? yield* fs.readFileString(gitmodulesPath)
      : "";

    if (gitmodules.includes(submodulePath)) {
      yield* Console.log(
        `⚠️  Submodule ${submodulePath} already registered, skipping`,
      );
      return submodulePath;
    }

    // Ensure parent dir exists
    const specsDir = path.join(root, `packages/${name}/specs`);
    yield* fs.makeDirectory(specsDir, { recursive: true });

    yield* exec("git", ["submodule", "add", repoUrl, submodulePath], {
      cwd: root,
    });
    yield* Console.log(`✅ Submodule added: ${submodulePath}`);

    return submodulePath;
  });

const setupSpecMirrorRepo = (
  root: string,
  name: string,
  specUrls: string[],
): Effect.Effect<
  string,
  SdkError,
  ChildProcessSpawner.ChildProcessSpawner | FileSystem.FileSystem | Path.Path
> =>
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;
    const repoName = `distilled-spec-${name}`;
    const repoFullName = `alchemy-run/${repoName}`;
    const submodulePath = `packages/${name}/specs/${repoName}`;

    yield* Console.log(
      `\n🏗️  Setting up spec mirror repo: ${repoFullName} for ${specUrls.length} URL(s)`,
    );

    // Check if the GitHub repo already exists
    const { code: repoExists } = yield* exec(
      "gh",
      ["repo", "view", repoFullName, "--json", "name"],
      { ignoreError: true },
    );

    if (repoExists === 0) {
      yield* Console.log(
        `⚠️  Repo ${repoFullName} already exists on GitHub`,
      );
    } else {
      yield* Console.log(`Creating GitHub repo: ${repoFullName}`);
      yield* exec("gh", [
        "repo",
        "create",
        repoFullName,
        "--public",
        "--description",
        `A git mirror of ${capitalize(name)}'s API spec. Updated daily.`,
      ]);
      yield* Console.log(`✅ Created GitHub repo: ${repoFullName}`);
    }

    // Build the spec mirror repo content locally
    const tmpDir = path.join(root, ".ai-workspace", `spec-repo-${name}`);
    yield* fs.makeDirectory(path.join(tmpDir, ".meta"), { recursive: true });
    yield* fs.makeDirectory(path.join(tmpDir, ".github", "workflows"), {
      recursive: true,
    });
    yield* fs.makeDirectory(path.join(tmpDir, "specs"), { recursive: true });

    // .gitignore
    yield* fs.writeFileString(
      path.join(tmpDir, ".gitignore"),
      `node_modules/\n.env\ndist/\n*.tsbuildinfo\n`,
    );

    // readme.md
    yield* fs.writeFileString(
      path.join(tmpDir, "readme.md"),
      `# ${repoName}

A git mirror of ${capitalize(name)}'s API spec. The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Spec source(s)

${specUrls.map((u) => `- ${u}`).join("\n")}

## Usage as a submodule

\`\`\`sh
git submodule add https://github.com/${repoFullName}.git
\`\`\`

## Updating specs

From \`.meta/\`:

\`\`\`sh
bun install
bun run fetch-specs
\`\`\`
`,
    );

    // .meta/package.json
    yield* fs.writeFileString(
      path.join(tmpDir, ".meta", "package.json"),
      JSON.stringify(
        {
          name: `${name}-spec`,
          private: true,
          type: "module",
          scripts: {
            "fetch-specs": "bun run fetch-specs.ts",
            tsc: "tsc --noEmit",
            lint: "oxlint .",
            fmt: "oxfmt --write .",
            "fmt:check": "oxfmt --check .",
            check: "bun run tsc && bun run lint && bun run fmt:check",
          },
          workspaces: {
            catalog: {
              "@typescript/native-preview": "latest",
              oxfmt: "0.21.0",
              oxlint: "1.36.0",
            },
          },
          dependencies: {
            "@typescript/native-preview": "catalog:",
          },
          devDependencies: {
            oxfmt: "catalog:",
            oxlint: "catalog:",
          },
        },
        null,
        2,
      ),
    );

    // .meta/tsconfig.json
    yield* fs.writeFileString(
      path.join(tmpDir, ".meta", "tsconfig.json"),
      JSON.stringify(
        {
          exclude: ["node_modules", "dist"],
          compilerOptions: {
            lib: ["ESNext", "DOM"],
            target: "ESNext",
            moduleDetection: "force",
            jsx: "react-jsx",
            allowJs: true,
            esModuleInterop: true,
            noEmit: true,
            module: "Preserve",
            moduleResolution: "Bundler",
            allowImportingTsExtensions: true,
            rewriteRelativeImportExtensions: true,
            verbatimModuleSyntax: true,
            strict: true,
            skipLibCheck: true,
            noFallthroughCasesInSwitch: true,
            noUnusedLocals: false,
            noUnusedParameters: false,
            noPropertyAccessFromIndexSignature: false,
            noImplicitThis: true,
            sourceMap: true,
            declaration: true,
            declarationMap: true,
            noErrorTruncation: true,
          },
        },
        null,
        2,
      ),
    );

    // .meta/fetch-specs.ts
    if (specUrls.length === 1) {
      yield* fs.writeFileString(
        path.join(tmpDir, ".meta", "fetch-specs.ts"),
        `#!/usr/bin/env bun
/**
 * Fetches the ${capitalize(name)} OpenAPI spec to ../specs/.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.json
 */

const OPENAPI_SPEC_URL = "${specUrls[0]}";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = \`\${SPECS_DIR}/openapi.json\`;

import { existsSync, mkdirSync } from "fs";

// Ensure the specs directory exists
if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function main() {
  console.log(\`Fetching OpenAPI spec from \${OPENAPI_SPEC_URL}...\`);

  const response = await fetch(OPENAPI_SPEC_URL);

  if (!response.ok) {
    throw new Error(
      \`Failed to fetch OpenAPI spec: \${response.status} \${response.statusText}\`,
    );
  }

  const spec = await response.json();

  console.log(\`Writing spec to \${OUTPUT_PATH}...\`);
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2));

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
`,
      );
    } else {
      yield* fs.writeFileString(
        path.join(tmpDir, ".meta", "fetch-specs.ts"),
        `#!/usr/bin/env bun
/**
 * Fetches the ${capitalize(name)} API specs to ../specs/.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/spec-{index}.json   (one per URL)
 *   ../specs/openapi.json        (first spec, for primary use)
 */

const SPEC_URLS: string[] = ${JSON.stringify(specUrls, null, 2)};

const SPECS_DIR = "../specs";

import { existsSync, mkdirSync } from "fs";

// Ensure the specs directory exists
if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function fetchSpec(url: string, outputPath: string) {
  console.log(\`Fetching spec from \${url}...\`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      \`Failed to fetch spec from \${url}: \${response.status} \${response.statusText}\`,
    );
  }
  const spec = await response.json();
  console.log(\`Writing spec to \${outputPath}...\`);
  await Bun.write(outputPath, JSON.stringify(spec, null, 2));
}

async function main() {
  for (let i = 0; i < SPEC_URLS.length; i++) {
    const filename = i === 0 ? "openapi.json" : \`spec-\${i}.json\`;
    await fetchSpec(SPEC_URLS[i], \`\${SPECS_DIR}/\${filename}\`);
  }
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
`,
      );
    }

    // .github/workflows/update-specs.yml
    yield* fs.writeFileString(
      path.join(tmpDir, ".github", "workflows", "update-specs.yml"),
      `name: Update Specs

on:
  schedule:
    - cron: "0 0 * * *" # every 24 hours at midnight UTC
  workflow_dispatch:

permissions:
  contents: write

jobs:
  fetch-and-commit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v2

      - name: Install dependencies
        working-directory: .meta
        run: bun install --frozen-lockfile

      - name: Fetch specs
        working-directory: .meta
        run: bun run fetch-specs

      - name: Commit and push if changed
        run: |
          git add -A
          if git diff --cached --quiet; then
            echo "No changes to commit"
          else
            git config user.name "github-actions[bot]"
            git config user.email "github-actions[bot]@users.noreply.github.com"
            git commit -m "feat: update specs $(date -u +%Y-%m-%d)"
            git push
          fi
`,
    );

    // Initialize git, commit, and push
    yield* Console.log("Initializing spec repo and pushing to GitHub...");

    const gitDirExists = yield* fs.exists(path.join(tmpDir, ".git"));
    if (!gitDirExists) {
      yield* exec("git", ["init"], { cwd: tmpDir });
      yield* exec("git", ["checkout", "-b", "main"], { cwd: tmpDir });
    }

    yield* Console.log("Installing deps in spec repo...");
    yield* exec("bun", ["install"], {
      cwd: path.join(tmpDir, ".meta"),
    });

    yield* Console.log("Fetching specs...");
    yield* exec("bun", ["run", "fetch-specs"], {
      cwd: path.join(tmpDir, ".meta"),
    });

    // Commit and push
    yield* exec("git", ["add", "-A"], { cwd: tmpDir });
    const { code: noChanges } = yield* exec(
      "git",
      ["diff", "--cached", "--quiet"],
      { cwd: tmpDir, ignoreError: true },
    );

    if (noChanges !== 0) {
      yield* exec("git", ["commit", "-m", "feat: initial spec fetch"], {
        cwd: tmpDir,
      });
    }

    const { code: hasRemote } = yield* exec(
      "git",
      ["remote", "get-url", "origin"],
      { cwd: tmpDir, ignoreError: true },
    );

    if (hasRemote !== 0) {
      yield* exec(
        "git",
        [
          "remote",
          "add",
          "origin",
          `https://github.com/${repoFullName}.git`,
        ],
        { cwd: tmpDir },
      );
    }

    yield* exec("git", ["push", "-u", "origin", "main", "--force"], {
      cwd: tmpDir,
    });

    yield* Console.log(
      `✅ Spec repo pushed to https://github.com/${repoFullName}`,
    );

    // Now add as a submodule in the main repo
    const gitmodulesPath = path.join(root, ".gitmodules");
    const gitmodulesExists = yield* fs.exists(gitmodulesPath);
    const gitmodules = gitmodulesExists
      ? yield* fs.readFileString(gitmodulesPath)
      : "";

    if (gitmodules.includes(submodulePath)) {
      yield* Console.log(
        `⚠️  Submodule ${submodulePath} already registered, skipping`,
      );
    } else {
      const specsDir = path.join(root, `packages/${name}/specs`);
      yield* fs.makeDirectory(specsDir, { recursive: true });

      yield* exec(
        "git",
        [
          "submodule",
          "add",
          `https://github.com/${repoFullName}.git`,
          submodulePath,
        ],
        { cwd: root },
      );
      yield* Console.log(`✅ Submodule added: ${submodulePath}`);
    }

    return submodulePath;
  });

const setupSpecs = (
  root: string,
  name: string,
  specs: string[],
): Effect.Effect<
  SpecInfo,
  SdkError,
  ChildProcessSpawner.ChildProcessSpawner | FileSystem.FileSystem | Path.Path
> =>
  Effect.gen(function* () {
    if (specs.length === 0) {
      yield* Console.log("\n⚠️  No specs provided, skipping spec setup");
      return { submodulePaths: [], hasSpecMirror: false } as SpecInfo;
    }

    const gitRepos = specs.filter(isGitRepoUrl);
    const urls = specs.filter((s) => !isGitRepoUrl(s));
    const paths: string[] = [];

    for (const repo of gitRepos) {
      const p = yield* setupSpecsGitSubmodule(root, name, repo);
      paths.push(p);
    }

    if (urls.length > 0) {
      const p = yield* setupSpecMirrorRepo(root, name, urls);
      paths.push(p);
    }

    return {
      submodulePaths: paths,
      hasSpecMirror: urls.length > 0,
    } as SpecInfo;
  });

// ============================================================================
// Step 3: Scaffold SDK Package
// ============================================================================

const scaffoldPackage = (
  root: string,
  name: string,
  specInfo: SpecInfo,
): Effect.Effect<void, PlatformError.PlatformError, FileSystem.FileSystem | Path.Path> =>
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;
    const pkgDir = path.join(root, "packages", name);
    const srcDir = path.join(pkgDir, "src");
    const operationsDir = path.join(srcDir, "operations");
    const scriptsDir = path.join(pkgDir, "scripts");
    const patchesDir = path.join(pkgDir, "patches");
    const testDir = path.join(pkgDir, "test");

    yield* Console.log(`\n🏗️  Scaffolding SDK package: packages/${name}/`);

    for (const dir of [
      srcDir,
      operationsDir,
      scriptsDir,
      patchesDir,
      testDir,
    ]) {
      yield* fs.makeDirectory(dir, { recursive: true });
    }

    const capitalName = capitalize(name);
    const submoduleNames = specInfo.submodulePaths.map(
      (p) => p.split("/").pop()!,
    );

    // --- package.json ---
    const pkgJsonPath = path.join(pkgDir, "package.json");
    const pkgJsonExists = yield* fs.exists(pkgJsonPath);
    if (!pkgJsonExists) {
      const specsFetchCmds = submoduleNames.map(
        (sm) =>
          `git submodule update --force --init --recursive specs/${sm} && git -C specs/${sm} checkout -- .`,
      );
      const specsUpdateCmds = submoduleNames.map(
        (sm) =>
          `git -C specs/${sm} fetch && git -C specs/${sm} checkout main && git -C specs/${sm} pull`,
      );

      yield* fs.writeFileString(
        pkgJsonPath,
        JSON.stringify(
          {
            name: `@distilled.cloud/${name}`,
            version: "0.2.0-alpha",
            repository: {
              type: "git",
              url: "https://github.com/alchemy-run/distilled",
              directory: `packages/${name}`,
            },
            type: "module",
            sideEffects: false,
            module: "src/index.ts",
            files: ["lib", "src"],
            exports: {
              ".": {
                types: "./lib/index.d.ts",
                bun: "./src/index.ts",
                default: "./lib/index.js",
              },
              "./Category": {
                types: "./lib/category.d.ts",
                bun: "./src/category.ts",
                default: "./lib/category.js",
              },
              "./Client": {
                types: "./lib/client.d.ts",
                bun: "./src/client.ts",
                default: "./lib/client.js",
              },
              "./Credentials": {
                types: "./lib/credentials.d.ts",
                bun: "./src/credentials.ts",
                default: "./lib/credentials.js",
              },
              "./Errors": {
                types: "./lib/errors.d.ts",
                bun: "./src/errors.ts",
                default: "./lib/errors.js",
              },
              "./Operations": {
                types: "./lib/operations/index.d.ts",
                bun: "./src/operations/index.ts",
                default: "./lib/operations/index.js",
              },
              "./Retry": {
                types: "./lib/retry.d.ts",
                bun: "./src/retry.ts",
                default: "./lib/retry.js",
              },
              "./Sensitive": {
                types: "./lib/sensitive.d.ts",
                bun: "./src/sensitive.ts",
                default: "./lib/sensitive.js",
              },
              "./Traits": {
                types: "./lib/traits.d.ts",
                bun: "./src/traits.ts",
                default: "./lib/traits.js",
              },
            },
            scripts: {
              typecheck: "tsgo",
              build: "tsgo -b",
              fmt: "oxfmt --write src",
              lint: "oxlint --fix src",
              check: "tsgo && oxlint src && oxfmt --check src",
              test: "bunx vitest run test",
              "publish:npm": "bun run build && bun publish --access public",
              generate:
                "bun run scripts/generate.ts && oxlint --fix src && oxfmt --write src && oxfmt --write src",
              "specs:fetch":
                specsFetchCmds.join(" && ") || "echo 'No specs configured'",
              "specs:update":
                specsUpdateCmds.join(" && ") || "echo 'No specs configured'",
            },
            dependencies: {
              "@distilled.cloud/core": "workspace:*",
              effect: "catalog:",
            },
            devDependencies: {
              "@types/bun": "catalog:",
              "@types/node": "catalog:",
              dotenv: "catalog:",
              vitest: "catalog:",
            },
            peerDependencies: {
              effect: "catalog:",
            },
          },
          null,
          2,
        ),
      );
      yield* Console.log("  ✅ package.json");
    } else {
      yield* Console.log("  ⚠️  package.json already exists, skipping");
    }

    // --- tsconfig.json ---
    const tsconfigPath = path.join(pkgDir, "tsconfig.json");
    const tsconfigExists = yield* fs.exists(tsconfigPath);
    if (!tsconfigExists) {
      yield* fs.writeFileString(
        tsconfigPath,
        JSON.stringify(
          {
            include: ["src/**/*.ts"],
            compilerOptions: {
              lib: ["ESNext"],
              target: "ESNext",
              module: "Preserve",
              moduleDetection: "force",
              allowJs: true,
              moduleResolution: "bundler",
              verbatimModuleSyntax: true,
              rewriteRelativeImportExtensions: true,
              noEmit: false,
              composite: true,
              outDir: "./lib",
              rootDir: "./src",
              declaration: true,
              declarationMap: true,
              sourceMap: true,
              strict: true,
              skipLibCheck: true,
              noFallthroughCasesInSwitch: true,
              noUnusedLocals: false,
              noUnusedParameters: false,
              noPropertyAccessFromIndexSignature: false,
            },
          },
          null,
          2,
        ),
      );
      yield* Console.log("  ✅ tsconfig.json");
    } else {
      yield* Console.log("  ⚠️  tsconfig.json already exists, skipping");
    }

    // --- Source files ---
    yield* writeIfNotExists(
      path.join(srcDir, "traits.ts"),
      `/**\n * Re-export the shared traits system from sdk-core.\n */\nexport * from "@distilled.cloud/core/traits";\n`,
    );

    yield* writeIfNotExists(
      path.join(srcDir, "category.ts"),
      `/**\n * Re-export the shared category system from sdk-core.\n */\nexport * from "@distilled.cloud/core/category";\n`,
    );

    yield* writeIfNotExists(
      path.join(srcDir, "sensitive.ts"),
      `/**\n * Re-export sensitive data schemas from sdk-core.\n */\nexport * from "@distilled.cloud/core/sensitive";\n`,
    );

    // --- src/errors.ts ---
    const envVarName = `${name.toUpperCase().replace(/-/g, "_")}_API_KEY`;
    yield* writeIfNotExists(
      path.join(srcDir, "errors.ts"),
      `/**
 * ${capitalName}-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds ${capitalName}-specific
 * error matching and API error types.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  HTTP_STATUS_MAP,
  DEFAULT_ERRORS,
  API_ERRORS,
} from "@distilled.cloud/core/errors";
export type { DefaultErrors } from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

// Unknown ${capitalName} error - returned when an error code is not recognized
export class Unknown${capitalName}Error extends Schema.TaggedErrorClass<Unknown${capitalName}Error>()(
  "Unknown${capitalName}Error",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class ${capitalName}ParseError extends Schema.TaggedErrorClass<${capitalName}ParseError>()(
  "${capitalName}ParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
`,
    );

    // --- src/credentials.ts ---
    yield* writeIfNotExists(
      path.join(srcDir, "credentials.ts"),
      `import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as ServiceMap from "effect/ServiceMap";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.${name}.com";

export interface Config {
  readonly apiKey: string;
  readonly apiBaseUrl: string;
}

export class Credentials extends ServiceMap.Service<Credentials, Config>()(
  "${capitalName}Credentials",
) {}

export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.${envVarName};

    if (!apiKey) {
      return yield* new ConfigError({
        message: "${envVarName} environment variable is required",
      });
    }

    return { apiKey, apiBaseUrl: DEFAULT_API_BASE_URL };
  }),
);
`,
    );

    // --- src/client.ts ---
    yield* writeIfNotExists(
      path.join(srcDir, "client.ts"),
      `/**
 * ${capitalName} API Client.
 *
 * Wraps the shared REST client from sdk-core with ${capitalName}-specific
 * error matching and credential handling.
 */
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { makeAPI } from "@distilled.cloud/core/client";
import { HTTP_STATUS_MAP, Unknown${capitalName}Error, ${capitalName}ParseError } from "./errors.ts";

// Re-export for backwards compatibility
export { Unknown${capitalName}Error } from "./errors.ts";
import { Credentials } from "./credentials.ts";

// API Error Response Schema
const ApiErrorResponse = Schema.Struct({
  code: Schema.optional(Schema.String),
  message: Schema.String,
});

/**
 * Match a ${capitalName} API error response to the appropriate error class based on HTTP status.
 */
const matchError = (
  status: number,
  errorBody: unknown,
): Effect.Effect<never, unknown> => {
  try {
    const parsed = Schema.decodeUnknownSync(ApiErrorResponse)(errorBody);
    const ErrorClass = (HTTP_STATUS_MAP as any)[status];
    if (ErrorClass) {
      return Effect.fail(new ErrorClass({ message: parsed.message ?? "" }));
    }
    return Effect.fail(
      new Unknown${capitalName}Error({
        code: parsed.code,
        message: parsed.message,
        body: errorBody,
      }),
    );
  } catch {
    return Effect.fail(new Unknown${capitalName}Error({ body: errorBody }));
  }
};

/**
 * ${capitalName} API client.
 */
export const API = makeAPI({
  credentials: Credentials as any,
  getBaseUrl: (creds: any) => creds.apiBaseUrl,
  getAuthHeaders: (creds: any) => ({
    Authorization: \\\`Bearer \\\${creds.apiKey}\\\`,
  }),
  matchError,
  ParseError: ${capitalName}ParseError as any,
});
`,
    );

    // --- src/retry.ts ---
    yield* writeIfNotExists(
      path.join(srcDir, "retry.ts"),
      `/**
 * ${capitalName} retry configuration.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as ServiceMap from "effect/ServiceMap";
export {
  type Options,
  type Factory,
  type Policy,
  makeDefault,
  jittered,
  capped,
  throttlingOptions,
  transientOptions,
} from "@distilled.cloud/core/retry";
import type { Policy } from "@distilled.cloud/core/retry";

/**
 * Context tag for configuring retry behavior of ${capitalName} API calls.
 */
export class Retry extends ServiceMap.Service<Retry, Policy>()("${capitalName}Retry") {}

/**
 * Provides a custom retry policy to all ${capitalName} API calls.
 */
export const policy = (optionsOrFactory: Policy) =>
  Effect.provide(Layer.succeed(Retry, optionsOrFactory));

/**
 * Disables all automatic retries.
 */
export const none = Effect.provide(
  Layer.succeed(Retry, { while: () => false }),
);
`,
    );

    // --- src/index.ts ---
    yield* writeIfNotExists(
      path.join(srcDir, "index.ts"),
      `/**
 * ${capitalName} SDK for Effect
 *
 * @example
 * \\\`\\\`\\\`ts
 * import * as ${capitalName} from "@distilled.cloud/${name}";
 * \\\`\\\`\\\`
 */
export * from "./credentials.ts";
export * as Category from "./category.ts";
export * as T from "./traits.ts";
export * as Retry from "./retry.ts";
export { API } from "./client.ts";
export * from "./errors.ts";
export { SensitiveString, SensitiveNullableString } from "./sensitive.ts";
`,
    );

    // --- src/operations/index.ts (placeholder) ---
    yield* writeIfNotExists(
      path.join(operationsDir, "index.ts"),
      `// Generated operations will be placed here by the code generator.\n// Run \`bun run generate\` to populate this directory.\n`,
    );

    // --- scripts/generate.ts ---
    yield* writeIfNotExists(
      path.join(scriptsDir, "generate.ts"),
      `/**
 * ${capitalName} SDK Code Generator
 *
 * TODO: This is a placeholder. You must update this file to work with the
 * actual spec format found in the specs/ submodule(s).
 *
 * If the spec is OpenAPI, use generateFromOpenAPI from @distilled.cloud/core/openapi/generate.
 * If it's another format (TypeScript SDK, Smithy, protobuf, Go types, etc.),
 * write a custom generator. See packages/cloudflare/ and packages/aws/ for examples
 * of non-OpenAPI generators.
 */

throw new Error(
  "generate.ts has not been configured yet. " +
  "Inspect the specs/ submodule to determine the spec format, " +
  "then update this file with the appropriate generator."
);
`,
    );

    yield* Console.log(
      "  ✅ All source files scaffolded (category, traits, sensitive, errors, credentials, client, retry, index, operations/index, scripts/generate)",
    );
  });

// ============================================================================
// Step 4: Update CI Workflows
// ============================================================================

const updateTestYml = (
  root: string,
  name: string,
): Effect.Effect<void, PlatformError.PlatformError, FileSystem.FileSystem | Path.Path> =>
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;
    const testYmlPath = path.join(root, ".github", "workflows", "test.yml");
    let content = yield* fs.readFileString(testYmlPath);

    if (content.includes(`ci-${name}:`)) {
      yield* Console.log(
        `\n⚠️  test.yml already has ci-${name}, skipping`,
      );
      return;
    }

    yield* Console.log(`\n📝 Updating test.yml with ci-${name} job`);

    const outputsMatch = content.match(
      /(      supabase: \$\{\{ steps\.changes\.outputs\.supabase \}\})/,
    );
    if (outputsMatch) {
      content = content.replace(
        outputsMatch[1],
        `${outputsMatch[1]}\n      ${name}: \${{ steps.changes.outputs.${name} }}`,
      );
    }

    const filtersMatch = content.match(
      /(            supabase:\n              - 'packages\/supabase\/\*\*'\n              - 'packages\/core\/\*\*')/,
    );
    if (filtersMatch) {
      content = content.replace(
        filtersMatch[1],
        `${filtersMatch[1]}\n            ${name}:\n              - 'packages/${name}/**'\n              - 'packages/core/**'`,
      );
    }

    const newJob = `
  ci-${name}:
    needs: detect-changes
    if: needs.detect-changes.outputs.${name} == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install
      - run: bun run build
        working-directory: packages/core
      - run: bun run check
        working-directory: packages/${name}`;

    content = content.trimEnd() + "\n" + newJob + "\n";

    yield* fs.writeFileString(testYmlPath, content);
    yield* Console.log(`  ✅ Added ci-${name} job to test.yml`);
  });

const updatePkgPrYml = (
  root: string,
  name: string,
): Effect.Effect<void, PlatformError.PlatformError, FileSystem.FileSystem | Path.Path> =>
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;
    const ymlPath = path.join(root, ".github", "workflows", "pkg-pr.yml");
    let content = yield* fs.readFileString(ymlPath);

    if (content.includes(`pkg-pr-${name}:`)) {
      yield* Console.log(
        `\n⚠️  pkg-pr.yml already has pkg-pr-${name}, skipping`,
      );
      return;
    }

    yield* Console.log(
      `\n📝 Updating pkg-pr.yml with pkg-pr-${name} job`,
    );

    const outputsMatch = content.match(
      /(      supabase: \$\{\{ steps\.changes\.outputs\.supabase \}\})/,
    );
    if (outputsMatch) {
      content = content.replace(
        outputsMatch[1],
        `${outputsMatch[1]}\n      ${name}: \${{ steps.changes.outputs.${name} }}`,
      );
    }

    const filtersMatch = content.match(
      /(            supabase:\n              - 'packages\/supabase\/\*\*')/,
    );
    if (filtersMatch) {
      content = content.replace(
        filtersMatch[1],
        `${filtersMatch[1]}\n            ${name}:\n              - 'packages/${name}/**'`,
      );
    }

    const newJob = `
  pkg-pr-${name}:
    needs: [detect-changes, pkg-pr-supabase]
    if: \${{ !failure() && needs.detect-changes.outputs.${name} == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install
      - run: bun run build
        working-directory: packages/core
      - run: bun run build
        working-directory: packages/${name}
      - run: bun scripts/generate-pnpm-workspace.yaml.ts
      - run: bun add -D pnpm && bunx pkg-pr-new publish --pnpm ./packages/${name}`;

    content = content.trimEnd() + "\n" + newJob + "\n";

    yield* fs.writeFileString(ymlPath, content);
    yield* Console.log(`  ✅ Added pkg-pr-${name} job to pkg-pr.yml`);
  });

const updateReleaseYml = (
  root: string,
  name: string,
): Effect.Effect<void, PlatformError.PlatformError, FileSystem.FileSystem | Path.Path> =>
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;
    const ymlPath = path.join(root, ".github", "workflows", "release.yml");
    let content = yield* fs.readFileString(ymlPath);

    const pkgArrayMatch = content.match(/PACKAGES=\(([^)]+)\)/);
    if (pkgArrayMatch) {
      const pkgs = pkgArrayMatch[1].trim().split(/\s+/);
      if (pkgs.includes(name)) {
        yield* Console.log(
          `\n⚠️  release.yml already includes ${name}, skipping`,
        );
        return;
      }
    }

    yield* Console.log(`\n📝 Updating release.yml with ${name}`);

    content = content.replace(
      /PACKAGES=\(([^)]+)\)/,
      (_match: string, pkgList: string) => {
        const trimmed = pkgList.trim();
        return `PACKAGES=(${trimmed} ${name})`;
      },
    );

    yield* fs.writeFileString(ymlPath, content);
    yield* Console.log(`  ✅ Added ${name} to release.yml PACKAGES`);
  });

// ============================================================================
// Step 5: Run Generation & OpenCode for SDK Refinement
// ============================================================================

const installAndGenerate = (
  root: string,
  name: string,
): Effect.Effect<
  void,
  SdkError,
  ChildProcessSpawner.ChildProcessSpawner | FileSystem.FileSystem | Path.Path
> =>
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const pkgDir = path.join(root, "packages", name);

    yield* Console.log("\n📦 Running bun install...");
    yield* exec("bun", ["install"], { cwd: root });

    yield* Console.log("\n🔨 Building core...");
    yield* exec("bun", ["run", "build"], {
      cwd: path.join(root, "packages", "core"),
    });

    yield* Console.log("\n🔧 Fetching specs...");
    yield* exec("bun", ["run", "specs:fetch"], {
      cwd: pkgDir,
      ignoreError: true,
    });

    yield* Console.log("\n⚡ Running code generation...");
    yield* exec("bun", ["run", "generate"], {
      cwd: pkgDir,
      ignoreError: true,
    });

    const hasOps = yield* hasGeneratedOperations(root, name);
    if (hasOps) {
      yield* Console.log("  ✅ Operations generated successfully");
    } else {
      yield* Console.log(
        "  ⚠️  Operations directory is empty (only index.ts) — opencode will write the generator for the spec format found in the submodule",
      );
    }
  });

const refineWithOpencode = (
  root: string,
  name: string,
  specInfo: SpecInfo,
): Effect.Effect<
  void,
  SdkError,
  ChildProcessSpawner.ChildProcessSpawner | FileSystem.FileSystem | Path.Path
> =>
  Effect.gen(function* () {
    const capitalName = capitalize(name);
    const operationsEmpty = !(yield* hasGeneratedOperations(root, name));

    yield* Console.log(
      `\n🤖 Calling opencode to refine ${capitalName} SDK...`,
    );

    const specLocations =
      specInfo.submodulePaths.length > 0
        ? specInfo.submodulePaths.map((p) => `  - ${p}`).join("\n")
        : "  (no spec submodules)";

    const envVarName = `${name.toUpperCase().replace(/-/g, "_")}_API_KEY`;

    const initialPrompt = `
You are refining a newly scaffolded SDK package for ${capitalName} at packages/${name}/.

The package has been scaffolded with boilerplate files and the code generator has been run.

## Step 0: Understand the spec source

The spec submodules are at:
${specLocations}

Each submodule is a cloned git repo that IS the authoritative source for this SDK's API definition. **The submodule content is what you must work with — do NOT go fetch a spec from somewhere else.**

The submodule could contain ANY of these formats:
- An OpenAPI 3.x or Swagger 2.0 spec (JSON or YAML)
- A TypeScript SDK source (like packages/cloudflare/ uses)
- Smithy models (like packages/aws/ uses)
- Go types, protobuf definitions, or other IDL formats
- API documentation in Markdown, HTML, or other formats
- A combination of the above

**CRITICAL: Do NOT assume OpenAPI. Do NOT try to fetch an OpenAPI spec from the internet.** The submodule IS the spec source. Your job is to figure out what format it's in and write a generator that works with THAT format.

Your FIRST action must be to recursively list the contents of every submodule directory under packages/${name}/specs/ to understand the structure. Use \`find\` or \`ls -R\` on each submodule. Look for .json, .yaml, .yml, .ts, .go, .proto, .smithy, and .md files. Read the first few lines of candidates to understand what they contain.

After you understand the format:
- If it's OpenAPI → use \`generateFromOpenAPI\` from \`@distilled.cloud/core/openapi/generate\`
- If it's a TypeScript SDK → study packages/cloudflare/scripts/generate.ts for how to extract types from TS source
- If it's Smithy models → study packages/aws/scripts/generate.ts
- If it's something else → write a custom generator that parses the format and generates Effect operations

The scaffolded generate.ts is a **placeholder that throws an error**. You MUST replace it with a working generator for whatever format you find.
${
  operationsEmpty
    ? `
## ⚠️  GENERATION NOT YET CONFIGURED — operations directory is EMPTY

packages/${name}/src/operations/ only has a placeholder index.ts. The scaffolded generate.ts is a placeholder that needs to be replaced with a working generator.

After you figure out the spec format in Step 0:
1. Rewrite packages/${name}/scripts/generate.ts to work with whatever spec format you found in the submodule
2. Run \`bun run generate\` from packages/${name}/
3. List packages/${name}/src/operations/ — it MUST have more than just index.ts
4. If still empty, debug the generator and fix it.
`
    : ""
}
## Step 1: Write generate.ts

The scaffolded generate.ts is a placeholder that throws an error. Based on what you found in Step 0, **rewrite it entirely** with a working generator for the spec format you found.

- If OpenAPI: use \`generateFromOpenAPI\` from \`@distilled.cloud/core/openapi/generate\` (see packages/neon/scripts/generate.ts for an example)
- If TypeScript SDK: study packages/cloudflare/scripts/generate.ts
- If Smithy: study packages/aws/scripts/generate.ts
- If something else: write a custom generator

Run \`bun run generate\` from packages/${name}/ and confirm operations were generated (more than just index.ts in src/operations/).

## Step 2: Update credentials.ts

Based on the API spec/documentation you found, determine:
- The base URL for the API → set \`DEFAULT_API_BASE_URL\`
- The authentication scheme (Bearer token, API key header, OAuth, etc.) → update the \`Config\` interface and env var names

Update packages/${name}/src/credentials.ts accordingly.

## Step 3: Update client.ts

Based on the API spec/documentation, update:
- \`ApiErrorResponse\` schema to match the API's actual error shape
- \`getAuthHeaders\` — use the correct header (Bearer, X-API-Key, etc.)
- \`matchError\` — parse errors according to the actual format

Examples of error shapes:
\`\`\`typescript
// Simple: { message: "..." }
Schema.Struct({ message: Schema.String })

// With code: { code: "not_found", message: "..." }
Schema.Struct({ code: Schema.optional(Schema.String), message: Schema.String })

// Nested: { error: { type: "...", message: "..." } }
Schema.Struct({ error: Schema.Struct({ type: Schema.String, message: Schema.String }) })
\`\`\`

## Step 4: Update errors.ts

If the spec defines custom error types beyond standard HTTP status codes, add them as \`Schema.TaggedErrorClass\` entries following the existing Unknown${capitalName}Error pattern. Use \`Category.withServerError\`, \`Category.withParseError\`, etc.

## Step 5: Create README.md

Create a README.md at packages/${name}/README.md following the pattern of other SDKs (see packages/neon/README.md for a good example). The README must include:

1. **Title & description** — \`# @distilled.cloud/${name}\` followed by a one-line description of what the SDK covers and where the spec comes from
2. **Installation** — \`npm install @distilled.cloud/${name} effect\`
3. **Quick Start** — a working example using \`Effect.gen\`, importing an operation from \`@distilled.cloud/${name}/operations\`, using \`CredentialsFromEnv\`, and providing \`FetchHttpClient.layer\`
4. **Configuration** — list the environment variable(s) from credentials.ts (e.g. \`${envVarName}\`)
5. **Error Handling** — a code example showing \`Effect.catchTags\` with a typed error (e.g. \`NotFound\`) and the Unknown error class
6. **Services** — a bullet list of the key operation areas (group related operations, e.g. "Machines — create, start, stop, delete")
7. **License** — MIT

Use REAL operation names from the generated src/operations/ files. Read the operations/index.ts to see what's exported, then pick a representative "list" or "get" operation for the Quick Start example.

## Step 6: Final verification

Run these commands from packages/${name}/ and they MUST all pass:
1. \`bun run generate\` — must exit 0
2. \`ls src/operations/\` — must show MORE than just index.ts
3. \`bun run typecheck\` — must exit 0

If any fail, fix and retry until all pass.

## Rules

- Only modify files within packages/${name}/
- Do NOT create tests
- Do NOT modify packages/core/ or CI/workflow files
- Follow patterns from other SDKs (neon, planetscale, supabase)
- Use .ai-workspace/ for scratch files
`.trim();

    let attempt = 0;
    let sessionId: string | undefined;

    while (true) {
      attempt++;

      // On first attempt, send the full initial prompt.
      // On retries, continue the same session with a nudge to keep going.
      const isRetry = sessionId !== undefined;
      const hasOps = yield* hasGeneratedOperations(root, name);
      const prompt = isRetry
        ? `You were interrupted or timed out. Continue where you left off.${
            !hasOps
              ? ` The operations directory at packages/${name}/src/operations/ is still empty (only index.ts). You MUST get operations generated before you're done.`
              : ""
          } Pick up from whatever step you were on and finish all remaining steps through Step 6 (final verification).`
        : initialPrompt;

      const result = yield* runOpencode(prompt, {
        model: "anthropic/claude-opus-4-6",
        sessionId,
        cwd: root,
      }).pipe(
        Effect.catch((err: CommandError) =>
          Effect.gen(function* () {
            yield* Console.error(`\n⚠️  opencode failed: ${err.stderr}`);
            return {
              stdout: "",
              sessionId: undefined,
              killed: false,
            } as OpencodeResult;
          }),
        ),
      );

      // Capture session ID so retries continue the same conversation
      if (result.sessionId) {
        sessionId = result.sessionId;
      }

      if (result.killed) {
        yield* Console.log(
          `\n🔄 opencode got stuck (attempt ${attempt}), resuming session ${sessionId ?? "(unknown)"}...`,
        );
        continue;
      }

      // opencode exited 0 — but did it actually produce operations?
      const hasOpsNow = yield* hasGeneratedOperations(root, name);
      if (hasOpsNow) {
        yield* Console.log(
          `✅ OpenCode refinement complete — operations generated successfully`,
        );
        break;
      }

      // If we got here from an error (no sessionId captured), break
      if (!result.sessionId && !sessionId) {
        break;
      }

      yield* Console.log(
        `\n🔄 opencode exited successfully but operations directory is still empty (attempt ${attempt}), resuming session ${sessionId ?? "(unknown)"}...`,
      );
    }

    const finalHasOps = yield* hasGeneratedOperations(root, name);
    if (!finalHasOps) {
      yield* Console.log(
        `\n⚠️  Operations directory is still empty after refinement — you may need to manually check the spec path in packages/${name}/scripts/generate.ts`,
      );
    }
  });

// ============================================================================
// CLI Command Definition
// ============================================================================

const createSdk = Command.make(
  "create-sdk",
  {
    name: Argument.string("name").pipe(
      Argument.withDescription("SDK package name (e.g. stripe, neon, fly-io)"),
    ),
    specs: Flag.string("specs").pipe(
      Flag.withDescription(
        "Spec source (git repo URL or HTTP URL to fetch). Can be repeated.",
      ),
      Flag.atLeast(0),
    ),
    registerPackage: Flag.boolean("register-package").pipe(
      Flag.withDefault(false),
      Flag.withDescription(
        "Publish a 0.0.0 placeholder to npm as @distilled.cloud/<name>",
      ),
    ),
  },
  (config) =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const root = path.resolve(import.meta.dir, "..");

      yield* Console.log(`\n🚀 Creating SDK: @distilled.cloud/${config.name}`);
      yield* Console.log(
        `   Specs: ${config.specs.length > 0 ? Array.from(config.specs).join(", ") : "(none)"}`,
      );
      yield* Console.log(`   Register package: ${config.registerPackage}`);

      // Step 1: Register npm package
      if (config.registerPackage) {
        yield* registerNpmPackage(root, config.name);
      }

      // Step 2: Setup specs (submodule or mirror repo)
      const specInfo = yield* setupSpecs(
        root,
        config.name,
        Array.from(config.specs),
      );

      // Step 3: Scaffold the SDK package
      yield* scaffoldPackage(root, config.name, specInfo);

      // Step 4: Update CI workflows
      yield* updateTestYml(root, config.name);
      yield* updatePkgPrYml(root, config.name);
      yield* updateReleaseYml(root, config.name);

      // Step 5: Install dependencies and run generator
      yield* installAndGenerate(root, config.name);

      // Step 6: Refine with opencode
      yield* refineWithOpencode(root, config.name, specInfo);

      yield* Console.log(`
✨ SDK package created successfully!

  Package: @distilled.cloud/${config.name}
  Location: packages/${config.name}/
  ${config.registerPackage ? `NPM: https://www.npmjs.com/package/@distilled.cloud/${config.name}` : ""}

Next steps:
  1. Review the generated code in packages/${config.name}/src/
  2. Update credentials.ts with correct API base URL and auth scheme
  3. Add API key secrets to GitHub repository settings
  4. Run tests: cd packages/${config.name} && bun run test
  5. Update the website: add the new SDK card to www/distilled.cloud/index.html (SDK section)
`);
    }),
).pipe(
  Command.withDescription(
    "Create a new SDK package for the Distilled monorepo",
  ),
  Command.withExamples([
    {
      command:
        "bun scripts/create-sdk.ts stripe --specs https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json",
      description: "OpenAPI spec URL → creates distilled-spec-* mirror repo",
    },
    {
      command:
        "bun scripts/create-sdk.ts stripe --specs https://github.com/stripe/openapi.git",
      description: "Git repo → adds as direct submodule",
    },
    {
      command:
        "bun scripts/create-sdk.ts stripe --specs https://github.com/stripe/openapi.git --register-package",
      description: "Git repo + register placeholder on npm",
    },
  ]),
);

// ============================================================================
// Entry Point
// ============================================================================

const program = Command.run(createSdk, { version: "1.0.0" });

BunRuntime.runMain(Effect.provide(program, BunServices.layer));
