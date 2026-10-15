/**
 * Endpoint Resolver - resolves endpoints using compiled Smithy rules.
 *
 * This layer:
 * 1. Extracts the endpoint resolver function from schema annotations
 * 2. Builds endpoint parameters from input and region
 * 3. Calls the resolver to get endpoint URL, headers, and auth schemes
 * 4. Adjusts request path when context params are moved to hostname
 *
 * The resolver function is compiled at code generation time from the Smithy
 * rule set, eliminating the need for runtime interpretation.
 *
 * This is independently testable without making HTTP requests.
 */

import type * as AST from "effect/SchemaAST";
import type { Operation } from "../client/operation.ts";
import type { Request } from "../client/request.ts";
import {
  type EndpointResolverHelpers,
  getContextParam,
  getEndpointResolver,
  getEndpointTemplate,
  getStaticContextParams,
  hasHttpLabel,
} from "../traits.ts";
import { getPropertySignatures } from "../util/ast.ts";
import { encodeLabel } from "../util/serialize-input.ts";
import {
  isVirtualHostableS3Bucket,
  parseArn,
  partition,
  regionDnsSuffix,
} from "./aws-functions.ts";
import type { EndpointParams, ResolvedEndpoint, RulesValue } from "./expression.ts";
import { getAttr, isValidHostLabel, parseURL, substring, uriEncode } from "./standard-functions.ts";

/**
 * Recursively resolve template values in nested objects/arrays
 */
const resolveTemplates = <T>(value: T): T => {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(resolveTemplates) as T;
  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      result[k] = resolveTemplates(v);
    }
    return result as T;
  }
  return value;
};

/** Runtime helpers for compiled endpoint resolvers */
const endpointResolverHelpers = {
  partition,
  parseArn,
  isVirtualHostableS3Bucket,
  parseURL,
  substring,
  uriEncode,
  isValidHostLabel,
  getAttr,
  resolveTemplates,
} as EndpointResolverHelpers;

export interface EndpointResolverInput {
  /** The operation input payload */
  input: unknown;
  /** The AWS region */
  region: string;
  /** The serialized request (path may be adjusted based on endpoint resolution) */
  request: Request;
}

export interface EndpointResolverOutput {
  /** The resolved endpoint */
  endpoint: ResolvedEndpoint;
  /** The request with path adjusted if needed */
  request: Request;
}

/**
 * Create an endpoint resolver for a given operation.
 *
 * Expensive work (resolver discovery, context param extraction) is done once at creation time.
 *
 * @param operation - The operation (with input schema containing endpoint resolver annotation)
 * @returns A function that resolves endpoints from input values and region
 */
