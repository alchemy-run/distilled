// ==========================================================================
// Drive Labels API (drivelabels v2beta)
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
  name: "drivelabels",
  version: "v2beta",
  rootUrl: "https://drivelabels.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleAppsDriveLabelsV2betaFieldIntegerOptions {
  /** Output only. The minimum valid value for the integer field. */
  minValue?: string;
  /** Output only. The maximum valid value for the integer field. */
  maxValue?: string;
}

export const GoogleAppsDriveLabelsV2betaFieldIntegerOptions: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldIntegerOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minValue: Schema.optional(Schema.String),
      maxValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldIntegerOptions",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldIntegerOptions>;

export interface GoogleTypeDate {
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      month: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
      year: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleTypeDate",
  }) as any as Schema.Schema<GoogleTypeDate>;

export interface GoogleAppsDriveLabelsV2betaUserInfo {
  /** The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`. */
  person?: string;
}

export const GoogleAppsDriveLabelsV2betaUserInfo: Schema.Schema<GoogleAppsDriveLabelsV2betaUserInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      person: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaUserInfo",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaUserInfo>;

export interface GoogleAppsDriveLabelsV2betaWriteControl {
  /** The revision ID of the label that the write request will be applied to. If this isn't the latest revision of the label, the request will not be processed and will return a 400 Bad Request error. */
  requiredRevisionId?: string;
}

export const GoogleAppsDriveLabelsV2betaWriteControl: Schema.Schema<GoogleAppsDriveLabelsV2betaWriteControl> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requiredRevisionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaWriteControl",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaWriteControl>;

export interface GoogleAppsDriveLabelsV2betaEnableLabelRequest {
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** Provides control over how write requests are executed. Defaults to unset, which means the last write wins. */
  writeControl?: GoogleAppsDriveLabelsV2betaWriteControl;
  /** The BCP-47 language code to use for evaluating localized field labels. When not specified, values in the default configured language will be used. */
  languageCode?: string;
}

export const GoogleAppsDriveLabelsV2betaEnableLabelRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaEnableLabelRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      useAdminAccess: Schema.optional(Schema.Boolean),
      writeControl: Schema.optional(GoogleAppsDriveLabelsV2betaWriteControl),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaEnableLabelRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaEnableLabelRequest>;

export interface GoogleAppsDriveLabelsV2betaFieldAppliedCapabilities {
  /** Whether the user can read related applied metadata on items. */
  canRead?: boolean;
  /** Whether the user can search for Drive items referencing this field. */
  canSearch?: boolean;
  /** Whether the user can set this field on Drive items. */
  canWrite?: boolean;
}

export const GoogleAppsDriveLabelsV2betaFieldAppliedCapabilities: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldAppliedCapabilities> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      canRead: Schema.optional(Schema.Boolean),
      canSearch: Schema.optional(Schema.Boolean),
      canWrite: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldAppliedCapabilities",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldAppliedCapabilities>;

export interface GoogleAppsDriveLabelsV2betaLabelAppliedLabelPolicy {
  /** Indicates how the applied label and field values should be copied when a Drive item is copied. */
  copyMode?:
    | "COPY_MODE_UNSPECIFIED"
    | "DO_NOT_COPY"
    | "ALWAYS_COPY"
    | "COPY_APPLIABLE"
    | (string & {});
}

export const GoogleAppsDriveLabelsV2betaLabelAppliedLabelPolicy: Schema.Schema<GoogleAppsDriveLabelsV2betaLabelAppliedLabelPolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      copyMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabelAppliedLabelPolicy",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabelAppliedLabelPolicy>;

export interface GoogleAppsDriveLabelsV2betaLabelProperties {
  /** Required. Title of the label. */
  title?: string;
  /** The description of the label. */
  description?: string;
}

export const GoogleAppsDriveLabelsV2betaLabelProperties: Schema.Schema<GoogleAppsDriveLabelsV2betaLabelProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabelProperties",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabelProperties>;

export interface GoogleAppsDriveLabelsV2betaLabelAppliedCapabilities {
  /** Whether the user can read applied metadata related to this label. */
  canRead?: boolean;
  /** Whether the user can remove this label from items. */
  canRemove?: boolean;
  /** Whether the user can apply this label to items. */
  canApply?: boolean;
}

export const GoogleAppsDriveLabelsV2betaLabelAppliedCapabilities: Schema.Schema<GoogleAppsDriveLabelsV2betaLabelAppliedCapabilities> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      canRead: Schema.optional(Schema.Boolean),
      canRemove: Schema.optional(Schema.Boolean),
      canApply: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabelAppliedCapabilities",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabelAppliedCapabilities>;

export interface GoogleAppsDriveLabelsV2betaLabelDisplayHints {
  /** The order to display labels in a list. */
  priority?: string;
  /** This label should be shown in the apply menu when applying values to a Drive item. */
  shownInApply?: boolean;
  /** Whether the label should be shown in the UI as disabled. */
  disabled?: boolean;
  /** This label should be hidden in the search menu when searching for Drive items. */
  hiddenInSearch?: boolean;
}

export const GoogleAppsDriveLabelsV2betaLabelDisplayHints: Schema.Schema<GoogleAppsDriveLabelsV2betaLabelDisplayHints> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      priority: Schema.optional(Schema.String),
      shownInApply: Schema.optional(Schema.Boolean),
      disabled: Schema.optional(Schema.Boolean),
      hiddenInSearch: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabelDisplayHints",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabelDisplayHints>;

export interface GoogleAppsDriveLabelsV2betaLabelSchemaCapabilities {
  /** Whether the user can delete this label. The user must have permission and the label must be disabled. */
  canDelete?: boolean;
  /** Whether the user can disable this label. The user must have permission and this label must not already be disabled. */
  canDisable?: boolean;
  /** Whether the user can enable this label. The user must have permission and this label must be disabled. */
  canEnable?: boolean;
  /** Whether the user can change this label. */
  canUpdate?: boolean;
}

export const GoogleAppsDriveLabelsV2betaLabelSchemaCapabilities: Schema.Schema<GoogleAppsDriveLabelsV2betaLabelSchemaCapabilities> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      canDelete: Schema.optional(Schema.Boolean),
      canDisable: Schema.optional(Schema.Boolean),
      canEnable: Schema.optional(Schema.Boolean),
      canUpdate: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabelSchemaCapabilities",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabelSchemaCapabilities>;

export interface GoogleAppsDriveLabelsV2betaLockStatus {
  /** Output only. Indicates whether this label component is the (direct) target of a label lock. A label component can be implicitly locked even if it's not the direct target of a label lock, in which case this field is set to false. */
  locked?: boolean;
}

export const GoogleAppsDriveLabelsV2betaLockStatus: Schema.Schema<GoogleAppsDriveLabelsV2betaLockStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locked: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLockStatus",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLockStatus>;

export interface GoogleAppsDriveLabelsV2betaLabelEnabledAppSettingsEnabledApp {
  /** Optional. The name of the app. */
  app?: "APP_UNSPECIFIED" | "DRIVE" | "GMAIL" | (string & {});
}

export const GoogleAppsDriveLabelsV2betaLabelEnabledAppSettingsEnabledApp: Schema.Schema<GoogleAppsDriveLabelsV2betaLabelEnabledAppSettingsEnabledApp> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      app: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabelEnabledAppSettingsEnabledApp",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabelEnabledAppSettingsEnabledApp>;

export interface GoogleAppsDriveLabelsV2betaLabelEnabledAppSettings {
  /** Optional. The list of apps where the label can be used. */
  enabledApps?: Array<GoogleAppsDriveLabelsV2betaLabelEnabledAppSettingsEnabledApp>;
}

export const GoogleAppsDriveLabelsV2betaLabelEnabledAppSettings: Schema.Schema<GoogleAppsDriveLabelsV2betaLabelEnabledAppSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enabledApps: Schema.optional(
        Schema.Array(
          GoogleAppsDriveLabelsV2betaLabelEnabledAppSettingsEnabledApp,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabelEnabledAppSettings",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabelEnabledAppSettings>;

export interface GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy {
  /** Whether to hide this disabled object in the search menu for Drive items. * When `false`, the object is generally shown in the UI as disabled but it appears in the search results when searching for Drive items. * When `true`, the object is generally hidden in the UI when searching for Drive items. */
  hideInSearch?: boolean;
  /** Whether to show this disabled object in the apply menu on Drive items. * When `true`, the object is generally shown in the UI as disabled and is unselectable. * When `false`, the object is generally hidden in the UI. */
  showInApply?: boolean;
}

export const GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy: Schema.Schema<GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hideInSearch: Schema.optional(Schema.Boolean),
      showInApply: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy>;

export interface GoogleAppsDriveLabelsV2betaLifecycle {
  /** Output only. Whether the object associated with this lifecycle has unpublished changes. */
  hasUnpublishedChanges?: boolean;
  /** Output only. The state of the object associated with this lifecycle. */
  state?:
    | "STATE_UNSPECIFIED"
    | "UNPUBLISHED_DRAFT"
    | "PUBLISHED"
    | "DISABLED"
    | "DELETED"
    | (string & {});
  /** The policy that governs how to show a disabled label, field, or selection choice. */
  disabledPolicy?: GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy;
}

export const GoogleAppsDriveLabelsV2betaLifecycle: Schema.Schema<GoogleAppsDriveLabelsV2betaLifecycle> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hasUnpublishedChanges: Schema.optional(Schema.Boolean),
      state: Schema.optional(Schema.String),
      disabledPolicy: Schema.optional(
        GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy,
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLifecycle",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLifecycle>;

export interface GoogleAppsDriveLabelsV2betaFieldProperties {
  /** Input only. Insert or move this field before the indicated field. If empty, the field is placed at the end of the list. */
  insertBeforeField?: string;
  /** Required. The display text to show in the UI identifying this field. */
  displayName?: string;
  /** Whether the field should be marked as required. */
  required?: boolean;
}

export const GoogleAppsDriveLabelsV2betaFieldProperties: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      insertBeforeField: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      required: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldProperties",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldProperties>;

export interface GoogleAppsDriveLabelsV2betaFieldDisplayHints {
  /** This field should be shown in the apply menu when applying values to a Drive item. */
  shownInApply?: boolean;
  /** Whether the field should be shown in the UI as disabled. */
  disabled?: boolean;
  /** This field should be hidden in the search menu when searching for Drive items. */
  hiddenInSearch?: boolean;
  /** Whether the field should be shown as required in the UI. */
  required?: boolean;
}

export const GoogleAppsDriveLabelsV2betaFieldDisplayHints: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldDisplayHints> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      shownInApply: Schema.optional(Schema.Boolean),
      disabled: Schema.optional(Schema.Boolean),
      hiddenInSearch: Schema.optional(Schema.Boolean),
      required: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldDisplayHints",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldDisplayHints>;

export interface GoogleAppsDriveLabelsV2betaFieldSchemaCapabilities {
  /** Whether the user can change this field. */
  canUpdate?: boolean;
  /** Whether the user can delete this field. The user must have permission and the field must be deprecated. */
  canDelete?: boolean;
  /** Whether the user can disable this field. The user must have permission and this field must not already be disabled. */
  canDisable?: boolean;
  /** Whether the user can enable this field. The user must have permission and this field must be disabled. */
  canEnable?: boolean;
}

export const GoogleAppsDriveLabelsV2betaFieldSchemaCapabilities: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSchemaCapabilities> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      canUpdate: Schema.optional(Schema.Boolean),
      canDelete: Schema.optional(Schema.Boolean),
      canDisable: Schema.optional(Schema.Boolean),
      canEnable: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldSchemaCapabilities",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSchemaCapabilities>;

export interface GoogleAppsDriveLabelsV2betaFieldDateOptions {
  /** Output only. Maximum valid value (year, month, day). */
  maxValue?: GoogleTypeDate;
  /** Localized date formatting option. Field values are rendered in this format according to their locale. */
  dateFormatType?:
    | "DATE_FORMAT_UNSPECIFIED"
    | "LONG_DATE"
    | "SHORT_DATE"
    | (string & {});
  /** Output only. ICU date format. */
  dateFormat?: string;
  /** Output only. Minimum valid value (year, month, day). */
  minValue?: GoogleTypeDate;
}

export const GoogleAppsDriveLabelsV2betaFieldDateOptions: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldDateOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxValue: Schema.optional(GoogleTypeDate),
      dateFormatType: Schema.optional(Schema.String),
      dateFormat: Schema.optional(Schema.String),
      minValue: Schema.optional(GoogleTypeDate),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldDateOptions",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldDateOptions>;

export interface GoogleAppsDriveLabelsV2betaFieldTextOptions {
  /** Output only. The minimum valid length of values for the text field. */
  minLength?: number;
  /** Output only. The maximum valid length of values for the text field. */
  maxLength?: number;
}

export const GoogleAppsDriveLabelsV2betaFieldTextOptions: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldTextOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minLength: Schema.optional(Schema.Number),
      maxLength: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldTextOptions",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldTextOptions>;

export interface GoogleAppsDriveLabelsV2betaFieldListOptions {
  /** Maximum number of entries permitted. */
  maxEntries?: number;
}

export const GoogleAppsDriveLabelsV2betaFieldListOptions: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldListOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxEntries: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldListOptions",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldListOptions>;

export interface GoogleAppsDriveLabelsV2betaFieldUserOptions {
  /** When specified, indicates that this field supports a list of values. Once the field is published, this cannot be changed. */
  listOptions?: GoogleAppsDriveLabelsV2betaFieldListOptions;
}

export const GoogleAppsDriveLabelsV2betaFieldUserOptions: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldUserOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      listOptions: Schema.optional(GoogleAppsDriveLabelsV2betaFieldListOptions),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldUserOptions",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldUserOptions>;

export interface GoogleTypeColor {
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0). */
  alpha?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
}

export const GoogleTypeColor: Schema.Schema<GoogleTypeColor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      green: Schema.optional(Schema.Number),
      red: Schema.optional(Schema.Number),
      alpha: Schema.optional(Schema.Number),
      blue: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleTypeColor",
  }) as any as Schema.Schema<GoogleTypeColor>;

