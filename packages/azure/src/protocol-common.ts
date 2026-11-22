/**
 * What both Azure protocols share -- hand-written.
 *
 * `AzureProtocol` (ARM, `./protocol.ts`) and `AzureDataPlaneProtocol`
 * (`./data-plane-protocol.ts`) parse ARM error envelopes, map failures to
 * typed errors and follow `nextLink` pages the same way. Kept here so an
 * ARM-only program never loads the data-plane code (Storage XML, the
 * Container Registry token exchange).
 */
import { HTTP_STATUS_MAP, InternalServerError } from "@distilled.cloud/core/errors";
import { matchTypedError } from "@distilled.cloud/core/protocol-http";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import * as Effect from "effect/Effect";
import { AZURE_ERROR_CODE_MAP, matchAzureErrorMessage, UnknownAzureError } from "./errors.ts";
import type { HttpTrait } from "./traits.ts";

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel),
// but Azure failures are real typed errors surfaced through AzureOpError.
// Fail with the instance and erase the type here; the generated operation
// annotations reintroduce it for callers.
export const fail = (e: unknown): Effect.Effect<never> => Effect.fail(e) as Effect.Effect<never>;

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
 * `UnknownAzureError`.
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
  readonly errors: ReadonlyArray<unknown>;
}): Effect.Effect<never> =>
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
    if (typed !== undefined) return yield* fail(typed);

    // 1. Match by Azure error code first for richer typed errors.
    const AzureErrorClass =
      (arm !== undefined ? matchAzureErrorMessage(arm) : undefined) ??
      (arm?.code !== undefined ? AZURE_ERROR_CODE_MAP[arm.code] : undefined);
    if (AzureErrorClass) {
      return yield* fail(
        new AzureErrorClass({
          message: arm!.message,
          code: arm!.code,
          target: arm!.target,
        }),
      );
    }

    // 1b. A generic top-level code (e.g. `ValidationError`) whose nested
    //     `details[].code` is mapped.
    const detail = arm?.details?.find((d) => d.code !== undefined && AZURE_ERROR_CODE_MAP[d.code]);
    if (detail !== undefined) {
      const DetailErrorClass = AZURE_ERROR_CODE_MAP[detail.code!]!;
      return yield* fail(
        new DetailErrorClass({
          message: detail.message ?? arm!.message,
          code: detail.code,
          target: arm!.target,
        }),
      );
    }

    // 2. Fall back to standard HTTP status errors (Retry-After honored on
    //    retryable statuses).
    const StatusErrorClass = HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
    if (StatusErrorClass) {
      return yield* fail(
        new StatusErrorClass({
          message: arm?.message ?? (nonJson && text.trim() ? text.trim() : ""),
          retryAfter: parseRetryAfterForStatus(status, headers),
        } as any),
      );
    }

    // 3. Unmapped 5xx -> retryable server error.
    if (status >= 500) {
      return yield* fail(
        new InternalServerError({
          message: arm?.message ?? `HTTP ${status}`,
          retryAfter: parseRetryAfterForStatus(status, headers),
        }),
      );
    }

    // 4. Unknown Azure error.
    return yield* fail(
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
