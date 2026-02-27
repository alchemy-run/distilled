import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Comprehend",
  serviceShapeName: "Comprehend_20171127",
});
const auth = T.AwsAuthSigv4({ name: "comprehend" });
const ver = T.ServiceVersion("2017-11-27");
const proto = T.AwsProtocolsAwsJson1_1();
const rules = T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err(
        "Invalid Configuration: FIPS and custom endpoint are not supported",
      );
    }
    if (UseDualStack === true) {
      return err(
        "Invalid Configuration: Dualstack and custom endpoint are not supported",
      );
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://comprehend-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://comprehend-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://comprehend.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://comprehend.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type CustomerInputString = string | redacted.Redacted<string>;
export type DocumentClassifierEndpointArn = string;
export type SemiStructuredDocumentBlob = Uint8Array;
export type ComprehendFlywheelArn = string;
export type ComprehendArnName = string;
export type Description = string;
export type AttributeNamesListItem = string;
export type S3Uri = string;
export type LabelDelimiter = string;
export type ClientRequestTokenString = string;
export type TagKey = string;
export type TagValue = string;
export type ComprehendDatasetArn = string;
export type VersionName = string;
export type IamRoleArn = string;
export type KmsKeyId = string;
export type SecurityGroupId = string;
export type SubnetId = string;
export type Policy = string;
export type DocumentClassifierArn = string;
export type ComprehendEndpointName = string;
export type ComprehendModelArn = string;
export type InferenceUnitsInteger = number;
export type ComprehendEndpointArn = string;
export type EntityTypeName = string;
export type EntityRecognizerArn = string;
export type LabelListItem = string;
export type FlywheelS3Uri = string;
export type PolicyRevisionId = string;
export type AnyLengthString = string;
export type NumberOfDocuments = number;
export type JobId = string;
export type ComprehendArn = string;
export type JobName = string;
export type EventTypeString = string;
export type FlywheelIterationId = string;
export type MaskCharacter = string;
export type EntityRecognizerEndpointArn = string;
export type MaxResultsInteger = number;
export type NumberOfTopicsInteger = number;

//# Schemas
export type CustomerInputStringList = string | redacted.Redacted<string>[];
export const CustomerInputStringList = S.Array(SensitiveString);
export interface BatchDetectDominantLanguageRequest {
  TextList: string | redacted.Redacted<string>[];
}
export const BatchDetectDominantLanguageRequest = S.suspend(() =>
  S.Struct({ TextList: CustomerInputStringList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDetectDominantLanguageRequest",
}) as any as S.Schema<BatchDetectDominantLanguageRequest>;
export interface DominantLanguage {
  LanguageCode?: string;
  Score?: number;
}
export const DominantLanguage = S.suspend(() =>
  S.Struct({ LanguageCode: S.optional(S.String), Score: S.optional(S.Number) }),
).annotate({
  identifier: "DominantLanguage",
}) as any as S.Schema<DominantLanguage>;
export type ListOfDominantLanguages = DominantLanguage[];
export const ListOfDominantLanguages = S.Array(DominantLanguage);
export interface BatchDetectDominantLanguageItemResult {
  Index?: number;
  Languages?: DominantLanguage[];
}
export const BatchDetectDominantLanguageItemResult = S.suspend(() =>
  S.Struct({
    Index: S.optional(S.Number),
    Languages: S.optional(ListOfDominantLanguages),
  }),
).annotate({
  identifier: "BatchDetectDominantLanguageItemResult",
}) as any as S.Schema<BatchDetectDominantLanguageItemResult>;
export type ListOfDetectDominantLanguageResult =
  BatchDetectDominantLanguageItemResult[];
export const ListOfDetectDominantLanguageResult = S.Array(
  BatchDetectDominantLanguageItemResult,
);
export interface BatchItemError {
  Index?: number;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const BatchItemError = S.suspend(() =>
  S.Struct({
    Index: S.optional(S.Number),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "BatchItemError" }) as any as S.Schema<BatchItemError>;
export type BatchItemErrorList = BatchItemError[];
export const BatchItemErrorList = S.Array(BatchItemError);
export interface BatchDetectDominantLanguageResponse {
  ResultList: BatchDetectDominantLanguageItemResult[];
  ErrorList: BatchItemError[];
}
export const BatchDetectDominantLanguageResponse = S.suspend(() =>
  S.Struct({
    ResultList: ListOfDetectDominantLanguageResult,
    ErrorList: BatchItemErrorList,
  }),
).annotate({
  identifier: "BatchDetectDominantLanguageResponse",
}) as any as S.Schema<BatchDetectDominantLanguageResponse>;
export type InvalidRequestReason = "INVALID_DOCUMENT" | (string & {});
export const InvalidRequestReason = S.String;
export type InvalidRequestDetailReason =
  | "DOCUMENT_SIZE_EXCEEDED"
  | "UNSUPPORTED_DOC_TYPE"
  | "PAGE_LIMIT_EXCEEDED"
  | "TEXTRACT_ACCESS_DENIED"
  | (string & {});
export const InvalidRequestDetailReason = S.String;
export interface InvalidRequestDetail {
  Reason?: InvalidRequestDetailReason;
}
export const InvalidRequestDetail = S.suspend(() =>
  S.Struct({ Reason: S.optional(InvalidRequestDetailReason) }),
).annotate({
  identifier: "InvalidRequestDetail",
}) as any as S.Schema<InvalidRequestDetail>;
export type LanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ar"
  | "hi"
  | "ja"
  | "ko"
  | "zh"
  | "zh-TW"
  | (string & {});
export const LanguageCode = S.String;
export interface BatchDetectEntitiesRequest {
  TextList: string | redacted.Redacted<string>[];
  LanguageCode: LanguageCode;
}
export const BatchDetectEntitiesRequest = S.suspend(() =>
  S.Struct({
    TextList: CustomerInputStringList,
    LanguageCode: LanguageCode,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDetectEntitiesRequest",
}) as any as S.Schema<BatchDetectEntitiesRequest>;
export type EntityType =
  | "PERSON"
  | "LOCATION"
  | "ORGANIZATION"
  | "COMMERCIAL_ITEM"
  | "EVENT"
  | "DATE"
  | "QUANTITY"
  | "TITLE"
  | "OTHER"
  | (string & {});
export const EntityType = S.String;
export interface ChildBlock {
  ChildBlockId?: string;
  BeginOffset?: number;
  EndOffset?: number;
}
export const ChildBlock = S.suspend(() =>
  S.Struct({
    ChildBlockId: S.optional(S.String),
    BeginOffset: S.optional(S.Number),
    EndOffset: S.optional(S.Number),
  }),
).annotate({ identifier: "ChildBlock" }) as any as S.Schema<ChildBlock>;
export type ListOfChildBlocks = ChildBlock[];
export const ListOfChildBlocks = S.Array(ChildBlock);
export interface BlockReference {
  BlockId?: string;
  BeginOffset?: number;
  EndOffset?: number;
  ChildBlocks?: ChildBlock[];
}
export const BlockReference = S.suspend(() =>
  S.Struct({
    BlockId: S.optional(S.String),
    BeginOffset: S.optional(S.Number),
    EndOffset: S.optional(S.Number),
    ChildBlocks: S.optional(ListOfChildBlocks),
  }),
).annotate({ identifier: "BlockReference" }) as any as S.Schema<BlockReference>;
export type ListOfBlockReferences = BlockReference[];
export const ListOfBlockReferences = S.Array(BlockReference);
export interface Entity {
  Score?: number;
  Type?: EntityType;
  Text?: string;
  BeginOffset?: number;
  EndOffset?: number;
  BlockReferences?: BlockReference[];
}
export const Entity = S.suspend(() =>
  S.Struct({
    Score: S.optional(S.Number),
    Type: S.optional(EntityType),
    Text: S.optional(S.String),
    BeginOffset: S.optional(S.Number),
    EndOffset: S.optional(S.Number),
    BlockReferences: S.optional(ListOfBlockReferences),
  }),
).annotate({ identifier: "Entity" }) as any as S.Schema<Entity>;
export type ListOfEntities = Entity[];
export const ListOfEntities = S.Array(Entity);
export interface BatchDetectEntitiesItemResult {
  Index?: number;
  Entities?: Entity[];
}
export const BatchDetectEntitiesItemResult = S.suspend(() =>
  S.Struct({
    Index: S.optional(S.Number),
    Entities: S.optional(ListOfEntities),
  }),
).annotate({
  identifier: "BatchDetectEntitiesItemResult",
}) as any as S.Schema<BatchDetectEntitiesItemResult>;
export type ListOfDetectEntitiesResult = BatchDetectEntitiesItemResult[];
export const ListOfDetectEntitiesResult = S.Array(
  BatchDetectEntitiesItemResult,
);
export interface BatchDetectEntitiesResponse {
  ResultList: BatchDetectEntitiesItemResult[];
  ErrorList: BatchItemError[];
}
export const BatchDetectEntitiesResponse = S.suspend(() =>
  S.Struct({
    ResultList: ListOfDetectEntitiesResult,
    ErrorList: BatchItemErrorList,
  }),
).annotate({
  identifier: "BatchDetectEntitiesResponse",
}) as any as S.Schema<BatchDetectEntitiesResponse>;
export interface BatchDetectKeyPhrasesRequest {
  TextList: string | redacted.Redacted<string>[];
  LanguageCode: LanguageCode;
}
export const BatchDetectKeyPhrasesRequest = S.suspend(() =>
  S.Struct({
    TextList: CustomerInputStringList,
    LanguageCode: LanguageCode,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDetectKeyPhrasesRequest",
}) as any as S.Schema<BatchDetectKeyPhrasesRequest>;
export interface KeyPhrase {
  Score?: number;
  Text?: string;
  BeginOffset?: number;
  EndOffset?: number;
}
export const KeyPhrase = S.suspend(() =>
  S.Struct({
    Score: S.optional(S.Number),
    Text: S.optional(S.String),
    BeginOffset: S.optional(S.Number),
    EndOffset: S.optional(S.Number),
  }),
).annotate({ identifier: "KeyPhrase" }) as any as S.Schema<KeyPhrase>;
export type ListOfKeyPhrases = KeyPhrase[];
export const ListOfKeyPhrases = S.Array(KeyPhrase);
export interface BatchDetectKeyPhrasesItemResult {
  Index?: number;
  KeyPhrases?: KeyPhrase[];
}
export const BatchDetectKeyPhrasesItemResult = S.suspend(() =>
  S.Struct({
    Index: S.optional(S.Number),
    KeyPhrases: S.optional(ListOfKeyPhrases),
  }),
).annotate({
  identifier: "BatchDetectKeyPhrasesItemResult",
}) as any as S.Schema<BatchDetectKeyPhrasesItemResult>;
export type ListOfDetectKeyPhrasesResult = BatchDetectKeyPhrasesItemResult[];
export const ListOfDetectKeyPhrasesResult = S.Array(
  BatchDetectKeyPhrasesItemResult,
);
export interface BatchDetectKeyPhrasesResponse {
  ResultList: BatchDetectKeyPhrasesItemResult[];
  ErrorList: BatchItemError[];
}
export const BatchDetectKeyPhrasesResponse = S.suspend(() =>
  S.Struct({
    ResultList: ListOfDetectKeyPhrasesResult,
    ErrorList: BatchItemErrorList,
  }),
).annotate({
  identifier: "BatchDetectKeyPhrasesResponse",
}) as any as S.Schema<BatchDetectKeyPhrasesResponse>;
export interface BatchDetectSentimentRequest {
  TextList: string | redacted.Redacted<string>[];
  LanguageCode: LanguageCode;
}
export const BatchDetectSentimentRequest = S.suspend(() =>
  S.Struct({
    TextList: CustomerInputStringList,
    LanguageCode: LanguageCode,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDetectSentimentRequest",
}) as any as S.Schema<BatchDetectSentimentRequest>;
export type SentimentType =
  | "POSITIVE"
  | "NEGATIVE"
  | "NEUTRAL"
  | "MIXED"
  | (string & {});
export const SentimentType = S.String;
export interface SentimentScore {
  Positive?: number;
  Negative?: number;
  Neutral?: number;
  Mixed?: number;
}
export const SentimentScore = S.suspend(() =>
  S.Struct({
    Positive: S.optional(S.Number),
    Negative: S.optional(S.Number),
    Neutral: S.optional(S.Number),
    Mixed: S.optional(S.Number),
  }),
).annotate({ identifier: "SentimentScore" }) as any as S.Schema<SentimentScore>;
export interface BatchDetectSentimentItemResult {
  Index?: number;
  Sentiment?: SentimentType;
  SentimentScore?: SentimentScore;
}
export const BatchDetectSentimentItemResult = S.suspend(() =>
  S.Struct({
    Index: S.optional(S.Number),
    Sentiment: S.optional(SentimentType),
    SentimentScore: S.optional(SentimentScore),
  }),
).annotate({
  identifier: "BatchDetectSentimentItemResult",
}) as any as S.Schema<BatchDetectSentimentItemResult>;
export type ListOfDetectSentimentResult = BatchDetectSentimentItemResult[];
export const ListOfDetectSentimentResult = S.Array(
  BatchDetectSentimentItemResult,
);
export interface BatchDetectSentimentResponse {
  ResultList: BatchDetectSentimentItemResult[];
  ErrorList: BatchItemError[];
}
export const BatchDetectSentimentResponse = S.suspend(() =>
  S.Struct({
    ResultList: ListOfDetectSentimentResult,
    ErrorList: BatchItemErrorList,
  }),
).annotate({
  identifier: "BatchDetectSentimentResponse",
}) as any as S.Schema<BatchDetectSentimentResponse>;
export type SyntaxLanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | (string & {});
export const SyntaxLanguageCode = S.String;
export interface BatchDetectSyntaxRequest {
  TextList: string | redacted.Redacted<string>[];
  LanguageCode: SyntaxLanguageCode;
}
export const BatchDetectSyntaxRequest = S.suspend(() =>
  S.Struct({
    TextList: CustomerInputStringList,
    LanguageCode: SyntaxLanguageCode,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDetectSyntaxRequest",
}) as any as S.Schema<BatchDetectSyntaxRequest>;
export type PartOfSpeechTagType =
  | "ADJ"
  | "ADP"
  | "ADV"
  | "AUX"
  | "CONJ"
  | "CCONJ"
  | "DET"
  | "INTJ"
  | "NOUN"
  | "NUM"
  | "O"
  | "PART"
  | "PRON"
  | "PROPN"
  | "PUNCT"
  | "SCONJ"
  | "SYM"
  | "VERB"
  | (string & {});
export const PartOfSpeechTagType = S.String;
export interface PartOfSpeechTag {
  Tag?: PartOfSpeechTagType;
  Score?: number;
}
export const PartOfSpeechTag = S.suspend(() =>
  S.Struct({
    Tag: S.optional(PartOfSpeechTagType),
    Score: S.optional(S.Number),
  }),
).annotate({
  identifier: "PartOfSpeechTag",
}) as any as S.Schema<PartOfSpeechTag>;
export interface SyntaxToken {
  TokenId?: number;
  Text?: string;
  BeginOffset?: number;
  EndOffset?: number;
  PartOfSpeech?: PartOfSpeechTag;
}
export const SyntaxToken = S.suspend(() =>
  S.Struct({
    TokenId: S.optional(S.Number),
    Text: S.optional(S.String),
    BeginOffset: S.optional(S.Number),
    EndOffset: S.optional(S.Number),
    PartOfSpeech: S.optional(PartOfSpeechTag),
  }),
).annotate({ identifier: "SyntaxToken" }) as any as S.Schema<SyntaxToken>;
export type ListOfSyntaxTokens = SyntaxToken[];
export const ListOfSyntaxTokens = S.Array(SyntaxToken);
export interface BatchDetectSyntaxItemResult {
  Index?: number;
  SyntaxTokens?: SyntaxToken[];
}
export const BatchDetectSyntaxItemResult = S.suspend(() =>
  S.Struct({
    Index: S.optional(S.Number),
    SyntaxTokens: S.optional(ListOfSyntaxTokens),
  }),
).annotate({
  identifier: "BatchDetectSyntaxItemResult",
}) as any as S.Schema<BatchDetectSyntaxItemResult>;
export type ListOfDetectSyntaxResult = BatchDetectSyntaxItemResult[];
export const ListOfDetectSyntaxResult = S.Array(BatchDetectSyntaxItemResult);
export interface BatchDetectSyntaxResponse {
  ResultList: BatchDetectSyntaxItemResult[];
  ErrorList: BatchItemError[];
}
export const BatchDetectSyntaxResponse = S.suspend(() =>
  S.Struct({
    ResultList: ListOfDetectSyntaxResult,
    ErrorList: BatchItemErrorList,
  }),
).annotate({
  identifier: "BatchDetectSyntaxResponse",
}) as any as S.Schema<BatchDetectSyntaxResponse>;
export interface BatchDetectTargetedSentimentRequest {
  TextList: string | redacted.Redacted<string>[];
  LanguageCode: LanguageCode;
}
export const BatchDetectTargetedSentimentRequest = S.suspend(() =>
  S.Struct({
    TextList: CustomerInputStringList,
    LanguageCode: LanguageCode,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDetectTargetedSentimentRequest",
}) as any as S.Schema<BatchDetectTargetedSentimentRequest>;
export type ListOfDescriptiveMentionIndices = number[];
export const ListOfDescriptiveMentionIndices = S.Array(S.Number);
export type TargetedSentimentEntityType =
  | "PERSON"
  | "LOCATION"
  | "ORGANIZATION"
  | "FACILITY"
  | "BRAND"
  | "COMMERCIAL_ITEM"
  | "MOVIE"
  | "MUSIC"
  | "BOOK"
  | "SOFTWARE"
  | "GAME"
  | "PERSONAL_TITLE"
  | "EVENT"
  | "DATE"
  | "QUANTITY"
  | "ATTRIBUTE"
  | "OTHER"
  | (string & {});
export const TargetedSentimentEntityType = S.String;
export interface MentionSentiment {
  Sentiment?: SentimentType;
  SentimentScore?: SentimentScore;
}
export const MentionSentiment = S.suspend(() =>
  S.Struct({
    Sentiment: S.optional(SentimentType),
    SentimentScore: S.optional(SentimentScore),
  }),
).annotate({
  identifier: "MentionSentiment",
}) as any as S.Schema<MentionSentiment>;
export interface TargetedSentimentMention {
  Score?: number;
  GroupScore?: number;
  Text?: string;
  Type?: TargetedSentimentEntityType;
  MentionSentiment?: MentionSentiment;
  BeginOffset?: number;
  EndOffset?: number;
}
export const TargetedSentimentMention = S.suspend(() =>
  S.Struct({
    Score: S.optional(S.Number),
    GroupScore: S.optional(S.Number),
    Text: S.optional(S.String),
    Type: S.optional(TargetedSentimentEntityType),
    MentionSentiment: S.optional(MentionSentiment),
    BeginOffset: S.optional(S.Number),
    EndOffset: S.optional(S.Number),
  }),
).annotate({
  identifier: "TargetedSentimentMention",
}) as any as S.Schema<TargetedSentimentMention>;
export type ListOfMentions = TargetedSentimentMention[];
export const ListOfMentions = S.Array(TargetedSentimentMention);
export interface TargetedSentimentEntity {
  DescriptiveMentionIndex?: number[];
  Mentions?: TargetedSentimentMention[];
}
export const TargetedSentimentEntity = S.suspend(() =>
  S.Struct({
    DescriptiveMentionIndex: S.optional(ListOfDescriptiveMentionIndices),
    Mentions: S.optional(ListOfMentions),
  }),
).annotate({
  identifier: "TargetedSentimentEntity",
}) as any as S.Schema<TargetedSentimentEntity>;
export type ListOfTargetedSentimentEntities = TargetedSentimentEntity[];
export const ListOfTargetedSentimentEntities = S.Array(TargetedSentimentEntity);
export interface BatchDetectTargetedSentimentItemResult {
  Index?: number;
  Entities?: TargetedSentimentEntity[];
}
export const BatchDetectTargetedSentimentItemResult = S.suspend(() =>
  S.Struct({
    Index: S.optional(S.Number),
    Entities: S.optional(ListOfTargetedSentimentEntities),
  }),
).annotate({
  identifier: "BatchDetectTargetedSentimentItemResult",
}) as any as S.Schema<BatchDetectTargetedSentimentItemResult>;
export type ListOfDetectTargetedSentimentResult =
  BatchDetectTargetedSentimentItemResult[];
export const ListOfDetectTargetedSentimentResult = S.Array(
  BatchDetectTargetedSentimentItemResult,
);
export interface BatchDetectTargetedSentimentResponse {
  ResultList: BatchDetectTargetedSentimentItemResult[];
  ErrorList: BatchItemError[];
}
export const BatchDetectTargetedSentimentResponse = S.suspend(() =>
  S.Struct({
    ResultList: ListOfDetectTargetedSentimentResult,
    ErrorList: BatchItemErrorList,
  }),
).annotate({
  identifier: "BatchDetectTargetedSentimentResponse",
}) as any as S.Schema<BatchDetectTargetedSentimentResponse>;
export type DocumentReadAction =
  | "TEXTRACT_DETECT_DOCUMENT_TEXT"
  | "TEXTRACT_ANALYZE_DOCUMENT"
  | (string & {});
export const DocumentReadAction = S.String;
export type DocumentReadMode =
  | "SERVICE_DEFAULT"
  | "FORCE_DOCUMENT_READ_ACTION"
  | (string & {});
export const DocumentReadMode = S.String;
export type DocumentReadFeatureTypes = "TABLES" | "FORMS" | (string & {});
export const DocumentReadFeatureTypes = S.String;
export type ListOfDocumentReadFeatureTypes = DocumentReadFeatureTypes[];
export const ListOfDocumentReadFeatureTypes = S.Array(DocumentReadFeatureTypes);
export interface DocumentReaderConfig {
  DocumentReadAction: DocumentReadAction;
  DocumentReadMode?: DocumentReadMode;
  FeatureTypes?: DocumentReadFeatureTypes[];
}
export const DocumentReaderConfig = S.suspend(() =>
  S.Struct({
    DocumentReadAction: DocumentReadAction,
    DocumentReadMode: S.optional(DocumentReadMode),
    FeatureTypes: S.optional(ListOfDocumentReadFeatureTypes),
  }),
).annotate({
  identifier: "DocumentReaderConfig",
}) as any as S.Schema<DocumentReaderConfig>;
export interface ClassifyDocumentRequest {
  Text?: string | redacted.Redacted<string>;
  EndpointArn: string;
  Bytes?: Uint8Array;
  DocumentReaderConfig?: DocumentReaderConfig;
}
export const ClassifyDocumentRequest = S.suspend(() =>
  S.Struct({
    Text: S.optional(SensitiveString),
    EndpointArn: S.String,
    Bytes: S.optional(T.Blob),
    DocumentReaderConfig: S.optional(DocumentReaderConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ClassifyDocumentRequest",
}) as any as S.Schema<ClassifyDocumentRequest>;
export interface DocumentClass {
  Name?: string;
  Score?: number;
  Page?: number;
}
export const DocumentClass = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Score: S.optional(S.Number),
    Page: S.optional(S.Number),
  }),
).annotate({ identifier: "DocumentClass" }) as any as S.Schema<DocumentClass>;
export type ListOfClasses = DocumentClass[];
export const ListOfClasses = S.Array(DocumentClass);
export interface DocumentLabel {
  Name?: string;
  Score?: number;
  Page?: number;
}
export const DocumentLabel = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Score: S.optional(S.Number),
    Page: S.optional(S.Number),
  }),
).annotate({ identifier: "DocumentLabel" }) as any as S.Schema<DocumentLabel>;
export type ListOfLabels = DocumentLabel[];
export const ListOfLabels = S.Array(DocumentLabel);
export interface ExtractedCharactersListItem {
  Page?: number;
  Count?: number;
}
export const ExtractedCharactersListItem = S.suspend(() =>
  S.Struct({ Page: S.optional(S.Number), Count: S.optional(S.Number) }),
).annotate({
  identifier: "ExtractedCharactersListItem",
}) as any as S.Schema<ExtractedCharactersListItem>;
export type ListOfExtractedCharacters = ExtractedCharactersListItem[];
export const ListOfExtractedCharacters = S.Array(ExtractedCharactersListItem);
export interface DocumentMetadata {
  Pages?: number;
  ExtractedCharacters?: ExtractedCharactersListItem[];
}
export const DocumentMetadata = S.suspend(() =>
  S.Struct({
    Pages: S.optional(S.Number),
    ExtractedCharacters: S.optional(ListOfExtractedCharacters),
  }),
).annotate({
  identifier: "DocumentMetadata",
}) as any as S.Schema<DocumentMetadata>;
export type DocumentType =
  | "NATIVE_PDF"
  | "SCANNED_PDF"
  | "MS_WORD"
  | "IMAGE"
  | "PLAIN_TEXT"
  | "TEXTRACT_DETECT_DOCUMENT_TEXT_JSON"
  | "TEXTRACT_ANALYZE_DOCUMENT_JSON"
  | (string & {});
export const DocumentType = S.String;
export interface DocumentTypeListItem {
  Page?: number;
  Type?: DocumentType;
}
export const DocumentTypeListItem = S.suspend(() =>
  S.Struct({ Page: S.optional(S.Number), Type: S.optional(DocumentType) }),
).annotate({
  identifier: "DocumentTypeListItem",
}) as any as S.Schema<DocumentTypeListItem>;
export type ListOfDocumentType = DocumentTypeListItem[];
export const ListOfDocumentType = S.Array(DocumentTypeListItem);
export type PageBasedErrorCode =
  | "TEXTRACT_BAD_PAGE"
  | "TEXTRACT_PROVISIONED_THROUGHPUT_EXCEEDED"
  | "PAGE_CHARACTERS_EXCEEDED"
  | "PAGE_SIZE_EXCEEDED"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export const PageBasedErrorCode = S.String;
export interface ErrorsListItem {
  Page?: number;
  ErrorCode?: PageBasedErrorCode;
  ErrorMessage?: string;
}
export const ErrorsListItem = S.suspend(() =>
  S.Struct({
    Page: S.optional(S.Number),
    ErrorCode: S.optional(PageBasedErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorsListItem" }) as any as S.Schema<ErrorsListItem>;
export type ListOfErrors = ErrorsListItem[];
export const ListOfErrors = S.Array(ErrorsListItem);
export type PageBasedWarningCode =
  | "INFERENCING_PLAINTEXT_WITH_NATIVE_TRAINED_MODEL"
  | "INFERENCING_NATIVE_DOCUMENT_WITH_PLAINTEXT_TRAINED_MODEL"
  | (string & {});
export const PageBasedWarningCode = S.String;
export interface WarningsListItem {
  Page?: number;
  WarnCode?: PageBasedWarningCode;
  WarnMessage?: string;
}
export const WarningsListItem = S.suspend(() =>
  S.Struct({
    Page: S.optional(S.Number),
    WarnCode: S.optional(PageBasedWarningCode),
    WarnMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "WarningsListItem",
}) as any as S.Schema<WarningsListItem>;
export type ListOfWarnings = WarningsListItem[];
export const ListOfWarnings = S.Array(WarningsListItem);
export interface ClassifyDocumentResponse {
  Classes?: DocumentClass[];
  Labels?: DocumentLabel[];
  DocumentMetadata?: DocumentMetadata;
  DocumentType?: DocumentTypeListItem[];
  Errors?: ErrorsListItem[];
  Warnings?: WarningsListItem[];
}
export const ClassifyDocumentResponse = S.suspend(() =>
  S.Struct({
    Classes: S.optional(ListOfClasses),
    Labels: S.optional(ListOfLabels),
    DocumentMetadata: S.optional(DocumentMetadata),
    DocumentType: S.optional(ListOfDocumentType),
    Errors: S.optional(ListOfErrors),
    Warnings: S.optional(ListOfWarnings),
  }),
).annotate({
  identifier: "ClassifyDocumentResponse",
}) as any as S.Schema<ClassifyDocumentResponse>;
export interface ContainsPiiEntitiesRequest {
  Text: string;
  LanguageCode: LanguageCode;
}
export const ContainsPiiEntitiesRequest = S.suspend(() =>
  S.Struct({ Text: S.String, LanguageCode: LanguageCode }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ContainsPiiEntitiesRequest",
}) as any as S.Schema<ContainsPiiEntitiesRequest>;
export type PiiEntityType =
  | "BANK_ACCOUNT_NUMBER"
  | "BANK_ROUTING"
  | "CREDIT_DEBIT_NUMBER"
  | "CREDIT_DEBIT_CVV"
  | "CREDIT_DEBIT_EXPIRY"
  | "PIN"
  | "EMAIL"
  | "ADDRESS"
  | "NAME"
  | "PHONE"
  | "SSN"
  | "DATE_TIME"
  | "PASSPORT_NUMBER"
  | "DRIVER_ID"
  | "URL"
  | "AGE"
  | "USERNAME"
  | "PASSWORD"
  | "AWS_ACCESS_KEY"
  | "AWS_SECRET_KEY"
  | "IP_ADDRESS"
  | "MAC_ADDRESS"
  | "ALL"
  | "LICENSE_PLATE"
  | "VEHICLE_IDENTIFICATION_NUMBER"
  | "UK_NATIONAL_INSURANCE_NUMBER"
  | "CA_SOCIAL_INSURANCE_NUMBER"
  | "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER"
  | "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER"
  | "IN_PERMANENT_ACCOUNT_NUMBER"
  | "IN_NREGA"
  | "INTERNATIONAL_BANK_ACCOUNT_NUMBER"
  | "SWIFT_CODE"
  | "UK_NATIONAL_HEALTH_SERVICE_NUMBER"
  | "CA_HEALTH_NUMBER"
  | "IN_AADHAAR"
  | "IN_VOTER_NUMBER"
  | (string & {});
export const PiiEntityType = S.String;
export interface EntityLabel {
  Name?: PiiEntityType;
  Score?: number;
}
export const EntityLabel = S.suspend(() =>
  S.Struct({ Name: S.optional(PiiEntityType), Score: S.optional(S.Number) }),
).annotate({ identifier: "EntityLabel" }) as any as S.Schema<EntityLabel>;
export type ListOfEntityLabels = EntityLabel[];
export const ListOfEntityLabels = S.Array(EntityLabel);
export interface ContainsPiiEntitiesResponse {
  Labels?: EntityLabel[];
}
export const ContainsPiiEntitiesResponse = S.suspend(() =>
  S.Struct({ Labels: S.optional(ListOfEntityLabels) }),
).annotate({
  identifier: "ContainsPiiEntitiesResponse",
}) as any as S.Schema<ContainsPiiEntitiesResponse>;
export type DatasetType = "TRAIN" | "TEST" | (string & {});
export const DatasetType = S.String;
export type AttributeNamesList = string[];
export const AttributeNamesList = S.Array(S.String);
export type AugmentedManifestsDocumentTypeFormat =
  | "PLAIN_TEXT_DOCUMENT"
  | "SEMI_STRUCTURED_DOCUMENT"
  | (string & {});
export const AugmentedManifestsDocumentTypeFormat = S.String;
export interface DatasetAugmentedManifestsListItem {
  AttributeNames: string[];
  S3Uri: string;
  AnnotationDataS3Uri?: string;
  SourceDocumentsS3Uri?: string;
  DocumentType?: AugmentedManifestsDocumentTypeFormat;
}
export const DatasetAugmentedManifestsListItem = S.suspend(() =>
  S.Struct({
    AttributeNames: AttributeNamesList,
    S3Uri: S.String,
    AnnotationDataS3Uri: S.optional(S.String),
    SourceDocumentsS3Uri: S.optional(S.String),
    DocumentType: S.optional(AugmentedManifestsDocumentTypeFormat),
  }),
).annotate({
  identifier: "DatasetAugmentedManifestsListItem",
}) as any as S.Schema<DatasetAugmentedManifestsListItem>;
export type DatasetAugmentedManifestsList = DatasetAugmentedManifestsListItem[];
export const DatasetAugmentedManifestsList = S.Array(
  DatasetAugmentedManifestsListItem,
);
export type DatasetDataFormat =
  | "COMPREHEND_CSV"
  | "AUGMENTED_MANIFEST"
  | (string & {});
export const DatasetDataFormat = S.String;
export interface DatasetDocumentClassifierInputDataConfig {
  S3Uri: string;
  LabelDelimiter?: string;
}
export const DatasetDocumentClassifierInputDataConfig = S.suspend(() =>
  S.Struct({ S3Uri: S.String, LabelDelimiter: S.optional(S.String) }),
).annotate({
  identifier: "DatasetDocumentClassifierInputDataConfig",
}) as any as S.Schema<DatasetDocumentClassifierInputDataConfig>;
export interface DatasetEntityRecognizerAnnotations {
  S3Uri: string;
}
export const DatasetEntityRecognizerAnnotations = S.suspend(() =>
  S.Struct({ S3Uri: S.String }),
).annotate({
  identifier: "DatasetEntityRecognizerAnnotations",
}) as any as S.Schema<DatasetEntityRecognizerAnnotations>;
export type InputFormat =
  | "ONE_DOC_PER_FILE"
  | "ONE_DOC_PER_LINE"
  | (string & {});
export const InputFormat = S.String;
export interface DatasetEntityRecognizerDocuments {
  S3Uri: string;
  InputFormat?: InputFormat;
}
export const DatasetEntityRecognizerDocuments = S.suspend(() =>
  S.Struct({ S3Uri: S.String, InputFormat: S.optional(InputFormat) }),
).annotate({
  identifier: "DatasetEntityRecognizerDocuments",
}) as any as S.Schema<DatasetEntityRecognizerDocuments>;
export interface DatasetEntityRecognizerEntityList {
  S3Uri: string;
}
export const DatasetEntityRecognizerEntityList = S.suspend(() =>
  S.Struct({ S3Uri: S.String }),
).annotate({
  identifier: "DatasetEntityRecognizerEntityList",
}) as any as S.Schema<DatasetEntityRecognizerEntityList>;
export interface DatasetEntityRecognizerInputDataConfig {
  Annotations?: DatasetEntityRecognizerAnnotations;
  Documents: DatasetEntityRecognizerDocuments;
  EntityList?: DatasetEntityRecognizerEntityList;
}
export const DatasetEntityRecognizerInputDataConfig = S.suspend(() =>
  S.Struct({
    Annotations: S.optional(DatasetEntityRecognizerAnnotations),
    Documents: DatasetEntityRecognizerDocuments,
    EntityList: S.optional(DatasetEntityRecognizerEntityList),
  }),
).annotate({
  identifier: "DatasetEntityRecognizerInputDataConfig",
}) as any as S.Schema<DatasetEntityRecognizerInputDataConfig>;
export interface DatasetInputDataConfig {
  AugmentedManifests?: DatasetAugmentedManifestsListItem[];
  DataFormat?: DatasetDataFormat;
  DocumentClassifierInputDataConfig?: DatasetDocumentClassifierInputDataConfig;
  EntityRecognizerInputDataConfig?: DatasetEntityRecognizerInputDataConfig;
}
export const DatasetInputDataConfig = S.suspend(() =>
  S.Struct({
    AugmentedManifests: S.optional(DatasetAugmentedManifestsList),
    DataFormat: S.optional(DatasetDataFormat),
    DocumentClassifierInputDataConfig: S.optional(
      DatasetDocumentClassifierInputDataConfig,
    ),
    EntityRecognizerInputDataConfig: S.optional(
      DatasetEntityRecognizerInputDataConfig,
    ),
  }),
).annotate({
  identifier: "DatasetInputDataConfig",
}) as any as S.Schema<DatasetInputDataConfig>;
export interface Tag {
  Key: string;
  Value?: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export interface CreateDatasetRequest {
  FlywheelArn: string;
  DatasetName: string;
  DatasetType?: DatasetType;
  Description?: string;
  InputDataConfig: DatasetInputDataConfig;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export const CreateDatasetRequest = S.suspend(() =>
  S.Struct({
    FlywheelArn: S.String,
    DatasetName: S.String,
    DatasetType: S.optional(DatasetType),
    Description: S.optional(S.String),
    InputDataConfig: DatasetInputDataConfig,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDatasetRequest",
}) as any as S.Schema<CreateDatasetRequest>;
export interface CreateDatasetResponse {
  DatasetArn?: string;
}
export const CreateDatasetResponse = S.suspend(() =>
  S.Struct({ DatasetArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateDatasetResponse",
}) as any as S.Schema<CreateDatasetResponse>;
export type DocumentClassifierDataFormat =
  | "COMPREHEND_CSV"
  | "AUGMENTED_MANIFEST"
  | (string & {});
export const DocumentClassifierDataFormat = S.String;
export type Split = "TRAIN" | "TEST" | (string & {});
export const Split = S.String;
export interface AugmentedManifestsListItem {
  S3Uri: string;
  Split?: Split;
  AttributeNames: string[];
  AnnotationDataS3Uri?: string;
  SourceDocumentsS3Uri?: string;
  DocumentType?: AugmentedManifestsDocumentTypeFormat;
}
export const AugmentedManifestsListItem = S.suspend(() =>
  S.Struct({
    S3Uri: S.String,
    Split: S.optional(Split),
    AttributeNames: AttributeNamesList,
    AnnotationDataS3Uri: S.optional(S.String),
    SourceDocumentsS3Uri: S.optional(S.String),
    DocumentType: S.optional(AugmentedManifestsDocumentTypeFormat),
  }),
).annotate({
  identifier: "AugmentedManifestsListItem",
}) as any as S.Schema<AugmentedManifestsListItem>;
export type DocumentClassifierAugmentedManifestsList =
  AugmentedManifestsListItem[];
export const DocumentClassifierAugmentedManifestsList = S.Array(
  AugmentedManifestsListItem,
);
export type DocumentClassifierDocumentTypeFormat =
  | "PLAIN_TEXT_DOCUMENT"
  | "SEMI_STRUCTURED_DOCUMENT"
  | (string & {});
export const DocumentClassifierDocumentTypeFormat = S.String;
export interface DocumentClassifierDocuments {
  S3Uri: string;
  TestS3Uri?: string;
}
export const DocumentClassifierDocuments = S.suspend(() =>
  S.Struct({ S3Uri: S.String, TestS3Uri: S.optional(S.String) }),
).annotate({
  identifier: "DocumentClassifierDocuments",
}) as any as S.Schema<DocumentClassifierDocuments>;
export interface DocumentClassifierInputDataConfig {
  DataFormat?: DocumentClassifierDataFormat;
  S3Uri?: string;
  TestS3Uri?: string;
  LabelDelimiter?: string;
  AugmentedManifests?: AugmentedManifestsListItem[];
  DocumentType?: DocumentClassifierDocumentTypeFormat;
  Documents?: DocumentClassifierDocuments;
  DocumentReaderConfig?: DocumentReaderConfig;
}
export const DocumentClassifierInputDataConfig = S.suspend(() =>
  S.Struct({
    DataFormat: S.optional(DocumentClassifierDataFormat),
    S3Uri: S.optional(S.String),
    TestS3Uri: S.optional(S.String),
    LabelDelimiter: S.optional(S.String),
    AugmentedManifests: S.optional(DocumentClassifierAugmentedManifestsList),
    DocumentType: S.optional(DocumentClassifierDocumentTypeFormat),
    Documents: S.optional(DocumentClassifierDocuments),
    DocumentReaderConfig: S.optional(DocumentReaderConfig),
  }),
).annotate({
  identifier: "DocumentClassifierInputDataConfig",
}) as any as S.Schema<DocumentClassifierInputDataConfig>;
export interface DocumentClassifierOutputDataConfig {
  S3Uri?: string;
  KmsKeyId?: string;
  FlywheelStatsS3Prefix?: string;
}
export const DocumentClassifierOutputDataConfig = S.suspend(() =>
  S.Struct({
    S3Uri: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    FlywheelStatsS3Prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentClassifierOutputDataConfig",
}) as any as S.Schema<DocumentClassifierOutputDataConfig>;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = S.Array(S.String);
export type Subnets = string[];
export const Subnets = S.Array(S.String);
export interface VpcConfig {
  SecurityGroupIds: string[];
  Subnets: string[];
}
export const VpcConfig = S.suspend(() =>
  S.Struct({ SecurityGroupIds: SecurityGroupIds, Subnets: Subnets }),
).annotate({ identifier: "VpcConfig" }) as any as S.Schema<VpcConfig>;
export type DocumentClassifierMode =
  | "MULTI_CLASS"
  | "MULTI_LABEL"
  | (string & {});
export const DocumentClassifierMode = S.String;
export interface CreateDocumentClassifierRequest {
  DocumentClassifierName: string;
  VersionName?: string;
  DataAccessRoleArn: string;
  Tags?: Tag[];
  InputDataConfig: DocumentClassifierInputDataConfig;
  OutputDataConfig?: DocumentClassifierOutputDataConfig;
  ClientRequestToken?: string;
  LanguageCode: LanguageCode;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Mode?: DocumentClassifierMode;
  ModelKmsKeyId?: string;
  ModelPolicy?: string;
}
export const CreateDocumentClassifierRequest = S.suspend(() =>
  S.Struct({
    DocumentClassifierName: S.String,
    VersionName: S.optional(S.String),
    DataAccessRoleArn: S.String,
    Tags: S.optional(TagList),
    InputDataConfig: DocumentClassifierInputDataConfig,
    OutputDataConfig: S.optional(DocumentClassifierOutputDataConfig),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    LanguageCode: LanguageCode,
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    Mode: S.optional(DocumentClassifierMode),
    ModelKmsKeyId: S.optional(S.String),
    ModelPolicy: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDocumentClassifierRequest",
}) as any as S.Schema<CreateDocumentClassifierRequest>;
export interface CreateDocumentClassifierResponse {
  DocumentClassifierArn?: string;
}
export const CreateDocumentClassifierResponse = S.suspend(() =>
  S.Struct({ DocumentClassifierArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateDocumentClassifierResponse",
}) as any as S.Schema<CreateDocumentClassifierResponse>;
export interface CreateEndpointRequest {
  EndpointName: string;
  ModelArn?: string;
  DesiredInferenceUnits: number;
  ClientRequestToken?: string;
  Tags?: Tag[];
  DataAccessRoleArn?: string;
  FlywheelArn?: string;
}
export const CreateEndpointRequest = S.suspend(() =>
  S.Struct({
    EndpointName: S.String,
    ModelArn: S.optional(S.String),
    DesiredInferenceUnits: S.Number,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
    DataAccessRoleArn: S.optional(S.String),
    FlywheelArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEndpointRequest",
}) as any as S.Schema<CreateEndpointRequest>;
export interface CreateEndpointResponse {
  EndpointArn?: string;
  ModelArn?: string;
}
export const CreateEndpointResponse = S.suspend(() =>
  S.Struct({
    EndpointArn: S.optional(S.String),
    ModelArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateEndpointResponse",
}) as any as S.Schema<CreateEndpointResponse>;
export type EntityRecognizerDataFormat =
  | "COMPREHEND_CSV"
  | "AUGMENTED_MANIFEST"
  | (string & {});
export const EntityRecognizerDataFormat = S.String;
export interface EntityTypesListItem {
  Type: string;
}
export const EntityTypesListItem = S.suspend(() =>
  S.Struct({ Type: S.String }),
).annotate({
  identifier: "EntityTypesListItem",
}) as any as S.Schema<EntityTypesListItem>;
export type EntityTypesList = EntityTypesListItem[];
export const EntityTypesList = S.Array(EntityTypesListItem);
export interface EntityRecognizerDocuments {
  S3Uri: string;
  TestS3Uri?: string;
  InputFormat?: InputFormat;
}
export const EntityRecognizerDocuments = S.suspend(() =>
  S.Struct({
    S3Uri: S.String,
    TestS3Uri: S.optional(S.String),
    InputFormat: S.optional(InputFormat),
  }),
).annotate({
  identifier: "EntityRecognizerDocuments",
}) as any as S.Schema<EntityRecognizerDocuments>;
export interface EntityRecognizerAnnotations {
  S3Uri: string;
  TestS3Uri?: string;
}
export const EntityRecognizerAnnotations = S.suspend(() =>
  S.Struct({ S3Uri: S.String, TestS3Uri: S.optional(S.String) }),
).annotate({
  identifier: "EntityRecognizerAnnotations",
}) as any as S.Schema<EntityRecognizerAnnotations>;
export interface EntityRecognizerEntityList {
  S3Uri: string;
}
export const EntityRecognizerEntityList = S.suspend(() =>
  S.Struct({ S3Uri: S.String }),
).annotate({
  identifier: "EntityRecognizerEntityList",
}) as any as S.Schema<EntityRecognizerEntityList>;
export type EntityRecognizerAugmentedManifestsList =
  AugmentedManifestsListItem[];
export const EntityRecognizerAugmentedManifestsList = S.Array(
  AugmentedManifestsListItem,
);
export interface EntityRecognizerInputDataConfig {
  DataFormat?: EntityRecognizerDataFormat;
  EntityTypes: EntityTypesListItem[];
  Documents?: EntityRecognizerDocuments;
  Annotations?: EntityRecognizerAnnotations;
  EntityList?: EntityRecognizerEntityList;
  AugmentedManifests?: AugmentedManifestsListItem[];
}
export const EntityRecognizerInputDataConfig = S.suspend(() =>
  S.Struct({
    DataFormat: S.optional(EntityRecognizerDataFormat),
    EntityTypes: EntityTypesList,
    Documents: S.optional(EntityRecognizerDocuments),
    Annotations: S.optional(EntityRecognizerAnnotations),
    EntityList: S.optional(EntityRecognizerEntityList),
    AugmentedManifests: S.optional(EntityRecognizerAugmentedManifestsList),
  }),
).annotate({
  identifier: "EntityRecognizerInputDataConfig",
}) as any as S.Schema<EntityRecognizerInputDataConfig>;
export interface CreateEntityRecognizerRequest {
  RecognizerName: string;
  VersionName?: string;
  DataAccessRoleArn: string;
  Tags?: Tag[];
  InputDataConfig: EntityRecognizerInputDataConfig;
  ClientRequestToken?: string;
  LanguageCode: LanguageCode;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  ModelKmsKeyId?: string;
  ModelPolicy?: string;
}
export const CreateEntityRecognizerRequest = S.suspend(() =>
  S.Struct({
    RecognizerName: S.String,
    VersionName: S.optional(S.String),
    DataAccessRoleArn: S.String,
    Tags: S.optional(TagList),
    InputDataConfig: EntityRecognizerInputDataConfig,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    LanguageCode: LanguageCode,
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    ModelKmsKeyId: S.optional(S.String),
    ModelPolicy: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEntityRecognizerRequest",
}) as any as S.Schema<CreateEntityRecognizerRequest>;
export interface CreateEntityRecognizerResponse {
  EntityRecognizerArn?: string;
}
export const CreateEntityRecognizerResponse = S.suspend(() =>
  S.Struct({ EntityRecognizerArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateEntityRecognizerResponse",
}) as any as S.Schema<CreateEntityRecognizerResponse>;
export type LabelsList = string[];
export const LabelsList = S.Array(S.String);
export interface DocumentClassificationConfig {
  Mode: DocumentClassifierMode;
  Labels?: string[];
}
export const DocumentClassificationConfig = S.suspend(() =>
  S.Struct({ Mode: DocumentClassifierMode, Labels: S.optional(LabelsList) }),
).annotate({
  identifier: "DocumentClassificationConfig",
}) as any as S.Schema<DocumentClassificationConfig>;
export interface EntityRecognitionConfig {
  EntityTypes: EntityTypesListItem[];
}
export const EntityRecognitionConfig = S.suspend(() =>
  S.Struct({ EntityTypes: EntityTypesList }),
).annotate({
  identifier: "EntityRecognitionConfig",
}) as any as S.Schema<EntityRecognitionConfig>;
export interface TaskConfig {
  LanguageCode: LanguageCode;
  DocumentClassificationConfig?: DocumentClassificationConfig;
  EntityRecognitionConfig?: EntityRecognitionConfig;
}
export const TaskConfig = S.suspend(() =>
  S.Struct({
    LanguageCode: LanguageCode,
    DocumentClassificationConfig: S.optional(DocumentClassificationConfig),
    EntityRecognitionConfig: S.optional(EntityRecognitionConfig),
  }),
).annotate({ identifier: "TaskConfig" }) as any as S.Schema<TaskConfig>;
export type ModelType =
  | "DOCUMENT_CLASSIFIER"
  | "ENTITY_RECOGNIZER"
  | (string & {});
export const ModelType = S.String;
export interface DataSecurityConfig {
  ModelKmsKeyId?: string;
  VolumeKmsKeyId?: string;
  DataLakeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export const DataSecurityConfig = S.suspend(() =>
  S.Struct({
    ModelKmsKeyId: S.optional(S.String),
    VolumeKmsKeyId: S.optional(S.String),
    DataLakeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
  }),
).annotate({
  identifier: "DataSecurityConfig",
}) as any as S.Schema<DataSecurityConfig>;
export interface CreateFlywheelRequest {
  FlywheelName: string;
  ActiveModelArn?: string;
  DataAccessRoleArn: string;
  TaskConfig?: TaskConfig;
  ModelType?: ModelType;
  DataLakeS3Uri: string;
  DataSecurityConfig?: DataSecurityConfig;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export const CreateFlywheelRequest = S.suspend(() =>
  S.Struct({
    FlywheelName: S.String,
    ActiveModelArn: S.optional(S.String),
    DataAccessRoleArn: S.String,
    TaskConfig: S.optional(TaskConfig),
    ModelType: S.optional(ModelType),
    DataLakeS3Uri: S.String,
    DataSecurityConfig: S.optional(DataSecurityConfig),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFlywheelRequest",
}) as any as S.Schema<CreateFlywheelRequest>;
export interface CreateFlywheelResponse {
  FlywheelArn?: string;
  ActiveModelArn?: string;
}
export const CreateFlywheelResponse = S.suspend(() =>
  S.Struct({
    FlywheelArn: S.optional(S.String),
    ActiveModelArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateFlywheelResponse",
}) as any as S.Schema<CreateFlywheelResponse>;
export interface DeleteDocumentClassifierRequest {
  DocumentClassifierArn: string;
}
export const DeleteDocumentClassifierRequest = S.suspend(() =>
  S.Struct({ DocumentClassifierArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDocumentClassifierRequest",
}) as any as S.Schema<DeleteDocumentClassifierRequest>;
export interface DeleteDocumentClassifierResponse {}
export const DeleteDocumentClassifierResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDocumentClassifierResponse",
}) as any as S.Schema<DeleteDocumentClassifierResponse>;
export interface DeleteEndpointRequest {
  EndpointArn: string;
}
export const DeleteEndpointRequest = S.suspend(() =>
  S.Struct({ EndpointArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEndpointRequest",
}) as any as S.Schema<DeleteEndpointRequest>;
export interface DeleteEndpointResponse {}
export const DeleteEndpointResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteEndpointResponse",
}) as any as S.Schema<DeleteEndpointResponse>;
export interface DeleteEntityRecognizerRequest {
  EntityRecognizerArn: string;
}
export const DeleteEntityRecognizerRequest = S.suspend(() =>
  S.Struct({ EntityRecognizerArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEntityRecognizerRequest",
}) as any as S.Schema<DeleteEntityRecognizerRequest>;
export interface DeleteEntityRecognizerResponse {}
export const DeleteEntityRecognizerResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEntityRecognizerResponse",
}) as any as S.Schema<DeleteEntityRecognizerResponse>;
export interface DeleteFlywheelRequest {
  FlywheelArn: string;
}
export const DeleteFlywheelRequest = S.suspend(() =>
  S.Struct({ FlywheelArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFlywheelRequest",
}) as any as S.Schema<DeleteFlywheelRequest>;
export interface DeleteFlywheelResponse {}
export const DeleteFlywheelResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteFlywheelResponse",
}) as any as S.Schema<DeleteFlywheelResponse>;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
  PolicyRevisionId?: string;
}
export const DeleteResourcePolicyRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    PolicyRevisionId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface DescribeDatasetRequest {
  DatasetArn: string;
}
export const DescribeDatasetRequest = S.suspend(() =>
  S.Struct({ DatasetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDatasetRequest",
}) as any as S.Schema<DescribeDatasetRequest>;
export type DatasetStatus = "CREATING" | "COMPLETED" | "FAILED" | (string & {});
export const DatasetStatus = S.String;
export interface DatasetProperties {
  DatasetArn?: string;
  DatasetName?: string;
  DatasetType?: DatasetType;
  DatasetS3Uri?: string;
  Description?: string;
  Status?: DatasetStatus;
  Message?: string;
  NumberOfDocuments?: number;
  CreationTime?: Date;
  EndTime?: Date;
}
export const DatasetProperties = S.suspend(() =>
  S.Struct({
    DatasetArn: S.optional(S.String),
    DatasetName: S.optional(S.String),
    DatasetType: S.optional(DatasetType),
    DatasetS3Uri: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(DatasetStatus),
    Message: S.optional(S.String),
    NumberOfDocuments: S.optional(S.Number),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DatasetProperties",
}) as any as S.Schema<DatasetProperties>;
export interface DescribeDatasetResponse {
  DatasetProperties?: DatasetProperties;
}
export const DescribeDatasetResponse = S.suspend(() =>
  S.Struct({ DatasetProperties: S.optional(DatasetProperties) }),
).annotate({
  identifier: "DescribeDatasetResponse",
}) as any as S.Schema<DescribeDatasetResponse>;
export interface DescribeDocumentClassificationJobRequest {
  JobId: string;
}
export const DescribeDocumentClassificationJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDocumentClassificationJobRequest",
}) as any as S.Schema<DescribeDocumentClassificationJobRequest>;
export type JobStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "STOP_REQUESTED"
  | "STOPPED"
  | (string & {});
export const JobStatus = S.String;
export interface InputDataConfig {
  S3Uri: string;
  InputFormat?: InputFormat;
  DocumentReaderConfig?: DocumentReaderConfig;
}
export const InputDataConfig = S.suspend(() =>
  S.Struct({
    S3Uri: S.String,
    InputFormat: S.optional(InputFormat),
    DocumentReaderConfig: S.optional(DocumentReaderConfig),
  }),
).annotate({
  identifier: "InputDataConfig",
}) as any as S.Schema<InputDataConfig>;
export interface OutputDataConfig {
  S3Uri: string;
  KmsKeyId?: string;
}
export const OutputDataConfig = S.suspend(() =>
  S.Struct({ S3Uri: S.String, KmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "OutputDataConfig",
}) as any as S.Schema<OutputDataConfig>;
export interface DocumentClassificationJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  DocumentClassifierArn?: string;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  FlywheelArn?: string;
}
export const DocumentClassificationJobProperties = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    Message: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DocumentClassifierArn: S.optional(S.String),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(OutputDataConfig),
    DataAccessRoleArn: S.optional(S.String),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    FlywheelArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentClassificationJobProperties",
}) as any as S.Schema<DocumentClassificationJobProperties>;
export interface DescribeDocumentClassificationJobResponse {
  DocumentClassificationJobProperties?: DocumentClassificationJobProperties;
}
export const DescribeDocumentClassificationJobResponse = S.suspend(() =>
  S.Struct({
    DocumentClassificationJobProperties: S.optional(
      DocumentClassificationJobProperties,
    ),
  }),
).annotate({
  identifier: "DescribeDocumentClassificationJobResponse",
}) as any as S.Schema<DescribeDocumentClassificationJobResponse>;
export interface DescribeDocumentClassifierRequest {
  DocumentClassifierArn: string;
}
export const DescribeDocumentClassifierRequest = S.suspend(() =>
  S.Struct({ DocumentClassifierArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDocumentClassifierRequest",
}) as any as S.Schema<DescribeDocumentClassifierRequest>;
export type ModelStatus =
  | "SUBMITTED"
  | "TRAINING"
  | "DELETING"
  | "STOP_REQUESTED"
  | "STOPPED"
  | "IN_ERROR"
  | "TRAINED"
  | "TRAINED_WITH_WARNING"
  | (string & {});
export const ModelStatus = S.String;
export interface ClassifierEvaluationMetrics {
  Accuracy?: number;
  Precision?: number;
  Recall?: number;
  F1Score?: number;
  MicroPrecision?: number;
  MicroRecall?: number;
  MicroF1Score?: number;
  HammingLoss?: number;
}
export const ClassifierEvaluationMetrics = S.suspend(() =>
  S.Struct({
    Accuracy: S.optional(S.Number),
    Precision: S.optional(S.Number),
    Recall: S.optional(S.Number),
    F1Score: S.optional(S.Number),
    MicroPrecision: S.optional(S.Number),
    MicroRecall: S.optional(S.Number),
    MicroF1Score: S.optional(S.Number),
    HammingLoss: S.optional(S.Number),
  }),
).annotate({
  identifier: "ClassifierEvaluationMetrics",
}) as any as S.Schema<ClassifierEvaluationMetrics>;
export interface ClassifierMetadata {
  NumberOfLabels?: number;
  NumberOfTrainedDocuments?: number;
  NumberOfTestDocuments?: number;
  EvaluationMetrics?: ClassifierEvaluationMetrics;
}
export const ClassifierMetadata = S.suspend(() =>
  S.Struct({
    NumberOfLabels: S.optional(S.Number),
    NumberOfTrainedDocuments: S.optional(S.Number),
    NumberOfTestDocuments: S.optional(S.Number),
    EvaluationMetrics: S.optional(ClassifierEvaluationMetrics),
  }),
).annotate({
  identifier: "ClassifierMetadata",
}) as any as S.Schema<ClassifierMetadata>;
export interface DocumentClassifierProperties {
  DocumentClassifierArn?: string;
  LanguageCode?: LanguageCode;
  Status?: ModelStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  TrainingStartTime?: Date;
  TrainingEndTime?: Date;
  InputDataConfig?: DocumentClassifierInputDataConfig;
  OutputDataConfig?: DocumentClassifierOutputDataConfig;
  ClassifierMetadata?: ClassifierMetadata;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Mode?: DocumentClassifierMode;
  ModelKmsKeyId?: string;
  VersionName?: string;
  SourceModelArn?: string;
  FlywheelArn?: string;
}
export const DocumentClassifierProperties = S.suspend(() =>
  S.Struct({
    DocumentClassifierArn: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    Status: S.optional(ModelStatus),
    Message: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TrainingStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TrainingEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    InputDataConfig: S.optional(DocumentClassifierInputDataConfig),
    OutputDataConfig: S.optional(DocumentClassifierOutputDataConfig),
    ClassifierMetadata: S.optional(ClassifierMetadata),
    DataAccessRoleArn: S.optional(S.String),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    Mode: S.optional(DocumentClassifierMode),
    ModelKmsKeyId: S.optional(S.String),
    VersionName: S.optional(S.String),
    SourceModelArn: S.optional(S.String),
    FlywheelArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentClassifierProperties",
}) as any as S.Schema<DocumentClassifierProperties>;
export interface DescribeDocumentClassifierResponse {
  DocumentClassifierProperties?: DocumentClassifierProperties;
}
export const DescribeDocumentClassifierResponse = S.suspend(() =>
  S.Struct({
    DocumentClassifierProperties: S.optional(DocumentClassifierProperties),
  }),
).annotate({
  identifier: "DescribeDocumentClassifierResponse",
}) as any as S.Schema<DescribeDocumentClassifierResponse>;
export interface DescribeDominantLanguageDetectionJobRequest {
  JobId: string;
}
export const DescribeDominantLanguageDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDominantLanguageDetectionJobRequest",
}) as any as S.Schema<DescribeDominantLanguageDetectionJobRequest>;
export interface DominantLanguageDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export const DominantLanguageDetectionJobProperties = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    Message: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(OutputDataConfig),
    DataAccessRoleArn: S.optional(S.String),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
  }),
).annotate({
  identifier: "DominantLanguageDetectionJobProperties",
}) as any as S.Schema<DominantLanguageDetectionJobProperties>;
export interface DescribeDominantLanguageDetectionJobResponse {
  DominantLanguageDetectionJobProperties?: DominantLanguageDetectionJobProperties;
}
export const DescribeDominantLanguageDetectionJobResponse = S.suspend(() =>
  S.Struct({
    DominantLanguageDetectionJobProperties: S.optional(
      DominantLanguageDetectionJobProperties,
    ),
  }),
).annotate({
  identifier: "DescribeDominantLanguageDetectionJobResponse",
}) as any as S.Schema<DescribeDominantLanguageDetectionJobResponse>;
export interface DescribeEndpointRequest {
  EndpointArn: string;
}
export const DescribeEndpointRequest = S.suspend(() =>
  S.Struct({ EndpointArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeEndpointRequest",
}) as any as S.Schema<DescribeEndpointRequest>;
export type EndpointStatus =
  | "CREATING"
  | "DELETING"
  | "FAILED"
  | "IN_SERVICE"
  | "UPDATING"
  | (string & {});
export const EndpointStatus = S.String;
export interface EndpointProperties {
  EndpointArn?: string;
  Status?: EndpointStatus;
  Message?: string;
  ModelArn?: string;
  DesiredModelArn?: string;
  DesiredInferenceUnits?: number;
  CurrentInferenceUnits?: number;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  DataAccessRoleArn?: string;
  DesiredDataAccessRoleArn?: string;
  FlywheelArn?: string;
}
export const EndpointProperties = S.suspend(() =>
  S.Struct({
    EndpointArn: S.optional(S.String),
    Status: S.optional(EndpointStatus),
    Message: S.optional(S.String),
    ModelArn: S.optional(S.String),
    DesiredModelArn: S.optional(S.String),
    DesiredInferenceUnits: S.optional(S.Number),
    CurrentInferenceUnits: S.optional(S.Number),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DataAccessRoleArn: S.optional(S.String),
    DesiredDataAccessRoleArn: S.optional(S.String),
    FlywheelArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EndpointProperties",
}) as any as S.Schema<EndpointProperties>;
export interface DescribeEndpointResponse {
  EndpointProperties?: EndpointProperties;
}
export const DescribeEndpointResponse = S.suspend(() =>
  S.Struct({ EndpointProperties: S.optional(EndpointProperties) }),
).annotate({
  identifier: "DescribeEndpointResponse",
}) as any as S.Schema<DescribeEndpointResponse>;
export interface DescribeEntitiesDetectionJobRequest {
  JobId: string;
}
export const DescribeEntitiesDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeEntitiesDetectionJobRequest",
}) as any as S.Schema<DescribeEntitiesDetectionJobRequest>;
export interface EntitiesDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  EntityRecognizerArn?: string;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  FlywheelArn?: string;
}
export const EntitiesDetectionJobProperties = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    Message: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EntityRecognizerArn: S.optional(S.String),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(OutputDataConfig),
    LanguageCode: S.optional(LanguageCode),
    DataAccessRoleArn: S.optional(S.String),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    FlywheelArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EntitiesDetectionJobProperties",
}) as any as S.Schema<EntitiesDetectionJobProperties>;
export interface DescribeEntitiesDetectionJobResponse {
  EntitiesDetectionJobProperties?: EntitiesDetectionJobProperties;
}
export const DescribeEntitiesDetectionJobResponse = S.suspend(() =>
  S.Struct({
    EntitiesDetectionJobProperties: S.optional(EntitiesDetectionJobProperties),
  }),
).annotate({
  identifier: "DescribeEntitiesDetectionJobResponse",
}) as any as S.Schema<DescribeEntitiesDetectionJobResponse>;
export interface DescribeEntityRecognizerRequest {
  EntityRecognizerArn: string;
}
export const DescribeEntityRecognizerRequest = S.suspend(() =>
  S.Struct({ EntityRecognizerArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeEntityRecognizerRequest",
}) as any as S.Schema<DescribeEntityRecognizerRequest>;
export interface EntityRecognizerEvaluationMetrics {
  Precision?: number;
  Recall?: number;
  F1Score?: number;
}
export const EntityRecognizerEvaluationMetrics = S.suspend(() =>
  S.Struct({
    Precision: S.optional(S.Number),
    Recall: S.optional(S.Number),
    F1Score: S.optional(S.Number),
  }),
).annotate({
  identifier: "EntityRecognizerEvaluationMetrics",
}) as any as S.Schema<EntityRecognizerEvaluationMetrics>;
export interface EntityTypesEvaluationMetrics {
  Precision?: number;
  Recall?: number;
  F1Score?: number;
}
export const EntityTypesEvaluationMetrics = S.suspend(() =>
  S.Struct({
    Precision: S.optional(S.Number),
    Recall: S.optional(S.Number),
    F1Score: S.optional(S.Number),
  }),
).annotate({
  identifier: "EntityTypesEvaluationMetrics",
}) as any as S.Schema<EntityTypesEvaluationMetrics>;
export interface EntityRecognizerMetadataEntityTypesListItem {
  Type?: string;
  EvaluationMetrics?: EntityTypesEvaluationMetrics;
  NumberOfTrainMentions?: number;
}
export const EntityRecognizerMetadataEntityTypesListItem = S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    EvaluationMetrics: S.optional(EntityTypesEvaluationMetrics),
    NumberOfTrainMentions: S.optional(S.Number),
  }),
).annotate({
  identifier: "EntityRecognizerMetadataEntityTypesListItem",
}) as any as S.Schema<EntityRecognizerMetadataEntityTypesListItem>;
export type EntityRecognizerMetadataEntityTypesList =
  EntityRecognizerMetadataEntityTypesListItem[];
export const EntityRecognizerMetadataEntityTypesList = S.Array(
  EntityRecognizerMetadataEntityTypesListItem,
);
export interface EntityRecognizerMetadata {
  NumberOfTrainedDocuments?: number;
  NumberOfTestDocuments?: number;
  EvaluationMetrics?: EntityRecognizerEvaluationMetrics;
  EntityTypes?: EntityRecognizerMetadataEntityTypesListItem[];
}
export const EntityRecognizerMetadata = S.suspend(() =>
  S.Struct({
    NumberOfTrainedDocuments: S.optional(S.Number),
    NumberOfTestDocuments: S.optional(S.Number),
    EvaluationMetrics: S.optional(EntityRecognizerEvaluationMetrics),
    EntityTypes: S.optional(EntityRecognizerMetadataEntityTypesList),
  }),
).annotate({
  identifier: "EntityRecognizerMetadata",
}) as any as S.Schema<EntityRecognizerMetadata>;
export interface EntityRecognizerOutputDataConfig {
  FlywheelStatsS3Prefix?: string;
}
export const EntityRecognizerOutputDataConfig = S.suspend(() =>
  S.Struct({ FlywheelStatsS3Prefix: S.optional(S.String) }),
).annotate({
  identifier: "EntityRecognizerOutputDataConfig",
}) as any as S.Schema<EntityRecognizerOutputDataConfig>;
export interface EntityRecognizerProperties {
  EntityRecognizerArn?: string;
  LanguageCode?: LanguageCode;
  Status?: ModelStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  TrainingStartTime?: Date;
  TrainingEndTime?: Date;
  InputDataConfig?: EntityRecognizerInputDataConfig;
  RecognizerMetadata?: EntityRecognizerMetadata;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  ModelKmsKeyId?: string;
  VersionName?: string;
  SourceModelArn?: string;
  FlywheelArn?: string;
  OutputDataConfig?: EntityRecognizerOutputDataConfig;
}
export const EntityRecognizerProperties = S.suspend(() =>
  S.Struct({
    EntityRecognizerArn: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    Status: S.optional(ModelStatus),
    Message: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TrainingStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TrainingEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    InputDataConfig: S.optional(EntityRecognizerInputDataConfig),
    RecognizerMetadata: S.optional(EntityRecognizerMetadata),
    DataAccessRoleArn: S.optional(S.String),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    ModelKmsKeyId: S.optional(S.String),
    VersionName: S.optional(S.String),
    SourceModelArn: S.optional(S.String),
    FlywheelArn: S.optional(S.String),
    OutputDataConfig: S.optional(EntityRecognizerOutputDataConfig),
  }),
).annotate({
  identifier: "EntityRecognizerProperties",
}) as any as S.Schema<EntityRecognizerProperties>;
export interface DescribeEntityRecognizerResponse {
  EntityRecognizerProperties?: EntityRecognizerProperties;
}
export const DescribeEntityRecognizerResponse = S.suspend(() =>
  S.Struct({
    EntityRecognizerProperties: S.optional(EntityRecognizerProperties),
  }),
).annotate({
  identifier: "DescribeEntityRecognizerResponse",
}) as any as S.Schema<DescribeEntityRecognizerResponse>;
export interface DescribeEventsDetectionJobRequest {
  JobId: string;
}
export const DescribeEventsDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeEventsDetectionJobRequest",
}) as any as S.Schema<DescribeEventsDetectionJobRequest>;
export type TargetEventTypes = string[];
export const TargetEventTypes = S.Array(S.String);
export interface EventsDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  TargetEventTypes?: string[];
}
export const EventsDetectionJobProperties = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    Message: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(OutputDataConfig),
    LanguageCode: S.optional(LanguageCode),
    DataAccessRoleArn: S.optional(S.String),
    TargetEventTypes: S.optional(TargetEventTypes),
  }),
).annotate({
  identifier: "EventsDetectionJobProperties",
}) as any as S.Schema<EventsDetectionJobProperties>;
export interface DescribeEventsDetectionJobResponse {
  EventsDetectionJobProperties?: EventsDetectionJobProperties;
}
export const DescribeEventsDetectionJobResponse = S.suspend(() =>
  S.Struct({
    EventsDetectionJobProperties: S.optional(EventsDetectionJobProperties),
  }),
).annotate({
  identifier: "DescribeEventsDetectionJobResponse",
}) as any as S.Schema<DescribeEventsDetectionJobResponse>;
export interface DescribeFlywheelRequest {
  FlywheelArn: string;
}
export const DescribeFlywheelRequest = S.suspend(() =>
  S.Struct({ FlywheelArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFlywheelRequest",
}) as any as S.Schema<DescribeFlywheelRequest>;
export type FlywheelStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const FlywheelStatus = S.String;
export interface FlywheelProperties {
  FlywheelArn?: string;
  ActiveModelArn?: string;
  DataAccessRoleArn?: string;
  TaskConfig?: TaskConfig;
  DataLakeS3Uri?: string;
  DataSecurityConfig?: DataSecurityConfig;
  Status?: FlywheelStatus;
  ModelType?: ModelType;
  Message?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LatestFlywheelIteration?: string;
}
export const FlywheelProperties = S.suspend(() =>
  S.Struct({
    FlywheelArn: S.optional(S.String),
    ActiveModelArn: S.optional(S.String),
    DataAccessRoleArn: S.optional(S.String),
    TaskConfig: S.optional(TaskConfig),
    DataLakeS3Uri: S.optional(S.String),
    DataSecurityConfig: S.optional(DataSecurityConfig),
    Status: S.optional(FlywheelStatus),
    ModelType: S.optional(ModelType),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestFlywheelIteration: S.optional(S.String),
  }),
).annotate({
  identifier: "FlywheelProperties",
}) as any as S.Schema<FlywheelProperties>;
export interface DescribeFlywheelResponse {
  FlywheelProperties?: FlywheelProperties;
}
export const DescribeFlywheelResponse = S.suspend(() =>
  S.Struct({ FlywheelProperties: S.optional(FlywheelProperties) }),
).annotate({
  identifier: "DescribeFlywheelResponse",
}) as any as S.Schema<DescribeFlywheelResponse>;
export interface DescribeFlywheelIterationRequest {
  FlywheelArn: string;
  FlywheelIterationId: string;
}
export const DescribeFlywheelIterationRequest = S.suspend(() =>
  S.Struct({ FlywheelArn: S.String, FlywheelIterationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFlywheelIterationRequest",
}) as any as S.Schema<DescribeFlywheelIterationRequest>;
export type FlywheelIterationStatus =
  | "TRAINING"
  | "EVALUATING"
  | "COMPLETED"
  | "FAILED"
  | "STOP_REQUESTED"
  | "STOPPED"
  | (string & {});
export const FlywheelIterationStatus = S.String;
export interface FlywheelModelEvaluationMetrics {
  AverageF1Score?: number;
  AveragePrecision?: number;
  AverageRecall?: number;
  AverageAccuracy?: number;
}
export const FlywheelModelEvaluationMetrics = S.suspend(() =>
  S.Struct({
    AverageF1Score: S.optional(S.Number),
    AveragePrecision: S.optional(S.Number),
    AverageRecall: S.optional(S.Number),
    AverageAccuracy: S.optional(S.Number),
  }),
).annotate({
  identifier: "FlywheelModelEvaluationMetrics",
}) as any as S.Schema<FlywheelModelEvaluationMetrics>;
export interface FlywheelIterationProperties {
  FlywheelArn?: string;
  FlywheelIterationId?: string;
  CreationTime?: Date;
  EndTime?: Date;
  Status?: FlywheelIterationStatus;
  Message?: string;
  EvaluatedModelArn?: string;
  EvaluatedModelMetrics?: FlywheelModelEvaluationMetrics;
  TrainedModelArn?: string;
  TrainedModelMetrics?: FlywheelModelEvaluationMetrics;
  EvaluationManifestS3Prefix?: string;
}
export const FlywheelIterationProperties = S.suspend(() =>
  S.Struct({
    FlywheelArn: S.optional(S.String),
    FlywheelIterationId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(FlywheelIterationStatus),
    Message: S.optional(S.String),
    EvaluatedModelArn: S.optional(S.String),
    EvaluatedModelMetrics: S.optional(FlywheelModelEvaluationMetrics),
    TrainedModelArn: S.optional(S.String),
    TrainedModelMetrics: S.optional(FlywheelModelEvaluationMetrics),
    EvaluationManifestS3Prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "FlywheelIterationProperties",
}) as any as S.Schema<FlywheelIterationProperties>;
export interface DescribeFlywheelIterationResponse {
  FlywheelIterationProperties?: FlywheelIterationProperties;
}
export const DescribeFlywheelIterationResponse = S.suspend(() =>
  S.Struct({
    FlywheelIterationProperties: S.optional(FlywheelIterationProperties),
  }),
).annotate({
  identifier: "DescribeFlywheelIterationResponse",
}) as any as S.Schema<DescribeFlywheelIterationResponse>;
export interface DescribeKeyPhrasesDetectionJobRequest {
  JobId: string;
}
export const DescribeKeyPhrasesDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeKeyPhrasesDetectionJobRequest",
}) as any as S.Schema<DescribeKeyPhrasesDetectionJobRequest>;
export interface KeyPhrasesDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export const KeyPhrasesDetectionJobProperties = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    Message: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(OutputDataConfig),
    LanguageCode: S.optional(LanguageCode),
    DataAccessRoleArn: S.optional(S.String),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
  }),
).annotate({
  identifier: "KeyPhrasesDetectionJobProperties",
}) as any as S.Schema<KeyPhrasesDetectionJobProperties>;
export interface DescribeKeyPhrasesDetectionJobResponse {
  KeyPhrasesDetectionJobProperties?: KeyPhrasesDetectionJobProperties;
}
export const DescribeKeyPhrasesDetectionJobResponse = S.suspend(() =>
  S.Struct({
    KeyPhrasesDetectionJobProperties: S.optional(
      KeyPhrasesDetectionJobProperties,
    ),
  }),
).annotate({
  identifier: "DescribeKeyPhrasesDetectionJobResponse",
}) as any as S.Schema<DescribeKeyPhrasesDetectionJobResponse>;
export interface DescribePiiEntitiesDetectionJobRequest {
  JobId: string;
}
export const DescribePiiEntitiesDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribePiiEntitiesDetectionJobRequest",
}) as any as S.Schema<DescribePiiEntitiesDetectionJobRequest>;
export interface PiiOutputDataConfig {
  S3Uri: string;
  KmsKeyId?: string;
}
export const PiiOutputDataConfig = S.suspend(() =>
  S.Struct({ S3Uri: S.String, KmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "PiiOutputDataConfig",
}) as any as S.Schema<PiiOutputDataConfig>;
export type ListOfPiiEntityTypes = PiiEntityType[];
export const ListOfPiiEntityTypes = S.Array(PiiEntityType);
export type PiiEntitiesDetectionMaskMode =
  | "MASK"
  | "REPLACE_WITH_PII_ENTITY_TYPE"
  | (string & {});
export const PiiEntitiesDetectionMaskMode = S.String;
export interface RedactionConfig {
  PiiEntityTypes?: PiiEntityType[];
  MaskMode?: PiiEntitiesDetectionMaskMode;
  MaskCharacter?: string;
}
export const RedactionConfig = S.suspend(() =>
  S.Struct({
    PiiEntityTypes: S.optional(ListOfPiiEntityTypes),
    MaskMode: S.optional(PiiEntitiesDetectionMaskMode),
    MaskCharacter: S.optional(S.String),
  }),
).annotate({
  identifier: "RedactionConfig",
}) as any as S.Schema<RedactionConfig>;
export type PiiEntitiesDetectionMode =
  | "ONLY_REDACTION"
  | "ONLY_OFFSETS"
  | (string & {});
export const PiiEntitiesDetectionMode = S.String;
export interface PiiEntitiesDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: PiiOutputDataConfig;
  RedactionConfig?: RedactionConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  Mode?: PiiEntitiesDetectionMode;
}
export const PiiEntitiesDetectionJobProperties = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    Message: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(PiiOutputDataConfig),
    RedactionConfig: S.optional(RedactionConfig),
    LanguageCode: S.optional(LanguageCode),
    DataAccessRoleArn: S.optional(S.String),
    Mode: S.optional(PiiEntitiesDetectionMode),
  }),
).annotate({
  identifier: "PiiEntitiesDetectionJobProperties",
}) as any as S.Schema<PiiEntitiesDetectionJobProperties>;
export interface DescribePiiEntitiesDetectionJobResponse {
  PiiEntitiesDetectionJobProperties?: PiiEntitiesDetectionJobProperties;
}
export const DescribePiiEntitiesDetectionJobResponse = S.suspend(() =>
  S.Struct({
    PiiEntitiesDetectionJobProperties: S.optional(
      PiiEntitiesDetectionJobProperties,
    ),
  }),
).annotate({
  identifier: "DescribePiiEntitiesDetectionJobResponse",
}) as any as S.Schema<DescribePiiEntitiesDetectionJobResponse>;
export interface DescribeResourcePolicyRequest {
  ResourceArn: string;
}
export const DescribeResourcePolicyRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeResourcePolicyRequest",
}) as any as S.Schema<DescribeResourcePolicyRequest>;
export interface DescribeResourcePolicyResponse {
  ResourcePolicy?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  PolicyRevisionId?: string;
}
export const DescribeResourcePolicyResponse = S.suspend(() =>
  S.Struct({
    ResourcePolicy: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PolicyRevisionId: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeResourcePolicyResponse",
}) as any as S.Schema<DescribeResourcePolicyResponse>;
export interface DescribeSentimentDetectionJobRequest {
  JobId: string;
}
export const DescribeSentimentDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSentimentDetectionJobRequest",
}) as any as S.Schema<DescribeSentimentDetectionJobRequest>;
export interface SentimentDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export const SentimentDetectionJobProperties = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    Message: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(OutputDataConfig),
    LanguageCode: S.optional(LanguageCode),
    DataAccessRoleArn: S.optional(S.String),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
  }),
).annotate({
  identifier: "SentimentDetectionJobProperties",
}) as any as S.Schema<SentimentDetectionJobProperties>;
export interface DescribeSentimentDetectionJobResponse {
  SentimentDetectionJobProperties?: SentimentDetectionJobProperties;
}
export const DescribeSentimentDetectionJobResponse = S.suspend(() =>
  S.Struct({
    SentimentDetectionJobProperties: S.optional(
      SentimentDetectionJobProperties,
    ),
  }),
).annotate({
  identifier: "DescribeSentimentDetectionJobResponse",
}) as any as S.Schema<DescribeSentimentDetectionJobResponse>;
export interface DescribeTargetedSentimentDetectionJobRequest {
  JobId: string;
}
export const DescribeTargetedSentimentDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeTargetedSentimentDetectionJobRequest",
}) as any as S.Schema<DescribeTargetedSentimentDetectionJobRequest>;
export interface TargetedSentimentDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  LanguageCode?: LanguageCode;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export const TargetedSentimentDetectionJobProperties = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    Message: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(OutputDataConfig),
    LanguageCode: S.optional(LanguageCode),
    DataAccessRoleArn: S.optional(S.String),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
  }),
).annotate({
  identifier: "TargetedSentimentDetectionJobProperties",
}) as any as S.Schema<TargetedSentimentDetectionJobProperties>;
export interface DescribeTargetedSentimentDetectionJobResponse {
  TargetedSentimentDetectionJobProperties?: TargetedSentimentDetectionJobProperties;
}
export const DescribeTargetedSentimentDetectionJobResponse = S.suspend(() =>
  S.Struct({
    TargetedSentimentDetectionJobProperties: S.optional(
      TargetedSentimentDetectionJobProperties,
    ),
  }),
).annotate({
  identifier: "DescribeTargetedSentimentDetectionJobResponse",
}) as any as S.Schema<DescribeTargetedSentimentDetectionJobResponse>;
export interface DescribeTopicsDetectionJobRequest {
  JobId: string;
}
export const DescribeTopicsDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeTopicsDetectionJobRequest",
}) as any as S.Schema<DescribeTopicsDetectionJobRequest>;
export interface TopicsDetectionJobProperties {
  JobId?: string;
  JobArn?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  Message?: string;
  SubmitTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  NumberOfTopics?: number;
  DataAccessRoleArn?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export const TopicsDetectionJobProperties = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    Message: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(OutputDataConfig),
    NumberOfTopics: S.optional(S.Number),
    DataAccessRoleArn: S.optional(S.String),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
  }),
).annotate({
  identifier: "TopicsDetectionJobProperties",
}) as any as S.Schema<TopicsDetectionJobProperties>;
export interface DescribeTopicsDetectionJobResponse {
  TopicsDetectionJobProperties?: TopicsDetectionJobProperties;
}
export const DescribeTopicsDetectionJobResponse = S.suspend(() =>
  S.Struct({
    TopicsDetectionJobProperties: S.optional(TopicsDetectionJobProperties),
  }),
).annotate({
  identifier: "DescribeTopicsDetectionJobResponse",
}) as any as S.Schema<DescribeTopicsDetectionJobResponse>;
export interface DetectDominantLanguageRequest {
  Text: string | redacted.Redacted<string>;
}
export const DetectDominantLanguageRequest = S.suspend(() =>
  S.Struct({ Text: SensitiveString }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectDominantLanguageRequest",
}) as any as S.Schema<DetectDominantLanguageRequest>;
export interface DetectDominantLanguageResponse {
  Languages?: DominantLanguage[];
}
export const DetectDominantLanguageResponse = S.suspend(() =>
  S.Struct({ Languages: S.optional(ListOfDominantLanguages) }),
).annotate({
  identifier: "DetectDominantLanguageResponse",
}) as any as S.Schema<DetectDominantLanguageResponse>;
export interface DetectEntitiesRequest {
  Text?: string | redacted.Redacted<string>;
  LanguageCode?: LanguageCode;
  EndpointArn?: string;
  Bytes?: Uint8Array;
  DocumentReaderConfig?: DocumentReaderConfig;
}
export const DetectEntitiesRequest = S.suspend(() =>
  S.Struct({
    Text: S.optional(SensitiveString),
    LanguageCode: S.optional(LanguageCode),
    EndpointArn: S.optional(S.String),
    Bytes: S.optional(T.Blob),
    DocumentReaderConfig: S.optional(DocumentReaderConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectEntitiesRequest",
}) as any as S.Schema<DetectEntitiesRequest>;
export type BlockType = "LINE" | "WORD" | (string & {});
export const BlockType = S.String;
export interface BoundingBox {
  Height?: number;
  Left?: number;
  Top?: number;
  Width?: number;
}
export const BoundingBox = S.suspend(() =>
  S.Struct({
    Height: S.optional(S.Number),
    Left: S.optional(S.Number),
    Top: S.optional(S.Number),
    Width: S.optional(S.Number),
  }),
).annotate({ identifier: "BoundingBox" }) as any as S.Schema<BoundingBox>;
export interface Point {
  X?: number;
  Y?: number;
}
export const Point = S.suspend(() =>
  S.Struct({ X: S.optional(S.Number), Y: S.optional(S.Number) }),
).annotate({ identifier: "Point" }) as any as S.Schema<Point>;
export type Polygon = Point[];
export const Polygon = S.Array(Point);
export interface Geometry {
  BoundingBox?: BoundingBox;
  Polygon?: Point[];
}
export const Geometry = S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Polygon: S.optional(Polygon),
  }),
).annotate({ identifier: "Geometry" }) as any as S.Schema<Geometry>;
export type StringList = string[];
export const StringList = S.Array(S.String);
export type RelationshipType = "CHILD" | (string & {});
export const RelationshipType = S.String;
export interface RelationshipsListItem {
  Ids?: string[];
  Type?: RelationshipType;
}
export const RelationshipsListItem = S.suspend(() =>
  S.Struct({ Ids: S.optional(StringList), Type: S.optional(RelationshipType) }),
).annotate({
  identifier: "RelationshipsListItem",
}) as any as S.Schema<RelationshipsListItem>;
export type ListOfRelationships = RelationshipsListItem[];
export const ListOfRelationships = S.Array(RelationshipsListItem);
export interface Block {
  Id?: string;
  BlockType?: BlockType;
  Text?: string;
  Page?: number;
  Geometry?: Geometry;
  Relationships?: RelationshipsListItem[];
}
export const Block = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    BlockType: S.optional(BlockType),
    Text: S.optional(S.String),
    Page: S.optional(S.Number),
    Geometry: S.optional(Geometry),
    Relationships: S.optional(ListOfRelationships),
  }),
).annotate({ identifier: "Block" }) as any as S.Schema<Block>;
export type ListOfBlocks = Block[];
export const ListOfBlocks = S.Array(Block);
export interface DetectEntitiesResponse {
  Entities?: Entity[];
  DocumentMetadata?: DocumentMetadata;
  DocumentType?: DocumentTypeListItem[];
  Blocks?: Block[];
  Errors?: ErrorsListItem[];
}
export const DetectEntitiesResponse = S.suspend(() =>
  S.Struct({
    Entities: S.optional(ListOfEntities),
    DocumentMetadata: S.optional(DocumentMetadata),
    DocumentType: S.optional(ListOfDocumentType),
    Blocks: S.optional(ListOfBlocks),
    Errors: S.optional(ListOfErrors),
  }),
).annotate({
  identifier: "DetectEntitiesResponse",
}) as any as S.Schema<DetectEntitiesResponse>;
export interface DetectKeyPhrasesRequest {
  Text: string | redacted.Redacted<string>;
  LanguageCode: LanguageCode;
}
export const DetectKeyPhrasesRequest = S.suspend(() =>
  S.Struct({ Text: SensitiveString, LanguageCode: LanguageCode }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectKeyPhrasesRequest",
}) as any as S.Schema<DetectKeyPhrasesRequest>;
export interface DetectKeyPhrasesResponse {
  KeyPhrases?: KeyPhrase[];
}
export const DetectKeyPhrasesResponse = S.suspend(() =>
  S.Struct({ KeyPhrases: S.optional(ListOfKeyPhrases) }),
).annotate({
  identifier: "DetectKeyPhrasesResponse",
}) as any as S.Schema<DetectKeyPhrasesResponse>;
export interface DetectPiiEntitiesRequest {
  Text: string;
  LanguageCode: LanguageCode;
}
export const DetectPiiEntitiesRequest = S.suspend(() =>
  S.Struct({ Text: S.String, LanguageCode: LanguageCode }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectPiiEntitiesRequest",
}) as any as S.Schema<DetectPiiEntitiesRequest>;
export interface PiiEntity {
  Score?: number;
  Type?: PiiEntityType;
  BeginOffset?: number;
  EndOffset?: number;
}
export const PiiEntity = S.suspend(() =>
  S.Struct({
    Score: S.optional(S.Number),
    Type: S.optional(PiiEntityType),
    BeginOffset: S.optional(S.Number),
    EndOffset: S.optional(S.Number),
  }),
).annotate({ identifier: "PiiEntity" }) as any as S.Schema<PiiEntity>;
export type ListOfPiiEntities = PiiEntity[];
export const ListOfPiiEntities = S.Array(PiiEntity);
export interface DetectPiiEntitiesResponse {
  Entities?: PiiEntity[];
}
export const DetectPiiEntitiesResponse = S.suspend(() =>
  S.Struct({ Entities: S.optional(ListOfPiiEntities) }),
).annotate({
  identifier: "DetectPiiEntitiesResponse",
}) as any as S.Schema<DetectPiiEntitiesResponse>;
export interface DetectSentimentRequest {
  Text: string | redacted.Redacted<string>;
  LanguageCode: LanguageCode;
}
export const DetectSentimentRequest = S.suspend(() =>
  S.Struct({ Text: SensitiveString, LanguageCode: LanguageCode }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectSentimentRequest",
}) as any as S.Schema<DetectSentimentRequest>;
export interface DetectSentimentResponse {
  Sentiment?: SentimentType;
  SentimentScore?: SentimentScore;
}
export const DetectSentimentResponse = S.suspend(() =>
  S.Struct({
    Sentiment: S.optional(SentimentType),
    SentimentScore: S.optional(SentimentScore),
  }),
).annotate({
  identifier: "DetectSentimentResponse",
}) as any as S.Schema<DetectSentimentResponse>;
export interface DetectSyntaxRequest {
  Text: string | redacted.Redacted<string>;
  LanguageCode: SyntaxLanguageCode;
}
export const DetectSyntaxRequest = S.suspend(() =>
  S.Struct({ Text: SensitiveString, LanguageCode: SyntaxLanguageCode }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectSyntaxRequest",
}) as any as S.Schema<DetectSyntaxRequest>;
export interface DetectSyntaxResponse {
  SyntaxTokens?: SyntaxToken[];
}
export const DetectSyntaxResponse = S.suspend(() =>
  S.Struct({ SyntaxTokens: S.optional(ListOfSyntaxTokens) }),
).annotate({
  identifier: "DetectSyntaxResponse",
}) as any as S.Schema<DetectSyntaxResponse>;
export interface DetectTargetedSentimentRequest {
  Text: string | redacted.Redacted<string>;
  LanguageCode: LanguageCode;
}
export const DetectTargetedSentimentRequest = S.suspend(() =>
  S.Struct({ Text: SensitiveString, LanguageCode: LanguageCode }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectTargetedSentimentRequest",
}) as any as S.Schema<DetectTargetedSentimentRequest>;
export interface DetectTargetedSentimentResponse {
  Entities?: TargetedSentimentEntity[];
}
export const DetectTargetedSentimentResponse = S.suspend(() =>
  S.Struct({ Entities: S.optional(ListOfTargetedSentimentEntities) }),
).annotate({
  identifier: "DetectTargetedSentimentResponse",
}) as any as S.Schema<DetectTargetedSentimentResponse>;
export interface TextSegment {
  Text: string | redacted.Redacted<string>;
}
export const TextSegment = S.suspend(() =>
  S.Struct({ Text: SensitiveString }),
).annotate({ identifier: "TextSegment" }) as any as S.Schema<TextSegment>;
export type ListOfTextSegments = TextSegment[];
export const ListOfTextSegments = S.Array(TextSegment);
export interface DetectToxicContentRequest {
  TextSegments: TextSegment[];
  LanguageCode: LanguageCode;
}
export const DetectToxicContentRequest = S.suspend(() =>
  S.Struct({
    TextSegments: ListOfTextSegments,
    LanguageCode: LanguageCode,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectToxicContentRequest",
}) as any as S.Schema<DetectToxicContentRequest>;
export type ToxicContentType =
  | "GRAPHIC"
  | "HARASSMENT_OR_ABUSE"
  | "HATE_SPEECH"
  | "INSULT"
  | "PROFANITY"
  | "SEXUAL"
  | "VIOLENCE_OR_THREAT"
  | (string & {});
export const ToxicContentType = S.String;
export interface ToxicContent {
  Name?: ToxicContentType;
  Score?: number;
}
export const ToxicContent = S.suspend(() =>
  S.Struct({ Name: S.optional(ToxicContentType), Score: S.optional(S.Number) }),
).annotate({ identifier: "ToxicContent" }) as any as S.Schema<ToxicContent>;
export type ListOfToxicContent = ToxicContent[];
export const ListOfToxicContent = S.Array(ToxicContent);
export interface ToxicLabels {
  Labels?: ToxicContent[];
  Toxicity?: number;
}
export const ToxicLabels = S.suspend(() =>
  S.Struct({
    Labels: S.optional(ListOfToxicContent),
    Toxicity: S.optional(S.Number),
  }),
).annotate({ identifier: "ToxicLabels" }) as any as S.Schema<ToxicLabels>;
export type ListOfToxicLabels = ToxicLabels[];
export const ListOfToxicLabels = S.Array(ToxicLabels);
export interface DetectToxicContentResponse {
  ResultList?: ToxicLabels[];
}
export const DetectToxicContentResponse = S.suspend(() =>
  S.Struct({ ResultList: S.optional(ListOfToxicLabels) }),
).annotate({
  identifier: "DetectToxicContentResponse",
}) as any as S.Schema<DetectToxicContentResponse>;
export interface ImportModelRequest {
  SourceModelArn: string;
  ModelName?: string;
  VersionName?: string;
  ModelKmsKeyId?: string;
  DataAccessRoleArn?: string;
  Tags?: Tag[];
}
export const ImportModelRequest = S.suspend(() =>
  S.Struct({
    SourceModelArn: S.String,
    ModelName: S.optional(S.String),
    VersionName: S.optional(S.String),
    ModelKmsKeyId: S.optional(S.String),
    DataAccessRoleArn: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ImportModelRequest",
}) as any as S.Schema<ImportModelRequest>;
export interface ImportModelResponse {
  ModelArn?: string;
}
export const ImportModelResponse = S.suspend(() =>
  S.Struct({ ModelArn: S.optional(S.String) }),
).annotate({
  identifier: "ImportModelResponse",
}) as any as S.Schema<ImportModelResponse>;
export interface DatasetFilter {
  Status?: DatasetStatus;
  DatasetType?: DatasetType;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
}
export const DatasetFilter = S.suspend(() =>
  S.Struct({
    Status: S.optional(DatasetStatus),
    DatasetType: S.optional(DatasetType),
    CreationTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "DatasetFilter" }) as any as S.Schema<DatasetFilter>;
export interface ListDatasetsRequest {
  FlywheelArn?: string;
  Filter?: DatasetFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDatasetsRequest = S.suspend(() =>
  S.Struct({
    FlywheelArn: S.optional(S.String),
    Filter: S.optional(DatasetFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatasetsRequest",
}) as any as S.Schema<ListDatasetsRequest>;
export type DatasetPropertiesList = DatasetProperties[];
export const DatasetPropertiesList = S.Array(DatasetProperties);
export interface ListDatasetsResponse {
  DatasetPropertiesList?: DatasetProperties[];
  NextToken?: string;
}
export const ListDatasetsResponse = S.suspend(() =>
  S.Struct({
    DatasetPropertiesList: S.optional(DatasetPropertiesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetsResponse",
}) as any as S.Schema<ListDatasetsResponse>;
export interface DocumentClassificationJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export const DocumentClassificationJobFilter = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmitTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmitTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DocumentClassificationJobFilter",
}) as any as S.Schema<DocumentClassificationJobFilter>;
export interface ListDocumentClassificationJobsRequest {
  Filter?: DocumentClassificationJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDocumentClassificationJobsRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(DocumentClassificationJobFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDocumentClassificationJobsRequest",
}) as any as S.Schema<ListDocumentClassificationJobsRequest>;
export type DocumentClassificationJobPropertiesList =
  DocumentClassificationJobProperties[];
export const DocumentClassificationJobPropertiesList = S.Array(
  DocumentClassificationJobProperties,
);
export interface ListDocumentClassificationJobsResponse {
  DocumentClassificationJobPropertiesList?: DocumentClassificationJobProperties[];
  NextToken?: string;
}
export const ListDocumentClassificationJobsResponse = S.suspend(() =>
  S.Struct({
    DocumentClassificationJobPropertiesList: S.optional(
      DocumentClassificationJobPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDocumentClassificationJobsResponse",
}) as any as S.Schema<ListDocumentClassificationJobsResponse>;
export interface DocumentClassifierFilter {
  Status?: ModelStatus;
  DocumentClassifierName?: string;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export const DocumentClassifierFilter = S.suspend(() =>
  S.Struct({
    Status: S.optional(ModelStatus),
    DocumentClassifierName: S.optional(S.String),
    SubmitTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmitTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DocumentClassifierFilter",
}) as any as S.Schema<DocumentClassifierFilter>;
export interface ListDocumentClassifiersRequest {
  Filter?: DocumentClassifierFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDocumentClassifiersRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(DocumentClassifierFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDocumentClassifiersRequest",
}) as any as S.Schema<ListDocumentClassifiersRequest>;
export type DocumentClassifierPropertiesList = DocumentClassifierProperties[];
export const DocumentClassifierPropertiesList = S.Array(
  DocumentClassifierProperties,
);
export interface ListDocumentClassifiersResponse {
  DocumentClassifierPropertiesList?: DocumentClassifierProperties[];
  NextToken?: string;
}
export const ListDocumentClassifiersResponse = S.suspend(() =>
  S.Struct({
    DocumentClassifierPropertiesList: S.optional(
      DocumentClassifierPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDocumentClassifiersResponse",
}) as any as S.Schema<ListDocumentClassifiersResponse>;
export interface ListDocumentClassifierSummariesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListDocumentClassifierSummariesRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDocumentClassifierSummariesRequest",
}) as any as S.Schema<ListDocumentClassifierSummariesRequest>;
export interface DocumentClassifierSummary {
  DocumentClassifierName?: string;
  NumberOfVersions?: number;
  LatestVersionCreatedAt?: Date;
  LatestVersionName?: string;
  LatestVersionStatus?: ModelStatus;
}
export const DocumentClassifierSummary = S.suspend(() =>
  S.Struct({
    DocumentClassifierName: S.optional(S.String),
    NumberOfVersions: S.optional(S.Number),
    LatestVersionCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestVersionName: S.optional(S.String),
    LatestVersionStatus: S.optional(ModelStatus),
  }),
).annotate({
  identifier: "DocumentClassifierSummary",
}) as any as S.Schema<DocumentClassifierSummary>;
export type DocumentClassifierSummariesList = DocumentClassifierSummary[];
export const DocumentClassifierSummariesList = S.Array(
  DocumentClassifierSummary,
);
export interface ListDocumentClassifierSummariesResponse {
  DocumentClassifierSummariesList?: DocumentClassifierSummary[];
  NextToken?: string;
}
export const ListDocumentClassifierSummariesResponse = S.suspend(() =>
  S.Struct({
    DocumentClassifierSummariesList: S.optional(
      DocumentClassifierSummariesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDocumentClassifierSummariesResponse",
}) as any as S.Schema<ListDocumentClassifierSummariesResponse>;
export interface DominantLanguageDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export const DominantLanguageDetectionJobFilter = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmitTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmitTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DominantLanguageDetectionJobFilter",
}) as any as S.Schema<DominantLanguageDetectionJobFilter>;
export interface ListDominantLanguageDetectionJobsRequest {
  Filter?: DominantLanguageDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDominantLanguageDetectionJobsRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(DominantLanguageDetectionJobFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDominantLanguageDetectionJobsRequest",
}) as any as S.Schema<ListDominantLanguageDetectionJobsRequest>;
export type DominantLanguageDetectionJobPropertiesList =
  DominantLanguageDetectionJobProperties[];
export const DominantLanguageDetectionJobPropertiesList = S.Array(
  DominantLanguageDetectionJobProperties,
);
export interface ListDominantLanguageDetectionJobsResponse {
  DominantLanguageDetectionJobPropertiesList?: DominantLanguageDetectionJobProperties[];
  NextToken?: string;
}
export const ListDominantLanguageDetectionJobsResponse = S.suspend(() =>
  S.Struct({
    DominantLanguageDetectionJobPropertiesList: S.optional(
      DominantLanguageDetectionJobPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDominantLanguageDetectionJobsResponse",
}) as any as S.Schema<ListDominantLanguageDetectionJobsResponse>;
export interface EndpointFilter {
  ModelArn?: string;
  Status?: EndpointStatus;
  CreationTimeBefore?: Date;
  CreationTimeAfter?: Date;
}
export const EndpointFilter = S.suspend(() =>
  S.Struct({
    ModelArn: S.optional(S.String),
    Status: S.optional(EndpointStatus),
    CreationTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "EndpointFilter" }) as any as S.Schema<EndpointFilter>;
export interface ListEndpointsRequest {
  Filter?: EndpointFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListEndpointsRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(EndpointFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEndpointsRequest",
}) as any as S.Schema<ListEndpointsRequest>;
export type EndpointPropertiesList = EndpointProperties[];
export const EndpointPropertiesList = S.Array(EndpointProperties);
export interface ListEndpointsResponse {
  EndpointPropertiesList?: EndpointProperties[];
  NextToken?: string;
}
export const ListEndpointsResponse = S.suspend(() =>
  S.Struct({
    EndpointPropertiesList: S.optional(EndpointPropertiesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEndpointsResponse",
}) as any as S.Schema<ListEndpointsResponse>;
export interface EntitiesDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export const EntitiesDetectionJobFilter = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmitTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmitTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "EntitiesDetectionJobFilter",
}) as any as S.Schema<EntitiesDetectionJobFilter>;
export interface ListEntitiesDetectionJobsRequest {
  Filter?: EntitiesDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListEntitiesDetectionJobsRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(EntitiesDetectionJobFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEntitiesDetectionJobsRequest",
}) as any as S.Schema<ListEntitiesDetectionJobsRequest>;
export type EntitiesDetectionJobPropertiesList =
  EntitiesDetectionJobProperties[];
export const EntitiesDetectionJobPropertiesList = S.Array(
  EntitiesDetectionJobProperties,
);
export interface ListEntitiesDetectionJobsResponse {
  EntitiesDetectionJobPropertiesList?: EntitiesDetectionJobProperties[];
  NextToken?: string;
}
export const ListEntitiesDetectionJobsResponse = S.suspend(() =>
  S.Struct({
    EntitiesDetectionJobPropertiesList: S.optional(
      EntitiesDetectionJobPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEntitiesDetectionJobsResponse",
}) as any as S.Schema<ListEntitiesDetectionJobsResponse>;
export interface EntityRecognizerFilter {
  Status?: ModelStatus;
  RecognizerName?: string;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export const EntityRecognizerFilter = S.suspend(() =>
  S.Struct({
    Status: S.optional(ModelStatus),
    RecognizerName: S.optional(S.String),
    SubmitTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmitTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "EntityRecognizerFilter",
}) as any as S.Schema<EntityRecognizerFilter>;
export interface ListEntityRecognizersRequest {
  Filter?: EntityRecognizerFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListEntityRecognizersRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(EntityRecognizerFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEntityRecognizersRequest",
}) as any as S.Schema<ListEntityRecognizersRequest>;
export type EntityRecognizerPropertiesList = EntityRecognizerProperties[];
export const EntityRecognizerPropertiesList = S.Array(
  EntityRecognizerProperties,
);
export interface ListEntityRecognizersResponse {
  EntityRecognizerPropertiesList?: EntityRecognizerProperties[];
  NextToken?: string;
}
export const ListEntityRecognizersResponse = S.suspend(() =>
  S.Struct({
    EntityRecognizerPropertiesList: S.optional(EntityRecognizerPropertiesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEntityRecognizersResponse",
}) as any as S.Schema<ListEntityRecognizersResponse>;
export interface ListEntityRecognizerSummariesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListEntityRecognizerSummariesRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEntityRecognizerSummariesRequest",
}) as any as S.Schema<ListEntityRecognizerSummariesRequest>;
export interface EntityRecognizerSummary {
  RecognizerName?: string;
  NumberOfVersions?: number;
  LatestVersionCreatedAt?: Date;
  LatestVersionName?: string;
  LatestVersionStatus?: ModelStatus;
}
export const EntityRecognizerSummary = S.suspend(() =>
  S.Struct({
    RecognizerName: S.optional(S.String),
    NumberOfVersions: S.optional(S.Number),
    LatestVersionCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestVersionName: S.optional(S.String),
    LatestVersionStatus: S.optional(ModelStatus),
  }),
).annotate({
  identifier: "EntityRecognizerSummary",
}) as any as S.Schema<EntityRecognizerSummary>;
export type EntityRecognizerSummariesList = EntityRecognizerSummary[];
export const EntityRecognizerSummariesList = S.Array(EntityRecognizerSummary);
export interface ListEntityRecognizerSummariesResponse {
  EntityRecognizerSummariesList?: EntityRecognizerSummary[];
  NextToken?: string;
}
export const ListEntityRecognizerSummariesResponse = S.suspend(() =>
  S.Struct({
    EntityRecognizerSummariesList: S.optional(EntityRecognizerSummariesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEntityRecognizerSummariesResponse",
}) as any as S.Schema<ListEntityRecognizerSummariesResponse>;
export interface EventsDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export const EventsDetectionJobFilter = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmitTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmitTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "EventsDetectionJobFilter",
}) as any as S.Schema<EventsDetectionJobFilter>;
export interface ListEventsDetectionJobsRequest {
  Filter?: EventsDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListEventsDetectionJobsRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(EventsDetectionJobFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEventsDetectionJobsRequest",
}) as any as S.Schema<ListEventsDetectionJobsRequest>;
export type EventsDetectionJobPropertiesList = EventsDetectionJobProperties[];
export const EventsDetectionJobPropertiesList = S.Array(
  EventsDetectionJobProperties,
);
export interface ListEventsDetectionJobsResponse {
  EventsDetectionJobPropertiesList?: EventsDetectionJobProperties[];
  NextToken?: string;
}
export const ListEventsDetectionJobsResponse = S.suspend(() =>
  S.Struct({
    EventsDetectionJobPropertiesList: S.optional(
      EventsDetectionJobPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEventsDetectionJobsResponse",
}) as any as S.Schema<ListEventsDetectionJobsResponse>;
export interface FlywheelIterationFilter {
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
}
export const FlywheelIterationFilter = S.suspend(() =>
  S.Struct({
    CreationTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "FlywheelIterationFilter",
}) as any as S.Schema<FlywheelIterationFilter>;
export interface ListFlywheelIterationHistoryRequest {
  FlywheelArn: string;
  Filter?: FlywheelIterationFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListFlywheelIterationHistoryRequest = S.suspend(() =>
  S.Struct({
    FlywheelArn: S.String,
    Filter: S.optional(FlywheelIterationFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFlywheelIterationHistoryRequest",
}) as any as S.Schema<ListFlywheelIterationHistoryRequest>;
export type FlywheelIterationPropertiesList = FlywheelIterationProperties[];
export const FlywheelIterationPropertiesList = S.Array(
  FlywheelIterationProperties,
);
export interface ListFlywheelIterationHistoryResponse {
  FlywheelIterationPropertiesList?: FlywheelIterationProperties[];
  NextToken?: string;
}
export const ListFlywheelIterationHistoryResponse = S.suspend(() =>
  S.Struct({
    FlywheelIterationPropertiesList: S.optional(
      FlywheelIterationPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFlywheelIterationHistoryResponse",
}) as any as S.Schema<ListFlywheelIterationHistoryResponse>;
export interface FlywheelFilter {
  Status?: FlywheelStatus;
  CreationTimeAfter?: Date;
  CreationTimeBefore?: Date;
}
export const FlywheelFilter = S.suspend(() =>
  S.Struct({
    Status: S.optional(FlywheelStatus),
    CreationTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "FlywheelFilter" }) as any as S.Schema<FlywheelFilter>;
export interface ListFlywheelsRequest {
  Filter?: FlywheelFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListFlywheelsRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(FlywheelFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFlywheelsRequest",
}) as any as S.Schema<ListFlywheelsRequest>;
export interface FlywheelSummary {
  FlywheelArn?: string;
  ActiveModelArn?: string;
  DataLakeS3Uri?: string;
  Status?: FlywheelStatus;
  ModelType?: ModelType;
  Message?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LatestFlywheelIteration?: string;
}
export const FlywheelSummary = S.suspend(() =>
  S.Struct({
    FlywheelArn: S.optional(S.String),
    ActiveModelArn: S.optional(S.String),
    DataLakeS3Uri: S.optional(S.String),
    Status: S.optional(FlywheelStatus),
    ModelType: S.optional(ModelType),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestFlywheelIteration: S.optional(S.String),
  }),
).annotate({
  identifier: "FlywheelSummary",
}) as any as S.Schema<FlywheelSummary>;
export type FlywheelSummaryList = FlywheelSummary[];
export const FlywheelSummaryList = S.Array(FlywheelSummary);
export interface ListFlywheelsResponse {
  FlywheelSummaryList?: FlywheelSummary[];
  NextToken?: string;
}
export const ListFlywheelsResponse = S.suspend(() =>
  S.Struct({
    FlywheelSummaryList: S.optional(FlywheelSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFlywheelsResponse",
}) as any as S.Schema<ListFlywheelsResponse>;
export interface KeyPhrasesDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export const KeyPhrasesDetectionJobFilter = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmitTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmitTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "KeyPhrasesDetectionJobFilter",
}) as any as S.Schema<KeyPhrasesDetectionJobFilter>;
export interface ListKeyPhrasesDetectionJobsRequest {
  Filter?: KeyPhrasesDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListKeyPhrasesDetectionJobsRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(KeyPhrasesDetectionJobFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListKeyPhrasesDetectionJobsRequest",
}) as any as S.Schema<ListKeyPhrasesDetectionJobsRequest>;
export type KeyPhrasesDetectionJobPropertiesList =
  KeyPhrasesDetectionJobProperties[];
export const KeyPhrasesDetectionJobPropertiesList = S.Array(
  KeyPhrasesDetectionJobProperties,
);
export interface ListKeyPhrasesDetectionJobsResponse {
  KeyPhrasesDetectionJobPropertiesList?: KeyPhrasesDetectionJobProperties[];
  NextToken?: string;
}
export const ListKeyPhrasesDetectionJobsResponse = S.suspend(() =>
  S.Struct({
    KeyPhrasesDetectionJobPropertiesList: S.optional(
      KeyPhrasesDetectionJobPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListKeyPhrasesDetectionJobsResponse",
}) as any as S.Schema<ListKeyPhrasesDetectionJobsResponse>;
export interface PiiEntitiesDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export const PiiEntitiesDetectionJobFilter = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmitTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmitTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PiiEntitiesDetectionJobFilter",
}) as any as S.Schema<PiiEntitiesDetectionJobFilter>;
export interface ListPiiEntitiesDetectionJobsRequest {
  Filter?: PiiEntitiesDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListPiiEntitiesDetectionJobsRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(PiiEntitiesDetectionJobFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPiiEntitiesDetectionJobsRequest",
}) as any as S.Schema<ListPiiEntitiesDetectionJobsRequest>;
export type PiiEntitiesDetectionJobPropertiesList =
  PiiEntitiesDetectionJobProperties[];
export const PiiEntitiesDetectionJobPropertiesList = S.Array(
  PiiEntitiesDetectionJobProperties,
);
export interface ListPiiEntitiesDetectionJobsResponse {
  PiiEntitiesDetectionJobPropertiesList?: PiiEntitiesDetectionJobProperties[];
  NextToken?: string;
}
export const ListPiiEntitiesDetectionJobsResponse = S.suspend(() =>
  S.Struct({
    PiiEntitiesDetectionJobPropertiesList: S.optional(
      PiiEntitiesDetectionJobPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPiiEntitiesDetectionJobsResponse",
}) as any as S.Schema<ListPiiEntitiesDetectionJobsResponse>;
export interface SentimentDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export const SentimentDetectionJobFilter = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmitTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmitTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "SentimentDetectionJobFilter",
}) as any as S.Schema<SentimentDetectionJobFilter>;
export interface ListSentimentDetectionJobsRequest {
  Filter?: SentimentDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListSentimentDetectionJobsRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(SentimentDetectionJobFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSentimentDetectionJobsRequest",
}) as any as S.Schema<ListSentimentDetectionJobsRequest>;
export type SentimentDetectionJobPropertiesList =
  SentimentDetectionJobProperties[];
export const SentimentDetectionJobPropertiesList = S.Array(
  SentimentDetectionJobProperties,
);
export interface ListSentimentDetectionJobsResponse {
  SentimentDetectionJobPropertiesList?: SentimentDetectionJobProperties[];
  NextToken?: string;
}
export const ListSentimentDetectionJobsResponse = S.suspend(() =>
  S.Struct({
    SentimentDetectionJobPropertiesList: S.optional(
      SentimentDetectionJobPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSentimentDetectionJobsResponse",
}) as any as S.Schema<ListSentimentDetectionJobsResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  ResourceArn?: string;
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String), Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TargetedSentimentDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export const TargetedSentimentDetectionJobFilter = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmitTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmitTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "TargetedSentimentDetectionJobFilter",
}) as any as S.Schema<TargetedSentimentDetectionJobFilter>;
export interface ListTargetedSentimentDetectionJobsRequest {
  Filter?: TargetedSentimentDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListTargetedSentimentDetectionJobsRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(TargetedSentimentDetectionJobFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTargetedSentimentDetectionJobsRequest",
}) as any as S.Schema<ListTargetedSentimentDetectionJobsRequest>;
export type TargetedSentimentDetectionJobPropertiesList =
  TargetedSentimentDetectionJobProperties[];
export const TargetedSentimentDetectionJobPropertiesList = S.Array(
  TargetedSentimentDetectionJobProperties,
);
export interface ListTargetedSentimentDetectionJobsResponse {
  TargetedSentimentDetectionJobPropertiesList?: TargetedSentimentDetectionJobProperties[];
  NextToken?: string;
}
export const ListTargetedSentimentDetectionJobsResponse = S.suspend(() =>
  S.Struct({
    TargetedSentimentDetectionJobPropertiesList: S.optional(
      TargetedSentimentDetectionJobPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTargetedSentimentDetectionJobsResponse",
}) as any as S.Schema<ListTargetedSentimentDetectionJobsResponse>;
export interface TopicsDetectionJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmitTimeBefore?: Date;
  SubmitTimeAfter?: Date;
}
export const TopicsDetectionJobFilter = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmitTimeBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmitTimeAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "TopicsDetectionJobFilter",
}) as any as S.Schema<TopicsDetectionJobFilter>;
export interface ListTopicsDetectionJobsRequest {
  Filter?: TopicsDetectionJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListTopicsDetectionJobsRequest = S.suspend(() =>
  S.Struct({
    Filter: S.optional(TopicsDetectionJobFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTopicsDetectionJobsRequest",
}) as any as S.Schema<ListTopicsDetectionJobsRequest>;
export type TopicsDetectionJobPropertiesList = TopicsDetectionJobProperties[];
export const TopicsDetectionJobPropertiesList = S.Array(
  TopicsDetectionJobProperties,
);
export interface ListTopicsDetectionJobsResponse {
  TopicsDetectionJobPropertiesList?: TopicsDetectionJobProperties[];
  NextToken?: string;
}
export const ListTopicsDetectionJobsResponse = S.suspend(() =>
  S.Struct({
    TopicsDetectionJobPropertiesList: S.optional(
      TopicsDetectionJobPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTopicsDetectionJobsResponse",
}) as any as S.Schema<ListTopicsDetectionJobsResponse>;
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  ResourcePolicy: string;
  PolicyRevisionId?: string;
}
export const PutResourcePolicyRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    ResourcePolicy: S.String,
    PolicyRevisionId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  PolicyRevisionId?: string;
}
export const PutResourcePolicyResponse = S.suspend(() =>
  S.Struct({ PolicyRevisionId: S.optional(S.String) }),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface StartDocumentClassificationJobRequest {
  JobName?: string;
  DocumentClassifierArn?: string;
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
  FlywheelArn?: string;
}
export const StartDocumentClassificationJobRequest = S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    DocumentClassifierArn: S.optional(S.String),
    InputDataConfig: InputDataConfig,
    OutputDataConfig: OutputDataConfig,
    DataAccessRoleArn: S.String,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    Tags: S.optional(TagList),
    FlywheelArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartDocumentClassificationJobRequest",
}) as any as S.Schema<StartDocumentClassificationJobRequest>;
export interface StartDocumentClassificationJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
  DocumentClassifierArn?: string;
}
export const StartDocumentClassificationJobResponse = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    DocumentClassifierArn: S.optional(S.String),
  }),
).annotate({
  identifier: "StartDocumentClassificationJobResponse",
}) as any as S.Schema<StartDocumentClassificationJobResponse>;
export interface StartDominantLanguageDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export const StartDominantLanguageDetectionJobRequest = S.suspend(() =>
  S.Struct({
    InputDataConfig: InputDataConfig,
    OutputDataConfig: OutputDataConfig,
    DataAccessRoleArn: S.String,
    JobName: S.optional(S.String),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartDominantLanguageDetectionJobRequest",
}) as any as S.Schema<StartDominantLanguageDetectionJobRequest>;
export interface StartDominantLanguageDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export const StartDominantLanguageDetectionJobResponse = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
  }),
).annotate({
  identifier: "StartDominantLanguageDetectionJobResponse",
}) as any as S.Schema<StartDominantLanguageDetectionJobResponse>;
export interface StartEntitiesDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  EntityRecognizerArn?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
  FlywheelArn?: string;
}
export const StartEntitiesDetectionJobRequest = S.suspend(() =>
  S.Struct({
    InputDataConfig: InputDataConfig,
    OutputDataConfig: OutputDataConfig,
    DataAccessRoleArn: S.String,
    JobName: S.optional(S.String),
    EntityRecognizerArn: S.optional(S.String),
    LanguageCode: LanguageCode,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    Tags: S.optional(TagList),
    FlywheelArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartEntitiesDetectionJobRequest",
}) as any as S.Schema<StartEntitiesDetectionJobRequest>;
export interface StartEntitiesDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
  EntityRecognizerArn?: string;
}
export const StartEntitiesDetectionJobResponse = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    EntityRecognizerArn: S.optional(S.String),
  }),
).annotate({
  identifier: "StartEntitiesDetectionJobResponse",
}) as any as S.Schema<StartEntitiesDetectionJobResponse>;
export interface StartEventsDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  TargetEventTypes: string[];
  Tags?: Tag[];
}
export const StartEventsDetectionJobRequest = S.suspend(() =>
  S.Struct({
    InputDataConfig: InputDataConfig,
    OutputDataConfig: OutputDataConfig,
    DataAccessRoleArn: S.String,
    JobName: S.optional(S.String),
    LanguageCode: LanguageCode,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    TargetEventTypes: TargetEventTypes,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartEventsDetectionJobRequest",
}) as any as S.Schema<StartEventsDetectionJobRequest>;
export interface StartEventsDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export const StartEventsDetectionJobResponse = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
  }),
).annotate({
  identifier: "StartEventsDetectionJobResponse",
}) as any as S.Schema<StartEventsDetectionJobResponse>;
export interface StartFlywheelIterationRequest {
  FlywheelArn: string;
  ClientRequestToken?: string;
}
export const StartFlywheelIterationRequest = S.suspend(() =>
  S.Struct({
    FlywheelArn: S.String,
    ClientRequestToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartFlywheelIterationRequest",
}) as any as S.Schema<StartFlywheelIterationRequest>;
export interface StartFlywheelIterationResponse {
  FlywheelArn?: string;
  FlywheelIterationId?: string;
}
export const StartFlywheelIterationResponse = S.suspend(() =>
  S.Struct({
    FlywheelArn: S.optional(S.String),
    FlywheelIterationId: S.optional(S.String),
  }),
).annotate({
  identifier: "StartFlywheelIterationResponse",
}) as any as S.Schema<StartFlywheelIterationResponse>;
export interface StartKeyPhrasesDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export const StartKeyPhrasesDetectionJobRequest = S.suspend(() =>
  S.Struct({
    InputDataConfig: InputDataConfig,
    OutputDataConfig: OutputDataConfig,
    DataAccessRoleArn: S.String,
    JobName: S.optional(S.String),
    LanguageCode: LanguageCode,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartKeyPhrasesDetectionJobRequest",
}) as any as S.Schema<StartKeyPhrasesDetectionJobRequest>;
export interface StartKeyPhrasesDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export const StartKeyPhrasesDetectionJobResponse = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
  }),
).annotate({
  identifier: "StartKeyPhrasesDetectionJobResponse",
}) as any as S.Schema<StartKeyPhrasesDetectionJobResponse>;
export interface StartPiiEntitiesDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  Mode: PiiEntitiesDetectionMode;
  RedactionConfig?: RedactionConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export const StartPiiEntitiesDetectionJobRequest = S.suspend(() =>
  S.Struct({
    InputDataConfig: InputDataConfig,
    OutputDataConfig: OutputDataConfig,
    Mode: PiiEntitiesDetectionMode,
    RedactionConfig: S.optional(RedactionConfig),
    DataAccessRoleArn: S.String,
    JobName: S.optional(S.String),
    LanguageCode: LanguageCode,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartPiiEntitiesDetectionJobRequest",
}) as any as S.Schema<StartPiiEntitiesDetectionJobRequest>;
export interface StartPiiEntitiesDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export const StartPiiEntitiesDetectionJobResponse = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
  }),
).annotate({
  identifier: "StartPiiEntitiesDetectionJobResponse",
}) as any as S.Schema<StartPiiEntitiesDetectionJobResponse>;
export interface StartSentimentDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export const StartSentimentDetectionJobRequest = S.suspend(() =>
  S.Struct({
    InputDataConfig: InputDataConfig,
    OutputDataConfig: OutputDataConfig,
    DataAccessRoleArn: S.String,
    JobName: S.optional(S.String),
    LanguageCode: LanguageCode,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartSentimentDetectionJobRequest",
}) as any as S.Schema<StartSentimentDetectionJobRequest>;
export interface StartSentimentDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export const StartSentimentDetectionJobResponse = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
  }),
).annotate({
  identifier: "StartSentimentDetectionJobResponse",
}) as any as S.Schema<StartSentimentDetectionJobResponse>;
export interface StartTargetedSentimentDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export const StartTargetedSentimentDetectionJobRequest = S.suspend(() =>
  S.Struct({
    InputDataConfig: InputDataConfig,
    OutputDataConfig: OutputDataConfig,
    DataAccessRoleArn: S.String,
    JobName: S.optional(S.String),
    LanguageCode: LanguageCode,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartTargetedSentimentDetectionJobRequest",
}) as any as S.Schema<StartTargetedSentimentDetectionJobRequest>;
export interface StartTargetedSentimentDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export const StartTargetedSentimentDetectionJobResponse = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
  }),
).annotate({
  identifier: "StartTargetedSentimentDetectionJobResponse",
}) as any as S.Schema<StartTargetedSentimentDetectionJobResponse>;
export interface StartTopicsDetectionJobRequest {
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  JobName?: string;
  NumberOfTopics?: number;
  ClientRequestToken?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export const StartTopicsDetectionJobRequest = S.suspend(() =>
  S.Struct({
    InputDataConfig: InputDataConfig,
    OutputDataConfig: OutputDataConfig,
    DataAccessRoleArn: S.String,
    JobName: S.optional(S.String),
    NumberOfTopics: S.optional(S.Number),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartTopicsDetectionJobRequest",
}) as any as S.Schema<StartTopicsDetectionJobRequest>;
export interface StartTopicsDetectionJobResponse {
  JobId?: string;
  JobArn?: string;
  JobStatus?: JobStatus;
}
export const StartTopicsDetectionJobResponse = S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobArn: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
  }),
).annotate({
  identifier: "StartTopicsDetectionJobResponse",
}) as any as S.Schema<StartTopicsDetectionJobResponse>;
export interface StopDominantLanguageDetectionJobRequest {
  JobId: string;
}
export const StopDominantLanguageDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopDominantLanguageDetectionJobRequest",
}) as any as S.Schema<StopDominantLanguageDetectionJobRequest>;
export interface StopDominantLanguageDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export const StopDominantLanguageDetectionJobResponse = S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), JobStatus: S.optional(JobStatus) }),
).annotate({
  identifier: "StopDominantLanguageDetectionJobResponse",
}) as any as S.Schema<StopDominantLanguageDetectionJobResponse>;
export interface StopEntitiesDetectionJobRequest {
  JobId: string;
}
export const StopEntitiesDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopEntitiesDetectionJobRequest",
}) as any as S.Schema<StopEntitiesDetectionJobRequest>;
export interface StopEntitiesDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export const StopEntitiesDetectionJobResponse = S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), JobStatus: S.optional(JobStatus) }),
).annotate({
  identifier: "StopEntitiesDetectionJobResponse",
}) as any as S.Schema<StopEntitiesDetectionJobResponse>;
export interface StopEventsDetectionJobRequest {
  JobId: string;
}
export const StopEventsDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopEventsDetectionJobRequest",
}) as any as S.Schema<StopEventsDetectionJobRequest>;
export interface StopEventsDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export const StopEventsDetectionJobResponse = S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), JobStatus: S.optional(JobStatus) }),
).annotate({
  identifier: "StopEventsDetectionJobResponse",
}) as any as S.Schema<StopEventsDetectionJobResponse>;
export interface StopKeyPhrasesDetectionJobRequest {
  JobId: string;
}
export const StopKeyPhrasesDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopKeyPhrasesDetectionJobRequest",
}) as any as S.Schema<StopKeyPhrasesDetectionJobRequest>;
export interface StopKeyPhrasesDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export const StopKeyPhrasesDetectionJobResponse = S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), JobStatus: S.optional(JobStatus) }),
).annotate({
  identifier: "StopKeyPhrasesDetectionJobResponse",
}) as any as S.Schema<StopKeyPhrasesDetectionJobResponse>;
export interface StopPiiEntitiesDetectionJobRequest {
  JobId: string;
}
export const StopPiiEntitiesDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopPiiEntitiesDetectionJobRequest",
}) as any as S.Schema<StopPiiEntitiesDetectionJobRequest>;
export interface StopPiiEntitiesDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export const StopPiiEntitiesDetectionJobResponse = S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), JobStatus: S.optional(JobStatus) }),
).annotate({
  identifier: "StopPiiEntitiesDetectionJobResponse",
}) as any as S.Schema<StopPiiEntitiesDetectionJobResponse>;
export interface StopSentimentDetectionJobRequest {
  JobId: string;
}
export const StopSentimentDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopSentimentDetectionJobRequest",
}) as any as S.Schema<StopSentimentDetectionJobRequest>;
export interface StopSentimentDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export const StopSentimentDetectionJobResponse = S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), JobStatus: S.optional(JobStatus) }),
).annotate({
  identifier: "StopSentimentDetectionJobResponse",
}) as any as S.Schema<StopSentimentDetectionJobResponse>;
export interface StopTargetedSentimentDetectionJobRequest {
  JobId: string;
}
export const StopTargetedSentimentDetectionJobRequest = S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopTargetedSentimentDetectionJobRequest",
}) as any as S.Schema<StopTargetedSentimentDetectionJobRequest>;
export interface StopTargetedSentimentDetectionJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export const StopTargetedSentimentDetectionJobResponse = S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), JobStatus: S.optional(JobStatus) }),
).annotate({
  identifier: "StopTargetedSentimentDetectionJobResponse",
}) as any as S.Schema<StopTargetedSentimentDetectionJobResponse>;
export interface StopTrainingDocumentClassifierRequest {
  DocumentClassifierArn: string;
}
export const StopTrainingDocumentClassifierRequest = S.suspend(() =>
  S.Struct({ DocumentClassifierArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopTrainingDocumentClassifierRequest",
}) as any as S.Schema<StopTrainingDocumentClassifierRequest>;
export interface StopTrainingDocumentClassifierResponse {}
export const StopTrainingDocumentClassifierResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopTrainingDocumentClassifierResponse",
}) as any as S.Schema<StopTrainingDocumentClassifierResponse>;
export interface StopTrainingEntityRecognizerRequest {
  EntityRecognizerArn: string;
}
export const StopTrainingEntityRecognizerRequest = S.suspend(() =>
  S.Struct({ EntityRecognizerArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopTrainingEntityRecognizerRequest",
}) as any as S.Schema<StopTrainingEntityRecognizerRequest>;
export interface StopTrainingEntityRecognizerResponse {}
export const StopTrainingEntityRecognizerResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopTrainingEntityRecognizerResponse",
}) as any as S.Schema<StopTrainingEntityRecognizerResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateEndpointRequest {
  EndpointArn: string;
  DesiredModelArn?: string;
  DesiredInferenceUnits?: number;
  DesiredDataAccessRoleArn?: string;
  FlywheelArn?: string;
}
export const UpdateEndpointRequest = S.suspend(() =>
  S.Struct({
    EndpointArn: S.String,
    DesiredModelArn: S.optional(S.String),
    DesiredInferenceUnits: S.optional(S.Number),
    DesiredDataAccessRoleArn: S.optional(S.String),
    FlywheelArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateEndpointRequest",
}) as any as S.Schema<UpdateEndpointRequest>;
export interface UpdateEndpointResponse {
  DesiredModelArn?: string;
}
export const UpdateEndpointResponse = S.suspend(() =>
  S.Struct({ DesiredModelArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateEndpointResponse",
}) as any as S.Schema<UpdateEndpointResponse>;
export interface UpdateDataSecurityConfig {
  ModelKmsKeyId?: string;
  VolumeKmsKeyId?: string;
  VpcConfig?: VpcConfig;
}
export const UpdateDataSecurityConfig = S.suspend(() =>
  S.Struct({
    ModelKmsKeyId: S.optional(S.String),
    VolumeKmsKeyId: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
  }),
).annotate({
  identifier: "UpdateDataSecurityConfig",
}) as any as S.Schema<UpdateDataSecurityConfig>;
export interface UpdateFlywheelRequest {
  FlywheelArn: string;
  ActiveModelArn?: string;
  DataAccessRoleArn?: string;
  DataSecurityConfig?: UpdateDataSecurityConfig;
}
export const UpdateFlywheelRequest = S.suspend(() =>
  S.Struct({
    FlywheelArn: S.String,
    ActiveModelArn: S.optional(S.String),
    DataAccessRoleArn: S.optional(S.String),
    DataSecurityConfig: S.optional(UpdateDataSecurityConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateFlywheelRequest",
}) as any as S.Schema<UpdateFlywheelRequest>;
export interface UpdateFlywheelResponse {
  FlywheelProperties?: FlywheelProperties;
}
export const UpdateFlywheelResponse = S.suspend(() =>
  S.Struct({ FlywheelProperties: S.optional(FlywheelProperties) }),
).annotate({
  identifier: "UpdateFlywheelResponse",
}) as any as S.Schema<UpdateFlywheelResponse>;

//# Errors
export class BatchSizeLimitExceededException extends S.TaggedErrorClass<BatchSizeLimitExceededException>()(
  "BatchSizeLimitExceededException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class InvalidRequestException extends S.TaggedErrorClass<InvalidRequestException>()(
  "InvalidRequestException",
  {
    Message: S.optional(S.String),
    Reason: S.optional(InvalidRequestReason),
    Detail: S.optional(InvalidRequestDetail),
  },
).pipe(C.withBadRequestError) {}
export class TextSizeLimitExceededException extends S.TaggedErrorClass<TextSizeLimitExceededException>()(
  "TextSizeLimitExceededException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class UnsupportedLanguageException extends S.TaggedErrorClass<UnsupportedLanguageException>()(
  "UnsupportedLanguageException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceUnavailableException extends S.TaggedErrorClass<ResourceUnavailableException>()(
  "ResourceUnavailableException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceInUseException extends S.TaggedErrorClass<ResourceInUseException>()(
  "ResourceInUseException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceLimitExceededException extends S.TaggedErrorClass<ResourceLimitExceededException>()(
  "ResourceLimitExceededException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class TooManyRequestsException extends S.TaggedErrorClass<TooManyRequestsException>()(
  "TooManyRequestsException",
  { Message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class TooManyTagsException extends S.TaggedErrorClass<TooManyTagsException>()(
  "TooManyTagsException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class KmsKeyValidationException extends S.TaggedErrorClass<KmsKeyValidationException>()(
  "KmsKeyValidationException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class JobNotFoundException extends S.TaggedErrorClass<JobNotFoundException>()(
  "JobNotFoundException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class InvalidFilterException extends S.TaggedErrorClass<InvalidFilterException>()(
  "InvalidFilterException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException extends S.TaggedErrorClass<ConcurrentModificationException>()(
  "ConcurrentModificationException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class TooManyTagKeysException extends S.TaggedErrorClass<TooManyTagKeysException>()(
  "TooManyTagKeysException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
export type BatchDetectDominantLanguageError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | CommonErrors;
/**
 * Determines the dominant language of the input text for a batch of documents. For a list
 * of languages that Amazon Comprehend can detect, see Amazon Comprehend Supported Languages.
 */
export const batchDetectDominantLanguage: API.OperationMethod<
  BatchDetectDominantLanguageRequest,
  BatchDetectDominantLanguageResponse,
  BatchDetectDominantLanguageError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDetectDominantLanguageRequest,
  output: BatchDetectDominantLanguageResponse,
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
  ],
}));
export type BatchDetectEntitiesError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects the text of a batch of documents for named entities and returns information
 * about them. For more information about named entities, see
 * Entities in the Comprehend Developer Guide.
 */
export const batchDetectEntities: API.OperationMethod<
  BatchDetectEntitiesRequest,
  BatchDetectEntitiesResponse,
  BatchDetectEntitiesError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDetectEntitiesRequest,
  output: BatchDetectEntitiesResponse,
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type BatchDetectKeyPhrasesError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Detects the key noun phrases found in a batch of documents.
 */
export const batchDetectKeyPhrases: API.OperationMethod<
  BatchDetectKeyPhrasesRequest,
  BatchDetectKeyPhrasesResponse,
  BatchDetectKeyPhrasesError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDetectKeyPhrasesRequest,
  output: BatchDetectKeyPhrasesResponse,
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type BatchDetectSentimentError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects a batch of documents and returns an inference of the prevailing sentiment,
 * `POSITIVE`, `NEUTRAL`, `MIXED`, or `NEGATIVE`,
 * in each one.
 */
export const batchDetectSentiment: API.OperationMethod<
  BatchDetectSentimentRequest,
  BatchDetectSentimentResponse,
  BatchDetectSentimentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDetectSentimentRequest,
  output: BatchDetectSentimentResponse,
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type BatchDetectSyntaxError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects the text of a batch of documents for the syntax and part of speech of the words
 * in the document and returns information about them. For more information, see
 * Syntax in the Comprehend Developer Guide.
 */
export const batchDetectSyntax: API.OperationMethod<
  BatchDetectSyntaxRequest,
  BatchDetectSyntaxResponse,
  BatchDetectSyntaxError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDetectSyntaxRequest,
  output: BatchDetectSyntaxResponse,
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type BatchDetectTargetedSentimentError =
  | BatchSizeLimitExceededException
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects a batch of documents and returns a sentiment analysis
 * for each entity identified in the documents.
 *
 * For more information about targeted sentiment, see Targeted sentiment in the *Amazon Comprehend Developer Guide*.
 */
export const batchDetectTargetedSentiment: API.OperationMethod<
  BatchDetectTargetedSentimentRequest,
  BatchDetectTargetedSentimentResponse,
  BatchDetectTargetedSentimentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDetectTargetedSentimentRequest,
  output: BatchDetectTargetedSentimentResponse,
  errors: [
    BatchSizeLimitExceededException,
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type ClassifyDocumentError =
  | InternalServerException
  | InvalidRequestException
  | ResourceUnavailableException
  | TextSizeLimitExceededException
  | CommonErrors;
/**
 * Creates a classification request to analyze a single document in real-time. `ClassifyDocument`
 * supports the following model types:
 *
 * - Custom classifier - a custom model that you have created and trained.
 * For input, you can provide plain text, a single-page document (PDF, Word, or image), or
 * Amazon Textract API output. For more information, see Custom classification in the *Amazon Comprehend Developer Guide*.
 *
 * - Prompt safety classifier - Amazon Comprehend provides a pre-trained model for classifying
 * input prompts for generative AI applications.
 * For input, you provide English plain text input.
 * For prompt safety classification, the response includes only the `Classes` field.
 * For more information about prompt safety classifiers, see Prompt safety classification in the *Amazon Comprehend Developer Guide*.
 *
 * If the system detects errors while processing a page in the input document,
 * the API response includes an `Errors` field that describes the errors.
 *
 * If the system detects a document-level error in your input document, the API returns an
 * `InvalidRequestException` error response.
 * For details about this exception, see
 *
 * Errors in semi-structured documents in the Comprehend Developer Guide.
 */
export const classifyDocument: API.OperationMethod<
  ClassifyDocumentRequest,
  ClassifyDocumentResponse,
  ClassifyDocumentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ClassifyDocumentRequest,
  output: ClassifyDocumentResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceUnavailableException,
    TextSizeLimitExceededException,
  ],
}));
export type ContainsPiiEntitiesError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Analyzes input text for the presence of personally identifiable information (PII) and
 * returns the labels of identified PII entity types such as name, address, bank account number,
 * or phone number.
 */
