// ==========================================================================
// SAS Portal API (Testing) (prod_tt_sasportal v1alpha1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "prod_tt_sasportal",
  version: "v1alpha1",
  rootUrl: "https://prod-tt-sasportal.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SasPortalAssignment {
  /** The identities the role is assigned to. It can have the following values: * `{user_email}`: An email address that represents a specific Google account. For example: `alice@gmail.com`. * `{group_email}`: An email address that represents a Google group. For example, `viewers@gmail.com`. */
  members?: Array<string>;
  /** Required. Role that is assigned to `members`. */
  role?: string;
}

export const SasPortalAssignment: Schema.Schema<SasPortalAssignment> =
  Schema.suspend(() =>
    Schema.Struct({
      members: Schema.optional(Schema.Array(Schema.String)),
      role: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalAssignment",
  }) as any as Schema.Schema<SasPortalAssignment>;

export interface SasPortalPolicy {
  /** List of assignments */
  assignments?: Array<SasPortalAssignment>;
  /** The etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An etag is returned in the response to GetPolicy, and systems are expected to put that etag in the request to SetPolicy to ensure that their change will be applied to the same version of the policy. If no etag is provided in the call to GetPolicy, then the existing policy is overwritten blindly. */
  etag?: string;
}

export const SasPortalPolicy: Schema.Schema<SasPortalPolicy> = Schema.suspend(
  () =>
    Schema.Struct({
      assignments: Schema.optional(Schema.Array(SasPortalAssignment)),
      etag: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SasPortalPolicy",
}) as any as Schema.Schema<SasPortalPolicy>;

export interface SasPortalSetPolicyRequest {
  /** Optional. Set the field as `true` to disable the onboarding notification. */
  disableNotification?: boolean;
  /** Required. The resource for which the policy is being specified. This policy replaces any existing policy. */
  resource?: string;
  /** Required. The policy to be applied to the `resource`. */
  policy?: SasPortalPolicy;
}

export const SasPortalSetPolicyRequest: Schema.Schema<SasPortalSetPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      disableNotification: Schema.optional(Schema.Boolean),
      resource: Schema.optional(Schema.String),
      policy: Schema.optional(SasPortalPolicy),
    }),
  ).annotate({
    identifier: "SasPortalSetPolicyRequest",
  }) as any as Schema.Schema<SasPortalSetPolicyRequest>;

export interface SasPortalDeploymentAssociation {
  /** GCP project id of the associated project. */
  gcpProjectId?: string;
  /** User id of the deployment. */
  userId?: string;
}

export const SasPortalDeploymentAssociation: Schema.Schema<SasPortalDeploymentAssociation> =
  Schema.suspend(() =>
    Schema.Struct({
      gcpProjectId: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalDeploymentAssociation",
  }) as any as Schema.Schema<SasPortalDeploymentAssociation>;

export interface SasPortalOrganization {
  /** Id of organization */
  id?: string;
  /** Name of organization */
  displayName?: string;
}

export const SasPortalOrganization: Schema.Schema<SasPortalOrganization> =
  Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalOrganization",
  }) as any as Schema.Schema<SasPortalOrganization>;

export interface SasPortalNrqzValidation {
  /** State of the NRQZ validation info. */
  state?: "STATE_UNSPECIFIED" | "DRAFT" | "FINAL" | (string & {});
  /** CPI who signed the validation. */
  cpiId?: string;
  /** Validation case ID. */
  caseId?: string;
  /** Device latitude that's associated with the validation. */
  latitude?: number;
  /** Device longitude that's associated with the validation. */
  longitude?: number;
}

export const SasPortalNrqzValidation: Schema.Schema<SasPortalNrqzValidation> =
  Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      cpiId: Schema.optional(Schema.String),
      caseId: Schema.optional(Schema.String),
      latitude: Schema.optional(Schema.Number),
      longitude: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "SasPortalNrqzValidation",
  }) as any as Schema.Schema<SasPortalNrqzValidation>;

export interface SasPortalDeviceMetadata {
  /** Interference Coordination Group (ICG). A group of CBSDs that manage their own interference with the group. For more details, see [CBRSA-TS-2001 V3.0.0](https://ongoalliance.org/wp-content/uploads/2020/02/CBRSA-TS-2001-V3.0.0_Approved-for-publication.pdf). */
  interferenceCoordinationGroup?: string;
  /** If populated, the Antenna Model Pattern to use. Format is: `RecordCreatorId:PatternId` */
  antennaModel?: string;
  /** Output only. National Radio Quiet Zone validation info. */
  nrqzValidation?: SasPortalNrqzValidation;
  /** Output only. Set to `true` if a CPI has validated that they have coordinated with the National Quiet Zone office. */
  nrqzValidated?: boolean;
  /** Common Channel Group (CCG). A group of CBSDs in the same ICG requesting a common primary channel assignment. For more details, see [CBRSA-TS-2001 V3.0.0](https://ongoalliance.org/wp-content/uploads/2020/02/CBRSA-TS-2001-V3.0.0_Approved-for-publication.pdf). */
  commonChannelGroup?: string;
}

export const SasPortalDeviceMetadata: Schema.Schema<SasPortalDeviceMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      interferenceCoordinationGroup: Schema.optional(Schema.String),
      antennaModel: Schema.optional(Schema.String),
      nrqzValidation: Schema.optional(SasPortalNrqzValidation),
      nrqzValidated: Schema.optional(Schema.Boolean),
      commonChannelGroup: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalDeviceMetadata",
  }) as any as Schema.Schema<SasPortalDeviceMetadata>;

export interface SasPortalDeviceAirInterface {
  /** Optional. This field is related to the `radioTechnology` and provides the air interface specification that the CBSD is compliant with at the time of registration. */
  supportedSpec?: string;
  /** Conditional. This field specifies the radio access technology that is used for the CBSD. */
  radioTechnology?:
    | "RADIO_TECHNOLOGY_UNSPECIFIED"
    | "E_UTRA"
    | "CAMBIUM_NETWORKS"
    | "FOUR_G_BBW_SAA_1"
    | "NR"
    | "DOODLE_CBRS"
    | "CW"
    | "REDLINE"
    | "TARANA_WIRELESS"
    | "FAROS"
    | (string & {});
}

export const SasPortalDeviceAirInterface: Schema.Schema<SasPortalDeviceAirInterface> =
  Schema.suspend(() =>
    Schema.Struct({
      supportedSpec: Schema.optional(Schema.String),
      radioTechnology: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalDeviceAirInterface",
  }) as any as Schema.Schema<SasPortalDeviceAirInterface>;

export interface SasPortalDeviceModel {
  /** The hardware version of the device. */
  hardwareVersion?: string;
  /** The firmware version of the device. */
  firmwareVersion?: string;
  /** The name of the device model. */
  name?: string;
  /** The name of the device vendor. */
  vendor?: string;
  /** The software version of the device. */
  softwareVersion?: string;
}

export const SasPortalDeviceModel: Schema.Schema<SasPortalDeviceModel> =
  Schema.suspend(() =>
    Schema.Struct({
      hardwareVersion: Schema.optional(Schema.String),
      firmwareVersion: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      vendor: Schema.optional(Schema.String),
      softwareVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalDeviceModel",
  }) as any as Schema.Schema<SasPortalDeviceModel>;

export interface SasPortalInstallationParams {
  /** Whether the device antenna is indoor or not. `true`: indoor. `false`: outdoor. */
  indoorDeployment?: boolean;
  /** 3-dB antenna beamwidth of the antenna in the horizontal-plane in degrees. This parameter is an unsigned integer having a value between 0 and 360 (degrees) inclusive; it is optional for Category A devices and conditional for Category B devices. */
  antennaBeamwidth?: number;
  /** This parameter is the maximum device EIRP in units of dBm/10MHz and is an integer with a value between -127 and +47 (dBm/10 MHz) inclusive. If not included, SAS interprets it as maximum allowable EIRP in units of dBm/10MHz for device category. */
  eirpCapability?: number;
  /** Boresight direction of the horizontal plane of the antenna in degrees with respect to true north. The value of this parameter is an integer with a value between 0 and 359 inclusive. A value of 0 degrees means true north; a value of 90 degrees means east. This parameter is optional for Category A devices and conditional for Category B devices. */
  antennaAzimuth?: number;
  /** Longitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -180.000000 to +180.000000. Positive values represent longitudes east of the prime meridian; negative values west of the prime meridian. */
  longitude?: number;
  /** Device antenna height in meters. When the `heightType` parameter value is "AGL", the antenna height should be given relative to ground level. When the `heightType` parameter value is "AMSL", it is given with respect to WGS84 datum. */
  height?: number;
  /** Peak antenna gain in dBi. This parameter is a double with a value between -127 and +128 (dBi) inclusive. Part of Release 2 to support floating-point value */
  antennaGain?: number;
  /** If present, this parameter specifies whether the CBSD is a CPE-CBSD or not. */
  cpeCbsdIndication?: boolean;
  /** A positive number in meters to indicate accuracy of the device antenna vertical location. This optional parameter should only be present if its value is less than the FCC requirement of 3 meters. */
  verticalAccuracy?: number;
  /** A positive number in meters to indicate accuracy of the device antenna horizontal location. This optional parameter should only be present if its value is less than the FCC requirement of 50 meters. */
  horizontalAccuracy?: number;
  /** If an external antenna is used, the antenna model is optionally provided in this field. The string has a maximum length of 128 octets. */
  antennaModel?: string;
  /** Specifies how the height is measured. */
  heightType?:
    | "HEIGHT_TYPE_UNSPECIFIED"
    | "HEIGHT_TYPE_AGL"
    | "HEIGHT_TYPE_AMSL"
    | (string & {});
  /** Antenna downtilt in degrees and is an integer with a value between -90 and +90 inclusive; a negative value means the antenna is tilted up (above horizontal). This parameter is optional for Category A devices and conditional for Category B devices. */
  antennaDowntilt?: number;
  /** Latitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -90.000000 to +90.000000. Positive values represent latitudes north of the equator; negative values south of the equator. */
  latitude?: number;
}

export const SasPortalInstallationParams: Schema.Schema<SasPortalInstallationParams> =
  Schema.suspend(() =>
    Schema.Struct({
      indoorDeployment: Schema.optional(Schema.Boolean),
      antennaBeamwidth: Schema.optional(Schema.Number),
      eirpCapability: Schema.optional(Schema.Number),
      antennaAzimuth: Schema.optional(Schema.Number),
      longitude: Schema.optional(Schema.Number),
      height: Schema.optional(Schema.Number),
      antennaGain: Schema.optional(Schema.Number),
      cpeCbsdIndication: Schema.optional(Schema.Boolean),
      verticalAccuracy: Schema.optional(Schema.Number),
      horizontalAccuracy: Schema.optional(Schema.Number),
      antennaModel: Schema.optional(Schema.String),
      heightType: Schema.optional(Schema.String),
      antennaDowntilt: Schema.optional(Schema.Number),
      latitude: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "SasPortalInstallationParams",
  }) as any as Schema.Schema<SasPortalInstallationParams>;

export interface SasPortalDeviceConfig {
  /** Measurement reporting capabilities of the device. */
  measurementCapabilities?: Array<
    | "MEASUREMENT_CAPABILITY_UNSPECIFIED"
    | "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITH_GRANT"
    | "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITHOUT_GRANT"
    | (string & {})
  >;
  /** State of the configuration. */
  state?: "DEVICE_CONFIG_STATE_UNSPECIFIED" | "DRAFT" | "FINAL" | (string & {});
  /** FCC category of the device. */
  category?:
    | "DEVICE_CATEGORY_UNSPECIFIED"
    | "DEVICE_CATEGORY_A"
    | "DEVICE_CATEGORY_B"
    | (string & {});
  /** The identifier of a device user. */
  userId?: string;
  /** Output only. The last time the device configuration was edited. */
  updateTime?: string;
  /** The call sign of the device operator. */
  callSign?: string;
  /** Information about this device's air interface. */
  airInterface?: SasPortalDeviceAirInterface;
  /** Information about this device model. */
  model?: SasPortalDeviceModel;
  /** Output only. Whether the configuration has been signed by a CPI. */
  isSigned?: boolean;
  /** Installation parameters for the device. */
  installationParams?: SasPortalInstallationParams;
}

export const SasPortalDeviceConfig: Schema.Schema<SasPortalDeviceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      measurementCapabilities: Schema.optional(Schema.Array(Schema.String)),
      state: Schema.optional(Schema.String),
      category: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      callSign: Schema.optional(Schema.String),
      airInterface: Schema.optional(SasPortalDeviceAirInterface),
      model: Schema.optional(SasPortalDeviceModel),
      isSigned: Schema.optional(Schema.Boolean),
      installationParams: Schema.optional(SasPortalInstallationParams),
    }),
  ).annotate({
    identifier: "SasPortalDeviceConfig",
  }) as any as Schema.Schema<SasPortalDeviceConfig>;

