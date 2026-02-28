// ==========================================================================
// Manufacturer Center API (manufacturers v1)
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
  name: "manufacturers",
  version: "v1",
  rootUrl: "https://manufacturers.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Image {
  /** The type of the image, i.e., crawled or uploaded. @OutputOnly */
  type?: "TYPE_UNSPECIFIED" | "CRAWLED" | "UPLOADED" | (string & {});
  /** The status of the image. @OutputOnly */
  status?: "STATUS_UNSPECIFIED" | "PENDING_PROCESSING" | "PENDING_CRAWL" | "OK" | "ROBOTED" | "XROBOTED" | "CRAWL_ERROR" | "PROCESSING_ERROR" | "DECODING_ERROR" | "TOO_BIG" | "CRAWL_SKIPPED" | "HOSTLOADED" | "HTTP_404" | (string & {});
  /** The URL of the image. For crawled images, this is the provided URL. For uploaded images, this is a serving URL from Google if the image has been processed successfully. */
  imageUrl?: string;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  imageUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface FeatureDescription {
  /** A short description of the feature. */
  headline?: string;
  /** A detailed description of the feature. */
  text?: string;
  /** An optional image describing the feature. */
  image?: Image;
}

export const FeatureDescription: Schema.Schema<FeatureDescription> = Schema.suspend(() => Schema.Struct({
  headline: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  image: Schema.optional(Image),
})).annotate({ identifier: "FeatureDescription" }) as any as Schema.Schema<FeatureDescription>;

export interface Price {
  /** The numeric value of the price. */
  amount?: string;
  /** The currency in which the price is denoted. */
  currency?: string;
}

export const Price: Schema.Schema<Price> = Schema.suspend(() => Schema.Struct({
  amount: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
})).annotate({ identifier: "Price" }) as any as Schema.Schema<Price>;

export interface ProductDetail {
  /** A short section name that can be reused between multiple product details. */
  sectionName?: string;
  /** The name of the attribute. */
  attributeName?: string;
  /** The value of the attribute. */
  attributeValue?: string;
}

export const ProductDetail: Schema.Schema<ProductDetail> = Schema.suspend(() => Schema.Struct({
  sectionName: Schema.optional(Schema.String),
  attributeName: Schema.optional(Schema.String),
  attributeValue: Schema.optional(Schema.String),
})).annotate({ identifier: "ProductDetail" }) as any as Schema.Schema<ProductDetail>;

export interface Capacity {
  /** The numeric value of the capacity. */
  value?: string;
  /** The unit of the capacity, i.e., MB, GB, or TB. */
  unit?: string;
}

export const Capacity: Schema.Schema<Capacity> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "Capacity" }) as any as Schema.Schema<Capacity>;

export interface Count {
  /** The numeric value of the number of products in a package. */
  value?: string;
  /** The unit in which these products are counted. */
  unit?: string;
}

export const Count: Schema.Schema<Count> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "Count" }) as any as Schema.Schema<Count>;

export interface FloatUnit {
  /** amount. */
  amount?: number;
  /** unit. */
  unit?: string;
}

export const FloatUnit: Schema.Schema<FloatUnit> = Schema.suspend(() => Schema.Struct({
  amount: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "FloatUnit" }) as any as Schema.Schema<FloatUnit>;

export interface VoluntaryNutritionFact {
  /** Name. */
  name?: string;
  /** Value. */
  value?: FloatUnit;
  /** Daily percentage. */
  dailyPercentage?: number;
}

export const VoluntaryNutritionFact: Schema.Schema<VoluntaryNutritionFact> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(FloatUnit),
  dailyPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "VoluntaryNutritionFact" }) as any as Schema.Schema<VoluntaryNutritionFact>;

