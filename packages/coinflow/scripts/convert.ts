#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Coinflow's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * Coinflow publishes ONE OpenAPI 3.1 document (mirrored at
 * `specs/spec-mirror-coinflow/specs/openapi.json`). Every operation carries
 * exactly one tag, so operations are bucketed by tag into one Smithy model —
 * one service module — each (`withdraw`, `merchant`, `card_tokenization`, …).
 *
 * Auth. An operation names at most one security scheme, and all of them are
 * headers. The merchant API key (`merchant` / `admin`, both `Authorization`)
 * is a credential, sent by CoinflowProtocol on every request. The others
 * identify the end user a call acts for, so they become per-call inputs:
 *
 *   wallet        → `authWallet` + `authBlockchain` (x-coinflow-auth-wallet,
 *                   x-coinflow-auth-blockchain: the spec defines the
 *                   blockchain scheme for wallet auth, and a withdrawer is
 *                   keyed by wallet + blockchain)
 *   userId        → `authUserId`      (x-coinflow-auth-user-id)
 *   sessionKey    → `authSessionKey`  (x-coinflow-auth-session-key, sensitive)
 *   embedSession  → `embedSession`    (x-coinflow-embed-session, sensitive)
 *
 * Errors. Coinflow failures are `{ msg }` (sometimes `{ message }`, or a
 * richer body such as a 451's `verificationLink`), and the meaning of a
 * status is per operation, so each status an operation declares becomes a
 * typed error class carrying the parsed `body`. 401/429/500/503 stay on the
 * shared status classes.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import {
  VERIFICATION_REQUIRED_BODY,
  VERIFICATION_REQUIRED_DOC,
  VERIFICATION_REQUIRED_MEMBERS,
} from "./verification-required.ts";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-coinflow/specs/openapi.json");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** `cardTokenization` → `card_tokenization`. */
const toSlug = (tag: string): string =>
  tag
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

interface AuthHeader {
  /** Wire header name. */
  readonly header: string;
  /** Input member name. */
  readonly member: string;
  /** The security scheme whose description documents the member. */
  readonly scheme: string;
  readonly schema: Record<string, unknown>;
  readonly sensitive: boolean;
}

/** Security scheme → the per-call headers it puts on the input. */
const AUTH_HEADERS: Record<string, readonly AuthHeader[]> = {
  wallet: [
    {
      header: "x-coinflow-auth-wallet",
      member: "authWallet",
      scheme: "wallet",
      schema: { type: "string" },
      sensitive: false,
    },
    {
      header: "x-coinflow-auth-blockchain",
      member: "authBlockchain",
      scheme: "blockchain",
      schema: { $ref: "#/components/schemas/Blockchain" },
      sensitive: false,
    },
  ],
  userId: [
    {
      header: "x-coinflow-auth-user-id",
      member: "authUserId",
      scheme: "userId",
      schema: { type: "string" },
      sensitive: false,
    },
  ],
  sessionKey: [
    {
      header: "x-coinflow-auth-session-key",
      member: "authSessionKey",
      scheme: "sessionKey",
      schema: { type: "string" },
      sensitive: true,
    },
  ],
  embedSession: [
    {
      header: "x-coinflow-embed-session",
      member: "embedSession",
      scheme: "embedSession",
      schema: { type: "string" },
      sensitive: true,
    },
  ],
  // The merchant API key: a credential, sent by the protocol.
  merchant: [],
  admin: [],
};

/**
 * Non-2xx statuses → typed error classes. 401/429/500/503 are the
 * converter's default statuses and ride the shared status classes. Every
 * 423 in the spec is "Customer is Blocked", which is not core's retryable
 * `Locked`.
 */
const STATUS_TO_ERROR_CLASS: Record<string, string> = {
  "400": "BadRequest",
  "402": "PaymentRequired",
  "403": "Forbidden",
  "404": "NotFound",
  "409": "Conflict",
  "410": "Gone",
  "412": "PreconditionFailed",
  "417": "ExpectationFailed",
  "422": "UnprocessableEntity",
  "423": "CustomerBlocked",
  "426": "UpgradeRequired",
  "428": "PreconditionRequired",
  "451": "VerificationRequired",
};

/** Each typed error keeps the message and the parsed failure body. */
const ERROR_MEMBERS = {
  message: { target: "smithy.api#String" },
  body: { target: "smithy.api#Document" },
};

/** The 451 body shape (see ./verification-required.ts). */
const verificationRequiredBody = {
  type: "structure",
  members: Object.fromEntries(
    VERIFICATION_REQUIRED_MEMBERS.map((m) => [
      m.name,
      {
        target: m.type === "string" ? "smithy.api#String" : "smithy.api#Document",
        ...(m.doc ? { traits: { "smithy.api#documentation": m.doc } } : {}),
      },
    ]),
  ),
  traits: { "smithy.api#documentation": VERIFICATION_REQUIRED_DOC },
};

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(
    `${specPath} not found — run \`pnpm specs:local coinflow\` (or specs:fetch) first`,
  );
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));
const schemes: Record<string, { description?: string }> =
  fullSpec.components?.securitySchemes ?? {};

