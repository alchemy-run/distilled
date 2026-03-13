// ==========================================================================
// Google Chat API (chat v1)
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
  name: "chat",
  version: "v1",
  rootUrl: "https://chat.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ActionParameter {
  /** The name of the parameter for the action script. */
  key?: string;
  /** The value of the parameter. */
  value?: string;
}

export const ActionParameter: Schema.Schema<ActionParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActionParameter",
  }) as any as Schema.Schema<ActionParameter>;

export interface FormAction {
  /** The method name is used to identify which part of the form triggered the form submission. This information is echoed back to the Chat app as part of the card click event. You can use the same method name for several elements that trigger a common behavior. */
  actionMethodName?: string;
  /** List of action parameters. */
  parameters?: Array<ActionParameter>;
}

export const FormAction: Schema.Schema<FormAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      actionMethodName: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Array(ActionParameter)),
    }),
  ).annotate({ identifier: "FormAction" }) as any as Schema.Schema<FormAction>;

export interface OpenLink {
  /** The URL to open. */
  url?: string;
}

export const OpenLink: Schema.Schema<OpenLink> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "OpenLink" }) as any as Schema.Schema<OpenLink>;

export interface OnClick {
  /** A form action is triggered by this `onclick` action if specified. */
  action?: FormAction;
  /** This `onclick` action triggers an open link action if specified. */
  openLink?: OpenLink;
}

export const OnClick: Schema.Schema<OnClick> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      action: Schema.optional(FormAction),
      openLink: Schema.optional(OpenLink),
    }),
  ).annotate({ identifier: "OnClick" }) as any as Schema.Schema<OnClick>;

export interface ImageButton {
  /** The `onclick` action. */
  onClick?: OnClick;
  /** The name of this `image_button` that's used for accessibility. Default value is provided if this name isn't specified. */
  name?: string;
  /** The icon specified by an `enum` that indices to an icon provided by Chat API. */
  icon?:
    | "ICON_UNSPECIFIED"
    | "AIRPLANE"
    | "BOOKMARK"
    | "BUS"
    | "CAR"
    | "CLOCK"
    | "CONFIRMATION_NUMBER_ICON"
    | "DOLLAR"
    | "DESCRIPTION"
    | "EMAIL"
    | "EVENT_PERFORMER"
    | "EVENT_SEAT"
    | "FLIGHT_ARRIVAL"
    | "FLIGHT_DEPARTURE"
    | "HOTEL"
    | "HOTEL_ROOM_TYPE"
    | "INVITE"
    | "MAP_PIN"
    | "MEMBERSHIP"
    | "MULTIPLE_PEOPLE"
    | "OFFER"
    | "PERSON"
    | "PHONE"
    | "RESTAURANT_ICON"
    | "SHOPPING_CART"
    | "STAR"
    | "STORE"
    | "TICKET"
    | "TRAIN"
    | "VIDEO_CAMERA"
    | "VIDEO_PLAY"
    | (string & {});
  /** The icon specified by a URL. */
  iconUrl?: string;
}

export const ImageButton: Schema.Schema<ImageButton> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      onClick: Schema.optional(OnClick),
      name: Schema.optional(Schema.String),
      icon: Schema.optional(Schema.String),
      iconUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImageButton",
  }) as any as Schema.Schema<ImageButton>;

export interface TextButton {
  /** The text of the button. */
  text?: string;
  /** The `onclick` action of the button. */
  onClick?: OnClick;
}

export const TextButton: Schema.Schema<TextButton> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      onClick: Schema.optional(OnClick),
    }),
  ).annotate({ identifier: "TextButton" }) as any as Schema.Schema<TextButton>;

export interface Button {
  /** A button with image and `onclick` action. */
  imageButton?: ImageButton;
  /** A button with text and `onclick` action. */
  textButton?: TextButton;
}

export const Button: Schema.Schema<Button> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageButton: Schema.optional(ImageButton),
      textButton: Schema.optional(TextButton),
    }),
  ).annotate({ identifier: "Button" }) as any as Schema.Schema<Button>;

export interface DateTimeInput {
  /** Whether the `datetime` input includes a timestamp. */
  hasTime?: boolean;
  /** Time since epoch time, in milliseconds. */
  msSinceEpoch?: string;
  /** Whether the `datetime` input includes a calendar date. */
  hasDate?: boolean;
}

export const DateTimeInput: Schema.Schema<DateTimeInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hasTime: Schema.optional(Schema.Boolean),
      msSinceEpoch: Schema.optional(Schema.String),
      hasDate: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DateTimeInput",
  }) as any as Schema.Schema<DateTimeInput>;

export interface DriveDataRef {
  /** The ID for the drive file. Use with the Drive API. */
  driveFileId?: string;
}

export const DriveDataRef: Schema.Schema<DriveDataRef> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      driveFileId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DriveDataRef",
  }) as any as Schema.Schema<DriveDataRef>;

export interface DriveLinkData {
  /** A [DriveDataRef](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages.attachments#drivedataref) which references a Google Drive file. */
  driveDataRef?: DriveDataRef;
  /** The mime type of the linked Google Drive resource. */
  mimeType?: string;
}

export const DriveLinkData: Schema.Schema<DriveLinkData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      driveDataRef: Schema.optional(DriveDataRef),
      mimeType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DriveLinkData",
  }) as any as Schema.Schema<DriveLinkData>;

export interface TimeZone {
  /** The [IANA TZ](https://www.iana.org/time-zones) time zone database code, such as "America/Toronto". */
  id?: string;
  /** The user timezone offset, in milliseconds, from Coordinated Universal Time (UTC). */
  offset?: number;
}

export const TimeZone: Schema.Schema<TimeZone> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      offset: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "TimeZone" }) as any as Schema.Schema<TimeZone>;

export interface DateInput {
  /** Time since epoch time, in milliseconds. */
  msSinceEpoch?: string;
}

export const DateInput: Schema.Schema<DateInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      msSinceEpoch: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "DateInput" }) as any as Schema.Schema<DateInput>;

export interface StringInputs {
  /** An list of strings entered by the user. */
  value?: Array<string>;
}

export const StringInputs: Schema.Schema<StringInputs> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "StringInputs",
  }) as any as Schema.Schema<StringInputs>;

export interface TimeInput {
  /** The number of minutes past the hour. Valid values are 0 to 59. */
  minutes?: number;
  /** The hour on a 24-hour clock. */
  hours?: number;
}

export const TimeInput: Schema.Schema<TimeInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      minutes: Schema.optional(Schema.Number),
      hours: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "TimeInput" }) as any as Schema.Schema<TimeInput>;

export interface Inputs {
  /** Date input values from a [`DateTimePicker`](https://developers.google.com/chat/api/reference/rest/v1/cards#DateTimePicker) widget that only accepts date values. */
  dateInput?: DateInput;
  /** A list of strings that represent the values that the user inputs in a widget. If the widget only accepts one value, such as a [`TextInput`](https://developers.google.com/chat/api/reference/rest/v1/cards#TextInput) widget, the list contains one string object. If the widget accepts multiple values, such as a [`SelectionInput`](https://developers.google.com/chat/api/reference/rest/v1/cards#selectioninput) widget of checkboxes, the list contains a string object for each value that the user inputs or selects. */
  stringInputs?: StringInputs;
  /** Date and time input values from a [`DateTimePicker`](https://developers.google.com/chat/api/reference/rest/v1/cards#DateTimePicker) widget that accepts both a date and time. */
  dateTimeInput?: DateTimeInput;
  /** Time input values from a [`DateTimePicker`](https://developers.google.com/chat/api/reference/rest/v1/cards#DateTimePicker) widget that only accepts time values. */
  timeInput?: TimeInput;
}

export const Inputs: Schema.Schema<Inputs> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dateInput: Schema.optional(DateInput),
      stringInputs: Schema.optional(StringInputs),
      dateTimeInput: Schema.optional(DateTimeInput),
      timeInput: Schema.optional(TimeInput),
    }),
  ).annotate({ identifier: "Inputs" }) as any as Schema.Schema<Inputs>;

export interface CommonEventObject {
  /** Indicates the host app the add-on is active in when the event object is generated. Possible values include the following: * `GMAIL` * `CALENDAR` * `DRIVE` * `DOCS` * `SHEETS` * `SLIDES` * `CHAT` */
  hostApp?:
    | "UNSPECIFIED_HOST_APP"
    | "GMAIL"
    | "CALENDAR"
    | "DRIVE"
    | "DEMO"
    | "DOCS"
    | "MEET"
    | "SHEETS"
    | "SLIDES"
    | "DRAWINGS"
    | "CHAT"
    | (string & {});
  /** The platform enum which indicates the platform where the event originates (`WEB`, `IOS`, or `ANDROID`). Not supported by Chat apps. */
  platform?: "UNKNOWN_PLATFORM" | "WEB" | "IOS" | "ANDROID" | (string & {});
  /** **Disabled by default.** The timezone ID and offset from Coordinated Universal Time (UTC). To turn on this field, you must set `addOns.common.useLocaleFromApp` to `true` in your add-on's manifest. Your add-on's scope list must also include `https://www.googleapis.com/auth/script.locale`. See [Accessing user locale and timezone](https://developers.google.com/workspace/add-ons/how-tos/access-user-locale) for more details. Only supported for the event types [`CARD_CLICKED`](https://developers.google.com/chat/api/reference/rest/v1/EventType#ENUM_VALUES.CARD_CLICKED) and [`SUBMIT_DIALOG`](https://developers.google.com/chat/api/reference/rest/v1/DialogEventType#ENUM_VALUES.SUBMIT_DIALOG). */
  timeZone?: TimeZone;
  /** A map containing the current values of the widgets in the displayed card. The map keys are the string IDs assigned with each widget. The structure of the map value object is dependent on the widget type: **Note**: The following examples are formatted for Apps Script's V8 runtime. If you're using Rhino runtime, you must add `[""]` after the value. For example, instead of `e.commonEventObject.formInputs.employeeName.stringInputs.value[0]`, format the event object as `e.commonEventObject.formInputs.employeeName[""].stringInputs.value[0]`. To learn more about runtimes in Apps Script, see the [V8 Runtime Overview](https://developers.google.com/apps-script/guides/v8-runtime). * Single-valued widgets (for example, a text box): a list of strings (only one element). **Example**: for a text input widget with `employeeName` as its ID, access the text input value with: `e.commonEventObject.formInputs.employeeName.stringInputs.value[0]`. * Multi-valued widgets (for example, checkbox groups): a list of strings. **Example**: for a multi-value widget with `participants` as its ID, access the value array with: `e.commonEventObject.formInputs.participants.stringInputs.value`. * **A date-time picker**: a [`DateTimeInput object`](https://developers.google.com/workspace/add-ons/concepts/event-objects#date-time-input). **Example**: For a picker with an ID of `myDTPicker`, access the [`DateTimeInput`](https://developers.google.com/workspace/add-ons/concepts/event-objects#date-time-input) object using `e.commonEventObject.formInputs.myDTPicker.dateTimeInput`. * **A date-only picker**: a [`DateInput object`](https://developers.google.com/workspace/add-ons/concepts/event-objects#date-input). **Example**: For a picker with an ID of `myDatePicker`, access the [`DateInput`](https://developers.google.com/workspace/add-ons/concepts/event-objects#date-input) object using `e.commonEventObject.formInputs.myDatePicker.dateInput`. * **A time-only picker**: a [`TimeInput object`](https://developers.google.com/workspace/add-ons/concepts/event-objects#time-input). **Example**: For a picker with an ID of `myTimePicker`, access the [`TimeInput`](https://developers.google.com/workspace/add-ons/concepts/event-objects#time-input) object using `e.commonEventObject.formInputs.myTimePicker.timeInput`. */
  formInputs?: Record<string, Inputs>;
  /** Any additional parameters you supply to an action using [`actionParameters`](https://developers.google.com/workspace/add-ons/reference/rpc/google.apps.card.v1#google.apps.card.v1.Action.ActionParameter) or [`Action.setParameters()`](https://developers.google.com/apps-script/reference/card-service/action#setparametersparameters). **Developer Preview:** For [add-ons that extend Google Chat](https://developers.google.com/workspace/add-ons/chat), to suggest items based on what the users type in multiselect menus, use the value of the `"autocomplete_widget_query"` key (`event.commonEventObject.parameters["autocomplete_widget_query"]`). You can use this value to query a database and suggest selectable items to users as they type. For details, see [Collect and process information from Google Chat users](https://developers.google.com/workspace/add-ons/chat/collect-information). */
  parameters?: Record<string, string>;
  /** Name of the function to invoke. This field doesn't populate for Google Workspace Add-ons that extend Google Chat. Instead, to receive function data like identifiers, add-ons that extend Chat should use the `parameters` field. See [Build interactive interfaces for Chat apps](https://developers.google.com/workspace/add-ons/chat/build). */
  invokedFunction?: string;
  /** **Disabled by default.** The user's language and country/region identifier in the format of [ISO 639](https://wikipedia.org/wiki/ISO_639_macrolanguage) language code-[ISO 3166](https://wikipedia.org/wiki/ISO_3166) country/region code. For example, `en-US`. To turn on this field, you must set `addOns.common.useLocaleFromApp` to `true` in your add-on's manifest. Your add-on's scope list must also include `https://www.googleapis.com/auth/script.locale`. See [Accessing user locale and timezone](https://developers.google.com/workspace/add-ons/how-tos/access-user-locale) for more details. */
  userLocale?: string;
}

export const CommonEventObject: Schema.Schema<CommonEventObject> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hostApp: Schema.optional(Schema.String),
      platform: Schema.optional(Schema.String),
      timeZone: Schema.optional(TimeZone),
      formInputs: Schema.optional(Schema.Record(Schema.String, Inputs)),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      invokedFunction: Schema.optional(Schema.String),
      userLocale: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CommonEventObject",
  }) as any as Schema.Schema<CommonEventObject>;

export interface GoogleAppsCardV1MaterialIcon {
  /** The icon name defined in the [Google Material Icon](https://fonts.google.com/icons), for example, `check_box`. Any invalid names are abandoned and replaced with empty string and results in the icon failing to render. */
  name?: string;
  /** Whether the icon renders as filled. Default value is false. To preview different icon settings, go to [Google Font Icons](https://fonts.google.com/icons) and adjust the settings under **Customize**. */
  fill?: boolean;
  /** The stroke weight of the icon. Choose from {100, 200, 300, 400, 500, 600, 700}. If absent, default value is 400. If any other value is specified, the default value is used. To preview different icon settings, go to [Google Font Icons](https://fonts.google.com/icons) and adjust the settings under **Customize**. */
  weight?: number;
  /** Weight and grade affect a symbol’s thickness. Adjustments to grade are more granular than adjustments to weight and have a small impact on the size of the symbol. Choose from {-25, 0, 200}. If absent, default value is 0. If any other value is specified, the default value is used. To preview different icon settings, go to [Google Font Icons](https://fonts.google.com/icons) and adjust the settings under **Customize**. */
  grade?: number;
}

export const GoogleAppsCardV1MaterialIcon: Schema.Schema<GoogleAppsCardV1MaterialIcon> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      fill: Schema.optional(Schema.Boolean),
      weight: Schema.optional(Schema.Number),
      grade: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1MaterialIcon",
  }) as any as Schema.Schema<GoogleAppsCardV1MaterialIcon>;

export interface GoogleAppsCardV1Icon {
  /** Display one of the [Google Material Icons](https://fonts.google.com/icons). For example, to display a [checkbox icon](https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acheck_box%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4048), use ``` "material_icon": { "name": "check_box" } ``` [Google Chat apps](https://developers.google.com/workspace/chat): */
  materialIcon?: GoogleAppsCardV1MaterialIcon;
  /** Display one of the built-in icons provided by Google Workspace. For example, to display an airplane icon, specify `AIRPLANE`. For a bus, specify `BUS`. For a full list of supported icons, see [built-in icons](https://developers.google.com/workspace/chat/format-messages#builtinicons). */
  knownIcon?: string;
  /** The crop style applied to the image. In some cases, applying a `CIRCLE` crop causes the image to be drawn larger than a built-in icon. */
  imageType?: "SQUARE" | "CIRCLE" | (string & {});
  /** Display a custom icon hosted at an HTTPS URL. For example: ``` "iconUrl": "https://developers.google.com/workspace/chat/images/quickstart-app-avatar.png" ``` Supported file types include `.png` and `.jpg`. */
  iconUrl?: string;
  /** Optional. A description of the icon used for accessibility. If unspecified, the default value `Button` is provided. As a best practice, you should set a helpful description for what the icon displays, and if applicable, what it does. For example, `A user's account portrait`, or `Opens a new browser tab and navigates to the Google Chat developer documentation at https://developers.google.com/workspace/chat`. If the icon is set in a `Button`, the `altText` appears as helper text when the user hovers over the button. However, if the button also sets `text`, the icon's `altText` is ignored. */
  altText?: string;
}

export const GoogleAppsCardV1Icon: Schema.Schema<GoogleAppsCardV1Icon> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      materialIcon: Schema.optional(GoogleAppsCardV1MaterialIcon),
      knownIcon: Schema.optional(Schema.String),
      imageType: Schema.optional(Schema.String),
      iconUrl: Schema.optional(Schema.String),
      altText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Icon",
  }) as any as Schema.Schema<GoogleAppsCardV1Icon>;

export interface GoogleAppsCardV1TextParagraph {
  /** The maximum number of lines of text that are displayed in the widget. If the text exceeds the specified maximum number of lines, the excess content is concealed behind a **show more** button. If the text is equal or shorter than the specified maximum number of lines, a **show more** button isn't displayed. The default value is 0, in which case all context is displayed. Negative values are ignored. */
  maxLines?: number;
  /** The syntax of the text. If not set, the text is rendered as HTML. [Google Chat apps](https://developers.google.com/workspace/chat): */
  textSyntax?: "TEXT_SYNTAX_UNSPECIFIED" | "HTML" | "MARKDOWN" | (string & {});
  /** The text that's shown in the widget. */
  text?: string;
}

export const GoogleAppsCardV1TextParagraph: Schema.Schema<GoogleAppsCardV1TextParagraph> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxLines: Schema.optional(Schema.Number),
      textSyntax: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1TextParagraph",
  }) as any as Schema.Schema<GoogleAppsCardV1TextParagraph>;

export interface GoogleAppsCardV1ActionParameter {
  /** The name of the parameter for the action script. */
  key?: string;
  /** The value of the parameter. */
  value?: string;
}

export const GoogleAppsCardV1ActionParameter: Schema.Schema<GoogleAppsCardV1ActionParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1ActionParameter",
  }) as any as Schema.Schema<GoogleAppsCardV1ActionParameter>;

export interface GoogleAppsCardV1Action {
  /** List of action parameters. */
  parameters?: Array<GoogleAppsCardV1ActionParameter>;
  /** Optional. If this is true, then all widgets are considered required by this action. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend): */
  allWidgetsAreRequired?: boolean;
  /** Optional. Required when opening a [dialog](https://developers.google.com/workspace/chat/dialogs). What to do in response to an interaction with a user, such as a user clicking a button in a card message. If unspecified, the app responds by executing an `action`—like opening a link or running a function—as normal. By specifying an `interaction`, the app can respond in special interactive ways. For example, by setting `interaction` to `OPEN_DIALOG`, the app can open a [dialog](https://developers.google.com/workspace/chat/dialogs). When specified, a loading indicator isn't shown. If specified for an add-on, the entire card is stripped and nothing is shown in the client. [Google Chat apps](https://developers.google.com/workspace/chat): */
  interaction?: "INTERACTION_UNSPECIFIED" | "OPEN_DIALOG" | (string & {});
  /** Indicates whether form values persist after the action. The default value is `false`. If `true`, form values remain after the action is triggered. To let the user make changes while the action is being processed, set [`LoadIndicator`](https://developers.google.com/workspace/add-ons/reference/rpc/google.apps.card.v1#loadindicator) to `NONE`. For [card messages](https://developers.google.com/workspace/chat/api/guides/v1/messages/create#create) in Chat apps, you must also set the action's [`ResponseType`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages#responsetype) to `UPDATE_MESSAGE` and use the same [`card_id`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages#CardWithId) from the card that contained the action. If `false`, the form values are cleared when the action is triggered. To prevent the user from making changes while the action is being processed, set [`LoadIndicator`](https://developers.google.com/workspace/add-ons/reference/rpc/google.apps.card.v1#loadindicator) to `SPINNER`. */
  persistValues?: boolean;
  /** Specifies the loading indicator that the action displays while making the call to the action. */
  loadIndicator?: "SPINNER" | "NONE" | (string & {});
  /** Optional. Fill this list with the names of widgets that this Action needs for a valid submission. If the widgets listed here don't have a value when this Action is invoked, the form submission is aborted. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend): */
  requiredWidgets?: Array<string>;
  /** A custom function to invoke when the containing element is clicked or otherwise activated. For example usage, see [Read form data](https://developers.google.com/workspace/chat/read-form-data). */
  function?: string;
}

export const GoogleAppsCardV1Action: Schema.Schema<GoogleAppsCardV1Action> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parameters: Schema.optional(
        Schema.Array(GoogleAppsCardV1ActionParameter),
      ),
      allWidgetsAreRequired: Schema.optional(Schema.Boolean),
      interaction: Schema.optional(Schema.String),
      persistValues: Schema.optional(Schema.Boolean),
      loadIndicator: Schema.optional(Schema.String),
      requiredWidgets: Schema.optional(Schema.Array(Schema.String)),
      function: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Action",
  }) as any as Schema.Schema<GoogleAppsCardV1Action>;

export interface GoogleAppsCardV1SwitchControl {
  /** The name by which the switch widget is identified in a form input event. For details about working with form inputs, see [Receive form data](https://developers.google.com/workspace/chat/read-form-data). */
  name?: string;
  /** When `true`, the switch is selected. */
  selected?: boolean;
  /** How the switch appears in the user interface. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend): */
  controlType?: "SWITCH" | "CHECKBOX" | "CHECK_BOX" | (string & {});
  /** The value entered by a user, returned as part of a form input event. For details about working with form inputs, see [Receive form data](https://developers.google.com/workspace/chat/read-form-data). */
  value?: string;
  /** The action to perform when the switch state is changed, such as what function to run. */
  onChangeAction?: GoogleAppsCardV1Action;
}

export const GoogleAppsCardV1SwitchControl: Schema.Schema<GoogleAppsCardV1SwitchControl> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      selected: Schema.optional(Schema.Boolean),
      controlType: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      onChangeAction: Schema.optional(GoogleAppsCardV1Action),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1SwitchControl",
  }) as any as Schema.Schema<GoogleAppsCardV1SwitchControl>;

export interface GoogleAppsCardV1UpdateVisibilityAction {
  /** The new visibility. */
  visibility?: "VISIBILITY_UNSPECIFIED" | "VISIBLE" | "HIDDEN" | (string & {});
}

export const GoogleAppsCardV1UpdateVisibilityAction: Schema.Schema<GoogleAppsCardV1UpdateVisibilityAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      visibility: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1UpdateVisibilityAction",
  }) as any as Schema.Schema<GoogleAppsCardV1UpdateVisibilityAction>;

export interface GoogleAppsCardV1CommonWidgetAction {
  /** The action to update the visibility of a widget. */
  updateVisibilityAction?: GoogleAppsCardV1UpdateVisibilityAction;
}

export const GoogleAppsCardV1CommonWidgetAction: Schema.Schema<GoogleAppsCardV1CommonWidgetAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updateVisibilityAction: Schema.optional(
        GoogleAppsCardV1UpdateVisibilityAction,
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1CommonWidgetAction",
  }) as any as Schema.Schema<GoogleAppsCardV1CommonWidgetAction>;

export interface GoogleAppsCardV1Trigger {
  /** The unique identifier of the ActionRule. */
  actionRuleId?: string;
}

export const GoogleAppsCardV1Trigger: Schema.Schema<GoogleAppsCardV1Trigger> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      actionRuleId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Trigger",
  }) as any as Schema.Schema<GoogleAppsCardV1Trigger>;

export interface GoogleAppsCardV1EventAction {
  /** The unique identifier of the ActionRule. */
  actionRuleId?: string;
  /** Common widget action. */
  commonWidgetAction?: GoogleAppsCardV1CommonWidgetAction;
  /** The list of triggers that will be triggered after the EventAction is executed. */
  postEventTriggers?: Array<GoogleAppsCardV1Trigger>;
}

export const GoogleAppsCardV1EventAction: Schema.Schema<GoogleAppsCardV1EventAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      actionRuleId: Schema.optional(Schema.String),
      commonWidgetAction: Schema.optional(GoogleAppsCardV1CommonWidgetAction),
      postEventTriggers: Schema.optional(Schema.Array(GoogleAppsCardV1Trigger)),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1EventAction",
  }) as any as Schema.Schema<GoogleAppsCardV1EventAction>;

export interface GoogleAppsCardV1ExpressionDataCondition {
  /** The type of the condition. */
  conditionType?:
    | "CONDITION_TYPE_UNSPECIFIED"
    | "EXPRESSION_EVALUATION_SUCCESS"
    | "EXPRESSION_EVALUATION_FAILURE"
    | (string & {});
}

export const GoogleAppsCardV1ExpressionDataCondition: Schema.Schema<GoogleAppsCardV1ExpressionDataCondition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conditionType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1ExpressionDataCondition",
  }) as any as Schema.Schema<GoogleAppsCardV1ExpressionDataCondition>;

export interface GoogleAppsCardV1Condition {
  /** The unique identifier of the ActionRule. */
  actionRuleId?: string;
  /** The condition that is determined by the expression data. */
  expressionDataCondition?: GoogleAppsCardV1ExpressionDataCondition;
}

export const GoogleAppsCardV1Condition: Schema.Schema<GoogleAppsCardV1Condition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      actionRuleId: Schema.optional(Schema.String),
      expressionDataCondition: Schema.optional(
        GoogleAppsCardV1ExpressionDataCondition,
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Condition",
  }) as any as Schema.Schema<GoogleAppsCardV1Condition>;

export interface GoogleAppsCardV1ExpressionData {
  /** The unique identifier of the ExpressionData. */
  id?: string;
  /** The uncompiled expression. */
  expression?: string;
  /** The list of actions that the ExpressionData can be used. */
  eventActions?: Array<GoogleAppsCardV1EventAction>;
  /** The list of conditions that are determined by the expression evaluation result. */
  conditions?: Array<GoogleAppsCardV1Condition>;
}

export const GoogleAppsCardV1ExpressionData: Schema.Schema<GoogleAppsCardV1ExpressionData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      expression: Schema.optional(Schema.String),
      eventActions: Schema.optional(Schema.Array(GoogleAppsCardV1EventAction)),
      conditions: Schema.optional(Schema.Array(GoogleAppsCardV1Condition)),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1ExpressionData",
  }) as any as Schema.Schema<GoogleAppsCardV1ExpressionData>;

export interface GoogleAppsCardV1CardAction {
  /** The label that displays as the action menu item. */
  actionLabel?: string;
  /** The `onClick` action for this action item. */
  onClick?: GoogleAppsCardV1OnClick;
}

export const GoogleAppsCardV1CardAction: Schema.Schema<GoogleAppsCardV1CardAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      actionLabel: Schema.optional(Schema.String),
      onClick: Schema.optional(GoogleAppsCardV1OnClick),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1CardAction",
  }) as any as Schema.Schema<GoogleAppsCardV1CardAction>;

export interface GoogleAppsCardV1CardFixedFooter {
  /** The secondary button of the fixed footer. The button must be a text button with text and color set. If `secondaryButton` is set, you must also set `primaryButton`. */
  secondaryButton?: GoogleAppsCardV1Button;
  /** The primary button of the fixed footer. The button must be a text button with text and color set. */
  primaryButton?: GoogleAppsCardV1Button;
}

export const GoogleAppsCardV1CardFixedFooter: Schema.Schema<GoogleAppsCardV1CardFixedFooter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      secondaryButton: Schema.optional(GoogleAppsCardV1Button),
      primaryButton: Schema.optional(GoogleAppsCardV1Button),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1CardFixedFooter",
  }) as any as Schema.Schema<GoogleAppsCardV1CardFixedFooter>;

export interface GoogleAppsCardV1CardHeader {
  /** Required. The title of the card header. The header has a fixed height: if both a title and subtitle are specified, each takes up one line. If only the title is specified, it takes up both lines. */
  title?: string;
  /** The subtitle of the card header. If specified, appears on its own line below the `title`. */
  subtitle?: string;
  /** The shape used to crop the image. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend): */
  imageType?: "SQUARE" | "CIRCLE" | (string & {});
  /** The HTTPS URL of the image in the card header. */
  imageUrl?: string;
  /** The alternative text of this image that's used for accessibility. */
  imageAltText?: string;
}

export const GoogleAppsCardV1CardHeader: Schema.Schema<GoogleAppsCardV1CardHeader> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      subtitle: Schema.optional(Schema.String),
      imageType: Schema.optional(Schema.String),
      imageUrl: Schema.optional(Schema.String),
      imageAltText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1CardHeader",
  }) as any as Schema.Schema<GoogleAppsCardV1CardHeader>;

export interface GoogleAppsCardV1CollapseControl {
  /** The horizontal alignment of the expand and collapse button. */
  horizontalAlignment?:
    | "HORIZONTAL_ALIGNMENT_UNSPECIFIED"
    | "START"
    | "CENTER"
    | "END"
    | (string & {});
  /** Optional. Define a customizable button to expand the section. Both expand_button and collapse_button field must be set. Only one field set will not take into effect. If this field isn't set, the default button is used. */
  expandButton?: GoogleAppsCardV1Button;
  /** Optional. Define a customizable button to collapse the section. Both expand_button and collapse_button field must be set. Only one field set will not take into effect. If this field isn't set, the default button is used. */
  collapseButton?: GoogleAppsCardV1Button;
}

