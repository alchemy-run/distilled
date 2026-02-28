// ==========================================================================
// Books API (books v1)
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
  name: "books",
  version: "v1",
  rootUrl: "https://books.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Bookshelf {
  /** Id of this bookshelf, only unique by user. */
  id?: number;
  /** Resource type for bookshelf metadata. */
  kind?: string;
  /** Title of this bookshelf. */
  title?: string;
  /** Description of this bookshelf. */
  description?: string;
  /** Whether this bookshelf is PUBLIC or PRIVATE. */
  access?: string;
  /** Last modified time of this bookshelf (formatted UTC timestamp with millisecond resolution). */
  updated?: string;
  /** Number of volumes in this bookshelf. */
  volumeCount?: number;
  /** Last time a volume was added or removed from this bookshelf (formatted UTC timestamp with millisecond resolution). */
  volumesLastUpdated?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Created time for this bookshelf (formatted UTC timestamp with millisecond resolution). */
  created?: string;
}

export const Bookshelf: Schema.Schema<Bookshelf> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  access: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  volumeCount: Schema.optional(Schema.Number),
  volumesLastUpdated: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
})).annotate({ identifier: "Bookshelf" }) as any as Schema.Schema<Bookshelf>;

export interface Bookshelves {
  /** Resource type. */
  kind?: string;
  /** A list of bookshelves. */
  items?: Array<Bookshelf>;
}

export const Bookshelves: Schema.Schema<Bookshelves> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Bookshelf)),
})).annotate({ identifier: "Bookshelves" }) as any as Schema.Schema<Bookshelves>;

export interface Volumeseriesinfo {
  /** Short book title in the context of the series. */
  shortSeriesBookTitle?: string;
  volumeSeries?: Array<{ seriesId?: string; seriesBookType?: string; orderNumber?: number; issue?: Array<{ issueOrderNumber?: number; issueDisplayNumber?: string }> }>;
  /** The display number string. This should be used only for display purposes and the actual sequence should be inferred from the below orderNumber. */
  bookDisplayNumber?: string;
  /** Resource type. */
  kind?: string;
}

export const Volumeseriesinfo: Schema.Schema<Volumeseriesinfo> = Schema.suspend(() => Schema.Struct({
  shortSeriesBookTitle: Schema.optional(Schema.String),
  volumeSeries: Schema.optional(Schema.Array(Schema.Struct({ seriesId: Schema.optional(Schema.String), seriesBookType: Schema.optional(Schema.String), orderNumber: Schema.optional(Schema.Number), issue: Schema.optional(Schema.Array(Schema.Struct({ issueOrderNumber: Schema.optional(Schema.Number), issueDisplayNumber: Schema.optional(Schema.String) }))) }))),
  bookDisplayNumber: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Volumeseriesinfo" }) as any as Schema.Schema<Volumeseriesinfo>;

export interface Review {
  /** Volume that this review is for. */
  volumeId?: string;
  /** Source type for this review. Possible values are EDITORIAL, WEB_USER or GOOGLE_USER. */
  type?: string;
  /** Resource type for a review. */
  kind?: string;
  /** Date of this review. */
  date?: string;
  /** Title for this review. */
  title?: string;
  /** Review text. */
  content?: string;
  /** Star rating for this review. Possible values are ONE, TWO, THREE, FOUR, FIVE or NOT_RATED. */
  rating?: string;
  /** URL for the full review text, for reviews gathered from the web. */
  fullTextUrl?: string;
  /** Author of this review. */
  author?: { displayName?: string };
  /** Information regarding the source of this review, when the review is not from a Google Books user. */
  source?: { description?: string; url?: string; extraDescription?: string };
}

export const Review: Schema.Schema<Review> = Schema.suspend(() => Schema.Struct({
  volumeId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  date: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  rating: Schema.optional(Schema.String),
  fullTextUrl: Schema.optional(Schema.String),
  author: Schema.optional(Schema.Struct({ displayName: Schema.optional(Schema.String) })),
  source: Schema.optional(Schema.Struct({ description: Schema.optional(Schema.String), url: Schema.optional(Schema.String), extraDescription: Schema.optional(Schema.String) })),
})).annotate({ identifier: "Review" }) as any as Schema.Schema<Review>;

export interface ReadingPosition {
  /** Volume id associated with this reading position. */
  volumeId?: string;
  /** Resource type for a reading position. */
  kind?: string;
  /** Position in a volume for text-based content. */
  gbTextPosition?: string;
  /** Position in a volume for image-based content. */
  gbImagePosition?: string;
  /** Position in a PDF file. */
  pdfPosition?: string;
  /** Position in an EPUB as a CFI. */
  epubCfiPosition?: string;
  /** Timestamp when this reading position was last updated (formatted UTC timestamp with millisecond resolution). */
  updated?: string;
}

export const ReadingPosition: Schema.Schema<ReadingPosition> = Schema.suspend(() => Schema.Struct({
  volumeId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  gbTextPosition: Schema.optional(Schema.String),
  gbImagePosition: Schema.optional(Schema.String),
  pdfPosition: Schema.optional(Schema.String),
  epubCfiPosition: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
})).annotate({ identifier: "ReadingPosition" }) as any as Schema.Schema<ReadingPosition>;

export interface DownloadAccessRestriction {
  /** If restricted, whether access is granted for this (user, device, volume). */
  deviceAllowed?: boolean;
  /** Identifies the volume for which this entry applies. */
  volumeId?: string;
  /** If restricted, the maximum number of content download licenses for this volume. */
  maxDownloadDevices?: number;
  /** Error/warning reason code. Additional codes may be added in the future. 0 OK 100 ACCESS_DENIED_PUBLISHER_LIMIT 101 ACCESS_DENIED_LIMIT 200 WARNING_USED_LAST_ACCESS */
  reasonCode?: string;
  /** Error/warning message. */
  message?: string;
  /** Client nonce for verification. Download access and client-validation only. */
  nonce?: string;
  /** Client app identifier for verification. Download access and client-validation only. */
  source?: string;
  /** Response signature. */
  signature?: string;
  /** If restricted, the number of content download licenses already acquired (including the requesting client, if licensed). */
  downloadsAcquired?: number;
  /** Whether this volume has any download access restrictions. */
  restricted?: boolean;
  /** If deviceAllowed, whether access was just acquired with this request. */
  justAcquired?: boolean;
  /** Resource type. */
  kind?: string;
}

export const DownloadAccessRestriction: Schema.Schema<DownloadAccessRestriction> = Schema.suspend(() => Schema.Struct({
  deviceAllowed: Schema.optional(Schema.Boolean),
  volumeId: Schema.optional(Schema.String),
  maxDownloadDevices: Schema.optional(Schema.Number),
  reasonCode: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  nonce: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  downloadsAcquired: Schema.optional(Schema.Number),
  restricted: Schema.optional(Schema.Boolean),
  justAcquired: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DownloadAccessRestriction" }) as any as Schema.Schema<DownloadAccessRestriction>;

export interface Volume {
  /** Unique identifier for a volume. (In LITE projection.) */
  id?: string;
  /** Resource type for a volume. (In LITE projection.) */
  kind?: string;
  /** URL to this resource. (In LITE projection.) */
  selfLink?: string;
  /** What layers exist in this volume and high level information about them. */
  layerInfo?: { layers?: Array<{ layerId?: string; volumeAnnotationsVersion?: string }> };
  /** Opaque identifier for a specific version of a volume resource. (In LITE projection) */
  etag?: string;
  /** General volume information. */
  volumeInfo?: { title?: string; subtitle?: string; authors?: Array<string>; publisher?: string; publishedDate?: string; description?: string; pageCount?: number; printType?: string; averageRating?: number; ratingsCount?: number; contentVersion?: string; imageLinks?: { thumbnail?: string; small?: string; medium?: string; large?: string; extraLarge?: string; smallThumbnail?: string }; language?: string; previewLink?: string; industryIdentifiers?: Array<{ type?: string; identifier?: string }>; infoLink?: string; canonicalVolumeLink?: string; categories?: Array<string>; printedPageCount?: number; readingModes?: { text?: boolean; image?: boolean }; samplePageCount?: number; maturityRating?: string; allowAnonLogging?: boolean; seriesInfo?: Volumeseriesinfo; comicsContent?: boolean; dimensions?: { height?: string; width?: string; thickness?: string }; mainCategory?: string; panelizationSummary?: { containsEpubBubbles?: boolean; containsImageBubbles?: boolean; epubBubbleVersion?: string; imageBubbleVersion?: string } };
  /** User specific information related to this volume. (e.g. page this user last read or whether they purchased this book) */
  userInfo?: { familySharing?: { isSharingAllowed?: boolean; isSharingDisabledByFop?: boolean; familyRole?: string }; review?: Review; readingPosition?: ReadingPosition; isPurchased?: boolean; updated?: string; isPreordered?: boolean; isInMyBooks?: boolean; isUploaded?: boolean; rentalState?: string; acquisitionType?: number; entitlementType?: number; acquiredTime?: string; isFamilySharedFromUser?: boolean; isFamilySharedToUser?: boolean; isFamilySharingAllowed?: boolean; isFamilySharingDisabledByFop?: boolean; userUploadedVolumeInfo?: { processingState?: string }; rentalPeriod?: { startUtcSec?: string; endUtcSec?: string }; copy?: { remainingCharacterCount?: number; allowedCharacterCount?: number; limitType?: string; updated?: string } };
  /** Any information about a volume related to the eBookstore and/or purchaseability. This information can depend on the country where the request originates from (i.e. books may not be for sale in certain countries). */
  saleInfo?: { country?: string; saleability?: string; isEbook?: boolean; buyLink?: string; offers?: Array<{ finskyOfferType?: number; giftable?: boolean; retailPrice?: { currencyCode?: string; amountInMicros?: number }; rentalDuration?: { unit?: string; count?: number }; listPrice?: { currencyCode?: string; amountInMicros?: number } }>; onSaleDate?: string; listPrice?: { amount?: number; currencyCode?: string }; retailPrice?: { amount?: number; currencyCode?: string } };
  /** Any information about a volume related to reading or obtaining that volume text. This information can depend on country (books may be public domain in one country but not in another, e.g.). */
  accessInfo?: { country?: string; viewability?: string; embeddable?: boolean; publicDomain?: boolean; accessViewStatus?: string; downloadAccess?: DownloadAccessRestriction; textToSpeechPermission?: string; webReaderLink?: string; epub?: { downloadLink?: string; acsTokenLink?: string; isAvailable?: boolean }; pdf?: { downloadLink?: string; acsTokenLink?: string; isAvailable?: boolean }; viewOrderUrl?: string; explicitOfflineLicenseManagement?: boolean; quoteSharingAllowed?: boolean; driveImportedContentLink?: string };
  /** Search result information related to this volume. */
  searchInfo?: { textSnippet?: string };
  /** Recommendation related information for this volume. */
  recommendedInfo?: { explanation?: string };
}

export const Volume: Schema.Schema<Volume> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  layerInfo: Schema.optional(Schema.Struct({ layers: Schema.optional(Schema.Array(Schema.Struct({ layerId: Schema.optional(Schema.String), volumeAnnotationsVersion: Schema.optional(Schema.String) }))) })),
  etag: Schema.optional(Schema.String),
  volumeInfo: Schema.optional(Schema.Struct({ title: Schema.optional(Schema.String), subtitle: Schema.optional(Schema.String), authors: Schema.optional(Schema.Array(Schema.String)), publisher: Schema.optional(Schema.String), publishedDate: Schema.optional(Schema.String), description: Schema.optional(Schema.String), pageCount: Schema.optional(Schema.Number), printType: Schema.optional(Schema.String), averageRating: Schema.optional(Schema.Number), ratingsCount: Schema.optional(Schema.Number), contentVersion: Schema.optional(Schema.String), imageLinks: Schema.optional(Schema.Struct({ thumbnail: Schema.optional(Schema.String), small: Schema.optional(Schema.String), medium: Schema.optional(Schema.String), large: Schema.optional(Schema.String), extraLarge: Schema.optional(Schema.String), smallThumbnail: Schema.optional(Schema.String) })), language: Schema.optional(Schema.String), previewLink: Schema.optional(Schema.String), industryIdentifiers: Schema.optional(Schema.Array(Schema.Struct({ type: Schema.optional(Schema.String), identifier: Schema.optional(Schema.String) }))), infoLink: Schema.optional(Schema.String), canonicalVolumeLink: Schema.optional(Schema.String), categories: Schema.optional(Schema.Array(Schema.String)), printedPageCount: Schema.optional(Schema.Number), readingModes: Schema.optional(Schema.Struct({ text: Schema.optional(Schema.Boolean), image: Schema.optional(Schema.Boolean) })), samplePageCount: Schema.optional(Schema.Number), maturityRating: Schema.optional(Schema.String), allowAnonLogging: Schema.optional(Schema.Boolean), seriesInfo: Schema.optional(Volumeseriesinfo), comicsContent: Schema.optional(Schema.Boolean), dimensions: Schema.optional(Schema.Struct({ height: Schema.optional(Schema.String), width: Schema.optional(Schema.String), thickness: Schema.optional(Schema.String) })), mainCategory: Schema.optional(Schema.String), panelizationSummary: Schema.optional(Schema.Struct({ containsEpubBubbles: Schema.optional(Schema.Boolean), containsImageBubbles: Schema.optional(Schema.Boolean), epubBubbleVersion: Schema.optional(Schema.String), imageBubbleVersion: Schema.optional(Schema.String) })) })),
  userInfo: Schema.optional(Schema.Struct({ familySharing: Schema.optional(Schema.Struct({ isSharingAllowed: Schema.optional(Schema.Boolean), isSharingDisabledByFop: Schema.optional(Schema.Boolean), familyRole: Schema.optional(Schema.String) })), review: Schema.optional(Review), readingPosition: Schema.optional(ReadingPosition), isPurchased: Schema.optional(Schema.Boolean), updated: Schema.optional(Schema.String), isPreordered: Schema.optional(Schema.Boolean), isInMyBooks: Schema.optional(Schema.Boolean), isUploaded: Schema.optional(Schema.Boolean), rentalState: Schema.optional(Schema.String), acquisitionType: Schema.optional(Schema.Number), entitlementType: Schema.optional(Schema.Number), acquiredTime: Schema.optional(Schema.String), isFamilySharedFromUser: Schema.optional(Schema.Boolean), isFamilySharedToUser: Schema.optional(Schema.Boolean), isFamilySharingAllowed: Schema.optional(Schema.Boolean), isFamilySharingDisabledByFop: Schema.optional(Schema.Boolean), userUploadedVolumeInfo: Schema.optional(Schema.Struct({ processingState: Schema.optional(Schema.String) })), rentalPeriod: Schema.optional(Schema.Struct({ startUtcSec: Schema.optional(Schema.String), endUtcSec: Schema.optional(Schema.String) })), copy: Schema.optional(Schema.Struct({ remainingCharacterCount: Schema.optional(Schema.Number), allowedCharacterCount: Schema.optional(Schema.Number), limitType: Schema.optional(Schema.String), updated: Schema.optional(Schema.String) })) })),
  saleInfo: Schema.optional(Schema.Struct({ country: Schema.optional(Schema.String), saleability: Schema.optional(Schema.String), isEbook: Schema.optional(Schema.Boolean), buyLink: Schema.optional(Schema.String), offers: Schema.optional(Schema.Array(Schema.Struct({ finskyOfferType: Schema.optional(Schema.Number), giftable: Schema.optional(Schema.Boolean), retailPrice: Schema.optional(Schema.Struct({ currencyCode: Schema.optional(Schema.String), amountInMicros: Schema.optional(Schema.Number) })), rentalDuration: Schema.optional(Schema.Struct({ unit: Schema.optional(Schema.String), count: Schema.optional(Schema.Number) })), listPrice: Schema.optional(Schema.Struct({ currencyCode: Schema.optional(Schema.String), amountInMicros: Schema.optional(Schema.Number) })) }))), onSaleDate: Schema.optional(Schema.String), listPrice: Schema.optional(Schema.Struct({ amount: Schema.optional(Schema.Number), currencyCode: Schema.optional(Schema.String) })), retailPrice: Schema.optional(Schema.Struct({ amount: Schema.optional(Schema.Number), currencyCode: Schema.optional(Schema.String) })) })),
  accessInfo: Schema.optional(Schema.Struct({ country: Schema.optional(Schema.String), viewability: Schema.optional(Schema.String), embeddable: Schema.optional(Schema.Boolean), publicDomain: Schema.optional(Schema.Boolean), accessViewStatus: Schema.optional(Schema.String), downloadAccess: Schema.optional(DownloadAccessRestriction), textToSpeechPermission: Schema.optional(Schema.String), webReaderLink: Schema.optional(Schema.String), epub: Schema.optional(Schema.Struct({ downloadLink: Schema.optional(Schema.String), acsTokenLink: Schema.optional(Schema.String), isAvailable: Schema.optional(Schema.Boolean) })), pdf: Schema.optional(Schema.Struct({ downloadLink: Schema.optional(Schema.String), acsTokenLink: Schema.optional(Schema.String), isAvailable: Schema.optional(Schema.Boolean) })), viewOrderUrl: Schema.optional(Schema.String), explicitOfflineLicenseManagement: Schema.optional(Schema.Boolean), quoteSharingAllowed: Schema.optional(Schema.Boolean), driveImportedContentLink: Schema.optional(Schema.String) })),
  searchInfo: Schema.optional(Schema.Struct({ textSnippet: Schema.optional(Schema.String) })),
  recommendedInfo: Schema.optional(Schema.Struct({ explanation: Schema.optional(Schema.String) })),
})).annotate({ identifier: "Volume" }) as any as Schema.Schema<Volume>;

export interface Volumes {
  /** Resource type. */
  kind?: string;
  /** A list of volumes. */
  items?: Array<Volume>;
  /** Total number of volumes found. This might be greater than the number of volumes returned in this response if results have been paginated. */
  totalItems?: number;
}

export const Volumes: Schema.Schema<Volumes> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Volume)),
  totalItems: Schema.optional(Schema.Number),
})).annotate({ identifier: "Volumes" }) as any as Schema.Schema<Volumes>;

