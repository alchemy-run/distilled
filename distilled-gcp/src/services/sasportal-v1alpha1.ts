// ==========================================================================
// SAS Portal API (sasportal v1alpha1)
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
  name: "sasportal",
  version: "v1alpha1",
  rootUrl: "https://sasportal.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SasPortalCustomer {
  /** Output only. Resource name of the customer. */
  name?: string;
  /** Required. Name of the organization that the customer entity represents. */
  displayName?: string;
  /** User IDs used by the devices belonging to this customer. */
  sasUserIds?: Array<string>;
}

export const SasPortalCustomer: Schema.Schema<SasPortalCustomer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  sasUserIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SasPortalCustomer" }) as any as Schema.Schema<SasPortalCustomer>;

export interface SasPortalListCustomersResponse {
  /** The list of customers that match the request. */
  customers?: Array<SasPortalCustomer>;
  /** A pagination token returned from a previous call to ListCustomers that indicates from where listing should continue. If the field is missing or empty, it means there are no more customers. */
  nextPageToken?: string;
}

export const SasPortalListCustomersResponse: Schema.Schema<SasPortalListCustomersResponse> = Schema.suspend(() => Schema.Struct({
  customers: Schema.optional(Schema.Array(SasPortalCustomer)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalListCustomersResponse" }) as any as Schema.Schema<SasPortalListCustomersResponse>;

export interface SasPortalDeployment {
  /** Output only. Resource name. */
  name?: string;
  /** The deployment's display name. */
  displayName?: string;
  /** User ID used by the devices belonging to this deployment. Each deployment should be associated with one unique user ID. */
  sasUserIds?: Array<string>;
  /** Output only. The FCC Registration Numbers (FRNs) copied from its direct parent. */
  frns?: Array<string>;
}

export const SasPortalDeployment: Schema.Schema<SasPortalDeployment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  sasUserIds: Schema.optional(Schema.Array(Schema.String)),
  frns: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SasPortalDeployment" }) as any as Schema.Schema<SasPortalDeployment>;

export interface SasPortalGcpProjectDeployment {
  /** Whether SAS analytics has been enabled. */
  hasEnabledAnalytics?: boolean;
  /** Deployment associated with the GCP project. */
  deployment?: SasPortalDeployment;
}

export const SasPortalGcpProjectDeployment: Schema.Schema<SasPortalGcpProjectDeployment> = Schema.suspend(() => Schema.Struct({
  hasEnabledAnalytics: Schema.optional(Schema.Boolean),
  deployment: Schema.optional(SasPortalDeployment),
})).annotate({ identifier: "SasPortalGcpProjectDeployment" }) as any as Schema.Schema<SasPortalGcpProjectDeployment>;

export interface SasPortalListGcpProjectDeploymentsResponse {
  /** Optional. Deployments associated with the GCP project */
  deployments?: Array<SasPortalGcpProjectDeployment>;
}

export const SasPortalListGcpProjectDeploymentsResponse: Schema.Schema<SasPortalListGcpProjectDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  deployments: Schema.optional(Schema.Array(SasPortalGcpProjectDeployment)),
})).annotate({ identifier: "SasPortalListGcpProjectDeploymentsResponse" }) as any as Schema.Schema<SasPortalListGcpProjectDeploymentsResponse>;

export interface SasPortalProvisionDeploymentRequest {
  /** Optional. If this field is set, and a new SAS Portal Organization needs to be created, its display name will be set to the value of this field. */
  newOrganizationDisplayName?: string;
  /** Optional. If this field is set, and a new SAS Portal Deployment needs to be created, its display name will be set to the value of this field. */
  newDeploymentDisplayName?: string;
  /** Optional. If this field is set then a new deployment will be created under the organization specified by this id. */
  organizationId?: string;
}

export const SasPortalProvisionDeploymentRequest: Schema.Schema<SasPortalProvisionDeploymentRequest> = Schema.suspend(() => Schema.Struct({
  newOrganizationDisplayName: Schema.optional(Schema.String),
  newDeploymentDisplayName: Schema.optional(Schema.String),
  organizationId: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalProvisionDeploymentRequest" }) as any as Schema.Schema<SasPortalProvisionDeploymentRequest>;

export interface SasPortalProvisionDeploymentResponse {
  /** Optional. Optional error message if the provisioning request is not successful. */
  errorMessage?: string;
}

export const SasPortalProvisionDeploymentResponse: Schema.Schema<SasPortalProvisionDeploymentResponse> = Schema.suspend(() => Schema.Struct({
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalProvisionDeploymentResponse" }) as any as Schema.Schema<SasPortalProvisionDeploymentResponse>;

export interface SasPortalOrganization {
  /** Id of organization */
  id?: string;
  /** Name of organization */
  displayName?: string;
}

export const SasPortalOrganization: Schema.Schema<SasPortalOrganization> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalOrganization" }) as any as Schema.Schema<SasPortalOrganization>;

export interface SasPortalListLegacyOrganizationsResponse {
  /** Optional. Legacy SAS organizations. */
  organizations?: Array<SasPortalOrganization>;
}

export const SasPortalListLegacyOrganizationsResponse: Schema.Schema<SasPortalListLegacyOrganizationsResponse> = Schema.suspend(() => Schema.Struct({
  organizations: Schema.optional(Schema.Array(SasPortalOrganization)),
})).annotate({ identifier: "SasPortalListLegacyOrganizationsResponse" }) as any as Schema.Schema<SasPortalListLegacyOrganizationsResponse>;

export interface SasPortalMigrateOrganizationRequest {
  /** Required. Id of the SAS organization to be migrated. */
  organizationId?: string;
}

export const SasPortalMigrateOrganizationRequest: Schema.Schema<SasPortalMigrateOrganizationRequest> = Schema.suspend(() => Schema.Struct({
  organizationId: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalMigrateOrganizationRequest" }) as any as Schema.Schema<SasPortalMigrateOrganizationRequest>;

export interface SasPortalStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const SasPortalStatus: Schema.Schema<SasPortalStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "SasPortalStatus" }) as any as Schema.Schema<SasPortalStatus>;

export interface SasPortalOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: SasPortalStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const SasPortalOperation: Schema.Schema<SasPortalOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(SasPortalStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "SasPortalOperation" }) as any as Schema.Schema<SasPortalOperation>;

export interface SasPortalSetupSasAnalyticsRequest {
  /** Optional. User id to setup analytics for, if not provided the user id associated with the project is used. optional */
  userId?: string;
}

export const SasPortalSetupSasAnalyticsRequest: Schema.Schema<SasPortalSetupSasAnalyticsRequest> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalSetupSasAnalyticsRequest" }) as any as Schema.Schema<SasPortalSetupSasAnalyticsRequest>;

export interface SasPortalDeviceModel {
  /** The name of the device vendor. */
  vendor?: string;
  /** The name of the device model. */
  name?: string;
  /** The software version of the device. */
  softwareVersion?: string;
  /** The hardware version of the device. */
  hardwareVersion?: string;
  /** The firmware version of the device. */
  firmwareVersion?: string;
}

export const SasPortalDeviceModel: Schema.Schema<SasPortalDeviceModel> = Schema.suspend(() => Schema.Struct({
  vendor: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  softwareVersion: Schema.optional(Schema.String),
  hardwareVersion: Schema.optional(Schema.String),
  firmwareVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalDeviceModel" }) as any as Schema.Schema<SasPortalDeviceModel>;

export interface SasPortalDeviceAirInterface {
  /** Conditional. This field specifies the radio access technology that is used for the CBSD. */
  radioTechnology?: "RADIO_TECHNOLOGY_UNSPECIFIED" | "E_UTRA" | "CAMBIUM_NETWORKS" | "FOUR_G_BBW_SAA_1" | "NR" | "DOODLE_CBRS" | "CW" | "REDLINE" | "TARANA_WIRELESS" | "FAROS" | (string & {});
  /** Optional. This field is related to the `radioTechnology` and provides the air interface specification that the CBSD is compliant with at the time of registration. */
  supportedSpec?: string;
}

export const SasPortalDeviceAirInterface: Schema.Schema<SasPortalDeviceAirInterface> = Schema.suspend(() => Schema.Struct({
  radioTechnology: Schema.optional(Schema.String),
  supportedSpec: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalDeviceAirInterface" }) as any as Schema.Schema<SasPortalDeviceAirInterface>;

export interface SasPortalInstallationParams {
  /** Latitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -90.000000 to +90.000000. Positive values represent latitudes north of the equator; negative values south of the equator. */
  latitude?: number;
  /** Longitude of the device antenna location in degrees relative to the WGS 84 datum. The allowed range is from -180.000000 to +180.000000. Positive values represent longitudes east of the prime meridian; negative values west of the prime meridian. */
  longitude?: number;
  /** Device antenna height in meters. When the `heightType` parameter value is "AGL", the antenna height should be given relative to ground level. When the `heightType` parameter value is "AMSL", it is given with respect to WGS84 datum. */
  height?: number;
  /** Specifies how the height is measured. */
  heightType?: "HEIGHT_TYPE_UNSPECIFIED" | "HEIGHT_TYPE_AGL" | "HEIGHT_TYPE_AMSL" | (string & {});
  /** A positive number in meters to indicate accuracy of the device antenna horizontal location. This optional parameter should only be present if its value is less than the FCC requirement of 50 meters. */
  horizontalAccuracy?: number;
  /** A positive number in meters to indicate accuracy of the device antenna vertical location. This optional parameter should only be present if its value is less than the FCC requirement of 3 meters. */
  verticalAccuracy?: number;
  /** Whether the device antenna is indoor or not. `true`: indoor. `false`: outdoor. */
  indoorDeployment?: boolean;
  /** Boresight direction of the horizontal plane of the antenna in degrees with respect to true north. The value of this parameter is an integer with a value between 0 and 359 inclusive. A value of 0 degrees means true north; a value of 90 degrees means east. This parameter is optional for Category A devices and conditional for Category B devices. */
  antennaAzimuth?: number;
  /** Antenna downtilt in degrees and is an integer with a value between -90 and +90 inclusive; a negative value means the antenna is tilted up (above horizontal). This parameter is optional for Category A devices and conditional for Category B devices. */
  antennaDowntilt?: number;
  /** Peak antenna gain in dBi. This parameter is a double with a value between -127 and +128 (dBi) inclusive. Part of Release 2 to support floating-point value */
  antennaGain?: number;
  /** This parameter is the maximum device EIRP in units of dBm/10MHz and is an integer with a value between -127 and +47 (dBm/10 MHz) inclusive. If not included, SAS interprets it as maximum allowable EIRP in units of dBm/10MHz for device category. */
  eirpCapability?: number;
  /** 3-dB antenna beamwidth of the antenna in the horizontal-plane in degrees. This parameter is an unsigned integer having a value between 0 and 360 (degrees) inclusive; it is optional for Category A devices and conditional for Category B devices. */
  antennaBeamwidth?: number;
  /** If an external antenna is used, the antenna model is optionally provided in this field. The string has a maximum length of 128 octets. */
  antennaModel?: string;
  /** If present, this parameter specifies whether the CBSD is a CPE-CBSD or not. */
  cpeCbsdIndication?: boolean;
}

export const SasPortalInstallationParams: Schema.Schema<SasPortalInstallationParams> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
  heightType: Schema.optional(Schema.String),
  horizontalAccuracy: Schema.optional(Schema.Number),
  verticalAccuracy: Schema.optional(Schema.Number),
  indoorDeployment: Schema.optional(Schema.Boolean),
  antennaAzimuth: Schema.optional(Schema.Number),
  antennaDowntilt: Schema.optional(Schema.Number),
  antennaGain: Schema.optional(Schema.Number),
  eirpCapability: Schema.optional(Schema.Number),
  antennaBeamwidth: Schema.optional(Schema.Number),
  antennaModel: Schema.optional(Schema.String),
  cpeCbsdIndication: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SasPortalInstallationParams" }) as any as Schema.Schema<SasPortalInstallationParams>;

export interface SasPortalDeviceConfig {
  /** FCC category of the device. */
  category?: "DEVICE_CATEGORY_UNSPECIFIED" | "DEVICE_CATEGORY_A" | "DEVICE_CATEGORY_B" | (string & {});
  /** Information about this device model. */
  model?: SasPortalDeviceModel;
  /** Information about this device's air interface. */
  airInterface?: SasPortalDeviceAirInterface;
  /** Installation parameters for the device. */
  installationParams?: SasPortalInstallationParams;
  /** Measurement reporting capabilities of the device. */
  measurementCapabilities?: Array<"MEASUREMENT_CAPABILITY_UNSPECIFIED" | "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITH_GRANT" | "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITHOUT_GRANT" | (string & {})>;
  /** The identifier of a device user. */
  userId?: string;
  /** The call sign of the device operator. */
  callSign?: string;
  /** State of the configuration. */
  state?: "DEVICE_CONFIG_STATE_UNSPECIFIED" | "DRAFT" | "FINAL" | (string & {});
  /** Output only. Whether the configuration has been signed by a CPI. */
  isSigned?: boolean;
  /** Output only. The last time the device configuration was edited. */
  updateTime?: string;
}

export const SasPortalDeviceConfig: Schema.Schema<SasPortalDeviceConfig> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  model: Schema.optional(SasPortalDeviceModel),
  airInterface: Schema.optional(SasPortalDeviceAirInterface),
  installationParams: Schema.optional(SasPortalInstallationParams),
  measurementCapabilities: Schema.optional(Schema.Array(Schema.String)),
  userId: Schema.optional(Schema.String),
  callSign: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  isSigned: Schema.optional(Schema.Boolean),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalDeviceConfig" }) as any as Schema.Schema<SasPortalDeviceConfig>;

export interface SasPortalFrequencyRange {
  /** The lowest frequency of the frequency range in MHz. */
  lowFrequencyMhz?: number;
  /** The highest frequency of the frequency range in MHz. */
  highFrequencyMhz?: number;
}

export const SasPortalFrequencyRange: Schema.Schema<SasPortalFrequencyRange> = Schema.suspend(() => Schema.Struct({
  lowFrequencyMhz: Schema.optional(Schema.Number),
  highFrequencyMhz: Schema.optional(Schema.Number),
})).annotate({ identifier: "SasPortalFrequencyRange" }) as any as Schema.Schema<SasPortalFrequencyRange>;

export interface SasPortalDpaMoveList {
  /** The ID of the DPA. */
  dpaId?: string;
  /** The frequency range that the move list affects. */
  frequencyRange?: SasPortalFrequencyRange;
}

export const SasPortalDpaMoveList: Schema.Schema<SasPortalDpaMoveList> = Schema.suspend(() => Schema.Struct({
  dpaId: Schema.optional(Schema.String),
  frequencyRange: Schema.optional(SasPortalFrequencyRange),
})).annotate({ identifier: "SasPortalDpaMoveList" }) as any as Schema.Schema<SasPortalDpaMoveList>;

export interface SasPortalDeviceGrant {
  /** Maximum Equivalent Isotropically Radiated Power (EIRP) permitted by the grant. The maximum EIRP is in units of dBm/MHz. The value of `maxEirp` represents the average (RMS) EIRP that would be measured by the procedure defined in FCC part 96.41(e)(3). */
  maxEirp?: number;
  /** The transmission frequency range. */
  frequencyRange?: SasPortalFrequencyRange;
  /** State of the grant. */
  state?: "GRANT_STATE_UNSPECIFIED" | "GRANT_STATE_GRANTED" | "GRANT_STATE_TERMINATED" | "GRANT_STATE_SUSPENDED" | "GRANT_STATE_AUTHORIZED" | "GRANT_STATE_EXPIRED" | (string & {});
  /** Type of channel used. */
  channelType?: "CHANNEL_TYPE_UNSPECIFIED" | "CHANNEL_TYPE_GAA" | "CHANNEL_TYPE_PAL" | (string & {});
  /** The DPA move lists on which this grant appears. */
  moveList?: Array<SasPortalDpaMoveList>;
  /** The expiration time of the grant. */
  expireTime?: string;
  /** If the grant is suspended, the reason(s) for suspension. */
  suspensionReason?: Array<string>;
  /** Grant Id. */
  grantId?: string;
  /** The transmit expiration time of the last heartbeat. */
  lastHeartbeatTransmitExpireTime?: string;
}

export const SasPortalDeviceGrant: Schema.Schema<SasPortalDeviceGrant> = Schema.suspend(() => Schema.Struct({
  maxEirp: Schema.optional(Schema.Number),
  frequencyRange: Schema.optional(SasPortalFrequencyRange),
  state: Schema.optional(Schema.String),
  channelType: Schema.optional(Schema.String),
  moveList: Schema.optional(Schema.Array(SasPortalDpaMoveList)),
  expireTime: Schema.optional(Schema.String),
  suspensionReason: Schema.optional(Schema.Array(Schema.String)),
  grantId: Schema.optional(Schema.String),
  lastHeartbeatTransmitExpireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalDeviceGrant" }) as any as Schema.Schema<SasPortalDeviceGrant>;

export interface SasPortalNrqzValidation {
  /** Validation case ID. */
  caseId?: string;
  /** Device latitude that's associated with the validation. */
  latitude?: number;
  /** Device longitude that's associated with the validation. */
  longitude?: number;
  /** CPI who signed the validation. */
  cpiId?: string;
  /** State of the NRQZ validation info. */
  state?: "STATE_UNSPECIFIED" | "DRAFT" | "FINAL" | (string & {});
}

export const SasPortalNrqzValidation: Schema.Schema<SasPortalNrqzValidation> = Schema.suspend(() => Schema.Struct({
  caseId: Schema.optional(Schema.String),
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
  cpiId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalNrqzValidation" }) as any as Schema.Schema<SasPortalNrqzValidation>;

export interface SasPortalDeviceMetadata {
  /** Interference Coordination Group (ICG). A group of CBSDs that manage their own interference with the group. For more details, see [CBRSA-TS-2001 V3.0.0](https://ongoalliance.org/wp-content/uploads/2020/02/CBRSA-TS-2001-V3.0.0_Approved-for-publication.pdf). */
  interferenceCoordinationGroup?: string;
  /** Common Channel Group (CCG). A group of CBSDs in the same ICG requesting a common primary channel assignment. For more details, see [CBRSA-TS-2001 V3.0.0](https://ongoalliance.org/wp-content/uploads/2020/02/CBRSA-TS-2001-V3.0.0_Approved-for-publication.pdf). */
  commonChannelGroup?: string;
  /** If populated, the Antenna Model Pattern to use. Format is: `RecordCreatorId:PatternId` */
  antennaModel?: string;
  /** Output only. Set to `true` if a CPI has validated that they have coordinated with the National Quiet Zone office. */
  nrqzValidated?: boolean;
  /** Output only. National Radio Quiet Zone validation info. */
  nrqzValidation?: SasPortalNrqzValidation;
}

export const SasPortalDeviceMetadata: Schema.Schema<SasPortalDeviceMetadata> = Schema.suspend(() => Schema.Struct({
  interferenceCoordinationGroup: Schema.optional(Schema.String),
  commonChannelGroup: Schema.optional(Schema.String),
  antennaModel: Schema.optional(Schema.String),
  nrqzValidated: Schema.optional(Schema.Boolean),
  nrqzValidation: Schema.optional(SasPortalNrqzValidation),
})).annotate({ identifier: "SasPortalDeviceMetadata" }) as any as Schema.Schema<SasPortalDeviceMetadata>;

export interface SasPortalChannelWithScore {
  /** The frequency range of the channel. */
  frequencyRange?: SasPortalFrequencyRange;
  /** The channel score, normalized to be in the range [0,100]. */
  score?: number;
}

export const SasPortalChannelWithScore: Schema.Schema<SasPortalChannelWithScore> = Schema.suspend(() => Schema.Struct({
  frequencyRange: Schema.optional(SasPortalFrequencyRange),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "SasPortalChannelWithScore" }) as any as Schema.Schema<SasPortalChannelWithScore>;

export interface SasPortalDevice {
  /** Output only. The resource path name. */
  name?: string;
  /** The FCC identifier of the device. Refer to https://www.fcc.gov/oet/ea/fccid for FccID format. Accept underscores and periods because some test-SAS customers use them. */
  fccId?: string;
  /** A serial number assigned to the device by the device manufacturer. */
  serialNumber?: string;
  /** Configuration of the device, as specified via SAS Portal API. */
  preloadedConfig?: SasPortalDeviceConfig;
  /** Output only. Current configuration of the device as registered to the SAS. */
  activeConfig?: SasPortalDeviceConfig;
  /** Output only. Device state. */
  state?: "DEVICE_STATE_UNSPECIFIED" | "RESERVED" | "REGISTERED" | "DEREGISTERED" | (string & {});
  /** Output only. Grants held by the device. */
  grants?: Array<SasPortalDeviceGrant>;
  /** Device display name. */
  displayName?: string;
  /** Device parameters that can be overridden by both SAS Portal and SAS registration requests. */
  deviceMetadata?: SasPortalDeviceMetadata;
  /** Output only. Current channels with scores. */
  currentChannels?: Array<SasPortalChannelWithScore>;
  /** Only ranges that are within the allowlists are available for new grants. */
  grantRangeAllowlists?: Array<SasPortalFrequencyRange>;
}

export const SasPortalDevice: Schema.Schema<SasPortalDevice> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  fccId: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  preloadedConfig: Schema.optional(SasPortalDeviceConfig),
  activeConfig: Schema.optional(SasPortalDeviceConfig),
  state: Schema.optional(Schema.String),
  grants: Schema.optional(Schema.Array(SasPortalDeviceGrant)),
  displayName: Schema.optional(Schema.String),
  deviceMetadata: Schema.optional(SasPortalDeviceMetadata),
  currentChannels: Schema.optional(Schema.Array(SasPortalChannelWithScore)),
  grantRangeAllowlists: Schema.optional(Schema.Array(SasPortalFrequencyRange)),
})).annotate({ identifier: "SasPortalDevice" }) as any as Schema.Schema<SasPortalDevice>;

export interface SasPortalCreateSignedDeviceRequest {
  /** Required. JSON Web Token signed using a CPI private key. Payload must be the JSON encoding of the device. The user_id field must be set. */
  encodedDevice?: string;
  /** Required. Unique installer id (CPI ID) from the Certified Professional Installers database. */
  installerId?: string;
}

export const SasPortalCreateSignedDeviceRequest: Schema.Schema<SasPortalCreateSignedDeviceRequest> = Schema.suspend(() => Schema.Struct({
  encodedDevice: Schema.optional(Schema.String),
  installerId: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalCreateSignedDeviceRequest" }) as any as Schema.Schema<SasPortalCreateSignedDeviceRequest>;

export interface SasPortalEmpty {
}

export const SasPortalEmpty: Schema.Schema<SasPortalEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SasPortalEmpty" }) as any as Schema.Schema<SasPortalEmpty>;

export interface SasPortalListDevicesResponse {
  /** The devices that match the request. */
  devices?: Array<SasPortalDevice>;
  /** A pagination token returned from a previous call to ListDevices that indicates from where listing should continue. If the field is missing or empty, it means there is no more devices. */
  nextPageToken?: string;
}

export const SasPortalListDevicesResponse: Schema.Schema<SasPortalListDevicesResponse> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(Schema.Array(SasPortalDevice)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalListDevicesResponse" }) as any as Schema.Schema<SasPortalListDevicesResponse>;

export interface SasPortalMoveDeviceRequest {
  /** Required. The name of the new parent resource node or customer to reparent the device under. */
  destination?: string;
}

export const SasPortalMoveDeviceRequest: Schema.Schema<SasPortalMoveDeviceRequest> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalMoveDeviceRequest" }) as any as Schema.Schema<SasPortalMoveDeviceRequest>;

export interface SasPortalUpdateSignedDeviceRequest {
  /** Required. The JSON Web Token signed using a CPI private key. Payload must be the JSON encoding of the device. The user_id field must be set. */
  encodedDevice?: string;
  /** Required. Unique installer ID (CPI ID) from the Certified Professional Installers database. */
  installerId?: string;
}

export const SasPortalUpdateSignedDeviceRequest: Schema.Schema<SasPortalUpdateSignedDeviceRequest> = Schema.suspend(() => Schema.Struct({
  encodedDevice: Schema.optional(Schema.String),
  installerId: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalUpdateSignedDeviceRequest" }) as any as Schema.Schema<SasPortalUpdateSignedDeviceRequest>;

export interface SasPortalSignDeviceRequest {
  /** Required. The device to sign. The device fields name, fcc_id and serial_number must be set. The user_id field must be set. */
  device?: SasPortalDevice;
}

export const SasPortalSignDeviceRequest: Schema.Schema<SasPortalSignDeviceRequest> = Schema.suspend(() => Schema.Struct({
  device: Schema.optional(SasPortalDevice),
})).annotate({ identifier: "SasPortalSignDeviceRequest" }) as any as Schema.Schema<SasPortalSignDeviceRequest>;

export interface SasPortalNode {
  /** Output only. Resource name. */
  name?: string;
  /** The node's display name. */
  displayName?: string;
  /** User ids used by the devices belonging to this node. */
  sasUserIds?: Array<string>;
}

export const SasPortalNode: Schema.Schema<SasPortalNode> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  sasUserIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SasPortalNode" }) as any as Schema.Schema<SasPortalNode>;

export interface SasPortalListNodesResponse {
  /** The nodes that match the request. */
  nodes?: Array<SasPortalNode>;
  /** A pagination token returned from a previous call to ListNodes that indicates from where listing should continue. If the field is missing or empty, it means there is no more nodes. */
  nextPageToken?: string;
}

export const SasPortalListNodesResponse: Schema.Schema<SasPortalListNodesResponse> = Schema.suspend(() => Schema.Struct({
  nodes: Schema.optional(Schema.Array(SasPortalNode)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalListNodesResponse" }) as any as Schema.Schema<SasPortalListNodesResponse>;

export interface SasPortalMoveNodeRequest {
  /** Required. The name of the new parent resource node or customer to reparent the node under. */
  destination?: string;
}

export const SasPortalMoveNodeRequest: Schema.Schema<SasPortalMoveNodeRequest> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalMoveNodeRequest" }) as any as Schema.Schema<SasPortalMoveNodeRequest>;

export interface SasPortalGenerateSecretRequest {
}

export const SasPortalGenerateSecretRequest: Schema.Schema<SasPortalGenerateSecretRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SasPortalGenerateSecretRequest" }) as any as Schema.Schema<SasPortalGenerateSecretRequest>;

export interface SasPortalGenerateSecretResponse {
  /** The secret generated by the string and used by ValidateInstaller. */
  secret?: string;
}

export const SasPortalGenerateSecretResponse: Schema.Schema<SasPortalGenerateSecretResponse> = Schema.suspend(() => Schema.Struct({
  secret: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalGenerateSecretResponse" }) as any as Schema.Schema<SasPortalGenerateSecretResponse>;

export interface SasPortalValidateInstallerRequest {
  /** Required. Unique installer id (CPI ID) from the Certified Professional Installers database. */
  installerId?: string;
  /** Required. Secret returned by the GenerateSecret. */
  secret?: string;
  /** Required. JSON Web Token signed using a CPI private key. Payload must include a "secret" claim whose value is the secret. */
  encodedSecret?: string;
}

export const SasPortalValidateInstallerRequest: Schema.Schema<SasPortalValidateInstallerRequest> = Schema.suspend(() => Schema.Struct({
  installerId: Schema.optional(Schema.String),
  secret: Schema.optional(Schema.String),
  encodedSecret: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalValidateInstallerRequest" }) as any as Schema.Schema<SasPortalValidateInstallerRequest>;

export interface SasPortalValidateInstallerResponse {
}

export const SasPortalValidateInstallerResponse: Schema.Schema<SasPortalValidateInstallerResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SasPortalValidateInstallerResponse" }) as any as Schema.Schema<SasPortalValidateInstallerResponse>;

export interface SasPortalListDeploymentsResponse {
  /** The deployments that match the request. */
  deployments?: Array<SasPortalDeployment>;
  /** A pagination token returned from a previous call to ListDeployments that indicates from where listing should continue. If the field is missing or empty, it means there are no more deployments. */
  nextPageToken?: string;
}

export const SasPortalListDeploymentsResponse: Schema.Schema<SasPortalListDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  deployments: Schema.optional(Schema.Array(SasPortalDeployment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalListDeploymentsResponse" }) as any as Schema.Schema<SasPortalListDeploymentsResponse>;

export interface SasPortalMoveDeploymentRequest {
  /** Required. The name of the new parent resource node or customer to reparent the deployment under. */
  destination?: string;
}

export const SasPortalMoveDeploymentRequest: Schema.Schema<SasPortalMoveDeploymentRequest> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalMoveDeploymentRequest" }) as any as Schema.Schema<SasPortalMoveDeploymentRequest>;

export interface SasPortalAssignment {
  /** Required. Role that is assigned to `members`. */
  role?: string;
  /** The identities the role is assigned to. It can have the following values: * `{user_email}`: An email address that represents a specific Google account. For example: `alice@gmail.com`. * `{group_email}`: An email address that represents a Google group. For example, `viewers@gmail.com`. */
  members?: Array<string>;
}

export const SasPortalAssignment: Schema.Schema<SasPortalAssignment> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SasPortalAssignment" }) as any as Schema.Schema<SasPortalAssignment>;

export interface SasPortalPolicy {
  /** List of assignments */
  assignments?: Array<SasPortalAssignment>;
  /** The etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An etag is returned in the response to GetPolicy, and systems are expected to put that etag in the request to SetPolicy to ensure that their change will be applied to the same version of the policy. If no etag is provided in the call to GetPolicy, then the existing policy is overwritten blindly. */
  etag?: string;
}

export const SasPortalPolicy: Schema.Schema<SasPortalPolicy> = Schema.suspend(() => Schema.Struct({
  assignments: Schema.optional(Schema.Array(SasPortalAssignment)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalPolicy" }) as any as Schema.Schema<SasPortalPolicy>;

export interface SasPortalSetPolicyRequest {
  /** Required. The resource for which the policy is being specified. This policy replaces any existing policy. */
  resource?: string;
  /** Required. The policy to be applied to the `resource`. */
  policy?: SasPortalPolicy;
  /** Optional. Set the field as `true` to disable the onboarding notification. */
  disableNotification?: boolean;
}

export const SasPortalSetPolicyRequest: Schema.Schema<SasPortalSetPolicyRequest> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(Schema.String),
  policy: Schema.optional(SasPortalPolicy),
  disableNotification: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SasPortalSetPolicyRequest" }) as any as Schema.Schema<SasPortalSetPolicyRequest>;

export interface SasPortalGetPolicyRequest {
  /** Required. The resource for which the policy is being requested. */
  resource?: string;
}

export const SasPortalGetPolicyRequest: Schema.Schema<SasPortalGetPolicyRequest> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalGetPolicyRequest" }) as any as Schema.Schema<SasPortalGetPolicyRequest>;

export interface SasPortalTestPermissionsRequest {
  /** Required. The resource for which the permissions are being requested. */
  resource?: string;
  /** The set of permissions to check for the `resource`. */
  permissions?: Array<string>;
}

export const SasPortalTestPermissionsRequest: Schema.Schema<SasPortalTestPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SasPortalTestPermissionsRequest" }) as any as Schema.Schema<SasPortalTestPermissionsRequest>;

export interface SasPortalTestPermissionsResponse {
  /** A set of permissions that the caller is allowed. */
  permissions?: Array<string>;
}

export const SasPortalTestPermissionsResponse: Schema.Schema<SasPortalTestPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "SasPortalTestPermissionsResponse" }) as any as Schema.Schema<SasPortalTestPermissionsResponse>;

export interface SasPortalMigrateOrganizationMetadata {
  /** Output only. Current operation state */
  operationState?: "OPERATION_STATE_UNSPECIFIED" | "OPERATION_STATE_PENDING" | "OPERATION_STATE_RUNNING" | "OPERATION_STATE_SUCCEEDED" | "OPERATION_STATE_FAILED" | (string & {});
}

export const SasPortalMigrateOrganizationMetadata: Schema.Schema<SasPortalMigrateOrganizationMetadata> = Schema.suspend(() => Schema.Struct({
  operationState: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalMigrateOrganizationMetadata" }) as any as Schema.Schema<SasPortalMigrateOrganizationMetadata>;

export interface SasPortalDeploymentAssociation {
  /** User id of the deployment. */
  userId?: string;
  /** GCP project id of the associated project. */
  gcpProjectId?: string;
}

export const SasPortalDeploymentAssociation: Schema.Schema<SasPortalDeploymentAssociation> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
  gcpProjectId: Schema.optional(Schema.String),
})).annotate({ identifier: "SasPortalDeploymentAssociation" }) as any as Schema.Schema<SasPortalDeploymentAssociation>;

export interface SasPortalMigrateOrganizationResponse {
  /** Optional. A list of deployment association that were created for the migration, or current associations if they already exist. */
  deploymentAssociation?: Array<SasPortalDeploymentAssociation>;
}

export const SasPortalMigrateOrganizationResponse: Schema.Schema<SasPortalMigrateOrganizationResponse> = Schema.suspend(() => Schema.Struct({
  deploymentAssociation: Schema.optional(Schema.Array(SasPortalDeploymentAssociation)),
})).annotate({ identifier: "SasPortalMigrateOrganizationResponse" }) as any as Schema.Schema<SasPortalMigrateOrganizationResponse>;

export interface SasPortalSetupSasAnalyticsMetadata {
}

export const SasPortalSetupSasAnalyticsMetadata: Schema.Schema<SasPortalSetupSasAnalyticsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SasPortalSetupSasAnalyticsMetadata" }) as any as Schema.Schema<SasPortalSetupSasAnalyticsMetadata>;

export interface SasPortalSetupSasAnalyticsResponse {
}

export const SasPortalSetupSasAnalyticsResponse: Schema.Schema<SasPortalSetupSasAnalyticsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SasPortalSetupSasAnalyticsResponse" }) as any as Schema.Schema<SasPortalSetupSasAnalyticsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns a requested customer. */
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

export type GetCustomersError = CommonErrors;

export const getCustomers: API.OperationMethod<GetCustomersRequest, GetCustomersResponse, GetCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersRequest,
  output: GetCustomersResponse,
  errors: [],
}));

/** Returns a list of requested customers. */
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

export type ListCustomersError = CommonErrors;

export const listCustomers = API.makePaginated(() => ({
  input: ListCustomersRequest,
  output: ListCustomersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing customer. */
export interface PatchCustomersRequest {
  /** Output only. Resource name of the customer. */
  name: string;
  /** Fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: SasPortalCustomer;
}

export const PatchCustomersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SasPortalCustomer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/customers/{customersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCustomersRequest>;

export type PatchCustomersResponse = SasPortalCustomer;
export const PatchCustomersResponse = SasPortalCustomer;

export type PatchCustomersError = CommonErrors;

export const patchCustomers: API.OperationMethod<PatchCustomersRequest, PatchCustomersResponse, PatchCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCustomersRequest,
  output: PatchCustomersResponse,
  errors: [],
}));

/** Returns a list of SAS deployments associated with current GCP project. Includes whether SAS analytics has been enabled or not. */
export interface ListGcpProjectDeploymentsCustomersRequest {
}

export const ListGcpProjectDeploymentsCustomersRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers:listGcpProjectDeployments" }),
  svc,
) as unknown as Schema.Schema<ListGcpProjectDeploymentsCustomersRequest>;

export type ListGcpProjectDeploymentsCustomersResponse = SasPortalListGcpProjectDeploymentsResponse;
export const ListGcpProjectDeploymentsCustomersResponse = SasPortalListGcpProjectDeploymentsResponse;

export type ListGcpProjectDeploymentsCustomersError = CommonErrors;

export const listGcpProjectDeploymentsCustomers: API.OperationMethod<ListGcpProjectDeploymentsCustomersRequest, ListGcpProjectDeploymentsCustomersResponse, ListGcpProjectDeploymentsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListGcpProjectDeploymentsCustomersRequest,
  output: ListGcpProjectDeploymentsCustomersResponse,
  errors: [],
}));

/** Creates a new SAS deployment through the GCP workflow. Creates a SAS organization if an organization match is not found. */
export interface ProvisionDeploymentCustomersRequest {
  /** Request body */
  body?: SasPortalProvisionDeploymentRequest;
}

export const ProvisionDeploymentCustomersRequest = Schema.Struct({
  body: Schema.optional(SasPortalProvisionDeploymentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/customers:provisionDeployment", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProvisionDeploymentCustomersRequest>;

export type ProvisionDeploymentCustomersResponse = SasPortalProvisionDeploymentResponse;
export const ProvisionDeploymentCustomersResponse = SasPortalProvisionDeploymentResponse;

export type ProvisionDeploymentCustomersError = CommonErrors;

export const provisionDeploymentCustomers: API.OperationMethod<ProvisionDeploymentCustomersRequest, ProvisionDeploymentCustomersResponse, ProvisionDeploymentCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProvisionDeploymentCustomersRequest,
  output: ProvisionDeploymentCustomersResponse,
  errors: [],
}));

/** Returns a list of legacy organizations. */
export interface ListLegacyOrganizationsCustomersRequest {
}

export const ListLegacyOrganizationsCustomersRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers:listLegacyOrganizations" }),
  svc,
) as unknown as Schema.Schema<ListLegacyOrganizationsCustomersRequest>;

export type ListLegacyOrganizationsCustomersResponse = SasPortalListLegacyOrganizationsResponse;
export const ListLegacyOrganizationsCustomersResponse = SasPortalListLegacyOrganizationsResponse;

export type ListLegacyOrganizationsCustomersError = CommonErrors;

export const listLegacyOrganizationsCustomers: API.OperationMethod<ListLegacyOrganizationsCustomersRequest, ListLegacyOrganizationsCustomersResponse, ListLegacyOrganizationsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListLegacyOrganizationsCustomersRequest,
  output: ListLegacyOrganizationsCustomersResponse,
  errors: [],
}));

/** Migrates a SAS organization to the cloud. This will create GCP projects for each deployment and associate them. The SAS Organization is linked to the gcp project that called the command. go/sas-legacy-customer-migration */
export interface MigrateOrganizationCustomersRequest {
  /** Request body */
  body?: SasPortalMigrateOrganizationRequest;
}

export const MigrateOrganizationCustomersRequest = Schema.Struct({
  body: Schema.optional(SasPortalMigrateOrganizationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/customers:migrateOrganization", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MigrateOrganizationCustomersRequest>;

export type MigrateOrganizationCustomersResponse = SasPortalOperation;
export const MigrateOrganizationCustomersResponse = SasPortalOperation;

export type MigrateOrganizationCustomersError = CommonErrors;

export const migrateOrganizationCustomers: API.OperationMethod<MigrateOrganizationCustomersRequest, MigrateOrganizationCustomersResponse, MigrateOrganizationCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MigrateOrganizationCustomersRequest,
  output: MigrateOrganizationCustomersResponse,
  errors: [],
}));

/** Setups the a GCP Project to receive SAS Analytics messages via GCP Pub/Sub with a subscription to BigQuery. All the Pub/Sub topics and BigQuery tables are created automatically as part of this service. */
export interface SetupSasAnalyticsCustomersRequest {
  /** Request body */
  body?: SasPortalSetupSasAnalyticsRequest;
}

export const SetupSasAnalyticsCustomersRequest = Schema.Struct({
  body: Schema.optional(SasPortalSetupSasAnalyticsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/customers:setupSasAnalytics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetupSasAnalyticsCustomersRequest>;

export type SetupSasAnalyticsCustomersResponse = SasPortalOperation;
export const SetupSasAnalyticsCustomersResponse = SasPortalOperation;

export type SetupSasAnalyticsCustomersError = CommonErrors;

export const setupSasAnalyticsCustomers: API.OperationMethod<SetupSasAnalyticsCustomersRequest, SetupSasAnalyticsCustomersResponse, SetupSasAnalyticsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetupSasAnalyticsCustomersRequest,
  output: SetupSasAnalyticsCustomersResponse,
  errors: [],
}));

/** Creates a device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/devices", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersDevicesRequest>;

export type CreateCustomersDevicesResponse = SasPortalDevice;
export const CreateCustomersDevicesResponse = SasPortalDevice;

export type CreateCustomersDevicesError = CommonErrors;

export const createCustomersDevices: API.OperationMethod<CreateCustomersDevicesRequest, CreateCustomersDevicesResponse, CreateCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersDevicesRequest,
  output: CreateCustomersDevicesResponse,
  errors: [],
}));

/** Creates a signed device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/devices:createSigned", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSignedCustomersDevicesRequest>;

export type CreateSignedCustomersDevicesResponse = SasPortalDevice;
export const CreateSignedCustomersDevicesResponse = SasPortalDevice;

export type CreateSignedCustomersDevicesError = CommonErrors;

export const createSignedCustomersDevices: API.OperationMethod<CreateSignedCustomersDevicesRequest, CreateSignedCustomersDevicesResponse, CreateSignedCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSignedCustomersDevicesRequest,
  output: CreateSignedCustomersDevicesResponse,
  errors: [],
}));

/** Deletes a device. */
export interface DeleteCustomersDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const DeleteCustomersDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/customers/{customersId}/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCustomersDevicesRequest>;

export type DeleteCustomersDevicesResponse = SasPortalEmpty;
export const DeleteCustomersDevicesResponse = SasPortalEmpty;

export type DeleteCustomersDevicesError = CommonErrors;

export const deleteCustomersDevices: API.OperationMethod<DeleteCustomersDevicesRequest, DeleteCustomersDevicesResponse, DeleteCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCustomersDevicesRequest,
  output: DeleteCustomersDevicesResponse,
  errors: [],
}));

/** Gets details about a device. */
export interface GetCustomersDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const GetCustomersDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersDevicesRequest>;

export type GetCustomersDevicesResponse = SasPortalDevice;
export const GetCustomersDevicesResponse = SasPortalDevice;

export type GetCustomersDevicesError = CommonErrors;

export const getCustomersDevices: API.OperationMethod<GetCustomersDevicesRequest, GetCustomersDevicesResponse, GetCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersDevicesRequest,
  output: GetCustomersDevicesResponse,
  errors: [],
}));

/** Lists devices under a node or customer. */
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

export type ListCustomersDevicesError = CommonErrors;

export const listCustomersDevices = API.makePaginated(() => ({
  input: ListCustomersDevicesRequest,
  output: ListCustomersDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Moves a device under another node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/devices/{devicesId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveCustomersDevicesRequest>;

export type MoveCustomersDevicesResponse = SasPortalOperation;
export const MoveCustomersDevicesResponse = SasPortalOperation;

export type MoveCustomersDevicesError = CommonErrors;

export const moveCustomersDevices: API.OperationMethod<MoveCustomersDevicesRequest, MoveCustomersDevicesResponse, MoveCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveCustomersDevicesRequest,
  output: MoveCustomersDevicesResponse,
  errors: [],
}));

/** Updates a device. */
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
  T.Http({ method: "PATCH", path: "v1alpha1/customers/{customersId}/devices/{devicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCustomersDevicesRequest>;

export type PatchCustomersDevicesResponse = SasPortalDevice;
export const PatchCustomersDevicesResponse = SasPortalDevice;

export type PatchCustomersDevicesError = CommonErrors;

export const patchCustomersDevices: API.OperationMethod<PatchCustomersDevicesRequest, PatchCustomersDevicesResponse, PatchCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCustomersDevicesRequest,
  output: PatchCustomersDevicesResponse,
  errors: [],
}));

/** Updates a signed device. */
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
  T.Http({ method: "PATCH", path: "v1alpha1/customers/{customersId}/devices/{devicesId}:updateSigned", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSignedCustomersDevicesRequest>;

export type UpdateSignedCustomersDevicesResponse = SasPortalDevice;
export const UpdateSignedCustomersDevicesResponse = SasPortalDevice;

export type UpdateSignedCustomersDevicesError = CommonErrors;

export const updateSignedCustomersDevices: API.OperationMethod<UpdateSignedCustomersDevicesRequest, UpdateSignedCustomersDevicesResponse, UpdateSignedCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSignedCustomersDevicesRequest,
  output: UpdateSignedCustomersDevicesResponse,
  errors: [],
}));

/** Signs a device. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/devices/{devicesId}:signDevice", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignDeviceCustomersDevicesRequest>;

export type SignDeviceCustomersDevicesResponse = SasPortalEmpty;
export const SignDeviceCustomersDevicesResponse = SasPortalEmpty;

export type SignDeviceCustomersDevicesError = CommonErrors;

export const signDeviceCustomersDevices: API.OperationMethod<SignDeviceCustomersDevicesRequest, SignDeviceCustomersDevicesResponse, SignDeviceCustomersDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignDeviceCustomersDevicesRequest,
  output: SignDeviceCustomersDevicesResponse,
  errors: [],
}));

/** Creates a new node. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/nodes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersNodesRequest>;

export type CreateCustomersNodesResponse = SasPortalNode;
export const CreateCustomersNodesResponse = SasPortalNode;

export type CreateCustomersNodesError = CommonErrors;

export const createCustomersNodes: API.OperationMethod<CreateCustomersNodesRequest, CreateCustomersNodesResponse, CreateCustomersNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersNodesRequest,
  output: CreateCustomersNodesResponse,
  errors: [],
}));

/** Deletes a node. */
export interface DeleteCustomersNodesRequest {
  /** Required. The name of the node. */
  name: string;
}

export const DeleteCustomersNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/customers/{customersId}/nodes/{nodesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCustomersNodesRequest>;

export type DeleteCustomersNodesResponse = SasPortalEmpty;
export const DeleteCustomersNodesResponse = SasPortalEmpty;

export type DeleteCustomersNodesError = CommonErrors;

export const deleteCustomersNodes: API.OperationMethod<DeleteCustomersNodesRequest, DeleteCustomersNodesResponse, DeleteCustomersNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCustomersNodesRequest,
  output: DeleteCustomersNodesResponse,
  errors: [],
}));

/** Returns a requested node. */
export interface GetCustomersNodesRequest {
  /** Required. The name of the node. */
  name: string;
}

export const GetCustomersNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}/nodes/{nodesId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersNodesRequest>;

export type GetCustomersNodesResponse = SasPortalNode;
export const GetCustomersNodesResponse = SasPortalNode;

export type GetCustomersNodesError = CommonErrors;

export const getCustomersNodes: API.OperationMethod<GetCustomersNodesRequest, GetCustomersNodesResponse, GetCustomersNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersNodesRequest,
  output: GetCustomersNodesResponse,
  errors: [],
}));

/** Lists nodes. */
export interface ListCustomersNodesRequest {
  /** Required. The parent resource name, for example, "nodes/1". */
  parent: string;
  /** The maximum number of nodes to return in the response. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListNodes that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no nodes are filtered. */
  filter?: string;
}

export const ListCustomersNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}/nodes" }),
  svc,
) as unknown as Schema.Schema<ListCustomersNodesRequest>;

export type ListCustomersNodesResponse = SasPortalListNodesResponse;
export const ListCustomersNodesResponse = SasPortalListNodesResponse;

export type ListCustomersNodesError = CommonErrors;

export const listCustomersNodes = API.makePaginated(() => ({
  input: ListCustomersNodesRequest,
  output: ListCustomersNodesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Moves a node under another node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/nodes/{nodesId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveCustomersNodesRequest>;

export type MoveCustomersNodesResponse = SasPortalOperation;
export const MoveCustomersNodesResponse = SasPortalOperation;

export type MoveCustomersNodesError = CommonErrors;

export const moveCustomersNodes: API.OperationMethod<MoveCustomersNodesRequest, MoveCustomersNodesResponse, MoveCustomersNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveCustomersNodesRequest,
  output: MoveCustomersNodesResponse,
  errors: [],
}));

/** Updates an existing node. */
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
  T.Http({ method: "PATCH", path: "v1alpha1/customers/{customersId}/nodes/{nodesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCustomersNodesRequest>;

export type PatchCustomersNodesResponse = SasPortalNode;
export const PatchCustomersNodesResponse = SasPortalNode;

export type PatchCustomersNodesError = CommonErrors;

export const patchCustomersNodes: API.OperationMethod<PatchCustomersNodesRequest, PatchCustomersNodesResponse, PatchCustomersNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCustomersNodesRequest,
  output: PatchCustomersNodesResponse,
  errors: [],
}));

/** Creates a device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/devices", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersNodesDevicesRequest>;

export type CreateCustomersNodesDevicesResponse = SasPortalDevice;
export const CreateCustomersNodesDevicesResponse = SasPortalDevice;

export type CreateCustomersNodesDevicesError = CommonErrors;

export const createCustomersNodesDevices: API.OperationMethod<CreateCustomersNodesDevicesRequest, CreateCustomersNodesDevicesResponse, CreateCustomersNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersNodesDevicesRequest,
  output: CreateCustomersNodesDevicesResponse,
  errors: [],
}));

/** Creates a signed device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/devices:createSigned", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSignedCustomersNodesDevicesRequest>;

export type CreateSignedCustomersNodesDevicesResponse = SasPortalDevice;
export const CreateSignedCustomersNodesDevicesResponse = SasPortalDevice;

export type CreateSignedCustomersNodesDevicesError = CommonErrors;

export const createSignedCustomersNodesDevices: API.OperationMethod<CreateSignedCustomersNodesDevicesRequest, CreateSignedCustomersNodesDevicesResponse, CreateSignedCustomersNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSignedCustomersNodesDevicesRequest,
  output: CreateSignedCustomersNodesDevicesResponse,
  errors: [],
}));

/** Lists devices under a node or customer. */
export interface ListCustomersNodesDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000]. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListDevices that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive. */
  filter?: string;
}

export const ListCustomersNodesDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/devices" }),
  svc,
) as unknown as Schema.Schema<ListCustomersNodesDevicesRequest>;

export type ListCustomersNodesDevicesResponse = SasPortalListDevicesResponse;
export const ListCustomersNodesDevicesResponse = SasPortalListDevicesResponse;

export type ListCustomersNodesDevicesError = CommonErrors;

export const listCustomersNodesDevices = API.makePaginated(() => ({
  input: ListCustomersNodesDevicesRequest,
  output: ListCustomersNodesDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new node. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/nodes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersNodesNodesRequest>;

export type CreateCustomersNodesNodesResponse = SasPortalNode;
export const CreateCustomersNodesNodesResponse = SasPortalNode;

export type CreateCustomersNodesNodesError = CommonErrors;

export const createCustomersNodesNodes: API.OperationMethod<CreateCustomersNodesNodesRequest, CreateCustomersNodesNodesResponse, CreateCustomersNodesNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersNodesNodesRequest,
  output: CreateCustomersNodesNodesResponse,
  errors: [],
}));

/** Lists nodes. */
export interface ListCustomersNodesNodesRequest {
  /** Required. The parent resource name, for example, "nodes/1". */
  parent: string;
  /** The maximum number of nodes to return in the response. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListNodes that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no nodes are filtered. */
  filter?: string;
}

export const ListCustomersNodesNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/nodes" }),
  svc,
) as unknown as Schema.Schema<ListCustomersNodesNodesRequest>;

export type ListCustomersNodesNodesResponse = SasPortalListNodesResponse;
export const ListCustomersNodesNodesResponse = SasPortalListNodesResponse;

export type ListCustomersNodesNodesError = CommonErrors;

export const listCustomersNodesNodes = API.makePaginated(() => ({
  input: ListCustomersNodesNodesRequest,
  output: ListCustomersNodesNodesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new deployment. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/deployments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersNodesDeploymentsRequest>;

export type CreateCustomersNodesDeploymentsResponse = SasPortalDeployment;
export const CreateCustomersNodesDeploymentsResponse = SasPortalDeployment;

export type CreateCustomersNodesDeploymentsError = CommonErrors;

export const createCustomersNodesDeployments: API.OperationMethod<CreateCustomersNodesDeploymentsRequest, CreateCustomersNodesDeploymentsResponse, CreateCustomersNodesDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersNodesDeploymentsRequest,
  output: CreateCustomersNodesDeploymentsResponse,
  errors: [],
}));

/** Lists deployments. */
export interface ListCustomersNodesDeploymentsRequest {
  /** Required. The parent resource name, for example, "nodes/1", customer/1/nodes/2. */
  parent: string;
  /** The maximum number of deployments to return in the response. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListDeployments that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no deployments are filtered. */
  filter?: string;
}

export const ListCustomersNodesDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}/nodes/{nodesId}/deployments" }),
  svc,
) as unknown as Schema.Schema<ListCustomersNodesDeploymentsRequest>;

export type ListCustomersNodesDeploymentsResponse = SasPortalListDeploymentsResponse;
export const ListCustomersNodesDeploymentsResponse = SasPortalListDeploymentsResponse;

export type ListCustomersNodesDeploymentsError = CommonErrors;

export const listCustomersNodesDeployments = API.makePaginated(() => ({
  input: ListCustomersNodesDeploymentsRequest,
  output: ListCustomersNodesDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new deployment. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/deployments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersDeploymentsRequest>;

export type CreateCustomersDeploymentsResponse = SasPortalDeployment;
export const CreateCustomersDeploymentsResponse = SasPortalDeployment;

export type CreateCustomersDeploymentsError = CommonErrors;

export const createCustomersDeployments: API.OperationMethod<CreateCustomersDeploymentsRequest, CreateCustomersDeploymentsResponse, CreateCustomersDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersDeploymentsRequest,
  output: CreateCustomersDeploymentsResponse,
  errors: [],
}));

/** Deletes a deployment. */
export interface DeleteCustomersDeploymentsRequest {
  /** Required. The name of the deployment. */
  name: string;
}

export const DeleteCustomersDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCustomersDeploymentsRequest>;

export type DeleteCustomersDeploymentsResponse = SasPortalEmpty;
export const DeleteCustomersDeploymentsResponse = SasPortalEmpty;

export type DeleteCustomersDeploymentsError = CommonErrors;

export const deleteCustomersDeployments: API.OperationMethod<DeleteCustomersDeploymentsRequest, DeleteCustomersDeploymentsResponse, DeleteCustomersDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCustomersDeploymentsRequest,
  output: DeleteCustomersDeploymentsResponse,
  errors: [],
}));

/** Returns a requested deployment. */
export interface GetCustomersDeploymentsRequest {
  /** Required. The name of the deployment. */
  name: string;
}

export const GetCustomersDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersDeploymentsRequest>;

export type GetCustomersDeploymentsResponse = SasPortalDeployment;
export const GetCustomersDeploymentsResponse = SasPortalDeployment;

export type GetCustomersDeploymentsError = CommonErrors;

export const getCustomersDeployments: API.OperationMethod<GetCustomersDeploymentsRequest, GetCustomersDeploymentsResponse, GetCustomersDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersDeploymentsRequest,
  output: GetCustomersDeploymentsResponse,
  errors: [],
}));

/** Lists deployments. */
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
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}/deployments" }),
  svc,
) as unknown as Schema.Schema<ListCustomersDeploymentsRequest>;

export type ListCustomersDeploymentsResponse = SasPortalListDeploymentsResponse;
export const ListCustomersDeploymentsResponse = SasPortalListDeploymentsResponse;

export type ListCustomersDeploymentsError = CommonErrors;

export const listCustomersDeployments = API.makePaginated(() => ({
  input: ListCustomersDeploymentsRequest,
  output: ListCustomersDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing deployment. */
export interface PatchCustomersDeploymentsRequest {
  /** Output only. Resource name. */
  name: string;
  /** Fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: SasPortalDeployment;
}

export const PatchCustomersDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SasPortalDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCustomersDeploymentsRequest>;

export type PatchCustomersDeploymentsResponse = SasPortalDeployment;
export const PatchCustomersDeploymentsResponse = SasPortalDeployment;

export type PatchCustomersDeploymentsError = CommonErrors;

export const patchCustomersDeployments: API.OperationMethod<PatchCustomersDeploymentsRequest, PatchCustomersDeploymentsResponse, PatchCustomersDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCustomersDeploymentsRequest,
  output: PatchCustomersDeploymentsResponse,
  errors: [],
}));

/** Moves a deployment under another node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveCustomersDeploymentsRequest>;

export type MoveCustomersDeploymentsResponse = SasPortalOperation;
export const MoveCustomersDeploymentsResponse = SasPortalOperation;

export type MoveCustomersDeploymentsError = CommonErrors;

export const moveCustomersDeployments: API.OperationMethod<MoveCustomersDeploymentsRequest, MoveCustomersDeploymentsResponse, MoveCustomersDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveCustomersDeploymentsRequest,
  output: MoveCustomersDeploymentsResponse,
  errors: [],
}));

/** Creates a device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}/devices", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersDeploymentsDevicesRequest>;

export type CreateCustomersDeploymentsDevicesResponse = SasPortalDevice;
export const CreateCustomersDeploymentsDevicesResponse = SasPortalDevice;

export type CreateCustomersDeploymentsDevicesError = CommonErrors;

export const createCustomersDeploymentsDevices: API.OperationMethod<CreateCustomersDeploymentsDevicesRequest, CreateCustomersDeploymentsDevicesResponse, CreateCustomersDeploymentsDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersDeploymentsDevicesRequest,
  output: CreateCustomersDeploymentsDevicesResponse,
  errors: [],
}));

/** Creates a signed device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}/devices:createSigned", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSignedCustomersDeploymentsDevicesRequest>;

export type CreateSignedCustomersDeploymentsDevicesResponse = SasPortalDevice;
export const CreateSignedCustomersDeploymentsDevicesResponse = SasPortalDevice;

export type CreateSignedCustomersDeploymentsDevicesError = CommonErrors;

export const createSignedCustomersDeploymentsDevices: API.OperationMethod<CreateSignedCustomersDeploymentsDevicesRequest, CreateSignedCustomersDeploymentsDevicesResponse, CreateSignedCustomersDeploymentsDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSignedCustomersDeploymentsDevicesRequest,
  output: CreateSignedCustomersDeploymentsDevicesResponse,
  errors: [],
}));

/** Lists devices under a node or customer. */
export interface ListCustomersDeploymentsDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000]. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListDevices that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive. */
  filter?: string;
}

export const ListCustomersDeploymentsDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/customers/{customersId}/deployments/{deploymentsId}/devices" }),
  svc,
) as unknown as Schema.Schema<ListCustomersDeploymentsDevicesRequest>;

export type ListCustomersDeploymentsDevicesResponse = SasPortalListDevicesResponse;
export const ListCustomersDeploymentsDevicesResponse = SasPortalListDevicesResponse;

export type ListCustomersDeploymentsDevicesError = CommonErrors;

export const listCustomersDeploymentsDevices = API.makePaginated(() => ({
  input: ListCustomersDeploymentsDevicesRequest,
  output: ListCustomersDeploymentsDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns a requested node. */
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

export type GetNodesError = CommonErrors;

export const getNodes: API.OperationMethod<GetNodesRequest, GetNodesResponse, GetNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNodesRequest,
  output: GetNodesResponse,
  errors: [],
}));

/** Creates a device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/devices", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNodesDevicesRequest>;

export type CreateNodesDevicesResponse = SasPortalDevice;
export const CreateNodesDevicesResponse = SasPortalDevice;

export type CreateNodesDevicesError = CommonErrors;

export const createNodesDevices: API.OperationMethod<CreateNodesDevicesRequest, CreateNodesDevicesResponse, CreateNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNodesDevicesRequest,
  output: CreateNodesDevicesResponse,
  errors: [],
}));

/** Creates a signed device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/devices:createSigned", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSignedNodesDevicesRequest>;

export type CreateSignedNodesDevicesResponse = SasPortalDevice;
export const CreateSignedNodesDevicesResponse = SasPortalDevice;

export type CreateSignedNodesDevicesError = CommonErrors;

export const createSignedNodesDevices: API.OperationMethod<CreateSignedNodesDevicesRequest, CreateSignedNodesDevicesResponse, CreateSignedNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSignedNodesDevicesRequest,
  output: CreateSignedNodesDevicesResponse,
  errors: [],
}));

/** Deletes a device. */
export interface DeleteNodesDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const DeleteNodesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteNodesDevicesRequest>;

export type DeleteNodesDevicesResponse = SasPortalEmpty;
export const DeleteNodesDevicesResponse = SasPortalEmpty;

export type DeleteNodesDevicesError = CommonErrors;

export const deleteNodesDevices: API.OperationMethod<DeleteNodesDevicesRequest, DeleteNodesDevicesResponse, DeleteNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNodesDevicesRequest,
  output: DeleteNodesDevicesResponse,
  errors: [],
}));

/** Gets details about a device. */
export interface GetNodesDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const GetNodesDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<GetNodesDevicesRequest>;

export type GetNodesDevicesResponse = SasPortalDevice;
export const GetNodesDevicesResponse = SasPortalDevice;

export type GetNodesDevicesError = CommonErrors;

export const getNodesDevices: API.OperationMethod<GetNodesDevicesRequest, GetNodesDevicesResponse, GetNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNodesDevicesRequest,
  output: GetNodesDevicesResponse,
  errors: [],
}));