export interface GoogleAppsDriveLabelsV2betaBadgeConfig {
  /** Override the default global priority of this badge. When set to 0, the default priority heuristic is used. */
  priorityOverride?: string;
  /** The color of the badge. When not specified, no badge is rendered. The background, foreground, and solo (light and dark mode) colors set here are changed in the Drive UI into the closest recommended supported color. */
  color?: GoogleTypeColor;
}

export const GoogleAppsDriveLabelsV2betaBadgeConfig: Schema.Schema<GoogleAppsDriveLabelsV2betaBadgeConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      priorityOverride: Schema.optional(Schema.String),
      color: Schema.optional(GoogleTypeColor),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaBadgeConfig",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaBadgeConfig>;

export interface GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceProperties {
  /** The badge configuration for this choice. When set, the label that owns this choice is considered a "badged label". */
  badgeConfig?: GoogleAppsDriveLabelsV2betaBadgeConfig;
  /** Input only. Insert or move this choice before the indicated choice. If empty, the choice is placed at the end of the list. */
  insertBeforeChoice?: string;
  /** The description of this label. */
  description?: string;
  /** Required. The display text to show in the UI identifying this field. */
  displayName?: string;
}

export const GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceProperties: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      badgeConfig: Schema.optional(GoogleAppsDriveLabelsV2betaBadgeConfig),
      insertBeforeChoice: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceProperties",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceProperties>;

export interface GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceAppliedCapabilities {
  /** Whether the user can read related applied metadata on items. */
  canRead?: boolean;
  /** Whether the user can select this choice on an item. */
  canSelect?: boolean;
  /** Whether the user can use this choice in search queries. */
  canSearch?: boolean;
}

export const GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceAppliedCapabilities: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceAppliedCapabilities> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      canRead: Schema.optional(Schema.Boolean),
      canSelect: Schema.optional(Schema.Boolean),
      canSearch: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceAppliedCapabilities",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceAppliedCapabilities>;

export interface GoogleAppsDriveLabelsV2betaBadgeColors {
  /** Output only. Badge background that pairs with the foreground. */
  backgroundColor?: GoogleTypeColor;
  /** Output only. Badge foreground that pairs with the background. */
  foregroundColor?: GoogleTypeColor;
  /** Output only. Color that can be used for text without a background. */
  soloColor?: GoogleTypeColor;
}

export const GoogleAppsDriveLabelsV2betaBadgeColors: Schema.Schema<GoogleAppsDriveLabelsV2betaBadgeColors> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      backgroundColor: Schema.optional(GoogleTypeColor),
      foregroundColor: Schema.optional(GoogleTypeColor),
      soloColor: Schema.optional(GoogleTypeColor),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaBadgeColors",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaBadgeColors>;

export interface GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceDisplayHints {
  /** The colors to use for the badge. Changed to Google Material colors based on the chosen `properties.badge_config.color`. */
  badgeColors?: GoogleAppsDriveLabelsV2betaBadgeColors;
  /** This option should be shown in the apply menu when applying values to a Drive item. */
  shownInApply?: boolean;
  /** The priority of this badge. Used to compare and sort between multiple badges. A lower number means the badge should be shown first. When a badging configuration is not present, this will be 0. Otherwise, this will be set to `BadgeConfig.priority_override` or the default heuristic which prefers creation date of the label, and field and option priority. */
  badgePriority?: string;
  /** The dark-mode color to use for the badge. Changed to Google Material colors based on the chosen `properties.badge_config.color`. */
  darkBadgeColors?: GoogleAppsDriveLabelsV2betaBadgeColors;
  /** Whether the option should be shown in the UI as disabled. */
  disabled?: boolean;
  /** This option should be hidden in the search menu when searching for Drive items. */
  hiddenInSearch?: boolean;
}

export const GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceDisplayHints: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceDisplayHints> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      badgeColors: Schema.optional(GoogleAppsDriveLabelsV2betaBadgeColors),
      shownInApply: Schema.optional(Schema.Boolean),
      badgePriority: Schema.optional(Schema.String),
      darkBadgeColors: Schema.optional(GoogleAppsDriveLabelsV2betaBadgeColors),
      disabled: Schema.optional(Schema.Boolean),
      hiddenInSearch: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceDisplayHints",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceDisplayHints>;

export interface GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceSchemaCapabilities {
  /** Whether the user can update this choice. */
  canUpdate?: boolean;
  /** Whether the user can delete this choice. */
  canDelete?: boolean;
  /** Whether the user can disable this choice. */
  canDisable?: boolean;
  /** Whether the user can enable this choice. */
  canEnable?: boolean;
}

export const GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceSchemaCapabilities: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceSchemaCapabilities> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      canUpdate: Schema.optional(Schema.Boolean),
      canDelete: Schema.optional(Schema.Boolean),
      canDisable: Schema.optional(Schema.Boolean),
      canEnable: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceSchemaCapabilities",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceSchemaCapabilities>;

export interface GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoice {
  /** Output only. The user who updated this choice last. */
  updater?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** Output only. The time this choice was updated last. */
  updateTime?: string;
  /** Output only. The user who created this choice. */
  creator?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** Output only. The `LockStatus` of this choice. */
  lockStatus?: GoogleAppsDriveLabelsV2betaLockStatus;
  /** The unique value of the choice. This ID is autogenerated. Matches the regex: `([a-zA-Z0-9_])+`. */
  id?: string;
  /** Output only. Lifecycle of the choice. */
  lifecycle?: GoogleAppsDriveLabelsV2betaLifecycle;
  /** Output only. The user who disabled this choice. This value has no meaning when the option is not disabled. */
  disabler?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** Basic properties of the choice. */
  properties?: GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceProperties;
  /** Output only. The capabilities related to this choice on applied metadata. */
  appliedCapabilities?: GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceAppliedCapabilities;
  /** Output only. UI display hints for rendering a choice. */
  displayHints?: GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceDisplayHints;
  /** Output only. The time this choice was published. This value has no meaning when the choice is not published. */
  publishTime?: string;
  /** Output only. The time this choice was disabled. This value has no meaning when the choice is not disabled. */
  disableTime?: string;
  /** Output only. The capabilities related to this option when editing the option. */
  schemaCapabilities?: GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceSchemaCapabilities;
  /** Output only. The time this choice was created. */
  createTime?: string;
  /** Output only. The user who published this choice. This value has no meaning when the choice is not published. */
  publisher?: GoogleAppsDriveLabelsV2betaUserInfo;
}

export const GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoice: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoice> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updater: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      updateTime: Schema.optional(Schema.String),
      creator: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      lockStatus: Schema.optional(GoogleAppsDriveLabelsV2betaLockStatus),
      id: Schema.optional(Schema.String),
      lifecycle: Schema.optional(GoogleAppsDriveLabelsV2betaLifecycle),
      disabler: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      properties: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceProperties,
      ),
      appliedCapabilities: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceAppliedCapabilities,
      ),
      displayHints: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceDisplayHints,
      ),
      publishTime: Schema.optional(Schema.String),
      disableTime: Schema.optional(Schema.String),
      schemaCapabilities: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceSchemaCapabilities,
      ),
      createTime: Schema.optional(Schema.String),
      publisher: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoice",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoice>;

export interface GoogleAppsDriveLabelsV2betaFieldSelectionOptions {
  /** When specified, indicates this field supports a list of values. Once the field is published, this cannot be changed. */
  listOptions?: GoogleAppsDriveLabelsV2betaFieldListOptions;
  /** The options available for this selection field. The list order is consistent, and modified with `insert_before_choice`. */
  choices?: Array<GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoice>;
}

