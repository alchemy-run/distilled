// ==========================================================================
// Books API (books v1)
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
  name: "books",
  version: "v1",
  rootUrl: "https://books.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface DownloadAccessRestriction {
  /** Whether this volume has any download access restrictions. */
  restricted?: boolean;
  /** Resource type. */
  kind?: string;
  /** If restricted, whether access is granted for this (user, device, volume). */
  deviceAllowed?: boolean;
  /** If restricted, the maximum number of content download licenses for this volume. */
  maxDownloadDevices?: number;
  /** Error/warning reason code. Additional codes may be added in the future. 0 OK 100 ACCESS_DENIED_PUBLISHER_LIMIT 101 ACCESS_DENIED_LIMIT 200 WARNING_USED_LAST_ACCESS */
  reasonCode?: string;
  /** Error/warning message. */
  message?: string;
  /** Identifies the volume for which this entry applies. */
  volumeId?: string;
  /** Client app identifier for verification. Download access and client-validation only. */
  source?: string;
  /** If deviceAllowed, whether access was just acquired with this request. */
  justAcquired?: boolean;
  /** Client nonce for verification. Download access and client-validation only. */
  nonce?: string;
  /** Response signature. */
  signature?: string;
  /** If restricted, the number of content download licenses already acquired (including the requesting client, if licensed). */
  downloadsAcquired?: number;
}

export const DownloadAccessRestriction: Schema.Schema<DownloadAccessRestriction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      restricted: Schema.optional(Schema.Boolean),
      kind: Schema.optional(Schema.String),
      deviceAllowed: Schema.optional(Schema.Boolean),
      maxDownloadDevices: Schema.optional(Schema.Number),
      reasonCode: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
      volumeId: Schema.optional(Schema.String),
      source: Schema.optional(Schema.String),
      justAcquired: Schema.optional(Schema.Boolean),
      nonce: Schema.optional(Schema.String),
      signature: Schema.optional(Schema.String),
      downloadsAcquired: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "DownloadAccessRestriction",
  }) as any as Schema.Schema<DownloadAccessRestriction>;

export interface DownloadAccesses {
  /** Resource type. */
  kind?: string;
  /** A list of download access responses. */
  downloadAccessList?: Array<DownloadAccessRestriction>;
}

export const DownloadAccesses: Schema.Schema<DownloadAccesses> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      downloadAccessList: Schema.optional(
        Schema.Array(DownloadAccessRestriction),
      ),
    }),
  ).annotate({
    identifier: "DownloadAccesses",
  }) as any as Schema.Schema<DownloadAccesses>;

export interface Volumeseriesinfo {
  /** Short book title in the context of the series. */
  shortSeriesBookTitle?: string;
  volumeSeries?: Array<{
    issue?: Array<{ issueOrderNumber?: number; issueDisplayNumber?: string }>;
    seriesId?: string;
    seriesBookType?: string;
    orderNumber?: number;
  }>;
  /** The display number string. This should be used only for display purposes and the actual sequence should be inferred from the below orderNumber. */
  bookDisplayNumber?: string;
  /** Resource type. */
  kind?: string;
}

export const Volumeseriesinfo: Schema.Schema<Volumeseriesinfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      shortSeriesBookTitle: Schema.optional(Schema.String),
      volumeSeries: Schema.optional(
        Schema.Array(
          Schema.Struct({
            issue: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  issueOrderNumber: Schema.optional(Schema.Number),
                  issueDisplayNumber: Schema.optional(Schema.String),
                }),
              ),
            ),
            seriesId: Schema.optional(Schema.String),
            seriesBookType: Schema.optional(Schema.String),
            orderNumber: Schema.optional(Schema.Number),
          }),
        ),
      ),
      bookDisplayNumber: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Volumeseriesinfo",
  }) as any as Schema.Schema<Volumeseriesinfo>;

export interface ReadingPosition {
  /** Position in a volume for image-based content. */
  gbImagePosition?: string;
  /** Position in a PDF file. */
  pdfPosition?: string;
  /** Timestamp when this reading position was last updated (formatted UTC timestamp with millisecond resolution). */
  updated?: string;
  /** Position in a volume for text-based content. */
  gbTextPosition?: string;
  /** Volume id associated with this reading position. */
  volumeId?: string;
  /** Resource type for a reading position. */
  kind?: string;
  /** Position in an EPUB as a CFI. */
  epubCfiPosition?: string;
}

export const ReadingPosition: Schema.Schema<ReadingPosition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gbImagePosition: Schema.optional(Schema.String),
      pdfPosition: Schema.optional(Schema.String),
      updated: Schema.optional(Schema.String),
      gbTextPosition: Schema.optional(Schema.String),
      volumeId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      epubCfiPosition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReadingPosition",
  }) as any as Schema.Schema<ReadingPosition>;

export interface Review {
  /** Volume that this review is for. */
  volumeId?: string;
  /** Information regarding the source of this review, when the review is not from a Google Books user. */
  source?: { description?: string; url?: string; extraDescription?: string };
  /** Source type for this review. Possible values are EDITORIAL, WEB_USER or GOOGLE_USER. */
  type?: string;
  /** Star rating for this review. Possible values are ONE, TWO, THREE, FOUR, FIVE or NOT_RATED. */
  rating?: string;
  /** Title for this review. */
  title?: string;
  /** Author of this review. */
  author?: { displayName?: string };
  /** Date of this review. */
  date?: string;
  /** Resource type for a review. */
  kind?: string;
  /** Review text. */
  content?: string;
  /** URL for the full review text, for reviews gathered from the web. */
  fullTextUrl?: string;
}

export const Review: Schema.Schema<Review> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      volumeId: Schema.optional(Schema.String),
      source: Schema.optional(
        Schema.Struct({
          description: Schema.optional(Schema.String),
          url: Schema.optional(Schema.String),
          extraDescription: Schema.optional(Schema.String),
        }),
      ),
      type: Schema.optional(Schema.String),
      rating: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      author: Schema.optional(
        Schema.Struct({ displayName: Schema.optional(Schema.String) }),
      ),
      date: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      fullTextUrl: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Review" }) as any as Schema.Schema<Review>;

export interface Volume {
  /** What layers exist in this volume and high level information about them. */
  layerInfo?: {
    layers?: Array<{ layerId?: string; volumeAnnotationsVersion?: string }>;
  };
  /** Any information about a volume related to reading or obtaining that volume text. This information can depend on country (books may be public domain in one country but not in another, e.g.). */
  accessInfo?: {
    pdf?: {
      isAvailable?: boolean;
      acsTokenLink?: string;
      downloadLink?: string;
    };
    explicitOfflineLicenseManagement?: boolean;
    viewOrderUrl?: string;
    driveImportedContentLink?: string;
    accessViewStatus?: string;
    embeddable?: boolean;
    epub?: {
      isAvailable?: boolean;
      downloadLink?: string;
      acsTokenLink?: string;
    };
    publicDomain?: boolean;
    country?: string;
    quoteSharingAllowed?: boolean;
    viewability?: string;
    downloadAccess?: DownloadAccessRestriction;
    webReaderLink?: string;
    textToSpeechPermission?: string;
  };
  /** URL to this resource. (In LITE projection.) */
  selfLink?: string;
  /** Any information about a volume related to the eBookstore and/or purchaseability. This information can depend on the country where the request originates from (i.e. books may not be for sale in certain countries). */
  saleInfo?: {
    listPrice?: { currencyCode?: string; amount?: number };
    country?: string;
    offers?: Array<{
      finskyOfferType?: number;
      giftable?: boolean;
      listPrice?: { currencyCode?: string; amountInMicros?: number };
      retailPrice?: { currencyCode?: string; amountInMicros?: number };
      rentalDuration?: { unit?: string; count?: number };
    }>;
    isEbook?: boolean;
    saleability?: string;
    onSaleDate?: string;
    retailPrice?: { amount?: number; currencyCode?: string };
    buyLink?: string;
  };
  /** Unique identifier for a volume. (In LITE projection.) */
  id?: string;
  /** General volume information. */
  volumeInfo?: {
    panelizationSummary?: {
      containsEpubBubbles?: boolean;
      imageBubbleVersion?: string;
      containsImageBubbles?: boolean;
      epubBubbleVersion?: string;
    };
    mainCategory?: string;
    averageRating?: number;
    allowAnonLogging?: boolean;
    authors?: Array<string>;
    maturityRating?: string;
    infoLink?: string;
    contentVersion?: string;
    subtitle?: string;
    readingModes?: { text?: boolean; image?: boolean };
    language?: string;
    description?: string;
    ratingsCount?: number;
    previewLink?: string;
    title?: string;
    canonicalVolumeLink?: string;
    printedPageCount?: number;
    dimensions?: { thickness?: string; width?: string; height?: string };
    publisher?: string;
    publishedDate?: string;
    printType?: string;
    samplePageCount?: number;
    seriesInfo?: Volumeseriesinfo;
    industryIdentifiers?: Array<{ identifier?: string; type?: string }>;
    comicsContent?: boolean;
    pageCount?: number;
    categories?: Array<string>;
    imageLinks?: {
      medium?: string;
      extraLarge?: string;
      thumbnail?: string;
      small?: string;
      large?: string;
      smallThumbnail?: string;
    };
  };
  /** User specific information related to this volume. (e.g. page this user last read or whether they purchased this book) */
  userInfo?: {
    isPurchased?: boolean;
    isFamilySharingDisabledByFop?: boolean;
    acquisitionType?: number;
    entitlementType?: number;
    userUploadedVolumeInfo?: { processingState?: string };
    familySharing?: {
      isSharingDisabledByFop?: boolean;
      familyRole?: string;
      isSharingAllowed?: boolean;
    };
    readingPosition?: ReadingPosition;
    isPreordered?: boolean;
    acquiredTime?: string;
    isFamilySharingAllowed?: boolean;
    copy?: {
      updated?: string;
      remainingCharacterCount?: number;
      allowedCharacterCount?: number;
      limitType?: string;
    };
    rentalPeriod?: { startUtcSec?: string; endUtcSec?: string };
    updated?: string;
    isFamilySharedToUser?: boolean;
    isInMyBooks?: boolean;
    isUploaded?: boolean;
    review?: Review;
    rentalState?: string;
    isFamilySharedFromUser?: boolean;
  };
  /** Search result information related to this volume. */
  searchInfo?: { textSnippet?: string };
  /** Recommendation related information for this volume. */
  recommendedInfo?: { explanation?: string };
  /** Opaque identifier for a specific version of a volume resource. (In LITE projection) */
  etag?: string;
  /** Resource type for a volume. (In LITE projection.) */
  kind?: string;
}

