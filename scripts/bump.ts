import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const REPO = "alchemy-run/distilled";
const PACKAGES_DIR = join(process.cwd(), "packages");

async function checkNpmVersion(
  packageName: string,
  version: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://registry.npmjs.org/${packageName}/${version}`,
    );
    return response.ok;
  } catch {
    return false;
  }
}

async function checkGithubTag(version: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/git/refs/tags/v${version}`,
    );
    return response.ok;
  } catch {
    return false;
  }
}

async function getPackageDirs(): Promise<string[]> {
  const entries = await readdir(PACKAGES_DIR, { withFileTypes: true });
  const dirs: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const pkgJsonPath = join(PACKAGES_DIR, entry.name, "package.json");
      try {
        await readFile(pkgJsonPath, "utf-8");
        dirs.push(entry.name);
      } catch {
        // not a package directory, skip
      }
    }
  }
  return dirs;
}

// --- Main ---

const versionInput = process.argv[2];

if (!versionInput) {
  console.error(
    "Please provide a version number or bump type (major, minor, patch)",
  );
  process.exit(1);
}

// Read current version from core as the source of truth
const corePackageJsonPath = join(PACKAGES_DIR, "core", "package.json");
const corePackageJson = JSON.parse(
  await readFile(corePackageJsonPath, "utf-8"),
);

let newVersion = "";

if (["major", "minor", "patch"].includes(versionInput)) {
  const currentVersion = corePackageJson.version;
  const versionMatch = currentVersion.match(/^(\d+)\.(\d+)\.(\d+)/);

  if (!versionMatch) {
    console.error(`Invalid current version format: ${currentVersion}`);
    process.exit(1);
  }

  const [, major, minor, patch] = versionMatch.map(Number);

  switch (versionInput) {
    case "major":
      newVersion = `${major + 1}.0.0`;
      break;
    case "minor":
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case "patch":
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    default:
      throw new Error(`Invalid bump type: ${versionInput}`);
  }

  console.log(
    `Bumping ${versionInput} version: ${currentVersion} -> ${newVersion}`,
  );
} else {
  if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(versionInput)) {
    console.error(
      "Version must be in format x.y.z or x.y.z-pre or use 'major', 'minor', 'patch'",
    );
    process.exit(1);
  }

  newVersion = versionInput;
  console.log(`Setting specific version: ${newVersion}`);
}

// Check if version already exists on npm (check core package as representative)
const npmExists = await checkNpmVersion(corePackageJson.name, newVersion);
if (npmExists) {
  console.error(`Version ${newVersion} already exists on npm`);
  process.exit(1);
}

const githubTagExists = await checkGithubTag(newVersion);
if (githubTagExists) {
  console.error(`Tag v${newVersion} already exists on GitHub`);
  process.exit(1);
}

// Update version in ALL packages and collect their npm names
const packageDirs = await getPackageDirs();
const packageNames: Set<string> = new Set();

for (const dir of packageDirs) {
  const pkgJsonPath = join(PACKAGES_DIR, dir, "package.json");
  const pkgJson = JSON.parse(await readFile(pkgJsonPath, "utf-8"));
  pkgJson.version = newVersion;
  await writeFile(pkgJsonPath, `${JSON.stringify(pkgJson, null, 2)}\n`);
  packageNames.add(pkgJson.name);
  console.log(`  Updated ${pkgJson.name} to ${newVersion}`);
}

// Update workspace versions in bun.lock so bun pm pack resolves workspace:* correctly.
// Only target entries whose "name" matches one of our workspace packages.
// The lockfile format has "name": "..." immediately before "version": "..." for each
// workspace entry, so we match that pair specifically.
const lockfilePath = join(process.cwd(), "bun.lock");
try {
  const lockfile = await readFile(lockfilePath, "utf-8");
  const lines = lockfile.split("\n");
  let updated = false;

  for (let i = 1; i < lines.length; i++) {
    const versionMatch = lines[i].match(/^(\s*"version": ")[^"]*(".*)/);
    if (!versionMatch) continue;

    // Look at the previous line for a "name" field matching one of our packages
    const nameMatch = lines[i - 1].match(/"name": "([^"]*)"/);
    if (!nameMatch || !packageNames.has(nameMatch[1])) continue;

    lines[i] = `${versionMatch[1]}${newVersion}${versionMatch[2]}`;
    updated = true;
    console.log(`  Updated ${nameMatch[1]} version in bun.lock`);
  }

  if (updated) {
    await writeFile(lockfilePath, lines.join("\n"));
  }
} catch {
  // bun.lock may not exist (e.g. fresh clone before install)
  console.log(`  Skipped bun.lock update (file not found)`);
}

console.log(`\nUpdated all packages to version ${newVersion}`);
