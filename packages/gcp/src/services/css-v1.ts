// ==========================================================================
// CSS API (css v1)
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
  name: "css",
  version: "v1",
  rootUrl: "https://css.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface UpdateAccountLabelsRequest {
  /** Optional. Only required when updating MC account labels. The CSS domain that is the parent resource of the MC account. Format: accounts/{account} */
  parent?: string;
  /** The list of label IDs to overwrite the existing account label IDs. If the list is empty, all currently assigned label IDs will be deleted. */
  labelIds?: Array<string>;
}

export const UpdateAccountLabelsRequest: Schema.Schema<UpdateAccountLabelsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parent: Schema.optional(Schema.String),
      labelIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "UpdateAccountLabelsRequest",
  }) as any as Schema.Schema<UpdateAccountLabelsRequest>;

export interface CustomAttribute {
  /** The value of the attribute. If `value` is not empty, `group_values` must be empty. */
  value?: string;
  /** Subattributes within this attribute group. If `group_values` is not empty, `value` must be empty. */
  groupValues?: Array<CustomAttribute>;
  /** The name of the attribute. */
  name?: string;
}

export const CustomAttribute: Schema.Schema<CustomAttribute> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      groupValues: Schema.optional(Schema.Array(CustomAttribute)),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomAttribute",
  }) as any as Schema.Schema<CustomAttribute>;

export interface MethodDetails {
  /** Output only. The name of the method for example `cssproductsservice.listcssproducts`. */
  method?: string;
  /** Output only. The sub-API that the method belongs to. In the CSS API, this is always `css`. */
  subapi?: string;
  /** Output only. The API version that the method belongs to. */
  version?: string;
  /** Output only. The path for the method such as `v1/cssproductsservice.listcssproducts`. */
  path?: string;
}

export const MethodDetails: Schema.Schema<MethodDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      method: Schema.optional(Schema.String),
      subapi: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MethodDetails",
  }) as any as Schema.Schema<MethodDetails>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface Price {
  /** The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros). */
  amountMicros?: string;
  /** The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217). */
  currencyCode?: string;
}

export const Price: Schema.Schema<Price> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      amountMicros: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Price" }) as any as Schema.Schema<Price>;

export interface Account {
  /** Output only. The type of this account. */
  accountType?:
    | "ACCOUNT_TYPE_UNSPECIFIED"
    | "CSS_GROUP"
    | "CSS_DOMAIN"
    | "MC_PRIMARY_CSS_MCA"
    | "MC_CSS_MCA"
    | "MC_MARKETPLACE_MCA"
    | "MC_OTHER_MCA"
    | "MC_STANDALONE"
    | "MC_MCA_SUBACCOUNT"
    | (string & {});
  /** The label resource name. Format: accounts/{account} */
  name?: string;
  /** The CSS/MC account's parent resource. CSS group for CSS domains; CSS domain for MC accounts. Returned only if the user has access to the parent account. Note: For MC sub-accounts, this is also the CSS domain that is the parent resource of the MCA account, since we are effectively flattening the hierarchy." */
  parent?: string;
  /** Output only. Immutable. The CSS/MC account's homepage. */
  homepageUri?: string;
  /** Manually created label IDs assigned to the CSS/MC account by a CSS parent account. */
  labelIds?: Array<string>;
  /** Automatically created label IDs assigned to the MC account by CSS Center. */
  automaticLabelIds?: Array<string>;
  /** Output only. Immutable. The CSS/MC account's full name. */
  fullName?: string;
  /** The CSS/MC account's short display name. */
  displayName?: string;
}

export const Account: Schema.Schema<Account> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountType: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      parent: Schema.optional(Schema.String),
      homepageUri: Schema.optional(Schema.String),
      labelIds: Schema.optional(Schema.Array(Schema.String)),
      automaticLabelIds: Schema.optional(Schema.Array(Schema.String)),
      fullName: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface ListChildAccountsResponse {
  /** The CSS/MC accounts returned for the specified CSS parent account. */
  accounts?: Array<Account>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListChildAccountsResponse: Schema.Schema<ListChildAccountsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accounts: Schema.optional(Schema.Array(Account)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListChildAccountsResponse",
  }) as any as Schema.Schema<ListChildAccountsResponse>;

export interface QuotaGroup {
  /** Output only. The maximum number of calls allowed per day for the group. */
  quotaLimit?: string;
  /** Output only. The current quota usage, meaning the number of calls already made on a given day to the methods in the group. The daily quota limits reset at at 12:00 PM midday UTC. */
  quotaUsage?: string;
  /** Output only. List of all methods group quota applies to. */
  methodDetails?: Array<MethodDetails>;
  /** Identifier. The resource name of the quota group. Format: accounts/{account}/quotas/{group} Example: `accounts/12345678/quotas/css-products-insert` Note: The {group} part is not guaranteed to follow a specific pattern. */
  name?: string;
  /** Output only. The maximum number of calls allowed per minute for the group. */
  quotaMinuteLimit?: string;
}