export interface SasPortalFrequencyRange {
  /** The lowest frequency of the frequency range in MHz. */
  lowFrequencyMhz?: number;
  /** The highest frequency of the frequency range in MHz. */
  highFrequencyMhz?: number;
}

export const SasPortalFrequencyRange: Schema.Schema<SasPortalFrequencyRange> =
  Schema.suspend(() =>
    Schema.Struct({
      lowFrequencyMhz: Schema.optional(Schema.Number),
      highFrequencyMhz: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "SasPortalFrequencyRange",
  }) as any as Schema.Schema<SasPortalFrequencyRange>;

export interface SasPortalDpaMoveList {
  /** The ID of the DPA. */
  dpaId?: string;
  /** The frequency range that the move list affects. */
  frequencyRange?: SasPortalFrequencyRange;
}

export const SasPortalDpaMoveList: Schema.Schema<SasPortalDpaMoveList> =
  Schema.suspend(() =>
    Schema.Struct({
      dpaId: Schema.optional(Schema.String),
      frequencyRange: Schema.optional(SasPortalFrequencyRange),
    }),
  ).annotate({
    identifier: "SasPortalDpaMoveList",
  }) as any as Schema.Schema<SasPortalDpaMoveList>;

export interface SasPortalDeviceGrant {
  /** The transmission frequency range. */
  frequencyRange?: SasPortalFrequencyRange;
  /** The expiration time of the grant. */
  expireTime?: string;
  /** Grant Id. */
  grantId?: string;
  /** Maximum Equivalent Isotropically Radiated Power (EIRP) permitted by the grant. The maximum EIRP is in units of dBm/MHz. The value of `maxEirp` represents the average (RMS) EIRP that would be measured by the procedure defined in FCC part 96.41(e)(3). */
  maxEirp?: number;
  /** Type of channel used. */
  channelType?:
    | "CHANNEL_TYPE_UNSPECIFIED"
    | "CHANNEL_TYPE_GAA"
    | "CHANNEL_TYPE_PAL"
    | (string & {});
  /** The DPA move lists on which this grant appears. */
  moveList?: Array<SasPortalDpaMoveList>;
  /** The transmit expiration time of the last heartbeat. */
  lastHeartbeatTransmitExpireTime?: string;
  /** State of the grant. */
  state?:
    | "GRANT_STATE_UNSPECIFIED"
    | "GRANT_STATE_GRANTED"
    | "GRANT_STATE_TERMINATED"
    | "GRANT_STATE_SUSPENDED"
    | "GRANT_STATE_AUTHORIZED"
    | "GRANT_STATE_EXPIRED"
    | (string & {});
  /** If the grant is suspended, the reason(s) for suspension. */
  suspensionReason?: Array<string>;
}

export const SasPortalDeviceGrant: Schema.Schema<SasPortalDeviceGrant> =
  Schema.suspend(() =>
    Schema.Struct({
      frequencyRange: Schema.optional(SasPortalFrequencyRange),
      expireTime: Schema.optional(Schema.String),
      grantId: Schema.optional(Schema.String),
      maxEirp: Schema.optional(Schema.Number),
      channelType: Schema.optional(Schema.String),
      moveList: Schema.optional(Schema.Array(SasPortalDpaMoveList)),
      lastHeartbeatTransmitExpireTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      suspensionReason: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "SasPortalDeviceGrant",
  }) as any as Schema.Schema<SasPortalDeviceGrant>;

export interface SasPortalChannelWithScore {
  /** The channel score, normalized to be in the range [0,100]. */
  score?: number;
  /** The frequency range of the channel. */
  frequencyRange?: SasPortalFrequencyRange;
}

export const SasPortalChannelWithScore: Schema.Schema<SasPortalChannelWithScore> =
  Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Number),
      frequencyRange: Schema.optional(SasPortalFrequencyRange),
    }),
  ).annotate({
    identifier: "SasPortalChannelWithScore",
  }) as any as Schema.Schema<SasPortalChannelWithScore>;

export interface SasPortalDevice {
  /** Device parameters that can be overridden by both SAS Portal and SAS registration requests. */
  deviceMetadata?: SasPortalDeviceMetadata;
  /** The FCC identifier of the device. Refer to https://www.fcc.gov/oet/ea/fccid for FccID format. Accept underscores and periods because some test-SAS customers use them. */
  fccId?: string;
  /** Device display name. */
  displayName?: string;
  /** Configuration of the device, as specified via SAS Portal API. */
  preloadedConfig?: SasPortalDeviceConfig;
  /** Output only. Device state. */
  state?:
    | "DEVICE_STATE_UNSPECIFIED"
    | "RESERVED"
    | "REGISTERED"
    | "DEREGISTERED"
    | (string & {});
  /** Output only. The resource path name. */
  name?: string;
  /** Output only. Grants held by the device. */
  grants?: Array<SasPortalDeviceGrant>;
  /** Only ranges that are within the allowlists are available for new grants. */
  grantRangeAllowlists?: Array<SasPortalFrequencyRange>;
  /** A serial number assigned to the device by the device manufacturer. */
  serialNumber?: string;
  /** Output only. Current configuration of the device as registered to the SAS. */
  activeConfig?: SasPortalDeviceConfig;
  /** Output only. Current channels with scores. */
  currentChannels?: Array<SasPortalChannelWithScore>;
}

export const SasPortalDevice: Schema.Schema<SasPortalDevice> = Schema.suspend(
  () =>
    Schema.Struct({
      deviceMetadata: Schema.optional(SasPortalDeviceMetadata),
      fccId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      preloadedConfig: Schema.optional(SasPortalDeviceConfig),
      state: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      grants: Schema.optional(Schema.Array(SasPortalDeviceGrant)),
      grantRangeAllowlists: Schema.optional(
        Schema.Array(SasPortalFrequencyRange),
      ),
      serialNumber: Schema.optional(Schema.String),
      activeConfig: Schema.optional(SasPortalDeviceConfig),
      currentChannels: Schema.optional(Schema.Array(SasPortalChannelWithScore)),
    }),
).annotate({
  identifier: "SasPortalDevice",
}) as any as Schema.Schema<SasPortalDevice>;

export interface SasPortalSignDeviceRequest {
  /** Required. The device to sign. The device fields name, fcc_id and serial_number must be set. The user_id field must be set. */
  device?: SasPortalDevice;
}

export const SasPortalSignDeviceRequest: Schema.Schema<SasPortalSignDeviceRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      device: Schema.optional(SasPortalDevice),
    }),
  ).annotate({
    identifier: "SasPortalSignDeviceRequest",
  }) as any as Schema.Schema<SasPortalSignDeviceRequest>;

export interface SasPortalEmpty {}

export const SasPortalEmpty: Schema.Schema<SasPortalEmpty> = Schema.suspend(
  () => Schema.Struct({}),
).annotate({
  identifier: "SasPortalEmpty",
}) as any as Schema.Schema<SasPortalEmpty>;

export interface SasPortalProvisionDeploymentResponse {
  /** Optional. Optional error message if the provisioning request is not successful. */
  errorMessage?: string;
}

export const SasPortalProvisionDeploymentResponse: Schema.Schema<SasPortalProvisionDeploymentResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      errorMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalProvisionDeploymentResponse",
  }) as any as Schema.Schema<SasPortalProvisionDeploymentResponse>;

export interface SasPortalSetupSasAnalyticsResponse {}

export const SasPortalSetupSasAnalyticsResponse: Schema.Schema<SasPortalSetupSasAnalyticsResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "SasPortalSetupSasAnalyticsResponse",
  }) as any as Schema.Schema<SasPortalSetupSasAnalyticsResponse>;

export interface SasPortalDeployment {
  /** Output only. Resource name. */
  name?: string;
  /** User ID used by the devices belonging to this deployment. Each deployment should be associated with one unique user ID. */
  sasUserIds?: Array<string>;
  /** Output only. The FCC Registration Numbers (FRNs) copied from its direct parent. */
  frns?: Array<string>;
  /** The deployment's display name. */
  displayName?: string;
}

export const SasPortalDeployment: Schema.Schema<SasPortalDeployment> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      sasUserIds: Schema.optional(Schema.Array(Schema.String)),
      frns: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalDeployment",
  }) as any as Schema.Schema<SasPortalDeployment>;

export interface SasPortalListDeploymentsResponse {
  /** The deployments that match the request. */
  deployments?: Array<SasPortalDeployment>;
  /** A pagination token returned from a previous call to ListDeployments that indicates from where listing should continue. If the field is missing or empty, it means there are no more deployments. */
  nextPageToken?: string;
}

export const SasPortalListDeploymentsResponse: Schema.Schema<SasPortalListDeploymentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      deployments: Schema.optional(Schema.Array(SasPortalDeployment)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalListDeploymentsResponse",
  }) as any as Schema.Schema<SasPortalListDeploymentsResponse>;

export interface SasPortalGenerateSecretRequest {}

export const SasPortalGenerateSecretRequest: Schema.Schema<SasPortalGenerateSecretRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "SasPortalGenerateSecretRequest",
  }) as any as Schema.Schema<SasPortalGenerateSecretRequest>;

export interface SasPortalUpdateSignedDeviceRequest {
  /** Required. The JSON Web Token signed using a CPI private key. Payload must be the JSON encoding of the device. The user_id field must be set. */
  encodedDevice?: string;
  /** Required. Unique installer ID (CPI ID) from the Certified Professional Installers database. */
  installerId?: string;
}

export const SasPortalUpdateSignedDeviceRequest: Schema.Schema<SasPortalUpdateSignedDeviceRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      encodedDevice: Schema.optional(Schema.String),
      installerId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalUpdateSignedDeviceRequest",
  }) as any as Schema.Schema<SasPortalUpdateSignedDeviceRequest>;

export interface SasPortalCreateSignedDeviceRequest {
  /** Required. JSON Web Token signed using a CPI private key. Payload must be the JSON encoding of the device. The user_id field must be set. */
  encodedDevice?: string;
  /** Required. Unique installer id (CPI ID) from the Certified Professional Installers database. */
  installerId?: string;
}

export const SasPortalCreateSignedDeviceRequest: Schema.Schema<SasPortalCreateSignedDeviceRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      encodedDevice: Schema.optional(Schema.String),
      installerId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalCreateSignedDeviceRequest",
  }) as any as Schema.Schema<SasPortalCreateSignedDeviceRequest>;

export interface SasPortalProvisionDeploymentRequest {
  /** Optional. If this field is set, and a new SAS Portal Organization needs to be created, its display name will be set to the value of this field. */
  newOrganizationDisplayName?: string;
  /** Optional. If this field is set, and a new SAS Portal Deployment needs to be created, its display name will be set to the value of this field. */
  newDeploymentDisplayName?: string;
  /** Optional. If this field is set then a new deployment will be created under the organization specified by this id. */
  organizationId?: string;
}

export const SasPortalProvisionDeploymentRequest: Schema.Schema<SasPortalProvisionDeploymentRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      newOrganizationDisplayName: Schema.optional(Schema.String),
      newDeploymentDisplayName: Schema.optional(Schema.String),
      organizationId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalProvisionDeploymentRequest",
  }) as any as Schema.Schema<SasPortalProvisionDeploymentRequest>;

export interface SasPortalMigrateOrganizationMetadata {
  /** Output only. Current operation state */
  operationState?:
    | "OPERATION_STATE_UNSPECIFIED"
    | "OPERATION_STATE_PENDING"
    | "OPERATION_STATE_RUNNING"
    | "OPERATION_STATE_SUCCEEDED"
    | "OPERATION_STATE_FAILED"
    | (string & {});
}

export const SasPortalMigrateOrganizationMetadata: Schema.Schema<SasPortalMigrateOrganizationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      operationState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalMigrateOrganizationMetadata",
  }) as any as Schema.Schema<SasPortalMigrateOrganizationMetadata>;

export interface SasPortalMigrateOrganizationResponse {
  /** Optional. A list of deployment association that were created for the migration, or current associations if they already exist. */
  deploymentAssociation?: Array<SasPortalDeploymentAssociation>;
}