export const containsPiiEntities: API.OperationMethod<
  ContainsPiiEntitiesRequest,
  ContainsPiiEntitiesResponse,
  ContainsPiiEntitiesError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ContainsPiiEntitiesRequest,
  output: ContainsPiiEntitiesResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type CreateDatasetError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a dataset to upload training or test data for a model associated with a flywheel.
 * For more information about datasets, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDatasetRequest,
  output: CreateDatasetResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type CreateDocumentClassifierError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceLimitExceededException
  | TooManyRequestsException
  | TooManyTagsException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Creates a new document classifier that you can use to categorize documents. To create a
 * classifier, you provide a set of training documents that are labeled with the categories that you
 * want to use. For more information, see
 * Training classifier models
 * in the Comprehend Developer Guide.
 */
export const createDocumentClassifier: API.OperationMethod<
  CreateDocumentClassifierRequest,
  CreateDocumentClassifierResponse,
  CreateDocumentClassifierError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDocumentClassifierRequest,
  output: CreateDocumentClassifierResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceLimitExceededException,
    TooManyRequestsException,
    TooManyTagsException,
    UnsupportedLanguageException,
  ],
}));
export type CreateEndpointError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a model-specific endpoint for synchronous inference for a previously trained
 * custom model
 * For information about endpoints, see Managing endpoints.
 */
