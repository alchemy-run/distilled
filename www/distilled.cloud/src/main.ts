import { createHighlighterCore, type ThemeRegistration } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import typescript from "shiki/langs/typescript.mjs";

// ============================================================================
// Shiki Theme (matching legacy distilled theme)
// ============================================================================

const distilledTheme: ThemeRegistration = {
  name: "distilled",
  type: "dark",
  colors: {
    "editor.background": "#18181b",
    "editor.foreground": "#fafafa",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#a1a1aa" },
    },
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: "#34d399" },
    },
    {
      scope: [
        "keyword",
        "storage.type",
        "storage.modifier",
        "keyword.control",
        "keyword.operator.new",
        "keyword.operator.expression",
      ],
      settings: { foreground: "#a855f7" },
    },
    {
      scope: [
        "entity.name.function",
        "meta.function-call",
        "support.function",
        "variable.function",
      ],
      settings: { foreground: "#60a5fa" },
    },
    {
      scope: [
        "variable",
        "variable.other",
        "variable.parameter",
        "entity.name",
      ],
      settings: { foreground: "#fafafa" },
    },
    {
      scope: ["variable.other.property", "meta.object-literal.key"],
      settings: { foreground: "#fafafa" },
    },
    {
      scope: ["constant.numeric"],
      settings: { foreground: "#60a5fa" },
    },
    {
      scope: ["constant.language", "constant.language.boolean"],
      settings: { foreground: "#a855f7" },
    },
    {
      scope: ["keyword.operator", "punctuation"],
      settings: { foreground: "#a1a1aa" },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
      ],
      settings: { foreground: "#34d399" },
    },
    {
      scope: ["entity.name.namespace", "entity.name.module"],
      settings: { foreground: "#34d399" },
    },
  ],
};

// ============================================================================
// Code Examples
// ============================================================================

const codeExamples: Record<string, string> = {
  hero: `import * as S3 from "distilled-aws/s3"

const bucket = yield* S3.getBucket({
  Bucket: "my-bucket"
}).pipe(
  Effect.catchTag("NoSuchBucket", () =>
    Effect.void
  )
)`,

  "tagged-errors": `const bucket = yield* S3.getBucket({
  Bucket: "my-bucket"
}).pipe(
  Effect.catchTag("NoSuchBucket", () =>
    Effect.succeed(null)
  ),
  Effect.catchTag("AccessDenied", () =>
    Effect.fail(new AuthError())
  )
)`,

  "retry-policies": `const result = yield* S3.getObject({
  Bucket: "my-bucket",
  Key: "data.json"
}).pipe(
  Effect.retry({
    while: (e) => e._tag === "SlowDown",
    schedule: Schedule.exponential("100 millis")
  }),
  Effect.timeout("5 seconds")
)`,

  "streaming-pagination": `// Stream all pages
yield* S3.listObjectsV2
  .pages({ Bucket: "my-bucket" })
  .pipe(Stream.runForEach(Console.log))

// Or stream individual items
yield* DynamoDB.scan
  .items({ TableName: "users" })
  .pipe(Stream.runCollect)`,

  "streaming-io": `// Upload a stream
yield* S3.putObject({
  Bucket: "my-bucket",
  Key: "large-file.bin",
  Body: Stream.fromIterable(chunks),
})

// Download as a stream
const { Body } = yield* S3.getObject({ ... })
const text = yield* Body.pipe(
  Stream.decodeText(),
  Stream.mkString
)`,

  "tree-shakeable": `// Only bundles getBucket and createBucket
import * as S3 from "distilled-aws/s3"

// NOT this:
// import { S3Client } from "@aws-sdk/client-s3"
// new S3Client() bundles ALL 100+ operations`,
};

// ============================================================================
// SDK Versions (build-time versions baked into HTML, updated at runtime from npm)
// ============================================================================

function fetchNpmVersions() {
  document
    .querySelectorAll<HTMLElement>(".badge[data-package]")
    .forEach((badge) => {
      const pkg = badge.dataset.package!;
      fetch(`https://registry.npmjs.org/@distilled.cloud/${pkg}/latest`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.version) {
            badge.textContent = `v${data.version}`;
          }
        })
        .catch(() => {
          // Keep the build-time version
        });
    });
}

// ============================================================================
// Initialize
// ============================================================================

async function init() {
  // Set copyright year
  const copyrightEl = document.getElementById("copyright");
  if (copyrightEl) {
    copyrightEl.innerHTML = `&copy; ${new Date().getFullYear()} distilled.cloud. Open source under MIT.`;
  }

  // Fetch latest npm versions (non-blocking, updates build-time versions if newer)
  fetchNpmVersions();

  // Load shiki with only TypeScript language (minimal bundle)
  const highlighter = await createHighlighterCore({
    themes: [distilledTheme],
    langs: [typescript],
    engine: createJavaScriptRegexEngine(),
  });

  // Hero code
  const heroCode = document.getElementById("hero-code");
  if (heroCode) {
    heroCode.innerHTML = highlighter.codeToHtml(codeExamples.hero, {
      lang: "typescript",
      theme: "distilled",
    });
  }

  // Feature code blocks
  document
    .querySelectorAll<HTMLElement>("[data-code]")
    .forEach((el) => {
      const key = el.dataset.code!;
      if (codeExamples[key]) {
        el.innerHTML = highlighter.codeToHtml(codeExamples[key], {
          lang: "typescript",
          theme: "distilled",
        });
      }
    });
}

init();
