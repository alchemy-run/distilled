// ==========================================================================
// Container Analysis API (containeranalysis v1beta1)
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
  name: "containeranalysis",
  version: "v1beta1",
  rootUrl: "https://containeranalysis.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface KnowledgeBase {
  /** The KB name (generally of the form KB[0-9]+ i.e. KB123456). */
  name?: string;
  /** A link to the KB in the Windows update catalog - https://www.catalog.update.microsoft.com/ */
  url?: string;
}

export const KnowledgeBase: Schema.Schema<KnowledgeBase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "KnowledgeBase",
  }) as any as Schema.Schema<KnowledgeBase>;

export interface WindowsDetail {
  /** The description of the vulnerability. */
  description?: string;
  /** Required. The name of the vulnerability. */
  name?: string;
  /** Required. The CPE URI in [cpe format](https://cpe.mitre.org/specification/) in which the vulnerability manifests. Examples include distro or storage location for vulnerable jar. */
  cpeUri?: string;
  /** Required. The names of the KBs which have hotfixes to mitigate this vulnerability. Note that there may be multiple hotfixes (and thus multiple KBs) that mitigate a given vulnerability. Currently any listed kb's presence is considered a fix. */
  fixingKbs?: Array<KnowledgeBase>;
}

export const WindowsDetail: Schema.Schema<WindowsDetail> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      cpeUri: Schema.optional(Schema.String),
      fixingKbs: Schema.optional(Schema.Array(KnowledgeBase)),
    }),
  ).annotate({
    identifier: "WindowsDetail",
  }) as any as Schema.Schema<WindowsDetail>;

export interface Fingerprint {
  /** Required. The ordered list of v2 blobs that represent a given image. */
  v2Blob?: Array<string>;
  /** Output only. The name of the image's v2 blobs computed via: [bottom] := v2_blobbottom := sha256(v2_blob[N] + " " + v2_name[N+1]) Only the name of the final blob is kept. */
  v2Name?: string;
  /** Required. The layer ID of the final layer in the Docker image's v1 representation. */
  v1Name?: string;
}

export const Fingerprint: Schema.Schema<Fingerprint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      v2Blob: Schema.optional(Schema.Array(Schema.String)),
      v2Name: Schema.optional(Schema.String),
      v1Name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Fingerprint",
  }) as any as Schema.Schema<Fingerprint>;

export interface Layer {
  /** The recovered arguments to the Dockerfile directive. */
  arguments?: string;
  /** Required. The recovered Dockerfile directive used to construct this layer. */
  directive?:
    | "DIRECTIVE_UNSPECIFIED"
    | "MAINTAINER"
    | "RUN"
    | "CMD"
    | "LABEL"
    | "EXPOSE"
    | "ENV"
    | "ADD"
    | "COPY"
    | "ENTRYPOINT"
    | "VOLUME"
    | "USER"
    | "WORKDIR"
    | "ARG"
    | "ONBUILD"
    | "STOPSIGNAL"
    | "HEALTHCHECK"
    | "SHELL"
    | (string & {});
}

export const Layer: Schema.Schema<Layer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      arguments: Schema.optional(Schema.String),
      directive: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Layer" }) as any as Schema.Schema<Layer>;

export interface Derived {
  /** Output only. The number of layers by which this image differs from the associated image basis. */
  distance?: number;
  /** Required. The fingerprint of the derived image. */
  fingerprint?: Fingerprint;
  /** Output only. This contains the base image URL for the derived image occurrence. */
  baseResourceUrl?: string;
  /** This contains layer-specific metadata, if populated it has length "distance" and is ordered with [distance] being the layer immediately following the base image and [1] being the final layer. */
  layerInfo?: Array<Layer>;
}

export const Derived: Schema.Schema<Derived> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      distance: Schema.optional(Schema.Number),
      fingerprint: Schema.optional(Fingerprint),
      baseResourceUrl: Schema.optional(Schema.String),
      layerInfo: Schema.optional(Schema.Array(Layer)),
    }),
  ).annotate({ identifier: "Derived" }) as any as Schema.Schema<Derived>;

export interface GrafeasV1beta1ImageDetails {
  /** Required. Immutable. The child image derived from the base image. */
  derivedImage?: Derived;
}

export const GrafeasV1beta1ImageDetails: Schema.Schema<GrafeasV1beta1ImageDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      derivedImage: Schema.optional(Derived),
    }),
  ).annotate({
    identifier: "GrafeasV1beta1ImageDetails",
  }) as any as Schema.Schema<GrafeasV1beta1ImageDetails>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      code: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface AnalysisCompleted {
  analysisType?: Array<string>;
}

export const AnalysisCompleted: Schema.Schema<AnalysisCompleted> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      analysisType: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AnalysisCompleted",
  }) as any as Schema.Schema<AnalysisCompleted>;

export interface File {
  name?: string;
  digest?: Record<string, string>;
}

export const File: Schema.Schema<File> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface SBOMStatus {
  /** The progress of the SBOM generation. */
  sbomState?: "SBOM_STATE_UNSPECIFIED" | "PENDING" | "COMPLETE" | (string & {});
  /** If there was an error generating an SBOM, this will indicate what that error was. */
  error?: string;
}

export const SBOMStatus: Schema.Schema<SBOMStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sbomState: Schema.optional(Schema.String),
      error: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "SBOMStatus" }) as any as Schema.Schema<SBOMStatus>;

export interface Discovered {
  /** Indicates any errors encountered during analysis of a resource. There could be 0 or more of these errors. */
  analysisError?: Array<Status>;
  /** The last time continuous analysis was done for this resource. Deprecated, do not use. */
  lastAnalysisTime?: string;
  /** The status of discovery for the resource. */
  analysisStatus?:
    | "ANALYSIS_STATUS_UNSPECIFIED"
    | "PENDING"
    | "SCANNING"
    | "FINISHED_SUCCESS"
    | "COMPLETE"
    | "FINISHED_FAILED"
    | "FINISHED_UNSUPPORTED"
    | (string & {});
  analysisCompleted?: AnalysisCompleted;
  /** The last time vulnerability scan results changed. */
  lastVulnerabilityUpdateTime?: string;
  /** Whether the resource is continuously analyzed. */
  continuousAnalysis?:
    | "CONTINUOUS_ANALYSIS_UNSPECIFIED"
    | "ACTIVE"
    | "INACTIVE"
    | (string & {});
  /** Files that make up the resource described by the occurrence. */
  files?: Array<File>;
  /** When an error is encountered this will contain a LocalizedMessage under details to show to the user. The LocalizedMessage is output only and populated by the API. */
  analysisStatusError?: Status;
  /** The status of an SBOM generation. */
  sbomStatus?: SBOMStatus;
  /** The last time this resource was scanned. */
  lastScanTime?: string;
}

export const Discovered: Schema.Schema<Discovered> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      analysisError: Schema.optional(Schema.Array(Status)),
      lastAnalysisTime: Schema.optional(Schema.String),
      analysisStatus: Schema.optional(Schema.String),
      analysisCompleted: Schema.optional(AnalysisCompleted),
      lastVulnerabilityUpdateTime: Schema.optional(Schema.String),
      continuousAnalysis: Schema.optional(Schema.String),
      files: Schema.optional(Schema.Array(File)),
      analysisStatusError: Schema.optional(Status),
      sbomStatus: Schema.optional(SBOMStatus),
      lastScanTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Discovered" }) as any as Schema.Schema<Discovered>;

export interface GrafeasV1beta1DiscoveryDetails {
  /** Required. Analysis status for the discovered resource. */
  discovered?: Discovered;
}

export const GrafeasV1beta1DiscoveryDetails: Schema.Schema<GrafeasV1beta1DiscoveryDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      discovered: Schema.optional(Discovered),
    }),
  ).annotate({
    identifier: "GrafeasV1beta1DiscoveryDetails",
  }) as any as Schema.Schema<GrafeasV1beta1DiscoveryDetails>;

export interface License {
  /** Often a single license can be used to represent the licensing terms. Sometimes it is necessary to include a choice of one or more licenses or some combination of license identifiers. Examples: "LGPL-2.1-only OR MIT", "LGPL-2.1-only AND MIT", "GPL-2.0-or-later WITH Bison-exception-2.2". */
  expression?: string;
  /** Comments */
  comments?: string;
}

export const License: Schema.Schema<License> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      expression: Schema.optional(Schema.String),
      comments: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "License" }) as any as Schema.Schema<License>;

export interface PackageInfoOccurrence {
  /** Output only. A short description of the package */
  summaryDescription?: string;
  /** Provide a place for the SPDX file creator to record any relevant background information or additional comments about the origin of the package */
  sourceInfo?: string;
  /** A place for the SPDX file creator to record any general comments about the package being described */
  comment?: string;
  /** Provide the actual file name of the package, or path of the directory being treated as a package */
  filename?: string;
  /** Output only. Identify the full name of the package as given by the Package Originator */
  title?: string;
  /** Output only. The type of package: OS, MAVEN, GO, GO_STDLIB, etc. */
  packageType?: string;
  /** package or alternative values, if the governing license cannot be determined */
  licenseConcluded?: License;
  /** Uniquely identify any element in an SPDX document which may be referenced by other elements */
  id?: string;
  /** Output only. Identify the version of the package */
  version?: string;
  /** Output only. Provide a place for the SPDX file creator to record a web site that serves as the package's home page */
  homePage?: string;
}

export const PackageInfoOccurrence: Schema.Schema<PackageInfoOccurrence> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      summaryDescription: Schema.optional(Schema.String),
      sourceInfo: Schema.optional(Schema.String),
      comment: Schema.optional(Schema.String),
      filename: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      packageType: Schema.optional(Schema.String),
      licenseConcluded: Schema.optional(License),
      id: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      homePage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PackageInfoOccurrence",
  }) as any as Schema.Schema<PackageInfoOccurrence>;

export interface PgpSignedAttestation {
  /** Type (for example schema) of the attestation payload that was signed. The verifier must ensure that the provided type is one that the verifier supports, and that the attestation payload is a valid instantiation of that type (for example by validating a JSON schema). */
  contentType?:
    | "CONTENT_TYPE_UNSPECIFIED"
    | "SIMPLE_SIGNING_JSON"
    | (string & {});
  /** The cryptographic fingerprint of the key used to generate the signature, as output by, e.g. `gpg --list-keys`. This should be the version 4, full 160-bit fingerprint, expressed as a 40 character hexadecimal string. See https://tools.ietf.org/html/rfc4880#section-12.2 for details. Implementations may choose to acknowledge "LONG", "SHORT", or other abbreviated key IDs, but only the full fingerprint is guaranteed to work. In gpg, the full fingerprint can be retrieved from the `fpr` field returned when calling --list-keys with --with-colons. For example: ``` gpg --with-colons --with-fingerprint --force-v4-certs \ --list-keys attester@example.com tru::1:1513631572:0:3:1:5 pub:...... fpr:::::::::24FF6481B76AC91E66A00AC657A93A81EF3AE6FB: ``` Above, the fingerprint is `24FF6481B76AC91E66A00AC657A93A81EF3AE6FB`. */
  pgpKeyId?: string;
  /** Required. The raw content of the signature, as output by GNU Privacy Guard (GPG) or equivalent. Since this message only supports attached signatures, the payload that was signed must be attached. While the signature format supported is dependent on the verification implementation, currently only ASCII-armored (`--armor` to gpg), non-clearsigned (`--sign` rather than `--clearsign` to gpg) are supported. Concretely, `gpg --sign --armor --output=signature.gpg payload.json` will create the signature content expected in this field in `signature.gpg` for the `payload.json` attestation payload. */
  signature?: string;
}

export const PgpSignedAttestation: Schema.Schema<PgpSignedAttestation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentType: Schema.optional(Schema.String),
      pgpKeyId: Schema.optional(Schema.String),
      signature: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PgpSignedAttestation",
  }) as any as Schema.Schema<PgpSignedAttestation>;

export interface Signature {
  /** The content of the signature, an opaque bytestring. The payload that this signature verifies MUST be unambiguously provided with the Signature during verification. A wrapper message might provide the payload explicitly. Alternatively, a message might have a canonical serialization that can always be unambiguously computed to derive the payload. */
  signature?: string;
  /** The identifier for the public key that verifies this signature. * The `public_key_id` is required. * The `public_key_id` SHOULD be an RFC3986 conformant URI. * When possible, the `public_key_id` SHOULD be an immutable reference, such as a cryptographic digest. Examples of valid `public_key_id`s: OpenPGP V4 public key fingerprint: * "openpgp4fpr:74FAF3B861BDA0870C7B6DEF607E48D2A663AEEA" See https://www.iana.org/assignments/uri-schemes/prov/openpgp4fpr for more details on this scheme. RFC6920 digest-named SubjectPublicKeyInfo (digest of the DER serialization): * "ni:///sha-256;cD9o9Cq6LG3jD0iKXqEi_vdjJGecm_iXkbqVoScViaU" * "nih:///sha-256;703f68f42aba2c6de30f488a5ea122fef76324679c9bf89791ba95a1271589a5" */
  publicKeyId?: string;
}

export const Signature: Schema.Schema<Signature> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      signature: Schema.optional(Schema.String),
      publicKeyId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Signature" }) as any as Schema.Schema<Signature>;

export interface GenericSignedAttestation {
  /** The serialized payload that is verified by one or more `signatures`. The encoding and semantic meaning of this payload must match what is set in `content_type`. */
  serializedPayload?: string;
  /** Type (for example schema) of the attestation payload that was signed. The verifier must ensure that the provided type is one that the verifier supports, and that the attestation payload is a valid instantiation of that type (for example by validating a JSON schema). */
  contentType?:
    | "CONTENT_TYPE_UNSPECIFIED"
    | "SIMPLE_SIGNING_JSON"
    | (string & {});
  /** One or more signatures over `serialized_payload`. Verifier implementations should consider this attestation message verified if at least one `signature` verifies `serialized_payload`. See `Signature` in common.proto for more details on signature structure and verification. */
  signatures?: Array<Signature>;
}

export const GenericSignedAttestation: Schema.Schema<GenericSignedAttestation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      serializedPayload: Schema.optional(Schema.String),
      contentType: Schema.optional(Schema.String),
      signatures: Schema.optional(Schema.Array(Signature)),
    }),
  ).annotate({
    identifier: "GenericSignedAttestation",
  }) as any as Schema.Schema<GenericSignedAttestation>;

export interface Attestation {
  /** A PGP signed attestation. */
  pgpSignedAttestation?: PgpSignedAttestation;
  genericSignedAttestation?: GenericSignedAttestation;
}

export const Attestation: Schema.Schema<Attestation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pgpSignedAttestation: Schema.optional(PgpSignedAttestation),
      genericSignedAttestation: Schema.optional(GenericSignedAttestation),
    }),
  ).annotate({
    identifier: "Attestation",
  }) as any as Schema.Schema<Attestation>;

export interface Details {
  /** Required. Attestation for the resource. */
  attestation?: Attestation;
}

export const Details: Schema.Schema<Details> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attestation: Schema.optional(Attestation),
    }),
  ).annotate({ identifier: "Details" }) as any as Schema.Schema<Details>;

export interface GrafeasV1beta1IntotoSignature {
  sig?: string;
  keyid?: string;
}

export const GrafeasV1beta1IntotoSignature: Schema.Schema<GrafeasV1beta1IntotoSignature> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sig: Schema.optional(Schema.String),
      keyid: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GrafeasV1beta1IntotoSignature",
  }) as any as Schema.Schema<GrafeasV1beta1IntotoSignature>;

export interface ArtifactHashes {
  sha256?: string;
}

export const ArtifactHashes: Schema.Schema<ArtifactHashes> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sha256: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ArtifactHashes",
  }) as any as Schema.Schema<ArtifactHashes>;

export interface GrafeasV1beta1IntotoArtifact {
  resourceUri?: string;
  hashes?: ArtifactHashes;
}

export const GrafeasV1beta1IntotoArtifact: Schema.Schema<GrafeasV1beta1IntotoArtifact> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceUri: Schema.optional(Schema.String),
      hashes: Schema.optional(ArtifactHashes),
    }),
  ).annotate({
    identifier: "GrafeasV1beta1IntotoArtifact",
  }) as any as Schema.Schema<GrafeasV1beta1IntotoArtifact>;

export interface Environment {
  customValues?: Record<string, string>;
}

export const Environment: Schema.Schema<Environment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customValues: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "Environment",
  }) as any as Schema.Schema<Environment>;

export interface ByProducts {
  customValues?: Record<string, string>;
}

export const ByProducts: Schema.Schema<ByProducts> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customValues: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({ identifier: "ByProducts" }) as any as Schema.Schema<ByProducts>;

export interface Link {
  /** Products are the supply chain artifacts generated as a result of the step. The structure is identical to that of materials. */
  products?: Array<GrafeasV1beta1IntotoArtifact>;
  /** This is a field that can be used to capture information about the environment. It is suggested for this field to contain information that details environment variables, filesystem information, and the present working directory. The recommended structure of this field is: "environment": { "custom_values": { "variables": "", "filesystem": "", "workdir": "", "": "..." } } */
  environment?: Environment;
  /** ByProducts are data generated as part of a software supply chain step, but are not the actual result of the step. */
  byproducts?: ByProducts;
  /** This field contains the full command executed for the step. This can also be empty if links are generated for operations that aren't directly mapped to a specific command. Each term in the command is an independent string in the list. An example of a command in the in-toto metadata field is: "command": ["git", "clone", "https://github.com/in-toto/demo-project.git"] */
  command?: Array<string>;
  /** Materials are the supply chain artifacts that go into the step and are used for the operation performed. The key of the map is the path of the artifact and the structure contains the recorded hash information. An example is: "materials": [ { "resource_uri": "foo/bar", "hashes": { "sha256": "ebebf...", : } } ] */
  materials?: Array<GrafeasV1beta1IntotoArtifact>;
}

export const Link: Schema.Schema<Link> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      products: Schema.optional(Schema.Array(GrafeasV1beta1IntotoArtifact)),
      environment: Schema.optional(Environment),
      byproducts: Schema.optional(ByProducts),
      command: Schema.optional(Schema.Array(Schema.String)),
      materials: Schema.optional(Schema.Array(GrafeasV1beta1IntotoArtifact)),
    }),
  ).annotate({ identifier: "Link" }) as any as Schema.Schema<Link>;

export interface GrafeasV1beta1IntotoDetails {
  signatures?: Array<GrafeasV1beta1IntotoSignature>;
  signed?: Link;
}

export const GrafeasV1beta1IntotoDetails: Schema.Schema<GrafeasV1beta1IntotoDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      signatures: Schema.optional(Schema.Array(GrafeasV1beta1IntotoSignature)),
      signed: Schema.optional(Link),
    }),
  ).annotate({
    identifier: "GrafeasV1beta1IntotoDetails",
  }) as any as Schema.Schema<GrafeasV1beta1IntotoDetails>;

export interface Hash {
  /** Required. The hash value. */
  value?: string;
  /** Required. The type of hash that was performed. */
  type?:
    | "HASH_TYPE_UNSPECIFIED"
    | "SHA256"
    | "GO_MODULE_H1"
    | "SHA512"
    | "DIRSUM_SHA256"
    | (string & {});
}

export const Hash: Schema.Schema<Hash> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Hash" }) as any as Schema.Schema<Hash>;

export interface Resource {
  /** Deprecated, do not use. Use uri instead. The hash of the resource content. For example, the Docker digest. */
  contentHash?: Hash;
  /** Deprecated, do not use. Use uri instead. The name of the resource. For example, the name of a Docker image - "Debian". */
  name?: string;
  /** Required. The unique URI of the resource. For example, `https://gcr.io/project/image@sha256:foo` for a Docker image. */
  uri?: string;
}

export const Resource: Schema.Schema<Resource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentHash: Schema.optional(Hash),
      name: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Resource" }) as any as Schema.Schema<Resource>;

