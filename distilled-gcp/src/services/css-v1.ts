// ==========================================================================
// CSS API (css v1)
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
  name: "css",
  version: "v1",
  rootUrl: "https://css.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AccountLabel {
  /** Identifier. The resource name of the label. Format: accounts/{account}/labels/{label} */
  name?: string;
  /** Output only. The ID of the label. */
  labelId?: string;
  /** Output only. The ID of account this label belongs to. */
  accountId?: string;
  /** The display name of this label. */
  displayName?: string;
  /** The description of this label. */
  description?: string;
  /** Output only. The type of this label. */
  labelType?: "LABEL_TYPE_UNSPECIFIED" | "MANUAL" | "AUTOMATIC" | (string & {});
}

export const AccountLabel: Schema.Schema<AccountLabel> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  labelId: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labelType: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountLabel" }) as any as Schema.Schema<AccountLabel>;

export interface ListAccountLabelsResponse {
  /** The labels from the specified account. */
  accountLabels?: Array<AccountLabel>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAccountLabelsResponse: Schema.Schema<ListAccountLabelsResponse> = Schema.suspend(() => Schema.Struct({
  accountLabels: Schema.optional(Schema.Array(AccountLabel)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAccountLabelsResponse" }) as any as Schema.Schema<ListAccountLabelsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Account {
  /** The label resource name. Format: accounts/{account} */
  name?: string;
  /** Output only. Immutable. The CSS/MC account's full name. */
  fullName?: string;
  /** The CSS/MC account's short display name. */
  displayName?: string;
  /** Output only. Immutable. The CSS/MC account's homepage. */
  homepageUri?: string;
  /** The CSS/MC account's parent resource. CSS group for CSS domains; CSS domain for MC accounts. Returned only if the user has access to the parent account. Note: For MC sub-accounts, this is also the CSS domain that is the parent resource of the MCA account, since we are effectively flattening the hierarchy." */
  parent?: string;
  /** Manually created label IDs assigned to the CSS/MC account by a CSS parent account. */
  labelIds?: Array<string>;
  /** Automatically created label IDs assigned to the MC account by CSS Center. */
  automaticLabelIds?: Array<string>;
  /** Output only. The type of this account. */
  accountType?: "ACCOUNT_TYPE_UNSPECIFIED" | "CSS_GROUP" | "CSS_DOMAIN" | "MC_PRIMARY_CSS_MCA" | "MC_CSS_MCA" | "MC_MARKETPLACE_MCA" | "MC_OTHER_MCA" | "MC_STANDALONE" | "MC_MCA_SUBACCOUNT" | (string & {});
}

export const Account: Schema.Schema<Account> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  fullName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  homepageUri: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  labelIds: Schema.optional(Schema.Array(Schema.String)),
  automaticLabelIds: Schema.optional(Schema.Array(Schema.String)),
  accountType: Schema.optional(Schema.String),
})).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface ListChildAccountsResponse {
  /** The CSS/MC accounts returned for the specified CSS parent account. */
  accounts?: Array<Account>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListChildAccountsResponse: Schema.Schema<ListChildAccountsResponse> = Schema.suspend(() => Schema.Struct({
  accounts: Schema.optional(Schema.Array(Account)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListChildAccountsResponse" }) as any as Schema.Schema<ListChildAccountsResponse>;

export interface UpdateAccountLabelsRequest {
  /** The list of label IDs to overwrite the existing account label IDs. If the list is empty, all currently assigned label IDs will be deleted. */
  labelIds?: Array<string>;
  /** Optional. Only required when updating MC account labels. The CSS domain that is the parent resource of the MC account. Format: accounts/{account} */
  parent?: string;
}

export const UpdateAccountLabelsRequest: Schema.Schema<UpdateAccountLabelsRequest> = Schema.suspend(() => Schema.Struct({
  labelIds: Schema.optional(Schema.Array(Schema.String)),
  parent: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateAccountLabelsRequest" }) as any as Schema.Schema<UpdateAccountLabelsRequest>;

export interface Price {
  /** The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros). */
  amountMicros?: string;
  /** The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217). */
  currencyCode?: string;
}

export const Price: Schema.Schema<Price> = Schema.suspend(() => Schema.Struct({
  amountMicros: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "Price" }) as any as Schema.Schema<Price>;

export interface ProductDetail {
  /** The section header used to group a set of product details. */
  sectionName?: string;
  /** The name of the product detail. */
  attributeName?: string;
  /** The value of the product detail. */
  attributeValue?: string;
}

export const ProductDetail: Schema.Schema<ProductDetail> = Schema.suspend(() => Schema.Struct({
  sectionName: Schema.optional(Schema.String),
  attributeName: Schema.optional(Schema.String),
  attributeValue: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductDetail" }) as any as Schema.Schema<ProductDetail>;

export interface ProductWeight {
  /** Required. The weight represented as a number. The weight can have a maximum precision of four decimal places. */
  value?: number;
  /** Required. The weight unit. Acceptable values are: * "`g`" * "`kg`" * "`oz`" * "`lb`" */
  unit?: string;
}

export const ProductWeight: Schema.Schema<ProductWeight> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductWeight" }) as any as Schema.Schema<ProductWeight>;

export interface ProductDimension {
  /** Required. The dimension value represented as a number. The value can have a maximum precision of four decimal places. */
  value?: number;
  /** Required. The dimension units. Acceptable values are: * "`in`" * "`cm`" */
  unit?: string;
}

export const ProductDimension: Schema.Schema<ProductDimension> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductDimension" }) as any as Schema.Schema<ProductDimension>;

export interface Certification {
  /** The name of the certification. At this time, the most common value is "EPREL", which represents energy efficiency certifications in the EU European Registry for Energy Labeling (EPREL) database. */
  name?: string;
  /** The authority or certification body responsible for issuing the certification. At this time, the most common value is "EC" or “European_Commission” for energy labels in the EU. */
  authority?: string;
  /** The code of the certification. For example, for the EPREL certificate with the link https://eprel.ec.europa.eu/screen/product/dishwashers2019/123456 the code is 123456. The code is required for European Energy Labels. */
  code?: string;
}

export const Certification: Schema.Schema<Certification> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  authority: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "Certification" }) as any as Schema.Schema<Certification>;

export interface HeadlineOfferInstallment {
  /** The number of installments the buyer has to pay. */
  months?: string;
  /** The amount the buyer has to pay per month. */
  amount?: Price;
  /** The up-front down payment amount the buyer has to pay. */
  downpayment?: Price;
}

export const HeadlineOfferInstallment: Schema.Schema<HeadlineOfferInstallment> = Schema.suspend(() => Schema.Struct({
  months: Schema.optional(Schema.String),
  amount: Schema.optional(Price),
  downpayment: Schema.optional(Price),
})).annotate({ identifier: "HeadlineOfferInstallment" }) as any as Schema.Schema<HeadlineOfferInstallment>;

export interface HeadlineOfferSubscriptionCost {
  /** The type of subscription period. Supported values are: * "`month`" * "`year`" */
  period?: "SUBSCRIPTION_PERIOD_UNSPECIFIED" | "MONTH" | "YEAR" | (string & {});
  /** The number of subscription periods the buyer has to pay. */
  periodLength?: string;
  /** The amount the buyer has to pay per subscription period. */
  amount?: Price;
}

export const HeadlineOfferSubscriptionCost: Schema.Schema<HeadlineOfferSubscriptionCost> = Schema.suspend(() => Schema.Struct({
  period: Schema.optional(Schema.String),
  periodLength: Schema.optional(Schema.String),
  amount: Schema.optional(Price),
})).annotate({ identifier: "HeadlineOfferSubscriptionCost" }) as any as Schema.Schema<HeadlineOfferSubscriptionCost>;

export interface Attributes {
  /** URL directly linking to your the Product Detail Page of the CSS. */
  cppLink?: string;
  /** URL for the mobile-optimized version of the Product Detail Page of the CSS. */
  cppMobileLink?: string;
  /** Allows advertisers to override the item URL when the product is shown within the context of Product Ads. */
  cppAdsRedirect?: string;
  /** Low Price of the CSS Product. */
  lowPrice?: Price;
  /** High Price of the CSS Product. */
  highPrice?: Price;
  /** The number of CSS Products. */
  numberOfOffers?: string;
  /** Condition of the headline offer. */
  headlineOfferCondition?: string;
  /** Headline Price of the CSS Product. */
  headlineOfferPrice?: Price;
  /** Link to the headline offer. */
  headlineOfferLink?: string;
  /** Mobile Link to the headline offer. */
  headlineOfferMobileLink?: string;
  /** Headline Price of the CSS Product. */
  headlineOfferShippingPrice?: Price;
  /** Title of the item. */
  title?: string;
  /** URL of an image of the item. */
  imageLink?: string;
  /** Additional URL of images of the item. */
  additionalImageLinks?: Array<string>;
  /** Description of the item. */
  description?: string;
  /** Product Related Attributes.[14-36] Brand of the item. */
  brand?: string;
  /** Manufacturer Part Number ([MPN](https://support.google.com/merchants/answer/188494#mpn)) of the item. */
  mpn?: string;
  /** Global Trade Item Number ([GTIN](https://support.google.com/merchants/answer/188494#gtin)) of the item. */
  gtin?: string;
  /** Categories of the item (formatted as in [products data specification](https://support.google.com/merchants/answer/6324406)). */
  productTypes?: Array<string>;
  /** Google's category of the item (see [Google product taxonomy](https://support.google.com/merchants/answer/1705911)). When querying products, this field will contain the user provided value. There is currently no way to get back the auto assigned google product categories through the API. */
  googleProductCategory?: string;
  /** Set to true if the item is targeted towards adults. */
  adult?: boolean;
  /** The number of identical products in a merchant-defined multipack. */
  multipack?: string;
  /** Whether the item is a merchant-defined bundle. A bundle is a custom grouping of different products sold by a merchant for a single price. */
  isBundle?: boolean;
  /** Target age group of the item. */
  ageGroup?: string;
  /** Color of the item. */
  color?: string;
  /** Target gender of the item. */
  gender?: string;
  /** The material of which the item is made. */
  material?: string;
  /** The item's pattern (e.g. polka dots). */
  pattern?: string;
  /** Size of the item. Only one value is allowed. For variants with different sizes, insert a separate product for each size with the same `itemGroupId` value (see [https://support.google.com/merchants/answer/6324492](size definition)). */
  size?: string;
  /** System in which the size is specified. Recommended for apparel items. */
  sizeSystem?: string;
  /** The cut of the item. It can be used to represent combined size types for apparel items. Maximum two of size types can be provided (see [https://support.google.com/merchants/answer/6324497](size type)). */
  sizeTypes?: Array<string>;
  /** Shared identifier for all variants of the same product. */
  itemGroupId?: string;
  /** Technical specification or additional product details. */
  productDetails?: Array<ProductDetail>;
  /** The weight of the product in the units provided. The value must be between 0 (exclusive) and 2000 (inclusive). */
  productWeight?: ProductWeight;
  /** The length of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productLength?: ProductDimension;
  /** The width of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productWidth?: ProductDimension;
  /** The height of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productHeight?: ProductDimension;
  /** Bullet points describing the most relevant highlights of a product. */
  productHighlights?: Array<string>;
  /** A list of certificates claimed by the CSS for the given product. */
  certifications?: Array<Certification>;
  /** Date on which the item should expire, as specified upon insertion, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. The actual expiration date is exposed in `productstatuses` as [googleExpirationDate](https://support.google.com/merchants/answer/6324499) and might be earlier if `expirationDate` is too far in the future. Note: It may take 2+ days from the expiration date for the item to actually get deleted. */
  expirationDate?: string;
  /** The list of destinations to include for this target (corresponds to checked check boxes in Merchant Center). Default destinations are always included unless provided in `excludedDestinations`. */
  includedDestinations?: Array<string>;
  /** The list of destinations to exclude for this target (corresponds to unchecked check boxes in Merchant Center). */
  excludedDestinations?: Array<string>;
  /** Publication of this item will be temporarily paused. */
  pause?: string;
  /** Custom label 0 for custom grouping of items in a Shopping campaign. */
  customLabel0?: string;
  /** Custom label 1 for custom grouping of items in a Shopping campaign. */
  customLabel1?: string;
  /** Custom label 2 for custom grouping of items in a Shopping campaign. */
  customLabel2?: string;
  /** Custom label 3 for custom grouping of items in a Shopping campaign. */
  customLabel3?: string;
  /** Custom label 4 for custom grouping of items in a Shopping campaign. */
  customLabel4?: string;
  /** Number and amount of installments to pay for an item. */
  headlineOfferInstallment?: HeadlineOfferInstallment;
  /** Number of periods (months or years) and amount of payment per period for an item with an associated subscription contract. */
  headlineOfferSubscriptionCost?: HeadlineOfferSubscriptionCost;
}

export const Attributes: Schema.Schema<Attributes> = Schema.suspend(() => Schema.Struct({
  cppLink: Schema.optional(Schema.String),
  cppMobileLink: Schema.optional(Schema.String),
  cppAdsRedirect: Schema.optional(Schema.String),
  lowPrice: Schema.optional(Price),
  highPrice: Schema.optional(Price),
  numberOfOffers: Schema.optional(Schema.String),
  headlineOfferCondition: Schema.optional(Schema.String),
  headlineOfferPrice: Schema.optional(Price),
  headlineOfferLink: Schema.optional(Schema.String),
  headlineOfferMobileLink: Schema.optional(Schema.String),
  headlineOfferShippingPrice: Schema.optional(Price),
  title: Schema.optional(Schema.String),
  imageLink: Schema.optional(Schema.String),
  additionalImageLinks: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  mpn: Schema.optional(Schema.String),
  gtin: Schema.optional(Schema.String),
  productTypes: Schema.optional(Schema.Array(Schema.String)),
  googleProductCategory: Schema.optional(Schema.String),
  adult: Schema.optional(Schema.Boolean),
  multipack: Schema.optional(Schema.String),
  isBundle: Schema.optional(Schema.Boolean),
  ageGroup: Schema.optional(Schema.String),
  color: Schema.optional(Schema.String),
  gender: Schema.optional(Schema.String),
  material: Schema.optional(Schema.String),
  pattern: Schema.optional(Schema.String),
  size: Schema.optional(Schema.String),
  sizeSystem: Schema.optional(Schema.String),
  sizeTypes: Schema.optional(Schema.Array(Schema.String)),
  itemGroupId: Schema.optional(Schema.String),
  productDetails: Schema.optional(Schema.Array(ProductDetail)),
  productWeight: Schema.optional(ProductWeight),
  productLength: Schema.optional(ProductDimension),
  productWidth: Schema.optional(ProductDimension),
  productHeight: Schema.optional(ProductDimension),
  productHighlights: Schema.optional(Schema.Array(Schema.String)),
  certifications: Schema.optional(Schema.Array(Certification)),
  expirationDate: Schema.optional(Schema.String),
  includedDestinations: Schema.optional(Schema.Array(Schema.String)),
  excludedDestinations: Schema.optional(Schema.Array(Schema.String)),
  pause: Schema.optional(Schema.String),
  customLabel0: Schema.optional(Schema.String),
  customLabel1: Schema.optional(Schema.String),
  customLabel2: Schema.optional(Schema.String),
  customLabel3: Schema.optional(Schema.String),
  customLabel4: Schema.optional(Schema.String),
  headlineOfferInstallment: Schema.optional(HeadlineOfferInstallment),
  headlineOfferSubscriptionCost: Schema.optional(HeadlineOfferSubscriptionCost),
})).annotate({ identifier: "Attributes" }) as any as Schema.Schema<Attributes>;

export interface CustomAttribute {
  /** The name of the attribute. */
  name?: string;
  /** The value of the attribute. If `value` is not empty, `group_values` must be empty. */
  value?: string;
  /** Subattributes within this attribute group. If `group_values` is not empty, `value` must be empty. */
  groupValues?: Array<CustomAttribute>;
}

export const CustomAttribute: Schema.Schema<CustomAttribute> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  groupValues: Schema.optional(Schema.Array(CustomAttribute)),
})).annotate({ identifier: "CustomAttribute" }) as any as Schema.Schema<CustomAttribute>;

export interface CssProductInput {
  /** Identifier. The name of the CSS Product input. Format: `accounts/{account}/cssProductInputs/{css_product_input}`, where the last section `css_product_input` consists of 3 parts: contentLanguage~feedLabel~offerId. Example: accounts/123/cssProductInputs/de~DE~rawProvidedId123 */
  name?: string;
  /** Output only. The name of the processed CSS Product. Format: `accounts/{account}/cssProducts/{css_product}` " */
  finalName?: string;
  /** Required. Your unique identifier for the CSS Product. This is the same for the CSS Product input and processed CSS Product. We only allow ids with alphanumerics, underscores and dashes. See the [products feed specification](https://support.google.com/merchants/answer/188494#id) for details. */
  rawProvidedId?: string;
  /** Required. The two-letter [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code for the CSS Product. */
  contentLanguage?: string;
  /** Required. The [feed label](https://developers.google.com/shopping-content/guides/products/feed-labels) for the CSS Product. Feed Label is synonymous to "target country" and hence should always be a valid region code. For example: 'DE' for Germany, 'FR' for France. */
  feedLabel?: string;
  /** DEPRECATED. Use expiration_date instead. Represents the existing version (freshness) of the CSS Product, which can be used to preserve the right order when multiple updates are done at the same time. This field must not be set to the future time. If set, the update is prevented if a newer version of the item already exists in our system (that is the last update time of the existing CSS products is later than the freshness time set in the update). If the update happens, the last update time is then set to this freshness time. If not set, the update will not be prevented and the last update time will default to when this request was received by the CSS API. If the operation is prevented, the aborted exception will be thrown. */
  freshnessTime?: string;
  /** A list of CSS Product attributes. */
  attributes?: Attributes;
  /** A list of custom (CSS-provided) attributes. It can also be used for submitting any attribute of the feed specification in its generic form (for example: `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API, such as additional attributes used for Buy on Google. */
  customAttributes?: Array<CustomAttribute>;
}

export const CssProductInput: Schema.Schema<CssProductInput> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  finalName: Schema.optional(Schema.String),
  rawProvidedId: Schema.optional(Schema.String),
  contentLanguage: Schema.optional(Schema.String),
  feedLabel: Schema.optional(Schema.String),
  freshnessTime: Schema.optional(Schema.String),
  attributes: Schema.optional(Attributes),
  customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
})).annotate({ identifier: "CssProductInput" }) as any as Schema.Schema<CssProductInput>;

export interface DestinationStatus {
  /** The name of the destination */
  destination?: string;
  /** List of country codes (ISO 3166-1 alpha-2) where the CSS Product is approved. */
  approvedCountries?: Array<string>;
  /** List of country codes (ISO 3166-1 alpha-2) where the CSS Product is pending approval. */
  pendingCountries?: Array<string>;
  /** List of country codes (ISO 3166-1 alpha-2) where the CSS Product is disapproved. */
  disapprovedCountries?: Array<string>;
}

export const DestinationStatus: Schema.Schema<DestinationStatus> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Schema.String),
  approvedCountries: Schema.optional(Schema.Array(Schema.String)),
  pendingCountries: Schema.optional(Schema.Array(Schema.String)),
  disapprovedCountries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DestinationStatus" }) as any as Schema.Schema<DestinationStatus>;

export interface ItemLevelIssue {
  /** The error code of the issue. */
  code?: string;
  /** How this issue affects serving of the CSS Product. */
  servability?: string;
  /** Whether the issue can be resolved by the merchant. */
  resolution?: string;
  /** The attribute's name, if the issue is caused by a single attribute. */
  attribute?: string;
  /** The destination the issue applies to. */
  destination?: string;
  /** A short issue description in English. */
  description?: string;
  /** A detailed issue description in English. */
  detail?: string;
  /** The URL of a web page to help with resolving this issue. */
  documentation?: string;
  /** List of country codes (ISO 3166-1 alpha-2) where issue applies to the CSS Product. */
  applicableCountries?: Array<string>;
}

export const ItemLevelIssue: Schema.Schema<ItemLevelIssue> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  servability: Schema.optional(Schema.String),
  resolution: Schema.optional(Schema.String),
  attribute: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
  documentation: Schema.optional(Schema.String),
  applicableCountries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ItemLevelIssue" }) as any as Schema.Schema<ItemLevelIssue>;

export interface CssProductStatus {
  /** The intended destinations for the product. */
  destinationStatuses?: Array<DestinationStatus>;
  /** A list of all issues associated with the product. */
  itemLevelIssues?: Array<ItemLevelIssue>;
  /** Date on which the item has been created, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. */
  creationDate?: string;
  /** Date on which the item has been last updated, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. */
  lastUpdateDate?: string;
  /** Date on which the item expires, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. */
  googleExpirationDate?: string;
}

export const CssProductStatus: Schema.Schema<CssProductStatus> = Schema.suspend(() => Schema.Struct({
  destinationStatuses: Schema.optional(Schema.Array(DestinationStatus)),
  itemLevelIssues: Schema.optional(Schema.Array(ItemLevelIssue)),
  creationDate: Schema.optional(Schema.String),
  lastUpdateDate: Schema.optional(Schema.String),
  googleExpirationDate: Schema.optional(Schema.String),
})).annotate({ identifier: "CssProductStatus" }) as any as Schema.Schema<CssProductStatus>;

export interface CssProduct {
  /** The name of the CSS Product. Format: `"accounts/{account}/cssProducts/{css_product}"` */
  name?: string;
  /** Output only. Your unique raw identifier for the product. */
  rawProvidedId?: string;
  /** Output only. The two-letter [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code for the product. */
  contentLanguage?: string;
  /** Output only. The feed label for the product. */
  feedLabel?: string;
  /** Output only. A list of product attributes. */
  attributes?: Attributes;
  /** Output only. A list of custom (CSS-provided) attributes. It can also be used to submit any attribute of the feed specification in its generic form (for example, `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API, such as additional attributes used for Buy on Google. */
  customAttributes?: Array<CustomAttribute>;
  /** Output only. The status of a product, data validation issues, that is, information about a product computed asynchronously. */
  cssProductStatus?: CssProductStatus;
}

export const CssProduct: Schema.Schema<CssProduct> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  rawProvidedId: Schema.optional(Schema.String),
  contentLanguage: Schema.optional(Schema.String),
  feedLabel: Schema.optional(Schema.String),
  attributes: Schema.optional(Attributes),
  customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
  cssProductStatus: Schema.optional(CssProductStatus),
})).annotate({ identifier: "CssProduct" }) as any as Schema.Schema<CssProduct>;

export interface ListCssProductsResponse {
  /** The processed CSS products from the specified account. These are your processed CSS products after applying rules and supplemental feeds. */
  cssProducts?: Array<CssProduct>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCssProductsResponse: Schema.Schema<ListCssProductsResponse> = Schema.suspend(() => Schema.Struct({
  cssProducts: Schema.optional(Schema.Array(CssProduct)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCssProductsResponse" }) as any as Schema.Schema<ListCssProductsResponse>;

export interface MethodDetails {
  /** Output only. The name of the method for example `cssproductsservice.listcssproducts`. */
  method?: string;
  /** Output only. The API version that the method belongs to. */
  version?: string;
  /** Output only. The sub-API that the method belongs to. In the CSS API, this is always `css`. */
  subapi?: string;
  /** Output only. The path for the method such as `v1/cssproductsservice.listcssproducts`. */
  path?: string;
}

export const MethodDetails: Schema.Schema<MethodDetails> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  subapi: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "MethodDetails" }) as any as Schema.Schema<MethodDetails>;

export interface QuotaGroup {
  /** Identifier. The resource name of the quota group. Format: accounts/{account}/quotas/{group} Example: `accounts/12345678/quotas/css-products-insert` Note: The {group} part is not guaranteed to follow a specific pattern. */
  name?: string;
  /** Output only. The current quota usage, meaning the number of calls already made on a given day to the methods in the group. The daily quota limits reset at at 12:00 PM midday UTC. */
  quotaUsage?: string;
  /** Output only. The maximum number of calls allowed per day for the group. */
  quotaLimit?: string;
  /** Output only. The maximum number of calls allowed per minute for the group. */
  quotaMinuteLimit?: string;
  /** Output only. List of all methods group quota applies to. */
  methodDetails?: Array<MethodDetails>;
}

export const QuotaGroup: Schema.Schema<QuotaGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  quotaUsage: Schema.optional(Schema.String),
  quotaLimit: Schema.optional(Schema.String),
  quotaMinuteLimit: Schema.optional(Schema.String),
  methodDetails: Schema.optional(Schema.Array(MethodDetails)),
})).annotate({ identifier: "QuotaGroup" }) as any as Schema.Schema<QuotaGroup>;

export interface ListQuotaGroupsResponse {
  /** The methods, current quota usage and limits per each group. The quota is shared between all methods in the group. The groups are sorted in descending order based on quota_usage. */
  quotaGroups?: Array<QuotaGroup>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListQuotaGroupsResponse: Schema.Schema<ListQuotaGroupsResponse> = Schema.suspend(() => Schema.Struct({
  quotaGroups: Schema.optional(Schema.Array(QuotaGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListQuotaGroupsResponse" }) as any as Schema.Schema<ListQuotaGroupsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists all the accounts under the specified CSS account ID, and optionally filters by label ID and account name. */
export interface ListChildAccountsAccountsRequest {
  /** Required. The parent account. Must be a CSS group or domain. Format: accounts/{account} */
  parent: string;
  /** If set, only the MC accounts with the given label ID will be returned. */
  labelId?: string;
  /** If set, only the MC accounts with the given name (case sensitive) will be returned. */
  fullName?: string;
  /** Optional. The maximum number of accounts to return. The service may return fewer than this value. If unspecified, at most 50 accounts will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListChildAccounts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListChildAccounts` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListChildAccountsAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  labelId: Schema.optional(Schema.String).pipe(T.HttpQuery("labelId")),
  fullName: Schema.optional(Schema.String).pipe(T.HttpQuery("fullName")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}:listChildAccounts" }),
  svc,
) as unknown as Schema.Schema<ListChildAccountsAccountsRequest>;

export type ListChildAccountsAccountsResponse = ListChildAccountsResponse;
export const ListChildAccountsAccountsResponse = ListChildAccountsResponse;

export type ListChildAccountsAccountsError = CommonErrors;

export const listChildAccountsAccounts = API.makePaginated(() => ({
  input: ListChildAccountsAccountsRequest,
  output: ListChildAccountsAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a single CSS/MC account by ID. */
export interface GetAccountsRequest {
  /** Required. The name of the managed CSS/MC account. Format: accounts/{account} */
  name: string;
  /** Optional. Only required when retrieving MC account information. The CSS domain that is the parent resource of the MC account. Format: accounts/{account} */
  parent?: string;
}

export const GetAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = Account;
export const GetAccountsResponse = Account;

export type GetAccountsError = CommonErrors;

export const getAccounts: API.OperationMethod<GetAccountsRequest, GetAccountsResponse, GetAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

/** Updates labels assigned to CSS/MC accounts by a CSS domain. */
export interface UpdateLabelsAccountsRequest {
  /** Required. The label resource name. Format: accounts/{account} */
  name: string;
  /** Request body */
  body?: UpdateAccountLabelsRequest;
}

export const UpdateLabelsAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateAccountLabelsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}:updateLabels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateLabelsAccountsRequest>;

export type UpdateLabelsAccountsResponse = Account;
export const UpdateLabelsAccountsResponse = Account;

export type UpdateLabelsAccountsError = CommonErrors;

export const updateLabelsAccounts: API.OperationMethod<UpdateLabelsAccountsRequest, UpdateLabelsAccountsResponse, UpdateLabelsAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateLabelsAccountsRequest,
  output: UpdateLabelsAccountsResponse,
  errors: [],
}));

/** Lists the labels owned by an account. */
export interface ListAccountsLabelsRequest {
  /** Required. The parent account. Format: accounts/{account} */
  parent: string;
  /** The maximum number of labels to return. The service may return fewer than this value. If unspecified, at most 50 labels will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListAccountLabels` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccountLabels` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsLabelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/labels" }),
  svc,
) as unknown as Schema.Schema<ListAccountsLabelsRequest>;

export type ListAccountsLabelsResponse = ListAccountLabelsResponse;
export const ListAccountsLabelsResponse = ListAccountLabelsResponse;

export type ListAccountsLabelsError = CommonErrors;

export const listAccountsLabels = API.makePaginated(() => ({
  input: ListAccountsLabelsRequest,
  output: ListAccountsLabelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new label, not assigned to any account. */
export interface CreateAccountsLabelsRequest {
  /** Required. The parent account. Format: accounts/{account} */
  parent: string;
  /** Request body */
  body?: AccountLabel;
}

export const CreateAccountsLabelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AccountLabel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/labels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsLabelsRequest>;

export type CreateAccountsLabelsResponse = AccountLabel;
export const CreateAccountsLabelsResponse = AccountLabel;

export type CreateAccountsLabelsError = CommonErrors;

export const createAccountsLabels: API.OperationMethod<CreateAccountsLabelsRequest, CreateAccountsLabelsResponse, CreateAccountsLabelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsLabelsRequest,
  output: CreateAccountsLabelsResponse,
  errors: [],
}));

/** Updates a label. */
export interface PatchAccountsLabelsRequest {
  /** Identifier. The resource name of the label. Format: accounts/{account}/labels/{label} */
  name: string;
  /** Request body */
  body?: AccountLabel;
}

export const PatchAccountsLabelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AccountLabel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accounts/{accountsId}/labels/{labelsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsLabelsRequest>;

export type PatchAccountsLabelsResponse = AccountLabel;
export const PatchAccountsLabelsResponse = AccountLabel;

export type PatchAccountsLabelsError = CommonErrors;

export const patchAccountsLabels: API.OperationMethod<PatchAccountsLabelsRequest, PatchAccountsLabelsResponse, PatchAccountsLabelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsLabelsRequest,
  output: PatchAccountsLabelsResponse,
  errors: [],
}));