export interface Nutrition {
  /** Food Serving Size. Serving size description. */
  servingSizeDescription?: string;
  /** Servings per container. */
  servingsPerContainer?: string;
  /** Serving size measure. */
  servingSizeMeasure?: FloatUnit;
  /** Prepared size description. */
  preparedSizeDescription?: string;
  /** Nutrition fact measure. */
  nutritionFactMeasure?: string;
  /** Mandatory Nutrition Facts. Energy. */
  energy?: FloatUnit;
  /** Energy from fat. */
  energyFromFat?: FloatUnit;
  /** Total fat. */
  totalFat?: FloatUnit;
  /** Total fat daily percentage. */
  totalFatDailyPercentage?: number;
  /** Saturated fat. */
  saturatedFat?: FloatUnit;
  /** Saturated fat daily percentage. */
  saturatedFatDailyPercentage?: number;
  /** Monounsaturated fat. */
  monounsaturatedFat?: FloatUnit;
  /** Polyunsaturated fat. */
  polyunsaturatedFat?: FloatUnit;
  /** Trans fat. */
  transFat?: FloatUnit;
  /** Trans fat daily percentage. */
  transFatDailyPercentage?: number;
  /** Cholesterol. */
  cholesterol?: FloatUnit;
  /** Cholesterol daily percentage. */
  cholesterolDailyPercentage?: number;
  /** Sodium. */
  sodium?: FloatUnit;
  /** Sodium daily percentage. */
  sodiumDailyPercentage?: number;
  /** Total carbohydrate. */
  totalCarbohydrate?: FloatUnit;
  /** Total carbohydrate daily percentage. */
  totalCarbohydrateDailyPercentage?: number;
  /** Dietary fiber. */
  dietaryFiber?: FloatUnit;
  /** Dietary fiber daily percentage. */
  dietaryFiberDailyPercentage?: number;
  /** Total sugars. */
  totalSugars?: FloatUnit;
  /** Total sugars daily percentage. */
  totalSugarsDailyPercentage?: number;
  /** Added sugars. */
  addedSugars?: FloatUnit;
  /** Added sugars daily percentage. */
  addedSugarsDailyPercentage?: number;
  /** Protein. */
  protein?: FloatUnit;
  /** Protein daily percentage. */
  proteinDailyPercentage?: number;
  /** Polyols. */
  polyols?: FloatUnit;
  /** Starch. */
  starch?: FloatUnit;
  /** Vitamin D. */
  vitaminD?: FloatUnit;
  /** Vitamin D daily percentage. */
  vitaminDDailyPercentage?: number;
  /** Calcium. */
  calcium?: FloatUnit;
  /** Calcium daily percentage. */
  calciumDailyPercentage?: number;
  /** Iron. */
  iron?: FloatUnit;
  /** Iron daily percentage. */
  ironDailyPercentage?: number;
  /** Potassium. */
  potassium?: FloatUnit;
  /** Potassium daily percentage. */
  potassiumDailyPercentage?: number;
  /** Folate mcg DFE. */
  folateMcgDfe?: number;
  /** Folate daily percentage. */
  folateDailyPercentage?: number;
  /** Folate folic acid. */
  folateFolicAcid?: FloatUnit;
  /** Voluntary nutrition fact. */
  voluntaryNutritionFact?: Array<VoluntaryNutritionFact>;
}

export const Nutrition: Schema.Schema<Nutrition> = Schema.suspend(() => Schema.Struct({
  servingSizeDescription: Schema.optional(Schema.String),
  servingsPerContainer: Schema.optional(Schema.String),
  servingSizeMeasure: Schema.optional(FloatUnit),
  preparedSizeDescription: Schema.optional(Schema.String),
  nutritionFactMeasure: Schema.optional(Schema.String),
  energy: Schema.optional(FloatUnit),
  energyFromFat: Schema.optional(FloatUnit),
  totalFat: Schema.optional(FloatUnit),
  totalFatDailyPercentage: Schema.optional(Schema.Number),
  saturatedFat: Schema.optional(FloatUnit),
  saturatedFatDailyPercentage: Schema.optional(Schema.Number),
  monounsaturatedFat: Schema.optional(FloatUnit),
  polyunsaturatedFat: Schema.optional(FloatUnit),
  transFat: Schema.optional(FloatUnit),
  transFatDailyPercentage: Schema.optional(Schema.Number),
  cholesterol: Schema.optional(FloatUnit),
  cholesterolDailyPercentage: Schema.optional(Schema.Number),
  sodium: Schema.optional(FloatUnit),
  sodiumDailyPercentage: Schema.optional(Schema.Number),
  totalCarbohydrate: Schema.optional(FloatUnit),
  totalCarbohydrateDailyPercentage: Schema.optional(Schema.Number),
  dietaryFiber: Schema.optional(FloatUnit),
  dietaryFiberDailyPercentage: Schema.optional(Schema.Number),
  totalSugars: Schema.optional(FloatUnit),
  totalSugarsDailyPercentage: Schema.optional(Schema.Number),
  addedSugars: Schema.optional(FloatUnit),
  addedSugarsDailyPercentage: Schema.optional(Schema.Number),
  protein: Schema.optional(FloatUnit),
  proteinDailyPercentage: Schema.optional(Schema.Number),
  polyols: Schema.optional(FloatUnit),
  starch: Schema.optional(FloatUnit),
  vitaminD: Schema.optional(FloatUnit),
  vitaminDDailyPercentage: Schema.optional(Schema.Number),
  calcium: Schema.optional(FloatUnit),
  calciumDailyPercentage: Schema.optional(Schema.Number),
  iron: Schema.optional(FloatUnit),
  ironDailyPercentage: Schema.optional(Schema.Number),
  potassium: Schema.optional(FloatUnit),
  potassiumDailyPercentage: Schema.optional(Schema.Number),
  folateMcgDfe: Schema.optional(Schema.Number),
  folateDailyPercentage: Schema.optional(Schema.Number),
  folateFolicAcid: Schema.optional(FloatUnit),
  voluntaryNutritionFact: Schema.optional(Schema.Array(VoluntaryNutritionFact)),
})).annotate({ identifier: "Nutrition" }) as any as Schema.Schema<Nutrition>;

