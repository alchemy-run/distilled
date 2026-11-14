/**
 * Azure SDK trait surface -- hand-written.
 *
 * Re-exports the generic protocol traits from core (so generated operations
 * import everything from one place) and widens `Http` with Azure's baked
 * `apiVersion` field.
 *
 * ARM requires `?api-version=<date>` on every call. At generation time the
 * resolved stable api-version of each spec is folded into the operation's
 * `T.Http` trait (`apiVersion`); the protocol appends the query parameter at
 * request time (see `protocol.ts`). This mirrors distilled v0, where the
 * shared client injected the query param from `httpTrait.apiVersion`.
 */
import {
  type HttpTrait as CoreHttpTrait,
  httpSymbol,
  makeAnnotation,
} from "@distilled.cloud/core/trait";

export {
  Body,
  Header,
  Query,
  Label,
  ResponseCode,
  HttpBody,
  FormDataFile,
  StringEncoded,
  KeyDictionary,
  UnionCases,
  applyErrorMatchers,
  getErrorMatchers,
  type ErrorMatcher,
  bodySymbol,
  headerSymbol,
  querySymbol,
  labelSymbol,
  httpSymbol,
  responseCodeSymbol,
  httpBodySymbol,
  formDataFileSymbol,
  stringEncodedSymbol,
  keyDictionarySymbol,
  unionCasesSymbol,
  errorMatchersSymbol,
} from "@distilled.cloud/core/trait";

export {
  SensitiveValue,
  RawResponse,
  RawResponseRoot,
  sensitiveValueSymbol,
  rawResponseSymbol,
  rawResponseRootSymbol,
} from "@distilled.cloud/core/protocol-rest";

/**
 * Core's HTTP trait plus the Azure ARM `apiVersion` baked in at generation
 * time. The protocol turns it into an `api-version` query parameter on every
 * request (an explicit `api-version` already present in the URL wins).
 *
 * Data-plane operations (`keyvault-secrets`, `storage-blob`, ...) also carry
 * where the request goes and how it authenticates; ARM operations carry none
 * of the fields below and go to `Config.apiBaseUrl`.
 */
export interface HttpTrait extends Omit<CoreHttpTrait, "method"> {
  /**
   * The HTTP method. `MERGE` is the Table service's Merge Entity verb
   * (Cosmos DB for Table refuses the spec's `PATCH`); `fetch` sends any
   * method token.
   */
  readonly method: CoreHttpTrait["method"] | "MERGE";
  readonly apiVersion?: string;
  /**
   * Send `apiVersion` in this header instead of the `api-version` query
   * parameter (Storage: `x-ms-version`).
   */
  readonly apiVersionHeader?: string;
  /**
   * Base-URL template, e.g. `{vaultBaseUrl}` or
   * `https://{dpsName}.azure-devices-provisioning.net`. Each `{name}` is filled
   * from the input member `name` (marked `HostLabel()`).
   */
  readonly host?: string;
  /** Host members inserted verbatim (full URLs) rather than URL-encoded. */
  readonly hostRaw?: ReadonlyArray<string>;
  /** Values for host members the caller may omit. */
  readonly hostDefaults?: Readonly<Record<string, string>>;
  /** Constant query parameters (`restype=container`, `comp=list`). */
  readonly query?: Readonly<Record<string, string>>;
  /** Constant request headers. */
  readonly headers?: Readonly<Record<string, string>>;
  /** AAD token audience, e.g. `https://vault.azure.net/.default`. */
  readonly audience?: string;
  /**
   * Audiences for endpoints whose host ends with the key; `audience` covers
   * the rest (Tables: `.table.core.windows.net` takes the Storage audience,
   * a Cosmos DB endpoint the Cosmos one).
   */
  readonly audienceByHost?: Readonly<Record<string, string>>;
  /** The service mints its own tokens through this exchange (`"acr"`). */
  readonly tokenExchange?: string;
  /** The endpoint is unauthenticated: send no token (Confidential Ledger identity). */
  readonly anonymous?: boolean;
  /**
   * The request body is XML under this root element (Storage's
   * `QueueMessage`, `BlockList`, `StorageServiceProperties`). The body
   * members are its children, named by their `XmlName`.
   */
  readonly xmlRoot?: string;
  /**
   * The operation speaks Storage's REST dialect (Blob, Queue, File, Data
   * Lake): header maps, raw-bytes bodies, XML or `x-ms-error-code` errors,
   * and a zero-length body on a write that sends none.
   */
  readonly storage?: boolean;
  /**
   * How the token goes into `Authorization` when it is not `Bearer <token>`.
   * `"cosmos-aad"`: Cosmos DB's URL-encoded `type=aad&ver=1.0&sig=<token>`.
   */
  readonly authScheme?: "cosmos-aad";
  /**
   * Send the JSON body under this media type instead of `application/json`
   * (Service Bus / Event Hubs batches `application/vnd.microsoft.servicebus.json`,
   * Cosmos DB queries `application/query+json`). Sent exactly, no charset.
   */
  readonly jsonContentType?: string;
  /**
   * A PUT/POST/PATCH that carries no payload sends a zero-length body, so
   * the request has `Content-Length: 0` (Service Bus answers 411 without it).
   */
  readonly emptyBody?: boolean;
  /**
   * Pageable operations: the input member holding a page's absolute
   * `nextLink`. When set, the request is a GET of that URL as-is (it already
   * carries `api-version` and skip tokens) and every other member is ignored.
   */
  readonly nextLink?: string;
}