export const QuotaGroup: Schema.Schema<QuotaGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      quotaLimit: Schema.optional(Schema.String),
      quotaUsage: Schema.optional(Schema.String),
      methodDetails: Schema.optional(Schema.Array(MethodDetails)),
      name: Schema.optional(Schema.String),
      quotaMinuteLimit: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "QuotaGroup" }) as any as Schema.Schema<QuotaGroup>;

export interface ListQuotaGroupsResponse {
  /** The methods, current quota usage and limits per each group. The quota is shared between all methods in the group. The groups are sorted in descending order based on quota_usage. */
  quotaGroups?: Array<QuotaGroup>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListQuotaGroupsResponse: Schema.Schema<ListQuotaGroupsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      quotaGroups: Schema.optional(Schema.Array(QuotaGroup)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListQuotaGroupsResponse",
  }) as any as Schema.Schema<ListQuotaGroupsResponse>;

export interface AccountLabel {
  /** The description of this label. */
  description?: string;
  /** Output only. The ID of account this label belongs to. */
  accountId?: string;
  /** The display name of this label. */
  displayName?: string;
  /** Output only. The ID of the label. */
  labelId?: string;
  /** Identifier. The resource name of the label. Format: accounts/{account}/labels/{label} */
  name?: string;
  /** Output only. The type of this label. */
  labelType?: "LABEL_TYPE_UNSPECIFIED" | "MANUAL" | "AUTOMATIC" | (string & {});
}

export const AccountLabel: Schema.Schema<AccountLabel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      labelId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      labelType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccountLabel",
  }) as any as Schema.Schema<AccountLabel>;

export interface HeadlineOfferInstallment {
  /** The number of installments the buyer has to pay. */
  months?: string;
  /** The up-front down payment amount the buyer has to pay. */
  downpayment?: Price;
  /** The amount the buyer has to pay per month. */
  amount?: Price;
}

export const HeadlineOfferInstallment: Schema.Schema<HeadlineOfferInstallment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      months: Schema.optional(Schema.String),
      downpayment: Schema.optional(Price),
      amount: Schema.optional(Price),
    }),
  ).annotate({
    identifier: "HeadlineOfferInstallment",
  }) as any as Schema.Schema<HeadlineOfferInstallment>;

export interface HeadlineOfferSubscriptionCost {
  /** The type of subscription period. Supported values are: * "`month`" * "`year`" */
  period?: "SUBSCRIPTION_PERIOD_UNSPECIFIED" | "MONTH" | "YEAR" | (string & {});
  /** The amount the buyer has to pay per subscription period. */
  amount?: Price;
  /** The number of subscription periods the buyer has to pay. */
  periodLength?: string;
}

export const HeadlineOfferSubscriptionCost: Schema.Schema<HeadlineOfferSubscriptionCost> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      period: Schema.optional(Schema.String),
      amount: Schema.optional(Price),
      periodLength: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "HeadlineOfferSubscriptionCost",
  }) as any as Schema.Schema<HeadlineOfferSubscriptionCost>;

export interface ProductDimension {
  /** Required. The dimension value represented as a number. The value can have a maximum precision of four decimal places. */
  value?: number;
  /** Required. The dimension units. Acceptable values are: * "`in`" * "`cm`" */
  unit?: string;
}

export const ProductDimension: Schema.Schema<ProductDimension> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.Number),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductDimension",
  }) as any as Schema.Schema<ProductDimension>;

export interface ProductWeight {
  /** Required. The weight represented as a number. The weight can have a maximum precision of four decimal places. */
  value?: number;
  /** Required. The weight unit. Acceptable values are: * "`g`" * "`kg`" * "`oz`" * "`lb`" */
  unit?: string;
}

export const ProductWeight: Schema.Schema<ProductWeight> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.Number),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductWeight",
  }) as any as Schema.Schema<ProductWeight>;

export interface Certification {
  /** The name of the certification. At this time, the most common value is "EPREL", which represents energy efficiency certifications in the EU European Registry for Energy Labeling (EPREL) database. */
  name?: string;
  /** The code of the certification. For example, for the EPREL certificate with the link https://eprel.ec.europa.eu/screen/product/dishwashers2019/123456 the code is 123456. The code is required for European Energy Labels. */
  code?: string;
  /** The authority or certification body responsible for issuing the certification. At this time, the most common value is "EC" or “European_Commission” for energy labels in the EU. */
  authority?: string;
}

export const Certification: Schema.Schema<Certification> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      authority: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Certification",
  }) as any as Schema.Schema<Certification>;

export interface ProductDetail {
  /** The section header used to group a set of product details. */
  sectionName?: string;
  /** The value of the product detail. */
  attributeValue?: string;
  /** The name of the product detail. */
  attributeName?: string;
}

export const ProductDetail: Schema.Schema<ProductDetail> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sectionName: Schema.optional(Schema.String),
      attributeValue: Schema.optional(Schema.String),
      attributeName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductDetail",
  }) as any as Schema.Schema<ProductDetail>;