export interface RelationshipOccurrence {
  /** Also referred to as SPDXRef-A The source SPDX element (file, package, etc) */
  source?: string;
  /** Output only. The type of relationship between the source and target SPDX elements */
  type?:
    | "RELATIONSHIP_TYPE_UNSPECIFIED"
    | "DESCRIBES"
    | "DESCRIBED_BY"
    | "CONTAINS"
    | "CONTAINED_BY"
    | "DEPENDS_ON"
    | "DEPENDENCY_OF"
    | "DEPENDENCY_MANIFEST_OF"
    | "BUILD_DEPENDENCY_OF"
    | "DEV_DEPENDENCY_OF"
    | "OPTIONAL_DEPENDENCY_OF"
    | "PROVIDED_DEPENDENCY_OF"
    | "TEST_DEPENDENCY_OF"
    | "RUNTIME_DEPENDENCY_OF"
    | "EXAMPLE_OF"
    | "GENERATES"
    | "GENERATED_FROM"
    | "ANCESTOR_OF"
    | "DESCENDANT_OF"
    | "VARIANT_OF"
    | "DISTRIBUTION_ARTIFACT"
    | "PATCH_FOR"
    | "PATCH_APPLIED"
    | "COPY_OF"
    | "FILE_ADDED"
    | "FILE_DELETED"
    | "FILE_MODIFIED"
    | "EXPANDED_FROM_ARCHIVE"
    | "DYNAMIC_LINK"
    | "STATIC_LINK"
    | "DATA_FILE_OF"
    | "TEST_CASE_OF"
    | "BUILD_TOOL_OF"
    | "DEV_TOOL_OF"
    | "TEST_OF"
    | "TEST_TOOL_OF"
    | "DOCUMENTATION_OF"
    | "OPTIONAL_COMPONENT_OF"
    | "METAFILE_OF"
    | "PACKAGE_OF"
    | "AMENDS"
    | "PREREQUISITE_FOR"
    | "HAS_PREREQUISITE"
    | "OTHER"
    | (string & {});
  /** Also referred to as SPDXRef-B The target SPDC element (file, package, etc) In cases where there are "known unknowns", the use of the keyword NOASSERTION can be used The keywords NONE can be used to indicate that an SPDX element (package/file/snippet) has no other elements connected by some relationship to it */
  target?: string;
  /** A place for the SPDX file creator to record any general comments about the relationship */
  comment?: string;
}

export const RelationshipOccurrence: Schema.Schema<RelationshipOccurrence> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      source: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      comment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RelationshipOccurrence",
  }) as any as Schema.Schema<RelationshipOccurrence>;

export interface DocumentOccurrence {
  /** A field for creators of the SPDX file to provide general comments about the creation of the SPDX file or any other relevant comment not included in the other fields */
  creatorComment?: string;
  /** Provide an SPDX document specific namespace as a unique absolute Uniform Resource Identifier (URI) as specified in RFC-3986, with the exception of the ‘#’ delimiter */
  namespace?: string;
  /** Identify any external SPDX documents referenced within this SPDX document */
  externalDocumentRefs?: Array<string>;
  /** Identify when the SPDX file was originally created. The date is to be specified according to combined date and time in UTC format as specified in ISO 8601 standard */
  createTime?: string;
  /** Identify who (or what, in the case of a tool) created the SPDX file. If the SPDX file was created by an individual, indicate the person's name */
  creators?: Array<string>;
  /** Identify the current SPDX document which may be referenced in relationships by other files, packages internally and documents externally */
  id?: string;
  /** Identify name of this document as designated by creator */
  title?: string;
  /** A field for creators of the SPDX file content to provide comments to the consumers of the SPDX document */
  documentComment?: string;
  /** A field for creators of the SPDX file to provide the version of the SPDX License List used when the SPDX file was created */
  licenseListVersion?: string;
}

export const DocumentOccurrence: Schema.Schema<DocumentOccurrence> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      creatorComment: Schema.optional(Schema.String),
      namespace: Schema.optional(Schema.String),
      externalDocumentRefs: Schema.optional(Schema.Array(Schema.String)),
      createTime: Schema.optional(Schema.String),
      creators: Schema.optional(Schema.Array(Schema.String)),
      id: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      documentComment: Schema.optional(Schema.String),
      licenseListVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DocumentOccurrence",
  }) as any as Schema.Schema<DocumentOccurrence>;

export interface Deployment {
  /** Required. Beginning of the lifetime of this deployment. */
  deployTime?: string;
  /** Output only. Resource URI for the artifact being deployed taken from the deployable field with the same name. */
  resourceUri?: Array<string>;
  /** End of the lifetime of this deployment. */
  undeployTime?: string;
  /** Configuration used to create this deployment. */
  config?: string;
  /** Identity of the user that triggered this deployment. */
  userEmail?: string;
  /** Address of the runtime element hosting this deployment. */
  address?: string;
  /** Platform hosting this deployment. */
  platform?: "PLATFORM_UNSPECIFIED" | "GKE" | "FLEX" | "CUSTOM" | (string & {});
}

export const Deployment: Schema.Schema<Deployment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deployTime: Schema.optional(Schema.String),
      resourceUri: Schema.optional(Schema.Array(Schema.String)),
      undeployTime: Schema.optional(Schema.String),
      config: Schema.optional(Schema.String),
      userEmail: Schema.optional(Schema.String),
      address: Schema.optional(Schema.String),
      platform: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Deployment" }) as any as Schema.Schema<Deployment>;

export interface GrafeasV1beta1DeploymentDetails {
  /** Required. Deployment history for the resource. */
  deployment?: Deployment;
}

export const GrafeasV1beta1DeploymentDetails: Schema.Schema<GrafeasV1beta1DeploymentDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deployment: Schema.optional(Deployment),
    }),
  ).annotate({
    identifier: "GrafeasV1beta1DeploymentDetails",
  }) as any as Schema.Schema<GrafeasV1beta1DeploymentDetails>;

export interface EnvelopeSignature {
  sig?: string;
  keyid?: string;
}

export const EnvelopeSignature: Schema.Schema<EnvelopeSignature> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sig: Schema.optional(Schema.String),
      keyid: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EnvelopeSignature",
  }) as any as Schema.Schema<EnvelopeSignature>;

export interface Envelope {
  signatures?: Array<EnvelopeSignature>;
  payload?: string;
  payloadType?: string;
}

export const Envelope: Schema.Schema<Envelope> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      signatures: Schema.optional(Schema.Array(EnvelopeSignature)),
      payload: Schema.optional(Schema.String),
      payloadType: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Envelope" }) as any as Schema.Schema<Envelope>;

export interface SbomReferenceIntotoPredicate {
  /** The location of the SBOM. */
  location?: string;
  /** The person or system referring this predicate to the consumer. */
  referrerId?: string;
  /** A map of algorithm to digest of the contents of the SBOM. */
  digest?: Record<string, string>;
  /** The mime type of the SBOM. */
  mimeType?: string;
}

export const SbomReferenceIntotoPredicate: Schema.Schema<SbomReferenceIntotoPredicate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      location: Schema.optional(Schema.String),
      referrerId: Schema.optional(Schema.String),
      digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      mimeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SbomReferenceIntotoPredicate",
  }) as any as Schema.Schema<SbomReferenceIntotoPredicate>;

export interface Subject {
  /** Identifier to distinguish this artifact from others within the subject. */
  name?: string;
  /** `"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet */
  digest?: Record<string, string>;
}

export const Subject: Schema.Schema<Subject> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "Subject" }) as any as Schema.Schema<Subject>;

export interface SbomReferenceIntotoPayload {
  /** Identifier for the schema of the Statement. */
  _type?: string;
  /** Additional parameters of the Predicate. Includes the actual data about the SBOM. */
  predicate?: SbomReferenceIntotoPredicate;
  /** URI identifying the type of the Predicate. */
  predicateType?: string;
  /** Set of software artifacts that the attestation applies to. Each element represents a single software artifact. */
  subject?: Array<Subject>;
}

export const SbomReferenceIntotoPayload: Schema.Schema<SbomReferenceIntotoPayload> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      _type: Schema.optional(Schema.String),
      predicate: Schema.optional(SbomReferenceIntotoPredicate),
      predicateType: Schema.optional(Schema.String),
      subject: Schema.optional(Schema.Array(Subject)),
    }),
  ).annotate({
    identifier: "SbomReferenceIntotoPayload",
  }) as any as Schema.Schema<SbomReferenceIntotoPayload>;

export interface SBOMReferenceOccurrence {
  /** The signatures over the payload. */
  signatures?: Array<EnvelopeSignature>;
  /** The kind of payload that SbomReferenceIntotoPayload takes. Since it's in the intoto format, this value is expected to be 'application/vnd.in-toto+json'. */
  payloadType?: string;
  /** The actual payload that contains the SBOM reference data. */
  payload?: SbomReferenceIntotoPayload;
}

export const SBOMReferenceOccurrence: Schema.Schema<SBOMReferenceOccurrence> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      signatures: Schema.optional(Schema.Array(EnvelopeSignature)),
      payloadType: Schema.optional(Schema.String),
      payload: Schema.optional(SbomReferenceIntotoPayload),
    }),
  ).annotate({
    identifier: "SBOMReferenceOccurrence",
  }) as any as Schema.Schema<SBOMReferenceOccurrence>;

export interface FileOccurrence {
  /** This field contains the license the SPDX file creator has concluded as governing the file or alternative values if the governing license cannot be determined */
  licenseConcluded?: License;
  /** This field provides a place for the SPDX data creator to record, at the file level, acknowledgements that may be needed to be communicated in some contexts */
  attributions?: Array<string>;
  /** This field provides a place for the SPDX file creator to record any general comments about the file */
  comment?: string;
  /** This field provides a place for the SPDX file creator to record file contributors */
  contributors?: Array<string>;
  /** Identify the copyright holder of the file, as well as any dates present */
  copyright?: string;
  /** This field contains the license information actually found in the file, if any */
  filesLicenseInfo?: Array<string>;
  /** Uniquely identify any element in an SPDX document which may be referenced by other elements */
  id?: string;
  /** This field provides a place for the SPDX file creator to record license notices or other such related notices found in the file */
  notice?: string;
}

export const FileOccurrence: Schema.Schema<FileOccurrence> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      licenseConcluded: Schema.optional(License),
      attributions: Schema.optional(Schema.Array(Schema.String)),
      comment: Schema.optional(Schema.String),
      contributors: Schema.optional(Schema.Array(Schema.String)),
      copyright: Schema.optional(Schema.String),
      filesLicenseInfo: Schema.optional(Schema.Array(Schema.String)),
      id: Schema.optional(Schema.String),
      notice: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FileOccurrence",
  }) as any as Schema.Schema<FileOccurrence>;

export interface Justification {
  /** The justification type for this vulnerability. */
  justificationType?:
    | "JUSTIFICATION_TYPE_UNSPECIFIED"
    | "COMPONENT_NOT_PRESENT"
    | "VULNERABLE_CODE_NOT_PRESENT"
    | "VULNERABLE_CODE_NOT_IN_EXECUTE_PATH"
    | "VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY"
    | "INLINE_MITIGATIONS_ALREADY_EXIST"
    | (string & {});
  /** Additional details on why this justification was chosen. */
  details?: string;
}

export const Justification: Schema.Schema<Justification> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      justificationType: Schema.optional(Schema.String),
      details: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Justification",
  }) as any as Schema.Schema<Justification>;

export interface RelatedUrl {
  /** Label to describe usage of the URL. */
  label?: string;
  /** Specific URL associated with the resource. */
  url?: string;
}

export const RelatedUrl: Schema.Schema<RelatedUrl> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      label: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "RelatedUrl" }) as any as Schema.Schema<RelatedUrl>;

export interface Remediation {
  /** Contains a comprehensive human-readable discussion of the remediation. */
  details?: string;
  /** The type of remediation that can be applied. */
  remediationType?:
    | "REMEDIATION_TYPE_UNSPECIFIED"
    | "MITIGATION"
    | "NO_FIX_PLANNED"
    | "NONE_AVAILABLE"
    | "VENDOR_FIX"
    | "WORKAROUND"
    | (string & {});
  /** Contains the URL where to obtain the remediation. */
  remediationUri?: RelatedUrl;
}

export const Remediation: Schema.Schema<Remediation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(Schema.String),
      remediationType: Schema.optional(Schema.String),
      remediationUri: Schema.optional(RelatedUrl),
    }),
  ).annotate({
    identifier: "Remediation",
  }) as any as Schema.Schema<Remediation>;

export interface VexAssessment {
  /** Contains information about the impact of this vulnerability, this will change with time. */
  impacts?: Array<string>;
  /** Justification provides the justification when the state of the assessment if NOT_AFFECTED. */
  justification?: Justification;
  /** The VulnerabilityAssessment note from which this VexAssessment was generated. This will be of the form: `projects/[PROJECT_ID]/notes/[NOTE_ID]`. */
  noteName?: string;
  /** The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc. */
  vulnerabilityId?: string;
  /** Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. Deprecated: Use vulnerability_id instead to denote CVEs. */
  cve?: string;
  /** Provides the state of this Vulnerability assessment. */
  state?:
    | "STATE_UNSPECIFIED"
    | "AFFECTED"
    | "NOT_AFFECTED"
    | "FIXED"
    | "UNDER_INVESTIGATION"
    | (string & {});
  /** Specifies details on how to handle (and presumably, fix) a vulnerability. */
  remediations?: Array<Remediation>;
  /** Holds a list of references associated with this vulnerability item and assessment. */
  relatedUris?: Array<RelatedUrl>;
}

export const VexAssessment: Schema.Schema<VexAssessment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      impacts: Schema.optional(Schema.Array(Schema.String)),
      justification: Schema.optional(Justification),
      noteName: Schema.optional(Schema.String),
      vulnerabilityId: Schema.optional(Schema.String),
      cve: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      remediations: Schema.optional(Schema.Array(Remediation)),
      relatedUris: Schema.optional(Schema.Array(RelatedUrl)),
    }),
  ).annotate({
    identifier: "VexAssessment",
  }) as any as Schema.Schema<VexAssessment>;

export interface CVSS {
  /** Defined in CVSS v3, CVSS v2 */
  attackComplexity?:
    | "ATTACK_COMPLEXITY_UNSPECIFIED"
    | "ATTACK_COMPLEXITY_LOW"
    | "ATTACK_COMPLEXITY_HIGH"
    | "ATTACK_COMPLEXITY_MEDIUM"
    | (string & {});
  /** The base score is a function of the base metric scores. */
  baseScore?: number;
  /** Defined in CVSS v3, CVSS v2 */
  integrityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | "IMPACT_PARTIAL"
    | "IMPACT_COMPLETE"
    | (string & {});
  /** Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments. Defined in CVSS v3, CVSS v2 */
  attackVector?:
    | "ATTACK_VECTOR_UNSPECIFIED"
    | "ATTACK_VECTOR_NETWORK"
    | "ATTACK_VECTOR_ADJACENT"
    | "ATTACK_VECTOR_LOCAL"
    | "ATTACK_VECTOR_PHYSICAL"
    | (string & {});
  /** Defined in CVSS v3, CVSS v2 */
  confidentialityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | "IMPACT_PARTIAL"
    | "IMPACT_COMPLETE"
    | (string & {});
  impactScore?: number;
  /** Defined in CVSS v2 */
  authentication?:
    | "AUTHENTICATION_UNSPECIFIED"
    | "AUTHENTICATION_MULTIPLE"
    | "AUTHENTICATION_SINGLE"
    | "AUTHENTICATION_NONE"
    | (string & {});
  /** Defined in CVSS v3 */
  scope?:
    | "SCOPE_UNSPECIFIED"
    | "SCOPE_UNCHANGED"
    | "SCOPE_CHANGED"
    | (string & {});
  exploitabilityScore?: number;
  /** Defined in CVSS v3, CVSS v2 */
  availabilityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | "IMPACT_PARTIAL"
    | "IMPACT_COMPLETE"
    | (string & {});
  /** Defined in CVSS v3 */
  userInteraction?:
    | "USER_INTERACTION_UNSPECIFIED"
    | "USER_INTERACTION_NONE"
    | "USER_INTERACTION_REQUIRED"
    | (string & {});
  /** Defined in CVSS v3 */
  privilegesRequired?:
    | "PRIVILEGES_REQUIRED_UNSPECIFIED"
    | "PRIVILEGES_REQUIRED_NONE"
    | "PRIVILEGES_REQUIRED_LOW"
    | "PRIVILEGES_REQUIRED_HIGH"
    | (string & {});
}

export const CVSS: Schema.Schema<CVSS> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attackComplexity: Schema.optional(Schema.String),
      baseScore: Schema.optional(Schema.Number),
      integrityImpact: Schema.optional(Schema.String),
      attackVector: Schema.optional(Schema.String),
      confidentialityImpact: Schema.optional(Schema.String),
      impactScore: Schema.optional(Schema.Number),
      authentication: Schema.optional(Schema.String),
      scope: Schema.optional(Schema.String),
      exploitabilityScore: Schema.optional(Schema.Number),
      availabilityImpact: Schema.optional(Schema.String),
      userInteraction: Schema.optional(Schema.String),
      privilegesRequired: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "CVSS" }) as any as Schema.Schema<CVSS>;

export interface Version {
  /** Used to correct mistakes in the version numbering scheme. */
  epoch?: number;
  /** The iteration of the package build from the above version. */
  revision?: string;
  /** Required only when version kind is NORMAL. The main part of the version name. */
  name?: string;
  /** Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range. */
  inclusive?: boolean;
  /** Required. Distinguishes between sentinel MIN/MAX versions and normal versions. */
  kind?:
    | "VERSION_KIND_UNSPECIFIED"
    | "NORMAL"
    | "MINIMUM"
    | "MAXIMUM"
    | (string & {});
}

export const Version: Schema.Schema<Version> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      epoch: Schema.optional(Schema.Number),
      revision: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      inclusive: Schema.optional(Schema.Boolean),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface VulnerabilityLocation {
  /** Required. The CPE URI in [cpe format](https://cpe.mitre.org/specification/) format. Examples include distro or storage location for vulnerable jar. */
  cpeUri?: string;
  /** Required. The version of the package being described. */
  version?: Version;
  /** Required. The package being described. */
  package?: string;
}

export const VulnerabilityLocation: Schema.Schema<VulnerabilityLocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cpeUri: Schema.optional(Schema.String),
      version: Schema.optional(Version),
      package: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VulnerabilityLocation",
  }) as any as Schema.Schema<VulnerabilityLocation>;

export interface PackageIssue {
  /** The type of package (e.g. OS, MAVEN, GO). */
  packageType?: string;
  /** Output only. The distro or language system assigned severity for this vulnerability when that is available and note provider assigned severity when it is not available. */
  effectiveSeverity?:
    | "SEVERITY_UNSPECIFIED"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
  /** Required. The location of the vulnerability. */
  affectedLocation?: VulnerabilityLocation;
  /** Deprecated, use Details.effective_severity instead The severity (e.g., distro assigned severity) for this vulnerability. */
  severityName?: string;
  /** The location of the available fix for vulnerability. */
  fixedLocation?: VulnerabilityLocation;
}

export const PackageIssue: Schema.Schema<PackageIssue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      packageType: Schema.optional(Schema.String),
      effectiveSeverity: Schema.optional(Schema.String),
      affectedLocation: Schema.optional(VulnerabilityLocation),
      severityName: Schema.optional(Schema.String),
      fixedLocation: Schema.optional(VulnerabilityLocation),
    }),
  ).annotate({
    identifier: "PackageIssue",
  }) as any as Schema.Schema<PackageIssue>;

export interface GrafeasV1beta1VulnerabilityDetails {
  vexAssessment?: VexAssessment;
  /** Output only. A one sentence description of this vulnerability. */
  shortDescription?: string;
  /** Output only. URLs related to this vulnerability. */
  relatedUrls?: Array<RelatedUrl>;
  /** The type of package; whether native or non native(ruby gems, node.js packages etc) */
  type?: string;
  /** The cvss v2 score for the vulnerability. */
  cvssV2?: CVSS;
  /** Output only. CVSS version used to populate cvss_score and severity. */
  cvssVersion?:
    | "CVSS_VERSION_UNSPECIFIED"
    | "CVSS_VERSION_2"
    | "CVSS_VERSION_3"
    | (string & {});
  /** Output only. The note provider assigned Severity of the vulnerability. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
  /** The cvss v3 score for the vulnerability. */
  cvssV3?: CVSS;
  /** The distro assigned severity for this vulnerability when it is available, and note provider assigned severity when distro has not yet assigned a severity for this vulnerability. When there are multiple PackageIssues for this vulnerability, they can have different effective severities because some might be provided by the distro while others are provided by the language ecosystem for a language pack. For this reason, it is advised to use the effective severity on the PackageIssue level. In the case where multiple PackageIssues have differing effective severities, this field should be the highest severity for any of the PackageIssues. */
  effectiveSeverity?:
    | "SEVERITY_UNSPECIFIED"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
  /** Output only. A detailed description of this vulnerability. */
  longDescription?: string;
  /** Output only. The CVSS score of this vulnerability. CVSS score is on a scale of 0-10 where 0 indicates low severity and 10 indicates high severity. */
  cvssScore?: number;
  /** Required. The set of affected locations and their fixes (if available) within the associated resource. */
  packageIssue?: Array<PackageIssue>;
  /** Occurrence-specific extra details about the vulnerability. */
  extraDetails?: string;
}

export const GrafeasV1beta1VulnerabilityDetails: Schema.Schema<GrafeasV1beta1VulnerabilityDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vexAssessment: Schema.optional(VexAssessment),
      shortDescription: Schema.optional(Schema.String),
      relatedUrls: Schema.optional(Schema.Array(RelatedUrl)),
      type: Schema.optional(Schema.String),
      cvssV2: Schema.optional(CVSS),
      cvssVersion: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.String),
      cvssV3: Schema.optional(CVSS),
      effectiveSeverity: Schema.optional(Schema.String),
      longDescription: Schema.optional(Schema.String),
      cvssScore: Schema.optional(Schema.Number),
      packageIssue: Schema.optional(Schema.Array(PackageIssue)),
      extraDetails: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GrafeasV1beta1VulnerabilityDetails",
  }) as any as Schema.Schema<GrafeasV1beta1VulnerabilityDetails>;