export interface BooksCloudloadingResource {
  volumeId?: string;
  title?: string;
  author?: string;
  processingState?: string;
}

export const BooksCloudloadingResource: Schema.Schema<BooksCloudloadingResource> = Schema.suspend(() => Schema.Struct({
  volumeId: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  author: Schema.optional(Schema.String),
  processingState: Schema.optional(Schema.String),
})).annotate({ identifier: "BooksCloudloadingResource" }) as any as Schema.Schema<BooksCloudloadingResource>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Metadata {
  /** Resource type. */
  kind?: string;
  /** A list of offline dictionary metadata. */
  items?: Array<{ language?: string; size?: string; version?: string; download_url?: string; encrypted_key?: string }>;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Schema.Struct({ language: Schema.optional(Schema.String), size: Schema.optional(Schema.String), version: Schema.optional(Schema.String), download_url: Schema.optional(Schema.String), encrypted_key: Schema.optional(Schema.String) }))),
})).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface FamilyInfo {
  /** Resource type. */
  kind?: string;
  /** Family membership info of the user that made the request. */
  membership?: { isInFamily?: boolean; role?: string; ageGroup?: string; acquirePermission?: string; allowedMaturityRating?: string };
}

export const FamilyInfo: Schema.Schema<FamilyInfo> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  membership: Schema.optional(Schema.Struct({ isInFamily: Schema.optional(Schema.Boolean), role: Schema.optional(Schema.String), ageGroup: Schema.optional(Schema.String), acquirePermission: Schema.optional(Schema.String), allowedMaturityRating: Schema.optional(Schema.String) })),
})).annotate({ identifier: "FamilyInfo" }) as any as Schema.Schema<FamilyInfo>;

export interface Layersummary {
  /** Unique id of this layer summary. */
  id?: string;
  /** The layer id for this summary. */
  layerId?: string;
  /** The volume id this resource is for. */
  volumeId?: string;
  /** The content version this resource is for. */
  contentVersion?: string;
  /** The list of annotation types contained for this layer. */
  annotationTypes?: Array<string>;
  /** The number of annotations for this layer. */
  annotationCount?: number;
  /** The number of data items for this layer. */
  dataCount?: number;
  /** Resource Type */
  kind?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Timestamp for the last time an item in this layer was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The current version of this layer's volume annotations. Note that this version applies only to the data in the books.layers.volumeAnnotations.* responses. The actual annotation data is versioned separately. */
  volumeAnnotationsVersion?: string;
  /** The link to get the annotations for this layer. */
  annotationsLink?: string;
  /** Link to get data for this annotation. */
  annotationsDataLink?: string;
}

export const Layersummary: Schema.Schema<Layersummary> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  layerId: Schema.optional(Schema.String),
  volumeId: Schema.optional(Schema.String),
  contentVersion: Schema.optional(Schema.String),
  annotationTypes: Schema.optional(Schema.Array(Schema.String)),
  annotationCount: Schema.optional(Schema.Number),
  dataCount: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  volumeAnnotationsVersion: Schema.optional(Schema.String),
  annotationsLink: Schema.optional(Schema.String),
  annotationsDataLink: Schema.optional(Schema.String),
})).annotate({ identifier: "Layersummary" }) as any as Schema.Schema<Layersummary>;

export interface Layersummaries {
  /** Resource type. */
  kind?: string;
  /** A list of layer summary items. */
  items?: Array<Layersummary>;
  /** The total number of layer summaries found. */
  totalItems?: number;
}

export const Layersummaries: Schema.Schema<Layersummaries> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Layersummary)),
  totalItems: Schema.optional(Schema.Number),
})).annotate({ identifier: "Layersummaries" }) as any as Schema.Schema<Layersummaries>;

export interface Dictlayerdata {
  kind?: string;
  dict?: { words?: Array<{ senses?: Array<{ syllabification?: string; pronunciation?: string; partOfSpeech?: string; pronunciationUrl?: string; definitions?: Array<{ definition?: string; examples?: Array<{ text?: string; source?: { url?: string; attribution?: string } }> }>; synonyms?: Array<{ text?: string; source?: { url?: string; attribution?: string } }>; conjugations?: Array<{ value?: string; type?: string }>; source?: { url?: string; attribution?: string } }>; examples?: Array<{ text?: string; source?: { url?: string; attribution?: string } }>; derivatives?: Array<{ text?: string; source?: { url?: string; attribution?: string } }>; source?: { url?: string; attribution?: string } }>; source?: { url?: string; attribution?: string } };
  common?: { title?: string };
}

export const Dictlayerdata: Schema.Schema<Dictlayerdata> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  dict: Schema.optional(Schema.Struct({ words: Schema.optional(Schema.Array(Schema.Struct({ senses: Schema.optional(Schema.Array(Schema.Struct({ syllabification: Schema.optional(Schema.String), pronunciation: Schema.optional(Schema.String), partOfSpeech: Schema.optional(Schema.String), pronunciationUrl: Schema.optional(Schema.String), definitions: Schema.optional(Schema.Array(Schema.Struct({ definition: Schema.optional(Schema.String), examples: Schema.optional(Schema.Array(Schema.Struct({ text: Schema.optional(Schema.String), source: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String), attribution: Schema.optional(Schema.String) })) }))) }))), synonyms: Schema.optional(Schema.Array(Schema.Struct({ text: Schema.optional(Schema.String), source: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String), attribution: Schema.optional(Schema.String) })) }))), conjugations: Schema.optional(Schema.Array(Schema.Struct({ value: Schema.optional(Schema.String), type: Schema.optional(Schema.String) }))), source: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String), attribution: Schema.optional(Schema.String) })) }))), examples: Schema.optional(Schema.Array(Schema.Struct({ text: Schema.optional(Schema.String), source: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String), attribution: Schema.optional(Schema.String) })) }))), derivatives: Schema.optional(Schema.Array(Schema.Struct({ text: Schema.optional(Schema.String), source: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String), attribution: Schema.optional(Schema.String) })) }))), source: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String), attribution: Schema.optional(Schema.String) })) }))), source: Schema.optional(Schema.Struct({ url: Schema.optional(Schema.String), attribution: Schema.optional(Schema.String) })) })),
  common: Schema.optional(Schema.Struct({ title: Schema.optional(Schema.String) })),
})).annotate({ identifier: "Dictlayerdata" }) as any as Schema.Schema<Dictlayerdata>;

export interface DictionaryAnnotationdata {
  /** Unique id for this annotation data. */
  id?: string;
  /** The Layer id for this data. * */
  layerId?: string;
  /** URL for this resource. * */
  selfLink?: string;
  /** The type of annotation this data is for. */
  annotationType?: string;
  /** Resource Type */
  kind?: string;
  /** Base64 encoded data for this annotation data. */
  encodedData?: string;
  /** Timestamp for the last time this data was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The volume id for this data. * */
  volumeId?: string;
  /** JSON encoded data for this dictionary annotation data. Emitted with name 'data' in JSON output. Either this or geo_data will be populated. */
  data?: Dictlayerdata;
}

export const DictionaryAnnotationdata: Schema.Schema<DictionaryAnnotationdata> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  layerId: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  annotationType: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  encodedData: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  volumeId: Schema.optional(Schema.String),
  data: Schema.optional(Dictlayerdata),
})).annotate({ identifier: "DictionaryAnnotationdata" }) as any as Schema.Schema<DictionaryAnnotationdata>;

export interface Geolayerdata {
  kind?: string;
  geo?: { viewport?: { lo?: { longitude?: number; latitude?: number }; hi?: { longitude?: number; latitude?: number } }; countryCode?: string; mapType?: string; zoom?: number; cachePolicy?: string; longitude?: number; latitude?: number; boundary?: Array<string> };
  common?: { lang?: string; snippetUrl?: string; snippet?: string; previewImageUrl?: string; title?: string };
}

export const Geolayerdata: Schema.Schema<Geolayerdata> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  geo: Schema.optional(Schema.Struct({ viewport: Schema.optional(Schema.Struct({ lo: Schema.optional(Schema.Struct({ longitude: Schema.optional(Schema.Number), latitude: Schema.optional(Schema.Number) })), hi: Schema.optional(Schema.Struct({ longitude: Schema.optional(Schema.Number), latitude: Schema.optional(Schema.Number) })) })), countryCode: Schema.optional(Schema.String), mapType: Schema.optional(Schema.String), zoom: Schema.optional(Schema.Number), cachePolicy: Schema.optional(Schema.String), longitude: Schema.optional(Schema.Number), latitude: Schema.optional(Schema.Number), boundary: Schema.optional(Schema.Array(Schema.String)) })),
  common: Schema.optional(Schema.Struct({ lang: Schema.optional(Schema.String), snippetUrl: Schema.optional(Schema.String), snippet: Schema.optional(Schema.String), previewImageUrl: Schema.optional(Schema.String), title: Schema.optional(Schema.String) })),
})).annotate({ identifier: "Geolayerdata" }) as any as Schema.Schema<Geolayerdata>;

