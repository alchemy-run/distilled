#!/usr/bin/env -S node --conditions=bun
/**
 * convert — RFC 8555 (ACME) → `.generated-specs/acme.json`.
 *
 * ACME is a protocol, so its definition is the RFC, snapshotted by the spec
 * mirror as `specs/spec-mirror-acme/specs/rfc8555.txt`. The RFC defines
 * every JSON object field in one layout, which convert parses:
 *
 *      status (required, string):  The status of this account.  Possible
 *         values are "valid", "deactivated", and "revoked".  …
 *
 * so each member's name, type, requiredness and documentation come from the
 * RFC: the resource objects (§7.1.1–7.1.4), the request bodies (§7.3, §7.4,
 * §7.6), and the challenges (§8, §8.3). The error types are §6.7's table,
 * and the directory's resource URLs §7.1.1's table.
 *
 * What the RFC states only in prose is in the tables below: which object
 * each request and response is, the operations and their errors (the
 * protocol resolves every URL from the directory or from a URL the CA
 * returned, so the URIs only name the operation), and the shapes for
 * headers and documents that are not JSON objects (`Replay-Nonce`,
 * `Location`, the PEM chain, RFC 7807 problem documents, the JWS of an
 * external account binding). Where CAs differ from the RFC, `patches/`
 * says so.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { ERROR_MATCHERS_TRAIT } from "@distilled.cloud/core/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const root = path.resolve(import.meta.dirname, "..");
const rfcPath = resolveSpecPath(root, "specs/spec-mirror-acme/specs/rfc8555.txt");
const outDir = path.join(root, ".generated-specs");
const NS = "org.ietf.acme";
const id = (name: string) => `${NS}#${name}`;

// ============================================================================
// RFC text
// ============================================================================

/** The RFC without page headers and footers, so paragraphs read through. */
const rfc = fs
  .readFileSync(rfcPath, "utf8")
  .replace(/\n+[^\n]*\[Page \d+\]\n\f\nRFC 8555[^\n]*\n+/g, "\n");

interface Field {
  readonly name: string;
  readonly required: boolean;
  readonly type: string;
  readonly doc: string;
  /** Indent of the definition: 3 for top-level fields, 6 for nested ones. */
  readonly indent: number;
}

/** Field definitions per section number (`"7.1.2"` → its fields, in order). */
const fieldsBySection = new Map<string, Field[]>();
{
  let section = "";
  const lines = rfc.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const heading = /^(\d+(?:\.\d+)*)\.\s{2}\S/.exec(lines[i]!);
    if (heading) section = heading[1]!;
    const m = /^( {3,})(\S+) \((required|optional)[^)]*?, ([^)]+)\):\s+(.*)$/.exec(lines[i]!);
    if (!m) continue;
    const doc = [m[5]!];
    while (
      i + 1 < lines.length &&
      /^ {6,}\S/.test(lines[i + 1]!) &&
      !/^ +\S+ \((required|optional)/.test(lines[i + 1]!)
    ) {
      doc.push(lines[++i]!.trim());
    }
    const list = fieldsBySection.get(section) ?? [];
    list.push({
      name: m[2]!,
      required: m[3] === "required",
      type: m[4]!.trim(),
      doc: doc.join(" ").replace(/\s+/g, " ").trim(),
      indent: m[1]!.length,
    });
    fieldsBySection.set(section, list);
  }
}

const field = (section: string, name: string, indent = 3): Field => {
  const f = fieldsBySection.get(section)?.find((x) => x.name === name && x.indent === indent);
  if (f === undefined) throw new Error(`RFC 8555 §${section} defines no field \`${name}\``);
  return f;
};

/** Rows of a `| a | b |` table that starts after `marker`, joined across wrapped lines. */
const table = (marker: string): Array<[string, string]> => {
  const start = rfc.indexOf(marker);
  if (start === -1) throw new Error(`RFC 8555 has no "${marker}"`);
  const rows: Array<[string, string]> = [];
  let inTable = false;
  for (const line of rfc.slice(start).split("\n")) {
    const cells = /^\s*\|(.*)\|(.*)\|\s*$/.exec(line);
    if (!cells) {
      if (inTable && !/^\s*\+[-+]+\+\s*$/.test(line)) break;
      continue;
    }
    if (!inTable) {
      inTable = true; // the header row
      continue;
    }
    const [a, b] = [cells[1]!.trim(), cells[2]!.trim()];
    if (a) rows.push([a, b]);
    else if (b && rows.length) rows[rows.length - 1]![1] += ` ${b}`;
  }
  return rows;
};

