// ==========================================================================
// Admin SDK API (admin directory_v1)
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
  name: "admin",
  version: "directory_v1",
  rootUrl: "https://admin.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PrinterModel {
  /** Manufacturer. eq. "Brother" */
  manufacturer?: string;
  /** Display name. eq. "Brother MFC-8840D" */
  displayName?: string;
  /** Make and model as represented in "make_and_model" field in Printer object. eq. "brother mfc-8840d" */
  makeAndModel?: string;
}

export const PrinterModel: Schema.Schema<PrinterModel> = Schema.suspend(() => Schema.Struct({
  manufacturer: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  makeAndModel: Schema.optional(Schema.String),
})).annotate({ identifier: "PrinterModel" }) as any as Schema.Schema<PrinterModel>;

export interface ListPrinterModelsResponse {
  /** Printer models that are currently allowed to be configured for ChromeOs. Some printers may be added or removed over time. */
  printerModels?: Array<PrinterModel>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListPrinterModelsResponse: Schema.Schema<ListPrinterModelsResponse> = Schema.suspend(() => Schema.Struct({
  printerModels: Schema.optional(Schema.Array(PrinterModel)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPrinterModelsResponse" }) as any as Schema.Schema<ListPrinterModelsResponse>;

export interface AuxiliaryMessage {
  /** Message severity */
  severity?: "SEVERITY_UNSPECIFIED" | "SEVERITY_INFO" | "SEVERITY_WARNING" | "SEVERITY_ERROR" | (string & {});
  /** Field that this message concerns. */
  fieldMask?: string;
  /** Human readable message in English. Example: "Given printer is invalid or no longer supported." */
  auxiliaryMessage?: string;
}

export const AuxiliaryMessage: Schema.Schema<AuxiliaryMessage> = Schema.suspend(() => Schema.Struct({
  severity: Schema.optional(Schema.String),
  fieldMask: Schema.optional(Schema.String),
  auxiliaryMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "AuxiliaryMessage" }) as any as Schema.Schema<AuxiliaryMessage>;

export interface Printer {
  /** Identifier. The resource name of the Printer object, in the format customers/{customer-id}/printers/{printer-id} (During printer creation leave empty) */
  name?: string;
  /** Id of the printer. (During printer creation leave empty) */
  id?: string;
  /** Editable. Name of printer. */
  displayName?: string;
  /** Editable. Description of printer. */
  description?: string;
  /** Editable. Make and model of printer. e.g. Lexmark MS610de Value must be in format as seen in ListPrinterModels response. */
  makeAndModel?: string;
  /** Editable. Printer URI. */
  uri?: string;
  /** Output only. Time when printer was created. */
  createTime?: string;
  /** Organization Unit that owns this printer (Only can be set during Printer creation) */
  orgUnitId?: string;
  /** Output only. Auxiliary messages about issues with the printer configuration if any. */
  auxiliaryMessages?: Array<AuxiliaryMessage>;
  /** Editable. flag to use driverless configuration or not. If it's set to be true, make_and_model can be ignored */
  useDriverlessConfig?: boolean;
}

export const Printer: Schema.Schema<Printer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  makeAndModel: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  orgUnitId: Schema.optional(Schema.String),
  auxiliaryMessages: Schema.optional(Schema.Array(AuxiliaryMessage)),
  useDriverlessConfig: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Printer" }) as any as Schema.Schema<Printer>;

export interface ListPrintersResponse {
  /** List of printers. If `org_unit_id` was given in the request, then only printers visible for this OU will be returned. If `org_unit_id` was not given in the request, then all printers will be returned. */
  printers?: Array<Printer>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListPrintersResponse: Schema.Schema<ListPrintersResponse> = Schema.suspend(() => Schema.Struct({
  printers: Schema.optional(Schema.Array(Printer)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPrintersResponse" }) as any as Schema.Schema<ListPrintersResponse>;

export interface CreatePrinterRequest {
  /** Required. The name of the customer. Format: customers/{customer_id} */
  parent?: string;
  /** Required. A printer to create. If you want to place the printer under particular OU then populate printer.org_unit_id filed. Otherwise the printer will be placed under root OU. */
  printer?: Printer;
}

export const CreatePrinterRequest: Schema.Schema<CreatePrinterRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  printer: Schema.optional(Printer),
})).annotate({ identifier: "CreatePrinterRequest" }) as any as Schema.Schema<CreatePrinterRequest>;

export interface BatchCreatePrintersRequest {
  /** A list of Printers to be created. Max 50 at a time. */
  requests?: Array<CreatePrinterRequest>;
}

export const BatchCreatePrintersRequest: Schema.Schema<BatchCreatePrintersRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(CreatePrinterRequest)),
})).annotate({ identifier: "BatchCreatePrintersRequest" }) as any as Schema.Schema<BatchCreatePrintersRequest>;

export interface FailureInfo {
  /** Id of a failed printer. */
  printerId?: string;
  /** Failed printer. */
  printer?: Printer;
  /** Canonical code for why the update failed to apply. */
  errorCode?: "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS" | (string & {});
  /** Failure reason message. */
  errorMessage?: string;
}

export const FailureInfo: Schema.Schema<FailureInfo> = Schema.suspend(() => Schema.Struct({
  printerId: Schema.optional(Schema.String),
  printer: Schema.optional(Printer),
  errorCode: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "FailureInfo" }) as any as Schema.Schema<FailureInfo>;

export interface BatchCreatePrintersResponse {
  /** A list of successfully created printers with their IDs populated. */
  printers?: Array<Printer>;
  /** A list of create failures. Printer IDs are not populated, as printer were not created. */
  failures?: Array<FailureInfo>;
}

export const BatchCreatePrintersResponse: Schema.Schema<BatchCreatePrintersResponse> = Schema.suspend(() => Schema.Struct({
  printers: Schema.optional(Schema.Array(Printer)),
  failures: Schema.optional(Schema.Array(FailureInfo)),
})).annotate({ identifier: "BatchCreatePrintersResponse" }) as any as Schema.Schema<BatchCreatePrintersResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface BatchDeletePrintersRequest {
  /** A list of Printer.id that should be deleted. Max 100 at a time. */
  printerIds?: Array<string>;
}

export const BatchDeletePrintersRequest: Schema.Schema<BatchDeletePrintersRequest> = Schema.suspend(() => Schema.Struct({
  printerIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchDeletePrintersRequest" }) as any as Schema.Schema<BatchDeletePrintersRequest>;

export interface BatchDeletePrintersResponse {
  /** A list of Printer.id that were successfully deleted. */
  printerIds?: Array<string>;
  /** A list of update failures. */
  failedPrinters?: Array<FailureInfo>;
}

export const BatchDeletePrintersResponse: Schema.Schema<BatchDeletePrintersResponse> = Schema.suspend(() => Schema.Struct({
  printerIds: Schema.optional(Schema.Array(Schema.String)),
  failedPrinters: Schema.optional(Schema.Array(FailureInfo)),
})).annotate({ identifier: "BatchDeletePrintersResponse" }) as any as Schema.Schema<BatchDeletePrintersResponse>;

export interface PrintServer {
  /** Identifier. Resource name of the print server. Leave empty when creating. Format: `customers/{customer.id}/printServers/{print_server.id}` */
  name?: string;
  /** Immutable. ID of the print server. Leave empty when creating. */
  id?: string;
  /** Editable. Display name of the print server (as shown in the Admin console). */
  displayName?: string;
  /** Editable. Description of the print server (as shown in the Admin console). */
  description?: string;
  /** Editable. Print server URI. */
  uri?: string;
  /** Output only. Time when the print server was created. */
  createTime?: string;
  /** ID of the organization unit (OU) that owns this print server. This value can only be set when the print server is initially created. If it's not populated, the print server is placed under the root OU. The `org_unit_id` can be retrieved using the [Directory API](https://developers.google.com/workspace/admin/directory/reference/rest/v1/orgunits). */
  orgUnitId?: string;
}

export const PrintServer: Schema.Schema<PrintServer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  orgUnitId: Schema.optional(Schema.String),
})).annotate({ identifier: "PrintServer" }) as any as Schema.Schema<PrintServer>;

export interface ListPrintServersResponse {
  /** List of print servers. */
  printServers?: Array<PrintServer>;
  /** A token that can be sent as `page_token` in a request to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListPrintServersResponse: Schema.Schema<ListPrintServersResponse> = Schema.suspend(() => Schema.Struct({
  printServers: Schema.optional(Schema.Array(PrintServer)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPrintServersResponse" }) as any as Schema.Schema<ListPrintServersResponse>;

export interface CreatePrintServerRequest {
  /** Required. The [unique ID](https://developers.google.com/workspace/admin/directory/reference/rest/v1/customers) of the customer's Google Workspace account. Format: `customers/{id}` */
  parent?: string;
  /** Required. A print server to create. If you want to place the print server under a specific organizational unit (OU), then populate the `org_unit_id`. Otherwise the print server is created under the root OU. The `org_unit_id` can be retrieved using the [Directory API](https://developers.google.com/workspace/admin/directory/v1/guides/manage-org-units). */
  printServer?: PrintServer;
}

export const CreatePrintServerRequest: Schema.Schema<CreatePrintServerRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  printServer: Schema.optional(PrintServer),
})).annotate({ identifier: "CreatePrintServerRequest" }) as any as Schema.Schema<CreatePrintServerRequest>;

export interface BatchCreatePrintServersRequest {
  /** Required. A list of `PrintServer` resources to be created (max `50` per batch). */
  requests?: Array<CreatePrintServerRequest>;
}

export const BatchCreatePrintServersRequest: Schema.Schema<BatchCreatePrintServersRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(CreatePrintServerRequest)),
})).annotate({ identifier: "BatchCreatePrintServersRequest" }) as any as Schema.Schema<BatchCreatePrintServersRequest>;

export interface PrintServerFailureInfo {
  /** ID of a failed print server. */
  printServerId?: string;
  /** Failed print server. */
  printServer?: PrintServer;
  /** Canonical code for why the update failed to apply. */
  errorCode?: "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS" | (string & {});
  /** Failure reason message. */
  errorMessage?: string;
}

export const PrintServerFailureInfo: Schema.Schema<PrintServerFailureInfo> = Schema.suspend(() => Schema.Struct({
  printServerId: Schema.optional(Schema.String),
  printServer: Schema.optional(PrintServer),
  errorCode: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "PrintServerFailureInfo" }) as any as Schema.Schema<PrintServerFailureInfo>;

export interface BatchCreatePrintServersResponse {
  /** A list of successfully created print servers with their IDs populated. */
  printServers?: Array<PrintServer>;
  /** A list of create failures. `PrintServer` IDs are not populated, as print servers were not created. */
  failures?: Array<PrintServerFailureInfo>;
}

export const BatchCreatePrintServersResponse: Schema.Schema<BatchCreatePrintServersResponse> = Schema.suspend(() => Schema.Struct({
  printServers: Schema.optional(Schema.Array(PrintServer)),
  failures: Schema.optional(Schema.Array(PrintServerFailureInfo)),
})).annotate({ identifier: "BatchCreatePrintServersResponse" }) as any as Schema.Schema<BatchCreatePrintServersResponse>;

export interface BatchDeletePrintServersRequest {
  /** A list of print server IDs that should be deleted (max `100` per batch). */
  printServerIds?: Array<string>;
}

export const BatchDeletePrintServersRequest: Schema.Schema<BatchDeletePrintServersRequest> = Schema.suspend(() => Schema.Struct({
  printServerIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchDeletePrintServersRequest" }) as any as Schema.Schema<BatchDeletePrintServersRequest>;

export interface BatchDeletePrintServersResponse {
  /** A list of print server IDs that were successfully deleted. */
  printServerIds?: Array<string>;
  /** A list of update failures. */
  failedPrintServers?: Array<PrintServerFailureInfo>;
}

export const BatchDeletePrintServersResponse: Schema.Schema<BatchDeletePrintServersResponse> = Schema.suspend(() => Schema.Struct({
  printServerIds: Schema.optional(Schema.Array(Schema.String)),
  failedPrintServers: Schema.optional(Schema.Array(PrintServerFailureInfo)),
})).annotate({ identifier: "BatchDeletePrintServersResponse" }) as any as Schema.Schema<BatchDeletePrintServersResponse>;

export interface ChromeOsDeviceAction {
  /** Action to be taken on the Chrome OS device. */
  action?: string;
  /** Only used when the action is `deprovision`. With the `deprovision` action, this field is required. *Note*: The deprovision reason is audited because it might have implications on licenses for perpetual subscription customers. */
  deprovisionReason?: string;
}

export const ChromeOsDeviceAction: Schema.Schema<ChromeOsDeviceAction> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  deprovisionReason: Schema.optional(Schema.String),
})).annotate({ identifier: "ChromeOsDeviceAction" }) as any as Schema.Schema<ChromeOsDeviceAction>;

export interface OsUpdateStatus {
  /** The update state of an OS update. */
  state?: "updateStateUnspecified" | "updateStateNotStarted" | "updateStateDownloadInProgress" | "updateStateNeedReboot" | (string & {});
  /** New platform version of the OS image being downloaded and applied. It is only set when update status is UPDATE_STATUS_DOWNLOAD_IN_PROGRESS or UPDATE_STATUS_NEED_REBOOT. Note this could be a dummy "0.0.0.0" for UPDATE_STATUS_NEED_REBOOT for some edge cases, e.g. update engine is restarted without a reboot. */
  targetOsVersion?: string;
  /** New required platform version from the pending updated kiosk app. */
  targetKioskAppVersion?: string;
  /** Date and time of the last successful OS update. */
  updateTime?: string;
  /** Date and time of the last update check. */
  updateCheckTime?: string;
  /** Date and time of the last reboot. */
  rebootTime?: string;
}

export const OsUpdateStatus: Schema.Schema<OsUpdateStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  targetOsVersion: Schema.optional(Schema.String),
  targetKioskAppVersion: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  updateCheckTime: Schema.optional(Schema.String),
  rebootTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OsUpdateStatus" }) as any as Schema.Schema<OsUpdateStatus>;

export interface BacklightInfo {
  /** Output only. Path to this backlight on the system. Useful if the caller needs to correlate with other information. */
  path?: string;
  /** Output only. Maximum brightness for the backlight. */
  maxBrightness?: number;
  /** Output only. Current brightness of the backlight, between 0 and max_brightness. */
  brightness?: number;
}

export const BacklightInfo: Schema.Schema<BacklightInfo> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  maxBrightness: Schema.optional(Schema.Number),
  brightness: Schema.optional(Schema.Number),
})).annotate({ identifier: "BacklightInfo" }) as any as Schema.Schema<BacklightInfo>;

export interface FanInfo {
  /** Output only. Fan speed in RPM. */
  speedRpm?: number;
}

export const FanInfo: Schema.Schema<FanInfo> = Schema.suspend(() => Schema.Struct({
  speedRpm: Schema.optional(Schema.Number),
})).annotate({ identifier: "FanInfo" }) as any as Schema.Schema<FanInfo>;

export interface ByteUsage {
  /** Output only. The total capacity value, in bytes. */
  capacityBytes?: string;
  /** Output only. The current usage value, in bytes. */
  usedBytes?: string;
}

export const ByteUsage: Schema.Schema<ByteUsage> = Schema.suspend(() => Schema.Struct({
  capacityBytes: Schema.optional(Schema.String),
  usedBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "ByteUsage" }) as any as Schema.Schema<ByteUsage>;

export interface BluetoothAdapterInfo {
  /** Output only. The MAC address of the adapter. */
  address?: string;
  /** Output only. The number of devices connected to this adapter. */
  numConnectedDevices?: number;
}

export const BluetoothAdapterInfo: Schema.Schema<BluetoothAdapterInfo> = Schema.suspend(() => Schema.Struct({
  address: Schema.optional(Schema.String),
  numConnectedDevices: Schema.optional(Schema.Number),
})).annotate({ identifier: "BluetoothAdapterInfo" }) as any as Schema.Schema<BluetoothAdapterInfo>;

export interface ChromeOsDevice {
  /** The unique ID of the Chrome device. */
  deviceId?: string;
  /** The Chrome device serial number entered when the device was enabled. This value is the same as the Admin console's *Serial Number* in the *Chrome OS Devices* tab. */
  serialNumber?: string;
  /** The status of the device. */
  status?: string;
  /** Date and time the device was last synchronized with the policy settings in the G Suite administrator control panel (Read-only) */
  lastSync?: string;
  /** Final date the device will be supported (Read-only) */
  supportEndDate?: string;
  /** The user of the device as noted by the administrator. Maximum length is 100 characters. Empty values are allowed. */
  annotatedUser?: string;
  /** The address or location of the device as noted by the administrator. Maximum length is `200` characters. Empty values are allowed. */
  annotatedLocation?: string;
  /** Notes about this device added by the administrator. This property can be [searched](https://support.google.com/chrome/a/answer/1698333) with the [list](https://developers.google.com/workspace/admin/directory/v1/reference/chromeosdevices/list) method's `query` parameter. Maximum length is 500 characters. Empty values are allowed. */
  notes?: string;
  /** The device's model information. If the device does not have this information, this property is not included in the response. */
  model?: string;
  /** The Mobile Equipment Identifier (MEID) or the International Mobile Equipment Identity (IMEI) for the 3G mobile card in a mobile device. A MEID/IMEI is typically used when adding a device to a wireless carrier's post-pay service plan. If the device does not have this information, this property is not included in the response. For more information on how to export a MEID/IMEI list, see the [Developer's Guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-chrome-devices.html#export_meid). */
  meid?: string;
  /** The device's order number. Only devices directly purchased from Google have an order number. */
  orderNumber?: string;
  /** Determines if the device will auto renew its support after the support end date. This is a read-only property. */
  willAutoRenew?: boolean;
  /** The Chrome device's operating system version. */
  osVersion?: string;
  /** The Chrome device's platform version. */
  platformVersion?: string;
  /** The Chrome device's firmware version. */
  firmwareVersion?: string;
  /** The device's wireless MAC address. If the device does not have this information, it is not included in the response. */
  macAddress?: string;
  /** The boot mode for the device. The possible values are: * `Verified`: The device is running a valid version of the Chrome OS. * `Dev`: The devices's developer hardware switch is enabled. When booted, the device has a command line shell. For an example of a developer switch, see the [Chromebook developer information](https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices/samsung-series-5-chromebook#TOC-Developer-switch). */
  bootMode?: string;
  /** Date and time the device was last enrolled (Read-only) */
  lastEnrollmentTime?: string;
  /** The type of resource. For the Chromeosdevices resource, the value is `admin#directory#chromeosdevice`. */
  kind?: string;
  /** A list of recent device users, in descending order, by last login time. */
  recentUsers?: Array<{ type?: string; email?: string }>;
  /** A list of active time ranges (Read-only). */
  activeTimeRanges?: Array<{ activeTime?: number; date?: string }>;
  /** The device's MAC address on the ethernet network interface. */
  ethernetMacAddress?: string;
  /** The asset identifier as noted by an administrator or specified during enrollment. */
  annotatedAssetId?: string;
  /** ETag of the resource. */
  etag?: string;
  /** Reports of disk space and other info about mounted/connected volumes. */
  diskVolumeReports?: Array<{ volumeInfo?: Array<{ volumeId?: string; storageTotal?: string; storageFree?: string }> }>;
  /** Total RAM on the device [in bytes] (Read-only) */
  systemRamTotal?: string;
  /** Reports of CPU utilization and temperature (Read-only) */
  cpuStatusReports?: Array<{ reportTime?: string; cpuUtilizationPercentageInfo?: Array<number>; cpuTemperatureInfo?: Array<{ temperature?: number; label?: string }> }>;
  /** Information regarding CPU specs in the device. */
  cpuInfo?: Array<{ model?: string; architecture?: string; maxClockSpeedKhz?: number; logicalCpus?: Array<{ maxScalingFrequencyKhz?: number; currentScalingFrequencyKhz?: number; idleDuration?: string; cStates?: Array<{ displayName?: string; sessionDuration?: string }> }> }>;
  /** A list of device files to download (Read-only) */
  deviceFiles?: Array<{ name?: string; type?: string; downloadUrl?: string; createTime?: string }>;
  /** Reports of amounts of available RAM memory (Read-only) */
  systemRamFreeReports?: Array<{ reportTime?: string; systemRamFreeInfo?: Array<string> }>;
  /** Contains last known network (Read-only) */
  lastKnownNetwork?: Array<{ ipAddress?: string; wanIpAddress?: string }>;
  /** (Read-only) The timestamp after which the device will stop receiving Chrome updates or support. Please use "autoUpdateThrough" instead. */
  autoUpdateExpiration?: string;
  /** (Read-only) MAC address used by the Chromebook’s internal ethernet port, and for onboard network (ethernet) interface. The format is twelve (12) hexadecimal digits without any delimiter (uppercase letters). This is only relevant for some devices. */
  ethernetMacAddress0?: string;
  /** (Read-only) Built-in MAC address for the docking station that the device connected to. Factory sets Media access control address (MAC address) assigned for use by a dock. It is reserved specifically for MAC pass through device policy. The format is twelve (12) hexadecimal digits without any delimiter (uppercase letters). This is only relevant for some devices. */
  dockMacAddress?: string;
  /** (Read-only) The date the device was manufactured in yyyy-mm-dd format. */
  manufactureDate?: string;
  /** The full parent path with the organizational unit's name associated with the device. Path names are case insensitive. If the parent organizational unit is the top-level organization, it is represented as a forward slash, `/`. This property can be [updated](https://developers.google.com/workspace/admin/directory/v1/guides/manage-chrome-devices#move_chrome_devices_to_ou) using the API. For more information about how to create an organizational structure for your device, see the [administration help center](https://support.google.com/a/answer/182433). */
  orgUnitPath?: string;
  /** Trusted Platform Module (TPM) (Read-only) */
  tpmVersionInfo?: { family?: string; specLevel?: string; manufacturer?: string; tpmModel?: string; firmwareVersion?: string; vendorSpecific?: string };
  /** A list of screenshot files to download. Type is always "SCREENSHOT_FILE". (Read-only) */
  screenshotFiles?: Array<{ name?: string; type?: string; downloadUrl?: string; createTime?: string }>;
  /** The unique ID of the organizational unit. orgUnitPath is the human readable version of orgUnitId. While orgUnitPath may change by renaming an organizational unit within the path, orgUnitId is unchangeable for one organizational unit. This property can be [updated](https://developers.google.com/workspace/admin/directory/v1/guides/manage-chrome-devices#move_chrome_devices_to_ou) using the API. For more information about how to create an organizational structure for your device, see the [administration help center](https://support.google.com/a/answer/182433). */
  orgUnitId?: string;
  /** The status of the OS updates for the device. */
  osUpdateStatus?: OsUpdateStatus;
  /** Date and time for the first time the device was enrolled. */
  firstEnrollmentTime?: string;
  /** (Read-only) Date and time for the last deprovision of the device. */
  lastDeprovisionTimestamp?: string;
  /** (Read-only) Deprovision reason. */
  deprovisionReason?: "DEPROVISION_REASON_UNSPECIFIED" | "DEPROVISION_REASON_SAME_MODEL_REPLACEMENT" | "DEPROVISION_REASON_UPGRADE" | "DEPROVISION_REASON_DOMAIN_MOVE" | "DEPROVISION_REASON_SERVICE_EXPIRATION" | "DEPROVISION_REASON_OTHER" | "DEPROVISION_REASON_DIFFERENT_MODEL_REPLACEMENT" | "DEPROVISION_REASON_RETIRING_DEVICE" | "DEPROVISION_REASON_UPGRADE_TRANSFER" | "DEPROVISION_REASON_NOT_REQUIRED" | "DEPROVISION_REASON_REPAIR_CENTER" | (string & {});
  /** Output only. Device license type. */
  deviceLicenseType?: "deviceLicenseTypeUnspecified" | "enterprise" | "enterpriseUpgrade" | "educationUpgrade" | "education" | "kioskUpgrade" | "enterpriseUpgradePerpetual" | "enterpriseUpgradeFixedTerm" | "educationUpgradePerpetual" | "educationUpgradeFixedTerm" | (string & {});
  /** Output only. Contains backlight information for the device. */
  backlightInfo?: Array<BacklightInfo>;
  /** Output only. The timestamp after which the device will stop receiving Chrome updates or support. */
  autoUpdateThrough?: string;
  /** Output only. Whether or not the device requires the extended support opt in. */
  extendedSupportEligible?: boolean;
  /** Output only. Date of the device when extended support policy for automatic updates starts. */
  extendedSupportStart?: string;
  /** Output only. Whether extended support policy is enabled on the device. */
  extendedSupportEnabled?: boolean;
  /** Output only. Fan information for the device. */
  fanInfo?: Array<FanInfo>;
  /** Output only. Chrome OS type of the device. */
  chromeOsType?: "chromeOsTypeUnspecified" | "chromeOsFlex" | "chromeOs" | (string & {});
  /** Output only. How much disk space the device has available and is currently using. */
  diskSpaceUsage?: ByteUsage;
  /** Output only. Device policy compliance status of the OS version. */
  osVersionCompliance?: "complianceUnspecified" | "compliant" | "pending" | "notCompliant" | (string & {});
  /** Output only. Information about Bluetooth adapters of the device. */
  bluetoothAdapterInfo?: Array<BluetoothAdapterInfo>;
}

export const ChromeOsDevice: Schema.Schema<ChromeOsDevice> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  lastSync: Schema.optional(Schema.String),
  supportEndDate: Schema.optional(Schema.String),
  annotatedUser: Schema.optional(Schema.String),
  annotatedLocation: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  meid: Schema.optional(Schema.String),
  orderNumber: Schema.optional(Schema.String),
  willAutoRenew: Schema.optional(Schema.Boolean),
  osVersion: Schema.optional(Schema.String),
  platformVersion: Schema.optional(Schema.String),
  firmwareVersion: Schema.optional(Schema.String),
  macAddress: Schema.optional(Schema.String),
  bootMode: Schema.optional(Schema.String),
  lastEnrollmentTime: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  recentUsers: Schema.optional(Schema.Array(Schema.Struct({ type: Schema.optional(Schema.String), email: Schema.optional(Schema.String) }))),
  activeTimeRanges: Schema.optional(Schema.Array(Schema.Struct({ activeTime: Schema.optional(Schema.Number), date: Schema.optional(Schema.String) }))),
  ethernetMacAddress: Schema.optional(Schema.String),
  annotatedAssetId: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  diskVolumeReports: Schema.optional(Schema.Array(Schema.Struct({ volumeInfo: Schema.optional(Schema.Array(Schema.Struct({ volumeId: Schema.optional(Schema.String), storageTotal: Schema.optional(Schema.String), storageFree: Schema.optional(Schema.String) }))) }))),
  systemRamTotal: Schema.optional(Schema.String),
  cpuStatusReports: Schema.optional(Schema.Array(Schema.Struct({ reportTime: Schema.optional(Schema.String), cpuUtilizationPercentageInfo: Schema.optional(Schema.Array(Schema.Number)), cpuTemperatureInfo: Schema.optional(Schema.Array(Schema.Struct({ temperature: Schema.optional(Schema.Number), label: Schema.optional(Schema.String) }))) }))),
  cpuInfo: Schema.optional(Schema.Array(Schema.Struct({ model: Schema.optional(Schema.String), architecture: Schema.optional(Schema.String), maxClockSpeedKhz: Schema.optional(Schema.Number), logicalCpus: Schema.optional(Schema.Array(Schema.Struct({ maxScalingFrequencyKhz: Schema.optional(Schema.Number), currentScalingFrequencyKhz: Schema.optional(Schema.Number), idleDuration: Schema.optional(Schema.String), cStates: Schema.optional(Schema.Array(Schema.Struct({ displayName: Schema.optional(Schema.String), sessionDuration: Schema.optional(Schema.String) }))) }))) }))),
  deviceFiles: Schema.optional(Schema.Array(Schema.Struct({ name: Schema.optional(Schema.String), type: Schema.optional(Schema.String), downloadUrl: Schema.optional(Schema.String), createTime: Schema.optional(Schema.String) }))),
  systemRamFreeReports: Schema.optional(Schema.Array(Schema.Struct({ reportTime: Schema.optional(Schema.String), systemRamFreeInfo: Schema.optional(Schema.Array(Schema.String)) }))),
  lastKnownNetwork: Schema.optional(Schema.Array(Schema.Struct({ ipAddress: Schema.optional(Schema.String), wanIpAddress: Schema.optional(Schema.String) }))),
  autoUpdateExpiration: Schema.optional(Schema.String),
  ethernetMacAddress0: Schema.optional(Schema.String),
  dockMacAddress: Schema.optional(Schema.String),
  manufactureDate: Schema.optional(Schema.String),
  orgUnitPath: Schema.optional(Schema.String),
  tpmVersionInfo: Schema.optional(Schema.Struct({ family: Schema.optional(Schema.String), specLevel: Schema.optional(Schema.String), manufacturer: Schema.optional(Schema.String), tpmModel: Schema.optional(Schema.String), firmwareVersion: Schema.optional(Schema.String), vendorSpecific: Schema.optional(Schema.String) })),
  screenshotFiles: Schema.optional(Schema.Array(Schema.Struct({ name: Schema.optional(Schema.String), type: Schema.optional(Schema.String), downloadUrl: Schema.optional(Schema.String), createTime: Schema.optional(Schema.String) }))),
  orgUnitId: Schema.optional(Schema.String),
  osUpdateStatus: Schema.optional(OsUpdateStatus),
  firstEnrollmentTime: Schema.optional(Schema.String),
  lastDeprovisionTimestamp: Schema.optional(Schema.String),
  deprovisionReason: Schema.optional(Schema.String),
  deviceLicenseType: Schema.optional(Schema.String),
  backlightInfo: Schema.optional(Schema.Array(BacklightInfo)),
  autoUpdateThrough: Schema.optional(Schema.String),
  extendedSupportEligible: Schema.optional(Schema.Boolean),
  extendedSupportStart: Schema.optional(Schema.String),
  extendedSupportEnabled: Schema.optional(Schema.Boolean),
  fanInfo: Schema.optional(Schema.Array(FanInfo)),
  chromeOsType: Schema.optional(Schema.String),
  diskSpaceUsage: Schema.optional(ByteUsage),
  osVersionCompliance: Schema.optional(Schema.String),
  bluetoothAdapterInfo: Schema.optional(Schema.Array(BluetoothAdapterInfo)),
})).annotate({ identifier: "ChromeOsDevice" }) as any as Schema.Schema<ChromeOsDevice>;