export interface GeoAnnotationdata {
  /** Unique id for this annotation data. */
  id?: string;
  /** The Layer id for this data. * */
  layerId?: string;
  /** URL for this resource. * */
  selfLink?: string;
  /** The type of annotation this data is for. */
  annotationType?: string;
  /** Resource Type */
  kind?: string;
  /** Base64 encoded data for this annotation data. */
  encodedData?: string;
  /** Timestamp for the last time this data was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The volume id for this data. * */
  volumeId?: string;
  /** JSON encoded data for this geo annotation data. Emitted with name 'data' in JSON output. Either this or dict_data will be populated. */
  data?: Geolayerdata;
}

export const GeoAnnotationdata: Schema.Schema<GeoAnnotationdata> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  layerId: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  annotationType: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  encodedData: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  volumeId: Schema.optional(Schema.String),
  data: Schema.optional(Geolayerdata),
})).annotate({ identifier: "GeoAnnotationdata" }) as any as Schema.Schema<GeoAnnotationdata>;

export interface Annotationsdata {
  /** Resource type */
  kind?: string;
  /** A list of Annotation Data. */
  items?: Array<GeoAnnotationdata>;
  /** The total number of volume annotations found. */
  totalItems?: number;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
}

export const Annotationsdata: Schema.Schema<Annotationsdata> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(GeoAnnotationdata)),
  totalItems: Schema.optional(Schema.Number),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Annotationsdata" }) as any as Schema.Schema<Annotationsdata>;

export interface BooksAnnotationsRange {
  /** The starting position for the range. */
  startPosition?: string;
  /** The offset from the starting position. */
  startOffset?: string;
  /** The ending position for the range. */
  endPosition?: string;
  /** The offset from the ending position. */
  endOffset?: string;
}

export const BooksAnnotationsRange: Schema.Schema<BooksAnnotationsRange> = Schema.suspend(() => Schema.Struct({
  startPosition: Schema.optional(Schema.String),
  startOffset: Schema.optional(Schema.String),
  endPosition: Schema.optional(Schema.String),
  endOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "BooksAnnotationsRange" }) as any as Schema.Schema<BooksAnnotationsRange>;

export interface Volumeannotation {
  /** Unique id of this volume annotation. */
  id?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** The Layer this annotation is for. */
  layerId?: string;
  /** The type of annotation this is. */
  annotationType?: string;
  /** Pages the annotation spans. */
  pageIds?: Array<string>;
  /** Excerpt from the volume. */
  selectedText?: string;
  /** Data for this annotation. */
  data?: string;
  /** The annotation data id for this volume annotation. */
  annotationDataId?: string;
  /** Resource Type */
  kind?: string;
  /** Timestamp for the last time this anntoation was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** Indicates that this annotation is deleted. */
  deleted?: boolean;
  /** The Volume this annotation is for. */
  volumeId?: string;
  /** Link to get data for this annotation. */
  annotationDataLink?: string;
  /** The content ranges to identify the selected text. */
  contentRanges?: { contentVersion?: string; gbTextRange?: BooksAnnotationsRange; gbImageRange?: BooksAnnotationsRange; cfiRange?: BooksAnnotationsRange };
}

export const Volumeannotation: Schema.Schema<Volumeannotation> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  layerId: Schema.optional(Schema.String),
  annotationType: Schema.optional(Schema.String),
  pageIds: Schema.optional(Schema.Array(Schema.String)),
  selectedText: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  annotationDataId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  deleted: Schema.optional(Schema.Boolean),
  volumeId: Schema.optional(Schema.String),
  annotationDataLink: Schema.optional(Schema.String),
  contentRanges: Schema.optional(Schema.Struct({ contentVersion: Schema.optional(Schema.String), gbTextRange: Schema.optional(BooksAnnotationsRange), gbImageRange: Schema.optional(BooksAnnotationsRange), cfiRange: Schema.optional(BooksAnnotationsRange) })),
})).annotate({ identifier: "Volumeannotation" }) as any as Schema.Schema<Volumeannotation>;

export interface Volumeannotations {
  /** The version string for all of the volume annotations in this layer (not just the ones in this response). Note: the version string doesn't apply to the annotation data, just the information in this response (e.g. the location of annotations in the book). */
  version?: string;
  /** Resource type */
  kind?: string;
  /** A list of volume annotations. */
  items?: Array<Volumeannotation>;
  /** The total number of volume annotations found. */
  totalItems?: number;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
}

export const Volumeannotations: Schema.Schema<Volumeannotations> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Volumeannotation)),
  totalItems: Schema.optional(Schema.Number),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Volumeannotations" }) as any as Schema.Schema<Volumeannotations>;

export interface Usersettings {
  /** Resource type. */
  kind?: string;
  notification?: { moreFromAuthors?: { opted_state?: string }; moreFromSeries?: { opted_state?: string }; rewardExpirations?: { opted_state?: string }; priceDrop?: { opted_state?: string }; matchMyInterests?: { opted_state?: string } };
  /** User settings in sub-objects, each for different purposes. */
  notesExport?: { isEnabled?: boolean; folderName?: string };
}

export const Usersettings: Schema.Schema<Usersettings> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  notification: Schema.optional(Schema.Struct({ moreFromAuthors: Schema.optional(Schema.Struct({ opted_state: Schema.optional(Schema.String) })), moreFromSeries: Schema.optional(Schema.Struct({ opted_state: Schema.optional(Schema.String) })), rewardExpirations: Schema.optional(Schema.Struct({ opted_state: Schema.optional(Schema.String) })), priceDrop: Schema.optional(Schema.Struct({ opted_state: Schema.optional(Schema.String) })), matchMyInterests: Schema.optional(Schema.Struct({ opted_state: Schema.optional(Schema.String) })) })),
  notesExport: Schema.optional(Schema.Struct({ isEnabled: Schema.optional(Schema.Boolean), folderName: Schema.optional(Schema.String) })),
})).annotate({ identifier: "Usersettings" }) as any as Schema.Schema<Usersettings>;

export interface DownloadAccesses {
  /** A list of download access responses. */
  downloadAccessList?: Array<DownloadAccessRestriction>;
  /** Resource type. */
  kind?: string;
}

export const DownloadAccesses: Schema.Schema<DownloadAccesses> = Schema.suspend(() => Schema.Struct({
  downloadAccessList: Schema.optional(Schema.Array(DownloadAccessRestriction)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DownloadAccesses" }) as any as Schema.Schema<DownloadAccesses>;

export interface ConcurrentAccessRestriction {
  /** Whether access is granted for this (user, device, volume). */
  deviceAllowed?: boolean;
  /** Time in seconds for license auto-expiration. */
  timeWindowSeconds?: number;
  /** The maximum number of concurrent access licenses for this volume. */
  maxConcurrentDevices?: number;
  /** Error/warning reason code. */
  reasonCode?: string;
  /** Error/warning message. */
  message?: string;
  /** Identifies the volume for which this entry applies. */
  volumeId?: string;
  /** Whether this volume has any concurrent access restrictions. */
  restricted?: boolean;
  /** Client nonce for verification. Download access and client-validation only. */
  nonce?: string;
  /** Client app identifier for verification. Download access and client-validation only. */
  source?: string;
  /** Response signature. */
  signature?: string;
  /** Resource type. */
  kind?: string;
}

export const ConcurrentAccessRestriction: Schema.Schema<ConcurrentAccessRestriction> = Schema.suspend(() => Schema.Struct({
  deviceAllowed: Schema.optional(Schema.Boolean),
  timeWindowSeconds: Schema.optional(Schema.Number),
  maxConcurrentDevices: Schema.optional(Schema.Number),
  reasonCode: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  volumeId: Schema.optional(Schema.String),
  restricted: Schema.optional(Schema.Boolean),
  nonce: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ConcurrentAccessRestriction" }) as any as Schema.Schema<ConcurrentAccessRestriction>;

export interface RequestAccessData {
  /** A concurrent access response. */
  concurrentAccess?: ConcurrentAccessRestriction;
  /** A download access response. */
  downloadAccess?: DownloadAccessRestriction;
  /** Resource type. */
  kind?: string;
}

export const RequestAccessData: Schema.Schema<RequestAccessData> = Schema.suspend(() => Schema.Struct({
  concurrentAccess: Schema.optional(ConcurrentAccessRestriction),
  downloadAccess: Schema.optional(DownloadAccessRestriction),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "RequestAccessData" }) as any as Schema.Schema<RequestAccessData>;

export interface Annotation {
  /** Id of this annotation, in the form of a GUID. */
  id?: string;
  /** The volume that this annotation belongs to. */
  volumeId?: string;
  /** Selection ranges for the most recent content version. */
  currentVersionRanges?: { contentVersion?: string; gbImageRange?: BooksAnnotationsRange; gbTextRange?: BooksAnnotationsRange; cfiRange?: BooksAnnotationsRange; imageCfiRange?: BooksAnnotationsRange };
  /** Pages that this annotation spans. */
  pageIds?: Array<string>;
  /** Excerpt from the volume. */
  selectedText?: string;
  /** Anchor text before excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
  beforeSelectedText?: string;
  /** Anchor text after excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
  afterSelectedText?: string;
  /** User-created data for this annotation. */
  data?: string;
  /** Resource type. */
  kind?: string;
  /** URL to this resource. */
  selfLink?: string;
  layerSummary?: { remainingCharacterCount?: number; allowedCharacterCount?: number; limitType?: string };
  /** The highlight style for this annotation. */
  highlightStyle?: string;
  /** Timestamp for the last time this annotation was modified. */
  updated?: string;
  /** Timestamp for the created time of this annotation. */
  created?: string;
  /** The layer this annotation is for. */
  layerId?: string;
  /** Indicates that this annotation is deleted. */
  deleted?: boolean;
  /** Selection ranges sent from the client. */
  clientVersionRanges?: { gbImageRange?: BooksAnnotationsRange; gbTextRange?: BooksAnnotationsRange; cfiRange?: BooksAnnotationsRange; contentVersion?: string; imageCfiRange?: BooksAnnotationsRange };
}

export const Annotation: Schema.Schema<Annotation> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  volumeId: Schema.optional(Schema.String),
  currentVersionRanges: Schema.optional(Schema.Struct({ contentVersion: Schema.optional(Schema.String), gbImageRange: Schema.optional(BooksAnnotationsRange), gbTextRange: Schema.optional(BooksAnnotationsRange), cfiRange: Schema.optional(BooksAnnotationsRange), imageCfiRange: Schema.optional(BooksAnnotationsRange) })),
  pageIds: Schema.optional(Schema.Array(Schema.String)),
  selectedText: Schema.optional(Schema.String),
  beforeSelectedText: Schema.optional(Schema.String),
  afterSelectedText: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  layerSummary: Schema.optional(Schema.Struct({ remainingCharacterCount: Schema.optional(Schema.Number), allowedCharacterCount: Schema.optional(Schema.Number), limitType: Schema.optional(Schema.String) })),
  highlightStyle: Schema.optional(Schema.String),
  updated: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
  layerId: Schema.optional(Schema.String),
  deleted: Schema.optional(Schema.Boolean),
  clientVersionRanges: Schema.optional(Schema.Struct({ gbImageRange: Schema.optional(BooksAnnotationsRange), gbTextRange: Schema.optional(BooksAnnotationsRange), cfiRange: Schema.optional(BooksAnnotationsRange), contentVersion: Schema.optional(Schema.String), imageCfiRange: Schema.optional(BooksAnnotationsRange) })),
})).annotate({ identifier: "Annotation" }) as any as Schema.Schema<Annotation>;

export interface Annotations {
  /** Resource type. */
  kind?: string;
  /** A list of annotations. */
  items?: Array<Annotation>;
  /** Total number of annotations found. This may be greater than the number of notes returned in this response if results have been paginated. */
  totalItems?: number;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
}

export const Annotations: Schema.Schema<Annotations> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Annotation)),
  totalItems: Schema.optional(Schema.Number),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Annotations" }) as any as Schema.Schema<Annotations>;

export interface AnnotationsSummary {
  layers?: Array<{ layerId?: string; remainingCharacterCount?: number; allowedCharacterCount?: number; limitType?: string; updated?: string }>;
  kind?: string;
}

export const AnnotationsSummary: Schema.Schema<AnnotationsSummary> = Schema.suspend(() => Schema.Struct({
  layers: Schema.optional(Schema.Array(Schema.Struct({ layerId: Schema.optional(Schema.String), remainingCharacterCount: Schema.optional(Schema.Number), allowedCharacterCount: Schema.optional(Schema.Number), limitType: Schema.optional(Schema.String), updated: Schema.optional(Schema.String) }))),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AnnotationsSummary" }) as any as Schema.Schema<AnnotationsSummary>;

export interface Notification {
  /** Resource type. */
  kind?: string;
  title?: string;
  body?: string;
  iconUrl?: string;
  targetUrl?: string;
  notification_type?: string;
  show_notification_settings_action?: boolean;
  pcampaign_id?: string;
  dont_show_notification?: boolean;
  reason?: string;
  doc_type?: string;
  doc_id?: string;
  /** The list of crm experiment ids. */
  crmExperimentIds?: Array<string>;
  notificationGroup?: string;
  is_document_mature?: boolean;
  timeToExpireMs?: string;
}

export const Notification: Schema.Schema<Notification> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  iconUrl: Schema.optional(Schema.String),
  targetUrl: Schema.optional(Schema.String),
  notification_type: Schema.optional(Schema.String),
  show_notification_settings_action: Schema.optional(Schema.Boolean),
  pcampaign_id: Schema.optional(Schema.String),
  dont_show_notification: Schema.optional(Schema.Boolean),
  reason: Schema.optional(Schema.String),
  doc_type: Schema.optional(Schema.String),
  doc_id: Schema.optional(Schema.String),
  crmExperimentIds: Schema.optional(Schema.Array(Schema.String)),
  notificationGroup: Schema.optional(Schema.String),
  is_document_mature: Schema.optional(Schema.Boolean),
  timeToExpireMs: Schema.optional(Schema.String),
})).annotate({ identifier: "Notification" }) as any as Schema.Schema<Notification>;

export interface Category {
  /** Resource type. */
  kind?: string;
  /** A list of onboarding categories. */
  items?: Array<{ name?: string; categoryId?: string; badgeUrl?: string }>;
}

export const Category: Schema.Schema<Category> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Schema.Struct({ name: Schema.optional(Schema.String), categoryId: Schema.optional(Schema.String), badgeUrl: Schema.optional(Schema.String) }))),
})).annotate({ identifier: "Category" }) as any as Schema.Schema<Category>;