export const GoogleAppsDriveLabelsV2betaFieldSelectionOptions: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      listOptions: Schema.optional(GoogleAppsDriveLabelsV2betaFieldListOptions),
      choices: Schema.optional(
        Schema.Array(GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoice),
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldSelectionOptions",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldSelectionOptions>;

export interface GoogleAppsDriveLabelsV2betaField {
  /** The basic properties of the field. */
  properties?: GoogleAppsDriveLabelsV2betaFieldProperties;
  /** Output only. The capabilities this user has on this field and its value when the label is applied on Drive items. */
  appliedCapabilities?: GoogleAppsDriveLabelsV2betaFieldAppliedCapabilities;
  /** Integer field options. */
  integerOptions?: GoogleAppsDriveLabelsV2betaFieldIntegerOptions;
  /** Output only. UI display hints for rendering a field. */
  displayHints?: GoogleAppsDriveLabelsV2betaFieldDisplayHints;
  /** Output only. The capabilities this user has when editing this field. */
  schemaCapabilities?: GoogleAppsDriveLabelsV2betaFieldSchemaCapabilities;
  /** Output only. The time this field was disabled. This value has no meaning when the field is not disabled. */
  disableTime?: string;
  /** Output only. The key to use when constructing Drive search queries to find files based on values defined for this field on files. For example, "`{query_key}` > 2001-01-01". */
  queryKey?: string;
  /** Output only. The time this field was created. */
  createTime?: string;
  /** Date field options. */
  dateOptions?: GoogleAppsDriveLabelsV2betaFieldDateOptions;
  /** Output only. The user who published this field. This value has no meaning when the field is not published. */
  publisher?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** Output only. The user who modified this field. */
  updater?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** Output only. The user who created this field. */
  creator?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** Output only. The time this field was updated. */
  updateTime?: string;
  /** Text field options. */
  textOptions?: GoogleAppsDriveLabelsV2betaFieldTextOptions;
  /** User field options. */
  userOptions?: GoogleAppsDriveLabelsV2betaFieldUserOptions;
  /** Output only. The `LockStatus` of this field. */
  lockStatus?: GoogleAppsDriveLabelsV2betaLockStatus;
  /** Output only. The user who disabled this field. This value has no meaning when the field is not disabled. */
  disabler?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** Output only. The key of a field, unique within a label or library. This value is autogenerated. Matches the regex: `([a-zA-Z0-9])+`. */
  id?: string;
  /** Output only. The lifecycle of this field. */
  lifecycle?: GoogleAppsDriveLabelsV2betaLifecycle;
  /** Selection field options. */
  selectionOptions?: GoogleAppsDriveLabelsV2betaFieldSelectionOptions;
}

export const GoogleAppsDriveLabelsV2betaField: Schema.Schema<GoogleAppsDriveLabelsV2betaField> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      properties: Schema.optional(GoogleAppsDriveLabelsV2betaFieldProperties),
      appliedCapabilities: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldAppliedCapabilities,
      ),
      integerOptions: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldIntegerOptions,
      ),
      displayHints: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldDisplayHints,
      ),
      schemaCapabilities: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldSchemaCapabilities,
      ),
      disableTime: Schema.optional(Schema.String),
      queryKey: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      dateOptions: Schema.optional(GoogleAppsDriveLabelsV2betaFieldDateOptions),
      publisher: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      updater: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      creator: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      updateTime: Schema.optional(Schema.String),
      textOptions: Schema.optional(GoogleAppsDriveLabelsV2betaFieldTextOptions),
      userOptions: Schema.optional(GoogleAppsDriveLabelsV2betaFieldUserOptions),
      lockStatus: Schema.optional(GoogleAppsDriveLabelsV2betaLockStatus),
      disabler: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      id: Schema.optional(Schema.String),
      lifecycle: Schema.optional(GoogleAppsDriveLabelsV2betaLifecycle),
      selectionOptions: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldSelectionOptions,
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaField",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaField>;

export interface GoogleAppsDriveLabelsV2betaLabel {
  /** Output only. The time this label was created. */
  createTime?: string;
  /** Output only. The customer this label belongs to. For example: `customers/123abc789`. */
  customer?: string;
  /** Output only. The user who published this label. This value has no meaning when the label isn't published.>> */
  publisher?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** Output only. The time this label revision was created. */
  revisionCreateTime?: string;
  /** Output only. Behavior of this label when it's applied to Drive items. */
  appliedLabelPolicy?: GoogleAppsDriveLabelsV2betaLabelAppliedLabelPolicy;
  /** Required. The basic properties of the label. */
  properties?: GoogleAppsDriveLabelsV2betaLabelProperties;
  /** Output only. The capabilities related to this label on applied metadata. */
  appliedCapabilities?: GoogleAppsDriveLabelsV2betaLabelAppliedCapabilities;
  /** Output only. UI display hints for rendering the label. */
  displayHints?: GoogleAppsDriveLabelsV2betaLabelDisplayHints;
  /** Output only. The capabilities the user has on this label. */
  schemaCapabilities?: GoogleAppsDriveLabelsV2betaLabelSchemaCapabilities;
  /** Output only. The time this label was published. This value has no meaning when the label isn't published. */
  publishTime?: string;
  /** Output only. The time this label was disabled. This value has no meaning when the label isn't disabled. */
  disableTime?: string;
  /** Custom URL to present to users to allow them to learn more about this label and how it should be used. */
  learnMoreUri?: string;
  /** Output only. The `LockStatus` of this label. */
  lockStatus?: GoogleAppsDriveLabelsV2betaLockStatus;
  /** Optional. The `EnabledAppSettings` for this Label. */
  enabledAppSettings?: GoogleAppsDriveLabelsV2betaLabelEnabledAppSettings;
  /** Output only. The user who disabled this label. This value has no meaning when the label isn't disabled. */
  disabler?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** Output only. Globally unique identifier of this label. ID makes up part of the label `name`, but unlike `name`, ID is consistent between revisions. Matches the regex: `([a-zA-Z0-9])+`. */
  id?: string;
  /** Output only. The lifecycle state of the label including whether it's published, deprecated, and has draft changes. */
  lifecycle?: GoogleAppsDriveLabelsV2betaLifecycle;
  /** Output only. Revision ID of the label. Revision ID might be part of the label `name` depending on the request issued. A new revision is created whenever revisioned properties of a label are changed. Matches the regex: `([a-zA-Z0-9])+`. */
  revisionId?: string;
  /** Output only. The user who created this label revision. */
  revisionCreator?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** Output only. Resource name of the label. Will be in the form of either: `labels/{id}` or `labels/{id}@{revision_id}` depending on the request. See `id` and `revision_id` below. */
  name?: string;
  /** Required. The type of label. */
  labelType?:
    | "LABEL_TYPE_UNSPECIFIED"
    | "SHARED"
    | "ADMIN"
    | "GOOGLE_APP"
    | (string & {});
  /** Output only. The user who created this label. */
  creator?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** List of fields in descending priority order. */
  fields?: Array<GoogleAppsDriveLabelsV2betaField>;
}

export const GoogleAppsDriveLabelsV2betaLabel: Schema.Schema<GoogleAppsDriveLabelsV2betaLabel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      customer: Schema.optional(Schema.String),
      publisher: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      revisionCreateTime: Schema.optional(Schema.String),
      appliedLabelPolicy: Schema.optional(
        GoogleAppsDriveLabelsV2betaLabelAppliedLabelPolicy,
      ),
      properties: Schema.optional(GoogleAppsDriveLabelsV2betaLabelProperties),
      appliedCapabilities: Schema.optional(
        GoogleAppsDriveLabelsV2betaLabelAppliedCapabilities,
      ),
      displayHints: Schema.optional(
        GoogleAppsDriveLabelsV2betaLabelDisplayHints,
      ),
      schemaCapabilities: Schema.optional(
        GoogleAppsDriveLabelsV2betaLabelSchemaCapabilities,
      ),
      publishTime: Schema.optional(Schema.String),
      disableTime: Schema.optional(Schema.String),
      learnMoreUri: Schema.optional(Schema.String),
      lockStatus: Schema.optional(GoogleAppsDriveLabelsV2betaLockStatus),
      enabledAppSettings: Schema.optional(
        GoogleAppsDriveLabelsV2betaLabelEnabledAppSettings,
      ),
      disabler: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      id: Schema.optional(Schema.String),
      lifecycle: Schema.optional(GoogleAppsDriveLabelsV2betaLifecycle),
      revisionId: Schema.optional(Schema.String),
      revisionCreator: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      name: Schema.optional(Schema.String),
      labelType: Schema.optional(Schema.String),
      creator: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      fields: Schema.optional(Schema.Array(GoogleAppsDriveLabelsV2betaField)),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabel",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabel>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableSelectionChoiceRequest {
  /** Required. The selection field in which a choice will be disabled. */
  fieldId?: string;
  /** Required. Choice to disable. */
  id?: string;
  /** Required. The disabled policy to update. */
  disabledPolicy?: GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy;
  /** The fields that should be updated. At least one field must be specified. The root `disabled_policy` is implied and should not be specified. A single `*` can be used as a short-hand for updating every field. */
  updateMask?: string;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableSelectionChoiceRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableSelectionChoiceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fieldId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      disabledPolicy: Schema.optional(
        GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy,
      ),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableSelectionChoiceRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableSelectionChoiceRequest>;

export interface GoogleAppsDriveLabelsV2betaLabelPermission {
  /** Group resource name. */
  group?: string;
  /** The role the principal should have. */
  role?:
    | "LABEL_ROLE_UNSPECIFIED"
    | "READER"
    | "APPLIER"
    | "ORGANIZER"
    | "EDITOR"
    | (string & {});
  /** Specifies the email address for a user or group principal. Not populated for audience principals. User and group permissions may only be inserted using an email address. On update requests, if email address is specified, no principal should be specified. */
  email?: string;
  /** Person resource name. */
  person?: string;
  /** Audience to grant a role to. The magic value of `audiences/default` may be used to apply the role to the default audience in the context of the organization that owns the label. */
  audience?: string;
  /** Resource name of this permission. */
  name?: string;
}

export const GoogleAppsDriveLabelsV2betaLabelPermission: Schema.Schema<GoogleAppsDriveLabelsV2betaLabelPermission> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      group: Schema.optional(Schema.String),
      role: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      person: Schema.optional(Schema.String),
      audience: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabelPermission",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabelPermission>;

export interface GoogleAppsDriveLabelsV2betaUpdateLabelPermissionRequest {
  /** Required. The parent label resource name. */
  parent?: string;
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** Required. The permission to create or update on the label. */
  labelPermission?: GoogleAppsDriveLabelsV2betaLabelPermission;
}

