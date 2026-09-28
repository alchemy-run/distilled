/** Endpoint resolver result type */
export type EndpointResolverResult =
  | {
      type: "endpoint";
      endpoint: {
        url: string;
        properties: Record<string, unknown>;
        headers: Record<string, string[]>;
      };
    }
  | { type: "error"; message: string };

/** Runtime helpers for endpoint resolution */
export interface EndpointResolverHelpers {
  partition: (region: unknown) => unknown;
  parseArn: (value: unknown) => unknown;
  isVirtualHostableS3Bucket: (
    value: unknown,
    allowSubDomains?: unknown,
  ) => boolean;
  parseURL: (url: unknown) => unknown;
  substring: (
    input: unknown,
    start: unknown,
    stop: unknown,
    reverse: unknown,
  ) => unknown;
  uriEncode: (value: unknown) => unknown;
  isValidHostLabel: (value: unknown, allowSubDomains: unknown) => boolean;
  getAttr: (value: unknown, path: string) => unknown;
  resolveTemplates: <T>(value: T) => T;
}

/** Endpoint resolver function type (compiled from Smithy rules at codegen). */
export type EndpointResolverFn = (
  params: Record<string, unknown>,
  helpers: EndpointResolverHelpers,
) => EndpointResolverResult;