/** Lists devices under a node or customer. */
export interface ListNodesDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000]. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListDevices that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive. */
  filter?: string;
}

export const ListNodesDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/devices" }),
  svc,
) as unknown as Schema.Schema<ListNodesDevicesRequest>;

export type ListNodesDevicesResponse = SasPortalListDevicesResponse;
export const ListNodesDevicesResponse = SasPortalListDevicesResponse;

export type ListNodesDevicesError = CommonErrors;

export const listNodesDevices = API.makePaginated(() => ({
  input: ListNodesDevicesRequest,
  output: ListNodesDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Moves a device under another node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveNodesDevicesRequest>;

export type MoveNodesDevicesResponse = SasPortalOperation;
export const MoveNodesDevicesResponse = SasPortalOperation;

export type MoveNodesDevicesError = CommonErrors;

export const moveNodesDevices: API.OperationMethod<MoveNodesDevicesRequest, MoveNodesDevicesResponse, MoveNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveNodesDevicesRequest,
  output: MoveNodesDevicesResponse,
  errors: [],
}));

/** Updates a device. */
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
  T.Http({ method: "PATCH", path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchNodesDevicesRequest>;

export type PatchNodesDevicesResponse = SasPortalDevice;
export const PatchNodesDevicesResponse = SasPortalDevice;

export type PatchNodesDevicesError = CommonErrors;

export const patchNodesDevices: API.OperationMethod<PatchNodesDevicesRequest, PatchNodesDevicesResponse, PatchNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchNodesDevicesRequest,
  output: PatchNodesDevicesResponse,
  errors: [],
}));

