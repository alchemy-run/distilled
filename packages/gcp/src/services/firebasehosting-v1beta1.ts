// ==========================================================================
// Firebase Hosting API (firebasehosting v1beta1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "firebasehosting",
  version: "v1beta1",
  rootUrl: "https://firebasehosting.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ActingUser {
  /** The email address of the user when the user performed the action. */
  email?: string;
  /** A profile image URL for the user. May not be present if the user has changed their email address or deleted their account. */
  imageUrl?: string;
}

export const ActingUser: Schema.Schema<ActingUser> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      email: Schema.optional(Schema.String),
      imageUrl: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ActingUser" }) as any as Schema.Schema<ActingUser>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      code: Schema.optional(Schema.Number),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface HttpUpdate {
  /** Output only. The last time Hosting systems checked for the file contents. */
  lastCheckTime?: string;
  /** Output only. An error encountered during the last contents check. If null, the check completed successfully. */
  checkError?: Status;
  /** Output only. The path to the file. */
  path?: string;
  /** Output only. Whether Hosting was able to find the required file contents on the specified path during its last check. */
  discovered?: string;
  /** Output only. A text string to serve at the path. */
  desired?: string;
}

export const HttpUpdate: Schema.Schema<HttpUpdate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lastCheckTime: Schema.optional(Schema.String),
      checkError: Schema.optional(Status),
      path: Schema.optional(Schema.String),
      discovered: Schema.optional(Schema.String),
      desired: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "HttpUpdate" }) as any as Schema.Schema<HttpUpdate>;

export interface CloudRunRewrite {
  /** Optional. User-provided region where the Cloud Run service is hosted. Defaults to `us-central1` if not supplied. */
  region?: string;
  /** Optional. User-provided TrafficConfig tag to send traffic to. When omitted, traffic is sent to the service-wide URI */
  tag?: string;
  /** Required. User-defined ID of the Cloud Run service. */
  serviceId?: string;
}

export const CloudRunRewrite: Schema.Schema<CloudRunRewrite> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      region: Schema.optional(Schema.String),
      tag: Schema.optional(Schema.String),
      serviceId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CloudRunRewrite",
  }) as any as Schema.Schema<CloudRunRewrite>;

export interface Rewrite {
  /** The user-supplied RE2 regular expression to match against the request URL path. */
  regex?: string;
  /** The URL path to rewrite the request to. */
  path?: string;
  /** The function to proxy requests to. Must match the exported function name exactly. */
  function?: string;
  /** The user-supplied [glob](https://firebase.google.com/docs/hosting/full-config#glob_pattern_matching) to match against the request URL path. */
  glob?: string;
  /** The request will be forwarded to Firebase Dynamic Links. */
  dynamicLinks?: boolean;
  /** The request will be forwarded to Cloud Run. */
  run?: CloudRunRewrite;
  /** Optional. Specify a Cloud region for rewritten Functions invocations. If not provided, defaults to us-central1. */
  functionRegion?: string;
}

export const Rewrite: Schema.Schema<Rewrite> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regex: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      function: Schema.optional(Schema.String),
      glob: Schema.optional(Schema.String),
      dynamicLinks: Schema.optional(Schema.Boolean),
      run: Schema.optional(CloudRunRewrite),
      functionRegion: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Rewrite" }) as any as Schema.Schema<Rewrite>;

export interface Header {
  /** The user-supplied [glob](https://firebase.google.com/docs/hosting/full-config#glob_pattern_matching) to match against the request URL path. */
  glob?: string;
  /** The user-supplied RE2 regular expression to match against the request URL path. */
  regex?: string;
  /** Required. The additional headers to add to the response. */
  headers?: Record<string, string>;
}

export const Header: Schema.Schema<Header> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      glob: Schema.optional(Schema.String),
      regex: Schema.optional(Schema.String),
      headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "Header" }) as any as Schema.Schema<Header>;

export interface Redirect {
  /** The user-supplied [glob](https://firebase.google.com/docs/hosting/full-config#glob_pattern_matching) to match against the request URL path. */
  glob?: string;
  /** The user-supplied RE2 regular expression to match against the request URL path. */
  regex?: string;
  /** Required. The value to put in the HTTP location header of the response. The location can contain capture group values from the pattern using a `:` prefix to identify the segment and an optional `*` to capture the rest of the URL. For example: "glob": "/:capture*", "statusCode": 301, "location": "https://example.com/foo/:capture" */
  location?: string;
  /** Required. The status HTTP code to return in the response. It must be a valid 3xx status code. */
  statusCode?: number;
}

export const Redirect: Schema.Schema<Redirect> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      glob: Schema.optional(Schema.String),
      regex: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
      statusCode: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Redirect" }) as any as Schema.Schema<Redirect>;

export interface I18nConfig {
  /** Required. The user-supplied path where country and language specific content will be looked for within the public directory. */
  root?: string;
}

export const I18nConfig: Schema.Schema<I18nConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      root: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "I18nConfig" }) as any as Schema.Schema<I18nConfig>;

export interface ServingConfig {
  /** An array of objects (called rewrite rules), where each rule specifies a URL pattern that, if matched to the request URL path, triggers Hosting to respond as if the service were given the specified destination URL. */
  rewrites?: Array<Rewrite>;
  /** Defines whether to drop the file extension from uploaded files. */
  cleanUrls?: boolean;
  /** An array of objects, where each object specifies a URL pattern that, if matched to the request URL path, triggers Hosting to apply the specified custom response headers. */
  headers?: Array<Header>;
  /** An array of objects (called redirect rules), where each rule specifies a URL pattern that, if matched to the request URL path, triggers Hosting to respond with a redirect to the specified destination path. */
  redirects?: Array<Redirect>;
  /** Defines how to handle a trailing slash in the URL path. */
  trailingSlashBehavior?:
    | "TRAILING_SLASH_BEHAVIOR_UNSPECIFIED"
    | "ADD"
    | "REMOVE"
    | (string & {});
  /** Optional. Defines i18n rewrite behavior. */
  i18n?: I18nConfig;
  /** How to handle well known App Association files. */
  appAssociation?: "AUTO" | "NONE" | (string & {});
}

export const ServingConfig: Schema.Schema<ServingConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rewrites: Schema.optional(Schema.Array(Rewrite)),
      cleanUrls: Schema.optional(Schema.Boolean),
      headers: Schema.optional(Schema.Array(Header)),
      redirects: Schema.optional(Schema.Array(Redirect)),
      trailingSlashBehavior: Schema.optional(Schema.String),
      i18n: Schema.optional(I18nConfig),
      appAssociation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServingConfig",
  }) as any as Schema.Schema<ServingConfig>;

export interface Version {
  /** Output only. The time at which the version was created. */
  createTime?: string;
  /** The configuration for the behavior of the site. This configuration exists in the [`firebase.json`](https://firebase.google.com/docs/cli/#the_firebasejson_file) file. */
  config?: ServingConfig;
  /** Output only. Identifies the user who created the version. */
  createUser?: ActingUser;
  /** Output only. The time at which the version was `FINALIZED`. */
  finalizeTime?: string;
  /** The deploy status of the version. For a successful deploy, call [`CreateVersion`](sites.versions/create) to make a new version (`CREATED` status), [upload all desired files](sites.versions/populateFiles) to the version, then [update](sites.versions/patch) the version to the `FINALIZED` status. Note that if you leave the version in the `CREATED` state for more than 12 hours, the system will automatically mark the version as `ABANDONED`. You can also change the status of a version to `DELETED` by calling [`DeleteVersion`](sites.versions/delete). */
  status?:
    | "VERSION_STATUS_UNSPECIFIED"
    | "CREATED"
    | "FINALIZED"
    | "DELETED"
    | "ABANDONED"
    | "EXPIRED"
    | "CLONING"
    | (string & {});
  /** Output only. Identifies the user who `DELETED` the version. */
  deleteUser?: ActingUser;
  /** Output only. The total number of files associated with the version. This value is calculated after a version is `FINALIZED`. */
  fileCount?: string;
  /** The fully-qualified resource name for the version, in the format: sites/ SITE_ID/versions/VERSION_ID This name is provided in the response body when you call [`CreateVersion`](sites.versions/create). */
  name?: string;
  /** Output only. Identifies the user who `FINALIZED` the version. */
  finalizeUser?: ActingUser;
  /** The labels used for extra metadata and/or filtering. */
  labels?: Record<string, string>;
  /** Output only. The total stored bytesize of the version. This value is calculated after a version is `FINALIZED`. */
  versionBytes?: string;
  /** Output only. The time at which the version was `DELETED`. */
  deleteTime?: string;
}

export const Version: Schema.Schema<Version> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      config: Schema.optional(ServingConfig),
      createUser: Schema.optional(ActingUser),
      finalizeTime: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      deleteUser: Schema.optional(ActingUser),
      fileCount: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      finalizeUser: Schema.optional(ActingUser),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      versionBytes: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface Release {
  /** Explains the reason for the release. Specify a value for this field only when creating a `SITE_DISABLE` type release. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "DEPLOY"
    | "ROLLBACK"
    | "SITE_DISABLE"
    | (string & {});
  /** Output only. The unique identifier for the release, in either of the following formats: - sites/SITE_ID/releases/RELEASE_ID - sites/SITE_ID/channels/CHANNEL_ID/releases/RELEASE_ID This name is provided in the response body when you call [`releases.create`](sites.releases/create) or [`channels.releases.create`](sites.channels.releases/create). */
  name?: string;
  /** Output only. The configuration and content that was released. */
  version?: Version;
  /** The deploy description when the release was created. The value can be up to 512 characters. */
  message?: string;
  /** Output only. The time at which the version is set to be public. */
  releaseTime?: string;
  /** Output only. Identifies the user who created the release. */
  releaseUser?: ActingUser;
}

export const Release: Schema.Schema<Release> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      version: Schema.optional(Version),
      message: Schema.optional(Schema.String),
      releaseTime: Schema.optional(Schema.String),
      releaseUser: Schema.optional(ActingUser),
    }),
  ).annotate({ identifier: "Release" }) as any as Schema.Schema<Release>;

export interface Channel {
  /** Text labels used for extra metadata and/or filtering. */
  labels?: Record<string, string>;
  /** The time at which the channel will be automatically deleted. If null, the channel will not be automatically deleted. This field is present in the output whether it's set directly or via the `ttl` field. */
  expireTime?: string;
  /** The fully-qualified resource name for the channel, in the format: sites/ SITE_ID/channels/CHANNEL_ID */
  name?: string;
  /** Output only. The time at which the channel was last updated. */
  updateTime?: string;
  /** Output only. The URL at which the content of this channel's current release can be viewed. This URL is a Firebase-provided subdomain of `web.app`. The content of this channel's current release can also be viewed at the Firebase-provided subdomain of `firebaseapp.com`. If this channel is the `live` channel for the Hosting site, then the content of this channel's current release can also be viewed at any connected custom domains. */
  url?: string;
  /** Input only. A time-to-live for this channel. Sets `expire_time` to the provided duration past the time of the request. */
  ttl?: string;
  /** Output only. The time at which the channel was created. */
  createTime?: string;
  /** Output only. The current release for the channel, if any. */
  release?: Release;
  /** The number of previous releases to retain on the channel for rollback or other purposes. Must be a number between 1-100. Defaults to 10 for new channels. */
  retainedReleaseCount?: number;
}

export const Channel: Schema.Schema<Channel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      expireTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      ttl: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      release: Schema.optional(Release),
      retainedReleaseCount: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Channel" }) as any as Schema.Schema<Channel>;

export interface ListChannelsResponse {
  /** The list of channels. */
  channels?: Array<Channel>;
  /** The pagination token, if more results exist beyond the ones in this response. Include this token in your next call to `ListChannels`. Page tokens are short-lived and should not be stored. */
  nextPageToken?: string;
}

export const ListChannelsResponse: Schema.Schema<ListChannelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      channels: Schema.optional(Schema.Array(Channel)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListChannelsResponse",
  }) as any as Schema.Schema<ListChannelsResponse>;

export interface Site {
  /** Optional. The [ID of a Web App](https://firebase.google.com/docs/reference/firebase-management/rest/v1beta1/projects.webApps#WebApp.FIELDS.app_id) associated with the Hosting site. */
  appId?: string;
  /** Optional. User-specified labels for the Hosting site. */
  labels?: Record<string, string>;
  /** Output only. The fully-qualified resource name of the Hosting site, in the format: projects/PROJECT_IDENTIFIER/sites/SITE_ID PROJECT_IDENTIFIER: the Firebase project's [`ProjectNumber`](https://firebase.google.com/docs/reference/firebase-management/rest/v1beta1/projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](https://firebase.google.com/docs/reference/firebase-management/rest/v1beta1/projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). */
  name?: string;
  /** Output only. The default URL for the Hosting site. */
  defaultUrl?: string;
  /** Output only. The type of Hosting site. Every Firebase project has a `DEFAULT_SITE`, which is created when Hosting is provisioned for the project. All additional sites are `USER_SITE`. */
  type?: "TYPE_UNSPECIFIED" | "DEFAULT_SITE" | "USER_SITE" | (string & {});
}

