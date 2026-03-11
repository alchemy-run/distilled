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

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import * as path from "node:path";

const ROOT = path.resolve(import.meta.dir, "..");

// ============================================================================
// CLI Argument Parsing
// ============================================================================

interface Args {
  name: string;
  specs: string[];
  registerPackage: boolean;
}

function parseArgs(): Args {
  const argv = process.argv.slice(2);
  let name: string | undefined;
  const specs: string[] = [];
  let registerPackage = false;
  let parsingSpecs = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--register-package") {
      registerPackage = true;
      parsingSpecs = false;
    } else if (arg === "--specs") {
      parsingSpecs = true;
    } else if (parsingSpecs && !arg.startsWith("--")) {
      specs.push(arg);
    } else if (!arg.startsWith("--") && !name) {
      name = arg;
      parsingSpecs = false;
    } else {
      parsingSpecs = false;
    }
  }

  if (!name) {
    console.error(
      "Usage: bun scripts/create-sdk.ts <name> --specs <url-or-repo>... [--register-package]",
    );
    process.exit(1);
  }

  return { name, specs, registerPackage };
}

// ============================================================================
// Shell Helpers
// ============================================================================

// On Windows with shell: true, args containing spaces get re-split.
// Quote them so the shell treats each as a single token.
function shellQuoteArgs(args: string[]): string[] {
  if (process.platform !== "win32") return args;
  return args.map((a) => (a.includes(" ") ? `"${a}"` : a));
}

function run(
  cmd: string,
  args: string[],
  opts?: { cwd?: string; ignoreError?: boolean; interactive?: boolean },
): Promise<{ stdout: string; stderr: string; code: number }> {
  const isWin = process.platform === "win32";
  const quotedArgs = shellQuoteArgs(args);

  return new Promise((resolve, reject) => {
    // Interactive mode inherits stdio so the user can respond to prompts
    // (e.g. npm hardware key OTP, browser auth flows)
    if (opts?.interactive) {
      const cp = spawn(cmd, quotedArgs, {
        cwd: opts?.cwd ?? ROOT,
        stdio: "inherit",
        shell: isWin,
      });
      cp.on("close", (code: number) => {
        if (code !== 0 && !opts?.ignoreError) {
          reject(
            new Error(
              `Command failed (${code}): ${cmd} ${args.join(" ")}`,
            ),
          );
        } else {
          resolve({ stdout: "", stderr: "", code: code ?? 0 });
        }
      });
      cp.on("error", reject);
      return;
    }

    const cp = spawn(cmd, quotedArgs, {
      cwd: opts?.cwd ?? ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      shell: isWin,
    });
    let stdout = "";
    let stderr = "";
    cp.stdout.on("data", (d: Buffer) => {
      stdout += d.toString();
    });
    cp.stderr.on("data", (d: Buffer) => {
      stderr += d.toString();
      process.stderr.write(d);
    });
    cp.on("close", (code: number) => {
      if (code !== 0 && !opts?.ignoreError) {
        reject(
          new Error(
            `Command failed (${code}): ${cmd} ${args.join(" ")}\nstderr: ${stderr}`,
          ),
        );
      } else {
        resolve({ stdout, stderr, code });
      }
    });
    cp.on("error", reject);
  });
}

function runOpencode(
  prompt: string,
  opts?: { cwd?: string; model?: string },
): Promise<string> {
  const model = opts?.model ?? "anthropic/claude-opus-4-6";
  const cwd = opts?.cwd ?? ROOT;
  return new Promise((resolve, reject) => {
    const cp = spawn("opencode", ["run", "--model", model, prompt], {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32",
    });
    let stdout = "";
    let stderr = "";
    cp.stdout.on("data", (d: Buffer) => {
      stdout += d.toString();
    });
    cp.stderr.on("data", (d: Buffer) => {
      stderr += d.toString();
      process.stderr.write(d);
    });
    cp.on("close", (code: number) => {
      if (code === 0) resolve(stdout);
      else
        reject(
          new Error(`opencode exited with code ${code}\nstderr: ${stderr}`),
        );
    });
    cp.on("error", reject);
  });
}