export const GoogleAppsCardV1CollapseControl: Schema.Schema<GoogleAppsCardV1CollapseControl> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      horizontalAlignment: Schema.optional(Schema.String),
      expandButton: Schema.optional(GoogleAppsCardV1Button),
      collapseButton: Schema.optional(GoogleAppsCardV1Button),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1CollapseControl",
  }) as any as Schema.Schema<GoogleAppsCardV1CollapseControl>;

export interface SpaceDataSource {
  /** If set to `true`, the multiselect menu selects the current Google Chat space as an item by default. */
  defaultToCurrentSpace?: boolean;
}

export const SpaceDataSource: Schema.Schema<SpaceDataSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      defaultToCurrentSpace: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "SpaceDataSource",
  }) as any as Schema.Schema<SpaceDataSource>;

export interface ChatClientDataSourceMarkup {
  /** Google Chat spaces that the user is a member of. */
  spaceDataSource?: SpaceDataSource;
}

export const ChatClientDataSourceMarkup: Schema.Schema<ChatClientDataSourceMarkup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      spaceDataSource: Schema.optional(SpaceDataSource),
    }),
  ).annotate({
    identifier: "ChatClientDataSourceMarkup",
  }) as any as Schema.Schema<ChatClientDataSourceMarkup>;

export interface WorkflowDataSourceMarkup {
  /** Whether to include variables from the previous step in the data source. */
  includeVariables?: boolean;
  /** The type of data source. */
  type?: "UNKNOWN" | "USER" | "SPACE" | "USER_WITH_FREE_FORM" | (string & {});
}

export const WorkflowDataSourceMarkup: Schema.Schema<WorkflowDataSourceMarkup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      includeVariables: Schema.optional(Schema.Boolean),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkflowDataSourceMarkup",
  }) as any as Schema.Schema<WorkflowDataSourceMarkup>;

export interface HostAppDataSourceMarkup {
  /** A data source from Google Chat. */
  chatDataSource?: ChatClientDataSourceMarkup;
  /** A data source from Google Workflow. */
  workflowDataSource?: WorkflowDataSourceMarkup;
}

export const HostAppDataSourceMarkup: Schema.Schema<HostAppDataSourceMarkup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      chatDataSource: Schema.optional(ChatClientDataSourceMarkup),
      workflowDataSource: Schema.optional(WorkflowDataSourceMarkup),
    }),
  ).annotate({
    identifier: "HostAppDataSourceMarkup",
  }) as any as Schema.Schema<HostAppDataSourceMarkup>;

export interface GoogleAppsCardV1DateTimePicker {
  /** The name by which the `DateTimePicker` is identified in a form input event. For details about working with form inputs, see [Receive form data](https://developers.google.com/workspace/chat/read-form-data). */
  name?: string;
  /** Whether the widget supports inputting a date, a time, or the date and time. */
  type?: "DATE_AND_TIME" | "DATE_ONLY" | "TIME_ONLY" | (string & {});
  /** The default value displayed in the widget, in milliseconds since [Unix epoch time](https://en.wikipedia.org/wiki/Unix_time). Specify the value based on the type of picker (`DateTimePickerType`): * `DATE_AND_TIME`: a calendar date and time in UTC. For example, to represent January 1, 2023 at 12:00 PM UTC, use `1672574400000`. * `DATE_ONLY`: a calendar date at 00:00:00 UTC. For example, to represent January 1, 2023, use `1672531200000`. * `TIME_ONLY`: a time in UTC. For example, to represent 12:00 PM, use `43200000` (or `12 * 60 * 60 * 1000`). */
  valueMsEpoch?: string;
  /** A data source that's unique to a Google Workspace host application, such as Gmail emails, Google Calendar events, or Google Chat messages. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps. */
  hostAppDataSource?: HostAppDataSourceMarkup;
  /** The text that prompts users to input a date, a time, or a date and time. For example, if users are scheduling an appointment, use a label such as `Appointment date` or `Appointment date and time`. */
  label?: string;
  /** The number representing the time zone offset from UTC, in minutes. If set, the `value_ms_epoch` is displayed in the specified time zone. If unset, the value defaults to the user's time zone setting. */
  timezoneOffsetDate?: number;
  /** Triggered when the user clicks **Save** or **Clear** from the `DateTimePicker` interface. */
  onChangeAction?: GoogleAppsCardV1Action;
}

export const GoogleAppsCardV1DateTimePicker: Schema.Schema<GoogleAppsCardV1DateTimePicker> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      valueMsEpoch: Schema.optional(Schema.String),
      hostAppDataSource: Schema.optional(HostAppDataSourceMarkup),
      label: Schema.optional(Schema.String),
      timezoneOffsetDate: Schema.optional(Schema.Number),
      onChangeAction: Schema.optional(GoogleAppsCardV1Action),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1DateTimePicker",
  }) as any as Schema.Schema<GoogleAppsCardV1DateTimePicker>;

export interface GoogleAppsCardV1SelectionItem {
  /** The text that identifies or describes the item to users. */
  text?: string;
  startIconUri?: string;
  /** For multiselect menus, a text description or label that's displayed below the item's `text` field. */
  bottomText?: string;
  /** Whether the item is selected by default. If the selection input only accepts one value (such as for radio buttons or a dropdown menu), only set this field for one item. */
  selected?: boolean;
  /** The value associated with this item. The client should use this as a form input value. For details about working with form inputs, see [Receive form data](https://developers.google.com/workspace/chat/read-form-data). */
  value?: string;
}

export const GoogleAppsCardV1SelectionItem: Schema.Schema<GoogleAppsCardV1SelectionItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      startIconUri: Schema.optional(Schema.String),
      bottomText: Schema.optional(Schema.String),
      selected: Schema.optional(Schema.Boolean),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1SelectionItem",
  }) as any as Schema.Schema<GoogleAppsCardV1SelectionItem>;

export interface GoogleAppsCardV1PlatformDataSource {
  /** A data source shared by all Google Workspace applications, such as users in a Google Workspace organization. */
  commonDataSource?: "UNKNOWN" | "USER" | (string & {});
  /** A data source that's unique to a Google Workspace host application, such spaces in Google Chat. This field supports the Google API Client Libraries but isn't available in the Cloud Client Libraries. To learn more, see [Install the client libraries](https://developers.google.com/workspace/chat/libraries). */
  hostAppDataSource?: HostAppDataSourceMarkup;
}

export const GoogleAppsCardV1PlatformDataSource: Schema.Schema<GoogleAppsCardV1PlatformDataSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      commonDataSource: Schema.optional(Schema.String),
      hostAppDataSource: Schema.optional(HostAppDataSourceMarkup),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1PlatformDataSource",
  }) as any as Schema.Schema<GoogleAppsCardV1PlatformDataSource>;

export interface GoogleAppsCardV1DataSourceConfig {
  /** The data is from a Google Workspace application. */
  platformDataSource?: GoogleAppsCardV1PlatformDataSource;
  /** The minimum number of characters the user must enter before this data provider is triggered (i.e., before it starts returning results). */
  minCharactersTrigger?: number;
  /** The data is from a remote data provider. */
  remoteDataSource?: GoogleAppsCardV1Action;
}

export const GoogleAppsCardV1DataSourceConfig: Schema.Schema<GoogleAppsCardV1DataSourceConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      platformDataSource: Schema.optional(GoogleAppsCardV1PlatformDataSource),
      minCharactersTrigger: Schema.optional(Schema.Number),
      remoteDataSource: Schema.optional(GoogleAppsCardV1Action),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1DataSourceConfig",
  }) as any as Schema.Schema<GoogleAppsCardV1DataSourceConfig>;

export interface GoogleAppsCardV1SelectionInput {
  /** For multiselect menus, the number of text characters that a user inputs before the menu returns suggested selection items. If unset, the multiselect menu uses the following default values: * If the menu uses a static array of `SelectionInput` items, defaults to 0 characters and immediately populates items from the array. * If the menu uses a dynamic data source (`multi_select_data_source`), defaults to 3 characters before querying the data source to return suggested items. */
  multiSelectMinQueryLength?: number;
  /** If specified, the form is submitted when the selection changes. If not specified, you must specify a separate button that submits the form. For details about working with form inputs, see [Receive form data](https://developers.google.com/workspace/chat/read-form-data). */
  onChangeAction?: GoogleAppsCardV1Action;
  /** An external data source, such as a relational database. */
  externalDataSource?: GoogleAppsCardV1Action;
  /** An array of selectable items. For example, an array of radio buttons or checkboxes. Supports up to 100 items. */
  items?: Array<GoogleAppsCardV1SelectionItem>;
  /** A data source from Google Workspace. */
  platformDataSource?: GoogleAppsCardV1PlatformDataSource;
  /** Required. The name that identifies the selection input in a form input event. For details about working with form inputs, see [Receive form data](https://developers.google.com/workspace/chat/read-form-data). */
  name?: string;
  /** Optional. Text that appears below the selection input field meant to assist users by prompting them to enter a certain value. This text is always visible. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps. */
  hintText?: string;
  /** The text that appears above the selection input field in the user interface. Specify text that helps the user enter the information your app needs. For example, if users are selecting the urgency of a work ticket from a drop-down menu, the label might be "Urgency" or "Select urgency". */
  label?: string;
  /** The type of items that are displayed to users in a `SelectionInput` widget. Selection types support different types of interactions. For example, users can select one or more checkboxes, but they can only select one value from a dropdown menu. */
  type?:
    | "CHECK_BOX"
    | "RADIO_BUTTON"
    | "SWITCH"
    | "DROPDOWN"
    | "MULTI_SELECT"
    | (string & {});
  /** For multiselect menus, the maximum number of items that a user can select. Minimum value is 1 item. If unspecified, defaults to 3 items. */
  multiSelectMaxSelectedItems?: number;
  /** Optional. The data source configs for the selection control. This field provides more fine-grained control over the data source. If specified, the `multi_select_max_selected_items` field, `multi_select_min_query_length` field, `external_data_source` field and `platform_data_source` field are ignored. Available for Google Workspace add-ons that extend Google Workspace Studio. Available for the `Dropdown widget` in Google Chat apps. For the `Dropdown` widget in Google Chat apps, only one `DataSourceConfig` is supported. If multiple `DataSourceConfig`s are set, only the first one is used. */
  dataSourceConfigs?: Array<GoogleAppsCardV1DataSourceConfig>;
}

export const GoogleAppsCardV1SelectionInput: Schema.Schema<GoogleAppsCardV1SelectionInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      multiSelectMinQueryLength: Schema.optional(Schema.Number),
      onChangeAction: Schema.optional(GoogleAppsCardV1Action),
      externalDataSource: Schema.optional(GoogleAppsCardV1Action),
      items: Schema.optional(Schema.Array(GoogleAppsCardV1SelectionItem)),
      platformDataSource: Schema.optional(GoogleAppsCardV1PlatformDataSource),
      name: Schema.optional(Schema.String),
      hintText: Schema.optional(Schema.String),
      label: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      multiSelectMaxSelectedItems: Schema.optional(Schema.Number),
      dataSourceConfigs: Schema.optional(
        Schema.Array(GoogleAppsCardV1DataSourceConfig),
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1SelectionInput",
  }) as any as Schema.Schema<GoogleAppsCardV1SelectionInput>;

export interface GoogleAppsCardV1ImageCropStyle {
  /** The crop type. */
  type?:
    | "IMAGE_CROP_TYPE_UNSPECIFIED"
    | "SQUARE"
    | "CIRCLE"
    | "RECTANGLE_CUSTOM"
    | "RECTANGLE_4_3"
    | (string & {});
  /** The aspect ratio to use if the crop type is `RECTANGLE_CUSTOM`. For example, here's how to apply a 16:9 aspect ratio: ``` cropStyle { "type": "RECTANGLE_CUSTOM", "aspectRatio": 16/9 } ``` */
  aspectRatio?: number;
}

export const GoogleAppsCardV1ImageCropStyle: Schema.Schema<GoogleAppsCardV1ImageCropStyle> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      aspectRatio: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1ImageCropStyle",
  }) as any as Schema.Schema<GoogleAppsCardV1ImageCropStyle>;

export interface Color {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
  /** The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0). */
  alpha?: number;
}

export const Color: Schema.Schema<Color> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      red: Schema.optional(Schema.Number),
      blue: Schema.optional(Schema.Number),
      green: Schema.optional(Schema.Number),
      alpha: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Color" }) as any as Schema.Schema<Color>;

export interface GoogleAppsCardV1BorderStyle {
  /** The colors to use when the type is `BORDER_TYPE_STROKE`. To set the stroke color, specify a value for the `red`, `green`, and `blue` fields. The value must be a float number between 0 and 1 based on the RGB color value, where `0` (0/255) represents the absence of color and `1` (255/255) represents the maximum intensity of the color. For example, the following sets the color to red at its maximum intensity: ``` "color": { "red": 1, "green": 0, "blue": 0, } ``` The `alpha` field is unavailable for stroke color. If specified, this field is ignored. */
  strokeColor?: Color;
  /** The corner radius for the border. */
  cornerRadius?: number;
  /** The border type. */
  type?: "BORDER_TYPE_UNSPECIFIED" | "NO_BORDER" | "STROKE" | (string & {});
}

export const GoogleAppsCardV1BorderStyle: Schema.Schema<GoogleAppsCardV1BorderStyle> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      strokeColor: Schema.optional(Color),
      cornerRadius: Schema.optional(Schema.Number),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1BorderStyle",
  }) as any as Schema.Schema<GoogleAppsCardV1BorderStyle>;

export interface GoogleAppsCardV1ImageComponent {
  /** The image URL. */
  imageUri?: string;
  /** The crop style to apply to the image. */
  cropStyle?: GoogleAppsCardV1ImageCropStyle;
  /** The accessibility label for the image. */
  altText?: string;
  /** The border style to apply to the image. */
  borderStyle?: GoogleAppsCardV1BorderStyle;
}

export const GoogleAppsCardV1ImageComponent: Schema.Schema<GoogleAppsCardV1ImageComponent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageUri: Schema.optional(Schema.String),
      cropStyle: Schema.optional(GoogleAppsCardV1ImageCropStyle),
      altText: Schema.optional(Schema.String),
      borderStyle: Schema.optional(GoogleAppsCardV1BorderStyle),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1ImageComponent",
  }) as any as Schema.Schema<GoogleAppsCardV1ImageComponent>;

export interface GoogleAppsCardV1GridItem {
  /** The grid item's title. */
  title?: string;
  /** The grid item's subtitle. */
  subtitle?: string;
  /** A user-specified identifier for this grid item. This identifier is returned in the parent grid's `onClick` callback parameters. */
  id?: string;
  /** The image that displays in the grid item. */
  image?: GoogleAppsCardV1ImageComponent;
  /** The layout to use for the grid item. */
  layout?:
    | "GRID_ITEM_LAYOUT_UNSPECIFIED"
    | "TEXT_BELOW"
    | "TEXT_ABOVE"
    | (string & {});
}

export const GoogleAppsCardV1GridItem: Schema.Schema<GoogleAppsCardV1GridItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      subtitle: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      image: Schema.optional(GoogleAppsCardV1ImageComponent),
      layout: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1GridItem",
  }) as any as Schema.Schema<GoogleAppsCardV1GridItem>;

export interface GoogleAppsCardV1Grid {
  /** The number of columns to display in the grid. A default value is used if this field isn't specified, and that default value is different depending on where the grid is shown (dialog versus companion). */
  columnCount?: number;
  /** The items to display in the grid. */
  items?: Array<GoogleAppsCardV1GridItem>;
  /** The text that displays in the grid header. */
  title?: string;
  /** The border style to apply to each grid item. */
  borderStyle?: GoogleAppsCardV1BorderStyle;
  /** This callback is reused by each individual grid item, but with the item's identifier and index in the items list added to the callback's parameters. */
  onClick?: GoogleAppsCardV1OnClick;
}

export const GoogleAppsCardV1Grid: Schema.Schema<GoogleAppsCardV1Grid> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      columnCount: Schema.optional(Schema.Number),
      items: Schema.optional(Schema.Array(GoogleAppsCardV1GridItem)),
      title: Schema.optional(Schema.String),
      borderStyle: Schema.optional(GoogleAppsCardV1BorderStyle),
      onClick: Schema.optional(GoogleAppsCardV1OnClick),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Grid",
  }) as any as Schema.Schema<GoogleAppsCardV1Grid>;

export interface GoogleAppsCardV1ButtonList {
  /** An array of buttons. */
  buttons?: Array<GoogleAppsCardV1Button>;
}

export const GoogleAppsCardV1ButtonList: Schema.Schema<GoogleAppsCardV1ButtonList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      buttons: Schema.optional(Schema.Array(GoogleAppsCardV1Button)),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1ButtonList",
  }) as any as Schema.Schema<GoogleAppsCardV1ButtonList>;

export interface GoogleAppsCardV1Image {
  /** The alternative text of this image that's used for accessibility. */
  altText?: string;
  /** The HTTPS URL that hosts the image. For example: ``` https://developers.google.com/workspace/chat/images/quickstart-app-avatar.png ``` */
  imageUrl?: string;
  /** When a user clicks the image, the click triggers this action. */
  onClick?: GoogleAppsCardV1OnClick;
}

export const GoogleAppsCardV1Image: Schema.Schema<GoogleAppsCardV1Image> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      altText: Schema.optional(Schema.String),
      imageUrl: Schema.optional(Schema.String),
      onClick: Schema.optional(GoogleAppsCardV1OnClick),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Image",
  }) as any as Schema.Schema<GoogleAppsCardV1Image>;

export interface GoogleAppsCardV1NestedWidget {
  /** A button list widget. */
  buttonList?: GoogleAppsCardV1ButtonList;
  /** An image widget. */
  image?: GoogleAppsCardV1Image;
  /** A text paragraph widget. */
  textParagraph?: GoogleAppsCardV1TextParagraph;
}

export const GoogleAppsCardV1NestedWidget: Schema.Schema<GoogleAppsCardV1NestedWidget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      buttonList: Schema.optional(GoogleAppsCardV1ButtonList),
      image: Schema.optional(GoogleAppsCardV1Image),
      textParagraph: Schema.optional(GoogleAppsCardV1TextParagraph),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1NestedWidget",
  }) as any as Schema.Schema<GoogleAppsCardV1NestedWidget>;

export interface GoogleAppsCardV1CarouselCard {
  /** A list of widgets displayed at the bottom of the carousel card. The widgets are displayed in the order that they are specified. */
  footerWidgets?: Array<GoogleAppsCardV1NestedWidget>;
  /** A list of widgets displayed in the carousel card. The widgets are displayed in the order that they are specified. */
  widgets?: Array<GoogleAppsCardV1NestedWidget>;
}

export const GoogleAppsCardV1CarouselCard: Schema.Schema<GoogleAppsCardV1CarouselCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      footerWidgets: Schema.optional(
        Schema.Array(GoogleAppsCardV1NestedWidget),
      ),
      widgets: Schema.optional(Schema.Array(GoogleAppsCardV1NestedWidget)),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1CarouselCard",
  }) as any as Schema.Schema<GoogleAppsCardV1CarouselCard>;

export interface GoogleAppsCardV1Carousel {
  /** A list of cards included in the carousel. */
  carouselCards?: Array<GoogleAppsCardV1CarouselCard>;
}

export const GoogleAppsCardV1Carousel: Schema.Schema<GoogleAppsCardV1Carousel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      carouselCards: Schema.optional(
        Schema.Array(GoogleAppsCardV1CarouselCard),
      ),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Carousel",
  }) as any as Schema.Schema<GoogleAppsCardV1Carousel>;

export interface GoogleAppsCardV1Chip {
  /** The icon image. If both `icon` and `text` are set, then the icon appears before the text. */
  icon?: GoogleAppsCardV1Icon;
  /** Whether the chip is in an active state and responds to user actions. Defaults to `true`. Deprecated. Use `disabled` instead. */
  enabled?: boolean;
  /** The text displayed inside the chip. */
  label?: string;
  /** The alternative text that's used for accessibility. Set descriptive text that lets users know what the chip does. For example, if a chip opens a hyperlink, write: "Opens a new browser tab and navigates to the Google Chat developer documentation at https://developers.google.com/workspace/chat". */
  altText?: string;
  /** Optional. The action to perform when a user clicks the chip, such as opening a hyperlink or running a custom function. */
  onClick?: GoogleAppsCardV1OnClick;
  /** Whether the chip is in an inactive state and ignores user actions. Defaults to `false`. */
  disabled?: boolean;
}

export const GoogleAppsCardV1Chip: Schema.Schema<GoogleAppsCardV1Chip> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      icon: Schema.optional(GoogleAppsCardV1Icon),
      enabled: Schema.optional(Schema.Boolean),
      label: Schema.optional(Schema.String),
      altText: Schema.optional(Schema.String),
      onClick: Schema.optional(GoogleAppsCardV1OnClick),
      disabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Chip",
  }) as any as Schema.Schema<GoogleAppsCardV1Chip>;

export interface GoogleAppsCardV1ChipList {
  /** Specified chip list layout. */
  layout?:
    | "LAYOUT_UNSPECIFIED"
    | "WRAPPED"
    | "HORIZONTAL_SCROLLABLE"
    | (string & {});
  /** An array of chips. */
  chips?: Array<GoogleAppsCardV1Chip>;
}

export const GoogleAppsCardV1ChipList: Schema.Schema<GoogleAppsCardV1ChipList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      layout: Schema.optional(Schema.String),
      chips: Schema.optional(Schema.Array(GoogleAppsCardV1Chip)),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1ChipList",
  }) as any as Schema.Schema<GoogleAppsCardV1ChipList>;

export interface GoogleAppsCardV1SuggestionItem {
  /** The value of a suggested input to a text input field. This is equivalent to what users enter themselves. */
  text?: string;
}

export const GoogleAppsCardV1SuggestionItem: Schema.Schema<GoogleAppsCardV1SuggestionItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1SuggestionItem",
  }) as any as Schema.Schema<GoogleAppsCardV1SuggestionItem>;

export interface GoogleAppsCardV1Suggestions {
  /** A list of suggestions used for autocomplete recommendations in text input fields. */
  items?: Array<GoogleAppsCardV1SuggestionItem>;
}

export const GoogleAppsCardV1Suggestions: Schema.Schema<GoogleAppsCardV1Suggestions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(GoogleAppsCardV1SuggestionItem)),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Suggestions",
  }) as any as Schema.Schema<GoogleAppsCardV1Suggestions>;

export interface GoogleAppsCardV1Validation {
  /** Specify the character limit for text input widgets. Note that this is only used for text input and is ignored for other widgets. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend): */
  characterLimit?: number;
  /** Specify the type of the input widgets. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend): */
  inputType?:
    | "INPUT_TYPE_UNSPECIFIED"
    | "TEXT"
    | "INTEGER"
    | "FLOAT"
    | "EMAIL"
    | "EMOJI_PICKER"
    | (string & {});
}

export const GoogleAppsCardV1Validation: Schema.Schema<GoogleAppsCardV1Validation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      characterLimit: Schema.optional(Schema.Number),
      inputType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Validation",
  }) as any as Schema.Schema<GoogleAppsCardV1Validation>;

export interface GoogleAppsCardV1TextInput {
  /** Text that appears in the text input field when the field is empty. Use this text to prompt users to enter a value. For example, `Enter a number from 0 to 100`. [Google Chat apps](https://developers.google.com/workspace/chat): */
  placeholderText?: string;
  /** How a text input field appears in the user interface. For example, whether the field is single or multi-line. */
  type?: "SINGLE_LINE" | "MULTIPLE_LINE" | (string & {});
  /** The text that appears above the text input field in the user interface. Specify text that helps the user enter the information your app needs. For example, if you are asking someone's name, but specifically need their surname, write `surname` instead of `name`. Required if `hintText` is unspecified. Otherwise, optional. */
  label?: string;
  /** The value entered by a user, returned as part of a form input event. For details about working with form inputs, see [Receive form data](https://developers.google.com/workspace/chat/read-form-data). */
  value?: string;
  /** Suggested values that users can enter. These values appear when users click inside the text input field. As users type, the suggested values dynamically filter to match what the users have typed. For example, a text input field for programming language might suggest Java, JavaScript, Python, and C++. When users start typing `Jav`, the list of suggestions filters to show just `Java` and `JavaScript`. Suggested values help guide users to enter values that your app can make sense of. When referring to JavaScript, some users might enter `javascript` and others `java script`. Suggesting `JavaScript` can standardize how users interact with your app. When specified, `TextInput.type` is always `SINGLE_LINE`, even if it's set to `MULTIPLE_LINE`. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend): */
  initialSuggestions?: GoogleAppsCardV1Suggestions;
  /** Optional. Specify what action to take when the text input field provides suggestions to users who interact with it. If unspecified, the suggestions are set by `initialSuggestions` and are processed by the client. If specified, the app takes the action specified here, such as running a custom function. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): */
  autoCompleteAction?: GoogleAppsCardV1Action;
  /** The name by which the text input is identified in a form input event. For details about working with form inputs, see [Receive form data](https://developers.google.com/workspace/chat/read-form-data). */
  name?: string;
  /** Text that appears below the text input field meant to assist users by prompting them to enter a certain value. This text is always visible. Required if `label` is unspecified. Otherwise, optional. */
  hintText?: string;
  /** What to do when a change occurs in the text input field. For example, a user adding to the field or deleting text. Examples of actions to take include running a custom function or opening a [dialog](https://developers.google.com/workspace/chat/dialogs) in Google Chat. */
  onChangeAction?: GoogleAppsCardV1Action;
  /** Specify the input format validation necessary for this text field. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend): */
  validation?: GoogleAppsCardV1Validation;
  /** A data source that's unique to a Google Workspace host application, such as Gmail emails, Google Calendar events, or Google Chat messages. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps. */
  hostAppDataSource?: HostAppDataSourceMarkup;
}

export const GoogleAppsCardV1TextInput: Schema.Schema<GoogleAppsCardV1TextInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      placeholderText: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      label: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      initialSuggestions: Schema.optional(GoogleAppsCardV1Suggestions),
      autoCompleteAction: Schema.optional(GoogleAppsCardV1Action),
      name: Schema.optional(Schema.String),
      hintText: Schema.optional(Schema.String),
      onChangeAction: Schema.optional(GoogleAppsCardV1Action),
      validation: Schema.optional(GoogleAppsCardV1Validation),
      hostAppDataSource: Schema.optional(HostAppDataSourceMarkup),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1TextInput",
  }) as any as Schema.Schema<GoogleAppsCardV1TextInput>;

export interface GoogleAppsCardV1Widgets {
  /** DecoratedText widget. */
  decoratedText?: GoogleAppsCardV1DecoratedText;
  /** SelectionInput widget. */
  selectionInput?: GoogleAppsCardV1SelectionInput;
  /** Image widget. */
  image?: GoogleAppsCardV1Image;
  /** DateTimePicker widget. */
  dateTimePicker?: GoogleAppsCardV1DateTimePicker;
  /** ChipList widget. */
  chipList?: GoogleAppsCardV1ChipList;
  /** TextParagraph widget. */
  textParagraph?: GoogleAppsCardV1TextParagraph;
  /** TextInput widget. */
  textInput?: GoogleAppsCardV1TextInput;
  /** ButtonList widget. */
  buttonList?: GoogleAppsCardV1ButtonList;
}

export const GoogleAppsCardV1Widgets: Schema.Schema<GoogleAppsCardV1Widgets> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      decoratedText: Schema.optional(GoogleAppsCardV1DecoratedText),
      selectionInput: Schema.optional(GoogleAppsCardV1SelectionInput),
      image: Schema.optional(GoogleAppsCardV1Image),
      dateTimePicker: Schema.optional(GoogleAppsCardV1DateTimePicker),
      chipList: Schema.optional(GoogleAppsCardV1ChipList),
      textParagraph: Schema.optional(GoogleAppsCardV1TextParagraph),
      textInput: Schema.optional(GoogleAppsCardV1TextInput),
      buttonList: Schema.optional(GoogleAppsCardV1ButtonList),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Widgets",
  }) as any as Schema.Schema<GoogleAppsCardV1Widgets>;

export interface GoogleAppsCardV1Column {
  /** Specifies how a column fills the width of the card. */
  horizontalSizeStyle?:
    | "HORIZONTAL_SIZE_STYLE_UNSPECIFIED"
    | "FILL_AVAILABLE_SPACE"
    | "FILL_MINIMUM_SPACE"
    | (string & {});
  /** Specifies whether widgets align to the top, bottom, or center of a column. */
  verticalAlignment?:
    | "VERTICAL_ALIGNMENT_UNSPECIFIED"
    | "CENTER"
    | "TOP"
    | "BOTTOM"
    | (string & {});
  /** An array of widgets included in a column. Widgets appear in the order that they are specified. */
  widgets?: Array<GoogleAppsCardV1Widgets>;
  /** Specifies whether widgets align to the left, right, or center of a column. */
  horizontalAlignment?:
    | "HORIZONTAL_ALIGNMENT_UNSPECIFIED"
    | "START"
    | "CENTER"
    | "END"
    | (string & {});
}

export const GoogleAppsCardV1Column: Schema.Schema<GoogleAppsCardV1Column> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      horizontalSizeStyle: Schema.optional(Schema.String),
      verticalAlignment: Schema.optional(Schema.String),
      widgets: Schema.optional(Schema.Array(GoogleAppsCardV1Widgets)),
      horizontalAlignment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Column",
  }) as any as Schema.Schema<GoogleAppsCardV1Column>;

export interface GoogleAppsCardV1Columns {
  /** An array of columns. You can include up to 2 columns in a card or dialog. */
  columnItems?: Array<GoogleAppsCardV1Column>;
}

export const GoogleAppsCardV1Columns: Schema.Schema<GoogleAppsCardV1Columns> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      columnItems: Schema.optional(Schema.Array(GoogleAppsCardV1Column)),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Columns",
  }) as any as Schema.Schema<GoogleAppsCardV1Columns>;