export const GoogleAppsDriveLabelsV2betaUpdateLabelPermissionRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaUpdateLabelPermissionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parent: Schema.optional(Schema.String),
      useAdminAccess: Schema.optional(Schema.Boolean),
      labelPermission: Schema.optional(
        GoogleAppsDriveLabelsV2betaLabelPermission,
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaUpdateLabelPermissionRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaUpdateLabelPermissionRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateLabelPropertiesResponse {}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateLabelPropertiesResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateLabelPropertiesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateLabelPropertiesResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateLabelPropertiesResponse>;

export interface GoogleAppsDriveLabelsV2betaPublishLabelRequest {
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** Provides control over how write requests are executed. Defaults to unset, which means the last write wins. */
  writeControl?: GoogleAppsDriveLabelsV2betaWriteControl;
  /** The BCP-47 language code to use for evaluating localized field labels. When not specified, values in the default configured language will be used. */
  languageCode?: string;
}

export const GoogleAppsDriveLabelsV2betaPublishLabelRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaPublishLabelRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      useAdminAccess: Schema.optional(Schema.Boolean),
      writeControl: Schema.optional(GoogleAppsDriveLabelsV2betaWriteControl),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaPublishLabelRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaPublishLabelRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteSelectionChoiceRequest {
  /** Required. The selection field from which a choice will be deleted. */
  fieldId?: string;
  /** Required. Choice to delete. */
  id?: string;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteSelectionChoiceRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteSelectionChoiceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fieldId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteSelectionChoiceRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteSelectionChoiceRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableSelectionChoiceRequest {
  /** Required. The selection field in which a choice will be enabled. */
  fieldId?: string;
  /** Required. Choice to enable. */
  id?: string;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableSelectionChoiceRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableSelectionChoiceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fieldId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableSelectionChoiceRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableSelectionChoiceRequest>;

export interface GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsResponse {
  /** Required. Permissions updated. */
  permissions?: Array<GoogleAppsDriveLabelsV2betaLabelPermission>;
}

export const GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(
        Schema.Array(GoogleAppsDriveLabelsV2betaLabelPermission),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsResponse>;

export interface GoogleAppsDriveLabelsV2betaDeleteLabelPermissionRequest {
  /** Required. Label permission resource name. */
  name?: string;
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
}

export const GoogleAppsDriveLabelsV2betaDeleteLabelPermissionRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeleteLabelPermissionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      useAdminAccess: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaDeleteLabelPermissionRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeleteLabelPermissionRequest>;

export interface GoogleAppsDriveLabelsV2betaBatchDeleteLabelPermissionsRequest {
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. If this is set, the `use_admin_access` field in the `DeleteLabelPermissionRequest` messages must either be empty or match this field. */
  useAdminAccess?: boolean;
  /** Required. The request message specifying the resources to update. */
  requests?: Array<GoogleAppsDriveLabelsV2betaDeleteLabelPermissionRequest>;
}

export const GoogleAppsDriveLabelsV2betaBatchDeleteLabelPermissionsRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaBatchDeleteLabelPermissionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      useAdminAccess: Schema.optional(Schema.Boolean),
      requests: Schema.optional(
        Schema.Array(GoogleAppsDriveLabelsV2betaDeleteLabelPermissionRequest),
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaBatchDeleteLabelPermissionsRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaBatchDeleteLabelPermissionsRequest>;

export interface GoogleAppsDriveLabelsV2betaUpdateLabelCopyModeRequest {
  /** Required. Indicates how the applied label and field values should be copied when a Drive item is copied. */
  copyMode?:
    | "COPY_MODE_UNSPECIFIED"
    | "DO_NOT_COPY"
    | "ALWAYS_COPY"
    | "COPY_APPLIABLE"
    | (string & {});
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** The BCP-47 language code to use for evaluating localized field labels. When not specified, values in the default configured language will be used. */
  languageCode?: string;
  /** When specified, only certain fields belonging to the indicated view will be returned. */
  view?: "LABEL_VIEW_BASIC" | "LABEL_VIEW_FULL" | (string & {});
}

export const GoogleAppsDriveLabelsV2betaUpdateLabelCopyModeRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaUpdateLabelCopyModeRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      copyMode: Schema.optional(Schema.String),
      useAdminAccess: Schema.optional(Schema.Boolean),
      languageCode: Schema.optional(Schema.String),
      view: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaUpdateLabelCopyModeRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaUpdateLabelCopyModeRequest>;

export interface GoogleAppsDriveLabelsV2betaUserCapabilities {
  /** Output only. Whether the user is allowed to create admin labels. */
  canCreateAdminLabels?: boolean;
  /** Output only. Whether the user is allowed access to the label manager. */
  canAccessLabelManager?: boolean;
  /** Output only. Whether the user is allowed to create shared labels. */
  canCreateSharedLabels?: boolean;
  /** Output only. Resource name for the user capabilities. */
  name?: string;
  /** Output only. Whether the user is an administrator for the shared labels feature. */
  canAdministrateLabels?: boolean;
}

export const GoogleAppsDriveLabelsV2betaUserCapabilities: Schema.Schema<GoogleAppsDriveLabelsV2betaUserCapabilities> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      canCreateAdminLabels: Schema.optional(Schema.Boolean),
      canAccessLabelManager: Schema.optional(Schema.Boolean),
      canCreateSharedLabels: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      canAdministrateLabels: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaUserCapabilities",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaUserCapabilities>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldTypeResponse {}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldTypeResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldTypeResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldTypeResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldTypeResponse>;

export interface GoogleAppsDriveLabelsV2betaIntegerLimits {
  /** Minimum value for an integer field type. */
  minValue?: string;
  /** Maximum value for an integer field type. */
  maxValue?: string;
}

export const GoogleAppsDriveLabelsV2betaIntegerLimits: Schema.Schema<GoogleAppsDriveLabelsV2betaIntegerLimits> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minValue: Schema.optional(Schema.String),
      maxValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaIntegerLimits",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaIntegerLimits>;

export interface GoogleAppsDriveLabelsV2betaTextLimits {
  /** Minimum length allowed for a text field type. */
  minLength?: number;
  /** Maximum length allowed for a text field type. */
  maxLength?: number;
}

export const GoogleAppsDriveLabelsV2betaTextLimits: Schema.Schema<GoogleAppsDriveLabelsV2betaTextLimits> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minLength: Schema.optional(Schema.Number),
      maxLength: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaTextLimits",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaTextLimits>;

export interface GoogleAppsDriveLabelsV2betaLongTextLimits {
  /** Minimum length allowed for a long text field type. */
  minLength?: number;
  /** Maximum length allowed for a long text field type. */
  maxLength?: number;
}

export const GoogleAppsDriveLabelsV2betaLongTextLimits: Schema.Schema<GoogleAppsDriveLabelsV2betaLongTextLimits> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minLength: Schema.optional(Schema.Number),
      maxLength: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLongTextLimits",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLongTextLimits>;

export interface GoogleAppsDriveLabelsV2betaDateLimits {
  /** Minimum value for the date field type. */
  minValue?: GoogleTypeDate;
  /** Maximum value for the date field type. */
  maxValue?: GoogleTypeDate;
}

export const GoogleAppsDriveLabelsV2betaDateLimits: Schema.Schema<GoogleAppsDriveLabelsV2betaDateLimits> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minValue: Schema.optional(GoogleTypeDate),
      maxValue: Schema.optional(GoogleTypeDate),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaDateLimits",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDateLimits>;

export interface GoogleAppsDriveLabelsV2betaListLimits {
  /** Maximum number of values allowed for the field type. */
  maxEntries?: number;
}

export const GoogleAppsDriveLabelsV2betaListLimits: Schema.Schema<GoogleAppsDriveLabelsV2betaListLimits> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxEntries: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaListLimits",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaListLimits>;

export interface GoogleAppsDriveLabelsV2betaSelectionLimits {
  /** Maximum ID length for a selection option. */
  maxIdLength?: number;
  /** Maximum length for display name. */
  maxDisplayNameLength?: number;
  /** Limits for list-variant of a field type. */
  listLimits?: GoogleAppsDriveLabelsV2betaListLimits;
  /** Maximum number of choices. */
  maxChoices?: number;
  /** Maximum number of deleted choices. */
  maxDeletedChoices?: number;
}

export const GoogleAppsDriveLabelsV2betaSelectionLimits: Schema.Schema<GoogleAppsDriveLabelsV2betaSelectionLimits> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxIdLength: Schema.optional(Schema.Number),
      maxDisplayNameLength: Schema.optional(Schema.Number),
      listLimits: Schema.optional(GoogleAppsDriveLabelsV2betaListLimits),
      maxChoices: Schema.optional(Schema.Number),
      maxDeletedChoices: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaSelectionLimits",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaSelectionLimits>;

export interface GoogleAppsDriveLabelsV2betaUserLimits {
  /** Limits for list-variant of a field type. */
  listLimits?: GoogleAppsDriveLabelsV2betaListLimits;
}

export const GoogleAppsDriveLabelsV2betaUserLimits: Schema.Schema<GoogleAppsDriveLabelsV2betaUserLimits> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      listLimits: Schema.optional(GoogleAppsDriveLabelsV2betaListLimits),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaUserLimits",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaUserLimits>;

export interface GoogleAppsDriveLabelsV2betaFieldLimits {
  /** Integer field limits. */
  integerLimits?: GoogleAppsDriveLabelsV2betaIntegerLimits;
  /** The relevant limits for the specified Field.Type. Text field limits. */
  textLimits?: GoogleAppsDriveLabelsV2betaTextLimits;
  /** Long text field limits. */
  longTextLimits?: GoogleAppsDriveLabelsV2betaLongTextLimits;
  /** Date field limits. */
  dateLimits?: GoogleAppsDriveLabelsV2betaDateLimits;
  /** Limits for field description, also called help text. */
  maxDescriptionLength?: number;
  /** Selection field limits. */
  selectionLimits?: GoogleAppsDriveLabelsV2betaSelectionLimits;
  /** Limits for field title. */
  maxDisplayNameLength?: number;
  /** Maximum length for the id. */
  maxIdLength?: number;
  /** User field limits. */
  userLimits?: GoogleAppsDriveLabelsV2betaUserLimits;
}

export const GoogleAppsDriveLabelsV2betaFieldLimits: Schema.Schema<GoogleAppsDriveLabelsV2betaFieldLimits> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      integerLimits: Schema.optional(GoogleAppsDriveLabelsV2betaIntegerLimits),
      textLimits: Schema.optional(GoogleAppsDriveLabelsV2betaTextLimits),
      longTextLimits: Schema.optional(
        GoogleAppsDriveLabelsV2betaLongTextLimits,
      ),
      dateLimits: Schema.optional(GoogleAppsDriveLabelsV2betaDateLimits),
      maxDescriptionLength: Schema.optional(Schema.Number),
      selectionLimits: Schema.optional(
        GoogleAppsDriveLabelsV2betaSelectionLimits,
      ),
      maxDisplayNameLength: Schema.optional(Schema.Number),
      maxIdLength: Schema.optional(Schema.Number),
      userLimits: Schema.optional(GoogleAppsDriveLabelsV2betaUserLimits),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaFieldLimits",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaFieldLimits>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldPropertiesRequest {
  /** Required. The field to update. */
  id?: string;
  /** Required. Basic field properties. */
  properties?: GoogleAppsDriveLabelsV2betaFieldProperties;
  /** The fields that should be updated. At least one field must be specified. The root `properties` is implied and should not be specified. A single `*` can be used as a short-hand for updating every field. */
  updateMask?: string;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldPropertiesRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldPropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      properties: Schema.optional(GoogleAppsDriveLabelsV2betaFieldProperties),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldPropertiesRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldPropertiesRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateFieldResponse {
  /** The priority of the created field. The priority may change from what was specified to assure contiguous priorities between fields (1-n). */
  priority?: number;
  /** The field of the created field. When left blank in a create request, a key will be autogenerated and can be identified here. */
  id?: string;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateFieldResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateFieldResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      priority: Schema.optional(Schema.Number),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateFieldResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateFieldResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableFieldResponse {}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableFieldResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableFieldResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableFieldResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableFieldResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableFieldRequest {
  /** Required. ID of the field to enable. */
  id?: string;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableFieldRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableFieldRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableFieldRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableFieldRequest>;

export interface GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsRequest {
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. If this is set, the `use_admin_access` field in the `UpdateLabelPermissionRequest` messages must either be empty or match this field. */
  useAdminAccess?: boolean;
  /** Required. The request message specifying the resources to update. */
  requests?: Array<GoogleAppsDriveLabelsV2betaUpdateLabelPermissionRequest>;
}

export const GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      useAdminAccess: Schema.optional(Schema.Boolean),
      requests: Schema.optional(
        Schema.Array(GoogleAppsDriveLabelsV2betaUpdateLabelPermissionRequest),
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsRequest>;

export interface GoogleAppsDriveLabelsV2betaListLabelPermissionsResponse {
  /** Label permissions. */
  labelPermissions?: Array<GoogleAppsDriveLabelsV2betaLabelPermission>;
  /** The token of the next page in the response. */
  nextPageToken?: string;
}

export const GoogleAppsDriveLabelsV2betaListLabelPermissionsResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaListLabelPermissionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelPermissions: Schema.optional(
        Schema.Array(GoogleAppsDriveLabelsV2betaLabelPermission),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaListLabelPermissionsResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaListLabelPermissionsResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableSelectionChoiceResponse {}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableSelectionChoiceResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableSelectionChoiceResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableSelectionChoiceResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableSelectionChoiceResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteFieldResponse {}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteFieldResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteFieldResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteFieldResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteFieldResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteSelectionChoiceResponse {}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteSelectionChoiceResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteSelectionChoiceResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteSelectionChoiceResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteSelectionChoiceResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldPropertiesResponse {
  /** The priority of the updated field. The priority may change from what was specified to assure contiguous priorities between fields (1-n). */
  priority?: number;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldPropertiesResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldPropertiesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      priority: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldPropertiesResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldPropertiesResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableSelectionChoiceResponse {}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableSelectionChoiceResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableSelectionChoiceResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableSelectionChoiceResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableSelectionChoiceResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateSelectionChoiceResponse {
  /** The server-generated ID of the field. */
  fieldId?: string;
  /** The server-generated ID of the created choice within the field. */
  id?: string;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateSelectionChoiceResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateSelectionChoiceResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fieldId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateSelectionChoiceResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateSelectionChoiceResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateSelectionChoicePropertiesResponse {
  /** The priority of the updated choice. The priority may change from what was specified to assure contiguous priorities between choices (1-n). */
  priority?: number;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateSelectionChoicePropertiesResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateSelectionChoicePropertiesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      priority: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateSelectionChoicePropertiesResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateSelectionChoicePropertiesResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableFieldResponse {}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableFieldResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableFieldResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableFieldResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableFieldResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseResponse {
  /** Disables a choice within a selection field. */
  disableSelectionChoice?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableSelectionChoiceResponse;
  /** Deletes a field from the label. */
  deleteField?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteFieldResponse;
  /** Deletes a choice from a selection field. */
  deleteSelectionChoice?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteSelectionChoiceResponse;
  /** Updates basic properties of a field. */
  updateField?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldPropertiesResponse;
  /** Enables a choice within a selection field. */
  enableSelectionChoice?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableSelectionChoiceResponse;
  /** Creates a field. */
  createField?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateFieldResponse;
  /** Updates field type and/or type options. */
  updateFieldType?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldTypeResponse;
  /** Creates a selection list option to add to a selection field. */
  createSelectionChoice?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateSelectionChoiceResponse;
  /** Updates a choice within a selection field. */
  updateSelectionChoiceProperties?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateSelectionChoicePropertiesResponse;
  /** Disables field. */
  disableField?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableFieldResponse;
  /** Updates basic properties of a label. */
  updateLabel?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateLabelPropertiesResponse;
  /** Enables field. */
  enableField?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableFieldResponse;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      disableSelectionChoice: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableSelectionChoiceResponse,
      ),
      deleteField: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteFieldResponse,
      ),
      deleteSelectionChoice: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDeleteSelectionChoiceResponse,
      ),
      updateField: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldPropertiesResponse,
      ),
      enableSelectionChoice: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableSelectionChoiceResponse,
      ),
      createField: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateFieldResponse,
      ),
      updateFieldType: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateFieldTypeResponse,
      ),
      createSelectionChoice: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseCreateSelectionChoiceResponse,
      ),
      updateSelectionChoiceProperties: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateSelectionChoicePropertiesResponse,
      ),
      disableField: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseDisableFieldResponse,
      ),
      updateLabel: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseUpdateLabelPropertiesResponse,
      ),
      enableField: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseEnableFieldResponse,
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseResponse>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponse {
  /** The reply of the updates. This maps 1:1 with the updates, although responses to some requests may be empty. */
  responses?: Array<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseResponse>;
  /** The label after updates were applied. This is only set if `include_label_in_response` is `true` and there were no errors. */
  updatedLabel?: GoogleAppsDriveLabelsV2betaLabel;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      responses: Schema.optional(
        Schema.Array(
          GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponseResponse,
        ),
      ),
      updatedLabel: Schema.optional(GoogleAppsDriveLabelsV2betaLabel),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponse>;

export interface GoogleAppsDriveLabelsV2betaLabelLockCapabilities {
  /** True if the user is authorized to view the policy. */
  canViewPolicy?: boolean;
}

export const GoogleAppsDriveLabelsV2betaLabelLockCapabilities: Schema.Schema<GoogleAppsDriveLabelsV2betaLabelLockCapabilities> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      canViewPolicy: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabelLockCapabilities",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabelLockCapabilities>;

export interface GoogleAppsDriveLabelsV2betaLabelLock {
  /** The ID of the field that should be locked. Empty if the whole label should be locked. */
  fieldId?: string;
  /** Output only. Resource name of this label lock. */
  name?: string;
  /** Output only. The user's capabilities on this label lock. */
  capabilities?: GoogleAppsDriveLabelsV2betaLabelLockCapabilities;
  /** Output only. The user whose credentials were used to create the label lock. Not present if no user was responsible for creating the label lock. */
  creator?: GoogleAppsDriveLabelsV2betaUserInfo;
  /** Output only. This label lock's state. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETING" | (string & {});
  /** Output only. A timestamp indicating when this label lock was scheduled for deletion. Present only if this label lock is in the `DELETING` state. */
  deleteTime?: string;
  /** The ID of the selection field choice that should be locked. If present, `field_id` must also be present. */
  choiceId?: string;
  /** Output only. The time this label lock was created. */
  createTime?: string;
}

export const GoogleAppsDriveLabelsV2betaLabelLock: Schema.Schema<GoogleAppsDriveLabelsV2betaLabelLock> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fieldId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      capabilities: Schema.optional(
        GoogleAppsDriveLabelsV2betaLabelLockCapabilities,
      ),
      creator: Schema.optional(GoogleAppsDriveLabelsV2betaUserInfo),
      state: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      choiceId: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabelLock",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabelLock>;

export interface GoogleAppsDriveLabelsV2betaListLabelsResponse {
  /** Labels. */
  labels?: Array<GoogleAppsDriveLabelsV2betaLabel>;
  /** The token of the next page in the response. */
  nextPageToken?: string;
}

export const GoogleAppsDriveLabelsV2betaListLabelsResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaListLabelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Array(GoogleAppsDriveLabelsV2betaLabel)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaListLabelsResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaListLabelsResponse>;

export interface GoogleAppsDriveLabelsV2betaLabelLimits {
  /** The maximum number of characters allowed for the description. */
  maxDescriptionLength?: number;
  /** The maximum number of published fields that can be deleted. */
  maxDeletedFields?: number;
  /** Resource name. */
  name?: string;
  /** The maximum number of fields allowed within the label. */
  maxFields?: number;
  /** The maximum number of characters allowed for the title. */
  maxTitleLength?: number;
  /** The limits for fields. */
  fieldLimits?: GoogleAppsDriveLabelsV2betaFieldLimits;
  /** The maximum number of draft revisions that will be kept before deleting old drafts. */
  maxDraftRevisions?: number;
}

export const GoogleAppsDriveLabelsV2betaLabelLimits: Schema.Schema<GoogleAppsDriveLabelsV2betaLabelLimits> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxDescriptionLength: Schema.optional(Schema.Number),
      maxDeletedFields: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
      maxFields: Schema.optional(Schema.Number),
      maxTitleLength: Schema.optional(Schema.Number),
      fieldLimits: Schema.optional(GoogleAppsDriveLabelsV2betaFieldLimits),
      maxDraftRevisions: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaLabelLimits",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaLabelLimits>;

export interface GoogleAppsDriveLabelsV2betaDisableLabelRequest {
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** Disabled policy to use. */
  disabledPolicy?: GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy;
  /** Provides control over how write requests are executed. Defaults to unset, which means the last write wins. */
  writeControl?: GoogleAppsDriveLabelsV2betaWriteControl;
  /** The BCP-47 language code to use for evaluating localized field labels. When not specified, values in the default configured language will be used. */
  languageCode?: string;
  /** The fields that should be updated. At least one field must be specified. The root `disabled_policy` is implied and should not be specified. A single `*` can be used as a short-hand for updating every field. */
  updateMask?: string;
}

export const GoogleAppsDriveLabelsV2betaDisableLabelRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDisableLabelRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      useAdminAccess: Schema.optional(Schema.Boolean),
      disabledPolicy: Schema.optional(
        GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy,
      ),
      writeControl: Schema.optional(GoogleAppsDriveLabelsV2betaWriteControl),
      languageCode: Schema.optional(Schema.String),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaDisableLabelRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDisableLabelRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteFieldRequest {
  /** Required. ID of the field to delete. */
  id?: string;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteFieldRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteFieldRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteFieldRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteFieldRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateFieldRequest {
  /** Required. Field to create. */
  field?: GoogleAppsDriveLabelsV2betaField;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateFieldRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateFieldRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      field: Schema.optional(GoogleAppsDriveLabelsV2betaField),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateFieldRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateFieldRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldTypeRequest {
  /** Update field to Text. */
  textOptions?: GoogleAppsDriveLabelsV2betaFieldTextOptions;
  /** Update field to User. */
  userOptions?: GoogleAppsDriveLabelsV2betaFieldUserOptions;
  /** Update field to Integer. */
  integerOptions?: GoogleAppsDriveLabelsV2betaFieldIntegerOptions;
  /** Update field to Date. */
  dateOptions?: GoogleAppsDriveLabelsV2betaFieldDateOptions;
  /** Required. The field to update. */
  id?: string;
  /** The fields that should be updated. At least one field must be specified. The root of `type_options` is implied and should not be specified. A single `*` can be used as a short-hand for updating every field. */
  updateMask?: string;
  /** Update field to Selection. */
  selectionOptions?: GoogleAppsDriveLabelsV2betaFieldSelectionOptions;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldTypeRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldTypeRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textOptions: Schema.optional(GoogleAppsDriveLabelsV2betaFieldTextOptions),
      userOptions: Schema.optional(GoogleAppsDriveLabelsV2betaFieldUserOptions),
      integerOptions: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldIntegerOptions,
      ),
      dateOptions: Schema.optional(GoogleAppsDriveLabelsV2betaFieldDateOptions),
      id: Schema.optional(Schema.String),
      updateMask: Schema.optional(Schema.String),
      selectionOptions: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldSelectionOptions,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldTypeRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldTypeRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateSelectionChoiceRequest {
  /** Required. The selection field in which a choice will be created. */
  fieldId?: string;
  /** Required. The choice to create. */
  choice?: GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoice;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateSelectionChoiceRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateSelectionChoiceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fieldId: Schema.optional(Schema.String),
      choice: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoice,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateSelectionChoiceRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateSelectionChoiceRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest {
  /** Required. The selection field to update. */
  fieldId?: string;
  /** Required. The choice to update. */
  id?: string;
  /** Required. The choice properties to update. */
  properties?: GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceProperties;
  /** The fields that should be updated. At least one field must be specified. The root `properties` is implied and should not be specified. A single `*` can be used as a short-hand for updating every field. */
  updateMask?: string;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fieldId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      properties: Schema.optional(
        GoogleAppsDriveLabelsV2betaFieldSelectionOptionsChoiceProperties,
      ),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateLabelPropertiesRequest {
  /** The fields that should be updated. At least one field must be specified. The root `label_properties` is implied and should not be specified. A single `*` can be used as a short-hand for updating every field. */
  updateMask?: string;
  /** Required. Label properties to update. */
  properties?: GoogleAppsDriveLabelsV2betaLabelProperties;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateLabelPropertiesRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateLabelPropertiesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updateMask: Schema.optional(Schema.String),
      properties: Schema.optional(GoogleAppsDriveLabelsV2betaLabelProperties),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateLabelPropertiesRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateLabelPropertiesRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableFieldRequest {
  /** Required. Key of the field to disable. */
  id?: string;
  /** Required. Field disabled policy. */
  disabledPolicy?: GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy;
  /** The fields that should be updated. At least one field must be specified. The root `disabled_policy` is implied and should not be specified. A single `*` can be used as a short-hand for updating every field. */
  updateMask?: string;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableFieldRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableFieldRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      disabledPolicy: Schema.optional(
        GoogleAppsDriveLabelsV2betaLifecycleDisabledPolicy,
      ),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableFieldRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableFieldRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestRequest {
  /** Disable a choice within a selection field. */
  disableSelectionChoice?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableSelectionChoiceRequest;
  /** Deletes a field from the label. */
  deleteField?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteFieldRequest;
  /** Delete a choice within a selection field. */
  deleteSelectionChoice?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteSelectionChoiceRequest;
  /** Updates basic properties of a field. */
  updateField?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldPropertiesRequest;
  /** Enable a choice within a selection field. */
  enableSelectionChoice?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableSelectionChoiceRequest;
  /** Creates a field. */
  createField?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateFieldRequest;
  /** Update field type and/or type options. */
  updateFieldType?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldTypeRequest;
  /** Create a choice within a selection field. */
  createSelectionChoice?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateSelectionChoiceRequest;
  /** Update a choice property within a selection field. */
  updateSelectionChoiceProperties?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest;
  /** Updates the label properties. */
  updateLabel?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateLabelPropertiesRequest;
  /** Enables the field. */
  enableField?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableFieldRequest;
  /** Disables the field. */
  disableField?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableFieldRequest;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      disableSelectionChoice: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableSelectionChoiceRequest,
      ),
      deleteField: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteFieldRequest,
      ),
      deleteSelectionChoice: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDeleteSelectionChoiceRequest,
      ),
      updateField: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldPropertiesRequest,
      ),
      enableSelectionChoice: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableSelectionChoiceRequest,
      ),
      createField: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateFieldRequest,
      ),
      updateFieldType: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateFieldTypeRequest,
      ),
      createSelectionChoice: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestCreateSelectionChoiceRequest,
      ),
      updateSelectionChoiceProperties: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest,
      ),
      updateLabel: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestUpdateLabelPropertiesRequest,
      ),
      enableField: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestEnableFieldRequest,
      ),
      disableField: Schema.optional(
        GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestDisableFieldRequest,
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestRequest>;

export interface GoogleProtobufEmpty {}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleProtobufEmpty",
  }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleAppsDriveLabelsV2betaListLabelLocksResponse {
  /** Label locks. */
  labelLocks?: Array<GoogleAppsDriveLabelsV2betaLabelLock>;
  /** The token of the next page in the response. */
  nextPageToken?: string;
}