export interface FileLocation {
  /** For jars that are contained inside .war files, this filepath can indicate the path to war file combined with the path to jar file. */
  filePath?: string;
}

export const FileLocation: Schema.Schema<FileLocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      filePath: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FileLocation",
  }) as any as Schema.Schema<FileLocation>;

export interface SecretLocation {
  /** The secret is found from a file. */
  fileLocation?: FileLocation;
}

export const SecretLocation: Schema.Schema<SecretLocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileLocation: Schema.optional(FileLocation),
    }),
  ).annotate({
    identifier: "SecretLocation",
  }) as any as Schema.Schema<SecretLocation>;

export interface SecretStatus {
  /** Optional. Optional message about the status code. */
  message?: string;
  /** Optional. The time the secret status was last updated. */
  updateTime?: string;
  /** Optional. The status of the secret. */
  status?:
    | "STATUS_UNSPECIFIED"
    | "UNKNOWN"
    | "VALID"
    | "INVALID"
    | (string & {});
}

export const SecretStatus: Schema.Schema<SecretStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecretStatus",
  }) as any as Schema.Schema<SecretStatus>;

export interface SecretOccurrence {
  /** Required. Type of secret. */
  kind?:
    | "SECRET_KIND_UNSPECIFIED"
    | "SECRET_KIND_UNKNOWN"
    | "SECRET_KIND_GCP_SERVICE_ACCOUNT_KEY"
    | "SECRET_KIND_GCP_API_KEY"
    | "SECRET_KIND_GCP_OAUTH2_CLIENT_CREDENTIALS"
    | "SECRET_KIND_GCP_OAUTH2_ACCESS_TOKEN"
    | "SECRET_KIND_ANTHROPIC_ADMIN_API_KEY"
    | "SECRET_KIND_ANTHROPIC_API_KEY"
    | "SECRET_KIND_AZURE_ACCESS_TOKEN"
    | "SECRET_KIND_AZURE_IDENTITY_TOKEN"
    | "SECRET_KIND_DOCKER_HUB_PERSONAL_ACCESS_TOKEN"
    | "SECRET_KIND_GITHUB_APP_REFRESH_TOKEN"
    | "SECRET_KIND_GITHUB_APP_SERVER_TO_SERVER_TOKEN"
    | "SECRET_KIND_GITHUB_APP_USER_TO_SERVER_TOKEN"
    | "SECRET_KIND_GITHUB_CLASSIC_PERSONAL_ACCESS_TOKEN"
    | "SECRET_KIND_GITHUB_FINE_GRAINED_PERSONAL_ACCESS_TOKEN"
    | "SECRET_KIND_GITHUB_OAUTH_TOKEN"
    | "SECRET_KIND_HUGGINGFACE_API_KEY"
    | "SECRET_KIND_OPENAI_API_KEY"
    | "SECRET_KIND_PERPLEXITY_API_KEY"
    | "SECRET_KIND_STRIPE_SECRET_KEY"
    | "SECRET_KIND_STRIPE_RESTRICTED_KEY"
    | "SECRET_KIND_STRIPE_WEBHOOK_SECRET"
    | (string & {});
  /** Optional. Locations where the secret is detected. */
  locations?: Array<SecretLocation>;
  /** Optional. Status of the secret. */
  statuses?: Array<SecretStatus>;
}

export const SecretOccurrence: Schema.Schema<SecretOccurrence> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      locations: Schema.optional(Schema.Array(SecretLocation)),
      statuses: Schema.optional(Schema.Array(SecretStatus)),
    }),
  ).annotate({
    identifier: "SecretOccurrence",
  }) as any as Schema.Schema<SecretOccurrence>;

export interface Artifact {
  /** Artifact ID, if any; for container images, this will be a URL by digest like `gcr.io/projectID/imagename@sha256:123456`. */
  id?: string;
  /** Hash or checksum value of a binary, or Docker Registry 2.0 digest of a container. */
  checksum?: string;
  /** Related artifact names. This may be the path to a binary or jar file, or in the case of a container build, the name used to push the container image to Google Container Registry, as presented to `docker push`. Note that a single Artifact ID can have multiple names, for example if two tags are applied to one image. */
  names?: Array<string>;
}

export const Artifact: Schema.Schema<Artifact> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      checksum: Schema.optional(Schema.String),
      names: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "Artifact" }) as any as Schema.Schema<Artifact>;

export interface GitSourceContext {
  /** Git repository URL. */
  url?: string;
  /** Git commit hash. */
  revisionId?: string;
}

export const GitSourceContext: Schema.Schema<GitSourceContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      revisionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GitSourceContext",
  }) as any as Schema.Schema<GitSourceContext>;

export interface AliasContext {
  /** The alias name. */
  name?: string;
  /** The alias kind. */
  kind?: "KIND_UNSPECIFIED" | "FIXED" | "MOVABLE" | "OTHER" | (string & {});
}

export const AliasContext: Schema.Schema<AliasContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AliasContext",
  }) as any as Schema.Schema<AliasContext>;

export interface ProjectRepoId {
  /** The name of the repo. Leave empty for the default repo. */
  repoName?: string;
  /** The ID of the project. */
  projectId?: string;
}

export const ProjectRepoId: Schema.Schema<ProjectRepoId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repoName: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProjectRepoId",
  }) as any as Schema.Schema<ProjectRepoId>;

export interface RepoId {
  /** A server-assigned, globally unique identifier. */
  uid?: string;
  /** A combination of a project ID and a repo name. */
  projectRepoId?: ProjectRepoId;
}

export const RepoId: Schema.Schema<RepoId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uid: Schema.optional(Schema.String),
      projectRepoId: Schema.optional(ProjectRepoId),
    }),
  ).annotate({ identifier: "RepoId" }) as any as Schema.Schema<RepoId>;

export interface CloudRepoSourceContext {
  /** A revision ID. */
  revisionId?: string;
  /** An alias, which may be a branch or tag. */
  aliasContext?: AliasContext;
  /** The ID of the repo. */
  repoId?: RepoId;
}

export const CloudRepoSourceContext: Schema.Schema<CloudRepoSourceContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      revisionId: Schema.optional(Schema.String),
      aliasContext: Schema.optional(AliasContext),
      repoId: Schema.optional(RepoId),
    }),
  ).annotate({
    identifier: "CloudRepoSourceContext",
  }) as any as Schema.Schema<CloudRepoSourceContext>;

export interface GerritSourceContext {
  /** A revision (commit) ID. */
  revisionId?: string;
  /** An alias, which may be a branch or tag. */
  aliasContext?: AliasContext;
  /** The full project name within the host. Projects may be nested, so "project/subproject" is a valid project name. The "repo name" is the hostURI/project. */
  gerritProject?: string;
  /** The URI of a running Gerrit instance. */
  hostUri?: string;
}

export const GerritSourceContext: Schema.Schema<GerritSourceContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      revisionId: Schema.optional(Schema.String),
      aliasContext: Schema.optional(AliasContext),
      gerritProject: Schema.optional(Schema.String),
      hostUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GerritSourceContext",
  }) as any as Schema.Schema<GerritSourceContext>;

export interface SourceContext {
  /** A SourceContext referring to any third party Git repo (e.g., GitHub). */
  git?: GitSourceContext;
  /** A SourceContext referring to a revision in a Google Cloud Source Repo. */
  cloudRepo?: CloudRepoSourceContext;
  /** A SourceContext referring to a Gerrit project. */
  gerrit?: GerritSourceContext;
  /** Labels with user defined metadata. */
  labels?: Record<string, string>;
}

export const SourceContext: Schema.Schema<SourceContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      git: Schema.optional(GitSourceContext),
      cloudRepo: Schema.optional(CloudRepoSourceContext),
      gerrit: Schema.optional(GerritSourceContext),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "SourceContext",
  }) as any as Schema.Schema<SourceContext>;

export interface FileHashes {
  /** Required. Collection of file hashes. */
  fileHash?: Array<Hash>;
}

export const FileHashes: Schema.Schema<FileHashes> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileHash: Schema.optional(Schema.Array(Hash)),
    }),
  ).annotate({ identifier: "FileHashes" }) as any as Schema.Schema<FileHashes>;

export interface Source {
  /** If provided, some of the source code used for the build may be found in these locations, in the case where the source repository had multiple remotes or submodules. This list will not include the context specified in the context field. */
  additionalContexts?: Array<SourceContext>;
  /** If provided, the source code used for the build came from this location. */
  context?: SourceContext;
  /** If provided, the input binary artifacts for the build came from this location. */
  artifactStorageSourceUri?: string;
  /** Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (.tar.gz), the FileHash will be for the single path to that file. */
  fileHashes?: Record<string, FileHashes>;
}

export const Source: Schema.Schema<Source> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      additionalContexts: Schema.optional(Schema.Array(SourceContext)),
      context: Schema.optional(SourceContext),
      artifactStorageSourceUri: Schema.optional(Schema.String),
      fileHashes: Schema.optional(Schema.Record(Schema.String, FileHashes)),
    }),
  ).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface Command {
  /** Optional unique identifier for this command, used in wait_for to reference this command as a dependency. */
  id?: string;
  /** The ID(s) of the command(s) that this command depends on. */
  waitFor?: Array<string>;
  /** Required. Name of the command, as presented on the command line, or if the command is packaged as a Docker container, as presented to `docker pull`. */
  name?: string;
  /** Environment variables set before running this command. */
  env?: Array<string>;
  /** Command-line arguments used when executing this command. */
  args?: Array<string>;
  /** Working directory (relative to project source root) used when running this command. */
  dir?: string;
}

export const Command: Schema.Schema<Command> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      waitFor: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
      env: Schema.optional(Schema.Array(Schema.String)),
      args: Schema.optional(Schema.Array(Schema.String)),
      dir: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Command" }) as any as Schema.Schema<Command>;

export interface BuildProvenance {
  /** Output of the build. */
  builtArtifacts?: Array<Artifact>;
  /** Time at which execution of the build was started. */
  startTime?: string;
  /** Details of the Source input to the build. */
  sourceProvenance?: Source;
  /** Required. Unique identifier of the build. */
  id?: string;
  /** ID of the project. */
  projectId?: string;
  /** Commands requested by the build. */
  commands?: Array<Command>;
  /** Time at which the build was created. */
  createTime?: string;
  /** URI where any logs for this provenance were written. */
  logsUri?: string;
  /** Time at which execution of the build was finished. */
  endTime?: string;
  /** Special options applied to this build. This is a catch-all field where build providers can enter any desired additional details. */
  buildOptions?: Record<string, string>;
  /** Trigger identifier if the build was triggered automatically; empty if not. */
  triggerId?: string;
  /** Version string of the builder at the time this build was executed. */
  builderVersion?: string;
  /** E-mail address of the user who initiated this build. Note that this was the user's e-mail address at the time the build was initiated; this address may not represent the same end-user for all time. */
  creator?: string;
}

export const BuildProvenance: Schema.Schema<BuildProvenance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      builtArtifacts: Schema.optional(Schema.Array(Artifact)),
      startTime: Schema.optional(Schema.String),
      sourceProvenance: Schema.optional(Source),
      id: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
      commands: Schema.optional(Schema.Array(Command)),
      createTime: Schema.optional(Schema.String),
      logsUri: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      buildOptions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      triggerId: Schema.optional(Schema.String),
      builderVersion: Schema.optional(Schema.String),
      creator: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BuildProvenance",
  }) as any as Schema.Schema<BuildProvenance>;

export interface ResourceDescriptor {
  content?: string;
  mediaType?: string;
  downloadLocation?: string;
  digest?: Record<string, string>;
  name?: string;
  annotations?: Record<string, unknown>;
  uri?: string;
}

export const ResourceDescriptor: Schema.Schema<ResourceDescriptor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      content: Schema.optional(Schema.String),
      mediaType: Schema.optional(Schema.String),
      downloadLocation: Schema.optional(Schema.String),
      digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.optional(Schema.String),
      annotations: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ResourceDescriptor",
  }) as any as Schema.Schema<ResourceDescriptor>;

export interface BuildMetadata {
  finishedOn?: string;
  invocationId?: string;
  startedOn?: string;
}

export const BuildMetadata: Schema.Schema<BuildMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      finishedOn: Schema.optional(Schema.String),
      invocationId: Schema.optional(Schema.String),
      startedOn: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BuildMetadata",
  }) as any as Schema.Schema<BuildMetadata>;

export interface ProvenanceBuilder {
  version?: Record<string, string>;
  builderDependencies?: Array<ResourceDescriptor>;
  id?: string;
}

export const ProvenanceBuilder: Schema.Schema<ProvenanceBuilder> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      builderDependencies: Schema.optional(Schema.Array(ResourceDescriptor)),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProvenanceBuilder",
  }) as any as Schema.Schema<ProvenanceBuilder>;

export interface RunDetails {
  byproducts?: Array<ResourceDescriptor>;
  metadata?: BuildMetadata;
  builder?: ProvenanceBuilder;
}

export const RunDetails: Schema.Schema<RunDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      byproducts: Schema.optional(Schema.Array(ResourceDescriptor)),
      metadata: Schema.optional(BuildMetadata),
      builder: Schema.optional(ProvenanceBuilder),
    }),
  ).annotate({ identifier: "RunDetails" }) as any as Schema.Schema<RunDetails>;

export interface BuildDefinition {
  buildType?: string;
  externalParameters?: Record<string, unknown>;
  internalParameters?: Record<string, unknown>;
  resolvedDependencies?: Array<ResourceDescriptor>;
}

export const BuildDefinition: Schema.Schema<BuildDefinition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      buildType: Schema.optional(Schema.String),
      externalParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      internalParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      resolvedDependencies: Schema.optional(Schema.Array(ResourceDescriptor)),
    }),
  ).annotate({
    identifier: "BuildDefinition",
  }) as any as Schema.Schema<BuildDefinition>;

export interface SlsaProvenanceV1 {
  runDetails?: RunDetails;
  buildDefinition?: BuildDefinition;
}

export const SlsaProvenanceV1: Schema.Schema<SlsaProvenanceV1> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      runDetails: Schema.optional(RunDetails),
      buildDefinition: Schema.optional(BuildDefinition),
    }),
  ).annotate({
    identifier: "SlsaProvenanceV1",
  }) as any as Schema.Schema<SlsaProvenanceV1>;

export interface InTotoSlsaProvenanceV1 {
  predicateType?: string;
  /** InToto spec defined at https://github.com/in-toto/attestation/tree/main/spec#statement */
  _type?: string;
  subject?: Array<Subject>;
  predicate?: SlsaProvenanceV1;
}

export const InTotoSlsaProvenanceV1: Schema.Schema<InTotoSlsaProvenanceV1> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      predicateType: Schema.optional(Schema.String),
      _type: Schema.optional(Schema.String),
      subject: Schema.optional(Schema.Array(Subject)),
      predicate: Schema.optional(SlsaProvenanceV1),
    }),
  ).annotate({
    identifier: "InTotoSlsaProvenanceV1",
  }) as any as Schema.Schema<InTotoSlsaProvenanceV1>;

export interface GrafeasV1beta1BuildDetails {
  /** Required. The actual provenance for the build. */
  provenance?: BuildProvenance;
  /** Serialized JSON representation of the provenance, used in generating the build signature in the corresponding build note. After verifying the signature, `provenance_bytes` can be unmarshalled and compared to the provenance to confirm that it is unchanged. A base64-encoded string representation of the provenance bytes is used for the signature in order to interoperate with openssl which expects this format for signature verification. The serialized form is captured both to avoid ambiguity in how the provenance is marshalled to json as well to prevent incompatibilities with future changes. */
  provenanceBytes?: string;
  inTotoSlsaProvenanceV1?: InTotoSlsaProvenanceV1;
}

export const GrafeasV1beta1BuildDetails: Schema.Schema<GrafeasV1beta1BuildDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      provenance: Schema.optional(BuildProvenance),
      provenanceBytes: Schema.optional(Schema.String),
      inTotoSlsaProvenanceV1: Schema.optional(InTotoSlsaProvenanceV1),
    }),
  ).annotate({
    identifier: "GrafeasV1beta1BuildDetails",
  }) as any as Schema.Schema<GrafeasV1beta1BuildDetails>;

export interface Location {
  /** The path from which we gathered that this package/version is installed. */
  path?: string;
  /** Deprecated. The version installed at this location. */
  version?: Version;
  /** Deprecated. The CPE URI in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. */
  cpeUri?: string;
}

export const Location: Schema.Schema<Location> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      path: Schema.optional(Schema.String),
      version: Schema.optional(Version),
      cpeUri: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface Installation {
  /** Required. Output only. The name of the installed package. */
  name?: string;
  /** Output only. The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages. */
  cpeUri?: string;
  /** Output only. The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64" | (string & {});
  /** Output only. The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). */
  packageType?: string;
  /** Output only. The version of the package. */
  version?: Version;
  /** Licenses that have been declared by the authors of the package. */
  license?: License;
  /** All of the places within the filesystem versions of this package have been found. */
  location?: Array<Location>;
}

export const Installation: Schema.Schema<Installation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      cpeUri: Schema.optional(Schema.String),
      architecture: Schema.optional(Schema.String),
      packageType: Schema.optional(Schema.String),
      version: Schema.optional(Version),
      license: Schema.optional(License),
      location: Schema.optional(Schema.Array(Location)),
    }),
  ).annotate({
    identifier: "Installation",
  }) as any as Schema.Schema<Installation>;

export interface GrafeasV1beta1PackageDetails {
  /** Required. Where the package was installed. */
  installation?: Installation;
}

export const GrafeasV1beta1PackageDetails: Schema.Schema<GrafeasV1beta1PackageDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      installation: Schema.optional(Installation),
    }),
  ).annotate({
    identifier: "GrafeasV1beta1PackageDetails",
  }) as any as Schema.Schema<GrafeasV1beta1PackageDetails>;

export interface Occurrence {
  /** Describes how this resource derives from the basis in the associated note. */
  derivedImage?: GrafeasV1beta1ImageDetails;
  /** Describes when a resource was discovered. */
  discovered?: GrafeasV1beta1DiscoveryDetails;
  /** Describes a specific SPDX Package. */
  spdxPackage?: PackageInfoOccurrence;
  /** Describes an attestation of an artifact. */
  attestation?: Details;
  /** Describes a specific in-toto link. */
  intoto?: GrafeasV1beta1IntotoDetails;
  /** Required. Immutable. The resource for which the occurrence applies. */
  resource?: Resource;
  /** Describes a specific SPDX Relationship. */
  spdxRelationship?: RelationshipOccurrence;
  /** Describes a specific software bill of materials document. */
  sbom?: DocumentOccurrence;
  /** Required. Immutable. The analysis note associated with this occurrence, in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. This field can be used as a filter in list requests. */
  noteName?: string;
  /** Describes the deployment of an artifact on a runtime. */
  deployment?: GrafeasV1beta1DeploymentDetails;
  /** https://github.com/secure-systems-lab/dsse */
  envelope?: Envelope;
  /** Output only. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name?: string;
  /** Output only. The time this occurrence was last updated. */
  updateTime?: string;
  /** Output only. This explicitly denotes which of the occurrence details are specified. This field can be used as a filter in list requests. */
  kind?:
    | "NOTE_KIND_UNSPECIFIED"
    | "VULNERABILITY"
    | "BUILD"
    | "IMAGE"
    | "PACKAGE"
    | "DEPLOYMENT"
    | "DISCOVERY"
    | "ATTESTATION"
    | "INTOTO"
    | "SBOM"
    | "SPDX_PACKAGE"
    | "SPDX_FILE"
    | "SPDX_RELATIONSHIP"
    | "VULNERABILITY_ASSESSMENT"
    | "SBOM_REFERENCE"
    | "SECRET"
    | (string & {});
  /** Describes a specific SBOM reference occurrences. */
  sbomReference?: SBOMReferenceOccurrence;
  /** Output only. The time this occurrence was created. */
  createTime?: string;
  /** Describes a specific SPDX File. */
  spdxFile?: FileOccurrence;
  /** A description of actions that can be taken to remedy the note. */
  remediation?: string;
  /** Describes a security vulnerability. */
  vulnerability?: GrafeasV1beta1VulnerabilityDetails;
  /** Describes a secret. */
  secret?: SecretOccurrence;
  /** Describes a verifiable build. */
  build?: GrafeasV1beta1BuildDetails;
  /** Describes the installation of a package on the linked resource. */
  installation?: GrafeasV1beta1PackageDetails;
}