export interface GoogleAppsCardV1Divider {}

export const GoogleAppsCardV1Divider: Schema.Schema<GoogleAppsCardV1Divider> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleAppsCardV1Divider",
  }) as any as Schema.Schema<GoogleAppsCardV1Divider>;

export interface GoogleAppsCardV1Widget {
  /** Displays a widget that lets users input a date, time, or date and time. For example, the following JSON creates a date time picker to schedule an appointment: ``` "dateTimePicker": { "name": "appointment_time", "label": "Book your appointment at:", "type": "DATE_AND_TIME", "valueMsEpoch": 796435200000 } ``` */
  dateTimePicker?: GoogleAppsCardV1DateTimePicker;
  /** Displays a decorated text item. For example, the following JSON creates a decorated text widget showing email address: ``` "decoratedText": { "icon": { "knownIcon": "EMAIL" }, "topLabel": "Email Address", "text": "sasha@example.com", "bottomLabel": "This is a new Email address!", "switchControl": { "name": "has_send_welcome_email_to_sasha", "selected": false, "controlType": "CHECKBOX" } } ``` */
  decoratedText?: GoogleAppsCardV1DecoratedText;
  /** Displays a selection control that lets users select items. Selection controls can be checkboxes, radio buttons, switches, or dropdown menus. For example, the following JSON creates a dropdown menu that lets users choose a size: ``` "selectionInput": { "name": "size", "label": "Size" "type": "DROPDOWN", "items": [ { "text": "S", "value": "small", "selected": false }, { "text": "M", "value": "medium", "selected": true }, { "text": "L", "value": "large", "selected": false }, { "text": "XL", "value": "extra_large", "selected": false } ] } ``` */
  selectionInput?: GoogleAppsCardV1SelectionInput;
  /** Displays a grid with a collection of items. A grid supports any number of columns and items. The number of rows is determined by the upper bounds of the number items divided by the number of columns. A grid with 10 items and 2 columns has 5 rows. A grid with 11 items and 2 columns has 6 rows. [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend): For example, the following JSON creates a 2 column grid with a single item: ``` "grid": { "title": "A fine collection of items", "columnCount": 2, "borderStyle": { "type": "STROKE", "cornerRadius": 4 }, "items": [ { "image": { "imageUri": "https://www.example.com/image.png", "cropStyle": { "type": "SQUARE" }, "borderStyle": { "type": "STROKE" } }, "title": "An item", "textAlignment": "CENTER" } ], "onClick": { "openLink": { "url": "https://www.example.com" } } } ``` */
  grid?: GoogleAppsCardV1Grid;
  /** A carousel contains a collection of nested widgets. For example, this is a JSON representation of a carousel that contains two text paragraphs. ``` { "widgets": [ { "textParagraph": { "text": "First text paragraph in the carousel." } }, { "textParagraph": { "text": "Second text paragraph in the carousel." } } ] } ``` */
  carousel?: GoogleAppsCardV1Carousel;
  /** Displays up to 2 columns. To include more than 2 columns, or to use rows, use the `Grid` widget. For example, the following JSON creates 2 columns that each contain text paragraphs: ``` "columns": { "columnItems": [ { "horizontalSizeStyle": "FILL_AVAILABLE_SPACE", "horizontalAlignment": "CENTER", "verticalAlignment": "CENTER", "widgets": [ { "textParagraph": { "text": "First column text paragraph" } } ] }, { "horizontalSizeStyle": "FILL_AVAILABLE_SPACE", "horizontalAlignment": "CENTER", "verticalAlignment": "CENTER", "widgets": [ { "textParagraph": { "text": "Second column text paragraph" } } ] } ] } ``` */
  columns?: GoogleAppsCardV1Columns;
  /** Specifies the event actions that can be performed on the widget. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps. */
  eventActions?: Array<GoogleAppsCardV1EventAction>;
  /** Displays a horizontal line divider between widgets. For example, the following JSON creates a divider: ``` "divider": { } ``` */
  divider?: GoogleAppsCardV1Divider;
  /** A unique ID assigned to the widget that's used to identify the widget to be mutated. The ID has a character limit of 64 characters and should be in the format of `[a-zA-Z0-9-]+`. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps. */
  id?: string;
  /** Displays an image. For example, the following JSON creates an image with alternative text: ``` "image": { "imageUrl": "https://developers.google.com/workspace/chat/images/quickstart-app-avatar.png", "altText": "Chat app avatar" } ``` */
  image?: GoogleAppsCardV1Image;
  /** Specifies whether widgets align to the left, right, or center of a column. */
  horizontalAlignment?:
    | "HORIZONTAL_ALIGNMENT_UNSPECIFIED"
    | "START"
    | "CENTER"
    | "END"
    | (string & {});
  /** A list of buttons. For example, the following JSON creates two buttons. The first is a blue text button and the second is an image button that opens a link: ``` "buttonList": { "buttons": [ { "text": "Edit", "color": { "red": 0, "green": 0, "blue": 1, }, "disabled": true, }, { "icon": { "knownIcon": "INVITE", "altText": "check calendar" }, "onClick": { "openLink": { "url": "https://example.com/calendar" } } } ] } ``` */
  buttonList?: GoogleAppsCardV1ButtonList;
  /** A list of chips. For example, the following JSON creates two chips. The first is a text chip and the second is an icon chip that opens a link: ``` "chipList": { "chips": [ { "text": "Edit", "disabled": true, }, { "icon": { "knownIcon": "INVITE", "altText": "check calendar" }, "onClick": { "openLink": { "url": "https://example.com/calendar" } } } ] } ``` */
  chipList?: GoogleAppsCardV1ChipList;
  /** Specifies whether the widget is visible or hidden. The default value is `VISIBLE`. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps. */
  visibility?: "VISIBILITY_UNSPECIFIED" | "VISIBLE" | "HIDDEN" | (string & {});
  /** Displays a text paragraph. Supports simple HTML formatted text. For more information about formatting text, see [Formatting text in Google Chat apps](https://developers.google.com/workspace/chat/format-messages#card-formatting) and [Formatting text in Google Workspace add-ons](https://developers.google.com/apps-script/add-ons/concepts/widgets#text_formatting). For example, the following JSON creates a bolded text: ``` "textParagraph": { "text": " *bold text*" } ``` */
  textParagraph?: GoogleAppsCardV1TextParagraph;
  /** Displays a text box that users can type into. For example, the following JSON creates a text input for an email address: ``` "textInput": { "name": "mailing_address", "label": "Mailing Address" } ``` As another example, the following JSON creates a text input for a programming language with static suggestions: ``` "textInput": { "name": "preferred_programing_language", "label": "Preferred Language", "initialSuggestions": { "items": [ { "text": "C++" }, { "text": "Java" }, { "text": "JavaScript" }, { "text": "Python" } ] } } ``` */
  textInput?: GoogleAppsCardV1TextInput;
}

export const GoogleAppsCardV1Widget: Schema.Schema<GoogleAppsCardV1Widget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dateTimePicker: Schema.optional(GoogleAppsCardV1DateTimePicker),
      decoratedText: Schema.optional(GoogleAppsCardV1DecoratedText),
      selectionInput: Schema.optional(GoogleAppsCardV1SelectionInput),
      grid: Schema.optional(GoogleAppsCardV1Grid),
      carousel: Schema.optional(GoogleAppsCardV1Carousel),
      columns: Schema.optional(GoogleAppsCardV1Columns),
      eventActions: Schema.optional(Schema.Array(GoogleAppsCardV1EventAction)),
      divider: Schema.optional(GoogleAppsCardV1Divider),
      id: Schema.optional(Schema.String),
      image: Schema.optional(GoogleAppsCardV1Image),
      horizontalAlignment: Schema.optional(Schema.String),
      buttonList: Schema.optional(GoogleAppsCardV1ButtonList),
      chipList: Schema.optional(GoogleAppsCardV1ChipList),
      visibility: Schema.optional(Schema.String),
      textParagraph: Schema.optional(GoogleAppsCardV1TextParagraph),
      textInput: Schema.optional(GoogleAppsCardV1TextInput),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Widget",
  }) as any as Schema.Schema<GoogleAppsCardV1Widget>;

export interface GoogleAppsCardV1Section {
  /** Text that appears at the top of a section. Supports simple HTML formatted text. For more information about formatting text, see [Formatting text in Google Chat apps](https://developers.google.com/workspace/chat/format-messages#card-formatting) and [Formatting text in Google Workspace add-ons](https://developers.google.com/apps-script/add-ons/concepts/widgets#text_formatting). */
  header?: string;
  /** Optional. Define the expand and collapse button of the section. This button will be shown only if the section is collapsible. If this field isn't set, the default button is used. */
  collapseControl?: GoogleAppsCardV1CollapseControl;
  /** All the widgets in the section. Must contain at least one widget. */
  widgets?: Array<GoogleAppsCardV1Widget>;
  /** The number of uncollapsible widgets which remain visible even when a section is collapsed. For example, when a section contains five widgets and the `uncollapsibleWidgetsCount` is set to `2`, the first two widgets are always shown and the last three are collapsed by default. The `uncollapsibleWidgetsCount` is taken into account only when `collapsible` is `true`. */
  uncollapsibleWidgetsCount?: number;
  /** Indicates whether this section is collapsible. Collapsible sections hide some or all widgets, but users can expand the section to reveal the hidden widgets by clicking **Show more**. Users can hide the widgets again by clicking **Show less**. To determine which widgets are hidden, specify `uncollapsibleWidgetsCount`. */
  collapsible?: boolean;
  /** A unique ID assigned to the section that's used to identify the section to be mutated. The ID has a character limit of 64 characters and should be in the format of `[a-zA-Z0-9-]+`. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps. */
  id?: string;
}

export const GoogleAppsCardV1Section: Schema.Schema<GoogleAppsCardV1Section> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      header: Schema.optional(Schema.String),
      collapseControl: Schema.optional(GoogleAppsCardV1CollapseControl),
      widgets: Schema.optional(Schema.Array(GoogleAppsCardV1Widget)),
      uncollapsibleWidgetsCount: Schema.optional(Schema.Number),
      collapsible: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Section",
  }) as any as Schema.Schema<GoogleAppsCardV1Section>;

export interface GoogleAppsCardV1Card {
  /** Name of the card. Used as a card identifier in card navigation. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): */
  name?: string;
  /** The expression data for the card. Available for Google Workspace add-ons that extend Google Workspace Studio. Unavailable for Google Chat apps. */
  expressionData?: Array<GoogleAppsCardV1ExpressionData>;
  /** The card's actions. Actions are added to the card's toolbar menu. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): For example, the following JSON constructs a card action menu with `Settings` and `Send Feedback` options: ``` "card_actions": [ { "actionLabel": "Settings", "onClick": { "action": { "functionName": "goToView", "parameters": [ { "key": "viewType", "value": "SETTING" } ], "loadIndicator": "LoadIndicator.SPINNER" } } }, { "actionLabel": "Send Feedback", "onClick": { "openLink": { "url": "https://example.com/feedback" } } } ] ``` */
  cardActions?: Array<GoogleAppsCardV1CardAction>;
  /** The divider style between the header, sections and footer. */
  sectionDividerStyle?:
    | "DIVIDER_STYLE_UNSPECIFIED"
    | "SOLID_DIVIDER"
    | "NO_DIVIDER"
    | (string & {});
  /** The fixed footer shown at the bottom of this card. Setting `fixedFooter` without specifying a `primaryButton` or a `secondaryButton` causes an error. For Chat apps, you can use fixed footers in [dialogs](https://developers.google.com/workspace/chat/dialogs), but not [card messages](https://developers.google.com/workspace/chat/create-messages#create). [Google Workspace add-ons and Chat apps](https://developers.google.com/workspace/extend): */
  fixedFooter?: GoogleAppsCardV1CardFixedFooter;
  /** When displaying contextual content, the peek card header acts as a placeholder so that the user can navigate forward between the homepage cards and the contextual cards. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): */
  peekCardHeader?: GoogleAppsCardV1CardHeader;
  /** The header of the card. A header usually contains a leading image and a title. Headers always appear at the top of a card. */
  header?: GoogleAppsCardV1CardHeader;
  /** In Google Workspace add-ons, sets the display properties of the `peekCardHeader`. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): */
  displayStyle?:
    | "DISPLAY_STYLE_UNSPECIFIED"
    | "PEEK"
    | "REPLACE"
    | (string & {});
  /** Contains a collection of widgets. Each section has its own, optional header. Sections are visually separated by a line divider. For an example in Google Chat apps, see [Define a section of a card](https://developers.google.com/workspace/chat/design-components-card-dialog#define_a_section_of_a_card). */
  sections?: Array<GoogleAppsCardV1Section>;
}

export const GoogleAppsCardV1Card: Schema.Schema<GoogleAppsCardV1Card> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      expressionData: Schema.optional(
        Schema.Array(GoogleAppsCardV1ExpressionData),
      ),
      cardActions: Schema.optional(Schema.Array(GoogleAppsCardV1CardAction)),
      sectionDividerStyle: Schema.optional(Schema.String),
      fixedFooter: Schema.optional(GoogleAppsCardV1CardFixedFooter),
      peekCardHeader: Schema.optional(GoogleAppsCardV1CardHeader),
      header: Schema.optional(GoogleAppsCardV1CardHeader),
      displayStyle: Schema.optional(Schema.String),
      sections: Schema.optional(Schema.Array(GoogleAppsCardV1Section)),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Card",
  }) as any as Schema.Schema<GoogleAppsCardV1Card>;

export interface GoogleAppsCardV1OpenLink {
  /** Whether the client forgets about a link after opening it, or observes it until the window closes. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): */
  onClose?: "NOTHING" | "RELOAD" | (string & {});
  /** How to open a link. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): */
  openAs?: "FULL_SIZE" | "OVERLAY" | (string & {});
  /** The URL to open. HTTP URLs are converted to HTTPS. */
  url?: string;
}

export const GoogleAppsCardV1OpenLink: Schema.Schema<GoogleAppsCardV1OpenLink> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      onClose: Schema.optional(Schema.String),
      openAs: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1OpenLink",
  }) as any as Schema.Schema<GoogleAppsCardV1OpenLink>;

export interface GoogleAppsCardV1OverflowMenuItem {
  /** The icon displayed in front of the text. */
  startIcon?: GoogleAppsCardV1Icon;
  /** Required. The text that identifies or describes the item to users. */
  text?: string;
  /** Required. The action invoked when a menu option is selected. This `OnClick` cannot contain an `OverflowMenu`, any specified `OverflowMenu` is dropped and the menu item disabled. */
  onClick?: GoogleAppsCardV1OnClick;
  /** Whether the menu option is disabled. Defaults to false. */
  disabled?: boolean;
}

export const GoogleAppsCardV1OverflowMenuItem: Schema.Schema<GoogleAppsCardV1OverflowMenuItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startIcon: Schema.optional(GoogleAppsCardV1Icon),
      text: Schema.optional(Schema.String),
      onClick: Schema.optional(GoogleAppsCardV1OnClick),
      disabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1OverflowMenuItem",
  }) as any as Schema.Schema<GoogleAppsCardV1OverflowMenuItem>;

export interface GoogleAppsCardV1OverflowMenu {
  /** Required. The list of menu options. */
  items?: Array<GoogleAppsCardV1OverflowMenuItem>;
}

export const GoogleAppsCardV1OverflowMenu: Schema.Schema<GoogleAppsCardV1OverflowMenu> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(GoogleAppsCardV1OverflowMenuItem)),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1OverflowMenu",
  }) as any as Schema.Schema<GoogleAppsCardV1OverflowMenu>;

export interface GoogleAppsCardV1OnClick {
  /** A new card is pushed to the card stack after clicking if specified. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): */
  card?: GoogleAppsCardV1Card;
  /** If specified, this `onClick` triggers an open link action. */
  openLink?: GoogleAppsCardV1OpenLink;
  /** An add-on triggers this action when the action needs to open a link. This differs from the `open_link` above in that this needs to talk to server to get the link. Thus some preparation work is required for web client to do before the open link action response comes back. [Google Workspace add-ons](https://developers.google.com/workspace/add-ons): */
  openDynamicLinkAction?: GoogleAppsCardV1Action;
  /** If specified, this `onClick` opens an overflow menu. */
  overflowMenu?: GoogleAppsCardV1OverflowMenu;
  /** If specified, an action is triggered by this `onClick`. */
  action?: GoogleAppsCardV1Action;
}

export const GoogleAppsCardV1OnClick: Schema.Schema<GoogleAppsCardV1OnClick> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      card: Schema.optional(GoogleAppsCardV1Card),
      openLink: Schema.optional(GoogleAppsCardV1OpenLink),
      openDynamicLinkAction: Schema.optional(GoogleAppsCardV1Action),
      overflowMenu: Schema.optional(GoogleAppsCardV1OverflowMenu),
      action: Schema.optional(GoogleAppsCardV1Action),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1OnClick",
  }) as any as Schema.Schema<GoogleAppsCardV1OnClick>;

export interface GoogleAppsCardV1Button {
  /** The text displayed inside the button. */
  text?: string;
  /** Required. The action to perform when a user clicks the button, such as opening a hyperlink or running a custom function. */
  onClick?: GoogleAppsCardV1OnClick;
  /** If `true`, the button is displayed in an inactive state and doesn't respond to user actions. */
  disabled?: boolean;
  /** The alternative text that's used for accessibility. Set descriptive text that lets users know what the button does. For example, if a button opens a hyperlink, you might write: "Opens a new browser tab and navigates to the Google Chat developer documentation at https://developers.google.com/workspace/chat". */
  altText?: string;
  /** Optional. The type of a button. If unset, button type defaults to `OUTLINED`. If the `color` field is set, the button type is forced to `FILLED` and any value set for this field is ignored. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "OUTLINED"
    | "FILLED"
    | "FILLED_TONAL"
    | "BORDERLESS"
    | (string & {});
  /** An icon displayed inside the button. If both `icon` and `text` are set, then the icon appears before the text. */
  icon?: GoogleAppsCardV1Icon;
  /** Optional. The color of the button. If set, the button `type` is set to `FILLED` and the color of `text` and `icon` fields are set to a contrasting color for readability. For example, if the button color is set to blue, any text or icons in the button are set to white. To set the button color, specify a value for the `red`, `green`, and `blue` fields. The value must be a float number between 0 and 1 based on the RGB color value, where `0` (0/255) represents the absence of color and `1` (255/255) represents the maximum intensity of the color. For example, the following sets the color to red at its maximum intensity: ``` "color": { "red": 1, "green": 0, "blue": 0, } ``` The `alpha` field is unavailable for button color. If specified, this field is ignored. */
  color?: Color;
}

export const GoogleAppsCardV1Button: Schema.Schema<GoogleAppsCardV1Button> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      onClick: Schema.optional(GoogleAppsCardV1OnClick),
      disabled: Schema.optional(Schema.Boolean),
      altText: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      icon: Schema.optional(GoogleAppsCardV1Icon),
      color: Schema.optional(Color),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1Button",
  }) as any as Schema.Schema<GoogleAppsCardV1Button>;

export interface GoogleAppsCardV1DecoratedText {
  /** The icon displayed in front of the text. */
  startIcon?: GoogleAppsCardV1Icon;
  /** `TextParagraph` equivalent of `text`. Allows for more complex formatting than `text`. [Google Chat apps](https://developers.google.com/workspace/chat): */
  contentText?: GoogleAppsCardV1TextParagraph;
  /** Optional. Vertical alignment of the start icon. If not set, the icon will be vertically centered. [Google Chat apps](https://developers.google.com/workspace/chat): */
  startIconVerticalAlignment?:
    | "VERTICAL_ALIGNMENT_UNSPECIFIED"
    | "TOP"
    | "MIDDLE"
    | "BOTTOM"
    | (string & {});
  /** An icon displayed after the text. Supports [built-in](https://developers.google.com/workspace/chat/format-messages#builtinicons) and [custom](https://developers.google.com/workspace/chat/format-messages#customicons) icons. */
  endIcon?: GoogleAppsCardV1Icon;
  /** `TextParagraph` equivalent of `bottom_label`. Always wraps. Allows for more complex formatting than `bottom_label`. [Google Chat apps](https://developers.google.com/workspace/chat): */
  bottomLabelText?: GoogleAppsCardV1TextParagraph;
  /** Deprecated in favor of `startIcon`. */
  icon?: GoogleAppsCardV1Icon;
  /** Required. The primary text. Supports simple formatting. For more information about formatting text, see [Formatting text in Google Chat apps](https://developers.google.com/workspace/chat/format-messages#card-formatting) and [Formatting text in Google Workspace add-ons](https://developers.google.com/apps-script/add-ons/concepts/widgets#text_formatting). */
  text?: string;
  /** A switch widget that a user can click to change its state and trigger an action. */
  switchControl?: GoogleAppsCardV1SwitchControl;
  /** `TextParagraph` equivalent of `top_label`. Always truncates. Allows for more complex formatting than `top_label`. [Google Chat apps](https://developers.google.com/workspace/chat): */
  topLabelText?: GoogleAppsCardV1TextParagraph;
  /** The text that appears below `text`. Always wraps. */
  bottomLabel?: string;
  /** A button that a user can click to trigger an action. */
  button?: GoogleAppsCardV1Button;
  /** This action is triggered when users click `topLabel` or `bottomLabel`. */
  onClick?: GoogleAppsCardV1OnClick;
  /** The text that appears above `text`. Always truncates. */
  topLabel?: string;
  /** The wrap text setting. If `true`, the text wraps and displays on multiple lines. Otherwise, the text is truncated. Only applies to `text`, not `topLabel` and `bottomLabel`. */
  wrapText?: boolean;
}

export const GoogleAppsCardV1DecoratedText: Schema.Schema<GoogleAppsCardV1DecoratedText> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startIcon: Schema.optional(GoogleAppsCardV1Icon),
      contentText: Schema.optional(GoogleAppsCardV1TextParagraph),
      startIconVerticalAlignment: Schema.optional(Schema.String),
      endIcon: Schema.optional(GoogleAppsCardV1Icon),
      bottomLabelText: Schema.optional(GoogleAppsCardV1TextParagraph),
      icon: Schema.optional(GoogleAppsCardV1Icon),
      text: Schema.optional(Schema.String),
      switchControl: Schema.optional(GoogleAppsCardV1SwitchControl),
      topLabelText: Schema.optional(GoogleAppsCardV1TextParagraph),
      bottomLabel: Schema.optional(Schema.String),
      button: Schema.optional(GoogleAppsCardV1Button),
      onClick: Schema.optional(GoogleAppsCardV1OnClick),
      topLabel: Schema.optional(Schema.String),
      wrapText: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppsCardV1DecoratedText",
  }) as any as Schema.Schema<GoogleAppsCardV1DecoratedText>;

export interface AttachmentDataRef {
  /** Optional. The resource name of the attachment data. This field is used with the media API to download the attachment data. */
  resourceName?: string;
  /** Optional. Opaque token containing a reference to an uploaded attachment. Treated by clients as an opaque string and used to create or update Chat messages with attachments. */
  attachmentUploadToken?: string;
}

export const AttachmentDataRef: Schema.Schema<AttachmentDataRef> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceName: Schema.optional(Schema.String),
      attachmentUploadToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AttachmentDataRef",
  }) as any as Schema.Schema<AttachmentDataRef>;

export interface Attachment {
  /** Output only. The download URL which should be used to allow a human user to download the attachment. Chat apps shouldn't use this URL to download attachment content. */
  downloadUri?: string;
  /** Identifier. Resource name of the attachment. Format: `spaces/{space}/messages/{message}/attachments/{attachment}`. */
  name?: string;
  /** Output only. The content type (MIME type) of the file. */
  contentType?: string;
  /** Output only. A reference to the Google Drive attachment. This field is used with the Google Drive API. */
  driveDataRef?: DriveDataRef;
  /** Output only. The source of the attachment. */
  source?:
    | "SOURCE_UNSPECIFIED"
    | "DRIVE_FILE"
    | "UPLOADED_CONTENT"
    | (string & {});
  /** Output only. The original file name for the content, not the full path. */
  contentName?: string;
  /** Optional. A reference to the attachment data. This field is used to create or update messages with attachments, or with the media API to download the attachment data. */
  attachmentDataRef?: AttachmentDataRef;
  /** Output only. The thumbnail URL which should be used to preview the attachment to a human user. Chat apps shouldn't use this URL to download attachment content. */
  thumbnailUri?: string;
}

export const Attachment: Schema.Schema<Attachment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      downloadUri: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      contentType: Schema.optional(Schema.String),
      driveDataRef: Schema.optional(DriveDataRef),
      source: Schema.optional(Schema.String),
      contentName: Schema.optional(Schema.String),
      attachmentDataRef: Schema.optional(AttachmentDataRef),
      thumbnailUri: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Attachment" }) as any as Schema.Schema<Attachment>;

export interface User {
  /** Output only. The user's display name. */
  displayName?: string;
  /** Unique identifier of the user's Google Workspace domain. */
  domainId?: string;
  /** Output only. When `true`, the user is deleted or their profile is not visible. */
  isAnonymous?: boolean;
  /** Resource name for a Google Chat user. Format: `users/{user}`. `users/app` can be used as an alias for the calling app bot user. For human users, `{user}` is the same user identifier as: - the `id` for the [Person](https://developers.google.com/people/api/rest/v1/people) in the People API. For example, `users/123456789` in Chat API represents the same person as the `123456789` Person profile ID in People API. - the `id` for a [user](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users) in the Admin SDK Directory API. - the user's email address can be used as an alias for `{user}` in API requests. For example, if the People API Person profile ID for `user@example.com` is `123456789`, you can use `users/user@example.com` as an alias to reference `users/123456789`. Only the canonical resource name (for example `users/123456789`) will be returned from the API. */
  name?: string;
  /** User type. */
  type?: "TYPE_UNSPECIFIED" | "HUMAN" | "BOT" | (string & {});
}

export const User: Schema.Schema<User> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      domainId: Schema.optional(Schema.String),
      isAnonymous: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface UserMentionMetadata {
  /** The user mentioned. */
  user?: User;
  /** The type of user mention. */
  type?: "TYPE_UNSPECIFIED" | "ADD" | "MENTION" | (string & {});
}

export const UserMentionMetadata: Schema.Schema<UserMentionMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      user: Schema.optional(User),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UserMentionMetadata",
  }) as any as Schema.Schema<UserMentionMetadata>;

export interface SlashCommandMetadata {
  /** The type of slash command. */
  type?: "TYPE_UNSPECIFIED" | "ADD" | "INVOKE" | (string & {});
  /** The Chat app whose command was invoked. */
  bot?: User;
  /** The command ID of the invoked slash command. */
  commandId?: string;
  /** Indicates whether the slash command is for a dialog. */
  triggersDialog?: boolean;
  /** The name of the invoked slash command. */
  commandName?: string;
}

export const SlashCommandMetadata: Schema.Schema<SlashCommandMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      bot: Schema.optional(User),
      commandId: Schema.optional(Schema.String),
      triggersDialog: Schema.optional(Schema.Boolean),
      commandName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SlashCommandMetadata",
  }) as any as Schema.Schema<SlashCommandMetadata>;

export interface CalendarEventLinkData {
  /** The [Calendar identifier](https://developers.google.com/workspace/calendar/api/v3/reference/calendars) of the linked Calendar. */
  calendarId?: string;
  /** The [Event identifier](https://developers.google.com/workspace/calendar/api/v3/reference/events) of the linked Calendar event. */
  eventId?: string;
}

export const CalendarEventLinkData: Schema.Schema<CalendarEventLinkData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      calendarId: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CalendarEventLinkData",
  }) as any as Schema.Schema<CalendarEventLinkData>;

export interface MeetSpaceLinkData {
  /** Meeting code of the linked Meet space. */
  meetingCode?: string;
  /** Indicates the type of the Meet space. */
  type?: "TYPE_UNSPECIFIED" | "MEETING" | "HUDDLE" | (string & {});
  /** Optional. Output only. If the Meet is a Huddle, indicates the status of the huddle. Otherwise, this is unset. */
  huddleStatus?:
    | "HUDDLE_STATUS_UNSPECIFIED"
    | "STARTED"
    | "ENDED"
    | "MISSED"
    | (string & {});
}

export const MeetSpaceLinkData: Schema.Schema<MeetSpaceLinkData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      meetingCode: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      huddleStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MeetSpaceLinkData",
  }) as any as Schema.Schema<MeetSpaceLinkData>;

export interface ChatSpaceLinkData {
  /** The space of the linked Chat space resource. Format: `spaces/{space}` */
  space?: string;
  /** The thread of the linked Chat space resource. Format: `spaces/{space}/threads/{thread}` */
  thread?: string;
  /** The message of the linked Chat space resource. Format: `spaces/{space}/messages/{message}` */
  message?: string;
}

export const ChatSpaceLinkData: Schema.Schema<ChatSpaceLinkData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      space: Schema.optional(Schema.String),
      thread: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChatSpaceLinkData",
  }) as any as Schema.Schema<ChatSpaceLinkData>;

export interface RichLinkMetadata {
  /** Data for a Calendar event link. */
  calendarEventLinkData?: CalendarEventLinkData;
  /** Data for a Meet space link. */
  meetSpaceLinkData?: MeetSpaceLinkData;
  /** The rich link type. */
  richLinkType?:
    | "RICH_LINK_TYPE_UNSPECIFIED"
    | "DRIVE_FILE"
    | "CHAT_SPACE"
    | "GMAIL_MESSAGE"
    | "MEET_SPACE"
    | "CALENDAR_EVENT"
    | (string & {});
  /** Data for a drive link. */
  driveLinkData?: DriveLinkData;
  /** The URI of this link. */
  uri?: string;
  /** Data for a chat space link. */
  chatSpaceLinkData?: ChatSpaceLinkData;
}