export interface ChromeOsDevices {
  /** Kind of resource this is. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of Chrome OS Device objects. */
  chromeosdevices?: Array<ChromeOsDevice>;
  /** Token used to access the next page of this result. To access the next page, use this token's value in the `pageToken` query string of this request. */
  nextPageToken?: string;
}

export const ChromeOsDevices: Schema.Schema<ChromeOsDevices> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  chromeosdevices: Schema.optional(Schema.Array(ChromeOsDevice)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ChromeOsDevices" }) as any as Schema.Schema<ChromeOsDevices>;

export interface ChromeOsMoveDevicesToOu {
  /** Chrome OS devices to be moved to OU */
  deviceIds?: Array<string>;
}

export const ChromeOsMoveDevicesToOu: Schema.Schema<ChromeOsMoveDevicesToOu> = Schema.suspend(() => Schema.Struct({
  deviceIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ChromeOsMoveDevicesToOu" }) as any as Schema.Schema<ChromeOsMoveDevicesToOu>;

export interface DirectoryChromeosdevicesIssueCommandRequest {
  /** The type of command. */
  commandType?: "COMMAND_TYPE_UNSPECIFIED" | "REBOOT" | "TAKE_A_SCREENSHOT" | "SET_VOLUME" | "WIPE_USERS" | "REMOTE_POWERWASH" | "DEVICE_START_CRD_SESSION" | "CAPTURE_LOGS" | "FETCH_CRD_AVAILABILITY_INFO" | "FETCH_SUPPORT_PACKET" | (string & {});
  /** The payload for the command, provide it only if command supports it. The following commands support adding payload: * `SET_VOLUME`: Payload is a stringified JSON object in the form: { "volume": 50 }. The volume has to be an integer in the range [0,100]. * `DEVICE_START_CRD_SESSION`: Payload is optionally a stringified JSON object in the form: { "ackedUserPresence": true, "crdSessionType": string }. `ackedUserPresence` is a boolean. By default, `ackedUserPresence` is set to `false`. To start a Chrome Remote Desktop session for an active device, set `ackedUserPresence` to `true`. `crdSessionType` can only select from values `private` (which grants the remote admin exclusive control of the ChromeOS device) or `shared` (which allows the admin and the local user to share control of the ChromeOS device). If not set, `crdSessionType` defaults to `shared`. The `FETCH_CRD_AVAILABILITY_INFO` command can be used to determine available session types on the device. * `REBOOT`: Payload is a stringified JSON object in the form: { "user_session_delay_seconds": 300 }. The `user_session_delay_seconds` is the amount of seconds to wait before rebooting the device if a user is logged in. It has to be an integer in the range [0,300]. When payload is not present for reboot, 0 delay is the default. Note: This only applies if an actual user is logged in, including a Guest. If the device is in the login screen or in Kiosk mode the value is not respected and the device immediately reboots. * `FETCH_SUPPORT_PACKET`: Payload is optionally a stringified JSON object in the form: {"supportPacketDetails":{ "issueCaseId": optional_support_case_id_string, "issueDescription": optional_issue_description_string, "requestedDataCollectors": []}} The list of available `data_collector_enums` are as following: Chrome System Information (1), Crash IDs (2), Memory Details (3), UI Hierarchy (4), Additional ChromeOS Platform Logs (5), Device Event (6), Intel WiFi NICs Debug Dump (7), Touch Events (8), Lacros (9), Lacros System Information (10), ChromeOS Flex Logs (11), DBus Details (12), ChromeOS Network Routes (13), ChromeOS Shill (Connection Manager) Logs (14), Policies (15), ChromeOS System State and Logs (16), ChromeOS System Logs (17), ChromeOS Chrome User Logs (18), ChromeOS Bluetooth (19), ChromeOS Connected Input Devices (20), ChromeOS Traffic Counters (21), ChromeOS Virtual Keyboard (22), ChromeOS Network Health (23). See more details in [help article](https://support.google.com/chrome/a?p=remote-log). */
  payload?: string;
}

export const DirectoryChromeosdevicesIssueCommandRequest: Schema.Schema<DirectoryChromeosdevicesIssueCommandRequest> = Schema.suspend(() => Schema.Struct({
  commandType: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.String),
})).annotate({ identifier: "DirectoryChromeosdevicesIssueCommandRequest" }) as any as Schema.Schema<DirectoryChromeosdevicesIssueCommandRequest>;

export interface DirectoryChromeosdevicesIssueCommandResponse {
  /** The unique ID of the issued command, used to retrieve the command status. */
  commandId?: string;
}

export const DirectoryChromeosdevicesIssueCommandResponse: Schema.Schema<DirectoryChromeosdevicesIssueCommandResponse> = Schema.suspend(() => Schema.Struct({
  commandId: Schema.optional(Schema.String),
})).annotate({ identifier: "DirectoryChromeosdevicesIssueCommandResponse" }) as any as Schema.Schema<DirectoryChromeosdevicesIssueCommandResponse>;

export interface DirectoryChromeosdevicesCommandResult {
  /** The result of the command. */
  result?: "COMMAND_RESULT_TYPE_UNSPECIFIED" | "IGNORED" | "FAILURE" | "SUCCESS" | (string & {});
  /** The time at which the command was executed or failed to execute. */
  executeTime?: string;
  /** The error message with a short explanation as to why the command failed. Only present if the command failed. */
  errorMessage?: string;
  /** The payload for the command result. The following commands respond with a payload: * `DEVICE_START_CRD_SESSION`: Payload is a stringified JSON object in the form: { "url": url }. The provided URL links to the Chrome Remote Desktop session and requires authentication using only the `email` associated with the command's issuance. * `FETCH_CRD_AVAILABILITY_INFO`: Payload is a stringified JSON object in the form: { "deviceIdleTimeInSeconds": number, "userSessionType": string, "remoteSupportAvailability": string, "remoteAccessAvailability": string }. The "remoteSupportAvailability" field is set to "AVAILABLE" if `shared` CRD session to the device is available. The "remoteAccessAvailability" field is set to "AVAILABLE" if `private` CRD session to the device is available. */
  commandResultPayload?: string;
}

export const DirectoryChromeosdevicesCommandResult: Schema.Schema<DirectoryChromeosdevicesCommandResult> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(Schema.String),
  executeTime: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  commandResultPayload: Schema.optional(Schema.String),
})).annotate({ identifier: "DirectoryChromeosdevicesCommandResult" }) as any as Schema.Schema<DirectoryChromeosdevicesCommandResult>;

export interface DirectoryChromeosdevicesCommand {
  /** Unique ID of a device command. */
  commandId?: string;
  /** The type of the command. */
  type?: "COMMAND_TYPE_UNSPECIFIED" | "REBOOT" | "TAKE_A_SCREENSHOT" | "SET_VOLUME" | "WIPE_USERS" | "REMOTE_POWERWASH" | "DEVICE_START_CRD_SESSION" | "CAPTURE_LOGS" | "FETCH_CRD_AVAILABILITY_INFO" | "FETCH_SUPPORT_PACKET" | (string & {});
  /** The timestamp when the command was issued by the admin. */
  issueTime?: string;
  /** Indicates the command state. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "EXPIRED" | "CANCELLED" | "SENT_TO_CLIENT" | "ACKED_BY_CLIENT" | "EXECUTED_BY_CLIENT" | (string & {});
  /** The time at which the command will expire. If the device doesn't execute the command within this time the command will become expired. */
  commandExpireTime?: string;
  /** The result of the command execution. */
  commandResult?: DirectoryChromeosdevicesCommandResult;
  /** The payload that the command specified, if any. */
  payload?: string;
}

export const DirectoryChromeosdevicesCommand: Schema.Schema<DirectoryChromeosdevicesCommand> = Schema.suspend(() => Schema.Struct({
  commandId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  issueTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  commandExpireTime: Schema.optional(Schema.String),
  commandResult: Schema.optional(DirectoryChromeosdevicesCommandResult),
  payload: Schema.optional(Schema.String),
})).annotate({ identifier: "DirectoryChromeosdevicesCommand" }) as any as Schema.Schema<DirectoryChromeosdevicesCommand>;

export interface BatchChangeChromeOsDeviceStatusRequest {
  /** Required. List of the IDs of the ChromeOS devices to change. Maximum 50. */
  deviceIds?: Array<string>;
  /** Required. The action to take on the ChromeOS device in order to change its status. */
  changeChromeOsDeviceStatusAction?: "CHANGE_CHROME_OS_DEVICE_STATUS_ACTION_UNSPECIFIED" | "CHANGE_CHROME_OS_DEVICE_STATUS_ACTION_DEPROVISION" | "CHANGE_CHROME_OS_DEVICE_STATUS_ACTION_DISABLE" | "CHANGE_CHROME_OS_DEVICE_STATUS_ACTION_REENABLE" | (string & {});
  /** Optional. The reason behind a device deprovision. Must be provided if 'changeChromeOsDeviceStatusAction' is set to 'CHANGE_CHROME_OS_DEVICE_STATUS_ACTION_DEPROVISION'. Otherwise, omit this field. */
  deprovisionReason?: "DEPROVISION_REASON_UNSPECIFIED" | "DEPROVISION_REASON_SAME_MODEL_REPLACEMENT" | "DEPROVISION_REASON_UPGRADE" | "DEPROVISION_REASON_DOMAIN_MOVE" | "DEPROVISION_REASON_SERVICE_EXPIRATION" | "DEPROVISION_REASON_OTHER" | "DEPROVISION_REASON_DIFFERENT_MODEL_REPLACEMENT" | "DEPROVISION_REASON_RETIRING_DEVICE" | "DEPROVISION_REASON_UPGRADE_TRANSFER" | "DEPROVISION_REASON_NOT_REQUIRED" | "DEPROVISION_REASON_REPAIR_CENTER" | (string & {});
}

export const BatchChangeChromeOsDeviceStatusRequest: Schema.Schema<BatchChangeChromeOsDeviceStatusRequest> = Schema.suspend(() => Schema.Struct({
  deviceIds: Schema.optional(Schema.Array(Schema.String)),
  changeChromeOsDeviceStatusAction: Schema.optional(Schema.String),
  deprovisionReason: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchChangeChromeOsDeviceStatusRequest" }) as any as Schema.Schema<BatchChangeChromeOsDeviceStatusRequest>;

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

export interface ChangeChromeOsDeviceStatusSucceeded {
}

export const ChangeChromeOsDeviceStatusSucceeded: Schema.Schema<ChangeChromeOsDeviceStatusSucceeded> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ChangeChromeOsDeviceStatusSucceeded" }) as any as Schema.Schema<ChangeChromeOsDeviceStatusSucceeded>;

export interface ChangeChromeOsDeviceStatusResult {
  /** The unique ID of the ChromeOS device. */
  deviceId?: string;
  /** The error result of the operation in case of failure. */
  error?: Status;
  /** The device could change its status successfully. */
  response?: ChangeChromeOsDeviceStatusSucceeded;
}

export const ChangeChromeOsDeviceStatusResult: Schema.Schema<ChangeChromeOsDeviceStatusResult> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  response: Schema.optional(ChangeChromeOsDeviceStatusSucceeded),
})).annotate({ identifier: "ChangeChromeOsDeviceStatusResult" }) as any as Schema.Schema<ChangeChromeOsDeviceStatusResult>;

export interface BatchChangeChromeOsDeviceStatusResponse {
  /** The results for each of the ChromeOS devices provided in the request. */
  changeChromeOsDeviceStatusResults?: Array<ChangeChromeOsDeviceStatusResult>;
}

export const BatchChangeChromeOsDeviceStatusResponse: Schema.Schema<BatchChangeChromeOsDeviceStatusResponse> = Schema.suspend(() => Schema.Struct({
  changeChromeOsDeviceStatusResults: Schema.optional(Schema.Array(ChangeChromeOsDeviceStatusResult)),
})).annotate({ identifier: "BatchChangeChromeOsDeviceStatusResponse" }) as any as Schema.Schema<BatchChangeChromeOsDeviceStatusResponse>;

export interface CountChromeOsDevicesResponse {
  /** The total number of devices matching the request. */
  count?: string;
}

export const CountChromeOsDevicesResponse: Schema.Schema<CountChromeOsDevicesResponse> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "CountChromeOsDevicesResponse" }) as any as Schema.Schema<CountChromeOsDevicesResponse>;

export interface Asp {
  /** The unique ID of the ASP. */
  codeId?: number;
  /** The name of the application that the user, represented by their `userId`, entered when the ASP was created. */
  name?: string;
  /** The time when the ASP was created. Expressed in [Unix time](https://en.wikipedia.org/wiki/Epoch_time) format. */
  creationTime?: string;
  /** The time when the ASP was last used. Expressed in [Unix time](https://en.wikipedia.org/wiki/Epoch_time) format. */
  lastTimeUsed?: string;
  /** The unique ID of the user who issued the ASP. */
  userKey?: string;
  /** The type of the API resource. This is always `admin#directory#asp`. */
  kind?: string;
  /** ETag of the ASP. */
  etag?: string;
}

export const Asp: Schema.Schema<Asp> = Schema.suspend(() => Schema.Struct({
  codeId: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  lastTimeUsed: Schema.optional(Schema.String),
  userKey: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Asp" }) as any as Schema.Schema<Asp>;

export interface Asps {
  /** The type of the API resource. This is always `admin#directory#aspList`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of ASP resources. */
  items?: Array<Asp>;
}

export const Asps: Schema.Schema<Asps> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Asp)),
})).annotate({ identifier: "Asps" }) as any as Schema.Schema<Asps>;

export interface Channel {
  /** A UUID or similar unique string that identifies this channel. */
  id?: string;
  /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
  token?: string;
  /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
  expiration?: string;
  /** The type of delivery mechanism used for this channel. */
  type?: string;
  /** The address where notifications are delivered for this channel. */
  address?: string;
  /** A Boolean value to indicate whether payload is wanted. Optional. */
  payload?: boolean;
  /** Additional parameters controlling delivery channel behavior. Optional. For example, `params.ttl` specifies the time-to-live in seconds for the notification channel, where the default is 2 hours and the maximum TTL is 2 days. */
  params?: Record<string, string>;
  /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
  resourceId?: string;
  /** A version-specific identifier for the watched resource. */
  resourceUri?: string;
  /** Identifies this as a notification channel used to watch for changes to a resource, which is `api#channel`. */
  kind?: string;
}

export const Channel: Schema.Schema<Channel> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  expiration: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Boolean),
  params: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  resourceId: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Channel" }) as any as Schema.Schema<Channel>;

export interface CustomerPostalAddress {
  /** This is a required property. For `countryCode` information see the [ISO 3166 country code elements](https://www.iso.org/iso/country_codes.htm). */
  countryCode?: string;
  /** Address line 2 of the address. */
  addressLine2?: string;
  /** Name of the region. An example of a region value is `NY` for the state of New York. */
  region?: string;
  /** Address line 3 of the address. */
  addressLine3?: string;
  /** Name of the locality. An example of a locality value is the city of `San Francisco`. */
  locality?: string;
  /** The postal code. A postalCode example is a postal zip code such as `10009`. This is in accordance with - http: //portablecontacts.net/draft-spec.html#address_element. */
  postalCode?: string;
  /** A customer's physical address. The address can be composed of one to three lines. */
  addressLine1?: string;
  /** The company or company division name. */
  organizationName?: string;
  /** The customer contact's name. */
  contactName?: string;
}

export const CustomerPostalAddress: Schema.Schema<CustomerPostalAddress> = Schema.suspend(() => Schema.Struct({
  countryCode: Schema.optional(Schema.String),
  addressLine2: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  addressLine3: Schema.optional(Schema.String),
  locality: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  addressLine1: Schema.optional(Schema.String),
  organizationName: Schema.optional(Schema.String),
  contactName: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerPostalAddress" }) as any as Schema.Schema<CustomerPostalAddress>;

export interface Customer {
  /** The unique ID for the customer's Google Workspace account. (Readonly) */
  id?: string;
  /** The customer's primary domain name string. Do not include the `www` prefix when creating a new customer. */
  customerDomain?: string;
  /** Identifies the resource as a customer. Value: `admin#directory#customer` */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The customer's secondary contact email address. This email address cannot be on the same domain as the `customerDomain` */
  alternateEmail?: string;
  /** The customer's creation time (Readonly) */
  customerCreationTime?: string;
  /** The customer's postal address information. */
  postalAddress?: CustomerPostalAddress;
  /** The customer's contact phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format. */
  phoneNumber?: string;
  /** The customer's ISO 639-2 language code. See the [Language Codes](https://developers.google.com/workspace/admin/directory/v1/languages) page for the list of supported codes. Valid language codes outside the supported set will be accepted by the API but may lead to unexpected behavior. The default value is `en`. */
  language?: string;
}

export const Customer: Schema.Schema<Customer> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  customerDomain: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  alternateEmail: Schema.optional(Schema.String),
  customerCreationTime: Schema.optional(Schema.String),
  postalAddress: Schema.optional(CustomerPostalAddress),
  phoneNumber: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
})).annotate({ identifier: "Customer" }) as any as Schema.Schema<Customer>;

export interface DomainAlias {
  /** Kind of resource this is. */
  kind?: string;
  /** The parent domain name that the domain alias is associated with. This can either be a primary or secondary domain name within a customer. */
  parentDomainName?: string;
  /** Indicates the verification state of a domain alias. (Read-only) */
  verified?: boolean;
  /** The creation time of the domain alias. (Read-only). */
  creationTime?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The domain alias name. */
  domainAliasName?: string;
}

export const DomainAlias: Schema.Schema<DomainAlias> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  parentDomainName: Schema.optional(Schema.String),
  verified: Schema.optional(Schema.Boolean),
  creationTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  domainAliasName: Schema.optional(Schema.String),
})).annotate({ identifier: "DomainAlias" }) as any as Schema.Schema<DomainAlias>;

export interface DomainAliases {
  /** Kind of resource this is. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of domain alias objects. */
  domainAliases?: Array<DomainAlias>;
}

export const DomainAliases: Schema.Schema<DomainAliases> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  domainAliases: Schema.optional(Schema.Array(DomainAlias)),
})).annotate({ identifier: "DomainAliases" }) as any as Schema.Schema<DomainAliases>;

export interface Domains {
  /** Kind of resource this is. */
  kind?: string;
  /** A list of domain alias objects. (Read-only) */
  domainAliases?: Array<DomainAlias>;
  /** Indicates the verification state of a domain. (Read-only). */
  verified?: boolean;
  /** ETag of the resource. */
  etag?: string;
  /** Creation time of the domain. Expressed in [Unix time](https://en.wikipedia.org/wiki/Epoch_time) format. (Read-only). */
  creationTime?: string;
  /** Indicates if the domain is a primary domain (Read-only). */
  isPrimary?: boolean;
  /** The domain name of the customer. */
  domainName?: string;
}

export const Domains: Schema.Schema<Domains> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  domainAliases: Schema.optional(Schema.Array(DomainAlias)),
  verified: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  isPrimary: Schema.optional(Schema.Boolean),
  domainName: Schema.optional(Schema.String),
})).annotate({ identifier: "Domains" }) as any as Schema.Schema<Domains>;

export interface Domains2 {
  /** Kind of resource this is. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of domain objects. */
  domains?: Array<Domains>;
}

export const Domains2: Schema.Schema<Domains2> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  domains: Schema.optional(Schema.Array(Domains)),
})).annotate({ identifier: "Domains2" }) as any as Schema.Schema<Domains2>;

export interface Group {
  /** Read-only. The unique ID of a group. A group `id` can be used as a group request URI's `groupKey`. */
  id?: string;
  /** The group's email address. If your account has multiple domains, select the appropriate domain for the email address. The `email` must be unique. This property is required when creating a group. Group email addresses are subject to the same character usage rules as usernames, see the [help center](https://support.google.com/a/answer/9193374) for details. */
  email?: string;
  /** The group's display name. */
  name?: string;
  /** An extended description to help users determine the purpose of a group. For example, you can include information about who should join the group, the types of messages to send to the group, links to FAQs about the group, or related groups. Maximum length is `4,096` characters. */
  description?: string;
  /** Read-only. Value is `true` if this group was created by an administrator rather than a user. */
  adminCreated?: boolean;
  /** The number of users that are direct members of the group. If a group is a member (child) of this group (the parent), members of the child group are not counted in the `directMembersCount` property of the parent group. */
  directMembersCount?: string;
  /** The type of the API resource. For Groups resources, the value is `admin#directory#group`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** Read-only. The list of a group's alias email addresses. To add, update, or remove a group's aliases, use the `groups.aliases` methods. If edited in a group's POST or PUT request, the edit is ignored. */
  aliases?: Array<string>;
  /** Read-only. The list of the group's non-editable alias email addresses that are outside of the account's primary domain or subdomains. These are functioning email addresses used by the group. This is a read-only property returned in the API's response for a group. If edited in a group's POST or PUT request, the edit is ignored. */
  nonEditableAliases?: Array<string>;
}

export const Group: Schema.Schema<Group> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  adminCreated: Schema.optional(Schema.Boolean),
  directMembersCount: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  aliases: Schema.optional(Schema.Array(Schema.String)),
  nonEditableAliases: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Group" }) as any as Schema.Schema<Group>;

export interface Groups {
  /** Kind of resource this is. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of group objects. */
  groups?: Array<Group>;
  /** Token used to access next page of this result. */
  nextPageToken?: string;
}

export const Groups: Schema.Schema<Groups> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  groups: Schema.optional(Schema.Array(Group)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Groups" }) as any as Schema.Schema<Groups>;

export interface GroupAlias {
  /** The unique ID of the group. */
  id?: string;
  /** The primary email address of the group. */
  primaryEmail?: string;
  /** The alias email address. */
  alias?: string;
  /** The type of the API resource. For Alias resources, the value is `admin#directory#alias`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
}

export const GroupAlias: Schema.Schema<GroupAlias> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  primaryEmail: Schema.optional(Schema.String),
  alias: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GroupAlias" }) as any as Schema.Schema<GroupAlias>;

export interface Member {
  /** The type of the API resource. For Members resources, the value is `admin#directory#member`. */
  kind?: string;
  /** The member's email address. A member can be a user or another group. This property is required when adding a member to a group. The `email` must be unique and cannot be an alias of another group. If the email address is changed, the API automatically reflects the email address changes. */
  email?: string;
  /** The member's role in a group. The API returns an error for cycles in group memberships. For example, if `group1` is a member of `group2`, `group2` cannot be a member of `group1`. For more information about a member's role, see the [administration help center](https://support.google.com/a/answer/167094). */
  role?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The type of group member. */
  type?: string;
  /** Status of member (Immutable) */
  status?: string;
  /** Defines mail delivery preferences of member. This field is only supported by `insert`, `update`, and `get` methods. */
  delivery_settings?: string;
  /** The unique ID of the group member. A member `id` can be used as a member request URI's `memberKey`. */
  id?: string;
}

export const Member: Schema.Schema<Member> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  delivery_settings: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "Member" }) as any as Schema.Schema<Member>;

export interface MembersHasMember {
  /** Output only. Identifies whether the given user is a member of the group. Membership can be direct or nested. */
  isMember?: boolean;
}

export const MembersHasMember: Schema.Schema<MembersHasMember> = Schema.suspend(() => Schema.Struct({
  isMember: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MembersHasMember" }) as any as Schema.Schema<MembersHasMember>;

export interface Members {
  /** Kind of resource this is. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of member objects. */
  members?: Array<Member>;
  /** Token used to access next page of this result. */
  nextPageToken?: string;
}

export const Members: Schema.Schema<Members> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Member)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Members" }) as any as Schema.Schema<Members>;

export interface MobileDeviceAction {
  /** The action to be performed on the device. */
  action?: string;
}

export const MobileDeviceAction: Schema.Schema<MobileDeviceAction> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
})).annotate({ identifier: "MobileDeviceAction" }) as any as Schema.Schema<MobileDeviceAction>;

export interface MobileDevice {
  /** The type of the API resource. For Mobiledevices resources, the value is `admin#directory#mobiledevice`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The unique ID the API service uses to identify the mobile device. */
  resourceId?: string;
  /** The serial number for a Google Sync mobile device. For Android and iOS devices, this is a software generated unique identifier. */
  deviceId?: string;
  /** The list of the owner's user names. If your application needs the current list of device owner names, use the [get](https://developers.google.com/workspace/admin/directory/v1/reference/mobiledevices/get.html) method. For more information about retrieving mobile device user information, see the [Developer's Guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users#get_user). */
  name?: Array<string>;
  /** The list of the owner's email addresses. If your application needs the current list of user emails, use the [get](https://developers.google.com/workspace/admin/directory/v1/reference/mobiledevices/get.html) method. For additional information, see the [retrieve a user](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users#get_user) method. */
  email?: Array<string>;
  /** The mobile device's model name, for example Nexus S. This property can be [updated](https://developers.google.com/workspace/admin/directory/v1/reference/mobiledevices/update.html). For more information, see the [Developer's Guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-mobile=devices#update_mobile_device). */
  model?: string;
  /** The mobile device's operating system, for example IOS 4.3 or Android 2.3.5. This property can be [updated](https://developers.google.com/workspace/admin/directory/v1/reference/mobiledevices/update.html). For more information, see the [Developer's Guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-mobile-devices#update_mobile_device). */
  os?: string;
  /** The type of mobile device. */
  type?: string;
  /** The device's status. */
  status?: string;
  /** The IMEI/MEID unique identifier for Android hardware. It is not applicable to Google Sync devices. When adding an Android mobile device, this is an optional property. When updating one of these devices, this is a read-only property. */
  hardwareId?: string;
  /** Date and time the device was first synchronized with the policy settings in the G Suite administrator control panel (Read-only) */
  firstSync?: string;
  /** Date and time the device was last synchronized with the policy settings in the G Suite administrator control panel (Read-only) */
  lastSync?: string;
  /** Gives information about the device such as `os` version. This property can be [updated](https://developers.google.com/workspace/admin/directory/v1/reference/mobiledevices/update.html). For more information, see the [Developer's Guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-mobile-devices#update_mobile_device). */
  userAgent?: string;
  /** The device's serial number. */
  serialNumber?: string;
  /** The device's IMEI number. */
  imei?: string;
  /** The device's MEID number. */
  meid?: string;
  /** The device's MAC address on Wi-Fi networks. */
  wifiMacAddress?: string;
  /** Mobile Device mobile or network operator (if available) (Read-only) */
  networkOperator?: string;
  /** The default locale used on the device. */
  defaultLanguage?: string;
  /** Boolean indicating if this account is on owner/primary profile or not. */
  managedAccountIsOnOwnerProfile?: boolean;
  /** The compromised device status. */
  deviceCompromisedStatus?: string;
  /** The device's operating system build number. */
  buildNumber?: string;
  /** The device's kernel version. */
  kernelVersion?: string;
  /** The device's baseband version. */
  basebandVersion?: string;
  /** Unknown sources enabled or disabled on device (Read-only) */
  unknownSourcesStatus?: boolean;
  /** Developer options enabled or disabled on device (Read-only) */
  developerOptionsStatus?: boolean;
  /** The list of accounts added on device (Read-only) */
  otherAccountsInfo?: Array<string>;
  /** Adb (USB debugging) enabled or disabled on device (Read-only) */
  adbStatus?: boolean;
  /** Work profile supported on device (Read-only) */
  supportsWorkProfile?: boolean;
  /** Mobile Device manufacturer (Read-only) */
  manufacturer?: string;
  /** Mobile Device release version version (Read-only) */
  releaseVersion?: string;
  /** Mobile Device Security patch level (Read-only) */
  securityPatchLevel?: string;
  /** Mobile Device Brand (Read-only) */
  brand?: string;
  /** Mobile Device Bootloader version (Read-only) */
  bootloaderVersion?: string;
  /** Mobile Device Hardware (Read-only) */
  hardware?: string;
  /** Mobile Device Encryption Status (Read-only) */
  encryptionStatus?: string;
  /** DevicePasswordStatus (Read-only) */
  devicePasswordStatus?: string;
  /** DMAgentPermission (Read-only) */
  privilege?: string;
  /** The list of applications installed on an Android mobile device. It is not applicable to Google Sync and iOS devices. The list includes any Android applications that access Google Workspace data. When updating an applications list, it is important to note that updates replace the existing list. If the Android device has two existing applications and the API updates the list with five applications, the is now the updated list of five applications. */
  applications?: Array<{ packageName?: string; displayName?: string; versionName?: string; versionCode?: number; permission?: Array<string> }>;
}