/**
 * Operation-level HTTP binding (method + URI template + Azure `apiVersion`).
 * Same annotation symbol as core's `Http`, so the shared request builder
 * keeps working untouched.
 */
export const Http = (trait: HttpTrait) => makeAnnotation(httpSymbol, trait);

export const hostLabelSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/azure/host-label");
/**
 * Bind a member to a `{name}` placeholder of the operation's `host` template
 * (a data-plane endpoint such as `vaultBaseUrl`) rather than the path, query,
 * or body.
 */
export const HostLabel = () => makeAnnotation(hostLabelSymbol, true);

// ---------------------------------------------------------------------------
// XML and header-collection members (Storage data planes)
// ---------------------------------------------------------------------------

export const xmlNameSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/azure/xml-name");
/** The member's XML element (or attribute) name, when it is not the member's wire name. */
export const XmlName = (name: string) => makeAnnotation(xmlNameSymbol, name);

export const xmlAttributeSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/azure/xml-attribute");
/** The member is an attribute of its parent element (`<EnumerationResults ServiceEndpoint="...">`). */
export const XmlAttribute = (_value?: unknown) => makeAnnotation(xmlAttributeSymbol, true);

export const xmlFlattenedSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/azure/xml-flattened");
/**
 * A list member whose items repeat directly in the parent element
 * (`<Blobs><Blob/><Blob/></Blobs>`), with no wrapper element of its own.
 */
export const XmlFlattened = (_value?: unknown) => makeAnnotation(xmlFlattenedSymbol, true);

export const xmlTextSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/azure/xml-text");
/** The member is the text content of its parent element (`<Name Encoded="true">a%2Fb</Name>`). */
export const XmlText = (_value?: unknown) => makeAnnotation(xmlTextSymbol, true);

export const xmlItemNameSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/azure/xml-item-name");
/** The element name of each item of a list member (`<Cors><CorsRule/></Cors>`). */
export const XmlItemName = (name: string) => makeAnnotation(xmlItemNameSymbol, name);

export const headerPrefixSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/azure/header-prefix");
/**
 * A string map sent and read as one header per key under this prefix
 * (`metadata: { owner: "a" }` <-> `x-ms-meta-owner: a`).
 */
export const HeaderPrefix = (prefix: string) => makeAnnotation(headerPrefixSymbol, prefix);

export const jsonHeaderSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/azure/json-header");
/**
 * A structured member sent and read as one JSON-encoded header, with its
 * fields under their wire names (Service Bus `BrokerProperties:
 * {"Label":"M1"}`, Cosmos DB `x-ms-documentdb-partitionkey: ["a"]`).
 */
export const JsonHeader = (name: string) => makeAnnotation(jsonHeaderSymbol, name);