export const Site: Schema.Schema<Site> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      appId: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.optional(Schema.String),
      defaultUrl: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Site" }) as any as Schema.Schema<Site>;

export interface ListSitesResponse {
  /** A list of Site objects associated with the specified Firebase project. */
  sites?: Array<Site>;
  /** The pagination token, if more results exist beyond the ones in this response. Include this token in your next call to `ListSites`. Page tokens are short-lived and should not be stored. */
  nextPageToken?: string;
}

export const ListSitesResponse: Schema.Schema<ListSitesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sites: Schema.optional(Schema.Array(Site)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSitesResponse",
  }) as any as Schema.Schema<ListSitesResponse>;

export interface DnsRecord {
  /** Output only. The data of the record. The meaning of the value depends on record type: - A and AAAA: IP addresses for the domain name. - CNAME: Another domain to check for records. - TXT: Arbitrary text strings associated with the domain name. Hosting uses TXT records to determine which Firebase projects have permission to act on the domain name's behalf. - CAA: The record's flags, tag, and value, e.g. `0 issue "pki.goog"`. */
  rdata?: string;
  /** Output only. An enum that indicates the a required action for this record. */
  requiredAction?: "NONE" | "ADD" | "REMOVE" | (string & {});
  /** Output only. The domain name the record pertains to, e.g. `foo.bar.com.`. */
  domainName?: string;
  /** Output only. The record's type, which determines what data the record contains. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "A"
    | "CNAME"
    | "TXT"
    | "AAAA"
    | "CAA"
    | (string & {});
}

export const DnsRecord: Schema.Schema<DnsRecord> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rdata: Schema.optional(Schema.String),
      requiredAction: Schema.optional(Schema.String),
      domainName: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "DnsRecord" }) as any as Schema.Schema<DnsRecord>;

export interface VersionFile {
  /** The URI at which the file's content should display. */
  path?: string;
  /** Output only. The current status of a particular file in the specified version. The value will be either `pending upload` or `uploaded`. */
  status?: "STATUS_UNSPECIFIED" | "EXPECTED" | "ACTIVE" | (string & {});
  /** The SHA256 content hash of the file. */
  hash?: string;
}

export const VersionFile: Schema.Schema<VersionFile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      path: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      hash: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VersionFile",
  }) as any as Schema.Schema<VersionFile>;

export interface UndeleteCustomDomainRequest {
  /** If true, Hosting validates that it's possible to complete your request but doesn't actually delete the `CustomDomain`. */
  validateOnly?: boolean;
  /** A tag that represents the state of the `CustomDomain` as you know it. If present, the supplied tag must match the current value on your `CustomDomain`, or the request fails. */
  etag?: string;
}

export const UndeleteCustomDomainRequest: Schema.Schema<UndeleteCustomDomainRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      validateOnly: Schema.optional(Schema.Boolean),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UndeleteCustomDomainRequest",
  }) as any as Schema.Schema<UndeleteCustomDomainRequest>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface SiteConfig {
  /** The number of FINALIZED versions that will be held for a site before automatic deletion. When a new version is deployed, content for versions in storage in excess of this number will be deleted, and will no longer be billed for storage usage. Oldest versions will be deleted first; sites are created with an unlimited number of max_versions by default. */
  maxVersions?: string;
  /** Whether or not web requests made by site visitors are logged via Cloud Logging. */
  cloudLoggingEnabled?: boolean;
}

export const SiteConfig: Schema.Schema<SiteConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxVersions: Schema.optional(Schema.String),
      cloudLoggingEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "SiteConfig" }) as any as Schema.Schema<SiteConfig>;

export interface CertDnsChallenge {
  /** The domain name upon which the DNS challenge must be satisfied. */
  domainName?: string;
  /** The value that must be present as a TXT record on the domain name to satisfy the challenge. */
  token?: string;
}

export const CertDnsChallenge: Schema.Schema<CertDnsChallenge> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      domainName: Schema.optional(Schema.String),
      token: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CertDnsChallenge",
  }) as any as Schema.Schema<CertDnsChallenge>;

export interface DnsRecordSet {
  /** Output only. The domain name the record set pertains to. */
  domainName?: string;
  /** Output only. Records on the domain. */
  records?: Array<DnsRecord>;
  /** Output only. An error Hosting services encountered when querying your domain name's DNS records. Note: Hosting ignores `NXDOMAIN` errors, as those generally just mean that a domain name hasn't been set up yet. */
  checkError?: Status;
}

export const DnsRecordSet: Schema.Schema<DnsRecordSet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      domainName: Schema.optional(Schema.String),
      records: Schema.optional(Schema.Array(DnsRecord)),
      checkError: Schema.optional(Status),
    }),
  ).annotate({
    identifier: "DnsRecordSet",
  }) as any as Schema.Schema<DnsRecordSet>;

export interface DnsUpdates {
  /** The set of DNS records Hosting discovered when inspecting a domain. */
  discovered?: Array<DnsRecordSet>;
  /** The last time Hosting checked your custom domain's DNS records. */
  checkTime?: string;
  /** The set of DNS records Hosting needs to serve secure content on the domain. */
  desired?: Array<DnsRecordSet>;
}

export const DnsUpdates: Schema.Schema<DnsUpdates> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      discovered: Schema.optional(Schema.Array(DnsRecordSet)),
      checkTime: Schema.optional(Schema.String),
      desired: Schema.optional(Schema.Array(DnsRecordSet)),
    }),
  ).annotate({ identifier: "DnsUpdates" }) as any as Schema.Schema<DnsUpdates>;

export interface CertVerification {
  /** Output only. A `TXT` record to add to your DNS records that confirms your intent to let Hosting create an SSL cert for your domain name. */
  dns?: DnsUpdates;
  /** Output only. A file to add to your existing, non-Hosting hosting service that confirms your intent to let Hosting create an SSL cert for your domain name. */
  http?: HttpUpdate;
}

export const CertVerification: Schema.Schema<CertVerification> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dns: Schema.optional(DnsUpdates),
      http: Schema.optional(HttpUpdate),
    }),
  ).annotate({
    identifier: "CertVerification",
  }) as any as Schema.Schema<CertVerification>;

export interface Certificate {
  /** Output only. The certificate's type. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "TEMPORARY"
    | "GROUPED"
    | "PROJECT_GROUPED"
    | "DEDICATED"
    | (string & {});
  /** Output only. The certificate's expiration time. After this time, the cert can no longer be used to provide secure communication between Hosting and your site's visitors. */
  expireTime?: string;
  /** Output only. A set of errors Hosting encountered when attempting to create a cert for your domain name. Resolve these issues to ensure Hosting is able to provide secure communication with your site's visitors. */
  issues?: Array<Status>;
  /** Output only. The certificate's creation time. For `TEMPORARY` certs this is the time Hosting first generated challenges for your domain name. For all other cert types, it's the time the actual cert was created. */
  createTime?: string;
  /** Output only. The state of the certificate. Only the `CERT_ACTIVE` and `CERT_EXPIRING_SOON` states provide SSL coverage for a domain name. If the state is `PROPAGATING` and Hosting had an active cert for the domain name before, that formerly-active cert provides SSL coverage for the domain name until the current cert propagates. */
  state?:
    | "CERT_STATE_UNSPECIFIED"
    | "CERT_PREPARING"
    | "CERT_VALIDATING"
    | "CERT_PROPAGATING"
    | "CERT_ACTIVE"
    | "CERT_EXPIRING_SOON"
    | "CERT_EXPIRED"
    | (string & {});
  /** Output only. A set of ACME challenges you can add to your DNS records or existing, non-Hosting hosting provider to allow Hosting to create an SSL certificate for your domain name before you point traffic toward hosting. You can use thse challenges as part of a zero downtime transition from your old provider to Hosting. */
  verification?: CertVerification;
}

export const Certificate: Schema.Schema<Certificate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
      issues: Schema.optional(Schema.Array(Status)),
      createTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      verification: Schema.optional(CertVerification),
    }),
  ).annotate({
    identifier: "Certificate",
  }) as any as Schema.Schema<Certificate>;

export interface CustomDomain {
  /** Output only. A set of updates you should make to the domain name's DNS records to let Hosting serve secure content on its behalf. */
  requiredDnsUpdates?: DnsUpdates;
  /** Output only. The custom domain's create time. */
  createTime?: string;
  /** Output only. A string that represents the current state of the `CustomDomain` and allows you to confirm its initial state in requests that would modify it. Use the tag to ensure consistency when making `UpdateCustomDomain`, `DeleteCustomDomain`, and `UndeleteCustomDomain` requests. */
  etag?: string;
  /** Output only. The `OwnershipState` of the domain name this `CustomDomain` refers to. */
  ownershipState?:
    | "OWNERSHIP_STATE_UNSPECIFIED"
    | "OWNERSHIP_MISSING"
    | "OWNERSHIP_UNREACHABLE"
    | "OWNERSHIP_MISMATCH"
    | "OWNERSHIP_CONFLICT"
    | "OWNERSHIP_PENDING"
    | "OWNERSHIP_ACTIVE"
    | (string & {});
  /** Output only. The fully-qualified name of the `CustomDomain`. */
  name?: string;
  /** Output only. The last time the `CustomDomain` was updated. */
  updateTime?: string;
  /** Output only. A set of errors Hosting systems encountered when trying to establish Hosting's ability to serve secure content for your domain name. Resolve these issues to ensure your `CustomDomain` behaves properly. */
  issues?: Array<Status>;
  /** Output only. The SSL certificate Hosting has for this custom domain's domain name. For new custom domains, this often represents Hosting's intent to create a certificate, rather than an actual cert. Check the `state` field for more. */
  cert?: Certificate;
  /** A domain name that this `CustomDomain` should direct traffic towards. If specified, Hosting will respond to requests against this custom domain with an HTTP 301 code, and route traffic to the specified `redirect_target` instead. */
  redirectTarget?: string;
  /** Output only. A field that, if true, indicates that Hosting's systems are attmepting to make the custom domain's state match your preferred state. This is most frequently `true` when initially provisioning a `CustomDomain` after a `CreateCustomDomain` request or when creating a new SSL certificate to match an updated `cert_preference` after an `UpdateCustomDomain` request. */
  reconciling?: boolean;
  /** Output only. The time the `CustomDomain` was deleted; null for custom domains that haven't been deleted. Deleted custom domains persist for approximately 30 days, after which time Hosting removes them completely. To restore a deleted custom domain, make an `UndeleteCustomDomain` request. */
  deleteTime?: string;
  /** Annotations you can add to leave both human- and machine-readable metadata about your `CustomDomain`. */
  annotations?: Record<string, string>;
  /** Output only. The `HostState` of the domain name this `CustomDomain` refers to. */
  hostState?:
    | "HOST_STATE_UNSPECIFIED"
    | "HOST_UNHOSTED"
    | "HOST_UNREACHABLE"
    | "HOST_MISMATCH"
    | "HOST_CONFLICT"
    | "HOST_ACTIVE"
    | (string & {});
  /** A field that lets you specify which SSL certificate type Hosting creates for your domain name. Spark plan custom domains only have access to the `GROUPED` cert type, while Blaze plan domains can select any option. */
  certPreference?:
    | "TYPE_UNSPECIFIED"
    | "TEMPORARY"
    | "GROUPED"
    | "PROJECT_GROUPED"
    | "DEDICATED"
    | (string & {});
  /** Output only. The minimum time before a soft-deleted `CustomDomain` is completely removed from Hosting; null for custom domains that haven't been deleted. */
  expireTime?: string;
  /** Labels used for extra metadata and/or filtering. */
  labels?: Record<string, string>;
}

export const CustomDomain: Schema.Schema<CustomDomain> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requiredDnsUpdates: Schema.optional(DnsUpdates),
      createTime: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      ownershipState: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      issues: Schema.optional(Schema.Array(Status)),
      cert: Schema.optional(Certificate),
      redirectTarget: Schema.optional(Schema.String),
      reconciling: Schema.optional(Schema.Boolean),
      deleteTime: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      hostState: Schema.optional(Schema.String),
      certPreference: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "CustomDomain",
  }) as any as Schema.Schema<CustomDomain>;

export interface ListCustomDomainsResponse {
  /** A list of `CustomDomain` entities associated with the specified Firebase `Site`. */
  customDomains?: Array<CustomDomain>;
  /** The pagination token, if more results exist beyond the ones in this response. Include this token in your next call to `ListCustomDomains`. Page tokens are short-lived and should not be stored. */
  nextPageToken?: string;
}

export const ListCustomDomainsResponse: Schema.Schema<ListCustomDomainsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customDomains: Schema.optional(Schema.Array(CustomDomain)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCustomDomainsResponse",
  }) as any as Schema.Schema<ListCustomDomainsResponse>;

export interface PathFilter {
  /** An array of RegEx values by which to filter. */
  regexes?: Array<string>;
}

export const PathFilter: Schema.Schema<PathFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regexes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "PathFilter" }) as any as Schema.Schema<PathFilter>;