export const SasPortalMigrateOrganizationResponse: Schema.Schema<SasPortalMigrateOrganizationResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      deploymentAssociation: Schema.optional(
        Schema.Array(SasPortalDeploymentAssociation),
      ),
    }),
  ).annotate({
    identifier: "SasPortalMigrateOrganizationResponse",
  }) as any as Schema.Schema<SasPortalMigrateOrganizationResponse>;

export interface SasPortalValidateInstallerResponse {}

export const SasPortalValidateInstallerResponse: Schema.Schema<SasPortalValidateInstallerResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "SasPortalValidateInstallerResponse",
  }) as any as Schema.Schema<SasPortalValidateInstallerResponse>;

export interface SasPortalCustomer {
  /** Output only. Resource name of the customer. */
  name?: string;
  /** User IDs used by the devices belonging to this customer. */
  sasUserIds?: Array<string>;
  /** Required. Name of the organization that the customer entity represents. */
  displayName?: string;
}

export const SasPortalCustomer: Schema.Schema<SasPortalCustomer> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      sasUserIds: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalCustomer",
  }) as any as Schema.Schema<SasPortalCustomer>;

export interface SasPortalListCustomersResponse {
  /** A pagination token returned from a previous call to ListCustomers that indicates from where listing should continue. If the field is missing or empty, it means there are no more customers. */
  nextPageToken?: string;
  /** The list of customers that match the request. */
  customers?: Array<SasPortalCustomer>;
}

export const SasPortalListCustomersResponse: Schema.Schema<SasPortalListCustomersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      customers: Schema.optional(Schema.Array(SasPortalCustomer)),
    }),
  ).annotate({
    identifier: "SasPortalListCustomersResponse",
  }) as any as Schema.Schema<SasPortalListCustomersResponse>;

export interface SasPortalMoveDeploymentRequest {
  /** Required. The name of the new parent resource node or customer to reparent the deployment under. */
  destination?: string;
}

export const SasPortalMoveDeploymentRequest: Schema.Schema<SasPortalMoveDeploymentRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      destination: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalMoveDeploymentRequest",
  }) as any as Schema.Schema<SasPortalMoveDeploymentRequest>;

export interface SasPortalMoveNodeRequest {
  /** Required. The name of the new parent resource node or customer to reparent the node under. */
  destination?: string;
}

export const SasPortalMoveNodeRequest: Schema.Schema<SasPortalMoveNodeRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      destination: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalMoveNodeRequest",
  }) as any as Schema.Schema<SasPortalMoveNodeRequest>;

export interface SasPortalStatus {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const SasPortalStatus: Schema.Schema<SasPortalStatus> = Schema.suspend(
  () =>
    Schema.Struct({
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      code: Schema.optional(Schema.Number),
      message: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SasPortalStatus",
}) as any as Schema.Schema<SasPortalStatus>;

export interface SasPortalOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: SasPortalStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const SasPortalOperation: Schema.Schema<SasPortalOperation> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      done: Schema.optional(Schema.Boolean),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      error: Schema.optional(SasPortalStatus),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "SasPortalOperation",
  }) as any as Schema.Schema<SasPortalOperation>;

export interface SasPortalSetupSasAnalyticsRequest {
  /** Optional. User id to setup analytics for, if not provided the user id associated with the project is used. optional */
  userId?: string;
}

export const SasPortalSetupSasAnalyticsRequest: Schema.Schema<SasPortalSetupSasAnalyticsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      userId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalSetupSasAnalyticsRequest",
  }) as any as Schema.Schema<SasPortalSetupSasAnalyticsRequest>;

export interface SasPortalValidateInstallerRequest {
  /** Required. Secret returned by the GenerateSecret. */
  secret?: string;
  /** Required. Unique installer id (CPI ID) from the Certified Professional Installers database. */
  installerId?: string;
  /** Required. JSON Web Token signed using a CPI private key. Payload must include a "secret" claim whose value is the secret. */
  encodedSecret?: string;
}

export const SasPortalValidateInstallerRequest: Schema.Schema<SasPortalValidateInstallerRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      secret: Schema.optional(Schema.String),
      installerId: Schema.optional(Schema.String),
      encodedSecret: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalValidateInstallerRequest",
  }) as any as Schema.Schema<SasPortalValidateInstallerRequest>;

export interface SasPortalGetPolicyRequest {
  /** Required. The resource for which the policy is being requested. */
  resource?: string;
}

export const SasPortalGetPolicyRequest: Schema.Schema<SasPortalGetPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalGetPolicyRequest",
  }) as any as Schema.Schema<SasPortalGetPolicyRequest>;

export interface SasPortalGcpProjectDeployment {
  /** Whether SAS analytics has been enabled. */
  hasEnabledAnalytics?: boolean;
  /** Deployment associated with the GCP project. */
  deployment?: SasPortalDeployment;
}

export const SasPortalGcpProjectDeployment: Schema.Schema<SasPortalGcpProjectDeployment> =
  Schema.suspend(() =>
    Schema.Struct({
      hasEnabledAnalytics: Schema.optional(Schema.Boolean),
      deployment: Schema.optional(SasPortalDeployment),
    }),
  ).annotate({
    identifier: "SasPortalGcpProjectDeployment",
  }) as any as Schema.Schema<SasPortalGcpProjectDeployment>;

export interface SasPortalListGcpProjectDeploymentsResponse {
  /** Optional. Deployments associated with the GCP project */
  deployments?: Array<SasPortalGcpProjectDeployment>;
}

export const SasPortalListGcpProjectDeploymentsResponse: Schema.Schema<SasPortalListGcpProjectDeploymentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      deployments: Schema.optional(Schema.Array(SasPortalGcpProjectDeployment)),
    }),
  ).annotate({
    identifier: "SasPortalListGcpProjectDeploymentsResponse",
  }) as any as Schema.Schema<SasPortalListGcpProjectDeploymentsResponse>;

export interface SasPortalMigrateOrganizationRequest {
  /** Required. Id of the SAS organization to be migrated. */
  organizationId?: string;
}

export const SasPortalMigrateOrganizationRequest: Schema.Schema<SasPortalMigrateOrganizationRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      organizationId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalMigrateOrganizationRequest",
  }) as any as Schema.Schema<SasPortalMigrateOrganizationRequest>;

export interface SasPortalTestPermissionsResponse {
  /** A set of permissions that the caller is allowed. */
  permissions?: Array<string>;
}

export const SasPortalTestPermissionsResponse: Schema.Schema<SasPortalTestPermissionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "SasPortalTestPermissionsResponse",
  }) as any as Schema.Schema<SasPortalTestPermissionsResponse>;

export interface SasPortalNode {
  /** Output only. Resource name. */
  name?: string;
  /** User ids used by the devices belonging to this node. */
  sasUserIds?: Array<string>;
  /** The node's display name. */
  displayName?: string;
}

export const SasPortalNode: Schema.Schema<SasPortalNode> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    sasUserIds: Schema.optional(Schema.Array(Schema.String)),
    displayName: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "SasPortalNode",
}) as any as Schema.Schema<SasPortalNode>;

export interface SasPortalMoveDeviceRequest {
  /** Required. The name of the new parent resource node or customer to reparent the device under. */
  destination?: string;
}

export const SasPortalMoveDeviceRequest: Schema.Schema<SasPortalMoveDeviceRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      destination: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalMoveDeviceRequest",
  }) as any as Schema.Schema<SasPortalMoveDeviceRequest>;

export interface SasPortalTestPermissionsRequest {
  /** Required. The resource for which the permissions are being requested. */
  resource?: string;
  /** The set of permissions to check for the `resource`. */
  permissions?: Array<string>;
}

export const SasPortalTestPermissionsRequest: Schema.Schema<SasPortalTestPermissionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(Schema.String),
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "SasPortalTestPermissionsRequest",
  }) as any as Schema.Schema<SasPortalTestPermissionsRequest>;

export interface SasPortalListDevicesResponse {
  /** The devices that match the request. */
  devices?: Array<SasPortalDevice>;
  /** A pagination token returned from a previous call to ListDevices that indicates from where listing should continue. If the field is missing or empty, it means there is no more devices. */
  nextPageToken?: string;
}

export const SasPortalListDevicesResponse: Schema.Schema<SasPortalListDevicesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      devices: Schema.optional(Schema.Array(SasPortalDevice)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalListDevicesResponse",
  }) as any as Schema.Schema<SasPortalListDevicesResponse>;

export interface SasPortalListNodesResponse {
  /** A pagination token returned from a previous call to ListNodes that indicates from where listing should continue. If the field is missing or empty, it means there is no more nodes. */
  nextPageToken?: string;
  /** The nodes that match the request. */
  nodes?: Array<SasPortalNode>;
}

export const SasPortalListNodesResponse: Schema.Schema<SasPortalListNodesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      nodes: Schema.optional(Schema.Array(SasPortalNode)),
    }),
  ).annotate({
    identifier: "SasPortalListNodesResponse",
  }) as any as Schema.Schema<SasPortalListNodesResponse>;

export interface SasPortalSetupSasAnalyticsMetadata {}

export const SasPortalSetupSasAnalyticsMetadata: Schema.Schema<SasPortalSetupSasAnalyticsMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "SasPortalSetupSasAnalyticsMetadata",
  }) as any as Schema.Schema<SasPortalSetupSasAnalyticsMetadata>;

export interface SasPortalListLegacyOrganizationsResponse {
  /** Optional. Legacy SAS organizations. */
  organizations?: Array<SasPortalOrganization>;
}

export const SasPortalListLegacyOrganizationsResponse: Schema.Schema<SasPortalListLegacyOrganizationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      organizations: Schema.optional(Schema.Array(SasPortalOrganization)),
    }),
  ).annotate({
    identifier: "SasPortalListLegacyOrganizationsResponse",
  }) as any as Schema.Schema<SasPortalListLegacyOrganizationsResponse>;

export interface SasPortalGenerateSecretResponse {
  /** The secret generated by the string and used by ValidateInstaller. */
  secret?: string;
}

export const SasPortalGenerateSecretResponse: Schema.Schema<SasPortalGenerateSecretResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      secret: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SasPortalGenerateSecretResponse",
  }) as any as Schema.Schema<SasPortalGenerateSecretResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetDeploymentsRequest {
  /** Required. The name of the deployment. */
  name: string;
}

export const GetDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetDeploymentsRequest>;

export type GetDeploymentsResponse = SasPortalDeployment;
export const GetDeploymentsResponse = SasPortalDeployment;

export type GetDeploymentsError = DefaultErrors;

/** Returns a requested deployment. */
export const getDeployments: API.OperationMethod<
  GetDeploymentsRequest,
  GetDeploymentsResponse,
  GetDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDeploymentsRequest,
  output: GetDeploymentsResponse,
  errors: [],
}));

export interface DeleteDeploymentsDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const DeleteDeploymentsDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteDeploymentsDevicesRequest>;

export type DeleteDeploymentsDevicesResponse = SasPortalEmpty;
export const DeleteDeploymentsDevicesResponse = SasPortalEmpty;

export type DeleteDeploymentsDevicesError = DefaultErrors;

/** Deletes a device. */
export const deleteDeploymentsDevices: API.OperationMethod<
  DeleteDeploymentsDevicesRequest,
  DeleteDeploymentsDevicesResponse,
  DeleteDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDeploymentsDevicesRequest,
  output: DeleteDeploymentsDevicesResponse,
  errors: [],
}));

export interface SignDeviceDeploymentsDevicesRequest {
  /** Output only. The resource path name. */
  name: string;
  /** Request body */
  body?: SasPortalSignDeviceRequest;
}

export const SignDeviceDeploymentsDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalSignDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}:signDevice",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SignDeviceDeploymentsDevicesRequest>;

export type SignDeviceDeploymentsDevicesResponse = SasPortalEmpty;
export const SignDeviceDeploymentsDevicesResponse = SasPortalEmpty;

export type SignDeviceDeploymentsDevicesError = DefaultErrors;

/** Signs a device. */
export const signDeviceDeploymentsDevices: API.OperationMethod<
  SignDeviceDeploymentsDevicesRequest,
  SignDeviceDeploymentsDevicesResponse,
  SignDeviceDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SignDeviceDeploymentsDevicesRequest,
  output: SignDeviceDeploymentsDevicesResponse,
  errors: [],
}));

export interface GetDeploymentsDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const GetDeploymentsDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetDeploymentsDevicesRequest>;

export type GetDeploymentsDevicesResponse = SasPortalDevice;
export const GetDeploymentsDevicesResponse = SasPortalDevice;