export interface Grocery {
  /** Ingredients. */
  ingredients?: string;
  /** Active ingredients. */
  activeIngredients?: string;
  /** Allergens. */
  allergens?: string;
  /** Directions. */
  directions?: string;
  /** Storage instructions. */
  storageInstructions?: string;
  /** Indications. */
  indications?: string;
  /** Nutrition claim. */
  nutritionClaim?: Array<string>;
  /** Derived nutrition claim. */
  derivedNutritionClaim?: Array<string>;
  /** Alcohol by volume. */
  alcoholByVolume?: number;
}

export const Grocery: Schema.Schema<Grocery> = Schema.suspend(() => Schema.Struct({
  ingredients: Schema.optional(Schema.String),
  activeIngredients: Schema.optional(Schema.String),
  allergens: Schema.optional(Schema.String),
  directions: Schema.optional(Schema.String),
  storageInstructions: Schema.optional(Schema.String),
  indications: Schema.optional(Schema.String),
  nutritionClaim: Schema.optional(Schema.Array(Schema.String)),
  derivedNutritionClaim: Schema.optional(Schema.Array(Schema.String)),
  alcoholByVolume: Schema.optional(Schema.Number),
})).annotate({ identifier: "Grocery" }) as any as Schema.Schema<Grocery>;

export interface GoogleShoppingManufacturersV1ProductCertification {
  /** Required. Name of the certification. */
  name?: string;
  /** Required. Name of the certification body. */
  authority?: string;
  /** Optional. A unique code to identify the certification. */
  code?: string;
  /** Optional. A custom value of the certification. */
  value?: string;
  /** Optional. A URL link to the certification. */
  link?: string;
  /** Optional. A URL link to the certification logo. */
  logo?: string;
  /** Optional. The expiration date (UTC). */
  validUntil?: string;
}

export const GoogleShoppingManufacturersV1ProductCertification: Schema.Schema<GoogleShoppingManufacturersV1ProductCertification> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  authority: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  link: Schema.optional(Schema.String),
  logo: Schema.optional(Schema.String),
  validUntil: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleShoppingManufacturersV1ProductCertification" }) as any as Schema.Schema<GoogleShoppingManufacturersV1ProductCertification>;

