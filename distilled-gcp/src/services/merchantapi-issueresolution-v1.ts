// ==========================================================================
// Merchant API (merchantapi issueresolution_v1)
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
  name: "merchantapi",
  version: "issueresolution_v1",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AdditionalContent {
  /** Title of the additional content; */
  title?: string;
  /** Long text organized into paragraphs. */
  paragraphs?: Array<string>;
}

export const AdditionalContent: Schema.Schema<AdditionalContent> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  paragraphs: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdditionalContent" }) as any as Schema.Schema<AdditionalContent>;

export interface BuiltInSimpleAction {
  /** The attribute that needs to be updated. Present when the type is `EDIT_ITEM_ATTRIBUTE`. This field contains a code for attribute, represented in snake_case. You can find a list of product's attributes, with their codes [here](https://support.google.com/merchants/answer/7052112). */
  attributeCode?: string;
  /** The type of action that represents a functionality that is expected to be available in third-party application. */
  type?: "BUILT_IN_SIMPLE_ACTION_TYPE_UNSPECIFIED" | "VERIFY_PHONE" | "CLAIM_WEBSITE" | "ADD_PRODUCTS" | "ADD_CONTACT_INFO" | "LINK_ADS_ACCOUNT" | "ADD_BUSINESS_REGISTRATION_NUMBER" | "EDIT_ITEM_ATTRIBUTE" | "FIX_ACCOUNT_ISSUE" | "SHOW_ADDITIONAL_CONTENT" | (string & {});
  /** Long text from an external source that should be available to the business. Present when the type is `SHOW_ADDITIONAL_CONTENT`. */
  additionalContent?: AdditionalContent;
}

export const BuiltInSimpleAction: Schema.Schema<BuiltInSimpleAction> = Schema.suspend(() => Schema.Struct({
  attributeCode: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  additionalContent: Schema.optional(AdditionalContent),
})).annotate({ identifier: "BuiltInSimpleAction" }) as any as Schema.Schema<BuiltInSimpleAction>;

export interface ProductChange {
  /** The new value of the changed resource or attribute. If empty, it means that the product was deleted. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  newValue?: string;
  /** Countries that have the change (if applicable). Represented in the ISO 3166 format. */
  regionCode?: string;
  /** The old value of the changed resource or attribute. If empty, it means that the product was created. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  oldValue?: string;
  /** Reporting contexts that have the change (if applicable). Currently this field supports only (`SHOPPING_ADS`, `LOCAL_INVENTORY_ADS`, `YOUTUBE_SHOPPING`, `YOUTUBE_CHECKOUT`, `YOUTUBE_AFFILIATE`) from the enum value [ReportingContextEnum](/merchant/api/reference/rest/Shared.Types/ReportingContextEnum) */
  reportingContext?: "REPORTING_CONTEXT_ENUM_UNSPECIFIED" | "SHOPPING_ADS" | "DISCOVERY_ADS" | "DEMAND_GEN_ADS" | "DEMAND_GEN_ADS_DISCOVER_SURFACE" | "VIDEO_ADS" | "DISPLAY_ADS" | "LOCAL_INVENTORY_ADS" | "VEHICLE_INVENTORY_ADS" | "FREE_LISTINGS" | "FREE_LISTINGS_UCP_CHECKOUT" | "FREE_LOCAL_LISTINGS" | "FREE_LOCAL_VEHICLE_LISTINGS" | "YOUTUBE_AFFILIATE" | "YOUTUBE_SHOPPING" | "CLOUD_RETAIL" | "LOCAL_CLOUD_RETAIL" | "PRODUCT_REVIEWS" | "MERCHANT_REVIEWS" | "YOUTUBE_CHECKOUT" | (string & {});
}