export const GoogleAppsDriveLabelsV2betaListLabelLocksResponse: Schema.Schema<GoogleAppsDriveLabelsV2betaListLabelLocksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelLocks: Schema.optional(
        Schema.Array(GoogleAppsDriveLabelsV2betaLabelLock),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaListLabelLocksResponse",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaListLabelLocksResponse>;

export interface GoogleAppsDriveLabelsV2betaUpdateLabelEnabledAppSettingsRequest {
  /** Optional. Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** Optional. The BCP-47 language code to use for evaluating localized field labels. When not specified, values in the default configured language will be used. */
  languageCode?: string;
  /** Optional. When specified, only certain fields belonging to the indicated view will be returned. */
  view?: "LABEL_VIEW_BASIC" | "LABEL_VIEW_FULL" | (string & {});
  /** Required. The new `EnabledAppSettings` value for the label. */
  enabledAppSettings?: GoogleAppsDriveLabelsV2betaLabelEnabledAppSettings;
}

export const GoogleAppsDriveLabelsV2betaUpdateLabelEnabledAppSettingsRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaUpdateLabelEnabledAppSettingsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      useAdminAccess: Schema.optional(Schema.Boolean),
      languageCode: Schema.optional(Schema.String),
      view: Schema.optional(Schema.String),
      enabledAppSettings: Schema.optional(
        GoogleAppsDriveLabelsV2betaLabelEnabledAppSettings,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAppsDriveLabelsV2betaUpdateLabelEnabledAppSettingsRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaUpdateLabelEnabledAppSettingsRequest>;

export interface GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequest {
  /** Provides control over how write requests are executed. */
  writeControl?: GoogleAppsDriveLabelsV2betaWriteControl;
  /** The BCP-47 language code to use for evaluating localized field labels when `include_label_in_response` is `true`. */
  languageCode?: string;
  /** A list of updates to apply to the label. Requests will be applied in the order they are specified. */
  requests?: Array<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestRequest>;
  /** When specified, only certain fields belonging to the indicated view will be returned. */
  view?: "LABEL_VIEW_BASIC" | "LABEL_VIEW_FULL" | (string & {});
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
}

export const GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequest: Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      writeControl: Schema.optional(GoogleAppsDriveLabelsV2betaWriteControl),
      languageCode: Schema.optional(Schema.String),
      requests: Schema.optional(
        Schema.Array(GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequestRequest),
      ),
      view: Schema.optional(Schema.String),
      useAdminAccess: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequest",
  }) as any as Schema.Schema<GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetCapabilitiesUsersRequest {
  /** Required. The resource name of the user. Only "users/me/capabilities" is supported. */
  name: string;
  /** The customer to scope this request to. For example: `customers/abcd1234`. If unset, it will return settings within the current customer. */
  customer?: string;
}