export const MobileDevice: Schema.Schema<MobileDevice> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  resourceId: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.Array(Schema.String)),
  email: Schema.optional(Schema.Array(Schema.String)),
  model: Schema.optional(Schema.String),
  os: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  hardwareId: Schema.optional(Schema.String),
  firstSync: Schema.optional(Schema.String),
  lastSync: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  imei: Schema.optional(Schema.String),
  meid: Schema.optional(Schema.String),
  wifiMacAddress: Schema.optional(Schema.String),
  networkOperator: Schema.optional(Schema.String),
  defaultLanguage: Schema.optional(Schema.String),
  managedAccountIsOnOwnerProfile: Schema.optional(Schema.Boolean),
  deviceCompromisedStatus: Schema.optional(Schema.String),
  buildNumber: Schema.optional(Schema.String),
  kernelVersion: Schema.optional(Schema.String),
  basebandVersion: Schema.optional(Schema.String),
  unknownSourcesStatus: Schema.optional(Schema.Boolean),
  developerOptionsStatus: Schema.optional(Schema.Boolean),
  otherAccountsInfo: Schema.optional(Schema.Array(Schema.String)),
  adbStatus: Schema.optional(Schema.Boolean),
  supportsWorkProfile: Schema.optional(Schema.Boolean),
  manufacturer: Schema.optional(Schema.String),
  releaseVersion: Schema.optional(Schema.String),
  securityPatchLevel: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  bootloaderVersion: Schema.optional(Schema.String),
  hardware: Schema.optional(Schema.String),
  encryptionStatus: Schema.optional(Schema.String),
  devicePasswordStatus: Schema.optional(Schema.String),
  privilege: Schema.optional(Schema.String),
  applications: Schema.optional(Schema.Array(Schema.Struct({ packageName: Schema.optional(Schema.String), displayName: Schema.optional(Schema.String), versionName: Schema.optional(Schema.String), versionCode: Schema.optional(Schema.Number), permission: Schema.optional(Schema.Array(Schema.String)) }))),
})).annotate({ identifier: "MobileDevice" }) as any as Schema.Schema<MobileDevice>;

export interface MobileDevices {
  /** Kind of resource this is. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of Mobile Device objects. */
  mobiledevices?: Array<MobileDevice>;
  /** Token used to access next page of this result. */
  nextPageToken?: string;
}

export const MobileDevices: Schema.Schema<MobileDevices> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  mobiledevices: Schema.optional(Schema.Array(MobileDevice)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "MobileDevices" }) as any as Schema.Schema<MobileDevices>;

export interface OrgUnit {
  /** The type of the API resource. For Orgunits resources, the value is `admin#directory#orgUnit`. */
  kind?: string;
  /** The organizational unit's path name. For example, an organizational unit's name within the /corp/support/sales_support parent path is sales_support. Required. */
  name?: string;
  /** Description of the organizational unit. */
  description?: string;
  /** ETag of the resource. */
  etag?: string;
  /** This field is deprecated and setting its value has no effect. */
  blockInheritance?: boolean;
  /** The unique ID of the organizational unit. */
  orgUnitId?: string;
  /** The full path to the organizational unit. The `orgUnitPath` is a derived property. When listed, it is derived from `parentOrgunitPath` and organizational unit's `name`. For example, for an organizational unit named 'apps' under parent organization '/engineering', the orgUnitPath is '/engineering/apps'. In order to edit an `orgUnitPath`, either update the name of the organization or the `parentOrgunitPath`. A user's organizational unit determines which Google Workspace services the user has access to. If the user is moved to a new organization, the user's access changes. For more information about organization structures, see the [administration help center](https://support.google.com/a/answer/4352075). For more information about moving a user to a different organization, see [Update a user](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users.html#update_user). */
  orgUnitPath?: string;
  /** The unique ID of the parent organizational unit. Required, unless `parentOrgUnitPath` is set. */
  parentOrgUnitId?: string;
  /** The organizational unit's parent path. For example, /corp/sales is the parent path for /corp/sales/sales_support organizational unit. Required, unless `parentOrgUnitId` is set. */
  parentOrgUnitPath?: string;
}

export const OrgUnit: Schema.Schema<OrgUnit> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  blockInheritance: Schema.optional(Schema.Boolean),
  orgUnitId: Schema.optional(Schema.String),
  orgUnitPath: Schema.optional(Schema.String),
  parentOrgUnitId: Schema.optional(Schema.String),
  parentOrgUnitPath: Schema.optional(Schema.String),
})).annotate({ identifier: "OrgUnit" }) as any as Schema.Schema<OrgUnit>;

export interface OrgUnits {
  /** The type of the API resource. For Org Unit resources, the type is `admin#directory#orgUnits`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of organizational unit objects. */
  organizationUnits?: Array<OrgUnit>;
}

export const OrgUnits: Schema.Schema<OrgUnits> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  organizationUnits: Schema.optional(Schema.Array(OrgUnit)),
})).annotate({ identifier: "OrgUnits" }) as any as Schema.Schema<OrgUnits>;

export interface Privilege {
  /** The obfuscated ID of the service this privilege is for. This value is returned with [`Privileges.list()`](https://developers.google.com/workspace/admin/directory/v1/reference/privileges/list). */
  serviceId?: string;
  /** The type of the API resource. This is always `admin#directory#privilege`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** If the privilege can be restricted to an organization unit. */
  isOuScopable?: boolean;
  /** A list of child privileges. Privileges for a service form a tree. Each privilege can have a list of child privileges; this list is empty for a leaf privilege. */
  childPrivileges?: Array<Privilege>;
  /** The name of the privilege. */
  privilegeName?: string;
  /** The name of the service this privilege is for. */
  serviceName?: string;
}

export const Privilege: Schema.Schema<Privilege> = Schema.suspend(() => Schema.Struct({
  serviceId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  isOuScopable: Schema.optional(Schema.Boolean),
  childPrivileges: Schema.optional(Schema.Array(Privilege)),
  privilegeName: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
})).annotate({ identifier: "Privilege" }) as any as Schema.Schema<Privilege>;

export interface Privileges {
  /** The type of the API resource. This is always `admin#directory#privileges`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of Privilege resources. */
  items?: Array<Privilege>;
}

export const Privileges: Schema.Schema<Privileges> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Privilege)),
})).annotate({ identifier: "Privileges" }) as any as Schema.Schema<Privileges>;

export interface RoleAssignment {
  /** ID of this roleAssignment. */
  roleAssignmentId?: string;
  /** The ID of the role that is assigned. */
  roleId?: string;
  /** The type of the API resource. This is always `admin#directory#roleAssignment`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The unique ID of the entity this role is assigned to—either the `user_id` of a user, the `group_id` of a group, or the `uniqueId` of a service account as defined in [Identity and Access Management (IAM)](https://cloud.google.com/iam/docs/reference/rest/v1/projects.serviceAccounts). */
  assignedTo?: string;
  /** Output only. The type of the assignee (`USER` or `GROUP`). */
  assigneeType?: "user" | "group" | (string & {});
  /** The scope in which this role is assigned. */
  scopeType?: string;
  /** If the role is restricted to an organization unit, this contains the ID for the organization unit the exercise of this role is restricted to. */
  orgUnitId?: string;
  /** Optional. The condition associated with this role assignment. Note: Feature is available to Enterprise Standard, Enterprise Plus, Google Workspace for Education Plus and Cloud Identity Premium customers. A `RoleAssignment` with the `condition` field set will only take effect when the resource being accessed meets the condition. If `condition` is empty, the role (`role_id`) is applied to the actor (`assigned_to`) at the scope (`scope_type`) unconditionally. Currently, the following conditions are supported: - To make the `RoleAssignment` only applicable to [Security Groups](https://cloud.google.com/identity/docs/groups#group_types): `api.getAttribute('cloudidentity.googleapis.com/groups.labels', []).hasAny(['groups.security']) && resource.type == 'cloudidentity.googleapis.com/Group'` - To make the `RoleAssignment` not applicable to [Security Groups](https://cloud.google.com/identity/docs/groups#group_types): `!api.getAttribute('cloudidentity.googleapis.com/groups.labels', []).hasAny(['groups.security']) && resource.type == 'cloudidentity.googleapis.com/Group'` Currently, the condition strings have to be verbatim and they only work with the following [pre-built administrator roles](https://support.google.com/a/answer/2405986): - Groups Editor - Groups Reader The condition follows [Cloud IAM condition syntax](https://cloud.google.com/iam/docs/conditions-overview). - To make the `RoleAssignment` not applicable to [Locked Groups](https://cloud.google.com/identity/docs/groups#group_types): `!api.getAttribute('cloudidentity.googleapis.com/groups.labels', []).hasAny(['groups.locked']) && resource.type == 'cloudidentity.googleapis.com/Group'` This condition can also be used in conjunction with a Security-related condition. */
  condition?: string;
}

export const RoleAssignment: Schema.Schema<RoleAssignment> = Schema.suspend(() => Schema.Struct({
  roleAssignmentId: Schema.optional(Schema.String),
  roleId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  assignedTo: Schema.optional(Schema.String),
  assigneeType: Schema.optional(Schema.String),
  scopeType: Schema.optional(Schema.String),
  orgUnitId: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
})).annotate({ identifier: "RoleAssignment" }) as any as Schema.Schema<RoleAssignment>;

export interface RoleAssignments {
  /** The type of the API resource. This is always `admin#directory#roleAssignments`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of RoleAssignment resources. */
  items?: Array<RoleAssignment>;
  nextPageToken?: string;
}

export const RoleAssignments: Schema.Schema<RoleAssignments> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(RoleAssignment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "RoleAssignments" }) as any as Schema.Schema<RoleAssignments>;

export interface BuildingCoordinates {
  /** Latitude in decimal degrees. */
  latitude?: number;
  /** Longitude in decimal degrees. */
  longitude?: number;
}

export const BuildingCoordinates: Schema.Schema<BuildingCoordinates> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "BuildingCoordinates" }) as any as Schema.Schema<BuildingCoordinates>;

export interface BuildingAddress {
  /** Required. CLDR region code of the country/region of the address. */
  regionCode?: string;
  /** Optional. BCP-47 language code of the contents of this address (if known). */
  languageCode?: string;
  /** Optional. Postal code of the address. */
  postalCode?: string;
  /** Optional. Highest administrative subdivision which is used for postal addresses of a country or region. */
  administrativeArea?: string;
  /** Optional. Generally refers to the city/town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave locality empty and use addressLines. */
  locality?: string;
  /** Optional. Sublocality of the address. */
  sublocality?: string;
  /** Unstructured address lines describing the lower levels of an address. */
  addressLines?: Array<string>;
}

export const BuildingAddress: Schema.Schema<BuildingAddress> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  administrativeArea: Schema.optional(Schema.String),
  locality: Schema.optional(Schema.String),
  sublocality: Schema.optional(Schema.String),
  addressLines: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BuildingAddress" }) as any as Schema.Schema<BuildingAddress>;

export interface Building {
  /** Unique identifier for the building. The maximum length is 100 characters. */
  buildingId?: string;
  /** The building name as seen by users in Calendar. Must be unique for the customer. For example, "NYC-CHEL". The maximum length is 100 characters. */
  buildingName?: string;
  /** A brief description of the building. For example, "Chelsea Market". */
  description?: string;
  /** The geographic coordinates of the center of the building, expressed as latitude and longitude in decimal degrees. */
  coordinates?: BuildingCoordinates;
  /** Kind of resource this is. */
  kind?: string;
  /** ETag of the resource. */
  etags?: string;
  /** The display names for all floors in this building. The floors are expected to be sorted in ascending order, from lowest floor to highest floor. For example, ["B2", "B1", "L", "1", "2", "2M", "3", "PH"] Must contain at least one entry. */
  floorNames?: Array<string>;
  /** The postal address of the building. See [`PostalAddress`](/my-business/reference/rest/v4/PostalAddress) for details. Note that only a single address line and region code are required. */
  address?: BuildingAddress;
}

export const Building: Schema.Schema<Building> = Schema.suspend(() => Schema.Struct({
  buildingId: Schema.optional(Schema.String),
  buildingName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  coordinates: Schema.optional(BuildingCoordinates),
  kind: Schema.optional(Schema.String),
  etags: Schema.optional(Schema.String),
  floorNames: Schema.optional(Schema.Array(Schema.String)),
  address: Schema.optional(BuildingAddress),
})).annotate({ identifier: "Building" }) as any as Schema.Schema<Building>;

export interface Buildings {
  /** Kind of resource this is. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The Buildings in this page of results. */
  buildings?: Array<Building>;
  /** The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
}

export const Buildings: Schema.Schema<Buildings> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  buildings: Schema.optional(Schema.Array(Building)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Buildings" }) as any as Schema.Schema<Buildings>;

export interface CalendarResource {
  /** The type of the resource. For calendar resources, the value is `admin#directory#resources#calendars#CalendarResource`. */
  kind?: string;
  /** ETag of the resource. */
  etags?: string;
  /** The name of the calendar resource. For example, "Training Room 1A". */
  resourceName?: string;
  /** Description of the resource, visible only to admins. */
  resourceDescription?: string;
  /** The type of the calendar resource, intended for non-room resources. */
  resourceType?: string;
  /** The read-only email for the calendar resource. Generated as part of creating a new calendar resource. */
  resourceEmail?: string;
  /** The category of the calendar resource. Either CONFERENCE_ROOM or OTHER. Legacy data is set to CATEGORY_UNKNOWN. */
  resourceCategory?: string;
  /** Description of the resource, visible to users and admins. */
  userVisibleDescription?: string;
  /** The read-only auto-generated name of the calendar resource which includes metadata about the resource such as building name, floor, capacity, etc. For example, "NYC-2-Training Room 1A (16)". */
  generatedResourceName?: string;
  /** Instances of features for the calendar resource. */
  featureInstances?: unknown;
  /** The unique ID for the calendar resource. */
  resourceId?: string;
  /** Capacity of a resource, number of seats in a room. */
  capacity?: number;
  /** Name of the floor a resource is located on. */
  floorName?: string;
  /** Unique ID for the building a resource is located in. */
  buildingId?: string;
  /** Name of the section within a floor a resource is located in. */
  floorSection?: string;
}

export const CalendarResource: Schema.Schema<CalendarResource> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etags: Schema.optional(Schema.String),
  resourceName: Schema.optional(Schema.String),
  resourceDescription: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  resourceEmail: Schema.optional(Schema.String),
  resourceCategory: Schema.optional(Schema.String),
  userVisibleDescription: Schema.optional(Schema.String),
  generatedResourceName: Schema.optional(Schema.String),
  featureInstances: Schema.optional(Schema.Unknown),
  resourceId: Schema.optional(Schema.String),
  capacity: Schema.optional(Schema.Number),
  floorName: Schema.optional(Schema.String),
  buildingId: Schema.optional(Schema.String),
  floorSection: Schema.optional(Schema.String),
})).annotate({ identifier: "CalendarResource" }) as any as Schema.Schema<CalendarResource>;

export interface CalendarResources {
  /** Identifies this as a collection of CalendarResources. This is always `admin#directory#resources#calendars#calendarResourcesList`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The CalendarResources in this page of results. */
  items?: Array<CalendarResource>;
  /** The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
}

export const CalendarResources: Schema.Schema<CalendarResources> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(CalendarResource)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "CalendarResources" }) as any as Schema.Schema<CalendarResources>;

export interface Feature {
  /** ETag of the resource. */
  etags?: string;
  /** Kind of resource this is. */
  kind?: string;
  /** The name of the feature. */
  name?: string;
}

export const Feature: Schema.Schema<Feature> = Schema.suspend(() => Schema.Struct({
  etags: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Feature" }) as any as Schema.Schema<Feature>;

export interface Features {
  /** Kind of resource this is. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The Features in this page of results. */
  features?: Array<Feature>;
  /** The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
}

export const Features: Schema.Schema<Features> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  features: Schema.optional(Schema.Array(Feature)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Features" }) as any as Schema.Schema<Features>;

export interface FeatureRename {
  /** New name of the feature. */
  newName?: string;
}

export const FeatureRename: Schema.Schema<FeatureRename> = Schema.suspend(() => Schema.Struct({
  newName: Schema.optional(Schema.String),
})).annotate({ identifier: "FeatureRename" }) as any as Schema.Schema<FeatureRename>;

export interface Role {
  /** ID of the role. */
  roleId?: string;
  /** Name of the role. */
  roleName?: string;
  /** A short description of the role. */
  roleDescription?: string;
  /** The set of privileges that are granted to this role. */
  rolePrivileges?: Array<{ serviceId?: string; privilegeName?: string }>;
  /** Returns `true` if this is a pre-defined system role. */
  isSystemRole?: boolean;
  /** Returns `true` if the role is a super admin role. */
  isSuperAdminRole?: boolean;
  /** The type of the API resource. This is always `admin#directory#role`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
}

export const Role: Schema.Schema<Role> = Schema.suspend(() => Schema.Struct({
  roleId: Schema.optional(Schema.String),
  roleName: Schema.optional(Schema.String),
  roleDescription: Schema.optional(Schema.String),
  rolePrivileges: Schema.optional(Schema.Array(Schema.Struct({ serviceId: Schema.optional(Schema.String), privilegeName: Schema.optional(Schema.String) }))),
  isSystemRole: Schema.optional(Schema.Boolean),
  isSuperAdminRole: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Role" }) as any as Schema.Schema<Role>;

export interface Roles {
  /** The type of the API resource. This is always `admin#directory#roles`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of Role resources. */
  items?: Array<Role>;
  nextPageToken?: string;
}

export const Roles: Schema.Schema<Roles> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Role)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Roles" }) as any as Schema.Schema<Roles>;

export interface SchemaFieldSpec {
  /** The name of the field. */
  fieldName?: string;
  /** The unique identifier of the field (Read-only) */
  fieldId?: string;
  /** The type of the field. */
  fieldType?: string;
  /** A boolean specifying whether this is a multi-valued field or not. Default: `false`. */
  multiValued?: boolean;
  /** The kind of resource this is. For schema fields this is always `admin#directory#schema#fieldspec`. */
  kind?: string;
  /** The ETag of the field. */
  etag?: string;
  /** Boolean specifying whether the field is indexed or not. Default: `true`. */
  indexed?: boolean;
  /** Display Name of the field. */
  displayName?: string;
  /** Specifies who can view values of this field. See [Retrieve users as a non-administrator](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users#retrieve_users_non_admin) for more information. Note: It may take up to 24 hours for changes to this field to be reflected. */
  readAccessType?: string;
  /** Indexing spec for a numeric field. By default, only exact match queries will be supported for numeric fields. Setting the `numericIndexingSpec` allows range queries to be supported. */
  numericIndexingSpec?: { minValue?: number; maxValue?: number };
}

export const SchemaFieldSpec: Schema.Schema<SchemaFieldSpec> = Schema.suspend(() => Schema.Struct({
  fieldName: Schema.optional(Schema.String),
  fieldId: Schema.optional(Schema.String),
  fieldType: Schema.optional(Schema.String),
  multiValued: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  indexed: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  readAccessType: Schema.optional(Schema.String),
  numericIndexingSpec: Schema.optional(Schema.Struct({ minValue: Schema.optional(Schema.Number), maxValue: Schema.optional(Schema.Number) })),
})).annotate({ identifier: "SchemaFieldSpec" }) as any as Schema.Schema<SchemaFieldSpec>;

export interface Admin_Schema {
  /** The unique identifier of the schema (Read-only) */
  schemaId?: string;
  /** The schema's name. Each `schema_name` must be unique within a customer. Reusing a name results in a `409: Entity already exists` error. */
  schemaName?: string;
  /** A list of fields in the schema. */
  fields?: Array<SchemaFieldSpec>;
  /** Display name for the schema. */
  displayName?: string;
  /** Kind of resource this is. */
  kind?: string;
  /** The ETag of the resource. */
  etag?: string;
}

export const Admin_Schema: Schema.Schema<Admin_Schema> = Schema.suspend(() => Schema.Struct({
  schemaId: Schema.optional(Schema.String),
  schemaName: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(SchemaFieldSpec)),
  displayName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Admin_Schema" }) as any as Schema.Schema<Admin_Schema>;

export interface Schemas {
  /** Kind of resource this is. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of UserSchema objects. */
  schemas?: Array<Admin_Schema>;
}

export const Schemas: Schema.Schema<Schemas> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  schemas: Schema.optional(Schema.Array(Admin_Schema)),
})).annotate({ identifier: "Schemas" }) as any as Schema.Schema<Schemas>;

export interface Token {
  /** The Client ID of the application the token is issued to. */
  clientId?: string;
  /** A list of authorization scopes the application is granted. */
  scopes?: Array<string>;
  /** The unique ID of the user that issued the token. */
  userKey?: string;
  /** Whether the application is registered with Google. The value is `true` if the application has an anonymous Client ID. */
  anonymous?: boolean;
  /** The displayable name of the application the token is issued to. */
  displayText?: string;
  /** Whether the token is issued to an installed application. The value is `true` if the application is installed to a desktop or mobile device. */
  nativeApp?: boolean;
  /** The type of the API resource. This is always `admin#directory#token`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
}

export const Token: Schema.Schema<Token> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
  userKey: Schema.optional(Schema.String),
  anonymous: Schema.optional(Schema.Boolean),
  displayText: Schema.optional(Schema.String),
  nativeApp: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Token" }) as any as Schema.Schema<Token>;

export interface Tokens {
  /** The type of the API resource. This is always `admin#directory#tokenList`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of Token resources. */
  items?: Array<Token>;
}

export const Tokens: Schema.Schema<Tokens> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Token)),
})).annotate({ identifier: "Tokens" }) as any as Schema.Schema<Tokens>;

export interface UserName {
  /** The user's full name formed by concatenating the first and last name values. */
  fullName?: string;
  /** The user's last name. Required when creating a user account. */
  familyName?: string;
  /** The user's first name. Required when creating a user account. */
  givenName?: string;
  /** The user's display name. Limit: 256 characters. */
  displayName?: string;
}