export type GetDeploymentsDevicesError = DefaultErrors;

/** Gets details about a device. */
export const getDeploymentsDevices: API.OperationMethod<
  GetDeploymentsDevicesRequest,
  GetDeploymentsDevicesResponse,
  GetDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDeploymentsDevicesRequest,
  output: GetDeploymentsDevicesResponse,
  errors: [],
}));

export interface PatchDeploymentsDevicesRequest {
  /** Output only. The resource path name. */
  name: string;
  /** Fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: SasPortalDevice;
}

export const PatchDeploymentsDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SasPortalDevice).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchDeploymentsDevicesRequest>;

export type PatchDeploymentsDevicesResponse = SasPortalDevice;
export const PatchDeploymentsDevicesResponse = SasPortalDevice;

export type PatchDeploymentsDevicesError = DefaultErrors;

/** Updates a device. */
export const patchDeploymentsDevices: API.OperationMethod<
  PatchDeploymentsDevicesRequest,
  PatchDeploymentsDevicesResponse,
  PatchDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchDeploymentsDevicesRequest,
  output: PatchDeploymentsDevicesResponse,
  errors: [],
}));

export interface MoveDeploymentsDevicesRequest {
  /** Required. The name of the device to move. */
  name: string;
  /** Request body */
  body?: SasPortalMoveDeviceRequest;
}

export const MoveDeploymentsDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalMoveDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}:move",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<MoveDeploymentsDevicesRequest>;

export type MoveDeploymentsDevicesResponse = SasPortalOperation;
export const MoveDeploymentsDevicesResponse = SasPortalOperation;

export type MoveDeploymentsDevicesError = DefaultErrors;

/** Moves a device under another node or customer. */
export const moveDeploymentsDevices: API.OperationMethod<
  MoveDeploymentsDevicesRequest,
  MoveDeploymentsDevicesResponse,
  MoveDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MoveDeploymentsDevicesRequest,
  output: MoveDeploymentsDevicesResponse,
  errors: [],
}));

export interface UpdateSignedDeploymentsDevicesRequest {
  /** Required. The name of the device to update. */
  name: string;
  /** Request body */
  body?: SasPortalUpdateSignedDeviceRequest;
}

export const UpdateSignedDeploymentsDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalUpdateSignedDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}:updateSigned",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateSignedDeploymentsDevicesRequest>;

export type UpdateSignedDeploymentsDevicesResponse = SasPortalDevice;
export const UpdateSignedDeploymentsDevicesResponse = SasPortalDevice;

export type UpdateSignedDeploymentsDevicesError = DefaultErrors;

/** Updates a signed device. */
export const updateSignedDeploymentsDevices: API.OperationMethod<
  UpdateSignedDeploymentsDevicesRequest,
  UpdateSignedDeploymentsDevicesResponse,
  UpdateSignedDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateSignedDeploymentsDevicesRequest,
  output: UpdateSignedDeploymentsDevicesResponse,
  errors: [],
}));

export interface GenerateSecretInstallerRequest {
  /** Request body */
  body?: SasPortalGenerateSecretRequest;
}

export const GenerateSecretInstallerRequest = Schema.Struct({
  body: Schema.optional(SasPortalGenerateSecretRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/installer:generateSecret",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GenerateSecretInstallerRequest>;

export type GenerateSecretInstallerResponse = SasPortalGenerateSecretResponse;
export const GenerateSecretInstallerResponse = SasPortalGenerateSecretResponse;

export type GenerateSecretInstallerError = DefaultErrors;

/** Generates a secret to be used with the ValidateInstaller. */
export const generateSecretInstaller: API.OperationMethod<
  GenerateSecretInstallerRequest,
  GenerateSecretInstallerResponse,
  GenerateSecretInstallerError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateSecretInstallerRequest,
  output: GenerateSecretInstallerResponse,
  errors: [],
}));

export interface ValidateInstallerRequest {
  /** Request body */
  body?: SasPortalValidateInstallerRequest;
}

export const ValidateInstallerRequest = Schema.Struct({
  body: Schema.optional(SasPortalValidateInstallerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/installer:validate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ValidateInstallerRequest>;

export type ValidateInstallerResponse = SasPortalValidateInstallerResponse;
export const ValidateInstallerResponse = SasPortalValidateInstallerResponse;

export type ValidateInstallerError = DefaultErrors;

/** Validates the identity of a Certified Professional Installer (CPI). */
export const validateInstaller: API.OperationMethod<
  ValidateInstallerRequest,
  ValidateInstallerResponse,
  ValidateInstallerError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ValidateInstallerRequest,
  output: ValidateInstallerResponse,
  errors: [],
}));

export interface SetPoliciesRequest {
  /** Request body */
  body?: SasPortalSetPolicyRequest;
}

export const SetPoliciesRequest = Schema.Struct({
  body: Schema.optional(SasPortalSetPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/policies:set", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetPoliciesRequest>;

export type SetPoliciesResponse = SasPortalPolicy;
export const SetPoliciesResponse = SasPortalPolicy;

export type SetPoliciesError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. */
export const setPolicies: API.OperationMethod<
  SetPoliciesRequest,
  SetPoliciesResponse,
  SetPoliciesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetPoliciesRequest,
  output: SetPoliciesResponse,
  errors: [],
}));

export interface GetPoliciesRequest {
  /** Request body */
  body?: SasPortalGetPolicyRequest;
}

export const GetPoliciesRequest = Schema.Struct({
  body: Schema.optional(SasPortalGetPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/policies:get", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetPoliciesRequest>;

export type GetPoliciesResponse = SasPortalPolicy;
export const GetPoliciesResponse = SasPortalPolicy;

export type GetPoliciesError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getPolicies: API.OperationMethod<
  GetPoliciesRequest,
  GetPoliciesResponse,
  GetPoliciesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPoliciesRequest,
  output: GetPoliciesResponse,
  errors: [],
}));

export interface TestPoliciesRequest {
  /** Request body */
  body?: SasPortalTestPermissionsRequest;
}

export const TestPoliciesRequest = Schema.Struct({
  body: Schema.optional(SasPortalTestPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/policies:test", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestPoliciesRequest>;

export type TestPoliciesResponse = SasPortalTestPermissionsResponse;
export const TestPoliciesResponse = SasPortalTestPermissionsResponse;

export type TestPoliciesError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. */
export const testPolicies: API.OperationMethod<
  TestPoliciesRequest,
  TestPoliciesResponse,
  TestPoliciesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestPoliciesRequest,
  output: TestPoliciesResponse,
  errors: [],
}));

export interface ListCustomersRequest {
  /** The maximum number of customers to return in the response. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListCustomers that indicates where this listing should continue from. */
  pageToken?: string;
}

export const ListCustomersRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers" }),
  svc,
) as unknown as Schema.Schema<ListCustomersRequest>;

export type ListCustomersResponse = SasPortalListCustomersResponse;
export const ListCustomersResponse = SasPortalListCustomersResponse;

export type ListCustomersError = DefaultErrors;

/** Returns a list of requested customers. */
export const listCustomers: API.PaginatedOperationMethod<
  ListCustomersRequest,
  ListCustomersResponse,
  ListCustomersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListCustomersRequest,
  output: ListCustomersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface MigrateOrganizationCustomersRequest {
  /** Request body */
  body?: SasPortalMigrateOrganizationRequest;
}

export const MigrateOrganizationCustomersRequest = Schema.Struct({
  body: Schema.optional(SasPortalMigrateOrganizationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers:migrateOrganization",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<MigrateOrganizationCustomersRequest>;

export type MigrateOrganizationCustomersResponse = SasPortalOperation;
export const MigrateOrganizationCustomersResponse = SasPortalOperation;

export type MigrateOrganizationCustomersError = DefaultErrors;

/** Migrates a SAS organization to the cloud. This will create GCP projects for each deployment and associate them. The SAS Organization is linked to the gcp project that called the command. go/sas-legacy-customer-migration */
export const migrateOrganizationCustomers: API.OperationMethod<
  MigrateOrganizationCustomersRequest,
  MigrateOrganizationCustomersResponse,
  MigrateOrganizationCustomersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MigrateOrganizationCustomersRequest,
  output: MigrateOrganizationCustomersResponse,
  errors: [],
}));

export interface ProvisionDeploymentCustomersRequest {
  /** Request body */
  body?: SasPortalProvisionDeploymentRequest;
}

export const ProvisionDeploymentCustomersRequest = Schema.Struct({
  body: Schema.optional(SasPortalProvisionDeploymentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers:provisionDeployment",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ProvisionDeploymentCustomersRequest>;

export type ProvisionDeploymentCustomersResponse =
  SasPortalProvisionDeploymentResponse;
export const ProvisionDeploymentCustomersResponse =
  SasPortalProvisionDeploymentResponse;

export type ProvisionDeploymentCustomersError = DefaultErrors;

/** Creates a new SAS deployment through the GCP workflow. Creates a SAS organization if an organization match is not found. */
export const provisionDeploymentCustomers: API.OperationMethod<
  ProvisionDeploymentCustomersRequest,
  ProvisionDeploymentCustomersResponse,
  ProvisionDeploymentCustomersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ProvisionDeploymentCustomersRequest,
  output: ProvisionDeploymentCustomersResponse,
  errors: [],
}));

export interface PatchCustomersRequest {
  /** Fields to be updated. */
  updateMask?: string;
  /** Output only. Resource name of the customer. */
  name: string;
  /** Request body */
  body?: SasPortalCustomer;
}

export const PatchCustomersRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalCustomer).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/customers/{customersId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchCustomersRequest>;

export type PatchCustomersResponse = SasPortalCustomer;
export const PatchCustomersResponse = SasPortalCustomer;

export type PatchCustomersError = DefaultErrors;

/** Updates an existing customer. */
export const patchCustomers: API.OperationMethod<
  PatchCustomersRequest,
  PatchCustomersResponse,
  PatchCustomersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchCustomersRequest,
  output: PatchCustomersResponse,
  errors: [],
}));

export interface ListLegacyOrganizationsCustomersRequest {}

export const ListLegacyOrganizationsCustomersRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers:listLegacyOrganizations" }),
  svc,
) as unknown as Schema.Schema<ListLegacyOrganizationsCustomersRequest>;

export type ListLegacyOrganizationsCustomersResponse =
  SasPortalListLegacyOrganizationsResponse;
export const ListLegacyOrganizationsCustomersResponse =
  SasPortalListLegacyOrganizationsResponse;

export type ListLegacyOrganizationsCustomersError = DefaultErrors;

/** Returns a list of legacy organizations. */
export const listLegacyOrganizationsCustomers: API.OperationMethod<
  ListLegacyOrganizationsCustomersRequest,
  ListLegacyOrganizationsCustomersResponse,
  ListLegacyOrganizationsCustomersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListLegacyOrganizationsCustomersRequest,
  output: ListLegacyOrganizationsCustomersResponse,
  errors: [],
}));

export interface ListGcpProjectDeploymentsCustomersRequest {}

export const ListGcpProjectDeploymentsCustomersRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/customers:listGcpProjectDeployments",
  }),
  svc,
) as unknown as Schema.Schema<ListGcpProjectDeploymentsCustomersRequest>;

export type ListGcpProjectDeploymentsCustomersResponse =
  SasPortalListGcpProjectDeploymentsResponse;
export const ListGcpProjectDeploymentsCustomersResponse =
  SasPortalListGcpProjectDeploymentsResponse;

export type ListGcpProjectDeploymentsCustomersError = DefaultErrors;

/** Returns a list of SAS deployments associated with current GCP project. Includes whether SAS analytics has been enabled or not. */
export const listGcpProjectDeploymentsCustomers: API.OperationMethod<
  ListGcpProjectDeploymentsCustomersRequest,
  ListGcpProjectDeploymentsCustomersResponse,
  ListGcpProjectDeploymentsCustomersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListGcpProjectDeploymentsCustomersRequest,
  output: ListGcpProjectDeploymentsCustomersResponse,
  errors: [],
}));

export interface GetCustomersRequest {
  /** Required. The name of the customer. */
  name: string;
}

export const GetCustomersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersRequest>;

export type GetCustomersResponse = SasPortalCustomer;
export const GetCustomersResponse = SasPortalCustomer;

export type GetCustomersError = DefaultErrors;

/** Returns a requested customer. */
export const getCustomers: API.OperationMethod<
  GetCustomersRequest,
  GetCustomersResponse,
  GetCustomersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCustomersRequest,
  output: GetCustomersResponse,
  errors: [],
}));