export const ProductChange: Schema.Schema<ProductChange> = Schema.suspend(() => Schema.Struct({
  newValue: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  oldValue: Schema.optional(Schema.String),
  reportingContext: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductChange" }) as any as Schema.Schema<ProductChange>;

export interface ProductStatusChangeMessage {
  /** The product id. */
  resourceId?: string;
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> = Schema.suspend(() => Schema.Struct({
  resourceId: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  changes: Schema.optional(Schema.Array(ProductChange)),
  eventTime: Schema.optional(Schema.String),
  account: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  managingAccount: Schema.optional(Schema.String),
  attribute: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductStatusChangeMessage" }) as any as Schema.Schema<ProductStatusChangeMessage>;

export interface TextInputValue {
  /** Required. Text provided by the business. */
  value?: string;
}

export const TextInputValue: Schema.Schema<TextInputValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "TextInputValue" }) as any as Schema.Schema<TextInputValue>;

export interface TextWithTooltip {
  /** Value of the message as a simple text. */
  simpleValue?: string;
  /** Value of the tooltip as a simple text. */
  simpleTooltipValue?: string;
  /** The suggested type of an icon for tooltip, if a tooltip is present. */
  tooltipIconStyle?: "TOOLTIP_ICON_STYLE_UNSPECIFIED" | "INFO" | "QUESTION" | (string & {});
}

export const TextWithTooltip: Schema.Schema<TextWithTooltip> = Schema.suspend(() => Schema.Struct({
  simpleValue: Schema.optional(Schema.String),
  simpleTooltipValue: Schema.optional(Schema.String),
  tooltipIconStyle: Schema.optional(Schema.String),
})).annotate({ identifier: "TextWithTooltip" }) as any as Schema.Schema<TextWithTooltip>;

export interface TextInput {
  /** Type of the text input */
  type?: "TEXT_INPUT_TYPE_UNSPECIFIED" | "GENERIC_SHORT_TEXT" | "GENERIC_LONG_TEXT" | (string & {});
  /** Information about the required format. If present, it should be shown close to the input field to help the business to provide a correct value. For example: "VAT numbers should be in a format similar to SK9999999999" */
  formatInfo?: string;
  /** Text to be used as the [aria-label](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html) for the input. */
  ariaLabel?: string;
  /** Additional info regarding the field to be displayed to the business. For example, warning to not include personal identifiable information. There may be more information to be shown in a tooltip. */
  additionalInfo?: TextWithTooltip;
}

export const TextInput: Schema.Schema<TextInput> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  formatInfo: Schema.optional(Schema.String),
  ariaLabel: Schema.optional(Schema.String),
  additionalInfo: Schema.optional(TextWithTooltip),
})).annotate({ identifier: "TextInput" }) as any as Schema.Schema<TextInput>;

export interface Callout {
  /** Can be used to render messages with different severity in different styles. Snippets off all types contain important information that should be displayed to the business. */
  styleHint?: "CALLOUT_STYLE_HINT_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO" | (string & {});
  /** A full message that needs to be shown to the business. */
  fullMessage?: TextWithTooltip;
}

export const Callout: Schema.Schema<Callout> = Schema.suspend(() => Schema.Struct({
  styleHint: Schema.optional(Schema.String),
  fullMessage: Schema.optional(TextWithTooltip),
})).annotate({ identifier: "Callout" }) as any as Schema.Schema<Callout>;

export interface CheckboxInput {
}

export const CheckboxInput: Schema.Schema<CheckboxInput> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CheckboxInput" }) as any as Schema.Schema<CheckboxInput>;

export interface ChoiceInputOption {
  /** Input that should be displayed when this option is selected. The additional input will not contain a `ChoiceInput`. */
  additionalInput?: InputField;
  /** Short description of the choice option. There may be more information to be shown as a tooltip. */
  label?: TextWithTooltip;
  /** Not for display but need to be sent back for the selected choice option. */
  id?: string;
}

export const ChoiceInputOption: Schema.Schema<ChoiceInputOption> = Schema.suspend(() => Schema.Struct({
  additionalInput: Schema.optional(InputField),
  label: Schema.optional(TextWithTooltip),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "ChoiceInputOption" }) as any as Schema.Schema<ChoiceInputOption>;

export interface ChoiceInput {
  /** A list of choices. Only one option can be selected. */
  options?: Array<ChoiceInputOption>;
}

export const ChoiceInput: Schema.Schema<ChoiceInput> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(Schema.Array(ChoiceInputOption)),
})).annotate({ identifier: "ChoiceInput" }) as any as Schema.Schema<ChoiceInput>;

export interface InputField {
  /** Not for display but need to be sent back for the given input field. */
  id?: string;
  /** Input field to provide a boolean value. Corresponds to the [html input type=checkbox](https://www.w3.org/TR/2012/WD-html-markup-20121025/input.checkbox.html#input.checkbox). */
  checkboxInput?: CheckboxInput;
  /** Input field to select one of the offered choices. Corresponds to the [html input type=radio](https://www.w3.org/TR/2012/WD-html-markup-20121025/input.radio.html#input.radio). */
  choiceInput?: ChoiceInput;
  /** Whether the field is required. The action button needs to stay disabled till values for all required fields are provided. */
  required?: boolean;
  /** Input field to provide text information. Corresponds to the [html input type=text](https://www.w3.org/TR/2012/WD-html-markup-20121025/input.text.html#input.text) or [html textarea](https://www.w3.org/TR/2012/WD-html-markup-20121025/textarea.html#textarea). */
  textInput?: TextInput;
  /** Input field label. There may be more information to be shown in a tooltip. */
  label?: TextWithTooltip;
}

export const InputField: Schema.Schema<InputField> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  checkboxInput: Schema.optional(CheckboxInput),
  choiceInput: Schema.optional(ChoiceInput),
  required: Schema.optional(Schema.Boolean),
  textInput: Schema.optional(TextInput),
  label: Schema.optional(TextWithTooltip),
})).annotate({ identifier: "InputField" }) as any as Schema.Schema<InputField>;