/** Updates a signed device. */
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
  T.Http({ method: "PATCH", path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}:updateSigned", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSignedNodesDevicesRequest>;

export type UpdateSignedNodesDevicesResponse = SasPortalDevice;
export const UpdateSignedNodesDevicesResponse = SasPortalDevice;

export type UpdateSignedNodesDevicesError = CommonErrors;

export const updateSignedNodesDevices: API.OperationMethod<UpdateSignedNodesDevicesRequest, UpdateSignedNodesDevicesResponse, UpdateSignedNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSignedNodesDevicesRequest,
  output: UpdateSignedNodesDevicesResponse,
  errors: [],
}));

/** Signs a device. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/devices/{devicesId}:signDevice", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignDeviceNodesDevicesRequest>;

export type SignDeviceNodesDevicesResponse = SasPortalEmpty;
export const SignDeviceNodesDevicesResponse = SasPortalEmpty;

export type SignDeviceNodesDevicesError = CommonErrors;

export const signDeviceNodesDevices: API.OperationMethod<SignDeviceNodesDevicesRequest, SignDeviceNodesDevicesResponse, SignDeviceNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignDeviceNodesDevicesRequest,
  output: SignDeviceNodesDevicesResponse,
  errors: [],
}));

/** Creates a new node. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/nodes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNodesNodesRequest>;

export type CreateNodesNodesResponse = SasPortalNode;
export const CreateNodesNodesResponse = SasPortalNode;

export type CreateNodesNodesError = CommonErrors;

export const createNodesNodes: API.OperationMethod<CreateNodesNodesRequest, CreateNodesNodesResponse, CreateNodesNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNodesNodesRequest,
  output: CreateNodesNodesResponse,
  errors: [],
}));

/** Deletes a node. */
export interface DeleteNodesNodesRequest {
  /** Required. The name of the node. */
  name: string;
}