// ============================================================================
// Model
// ============================================================================

const shapes: Record<string, any> = {};

const pascal = (s: string) =>
  s
    .replace(/[A-Z]+(?=[A-Z]|$)/g, (run) => run[0] + run.slice(1).toLowerCase())
    .replace(/^./, (c) => c.toUpperCase());

type Target = string;

/** A member from an RFC field. `object` fields need `target`. */
const member = (
  owner: string,
  f: Field,
  opts: { readonly target?: Target; readonly required?: boolean } = {},
): [string, any] => {
  const scalar: Record<string, string> = {
    string: "smithy.api#String",
    boolean: "smithy.api#Boolean",
    int: "smithy.api#Integer",
  };
  let target: string;
  const list = /^array of (\w+?)s?$/.exec(f.type);
  if (list) {
    const item = scalar[list[1]!] ?? opts.target;
    if (item === undefined) throw new Error(`${owner}.${f.name}: no target for ${f.type}`);
    target = id(`${owner}${pascal(f.name)}List`);
    shapes[target] = { type: "list", member: { target: item }, traits: {} };
  } else {
    const t = scalar[f.type] ?? opts.target;
    if (t === undefined) throw new Error(`${owner}.${f.name}: no target for ${f.type}`);
    target = t;
  }
  const required = opts.required ?? f.required;
  return [
    f.name,
    {
      target,
      traits: {
        "smithy.api#documentation": f.doc,
        ...(required ? { "smithy.api#required": {} } : {}),
      },
    },
  ];
};

const structure = (
  name: string,
  members: Array<[string, any]>,
  traits: Record<string, unknown> = {},
) => {
  shapes[id(name)] = { type: "structure", members: Object.fromEntries(members), traits };
};

/** A plain member defined by the protocol, not an RFC object field. */
const own = (
  name: string,
  doc: string,
  required = false,
  target = "smithy.api#String",
): [string, any] => [
  name,
  {
    target,
    traits: { "smithy.api#documentation": doc, ...(required ? { "smithy.api#required": {} } : {}) },
  },
];

/** The absolute URL every POST-as-GET and resource update addresses. */
const urlLabel: [string, any] = [
  "url",
  {
    target: "smithy.api#String",
    traits: {
      "smithy.api#httpLabel": {},
      "smithy.api#required": {},
      "smithy.api#documentation": "Absolute URL of the resource, as returned by the CA.",
    },
  },
];
const input = { "smithy.api#input": {} };

// §7.1.1 Directory. The RFC's table lists the resource URLs; `newAuthz` is
// absent on servers without pre-authorization (§7.4.1), and `keyChange` on
// CAs that do not offer key rollover.
const OPTIONAL_DIRECTORY_URLS = new Set(["newAuthz", "keyChange"]);
structure(
  "Directory",
  [
    ...table("| Field      | URL in Value").map(([name, what]): [string, any] =>
      own(name, `URL of the ${what.toLowerCase()} resource.`, !OPTIONAL_DIRECTORY_URLS.has(name)),
    ),
    own(
      "meta",
      "Metadata relating to the service provided by the ACME server.",
      false,
      id("DirectoryMeta"),
    ),
  ],
  { "smithy.api#documentation": "RFC 8555 §7.1.1" },
);
structure(
  "DirectoryMeta",
  ["termsOfService", "website", "caaIdentities", "externalAccountRequired"].map((n) =>
    member("DirectoryMeta", field("7.1.1", n)),
  ),
);

structure("NonceResponse", [own("replayNonce", "The `Replay-Nonce` header.", true)]);