export const Volume: Schema.Schema<Volume> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      layerInfo: Schema.optional(
        Schema.Struct({
          layers: Schema.optional(
            Schema.Array(
              Schema.Struct({
                layerId: Schema.optional(Schema.String),
                volumeAnnotationsVersion: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
      accessInfo: Schema.optional(
        Schema.Struct({
          pdf: Schema.optional(
            Schema.Struct({
              isAvailable: Schema.optional(Schema.Boolean),
              acsTokenLink: Schema.optional(Schema.String),
              downloadLink: Schema.optional(Schema.String),
            }),
          ),
          explicitOfflineLicenseManagement: Schema.optional(Schema.Boolean),
          viewOrderUrl: Schema.optional(Schema.String),
          driveImportedContentLink: Schema.optional(Schema.String),
          accessViewStatus: Schema.optional(Schema.String),
          embeddable: Schema.optional(Schema.Boolean),
          epub: Schema.optional(
            Schema.Struct({
              isAvailable: Schema.optional(Schema.Boolean),
              downloadLink: Schema.optional(Schema.String),
              acsTokenLink: Schema.optional(Schema.String),
            }),
          ),
          publicDomain: Schema.optional(Schema.Boolean),
          country: Schema.optional(Schema.String),
          quoteSharingAllowed: Schema.optional(Schema.Boolean),
          viewability: Schema.optional(Schema.String),
          downloadAccess: Schema.optional(DownloadAccessRestriction),
          webReaderLink: Schema.optional(Schema.String),
          textToSpeechPermission: Schema.optional(Schema.String),
        }),
      ),
      selfLink: Schema.optional(Schema.String),
      saleInfo: Schema.optional(
        Schema.Struct({
          listPrice: Schema.optional(
            Schema.Struct({
              currencyCode: Schema.optional(Schema.String),
              amount: Schema.optional(Schema.Number),
            }),
          ),
          country: Schema.optional(Schema.String),
          offers: Schema.optional(
            Schema.Array(
              Schema.Struct({
                finskyOfferType: Schema.optional(Schema.Number),
                giftable: Schema.optional(Schema.Boolean),
                listPrice: Schema.optional(
                  Schema.Struct({
                    currencyCode: Schema.optional(Schema.String),
                    amountInMicros: Schema.optional(Schema.Number),
                  }),
                ),
                retailPrice: Schema.optional(
                  Schema.Struct({
                    currencyCode: Schema.optional(Schema.String),
                    amountInMicros: Schema.optional(Schema.Number),
                  }),
                ),
                rentalDuration: Schema.optional(
                  Schema.Struct({
                    unit: Schema.optional(Schema.String),
                    count: Schema.optional(Schema.Number),
                  }),
                ),
              }),
            ),
          ),
          isEbook: Schema.optional(Schema.Boolean),
          saleability: Schema.optional(Schema.String),
          onSaleDate: Schema.optional(Schema.String),
          retailPrice: Schema.optional(
            Schema.Struct({
              amount: Schema.optional(Schema.Number),
              currencyCode: Schema.optional(Schema.String),
            }),
          ),
          buyLink: Schema.optional(Schema.String),
        }),
      ),
      id: Schema.optional(Schema.String),
      volumeInfo: Schema.optional(
        Schema.Struct({
          panelizationSummary: Schema.optional(
            Schema.Struct({
              containsEpubBubbles: Schema.optional(Schema.Boolean),
              imageBubbleVersion: Schema.optional(Schema.String),
              containsImageBubbles: Schema.optional(Schema.Boolean),
              epubBubbleVersion: Schema.optional(Schema.String),
            }),
          ),
          mainCategory: Schema.optional(Schema.String),
          averageRating: Schema.optional(Schema.Number),
          allowAnonLogging: Schema.optional(Schema.Boolean),
          authors: Schema.optional(Schema.Array(Schema.String)),
          maturityRating: Schema.optional(Schema.String),
          infoLink: Schema.optional(Schema.String),
          contentVersion: Schema.optional(Schema.String),
          subtitle: Schema.optional(Schema.String),
          readingModes: Schema.optional(
            Schema.Struct({
              text: Schema.optional(Schema.Boolean),
              image: Schema.optional(Schema.Boolean),
            }),
          ),
          language: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          ratingsCount: Schema.optional(Schema.Number),
          previewLink: Schema.optional(Schema.String),
          title: Schema.optional(Schema.String),
          canonicalVolumeLink: Schema.optional(Schema.String),
          printedPageCount: Schema.optional(Schema.Number),
          dimensions: Schema.optional(
            Schema.Struct({
              thickness: Schema.optional(Schema.String),
              width: Schema.optional(Schema.String),
              height: Schema.optional(Schema.String),
            }),
          ),
          publisher: Schema.optional(Schema.String),
          publishedDate: Schema.optional(Schema.String),
          printType: Schema.optional(Schema.String),
          samplePageCount: Schema.optional(Schema.Number),
          seriesInfo: Schema.optional(Volumeseriesinfo),
          industryIdentifiers: Schema.optional(
            Schema.Array(
              Schema.Struct({
                identifier: Schema.optional(Schema.String),
                type: Schema.optional(Schema.String),
              }),
            ),
          ),
          comicsContent: Schema.optional(Schema.Boolean),
          pageCount: Schema.optional(Schema.Number),
          categories: Schema.optional(Schema.Array(Schema.String)),
          imageLinks: Schema.optional(
            Schema.Struct({
              medium: Schema.optional(Schema.String),
              extraLarge: Schema.optional(Schema.String),
              thumbnail: Schema.optional(Schema.String),
              small: Schema.optional(Schema.String),
              large: Schema.optional(Schema.String),
              smallThumbnail: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
      userInfo: Schema.optional(
        Schema.Struct({
          isPurchased: Schema.optional(Schema.Boolean),
          isFamilySharingDisabledByFop: Schema.optional(Schema.Boolean),
          acquisitionType: Schema.optional(Schema.Number),
          entitlementType: Schema.optional(Schema.Number),
          userUploadedVolumeInfo: Schema.optional(
            Schema.Struct({ processingState: Schema.optional(Schema.String) }),
          ),
          familySharing: Schema.optional(
            Schema.Struct({
              isSharingDisabledByFop: Schema.optional(Schema.Boolean),
              familyRole: Schema.optional(Schema.String),
              isSharingAllowed: Schema.optional(Schema.Boolean),
            }),
          ),
          readingPosition: Schema.optional(ReadingPosition),
          isPreordered: Schema.optional(Schema.Boolean),
          acquiredTime: Schema.optional(Schema.String),
          isFamilySharingAllowed: Schema.optional(Schema.Boolean),
          copy: Schema.optional(
            Schema.Struct({
              updated: Schema.optional(Schema.String),
              remainingCharacterCount: Schema.optional(Schema.Number),
              allowedCharacterCount: Schema.optional(Schema.Number),
              limitType: Schema.optional(Schema.String),
            }),
          ),
          rentalPeriod: Schema.optional(
            Schema.Struct({
              startUtcSec: Schema.optional(Schema.String),
              endUtcSec: Schema.optional(Schema.String),
            }),
          ),
          updated: Schema.optional(Schema.String),
          isFamilySharedToUser: Schema.optional(Schema.Boolean),
          isInMyBooks: Schema.optional(Schema.Boolean),
          isUploaded: Schema.optional(Schema.Boolean),
          review: Schema.optional(Review),
          rentalState: Schema.optional(Schema.String),
          isFamilySharedFromUser: Schema.optional(Schema.Boolean),
        }),
      ),
      searchInfo: Schema.optional(
        Schema.Struct({ textSnippet: Schema.optional(Schema.String) }),
      ),
      recommendedInfo: Schema.optional(
        Schema.Struct({ explanation: Schema.optional(Schema.String) }),
      ),
      etag: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Volume" }) as any as Schema.Schema<Volume>;

export interface Discoveryclusters {
  totalClusters?: number;
  /** Resorce type. */
  kind?: string;
  clusters?: Array<{
    totalVolumes?: number;
    uid?: string;
    volumes?: Array<Volume>;
    banner_with_content_container?: {
      moreButtonText?: string;
      maskColorArgb?: string;
      fillColorArgb?: string;
      imageUrl?: string;
      moreButtonUrl?: string;
      textColorArgb?: string;
    };
    subTitle?: string;
    title?: string;
  }>;
}

export const Discoveryclusters: Schema.Schema<Discoveryclusters> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      totalClusters: Schema.optional(Schema.Number),
      kind: Schema.optional(Schema.String),
      clusters: Schema.optional(
        Schema.Array(
          Schema.Struct({
            totalVolumes: Schema.optional(Schema.Number),
            uid: Schema.optional(Schema.String),
            volumes: Schema.optional(Schema.Array(Volume)),
            banner_with_content_container: Schema.optional(
              Schema.Struct({
                moreButtonText: Schema.optional(Schema.String),
                maskColorArgb: Schema.optional(Schema.String),
                fillColorArgb: Schema.optional(Schema.String),
                imageUrl: Schema.optional(Schema.String),
                moreButtonUrl: Schema.optional(Schema.String),
                textColorArgb: Schema.optional(Schema.String),
              }),
            ),
            subTitle: Schema.optional(Schema.String),
            title: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ).annotate({
    identifier: "Discoveryclusters",
  }) as any as Schema.Schema<Discoveryclusters>;

export interface Notification {
  is_document_mature?: boolean;
  reason?: string;
  notificationGroup?: string;
  doc_id?: string;
  dont_show_notification?: boolean;
  targetUrl?: string;
  notification_type?: string;
  timeToExpireMs?: string;
  doc_type?: string;
  /** The list of crm experiment ids. */
  crmExperimentIds?: Array<string>;
  title?: string;
  body?: string;
  iconUrl?: string;
  /** Resource type. */
  kind?: string;
  show_notification_settings_action?: boolean;
  pcampaign_id?: string;
}

export const Notification: Schema.Schema<Notification> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      is_document_mature: Schema.optional(Schema.Boolean),
      reason: Schema.optional(Schema.String),
      notificationGroup: Schema.optional(Schema.String),
      doc_id: Schema.optional(Schema.String),
      dont_show_notification: Schema.optional(Schema.Boolean),
      targetUrl: Schema.optional(Schema.String),
      notification_type: Schema.optional(Schema.String),
      timeToExpireMs: Schema.optional(Schema.String),
      doc_type: Schema.optional(Schema.String),
      crmExperimentIds: Schema.optional(Schema.Array(Schema.String)),
      title: Schema.optional(Schema.String),
      body: Schema.optional(Schema.String),
      iconUrl: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      show_notification_settings_action: Schema.optional(Schema.Boolean),
      pcampaign_id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Notification",
  }) as any as Schema.Schema<Notification>;

export interface ConcurrentAccessRestriction {
  /** Identifies the volume for which this entry applies. */
  volumeId?: string;
  /** Client app identifier for verification. Download access and client-validation only. */
  source?: string;
  /** Time in seconds for license auto-expiration. */
  timeWindowSeconds?: number;
  /** The maximum number of concurrent access licenses for this volume. */
  maxConcurrentDevices?: number;
  /** Client nonce for verification. Download access and client-validation only. */
  nonce?: string;
  /** Response signature. */
  signature?: string;
  /** Whether access is granted for this (user, device, volume). */
  deviceAllowed?: boolean;
  /** Whether this volume has any concurrent access restrictions. */
  restricted?: boolean;
  /** Resource type. */
  kind?: string;
  /** Error/warning reason code. */
  reasonCode?: string;
  /** Error/warning message. */
  message?: string;
}

export const ConcurrentAccessRestriction: Schema.Schema<ConcurrentAccessRestriction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      volumeId: Schema.optional(Schema.String),
      source: Schema.optional(Schema.String),
      timeWindowSeconds: Schema.optional(Schema.Number),
      maxConcurrentDevices: Schema.optional(Schema.Number),
      nonce: Schema.optional(Schema.String),
      signature: Schema.optional(Schema.String),
      deviceAllowed: Schema.optional(Schema.Boolean),
      restricted: Schema.optional(Schema.Boolean),
      kind: Schema.optional(Schema.String),
      reasonCode: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConcurrentAccessRestriction",
  }) as any as Schema.Schema<ConcurrentAccessRestriction>;

export interface RequestAccessData {
  /** Resource type. */
  kind?: string;
  /** A concurrent access response. */
  concurrentAccess?: ConcurrentAccessRestriction;
  /** A download access response. */
  downloadAccess?: DownloadAccessRestriction;
}

export const RequestAccessData: Schema.Schema<RequestAccessData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      concurrentAccess: Schema.optional(ConcurrentAccessRestriction),
      downloadAccess: Schema.optional(DownloadAccessRestriction),
    }),
  ).annotate({
    identifier: "RequestAccessData",
  }) as any as Schema.Schema<RequestAccessData>;

export interface BooksAnnotationsRange {
  /** The starting position for the range. */
  startPosition?: string;
  /** The ending position for the range. */
  endPosition?: string;
  /** The offset from the starting position. */
  startOffset?: string;
  /** The offset from the ending position. */
  endOffset?: string;
}

export const BooksAnnotationsRange: Schema.Schema<BooksAnnotationsRange> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startPosition: Schema.optional(Schema.String),
      endPosition: Schema.optional(Schema.String),
      startOffset: Schema.optional(Schema.String),
      endOffset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BooksAnnotationsRange",
  }) as any as Schema.Schema<BooksAnnotationsRange>;

export interface Annotation {
  /** Excerpt from the volume. */
  selectedText?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Pages that this annotation spans. */
  pageIds?: Array<string>;
  /** User-created data for this annotation. */
  data?: string;
  /** Anchor text before excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
  beforeSelectedText?: string;
  /** Anchor text after excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
  afterSelectedText?: string;
  /** Timestamp for the last time this annotation was modified. */
  updated?: string;
  /** Indicates that this annotation is deleted. */
  deleted?: boolean;
  /** The volume that this annotation belongs to. */
  volumeId?: string;
  /** The highlight style for this annotation. */
  highlightStyle?: string;
  layerSummary?: {
    remainingCharacterCount?: number;
    allowedCharacterCount?: number;
    limitType?: string;
  };
  /** Selection ranges sent from the client. */
  clientVersionRanges?: {
    contentVersion?: string;
    gbImageRange?: BooksAnnotationsRange;
    cfiRange?: BooksAnnotationsRange;
    gbTextRange?: BooksAnnotationsRange;
    imageCfiRange?: BooksAnnotationsRange;
  };
  /** Timestamp for the created time of this annotation. */
  created?: string;
  /** Selection ranges for the most recent content version. */
  currentVersionRanges?: {
    gbTextRange?: BooksAnnotationsRange;
    imageCfiRange?: BooksAnnotationsRange;
    gbImageRange?: BooksAnnotationsRange;
    cfiRange?: BooksAnnotationsRange;
    contentVersion?: string;
  };
  /** Resource type. */
  kind?: string;
  /** Id of this annotation, in the form of a GUID. */
  id?: string;
  /** The layer this annotation is for. */
  layerId?: string;
}

export const Annotation: Schema.Schema<Annotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selectedText: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
      pageIds: Schema.optional(Schema.Array(Schema.String)),
      data: Schema.optional(Schema.String),
      beforeSelectedText: Schema.optional(Schema.String),
      afterSelectedText: Schema.optional(Schema.String),
      updated: Schema.optional(Schema.String),
      deleted: Schema.optional(Schema.Boolean),
      volumeId: Schema.optional(Schema.String),
      highlightStyle: Schema.optional(Schema.String),
      layerSummary: Schema.optional(
        Schema.Struct({
          remainingCharacterCount: Schema.optional(Schema.Number),
          allowedCharacterCount: Schema.optional(Schema.Number),
          limitType: Schema.optional(Schema.String),
        }),
      ),
      clientVersionRanges: Schema.optional(
        Schema.Struct({
          contentVersion: Schema.optional(Schema.String),
          gbImageRange: Schema.optional(BooksAnnotationsRange),
          cfiRange: Schema.optional(BooksAnnotationsRange),
          gbTextRange: Schema.optional(BooksAnnotationsRange),
          imageCfiRange: Schema.optional(BooksAnnotationsRange),
        }),
      ),
      created: Schema.optional(Schema.String),
      currentVersionRanges: Schema.optional(
        Schema.Struct({
          gbTextRange: Schema.optional(BooksAnnotationsRange),
          imageCfiRange: Schema.optional(BooksAnnotationsRange),
          gbImageRange: Schema.optional(BooksAnnotationsRange),
          cfiRange: Schema.optional(BooksAnnotationsRange),
          contentVersion: Schema.optional(Schema.String),
        }),
      ),
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      layerId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Annotation" }) as any as Schema.Schema<Annotation>;

export interface Seriesmembership {
  nextPageToken?: string;
  /** Resorce type. */
  kind?: string;
  member?: Array<Volume>;
}

export const Seriesmembership: Schema.Schema<Seriesmembership> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      member: Schema.optional(Schema.Array(Volume)),
    }),
  ).annotate({
    identifier: "Seriesmembership",
  }) as any as Schema.Schema<Seriesmembership>;

export interface Volumes {
  /** A list of volumes. */
  items?: Array<Volume>;
  /** Resource type. */
  kind?: string;
  /** Total number of volumes found. This might be greater than the number of volumes returned in this response if results have been paginated. */
  totalItems?: number;
}

export const Volumes: Schema.Schema<Volumes> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(Volume)),
      kind: Schema.optional(Schema.String),
      totalItems: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Volumes" }) as any as Schema.Schema<Volumes>;

export interface BooksCloudloadingResource {
  volumeId?: string;
  title?: string;
  author?: string;
  processingState?: string;
}

export const BooksCloudloadingResource: Schema.Schema<BooksCloudloadingResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      volumeId: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      author: Schema.optional(Schema.String),
      processingState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BooksCloudloadingResource",
  }) as any as Schema.Schema<BooksCloudloadingResource>;

export interface Bookshelf {
  /** Title of this bookshelf. */
  title?: string;
  /** Whether this bookshelf is PUBLIC or PRIVATE. */
  access?: string;
  /** Number of volumes in this bookshelf. */
  volumeCount?: number;
  /** Last time a volume was added or removed from this bookshelf (formatted UTC timestamp with millisecond resolution). */
  volumesLastUpdated?: string;
  /** Created time for this bookshelf (formatted UTC timestamp with millisecond resolution). */
  created?: string;
  /** Description of this bookshelf. */
  description?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Id of this bookshelf, only unique by user. */
  id?: number;
  /** Resource type for bookshelf metadata. */
  kind?: string;
  /** Last modified time of this bookshelf (formatted UTC timestamp with millisecond resolution). */
  updated?: string;
}

export const Bookshelf: Schema.Schema<Bookshelf> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      access: Schema.optional(Schema.String),
      volumeCount: Schema.optional(Schema.Number),
      volumesLastUpdated: Schema.optional(Schema.String),
      created: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
      id: Schema.optional(Schema.Number),
      kind: Schema.optional(Schema.String),
      updated: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Bookshelf" }) as any as Schema.Schema<Bookshelf>;

export interface Bookshelves {
  /** Resource type. */
  kind?: string;
  /** A list of bookshelves. */
  items?: Array<Bookshelf>;
}

export const Bookshelves: Schema.Schema<Bookshelves> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Bookshelf)),
    }),
  ).annotate({
    identifier: "Bookshelves",
  }) as any as Schema.Schema<Bookshelves>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface Volume2 {
  /** Resource type. */
  kind?: string;
  nextPageToken?: string;
  /** A list of volumes. */
  items?: Array<Volume>;
}