// ============================================================================
// Step 1: Register NPM Package
// ============================================================================

async function registerNpmPackage(name: string): Promise<void> {
  const pkgName = `@distilled.cloud/${name}`;
  console.log(`\n📦 Registering npm package: ${pkgName}@0.0.0`);

  // Check if package already exists on npm
  // npm view returns 0 if found, non-zero if not (including 404)
  const { code, stdout } = await run(
    "npm",
    ["view", pkgName, "version"],
    { ignoreError: true },
  );

  if (code === 0 && stdout.trim().length > 0) {
    console.log(
      `⚠️  Package ${pkgName}@${stdout.trim()} already exists on npm, skipping registration`,
    );
    return;
  }

  // Also check specifically for 0.0.0 — registry propagation can be slow
  const { code: code2 } = await run(
    "npm",
    ["view", `${pkgName}@0.0.0`, "version"],
    { ignoreError: true },
  );

  if (code2 === 0) {
    console.log(
      `⚠️  Package ${pkgName}@0.0.0 already exists on npm, skipping registration`,
    );
    return;
  }

  // Create a temporary directory for the placeholder package
  const tmpDir = path.join(ROOT, ".ai-workspace", `npm-register-${name}`);
  mkdirSync(tmpDir, { recursive: true });

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

  writeFileSync(
    path.join(tmpDir, "package.json"),
    JSON.stringify(placeholderPkg, null, 2),
  );
  writeFileSync(
    path.join(tmpDir, "index.js"),
    `// Placeholder — this package will be replaced by the generated SDK.\nexport {};\n`,
  );

  const { code: publishCode } = await run(
    "npm",
    ["publish", "--access", "public"],
    { cwd: tmpDir, interactive: true, ignoreError: true },
  );

  if (publishCode === 0) {
    console.log(`✅ Published ${pkgName}@0.0.0`);
  } else {
    console.log(
      `⚠️  npm publish exited with code ${publishCode} — package may already exist or auth was cancelled. Continuing...`,
    );
  }
}

// ============================================================================
// Step 2: Setup Specs (Submodule or Spec Mirror Repo)
// ============================================================================

function isGitRepoUrl(url: string): boolean {
  return url.endsWith(".git") || url.match(/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/) !== null;
}

async function setupSpecsGitSubmodule(
  name: string,
  repoUrl: string,
): Promise<string> {
  const submodulePath = `packages/${name}/specs/${repoUrl.split("/").pop()?.replace(/\.git$/, "")}`;

  console.log(`\n🔗 Adding git submodule: ${repoUrl} → ${submodulePath}`);

  // Check if submodule already exists
  const gitmodules = existsSync(path.join(ROOT, ".gitmodules"))
    ? readFileSync(path.join(ROOT, ".gitmodules"), "utf8")
    : "";

  if (gitmodules.includes(submodulePath)) {
    console.log(`⚠️  Submodule ${submodulePath} already registered, skipping`);
    return submodulePath;
  }

  // Ensure parent dir exists
  const specsDir = path.join(ROOT, `packages/${name}/specs`);
  mkdirSync(specsDir, { recursive: true });

  await run("git", ["submodule", "add", repoUrl, submodulePath]);
  console.log(`✅ Submodule added: ${submodulePath}`);

  return submodulePath;
}