export interface Attributes {
  /** Target gender of the item. */
  gender?: string;
  /** Target age group of the item. */
  ageGroup?: string;
  /** Number and amount of installments to pay for an item. */
  headlineOfferInstallment?: HeadlineOfferInstallment;
  /** Number of periods (months or years) and amount of payment per period for an item with an associated subscription contract. */
  headlineOfferSubscriptionCost?: HeadlineOfferSubscriptionCost;
  /** Publication of this item will be temporarily paused. */
  pause?: string;
  /** Title of the item. */
  title?: string;
  /** Whether the item is a merchant-defined bundle. A bundle is a custom grouping of different products sold by a merchant for a single price. */
  isBundle?: boolean;
  /** The cut of the item. It can be used to represent combined size types for apparel items. Maximum two of size types can be provided (see [size type](https://support.google.com/merchants/answer/6324497). */
  sizeTypes?: Array<string>;
  /** System in which the size is specified. Recommended for apparel items. */
  sizeSystem?: string;
  /** Low Price of the CSS Product. */
  lowPrice?: Price;
  /** The height of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productHeight?: ProductDimension;
  /** The weight of the product in the units provided. The value must be between 0 (exclusive) and 2000 (inclusive). */
  productWeight?: ProductWeight;
  /** Average rating score of the product. The value must be within the range of [`min_rating`, `max_rating`], inclusive. When displayed on the product page, this rating is normalized to a scale of [1, 5] with one decimal place. If provided, `review_count`, `min_rating`, and `max_rating` are also required. This field is for an upcoming feature and is not yet used. */
  rating?: number;
  /** Additional URL of images of the item. */
  additionalImageLinks?: Array<string>;
  /** The item's pattern (e.g. polka dots). */
  pattern?: string;
  /** Product Related Attributes.[14-36] Brand of the item. */
  brand?: string;
  /** Number of reviews of the product. Required if `rating` is provided. This field is for an upcoming feature and is not yet used. */
  reviewCount?: string;
  /** Allows advertisers to override the item URL when the product is shown within the context of Product Ads. */
  cppAdsRedirect?: string;
  /** Custom label 0 for custom grouping of items in a Shopping campaign. */
  customLabel0?: string;
  /** A list of certificates claimed by the CSS for the given product. */
  certifications?: Array<Certification>;
  /** Custom label 4 for custom grouping of items in a Shopping campaign. */
  customLabel4?: string;
  /** Condition of the headline offer. */
  headlineOfferCondition?: string;
  /** URL directly linking to your the Product Detail Page of the CSS. */
  cppLink?: string;
  /** Headline Price of the CSS Product. */
  headlineOfferShippingPrice?: Price;
  /** Custom label 3 for custom grouping of items in a Shopping campaign. */
  customLabel3?: string;
  /** Global Trade Item Number ([GTIN](https://support.google.com/merchants/answer/188494#gtin)) of the item. */
  gtin?: string;
  /** Headline Price of the CSS Product. */
  headlineOfferPrice?: Price;
  /** Size of the item. Only one value is allowed. For variants with different sizes, insert a separate product for each size with the same `itemGroupId` value (see [https://support.google.com/merchants/answer/6324492](size definition)). */
  size?: string;
  /** The number of identical products in a merchant-defined multipack. */
  multipack?: string;
  /** Maximum rating score of the product. Required if `rating` is provided. This field is for an upcoming feature and is not yet used. */
  maxRating?: string;
  /** Mobile Link to the headline offer. */
  headlineOfferMobileLink?: string;
  /** The list of destinations to include for this target (corresponds to checked check boxes in Merchant Center). Default destinations are always included unless provided in `excludedDestinations`. */
  includedDestinations?: Array<string>;
  /** The number of CSS Products. */
  numberOfOffers?: string;
  /** Set to true if the item is targeted towards adults. */
  adult?: boolean;
  /** Bullet points describing the most relevant highlights of a product. */
  productHighlights?: Array<string>;
  /** URL of an image of the item. */
  imageLink?: string;
  /** Categories of the item (formatted as in [products data specification](https://support.google.com/merchants/answer/6324406)). */
  productTypes?: Array<string>;
  /** Description of the item. */
  description?: string;
  /** The list of destinations to exclude for this target (corresponds to unchecked check boxes in Merchant Center). */
  excludedDestinations?: Array<string>;
  /** Manufacturer Part Number ([MPN](https://support.google.com/merchants/answer/188494#mpn)) of the item. */
  mpn?: string;
  /** URL for the mobile-optimized version of the Product Detail Page of the CSS. */
  cppMobileLink?: string;
  /** High Price of the CSS Product. */
  highPrice?: Price;
  /** Shared identifier for all variants of the same product. */
  itemGroupId?: string;
  /** Google's category of the item (see [Google product taxonomy](https://support.google.com/merchants/answer/1705911)). When querying products, this field will contain the user provided value. There is currently no way to get back the auto assigned google product categories through the API. */
  googleProductCategory?: string;
  /** Date on which the item should expire, as specified upon insertion, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. The actual expiration date is exposed in `productstatuses` as [googleExpirationDate](https://support.google.com/merchants/answer/6324499) and might be earlier if `expirationDate` is too far in the future. Note: It may take 2+ days from the expiration date for the item to actually get deleted. */
  expirationDate?: string;
  /** Minimum rating score of the product. Required if `rating` is provided. This field is for an upcoming feature and is not yet used. */
  minRating?: string;
  /** Color of the item. */
  color?: string;
  /** Custom label 2 for custom grouping of items in a Shopping campaign. */
  customLabel2?: string;
  /** The length of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productLength?: ProductDimension;
  /** Custom label 1 for custom grouping of items in a Shopping campaign. */
  customLabel1?: string;
  /** Link to the headline offer. */
  headlineOfferLink?: string;
  /** Technical specification or additional product details. */
  productDetails?: Array<ProductDetail>;
  /** The width of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive). */
  productWidth?: ProductDimension;
  /** The material of which the item is made. */
  material?: string;
}