export const UserName: Schema.Schema<UserName> = Schema.suspend(() => Schema.Struct({
  fullName: Schema.optional(Schema.String),
  familyName: Schema.optional(Schema.String),
  givenName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "UserName" }) as any as Schema.Schema<UserName>;

export type UserCustomProperties = Record<string, unknown>;
export const UserCustomProperties: Schema.Schema<UserCustomProperties> = Schema.Record(Schema.String, Schema.Unknown) as any as Schema.Schema<UserCustomProperties>;

export interface GuestAccountInfo {
  /** Immutable. The guest's external email. */
  primaryGuestEmail?: string;
}

export const GuestAccountInfo: Schema.Schema<GuestAccountInfo> = Schema.suspend(() => Schema.Struct({
  primaryGuestEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "GuestAccountInfo" }) as any as Schema.Schema<GuestAccountInfo>;

export interface User {
  /** The unique ID for the user. A user `id` can be used as a user request URI's `userKey`. */
  id?: string;
  /** The user's primary email address. This property is required in a request to create a user account. The `primaryEmail` must be unique and cannot be an alias of another user. */
  primaryEmail?: string;
  /** User's password */
  password?: string;
  /** Stores the hash format of the `password` property. The following `hashFunction` values are allowed: * `MD5` - Accepts simple hex-encoded values. * `SHA-1` - Accepts simple hex-encoded values. * `crypt` - Compliant with the [C crypt library](https://en.wikipedia.org/wiki/Crypt_%28C%29). Supports the DES, MD5 (hash prefix `$1$`), SHA-256 (hash prefix `$5$`), and SHA-512 (hash prefix `$6$`) hash algorithms. If rounds are specified as part of the prefix, they must be 10,000 or fewer. */
  hashFunction?: string;
  /** Output only. Indicates a user with super administrator privileges. The `isAdmin` property can only be edited in the [Make a user an administrator](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users.html#make_admin) operation ( [makeAdmin](https://developers.google.com/workspace/admin/directory/v1/reference/users/makeAdmin.html) method). If edited in the user [insert](https://developers.google.com/workspace/admin/directory/v1/reference/users/insert.html) or [update](https://developers.google.com/workspace/admin/directory/v1/reference/users/update.html) methods, the edit is ignored by the API service. */
  isAdmin?: boolean;
  /** Output only. Indicates if the user is a delegated administrator. Delegated administrators are supported by the API but cannot create or undelete users, or make users administrators. These requests are ignored by the API service. Roles and privileges for administrators are assigned using the [Admin console](https://support.google.com/a/answer/33325). */
  isDelegatedAdmin?: boolean;
  /** Output only. This property is `true` if the user has completed an initial login and accepted the Terms of Service agreement. */
  agreedToTerms?: boolean;
  /** Indicates if user is suspended. */
  suspended?: boolean;
  /** Indicates if the user is forced to change their password at next login. This setting doesn't apply when [the user signs in via a third-party identity provider](https://support.google.com/a/answer/60224). */
  changePasswordAtNextLogin?: boolean;
  /** If `true`, the user's IP address is subject to a deprecated IP address [`allowlist`](https://support.google.com/a/answer/60752) configuration. */
  ipWhitelisted?: boolean;
  /** Holds the given and family names of the user, and the read-only `fullName` value. The maximum number of characters in the `givenName` and in the `familyName` values is 60. In addition, name values support unicode/UTF-8 characters, and can contain spaces, letters (a-z), numbers (0-9), dashes (-), forward slashes (/), and periods (.). For more information about character usage rules, see the [administration help center](https://support.google.com/a/answer/9193374). Maximum allowed data size for this field is 1KB. */
  name?: UserName;
  /** Output only. The type of the API resource. For Users resources, the value is `admin#directory#user`. */
  kind?: string;
  /** Output only. ETag of the resource. */
  etag?: string;
  /** The list of the user's email addresses. The maximum allowed data size for this field is 10KB. This excludes `publicKeyEncryptionCertificates`. */
  emails?: unknown;
  /** The list of external IDs for the user, such as an employee or network ID. The maximum allowed data size for this field is 2KB. */
  externalIds?: unknown;
  /** The list of the user's relationships to other users. The maximum allowed data size for this field is 2KB. */
  relations?: unknown;
  /** Output only. The list of the user's alias email addresses. */
  aliases?: Array<string>;
  /** Output only. Indicates if the user's Google mailbox is created. This property is only applicable if the user has been assigned a Gmail license. */
  isMailboxSetup?: boolean;
  /** Output only. The customer ID to [retrieve all account users](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users.html#get_all_users). You can use the alias `my_customer` to represent your account's `customerId`. As a reseller administrator, you can use the resold customer account's `customerId`. To get a `customerId`, use the account's primary domain in the `domain` parameter of a [users.list](https://developers.google.com/workspace/admin/directory/v1/reference/users/list) request. */
  customerId?: string;
  /** The list of the user's addresses. The maximum allowed data size for this field is 10KB. */
  addresses?: unknown;
  /** The list of organizations the user belongs to. The maximum allowed data size for this field is 10KB. */
  organizations?: unknown;
  /** User's last login time. (Read-only) */
  lastLoginTime?: string;
  /** The list of the user's phone numbers. The maximum allowed data size for this field is 1KB. */
  phones?: unknown;
  /** Output only. Has the reason a user account is suspended either by the administrator or by Google at the time of suspension. The property is returned only if the `suspended` property is `true`. */
  suspensionReason?: string;
  /** Output only. The URL of the user's profile photo. The URL might be temporary or private. */
  thumbnailPhotoUrl?: string;
  /** The user's languages. The maximum allowed data size for this field is 1KB. */
  languages?: unknown;
  /** The list of [POSIX](https://www.opengroup.org/austin/papers/posix_faq.html) account information for the user. */
  posixAccounts?: unknown;
  /** User's G Suite account creation time. (Read-only) */
  creationTime?: string;
  /** Output only. The list of the user's non-editable alias email addresses. These are typically outside the account's primary domain or sub-domain. */
  nonEditableAliases?: Array<string>;
  /** A list of SSH public keys. */
  sshPublicKeys?: unknown;
  /** Notes for the user. */
  notes?: unknown;
  /** The user's websites. The maximum allowed data size for this field is 2KB. */
  websites?: unknown;
  /** The user's locations. The maximum allowed data size for this field is 10KB. */
  locations?: unknown;
  /** Indicates if the user's profile is visible in the Google Workspace global address list when the contact sharing feature is enabled for the domain. For more information about excluding user profiles, see the [administration help center](https://support.google.com/a/answer/1285988). */
  includeInGlobalAddressList?: boolean;
  /** The list of the user's keywords. The maximum allowed data size for this field is 1KB. */
  keywords?: unknown;
  deletionTime?: string;
  /** The user's gender. The maximum allowed data size for this field is 1KB. */
  gender?: unknown;
  /** Output only. ETag of the user's photo (Read-only) */
  thumbnailPhotoEtag?: string;
  /** The list of the user's Instant Messenger (IM) accounts. A user account can have multiple ims properties. But, only one of these ims properties can be the primary IM contact. The maximum allowed data size for this field is 2KB. */
  ims?: unknown;
  /** Custom fields of the user. The key is a `schema_name` and its values are `'field_name': 'field_value'`. */
  customSchemas?: Record<string, UserCustomProperties>;
  /** Output only. Is enrolled in 2-step verification (Read-only) */
  isEnrolledIn2Sv?: boolean;
  /** Output only. Is 2-step verification enforced (Read-only) */
  isEnforcedIn2Sv?: boolean;
  /** Indicates if user is archived. */
  archived?: boolean;
  /** The full path of the parent organization associated with the user. If the parent organization is the top-level, it is represented as a forward slash (`/`). */
  orgUnitPath?: string;
  /** Recovery email of the user. */
  recoveryEmail?: string;
  /** Recovery phone of the user. The phone number must be in the E.164 format, starting with the plus sign (+). Example: *+16506661212*. */
  recoveryPhone?: string;
  /** Immutable. Indicates if the inserted user is a guest. */
  isGuestUser?: boolean;
  /** Immutable. Additional guest-related metadata fields */
  guestAccountInfo?: GuestAccountInfo;
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  primaryEmail: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  hashFunction: Schema.optional(Schema.String),
  isAdmin: Schema.optional(Schema.Boolean),
  isDelegatedAdmin: Schema.optional(Schema.Boolean),
  agreedToTerms: Schema.optional(Schema.Boolean),
  suspended: Schema.optional(Schema.Boolean),
  changePasswordAtNextLogin: Schema.optional(Schema.Boolean),
  ipWhitelisted: Schema.optional(Schema.Boolean),
  name: Schema.optional(UserName),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  emails: Schema.optional(Schema.Unknown),
  externalIds: Schema.optional(Schema.Unknown),
  relations: Schema.optional(Schema.Unknown),
  aliases: Schema.optional(Schema.Array(Schema.String)),
  isMailboxSetup: Schema.optional(Schema.Boolean),
  customerId: Schema.optional(Schema.String),
  addresses: Schema.optional(Schema.Unknown),
  organizations: Schema.optional(Schema.Unknown),
  lastLoginTime: Schema.optional(Schema.String),
  phones: Schema.optional(Schema.Unknown),
  suspensionReason: Schema.optional(Schema.String),
  thumbnailPhotoUrl: Schema.optional(Schema.String),
  languages: Schema.optional(Schema.Unknown),
  posixAccounts: Schema.optional(Schema.Unknown),
  creationTime: Schema.optional(Schema.String),
  nonEditableAliases: Schema.optional(Schema.Array(Schema.String)),
  sshPublicKeys: Schema.optional(Schema.Unknown),
  notes: Schema.optional(Schema.Unknown),
  websites: Schema.optional(Schema.Unknown),
  locations: Schema.optional(Schema.Unknown),
  includeInGlobalAddressList: Schema.optional(Schema.Boolean),
  keywords: Schema.optional(Schema.Unknown),
  deletionTime: Schema.optional(Schema.String),
  gender: Schema.optional(Schema.Unknown),
  thumbnailPhotoEtag: Schema.optional(Schema.String),
  ims: Schema.optional(Schema.Unknown),
  customSchemas: Schema.optional(Schema.Record(Schema.String, UserCustomProperties)),
  isEnrolledIn2Sv: Schema.optional(Schema.Boolean),
  isEnforcedIn2Sv: Schema.optional(Schema.Boolean),
  archived: Schema.optional(Schema.Boolean),
  orgUnitPath: Schema.optional(Schema.String),
  recoveryEmail: Schema.optional(Schema.String),
  recoveryPhone: Schema.optional(Schema.String),
  isGuestUser: Schema.optional(Schema.Boolean),
  guestAccountInfo: Schema.optional(GuestAccountInfo),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface DirectoryUsersCreateGuestRequest {
  /** Immutable. External email of the guest user being created. */
  primaryGuestEmail?: string;
  /** Optional. Immutable ID of the Google Workspace account. */
  customer?: string;
}

export const DirectoryUsersCreateGuestRequest: Schema.Schema<DirectoryUsersCreateGuestRequest> = Schema.suspend(() => Schema.Struct({
  primaryGuestEmail: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "DirectoryUsersCreateGuestRequest" }) as any as Schema.Schema<DirectoryUsersCreateGuestRequest>;

export interface Users {
  /** Kind of resource this is. */
  kind?: string;
  /** Event that triggered this response (only used in case of Push Response) */
  trigger_event?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of user objects. */
  users?: Array<User>;
  /** Token used to access next page of this result. The page token is only valid for three days. */
  nextPageToken?: string;
}

export const Users: Schema.Schema<Users> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  trigger_event: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  users: Schema.optional(Schema.Array(User)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Users" }) as any as Schema.Schema<Users>;

export interface UserMakeAdmin {
  /** Indicates the administrator status of the user. */
  status?: boolean;
}

export const UserMakeAdmin: Schema.Schema<UserMakeAdmin> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UserMakeAdmin" }) as any as Schema.Schema<UserMakeAdmin>;

export interface UserUndelete {
  /** OrgUnit of User */
  orgUnitPath?: string;
}

export const UserUndelete: Schema.Schema<UserUndelete> = Schema.suspend(() => Schema.Struct({
  orgUnitPath: Schema.optional(Schema.String),
})).annotate({ identifier: "UserUndelete" }) as any as Schema.Schema<UserUndelete>;

export interface UserAlias {
  /** The unique ID for the user. */
  id?: string;
  /** The user's primary email address. */
  primaryEmail?: string;
  /** The alias email address. */
  alias?: string;
  /** The type of the API resource. For Alias resources, the value is `admin#directory#alias`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
}

export const UserAlias: Schema.Schema<UserAlias> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  primaryEmail: Schema.optional(Schema.String),
  alias: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "UserAlias" }) as any as Schema.Schema<UserAlias>;

export interface UserPhoto {
  /** The ID the API uses to uniquely identify the user. */
  id?: string;
  /** The user's primary email address. */
  primaryEmail?: string;
  /** The type of the API resource. For Photo resources, this is `admin#directory#user#photo`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** The user photo's upload data in [web-safe Base64](https://en.wikipedia.org/wiki/Base64#URL_applications) format in bytes. This means: * The slash (/) character is replaced with the underscore (_) character. * The plus sign (+) character is replaced with the hyphen (-) character. * The equals sign (=) character is replaced with the asterisk (*). * For padding, the period (.) character is used instead of the RFC-4648 baseURL definition which uses the equals sign (=) for padding. This is done to simplify URL-parsing. * Whatever the size of the photo being uploaded, the API downsizes it to 96x96 pixels. */
  photoData?: string;
  /** The MIME type of the photo. Allowed values are `JPEG`, `PNG`, `GIF`, `BMP`, `TIFF`, and web-safe base64 encoding. */
  mimeType?: string;
  /** Width of the photo in pixels. */
  width?: number;
  /** Height of the photo in pixels. */
  height?: number;
}

export const UserPhoto: Schema.Schema<UserPhoto> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  primaryEmail: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  photoData: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
})).annotate({ identifier: "UserPhoto" }) as any as Schema.Schema<UserPhoto>;

export interface VerificationCode {
  /** The obfuscated unique ID of the user. */
  userId?: string;
  /** A current verification code for the user. Invalidated or used verification codes are not returned as part of the result. */
  verificationCode?: string;
  /** The type of the resource. This is always `admin#directory#verificationCode`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
}

export const VerificationCode: Schema.Schema<VerificationCode> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
  verificationCode: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "VerificationCode" }) as any as Schema.Schema<VerificationCode>;

export interface VerificationCodes {
  /** The type of the resource. This is always `admin#directory#verificationCodesList`. */
  kind?: string;
  /** ETag of the resource. */
  etag?: string;
  /** A list of verification code resources. */
  items?: Array<VerificationCode>;
}

export const VerificationCodes: Schema.Schema<VerificationCodes> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(VerificationCode)),
})).annotate({ identifier: "VerificationCodes" }) as any as Schema.Schema<VerificationCodes>;

export interface Alias {
  alias?: string;
  etag?: string;
  id?: string;
  kind?: string;
  primaryEmail?: string;
}

export const Alias: Schema.Schema<Alias> = Schema.suspend(() => Schema.Struct({
  alias: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  primaryEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "Alias" }) as any as Schema.Schema<Alias>;

export interface Aliases {
  aliases?: Array<unknown>;
  etag?: string;
  kind?: string;
}

export const Aliases: Schema.Schema<Aliases> = Schema.suspend(() => Schema.Struct({
  aliases: Schema.optional(Schema.Array(Schema.Unknown)),
  etag: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Aliases" }) as any as Schema.Schema<Aliases>;

export interface FeatureInstance {
  /** The feature that this is an instance of. A calendar resource may have multiple instances of a feature. */
  feature?: Feature;
}

export const FeatureInstance: Schema.Schema<FeatureInstance> = Schema.suspend(() => Schema.Struct({
  feature: Schema.optional(Feature),
})).annotate({ identifier: "FeatureInstance" }) as any as Schema.Schema<FeatureInstance>;

export interface UserAbout {
  /** About entry can have a type which indicates the content type. It can either be plain or html. By default, notes contents are assumed to contain plain text. */
  contentType?: string;
  /** Actual value of notes. */
  value?: string;
}

export const UserAbout: Schema.Schema<UserAbout> = Schema.suspend(() => Schema.Struct({
  contentType: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "UserAbout" }) as any as Schema.Schema<UserAbout>;

export interface UserAddress {
  /** Country. */
  country?: string;
  /** Country code. */
  countryCode?: string;
  /** Custom type. */
  customType?: string;
  /** Extended Address. */
  extendedAddress?: string;
  /** Formatted address. */
  formatted?: string;
  /** Locality. */
  locality?: string;
  /** Other parts of address. */
  poBox?: string;
  /** Postal code. */
  postalCode?: string;
  /** If this is user's primary address. Only one entry could be marked as primary. */
  primary?: boolean;
  /** Region. */
  region?: string;
  /** User supplied address was structured. Structured addresses are NOT supported at this time. You might be able to write structured addresses but any values will eventually be clobbered. */
  sourceIsStructured?: boolean;
  /** Street. */
  streetAddress?: string;
  /** Each entry can have a type which indicates standard values of that entry. For example address could be of home work etc. In addition to the standard type an entry can have a custom type and can take any value. Such type should have the CUSTOM value as type and also have a customType value. */
  type?: string;
}

export const UserAddress: Schema.Schema<UserAddress> = Schema.suspend(() => Schema.Struct({
  country: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  customType: Schema.optional(Schema.String),
  extendedAddress: Schema.optional(Schema.String),
  formatted: Schema.optional(Schema.String),
  locality: Schema.optional(Schema.String),
  poBox: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  primary: Schema.optional(Schema.Boolean),
  region: Schema.optional(Schema.String),
  sourceIsStructured: Schema.optional(Schema.Boolean),
  streetAddress: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "UserAddress" }) as any as Schema.Schema<UserAddress>;

export interface UserEmail {
  /** Email id of the user. */
  address?: string;
  /** Custom Type. */
  customType?: string;
  /** If this is user's primary email. Only one entry could be marked as primary. */
  primary?: boolean;
  /** Each entry can have a type which indicates standard types of that entry. For example email could be of home, work etc. In addition to the standard type, an entry can have a custom type and can take any value Such types should have the CUSTOM value as type and also have a customType value. */
  type?: string;
  /** Public Key Encryption Certificates. Current limit: 1 per email address, and 5 per user. */
  public_key_encryption_certificates?: { certificate?: string; is_default?: boolean; state?: string };
}

export const UserEmail: Schema.Schema<UserEmail> = Schema.suspend(() => Schema.Struct({
  address: Schema.optional(Schema.String),
  customType: Schema.optional(Schema.String),
  primary: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  public_key_encryption_certificates: Schema.optional(Schema.Struct({ certificate: Schema.optional(Schema.String), is_default: Schema.optional(Schema.Boolean), state: Schema.optional(Schema.String) })),
})).annotate({ identifier: "UserEmail" }) as any as Schema.Schema<UserEmail>;

export interface UserExternalId {
  /** Custom type. */
  customType?: string;
  /** The type of the Id. */
  type?: string;
  /** The value of the id. */
  value?: string;
}

export const UserExternalId: Schema.Schema<UserExternalId> = Schema.suspend(() => Schema.Struct({
  customType: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "UserExternalId" }) as any as Schema.Schema<UserExternalId>;

export interface UserGender {
  /** AddressMeAs. A human-readable string containing the proper way to refer to the profile owner by humans for example he/him/his or they/them/their. */
  addressMeAs?: string;
  /** Custom gender. */
  customGender?: string;
  /** Gender. */
  type?: string;
}

export const UserGender: Schema.Schema<UserGender> = Schema.suspend(() => Schema.Struct({
  addressMeAs: Schema.optional(Schema.String),
  customGender: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "UserGender" }) as any as Schema.Schema<UserGender>;

export interface UserIm {
  /** Custom protocol. */
  customProtocol?: string;
  /** Custom type. */
  customType?: string;
  /** Instant messenger id. */
  im?: string;
  /** If this is user's primary im. Only one entry could be marked as primary. */
  primary?: boolean;
  /** Protocol used in the instant messenger. It should be one of the values from ImProtocolTypes map. Similar to type it can take a CUSTOM value and specify the custom name in customProtocol field. */
  protocol?: string;
  /** Each entry can have a type which indicates standard types of that entry. For example instant messengers could be of home work etc. In addition to the standard type an entry can have a custom type and can take any value. Such types should have the CUSTOM value as type and also have a customType value. */
  type?: string;
}

export const UserIm: Schema.Schema<UserIm> = Schema.suspend(() => Schema.Struct({
  customProtocol: Schema.optional(Schema.String),
  customType: Schema.optional(Schema.String),
  im: Schema.optional(Schema.String),
  primary: Schema.optional(Schema.Boolean),
  protocol: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "UserIm" }) as any as Schema.Schema<UserIm>;

export interface UserKeyword {
  /** Custom Type. */
  customType?: string;
  /** Each entry can have a type which indicates standard type of that entry. For example keyword could be of type occupation or outlook. In addition to the standard type an entry can have a custom type and can give it any name. Such types should have the CUSTOM value as type and also have a customType value. */
  type?: string;
  /** Keyword. */
  value?: string;
}

export const UserKeyword: Schema.Schema<UserKeyword> = Schema.suspend(() => Schema.Struct({
  customType: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "UserKeyword" }) as any as Schema.Schema<UserKeyword>;

export interface UserLanguage {
  /** Other language. User can provide their own language name if there is no corresponding ISO 639 language code. If this is set, `languageCode` can't be set. */
  customLanguage?: string;
  /** ISO 639 string representation of a language. See [Language Codes](/admin-sdk/directory/v1/languages) for the list of supported codes. Valid language codes outside the supported set will be accepted by the API but may lead to unexpected behavior. Illegal values cause `SchemaException`. If this is set, `customLanguage` can't be set. */
  languageCode?: string;
  /** Optional. If present, controls whether the specified `languageCode` is the user's preferred language. If `customLanguage` is set, this can't be set. Allowed values are `preferred` and `not_preferred`. */
  preference?: string;
}

export const UserLanguage: Schema.Schema<UserLanguage> = Schema.suspend(() => Schema.Struct({
  customLanguage: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  preference: Schema.optional(Schema.String),
})).annotate({ identifier: "UserLanguage" }) as any as Schema.Schema<UserLanguage>;

export interface UserLocation {
  /** Textual location. This is most useful for display purposes to concisely describe the location. For example 'Mountain View, CA', 'Near Seattle', 'US-NYC-9TH 9A209A.'' */
  area?: string;
  /** Building Identifier. */
  buildingId?: string;
  /** Custom Type. */
  customType?: string;
  /** Most specific textual code of individual desk location. */
  deskCode?: string;
  /** Floor name/number. */
  floorName?: string;
  /** Floor section. More specific location within the floor. For example if a floor is divided into sections 'A', 'B' and 'C' this field would identify one of those values. */
  floorSection?: string;
  /** Each entry can have a type which indicates standard types of that entry. For example location could be of types default and desk. In addition to standard type an entry can have a custom type and can give it any name. Such types should have 'custom' as type and also have a customType value. */
  type?: string;
}

export const UserLocation: Schema.Schema<UserLocation> = Schema.suspend(() => Schema.Struct({
  area: Schema.optional(Schema.String),
  buildingId: Schema.optional(Schema.String),
  customType: Schema.optional(Schema.String),
  deskCode: Schema.optional(Schema.String),
  floorName: Schema.optional(Schema.String),
  floorSection: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "UserLocation" }) as any as Schema.Schema<UserLocation>;

export interface UserOrganization {
  /** The cost center of the users department. */
  costCenter?: string;
  /** Custom type. */
  customType?: string;
  /** Department within the organization. */
  department?: string;
  /** Description of the organization. */
  description?: string;
  /** The domain to which the organization belongs to. */
  domain?: string;
  /** The full-time equivalent millipercent within the organization (100000 = 100%). */
  fullTimeEquivalent?: number;
  /** Location of the organization. This need not be fully qualified address. */
  location?: string;
  /** Name of the organization */
  name?: string;
  /** If it user's primary organization. */
  primary?: boolean;
  /** Symbol of the organization. */
  symbol?: string;
  /** Title (designation) of the user in the organization. */
  title?: string;
  /** Each entry can have a type which indicates standard types of that entry. For example organization could be of school work etc. In addition to the standard type an entry can have a custom type and can give it any name. Such types should have the CUSTOM value as type and also have a CustomType value. */
  type?: string;
}

export const UserOrganization: Schema.Schema<UserOrganization> = Schema.suspend(() => Schema.Struct({
  costCenter: Schema.optional(Schema.String),
  customType: Schema.optional(Schema.String),
  department: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  fullTimeEquivalent: Schema.optional(Schema.Number),
  location: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  primary: Schema.optional(Schema.Boolean),
  symbol: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "UserOrganization" }) as any as Schema.Schema<UserOrganization>;

export interface UserPhone {
  /** Custom Type. */
  customType?: string;
  /** If this is user's primary phone or not. */
  primary?: boolean;
  /** Each entry can have a type which indicates standard types of that entry. For example phone could be of home_fax work mobile etc. In addition to the standard type an entry can have a custom type and can give it any name. Such types should have the CUSTOM value as type and also have a customType value. */
  type?: string;
  /** Phone number. */
  value?: string;
}

export const UserPhone: Schema.Schema<UserPhone> = Schema.suspend(() => Schema.Struct({
  customType: Schema.optional(Schema.String),
  primary: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "UserPhone" }) as any as Schema.Schema<UserPhone>;

export interface UserPosixAccount {
  /** A POSIX account field identifier. */
  accountId?: string;
  /** The GECOS (user information) for this account. */
  gecos?: string;
  /** The default group ID. */
  gid?: string;
  /** The path to the home directory for this account. */
  homeDirectory?: string;
  /** The operating system type for this account. */
  operatingSystemType?: string;
  /** If this is user's primary account within the SystemId. */
  primary?: boolean;
  /** The path to the login shell for this account. */
  shell?: string;
  /** System identifier for which account Username or Uid apply to. */
  systemId?: string;
  /** The POSIX compliant user ID. */
  uid?: string;
  /** The username of the account. */
  username?: string;
}

export const UserPosixAccount: Schema.Schema<UserPosixAccount> = Schema.suspend(() => Schema.Struct({
  accountId: Schema.optional(Schema.String),
  gecos: Schema.optional(Schema.String),
  gid: Schema.optional(Schema.String),
  homeDirectory: Schema.optional(Schema.String),
  operatingSystemType: Schema.optional(Schema.String),
  primary: Schema.optional(Schema.Boolean),
  shell: Schema.optional(Schema.String),
  systemId: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
})).annotate({ identifier: "UserPosixAccount" }) as any as Schema.Schema<UserPosixAccount>;

export interface UserRelation {
  /** Custom Type. */
  customType?: string;
  /** The relation of the user. Some of the possible values are mother father sister brother manager assistant partner. */
  type?: string;
  /** The name of the relation. */
  value?: string;
}

export const UserRelation: Schema.Schema<UserRelation> = Schema.suspend(() => Schema.Struct({
  customType: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "UserRelation" }) as any as Schema.Schema<UserRelation>;

export interface UserSshPublicKey {
  /** An expiration time in microseconds since epoch. */
  expirationTimeUsec?: string;
  /** A SHA-256 fingerprint of the SSH public key. (Read-only) */
  fingerprint?: string;
  /** An SSH public key. */
  key?: string;
}

export const UserSshPublicKey: Schema.Schema<UserSshPublicKey> = Schema.suspend(() => Schema.Struct({
  expirationTimeUsec: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "UserSshPublicKey" }) as any as Schema.Schema<UserSshPublicKey>;

export interface UserWebsite {
  /** Custom Type. */
  customType?: string;
  /** If this is user's primary website or not. */
  primary?: boolean;
  /** Each entry can have a type which indicates standard types of that entry. For example website could be of home work blog etc. In addition to the standard type an entry can have a custom type and can give it any name. Such types should have the CUSTOM value as type and also have a customType value. */
  type?: string;
  /** Website. */
  value?: string;
}

export const UserWebsite: Schema.Schema<UserWebsite> = Schema.suspend(() => Schema.Struct({
  customType: Schema.optional(Schema.String),
  primary: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "UserWebsite" }) as any as Schema.Schema<UserWebsite>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ActionChromeosdevicesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The unique ID of the device. The `resourceId`s are returned in the response from the [chromeosdevices.list](https://developers.google.com/workspace/admin/directory/v1/reference/chromeosdevices/list) method. */
  resourceId: string;
  /** Request body */
  body?: ChromeOsDeviceAction;
}

export const ActionChromeosdevicesRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(ChromeOsDeviceAction).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customerId}/devices/chromeos/{resourceId}/action", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActionChromeosdevicesRequest>;

export interface ActionChromeosdevicesResponse {}
export const ActionChromeosdevicesResponse: Schema.Schema<ActionChromeosdevicesResponse> = Schema.Struct({}) as any as Schema.Schema<ActionChromeosdevicesResponse>;

export type ActionChromeosdevicesError = DefaultErrors;

/** Use [BatchChangeChromeOsDeviceStatus](https://developers.google.com/workspace/admin/directory/reference/rest/v1/customer.devices.chromeos/batchChangeStatus) instead. Takes an action that affects a Chrome OS Device. This includes deprovisioning, disabling, and re-enabling devices. *Warning:* * Deprovisioning a device will stop device policy syncing and remove device-level printers. After a device is deprovisioned, it must be wiped before it can be re-enrolled. * Lost or stolen devices should use the disable action. * Re-enabling a disabled device will consume a device license. If you do not have sufficient licenses available when completing the re-enable action, you will receive an error. For more information about deprovisioning and disabling devices, visit the [help center](https://support.google.com/chrome/a/answer/3523633). */
export const actionChromeosdevices: API.OperationMethod<ActionChromeosdevicesRequest, ActionChromeosdevicesResponse, ActionChromeosdevicesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ActionChromeosdevicesRequest,
  output: ActionChromeosdevicesResponse,
  errors: [],
}));

export interface GetChromeosdevicesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The unique ID of the device. The `deviceId`s are returned in the response from the [chromeosdevices.list](https://developers.google.com/workspace/admin/directory/v1/reference/chromeosdevices/list) method. */
  deviceId: string;
  /** Determines whether the response contains the full list of properties or only a subset. */
  projection?: "BASIC" | "FULL" | (string & {});
}

export const GetChromeosdevicesRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customerId}/devices/chromeos/{deviceId}" }),
  svc,
) as unknown as Schema.Schema<GetChromeosdevicesRequest>;

export type GetChromeosdevicesResponse = ChromeOsDevice;
export const GetChromeosdevicesResponse = ChromeOsDevice;

export type GetChromeosdevicesError = DefaultErrors;

/** Retrieves a Chrome OS device's properties. */
export const getChromeosdevices: API.OperationMethod<GetChromeosdevicesRequest, GetChromeosdevicesResponse, GetChromeosdevicesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetChromeosdevicesRequest,
  output: GetChromeosdevicesResponse,
  errors: [],
}));

export interface ListChromeosdevicesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** Maximum number of results to return. Value should not exceed 300. */
  maxResults?: number;
  /** Device property to use for sorting results. */
  orderBy?: "annotatedLocation" | "annotatedUser" | "lastSync" | "notes" | "serialNumber" | "status" | (string & {});
  /** The full path of the organizational unit (minus the leading `/`) or its unique ID. */
  orgUnitPath?: string;
  /** The `pageToken` query parameter is used to request the next page of query results. The follow-on request's `pageToken` query parameter is the `nextPageToken` from your previous response. */
  pageToken?: string;
  /** Determines whether the response contains the full list of properties or only a subset. */
  projection?: "BASIC" | "FULL" | (string & {});
  /** Search string in the format given at [List query operators](https://developers.google.com/workspace/admin/directory/v1/list-query-operators). */
  query?: string;
  /** Whether to return results in ascending or descending order. Must be used with the `orderBy` parameter. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
  /** Return devices from all child orgunits, as well as the specified org unit. If this is set to true, 'orgUnitPath' must be provided. */
  includeChildOrgunits?: boolean;
}

export const ListChromeosdevicesRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  orgUnitPath: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitPath")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
  includeChildOrgunits: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeChildOrgunits")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customerId}/devices/chromeos" }),
  svc,
) as unknown as Schema.Schema<ListChromeosdevicesRequest>;

export type ListChromeosdevicesResponse = ChromeOsDevices;
export const ListChromeosdevicesResponse = ChromeOsDevices;

export type ListChromeosdevicesError = DefaultErrors;

/** Retrieves a paginated list of Chrome OS devices within an account. */
export const listChromeosdevices: API.PaginatedOperationMethod<ListChromeosdevicesRequest, ListChromeosdevicesResponse, ListChromeosdevicesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListChromeosdevicesRequest,
  output: ListChromeosdevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface MoveDevicesToOuChromeosdevicesRequest {
  /** Immutable. ID of the Google Workspace account */
  customerId: string;
  /** Full path of the target organizational unit or its ID */
  orgUnitPath: string;
  /** Request body */
  body?: ChromeOsMoveDevicesToOu;
}

export const MoveDevicesToOuChromeosdevicesRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  orgUnitPath: Schema.String.pipe(T.HttpQuery("orgUnitPath")),
  body: Schema.optional(ChromeOsMoveDevicesToOu).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customerId}/devices/chromeos/moveDevicesToOu", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveDevicesToOuChromeosdevicesRequest>;

export interface MoveDevicesToOuChromeosdevicesResponse {}
export const MoveDevicesToOuChromeosdevicesResponse: Schema.Schema<MoveDevicesToOuChromeosdevicesResponse> = Schema.Struct({}) as any as Schema.Schema<MoveDevicesToOuChromeosdevicesResponse>;

export type MoveDevicesToOuChromeosdevicesError = DefaultErrors;

/** Moves or inserts multiple Chrome OS devices to an organizational unit. You can move up to 50 devices at once. */
export const moveDevicesToOuChromeosdevices: API.OperationMethod<MoveDevicesToOuChromeosdevicesRequest, MoveDevicesToOuChromeosdevicesResponse, MoveDevicesToOuChromeosdevicesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MoveDevicesToOuChromeosdevicesRequest,
  output: MoveDevicesToOuChromeosdevicesResponse,
  errors: [],
}));