export const RichLinkMetadata: Schema.Schema<RichLinkMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      calendarEventLinkData: Schema.optional(CalendarEventLinkData),
      meetSpaceLinkData: Schema.optional(MeetSpaceLinkData),
      richLinkType: Schema.optional(Schema.String),
      driveLinkData: Schema.optional(DriveLinkData),
      uri: Schema.optional(Schema.String),
      chatSpaceLinkData: Schema.optional(ChatSpaceLinkData),
    }),
  ).annotate({
    identifier: "RichLinkMetadata",
  }) as any as Schema.Schema<RichLinkMetadata>;

export interface CustomEmojiPayload {
  /** Required. Input only. The image used for the custom emoji. The payload must be under 256 KB and the dimension of the image must be square and between 64 and 500 pixels. The restrictions are subject to change. */
  fileContent?: string;
  /** Required. Input only. The image file name. Supported file extensions: `.png`, `.jpg`, `.gif`. */
  filename?: string;
}

export const CustomEmojiPayload: Schema.Schema<CustomEmojiPayload> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileContent: Schema.optional(Schema.String),
      filename: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomEmojiPayload",
  }) as any as Schema.Schema<CustomEmojiPayload>;

export interface CustomEmoji {
  /** Optional. Immutable. User-provided name for the custom emoji, which is unique within the organization. Required when the custom emoji is created, output only otherwise. Emoji names must start and end with colons, must be lowercase and can only contain alphanumeric characters, hyphens, and underscores. Hyphens and underscores should be used to separate words and cannot be used consecutively. Example: `:valid-emoji-name:` */
  emojiName?: string;
  /** Output only. Unique key for the custom emoji resource. */
  uid?: string;
  /** Optional. Input only. Payload data. Required when the custom emoji is created. */
  payload?: CustomEmojiPayload;
  /** Identifier. The resource name of the custom emoji, assigned by the server. Format: `customEmojis/{customEmoji}` */
  name?: string;
  /** Output only. A temporary image URL for the custom emoji, valid for at least 10 minutes. Note that this is not populated in the response when the custom emoji is created. */
  temporaryImageUri?: string;
}

export const CustomEmoji: Schema.Schema<CustomEmoji> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      emojiName: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      payload: Schema.optional(CustomEmojiPayload),
      name: Schema.optional(Schema.String),
      temporaryImageUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomEmoji",
  }) as any as Schema.Schema<CustomEmoji>;

export interface CustomEmojiMetadata {
  /** The custom emoji. */
  customEmoji?: CustomEmoji;
}

export const CustomEmojiMetadata: Schema.Schema<CustomEmojiMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customEmoji: Schema.optional(CustomEmoji),
    }),
  ).annotate({
    identifier: "CustomEmojiMetadata",
  }) as any as Schema.Schema<CustomEmojiMetadata>;

export interface Annotation {
  /** The type of this annotation. */
  type?:
    | "ANNOTATION_TYPE_UNSPECIFIED"
    | "USER_MENTION"
    | "SLASH_COMMAND"
    | "RICH_LINK"
    | "CUSTOM_EMOJI"
    | (string & {});
  /** Length of the substring in the plain-text message body this annotation corresponds to. If not present, indicates a length of 0. */
  length?: number;
  /** The metadata of user mention. */
  userMention?: UserMentionMetadata;
  /** Start index (0-based, inclusive) in the plain-text message body this annotation corresponds to. */
  startIndex?: number;
  /** The metadata for a slash command. */
  slashCommand?: SlashCommandMetadata;
  /** The metadata for a rich link. */
  richLinkMetadata?: RichLinkMetadata;
  /** The metadata for a custom emoji. */
  customEmojiMetadata?: CustomEmojiMetadata;
}

export const Annotation: Schema.Schema<Annotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      length: Schema.optional(Schema.Number),
      userMention: Schema.optional(UserMentionMetadata),
      startIndex: Schema.optional(Schema.Number),
      slashCommand: Schema.optional(SlashCommandMetadata),
      richLinkMetadata: Schema.optional(RichLinkMetadata),
      customEmojiMetadata: Schema.optional(CustomEmojiMetadata),
    }),
  ).annotate({ identifier: "Annotation" }) as any as Schema.Schema<Annotation>;

export interface QuotedMessageSnapshot {
  /** Output only. Attachments that were part of the quoted message. These are copies of the quoted message's attachment metadata. Populated only for FORWARD quote type. */
  attachments?: Array<Attachment>;
  /** Output only. Contains the quoted message `text` with markups added to support rich formatting like hyperlinks,custom emojis, markup, etc. Populated only for FORWARD quote type. */
  formattedText?: string;
  /** Output only. Annotations parsed from the text body of the quoted message. Populated only for FORWARD quote type. */
  annotations?: Array<Annotation>;
  /** Output only. The quoted message's author name. Populated for both REPLY & FORWARD quote types. */
  sender?: string;
  /** Output only. Snapshot of the quoted message's text content. */
  text?: string;
}

export const QuotedMessageSnapshot: Schema.Schema<QuotedMessageSnapshot> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attachments: Schema.optional(Schema.Array(Attachment)),
      formattedText: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Array(Annotation)),
      sender: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QuotedMessageSnapshot",
  }) as any as Schema.Schema<QuotedMessageSnapshot>;

export interface ForwardedMetadata {
  /** Output only. The resource name of the source space. Format: spaces/{space} */
  space?: string;
  /** Output only. The display name of the source space or DM at the time of forwarding. For `SPACE`, this is the space name. For `DIRECT_MESSAGE`, this is the other participant's name (e.g., "User A"). For `GROUP_CHAT`, this is a generated name based on members' first names, limited to 5 including the creator (e.g., "User A, User B"). */
  spaceDisplayName?: string;
}

export const ForwardedMetadata: Schema.Schema<ForwardedMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      space: Schema.optional(Schema.String),
      spaceDisplayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ForwardedMetadata",
  }) as any as Schema.Schema<ForwardedMetadata>;

export interface QuotedMessageMetadata {
  /** Required. The timestamp when the quoted message was created or when the quoted message was last updated. If the message was edited, use this field, `last_update_time`. If the message was never edited, use `create_time`. If `last_update_time` doesn't match the latest version of the quoted message, the request fails. */
  lastUpdateTime?: string;
  /** Required. Resource name of the message that is quoted. Format: `spaces/{space}/messages/{message}` */
  name?: string;
  /** Optional. Specifies the quote type. If not set, defaults to REPLY in the message read/write path for backward compatibility. */
  quoteType?: "QUOTE_TYPE_UNSPECIFIED" | "REPLY" | (string & {});
  /** Output only. A snapshot of the quoted message's content. */
  quotedMessageSnapshot?: QuotedMessageSnapshot;
  /** Output only. Metadata about the source space of the quoted message. Populated only for FORWARD quote type. */
  forwardedMetadata?: ForwardedMetadata;
}

export const QuotedMessageMetadata: Schema.Schema<QuotedMessageMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lastUpdateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      quoteType: Schema.optional(Schema.String),
      quotedMessageSnapshot: Schema.optional(QuotedMessageSnapshot),
      forwardedMetadata: Schema.optional(ForwardedMetadata),
    }),
  ).annotate({
    identifier: "QuotedMessageMetadata",
  }) as any as Schema.Schema<QuotedMessageMetadata>;

export interface UploadAttachmentRequest {
  /** Required. The filename of the attachment, including the file extension. */
  filename?: string;
}

export const UploadAttachmentRequest: Schema.Schema<UploadAttachmentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      filename: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UploadAttachmentRequest",
  }) as any as Schema.Schema<UploadAttachmentRequest>;

export interface Emoji {
  /** Optional. A basic emoji represented by a unicode string. */
  unicode?: string;
  /** A custom emoji. */
  customEmoji?: CustomEmoji;
}

export const Emoji: Schema.Schema<Emoji> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unicode: Schema.optional(Schema.String),
      customEmoji: Schema.optional(CustomEmoji),
    }),
  ).annotate({ identifier: "Emoji" }) as any as Schema.Schema<Emoji>;

export interface Reaction {
  /** Output only. The user who created the reaction. */
  user?: User;
  /** Required. The emoji used in the reaction. */
  emoji?: Emoji;
  /** Identifier. The resource name of the reaction. Format: `spaces/{space}/messages/{message}/reactions/{reaction}` */
  name?: string;
}

export const Reaction: Schema.Schema<Reaction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      user: Schema.optional(User),
      emoji: Schema.optional(Emoji),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Reaction" }) as any as Schema.Schema<Reaction>;

export interface ReactionDeletedEventData {
  /** The deleted reaction. */
  reaction?: Reaction;
}

export const ReactionDeletedEventData: Schema.Schema<ReactionDeletedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reaction: Schema.optional(Reaction),
    }),
  ).annotate({
    identifier: "ReactionDeletedEventData",
  }) as any as Schema.Schema<ReactionDeletedEventData>;

export interface ReactionBatchDeletedEventData {
  /** A list of deleted reactions. */
  reactions?: Array<ReactionDeletedEventData>;
}

export const ReactionBatchDeletedEventData: Schema.Schema<ReactionBatchDeletedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reactions: Schema.optional(Schema.Array(ReactionDeletedEventData)),
    }),
  ).annotate({
    identifier: "ReactionBatchDeletedEventData",
  }) as any as Schema.Schema<ReactionBatchDeletedEventData>;

export interface CardWithId {
  /** A card. Maximum size is 32 KB. */
  card?: GoogleAppsCardV1Card;
  /** Required if the message contains multiple cards. A unique identifier for a card in a message. */
  cardId?: string;
}

export const CardWithId: Schema.Schema<CardWithId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      card: Schema.optional(GoogleAppsCardV1Card),
      cardId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "CardWithId" }) as any as Schema.Schema<CardWithId>;

export interface SlashCommand {
  /** The ID of the slash command. */
  commandId?: string;
}

export const SlashCommand: Schema.Schema<SlashCommand> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      commandId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SlashCommand",
  }) as any as Schema.Schema<SlashCommand>;

export interface MatchedUrl {
  /** Output only. The URL that was matched. */
  url?: string;
}

export const MatchedUrl: Schema.Schema<MatchedUrl> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "MatchedUrl" }) as any as Schema.Schema<MatchedUrl>;

export interface AccessSettings {
  /** Output only. Indicates the access state of the space. */
  accessState?:
    | "ACCESS_STATE_UNSPECIFIED"
    | "PRIVATE"
    | "DISCOVERABLE"
    | (string & {});
  /** Optional. The resource name of the [target audience](https://support.google.com/a/answer/9934697) who can discover the space, join the space, and preview the messages in the space. If unset, only users or Google Groups who have been individually invited or added to the space can access it. For details, see [Make a space discoverable to a target audience](https://developers.google.com/workspace/chat/space-target-audience). Format: `audiences/{audience}` To use the default target audience for the Google Workspace organization, set to `audiences/default`. Reading the target audience supports: - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) with the `chat.app.spaces` scope. This field is not populated when using the `chat.bot` scope with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). Setting the target audience requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user). */
  audience?: string;
}

export const AccessSettings: Schema.Schema<AccessSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accessState: Schema.optional(Schema.String),
      audience: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccessSettings",
  }) as any as Schema.Schema<AccessSettings>;

export interface MembershipCount {
  /** Output only. Count of all groups that have directly joined the space. */
  joinedGroupCount?: number;
  /** Output only. Count of human users that have directly joined the space, not counting users joined by having membership in a joined group. */
  joinedDirectHumanUserCount?: number;
}

export const MembershipCount: Schema.Schema<MembershipCount> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      joinedGroupCount: Schema.optional(Schema.Number),
      joinedDirectHumanUserCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "MembershipCount",
  }) as any as Schema.Schema<MembershipCount>;

export interface PermissionSetting {
  /** Optional. Whether basic space members (`ROLE_MEMBER`) have this permission. */
  membersAllowed?: boolean;
  /** Optional. Whether space owners (`ROLE_MANAGER`) have this permission. */
  managersAllowed?: boolean;
  /** Optional. Whether space managers `ROLE_ASSISTANT_MANAGER`) have this permission. */
  assistantManagersAllowed?: boolean;
}

export const PermissionSetting: Schema.Schema<PermissionSetting> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      membersAllowed: Schema.optional(Schema.Boolean),
      managersAllowed: Schema.optional(Schema.Boolean),
      assistantManagersAllowed: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "PermissionSetting",
  }) as any as Schema.Schema<PermissionSetting>;

export interface PermissionSettings {
  /** Optional. Setting for managing apps in a space. */
  manageApps?: PermissionSetting;
  /** Optional. Setting for managing webhooks in a space. */
  manageWebhooks?: PermissionSetting;
  /** Optional. Setting for replying to messages in a space. */
  replyMessages?: PermissionSetting;
  /** Optional. Setting for updating space name, avatar, description and guidelines. */
  modifySpaceDetails?: PermissionSetting;
  /** Output only. Setting for posting messages in a space. */
  postMessages?: PermissionSetting;
  /** Optional. Setting for managing members and groups in a space. */
  manageMembersAndGroups?: PermissionSetting;
  /** Optional. Setting for toggling space history on and off. */
  toggleHistory?: PermissionSetting;
  /** Optional. Setting for using @all in a space. */
  useAtMentionAll?: PermissionSetting;
}

export const PermissionSettings: Schema.Schema<PermissionSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      manageApps: Schema.optional(PermissionSetting),
      manageWebhooks: Schema.optional(PermissionSetting),
      replyMessages: Schema.optional(PermissionSetting),
      modifySpaceDetails: Schema.optional(PermissionSetting),
      postMessages: Schema.optional(PermissionSetting),
      manageMembersAndGroups: Schema.optional(PermissionSetting),
      toggleHistory: Schema.optional(PermissionSetting),
      useAtMentionAll: Schema.optional(PermissionSetting),
    }),
  ).annotate({
    identifier: "PermissionSettings",
  }) as any as Schema.Schema<PermissionSettings>;

export interface SpaceDetails {
  /** Optional. A description of the space. For example, describe the space's discussion topic, functional purpose, or participants. Supports up to 150 characters. */
  description?: string;
  /** Optional. The space's rules, expectations, and etiquette. Supports up to 5,000 characters. */
  guidelines?: string;
}

export const SpaceDetails: Schema.Schema<SpaceDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      guidelines: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SpaceDetails",
  }) as any as Schema.Schema<SpaceDetails>;

export interface Space {
  /** Optional. Specifies the [access setting](https://support.google.com/chat/answer/11971020) of the space. Only populated when the `space_type` is `SPACE`. */
  accessSettings?: AccessSettings;
  /** Optional. The space's display name. Required when [creating a space](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/create) with a `spaceType` of `SPACE`. If you receive the error message `ALREADY_EXISTS` when creating a space or updating the `displayName`, try a different `displayName`. An existing space within the Google Workspace organization might already use this display name. For direct messages, this field might be empty. Supports up to 128 characters. */
  displayName?: string;
  /** Optional. Whether the space is a DM between a Chat app and a single human. */
  singleUserBotDm?: boolean;
  /** Output only. For direct message (DM) spaces with a Chat app, whether the space was created by a Google Workspace administrator. Administrators can install and set up a direct message with a Chat app on behalf of users in their organization. To support admin install, your Chat app must feature direct messaging. */
  adminInstalled?: boolean;
  /** Optional. Immutable. The customer id of the domain of the space. Required only when creating a space with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) and `SpaceType` is `SPACE`, otherwise should not be set. In the format `customers/{customer}`, where `customer` is the `id` from the [Admin SDK customer resource](https://developers.google.com/admin-sdk/directory/reference/rest/v1/customers). Private apps can also use the `customers/my_customer` alias to create the space in the same Google Workspace organization as the app. This field isn't populated for direct messages (DMs) or when the space is created by non-Google Workspace users. */
  customer?: string;
  /** Optional. Whether this space is created in `Import Mode` as part of a data migration into Google Workspace. While spaces are being imported, they aren't visible to users until the import is complete. Creating a space in `Import Mode`requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user). */
  importMode?: boolean;
  /** Output only. Deprecated: Use `space_type` instead. The type of a space. */
  type?: "TYPE_UNSPECIFIED" | "ROOM" | "DM" | (string & {});
  /** Output only. The threading state in the Chat space. */
  spaceThreadingState?:
    | "SPACE_THREADING_STATE_UNSPECIFIED"
    | "THREADED_MESSAGES"
    | "GROUPED_MESSAGES"
    | "UNTHREADED_MESSAGES"
    | (string & {});
  /** Output only. The count of joined memberships grouped by member type. Populated when the `space_type` is `SPACE`, `DIRECT_MESSAGE` or `GROUP_CHAT`. */
  membershipCount?: MembershipCount;
  /** Optional. Immutable. Whether this space permits any Google Chat user as a member. Input when creating a space in a Google Workspace organization. Omit this field when creating spaces in the following conditions: * The authenticated user uses a consumer account (unmanaged user account). By default, a space created by a consumer account permits any Google Chat user. For existing spaces, this field is output only. */
  externalUserAllowed?: boolean;
  /** Optional. Space permission settings for existing spaces. Input for updating exact space permission settings, where existing permission settings are replaced. Output lists current permission settings. Reading and updating permission settings supports: - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) with the `chat.app.spaces` scope. Only populated and settable when the Chat app created the space. - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) */
  permissionSettings?: PermissionSettings;
  /** Output only. The time when the space will be automatically deleted by the system if it remains in import mode. Each space created in import mode must exit this mode before this expire time using `spaces.completeImport`. This field is only populated for spaces that were created with import mode. */
  importModeExpireTime?: string;
  /** Optional. Input only. Predefined space permission settings, input only when creating a space. If the field is not set, a collaboration space is created. After you create the space, settings are populated in the `PermissionSettings` field. Setting predefined permission settings supports: - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) with the `chat.app.spaces` or `chat.app.spaces.create` scopes. - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) */
  predefinedPermissionSettings?:
    | "PREDEFINED_PERMISSION_SETTINGS_UNSPECIFIED"
    | "COLLABORATION_SPACE"
    | "ANNOUNCEMENT_SPACE"
    | (string & {});
  /** Identifier. Resource name of the space. Format: `spaces/{space}` Where `{space}` represents the system-assigned ID for the space. You can obtain the space ID by calling the [`spaces.list()`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/list) method or from the space URL. For example, if the space URL is `https://mail.google.com/mail/u/0/#chat/space/AAAAAAAAA`, the space ID is `AAAAAAAAA`. */
  name?: string;
  /** Optional. The type of space. Required when creating a space or updating the space type of a space. Output only for other usage. */
  spaceType?:
    | "SPACE_TYPE_UNSPECIFIED"
    | "SPACE"
    | "GROUP_CHAT"
    | "DIRECT_MESSAGE"
    | (string & {});
  /** Output only. Deprecated: Use `spaceThreadingState` instead. Whether messages are threaded in this space. */
  threaded?: boolean;
  /** Optional. The message history state for messages and threads in this space. */
  spaceHistoryState?:
    | "HISTORY_STATE_UNSPECIFIED"
    | "HISTORY_OFF"
    | "HISTORY_ON"
    | (string & {});
  /** Output only. The URI for a user to access the space. */
  spaceUri?: string;
  /** Optional. Immutable. For spaces created in Chat, the time the space was created. This field is output only, except when used in import mode spaces. For import mode spaces, set this field to the historical timestamp at which the space was created in the source in order to preserve the original creation time. Only populated in the output when `spaceType` is `GROUP_CHAT` or `SPACE`. */
  createTime?: string;
  /** Optional. Details about the space including description and rules. */
  spaceDetails?: SpaceDetails;
  /** Output only. Timestamp of the last message in the space. */
  lastActiveTime?: string;
}

export const Space: Schema.Schema<Space> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accessSettings: Schema.optional(AccessSettings),
      displayName: Schema.optional(Schema.String),
      singleUserBotDm: Schema.optional(Schema.Boolean),
      adminInstalled: Schema.optional(Schema.Boolean),
      customer: Schema.optional(Schema.String),
      importMode: Schema.optional(Schema.Boolean),
      type: Schema.optional(Schema.String),
      spaceThreadingState: Schema.optional(Schema.String),
      membershipCount: Schema.optional(MembershipCount),
      externalUserAllowed: Schema.optional(Schema.Boolean),
      permissionSettings: Schema.optional(PermissionSettings),
      importModeExpireTime: Schema.optional(Schema.String),
      predefinedPermissionSettings: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      spaceType: Schema.optional(Schema.String),
      threaded: Schema.optional(Schema.Boolean),
      spaceHistoryState: Schema.optional(Schema.String),
      spaceUri: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      spaceDetails: Schema.optional(SpaceDetails),
      lastActiveTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Space" }) as any as Schema.Schema<Space>;

export interface AccessoryWidget {
  /** A list of buttons. */
  buttonList?: GoogleAppsCardV1ButtonList;
}

export const AccessoryWidget: Schema.Schema<AccessoryWidget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      buttonList: Schema.optional(GoogleAppsCardV1ButtonList),
    }),
  ).annotate({
    identifier: "AccessoryWidget",
  }) as any as Schema.Schema<AccessoryWidget>;

export interface EmojiReactionSummary {
  /** Output only. Emoji associated with the reactions. */
  emoji?: Emoji;
  /** Output only. The total number of reactions using the associated emoji. */
  reactionCount?: number;
}

export const EmojiReactionSummary: Schema.Schema<EmojiReactionSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      emoji: Schema.optional(Emoji),
      reactionCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "EmojiReactionSummary",
  }) as any as Schema.Schema<EmojiReactionSummary>;

export interface Thread {
  /** Identifier. Resource name of the thread. Example: `spaces/{space}/threads/{thread}` */
  name?: string;
  /** Optional. Input for creating or updating a thread. Otherwise, output only. ID for the thread. Supports up to 4000 characters. This ID is unique to the Chat app that sets it. For example, if multiple Chat apps create a message using the same thread key, the messages are posted in different threads. To reply in a thread created by a person or another Chat app, specify the thread `name` field instead. */
  threadKey?: string;
}

export const Thread: Schema.Schema<Thread> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      threadKey: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Thread" }) as any as Schema.Schema<Thread>;

export interface DeletionMetadata {
  /** Indicates who deleted the message. */
  deletionType?:
    | "DELETION_TYPE_UNSPECIFIED"
    | "CREATOR"
    | "SPACE_OWNER"
    | "ADMIN"
    | "APP_MESSAGE_EXPIRY"
    | "CREATOR_VIA_APP"
    | "SPACE_OWNER_VIA_APP"
    | "SPACE_MEMBER"
    | (string & {});
}

export const DeletionMetadata: Schema.Schema<DeletionMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deletionType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeletionMetadata",
  }) as any as Schema.Schema<DeletionMetadata>;

export interface SelectionItems {
  /** An array of the SelectionItem objects. */
  items?: Array<GoogleAppsCardV1SelectionItem>;
}

export const SelectionItems: Schema.Schema<SelectionItems> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(GoogleAppsCardV1SelectionItem)),
    }),
  ).annotate({
    identifier: "SelectionItems",
  }) as any as Schema.Schema<SelectionItems>;

export interface UpdatedWidget {
  /** List of widget autocomplete results */
  suggestions?: SelectionItems;
  /** The ID of the updated widget. The ID must match the one for the widget that triggered the update request. */
  widget?: string;
}

export const UpdatedWidget: Schema.Schema<UpdatedWidget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      suggestions: Schema.optional(SelectionItems),
      widget: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpdatedWidget",
  }) as any as Schema.Schema<UpdatedWidget>;

export interface Dialog {
  /** Input only. Body of the dialog, which is rendered in a modal. Google Chat apps don't support the following card entities: `DateTimePicker`, `OnChangeAction`. */
  body?: GoogleAppsCardV1Card;
}

export const Dialog: Schema.Schema<Dialog> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      body: Schema.optional(GoogleAppsCardV1Card),
    }),
  ).annotate({ identifier: "Dialog" }) as any as Schema.Schema<Dialog>;

export interface ActionStatus {
  /** The status code. */
  statusCode?:
    | "OK"
    | "CANCELLED"
    | "UNKNOWN"
    | "INVALID_ARGUMENT"
    | "DEADLINE_EXCEEDED"
    | "NOT_FOUND"
    | "ALREADY_EXISTS"
    | "PERMISSION_DENIED"
    | "UNAUTHENTICATED"
    | "RESOURCE_EXHAUSTED"
    | "FAILED_PRECONDITION"
    | "ABORTED"
    | "OUT_OF_RANGE"
    | "UNIMPLEMENTED"
    | "INTERNAL"
    | "UNAVAILABLE"
    | "DATA_LOSS"
    | (string & {});
  /** The message to send users about the status of their request. If unset, a generic message based on the `status_code` is sent. */
  userFacingMessage?: string;
}

export const ActionStatus: Schema.Schema<ActionStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      statusCode: Schema.optional(Schema.String),
      userFacingMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActionStatus",
  }) as any as Schema.Schema<ActionStatus>;

export interface DialogAction {
  /** Input only. [Dialog](https://developers.google.com/workspace/chat/dialogs) for the request. */
  dialog?: Dialog;
  /** Input only. Status for a request to either invoke or submit a [dialog](https://developers.google.com/workspace/chat/dialogs). Displays a status and message to users, if necessary. For example, in case of an error or success. */
  actionStatus?: ActionStatus;
}

export const DialogAction: Schema.Schema<DialogAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dialog: Schema.optional(Dialog),
      actionStatus: Schema.optional(ActionStatus),
    }),
  ).annotate({
    identifier: "DialogAction",
  }) as any as Schema.Schema<DialogAction>;

export interface ActionResponse {
  /** Input only. The response of the updated widget. */
  updatedWidget?: UpdatedWidget;
  /** Input only. The type of Chat app response. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "NEW_MESSAGE"
    | "UPDATE_MESSAGE"
    | "UPDATE_USER_MESSAGE_CARDS"
    | "REQUEST_CONFIG"
    | "DIALOG"
    | "UPDATE_WIDGET"
    | (string & {});
  /** Input only. URL for users to authenticate or configure. (Only for `REQUEST_CONFIG` response types.) */
  url?: string;
  /** Input only. A response to an interaction event related to a [dialog](https://developers.google.com/workspace/chat/dialogs). Must be accompanied by `ResponseType.Dialog`. */
  dialogAction?: DialogAction;
}

export const ActionResponse: Schema.Schema<ActionResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      updatedWidget: Schema.optional(UpdatedWidget),
      type: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      dialogAction: Schema.optional(DialogAction),
    }),
  ).annotate({
    identifier: "ActionResponse",
  }) as any as Schema.Schema<ActionResponse>;

export interface AttachedGif {
  /** Output only. The URL that hosts the GIF image. */
  uri?: string;
}

export const AttachedGif: Schema.Schema<AttachedGif> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AttachedGif",
  }) as any as Schema.Schema<AttachedGif>;

export interface Image {
  /** The aspect ratio of this image (width and height). This field lets you reserve the right height for the image while waiting for it to load. It's not meant to override the built-in aspect ratio of the image. If unset, the server fills it by prefetching the image. */
  aspectRatio?: number;
  /** The URL of the image. */
  imageUrl?: string;
  /** The `onclick` action. */
  onClick?: OnClick;
}

export const Image: Schema.Schema<Image> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      aspectRatio: Schema.optional(Schema.Number),
      imageUrl: Schema.optional(Schema.String),
      onClick: Schema.optional(OnClick),
    }),
  ).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface TextParagraph {
  text?: string;
}

export const TextParagraph: Schema.Schema<TextParagraph> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TextParagraph",
  }) as any as Schema.Schema<TextParagraph>;

export interface KeyValue {
  /** The text of the top label. Formatted text supported. For more information about formatting text, see [Formatting text in Google Chat apps](https://developers.google.com/workspace/chat/format-messages#card-formatting) and [Formatting text in Google Workspace Add-ons](https://developers.google.com/apps-script/add-ons/concepts/widgets#text_formatting). */
  topLabel?: string;
  /** The text of the bottom label. Formatted text supported. For more information about formatting text, see [Formatting text in Google Chat apps](https://developers.google.com/workspace/chat/format-messages#card-formatting) and [Formatting text in Google Workspace Add-ons](https://developers.google.com/apps-script/add-ons/concepts/widgets#text_formatting). */
  bottomLabel?: string;
  /** A button that can be clicked to trigger an action. */
  button?: Button;
  /** If the content should be multiline. */
  contentMultiline?: boolean;
  /** An enum value that's replaced by the Chat API with the corresponding icon image. */
  icon?:
    | "ICON_UNSPECIFIED"
    | "AIRPLANE"
    | "BOOKMARK"
    | "BUS"
    | "CAR"
    | "CLOCK"
    | "CONFIRMATION_NUMBER_ICON"
    | "DOLLAR"
    | "DESCRIPTION"
    | "EMAIL"
    | "EVENT_PERFORMER"
    | "EVENT_SEAT"
    | "FLIGHT_ARRIVAL"
    | "FLIGHT_DEPARTURE"
    | "HOTEL"
    | "HOTEL_ROOM_TYPE"
    | "INVITE"
    | "MAP_PIN"
    | "MEMBERSHIP"
    | "MULTIPLE_PEOPLE"
    | "OFFER"
    | "PERSON"
    | "PHONE"
    | "RESTAURANT_ICON"
    | "SHOPPING_CART"
    | "STAR"
    | "STORE"
    | "TICKET"
    | "TRAIN"
    | "VIDEO_CAMERA"
    | "VIDEO_PLAY"
    | (string & {});
  /** The text of the content. Formatted text supported and always required. For more information about formatting text, see [Formatting text in Google Chat apps](https://developers.google.com/workspace/chat/format-messages#card-formatting) and [Formatting text in Google Workspace Add-ons](https://developers.google.com/apps-script/add-ons/concepts/widgets#text_formatting). */
  content?: string;
  /** The `onclick` action. Only the top label, bottom label, and content region are clickable. */
  onClick?: OnClick;
  /** The icon specified by a URL. */
  iconUrl?: string;
}