export const Volume2: Schema.Schema<Volume2> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Volume)),
    }),
  ).annotate({ identifier: "Volume2" }) as any as Schema.Schema<Volume2>;

export interface Category {
  /** Resource type. */
  kind?: string;
  /** A list of onboarding categories. */
  items?: Array<{ badgeUrl?: string; name?: string; categoryId?: string }>;
}

export const Category: Schema.Schema<Category> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      items: Schema.optional(
        Schema.Array(
          Schema.Struct({
            badgeUrl: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            categoryId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ).annotate({ identifier: "Category" }) as any as Schema.Schema<Category>;

export interface Volumeannotation {
  /** The Volume this annotation is for. */
  volumeId?: string;
  /** Link to get data for this annotation. */
  annotationDataLink?: string;
  /** The annotation data id for this volume annotation. */
  annotationDataId?: string;
  /** Resource Type */
  kind?: string;
  /** The content ranges to identify the selected text. */
  contentRanges?: {
    gbTextRange?: BooksAnnotationsRange;
    contentVersion?: string;
    gbImageRange?: BooksAnnotationsRange;
    cfiRange?: BooksAnnotationsRange;
  };
  /** Unique id of this volume annotation. */
  id?: string;
  /** The Layer this annotation is for. */
  layerId?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Excerpt from the volume. */
  selectedText?: string;
  /** Pages the annotation spans. */
  pageIds?: Array<string>;
  /** Data for this annotation. */
  data?: string;
  /** The type of annotation this is. */
  annotationType?: string;
  /** Timestamp for the last time this anntoation was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** Indicates that this annotation is deleted. */
  deleted?: boolean;
}

export const Volumeannotation: Schema.Schema<Volumeannotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      volumeId: Schema.optional(Schema.String),
      annotationDataLink: Schema.optional(Schema.String),
      annotationDataId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      contentRanges: Schema.optional(
        Schema.Struct({
          gbTextRange: Schema.optional(BooksAnnotationsRange),
          contentVersion: Schema.optional(Schema.String),
          gbImageRange: Schema.optional(BooksAnnotationsRange),
          cfiRange: Schema.optional(BooksAnnotationsRange),
        }),
      ),
      id: Schema.optional(Schema.String),
      layerId: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
      selectedText: Schema.optional(Schema.String),
      pageIds: Schema.optional(Schema.Array(Schema.String)),
      data: Schema.optional(Schema.String),
      annotationType: Schema.optional(Schema.String),
      updated: Schema.optional(Schema.String),
      deleted: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "Volumeannotation",
  }) as any as Schema.Schema<Volumeannotation>;

export interface BooksVolumesRecommendedRateResponse {
  consistency_token?: string;
}

export const BooksVolumesRecommendedRateResponse: Schema.Schema<BooksVolumesRecommendedRateResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      consistency_token: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BooksVolumesRecommendedRateResponse",
  }) as any as Schema.Schema<BooksVolumesRecommendedRateResponse>;

export interface Offers {
  /** Resource type. */
  kind?: string;
  /** A list of offers. */
  items?: Array<{
    id?: string;
    artUrl?: string;
    gservicesKey?: string;
    items?: Array<{
      coverUrl?: string;
      description?: string;
      volumeId?: string;
      canonicalVolumeLink?: string;
      title?: string;
      author?: string;
    }>;
  }>;
}

export const Offers: Schema.Schema<Offers> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      items: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            artUrl: Schema.optional(Schema.String),
            gservicesKey: Schema.optional(Schema.String),
            items: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  coverUrl: Schema.optional(Schema.String),
                  description: Schema.optional(Schema.String),
                  volumeId: Schema.optional(Schema.String),
                  canonicalVolumeLink: Schema.optional(Schema.String),
                  title: Schema.optional(Schema.String),
                  author: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
      ),
    }),
  ).annotate({ identifier: "Offers" }) as any as Schema.Schema<Offers>;

export interface AnnotationsSummary {
  layers?: Array<{
    remainingCharacterCount?: number;
    layerId?: string;
    allowedCharacterCount?: number;
    updated?: string;
    limitType?: string;
  }>;
  kind?: string;
}

export const AnnotationsSummary: Schema.Schema<AnnotationsSummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      layers: Schema.optional(
        Schema.Array(
          Schema.Struct({
            remainingCharacterCount: Schema.optional(Schema.Number),
            layerId: Schema.optional(Schema.String),
            allowedCharacterCount: Schema.optional(Schema.Number),
            updated: Schema.optional(Schema.String),
            limitType: Schema.optional(Schema.String),
          }),
        ),
      ),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AnnotationsSummary",
  }) as any as Schema.Schema<AnnotationsSummary>;

export interface Layersummary {
  /** The link to get the annotations for this layer. */
  annotationsLink?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Timestamp for the last time an item in this layer was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The number of annotations for this layer. */
  annotationCount?: number;
  /** The number of data items for this layer. */
  dataCount?: number;
  /** The current version of this layer's volume annotations. Note that this version applies only to the data in the books.layers.volumeAnnotations.* responses. The actual annotation data is versioned separately. */
  volumeAnnotationsVersion?: string;
  /** Link to get data for this annotation. */
  annotationsDataLink?: string;
  /** The volume id this resource is for. */
  volumeId?: string;
  /** The list of annotation types contained for this layer. */
  annotationTypes?: Array<string>;
  /** Unique id of this layer summary. */
  id?: string;
  /** The layer id for this summary. */
  layerId?: string;
  /** The content version this resource is for. */
  contentVersion?: string;
  /** Resource Type */
  kind?: string;
}

export const Layersummary: Schema.Schema<Layersummary> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotationsLink: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
      updated: Schema.optional(Schema.String),
      annotationCount: Schema.optional(Schema.Number),
      dataCount: Schema.optional(Schema.Number),
      volumeAnnotationsVersion: Schema.optional(Schema.String),
      annotationsDataLink: Schema.optional(Schema.String),
      volumeId: Schema.optional(Schema.String),
      annotationTypes: Schema.optional(Schema.Array(Schema.String)),
      id: Schema.optional(Schema.String),
      layerId: Schema.optional(Schema.String),
      contentVersion: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Layersummary",
  }) as any as Schema.Schema<Layersummary>;

export interface Dictlayerdata {
  common?: { title?: string };
  kind?: string;
  dict?: {
    words?: Array<{
      derivatives?: Array<{
        source?: { url?: string; attribution?: string };
        text?: string;
      }>;
      senses?: Array<{
        synonyms?: Array<{
          text?: string;
          source?: { url?: string; attribution?: string };
        }>;
        conjugations?: Array<{ type?: string; value?: string }>;
        definitions?: Array<{
          definition?: string;
          examples?: Array<{
            text?: string;
            source?: { attribution?: string; url?: string };
          }>;
        }>;
        pronunciation?: string;
        partOfSpeech?: string;
        syllabification?: string;
        pronunciationUrl?: string;
        source?: { url?: string; attribution?: string };
      }>;
      examples?: Array<{
        source?: { url?: string; attribution?: string };
        text?: string;
      }>;
      source?: { url?: string; attribution?: string };
    }>;
    source?: { attribution?: string; url?: string };
  };
}

export const Dictlayerdata: Schema.Schema<Dictlayerdata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      common: Schema.optional(
        Schema.Struct({ title: Schema.optional(Schema.String) }),
      ),
      kind: Schema.optional(Schema.String),
      dict: Schema.optional(
        Schema.Struct({
          words: Schema.optional(
            Schema.Array(
              Schema.Struct({
                derivatives: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      source: Schema.optional(
                        Schema.Struct({
                          url: Schema.optional(Schema.String),
                          attribution: Schema.optional(Schema.String),
                        }),
                      ),
                      text: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                senses: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      synonyms: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            text: Schema.optional(Schema.String),
                            source: Schema.optional(
                              Schema.Struct({
                                url: Schema.optional(Schema.String),
                                attribution: Schema.optional(Schema.String),
                              }),
                            ),
                          }),
                        ),
                      ),
                      conjugations: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            type: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      definitions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            definition: Schema.optional(Schema.String),
                            examples: Schema.optional(
                              Schema.Array(
                                Schema.Struct({
                                  text: Schema.optional(Schema.String),
                                  source: Schema.optional(
                                    Schema.Struct({
                                      attribution: Schema.optional(
                                        Schema.String,
                                      ),
                                      url: Schema.optional(Schema.String),
                                    }),
                                  ),
                                }),
                              ),
                            ),
                          }),
                        ),
                      ),
                      pronunciation: Schema.optional(Schema.String),
                      partOfSpeech: Schema.optional(Schema.String),
                      syllabification: Schema.optional(Schema.String),
                      pronunciationUrl: Schema.optional(Schema.String),
                      source: Schema.optional(
                        Schema.Struct({
                          url: Schema.optional(Schema.String),
                          attribution: Schema.optional(Schema.String),
                        }),
                      ),
                    }),
                  ),
                ),
                examples: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      source: Schema.optional(
                        Schema.Struct({
                          url: Schema.optional(Schema.String),
                          attribution: Schema.optional(Schema.String),
                        }),
                      ),
                      text: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                source: Schema.optional(
                  Schema.Struct({
                    url: Schema.optional(Schema.String),
                    attribution: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          ),
          source: Schema.optional(
            Schema.Struct({
              attribution: Schema.optional(Schema.String),
              url: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    }),
  ).annotate({
    identifier: "Dictlayerdata",
  }) as any as Schema.Schema<Dictlayerdata>;

export interface DictionaryAnnotationdata {
  /** Unique id for this annotation data. */
  id?: string;
  /** The Layer id for this data. * */
  layerId?: string;
  /** Resource Type */
  kind?: string;
  /** Timestamp for the last time this data was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** JSON encoded data for this dictionary annotation data. Emitted with name 'data' in JSON output. Either this or geo_data will be populated. */
  data?: Dictlayerdata;
  /** The type of annotation this data is for. */
  annotationType?: string;
  /** Base64 encoded data for this annotation data. */
  encodedData?: string;
  /** The volume id for this data. * */
  volumeId?: string;
  /** URL for this resource. * */
  selfLink?: string;
}

export const DictionaryAnnotationdata: Schema.Schema<DictionaryAnnotationdata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      layerId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      updated: Schema.optional(Schema.String),
      data: Schema.optional(Dictlayerdata),
      annotationType: Schema.optional(Schema.String),
      encodedData: Schema.optional(Schema.String),
      volumeId: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DictionaryAnnotationdata",
  }) as any as Schema.Schema<DictionaryAnnotationdata>;

export interface Annotations {
  /** A list of annotations. */
  items?: Array<Annotation>;
  /** Total number of annotations found. This may be greater than the number of notes returned in this response if results have been paginated. */
  totalItems?: number;
  /** Resource type. */
  kind?: string;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
}

export const Annotations: Schema.Schema<Annotations> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(Annotation)),
      totalItems: Schema.optional(Schema.Number),
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Annotations",
  }) as any as Schema.Schema<Annotations>;

export interface Series {
  series?: Array<{
    title?: string;
    seriesFormatType?: string;
    bannerImageUrl?: string;
    seriesId?: string;
    seriesType?: string;
    eligibleForSubscription?: boolean;
    seriesSubscriptionReleaseInfo?: {
      nextReleaseInfo?: {
        releaseNumber?: string;
        releaseTime?: string;
        currencyCode?: string;
        amountInMicros?: number;
      };
      currentReleaseInfo?: {
        releaseTime?: string;
        currencyCode?: string;
        amountInMicros?: number;
        releaseNumber?: string;
      };
      cancelTime?: string;
      seriesSubscriptionType?: string;
    };
    imageUrl?: string;
    isComplete?: boolean;
    subscriptionId?: string;
  }>;
  /** Resource type. */
  kind?: string;
}

export const Series: Schema.Schema<Series> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      series: Schema.optional(
        Schema.Array(
          Schema.Struct({
            title: Schema.optional(Schema.String),
            seriesFormatType: Schema.optional(Schema.String),
            bannerImageUrl: Schema.optional(Schema.String),
            seriesId: Schema.optional(Schema.String),
            seriesType: Schema.optional(Schema.String),
            eligibleForSubscription: Schema.optional(Schema.Boolean),
            seriesSubscriptionReleaseInfo: Schema.optional(
              Schema.Struct({
                nextReleaseInfo: Schema.optional(
                  Schema.Struct({
                    releaseNumber: Schema.optional(Schema.String),
                    releaseTime: Schema.optional(Schema.String),
                    currencyCode: Schema.optional(Schema.String),
                    amountInMicros: Schema.optional(Schema.Number),
                  }),
                ),
                currentReleaseInfo: Schema.optional(
                  Schema.Struct({
                    releaseTime: Schema.optional(Schema.String),
                    currencyCode: Schema.optional(Schema.String),
                    amountInMicros: Schema.optional(Schema.Number),
                    releaseNumber: Schema.optional(Schema.String),
                  }),
                ),
                cancelTime: Schema.optional(Schema.String),
                seriesSubscriptionType: Schema.optional(Schema.String),
              }),
            ),
            imageUrl: Schema.optional(Schema.String),
            isComplete: Schema.optional(Schema.Boolean),
            subscriptionId: Schema.optional(Schema.String),
          }),
        ),
      ),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Series" }) as any as Schema.Schema<Series>;