export interface PatchChromeosdevicesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The unique ID of the device. The `deviceId`s are returned in the response from the [chromeosdevices.list](https://developers.google.com/workspace/admin/v1/reference/chromeosdevices/list) method. */
  deviceId: string;
  /** Determines whether the response contains the full list of properties or only a subset. */
  projection?: "BASIC" | "FULL" | (string & {});
  /** Request body */
  body?: ChromeOsDevice;
}

export const PatchChromeosdevicesRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  body: Schema.optional(ChromeOsDevice).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/customer/{customerId}/devices/chromeos/{deviceId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchChromeosdevicesRequest>;

export type PatchChromeosdevicesResponse = ChromeOsDevice;
export const PatchChromeosdevicesResponse = ChromeOsDevice;

export type PatchChromeosdevicesError = DefaultErrors;

/** Updates a device's updatable properties, such as `annotatedUser`, `annotatedLocation`, `notes`, `orgUnitPath`, or `annotatedAssetId`. This method supports [patch semantics](https://developers.google.com/workspace/admin/directory/v1/guides/performance#patch). */
export const patchChromeosdevices: API.OperationMethod<PatchChromeosdevicesRequest, PatchChromeosdevicesResponse, PatchChromeosdevicesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchChromeosdevicesRequest,
  output: PatchChromeosdevicesResponse,
  errors: [],
}));

export interface UpdateChromeosdevicesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The unique ID of the device. The `deviceId`s are returned in the response from the [chromeosdevices.list](https://developers.google.com/workspace/admin/v1/reference/chromeosdevices/list) method. */
  deviceId: string;
  /** Determines whether the response contains the full list of properties or only a subset. */
  projection?: "BASIC" | "FULL" | (string & {});
  /** Request body */
  body?: ChromeOsDevice;
}

export const UpdateChromeosdevicesRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  body: Schema.optional(ChromeOsDevice).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/customer/{customerId}/devices/chromeos/{deviceId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateChromeosdevicesRequest>;

export type UpdateChromeosdevicesResponse = ChromeOsDevice;
export const UpdateChromeosdevicesResponse = ChromeOsDevice;

export type UpdateChromeosdevicesError = DefaultErrors;

/** Updates a device's updatable properties, such as `annotatedUser`, `annotatedLocation`, `notes`, `orgUnitPath`, or `annotatedAssetId`. */
export const updateChromeosdevices: API.OperationMethod<UpdateChromeosdevicesRequest, UpdateChromeosdevicesResponse, UpdateChromeosdevicesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateChromeosdevicesRequest,
  output: UpdateChromeosdevicesResponse,
  errors: [],
}));

export interface IssueCommandCustomerDevicesChromeosRequest {
  /** Immutable. ID of the Google Workspace account. */
  customerId: string;
  /** Immutable. ID of Chrome OS Device. */
  deviceId: string;
  /** Request body */
  body?: DirectoryChromeosdevicesIssueCommandRequest;
}

export const IssueCommandCustomerDevicesChromeosRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  body: Schema.optional(DirectoryChromeosdevicesIssueCommandRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customerId}/devices/chromeos/{deviceId}:issueCommand", hasBody: true }),
  svc,
) as unknown as Schema.Schema<IssueCommandCustomerDevicesChromeosRequest>;

export type IssueCommandCustomerDevicesChromeosResponse = DirectoryChromeosdevicesIssueCommandResponse;
export const IssueCommandCustomerDevicesChromeosResponse = DirectoryChromeosdevicesIssueCommandResponse;

export type IssueCommandCustomerDevicesChromeosError = DefaultErrors;

/** Issues a command for the device to execute. */
export const issueCommandCustomerDevicesChromeos: API.OperationMethod<IssueCommandCustomerDevicesChromeosRequest, IssueCommandCustomerDevicesChromeosResponse, IssueCommandCustomerDevicesChromeosError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: IssueCommandCustomerDevicesChromeosRequest,
  output: IssueCommandCustomerDevicesChromeosResponse,
  errors: [],
}));

export interface BatchChangeStatusCustomerDevicesChromeosRequest {
  /** Required. Immutable ID of the Google Workspace account. */
  customerId: string;
  /** Request body */
  body?: BatchChangeChromeOsDeviceStatusRequest;
}

export const BatchChangeStatusCustomerDevicesChromeosRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  body: Schema.optional(BatchChangeChromeOsDeviceStatusRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customerId}/devices/chromeos:batchChangeStatus", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchChangeStatusCustomerDevicesChromeosRequest>;

export type BatchChangeStatusCustomerDevicesChromeosResponse = BatchChangeChromeOsDeviceStatusResponse;
export const BatchChangeStatusCustomerDevicesChromeosResponse = BatchChangeChromeOsDeviceStatusResponse;

export type BatchChangeStatusCustomerDevicesChromeosError = DefaultErrors;

/** Changes the status of a batch of ChromeOS devices. For more information about changing a ChromeOS device state [Repair, repurpose, or retire ChromeOS devices](https://support.google.com/chrome/a/answer/3523633). */
export const batchChangeStatusCustomerDevicesChromeos: API.OperationMethod<BatchChangeStatusCustomerDevicesChromeosRequest, BatchChangeStatusCustomerDevicesChromeosResponse, BatchChangeStatusCustomerDevicesChromeosError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: BatchChangeStatusCustomerDevicesChromeosRequest,
  output: BatchChangeStatusCustomerDevicesChromeosResponse,
  errors: [],
}));

export interface CountChromeOsDevicesCustomerDevicesChromeosRequest {
  /** Required. Immutable ID of the Google Workspace account. */
  customerId: string;
  /** Optional. The full path of the organizational unit (minus the leading `/`) or its unique ID. */
  orgUnitPath?: string;
  /** Optional. Search string in the format given at [List query operators](https://developers.google.com/workspace/admin/directory/v1/list-query-operators). */
  filter?: string;
  /** Optional. Return devices from all child orgunits, as well as the specified org unit. If this is set to true, 'orgUnitPath' must be provided. */
  includeChildOrgunits?: boolean;
}

export const CountChromeOsDevicesCustomerDevicesChromeosRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  orgUnitPath: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitPath")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  includeChildOrgunits: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeChildOrgunits")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customerId}/devices/chromeos:countChromeOsDevices" }),
  svc,
) as unknown as Schema.Schema<CountChromeOsDevicesCustomerDevicesChromeosRequest>;

export type CountChromeOsDevicesCustomerDevicesChromeosResponse = CountChromeOsDevicesResponse;
export const CountChromeOsDevicesCustomerDevicesChromeosResponse = CountChromeOsDevicesResponse;

export type CountChromeOsDevicesCustomerDevicesChromeosError = DefaultErrors;

/** Counts ChromeOS devices matching the request. */
export const countChromeOsDevicesCustomerDevicesChromeos: API.OperationMethod<CountChromeOsDevicesCustomerDevicesChromeosRequest, CountChromeOsDevicesCustomerDevicesChromeosResponse, CountChromeOsDevicesCustomerDevicesChromeosError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CountChromeOsDevicesCustomerDevicesChromeosRequest,
  output: CountChromeOsDevicesCustomerDevicesChromeosResponse,
  errors: [],
}));

export interface GetCustomerDevicesChromeosCommandsRequest {
  /** Immutable. ID of the Google Workspace account. */
  customerId: string;
  /** Immutable. ID of Chrome OS Device. */
  deviceId: string;
  /** Immutable. ID of Chrome OS Device Command. */
  commandId: string;
}

export const GetCustomerDevicesChromeosCommandsRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  deviceId: Schema.String.pipe(T.HttpPath("deviceId")),
  commandId: Schema.String.pipe(T.HttpPath("commandId")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customerId}/devices/chromeos/{deviceId}/commands/{commandId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomerDevicesChromeosCommandsRequest>;

export type GetCustomerDevicesChromeosCommandsResponse = DirectoryChromeosdevicesCommand;
export const GetCustomerDevicesChromeosCommandsResponse = DirectoryChromeosdevicesCommand;

export type GetCustomerDevicesChromeosCommandsError = DefaultErrors;

/** Gets command data a specific command issued to the device. */
export const getCustomerDevicesChromeosCommands: API.OperationMethod<GetCustomerDevicesChromeosCommandsRequest, GetCustomerDevicesChromeosCommandsResponse, GetCustomerDevicesChromeosCommandsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomerDevicesChromeosCommandsRequest,
  output: GetCustomerDevicesChromeosCommandsResponse,
  errors: [],
}));

export interface DeleteAspsRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** The unique ID of the ASP to be deleted. */
  codeId: number;
}

export const DeleteAspsRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  codeId: Schema.Number.pipe(T.HttpPath("codeId")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/users/{userKey}/asps/{codeId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAspsRequest>;

export interface DeleteAspsResponse {}
export const DeleteAspsResponse: Schema.Schema<DeleteAspsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAspsResponse>;

export type DeleteAspsError = DefaultErrors;

/** Deletes an ASP issued by a user. */
export const deleteAsps: API.OperationMethod<DeleteAspsRequest, DeleteAspsResponse, DeleteAspsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAspsRequest,
  output: DeleteAspsResponse,
  errors: [],
}));

export interface GetAspsRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** The unique ID of the ASP. */
  codeId: number;
}

export const GetAspsRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  codeId: Schema.Number.pipe(T.HttpPath("codeId")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/users/{userKey}/asps/{codeId}" }),
  svc,
) as unknown as Schema.Schema<GetAspsRequest>;

export type GetAspsResponse = Asp;
export const GetAspsResponse = Asp;

export type GetAspsError = DefaultErrors;

/** Gets information about an ASP issued by a user. */
export const getAsps: API.OperationMethod<GetAspsRequest, GetAspsResponse, GetAspsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetAspsRequest,
  output: GetAspsResponse,
  errors: [],
}));

export interface ListAspsRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
}

export const ListAspsRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/users/{userKey}/asps" }),
  svc,
) as unknown as Schema.Schema<ListAspsRequest>;

export type ListAspsResponse = Asps;
export const ListAspsResponse = Asps;

export type ListAspsError = DefaultErrors;

/** Lists the ASPs issued by a user. */
export const listAsps: API.OperationMethod<ListAspsRequest, ListAspsResponse, ListAspsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListAspsRequest,
  output: ListAspsResponse,
  errors: [],
}));

export interface StopChannelsRequest {
  /** Request body */
  body?: Channel;
}

export const StopChannelsRequest = Schema.Struct({
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory_v1/channels/stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopChannelsRequest>;

export interface StopChannelsResponse {}
export const StopChannelsResponse: Schema.Schema<StopChannelsResponse> = Schema.Struct({}) as any as Schema.Schema<StopChannelsResponse>;

export type StopChannelsError = DefaultErrors;

/** Stops watching resources through this channel. */
export const stopChannels: API.OperationMethod<StopChannelsRequest, StopChannelsResponse, StopChannelsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: StopChannelsRequest,
  output: StopChannelsResponse,
  errors: [],
}));

export interface GetCustomersRequest {
  /** Id of the customer to be retrieved */
  customerKey: string;
}

export const GetCustomersRequest = Schema.Struct({
  customerKey: Schema.String.pipe(T.HttpPath("customerKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customers/{customerKey}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersRequest>;

export type GetCustomersResponse = Customer;
export const GetCustomersResponse = Customer;

export type GetCustomersError = DefaultErrors;

/** Retrieves a customer. */
export const getCustomers: API.OperationMethod<GetCustomersRequest, GetCustomersResponse, GetCustomersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersRequest,
  output: GetCustomersResponse,
  errors: [],
}));

export interface UpdateCustomersRequest {
  /** Id of the customer to be updated */
  customerKey: string;
  /** Request body */
  body?: Customer;
}

export const UpdateCustomersRequest = Schema.Struct({
  customerKey: Schema.String.pipe(T.HttpPath("customerKey")),
  body: Schema.optional(Customer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/customers/{customerKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCustomersRequest>;

export type UpdateCustomersResponse = Customer;
export const UpdateCustomersResponse = Customer;

export type UpdateCustomersError = DefaultErrors;

/** Updates a customer. */
export const updateCustomers: API.OperationMethod<UpdateCustomersRequest, UpdateCustomersResponse, UpdateCustomersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCustomersRequest,
  output: UpdateCustomersResponse,
  errors: [],
}));

export interface PatchCustomersRequest {
  /** Id of the customer to be updated */
  customerKey: string;
  /** Request body */
  body?: Customer;
}

export const PatchCustomersRequest = Schema.Struct({
  customerKey: Schema.String.pipe(T.HttpPath("customerKey")),
  body: Schema.optional(Customer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/customers/{customerKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCustomersRequest>;

export type PatchCustomersResponse = Customer;
export const PatchCustomersResponse = Customer;

export type PatchCustomersError = DefaultErrors;

/** Patches a customer. */
export const patchCustomers: API.OperationMethod<PatchCustomersRequest, PatchCustomersResponse, PatchCustomersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCustomersRequest,
  output: PatchCustomersResponse,
  errors: [],
}));

export interface ListPrinterModelsCustomersChromePrintersRequest {
  /** Required. The name of the customer who owns this collection of printers. Format: customers/{customer_id} */
  parent: string;
  /** The maximum number of objects to return. The service may return fewer than this value. */
  pageSize?: number;
  /** A page token, received from a previous call. */
  pageToken?: string;
  /** Filer to list only models by a given manufacturer in format: "manufacturer:Brother". Search syntax is shared between this api and Admin Console printers pages. */
  filter?: string;
}

export const ListPrinterModelsCustomersChromePrintersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customers/{customersId}/chrome/printers:listPrinterModels" }),
  svc,
) as unknown as Schema.Schema<ListPrinterModelsCustomersChromePrintersRequest>;

export type ListPrinterModelsCustomersChromePrintersResponse = ListPrinterModelsResponse;
export const ListPrinterModelsCustomersChromePrintersResponse = ListPrinterModelsResponse;

export type ListPrinterModelsCustomersChromePrintersError = DefaultErrors;

/** Lists the supported printer models. */
export const listPrinterModelsCustomersChromePrinters: API.PaginatedOperationMethod<ListPrinterModelsCustomersChromePrintersRequest, ListPrinterModelsCustomersChromePrintersResponse, ListPrinterModelsCustomersChromePrintersError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListPrinterModelsCustomersChromePrintersRequest,
  output: ListPrinterModelsCustomersChromePrintersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListCustomersChromePrintersRequest {
  /** Required. The name of the customer who owns this collection of printers. Format: customers/{customer_id} */
  parent: string;
  /** The maximum number of objects to return. The service may return fewer than this value. */
  pageSize?: number;
  /** A page token, received from a previous call. */
  pageToken?: string;
  /** Organization Unit that we want to list the printers for. When org_unit is not present in the request then all printers of the customer are returned (or filtered). When org_unit is present in the request then only printers available to this OU will be returned (owned or inherited). You may see if printer is owned or inherited for this OU by looking at Printer.org_unit_id. */
  orgUnitId?: string;
  /** Search query. Search syntax is shared between this api and Admin Console printers pages. */
  filter?: string;
  /** The order to sort results by. Must be one of display_name, description, make_and_model, or create_time. Default order is ascending, but descending order can be returned by appending "desc" to the order_by field. For instance, "description desc" will return the printers sorted by description in descending order. */
  orderBy?: string;
}

export const ListCustomersChromePrintersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customers/{customersId}/chrome/printers" }),
  svc,
) as unknown as Schema.Schema<ListCustomersChromePrintersRequest>;

export type ListCustomersChromePrintersResponse = ListPrintersResponse;
export const ListCustomersChromePrintersResponse = ListPrintersResponse;

export type ListCustomersChromePrintersError = DefaultErrors;

/** List printers configs. */
export const listCustomersChromePrinters: API.PaginatedOperationMethod<ListCustomersChromePrintersRequest, ListCustomersChromePrintersResponse, ListCustomersChromePrintersError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListCustomersChromePrintersRequest,
  output: ListCustomersChromePrintersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCustomersChromePrintersRequest {
  /** Required. The name of the printer to retrieve. Format: customers/{customer_id}/chrome/printers/{printer_id} */
  name: string;
}

export const GetCustomersChromePrintersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customers/{customersId}/chrome/printers/{printersId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersChromePrintersRequest>;

export type GetCustomersChromePrintersResponse = Printer;
export const GetCustomersChromePrintersResponse = Printer;

export type GetCustomersChromePrintersError = DefaultErrors;

/** Returns a `Printer` resource (printer's config). */
export const getCustomersChromePrinters: API.OperationMethod<GetCustomersChromePrintersRequest, GetCustomersChromePrintersResponse, GetCustomersChromePrintersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersChromePrintersRequest,
  output: GetCustomersChromePrintersResponse,
  errors: [],
}));

export interface CreateCustomersChromePrintersRequest {
  /** Required. The name of the customer. Format: customers/{customer_id} */
  parent: string;
  /** Request body */
  body?: Printer;
}

export const CreateCustomersChromePrintersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Printer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customers/{customersId}/chrome/printers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersChromePrintersRequest>;

export type CreateCustomersChromePrintersResponse = Printer;
export const CreateCustomersChromePrintersResponse = Printer;

export type CreateCustomersChromePrintersError = DefaultErrors;

/** Creates a printer under given Organization Unit. */
export const createCustomersChromePrinters: API.OperationMethod<CreateCustomersChromePrintersRequest, CreateCustomersChromePrintersResponse, CreateCustomersChromePrintersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersChromePrintersRequest,
  output: CreateCustomersChromePrintersResponse,
  errors: [],
}));

export interface BatchCreatePrintersCustomersChromePrintersRequest {
  /** Required. The name of the customer. Format: customers/{customer_id} */
  parent: string;
  /** Request body */
  body?: BatchCreatePrintersRequest;
}

export const BatchCreatePrintersCustomersChromePrintersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchCreatePrintersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customers/{customersId}/chrome/printers:batchCreatePrinters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreatePrintersCustomersChromePrintersRequest>;

export type BatchCreatePrintersCustomersChromePrintersResponse = BatchCreatePrintersResponse;
export const BatchCreatePrintersCustomersChromePrintersResponse = BatchCreatePrintersResponse;

export type BatchCreatePrintersCustomersChromePrintersError = DefaultErrors;

/** Creates printers under given Organization Unit. */
export const batchCreatePrintersCustomersChromePrinters: API.OperationMethod<BatchCreatePrintersCustomersChromePrintersRequest, BatchCreatePrintersCustomersChromePrintersResponse, BatchCreatePrintersCustomersChromePrintersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreatePrintersCustomersChromePrintersRequest,
  output: BatchCreatePrintersCustomersChromePrintersResponse,
  errors: [],
}));

export interface PatchCustomersChromePrintersRequest {
  /** Identifier. The resource name of the Printer object, in the format customers/{customer-id}/printers/{printer-id} (During printer creation leave empty) */
  name: string;
  /** The list of fields to be updated. Note, some of the fields are read only and cannot be updated. Values for not specified fields will be patched. */
  updateMask?: string;
  /** The list of fields to be cleared. Note, some of the fields are read only and cannot be updated. Values for not specified fields will be patched. */
  clearMask?: string;
  /** Request body */
  body?: Printer;
}

export const PatchCustomersChromePrintersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  clearMask: Schema.optional(Schema.String).pipe(T.HttpQuery("clearMask")),
  body: Schema.optional(Printer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/customers/{customersId}/chrome/printers/{printersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCustomersChromePrintersRequest>;

export type PatchCustomersChromePrintersResponse = Printer;
export const PatchCustomersChromePrintersResponse = Printer;

export type PatchCustomersChromePrintersError = DefaultErrors;

/** Updates a `Printer` resource. */
export const patchCustomersChromePrinters: API.OperationMethod<PatchCustomersChromePrintersRequest, PatchCustomersChromePrintersResponse, PatchCustomersChromePrintersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCustomersChromePrintersRequest,
  output: PatchCustomersChromePrintersResponse,
  errors: [],
}));

export interface DeleteCustomersChromePrintersRequest {
  /** Required. The name of the printer to be updated. Format: customers/{customer_id}/chrome/printers/{printer_id} */
  name: string;
}

export const DeleteCustomersChromePrintersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customers/{customersId}/chrome/printers/{printersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCustomersChromePrintersRequest>;

export type DeleteCustomersChromePrintersResponse = Empty;
export const DeleteCustomersChromePrintersResponse = Empty;

export type DeleteCustomersChromePrintersError = DefaultErrors;

/** Deletes a `Printer`. */
export const deleteCustomersChromePrinters: API.OperationMethod<DeleteCustomersChromePrintersRequest, DeleteCustomersChromePrintersResponse, DeleteCustomersChromePrintersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCustomersChromePrintersRequest,
  output: DeleteCustomersChromePrintersResponse,
  errors: [],
}));

export interface BatchDeletePrintersCustomersChromePrintersRequest {
  /** Required. The name of the customer. Format: customers/{customer_id} */
  parent: string;
  /** Request body */
  body?: BatchDeletePrintersRequest;
}

export const BatchDeletePrintersCustomersChromePrintersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchDeletePrintersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customers/{customersId}/chrome/printers:batchDeletePrinters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeletePrintersCustomersChromePrintersRequest>;

export type BatchDeletePrintersCustomersChromePrintersResponse = BatchDeletePrintersResponse;
export const BatchDeletePrintersCustomersChromePrintersResponse = BatchDeletePrintersResponse;

export type BatchDeletePrintersCustomersChromePrintersError = DefaultErrors;

/** Deletes printers in batch. */
export const batchDeletePrintersCustomersChromePrinters: API.OperationMethod<BatchDeletePrintersCustomersChromePrintersRequest, BatchDeletePrintersCustomersChromePrintersResponse, BatchDeletePrintersCustomersChromePrintersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeletePrintersCustomersChromePrintersRequest,
  output: BatchDeletePrintersCustomersChromePrintersResponse,
  errors: [],
}));

export interface ListCustomersChromePrintServersRequest {
  /** Required. The [unique ID](https://developers.google.com/workspace/admin/directory/reference/rest/v1/customers) of the customer's Google Workspace account. Format: `customers/{id}` */
  parent: string;
  /** The maximum number of objects to return (default `100`, max `100`). The service might return fewer than this value. */
  pageSize?: number;
  /** A generated token to paginate results (the `next_page_token` from a previous call). */
  pageToken?: string;
  /** If `org_unit_id` is present in the request, only print servers owned or inherited by the organizational unit (OU) are returned. If the `PrintServer` resource's `org_unit_id` matches the one in the request, the OU owns the server. If `org_unit_id` is not specified in the request, all print servers are returned or filtered against. */
  orgUnitId?: string;
  /** Search query in [Common Expression Language syntax](https://github.com/google/cel-spec). Supported filters are `display_name`, `description`, and `uri`. Example: `printServer.displayName=='marketing-queue'`. */
  filter?: string;
  /** Sort order for results. Supported values are `display_name`, `description`, or `create_time`. Default order is ascending, but descending order can be returned by appending "desc" to the `order_by` field. For instance, `orderBy=='description desc'` returns the print servers sorted by description in descending order. */
  orderBy?: string;
}

export const ListCustomersChromePrintServersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orgUnitId: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customers/{customersId}/chrome/printServers" }),
  svc,
) as unknown as Schema.Schema<ListCustomersChromePrintServersRequest>;

export type ListCustomersChromePrintServersResponse = ListPrintServersResponse;
export const ListCustomersChromePrintServersResponse = ListPrintServersResponse;

export type ListCustomersChromePrintServersError = DefaultErrors;

/** Lists print server configurations. */
export const listCustomersChromePrintServers: API.PaginatedOperationMethod<ListCustomersChromePrintServersRequest, ListCustomersChromePrintServersResponse, ListCustomersChromePrintServersError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListCustomersChromePrintServersRequest,
  output: ListCustomersChromePrintServersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCustomersChromePrintServersRequest {
  /** Required. The [unique ID](https://developers.google.com/workspace/admin/directory/reference/rest/v1/customers) of the customer's Google Workspace account. Format: `customers/{id}` */
  name: string;
}

export const GetCustomersChromePrintServersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customers/{customersId}/chrome/printServers/{printServersId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersChromePrintServersRequest>;

export type GetCustomersChromePrintServersResponse = PrintServer;
export const GetCustomersChromePrintServersResponse = PrintServer;

export type GetCustomersChromePrintServersError = DefaultErrors;

/** Returns a print server's configuration. */
export const getCustomersChromePrintServers: API.OperationMethod<GetCustomersChromePrintServersRequest, GetCustomersChromePrintServersResponse, GetCustomersChromePrintServersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersChromePrintServersRequest,
  output: GetCustomersChromePrintServersResponse,
  errors: [],
}));

export interface CreateCustomersChromePrintServersRequest {
  /** Required. The [unique ID](https://developers.google.com/workspace/admin/directory/reference/rest/v1/customers) of the customer's Google Workspace account. Format: `customers/{id}` */
  parent: string;
  /** Request body */
  body?: PrintServer;
}

export const CreateCustomersChromePrintServersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(PrintServer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customers/{customersId}/chrome/printServers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateCustomersChromePrintServersRequest>;

export type CreateCustomersChromePrintServersResponse = PrintServer;
export const CreateCustomersChromePrintServersResponse = PrintServer;

export type CreateCustomersChromePrintServersError = DefaultErrors;

/** Creates a print server. */
export const createCustomersChromePrintServers: API.OperationMethod<CreateCustomersChromePrintServersRequest, CreateCustomersChromePrintServersResponse, CreateCustomersChromePrintServersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateCustomersChromePrintServersRequest,
  output: CreateCustomersChromePrintServersResponse,
  errors: [],
}));

export interface BatchCreatePrintServersCustomersChromePrintServersRequest {
  /** Required. The [unique ID](https://developers.google.com/workspace/admin/directory/reference/rest/v1/customers) of the customer's Google Workspace account. Format: `customers/{id}` */
  parent: string;
  /** Request body */
  body?: BatchCreatePrintServersRequest;
}

export const BatchCreatePrintServersCustomersChromePrintServersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchCreatePrintServersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customers/{customersId}/chrome/printServers:batchCreatePrintServers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreatePrintServersCustomersChromePrintServersRequest>;

export type BatchCreatePrintServersCustomersChromePrintServersResponse = BatchCreatePrintServersResponse;
export const BatchCreatePrintServersCustomersChromePrintServersResponse = BatchCreatePrintServersResponse;

export type BatchCreatePrintServersCustomersChromePrintServersError = DefaultErrors;

/** Creates multiple print servers. */
export const batchCreatePrintServersCustomersChromePrintServers: API.OperationMethod<BatchCreatePrintServersCustomersChromePrintServersRequest, BatchCreatePrintServersCustomersChromePrintServersResponse, BatchCreatePrintServersCustomersChromePrintServersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreatePrintServersCustomersChromePrintServersRequest,
  output: BatchCreatePrintServersCustomersChromePrintServersResponse,
  errors: [],
}));

export interface PatchCustomersChromePrintServersRequest {
  /** Identifier. Resource name of the print server. Leave empty when creating. Format: `customers/{customer.id}/printServers/{print_server.id}` */
  name: string;
  /** The list of fields to update. Some fields are read-only and cannot be updated. Values for unspecified fields are patched. */
  updateMask?: string;
  /** Request body */
  body?: PrintServer;
}

export const PatchCustomersChromePrintServersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(PrintServer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/customers/{customersId}/chrome/printServers/{printServersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCustomersChromePrintServersRequest>;

export type PatchCustomersChromePrintServersResponse = PrintServer;
export const PatchCustomersChromePrintServersResponse = PrintServer;

export type PatchCustomersChromePrintServersError = DefaultErrors;

/** Updates a print server's configuration. */
export const patchCustomersChromePrintServers: API.OperationMethod<PatchCustomersChromePrintServersRequest, PatchCustomersChromePrintServersResponse, PatchCustomersChromePrintServersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCustomersChromePrintServersRequest,
  output: PatchCustomersChromePrintServersResponse,
  errors: [],
}));

export interface DeleteCustomersChromePrintServersRequest {
  /** Required. The name of the print server to be deleted. Format: `customers/{customer.id}/chrome/printServers/{print_server.id}` */
  name: string;
}

export const DeleteCustomersChromePrintServersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customers/{customersId}/chrome/printServers/{printServersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteCustomersChromePrintServersRequest>;

export type DeleteCustomersChromePrintServersResponse = Empty;
export const DeleteCustomersChromePrintServersResponse = Empty;

export type DeleteCustomersChromePrintServersError = DefaultErrors;

/** Deletes a print server. */
export const deleteCustomersChromePrintServers: API.OperationMethod<DeleteCustomersChromePrintServersRequest, DeleteCustomersChromePrintServersResponse, DeleteCustomersChromePrintServersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteCustomersChromePrintServersRequest,
  output: DeleteCustomersChromePrintServersResponse,
  errors: [],
}));

export interface BatchDeletePrintServersCustomersChromePrintServersRequest {
  /** Required. The [unique ID](https://developers.google.com/workspace/admin/directory/reference/rest/v1/customers) of the customer's Google Workspace account. Format: `customers/{customer.id}` */
  parent: string;
  /** Request body */
  body?: BatchDeletePrintServersRequest;
}

export const BatchDeletePrintServersCustomersChromePrintServersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchDeletePrintServersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customers/{customersId}/chrome/printServers:batchDeletePrintServers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeletePrintServersCustomersChromePrintServersRequest>;

export type BatchDeletePrintServersCustomersChromePrintServersResponse = BatchDeletePrintServersResponse;
export const BatchDeletePrintServersCustomersChromePrintServersResponse = BatchDeletePrintServersResponse;

export type BatchDeletePrintServersCustomersChromePrintServersError = DefaultErrors;

/** Deletes multiple print servers. */
export const batchDeletePrintServersCustomersChromePrintServers: API.OperationMethod<BatchDeletePrintServersCustomersChromePrintServersRequest, BatchDeletePrintServersCustomersChromePrintServersResponse, BatchDeletePrintServersCustomersChromePrintServersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeletePrintServersCustomersChromePrintServersRequest,
  output: BatchDeletePrintServersCustomersChromePrintServersResponse,
  errors: [],
}));

export interface DeleteDomainAliasesRequest {
  /** Immutable ID of the Google Workspace account. */
  customer: string;
  /** Name of domain alias to be retrieved. */
  domainAliasName: string;
}

export const DeleteDomainAliasesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  domainAliasName: Schema.String.pipe(T.HttpPath("domainAliasName")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customer/{customer}/domainaliases/{domainAliasName}" }),
  svc,
) as unknown as Schema.Schema<DeleteDomainAliasesRequest>;

export interface DeleteDomainAliasesResponse {}
export const DeleteDomainAliasesResponse: Schema.Schema<DeleteDomainAliasesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteDomainAliasesResponse>;

export type DeleteDomainAliasesError = DefaultErrors;

/** Deletes a domain Alias of the customer. */
export const deleteDomainAliases: API.OperationMethod<DeleteDomainAliasesRequest, DeleteDomainAliasesResponse, DeleteDomainAliasesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDomainAliasesRequest,
  output: DeleteDomainAliasesResponse,
  errors: [],
}));

export interface GetDomainAliasesRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customer: string;
  /** Name of domain alias to be retrieved. */
  domainAliasName: string;
}

export const GetDomainAliasesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  domainAliasName: Schema.String.pipe(T.HttpPath("domainAliasName")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/domainaliases/{domainAliasName}" }),
  svc,
) as unknown as Schema.Schema<GetDomainAliasesRequest>;

export type GetDomainAliasesResponse = DomainAlias;
export const GetDomainAliasesResponse = DomainAlias;

export type GetDomainAliasesError = DefaultErrors;

/** Retrieves a domain alias of the customer. */
export const getDomainAliases: API.OperationMethod<GetDomainAliasesRequest, GetDomainAliasesResponse, GetDomainAliasesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetDomainAliasesRequest,
  output: GetDomainAliasesResponse,
  errors: [],
}));

export interface InsertDomainAliasesRequest {
  /** Immutable ID of the Google Workspace account. */
  customer: string;
  /** Request body */
  body?: DomainAlias;
}

export const InsertDomainAliasesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(DomainAlias).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customer}/domainaliases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertDomainAliasesRequest>;

export type InsertDomainAliasesResponse = DomainAlias;
export const InsertDomainAliasesResponse = DomainAlias;

export type InsertDomainAliasesError = DefaultErrors;

/** Inserts a domain alias of the customer. */
export const insertDomainAliases: API.OperationMethod<InsertDomainAliasesRequest, InsertDomainAliasesResponse, InsertDomainAliasesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertDomainAliasesRequest,
  output: InsertDomainAliasesResponse,
  errors: [],
}));

export interface ListDomainAliasesRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customer: string;
  /** Name of the parent domain for which domain aliases are to be fetched. */
  parentDomainName?: string;
}

export const ListDomainAliasesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  parentDomainName: Schema.optional(Schema.String).pipe(T.HttpQuery("parentDomainName")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/domainaliases" }),
  svc,
) as unknown as Schema.Schema<ListDomainAliasesRequest>;

export type ListDomainAliasesResponse = DomainAliases;
export const ListDomainAliasesResponse = DomainAliases;

export type ListDomainAliasesError = DefaultErrors;

/** Lists the domain aliases of the customer. */
export const listDomainAliases: API.OperationMethod<ListDomainAliasesRequest, ListDomainAliasesResponse, ListDomainAliasesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListDomainAliasesRequest,
  output: ListDomainAliasesResponse,
  errors: [],
}));

export interface DeleteDomainsRequest {
  /** Immutable ID of the Google Workspace account. */
  customer: string;
  /** Name of domain to be deleted */
  domainName: string;
}

export const DeleteDomainsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  domainName: Schema.String.pipe(T.HttpPath("domainName")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customer/{customer}/domains/{domainName}" }),
  svc,
) as unknown as Schema.Schema<DeleteDomainsRequest>;

export interface DeleteDomainsResponse {}
export const DeleteDomainsResponse: Schema.Schema<DeleteDomainsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteDomainsResponse>;

export type DeleteDomainsError = DefaultErrors;

/** Deletes a domain of the customer. */
export const deleteDomains: API.OperationMethod<DeleteDomainsRequest, DeleteDomainsResponse, DeleteDomainsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDomainsRequest,
  output: DeleteDomainsResponse,
  errors: [],
}));

export interface GetDomainsRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customer: string;
  /** Name of domain to be retrieved */
  domainName: string;
}

export const GetDomainsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  domainName: Schema.String.pipe(T.HttpPath("domainName")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/domains/{domainName}" }),
  svc,
) as unknown as Schema.Schema<GetDomainsRequest>;

export type GetDomainsResponse = Domains;
export const GetDomainsResponse = Domains;

export type GetDomainsError = DefaultErrors;

/** Retrieves a domain of the customer. */
export const getDomains: API.OperationMethod<GetDomainsRequest, GetDomainsResponse, GetDomainsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetDomainsRequest,
  output: GetDomainsResponse,
  errors: [],
}));

export interface InsertDomainsRequest {
  /** Immutable ID of the Google Workspace account. */
  customer: string;
  /** Request body */
  body?: Domains;
}

export const InsertDomainsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(Domains).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customer}/domains", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertDomainsRequest>;

export type InsertDomainsResponse = Domains;
export const InsertDomainsResponse = Domains;

export type InsertDomainsError = DefaultErrors;

/** Inserts a domain of the customer. */
export const insertDomains: API.OperationMethod<InsertDomainsRequest, InsertDomainsResponse, InsertDomainsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertDomainsRequest,
  output: InsertDomainsResponse,
  errors: [],
}));

export interface ListDomainsRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customer: string;
}

export const ListDomainsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/domains" }),
  svc,
) as unknown as Schema.Schema<ListDomainsRequest>;

export type ListDomainsResponse = Domains2;
export const ListDomainsResponse = Domains2;

export type ListDomainsError = DefaultErrors;

/** Lists the domains of the customer. */
export const listDomains: API.OperationMethod<ListDomainsRequest, ListDomainsResponse, ListDomainsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResponse,
  errors: [],
}));

export interface DeleteGroupsRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
}

export const DeleteGroupsRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/groups/{groupKey}" }),
  svc,
) as unknown as Schema.Schema<DeleteGroupsRequest>;

export interface DeleteGroupsResponse {}
export const DeleteGroupsResponse: Schema.Schema<DeleteGroupsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteGroupsResponse>;

export type DeleteGroupsError = DefaultErrors;

/** Deletes a group. */
export const deleteGroups: API.OperationMethod<DeleteGroupsRequest, DeleteGroupsResponse, DeleteGroupsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteGroupsRequest,
  output: DeleteGroupsResponse,
  errors: [],
}));

export interface GetGroupsRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
}

export const GetGroupsRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/groups/{groupKey}" }),
  svc,
) as unknown as Schema.Schema<GetGroupsRequest>;

export type GetGroupsResponse = Group;
export const GetGroupsResponse = Group;

export type GetGroupsError = DefaultErrors;

/** Retrieves a group's properties. */
export const getGroups: API.OperationMethod<GetGroupsRequest, GetGroupsResponse, GetGroupsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetGroupsRequest,
  output: GetGroupsResponse,
  errors: [],
}));

export interface InsertGroupsRequest {
  /** Request body */
  body?: Group;
}

export const InsertGroupsRequest = Schema.Struct({
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/groups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertGroupsRequest>;

export type InsertGroupsResponse = Group;
export const InsertGroupsResponse = Group;

export type InsertGroupsError = DefaultErrors;

/** Creates a group. */
export const insertGroups: API.OperationMethod<InsertGroupsRequest, InsertGroupsResponse, InsertGroupsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertGroupsRequest,
  output: InsertGroupsResponse,
  errors: [],
}));

export interface ListGroupsRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customer?: string;
  /** The domain name. Use this field to get groups from only one domain. To return all domains for a customer account, use the `customer` query parameter instead. */
  domain?: string;
  /** Maximum number of results to return. Max allowed value is 200. */
  maxResults?: number;
  /** Column to use for sorting results */
  orderBy?: "email" | (string & {});
  /** Token to specify next page in the list */
  pageToken?: string;
  /** Query string search. Contains one or more search clauses, each with a field, operator, and value. For complete documentation, go to [Search for groups](https://developers.google.com/workspace/admin/directory/v1/guides/search-groups). */
  query?: string;
  /** Whether to return results in ascending or descending order. Only of use when orderBy is also used */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
  /** Email or immutable ID of the user if only those groups are to be listed, the given user is a member of. If it's an ID, it should match with the ID of the user object. Cannot be used with the `customer` parameter. */
  userKey?: string;
}

export const ListGroupsRequest = Schema.Struct({
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
  userKey: Schema.optional(Schema.String).pipe(T.HttpQuery("userKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/groups" }),
  svc,
) as unknown as Schema.Schema<ListGroupsRequest>;

export type ListGroupsResponse = Groups;
export const ListGroupsResponse = Groups;

export type ListGroupsError = DefaultErrors;

/** Retrieves all groups of a domain or of a user given a userKey (paginated). */
export const listGroups: API.PaginatedOperationMethod<ListGroupsRequest, ListGroupsResponse, ListGroupsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdateGroupsRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
  /** Request body */
  body?: Group;
}

export const UpdateGroupsRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/groups/{groupKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateGroupsRequest>;

export type UpdateGroupsResponse = Group;
export const UpdateGroupsResponse = Group;

export type UpdateGroupsError = DefaultErrors;

/** Updates a group's properties. */
export const updateGroups: API.OperationMethod<UpdateGroupsRequest, UpdateGroupsResponse, UpdateGroupsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateGroupsRequest,
  output: UpdateGroupsResponse,
  errors: [],
}));

export interface PatchGroupsRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
  /** Request body */
  body?: Group;
}

export const PatchGroupsRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/groups/{groupKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchGroupsRequest>;

export type PatchGroupsResponse = Group;
export const PatchGroupsResponse = Group;

export type PatchGroupsError = DefaultErrors;

/** Updates a group's properties. This method supports [patch semantics](https://developers.google.com/workspace/admin/directory/v1/guides/performance#patch). */
export const patchGroups: API.OperationMethod<PatchGroupsRequest, PatchGroupsResponse, PatchGroupsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchGroupsRequest,
  output: PatchGroupsResponse,
  errors: [],
}));

export interface DeleteGroupsAliasesRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
  /** The alias to be removed */
  alias: string;
}

export const DeleteGroupsAliasesRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
  alias: Schema.String.pipe(T.HttpPath("alias")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/groups/{groupKey}/aliases/{alias}" }),
  svc,
) as unknown as Schema.Schema<DeleteGroupsAliasesRequest>;

export interface DeleteGroupsAliasesResponse {}
export const DeleteGroupsAliasesResponse: Schema.Schema<DeleteGroupsAliasesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteGroupsAliasesResponse>;

export type DeleteGroupsAliasesError = DefaultErrors;

/** Removes an alias. */
export const deleteGroupsAliases: API.OperationMethod<DeleteGroupsAliasesRequest, DeleteGroupsAliasesResponse, DeleteGroupsAliasesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteGroupsAliasesRequest,
  output: DeleteGroupsAliasesResponse,
  errors: [],
}));

export interface InsertGroupsAliasesRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
  /** Request body */
  body?: Alias;
}

export const InsertGroupsAliasesRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
  body: Schema.optional(Alias).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/groups/{groupKey}/aliases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertGroupsAliasesRequest>;

export type InsertGroupsAliasesResponse = Alias;
export const InsertGroupsAliasesResponse = Alias;

export type InsertGroupsAliasesError = DefaultErrors;

/** Adds an alias for the group. */
export const insertGroupsAliases: API.OperationMethod<InsertGroupsAliasesRequest, InsertGroupsAliasesResponse, InsertGroupsAliasesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertGroupsAliasesRequest,
  output: InsertGroupsAliasesResponse,
  errors: [],
}));

export interface ListGroupsAliasesRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
}

export const ListGroupsAliasesRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/groups/{groupKey}/aliases" }),
  svc,
) as unknown as Schema.Schema<ListGroupsAliasesRequest>;

export type ListGroupsAliasesResponse = Aliases;
export const ListGroupsAliasesResponse = Aliases;

export type ListGroupsAliasesError = DefaultErrors;

/** Lists all aliases for a group. */
export const listGroupsAliases: API.OperationMethod<ListGroupsAliasesRequest, ListGroupsAliasesResponse, ListGroupsAliasesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListGroupsAliasesRequest,
  output: ListGroupsAliasesResponse,
  errors: [],
}));

export interface DeleteMembersRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
  /** Identifies the group member in the API request. A group member can be a user or another group. The value can be the member's (group or user) primary email address, alias, or unique ID. */
  memberKey: string;
}

export const DeleteMembersRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
  memberKey: Schema.String.pipe(T.HttpPath("memberKey")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/groups/{groupKey}/members/{memberKey}" }),
  svc,
) as unknown as Schema.Schema<DeleteMembersRequest>;

export interface DeleteMembersResponse {}
export const DeleteMembersResponse: Schema.Schema<DeleteMembersResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteMembersResponse>;

export type DeleteMembersError = DefaultErrors;

/** Removes a member from a group. */
export const deleteMembers: API.OperationMethod<DeleteMembersRequest, DeleteMembersResponse, DeleteMembersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMembersRequest,
  output: DeleteMembersResponse,
  errors: [],
}));

export interface GetMembersRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
  /** Identifies the group member in the API request. A group member can be a user or another group. The value can be the member's (group or user) primary email address, alias, or unique ID. */
  memberKey: string;
}

export const GetMembersRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
  memberKey: Schema.String.pipe(T.HttpPath("memberKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/groups/{groupKey}/members/{memberKey}" }),
  svc,
) as unknown as Schema.Schema<GetMembersRequest>;

export type GetMembersResponse = Member;
export const GetMembersResponse = Member;

export type GetMembersError = DefaultErrors;

/** Retrieves a group member's properties. */
export const getMembers: API.OperationMethod<GetMembersRequest, GetMembersResponse, GetMembersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetMembersRequest,
  output: GetMembersResponse,
  errors: [],
}));

export interface HasMemberMembersRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
  /** Identifies the user member in the API request. The value can be the user's primary email address, alias, or unique ID. */
  memberKey: string;
}

export const HasMemberMembersRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
  memberKey: Schema.String.pipe(T.HttpPath("memberKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/groups/{groupKey}/hasMember/{memberKey}" }),
  svc,
) as unknown as Schema.Schema<HasMemberMembersRequest>;

export type HasMemberMembersResponse = MembersHasMember;
export const HasMemberMembersResponse = MembersHasMember;

export type HasMemberMembersError = DefaultErrors;

/** Checks whether the given user is a member of the group. Membership can be direct or nested, but if nested, the `memberKey` and `groupKey` must be entities in the same domain or an `Invalid input` error is returned. To check for nested memberships that include entities outside of the group's domain, use the [`checkTransitiveMembership()`](https://cloud.google.com/identity/docs/reference/rest/v1/groups.memberships/checkTransitiveMembership) method in the Cloud Identity Groups API. */
export const hasMemberMembers: API.OperationMethod<HasMemberMembersRequest, HasMemberMembersResponse, HasMemberMembersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: HasMemberMembersRequest,
  output: HasMemberMembersResponse,
  errors: [],
}));

export interface InsertMembersRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
  /** Request body */
  body?: Member;
}

export const InsertMembersRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
  body: Schema.optional(Member).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/groups/{groupKey}/members", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertMembersRequest>;

export type InsertMembersResponse = Member;
export const InsertMembersResponse = Member;

export type InsertMembersError = DefaultErrors;

/** Adds a user to the specified group. */
export const insertMembers: API.OperationMethod<InsertMembersRequest, InsertMembersResponse, InsertMembersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertMembersRequest,
  output: InsertMembersResponse,
  errors: [],
}));

export interface ListMembersRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
  /** Whether to list indirect memberships. Default: false. */
  includeDerivedMembership?: boolean;
  /** Maximum number of results to return. Max allowed value is 200. */
  maxResults?: number;
  /** Token to specify next page in the list. */
  pageToken?: string;
  /** The `roles` query parameter allows you to retrieve group members by role. Allowed values are `OWNER`, `MANAGER`, and `MEMBER`. */
  roles?: string;
}

export const ListMembersRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
  includeDerivedMembership: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDerivedMembership")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  roles: Schema.optional(Schema.String).pipe(T.HttpQuery("roles")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/groups/{groupKey}/members" }),
  svc,
) as unknown as Schema.Schema<ListMembersRequest>;

export type ListMembersResponse = Members;
export const ListMembersResponse = Members;

export type ListMembersError = DefaultErrors;

/** Retrieves a paginated list of all members in a group. This method times out after 60 minutes. For more information, see [Troubleshoot error codes](https://developers.google.com/workspace/admin/directory/v1/guides/troubleshoot-error-codes). */
export const listMembers: API.PaginatedOperationMethod<ListMembersRequest, ListMembersResponse, ListMembersError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListMembersRequest,
  output: ListMembersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdateMembersRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
  /** Identifies the group member in the API request. A group member can be a user or another group. The value can be the member's (group or user) primary email address, alias, or unique ID. */
  memberKey: string;
  /** Request body */
  body?: Member;
}

export const UpdateMembersRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
  memberKey: Schema.String.pipe(T.HttpPath("memberKey")),
  body: Schema.optional(Member).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/groups/{groupKey}/members/{memberKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateMembersRequest>;

export type UpdateMembersResponse = Member;
export const UpdateMembersResponse = Member;

export type UpdateMembersError = DefaultErrors;

/** Updates the membership of a user in the specified group. */
export const updateMembers: API.OperationMethod<UpdateMembersRequest, UpdateMembersResponse, UpdateMembersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateMembersRequest,
  output: UpdateMembersResponse,
  errors: [],
}));

export interface PatchMembersRequest {
  /** Identifies the group in the API request. The value can be the group's email address, group alias, or the unique group ID. */
  groupKey: string;
  /** Identifies the group member in the API request. A group member can be a user or another group. The value can be the member's (group or user) primary email address, alias, or unique ID. */
  memberKey: string;
  /** Request body */
  body?: Member;
}

export const PatchMembersRequest = Schema.Struct({
  groupKey: Schema.String.pipe(T.HttpPath("groupKey")),
  memberKey: Schema.String.pipe(T.HttpPath("memberKey")),
  body: Schema.optional(Member).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/groups/{groupKey}/members/{memberKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchMembersRequest>;

export type PatchMembersResponse = Member;
export const PatchMembersResponse = Member;

export type PatchMembersError = DefaultErrors;

/** Updates the membership properties of a user in the specified group. This method supports [patch semantics](https://developers.google.com/workspace/admin/directory/v1/guides/performance#patch). */
export const patchMembers: API.OperationMethod<PatchMembersRequest, PatchMembersResponse, PatchMembersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchMembersRequest,
  output: PatchMembersResponse,
  errors: [],
}));

export interface ActionMobiledevicesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The unique ID the API service uses to identify the mobile device. */
  resourceId: string;
  /** Request body */
  body?: MobileDeviceAction;
}

export const ActionMobiledevicesRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(MobileDeviceAction).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customerId}/devices/mobile/{resourceId}/action", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActionMobiledevicesRequest>;

export interface ActionMobiledevicesResponse {}
export const ActionMobiledevicesResponse: Schema.Schema<ActionMobiledevicesResponse> = Schema.Struct({}) as any as Schema.Schema<ActionMobiledevicesResponse>;

export type ActionMobiledevicesError = DefaultErrors;

/** Takes an action that affects a mobile device. For example, remotely wiping a device. */
export const actionMobiledevices: API.OperationMethod<ActionMobiledevicesRequest, ActionMobiledevicesResponse, ActionMobiledevicesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ActionMobiledevicesRequest,
  output: ActionMobiledevicesResponse,
  errors: [],
}));

export interface DeleteMobiledevicesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The unique ID the API service uses to identify the mobile device. */
  resourceId: string;
}

export const DeleteMobiledevicesRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customer/{customerId}/devices/mobile/{resourceId}" }),
  svc,
) as unknown as Schema.Schema<DeleteMobiledevicesRequest>;

export interface DeleteMobiledevicesResponse {}
export const DeleteMobiledevicesResponse: Schema.Schema<DeleteMobiledevicesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteMobiledevicesResponse>;

export type DeleteMobiledevicesError = DefaultErrors;

/** Removes a mobile device. */
export const deleteMobiledevices: API.OperationMethod<DeleteMobiledevicesRequest, DeleteMobiledevicesResponse, DeleteMobiledevicesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMobiledevicesRequest,
  output: DeleteMobiledevicesResponse,
  errors: [],
}));

export interface GetMobiledevicesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The unique ID the API service uses to identify the mobile device. */
  resourceId: string;
  /** Restrict information returned to a set of selected fields. */
  projection?: "BASIC" | "FULL" | (string & {});
}

export const GetMobiledevicesRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customerId}/devices/mobile/{resourceId}" }),
  svc,
) as unknown as Schema.Schema<GetMobiledevicesRequest>;

export type GetMobiledevicesResponse = MobileDevice;
export const GetMobiledevicesResponse = MobileDevice;

export type GetMobiledevicesError = DefaultErrors;

/** Retrieves a mobile device's properties. */
export const getMobiledevices: API.OperationMethod<GetMobiledevicesRequest, GetMobiledevicesResponse, GetMobiledevicesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetMobiledevicesRequest,
  output: GetMobiledevicesResponse,
  errors: [],
}));

export interface ListMobiledevicesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** Maximum number of results to return. Max allowed value is 100. */
  maxResults?: number;
  /** Device property to use for sorting results. */
  orderBy?: "deviceId" | "email" | "lastSync" | "model" | "name" | "os" | "status" | "type" | (string & {});
  /** Token to specify next page in the list */
  pageToken?: string;
  /** Restrict information returned to a set of selected fields. */
  projection?: "BASIC" | "FULL" | (string & {});
  /** Search string in the format given at https://developers.google.com/workspace/admin/directory/v1/search-operators */
  query?: string;
  /** Whether to return results in ascending or descending order. Must be used with the `orderBy` parameter. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
}

export const ListMobiledevicesRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customerId}/devices/mobile" }),
  svc,
) as unknown as Schema.Schema<ListMobiledevicesRequest>;

export type ListMobiledevicesResponse = MobileDevices;
export const ListMobiledevicesResponse = MobileDevices;

export type ListMobiledevicesError = DefaultErrors;

/** Retrieves a paginated list of all user-owned mobile devices for an account. To retrieve a list that includes company-owned devices, use the Cloud Identity [Devices API](https://cloud.google.com/identity/docs/concepts/overview-devices) instead. This method times out after 60 minutes. For more information, see [Troubleshoot error codes](https://developers.google.com/workspace/admin/directory/v1/guides/troubleshoot-error-codes). */
export const listMobiledevices: API.PaginatedOperationMethod<ListMobiledevicesRequest, ListMobiledevicesResponse, ListMobiledevicesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListMobiledevicesRequest,
  output: ListMobiledevicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteOrgunitsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The full path of the organizational unit (minus the leading `/`) or its unique ID. */
  orgUnitPath: string;
}

export const DeleteOrgunitsRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  orgUnitPath: Schema.String.pipe(T.HttpPath("orgUnitPath")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customer/{customerId}/orgunits/{orgunitsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrgunitsRequest>;

export interface DeleteOrgunitsResponse {}
export const DeleteOrgunitsResponse: Schema.Schema<DeleteOrgunitsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteOrgunitsResponse>;

export type DeleteOrgunitsError = DefaultErrors;

/** Removes an organizational unit. */
export const deleteOrgunits: API.OperationMethod<DeleteOrgunitsRequest, DeleteOrgunitsResponse, DeleteOrgunitsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrgunitsRequest,
  output: DeleteOrgunitsResponse,
  errors: [],
}));

export interface GetOrgunitsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The full path of the organizational unit (minus the leading `/`) or its unique ID. */
  orgUnitPath: string;
}

export const GetOrgunitsRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  orgUnitPath: Schema.String.pipe(T.HttpPath("orgUnitPath")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customerId}/orgunits/{orgunitsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrgunitsRequest>;

export type GetOrgunitsResponse = OrgUnit;
export const GetOrgunitsResponse = OrgUnit;

export type GetOrgunitsError = DefaultErrors;

/** Retrieves an organizational unit. */
export const getOrgunits: API.OperationMethod<GetOrgunitsRequest, GetOrgunitsResponse, GetOrgunitsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrgunitsRequest,
  output: GetOrgunitsResponse,
  errors: [],
}));

export interface InsertOrgunitsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** Request body */
  body?: OrgUnit;
}

export const InsertOrgunitsRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  body: Schema.optional(OrgUnit).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customerId}/orgunits", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertOrgunitsRequest>;

export type InsertOrgunitsResponse = OrgUnit;
export const InsertOrgunitsResponse = OrgUnit;

export type InsertOrgunitsError = DefaultErrors;

/** Adds an organizational unit. */
export const insertOrgunits: API.OperationMethod<InsertOrgunitsRequest, InsertOrgunitsResponse, InsertOrgunitsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertOrgunitsRequest,
  output: InsertOrgunitsResponse,
  errors: [],
}));

export interface ListOrgunitsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The full path to the organizational unit or its unique ID. Returns the children of the specified organizational unit. */
  orgUnitPath?: string;
  /** Whether to return all sub-organizations or just immediate children. */
  type?: "all" | "children" | "allIncludingParent" | (string & {});
}

export const ListOrgunitsRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  orgUnitPath: Schema.optional(Schema.String).pipe(T.HttpQuery("orgUnitPath")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customerId}/orgunits" }),
  svc,
) as unknown as Schema.Schema<ListOrgunitsRequest>;

export type ListOrgunitsResponse = OrgUnits;
export const ListOrgunitsResponse = OrgUnits;

export type ListOrgunitsError = DefaultErrors;

/** Retrieves a list of all organizational units for an account. */
export const listOrgunits: API.OperationMethod<ListOrgunitsRequest, ListOrgunitsResponse, ListOrgunitsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListOrgunitsRequest,
  output: ListOrgunitsResponse,
  errors: [],
}));