export interface Volume2 {
  /** Resource type. */
  kind?: string;
  /** A list of volumes. */
  items?: Array<Volume>;
  nextPageToken?: string;
}

export const Volume2: Schema.Schema<Volume2> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Volume)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Volume2" }) as any as Schema.Schema<Volume2>;

export interface Discoveryclusters {
  totalClusters?: number;
  /** Resorce type. */
  kind?: string;
  clusters?: Array<{ totalVolumes?: number; uid?: string; title?: string; subTitle?: string; volumes?: Array<Volume>; banner_with_content_container?: { imageUrl?: string; moreButtonUrl?: string; moreButtonText?: string; maskColorArgb?: string; fillColorArgb?: string; textColorArgb?: string } }>;
}

export const Discoveryclusters: Schema.Schema<Discoveryclusters> = Schema.suspend(() => Schema.Struct({
  totalClusters: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.String),
  clusters: Schema.optional(Schema.Array(Schema.Struct({ totalVolumes: Schema.optional(Schema.Number), uid: Schema.optional(Schema.String), title: Schema.optional(Schema.String), subTitle: Schema.optional(Schema.String), volumes: Schema.optional(Schema.Array(Volume)), banner_with_content_container: Schema.optional(Schema.Struct({ imageUrl: Schema.optional(Schema.String), moreButtonUrl: Schema.optional(Schema.String), moreButtonText: Schema.optional(Schema.String), maskColorArgb: Schema.optional(Schema.String), fillColorArgb: Schema.optional(Schema.String), textColorArgb: Schema.optional(Schema.String) })) }))),
})).annotate({ identifier: "Discoveryclusters" }) as any as Schema.Schema<Discoveryclusters>;

export interface Offers {
  /** Resource type. */
  kind?: string;
  /** A list of offers. */
  items?: Array<{ id?: string; artUrl?: string; items?: Array<{ volumeId?: string; canonicalVolumeLink?: string; coverUrl?: string; title?: string; author?: string; description?: string }>; gservicesKey?: string }>;
}

export const Offers: Schema.Schema<Offers> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(Schema.Struct({ id: Schema.optional(Schema.String), artUrl: Schema.optional(Schema.String), items: Schema.optional(Schema.Array(Schema.Struct({ volumeId: Schema.optional(Schema.String), canonicalVolumeLink: Schema.optional(Schema.String), coverUrl: Schema.optional(Schema.String), title: Schema.optional(Schema.String), author: Schema.optional(Schema.String), description: Schema.optional(Schema.String) }))), gservicesKey: Schema.optional(Schema.String) }))),
})).annotate({ identifier: "Offers" }) as any as Schema.Schema<Offers>;

export interface Series {
  series?: Array<{ seriesId?: string; title?: string; imageUrl?: string; bannerImageUrl?: string; seriesType?: string; eligibleForSubscription?: boolean; isComplete?: boolean; subscriptionId?: string; seriesSubscriptionReleaseInfo?: { seriesSubscriptionType?: string; currentReleaseInfo?: { releaseNumber?: string; releaseTime?: string; currencyCode?: string; amountInMicros?: number }; nextReleaseInfo?: { releaseNumber?: string; releaseTime?: string; currencyCode?: string; amountInMicros?: number }; cancelTime?: string }; seriesFormatType?: string }>;
  /** Resource type. */
  kind?: string;
}

export const Series: Schema.Schema<Series> = Schema.suspend(() => Schema.Struct({
  series: Schema.optional(Schema.Array(Schema.Struct({ seriesId: Schema.optional(Schema.String), title: Schema.optional(Schema.String), imageUrl: Schema.optional(Schema.String), bannerImageUrl: Schema.optional(Schema.String), seriesType: Schema.optional(Schema.String), eligibleForSubscription: Schema.optional(Schema.Boolean), isComplete: Schema.optional(Schema.Boolean), subscriptionId: Schema.optional(Schema.String), seriesSubscriptionReleaseInfo: Schema.optional(Schema.Struct({ seriesSubscriptionType: Schema.optional(Schema.String), currentReleaseInfo: Schema.optional(Schema.Struct({ releaseNumber: Schema.optional(Schema.String), releaseTime: Schema.optional(Schema.String), currencyCode: Schema.optional(Schema.String), amountInMicros: Schema.optional(Schema.Number) })), nextReleaseInfo: Schema.optional(Schema.Struct({ releaseNumber: Schema.optional(Schema.String), releaseTime: Schema.optional(Schema.String), currencyCode: Schema.optional(Schema.String), amountInMicros: Schema.optional(Schema.Number) })), cancelTime: Schema.optional(Schema.String) })), seriesFormatType: Schema.optional(Schema.String) }))),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Series" }) as any as Schema.Schema<Series>;

export interface Seriesmembership {
  member?: Array<Volume>;
  nextPageToken?: string;
  /** Resorce type. */
  kind?: string;
}

export const Seriesmembership: Schema.Schema<Seriesmembership> = Schema.suspend(() => Schema.Struct({
  member: Schema.optional(Schema.Array(Volume)),
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "Seriesmembership" }) as any as Schema.Schema<Seriesmembership>;

export interface BooksVolumesRecommendedRateResponse {
  consistency_token?: string;
}

export const BooksVolumesRecommendedRateResponse: Schema.Schema<BooksVolumesRecommendedRateResponse> = Schema.suspend(() => Schema.Struct({
  consistency_token: Schema.optional(Schema.String),
})).annotate({ identifier: "BooksVolumesRecommendedRateResponse" }) as any as Schema.Schema<BooksVolumesRecommendedRateResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Retrieves metadata for a specific bookshelf for the specified user. */
export interface GetBookshelvesRequest {
  /** ID of user for whom to retrieve bookshelves. */
  userId: string;
  /** ID of bookshelf to retrieve. */
  shelf: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetBookshelvesRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  shelf: Schema.String.pipe(T.HttpPath("shelf")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/users/{userId}/bookshelves/{shelf}" }),
  svc,
) as unknown as Schema.Schema<GetBookshelvesRequest>;

export type GetBookshelvesResponse = Bookshelf;
export const GetBookshelvesResponse = Bookshelf;

export type GetBookshelvesError = CommonErrors;

export const getBookshelves: API.OperationMethod<GetBookshelvesRequest, GetBookshelvesResponse, GetBookshelvesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBookshelvesRequest,
  output: GetBookshelvesResponse,
  errors: [],
}));

/** Retrieves a list of public bookshelves for the specified user. */
export interface ListBookshelvesRequest {
  /** ID of user for whom to retrieve bookshelves. */
  userId: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const ListBookshelvesRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/users/{userId}/bookshelves" }),
  svc,
) as unknown as Schema.Schema<ListBookshelvesRequest>;

export type ListBookshelvesResponse = Bookshelves;
export const ListBookshelvesResponse = Bookshelves;

export type ListBookshelvesError = CommonErrors;

export const listBookshelves: API.OperationMethod<ListBookshelvesRequest, ListBookshelvesResponse, ListBookshelvesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListBookshelvesRequest,
  output: ListBookshelvesResponse,
  errors: [],
}));

/** Retrieves volumes in a specific bookshelf for the specified user. */
export interface ListBookshelvesVolumesRequest {
  /** ID of user for whom to retrieve bookshelf volumes. */
  userId: string;
  /** ID of bookshelf to retrieve volumes. */
  shelf: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** Set to true to show pre-ordered books. Defaults to false. */
  showPreorders?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
  /** Index of the first element to return (starts at 0) */
  startIndex?: number;
}

export const ListBookshelvesVolumesRequest = Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  shelf: Schema.String.pipe(T.HttpPath("shelf")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  showPreorders: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showPreorders")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/users/{userId}/bookshelves/{shelf}/volumes" }),
  svc,
) as unknown as Schema.Schema<ListBookshelvesVolumesRequest>;

export type ListBookshelvesVolumesResponse = Volumes;
export const ListBookshelvesVolumesResponse = Volumes;

export type ListBookshelvesVolumesError = CommonErrors;

export const listBookshelvesVolumes: API.OperationMethod<ListBookshelvesVolumesRequest, ListBookshelvesVolumesResponse, ListBookshelvesVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListBookshelvesVolumesRequest,
  output: ListBookshelvesVolumesResponse,
  errors: [],
}));

/** Add a user-upload volume and triggers processing. */
export interface AddBookCloudloadingRequest {
  /** A drive document id. The upload_client_token must not be set. */
  drive_document_id?: string;
  /** The document MIME type. It can be set only if the drive_document_id is set. */
  mime_type?: string;
  /** The document name. It can be set only if the drive_document_id is set. */
  name?: string;
  /** Scotty upload token. */
  upload_client_token?: string;
}

export const AddBookCloudloadingRequest = Schema.Struct({
  drive_document_id: Schema.optional(Schema.String).pipe(T.HttpQuery("drive_document_id")),
  mime_type: Schema.optional(Schema.String).pipe(T.HttpQuery("mime_type")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  upload_client_token: Schema.optional(Schema.String).pipe(T.HttpQuery("upload_client_token")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/cloudloading/addBook", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddBookCloudloadingRequest>;

export type AddBookCloudloadingResponse = BooksCloudloadingResource;
export const AddBookCloudloadingResponse = BooksCloudloadingResource;

export type AddBookCloudloadingError = CommonErrors;

export const addBookCloudloading: API.OperationMethod<AddBookCloudloadingRequest, AddBookCloudloadingResponse, AddBookCloudloadingError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddBookCloudloadingRequest,
  output: AddBookCloudloadingResponse,
  errors: [],
}));

/** Remove the book and its contents */
export interface DeleteBookCloudloadingRequest {
  /** The id of the book to be removed. */
  volumeId: string;
}

export const DeleteBookCloudloadingRequest = Schema.Struct({
  volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/cloudloading/deleteBook", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteBookCloudloadingRequest>;

export type DeleteBookCloudloadingResponse = Empty;
export const DeleteBookCloudloadingResponse = Empty;

export type DeleteBookCloudloadingError = CommonErrors;

export const deleteBookCloudloading: API.OperationMethod<DeleteBookCloudloadingRequest, DeleteBookCloudloadingResponse, DeleteBookCloudloadingError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteBookCloudloadingRequest,
  output: DeleteBookCloudloadingResponse,
  errors: [],
}));

/** Updates a user-upload volume. */
export interface UpdateBookCloudloadingRequest {
  /** Request body */
  body?: BooksCloudloadingResource;
}

export const UpdateBookCloudloadingRequest = Schema.Struct({
  body: Schema.optional(BooksCloudloadingResource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/cloudloading/updateBook", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateBookCloudloadingRequest>;

export type UpdateBookCloudloadingResponse = BooksCloudloadingResource;
export const UpdateBookCloudloadingResponse = BooksCloudloadingResource;

export type UpdateBookCloudloadingError = CommonErrors;

export const updateBookCloudloading: API.OperationMethod<UpdateBookCloudloadingRequest, UpdateBookCloudloadingResponse, UpdateBookCloudloadingError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateBookCloudloadingRequest,
  output: UpdateBookCloudloadingResponse,
  errors: [],
}));

/** Returns a list of offline dictionary metadata available */
export interface ListOfflineMetadataDictionaryRequest {
  /** The device/version ID from which to request the data. */
  cpksver: string;
}

export const ListOfflineMetadataDictionaryRequest = Schema.Struct({
  cpksver: Schema.String.pipe(T.HttpQuery("cpksver")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/dictionary/listOfflineMetadata" }),
  svc,
) as unknown as Schema.Schema<ListOfflineMetadataDictionaryRequest>;

export type ListOfflineMetadataDictionaryResponse = Metadata;
export const ListOfflineMetadataDictionaryResponse = Metadata;

export type ListOfflineMetadataDictionaryError = CommonErrors;

export const listOfflineMetadataDictionary: API.OperationMethod<ListOfflineMetadataDictionaryRequest, ListOfflineMetadataDictionaryResponse, ListOfflineMetadataDictionaryError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListOfflineMetadataDictionaryRequest,
  output: ListOfflineMetadataDictionaryResponse,
  errors: [],
}));