export const DeleteNodesNodesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}" }),
  svc,
) as unknown as Schema.Schema<DeleteNodesNodesRequest>;

export type DeleteNodesNodesResponse = SasPortalEmpty;
export const DeleteNodesNodesResponse = SasPortalEmpty;

export type DeleteNodesNodesError = CommonErrors;

export const deleteNodesNodes: API.OperationMethod<DeleteNodesNodesRequest, DeleteNodesNodesResponse, DeleteNodesNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNodesNodesRequest,
  output: DeleteNodesNodesResponse,
  errors: [],
}));

/** Returns a requested node. */
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

export type GetNodesNodesError = CommonErrors;

export const getNodesNodes: API.OperationMethod<GetNodesNodesRequest, GetNodesNodesResponse, GetNodesNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNodesNodesRequest,
  output: GetNodesNodesResponse,
  errors: [],
}));

/** Lists nodes. */
export interface ListNodesNodesRequest {
  /** Required. The parent resource name, for example, "nodes/1". */
  parent: string;
  /** The maximum number of nodes to return in the response. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListNodes that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no nodes are filtered. */
  filter?: string;
}

export const ListNodesNodesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/nodes" }),
  svc,
) as unknown as Schema.Schema<ListNodesNodesRequest>;

export type ListNodesNodesResponse = SasPortalListNodesResponse;
export const ListNodesNodesResponse = SasPortalListNodesResponse;

