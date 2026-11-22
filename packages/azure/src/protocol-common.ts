/**
 * What both Azure protocols share -- hand-written.
 *
 * `AzureProtocol` (ARM, `./protocol.ts`) and `AzureDataPlaneProtocol`
 * (`./data-plane-protocol.ts`) parse ARM error envelopes, map failures to
 * typed errors and follow `nextLink` pages the same way. Kept here so an
 * ARM-only program never loads the data-plane code (Storage XML, the
 * Container Registry token exchange).
 */
import { InternalServerError } from "@distilled.cloud/core/errors";
import type { DeclaredErrorClass } from "@distilled.cloud/core/protocol";
import { matchTypedError } from "@distilled.cloud/core/protocol-http";
import { declaredStatusClass } from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import * as Effect from "effect/Effect";
import { AZURE_ERROR_CODE_MAP, matchAzureErrorMessage, UnknownAzureError } from "./errors.ts";
import type { HttpTrait } from "./traits.ts";

/**
 * The class an Azure error code maps to. Only the map's own keys count: a
 * code named like a member of `Object.prototype` (`constructor`, `toString`)
 * maps to nothing.
 */
export const classForCode = (code: string | undefined) =>
  code !== undefined && Object.hasOwn(AZURE_ERROR_CODE_MAP, code)
    ? AZURE_ERROR_CODE_MAP[code]
    : undefined;

/**
 * `cls`, a class of the service's errors, as the operation declares it:
 * `undefined` when `cls` is `undefined` or the operation does not list it
 * (every generated operation lists `AzureServiceErrors`).
 */
const declaredClass = (
  errors: ReadonlyArray<DeclaredErrorClass>,
  cls: (new (props: any) => unknown) | undefined,
): DeclaredErrorClass | undefined => {
  const known: unknown = cls;
  return known === undefined ? undefined : errors.find((declared) => declared === known);
};

// ---------------------------------------------------------------------------
// Error-body parsing
// ---------------------------------------------------------------------------

export interface ArmError {
  code?: string;
  message?: string;
  target?: string;
  /** Codes/messages of `error.details[]` (e.g. a generic `ValidationError`
   * whose real cause is a nested detail code). */
  details?: ReadonlyArray<{ code?: string; message?: string }>;
}

/**
 * Extract `{ code, message, target }` from an ARM error body: the
 * `{ error: { code, message, target } }` envelope first, the flat
 * `{ code, message }` shape as a fallback (v0 parity).
 */
export const parseArmError = (body: unknown): ArmError | undefined => {
  // Some RPs (e.g. Microsoft.GuestConfiguration) return a bare JSON string.
  if (typeof body === "string") return body ? { message: body } : undefined;
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  // Container Registry speaks the Docker distribution error shape:
  // `{ errors: [{ code: "MANIFEST_UNKNOWN", message, detail }] }`.
  const first =
    b.error === undefined && Array.isArray(b.errors) && b.errors[0] !== null
      ? b.errors[0]
      : undefined;
  const inner =
    b.error !== null && typeof b.error === "object"
      ? (b.error as Record<string, unknown>)
      : typeof first === "object"
        ? (first as Record<string, unknown>)
        : b;
  // Microsoft.Web (and other legacy RPs) return PascalCase `Code`/`Message`.
  const field = (name: string) => {
    const value = inner[name] ?? inner[name[0]!.toUpperCase() + name.slice(1)];
    return typeof value === "string" ? value : undefined;
  };
  const code = field("code");
  const message = field("message");
  const target = field("target");
  if (code === undefined && message === undefined) return undefined;
  const details = Array.isArray(inner.details)
    ? inner.details.flatMap((d: unknown) =>
        d !== null && typeof d === "object"
          ? [
              {
                code:
                  typeof (d as { code?: unknown }).code === "string"
                    ? ((d as { code: string }).code as string)
                    : undefined,
                message:
                  typeof (d as { message?: unknown }).message === "string"
                    ? ((d as { message: string }).message as string)
                    : undefined,
              },
            ]
          : [],
      )
    : undefined;
  return { code, message, target, details };
};

/** A response body read as text, and parsed as JSON when it is JSON. */
export interface ReadBody {
  readonly text: string;
  readonly json: unknown;
  readonly nonJson: boolean;
}

/** Parse `text` tolerantly -- error pages are often non-JSON. */
export const parseBody = (text: string): ReadBody => {
  if (text.trim().length === 0) return { text, json: undefined, nonJson: false };
  try {
    return { text, json: JSON.parse(text), nonJson: false };
  } catch {
    // Not JSON (an HTML gateway page, an XML Storage error): kept as text.
    return { text, json: undefined, nonJson: true };
  }
};

/**
 * The typed error for a failed response, in order: the operation's own
 * typed errors (wire matchers in the model), the Azure error code, a mapped
 * `details[].code`, the HTTP status, a retryable 5xx, else
 * `UnknownAzureError`. The classes of a code and of a status are the
 * service's errors (`AzureServiceErrors`): this builds one only from the
 * classes in `errors`, the operation's and then its service's.
 */
