import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as Layer from "effect/Layer";
import { FetchHttpClient } from "effect/unstable/http";
import {
  Credentials,
  DEFAULT_API_BASE_URL,
  fromApiToken,
} from "@distilled.cloud/cloudflare/Credentials";
import * as Workers from "@distilled.cloud/cloudflare/workers";

// =============================================================================
// Config
// =============================================================================

const WORKER_NAME = "distilled-cloud-website";
const DIST_DIR = path.resolve(import.meta.dirname, "../dist");
const SCRIPT_FILENAME = "worker.mjs";

const WORKER_SCRIPT = `
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
`.trim();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// =============================================================================
// MIME types
// =============================================================================

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
  ".map": "application/json",
};

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] ?? "application/octet-stream";
}

// =============================================================================
// Asset Manifest
// =============================================================================

interface ManifestEntry {
  hash: string;
  size: number;
}

function buildManifest(directory: string): Record<string, ManifestEntry> {
  const manifest: Record<string, ManifestEntry> = {};

  function walk(dir: string, base: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = path.join(base, entry.name);
      if (entry.isDirectory()) {
        walk(full, rel);
      } else if (entry.isFile()) {
        const content = fs.readFileSync(full);
        const ext = path.extname(rel).substring(1);
        const hash = crypto
          .createHash("sha256")
          .update(content.toString("base64") + ext)
          .digest("hex")
          .slice(0, 32);
        const manifestPath = `/${rel.replace(/\\/g, "/")}`;
        manifest[manifestPath] = { hash, size: content.length };
      }
    }
  }

  walk(directory, "");
  return manifest;
}

// =============================================================================
// Asset Upload
// =============================================================================

/**
 * Upload a bucket of assets using Workers.createAssetUpload.
 *
 * The asset upload endpoint requires the upload session JWT from
 * createScriptAssetUpload, which the SDK maps to the Authorization header.
 */
function uploadBucket(
  accountId: string,
  uploadJwt: string,
  bucket: string[],
  manifest: Record<string, ManifestEntry>,
  directory: string,
): Effect.Effect<
  string | undefined,
  Workers.CreateAssetUploadError,
  HttpClient.HttpClient | Credentials
> {
  // Build the body as Record<hash, File> with correct MIME types
  const body: Record<string, File> = {};
  for (const hash of bucket) {
    const entry = Object.entries(manifest).find(([, m]) => m.hash === hash);
    if (!entry) throw new Error(`No file found for hash: ${hash}`);
    const [relPath] = entry;
    const fullPath = path.join(directory, relPath);
    const content = fs.readFileSync(fullPath);
    const contentType = getContentType(fullPath);
    body[hash] = new File([content.toString("base64")], hash, {
      type: contentType,
    });
  }
  return Workers.createAssetUpload({
    accountId,
    base64: true,
    jwtToken: uploadJwt,
    body,
  }).pipe(
    Effect.map((res) => res.jwt ?? undefined),
  );
}

// =============================================================================
// Layers
// =============================================================================

const ApiTokenLayer = fromApiToken({
  apiToken: requireEnv("CLOUDFLARE_API_TOKEN"),
  apiBaseUrl: DEFAULT_API_BASE_URL,
});

const BaseLayers = Layer.mergeAll(FetchHttpClient.layer, ApiTokenLayer);

// =============================================================================
// Deploy
// =============================================================================

const deploy = Effect.gen(function* () {
  const accountId = requireEnv("ACCOUNT_ID");
  const zoneId = requireEnv("ZONE_ID");

  if (!fs.existsSync(DIST_DIR)) {
    return yield* Effect.fail(
      new Error(`dist/ not found. Run 'bun run build' first.`),
    );
  }

  // 1. Build manifest
  console.log("Building asset manifest...");
  const manifest = buildManifest(DIST_DIR);
  const fileCount = Object.keys(manifest).length;
  console.log(`  ${fileCount} files`);

  // 2. Ensure worker exists (create if not)
  console.log(`Ensuring worker "${WORKER_NAME}" exists...`);
  const worker = yield* Workers.getBetaWorker({
    workerId: WORKER_NAME,
    accountId,
  }).pipe(
    Effect.catch(() =>
      Effect.gen(function* () {
        console.log("  Creating worker...");
        return yield* Workers.createBetaWorker({
          accountId,
          name: WORKER_NAME,
        });
      }),
    ),
  );
  console.log(`  Worker ID: ${worker.id}`);

  // 3. Create asset upload session
  console.log("Starting asset upload session...");
  const session = yield* Workers.createScriptAssetUpload({
    accountId,
    scriptName: WORKER_NAME,
    manifest,
  });

  if (!session.jwt) {
    return yield* Effect.fail(new Error("No JWT returned from upload session"));
  }

  let completionJwt = session.jwt;

  // 4. Upload assets to buckets
  const buckets = session.buckets ?? [];
  if (buckets.length === 0) {
    console.log("  No new assets to upload (all cached)");
  } else {
    console.log(`  Uploading ${buckets.length} bucket(s)...`);

    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i]!;
      console.log(
        `  Bucket ${i + 1}/${buckets.length} (${bucket.length} files)`,
      );
      const jwt = yield* uploadBucket(
        accountId,
        session.jwt!,
        bucket,
        manifest,
        DIST_DIR,
      );
      if (jwt) completionJwt = jwt;
    }
    console.log("  Assets uploaded");
  }

  // 5. Create worker version with assets
  console.log("Creating worker version...");
  const version = yield* Workers.createBetaWorkerVersion({
    workerId: worker.id,
    accountId,
    mainModule: SCRIPT_FILENAME,
    compatibilityDate: new Date().toISOString().split("T")[0]!,
    bindings: [{ type: "assets", name: "ASSETS" }],
    assets: {
      jwt: completionJwt,
      config: {
        htmlHandling: "auto-trailing-slash",
        notFoundHandling: "404-page",
      },
    },
    modules: [
      {
        name: SCRIPT_FILENAME,
        contentType: "application/javascript+module",
        contentBase64: Buffer.from(WORKER_SCRIPT).toString("base64"),
      },
    ],
  });
  console.log(`  Version: ${version.id}`);

  // 6. Deploy version (100% traffic)
  console.log("Deploying...");
  yield* Workers.createScriptDeployment({
    scriptName: WORKER_NAME,
    accountId,
    strategy: "percentage",
    versions: [{ percentage: 100, versionId: version.id }],
  });

  // 7. Attach custom domain
  console.log("Attaching domain distilled.cloud...");
  yield* Workers.putDomain({
    accountId,
    hostname: "distilled.cloud",
    service: WORKER_NAME,
    zoneId,
  });

  console.log("Deployed to https://distilled.cloud");
});

// =============================================================================
// Run
// =============================================================================

Effect.runPromise(deploy.pipe(Effect.provide(BaseLayers))).catch((err) => {
  if (err && typeof err === "object" && "_tag" in err) {
    console.error(`Deploy failed: [${err._tag}] ${err.message ?? ""}`);
  } else {
    console.error("Deploy failed:", err);
  }
  process.exit(1);
});