export const GetCapabilitiesUsersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  }).pipe(
    T.Http({ method: "GET", path: "v2beta/users/{usersId}/capabilities" }),
    svc,
  ) as unknown as Schema.Schema<GetCapabilitiesUsersRequest>;

export type GetCapabilitiesUsersResponse =
  GoogleAppsDriveLabelsV2betaUserCapabilities;
export const GetCapabilitiesUsersResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaUserCapabilities;

export type GetCapabilitiesUsersError = DefaultErrors;

/** Gets the user capabilities. */
export const getCapabilitiesUsers: API.OperationMethod<
  GetCapabilitiesUsersRequest,
  GetCapabilitiesUsersResponse,
  GetCapabilitiesUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCapabilitiesUsersRequest,
  output: GetCapabilitiesUsersResponse,
  errors: [],
}));

export interface ListLabelsRequest {
  /** Whether to include only published labels in the results. * When `true`, only the current published label revisions are returned. Disabled labels are included. Returned label resource names reference the published revision (`labels/{id}/{revision_id}`). * When `false`, the current label revisions are returned, which might not be published. Returned label resource names don't reference a specific revision (`labels/{id}`). */
  publishedOnly?: boolean;
  /** The customer to scope this list request to. For example: `customers/abcd1234`. If unset, will return all labels within the current customer. */
  customer?: string;
  /** Specifies the level of access the user must have on the returned labels. The minimum role a user must have on a label. Defaults to `READER`. */
  minimumRole?:
    | "LABEL_ROLE_UNSPECIFIED"
    | "READER"
    | "APPLIER"
    | "ORGANIZER"
    | "EDITOR"
    | (string & {});
  /** Set to `true` in order to use the user's admin credentials. This will return all labels within the customer. */
  useAdminAccess?: boolean;
  /** When specified, only certain fields belonging to the indicated view are returned. */
  view?: "LABEL_VIEW_BASIC" | "LABEL_VIEW_FULL" | (string & {});
  /** Maximum number of labels to return per page. Default: 50. Max: 200. */
  pageSize?: number;
  /** The BCP-47 language code to use for evaluating localized field labels. When not specified, values in the default configured language are used. */
  languageCode?: string;
  /** The token of the page to return. */
  pageToken?: string;
}

export const ListLabelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  publishedOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("publishedOnly"),
  ),
  customer: Schema.optional(Schema.String).pipe(T.HttpQuery("customer")),
  minimumRole: Schema.optional(Schema.String).pipe(T.HttpQuery("minimumRole")),
  useAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useAdminAccess"),
  ),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  languageCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("languageCode"),
  ),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta/labels" }),
  svc,
) as unknown as Schema.Schema<ListLabelsRequest>;

export type ListLabelsResponse = GoogleAppsDriveLabelsV2betaListLabelsResponse;
export const ListLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaListLabelsResponse;

export type ListLabelsError = DefaultErrors;

/** List labels. For more information, see [Search for labels](https://developers.google.com/workspace/drive/labels/guides/search-label). */
export const listLabels: API.PaginatedOperationMethod<
  ListLabelsRequest,
  ListLabelsResponse,
  ListLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLabelsRequest,
  output: ListLabelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface EnableLabelsRequest {
  /** Required. Label resource name. */
  name: string;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaEnableLabelRequest;
}

export const EnableLabelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAppsDriveLabelsV2betaEnableLabelRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2beta/labels/{labelsId}:enable",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<EnableLabelsRequest>;

export type EnableLabelsResponse = GoogleAppsDriveLabelsV2betaLabel;
export const EnableLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabel;

export type EnableLabelsError = DefaultErrors;

/** Enable a disabled label and restore it to its published state. For more information, see [Disable, enable, and delete a label](https://developers.google.com/workspace/drive/labels/guides/disable-delete-label). This will result in a new published revision based on the current disabled published revision. If there's an existing disabled draft revision, a new revision will be created based on that draft and will be enabled. */
export const enableLabels: API.OperationMethod<
  EnableLabelsRequest,
  EnableLabelsResponse,
  EnableLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableLabelsRequest,
  output: EnableLabelsResponse,
  errors: [],
}));

export interface UpdateLabelEnabledAppSettingsLabelsRequest {
  /** Required. The resource name of the label to update. The resource name of the label to update. */
  name: string;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaUpdateLabelEnabledAppSettingsRequest;
}

export const UpdateLabelEnabledAppSettingsLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleAppsDriveLabelsV2betaUpdateLabelEnabledAppSettingsRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2beta/labels/{labelsId}:updateLabelEnabledAppSettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateLabelEnabledAppSettingsLabelsRequest>;

export type UpdateLabelEnabledAppSettingsLabelsResponse =
  GoogleAppsDriveLabelsV2betaLabel;
export const UpdateLabelEnabledAppSettingsLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabel;

export type UpdateLabelEnabledAppSettingsLabelsError = DefaultErrors;

/** Updates a label's `EnabledAppSettings`. Enabling a label in a Google Workspace app allows it to be used in that app. This change isn't revisioned, doesn't require publishing, and takes effect immediately. */
export const updateLabelEnabledAppSettingsLabels: API.OperationMethod<
  UpdateLabelEnabledAppSettingsLabelsRequest,
  UpdateLabelEnabledAppSettingsLabelsResponse,
  UpdateLabelEnabledAppSettingsLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLabelEnabledAppSettingsLabelsRequest,
  output: UpdateLabelEnabledAppSettingsLabelsResponse,
  errors: [],
}));

export interface DisableLabelsRequest {
  /** Required. Label resource name. */
  name: string;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaDisableLabelRequest;
}

export const DisableLabelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAppsDriveLabelsV2betaDisableLabelRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2beta/labels/{labelsId}:disable",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<DisableLabelsRequest>;

export type DisableLabelsResponse = GoogleAppsDriveLabelsV2betaLabel;
export const DisableLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabel;

export type DisableLabelsError = DefaultErrors;

/** Disable a published label. For more information, see [Disable, enable, and delete a label](https://developers.google.com/workspace/drive/labels/guides/disable-delete-label). Disabling a label will result in a new disabled published revision based on the current published revision. If there's a draft revision, a new disabled draft revision will be created based on the latest draft revision. Older draft revisions will be deleted. Once disabled, a label may be deleted with `DeleteLabel`. */
export const disableLabels: API.OperationMethod<
  DisableLabelsRequest,
  DisableLabelsResponse,
  DisableLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableLabelsRequest,
  output: DisableLabelsResponse,
  errors: [],
}));

export interface GetLabelsRequest {
  /** Set to `true` in order to use the user's admin credentials. The server verifies that the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** The BCP-47 language code to use for evaluating localized field labels. When not specified, values in the default configured language are used. */
  languageCode?: string;
  /** When specified, only certain fields belonging to the indicated view are returned. */
  view?: "LABEL_VIEW_BASIC" | "LABEL_VIEW_FULL" | (string & {});
  /** Required. Label resource name. May be any of: * `labels/{id}` (equivalent to labels/{id}@latest) * `labels/{id}@latest` * `labels/{id}@published` * `labels/{id}@{revision_id}` */
  name: string;
}