export type ListNodesNodesError = CommonErrors;

export const listNodesNodes = API.makePaginated(() => ({
  input: ListNodesNodesRequest,
  output: ListNodesNodesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Moves a node under another node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveNodesNodesRequest>;

export type MoveNodesNodesResponse = SasPortalOperation;
export const MoveNodesNodesResponse = SasPortalOperation;

export type MoveNodesNodesError = CommonErrors;

export const moveNodesNodes: API.OperationMethod<MoveNodesNodesRequest, MoveNodesNodesResponse, MoveNodesNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveNodesNodesRequest,
  output: MoveNodesNodesResponse,
  errors: [],
}));

/** Updates an existing node. */
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
  T.Http({ method: "PATCH", path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchNodesNodesRequest>;

export type PatchNodesNodesResponse = SasPortalNode;
export const PatchNodesNodesResponse = SasPortalNode;

export type PatchNodesNodesError = CommonErrors;

export const patchNodesNodes: API.OperationMethod<PatchNodesNodesRequest, PatchNodesNodesResponse, PatchNodesNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchNodesNodesRequest,
  output: PatchNodesNodesResponse,
  errors: [],
}));

/** Creates a device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/devices", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNodesNodesDevicesRequest>;

export type CreateNodesNodesDevicesResponse = SasPortalDevice;
export const CreateNodesNodesDevicesResponse = SasPortalDevice;

export type CreateNodesNodesDevicesError = CommonErrors;

export const createNodesNodesDevices: API.OperationMethod<CreateNodesNodesDevicesRequest, CreateNodesNodesDevicesResponse, CreateNodesNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNodesNodesDevicesRequest,
  output: CreateNodesNodesDevicesResponse,
  errors: [],
}));

/** Creates a signed device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/devices:createSigned", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSignedNodesNodesDevicesRequest>;

export type CreateSignedNodesNodesDevicesResponse = SasPortalDevice;
export const CreateSignedNodesNodesDevicesResponse = SasPortalDevice;

export type CreateSignedNodesNodesDevicesError = CommonErrors;

export const createSignedNodesNodesDevices: API.OperationMethod<CreateSignedNodesNodesDevicesRequest, CreateSignedNodesNodesDevicesResponse, CreateSignedNodesNodesDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSignedNodesNodesDevicesRequest,
  output: CreateSignedNodesNodesDevicesResponse,
  errors: [],
}));

/** Lists devices under a node or customer. */
export interface ListNodesNodesDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000]. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListDevices that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive. */
  filter?: string;
}