export const createEndpoint: API.OperationMethod<
  CreateEndpointRequest,
  CreateEndpointResponse,
  CreateEndpointError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateEndpointRequest,
  output: CreateEndpointResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type CreateEntityRecognizerError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceLimitExceededException
  | TooManyRequestsException
  | TooManyTagsException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Creates an entity recognizer using submitted files. After your
 * `CreateEntityRecognizer` request is submitted, you can check job status using the
 * `DescribeEntityRecognizer` API.
 */
export const createEntityRecognizer: API.OperationMethod<
  CreateEntityRecognizerRequest,
  CreateEntityRecognizerResponse,
  CreateEntityRecognizerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateEntityRecognizerRequest,
  output: CreateEntityRecognizerResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceLimitExceededException,
    TooManyRequestsException,
    TooManyTagsException,
    UnsupportedLanguageException,
  ],
}));
export type CreateFlywheelError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * A flywheel is an Amazon Web Services resource that orchestrates the ongoing training of a model for custom classification
 * or custom entity recognition. You can create a flywheel to start with an existing trained model, or
 * Comprehend can create and train a new model.
 *
 * When you create the flywheel, Comprehend creates a data lake in your account. The data lake holds the training
 * data and test data for all versions of the model.
 *
 * To use a flywheel with an existing trained model, you specify the active model version. Comprehend copies the model's
 * training data and test data into the flywheel's data lake.
 *
 * To use the flywheel with a new model, you need to provide a dataset for training data (and optional test data)
 * when you create the flywheel.
 *
 * For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const createFlywheel: API.OperationMethod<
  CreateFlywheelRequest,
  CreateFlywheelResponse,
  CreateFlywheelError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFlywheelRequest,
  output: CreateFlywheelResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
    UnsupportedLanguageException,
  ],
}));
export type DeleteDocumentClassifierError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a previously created document classifier
 *
 * Only those classifiers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
 * If an active inference job is using the model, a `ResourceInUseException` will be
 * returned.
 *
 * This is an asynchronous action that puts the classifier into a DELETING state, and it is
 * then removed by a background job. Once removed, the classifier disappears from your account
 * and is no longer available for use.
 */