export interface SetupSasAnalyticsCustomersRequest {
  /** Request body */
  body?: SasPortalSetupSasAnalyticsRequest;
}

export const SetupSasAnalyticsCustomersRequest = Schema.Struct({
  body: Schema.optional(SasPortalSetupSasAnalyticsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers:setupSasAnalytics",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetupSasAnalyticsCustomersRequest>;

export type SetupSasAnalyticsCustomersResponse = SasPortalOperation;
export const SetupSasAnalyticsCustomersResponse = SasPortalOperation;

export type SetupSasAnalyticsCustomersError = DefaultErrors;

/** Setups the a GCP Project to receive SAS Analytics messages via GCP Pub/Sub with a subscription to BigQuery. All the Pub/Sub topics and BigQuery tables are created automatically as part of this service. */
export const setupSasAnalyticsCustomers: API.OperationMethod<
  SetupSasAnalyticsCustomersRequest,
  SetupSasAnalyticsCustomersResponse,
  SetupSasAnalyticsCustomersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetupSasAnalyticsCustomersRequest,
  output: SetupSasAnalyticsCustomersResponse,
  errors: [],
}));

export interface CreateCustomersDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalDevice;
}

export const CreateCustomersDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalDevice).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/devices",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateCustomersDevicesRequest>;

export type CreateCustomersDevicesResponse = SasPortalDevice;
export const CreateCustomersDevicesResponse = SasPortalDevice;

export type CreateCustomersDevicesError = DefaultErrors;

/** Creates a device under a node or customer. */
export const createCustomersDevices: API.OperationMethod<
  CreateCustomersDevicesRequest,
  CreateCustomersDevicesResponse,
  CreateCustomersDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCustomersDevicesRequest,
  output: CreateCustomersDevicesResponse,
  errors: [],
}));

export interface CreateSignedCustomersDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalCreateSignedDeviceRequest;
}

export const CreateSignedCustomersDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalCreateSignedDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/devices:createSigned",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateSignedCustomersDevicesRequest>;

export type CreateSignedCustomersDevicesResponse = SasPortalDevice;
export const CreateSignedCustomersDevicesResponse = SasPortalDevice;

export type CreateSignedCustomersDevicesError = DefaultErrors;

/** Creates a signed device under a node or customer. */
export const createSignedCustomersDevices: API.OperationMethod<
  CreateSignedCustomersDevicesRequest,
  CreateSignedCustomersDevicesResponse,
  CreateSignedCustomersDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSignedCustomersDevicesRequest,
  output: CreateSignedCustomersDevicesResponse,
  errors: [],
}));

export interface MoveCustomersDevicesRequest {
  /** Required. The name of the device to move. */
  name: string;
  /** Request body */
  body?: SasPortalMoveDeviceRequest;
}

export const MoveCustomersDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalMoveDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/devices/{devicesId}:move",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<MoveCustomersDevicesRequest>;

export type MoveCustomersDevicesResponse = SasPortalOperation;
export const MoveCustomersDevicesResponse = SasPortalOperation;

export type MoveCustomersDevicesError = DefaultErrors;

/** Moves a device under another node or customer. */
export const moveCustomersDevices: API.OperationMethod<
  MoveCustomersDevicesRequest,
  MoveCustomersDevicesResponse,
  MoveCustomersDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MoveCustomersDevicesRequest,
  output: MoveCustomersDevicesResponse,
  errors: [],
}));

export interface ListCustomersDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000]. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListDevices that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive. */
  filter?: string;
}

export const ListCustomersDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}/devices" }),
  svc,
) as unknown as Schema.Schema<ListCustomersDevicesRequest>;

export type ListCustomersDevicesResponse = SasPortalListDevicesResponse;
export const ListCustomersDevicesResponse = SasPortalListDevicesResponse;

export type ListCustomersDevicesError = DefaultErrors;

/** Lists devices under a node or customer. */
export const listCustomersDevices: API.PaginatedOperationMethod<
  ListCustomersDevicesRequest,
  ListCustomersDevicesResponse,
  ListCustomersDevicesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListCustomersDevicesRequest,
  output: ListCustomersDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdateSignedCustomersDevicesRequest {
  /** Required. The name of the device to update. */
  name: string;
  /** Request body */
  body?: SasPortalUpdateSignedDeviceRequest;
}

export const UpdateSignedCustomersDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalUpdateSignedDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/customers/{customersId}/devices/{devicesId}:updateSigned",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateSignedCustomersDevicesRequest>;

export type UpdateSignedCustomersDevicesResponse = SasPortalDevice;
export const UpdateSignedCustomersDevicesResponse = SasPortalDevice;

export type UpdateSignedCustomersDevicesError = DefaultErrors;

/** Updates a signed device. */
export const updateSignedCustomersDevices: API.OperationMethod<
  UpdateSignedCustomersDevicesRequest,
  UpdateSignedCustomersDevicesResponse,
  UpdateSignedCustomersDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateSignedCustomersDevicesRequest,
  output: UpdateSignedCustomersDevicesResponse,
  errors: [],
}));

export interface GetCustomersDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const GetCustomersDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/customers/{customersId}/devices/{devicesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetCustomersDevicesRequest>;

export type GetCustomersDevicesResponse = SasPortalDevice;
export const GetCustomersDevicesResponse = SasPortalDevice;

export type GetCustomersDevicesError = DefaultErrors;

/** Gets details about a device. */
export const getCustomersDevices: API.OperationMethod<
  GetCustomersDevicesRequest,
  GetCustomersDevicesResponse,
  GetCustomersDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCustomersDevicesRequest,
  output: GetCustomersDevicesResponse,
  errors: [],
}));

export interface DeleteCustomersDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const DeleteCustomersDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/customers/{customersId}/devices/{devicesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteCustomersDevicesRequest>;

export type DeleteCustomersDevicesResponse = SasPortalEmpty;
export const DeleteCustomersDevicesResponse = SasPortalEmpty;

export type DeleteCustomersDevicesError = DefaultErrors;

/** Deletes a device. */
export const deleteCustomersDevices: API.OperationMethod<
  DeleteCustomersDevicesRequest,
  DeleteCustomersDevicesResponse,
  DeleteCustomersDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteCustomersDevicesRequest,
  output: DeleteCustomersDevicesResponse,
  errors: [],
}));

export interface SignDeviceCustomersDevicesRequest {
  /** Output only. The resource path name. */
  name: string;
  /** Request body */
  body?: SasPortalSignDeviceRequest;
}

export const SignDeviceCustomersDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalSignDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/devices/{devicesId}:signDevice",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SignDeviceCustomersDevicesRequest>;

export type SignDeviceCustomersDevicesResponse = SasPortalEmpty;
export const SignDeviceCustomersDevicesResponse = SasPortalEmpty;

export type SignDeviceCustomersDevicesError = DefaultErrors;

/** Signs a device. */
export const signDeviceCustomersDevices: API.OperationMethod<
  SignDeviceCustomersDevicesRequest,
  SignDeviceCustomersDevicesResponse,
  SignDeviceCustomersDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SignDeviceCustomersDevicesRequest,
  output: SignDeviceCustomersDevicesResponse,
  errors: [],
}));

export interface PatchCustomersDevicesRequest {
  /** Output only. The resource path name. */
  name: string;
  /** Fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: SasPortalDevice;
}

export const PatchCustomersDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SasPortalDevice).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/customers/{customersId}/devices/{devicesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchCustomersDevicesRequest>;

export type PatchCustomersDevicesResponse = SasPortalDevice;
export const PatchCustomersDevicesResponse = SasPortalDevice;

export type PatchCustomersDevicesError = DefaultErrors;

/** Updates a device. */
export const patchCustomersDevices: API.OperationMethod<
  PatchCustomersDevicesRequest,
  PatchCustomersDevicesResponse,
  PatchCustomersDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchCustomersDevicesRequest,
  output: PatchCustomersDevicesResponse,
  errors: [],
}));

export interface CreateCustomersDeploymentsRequest {
  /** Required. The parent resource name where the deployment is to be created. */
  parent: string;
  /** Request body */
  body?: SasPortalDeployment;
}

export const CreateCustomersDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/deployments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateCustomersDeploymentsRequest>;

export type CreateCustomersDeploymentsResponse = SasPortalDeployment;
export const CreateCustomersDeploymentsResponse = SasPortalDeployment;

export type CreateCustomersDeploymentsError = DefaultErrors;

/** Creates a new deployment. */
export const createCustomersDeployments: API.OperationMethod<
  CreateCustomersDeploymentsRequest,
  CreateCustomersDeploymentsResponse,
  CreateCustomersDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCustomersDeploymentsRequest,
  output: CreateCustomersDeploymentsResponse,
  errors: [],
}));

export interface ListCustomersDeploymentsRequest {
  /** Required. The parent resource name, for example, "nodes/1", customer/1/nodes/2. */
  parent: string;
  /** The maximum number of deployments to return in the response. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListDeployments that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no deployments are filtered. */
  filter?: string;
}

export const ListCustomersDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/customers/{customersId}/deployments",
  }),
  svc,
) as unknown as Schema.Schema<ListCustomersDeploymentsRequest>;

export type ListCustomersDeploymentsResponse = SasPortalListDeploymentsResponse;
export const ListCustomersDeploymentsResponse =
  SasPortalListDeploymentsResponse;

export type ListCustomersDeploymentsError = DefaultErrors;

/** Lists deployments. */
export const listCustomersDeployments: API.PaginatedOperationMethod<
  ListCustomersDeploymentsRequest,
  ListCustomersDeploymentsResponse,
  ListCustomersDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListCustomersDeploymentsRequest,
  output: ListCustomersDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface MoveCustomersDeploymentsRequest {
  /** Required. The name of the deployment to move. */
  name: string;
  /** Request body */
  body?: SasPortalMoveDeploymentRequest;
}

export const MoveCustomersDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalMoveDeploymentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}:move",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<MoveCustomersDeploymentsRequest>;

export type MoveCustomersDeploymentsResponse = SasPortalOperation;
export const MoveCustomersDeploymentsResponse = SasPortalOperation;

export type MoveCustomersDeploymentsError = DefaultErrors;

/** Moves a deployment under another node or customer. */
export const moveCustomersDeployments: API.OperationMethod<
  MoveCustomersDeploymentsRequest,
  MoveCustomersDeploymentsResponse,
  MoveCustomersDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MoveCustomersDeploymentsRequest,
  output: MoveCustomersDeploymentsResponse,
  errors: [],
}));

export interface PatchCustomersDeploymentsRequest {
  /** Fields to be updated. */
  updateMask?: string;
  /** Output only. Resource name. */
  name: string;
  /** Request body */
  body?: SasPortalDeployment;
}

export const PatchCustomersDeploymentsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchCustomersDeploymentsRequest>;

export type PatchCustomersDeploymentsResponse = SasPortalDeployment;
export const PatchCustomersDeploymentsResponse = SasPortalDeployment;

export type PatchCustomersDeploymentsError = DefaultErrors;

/** Updates an existing deployment. */
export const patchCustomersDeployments: API.OperationMethod<
  PatchCustomersDeploymentsRequest,
  PatchCustomersDeploymentsResponse,
  PatchCustomersDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchCustomersDeploymentsRequest,
  output: PatchCustomersDeploymentsResponse,
  errors: [],
}));

export interface DeleteCustomersDeploymentsRequest {
  /** Required. The name of the deployment. */
  name: string;
}

export const DeleteCustomersDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteCustomersDeploymentsRequest>;

export type DeleteCustomersDeploymentsResponse = SasPortalEmpty;
export const DeleteCustomersDeploymentsResponse = SasPortalEmpty;

export type DeleteCustomersDeploymentsError = DefaultErrors;

/** Deletes a deployment. */
export const deleteCustomersDeployments: API.OperationMethod<
  DeleteCustomersDeploymentsRequest,
  DeleteCustomersDeploymentsResponse,
  DeleteCustomersDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteCustomersDeploymentsRequest,
  output: DeleteCustomersDeploymentsResponse,
  errors: [],
}));

export interface GetCustomersDeploymentsRequest {
  /** Required. The name of the deployment. */
  name: string;
}

export const GetCustomersDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetCustomersDeploymentsRequest>;

export type GetCustomersDeploymentsResponse = SasPortalDeployment;
export const GetCustomersDeploymentsResponse = SasPortalDeployment;

export type GetCustomersDeploymentsError = DefaultErrors;