export interface LiveMigrationStep {
  /** Output only. A pair of ACME challenges that Hosting's Certificate Authority (CA) can use to create an SSL cert for your domain name. Use either the DNS or HTTP challenge; it's not necessary to provide both. */
  certVerification?: CertVerification;
  /** Output only. DNS updates to facilitate your domain's zero-downtime migration to Hosting. */
  dnsUpdates?: DnsUpdates;
  /** Output only. Issues that prevent the current step from completing. */
  issues?: Array<Status>;
  /** Output only. The state of the live migration step, indicates whether you should work to complete the step now, in the future, or have already completed it. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PREPARING"
    | "PENDING"
    | "INCOMPLETE"
    | "PROCESSING"
    | "COMPLETE"
    | (string & {});
}

export const LiveMigrationStep: Schema.Schema<LiveMigrationStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      certVerification: Schema.optional(CertVerification),
      dnsUpdates: Schema.optional(DnsUpdates),
      issues: Schema.optional(Schema.Array(Status)),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveMigrationStep",
  }) as any as Schema.Schema<LiveMigrationStep>;

export interface CustomDomainMetadata {
  /** The `HostState` of the domain name this `CustomDomain` refers to. */
  hostState?:
    | "HOST_STATE_UNSPECIFIED"
    | "HOST_UNHOSTED"
    | "HOST_UNREACHABLE"
    | "HOST_MISMATCH"
    | "HOST_CONFLICT"
    | "HOST_ACTIVE"
    | (string & {});
  /** The `CertState` of the domain name's SSL certificate. */
  certState?:
    | "CERT_STATE_UNSPECIFIED"
    | "CERT_PREPARING"
    | "CERT_VALIDATING"
    | "CERT_PROPAGATING"
    | "CERT_ACTIVE"
    | "CERT_EXPIRING_SOON"
    | "CERT_EXPIRED"
    | (string & {});
  /** A set of DNS record updates and ACME challenges that allow you to transition domain names to Firebase Hosting with zero downtime. These updates allow Hosting to create an SSL certificate and establish ownership for your custom domain before Hosting begins serving traffic on it. If your domain name is already in active use with another provider, add one of the challenges and make the recommended DNS updates. After adding challenges and adjusting DNS records as necessary, wait for the `ownershipState` to be `OWNERSHIP_ACTIVE` and the `certState` to be `CERT_ACTIVE` before sending traffic to Hosting. */
  liveMigrationSteps?: Array<LiveMigrationStep>;
  /** A set of DNS record updates that allow Hosting to serve secure content on your domain name. The record type determines the update's purpose: - `A` and `AAAA`: Updates your domain name's IP addresses so that they direct traffic to Hosting servers. - `TXT`: Updates ownership permissions on your domain name, letting Hosting know that your custom domain's project has permission to perform actions for that domain name. - `CAA`: Updates your domain name's list of authorized Certificate Authorities (CAs). Only present if you have existing `CAA` records that prohibit Hosting's CA from minting certs for your domain name. These updates include all DNS changes you'll need to get started with Hosting, but, if made all at once, can result in a brief period of downtime for your domain name--while Hosting creates and uploads an SSL cert, for example. If you'd like to add your domain name to Hosting without downtime, complete the `liveMigrationSteps` first, before making the remaining updates in this field. */
  quickSetupUpdates?: DnsUpdates;
  /** A list of issues that are currently preventing Hosting from completing the operation. These are generally DNS-related issues that Hosting encounters when querying a domain name's records or attempting to mint an SSL certificate. */
  issues?: Array<Status>;
  /** The `OwnershipState` of the domain name this `CustomDomain` refers to. */
  ownershipState?:
    | "OWNERSHIP_STATE_UNSPECIFIED"
    | "OWNERSHIP_MISSING"
    | "OWNERSHIP_UNREACHABLE"
    | "OWNERSHIP_MISMATCH"
    | "OWNERSHIP_CONFLICT"
    | "OWNERSHIP_PENDING"
    | "OWNERSHIP_ACTIVE"
    | (string & {});
}

export const CustomDomainMetadata: Schema.Schema<CustomDomainMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hostState: Schema.optional(Schema.String),
      certState: Schema.optional(Schema.String),
      liveMigrationSteps: Schema.optional(Schema.Array(LiveMigrationStep)),
      quickSetupUpdates: Schema.optional(DnsUpdates),
      issues: Schema.optional(Schema.Array(Status)),
      ownershipState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomDomainMetadata",
  }) as any as Schema.Schema<CustomDomainMetadata>;

export interface ListVersionsResponse {
  /** The list of versions, if any exist. */
  versions?: Array<Version>;
  /** The pagination token, if more results exist beyond the ones in this response. Include this token in your next call to `ListVersions`. Page tokens are short-lived and should not be stored. */
  nextPageToken?: string;
}

export const ListVersionsResponse: Schema.Schema<ListVersionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      versions: Schema.optional(Schema.Array(Version)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListVersionsResponse",
  }) as any as Schema.Schema<ListVersionsResponse>;

export interface DomainRedirect {
  /** Required. The domain name to redirect to. */
  domainName?: string;
  /** Required. The redirect status code. */
  type?: "REDIRECT_TYPE_UNSPECIFIED" | "MOVED_PERMANENTLY" | (string & {});
}

export const DomainRedirect: Schema.Schema<DomainRedirect> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      domainName: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DomainRedirect",
  }) as any as Schema.Schema<DomainRedirect>;

export interface CertHttpChallenge {
  /** The token to serve at the specified URL path to satisfy the certificate challenge. */
  token?: string;
  /** The URL path on which to serve the specified token to satisfy the certificate challenge. */
  path?: string;
}

export const CertHttpChallenge: Schema.Schema<CertHttpChallenge> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      token: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CertHttpChallenge",
  }) as any as Schema.Schema<CertHttpChallenge>;

export interface DomainProvisioning {
  /** The DNS challenge for generating a certificate. */
  certChallengeDns?: CertDnsChallenge;
  /** The HTTP challenge for generating a certificate. */
  certChallengeHttp?: CertHttpChallenge;
  /** The list of IPs to which the domain is expected to resolve. */
  expectedIps?: Array<string>;
  /** The time at which the last DNS fetch occurred. */
  dnsFetchTime?: string;
  /** The DNS record match status as of the last DNS fetch. */
  dnsStatus?:
    | "DNS_STATUS_UNSPECIFIED"
    | "DNS_PENDING"
    | "DNS_MISSING"
    | "DNS_PARTIAL_MATCH"
    | "DNS_MATCH"
    | "DNS_EXTRANEOUS_MATCH"
    | (string & {});
  /** The IPs found at the last DNS fetch. */
  discoveredIps?: Array<string>;
  /** The TXT records (for the certificate challenge) that were found at the last DNS fetch. */
  certChallengeDiscoveredTxt?: Array<string>;
  /** The certificate provisioning status; updated when Firebase Hosting provisions an SSL certificate for the domain. */
  certStatus?:
    | "CERT_STATUS_UNSPECIFIED"
    | "CERT_PENDING"
    | "CERT_MISSING"
    | "CERT_PROCESSING"
    | "CERT_PROPAGATING"
    | "CERT_ACTIVE"
    | "CERT_ERROR"
    | (string & {});
}

export const DomainProvisioning: Schema.Schema<DomainProvisioning> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      certChallengeDns: Schema.optional(CertDnsChallenge),
      certChallengeHttp: Schema.optional(CertHttpChallenge),
      expectedIps: Schema.optional(Schema.Array(Schema.String)),
      dnsFetchTime: Schema.optional(Schema.String),
      dnsStatus: Schema.optional(Schema.String),
      discoveredIps: Schema.optional(Schema.Array(Schema.String)),
      certChallengeDiscoveredTxt: Schema.optional(Schema.Array(Schema.String)),
      certStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DomainProvisioning",
  }) as any as Schema.Schema<DomainProvisioning>;

export interface Domain {
  /** Required. The site name of the association. */
  site?: string;
  /** If set, the domain should redirect with the provided parameters. */
  domainRedirect?: DomainRedirect;
  /** Output only. The time at which the domain was last updated. */
  updateTime?: string;
  /** Required. The domain name of the association. */
  domainName?: string;
  /** Output only. Additional status of the domain association. */
  status?:
    | "DOMAIN_STATUS_UNSPECIFIED"
    | "DOMAIN_CHANGE_PENDING"
    | "DOMAIN_ACTIVE"
    | "DOMAIN_VERIFICATION_REQUIRED"
    | "DOMAIN_VERIFICATION_LOST"
    | (string & {});
  /** Output only. Information about the provisioning of certificates and the health of the DNS resolution for the domain. */
  provisioning?: DomainProvisioning;
}

export const Domain: Schema.Schema<Domain> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      site: Schema.optional(Schema.String),
      domainRedirect: Schema.optional(DomainRedirect),
      updateTime: Schema.optional(Schema.String),
      domainName: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      provisioning: Schema.optional(DomainProvisioning),
    }),
  ).annotate({ identifier: "Domain" }) as any as Schema.Schema<Domain>;

export interface ListDomainsResponse {
  /** The list of domains, if any exist. */
  domains?: Array<Domain>;
  /** The pagination token, if more results exist. */
  nextPageToken?: string;
}

export const ListDomainsResponse: Schema.Schema<ListDomainsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      domains: Schema.optional(Schema.Array(Domain)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListDomainsResponse",
  }) as any as Schema.Schema<ListDomainsResponse>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      error: Schema.optional(Status),
      done: Schema.optional(Schema.Boolean),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListVersionFilesResponse {
  /** The list of paths to the hashes of the files in the specified version. */
  files?: Array<VersionFile>;
  /** The pagination token, if more results exist beyond the ones in this response. Include this token in your next call to `ListVersionFiles`. Page tokens are short-lived and should not be stored. */
  nextPageToken?: string;
}

export const ListVersionFilesResponse: Schema.Schema<ListVersionFilesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      files: Schema.optional(Schema.Array(VersionFile)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListVersionFilesResponse",
  }) as any as Schema.Schema<ListVersionFilesResponse>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(Operation)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface PopulateVersionFilesRequest {
  /** A set of file paths to the hashes corresponding to assets that should be added to the version. A file path to an empty hash will remove the path from the version. Calculate a hash by Gzipping the file then taking the SHA256 hash of the newly compressed file. */
  files?: Record<string, string>;
}

export const PopulateVersionFilesRequest: Schema.Schema<PopulateVersionFilesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      files: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "PopulateVersionFilesRequest",
  }) as any as Schema.Schema<PopulateVersionFilesRequest>;

export interface ListReleasesResponse {
  /** The list of hashes of files that still need to be uploaded, if any exist. */
  releases?: Array<Release>;
  /** The pagination token, if more results exist beyond the ones in this response. Include this token in your next call to `ListReleases`. Page tokens are short-lived and should not be stored. */
  nextPageToken?: string;
}

export const ListReleasesResponse: Schema.Schema<ListReleasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      releases: Schema.optional(Schema.Array(Release)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListReleasesResponse",
  }) as any as Schema.Schema<ListReleasesResponse>;

export interface PopulateVersionFilesResponse {
  /** The content hashes of the specified files that need to be uploaded to the specified URL. */
  uploadRequiredHashes?: Array<string>;
  /** The URL to which the files should be uploaded, in the format: "https://upload-firebasehosting.googleapis.com/upload/sites/SITE_ID /versions/VERSION_ID/files" Perform a multipart `POST` of the Gzipped file contents to the URL using a forward slash and the hash of the file appended to the end. */
  uploadUrl?: string;
}

export const PopulateVersionFilesResponse: Schema.Schema<PopulateVersionFilesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uploadRequiredHashes: Schema.optional(Schema.Array(Schema.String)),
      uploadUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PopulateVersionFilesResponse",
  }) as any as Schema.Schema<PopulateVersionFilesResponse>;

export interface CloneVersionRequest {
  /** If true, the call to `CloneVersion` immediately finalizes the version after cloning is complete. If false, the cloned version will have a status of `CREATED`. Use [`UpdateVersion`](patch) to set the status of the version to `FINALIZED`. */
  finalize?: boolean;
  /** If provided, only paths that do not match any of the RegEx values in this list will be included in the new version. */
  exclude?: PathFilter;
  /** Required. The unique identifier for the version to be cloned, in the format: sites/SITE_ID/versions/VERSION_ID */
  sourceVersion?: string;
  /** If provided, only paths that match one or more RegEx values in this list will be included in the new version. */
  include?: PathFilter;
}

export const CloneVersionRequest: Schema.Schema<CloneVersionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      finalize: Schema.optional(Schema.Boolean),
      exclude: Schema.optional(PathFilter),
      sourceVersion: Schema.optional(Schema.String),
      include: Schema.optional(PathFilter),
    }),
  ).annotate({
    identifier: "CloneVersionRequest",
  }) as any as Schema.Schema<CloneVersionRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface UpdateConfigProjectsSitesRequest {
  /** Required. The site for which to update the SiteConfig, in the format: sites/ site-name/config */
  name: string;
  /** A set of field names from your [site configuration](../sites.SiteConfig) that you want to update. A field will be overwritten if, and only if, it's in the mask. If a mask is not provided then a default mask of only [`max_versions`](../sites.SiteConfig.max_versions) will be used. */
  updateMask?: string;
  /** Request body */
  body?: SiteConfig;
}