export const deleteDocumentClassifier: API.OperationMethod<
  DeleteDocumentClassifierRequest,
  DeleteDocumentClassifierResponse,
  DeleteDocumentClassifierError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDocumentClassifierRequest,
  output: DeleteDocumentClassifierResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
  ],
}));
export type DeleteEndpointError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a model-specific endpoint for a previously-trained custom model. All endpoints
 * must be deleted in order for the model to be deleted.
 * For information about endpoints, see Managing endpoints.
 */
export const deleteEndpoint: API.OperationMethod<
  DeleteEndpointRequest,
  DeleteEndpointResponse,
  DeleteEndpointError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteEndpointRequest,
  output: DeleteEndpointResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DeleteEntityRecognizerError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an entity recognizer.
 *
 * Only those recognizers that are in terminated states (IN_ERROR, TRAINED) will be deleted.
 * If an active inference job is using the model, a `ResourceInUseException` will be
 * returned.
 *
 * This is an asynchronous action that puts the recognizer into a DELETING state, and it is
 * then removed by a background job. Once removed, the recognizer disappears from your account
 * and is no longer available for use.
 */
export const deleteEntityRecognizer: API.OperationMethod<
  DeleteEntityRecognizerRequest,
  DeleteEntityRecognizerResponse,
  DeleteEntityRecognizerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteEntityRecognizerRequest,
  output: DeleteEntityRecognizerResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
  ],
}));
export type DeleteFlywheelError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a flywheel. When you delete the flywheel, Amazon Comprehend
 * does not delete the data lake or the model associated with the flywheel.
 *
 * For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const deleteFlywheel: API.OperationMethod<
  DeleteFlywheelRequest,
  DeleteFlywheelResponse,
  DeleteFlywheelError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFlywheelRequest,
  output: DeleteFlywheelResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
  ],
}));
export type DeleteResourcePolicyError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a resource-based policy that is attached to a custom model.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
}));
export type DescribeDatasetError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about the dataset that you specify.
 * For more information about datasets, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeDatasetRequest,
  output: DescribeDatasetResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeDocumentClassificationJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a document classification job. Use this operation to
 * get the status of a classification job.
 */