async function setupSpecMirrorRepo(
  name: string,
  specUrls: string[],
): Promise<string> {
  const repoName = `distilled-spec-${name}`;
  const repoFullName = `alchemy-run/${repoName}`;
  const submodulePath = `packages/${name}/specs/${repoName}`;

  console.log(
    `\n🏗️  Setting up spec mirror repo: ${repoFullName} for ${specUrls.length} URL(s)`,
  );

  // Check if the GitHub repo already exists
  const { code: repoExists } = await run(
    "gh",
    ["repo", "view", repoFullName, "--json", "name"],
    { ignoreError: true },
  );

  if (repoExists === 0) {
    console.log(`⚠️  Repo ${repoFullName} already exists on GitHub`);
  } else {
    // Create the repo on GitHub
    console.log(`Creating GitHub repo: ${repoFullName}`);
    await run("gh", [
      "repo",
      "create",
      repoFullName,
      "--public",
      "--description",
      `A git mirror of ${capitalize(name)}'s API spec. Updated daily.`,
    ]);
    console.log(`✅ Created GitHub repo: ${repoFullName}`);
  }

  // Build the spec mirror repo content locally
  const tmpDir = path.join(ROOT, ".ai-workspace", `spec-repo-${name}`);
  mkdirSync(path.join(tmpDir, ".meta"), { recursive: true });
  mkdirSync(path.join(tmpDir, ".github", "workflows"), { recursive: true });
  mkdirSync(path.join(tmpDir, "specs"), { recursive: true });

  // .gitignore
  writeFileSync(
    path.join(tmpDir, ".gitignore"),
    `node_modules/\n.env\ndist/\n*.tsbuildinfo\n`,
  );

  // readme.md
  const specUrlDisplay =
    specUrls.length === 1
      ? specUrls[0]
      : `${specUrls.length} API spec URLs`;

  writeFileSync(
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
  writeFileSync(
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
  writeFileSync(
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
    writeFileSync(
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
    // Multiple URLs — fetch all and write to separate files
    writeFileSync(
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
  writeFileSync(
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
  console.log("Initializing spec repo and pushing to GitHub...");

  // Check if it's already a git repo (idempotent)
  if (!existsSync(path.join(tmpDir, ".git"))) {
    await run("git", ["init"], { cwd: tmpDir });
    await run("git", ["checkout", "-b", "main"], { cwd: tmpDir });
  }

  // Install deps and fetch specs
  console.log("Installing deps in spec repo...");
  await run("bun", ["install"], { cwd: path.join(tmpDir, ".meta") });

  console.log("Fetching specs...");
  await run("bun", ["run", "fetch-specs"], {
    cwd: path.join(tmpDir, ".meta"),
  });

  // Commit and push
  await run("git", ["add", "-A"], { cwd: tmpDir });
  const { code: noChanges } = await run(
    "git",
    ["diff", "--cached", "--quiet"],
    { cwd: tmpDir, ignoreError: true },
  );

  if (noChanges !== 0) {
    await run("git", ["commit", "-m", "feat: initial spec fetch"], {
      cwd: tmpDir,
    });
  }

  // Set remote and push
  const { code: hasRemote } = await run(
    "git",
    ["remote", "get-url", "origin"],
    { cwd: tmpDir, ignoreError: true },
  );

  if (hasRemote !== 0) {
    await run(
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

  await run("git", ["push", "-u", "origin", "main", "--force"], {
    cwd: tmpDir,
  });

  console.log(`✅ Spec repo pushed to https://github.com/${repoFullName}`);

  // Now add as a submodule in the main repo
  const gitmodules = existsSync(path.join(ROOT, ".gitmodules"))
    ? readFileSync(path.join(ROOT, ".gitmodules"), "utf8")
    : "";

  if (gitmodules.includes(submodulePath)) {
    console.log(`⚠️  Submodule ${submodulePath} already registered, skipping`);
  } else {
    const specsDir = path.join(ROOT, `packages/${name}/specs`);
    mkdirSync(specsDir, { recursive: true });

    await run("git", [
      "submodule",
      "add",
      `https://github.com/${repoFullName}.git`,
      submodulePath,
    ]);
    console.log(`✅ Submodule added: ${submodulePath}`);
  }

  return submodulePath;
}

async function setupSpecs(
  name: string,
  specs: string[],
): Promise<{ submodulePaths: string[]; hasSpecMirror: boolean }> {
  if (specs.length === 0) {
    console.log("\n⚠️  No specs provided, skipping spec setup");
    return { submodulePaths: [], hasSpecMirror: false };
  }

  const gitRepos = specs.filter(isGitRepoUrl);
  const urls = specs.filter((s) => !isGitRepoUrl(s));
  const paths: string[] = [];

  // Add git repos as direct submodules
  for (const repo of gitRepos) {
    const p = await setupSpecsGitSubmodule(name, repo);
    paths.push(p);
  }

  // Create a distilled-spec-* mirror repo for any plain URLs
  if (urls.length > 0) {
    const p = await setupSpecMirrorRepo(name, urls);
    paths.push(p);
  }

  return { submodulePaths: paths, hasSpecMirror: urls.length > 0 };
}

// ============================================================================
// Step 3: Scaffold SDK Package
// ============================================================================

function scaffoldPackage(
  name: string,
  specInfo: { submodulePaths: string[]; hasSpecMirror: boolean },
): void {
  const pkgDir = path.join(ROOT, "packages", name);
  const srcDir = path.join(pkgDir, "src");
  const operationsDir = path.join(srcDir, "operations");
  const scriptsDir = path.join(pkgDir, "scripts");
  const patchesDir = path.join(pkgDir, "patches");
  const testDir = path.join(pkgDir, "test");

  console.log(`\n🏗️  Scaffolding SDK package: packages/${name}/`);

  // Create directories
  for (const dir of [srcDir, operationsDir, scriptsDir, patchesDir, testDir]) {
    mkdirSync(dir, { recursive: true });
  }

  const capitalName = capitalize(name);

  // Derive submodule names from paths (last segment of each path)
  const submoduleNames = specInfo.submodulePaths.map(
    (p) => p.split("/").pop()!,
  );

  // --- package.json ---
  if (!existsSync(path.join(pkgDir, "package.json"))) {
    // specs:fetch and specs:update handle all submodules
    const specsFetchCmds = submoduleNames.map(
      (sm) =>
        `git submodule update --force --init --recursive specs/${sm} && git -C specs/${sm} checkout -- .`,
    );
    const specsUpdateCmds = submoduleNames.map(
      (sm) =>
        `git -C specs/${sm} fetch && git -C specs/${sm} checkout main && git -C specs/${sm} pull`,
    );

    writeFileSync(
      path.join(pkgDir, "package.json"),
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
              "bun run scripts/generate.ts && oxfmt --write src && oxlint --fix src",
            "specs:fetch": specsFetchCmds.join(" && ") || "echo 'No specs configured'",
            "specs:update": specsUpdateCmds.join(" && ") || "echo 'No specs configured'",
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
    console.log("  ✅ package.json");
  } else {
    console.log("  ⚠️  package.json already exists, skipping");
  }

  // --- tsconfig.json ---
  if (!existsSync(path.join(pkgDir, "tsconfig.json"))) {
    writeFileSync(
      path.join(pkgDir, "tsconfig.json"),
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
    console.log("  ✅ tsconfig.json");
  } else {
    console.log("  ⚠️  tsconfig.json already exists, skipping");
  }

  // --- src/traits.ts ---
  writeIfNotExists(
    path.join(srcDir, "traits.ts"),
    `/**
 * Re-export the shared traits system from sdk-core.
 */
export * from "@distilled.cloud/core/traits";
`,
  );

  // --- src/category.ts ---
  writeIfNotExists(
    path.join(srcDir, "category.ts"),
    `/**
 * Re-export the shared category system from sdk-core.
 */
export * from "@distilled.cloud/core/category";
`,
  );

  // --- src/sensitive.ts ---
  writeIfNotExists(
    path.join(srcDir, "sensitive.ts"),
    `/**
 * Re-export sensitive data schemas from sdk-core.
 */
export * from "@distilled.cloud/core/sensitive";
`,
  );

  // --- src/errors.ts ---
  writeIfNotExists(
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
  const envVarName = `${name.toUpperCase().replace(/-/g, "_")}_API_KEY`;
  writeIfNotExists(
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
  writeIfNotExists(
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
    Authorization: \`Bearer \${creds.apiKey}\`,
  }),
  matchError,
  ParseError: ${capitalName}ParseError as any,
});
`,
  );

  // --- src/retry.ts ---
  writeIfNotExists(
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
  writeIfNotExists(
    path.join(srcDir, "index.ts"),
    `/**
 * ${capitalName} SDK for Effect
 *
 * @example
 * \`\`\`ts
 * import * as ${capitalName} from "@distilled.cloud/${name}";
 * \`\`\`
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
  writeIfNotExists(
    path.join(operationsDir, "index.ts"),
    `// Generated operations will be placed here by the code generator.\n// Run \`bun run generate\` to populate this directory.\n`,
  );

  // --- scripts/generate.ts ---
  // Try to find the primary OpenAPI spec file across all submodules.
  // The opencode refinement step will fix this if it's wrong.
  function findSpecPath(): string {
    for (const sm of submoduleNames) {
      const candidates = [
        `specs/${sm}/specs/openapi.json`,
        `specs/${sm}/openapi/spec3.json`,
        `specs/${sm}/openapi.json`,
        `specs/${sm}/spec/openapi.json`,
        `specs/${sm}/api/openapi.json`,
        `specs/${sm}/openapi/spec3.yaml`,
      ];
      const found = candidates.find((p) => existsSync(path.join(pkgDir, p)));
      if (found) return found;
    }
    // Fallback: best guess based on what type of specs we have
    if (specInfo.hasSpecMirror) {
      return `specs/distilled-spec-${name}/specs/openapi.json`;
    }
    if (submoduleNames[0]) {
      return `specs/${submoduleNames[0]}/openapi/spec3.json`;
    }
    return `specs/openapi.json`;
  }
  const specPath = findSpecPath();

  writeIfNotExists(
    path.join(scriptsDir, "generate.ts"),
    `/**
 * ${capitalName} SDK Code Generator
 *
 * Uses the shared OpenAPI generator from sdk-core to generate operations
 * from the ${capitalName} OpenAPI spec.
 */
import * as path from "path";
import { generateFromOpenAPI } from "@distilled.cloud/core/openapi/generate";

const rootDir = path.join(import.meta.dir, "..");

generateFromOpenAPI({
  specPath: path.join(rootDir, "${specPath}"),
  patchDir: path.join(rootDir, "patches"),
  outputDir: path.join(rootDir, "src/operations"),
  importPrefix: "..",
  clientImport: "../client",
  traitsImport: "../traits",
  sensitiveImport: "../sensitive",
  errorsImport: "../errors",
  includeOperationErrors: false, // ${capitalName} handles errors globally by HTTP status
  skipDeprecated: true,
});
`,
  );

  console.log(
    "  ✅ All source files scaffolded (category, traits, sensitive, errors, credentials, client, retry, index, operations/index, scripts/generate)",
  );
}

// ============================================================================
// Step 4: Update CI Workflows
// ============================================================================

function updateTestYml(name: string): void {
  const testYmlPath = path.join(ROOT, ".github", "workflows", "test.yml");
  let content = readFileSync(testYmlPath, "utf8");

  // Check if already present
  if (content.includes(`ci-${name}:`)) {
    console.log(`\n⚠️  test.yml already has ci-${name}, skipping`);
    return;
  }

  console.log(`\n📝 Updating test.yml with ci-${name} job`);

  // Add to detect-changes outputs
  const outputsMatch = content.match(
    /(      supabase: \$\{\{ steps\.changes\.outputs\.supabase \}\})/,
  );
  if (outputsMatch) {
    content = content.replace(
      outputsMatch[1],
      `${outputsMatch[1]}\n      ${name}: \${{ steps.changes.outputs.${name} }}`,
    );
  }

  // Add to detect-changes filters
  const filtersMatch = content.match(
    /(            supabase:\n              - 'packages\/supabase\/\*\*'\n              - 'packages\/core\/\*\*')/,
  );
  if (filtersMatch) {
    content = content.replace(
      filtersMatch[1],
      `${filtersMatch[1]}\n            ${name}:\n              - 'packages/${name}/**'\n              - 'packages/core/**'`,
    );
  }

  // Add CI job (check only, no test — user can add secrets/test later)
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

  writeFileSync(testYmlPath, content);
  console.log(`  ✅ Added ci-${name} job to test.yml`);
}

function updatePkgPrYml(name: string): void {
  const ymlPath = path.join(ROOT, ".github", "workflows", "pkg-pr.yml");
  let content = readFileSync(ymlPath, "utf8");

  if (content.includes(`pkg-pr-${name}:`)) {
    console.log(`\n⚠️  pkg-pr.yml already has pkg-pr-${name}, skipping`);
    return;
  }

  console.log(`\n📝 Updating pkg-pr.yml with pkg-pr-${name} job`);

  // Add to detect-changes outputs
  const outputsMatch = content.match(
    /(      supabase: \$\{\{ steps\.changes\.outputs\.supabase \}\})/,
  );
  if (outputsMatch) {
    content = content.replace(
      outputsMatch[1],
      `${outputsMatch[1]}\n      ${name}: \${{ steps.changes.outputs.${name} }}`,
    );
  }

  // Add to detect-changes filters
  const filtersMatch = content.match(
    /(            supabase:\n              - 'packages\/supabase\/\*\*')/,
  );
  if (filtersMatch) {
    content = content.replace(
      filtersMatch[1],
      `${filtersMatch[1]}\n            ${name}:\n              - 'packages/${name}/**'`,
    );
  }

  // Add pkg-pr job after the last existing one (supabase)
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

  writeFileSync(ymlPath, content);
  console.log(`  ✅ Added pkg-pr-${name} job to pkg-pr.yml`);
}

function updateReleaseYml(name: string): void {
  const ymlPath = path.join(ROOT, ".github", "workflows", "release.yml");
  let content = readFileSync(ymlPath, "utf8");

  // Check if the PACKAGES array already includes the name
  const pkgArrayMatch = content.match(/PACKAGES=\(([^)]+)\)/);
  if (pkgArrayMatch) {
    const pkgs = pkgArrayMatch[1].trim().split(/\s+/);
    if (pkgs.includes(name)) {
      console.log(`\n⚠️  release.yml already includes ${name}, skipping`);
      return;
    }
  }

  console.log(`\n📝 Updating release.yml with ${name}`);

  // Add to PACKAGES array
  content = content.replace(
    /PACKAGES=\(([^)]+)\)/,
    (match, pkgList: string) => {
      const trimmed = pkgList.trim();
      return `PACKAGES=(${trimmed} ${name})`;
    },
  );

  writeFileSync(ymlPath, content);
  console.log(`  ✅ Added ${name} to release.yml PACKAGES`);
}

// ============================================================================
// Step 5: Run Generation & OpenCode for SDK Refinement
// ============================================================================

async function installAndGenerate(name: string): Promise<void> {
  const pkgDir = path.join(ROOT, "packages", name);

  console.log("\n📦 Running bun install...");
  await run("bun", ["install"], { cwd: ROOT });

  console.log("\n🔨 Building core...");
  await run("bun", ["run", "build"], {
    cwd: path.join(ROOT, "packages", "core"),
  });

  console.log("\n🔧 Fetching specs...");
  await run("bun", ["run", "specs:fetch"], {
    cwd: pkgDir,
    ignoreError: true,
  });

  console.log("\n⚡ Running code generation...");
  await run("bun", ["run", "generate"], {
    cwd: pkgDir,
    ignoreError: true,
  });
}

async function refineWithOpencode(
  name: string,
  specInfo: { submodulePaths: string[]; hasSpecMirror: boolean },
): Promise<void> {
  const capitalName = capitalize(name);

  console.log(`\n🤖 Calling opencode to refine ${capitalName} SDK...`);

  const specLocations =
    specInfo.submodulePaths.length > 0
      ? specInfo.submodulePaths
          .map((p) => `  - ${p}`)
          .join("\n")
      : "  (no spec submodules)";

  const prompt = `
Load the "refine-sdk" skill for context.

You are refining a newly scaffolded SDK package for ${capitalName} at packages/${name}/.

The package has been scaffolded with boilerplate files and the code generator has been run.

The following spec submodules are available:
${specLocations}

There may be multiple spec sources — explore all of them to understand what each contains (OpenAPI specs, reference SDKs, supplementary schemas, etc.) and how they should be used together.

Please review and refine the following files:

1. **packages/${name}/scripts/generate.ts** — Verify the specPath points to a real OpenAPI spec file. Explore all the spec submodules under packages/${name}/specs/ to find where the actual spec JSON/YAML file(s) are. Update the path if needed. If the spec has been found and the operations directory is empty or has only the placeholder, run \`bun run generate\` from packages/${name}/.

2. **packages/${name}/src/credentials.ts** — Update the DEFAULT_API_BASE_URL to the correct base URL for the ${capitalName} API. Update the environment variable name(s) if needed. Look at the OpenAPI spec to determine the correct base URL and authentication scheme.

3. **packages/${name}/src/client.ts** — Update the API error response schema to match ${capitalName}'s actual error format. Update the authentication header format if needed (e.g., some APIs use \`X-API-Key\` instead of \`Bearer\` tokens). Refer to the OpenAPI spec for the correct error shape and auth scheme.

4. **packages/${name}/src/errors.ts** — If the OpenAPI spec has custom error codes or types beyond standard HTTP errors, add them as tagged error classes following the pattern of the existing Unknown${capitalName}Error.

Review the generated operations in packages/${name}/src/operations/ to make sure they look reasonable. If something seems wrong with generation, check the spec path and try regenerating.

5. **Final verification** — As your LAST step, you MUST run the following commands from packages/${name}/ and ensure they succeed:
   - \`bun run generate\` — regenerate from spec (must exit 0)
   - \`bun run typecheck\` — type check the package (must exit 0)
   If either fails, fix the issue and re-run until both pass.

DO NOT create tests. DO NOT modify files in packages/core/. DO NOT modify any CI/workflow files.
Only modify files within packages/${name}/.

Use .ai-workspace/ if you need a scratch area.
`.trim();

  await runOpencode(prompt, { model: "anthropic/claude-opus-4-6" });

  console.log(`✅ OpenCode refinement complete`);
}

// ============================================================================
// Utilities
// ============================================================================

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function writeIfNotExists(filePath: string, content: string): void {
  if (!existsSync(filePath)) {
    writeFileSync(filePath, content);
  }
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const args = parseArgs();
  const { name, specs, registerPackage } = args;

  console.log(`\n🚀 Creating SDK: @distilled.cloud/${name}`);
  console.log(`   Specs: ${specs.length > 0 ? specs.join(", ") : "(none)"}`);
  console.log(`   Register package: ${registerPackage}`);

  // Step 1: Register npm package
  if (registerPackage) {
    await registerNpmPackage(name);
  }

  // Step 2: Setup specs (submodule or mirror repo)
  const specInfo = await setupSpecs(name, specs);

  // Step 3: Scaffold the SDK package
  scaffoldPackage(name, specInfo);

  // Step 4: Update CI workflows
  updateTestYml(name);
  updatePkgPrYml(name);
  updateReleaseYml(name);

  // Step 5: Install dependencies and run generator
  await installAndGenerate(name);

  // Step 6: Refine with opencode
  await refineWithOpencode(name, specInfo);

  const pkgDir = path.join(ROOT, "packages", name);

  console.log(`
✨ SDK package created successfully!

  Package: @distilled.cloud/${name}
  Location: packages/${name}/
  ${registerPackage ? `NPM: https://www.npmjs.com/package/@distilled.cloud/${name}` : ""}

Next steps:
  1. Review the generated code in packages/${name}/src/
  2. Update credentials.ts with correct API base URL and auth scheme
  3. Add API key secrets to GitHub repository settings
  4. Run tests: cd packages/${name} && bun run test
`);
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err);
  process.exit(1);
});