export const KeyValue: Schema.Schema<KeyValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      topLabel: Schema.optional(Schema.String),
      bottomLabel: Schema.optional(Schema.String),
      button: Schema.optional(Button),
      contentMultiline: Schema.optional(Schema.Boolean),
      icon: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      onClick: Schema.optional(OnClick),
      iconUrl: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "KeyValue" }) as any as Schema.Schema<KeyValue>;

export interface WidgetMarkup {
  /** Display an image in this widget. */
  image?: Image;
  /** Display a text paragraph in this widget. */
  textParagraph?: TextParagraph;
  /** Display a key value item in this widget. */
  keyValue?: KeyValue;
  /** A list of buttons. Buttons is also `oneof data` and only one of these fields should be set. */
  buttons?: Array<Button>;
}

export const WidgetMarkup: Schema.Schema<WidgetMarkup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      image: Schema.optional(Image),
      textParagraph: Schema.optional(TextParagraph),
      keyValue: Schema.optional(KeyValue),
      buttons: Schema.optional(Schema.Array(Button)),
    }),
  ).annotate({
    identifier: "WidgetMarkup",
  }) as any as Schema.Schema<WidgetMarkup>;

export interface Section {
  /** A section must contain at least one widget. */
  widgets?: Array<WidgetMarkup>;
  /** The header of the section. Formatted text is supported. For more information about formatting text, see [Formatting text in Google Chat apps](https://developers.google.com/workspace/chat/format-messages#card-formatting) and [Formatting text in Google Workspace Add-ons](https://developers.google.com/apps-script/add-ons/concepts/widgets#text_formatting). */
  header?: string;
}

export const Section: Schema.Schema<Section> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      widgets: Schema.optional(Schema.Array(WidgetMarkup)),
      header: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Section" }) as any as Schema.Schema<Section>;

export interface CardAction {
  /** The label used to be displayed in the action menu item. */
  actionLabel?: string;
  /** The onclick action for this action item. */
  onClick?: OnClick;
}

export const CardAction: Schema.Schema<CardAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      actionLabel: Schema.optional(Schema.String),
      onClick: Schema.optional(OnClick),
    }),
  ).annotate({ identifier: "CardAction" }) as any as Schema.Schema<CardAction>;

export interface CardHeader {
  /** The subtitle of the card header. */
  subtitle?: string;
  /** The title must be specified. The header has a fixed height: if both a title and subtitle is specified, each takes up one line. If only the title is specified, it takes up both lines. */
  title?: string;
  /** The image's type (for example, square border or circular border). */
  imageStyle?: "IMAGE_STYLE_UNSPECIFIED" | "IMAGE" | "AVATAR" | (string & {});
  /** The URL of the image in the card header. */
  imageUrl?: string;
}

export const CardHeader: Schema.Schema<CardHeader> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subtitle: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      imageStyle: Schema.optional(Schema.String),
      imageUrl: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "CardHeader" }) as any as Schema.Schema<CardHeader>;

export interface Card {
  /** Sections are separated by a line divider. */
  sections?: Array<Section>;
  /** The actions of this card. */
  cardActions?: Array<CardAction>;
  /** The header of the card. A header usually contains a title and an image. */
  header?: CardHeader;
  /** Name of the card. */
  name?: string;
}

export const Card: Schema.Schema<Card> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sections: Schema.optional(Schema.Array(Section)),
      cardActions: Schema.optional(Schema.Array(CardAction)),
      header: Schema.optional(CardHeader),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Card" }) as any as Schema.Schema<Card>;

export interface Message {
  /** Optional. User-uploaded attachment. */
  attachment?: Array<Attachment>;
  /** Output only. The user who created the message. If your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output populates the [user](https://developers.google.com/workspace/chat/api/reference/rest/v1/User) `name` and `type`. */
  sender?: User;
  /** Output only. When `true`, the message is a response in a reply thread. When `false`, the message is visible in the space's top-level conversation as either the first message of a thread or a message with no threaded replies. If the space doesn't support reply in threads, this field is always `false`. */
  threadReply?: boolean;
  /** Optional. An array of [cards](https://developers.google.com/workspace/chat/api/reference/rest/v1/cards). Chat apps can create cards with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). As part of the [Developer Preview Program](https://developers.google.com/workspace/preview), if your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), it can create card messages. If your Chat app is not part of Developer Preview Program, it can't create cards with user authentication. To learn how to create a message that contains cards, see [Send a message](https://developers.google.com/workspace/chat/create-messages). [Card builder](https://addons.gsuite.google.com/uikit/builder) */
  cardsV2?: Array<CardWithId>;
  /** Output only. Slash command information, if applicable. */
  slashCommand?: SlashCommand;
  /** Output only. A URL in `spaces.messages.text` that matches a link preview pattern. For more information, see [Preview links](https://developers.google.com/workspace/chat/preview-links). */
  matchedUrl?: MatchedUrl;
  /** Output only. If your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output only populates the [space](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces) `name`. */
  space?: Space;
  /** Output only. Contains the message `text` with markups added to communicate formatting. This field might not capture all formatting visible in the UI, but includes the following: * [Markup syntax](https://developers.google.com/workspace/chat/format-messages) for bold, italic, strikethrough, monospace, monospace block, and bulleted list. * [User mentions](https://developers.google.com/workspace/chat/format-messages#messages-@mention) using the format ``. * Custom hyperlinks using the format `<{url}|{rendered_text}>` where the first string is the URL and the second is the rendered text—for example, ``. * Custom emoji using the format `:{emoji_name}:`—for example, `:smile:`. This doesn't apply to Unicode emoji, such as `U+1F600` for a grinning face emoji. * Bullet list items using asterisks (`*`)—for example, `* item`. For more information, see [View text formatting sent in a message](https://developers.google.com/workspace/chat/format-messages#view_text_formatting_sent_in_a_message) */
  formattedText?: string;
  /** Optional. Immutable. For spaces created in Chat, the time at which the message was created. This field is output only, except when used in import mode spaces. For import mode spaces, set this field to the historical timestamp at which the message was created in the source in order to preserve the original creation time. */
  createTime?: string;
  /** Output only. The time at which the message was deleted in Google Chat. If the message is never deleted, this field is empty. */
  deleteTime?: string;
  /** Optional. One or more interactive widgets that appear at the bottom of a message. You can add accessory widgets to messages that contain text, cards, or both text and cards. Not supported for messages that contain dialogs. For details, see [Add interactive widgets at the bottom of a message](https://developers.google.com/workspace/chat/create-messages#add-accessory-widgets). Creating a message with accessory widgets requires [app authentication] (https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). */
  accessoryWidgets?: Array<AccessoryWidget>;
  /** Output only. Annotations can be associated with the plain-text body of the message or with chips that link to Google Workspace resources like Google Docs or Sheets with `start_index` and `length` of 0. */
  annotations?: Array<Annotation>;
  /** Optional. Plain-text body of the message. The first link to an image, video, or web page generates a [preview chip](https://developers.google.com/workspace/chat/preview-links). You can also [@mention a Google Chat user](https://developers.google.com/workspace/chat/format-messages#messages-@mention), or everyone in the space. To learn about creating text messages, see [Send a message](https://developers.google.com/workspace/chat/create-messages). */
  text?: string;
  /** Output only. Plain-text body of the message with all Chat app mentions stripped out. */
  argumentText?: string;
  /** Optional. Immutable. Input for creating a message, otherwise output only. The user that can view the message. When set, the message is private and only visible to the specified user and the Chat app. To include this field in your request, you must call the Chat API using [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) and omit the following: * [Attachments](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages.attachments) For details, see [Send a message privately](https://developers.google.com/workspace/chat/create-messages#private). */
  privateMessageViewer?: User;
  /** Optional. Information about a message that another message quotes. When you create a message, you can quote messages within the same thread, or quote a root message to create a new root message. However, you can't quote a message reply from a different thread. When you update a message, you can't add or replace the `quotedMessageMetadata` field, but you can remove it. For example usage, see [Quote another message](https://developers.google.com/workspace/chat/create-messages#quote-a-message). */
  quotedMessageMetadata?: QuotedMessageMetadata;
  /** Output only. The list of emoji reaction summaries on the message. */
  emojiReactionSummaries?: Array<EmojiReactionSummary>;
  /** Optional. A custom ID for the message. You can use field to identify a message, or to get, delete, or update a message. To set a custom ID, specify the [`messageId`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages/create#body.QUERY_PARAMETERS.message_id) field when you create the message. For details, see [Name a message](https://developers.google.com/workspace/chat/create-messages#name_a_created_message). */
  clientAssignedMessageId?: string;
  /** Output only. The time at which the message was last edited by a user. If the message has never been edited, this field is empty. */
  lastUpdateTime?: string;
  /** The thread the message belongs to. For example usage, see [Start or reply to a message thread](https://developers.google.com/workspace/chat/create-messages#create-message-thread). */
  thread?: Thread;
  /** Output only. Information about a deleted message. A message is deleted when `delete_time` is set. */
  deletionMetadata?: DeletionMetadata;
  /** Optional. A plain-text description of the message's cards, used when the actual cards can't be displayed—for example, mobile notifications. */
  fallbackText?: string;
  /** Input only. Parameters that a Chat app can use to configure how its response is posted. */
  actionResponse?: ActionResponse;
  /** Output only. GIF images that are attached to the message. */
  attachedGifs?: Array<AttachedGif>;
  /** Deprecated: Use `cards_v2` instead. Rich, formatted, and interactive cards that you can use to display UI elements such as: formatted texts, buttons, and clickable images. Cards are normally displayed below the plain-text body of the message. `cards` and `cards_v2` can have a maximum size of 32 KB. */
  cards?: Array<Card>;
  /** Identifier. Resource name of the message. Format: `spaces/{space}/messages/{message}` Where `{space}` is the ID of the space where the message is posted and `{message}` is a system-assigned ID for the message. For example, `spaces/AAAAAAAAAAA/messages/BBBBBBBBBBB.BBBBBBBBBBB`. If you set a custom ID when you create a message, you can use this ID to specify the message in a request by replacing `{message}` with the value from the `clientAssignedMessageId` field. For example, `spaces/AAAAAAAAAAA/messages/client-custom-name`. For details, see [Name a message](https://developers.google.com/workspace/chat/create-messages#name_a_created_message). */
  name?: string;
}

export const Message: Schema.Schema<Message> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attachment: Schema.optional(Schema.Array(Attachment)),
      sender: Schema.optional(User),
      threadReply: Schema.optional(Schema.Boolean),
      cardsV2: Schema.optional(Schema.Array(CardWithId)),
      slashCommand: Schema.optional(SlashCommand),
      matchedUrl: Schema.optional(MatchedUrl),
      space: Schema.optional(Space),
      formattedText: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      accessoryWidgets: Schema.optional(Schema.Array(AccessoryWidget)),
      annotations: Schema.optional(Schema.Array(Annotation)),
      text: Schema.optional(Schema.String),
      argumentText: Schema.optional(Schema.String),
      privateMessageViewer: Schema.optional(User),
      quotedMessageMetadata: Schema.optional(QuotedMessageMetadata),
      emojiReactionSummaries: Schema.optional(
        Schema.Array(EmojiReactionSummary),
      ),
      clientAssignedMessageId: Schema.optional(Schema.String),
      lastUpdateTime: Schema.optional(Schema.String),
      thread: Schema.optional(Thread),
      deletionMetadata: Schema.optional(DeletionMetadata),
      fallbackText: Schema.optional(Schema.String),
      actionResponse: Schema.optional(ActionResponse),
      attachedGifs: Schema.optional(Schema.Array(AttachedGif)),
      cards: Schema.optional(Schema.Array(Card)),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Message" }) as any as Schema.Schema<Message>;

export interface MessageUpdatedEventData {
  /** The updated message. */
  message?: Message;
}

export const MessageUpdatedEventData: Schema.Schema<MessageUpdatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Message),
    }),
  ).annotate({
    identifier: "MessageUpdatedEventData",
  }) as any as Schema.Schema<MessageUpdatedEventData>;

export interface ListReactionsResponse {
  /** List of reactions in the requested (or first) page. */
  reactions?: Array<Reaction>;
  /** Continuation token to retrieve the next page of results. It's empty for the last page of results. */
  nextPageToken?: string;
}

export const ListReactionsResponse: Schema.Schema<ListReactionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reactions: Schema.optional(Schema.Array(Reaction)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListReactionsResponse",
  }) as any as Schema.Schema<ListReactionsResponse>;

export interface Group {
  /** Resource name for a Google Group. Represents a [group](https://cloud.google.com/identity/docs/reference/rest/v1/groups) in Cloud Identity Groups API. Format: groups/{group} */
  name?: string;
}

export const Group: Schema.Schema<Group> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Group" }) as any as Schema.Schema<Group>;

export interface MessageCreatedEventData {
  /** The new message. */
  message?: Message;
}

export const MessageCreatedEventData: Schema.Schema<MessageCreatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Message),
    }),
  ).annotate({
    identifier: "MessageCreatedEventData",
  }) as any as Schema.Schema<MessageCreatedEventData>;

export interface MessageDeletedEventData {
  /** The deleted message. Only the `name`, `createTime`, and `deletionMetadata` fields are populated. */
  message?: Message;
}

export const MessageDeletedEventData: Schema.Schema<MessageDeletedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Message),
    }),
  ).annotate({
    identifier: "MessageDeletedEventData",
  }) as any as Schema.Schema<MessageDeletedEventData>;

export interface Membership {
  /** Identifier. Resource name of the membership, assigned by the server. Format: `spaces/{space}/members/{member}` */
  name?: string;
  /** Optional. Immutable. The creation time of the membership, such as when a member joined or was invited to join a space. This field is output only, except when used to import historical memberships in import mode spaces. */
  createTime?: string;
  /** Optional. Immutable. The deletion time of the membership, such as when a member left or was removed from a space. This field is output only, except when used to import historical memberships in import mode spaces. */
  deleteTime?: string;
  /** Optional. User's role within a Chat space, which determines their permitted actions in the space. This field can only be used as input in `UpdateMembership`. */
  role?:
    | "MEMBERSHIP_ROLE_UNSPECIFIED"
    | "ROLE_MEMBER"
    | "ROLE_MANAGER"
    | "ROLE_ASSISTANT_MANAGER"
    | (string & {});
  /** Optional. The Google Chat user or app the membership corresponds to. If your Chat app [authenticates as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), the output populates the [user](https://developers.google.com/workspace/chat/api/reference/rest/v1/User) `name` and `type`. */
  member?: User;
  /** Optional. The Google Group the membership corresponds to. Reading or mutating memberships for Google Groups requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user). */
  groupMember?: Group;
  /** Output only. State of the membership. */
  state?:
    | "MEMBERSHIP_STATE_UNSPECIFIED"
    | "JOINED"
    | "INVITED"
    | "NOT_A_MEMBER"
    | (string & {});
}

export const Membership: Schema.Schema<Membership> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      role: Schema.optional(Schema.String),
      member: Schema.optional(User),
      groupMember: Schema.optional(Group),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Membership" }) as any as Schema.Schema<Membership>;

export interface MembershipCreatedEventData {
  /** The new membership. */
  membership?: Membership;
}

export const MembershipCreatedEventData: Schema.Schema<MembershipCreatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      membership: Schema.optional(Membership),
    }),
  ).annotate({
    identifier: "MembershipCreatedEventData",
  }) as any as Schema.Schema<MembershipCreatedEventData>;

export interface MembershipDeletedEventData {
  /** The deleted membership. Only the `name` and `state` fields are populated. */
  membership?: Membership;
}

export const MembershipDeletedEventData: Schema.Schema<MembershipDeletedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      membership: Schema.optional(Membership),
    }),
  ).annotate({
    identifier: "MembershipDeletedEventData",
  }) as any as Schema.Schema<MembershipDeletedEventData>;

export interface MessageBatchUpdatedEventData {
  /** A list of updated messages. */
  messages?: Array<MessageUpdatedEventData>;
}

export const MessageBatchUpdatedEventData: Schema.Schema<MessageBatchUpdatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messages: Schema.optional(Schema.Array(MessageUpdatedEventData)),
    }),
  ).annotate({
    identifier: "MessageBatchUpdatedEventData",
  }) as any as Schema.Schema<MessageBatchUpdatedEventData>;

export interface MessageBatchDeletedEventData {
  /** A list of deleted messages. */
  messages?: Array<MessageDeletedEventData>;
}

export const MessageBatchDeletedEventData: Schema.Schema<MessageBatchDeletedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messages: Schema.optional(Schema.Array(MessageDeletedEventData)),
    }),
  ).annotate({
    identifier: "MessageBatchDeletedEventData",
  }) as any as Schema.Schema<MessageBatchDeletedEventData>;

export interface MembershipUpdatedEventData {
  /** The updated membership. */
  membership?: Membership;
}

export const MembershipUpdatedEventData: Schema.Schema<MembershipUpdatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      membership: Schema.optional(Membership),
    }),
  ).annotate({
    identifier: "MembershipUpdatedEventData",
  }) as any as Schema.Schema<MembershipUpdatedEventData>;

export interface SpaceUpdatedEventData {
  /** The updated space. */
  space?: Space;
}

export const SpaceUpdatedEventData: Schema.Schema<SpaceUpdatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      space: Schema.optional(Space),
    }),
  ).annotate({
    identifier: "SpaceUpdatedEventData",
  }) as any as Schema.Schema<SpaceUpdatedEventData>;

export interface ReactionCreatedEventData {
  /** The new reaction. */
  reaction?: Reaction;
}

export const ReactionCreatedEventData: Schema.Schema<ReactionCreatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reaction: Schema.optional(Reaction),
    }),
  ).annotate({
    identifier: "ReactionCreatedEventData",
  }) as any as Schema.Schema<ReactionCreatedEventData>;

export interface MembershipBatchUpdatedEventData {
  /** A list of updated memberships. */
  memberships?: Array<MembershipUpdatedEventData>;
}

export const MembershipBatchUpdatedEventData: Schema.Schema<MembershipBatchUpdatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memberships: Schema.optional(Schema.Array(MembershipUpdatedEventData)),
    }),
  ).annotate({
    identifier: "MembershipBatchUpdatedEventData",
  }) as any as Schema.Schema<MembershipBatchUpdatedEventData>;

export interface ReactionBatchCreatedEventData {
  /** A list of new reactions. */
  reactions?: Array<ReactionCreatedEventData>;
}

export const ReactionBatchCreatedEventData: Schema.Schema<ReactionBatchCreatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reactions: Schema.optional(Schema.Array(ReactionCreatedEventData)),
    }),
  ).annotate({
    identifier: "ReactionBatchCreatedEventData",
  }) as any as Schema.Schema<ReactionBatchCreatedEventData>;

export interface MembershipBatchCreatedEventData {
  /** A list of new memberships. */
  memberships?: Array<MembershipCreatedEventData>;
}

export const MembershipBatchCreatedEventData: Schema.Schema<MembershipBatchCreatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memberships: Schema.optional(Schema.Array(MembershipCreatedEventData)),
    }),
  ).annotate({
    identifier: "MembershipBatchCreatedEventData",
  }) as any as Schema.Schema<MembershipBatchCreatedEventData>;

export interface SpaceBatchUpdatedEventData {
  /** A list of updated spaces. */
  spaces?: Array<SpaceUpdatedEventData>;
}

export const SpaceBatchUpdatedEventData: Schema.Schema<SpaceBatchUpdatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      spaces: Schema.optional(Schema.Array(SpaceUpdatedEventData)),
    }),
  ).annotate({
    identifier: "SpaceBatchUpdatedEventData",
  }) as any as Schema.Schema<SpaceBatchUpdatedEventData>;

export interface MembershipBatchDeletedEventData {
  /** A list of deleted memberships. */
  memberships?: Array<MembershipDeletedEventData>;
}

export const MembershipBatchDeletedEventData: Schema.Schema<MembershipBatchDeletedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memberships: Schema.optional(Schema.Array(MembershipDeletedEventData)),
    }),
  ).annotate({
    identifier: "MembershipBatchDeletedEventData",
  }) as any as Schema.Schema<MembershipBatchDeletedEventData>;

export interface MessageBatchCreatedEventData {
  /** A list of new messages. */
  messages?: Array<MessageCreatedEventData>;
}

export const MessageBatchCreatedEventData: Schema.Schema<MessageBatchCreatedEventData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messages: Schema.optional(Schema.Array(MessageCreatedEventData)),
    }),
  ).annotate({
    identifier: "MessageBatchCreatedEventData",
  }) as any as Schema.Schema<MessageBatchCreatedEventData>;

export interface SpaceEvent {
  /** Event payload for a new message. Event type: `google.workspace.chat.message.v1.created` */
  messageCreatedEventData?: MessageCreatedEventData;
  /** Type of space event. Each event type has a batch version, which represents multiple instances of the event type that occur in a short period of time. For `spaceEvents.list()` requests, omit batch event types in your query filter. By default, the server returns both event type and its batch version. Supported event types for [messages](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages): * New message: `google.workspace.chat.message.v1.created` * Updated message: `google.workspace.chat.message.v1.updated` * Deleted message: `google.workspace.chat.message.v1.deleted` * Multiple new messages: `google.workspace.chat.message.v1.batchCreated` * Multiple updated messages: `google.workspace.chat.message.v1.batchUpdated` * Multiple deleted messages: `google.workspace.chat.message.v1.batchDeleted` Supported event types for [memberships](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.members): * New membership: `google.workspace.chat.membership.v1.created` * Updated membership: `google.workspace.chat.membership.v1.updated` * Deleted membership: `google.workspace.chat.membership.v1.deleted` * Multiple new memberships: `google.workspace.chat.membership.v1.batchCreated` * Multiple updated memberships: `google.workspace.chat.membership.v1.batchUpdated` * Multiple deleted memberships: `google.workspace.chat.membership.v1.batchDeleted` Supported event types for [reactions](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages.reactions): * New reaction: `google.workspace.chat.reaction.v1.created` * Deleted reaction: `google.workspace.chat.reaction.v1.deleted` * Multiple new reactions: `google.workspace.chat.reaction.v1.batchCreated` * Multiple deleted reactions: `google.workspace.chat.reaction.v1.batchDeleted` Supported event types about the [space](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces): * Updated space: `google.workspace.chat.space.v1.updated` * Multiple space updates: `google.workspace.chat.space.v1.batchUpdated` */
  eventType?: string;
  /** Event payload for a deleted message. Event type: `google.workspace.chat.message.v1.deleted` */
  messageDeletedEventData?: MessageDeletedEventData;
  /** Event payload for a new membership. Event type: `google.workspace.chat.membership.v1.created` */
  membershipCreatedEventData?: MembershipCreatedEventData;
  /** Event payload for a deleted membership. Event type: `google.workspace.chat.membership.v1.deleted` */
  membershipDeletedEventData?: MembershipDeletedEventData;
  /** Time when the event occurred. */
  eventTime?: string;
  /** Event payload for multiple updated messages. Event type: `google.workspace.chat.message.v1.batchUpdated` */
  messageBatchUpdatedEventData?: MessageBatchUpdatedEventData;
  /** Event payload for multiple deleted messages. Event type: `google.workspace.chat.message.v1.batchDeleted` */
  messageBatchDeletedEventData?: MessageBatchDeletedEventData;
  /** Event payload for an updated membership. Event type: `google.workspace.chat.membership.v1.updated` */
  membershipUpdatedEventData?: MembershipUpdatedEventData;
  /** Event payload for a space update. Event type: `google.workspace.chat.space.v1.updated` */
  spaceUpdatedEventData?: SpaceUpdatedEventData;
  /** Event payload for a new reaction. Event type: `google.workspace.chat.reaction.v1.created` */
  reactionCreatedEventData?: ReactionCreatedEventData;
  /** Resource name of the space event. Format: `spaces/{space}/spaceEvents/{spaceEvent}` */
  name?: string;
  /** Event payload for multiple updated memberships. Event type: `google.workspace.chat.membership.v1.batchUpdated` */
  membershipBatchUpdatedEventData?: MembershipBatchUpdatedEventData;
  /** Event payload for a deleted reaction. Event type: `google.workspace.chat.reaction.v1.deleted` */
  reactionDeletedEventData?: ReactionDeletedEventData;
  /** Event payload for multiple new reactions. Event type: `google.workspace.chat.reaction.v1.batchCreated` */
  reactionBatchCreatedEventData?: ReactionBatchCreatedEventData;
  /** Event payload for multiple new memberships. Event type: `google.workspace.chat.membership.v1.batchCreated` */
  membershipBatchCreatedEventData?: MembershipBatchCreatedEventData;
  /** Event payload for multiple deleted reactions. Event type: `google.workspace.chat.reaction.v1.batchDeleted` */
  reactionBatchDeletedEventData?: ReactionBatchDeletedEventData;
  /** Event payload for multiple updates to a space. Event type: `google.workspace.chat.space.v1.batchUpdated` */
  spaceBatchUpdatedEventData?: SpaceBatchUpdatedEventData;
  /** Event payload for multiple deleted memberships. Event type: `google.workspace.chat.membership.v1.batchDeleted` */
  membershipBatchDeletedEventData?: MembershipBatchDeletedEventData;
  /** Event payload for an updated message. Event type: `google.workspace.chat.message.v1.updated` */
  messageUpdatedEventData?: MessageUpdatedEventData;
  /** Event payload for multiple new messages. Event type: `google.workspace.chat.message.v1.batchCreated` */
  messageBatchCreatedEventData?: MessageBatchCreatedEventData;
}

export const SpaceEvent: Schema.Schema<SpaceEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messageCreatedEventData: Schema.optional(MessageCreatedEventData),
      eventType: Schema.optional(Schema.String),
      messageDeletedEventData: Schema.optional(MessageDeletedEventData),
      membershipCreatedEventData: Schema.optional(MembershipCreatedEventData),
      membershipDeletedEventData: Schema.optional(MembershipDeletedEventData),
      eventTime: Schema.optional(Schema.String),
      messageBatchUpdatedEventData: Schema.optional(
        MessageBatchUpdatedEventData,
      ),
      messageBatchDeletedEventData: Schema.optional(
        MessageBatchDeletedEventData,
      ),
      membershipUpdatedEventData: Schema.optional(MembershipUpdatedEventData),
      spaceUpdatedEventData: Schema.optional(SpaceUpdatedEventData),
      reactionCreatedEventData: Schema.optional(ReactionCreatedEventData),
      name: Schema.optional(Schema.String),
      membershipBatchUpdatedEventData: Schema.optional(
        MembershipBatchUpdatedEventData,
      ),
      reactionDeletedEventData: Schema.optional(ReactionDeletedEventData),
      reactionBatchCreatedEventData: Schema.optional(
        ReactionBatchCreatedEventData,
      ),
      membershipBatchCreatedEventData: Schema.optional(
        MembershipBatchCreatedEventData,
      ),
      reactionBatchDeletedEventData: Schema.optional(
        ReactionBatchDeletedEventData,
      ),
      spaceBatchUpdatedEventData: Schema.optional(SpaceBatchUpdatedEventData),
      membershipBatchDeletedEventData: Schema.optional(
        MembershipBatchDeletedEventData,
      ),
      messageUpdatedEventData: Schema.optional(MessageUpdatedEventData),
      messageBatchCreatedEventData: Schema.optional(
        MessageBatchCreatedEventData,
      ),
    }),
  ).annotate({ identifier: "SpaceEvent" }) as any as Schema.Schema<SpaceEvent>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.Number),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface ThreadReadState {
  /** Resource name of the thread read state. Format: `users/{user}/spaces/{space}/threads/{thread}/threadReadState` */
  name?: string;
  /** The time when the user's thread read state was updated. Usually this corresponds with the timestamp of the last read message in a thread. */
  lastReadTime?: string;
}

export const ThreadReadState: Schema.Schema<ThreadReadState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      lastReadTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ThreadReadState",
  }) as any as Schema.Schema<ThreadReadState>;

export interface ChatAppLogEntry {
  /** The error code and message. */
  error?: Status;
  /** The unencrypted `callback_method` name that was running when the error was encountered. */
  deploymentFunction?: string;
  /** The deployment that caused the error. For Chat apps built in Apps Script, this is the deployment ID defined by Apps Script. */
  deployment?: string;
}

export const ChatAppLogEntry: Schema.Schema<ChatAppLogEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      error: Schema.optional(Status),
      deploymentFunction: Schema.optional(Schema.String),
      deployment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChatAppLogEntry",
  }) as any as Schema.Schema<ChatAppLogEntry>;

export interface ListCustomEmojisResponse {
  /** Unordered list. List of custom emojis. */
  customEmojis?: Array<CustomEmoji>;
  /** A token that you can send as `pageToken` to retrieve the next page of results. If empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCustomEmojisResponse: Schema.Schema<ListCustomEmojisResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customEmojis: Schema.optional(Schema.Array(CustomEmoji)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCustomEmojisResponse",
  }) as any as Schema.Schema<ListCustomEmojisResponse>;

export interface SpaceReadState {
  /** Resource name of the space read state. Format: `users/{user}/spaces/{space}/spaceReadState` */
  name?: string;
  /** Optional. The time when the user's space read state was updated. Usually this corresponds with either the timestamp of the last read message, or a timestamp specified by the user to mark the last read position in a space. */
  lastReadTime?: string;
}

export const SpaceReadState: Schema.Schema<SpaceReadState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      lastReadTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SpaceReadState",
  }) as any as Schema.Schema<SpaceReadState>;

export interface AppCommandMetadata {
  /** The type of Chat app command. */
  appCommandType?:
    | "APP_COMMAND_TYPE_UNSPECIFIED"
    | "SLASH_COMMAND"
    | "QUICK_COMMAND"
    | (string & {});
  /** The ID for the command specified in the Chat API configuration. */
  appCommandId?: number;
}

