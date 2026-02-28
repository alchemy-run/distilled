// ==========================================================================
// Digital Asset Links API (digitalassetlinks v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "digitalassetlinks",
  version: "v1",
  rootUrl: "https://digitalassetlinks.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface CheckResponse {
  /** Set to true if the assets specified in the request are linked by the relation specified in the request. */
  linked?: boolean;
  /** Statements may specify relation level extensions/payloads to express more details when declaring permissions to grant from the source asset to the target asset. When requested, the API will return relation_extensions specified in any and all statements linking the requested source and target assets by the relation specified in the request. */
  relationExtensions?: Array<Record<string, unknown>>;
  /** From serving time, how much longer the response should be considered valid barring further updates. REQUIRED */
  maxAge?: string;
  /** Human-readable message containing information intended to help end users understand, reproduce and debug the result. The message will be in English and we are currently not planning to offer any translations. Please note that no guarantees are made about the contents or format of this string. Any aspect of it may be subject to change without notice. You should not attempt to programmatically parse this data. For programmatic access, use the error_code field below. */
  debugString?: string;
  /** Error codes that describe the result of the Check operation. NOTE: Error codes may be populated even when `linked` is true. The error codes do not necessarily imply that the request failed, but rather, specify any errors encountered in the statements file(s) which may or may not impact whether the server determines the requested source and target to be linked. */
  errorCode?: Array<"ERROR_CODE_UNSPECIFIED" | "ERROR_CODE_INVALID_QUERY" | "ERROR_CODE_FETCH_ERROR" | "ERROR_CODE_FAILED_SSL_VALIDATION" | "ERROR_CODE_REDIRECT" | "ERROR_CODE_TOO_LARGE" | "ERROR_CODE_MALFORMED_HTTP_RESPONSE" | "ERROR_CODE_WRONG_CONTENT_TYPE" | "ERROR_CODE_MALFORMED_CONTENT" | "ERROR_CODE_SECURE_ASSET_INCLUDES_INSECURE" | "ERROR_CODE_FETCH_BUDGET_EXHAUSTED" | (string & {})>;
}