export const UpdateConfigProjectsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(SiteConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/config",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateConfigProjectsSitesRequest>;

export type UpdateConfigProjectsSitesResponse = SiteConfig;
export const UpdateConfigProjectsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ SiteConfig;

export type UpdateConfigProjectsSitesError = DefaultErrors;

/** Sets the Hosting metadata for a specific site. */
export const updateConfigProjectsSites: API.OperationMethod<
  UpdateConfigProjectsSitesRequest,
  UpdateConfigProjectsSitesResponse,
  UpdateConfigProjectsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConfigProjectsSitesRequest,
  output: UpdateConfigProjectsSitesResponse,
  errors: [],
}));

export interface ListProjectsSitesRequest {
  /** Required. The Firebase project for which to list sites, in the format: projects/PROJECT_IDENTIFIER Refer to the `Site` [`name`](../projects#Site.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Optional. A token from a previous call to `ListSites` that tells the server where to resume listing. */
  pageToken?: string;
  /** Optional. The maximum number of sites to return. The service may return a lower number if fewer sites exist than this maximum number. If unspecified, defaults to 40. */
  pageSize?: number;
}

export const ListProjectsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/sites" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSitesRequest>;

export type ListProjectsSitesResponse = ListSitesResponse;
export const ListProjectsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSitesResponse;

export type ListProjectsSitesError = DefaultErrors;

/** Lists each Hosting Site associated with the specified parent Firebase project. */
export const listProjectsSites: API.PaginatedOperationMethod<
  ListProjectsSitesRequest,
  ListProjectsSitesResponse,
  ListProjectsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSitesRequest,
  output: ListProjectsSitesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsSitesRequest {
  /** Required. The Firebase project in which to create a Hosting site, in the format: projects/PROJECT_IDENTIFIER Refer to the `Site` [`name`](../projects#Site.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Required. Immutable. A globally unique identifier for the Hosting site. This identifier is used to construct the Firebase-provisioned subdomains for the site, so it must also be a valid domain name label. */
  siteId?: string;
  /** Optional. If set, validates that the site_id is available and that the request would succeed, returning the expected resulting site or error. */
  validateOnly?: boolean;
  /** Request body */
  body?: Site;
}

export const CreateProjectsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    siteId: Schema.optional(Schema.String).pipe(T.HttpQuery("siteId")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(Site).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/sites",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsSitesRequest>;

export type CreateProjectsSitesResponse = Site;
export const CreateProjectsSitesResponse = /*@__PURE__*/ /*#__PURE__*/ Site;

export type CreateProjectsSitesError = DefaultErrors;

/** Creates a new Hosting Site in the specified parent Firebase project. Note that Hosting sites can take several minutes to propagate through Firebase systems. */
export const createProjectsSites: API.OperationMethod<
  CreateProjectsSitesRequest,
  CreateProjectsSitesResponse,
  CreateProjectsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsSitesRequest,
  output: CreateProjectsSitesResponse,
  errors: [],
}));

export interface PatchProjectsSitesRequest {
  /** Output only. The fully-qualified resource name of the Hosting site, in the format: projects/PROJECT_IDENTIFIER/sites/SITE_ID PROJECT_IDENTIFIER: the Firebase project's [`ProjectNumber`](https://firebase.google.com/docs/reference/firebase-management/rest/v1beta1/projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](https://firebase.google.com/docs/reference/firebase-management/rest/v1beta1/projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). */
  name: string;
  /** A set of field names from your Site that you want to update. */
  updateMask?: string;
  /** Request body */
  body?: Site;
}

export const PatchProjectsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Site).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsSitesRequest>;

export type PatchProjectsSitesResponse = Site;
export const PatchProjectsSitesResponse = /*@__PURE__*/ /*#__PURE__*/ Site;

export type PatchProjectsSitesError = DefaultErrors;

/** Updates attributes of the specified Hosting Site. */
export const patchProjectsSites: API.OperationMethod<
  PatchProjectsSitesRequest,
  PatchProjectsSitesResponse,
  PatchProjectsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsSitesRequest,
  output: PatchProjectsSitesResponse,
  errors: [],
}));

export interface GetProjectsSitesRequest {
  /** Required. The fully-qualified resource name for the Hosting site, in the format: projects/PROJECT_IDENTIFIER/sites/SITE_ID Refer to the `Site` [`name`](../projects#Site.FIELDS.name) field for details about PROJECT_IDENTIFIER values. Since a SITE_ID is a globally unique identifier, you can also use the unique sub-collection resource access pattern, in the format: projects/-/sites/SITE_ID */
  name: string;
}

export const GetProjectsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsSitesRequest>;

export type GetProjectsSitesResponse = Site;
export const GetProjectsSitesResponse = /*@__PURE__*/ /*#__PURE__*/ Site;

export type GetProjectsSitesError = DefaultErrors;

/** Gets the specified Hosting Site. */
export const getProjectsSites: API.OperationMethod<
  GetProjectsSitesRequest,
  GetProjectsSitesResponse,
  GetProjectsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsSitesRequest,
  output: GetProjectsSitesResponse,
  errors: [],
}));

export interface GetConfigProjectsSitesRequest {
  /** Required. The site for which to get the SiteConfig, in the format: sites/ site-name/config */
  name: string;
}

export const GetConfigProjectsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/config",
    }),
    svc,
  ) as unknown as Schema.Schema<GetConfigProjectsSitesRequest>;

export type GetConfigProjectsSitesResponse = SiteConfig;
export const GetConfigProjectsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ SiteConfig;

export type GetConfigProjectsSitesError = DefaultErrors;

/** Gets the Hosting metadata for a specific site. */
export const getConfigProjectsSites: API.OperationMethod<
  GetConfigProjectsSitesRequest,
  GetConfigProjectsSitesResponse,
  GetConfigProjectsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConfigProjectsSitesRequest,
  output: GetConfigProjectsSitesResponse,
  errors: [],
}));

export interface DeleteProjectsSitesRequest {
  /** Required. The fully-qualified resource name for the Hosting site, in the format: projects/PROJECT_IDENTIFIER/sites/SITE_ID Refer to the `Site` [`name`](../projects#Site.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  name: string;
}

export const DeleteProjectsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsSitesRequest>;

export type DeleteProjectsSitesResponse = Empty;
export const DeleteProjectsSitesResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsSitesError = DefaultErrors;

/** Deletes the specified Hosting Site from the specified parent Firebase project. */
export const deleteProjectsSites: API.OperationMethod<
  DeleteProjectsSitesRequest,
  DeleteProjectsSitesResponse,
  DeleteProjectsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsSitesRequest,
  output: DeleteProjectsSitesResponse,
  errors: [],
}));

export interface UndeleteProjectsSitesCustomDomainsRequest {
  /** Required. The name of the `CustomDomain` to delete. */
  name: string;
  /** Request body */
  body?: UndeleteCustomDomainRequest;
}

export const UndeleteProjectsSitesCustomDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UndeleteCustomDomainRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/customDomains/{customDomainsId}:undelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UndeleteProjectsSitesCustomDomainsRequest>;

export type UndeleteProjectsSitesCustomDomainsResponse = Operation;
export const UndeleteProjectsSitesCustomDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type UndeleteProjectsSitesCustomDomainsError = DefaultErrors;

/** Undeletes the specified `CustomDomain` if it has been soft-deleted. Hosting retains soft-deleted custom domains for around 30 days before permanently deleting them. */
export const undeleteProjectsSitesCustomDomains: API.OperationMethod<
  UndeleteProjectsSitesCustomDomainsRequest,
  UndeleteProjectsSitesCustomDomainsResponse,
  UndeleteProjectsSitesCustomDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UndeleteProjectsSitesCustomDomainsRequest,
  output: UndeleteProjectsSitesCustomDomainsResponse,
  errors: [],
}));

export interface PatchProjectsSitesCustomDomainsRequest {
  /** If true, Hosting creates the `CustomDomain` if it doesn't already exist. */
  allowMissing?: boolean;
  /** The set of field names from your `CustomDomain` that you want to update. A field will be overwritten if, and only if, it's in the mask. If you don't provide a mask, Hosting updates the entire `CustomDomain`. */
  updateMask?: string;
  /** If true, Hosting validates that it's possible to complete your request but doesn't actually create or update the `CustomDomain`. */
  validateOnly?: boolean;
  /** Output only. The fully-qualified name of the `CustomDomain`. */
  name: string;
  /** Request body */
  body?: CustomDomain;
}

export const PatchProjectsSitesCustomDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CustomDomain).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/customDomains/{customDomainsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsSitesCustomDomainsRequest>;

export type PatchProjectsSitesCustomDomainsResponse = Operation;
export const PatchProjectsSitesCustomDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsSitesCustomDomainsError = DefaultErrors;

/** Updates the specified `CustomDomain`. */
export const patchProjectsSitesCustomDomains: API.OperationMethod<
  PatchProjectsSitesCustomDomainsRequest,
  PatchProjectsSitesCustomDomainsResponse,
  PatchProjectsSitesCustomDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsSitesCustomDomainsRequest,
  output: PatchProjectsSitesCustomDomainsResponse,
  errors: [],
}));

export interface GetProjectsSitesCustomDomainsRequest {
  /** Required. The name of the `CustomDomain` to get. */
  name: string;
}

export const GetProjectsSitesCustomDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/customDomains/{customDomainsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsSitesCustomDomainsRequest>;

export type GetProjectsSitesCustomDomainsResponse = CustomDomain;
export const GetProjectsSitesCustomDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomDomain;

export type GetProjectsSitesCustomDomainsError = DefaultErrors;

/** Gets the specified `CustomDomain`. */
export const getProjectsSitesCustomDomains: API.OperationMethod<
  GetProjectsSitesCustomDomainsRequest,
  GetProjectsSitesCustomDomainsResponse,
  GetProjectsSitesCustomDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsSitesCustomDomainsRequest,
  output: GetProjectsSitesCustomDomainsResponse,
  errors: [],
}));

export interface DeleteProjectsSitesCustomDomainsRequest {
  /** Required. The name of the `CustomDomain` to delete. */
  name: string;
  /** If true, Hosting validates that it's possible to complete your request but doesn't actually delete the `CustomDomain`. */
  validateOnly?: boolean;
  /** If true, the request succeeds even if the `CustomDomain` doesn't exist. */
  allowMissing?: boolean;
  /** A tag that represents the state of the `CustomDomain` as you know it. If present, the supplied tag must match the current value on your `CustomDomain`, or the request fails. */
  etag?: string;
}

export const DeleteProjectsSitesCustomDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/customDomains/{customDomainsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsSitesCustomDomainsRequest>;

export type DeleteProjectsSitesCustomDomainsResponse = Operation;
export const DeleteProjectsSitesCustomDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsSitesCustomDomainsError = DefaultErrors;

/** Deletes the specified `CustomDomain`. */
export const deleteProjectsSitesCustomDomains: API.OperationMethod<
  DeleteProjectsSitesCustomDomainsRequest,
  DeleteProjectsSitesCustomDomainsResponse,
  DeleteProjectsSitesCustomDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsSitesCustomDomainsRequest,
  output: DeleteProjectsSitesCustomDomainsResponse,
  errors: [],
}));

export interface ListProjectsSitesCustomDomainsRequest {
  /** Required. The Firebase Hosting `Site` with `CustomDomain` entities you'd like to list. */
  parent: string;
  /** The max number of `CustomDomain` entities to return in a request. Defaults to 10. */
  pageSize?: number;
  /** A token from a previous call to `ListCustomDomains` that tells the server where to resume listing. */
  pageToken?: string;
  /** If true, the request returns soft-deleted `CustomDomain`s that haven't been fully-deleted yet. To restore deleted `CustomDomain`s, make an `UndeleteCustomDomain` request. */
  showDeleted?: boolean;
}

export const ListProjectsSitesCustomDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/customDomains",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSitesCustomDomainsRequest>;

export type ListProjectsSitesCustomDomainsResponse = ListCustomDomainsResponse;
export const ListProjectsSitesCustomDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCustomDomainsResponse;

export type ListProjectsSitesCustomDomainsError = DefaultErrors;

/** Lists each `CustomDomain` associated with the specified parent Hosting site. Returns `CustomDomain`s in a consistent, but undefined, order to facilitate pagination. */
export const listProjectsSitesCustomDomains: API.PaginatedOperationMethod<
  ListProjectsSitesCustomDomainsRequest,
  ListProjectsSitesCustomDomainsResponse,
  ListProjectsSitesCustomDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSitesCustomDomainsRequest,
  output: ListProjectsSitesCustomDomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsSitesCustomDomainsRequest {
  /** If true, Hosting validates that it's possible to complete your request but doesn't actually create a new `CustomDomain`. */
  validateOnly?: boolean;
  /** Required. The custom domain's parent, specifically a Firebase Hosting `Site`. */
  parent: string;
  /** Required. The ID of the `CustomDomain`, which is the domain name you'd like to use with Firebase Hosting. */
  customDomainId?: string;
  /** Request body */
  body?: CustomDomain;
}

export const CreateProjectsSitesCustomDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    customDomainId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("customDomainId"),
    ),
    body: Schema.optional(CustomDomain).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/customDomains",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsSitesCustomDomainsRequest>;

export type CreateProjectsSitesCustomDomainsResponse = Operation;
export const CreateProjectsSitesCustomDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsSitesCustomDomainsError = DefaultErrors;

/** Creates a `CustomDomain`. */
export const createProjectsSitesCustomDomains: API.OperationMethod<
  CreateProjectsSitesCustomDomainsRequest,
  CreateProjectsSitesCustomDomainsResponse,
  CreateProjectsSitesCustomDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsSitesCustomDomainsRequest,
  output: CreateProjectsSitesCustomDomainsResponse,
  errors: [],
}));

export interface ListProjectsSitesCustomDomainsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list filter. */
  filter?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
}

export const ListProjectsSitesCustomDomainsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/customDomains/{customDomainsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSitesCustomDomainsOperationsRequest>;

export type ListProjectsSitesCustomDomainsOperationsResponse =
  ListOperationsResponse;
export const ListProjectsSitesCustomDomainsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListProjectsSitesCustomDomainsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. */
export const listProjectsSitesCustomDomainsOperations: API.PaginatedOperationMethod<
  ListProjectsSitesCustomDomainsOperationsRequest,
  ListProjectsSitesCustomDomainsOperationsResponse,
  ListProjectsSitesCustomDomainsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSitesCustomDomainsOperationsRequest,
  output: ListProjectsSitesCustomDomainsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsSitesCustomDomainsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsSitesCustomDomainsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/customDomains/{customDomainsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsSitesCustomDomainsOperationsRequest>;

export type GetProjectsSitesCustomDomainsOperationsResponse = Operation;
export const GetProjectsSitesCustomDomainsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetProjectsSitesCustomDomainsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsSitesCustomDomainsOperations: API.OperationMethod<
  GetProjectsSitesCustomDomainsOperationsRequest,
  GetProjectsSitesCustomDomainsOperationsResponse,
  GetProjectsSitesCustomDomainsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsSitesCustomDomainsOperationsRequest,
  output: GetProjectsSitesCustomDomainsOperationsResponse,
  errors: [],
}));

export interface CreateProjectsSitesChannelsRequest {
  /** Required. Immutable. A unique ID within the site that identifies the channel. */
  channelId?: string;
  /** Required. The site in which to create this channel, in the format: sites/ SITE_ID */
  parent: string;
  /** Request body */
  body?: Channel;
}

export const CreateProjectsSitesChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    channelId: Schema.optional(Schema.String).pipe(T.HttpQuery("channelId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Channel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/channels",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsSitesChannelsRequest>;

export type CreateProjectsSitesChannelsResponse = Channel;
export const CreateProjectsSitesChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Channel;

export type CreateProjectsSitesChannelsError = DefaultErrors;

/** Creates a new channel in the specified site. */
export const createProjectsSitesChannels: API.OperationMethod<
  CreateProjectsSitesChannelsRequest,
  CreateProjectsSitesChannelsResponse,
  CreateProjectsSitesChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsSitesChannelsRequest,
  output: CreateProjectsSitesChannelsResponse,
  errors: [],
}));

export interface ListProjectsSitesChannelsRequest {
  /** The maximum number of channels to return. The service may return a lower number if fewer channels exist than this maximum number. If unspecified, defaults to 10. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** A token from a previous call to `ListChannels` that tells the server where to resume listing. */
  pageToken?: string;
  /** Required. The site for which to list channels, in the format: sites/SITE_ID */
  parent: string;
}

export const ListProjectsSitesChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/channels",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSitesChannelsRequest>;

export type ListProjectsSitesChannelsResponse = ListChannelsResponse;
export const ListProjectsSitesChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListChannelsResponse;

export type ListProjectsSitesChannelsError = DefaultErrors;

/** Lists the channels for the specified site. All sites have a default `live` channel. */
export const listProjectsSitesChannels: API.PaginatedOperationMethod<
  ListProjectsSitesChannelsRequest,
  ListProjectsSitesChannelsResponse,
  ListProjectsSitesChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSitesChannelsRequest,
  output: ListProjectsSitesChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsSitesChannelsRequest {
  /** Required. The fully-qualified resource name for the channel, in the format: sites/SITE_ID/channels/CHANNEL_ID */
  name: string;
}

export const DeleteProjectsSitesChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/channels/{channelsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsSitesChannelsRequest>;

export type DeleteProjectsSitesChannelsResponse = Empty;
export const DeleteProjectsSitesChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsSitesChannelsError = DefaultErrors;

/** Deletes the specified channel of the specified site. The `live` channel cannot be deleted. */
export const deleteProjectsSitesChannels: API.OperationMethod<
  DeleteProjectsSitesChannelsRequest,
  DeleteProjectsSitesChannelsResponse,
  DeleteProjectsSitesChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsSitesChannelsRequest,
  output: DeleteProjectsSitesChannelsResponse,
  errors: [],
}));

export interface GetProjectsSitesChannelsRequest {
  /** Required. The fully-qualified resource name for the channel, in the format: sites/SITE_ID/channels/CHANNEL_ID */
  name: string;
}

export const GetProjectsSitesChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/channels/{channelsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsSitesChannelsRequest>;

export type GetProjectsSitesChannelsResponse = Channel;
export const GetProjectsSitesChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Channel;

export type GetProjectsSitesChannelsError = DefaultErrors;

/** Retrieves information for the specified channel of the specified site. */
export const getProjectsSitesChannels: API.OperationMethod<
  GetProjectsSitesChannelsRequest,
  GetProjectsSitesChannelsResponse,
  GetProjectsSitesChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsSitesChannelsRequest,
  output: GetProjectsSitesChannelsResponse,
  errors: [],
}));

export interface PatchProjectsSitesChannelsRequest {
  /** The fully-qualified resource name for the channel, in the format: sites/ SITE_ID/channels/CHANNEL_ID */
  name: string;
  /** A comma-separated list of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: Channel;
}

export const PatchProjectsSitesChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Channel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/channels/{channelsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsSitesChannelsRequest>;

export type PatchProjectsSitesChannelsResponse = Channel;
export const PatchProjectsSitesChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Channel;

export type PatchProjectsSitesChannelsError = DefaultErrors;

/** Updates information for the specified channel of the specified site. Implicitly creates the channel if it doesn't already exist. */
export const patchProjectsSitesChannels: API.OperationMethod<
  PatchProjectsSitesChannelsRequest,
  PatchProjectsSitesChannelsResponse,
  PatchProjectsSitesChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsSitesChannelsRequest,
  output: PatchProjectsSitesChannelsResponse,
  errors: [],
}));

export interface CreateProjectsSitesChannelsReleasesRequest {
  /** Required. The site or channel to which the release belongs, in either of the following formats: - sites/SITE_ID - sites/SITE_ID/channels/CHANNEL_ID */
  parent: string;
  /** The unique identifier for a version, in the format: sites/SITE_ID/versions/ VERSION_ID The SITE_ID in this version identifier must match the SITE_ID in the `parent` parameter. This query parameter must be empty if the `type` field in the request body is `SITE_DISABLE`. */
  versionName?: string;
  /** Request body */
  body?: Release;
}

export const CreateProjectsSitesChannelsReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    versionName: Schema.optional(Schema.String).pipe(
      T.HttpQuery("versionName"),
    ),
    body: Schema.optional(Release).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/channels/{channelsId}/releases",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsSitesChannelsReleasesRequest>;

export type CreateProjectsSitesChannelsReleasesResponse = Release;
export const CreateProjectsSitesChannelsReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Release;

export type CreateProjectsSitesChannelsReleasesError = DefaultErrors;

/** Creates a new release, which makes the content of the specified version actively display on the appropriate URL(s). */
export const createProjectsSitesChannelsReleases: API.OperationMethod<
  CreateProjectsSitesChannelsReleasesRequest,
  CreateProjectsSitesChannelsReleasesResponse,
  CreateProjectsSitesChannelsReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsSitesChannelsReleasesRequest,
  output: CreateProjectsSitesChannelsReleasesResponse,
  errors: [],
}));

export interface ListProjectsSitesChannelsReleasesRequest {
  /** Required. The site or channel for which to list releases, in either of the following formats: - sites/SITE_ID - sites/SITE_ID/channels/CHANNEL_ID */
  parent: string;
  /** The maximum number of releases to return. The service may return a lower number if fewer releases exist than this maximum number. If unspecified, defaults to 100. */
  pageSize?: number;
  /** A token from a previous call to `releases.list` or `channels.releases.list` that tells the server where to resume listing. */
  pageToken?: string;
}

export const ListProjectsSitesChannelsReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/channels/{channelsId}/releases",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSitesChannelsReleasesRequest>;

export type ListProjectsSitesChannelsReleasesResponse = ListReleasesResponse;
export const ListProjectsSitesChannelsReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListReleasesResponse;

export type ListProjectsSitesChannelsReleasesError = DefaultErrors;

/** Lists the releases that have been created for the specified site or channel. When used to list releases for a site, this list includes releases for both the default `live` channel and any active preview channels for the specified site. */
export const listProjectsSitesChannelsReleases: API.PaginatedOperationMethod<
  ListProjectsSitesChannelsReleasesRequest,
  ListProjectsSitesChannelsReleasesResponse,
  ListProjectsSitesChannelsReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSitesChannelsReleasesRequest,
  output: ListProjectsSitesChannelsReleasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsSitesChannelsReleasesRequest {
  /** Required. The fully-qualified resource name for the Hosting release, in either of the following formats: - sites/SITE_ID/channels/CHANNEL_ID/releases/RELEASE_ID - sites/SITE_ID/releases/RELEASE_ID */
  name: string;
}

export const GetProjectsSitesChannelsReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/channels/{channelsId}/releases/{releasesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsSitesChannelsReleasesRequest>;

export type GetProjectsSitesChannelsReleasesResponse = Release;
export const GetProjectsSitesChannelsReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Release;

export type GetProjectsSitesChannelsReleasesError = DefaultErrors;

/** Gets the specified release for a site or channel. When used to get a release for a site, this can get releases for both the default `live` channel and any active preview channels for the specified site. */
export const getProjectsSitesChannelsReleases: API.OperationMethod<
  GetProjectsSitesChannelsReleasesRequest,
  GetProjectsSitesChannelsReleasesResponse,
  GetProjectsSitesChannelsReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsSitesChannelsReleasesRequest,
  output: GetProjectsSitesChannelsReleasesResponse,
  errors: [],
}));

export interface CreateProjectsSitesDomainsRequest {
  /** Required. The parent to create the domain association for, in the format: sites/site-name */
  parent: string;
  /** Request body */
  body?: Domain;
}

export const CreateProjectsSitesDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Domain).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/domains",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsSitesDomainsRequest>;

export type CreateProjectsSitesDomainsResponse = Domain;
export const CreateProjectsSitesDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Domain;

export type CreateProjectsSitesDomainsError = DefaultErrors;

/** Creates a domain mapping on the specified site. */
export const createProjectsSitesDomains: API.OperationMethod<
  CreateProjectsSitesDomainsRequest,
  CreateProjectsSitesDomainsResponse,
  CreateProjectsSitesDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsSitesDomainsRequest,
  output: CreateProjectsSitesDomainsResponse,
  errors: [],
}));

export interface ListProjectsSitesDomainsRequest {
  /** Required. The parent for which to list domains, in the format: sites/ site-name */
  parent: string;
  /** The page size to return. Defaults to 50. */
  pageSize?: number;
  /** The next_page_token from a previous request, if provided. */
  pageToken?: string;
}

export const ListProjectsSitesDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/domains",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSitesDomainsRequest>;

export type ListProjectsSitesDomainsResponse = ListDomainsResponse;
export const ListProjectsSitesDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListDomainsResponse;

export type ListProjectsSitesDomainsError = DefaultErrors;

/** Lists the domains for the specified site. */
export const listProjectsSitesDomains: API.PaginatedOperationMethod<
  ListProjectsSitesDomainsRequest,
  ListProjectsSitesDomainsResponse,
  ListProjectsSitesDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSitesDomainsRequest,
  output: ListProjectsSitesDomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdateProjectsSitesDomainsRequest {
  /** Required. The name of the domain association to update or create, if an association doesn't already exist. */
  name: string;
  /** Request body */
  body?: Domain;
}

export const UpdateProjectsSitesDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Domain).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/domains/{domainsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateProjectsSitesDomainsRequest>;

export type UpdateProjectsSitesDomainsResponse = Domain;
export const UpdateProjectsSitesDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Domain;

export type UpdateProjectsSitesDomainsError = DefaultErrors;

/** Updates the specified domain mapping, creating the mapping as if it does not exist. */
export const updateProjectsSitesDomains: API.OperationMethod<
  UpdateProjectsSitesDomainsRequest,
  UpdateProjectsSitesDomainsResponse,
  UpdateProjectsSitesDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateProjectsSitesDomainsRequest,
  output: UpdateProjectsSitesDomainsResponse,
  errors: [],
}));

export interface DeleteProjectsSitesDomainsRequest {
  /** Required. The name of the domain association to delete. */
  name: string;
}