export const AppCommandMetadata: Schema.Schema<AppCommandMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      appCommandType: Schema.optional(Schema.String),
      appCommandId: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AppCommandMetadata",
  }) as any as Schema.Schema<AppCommandMetadata>;

export interface ListSpacesResponse {
  /** List of spaces in the requested (or first) page. Note: The `permissionSettings` field is not returned in the Space object for list requests. */
  spaces?: Array<Space>;
  /** You can send a token as `pageToken` to retrieve the next page of results. If empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListSpacesResponse: Schema.Schema<ListSpacesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      spaces: Schema.optional(Schema.Array(Space)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSpacesResponse",
  }) as any as Schema.Schema<ListSpacesResponse>;

export interface SearchSpacesResponse {
  /** A page of the requested spaces. */
  spaces?: Array<Space>;
  /** The total number of spaces that match the query, across all pages. If the result is over 10,000 spaces, this value is an estimate. */
  totalSize?: number;
  /** A token that can be used to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const SearchSpacesResponse: Schema.Schema<SearchSpacesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      spaces: Schema.optional(Schema.Array(Space)),
      totalSize: Schema.optional(Schema.Number),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchSpacesResponse",
  }) as any as Schema.Schema<SearchSpacesResponse>;

export interface UploadAttachmentResponse {
  /** Reference to the uploaded attachment. */
  attachmentDataRef?: AttachmentDataRef;
}

export const UploadAttachmentResponse: Schema.Schema<UploadAttachmentResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attachmentDataRef: Schema.optional(AttachmentDataRef),
    }),
  ).annotate({
    identifier: "UploadAttachmentResponse",
  }) as any as Schema.Schema<UploadAttachmentResponse>;

export interface CompleteImportSpaceResponse {
  /** The import mode space. */
  space?: Space;
}

export const CompleteImportSpaceResponse: Schema.Schema<CompleteImportSpaceResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      space: Schema.optional(Space),
    }),
  ).annotate({
    identifier: "CompleteImportSpaceResponse",
  }) as any as Schema.Schema<CompleteImportSpaceResponse>;

export interface ListSpaceEventsResponse {
  /** Results are returned in chronological order (oldest event first). Note: The `permissionSettings` field is not returned in the Space object for list requests. */
  spaceEvents?: Array<SpaceEvent>;
  /** Continuation token used to fetch more events. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListSpaceEventsResponse: Schema.Schema<ListSpaceEventsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      spaceEvents: Schema.optional(Schema.Array(SpaceEvent)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSpaceEventsResponse",
  }) as any as Schema.Schema<ListSpaceEventsResponse>;

export interface DeprecatedEvent {
  /** For `CARD_CLICKED` interaction events, the form action data associated when a user clicks a card or dialog. To learn more, see [Read form data input by users on cards](https://developers.google.com/workspace/chat/read-form-data). */
  action?: FormAction;
  /** Represents information about the user's client, such as locale, host app, and platform. For Chat apps, `CommonEventObject` includes information submitted by users interacting with [dialogs](https://developers.google.com/workspace/chat/dialogs), like data entered on a card. */
  common?: CommonEventObject;
  /** The thread in which the user interacted with the Chat app. This could be in a new thread created by a newly sent message. This field is populated if the interaction event is associated with a specific message or thread. */
  thread?: Thread;
  /** The type of [dialog](https://developers.google.com/workspace/chat/dialogs) interaction event received. */
  dialogEventType?:
    | "TYPE_UNSPECIFIED"
    | "REQUEST_DIALOG"
    | "SUBMIT_DIALOG"
    | "CANCEL_DIALOG"
    | (string & {});
  /** Metadata about a Chat app command. */
  appCommandMetadata?: AppCommandMetadata;
  /** For `ADDED_TO_SPACE`, `CARD_CLICKED`, and `MESSAGE` interaction events, the message that triggered the interaction event, if applicable. */
  message?: Message;
  /** The Chat app-defined key for the thread related to the interaction event. See [`spaces.messages.thread.threadKey`](/chat/api/reference/rest/v1/spaces.messages#Thread.FIELDS.thread_key) for more information. */
  threadKey?: string;
  /** The space in which the user interacted with the Chat app. */
  space?: Space;
  /** A secret value that legacy Chat apps can use to verify if a request is from Google. Google randomly generates the token, and its value remains static. You can obtain, revoke, or regenerate the token from the [Chat API configuration page](https://console.cloud.google.com/apis/api/chat.googleapis.com/hangouts-chat) in the Google Cloud Console. Modern Chat apps don't use this field. It is absent from API responses and the [Chat API configuration page](https://console.cloud.google.com/apis/api/chat.googleapis.com/hangouts-chat). */
  token?: string;
  /** For `CARD_CLICKED` and `MESSAGE` interaction events, whether the user is interacting with or about to interact with a [dialog](https://developers.google.com/workspace/chat/dialogs). */
  isDialogEvent?: boolean;
  /** The timestamp indicating when the interaction event occurred. */
  eventTime?: string;
  /** The user that interacted with the Chat app. */
  user?: User;
  /** The [type](/workspace/chat/api/reference/rest/v1/EventType) of user interaction with the Chat app, such as `MESSAGE` or `ADDED_TO_SPACE`. */
  type?:
    | "UNSPECIFIED"
    | "MESSAGE"
    | "ADDED_TO_SPACE"
    | "REMOVED_FROM_SPACE"
    | "CARD_CLICKED"
    | "WIDGET_UPDATED"
    | "APP_COMMAND"
    | (string & {});
  /** This URL is populated for `MESSAGE`, `ADDED_TO_SPACE`, and `APP_COMMAND` interaction events. After completing an authorization or configuration flow outside of Google Chat, users must be redirected to this URL to signal to Google Chat that the authorization or configuration flow was successful. For more information, see [Connect a Chat app with other services and tools](https://developers.google.com/workspace/chat/connect-web-services-tools). */
  configCompleteRedirectUrl?: string;
}

export const DeprecatedEvent: Schema.Schema<DeprecatedEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      action: Schema.optional(FormAction),
      common: Schema.optional(CommonEventObject),
      thread: Schema.optional(Thread),
      dialogEventType: Schema.optional(Schema.String),
      appCommandMetadata: Schema.optional(AppCommandMetadata),
      message: Schema.optional(Message),
      threadKey: Schema.optional(Schema.String),
      space: Schema.optional(Space),
      token: Schema.optional(Schema.String),
      isDialogEvent: Schema.optional(Schema.Boolean),
      eventTime: Schema.optional(Schema.String),
      user: Schema.optional(User),
      type: Schema.optional(Schema.String),
      configCompleteRedirectUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeprecatedEvent",
  }) as any as Schema.Schema<DeprecatedEvent>;

export interface SetUpSpaceRequest {
  /** Optional. A unique identifier for this request. A random UUID is recommended. Specifying an existing request ID returns the space created with that ID instead of creating a new space. Specifying an existing request ID from the same Chat app with a different authenticated user returns an error. */
  requestId?: string;
  /** Optional. The Google Chat users or groups to invite to join the space. Omit the calling user, as they are added automatically. The set currently allows up to 49 memberships (in addition to the caller). For human membership, the `Membership.member` field must contain a `user` with `name` populated (format: `users/{user}`) and `type` set to `User.Type.HUMAN`. You can only add human users when setting up a space (adding Chat apps is only supported for direct message setup with the calling app). You can also add members using the user's email as an alias for {user}. For example, the `user.name` can be `users/example@gmail.com`. To invite Gmail users or users from external Google Workspace domains, user's email must be used for `{user}`. For Google group membership, the `Membership.group_member` field must contain a `group` with `name` populated (format `groups/{group}`). You can only add Google groups when setting `Space.spaceType` to `SPACE`. Optional when setting `Space.spaceType` to `SPACE`. Required when setting `Space.spaceType` to `GROUP_CHAT`, along with at least two memberships. Required when setting `Space.spaceType` to `DIRECT_MESSAGE` with a human user, along with exactly one membership. Must be empty when creating a 1:1 conversation between a human and the calling Chat app (when setting `Space.spaceType` to `DIRECT_MESSAGE` and `Space.singleUserBotDm` to `true`). */
  memberships?: Array<Membership>;
  /** Required. The `Space.spaceType` field is required. To create a space, set `Space.spaceType` to `SPACE` and set `Space.displayName`. If you receive the error message `ALREADY_EXISTS` when setting up a space, try a different `displayName`. An existing space within the Google Workspace organization might already use this display name. To create a group chat, set `Space.spaceType` to `GROUP_CHAT`. Don't set `Space.displayName`. To create a 1:1 conversation between humans, set `Space.spaceType` to `DIRECT_MESSAGE` and set `Space.singleUserBotDm` to `false`. Don't set `Space.displayName` or `Space.spaceDetails`. To create an 1:1 conversation between a human and the calling Chat app, set `Space.spaceType` to `DIRECT_MESSAGE` and `Space.singleUserBotDm` to `true`. Don't set `Space.displayName` or `Space.spaceDetails`. If a `DIRECT_MESSAGE` space already exists, that space is returned instead of creating a new space. */
  space?: Space;
}

export const SetUpSpaceRequest: Schema.Schema<SetUpSpaceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
      memberships: Schema.optional(Schema.Array(Membership)),
      space: Schema.optional(Space),
    }),
  ).annotate({
    identifier: "SetUpSpaceRequest",
  }) as any as Schema.Schema<SetUpSpaceRequest>;

export interface ListMembershipsResponse {
  /** Unordered list. List of memberships in the requested (or first) page. */
  memberships?: Array<Membership>;
  /** A token that you can send as `pageToken` to retrieve the next page of results. If empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListMembershipsResponse: Schema.Schema<ListMembershipsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memberships: Schema.optional(Schema.Array(Membership)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListMembershipsResponse",
  }) as any as Schema.Schema<ListMembershipsResponse>;

export interface ListMessagesResponse {
  /** List of messages. */
  messages?: Array<Message>;
  /** You can send a token as `pageToken` to retrieve the next page of results. If empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListMessagesResponse: Schema.Schema<ListMessagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messages: Schema.optional(Schema.Array(Message)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListMessagesResponse",
  }) as any as Schema.Schema<ListMessagesResponse>;

export interface Media {
  /** Name of the media resource. */
  resourceName?: string;
}

export const Media: Schema.Schema<Media> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Media" }) as any as Schema.Schema<Media>;

export interface CompleteImportSpaceRequest {}

export const CompleteImportSpaceRequest: Schema.Schema<CompleteImportSpaceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CompleteImportSpaceRequest",
  }) as any as Schema.Schema<CompleteImportSpaceRequest>;

export interface SpaceNotificationSetting {
  /** The space notification mute setting. */
  muteSetting?:
    | "MUTE_SETTING_UNSPECIFIED"
    | "UNMUTED"
    | "MUTED"
    | (string & {});
  /** Identifier. The resource name of the space notification setting. Format: `users/{user}/spaces/{space}/spaceNotificationSetting`. */
  name?: string;
  /** The notification setting. */
  notificationSetting?:
    | "NOTIFICATION_SETTING_UNSPECIFIED"
    | "ALL"
    | "MAIN_CONVERSATIONS"
    | "FOR_YOU"
    | "OFF"
    | (string & {});
}

export const SpaceNotificationSetting: Schema.Schema<SpaceNotificationSetting> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      muteSetting: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      notificationSetting: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SpaceNotificationSetting",
  }) as any as Schema.Schema<SpaceNotificationSetting>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

export interface DownloadMediaRequest {
  /** Name of the media that is being downloaded. See ReadRequest.resource_name. */
  resourceName: string;
}

export const DownloadMediaRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceName: Schema.String.pipe(T.HttpPath("resourceName")),
}).pipe(
  T.Http({ method: "GET", path: "v1/media/{mediaId}" }),
  svc,
) as unknown as Schema.Schema<DownloadMediaRequest>;

export type DownloadMediaResponse = Media;
export const DownloadMediaResponse = /*@__PURE__*/ /*#__PURE__*/ Media;

export type DownloadMediaError = DefaultErrors;

/** Downloads media. Download is supported on the URI `/v1/media/{+name}?alt=media`. */
export const downloadMedia: API.OperationMethod<
  DownloadMediaRequest,
  DownloadMediaResponse,
  DownloadMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DownloadMediaRequest,
  output: DownloadMediaResponse,
  errors: [],
}));

export interface UploadMediaRequest {
  /** Required. Resource name of the Chat space in which the attachment is uploaded. Format "spaces/{space}". */
  parent: string;
  /** Request body */
  body?: UploadAttachmentRequest;
}

export const UploadMediaRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UploadAttachmentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/spaces/{spacesId}/attachments:upload",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UploadMediaRequest>;

export type UploadMediaResponse = UploadAttachmentResponse;
export const UploadMediaResponse =
  /*@__PURE__*/ /*#__PURE__*/ UploadAttachmentResponse;

export type UploadMediaError = DefaultErrors;

/** Uploads an attachment. For an example, see [Upload media as a file attachment](https://developers.google.com/workspace/chat/upload-media-attachments). Requires user [authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following [authorization scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.messages.create` - `https://www.googleapis.com/auth/chat.messages` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) You can upload attachments up to 200 MB. Certain file types aren't supported. For details, see [File types blocked by Google Chat](https://support.google.com/chat/answer/7651457?&co=GENIE.Platform%3DDesktop#File%20types%20blocked%20in%20Google%20Chat). */
export const uploadMedia: API.OperationMethod<
  UploadMediaRequest,
  UploadMediaResponse,
  UploadMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UploadMediaRequest,
  output: UploadMediaResponse,
  errors: [],
}));

export interface GetSpaceReadStateUsersSpacesRequest {
  /** Required. Resource name of the space read state to retrieve. Only supports getting read state for the calling user. To refer to the calling user, set one of the following: - The `me` alias. For example, `users/me/spaces/{space}/spaceReadState`. - Their Workspace email address. For example, `users/user@example.com/spaces/{space}/spaceReadState`. - Their user id. For example, `users/123456789/spaces/{space}/spaceReadState`. Format: users/{user}/spaces/{space}/spaceReadState */
  name: string;
}

export const GetSpaceReadStateUsersSpacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/users/{usersId}/spaces/{spacesId}/spaceReadState",
    }),
    svc,
  ) as unknown as Schema.Schema<GetSpaceReadStateUsersSpacesRequest>;

export type GetSpaceReadStateUsersSpacesResponse = SpaceReadState;
export const GetSpaceReadStateUsersSpacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ SpaceReadState;

export type GetSpaceReadStateUsersSpacesError = DefaultErrors;

/** Returns details about a user's read state within a space, used to identify read and unread messages. For an example, see [Get details about a user's space read state](https://developers.google.com/workspace/chat/get-space-read-state). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following [authorization scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.users.readstate.readonly` - `https://www.googleapis.com/auth/chat.users.readstate` */
export const getSpaceReadStateUsersSpaces: API.OperationMethod<
  GetSpaceReadStateUsersSpacesRequest,
  GetSpaceReadStateUsersSpacesResponse,
  GetSpaceReadStateUsersSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSpaceReadStateUsersSpacesRequest,
  output: GetSpaceReadStateUsersSpacesResponse,
  errors: [],
}));

export interface UpdateSpaceReadStateUsersSpacesRequest {
  /** Resource name of the space read state. Format: `users/{user}/spaces/{space}/spaceReadState` */
  name: string;
  /** Required. The field paths to update. Currently supported field paths: - `last_read_time` When the `last_read_time` is before the latest message create time, the space appears as unread in the UI. To mark the space as read, set `last_read_time` to any value later (larger) than the latest message create time. The `last_read_time` is coerced to match the latest message create time. Note that the space read state only affects the read state of messages that are visible in the space's top-level conversation. Replies in threads are unaffected by this timestamp, and instead rely on the thread read state. */
  updateMask?: string;
  /** Request body */
  body?: SpaceReadState;
}

export const UpdateSpaceReadStateUsersSpacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(SpaceReadState).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/users/{usersId}/spaces/{spacesId}/spaceReadState",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateSpaceReadStateUsersSpacesRequest>;

export type UpdateSpaceReadStateUsersSpacesResponse = SpaceReadState;
export const UpdateSpaceReadStateUsersSpacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ SpaceReadState;

export type UpdateSpaceReadStateUsersSpacesError = DefaultErrors;

/** Updates a user's read state within a space, used to identify read and unread messages. For an example, see [Update a user's space read state](https://developers.google.com/workspace/chat/update-space-read-state). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with the [authorization scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.users.readstate` */
export const updateSpaceReadStateUsersSpaces: API.OperationMethod<
  UpdateSpaceReadStateUsersSpacesRequest,
  UpdateSpaceReadStateUsersSpacesResponse,
  UpdateSpaceReadStateUsersSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSpaceReadStateUsersSpacesRequest,
  output: UpdateSpaceReadStateUsersSpacesResponse,
  errors: [],
}));

export interface GetThreadReadStateUsersSpacesThreadsRequest {
  /** Required. Resource name of the thread read state to retrieve. Only supports getting read state for the calling user. To refer to the calling user, set one of the following: - The `me` alias. For example, `users/me/spaces/{space}/threads/{thread}/threadReadState`. - Their Workspace email address. For example, `users/user@example.com/spaces/{space}/threads/{thread}/threadReadState`. - Their user id. For example, `users/123456789/spaces/{space}/threads/{thread}/threadReadState`. Format: users/{user}/spaces/{space}/threads/{thread}/threadReadState */
  name: string;
}

export const GetThreadReadStateUsersSpacesThreadsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/users/{usersId}/spaces/{spacesId}/threads/{threadsId}/threadReadState",
    }),
    svc,
  ) as unknown as Schema.Schema<GetThreadReadStateUsersSpacesThreadsRequest>;

export type GetThreadReadStateUsersSpacesThreadsResponse = ThreadReadState;
export const GetThreadReadStateUsersSpacesThreadsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ThreadReadState;

export type GetThreadReadStateUsersSpacesThreadsError = DefaultErrors;

/** Returns details about a user's read state within a thread, used to identify read and unread messages. For an example, see [Get details about a user's thread read state](https://developers.google.com/workspace/chat/get-thread-read-state). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following [authorization scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.users.readstate.readonly` - `https://www.googleapis.com/auth/chat.users.readstate` */
export const getThreadReadStateUsersSpacesThreads: API.OperationMethod<
  GetThreadReadStateUsersSpacesThreadsRequest,
  GetThreadReadStateUsersSpacesThreadsResponse,
  GetThreadReadStateUsersSpacesThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetThreadReadStateUsersSpacesThreadsRequest,
  output: GetThreadReadStateUsersSpacesThreadsResponse,
  errors: [],
}));

export interface GetUsersSpacesSpaceNotificationSettingRequest {
  /** Required. Format: users/{user}/spaces/{space}/spaceNotificationSetting - `users/me/spaces/{space}/spaceNotificationSetting`, OR - `users/user@example.com/spaces/{space}/spaceNotificationSetting`, OR - `users/123456789/spaces/{space}/spaceNotificationSetting`. Note: Only the caller's user id or email is allowed in the path. */
  name: string;
}

export const GetUsersSpacesSpaceNotificationSettingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/users/{usersId}/spaces/{spacesId}/spaceNotificationSetting",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUsersSpacesSpaceNotificationSettingRequest>;

export type GetUsersSpacesSpaceNotificationSettingResponse =
  SpaceNotificationSetting;
export const GetUsersSpacesSpaceNotificationSettingResponse =
  /*@__PURE__*/ /*#__PURE__*/ SpaceNotificationSetting;

export type GetUsersSpacesSpaceNotificationSettingError = DefaultErrors;

/** Gets the space notification setting. For an example, see [Get the caller's space notification setting](https://developers.google.com/workspace/chat/get-space-notification-setting). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with the [authorization scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.users.spacesettings` */
export const getUsersSpacesSpaceNotificationSetting: API.OperationMethod<
  GetUsersSpacesSpaceNotificationSettingRequest,
  GetUsersSpacesSpaceNotificationSettingResponse,
  GetUsersSpacesSpaceNotificationSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersSpacesSpaceNotificationSettingRequest,
  output: GetUsersSpacesSpaceNotificationSettingResponse,
  errors: [],
}));

export interface PatchUsersSpacesSpaceNotificationSettingRequest {
  /** Identifier. The resource name of the space notification setting. Format: `users/{user}/spaces/{space}/spaceNotificationSetting`. */
  name: string;
  /** Required. Supported field paths: - `notification_setting` - `mute_setting` */
  updateMask?: string;
  /** Request body */
  body?: SpaceNotificationSetting;
}

export const PatchUsersSpacesSpaceNotificationSettingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(SpaceNotificationSetting).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/users/{usersId}/spaces/{spacesId}/spaceNotificationSetting",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchUsersSpacesSpaceNotificationSettingRequest>;

export type PatchUsersSpacesSpaceNotificationSettingResponse =
  SpaceNotificationSetting;
export const PatchUsersSpacesSpaceNotificationSettingResponse =
  /*@__PURE__*/ /*#__PURE__*/ SpaceNotificationSetting;

export type PatchUsersSpacesSpaceNotificationSettingError = DefaultErrors;

/** Updates the space notification setting. For an example, see [Update the caller's space notification setting](https://developers.google.com/workspace/chat/update-space-notification-setting). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with the [authorization scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.users.spacesettings` */
export const patchUsersSpacesSpaceNotificationSetting: API.OperationMethod<
  PatchUsersSpacesSpaceNotificationSettingRequest,
  PatchUsersSpacesSpaceNotificationSettingResponse,
  PatchUsersSpacesSpaceNotificationSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchUsersSpacesSpaceNotificationSettingRequest,
  output: PatchUsersSpacesSpaceNotificationSettingResponse,
  errors: [],
}));

export interface CompleteImportSpacesRequest {
  /** Required. Resource name of the import mode space. Format: `spaces/{space}` */
  name: string;
  /** Request body */
  body?: CompleteImportSpaceRequest;
}

export const CompleteImportSpacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CompleteImportSpaceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/spaces/{spacesId}:completeImport",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CompleteImportSpacesRequest>;

export type CompleteImportSpacesResponse = CompleteImportSpaceResponse;
export const CompleteImportSpacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CompleteImportSpaceResponse;

export type CompleteImportSpacesError = DefaultErrors;

/** Completes the [import process](https://developers.google.com/workspace/chat/import-data) for the specified space and makes it visible to users. Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) and domain-wide delegation with the [authorization scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.import` For more information, see [Authorize Google Chat apps to import data](https://developers.google.com/workspace/chat/authorize-import). */
export const completeImportSpaces: API.OperationMethod<
  CompleteImportSpacesRequest,
  CompleteImportSpacesResponse,
  CompleteImportSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CompleteImportSpacesRequest,
  output: CompleteImportSpacesResponse,
  errors: [],
}));

export interface ListSpacesRequest {
  /** Optional. The maximum number of spaces to return. The service might return fewer than this value. If unspecified, at most 100 spaces are returned. The maximum value is 1000. If you use a value more than 1000, it's automatically changed to 1000. Negative values return an `INVALID_ARGUMENT` error. */
  pageSize?: number;
  /** Optional. A page token, received from a previous list spaces call. Provide this parameter to retrieve the subsequent page. When paginating, the filter value should match the call that provided the page token. Passing a different value may lead to unexpected results. */
  pageToken?: string;
  /** Optional. A query filter. You can filter spaces by the space type ([`space_type`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces#spacetype)). To filter by space type, you must specify valid enum value, such as `SPACE` or `GROUP_CHAT` (the `space_type` can't be `SPACE_TYPE_UNSPECIFIED`). To query for multiple space types, use the `OR` operator. For example, the following queries are valid: ``` space_type = "SPACE" spaceType = "GROUP_CHAT" OR spaceType = "DIRECT_MESSAGE" ``` Invalid queries are rejected by the server with an `INVALID_ARGUMENT` error. */
  filter?: string;
}

export const ListSpacesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/spaces" }),
  svc,
) as unknown as Schema.Schema<ListSpacesRequest>;

export type ListSpacesResponse_Op = ListSpacesResponse;
export const ListSpacesResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListSpacesResponse;

export type ListSpacesError = DefaultErrors;

/** Lists spaces the caller is a member of. Group chats and DMs aren't listed until the first message is sent. For an example, see [List spaces](https://developers.google.com/workspace/chat/list-spaces). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with the authorization scope: - `https://www.googleapis.com/auth/chat.bot` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.spaces.readonly` - `https://www.googleapis.com/auth/chat.spaces` To list all named spaces by Google Workspace organization, use the [`spaces.search()`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/search) method using Workspace administrator privileges instead. */
export const listSpaces: API.PaginatedOperationMethod<
  ListSpacesRequest,
  ListSpacesResponse_Op,
  ListSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSpacesRequest,
  output: ListSpacesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetSpacesRequest {
  /** Optional. When `true`, the method runs using the user's Google Workspace administrator privileges. The calling user must be a Google Workspace administrator with the [manage chat and spaces conversations privilege](https://support.google.com/a/answer/13369245). Requires the `chat.admin.spaces` or `chat.admin.spaces.readonly` [OAuth 2.0 scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes). */
  useAdminAccess?: boolean;
  /** Required. Resource name of the space, in the form `spaces/{space}`. Format: `spaces/{space}` */
  name: string;
}

export const GetSpacesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  useAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useAdminAccess"),
  ),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/spaces/{spacesId}" }),
  svc,
) as unknown as Schema.Schema<GetSpacesRequest>;

export type GetSpacesResponse = Space;
export const GetSpacesResponse = /*@__PURE__*/ /*#__PURE__*/ Space;

export type GetSpacesError = DefaultErrors;

/** Returns details about a space. For an example, see [Get details about a space](https://developers.google.com/workspace/chat/get-spaces). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.bot` - `https://www.googleapis.com/auth/chat.app.spaces` with [administrator approval](https://support.google.com/a?p=chat-app-auth) - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.spaces.readonly` - `https://www.googleapis.com/auth/chat.spaces` - User authentication grants administrator privileges when an administrator account authenticates, `use_admin_access` is `true`, and one of the following authorization scopes is used: - `https://www.googleapis.com/auth/chat.admin.spaces.readonly` - `https://www.googleapis.com/auth/chat.admin.spaces` App authentication has the following limitations: - `space.access_settings` is only populated when using the `chat.app.spaces` scope. - `space.predefind_permission_settings` and `space.permission_settings` are only populated when using the `chat.app.spaces` scope, and only for spaces the app created. */
export const getSpaces: API.OperationMethod<
  GetSpacesRequest,
  GetSpacesResponse,
  GetSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSpacesRequest,
  output: GetSpacesResponse,
  errors: [],
}));

export interface SetupSpacesRequest {
  /** Request body */
  body?: SetUpSpaceRequest;
}

export const SetupSpacesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  body: Schema.optional(SetUpSpaceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/spaces:setup", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetupSpacesRequest>;

export type SetupSpacesResponse = Space;
export const SetupSpacesResponse = /*@__PURE__*/ /*#__PURE__*/ Space;

export type SetupSpacesError = DefaultErrors;

/** Creates a space and adds specified users to it. The calling user is automatically added to the space, and shouldn't be specified as a membership in the request. For an example, see [Set up a space with initial members](https://developers.google.com/workspace/chat/set-up-spaces). To specify the human members to add, add memberships with the appropriate `membership.member.name`. To add a human user, use `users/{user}`, where `{user}` can be the email address for the user. For users in the same Workspace organization `{user}` can also be the `id` for the person from the People API, or the `id` for the user in the Directory API. For example, if the People API Person profile ID for `user@example.com` is `123456789`, you can add the user to the space by setting the `membership.member.name` to `users/user@example.com` or `users/123456789`. To specify the Google groups to add, add memberships with the appropriate `membership.group_member.name`. To add or invite a Google group, use `groups/{group}`, where `{group}` is the `id` for the group from the Cloud Identity Groups API. For example, you can use [Cloud Identity Groups lookup API](https://cloud.google.com/identity/docs/reference/rest/v1/groups/lookup) to retrieve the ID `123456789` for group email `group@example.com`, then you can add the group to the space by setting the `membership.group_member.name` to `groups/123456789`. Group email is not supported, and Google groups can only be added as members in named spaces. For a named space or group chat, if the caller blocks, or is blocked by some members, or doesn't have permission to add some members, then those members aren't added to the created space. To create a direct message (DM) between the calling user and another human user, specify exactly one membership to represent the human user. If one user blocks the other, the request fails and the DM isn't created. To create a DM between the calling user and the calling app, set `Space.singleUserBotDm` to `true` and don't specify any memberships. You can only use this method to set up a DM with the calling app. To add the calling app as a member of a space or an existing DM between two human users, see [Invite or add a user or app to a space](https://developers.google.com/workspace/chat/create-members). If a DM already exists between two users, even when one user blocks the other at the time a request is made, then the existing DM is returned. Spaces with threaded replies aren't supported. If you receive the error message `ALREADY_EXISTS` when setting up a space, try a different `displayName`. An existing space within the Google Workspace organization might already use this display name. Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following [authorization scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.spaces.create` - `https://www.googleapis.com/auth/chat.spaces` */
export const setupSpaces: API.OperationMethod<
  SetupSpacesRequest,
  SetupSpacesResponse,
  SetupSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetupSpacesRequest,
  output: SetupSpacesResponse,
  errors: [],
}));