export const ListNodesNodesDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/devices" }),
  svc,
) as unknown as Schema.Schema<ListNodesNodesDevicesRequest>;

export type ListNodesNodesDevicesResponse = SasPortalListDevicesResponse;
export const ListNodesNodesDevicesResponse = SasPortalListDevicesResponse;

export type ListNodesNodesDevicesError = CommonErrors;

export const listNodesNodesDevices = API.makePaginated(() => ({
  input: ListNodesNodesDevicesRequest,
  output: ListNodesNodesDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new node. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/nodes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNodesNodesNodesRequest>;

export type CreateNodesNodesNodesResponse = SasPortalNode;
export const CreateNodesNodesNodesResponse = SasPortalNode;

export type CreateNodesNodesNodesError = CommonErrors;

export const createNodesNodesNodes: API.OperationMethod<CreateNodesNodesNodesRequest, CreateNodesNodesNodesResponse, CreateNodesNodesNodesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNodesNodesNodesRequest,
  output: CreateNodesNodesNodesResponse,
  errors: [],
}));

/** Lists nodes. */
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
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/nodes" }),
  svc,
) as unknown as Schema.Schema<ListNodesNodesNodesRequest>;

export type ListNodesNodesNodesResponse = SasPortalListNodesResponse;
export const ListNodesNodesNodesResponse = SasPortalListNodesResponse;