/** Returns a requested deployment. */
export const getCustomersDeployments: API.OperationMethod<
  GetCustomersDeploymentsRequest,
  GetCustomersDeploymentsResponse,
  GetCustomersDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCustomersDeploymentsRequest,
  output: GetCustomersDeploymentsResponse,
  errors: [],
}));

export interface CreateSignedCustomersDeploymentsDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalCreateSignedDeviceRequest;
}

export const CreateSignedCustomersDeploymentsDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalCreateSignedDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}/devices:createSigned",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateSignedCustomersDeploymentsDevicesRequest>;

export type CreateSignedCustomersDeploymentsDevicesResponse = SasPortalDevice;
export const CreateSignedCustomersDeploymentsDevicesResponse = SasPortalDevice;

export type CreateSignedCustomersDeploymentsDevicesError = DefaultErrors;

/** Creates a signed device under a node or customer. */
export const createSignedCustomersDeploymentsDevices: API.OperationMethod<
  CreateSignedCustomersDeploymentsDevicesRequest,
  CreateSignedCustomersDeploymentsDevicesResponse,
  CreateSignedCustomersDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSignedCustomersDeploymentsDevicesRequest,
  output: CreateSignedCustomersDeploymentsDevicesResponse,
  errors: [],
}));

export interface CreateCustomersDeploymentsDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalDevice;
}

export const CreateCustomersDeploymentsDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalDevice).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}/devices",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateCustomersDeploymentsDevicesRequest>;

export type CreateCustomersDeploymentsDevicesResponse = SasPortalDevice;
export const CreateCustomersDeploymentsDevicesResponse = SasPortalDevice;

export type CreateCustomersDeploymentsDevicesError = DefaultErrors;

/** Creates a device under a node or customer. */
export const createCustomersDeploymentsDevices: API.OperationMethod<
  CreateCustomersDeploymentsDevicesRequest,
  CreateCustomersDeploymentsDevicesResponse,
  CreateCustomersDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCustomersDeploymentsDevicesRequest,
  output: CreateCustomersDeploymentsDevicesResponse,
  errors: [],
}));

export interface ListCustomersDeploymentsDevicesRequest {
  /** The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive. */
  filter?: string;
  /** A pagination token returned from a previous call to ListDevices that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The name of the parent resource. */
  parent: string;
  /** The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000]. */
  pageSize?: number;
}

export const ListCustomersDeploymentsDevicesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}/devices",
  }),
  svc,
) as unknown as Schema.Schema<ListCustomersDeploymentsDevicesRequest>;

export type ListCustomersDeploymentsDevicesResponse =
  SasPortalListDevicesResponse;
export const ListCustomersDeploymentsDevicesResponse =
  SasPortalListDevicesResponse;

export type ListCustomersDeploymentsDevicesError = DefaultErrors;

/** Lists devices under a node or customer. */
export const listCustomersDeploymentsDevices: API.PaginatedOperationMethod<
  ListCustomersDeploymentsDevicesRequest,
  ListCustomersDeploymentsDevicesResponse,
  ListCustomersDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListCustomersDeploymentsDevicesRequest,
  output: ListCustomersDeploymentsDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchCustomersNodesRequest {
  /** Output only. Resource name. */
  name: string;
  /** Fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: SasPortalNode;
}

export const PatchCustomersNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SasPortalNode).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/customers/{customersId}/nodes/{nodesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchCustomersNodesRequest>;

export type PatchCustomersNodesResponse = SasPortalNode;
export const PatchCustomersNodesResponse = SasPortalNode;

export type PatchCustomersNodesError = DefaultErrors;

/** Updates an existing node. */
export const patchCustomersNodes: API.OperationMethod<
  PatchCustomersNodesRequest,
  PatchCustomersNodesResponse,
  PatchCustomersNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchCustomersNodesRequest,
  output: PatchCustomersNodesResponse,
  errors: [],
}));

export interface GetCustomersNodesRequest {
  /** Required. The name of the node. */
  name: string;
}

export const GetCustomersNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/customers/{customersId}/nodes/{nodesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetCustomersNodesRequest>;

export type GetCustomersNodesResponse = SasPortalNode;
export const GetCustomersNodesResponse = SasPortalNode;

export type GetCustomersNodesError = DefaultErrors;

/** Returns a requested node. */
export const getCustomersNodes: API.OperationMethod<
  GetCustomersNodesRequest,
  GetCustomersNodesResponse,
  GetCustomersNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCustomersNodesRequest,
  output: GetCustomersNodesResponse,
  errors: [],
}));

export interface DeleteCustomersNodesRequest {
  /** Required. The name of the node. */
  name: string;
}

export const DeleteCustomersNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/customers/{customersId}/nodes/{nodesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteCustomersNodesRequest>;

export type DeleteCustomersNodesResponse = SasPortalEmpty;
export const DeleteCustomersNodesResponse = SasPortalEmpty;

export type DeleteCustomersNodesError = DefaultErrors;

/** Deletes a node. */
export const deleteCustomersNodes: API.OperationMethod<
  DeleteCustomersNodesRequest,
  DeleteCustomersNodesResponse,
  DeleteCustomersNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteCustomersNodesRequest,
  output: DeleteCustomersNodesResponse,
  errors: [],
}));

export interface ListCustomersNodesRequest {
  /** A pagination token returned from a previous call to ListNodes that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The parent resource name, for example, "nodes/1". */
  parent: string;
  /** The maximum number of nodes to return in the response. */
  pageSize?: number;
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no nodes are filtered. */
  filter?: string;
}

export const ListCustomersNodesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}/nodes" }),
  svc,
) as unknown as Schema.Schema<ListCustomersNodesRequest>;

export type ListCustomersNodesResponse = SasPortalListNodesResponse;
export const ListCustomersNodesResponse = SasPortalListNodesResponse;

export type ListCustomersNodesError = DefaultErrors;

/** Lists nodes. */
export const listCustomersNodes: API.PaginatedOperationMethod<
  ListCustomersNodesRequest,
  ListCustomersNodesResponse,
  ListCustomersNodesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListCustomersNodesRequest,
  output: ListCustomersNodesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateCustomersNodesRequest {
  /** Required. The parent resource name where the node is to be created. */
  parent: string;
  /** Request body */
  body?: SasPortalNode;
}

export const CreateCustomersNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalNode).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/nodes",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateCustomersNodesRequest>;

export type CreateCustomersNodesResponse = SasPortalNode;
export const CreateCustomersNodesResponse = SasPortalNode;

export type CreateCustomersNodesError = DefaultErrors;

/** Creates a new node. */
export const createCustomersNodes: API.OperationMethod<
  CreateCustomersNodesRequest,
  CreateCustomersNodesResponse,
  CreateCustomersNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCustomersNodesRequest,
  output: CreateCustomersNodesResponse,
  errors: [],
}));

export interface MoveCustomersNodesRequest {
  /** Required. The name of the node to move. */
  name: string;
  /** Request body */
  body?: SasPortalMoveNodeRequest;
}

export const MoveCustomersNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalMoveNodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/nodes/{nodesId}:move",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<MoveCustomersNodesRequest>;

export type MoveCustomersNodesResponse = SasPortalOperation;
export const MoveCustomersNodesResponse = SasPortalOperation;

export type MoveCustomersNodesError = DefaultErrors;

/** Moves a node under another node or customer. */
export const moveCustomersNodes: API.OperationMethod<
  MoveCustomersNodesRequest,
  MoveCustomersNodesResponse,
  MoveCustomersNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MoveCustomersNodesRequest,
  output: MoveCustomersNodesResponse,
  errors: [],
}));

export interface CreateSignedCustomersNodesDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalCreateSignedDeviceRequest;
}

export const CreateSignedCustomersNodesDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalCreateSignedDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/devices:createSigned",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateSignedCustomersNodesDevicesRequest>;

export type CreateSignedCustomersNodesDevicesResponse = SasPortalDevice;
export const CreateSignedCustomersNodesDevicesResponse = SasPortalDevice;

export type CreateSignedCustomersNodesDevicesError = DefaultErrors;

/** Creates a signed device under a node or customer. */
export const createSignedCustomersNodesDevices: API.OperationMethod<
  CreateSignedCustomersNodesDevicesRequest,
  CreateSignedCustomersNodesDevicesResponse,
  CreateSignedCustomersNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSignedCustomersNodesDevicesRequest,
  output: CreateSignedCustomersNodesDevicesResponse,
  errors: [],
}));

export interface CreateCustomersNodesDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalDevice;
}

export const CreateCustomersNodesDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalDevice).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/devices",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateCustomersNodesDevicesRequest>;

export type CreateCustomersNodesDevicesResponse = SasPortalDevice;
export const CreateCustomersNodesDevicesResponse = SasPortalDevice;

export type CreateCustomersNodesDevicesError = DefaultErrors;

/** Creates a device under a node or customer. */
export const createCustomersNodesDevices: API.OperationMethod<
  CreateCustomersNodesDevicesRequest,
  CreateCustomersNodesDevicesResponse,
  CreateCustomersNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCustomersNodesDevicesRequest,
  output: CreateCustomersNodesDevicesResponse,
  errors: [],
}));

export interface ListCustomersNodesDevicesRequest {
  /** A pagination token returned from a previous call to ListDevices that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The name of the parent resource. */
  parent: string;
  /** The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000]. */
  pageSize?: number;
  /** The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive. */
  filter?: string;
}

export const ListCustomersNodesDevicesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/devices",
  }),
  svc,
) as unknown as Schema.Schema<ListCustomersNodesDevicesRequest>;

export type ListCustomersNodesDevicesResponse = SasPortalListDevicesResponse;
export const ListCustomersNodesDevicesResponse = SasPortalListDevicesResponse;

export type ListCustomersNodesDevicesError = DefaultErrors;

/** Lists devices under a node or customer. */
export const listCustomersNodesDevices: API.PaginatedOperationMethod<
  ListCustomersNodesDevicesRequest,
  ListCustomersNodesDevicesResponse,
  ListCustomersNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListCustomersNodesDevicesRequest,
  output: ListCustomersNodesDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListCustomersNodesDeploymentsRequest {
  /** A pagination token returned from a previous call to ListDeployments that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The parent resource name, for example, "nodes/1", customer/1/nodes/2. */
  parent: string;
  /** The maximum number of deployments to return in the response. */
  pageSize?: number;
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no deployments are filtered. */
  filter?: string;
}

export const ListCustomersNodesDeploymentsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/deployments",
  }),
  svc,
) as unknown as Schema.Schema<ListCustomersNodesDeploymentsRequest>;

export type ListCustomersNodesDeploymentsResponse =
  SasPortalListDeploymentsResponse;
export const ListCustomersNodesDeploymentsResponse =
  SasPortalListDeploymentsResponse;

export type ListCustomersNodesDeploymentsError = DefaultErrors;

/** Lists deployments. */
export const listCustomersNodesDeployments: API.PaginatedOperationMethod<
  ListCustomersNodesDeploymentsRequest,
  ListCustomersNodesDeploymentsResponse,
  ListCustomersNodesDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListCustomersNodesDeploymentsRequest,
  output: ListCustomersNodesDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateCustomersNodesDeploymentsRequest {
  /** Required. The parent resource name where the deployment is to be created. */
  parent: string;
  /** Request body */
  body?: SasPortalDeployment;
}

export const CreateCustomersNodesDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/deployments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateCustomersNodesDeploymentsRequest>;

export type CreateCustomersNodesDeploymentsResponse = SasPortalDeployment;
export const CreateCustomersNodesDeploymentsResponse = SasPortalDeployment;

export type CreateCustomersNodesDeploymentsError = DefaultErrors;

/** Creates a new deployment. */
export const createCustomersNodesDeployments: API.OperationMethod<
  CreateCustomersNodesDeploymentsRequest,
  CreateCustomersNodesDeploymentsResponse,
  CreateCustomersNodesDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCustomersNodesDeploymentsRequest,
  output: CreateCustomersNodesDeploymentsResponse,
  errors: [],
}));

export interface ListCustomersNodesNodesRequest {
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no nodes are filtered. */
  filter?: string;
  /** Required. The parent resource name, for example, "nodes/1". */
  parent: string;
  /** The maximum number of nodes to return in the response. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListNodes that indicates where this listing should continue from. */
  pageToken?: string;
}

export const ListCustomersNodesNodesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/nodes",
  }),
  svc,
) as unknown as Schema.Schema<ListCustomersNodesNodesRequest>;

export type ListCustomersNodesNodesResponse = SasPortalListNodesResponse;
export const ListCustomersNodesNodesResponse = SasPortalListNodesResponse;