export const Attributes: Schema.Schema<Attributes> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gender: Schema.optional(Schema.String),
      ageGroup: Schema.optional(Schema.String),
      headlineOfferInstallment: Schema.optional(HeadlineOfferInstallment),
      headlineOfferSubscriptionCost: Schema.optional(
        HeadlineOfferSubscriptionCost,
      ),
      pause: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      isBundle: Schema.optional(Schema.Boolean),
      sizeTypes: Schema.optional(Schema.Array(Schema.String)),
      sizeSystem: Schema.optional(Schema.String),
      lowPrice: Schema.optional(Price),
      productHeight: Schema.optional(ProductDimension),
      productWeight: Schema.optional(ProductWeight),
      rating: Schema.optional(Schema.Number),
      additionalImageLinks: Schema.optional(Schema.Array(Schema.String)),
      pattern: Schema.optional(Schema.String),
      brand: Schema.optional(Schema.String),
      reviewCount: Schema.optional(Schema.String),
      cppAdsRedirect: Schema.optional(Schema.String),
      customLabel0: Schema.optional(Schema.String),
      certifications: Schema.optional(Schema.Array(Certification)),
      customLabel4: Schema.optional(Schema.String),
      headlineOfferCondition: Schema.optional(Schema.String),
      cppLink: Schema.optional(Schema.String),
      headlineOfferShippingPrice: Schema.optional(Price),
      customLabel3: Schema.optional(Schema.String),
      gtin: Schema.optional(Schema.String),
      headlineOfferPrice: Schema.optional(Price),
      size: Schema.optional(Schema.String),
      multipack: Schema.optional(Schema.String),
      maxRating: Schema.optional(Schema.String),
      headlineOfferMobileLink: Schema.optional(Schema.String),
      includedDestinations: Schema.optional(Schema.Array(Schema.String)),
      numberOfOffers: Schema.optional(Schema.String),
      adult: Schema.optional(Schema.Boolean),
      productHighlights: Schema.optional(Schema.Array(Schema.String)),
      imageLink: Schema.optional(Schema.String),
      productTypes: Schema.optional(Schema.Array(Schema.String)),
      description: Schema.optional(Schema.String),
      excludedDestinations: Schema.optional(Schema.Array(Schema.String)),
      mpn: Schema.optional(Schema.String),
      cppMobileLink: Schema.optional(Schema.String),
      highPrice: Schema.optional(Price),
      itemGroupId: Schema.optional(Schema.String),
      googleProductCategory: Schema.optional(Schema.String),
      expirationDate: Schema.optional(Schema.String),
      minRating: Schema.optional(Schema.String),
      color: Schema.optional(Schema.String),
      customLabel2: Schema.optional(Schema.String),
      productLength: Schema.optional(ProductDimension),
      customLabel1: Schema.optional(Schema.String),
      headlineOfferLink: Schema.optional(Schema.String),
      productDetails: Schema.optional(Schema.Array(ProductDetail)),
      productWidth: Schema.optional(ProductDimension),
      material: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Attributes" }) as any as Schema.Schema<Attributes>;

export interface CssProductInput {
  /** Identifier. The name of the CSS Product input. Format: `accounts/{account}/cssProductInputs/{css_product_input}`, where the last section `css_product_input` consists of 3 parts: contentLanguage~feedLabel~offerId. Example: accounts/123/cssProductInputs/de~DE~rawProvidedId123 */
  name?: string;
  /** Required. The [feed label](https://developers.google.com/shopping-content/guides/products/feed-labels) for the CSS Product. Feed Label is synonymous to "target country" and hence should always be a valid region code. For example: 'DE' for Germany, 'FR' for France. */
  feedLabel?: string;
  /** A list of CSS Product attributes. */
  attributes?: Attributes;
  /** Output only. The name of the processed CSS Product. Format: `accounts/{account}/cssProducts/{css_product}` " */
  finalName?: string;
  /** Required. The two-letter [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code for the CSS Product. */
  contentLanguage?: string;
  /** DEPRECATED. Use expiration_date instead. Represents the existing version (freshness) of the CSS Product, which can be used to preserve the right order when multiple updates are done at the same time. This field must not be set to the future time. If set, the update is prevented if a newer version of the item already exists in our system (that is the last update time of the existing CSS products is later than the freshness time set in the update). If the update happens, the last update time is then set to this freshness time. If not set, the update will not be prevented and the last update time will default to when this request was received by the CSS API. If the operation is prevented, the aborted exception will be thrown. */
  freshnessTime?: string;
  /** Required. Your unique identifier for the CSS Product. This is the same for the CSS Product input and processed CSS Product. We only allow ids with alphanumerics, underscores and dashes. See the [products feed specification](https://support.google.com/merchants/answer/188494#id) for details. */
  rawProvidedId?: string;
  /** A list of custom (CSS-provided) attributes. It can also be used for submitting any attribute of the feed specification in its generic form (for example: `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API, such as additional attributes used for Buy on Google. */
  customAttributes?: Array<CustomAttribute>;
}