export type ListNodesNodesNodesError = CommonErrors;

export const listNodesNodesNodes = API.makePaginated(() => ({
  input: ListNodesNodesNodesRequest,
  output: ListNodesNodesNodesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new deployment. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/deployments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNodesNodesDeploymentsRequest>;

export type CreateNodesNodesDeploymentsResponse = SasPortalDeployment;
export const CreateNodesNodesDeploymentsResponse = SasPortalDeployment;

export type CreateNodesNodesDeploymentsError = CommonErrors;

export const createNodesNodesDeployments: API.OperationMethod<CreateNodesNodesDeploymentsRequest, CreateNodesNodesDeploymentsResponse, CreateNodesNodesDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNodesNodesDeploymentsRequest,
  output: CreateNodesNodesDeploymentsResponse,
  errors: [],
}));

/** Lists deployments. */
export interface ListNodesNodesDeploymentsRequest {
  /** Required. The parent resource name, for example, "nodes/1", customer/1/nodes/2. */
  parent: string;
  /** The maximum number of deployments to return in the response. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListDeployments that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no deployments are filtered. */
  filter?: string;
}

export const ListNodesNodesDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/nodes/{nodesId1}/deployments" }),
  svc,
) as unknown as Schema.Schema<ListNodesNodesDeploymentsRequest>;

export type ListNodesNodesDeploymentsResponse = SasPortalListDeploymentsResponse;
export const ListNodesNodesDeploymentsResponse = SasPortalListDeploymentsResponse;

export type ListNodesNodesDeploymentsError = CommonErrors;

export const listNodesNodesDeployments = API.makePaginated(() => ({
  input: ListNodesNodesDeploymentsRequest,
  output: ListNodesNodesDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a deployment. */
export interface DeleteNodesDeploymentsRequest {
  /** Required. The name of the deployment. */
  name: string;
}

export const DeleteNodesDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteNodesDeploymentsRequest>;

export type DeleteNodesDeploymentsResponse = SasPortalEmpty;
export const DeleteNodesDeploymentsResponse = SasPortalEmpty;

export type DeleteNodesDeploymentsError = CommonErrors;

export const deleteNodesDeployments: API.OperationMethod<DeleteNodesDeploymentsRequest, DeleteNodesDeploymentsResponse, DeleteNodesDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNodesDeploymentsRequest,
  output: DeleteNodesDeploymentsResponse,
  errors: [],
}));

/** Returns a requested deployment. */
export interface GetNodesDeploymentsRequest {
  /** Required. The name of the deployment. */
  name: string;
}

export const GetNodesDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetNodesDeploymentsRequest>;

export type GetNodesDeploymentsResponse = SasPortalDeployment;
export const GetNodesDeploymentsResponse = SasPortalDeployment;

export type GetNodesDeploymentsError = CommonErrors;

export const getNodesDeployments: API.OperationMethod<GetNodesDeploymentsRequest, GetNodesDeploymentsResponse, GetNodesDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNodesDeploymentsRequest,
  output: GetNodesDeploymentsResponse,
  errors: [],
}));

/** Lists deployments. */
export interface ListNodesDeploymentsRequest {
  /** Required. The parent resource name, for example, "nodes/1", customer/1/nodes/2. */
  parent: string;
  /** The maximum number of deployments to return in the response. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListDeployments that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have the following format: "DIRECT_CHILDREN" or format: "direct_children". The filter is case insensitive. If empty, then no deployments are filtered. */
  filter?: string;
}

export const ListNodesDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/deployments" }),
  svc,
) as unknown as Schema.Schema<ListNodesDeploymentsRequest>;

export type ListNodesDeploymentsResponse = SasPortalListDeploymentsResponse;
export const ListNodesDeploymentsResponse = SasPortalListDeploymentsResponse;