export const GetLabelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  useAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useAdminAccess"),
  ),
  languageCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("languageCode"),
  ),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta/labels/{labelsId}" }),
  svc,
) as unknown as Schema.Schema<GetLabelsRequest>;

export type GetLabelsResponse = GoogleAppsDriveLabelsV2betaLabel;
export const GetLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabel;

export type GetLabelsError = DefaultErrors;

/** Get a label by its resource name. For more information, see [Search for labels](https://developers.google.com/workspace/drive/labels/guides/search-label). Resource name may be any of: * `labels/{id}` - See `labels/{id}@latest` * `labels/{id}@latest` - Gets the latest revision of the label. * `labels/{id}@published` - Gets the current published revision of the label. * `labels/{id}@{revision_id}` - Gets the label at the specified revision ID. */
export const getLabels: API.OperationMethod<
  GetLabelsRequest,
  GetLabelsResponse,
  GetLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLabelsRequest,
  output: GetLabelsResponse,
  errors: [],
}));

export interface UpdatePermissionsLabelsRequest {
  /** Required. The parent label resource name. */
  parent: string;
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaLabelPermission;
}

export const UpdatePermissionsLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
    body: Schema.optional(GoogleAppsDriveLabelsV2betaLabelPermission).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v2beta/labels/{labelsId}/permissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdatePermissionsLabelsRequest>;

export type UpdatePermissionsLabelsResponse =
  GoogleAppsDriveLabelsV2betaLabelPermission;
export const UpdatePermissionsLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabelPermission;

export type UpdatePermissionsLabelsError = DefaultErrors;

/** Updates a label's permissions. If a permission for the indicated principal doesn't exist, a label permission is created, otherwise the existing permission is updated. Permissions affect the label resource as a whole, aren't revisioned, and don't require publishing. */
export const updatePermissionsLabels: API.OperationMethod<
  UpdatePermissionsLabelsRequest,
  UpdatePermissionsLabelsResponse,
  UpdatePermissionsLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePermissionsLabelsRequest,
  output: UpdatePermissionsLabelsResponse,
  errors: [],
}));

export interface PublishLabelsRequest {
  /** Required. Label resource name. */
  name: string;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaPublishLabelRequest;
}

export const PublishLabelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAppsDriveLabelsV2betaPublishLabelRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2beta/labels/{labelsId}:publish",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PublishLabelsRequest>;

export type PublishLabelsResponse = GoogleAppsDriveLabelsV2betaLabel;
export const PublishLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabel;

export type PublishLabelsError = DefaultErrors;

/** Publish all draft changes to the label. Once published, the label may not return to its draft state. For more information, see [Create and publish a label](https://developers.google.com/workspace/drive/labels/guides/create-label). Publishing a label will result in a new published revision. All previous draft revisions will be deleted. Previous published revisions will be kept but are subject to automated deletion as needed. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). Once published, some changes are no longer permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label will be rejected. For example, the following changes to a label will be rejected after the label is published: * The label cannot be directly deleted. It must be disabled first, then deleted. * `Field.FieldType` cannot be changed. * Changes to field validation options cannot reject something that was previously accepted. * Reducing the maximum entries. */
export const publishLabels: API.OperationMethod<
  PublishLabelsRequest,
  PublishLabelsResponse,
  PublishLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PublishLabelsRequest,
  output: PublishLabelsResponse,
  errors: [],
}));

export interface DeleteLabelsRequest {
  /** The revision ID of the label that the write request will be applied to. If this isn't the latest revision of the label, the request will not be processed and will return a 400 Bad Request error. */
  "writeControl.requiredRevisionId"?: string;
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** Required. Label resource name. */
  name: string;
}

export const DeleteLabelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "writeControl.requiredRevisionId": Schema.optional(Schema.String).pipe(
    T.HttpQuery("writeControl.requiredRevisionId"),
  ),
  useAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useAdminAccess"),
  ),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta/labels/{labelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLabelsRequest>;

export type DeleteLabelsResponse = GoogleProtobufEmpty;
export const DeleteLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteLabelsError = DefaultErrors;

/** Permanently deletes a label and related metadata on Drive items. For more information, see [Disable, enable, and delete a label](https://developers.google.com/workspace/drive/labels/guides/disable-delete-label). Once deleted, the label and related Drive item metadata will be deleted. Only draft labels and disabled labels may be deleted. */
export const deleteLabels: API.OperationMethod<
  DeleteLabelsRequest,
  DeleteLabelsResponse,
  DeleteLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLabelsRequest,
  output: DeleteLabelsResponse,
  errors: [],
}));

export interface DeltaLabelsRequest {
  /** Required. The resource name of the label to update. */
  name: string;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequest;
}

export const DeltaLabelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(
    GoogleAppsDriveLabelsV2betaDeltaUpdateLabelRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2beta/labels/{labelsId}:delta",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<DeltaLabelsRequest>;

export type DeltaLabelsResponse =
  GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponse;
export const DeltaLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaDeltaUpdateLabelResponse;

export type DeltaLabelsError = DefaultErrors;

/** Updates a single label by applying a set of update requests resulting in a new draft revision. For more information, see [Update a label](https://developers.google.com/workspace/drive/labels/guides/update-label). The batch update is all-or-nothing: If any of the update requests are invalid, no changes are applied. The resulting draft revision must be published before the changes may be used with Drive items. */
export const deltaLabels: API.OperationMethod<
  DeltaLabelsRequest,
  DeltaLabelsResponse,
  DeltaLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeltaLabelsRequest,
  output: DeltaLabelsResponse,
  errors: [],
}));

export interface UpdateLabelCopyModeLabelsRequest {
  /** Required. The resource name of the label to update. */
  name: string;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaUpdateLabelCopyModeRequest;
}

export const UpdateLabelCopyModeLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleAppsDriveLabelsV2betaUpdateLabelCopyModeRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2beta/labels/{labelsId}:updateLabelCopyMode",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateLabelCopyModeLabelsRequest>;

export type UpdateLabelCopyModeLabelsResponse =
  GoogleAppsDriveLabelsV2betaLabel;
export const UpdateLabelCopyModeLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabel;

export type UpdateLabelCopyModeLabelsError = DefaultErrors;

/** Updates a label's `CopyMode`. Changes to this policy aren't revisioned, don't require publishing, and take effect immediately. */
export const updateLabelCopyModeLabels: API.OperationMethod<
  UpdateLabelCopyModeLabelsRequest,
  UpdateLabelCopyModeLabelsResponse,
  UpdateLabelCopyModeLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLabelCopyModeLabelsRequest,
  output: UpdateLabelCopyModeLabelsResponse,
  errors: [],
}));

export interface CreateLabelsRequest {
  /** Set to `true` in order to use the user's admin privileges. The server will verify the user is an admin before allowing access. */
  useAdminAccess?: boolean;
  /** The BCP-47 language code to use for evaluating localized field labels in response. When not specified, values in the default configured language will be used. */
  languageCode?: string;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaLabel;
}

export const CreateLabelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  useAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useAdminAccess"),
  ),
  languageCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("languageCode"),
  ),
  body: Schema.optional(GoogleAppsDriveLabelsV2betaLabel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta/labels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateLabelsRequest>;

export type CreateLabelsResponse = GoogleAppsDriveLabelsV2betaLabel;
export const CreateLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabel;

export type CreateLabelsError = DefaultErrors;

/** Creates a label. For more information, see [Create and publish a label](https://developers.google.com/workspace/drive/labels/guides/create-label). */
export const createLabels: API.OperationMethod<
  CreateLabelsRequest,
  CreateLabelsResponse,
  CreateLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateLabelsRequest,
  output: CreateLabelsResponse,
  errors: [],
}));

export interface UpdatePermissionsLabelsRevisionsRequest {
  /** Required. The parent label resource name. */
  parent: string;
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaLabelPermission;
}

export const UpdatePermissionsLabelsRevisionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
    body: Schema.optional(GoogleAppsDriveLabelsV2betaLabelPermission).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v2beta/labels/{labelsId}/revisions/{revisionsId}/permissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdatePermissionsLabelsRevisionsRequest>;

export type UpdatePermissionsLabelsRevisionsResponse =
  GoogleAppsDriveLabelsV2betaLabelPermission;
export const UpdatePermissionsLabelsRevisionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabelPermission;

export type UpdatePermissionsLabelsRevisionsError = DefaultErrors;

/** Updates a label's permissions. If a permission for the indicated principal doesn't exist, a label permission is created, otherwise the existing permission is updated. Permissions affect the label resource as a whole, aren't revisioned, and don't require publishing. */
export const updatePermissionsLabelsRevisions: API.OperationMethod<
  UpdatePermissionsLabelsRevisionsRequest,
  UpdatePermissionsLabelsRevisionsResponse,
  UpdatePermissionsLabelsRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePermissionsLabelsRevisionsRequest,
  output: UpdatePermissionsLabelsRevisionsResponse,
  errors: [],
}));

export interface ListLabelsRevisionsLocksRequest {
  /** Maximum number of locks to return per page. Default: 100. Max: 200. */
  pageSize?: number;
  /** Required. Label on which locks are applied. Format: `labels/{label}`. */
  parent: string;
  /** The token of the page to return. */
  pageToken?: string;
}

export const ListLabelsRevisionsLocksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2beta/labels/{labelsId}/revisions/{revisionsId}/locks",
    }),
    svc,
  ) as unknown as Schema.Schema<ListLabelsRevisionsLocksRequest>;

export type ListLabelsRevisionsLocksResponse =
  GoogleAppsDriveLabelsV2betaListLabelLocksResponse;
export const ListLabelsRevisionsLocksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaListLabelLocksResponse;

export type ListLabelsRevisionsLocksError = DefaultErrors;

/** Lists the label locks on a label. */
export const listLabelsRevisionsLocks: API.PaginatedOperationMethod<
  ListLabelsRevisionsLocksRequest,
  ListLabelsRevisionsLocksResponse,
  ListLabelsRevisionsLocksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLabelsRevisionsLocksRequest,
  output: ListLabelsRevisionsLocksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteLabelsRevisionsPermissionsRequest {
  /** Required. Label permission resource name. */
  name: string;
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
}

export const DeleteLabelsRevisionsPermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v2beta/labels/{labelsId}/revisions/{revisionsId}/permissions/{permissionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteLabelsRevisionsPermissionsRequest>;

export type DeleteLabelsRevisionsPermissionsResponse = GoogleProtobufEmpty;
export const DeleteLabelsRevisionsPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteLabelsRevisionsPermissionsError = DefaultErrors;

/** Deletes a label's permission. Permissions affect the label resource as a whole, aren't revisioned, and don't require publishing. */
export const deleteLabelsRevisionsPermissions: API.OperationMethod<
  DeleteLabelsRevisionsPermissionsRequest,
  DeleteLabelsRevisionsPermissionsResponse,
  DeleteLabelsRevisionsPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLabelsRevisionsPermissionsRequest,
  output: DeleteLabelsRevisionsPermissionsResponse,
  errors: [],
}));

export interface BatchUpdateLabelsRevisionsPermissionsRequest {
  /** Required. The parent label resource name shared by all permissions being updated. Format: `labels/{label}`. If this is set, the parent field in the `UpdateLabelPermissionRequest` messages must either be empty or match this field. */
  parent: string;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsRequest;
}

export const BatchUpdateLabelsRevisionsPermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2beta/labels/{labelsId}/revisions/{revisionsId}/permissions:batchUpdate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchUpdateLabelsRevisionsPermissionsRequest>;

export type BatchUpdateLabelsRevisionsPermissionsResponse =
  GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsResponse;
export const BatchUpdateLabelsRevisionsPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsResponse;

export type BatchUpdateLabelsRevisionsPermissionsError = DefaultErrors;