export const Occurrence: Schema.Schema<Occurrence> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      derivedImage: Schema.optional(GrafeasV1beta1ImageDetails),
      discovered: Schema.optional(GrafeasV1beta1DiscoveryDetails),
      spdxPackage: Schema.optional(PackageInfoOccurrence),
      attestation: Schema.optional(Details),
      intoto: Schema.optional(GrafeasV1beta1IntotoDetails),
      resource: Schema.optional(Resource),
      spdxRelationship: Schema.optional(RelationshipOccurrence),
      sbom: Schema.optional(DocumentOccurrence),
      noteName: Schema.optional(Schema.String),
      deployment: Schema.optional(GrafeasV1beta1DeploymentDetails),
      envelope: Schema.optional(Envelope),
      name: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      sbomReference: Schema.optional(SBOMReferenceOccurrence),
      createTime: Schema.optional(Schema.String),
      spdxFile: Schema.optional(FileOccurrence),
      remediation: Schema.optional(Schema.String),
      vulnerability: Schema.optional(GrafeasV1beta1VulnerabilityDetails),
      secret: Schema.optional(SecretOccurrence),
      build: Schema.optional(GrafeasV1beta1BuildDetails),
      installation: Schema.optional(GrafeasV1beta1PackageDetails),
    }),
  ).annotate({ identifier: "Occurrence" }) as any as Schema.Schema<Occurrence>;

export interface ListOccurrencesResponse {
  /** Unordered list. Unreachable regions. Populated for requests from the global region when `return_partial_success` is set. Format: `projects/[PROJECT_ID]/locations/[LOCATION]` */
  unreachable?: Array<string>;
  /** The occurrences requested. */
  occurrences?: Array<Occurrence>;
  /** The next pagination token in the list response. It should be used as `page_token` for the following request. An empty value means no more results. */
  nextPageToken?: string;
}

export const ListOccurrencesResponse: Schema.Schema<ListOccurrencesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      occurrences: Schema.optional(Schema.Array(Occurrence)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListOccurrencesResponse",
  }) as any as Schema.Schema<ListOccurrencesResponse>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo {
  /** The name of the failure. */
  type?:
    | "FAILURE_TYPE_UNSPECIFIED"
    | "PUSH_FAILED"
    | "PUSH_IMAGE_NOT_FOUND"
    | "PUSH_NOT_AUTHORIZED"
    | "LOGGING_FAILURE"
    | "USER_BUILD_STEP"
    | "FETCH_SOURCE_FAILED"
    | (string & {});
  /** Explains the failure issue in more detail using hard-coded text. */
  detail?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo>;

export interface Hint {
  /** Required. The human readable name of this attestation authority, for example "qa". */
  humanReadableName?: string;
}

export const Hint: Schema.Schema<Hint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      humanReadableName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Hint" }) as any as Schema.Schema<Hint>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig {
  /** Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start. */
  approvalRequired?: boolean;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      approvalRequired: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig>;

export interface LicensesSummary {
  /** The license of the package. Note that the format of this value is not guaranteed. It may be nil, an empty string, a boolean value (A | B), a differently formed boolean value (A OR B), etc... */
  license?: string;
  /** The number of fixable vulnerabilities associated with this resource. */
  count?: string;
}

export const LicensesSummary: Schema.Schema<LicensesSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      license: Schema.optional(Schema.String),
      count: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LicensesSummary",
  }) as any as Schema.Schema<LicensesSummary>;

export interface Publisher {
  /** Name of the publisher. Examples: 'Google', 'Google Cloud Platform'. */
  name?: string;
  /** Provides information about the authority of the issuing party to release the document, in particular, the party's constituency and responsibilities or other obligations. */
  issuingAuthority?: string;
  /** The context or namespace. Contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party. Example: https://csaf.io */
  publisherNamespace?: string;
}

export const Publisher: Schema.Schema<Publisher> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      issuingAuthority: Schema.optional(Schema.String),
      publisherNamespace: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Publisher" }) as any as Schema.Schema<Publisher>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan {
  /** Start of time span. */
  startTime?: string;
  /** End of time span. */
  endTime?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage {
  /** Artifact Registry repository, in the form "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the workspace matching any path pattern will be uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Path globs used to match files in the build's workspace. For Python/ Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file. */
  paths?: Array<string>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repository: Schema.optional(Schema.String),
      paths: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage {
  /** Optional. Path to the package.json. e.g. workspace/path/to/package Only one of `archive` or `package_path` can be specified. */
  packagePath?: string;
  /** Artifact Registry repository, in the form "https://$REGION-npm.pkg.dev/$PROJECT/$REPOSITORY" Npm package in the workspace specified by path will be zipped and uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      packagePath: Schema.optional(Schema.String),
      repository: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Volume {
  /** Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. */
  path?: string;
  /** Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. */
  name?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Volume: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      path: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Volume",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep {
  /** Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence. */
  allowExitCodes?: Array<number>;
  /** Output only. Stores timing information for pulling this build step's builder image only. */
  pullTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments. */
  args?: Array<string>;
  /** Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption. */
  automapSubstitutions?: boolean;
  /** Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field. */
  allowFailure?: boolean;
  /** A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. */
  script?: string;
  /** Output only. Return code from running the step. */
  exitCode?: number;
  /** Output only. Stores timing information for executing this build step. */
  timing?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume>;
  /** A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses. */
  status?:
    | "STATUS_UNKNOWN"
    | "PENDING"
    | "QUEUED"
    | "WORKING"
    | "SUCCESS"
    | "FAILURE"
    | "INTERNAL_ERROR"
    | "TIMEOUT"
    | "CANCELLED"
    | "EXPIRED"
    | (string & {});
  /** Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency. */
  id?: string;
  /** The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. */
  waitFor?: Array<string>;
  /** Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used. */
  entrypoint?: string;
  /** A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. */
  secretEnv?: Array<string>;
  /** Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. */
  timeout?: string;
  /** Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution. */
  dir?: string;
  /** Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like "ubuntu", "debian", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step. */
  name?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowExitCodes: Schema.optional(Schema.Array(Schema.Number)),
      pullTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      args: Schema.optional(Schema.Array(Schema.String)),
      automapSubstitutions: Schema.optional(Schema.Boolean),
      allowFailure: Schema.optional(Schema.Boolean),
      script: Schema.optional(Schema.String),
      exitCode: Schema.optional(Schema.Number),
      timing: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      volumes: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Volume),
      ),
      env: Schema.optional(Schema.Array(Schema.String)),
      status: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      waitFor: Schema.optional(Schema.Array(Schema.String)),
      entrypoint: Schema.optional(Schema.String),
      secretEnv: Schema.optional(Schema.Array(Schema.String)),
      timeout: Schema.optional(Schema.String),
      dir: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption {
  /** The `WorkerPool` resource to execute the build on. You must have `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} */
  name?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions {
  /** Requested hash for SourceProvenance. */
  sourceProvenanceHash?: Array<
    "NONE" | "SHA256" | "MD5" | "GO_MODULE_H1" | "SHA512" | (string & {})
  >;
  /** Optional. Option to specify the Pub/Sub topic to receive build status updates. */
  pubsubTopic?: string;
  /** Option to define build log streaming behavior to Cloud Storage. */
  logStreamingOption?:
    | "STREAM_DEFAULT"
    | "STREAM_ON"
    | "STREAM_OFF"
    | (string & {});
  /** This field deprecated; please use `pool.name` instead. */
  workerPool?: string;
  /** Option to include built-in and custom substitutions as env variables for all build steps. */
  automapSubstitutions?: boolean;
  /** Optional. Option to specify how default logs buckets are setup. */
  defaultLogsBucketBehavior?:
    | "DEFAULT_LOGS_BUCKET_BEHAVIOR_UNSPECIFIED"
    | "REGIONAL_USER_OWNED_BUCKET"
    | "LEGACY_BUCKET"
    | (string & {});
  /** A list of global environment variable definitions that will exist for all build steps in this build. If a variable is defined in both globally and in a build step, the variable will use the build step value. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** Requested disk size for the VM that runs the build. Note that this is *NOT* "disk free"; some of the space will be used by the operating system and build utilities. Also note that this is the minimum disk size that will be allocated for the build -- the build may run with a larger disk than requested. At present, the maximum disk size is 4000GB; builds that request more than the maximum are rejected with an error. */
  diskSizeGb?: string;
  /** A list of global environment variables, which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. These variables will be available to all build steps in this build. */
  secretEnv?: Array<string>;
  /** Optional. Option to specify whether structured logging is enabled. If true, JSON-formatted logs are parsed as structured logs. */
  enableStructuredLogging?: boolean;
  /** Option to specify the logging mode, which determines if and where build logs are stored. */
  logging?:
    | "LOGGING_UNSPECIFIED"
    | "LEGACY"
    | "GCS_ONLY"
    | "STACKDRIVER_ONLY"
    | "CLOUD_LOGGING_ONLY"
    | "NONE"
    | (string & {});
  /** Compute Engine machine type on which to run the build. */
  machineType?:
    | "UNSPECIFIED"
    | "N1_HIGHCPU_8"
    | "N1_HIGHCPU_32"
    | "E2_HIGHCPU_8"
    | "E2_HIGHCPU_32"
    | "E2_MEDIUM"
    | (string & {});
  /** Requested verifiability options. */
  requestedVerifyOption?: "NOT_VERIFIED" | "VERIFIED" | (string & {});
  /** Option to specify behavior when there is an error in the substitution checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and cannot be overridden in the build configuration file. */
  substitutionOption?: "MUST_MATCH" | "ALLOW_LOOSE" | (string & {});
  /** Global list of volumes to mount for ALL build steps Each volume is created as an empty volume prior to starting the build process. Upon completion of the build, volumes and their contents are discarded. Global volume names and paths cannot conflict with the volumes defined a build step. Using a global volume in a build with only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume>;
  /** Optional. Specification for execution on a `WorkerPool`. See [running builds in a private pool](https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information. */
  pool?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption;
  /** Option to specify whether or not to apply bash style string operations to the substitutions. NOTE: this is always enabled for triggered builds and cannot be overridden in the build configuration file. */
  dynamicSubstitutions?: boolean;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sourceProvenanceHash: Schema.optional(Schema.Array(Schema.String)),
      pubsubTopic: Schema.optional(Schema.String),
      logStreamingOption: Schema.optional(Schema.String),
      workerPool: Schema.optional(Schema.String),
      automapSubstitutions: Schema.optional(Schema.Boolean),
      defaultLogsBucketBehavior: Schema.optional(Schema.String),
      env: Schema.optional(Schema.Array(Schema.String)),
      diskSizeGb: Schema.optional(Schema.String),
      secretEnv: Schema.optional(Schema.Array(Schema.String)),
      enableStructuredLogging: Schema.optional(Schema.Boolean),
      logging: Schema.optional(Schema.String),
      machineType: Schema.optional(Schema.String),
      requestedVerifyOption: Schema.optional(Schema.String),
      substitutionOption: Schema.optional(Schema.String),
      volumes: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Volume),
      ),
      pool: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption,
      ),
      dynamicSubstitutions: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Hash {
  /** The type of hash that was performed. */
  type?: "NONE" | "SHA256" | "MD5" | "GO_MODULE_H1" | "SHA512" | (string & {});
  /** The hash value. */
  value?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Hash: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Hash> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Hash",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Hash>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes {
  /** Collection of file hashes. */
  fileHash?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Hash>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileHash: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Hash),
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage {
  /** Hash types and values of the npm package. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
  /** URI of the uploaded npm package. */
  uri?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileHashes: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes,
      ),
      pushTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      artifactRegistryPackage: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage {
  /** Name used to push the container image to Google Container Registry, as presented to `docker push`. */
  name?: string;
  /** Docker Registry 2.0 digest. */
  digest?: string;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
  /** Output only. Stores timing information for pushing the specified image. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      digest: Schema.optional(Schema.String),
      artifactRegistryPackage: Schema.optional(Schema.String),
      pushTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage {
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Hash types and values of the Python Artifact. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      fileHashes: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes,
      ),
      artifactRegistryPackage: Schema.optional(Schema.String),
      pushTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule {
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
  /** Hash types and values of the Go Module Artifact. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      pushTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      artifactRegistryPackage: Schema.optional(Schema.String),
      fileHashes: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact {
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
  /** Hash types and values of the Maven Artifact. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      artifactRegistryPackage: Schema.optional(Schema.String),
      fileHashes: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes,
      ),
      pushTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Results {
  /** List of build step digests, in the order corresponding to build step indices. */
  buildStepImages?: Array<string>;
  /** Path to the artifact manifest for non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. */
  artifactManifest?: string;
  /** Npm packages uploaded to Artifact Registry at the end of the build. */
  npmPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage>;
  /** Time to push all non-container artifacts to Cloud Storage. */
  artifactTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Container images that were built as a part of the build. */
  images?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage>;
  /** List of build step outputs, produced by builder images, in the order corresponding to build step indices. [Cloud Builders](https://cloud.google.com/cloud-build/docs/cloud-builders) can produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first 50KB of data is stored. Note that the `$BUILDER_OUTPUT` variable is read-only and can't be substituted. */
  buildStepOutputs?: Array<string>;
  /** Python artifacts uploaded to Artifact Registry at the end of the build. */
  pythonPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage>;
  /** Number of non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. */
  numArtifacts?: string;
  /** Optional. Go module artifacts uploaded to Artifact Registry at the end of the build. */
  goModules?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule>;
  /** Maven artifacts uploaded to Artifact Registry at the end of the build. */
  mavenArtifacts?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Results: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Results> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      buildStepImages: Schema.optional(Schema.Array(Schema.String)),
      artifactManifest: Schema.optional(Schema.String),
      npmPackages: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage,
        ),
      ),
      artifactTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      images: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage),
      ),
      buildStepOutputs: Schema.optional(Schema.Array(Schema.String)),
      pythonPackages: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage,
        ),
      ),
      numArtifacts: Schema.optional(Schema.String),
      goModules: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule,
        ),
      ),
      mavenArtifacts: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact,
        ),
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Results",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Results>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning {
  /** The priority for this warning. */
  priority?:
    | "PRIORITY_UNSPECIFIED"
    | "INFO"
    | "WARNING"
    | "ALERT"
    | (string & {});
  /** Explanation of the warning generated. */
  text?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      priority: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig {
  /** SecretVersion resource of the HTTP proxy URL. The Service Account used in the build (either the default Service Account or user-specified Service Account) should have `secretmanager.versions.access` permissions on this secret. The proxy URL should be in format `protocol://@]proxyhost[:port]`. */
  proxySecretVersionName?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      proxySecretVersionName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig {
  /** Configuration for HTTP related git operations. */
  http?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      http: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Secret {
  /** Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. */
  secretEnv?: Record<string, string>;
  /** Cloud KMS key name to use to decrypt these envs. */
  kmsKeyName?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Secret: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secret> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      secretEnv: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      kmsKeyName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Secret",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secret>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource {
  /** Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch. */
  revision?: string;
  /** Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote. */
  url?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. */
  dir?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      revision: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      dir: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig {
  /** Required. The Developer Connect Git repository link, formatted as `projects/* /locations/* /connections/* /gitRepositoryLink/*`. */
  gitRepositoryLink?: string;
  /** Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. */
  revision?: string;
  /** Required. Directory, relative to the source root, in which to run the build. */
  dir?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gitRepositoryLink: Schema.optional(Schema.String),
      revision: Schema.optional(Schema.String),
      dir: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest {
  /** Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. */
  generation?: string;
  /** Required. Cloud Storage object containing the source manifest. This object must be a JSON file. */
  object?: string;
  /** Required. Cloud Storage bucket containing the source manifest (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      generation: Schema.optional(Schema.String),
      object: Schema.optional(Schema.String),
      bucket: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository {
  /** Optional. Directory, relative to the source root, in which to run the build. */
  dir?: string;
  /** Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. */
  revision?: string;
  /** Required. Name of the Google Cloud Build repository, formatted as `projects/* /locations/* /connections/* /repositories/*`. */
  repository?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dir: Schema.optional(Schema.String),
      revision: Schema.optional(Schema.String),
      repository: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource {
  /** Explicit commit SHA to build. */
  commitSha?: string;
  /** Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger */
  substitutions?: Record<string, string>;
  /** Optional. Only trigger a build if the revision regex does NOT match the revision regex. */
  invertRegex?: boolean;
  /** Required. Name of the Cloud Source Repository. */
  repoName?: string;
  /** Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  branchName?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. */
  dir?: string;
  /** Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  tagName?: string;
  /** Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed. */
  projectId?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      commitSha: Schema.optional(Schema.String),
      substitutions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      invertRegex: Schema.optional(Schema.Boolean),
      repoName: Schema.optional(Schema.String),
      branchName: Schema.optional(Schema.String),
      dir: Schema.optional(Schema.String),
      tagName: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource {
  /** Optional. Option to specify the tool to fetch the source file for the build. */
  sourceFetcher?:
    | "SOURCE_FETCHER_UNSPECIFIED"
    | "GSUTIL"
    | "GCS_FETCHER"
    | (string & {});
  /** Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build. */
  object?: string;
  /** Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
  /** Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. */
  generation?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sourceFetcher: Schema.optional(Schema.String),
      object: Schema.optional(Schema.String),
      bucket: Schema.optional(Schema.String),
      generation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Source {
  /** If provided, get the source from this Git repository. */
  gitSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource;
  /** If provided, get the source from this Developer Connect config. */
  developerConnectConfig?: ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig;
  /** If provided, get the source from this manifest in Cloud Storage. This feature is in Preview; see description [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher). */
  storageSourceManifest?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest;
  /** Optional. If provided, get the source from this 2nd-gen Google Cloud Build repository resource. */
  connectedRepository?: ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository;
  /** If provided, get the source from this location in a Cloud Source Repository. */
  repoSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource;
  /** If provided, get the source from this location in Cloud Storage. */
  storageSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Source: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Source> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gitSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource,
      ),
      developerConnectConfig: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig,
      ),
      storageSourceManifest: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest,
      ),
      connectedRepository: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository,
      ),
      repoSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource,
      ),
      storageSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Source",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Source>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact {
  /** Maven `artifactId` value used when uploading the artifact to Artifact Registry. */
  artifactId?: string;
  /** Maven `version` value used when uploading the artifact to Artifact Registry. */
  version?: string;
  /** Optional. Path to an artifact in the build's workspace to be uploaded to Artifact Registry. This can be either an absolute path, e.g. /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar. */
  path?: string;
  /** Optional. Path to a folder containing the files to upload to Artifact Registry. This can be either an absolute path, e.g. `/workspace/my-app/target/`, or a relative path from /workspace, e.g. `my-app/target/`. This field is mutually exclusive with the `path` field. */
  deployFolder?: string;
  /** Artifact Registry repository, in the form "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the workspace specified by path will be uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Maven `groupId` value used when uploading the artifact to Artifact Registry. */
  groupId?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      artifactId: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      deployFolder: Schema.optional(Schema.String),
      repository: Schema.optional(Schema.String),
      groupId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule {
  /** Optional. Project ID of the Artifact Registry repository. Defaults to the build project. */
  repositoryProjectId?: string;
  /** Optional. The Go module's "module path". e.g. example.com/foo/v2 */
  modulePath?: string;
  /** Optional. Location of the Artifact Registry repository. i.e. us-east1 Defaults to the build’s location. */
  repositoryLocation?: string;
  /** Optional. The Go module's semantic version in the form vX.Y.Z. e.g. v0.1.1 Pre-release identifiers can also be added by appending a dash and dot separated ASCII alphanumeric characters and hyphens. e.g. v0.2.3-alpha.x.12m.5 */
  moduleVersion?: string;
  /** Optional. Artifact Registry repository name. Specified Go modules will be zipped and uploaded to Artifact Registry with this location as a prefix. e.g. my-go-repo */
  repositoryName?: string;
  /** Optional. Source path of the go.mod file in the build's workspace. If not specified, this will default to the current directory. e.g. ~/code/go/mypackage */
  sourcePath?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repositoryProjectId: Schema.optional(Schema.String),
      modulePath: Schema.optional(Schema.String),
      repositoryLocation: Schema.optional(Schema.String),
      moduleVersion: Schema.optional(Schema.String),
      repositoryName: Schema.optional(Schema.String),
      sourcePath: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects {
  /** Cloud Storage bucket and optional object path, in the form "gs://bucket/path/to/somewhere/". (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Files in the workspace matching any path pattern will be uploaded to Cloud Storage with this location as a prefix. */
  location?: string;
  /** Output only. Stores timing information for pushing all artifact objects. */
  timing?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Path globs used to match files in the build's workspace. */
  paths?: Array<string>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      location: Schema.optional(Schema.String),
      timing: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      paths: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts {
  /** A list of images to be pushed upon the successful completion of all build steps. The images will be pushed using the builder service account's credentials. The digests of the pushed images will be stored in the Build resource's results field. If any of the images fail to be pushed, the build is marked FAILURE. */
  images?: Array<string>;
  /** A list of Maven artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. Artifacts in the workspace matching specified paths globs will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any artifacts fail to be pushed, the build is marked FAILURE. */
  mavenArtifacts?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact>;
  /** A list of Python packages to be uploaded to Artifact Registry upon successful completion of all build steps. The build service account credentials will be used to perform the upload. If any objects fail to be pushed, the build is marked FAILURE. */
  pythonPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage>;
  /** Optional. A list of Go modules to be uploaded to Artifact Registry upon successful completion of all build steps. If any objects fail to be pushed, the build is marked FAILURE. */
  goModules?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule>;
  /** A list of npm packages to be uploaded to Artifact Registry upon successful completion of all build steps. Npm packages in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any packages fail to be pushed, the build is marked FAILURE. */
  npmPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage>;
  /** A list of objects to be uploaded to Cloud Storage upon successful completion of all build steps. Files in the workspace matching specified paths globs will be uploaded to the specified Cloud Storage location using the builder service account's credentials. The location and generation of the uploaded objects will be stored in the Build resource's results field. If any objects fail to be pushed, the build is marked FAILURE. */
  objects?: ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      images: Schema.optional(Schema.Array(Schema.String)),
      mavenArtifacts: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact,
        ),
      ),
      pythonPackages: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage,
        ),
      ),
      goModules: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule,
        ),
      ),
      npmPackages: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage,
        ),
      ),
      objects: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository {
  /** The Developer Connect Git repository link formatted as `projects/* /locations/* /connections/* /gitRepositoryLink/*` */
  developerConnect?: string;
  /** Location of the Git repository. */
  url?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      developerConnect: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency {
  /** Required. The revision that we will fetch the repo at. */
  revision?: string;
  /** Required. The kind of repo (url or dev connect). */
  repository?: ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository;
  /** Optional. True if submodules should be fetched too (default false). */
  recurseSubmodules?: boolean;
  /** Required. Where should the files be placed on the worker. */
  destPath?: string;
  /** Optional. How much history should be fetched for the build (default 1, -1 for all history). */
  depth?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      revision: Schema.optional(Schema.String),
      repository: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository,
      ),
      recurseSubmodules: Schema.optional(Schema.Boolean),
      destPath: Schema.optional(Schema.String),
      depth: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency {
  /** If set to true disable all dependency fetching (ignoring the default source as well). */
  empty?: boolean;
  /** Represents a git repository as a build dependency. */
  gitSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      empty: Schema.optional(Schema.Boolean),
      gitSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance {
  /** Output only. A copy of the build's `source.git_source`, if exists, with any revisions resolved. */
  resolvedGitSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource;
  /** Output only. Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. Note that `FileHashes` will only be populated if `BuildOptions` has requested a `SourceProvenanceHash`. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (`.tar.gz`), the `FileHash` will be for the single path to that file. */
  fileHashes?: Record<
    string,
    ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes
  >;
  /** A copy of the build's `source.storage_source`, if exists, with any generations resolved. */
  resolvedStorageSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource;
  /** A copy of the build's `source.repo_source`, if exists, with any revisions resolved. */
  resolvedRepoSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource;
  /** Output only. A copy of the build's `source.connected_repository`, if exists, with any revisions resolved. */
  resolvedConnectedRepository?: ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository;
  /** A copy of the build's `source.storage_source_manifest`, if exists, with any revisions resolved. This feature is in Preview. */
  resolvedStorageSourceManifest?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resolvedGitSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource,
      ),
      fileHashes: Schema.optional(
        Schema.Record(
          Schema.String,
          ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes,
        ),
      ),
      resolvedStorageSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource,
      ),
      resolvedRepoSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource,
      ),
      resolvedConnectedRepository: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository,
      ),
      resolvedStorageSourceManifest: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult {
  /** Optional. An optional URL tied to this manual approval result. This field is essentially the same as comment, except that it will be rendered by the UI differently. An example use case is a link to an external job that approved this Build. */
  url?: string;
  /** Output only. Email of the user that called the ApproveBuild API to approve or reject a build at the time that the API was called. */
  approverAccount?: string;
  /** Optional. An optional comment for this manual approval result. */
  comment?: string;
  /** Required. The decision of this manual approval. */
  decision?: "DECISION_UNSPECIFIED" | "APPROVED" | "REJECTED" | (string & {});
  /** Output only. The time when the approval decision was made. */
  approvalTime?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      approverAccount: Schema.optional(Schema.String),
      comment: Schema.optional(Schema.String),
      decision: Schema.optional(Schema.String),
      approvalTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval {
  /** Output only. Result of manual approval for this Build. */
  result?: ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult;
  /** Output only. Configuration for manual approval of this build. */
  config?: ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig;
  /** Output only. The state of this build's approval. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "CANCELLED"
    | (string & {});
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      result: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult,
      ),
      config: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig,
      ),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret {
  /** Resource name of Cloud KMS crypto key to decrypt the encrypted value. In format: projects/* /locations/* /keyRings/* /cryptoKeys/* */
  kmsKeyName?: string;
  /** Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. */
  envMap?: Record<string, string>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kmsKeyName: Schema.optional(Schema.String),
      envMap: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret {
  /** Environment variable name to associate with the secret. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. */
  env?: string;
  /** Resource name of the SecretVersion. In format: projects/* /secrets/* /versions/* */
  versionName?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      env: Schema.optional(Schema.String),
      versionName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets {
  /** Secrets encrypted with KMS key and the associated secret environment variable. */
  inline?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret>;
  /** Secrets in Secret Manager and associated secret environment variable. */
  secretManager?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inline: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret),
      ),
      secretManager: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret,
        ),
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Build {
  /** Required. The operations to be performed on the workspace. */
  steps?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep>;
  /** Output only. Time at which execution of the build was started. */
  startTime?: string;
  /** Special options for this build. */
  options?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions;
  /** Output only. Time at which execution of the build was finished. The difference between finish_time and start_time is the duration of the build's execution. */
  finishTime?: string;
  /** Output only. Results of the build. */
  results?: ContaineranalysisGoogleDevtoolsCloudbuildV1Results;
  /** TTL in queue for this build. If provided and the build is enqueued longer than this value, the build will expire and the build status will be `EXPIRED`. The TTL starts ticking from create_time. */
  queueTtl?: string;
  /** Output only. Non-fatal problems encountered during the execution of the build. */
  warnings?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning>;
  /** Output only. The ID of the `BuildTrigger` that triggered this build, if it was triggered automatically. */
  buildTriggerId?: string;
  /** Output only. URL to logs for this build in Google Cloud Console. */
  logUrl?: string;
  /** Substitutions data for `Build` resource. */
  substitutions?: Record<string, string>;
  /** A list of images to be pushed upon the successful completion of all build steps. The images are pushed using the builder service account's credentials. The digests of the pushed images will be stored in the `Build` resource's results field. If any of the images fail to be pushed, the build status is marked `FAILURE`. */
  images?: Array<string>;
  /** Output only. Customer-readable message about the current status. */
  statusDetail?: string;
  /** Optional. Configuration for git operations. */
  gitConfig?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig;
  /** Output only. Time at which the request to create the build was received. */
  createTime?: string;
  /** Secrets to decrypt using Cloud Key Management Service. Note: Secret Manager is the recommended technique for managing sensitive data with Cloud Build. Use `available_secrets` to configure builds to access secrets from Secret Manager. For instructions, see: https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets */
  secrets?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Secret>;
  /** Optional. The location of the source files to build. */
  source?: ContaineranalysisGoogleDevtoolsCloudbuildV1Source;
  /** Tags for annotation of a `Build`. These are not docker tags. */
  tags?: Array<string>;
  /** IAM service account whose credentials will be used at build runtime. Must be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT can be email address or uniqueId of the service account. */
  serviceAccount?: string;
  /** Output only. ID of the project. */
  projectId?: string;
  /** Artifacts produced by the build that should be uploaded upon successful completion of all build steps. */
  artifacts?: ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts;
  /** Output only. Unique identifier of the build. */
  id?: string;
  /** Cloud Storage bucket where logs should be written (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`. */
  logsBucket?: string;
  /** Optional. Dependencies that the Cloud Build worker will fetch before executing user steps. */
  dependencies?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency>;
  /** Output only. A permanent fixed identifier for source. */
  sourceProvenance?: ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance;
  /** Output only. Describes this build's approval configuration, status, and result. */
  approval?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval;
  /** Output only. Status of the build. */
  status?:
    | "STATUS_UNKNOWN"
    | "PENDING"
    | "QUEUED"
    | "WORKING"
    | "SUCCESS"
    | "FAILURE"
    | "INTERNAL_ERROR"
    | "TIMEOUT"
    | "CANCELLED"
    | "EXPIRED"
    | (string & {});
  /** Output only. Stores timing information for phases of the build. Valid keys are: * BUILD: time to execute all build steps. * PUSH: time to push all artifacts including docker images and non docker artifacts. * FETCHSOURCE: time to fetch source. * SETUPBUILD: time to set up build. If the build does not specify source or images, these keys will not be included. */
  timing?: Record<string, ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan>;
  /** Amount of time that this build should be allowed to run, to second granularity. If this amount of time elapses, work on the build will cease and the build status will be `TIMEOUT`. `timeout` starts ticking from `startTime`. Default time is 60 minutes. */
  timeout?: string;
  /** Output only. The 'Build' name with format: `projects/{project}/locations/{location}/builds/{build}`, where {build} is a unique identifier generated by the service. */
  name?: string;
  /** Secrets and secret environment variables. */
  availableSecrets?: ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets;
  /** Output only. Contains information about the build when status=FAILURE. */
  failureInfo?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Build: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Build> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      steps: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep),
      ),
      startTime: Schema.optional(Schema.String),
      options: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions,
      ),
      finishTime: Schema.optional(Schema.String),
      results: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1Results,
      ),
      queueTtl: Schema.optional(Schema.String),
      warnings: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning),
      ),
      buildTriggerId: Schema.optional(Schema.String),
      logUrl: Schema.optional(Schema.String),
      substitutions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      images: Schema.optional(Schema.Array(Schema.String)),
      statusDetail: Schema.optional(Schema.String),
      gitConfig: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig,
      ),
      createTime: Schema.optional(Schema.String),
      secrets: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Secret),
      ),
      source: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1Source,
      ),
      tags: Schema.optional(Schema.Array(Schema.String)),
      serviceAccount: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
      artifacts: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts,
      ),
      id: Schema.optional(Schema.String),
      logsBucket: Schema.optional(Schema.String),
      dependencies: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency),
      ),
      sourceProvenance: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance,
      ),
      approval: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval,
      ),
      status: Schema.optional(Schema.String),
      timing: Schema.optional(
        Schema.Record(
          Schema.String,
          ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
        ),
      ),
      timeout: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      availableSecrets: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets,
      ),
      failureInfo: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Build",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Build>;