export const describeDocumentClassificationJob: API.OperationMethod<
  DescribeDocumentClassificationJobRequest,
  DescribeDocumentClassificationJobResponse,
  DescribeDocumentClassificationJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeDocumentClassificationJobRequest,
  output: DescribeDocumentClassificationJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeDocumentClassifierError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a document classifier.
 */
export const describeDocumentClassifier: API.OperationMethod<
  DescribeDocumentClassifierRequest,
  DescribeDocumentClassifierResponse,
  DescribeDocumentClassifierError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeDocumentClassifierRequest,
  output: DescribeDocumentClassifierResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeDominantLanguageDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a dominant language detection job. Use this operation
 * to get the status of a detection job.
 */
export const describeDominantLanguageDetectionJob: API.OperationMethod<
  DescribeDominantLanguageDetectionJobRequest,
  DescribeDominantLanguageDetectionJobResponse,
  DescribeDominantLanguageDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeDominantLanguageDetectionJobRequest,
  output: DescribeDominantLanguageDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeEndpointError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a specific endpoint. Use this operation to get the
 * status of an endpoint.
 * For information about endpoints, see Managing endpoints.
 */
export const describeEndpoint: API.OperationMethod<
  DescribeEndpointRequest,
  DescribeEndpointResponse,
  DescribeEndpointError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeEndpointRequest,
  output: DescribeEndpointResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with an entities detection job. Use this operation to get
 * the status of a detection job.
 */