export type ListNodesDeploymentsError = CommonErrors;

export const listNodesDeployments = API.makePaginated(() => ({
  input: ListNodesDeploymentsRequest,
  output: ListNodesDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing deployment. */
export interface PatchNodesDeploymentsRequest {
  /** Output only. Resource name. */
  name: string;
  /** Fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: SasPortalDeployment;
}

export const PatchNodesDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(SasPortalDeployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchNodesDeploymentsRequest>;

export type PatchNodesDeploymentsResponse = SasPortalDeployment;
export const PatchNodesDeploymentsResponse = SasPortalDeployment;

export type PatchNodesDeploymentsError = CommonErrors;

export const patchNodesDeployments: API.OperationMethod<PatchNodesDeploymentsRequest, PatchNodesDeploymentsResponse, PatchNodesDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchNodesDeploymentsRequest,
  output: PatchNodesDeploymentsResponse,
  errors: [],
}));

/** Moves a deployment under another node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveNodesDeploymentsRequest>;

export type MoveNodesDeploymentsResponse = SasPortalOperation;
export const MoveNodesDeploymentsResponse = SasPortalOperation;

export type MoveNodesDeploymentsError = CommonErrors;

export const moveNodesDeployments: API.OperationMethod<MoveNodesDeploymentsRequest, MoveNodesDeploymentsResponse, MoveNodesDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveNodesDeploymentsRequest,
  output: MoveNodesDeploymentsResponse,
  errors: [],
}));

/** Creates a device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}/devices", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNodesDeploymentsDevicesRequest>;

export type CreateNodesDeploymentsDevicesResponse = SasPortalDevice;
export const CreateNodesDeploymentsDevicesResponse = SasPortalDevice;

export type CreateNodesDeploymentsDevicesError = CommonErrors;

export const createNodesDeploymentsDevices: API.OperationMethod<CreateNodesDeploymentsDevicesRequest, CreateNodesDeploymentsDevicesResponse, CreateNodesDeploymentsDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNodesDeploymentsDevicesRequest,
  output: CreateNodesDeploymentsDevicesResponse,
  errors: [],
}));

/** Creates a signed device under a node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}/devices:createSigned", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSignedNodesDeploymentsDevicesRequest>;

export type CreateSignedNodesDeploymentsDevicesResponse = SasPortalDevice;
export const CreateSignedNodesDeploymentsDevicesResponse = SasPortalDevice;

export type CreateSignedNodesDeploymentsDevicesError = CommonErrors;

export const createSignedNodesDeploymentsDevices: API.OperationMethod<CreateSignedNodesDeploymentsDevicesRequest, CreateSignedNodesDeploymentsDevicesResponse, CreateSignedNodesDeploymentsDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSignedNodesDeploymentsDevicesRequest,
  output: CreateSignedNodesDeploymentsDevicesResponse,
  errors: [],
}));

/** Lists devices under a node or customer. */
export interface ListNodesDeploymentsDevicesRequest {
  /** Required. The name of the parent resource. */
  parent: string;
  /** The maximum number of devices to return in the response. If empty or zero, all devices will be listed. Must be in the range [0, 1000]. */
  pageSize?: number;
  /** A pagination token returned from a previous call to ListDevices that indicates where this listing should continue from. */
  pageToken?: string;
  /** The filter expression. The filter should have one of the following formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial number of the device. The filter is case insensitive. */
  filter?: string;
}

export const ListNodesDeploymentsDevicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/nodes/{nodesId}/deployments/{deploymentsId}/devices" }),
  svc,
) as unknown as Schema.Schema<ListNodesDeploymentsDevicesRequest>;

export type ListNodesDeploymentsDevicesResponse = SasPortalListDevicesResponse;
export const ListNodesDeploymentsDevicesResponse = SasPortalListDevicesResponse;

export type ListNodesDeploymentsDevicesError = CommonErrors;

export const listNodesDeploymentsDevices = API.makePaginated(() => ({
  input: ListNodesDeploymentsDevicesRequest,
  output: ListNodesDeploymentsDevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Generates a secret to be used with the ValidateInstaller. */
export interface GenerateSecretInstallerRequest {
  /** Request body */
  body?: SasPortalGenerateSecretRequest;
}

export const GenerateSecretInstallerRequest = Schema.Struct({
  body: Schema.optional(SasPortalGenerateSecretRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/installer:generateSecret", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateSecretInstallerRequest>;

export type GenerateSecretInstallerResponse = SasPortalGenerateSecretResponse;
export const GenerateSecretInstallerResponse = SasPortalGenerateSecretResponse;

export type GenerateSecretInstallerError = CommonErrors;

export const generateSecretInstaller: API.OperationMethod<GenerateSecretInstallerRequest, GenerateSecretInstallerResponse, GenerateSecretInstallerError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateSecretInstallerRequest,
  output: GenerateSecretInstallerResponse,
  errors: [],
}));

/** Validates the identity of a Certified Professional Installer (CPI). */
export interface ValidateInstallerRequest {
  /** Request body */
  body?: SasPortalValidateInstallerRequest;
}

export const ValidateInstallerRequest = Schema.Struct({
  body: Schema.optional(SasPortalValidateInstallerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/installer:validate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateInstallerRequest>;

export type ValidateInstallerResponse = SasPortalValidateInstallerResponse;
export const ValidateInstallerResponse = SasPortalValidateInstallerResponse;

export type ValidateInstallerError = CommonErrors;

export const validateInstaller: API.OperationMethod<ValidateInstallerRequest, ValidateInstallerResponse, ValidateInstallerError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateInstallerRequest,
  output: ValidateInstallerResponse,
  errors: [],
}));

/** Returns a requested deployment. */
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

export type GetDeploymentsError = CommonErrors;

export const getDeployments: API.OperationMethod<GetDeploymentsRequest, GetDeploymentsResponse, GetDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDeploymentsRequest,
  output: GetDeploymentsResponse,
  errors: [],
}));

/** Deletes a device. */
export interface DeleteDeploymentsDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const DeleteDeploymentsDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteDeploymentsDevicesRequest>;

export type DeleteDeploymentsDevicesResponse = SasPortalEmpty;
export const DeleteDeploymentsDevicesResponse = SasPortalEmpty;

export type DeleteDeploymentsDevicesError = CommonErrors;

export const deleteDeploymentsDevices: API.OperationMethod<DeleteDeploymentsDevicesRequest, DeleteDeploymentsDevicesResponse, DeleteDeploymentsDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDeploymentsDevicesRequest,
  output: DeleteDeploymentsDevicesResponse,
  errors: [],
}));

/** Gets details about a device. */
export interface GetDeploymentsDevicesRequest {
  /** Required. The name of the device. */
  name: string;
}

export const GetDeploymentsDevicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}" }),
  svc,
) as unknown as Schema.Schema<GetDeploymentsDevicesRequest>;

export type GetDeploymentsDevicesResponse = SasPortalDevice;
export const GetDeploymentsDevicesResponse = SasPortalDevice;

export type GetDeploymentsDevicesError = CommonErrors;

export const getDeploymentsDevices: API.OperationMethod<GetDeploymentsDevicesRequest, GetDeploymentsDevicesResponse, GetDeploymentsDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDeploymentsDevicesRequest,
  output: GetDeploymentsDevicesResponse,
  errors: [],
}));

/** Moves a device under another node or customer. */
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
  T.Http({ method: "POST", path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveDeploymentsDevicesRequest>;

export type MoveDeploymentsDevicesResponse = SasPortalOperation;
export const MoveDeploymentsDevicesResponse = SasPortalOperation;

export type MoveDeploymentsDevicesError = CommonErrors;

export const moveDeploymentsDevices: API.OperationMethod<MoveDeploymentsDevicesRequest, MoveDeploymentsDevicesResponse, MoveDeploymentsDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveDeploymentsDevicesRequest,
  output: MoveDeploymentsDevicesResponse,
  errors: [],
}));

/** Updates a device. */
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
  T.Http({ method: "PATCH", path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchDeploymentsDevicesRequest>;

export type PatchDeploymentsDevicesResponse = SasPortalDevice;
export const PatchDeploymentsDevicesResponse = SasPortalDevice;

export type PatchDeploymentsDevicesError = CommonErrors;

export const patchDeploymentsDevices: API.OperationMethod<PatchDeploymentsDevicesRequest, PatchDeploymentsDevicesResponse, PatchDeploymentsDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchDeploymentsDevicesRequest,
  output: PatchDeploymentsDevicesResponse,
  errors: [],
}));

/** Updates a signed device. */
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
  T.Http({ method: "PATCH", path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}:updateSigned", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSignedDeploymentsDevicesRequest>;

export type UpdateSignedDeploymentsDevicesResponse = SasPortalDevice;
export const UpdateSignedDeploymentsDevicesResponse = SasPortalDevice;

export type UpdateSignedDeploymentsDevicesError = CommonErrors;

export const updateSignedDeploymentsDevices: API.OperationMethod<UpdateSignedDeploymentsDevicesRequest, UpdateSignedDeploymentsDevicesResponse, UpdateSignedDeploymentsDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSignedDeploymentsDevicesRequest,
  output: UpdateSignedDeploymentsDevicesResponse,
  errors: [],
}));

/** Signs a device. */
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
  T.Http({ method: "POST", path: "v1alpha1/deployments/{deploymentsId}/devices/{devicesId}:signDevice", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignDeviceDeploymentsDevicesRequest>;

export type SignDeviceDeploymentsDevicesResponse = SasPortalEmpty;
export const SignDeviceDeploymentsDevicesResponse = SasPortalEmpty;

export type SignDeviceDeploymentsDevicesError = CommonErrors;

export const signDeviceDeploymentsDevices: API.OperationMethod<SignDeviceDeploymentsDevicesRequest, SignDeviceDeploymentsDevicesResponse, SignDeviceDeploymentsDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SignDeviceDeploymentsDevicesRequest,
  output: SignDeviceDeploymentsDevicesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. */
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

export type SetPoliciesError = CommonErrors;

export const setPolicies: API.OperationMethod<SetPoliciesRequest, SetPoliciesResponse, SetPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetPoliciesRequest,
  output: SetPoliciesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
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

export type GetPoliciesError = CommonErrors;

export const getPolicies: API.OperationMethod<GetPoliciesRequest, GetPoliciesResponse, GetPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPoliciesRequest,
  output: GetPoliciesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. */
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

export type TestPoliciesError = CommonErrors;

export const testPolicies: API.OperationMethod<TestPoliciesRequest, TestPoliciesResponse, TestPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestPoliciesRequest,
  output: TestPoliciesResponse,
  errors: [],
}));