export interface Attributes {
  /** The Global Trade Item Number (GTIN) of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#gtin. */
  gtin?: Array<string>;
  /** The Manufacturer Part Number (MPN) of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#mpn. */
  mpn?: string;
  /** The title of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#title. */
  title?: string;
  /** The brand name of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#brand. */
  brand?: string;
  /** The canonical name of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productname. */
  productName?: string;
  /** The name of the group of products related to the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productline. */
  productLine?: string;
  /** The type or category of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#producttype. */
  productType?: Array<string>;
  /** The description of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#description. */
  description?: string;
  /** The rich format description of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#featuredesc. */
  featureDescription?: Array<FeatureDescription>;
  /** The image of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#image. */
  imageLink?: Image;
  /** The additional images of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#addlimage. */
  additionalImageLink?: Array<Image>;
  /** The videos of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#video. */
  videoLink?: Array<string>;
  /** The URL of the detail page of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productpage. */
  productPageUrl?: string;
  /** The disclosure date of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#disclosure. */
  disclosureDate?: string;
  /** The release date of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#release. */
  releaseDate?: string;
  /** The suggested retail price (MSRP) of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#price. */
  suggestedRetailPrice?: Price;
  /** The details of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productdetail. */
  productDetail?: Array<ProductDetail>;
  /** The item group id of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#itemgroupid. */
  itemGroupId?: string;
  /** The scent of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#scent. */
  scent?: string;
  /** The flavor of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#flavor. */
  flavor?: string;
  /** The format of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#format. */
  format?: string;
  /** The capacity of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#capacity. */
  capacity?: Capacity;
  /** The target gender of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#gender. */
  gender?: string;
  /** The target age group of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#agegroup. */
  ageGroup?: string;
  /** The size of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#size. */
  size?: string;
  /** The size type of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#sizetype. */
  sizeType?: Array<string>;
  /** The size system of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#sizesystem. */
  sizeSystem?: string;
  /** The color of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#color. */
  color?: string;
  /** The theme of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#theme. */
  theme?: string;
  /** The pattern of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#pattern. */
  pattern?: string;
  /** The material of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#material. */
  material?: string;
  /** The count of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#count. */
  count?: Count;
  /** The target client id. Should only be used in the accounts of the data partners. For more information, see https://support.google.com/manufacturers/answer/10857344 */
  targetClientId?: string;
  /** A list of excluded destinations such as "ClientExport", "ClientShoppingCatalog" or "PartnerShoppingCatalog". For more information, see https://support.google.com/manufacturers/answer/7443550 */
  excludedDestination?: Array<string>;
  /** A list of included destinations such as "ClientExport", "ClientShoppingCatalog" or "PartnerShoppingCatalog". For more information, see https://support.google.com/manufacturers/answer/7443550 */
  includedDestination?: Array<string>;
  /** The product highlights. For more information, see https://support.google.com/manufacturers/answer/10066942 */
  productHighlight?: Array<string>;
  /** Rich product content. For more information, see https://support.google.com/manufacturers/answer/9389865 */
  richProductContent?: Array<string>;
  /** Nutrition Attributes. See more at https://support.google.com/manufacturers/answer/12098458#food-servings. */
  nutrition?: Nutrition;
  /** Grocery Attributes. See more at https://support.google.com/manufacturers/answer/12098458#grocery. */
  grocery?: Grocery;
  /** Virtual Model (3d) asset link. */
  virtualModelLink?: string;
  /** Optional. List of certifications claimed by this product. */
  certification?: Array<GoogleShoppingManufacturersV1ProductCertification>;
  /** Optional. List of countries to show this product in. Countries provided in this attribute will override any of the countries configured at feed level. The values should be: the [CLDR territory code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) of the countries in which this item will be shown. */
  intendedCountry?: Array<string>;
}