// §7.3 newAccount, §7.3.4 external account binding
structure(
  "ExternalAccountBinding",
  [own("protected", "", true), own("payload", "", true), own("signature", "", true)].map(
    ([n, m]) => [n, { target: m.target, traits: { "smithy.api#required": {} } }],
  ),
  {
    "smithy.api#documentation":
      "A JWS binding this account to an existing CA account (RFC 8555 §7.3.4). The protocol builds it from the credentials' EAB key id and HMAC key.",
  },
);
structure(
  "NewAccountRequest",
  ["contact", "termsOfServiceAgreed", "onlyReturnExisting", "externalAccountBinding"].map((n) =>
    member("NewAccountRequest", field("7.3", n), { target: id("ExternalAccountBinding") }),
  ),
  input,
);
// §7.1.2 Account; `externalAccountBinding` is a request field the CA does not echo.
structure(
  "AccountResponse",
  [
    ...["status", "contact", "termsOfServiceAgreed", "orders"].map((n) =>
      member("AccountResponse", field("7.1.2", n)),
    ),
    own("location", "The account URL (`Location` header); the `kid` for every later request."),
  ],
  { "smithy.api#documentation": "RFC 8555 §7.1.2, plus the `Location` header as `location`." },
);
// §7.3.2 account update, §7.3.6 deactivation
structure(
  "UpdateAccountRequest",
  [
    urlLabel,
    member("UpdateAccountRequest", field("7.1.2", "contact")),
    own("status", "`deactivated` to deactivate the account (RFC 8555 §7.3.6)."),
  ],
  input,
);

// §7.1.3 identifiers
structure("Identifier", [
  member("Identifier", field("7.1.3", "type", 6)),
  member("Identifier", field("7.1.3", "value", 6)),
]);

// §7.4 newOrder
structure(
  "NewOrderRequest",
  ["identifiers", "notBefore", "notAfter"].map((n) =>
    member("NewOrderRequest", field("7.4", n), { target: id("Identifier") }),
  ),
  input,
);
// §7.1.3 Order
structure(
  "OrderResponse",
  [
    ...[
      "status",
      "expires",
      "identifiers",
      "notBefore",
      "notAfter",
      "error",
      "authorizations",
      "finalize",
      "certificate",
    ].map((n) =>
      member("OrderResponse", field("7.1.3", n), {
        target: n === "error" ? id("Problem") : id("Identifier"),
      }),
    ),
    own("location", "The order URL (`Location` header)."),
  ],
  { "smithy.api#documentation": "RFC 8555 §7.1.3, plus the `Location` header as `location`." },
);

// §6.7 problem documents (RFC 7807) and §6.7.1 subproblems
structure(
  "Problem",
  [
    own("type", "The error type URI, e.g. `urn:ietf:params:acme:error:malformed`."),
    own("detail", "A human-readable explanation."),
    own("status", "The HTTP status code.", false, "smithy.api#Integer"),
    own("instance", "A URI reference identifying this occurrence."),
    own("identifier", "The identifier the error relates to.", false, id("Identifier")),
    own(
      "subproblems",
      "Errors for individual identifiers (RFC 8555 §6.7.1).",
      false,
      id("ProblemSubproblemsList"),
    ),
  ],
  { "smithy.api#documentation": "RFC 7807 problem document (RFC 8555 §6.7)." },
);
structure("Subproblem", [
  own("type", "The error type URI."),
  own("detail", "A human-readable explanation."),
  own("identifier", "The identifier this subproblem is about.", false, id("Identifier")),
]);
shapes[id("ProblemSubproblemsList")] = {
  type: "list",
  member: { target: id("Subproblem") },
  traits: {},
};

structure("GetOrderRequest", [urlLabel], input);
// §7.4 finalize
structure(
  "FinalizeOrderRequest",
  [urlLabel, member("FinalizeOrderRequest", field("7.4", "csr"))],
  input,
);

structure("GetAuthorizationRequest", [urlLabel], input);
// §7.1.4 Authorization
structure(
  "Authorization",
  ["identifier", "status", "expires", "challenges", "wildcard"].map((n) =>
    member("Authorization", field("7.1.4", n), {
      target: n === "identifier" ? id("Identifier") : id("Challenge"),
    }),
  ),
  { "smithy.api#documentation": "RFC 8555 §7.1.4" },
);
// §8 challenges; `token` is defined per challenge type (§8.3, §8.4), so it is
// optional on the general shape.
structure(
  "Challenge",
  [
    ...["type", "url", "status", "validated", "error"].map((n) =>
      member("Challenge", field("8", n), { target: id("Problem") }),
    ),
    member("Challenge", field("8.3", "token"), { required: false }),
  ],
  { "smithy.api#documentation": "RFC 8555 §8" },
);
// Reorder: `token` sits before `error` in the SDK.
{
  const m = shapes[id("Challenge")].members;
  const { error, ...rest } = m;
  shapes[id("Challenge")].members = { ...rest, error };
}