export const CssProductInput: Schema.Schema<CssProductInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      feedLabel: Schema.optional(Schema.String),
      attributes: Schema.optional(Attributes),
      finalName: Schema.optional(Schema.String),
      contentLanguage: Schema.optional(Schema.String),
      freshnessTime: Schema.optional(Schema.String),
      rawProvidedId: Schema.optional(Schema.String),
      customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
    }),
  ).annotate({
    identifier: "CssProductInput",
  }) as any as Schema.Schema<CssProductInput>;

export interface DestinationStatus {
  /** The name of the destination */
  destination?: string;
  /** List of country codes (ISO 3166-1 alpha-2) where the CSS Product is approved. */
  approvedCountries?: Array<string>;
  /** List of country codes (ISO 3166-1 alpha-2) where the CSS Product is disapproved. */
  disapprovedCountries?: Array<string>;
  /** List of country codes (ISO 3166-1 alpha-2) where the CSS Product is pending approval. */
  pendingCountries?: Array<string>;
}

export const DestinationStatus: Schema.Schema<DestinationStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      destination: Schema.optional(Schema.String),
      approvedCountries: Schema.optional(Schema.Array(Schema.String)),
      disapprovedCountries: Schema.optional(Schema.Array(Schema.String)),
      pendingCountries: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "DestinationStatus",
  }) as any as Schema.Schema<DestinationStatus>;

export interface ItemLevelIssue {
  /** A short issue description in English. */
  description?: string;
  /** The error code of the issue. */
  code?: string;
  /** A detailed issue description in English. */
  detail?: string;
  /** List of country codes (ISO 3166-1 alpha-2) where issue applies to the CSS Product. */
  applicableCountries?: Array<string>;
  /** The URL of a web page to help with resolving this issue. */
  documentation?: string;
  /** The destination the issue applies to. */
  destination?: string;
  /** The attribute's name, if the issue is caused by a single attribute. */
  attribute?: string;
  /** Whether the issue can be resolved by the merchant. */
  resolution?: string;
  /** How this issue affects serving of the CSS Product. */
  servability?: string;
}

export const ItemLevelIssue: Schema.Schema<ItemLevelIssue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
      applicableCountries: Schema.optional(Schema.Array(Schema.String)),
      documentation: Schema.optional(Schema.String),
      destination: Schema.optional(Schema.String),
      attribute: Schema.optional(Schema.String),
      resolution: Schema.optional(Schema.String),
      servability: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ItemLevelIssue",
  }) as any as Schema.Schema<ItemLevelIssue>;

export interface CssProductStatus {
  /** Date on which the item expires, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. */
  googleExpirationDate?: string;
  /** The intended destinations for the product. */
  destinationStatuses?: Array<DestinationStatus>;
  /** Date on which the item has been created, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. */
  creationDate?: string;
  /** Date on which the item has been last updated, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. */
  lastUpdateDate?: string;
  /** A list of all issues associated with the product. */
  itemLevelIssues?: Array<ItemLevelIssue>;
}

export const CssProductStatus: Schema.Schema<CssProductStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      googleExpirationDate: Schema.optional(Schema.String),
      destinationStatuses: Schema.optional(Schema.Array(DestinationStatus)),
      creationDate: Schema.optional(Schema.String),
      lastUpdateDate: Schema.optional(Schema.String),
      itemLevelIssues: Schema.optional(Schema.Array(ItemLevelIssue)),
    }),
  ).annotate({
    identifier: "CssProductStatus",
  }) as any as Schema.Schema<CssProductStatus>;

export interface CssProduct {
  /** Output only. Your unique raw identifier for the product. */
  rawProvidedId?: string;
  /** Output only. A list of custom (CSS-provided) attributes. It can also be used to submit any attribute of the feed specification in its generic form (for example, `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API, such as additional attributes used for Buy on Google. */
  customAttributes?: Array<CustomAttribute>;
  /** Output only. The two-letter [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code for the product. */
  contentLanguage?: string;
  /** Output only. The status of a product, data validation issues, that is, information about a product computed asynchronously. */
  cssProductStatus?: CssProductStatus;
  /** Output only. The feed label for the product. */
  feedLabel?: string;
  /** Output only. A list of product attributes. */
  attributes?: Attributes;
  /** The name of the CSS Product. Format: `"accounts/{account}/cssProducts/{css_product}"` */
  name?: string;
}