export const Attributes: Schema.Schema<Attributes> = Schema.suspend(() => Schema.Struct({
  gtin: Schema.optional(Schema.Array(Schema.String)),
  mpn: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  productName: Schema.optional(Schema.String),
  productLine: Schema.optional(Schema.String),
  productType: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  featureDescription: Schema.optional(Schema.Array(FeatureDescription)),
  imageLink: Schema.optional(Image),
  additionalImageLink: Schema.optional(Schema.Array(Image)),
  videoLink: Schema.optional(Schema.Array(Schema.String)),
  productPageUrl: Schema.optional(Schema.String),
  disclosureDate: Schema.optional(Schema.String),
  releaseDate: Schema.optional(Schema.String),
  suggestedRetailPrice: Schema.optional(Price),
  productDetail: Schema.optional(Schema.Array(ProductDetail)),
  itemGroupId: Schema.optional(Schema.String),
  scent: Schema.optional(Schema.String),
  flavor: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
  capacity: Schema.optional(Capacity),
  gender: Schema.optional(Schema.String),
  ageGroup: Schema.optional(Schema.String),
  size: Schema.optional(Schema.String),
  sizeType: Schema.optional(Schema.Array(Schema.String)),
  sizeSystem: Schema.optional(Schema.String),
  color: Schema.optional(Schema.String),
  theme: Schema.optional(Schema.String),
  pattern: Schema.optional(Schema.String),
  material: Schema.optional(Schema.String),
  count: Schema.optional(Count),
  targetClientId: Schema.optional(Schema.String),
  excludedDestination: Schema.optional(Schema.Array(Schema.String)),
  includedDestination: Schema.optional(Schema.Array(Schema.String)),
  productHighlight: Schema.optional(Schema.Array(Schema.String)),
  richProductContent: Schema.optional(Schema.Array(Schema.String)),
  nutrition: Schema.optional(Nutrition),
  grocery: Schema.optional(Grocery),
  virtualModelLink: Schema.optional(Schema.String),
  certification: Schema.optional(Schema.Array(GoogleShoppingManufacturersV1ProductCertification)),
  intendedCountry: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Attributes" }) as any as Schema.Schema<Attributes>;

export interface Issue {
  /** The server-generated type of the issue, for example, “INCORRECT_TEXT_FORMATTING”, “IMAGE_NOT_SERVEABLE”, etc. */
  type?: string;
  /** The severity of the issue. */
  severity?: "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO" | (string & {});
  /** If present, the attribute that triggered the issue. For more information about attributes, see https://support.google.com/manufacturers/answer/6124116. */
  attribute?: string;
  /** Short title describing the nature of the issue. */
  title?: string;
  /** Longer description of the issue focused on how to resolve it. */
  description?: string;
  /** What needs to happen to resolve the issue. */
  resolution?: "RESOLUTION_UNSPECIFIED" | "USER_ACTION" | "PENDING_PROCESSING" | (string & {});
  /** The destination this issue applies to. */
  destination?: string;
  /** The timestamp when this issue appeared. */
  timestamp?: string;
  /** Output only. List of country codes (ISO 3166-1 alpha-2) where issue applies to the manufacturer product. */
  applicableCountries?: Array<string>;
}

export const Issue: Schema.Schema<Issue> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  attribute: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  resolution: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  applicableCountries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Issue" }) as any as Schema.Schema<Issue>;

export interface DestinationStatus {
  /** The name of the destination. */
  destination?: string;
  /** The status of the destination. */
  status?: "UNKNOWN" | "ACTIVE" | "PENDING" | "DISAPPROVED" | (string & {});
  /** Output only. List of country codes (ISO 3166-1 alpha-2) where the offer is approved. */
  approvedCountries?: Array<string>;
  /** Output only. List of country codes (ISO 3166-1 alpha-2) where the offer is pending approval. */
  pendingCountries?: Array<string>;
  /** Output only. List of country codes (ISO 3166-1 alpha-2) where the offer is disapproved. */
  disapprovedCountries?: Array<string>;
}

export const DestinationStatus: Schema.Schema<DestinationStatus> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  approvedCountries: Schema.optional(Schema.Array(Schema.String)),
  pendingCountries: Schema.optional(Schema.Array(Schema.String)),
  disapprovedCountries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DestinationStatus" }) as any as Schema.Schema<DestinationStatus>;

export interface Product {
  /** Parent ID in the format `accounts/{account_id}`. `account_id` - The ID of the Manufacturer Center account. */
  parent?: string;
  /** Name in the format `{target_country}:{content_language}:{product_id}`. `target_country` - The target country of the product as a CLDR territory code (for example, US). `content_language` - The content language of the product as a two-letter ISO 639-1 language code (for example, en). `product_id` - The ID of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#id. */
  name?: string;
  /** The target country of the product as a CLDR territory code (for example, US). */
  targetCountry?: string;
  /** Optional. The feed label for the product. */
  feedLabel?: string;
  /** The content language of the product as a two-letter ISO 639-1 language code (for example, en). */
  contentLanguage?: string;
  /** The ID of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#id. */
  productId?: string;
  /** Attributes of the product uploaded to the Manufacturer Center. Manually edited attributes are taken into account. */
  attributes?: Attributes;
  /** A server-generated list of issues associated with the product. */
  issues?: Array<Issue>;
  /** The status of the destinations. */
  destinationStatuses?: Array<DestinationStatus>;
}

export const Product: Schema.Schema<Product> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  targetCountry: Schema.optional(Schema.String),
  feedLabel: Schema.optional(Schema.String),
  contentLanguage: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  attributes: Schema.optional(Attributes),
  issues: Schema.optional(Schema.Array(Issue)),
  destinationStatuses: Schema.optional(Schema.Array(DestinationStatus)),
})).annotate({ identifier: "Product" }) as any as Schema.Schema<Product>;

export interface ListProductsResponse {
  /** List of the products. */
  products?: Array<Product>;
  /** The token for the retrieval of the next page of product statuses. */
  nextPageToken?: string;
}