export interface Usersettings {
  notification?: {
    rewardExpirations?: { opted_state?: string };
    priceDrop?: { opted_state?: string };
    matchMyInterests?: { opted_state?: string };
    moreFromAuthors?: { opted_state?: string };
    moreFromSeries?: { opted_state?: string };
  };
  /** Resource type. */
  kind?: string;
  /** User settings in sub-objects, each for different purposes. */
  notesExport?: { isEnabled?: boolean; folderName?: string };
}

export const Usersettings: Schema.Schema<Usersettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      notification: Schema.optional(
        Schema.Struct({
          rewardExpirations: Schema.optional(
            Schema.Struct({ opted_state: Schema.optional(Schema.String) }),
          ),
          priceDrop: Schema.optional(
            Schema.Struct({ opted_state: Schema.optional(Schema.String) }),
          ),
          matchMyInterests: Schema.optional(
            Schema.Struct({ opted_state: Schema.optional(Schema.String) }),
          ),
          moreFromAuthors: Schema.optional(
            Schema.Struct({ opted_state: Schema.optional(Schema.String) }),
          ),
          moreFromSeries: Schema.optional(
            Schema.Struct({ opted_state: Schema.optional(Schema.String) }),
          ),
        }),
      ),
      kind: Schema.optional(Schema.String),
      notesExport: Schema.optional(
        Schema.Struct({
          isEnabled: Schema.optional(Schema.Boolean),
          folderName: Schema.optional(Schema.String),
        }),
      ),
    }),
  ).annotate({
    identifier: "Usersettings",
  }) as any as Schema.Schema<Usersettings>;

export interface Metadata {
  /** A list of offline dictionary metadata. */
  items?: Array<{
    size?: string;
    version?: string;
    download_url?: string;
    encrypted_key?: string;
    language?: string;
  }>;
  /** Resource type. */
  kind?: string;
}

export const Metadata: Schema.Schema<Metadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(
        Schema.Array(
          Schema.Struct({
            size: Schema.optional(Schema.String),
            version: Schema.optional(Schema.String),
            download_url: Schema.optional(Schema.String),
            encrypted_key: Schema.optional(Schema.String),
            language: Schema.optional(Schema.String),
          }),
        ),
      ),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface Geolayerdata {
  kind?: string;
  geo?: {
    viewport?: {
      lo?: { longitude?: number; latitude?: number };
      hi?: { longitude?: number; latitude?: number };
    };
    mapType?: string;
    zoom?: number;
    longitude?: number;
    boundary?: Array<string>;
    countryCode?: string;
    cachePolicy?: string;
    latitude?: number;
  };
  common?: {
    lang?: string;
    previewImageUrl?: string;
    title?: string;
    snippet?: string;
    snippetUrl?: string;
  };
}

export const Geolayerdata: Schema.Schema<Geolayerdata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      geo: Schema.optional(
        Schema.Struct({
          viewport: Schema.optional(
            Schema.Struct({
              lo: Schema.optional(
                Schema.Struct({
                  longitude: Schema.optional(Schema.Number),
                  latitude: Schema.optional(Schema.Number),
                }),
              ),
              hi: Schema.optional(
                Schema.Struct({
                  longitude: Schema.optional(Schema.Number),
                  latitude: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
          mapType: Schema.optional(Schema.String),
          zoom: Schema.optional(Schema.Number),
          longitude: Schema.optional(Schema.Number),
          boundary: Schema.optional(Schema.Array(Schema.String)),
          countryCode: Schema.optional(Schema.String),
          cachePolicy: Schema.optional(Schema.String),
          latitude: Schema.optional(Schema.Number),
        }),
      ),
      common: Schema.optional(
        Schema.Struct({
          lang: Schema.optional(Schema.String),
          previewImageUrl: Schema.optional(Schema.String),
          title: Schema.optional(Schema.String),
          snippet: Schema.optional(Schema.String),
          snippetUrl: Schema.optional(Schema.String),
        }),
      ),
    }),
  ).annotate({
    identifier: "Geolayerdata",
  }) as any as Schema.Schema<Geolayerdata>;

export interface GeoAnnotationdata {
  /** Resource Type */
  kind?: string;
  /** Timestamp for the last time this data was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** Unique id for this annotation data. */
  id?: string;
  /** The Layer id for this data. * */
  layerId?: string;
  /** The volume id for this data. * */
  volumeId?: string;
  /** URL for this resource. * */
  selfLink?: string;
  /** JSON encoded data for this geo annotation data. Emitted with name 'data' in JSON output. Either this or dict_data will be populated. */
  data?: Geolayerdata;
  /** The type of annotation this data is for. */
  annotationType?: string;
  /** Base64 encoded data for this annotation data. */
  encodedData?: string;
}

export const GeoAnnotationdata: Schema.Schema<GeoAnnotationdata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      updated: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      layerId: Schema.optional(Schema.String),
      volumeId: Schema.optional(Schema.String),
      selfLink: Schema.optional(Schema.String),
      data: Schema.optional(Geolayerdata),
      annotationType: Schema.optional(Schema.String),
      encodedData: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GeoAnnotationdata",
  }) as any as Schema.Schema<GeoAnnotationdata>;

export interface FamilyInfo {
  /** Family membership info of the user that made the request. */
  membership?: {
    isInFamily?: boolean;
    role?: string;
    acquirePermission?: string;
    ageGroup?: string;
    allowedMaturityRating?: string;
  };
  /** Resource type. */
  kind?: string;
}

export const FamilyInfo: Schema.Schema<FamilyInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      membership: Schema.optional(
        Schema.Struct({
          isInFamily: Schema.optional(Schema.Boolean),
          role: Schema.optional(Schema.String),
          acquirePermission: Schema.optional(Schema.String),
          ageGroup: Schema.optional(Schema.String),
          allowedMaturityRating: Schema.optional(Schema.String),
        }),
      ),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "FamilyInfo" }) as any as Schema.Schema<FamilyInfo>;

export interface Annotationsdata {
  /** A list of Annotation Data. */
  items?: Array<GeoAnnotationdata>;
  /** The total number of volume annotations found. */
  totalItems?: number;
  /** Resource type */
  kind?: string;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
}

export const Annotationsdata: Schema.Schema<Annotationsdata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(GeoAnnotationdata)),
      totalItems: Schema.optional(Schema.Number),
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Annotationsdata",
  }) as any as Schema.Schema<Annotationsdata>;

export interface Volumeannotations {
  /** The version string for all of the volume annotations in this layer (not just the ones in this response). Note: the version string doesn't apply to the annotation data, just the information in this response (e.g. the location of annotations in the book). */
  version?: string;
  /** The total number of volume annotations found. */
  totalItems?: number;
  /** A list of volume annotations. */
  items?: Array<Volumeannotation>;
  /** Resource type */
  kind?: string;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
}

export const Volumeannotations: Schema.Schema<Volumeannotations> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      totalItems: Schema.optional(Schema.Number),
      items: Schema.optional(Schema.Array(Volumeannotation)),
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Volumeannotations",
  }) as any as Schema.Schema<Volumeannotations>;

export interface Layersummaries {
  /** The total number of layer summaries found. */
  totalItems?: number;
  /** Resource type. */
  kind?: string;
  /** A list of layer summary items. */
  items?: Array<Layersummary>;
}

export const Layersummaries: Schema.Schema<Layersummaries> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      totalItems: Schema.optional(Schema.Number),
      kind: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Layersummary)),
    }),
  ).annotate({
    identifier: "Layersummaries",
  }) as any as Schema.Schema<Layersummaries>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetNotificationRequest {
  /** String to identify the originator of this request. */
  source?: string;
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating notification title and body. */
  locale?: string;
  /** String to identify the notification. */
  notification_id: string;
}

export const GetNotificationRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    notification_id: Schema.String.pipe(T.HttpQuery("notification_id")),
  },
).pipe(
  T.Http({ method: "GET", path: "books/v1/notification/get" }),
  svc,
) as unknown as Schema.Schema<GetNotificationRequest>;

export type GetNotificationResponse = Notification;
export const GetNotificationResponse = /*@__PURE__*/ /*#__PURE__*/ Notification;

export type GetNotificationError = DefaultErrors;

/** Returns notification details for a given notification id. */
export const getNotification: API.OperationMethod<
  GetNotificationRequest,
  GetNotificationResponse,
  GetNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNotificationRequest,
  output: GetNotificationResponse,
  errors: [],
}));

export interface GetVolumesRequest {
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
  /** ID of volume to retrieve. */
  volumeId: string;
  /** string to identify the originator of this request. */
  source?: string;
  user_library_consistent_read?: boolean;
  /** Brand results for partner ID. */
  partner?: string;
  /** Restrict information returned to a set of selected fields. */
  projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE" | (string & {});
  /** Set to true to include non-comics series. Defaults to false. */
  includeNonComicsSeries?: boolean;
}

export const GetVolumesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  user_library_consistent_read: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("user_library_consistent_read"),
  ),
  partner: Schema.optional(Schema.String).pipe(T.HttpQuery("partner")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  includeNonComicsSeries: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeNonComicsSeries"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/{volumeId}" }),
  svc,
) as unknown as Schema.Schema<GetVolumesRequest>;

export type GetVolumesResponse = Volume;
export const GetVolumesResponse = /*@__PURE__*/ /*#__PURE__*/ Volume;

export type GetVolumesError = DefaultErrors;

/** Gets volume information for a single volume. */
export const getVolumes: API.OperationMethod<
  GetVolumesRequest,
  GetVolumesResponse,
  GetVolumesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVolumesRequest,
  output: GetVolumesResponse,
  errors: [],
}));

export interface ListVolumesRequest {
  /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?:
    | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED"
    | "MATURE"
    | "not-mature"
    | (string & {});
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Sort search results. */
  orderBy?: "ORDER_BY_UNDEFINED" | "newest" | "relevance" | (string & {});
  /** Restrict to books or magazines. */
  printType?:
    | "PRINT_TYPE_UNDEFINED"
    | "ALL"
    | "BOOKS"
    | "MAGAZINES"
    | (string & {});
  /** Filter search results. */
  filter?:
    | "FILTER_UNDEFINED"
    | "ebooks"
    | "free-ebooks"
    | "full"
    | "paid-ebooks"
    | "partial"
    | (string & {});
  /** Restrict results to books with this language code. */
  langRestrict?: string;
  /** Restrict search to this user's library. */
  libraryRestrict?:
    | "LIBRARY_RESTRICT_UNDEFINED"
    | "my-library"
    | "no-restrict"
    | (string & {});
  /** Full-text search query string. */
  q: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** Restrict and brand results for partner ID. */
  partner?: string;
  /** Index of the first result to return (starts at 0) */
  startIndex?: number;
  /** Restrict information returned to a set of selected fields. */
  projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE" | (string & {});
  /** Set to true to show books available for preorder. Defaults to false. */
  showPreorders?: boolean;
  /** Restrict to volumes by download availability. */
  download?: "DOWNLOAD_UNDEFINED" | "EPUB" | (string & {});
}

export const ListVolumesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  maxAllowedMaturityRating: Schema.optional(Schema.String).pipe(
    T.HttpQuery("maxAllowedMaturityRating"),
  ),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  printType: Schema.optional(Schema.String).pipe(T.HttpQuery("printType")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  langRestrict: Schema.optional(Schema.String).pipe(
    T.HttpQuery("langRestrict"),
  ),
  libraryRestrict: Schema.optional(Schema.String).pipe(
    T.HttpQuery("libraryRestrict"),
  ),
  q: Schema.String.pipe(T.HttpQuery("q")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  partner: Schema.optional(Schema.String).pipe(T.HttpQuery("partner")),
  startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  showPreorders: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("showPreorders"),
  ),
  download: Schema.optional(Schema.String).pipe(T.HttpQuery("download")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes" }),
  svc,
) as unknown as Schema.Schema<ListVolumesRequest>;

export type ListVolumesResponse = Volumes;
export const ListVolumesResponse = /*@__PURE__*/ /*#__PURE__*/ Volumes;

export type ListVolumesError = DefaultErrors;

/** Performs a book search. */
export const listVolumes: API.OperationMethod<
  ListVolumesRequest,
  ListVolumesResponse,
  ListVolumesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListVolumesRequest,
  output: ListVolumesResponse,
  errors: [],
}));

export interface ListVolumesRecommendedRequest {
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?:
    | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED"
    | "MATURE"
    | "not-mature"
    | (string & {});
  /** String to identify the originator of this request. */
  source?: string;
}

export const ListVolumesRecommendedRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    maxAllowedMaturityRating: Schema.optional(Schema.String).pipe(
      T.HttpQuery("maxAllowedMaturityRating"),
    ),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/volumes/recommended" }),
    svc,
  ) as unknown as Schema.Schema<ListVolumesRecommendedRequest>;

export type ListVolumesRecommendedResponse = Volumes;
export const ListVolumesRecommendedResponse =
  /*@__PURE__*/ /*#__PURE__*/ Volumes;

export type ListVolumesRecommendedError = DefaultErrors;

/** Return a list of recommended books for the current user. */
export const listVolumesRecommended: API.OperationMethod<
  ListVolumesRecommendedRequest,
  ListVolumesRecommendedResponse,
  ListVolumesRecommendedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListVolumesRecommendedRequest,
  output: ListVolumesRecommendedResponse,
  errors: [],
}));

export interface RateVolumesRecommendedRequest {
  /** String to identify the originator of this request. */
  source?: string;
  /** ID of the source volume. */
  volumeId: string;
  /** Rating to be given to the volume. */
  rating: "RATING_UNDEFINED" | "HAVE_IT" | "NOT_INTERESTED" | (string & {});
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
}

export const RateVolumesRecommendedRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
    rating: Schema.String.pipe(T.HttpQuery("rating")),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/volumes/recommended/rate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RateVolumesRecommendedRequest>;

export type RateVolumesRecommendedResponse =
  BooksVolumesRecommendedRateResponse;