// §7.5.1 deactivation
structure(
  "DeactivateAuthorizationRequest",
  [urlLabel, own("status", "Always `deactivated`.", true)],
  input,
);
structure("RespondChallengeRequest", [urlLabel], input);
structure("DownloadCertificateRequest", [urlLabel], input);
// §7.4.2 certificate download (`application/pem-certificate-chain`)
structure("CertificateChain", [
  own("chain", "PEM certificate chain (`application/pem-certificate-chain`), leaf first.", true),
  own(
    "alternates",
    'Alternate chain URLs from `Link: <url>;rel="alternate"` headers.',
    false,
    id("CertificateChainAlternatesList"),
  ),
]);
shapes[id("CertificateChainAlternatesList")] = {
  type: "list",
  member: { target: "smithy.api#String" },
  traits: {
    "smithy.api#documentation": 'Alternate chain URLs from `Link: <url>;rel="alternate"` headers.',
  },
};
// §7.6 revocation
structure(
  "RevokeCertificateRequest",
  ["certificate", "reason"].map((n) => member("RevokeCertificateRequest", field("7.6", n))),
  input,
);

// §6.7 error types
const errorTypes = table("| Type                    | Description");
for (const [type, description] of errorTypes) {
  shapes[id(`Acme${pascal(type)}`)] = {
    type: "structure",
    members: {
      code: { target: "smithy.api#Integer" },
      message: { target: "smithy.api#String" },
      type: { target: "smithy.api#String" },
      detail: { target: "smithy.api#String" },
    },
    traits: {
      "smithy.api#error": "client",
      "smithy.api#documentation": `${description.replace(/\s+/g, " ").replace(/- /g, "-")}.`,
      [ERROR_MATCHERS_TRAIT]: [{ message: { matches: `^urn:ietf:params:acme:error:${type}$` } }],
    },
  };
}

// ============================================================================
// Operations
// ============================================================================

/** Errors every authenticated request can return. */
const JWS = [
  "AccountDoesNotExist",
  "BadNonce",
  "Malformed",
  "RateLimited",
  "ServerInternal",
  "Unauthorized",
];