export interface TimeSpan {
  /** Start of time span. */
  startTime?: string;
  /** End of time span. */
  endTime?: string;
}

export const TimeSpan: Schema.Schema<TimeSpan> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TimeSpan" }) as any as Schema.Schema<TimeSpan>;

export interface FixableTotalByDigest {
  /** The number of fixable vulnerabilities associated with this resource. */
  fixableCount?: string;
  /** The affected resource. */
  resource?: Resource;
  /** The total number of vulnerabilities associated with this resource. */
  totalCount?: string;
  /** The severity for this count. SEVERITY_UNSPECIFIED indicates total across all severities. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
}

export const FixableTotalByDigest: Schema.Schema<FixableTotalByDigest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fixableCount: Schema.optional(Schema.String),
      resource: Schema.optional(Resource),
      totalCount: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FixableTotalByDigest",
  }) as any as Schema.Schema<FixableTotalByDigest>;

export interface VulnerabilityOccurrencesSummary {
  /** A listing by resource of the number of fixable and total vulnerabilities. */
  counts?: Array<FixableTotalByDigest>;
  /** Unordered list. Unreachable regions. Populated for requests from the global region when `return_partial_success` is set. Format: `projects/[PROJECT_ID]/locations/[LOCATION]` */
  unreachable?: Array<string>;
}

export const VulnerabilityOccurrencesSummary: Schema.Schema<VulnerabilityOccurrencesSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      counts: Schema.optional(Schema.Array(FixableTotalByDigest)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "VulnerabilityOccurrencesSummary",
  }) as any as Schema.Schema<VulnerabilityOccurrencesSummary>;

export interface Detail {
  /** The severity (eg: distro assigned severity) for this vulnerability. */
  severityName?: string;
  /** Required. The name of the package where the vulnerability was found. */
  package?: string;
  /** Required. The CPE URI in [cpe format](https://cpe.mitre.org/specification/) in which the vulnerability manifests. Examples include distro or storage location for vulnerable jar. */
  cpeUri?: string;
  /** Whether this detail is obsolete. Occurrences are expected not to point to obsolete details. */
  isObsolete?: boolean;
  /** The min version of the package in which the vulnerability exists. */
  minAffectedVersion?: Version;
  /** The max version of the package in which the vulnerability exists. */
  maxAffectedVersion?: Version;
  /** The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker. */
  sourceUpdateTime?: string;
  /** The source from which the information in this Detail was obtained. */
  source?: string;
  /** A vendor-specific description of this note. */
  description?: string;
  /** The type of package; whether native or non native(ruby gems, node.js packages etc). */
  packageType?: string;
  /** The fix for this specific package version. */
  fixedLocation?: VulnerabilityLocation;
  /** The name of the vendor of the product. */
  vendor?: string;
}

export const Detail: Schema.Schema<Detail> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      severityName: Schema.optional(Schema.String),
      package: Schema.optional(Schema.String),
      cpeUri: Schema.optional(Schema.String),
      isObsolete: Schema.optional(Schema.Boolean),
      minAffectedVersion: Schema.optional(Version),
      maxAffectedVersion: Schema.optional(Version),
      sourceUpdateTime: Schema.optional(Schema.String),
      source: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      packageType: Schema.optional(Schema.String),
      fixedLocation: Schema.optional(VulnerabilityLocation),
      vendor: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Detail" }) as any as Schema.Schema<Detail>;

export interface CVSSv3 {
  confidentialityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | (string & {});
  integrityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | (string & {});
  /** The base score is a function of the base metric scores. */
  baseScore?: number;
  exploitabilityScore?: number;
  scope?:
    | "SCOPE_UNSPECIFIED"
    | "SCOPE_UNCHANGED"
    | "SCOPE_CHANGED"
    | (string & {});
  privilegesRequired?:
    | "PRIVILEGES_REQUIRED_UNSPECIFIED"
    | "PRIVILEGES_REQUIRED_NONE"
    | "PRIVILEGES_REQUIRED_LOW"
    | "PRIVILEGES_REQUIRED_HIGH"
    | (string & {});
  userInteraction?:
    | "USER_INTERACTION_UNSPECIFIED"
    | "USER_INTERACTION_NONE"
    | "USER_INTERACTION_REQUIRED"
    | (string & {});
  /** Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments. */
  attackVector?:
    | "ATTACK_VECTOR_UNSPECIFIED"
    | "ATTACK_VECTOR_NETWORK"
    | "ATTACK_VECTOR_ADJACENT"
    | "ATTACK_VECTOR_LOCAL"
    | "ATTACK_VECTOR_PHYSICAL"
    | (string & {});
  impactScore?: number;
  availabilityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | (string & {});
  attackComplexity?:
    | "ATTACK_COMPLEXITY_UNSPECIFIED"
    | "ATTACK_COMPLEXITY_LOW"
    | "ATTACK_COMPLEXITY_HIGH"
    | (string & {});
}

export const CVSSv3: Schema.Schema<CVSSv3> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      confidentialityImpact: Schema.optional(Schema.String),
      integrityImpact: Schema.optional(Schema.String),
      baseScore: Schema.optional(Schema.Number),
      exploitabilityScore: Schema.optional(Schema.Number),
      scope: Schema.optional(Schema.String),
      privilegesRequired: Schema.optional(Schema.String),
      userInteraction: Schema.optional(Schema.String),
      attackVector: Schema.optional(Schema.String),
      impactScore: Schema.optional(Schema.Number),
      availabilityImpact: Schema.optional(Schema.String),
      attackComplexity: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "CVSSv3" }) as any as Schema.Schema<CVSSv3>;

export interface Vulnerability {
  /** Windows details get their own format because the information format and model don't match a normal detail. Specifically Windows updates are done as patches, thus Windows vulnerabilities really are a missing package, rather than a package being at an incorrect version. */
  windowsDetails?: Array<WindowsDetail>;
  /** A list of CWE for this vulnerability. For details, see: https://cwe.mitre.org/index.html */
  cwe?: Array<string>;
  /** CVSS version used to populate cvss_score and severity. */
  cvssVersion?:
    | "CVSS_VERSION_UNSPECIFIED"
    | "CVSS_VERSION_2"
    | "CVSS_VERSION_3"
    | (string & {});
  /** The CVSS score for this vulnerability. */
  cvssScore?: number;
  /** All information about the package to specifically identify this vulnerability. One entry per (version range and cpe_uri) the package vulnerability has manifested in. */
  details?: Array<Detail>;
  /** The full description of the CVSS for version 2. */
  cvssV2?: CVSS;
  /** Note provider assigned impact of the vulnerability. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
  /** The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker. */
  sourceUpdateTime?: string;
  /** The full description of the CVSS for version 3. */
  cvssV3?: CVSSv3;
}

export const Vulnerability: Schema.Schema<Vulnerability> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      windowsDetails: Schema.optional(Schema.Array(WindowsDetail)),
      cwe: Schema.optional(Schema.Array(Schema.String)),
      cvssVersion: Schema.optional(Schema.String),
      cvssScore: Schema.optional(Schema.Number),
      details: Schema.optional(Schema.Array(Detail)),
      cvssV2: Schema.optional(CVSS),
      severity: Schema.optional(Schema.String),
      sourceUpdateTime: Schema.optional(Schema.String),
      cvssV3: Schema.optional(CVSSv3),
    }),
  ).annotate({
    identifier: "Vulnerability",
  }) as any as Schema.Schema<Vulnerability>;

export interface Deployable {
  /** Required. Resource URI for the artifact being deployed. */
  resourceUri?: Array<string>;
}

export const Deployable: Schema.Schema<Deployable> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceUri: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "Deployable" }) as any as Schema.Schema<Deployable>;

export interface DocumentNote {
  /** Compliance with the SPDX specification includes populating the SPDX fields therein with data related to such fields ("SPDX-Metadata") */
  dataLicence?: string;
  /** Provide a reference number that can be used to understand how to parse and interpret the rest of the file */
  spdxVersion?: string;
}

export const DocumentNote: Schema.Schema<DocumentNote> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataLicence: Schema.optional(Schema.String),
      spdxVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DocumentNote",
  }) as any as Schema.Schema<DocumentNote>;

export interface SecretNote {}

export const SecretNote: Schema.Schema<SecretNote> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "SecretNote",
  }) as any as Schema.Schema<SecretNote>;

export interface Discovery {
  /** Required. Immutable. The kind of analysis that is handled by this discovery. */
  analysisKind?:
    | "NOTE_KIND_UNSPECIFIED"
    | "VULNERABILITY"
    | "BUILD"
    | "IMAGE"
    | "PACKAGE"
    | "DEPLOYMENT"
    | "DISCOVERY"
    | "ATTESTATION"
    | "INTOTO"
    | "SBOM"
    | "SPDX_PACKAGE"
    | "SPDX_FILE"
    | "SPDX_RELATIONSHIP"
    | "VULNERABILITY_ASSESSMENT"
    | "SBOM_REFERENCE"
    | "SECRET"
    | (string & {});
}

export const Discovery: Schema.Schema<Discovery> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      analysisKind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Discovery" }) as any as Schema.Schema<Discovery>;

export interface SigningKey {
  /** This field identifies the specific signing method. Eg: "rsa", "ed25519", and "ecdsa". */
  keyType?: string;
  /** This field contains the corresponding signature scheme. Eg: "rsassa-pss-sha256". */
  keyScheme?: string;
  /** This field contains the actual public key. */
  publicKeyValue?: string;
  /** key_id is an identifier for the signing key. */
  keyId?: string;
}

export const SigningKey: Schema.Schema<SigningKey> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      keyType: Schema.optional(Schema.String),
      keyScheme: Schema.optional(Schema.String),
      publicKeyValue: Schema.optional(Schema.String),
      keyId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "SigningKey" }) as any as Schema.Schema<SigningKey>;

export interface ArtifactRule {
  artifactRule?: Array<string>;
}

export const ArtifactRule: Schema.Schema<ArtifactRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      artifactRule: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ArtifactRule",
  }) as any as Schema.Schema<ArtifactRule>;