export const DeleteProjectsSitesDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/domains/{domainsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsSitesDomainsRequest>;

export type DeleteProjectsSitesDomainsResponse = Empty;
export const DeleteProjectsSitesDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsSitesDomainsError = DefaultErrors;

/** Deletes the existing domain mapping on the specified site. */
export const deleteProjectsSitesDomains: API.OperationMethod<
  DeleteProjectsSitesDomainsRequest,
  DeleteProjectsSitesDomainsResponse,
  DeleteProjectsSitesDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsSitesDomainsRequest,
  output: DeleteProjectsSitesDomainsResponse,
  errors: [],
}));

export interface GetProjectsSitesDomainsRequest {
  /** Required. The name of the domain configuration to get. */
  name: string;
}

export const GetProjectsSitesDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/domains/{domainsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsSitesDomainsRequest>;

export type GetProjectsSitesDomainsResponse = Domain;
export const GetProjectsSitesDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Domain;

export type GetProjectsSitesDomainsError = DefaultErrors;

/** Gets a domain mapping on the specified site. */
export const getProjectsSitesDomains: API.OperationMethod<
  GetProjectsSitesDomainsRequest,
  GetProjectsSitesDomainsResponse,
  GetProjectsSitesDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsSitesDomainsRequest,
  output: GetProjectsSitesDomainsResponse,
  errors: [],
}));

export interface ListProjectsSitesVersionsRequest {
  /** The maximum number of versions to return. The service may return a lower number if fewer versions exist than this maximum number. If unspecified, defaults to 25. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** A token from a previous call to `ListVersions` that tells the server where to resume listing. */
  pageToken?: string;
  /** Required. The site or channel for which to list versions, in either of the following formats: - sites/SITE_ID - sites/SITE_ID/channels/CHANNEL_ID */
  parent: string;
  /** A filter string used to return a subset of versions in the response. The currently supported fields for filtering are: `name`, `status`, and `create_time`. Learn more about filtering in Google's [AIP 160 standard](https://google.aip.dev/160). */
  filter?: string;
}

export const ListProjectsSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/versions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSitesVersionsRequest>;

export type ListProjectsSitesVersionsResponse = ListVersionsResponse;
export const ListProjectsSitesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListVersionsResponse;

export type ListProjectsSitesVersionsError = DefaultErrors;

/** Lists the versions that have been created for the specified site. This list includes versions for both the default `live` channel and any active preview channels for the specified site. */
export const listProjectsSitesVersions: API.PaginatedOperationMethod<
  ListProjectsSitesVersionsRequest,
  ListProjectsSitesVersionsResponse,
  ListProjectsSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSitesVersionsRequest,
  output: ListProjectsSitesVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsSitesVersionsRequest {
  /** A unique id for the new version. This is was only specified for legacy version creations, and should be blank. */
  versionId?: string;
  /** The self-reported size of the version. This value is used for a pre-emptive quota check for legacy version uploads. */
  sizeBytes?: string;
  /** Required. The site in which to create the version, in the format: sites/ SITE_ID */
  parent: string;
  /** Request body */
  body?: Version;
}

export const CreateProjectsSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    versionId: Schema.optional(Schema.String).pipe(T.HttpQuery("versionId")),
    sizeBytes: Schema.optional(Schema.String).pipe(T.HttpQuery("sizeBytes")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Version).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/versions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsSitesVersionsRequest>;

export type CreateProjectsSitesVersionsResponse = Version;
export const CreateProjectsSitesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Version;

export type CreateProjectsSitesVersionsError = DefaultErrors;

/** Creates a new version for the specified site. */
export const createProjectsSitesVersions: API.OperationMethod<
  CreateProjectsSitesVersionsRequest,
  CreateProjectsSitesVersionsResponse,
  CreateProjectsSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsSitesVersionsRequest,
  output: CreateProjectsSitesVersionsResponse,
  errors: [],
}));

export interface CloneProjectsSitesVersionsRequest {
  /** Required. The target site for the cloned version, in the format: sites/ SITE_ID */
  parent: string;
  /** Request body */
  body?: CloneVersionRequest;
}

export const CloneProjectsSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(CloneVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/versions:clone",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CloneProjectsSitesVersionsRequest>;

export type CloneProjectsSitesVersionsResponse = Operation;
export const CloneProjectsSitesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CloneProjectsSitesVersionsError = DefaultErrors;

/** Creates a new version on the specified target site using the content of the specified version. */
export const cloneProjectsSitesVersions: API.OperationMethod<
  CloneProjectsSitesVersionsRequest,
  CloneProjectsSitesVersionsResponse,
  CloneProjectsSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CloneProjectsSitesVersionsRequest,
  output: CloneProjectsSitesVersionsResponse,
  errors: [],
}));

export interface PatchProjectsSitesVersionsRequest {
  /** The fully-qualified resource name for the version, in the format: sites/ SITE_ID/versions/VERSION_ID This name is provided in the response body when you call [`CreateVersion`](sites.versions/create). */
  name: string;
  /** A set of field names from your [version](../sites.versions) that you want to update. A field will be overwritten if, and only if, it's in the mask. If a mask is not provided then a default mask of only [`status`](../sites.versions#Version.FIELDS.status) will be used. */
  updateMask?: string;
  /** Request body */
  body?: Version;
}

export const PatchProjectsSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Version).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/versions/{versionsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsSitesVersionsRequest>;

export type PatchProjectsSitesVersionsResponse = Version;
export const PatchProjectsSitesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Version;

export type PatchProjectsSitesVersionsError = DefaultErrors;

/** Updates the specified metadata for the specified version. This method will fail with `FAILED_PRECONDITION` in the event of an invalid state transition. The supported [state](../sites.versions#versionstatus) transitions for a version are from `CREATED` to `FINALIZED`. Use [`DeleteVersion`](delete) to set the status of a version to `DELETED`. */
export const patchProjectsSitesVersions: API.OperationMethod<
  PatchProjectsSitesVersionsRequest,
  PatchProjectsSitesVersionsResponse,
  PatchProjectsSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsSitesVersionsRequest,
  output: PatchProjectsSitesVersionsResponse,
  errors: [],
}));

export interface PopulateFilesProjectsSitesVersionsRequest {
  /** Required. The version to which to add files, in the format: sites/SITE_ID /versions/VERSION_ID */
  parent: string;
  /** Request body */
  body?: PopulateVersionFilesRequest;
}

export const PopulateFilesProjectsSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(PopulateVersionFilesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/versions/{versionsId}:populateFiles",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PopulateFilesProjectsSitesVersionsRequest>;

export type PopulateFilesProjectsSitesVersionsResponse =
  PopulateVersionFilesResponse;
export const PopulateFilesProjectsSitesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PopulateVersionFilesResponse;

export type PopulateFilesProjectsSitesVersionsError = DefaultErrors;

/** Adds content files to the specified version. Each file must be under 2 GB. */
export const populateFilesProjectsSitesVersions: API.OperationMethod<
  PopulateFilesProjectsSitesVersionsRequest,
  PopulateFilesProjectsSitesVersionsResponse,
  PopulateFilesProjectsSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PopulateFilesProjectsSitesVersionsRequest,
  output: PopulateFilesProjectsSitesVersionsResponse,
  errors: [],
}));

export interface GetProjectsSitesVersionsRequest {
  /** Required. The fully-qualified resource name for the version, in the format: sites/SITE_ID/versions/VERSION_ID */
  name: string;
}

export const GetProjectsSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsSitesVersionsRequest>;

export type GetProjectsSitesVersionsResponse = Version;
export const GetProjectsSitesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Version;

export type GetProjectsSitesVersionsError = DefaultErrors;

/** Get the specified version that has been created for the specified site. This can include versions that were created for the default `live` channel or for any active preview channels for the specified site. */
export const getProjectsSitesVersions: API.OperationMethod<
  GetProjectsSitesVersionsRequest,
  GetProjectsSitesVersionsResponse,
  GetProjectsSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsSitesVersionsRequest,
  output: GetProjectsSitesVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsSitesVersionsRequest {
  /** Required. The fully-qualified resource name for the version, in the format: sites/SITE_ID/versions/VERSION_ID */
  name: string;
}

export const DeleteProjectsSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsSitesVersionsRequest>;

export type DeleteProjectsSitesVersionsResponse = Empty;
export const DeleteProjectsSitesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsSitesVersionsError = DefaultErrors;

/** Deletes the specified version. */
export const deleteProjectsSitesVersions: API.OperationMethod<
  DeleteProjectsSitesVersionsRequest,
  DeleteProjectsSitesVersionsResponse,
  DeleteProjectsSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsSitesVersionsRequest,
  output: DeleteProjectsSitesVersionsResponse,
  errors: [],
}));

export interface ListProjectsSitesVersionsFilesRequest {
  /** Required. The version for which to list files, in the format: sites/SITE_ID /versions/VERSION_ID */
  parent: string;
  /** The type of files that should be listed for the specified version. */
  status?: "STATUS_UNSPECIFIED" | "EXPECTED" | "ACTIVE" | (string & {});
  /** The maximum number of version files to return. The service may return a lower number if fewer version files exist than this maximum number. If unspecified, defaults to 1000. */
  pageSize?: number;
  /** A token from a previous call to `ListVersionFiles` that tells the server where to resume listing. */
  pageToken?: string;
}

export const ListProjectsSitesVersionsFilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    status: Schema.optional(Schema.String).pipe(T.HttpQuery("status")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/versions/{versionsId}/files",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSitesVersionsFilesRequest>;

export type ListProjectsSitesVersionsFilesResponse = ListVersionFilesResponse;
export const ListProjectsSitesVersionsFilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListVersionFilesResponse;

export type ListProjectsSitesVersionsFilesError = DefaultErrors;

/** Lists the remaining files to be uploaded for the specified version. */
export const listProjectsSitesVersionsFiles: API.PaginatedOperationMethod<
  ListProjectsSitesVersionsFilesRequest,
  ListProjectsSitesVersionsFilesResponse,
  ListProjectsSitesVersionsFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSitesVersionsFilesRequest,
  output: ListProjectsSitesVersionsFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsSitesReleasesRequest {
  /** Required. The site or channel to which the release belongs, in either of the following formats: - sites/SITE_ID - sites/SITE_ID/channels/CHANNEL_ID */
  parent: string;
  /** The unique identifier for a version, in the format: sites/SITE_ID/versions/ VERSION_ID The SITE_ID in this version identifier must match the SITE_ID in the `parent` parameter. This query parameter must be empty if the `type` field in the request body is `SITE_DISABLE`. */
  versionName?: string;
  /** Request body */
  body?: Release;
}

export const CreateProjectsSitesReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    versionName: Schema.optional(Schema.String).pipe(
      T.HttpQuery("versionName"),
    ),
    body: Schema.optional(Release).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/releases",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsSitesReleasesRequest>;

export type CreateProjectsSitesReleasesResponse = Release;
export const CreateProjectsSitesReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Release;

export type CreateProjectsSitesReleasesError = DefaultErrors;

/** Creates a new release, which makes the content of the specified version actively display on the appropriate URL(s). */
export const createProjectsSitesReleases: API.OperationMethod<
  CreateProjectsSitesReleasesRequest,
  CreateProjectsSitesReleasesResponse,
  CreateProjectsSitesReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsSitesReleasesRequest,
  output: CreateProjectsSitesReleasesResponse,
  errors: [],
}));

export interface GetProjectsSitesReleasesRequest {
  /** Required. The fully-qualified resource name for the Hosting release, in either of the following formats: - sites/SITE_ID/channels/CHANNEL_ID/releases/RELEASE_ID - sites/SITE_ID/releases/RELEASE_ID */
  name: string;
}

export const GetProjectsSitesReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/releases/{releasesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsSitesReleasesRequest>;

export type GetProjectsSitesReleasesResponse = Release;
export const GetProjectsSitesReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Release;

export type GetProjectsSitesReleasesError = DefaultErrors;

/** Gets the specified release for a site or channel. When used to get a release for a site, this can get releases for both the default `live` channel and any active preview channels for the specified site. */
export const getProjectsSitesReleases: API.OperationMethod<
  GetProjectsSitesReleasesRequest,
  GetProjectsSitesReleasesResponse,
  GetProjectsSitesReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsSitesReleasesRequest,
  output: GetProjectsSitesReleasesResponse,
  errors: [],
}));

export interface ListProjectsSitesReleasesRequest {
  /** The maximum number of releases to return. The service may return a lower number if fewer releases exist than this maximum number. If unspecified, defaults to 100. */
  pageSize?: number;
  /** A token from a previous call to `releases.list` or `channels.releases.list` that tells the server where to resume listing. */
  pageToken?: string;
  /** Required. The site or channel for which to list releases, in either of the following formats: - sites/SITE_ID - sites/SITE_ID/channels/CHANNEL_ID */
  parent: string;
}

export const ListProjectsSitesReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/sites/{sitesId}/releases",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSitesReleasesRequest>;

export type ListProjectsSitesReleasesResponse = ListReleasesResponse;
export const ListProjectsSitesReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListReleasesResponse;

export type ListProjectsSitesReleasesError = DefaultErrors;

/** Lists the releases that have been created for the specified site or channel. When used to list releases for a site, this list includes releases for both the default `live` channel and any active preview channels for the specified site. */
export const listProjectsSitesReleases: API.PaginatedOperationMethod<
  ListProjectsSitesReleasesRequest,
  ListProjectsSitesReleasesResponse,
  ListProjectsSitesReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSitesReleasesRequest,
  output: ListProjectsSitesReleasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsOperationsRequest>;

