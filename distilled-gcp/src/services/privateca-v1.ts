// ==========================================================================
// Certificate Authority API (privateca v1)
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
  name: "privateca",
  version: "v1",
  rootUrl: "https://privateca.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface ObjectId {
  /** Required. The parts of an OID path. The most significant parts of the path come first. */
  objectIdPath?: Array<number>;
}

export const ObjectId: Schema.Schema<ObjectId> = Schema.suspend(() => Schema.Struct({
  objectIdPath: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "ObjectId" }) as any as Schema.Schema<ObjectId>;

export interface AttributeTypeAndValue {
  /** The attribute type of the attribute and value pair. */
  type?: "ATTRIBUTE_TYPE_UNSPECIFIED" | "COMMON_NAME" | "COUNTRY_CODE" | "ORGANIZATION" | "ORGANIZATIONAL_UNIT" | "LOCALITY" | "PROVINCE" | "STREET_ADDRESS" | "POSTAL_CODE" | (string & {});
  /** Object ID for an attribute type of an attribute and value pair. */
  objectId?: ObjectId;
  /** The value for the attribute type. */
  value?: string;
}

export const AttributeTypeAndValue: Schema.Schema<AttributeTypeAndValue> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  objectId: Schema.optional(ObjectId),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "AttributeTypeAndValue" }) as any as Schema.Schema<AttributeTypeAndValue>;

export interface RelativeDistinguishedName {
  /** Attributes describes the attribute value assertions in the RDN. */
  attributes?: Array<AttributeTypeAndValue>;
}

export const RelativeDistinguishedName: Schema.Schema<RelativeDistinguishedName> = Schema.suspend(() => Schema.Struct({
  attributes: Schema.optional(Schema.Array(AttributeTypeAndValue)),
})).annotate({ identifier: "RelativeDistinguishedName" }) as any as Schema.Schema<RelativeDistinguishedName>;

export interface Subject {
  /** The "common name" of the subject. */
  commonName?: string;
  /** The country code of the subject. */
  countryCode?: string;
  /** The organization of the subject. */
  organization?: string;
  /** The organizational_unit of the subject. */
  organizationalUnit?: string;
  /** The locality or city of the subject. */
  locality?: string;
  /** The province, territory, or regional state of the subject. */
  province?: string;
  /** The street address of the subject. */
  streetAddress?: string;
  /** The postal code of the subject. */
  postalCode?: string;
  /** This field can be used in place of the named subject fields. */
  rdnSequence?: Array<RelativeDistinguishedName>;
}

export const Subject: Schema.Schema<Subject> = Schema.suspend(() => Schema.Struct({
  commonName: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  organizationalUnit: Schema.optional(Schema.String),
  locality: Schema.optional(Schema.String),
  province: Schema.optional(Schema.String),
  streetAddress: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  rdnSequence: Schema.optional(Schema.Array(RelativeDistinguishedName)),
})).annotate({ identifier: "Subject" }) as any as Schema.Schema<Subject>;

export interface X509Extension {
  /** Required. The OID for this X.509 extension. */
  objectId?: ObjectId;
  /** Optional. Indicates whether or not this extension is critical (i.e., if the client does not know how to handle this extension, the client should consider this to be an error). */
  critical?: boolean;
  /** Required. The value of this X.509 extension. */
  value?: string;
}