export const RateVolumesRecommendedResponse =
  /*@__PURE__*/ /*#__PURE__*/ BooksVolumesRecommendedRateResponse;

export type RateVolumesRecommendedError = DefaultErrors;

/** Rate a recommended book for the current user. */
export const rateVolumesRecommended: API.OperationMethod<
  RateVolumesRecommendedRequest,
  RateVolumesRecommendedResponse,
  RateVolumesRecommendedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RateVolumesRecommendedRequest,
  output: RateVolumesRecommendedResponse,
  errors: [],
}));

export interface ListVolumesUseruploadedRequest {
  /** The processing state of the user uploaded volumes to be returned. */
  processingState?:
    | "PROCESSING_STATE_UNDEFINED"
    | "COMPLETED_FAILED"
    | "COMPLETED_SUCCESS"
    | "RUNNING"
    | (string & {})[];
  /** Index of the first result to return (starts at 0) */
  startIndex?: number;
  /** String to identify the originator of this request. */
  source?: string;
  /** The ids of the volumes to be returned. If not specified all that match the processingState are returned. */
  volumeId?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
}

export const ListVolumesUseruploadedRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    processingState: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("processingState"),
    ),
    startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    volumeId: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("volumeId"),
    ),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/volumes/useruploaded" }),
    svc,
  ) as unknown as Schema.Schema<ListVolumesUseruploadedRequest>;

export type ListVolumesUseruploadedResponse = Volumes;
export const ListVolumesUseruploadedResponse =
  /*@__PURE__*/ /*#__PURE__*/ Volumes;

export type ListVolumesUseruploadedError = DefaultErrors;

/** Return a list of books uploaded by the current user. */
export const listVolumesUseruploaded: API.OperationMethod<
  ListVolumesUseruploadedRequest,
  ListVolumesUseruploadedResponse,
  ListVolumesUseruploadedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListVolumesUseruploadedRequest,
  output: ListVolumesUseruploadedResponse,
  errors: [],
}));

export interface ListVolumesMybooksRequest {
  /** How the book was acquired */
  acquireMethod?:
    | "ACQUIRE_METHOD_UNDEFINED"
    | "FAMILY_SHARED"
    | "PREORDERED"
    | "PREVIOUSLY_RENTED"
    | "PUBLIC_DOMAIN"
    | "PURCHASED"
    | "RENTED"
    | "SAMPLE"
    | "UPLOADED"
    | (string & {})[];
  /** Maximum number of results to return. */
  maxResults?: number;
  /** ISO-639-1 language and ISO-3166-1 country code. Ex:'en_US'. Used for generating recommendations. */
  locale?: string;
  /** The processing state of the user uploaded volumes to be returned. Applicable only if the UPLOADED is specified in the acquireMethod. */
  processingState?:
    | "PROCESSING_STATE_UNDEFINED"
    | "COMPLETED_FAILED"
    | "COMPLETED_SUCCESS"
    | "RUNNING"
    | (string & {})[];
  /** Index of the first result to return (starts at 0) */
  startIndex?: number;
  /** String to identify the originator of this request. */
  source?: string;
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
}

export const ListVolumesMybooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    acquireMethod: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("acquireMethod"),
    ),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    processingState: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("processingState"),
    ),
    startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/volumes/mybooks" }),
    svc,
  ) as unknown as Schema.Schema<ListVolumesMybooksRequest>;

export type ListVolumesMybooksResponse = Volumes;
export const ListVolumesMybooksResponse = /*@__PURE__*/ /*#__PURE__*/ Volumes;

export type ListVolumesMybooksError = DefaultErrors;

/** Return a list of books in My Library. */
export const listVolumesMybooks: API.OperationMethod<
  ListVolumesMybooksRequest,
  ListVolumesMybooksResponse,
  ListVolumesMybooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListVolumesMybooksRequest,
  output: ListVolumesMybooksResponse,
  errors: [],
}));

export interface ListVolumesAssociatedRequest {
  /** ID of the source volume. */
  volumeId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** Association type. */
  association?:
    | "ASSOCIATION_UNDEFINED"
    | "end-of-sample"
    | "end-of-volume"
    | "related-for-play"
    | (string & {});
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?:
    | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED"
    | "MATURE"
    | "not-mature"
    | (string & {});
}

export const ListVolumesAssociatedRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    association: Schema.optional(Schema.String).pipe(
      T.HttpQuery("association"),
    ),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    maxAllowedMaturityRating: Schema.optional(Schema.String).pipe(
      T.HttpQuery("maxAllowedMaturityRating"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/volumes/{volumeId}/associated" }),
    svc,
  ) as unknown as Schema.Schema<ListVolumesAssociatedRequest>;

export type ListVolumesAssociatedResponse = Volumes;
export const ListVolumesAssociatedResponse =
  /*@__PURE__*/ /*#__PURE__*/ Volumes;

export type ListVolumesAssociatedError = DefaultErrors;

/** Return a list of associated books. */
export const listVolumesAssociated: API.OperationMethod<
  ListVolumesAssociatedRequest,
  ListVolumesAssociatedResponse,
  ListVolumesAssociatedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListVolumesAssociatedRequest,
  output: ListVolumesAssociatedResponse,
  errors: [],
}));

export interface AddVolumeMylibraryBookshelvesRequest {
  /** ID of bookshelf to which to add a volume. */
  shelf: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** ID of volume to add. */
  volumeId: string;
  /** The reason for which the book is added to the library. */
  reason?:
    | "REASON_UNDEFINED"
    | "IOS_PREX"
    | "IOS_SEARCH"
    | "ONBOARDING"
    | (string & {});
}

export const AddVolumeMylibraryBookshelvesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shelf: Schema.String.pipe(T.HttpPath("shelf")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
    reason: Schema.optional(Schema.String).pipe(T.HttpQuery("reason")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/mylibrary/bookshelves/{shelf}/addVolume",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AddVolumeMylibraryBookshelvesRequest>;

export type AddVolumeMylibraryBookshelvesResponse = Empty;
export const AddVolumeMylibraryBookshelvesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type AddVolumeMylibraryBookshelvesError = DefaultErrors;

/** Adds a volume to a bookshelf. */
export const addVolumeMylibraryBookshelves: API.OperationMethod<
  AddVolumeMylibraryBookshelvesRequest,
  AddVolumeMylibraryBookshelvesResponse,
  AddVolumeMylibraryBookshelvesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddVolumeMylibraryBookshelvesRequest,
  output: AddVolumeMylibraryBookshelvesResponse,
  errors: [],
}));

export interface ClearVolumesMylibraryBookshelvesRequest {
  /** ID of bookshelf from which to remove a volume. */
  shelf: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const ClearVolumesMylibraryBookshelvesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shelf: Schema.String.pipe(T.HttpPath("shelf")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/mylibrary/bookshelves/{shelf}/clearVolumes",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ClearVolumesMylibraryBookshelvesRequest>;

export type ClearVolumesMylibraryBookshelvesResponse = Empty;
export const ClearVolumesMylibraryBookshelvesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type ClearVolumesMylibraryBookshelvesError = DefaultErrors;

/** Clears all volumes from a bookshelf. */
export const clearVolumesMylibraryBookshelves: API.OperationMethod<
  ClearVolumesMylibraryBookshelvesRequest,
  ClearVolumesMylibraryBookshelvesResponse,
  ClearVolumesMylibraryBookshelvesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ClearVolumesMylibraryBookshelvesRequest,
  output: ClearVolumesMylibraryBookshelvesResponse,
  errors: [],
}));

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

export const MoveVolumeMylibraryBookshelvesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shelf: Schema.String.pipe(T.HttpPath("shelf")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
    volumePosition: Schema.Number.pipe(T.HttpQuery("volumePosition")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/mylibrary/bookshelves/{shelf}/moveVolume",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<MoveVolumeMylibraryBookshelvesRequest>;

export type MoveVolumeMylibraryBookshelvesResponse = Empty;
export const MoveVolumeMylibraryBookshelvesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type MoveVolumeMylibraryBookshelvesError = DefaultErrors;

/** Moves a volume within a bookshelf. */
export const moveVolumeMylibraryBookshelves: API.OperationMethod<
  MoveVolumeMylibraryBookshelvesRequest,
  MoveVolumeMylibraryBookshelvesResponse,
  MoveVolumeMylibraryBookshelvesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MoveVolumeMylibraryBookshelvesRequest,
  output: MoveVolumeMylibraryBookshelvesResponse,
  errors: [],
}));

export interface RemoveVolumeMylibraryBookshelvesRequest {
  /** The reason for which the book is removed from the library. */
  reason?: "REASON_UNDEFINED" | "ONBOARDING" | (string & {});
  /** String to identify the originator of this request. */
  source?: string;
  /** ID of volume to remove. */
  volumeId: string;
  /** ID of bookshelf from which to remove a volume. */
  shelf: string;
}

export const RemoveVolumeMylibraryBookshelvesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reason: Schema.optional(Schema.String).pipe(T.HttpQuery("reason")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
    shelf: Schema.String.pipe(T.HttpPath("shelf")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/mylibrary/bookshelves/{shelf}/removeVolume",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RemoveVolumeMylibraryBookshelvesRequest>;

export type RemoveVolumeMylibraryBookshelvesResponse = Empty;
export const RemoveVolumeMylibraryBookshelvesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type RemoveVolumeMylibraryBookshelvesError = DefaultErrors;

/** Removes a volume from a bookshelf. */
export const removeVolumeMylibraryBookshelves: API.OperationMethod<
  RemoveVolumeMylibraryBookshelvesRequest,
  RemoveVolumeMylibraryBookshelvesResponse,
  RemoveVolumeMylibraryBookshelvesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveVolumeMylibraryBookshelvesRequest,
  output: RemoveVolumeMylibraryBookshelvesResponse,
  errors: [],
}));

export interface GetMylibraryBookshelvesRequest {
  /** ID of bookshelf to retrieve. */
  shelf: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetMylibraryBookshelvesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shelf: Schema.String.pipe(T.HttpPath("shelf")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/mylibrary/bookshelves/{shelf}" }),
    svc,
  ) as unknown as Schema.Schema<GetMylibraryBookshelvesRequest>;

export type GetMylibraryBookshelvesResponse = Bookshelf;
export const GetMylibraryBookshelvesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Bookshelf;

export type GetMylibraryBookshelvesError = DefaultErrors;

/** Retrieves metadata for a specific bookshelf belonging to the authenticated user. */
export const getMylibraryBookshelves: API.OperationMethod<
  GetMylibraryBookshelvesRequest,
  GetMylibraryBookshelvesResponse,
  GetMylibraryBookshelvesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMylibraryBookshelvesRequest,
  output: GetMylibraryBookshelvesResponse,
  errors: [],
}));

export interface ListMylibraryBookshelvesRequest {
  /** String to identify the originator of this request. */
  source?: string;
}

export const ListMylibraryBookshelvesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/mylibrary/bookshelves" }),
    svc,
  ) as unknown as Schema.Schema<ListMylibraryBookshelvesRequest>;

export type ListMylibraryBookshelvesResponse = Bookshelves;
export const ListMylibraryBookshelvesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Bookshelves;

export type ListMylibraryBookshelvesError = DefaultErrors;

/** Retrieves a list of bookshelves belonging to the authenticated user. */
export const listMylibraryBookshelves: API.OperationMethod<
  ListMylibraryBookshelvesRequest,
  ListMylibraryBookshelvesResponse,
  ListMylibraryBookshelvesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListMylibraryBookshelvesRequest,
  output: ListMylibraryBookshelvesResponse,
  errors: [],
}));

export interface ListMylibraryBookshelvesVolumesRequest {
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
  /** Index of the first element to return (starts at 0) */
  startIndex?: number;
  /** String to identify the originator of this request. */
  source?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** Restrict information returned to a set of selected fields. */
  projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE" | (string & {});
  /** Set to true to show pre-ordered books. Defaults to false. */
  showPreorders?: boolean;
  /** The bookshelf ID or name retrieve volumes for. */
  shelf: string;
  /** Full-text search query string in this bookshelf. */
  q?: string;
}

export const ListMylibraryBookshelvesVolumesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
    startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
    showPreorders: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showPreorders"),
    ),
    shelf: Schema.String.pipe(T.HttpPath("shelf")),
    q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "books/v1/mylibrary/bookshelves/{shelf}/volumes",
    }),
    svc,
  ) as unknown as Schema.Schema<ListMylibraryBookshelvesVolumesRequest>;

export type ListMylibraryBookshelvesVolumesResponse = Volumes;
export const ListMylibraryBookshelvesVolumesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Volumes;

export type ListMylibraryBookshelvesVolumesError = DefaultErrors;

/** Gets volume information for volumes on a bookshelf. */
export const listMylibraryBookshelvesVolumes: API.OperationMethod<
  ListMylibraryBookshelvesVolumesRequest,
  ListMylibraryBookshelvesVolumesResponse,
  ListMylibraryBookshelvesVolumesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListMylibraryBookshelvesVolumesRequest,
  output: ListMylibraryBookshelvesVolumesResponse,
  errors: [],
}));

export interface GetMylibraryReadingpositionsRequest {
  /** ID of volume for which to retrieve a reading position. */
  volumeId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** Volume content version for which this reading position is requested. */
  contentVersion?: string;
}

export const GetMylibraryReadingpositionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    contentVersion: Schema.optional(Schema.String).pipe(
      T.HttpQuery("contentVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "books/v1/mylibrary/readingpositions/{volumeId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetMylibraryReadingpositionsRequest>;

export type GetMylibraryReadingpositionsResponse = ReadingPosition;
export const GetMylibraryReadingpositionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReadingPosition;

export type GetMylibraryReadingpositionsError = DefaultErrors;

/** Retrieves my reading position information for a volume. */
export const getMylibraryReadingpositions: API.OperationMethod<
  GetMylibraryReadingpositionsRequest,
  GetMylibraryReadingpositionsResponse,
  GetMylibraryReadingpositionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMylibraryReadingpositionsRequest,
  output: GetMylibraryReadingpositionsResponse,
  errors: [],
}));

export interface SetPositionMylibraryReadingpositionsRequest {
  /** ID of volume for which to update the reading position. */
  volumeId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** Position string for the new volume reading position. */
  position: string;
  /** Volume content version for which this reading position applies. */
  contentVersion?: string;
  /** Random persistent device cookie optional on set position. */
  deviceCookie?: string;
  /** Action that caused this reading position to be set. */
  action?:
    | "ACTION_UNDEFINED"
    | "bookmark"
    | "chapter"
    | "next-page"
    | "prev-page"
    | "scroll"
    | "search"
    | (string & {});
  /** RFC 3339 UTC format timestamp associated with this reading position. */
  timestamp: string;
}

export const SetPositionMylibraryReadingpositionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    position: Schema.String.pipe(T.HttpQuery("position")),
    contentVersion: Schema.optional(Schema.String).pipe(
      T.HttpQuery("contentVersion"),
    ),
    deviceCookie: Schema.optional(Schema.String).pipe(
      T.HttpQuery("deviceCookie"),
    ),
    action: Schema.optional(Schema.String).pipe(T.HttpQuery("action")),
    timestamp: Schema.String.pipe(T.HttpQuery("timestamp")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/mylibrary/readingpositions/{volumeId}/setPosition",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetPositionMylibraryReadingpositionsRequest>;

export type SetPositionMylibraryReadingpositionsResponse = Empty;
export const SetPositionMylibraryReadingpositionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type SetPositionMylibraryReadingpositionsError = DefaultErrors;

/** Sets my reading position information for a volume. */
export const setPositionMylibraryReadingpositions: API.OperationMethod<
  SetPositionMylibraryReadingpositionsRequest,
  SetPositionMylibraryReadingpositionsResponse,
  SetPositionMylibraryReadingpositionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetPositionMylibraryReadingpositionsRequest,
  output: SetPositionMylibraryReadingpositionsResponse,
  errors: [],
}));

export interface UpdateMylibraryAnnotationsRequest {
  /** The ID for the annotation to update. */
  annotationId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** Request body */
  body?: Annotation;
}

export const UpdateMylibraryAnnotationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    annotationId: Schema.String.pipe(T.HttpPath("annotationId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    body: Schema.optional(Annotation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "books/v1/mylibrary/annotations/{annotationId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateMylibraryAnnotationsRequest>;

export type UpdateMylibraryAnnotationsResponse = Annotation;
export const UpdateMylibraryAnnotationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Annotation;

export type UpdateMylibraryAnnotationsError = DefaultErrors;

/** Updates an existing annotation. */
export const updateMylibraryAnnotations: API.OperationMethod<
  UpdateMylibraryAnnotationsRequest,
  UpdateMylibraryAnnotationsResponse,
  UpdateMylibraryAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMylibraryAnnotationsRequest,
  output: UpdateMylibraryAnnotationsResponse,
  errors: [],
}));

export interface DeleteMylibraryAnnotationsRequest {
  /** The ID for the annotation to delete. */
  annotationId: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const DeleteMylibraryAnnotationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    annotationId: Schema.String.pipe(T.HttpPath("annotationId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "books/v1/mylibrary/annotations/{annotationId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteMylibraryAnnotationsRequest>;

export type DeleteMylibraryAnnotationsResponse = Empty;
export const DeleteMylibraryAnnotationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteMylibraryAnnotationsError = DefaultErrors;

/** Deletes an annotation. */
export const deleteMylibraryAnnotations: API.OperationMethod<
  DeleteMylibraryAnnotationsRequest,
  DeleteMylibraryAnnotationsResponse,
  DeleteMylibraryAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMylibraryAnnotationsRequest,
  output: DeleteMylibraryAnnotationsResponse,
  errors: [],
}));

export interface InsertMylibraryAnnotationsRequest {
  /** String to identify the originator of this request. */
  source?: string;
  /** The ID for the annotation to insert. */
  annotationId?: string;
  /** Requests that only the summary of the specified layer be provided in the response. */
  showOnlySummaryInResponse?: boolean;
  /** ISO-3166-1 code to override the IP-based location. */
  country?: string;
  /** Request body */
  body?: Annotation;
}

export const InsertMylibraryAnnotationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    annotationId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("annotationId"),
    ),
    showOnlySummaryInResponse: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showOnlySummaryInResponse"),
    ),
    country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
    body: Schema.optional(Annotation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/mylibrary/annotations",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertMylibraryAnnotationsRequest>;

export type InsertMylibraryAnnotationsResponse = Annotation;
export const InsertMylibraryAnnotationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Annotation;

export type InsertMylibraryAnnotationsError = DefaultErrors;

/** Inserts a new annotation. */
export const insertMylibraryAnnotations: API.OperationMethod<
  InsertMylibraryAnnotationsRequest,
  InsertMylibraryAnnotationsResponse,
  InsertMylibraryAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertMylibraryAnnotationsRequest,
  output: InsertMylibraryAnnotationsResponse,
  errors: [],
}));

export interface ListMylibraryAnnotationsRequest {
  /** String to identify the originator of this request. */
  source?: string;
  /** The volume to restrict annotations to. */
  volumeId?: string;
  /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
  updatedMax?: string;
  /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
  updatedMin?: string;
  /** The content version for the requested volume. */
  contentVersion?: string;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false. */
  showDeleted?: boolean;
  /** The layer ID to limit annotation by. */
  layerId?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** The layer ID(s) to limit annotation by. */
  layerIds?: string[];
}

export const ListMylibraryAnnotationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    volumeId: Schema.optional(Schema.String).pipe(T.HttpQuery("volumeId")),
    updatedMax: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMax")),
    updatedMin: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMin")),
    contentVersion: Schema.optional(Schema.String).pipe(
      T.HttpQuery("contentVersion"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
    layerId: Schema.optional(Schema.String).pipe(T.HttpQuery("layerId")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    layerIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("layerIds"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/mylibrary/annotations" }),
    svc,
  ) as unknown as Schema.Schema<ListMylibraryAnnotationsRequest>;

export type ListMylibraryAnnotationsResponse = Annotations;
export const ListMylibraryAnnotationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Annotations;

export type ListMylibraryAnnotationsError = DefaultErrors;

/** Retrieves a list of annotations, possibly filtered. */
export const listMylibraryAnnotations: API.PaginatedOperationMethod<
  ListMylibraryAnnotationsRequest,
  ListMylibraryAnnotationsResponse,
  ListMylibraryAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMylibraryAnnotationsRequest,
  output: ListMylibraryAnnotationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface SummaryMylibraryAnnotationsRequest {
  /** Array of layer IDs to get the summary for. */
  layerIds: string[];
  /** Volume id to get the summary for. */
  volumeId: string;
  /** Optional. String to identify the originator of this request. */
  source?: string;
}

export const SummaryMylibraryAnnotationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    layerIds: Schema.Array(Schema.String).pipe(T.HttpQuery("layerIds")),
    volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/mylibrary/annotations/summary",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SummaryMylibraryAnnotationsRequest>;

export type SummaryMylibraryAnnotationsResponse = AnnotationsSummary;
export const SummaryMylibraryAnnotationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AnnotationsSummary;

export type SummaryMylibraryAnnotationsError = DefaultErrors;

/** Gets the summary of specified layers. */
export const summaryMylibraryAnnotations: API.OperationMethod<
  SummaryMylibraryAnnotationsRequest,
  SummaryMylibraryAnnotationsResponse,
  SummaryMylibraryAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SummaryMylibraryAnnotationsRequest,
  output: SummaryMylibraryAnnotationsResponse,
  errors: [],
}));

export interface GetLayersRequest {
  /** The content version for the requested volume. */
  contentVersion?: string;
  /** The volume to retrieve layers for. */
  volumeId: string;
  /** The ID for the layer to get the summary for. */
  summaryId: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetLayersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  contentVersion: Schema.optional(Schema.String).pipe(
    T.HttpQuery("contentVersion"),
  ),
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  summaryId: Schema.String.pipe(T.HttpPath("summaryId")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({
    method: "GET",
    path: "books/v1/volumes/{volumeId}/layersummary/{summaryId}",
  }),
  svc,
) as unknown as Schema.Schema<GetLayersRequest>;

export type GetLayersResponse = Layersummary;
export const GetLayersResponse = /*@__PURE__*/ /*#__PURE__*/ Layersummary;

export type GetLayersError = DefaultErrors;

/** Gets the layer summary for a volume. */
export const getLayers: API.OperationMethod<
  GetLayersRequest,
  GetLayersResponse,
  GetLayersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLayersRequest,
  output: GetLayersResponse,
  errors: [],
}));

export interface ListLayersRequest {
  /** The content version for the requested volume. */
  contentVersion?: string;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** The volume to retrieve layers for. */
  volumeId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** Maximum number of results to return */
  maxResults?: number;
}

export const ListLayersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  contentVersion: Schema.optional(Schema.String).pipe(
    T.HttpQuery("contentVersion"),
  ),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/volumes/{volumeId}/layersummary" }),
  svc,
) as unknown as Schema.Schema<ListLayersRequest>;

export type ListLayersResponse = Layersummaries;
export const ListLayersResponse = /*@__PURE__*/ /*#__PURE__*/ Layersummaries;

export type ListLayersError = DefaultErrors;

/** List the layer summaries for a volume. */
export const listLayers: API.OperationMethod<
  ListLayersRequest,
  ListLayersResponse,
  ListLayersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListLayersRequest,
  output: ListLayersResponse,
  errors: [],
}));

export interface GetLayersVolumeAnnotationsRequest {
  /** The ID for the layer to get the annotations. */
  layerId: string;
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** The volume to retrieve annotations for. */
  volumeId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** The ID of the volume annotation to retrieve. */
  annotationId: string;
}

export const GetLayersVolumeAnnotationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    layerId: Schema.String.pipe(T.HttpPath("layerId")),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    annotationId: Schema.String.pipe(T.HttpPath("annotationId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "books/v1/volumes/{volumeId}/layers/{layerId}/annotations/{annotationId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetLayersVolumeAnnotationsRequest>;

export type GetLayersVolumeAnnotationsResponse = Volumeannotation;
export const GetLayersVolumeAnnotationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Volumeannotation;

export type GetLayersVolumeAnnotationsError = DefaultErrors;

/** Gets the volume annotation. */
export const getLayersVolumeAnnotations: API.OperationMethod<
  GetLayersVolumeAnnotationsRequest,
  GetLayersVolumeAnnotationsResponse,
  GetLayersVolumeAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLayersVolumeAnnotationsRequest,
  output: GetLayersVolumeAnnotationsResponse,
  errors: [],
}));

export interface ListLayersVolumeAnnotationsRequest {
  /** The volume to retrieve annotations for. */
  volumeId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
  updatedMax?: string;
  /** The version of the volume annotations that you are requesting. */
  volumeAnnotationsVersion?: string;
  /** The end position to end retrieving data from. */
  endPosition?: string;
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
  updatedMin?: string;
  /** Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false. */
  showDeleted?: boolean;
  /** The content version for the requested volume. */
  contentVersion: string;
  /** The ID for the layer to get the annotations. */
  layerId: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** The end offset to end retrieving data from. */
  endOffset?: string;
  /** The start offset to start retrieving data from. */
  startOffset?: string;
  /** The start position to start retrieving data from. */
  startPosition?: string;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
}

export const ListLayersVolumeAnnotationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    updatedMax: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMax")),
    volumeAnnotationsVersion: Schema.optional(Schema.String).pipe(
      T.HttpQuery("volumeAnnotationsVersion"),
    ),
    endPosition: Schema.optional(Schema.String).pipe(
      T.HttpQuery("endPosition"),
    ),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    updatedMin: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMin")),
    showDeleted: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showDeleted"),
    ),
    contentVersion: Schema.String.pipe(T.HttpQuery("contentVersion")),
    layerId: Schema.String.pipe(T.HttpPath("layerId")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    endOffset: Schema.optional(Schema.String).pipe(T.HttpQuery("endOffset")),
    startOffset: Schema.optional(Schema.String).pipe(
      T.HttpQuery("startOffset"),
    ),
    startPosition: Schema.optional(Schema.String).pipe(
      T.HttpQuery("startPosition"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "books/v1/volumes/{volumeId}/layers/{layerId}",
    }),
    svc,
  ) as unknown as Schema.Schema<ListLayersVolumeAnnotationsRequest>;

export type ListLayersVolumeAnnotationsResponse = Volumeannotations;
export const ListLayersVolumeAnnotationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Volumeannotations;

export type ListLayersVolumeAnnotationsError = DefaultErrors;

/** Gets the volume annotations for a volume and layer. */
export const listLayersVolumeAnnotations: API.PaginatedOperationMethod<
  ListLayersVolumeAnnotationsRequest,
  ListLayersVolumeAnnotationsResponse,
  ListLayersVolumeAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLayersVolumeAnnotationsRequest,
  output: ListLayersVolumeAnnotationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface GetLayersAnnotationDataRequest {
  /** The ID for the layer to get the annotations. */
  layerId: string;
  /** The requested pixel height for any images. If height is provided width must also be provided. */
  h?: number;
  /** The requested pixel width for any images. If width is provided height must also be provided. */
  w?: number;
  /** The content version for the volume you are trying to retrieve. */
  contentVersion: string;
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** The requested scale for the image. */
  scale?: number;
  /** The ID of the annotation data to retrieve. */
  annotationDataId: string;
  /** The volume to retrieve annotations for. */
  volumeId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** For the dictionary layer. Whether or not to allow web definitions. */
  allowWebDefinitions?: boolean;
}

export const GetLayersAnnotationDataRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    layerId: Schema.String.pipe(T.HttpPath("layerId")),
    h: Schema.optional(Schema.Number).pipe(T.HttpQuery("h")),
    w: Schema.optional(Schema.Number).pipe(T.HttpQuery("w")),
    contentVersion: Schema.String.pipe(T.HttpQuery("contentVersion")),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    scale: Schema.optional(Schema.Number).pipe(T.HttpQuery("scale")),
    annotationDataId: Schema.String.pipe(T.HttpPath("annotationDataId")),
    volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    allowWebDefinitions: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowWebDefinitions"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "books/v1/volumes/{volumeId}/layers/{layerId}/data/{annotationDataId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetLayersAnnotationDataRequest>;

export type GetLayersAnnotationDataResponse = DictionaryAnnotationdata;
export const GetLayersAnnotationDataResponse =
  /*@__PURE__*/ /*#__PURE__*/ DictionaryAnnotationdata;

export type GetLayersAnnotationDataError = DefaultErrors;

/** Gets the annotation data. */
export const getLayersAnnotationData: API.OperationMethod<
  GetLayersAnnotationDataRequest,
  GetLayersAnnotationDataResponse,
  GetLayersAnnotationDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLayersAnnotationDataRequest,
  output: GetLayersAnnotationDataResponse,
  errors: [],
}));