export interface SearchSpacesRequest {
  /** When `true`, the method runs using the user's Google Workspace administrator privileges. The calling user must be a Google Workspace administrator with the [manage chat and spaces conversations privilege](https://support.google.com/a/answer/13369245). Requires either the `chat.admin.spaces.readonly` or `chat.admin.spaces` [OAuth 2.0 scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes). This method currently only supports admin access, thus only `true` is accepted for this field. */
  useAdminAccess?: boolean;
  /** Required. A search query. You can search by using the following parameters: - `create_time` - `customer` - `display_name` - `external_user_allowed` - `last_active_time` - `space_history_state` - `space_type` `create_time` and `last_active_time` accept a timestamp in [RFC-3339](https://www.rfc-editor.org/rfc/rfc3339) format and the supported comparison operators are: `=`, `<`, `>`, `<=`, `>=`. `customer` is required and is used to indicate which customer to fetch spaces from. `customers/my_customer` is the only supported value. `display_name` only accepts the `HAS` (`:`) operator. The text to match is first tokenized into tokens and each token is prefix-matched case-insensitively and independently as a substring anywhere in the space's `display_name`. For example, `Fun Eve` matches `Fun event` or `The evening was fun`, but not `notFun event` or `even`. `external_user_allowed` accepts either `true` or `false`. `space_history_state` only accepts values from the [`historyState`] (https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces#Space.HistoryState) field of a `space` resource. `space_type` is required and the only valid value is `SPACE`. Across different fields, only `AND` operators are supported. A valid example is `space_type = "SPACE" AND display_name:"Hello"` and an invalid example is `space_type = "SPACE" OR display_name:"Hello"`. Among the same field, `space_type` doesn't support `AND` or `OR` operators. `display_name`, 'space_history_state', and 'external_user_allowed' only support `OR` operators. `last_active_time` and `create_time` support both `AND` and `OR` operators. `AND` can only be used to represent an interval, such as `last_active_time < "2022-01-01T00:00:00+00:00" AND last_active_time > "2023-01-01T00:00:00+00:00"`. The following example queries are valid: ``` customer = "customers/my_customer" AND space_type = "SPACE" customer = "customers/my_customer" AND space_type = "SPACE" AND display_name:"Hello World" customer = "customers/my_customer" AND space_type = "SPACE" AND (last_active_time < "2020-01-01T00:00:00+00:00" OR last_active_time > "2022-01-01T00:00:00+00:00") customer = "customers/my_customer" AND space_type = "SPACE" AND (display_name:"Hello World" OR display_name:"Fun event") AND (last_active_time > "2020-01-01T00:00:00+00:00" AND last_active_time < "2022-01-01T00:00:00+00:00") customer = "customers/my_customer" AND space_type = "SPACE" AND (create_time > "2019-01-01T00:00:00+00:00" AND create_time < "2020-01-01T00:00:00+00:00") AND (external_user_allowed = "true") AND (space_history_state = "HISTORY_ON" OR space_history_state = "HISTORY_OFF") ``` */
  query?: string;
  /** Optional. How the list of spaces is ordered. Supported attributes to order by are: - `membership_count.joined_direct_human_user_count` — Denotes the count of human users that have directly joined a space. - `last_active_time` — Denotes the time when last eligible item is added to any topic of this space. - `create_time` — Denotes the time of the space creation. Valid ordering operation values are: - `ASC` for ascending. Default value. - `DESC` for descending. The supported syntax are: - `membership_count.joined_direct_human_user_count DESC` - `membership_count.joined_direct_human_user_count ASC` - `last_active_time DESC` - `last_active_time ASC` - `create_time DESC` - `create_time ASC` */
  orderBy?: string;
  /** The maximum number of spaces to return. The service may return fewer than this value. If unspecified, at most 100 spaces are returned. The maximum value is 1000. If you use a value more than 1000, it's automatically changed to 1000. */
  pageSize?: number;
  /** A token, received from the previous search spaces call. Provide this parameter to retrieve the subsequent page. When paginating, all other parameters provided should match the call that provided the page token. Passing different values to the other parameters might lead to unexpected results. */
  pageToken?: string;
}

export const SearchSpacesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  useAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useAdminAccess"),
  ),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/spaces:search" }),
  svc,
) as unknown as Schema.Schema<SearchSpacesRequest>;

export type SearchSpacesResponse_Op = SearchSpacesResponse;
export const SearchSpacesResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ SearchSpacesResponse;

export type SearchSpacesError = DefaultErrors;

/** Returns a list of spaces in a Google Workspace organization based on an administrator's search. In the request, set `use_admin_access` to `true`. For an example, see [Search for and manage spaces](https://developers.google.com/workspace/chat/search-manage-admin). Requires [user authentication with administrator privileges](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user#admin-privileges) and one of the following [authorization scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.admin.spaces.readonly` - `https://www.googleapis.com/auth/chat.admin.spaces` */
export const searchSpaces: API.PaginatedOperationMethod<
  SearchSpacesRequest,
  SearchSpacesResponse_Op,
  SearchSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchSpacesRequest,
  output: SearchSpacesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateSpacesRequest {
  /** Optional. A unique identifier for this request. A random UUID is recommended. Specifying an existing request ID returns the space created with that ID instead of creating a new space. Specifying an existing request ID from the same Chat app with a different authenticated user returns an error. */
  requestId?: string;
  /** Request body */
  body?: Space;
}

export const CreateSpacesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Space).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/spaces", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSpacesRequest>;

export type CreateSpacesResponse = Space;
export const CreateSpacesResponse = /*@__PURE__*/ /*#__PURE__*/ Space;

export type CreateSpacesError = DefaultErrors;

/** Creates a space. Can be used to create a named space, or a group chat in `Import mode`. For an example, see [Create a space](https://developers.google.com/workspace/chat/create-spaces). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) and one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.app.spaces.create` - `https://www.googleapis.com/auth/chat.app.spaces` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.spaces.create` - `https://www.googleapis.com/auth/chat.spaces` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) When authenticating as an app, the `space.customer` field must be set in the request. When authenticating as an app, the Chat app is added as a member of the space. However, unlike human authentication, the Chat app is not added as a space manager. By default, the Chat app can be removed from the space by all space members. To allow only space managers to remove the app from a space, set `space.permission_settings.manage_apps` to `managers_allowed`. Space membership upon creation depends on whether the space is created in `Import mode`: * **Import mode:** No members are created. * **All other modes:** The calling user is added as a member. This is: * The app itself when using app authentication. * The human user when using user authentication. If you receive the error message `ALREADY_EXISTS` when creating a space, try a different `displayName`. An existing space within the Google Workspace organization might already use this display name. */
export const createSpaces: API.OperationMethod<
  CreateSpacesRequest,
  CreateSpacesResponse,
  CreateSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSpacesRequest,
  output: CreateSpacesResponse,
  errors: [],
}));

export interface FindDirectMessageSpacesRequest {
  /** Required. Resource name of the user to find direct message with. Format: `users/{user}`, where `{user}` is either the `id` for the [person](https://developers.google.com/people/api/rest/v1/people) from the People API, or the `id` for the [user](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users) in the Directory API. For example, if the People API profile ID is `123456789`, you can find a direct message with that person by using `users/123456789` as the `name`. When [authenticated as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), you can use the email as an alias for `{user}`. For example, `users/example@gmail.com` where `example@gmail.com` is the email of the Google Chat user. */
  name?: string;
}

export const FindDirectMessageSpacesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/spaces:findDirectMessage" }),
    svc,
  ) as unknown as Schema.Schema<FindDirectMessageSpacesRequest>;

export type FindDirectMessageSpacesResponse = Space;
export const FindDirectMessageSpacesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Space;

export type FindDirectMessageSpacesError = DefaultErrors;

/** Returns the existing direct message with the specified user. If no direct message space is found, returns a `404 NOT_FOUND` error. For an example, see [Find a direct message](/chat/api/guides/v1/spaces/find-direct-message). With [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app), returns the direct message space between the specified user and the calling Chat app. With [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), returns the direct message space between the specified user and the authenticated user. Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with the authorization scope: - `https://www.googleapis.com/auth/chat.bot` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.spaces.readonly` - `https://www.googleapis.com/auth/chat.spaces` */
export const findDirectMessageSpaces: API.OperationMethod<
  FindDirectMessageSpacesRequest,
  FindDirectMessageSpacesResponse,
  FindDirectMessageSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: FindDirectMessageSpacesRequest,
  output: FindDirectMessageSpacesResponse,
  errors: [],
}));

export interface DeleteSpacesRequest {
  /** Required. Resource name of the space to delete. Format: `spaces/{space}` */
  name: string;
  /** Optional. When `true`, the method runs using the user's Google Workspace administrator privileges. The calling user must be a Google Workspace administrator with the [manage chat and spaces conversations privilege](https://support.google.com/a/answer/13369245). Requires the `chat.admin.delete` [OAuth 2.0 scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes). */
  useAdminAccess?: boolean;
}

export const DeleteSpacesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  useAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useAdminAccess"),
  ),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/spaces/{spacesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteSpacesRequest>;

export type DeleteSpacesResponse = Empty;
export const DeleteSpacesResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteSpacesError = DefaultErrors;

/** Deletes a named space. Always performs a cascading delete, which means that the space's child resources—like messages posted in the space and memberships in the space—are also deleted. For an example, see [Delete a space](https://developers.google.com/workspace/chat/delete-spaces). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) and the authorization scope: - `https://www.googleapis.com/auth/chat.app.delete` (only in spaces the app created) - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.delete` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) - User authentication grants administrator privileges when an administrator account authenticates, `use_admin_access` is `true`, and the following authorization scope is used: - `https://www.googleapis.com/auth/chat.admin.delete` */
export const deleteSpaces: API.OperationMethod<
  DeleteSpacesRequest,
  DeleteSpacesResponse,
  DeleteSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSpacesRequest,
  output: DeleteSpacesResponse,
  errors: [],
}));

export interface PatchSpacesRequest {
  /** Identifier. Resource name of the space. Format: `spaces/{space}` Where `{space}` represents the system-assigned ID for the space. You can obtain the space ID by calling the [`spaces.list()`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces/list) method or from the space URL. For example, if the space URL is `https://mail.google.com/mail/u/0/#chat/space/AAAAAAAAA`, the space ID is `AAAAAAAAA`. */
  name: string;
  /** Optional. When `true`, the method runs using the user's Google Workspace administrator privileges. The calling user must be a Google Workspace administrator with the [manage chat and spaces conversations privilege](https://support.google.com/a/answer/13369245). Requires the `chat.admin.spaces` [OAuth 2.0 scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes). Some `FieldMask` values are not supported using admin access. For details, see the description of `update_mask`. */
  useAdminAccess?: boolean;
  /** Required. The updated field paths, comma separated if there are multiple. You can update the following fields for a space: `space_details`: Updates the space's description and guidelines. You must pass both description and guidelines in the update request as `SpaceDetails`. If you only want to update one of the fields, pass the existing value for the other field. `display_name`: Only supports updating the display name for spaces where `spaceType` field is `SPACE`. If you receive the error message `ALREADY_EXISTS`, try a different value. An existing space within the Google Workspace organization might already use this display name. `space_type`: Only supports changing a `GROUP_CHAT` space type to `SPACE`. Include `display_name` together with `space_type` in the update mask and ensure that the specified space has a non-empty display name and the `SPACE` space type. Including the `space_type` mask and the `SPACE` type in the specified space when updating the display name is optional if the existing space already has the `SPACE` type. Trying to update the space type in other ways results in an invalid argument error. `space_type` is not supported with `useAdminAccess`. `space_history_state`: Updates [space history settings](https://support.google.com/chat/answer/7664687) by turning history on or off for the space. Only supported if history settings are enabled for the Google Workspace organization. To update the space history state, you must omit all other field masks in your request. `space_history_state` is not supported with `useAdminAccess`. `access_settings.audience`: Updates the [access setting](https://support.google.com/chat/answer/11971020) of who can discover the space, join the space, and preview the messages in named space where `spaceType` field is `SPACE`. If the existing space has a target audience, you can remove the audience and restrict space access by omitting a value for this field mask. To update access settings for a space, the authenticating user must be a space manager and omit all other field masks in your request. You can't update this field if the space is in [import mode](https://developers.google.com/workspace/chat/import-data-overview). To learn more, see [Make a space discoverable to specific users](https://developers.google.com/workspace/chat/space-target-audience). `access_settings.audience` is not supported with `useAdminAccess`. `permission_settings`: Supports changing the [permission settings](https://support.google.com/chat/answer/13340792) of a space. When updating permission settings, you can only specify `permissionSettings` field masks; you cannot update other field masks at the same time. The supported field masks include: - `permission_settings.manageMembersAndGroups` - `permission_settings.modifySpaceDetails` - `permission_settings.toggleHistory` - `permission_settings.useAtMentionAll` - `permission_settings.manageApps` - `permission_settings.manageWebhooks` - `permission_settings.replyMessages` */
  updateMask?: string;
  /** Request body */
  body?: Space;
}

export const PatchSpacesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  useAdminAccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("useAdminAccess"),
  ),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Space).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/spaces/{spacesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchSpacesRequest>;

export type PatchSpacesResponse = Space;
export const PatchSpacesResponse = /*@__PURE__*/ /*#__PURE__*/ Space;

export type PatchSpacesError = DefaultErrors;

/** Updates a space. For an example, see [Update a space](https://developers.google.com/workspace/chat/update-spaces). If you're updating the `displayName` field and receive the error message `ALREADY_EXISTS`, try a different display name.. An existing space within the Google Workspace organization might already use this display name. Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) and one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.app.spaces` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.spaces` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) - User authentication grants administrator privileges when an administrator account authenticates, `use_admin_access` is `true`, and the following authorization scopes is used: - `https://www.googleapis.com/auth/chat.admin.spaces` App authentication has the following limitations: - To update either `space.predefined_permission_settings` or `space.permission_settings`, the app must be the space creator. - Updating the `space.access_settings.audience` is not supported for app authentication. */
export const patchSpaces: API.OperationMethod<
  PatchSpacesRequest,
  PatchSpacesResponse,
  PatchSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchSpacesRequest,
  output: PatchSpacesResponse,
  errors: [],
}));

export interface UpdateSpacesMessagesRequest {
  /** Required. The field paths to update. Separate multiple values with commas or use `*` to update all field paths. Currently supported field paths: - `text` - `attachment` - `cards` (Requires [app authentication](/chat/api/guides/auth/service-accounts).) - `cards_v2` (Requires [app authentication](/chat/api/guides/auth/service-accounts).) - `accessory_widgets` (Requires [app authentication](/chat/api/guides/auth/service-accounts).) - `quoted_message_metadata` (Only allows removal of the quoted message.) */
  updateMask?: string;
  /** Identifier. Resource name of the message. Format: `spaces/{space}/messages/{message}` Where `{space}` is the ID of the space where the message is posted and `{message}` is a system-assigned ID for the message. For example, `spaces/AAAAAAAAAAA/messages/BBBBBBBBBBB.BBBBBBBBBBB`. If you set a custom ID when you create a message, you can use this ID to specify the message in a request by replacing `{message}` with the value from the `clientAssignedMessageId` field. For example, `spaces/AAAAAAAAAAA/messages/client-custom-name`. For details, see [Name a message](https://developers.google.com/workspace/chat/create-messages#name_a_created_message). */
  name: string;
  /** Optional. If `true` and the message isn't found, a new message is created and `updateMask` is ignored. The specified message ID must be [client-assigned](https://developers.google.com/workspace/chat/create-messages#name_a_created_message) or the request fails. */
  allowMissing?: boolean;
  /** Request body */
  body?: Message;
}

export const UpdateSpacesMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    body: Schema.optional(Message).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "v1/spaces/{spacesId}/messages/{messagesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateSpacesMessagesRequest>;

export type UpdateSpacesMessagesResponse = Message;
export const UpdateSpacesMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type UpdateSpacesMessagesError = DefaultErrors;

/** Updates a message. There's a difference between the `patch` and `update` methods. The `patch` method uses a `patch` request while the `update` method uses a `put` request. We recommend using the `patch` method. For an example, see [Update a message](https://developers.google.com/workspace/chat/update-messages). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with the authorization scope: - `https://www.googleapis.com/auth/chat.bot` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.messages` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) When using app authentication, requests can only update messages created by the calling Chat app. */
export const updateSpacesMessages: API.OperationMethod<
  UpdateSpacesMessagesRequest,
  UpdateSpacesMessagesResponse,
  UpdateSpacesMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSpacesMessagesRequest,
  output: UpdateSpacesMessagesResponse,
  errors: [],
}));

export interface PatchSpacesMessagesRequest {
  /** Identifier. Resource name of the message. Format: `spaces/{space}/messages/{message}` Where `{space}` is the ID of the space where the message is posted and `{message}` is a system-assigned ID for the message. For example, `spaces/AAAAAAAAAAA/messages/BBBBBBBBBBB.BBBBBBBBBBB`. If you set a custom ID when you create a message, you can use this ID to specify the message in a request by replacing `{message}` with the value from the `clientAssignedMessageId` field. For example, `spaces/AAAAAAAAAAA/messages/client-custom-name`. For details, see [Name a message](https://developers.google.com/workspace/chat/create-messages#name_a_created_message). */
  name: string;
  /** Optional. If `true` and the message isn't found, a new message is created and `updateMask` is ignored. The specified message ID must be [client-assigned](https://developers.google.com/workspace/chat/create-messages#name_a_created_message) or the request fails. */
  allowMissing?: boolean;
  /** Required. The field paths to update. Separate multiple values with commas or use `*` to update all field paths. Currently supported field paths: - `text` - `attachment` - `cards` (Requires [app authentication](/chat/api/guides/auth/service-accounts).) - `cards_v2` (Requires [app authentication](/chat/api/guides/auth/service-accounts).) - `accessory_widgets` (Requires [app authentication](/chat/api/guides/auth/service-accounts).) - `quoted_message_metadata` (Only allows removal of the quoted message.) */
  updateMask?: string;
  /** Request body */
  body?: Message;
}

export const PatchSpacesMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Message).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/spaces/{spacesId}/messages/{messagesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchSpacesMessagesRequest>;

export type PatchSpacesMessagesResponse = Message;
export const PatchSpacesMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type PatchSpacesMessagesError = DefaultErrors;

/** Updates a message. There's a difference between the `patch` and `update` methods. The `patch` method uses a `patch` request while the `update` method uses a `put` request. We recommend using the `patch` method. For an example, see [Update a message](https://developers.google.com/workspace/chat/update-messages). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with the authorization scope: - `https://www.googleapis.com/auth/chat.bot` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.messages` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) When using app authentication, requests can only update messages created by the calling Chat app. */
export const patchSpacesMessages: API.OperationMethod<
  PatchSpacesMessagesRequest,
  PatchSpacesMessagesResponse,
  PatchSpacesMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchSpacesMessagesRequest,
  output: PatchSpacesMessagesResponse,
  errors: [],
}));

export interface DeleteSpacesMessagesRequest {
  /** Optional. When `true`, deleting a message also deletes its threaded replies. When `false`, if a message has threaded replies, deletion fails. Only applies when [authenticating as a user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user). Has no effect when [authenticating as a Chat app] (https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). */
  force?: boolean;
  /** Required. Resource name of the message. Format: `spaces/{space}/messages/{message}` If you've set a custom ID for your message, you can use the value from the `clientAssignedMessageId` field for `{message}`. For details, see [Name a message] (https://developers.google.com/workspace/chat/create-messages#name_a_created_message). */
  name: string;
}

export const DeleteSpacesMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/spaces/{spacesId}/messages/{messagesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteSpacesMessagesRequest>;

export type DeleteSpacesMessagesResponse = Empty;
export const DeleteSpacesMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteSpacesMessagesError = DefaultErrors;

/** Deletes a message. For an example, see [Delete a message](https://developers.google.com/workspace/chat/delete-messages). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with the authorization scope: - `https://www.googleapis.com/auth/chat.bot` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.messages` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) When using app authentication, requests can only delete messages created by the calling Chat app. */
export const deleteSpacesMessages: API.OperationMethod<
  DeleteSpacesMessagesRequest,
  DeleteSpacesMessagesResponse,
  DeleteSpacesMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSpacesMessagesRequest,
  output: DeleteSpacesMessagesResponse,
  errors: [],
}));

export interface ListSpacesMessagesRequest {
  /** Required. The resource name of the space to list messages from. Format: `spaces/{space}` */
  parent: string;
  /** Optional. Whether to include deleted messages. Deleted messages include deleted time and metadata about their deletion, but message content is unavailable. */
  showDeleted?: boolean;
  /** Optional. The maximum number of messages returned. The service might return fewer messages than this value. If unspecified, at most 25 are returned. The maximum value is 1000. If you use a value more than 1000, it's automatically changed to 1000. Negative values return an `INVALID_ARGUMENT` error. */
  pageSize?: number;
  /** Optional. A page token received from a previous list messages call. Provide this parameter to retrieve the subsequent page. When paginating, all other parameters provided should match the call that provided the page token. Passing different values to the other parameters might lead to unexpected results. */
  pageToken?: string;
  /** Optional. How the list of messages is ordered. Specify a value to order by an ordering operation. Valid ordering operation values are as follows: - `ASC` for ascending. - `DESC` for descending. The default ordering is `create_time ASC`. */
  orderBy?: string;
  /** Optional. A query filter. You can filter messages by date (`create_time`) and thread (`thread.name`). To filter messages by the date they were created, specify the `create_time` with a timestamp in [RFC-3339](https://www.rfc-editor.org/rfc/rfc3339) format and double quotation marks. For example, `"2023-04-21T11:30:00-04:00"`. You can use the greater than operator `>` to list messages that were created after a timestamp, or the less than operator `<` to list messages that were created before a timestamp. To filter messages within a time interval, use the `AND` operator between two timestamps. To filter by thread, specify the `thread.name`, formatted as `spaces/{space}/threads/{thread}`. You can only specify one `thread.name` per query. To filter by both thread and date, use the `AND` operator in your query. For example, the following queries are valid: ``` create_time > "2012-04-21T11:30:00-04:00" create_time > "2012-04-21T11:30:00-04:00" AND thread.name = spaces/AAAAAAAAAAA/threads/123 create_time > "2012-04-21T11:30:00+00:00" AND create_time < "2013-01-01T00:00:00+00:00" AND thread.name = spaces/AAAAAAAAAAA/threads/123 thread.name = spaces/AAAAAAAAAAA/threads/123 ``` Invalid queries are rejected by the server with an `INVALID_ARGUMENT` error. */
  filter?: string;
}

export const ListSpacesMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/spaces/{spacesId}/messages" }),
    svc,
  ) as unknown as Schema.Schema<ListSpacesMessagesRequest>;

export type ListSpacesMessagesResponse = ListMessagesResponse;
export const ListSpacesMessagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListMessagesResponse;

export type ListSpacesMessagesError = DefaultErrors;

/** Lists messages in a space that the caller is a member of, including messages from blocked members and spaces. System messages, like those announcing new space members, aren't included. If you list messages from a space with no messages, the response is an empty object. When using a REST/HTTP interface, the response contains an empty JSON object, `{}`. For an example, see [List messages](https://developers.google.com/workspace/chat/api/guides/v1/messages/list). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) in [Developer Preview](https://developers.google.com/workspace/preview) with the authorization scope: - `https://www.googleapis.com/auth/chat.app.messages.readonly`. When using this authentication scope, this method only returns public messages in a space. It doesn't include private messages. - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.messages.readonly` - `https://www.googleapis.com/auth/chat.messages` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) */
export const listSpacesMessages: API.PaginatedOperationMethod<
  ListSpacesMessagesRequest,
  ListSpacesMessagesResponse,
  ListSpacesMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSpacesMessagesRequest,
  output: ListSpacesMessagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetSpacesMessagesRequest {
  /** Required. Resource name of the message. Format: `spaces/{space}/messages/{message}` If you've set a custom ID for your message, you can use the value from the `clientAssignedMessageId` field for `{message}`. For details, see [Name a message] (https://developers.google.com/workspace/chat/create-messages#name_a_created_message). */
  name: string;
}

export const GetSpacesMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/spaces/{spacesId}/messages/{messagesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetSpacesMessagesRequest>;

export type GetSpacesMessagesResponse = Message;
export const GetSpacesMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type GetSpacesMessagesError = DefaultErrors;

/** Returns details about a message. For an example, see [Get details about a message](https://developers.google.com/workspace/chat/get-messages). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.bot`: When using this authorization scope, this method returns details about a message the Chat app has access to, like direct messages and [slash commands](https://developers.google.com/workspace/chat/slash-commands) that invoke the Chat app. - `https://www.googleapis.com/auth/chat.app.messages.readonly` with [administrator approval](https://support.google.com/a?p=chat-app-auth) (available in [Developer Preview](https://developers.google.com/workspace/preview)). When using this authentication scope, this method returns details about a public message in a space. - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.messages.readonly` - `https://www.googleapis.com/auth/chat.messages` Note: Might return a message from a blocked member or space. */
export const getSpacesMessages: API.OperationMethod<
  GetSpacesMessagesRequest,
  GetSpacesMessagesResponse,
  GetSpacesMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSpacesMessagesRequest,
  output: GetSpacesMessagesResponse,
  errors: [],
}));

export interface CreateSpacesMessagesRequest {
  /** Required. The resource name of the space in which to create a message. Format: `spaces/{space}` */
  parent: string;
  /** Optional. Specifies whether a message starts a thread or replies to one. Only supported in named spaces. When [responding to user interactions](https://developers.google.com/workspace/chat/receive-respond-interactions), this field is ignored. For interactions within a thread, the reply is created in the same thread. Otherwise, the reply is created as a new thread. */
  messageReplyOption?:
    | "MESSAGE_REPLY_OPTION_UNSPECIFIED"
    | "REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD"
    | "REPLY_MESSAGE_OR_FAIL"
    | (string & {});
  /** Optional. A custom ID for a message. Lets Chat apps get, update, or delete a message without needing to store the system-assigned ID in the message's resource name (represented in the message `name` field). The value for this field must meet the following requirements: * Begins with `client-`. For example, `client-custom-name` is a valid custom ID, but `custom-name` is not. * Contains up to 63 characters and only lowercase letters, numbers, and hyphens. * Is unique within a space. A Chat app can't use the same custom ID for different messages. For details, see [Name a message](https://developers.google.com/workspace/chat/create-messages#name_a_created_message). */
  messageId?: string;
  /** Optional. A unique request ID for this message. Specifying an existing request ID returns the message created with that ID instead of creating a new message. */
  requestId?: string;
  /** Optional. Deprecated: Use thread.thread_key instead. ID for the thread. Supports up to 4000 characters. To start or add to a thread, create a message and specify a `threadKey` or the thread.name. For example usage, see [Start or reply to a message thread](https://developers.google.com/workspace/chat/create-messages#create-message-thread). */
  threadKey?: string;
  /** Request body */
  body?: Message;
}

export const CreateSpacesMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    messageReplyOption: Schema.optional(Schema.String).pipe(
      T.HttpQuery("messageReplyOption"),
    ),
    messageId: Schema.optional(Schema.String).pipe(T.HttpQuery("messageId")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    threadKey: Schema.optional(Schema.String).pipe(T.HttpQuery("threadKey")),
    body: Schema.optional(Message).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/spaces/{spacesId}/messages",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateSpacesMessagesRequest>;

export type CreateSpacesMessagesResponse = Message;
export const CreateSpacesMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type CreateSpacesMessagesError = DefaultErrors;

/** Creates a message in a Google Chat space. For an example, see [Send a message](https://developers.google.com/workspace/chat/create-messages). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with the authorization scope: - `https://www.googleapis.com/auth/chat.bot` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.messages.create` - `https://www.googleapis.com/auth/chat.messages` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) Chat attributes the message sender differently depending on the type of authentication that you use in your request. The following image shows how Chat attributes a message when you use app authentication. Chat displays the Chat app as the message sender. The content of the message can contain text (`text`), cards (`cardsV2`), and accessory widgets (`accessoryWidgets`). ![Message sent with app authentication](https://developers.google.com/workspace/chat/images/message-app-auth.svg) The following image shows how Chat attributes a message when you use user authentication. Chat displays the user as the message sender and attributes the Chat app to the message by displaying its name. The content of message can only contain text (`text`). ![Message sent with user authentication](https://developers.google.com/workspace/chat/images/message-user-auth.svg) The maximum message size, including the message contents, is 32,000 bytes. For [webhook](https://developers.google.com/workspace/chat/quickstart/webhooks) requests, the response doesn't contain the full message. The response only populates the `name` and `thread.name` fields in addition to the information that was in the request. */
export const createSpacesMessages: API.OperationMethod<
  CreateSpacesMessagesRequest,
  CreateSpacesMessagesResponse,
  CreateSpacesMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSpacesMessagesRequest,
  output: CreateSpacesMessagesResponse,
  errors: [],
}));

export interface GetSpacesMessagesAttachmentsRequest {
  /** Required. Resource name of the attachment, in the form `spaces/{space}/messages/{message}/attachments/{attachment}`. */
  name: string;
}

export const GetSpacesMessagesAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/spaces/{spacesId}/messages/{messagesId}/attachments/{attachmentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetSpacesMessagesAttachmentsRequest>;

export type GetSpacesMessagesAttachmentsResponse = Attachment;
export const GetSpacesMessagesAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Attachment;

export type GetSpacesMessagesAttachmentsError = DefaultErrors;

/** Gets the metadata of a message attachment. The attachment data is fetched using the [media API](https://developers.google.com/workspace/chat/api/reference/rest/v1/media/download). For an example, see [Get metadata about a message attachment](https://developers.google.com/workspace/chat/get-media-attachments). Requires [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with the [authorization scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.bot` */
export const getSpacesMessagesAttachments: API.OperationMethod<
  GetSpacesMessagesAttachmentsRequest,
  GetSpacesMessagesAttachmentsResponse,
  GetSpacesMessagesAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSpacesMessagesAttachmentsRequest,
  output: GetSpacesMessagesAttachmentsResponse,
  errors: [],
}));