/** Deletes a label and removes it from all accounts to which it was assigned. */
export interface DeleteAccountsLabelsRequest {
  /** Required. The name of the label to delete. Format: accounts/{account}/labels/{label} */
  name: string;
}

export const DeleteAccountsLabelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accounts/{accountsId}/labels/{labelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsLabelsRequest>;

export type DeleteAccountsLabelsResponse = Empty;
export const DeleteAccountsLabelsResponse = Empty;

export type DeleteAccountsLabelsError = CommonErrors;

export const deleteAccountsLabels: API.OperationMethod<DeleteAccountsLabelsRequest, DeleteAccountsLabelsResponse, DeleteAccountsLabelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsLabelsRequest,
  output: DeleteAccountsLabelsResponse,
  errors: [],
}));

/** Uploads a CssProductInput to your CSS Center account. If an input with the same contentLanguage, identity, feedLabel and feedId already exists, this method replaces that entry. After inserting, updating, or deleting a CSS Product input, it may take several minutes before the processed CSS Product can be retrieved. */
export interface InsertAccountsCssProductInputsRequest {
  /** Required. The account where this CSS Product will be inserted. Format: accounts/{account} */
  parent: string;
  /** Optional. DEPRECATED. Feed id is not required for CSS Products. The primary or supplemental feed id. If CSS Product already exists and feed id provided is different, then the CSS Product will be moved to a new feed. Note: For now, CSSs do not need to provide feed ids as we create feeds on the fly. We do not have supplemental feed support for CSS Products yet. */
  feedId?: string;
  /** Request body */
  body?: CssProductInput;
}

export const InsertAccountsCssProductInputsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  feedId: Schema.optional(Schema.String).pipe(T.HttpQuery("feedId")),
  body: Schema.optional(CssProductInput).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/cssProductInputs:insert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertAccountsCssProductInputsRequest>;

export type InsertAccountsCssProductInputsResponse = CssProductInput;
export const InsertAccountsCssProductInputsResponse = CssProductInput;

export type InsertAccountsCssProductInputsError = CommonErrors;

export const insertAccountsCssProductInputs: API.OperationMethod<InsertAccountsCssProductInputsRequest, InsertAccountsCssProductInputsResponse, InsertAccountsCssProductInputsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertAccountsCssProductInputsRequest,
  output: InsertAccountsCssProductInputsResponse,
  errors: [],
}));

/** Updates the existing Css Product input in your CSS Center account. After inserting, updating, or deleting a CSS Product input, it may take several minutes before the processed Css Product can be retrieved. */
export interface PatchAccountsCssProductInputsRequest {
  /** Identifier. The name of the CSS Product input. Format: `accounts/{account}/cssProductInputs/{css_product_input}`, where the last section `css_product_input` consists of 3 parts: contentLanguage~feedLabel~offerId. Example: accounts/123/cssProductInputs/de~DE~rawProvidedId123 */
  name: string;
  /** The list of CSS product attributes to be updated. If the update mask is omitted, then it is treated as implied field mask equivalent to all fields that are populated (have a non-empty value). Attributes specified in the update mask without a value specified in the body will be deleted from the CSS product. Update mask can only be specified for top level fields in attributes and custom attributes. To specify the update mask for custom attributes you need to add the `custom_attribute.` prefix. Providing special "*" value for full CSS product replacement is not supported. */
  updateMask?: string;
  /** Request body */
  body?: CssProductInput;
}

export const PatchAccountsCssProductInputsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CssProductInput).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accounts/{accountsId}/cssProductInputs/{cssProductInputsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsCssProductInputsRequest>;

export type PatchAccountsCssProductInputsResponse = CssProductInput;
export const PatchAccountsCssProductInputsResponse = CssProductInput;

export type PatchAccountsCssProductInputsError = CommonErrors;

export const patchAccountsCssProductInputs: API.OperationMethod<PatchAccountsCssProductInputsRequest, PatchAccountsCssProductInputsResponse, PatchAccountsCssProductInputsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsCssProductInputsRequest,
  output: PatchAccountsCssProductInputsResponse,
  errors: [],
}));

/** Deletes a CSS Product input from your CSS Center account. After a delete it may take several minutes until the input is no longer available. */
export interface DeleteAccountsCssProductInputsRequest {
  /** Required. The name of the CSS product input resource to delete. Format: accounts/{account}/cssProductInputs/{css_product_input}, where the last section `css_product_input` consists of 3 parts: contentLanguage~feedLabel~offerId. Example: accounts/123/cssProductInputs/de~DE~rawProvidedId123 */
  name: string;
  /** The Content API Supplemental Feed ID. The field must not be set if the action applies to a primary feed. If the field is set, then product action applies to a supplemental feed instead of primary Content API feed. */
  supplementalFeedId?: string;
}

export const DeleteAccountsCssProductInputsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  supplementalFeedId: Schema.optional(Schema.String).pipe(T.HttpQuery("supplementalFeedId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accounts/{accountsId}/cssProductInputs/{cssProductInputsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsCssProductInputsRequest>;

export type DeleteAccountsCssProductInputsResponse = Empty;
export const DeleteAccountsCssProductInputsResponse = Empty;

export type DeleteAccountsCssProductInputsError = CommonErrors;

export const deleteAccountsCssProductInputs: API.OperationMethod<DeleteAccountsCssProductInputsRequest, DeleteAccountsCssProductInputsResponse, DeleteAccountsCssProductInputsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsCssProductInputsRequest,
  output: DeleteAccountsCssProductInputsResponse,
  errors: [],
}));

/** Retrieves the processed CSS Product from your CSS Center account. After inserting, updating, or deleting a product input, it may take several minutes before the updated final product can be retrieved. */
export interface GetAccountsCssProductsRequest {
  /** Required. The name of the CSS product to retrieve. Format: `accounts/{account}/cssProducts/{css_product}` */
  name: string;
}

export const GetAccountsCssProductsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/cssProducts/{cssProductsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsCssProductsRequest>;

export type GetAccountsCssProductsResponse = CssProduct;
export const GetAccountsCssProductsResponse = CssProduct;

export type GetAccountsCssProductsError = CommonErrors;

export const getAccountsCssProducts: API.OperationMethod<GetAccountsCssProductsRequest, GetAccountsCssProductsResponse, GetAccountsCssProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsCssProductsRequest,
  output: GetAccountsCssProductsResponse,
  errors: [],
}));