/** Gets information regarding the family that the user is part of. */
export interface GetFamilyInfoFamilysharingRequest {
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetFamilyInfoFamilysharingRequest = Schema.Struct({
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/familysharing/getFamilyInfo" }),
  svc,
) as unknown as Schema.Schema<GetFamilyInfoFamilysharingRequest>;

export type GetFamilyInfoFamilysharingResponse = FamilyInfo;
export const GetFamilyInfoFamilysharingResponse = FamilyInfo;

export type GetFamilyInfoFamilysharingError = CommonErrors;

export const getFamilyInfoFamilysharing: API.OperationMethod<GetFamilyInfoFamilysharingRequest, GetFamilyInfoFamilysharingResponse, GetFamilyInfoFamilysharingError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFamilyInfoFamilysharingRequest,
  output: GetFamilyInfoFamilysharingResponse,
  errors: [],
}));

/** Initiates sharing of the content with the user's family. Empty response indicates success. */
export interface ShareFamilysharingRequest {
  /** The docid to share. */
  docId?: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** The volume to share. */
  volumeId?: string;
}

export const ShareFamilysharingRequest = Schema.Struct({
  docId: Schema.optional(Schema.String).pipe(T.HttpQuery("docId")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  volumeId: Schema.optional(Schema.String).pipe(T.HttpQuery("volumeId")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/familysharing/share", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ShareFamilysharingRequest>;

export type ShareFamilysharingResponse = Empty;
export const ShareFamilysharingResponse = Empty;

export type ShareFamilysharingError = CommonErrors;

export const shareFamilysharing: API.OperationMethod<ShareFamilysharingRequest, ShareFamilysharingResponse, ShareFamilysharingError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ShareFamilysharingRequest,
  output: ShareFamilysharingResponse,
  errors: [],
}));

/** Initiates revoking content that has already been shared with the user's family. Empty response indicates success. */
export interface UnshareFamilysharingRequest {
  /** The docid to unshare. */
  docId?: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** The volume to unshare. */
  volumeId?: string;
}

export const UnshareFamilysharingRequest = Schema.Struct({
  docId: Schema.optional(Schema.String).pipe(T.HttpQuery("docId")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  volumeId: Schema.optional(Schema.String).pipe(T.HttpQuery("volumeId")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/familysharing/unshare", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnshareFamilysharingRequest>;

export type UnshareFamilysharingResponse = Empty;
export const UnshareFamilysharingResponse = Empty;

export type UnshareFamilysharingError = CommonErrors;

export const unshareFamilysharing: API.OperationMethod<UnshareFamilysharingRequest, UnshareFamilysharingResponse, UnshareFamilysharingError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnshareFamilysharingRequest,
  output: UnshareFamilysharingResponse,
  errors: [],
}));

/** Gets the layer summary for a volume. */
export interface GetLayersRequest {
  /** The volume to retrieve layers for. */
  volumeId: string;
  /** The ID for the layer to get the summary for. */
  summaryId: string;
  /** The content version for the requested volume. */
  contentVersion?: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetLayersRequest = Schema.Struct({
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  summaryId: Schema.String.pipe(T.HttpPath("summaryId")),
  contentVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("contentVersion")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/{volumeId}/layersummary/{summaryId}" }),
  svc,
) as unknown as Schema.Schema<GetLayersRequest>;

export type GetLayersResponse = Layersummary;
export const GetLayersResponse = Layersummary;

export type GetLayersError = CommonErrors;

export const getLayers: API.OperationMethod<GetLayersRequest, GetLayersResponse, GetLayersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLayersRequest,
  output: GetLayersResponse,
  errors: [],
}));

/** List the layer summaries for a volume. */
export interface ListLayersRequest {
  /** The volume to retrieve layers for. */
  volumeId: string;
  /** The content version for the requested volume. */
  contentVersion?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const ListLayersRequest = Schema.Struct({
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  contentVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("contentVersion")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/{volumeId}/layersummary" }),
  svc,
) as unknown as Schema.Schema<ListLayersRequest>;

export type ListLayersResponse = Layersummaries;
export const ListLayersResponse = Layersummaries;

export type ListLayersError = CommonErrors;

export const listLayers: API.OperationMethod<ListLayersRequest, ListLayersResponse, ListLayersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListLayersRequest,
  output: ListLayersResponse,
  errors: [],
}));

/** Gets the annotation data. */
export interface GetLayersAnnotationDataRequest {
  /** The volume to retrieve annotations for. */
  volumeId: string;
  /** The ID for the layer to get the annotations. */
  layerId: string;
  /** The ID of the annotation data to retrieve. */
  annotationDataId: string;
  /** For the dictionary layer. Whether or not to allow web definitions. */
  allowWebDefinitions?: boolean;
  /** The content version for the volume you are trying to retrieve. */
  contentVersion: string;
  /** The requested pixel height for any images. If height is provided width must also be provided. */
  h?: number;
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** The requested scale for the image. */
  scale?: number;
  /** String to identify the originator of this request. */
  source?: string;
  /** The requested pixel width for any images. If width is provided height must also be provided. */
  w?: number;
}