export interface ListSpacesMessagesReactionsRequest {
  /** Optional. A query filter. You can filter reactions by [emoji](https://developers.google.com/workspace/chat/api/reference/rest/v1/Emoji) (either `emoji.unicode` or `emoji.custom_emoji.uid`) and [user](https://developers.google.com/workspace/chat/api/reference/rest/v1/User) (`user.name`). To filter reactions for multiple emojis or users, join similar fields with the `OR` operator, such as `emoji.unicode = "🙂" OR emoji.unicode = "👍"` and `user.name = "users/AAAAAA" OR user.name = "users/BBBBBB"`. To filter reactions by emoji and user, use the `AND` operator, such as `emoji.unicode = "🙂" AND user.name = "users/AAAAAA"`. If your query uses both `AND` and `OR`, group them with parentheses. For example, the following queries are valid: ``` user.name = "users/{user}" emoji.unicode = "🙂" emoji.custom_emoji.uid = "{uid}" emoji.unicode = "🙂" OR emoji.unicode = "👍" emoji.unicode = "🙂" OR emoji.custom_emoji.uid = "{uid}" emoji.unicode = "🙂" AND user.name = "users/{user}" (emoji.unicode = "🙂" OR emoji.custom_emoji.uid = "{uid}") AND user.name = "users/{user}" ``` The following queries are invalid: ``` emoji.unicode = "🙂" AND emoji.unicode = "👍" emoji.unicode = "🙂" AND emoji.custom_emoji.uid = "{uid}" emoji.unicode = "🙂" OR user.name = "users/{user}" emoji.unicode = "🙂" OR emoji.custom_emoji.uid = "{uid}" OR user.name = "users/{user}" emoji.unicode = "🙂" OR emoji.custom_emoji.uid = "{uid}" AND user.name = "users/{user}" ``` Invalid queries are rejected with an `INVALID_ARGUMENT` error. */
  filter?: string;
  /** Optional. The maximum number of reactions returned. The service can return fewer reactions than this value. If unspecified, the default value is 25. The maximum value is 200; values above 200 are changed to 200. */
  pageSize?: number;
  /** Optional. (If resuming from a previous query.) A page token received from a previous list reactions call. Provide this to retrieve the subsequent page. When paginating, the filter value should match the call that provided the page token. Passing a different value might lead to unexpected results. */
  pageToken?: string;
  /** Required. The message users reacted to. Format: `spaces/{space}/messages/{message}` */
  parent: string;
}

export const ListSpacesMessagesReactionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/spaces/{spacesId}/messages/{messagesId}/reactions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListSpacesMessagesReactionsRequest>;

export type ListSpacesMessagesReactionsResponse = ListReactionsResponse;
export const ListSpacesMessagesReactionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListReactionsResponse;

export type ListSpacesMessagesReactionsError = DefaultErrors;

/** Lists reactions to a message. For an example, see [List reactions for a message](https://developers.google.com/workspace/chat/list-reactions). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following [authorization scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.messages.reactions.readonly` - `https://www.googleapis.com/auth/chat.messages.reactions` - `https://www.googleapis.com/auth/chat.messages.readonly` - `https://www.googleapis.com/auth/chat.messages` */
export const listSpacesMessagesReactions: API.PaginatedOperationMethod<
  ListSpacesMessagesReactionsRequest,
  ListSpacesMessagesReactionsResponse,
  ListSpacesMessagesReactionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSpacesMessagesReactionsRequest,
  output: ListSpacesMessagesReactionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateSpacesMessagesReactionsRequest {
  /** Required. The message where the reaction is created. Format: `spaces/{space}/messages/{message}` */
  parent: string;
  /** Request body */
  body?: Reaction;
}

export const CreateSpacesMessagesReactionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Reaction).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/spaces/{spacesId}/messages/{messagesId}/reactions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateSpacesMessagesReactionsRequest>;

export type CreateSpacesMessagesReactionsResponse = Reaction;
export const CreateSpacesMessagesReactionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Reaction;

export type CreateSpacesMessagesReactionsError = DefaultErrors;

/** Creates a reaction and adds it to a message. For an example, see [Add a reaction to a message](https://developers.google.com/workspace/chat/create-reactions). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following [authorization scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.messages.reactions.create` - `https://www.googleapis.com/auth/chat.messages.reactions` - `https://www.googleapis.com/auth/chat.messages` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) */
export const createSpacesMessagesReactions: API.OperationMethod<
  CreateSpacesMessagesReactionsRequest,
  CreateSpacesMessagesReactionsResponse,
  CreateSpacesMessagesReactionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSpacesMessagesReactionsRequest,
  output: CreateSpacesMessagesReactionsResponse,
  errors: [],
}));

export interface DeleteSpacesMessagesReactionsRequest {
  /** Required. Name of the reaction to delete. Format: `spaces/{space}/messages/{message}/reactions/{reaction}` */
  name: string;
}

export const DeleteSpacesMessagesReactionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/spaces/{spacesId}/messages/{messagesId}/reactions/{reactionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteSpacesMessagesReactionsRequest>;

export type DeleteSpacesMessagesReactionsResponse = Empty;
export const DeleteSpacesMessagesReactionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteSpacesMessagesReactionsError = DefaultErrors;

/** Deletes a reaction to a message. For an example, see [Delete a reaction](https://developers.google.com/workspace/chat/delete-reactions). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following [authorization scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.messages.reactions` - `https://www.googleapis.com/auth/chat.messages` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) */
export const deleteSpacesMessagesReactions: API.OperationMethod<
  DeleteSpacesMessagesReactionsRequest,
  DeleteSpacesMessagesReactionsResponse,
  DeleteSpacesMessagesReactionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSpacesMessagesReactionsRequest,
  output: DeleteSpacesMessagesReactionsResponse,
  errors: [],
}));

export interface DeleteSpacesMembersRequest {
  /** Required. Resource name of the membership to delete. Chat apps can delete human users' or their own memberships. Chat apps can't delete other apps' memberships. When deleting a human membership, requires the `chat.memberships` scope with [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) or the `chat.memberships.app` scope with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) and the `spaces/{space}/members/{member}` format. You can use the email as an alias for `{member}`. For example, `spaces/{space}/members/example@gmail.com` where `example@gmail.com` is the email of the Google Chat user. When deleting an app membership, requires the `chat.memberships.app` scope and `spaces/{space}/members/app` format. Format: `spaces/{space}/members/{member}` or `spaces/{space}/members/app`. */
  name: string;
  /** Optional. When `true`, the method runs using the user's Google Workspace administrator privileges. The calling user must be a Google Workspace administrator with the [manage chat and spaces conversations privilege](https://support.google.com/a/answer/13369245). Requires the `chat.admin.memberships` [OAuth 2.0 scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes). Deleting app memberships in a space isn't supported using admin access. */
  useAdminAccess?: boolean;
}

export const DeleteSpacesMembersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/spaces/{spacesId}/members/{membersId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteSpacesMembersRequest>;

export type DeleteSpacesMembersResponse = Membership;
export const DeleteSpacesMembersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Membership;

export type DeleteSpacesMembersError = DefaultErrors;

/** Deletes a membership. For an example, see [Remove a user or a Google Chat app from a space](https://developers.google.com/workspace/chat/delete-members). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) and the authorization scope: - `https://www.googleapis.com/auth/chat.app.memberships` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.memberships` - `https://www.googleapis.com/auth/chat.memberships.app` (to remove the calling app from the space) - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) - User authentication grants administrator privileges when an administrator account authenticates, `use_admin_access` is `true`, and the following authorization scope is used: - `https://www.googleapis.com/auth/chat.admin.memberships` App authentication is not supported for the following use cases: - Removing a Google Group from a space. - Removing a Chat app from a space. To delete memberships for space managers, the requester must be a space manager. If you're using [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) the Chat app must be the space creator. */
export const deleteSpacesMembers: API.OperationMethod<
  DeleteSpacesMembersRequest,
  DeleteSpacesMembersResponse,
  DeleteSpacesMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSpacesMembersRequest,
  output: DeleteSpacesMembersResponse,
  errors: [],
}));

export interface PatchSpacesMembersRequest {
  /** Optional. When `true`, the method runs using the user's Google Workspace administrator privileges. The calling user must be a Google Workspace administrator with the [manage chat and spaces conversations privilege](https://support.google.com/a/answer/13369245). Requires the `chat.admin.memberships` [OAuth 2.0 scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes). */
  useAdminAccess?: boolean;
  /** Identifier. Resource name of the membership, assigned by the server. Format: `spaces/{space}/members/{member}` */
  name: string;
  /** Required. The field paths to update. Separate multiple values with commas or use `*` to update all field paths. Currently supported field paths: - `role` */
  updateMask?: string;
  /** Request body */
  body?: Membership;
}

export const PatchSpacesMembersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Membership).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/spaces/{spacesId}/members/{membersId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchSpacesMembersRequest>;

export type PatchSpacesMembersResponse = Membership;
export const PatchSpacesMembersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Membership;

export type PatchSpacesMembersError = DefaultErrors;

/** Updates a membership. For an example, see [Update a user's membership in a space](https://developers.google.com/workspace/chat/update-members). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) and the authorization scope: - `https://www.googleapis.com/auth/chat.app.memberships` (only in spaces the app created) - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.memberships` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) - User authentication grants administrator privileges when an administrator account authenticates, `use_admin_access` is `true`, and the following authorization scope is used: - `https://www.googleapis.com/auth/chat.admin.memberships` */
export const patchSpacesMembers: API.OperationMethod<
  PatchSpacesMembersRequest,
  PatchSpacesMembersResponse,
  PatchSpacesMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchSpacesMembersRequest,
  output: PatchSpacesMembersResponse,
  errors: [],
}));

export interface CreateSpacesMembersRequest {
  /** Optional. When `true`, the method runs using the user's Google Workspace administrator privileges. The calling user must be a Google Workspace administrator with the [manage chat and spaces conversations privilege](https://support.google.com/a/answer/13369245). Requires the `chat.admin.memberships` [OAuth 2.0 scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes). Creating app memberships or creating memberships for users outside the administrator's Google Workspace organization isn't supported using admin access. */
  useAdminAccess?: boolean;
  /** Required. The resource name of the space for which to create the membership. Format: spaces/{space} */
  parent: string;
  /** Request body */
  body?: Membership;
}

export const CreateSpacesMembersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Membership).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/spaces/{spacesId}/members",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateSpacesMembersRequest>;

export type CreateSpacesMembersResponse = Membership;
export const CreateSpacesMembersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Membership;

export type CreateSpacesMembersError = DefaultErrors;

/** Creates a membership for the calling Chat app, a user, or a Google Group. Creating memberships for other Chat apps isn't supported. When creating a membership, if the specified member has their auto-accept policy turned off, then they're invited, and must accept the space invitation before joining. Otherwise, creating a membership adds the member directly to the specified space. Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) and the authorization scope: - `https://www.googleapis.com/auth/chat.app.memberships` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.memberships` - `https://www.googleapis.com/auth/chat.memberships.app` (to add the calling app to the space) - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) - User authentication grants administrator privileges when an administrator account authenticates, `use_admin_access` is `true`, and the following authorization scope is used: - `https://www.googleapis.com/auth/chat.admin.memberships` App authentication is not supported for the following use cases: - Inviting users external to the Workspace organization that owns the space. - Adding a Google Group to a space. - Adding a Chat app to a space. For example usage, see: - [Invite or add a user to a space](https://developers.google.com/workspace/chat/create-members#create-user-membership). - [Invite or add a Google Group to a space](https://developers.google.com/workspace/chat/create-members#create-group-membership). - [Add the Chat app to a space](https://developers.google.com/workspace/chat/create-members#create-membership-calling-api). */
export const createSpacesMembers: API.OperationMethod<
  CreateSpacesMembersRequest,
  CreateSpacesMembersResponse,
  CreateSpacesMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSpacesMembersRequest,
  output: CreateSpacesMembersResponse,
  errors: [],
}));

export interface ListSpacesMembersRequest {
  /** Required. The resource name of the space for which to fetch a membership list. Format: spaces/{space} */
  parent: string;
  /** Optional. The maximum number of memberships to return. The service might return fewer than this value. If unspecified, at most 100 memberships are returned. The maximum value is 1000. If you use a value more than 1000, it's automatically changed to 1000. Negative values return an `INVALID_ARGUMENT` error. */
  pageSize?: number;
  /** Optional. A page token, received from a previous call to list memberships. Provide this parameter to retrieve the subsequent page. When paginating, all other parameters provided should match the call that provided the page token. Passing different values to the other parameters might lead to unexpected results. */
  pageToken?: string;
  /** Optional. When `true`, also returns memberships associated with invited members, in addition to other types of memberships. If a filter is set, invited memberships that don't match the filter criteria aren't returned. Currently requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user). */
  showInvited?: boolean;
  /** Optional. When `true`, also returns memberships associated with a Google Group, in addition to other types of memberships. If a filter is set, Google Group memberships that don't match the filter criteria aren't returned. */
  showGroups?: boolean;
  /** Optional. A query filter. You can filter memberships by a member's role ([`role`](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.members#membershiprole)) and type ([`member.type`](https://developers.google.com/workspace/chat/api/reference/rest/v1/User#type)). To filter by role, set `role` to `ROLE_MEMBER` or `ROLE_MANAGER`. To filter by type, set `member.type` to `HUMAN` or `BOT`. You can also filter for `member.type` using the `!=` operator. To filter by both role and type, use the `AND` operator. To filter by either role or type, use the `OR` operator. Either `member.type = "HUMAN"` or `member.type != "BOT"` is required when `use_admin_access` is set to true. Other member type filters will be rejected. For example, the following queries are valid: ``` role = "ROLE_MANAGER" OR role = "ROLE_MEMBER" member.type = "HUMAN" AND role = "ROLE_MANAGER" member.type != "BOT" ``` The following queries are invalid: ``` member.type = "HUMAN" AND member.type = "BOT" role = "ROLE_MANAGER" AND role = "ROLE_MEMBER" ``` Invalid queries are rejected by the server with an `INVALID_ARGUMENT` error. */
  filter?: string;
  /** Optional. When `true`, the method runs using the user's Google Workspace administrator privileges. The calling user must be a Google Workspace administrator with the [manage chat and spaces conversations privilege](https://support.google.com/a/answer/13369245). Requires either the `chat.admin.memberships.readonly` or `chat.admin.memberships` [OAuth 2.0 scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes). Listing app memberships in a space isn't supported when using admin access. */
  useAdminAccess?: boolean;
}

export const ListSpacesMembersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    showInvited: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showInvited"),
    ),
    showGroups: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showGroups")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v1/spaces/{spacesId}/members" }),
    svc,
  ) as unknown as Schema.Schema<ListSpacesMembersRequest>;

export type ListSpacesMembersResponse = ListMembershipsResponse;
export const ListSpacesMembersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListMembershipsResponse;

export type ListSpacesMembersError = DefaultErrors;

/** Lists memberships in a space. For an example, see [List users and Google Chat apps in a space](https://developers.google.com/workspace/chat/list-members). Listing memberships with [app authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) lists memberships in spaces that the Chat app has access to, but excludes Chat app memberships, including its own. Listing memberships with [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) lists memberships in spaces that the authenticated user has access to. Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.bot` - `https://www.googleapis.com/auth/chat.app.memberships` (requires [administrator approval](https://support.google.com/a?p=chat-app-auth)) - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.memberships.readonly` - `https://www.googleapis.com/auth/chat.memberships` - `https://www.googleapis.com/auth/chat.import` (import mode spaces only) - User authentication grants administrator privileges when an administrator account authenticates, `use_admin_access` is `true`, and one of the following authorization scopes is used: - `https://www.googleapis.com/auth/chat.admin.memberships.readonly` - `https://www.googleapis.com/auth/chat.admin.memberships` */
export const listSpacesMembers: API.PaginatedOperationMethod<
  ListSpacesMembersRequest,
  ListSpacesMembersResponse,
  ListSpacesMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSpacesMembersRequest,
  output: ListSpacesMembersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetSpacesMembersRequest {
  /** Required. Resource name of the membership to retrieve. To get the app's own membership [by using user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user), you can optionally use `spaces/{space}/members/app`. Format: `spaces/{space}/members/{member}` or `spaces/{space}/members/app` You can use the user's email as an alias for `{member}`. For example, `spaces/{space}/members/example@gmail.com` where `example@gmail.com` is the email of the Google Chat user. */
  name: string;
  /** Optional. When `true`, the method runs using the user's Google Workspace administrator privileges. The calling user must be a Google Workspace administrator with the [manage chat and spaces conversations privilege](https://support.google.com/a/answer/13369245). Requires the `chat.admin.memberships` or `chat.admin.memberships.readonly` [OAuth 2.0 scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes). Getting app memberships in a space isn't supported when using admin access. */
  useAdminAccess?: boolean;
}

export const GetSpacesMembersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    useAdminAccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("useAdminAccess"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v1/spaces/{spacesId}/members/{membersId}" }),
    svc,
  ) as unknown as Schema.Schema<GetSpacesMembersRequest>;

export type GetSpacesMembersResponse = Membership;
export const GetSpacesMembersResponse = /*@__PURE__*/ /*#__PURE__*/ Membership;

export type GetSpacesMembersError = DefaultErrors;

/** Returns details about a membership. For an example, see [Get details about a user's or Google Chat app's membership](https://developers.google.com/workspace/chat/get-members). Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize): - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.bot` - `https://www.googleapis.com/auth/chat.app.memberships` (requires [administrator approval](https://support.google.com/a?p=chat-app-auth)) - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.memberships.readonly` - `https://www.googleapis.com/auth/chat.memberships` - User authentication grants administrator privileges when an administrator account authenticates, `use_admin_access` is `true`, and one of the following authorization scopes is used: - `https://www.googleapis.com/auth/chat.admin.memberships.readonly` - `https://www.googleapis.com/auth/chat.admin.memberships` */
export const getSpacesMembers: API.OperationMethod<
  GetSpacesMembersRequest,
  GetSpacesMembersResponse,
  GetSpacesMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSpacesMembersRequest,
  output: GetSpacesMembersResponse,
  errors: [],
}));

export interface GetSpacesSpaceEventsRequest {
  /** Required. The resource name of the space event. Format: `spaces/{space}/spaceEvents/{spaceEvent}` */
  name: string;
}

export const GetSpacesSpaceEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/spaces/{spacesId}/spaceEvents/{spaceEventsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetSpacesSpaceEventsRequest>;

export type GetSpacesSpaceEventsResponse = SpaceEvent;
export const GetSpacesSpaceEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SpaceEvent;

export type GetSpacesSpaceEventsError = DefaultErrors;

/** Returns an event from a Google Chat space. The [event payload](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.spaceEvents#SpaceEvent.FIELDS.oneof_payload) contains the most recent version of the resource that changed. For example, if you request an event about a new message but the message was later updated, the server returns the updated `Message` resource in the event payload. Note: The `permissionSettings` field is not returned in the Space object of the Space event data for this request. Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize) with an [authorization scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes) appropriate for reading the requested data: - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) in [Developer Preview](https://developers.google.com/workspace/preview) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.app.spaces` - `https://www.googleapis.com/auth/chat.app.messages.readonly` - `https://www.googleapis.com/auth/chat.app.memberships` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.spaces.readonly` - `https://www.googleapis.com/auth/chat.spaces` - `https://www.googleapis.com/auth/chat.messages.readonly` - `https://www.googleapis.com/auth/chat.messages` - `https://www.googleapis.com/auth/chat.messages.reactions.readonly` - `https://www.googleapis.com/auth/chat.messages.reactions` - `https://www.googleapis.com/auth/chat.memberships.readonly` - `https://www.googleapis.com/auth/chat.memberships` To get an event, the authenticated caller must be a member of the space. For an example, see [Get details about an event from a Google Chat space](https://developers.google.com/workspace/chat/get-space-event). */
export const getSpacesSpaceEvents: API.OperationMethod<
  GetSpacesSpaceEventsRequest,
  GetSpacesSpaceEventsResponse,
  GetSpacesSpaceEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSpacesSpaceEventsRequest,
  output: GetSpacesSpaceEventsResponse,
  errors: [],
}));

export interface ListSpacesSpaceEventsRequest {
  /** Required. A query filter. You must specify at least one event type (`event_type`) using the has `:` operator. To filter by multiple event types, use the `OR` operator. Omit batch event types in your filter. The request automatically returns any related batch events. For example, if you filter by new reactions (`google.workspace.chat.reaction.v1.created`), the server also returns batch new reactions events (`google.workspace.chat.reaction.v1.batchCreated`). For a list of supported event types, see the [`SpaceEvents` reference documentation](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.spaceEvents#SpaceEvent.FIELDS.event_type). Optionally, you can also filter by start time (`start_time`) and end time (`end_time`): * `start_time`: Exclusive timestamp from which to start listing space events. You can list events that occurred up to 28 days ago. If unspecified, lists space events from the past 28 days. * `end_time`: Inclusive timestamp until which space events are listed. If unspecified, lists events up to the time of the request. To specify a start or end time, use the equals `=` operator and format in [RFC-3339](https://www.rfc-editor.org/rfc/rfc3339). To filter by both `start_time` and `end_time`, use the `AND` operator. For example, the following queries are valid: ``` start_time="2023-08-23T19:20:33+00:00" AND end_time="2023-08-23T19:21:54+00:00" ``` ``` start_time="2023-08-23T19:20:33+00:00" AND (event_types:"google.workspace.chat.space.v1.updated" OR event_types:"google.workspace.chat.message.v1.created") ``` The following queries are invalid: ``` start_time="2023-08-23T19:20:33+00:00" OR end_time="2023-08-23T19:21:54+00:00" ``` ``` event_types:"google.workspace.chat.space.v1.updated" AND event_types:"google.workspace.chat.message.v1.created" ``` Invalid queries are rejected by the server with an `INVALID_ARGUMENT` error. */
  filter?: string;
  /** Required. Resource name of the [Google Chat space](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces) where the events occurred. Format: `spaces/{space}`. */
  parent: string;
  /** Optional. The maximum number of space events returned. The service might return fewer than this value. Negative values return an `INVALID_ARGUMENT` error. */
  pageSize?: number;
  /** Optional. A page token, received from a previous list space events call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to list space events must match the call that provided the page token. Passing different values to the other parameters might lead to unexpected results. */
  pageToken?: string;
}

export const ListSpacesSpaceEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/spaces/{spacesId}/spaceEvents" }),
    svc,
  ) as unknown as Schema.Schema<ListSpacesSpaceEventsRequest>;

export type ListSpacesSpaceEventsResponse = ListSpaceEventsResponse;
export const ListSpacesSpaceEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSpaceEventsResponse;

export type ListSpacesSpaceEventsError = DefaultErrors;

/** Lists events from a Google Chat space. For each event, the [payload](https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.spaceEvents#SpaceEvent.FIELDS.oneof_payload) contains the most recent version of the Chat resource. For example, if you list events about new space members, the server returns `Membership` resources that contain the latest membership details. If new members were removed during the requested period, the event payload contains an empty `Membership` resource. Supports the following types of [authentication](https://developers.google.com/workspace/chat/authenticate-authorize) with an [authorization scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes) appropriate for reading the requested data: - [App authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app) with [administrator approval](https://support.google.com/a?p=chat-app-auth) in [Developer Preview](https://developers.google.com/workspace/preview) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.app.spaces` - `https://www.googleapis.com/auth/chat.app.messages.readonly` - `https://www.googleapis.com/auth/chat.app.memberships` - [User authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following authorization scopes: - `https://www.googleapis.com/auth/chat.spaces.readonly` - `https://www.googleapis.com/auth/chat.spaces` - `https://www.googleapis.com/auth/chat.messages.readonly` - `https://www.googleapis.com/auth/chat.messages` - `https://www.googleapis.com/auth/chat.messages.reactions.readonly` - `https://www.googleapis.com/auth/chat.messages.reactions` - `https://www.googleapis.com/auth/chat.memberships.readonly` - `https://www.googleapis.com/auth/chat.memberships` To list events, the authenticated caller must be a member of the space. For an example, see [List events from a Google Chat space](https://developers.google.com/workspace/chat/list-space-events). */
export const listSpacesSpaceEvents: API.PaginatedOperationMethod<
  ListSpacesSpaceEventsRequest,
  ListSpacesSpaceEventsResponse,
  ListSpacesSpaceEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSpacesSpaceEventsRequest,
  output: ListSpacesSpaceEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCustomEmojisRequest {
  /** Required. Resource name of the custom emoji. Format: `customEmojis/{customEmoji}` You can use the emoji name as an alias for `{customEmoji}`. For example, `customEmojis/:example-emoji:` where `:example-emoji:` is the emoji name for a custom emoji. */
  name: string;
}

export const GetCustomEmojisRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
  },
).pipe(
  T.Http({ method: "GET", path: "v1/customEmojis/{customEmojisId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomEmojisRequest>;

export type GetCustomEmojisResponse = CustomEmoji;
export const GetCustomEmojisResponse = /*@__PURE__*/ /*#__PURE__*/ CustomEmoji;

export type GetCustomEmojisError = DefaultErrors;

/** Returns details about a custom emoji. Custom emojis are only available for Google Workspace accounts, and the administrator must turn custom emojis on for the organization. For more information, see [Learn about custom emojis in Google Chat](https://support.google.com/chat/answer/12800149) and [Manage custom emoji permissions](https://support.google.com/a/answer/12850085). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following [authorization scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.customemojis.readonly` - `https://www.googleapis.com/auth/chat.customemojis` */
export const getCustomEmojis: API.OperationMethod<
  GetCustomEmojisRequest,
  GetCustomEmojisResponse,
  GetCustomEmojisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCustomEmojisRequest,
  output: GetCustomEmojisResponse,
  errors: [],
}));

export interface ListCustomEmojisRequest {
  /** Optional. The maximum number of custom emojis returned. The service can return fewer custom emojis than this value. If unspecified, the default value is 25. The maximum value is 200; values above 200 are changed to 200. */
  pageSize?: number;
  /** Optional. (If resuming from a previous query.) A page token received from a previous list custom emoji call. Provide this to retrieve the subsequent page. When paginating, the filter value should match the call that provided the page token. Passing a different value might lead to unexpected results. */
  pageToken?: string;
  /** Optional. A query filter. Supports filtering by creator. To filter by creator, you must specify a valid value. Currently only `creator("users/me")` and `NOT creator("users/me")` are accepted to filter custom emojis by whether they were created by the calling user or not. For example, the following query returns custom emojis created by the caller: ``` creator("users/me") ``` Invalid queries are rejected with an `INVALID_ARGUMENT` error. */
  filter?: string;
}

export const ListCustomEmojisRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/customEmojis" }),
    svc,
  ) as unknown as Schema.Schema<ListCustomEmojisRequest>;

export type ListCustomEmojisResponse_Op = ListCustomEmojisResponse;
export const ListCustomEmojisResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListCustomEmojisResponse;

export type ListCustomEmojisError = DefaultErrors;

/** Lists custom emojis visible to the authenticated user. Custom emojis are only available for Google Workspace accounts, and the administrator must turn custom emojis on for the organization. For more information, see [Learn about custom emojis in Google Chat](https://support.google.com/chat/answer/12800149) and [Manage custom emoji permissions](https://support.google.com/a/answer/12850085). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with one of the following [authorization scopes](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.customemojis.readonly` - `https://www.googleapis.com/auth/chat.customemojis` */
export const listCustomEmojis: API.PaginatedOperationMethod<
  ListCustomEmojisRequest,
  ListCustomEmojisResponse_Op,
  ListCustomEmojisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCustomEmojisRequest,
  output: ListCustomEmojisResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateCustomEmojisRequest {
  /** Request body */
  body?: CustomEmoji;
}

export const CreateCustomEmojisRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(CustomEmoji).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "v1/customEmojis", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreateCustomEmojisRequest>;

export type CreateCustomEmojisResponse = CustomEmoji;
export const CreateCustomEmojisResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomEmoji;

export type CreateCustomEmojisError = DefaultErrors;

/** Creates a custom emoji. Custom emojis are only available for Google Workspace accounts, and the administrator must turn custom emojis on for the organization. For more information, see [Learn about custom emojis in Google Chat](https://support.google.com/chat/answer/12800149) and [Manage custom emoji permissions](https://support.google.com/a/answer/12850085). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with the [authorization scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.customemojis` */
export const createCustomEmojis: API.OperationMethod<
  CreateCustomEmojisRequest,
  CreateCustomEmojisResponse,
  CreateCustomEmojisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCustomEmojisRequest,
  output: CreateCustomEmojisResponse,
  errors: [],
}));

export interface DeleteCustomEmojisRequest {
  /** Required. Resource name of the custom emoji to delete. Format: `customEmojis/{customEmoji}` You can use the emoji name as an alias for `{customEmoji}`. For example, `customEmojis/:example-emoji:` where `:example-emoji:` is the emoji name for a custom emoji. */
  name: string;
}

export const DeleteCustomEmojisRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({ method: "DELETE", path: "v1/customEmojis/{customEmojisId}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteCustomEmojisRequest>;

export type DeleteCustomEmojisResponse = Empty;
export const DeleteCustomEmojisResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteCustomEmojisError = DefaultErrors;

/** Deletes a custom emoji. By default, users can only delete custom emoji they created. [Emoji managers](https://support.google.com/a/answer/12850085) assigned by the administrator can delete any custom emoji in the organization. See [Learn about custom emojis in Google Chat](https://support.google.com/chat/answer/12800149). Custom emojis are only available for Google Workspace accounts, and the administrator must turn custom emojis on for the organization. For more information, see [Learn about custom emojis in Google Chat](https://support.google.com/chat/answer/12800149) and [Manage custom emoji permissions](https://support.google.com/a/answer/12850085). Requires [user authentication](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user) with the [authorization scope](https://developers.google.com/workspace/chat/authenticate-authorize#chat-api-scopes): - `https://www.googleapis.com/auth/chat.customemojis` */
export const deleteCustomEmojis: API.OperationMethod<
  DeleteCustomEmojisRequest,
  DeleteCustomEmojisResponse,
  DeleteCustomEmojisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCustomEmojisRequest,
  output: DeleteCustomEmojisResponse,
  errors: [],
}));