export const describeEntitiesDetectionJob: API.OperationMethod<
  DescribeEntitiesDetectionJobRequest,
  DescribeEntitiesDetectionJobResponse,
  DescribeEntitiesDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeEntitiesDetectionJobRequest,
  output: DescribeEntitiesDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeEntityRecognizerError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides details about an entity recognizer including status, S3 buckets containing
 * training data, recognizer metadata, metrics, and so on.
 */
export const describeEntityRecognizer: API.OperationMethod<
  DescribeEntityRecognizerRequest,
  DescribeEntityRecognizerResponse,
  DescribeEntityRecognizerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeEntityRecognizerRequest,
  output: DescribeEntityRecognizerResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeEventsDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the status and details of an events detection job.
 */
export const describeEventsDetectionJob: API.OperationMethod<
  DescribeEventsDetectionJobRequest,
  DescribeEventsDetectionJobResponse,
  DescribeEventsDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeEventsDetectionJobRequest,
  output: DescribeEventsDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeFlywheelError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides configuration information about the flywheel. For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const describeFlywheel: API.OperationMethod<
  DescribeFlywheelRequest,
  DescribeFlywheelResponse,
  DescribeFlywheelError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeFlywheelRequest,
  output: DescribeFlywheelResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeFlywheelIterationError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the configuration properties of a flywheel iteration.
 * For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const describeFlywheelIteration: API.OperationMethod<
  DescribeFlywheelIterationRequest,
  DescribeFlywheelIterationResponse,
  DescribeFlywheelIterationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeFlywheelIterationRequest,
  output: DescribeFlywheelIterationResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeKeyPhrasesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a key phrases detection job. Use this operation to get
 * the status of a detection job.
 */