export interface UpdateOrgunitsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The full path of the organizational unit (minus the leading `/`) or its unique ID. */
  orgUnitPath: string;
  /** Request body */
  body?: OrgUnit;
}

export const UpdateOrgunitsRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  orgUnitPath: Schema.String.pipe(T.HttpPath("orgUnitPath")),
  body: Schema.optional(OrgUnit).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/customer/{customerId}/orgunits/{orgunitsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateOrgunitsRequest>;

export type UpdateOrgunitsResponse = OrgUnit;
export const UpdateOrgunitsResponse = OrgUnit;

export type UpdateOrgunitsError = DefaultErrors;

/** Updates an organizational unit. */
export const updateOrgunits: API.OperationMethod<UpdateOrgunitsRequest, UpdateOrgunitsResponse, UpdateOrgunitsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateOrgunitsRequest,
  output: UpdateOrgunitsResponse,
  errors: [],
}));

export interface PatchOrgunitsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users resource](https://developers.google.com/workspace/admin/directory/v1/reference/users). */
  customerId: string;
  /** The full path of the organizational unit (minus the leading `/`) or its unique ID. */
  orgUnitPath: string;
  /** Request body */
  body?: OrgUnit;
}

export const PatchOrgunitsRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  orgUnitPath: Schema.String.pipe(T.HttpPath("orgUnitPath")),
  body: Schema.optional(OrgUnit).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/customer/{customerId}/orgunits/{orgunitsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrgunitsRequest>;

export type PatchOrgunitsResponse = OrgUnit;
export const PatchOrgunitsResponse = OrgUnit;

export type PatchOrgunitsError = DefaultErrors;

/** Updates an organizational unit. This method supports [patch semantics](https://developers.google.com/workspace/admin/directory/v1/guides/performance#patch) */
export const patchOrgunits: API.OperationMethod<PatchOrgunitsRequest, PatchOrgunitsResponse, PatchOrgunitsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrgunitsRequest,
  output: PatchOrgunitsResponse,
  errors: [],
}));

export interface ListPrivilegesRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customer: string;
}

export const ListPrivilegesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/roles/ALL/privileges" }),
  svc,
) as unknown as Schema.Schema<ListPrivilegesRequest>;

export type ListPrivilegesResponse = Privileges;
export const ListPrivilegesResponse = Privileges;

export type ListPrivilegesError = DefaultErrors;

/** Retrieves a paginated list of all privileges for a customer. */
export const listPrivileges: API.OperationMethod<ListPrivilegesRequest, ListPrivilegesResponse, ListPrivilegesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListPrivilegesRequest,
  output: ListPrivilegesResponse,
  errors: [],
}));

export interface DeleteRoleAssignmentsRequest {
  /** Immutable ID of the Google Workspace account. */
  customer: string;
  /** Immutable ID of the role assignment. */
  roleAssignmentId: string;
}

export const DeleteRoleAssignmentsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  roleAssignmentId: Schema.String.pipe(T.HttpPath("roleAssignmentId")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customer/{customer}/roleassignments/{roleAssignmentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteRoleAssignmentsRequest>;

export interface DeleteRoleAssignmentsResponse {}
export const DeleteRoleAssignmentsResponse: Schema.Schema<DeleteRoleAssignmentsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteRoleAssignmentsResponse>;

export type DeleteRoleAssignmentsError = DefaultErrors;

/** Deletes a role assignment. */
export const deleteRoleAssignments: API.OperationMethod<DeleteRoleAssignmentsRequest, DeleteRoleAssignmentsResponse, DeleteRoleAssignmentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRoleAssignmentsRequest,
  output: DeleteRoleAssignmentsResponse,
  errors: [],
}));

export interface GetRoleAssignmentsRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customer: string;
  /** Immutable ID of the role assignment. */
  roleAssignmentId: string;
}

export const GetRoleAssignmentsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  roleAssignmentId: Schema.String.pipe(T.HttpPath("roleAssignmentId")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/roleassignments/{roleAssignmentId}" }),
  svc,
) as unknown as Schema.Schema<GetRoleAssignmentsRequest>;

export type GetRoleAssignmentsResponse = RoleAssignment;
export const GetRoleAssignmentsResponse = RoleAssignment;

export type GetRoleAssignmentsError = DefaultErrors;

/** Retrieves a role assignment. */
export const getRoleAssignments: API.OperationMethod<GetRoleAssignmentsRequest, GetRoleAssignmentsResponse, GetRoleAssignmentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetRoleAssignmentsRequest,
  output: GetRoleAssignmentsResponse,
  errors: [],
}));

export interface InsertRoleAssignmentsRequest {
  /** Immutable ID of the Google Workspace account. */
  customer: string;
  /** Request body */
  body?: RoleAssignment;
}

export const InsertRoleAssignmentsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(RoleAssignment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customer}/roleassignments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertRoleAssignmentsRequest>;

export type InsertRoleAssignmentsResponse = RoleAssignment;
export const InsertRoleAssignmentsResponse = RoleAssignment;

export type InsertRoleAssignmentsError = DefaultErrors;

/** Creates a role assignment. */
export const insertRoleAssignments: API.OperationMethod<InsertRoleAssignmentsRequest, InsertRoleAssignmentsResponse, InsertRoleAssignmentsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertRoleAssignmentsRequest,
  output: InsertRoleAssignmentsResponse,
  errors: [],
}));

export interface ListRoleAssignmentsRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customer: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Token to specify the next page in the list. */
  pageToken?: string;
  /** Immutable ID of a role. If included in the request, returns only role assignments containing this role ID. */
  roleId?: string;
  /** The primary email address, alias email address, or unique user or group ID. If included in the request, returns role assignments only for this user or group. */
  userKey?: string;
  /** When set to `true`, fetches indirect role assignments (i.e. role assignment via a group) as well as direct ones. Defaults to `false`. You must specify `user_key` or the indirect role assignments will not be included. */
  includeIndirectRoleAssignments?: boolean;
}

export const ListRoleAssignmentsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  roleId: Schema.optional(Schema.String).pipe(T.HttpQuery("roleId")),
  userKey: Schema.optional(Schema.String).pipe(T.HttpQuery("userKey")),
  includeIndirectRoleAssignments: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeIndirectRoleAssignments")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/roleassignments" }),
  svc,
) as unknown as Schema.Schema<ListRoleAssignmentsRequest>;

export type ListRoleAssignmentsResponse = RoleAssignments;
export const ListRoleAssignmentsResponse = RoleAssignments;

export type ListRoleAssignmentsError = DefaultErrors;

/** Retrieves a paginated list of all roleAssignments. */
export const listRoleAssignments: API.PaginatedOperationMethod<ListRoleAssignmentsRequest, ListRoleAssignmentsResponse, ListRoleAssignmentsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListRoleAssignmentsRequest,
  output: ListRoleAssignmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface DeleteResourcesBuildingsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The id of the building to delete. */
  buildingId: string;
}

export const DeleteResourcesBuildingsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  buildingId: Schema.String.pipe(T.HttpPath("buildingId")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customer/{customer}/resources/buildings/{buildingId}" }),
  svc,
) as unknown as Schema.Schema<DeleteResourcesBuildingsRequest>;

export interface DeleteResourcesBuildingsResponse {}
export const DeleteResourcesBuildingsResponse: Schema.Schema<DeleteResourcesBuildingsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteResourcesBuildingsResponse>;

export type DeleteResourcesBuildingsError = DefaultErrors;

/** Deletes a building. */
export const deleteResourcesBuildings: API.OperationMethod<DeleteResourcesBuildingsRequest, DeleteResourcesBuildingsResponse, DeleteResourcesBuildingsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteResourcesBuildingsRequest,
  output: DeleteResourcesBuildingsResponse,
  errors: [],
}));

export interface GetResourcesBuildingsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The unique ID of the building to retrieve. */
  buildingId: string;
}

export const GetResourcesBuildingsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  buildingId: Schema.String.pipe(T.HttpPath("buildingId")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/resources/buildings/{buildingId}" }),
  svc,
) as unknown as Schema.Schema<GetResourcesBuildingsRequest>;

export type GetResourcesBuildingsResponse = Building;
export const GetResourcesBuildingsResponse = Building;

export type GetResourcesBuildingsError = DefaultErrors;

/** Retrieves a building. */
export const getResourcesBuildings: API.OperationMethod<GetResourcesBuildingsRequest, GetResourcesBuildingsResponse, GetResourcesBuildingsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetResourcesBuildingsRequest,
  output: GetResourcesBuildingsResponse,
  errors: [],
}));

export interface InsertResourcesBuildingsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** Source from which Building.coordinates are derived. */
  coordinatesSource?: "CLIENT_SPECIFIED" | "RESOLVED_FROM_ADDRESS" | "SOURCE_UNSPECIFIED" | (string & {});
  /** Request body */
  body?: Building;
}

export const InsertResourcesBuildingsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  coordinatesSource: Schema.optional(Schema.String).pipe(T.HttpQuery("coordinatesSource")),
  body: Schema.optional(Building).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customer}/resources/buildings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertResourcesBuildingsRequest>;

export type InsertResourcesBuildingsResponse = Building;
export const InsertResourcesBuildingsResponse = Building;

export type InsertResourcesBuildingsError = DefaultErrors;

/** Inserts a building. */
export const insertResourcesBuildings: API.OperationMethod<InsertResourcesBuildingsRequest, InsertResourcesBuildingsResponse, InsertResourcesBuildingsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertResourcesBuildingsRequest,
  output: InsertResourcesBuildingsResponse,
  errors: [],
}));

export interface ListResourcesBuildingsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Token to specify the next page in the list. */
  pageToken?: string;
}

export const ListResourcesBuildingsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/resources/buildings" }),
  svc,
) as unknown as Schema.Schema<ListResourcesBuildingsRequest>;

export type ListResourcesBuildingsResponse = Buildings;
export const ListResourcesBuildingsResponse = Buildings;

export type ListResourcesBuildingsError = DefaultErrors;

/** Retrieves a list of buildings for an account. */
export const listResourcesBuildings: API.PaginatedOperationMethod<ListResourcesBuildingsRequest, ListResourcesBuildingsResponse, ListResourcesBuildingsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListResourcesBuildingsRequest,
  output: ListResourcesBuildingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdateResourcesBuildingsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The id of the building to update. */
  buildingId: string;
  /** Source from which Building.coordinates are derived. */
  coordinatesSource?: "CLIENT_SPECIFIED" | "RESOLVED_FROM_ADDRESS" | "SOURCE_UNSPECIFIED" | (string & {});
  /** Request body */
  body?: Building;
}

export const UpdateResourcesBuildingsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  buildingId: Schema.String.pipe(T.HttpPath("buildingId")),
  coordinatesSource: Schema.optional(Schema.String).pipe(T.HttpQuery("coordinatesSource")),
  body: Schema.optional(Building).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/customer/{customer}/resources/buildings/{buildingId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateResourcesBuildingsRequest>;

export type UpdateResourcesBuildingsResponse = Building;
export const UpdateResourcesBuildingsResponse = Building;

export type UpdateResourcesBuildingsError = DefaultErrors;

/** Updates a building. */
export const updateResourcesBuildings: API.OperationMethod<UpdateResourcesBuildingsRequest, UpdateResourcesBuildingsResponse, UpdateResourcesBuildingsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateResourcesBuildingsRequest,
  output: UpdateResourcesBuildingsResponse,
  errors: [],
}));

export interface PatchResourcesBuildingsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The id of the building to update. */
  buildingId: string;
  /** Source from which Building.coordinates are derived. */
  coordinatesSource?: "CLIENT_SPECIFIED" | "RESOLVED_FROM_ADDRESS" | "SOURCE_UNSPECIFIED" | (string & {});
  /** Request body */
  body?: Building;
}

export const PatchResourcesBuildingsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  buildingId: Schema.String.pipe(T.HttpPath("buildingId")),
  coordinatesSource: Schema.optional(Schema.String).pipe(T.HttpQuery("coordinatesSource")),
  body: Schema.optional(Building).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/customer/{customer}/resources/buildings/{buildingId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchResourcesBuildingsRequest>;

export type PatchResourcesBuildingsResponse = Building;
export const PatchResourcesBuildingsResponse = Building;

export type PatchResourcesBuildingsError = DefaultErrors;

/** Patches a building. */
export const patchResourcesBuildings: API.OperationMethod<PatchResourcesBuildingsRequest, PatchResourcesBuildingsResponse, PatchResourcesBuildingsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchResourcesBuildingsRequest,
  output: PatchResourcesBuildingsResponse,
  errors: [],
}));

export interface DeleteResourcesCalendarsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The unique ID of the calendar resource to delete. */
  calendarResourceId: string;
}

export const DeleteResourcesCalendarsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  calendarResourceId: Schema.String.pipe(T.HttpPath("calendarResourceId")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customer/{customer}/resources/calendars/{calendarResourceId}" }),
  svc,
) as unknown as Schema.Schema<DeleteResourcesCalendarsRequest>;

export interface DeleteResourcesCalendarsResponse {}
export const DeleteResourcesCalendarsResponse: Schema.Schema<DeleteResourcesCalendarsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteResourcesCalendarsResponse>;

export type DeleteResourcesCalendarsError = DefaultErrors;

/** Deletes a calendar resource. */
export const deleteResourcesCalendars: API.OperationMethod<DeleteResourcesCalendarsRequest, DeleteResourcesCalendarsResponse, DeleteResourcesCalendarsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteResourcesCalendarsRequest,
  output: DeleteResourcesCalendarsResponse,
  errors: [],
}));

export interface GetResourcesCalendarsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The unique ID of the calendar resource to retrieve. */
  calendarResourceId: string;
}

export const GetResourcesCalendarsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  calendarResourceId: Schema.String.pipe(T.HttpPath("calendarResourceId")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/resources/calendars/{calendarResourceId}" }),
  svc,
) as unknown as Schema.Schema<GetResourcesCalendarsRequest>;

export type GetResourcesCalendarsResponse = CalendarResource;
export const GetResourcesCalendarsResponse = CalendarResource;

export type GetResourcesCalendarsError = DefaultErrors;

/** Retrieves a calendar resource. */
export const getResourcesCalendars: API.OperationMethod<GetResourcesCalendarsRequest, GetResourcesCalendarsResponse, GetResourcesCalendarsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetResourcesCalendarsRequest,
  output: GetResourcesCalendarsResponse,
  errors: [],
}));

export interface InsertResourcesCalendarsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** Request body */
  body?: CalendarResource;
}

export const InsertResourcesCalendarsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(CalendarResource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customer}/resources/calendars", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertResourcesCalendarsRequest>;

export type InsertResourcesCalendarsResponse = CalendarResource;
export const InsertResourcesCalendarsResponse = CalendarResource;

export type InsertResourcesCalendarsError = DefaultErrors;

/** Inserts a calendar resource. */
export const insertResourcesCalendars: API.OperationMethod<InsertResourcesCalendarsRequest, InsertResourcesCalendarsResponse, InsertResourcesCalendarsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertResourcesCalendarsRequest,
  output: InsertResourcesCalendarsResponse,
  errors: [],
}));

export interface ListResourcesCalendarsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Field(s) to sort results by in either ascending or descending order. Supported fields include `resourceId`, `resourceName`, `capacity`, `buildingId`, and `floorName`. If no order is specified, defaults to ascending. Should be of the form "field [asc|desc], field [asc|desc], ...". For example `buildingId, capacity desc` would return results sorted first by `buildingId` in ascending order then by `capacity` in descending order. */
  orderBy?: string;
  /** Token to specify the next page in the list. */
  pageToken?: string;
  /** String query used to filter results. Contains one or more search clauses, each with a field, operator, and value. A field can be any of supported fields and operators can be any of supported operations. Operators include '=' for exact match, '!=' for mismatch and ':' for prefix match or HAS match where applicable. For prefix match, the value should always be followed by a *. Logical operators NOT and AND are supported (in this order of precedence). Supported fields include `generatedResourceName`, `name`, `buildingId`, `floor_name`, `capacity`, `featureInstances.feature.name`, `resourceEmail`, `resourceCategory`. For example `buildingId=US-NYC-9TH AND featureInstances.feature.name:Phone`. */
  query?: string;
}

export const ListResourcesCalendarsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/resources/calendars" }),
  svc,
) as unknown as Schema.Schema<ListResourcesCalendarsRequest>;

export type ListResourcesCalendarsResponse = CalendarResources;
export const ListResourcesCalendarsResponse = CalendarResources;

export type ListResourcesCalendarsError = DefaultErrors;

/** Retrieves a list of calendar resources for an account. */
export const listResourcesCalendars: API.PaginatedOperationMethod<ListResourcesCalendarsRequest, ListResourcesCalendarsResponse, ListResourcesCalendarsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListResourcesCalendarsRequest,
  output: ListResourcesCalendarsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface UpdateResourcesCalendarsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The unique ID of the calendar resource to update. */
  calendarResourceId: string;
  /** Request body */
  body?: CalendarResource;
}

export const UpdateResourcesCalendarsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  calendarResourceId: Schema.String.pipe(T.HttpPath("calendarResourceId")),
  body: Schema.optional(CalendarResource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/customer/{customer}/resources/calendars/{calendarResourceId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateResourcesCalendarsRequest>;

export type UpdateResourcesCalendarsResponse = CalendarResource;
export const UpdateResourcesCalendarsResponse = CalendarResource;

export type UpdateResourcesCalendarsError = DefaultErrors;

/** Updates a calendar resource. This method supports patch semantics, meaning you only need to include the fields you wish to update. Fields that are not present in the request will be preserved. */
export const updateResourcesCalendars: API.OperationMethod<UpdateResourcesCalendarsRequest, UpdateResourcesCalendarsResponse, UpdateResourcesCalendarsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateResourcesCalendarsRequest,
  output: UpdateResourcesCalendarsResponse,
  errors: [],
}));

export interface PatchResourcesCalendarsRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The unique ID of the calendar resource to update. */
  calendarResourceId: string;
  /** Request body */
  body?: CalendarResource;
}

export const PatchResourcesCalendarsRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  calendarResourceId: Schema.String.pipe(T.HttpPath("calendarResourceId")),
  body: Schema.optional(CalendarResource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/customer/{customer}/resources/calendars/{calendarResourceId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchResourcesCalendarsRequest>;

export type PatchResourcesCalendarsResponse = CalendarResource;
export const PatchResourcesCalendarsResponse = CalendarResource;

export type PatchResourcesCalendarsError = DefaultErrors;

/** Patches a calendar resource. */
export const patchResourcesCalendars: API.OperationMethod<PatchResourcesCalendarsRequest, PatchResourcesCalendarsResponse, PatchResourcesCalendarsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchResourcesCalendarsRequest,
  output: PatchResourcesCalendarsResponse,
  errors: [],
}));

export interface DeleteResourcesFeaturesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The unique ID of the feature to delete. */
  featureKey: string;
}

export const DeleteResourcesFeaturesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  featureKey: Schema.String.pipe(T.HttpPath("featureKey")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customer/{customer}/resources/features/{featureKey}" }),
  svc,
) as unknown as Schema.Schema<DeleteResourcesFeaturesRequest>;

export interface DeleteResourcesFeaturesResponse {}
export const DeleteResourcesFeaturesResponse: Schema.Schema<DeleteResourcesFeaturesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteResourcesFeaturesResponse>;

export type DeleteResourcesFeaturesError = DefaultErrors;

/** Deletes a feature. */
export const deleteResourcesFeatures: API.OperationMethod<DeleteResourcesFeaturesRequest, DeleteResourcesFeaturesResponse, DeleteResourcesFeaturesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteResourcesFeaturesRequest,
  output: DeleteResourcesFeaturesResponse,
  errors: [],
}));

export interface GetResourcesFeaturesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The unique ID of the feature to retrieve. */
  featureKey: string;
}

export const GetResourcesFeaturesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  featureKey: Schema.String.pipe(T.HttpPath("featureKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/resources/features/{featureKey}" }),
  svc,
) as unknown as Schema.Schema<GetResourcesFeaturesRequest>;

export type GetResourcesFeaturesResponse = Feature;
export const GetResourcesFeaturesResponse = Feature;

export type GetResourcesFeaturesError = DefaultErrors;

/** Retrieves a feature. */
export const getResourcesFeatures: API.OperationMethod<GetResourcesFeaturesRequest, GetResourcesFeaturesResponse, GetResourcesFeaturesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetResourcesFeaturesRequest,
  output: GetResourcesFeaturesResponse,
  errors: [],
}));

export interface InsertResourcesFeaturesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** Request body */
  body?: Feature;
}

export const InsertResourcesFeaturesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(Feature).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customer}/resources/features", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertResourcesFeaturesRequest>;

export type InsertResourcesFeaturesResponse = Feature;
export const InsertResourcesFeaturesResponse = Feature;

export type InsertResourcesFeaturesError = DefaultErrors;

/** Inserts a feature. */
export const insertResourcesFeatures: API.OperationMethod<InsertResourcesFeaturesRequest, InsertResourcesFeaturesResponse, InsertResourcesFeaturesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertResourcesFeaturesRequest,
  output: InsertResourcesFeaturesResponse,
  errors: [],
}));

export interface ListResourcesFeaturesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Token to specify the next page in the list. */
  pageToken?: string;
}

export const ListResourcesFeaturesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/resources/features" }),
  svc,
) as unknown as Schema.Schema<ListResourcesFeaturesRequest>;

export type ListResourcesFeaturesResponse = Features;
export const ListResourcesFeaturesResponse = Features;

export type ListResourcesFeaturesError = DefaultErrors;

/** Retrieves a list of features for an account. */
export const listResourcesFeatures: API.PaginatedOperationMethod<ListResourcesFeaturesRequest, ListResourcesFeaturesResponse, ListResourcesFeaturesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListResourcesFeaturesRequest,
  output: ListResourcesFeaturesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface RenameResourcesFeaturesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The unique ID of the feature to rename. */
  oldName: string;
  /** Request body */
  body?: FeatureRename;
}

export const RenameResourcesFeaturesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  oldName: Schema.String.pipe(T.HttpPath("oldName")),
  body: Schema.optional(FeatureRename).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customer}/resources/features/{oldName}/rename", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenameResourcesFeaturesRequest>;

export interface RenameResourcesFeaturesResponse {}
export const RenameResourcesFeaturesResponse: Schema.Schema<RenameResourcesFeaturesResponse> = Schema.Struct({}) as any as Schema.Schema<RenameResourcesFeaturesResponse>;

export type RenameResourcesFeaturesError = DefaultErrors;

/** Renames a feature. */
export const renameResourcesFeatures: API.OperationMethod<RenameResourcesFeaturesRequest, RenameResourcesFeaturesResponse, RenameResourcesFeaturesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: RenameResourcesFeaturesRequest,
  output: RenameResourcesFeaturesResponse,
  errors: [],
}));

export interface UpdateResourcesFeaturesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The unique ID of the feature to update. */
  featureKey: string;
  /** Request body */
  body?: Feature;
}

export const UpdateResourcesFeaturesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  featureKey: Schema.String.pipe(T.HttpPath("featureKey")),
  body: Schema.optional(Feature).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/customer/{customer}/resources/features/{featureKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateResourcesFeaturesRequest>;

export type UpdateResourcesFeaturesResponse = Feature;
export const UpdateResourcesFeaturesResponse = Feature;

export type UpdateResourcesFeaturesError = DefaultErrors;

/** Updates a feature. */
export const updateResourcesFeatures: API.OperationMethod<UpdateResourcesFeaturesRequest, UpdateResourcesFeaturesResponse, UpdateResourcesFeaturesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateResourcesFeaturesRequest,
  output: UpdateResourcesFeaturesResponse,
  errors: [],
}));

export interface PatchResourcesFeaturesRequest {
  /** The unique ID for the customer's Google Workspace account. As an account administrator, you can also use the `my_customer` alias to represent your account's customer ID. */
  customer: string;
  /** The unique ID of the feature to update. */
  featureKey: string;
  /** Request body */
  body?: Feature;
}

export const PatchResourcesFeaturesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  featureKey: Schema.String.pipe(T.HttpPath("featureKey")),
  body: Schema.optional(Feature).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/customer/{customer}/resources/features/{featureKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchResourcesFeaturesRequest>;

export type PatchResourcesFeaturesResponse = Feature;
export const PatchResourcesFeaturesResponse = Feature;

export type PatchResourcesFeaturesError = DefaultErrors;

/** Patches a feature. */
export const patchResourcesFeatures: API.OperationMethod<PatchResourcesFeaturesRequest, PatchResourcesFeaturesResponse, PatchResourcesFeaturesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchResourcesFeaturesRequest,
  output: PatchResourcesFeaturesResponse,
  errors: [],
}));

export interface DeleteRolesRequest {
  /** Immutable ID of the Google Workspace account. */
  customer: string;
  /** Immutable ID of the role. */
  roleId: string;
}

export const DeleteRolesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  roleId: Schema.String.pipe(T.HttpPath("roleId")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customer/{customer}/roles/{roleId}" }),
  svc,
) as unknown as Schema.Schema<DeleteRolesRequest>;

export interface DeleteRolesResponse {}
export const DeleteRolesResponse: Schema.Schema<DeleteRolesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteRolesResponse>;

export type DeleteRolesError = DefaultErrors;

/** Deletes a role. */
export const deleteRoles: API.OperationMethod<DeleteRolesRequest, DeleteRolesResponse, DeleteRolesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRolesRequest,
  output: DeleteRolesResponse,
  errors: [],
}));

export interface GetRolesRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customer: string;
  /** Immutable ID of the role. */
  roleId: string;
}

export const GetRolesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  roleId: Schema.String.pipe(T.HttpPath("roleId")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/roles/{roleId}" }),
  svc,
) as unknown as Schema.Schema<GetRolesRequest>;

export type GetRolesResponse = Role;
export const GetRolesResponse = Role;

export type GetRolesError = DefaultErrors;

/** Retrieves a role. */
export const getRoles: API.OperationMethod<GetRolesRequest, GetRolesResponse, GetRolesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetRolesRequest,
  output: GetRolesResponse,
  errors: [],
}));

export interface InsertRolesRequest {
  /** Immutable ID of the Google Workspace account. */
  customer: string;
  /** Request body */
  body?: Role;
}

export const InsertRolesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(Role).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customer}/roles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertRolesRequest>;

export type InsertRolesResponse = Role;
export const InsertRolesResponse = Role;

export type InsertRolesError = DefaultErrors;

/** Creates a role. */
export const insertRoles: API.OperationMethod<InsertRolesRequest, InsertRolesResponse, InsertRolesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertRolesRequest,
  output: InsertRolesResponse,
  errors: [],
}));

export interface ListRolesRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customer: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Token to specify the next page in the list. */
  pageToken?: string;
}

export const ListRolesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customer}/roles" }),
  svc,
) as unknown as Schema.Schema<ListRolesRequest>;

export type ListRolesResponse = Roles;
export const ListRolesResponse = Roles;

export type ListRolesError = DefaultErrors;

/** Retrieves a paginated list of all the roles in a domain. */
export const listRoles: API.PaginatedOperationMethod<ListRolesRequest, ListRolesResponse, ListRolesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListRolesRequest,
  output: ListRolesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface UpdateRolesRequest {
  /** Immutable ID of the Google Workspace account. */
  customer: string;
  /** Immutable ID of the role. */
  roleId: string;
  /** Request body */
  body?: Role;
}

export const UpdateRolesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  roleId: Schema.String.pipe(T.HttpPath("roleId")),
  body: Schema.optional(Role).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/customer/{customer}/roles/{roleId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateRolesRequest>;

export type UpdateRolesResponse = Role;
export const UpdateRolesResponse = Role;

export type UpdateRolesError = DefaultErrors;

/** Updates a role. */
export const updateRoles: API.OperationMethod<UpdateRolesRequest, UpdateRolesResponse, UpdateRolesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateRolesRequest,
  output: UpdateRolesResponse,
  errors: [],
}));

export interface PatchRolesRequest {
  /** Immutable ID of the Google Workspace account. */
  customer: string;
  /** Immutable ID of the role. */
  roleId: string;
  /** Request body */
  body?: Role;
}

export const PatchRolesRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  roleId: Schema.String.pipe(T.HttpPath("roleId")),
  body: Schema.optional(Role).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/customer/{customer}/roles/{roleId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchRolesRequest>;

export type PatchRolesResponse = Role;
export const PatchRolesResponse = Role;

export type PatchRolesError = DefaultErrors;

/** Patches a role. */
export const patchRoles: API.OperationMethod<PatchRolesRequest, PatchRolesResponse, PatchRolesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchRolesRequest,
  output: PatchRolesResponse,
  errors: [],
}));

export interface DeleteSchemasRequest {
  /** Immutable ID of the Google Workspace account. */
  customerId: string;
  /** Name or immutable ID of the schema. */
  schemaKey: string;
}