export interface ListLayersAnnotationDataRequest {
  /** The requested scale for the image. */
  scale?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** The requested pixel height for any images. If height is provided width must also be provided. */
  h?: number;
  /** The requested pixel width for any images. If width is provided height must also be provided. */
  w?: number;
  /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
  locale?: string;
  /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
  updatedMin?: string;
  /** The list of Annotation Data Ids to retrieve. Pagination is ignored if this is set. */
  annotationDataId?: string[];
  /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
  updatedMax?: string;
  /** The volume to retrieve annotation data for. */
  volumeId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** The ID for the layer to get the annotation data. */
  layerId: string;
  /** The content version for the requested volume. */
  contentVersion: string;
}

export const ListLayersAnnotationDataRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scale: Schema.optional(Schema.Number).pipe(T.HttpQuery("scale")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    h: Schema.optional(Schema.Number).pipe(T.HttpQuery("h")),
    w: Schema.optional(Schema.Number).pipe(T.HttpQuery("w")),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    updatedMin: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMin")),
    annotationDataId: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("annotationDataId"),
    ),
    updatedMax: Schema.optional(Schema.String).pipe(T.HttpQuery("updatedMax")),
    volumeId: Schema.String.pipe(T.HttpPath("volumeId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    layerId: Schema.String.pipe(T.HttpPath("layerId")),
    contentVersion: Schema.String.pipe(T.HttpQuery("contentVersion")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "books/v1/volumes/{volumeId}/layers/{layerId}/data",
    }),
    svc,
  ) as unknown as Schema.Schema<ListLayersAnnotationDataRequest>;

export type ListLayersAnnotationDataResponse = Annotationsdata;
export const ListLayersAnnotationDataResponse =
  /*@__PURE__*/ /*#__PURE__*/ Annotationsdata;

export type ListLayersAnnotationDataError = DefaultErrors;

/** Gets the annotation data for a volume and layer. */
export const listLayersAnnotationData: API.PaginatedOperationMethod<
  ListLayersAnnotationDataRequest,
  ListLayersAnnotationDataResponse,
  ListLayersAnnotationDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLayersAnnotationDataRequest,
  output: ListLayersAnnotationDataResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface GetUserSettingsMyconfigRequest {
  /** Unused. Added only to workaround TEX mandatory request template requirement */
  country?: string;
}

export const GetUserSettingsMyconfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    country: Schema.optional(Schema.String).pipe(T.HttpQuery("country")),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/myconfig/getUserSettings" }),
    svc,
  ) as unknown as Schema.Schema<GetUserSettingsMyconfigRequest>;

export type GetUserSettingsMyconfigResponse = Usersettings;
export const GetUserSettingsMyconfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ Usersettings;

export type GetUserSettingsMyconfigError = DefaultErrors;

/** Gets the current settings for the user. */
export const getUserSettingsMyconfig: API.OperationMethod<
  GetUserSettingsMyconfigRequest,
  GetUserSettingsMyconfigResponse,
  GetUserSettingsMyconfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUserSettingsMyconfigRequest,
  output: GetUserSettingsMyconfigResponse,
  errors: [],
}));

export interface ReleaseDownloadAccessMyconfigRequest {
  /** String to identify the originator of this request. */
  source?: string;
  /** The device/version ID from which to release the restriction. */
  cpksver: string;
  /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
  locale?: string;
  /** The volume(s) to release restrictions for. */
  volumeIds: string[];
}

export const ReleaseDownloadAccessMyconfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    cpksver: Schema.String.pipe(T.HttpQuery("cpksver")),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    volumeIds: Schema.Array(Schema.String).pipe(T.HttpQuery("volumeIds")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/myconfig/releaseDownloadAccess",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReleaseDownloadAccessMyconfigRequest>;

export type ReleaseDownloadAccessMyconfigResponse = DownloadAccesses;
export const ReleaseDownloadAccessMyconfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ DownloadAccesses;

export type ReleaseDownloadAccessMyconfigError = DefaultErrors;

/** Release downloaded content access restriction. */
export const releaseDownloadAccessMyconfig: API.OperationMethod<
  ReleaseDownloadAccessMyconfigRequest,
  ReleaseDownloadAccessMyconfigResponse,
  ReleaseDownloadAccessMyconfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReleaseDownloadAccessMyconfigRequest,
  output: ReleaseDownloadAccessMyconfigResponse,
  errors: [],
}));

export interface UpdateUserSettingsMyconfigRequest {
  /** Request body */
  body?: Usersettings;
}

export const UpdateUserSettingsMyconfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(Usersettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/myconfig/updateUserSettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateUserSettingsMyconfigRequest>;

export type UpdateUserSettingsMyconfigResponse = Usersettings;
export const UpdateUserSettingsMyconfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ Usersettings;

export type UpdateUserSettingsMyconfigError = DefaultErrors;

/** Sets the settings for the user. If a sub-object is specified, it will overwrite the existing sub-object stored in the server. Unspecified sub-objects will retain the existing value. */
export const updateUserSettingsMyconfig: API.OperationMethod<
  UpdateUserSettingsMyconfigRequest,
  UpdateUserSettingsMyconfigResponse,
  UpdateUserSettingsMyconfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateUserSettingsMyconfigRequest,
  output: UpdateUserSettingsMyconfigResponse,
  errors: [],
}));

export interface RequestAccessMyconfigRequest {
  /** The type of access license to request. If not specified, the default is BOTH. */
  licenseTypes?:
    | "LICENSE_TYPES_UNDEFINED"
    | "BOTH"
    | "CONCURRENT"
    | "DOWNLOAD"
    | (string & {});
  /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
  locale?: string;
  /** The client nonce value. */
  nonce: string;
  /** The device/version ID from which to request the restrictions. */
  cpksver: string;
  /** String to identify the originator of this request. */
  source: string;
  /** The volume to request concurrent/download restrictions for. */
  volumeId: string;
}

export const RequestAccessMyconfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    licenseTypes: Schema.optional(Schema.String).pipe(
      T.HttpQuery("licenseTypes"),
    ),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    nonce: Schema.String.pipe(T.HttpQuery("nonce")),
    cpksver: Schema.String.pipe(T.HttpQuery("cpksver")),
    source: Schema.String.pipe(T.HttpQuery("source")),
    volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/myconfig/requestAccess",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RequestAccessMyconfigRequest>;

export type RequestAccessMyconfigResponse = RequestAccessData;
export const RequestAccessMyconfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ RequestAccessData;

export type RequestAccessMyconfigError = DefaultErrors;

/** Request concurrent and download access restrictions. */
export const requestAccessMyconfig: API.OperationMethod<
  RequestAccessMyconfigRequest,
  RequestAccessMyconfigResponse,
  RequestAccessMyconfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RequestAccessMyconfigRequest,
  output: RequestAccessMyconfigResponse,
  errors: [],
}));

export interface SyncVolumeLicensesMyconfigRequest {
  /** Set to true to include non-comics series. Defaults to false. */
  includeNonComicsSeries?: boolean;
  /** List of features supported by the client, i.e., 'RENTALS' */
  features?: "FEATURES_UNDEFINED" | "RENTALS" | (string & {})[];
  /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
  locale?: string;
  /** Set to true to show pre-ordered books. Defaults to false. */
  showPreorders?: boolean;
  /** The volume(s) to request download restrictions for. */
  volumeIds?: string[];
  /** The client nonce value. */
  nonce: string;
  /** The device/version ID from which to release the restriction. */
  cpksver: string;
  /** String to identify the originator of this request. */
  source: string;
}

export const SyncVolumeLicensesMyconfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    includeNonComicsSeries: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("includeNonComicsSeries"),
    ),
    features: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("features"),
    ),
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    showPreorders: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showPreorders"),
    ),
    volumeIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("volumeIds"),
    ),
    nonce: Schema.String.pipe(T.HttpQuery("nonce")),
    cpksver: Schema.String.pipe(T.HttpQuery("cpksver")),
    source: Schema.String.pipe(T.HttpQuery("source")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/myconfig/syncVolumeLicenses",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SyncVolumeLicensesMyconfigRequest>;

export type SyncVolumeLicensesMyconfigResponse = Volumes;
export const SyncVolumeLicensesMyconfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ Volumes;

export type SyncVolumeLicensesMyconfigError = DefaultErrors;

/** Request downloaded content access for specified volumes on the My eBooks shelf. */
export const syncVolumeLicensesMyconfig: API.OperationMethod<
  SyncVolumeLicensesMyconfigRequest,
  SyncVolumeLicensesMyconfigResponse,
  SyncVolumeLicensesMyconfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SyncVolumeLicensesMyconfigRequest,
  output: SyncVolumeLicensesMyconfigResponse,
  errors: [],
}));

export interface GetBookshelvesRequest {
  /** ID of user for whom to retrieve bookshelves. */
  userId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** ID of bookshelf to retrieve. */
  shelf: string;
}

export const GetBookshelvesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  shelf: Schema.String.pipe(T.HttpPath("shelf")),
}).pipe(
  T.Http({
    method: "GET",
    path: "books/v1/users/{userId}/bookshelves/{shelf}",
  }),
  svc,
) as unknown as Schema.Schema<GetBookshelvesRequest>;

export type GetBookshelvesResponse = Bookshelf;
export const GetBookshelvesResponse = /*@__PURE__*/ /*#__PURE__*/ Bookshelf;

export type GetBookshelvesError = DefaultErrors;

/** Retrieves metadata for a specific bookshelf for the specified user. */
export const getBookshelves: API.OperationMethod<
  GetBookshelvesRequest,
  GetBookshelvesResponse,
  GetBookshelvesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBookshelvesRequest,
  output: GetBookshelvesResponse,
  errors: [],
}));

export interface ListBookshelvesRequest {
  /** ID of user for whom to retrieve bookshelves. */
  userId: string;
  /** String to identify the originator of this request. */
  source?: string;
}

export const ListBookshelvesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    userId: Schema.String.pipe(T.HttpPath("userId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  },
).pipe(
  T.Http({ method: "GET", path: "books/v1/users/{userId}/bookshelves" }),
  svc,
) as unknown as Schema.Schema<ListBookshelvesRequest>;

export type ListBookshelvesResponse = Bookshelves;
export const ListBookshelvesResponse = /*@__PURE__*/ /*#__PURE__*/ Bookshelves;

export type ListBookshelvesError = DefaultErrors;

/** Retrieves a list of public bookshelves for the specified user. */
export const listBookshelves: API.OperationMethod<
  ListBookshelvesRequest,
  ListBookshelvesResponse,
  ListBookshelvesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListBookshelvesRequest,
  output: ListBookshelvesResponse,
  errors: [],
}));

export interface ListBookshelvesVolumesRequest {
  /** Index of the first element to return (starts at 0) */
  startIndex?: number;
  /** ID of user for whom to retrieve bookshelf volumes. */
  userId: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** ID of bookshelf to retrieve volumes. */
  shelf: string;
  /** Maximum number of results to return */
  maxResults?: number;
  /** Set to true to show pre-ordered books. Defaults to false. */
  showPreorders?: boolean;
}

export const ListBookshelvesVolumesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    startIndex: Schema.optional(Schema.Number).pipe(T.HttpQuery("startIndex")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    shelf: Schema.String.pipe(T.HttpPath("shelf")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    showPreorders: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("showPreorders"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "books/v1/users/{userId}/bookshelves/{shelf}/volumes",
    }),
    svc,
  ) as unknown as Schema.Schema<ListBookshelvesVolumesRequest>;

export type ListBookshelvesVolumesResponse = Volumes;
export const ListBookshelvesVolumesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Volumes;

export type ListBookshelvesVolumesError = DefaultErrors;

/** Retrieves volumes in a specific bookshelf for the specified user. */
export const listBookshelvesVolumes: API.OperationMethod<
  ListBookshelvesVolumesRequest,
  ListBookshelvesVolumesResponse,
  ListBookshelvesVolumesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListBookshelvesVolumesRequest,
  output: ListBookshelvesVolumesResponse,
  errors: [],
}));

export interface ListOfflineMetadataDictionaryRequest {
  /** The device/version ID from which to request the data. */
  cpksver: string;
}

export const ListOfflineMetadataDictionaryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cpksver: Schema.String.pipe(T.HttpQuery("cpksver")),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/dictionary/listOfflineMetadata" }),
    svc,
  ) as unknown as Schema.Schema<ListOfflineMetadataDictionaryRequest>;

export type ListOfflineMetadataDictionaryResponse = Metadata;
export const ListOfflineMetadataDictionaryResponse =
  /*@__PURE__*/ /*#__PURE__*/ Metadata;

export type ListOfflineMetadataDictionaryError = DefaultErrors;

/** Returns a list of offline dictionary metadata available */
export const listOfflineMetadataDictionary: API.OperationMethod<
  ListOfflineMetadataDictionaryRequest,
  ListOfflineMetadataDictionaryResponse,
  ListOfflineMetadataDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListOfflineMetadataDictionaryRequest,
  output: ListOfflineMetadataDictionaryResponse,
  errors: [],
}));

export interface ShareFamilysharingRequest {
  /** String to identify the originator of this request. */
  source?: string;
  /** The volume to share. */
  volumeId?: string;
  /** The docid to share. */
  docId?: string;
}

export const ShareFamilysharingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    volumeId: Schema.optional(Schema.String).pipe(T.HttpQuery("volumeId")),
    docId: Schema.optional(Schema.String).pipe(T.HttpQuery("docId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/familysharing/share",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ShareFamilysharingRequest>;

export type ShareFamilysharingResponse = Empty;
export const ShareFamilysharingResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type ShareFamilysharingError = DefaultErrors;

/** Initiates sharing of the content with the user's family. Empty response indicates success. */
export const shareFamilysharing: API.OperationMethod<
  ShareFamilysharingRequest,
  ShareFamilysharingResponse,
  ShareFamilysharingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ShareFamilysharingRequest,
  output: ShareFamilysharingResponse,
  errors: [],
}));

export interface GetFamilyInfoFamilysharingRequest {
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetFamilyInfoFamilysharingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/familysharing/getFamilyInfo" }),
    svc,
  ) as unknown as Schema.Schema<GetFamilyInfoFamilysharingRequest>;