export const ListProductsResponse: Schema.Schema<ListProductsResponse> = Schema.suspend(() => Schema.Struct({
  products: Schema.optional(Schema.Array(Product)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListProductsResponse" }) as any as Schema.Schema<ListProductsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Certification {
  /** Required. Name of the certification. */
  name?: string;
  /** Required. Name of the certification body. */
  authority?: string;
  /** Optional. A unique code to identify the certification. */
  code?: string;
  /** Optional. A custom value of the certification. */
  value?: string;
  /** Optional. A URL link to the certification. */
  link?: string;
  /** Optional. A URL link to the certification logo. */
  logo?: string;
  /** Optional. The expiration date (UTC). */
  validUntil?: string;
}

export const Certification: Schema.Schema<Certification> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  authority: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  link: Schema.optional(Schema.String),
  logo: Schema.optional(Schema.String),
  validUntil: Schema.optional(Schema.String),
})).annotate({ identifier: "Certification" }) as any as Schema.Schema<Certification>;

export interface ProductCertification {
  /** Required. The unique name identifier of a product certification Format: accounts/{account}/languages/{language_code}/productCertifications/{id} Where `id` is a some unique identifier and `language_code` is a 2-letter ISO 639-1 code of a Shopping supported language according to https://support.google.com/merchants/answer/160637. */
  name?: string;
  /** Required. This is to clearly identify the product you are certifying. */
  title?: string;
  /** Required. This is the product's brand name. The brand is used to help identify your product. */
  brand?: string;
  /** Optional. These are the Manufacturer Part Numbers (MPN). MPNs are used to uniquely identify a specific product among all products from the same manufacturer */
  mpn?: Array<string>;
  /** Optional. Another name for GTIN. */
  productCode?: Array<string>;
  /** Optional. A 2-letter country code (ISO 3166-1 Alpha 2). */
  countryCode?: Array<string>;
  /** Optional. These are your own product categorization system in your product data. */
  productType?: Array<string>;
  /** Required. A list of certifications to link to the described product. */
  certification?: Array<Certification>;
  /** Output only. A server-generated list of issues associated with the product. */
  issues?: Array<Issue>;
  /** Output only. The statuses of the destinations. */
  destinationStatuses?: Array<DestinationStatus>;
}

export const ProductCertification: Schema.Schema<ProductCertification> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  brand: Schema.optional(Schema.String),
  mpn: Schema.optional(Schema.Array(Schema.String)),
  productCode: Schema.optional(Schema.Array(Schema.String)),
  countryCode: Schema.optional(Schema.Array(Schema.String)),
  productType: Schema.optional(Schema.Array(Schema.String)),
  certification: Schema.optional(Schema.Array(Certification)),
  issues: Schema.optional(Schema.Array(Issue)),
  destinationStatuses: Schema.optional(Schema.Array(DestinationStatus)),
})).annotate({ identifier: "ProductCertification" }) as any as Schema.Schema<ProductCertification>;