export type ListCustomersNodesNodesError = DefaultErrors;

/** Lists nodes. */
export const listCustomersNodesNodes: API.PaginatedOperationMethod<
  ListCustomersNodesNodesRequest,
  ListCustomersNodesNodesResponse,
  ListCustomersNodesNodesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListCustomersNodesNodesRequest,
  output: ListCustomersNodesNodesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateCustomersNodesNodesRequest {
  /** Required. The parent resource name where the node is to be created. */
  parent: string;
  /** Request body */
  body?: SasPortalNode;
}

export const CreateCustomersNodesNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalNode).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/nodes",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateCustomersNodesNodesRequest>;

export type CreateCustomersNodesNodesResponse = SasPortalNode;
export const CreateCustomersNodesNodesResponse = SasPortalNode;

export type CreateCustomersNodesNodesError = DefaultErrors;

/** Creates a new node. */
export const createCustomersNodesNodes: API.OperationMethod<
  CreateCustomersNodesNodesRequest,
  CreateCustomersNodesNodesResponse,
  CreateCustomersNodesNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCustomersNodesNodesRequest,
  output: CreateCustomersNodesNodesResponse,
  errors: [],
}));

export interface GetNodesRequest {
  /** Required. The name of the node. */
  name: string;
}

export const GetNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}" }),
  svc,
) as unknown as Schema.Schema<GetNodesRequest>;

export type GetNodesResponse = SasPortalNode;
export const GetNodesResponse = SasPortalNode;

export type GetNodesError = DefaultErrors;

/** Returns a requested node. */
export const getNodes: API.OperationMethod<
  GetNodesRequest,
  GetNodesResponse,
  GetNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetNodesRequest,
  output: GetNodesResponse,
  errors: [],
}));

export interface CreateNodesDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalDevice;
}

export const CreateNodesDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalDevice).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/devices",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateNodesDevicesRequest>;

export type CreateNodesDevicesResponse = SasPortalDevice;
export const CreateNodesDevicesResponse = SasPortalDevice;

export type CreateNodesDevicesError = DefaultErrors;

/** Creates a device under a node or customer. */
export const createNodesDevices: API.OperationMethod<
  CreateNodesDevicesRequest,
  CreateNodesDevicesResponse,
  CreateNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateNodesDevicesRequest,
  output: CreateNodesDevicesResponse,
  errors: [],
}));

export interface CreateSignedNodesDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalCreateSignedDeviceRequest;
}

export const CreateSignedNodesDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalCreateSignedDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/devices:createSigned",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateSignedNodesDevicesRequest>;

export type CreateSignedNodesDevicesResponse = SasPortalDevice;
export const CreateSignedNodesDevicesResponse = SasPortalDevice;

export type CreateSignedNodesDevicesError = DefaultErrors;

/** Creates a signed device under a node or customer. */
export const createSignedNodesDevices: API.OperationMethod<
  CreateSignedNodesDevicesRequest,
  CreateSignedNodesDevicesResponse,
  CreateSignedNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSignedNodesDevicesRequest,
  output: CreateSignedNodesDevicesResponse,
  errors: [],
}));

export interface ListNodesDevicesRequest {
  /** A pagination token returned from a previous call to ListDevices that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The name of the parent resource. */
  parent: string;
  /** The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000]. */
  pageSize?: number;
  /** The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive. */
  filter?: string;
}

export const ListNodesDevicesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/devices" }),
  svc,
) as unknown as Schema.Schema<ListNodesDevicesRequest>;

export type ListNodesDevicesResponse = SasPortalListDevicesResponse;
export const ListNodesDevicesResponse = SasPortalListDevicesResponse;

export type ListNodesDevicesError = DefaultErrors;

/** Lists devices under a node or customer. */
export const listNodesDevices: API.PaginatedOperationMethod<
  ListNodesDevicesRequest,
  ListNodesDevicesResponse,
  ListNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListNodesDevicesRequest,
  output: ListNodesDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdateSignedNodesDevicesRequest {
  /** Required. The name of the device to update. */
  name: string;
  /** Request body */
  body?: SasPortalUpdateSignedDeviceRequest;
}

export const UpdateSignedNodesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalUpdateSignedDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}:updateSigned",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateSignedNodesDevicesRequest>;

export type UpdateSignedNodesDevicesResponse = SasPortalDevice;
export const UpdateSignedNodesDevicesResponse = SasPortalDevice;

export type UpdateSignedNodesDevicesError = DefaultErrors;

/** Updates a signed device. */
export const updateSignedNodesDevices: API.OperationMethod<
  UpdateSignedNodesDevicesRequest,
  UpdateSignedNodesDevicesResponse,
  UpdateSignedNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateSignedNodesDevicesRequest,
  output: UpdateSignedNodesDevicesResponse,
  errors: [],
}));

export interface MoveNodesDevicesRequest {
  /** Required. The name of the device to move. */
  name: string;
  /** Request body */
  body?: SasPortalMoveDeviceRequest;
}

export const MoveNodesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalMoveDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}:move",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<MoveNodesDevicesRequest>;

export type MoveNodesDevicesResponse = SasPortalOperation;
export const MoveNodesDevicesResponse = SasPortalOperation;

export type MoveNodesDevicesError = DefaultErrors;

/** Moves a device under another node or customer. */
export const moveNodesDevices: API.OperationMethod<
  MoveNodesDevicesRequest,
  MoveNodesDevicesResponse,
  MoveNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MoveNodesDevicesRequest,
  output: MoveNodesDevicesResponse,
  errors: [],
}));

export interface PatchNodesDevicesRequest {
  /** Output only. The resource path name. */
  name: string;
  /** Fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: SasPortalDevice;
}

export const PatchNodesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SasPortalDevice).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchNodesDevicesRequest>;

export type PatchNodesDevicesResponse = SasPortalDevice;
export const PatchNodesDevicesResponse = SasPortalDevice;

export type PatchNodesDevicesError = DefaultErrors;

/** Updates a device. */
export const patchNodesDevices: API.OperationMethod<
  PatchNodesDevicesRequest,
  PatchNodesDevicesResponse,
  PatchNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchNodesDevicesRequest,
  output: PatchNodesDevicesResponse,
  errors: [],
}));

export interface DeleteNodesDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const DeleteNodesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteNodesDevicesRequest>;

export type DeleteNodesDevicesResponse = SasPortalEmpty;
export const DeleteNodesDevicesResponse = SasPortalEmpty;

export type DeleteNodesDevicesError = DefaultErrors;

/** Deletes a device. */
export const deleteNodesDevices: API.OperationMethod<
  DeleteNodesDevicesRequest,
  DeleteNodesDevicesResponse,
  DeleteNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteNodesDevicesRequest,
  output: DeleteNodesDevicesResponse,
  errors: [],
}));

export interface SignDeviceNodesDevicesRequest {
  /** Output only. The resource path name. */
  name: string;
  /** Request body */
  body?: SasPortalSignDeviceRequest;
}

export const SignDeviceNodesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalSignDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}:signDevice",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SignDeviceNodesDevicesRequest>;

export type SignDeviceNodesDevicesResponse = SasPortalEmpty;
export const SignDeviceNodesDevicesResponse = SasPortalEmpty;

export type SignDeviceNodesDevicesError = DefaultErrors;

/** Signs a device. */
export const signDeviceNodesDevices: API.OperationMethod<
  SignDeviceNodesDevicesRequest,
  SignDeviceNodesDevicesResponse,
  SignDeviceNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SignDeviceNodesDevicesRequest,
  output: SignDeviceNodesDevicesResponse,
  errors: [],
}));

export interface GetNodesDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const GetNodesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetNodesDevicesRequest>;

export type GetNodesDevicesResponse = SasPortalDevice;
export const GetNodesDevicesResponse = SasPortalDevice;

export type GetNodesDevicesError = DefaultErrors;

/** Gets details about a device. */
export const getNodesDevices: API.OperationMethod<
  GetNodesDevicesRequest,
  GetNodesDevicesResponse,
  GetNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetNodesDevicesRequest,
  output: GetNodesDevicesResponse,
  errors: [],
}));

export interface MoveNodesDeploymentsRequest {
  /** Required. The name of the deployment to move. */
  name: string;
  /** Request body */
  body?: SasPortalMoveDeploymentRequest;
}

export const MoveNodesDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalMoveDeploymentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}:move",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<MoveNodesDeploymentsRequest>;

export type MoveNodesDeploymentsResponse = SasPortalOperation;
export const MoveNodesDeploymentsResponse = SasPortalOperation;

export type MoveNodesDeploymentsError = DefaultErrors;

/** Moves a deployment under another node or customer. */
export const moveNodesDeployments: API.OperationMethod<
  MoveNodesDeploymentsRequest,
  MoveNodesDeploymentsResponse,
  MoveNodesDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MoveNodesDeploymentsRequest,
  output: MoveNodesDeploymentsResponse,
  errors: [],
}));

export interface ListNodesDeploymentsRequest {
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no deployments are filtered. */
  filter?: string;
  /** A pagination token returned from a previous call to ListDeployments that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The parent resource name, for example, "nodes/1", customer/1/nodes/2. */
  parent: string;
  /** The maximum number of deployments to return in the response. */
  pageSize?: number;
}

export const ListNodesDeploymentsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/deployments" }),
  svc,
) as unknown as Schema.Schema<ListNodesDeploymentsRequest>;

export type ListNodesDeploymentsResponse = SasPortalListDeploymentsResponse;
export const ListNodesDeploymentsResponse = SasPortalListDeploymentsResponse;

export type ListNodesDeploymentsError = DefaultErrors;

/** Lists deployments. */
export const listNodesDeployments: API.PaginatedOperationMethod<
  ListNodesDeploymentsRequest,
  ListNodesDeploymentsResponse,
  ListNodesDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListNodesDeploymentsRequest,
  output: ListNodesDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteNodesDeploymentsRequest {
  /** Required. The name of the deployment. */
  name: string;
}

export const DeleteNodesDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteNodesDeploymentsRequest>;

export type DeleteNodesDeploymentsResponse = SasPortalEmpty;
export const DeleteNodesDeploymentsResponse = SasPortalEmpty;

export type DeleteNodesDeploymentsError = DefaultErrors;

/** Deletes a deployment. */
export const deleteNodesDeployments: API.OperationMethod<
  DeleteNodesDeploymentsRequest,
  DeleteNodesDeploymentsResponse,
  DeleteNodesDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteNodesDeploymentsRequest,
  output: DeleteNodesDeploymentsResponse,
  errors: [],
}));

export interface GetNodesDeploymentsRequest {
  /** Required. The name of the deployment. */
  name: string;
}

export const GetNodesDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetNodesDeploymentsRequest>;

export type GetNodesDeploymentsResponse = SasPortalDeployment;
export const GetNodesDeploymentsResponse = SasPortalDeployment;

export type GetNodesDeploymentsError = DefaultErrors;

/** Returns a requested deployment. */
export const getNodesDeployments: API.OperationMethod<
  GetNodesDeploymentsRequest,
  GetNodesDeploymentsResponse,
  GetNodesDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetNodesDeploymentsRequest,
  output: GetNodesDeploymentsResponse,
  errors: [],
}));

export interface PatchNodesDeploymentsRequest {
  /** Fields to be updated. */
  updateMask?: string;
  /** Output only. Resource name. */
  name: string;
  /** Request body */
  body?: SasPortalDeployment;
}

export const PatchNodesDeploymentsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchNodesDeploymentsRequest>;

export type PatchNodesDeploymentsResponse = SasPortalDeployment;
export const PatchNodesDeploymentsResponse = SasPortalDeployment;

export type PatchNodesDeploymentsError = DefaultErrors;

/** Updates an existing deployment. */
export const patchNodesDeployments: API.OperationMethod<
  PatchNodesDeploymentsRequest,
  PatchNodesDeploymentsResponse,
  PatchNodesDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchNodesDeploymentsRequest,
  output: PatchNodesDeploymentsResponse,
  errors: [],
}));

export interface ListNodesDeploymentsDevicesRequest {
  /** The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive. */
  filter?: string;
  /** A pagination token returned from a previous call to ListDevices that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The name of the parent resource. */
  parent: string;
  /** The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000]. */
  pageSize?: number;
}

export const ListNodesDeploymentsDevicesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}/devices",
  }),
  svc,
) as unknown as Schema.Schema<ListNodesDeploymentsDevicesRequest>;