/** Lists the processed CSS Products in your CSS Center account. The response might contain fewer items than specified by pageSize. Rely on pageToken to determine if there are more items to be requested. After inserting, updating, or deleting a CSS product input, it may take several minutes before the updated processed CSS product can be retrieved. */
export interface ListAccountsCssProductsRequest {
  /** Required. The account/domain to list processed CSS Products for. Format: accounts/{account} */
  parent: string;
  /** The maximum number of CSS Products to return. The service may return fewer than this value. The maximum value is 1000; values above 1000 will be coerced to 1000. If unspecified, the maximum number of CSS products will be returned. */
  pageSize?: number;
  /** A page token, received from a previous `ListCssProducts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCssProducts` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsCssProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/cssProducts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsCssProductsRequest>;

export type ListAccountsCssProductsResponse = ListCssProductsResponse;
export const ListAccountsCssProductsResponse = ListCssProductsResponse;

export type ListAccountsCssProductsError = CommonErrors;

export const listAccountsCssProducts = API.makePaginated(() => ({
  input: ListAccountsCssProductsRequest,
  output: ListAccountsCssProductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the daily call quota and usage per group for your CSS Center account. */
export interface ListAccountsQuotasRequest {
  /** Required. The CSS account that owns the collection of method quotas and resources. In most cases, this is the CSS domain. Format: accounts/{account} */
  parent: string;
  /** Optional. The maximum number of quotas to return in the response, used for paging. Defaults to 500; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Token (if provided) to retrieve the subsequent page. All other parameters must match the original call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsQuotasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/quotas" }),
  svc,
) as unknown as Schema.Schema<ListAccountsQuotasRequest>;

export type ListAccountsQuotasResponse = ListQuotaGroupsResponse;
export const ListAccountsQuotasResponse = ListQuotaGroupsResponse;

export type ListAccountsQuotasError = CommonErrors;

export const listAccountsQuotas = API.makePaginated(() => ({
  input: ListAccountsQuotasRequest,
  output: ListAccountsQuotasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