// ---- 2. Security schemes → header parameters, bucket paths by tag ----------
const buckets = new Map<string, Record<string, Record<string, unknown>>>();
/** Per bucket: operationId → operation name. */
const operationNames = new Map<string, Record<string, string>>();
const authMembers = new Map<string, AuthHeader>(); // wire header → member
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    const route = `${method.toUpperCase()} ${pathTemplate}`;

    const required: string[] = (op.security ?? []).flatMap((req: object) => Object.keys(req));
    const headers: AuthHeader[] = [];
    for (const scheme of required) {
      const forScheme = AUTH_HEADERS[scheme];
      if (forScheme === undefined) {
        throw new Error(`${route}: unknown security scheme \`${scheme}\``);
      }
      headers.push(...forScheme);
    }
    if (headers.length > 0) {
      const declared = new Set(
        (op.parameters ?? []).map((p: any) => `${p?.in} ${String(p?.name).toLowerCase()}`),
      );
      op.parameters = [
        ...(op.parameters ?? []),
        ...headers
          .filter((h) => !declared.has(`header ${h.header}`))
          .map((h) => {
            authMembers.set(h.header, h);
            const description = schemes[h.scheme]?.description;
            return {
              in: "header",
              name: h.header,
              required: true,
              schema: h.schema,
              ...(description ? { description } : {}),
            };
          }),
      ];
    }

    const tag: string | undefined = Array.isArray(op.tags) ? op.tags[0] : undefined;
    if (tag === undefined) throw new Error(`${route} has no tag to place it in a module`);
    const slug = toSlug(tag);
    if (!buckets.has(slug)) buckets.set(slug, {});
    const bucketPaths = buckets.get(slug)!;

    // Ids are `<tag>_<Name>` (`withdraw_GetQuote`); the tag is the module,
    // so the operation is the rest (`withdraw.getQuote`).
    const prefix = `${tag}_`;
    if (typeof op.operationId === "string" && op.operationId.startsWith(prefix)) {
      const rest = op.operationId.slice(prefix.length);
      if (!operationNames.has(slug)) operationNames.set(slug, {});
      operationNames.get(slug)![op.operationId] = rest.charAt(0).toLowerCase() + rest.slice(1);
    }
    if (!bucketPaths[pathTemplate]) {
      const pathParams = (pathItem as Record<string, any>).parameters;
      bucketPaths[pathTemplate] = pathParams ? { parameters: pathParams } : {};
    }
    (bucketPaths[pathTemplate] as Record<string, unknown>)[method] = op;
  }
}

// ---- 3. Convert each bucket ------------------------------------------------
clearModels(outDir);

let written = 0;
let totalOps = 0;
for (const slug of [...buckets.keys()].sort()) {
  const paths = buckets.get(slug)!;
  const namespace = `com.coinflow.${slug}`;
  const model = convertOpenApiToSmithy(
    { ...fullSpec, paths },
    {
      deferNaming: true,
      namespace,
      serviceName: toPascal(slug),
      skipDeprecated: true,
      operationNames: operationNames.get(slug) ?? {},
      // The auth headers above, plus the spec's own per-call headers
      // (`x-device-id`, `x-coinflow-client-ip`, `x-coinflow-submerchant-id`).
      headerParams: true,
      statusToErrorClass: STATUS_TO_ERROR_CLASS,
      errorShapes: Object.fromEntries(
        Object.values(STATUS_TO_ERROR_CLASS).map((cls) => [
          cls,
          {
            members:
              cls === "VerificationRequired"
                ? {
                    ...ERROR_MEMBERS,
                    body: { target: `${namespace}#${VERIFICATION_REQUIRED_BODY}` },
                  }
                : ERROR_MEMBERS,
          },
        ]),
      ),
    },
  );

  const operations = Object.entries<any>(model.shapes).filter(([, s]) => s.type === "operation");
  if (operations.length === 0) continue; // all-deprecated bucket

  if (model.shapes[`${namespace}#VerificationRequired`] !== undefined) {
    const id = `${namespace}#${VERIFICATION_REQUIRED_BODY}`;
    if (model.shapes[id] !== undefined) throw new Error(`${slug}: the spec already defines ${id}`);
    model.shapes[id] = structuredClone(verificationRequiredBody);
  }

  // Name the auth header members like the rest of the input.
  for (const [id, shape] of Object.entries<any>(model.shapes)) {
    if (shape.type !== "structure" || !shape.members) continue;
    for (const [name, member] of Object.entries<any>({ ...shape.members })) {
      const auth = authMembers.get(member.traits?.["smithy.api#httpHeader"]);
      if (auth === undefined || name === auth.member) continue;
      if (shape.members[auth.member] !== undefined) {
        throw new Error(`${id}: \`${auth.member}\` is already a member; cannot rename ${name}`);
      }
      delete shape.members[name];
      shape.members[auth.member] = auth.sensitive
        ? { ...member, traits: { ...member.traits, "smithy.api#sensitive": {} } }
        : member;
    }
  }

  writeModel(path.join(outDir, `${slug}.json`), model);
  written++;
  totalOps += operations.length;
}

console.log(`✅ ${written} Smithy models (${totalOps} operations) → ${outDir}`);

await finalizeConvert({ root: rootDir });