export const CssProduct: Schema.Schema<CssProduct> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rawProvidedId: Schema.optional(Schema.String),
      customAttributes: Schema.optional(Schema.Array(CustomAttribute)),
      contentLanguage: Schema.optional(Schema.String),
      cssProductStatus: Schema.optional(CssProductStatus),
      feedLabel: Schema.optional(Schema.String),
      attributes: Schema.optional(Attributes),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "CssProduct" }) as any as Schema.Schema<CssProduct>;

export interface ListCssProductsResponse {
  /** The processed CSS products from the specified account. These are your processed CSS products after applying rules and supplemental feeds. */
  cssProducts?: Array<CssProduct>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCssProductsResponse: Schema.Schema<ListCssProductsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cssProducts: Schema.optional(Schema.Array(CssProduct)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCssProductsResponse",
  }) as any as Schema.Schema<ListCssProductsResponse>;

export interface ListAccountLabelsResponse {
  /** The labels from the specified account. */
  accountLabels?: Array<AccountLabel>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAccountLabelsResponse: Schema.Schema<ListAccountLabelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accountLabels: Schema.optional(Schema.Array(AccountLabel)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAccountLabelsResponse",
  }) as any as Schema.Schema<ListAccountLabelsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListChildAccountsAccountsRequest {
  /** Optional. The maximum number of accounts to return. The service may return fewer than this value. If unspecified, at most 50 accounts will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** If set, only the MC accounts with the given label ID will be returned. */
  labelId?: string;
  /** Required. The parent account. Must be a CSS group or domain. Format: accounts/{account} */
  parent: string;
  /** Optional. A page token, received from a previous `ListChildAccounts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListChildAccounts` must match the call that provided the page token. */
  pageToken?: string;
  /** If set, only the MC accounts with the given name (case sensitive) will be returned. */
  fullName?: string;
}

export const ListChildAccountsAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    labelId: Schema.optional(Schema.String).pipe(T.HttpQuery("labelId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    fullName: Schema.optional(Schema.String).pipe(T.HttpQuery("fullName")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/accounts/{accountsId}:listChildAccounts",
    }),
    svc,
  ) as unknown as Schema.Schema<ListChildAccountsAccountsRequest>;

export type ListChildAccountsAccountsResponse = ListChildAccountsResponse;
export const ListChildAccountsAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListChildAccountsResponse;

export type ListChildAccountsAccountsError = DefaultErrors;

/** Lists all the accounts under the specified CSS account ID, and optionally filters by label ID and account name. */
export const listChildAccountsAccounts: API.PaginatedOperationMethod<
  ListChildAccountsAccountsRequest,
  ListChildAccountsAccountsResponse,
  ListChildAccountsAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListChildAccountsAccountsRequest,
  output: ListChildAccountsAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAccountsRequest {
  /** Required. The name of the managed CSS/MC account. Format: accounts/{account} */
  name: string;
  /** Optional. Only required when retrieving MC account information. The CSS domain that is the parent resource of the MC account. Format: accounts/{account} */
  parent?: string;
}

export const GetAccountsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = Account;
export const GetAccountsResponse = /*@__PURE__*/ /*#__PURE__*/ Account;

export type GetAccountsError = DefaultErrors;

/** Retrieves a single CSS/MC account by ID. */
export const getAccounts: API.OperationMethod<
  GetAccountsRequest,
  GetAccountsResponse,
  GetAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

export interface UpdateLabelsAccountsRequest {
  /** Required. The label resource name. Format: accounts/{account} */
  name: string;
  /** Request body */
  body?: UpdateAccountLabelsRequest;
}

export const UpdateLabelsAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UpdateAccountLabelsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/accounts/{accountsId}:updateLabels",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateLabelsAccountsRequest>;

export type UpdateLabelsAccountsResponse = Account;
export const UpdateLabelsAccountsResponse = /*@__PURE__*/ /*#__PURE__*/ Account;

export type UpdateLabelsAccountsError = DefaultErrors;

/** Updates labels assigned to CSS/MC accounts by a CSS domain. */
export const updateLabelsAccounts: API.OperationMethod<
  UpdateLabelsAccountsRequest,
  UpdateLabelsAccountsResponse,
  UpdateLabelsAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLabelsAccountsRequest,
  output: UpdateLabelsAccountsResponse,
  errors: [],
}));

export interface ListAccountsLabelsRequest {
  /** Required. The parent account. Format: accounts/{account} */
  parent: string;
  /** A page token, received from a previous `ListAccountLabels` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccountLabels` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of labels to return. The service may return fewer than this value. If unspecified, at most 50 labels will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListAccountsLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/accounts/{accountsId}/labels" }),
    svc,
  ) as unknown as Schema.Schema<ListAccountsLabelsRequest>;

export type ListAccountsLabelsResponse = ListAccountLabelsResponse;
export const ListAccountsLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAccountLabelsResponse;

export type ListAccountsLabelsError = DefaultErrors;

/** Lists the labels owned by an account. */
export const listAccountsLabels: API.PaginatedOperationMethod<
  ListAccountsLabelsRequest,
  ListAccountsLabelsResponse,
  ListAccountsLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsLabelsRequest,
  output: ListAccountsLabelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateAccountsLabelsRequest {
  /** Required. The parent account. Format: accounts/{account} */
  parent: string;
  /** Request body */
  body?: AccountLabel;
}

export const CreateAccountsLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(AccountLabel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/accounts/{accountsId}/labels",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAccountsLabelsRequest>;

export type CreateAccountsLabelsResponse = AccountLabel;
export const CreateAccountsLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountLabel;

export type CreateAccountsLabelsError = DefaultErrors;

/** Creates a new label, not assigned to any account. */
export const createAccountsLabels: API.OperationMethod<
  CreateAccountsLabelsRequest,
  CreateAccountsLabelsResponse,
  CreateAccountsLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAccountsLabelsRequest,
  output: CreateAccountsLabelsResponse,
  errors: [],
}));