export interface ActionFlow {
  /** Title of the request dialog. For example: "Before you request a review" */
  dialogTitle?: string;
  /** Message displayed in the request dialog. For example: "Make sure you've fixed all your country-specific issues. If not, you may have to wait 7 days to request another review". There may be an more information to be shown in a tooltip. */
  dialogMessage?: TextWithTooltip;
  /** Important message to be highlighted in the request dialog. For example: "You can only request a review for disagreeing with this issue once. If it's not approved, you'll need to fix the issue and wait a few days before you can request another review." */
  dialogCallout?: Callout;
  /** Not for display but need to be sent back for the selected action flow. */
  id?: string;
  /** Label for the button to trigger the action from the action dialog. For example: "Request review" */
  dialogButtonLabel?: string;
  /** Text value describing the intent for the action flow. It can be used as an input label if business needs to pick one of multiple flows. For example: "I disagree with the issue" */
  label?: string;
  /** A list of input fields. */
  inputs?: Array<InputField>;
}

export const ActionFlow: Schema.Schema<ActionFlow> = Schema.suspend(() => Schema.Struct({
  dialogTitle: Schema.optional(Schema.String),
  dialogMessage: Schema.optional(TextWithTooltip),
  dialogCallout: Schema.optional(Callout),
  id: Schema.optional(Schema.String),
  dialogButtonLabel: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
  inputs: Schema.optional(Schema.Array(InputField)),
})).annotate({ identifier: "ActionFlow" }) as any as Schema.Schema<ActionFlow>;

export interface BuiltInUserInputAction {
  /** Contains the action's context that must be included as part of the TriggerActionPayload.action_context in TriggerActionRequest.payload to call the `triggeraction` method. The content should be treated as opaque and must not be modified. */
  actionContext?: string;
  /** Actions may provide multiple different flows. Business selects one that fits best to their intent. Selecting the flow is the first step in user's interaction with the action. It affects what input fields will be available and required and also how the request will be processed. */
  flows?: Array<ActionFlow>;
}

export const BuiltInUserInputAction: Schema.Schema<BuiltInUserInputAction> = Schema.suspend(() => Schema.Struct({
  actionContext: Schema.optional(Schema.String),
  flows: Schema.optional(Schema.Array(ActionFlow)),
})).annotate({ identifier: "BuiltInUserInputAction" }) as any as Schema.Schema<BuiltInUserInputAction>;

export interface ExternalAction {
  /** The type of external action. */
  type?: "EXTERNAL_ACTION_TYPE_UNSPECIFIED" | "REVIEW_PRODUCT_ISSUE_IN_MERCHANT_CENTER" | "REVIEW_ACCOUNT_ISSUE_IN_MERCHANT_CENTER" | "LEGAL_APPEAL_IN_HELP_CENTER" | "VERIFY_IDENTITY_IN_MERCHANT_CENTER" | "VERIFY_BUSINESS_VIDEO_IN_MERCHANT_CENTER" | (string & {});
  /** URL to external system, for example Merchant Center, where the business can perform the action. */
  uri?: string;
}

export const ExternalAction: Schema.Schema<ExternalAction> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalAction" }) as any as Schema.Schema<ExternalAction>;

export interface Action {
  /** Label of the action button. */
  buttonLabel?: string;
  /** Action implemented and performed in (your) third-party application. The application needs to show an additional content and input form to the business as specified for given action. They can trigger the action only when they provided all required inputs. */
  builtinUserInputAction?: BuiltInUserInputAction;
  /** Controlling whether the button is active or disabled. The value is 'false' when the action was already requested or is not available. If the action is not available then a reason will be present. If (your) third-party application shows a disabled button for action that is not available, then it should also show reasons. */
  isAvailable?: boolean;
  /** Action that is implemented and performed outside of (your) third-party application. The application needs to redirect the business to the external location where they can perform the action. */
  externalAction?: ExternalAction;
  /** Action implemented and performed in (your) third-party application. The application should point the business to the place, where they can access the corresponding functionality or provide instructions, if the specific functionality is not available. */
  builtinSimpleAction?: BuiltInSimpleAction;
  /** List of reasons why the action is not available. The list of reasons is empty if the action is available. If there is only one reason, it can be displayed next to the disabled button. If there are more reasons, all of them should be displayed, for example in a pop-up dialog. */
  reasons?: Array<Reason>;
}

export const Action: Schema.Schema<Action> = Schema.suspend(() => Schema.Struct({
  buttonLabel: Schema.optional(Schema.String),
  builtinUserInputAction: Schema.optional(BuiltInUserInputAction),
  isAvailable: Schema.optional(Schema.Boolean),
  externalAction: Schema.optional(ExternalAction),
  builtinSimpleAction: Schema.optional(BuiltInSimpleAction),
  reasons: Schema.optional(Schema.Array(Reason)),
})).annotate({ identifier: "Action" }) as any as Schema.Schema<Action>;

export interface Reason {
  /** Optional. An action that needs to be performed to solve the problem represented by this reason. This action will always be available. Should be rendered as a link or button next to the summarizing message. For example, the review may be available only once the business configure all required attributes. In such a situation this action can be a link to the form, where they can fill the missing attribute to unblock the main action. */
  action?: Action;
  /** Messages summarizing the reason, why the action is not available. For example: "Review requested on Jan 03. Review requests can take a few days to complete." */
  message?: string;
  /** Detailed explanation of the reason. Should be displayed as a hint if present. */
  detail?: string;
}

export const Reason: Schema.Schema<Reason> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Action),
  message: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
})).annotate({ identifier: "Reason" }) as any as Schema.Schema<Reason>;