const OPERATIONS: ReadonlyArray<{
  readonly name: string;
  readonly method: "GET" | "POST";
  readonly uri: string;
  readonly input?: string;
  readonly output?: string;
  readonly doc: string;
  readonly errors: readonly string[];
}> = [
  {
    name: "GetDirectory",
    method: "GET",
    uri: "/directory",
    output: "Directory",
    doc: "Fetch the CA's directory of resource URLs",
    errors: [],
  },
  {
    name: "NewNonce",
    method: "GET",
    uri: "/newNonce",
    output: "NonceResponse",
    doc: "Get a fresh anti-replay nonce (the `Replay-Nonce` header)",
    errors: [],
  },
  {
    name: "NewAccount",
    method: "POST",
    uri: "/newAccount",
    input: "NewAccountRequest",
    output: "AccountResponse",
    doc: "Create an account, or find the existing account for this key",
    errors: [
      ...JWS,
      "BadPublicKey",
      "BadSignatureAlgorithm",
      "ExternalAccountRequired",
      "InvalidContact",
      "UnsupportedContact",
      "UserActionRequired",
    ],
  },
  {
    name: "UpdateAccount",
    method: "POST",
    uri: "/account/{url}",
    input: "UpdateAccountRequest",
    output: "AccountResponse",
    doc: "Update (or deactivate) the account at `url`",
    errors: [...JWS, "InvalidContact", "UnsupportedContact"],
  },
  {
    name: "NewOrder",
    method: "POST",
    uri: "/newOrder",
    input: "NewOrderRequest",
    output: "OrderResponse",
    doc: "Create an order for a set of identifiers",
    errors: [...JWS, "RejectedIdentifier", "UnsupportedIdentifier", "UserActionRequired"],
  },
  {
    name: "GetOrder",
    method: "POST",
    uri: "/order/{url}",
    input: "GetOrderRequest",
    output: "OrderResponse",
    doc: "Fetch the order at `url` (POST-as-GET)",
    errors: JWS,
  },
  {
    name: "FinalizeOrder",
    method: "POST",
    uri: "/finalize/{url}",
    input: "FinalizeOrderRequest",
    output: "OrderResponse",
    doc: "Submit the CSR to the order's finalize URL",
    errors: [...JWS, "BadCsr", "OrderNotReady"],
  },
  {
    name: "GetAuthorization",
    method: "POST",
    uri: "/authz/{url}",
    input: "GetAuthorizationRequest",
    output: "Authorization",
    doc: "Fetch the authorization at `url` (POST-as-GET)",
    errors: JWS,
  },
  {
    name: "DeactivateAuthorization",
    method: "POST",
    uri: "/authz/{url}/deactivate",
    input: "DeactivateAuthorizationRequest",
    output: "Authorization",
    doc: "Deactivate the authorization at `url`",
    errors: JWS,
  },
  {
    name: "RespondChallenge",
    method: "POST",
    uri: "/challenge/{url}",
    input: "RespondChallengeRequest",
    output: "Challenge",
    doc: "Tell the CA the challenge at `url` is ready to be validated",
    errors: [...JWS, "Caa", "Connection", "Dns", "IncorrectResponse", "Tls"],
  },
  {
    name: "DownloadCertificate",
    method: "POST",
    uri: "/cert/{url}",
    input: "DownloadCertificateRequest",
    output: "CertificateChain",
    doc: "Download the PEM certificate chain at `url` (POST-as-GET)",
    errors: JWS,
  },
  {
    name: "RevokeCertificate",
    method: "POST",
    uri: "/revokeCert",
    input: "RevokeCertificateRequest",
    doc: "Revoke a certificate",
    errors: [...JWS, "AlreadyRevoked", "BadRevocationReason"],
  },
];

for (const op of OPERATIONS) {
  const errors = [...op.errors].sort().map((e) => {
    if (!shapes[id(`Acme${e}`)])
      throw new Error(`${op.name}: ${e} is not an RFC 8555 §6.7 error type`);
    return { target: id(`Acme${e}`) };
  });
  shapes[id(op.name)] = {
    type: "operation",
    input: { target: op.input ? id(op.input) : "smithy.api#Unit" },
    output: { target: op.output ? id(op.output) : "smithy.api#Unit" },
    traits: {
      "smithy.api#http": { method: op.method, uri: op.uri, code: 200 },
      "smithy.api#documentation": op.doc,
    },
    ...(errors.length ? { errors } : {}),
  };
}

shapes[id("Acme")] = {
  type: "service",
  version: "v2",
  operations: OPERATIONS.map((op) => ({ target: id(op.name) })),
  traits: {
    "smithy.api#title": "ACME (RFC 8555)",
    "smithy.api#documentation":
      "Automatic Certificate Management Environment (RFC 8555): directory, nonces, accounts, orders, authorizations, challenges, certificate download and revocation. Every request after the directory is a JWS signed by the account key; the protocol (src/protocol.ts) resolves resource URLs from the directory and the URLs the CA returns.",
  },
};

const model = {
  smithy: "2.0",
  metadata: {
    note: "Converted from RFC 8555 by scripts/convert.ts. Shapes keep the RFC's wire member names; errors are the urn:ietf:params:acme:error:* registry (§6.7) matched on a problem document's `type`. HTTP traits are placeholders: the protocol (src/protocol.ts) resolves newNonce/newAccount/newOrder/revokeCert from the CA's directory and addresses every other resource by the absolute `url` label the CA returned; the uri only identifies the operation.",
  },
  shapes,
};
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "acme.json"), `${JSON.stringify(model, null, 2)}\n`);
console.log(
  `✅ acme: ${OPERATIONS.length} operations, ${errorTypes.length} error types from RFC 8555`,
);

await finalizeConvert({ root, operationNaming: "as-is", patchesFor: () => "" });