export interface DeleteAccountsLabelsRequest {
  /** Required. The name of the label to delete. Format: accounts/{account}/labels/{label} */
  name: string;
}

export const DeleteAccountsLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/accounts/{accountsId}/labels/{labelsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAccountsLabelsRequest>;

export type DeleteAccountsLabelsResponse = Empty;
export const DeleteAccountsLabelsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAccountsLabelsError = DefaultErrors;

/** Deletes a label and removes it from all accounts to which it was assigned. */
export const deleteAccountsLabels: API.OperationMethod<
  DeleteAccountsLabelsRequest,
  DeleteAccountsLabelsResponse,
  DeleteAccountsLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAccountsLabelsRequest,
  output: DeleteAccountsLabelsResponse,
  errors: [],
}));

export interface PatchAccountsLabelsRequest {
  /** Identifier. The resource name of the label. Format: accounts/{account}/labels/{label} */
  name: string;
  /** Request body */
  body?: AccountLabel;
}

export const PatchAccountsLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(AccountLabel).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/accounts/{accountsId}/labels/{labelsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAccountsLabelsRequest>;

export type PatchAccountsLabelsResponse = AccountLabel;
export const PatchAccountsLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AccountLabel;

export type PatchAccountsLabelsError = DefaultErrors;

/** Updates a label. */
export const patchAccountsLabels: API.OperationMethod<
  PatchAccountsLabelsRequest,
  PatchAccountsLabelsResponse,
  PatchAccountsLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAccountsLabelsRequest,
  output: PatchAccountsLabelsResponse,
  errors: [],
}));

export interface ListAccountsQuotasRequest {
  /** Optional. The maximum number of quotas to return in the response, used for paging. Defaults to 500; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The CSS account that owns the collection of method quotas and resources. In most cases, this is the CSS domain. Format: accounts/{account} */
  parent: string;
  /** Optional. Token (if provided) to retrieve the subsequent page. All other parameters must match the original call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsQuotasRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/accounts/{accountsId}/quotas" }),
    svc,
  ) as unknown as Schema.Schema<ListAccountsQuotasRequest>;

export type ListAccountsQuotasResponse = ListQuotaGroupsResponse;
export const ListAccountsQuotasResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListQuotaGroupsResponse;

export type ListAccountsQuotasError = DefaultErrors;

/** Lists the daily call quota and usage per group for your CSS Center account. */
export const listAccountsQuotas: API.PaginatedOperationMethod<
  ListAccountsQuotasRequest,
  ListAccountsQuotasResponse,
  ListAccountsQuotasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsQuotasRequest,
  output: ListAccountsQuotasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface InsertAccountsCssProductInputsRequest {
  /** Required. The account where this CSS Product will be inserted. Format: accounts/{account} */
  parent: string;
  /** Optional. DEPRECATED. Feed id is not required for CSS Products. The primary or supplemental feed id. If CSS Product already exists and feed id provided is different, then the CSS Product will be moved to a new feed. Note: For now, CSSs do not need to provide feed ids as we create feeds on the fly. We do not have supplemental feed support for CSS Products yet. */
  feedId?: string;
  /** Request body */
  body?: CssProductInput;
}

export const InsertAccountsCssProductInputsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    feedId: Schema.optional(Schema.String).pipe(T.HttpQuery("feedId")),
    body: Schema.optional(CssProductInput).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/accounts/{accountsId}/cssProductInputs:insert",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertAccountsCssProductInputsRequest>;

export type InsertAccountsCssProductInputsResponse = CssProductInput;
export const InsertAccountsCssProductInputsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CssProductInput;

export type InsertAccountsCssProductInputsError = DefaultErrors;

/** Uploads a CssProductInput to your CSS Center account. If an input with the same contentLanguage, identity, feedLabel and feedId already exists, this method replaces that entry. After inserting, updating, or deleting a CSS Product input, it may take several minutes before the processed CSS Product can be retrieved. */
export const insertAccountsCssProductInputs: API.OperationMethod<
  InsertAccountsCssProductInputsRequest,
  InsertAccountsCssProductInputsResponse,
  InsertAccountsCssProductInputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertAccountsCssProductInputsRequest,
  output: InsertAccountsCssProductInputsResponse,
  errors: [],
}));