export const makeEndpointResolver = (operation: Operation) => {
  const inputAst = operation.input.ast;

  // Extract compiled endpoint resolver from annotations (done once)
  const resolver = getEndpointResolver(inputAst);

  // If no resolver is available, return undefined
  if (!resolver) {
    return undefined;
  }

  // Extract context param mappings (done once)
  const contextParamMappings = extractContextParamMappings(inputAst);

  // Extract static context params (done once)
  const staticContextParams = getStaticContextParams(inputAst);

  // Region-only calls read the generator's precomputed template instead of
  // running the rules (whose code would otherwise compile on first call).
  const template = staticContextParams ? undefined : getEndpointTemplate(resolver);
  const templated = template && new Map<string, ResolvedEndpoint | null>();
  const fromTemplate = (region: string): ResolvedEndpoint | undefined => {
    let hit = templated!.get(region);
    if (hit === undefined) {
      const dns = template!.exceptions.includes(region) ? undefined : regionDnsSuffix(region);
      hit = dns
        ? JSON.parse(template!.template.replaceAll("{R}", region).replaceAll("{D}", dns))
        : null;
      templated!.set(region, hit!);
    }
    return hit ?? undefined;
  };

  // Resolution depends only on the endpoint parameters, so results are
  // cached per parameter set (region + context params from the input).
  const cache = new Map<string, Resolved>();

  /**
   * The endpoint for `resolverInput`, with the request path adjusted, or
   * the `Error` the rule set ends in when no endpoint matches.
   */
  return (resolverInput: EndpointResolverInput): EndpointResolverOutput | Error => {
    const { input, region, request } = resolverInput;
    const payloadObj = input as Record<string, RulesValue>;

    // Only primitive parameter values make a cache key; anything else resolves uncached.
    let key: string | undefined = region;
    let regionOnly = true;
    for (const [propName] of contextParamMappings) {
      const value: unknown = payloadObj[propName];
      if (value !== undefined) regionOnly = false;
      if (value !== null && typeof value === "object") {
        key = undefined;
        break;
      }
      key += "\0" + typeof value + String(value);
    }
    let resolved = key === undefined ? undefined : cache.get(key);
    if (resolved === undefined) {
      // Build endpoint params from input + region
      const endpointParams: EndpointParams = {
        Region: region,
      };

      // Apply static context params first (operation-level fixed values)
      if (staticContextParams) {
        for (const [paramName, paramDef] of Object.entries(staticContextParams)) {
          endpointParams[paramName] = paramDef.value as RulesValue;
        }
      }

      // Extract context parameters from the payload
      for (const [propName, info] of contextParamMappings) {
        if (payloadObj[propName] !== undefined) {
          endpointParams[info.paramName] = payloadObj[propName];
        }
      }

      let endpoint = templated && regionOnly ? fromTemplate(region) : undefined;
      if (endpoint === undefined) {
        // Resolve endpoint using the compiled resolver
        const result = resolver(endpointParams as Record<string, unknown>, endpointResolverHelpers);

        if (result.type === "error") {
          return new Error(result.message);
        }

        endpoint = {
          url: result.endpoint.url,
          properties: result.endpoint.properties as Record<string, RulesValue>,
          headers: result.endpoint.headers,
        };
      }
      let hostname: string | undefined;
      try {
        hostname = new URL(endpoint.url).hostname;
      } catch {
        hostname = undefined;
      }
      resolved = { endpoint, hostname };
      if (key !== undefined) {
        if (cache.size >= 64) cache.clear();
        cache.set(key, resolved);
      }
    }

    // Adjust request path if context params were moved to hostname
    // This handles S3 virtual-hosted style where Bucket is in the hostname
    const adjustedRequest =
      resolved.hostname === undefined
        ? request
        : adjustRequestPath(request, resolved.hostname, contextParamMappings, payloadObj);

    return { endpoint: resolved.endpoint, request: adjustedRequest };
  };
};

/** A resolved endpoint and its URL's hostname (undefined when the URL does not parse). */
interface Resolved {
  readonly endpoint: ResolvedEndpoint;
  readonly hostname: string | undefined;
}

interface ContextParamInfo {
  /** The endpoint param name (e.g., "Bucket") */
  paramName: string;
  /** Whether this param is also an HTTP label in the path */
  isHttpLabel: boolean;
}

/**
 * Extract context parameter mappings from an input schema.
 * Maps property names to their context parameter info.
 */
function extractContextParamMappings(ast: AST.AST): Map<string, ContextParamInfo> {
  const mappings = new Map<string, ContextParamInfo>();
  const props = getPropertySignatures(ast);

  for (const prop of props) {
    const contextParam = getContextParam(prop);
    if (contextParam) {
      mappings.set(String(prop.name), {
        paramName: contextParam,
        isHttpLabel: hasHttpLabel(prop),
      });
    }
  }

  return mappings;
}

/**
 * Adjust request path when context params are moved to the endpoint hostname.
 *
 * When endpoint rules use virtual-hosted style (e.g., S3), context params like
 * Bucket are moved to the hostname. But the protocol serializer already put
 * them in the path based on @httpLabel. This function strips the duplicated
 * prefix from the path.
 */
function adjustRequestPath(
  request: Request,
  hostname: string,
  contextParamMappings: Map<string, ContextParamInfo>,
  input: Record<string, unknown>,
): Request {
  try {
    // Check each context param that is also an HTTP label
    for (const [propName, info] of contextParamMappings) {
      if (!info.isHttpLabel) continue;

      const value = input[propName];
      if (typeof value !== "string") continue;

      // Check if the hostname starts with this value (virtual-hosted style)
      // e.g., "mybucket.s3.us-east-1.amazonaws.com" starts with "mybucket."
      if (hostname.startsWith(`${value}.`)) {
        // The HTTP label would have been serialized as "/{value}" in the path
        const pathPrefix = `/${encodeLabel(value)}`;

        if (request.path.startsWith(pathPrefix)) {
          let adjustedPath = request.path.slice(pathPrefix.length);
          // Normalize empty path
          if (adjustedPath === "" || adjustedPath === "/") {
            adjustedPath = "";
          }
          return { ...request, path: adjustedPath };
        }
      }
    }
  } catch {
    // Encoding the label failed, return original request
  }

  return request;
}