/** Updates label permissions. If a permission for the indicated principal doesn't exist, a label permission is created, otherwise the existing permission is updated. Permissions affect the label resource as a whole, aren't revisioned, and don't require publishing. */
export const batchUpdateLabelsRevisionsPermissions: API.OperationMethod<
  BatchUpdateLabelsRevisionsPermissionsRequest,
  BatchUpdateLabelsRevisionsPermissionsResponse,
  BatchUpdateLabelsRevisionsPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdateLabelsRevisionsPermissionsRequest,
  output: BatchUpdateLabelsRevisionsPermissionsResponse,
  errors: [],
}));

export interface CreateLabelsRevisionsPermissionsRequest {
  /** Required. The parent label resource name on the label permission is created. Format: `labels/{label}`. */
  parent: string;
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaLabelPermission;
}

export const CreateLabelsRevisionsPermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
    body: Schema.optional(GoogleAppsDriveLabelsV2betaLabelPermission).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2beta/labels/{labelsId}/revisions/{revisionsId}/permissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateLabelsRevisionsPermissionsRequest>;

export type CreateLabelsRevisionsPermissionsResponse =
  GoogleAppsDriveLabelsV2betaLabelPermission;
export const CreateLabelsRevisionsPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabelPermission;

export type CreateLabelsRevisionsPermissionsError = DefaultErrors;

/** Updates a label's permissions. If a permission for the indicated principal doesn't exist, a label permission is created, otherwise the existing permission is updated. Permissions affect the label resource as a whole, aren't revisioned, and don't require publishing. */
export const createLabelsRevisionsPermissions: API.OperationMethod<
  CreateLabelsRevisionsPermissionsRequest,
  CreateLabelsRevisionsPermissionsResponse,
  CreateLabelsRevisionsPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateLabelsRevisionsPermissionsRequest,
  output: CreateLabelsRevisionsPermissionsResponse,
  errors: [],
}));

export interface ListLabelsRevisionsPermissionsRequest {
  /** Maximum number of permissions to return per page. Default: 50. Max: 200. */
  pageSize?: number;
  /** Required. The parent label resource name on which label permissions are listed. Format: `labels/{label}`. */
  parent: string;
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** The token of the page to return. */
  pageToken?: string;
}

export const ListLabelsRevisionsPermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2beta/labels/{labelsId}/revisions/{revisionsId}/permissions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListLabelsRevisionsPermissionsRequest>;

export type ListLabelsRevisionsPermissionsResponse =
  GoogleAppsDriveLabelsV2betaListLabelPermissionsResponse;
export const ListLabelsRevisionsPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaListLabelPermissionsResponse;

export type ListLabelsRevisionsPermissionsError = DefaultErrors;

/** Lists a label's permissions. */
export const listLabelsRevisionsPermissions: API.PaginatedOperationMethod<
  ListLabelsRevisionsPermissionsRequest,
  ListLabelsRevisionsPermissionsResponse,
  ListLabelsRevisionsPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLabelsRevisionsPermissionsRequest,
  output: ListLabelsRevisionsPermissionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BatchDeleteLabelsRevisionsPermissionsRequest {
  /** Required. The parent label resource name shared by all permissions being deleted. Format: `labels/{label}`. If this is set, the parent field in the `UpdateLabelPermissionRequest` messages must either be empty or match this field. */
  parent: string;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaBatchDeleteLabelPermissionsRequest;
}

export const BatchDeleteLabelsRevisionsPermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleAppsDriveLabelsV2betaBatchDeleteLabelPermissionsRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2beta/labels/{labelsId}/revisions/{revisionsId}/permissions:batchDelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchDeleteLabelsRevisionsPermissionsRequest>;

export type BatchDeleteLabelsRevisionsPermissionsResponse = GoogleProtobufEmpty;
export const BatchDeleteLabelsRevisionsPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type BatchDeleteLabelsRevisionsPermissionsError = DefaultErrors;

/** Deletes label permissions. Permissions affect the label resource as a whole, aren't revisioned, and don't require publishing. */
export const batchDeleteLabelsRevisionsPermissions: API.OperationMethod<
  BatchDeleteLabelsRevisionsPermissionsRequest,
  BatchDeleteLabelsRevisionsPermissionsResponse,
  BatchDeleteLabelsRevisionsPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDeleteLabelsRevisionsPermissionsRequest,
  output: BatchDeleteLabelsRevisionsPermissionsResponse,
  errors: [],
}));

export interface ListLabelsLocksRequest {
  /** Required. Label on which locks are applied. Format: `labels/{label}`. */
  parent: string;
  /** The token of the page to return. */
  pageToken?: string;
  /** Maximum number of locks to return per page. Default: 100. Max: 200. */
  pageSize?: number;
}

export const ListLabelsLocksRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  },
).pipe(
  T.Http({ method: "GET", path: "v2beta/labels/{labelsId}/locks" }),
  svc,
) as unknown as Schema.Schema<ListLabelsLocksRequest>;

export type ListLabelsLocksResponse =
  GoogleAppsDriveLabelsV2betaListLabelLocksResponse;
export const ListLabelsLocksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaListLabelLocksResponse;

export type ListLabelsLocksError = DefaultErrors;

/** Lists the label locks on a label. */
export const listLabelsLocks: API.PaginatedOperationMethod<
  ListLabelsLocksRequest,
  ListLabelsLocksResponse,
  ListLabelsLocksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLabelsLocksRequest,
  output: ListLabelsLocksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListLabelsPermissionsRequest {
  /** Maximum number of permissions to return per page. Default: 50. Max: 200. */
  pageSize?: number;
  /** Required. The parent label resource name on which label permissions are listed. Format: `labels/{label}`. */
  parent: string;
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** The token of the page to return. */
  pageToken?: string;
}

export const ListLabelsPermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v2beta/labels/{labelsId}/permissions" }),
    svc,
  ) as unknown as Schema.Schema<ListLabelsPermissionsRequest>;

export type ListLabelsPermissionsResponse =
  GoogleAppsDriveLabelsV2betaListLabelPermissionsResponse;
export const ListLabelsPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaListLabelPermissionsResponse;

export type ListLabelsPermissionsError = DefaultErrors;

/** Lists a label's permissions. */
export const listLabelsPermissions: API.PaginatedOperationMethod<
  ListLabelsPermissionsRequest,
  ListLabelsPermissionsResponse,
  ListLabelsPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLabelsPermissionsRequest,
  output: ListLabelsPermissionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BatchDeleteLabelsPermissionsRequest {
  /** Required. The parent label resource name shared by all permissions being deleted. Format: `labels/{label}`. If this is set, the parent field in the `UpdateLabelPermissionRequest` messages must either be empty or match this field. */
  parent: string;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaBatchDeleteLabelPermissionsRequest;
}

export const BatchDeleteLabelsPermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleAppsDriveLabelsV2betaBatchDeleteLabelPermissionsRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2beta/labels/{labelsId}/permissions:batchDelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchDeleteLabelsPermissionsRequest>;

export type BatchDeleteLabelsPermissionsResponse = GoogleProtobufEmpty;
export const BatchDeleteLabelsPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type BatchDeleteLabelsPermissionsError = DefaultErrors;

/** Deletes label permissions. Permissions affect the label resource as a whole, aren't revisioned, and don't require publishing. */
export const batchDeleteLabelsPermissions: API.OperationMethod<
  BatchDeleteLabelsPermissionsRequest,
  BatchDeleteLabelsPermissionsResponse,
  BatchDeleteLabelsPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDeleteLabelsPermissionsRequest,
  output: BatchDeleteLabelsPermissionsResponse,
  errors: [],
}));

export interface DeleteLabelsPermissionsRequest {
  /** Required. Label permission resource name. */
  name: string;
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
}

export const DeleteLabelsPermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v2beta/labels/{labelsId}/permissions/{permissionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteLabelsPermissionsRequest>;

export type DeleteLabelsPermissionsResponse = GoogleProtobufEmpty;
export const DeleteLabelsPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteLabelsPermissionsError = DefaultErrors;

/** Deletes a label's permission. Permissions affect the label resource as a whole, aren't revisioned, and don't require publishing. */
export const deleteLabelsPermissions: API.OperationMethod<
  DeleteLabelsPermissionsRequest,
  DeleteLabelsPermissionsResponse,
  DeleteLabelsPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLabelsPermissionsRequest,
  output: DeleteLabelsPermissionsResponse,
  errors: [],
}));

export interface BatchUpdateLabelsPermissionsRequest {
  /** Required. The parent label resource name shared by all permissions being updated. Format: `labels/{label}`. If this is set, the parent field in the `UpdateLabelPermissionRequest` messages must either be empty or match this field. */
  parent: string;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsRequest;
}

export const BatchUpdateLabelsPermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2beta/labels/{labelsId}/permissions:batchUpdate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchUpdateLabelsPermissionsRequest>;

export type BatchUpdateLabelsPermissionsResponse =
  GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsResponse;
export const BatchUpdateLabelsPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaBatchUpdateLabelPermissionsResponse;

export type BatchUpdateLabelsPermissionsError = DefaultErrors;

/** Updates label permissions. If a permission for the indicated principal doesn't exist, a label permission is created, otherwise the existing permission is updated. Permissions affect the label resource as a whole, aren't revisioned, and don't require publishing. */
export const batchUpdateLabelsPermissions: API.OperationMethod<
  BatchUpdateLabelsPermissionsRequest,
  BatchUpdateLabelsPermissionsResponse,
  BatchUpdateLabelsPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdateLabelsPermissionsRequest,
  output: BatchUpdateLabelsPermissionsResponse,
  errors: [],
}));

export interface CreateLabelsPermissionsRequest {
  /** Required. The parent label resource name on the label permission is created. Format: `labels/{label}`. */
  parent: string;
  /** Set to `true` in order to use the user's admin credentials. The server will verify the user is an admin for the label before allowing access. */
  useAdminAccess?: boolean;
  /** Request body */
  body?: GoogleAppsDriveLabelsV2betaLabelPermission;
}

export const CreateLabelsPermissionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
    body: Schema.optional(GoogleAppsDriveLabelsV2betaLabelPermission).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2beta/labels/{labelsId}/permissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateLabelsPermissionsRequest>;

export type CreateLabelsPermissionsResponse =
  GoogleAppsDriveLabelsV2betaLabelPermission;
export const CreateLabelsPermissionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabelPermission;

export type CreateLabelsPermissionsError = DefaultErrors;

/** Updates a label's permissions. If a permission for the indicated principal doesn't exist, a label permission is created, otherwise the existing permission is updated. Permissions affect the label resource as a whole, aren't revisioned, and don't require publishing. */
export const createLabelsPermissions: API.OperationMethod<
  CreateLabelsPermissionsRequest,
  CreateLabelsPermissionsResponse,
  CreateLabelsPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateLabelsPermissionsRequest,
  output: CreateLabelsPermissionsResponse,
  errors: [],
}));

export interface GetLabelLimitsRequest {
  /** Required. Label revision resource name must be: "limits/label". */
  name?: string;
}

export const GetLabelLimitsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta/limits/label" }),
  svc,
) as unknown as Schema.Schema<GetLabelLimitsRequest>;

export type GetLabelLimitsResponse = GoogleAppsDriveLabelsV2betaLabelLimits;
export const GetLabelLimitsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleAppsDriveLabelsV2betaLabelLimits;

export type GetLabelLimitsError = DefaultErrors;

/** Get the constraints on the structure of a label; such as, the maximum number of fields allowed and maximum length of the label title. */
export const getLabelLimits: API.OperationMethod<
  GetLabelLimitsRequest,
  GetLabelLimitsResponse,
  GetLabelLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLabelLimitsRequest,
  output: GetLabelLimitsResponse,
  errors: [],
}));