export type GetFamilyInfoFamilysharingResponse = FamilyInfo;
export const GetFamilyInfoFamilysharingResponse =
  /*@__PURE__*/ /*#__PURE__*/ FamilyInfo;

export type GetFamilyInfoFamilysharingError = DefaultErrors;

/** Gets information regarding the family that the user is part of. */
export const getFamilyInfoFamilysharing: API.OperationMethod<
  GetFamilyInfoFamilysharingRequest,
  GetFamilyInfoFamilysharingResponse,
  GetFamilyInfoFamilysharingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFamilyInfoFamilysharingRequest,
  output: GetFamilyInfoFamilysharingResponse,
  errors: [],
}));

export interface UnshareFamilysharingRequest {
  /** The docid to unshare. */
  docId?: string;
  /** String to identify the originator of this request. */
  source?: string;
  /** The volume to unshare. */
  volumeId?: string;
}

export const UnshareFamilysharingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    docId: Schema.optional(Schema.String).pipe(T.HttpQuery("docId")),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
    volumeId: Schema.optional(Schema.String).pipe(T.HttpQuery("volumeId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/familysharing/unshare",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UnshareFamilysharingRequest>;

export type UnshareFamilysharingResponse = Empty;
export const UnshareFamilysharingResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type UnshareFamilysharingError = DefaultErrors;

/** Initiates revoking content that has already been shared with the user's family. Empty response indicates success. */
export const unshareFamilysharing: API.OperationMethod<
  UnshareFamilysharingRequest,
  UnshareFamilysharingResponse,
  UnshareFamilysharingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UnshareFamilysharingRequest,
  output: UnshareFamilysharingResponse,
  errors: [],
}));

export interface ListCategoriesOnboardingRequest {
  /** ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset. */
  locale?: string;
}

export const ListCategoriesOnboardingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/onboarding/listCategories" }),
    svc,
  ) as unknown as Schema.Schema<ListCategoriesOnboardingRequest>;

export type ListCategoriesOnboardingResponse = Category;
export const ListCategoriesOnboardingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Category;

export type ListCategoriesOnboardingError = DefaultErrors;

/** List categories for onboarding experience. */
export const listCategoriesOnboarding: API.OperationMethod<
  ListCategoriesOnboardingRequest,
  ListCategoriesOnboardingResponse,
  ListCategoriesOnboardingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListCategoriesOnboardingRequest,
  output: ListCategoriesOnboardingResponse,
  errors: [],
}));

export interface ListCategoryVolumesOnboardingRequest {
  /** ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset. */
  locale?: string;
  /** The maximum allowed maturity rating of returned volumes. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?:
    | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED"
    | "MATURE"
    | "not-mature"
    | (string & {});
  /** Number of maximum results per page to be included in the response. */
  pageSize?: number;
  /** The value of the nextToken from the previous page. */
  pageToken?: string;
  /** List of category ids requested. */
  categoryId?: string[];
}

export const ListCategoryVolumesOnboardingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    maxAllowedMaturityRating: Schema.optional(Schema.String).pipe(
      T.HttpQuery("maxAllowedMaturityRating"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    categoryId: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("categoryId"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/onboarding/listCategoryVolumes" }),
    svc,
  ) as unknown as Schema.Schema<ListCategoryVolumesOnboardingRequest>;

export type ListCategoryVolumesOnboardingResponse = Volume2;
export const ListCategoryVolumesOnboardingResponse =
  /*@__PURE__*/ /*#__PURE__*/ Volume2;

export type ListCategoryVolumesOnboardingError = DefaultErrors;

/** List available volumes under categories for onboarding experience. */
export const listCategoryVolumesOnboarding: API.PaginatedOperationMethod<
  ListCategoryVolumesOnboardingRequest,
  ListCategoryVolumesOnboardingResponse,
  ListCategoryVolumesOnboardingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCategoryVolumesOnboardingRequest,
  output: ListCategoryVolumesOnboardingResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface GetSeriesRequest {
  /** String that identifies the series */
  series_id: string[];
}

export const GetSeriesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  series_id: Schema.Array(Schema.String).pipe(T.HttpQuery("series_id")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/series/get" }),
  svc,
) as unknown as Schema.Schema<GetSeriesRequest>;

export type GetSeriesResponse = Series;
export const GetSeriesResponse = /*@__PURE__*/ /*#__PURE__*/ Series;

export type GetSeriesError = DefaultErrors;

/** Returns Series metadata for the given series ids. */
export const getSeries: API.OperationMethod<
  GetSeriesRequest,
  GetSeriesResponse,
  GetSeriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSeriesRequest,
  output: GetSeriesResponse,
  errors: [],
}));

export interface GetSeriesMembershipRequest {
  /** Number of maximum results per page to be included in the response. */
  page_size?: number;
  /** String that identifies the series */
  series_id: string;
  /** The value of the nextToken from the previous page. */
  page_token?: string;
}

export const GetSeriesMembershipRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    page_size: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_size")),
    series_id: Schema.String.pipe(T.HttpQuery("series_id")),
    page_token: Schema.optional(Schema.String).pipe(T.HttpQuery("page_token")),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/series/membership/get" }),
    svc,
  ) as unknown as Schema.Schema<GetSeriesMembershipRequest>;

export type GetSeriesMembershipResponse = Seriesmembership;
export const GetSeriesMembershipResponse =
  /*@__PURE__*/ /*#__PURE__*/ Seriesmembership;

export type GetSeriesMembershipError = DefaultErrors;

/** Returns Series membership data given the series id. */
export const getSeriesMembership: API.OperationMethod<
  GetSeriesMembershipRequest,
  GetSeriesMembershipResponse,
  GetSeriesMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSeriesMembershipRequest,
  output: GetSeriesMembershipResponse,
  errors: [],
}));

export interface UpdateBookCloudloadingRequest {
  /** Request body */
  body?: BooksCloudloadingResource;
}

export const UpdateBookCloudloadingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(BooksCloudloadingResource).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/cloudloading/updateBook",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateBookCloudloadingRequest>;

export type UpdateBookCloudloadingResponse = BooksCloudloadingResource;
export const UpdateBookCloudloadingResponse =
  /*@__PURE__*/ /*#__PURE__*/ BooksCloudloadingResource;

export type UpdateBookCloudloadingError = DefaultErrors;

/** Updates a user-upload volume. */
export const updateBookCloudloading: API.OperationMethod<
  UpdateBookCloudloadingRequest,
  UpdateBookCloudloadingResponse,
  UpdateBookCloudloadingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateBookCloudloadingRequest,
  output: UpdateBookCloudloadingResponse,
  errors: [],
}));

export interface AddBookCloudloadingRequest {
  /** The document MIME type. It can be set only if the drive_document_id is set. */
  mime_type?: string;
  /** Scotty upload token. */
  upload_client_token?: string;
  /** A drive document id. The upload_client_token must not be set. */
  drive_document_id?: string;
  /** The document name. It can be set only if the drive_document_id is set. */
  name?: string;
}

export const AddBookCloudloadingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    mime_type: Schema.optional(Schema.String).pipe(T.HttpQuery("mime_type")),
    upload_client_token: Schema.optional(Schema.String).pipe(
      T.HttpQuery("upload_client_token"),
    ),
    drive_document_id: Schema.optional(Schema.String).pipe(
      T.HttpQuery("drive_document_id"),
    ),
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/cloudloading/addBook",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AddBookCloudloadingRequest>;

export type AddBookCloudloadingResponse = BooksCloudloadingResource;
export const AddBookCloudloadingResponse =
  /*@__PURE__*/ /*#__PURE__*/ BooksCloudloadingResource;

export type AddBookCloudloadingError = DefaultErrors;

/** Add a user-upload volume and triggers processing. */
export const addBookCloudloading: API.OperationMethod<
  AddBookCloudloadingRequest,
  AddBookCloudloadingResponse,
  AddBookCloudloadingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddBookCloudloadingRequest,
  output: AddBookCloudloadingResponse,
  errors: [],
}));

export interface DeleteBookCloudloadingRequest {
  /** The id of the book to be removed. */
  volumeId: string;
}

export const DeleteBookCloudloadingRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    volumeId: Schema.String.pipe(T.HttpQuery("volumeId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/cloudloading/deleteBook",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteBookCloudloadingRequest>;

export type DeleteBookCloudloadingResponse = Empty;
export const DeleteBookCloudloadingResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteBookCloudloadingError = DefaultErrors;

/** Remove the book and its contents */
export const deleteBookCloudloading: API.OperationMethod<
  DeleteBookCloudloadingRequest,
  DeleteBookCloudloadingResponse,
  DeleteBookCloudloadingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBookCloudloadingRequest,
  output: DeleteBookCloudloadingResponse,
  errors: [],
}));

export interface GetPersonalizedstreamRequest {
  /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
  locale?: string;
  /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
  maxAllowedMaturityRating?:
    | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED"
    | "MATURE"
    | "not-mature"
    | (string & {});
  /** String to identify the originator of this request. */
  source?: string;
}

export const GetPersonalizedstreamRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
    maxAllowedMaturityRating: Schema.optional(Schema.String).pipe(
      T.HttpQuery("maxAllowedMaturityRating"),
    ),
    source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  }).pipe(
    T.Http({ method: "GET", path: "books/v1/personalizedstream/get" }),
    svc,
  ) as unknown as Schema.Schema<GetPersonalizedstreamRequest>;

export type GetPersonalizedstreamResponse = Discoveryclusters;
export const GetPersonalizedstreamResponse =
  /*@__PURE__*/ /*#__PURE__*/ Discoveryclusters;

export type GetPersonalizedstreamError = DefaultErrors;

/** Returns a stream of personalized book clusters */
export const getPersonalizedstream: API.OperationMethod<
  GetPersonalizedstreamRequest,
  GetPersonalizedstreamResponse,
  GetPersonalizedstreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPersonalizedstreamRequest,
  output: GetPersonalizedstreamResponse,
  errors: [],
}));

export interface AcceptPromoofferRequest {
  /** device model */
  model?: string;
  /** device android_id */
  androidId?: string;
  /** Volume id to exercise the offer */
  volumeId?: string;
  /** device serial */
  serial?: string;
  offerId?: string;
  /** device device */
  device?: string;
  /** device manufacturer */
  manufacturer?: string;
  /** device product */
  product?: string;
}

export const AcceptPromoofferRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    model: Schema.optional(Schema.String).pipe(T.HttpQuery("model")),
    androidId: Schema.optional(Schema.String).pipe(T.HttpQuery("androidId")),
    volumeId: Schema.optional(Schema.String).pipe(T.HttpQuery("volumeId")),
    serial: Schema.optional(Schema.String).pipe(T.HttpQuery("serial")),
    offerId: Schema.optional(Schema.String).pipe(T.HttpQuery("offerId")),
    device: Schema.optional(Schema.String).pipe(T.HttpQuery("device")),
    manufacturer: Schema.optional(Schema.String).pipe(
      T.HttpQuery("manufacturer"),
    ),
    product: Schema.optional(Schema.String).pipe(T.HttpQuery("product")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/promooffer/accept",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AcceptPromoofferRequest>;

export type AcceptPromoofferResponse = Empty;
export const AcceptPromoofferResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type AcceptPromoofferError = DefaultErrors;

/** Accepts the promo offer. */
export const acceptPromooffer: API.OperationMethod<
  AcceptPromoofferRequest,
  AcceptPromoofferResponse,
  AcceptPromoofferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AcceptPromoofferRequest,
  output: AcceptPromoofferResponse,
  errors: [],
}));

export interface DismissPromoofferRequest {
  /** Offer to dimiss */
  offerId?: string;
  /** device device */
  device?: string;
  /** device manufacturer */
  manufacturer?: string;
  /** device product */
  product?: string;
  /** device model */
  model?: string;
  /** device android_id */
  androidId?: string;
  /** device serial */
  serial?: string;
}

export const DismissPromoofferRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    offerId: Schema.optional(Schema.String).pipe(T.HttpQuery("offerId")),
    device: Schema.optional(Schema.String).pipe(T.HttpQuery("device")),
    manufacturer: Schema.optional(Schema.String).pipe(
      T.HttpQuery("manufacturer"),
    ),
    product: Schema.optional(Schema.String).pipe(T.HttpQuery("product")),
    model: Schema.optional(Schema.String).pipe(T.HttpQuery("model")),
    androidId: Schema.optional(Schema.String).pipe(T.HttpQuery("androidId")),
    serial: Schema.optional(Schema.String).pipe(T.HttpQuery("serial")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "books/v1/promooffer/dismiss",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DismissPromoofferRequest>;

export type DismissPromoofferResponse = Empty;
export const DismissPromoofferResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DismissPromoofferError = DefaultErrors;

/** Marks the promo offer as dismissed. */
export const dismissPromooffer: API.OperationMethod<
  DismissPromoofferRequest,
  DismissPromoofferResponse,
  DismissPromoofferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DismissPromoofferRequest,
  output: DismissPromoofferResponse,
  errors: [],
}));

export interface GetPromoofferRequest {
  /** device device */
  device?: string;
  /** device manufacturer */
  manufacturer?: string;
  /** device product */
  product?: string;
  /** device model */
  model?: string;
  /** device android_id */
  androidId?: string;
  /** device serial */
  serial?: string;
}

export const GetPromoofferRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  device: Schema.optional(Schema.String).pipe(T.HttpQuery("device")),
  manufacturer: Schema.optional(Schema.String).pipe(
    T.HttpQuery("manufacturer"),
  ),
  product: Schema.optional(Schema.String).pipe(T.HttpQuery("product")),
  model: Schema.optional(Schema.String).pipe(T.HttpQuery("model")),
  androidId: Schema.optional(Schema.String).pipe(T.HttpQuery("androidId")),
  serial: Schema.optional(Schema.String).pipe(T.HttpQuery("serial")),
}).pipe(
  T.Http({ method: "GET", path: "books/v1/promooffer/get" }),
  svc,
) as unknown as Schema.Schema<GetPromoofferRequest>;

export type GetPromoofferResponse = Offers;
export const GetPromoofferResponse = /*@__PURE__*/ /*#__PURE__*/ Offers;

export type GetPromoofferError = DefaultErrors;

/** Returns a list of promo offers available to the user */
export const getPromooffer: API.OperationMethod<
  GetPromoofferRequest,
  GetPromoofferResponse,
  GetPromoofferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPromoofferRequest,
  output: GetPromoofferResponse,
  errors: [],
}));