export type ListNodesDeploymentsDevicesResponse = SasPortalListDevicesResponse;
export const ListNodesDeploymentsDevicesResponse = SasPortalListDevicesResponse;

export type ListNodesDeploymentsDevicesError = DefaultErrors;

/** Lists devices under a node or customer. */
export const listNodesDeploymentsDevices: API.PaginatedOperationMethod<
  ListNodesDeploymentsDevicesRequest,
  ListNodesDeploymentsDevicesResponse,
  ListNodesDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListNodesDeploymentsDevicesRequest,
  output: ListNodesDeploymentsDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateNodesDeploymentsDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalDevice;
}

export const CreateNodesDeploymentsDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalDevice).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}/devices",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateNodesDeploymentsDevicesRequest>;

export type CreateNodesDeploymentsDevicesResponse = SasPortalDevice;
export const CreateNodesDeploymentsDevicesResponse = SasPortalDevice;

export type CreateNodesDeploymentsDevicesError = DefaultErrors;

/** Creates a device under a node or customer. */
export const createNodesDeploymentsDevices: API.OperationMethod<
  CreateNodesDeploymentsDevicesRequest,
  CreateNodesDeploymentsDevicesResponse,
  CreateNodesDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateNodesDeploymentsDevicesRequest,
  output: CreateNodesDeploymentsDevicesResponse,
  errors: [],
}));

export interface CreateSignedNodesDeploymentsDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalCreateSignedDeviceRequest;
}

export const CreateSignedNodesDeploymentsDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalCreateSignedDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}/devices:createSigned",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateSignedNodesDeploymentsDevicesRequest>;

export type CreateSignedNodesDeploymentsDevicesResponse = SasPortalDevice;
export const CreateSignedNodesDeploymentsDevicesResponse = SasPortalDevice;

export type CreateSignedNodesDeploymentsDevicesError = DefaultErrors;

/** Creates a signed device under a node or customer. */
export const createSignedNodesDeploymentsDevices: API.OperationMethod<
  CreateSignedNodesDeploymentsDevicesRequest,
  CreateSignedNodesDeploymentsDevicesResponse,
  CreateSignedNodesDeploymentsDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSignedNodesDeploymentsDevicesRequest,
  output: CreateSignedNodesDeploymentsDevicesResponse,
  errors: [],
}));

export interface PatchNodesNodesRequest {
  /** Output only. Resource name. */
  name: string;
  /** Fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: SasPortalNode;
}

export const PatchNodesNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SasPortalNode).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchNodesNodesRequest>;

export type PatchNodesNodesResponse = SasPortalNode;
export const PatchNodesNodesResponse = SasPortalNode;

export type PatchNodesNodesError = DefaultErrors;

/** Updates an existing node. */
export const patchNodesNodes: API.OperationMethod<
  PatchNodesNodesRequest,
  PatchNodesNodesResponse,
  PatchNodesNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchNodesNodesRequest,
  output: PatchNodesNodesResponse,
  errors: [],
}));

export interface GetNodesNodesRequest {
  /** Required. The name of the node. */
  name: string;
}

export const GetNodesNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}" }),
  svc,
) as unknown as Schema.Schema<GetNodesNodesRequest>;

export type GetNodesNodesResponse = SasPortalNode;
export const GetNodesNodesResponse = SasPortalNode;

export type GetNodesNodesError = DefaultErrors;

/** Returns a requested node. */
export const getNodesNodes: API.OperationMethod<
  GetNodesNodesRequest,
  GetNodesNodesResponse,
  GetNodesNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetNodesNodesRequest,
  output: GetNodesNodesResponse,
  errors: [],
}));

export interface DeleteNodesNodesRequest {
  /** Required. The name of the node. */
  name: string;
}

export const DeleteNodesNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteNodesNodesRequest>;

export type DeleteNodesNodesResponse = SasPortalEmpty;
export const DeleteNodesNodesResponse = SasPortalEmpty;

export type DeleteNodesNodesError = DefaultErrors;

/** Deletes a node. */
export const deleteNodesNodes: API.OperationMethod<
  DeleteNodesNodesRequest,
  DeleteNodesNodesResponse,
  DeleteNodesNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteNodesNodesRequest,
  output: DeleteNodesNodesResponse,
  errors: [],
}));

export interface ListNodesNodesRequest {
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no nodes are filtered. */
  filter?: string;
  /** A pagination token returned from a previous call to ListNodes that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The parent resource name, for example, "nodes/1". */
  parent: string;
  /** The maximum number of nodes to return in the response. */
  pageSize?: number;
}

export const ListNodesNodesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/nodes" }),
  svc,
) as unknown as Schema.Schema<ListNodesNodesRequest>;

export type ListNodesNodesResponse = SasPortalListNodesResponse;
export const ListNodesNodesResponse = SasPortalListNodesResponse;

export type ListNodesNodesError = DefaultErrors;

/** Lists nodes. */
export const listNodesNodes: API.PaginatedOperationMethod<
  ListNodesNodesRequest,
  ListNodesNodesResponse,
  ListNodesNodesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListNodesNodesRequest,
  output: ListNodesNodesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateNodesNodesRequest {
  /** Required. The parent resource name where the node is to be created. */
  parent: string;
  /** Request body */
  body?: SasPortalNode;
}

export const CreateNodesNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalNode).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/nodes",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateNodesNodesRequest>;

export type CreateNodesNodesResponse = SasPortalNode;
export const CreateNodesNodesResponse = SasPortalNode;

export type CreateNodesNodesError = DefaultErrors;

/** Creates a new node. */
export const createNodesNodes: API.OperationMethod<
  CreateNodesNodesRequest,
  CreateNodesNodesResponse,
  CreateNodesNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateNodesNodesRequest,
  output: CreateNodesNodesResponse,
  errors: [],
}));

export interface MoveNodesNodesRequest {
  /** Required. The name of the node to move. */
  name: string;
  /** Request body */
  body?: SasPortalMoveNodeRequest;
}

export const MoveNodesNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SasPortalMoveNodeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}:move",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<MoveNodesNodesRequest>;

export type MoveNodesNodesResponse = SasPortalOperation;
export const MoveNodesNodesResponse = SasPortalOperation;

export type MoveNodesNodesError = DefaultErrors;

/** Moves a node under another node or customer. */
export const moveNodesNodes: API.OperationMethod<
  MoveNodesNodesRequest,
  MoveNodesNodesResponse,
  MoveNodesNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: MoveNodesNodesRequest,
  output: MoveNodesNodesResponse,
  errors: [],
}));

export interface CreateNodesNodesNodesRequest {
  /** Required. The parent resource name where the node is to be created. */
  parent: string;
  /** Request body */
  body?: SasPortalNode;
}

export const CreateNodesNodesNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalNode).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/nodes",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateNodesNodesNodesRequest>;

export type CreateNodesNodesNodesResponse = SasPortalNode;
export const CreateNodesNodesNodesResponse = SasPortalNode;

export type CreateNodesNodesNodesError = DefaultErrors;

/** Creates a new node. */
export const createNodesNodesNodes: API.OperationMethod<
  CreateNodesNodesNodesRequest,
  CreateNodesNodesNodesResponse,
  CreateNodesNodesNodesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateNodesNodesNodesRequest,
  output: CreateNodesNodesNodesResponse,
  errors: [],
}));

export interface ListNodesNodesNodesRequest {
  /** Required. The parent resource name, for example, "nodes/1". */
  parent: string;
  /** The maximum number of nodes to return in the response. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListNodes that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no nodes are filtered. */
  filter?: string;
}

export const ListNodesNodesNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/nodes",
  }),
  svc,
) as unknown as Schema.Schema<ListNodesNodesNodesRequest>;

export type ListNodesNodesNodesResponse = SasPortalListNodesResponse;
export const ListNodesNodesNodesResponse = SasPortalListNodesResponse;

export type ListNodesNodesNodesError = DefaultErrors;

/** Lists nodes. */
export const listNodesNodesNodes: API.PaginatedOperationMethod<
  ListNodesNodesNodesRequest,
  ListNodesNodesNodesResponse,
  ListNodesNodesNodesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListNodesNodesNodesRequest,
  output: ListNodesNodesNodesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateSignedNodesNodesDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalCreateSignedDeviceRequest;
}

export const CreateSignedNodesNodesDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalCreateSignedDeviceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/devices:createSigned",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateSignedNodesNodesDevicesRequest>;

export type CreateSignedNodesNodesDevicesResponse = SasPortalDevice;
export const CreateSignedNodesNodesDevicesResponse = SasPortalDevice;

export type CreateSignedNodesNodesDevicesError = DefaultErrors;

/** Creates a signed device under a node or customer. */
export const createSignedNodesNodesDevices: API.OperationMethod<
  CreateSignedNodesNodesDevicesRequest,
  CreateSignedNodesNodesDevicesResponse,
  CreateSignedNodesNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSignedNodesNodesDevicesRequest,
  output: CreateSignedNodesNodesDevicesResponse,
  errors: [],
}));

export interface ListNodesNodesDevicesRequest {
  /** The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive. */
  filter?: string;
  /** A pagination token returned from a previous call to ListDevices that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The name of the parent resource. */
  parent: string;
  /** The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000]. */
  pageSize?: number;
}

export const ListNodesNodesDevicesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/devices",
  }),
  svc,
) as unknown as Schema.Schema<ListNodesNodesDevicesRequest>;

export type ListNodesNodesDevicesResponse = SasPortalListDevicesResponse;
export const ListNodesNodesDevicesResponse = SasPortalListDevicesResponse;

export type ListNodesNodesDevicesError = DefaultErrors;

/** Lists devices under a node or customer. */
export const listNodesNodesDevices: API.PaginatedOperationMethod<
  ListNodesNodesDevicesRequest,
  ListNodesNodesDevicesResponse,
  ListNodesNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListNodesNodesDevicesRequest,
  output: ListNodesNodesDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateNodesNodesDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** Request body */
  body?: SasPortalDevice;
}

export const CreateNodesNodesDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalDevice).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/devices",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateNodesNodesDevicesRequest>;

export type CreateNodesNodesDevicesResponse = SasPortalDevice;
export const CreateNodesNodesDevicesResponse = SasPortalDevice;

export type CreateNodesNodesDevicesError = DefaultErrors;

/** Creates a device under a node or customer. */
export const createNodesNodesDevices: API.OperationMethod<
  CreateNodesNodesDevicesRequest,
  CreateNodesNodesDevicesResponse,
  CreateNodesNodesDevicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateNodesNodesDevicesRequest,
  output: CreateNodesNodesDevicesResponse,
  errors: [],
}));

export interface ListNodesNodesDeploymentsRequest {
  /** A pagination token returned from a previous call to ListDeployments that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The parent resource name, for example, "nodes/1", customer/1/nodes/2. */
  parent: string;
  /** The maximum number of deployments to return in the response. */
  pageSize?: number;
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no deployments are filtered. */
  filter?: string;
}

export const ListNodesNodesDeploymentsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/deployments",
  }),
  svc,
) as unknown as Schema.Schema<ListNodesNodesDeploymentsRequest>;

export type ListNodesNodesDeploymentsResponse =
  SasPortalListDeploymentsResponse;
export const ListNodesNodesDeploymentsResponse =
  SasPortalListDeploymentsResponse;

export type ListNodesNodesDeploymentsError = DefaultErrors;

/** Lists deployments. */
export const listNodesNodesDeployments: API.PaginatedOperationMethod<
  ListNodesNodesDeploymentsRequest,
  ListNodesNodesDeploymentsResponse,
  ListNodesNodesDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListNodesNodesDeploymentsRequest,
  output: ListNodesNodesDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateNodesNodesDeploymentsRequest {
  /** Required. The parent resource name where the deployment is to be created. */
  parent: string;
  /** Request body */
  body?: SasPortalDeployment;
}

export const CreateNodesNodesDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SasPortalDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/deployments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateNodesNodesDeploymentsRequest>;

export type CreateNodesNodesDeploymentsResponse = SasPortalDeployment;
export const CreateNodesNodesDeploymentsResponse = SasPortalDeployment;

export type CreateNodesNodesDeploymentsError = DefaultErrors;

/** Creates a new deployment. */
export const createNodesNodesDeployments: API.OperationMethod<
  CreateNodesNodesDeploymentsRequest,
  CreateNodesNodesDeploymentsResponse,
  CreateNodesNodesDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateNodesNodesDeploymentsRequest,
  output: CreateNodesNodesDeploymentsResponse,
  errors: [],
}));