export const GetLayersAnnotationDataRequest = Schema.Struct({
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  layerId: Schema.String.pipe(T.HttpPath("layerId")),
  annotationDataId: Schema.String.pipe(T.HttpPath("annotationDataId")),
  allowWebDefinitions: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowWebDefinitions")),
  contentVersion: Schema.String.pipe(T.HttpQuery("contentVersion")),
  h: Schema.optional(Schema.Number).pipe(T.HttpQuery("h")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  scale: Schema.optional(Schema.Number).pipe(T.HttpQuery("scale")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  w: Schema.optional(Schema.Number).pipe(T.HttpQuery("w")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/{volumeId}/layers/{layerId}/data/{annotationDataId}" }),
  svc,
) as unknown as Schema.Schema<GetLayersAnnotationDataRequest>;

export type GetLayersAnnotationDataResponse = DictionaryAnnotationdata;
export const GetLayersAnnotationDataResponse = DictionaryAnnotationdata;

export type GetLayersAnnotationDataError = CommonErrors;

export const getLayersAnnotationData: API.OperationMethod<GetLayersAnnotationDataRequest, GetLayersAnnotationDataResponse, GetLayersAnnotationDataError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLayersAnnotationDataRequest,
  output: GetLayersAnnotationDataResponse,
  errors: [],
}));

/** Gets the annotation data for a volume and layer. */
export interface ListLayersAnnotationDataRequest {
  /** The volume to retrieve annotation data for. */
  volumeId: string;
  /** The ID for the layer to get the annotation data. */
  layerId: string;
  /** The list of Annotation Data Ids to retrieve. Pagination is ignored if this is set. */
  annotationDataId?: string[];
  /** The content version for the requested volume. */
  contentVersion: string;
  /** The requested pixel height for any images. If height is provided width must also be provided. */
  h?: number;
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** The requested scale for the image. */
  scale?: number;
  /** String to identify the originator of this request. */
  source?: string;
  /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
  updatedMax?: string;
  /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
  updatedMin?: string;
  /** The requested pixel width for any images. If width is provided height must also be provided. */
  w?: number;
}

export const ListLayersAnnotationDataRequest = Schema.Struct({
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  layerId: Schema.String.pipe(T.HttpPath("layerId")),
  annotationDataId: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("annotationDataId")),
  contentVersion: Schema.String.pipe(T.HttpQuery("contentVersion")),
  h: Schema.optional(Schema.Number).pipe(T.HttpQuery("h")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  scale: Schema.optional(Schema.Number).pipe(T.HttpQuery("scale")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  updatedMax: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMax")),
  updatedMin: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMin")),
  w: Schema.optional(Schema.Number).pipe(T.HttpQuery("w")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/{volumeId}/layers/{layerId}/data" }),
  svc,
) as unknown as Schema.Schema<ListLayersAnnotationDataRequest>;

export type ListLayersAnnotationDataResponse = Annotationsdata;
export const ListLayersAnnotationDataResponse = Annotationsdata;

export type ListLayersAnnotationDataError = CommonErrors;

export const listLayersAnnotationData = API.makePaginated(() => ({
  input: ListLayersAnnotationDataRequest,
  output: ListLayersAnnotationDataResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Gets the volume annotation. */
export interface GetLayersVolumeAnnotationsRequest {
  /** The volume to retrieve annotations for. */
  volumeId: string;
  /** The ID for the layer to get the annotations. */
  layerId: string;
  /** The ID of the volume annotation to retrieve. */
  annotationId: string;
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetLayersVolumeAnnotationsRequest = Schema.Struct({
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  layerId: Schema.String.pipe(T.HttpPath("layerId")),
  annotationId: Schema.String.pipe(T.HttpPath("annotationId")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/{volumeId}/layers/{layerId}/annotations/{annotationId}" }),
  svc,
) as unknown as Schema.Schema<GetLayersVolumeAnnotationsRequest>;

export type GetLayersVolumeAnnotationsResponse = Volumeannotation;
export const GetLayersVolumeAnnotationsResponse = Volumeannotation;

export type GetLayersVolumeAnnotationsError = CommonErrors;

export const getLayersVolumeAnnotations: API.OperationMethod<GetLayersVolumeAnnotationsRequest, GetLayersVolumeAnnotationsResponse, GetLayersVolumeAnnotationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLayersVolumeAnnotationsRequest,
  output: GetLayersVolumeAnnotationsResponse,
  errors: [],
}));

/** Gets the volume annotations for a volume and layer. */
export interface ListLayersVolumeAnnotationsRequest {
  /** The volume to retrieve annotations for. */
  volumeId: string;
  /** The ID for the layer to get the annotations. */
  layerId: string;
  /** The content version for the requested volume. */
  contentVersion: string;
  /** The end offset to end retrieving data from. */
  endOffset?: string;
  /** The end position to end retrieving data from. */
  endPosition?: string;
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false. */
  showDeleted?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
  /** The start offset to start retrieving data from. */
  startOffset?: string;
  /** The start position to start retrieving data from. */
  startPosition?: string;
  /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
  updatedMax?: string;
  /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
  updatedMin?: string;
  /** The version of the volume annotations that you are requesting. */
  volumeAnnotationsVersion?: string;
}

export const ListLayersVolumeAnnotationsRequest = Schema.Struct({
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  layerId: Schema.String.pipe(T.HttpPath("layerId")),
  contentVersion: Schema.String.pipe(T.HttpQuery("contentVersion")),
  endOffset: Schema.optional(Schema.String).pipe(T.HttpQuery("endOffset")),
  endPosition: Schema.optional(Schema.String).pipe(T.HttpQuery("endPosition")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  startOffset: Schema.optional(Schema.String).pipe(T.HttpQuery("startOffset")),
  startPosition: Schema.optional(Schema.String).pipe(T.HttpQuery("startPosition")),
  updatedMax: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMax")),
  updatedMin: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMin")),
  volumeAnnotationsVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("volumeAnnotationsVersion")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/{volumeId}/layers/{layerId}" }),
  svc,
) as unknown as Schema.Schema<ListLayersVolumeAnnotationsRequest>;

export type ListLayersVolumeAnnotationsResponse = Volumeannotations;
export const ListLayersVolumeAnnotationsResponse = Volumeannotations;

export type ListLayersVolumeAnnotationsError = CommonErrors;

export const listLayersVolumeAnnotations = API.makePaginated(() => ({
  input: ListLayersVolumeAnnotationsRequest,
  output: ListLayersVolumeAnnotationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Gets the current settings for the user. */
export interface GetUserSettingsMyconfigRequest {
  /** Unused. Added only to workaround TEX mandatory request template requirement */
  country?: string;
}

export const GetUserSettingsMyconfigRequest = Schema.Struct({
  country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/myconfig/getUserSettings" }),
  svc,
) as unknown as Schema.Schema<GetUserSettingsMyconfigRequest>;

export type GetUserSettingsMyconfigResponse = Usersettings;
export const GetUserSettingsMyconfigResponse = Usersettings;

export type GetUserSettingsMyconfigError = CommonErrors;

export const getUserSettingsMyconfig: API.OperationMethod<GetUserSettingsMyconfigRequest, GetUserSettingsMyconfigResponse, GetUserSettingsMyconfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserSettingsMyconfigRequest,
  output: GetUserSettingsMyconfigResponse,
  errors: [],
}));

/** Release downloaded content access restriction. */
export interface ReleaseDownloadAccessMyconfigRequest {
  /** The device/version ID from which to release the restriction. */
  cpksver: string;
  /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
  locale?: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** The volume(s) to release restrictions for. */
  volumeIds: string[];
}

export const ReleaseDownloadAccessMyconfigRequest = Schema.Struct({
  cpksver: Schema.String.pipe(T.HttpQuery("cpksver")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  volumeIds: Schema.Array(Schema.String).pipe(T.HttpQuery("volumeIds")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/myconfig/releaseDownloadAccess", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReleaseDownloadAccessMyconfigRequest>;

export type ReleaseDownloadAccessMyconfigResponse = DownloadAccesses;
export const ReleaseDownloadAccessMyconfigResponse = DownloadAccesses;

export type ReleaseDownloadAccessMyconfigError = CommonErrors;

export const releaseDownloadAccessMyconfig: API.OperationMethod<ReleaseDownloadAccessMyconfigRequest, ReleaseDownloadAccessMyconfigResponse, ReleaseDownloadAccessMyconfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReleaseDownloadAccessMyconfigRequest,
  output: ReleaseDownloadAccessMyconfigResponse,
  errors: [],
}));

/** Request concurrent and download access restrictions. */
export interface RequestAccessMyconfigRequest {
  /** The device/version ID from which to request the restrictions. */
  cpksver: string;
  /** The type of access license to request. If not specified, the default is BOTH. */
  licenseTypes?: "LICENSE_TYPES_UNDEFINED" | "BOTH" | "CONCURRENT" | "DOWNLOAD" | (string & {});
  /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
  locale?: string;
  /** The client nonce value. */
  nonce: string;
  /** String to identify the originator of this request. */
  source: string;
  /** The volume to request concurrent/download restrictions for. */
  volumeId: string;
}

export const RequestAccessMyconfigRequest = Schema.Struct({
  cpksver: Schema.String.pipe(T.HttpQuery("cpksver")),
  licenseTypes: Schema.optional(Schema.String).pipe(T.HttpQuery("licenseTypes")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  nonce: Schema.String.pipe(T.HttpQuery("nonce")),
  source: Schema.String.pipe(T.HttpQuery("source")),
  volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/myconfig/requestAccess", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RequestAccessMyconfigRequest>;

export type RequestAccessMyconfigResponse = RequestAccessData;
export const RequestAccessMyconfigResponse = RequestAccessData;

export type RequestAccessMyconfigError = CommonErrors;

export const requestAccessMyconfig: API.OperationMethod<RequestAccessMyconfigRequest, RequestAccessMyconfigResponse, RequestAccessMyconfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RequestAccessMyconfigRequest,
  output: RequestAccessMyconfigResponse,
  errors: [],
}));

/** Request downloaded content access for specified volumes on the My eBooks shelf. */
export interface SyncVolumeLicensesMyconfigRequest {
  /** The device/version ID from which to release the restriction. */
  cpksver: string;
  /** List of features supported by the client, i.e., 'RENTALS' */
  features?: "FEATURES_UNDEFINED" | "RENTALS" | (string & {})[];
  /** Set to true to include non-comics series. Defaults to false. */
  includeNonComicsSeries?: boolean;
  /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
  locale?: string;
  /** The client nonce value. */
  nonce: string;
  /** Set to true to show pre-ordered books. Defaults to false. */
  showPreorders?: boolean;
  /** String to identify the originator of this request. */
  source: string;
  /** The volume(s) to request download restrictions for. */
  volumeIds?: string[];
}

export const SyncVolumeLicensesMyconfigRequest = Schema.Struct({
  cpksver: Schema.String.pipe(T.HttpQuery("cpksver")),
  features: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("features")),
  includeNonComicsSeries: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeNonComicsSeries")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  nonce: Schema.String.pipe(T.HttpQuery("nonce")),
  showPreorders: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showPreorders")),
  source: Schema.String.pipe(T.HttpQuery("source")),
  volumeIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("volumeIds")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/myconfig/syncVolumeLicenses", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SyncVolumeLicensesMyconfigRequest>;

export type SyncVolumeLicensesMyconfigResponse = Volumes;
export const SyncVolumeLicensesMyconfigResponse = Volumes;

export type SyncVolumeLicensesMyconfigError = CommonErrors;

export const syncVolumeLicensesMyconfig: API.OperationMethod<SyncVolumeLicensesMyconfigRequest, SyncVolumeLicensesMyconfigResponse, SyncVolumeLicensesMyconfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SyncVolumeLicensesMyconfigRequest,
  output: SyncVolumeLicensesMyconfigResponse,
  errors: [],
}));

/** Sets the settings for the user. If a sub-object is specified, it will overwrite the existing sub-object stored in the server. Unspecified sub-objects will retain the existing value. */
export interface UpdateUserSettingsMyconfigRequest {
  /** Request body */
  body?: Usersettings;
}

export const UpdateUserSettingsMyconfigRequest = Schema.Struct({
  body: Schema.optional(Usersettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/myconfig/updateUserSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateUserSettingsMyconfigRequest>;

export type UpdateUserSettingsMyconfigResponse = Usersettings;
export const UpdateUserSettingsMyconfigResponse = Usersettings;

export type UpdateUserSettingsMyconfigError = CommonErrors;

export const updateUserSettingsMyconfig: API.OperationMethod<UpdateUserSettingsMyconfigRequest, UpdateUserSettingsMyconfigResponse, UpdateUserSettingsMyconfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateUserSettingsMyconfigRequest,
  output: UpdateUserSettingsMyconfigResponse,
  errors: [],
}));

/** Deletes an annotation. */
export interface DeleteMylibraryAnnotationsRequest {
  /** The ID for the annotation to delete. */
  annotationId: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const DeleteMylibraryAnnotationsRequest = Schema.Struct({
  annotationId: Schema.String.pipe(T.HttpPath("annotationId")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "DELETE", path: "books/v1/mylibrary/annotations/{annotationId}" }),
  svc,
) as unknown as Schema.Schema<DeleteMylibraryAnnotationsRequest>;

export type DeleteMylibraryAnnotationsResponse = Empty;
export const DeleteMylibraryAnnotationsResponse = Empty;

export type DeleteMylibraryAnnotationsError = CommonErrors;

export const deleteMylibraryAnnotations: API.OperationMethod<DeleteMylibraryAnnotationsRequest, DeleteMylibraryAnnotationsResponse, DeleteMylibraryAnnotationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteMylibraryAnnotationsRequest,
  output: DeleteMylibraryAnnotationsResponse,
  errors: [],
}));

/** Inserts a new annotation. */
export interface InsertMylibraryAnnotationsRequest {
  /** The ID for the annotation to insert. */
  annotationId?: string;
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
  /** Requests that only the summary of the specified layer be provided in the response. */
  showOnlySummaryInResponse?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
  /** Request body */
  body?: Annotation;
}

export const InsertMylibraryAnnotationsRequest = Schema.Struct({
  annotationId: Schema.optional(Schema.String).pipe(T.HttpQuery("annotationId")),
  country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
  showOnlySummaryInResponse: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showOnlySummaryInResponse")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  body: Schema.optional(Annotation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/mylibrary/annotations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertMylibraryAnnotationsRequest>;

export type InsertMylibraryAnnotationsResponse = Annotation;
export const InsertMylibraryAnnotationsResponse = Annotation;

export type InsertMylibraryAnnotationsError = CommonErrors;

export const insertMylibraryAnnotations: API.OperationMethod<InsertMylibraryAnnotationsRequest, InsertMylibraryAnnotationsResponse, InsertMylibraryAnnotationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertMylibraryAnnotationsRequest,
  output: InsertMylibraryAnnotationsResponse,
  errors: [],
}));

/** Retrieves a list of annotations, possibly filtered. */
export interface ListMylibraryAnnotationsRequest {
  /** The content version for the requested volume. */
  contentVersion?: string;
  /** The layer ID to limit annotation by. */
  layerId?: string;
  /** The layer ID(s) to limit annotation by. */
  layerIds?: string[];
  /** Maximum number of results to return */
  maxResults?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false. */
  showDeleted?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
  /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
  updatedMax?: string;
  /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
  updatedMin?: string;
  /** The volume to restrict annotations to. */
  volumeId?: string;
}

export const ListMylibraryAnnotationsRequest = Schema.Struct({
  contentVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("contentVersion")),
  layerId: Schema.optional(Schema.String).pipe(T.HttpQuery("layerId")),
  layerIds: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("layerIds")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  updatedMax: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMax")),
  updatedMin: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMin")),
  volumeId: Schema.optional(Schema.String).pipe(T.HttpQuery("volumeId")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/mylibrary/annotations" }),
  svc,
) as unknown as Schema.Schema<ListMylibraryAnnotationsRequest>;

export type ListMylibraryAnnotationsResponse = Annotations;
export const ListMylibraryAnnotationsResponse = Annotations;

export type ListMylibraryAnnotationsError = CommonErrors;

export const listMylibraryAnnotations = API.makePaginated(() => ({
  input: ListMylibraryAnnotationsRequest,
  output: ListMylibraryAnnotationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Gets the summary of specified layers. */
export interface SummaryMylibraryAnnotationsRequest {
  /** Array of layer IDs to get the summary for. */
  layerIds: string[];
  /** Volume id to get the summary for. */
  volumeId: string;
  /** Optional. String to identify the originator of this request. */
  source?: string;
}

export const SummaryMylibraryAnnotationsRequest = Schema.Struct({
  layerIds: Schema.Array(Schema.String).pipe(T.HttpQuery("layerIds")),
  volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/mylibrary/annotations/summary", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SummaryMylibraryAnnotationsRequest>;

export type SummaryMylibraryAnnotationsResponse = AnnotationsSummary;
export const SummaryMylibraryAnnotationsResponse = AnnotationsSummary;

export type SummaryMylibraryAnnotationsError = CommonErrors;

export const summaryMylibraryAnnotations: API.OperationMethod<SummaryMylibraryAnnotationsRequest, SummaryMylibraryAnnotationsResponse, SummaryMylibraryAnnotationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SummaryMylibraryAnnotationsRequest,
  output: SummaryMylibraryAnnotationsResponse,
  errors: [],
}));

/** Updates an existing annotation. */
export interface UpdateMylibraryAnnotationsRequest {
  /** The ID for the annotation to update. */
  annotationId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** Request body */
  body?: Annotation;
}

export const UpdateMylibraryAnnotationsRequest = Schema.Struct({
  annotationId: Schema.String.pipe(T.HttpPath("annotationId")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  body: Schema.optional(Annotation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "books/v1/mylibrary/annotations/{annotationId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateMylibraryAnnotationsRequest>;

export type UpdateMylibraryAnnotationsResponse = Annotation;
export const UpdateMylibraryAnnotationsResponse = Annotation;

export type UpdateMylibraryAnnotationsError = CommonErrors;

export const updateMylibraryAnnotations: API.OperationMethod<UpdateMylibraryAnnotationsRequest, UpdateMylibraryAnnotationsResponse, UpdateMylibraryAnnotationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateMylibraryAnnotationsRequest,
  output: UpdateMylibraryAnnotationsResponse,
  errors: [],
}));

/** Adds a volume to a bookshelf. */
export interface AddVolumeMylibraryBookshelvesRequest {
  /** ID of bookshelf to which to add a volume. */
  shelf: string;
  /** The reason for which the book is added to the library. */
  reason?: "REASON_UNDEFINED" | "IOS_PREX" | "IOS_SEARCH" | "ONBOARDING" | (string & {});
  /** String to identify the originator of this request. */
  source?: string;
  /** ID of volume to add. */
  volumeId: string;
}

export const AddVolumeMylibraryBookshelvesRequest = Schema.Struct({
  shelf: Schema.String.pipe(T.HttpPath("shelf")),
  reason: Schema.optional(Schema.String).pipe(T.HttpQuery("reason")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/mylibrary/bookshelves/{shelf}/addVolume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddVolumeMylibraryBookshelvesRequest>;

export type AddVolumeMylibraryBookshelvesResponse = Empty;
export const AddVolumeMylibraryBookshelvesResponse = Empty;

export type AddVolumeMylibraryBookshelvesError = CommonErrors;

export const addVolumeMylibraryBookshelves: API.OperationMethod<AddVolumeMylibraryBookshelvesRequest, AddVolumeMylibraryBookshelvesResponse, AddVolumeMylibraryBookshelvesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddVolumeMylibraryBookshelvesRequest,
  output: AddVolumeMylibraryBookshelvesResponse,
  errors: [],
}));

/** Clears all volumes from a bookshelf. */
export interface ClearVolumesMylibraryBookshelvesRequest {
  /** ID of bookshelf from which to remove a volume. */
  shelf: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const ClearVolumesMylibraryBookshelvesRequest = Schema.Struct({
  shelf: Schema.String.pipe(T.HttpPath("shelf")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/mylibrary/bookshelves/{shelf}/clearVolumes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClearVolumesMylibraryBookshelvesRequest>;

export type ClearVolumesMylibraryBookshelvesResponse = Empty;
export const ClearVolumesMylibraryBookshelvesResponse = Empty;

export type ClearVolumesMylibraryBookshelvesError = CommonErrors;

export const clearVolumesMylibraryBookshelves: API.OperationMethod<ClearVolumesMylibraryBookshelvesRequest, ClearVolumesMylibraryBookshelvesResponse, ClearVolumesMylibraryBookshelvesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClearVolumesMylibraryBookshelvesRequest,
  output: ClearVolumesMylibraryBookshelvesResponse,
  errors: [],
}));

/** Retrieves metadata for a specific bookshelf belonging to the authenticated user. */
export interface GetMylibraryBookshelvesRequest {
  /** ID of bookshelf to retrieve. */
  shelf: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetMylibraryBookshelvesRequest = Schema.Struct({
  shelf: Schema.String.pipe(T.HttpPath("shelf")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/mylibrary/bookshelves/{shelf}" }),
  svc,
) as unknown as Schema.Schema<GetMylibraryBookshelvesRequest>;

export type GetMylibraryBookshelvesResponse = Bookshelf;
export const GetMylibraryBookshelvesResponse = Bookshelf;

export type GetMylibraryBookshelvesError = CommonErrors;

export const getMylibraryBookshelves: API.OperationMethod<GetMylibraryBookshelvesRequest, GetMylibraryBookshelvesResponse, GetMylibraryBookshelvesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMylibraryBookshelvesRequest,
  output: GetMylibraryBookshelvesResponse,
  errors: [],
}));

/** Retrieves a list of bookshelves belonging to the authenticated user. */
export interface ListMylibraryBookshelvesRequest {
  /** String to identify the originator of this request. */
  source?: string;
}

export const ListMylibraryBookshelvesRequest = Schema.Struct({
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/mylibrary/bookshelves" }),
  svc,
) as unknown as Schema.Schema<ListMylibraryBookshelvesRequest>;

export type ListMylibraryBookshelvesResponse = Bookshelves;
export const ListMylibraryBookshelvesResponse = Bookshelves;

export type ListMylibraryBookshelvesError = CommonErrors;

export const listMylibraryBookshelves: API.OperationMethod<ListMylibraryBookshelvesRequest, ListMylibraryBookshelvesResponse, ListMylibraryBookshelvesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListMylibraryBookshelvesRequest,
  output: ListMylibraryBookshelvesResponse,
  errors: [],
}));

/** Moves a volume within a bookshelf. */
export interface MoveVolumeMylibraryBookshelvesRequest {
  /** ID of bookshelf with the volume. */
  shelf: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** ID of volume to move. */
  volumeId: string;
  /** Position on shelf to move the item (0 puts the item before the current first item, 1 puts it between the first and the second and so on.) */
  volumePosition: number;
}

export const MoveVolumeMylibraryBookshelvesRequest = Schema.Struct({
  shelf: Schema.String.pipe(T.HttpPath("shelf")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
  volumePosition: Schema.Number.pipe(T.HttpQuery("volumePosition")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/mylibrary/bookshelves/{shelf}/moveVolume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveVolumeMylibraryBookshelvesRequest>;

export type MoveVolumeMylibraryBookshelvesResponse = Empty;
export const MoveVolumeMylibraryBookshelvesResponse = Empty;

export type MoveVolumeMylibraryBookshelvesError = CommonErrors;

export const moveVolumeMylibraryBookshelves: API.OperationMethod<MoveVolumeMylibraryBookshelvesRequest, MoveVolumeMylibraryBookshelvesResponse, MoveVolumeMylibraryBookshelvesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveVolumeMylibraryBookshelvesRequest,
  output: MoveVolumeMylibraryBookshelvesResponse,
  errors: [],
}));

/** Removes a volume from a bookshelf. */
export interface RemoveVolumeMylibraryBookshelvesRequest {
  /** ID of bookshelf from which to remove a volume. */
  shelf: string;
  /** The reason for which the book is removed from the library. */
  reason?: "REASON_UNDEFINED" | "ONBOARDING" | (string & {});
  /** String to identify the originator of this request. */
  source?: string;
  /** ID of volume to remove. */
  volumeId: string;
}

export const RemoveVolumeMylibraryBookshelvesRequest = Schema.Struct({
  shelf: Schema.String.pipe(T.HttpPath("shelf")),
  reason: Schema.optional(Schema.String).pipe(T.HttpQuery("reason")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/mylibrary/bookshelves/{shelf}/removeVolume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveVolumeMylibraryBookshelvesRequest>;

export type RemoveVolumeMylibraryBookshelvesResponse = Empty;
export const RemoveVolumeMylibraryBookshelvesResponse = Empty;

export type RemoveVolumeMylibraryBookshelvesError = CommonErrors;

export const removeVolumeMylibraryBookshelves: API.OperationMethod<RemoveVolumeMylibraryBookshelvesRequest, RemoveVolumeMylibraryBookshelvesResponse, RemoveVolumeMylibraryBookshelvesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveVolumeMylibraryBookshelvesRequest,
  output: RemoveVolumeMylibraryBookshelvesResponse,
  errors: [],
}));

/** Gets volume information for volumes on a bookshelf. */
export interface ListMylibraryBookshelvesVolumesRequest {
  /** The bookshelf ID or name retrieve volumes for. */
  shelf: string;
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** Restrict information returned to a set of selected fields. */
  projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE" | (string & {});
  /** Full-text search query string in this bookshelf. */
  q?: string;
  /** Set to true to show pre-ordered books. Defaults to false. */
  showPreorders?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
  /** Index of the first element to return (starts at 0) */
  startIndex?: number;
}

export const ListMylibraryBookshelvesVolumesRequest = Schema.Struct({
  shelf: Schema.String.pipe(T.HttpPath("shelf")),
  country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  showPreorders: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showPreorders")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/mylibrary/bookshelves/{shelf}/volumes" }),
  svc,
) as unknown as Schema.Schema<ListMylibraryBookshelvesVolumesRequest>;

export type ListMylibraryBookshelvesVolumesResponse = Volumes;
export const ListMylibraryBookshelvesVolumesResponse = Volumes;

export type ListMylibraryBookshelvesVolumesError = CommonErrors;

export const listMylibraryBookshelvesVolumes: API.OperationMethod<ListMylibraryBookshelvesVolumesRequest, ListMylibraryBookshelvesVolumesResponse, ListMylibraryBookshelvesVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListMylibraryBookshelvesVolumesRequest,
  output: ListMylibraryBookshelvesVolumesResponse,
  errors: [],
}));

/** Retrieves my reading position information for a volume. */
export interface GetMylibraryReadingpositionsRequest {
  /** ID of volume for which to retrieve a reading position. */
  volumeId: string;
  /** Volume content version for which this reading position is requested. */
  contentVersion?: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetMylibraryReadingpositionsRequest = Schema.Struct({
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  contentVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("contentVersion")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/mylibrary/readingpositions/{volumeId}" }),
  svc,
) as unknown as Schema.Schema<GetMylibraryReadingpositionsRequest>;

export type GetMylibraryReadingpositionsResponse = ReadingPosition;
export const GetMylibraryReadingpositionsResponse = ReadingPosition;

export type GetMylibraryReadingpositionsError = CommonErrors;

export const getMylibraryReadingpositions: API.OperationMethod<GetMylibraryReadingpositionsRequest, GetMylibraryReadingpositionsResponse, GetMylibraryReadingpositionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMylibraryReadingpositionsRequest,
  output: GetMylibraryReadingpositionsResponse,
  errors: [],
}));

/** Sets my reading position information for a volume. */
export interface SetPositionMylibraryReadingpositionsRequest {
  /** ID of volume for which to update the reading position. */
  volumeId: string;
  /** Action that caused this reading position to be set. */
  action?: "ACTION_UNDEFINED" | "bookmark" | "chapter" | "next-page" | "prev-page" | "scroll" | "search" | (string & {});
  /** Volume content version for which this reading position applies. */
  contentVersion?: string;
  /** Random persistent device cookie optional on set position. */
  deviceCookie?: string;
  /** Position string for the new volume reading position. */
  position: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** RFC 3339 UTC format timestamp associated with this reading position. */
  timestamp: string;
}

export const SetPositionMylibraryReadingpositionsRequest = Schema.Struct({
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  action: Schema.optional(Schema.String).pipe(T.HttpQuery("action")),
  contentVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("contentVersion")),
  deviceCookie: Schema.optional(Schema.String).pipe(T.HttpQuery("deviceCookie")),
  position: Schema.String.pipe(T.HttpQuery("position")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  timestamp: Schema.String.pipe(T.HttpQuery("timestamp")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/mylibrary/readingpositions/{volumeId}/setPosition", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetPositionMylibraryReadingpositionsRequest>;

export type SetPositionMylibraryReadingpositionsResponse = Empty;
export const SetPositionMylibraryReadingpositionsResponse = Empty;

export type SetPositionMylibraryReadingpositionsError = CommonErrors;

export const setPositionMylibraryReadingpositions: API.OperationMethod<SetPositionMylibraryReadingpositionsRequest, SetPositionMylibraryReadingpositionsResponse, SetPositionMylibraryReadingpositionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetPositionMylibraryReadingpositionsRequest,
  output: SetPositionMylibraryReadingpositionsResponse,
  errors: [],
}));

/** Returns notification details for a given notification id. */
export interface GetNotificationRequest {
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating notification title and body. */
  locale?: string;
  /** String to identify the notification. */
  notification_id: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetNotificationRequest = Schema.Struct({
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  notification_id: Schema.String.pipe(T.HttpQuery("notification_id")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/notification/get" }),
  svc,
) as unknown as Schema.Schema<GetNotificationRequest>;

export type GetNotificationResponse = Notification;
export const GetNotificationResponse = Notification;

export type GetNotificationError = CommonErrors;

export const getNotification: API.OperationMethod<GetNotificationRequest, GetNotificationResponse, GetNotificationError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNotificationRequest,
  output: GetNotificationResponse,
  errors: [],
}));

/** List categories for onboarding experience. */
export interface ListCategoriesOnboardingRequest {
  /** ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset. */
  locale?: string;
}

export const ListCategoriesOnboardingRequest = Schema.Struct({
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/onboarding/listCategories" }),
  svc,
) as unknown as Schema.Schema<ListCategoriesOnboardingRequest>;

export type ListCategoriesOnboardingResponse = Category;
export const ListCategoriesOnboardingResponse = Category;

export type ListCategoriesOnboardingError = CommonErrors;

export const listCategoriesOnboarding: API.OperationMethod<ListCategoriesOnboardingRequest, ListCategoriesOnboardingResponse, ListCategoriesOnboardingError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListCategoriesOnboardingRequest,
  output: ListCategoriesOnboardingResponse,
  errors: [],
}));

/** List available volumes under categories for onboarding experience. */
export interface ListCategoryVolumesOnboardingRequest {
  /** List of category ids requested. */
  categoryId?: string[];
  /** ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset. */
  locale?: string;
  /** The maximum allowed maturity rating of returned volumes. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature" | (string & {});
  /** Number of maximum results per page to be included in the response. */
  pageSize?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
}

export const ListCategoryVolumesOnboardingRequest = Schema.Struct({
  categoryId: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("categoryId")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  maxAllowedMaturityRating: Schema.optional(Schema.String).pipe(T.HttpQuery("maxAllowedMaturityRating")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/onboarding/listCategoryVolumes" }),
  svc,
) as unknown as Schema.Schema<ListCategoryVolumesOnboardingRequest>;

export type ListCategoryVolumesOnboardingResponse = Volume2;
export const ListCategoryVolumesOnboardingResponse = Volume2;

export type ListCategoryVolumesOnboardingError = CommonErrors;

export const listCategoryVolumesOnboarding = API.makePaginated(() => ({
  input: ListCategoryVolumesOnboardingRequest,
  output: ListCategoryVolumesOnboardingResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Returns a stream of personalized book clusters */
export interface GetPersonalizedstreamRequest {
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature" | (string & {});
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetPersonalizedstreamRequest = Schema.Struct({
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  maxAllowedMaturityRating: Schema.optional(Schema.String).pipe(T.HttpQuery("maxAllowedMaturityRating")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/personalizedstream/get" }),
  svc,
) as unknown as Schema.Schema<GetPersonalizedstreamRequest>;

export type GetPersonalizedstreamResponse = Discoveryclusters;
export const GetPersonalizedstreamResponse = Discoveryclusters;

export type GetPersonalizedstreamError = CommonErrors;

export const getPersonalizedstream: API.OperationMethod<GetPersonalizedstreamRequest, GetPersonalizedstreamResponse, GetPersonalizedstreamError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPersonalizedstreamRequest,
  output: GetPersonalizedstreamResponse,
  errors: [],
}));

/** Accepts the promo offer. */
export interface AcceptPromoofferRequest {
  /** device android_id */
  androidId?: string;
  /** device device */
  device?: string;
  /** device manufacturer */
  manufacturer?: string;
  /** device model */
  model?: string;
  offerId?: string;
  /** device product */
  product?: string;
  /** device serial */
  serial?: string;
  /** Volume id to exercise the offer */
  volumeId?: string;
}

export const AcceptPromoofferRequest = Schema.Struct({
  androidId: Schema.optional(Schema.String).pipe(T.HttpQuery("androidId")),
  device: Schema.optional(Schema.String).pipe(T.HttpQuery("device")),
  manufacturer: Schema.optional(Schema.String).pipe(T.HttpQuery("manufacturer")),
  model: Schema.optional(Schema.String).pipe(T.HttpQuery("model")),
  offerId: Schema.optional(Schema.String).pipe(T.HttpQuery("offerId")),
  product: Schema.optional(Schema.String).pipe(T.HttpQuery("product")),
  serial: Schema.optional(Schema.String).pipe(T.HttpQuery("serial")),
  volumeId: Schema.optional(Schema.String).pipe(T.HttpQuery("volumeId")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/promooffer/accept", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcceptPromoofferRequest>;

export type AcceptPromoofferResponse = Empty;
export const AcceptPromoofferResponse = Empty;

export type AcceptPromoofferError = CommonErrors;

export const acceptPromooffer: API.OperationMethod<AcceptPromoofferRequest, AcceptPromoofferResponse, AcceptPromoofferError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcceptPromoofferRequest,
  output: AcceptPromoofferResponse,
  errors: [],
}));

/** Marks the promo offer as dismissed. */
export interface DismissPromoofferRequest {
  /** device android_id */
  androidId?: string;
  /** device device */
  device?: string;
  /** device manufacturer */
  manufacturer?: string;
  /** device model */
  model?: string;
  /** Offer to dimiss */
  offerId?: string;
  /** device product */
  product?: string;
  /** device serial */
  serial?: string;
}

export const DismissPromoofferRequest = Schema.Struct({
  androidId: Schema.optional(Schema.String).pipe(T.HttpQuery("androidId")),
  device: Schema.optional(Schema.String).pipe(T.HttpQuery("device")),
  manufacturer: Schema.optional(Schema.String).pipe(T.HttpQuery("manufacturer")),
  model: Schema.optional(Schema.String).pipe(T.HttpQuery("model")),
  offerId: Schema.optional(Schema.String).pipe(T.HttpQuery("offerId")),
  product: Schema.optional(Schema.String).pipe(T.HttpQuery("product")),
  serial: Schema.optional(Schema.String).pipe(T.HttpQuery("serial")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/promooffer/dismiss", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DismissPromoofferRequest>;

export type DismissPromoofferResponse = Empty;
export const DismissPromoofferResponse = Empty;

export type DismissPromoofferError = CommonErrors;

export const dismissPromooffer: API.OperationMethod<DismissPromoofferRequest, DismissPromoofferResponse, DismissPromoofferError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DismissPromoofferRequest,
  output: DismissPromoofferResponse,
  errors: [],
}));

/** Returns a list of promo offers available to the user */
export interface GetPromoofferRequest {
  /** device android_id */
  androidId?: string;
  /** device device */
  device?: string;
  /** device manufacturer */
  manufacturer?: string;
  /** device model */
  model?: string;
  /** device product */
  product?: string;
  /** device serial */
  serial?: string;
}

export const GetPromoofferRequest = Schema.Struct({
  androidId: Schema.optional(Schema.String).pipe(T.HttpQuery("androidId")),
  device: Schema.optional(Schema.String).pipe(T.HttpQuery("device")),
  manufacturer: Schema.optional(Schema.String).pipe(T.HttpQuery("manufacturer")),
  model: Schema.optional(Schema.String).pipe(T.HttpQuery("model")),
  product: Schema.optional(Schema.String).pipe(T.HttpQuery("product")),
  serial: Schema.optional(Schema.String).pipe(T.HttpQuery("serial")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/promooffer/get" }),
  svc,
) as unknown as Schema.Schema<GetPromoofferRequest>;

export type GetPromoofferResponse = Offers;
export const GetPromoofferResponse = Offers;

export type GetPromoofferError = CommonErrors;

export const getPromooffer: API.OperationMethod<GetPromoofferRequest, GetPromoofferResponse, GetPromoofferError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPromoofferRequest,
  output: GetPromoofferResponse,
  errors: [],
}));

/** Returns Series metadata for the given series ids. */
export interface GetSeriesRequest {
  /** String that identifies the series */
  series_id: string[];
}

export const GetSeriesRequest = Schema.Struct({
  series_id: Schema.Array(Schema.String).pipe(T.HttpQuery("series_id")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/series/get" }),
  svc,
) as unknown as Schema.Schema<GetSeriesRequest>;

export type GetSeriesResponse = Series;
export const GetSeriesResponse = Series;

export type GetSeriesError = CommonErrors;

export const getSeries: API.OperationMethod<GetSeriesRequest, GetSeriesResponse, GetSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSeriesRequest,
  output: GetSeriesResponse,
  errors: [],
}));

/** Returns Series membership data given the series id. */
export interface GetSeriesMembershipRequest {
  /** Number of maximum results per page to be included in the response. */
  page_size?: number;
  /** The value of the nextToken from the previous page. */
  page_token?: string;
  /** String that identifies the series */
  series_id: string;
}

export const GetSeriesMembershipRequest = Schema.Struct({
  page_size: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_size")),
  page_token: Schema.optional(Schema.String).pipe(T.HttpQuery("page_token")),
  series_id: Schema.String.pipe(T.HttpQuery("series_id")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/series/membership/get" }),
  svc,
) as unknown as Schema.Schema<GetSeriesMembershipRequest>;

export type GetSeriesMembershipResponse = Seriesmembership;
export const GetSeriesMembershipResponse = Seriesmembership;

export type GetSeriesMembershipError = CommonErrors;

export const getSeriesMembership: API.OperationMethod<GetSeriesMembershipRequest, GetSeriesMembershipResponse, GetSeriesMembershipError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSeriesMembershipRequest,
  output: GetSeriesMembershipResponse,
  errors: [],
}));

/** Gets volume information for a single volume. */
export interface GetVolumesRequest {
  /** ID of volume to retrieve. */
  volumeId: string;
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
  /** Set to true to include non-comics series. Defaults to false. */
  includeNonComicsSeries?: boolean;
  /** Brand results for partner ID. */
  partner?: string;
  /** Restrict information returned to a set of selected fields. */
  projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE" | (string & {});
  /** string to identify the originator of this request. */
  source?: string;
  user_library_consistent_read?: boolean;
}

export const GetVolumesRequest = Schema.Struct({
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
  includeNonComicsSeries: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeNonComicsSeries")),
  partner: Schema.optional(Schema.String).pipe(T.HttpQuery("partner")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  user_library_consistent_read: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("user_library_consistent_read")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/{volumeId}" }),
  svc,
) as unknown as Schema.Schema<GetVolumesRequest>;

export type GetVolumesResponse = Volume;
export const GetVolumesResponse = Volume;

export type GetVolumesError = CommonErrors;

export const getVolumes: API.OperationMethod<GetVolumesRequest, GetVolumesResponse, GetVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVolumesRequest,
  output: GetVolumesResponse,
  errors: [],
}));

/** Performs a book search. */
export interface ListVolumesRequest {
  /** Restrict to volumes by download availability. */
  download?: "DOWNLOAD_UNDEFINED" | "EPUB" | (string & {});
  /** Filter search results. */
  filter?: "FILTER_UNDEFINED" | "ebooks" | "free-ebooks" | "full" | "paid-ebooks" | "partial" | (string & {});
  /** Restrict results to books with this language code. */
  langRestrict?: string;
  /** Restrict search to this user's library. */
  libraryRestrict?: "LIBRARY_RESTRICT_UNDEFINED" | "my-library" | "no-restrict" | (string & {});
  /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature" | (string & {});
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Sort search results. */
  orderBy?: "ORDER_BY_UNDEFINED" | "newest" | "relevance" | (string & {});
  /** Restrict and brand results for partner ID. */
  partner?: string;
  /** Restrict to books or magazines. */
  printType?: "PRINT_TYPE_UNDEFINED" | "ALL" | "BOOKS" | "MAGAZINES" | (string & {});
  /** Restrict information returned to a set of selected fields. */
  projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE" | (string & {});
  /** Full-text search query string. */
  q: string;
  /** Set to true to show books available for preorder. Defaults to false. */
  showPreorders?: boolean;
  /** String to identify the originator of this request. */
  source?: string;
  /** Index of the first result to return (starts at 0) */
  startIndex?: number;
}

export const ListVolumesRequest = Schema.Struct({
  download: Schema.optional(Schema.String).pipe(T.HttpQuery("download")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  langRestrict: Schema.optional(Schema.String).pipe(T.HttpQuery("langRestrict")),
  libraryRestrict: Schema.optional(Schema.String).pipe(T.HttpQuery("libraryRestrict")),
  maxAllowedMaturityRating: Schema.optional(Schema.String).pipe(T.HttpQuery("maxAllowedMaturityRating")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  partner: Schema.optional(Schema.String).pipe(T.HttpQuery("partner")),
  printType: Schema.optional(Schema.String).pipe(T.HttpQuery("printType")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  q: Schema.String.pipe(T.HttpQuery("q")),
  showPreorders: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showPreorders")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes" }),
  svc,
) as unknown as Schema.Schema<ListVolumesRequest>;

export type ListVolumesResponse = Volumes;
export const ListVolumesResponse = Volumes;

export type ListVolumesError = CommonErrors;

export const listVolumes: API.OperationMethod<ListVolumesRequest, ListVolumesResponse, ListVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListVolumesRequest,
  output: ListVolumesResponse,
  errors: [],
}));

/** Return a list of associated books. */
export interface ListVolumesAssociatedRequest {
  /** ID of the source volume. */
  volumeId: string;
  /** Association type. */
  association?: "ASSOCIATION_UNDEFINED" | "end-of-sample" | "end-of-volume" | "related-for-play" | (string & {});
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature" | (string & {});
  /** String to identify the originator of this request. */
  source?: string;
}

export const ListVolumesAssociatedRequest = Schema.Struct({
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  association: Schema.optional(Schema.String).pipe(T.HttpQuery("association")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  maxAllowedMaturityRating: Schema.optional(Schema.String).pipe(T.HttpQuery("maxAllowedMaturityRating")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/{volumeId}/associated" }),
  svc,
) as unknown as Schema.Schema<ListVolumesAssociatedRequest>;

export type ListVolumesAssociatedResponse = Volumes;
export const ListVolumesAssociatedResponse = Volumes;

export type ListVolumesAssociatedError = CommonErrors;

export const listVolumesAssociated: API.OperationMethod<ListVolumesAssociatedRequest, ListVolumesAssociatedResponse, ListVolumesAssociatedError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListVolumesAssociatedRequest,
  output: ListVolumesAssociatedResponse,
  errors: [],
}));

/** Return a list of books in My Library. */
export interface ListVolumesMybooksRequest {
  /** How the book was acquired */
  acquireMethod?: "ACQUIRE_METHOD_UNDEFINED" | "FAMILY_SHARED" | "PREORDERED" | "PREVIOUSLY_RENTED" | "PUBLIC_DOMAIN" | "PURCHASED" | "RENTED" | "SAMPLE" | "UPLOADED" | (string & {})[];
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
  /** ISO-639-1 language and ISO-3166-1 country code. Ex:'en_US'. Used for generating recommendations. */
  locale?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** The processing state of the user uploaded volumes to be returned. Applicable only if the UPLOADED is specified in the acquireMethod. */
  processingState?: "PROCESSING_STATE_UNDEFINED" | "COMPLETED_FAILED" | "COMPLETED_SUCCESS" | "RUNNING" | (string & {})[];
  /** String to identify the originator of this request. */
  source?: string;
  /** Index of the first result to return (starts at 0) */
  startIndex?: number;
}

export const ListVolumesMybooksRequest = Schema.Struct({
  acquireMethod: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("acquireMethod")),
  country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  processingState: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("processingState")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/mybooks" }),
  svc,
) as unknown as Schema.Schema<ListVolumesMybooksRequest>;

export type ListVolumesMybooksResponse = Volumes;
export const ListVolumesMybooksResponse = Volumes;

export type ListVolumesMybooksError = CommonErrors;

export const listVolumesMybooks: API.OperationMethod<ListVolumesMybooksRequest, ListVolumesMybooksResponse, ListVolumesMybooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListVolumesMybooksRequest,
  output: ListVolumesMybooksResponse,
  errors: [],
}));