export type GetProjectsOperationsResponse = Operation;
export const GetProjectsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetProjectsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsOperations: API.OperationMethod<
  GetProjectsOperationsRequest,
  GetProjectsOperationsResponse,
  GetProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));

export interface GetConfigSitesRequest {
  /** Required. The site for which to get the SiteConfig, in the format: sites/ site-name/config */
  name: string;
}

export const GetConfigSitesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/sites/{sitesId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigSitesRequest>;

export type GetConfigSitesResponse = SiteConfig;
export const GetConfigSitesResponse = /*@__PURE__*/ /*#__PURE__*/ SiteConfig;

export type GetConfigSitesError = DefaultErrors;

/** Gets the Hosting metadata for a specific site. */
export const getConfigSites: API.OperationMethod<
  GetConfigSitesRequest,
  GetConfigSitesResponse,
  GetConfigSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConfigSitesRequest,
  output: GetConfigSitesResponse,
  errors: [],
}));

export interface UpdateConfigSitesRequest {
  /** A set of field names from your [site configuration](../sites.SiteConfig) that you want to update. A field will be overwritten if, and only if, it's in the mask. If a mask is not provided then a default mask of only [`max_versions`](../sites.SiteConfig.max_versions) will be used. */
  updateMask?: string;
  /** Required. The site for which to update the SiteConfig, in the format: sites/ site-name/config */
  name: string;
  /** Request body */
  body?: SiteConfig;
}

export const UpdateConfigSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(SiteConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/sites/{sitesId}/config",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateConfigSitesRequest>;

export type UpdateConfigSitesResponse = SiteConfig;
export const UpdateConfigSitesResponse = /*@__PURE__*/ /*#__PURE__*/ SiteConfig;

export type UpdateConfigSitesError = DefaultErrors;

/** Sets the Hosting metadata for a specific site. */
export const updateConfigSites: API.OperationMethod<
  UpdateConfigSitesRequest,
  UpdateConfigSitesResponse,
  UpdateConfigSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConfigSitesRequest,
  output: UpdateConfigSitesResponse,
  errors: [],
}));

export interface CreateSitesDomainsRequest {
  /** Required. The parent to create the domain association for, in the format: sites/site-name */
  parent: string;
  /** Request body */
  body?: Domain;
}

export const CreateSitesDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Domain).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/sites/{sitesId}/domains",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateSitesDomainsRequest>;

export type CreateSitesDomainsResponse = Domain;
export const CreateSitesDomainsResponse = /*@__PURE__*/ /*#__PURE__*/ Domain;

export type CreateSitesDomainsError = DefaultErrors;

/** Creates a domain mapping on the specified site. */
export const createSitesDomains: API.OperationMethod<
  CreateSitesDomainsRequest,
  CreateSitesDomainsResponse,
  CreateSitesDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSitesDomainsRequest,
  output: CreateSitesDomainsResponse,
  errors: [],
}));

export interface ListSitesDomainsRequest {
  /** The page size to return. Defaults to 50. */
  pageSize?: number;
  /** The next_page_token from a previous request, if provided. */
  pageToken?: string;
  /** Required. The parent for which to list domains, in the format: sites/ site-name */
  parent: string;
}

export const ListSitesDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta1/sites/{sitesId}/domains" }),
    svc,
  ) as unknown as Schema.Schema<ListSitesDomainsRequest>;

export type ListSitesDomainsResponse = ListDomainsResponse;
export const ListSitesDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListDomainsResponse;

export type ListSitesDomainsError = DefaultErrors;

/** Lists the domains for the specified site. */
export const listSitesDomains: API.PaginatedOperationMethod<
  ListSitesDomainsRequest,
  ListSitesDomainsResponse,
  ListSitesDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSitesDomainsRequest,
  output: ListSitesDomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdateSitesDomainsRequest {
  /** Required. The name of the domain association to update or create, if an association doesn't already exist. */
  name: string;
  /** Request body */
  body?: Domain;
}

export const UpdateSitesDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Domain).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "v1beta1/sites/{sitesId}/domains/{domainsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateSitesDomainsRequest>;

export type UpdateSitesDomainsResponse = Domain;
export const UpdateSitesDomainsResponse = /*@__PURE__*/ /*#__PURE__*/ Domain;

export type UpdateSitesDomainsError = DefaultErrors;

/** Updates the specified domain mapping, creating the mapping as if it does not exist. */
export const updateSitesDomains: API.OperationMethod<
  UpdateSitesDomainsRequest,
  UpdateSitesDomainsResponse,
  UpdateSitesDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSitesDomainsRequest,
  output: UpdateSitesDomainsResponse,
  errors: [],
}));

export interface DeleteSitesDomainsRequest {
  /** Required. The name of the domain association to delete. */
  name: string;
}

export const DeleteSitesDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/sites/{sitesId}/domains/{domainsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteSitesDomainsRequest>;

export type DeleteSitesDomainsResponse = Empty;
export const DeleteSitesDomainsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteSitesDomainsError = DefaultErrors;

/** Deletes the existing domain mapping on the specified site. */
export const deleteSitesDomains: API.OperationMethod<
  DeleteSitesDomainsRequest,
  DeleteSitesDomainsResponse,
  DeleteSitesDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSitesDomainsRequest,
  output: DeleteSitesDomainsResponse,
  errors: [],
}));

export interface GetSitesDomainsRequest {
  /** Required. The name of the domain configuration to get. */
  name: string;
}

export const GetSitesDomainsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1beta1/sites/{sitesId}/domains/{domainsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetSitesDomainsRequest>;

export type GetSitesDomainsResponse = Domain;
export const GetSitesDomainsResponse = /*@__PURE__*/ /*#__PURE__*/ Domain;

export type GetSitesDomainsError = DefaultErrors;

/** Gets a domain mapping on the specified site. */
export const getSitesDomains: API.OperationMethod<
  GetSitesDomainsRequest,
  GetSitesDomainsResponse,
  GetSitesDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSitesDomainsRequest,
  output: GetSitesDomainsResponse,
  errors: [],
}));

export interface CreateSitesVersionsRequest {
  /** Required. The site in which to create the version, in the format: sites/ SITE_ID */
  parent: string;
  /** A unique id for the new version. This is was only specified for legacy version creations, and should be blank. */
  versionId?: string;
  /** The self-reported size of the version. This value is used for a pre-emptive quota check for legacy version uploads. */
  sizeBytes?: string;
  /** Request body */
  body?: Version;
}

export const CreateSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    versionId: Schema.optional(Schema.String).pipe(T.HttpQuery("versionId")),
    sizeBytes: Schema.optional(Schema.String).pipe(T.HttpQuery("sizeBytes")),
    body: Schema.optional(Version).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/sites/{sitesId}/versions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateSitesVersionsRequest>;

export type CreateSitesVersionsResponse = Version;
export const CreateSitesVersionsResponse = /*@__PURE__*/ /*#__PURE__*/ Version;

export type CreateSitesVersionsError = DefaultErrors;

/** Creates a new version for the specified site. */
export const createSitesVersions: API.OperationMethod<
  CreateSitesVersionsRequest,
  CreateSitesVersionsResponse,
  CreateSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSitesVersionsRequest,
  output: CreateSitesVersionsResponse,
  errors: [],
}));

export interface CloneSitesVersionsRequest {
  /** Required. The target site for the cloned version, in the format: sites/ SITE_ID */
  parent: string;
  /** Request body */
  body?: CloneVersionRequest;
}

export const CloneSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(CloneVersionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/sites/{sitesId}/versions:clone",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CloneSitesVersionsRequest>;

export type CloneSitesVersionsResponse = Operation;
export const CloneSitesVersionsResponse = /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CloneSitesVersionsError = DefaultErrors;

/** Creates a new version on the specified target site using the content of the specified version. */
export const cloneSitesVersions: API.OperationMethod<
  CloneSitesVersionsRequest,
  CloneSitesVersionsResponse,
  CloneSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CloneSitesVersionsRequest,
  output: CloneSitesVersionsResponse,
  errors: [],
}));

export interface ListSitesVersionsRequest {
  /** The maximum number of versions to return. The service may return a lower number if fewer versions exist than this maximum number. If unspecified, defaults to 25. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** A token from a previous call to `ListVersions` that tells the server where to resume listing. */
  pageToken?: string;
  /** Required. The site or channel for which to list versions, in either of the following formats: - sites/SITE_ID - sites/SITE_ID/channels/CHANNEL_ID */
  parent: string;
  /** A filter string used to return a subset of versions in the response. The currently supported fields for filtering are: `name`, `status`, and `create_time`. Learn more about filtering in Google's [AIP 160 standard](https://google.aip.dev/160). */
  filter?: string;
}

export const ListSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta1/sites/{sitesId}/versions" }),
    svc,
  ) as unknown as Schema.Schema<ListSitesVersionsRequest>;

export type ListSitesVersionsResponse = ListVersionsResponse;
export const ListSitesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListVersionsResponse;

export type ListSitesVersionsError = DefaultErrors;

/** Lists the versions that have been created for the specified site. This list includes versions for both the default `live` channel and any active preview channels for the specified site. */
export const listSitesVersions: API.PaginatedOperationMethod<
  ListSitesVersionsRequest,
  ListSitesVersionsResponse,
  ListSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSitesVersionsRequest,
  output: ListSitesVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteSitesVersionsRequest {
  /** Required. The fully-qualified resource name for the version, in the format: sites/SITE_ID/versions/VERSION_ID */
  name: string;
}

export const DeleteSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/sites/{sitesId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteSitesVersionsRequest>;

export type DeleteSitesVersionsResponse = Empty;
export const DeleteSitesVersionsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteSitesVersionsError = DefaultErrors;

/** Deletes the specified version. */
export const deleteSitesVersions: API.OperationMethod<
  DeleteSitesVersionsRequest,
  DeleteSitesVersionsResponse,
  DeleteSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSitesVersionsRequest,
  output: DeleteSitesVersionsResponse,
  errors: [],
}));

export interface PatchSitesVersionsRequest {
  /** The fully-qualified resource name for the version, in the format: sites/ SITE_ID/versions/VERSION_ID This name is provided in the response body when you call [`CreateVersion`](sites.versions/create). */
  name: string;
  /** A set of field names from your [version](../sites.versions) that you want to update. A field will be overwritten if, and only if, it's in the mask. If a mask is not provided then a default mask of only [`status`](../sites.versions#Version.FIELDS.status) will be used. */
  updateMask?: string;
  /** Request body */
  body?: Version;
}

export const PatchSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Version).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/sites/{sitesId}/versions/{versionsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchSitesVersionsRequest>;

export type PatchSitesVersionsResponse = Version;
export const PatchSitesVersionsResponse = /*@__PURE__*/ /*#__PURE__*/ Version;

export type PatchSitesVersionsError = DefaultErrors;

/** Updates the specified metadata for the specified version. This method will fail with `FAILED_PRECONDITION` in the event of an invalid state transition. The supported [state](../sites.versions#versionstatus) transitions for a version are from `CREATED` to `FINALIZED`. Use [`DeleteVersion`](delete) to set the status of a version to `DELETED`. */
export const patchSitesVersions: API.OperationMethod<
  PatchSitesVersionsRequest,
  PatchSitesVersionsResponse,
  PatchSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchSitesVersionsRequest,
  output: PatchSitesVersionsResponse,
  errors: [],
}));

export interface PopulateFilesSitesVersionsRequest {
  /** Required. The version to which to add files, in the format: sites/SITE_ID /versions/VERSION_ID */
  parent: string;
  /** Request body */
  body?: PopulateVersionFilesRequest;
}

export const PopulateFilesSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(PopulateVersionFilesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/sites/{sitesId}/versions/{versionsId}:populateFiles",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PopulateFilesSitesVersionsRequest>;

export type PopulateFilesSitesVersionsResponse = PopulateVersionFilesResponse;
export const PopulateFilesSitesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PopulateVersionFilesResponse;

export type PopulateFilesSitesVersionsError = DefaultErrors;

/** Adds content files to the specified version. Each file must be under 2 GB. */
export const populateFilesSitesVersions: API.OperationMethod<
  PopulateFilesSitesVersionsRequest,
  PopulateFilesSitesVersionsResponse,
  PopulateFilesSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PopulateFilesSitesVersionsRequest,
  output: PopulateFilesSitesVersionsResponse,
  errors: [],
}));

export interface GetSitesVersionsRequest {
  /** Required. The fully-qualified resource name for the version, in the format: sites/SITE_ID/versions/VERSION_ID */
  name: string;
}

export const GetSitesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/sites/{sitesId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetSitesVersionsRequest>;

export type GetSitesVersionsResponse = Version;
export const GetSitesVersionsResponse = /*@__PURE__*/ /*#__PURE__*/ Version;

export type GetSitesVersionsError = DefaultErrors;

/** Get the specified version that has been created for the specified site. This can include versions that were created for the default `live` channel or for any active preview channels for the specified site. */
export const getSitesVersions: API.OperationMethod<
  GetSitesVersionsRequest,
  GetSitesVersionsResponse,
  GetSitesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSitesVersionsRequest,
  output: GetSitesVersionsResponse,
  errors: [],
}));