export const DeleteSchemasRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  schemaKey: Schema.String.pipe(T.HttpPath("schemaKey")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/customer/{customerId}/schemas/{schemaKey}" }),
  svc,
) as unknown as Schema.Schema<DeleteSchemasRequest>;

export interface DeleteSchemasResponse {}
export const DeleteSchemasResponse: Schema.Schema<DeleteSchemasResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteSchemasResponse>;

export type DeleteSchemasError = DefaultErrors;

/** Deletes a schema. */
export const deleteSchemas: API.OperationMethod<DeleteSchemasRequest, DeleteSchemasResponse, DeleteSchemasError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSchemasRequest,
  output: DeleteSchemasResponse,
  errors: [],
}));

export interface GetSchemasRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customerId: string;
  /** Name or immutable ID of the schema. */
  schemaKey: string;
}

export const GetSchemasRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  schemaKey: Schema.String.pipe(T.HttpPath("schemaKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customerId}/schemas/{schemaKey}" }),
  svc,
) as unknown as Schema.Schema<GetSchemasRequest>;

export type GetSchemasResponse = Admin_Schema;
export const GetSchemasResponse = Admin_Schema;

export type GetSchemasError = DefaultErrors;

/** Retrieves a schema. */
export const getSchemas: API.OperationMethod<GetSchemasRequest, GetSchemasResponse, GetSchemasError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetSchemasRequest,
  output: GetSchemasResponse,
  errors: [],
}));

export interface InsertSchemasRequest {
  /** Immutable ID of the Google Workspace account. */
  customerId: string;
  /** Request body */
  body?: Admin_Schema;
}

export const InsertSchemasRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  body: Schema.optional(Admin_Schema).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/customer/{customerId}/schemas", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertSchemasRequest>;

export type InsertSchemasResponse = Admin_Schema;
export const InsertSchemasResponse = Admin_Schema;

export type InsertSchemasError = DefaultErrors;

/** Creates a schema. */
export const insertSchemas: API.OperationMethod<InsertSchemasRequest, InsertSchemasResponse, InsertSchemasError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertSchemasRequest,
  output: InsertSchemasResponse,
  errors: [],
}));

export interface ListSchemasRequest {
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all groups for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customerId: string;
}

export const ListSchemasRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/customer/{customerId}/schemas" }),
  svc,
) as unknown as Schema.Schema<ListSchemasRequest>;

export type ListSchemasResponse = Schemas;
export const ListSchemasResponse = Schemas;

export type ListSchemasError = DefaultErrors;

/** Retrieves all schemas for a customer. */
export const listSchemas: API.OperationMethod<ListSchemasRequest, ListSchemasResponse, ListSchemasError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListSchemasRequest,
  output: ListSchemasResponse,
  errors: [],
}));

export interface PatchSchemasRequest {
  /** Immutable ID of the Google Workspace account. */
  customerId: string;
  /** Name or immutable ID of the schema. */
  schemaKey: string;
  /** Request body */
  body?: Admin_Schema;
}

export const PatchSchemasRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  schemaKey: Schema.String.pipe(T.HttpPath("schemaKey")),
  body: Schema.optional(Admin_Schema).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/customer/{customerId}/schemas/{schemaKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchSchemasRequest>;

export type PatchSchemasResponse = Admin_Schema;
export const PatchSchemasResponse = Admin_Schema;

export type PatchSchemasError = DefaultErrors;

/** Patches a schema. */
export const patchSchemas: API.OperationMethod<PatchSchemasRequest, PatchSchemasResponse, PatchSchemasError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchSchemasRequest,
  output: PatchSchemasResponse,
  errors: [],
}));

export interface UpdateSchemasRequest {
  /** Immutable ID of the Google Workspace account. */
  customerId: string;
  /** Name or immutable ID of the schema. */
  schemaKey: string;
  /** Request body */
  body?: Admin_Schema;
}

export const UpdateSchemasRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  schemaKey: Schema.String.pipe(T.HttpPath("schemaKey")),
  body: Schema.optional(Admin_Schema).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/customer/{customerId}/schemas/{schemaKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSchemasRequest>;

export type UpdateSchemasResponse = Admin_Schema;
export const UpdateSchemasResponse = Admin_Schema;

export type UpdateSchemasError = DefaultErrors;

/** Updates a schema. */
export const updateSchemas: API.OperationMethod<UpdateSchemasRequest, UpdateSchemasResponse, UpdateSchemasError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSchemasRequest,
  output: UpdateSchemasResponse,
  errors: [],
}));

export interface DeleteTokensRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** The Client ID of the application the token is issued to. */
  clientId: string;
}

export const DeleteTokensRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  clientId: Schema.String.pipe(T.HttpPath("clientId")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/users/{userKey}/tokens/{clientId}" }),
  svc,
) as unknown as Schema.Schema<DeleteTokensRequest>;

export interface DeleteTokensResponse {}
export const DeleteTokensResponse: Schema.Schema<DeleteTokensResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteTokensResponse>;

export type DeleteTokensError = DefaultErrors;

/** Deletes all access tokens issued by a user for an application. */
export const deleteTokens: API.OperationMethod<DeleteTokensRequest, DeleteTokensResponse, DeleteTokensError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTokensRequest,
  output: DeleteTokensResponse,
  errors: [],
}));

export interface GetTokensRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** The Client ID of the application the token is issued to. */
  clientId: string;
}

export const GetTokensRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  clientId: Schema.String.pipe(T.HttpPath("clientId")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/users/{userKey}/tokens/{clientId}" }),
  svc,
) as unknown as Schema.Schema<GetTokensRequest>;

export type GetTokensResponse = Token;
export const GetTokensResponse = Token;

export type GetTokensError = DefaultErrors;

/** Gets information about an access token issued by a user. */
export const getTokens: API.OperationMethod<GetTokensRequest, GetTokensResponse, GetTokensError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetTokensRequest,
  output: GetTokensResponse,
  errors: [],
}));

export interface ListTokensRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
}

export const ListTokensRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/users/{userKey}/tokens" }),
  svc,
) as unknown as Schema.Schema<ListTokensRequest>;

export type ListTokensResponse = Tokens;
export const ListTokensResponse = Tokens;

export type ListTokensError = DefaultErrors;

/** Returns the set of tokens specified user has issued to 3rd party applications. */
export const listTokens: API.OperationMethod<ListTokensRequest, ListTokensResponse, ListTokensError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListTokensRequest,
  output: ListTokensResponse,
  errors: [],
}));

export interface TurnOffTwoStepVerificationRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
}

export const TurnOffTwoStepVerificationRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/users/{userKey}/twoStepVerification/turnOff", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TurnOffTwoStepVerificationRequest>;

export interface TurnOffTwoStepVerificationResponse {}
export const TurnOffTwoStepVerificationResponse: Schema.Schema<TurnOffTwoStepVerificationResponse> = Schema.Struct({}) as any as Schema.Schema<TurnOffTwoStepVerificationResponse>;

export type TurnOffTwoStepVerificationError = DefaultErrors;

/** Turns off 2-Step Verification for user. */
export const turnOffTwoStepVerification: API.OperationMethod<TurnOffTwoStepVerificationRequest, TurnOffTwoStepVerificationResponse, TurnOffTwoStepVerificationError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: TurnOffTwoStepVerificationRequest,
  output: TurnOffTwoStepVerificationResponse,
  errors: [],
}));

export interface DeleteUsersRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
}

export const DeleteUsersRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/users/{userKey}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersRequest>;

export interface DeleteUsersResponse {}
export const DeleteUsersResponse: Schema.Schema<DeleteUsersResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteUsersResponse>;

export type DeleteUsersError = DefaultErrors;

/** Deletes a user. */
export const deleteUsers: API.OperationMethod<DeleteUsersRequest, DeleteUsersResponse, DeleteUsersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersRequest,
  output: DeleteUsersResponse,
  errors: [],
}));

export interface GetUsersRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** A comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when `projection=custom`. */
  customFieldMask?: string;
  /** What subset of fields to fetch for this user. */
  projection?: "basic" | "custom" | "full" | (string & {});
  /** Whether to fetch the administrator-only or domain-wide public view of the user. For more information, see [Retrieve a user as a non-administrator](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users#retrieve_users_non_admin). */
  viewType?: "admin_view" | "domain_public" | (string & {});
}

export const GetUsersRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  customFieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("customFieldMask")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  viewType: Schema.optional(Schema.String).pipe(T.HttpQuery("viewType")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/users/{userKey}" }),
  svc,
) as unknown as Schema.Schema<GetUsersRequest>;

export type GetUsersResponse = User;
export const GetUsersResponse = User;

export type GetUsersError = DefaultErrors;

/** Retrieves a user. */
export const getUsers: API.OperationMethod<GetUsersRequest, GetUsersResponse, GetUsersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetUsersRequest,
  output: GetUsersResponse,
  errors: [],
}));

export interface InsertUsersRequest {
  /** Optional. If set to `true`, the option selected for [handling unmanaged user accounts](https://support.google.com/a/answer/11112794) will apply. Default: `false` */
  resolveConflictAccount?: boolean;
  /** Request body */
  body?: User;
}

export const InsertUsersRequest = Schema.Struct({
  resolveConflictAccount: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("resolveConflictAccount")),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/users", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertUsersRequest>;

export type InsertUsersResponse = User;
export const InsertUsersResponse = User;

export type InsertUsersError = DefaultErrors;

/** Creates a user. Mutate calls immediately following user creation might sometimes fail as the user isn't fully created due to propagation delay in our backends. Check the error details for the "User creation is not complete" message to see if this is the case. Retrying the calls after some time can help in this case. If `resolveConflictAccount` is set to `true`, a `202` response code means that a conflicting unmanaged account exists and was invited to join the organization. A `409` response code means that a conflicting account exists so the user wasn't created based on the [handling unmanaged user accounts](https://support.google.com/a/answer/11112794) option selected. */
export const insertUsers: API.OperationMethod<InsertUsersRequest, InsertUsersResponse, InsertUsersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertUsersRequest,
  output: InsertUsersResponse,
  errors: [],
}));

export interface CreateGuestUsersRequest {
  /** Request body */
  body?: DirectoryUsersCreateGuestRequest;
}

export const CreateGuestUsersRequest = Schema.Struct({
  body: Schema.optional(DirectoryUsersCreateGuestRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/users:createGuest", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateGuestUsersRequest>;

export type CreateGuestUsersResponse = User;
export const CreateGuestUsersResponse = User;

export type CreateGuestUsersError = DefaultErrors;

/** Create a guest user with access to a [subset of Workspace capabilities](https://support.google.com/a/answer/16558545). This feature is currently in Alpha. Please reach out to support if you are interested in trying this feature. */
export const createGuestUsers: API.OperationMethod<CreateGuestUsersRequest, CreateGuestUsersResponse, CreateGuestUsersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateGuestUsersRequest,
  output: CreateGuestUsersResponse,
  errors: [],
}));

export interface ListUsersRequest {
  /** A comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when `projection=custom`. */
  customFieldMask?: string;
  /** The unique ID for the customer's Google Workspace account. In case of a multi-domain account, to fetch all users for a customer, use this field instead of `domain`. You can also use the `my_customer` alias to represent your account's `customerId`. The `customerId` is also returned as part of the [Users](https://developers.google.com/workspace/admin/directory/v1/reference/users) resource. You must provide either the `customer` or the `domain` parameter. */
  customer?: string;
  /** The domain name. Use this field to get users from only one domain. To return all domains for a customer account, use the `customer` query parameter instead. Either the `customer` or the `domain` parameter must be provided. */
  domain?: string;
  /** Event on which subscription is intended (if subscribing) */
  event?: "add" | "delete" | "makeAdmin" | "undelete" | "update" | (string & {});
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Property to use for sorting results. */
  orderBy?: "email" | "familyName" | "givenName" | (string & {});
  /** Token to specify next page in the list. The page token is only valid for three days. */
  pageToken?: string;
  /** What subset of fields to fetch for this user. */
  projection?: "basic" | "custom" | "full" | (string & {});
  /** Query string for searching user fields. For more information on constructing user queries, see [Search for Users](https://developers.google.com/workspace/admin/directory/v1/guides/search-users). */
  query?: string;
  /** If set to `true`, retrieves the list of deleted users. (Default: `false`) */
  showDeleted?: string;
  /** Whether to return results in ascending or descending order, ignoring case. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
  /** Whether to fetch the administrator-only or domain-wide public view of the user. For more information, see [Retrieve a user as a non-administrator](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users#retrieve_users_non_admin). */
  viewType?: "admin_view" | "domain_public" | (string & {});
}

export const ListUsersRequest = Schema.Struct({
  customFieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("customFieldMask")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
  event: Schema.optional(Schema.String).pipe(T.HttpQuery("event")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  showDeleted: Schema.optional(Schema.String).pipe(T.HttpQuery("showDeleted")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
  viewType: Schema.optional(Schema.String).pipe(T.HttpQuery("viewType")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/users" }),
  svc,
) as unknown as Schema.Schema<ListUsersRequest>;

export type ListUsersResponse = Users;
export const ListUsersResponse = Users;

export type ListUsersError = DefaultErrors;

/** Retrieves a paginated list of either deleted users or all users in a domain. */
export const listUsers: API.PaginatedOperationMethod<ListUsersRequest, ListUsersResponse, ListUsersError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface MakeAdminUsersRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** Request body */
  body?: UserMakeAdmin;
}

export const MakeAdminUsersRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  body: Schema.optional(UserMakeAdmin).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/users/{userKey}/makeAdmin", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MakeAdminUsersRequest>;

export interface MakeAdminUsersResponse {}
export const MakeAdminUsersResponse: Schema.Schema<MakeAdminUsersResponse> = Schema.Struct({}) as any as Schema.Schema<MakeAdminUsersResponse>;

export type MakeAdminUsersError = DefaultErrors;

/** Makes a user a super administrator. */
export const makeAdminUsers: API.OperationMethod<MakeAdminUsersRequest, MakeAdminUsersResponse, MakeAdminUsersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MakeAdminUsersRequest,
  output: MakeAdminUsersResponse,
  errors: [],
}));

export interface PatchUsersRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** Request body */
  body?: User;
}

export const PatchUsersRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/users/{userKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchUsersRequest>;

export type PatchUsersResponse = User;
export const PatchUsersResponse = User;

export type PatchUsersError = DefaultErrors;

/** Updates a user using patch semantics. The update method should be used instead, because it also supports patch semantics and has better performance. If you're mapping an external identity to a Google identity, use the [`update`](https://developers.google.com/workspace/admin/directory/v1/reference/users/update) method instead of the `patch` method. This method is unable to clear fields that contain repeated objects (`addresses`, `phones`, etc). Use the update method instead. */
export const patchUsers: API.OperationMethod<PatchUsersRequest, PatchUsersResponse, PatchUsersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchUsersRequest,
  output: PatchUsersResponse,
  errors: [],
}));

export interface UndeleteUsersRequest {
  /** The immutable id of the user */
  userKey: string;
  /** Request body */
  body?: UserUndelete;
}

export const UndeleteUsersRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  body: Schema.optional(UserUndelete).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/users/{userKey}/undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteUsersRequest>;

export interface UndeleteUsersResponse {}
export const UndeleteUsersResponse: Schema.Schema<UndeleteUsersResponse> = Schema.Struct({}) as any as Schema.Schema<UndeleteUsersResponse>;

export type UndeleteUsersError = DefaultErrors;

/** Undeletes a deleted user. */
export const undeleteUsers: API.OperationMethod<UndeleteUsersRequest, UndeleteUsersResponse, UndeleteUsersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteUsersRequest,
  output: UndeleteUsersResponse,
  errors: [],
}));

export interface UpdateUsersRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** Request body */
  body?: User;
}

export const UpdateUsersRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  body: Schema.optional(User).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/users/{userKey}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateUsersRequest>;

export type UpdateUsersResponse = User;
export const UpdateUsersResponse = User;

export type UpdateUsersError = DefaultErrors;

/** Updates a user. This method supports patch semantics, meaning that you only need to include the fields you wish to update. Fields that are not present in the request will be preserved, and fields set to `null` will be cleared. For repeating fields that contain arrays, individual items in the array can't be patched piecemeal; they must be supplied in the request body with the desired values for all items. See the [user accounts guide](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users#update_user) for more information. */
export const updateUsers: API.OperationMethod<UpdateUsersRequest, UpdateUsersResponse, UpdateUsersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateUsersRequest,
  output: UpdateUsersResponse,
  errors: [],
}));

export interface WatchUsersRequest {
  /** Name of the domain. Fill this field to get users from only this domain. To return all users in a multi-domain fill customer field instead." */
  domain?: string;
  /** Immutable ID of the Google Workspace account. In case of multi-domain, to fetch all users for a customer, fill this field instead of domain. */
  customer?: string;
  /** Events to watch for. */
  event?: "add" | "delete" | "makeAdmin" | "undelete" | "update" | (string & {});
  /** Comma-separated list of schema names. All fields from these schemas are fetched. This should only be set when projection=custom. */
  customFieldMask?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Column to use for sorting results */
  orderBy?: "email" | "familyName" | "givenName" | (string & {});
  /** Token to specify next page in the list */
  pageToken?: string;
  /** What subset of fields to fetch for this user. */
  projection?: "basic" | "custom" | "full" | (string & {});
  /** Query string search. Contains one or more search clauses, each with a field, operator, and value. For complete documentation, go to [Search for users](https://developers.google.com/workspace/admin/directory/v1/guides/search-users). */
  query?: string;
  /** If set to true, retrieves the list of deleted users. (Default: false) */
  showDeleted?: string;
  /** Whether to return results in ascending or descending order. */
  sortOrder?: "ASCENDING" | "DESCENDING" | (string & {});
  /** Whether to fetch the administrator-only or domain-wide public view of the user. For more information, see [Retrieve a user as a non-administrator](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users#retrieve_users_non_admin). */
  viewType?: "admin_view" | "domain_public" | (string & {});
  /** Request body */
  body?: Channel;
}

export const WatchUsersRequest = Schema.Struct({
  domain: Schema.optional(Schema.String).pipe(T.HttpQuery("domain")),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  event: Schema.optional(Schema.String).pipe(T.HttpQuery("event")),
  customFieldMask: Schema.optional(Schema.String).pipe(T.HttpQuery("customFieldMask")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  showDeleted: Schema.optional(Schema.String).pipe(T.HttpQuery("showDeleted")),
  sortOrder: Schema.optional(Schema.String).pipe(T.HttpQuery("sortOrder")),
  viewType: Schema.optional(Schema.String).pipe(T.HttpQuery("viewType")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/users/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchUsersRequest>;

export type WatchUsersResponse = Channel;
export const WatchUsersResponse = Channel;

export type WatchUsersError = DefaultErrors;

/** Watches for changes in users list. */
export const watchUsers: API.OperationMethod<WatchUsersRequest, WatchUsersResponse, WatchUsersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: WatchUsersRequest,
  output: WatchUsersResponse,
  errors: [],
}));

export interface SignOutUsersRequest {
  /** Identifies the target user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
}

export const SignOutUsersRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/users/{userKey}/signOut", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SignOutUsersRequest>;

export interface SignOutUsersResponse {}
export const SignOutUsersResponse: Schema.Schema<SignOutUsersResponse> = Schema.Struct({}) as any as Schema.Schema<SignOutUsersResponse>;

export type SignOutUsersError = DefaultErrors;

/** Signs a user out of all web and device sessions and reset their sign-in cookies. User will have to sign in by authenticating again. */
export const signOutUsers: API.OperationMethod<SignOutUsersRequest, SignOutUsersResponse, SignOutUsersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SignOutUsersRequest,
  output: SignOutUsersResponse,
  errors: [],
}));

export interface DeleteUsersAliasesRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** The alias to be removed. */
  alias: string;
}

export const DeleteUsersAliasesRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  alias: Schema.String.pipe(T.HttpPath("alias")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/users/{userKey}/aliases/{alias}" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersAliasesRequest>;

export interface DeleteUsersAliasesResponse {}
export const DeleteUsersAliasesResponse: Schema.Schema<DeleteUsersAliasesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteUsersAliasesResponse>;

export type DeleteUsersAliasesError = DefaultErrors;

/** Removes an alias. */
export const deleteUsersAliases: API.OperationMethod<DeleteUsersAliasesRequest, DeleteUsersAliasesResponse, DeleteUsersAliasesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersAliasesRequest,
  output: DeleteUsersAliasesResponse,
  errors: [],
}));

export interface InsertUsersAliasesRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** Request body */
  body?: Alias;
}

export const InsertUsersAliasesRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  body: Schema.optional(Alias).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/users/{userKey}/aliases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertUsersAliasesRequest>;

export type InsertUsersAliasesResponse = Alias;
export const InsertUsersAliasesResponse = Alias;

export type InsertUsersAliasesError = DefaultErrors;

/** Adds an alias. */
export const insertUsersAliases: API.OperationMethod<InsertUsersAliasesRequest, InsertUsersAliasesResponse, InsertUsersAliasesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InsertUsersAliasesRequest,
  output: InsertUsersAliasesResponse,
  errors: [],
}));

export interface ListUsersAliasesRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** Events to watch for. */
  event?: "add" | "delete" | (string & {});
}

export const ListUsersAliasesRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  event: Schema.optional(Schema.String).pipe(T.HttpQuery("event")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/users/{userKey}/aliases" }),
  svc,
) as unknown as Schema.Schema<ListUsersAliasesRequest>;

export type ListUsersAliasesResponse = Aliases;
export const ListUsersAliasesResponse = Aliases;

export type ListUsersAliasesError = DefaultErrors;

/** Lists all aliases for a user. */
export const listUsersAliases: API.OperationMethod<ListUsersAliasesRequest, ListUsersAliasesResponse, ListUsersAliasesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListUsersAliasesRequest,
  output: ListUsersAliasesResponse,
  errors: [],
}));

export interface WatchUsersAliasesRequest {
  /** Email or immutable ID of the user */
  userKey: string;
  /** Events to watch for. */
  event?: "add" | "delete" | (string & {});
  /** Request body */
  body?: Channel;
}

export const WatchUsersAliasesRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  event: Schema.optional(Schema.String).pipe(T.HttpQuery("event")),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/users/{userKey}/aliases/watch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WatchUsersAliasesRequest>;

export type WatchUsersAliasesResponse = Channel;
export const WatchUsersAliasesResponse = Channel;

export type WatchUsersAliasesError = DefaultErrors;

/** Watches for changes in users list. */
export const watchUsersAliases: API.OperationMethod<WatchUsersAliasesRequest, WatchUsersAliasesResponse, WatchUsersAliasesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: WatchUsersAliasesRequest,
  output: WatchUsersAliasesResponse,
  errors: [],
}));

export interface DeleteUsersPhotosRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
}

export const DeleteUsersPhotosRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
}).pipe(
  T.Http({ method: "DELETE", path: "admin/directory/v1/users/{userKey}/photos/thumbnail" }),
  svc,
) as unknown as Schema.Schema<DeleteUsersPhotosRequest>;

export interface DeleteUsersPhotosResponse {}
export const DeleteUsersPhotosResponse: Schema.Schema<DeleteUsersPhotosResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteUsersPhotosResponse>;

export type DeleteUsersPhotosError = DefaultErrors;

/** Removes the user's photo. */
export const deleteUsersPhotos: API.OperationMethod<DeleteUsersPhotosRequest, DeleteUsersPhotosResponse, DeleteUsersPhotosError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteUsersPhotosRequest,
  output: DeleteUsersPhotosResponse,
  errors: [],
}));

export interface GetUsersPhotosRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
}

export const GetUsersPhotosRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/users/{userKey}/photos/thumbnail" }),
  svc,
) as unknown as Schema.Schema<GetUsersPhotosRequest>;

export type GetUsersPhotosResponse = UserPhoto;
export const GetUsersPhotosResponse = UserPhoto;

export type GetUsersPhotosError = DefaultErrors;

/** Retrieves the user's photo. */
export const getUsersPhotos: API.OperationMethod<GetUsersPhotosRequest, GetUsersPhotosResponse, GetUsersPhotosError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetUsersPhotosRequest,
  output: GetUsersPhotosResponse,
  errors: [],
}));

export interface UpdateUsersPhotosRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** Request body */
  body?: UserPhoto;
}

export const UpdateUsersPhotosRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  body: Schema.optional(UserPhoto).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "admin/directory/v1/users/{userKey}/photos/thumbnail", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateUsersPhotosRequest>;

export type UpdateUsersPhotosResponse = UserPhoto;
export const UpdateUsersPhotosResponse = UserPhoto;

export type UpdateUsersPhotosError = DefaultErrors;

/** Adds a photo for the user. */
export const updateUsersPhotos: API.OperationMethod<UpdateUsersPhotosRequest, UpdateUsersPhotosResponse, UpdateUsersPhotosError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateUsersPhotosRequest,
  output: UpdateUsersPhotosResponse,
  errors: [],
}));

export interface PatchUsersPhotosRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
  /** Request body */
  body?: UserPhoto;
}

export const PatchUsersPhotosRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
  body: Schema.optional(UserPhoto).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "admin/directory/v1/users/{userKey}/photos/thumbnail", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchUsersPhotosRequest>;

export type PatchUsersPhotosResponse = UserPhoto;
export const PatchUsersPhotosResponse = UserPhoto;

export type PatchUsersPhotosError = DefaultErrors;

/** Adds a photo for the user. This method supports [patch semantics](https://developers.google.com/workspace/admin/directory/v1/guides/performance#patch). */
export const patchUsersPhotos: API.OperationMethod<PatchUsersPhotosRequest, PatchUsersPhotosResponse, PatchUsersPhotosError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchUsersPhotosRequest,
  output: PatchUsersPhotosResponse,
  errors: [],
}));

export interface GenerateVerificationCodesRequest {
  /** Email or immutable ID of the user */
  userKey: string;
}

export const GenerateVerificationCodesRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/users/{userKey}/verificationCodes/generate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateVerificationCodesRequest>;

export interface GenerateVerificationCodesResponse {}
export const GenerateVerificationCodesResponse: Schema.Schema<GenerateVerificationCodesResponse> = Schema.Struct({}) as any as Schema.Schema<GenerateVerificationCodesResponse>;

export type GenerateVerificationCodesError = DefaultErrors;

/** Generates new backup verification codes for the user. */
export const generateVerificationCodes: API.OperationMethod<GenerateVerificationCodesRequest, GenerateVerificationCodesResponse, GenerateVerificationCodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateVerificationCodesRequest,
  output: GenerateVerificationCodesResponse,
  errors: [],
}));

export interface InvalidateVerificationCodesRequest {
  /** Email or immutable ID of the user */
  userKey: string;
}

export const InvalidateVerificationCodesRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
}).pipe(
  T.Http({ method: "POST", path: "admin/directory/v1/users/{userKey}/verificationCodes/invalidate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InvalidateVerificationCodesRequest>;

export interface InvalidateVerificationCodesResponse {}
export const InvalidateVerificationCodesResponse: Schema.Schema<InvalidateVerificationCodesResponse> = Schema.Struct({}) as any as Schema.Schema<InvalidateVerificationCodesResponse>;

export type InvalidateVerificationCodesError = DefaultErrors;

/** Invalidates the current backup verification codes for the user. */
export const invalidateVerificationCodes: API.OperationMethod<InvalidateVerificationCodesRequest, InvalidateVerificationCodesResponse, InvalidateVerificationCodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: InvalidateVerificationCodesRequest,
  output: InvalidateVerificationCodesResponse,
  errors: [],
}));

export interface ListVerificationCodesRequest {
  /** Identifies the user in the API request. The value can be the user's primary email address, alias email address, or unique user ID. */
  userKey: string;
}

export const ListVerificationCodesRequest = Schema.Struct({
  userKey: Schema.String.pipe(T.HttpPath("userKey")),
}).pipe(
  T.Http({ method: "GET", path: "admin/directory/v1/users/{userKey}/verificationCodes" }),
  svc,
) as unknown as Schema.Schema<ListVerificationCodesRequest>;

export type ListVerificationCodesResponse = VerificationCodes;
export const ListVerificationCodesResponse = VerificationCodes;

export type ListVerificationCodesError = DefaultErrors;

/** Returns the current set of valid backup verification codes for the specified user. */
export const listVerificationCodes: API.OperationMethod<ListVerificationCodesRequest, ListVerificationCodesResponse, ListVerificationCodesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ListVerificationCodesRequest,
  output: ListVerificationCodesResponse,
  errors: [],
}));