export const CheckResponse: Schema.Schema<CheckResponse> = Schema.suspend(() => Schema.Struct({
  linked: Schema.optional(Schema.Boolean),
  relationExtensions: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  maxAge: Schema.optional(Schema.String),
  debugString: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CheckResponse" }) as any as Schema.Schema<CheckResponse>;

export interface WebAsset {
  /** Web assets are identified by a URL that contains only the scheme, hostname and port parts. The format is http[s]://[:] Hostnames must be fully qualified: they must end in a single period ("`.`"). Only the schemes "http" and "https" are currently allowed. Port numbers are given as a decimal number, and they must be omitted if the standard port numbers are used: 80 for http and 443 for https. We call this limited URL the "site". All URLs that share the same scheme, hostname and port are considered to be a part of the site and thus belong to the web asset. Example: the asset with the site `https://www.google.com` contains all these URLs: * `https://www.google.com/` * `https://www.google.com:443/` * `https://www.google.com/foo` * `https://www.google.com/foo?bar` * `https://www.google.com/foo#bar` * `https://user@password:www.google.com/` But it does not contain these URLs: * `http://www.google.com/` (wrong scheme) * `https://google.com/` (hostname does not match) * `https://www.google.com:444/` (port does not match) REQUIRED */
  site?: string;
}

export const WebAsset: Schema.Schema<WebAsset> = Schema.suspend(() => Schema.Struct({
  site: Schema.optional(Schema.String),
})).annotate({ identifier: "WebAsset" }) as any as Schema.Schema<WebAsset>;

export interface CertificateInfo {
  /** The uppercase SHA-265 fingerprint of the certificate. From the PEM certificate, it can be acquired like this: $ keytool -printcert -file $CERTFILE | grep SHA256: SHA256: 14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83: \ 42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 or like this: $ openssl x509 -in $CERTFILE -noout -fingerprint -sha256 SHA256 Fingerprint=14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64: \ 16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 In this example, the contents of this field would be `14:6D:E9:83:C5:73: 06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF: 44:E5`. If these tools are not available to you, you can convert the PEM certificate into the DER format, compute the SHA-256 hash of that string and represent the result as a hexstring (that is, uppercase hexadecimal representations of each octet, separated by colons). */
  sha256Fingerprint?: string;
}

export const CertificateInfo: Schema.Schema<CertificateInfo> = Schema.suspend(() => Schema.Struct({
  sha256Fingerprint: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateInfo" }) as any as Schema.Schema<CertificateInfo>;

export interface AndroidAppAsset {
  /** Android App assets are naturally identified by their Java package name. For example, the Google Maps app uses the package name `com.google.android.apps.maps`. REQUIRED */
  packageName?: string;
  /** Because there is no global enforcement of package name uniqueness, we also require a signing certificate, which in combination with the package name uniquely identifies an app. Some apps' signing keys are rotated, so they may be signed by different keys over time. We treat these as distinct assets, since we use (package name, cert) as the unique ID. This should not normally pose any problems as both versions of the app will make the same or similar statements. Other assets making statements about the app will have to be updated when a key is rotated, however. (Note that the syntaxes for publishing and querying for statements contain syntactic sugar to easily let you specify apps that are known by multiple certificates.) REQUIRED */
  certificate?: CertificateInfo;
}

export const AndroidAppAsset: Schema.Schema<AndroidAppAsset> = Schema.suspend(() => Schema.Struct({
  packageName: Schema.optional(Schema.String),
  certificate: Schema.optional(CertificateInfo),
})).annotate({ identifier: "AndroidAppAsset" }) as any as Schema.Schema<AndroidAppAsset>;

export interface Asset {
  /** Set if this is a web asset. */
  web?: WebAsset;
  /** Set if this is an Android App asset. */
  androidApp?: AndroidAppAsset;
}

export const Asset: Schema.Schema<Asset> = Schema.suspend(() => Schema.Struct({
  web: Schema.optional(WebAsset),
  androidApp: Schema.optional(AndroidAppAsset),
})).annotate({ identifier: "Asset" }) as any as Schema.Schema<Asset>;

export interface StatementTemplate {
  /** The source asset that is asserting the statement. If omitted, you must specify a BulkCheckRequest.default_source value to use here. */
  source?: Asset;
  /** The relationship being asserted between the source and target. If omitted, you must specify a BulkCheckRequest.default_relation value to use here. */
  relation?: string;
  /** The target that the source is declaring the relationship with. If omitted, you must specify a BulkCheckRequest.default_target to use here. */
  target?: Asset;
}

export const StatementTemplate: Schema.Schema<StatementTemplate> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Asset),
  relation: Schema.optional(Schema.String),
  target: Schema.optional(Asset),
})).annotate({ identifier: "StatementTemplate" }) as any as Schema.Schema<StatementTemplate>;

export interface BulkCheckRequest {
  /** List of statements to check. For each statement, you can omit a field if the corresponding default_* field below was supplied. Minimum 1 statement; maximum 1,000 statements. Any additional statements will be ignored. */
  statements?: Array<StatementTemplate>;
  /** If specified, will be used in any given template statement that doesn’t specify a source. */
  defaultSource?: Asset;
  /** If specified, will be used in any given template statement that doesn’t specify a relation. */
  defaultRelation?: string;
  /** If specified, will be used in any given template statement that doesn’t specify a target. */
  defaultTarget?: Asset;
  /** Same configuration as in CheckRequest; all statement checks will use the same configuration. */
  returnRelationExtensions?: boolean;
}

export const BulkCheckRequest: Schema.Schema<BulkCheckRequest> = Schema.suspend(() => Schema.Struct({
  statements: Schema.optional(Schema.Array(StatementTemplate)),
  defaultSource: Schema.optional(Asset),
  defaultRelation: Schema.optional(Schema.String),
  defaultTarget: Schema.optional(Asset),
  returnRelationExtensions: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BulkCheckRequest" }) as any as Schema.Schema<BulkCheckRequest>;

export interface BulkCheckResponse {
  /** List of results for each check request. Results are returned in the same order in which they were sent in the request. */
  checkResults?: Array<CheckResponse>;
  /** Error code for the entire request. Present only if the entire request failed. Individual check errors will not trigger the presence of this field. */
  bulkErrorCode?: "ERROR_CODE_UNSPECIFIED" | "ERROR_CODE_INVALID_QUERY" | "ERROR_CODE_FETCH_ERROR" | "ERROR_CODE_FAILED_SSL_VALIDATION" | "ERROR_CODE_REDIRECT" | "ERROR_CODE_TOO_LARGE" | "ERROR_CODE_MALFORMED_HTTP_RESPONSE" | "ERROR_CODE_WRONG_CONTENT_TYPE" | "ERROR_CODE_MALFORMED_CONTENT" | "ERROR_CODE_SECURE_ASSET_INCLUDES_INSECURE" | "ERROR_CODE_FETCH_BUDGET_EXHAUSTED" | (string & {});
}

export const BulkCheckResponse: Schema.Schema<BulkCheckResponse> = Schema.suspend(() => Schema.Struct({
  checkResults: Schema.optional(Schema.Array(CheckResponse)),
  bulkErrorCode: Schema.optional(Schema.String),
})).annotate({ identifier: "BulkCheckResponse" }) as any as Schema.Schema<BulkCheckResponse>;

export interface Statement {
  /** Every statement has a source asset. REQUIRED */
  source?: Asset;
  /** The relation identifies the use of the statement as intended by the source asset's owner (that is, the person or entity who issued the statement). Every complete statement has a relation. We identify relations with strings of the format `/`, where `` must be one of a set of pre-defined purpose categories, and `` is a free-form lowercase alphanumeric string that describes the specific use case of the statement. Refer to [our API documentation](/digital-asset-links/v1/relation-strings) for the current list of supported relations. Example: `delegate_permission/common.handle_all_urls` REQUIRED */
  relation?: string;
  /** Every statement has a target asset. REQUIRED */
  target?: Asset;
  /** Statements may specify relation level extensions/payloads to express more details when declaring permissions to grant from the source asset to the target asset. These relation extensions should be specified in the `relation_extensions` object, keyed by the relation type they're associated with. { relation: ["delegate_permission/common.handle_all_urls"], target: {...}, relation_extensions: { "delegate_permission/common.handle_all_urls": { ...handle_all_urls specific payload specified here... } } } When requested, and specified in the statement file, the API will return relation_extensions associated with the statement's relation type. i.e. the API will only return relation_extensions specified for "delegate_permission/common.handle_all_urls" if this statement object's relation type is "delegate_permission/common.handle_all_urls". */
  relationExtensions?: Record<string, unknown>;
}

export const Statement: Schema.Schema<Statement> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Asset),
  relation: Schema.optional(Schema.String),
  target: Schema.optional(Asset),
  relationExtensions: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Statement" }) as any as Schema.Schema<Statement>;

export interface ListResponse {
  /** A list of all the matching statements that have been found. */
  statements?: Array<Statement>;
  /** From serving time, how much longer the response should be considered valid barring further updates. REQUIRED */
  maxAge?: string;
  /** Human-readable message containing information intended to help end users understand, reproduce and debug the result. The message will be in English and we are currently not planning to offer any translations. Please note that no guarantees are made about the contents or format of this string. Any aspect of it may be subject to change without notice. You should not attempt to programmatically parse this data. For programmatic access, use the error_code field below. */
  debugString?: string;
  /** Error codes that describe the result of the List operation. */
  errorCode?: Array<"ERROR_CODE_UNSPECIFIED" | "ERROR_CODE_INVALID_QUERY" | "ERROR_CODE_FETCH_ERROR" | "ERROR_CODE_FAILED_SSL_VALIDATION" | "ERROR_CODE_REDIRECT" | "ERROR_CODE_TOO_LARGE" | "ERROR_CODE_MALFORMED_HTTP_RESPONSE" | "ERROR_CODE_WRONG_CONTENT_TYPE" | "ERROR_CODE_MALFORMED_CONTENT" | "ERROR_CODE_SECURE_ASSET_INCLUDES_INSECURE" | "ERROR_CODE_FETCH_BUDGET_EXHAUSTED" | (string & {})>;
}

export const ListResponse: Schema.Schema<ListResponse> = Schema.suspend(() => Schema.Struct({
  statements: Schema.optional(Schema.Array(Statement)),
  maxAge: Schema.optional(Schema.String),
  debugString: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListResponse" }) as any as Schema.Schema<ListResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Determines whether the specified (directional) relationship exists between the specified source and target assets. The relation describes the intent of the link between the two assets as claimed by the source asset. An example for such relationships is the delegation of privileges or permissions. This command is most often used by infrastructure systems to check preconditions for an action. For example, a client may want to know if it is OK to send a web URL to a particular mobile app instead. The client can check for the relevant asset link from the website to the mobile app to decide if the operation should be allowed. A note about security: if you specify a secure asset as the source, such as an HTTPS website or an Android app, the API will ensure that any statements used to generate the response have been made in a secure way by the owner of that asset. Conversely, if the source asset is an insecure HTTP website (that is, the URL starts with `http://` instead of `https://`), the API cannot verify its statements securely, and it is not possible to ensure that the website's statements have not been altered by a third party. For more information, see the [Digital Asset Links technical design specification](https://github.com/google/digitalassetlinks/blob/master/well-known/details.md). */
export interface CheckAssetlinksRequest {
  /** Web assets are identified by a URL that contains only the scheme, hostname and port parts. The format is http[s]://[:] Hostnames must be fully qualified: they must end in a single period ("`.`"). Only the schemes "http" and "https" are currently allowed. Port numbers are given as a decimal number, and they must be omitted if the standard port numbers are used: 80 for http and 443 for https. We call this limited URL the "site". All URLs that share the same scheme, hostname and port are considered to be a part of the site and thus belong to the web asset. Example: the asset with the site `https://www.google.com` contains all these URLs: * `https://www.google.com/` * `https://www.google.com:443/` * `https://www.google.com/foo` * `https://www.google.com/foo?bar` * `https://www.google.com/foo#bar` * `https://user@password:www.google.com/` But it does not contain these URLs: * `http://www.google.com/` (wrong scheme) * `https://google.com/` (hostname does not match) * `https://www.google.com:444/` (port does not match) REQUIRED */
  "source.web.site"?: string;
  /** Android App assets are naturally identified by their Java package name. For example, the Google Maps app uses the package name `com.google.android.apps.maps`. REQUIRED */
  "source.androidApp.packageName"?: string;
  /** The uppercase SHA-265 fingerprint of the certificate. From the PEM certificate, it can be acquired like this: $ keytool -printcert -file $CERTFILE | grep SHA256: SHA256: 14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83: \ 42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 or like this: $ openssl x509 -in $CERTFILE -noout -fingerprint -sha256 SHA256 Fingerprint=14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64: \ 16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 In this example, the contents of this field would be `14:6D:E9:83:C5:73: 06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF: 44:E5`. If these tools are not available to you, you can convert the PEM certificate into the DER format, compute the SHA-256 hash of that string and represent the result as a hexstring (that is, uppercase hexadecimal representations of each octet, separated by colons). */
  "source.androidApp.certificate.sha256Fingerprint"?: string;
  /** Query string for the relation. We identify relations with strings of the format `/`, where `` must be one of a set of pre-defined purpose categories, and `` is a free-form lowercase alphanumeric string that describes the specific use case of the statement. Refer to [our API documentation](/digital-asset-links/v1/relation-strings) for the current list of supported relations. For a query to match an asset link, both the query's and the asset link's relation strings must match exactly. Example: A query with relation `delegate_permission/common.handle_all_urls` matches an asset link with relation `delegate_permission/common.handle_all_urls`. */
  relation?: string;
  /** Web assets are identified by a URL that contains only the scheme, hostname and port parts. The format is http[s]://[:] Hostnames must be fully qualified: they must end in a single period ("`.`"). Only the schemes "http" and "https" are currently allowed. Port numbers are given as a decimal number, and they must be omitted if the standard port numbers are used: 80 for http and 443 for https. We call this limited URL the "site". All URLs that share the same scheme, hostname and port are considered to be a part of the site and thus belong to the web asset. Example: the asset with the site `https://www.google.com` contains all these URLs: * `https://www.google.com/` * `https://www.google.com:443/` * `https://www.google.com/foo` * `https://www.google.com/foo?bar` * `https://www.google.com/foo#bar` * `https://user@password:www.google.com/` But it does not contain these URLs: * `http://www.google.com/` (wrong scheme) * `https://google.com/` (hostname does not match) * `https://www.google.com:444/` (port does not match) REQUIRED */
  "target.web.site"?: string;
  /** Android App assets are naturally identified by their Java package name. For example, the Google Maps app uses the package name `com.google.android.apps.maps`. REQUIRED */
  "target.androidApp.packageName"?: string;
  /** The uppercase SHA-265 fingerprint of the certificate. From the PEM certificate, it can be acquired like this: $ keytool -printcert -file $CERTFILE | grep SHA256: SHA256: 14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83: \ 42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 or like this: $ openssl x509 -in $CERTFILE -noout -fingerprint -sha256 SHA256 Fingerprint=14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64: \ 16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 In this example, the contents of this field would be `14:6D:E9:83:C5:73: 06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF: 44:E5`. If these tools are not available to you, you can convert the PEM certificate into the DER format, compute the SHA-256 hash of that string and represent the result as a hexstring (that is, uppercase hexadecimal representations of each octet, separated by colons). */
  "target.androidApp.certificate.sha256Fingerprint"?: string;
  /** Whether to return relation_extensions payloads specified in the source Digital Asset Links statements linking the requested source and target assets by the requested relation type. If this is set to `false` (default), relation_extensions specified will not be returned, even if they are specified in the DAL statement file. If set to `true`, the API will propagate any and all relation_extensions, across statements, linking the source and target assets by the requested relation type, if specified in the DAL statement file. */
  returnRelationExtensions?: boolean;
}

export const CheckAssetlinksRequest = Schema.Struct({
  "source.web.site": Schema.optional(Schema.String).pipe(T.HttpQuery("source.web.site")),
  "source.androidApp.packageName": Schema.optional(Schema.String).pipe(T.HttpQuery("source.androidApp.packageName")),
  "source.androidApp.certificate.sha256Fingerprint": Schema.optional(Schema.String).pipe(T.HttpQuery("source.androidApp.certificate.sha256Fingerprint")),
  relation: Schema.optional(Schema.String).pipe(T.HttpQuery("relation")),
  "target.web.site": Schema.optional(Schema.String).pipe(T.HttpQuery("target.web.site")),
  "target.androidApp.packageName": Schema.optional(Schema.String).pipe(T.HttpQuery("target.androidApp.packageName")),
  "target.androidApp.certificate.sha256Fingerprint": Schema.optional(Schema.String).pipe(T.HttpQuery("target.androidApp.certificate.sha256Fingerprint")),
  returnRelationExtensions: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnRelationExtensions")),
}).pipe(
  T.Http({ method: "GET", path: "v1/assetlinks:check" }),
  svc,
) as unknown as Schema.Schema<CheckAssetlinksRequest>;

export type CheckAssetlinksResponse = CheckResponse;
export const CheckAssetlinksResponse = CheckResponse;

export type CheckAssetlinksError = CommonErrors;

export const checkAssetlinks: API.OperationMethod<CheckAssetlinksRequest, CheckAssetlinksResponse, CheckAssetlinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckAssetlinksRequest,
  output: CheckAssetlinksResponse,
  errors: [],
}));

/** Send a bundle of statement checks in a single RPC to minimize latency and service load. Statements need not be all for the same source and/or target. We recommend using this method when you need to check more than one statement in a short period of time. */
export interface BulkCheckAssetlinksRequest {
  /** Request body */
  body?: BulkCheckRequest;
}

export const BulkCheckAssetlinksRequest = Schema.Struct({
  body: Schema.optional(BulkCheckRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/assetlinks:bulkCheck", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkCheckAssetlinksRequest>;

export type BulkCheckAssetlinksResponse = BulkCheckResponse;
export const BulkCheckAssetlinksResponse = BulkCheckResponse;

export type BulkCheckAssetlinksError = CommonErrors;

export const bulkCheckAssetlinks: API.OperationMethod<BulkCheckAssetlinksRequest, BulkCheckAssetlinksResponse, BulkCheckAssetlinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkCheckAssetlinksRequest,
  output: BulkCheckAssetlinksResponse,
  errors: [],
}));

/** Retrieves a list of all statements from a given source that match the specified target and statement string. The API guarantees that all statements with secure source assets, such as HTTPS websites or Android apps, have been made in a secure way by the owner of those assets, as described in the [Digital Asset Links technical design specification](https://github.com/google/digitalassetlinks/blob/master/well-known/details.md). Specifically, you should consider that for insecure websites (that is, where the URL starts with `http://` instead of `https://`), this guarantee cannot be made. The `List` command is most useful in cases where the API client wants to know all the ways in which two assets are related, or enumerate all the relationships from a particular source asset. Example: a feature that helps users navigate to related items. When a mobile app is running on a device, the feature would make it easy to navigate to the corresponding web site or Google+ profile. */
export interface ListStatementsRequest {
  /** Web assets are identified by a URL that contains only the scheme, hostname and port parts. The format is http[s]://[:] Hostnames must be fully qualified: they must end in a single period ("`.`"). Only the schemes "http" and "https" are currently allowed. Port numbers are given as a decimal number, and they must be omitted if the standard port numbers are used: 80 for http and 443 for https. We call this limited URL the "site". All URLs that share the same scheme, hostname and port are considered to be a part of the site and thus belong to the web asset. Example: the asset with the site `https://www.google.com` contains all these URLs: * `https://www.google.com/` * `https://www.google.com:443/` * `https://www.google.com/foo` * `https://www.google.com/foo?bar` * `https://www.google.com/foo#bar` * `https://user@password:www.google.com/` But it does not contain these URLs: * `http://www.google.com/` (wrong scheme) * `https://google.com/` (hostname does not match) * `https://www.google.com:444/` (port does not match) REQUIRED */
  "source.web.site"?: string;
  /** Android App assets are naturally identified by their Java package name. For example, the Google Maps app uses the package name `com.google.android.apps.maps`. REQUIRED */
  "source.androidApp.packageName"?: string;
  /** The uppercase SHA-265 fingerprint of the certificate. From the PEM certificate, it can be acquired like this: $ keytool -printcert -file $CERTFILE | grep SHA256: SHA256: 14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83: \ 42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 or like this: $ openssl x509 -in $CERTFILE -noout -fingerprint -sha256 SHA256 Fingerprint=14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64: \ 16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 In this example, the contents of this field would be `14:6D:E9:83:C5:73: 06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF: 44:E5`. If these tools are not available to you, you can convert the PEM certificate into the DER format, compute the SHA-256 hash of that string and represent the result as a hexstring (that is, uppercase hexadecimal representations of each octet, separated by colons). */
  "source.androidApp.certificate.sha256Fingerprint"?: string;
  /** Use only associations that match the specified relation. See the [`Statement`](#Statement) message for a detailed definition of relation strings. For a query to match a statement, one of the following must be true: * both the query's and the statement's relation strings match exactly, or * the query's relation string is empty or missing. Example: A query with relation `delegate_permission/common.handle_all_urls` matches an asset link with relation `delegate_permission/common.handle_all_urls`. */
  relation?: string;
  /** Whether to return any relation_extensions payloads specified in the source digital asset links statements. If this is set to `false` (default), relation_extensions specified will not be returned, even if they are specified in the DAL statement file. If set to `true`, the API will propagate relation_extensions associated with each statement's relation type, if specified in the DAL statement file. */
  returnRelationExtensions?: boolean;
}

export const ListStatementsRequest = Schema.Struct({
  "source.web.site": Schema.optional(Schema.String).pipe(T.HttpQuery("source.web.site")),
  "source.androidApp.packageName": Schema.optional(Schema.String).pipe(T.HttpQuery("source.androidApp.packageName")),
  "source.androidApp.certificate.sha256Fingerprint": Schema.optional(Schema.String).pipe(T.HttpQuery("source.androidApp.certificate.sha256Fingerprint")),
  relation: Schema.optional(Schema.String).pipe(T.HttpQuery("relation")),
  returnRelationExtensions: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnRelationExtensions")),
}).pipe(
  T.Http({ method: "GET", path: "v1/statements:list" }),
  svc,
) as unknown as Schema.Schema<ListStatementsRequest>;

export type ListStatementsResponse = ListResponse;
export const ListStatementsResponse = ListResponse;

export type ListStatementsError = CommonErrors;

export const listStatements: API.OperationMethod<ListStatementsRequest, ListStatementsResponse, ListStatementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListStatementsRequest,
  output: ListStatementsResponse,
  errors: [],
}));