export const X509Extension: Schema.Schema<X509Extension> = Schema.suspend(() => Schema.Struct({
  objectId: Schema.optional(ObjectId),
  critical: Schema.optional(Schema.Boolean),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "X509Extension" }) as any as Schema.Schema<X509Extension>;

export interface SubjectAltNames {
  /** Contains only valid, fully-qualified host names. */
  dnsNames?: Array<string>;
  /** Contains only valid RFC 3986 URIs. */
  uris?: Array<string>;
  /** Contains only valid RFC 2822 E-mail addresses. */
  emailAddresses?: Array<string>;
  /** Contains only valid 32-bit IPv4 addresses or RFC 4291 IPv6 addresses. */
  ipAddresses?: Array<string>;
  /** Contains additional subject alternative name values. For each custom_san, the `value` field must contain an ASN.1 encoded UTF8String. */
  customSans?: Array<X509Extension>;
}

export const SubjectAltNames: Schema.Schema<SubjectAltNames> = Schema.suspend(() => Schema.Struct({
  dnsNames: Schema.optional(Schema.Array(Schema.String)),
  uris: Schema.optional(Schema.Array(Schema.String)),
  emailAddresses: Schema.optional(Schema.Array(Schema.String)),
  ipAddresses: Schema.optional(Schema.Array(Schema.String)),
  customSans: Schema.optional(Schema.Array(X509Extension)),
})).annotate({ identifier: "SubjectAltNames" }) as any as Schema.Schema<SubjectAltNames>;

export interface SubjectConfig {
  /** Optional. Contains distinguished name fields such as the common name, location and organization. */
  subject?: Subject;
  /** Optional. The subject alternative name fields. */
  subjectAltName?: SubjectAltNames;
}

export const SubjectConfig: Schema.Schema<SubjectConfig> = Schema.suspend(() => Schema.Struct({
  subject: Schema.optional(Subject),
  subjectAltName: Schema.optional(SubjectAltNames),
})).annotate({ identifier: "SubjectConfig" }) as any as Schema.Schema<SubjectConfig>;

export interface KeyUsageOptions {
  /** The key may be used for digital signatures. */
  digitalSignature?: boolean;
  /** The key may be used for cryptographic commitments. Note that this may also be referred to as "non-repudiation". */
  contentCommitment?: boolean;
  /** The key may be used to encipher other keys. */
  keyEncipherment?: boolean;
  /** The key may be used to encipher data. */
  dataEncipherment?: boolean;
  /** The key may be used in a key agreement protocol. */
  keyAgreement?: boolean;
  /** The key may be used to sign certificates. */
  certSign?: boolean;
  /** The key may be used sign certificate revocation lists. */
  crlSign?: boolean;
  /** The key may be used to encipher only. */
  encipherOnly?: boolean;
  /** The key may be used to decipher only. */
  decipherOnly?: boolean;
}

export const KeyUsageOptions: Schema.Schema<KeyUsageOptions> = Schema.suspend(() => Schema.Struct({
  digitalSignature: Schema.optional(Schema.Boolean),
  contentCommitment: Schema.optional(Schema.Boolean),
  keyEncipherment: Schema.optional(Schema.Boolean),
  dataEncipherment: Schema.optional(Schema.Boolean),
  keyAgreement: Schema.optional(Schema.Boolean),
  certSign: Schema.optional(Schema.Boolean),
  crlSign: Schema.optional(Schema.Boolean),
  encipherOnly: Schema.optional(Schema.Boolean),
  decipherOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "KeyUsageOptions" }) as any as Schema.Schema<KeyUsageOptions>;

export interface ExtendedKeyUsageOptions {
  /** Corresponds to OID 1.3.6.1.5.5.7.3.1. Officially described as "TLS WWW server authentication", though regularly used for non-WWW TLS. */
  serverAuth?: boolean;
  /** Corresponds to OID 1.3.6.1.5.5.7.3.2. Officially described as "TLS WWW client authentication", though regularly used for non-WWW TLS. */
  clientAuth?: boolean;
  /** Corresponds to OID 1.3.6.1.5.5.7.3.3. Officially described as "Signing of downloadable executable code client authentication". */
  codeSigning?: boolean;
  /** Corresponds to OID 1.3.6.1.5.5.7.3.4. Officially described as "Email protection". */
  emailProtection?: boolean;
  /** Corresponds to OID 1.3.6.1.5.5.7.3.8. Officially described as "Binding the hash of an object to a time". */
  timeStamping?: boolean;
  /** Corresponds to OID 1.3.6.1.5.5.7.3.9. Officially described as "Signing OCSP responses". */
  ocspSigning?: boolean;
}

export const ExtendedKeyUsageOptions: Schema.Schema<ExtendedKeyUsageOptions> = Schema.suspend(() => Schema.Struct({
  serverAuth: Schema.optional(Schema.Boolean),
  clientAuth: Schema.optional(Schema.Boolean),
  codeSigning: Schema.optional(Schema.Boolean),
  emailProtection: Schema.optional(Schema.Boolean),
  timeStamping: Schema.optional(Schema.Boolean),
  ocspSigning: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ExtendedKeyUsageOptions" }) as any as Schema.Schema<ExtendedKeyUsageOptions>;

export interface KeyUsage {
  /** Describes high-level ways in which a key may be used. */
  baseKeyUsage?: KeyUsageOptions;
  /** Detailed scenarios in which a key may be used. */
  extendedKeyUsage?: ExtendedKeyUsageOptions;
  /** Used to describe extended key usages that are not listed in the KeyUsage.ExtendedKeyUsageOptions message. */
  unknownExtendedKeyUsages?: Array<ObjectId>;
}

export const KeyUsage: Schema.Schema<KeyUsage> = Schema.suspend(() => Schema.Struct({
  baseKeyUsage: Schema.optional(KeyUsageOptions),
  extendedKeyUsage: Schema.optional(ExtendedKeyUsageOptions),
  unknownExtendedKeyUsages: Schema.optional(Schema.Array(ObjectId)),
})).annotate({ identifier: "KeyUsage" }) as any as Schema.Schema<KeyUsage>;

export interface CaOptions {
  /** Optional. Refers to the "CA" boolean field in the X.509 extension. When this value is missing, the basic constraints extension will be omitted from the certificate. */
  isCa?: boolean;
  /** Optional. Refers to the path length constraint field in the X.509 extension. For a CA certificate, this value describes the depth of subordinate CA certificates that are allowed. If this value is less than 0, the request will fail. If this value is missing, the max path length will be omitted from the certificate. */
  maxIssuerPathLength?: number;
}

export const CaOptions: Schema.Schema<CaOptions> = Schema.suspend(() => Schema.Struct({
  isCa: Schema.optional(Schema.Boolean),
  maxIssuerPathLength: Schema.optional(Schema.Number),
})).annotate({ identifier: "CaOptions" }) as any as Schema.Schema<CaOptions>;

export interface NameConstraints {
  /** Indicates whether or not the name constraints are marked critical. */
  critical?: boolean;
  /** Contains permitted DNS names. Any DNS name that can be constructed by simply adding zero or more labels to the left-hand side of the name satisfies the name constraint. For example, `example.com`, `www.example.com`, `www.sub.example.com` would satisfy `example.com` while `example1.com` does not. */
  permittedDnsNames?: Array<string>;
  /** Contains excluded DNS names. Any DNS name that can be constructed by simply adding zero or more labels to the left-hand side of the name satisfies the name constraint. For example, `example.com`, `www.example.com`, `www.sub.example.com` would satisfy `example.com` while `example1.com` does not. */
  excludedDnsNames?: Array<string>;
  /** Contains the permitted IP ranges. For IPv4 addresses, the ranges are expressed using CIDR notation as specified in RFC 4632. For IPv6 addresses, the ranges are expressed in similar encoding as IPv4 addresses. */
  permittedIpRanges?: Array<string>;
  /** Contains the excluded IP ranges. For IPv4 addresses, the ranges are expressed using CIDR notation as specified in RFC 4632. For IPv6 addresses, the ranges are expressed in similar encoding as IPv4 addresses. */
  excludedIpRanges?: Array<string>;
  /** Contains the permitted email addresses. The value can be a particular email address, a hostname to indicate all email addresses on that host or a domain with a leading period (e.g. `.example.com`) to indicate all email addresses in that domain. */
  permittedEmailAddresses?: Array<string>;
  /** Contains the excluded email addresses. The value can be a particular email address, a hostname to indicate all email addresses on that host or a domain with a leading period (e.g. `.example.com`) to indicate all email addresses in that domain. */
  excludedEmailAddresses?: Array<string>;
  /** Contains the permitted URIs that apply to the host part of the name. The value can be a hostname or a domain with a leading period (like `.example.com`) */
  permittedUris?: Array<string>;
  /** Contains the excluded URIs that apply to the host part of the name. The value can be a hostname or a domain with a leading period (like `.example.com`) */
  excludedUris?: Array<string>;
}

export const NameConstraints: Schema.Schema<NameConstraints> = Schema.suspend(() => Schema.Struct({
  critical: Schema.optional(Schema.Boolean),
  permittedDnsNames: Schema.optional(Schema.Array(Schema.String)),
  excludedDnsNames: Schema.optional(Schema.Array(Schema.String)),
  permittedIpRanges: Schema.optional(Schema.Array(Schema.String)),
  excludedIpRanges: Schema.optional(Schema.Array(Schema.String)),
  permittedEmailAddresses: Schema.optional(Schema.Array(Schema.String)),
  excludedEmailAddresses: Schema.optional(Schema.Array(Schema.String)),
  permittedUris: Schema.optional(Schema.Array(Schema.String)),
  excludedUris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "NameConstraints" }) as any as Schema.Schema<NameConstraints>;

export interface X509Parameters {
  /** Optional. Indicates the intended use for keys that correspond to a certificate. */
  keyUsage?: KeyUsage;
  /** Optional. Describes options in this X509Parameters that are relevant in a CA certificate. If not specified, a default basic constraints extension with `is_ca=false` will be added for leaf certificates. */
  caOptions?: CaOptions;
  /** Optional. Describes the X.509 certificate policy object identifiers, per https://tools.ietf.org/html/rfc5280#section-4.2.1.4. */
  policyIds?: Array<ObjectId>;
  /** Optional. Describes Online Certificate Status Protocol (OCSP) endpoint addresses that appear in the "Authority Information Access" extension in the certificate. */
  aiaOcspServers?: Array<string>;
  /** Optional. Describes the X.509 name constraints extension. */
  nameConstraints?: NameConstraints;
  /** Optional. Describes custom X.509 extensions. */
  additionalExtensions?: Array<X509Extension>;
}

export const X509Parameters: Schema.Schema<X509Parameters> = Schema.suspend(() => Schema.Struct({
  keyUsage: Schema.optional(KeyUsage),
  caOptions: Schema.optional(CaOptions),
  policyIds: Schema.optional(Schema.Array(ObjectId)),
  aiaOcspServers: Schema.optional(Schema.Array(Schema.String)),
  nameConstraints: Schema.optional(NameConstraints),
  additionalExtensions: Schema.optional(Schema.Array(X509Extension)),
})).annotate({ identifier: "X509Parameters" }) as any as Schema.Schema<X509Parameters>;

export interface PublicKey {
  /** Required. A public key. The padding and encoding must match with the `KeyFormat` value specified for the `format` field. */
  key?: string;
  /** Required. The format of the public key. */
  format?: "KEY_FORMAT_UNSPECIFIED" | "PEM" | (string & {});
}

export const PublicKey: Schema.Schema<PublicKey> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
})).annotate({ identifier: "PublicKey" }) as any as Schema.Schema<PublicKey>;

export interface CertificateConfigKeyId {
  /** Required. The value of this KeyId encoded in lowercase hexadecimal. This is most likely the 160 bit SHA-1 hash of the public key. */
  keyId?: string;
}

export const CertificateConfigKeyId: Schema.Schema<CertificateConfigKeyId> = Schema.suspend(() => Schema.Struct({
  keyId: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateConfigKeyId" }) as any as Schema.Schema<CertificateConfigKeyId>;

export interface CertificateConfig {
  /** Required. Specifies some of the values in a certificate that are related to the subject. */
  subjectConfig?: SubjectConfig;
  /** Required. Describes how some of the technical X.509 fields in a certificate should be populated. */
  x509Config?: X509Parameters;
  /** Optional. The public key that corresponds to this config. This is, for example, used when issuing Certificates, but not when creating a self-signed CertificateAuthority or CertificateAuthority CSR. */
  publicKey?: PublicKey;
  /** Optional. When specified this provides a custom SKI to be used in the certificate. This should only be used to maintain a SKI of an existing CA originally created outside CA service, which was not generated using method (1) described in RFC 5280 section 4.2.1.2. */
  subjectKeyId?: CertificateConfigKeyId;
}

export const CertificateConfig: Schema.Schema<CertificateConfig> = Schema.suspend(() => Schema.Struct({
  subjectConfig: Schema.optional(SubjectConfig),
  x509Config: Schema.optional(X509Parameters),
  publicKey: Schema.optional(PublicKey),
  subjectKeyId: Schema.optional(CertificateConfigKeyId),
})).annotate({ identifier: "CertificateConfig" }) as any as Schema.Schema<CertificateConfig>;

export interface RevocationDetails {
  /** Indicates why a Certificate was revoked. */
  revocationState?: "REVOCATION_REASON_UNSPECIFIED" | "KEY_COMPROMISE" | "CERTIFICATE_AUTHORITY_COMPROMISE" | "AFFILIATION_CHANGED" | "SUPERSEDED" | "CESSATION_OF_OPERATION" | "CERTIFICATE_HOLD" | "PRIVILEGE_WITHDRAWN" | "ATTRIBUTE_AUTHORITY_COMPROMISE" | (string & {});
  /** The time at which this Certificate was revoked. */
  revocationTime?: string;
}

export const RevocationDetails: Schema.Schema<RevocationDetails> = Schema.suspend(() => Schema.Struct({
  revocationState: Schema.optional(Schema.String),
  revocationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "RevocationDetails" }) as any as Schema.Schema<RevocationDetails>;

export interface SubjectDescription {
  /** Contains distinguished name fields such as the common name, location and / organization. */
  subject?: Subject;
  /** The subject alternative name fields. */
  subjectAltName?: SubjectAltNames;
  /** The serial number encoded in lowercase hexadecimal. */
  hexSerialNumber?: string;
  /** For convenience, the actual lifetime of an issued certificate. */
  lifetime?: string;
  /** The time at which the certificate becomes valid. */
  notBeforeTime?: string;
  /** The time after which the certificate is expired. Per RFC 5280, the validity period for a certificate is the period of time from not_before_time through not_after_time, inclusive. Corresponds to 'not_before_time' + 'lifetime' - 1 second. */
  notAfterTime?: string;
}

export const SubjectDescription: Schema.Schema<SubjectDescription> = Schema.suspend(() => Schema.Struct({
  subject: Schema.optional(Subject),
  subjectAltName: Schema.optional(SubjectAltNames),
  hexSerialNumber: Schema.optional(Schema.String),
  lifetime: Schema.optional(Schema.String),
  notBeforeTime: Schema.optional(Schema.String),
  notAfterTime: Schema.optional(Schema.String),
})).annotate({ identifier: "SubjectDescription" }) as any as Schema.Schema<SubjectDescription>;

export interface KeyId {
  /** Optional. The value of this KeyId encoded in lowercase hexadecimal. This is most likely the 160 bit SHA-1 hash of the public key. */
  keyId?: string;
}

export const KeyId: Schema.Schema<KeyId> = Schema.suspend(() => Schema.Struct({
  keyId: Schema.optional(Schema.String),
})).annotate({ identifier: "KeyId" }) as any as Schema.Schema<KeyId>;

export interface CertificateFingerprint {
  /** The SHA 256 hash, encoded in hexadecimal, of the DER x509 certificate. */
  sha256Hash?: string;
}

export const CertificateFingerprint: Schema.Schema<CertificateFingerprint> = Schema.suspend(() => Schema.Struct({
  sha256Hash: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateFingerprint" }) as any as Schema.Schema<CertificateFingerprint>;

export interface CertificateDescription {
  /** Describes some of the values in a certificate that are related to the subject and lifetime. */
  subjectDescription?: SubjectDescription;
  /** Describes some of the technical X.509 fields in a certificate. */
  x509Description?: X509Parameters;
  /** The public key that corresponds to an issued certificate. */
  publicKey?: PublicKey;
  /** Provides a means of identifiying certificates that contain a particular public key, per https://tools.ietf.org/html/rfc5280#section-4.2.1.2. */
  subjectKeyId?: KeyId;
  /** Identifies the subject_key_id of the parent certificate, per https://tools.ietf.org/html/rfc5280#section-4.2.1.1 */
  authorityKeyId?: KeyId;
  /** Describes a list of locations to obtain CRL information, i.e. the DistributionPoint.fullName described by https://tools.ietf.org/html/rfc5280#section-4.2.1.13 */
  crlDistributionPoints?: Array<string>;
  /** Describes lists of issuer CA certificate URLs that appear in the "Authority Information Access" extension in the certificate. */
  aiaIssuingCertificateUrls?: Array<string>;
  /** The hash of the x.509 certificate. */
  certFingerprint?: CertificateFingerprint;
  /** The hash of the pre-signed certificate, which will be signed by the CA. Corresponds to the TBS Certificate in https://tools.ietf.org/html/rfc5280#section-4.1.2. The field will always be populated. */
  tbsCertificateDigest?: string;
}

export const CertificateDescription: Schema.Schema<CertificateDescription> = Schema.suspend(() => Schema.Struct({
  subjectDescription: Schema.optional(SubjectDescription),
  x509Description: Schema.optional(X509Parameters),
  publicKey: Schema.optional(PublicKey),
  subjectKeyId: Schema.optional(KeyId),
  authorityKeyId: Schema.optional(KeyId),
  crlDistributionPoints: Schema.optional(Schema.Array(Schema.String)),
  aiaIssuingCertificateUrls: Schema.optional(Schema.Array(Schema.String)),
  certFingerprint: Schema.optional(CertificateFingerprint),
  tbsCertificateDigest: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateDescription" }) as any as Schema.Schema<CertificateDescription>;

export interface Certificate {
  /** Identifier. The resource name for this Certificate in the format `projects/* /locations/* /caPools/* /certificates/*`. */
  name?: string;
  /** Immutable. A pem-encoded X.509 certificate signing request (CSR). */
  pemCsr?: string;
  /** Immutable. A description of the certificate and key that does not require X.509 or ASN.1. */
  config?: CertificateConfig;
  /** Output only. The resource name of the issuing CertificateAuthority in the format `projects/* /locations/* /caPools/* /certificateAuthorities/*`. */
  issuerCertificateAuthority?: string;
  /** Required. Immutable. The desired lifetime of a certificate. Used to create the "not_before_time" and "not_after_time" fields inside an X.509 certificate. Note that the lifetime may be truncated if it would extend past the life of any certificate authority in the issuing chain. */
  lifetime?: string;
  /** Immutable. The resource name for a CertificateTemplate used to issue this certificate, in the format `projects/* /locations/* /certificateTemplates/*`. If this is specified, the caller must have the necessary permission to use this template. If this is omitted, no template will be used. This template must be in the same location as the Certificate. */
  certificateTemplate?: string;
  /** Immutable. Specifies how the Certificate's identity fields are to be decided. If this is omitted, the `DEFAULT` subject mode will be used. */
  subjectMode?: "SUBJECT_REQUEST_MODE_UNSPECIFIED" | "DEFAULT" | "RDN_SEQUENCE" | "REFLECTED_SPIFFE" | (string & {});
  /** Output only. Details regarding the revocation of this Certificate. This Certificate is considered revoked if and only if this field is present. */
  revocationDetails?: RevocationDetails;
  /** Output only. The pem-encoded, signed X.509 certificate. */
  pemCertificate?: string;
  /** Output only. A structured description of the issued X.509 certificate. */
  certificateDescription?: CertificateDescription;
  /** Output only. The chain that may be used to verify the X.509 certificate. Expected to be in issuer-to-root order according to RFC 5246. */
  pemCertificateChain?: Array<string>;
  /** Output only. The time at which this Certificate was created. */
  createTime?: string;
  /** Output only. The time at which this Certificate was updated. */
  updateTime?: string;
  /** Optional. Labels with user-defined metadata. */
  labels?: Record<string, string>;
}

export const Certificate: Schema.Schema<Certificate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  pemCsr: Schema.optional(Schema.String),
  config: Schema.optional(CertificateConfig),
  issuerCertificateAuthority: Schema.optional(Schema.String),
  lifetime: Schema.optional(Schema.String),
  certificateTemplate: Schema.optional(Schema.String),
  subjectMode: Schema.optional(Schema.String),
  revocationDetails: Schema.optional(RevocationDetails),
  pemCertificate: Schema.optional(Schema.String),
  certificateDescription: Schema.optional(CertificateDescription),
  pemCertificateChain: Schema.optional(Schema.Array(Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Certificate" }) as any as Schema.Schema<Certificate>;

export interface ListCertificatesResponse {
  /** The list of Certificates. */
  certificates?: Array<Certificate>;
  /** A token to retrieve next page of results. Pass this value in ListCertificatesRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** A list of locations (e.g. "us-west1") that could not be reached. */
  unreachable?: Array<string>;
}

export const ListCertificatesResponse: Schema.Schema<ListCertificatesResponse> = Schema.suspend(() => Schema.Struct({
  certificates: Schema.optional(Schema.Array(Certificate)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCertificatesResponse" }) as any as Schema.Schema<ListCertificatesResponse>;

export interface RevokeCertificateRequest {
  /** Required. The RevocationReason for revoking this certificate. */
  reason?: "REVOCATION_REASON_UNSPECIFIED" | "KEY_COMPROMISE" | "CERTIFICATE_AUTHORITY_COMPROMISE" | "AFFILIATION_CHANGED" | "SUPERSEDED" | "CESSATION_OF_OPERATION" | "CERTIFICATE_HOLD" | "PRIVILEGE_WITHDRAWN" | "ATTRIBUTE_AUTHORITY_COMPROMISE" | (string & {});
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const RevokeCertificateRequest: Schema.Schema<RevokeCertificateRequest> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RevokeCertificateRequest" }) as any as Schema.Schema<RevokeCertificateRequest>;

export interface SubordinateConfigChain {
  /** Required. Expected to be in leaf-to-root order according to RFC 5246. */
  pemCertificates?: Array<string>;
}

export const SubordinateConfigChain: Schema.Schema<SubordinateConfigChain> = Schema.suspend(() => Schema.Struct({
  pemCertificates: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SubordinateConfigChain" }) as any as Schema.Schema<SubordinateConfigChain>;

export interface SubordinateConfig {
  /** Required. This can refer to a CertificateAuthority that was used to create a subordinate CertificateAuthority. This field is used for information and usability purposes only. The resource name is in the format `projects/* /locations/* /caPools/* /certificateAuthorities/*`. */
  certificateAuthority?: string;
  /** Required. Contains the PEM certificate chain for the issuers of this CertificateAuthority, but not pem certificate for this CA itself. */
  pemIssuerChain?: SubordinateConfigChain;
}

export const SubordinateConfig: Schema.Schema<SubordinateConfig> = Schema.suspend(() => Schema.Struct({
  certificateAuthority: Schema.optional(Schema.String),
  pemIssuerChain: Schema.optional(SubordinateConfigChain),
})).annotate({ identifier: "SubordinateConfig" }) as any as Schema.Schema<SubordinateConfig>;

export interface ActivateCertificateAuthorityRequest {
  /** Required. The signed CA certificate issued from FetchCertificateAuthorityCsrResponse.pem_csr. */
  pemCaCertificate?: string;
  /** Required. Must include information about the issuer of 'pem_ca_certificate', and any further issuers until the self-signed CA. */
  subordinateConfig?: SubordinateConfig;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const ActivateCertificateAuthorityRequest: Schema.Schema<ActivateCertificateAuthorityRequest> = Schema.suspend(() => Schema.Struct({
  pemCaCertificate: Schema.optional(Schema.String),
  subordinateConfig: Schema.optional(SubordinateConfig),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "ActivateCertificateAuthorityRequest" }) as any as Schema.Schema<ActivateCertificateAuthorityRequest>;

export interface KeyVersionSpec {
  /** The resource name for an existing Cloud KMS CryptoKeyVersion in the format `projects/* /locations/* /keyRings/* /cryptoKeys/* /cryptoKeyVersions/*`. This option enables full flexibility in the key's capabilities and properties. */
  cloudKmsKeyVersion?: string;
  /** The algorithm to use for creating a managed Cloud KMS key for a for a simplified experience. All managed keys will be have their ProtectionLevel as `HSM`. */
  algorithm?: "SIGN_HASH_ALGORITHM_UNSPECIFIED" | "RSA_PSS_2048_SHA256" | "RSA_PSS_3072_SHA256" | "RSA_PSS_4096_SHA256" | "RSA_PKCS1_2048_SHA256" | "RSA_PKCS1_3072_SHA256" | "RSA_PKCS1_4096_SHA256" | "EC_P256_SHA256" | "EC_P384_SHA384" | (string & {});
}

export const KeyVersionSpec: Schema.Schema<KeyVersionSpec> = Schema.suspend(() => Schema.Struct({
  cloudKmsKeyVersion: Schema.optional(Schema.String),
  algorithm: Schema.optional(Schema.String),
})).annotate({ identifier: "KeyVersionSpec" }) as any as Schema.Schema<KeyVersionSpec>;

export interface AccessUrls {
  /** The URL where this CertificateAuthority's CA certificate is published. This will only be set for CAs that have been activated. */
  caCertificateAccessUrl?: string;
  /** The URLs where this CertificateAuthority's CRLs are published. This will only be set for CAs that have been activated. */
  crlAccessUrls?: Array<string>;
}

export const AccessUrls: Schema.Schema<AccessUrls> = Schema.suspend(() => Schema.Struct({
  caCertificateAccessUrl: Schema.optional(Schema.String),
  crlAccessUrls: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AccessUrls" }) as any as Schema.Schema<AccessUrls>;

export interface UserDefinedAccessUrls {
  /** Optional. A list of URLs where the issuer CA certificate may be downloaded, which appears in the "Authority Information Access" extension in the certificate. If specified, the default Cloud Storage URLs will be omitted. */
  aiaIssuingCertificateUrls?: Array<string>;
  /** Optional. A list of URLs where to obtain CRL information, i.e. the DistributionPoint.fullName described by https://tools.ietf.org/html/rfc5280#section-4.2.1.13. If specified, the default Cloud Storage URLs will be omitted. */
  crlAccessUrls?: Array<string>;
}

export const UserDefinedAccessUrls: Schema.Schema<UserDefinedAccessUrls> = Schema.suspend(() => Schema.Struct({
  aiaIssuingCertificateUrls: Schema.optional(Schema.Array(Schema.String)),
  crlAccessUrls: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UserDefinedAccessUrls" }) as any as Schema.Schema<UserDefinedAccessUrls>;

export interface CertificateAuthority {
  /** Identifier. The resource name for this CertificateAuthority in the format `projects/* /locations/* /caPools/* /certificateAuthorities/*`. */
  name?: string;
  /** Required. Immutable. The Type of this CertificateAuthority. */
  type?: "TYPE_UNSPECIFIED" | "SELF_SIGNED" | "SUBORDINATE" | (string & {});
  /** Required. Immutable. The config used to create a self-signed X.509 certificate or CSR. */
  config?: CertificateConfig;
  /** Required. Immutable. The desired lifetime of the CA certificate. Used to create the "not_before_time" and "not_after_time" fields inside an X.509 certificate. */
  lifetime?: string;
  /** Required. Immutable. Used when issuing certificates for this CertificateAuthority. If this CertificateAuthority is a self-signed CertificateAuthority, this key is also used to sign the self-signed CA certificate. Otherwise, it is used to sign a CSR. */
  keySpec?: KeyVersionSpec;
  /** Optional. If this is a subordinate CertificateAuthority, this field will be set with the subordinate configuration, which describes its issuers. This may be updated, but this CertificateAuthority must continue to validate. */
  subordinateConfig?: SubordinateConfig;
  /** Output only. The CaPool.Tier of the CaPool that includes this CertificateAuthority. */
  tier?: "TIER_UNSPECIFIED" | "ENTERPRISE" | "DEVOPS" | (string & {});
  /** Output only. The State for this CertificateAuthority. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "STAGED" | "AWAITING_USER_ACTIVATION" | "DELETED" | (string & {});
  /** Output only. This CertificateAuthority's certificate chain, including the current CertificateAuthority's certificate. Ordered such that the root issuer is the final element (consistent with RFC 5246). For a self-signed CA, this will only list the current CertificateAuthority's certificate. */
  pemCaCertificates?: Array<string>;
  /** Output only. A structured description of this CertificateAuthority's CA certificate and its issuers. Ordered as self-to-root. */
  caCertificateDescriptions?: Array<CertificateDescription>;
  /** Immutable. The name of a Cloud Storage bucket where this CertificateAuthority will publish content, such as the CA certificate and CRLs. This must be a bucket name, without any prefixes (such as `gs://`) or suffixes (such as `.googleapis.com`). For example, to use a bucket named `my-bucket`, you would simply specify `my-bucket`. If not specified, a managed bucket will be created. */
  gcsBucket?: string;
  /** Output only. URLs for accessing content published by this CA, such as the CA certificate and CRLs. */
  accessUrls?: AccessUrls;
  /** Output only. The time at which this CertificateAuthority was created. */
  createTime?: string;
  /** Output only. The time at which this CertificateAuthority was last updated. */
  updateTime?: string;
  /** Output only. The time at which this CertificateAuthority was soft deleted, if it is in the DELETED state. */
  deleteTime?: string;
  /** Output only. The time at which this CertificateAuthority will be permanently purged, if it is in the DELETED state. */
  expireTime?: string;
  /** Optional. Labels with user-defined metadata. */
  labels?: Record<string, string>;
  /** Optional. User-defined URLs for CA certificate and CRLs. The service does not publish content to these URLs. It is up to the user to mirror content to these URLs. */
  userDefinedAccessUrls?: UserDefinedAccessUrls;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
}

export const CertificateAuthority: Schema.Schema<CertificateAuthority> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  config: Schema.optional(CertificateConfig),
  lifetime: Schema.optional(Schema.String),
  keySpec: Schema.optional(KeyVersionSpec),
  subordinateConfig: Schema.optional(SubordinateConfig),
  tier: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  pemCaCertificates: Schema.optional(Schema.Array(Schema.String)),
  caCertificateDescriptions: Schema.optional(Schema.Array(CertificateDescription)),
  gcsBucket: Schema.optional(Schema.String),
  accessUrls: Schema.optional(AccessUrls),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  userDefinedAccessUrls: Schema.optional(UserDefinedAccessUrls),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CertificateAuthority" }) as any as Schema.Schema<CertificateAuthority>;

export interface DisableCertificateAuthorityRequest {
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. This field allows this CA to be disabled even if it's being depended on by another resource. However, doing so may result in unintended and unrecoverable effects on any dependent resources since the CA will no longer be able to issue certificates. */
  ignoreDependentResources?: boolean;
}

export const DisableCertificateAuthorityRequest: Schema.Schema<DisableCertificateAuthorityRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  ignoreDependentResources: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DisableCertificateAuthorityRequest" }) as any as Schema.Schema<DisableCertificateAuthorityRequest>;

export interface EnableCertificateAuthorityRequest {
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const EnableCertificateAuthorityRequest: Schema.Schema<EnableCertificateAuthorityRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "EnableCertificateAuthorityRequest" }) as any as Schema.Schema<EnableCertificateAuthorityRequest>;

export interface FetchCertificateAuthorityCsrResponse {
  /** Output only. The PEM-encoded signed certificate signing request (CSR). */
  pemCsr?: string;
}

export const FetchCertificateAuthorityCsrResponse: Schema.Schema<FetchCertificateAuthorityCsrResponse> = Schema.suspend(() => Schema.Struct({
  pemCsr: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchCertificateAuthorityCsrResponse" }) as any as Schema.Schema<FetchCertificateAuthorityCsrResponse>;

export interface ListCertificateAuthoritiesResponse {
  /** The list of CertificateAuthorities. */
  certificateAuthorities?: Array<CertificateAuthority>;
  /** A token to retrieve next page of results. Pass this value in ListCertificateAuthoritiesRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** A list of locations (e.g. "us-west1") that could not be reached. */
  unreachable?: Array<string>;
}

export const ListCertificateAuthoritiesResponse: Schema.Schema<ListCertificateAuthoritiesResponse> = Schema.suspend(() => Schema.Struct({
  certificateAuthorities: Schema.optional(Schema.Array(CertificateAuthority)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCertificateAuthoritiesResponse" }) as any as Schema.Schema<ListCertificateAuthoritiesResponse>;

export interface UndeleteCertificateAuthorityRequest {
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const UndeleteCertificateAuthorityRequest: Schema.Schema<UndeleteCertificateAuthorityRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "UndeleteCertificateAuthorityRequest" }) as any as Schema.Schema<UndeleteCertificateAuthorityRequest>;

export interface RsaKeyType {
  /** Optional. The minimum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service-level min RSA modulus size will continue to apply. */
  minModulusSize?: string;
  /** Optional. The maximum allowed RSA modulus size (inclusive), in bits. If this is not set, or if set to zero, the service will not enforce an explicit upper bound on RSA modulus sizes. */
  maxModulusSize?: string;
}

export const RsaKeyType: Schema.Schema<RsaKeyType> = Schema.suspend(() => Schema.Struct({
  minModulusSize: Schema.optional(Schema.String),
  maxModulusSize: Schema.optional(Schema.String),
})).annotate({ identifier: "RsaKeyType" }) as any as Schema.Schema<RsaKeyType>;

export interface EcKeyType {
  /** Optional. A signature algorithm that must be used. If this is omitted, any EC-based signature algorithm will be allowed. */
  signatureAlgorithm?: "EC_SIGNATURE_ALGORITHM_UNSPECIFIED" | "ECDSA_P256" | "ECDSA_P384" | "EDDSA_25519" | (string & {});
}

export const EcKeyType: Schema.Schema<EcKeyType> = Schema.suspend(() => Schema.Struct({
  signatureAlgorithm: Schema.optional(Schema.String),
})).annotate({ identifier: "EcKeyType" }) as any as Schema.Schema<EcKeyType>;

export interface AllowedKeyType {
  /** Represents an allowed RSA key type. */
  rsa?: RsaKeyType;
  /** Represents an allowed Elliptic Curve key type. */
  ellipticCurve?: EcKeyType;
}

export const AllowedKeyType: Schema.Schema<AllowedKeyType> = Schema.suspend(() => Schema.Struct({
  rsa: Schema.optional(RsaKeyType),
  ellipticCurve: Schema.optional(EcKeyType),
})).annotate({ identifier: "AllowedKeyType" }) as any as Schema.Schema<AllowedKeyType>;

export interface IssuanceModes {
  /** Optional. When true, allows callers to create Certificates by specifying a CSR. */
  allowCsrBasedIssuance?: boolean;
  /** Optional. When true, allows callers to create Certificates by specifying a CertificateConfig. */
  allowConfigBasedIssuance?: boolean;
}

export const IssuanceModes: Schema.Schema<IssuanceModes> = Schema.suspend(() => Schema.Struct({
  allowCsrBasedIssuance: Schema.optional(Schema.Boolean),
  allowConfigBasedIssuance: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "IssuanceModes" }) as any as Schema.Schema<IssuanceModes>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface CertificateIdentityConstraints {
  /** Optional. A CEL expression that may be used to validate the resolved X.509 Subject and/or Subject Alternative Name before a certificate is signed. To see the full allowed syntax and some examples, see https://cloud.google.com/certificate-authority-service/docs/using-cel */
  celExpression?: Expr;
  /** Required. If this is true, the Subject field may be copied from a certificate request into the signed certificate. Otherwise, the requested Subject will be discarded. */
  allowSubjectPassthrough?: boolean;
  /** Required. If this is true, the SubjectAltNames extension may be copied from a certificate request into the signed certificate. Otherwise, the requested SubjectAltNames will be discarded. */
  allowSubjectAltNamesPassthrough?: boolean;
}

export const CertificateIdentityConstraints: Schema.Schema<CertificateIdentityConstraints> = Schema.suspend(() => Schema.Struct({
  celExpression: Schema.optional(Expr),
  allowSubjectPassthrough: Schema.optional(Schema.Boolean),
  allowSubjectAltNamesPassthrough: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CertificateIdentityConstraints" }) as any as Schema.Schema<CertificateIdentityConstraints>;

export interface CertificateExtensionConstraints {
  /** Optional. A set of named X.509 extensions. Will be combined with additional_extensions to determine the full set of X.509 extensions. */
  knownExtensions?: Array<"KNOWN_CERTIFICATE_EXTENSION_UNSPECIFIED" | "BASE_KEY_USAGE" | "EXTENDED_KEY_USAGE" | "CA_OPTIONS" | "POLICY_IDS" | "AIA_OCSP_SERVERS" | "NAME_CONSTRAINTS" | (string & {})>;
  /** Optional. A set of ObjectIds identifying custom X.509 extensions. Will be combined with known_extensions to determine the full set of X.509 extensions. */
  additionalExtensions?: Array<ObjectId>;
}

export const CertificateExtensionConstraints: Schema.Schema<CertificateExtensionConstraints> = Schema.suspend(() => Schema.Struct({
  knownExtensions: Schema.optional(Schema.Array(Schema.String)),
  additionalExtensions: Schema.optional(Schema.Array(ObjectId)),
})).annotate({ identifier: "CertificateExtensionConstraints" }) as any as Schema.Schema<CertificateExtensionConstraints>;

export interface IssuancePolicy {
  /** Optional. If any AllowedKeyType is specified, then the certificate request's public key must match one of the key types listed here. Otherwise, any key may be used. */
  allowedKeyTypes?: Array<AllowedKeyType>;
  /** Optional. If set, all certificates issued from this CaPool will be backdated by this duration. The 'not_before_time' will be the issuance time minus this backdate_duration, and the 'not_after_time' will be adjusted to preserve the requested lifetime. The maximum duration that a certificate can be backdated with these options is 48 hours in the past. This option cannot be set if allow_requester_specified_not_before_time is set. */
  backdateDuration?: string;
  /** Optional. The maximum lifetime allowed for issued Certificates. Note that if the issuing CertificateAuthority expires before a Certificate resource's requested maximum_lifetime, the effective lifetime will be explicitly truncated to match it. */
  maximumLifetime?: string;
  /** Optional. If specified, then only methods allowed in the IssuanceModes may be used to issue Certificates. */
  allowedIssuanceModes?: IssuanceModes;
  /** Optional. A set of X.509 values that will be applied to all certificates issued through this CaPool. If a certificate request includes conflicting values for the same properties, they will be overwritten by the values defined here. If a certificate request uses a CertificateTemplate that defines conflicting predefined_values for the same properties, the certificate issuance request will fail. */
  baselineValues?: X509Parameters;
  /** Optional. Describes constraints on identities that may appear in Certificates issued through this CaPool. If this is omitted, then this CaPool will not add restrictions on a certificate's identity. */
  identityConstraints?: CertificateIdentityConstraints;
  /** Optional. Describes the set of X.509 extensions that may appear in a Certificate issued through this CaPool. If a certificate request sets extensions that don't appear in the passthrough_extensions, those extensions will be dropped. If a certificate request uses a CertificateTemplate with predefined_values that don't appear here, the certificate issuance request will fail. If this is omitted, then this CaPool will not add restrictions on a certificate's X.509 extensions. These constraints do not apply to X.509 extensions set in this CaPool's baseline_values. */
  passthroughExtensions?: CertificateExtensionConstraints;
}

export const IssuancePolicy: Schema.Schema<IssuancePolicy> = Schema.suspend(() => Schema.Struct({
  allowedKeyTypes: Schema.optional(Schema.Array(AllowedKeyType)),
  backdateDuration: Schema.optional(Schema.String),
  maximumLifetime: Schema.optional(Schema.String),
  allowedIssuanceModes: Schema.optional(IssuanceModes),
  baselineValues: Schema.optional(X509Parameters),
  identityConstraints: Schema.optional(CertificateIdentityConstraints),
  passthroughExtensions: Schema.optional(CertificateExtensionConstraints),
})).annotate({ identifier: "IssuancePolicy" }) as any as Schema.Schema<IssuancePolicy>;

export interface PublishingOptions {
  /** Optional. When true, publishes each CertificateAuthority's CA certificate and includes its URL in the "Authority Information Access" X.509 extension in all issued Certificates. If this is false, the CA certificate will not be published and the corresponding X.509 extension will not be written in issued certificates. */
  publishCaCert?: boolean;
  /** Optional. When true, publishes each CertificateAuthority's CRL and includes its URL in the "CRL Distribution Points" X.509 extension in all issued Certificates. If this is false, CRLs will not be published and the corresponding X.509 extension will not be written in issued certificates. CRLs will expire 7 days from their creation. However, we will rebuild daily. CRLs are also rebuilt shortly after a certificate is revoked. */
  publishCrl?: boolean;
  /** Optional. Specifies the encoding format of each CertificateAuthority resource's CA certificate and CRLs. If this is omitted, CA certificates and CRLs will be published in PEM. */
  encodingFormat?: "ENCODING_FORMAT_UNSPECIFIED" | "PEM" | "DER" | (string & {});
}

export const PublishingOptions: Schema.Schema<PublishingOptions> = Schema.suspend(() => Schema.Struct({
  publishCaCert: Schema.optional(Schema.Boolean),
  publishCrl: Schema.optional(Schema.Boolean),
  encodingFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "PublishingOptions" }) as any as Schema.Schema<PublishingOptions>;

export interface EncryptionSpec {
  /** The resource name for a Cloud KMS key in the format `projects/* /locations/* /keyRings/* /cryptoKeys/*`. */
  cloudKmsKey?: string;
}

export const EncryptionSpec: Schema.Schema<EncryptionSpec> = Schema.suspend(() => Schema.Struct({
  cloudKmsKey: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionSpec" }) as any as Schema.Schema<EncryptionSpec>;

export interface CaPool {
  /** Identifier. The resource name for this CaPool in the format `projects/* /locations/* /caPools/*`. */
  name?: string;
  /** Required. Immutable. The Tier of this CaPool. */
  tier?: "TIER_UNSPECIFIED" | "ENTERPRISE" | "DEVOPS" | (string & {});
  /** Optional. The IssuancePolicy to control how Certificates will be issued from this CaPool. */
  issuancePolicy?: IssuancePolicy;
  /** Optional. The PublishingOptions to follow when issuing Certificates from any CertificateAuthority in this CaPool. */
  publishingOptions?: PublishingOptions;
  /** Optional. When EncryptionSpec is provided, the Subject, SubjectAltNames, and the PEM-encoded certificate fields will be encrypted at rest. */
  encryptionSpec?: EncryptionSpec;
  /** Optional. Labels with user-defined metadata. */
  labels?: Record<string, string>;
}

export const CaPool: Schema.Schema<CaPool> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tier: Schema.optional(Schema.String),
  issuancePolicy: Schema.optional(IssuancePolicy),
  publishingOptions: Schema.optional(PublishingOptions),
  encryptionSpec: Schema.optional(EncryptionSpec),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "CaPool" }) as any as Schema.Schema<CaPool>;

export interface ListCaPoolsResponse {
  /** The list of CaPools. */
  caPools?: Array<CaPool>;
  /** A token to retrieve next page of results. Pass this value in ListCertificateAuthoritiesRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** A list of locations (e.g. "us-west1") that could not be reached. */
  unreachable?: Array<string>;
}

export const ListCaPoolsResponse: Schema.Schema<ListCaPoolsResponse> = Schema.suspend(() => Schema.Struct({
  caPools: Schema.optional(Schema.Array(CaPool)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCaPoolsResponse" }) as any as Schema.Schema<ListCaPoolsResponse>;

export interface FetchCaCertsRequest {
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const FetchCaCertsRequest: Schema.Schema<FetchCaCertsRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchCaCertsRequest" }) as any as Schema.Schema<FetchCaCertsRequest>;

export interface CertChain {
  /** The certificates that form the CA chain, from leaf to root order. */
  certificates?: Array<string>;
}

export const CertChain: Schema.Schema<CertChain> = Schema.suspend(() => Schema.Struct({
  certificates: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CertChain" }) as any as Schema.Schema<CertChain>;

export interface FetchCaCertsResponse {
  /** The PEM encoded CA certificate chains of all certificate authorities in this CaPool in the ENABLED, DISABLED, or STAGED states. */
  caCerts?: Array<CertChain>;
}

export const FetchCaCertsResponse: Schema.Schema<FetchCaCertsResponse> = Schema.suspend(() => Schema.Struct({
  caCerts: Schema.optional(Schema.Array(CertChain)),
})).annotate({ identifier: "FetchCaCertsResponse" }) as any as Schema.Schema<FetchCaCertsResponse>;

export interface RevokedCertificate {
  /** The resource name for the Certificate in the format `projects/* /locations/* /caPools/* /certificates/*`. */
  certificate?: string;
  /** The serial number of the Certificate. */
  hexSerialNumber?: string;
  /** The reason the Certificate was revoked. */
  revocationReason?: "REVOCATION_REASON_UNSPECIFIED" | "KEY_COMPROMISE" | "CERTIFICATE_AUTHORITY_COMPROMISE" | "AFFILIATION_CHANGED" | "SUPERSEDED" | "CESSATION_OF_OPERATION" | "CERTIFICATE_HOLD" | "PRIVILEGE_WITHDRAWN" | "ATTRIBUTE_AUTHORITY_COMPROMISE" | (string & {});
}

export const RevokedCertificate: Schema.Schema<RevokedCertificate> = Schema.suspend(() => Schema.Struct({
  certificate: Schema.optional(Schema.String),
  hexSerialNumber: Schema.optional(Schema.String),
  revocationReason: Schema.optional(Schema.String),
})).annotate({ identifier: "RevokedCertificate" }) as any as Schema.Schema<RevokedCertificate>;

export interface CertificateRevocationList {
  /** Identifier. The resource name for this CertificateRevocationList in the format `projects/* /locations/* /caPools/*certificateAuthorities/* / certificateRevocationLists/*`. */
  name?: string;
  /** Output only. The CRL sequence number that appears in pem_crl. */
  sequenceNumber?: string;
  /** Output only. The revoked serial numbers that appear in pem_crl. */
  revokedCertificates?: Array<RevokedCertificate>;
  /** Output only. The PEM-encoded X.509 CRL. */
  pemCrl?: string;
  /** Output only. The location where 'pem_crl' can be accessed. */
  accessUrl?: string;
  /** Output only. The State for this CertificateRevocationList. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "SUPERSEDED" | (string & {});
  /** Output only. The time at which this CertificateRevocationList was created. */
  createTime?: string;
  /** Output only. The time at which this CertificateRevocationList was updated. */
  updateTime?: string;
  /** Output only. The revision ID of this CertificateRevocationList. A new revision is committed whenever a new CRL is published. The format is an 8-character hexadecimal string. */
  revisionId?: string;
  /** Optional. Labels with user-defined metadata. */
  labels?: Record<string, string>;
}

export const CertificateRevocationList: Schema.Schema<CertificateRevocationList> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  sequenceNumber: Schema.optional(Schema.String),
  revokedCertificates: Schema.optional(Schema.Array(RevokedCertificate)),
  pemCrl: Schema.optional(Schema.String),
  accessUrl: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "CertificateRevocationList" }) as any as Schema.Schema<CertificateRevocationList>;

export interface ListCertificateRevocationListsResponse {
  /** The list of CertificateRevocationLists. */
  certificateRevocationLists?: Array<CertificateRevocationList>;
  /** A token to retrieve next page of results. Pass this value in ListCertificateRevocationListsRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** A list of locations (e.g. "us-west1") that could not be reached. */
  unreachable?: Array<string>;
}

export const ListCertificateRevocationListsResponse: Schema.Schema<ListCertificateRevocationListsResponse> = Schema.suspend(() => Schema.Struct({
  certificateRevocationLists: Schema.optional(Schema.Array(CertificateRevocationList)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCertificateRevocationListsResponse" }) as any as Schema.Schema<ListCertificateRevocationListsResponse>;

export interface CertificateTemplate {
  /** Identifier. The resource name for this CertificateTemplate in the format `projects/* /locations/* /certificateTemplates/*`. */
  name?: string;
  /** Optional. The maximum lifetime allowed for issued Certificates that use this template. If the issuing CaPool resource's IssuancePolicy specifies a maximum_lifetime the minimum of the two durations will be the maximum lifetime for issued Certificates. Note that if the issuing CertificateAuthority expires before a Certificate's requested maximum_lifetime, the effective lifetime will be explicitly truncated to match it. */
  maximumLifetime?: string;
  /** Optional. A set of X.509 values that will be applied to all issued certificates that use this template. If the certificate request includes conflicting values for the same properties, they will be overwritten by the values defined here. If the issuing CaPool's IssuancePolicy defines conflicting baseline_values for the same properties, the certificate issuance request will fail. */
  predefinedValues?: X509Parameters;
  /** Optional. Describes constraints on identities that may be appear in Certificates issued using this template. If this is omitted, then this template will not add restrictions on a certificate's identity. */
  identityConstraints?: CertificateIdentityConstraints;
  /** Optional. Describes the set of X.509 extensions that may appear in a Certificate issued using this CertificateTemplate. If a certificate request sets extensions that don't appear in the passthrough_extensions, those extensions will be dropped. If the issuing CaPool's IssuancePolicy defines baseline_values that don't appear here, the certificate issuance request will fail. If this is omitted, then this template will not add restrictions on a certificate's X.509 extensions. These constraints do not apply to X.509 extensions set in this CertificateTemplate's predefined_values. */
  passthroughExtensions?: CertificateExtensionConstraints;
  /** Optional. A human-readable description of scenarios this template is intended for. */
  description?: string;
  /** Output only. The time at which this CertificateTemplate was created. */
  createTime?: string;
  /** Output only. The time at which this CertificateTemplate was updated. */
  updateTime?: string;
  /** Optional. Labels with user-defined metadata. */
  labels?: Record<string, string>;
}

export const CertificateTemplate: Schema.Schema<CertificateTemplate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  maximumLifetime: Schema.optional(Schema.String),
  predefinedValues: Schema.optional(X509Parameters),
  identityConstraints: Schema.optional(CertificateIdentityConstraints),
  passthroughExtensions: Schema.optional(CertificateExtensionConstraints),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "CertificateTemplate" }) as any as Schema.Schema<CertificateTemplate>;

export interface ListCertificateTemplatesResponse {
  /** The list of CertificateTemplates. */
  certificateTemplates?: Array<CertificateTemplate>;
  /** A token to retrieve next page of results. Pass this value in ListCertificateTemplatesRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
  /** A list of locations (e.g. "us-west1") that could not be reached. */
  unreachable?: Array<string>;
}

export const ListCertificateTemplatesResponse: Schema.Schema<ListCertificateTemplatesResponse> = Schema.suspend(() => Schema.Struct({
  certificateTemplates: Schema.optional(Schema.Array(CertificateTemplate)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCertificateTemplatesResponse" }) as any as Schema.Schema<ListCertificateTemplatesResponse>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Create a CaPool. */
export interface CreateProjectsLocationsCaPoolsRequest {
  /** Required. The resource name of the location associated with the CaPool, in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}` */
  caPoolId?: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: CaPool;
}

export const CreateProjectsLocationsCaPoolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  caPoolId: Schema.optional(Schema.String).pipe(T.HttpQuery("caPoolId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(CaPool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCaPoolsRequest>;

export type CreateProjectsLocationsCaPoolsResponse = Operation;
export const CreateProjectsLocationsCaPoolsResponse = Operation;

export type CreateProjectsLocationsCaPoolsError = CommonErrors;

export const createProjectsLocationsCaPools: API.OperationMethod<CreateProjectsLocationsCaPoolsRequest, CreateProjectsLocationsCaPoolsResponse, CreateProjectsLocationsCaPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCaPoolsRequest,
  output: CreateProjectsLocationsCaPoolsResponse,
  errors: [],
}));

/** Update a CaPool. */
export interface PatchProjectsLocationsCaPoolsRequest {
  /** Identifier. The resource name for this CaPool in the format `projects/* /locations/* /caPools/*`. */
  name: string;
  /** Required. A list of fields to be updated in this request. */
  updateMask?: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: CaPool;
}

export const PatchProjectsLocationsCaPoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(CaPool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCaPoolsRequest>;

export type PatchProjectsLocationsCaPoolsResponse = Operation;
export const PatchProjectsLocationsCaPoolsResponse = Operation;

export type PatchProjectsLocationsCaPoolsError = CommonErrors;

export const patchProjectsLocationsCaPools: API.OperationMethod<PatchProjectsLocationsCaPoolsRequest, PatchProjectsLocationsCaPoolsResponse, PatchProjectsLocationsCaPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCaPoolsRequest,
  output: PatchProjectsLocationsCaPoolsResponse,
  errors: [],
}));

/** Returns a CaPool. */
export interface GetProjectsLocationsCaPoolsRequest {
  /** Required. The name of the CaPool to get. */
  name: string;
}

export const GetProjectsLocationsCaPoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCaPoolsRequest>;

export type GetProjectsLocationsCaPoolsResponse = CaPool;
export const GetProjectsLocationsCaPoolsResponse = CaPool;

export type GetProjectsLocationsCaPoolsError = CommonErrors;

export const getProjectsLocationsCaPools: API.OperationMethod<GetProjectsLocationsCaPoolsRequest, GetProjectsLocationsCaPoolsResponse, GetProjectsLocationsCaPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCaPoolsRequest,
  output: GetProjectsLocationsCaPoolsResponse,
  errors: [],
}));

/** Lists CaPools. */
export interface ListProjectsLocationsCaPoolsRequest {
  /** Required. The resource name of the location associated with the CaPools, in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Limit on the number of CaPools to include in the response. Further CaPools can subsequently be obtained by including the ListCaPoolsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Pagination token, returned earlier via ListCaPoolsResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Only include resources that match the filter in the response. */
  filter?: string;
  /** Optional. Specify how the results should be sorted. */
  orderBy?: string;
}

export const ListProjectsLocationsCaPoolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCaPoolsRequest>;

export type ListProjectsLocationsCaPoolsResponse = ListCaPoolsResponse;
export const ListProjectsLocationsCaPoolsResponse = ListCaPoolsResponse;

export type ListProjectsLocationsCaPoolsError = CommonErrors;

export const listProjectsLocationsCaPools = API.makePaginated(() => ({
  input: ListProjectsLocationsCaPoolsRequest,
  output: ListProjectsLocationsCaPoolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Delete a CaPool. */
export interface DeleteProjectsLocationsCaPoolsRequest {
  /** Required. The resource name for this CaPool in the format `projects/* /locations/* /caPools/*`. */
  name: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. This field allows this pool to be deleted even if it's being depended on by another resource. However, doing so may result in unintended and unrecoverable effects on any dependent resources since the pool will no longer be able to issue certificates. */
  ignoreDependentResources?: boolean;
}

export const DeleteProjectsLocationsCaPoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  ignoreDependentResources: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreDependentResources")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCaPoolsRequest>;

export type DeleteProjectsLocationsCaPoolsResponse = Operation;
export const DeleteProjectsLocationsCaPoolsResponse = Operation;

export type DeleteProjectsLocationsCaPoolsError = CommonErrors;

export const deleteProjectsLocationsCaPools: API.OperationMethod<DeleteProjectsLocationsCaPoolsRequest, DeleteProjectsLocationsCaPoolsResponse, DeleteProjectsLocationsCaPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCaPoolsRequest,
  output: DeleteProjectsLocationsCaPoolsResponse,
  errors: [],
}));

/** FetchCaCerts returns the current trust anchor for the CaPool. This will include CA certificate chains for all certificate authorities in the ENABLED, DISABLED, or STAGED states. */
export interface FetchCaCertsProjectsLocationsCaPoolsRequest {
  /** Required. The resource name for the CaPool in the format `projects/* /locations/* /caPools/*`. */
  caPool: string;
  /** Request body */
  body?: FetchCaCertsRequest;
}

export const FetchCaCertsProjectsLocationsCaPoolsRequest = Schema.Struct({
  caPool: Schema.String.pipe(T.HttpPath("caPool")),
  body: Schema.optional(FetchCaCertsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}:fetchCaCerts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FetchCaCertsProjectsLocationsCaPoolsRequest>;

export type FetchCaCertsProjectsLocationsCaPoolsResponse = FetchCaCertsResponse;
export const FetchCaCertsProjectsLocationsCaPoolsResponse = FetchCaCertsResponse;

export type FetchCaCertsProjectsLocationsCaPoolsError = CommonErrors;

export const fetchCaCertsProjectsLocationsCaPools: API.OperationMethod<FetchCaCertsProjectsLocationsCaPoolsRequest, FetchCaCertsProjectsLocationsCaPoolsResponse, FetchCaCertsProjectsLocationsCaPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchCaCertsProjectsLocationsCaPoolsRequest,
  output: FetchCaCertsProjectsLocationsCaPoolsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsCaPoolsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsCaPoolsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsCaPoolsRequest>;

export type SetIamPolicyProjectsLocationsCaPoolsResponse = Policy;
export const SetIamPolicyProjectsLocationsCaPoolsResponse = Policy;

export type SetIamPolicyProjectsLocationsCaPoolsError = CommonErrors;

export const setIamPolicyProjectsLocationsCaPools: API.OperationMethod<SetIamPolicyProjectsLocationsCaPoolsRequest, SetIamPolicyProjectsLocationsCaPoolsResponse, SetIamPolicyProjectsLocationsCaPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsCaPoolsRequest,
  output: SetIamPolicyProjectsLocationsCaPoolsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsCaPoolsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsCaPoolsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsCaPoolsRequest>;

export type GetIamPolicyProjectsLocationsCaPoolsResponse = Policy;
export const GetIamPolicyProjectsLocationsCaPoolsResponse = Policy;

export type GetIamPolicyProjectsLocationsCaPoolsError = CommonErrors;

export const getIamPolicyProjectsLocationsCaPools: API.OperationMethod<GetIamPolicyProjectsLocationsCaPoolsRequest, GetIamPolicyProjectsLocationsCaPoolsResponse, GetIamPolicyProjectsLocationsCaPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsCaPoolsRequest,
  output: GetIamPolicyProjectsLocationsCaPoolsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsCaPoolsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsCaPoolsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsCaPoolsRequest>;

export type TestIamPermissionsProjectsLocationsCaPoolsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsCaPoolsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsCaPoolsError = CommonErrors;

export const testIamPermissionsProjectsLocationsCaPools: API.OperationMethod<TestIamPermissionsProjectsLocationsCaPoolsRequest, TestIamPermissionsProjectsLocationsCaPoolsResponse, TestIamPermissionsProjectsLocationsCaPoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsCaPoolsRequest,
  output: TestIamPermissionsProjectsLocationsCaPoolsResponse,
  errors: [],
}));

/** Create a new Certificate in a given Project, Location from a particular CaPool. */
export interface CreateProjectsLocationsCaPoolsCertificatesRequest {
  /** Required. The resource name of the CaPool associated with the Certificate, in the format `projects/* /locations/* /caPools/*`. */
  parent: string;
  /** Optional. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`. This field is required when using a CertificateAuthority in the Enterprise CertificateAuthority.tier, but is optional and its value is ignored otherwise. */
  certificateId?: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If this is true, no Certificate resource will be persisted regardless of the CaPool's tier, and the returned Certificate will not contain the pem_certificate field. */
  validateOnly?: boolean;
  /** Optional. The resource ID of the CertificateAuthority that should issue the certificate. This optional field will ignore the load-balancing scheme of the Pool and directly issue the certificate from the CA with the specified ID, contained in the same CaPool referenced by `parent`. Per-CA quota rules apply. If left empty, a CertificateAuthority will be chosen from the CaPool by the service. For example, to issue a Certificate from a Certificate Authority with resource name "projects/my-project/locations/us-central1/caPools/my-pool/certificateAuthorities/my-ca", you can set the parent to "projects/my-project/locations/us-central1/caPools/my-pool" and the issuing_certificate_authority_id to "my-ca". */
  issuingCertificateAuthorityId?: string;
  /** Request body */
  body?: Certificate;
}

export const CreateProjectsLocationsCaPoolsCertificatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  certificateId: Schema.optional(Schema.String).pipe(T.HttpQuery("certificateId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  issuingCertificateAuthorityId: Schema.optional(Schema.String).pipe(T.HttpQuery("issuingCertificateAuthorityId")),
  body: Schema.optional(Certificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCaPoolsCertificatesRequest>;

export type CreateProjectsLocationsCaPoolsCertificatesResponse = Certificate;
export const CreateProjectsLocationsCaPoolsCertificatesResponse = Certificate;

export type CreateProjectsLocationsCaPoolsCertificatesError = CommonErrors;

export const createProjectsLocationsCaPoolsCertificates: API.OperationMethod<CreateProjectsLocationsCaPoolsCertificatesRequest, CreateProjectsLocationsCaPoolsCertificatesResponse, CreateProjectsLocationsCaPoolsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCaPoolsCertificatesRequest,
  output: CreateProjectsLocationsCaPoolsCertificatesResponse,
  errors: [],
}));

/** Returns a Certificate. */
export interface GetProjectsLocationsCaPoolsCertificatesRequest {
  /** Required. The name of the Certificate to get. */
  name: string;
}

export const GetProjectsLocationsCaPoolsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificates/{certificatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCaPoolsCertificatesRequest>;

export type GetProjectsLocationsCaPoolsCertificatesResponse = Certificate;
export const GetProjectsLocationsCaPoolsCertificatesResponse = Certificate;

export type GetProjectsLocationsCaPoolsCertificatesError = CommonErrors;

export const getProjectsLocationsCaPoolsCertificates: API.OperationMethod<GetProjectsLocationsCaPoolsCertificatesRequest, GetProjectsLocationsCaPoolsCertificatesResponse, GetProjectsLocationsCaPoolsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCaPoolsCertificatesRequest,
  output: GetProjectsLocationsCaPoolsCertificatesResponse,
  errors: [],
}));

/** Lists Certificates. */
export interface ListProjectsLocationsCaPoolsCertificatesRequest {
  /** Required. The resource name of the parent associated with the Certificates, in the format `projects/* /locations/* /caPools/*`. The parent resource name can be in one of two forms: 1. **Specific CA Pool:** To list certificates within a single CA Pool: `projects/* /locations/* /caPools/*` 2. **All CA Pools in a Location:** To list certificates across *all* CA Pools in a given project and location, use the wildcard character (`-`) in place of the CA Pool ID. Example: `projects/* /locations/* /caPools/-` See go/ccfe-nested-collections#aggregate-listing for more details. */
  parent: string;
  /** Optional. Limit on the number of Certificates to include in the response. Further Certificates can subsequently be obtained by including the ListCertificatesResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Pagination token, returned earlier via ListCertificatesResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Only include resources that match the filter in the response. For details on supported filters and syntax, see [Certificates Filtering documentation](https://cloud.google.com/certificate-authority-service/docs/sorting-filtering-certificates#filtering_support). */
  filter?: string;
  /** Optional. Specify how the results should be sorted. For details on supported fields and syntax, see [Certificates Sorting documentation](https://cloud.google.com/certificate-authority-service/docs/sorting-filtering-certificates#sorting_support). */
  orderBy?: string;
}

export const ListProjectsLocationsCaPoolsCertificatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCaPoolsCertificatesRequest>;

export type ListProjectsLocationsCaPoolsCertificatesResponse = ListCertificatesResponse;
export const ListProjectsLocationsCaPoolsCertificatesResponse = ListCertificatesResponse;

export type ListProjectsLocationsCaPoolsCertificatesError = CommonErrors;

export const listProjectsLocationsCaPoolsCertificates = API.makePaginated(() => ({
  input: ListProjectsLocationsCaPoolsCertificatesRequest,
  output: ListProjectsLocationsCaPoolsCertificatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Revoke a Certificate. */
export interface RevokeProjectsLocationsCaPoolsCertificatesRequest {
  /** Required. The resource name for this Certificate in the format `projects/* /locations/* /caPools/* /certificates/*`. */
  name: string;
  /** Request body */
  body?: RevokeCertificateRequest;
}

export const RevokeProjectsLocationsCaPoolsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RevokeCertificateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificates/{certificatesId}:revoke", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevokeProjectsLocationsCaPoolsCertificatesRequest>;

export type RevokeProjectsLocationsCaPoolsCertificatesResponse = Certificate;
export const RevokeProjectsLocationsCaPoolsCertificatesResponse = Certificate;

export type RevokeProjectsLocationsCaPoolsCertificatesError = CommonErrors;

export const revokeProjectsLocationsCaPoolsCertificates: API.OperationMethod<RevokeProjectsLocationsCaPoolsCertificatesRequest, RevokeProjectsLocationsCaPoolsCertificatesResponse, RevokeProjectsLocationsCaPoolsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevokeProjectsLocationsCaPoolsCertificatesRequest,
  output: RevokeProjectsLocationsCaPoolsCertificatesResponse,
  errors: [],
}));

/** Update a Certificate. Currently, the only field you can update is the labels field. */
export interface PatchProjectsLocationsCaPoolsCertificatesRequest {
  /** Identifier. The resource name for this Certificate in the format `projects/* /locations/* /caPools/* /certificates/*`. */
  name: string;
  /** Required. A list of fields to be updated in this request. */
  updateMask?: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Certificate;
}

export const PatchProjectsLocationsCaPoolsCertificatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Certificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificates/{certificatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCaPoolsCertificatesRequest>;

export type PatchProjectsLocationsCaPoolsCertificatesResponse = Certificate;
export const PatchProjectsLocationsCaPoolsCertificatesResponse = Certificate;

export type PatchProjectsLocationsCaPoolsCertificatesError = CommonErrors;

export const patchProjectsLocationsCaPoolsCertificates: API.OperationMethod<PatchProjectsLocationsCaPoolsCertificatesRequest, PatchProjectsLocationsCaPoolsCertificatesResponse, PatchProjectsLocationsCaPoolsCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCaPoolsCertificatesRequest,
  output: PatchProjectsLocationsCaPoolsCertificatesResponse,
  errors: [],
}));

/** Activate a CertificateAuthority that is in state AWAITING_USER_ACTIVATION and is of type SUBORDINATE. After the parent Certificate Authority signs a certificate signing request from FetchCertificateAuthorityCsr, this method can complete the activation process. */
export interface ActivateProjectsLocationsCaPoolsCertificateAuthoritiesRequest {
  /** Required. The resource name for this CertificateAuthority in the format `projects/* /locations/* /caPools/* /certificateAuthorities/*`. */
  name: string;
  /** Request body */
  body?: ActivateCertificateAuthorityRequest;
}

export const ActivateProjectsLocationsCaPoolsCertificateAuthoritiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ActivateCertificateAuthorityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}:activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateProjectsLocationsCaPoolsCertificateAuthoritiesRequest>;

export type ActivateProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;
export const ActivateProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;

export type ActivateProjectsLocationsCaPoolsCertificateAuthoritiesError = CommonErrors;

export const activateProjectsLocationsCaPoolsCertificateAuthorities: API.OperationMethod<ActivateProjectsLocationsCaPoolsCertificateAuthoritiesRequest, ActivateProjectsLocationsCaPoolsCertificateAuthoritiesResponse, ActivateProjectsLocationsCaPoolsCertificateAuthoritiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateProjectsLocationsCaPoolsCertificateAuthoritiesRequest,
  output: ActivateProjectsLocationsCaPoolsCertificateAuthoritiesResponse,
  errors: [],
}));

/** Create a new CertificateAuthority in a given Project and Location. */
export interface CreateProjectsLocationsCaPoolsCertificateAuthoritiesRequest {
  /** Required. The resource name of the CaPool associated with the CertificateAuthorities, in the format `projects/* /locations/* /caPools/*`. */
  parent: string;
  /** Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}` */
  certificateAuthorityId?: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: CertificateAuthority;
}

export const CreateProjectsLocationsCaPoolsCertificateAuthoritiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  certificateAuthorityId: Schema.optional(Schema.String).pipe(T.HttpQuery("certificateAuthorityId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(CertificateAuthority).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCaPoolsCertificateAuthoritiesRequest>;

export type CreateProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;
export const CreateProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;

export type CreateProjectsLocationsCaPoolsCertificateAuthoritiesError = CommonErrors;

export const createProjectsLocationsCaPoolsCertificateAuthorities: API.OperationMethod<CreateProjectsLocationsCaPoolsCertificateAuthoritiesRequest, CreateProjectsLocationsCaPoolsCertificateAuthoritiesResponse, CreateProjectsLocationsCaPoolsCertificateAuthoritiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCaPoolsCertificateAuthoritiesRequest,
  output: CreateProjectsLocationsCaPoolsCertificateAuthoritiesResponse,
  errors: [],
}));

/** Disable a CertificateAuthority. */
export interface DisableProjectsLocationsCaPoolsCertificateAuthoritiesRequest {
  /** Required. The resource name for this CertificateAuthority in the format `projects/* /locations/* /caPools/* /certificateAuthorities/*`. */
  name: string;
  /** Request body */
  body?: DisableCertificateAuthorityRequest;
}

export const DisableProjectsLocationsCaPoolsCertificateAuthoritiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DisableCertificateAuthorityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}:disable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DisableProjectsLocationsCaPoolsCertificateAuthoritiesRequest>;

export type DisableProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;
export const DisableProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;

export type DisableProjectsLocationsCaPoolsCertificateAuthoritiesError = CommonErrors;

export const disableProjectsLocationsCaPoolsCertificateAuthorities: API.OperationMethod<DisableProjectsLocationsCaPoolsCertificateAuthoritiesRequest, DisableProjectsLocationsCaPoolsCertificateAuthoritiesResponse, DisableProjectsLocationsCaPoolsCertificateAuthoritiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DisableProjectsLocationsCaPoolsCertificateAuthoritiesRequest,
  output: DisableProjectsLocationsCaPoolsCertificateAuthoritiesResponse,
  errors: [],
}));

/** Enable a CertificateAuthority. */
export interface EnableProjectsLocationsCaPoolsCertificateAuthoritiesRequest {
  /** Required. The resource name for this CertificateAuthority in the format `projects/* /locations/* /caPools/* /certificateAuthorities/*`. */
  name: string;
  /** Request body */
  body?: EnableCertificateAuthorityRequest;
}

export const EnableProjectsLocationsCaPoolsCertificateAuthoritiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EnableCertificateAuthorityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}:enable", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnableProjectsLocationsCaPoolsCertificateAuthoritiesRequest>;

export type EnableProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;
export const EnableProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;

export type EnableProjectsLocationsCaPoolsCertificateAuthoritiesError = CommonErrors;

export const enableProjectsLocationsCaPoolsCertificateAuthorities: API.OperationMethod<EnableProjectsLocationsCaPoolsCertificateAuthoritiesRequest, EnableProjectsLocationsCaPoolsCertificateAuthoritiesResponse, EnableProjectsLocationsCaPoolsCertificateAuthoritiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnableProjectsLocationsCaPoolsCertificateAuthoritiesRequest,
  output: EnableProjectsLocationsCaPoolsCertificateAuthoritiesResponse,
  errors: [],
}));

/** Fetch a certificate signing request (CSR) from a CertificateAuthority that is in state AWAITING_USER_ACTIVATION and is of type SUBORDINATE. The CSR must then be signed by the desired parent Certificate Authority, which could be another CertificateAuthority resource, or could be an on-prem certificate authority. See also ActivateCertificateAuthority. */
export interface FetchProjectsLocationsCaPoolsCertificateAuthoritiesRequest {
  /** Required. The resource name for this CertificateAuthority in the format `projects/* /locations/* /caPools/* /certificateAuthorities/*`. */
  name: string;
}

export const FetchProjectsLocationsCaPoolsCertificateAuthoritiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}:fetch" }),
  svc,
) as unknown as Schema.Schema<FetchProjectsLocationsCaPoolsCertificateAuthoritiesRequest>;

export type FetchProjectsLocationsCaPoolsCertificateAuthoritiesResponse = FetchCertificateAuthorityCsrResponse;
export const FetchProjectsLocationsCaPoolsCertificateAuthoritiesResponse = FetchCertificateAuthorityCsrResponse;

export type FetchProjectsLocationsCaPoolsCertificateAuthoritiesError = CommonErrors;

export const fetchProjectsLocationsCaPoolsCertificateAuthorities: API.OperationMethod<FetchProjectsLocationsCaPoolsCertificateAuthoritiesRequest, FetchProjectsLocationsCaPoolsCertificateAuthoritiesResponse, FetchProjectsLocationsCaPoolsCertificateAuthoritiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchProjectsLocationsCaPoolsCertificateAuthoritiesRequest,
  output: FetchProjectsLocationsCaPoolsCertificateAuthoritiesResponse,
  errors: [],
}));

/** Returns a CertificateAuthority. */
export interface GetProjectsLocationsCaPoolsCertificateAuthoritiesRequest {
  /** Required. The name of the CertificateAuthority to get. */
  name: string;
}

export const GetProjectsLocationsCaPoolsCertificateAuthoritiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCaPoolsCertificateAuthoritiesRequest>;

export type GetProjectsLocationsCaPoolsCertificateAuthoritiesResponse = CertificateAuthority;
export const GetProjectsLocationsCaPoolsCertificateAuthoritiesResponse = CertificateAuthority;

export type GetProjectsLocationsCaPoolsCertificateAuthoritiesError = CommonErrors;

export const getProjectsLocationsCaPoolsCertificateAuthorities: API.OperationMethod<GetProjectsLocationsCaPoolsCertificateAuthoritiesRequest, GetProjectsLocationsCaPoolsCertificateAuthoritiesResponse, GetProjectsLocationsCaPoolsCertificateAuthoritiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCaPoolsCertificateAuthoritiesRequest,
  output: GetProjectsLocationsCaPoolsCertificateAuthoritiesResponse,
  errors: [],
}));

/** Lists CertificateAuthorities. */
export interface ListProjectsLocationsCaPoolsCertificateAuthoritiesRequest {
  /** Required. The resource name of the CaPool associated with the CertificateAuthorities, in the format `projects/* /locations/* /caPools/*`. */
  parent: string;
  /** Optional. Limit on the number of CertificateAuthorities to include in the response. Further CertificateAuthorities can subsequently be obtained by including the ListCertificateAuthoritiesResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Pagination token, returned earlier via ListCertificateAuthoritiesResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Only include resources that match the filter in the response. */
  filter?: string;
  /** Optional. Specify how the results should be sorted. */
  orderBy?: string;
}

export const ListProjectsLocationsCaPoolsCertificateAuthoritiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCaPoolsCertificateAuthoritiesRequest>;

export type ListProjectsLocationsCaPoolsCertificateAuthoritiesResponse = ListCertificateAuthoritiesResponse;
export const ListProjectsLocationsCaPoolsCertificateAuthoritiesResponse = ListCertificateAuthoritiesResponse;

export type ListProjectsLocationsCaPoolsCertificateAuthoritiesError = CommonErrors;

export const listProjectsLocationsCaPoolsCertificateAuthorities = API.makePaginated(() => ({
  input: ListProjectsLocationsCaPoolsCertificateAuthoritiesRequest,
  output: ListProjectsLocationsCaPoolsCertificateAuthoritiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Undelete a CertificateAuthority that has been deleted. */
export interface UndeleteProjectsLocationsCaPoolsCertificateAuthoritiesRequest {
  /** Required. The resource name for this CertificateAuthority in the format `projects/* /locations/* /caPools/* /certificateAuthorities/*`. */
  name: string;
  /** Request body */
  body?: UndeleteCertificateAuthorityRequest;
}

export const UndeleteProjectsLocationsCaPoolsCertificateAuthoritiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteCertificateAuthorityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsLocationsCaPoolsCertificateAuthoritiesRequest>;

export type UndeleteProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;
export const UndeleteProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;

export type UndeleteProjectsLocationsCaPoolsCertificateAuthoritiesError = CommonErrors;

export const undeleteProjectsLocationsCaPoolsCertificateAuthorities: API.OperationMethod<UndeleteProjectsLocationsCaPoolsCertificateAuthoritiesRequest, UndeleteProjectsLocationsCaPoolsCertificateAuthoritiesResponse, UndeleteProjectsLocationsCaPoolsCertificateAuthoritiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsLocationsCaPoolsCertificateAuthoritiesRequest,
  output: UndeleteProjectsLocationsCaPoolsCertificateAuthoritiesResponse,
  errors: [],
}));

/** Delete a CertificateAuthority. */
export interface DeleteProjectsLocationsCaPoolsCertificateAuthoritiesRequest {
  /** Required. The resource name for this CertificateAuthority in the format `projects/* /locations/* /caPools/* /certificateAuthorities/*`. */
  name: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. This field allows the CA to be deleted even if the CA has active certs. Active certs include both unrevoked and unexpired certs. */
  ignoreActiveCertificates?: boolean;
  /** Optional. If this flag is set, the Certificate Authority will be deleted as soon as possible without a 30-day grace period where undeletion would have been allowed. If you proceed, there will be no way to recover this CA. */
  skipGracePeriod?: boolean;
  /** Optional. This field allows this CA to be deleted even if it's being depended on by another resource. However, doing so may result in unintended and unrecoverable effects on any dependent resources since the CA will no longer be able to issue certificates. */
  ignoreDependentResources?: boolean;
}

export const DeleteProjectsLocationsCaPoolsCertificateAuthoritiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  ignoreActiveCertificates: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreActiveCertificates")),
  skipGracePeriod: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("skipGracePeriod")),
  ignoreDependentResources: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreDependentResources")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCaPoolsCertificateAuthoritiesRequest>;

export type DeleteProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;
export const DeleteProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;

export type DeleteProjectsLocationsCaPoolsCertificateAuthoritiesError = CommonErrors;

export const deleteProjectsLocationsCaPoolsCertificateAuthorities: API.OperationMethod<DeleteProjectsLocationsCaPoolsCertificateAuthoritiesRequest, DeleteProjectsLocationsCaPoolsCertificateAuthoritiesResponse, DeleteProjectsLocationsCaPoolsCertificateAuthoritiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCaPoolsCertificateAuthoritiesRequest,
  output: DeleteProjectsLocationsCaPoolsCertificateAuthoritiesResponse,
  errors: [],
}));

/** Update a CertificateAuthority. */
export interface PatchProjectsLocationsCaPoolsCertificateAuthoritiesRequest {
  /** Identifier. The resource name for this CertificateAuthority in the format `projects/* /locations/* /caPools/* /certificateAuthorities/*`. */
  name: string;
  /** Required. A list of fields to be updated in this request. */
  updateMask?: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: CertificateAuthority;
}

export const PatchProjectsLocationsCaPoolsCertificateAuthoritiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(CertificateAuthority).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCaPoolsCertificateAuthoritiesRequest>;

export type PatchProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;
export const PatchProjectsLocationsCaPoolsCertificateAuthoritiesResponse = Operation;

export type PatchProjectsLocationsCaPoolsCertificateAuthoritiesError = CommonErrors;

export const patchProjectsLocationsCaPoolsCertificateAuthorities: API.OperationMethod<PatchProjectsLocationsCaPoolsCertificateAuthoritiesRequest, PatchProjectsLocationsCaPoolsCertificateAuthoritiesResponse, PatchProjectsLocationsCaPoolsCertificateAuthoritiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCaPoolsCertificateAuthoritiesRequest,
  output: PatchProjectsLocationsCaPoolsCertificateAuthoritiesResponse,
  errors: [],
}));

/** Returns a CertificateRevocationList. */
export interface GetProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest {
  /** Required. The name of the CertificateRevocationList to get. */
  name: string;
}

export const GetProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}/certificateRevocationLists/{certificateRevocationListsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest>;

export type GetProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = CertificateRevocationList;
export const GetProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = CertificateRevocationList;

export type GetProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsError = CommonErrors;

export const getProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationLists: API.OperationMethod<GetProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest, GetProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse, GetProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest,
  output: GetProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse,
  errors: [],
}));

/** Lists CertificateRevocationLists. */
export interface ListProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest {
  /** Required. The resource name of the location associated with the CertificateRevocationLists, in the format `projects/* /locations/* /caPools/* /certificateAuthorities/*`. */
  parent: string;
  /** Optional. Limit on the number of CertificateRevocationLists to include in the response. Further CertificateRevocationLists can subsequently be obtained by including the ListCertificateRevocationListsResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Pagination token, returned earlier via ListCertificateRevocationListsResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Only include resources that match the filter in the response. */
  filter?: string;
  /** Optional. Specify how the results should be sorted. */
  orderBy?: string;
}

export const ListProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}/certificateRevocationLists" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest>;

export type ListProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = ListCertificateRevocationListsResponse;
export const ListProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = ListCertificateRevocationListsResponse;

export type ListProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsError = CommonErrors;

export const listProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationLists = API.makePaginated(() => ({
  input: ListProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest,
  output: ListProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Update a CertificateRevocationList. */
export interface PatchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest {
  /** Identifier. The resource name for this CertificateRevocationList in the format `projects/* /locations/* /caPools/*certificateAuthorities/* / certificateRevocationLists/*`. */
  name: string;
  /** Required. A list of fields to be updated in this request. */
  updateMask?: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: CertificateRevocationList;
}

export const PatchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(CertificateRevocationList).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}/certificateRevocationLists/{certificateRevocationListsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest>;

export type PatchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = Operation;
export const PatchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = Operation;

export type PatchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsError = CommonErrors;

export const patchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationLists: API.OperationMethod<PatchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest, PatchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse, PatchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest,
  output: PatchProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}/certificateRevocationLists/{certificateRevocationListsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest>;

export type SetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = Policy;
export const SetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = Policy;

export type SetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsError = CommonErrors;

export const setIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationLists: API.OperationMethod<SetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest, SetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse, SetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest,
  output: SetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}/certificateRevocationLists/{certificateRevocationListsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest>;

export type GetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = Policy;
export const GetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = Policy;

export type GetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsError = CommonErrors;

export const getIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationLists: API.OperationMethod<GetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest, GetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse, GetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest,
  output: GetIamPolicyProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/caPools/{caPoolsId}/certificateAuthorities/{certificateAuthoritiesId}/certificateRevocationLists/{certificateRevocationListsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest>;

export type TestIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsError = CommonErrors;

export const testIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationLists: API.OperationMethod<TestIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest, TestIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse, TestIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsRequest,
  output: TestIamPermissionsProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsResponse,
  errors: [],
}));

/** Create a new CertificateTemplate in a given Project and Location. */
export interface CreateProjectsLocationsCertificateTemplatesRequest {
  /** Required. The resource name of the location associated with the CertificateTemplate, in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}` */
  certificateTemplateId?: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: CertificateTemplate;
}

export const CreateProjectsLocationsCertificateTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  certificateTemplateId: Schema.optional(Schema.String).pipe(T.HttpQuery("certificateTemplateId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(CertificateTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCertificateTemplatesRequest>;

export type CreateProjectsLocationsCertificateTemplatesResponse = Operation;
export const CreateProjectsLocationsCertificateTemplatesResponse = Operation;

export type CreateProjectsLocationsCertificateTemplatesError = CommonErrors;

export const createProjectsLocationsCertificateTemplates: API.OperationMethod<CreateProjectsLocationsCertificateTemplatesRequest, CreateProjectsLocationsCertificateTemplatesResponse, CreateProjectsLocationsCertificateTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCertificateTemplatesRequest,
  output: CreateProjectsLocationsCertificateTemplatesResponse,
  errors: [],
}));

/** DeleteCertificateTemplate deletes a CertificateTemplate. */
export interface DeleteProjectsLocationsCertificateTemplatesRequest {
  /** Required. The resource name for this CertificateTemplate in the format `projects/* /locations/* /certificateTemplates/*`. */
  name: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsCertificateTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateTemplates/{certificateTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCertificateTemplatesRequest>;

export type DeleteProjectsLocationsCertificateTemplatesResponse = Operation;
export const DeleteProjectsLocationsCertificateTemplatesResponse = Operation;

export type DeleteProjectsLocationsCertificateTemplatesError = CommonErrors;

export const deleteProjectsLocationsCertificateTemplates: API.OperationMethod<DeleteProjectsLocationsCertificateTemplatesRequest, DeleteProjectsLocationsCertificateTemplatesResponse, DeleteProjectsLocationsCertificateTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCertificateTemplatesRequest,
  output: DeleteProjectsLocationsCertificateTemplatesResponse,
  errors: [],
}));

/** Returns a CertificateTemplate. */
export interface GetProjectsLocationsCertificateTemplatesRequest {
  /** Required. The name of the CertificateTemplate to get. */
  name: string;
}

export const GetProjectsLocationsCertificateTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateTemplates/{certificateTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCertificateTemplatesRequest>;

export type GetProjectsLocationsCertificateTemplatesResponse = CertificateTemplate;
export const GetProjectsLocationsCertificateTemplatesResponse = CertificateTemplate;

export type GetProjectsLocationsCertificateTemplatesError = CommonErrors;

export const getProjectsLocationsCertificateTemplates: API.OperationMethod<GetProjectsLocationsCertificateTemplatesRequest, GetProjectsLocationsCertificateTemplatesResponse, GetProjectsLocationsCertificateTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCertificateTemplatesRequest,
  output: GetProjectsLocationsCertificateTemplatesResponse,
  errors: [],
}));

/** Lists CertificateTemplates. */
export interface ListProjectsLocationsCertificateTemplatesRequest {
  /** Required. The resource name of the location associated with the CertificateTemplates, in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Limit on the number of CertificateTemplates to include in the response. Further CertificateTemplates can subsequently be obtained by including the ListCertificateTemplatesResponse.next_page_token in a subsequent request. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Pagination token, returned earlier via ListCertificateTemplatesResponse.next_page_token. */
  pageToken?: string;
  /** Optional. Only include resources that match the filter in the response. */
  filter?: string;
  /** Optional. Specify how the results should be sorted. */
  orderBy?: string;
}

export const ListProjectsLocationsCertificateTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateTemplates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCertificateTemplatesRequest>;

export type ListProjectsLocationsCertificateTemplatesResponse = ListCertificateTemplatesResponse;
export const ListProjectsLocationsCertificateTemplatesResponse = ListCertificateTemplatesResponse;

export type ListProjectsLocationsCertificateTemplatesError = CommonErrors;

export const listProjectsLocationsCertificateTemplates = API.makePaginated(() => ({
  input: ListProjectsLocationsCertificateTemplatesRequest,
  output: ListProjectsLocationsCertificateTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Update a CertificateTemplate. */
export interface PatchProjectsLocationsCertificateTemplatesRequest {
  /** Identifier. The resource name for this CertificateTemplate in the format `projects/* /locations/* /certificateTemplates/*`. */
  name: string;
  /** Required. A list of fields to be updated in this request. */
  updateMask?: string;
  /** Optional. An ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: CertificateTemplate;
}

export const PatchProjectsLocationsCertificateTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(CertificateTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateTemplates/{certificateTemplatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCertificateTemplatesRequest>;

export type PatchProjectsLocationsCertificateTemplatesResponse = Operation;
export const PatchProjectsLocationsCertificateTemplatesResponse = Operation;

export type PatchProjectsLocationsCertificateTemplatesError = CommonErrors;

export const patchProjectsLocationsCertificateTemplates: API.OperationMethod<PatchProjectsLocationsCertificateTemplatesRequest, PatchProjectsLocationsCertificateTemplatesResponse, PatchProjectsLocationsCertificateTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCertificateTemplatesRequest,
  output: PatchProjectsLocationsCertificateTemplatesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsCertificateTemplatesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsCertificateTemplatesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateTemplates/{certificateTemplatesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsCertificateTemplatesRequest>;

export type SetIamPolicyProjectsLocationsCertificateTemplatesResponse = Policy;
export const SetIamPolicyProjectsLocationsCertificateTemplatesResponse = Policy;

export type SetIamPolicyProjectsLocationsCertificateTemplatesError = CommonErrors;

export const setIamPolicyProjectsLocationsCertificateTemplates: API.OperationMethod<SetIamPolicyProjectsLocationsCertificateTemplatesRequest, SetIamPolicyProjectsLocationsCertificateTemplatesResponse, SetIamPolicyProjectsLocationsCertificateTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsCertificateTemplatesRequest,
  output: SetIamPolicyProjectsLocationsCertificateTemplatesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsCertificateTemplatesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsCertificateTemplatesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateTemplates/{certificateTemplatesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsCertificateTemplatesRequest>;

export type GetIamPolicyProjectsLocationsCertificateTemplatesResponse = Policy;
export const GetIamPolicyProjectsLocationsCertificateTemplatesResponse = Policy;

export type GetIamPolicyProjectsLocationsCertificateTemplatesError = CommonErrors;

export const getIamPolicyProjectsLocationsCertificateTemplates: API.OperationMethod<GetIamPolicyProjectsLocationsCertificateTemplatesRequest, GetIamPolicyProjectsLocationsCertificateTemplatesResponse, GetIamPolicyProjectsLocationsCertificateTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsCertificateTemplatesRequest,
  output: GetIamPolicyProjectsLocationsCertificateTemplatesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsCertificateTemplatesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsCertificateTemplatesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/certificateTemplates/{certificateTemplatesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsCertificateTemplatesRequest>;

export type TestIamPermissionsProjectsLocationsCertificateTemplatesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsCertificateTemplatesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsCertificateTemplatesError = CommonErrors;

export const testIamPermissionsProjectsLocationsCertificateTemplates: API.OperationMethod<TestIamPermissionsProjectsLocationsCertificateTemplatesRequest, TestIamPermissionsProjectsLocationsCertificateTemplatesResponse, TestIamPermissionsProjectsLocationsCertificateTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsCertificateTemplatesRequest,
  output: TestIamPermissionsProjectsLocationsCertificateTemplatesResponse,
  errors: [],
}));