export interface InToto {
  /** This field contains the public keys that can be used to verify the signatures on the step metadata. */
  signingKeys?: Array<SigningKey>;
  /** This field identifies the name of the step in the supply chain. */
  stepName?: string;
  /** The following fields contain in-toto artifact rules identifying the artifacts that enter this supply chain step, and exit the supply chain step, i.e. materials and products of the step. */
  expectedMaterials?: Array<ArtifactRule>;
  /** This field contains the expected command used to perform the step. */
  expectedCommand?: Array<string>;
  /** This field contains a value that indicates the minimum number of keys that need to be used to sign the step's in-toto link. */
  threshold?: string;
  expectedProducts?: Array<ArtifactRule>;
}

export const InToto: Schema.Schema<InToto> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      signingKeys: Schema.optional(Schema.Array(SigningKey)),
      stepName: Schema.optional(Schema.String),
      expectedMaterials: Schema.optional(Schema.Array(ArtifactRule)),
      expectedCommand: Schema.optional(Schema.Array(Schema.String)),
      threshold: Schema.optional(Schema.String),
      expectedProducts: Schema.optional(Schema.Array(ArtifactRule)),
    }),
  ).annotate({ identifier: "InToto" }) as any as Schema.Schema<InToto>;

export interface Digest {
  /** Value of the digest. */
  digestBytes?: string;
  /** `SHA1`, `SHA512` etc. */
  algo?: string;
}

export const Digest: Schema.Schema<Digest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      digestBytes: Schema.optional(Schema.String),
      algo: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Digest" }) as any as Schema.Schema<Digest>;

export interface Distribution {
  /** The latest available version of this package in this distribution channel. */
  latestVersion?: Version;
  /** The distribution channel-specific homepage for this package. */
  url?: string;
  /** The CPU architecture for which packages in this distribution channel were built. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64" | (string & {});
  /** A freeform string denoting the maintainer of this package. */
  maintainer?: string;
  /** The distribution channel-specific description of this package. */
  description?: string;
  /** Required. The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. */
  cpeUri?: string;
}

export const Distribution: Schema.Schema<Distribution> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      latestVersion: Schema.optional(Version),
      url: Schema.optional(Schema.String),
      architecture: Schema.optional(Schema.String),
      maintainer: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      cpeUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Distribution",
  }) as any as Schema.Schema<Distribution>;

export interface Package {
  /** A freeform text denoting the maintainer of this package. */
  maintainer?: string;
  /** Required. Immutable. The name of the package. */
  name?: string;
  /** Licenses that have been declared by the authors of the package. */
  license?: License;
  /** The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages. */
  cpeUri?: string;
  /** Hash value, typically a file digest, that allows unique identification a specific package. */
  digest?: Array<Digest>;
  /** The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). */
  packageType?: string;
  /** The various channels by which a package is distributed. */
  distribution?: Array<Distribution>;
  /** The version of the package. */
  version?: Version;
  /** The description of this package. */
  description?: string;
  /** The homepage for this package. */
  url?: string;
  /** The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64" | (string & {});
}

export const Package: Schema.Schema<Package> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maintainer: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      license: Schema.optional(License),
      cpeUri: Schema.optional(Schema.String),
      digest: Schema.optional(Schema.Array(Digest)),
      packageType: Schema.optional(Schema.String),
      distribution: Schema.optional(Schema.Array(Distribution)),
      version: Schema.optional(Version),
      description: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      architecture: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Package" }) as any as Schema.Schema<Package>;

export interface Product {
  /** Token that identifies a product so that it can be referred to from other parts in the document. There is no predefined format as long as it uniquely identifies a group in the context of the current document. */
  id?: string;
  /** Contains a URI which is vendor-specific. Example: The artifact repository URL of an image. */
  genericUri?: string;
  /** Name of the product. */
  name?: string;
}

export const Product: Schema.Schema<Product> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      genericUri: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Product" }) as any as Schema.Schema<Product>;

export interface Assessment {
  /** Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. Deprecated: Use vulnerability_id instead to denote CVEs. */
  cve?: string;
  /** Justification provides the justification when the state of the assessment if NOT_AFFECTED. */
  justification?: Justification;
  /** A one sentence description of this Vex. */
  shortDescription?: string;
  /** A detailed description of this Vex. */
  longDescription?: string;
  /** Holds a list of references associated with this vulnerability item and assessment. These uris have additional information about the vulnerability and the assessment itself. E.g. Link to a document which details how this assessment concluded the state of this vulnerability. */
  relatedUris?: Array<RelatedUrl>;
  /** The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc. */
  vulnerabilityId?: string;
  /** Contains information about the impact of this vulnerability, this will change with time. */
  impacts?: Array<string>;
  /** Specifies details on how to handle (and presumably, fix) a vulnerability. */
  remediations?: Array<Remediation>;
  /** Provides the state of this Vulnerability assessment. */
  state?:
    | "STATE_UNSPECIFIED"
    | "AFFECTED"
    | "NOT_AFFECTED"
    | "FIXED"
    | "UNDER_INVESTIGATION"
    | (string & {});
}

export const Assessment: Schema.Schema<Assessment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cve: Schema.optional(Schema.String),
      justification: Schema.optional(Justification),
      shortDescription: Schema.optional(Schema.String),
      longDescription: Schema.optional(Schema.String),
      relatedUris: Schema.optional(Schema.Array(RelatedUrl)),
      vulnerabilityId: Schema.optional(Schema.String),
      impacts: Schema.optional(Schema.Array(Schema.String)),
      remediations: Schema.optional(Schema.Array(Remediation)),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Assessment" }) as any as Schema.Schema<Assessment>;

export interface VulnerabilityAssessmentNote {
  /** The title of the note. E.g. `Vex-Debian-11.4` */
  title?: string;
  /** The product affected by this vex. */
  product?: Product;
  /** Represents a vulnerability assessment for the product. */
  assessment?: Assessment;
  /** Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646. */
  languageCode?: string;
  /** A detailed description of this Vex. */
  longDescription?: string;
  /** A one sentence description of this Vex. */
  shortDescription?: string;
  /** Publisher details of this Note. */
  publisher?: Publisher;
}

export const VulnerabilityAssessmentNote: Schema.Schema<VulnerabilityAssessmentNote> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      product: Schema.optional(Product),
      assessment: Schema.optional(Assessment),
      languageCode: Schema.optional(Schema.String),
      longDescription: Schema.optional(Schema.String),
      shortDescription: Schema.optional(Schema.String),
      publisher: Schema.optional(Publisher),
    }),
  ).annotate({
    identifier: "VulnerabilityAssessmentNote",
  }) as any as Schema.Schema<VulnerabilityAssessmentNote>;

export interface RelationshipNote {
  /** The type of relationship between the source and target SPDX elements */
  type?:
    | "RELATIONSHIP_TYPE_UNSPECIFIED"
    | "DESCRIBES"
    | "DESCRIBED_BY"
    | "CONTAINS"
    | "CONTAINED_BY"
    | "DEPENDS_ON"
    | "DEPENDENCY_OF"
    | "DEPENDENCY_MANIFEST_OF"
    | "BUILD_DEPENDENCY_OF"
    | "DEV_DEPENDENCY_OF"
    | "OPTIONAL_DEPENDENCY_OF"
    | "PROVIDED_DEPENDENCY_OF"
    | "TEST_DEPENDENCY_OF"
    | "RUNTIME_DEPENDENCY_OF"
    | "EXAMPLE_OF"
    | "GENERATES"
    | "GENERATED_FROM"
    | "ANCESTOR_OF"
    | "DESCENDANT_OF"
    | "VARIANT_OF"
    | "DISTRIBUTION_ARTIFACT"
    | "PATCH_FOR"
    | "PATCH_APPLIED"
    | "COPY_OF"
    | "FILE_ADDED"
    | "FILE_DELETED"
    | "FILE_MODIFIED"
    | "EXPANDED_FROM_ARCHIVE"
    | "DYNAMIC_LINK"
    | "STATIC_LINK"
    | "DATA_FILE_OF"
    | "TEST_CASE_OF"
    | "BUILD_TOOL_OF"
    | "DEV_TOOL_OF"
    | "TEST_OF"
    | "TEST_TOOL_OF"
    | "DOCUMENTATION_OF"
    | "OPTIONAL_COMPONENT_OF"
    | "METAFILE_OF"
    | "PACKAGE_OF"
    | "AMENDS"
    | "PREREQUISITE_FOR"
    | "HAS_PREREQUISITE"
    | "OTHER"
    | (string & {});
}

export const RelationshipNote: Schema.Schema<RelationshipNote> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RelationshipNote",
  }) as any as Schema.Schema<RelationshipNote>;

export interface SBOMReferenceNote {
  /** The version of the format that the SBOM takes. E.g. if the format is spdx, the version may be 2.3. */
  version?: string;
  /** The format that SBOM takes. E.g. may be spdx, cyclonedx, etc... */
  format?: string;
}

export const SBOMReferenceNote: Schema.Schema<SBOMReferenceNote> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      format: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SBOMReferenceNote",
  }) as any as Schema.Schema<SBOMReferenceNote>;

export interface Basis {
  /** Required. Immutable. The resource_url for the resource representing the basis of associated occurrence images. */
  resourceUrl?: string;
  /** Required. Immutable. The fingerprint of the base image. */
  fingerprint?: Fingerprint;
}

export const Basis: Schema.Schema<Basis> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceUrl: Schema.optional(Schema.String),
      fingerprint: Schema.optional(Fingerprint),
    }),
  ).annotate({ identifier: "Basis" }) as any as Schema.Schema<Basis>;

export interface ExternalRef {
  /** An External Reference allows a Package to reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package */
  category?:
    | "CATEGORY_UNSPECIFIED"
    | "SECURITY"
    | "PACKAGE_MANAGER"
    | "PERSISTENT_ID"
    | "OTHER"
    | (string & {});
  /** Type of category (e.g. 'npm' for the PACKAGE_MANAGER category) */
  type?: string;
  /** Human-readable information about the purpose and target of the reference */
  comment?: string;
  /** The unique string with no spaces necessary to access the package-specific information, metadata, or content within the target location */
  locator?: string;
}

export const ExternalRef: Schema.Schema<ExternalRef> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      category: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      comment: Schema.optional(Schema.String),
      locator: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExternalRef",
  }) as any as Schema.Schema<ExternalRef>;

export interface PackageInfoNote {
  /** This field provides an independently reproducible mechanism identifying specific contents of a package based on the actual files (except the SPDX file itself, if it is included in the package) that make up each package and that correlates to the data in this SPDX file */
  verificationCode?: string;
  /** Contain the license the SPDX file creator has concluded as governing the This field is to contain a list of all licenses found in the package. The relationship between licenses (i.e., conjunctive, disjunctive) is not specified in this field – it is simply a listing of all licenses found */
  filesLicenseInfo?: Array<string>;
  /** Identify the version of the package */
  version?: string;
  /** A short description of the package */
  summaryDescription?: string;
  /** Provide a place for the SPDX file creator to record a web site that serves as the package's home page */
  homePage?: string;
  /** This section identifies the download Universal Resource Locator (URL), or a specific location within a version control system (VCS) for the package at the time that the SPDX file was created */
  downloadLocation?: string;
  /** The type of package: OS, MAVEN, GO, GO_STDLIB, etc. */
  packageType?: string;
  /** Indicates whether the file content of this package has been available for or subjected to analysis when creating the SPDX document */
  analyzed?: boolean;
  /** List the licenses that have been declared by the authors of the package */
  licenseDeclared?: License;
  /** Identify the full name of the package as given by the Package Originator */
  title?: string;
  /** A more detailed description of the package */
  detailedDescription?: string;
  /** Identify the actual distribution source for the package/directory identified in the SPDX file */
  supplier?: string;
  /** ExternalRef */
  externalRefs?: Array<ExternalRef>;
  /** If the package identified in the SPDX file originated from a different person or organization than identified as Package Supplier, this field identifies from where or whom the package originally came */
  originator?: string;
  /** Identify the copyright holders of the package, as well as any dates present */
  copyright?: string;
  /** Provide an independently reproducible mechanism that permits unique identification of a specific package that correlates to the data in this SPDX file */
  checksum?: string;
  /** A place for the SPDX data creator to record, at the package level, acknowledgements that may be needed to be communicated in some contexts */
  attribution?: string;
}

export const PackageInfoNote: Schema.Schema<PackageInfoNote> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      verificationCode: Schema.optional(Schema.String),
      filesLicenseInfo: Schema.optional(Schema.Array(Schema.String)),
      version: Schema.optional(Schema.String),
      summaryDescription: Schema.optional(Schema.String),
      homePage: Schema.optional(Schema.String),
      downloadLocation: Schema.optional(Schema.String),
      packageType: Schema.optional(Schema.String),
      analyzed: Schema.optional(Schema.Boolean),
      licenseDeclared: Schema.optional(License),
      title: Schema.optional(Schema.String),
      detailedDescription: Schema.optional(Schema.String),
      supplier: Schema.optional(Schema.String),
      externalRefs: Schema.optional(Schema.Array(ExternalRef)),
      originator: Schema.optional(Schema.String),
      copyright: Schema.optional(Schema.String),
      checksum: Schema.optional(Schema.String),
      attribution: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PackageInfoNote",
  }) as any as Schema.Schema<PackageInfoNote>;

export interface FileNote {
  /** Provide a unique identifier to match analysis information on each specific file in a package */
  checksum?: Array<string>;
  /** This field provides information about the type of file identified */
  fileType?:
    | "FILE_TYPE_UNSPECIFIED"
    | "SOURCE"
    | "BINARY"
    | "ARCHIVE"
    | "APPLICATION"
    | "AUDIO"
    | "IMAGE"
    | "TEXT"
    | "VIDEO"
    | "DOCUMENTATION"
    | "SPDX"
    | "OTHER"
    | (string & {});
  /** Identify the full path and filename that corresponds to the file information in this section */
  title?: string;
}

export const FileNote: Schema.Schema<FileNote> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      checksum: Schema.optional(Schema.Array(Schema.String)),
      fileType: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "FileNote" }) as any as Schema.Schema<FileNote>;

export interface BuildSignature {
  /** The type of the key, either stored in `public_key` or referenced in `key_id`. */
  keyType?:
    | "KEY_TYPE_UNSPECIFIED"
    | "PGP_ASCII_ARMORED"
    | "PKIX_PEM"
    | (string & {});
  /** An ID for the key used to sign. This could be either an ID for the key stored in `public_key` (such as the ID or fingerprint for a PGP key, or the CN for a cert), or a reference to an external key (such as a reference to a key in Cloud Key Management Service). */
  keyId?: string;
  /** Required. Signature of the related `BuildProvenance`. In JSON, this is base-64 encoded. */
  signature?: string;
  /** Public key of the builder which can be used to verify that the related findings are valid and unchanged. If `key_type` is empty, this defaults to PEM encoded public keys. This field may be empty if `key_id` references an external key. For Cloud Build based signatures, this is a PEM encoded public key. To verify the Cloud Build signature, place the contents of this field into a file (public.pem). The signature field is base64-decoded into its binary representation in signature.bin, and the provenance bytes from `BuildDetails` are base64-decoded into a binary representation in signed.bin. OpenSSL can then verify the signature: `openssl sha256 -verify public.pem -signature signature.bin signed.bin` */
  publicKey?: string;
}

export const BuildSignature: Schema.Schema<BuildSignature> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      keyType: Schema.optional(Schema.String),
      keyId: Schema.optional(Schema.String),
      signature: Schema.optional(Schema.String),
      publicKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BuildSignature",
  }) as any as Schema.Schema<BuildSignature>;

export interface Build {
  /** Required. Immutable. Version of the builder which produced this build. */
  builderVersion?: string;
  /** Signature of the build in occurrences pointing to this build note containing build details. */
  signature?: BuildSignature;
}

export const Build: Schema.Schema<Build> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      builderVersion: Schema.optional(Schema.String),
      signature: Schema.optional(BuildSignature),
    }),
  ).annotate({ identifier: "Build" }) as any as Schema.Schema<Build>;

export interface Authority {
  /** Hint hints at the purpose of the attestation authority. */
  hint?: Hint;
}

export const Authority: Schema.Schema<Authority> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hint: Schema.optional(Hint),
    }),
  ).annotate({ identifier: "Authority" }) as any as Schema.Schema<Authority>;

export interface Note {
  /** Output only. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name?: string;
  /** A note describing a package vulnerability. */
  vulnerability?: Vulnerability;
  /** A one sentence description of this note. */
  shortDescription?: string;
  /** A note describing something that can be deployed. */
  deployable?: Deployable;
  /** URLs associated with this note. */
  relatedUrl?: Array<RelatedUrl>;
  /** A note describing a software bill of materials. */
  sbom?: DocumentNote;
  /** A note describing a secret. */
  secret?: SecretNote;
  /** A note describing the initial analysis of a resource. */
  discovery?: Discovery;
  /** Output only. The type of analysis. This field can be used as a filter in list requests. */
  kind?:
    | "NOTE_KIND_UNSPECIFIED"
    | "VULNERABILITY"
    | "BUILD"
    | "IMAGE"
    | "PACKAGE"
    | "DEPLOYMENT"
    | "DISCOVERY"
    | "ATTESTATION"
    | "INTOTO"
    | "SBOM"
    | "SPDX_PACKAGE"
    | "SPDX_FILE"
    | "SPDX_RELATIONSHIP"
    | "VULNERABILITY_ASSESSMENT"
    | "SBOM_REFERENCE"
    | "SECRET"
    | (string & {});
  /** Other notes related to this note. */
  relatedNoteNames?: Array<string>;
  /** A note describing an in-toto link. */
  intoto?: InToto;
  /** A detailed description of this note. */
  longDescription?: string;
  /** A note describing a package hosted by various package managers. */
  package?: Package;
  /** A note describing a vulnerability assessment. */
  vulnerabilityAssessment?: VulnerabilityAssessmentNote;
  /** A note describing an SPDX File. */
  spdxRelationship?: RelationshipNote;
  /** Output only. The time this note was created. This field can be used as a filter in list requests. */
  createTime?: string;
  /** A note describing an SBOM reference. */
  sbomReference?: SBOMReferenceNote;
  /** A note describing a base image. */
  baseImage?: Basis;
  /** A note describing an SPDX Package. */
  spdxPackage?: PackageInfoNote;
  /** A note describing an SPDX File. */
  spdxFile?: FileNote;
  /** Time of expiration for this note. Empty if note does not expire. */
  expirationTime?: string;
  /** A note describing build provenance for a verifiable build. */
  build?: Build;
  /** The timestamp when the advisory was first published by the source. */
  advisoryPublishTime?: string;
  /** Output only. The time this note was last updated. This field can be used as a filter in list requests. */
  updateTime?: string;
  /** A note describing an attestation role. */
  attestationAuthority?: Authority;
}

export const Note: Schema.Schema<Note> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      vulnerability: Schema.optional(Vulnerability),
      shortDescription: Schema.optional(Schema.String),
      deployable: Schema.optional(Deployable),
      relatedUrl: Schema.optional(Schema.Array(RelatedUrl)),
      sbom: Schema.optional(DocumentNote),
      secret: Schema.optional(SecretNote),
      discovery: Schema.optional(Discovery),
      kind: Schema.optional(Schema.String),
      relatedNoteNames: Schema.optional(Schema.Array(Schema.String)),
      intoto: Schema.optional(InToto),
      longDescription: Schema.optional(Schema.String),
      package: Schema.optional(Package),
      vulnerabilityAssessment: Schema.optional(VulnerabilityAssessmentNote),
      spdxRelationship: Schema.optional(RelationshipNote),
      createTime: Schema.optional(Schema.String),
      sbomReference: Schema.optional(SBOMReferenceNote),
      baseImage: Schema.optional(Basis),
      spdxPackage: Schema.optional(PackageInfoNote),
      spdxFile: Schema.optional(FileNote),
      expirationTime: Schema.optional(Schema.String),
      build: Schema.optional(Build),
      advisoryPublishTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      attestationAuthority: Schema.optional(Authority),
    }),
  ).annotate({ identifier: "Note" }) as any as Schema.Schema<Note>;

export interface BatchCreateNotesRequest {
  /** Required. The notes to create, the key is expected to be the note ID. Max allowed length is 1000. */
  notes?: Record<string, Note>;
}

export const BatchCreateNotesRequest: Schema.Schema<BatchCreateNotesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      notes: Schema.optional(Schema.Record(Schema.String, Note)),
    }),
  ).annotate({
    identifier: "BatchCreateNotesRequest",
  }) as any as Schema.Schema<BatchCreateNotesRequest>;

export interface Expr {
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
}

export const Expr: Schema.Schema<Expr> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      location: Schema.optional(Schema.String),
      expression: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      members: Schema.optional(Schema.Array(Schema.String)),
      role: Schema.optional(Schema.String),
      condition: Schema.optional(Expr),
    }),
  ).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bindings: Schema.optional(Schema.Array(Binding)),
      etag: Schema.optional(Schema.String),
      version: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface BatchCreateNotesResponse {
  /** The notes that were created. */
  notes?: Array<Note>;
}