export interface DeleteAccountsCssProductInputsRequest {
  /** The Content API Supplemental Feed ID. The field must not be set if the action applies to a primary feed. If the field is set, then product action applies to a supplemental feed instead of primary Content API feed. */
  supplementalFeedId?: string;
  /** Required. The name of the CSS product input resource to delete. Format: accounts/{account}/cssProductInputs/{css_product_input}, where the last section `css_product_input` consists of 3 parts: contentLanguage~feedLabel~offerId. Example: accounts/123/cssProductInputs/de~DE~rawProvidedId123 */
  name: string;
}

export const DeleteAccountsCssProductInputsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supplementalFeedId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("supplementalFeedId"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/accounts/{accountsId}/cssProductInputs/{cssProductInputsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAccountsCssProductInputsRequest>;

export type DeleteAccountsCssProductInputsResponse = Empty;
export const DeleteAccountsCssProductInputsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAccountsCssProductInputsError = DefaultErrors;

/** Deletes a CSS Product input from your CSS Center account. After a delete it may take several minutes until the input is no longer available. */
export const deleteAccountsCssProductInputs: API.OperationMethod<
  DeleteAccountsCssProductInputsRequest,
  DeleteAccountsCssProductInputsResponse,
  DeleteAccountsCssProductInputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAccountsCssProductInputsRequest,
  output: DeleteAccountsCssProductInputsResponse,
  errors: [],
}));

export interface PatchAccountsCssProductInputsRequest {
  /** Identifier. The name of the CSS Product input. Format: `accounts/{account}/cssProductInputs/{css_product_input}`, where the last section `css_product_input` consists of 3 parts: contentLanguage~feedLabel~offerId. Example: accounts/123/cssProductInputs/de~DE~rawProvidedId123 */
  name: string;
  /** The list of CSS product attributes to be updated. If the update mask is omitted, then it is treated as implied field mask equivalent to all fields that are populated (have a non-empty value). Attributes specified in the update mask without a value specified in the body will be deleted from the CSS product. Update mask can only be specified for top level fields in attributes and custom attributes. To specify the update mask for custom attributes you need to add the `custom_attribute.` prefix. Providing special "*" value for full CSS product replacement is not supported. */
  updateMask?: string;
  /** Request body */
  body?: CssProductInput;
}

export const PatchAccountsCssProductInputsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(CssProductInput).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/accounts/{accountsId}/cssProductInputs/{cssProductInputsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAccountsCssProductInputsRequest>;

export type PatchAccountsCssProductInputsResponse = CssProductInput;
export const PatchAccountsCssProductInputsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CssProductInput;

export type PatchAccountsCssProductInputsError = DefaultErrors;

/** Updates the existing Css Product input in your CSS Center account. After inserting, updating, or deleting a CSS Product input, it may take several minutes before the processed Css Product can be retrieved. */
export const patchAccountsCssProductInputs: API.OperationMethod<
  PatchAccountsCssProductInputsRequest,
  PatchAccountsCssProductInputsResponse,
  PatchAccountsCssProductInputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAccountsCssProductInputsRequest,
  output: PatchAccountsCssProductInputsResponse,
  errors: [],
}));

export interface GetAccountsCssProductsRequest {
  /** Required. The name of the CSS product to retrieve. Format: `accounts/{account}/cssProducts/{css_product}` */
  name: string;
}

export const GetAccountsCssProductsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/accounts/{accountsId}/cssProducts/{cssProductsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAccountsCssProductsRequest>;

export type GetAccountsCssProductsResponse = CssProduct;
export const GetAccountsCssProductsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CssProduct;

export type GetAccountsCssProductsError = DefaultErrors;

/** Retrieves the processed CSS Product from your CSS Center account. After inserting, updating, or deleting a product input, it may take several minutes before the updated final product can be retrieved. */
export const getAccountsCssProducts: API.OperationMethod<
  GetAccountsCssProductsRequest,
  GetAccountsCssProductsResponse,
  GetAccountsCssProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccountsCssProductsRequest,
  output: GetAccountsCssProductsResponse,
  errors: [],
}));

export interface ListAccountsCssProductsRequest {
  /** Required. The account/domain to list processed CSS Products for. Format: accounts/{account} */
  parent: string;
  /** A page token, received from a previous `ListCssProducts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCssProducts` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of CSS Products to return. The service may return fewer than this value. The maximum value is 1000; values above 1000 will be coerced to 1000. If unspecified, the maximum number of CSS products will be returned. */
  pageSize?: number;
}

export const ListAccountsCssProductsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/accounts/{accountsId}/cssProducts" }),
    svc,
  ) as unknown as Schema.Schema<ListAccountsCssProductsRequest>;

export type ListAccountsCssProductsResponse = ListCssProductsResponse;
export const ListAccountsCssProductsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCssProductsResponse;

export type ListAccountsCssProductsError = DefaultErrors;

/** Lists the processed CSS Products in your CSS Center account. The response might contain fewer items than specified by pageSize. Rely on pageToken to determine if there are more items to be requested. After inserting, updating, or deleting a CSS product input, it may take several minutes before the updated processed CSS product can be retrieved. */
export const listAccountsCssProducts: API.PaginatedOperationMethod<
  ListAccountsCssProductsRequest,
  ListAccountsCssProductsResponse,
  ListAccountsCssProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsCssProductsRequest,
  output: ListAccountsCssProductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