export const describeKeyPhrasesDetectionJob: API.OperationMethod<
  DescribeKeyPhrasesDetectionJobRequest,
  DescribeKeyPhrasesDetectionJobResponse,
  DescribeKeyPhrasesDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeKeyPhrasesDetectionJobRequest,
  output: DescribeKeyPhrasesDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribePiiEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a PII entities detection job. For example, you can use
 * this operation to get the job status.
 */
export const describePiiEntitiesDetectionJob: API.OperationMethod<
  DescribePiiEntitiesDetectionJobRequest,
  DescribePiiEntitiesDetectionJobResponse,
  DescribePiiEntitiesDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribePiiEntitiesDetectionJobRequest,
  output: DescribePiiEntitiesDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeResourcePolicyError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the details of a resource-based policy that is attached to a custom model, including
 * the JSON body of the policy.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeResourcePolicyRequest,
  output: DescribeResourcePolicyResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
}));
export type DescribeSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a sentiment detection job. Use this operation to get
 * the status of a detection job.
 */
export const describeSentimentDetectionJob: API.OperationMethod<
  DescribeSentimentDetectionJobRequest,
  DescribeSentimentDetectionJobResponse,
  DescribeSentimentDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeSentimentDetectionJobRequest,
  output: DescribeSentimentDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeTargetedSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a targeted sentiment detection job. Use this operation
 * to get the status of the job.
 */
export const describeTargetedSentimentDetectionJob: API.OperationMethod<
  DescribeTargetedSentimentDetectionJobRequest,
  DescribeTargetedSentimentDetectionJobResponse,
  DescribeTargetedSentimentDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeTargetedSentimentDetectionJobRequest,
  output: DescribeTargetedSentimentDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DescribeTopicsDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with a topic detection job. Use this operation to get
 * the status of a detection job.
 */
export const describeTopicsDetectionJob: API.OperationMethod<
  DescribeTopicsDetectionJobRequest,
  DescribeTopicsDetectionJobResponse,
  DescribeTopicsDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeTopicsDetectionJobRequest,
  output: DescribeTopicsDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
    TooManyRequestsException,
  ],
}));
export type DetectDominantLanguageError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | CommonErrors;
/**
 * Determines the dominant language of the input text. For a list of languages that Amazon
 * Comprehend can detect, see Amazon Comprehend Supported Languages.
 */
export const detectDominantLanguage: API.OperationMethod<
  DetectDominantLanguageRequest,
  DetectDominantLanguageResponse,
  DetectDominantLanguageError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetectDominantLanguageRequest,
  output: DetectDominantLanguageResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
  ],
}));
export type DetectEntitiesError =
  | InternalServerException
  | InvalidRequestException
  | ResourceUnavailableException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Detects named entities in input text when you use the pre-trained model.
 * Detects custom entities if you have a custom entity recognition model.
 *
 * When detecting named entities using the pre-trained model, use plain text as the input.
 * For more information about named entities, see
 * Entities in the Comprehend Developer Guide.
 *
 * When you use a custom entity recognition model,
 * you can input plain text or you can upload a single-page input document (text, PDF, Word, or image).
 *
 * If the system detects errors while processing a page in the input document, the API response
 * includes an entry in `Errors` for each error.
 *
 * If the system detects a document-level error in your input document, the API returns an
 * `InvalidRequestException` error response.
 * For details about this exception, see
 *
 * Errors in semi-structured documents in the Comprehend Developer Guide.
 */
export const detectEntities: API.OperationMethod<
  DetectEntitiesRequest,
  DetectEntitiesResponse,
  DetectEntitiesError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetectEntitiesRequest,
  output: DetectEntitiesResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceUnavailableException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type DetectKeyPhrasesError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Detects the key noun phrases found in the text.
 */
export const detectKeyPhrases: API.OperationMethod<
  DetectKeyPhrasesRequest,
  DetectKeyPhrasesResponse,
  DetectKeyPhrasesError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetectKeyPhrasesRequest,
  output: DetectKeyPhrasesResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type DetectPiiEntitiesError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects the input text for entities that contain personally identifiable information
 * (PII) and returns information about them.
 */
export const detectPiiEntities: API.OperationMethod<
  DetectPiiEntitiesRequest,
  DetectPiiEntitiesResponse,
  DetectPiiEntitiesError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetectPiiEntitiesRequest,
  output: DetectPiiEntitiesResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type DetectSentimentError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects text and returns an inference of the prevailing sentiment
 * (`POSITIVE`, `NEUTRAL`, `MIXED`, or `NEGATIVE`).
 */
export const detectSentiment: API.OperationMethod<
  DetectSentimentRequest,
  DetectSentimentResponse,
  DetectSentimentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetectSentimentRequest,
  output: DetectSentimentResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type DetectSyntaxError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects text for syntax and the part of speech of words in the document. For more
 * information, see
 * Syntax in the Comprehend Developer Guide.
 */
export const detectSyntax: API.OperationMethod<
  DetectSyntaxRequest,
  DetectSyntaxResponse,
  DetectSyntaxError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetectSyntaxRequest,
  output: DetectSyntaxResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type DetectTargetedSentimentError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Inspects the input text and returns a sentiment analysis for each entity identified in the text.
 *
 * For more information about targeted sentiment, see Targeted sentiment in the *Amazon Comprehend Developer Guide*.
 */
export const detectTargetedSentiment: API.OperationMethod<
  DetectTargetedSentimentRequest,
  DetectTargetedSentimentResponse,
  DetectTargetedSentimentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetectTargetedSentimentRequest,
  output: DetectTargetedSentimentResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type DetectToxicContentError =
  | InternalServerException
  | InvalidRequestException
  | TextSizeLimitExceededException
  | UnsupportedLanguageException
  | CommonErrors;
/**
 * Performs toxicity analysis on the list of text strings that you provide as input.
 * The API response contains a results list that matches the size of the input list.
 * For more information about toxicity detection, see Toxicity detection in the *Amazon Comprehend Developer Guide*.
 */
export const detectToxicContent: API.OperationMethod<
  DetectToxicContentRequest,
  DetectToxicContentResponse,
  DetectToxicContentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetectToxicContentRequest,
  output: DetectToxicContentResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TextSizeLimitExceededException,
    UnsupportedLanguageException,
  ],
}));
export type ImportModelError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a new custom model that replicates a source custom model that you import. The
 * source model can be in your Amazon Web Services account or another one.
 *
 * If the source model is in another Amazon Web Services account, then it must have a resource-based policy
 * that authorizes you to import it.
 *
 * The source model must be in the same Amazon Web Services Region that you're using when you import. You
 * can't import a model that's in a different Region.
 */
export const importModel: API.OperationMethod<
  ImportModelRequest,
  ImportModelResponse,
  ImportModelError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportModelRequest,
  output: ImportModelResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type ListDatasetsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the datasets that you have configured in this Region. For more information about datasets, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const listDatasets: API.OperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDatasetsRequest,
  ) => stream.Stream<
    ListDatasetsResponse,
    ListDatasetsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDatasetsRequest,
  ) => stream.Stream<
    unknown,
    ListDatasetsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetsRequest,
  output: ListDatasetsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListDocumentClassificationJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the documentation classification jobs that you have submitted.
 */
export const listDocumentClassificationJobs: API.OperationMethod<
  ListDocumentClassificationJobsRequest,
  ListDocumentClassificationJobsResponse,
  ListDocumentClassificationJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDocumentClassificationJobsRequest,
  ) => stream.Stream<
    ListDocumentClassificationJobsResponse,
    ListDocumentClassificationJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDocumentClassificationJobsRequest,
  ) => stream.Stream<
    unknown,
    ListDocumentClassificationJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDocumentClassificationJobsRequest,
  output: ListDocumentClassificationJobsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListDocumentClassifiersError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the document classifiers that you have created.
 */