export const BatchCreateNotesResponse: Schema.Schema<BatchCreateNotesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      notes: Schema.optional(Schema.Array(Note)),
    }),
  ).annotate({
    identifier: "BatchCreateNotesResponse",
  }) as any as Schema.Schema<BatchCreateNotesResponse>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requestedPolicyVersion: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GetPolicyOptions",
  }) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      options: Schema.optional(GetPolicyOptions),
    }),
  ).annotate({
    identifier: "GetIamPolicyRequest",
  }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface GeneratePackagesSummaryRequest {}

export const GeneratePackagesSummaryRequest: Schema.Schema<GeneratePackagesSummaryRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GeneratePackagesSummaryRequest",
  }) as any as Schema.Schema<GeneratePackagesSummaryRequest>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface BatchCreateOccurrencesRequest {
  /** Required. The occurrences to create. Max allowed length is 1000. */
  occurrences?: Array<Occurrence>;
}

export const BatchCreateOccurrencesRequest: Schema.Schema<BatchCreateOccurrencesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      occurrences: Schema.optional(Schema.Array(Occurrence)),
    }),
  ).annotate({
    identifier: "BatchCreateOccurrencesRequest",
  }) as any as Schema.Schema<BatchCreateOccurrencesRequest>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface BatchCreateOccurrencesResponse {
  /** The occurrences that were created. */
  occurrences?: Array<Occurrence>;
}

export const BatchCreateOccurrencesResponse: Schema.Schema<BatchCreateOccurrencesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      occurrences: Schema.optional(Schema.Array(Occurrence)),
    }),
  ).annotate({
    identifier: "BatchCreateOccurrencesResponse",
  }) as any as Schema.Schema<BatchCreateOccurrencesResponse>;

export interface ListNoteOccurrencesResponse {
  /** The occurrences attached to the specified note. */
  occurrences?: Array<Occurrence>;
  /** Token to provide to skip to a particular spot in the list. */
  nextPageToken?: string;
}

export const ListNoteOccurrencesResponse: Schema.Schema<ListNoteOccurrencesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      occurrences: Schema.optional(Schema.Array(Occurrence)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListNoteOccurrencesResponse",
  }) as any as Schema.Schema<ListNoteOccurrencesResponse>;

export interface ExportSBOMResponse {
  /** The name of the discovery occurrence in the form "projects/{project_id}/occurrences/{OCCURRENCE_ID} It can be used to track the progression of the SBOM export. */
  discoveryOccurrenceId?: string;
}

export const ExportSBOMResponse: Schema.Schema<ExportSBOMResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      discoveryOccurrenceId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExportSBOMResponse",
  }) as any as Schema.Schema<ExportSBOMResponse>;

export interface Volume {
  /** Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. */
  name?: string;
  /** Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. */
  path?: string;
}

export const Volume: Schema.Schema<Volume> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Volume" }) as any as Schema.Schema<Volume>;

export interface PackagesSummaryResponse {
  /** A listing by license name of each of the licenses and their counts. */
  licensesSummary?: Array<LicensesSummary>;
  /** The unique URL of the image or the container for which this summary applies. */
  resourceUrl?: string;
}

export const PackagesSummaryResponse: Schema.Schema<PackagesSummaryResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      licensesSummary: Schema.optional(Schema.Array(LicensesSummary)),
      resourceUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PackagesSummaryResponse",
  }) as any as Schema.Schema<PackagesSummaryResponse>;

export interface ListNotesResponse {
  /** The next pagination token in the list response. It should be used as `page_token` for the following request. An empty value means no more results. */
  nextPageToken?: string;
  /** Unordered list. Unreachable regions. Populated for requests from the global region when `return_partial_success` is set. Format: `projects/[PROJECT_ID]/locations/[LOCATION]` */
  unreachable?: Array<string>;
  /** The notes requested. */
  notes?: Array<Note>;
}

export const ListNotesResponse: Schema.Schema<ListNotesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      notes: Schema.optional(Schema.Array(Note)),
    }),
  ).annotate({
    identifier: "ListNotesResponse",
  }) as any as Schema.Schema<ListNotesResponse>;

export interface StepResult {
  attestationType?: string;
  attestationContentName?: string;
  name?: string;
}

export const StepResult: Schema.Schema<StepResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attestationType: Schema.optional(Schema.String),
      attestationContentName: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "StepResult" }) as any as Schema.Schema<StepResult>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface BuildStep {
  /** Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution. */
  dir?: string;
  /** Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency. */
  id?: string;
  /** Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used. */
  entrypoint?: string;
  /** Output only. Stores timing information for executing this build step. */
  timing?: TimeSpan;
  /** A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. */
  timeout?: string;
  /** Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption. */
  automapSubstitutions?: boolean;
  /** Output only. Return code from running the step. */
  exitCode?: number;
  /** The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. */
  waitFor?: Array<string>;
  results?: Array<StepResult>;
  /** List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<Volume>;
  /** Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field. */
  allowFailure?: boolean;
  /** A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. */
  secretEnv?: Array<string>;
  /** A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. */
  script?: string;
  /** Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses. */
  status?:
    | "STATUS_UNKNOWN"
    | "PENDING"
    | "QUEUING"
    | "QUEUED"
    | "WORKING"
    | "SUCCESS"
    | "FAILURE"
    | "INTERNAL_ERROR"
    | "TIMEOUT"
    | "CANCELLED"
    | "EXPIRED"
    | (string & {});
  /** Remote configuration for the build step. */
  remoteConfig?: string;
  /** Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like "ubuntu", "debian", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step. */
  name?: string;
  /** Output only. Stores timing information for pulling this build step's builder image only. */
  pullTiming?: TimeSpan;
  /** A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments. */
  args?: Array<string>;
  /** Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence. */
  allowExitCodes?: Array<number>;
}

export const BuildStep: Schema.Schema<BuildStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dir: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      entrypoint: Schema.optional(Schema.String),
      timing: Schema.optional(TimeSpan),
      env: Schema.optional(Schema.Array(Schema.String)),
      timeout: Schema.optional(Schema.String),
      automapSubstitutions: Schema.optional(Schema.Boolean),
      exitCode: Schema.optional(Schema.Number),
      waitFor: Schema.optional(Schema.Array(Schema.String)),
      results: Schema.optional(Schema.Array(StepResult)),
      volumes: Schema.optional(Schema.Array(Volume)),
      allowFailure: Schema.optional(Schema.Boolean),
      secretEnv: Schema.optional(Schema.Array(Schema.String)),
      script: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      remoteConfig: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      pullTiming: Schema.optional(TimeSpan),
      args: Schema.optional(Schema.Array(Schema.String)),
      allowExitCodes: Schema.optional(Schema.Array(Schema.Number)),
    }),
  ).annotate({ identifier: "BuildStep" }) as any as Schema.Schema<BuildStep>;

export interface GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata {
  /** Output only. The time this operation was created. */
  createTime?: string;
  /** Output only. The time that this operation was marked completed or failed. */
  endTime?: string;
}

export const GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata>;

export interface ExportSBOMRequest {}

export const ExportSBOMRequest: Schema.Schema<ExportSBOMRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ExportSBOMRequest",
  }) as any as Schema.Schema<ExportSBOMRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetProjectsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const GetProjectsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/occurrences/{occurrencesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsOccurrencesRequest>;

export type GetProjectsOccurrencesResponse = Occurrence;
export const GetProjectsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Occurrence;

export type GetProjectsOccurrencesError = DefaultErrors;

/** Gets the specified occurrence. */
export const getProjectsOccurrences: API.OperationMethod<
  GetProjectsOccurrencesRequest,
  GetProjectsOccurrencesResponse,
  GetProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsOccurrencesRequest,
  output: GetProjectsOccurrencesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/occurrences/{occurrencesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsOccurrencesRequest>;

export type SetIamPolicyProjectsOccurrencesResponse = Policy;
export const SetIamPolicyProjectsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsOccurrencesError = DefaultErrors;

/** Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const setIamPolicyProjectsOccurrences: API.OperationMethod<
  SetIamPolicyProjectsOccurrencesRequest,
  SetIamPolicyProjectsOccurrencesResponse,
  SetIamPolicyProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsOccurrencesRequest,
  output: SetIamPolicyProjectsOccurrencesResponse,
  errors: [],
}));

export interface DeleteProjectsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const DeleteProjectsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/occurrences/{occurrencesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsOccurrencesRequest>;

export type DeleteProjectsOccurrencesResponse = Empty;
export const DeleteProjectsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsOccurrencesError = DefaultErrors;

/** Deletes the specified occurrence. For example, use this method to delete an occurrence when the occurrence is no longer applicable for the given resource. */
export const deleteProjectsOccurrences: API.OperationMethod<
  DeleteProjectsOccurrencesRequest,
  DeleteProjectsOccurrencesResponse,
  DeleteProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsOccurrencesRequest,
  output: DeleteProjectsOccurrencesResponse,
  errors: [],
}));

export interface CreateProjectsOccurrencesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrence is to be created. */
  parent: string;
  /** Request body */
  body?: Occurrence;
}

export const CreateProjectsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Occurrence).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/occurrences",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsOccurrencesRequest>;

export type CreateProjectsOccurrencesResponse = Occurrence;
export const CreateProjectsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Occurrence;

export type CreateProjectsOccurrencesError = DefaultErrors;

/** Creates a new occurrence. */
export const createProjectsOccurrences: API.OperationMethod<
  CreateProjectsOccurrencesRequest,
  CreateProjectsOccurrencesResponse,
  CreateProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsOccurrencesRequest,
  output: CreateProjectsOccurrencesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/occurrences/{occurrencesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsOccurrencesRequest>;

export type TestIamPermissionsProjectsOccurrencesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsOccurrencesError = DefaultErrors;

/** Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const testIamPermissionsProjectsOccurrences: API.OperationMethod<
  TestIamPermissionsProjectsOccurrencesRequest,
  TestIamPermissionsProjectsOccurrencesResponse,
  TestIamPermissionsProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsOccurrencesRequest,
  output: TestIamPermissionsProjectsOccurrencesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/occurrences/{occurrencesId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsOccurrencesRequest>;

export type GetIamPolicyProjectsOccurrencesResponse = Policy;
export const GetIamPolicyProjectsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsOccurrencesError = DefaultErrors;

/** Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const getIamPolicyProjectsOccurrences: API.OperationMethod<
  GetIamPolicyProjectsOccurrencesRequest,
  GetIamPolicyProjectsOccurrencesResponse,
  GetIamPolicyProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsOccurrencesRequest,
  output: GetIamPolicyProjectsOccurrencesResponse,
  errors: [],
}));

export interface GetNotesProjectsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const GetNotesProjectsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/occurrences/{occurrencesId}/notes",
    }),
    svc,
  ) as unknown as Schema.Schema<GetNotesProjectsOccurrencesRequest>;

export type GetNotesProjectsOccurrencesResponse = Note;
export const GetNotesProjectsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Note;

export type GetNotesProjectsOccurrencesError = DefaultErrors;

/** Gets the note attached to the specified occurrence. Consumer projects can use this method to get a note that belongs to a provider project. */
export const getNotesProjectsOccurrences: API.OperationMethod<
  GetNotesProjectsOccurrencesRequest,
  GetNotesProjectsOccurrencesResponse,
  GetNotesProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNotesProjectsOccurrencesRequest,
  output: GetNotesProjectsOccurrencesResponse,
  errors: [],
}));

export interface ListProjectsOccurrencesRequest {
  /** If set, the request will return all reachable Occurrences and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** Required. The name of the project to list occurrences for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
  /** Number of occurrences to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. */
  pageSize?: number;
  /** The filter expression. */
  filter?: string;
}

export const ListProjectsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/occurrences",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsOccurrencesRequest>;

export type ListProjectsOccurrencesResponse = ListOccurrencesResponse;
export const ListProjectsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOccurrencesResponse;

export type ListProjectsOccurrencesError = DefaultErrors;

/** Lists occurrences for the specified project. */
export const listProjectsOccurrences: API.PaginatedOperationMethod<
  ListProjectsOccurrencesRequest,
  ListProjectsOccurrencesResponse,
  ListProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsOccurrencesRequest,
  output: ListProjectsOccurrencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetVulnerabilitySummaryProjectsOccurrencesRequest {
  /** Required. The name of the project to get a vulnerability summary for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
  /** The filter expression. */
  filter?: string;
  /** If set, the request will return all reachable occurrence summaries and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
}

export const GetVulnerabilitySummaryProjectsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/occurrences:vulnerabilitySummary",
    }),
    svc,
  ) as unknown as Schema.Schema<GetVulnerabilitySummaryProjectsOccurrencesRequest>;

export type GetVulnerabilitySummaryProjectsOccurrencesResponse =
  VulnerabilityOccurrencesSummary;
export const GetVulnerabilitySummaryProjectsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ VulnerabilityOccurrencesSummary;

export type GetVulnerabilitySummaryProjectsOccurrencesError = DefaultErrors;

/** Gets a summary of the number and severity of occurrences. */
export const getVulnerabilitySummaryProjectsOccurrences: API.OperationMethod<
  GetVulnerabilitySummaryProjectsOccurrencesRequest,
  GetVulnerabilitySummaryProjectsOccurrencesResponse,
  GetVulnerabilitySummaryProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVulnerabilitySummaryProjectsOccurrencesRequest,
  output: GetVulnerabilitySummaryProjectsOccurrencesResponse,
  errors: [],
}));

export interface PatchProjectsOccurrencesRequest {
  /** The fields to update. */
  updateMask?: string;
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
  /** Request body */
  body?: Occurrence;
}

export const PatchProjectsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Occurrence).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/occurrences/{occurrencesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsOccurrencesRequest>;

export type PatchProjectsOccurrencesResponse = Occurrence;
export const PatchProjectsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Occurrence;

export type PatchProjectsOccurrencesError = DefaultErrors;

/** Updates the specified occurrence. */
export const patchProjectsOccurrences: API.OperationMethod<
  PatchProjectsOccurrencesRequest,
  PatchProjectsOccurrencesResponse,
  PatchProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsOccurrencesRequest,
  output: PatchProjectsOccurrencesResponse,
  errors: [],
}));

export interface BatchCreateProjectsOccurrencesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrences are to be created. */
  parent: string;
  /** Request body */
  body?: BatchCreateOccurrencesRequest;
}

export const BatchCreateProjectsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(BatchCreateOccurrencesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/occurrences:batchCreate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchCreateProjectsOccurrencesRequest>;

export type BatchCreateProjectsOccurrencesResponse =
  BatchCreateOccurrencesResponse;
export const BatchCreateProjectsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ BatchCreateOccurrencesResponse;

export type BatchCreateProjectsOccurrencesError = DefaultErrors;

/** Creates new occurrences in batch. */
export const batchCreateProjectsOccurrences: API.OperationMethod<
  BatchCreateProjectsOccurrencesRequest,
  BatchCreateProjectsOccurrencesResponse,
  BatchCreateProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchCreateProjectsOccurrencesRequest,
  output: BatchCreateProjectsOccurrencesResponse,
  errors: [],
}));

export interface GetProjectsNotesRequest {
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
}

export const GetProjectsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/notes/{notesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsNotesRequest>;

export type GetProjectsNotesResponse = Note;
export const GetProjectsNotesResponse = /*@__PURE__*/ /*#__PURE__*/ Note;

export type GetProjectsNotesError = DefaultErrors;

/** Gets the specified note. */
export const getProjectsNotes: API.OperationMethod<
  GetProjectsNotesRequest,
  GetProjectsNotesResponse,
  GetProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsNotesRequest,
  output: GetProjectsNotesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsNotesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/notes/{notesId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsNotesRequest>;

export type GetIamPolicyProjectsNotesResponse = Policy;
export const GetIamPolicyProjectsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsNotesError = DefaultErrors;

/** Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const getIamPolicyProjectsNotes: API.OperationMethod<
  GetIamPolicyProjectsNotesRequest,
  GetIamPolicyProjectsNotesResponse,
  GetIamPolicyProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsNotesRequest,
  output: GetIamPolicyProjectsNotesResponse,
  errors: [],
}));

export interface CreateProjectsNotesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the note is to be created. */
  parent: string;
  /** Required. The ID to use for this note. */
  noteId?: string;
  /** Request body */
  body?: Note;
}

export const CreateProjectsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    noteId: Schema.optional(Schema.String).pipe(T.HttpQuery("noteId")),
    body: Schema.optional(Note).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/notes",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsNotesRequest>;

export type CreateProjectsNotesResponse = Note;
export const CreateProjectsNotesResponse = /*@__PURE__*/ /*#__PURE__*/ Note;

export type CreateProjectsNotesError = DefaultErrors;

/** Creates a new note. */
export const createProjectsNotes: API.OperationMethod<
  CreateProjectsNotesRequest,
  CreateProjectsNotesResponse,
  CreateProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsNotesRequest,
  output: CreateProjectsNotesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsNotesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/notes/{notesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsNotesRequest>;

export type SetIamPolicyProjectsNotesResponse = Policy;
export const SetIamPolicyProjectsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsNotesError = DefaultErrors;

/** Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const setIamPolicyProjectsNotes: API.OperationMethod<
  SetIamPolicyProjectsNotesRequest,
  SetIamPolicyProjectsNotesResponse,
  SetIamPolicyProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsNotesRequest,
  output: SetIamPolicyProjectsNotesResponse,
  errors: [],
}));

export interface ListProjectsNotesRequest {
  /** If set, the request will return all reachable Notes and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
  /** The filter expression. */
  filter?: string;
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** Required. The name of the project to list notes for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
  /** Number of notes to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. */
  pageSize?: number;
}

export const ListProjectsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/notes" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsNotesRequest>;

export type ListProjectsNotesResponse = ListNotesResponse;
export const ListProjectsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListNotesResponse;

export type ListProjectsNotesError = DefaultErrors;

/** Lists notes for the specified project. */
export const listProjectsNotes: API.PaginatedOperationMethod<
  ListProjectsNotesRequest,
  ListProjectsNotesResponse,
  ListProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsNotesRequest,
  output: ListProjectsNotesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BatchCreateProjectsNotesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the notes are to be created. */
  parent: string;
  /** Request body */
  body?: BatchCreateNotesRequest;
}

export const BatchCreateProjectsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(BatchCreateNotesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/notes:batchCreate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchCreateProjectsNotesRequest>;

export type BatchCreateProjectsNotesResponse = BatchCreateNotesResponse;
export const BatchCreateProjectsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ BatchCreateNotesResponse;

export type BatchCreateProjectsNotesError = DefaultErrors;

/** Creates new notes in batch. */
export const batchCreateProjectsNotes: API.OperationMethod<
  BatchCreateProjectsNotesRequest,
  BatchCreateProjectsNotesResponse,
  BatchCreateProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchCreateProjectsNotesRequest,
  output: BatchCreateProjectsNotesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsNotesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/notes/{notesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsNotesRequest>;

export type TestIamPermissionsProjectsNotesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsNotesError = DefaultErrors;

/** Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const testIamPermissionsProjectsNotes: API.OperationMethod<
  TestIamPermissionsProjectsNotesRequest,
  TestIamPermissionsProjectsNotesResponse,
  TestIamPermissionsProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsNotesRequest,
  output: TestIamPermissionsProjectsNotesResponse,
  errors: [],
}));

export interface DeleteProjectsNotesRequest {
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
}

export const DeleteProjectsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/notes/{notesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsNotesRequest>;

export type DeleteProjectsNotesResponse = Empty;
export const DeleteProjectsNotesResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsNotesError = DefaultErrors;

/** Deletes the specified note. */
export const deleteProjectsNotes: API.OperationMethod<
  DeleteProjectsNotesRequest,
  DeleteProjectsNotesResponse,
  DeleteProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsNotesRequest,
  output: DeleteProjectsNotesResponse,
  errors: [],
}));

export interface PatchProjectsNotesRequest {
  /** The fields to update. */
  updateMask?: string;
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
  /** Request body */
  body?: Note;
}

export const PatchProjectsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Note).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/notes/{notesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsNotesRequest>;

export type PatchProjectsNotesResponse = Note;
export const PatchProjectsNotesResponse = /*@__PURE__*/ /*#__PURE__*/ Note;

export type PatchProjectsNotesError = DefaultErrors;

/** Updates the specified note. */
export const patchProjectsNotes: API.OperationMethod<
  PatchProjectsNotesRequest,
  PatchProjectsNotesResponse,
  PatchProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsNotesRequest,
  output: PatchProjectsNotesResponse,
  errors: [],
}));

export interface ListProjectsNotesOccurrencesRequest {
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** Required. The name of the note to list occurrences for in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
  /** Number of occurrences to return in the list. */
  pageSize?: number;
  /** The filter expression. */
  filter?: string;
}