export interface Region {
  /** The [CLDR territory code] (http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) */
  code?: string;
  /** The localized name of the region. For region with code='001' the value is 'All countries' or the equivalent in other languages. */
  name?: string;
}

export const Region: Schema.Schema<Region> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Region" }) as any as Schema.Schema<Region>;

export interface Breakdown {
  /** Lists of regions. Should be rendered as a title for this group of details. The full list should be shown to the business. If the list is too long, it is recommended to make it expandable. */
  regions?: Array<Region>;
  /** Human readable, localized description of issue's effect on different targets. Should be rendered as a list. For example: * "Products not showing in ads" * "Products not showing organically" */
  details?: Array<string>;
}

export const Breakdown: Schema.Schema<Breakdown> = Schema.suspend(() => Schema.Struct({
  regions: Schema.optional(Schema.Array(Region)),
  details: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Breakdown" }) as any as Schema.Schema<Breakdown>;

export interface Impact {
  /** Detailed impact breakdown. Explains the types of restriction the issue has in different shopping destinations and territory. If present, it should be rendered to the business. Can be shown as a mouse over dropdown or a dialog. Each breakdown item represents a group of regions with the same impact details. */
  breakdowns?: Array<Breakdown>;
  /** Optional. Message summarizing the overall impact of the issue. If present, it should be rendered to the business. For example: "Disapproves 90k offers in 25 countries" */
  message?: string;
  /** The severity of the issue. */
  severity?: "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO" | (string & {});
}

export const Impact: Schema.Schema<Impact> = Schema.suspend(() => Schema.Struct({
  breakdowns: Schema.optional(Schema.Array(Breakdown)),
  message: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "Impact" }) as any as Schema.Schema<Impact>;

export interface RenderedIssue {
  /** A list of actionable steps that can be executed to solve the issue. An example is requesting a re-review or providing arguments when business disagrees with the issue. Actions that are supported in (your) third-party application can be rendered as buttons and should be available to the business when they expand the issue. */
  actions?: Array<Action>;
  /** Pre-rendered HTML that contains a link to the external location where the ODS can be requested and instructions for how to request it. HTML elements contain CSS classes that can be used to customize the style of this snippet. Always sanitize the HTML before embedding it directly to your application. The sanitizer needs to allow basic HTML tags, such as: `div`, `span`, `p`, `a`, `ul`, `li`, `table`, `tr`, `td`. For example, you can use [DOMPurify](https://www.npmjs.com/package/dompurify). CSS classes: * `ods-section`* - wrapper around the out-of-court dispute resolution section * `ods-description`* - intro text for the out-of-court dispute resolution. It may contain multiple segments and a link. * `ods-param`* - wrapper around the header-value pair for parameters that the business may need to provide during the ODS process. * `ods-routing-id`* - ods param for the Routing ID. * `ods-reference-id`* - ods param for the Routing ID. * `ods-param-header`* - header for the ODS parameter * `ods-param-value`* - value of the ODS parameter. This value should be rendered in a way that it is easy for the user to identify and copy. * `segment` - section of the text, `span` inside paragraph * `segment-attribute` - section of the text that represents a product attribute, for example 'image\_link' * `segment-literal` - section of the text that contains a special value, for example '0-1000 kg' * `segment-bold` - section of the text that should be rendered as bold * `segment-italic` - section of the text that should be rendered as italic * `tooltip` - used on paragraphs that should be rendered with a tooltip. A section of the text in such a paragraph will have a class `tooltip-text` and is intended to be shown in a mouse over dialog. If the style is not used, the `tooltip-text` section would be shown on a new line, after the main part of the text. * `tooltip-text` - marks a section of the text within a `tooltip`, that is intended to be shown in a mouse over dialog. * `tooltip-icon` - marks a section of the text within a `tooltip`, that can be replaced with a tooltip icon, for example '?' or 'i'. By default, this section contains a `br` tag, that is separating the main text and the tooltip text when the style is not used. * `tooltip-style-question` - the tooltip shows helpful information, can use the '?' as an icon. * `tooltip-style-info` - the tooltip adds additional information fitting to the context, can use the 'i' as an icon. */
  prerenderedOutOfCourtDisputeSettlement?: string;
  /** Clarifies the severity of the issue. The summarizing message, if present, should be shown right under the title for each issue. It helps business to quickly understand the impact of the issue. The detailed breakdown helps the business to fully understand the impact of the issue. It can be rendered as dialog that opens when the business mouse over the summarized impact statement. Issues with different severity can be styled differently. They may use a different color or icon to signal the difference between `ERROR`, `WARNING` and `INFO`. */
  impact?: Impact;
  /** Title of the issue. */
  title?: string;
  /** Details of the issue as a pre-rendered HTML. HTML elements contain CSS classes that can be used to customize the style of the content. Always sanitize the HTML before embedding it directly to your application. The sanitizer needs to allow basic HTML tags, such as: `div`, `span`, `p`, `a`, `ul`, `li`, `table`, `tr`, `td`. For example, you can use [DOMPurify](https://www.npmjs.com/package/dompurify). CSS classes: * `issue-detail` - top level container for the detail of the issue * `callout-banners` - section of the `issue-detail` with callout banners * `callout-banner` - single callout banner, inside `callout-banners` * `callout-banner-info` - callout with important information (default) * `callout-banner-warning` - callout with a warning * `callout-banner-error` - callout informing about an error (most severe) * `issue-content` - section of the `issue-detail`, contains multiple `content-element` * `content-element` - content element such as a list, link or paragraph, inside `issue-content` * `root-causes` - unordered list with items describing root causes of the issue, inside `issue-content` * `root-causes-intro` - intro text before the `root-causes` list, inside `issue-content` * `segment` - section of the text, `span` inside paragraph * `segment-attribute` - section of the text that represents a product attribute, for example 'image\_link' * `segment-literal` - section of the text that contains a special value, for example '0-1000 kg' * `segment-bold` - section of the text that should be rendered as bold * `segment-italic` - section of the text that should be rendered as italic * `tooltip` - used on paragraphs that should be rendered with a tooltip. A section of the text in such a paragraph will have a class `tooltip-text` and is intended to be shown in a mouse over dialog. If the style is not used, the `tooltip-text` section would be shown on a new line, after the main part of the text. * `tooltip-text` - marks a section of the text within a `tooltip`, that is intended to be shown in a mouse over dialog. * `tooltip-icon` - marks a section of the text within a `tooltip`, that can be replaced with a tooltip icon, for example '?' or 'i'. By default, this section contains a `br` tag, that is separating the main text and the tooltip text when the style is not used. * `tooltip-style-question` - the tooltip shows helpful information, can use the '?' as an icon. * `tooltip-style-info` - the tooltip adds additional information fitting to the context, can use the 'i' as an icon. * `content-moderation` - marks the paragraph that explains how the issue was identified. * `new-element` - Present for new elements added to the pre-rendered content in the future. To make sure that a new content element does not break your style, you can hide everything with this class. */
  prerenderedContent?: string;
}

export const RenderedIssue: Schema.Schema<RenderedIssue> = Schema.suspend(() => Schema.Struct({
  actions: Schema.optional(Schema.Array(Action)),
  prerenderedOutOfCourtDisputeSettlement: Schema.optional(Schema.String),
  impact: Schema.optional(Impact),
  title: Schema.optional(Schema.String),
  prerenderedContent: Schema.optional(Schema.String),
})).annotate({ identifier: "RenderedIssue" }) as any as Schema.Schema<RenderedIssue>;

export interface RenderAccountIssuesResponse {
  /** List of account issues for a given account. This list can be shown with compressed, expandable items. In the compressed form, the title and impact should be shown for each issue. Once the issue is expanded, the detailed content and available actions should be rendered. */
  renderedIssues?: Array<RenderedIssue>;
}

export const RenderAccountIssuesResponse: Schema.Schema<RenderAccountIssuesResponse> = Schema.suspend(() => Schema.Struct({
  renderedIssues: Schema.optional(Schema.Array(RenderedIssue)),
})).annotate({ identifier: "RenderAccountIssuesResponse" }) as any as Schema.Schema<RenderAccountIssuesResponse>;

export interface ItemLevelIssue {
  /** The number of products affected by this issue. */
  productCount?: string;
  /** How this issue affects serving of the offer. */
  severity?: "SEVERITY_UNSPECIFIED" | "NOT_IMPACTED" | "DEMOTED" | "DISAPPROVED" | (string & {});
  /** The attribute's name, if the issue is caused by a single attribute. */
  attribute?: string;
  /** The error code of the issue. */
  code?: string;
  /** The URL of a web page to help with resolving this issue. */
  documentationUri?: string;
  /** A detailed issue description in English. */
  detail?: string;
  /** Whether the issue can be resolved by the merchant. */
  resolution?: "RESOLUTION_UNSPECIFIED" | "MERCHANT_ACTION" | "PENDING_PROCESSING" | (string & {});
  /** A short issue description in English. */
  description?: string;
}

export const ItemLevelIssue: Schema.Schema<ItemLevelIssue> = Schema.suspend(() => Schema.Struct({
  productCount: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  attribute: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  documentationUri: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
  resolution: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "ItemLevelIssue" }) as any as Schema.Schema<ItemLevelIssue>;

export interface Stats {
  /** The number of products that are active. */
  activeCount?: string;
  /** The number of products that are disapproved. */
  disapprovedCount?: string;
  /** The number of products that are pending. */
  pendingCount?: string;
  /** The number of products that are expiring. */
  expiringCount?: string;
}

export const Stats: Schema.Schema<Stats> = Schema.suspend(() => Schema.Struct({
  activeCount: Schema.optional(Schema.String),
  disapprovedCount: Schema.optional(Schema.String),
  pendingCount: Schema.optional(Schema.String),
  expiringCount: Schema.optional(Schema.String),
})).annotate({ identifier: "Stats" }) as any as Schema.Schema<Stats>;

export interface AggregateProductStatus {
  /** The product issues that affect the given reporting context and country. */
  itemLevelIssues?: Array<ItemLevelIssue>;
  /** The reporting context of the aggregate product statuses. */
  reportingContext?: "REPORTING_CONTEXT_ENUM_UNSPECIFIED" | "SHOPPING_ADS" | "DISCOVERY_ADS" | "DEMAND_GEN_ADS" | "DEMAND_GEN_ADS_DISCOVER_SURFACE" | "VIDEO_ADS" | "DISPLAY_ADS" | "LOCAL_INVENTORY_ADS" | "VEHICLE_INVENTORY_ADS" | "FREE_LISTINGS" | "FREE_LISTINGS_UCP_CHECKOUT" | "FREE_LOCAL_LISTINGS" | "FREE_LOCAL_VEHICLE_LISTINGS" | "YOUTUBE_AFFILIATE" | "YOUTUBE_SHOPPING" | "CLOUD_RETAIL" | "LOCAL_CLOUD_RETAIL" | "PRODUCT_REVIEWS" | "MERCHANT_REVIEWS" | "YOUTUBE_CHECKOUT" | (string & {});
  /** Identifier. The name of the `AggregateProductStatuses` resource. Format: `accounts/{account}/aggregateProductStatuses/{aggregateProductStatuses}` */
  name?: string;
  /** Products statistics for the given reporting context and country. */
  stats?: Stats;
  /** The country of the aggregate product statuses. Represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml). */
  country?: string;
}

export const AggregateProductStatus: Schema.Schema<AggregateProductStatus> = Schema.suspend(() => Schema.Struct({
  itemLevelIssues: Schema.optional(Schema.Array(ItemLevelIssue)),
  reportingContext: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  stats: Schema.optional(Stats),
  country: Schema.optional(Schema.String),
})).annotate({ identifier: "AggregateProductStatus" }) as any as Schema.Schema<AggregateProductStatus>;

export interface ListAggregateProductStatusesResponse {
  /** The `AggregateProductStatuses` resources for the given account. */
  aggregateProductStatuses?: Array<AggregateProductStatus>;
  /** A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAggregateProductStatusesResponse: Schema.Schema<ListAggregateProductStatusesResponse> = Schema.suspend(() => Schema.Struct({
  aggregateProductStatuses: Schema.optional(Schema.Array(AggregateProductStatus)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAggregateProductStatusesResponse" }) as any as Schema.Schema<ListAggregateProductStatusesResponse>;

export interface RenderIssuesRequestPayload {
  /** Optional. How actions with user input form should be handled. If not provided, actions will be returned as links that points the business to Merchant Center where they can request the action. */
  userInputActionOption?: "USER_INPUT_ACTION_RENDERING_OPTION_UNSPECIFIED" | "REDIRECT_TO_MERCHANT_CENTER" | "BUILT_IN_USER_INPUT_ACTIONS" | (string & {});
  /** Optional. How the detailed content should be returned. Default option is to return the content as a pre-rendered HTML text. */
  contentOption?: "CONTENT_OPTION_UNSPECIFIED" | "PRE_RENDERED_HTML" | (string & {});
}

export const RenderIssuesRequestPayload: Schema.Schema<RenderIssuesRequestPayload> = Schema.suspend(() => Schema.Struct({
  userInputActionOption: Schema.optional(Schema.String),
  contentOption: Schema.optional(Schema.String),
})).annotate({ identifier: "RenderIssuesRequestPayload" }) as any as Schema.Schema<RenderIssuesRequestPayload>;

export interface ChoiceInputValue {
  /** Required. Id of the option that was selected by the business. */
  choiceInputOptionId?: string;
}

export const ChoiceInputValue: Schema.Schema<ChoiceInputValue> = Schema.suspend(() => Schema.Struct({
  choiceInputOptionId: Schema.optional(Schema.String),
})).annotate({ identifier: "ChoiceInputValue" }) as any as Schema.Schema<ChoiceInputValue>;

export interface CheckboxInputValue {
  /** Required. True if the business checked the box field. False otherwise. */
  value?: boolean;
}

export const CheckboxInputValue: Schema.Schema<CheckboxInputValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CheckboxInputValue" }) as any as Schema.Schema<CheckboxInputValue>;

export interface InputValue {
  /** Value for choice input field. */
  choiceInputValue?: ChoiceInputValue;
  /** Required. Id of the corresponding input field. */
  inputFieldId?: string;
  /** Value for text input field. */
  textInputValue?: TextInputValue;
  /** Value for checkbox input field. */
  checkboxInputValue?: CheckboxInputValue;
}

export const InputValue: Schema.Schema<InputValue> = Schema.suspend(() => Schema.Struct({
  choiceInputValue: Schema.optional(ChoiceInputValue),
  inputFieldId: Schema.optional(Schema.String),
  textInputValue: Schema.optional(TextInputValue),
  checkboxInputValue: Schema.optional(CheckboxInputValue),
})).annotate({ identifier: "InputValue" }) as any as Schema.Schema<InputValue>;

export interface ActionInput {
  /** Required. Values for input fields. */
  inputValues?: Array<InputValue>;
  /** Required. Id of the selected action flow. */
  actionFlowId?: string;
}

export const ActionInput: Schema.Schema<ActionInput> = Schema.suspend(() => Schema.Struct({
  inputValues: Schema.optional(Schema.Array(InputValue)),
  actionFlowId: Schema.optional(Schema.String),
})).annotate({ identifier: "ActionInput" }) as any as Schema.Schema<ActionInput>;

export interface TriggerActionPayload {
  /** Required. Input provided by the business. */
  actionInput?: ActionInput;
  /** Required. The context from the selected action. The value is obtained from rendered issues and needs to be sent back to identify the action that is being triggered. */
  actionContext?: string;
}

export const TriggerActionPayload: Schema.Schema<TriggerActionPayload> = Schema.suspend(() => Schema.Struct({
  actionInput: Schema.optional(ActionInput),
  actionContext: Schema.optional(Schema.String),
})).annotate({ identifier: "TriggerActionPayload" }) as any as Schema.Schema<TriggerActionPayload>;

export interface TriggerActionResponse {
  /** The message for the business. */
  message?: string;
}

export const TriggerActionResponse: Schema.Schema<TriggerActionResponse> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "TriggerActionResponse" }) as any as Schema.Schema<TriggerActionResponse>;

export interface RenderProductIssuesResponse {
  /** List of issues for a given product. This list can be shown with compressed, expandable items. In the compressed form, the title and impact should be shown for each issue. Once the issue is expanded, the detailed content and available actions should be rendered. */
  renderedIssues?: Array<RenderedIssue>;
}

export const RenderProductIssuesResponse: Schema.Schema<RenderProductIssuesResponse> = Schema.suspend(() => Schema.Struct({
  renderedIssues: Schema.optional(Schema.Array(RenderedIssue)),
})).annotate({ identifier: "RenderProductIssuesResponse" }) as any as Schema.Schema<RenderProductIssuesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListAccountsAggregateProductStatusesRequest {
  /** Required. The account to list aggregate product statuses for. Format: `accounts/{account}` */
  parent: string;
  /** Optional. The maximum number of aggregate product statuses to return. The service may return fewer than this value. If unspecified, at most 25 aggregate product statuses are returned. The maximum value is 250; values above 250 are coerced to 250. */
  pageSize?: number;
  /** Optional. A filter expression that filters the aggregate product statuses. Filtering is only supported by the `reporting_context` and `country` field. For example: `reporting_context = "SHOPPING_ADS" AND country = "US"`. */
  filter?: string;
  /** Optional. A page token, received from a previous `ListAggregateProductStatuses` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAggregateProductStatuses` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsAggregateProductStatusesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "issueresolution/v1/accounts/{accountsId}/aggregateProductStatuses" }),
  svc,
) as unknown as Schema.Schema<ListAccountsAggregateProductStatusesRequest>;

export type ListAccountsAggregateProductStatusesResponse = ListAggregateProductStatusesResponse;
export const ListAccountsAggregateProductStatusesResponse = ListAggregateProductStatusesResponse;

export type ListAccountsAggregateProductStatusesError = CommonErrors;

/** Lists the `AggregateProductStatuses` resources for your merchant account. The response might contain fewer items than specified by `pageSize`. If `pageToken` was returned in previous request, it can be used to obtain additional results. */
export const listAccountsAggregateProductStatuses: API.PaginatedOperationMethod<ListAccountsAggregateProductStatusesRequest, ListAccountsAggregateProductStatusesResponse, ListAccountsAggregateProductStatusesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListAccountsAggregateProductStatusesRequest,
  output: ListAccountsAggregateProductStatusesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface RenderaccountissuesIssueresolutionRequest {
  /** Optional. The [IANA](https://www.iana.org/time-zones) timezone used to localize times in an issue resolution content. For example 'America/Los_Angeles'. If not set, results will use as a default UTC. */
  timeZone?: string;
  /** Required. The account to fetch issues for. Format: `accounts/{account}` */
  name: string;
  /** Optional. The [IETF BCP-47](https://tools.ietf.org/html/bcp47) language code used to localize issue resolution content. If not set, the result will be in default language `en-US`. */
  languageCode?: string;
  /** Request body */
  body?: RenderIssuesRequestPayload;
}

export const RenderaccountissuesIssueresolutionRequest = Schema.Struct({
  timeZone: Schema.optional(Schema.String).pipe(T.HttpQuery("timeZone")),
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(RenderIssuesRequestPayload).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "issueresolution/v1/accounts/{accountsId}:renderaccountissues", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenderaccountissuesIssueresolutionRequest>;

export type RenderaccountissuesIssueresolutionResponse = RenderAccountIssuesResponse;
export const RenderaccountissuesIssueresolutionResponse = RenderAccountIssuesResponse;

export type RenderaccountissuesIssueresolutionError = CommonErrors;

/** Provide a list of business's account issues with an issue resolution content and available actions. This content and actions are meant to be rendered and shown in third-party applications. */
export const renderaccountissuesIssueresolution: API.OperationMethod<RenderaccountissuesIssueresolutionRequest, RenderaccountissuesIssueresolutionResponse, RenderaccountissuesIssueresolutionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenderaccountissuesIssueresolutionRequest,
  output: RenderaccountissuesIssueresolutionResponse,
  errors: [],
}));

export interface RenderproductissuesIssueresolutionRequest {
  /** Optional. The [IANA](https://www.iana.org/time-zones) timezone used to localize times in an issue resolution content. For example 'America/Los_Angeles'. If not set, results will use as a default UTC. */
  timeZone?: string;
  /** Required. The name of the product. Format: `accounts/{account}/products/{product}` The `{product}` segment is a unique identifier for the product. This identifier must be unique within a merchant account and generally follows the structure: `content_language~feed_label~offer_id`. Example: `en~US~sku123` For legacy local products, the structure is: `local~content_language~feed_label~offer_id`. Example: `local~en~US~sku123` The format of the `{product}` segment in the URL is automatically detected by the server, supporting two options: 1. **Encoded Format**: The `{product}` segment is an unpadded base64url encoded string (RFC 4648 Section 5). The decoded string must result in the `content_language~feed_label~offer_id` structure. This encoding MUST be used if any part of the product identifier (like `offer_id`) contains characters such as `/`, `%`, or `~`. * Example: To represent the product ID `en~US~sku/123`, the `{product}` segment must be the base64url encoding of this string, which is `ZW5-VVMtc2t1LzEyMw`. The full resource name for the product would be `accounts/123/products/ZW5-VVMtc2t1LzEyMw`. 2. **Plain Format**: The `{product}` segment is the tilde-separated string `content_language~feed_label~offer_id`. This format is suitable only when `content_language`, `feed_label`, and `offer_id` do not contain URL-problematic characters like `/`, `%`, or `~`. We recommend using the **Encoded Format** for all product IDs to ensure correct parsing, especially those containing special characters. The presence of tilde (`~`) characters in the `{product}` segment is used to differentiate between the two formats. Note: For calls to the v1beta version, the plain format is `channel~content_language~feed_label~offer_id`, for example: `accounts/123/products/online~en~US~sku123`. */
  name: string;
  /** Optional. The [IETF BCP-47](https://tools.ietf.org/html/bcp47) language code used to localize an issue resolution content. If not set, the result will be in default language `en-US`. */
  languageCode?: string;
  /** Request body */
  body?: RenderIssuesRequestPayload;
}

export const RenderproductissuesIssueresolutionRequest = Schema.Struct({
  timeZone: Schema.optional(Schema.String).pipe(T.HttpQuery("timeZone")),
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(RenderIssuesRequestPayload).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "issueresolution/v1/accounts/{accountsId}/products/{productsId}:renderproductissues", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenderproductissuesIssueresolutionRequest>;

export type RenderproductissuesIssueresolutionResponse = RenderProductIssuesResponse;
export const RenderproductissuesIssueresolutionResponse = RenderProductIssuesResponse;

export type RenderproductissuesIssueresolutionError = CommonErrors;

/** Provide a list of issues for business's product with an issue resolution content and available actions. This content and actions are meant to be rendered and shown in third-party applications. */
export const renderproductissuesIssueresolution: API.OperationMethod<RenderproductissuesIssueresolutionRequest, RenderproductissuesIssueresolutionResponse, RenderproductissuesIssueresolutionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenderproductissuesIssueresolutionRequest,
  output: RenderproductissuesIssueresolutionResponse,
  errors: [],
}));

export interface TriggeractionIssueresolutionRequest {
  /** Required. The business's account that is triggering the action. Format: `accounts/{account}` */
  name: string;
  /** Optional. Language code [IETF BCP 47 syntax](https://tools.ietf.org/html/bcp47) used to localize the response. If not set, the result will be in default language `en-US`. */
  languageCode?: string;
  /** Request body */
  body?: TriggerActionPayload;
}

export const TriggeractionIssueresolutionRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(TriggerActionPayload).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "issueresolution/v1/accounts/{accountsId}:triggeraction", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TriggeractionIssueresolutionRequest>;

export type TriggeractionIssueresolutionResponse = TriggerActionResponse;
export const TriggeractionIssueresolutionResponse = TriggerActionResponse;

export type TriggeractionIssueresolutionError = CommonErrors;

/** Start an action. The action can be requested by a business in third-party application. Before the business can request the action, the third-party application needs to show them action specific content and display a user input form. Access to the `triggeraction` method is restricted to an allowlist. You can request access using [Trigger action allowlist form](https://docs.google.com/forms/d/e/1FAIpQLSfeV_sBW9MBQv9BMTV6JZ1g11PGHLdHsrefca-9h0LmpU7CUg/viewform?usp=sharing). The action can be successfully started only once all `required` inputs are provided. If any `required` input is missing, or invalid value was provided, the service will return 400 error. Validation errors will contain Ids for all problematic field together with translated, human readable error messages that can be shown to the user. */
export const triggeractionIssueresolution: API.OperationMethod<TriggeractionIssueresolutionRequest, TriggeractionIssueresolutionResponse, TriggeractionIssueresolutionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TriggeractionIssueresolutionRequest,
  output: TriggeractionIssueresolutionResponse,
  errors: [],
}));