export const listDocumentClassifiers: API.OperationMethod<
  ListDocumentClassifiersRequest,
  ListDocumentClassifiersResponse,
  ListDocumentClassifiersError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDocumentClassifiersRequest,
  ) => stream.Stream<
    ListDocumentClassifiersResponse,
    ListDocumentClassifiersError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDocumentClassifiersRequest,
  ) => stream.Stream<
    unknown,
    ListDocumentClassifiersError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDocumentClassifiersRequest,
  output: ListDocumentClassifiersResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListDocumentClassifierSummariesError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of summaries of the document classifiers that you have created
 */
export const listDocumentClassifierSummaries: API.OperationMethod<
  ListDocumentClassifierSummariesRequest,
  ListDocumentClassifierSummariesResponse,
  ListDocumentClassifierSummariesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDocumentClassifierSummariesRequest,
  ) => stream.Stream<
    ListDocumentClassifierSummariesResponse,
    ListDocumentClassifierSummariesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDocumentClassifierSummariesRequest,
  ) => stream.Stream<
    unknown,
    ListDocumentClassifierSummariesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDocumentClassifierSummariesRequest,
  output: ListDocumentClassifierSummariesResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListDominantLanguageDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the dominant language detection jobs that you have submitted.
 */
export const listDominantLanguageDetectionJobs: API.OperationMethod<
  ListDominantLanguageDetectionJobsRequest,
  ListDominantLanguageDetectionJobsResponse,
  ListDominantLanguageDetectionJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDominantLanguageDetectionJobsRequest,
  ) => stream.Stream<
    ListDominantLanguageDetectionJobsResponse,
    ListDominantLanguageDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDominantLanguageDetectionJobsRequest,
  ) => stream.Stream<
    unknown,
    ListDominantLanguageDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDominantLanguageDetectionJobsRequest,
  output: ListDominantLanguageDetectionJobsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListEndpointsError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of all existing endpoints that you've created.
 * For information about endpoints, see Managing endpoints.
 */
export const listEndpoints: API.OperationMethod<
  ListEndpointsRequest,
  ListEndpointsResponse,
  ListEndpointsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListEndpointsRequest,
  ) => stream.Stream<
    ListEndpointsResponse,
    ListEndpointsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEndpointsRequest,
  ) => stream.Stream<
    EndpointProperties,
    ListEndpointsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEndpointsRequest,
  output: ListEndpointsResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EndpointPropertiesList",
    pageSize: "MaxResults",
  } as const,
}));
export type ListEntitiesDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the entity detection jobs that you have submitted.
 */
export const listEntitiesDetectionJobs: API.OperationMethod<
  ListEntitiesDetectionJobsRequest,
  ListEntitiesDetectionJobsResponse,
  ListEntitiesDetectionJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListEntitiesDetectionJobsRequest,
  ) => stream.Stream<
    ListEntitiesDetectionJobsResponse,
    ListEntitiesDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEntitiesDetectionJobsRequest,
  ) => stream.Stream<
    unknown,
    ListEntitiesDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEntitiesDetectionJobsRequest,
  output: ListEntitiesDetectionJobsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListEntityRecognizersError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the properties of all entity recognizers that you created, including
 * recognizers currently in training. Allows you to filter the list of recognizers based on
 * criteria such as status and submission time. This call returns up to 500 entity recognizers in
 * the list, with a default number of 100 recognizers in the list.
 *
 * The results of this list are not in any particular order. Please get the list and sort
 * locally if needed.
 */
export const listEntityRecognizers: API.OperationMethod<
  ListEntityRecognizersRequest,
  ListEntityRecognizersResponse,
  ListEntityRecognizersError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListEntityRecognizersRequest,
  ) => stream.Stream<
    ListEntityRecognizersResponse,
    ListEntityRecognizersError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEntityRecognizersRequest,
  ) => stream.Stream<
    unknown,
    ListEntityRecognizersError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEntityRecognizersRequest,
  output: ListEntityRecognizersResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListEntityRecognizerSummariesError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of summaries for the entity recognizers that you have created.
 */
export const listEntityRecognizerSummaries: API.OperationMethod<
  ListEntityRecognizerSummariesRequest,
  ListEntityRecognizerSummariesResponse,
  ListEntityRecognizerSummariesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListEntityRecognizerSummariesRequest,
  ) => stream.Stream<
    ListEntityRecognizerSummariesResponse,
    ListEntityRecognizerSummariesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEntityRecognizerSummariesRequest,
  ) => stream.Stream<
    unknown,
    ListEntityRecognizerSummariesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEntityRecognizerSummariesRequest,
  output: ListEntityRecognizerSummariesResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListEventsDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the events detection jobs that you have submitted.
 */
export const listEventsDetectionJobs: API.OperationMethod<
  ListEventsDetectionJobsRequest,
  ListEventsDetectionJobsResponse,
  ListEventsDetectionJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListEventsDetectionJobsRequest,
  ) => stream.Stream<
    ListEventsDetectionJobsResponse,
    ListEventsDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEventsDetectionJobsRequest,
  ) => stream.Stream<
    unknown,
    ListEventsDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEventsDetectionJobsRequest,
  output: ListEventsDetectionJobsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListFlywheelIterationHistoryError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Information about the history of a flywheel iteration.
 * For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const listFlywheelIterationHistory: API.OperationMethod<
  ListFlywheelIterationHistoryRequest,
  ListFlywheelIterationHistoryResponse,
  ListFlywheelIterationHistoryError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFlywheelIterationHistoryRequest,
  ) => stream.Stream<
    ListFlywheelIterationHistoryResponse,
    ListFlywheelIterationHistoryError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFlywheelIterationHistoryRequest,
  ) => stream.Stream<
    unknown,
    ListFlywheelIterationHistoryError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFlywheelIterationHistoryRequest,
  output: ListFlywheelIterationHistoryResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListFlywheelsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the flywheels that you have created.
 */
export const listFlywheels: API.OperationMethod<
  ListFlywheelsRequest,
  ListFlywheelsResponse,
  ListFlywheelsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFlywheelsRequest,
  ) => stream.Stream<
    ListFlywheelsResponse,
    ListFlywheelsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFlywheelsRequest,
  ) => stream.Stream<
    unknown,
    ListFlywheelsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFlywheelsRequest,
  output: ListFlywheelsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListKeyPhrasesDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get a list of key phrase detection jobs that you have submitted.
 */
export const listKeyPhrasesDetectionJobs: API.OperationMethod<
  ListKeyPhrasesDetectionJobsRequest,
  ListKeyPhrasesDetectionJobsResponse,
  ListKeyPhrasesDetectionJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListKeyPhrasesDetectionJobsRequest,
  ) => stream.Stream<
    ListKeyPhrasesDetectionJobsResponse,
    ListKeyPhrasesDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListKeyPhrasesDetectionJobsRequest,
  ) => stream.Stream<
    unknown,
    ListKeyPhrasesDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListKeyPhrasesDetectionJobsRequest,
  output: ListKeyPhrasesDetectionJobsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListPiiEntitiesDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the PII entity detection jobs that you have submitted.
 */
export const listPiiEntitiesDetectionJobs: API.OperationMethod<
  ListPiiEntitiesDetectionJobsRequest,
  ListPiiEntitiesDetectionJobsResponse,
  ListPiiEntitiesDetectionJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPiiEntitiesDetectionJobsRequest,
  ) => stream.Stream<
    ListPiiEntitiesDetectionJobsResponse,
    ListPiiEntitiesDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPiiEntitiesDetectionJobsRequest,
  ) => stream.Stream<
    PiiEntitiesDetectionJobProperties,
    ListPiiEntitiesDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPiiEntitiesDetectionJobsRequest,
  output: ListPiiEntitiesDetectionJobsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PiiEntitiesDetectionJobPropertiesList",
    pageSize: "MaxResults",
  } as const,
}));
export type ListSentimentDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of sentiment detection jobs that you have submitted.
 */
export const listSentimentDetectionJobs: API.OperationMethod<
  ListSentimentDetectionJobsRequest,
  ListSentimentDetectionJobsResponse,
  ListSentimentDetectionJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListSentimentDetectionJobsRequest,
  ) => stream.Stream<
    ListSentimentDetectionJobsResponse,
    ListSentimentDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSentimentDetectionJobsRequest,
  ) => stream.Stream<
    unknown,
    ListSentimentDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSentimentDetectionJobsRequest,
  output: ListSentimentDetectionJobsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListTagsForResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all tags associated with a given Amazon Comprehend resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
}));
export type ListTargetedSentimentDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of targeted sentiment detection jobs that you have submitted.
 */
export const listTargetedSentimentDetectionJobs: API.OperationMethod<
  ListTargetedSentimentDetectionJobsRequest,
  ListTargetedSentimentDetectionJobsResponse,
  ListTargetedSentimentDetectionJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTargetedSentimentDetectionJobsRequest,
  ) => stream.Stream<
    ListTargetedSentimentDetectionJobsResponse,
    ListTargetedSentimentDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTargetedSentimentDetectionJobsRequest,
  ) => stream.Stream<
    unknown,
    ListTargetedSentimentDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTargetedSentimentDetectionJobsRequest,
  output: ListTargetedSentimentDetectionJobsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type ListTopicsDetectionJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the topic detection jobs that you have submitted.
 */
export const listTopicsDetectionJobs: API.OperationMethod<
  ListTopicsDetectionJobsRequest,
  ListTopicsDetectionJobsResponse,
  ListTopicsDetectionJobsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTopicsDetectionJobsRequest,
  ) => stream.Stream<
    ListTopicsDetectionJobsResponse,
    ListTopicsDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTopicsDetectionJobsRequest,
  ) => stream.Stream<
    unknown,
    ListTopicsDetectionJobsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTopicsDetectionJobsRequest,
  output: ListTopicsDetectionJobsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
export type PutResourcePolicyError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Attaches a resource-based policy to a custom model. You can use this policy to authorize
 * an entity in another Amazon Web Services account to import the custom model, which replicates it in Amazon
 * Comprehend in their account.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
}));
export type StartDocumentClassificationJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous document classification job using a custom classification model. Use the
 * `DescribeDocumentClassificationJob`
 * operation to track the progress of the job.
 */
export const startDocumentClassificationJob: API.OperationMethod<
  StartDocumentClassificationJobRequest,
  StartDocumentClassificationJobResponse,
  StartDocumentClassificationJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartDocumentClassificationJobRequest,
  output: StartDocumentClassificationJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type StartDominantLanguageDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous dominant language detection job for a collection of documents. Use
 * the operation to track the status
 * of a job.
 */
export const startDominantLanguageDetectionJob: API.OperationMethod<
  StartDominantLanguageDetectionJobRequest,
  StartDominantLanguageDetectionJobResponse,
  StartDominantLanguageDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartDominantLanguageDetectionJobRequest,
  output: StartDominantLanguageDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type StartEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous entity detection job for a collection of documents. Use the operation to track the status of a job.
 *
 * This API can be used for either standard entity detection or custom entity recognition. In
 * order to be used for custom entity recognition, the optional `EntityRecognizerArn`
 * must be used in order to provide access to the recognizer being used to detect the custom
 * entity.
 */
export const startEntitiesDetectionJob: API.OperationMethod<
  StartEntitiesDetectionJobRequest,
  StartEntitiesDetectionJobResponse,
  StartEntitiesDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartEntitiesDetectionJobRequest,
  output: StartEntitiesDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type StartEventsDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous event detection job for a collection of documents.
 */
export const startEventsDetectionJob: API.OperationMethod<
  StartEventsDetectionJobRequest,
  StartEventsDetectionJobResponse,
  StartEventsDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartEventsDetectionJobRequest,
  output: StartEventsDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type StartFlywheelIterationError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Start the flywheel iteration.This operation uses any new datasets to train a new model version.
 * For more information about flywheels, see
 * Flywheel overview in the *Amazon Comprehend Developer Guide*.
 */
export const startFlywheelIteration: API.OperationMethod<
  StartFlywheelIterationRequest,
  StartFlywheelIterationResponse,
  StartFlywheelIterationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartFlywheelIterationRequest,
  output: StartFlywheelIterationResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
}));
export type StartKeyPhrasesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous key phrase detection job for a collection of documents. Use the
 * operation to track the status of a
 * job.
 */
export const startKeyPhrasesDetectionJob: API.OperationMethod<
  StartKeyPhrasesDetectionJobRequest,
  StartKeyPhrasesDetectionJobResponse,
  StartKeyPhrasesDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartKeyPhrasesDetectionJobRequest,
  output: StartKeyPhrasesDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type StartPiiEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous PII entity detection job for a collection of documents.
 */
export const startPiiEntitiesDetectionJob: API.OperationMethod<
  StartPiiEntitiesDetectionJobRequest,
  StartPiiEntitiesDetectionJobResponse,
  StartPiiEntitiesDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartPiiEntitiesDetectionJobRequest,
  output: StartPiiEntitiesDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type StartSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous sentiment detection job for a collection of documents. Use the
 * operation to track the status of a
 * job.
 */
export const startSentimentDetectionJob: API.OperationMethod<
  StartSentimentDetectionJobRequest,
  StartSentimentDetectionJobResponse,
  StartSentimentDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartSentimentDetectionJobRequest,
  output: StartSentimentDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type StartTargetedSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous targeted sentiment detection job for a collection of documents. Use the
 * `DescribeTargetedSentimentDetectionJob` operation to track the status of a
 * job.
 */
export const startTargetedSentimentDetectionJob: API.OperationMethod<
  StartTargetedSentimentDetectionJobRequest,
  StartTargetedSentimentDetectionJobResponse,
  StartTargetedSentimentDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartTargetedSentimentDetectionJobRequest,
  output: StartTargetedSentimentDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type StartTopicsDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceInUseException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Starts an asynchronous topic detection job. Use the
 * `DescribeTopicDetectionJob` operation to track the status of a job.
 */
export const startTopicsDetectionJob: API.OperationMethod<
  StartTopicsDetectionJobRequest,
  StartTopicsDetectionJobResponse,
  StartTopicsDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartTopicsDetectionJobRequest,
  output: StartTopicsDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceInUseException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
}));
export type StopDominantLanguageDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops a dominant language detection job in progress.
 *
 * If the job state is `IN_PROGRESS` the job is marked for termination and put
 * into the `STOP_REQUESTED` state. If the job completes before it can be stopped, it
 * is put into the `COMPLETED` state; otherwise the job is stopped and put into the
 * `STOPPED` state.
 *
 * If the job is in the `COMPLETED` or `FAILED` state when you call the
 * `StopDominantLanguageDetectionJob` operation, the operation returns a 400
 * Internal Request Exception.
 *
 * When a job is stopped, any documents already processed are written to the output
 * location.
 */
export const stopDominantLanguageDetectionJob: API.OperationMethod<
  StopDominantLanguageDetectionJobRequest,
  StopDominantLanguageDetectionJobResponse,
  StopDominantLanguageDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopDominantLanguageDetectionJobRequest,
  output: StopDominantLanguageDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
}));
export type StopEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops an entities detection job in progress.
 *
 * If the job state is `IN_PROGRESS` the job is marked for termination and put
 * into the `STOP_REQUESTED` state. If the job completes before it can be stopped, it
 * is put into the `COMPLETED` state; otherwise the job is stopped and put into the
 * `STOPPED` state.
 *
 * If the job is in the `COMPLETED` or `FAILED` state when you call the
 * `StopDominantLanguageDetectionJob` operation, the operation returns a 400
 * Internal Request Exception.
 *
 * When a job is stopped, any documents already processed are written to the output
 * location.
 */
export const stopEntitiesDetectionJob: API.OperationMethod<
  StopEntitiesDetectionJobRequest,
  StopEntitiesDetectionJobResponse,
  StopEntitiesDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopEntitiesDetectionJobRequest,
  output: StopEntitiesDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
}));
export type StopEventsDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops an events detection job in progress.
 */
export const stopEventsDetectionJob: API.OperationMethod<
  StopEventsDetectionJobRequest,
  StopEventsDetectionJobResponse,
  StopEventsDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopEventsDetectionJobRequest,
  output: StopEventsDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
}));
export type StopKeyPhrasesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops a key phrases detection job in progress.
 *
 * If the job state is `IN_PROGRESS` the job is marked for termination and put
 * into the `STOP_REQUESTED` state. If the job completes before it can be stopped, it
 * is put into the `COMPLETED` state; otherwise the job is stopped and put into the
 * `STOPPED` state.
 *
 * If the job is in the `COMPLETED` or `FAILED` state when you call the
 * `StopDominantLanguageDetectionJob` operation, the operation returns a 400
 * Internal Request Exception.
 *
 * When a job is stopped, any documents already processed are written to the output
 * location.
 */
export const stopKeyPhrasesDetectionJob: API.OperationMethod<
  StopKeyPhrasesDetectionJobRequest,
  StopKeyPhrasesDetectionJobResponse,
  StopKeyPhrasesDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopKeyPhrasesDetectionJobRequest,
  output: StopKeyPhrasesDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
}));
export type StopPiiEntitiesDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops a PII entities detection job in progress.
 */
export const stopPiiEntitiesDetectionJob: API.OperationMethod<
  StopPiiEntitiesDetectionJobRequest,
  StopPiiEntitiesDetectionJobResponse,
  StopPiiEntitiesDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopPiiEntitiesDetectionJobRequest,
  output: StopPiiEntitiesDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
}));
export type StopSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops a sentiment detection job in progress.
 *
 * If the job state is `IN_PROGRESS`, the job is marked for termination and put
 * into the `STOP_REQUESTED` state. If the job completes before it can be stopped, it
 * is put into the `COMPLETED` state; otherwise the job is be stopped and put into the
 * `STOPPED` state.
 *
 * If the job is in the `COMPLETED` or `FAILED` state when you call the
 * `StopDominantLanguageDetectionJob` operation, the operation returns a 400
 * Internal Request Exception.
 *
 * When a job is stopped, any documents already processed are written to the output
 * location.
 */
export const stopSentimentDetectionJob: API.OperationMethod<
  StopSentimentDetectionJobRequest,
  StopSentimentDetectionJobResponse,
  StopSentimentDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopSentimentDetectionJobRequest,
  output: StopSentimentDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
}));
export type StopTargetedSentimentDetectionJobError =
  | InternalServerException
  | InvalidRequestException
  | JobNotFoundException
  | CommonErrors;
/**
 * Stops a targeted sentiment detection job in progress.
 *
 * If the job state is `IN_PROGRESS`, the job is marked for termination and put
 * into the `STOP_REQUESTED` state. If the job completes before it can be stopped, it
 * is put into the `COMPLETED` state; otherwise the job is be stopped and put into the
 * `STOPPED` state.
 *
 * If the job is in the `COMPLETED` or `FAILED` state when you call the
 * `StopDominantLanguageDetectionJob` operation, the operation returns a 400
 * Internal Request Exception.
 *
 * When a job is stopped, any documents already processed are written to the output
 * location.
 */
export const stopTargetedSentimentDetectionJob: API.OperationMethod<
  StopTargetedSentimentDetectionJobRequest,
  StopTargetedSentimentDetectionJobResponse,
  StopTargetedSentimentDetectionJobError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopTargetedSentimentDetectionJobRequest,
  output: StopTargetedSentimentDetectionJobResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    JobNotFoundException,
  ],
}));
export type StopTrainingDocumentClassifierError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a document classifier training job while in progress.
 *
 * If the training job state is `TRAINING`, the job is marked for termination and
 * put into the `STOP_REQUESTED` state. If the training job completes before it can be
 * stopped, it is put into the `TRAINED`; otherwise the training job is stopped and
 * put into the `STOPPED` state and the service sends back an HTTP 200 response with
 * an empty HTTP body.
 */
export const stopTrainingDocumentClassifier: API.OperationMethod<
  StopTrainingDocumentClassifierRequest,
  StopTrainingDocumentClassifierResponse,
  StopTrainingDocumentClassifierError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopTrainingDocumentClassifierRequest,
  output: StopTrainingDocumentClassifierResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
}));
export type StopTrainingEntityRecognizerError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops an entity recognizer training job while in progress.
 *
 * If the training job state is `TRAINING`, the job is marked for termination and
 * put into the `STOP_REQUESTED` state. If the training job completes before it can be
 * stopped, it is put into the `TRAINED`; otherwise the training job is stopped and
 * putted into the `STOPPED` state and the service sends back an HTTP 200 response
 * with an empty HTTP body.
 */
export const stopTrainingEntityRecognizer: API.OperationMethod<
  StopTrainingEntityRecognizerRequest,
  StopTrainingEntityRecognizerResponse,
  StopTrainingEntityRecognizerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopTrainingEntityRecognizerRequest,
  output: StopTrainingEntityRecognizerResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
}));
export type TagResourceError =
  | ConcurrentModificationException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Associates a specific tag with an Amazon Comprehend resource. A tag is a key-value pair
 * that adds as a metadata to a resource used by Amazon Comprehend. For example, a tag with
 * "Sales" as the key might be added to a resource to indicate its use by the sales department.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    ConcurrentModificationException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
}));
export type UntagResourceError =
  | ConcurrentModificationException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyTagKeysException
  | CommonErrors;
/**
 * Removes a specific tag associated with an Amazon Comprehend resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    ConcurrentModificationException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyTagKeysException,
  ],
}));
export type UpdateEndpointError =
  | InternalServerException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates information about the specified endpoint.
 * For information about endpoints, see Managing endpoints.
 */
export const updateEndpoint: API.OperationMethod<
  UpdateEndpointRequest,
  UpdateEndpointResponse,
  UpdateEndpointError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateEndpointRequest,
  output: UpdateEndpointResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
  ],
}));
export type UpdateFlywheelError =
  | InternalServerException
  | InvalidRequestException
  | KmsKeyValidationException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update the configuration information for an existing flywheel.
 */
export const updateFlywheel: API.OperationMethod<
  UpdateFlywheelRequest,
  UpdateFlywheelResponse,
  UpdateFlywheelError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFlywheelRequest,
  output: UpdateFlywheelResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    KmsKeyValidationException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
}));