export const ListProjectsNotesOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    name: Schema.String.pipe(T.HttpPath("name")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/notes/{notesId}/occurrences",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsNotesOccurrencesRequest>;

export type ListProjectsNotesOccurrencesResponse = ListNoteOccurrencesResponse;
export const ListProjectsNotesOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListNoteOccurrencesResponse;

export type ListProjectsNotesOccurrencesError = DefaultErrors;

/** Lists occurrences referencing the specified note. Provider projects can use this method to get all occurrences across consumer projects referencing the specified note. */
export const listProjectsNotesOccurrences: API.PaginatedOperationMethod<
  ListProjectsNotesOccurrencesRequest,
  ListProjectsNotesOccurrencesResponse,
  ListProjectsNotesOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsNotesOccurrencesRequest,
  output: ListProjectsNotesOccurrencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ExportSBOMProjectsResourcesRequest {
  /** Required. The name of the resource in the form of `projects/[PROJECT_ID]/resources/[RESOURCE_URL]`. */
  name: string;
  /** Request body */
  body?: ExportSBOMRequest;
}

export const ExportSBOMProjectsResourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ExportSBOMRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/resources/{resourcesId}:exportSBOM",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExportSBOMProjectsResourcesRequest>;

export type ExportSBOMProjectsResourcesResponse = ExportSBOMResponse;
export const ExportSBOMProjectsResourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ExportSBOMResponse;

export type ExportSBOMProjectsResourcesError = DefaultErrors;

/** Generates an SBOM and other dependency information for the given resource. */
export const exportSBOMProjectsResources: API.OperationMethod<
  ExportSBOMProjectsResourcesRequest,
  ExportSBOMProjectsResourcesResponse,
  ExportSBOMProjectsResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportSBOMProjectsResourcesRequest,
  output: ExportSBOMProjectsResourcesResponse,
  errors: [],
}));

export interface GeneratePackagesSummaryProjectsResourcesRequest {
  /** Required. The name of the resource to get a packages summary for in the form of `projects/[PROJECT_ID]/resources/[RESOURCE_URL]`. */
  name: string;
  /** Request body */
  body?: GeneratePackagesSummaryRequest;
}

export const GeneratePackagesSummaryProjectsResourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GeneratePackagesSummaryRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/resources/{resourcesId}:generatePackagesSummary",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GeneratePackagesSummaryProjectsResourcesRequest>;

export type GeneratePackagesSummaryProjectsResourcesResponse =
  PackagesSummaryResponse;
export const GeneratePackagesSummaryProjectsResourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ PackagesSummaryResponse;

export type GeneratePackagesSummaryProjectsResourcesError = DefaultErrors;

/** Gets a summary of the packages within a given resource. */
export const generatePackagesSummaryProjectsResources: API.OperationMethod<
  GeneratePackagesSummaryProjectsResourcesRequest,
  GeneratePackagesSummaryProjectsResourcesResponse,
  GeneratePackagesSummaryProjectsResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GeneratePackagesSummaryProjectsResourcesRequest,
  output: GeneratePackagesSummaryProjectsResourcesResponse,
  errors: [],
}));

export interface GetNotesProjectsLocationsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const GetNotesProjectsLocationsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}/notes",
    }),
    svc,
  ) as unknown as Schema.Schema<GetNotesProjectsLocationsOccurrencesRequest>;

export type GetNotesProjectsLocationsOccurrencesResponse = Note;
export const GetNotesProjectsLocationsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Note;

export type GetNotesProjectsLocationsOccurrencesError = DefaultErrors;

/** Gets the note attached to the specified occurrence. Consumer projects can use this method to get a note that belongs to a provider project. */
export const getNotesProjectsLocationsOccurrences: API.OperationMethod<
  GetNotesProjectsLocationsOccurrencesRequest,
  GetNotesProjectsLocationsOccurrencesResponse,
  GetNotesProjectsLocationsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNotesProjectsLocationsOccurrencesRequest,
  output: GetNotesProjectsLocationsOccurrencesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const DeleteProjectsLocationsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsOccurrencesRequest>;

export type DeleteProjectsLocationsOccurrencesResponse = Empty;
export const DeleteProjectsLocationsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsOccurrencesError = DefaultErrors;

/** Deletes the specified occurrence. For example, use this method to delete an occurrence when the occurrence is no longer applicable for the given resource. */
export const deleteProjectsLocationsOccurrences: API.OperationMethod<
  DeleteProjectsLocationsOccurrencesRequest,
  DeleteProjectsLocationsOccurrencesResponse,
  DeleteProjectsLocationsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsOccurrencesRequest,
  output: DeleteProjectsLocationsOccurrencesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsOccurrencesRequest {
  /** The fields to update. */
  updateMask?: string;
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
  /** Request body */
  body?: Occurrence;
}

export const PatchProjectsLocationsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Occurrence).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsOccurrencesRequest>;

export type PatchProjectsLocationsOccurrencesResponse = Occurrence;
export const PatchProjectsLocationsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Occurrence;

export type PatchProjectsLocationsOccurrencesError = DefaultErrors;

/** Updates the specified occurrence. */
export const patchProjectsLocationsOccurrences: API.OperationMethod<
  PatchProjectsLocationsOccurrencesRequest,
  PatchProjectsLocationsOccurrencesResponse,
  PatchProjectsLocationsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsOccurrencesRequest,
  output: PatchProjectsLocationsOccurrencesResponse,
  errors: [],
}));

export interface BatchCreateProjectsLocationsOccurrencesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrences are to be created. */
  parent: string;
  /** Request body */
  body?: BatchCreateOccurrencesRequest;
}

export const BatchCreateProjectsLocationsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(BatchCreateOccurrencesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/occurrences:batchCreate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchCreateProjectsLocationsOccurrencesRequest>;

export type BatchCreateProjectsLocationsOccurrencesResponse =
  BatchCreateOccurrencesResponse;
export const BatchCreateProjectsLocationsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ BatchCreateOccurrencesResponse;

export type BatchCreateProjectsLocationsOccurrencesError = DefaultErrors;

/** Creates new occurrences in batch. */
export const batchCreateProjectsLocationsOccurrences: API.OperationMethod<
  BatchCreateProjectsLocationsOccurrencesRequest,
  BatchCreateProjectsLocationsOccurrencesResponse,
  BatchCreateProjectsLocationsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchCreateProjectsLocationsOccurrencesRequest,
  output: BatchCreateProjectsLocationsOccurrencesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsOccurrencesRequest>;

export type TestIamPermissionsProjectsLocationsOccurrencesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsOccurrencesError = DefaultErrors;

/** Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const testIamPermissionsProjectsLocationsOccurrences: API.OperationMethod<
  TestIamPermissionsProjectsLocationsOccurrencesRequest,
  TestIamPermissionsProjectsLocationsOccurrencesResponse,
  TestIamPermissionsProjectsLocationsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsOccurrencesRequest,
  output: TestIamPermissionsProjectsLocationsOccurrencesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsOccurrencesRequest>;

export type SetIamPolicyProjectsLocationsOccurrencesResponse = Policy;
export const SetIamPolicyProjectsLocationsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsOccurrencesError = DefaultErrors;

/** Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const setIamPolicyProjectsLocationsOccurrences: API.OperationMethod<
  SetIamPolicyProjectsLocationsOccurrencesRequest,
  SetIamPolicyProjectsLocationsOccurrencesResponse,
  SetIamPolicyProjectsLocationsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsOccurrencesRequest,
  output: SetIamPolicyProjectsLocationsOccurrencesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsOccurrencesRequest>;

export type GetIamPolicyProjectsLocationsOccurrencesResponse = Policy;
export const GetIamPolicyProjectsLocationsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsOccurrencesError = DefaultErrors;

/** Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const getIamPolicyProjectsLocationsOccurrences: API.OperationMethod<
  GetIamPolicyProjectsLocationsOccurrencesRequest,
  GetIamPolicyProjectsLocationsOccurrencesResponse,
  GetIamPolicyProjectsLocationsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsOccurrencesRequest,
  output: GetIamPolicyProjectsLocationsOccurrencesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsOccurrencesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrence is to be created. */
  parent: string;
  /** Request body */
  body?: Occurrence;
}

export const CreateProjectsLocationsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Occurrence).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/occurrences",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsOccurrencesRequest>;

export type CreateProjectsLocationsOccurrencesResponse = Occurrence;
export const CreateProjectsLocationsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Occurrence;

export type CreateProjectsLocationsOccurrencesError = DefaultErrors;

/** Creates a new occurrence. */
export const createProjectsLocationsOccurrences: API.OperationMethod<
  CreateProjectsLocationsOccurrencesRequest,
  CreateProjectsLocationsOccurrencesResponse,
  CreateProjectsLocationsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsOccurrencesRequest,
  output: CreateProjectsLocationsOccurrencesResponse,
  errors: [],
}));

export interface GetVulnerabilitySummaryProjectsLocationsOccurrencesRequest {
  /** Required. The name of the project to get a vulnerability summary for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
  /** If set, the request will return all reachable occurrence summaries and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
  /** The filter expression. */
  filter?: string;
}

export const GetVulnerabilitySummaryProjectsLocationsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/occurrences:vulnerabilitySummary",
    }),
    svc,
  ) as unknown as Schema.Schema<GetVulnerabilitySummaryProjectsLocationsOccurrencesRequest>;

export type GetVulnerabilitySummaryProjectsLocationsOccurrencesResponse =
  VulnerabilityOccurrencesSummary;
export const GetVulnerabilitySummaryProjectsLocationsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ VulnerabilityOccurrencesSummary;

export type GetVulnerabilitySummaryProjectsLocationsOccurrencesError =
  DefaultErrors;

/** Gets a summary of the number and severity of occurrences. */
export const getVulnerabilitySummaryProjectsLocationsOccurrences: API.OperationMethod<
  GetVulnerabilitySummaryProjectsLocationsOccurrencesRequest,
  GetVulnerabilitySummaryProjectsLocationsOccurrencesResponse,
  GetVulnerabilitySummaryProjectsLocationsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVulnerabilitySummaryProjectsLocationsOccurrencesRequest,
  output: GetVulnerabilitySummaryProjectsLocationsOccurrencesResponse,
  errors: [],
}));

export interface GetProjectsLocationsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const GetProjectsLocationsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOccurrencesRequest>;

export type GetProjectsLocationsOccurrencesResponse = Occurrence;
export const GetProjectsLocationsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Occurrence;

export type GetProjectsLocationsOccurrencesError = DefaultErrors;

/** Gets the specified occurrence. */
export const getProjectsLocationsOccurrences: API.OperationMethod<
  GetProjectsLocationsOccurrencesRequest,
  GetProjectsLocationsOccurrencesResponse,
  GetProjectsLocationsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsOccurrencesRequest,
  output: GetProjectsLocationsOccurrencesResponse,
  errors: [],
}));

export interface ListProjectsLocationsOccurrencesRequest {
  /** Number of occurrences to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. */
  pageSize?: number;
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** The filter expression. */
  filter?: string;
  /** If set, the request will return all reachable Occurrences and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
  /** Required. The name of the project to list occurrences for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
}

export const ListProjectsLocationsOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/occurrences",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsOccurrencesRequest>;

export type ListProjectsLocationsOccurrencesResponse = ListOccurrencesResponse;
export const ListProjectsLocationsOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOccurrencesResponse;

export type ListProjectsLocationsOccurrencesError = DefaultErrors;

/** Lists occurrences for the specified project. */
export const listProjectsLocationsOccurrences: API.PaginatedOperationMethod<
  ListProjectsLocationsOccurrencesRequest,
  ListProjectsLocationsOccurrencesResponse,
  ListProjectsLocationsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsOccurrencesRequest,
  output: ListProjectsLocationsOccurrencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface TestIamPermissionsProjectsLocationsNotesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsNotesRequest>;

export type TestIamPermissionsProjectsLocationsNotesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsNotesError = DefaultErrors;

/** Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const testIamPermissionsProjectsLocationsNotes: API.OperationMethod<
  TestIamPermissionsProjectsLocationsNotesRequest,
  TestIamPermissionsProjectsLocationsNotesResponse,
  TestIamPermissionsProjectsLocationsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsNotesRequest,
  output: TestIamPermissionsProjectsLocationsNotesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsNotesRequest {
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
}

export const DeleteProjectsLocationsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsNotesRequest>;

export type DeleteProjectsLocationsNotesResponse = Empty;
export const DeleteProjectsLocationsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsNotesError = DefaultErrors;

/** Deletes the specified note. */
export const deleteProjectsLocationsNotes: API.OperationMethod<
  DeleteProjectsLocationsNotesRequest,
  DeleteProjectsLocationsNotesResponse,
  DeleteProjectsLocationsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsNotesRequest,
  output: DeleteProjectsLocationsNotesResponse,
  errors: [],
}));

export interface BatchCreateProjectsLocationsNotesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the notes are to be created. */
  parent: string;
  /** Request body */
  body?: BatchCreateNotesRequest;
}

export const BatchCreateProjectsLocationsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(BatchCreateNotesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/notes:batchCreate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchCreateProjectsLocationsNotesRequest>;

export type BatchCreateProjectsLocationsNotesResponse =
  BatchCreateNotesResponse;
export const BatchCreateProjectsLocationsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ BatchCreateNotesResponse;

export type BatchCreateProjectsLocationsNotesError = DefaultErrors;

/** Creates new notes in batch. */
export const batchCreateProjectsLocationsNotes: API.OperationMethod<
  BatchCreateProjectsLocationsNotesRequest,
  BatchCreateProjectsLocationsNotesResponse,
  BatchCreateProjectsLocationsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchCreateProjectsLocationsNotesRequest,
  output: BatchCreateProjectsLocationsNotesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsNotesRequest {
  /** The fields to update. */
  updateMask?: string;
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
  /** Request body */
  body?: Note;
}

export const PatchProjectsLocationsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Note).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsNotesRequest>;

export type PatchProjectsLocationsNotesResponse = Note;
export const PatchProjectsLocationsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Note;

export type PatchProjectsLocationsNotesError = DefaultErrors;

/** Updates the specified note. */
export const patchProjectsLocationsNotes: API.OperationMethod<
  PatchProjectsLocationsNotesRequest,
  PatchProjectsLocationsNotesResponse,
  PatchProjectsLocationsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsNotesRequest,
  output: PatchProjectsLocationsNotesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsNotesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the note is to be created. */
  parent: string;
  /** Required. The ID to use for this note. */
  noteId?: string;
  /** Request body */
  body?: Note;
}

export const CreateProjectsLocationsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    noteId: Schema.optional(Schema.String).pipe(T.HttpQuery("noteId")),
    body: Schema.optional(Note).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/notes",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsNotesRequest>;

export type CreateProjectsLocationsNotesResponse = Note;
export const CreateProjectsLocationsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Note;

export type CreateProjectsLocationsNotesError = DefaultErrors;

/** Creates a new note. */
export const createProjectsLocationsNotes: API.OperationMethod<
  CreateProjectsLocationsNotesRequest,
  CreateProjectsLocationsNotesResponse,
  CreateProjectsLocationsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsNotesRequest,
  output: CreateProjectsLocationsNotesResponse,
  errors: [],
}));

export interface ListProjectsLocationsNotesRequest {
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** If set, the request will return all reachable Notes and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
  /** Number of notes to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. */
  pageSize?: number;
  /** The filter expression. */
  filter?: string;
  /** Required. The name of the project to list notes for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
}

export const ListProjectsLocationsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/notes",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsNotesRequest>;

export type ListProjectsLocationsNotesResponse = ListNotesResponse;
export const ListProjectsLocationsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListNotesResponse;

export type ListProjectsLocationsNotesError = DefaultErrors;

/** Lists notes for the specified project. */
export const listProjectsLocationsNotes: API.PaginatedOperationMethod<
  ListProjectsLocationsNotesRequest,
  ListProjectsLocationsNotesResponse,
  ListProjectsLocationsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsNotesRequest,
  output: ListProjectsLocationsNotesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetIamPolicyProjectsLocationsNotesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}:getIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsNotesRequest>;

export type GetIamPolicyProjectsLocationsNotesResponse = Policy;
export const GetIamPolicyProjectsLocationsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsNotesError = DefaultErrors;

/** Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const getIamPolicyProjectsLocationsNotes: API.OperationMethod<
  GetIamPolicyProjectsLocationsNotesRequest,
  GetIamPolicyProjectsLocationsNotesResponse,
  GetIamPolicyProjectsLocationsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsNotesRequest,
  output: GetIamPolicyProjectsLocationsNotesResponse,
  errors: [],
}));

export interface GetProjectsLocationsNotesRequest {
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
}

export const GetProjectsLocationsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsNotesRequest>;

export type GetProjectsLocationsNotesResponse = Note;
export const GetProjectsLocationsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Note;

export type GetProjectsLocationsNotesError = DefaultErrors;

/** Gets the specified note. */
export const getProjectsLocationsNotes: API.OperationMethod<
  GetProjectsLocationsNotesRequest,
  GetProjectsLocationsNotesResponse,
  GetProjectsLocationsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsNotesRequest,
  output: GetProjectsLocationsNotesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsNotesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsNotesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsNotesRequest>;

export type SetIamPolicyProjectsLocationsNotesResponse = Policy;
export const SetIamPolicyProjectsLocationsNotesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsNotesError = DefaultErrors;

/** Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export const setIamPolicyProjectsLocationsNotes: API.OperationMethod<
  SetIamPolicyProjectsLocationsNotesRequest,
  SetIamPolicyProjectsLocationsNotesResponse,
  SetIamPolicyProjectsLocationsNotesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsNotesRequest,
  output: SetIamPolicyProjectsLocationsNotesResponse,
  errors: [],
}));

export interface ListProjectsLocationsNotesOccurrencesRequest {
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** Required. The name of the note to list occurrences for in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
  /** The filter expression. */
  filter?: string;
  /** Number of occurrences to return in the list. */
  pageSize?: number;
}

export const ListProjectsLocationsNotesOccurrencesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}/occurrences",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsNotesOccurrencesRequest>;

export type ListProjectsLocationsNotesOccurrencesResponse =
  ListNoteOccurrencesResponse;
export const ListProjectsLocationsNotesOccurrencesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListNoteOccurrencesResponse;

export type ListProjectsLocationsNotesOccurrencesError = DefaultErrors;

/** Lists occurrences referencing the specified note. Provider projects can use this method to get all occurrences across consumer projects referencing the specified note. */
export const listProjectsLocationsNotesOccurrences: API.PaginatedOperationMethod<
  ListProjectsLocationsNotesOccurrencesRequest,
  ListProjectsLocationsNotesOccurrencesResponse,
  ListProjectsLocationsNotesOccurrencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsNotesOccurrencesRequest,
  output: ListProjectsLocationsNotesOccurrencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GeneratePackagesSummaryProjectsLocationsResourcesRequest {
  /** Required. The name of the resource to get a packages summary for in the form of `projects/[PROJECT_ID]/resources/[RESOURCE_URL]`. */
  name: string;
  /** Request body */
  body?: GeneratePackagesSummaryRequest;
}

export const GeneratePackagesSummaryProjectsLocationsResourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GeneratePackagesSummaryRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/resources/{resourcesId}:generatePackagesSummary",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GeneratePackagesSummaryProjectsLocationsResourcesRequest>;

export type GeneratePackagesSummaryProjectsLocationsResourcesResponse =
  PackagesSummaryResponse;
export const GeneratePackagesSummaryProjectsLocationsResourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ PackagesSummaryResponse;

export type GeneratePackagesSummaryProjectsLocationsResourcesError =
  DefaultErrors;

/** Gets a summary of the packages within a given resource. */
export const generatePackagesSummaryProjectsLocationsResources: API.OperationMethod<
  GeneratePackagesSummaryProjectsLocationsResourcesRequest,
  GeneratePackagesSummaryProjectsLocationsResourcesResponse,
  GeneratePackagesSummaryProjectsLocationsResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GeneratePackagesSummaryProjectsLocationsResourcesRequest,
  output: GeneratePackagesSummaryProjectsLocationsResourcesResponse,
  errors: [],
}));

export interface ExportSBOMProjectsLocationsResourcesRequest {
  /** Required. The name of the resource in the form of `projects/[PROJECT_ID]/resources/[RESOURCE_URL]`. */
  name: string;
  /** Request body */
  body?: ExportSBOMRequest;
}

export const ExportSBOMProjectsLocationsResourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ExportSBOMRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/resources/{resourcesId}:exportSBOM",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExportSBOMProjectsLocationsResourcesRequest>;

export type ExportSBOMProjectsLocationsResourcesResponse = ExportSBOMResponse;
export const ExportSBOMProjectsLocationsResourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ExportSBOMResponse;

export type ExportSBOMProjectsLocationsResourcesError = DefaultErrors;

/** Generates an SBOM and other dependency information for the given resource. */
export const exportSBOMProjectsLocationsResources: API.OperationMethod<
  ExportSBOMProjectsLocationsResourcesRequest,
  ExportSBOMProjectsLocationsResourcesResponse,
  ExportSBOMProjectsLocationsResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportSBOMProjectsLocationsResourcesRequest,
  output: ExportSBOMProjectsLocationsResourcesResponse,
  errors: [],
}));