export interface ListSitesVersionsFilesRequest {
  /** The type of files that should be listed for the specified version. */
  status?: "STATUS_UNSPECIFIED" | "EXPECTED" | "ACTIVE" | (string & {});
  /** Required. The version for which to list files, in the format: sites/SITE_ID /versions/VERSION_ID */
  parent: string;
  /** The maximum number of version files to return. The service may return a lower number if fewer version files exist than this maximum number. If unspecified, defaults to 1000. */
  pageSize?: number;
  /** A token from a previous call to `ListVersionFiles` that tells the server where to resume listing. */
  pageToken?: string;
}

export const ListSitesVersionsFilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(Schema.String).pipe(T.HttpQuery("status")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/sites/{sitesId}/versions/{versionsId}/files",
    }),
    svc,
  ) as unknown as Schema.Schema<ListSitesVersionsFilesRequest>;

export type ListSitesVersionsFilesResponse = ListVersionFilesResponse;
export const ListSitesVersionsFilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListVersionFilesResponse;

export type ListSitesVersionsFilesError = DefaultErrors;

/** Lists the remaining files to be uploaded for the specified version. */
export const listSitesVersionsFiles: API.PaginatedOperationMethod<
  ListSitesVersionsFilesRequest,
  ListSitesVersionsFilesResponse,
  ListSitesVersionsFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSitesVersionsFilesRequest,
  output: ListSitesVersionsFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateSitesChannelsRequest {
  /** Required. Immutable. A unique ID within the site that identifies the channel. */
  channelId?: string;
  /** Required. The site in which to create this channel, in the format: sites/ SITE_ID */
  parent: string;
  /** Request body */
  body?: Channel;
}

export const CreateSitesChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    channelId: Schema.optional(Schema.String).pipe(T.HttpQuery("channelId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Channel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/sites/{sitesId}/channels",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateSitesChannelsRequest>;

export type CreateSitesChannelsResponse = Channel;
export const CreateSitesChannelsResponse = /*@__PURE__*/ /*#__PURE__*/ Channel;

export type CreateSitesChannelsError = DefaultErrors;

/** Creates a new channel in the specified site. */
export const createSitesChannels: API.OperationMethod<
  CreateSitesChannelsRequest,
  CreateSitesChannelsResponse,
  CreateSitesChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSitesChannelsRequest,
  output: CreateSitesChannelsResponse,
  errors: [],
}));

export interface ListSitesChannelsRequest {
  /** Required. The site for which to list channels, in the format: sites/SITE_ID */
  parent: string;
  /** The maximum number of channels to return. The service may return a lower number if fewer channels exist than this maximum number. If unspecified, defaults to 10. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** A token from a previous call to `ListChannels` that tells the server where to resume listing. */
  pageToken?: string;
}

export const ListSitesChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta1/sites/{sitesId}/channels" }),
    svc,
  ) as unknown as Schema.Schema<ListSitesChannelsRequest>;

export type ListSitesChannelsResponse = ListChannelsResponse;
export const ListSitesChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListChannelsResponse;

export type ListSitesChannelsError = DefaultErrors;

/** Lists the channels for the specified site. All sites have a default `live` channel. */
export const listSitesChannels: API.PaginatedOperationMethod<
  ListSitesChannelsRequest,
  ListSitesChannelsResponse,
  ListSitesChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSitesChannelsRequest,
  output: ListSitesChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteSitesChannelsRequest {
  /** Required. The fully-qualified resource name for the channel, in the format: sites/SITE_ID/channels/CHANNEL_ID */
  name: string;
}

export const DeleteSitesChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/sites/{sitesId}/channels/{channelsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteSitesChannelsRequest>;

export type DeleteSitesChannelsResponse = Empty;
export const DeleteSitesChannelsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteSitesChannelsError = DefaultErrors;

/** Deletes the specified channel of the specified site. The `live` channel cannot be deleted. */
export const deleteSitesChannels: API.OperationMethod<
  DeleteSitesChannelsRequest,
  DeleteSitesChannelsResponse,
  DeleteSitesChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSitesChannelsRequest,
  output: DeleteSitesChannelsResponse,
  errors: [],
}));

export interface GetSitesChannelsRequest {
  /** Required. The fully-qualified resource name for the channel, in the format: sites/SITE_ID/channels/CHANNEL_ID */
  name: string;
}

export const GetSitesChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/sites/{sitesId}/channels/{channelsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetSitesChannelsRequest>;

export type GetSitesChannelsResponse = Channel;
export const GetSitesChannelsResponse = /*@__PURE__*/ /*#__PURE__*/ Channel;

export type GetSitesChannelsError = DefaultErrors;

/** Retrieves information for the specified channel of the specified site. */
export const getSitesChannels: API.OperationMethod<
  GetSitesChannelsRequest,
  GetSitesChannelsResponse,
  GetSitesChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSitesChannelsRequest,
  output: GetSitesChannelsResponse,
  errors: [],
}));

export interface PatchSitesChannelsRequest {
  /** The fully-qualified resource name for the channel, in the format: sites/ SITE_ID/channels/CHANNEL_ID */
  name: string;
  /** A comma-separated list of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: Channel;
}

export const PatchSitesChannelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Channel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/sites/{sitesId}/channels/{channelsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchSitesChannelsRequest>;

export type PatchSitesChannelsResponse = Channel;
export const PatchSitesChannelsResponse = /*@__PURE__*/ /*#__PURE__*/ Channel;

export type PatchSitesChannelsError = DefaultErrors;

/** Updates information for the specified channel of the specified site. Implicitly creates the channel if it doesn't already exist. */
export const patchSitesChannels: API.OperationMethod<
  PatchSitesChannelsRequest,
  PatchSitesChannelsResponse,
  PatchSitesChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchSitesChannelsRequest,
  output: PatchSitesChannelsResponse,
  errors: [],
}));

export interface CreateSitesChannelsReleasesRequest {
  /** Required. The site or channel to which the release belongs, in either of the following formats: - sites/SITE_ID - sites/SITE_ID/channels/CHANNEL_ID */
  parent: string;
  /** The unique identifier for a version, in the format: sites/SITE_ID/versions/ VERSION_ID The SITE_ID in this version identifier must match the SITE_ID in the `parent` parameter. This query parameter must be empty if the `type` field in the request body is `SITE_DISABLE`. */
  versionName?: string;
  /** Request body */
  body?: Release;
}

export const CreateSitesChannelsReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    versionName: Schema.optional(Schema.String).pipe(
      T.HttpQuery("versionName"),
    ),
    body: Schema.optional(Release).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/sites/{sitesId}/channels/{channelsId}/releases",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateSitesChannelsReleasesRequest>;

export type CreateSitesChannelsReleasesResponse = Release;
export const CreateSitesChannelsReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Release;

export type CreateSitesChannelsReleasesError = DefaultErrors;

/** Creates a new release, which makes the content of the specified version actively display on the appropriate URL(s). */
export const createSitesChannelsReleases: API.OperationMethod<
  CreateSitesChannelsReleasesRequest,
  CreateSitesChannelsReleasesResponse,
  CreateSitesChannelsReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSitesChannelsReleasesRequest,
  output: CreateSitesChannelsReleasesResponse,
  errors: [],
}));

export interface ListSitesChannelsReleasesRequest {
  /** The maximum number of releases to return. The service may return a lower number if fewer releases exist than this maximum number. If unspecified, defaults to 100. */
  pageSize?: number;
  /** A token from a previous call to `releases.list` or `channels.releases.list` that tells the server where to resume listing. */
  pageToken?: string;
  /** Required. The site or channel for which to list releases, in either of the following formats: - sites/SITE_ID - sites/SITE_ID/channels/CHANNEL_ID */
  parent: string;
}

export const ListSitesChannelsReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/sites/{sitesId}/channels/{channelsId}/releases",
    }),
    svc,
  ) as unknown as Schema.Schema<ListSitesChannelsReleasesRequest>;

export type ListSitesChannelsReleasesResponse = ListReleasesResponse;
export const ListSitesChannelsReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListReleasesResponse;

export type ListSitesChannelsReleasesError = DefaultErrors;

/** Lists the releases that have been created for the specified site or channel. When used to list releases for a site, this list includes releases for both the default `live` channel and any active preview channels for the specified site. */
export const listSitesChannelsReleases: API.PaginatedOperationMethod<
  ListSitesChannelsReleasesRequest,
  ListSitesChannelsReleasesResponse,
  ListSitesChannelsReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSitesChannelsReleasesRequest,
  output: ListSitesChannelsReleasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetSitesChannelsReleasesRequest {
  /** Required. The fully-qualified resource name for the Hosting release, in either of the following formats: - sites/SITE_ID/channels/CHANNEL_ID/releases/RELEASE_ID - sites/SITE_ID/releases/RELEASE_ID */
  name: string;
}

export const GetSitesChannelsReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/sites/{sitesId}/channels/{channelsId}/releases/{releasesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetSitesChannelsReleasesRequest>;

export type GetSitesChannelsReleasesResponse = Release;
export const GetSitesChannelsReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Release;

export type GetSitesChannelsReleasesError = DefaultErrors;

/** Gets the specified release for a site or channel. When used to get a release for a site, this can get releases for both the default `live` channel and any active preview channels for the specified site. */
export const getSitesChannelsReleases: API.OperationMethod<
  GetSitesChannelsReleasesRequest,
  GetSitesChannelsReleasesResponse,
  GetSitesChannelsReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSitesChannelsReleasesRequest,
  output: GetSitesChannelsReleasesResponse,
  errors: [],
}));

export interface CreateSitesReleasesRequest {
  /** Required. The site or channel to which the release belongs, in either of the following formats: - sites/SITE_ID - sites/SITE_ID/channels/CHANNEL_ID */
  parent: string;
  /** The unique identifier for a version, in the format: sites/SITE_ID/versions/ VERSION_ID The SITE_ID in this version identifier must match the SITE_ID in the `parent` parameter. This query parameter must be empty if the `type` field in the request body is `SITE_DISABLE`. */
  versionName?: string;
  /** Request body */
  body?: Release;
}

export const CreateSitesReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    versionName: Schema.optional(Schema.String).pipe(
      T.HttpQuery("versionName"),
    ),
    body: Schema.optional(Release).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/sites/{sitesId}/releases",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateSitesReleasesRequest>;

export type CreateSitesReleasesResponse = Release;
export const CreateSitesReleasesResponse = /*@__PURE__*/ /*#__PURE__*/ Release;

export type CreateSitesReleasesError = DefaultErrors;

/** Creates a new release, which makes the content of the specified version actively display on the appropriate URL(s). */
export const createSitesReleases: API.OperationMethod<
  CreateSitesReleasesRequest,
  CreateSitesReleasesResponse,
  CreateSitesReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSitesReleasesRequest,
  output: CreateSitesReleasesResponse,
  errors: [],
}));

export interface ListSitesReleasesRequest {
  /** The maximum number of releases to return. The service may return a lower number if fewer releases exist than this maximum number. If unspecified, defaults to 100. */
  pageSize?: number;
  /** A token from a previous call to `releases.list` or `channels.releases.list` that tells the server where to resume listing. */
  pageToken?: string;
  /** Required. The site or channel for which to list releases, in either of the following formats: - sites/SITE_ID - sites/SITE_ID/channels/CHANNEL_ID */
  parent: string;
}

export const ListSitesReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta1/sites/{sitesId}/releases" }),
    svc,
  ) as unknown as Schema.Schema<ListSitesReleasesRequest>;

export type ListSitesReleasesResponse = ListReleasesResponse;
export const ListSitesReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListReleasesResponse;

export type ListSitesReleasesError = DefaultErrors;

/** Lists the releases that have been created for the specified site or channel. When used to list releases for a site, this list includes releases for both the default `live` channel and any active preview channels for the specified site. */
export const listSitesReleases: API.PaginatedOperationMethod<
  ListSitesReleasesRequest,
  ListSitesReleasesResponse,
  ListSitesReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSitesReleasesRequest,
  output: ListSitesReleasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetSitesReleasesRequest {
  /** Required. The fully-qualified resource name for the Hosting release, in either of the following formats: - sites/SITE_ID/channels/CHANNEL_ID/releases/RELEASE_ID - sites/SITE_ID/releases/RELEASE_ID */
  name: string;
}

export const GetSitesReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/sites/{sitesId}/releases/{releasesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetSitesReleasesRequest>;

export type GetSitesReleasesResponse = Release;
export const GetSitesReleasesResponse = /*@__PURE__*/ /*#__PURE__*/ Release;

export type GetSitesReleasesError = DefaultErrors;

/** Gets the specified release for a site or channel. When used to get a release for a site, this can get releases for both the default `live` channel and any active preview channels for the specified site. */
export const getSitesReleases: API.OperationMethod<
  GetSitesReleasesRequest,
  GetSitesReleasesResponse,
  GetSitesReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSitesReleasesRequest,
  output: GetSitesReleasesResponse,
  errors: [],
}));