/** Return a list of recommended books for the current user. */
export interface ListVolumesRecommendedRequest {
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature" | (string & {});
  /** String to identify the originator of this request. */
  source?: string;
}

export const ListVolumesRecommendedRequest = Schema.Struct({
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  maxAllowedMaturityRating: Schema.optional(Schema.String).pipe(T.HttpQuery("maxAllowedMaturityRating")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/recommended" }),
  svc,
) as unknown as Schema.Schema<ListVolumesRecommendedRequest>;

export type ListVolumesRecommendedResponse = Volumes;
export const ListVolumesRecommendedResponse = Volumes;

export type ListVolumesRecommendedError = CommonErrors;

export const listVolumesRecommended: API.OperationMethod<ListVolumesRecommendedRequest, ListVolumesRecommendedResponse, ListVolumesRecommendedError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListVolumesRecommendedRequest,
  output: ListVolumesRecommendedResponse,
  errors: [],
}));

/** Rate a recommended book for the current user. */
export interface RateVolumesRecommendedRequest {
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** Rating to be given to the volume. */
  rating: "RATING_UNDEFINED" | "HAVE_IT" | "NOT_INTERESTED" | (string & {});
  /** String to identify the originator of this request. */
  source?: string;
  /** ID of the source volume. */
  volumeId: string;
}