export const failResponse = ({
  status,
  headers,
  read: { text, json, nonJson },
  arm,
  errors,
}: {
  readonly status: number;
  readonly headers: Record<string, string | undefined>;
  readonly read: ReadBody;
  readonly arm: ArmError | undefined;
  readonly errors: ReadonlyArray<DeclaredErrorClass>;
}) =>
  Effect.gen(function* () {
    const body = nonJson ? text : json;

    // 0. The operation's own typed errors (hand-written data-plane models
    //    such as Service Bus or Cosmos DB declare them with wire matchers
    //    on status, body and headers); the most specific matcher wins.
    const typed = matchTypedError(
      errors,
      status,
      [
        {
          code: arm?.code !== undefined && /^\d+$/.test(arm.code) ? Number(arm.code) : undefined,
          message: arm?.message ?? (nonJson ? text.trim() : ""),
        },
      ],
      { body, headers },
    );
    if (typed !== undefined) return yield* Effect.fail(typed);

    // 1. Match by Azure error code first for richer typed errors.
    const AzureErrorClass = declaredClass(
      errors,
      (arm !== undefined ? matchAzureErrorMessage(arm) : undefined) ?? classForCode(arm?.code),
    );
    if (AzureErrorClass) {
      return yield* Effect.fail(
        new AzureErrorClass({
          message: arm!.message,
          code: arm!.code,
          target: arm!.target,
        }),
      );
    }

    // 1b. A generic top-level code (e.g. `ValidationError`) whose nested
    //     `details[].code` is mapped.
    for (const detail of arm?.details ?? []) {
      const DetailErrorClass = declaredClass(errors, classForCode(detail.code));
      if (DetailErrorClass === undefined) continue;
      return yield* Effect.fail(
        new DetailErrorClass({
          message: detail.message ?? arm!.message,
          code: detail.code,
          target: arm!.target,
        }),
      );
    }

    // 2. Fall back to core's class for the status, which the service
    //    declares (Retry-After honored on retryable statuses).
    const StatusErrorClass = declaredStatusClass(status, errors);
    if (StatusErrorClass) {
      return yield* Effect.fail(
        new StatusErrorClass({
          message: arm?.message ?? (nonJson && text.trim() ? text.trim() : ""),
          retryAfter: parseRetryAfterForStatus(status, headers),
        }),
      );
    }

    // 3. Any other 5xx -> retryable server error.
    if (status >= 500) {
      return yield* Effect.fail(
        new InternalServerError({
          message: arm?.message ?? `HTTP ${status}`,
          retryAfter: parseRetryAfterForStatus(status, headers),
        }),
      );
    }

    // 4. Unknown Azure error.
    return yield* Effect.fail(
      new UnknownAzureError({
        status,
        code: arm?.code,
        message: arm?.message,
        target: arm?.target,
        body,
      }),
    );
  });

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

/** The page URL a pageable operation's input carries, if any (`""` is none). */
export const nextLinkOf = (http: HttpTrait | undefined, input: unknown): string | undefined => {
  if (http?.nextLink === undefined || input === null || typeof input !== "object") return undefined;
  const value = (input as Record<string, unknown>)[http.nextLink];
  return typeof value === "string" && value !== "" ? value : undefined;
};

/** The input without one member. */
export const withoutMember = (input: unknown, name: string): unknown => {
  if (input === null || typeof input !== "object" || !(name in input)) return input;
  const rest = { ...(input as Record<string, unknown>) };
  delete rest[name];
  return rest;
};

/** `text` as a URL, or `undefined` when it is not one. */
export const parseUrl = (text: string, base?: string): URL | undefined => {
  try {
    return new URL(text, base);
  } catch {
    return undefined;
  }
};

/**
 * The URL of a page link, or `undefined` when the link leaves the
 * operation's endpoint. A `nextLink` is absolute (Azure's guidelines require
 * it); a path-relative one some data planes send resolves against the
 * endpoint. The request carries the caller's token, so the link must be on
 * the endpoint's host or a subdomain of it (an ARM link may name a regional
 * `westus.management.azure.com`), on the same port, over HTTPS when the
 * endpoint is.
 */
export const resolveNextLink = (link: string, baseUrl: string): string | undefined => {
  const base = parseUrl(`${baseUrl}/`);
  const url = base !== undefined ? parseUrl(link, base.href) : undefined;
  if (base === undefined || url === undefined) return undefined;
  const host = url.hostname.toLowerCase();
  const baseHost = base.hostname.toLowerCase();
  const sameHost = (host === baseHost || host.endsWith(`.${baseHost}`)) && url.port === base.port;
  const sameScheme = url.protocol === base.protocol || url.protocol === "https:";
  return sameHost && sameScheme ? url.toString() : undefined;
};