export interface ListProductCertificationsResponse {
  /** The product certifications from the specified certification body. */
  productCertifications?: Array<ProductCertification>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListProductCertificationsResponse: Schema.Schema<ListProductCertificationsResponse> = Schema.suspend(() => Schema.Struct({
  productCertifications: Schema.optional(Schema.Array(ProductCertification)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListProductCertificationsResponse" }) as any as Schema.Schema<ListProductCertificationsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists all the products in a Manufacturer Center account. */
export interface ListAccountsProductsRequest {
  /** Parent ID in the format `accounts/{account_id}`. `account_id` - The ID of the Manufacturer Center account. */
  parent: string;
  /** Maximum number of product statuses to return in the response, used for paging. */
  pageSize?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** The information to be included in the response. Only sections listed here will be returned. */
  include?: "UNKNOWN" | "ATTRIBUTES" | "ISSUES" | "DESTINATION_STATUSES" | (string & {})[];
}

export const ListAccountsProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  include: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("include")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/products" }),
  svc,
) as unknown as Schema.Schema<ListAccountsProductsRequest>;

export type ListAccountsProductsResponse = ListProductsResponse;
export const ListAccountsProductsResponse = ListProductsResponse;

export type ListAccountsProductsError = CommonErrors;

export const listAccountsProducts = API.makePaginated(() => ({
  input: ListAccountsProductsRequest,
  output: ListAccountsProductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the product from a Manufacturer Center account, including product issues. A recently updated product takes around 15 minutes to process. Changes are only visible after it has been processed. While some issues may be available once the product has been processed, other issues may take days to appear. */
export interface GetAccountsProductsRequest {
  /** Parent ID in the format `accounts/{account_id}`. `account_id` - The ID of the Manufacturer Center account. */
  parent: string;
  /** Name in the format `{target_country}:{content_language}:{product_id}`. `target_country` - The target country of the product as a CLDR territory code (for example, US). `content_language` - The content language of the product as a two-letter ISO 639-1 language code (for example, en). `product_id` - The ID of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#id. */
  name: string;
  /** The information to be included in the response. Only sections listed here will be returned. */
  include?: "UNKNOWN" | "ATTRIBUTES" | "ISSUES" | "DESTINATION_STATUSES" | (string & {})[];
}

export const GetAccountsProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  name: Schema.String.pipe(T.HttpPath("name")),
  include: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("include")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/products/{productsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsProductsRequest>;

export type GetAccountsProductsResponse = Product;
export const GetAccountsProductsResponse = Product;

export type GetAccountsProductsError = CommonErrors;

export const getAccountsProducts: API.OperationMethod<GetAccountsProductsRequest, GetAccountsProductsResponse, GetAccountsProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsProductsRequest,
  output: GetAccountsProductsResponse,
  errors: [],
}));

/** Inserts or updates the attributes of the product in a Manufacturer Center account. Creates a product with the provided attributes. If the product already exists, then all attributes are replaced with the new ones. The checks at upload time are minimal. All required attributes need to be present for a product to be valid. Issues may show up later after the API has accepted a new upload for a product and it is possible to overwrite an existing valid product with an invalid product. To detect this, you should retrieve the product and check it for issues once the new version is available. Uploaded attributes first need to be processed before they can be retrieved. Until then, new products will be unavailable, and retrieval of previously uploaded products will return the original state of the product. */
export interface UpdateAccountsProductsRequest {
  /** Parent ID in the format `accounts/{account_id}`. `account_id` - The ID of the Manufacturer Center account. */
  parent: string;
  /** Name in the format `{target_country}:{content_language}:{product_id}`. `target_country` - The target country of the product as a CLDR territory code (for example, US). `content_language` - The content language of the product as a two-letter ISO 639-1 language code (for example, en). `product_id` - The ID of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#id. */
  name: string;
  /** Request body */
  body?: Attributes;
}

export const UpdateAccountsProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Attributes).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/accounts/{accountsId}/products/{productsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsProductsRequest>;

export type UpdateAccountsProductsResponse = Empty;
export const UpdateAccountsProductsResponse = Empty;

export type UpdateAccountsProductsError = CommonErrors;

export const updateAccountsProducts: API.OperationMethod<UpdateAccountsProductsRequest, UpdateAccountsProductsResponse, UpdateAccountsProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsProductsRequest,
  output: UpdateAccountsProductsResponse,
  errors: [],
}));

/** Deletes the product from a Manufacturer Center account. */
export interface DeleteAccountsProductsRequest {
  /** Parent ID in the format `accounts/{account_id}`. `account_id` - The ID of the Manufacturer Center account. */
  parent: string;
  /** Name in the format `{target_country}:{content_language}:{product_id}`. `target_country` - The target country of the product as a CLDR territory code (for example, US). `content_language` - The content language of the product as a two-letter ISO 639-1 language code (for example, en). `product_id` - The ID of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#id. */
  name: string;
}

export const DeleteAccountsProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accounts/{accountsId}/products/{productsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsProductsRequest>;

export type DeleteAccountsProductsResponse = Empty;
export const DeleteAccountsProductsResponse = Empty;

export type DeleteAccountsProductsError = CommonErrors;

export const deleteAccountsProducts: API.OperationMethod<DeleteAccountsProductsRequest, DeleteAccountsProductsResponse, DeleteAccountsProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsProductsRequest,
  output: DeleteAccountsProductsResponse,
  errors: [],
}));

/** Updates (or creates if allow_missing = true) a product certification which links certifications with products. This method can only be called by certification bodies. */
export interface PatchAccountsLanguagesProductCertificationsRequest {
  /** Required. The unique name identifier of a product certification Format: accounts/{account}/languages/{language_code}/productCertifications/{id} Where `id` is a some unique identifier and `language_code` is a 2-letter ISO 639-1 code of a Shopping supported language according to https://support.google.com/merchants/answer/160637. */
  name: string;
  /** Optional. The list of fields to update according to aip.dev/134. However, only full update is supported as of right now. Therefore, it can be either ignored or set to "*". Setting any other values will returns UNIMPLEMENTED error. */
  updateMask?: string;
  /** Request body */
  body?: ProductCertification;
}

export const PatchAccountsLanguagesProductCertificationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ProductCertification).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accounts/{accountsId}/languages/{languagesId}/productCertifications/{productCertificationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsLanguagesProductCertificationsRequest>;

export type PatchAccountsLanguagesProductCertificationsResponse = ProductCertification;
export const PatchAccountsLanguagesProductCertificationsResponse = ProductCertification;

export type PatchAccountsLanguagesProductCertificationsError = CommonErrors;

export const patchAccountsLanguagesProductCertifications: API.OperationMethod<PatchAccountsLanguagesProductCertificationsRequest, PatchAccountsLanguagesProductCertificationsResponse, PatchAccountsLanguagesProductCertificationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsLanguagesProductCertificationsRequest,
  output: PatchAccountsLanguagesProductCertificationsResponse,
  errors: [],
}));

/** Lists product certifications from a specified certification body. This method can only be called by certification bodies. */
export interface ListAccountsLanguagesProductCertificationsRequest {
  /** Required. The parent, which owns this collection of product certifications. Format: accounts/{account}/languages/{language_code} */
  parent: string;
  /** Optional. The maximum number of product certifications to return. The service may return fewer than this value. If unspecified, at most 50 product certifications will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListProductCertifications` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListProductCertifications` must match the call that provided the page token. Required if requesting the second or higher page. */
  pageToken?: string;
}

export const ListAccountsLanguagesProductCertificationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/languages/{languagesId}/productCertifications" }),
  svc,
) as unknown as Schema.Schema<ListAccountsLanguagesProductCertificationsRequest>;

export type ListAccountsLanguagesProductCertificationsResponse = ListProductCertificationsResponse;
export const ListAccountsLanguagesProductCertificationsResponse = ListProductCertificationsResponse;

export type ListAccountsLanguagesProductCertificationsError = CommonErrors;

export const listAccountsLanguagesProductCertifications = API.makePaginated(() => ({
  input: ListAccountsLanguagesProductCertificationsRequest,
  output: ListAccountsLanguagesProductCertificationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a product certification by its name. This method can only be called by certification bodies. */
export interface GetAccountsLanguagesProductCertificationsRequest {
  /** Required. The name of the product certification to get. Format: accounts/{account}/languages/{language_code}/productCertifications/{id} */
  name: string;
}

export const GetAccountsLanguagesProductCertificationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/languages/{languagesId}/productCertifications/{productCertificationsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsLanguagesProductCertificationsRequest>;

export type GetAccountsLanguagesProductCertificationsResponse = ProductCertification;
export const GetAccountsLanguagesProductCertificationsResponse = ProductCertification;

export type GetAccountsLanguagesProductCertificationsError = CommonErrors;

export const getAccountsLanguagesProductCertifications: API.OperationMethod<GetAccountsLanguagesProductCertificationsRequest, GetAccountsLanguagesProductCertificationsResponse, GetAccountsLanguagesProductCertificationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsLanguagesProductCertificationsRequest,
  output: GetAccountsLanguagesProductCertificationsResponse,
  errors: [],
}));

/** Deletes a product certification by its name. This method can only be called by certification bodies. */
export interface DeleteAccountsLanguagesProductCertificationsRequest {
  /** Required. The name of the product certification to delete. Format: accounts/{account}/languages/{language_code}/productCertifications/{id} */
  name: string;
}

export const DeleteAccountsLanguagesProductCertificationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accounts/{accountsId}/languages/{languagesId}/productCertifications/{productCertificationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsLanguagesProductCertificationsRequest>;

export type DeleteAccountsLanguagesProductCertificationsResponse = Empty;
export const DeleteAccountsLanguagesProductCertificationsResponse = Empty;

export type DeleteAccountsLanguagesProductCertificationsError = CommonErrors;

export const deleteAccountsLanguagesProductCertifications: API.OperationMethod<DeleteAccountsLanguagesProductCertificationsRequest, DeleteAccountsLanguagesProductCertificationsResponse, DeleteAccountsLanguagesProductCertificationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsLanguagesProductCertificationsRequest,
  output: DeleteAccountsLanguagesProductCertificationsResponse,
  errors: [],
}));