export const RateVolumesRecommendedRequest = Schema.Struct({
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  rating: Schema.String.pipe(T.HttpQuery("rating")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
}).pipe(
  T.Http({ method: "POST", path: "books/v1/volumes/recommended/rate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RateVolumesRecommendedRequest>;

export type RateVolumesRecommendedResponse = BooksVolumesRecommendedRateResponse;
export const RateVolumesRecommendedResponse = BooksVolumesRecommendedRateResponse;

export type RateVolumesRecommendedError = CommonErrors;

export const rateVolumesRecommended: API.OperationMethod<RateVolumesRecommendedRequest, RateVolumesRecommendedResponse, RateVolumesRecommendedError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RateVolumesRecommendedRequest,
  output: RateVolumesRecommendedResponse,
  errors: [],
}));

/** Return a list of books uploaded by the current user. */
export interface ListVolumesUseruploadedRequest {
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** The processing state of the user uploaded volumes to be returned. */
  processingState?: "PROCESSING_STATE_UNDEFINED" | "COMPLETED_FAILED" | "COMPLETED_SUCCESS" | "RUNNING" | (string & {})[];
  /** String to identify the originator of this request. */
  source?: string;
  /** Index of the first result to return (starts at 0) */
  startIndex?: number;
  /** The ids of the volumes to be returned. If not specified all that match the processingState are returned. */
  volumeId?: string[];
}

export const ListVolumesUseruploadedRequest = Schema.Struct({
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  processingState: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("processingState")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
  volumeId: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("volumeId")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/useruploaded" }),
  svc,
) as unknown as Schema.Schema<ListVolumesUseruploadedRequest>;

export type ListVolumesUseruploadedResponse = Volumes;
export const ListVolumesUseruploadedResponse = Volumes;

export type ListVolumesUseruploadedError = CommonErrors;

export const listVolumesUseruploaded: API.OperationMethod<ListVolumesUseruploadedRequest, ListVolumesUseruploadedResponse, ListVolumesUseruploadedError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListVolumesUseruploadedRequest,
  output: ListVolumesUseruploadedResponse,
  errors: [],
}));

