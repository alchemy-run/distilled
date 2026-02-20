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
const ns = T.XmlNamespace("http://cloudsearch.amazonaws.com/doc/2013-01-01/");
const svc = T.AwsApiService({
  sdkId: "CloudSearch",
  serviceShapeName: "A9SearchCloudConfigService2013",
});
const auth = T.AwsAuthSigv4({ name: "cloudsearch" });
const ver = T.ServiceVersion("2013-01-01");
const proto = T.AwsProtocolsAwsQuery();
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
              `https://cloudsearch-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cloudsearch-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudsearch.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cloudsearch.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type DomainName = string;
export type FieldName = string;
export type ErrorCode = string;
export type ErrorMessage = string;
export type DomainId = string;
export type ARN = string;
export type ServiceUrl = string;
export type SearchInstanceType = string;
export type PartitionCount = number;
export type InstanceCount = number;
export type MaximumReplicationCount = number;
export type MaximumPartitionCount = number;
export type StandardName = string;
export type UpdateTimestamp = Date;
export type UIntValue = number;
export type ExpressionValue = string;
export type DynamicFieldName = string;
export type FieldValue = string;
export type Word = string;
export type FieldNameCommaList = string;
export type MultiAZ = boolean;
export type PolicyDocument = string;
export type APIVersion = string;

//# Schemas
export interface BuildSuggestersRequest {
  DomainName: string;
}
export const BuildSuggestersRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BuildSuggestersRequest",
}) as any as S.Schema<BuildSuggestersRequest>;
export type FieldNameList = string[];
export const FieldNameList = S.Array(S.String);
export interface BuildSuggestersResponse {
  FieldNames?: string[];
}
export const BuildSuggestersResponse = S.suspend(() =>
  S.Struct({ FieldNames: S.optional(FieldNameList) }).pipe(ns),
).annotate({
  identifier: "BuildSuggestersResponse",
}) as any as S.Schema<BuildSuggestersResponse>;
export interface CreateDomainRequest {
  DomainName: string;
}
export const CreateDomainRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainRequest",
}) as any as S.Schema<CreateDomainRequest>;
export interface ServiceEndpoint {
  Endpoint?: string;
}
export const ServiceEndpoint = S.suspend(() =>
  S.Struct({ Endpoint: S.optional(S.String) }),
).annotate({
  identifier: "ServiceEndpoint",
}) as any as S.Schema<ServiceEndpoint>;
export interface Limits {
  MaximumReplicationCount: number;
  MaximumPartitionCount: number;
}
export const Limits = S.suspend(() =>
  S.Struct({
    MaximumReplicationCount: S.Number,
    MaximumPartitionCount: S.Number,
  }),
).annotate({ identifier: "Limits" }) as any as S.Schema<Limits>;
export interface DomainStatus {
  DomainId: string;
  DomainName: string;
  ARN?: string;
  Created?: boolean;
  Deleted?: boolean;
  DocService?: ServiceEndpoint;
  SearchService?: ServiceEndpoint;
  RequiresIndexDocuments: boolean;
  Processing?: boolean;
  SearchInstanceType?: string;
  SearchPartitionCount?: number;
  SearchInstanceCount?: number;
  Limits?: Limits;
}
export const DomainStatus = S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    DomainName: S.String,
    ARN: S.optional(S.String),
    Created: S.optional(S.Boolean),
    Deleted: S.optional(S.Boolean),
    DocService: S.optional(ServiceEndpoint),
    SearchService: S.optional(ServiceEndpoint),
    RequiresIndexDocuments: S.Boolean,
    Processing: S.optional(S.Boolean),
    SearchInstanceType: S.optional(S.String),
    SearchPartitionCount: S.optional(S.Number),
    SearchInstanceCount: S.optional(S.Number),
    Limits: S.optional(Limits),
  }),
).annotate({ identifier: "DomainStatus" }) as any as S.Schema<DomainStatus>;
export interface CreateDomainResponse {
  DomainStatus?: DomainStatus;
}
export const CreateDomainResponse = S.suspend(() =>
  S.Struct({ DomainStatus: S.optional(DomainStatus) }).pipe(ns),
).annotate({
  identifier: "CreateDomainResponse",
}) as any as S.Schema<CreateDomainResponse>;
export type AnalysisSchemeLanguage =
  | "ar"
  | "bg"
  | "ca"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "en"
  | "es"
  | "eu"
  | "fa"
  | "fi"
  | "fr"
  | "ga"
  | "gl"
  | "he"
  | "hi"
  | "hu"
  | "hy"
  | "id"
  | "it"
  | "ja"
  | "ko"
  | "lv"
  | "mul"
  | "nl"
  | "no"
  | "pt"
  | "ro"
  | "ru"
  | "sv"
  | "th"
  | "tr"
  | "zh-Hans"
  | "zh-Hant"
  | (string & {});
export const AnalysisSchemeLanguage = S.String;
export type AlgorithmicStemming =
  | "none"
  | "minimal"
  | "light"
  | "full"
  | (string & {});
export const AlgorithmicStemming = S.String;
export interface AnalysisOptions {
  Synonyms?: string;
  Stopwords?: string;
  StemmingDictionary?: string;
  JapaneseTokenizationDictionary?: string;
  AlgorithmicStemming?: AlgorithmicStemming;
}
export const AnalysisOptions = S.suspend(() =>
  S.Struct({
    Synonyms: S.optional(S.String),
    Stopwords: S.optional(S.String),
    StemmingDictionary: S.optional(S.String),
    JapaneseTokenizationDictionary: S.optional(S.String),
    AlgorithmicStemming: S.optional(AlgorithmicStemming),
  }),
).annotate({
  identifier: "AnalysisOptions",
}) as any as S.Schema<AnalysisOptions>;
export interface AnalysisScheme {
  AnalysisSchemeName: string;
  AnalysisSchemeLanguage: AnalysisSchemeLanguage;
  AnalysisOptions?: AnalysisOptions;
}
export const AnalysisScheme = S.suspend(() =>
  S.Struct({
    AnalysisSchemeName: S.String,
    AnalysisSchemeLanguage: AnalysisSchemeLanguage,
    AnalysisOptions: S.optional(AnalysisOptions),
  }),
).annotate({ identifier: "AnalysisScheme" }) as any as S.Schema<AnalysisScheme>;
export interface DefineAnalysisSchemeRequest {
  DomainName: string;
  AnalysisScheme: AnalysisScheme;
}
export const DefineAnalysisSchemeRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, AnalysisScheme: AnalysisScheme }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DefineAnalysisSchemeRequest",
}) as any as S.Schema<DefineAnalysisSchemeRequest>;
export type OptionState =
  | "RequiresIndexDocuments"
  | "Processing"
  | "Active"
  | "FailedToValidate"
  | (string & {});
export const OptionState = S.String;
export interface OptionStatus {
  CreationDate: Date;
  UpdateDate: Date;
  UpdateVersion?: number;
  State: OptionState;
  PendingDeletion?: boolean;
}
export const OptionStatus = S.suspend(() =>
  S.Struct({
    CreationDate: S.Date.pipe(T.TimestampFormat("date-time")),
    UpdateDate: S.Date.pipe(T.TimestampFormat("date-time")),
    UpdateVersion: S.optional(S.Number),
    State: OptionState,
    PendingDeletion: S.optional(S.Boolean),
  }),
).annotate({ identifier: "OptionStatus" }) as any as S.Schema<OptionStatus>;
export interface AnalysisSchemeStatus {
  Options: AnalysisScheme;
  Status: OptionStatus;
}
export const AnalysisSchemeStatus = S.suspend(() =>
  S.Struct({ Options: AnalysisScheme, Status: OptionStatus }),
).annotate({
  identifier: "AnalysisSchemeStatus",
}) as any as S.Schema<AnalysisSchemeStatus>;
export interface DefineAnalysisSchemeResponse {
  AnalysisScheme: AnalysisSchemeStatus;
}
export const DefineAnalysisSchemeResponse = S.suspend(() =>
  S.Struct({ AnalysisScheme: AnalysisSchemeStatus }).pipe(ns),
).annotate({
  identifier: "DefineAnalysisSchemeResponse",
}) as any as S.Schema<DefineAnalysisSchemeResponse>;
export interface Expression {
  ExpressionName: string;
  ExpressionValue: string;
}
export const Expression = S.suspend(() =>
  S.Struct({ ExpressionName: S.String, ExpressionValue: S.String }),
).annotate({ identifier: "Expression" }) as any as S.Schema<Expression>;
export interface DefineExpressionRequest {
  DomainName: string;
  Expression: Expression;
}
export const DefineExpressionRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, Expression: Expression }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DefineExpressionRequest",
}) as any as S.Schema<DefineExpressionRequest>;
export interface ExpressionStatus {
  Options: Expression;
  Status: OptionStatus;
}
export const ExpressionStatus = S.suspend(() =>
  S.Struct({ Options: Expression, Status: OptionStatus }),
).annotate({
  identifier: "ExpressionStatus",
}) as any as S.Schema<ExpressionStatus>;
export interface DefineExpressionResponse {
  Expression: ExpressionStatus;
}
export const DefineExpressionResponse = S.suspend(() =>
  S.Struct({ Expression: ExpressionStatus }).pipe(ns),
).annotate({
  identifier: "DefineExpressionResponse",
}) as any as S.Schema<DefineExpressionResponse>;
export type IndexFieldType =
  | "int"
  | "double"
  | "literal"
  | "text"
  | "date"
  | "latlon"
  | "int-array"
  | "double-array"
  | "literal-array"
  | "text-array"
  | "date-array"
  | (string & {});
export const IndexFieldType = S.String;
export interface IntOptions {
  DefaultValue?: number;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export const IntOptions = S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.Number),
    SourceField: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "IntOptions" }) as any as S.Schema<IntOptions>;
export interface DoubleOptions {
  DefaultValue?: number;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export const DoubleOptions = S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.Number),
    SourceField: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DoubleOptions" }) as any as S.Schema<DoubleOptions>;
export interface LiteralOptions {
  DefaultValue?: string;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export const LiteralOptions = S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceField: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "LiteralOptions" }) as any as S.Schema<LiteralOptions>;
export interface TextOptions {
  DefaultValue?: string;
  SourceField?: string;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
  HighlightEnabled?: boolean;
  AnalysisScheme?: string;
}
export const TextOptions = S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceField: S.optional(S.String),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
    HighlightEnabled: S.optional(S.Boolean),
    AnalysisScheme: S.optional(S.String),
  }),
).annotate({ identifier: "TextOptions" }) as any as S.Schema<TextOptions>;
export interface DateOptions {
  DefaultValue?: string;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export const DateOptions = S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceField: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DateOptions" }) as any as S.Schema<DateOptions>;
export interface LatLonOptions {
  DefaultValue?: string;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export const LatLonOptions = S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceField: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "LatLonOptions" }) as any as S.Schema<LatLonOptions>;
export interface IntArrayOptions {
  DefaultValue?: number;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export const IntArrayOptions = S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.Number),
    SourceFields: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "IntArrayOptions",
}) as any as S.Schema<IntArrayOptions>;
export interface DoubleArrayOptions {
  DefaultValue?: number;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export const DoubleArrayOptions = S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.Number),
    SourceFields: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DoubleArrayOptions",
}) as any as S.Schema<DoubleArrayOptions>;
export interface LiteralArrayOptions {
  DefaultValue?: string;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export const LiteralArrayOptions = S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceFields: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LiteralArrayOptions",
}) as any as S.Schema<LiteralArrayOptions>;
export interface TextArrayOptions {
  DefaultValue?: string;
  SourceFields?: string;
  ReturnEnabled?: boolean;
  HighlightEnabled?: boolean;
  AnalysisScheme?: string;
}
export const TextArrayOptions = S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceFields: S.optional(S.String),
    ReturnEnabled: S.optional(S.Boolean),
    HighlightEnabled: S.optional(S.Boolean),
    AnalysisScheme: S.optional(S.String),
  }),
).annotate({
  identifier: "TextArrayOptions",
}) as any as S.Schema<TextArrayOptions>;
export interface DateArrayOptions {
  DefaultValue?: string;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export const DateArrayOptions = S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceFields: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DateArrayOptions",
}) as any as S.Schema<DateArrayOptions>;
export interface IndexField {
  IndexFieldName: string;
  IndexFieldType: IndexFieldType;
  IntOptions?: IntOptions;
  DoubleOptions?: DoubleOptions;
  LiteralOptions?: LiteralOptions;
  TextOptions?: TextOptions;
  DateOptions?: DateOptions;
  LatLonOptions?: LatLonOptions;
  IntArrayOptions?: IntArrayOptions;
  DoubleArrayOptions?: DoubleArrayOptions;
  LiteralArrayOptions?: LiteralArrayOptions;
  TextArrayOptions?: TextArrayOptions;
  DateArrayOptions?: DateArrayOptions;
}
export const IndexField = S.suspend(() =>
  S.Struct({
    IndexFieldName: S.String,
    IndexFieldType: IndexFieldType,
    IntOptions: S.optional(IntOptions),
    DoubleOptions: S.optional(DoubleOptions),
    LiteralOptions: S.optional(LiteralOptions),
    TextOptions: S.optional(TextOptions),
    DateOptions: S.optional(DateOptions),
    LatLonOptions: S.optional(LatLonOptions),
    IntArrayOptions: S.optional(IntArrayOptions),
    DoubleArrayOptions: S.optional(DoubleArrayOptions),
    LiteralArrayOptions: S.optional(LiteralArrayOptions),
    TextArrayOptions: S.optional(TextArrayOptions),
    DateArrayOptions: S.optional(DateArrayOptions),
  }),
).annotate({ identifier: "IndexField" }) as any as S.Schema<IndexField>;
export interface DefineIndexFieldRequest {
  DomainName: string;
  IndexField: IndexField;
}
export const DefineIndexFieldRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, IndexField: IndexField }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DefineIndexFieldRequest",
}) as any as S.Schema<DefineIndexFieldRequest>;
export interface IndexFieldStatus {
  Options: IndexField;
  Status: OptionStatus;
}
export const IndexFieldStatus = S.suspend(() =>
  S.Struct({ Options: IndexField, Status: OptionStatus }),
).annotate({
  identifier: "IndexFieldStatus",
}) as any as S.Schema<IndexFieldStatus>;
export interface DefineIndexFieldResponse {
  IndexField: IndexFieldStatus;
}
export const DefineIndexFieldResponse = S.suspend(() =>
  S.Struct({ IndexField: IndexFieldStatus }).pipe(ns),
).annotate({
  identifier: "DefineIndexFieldResponse",
}) as any as S.Schema<DefineIndexFieldResponse>;
export type SuggesterFuzzyMatching = "none" | "low" | "high" | (string & {});
export const SuggesterFuzzyMatching = S.String;
export interface DocumentSuggesterOptions {
  SourceField: string;
  FuzzyMatching?: SuggesterFuzzyMatching;
  SortExpression?: string;
}
export const DocumentSuggesterOptions = S.suspend(() =>
  S.Struct({
    SourceField: S.String,
    FuzzyMatching: S.optional(SuggesterFuzzyMatching),
    SortExpression: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentSuggesterOptions",
}) as any as S.Schema<DocumentSuggesterOptions>;
export interface Suggester {
  SuggesterName: string;
  DocumentSuggesterOptions: DocumentSuggesterOptions;
}
export const Suggester = S.suspend(() =>
  S.Struct({
    SuggesterName: S.String,
    DocumentSuggesterOptions: DocumentSuggesterOptions,
  }),
).annotate({ identifier: "Suggester" }) as any as S.Schema<Suggester>;
export interface DefineSuggesterRequest {
  DomainName: string;
  Suggester: Suggester;
}
export const DefineSuggesterRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, Suggester: Suggester }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DefineSuggesterRequest",
}) as any as S.Schema<DefineSuggesterRequest>;
export interface SuggesterStatus {
  Options: Suggester;
  Status: OptionStatus;
}
export const SuggesterStatus = S.suspend(() =>
  S.Struct({ Options: Suggester, Status: OptionStatus }),
).annotate({
  identifier: "SuggesterStatus",
}) as any as S.Schema<SuggesterStatus>;
export interface DefineSuggesterResponse {
  Suggester: SuggesterStatus;
}
export const DefineSuggesterResponse = S.suspend(() =>
  S.Struct({ Suggester: SuggesterStatus }).pipe(ns),
).annotate({
  identifier: "DefineSuggesterResponse",
}) as any as S.Schema<DefineSuggesterResponse>;
export interface DeleteAnalysisSchemeRequest {
  DomainName: string;
  AnalysisSchemeName: string;
}
export const DeleteAnalysisSchemeRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, AnalysisSchemeName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAnalysisSchemeRequest",
}) as any as S.Schema<DeleteAnalysisSchemeRequest>;
export interface DeleteAnalysisSchemeResponse {
  AnalysisScheme: AnalysisSchemeStatus;
}
export const DeleteAnalysisSchemeResponse = S.suspend(() =>
  S.Struct({ AnalysisScheme: AnalysisSchemeStatus }).pipe(ns),
).annotate({
  identifier: "DeleteAnalysisSchemeResponse",
}) as any as S.Schema<DeleteAnalysisSchemeResponse>;
export interface DeleteDomainRequest {
  DomainName: string;
}
export const DeleteDomainRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainRequest",
}) as any as S.Schema<DeleteDomainRequest>;
export interface DeleteDomainResponse {
  DomainStatus?: DomainStatus;
}
export const DeleteDomainResponse = S.suspend(() =>
  S.Struct({ DomainStatus: S.optional(DomainStatus) }).pipe(ns),
).annotate({
  identifier: "DeleteDomainResponse",
}) as any as S.Schema<DeleteDomainResponse>;
export interface DeleteExpressionRequest {
  DomainName: string;
  ExpressionName: string;
}
export const DeleteExpressionRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, ExpressionName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteExpressionRequest",
}) as any as S.Schema<DeleteExpressionRequest>;
export interface DeleteExpressionResponse {
  Expression: ExpressionStatus;
}
export const DeleteExpressionResponse = S.suspend(() =>
  S.Struct({ Expression: ExpressionStatus }).pipe(ns),
).annotate({
  identifier: "DeleteExpressionResponse",
}) as any as S.Schema<DeleteExpressionResponse>;
export interface DeleteIndexFieldRequest {
  DomainName: string;
  IndexFieldName: string;
}
export const DeleteIndexFieldRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, IndexFieldName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIndexFieldRequest",
}) as any as S.Schema<DeleteIndexFieldRequest>;
export interface DeleteIndexFieldResponse {
  IndexField: IndexFieldStatus;
}
export const DeleteIndexFieldResponse = S.suspend(() =>
  S.Struct({ IndexField: IndexFieldStatus }).pipe(ns),
).annotate({
  identifier: "DeleteIndexFieldResponse",
}) as any as S.Schema<DeleteIndexFieldResponse>;
export interface DeleteSuggesterRequest {
  DomainName: string;
  SuggesterName: string;
}
export const DeleteSuggesterRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, SuggesterName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSuggesterRequest",
}) as any as S.Schema<DeleteSuggesterRequest>;
export interface DeleteSuggesterResponse {
  Suggester: SuggesterStatus;
}
export const DeleteSuggesterResponse = S.suspend(() =>
  S.Struct({ Suggester: SuggesterStatus }).pipe(ns),
).annotate({
  identifier: "DeleteSuggesterResponse",
}) as any as S.Schema<DeleteSuggesterResponse>;
export type StandardNameList = string[];
export const StandardNameList = S.Array(S.String);
export interface DescribeAnalysisSchemesRequest {
  DomainName: string;
  AnalysisSchemeNames?: string[];
  Deployed?: boolean;
}
export const DescribeAnalysisSchemesRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    AnalysisSchemeNames: S.optional(StandardNameList),
    Deployed: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAnalysisSchemesRequest",
}) as any as S.Schema<DescribeAnalysisSchemesRequest>;
export type AnalysisSchemeStatusList = AnalysisSchemeStatus[];
export const AnalysisSchemeStatusList = S.Array(AnalysisSchemeStatus);
export interface DescribeAnalysisSchemesResponse {
  AnalysisSchemes: AnalysisSchemeStatus[];
}
export const DescribeAnalysisSchemesResponse = S.suspend(() =>
  S.Struct({ AnalysisSchemes: AnalysisSchemeStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeAnalysisSchemesResponse",
}) as any as S.Schema<DescribeAnalysisSchemesResponse>;
export interface DescribeAvailabilityOptionsRequest {
  DomainName: string;
  Deployed?: boolean;
}
export const DescribeAvailabilityOptionsRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, Deployed: S.optional(S.Boolean) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAvailabilityOptionsRequest",
}) as any as S.Schema<DescribeAvailabilityOptionsRequest>;
export interface AvailabilityOptionsStatus {
  Options: boolean;
  Status: OptionStatus;
}
export const AvailabilityOptionsStatus = S.suspend(() =>
  S.Struct({ Options: S.Boolean, Status: OptionStatus }),
).annotate({
  identifier: "AvailabilityOptionsStatus",
}) as any as S.Schema<AvailabilityOptionsStatus>;
export interface DescribeAvailabilityOptionsResponse {
  AvailabilityOptions?: AvailabilityOptionsStatus;
}
export const DescribeAvailabilityOptionsResponse = S.suspend(() =>
  S.Struct({ AvailabilityOptions: S.optional(AvailabilityOptionsStatus) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeAvailabilityOptionsResponse",
}) as any as S.Schema<DescribeAvailabilityOptionsResponse>;
export interface DescribeDomainEndpointOptionsRequest {
  DomainName: string;
  Deployed?: boolean;
}
export const DescribeDomainEndpointOptionsRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, Deployed: S.optional(S.Boolean) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDomainEndpointOptionsRequest",
}) as any as S.Schema<DescribeDomainEndpointOptionsRequest>;
export type TLSSecurityPolicy =
  | "Policy-Min-TLS-1-0-2019-07"
  | "Policy-Min-TLS-1-2-2019-07"
  | (string & {});
export const TLSSecurityPolicy = S.String;
export interface DomainEndpointOptions {
  EnforceHTTPS?: boolean;
  TLSSecurityPolicy?: TLSSecurityPolicy;
}
export const DomainEndpointOptions = S.suspend(() =>
  S.Struct({
    EnforceHTTPS: S.optional(S.Boolean),
    TLSSecurityPolicy: S.optional(TLSSecurityPolicy),
  }),
).annotate({
  identifier: "DomainEndpointOptions",
}) as any as S.Schema<DomainEndpointOptions>;
export interface DomainEndpointOptionsStatus {
  Options: DomainEndpointOptions;
  Status: OptionStatus;
}
export const DomainEndpointOptionsStatus = S.suspend(() =>
  S.Struct({ Options: DomainEndpointOptions, Status: OptionStatus }),
).annotate({
  identifier: "DomainEndpointOptionsStatus",
}) as any as S.Schema<DomainEndpointOptionsStatus>;
export interface DescribeDomainEndpointOptionsResponse {
  DomainEndpointOptions?: DomainEndpointOptionsStatus;
}
export const DescribeDomainEndpointOptionsResponse = S.suspend(() =>
  S.Struct({
    DomainEndpointOptions: S.optional(DomainEndpointOptionsStatus),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDomainEndpointOptionsResponse",
}) as any as S.Schema<DescribeDomainEndpointOptionsResponse>;
export type DomainNameList = string[];
export const DomainNameList = S.Array(S.String);
export interface DescribeDomainsRequest {
  DomainNames?: string[];
}
export const DescribeDomainsRequest = S.suspend(() =>
  S.Struct({ DomainNames: S.optional(DomainNameList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDomainsRequest",
}) as any as S.Schema<DescribeDomainsRequest>;
export type DomainStatusList = DomainStatus[];
export const DomainStatusList = S.Array(DomainStatus);
export interface DescribeDomainsResponse {
  DomainStatusList: DomainStatus[];
}
export const DescribeDomainsResponse = S.suspend(() =>
  S.Struct({ DomainStatusList: DomainStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeDomainsResponse",
}) as any as S.Schema<DescribeDomainsResponse>;
export interface DescribeExpressionsRequest {
  DomainName: string;
  ExpressionNames?: string[];
  Deployed?: boolean;
}
export const DescribeExpressionsRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ExpressionNames: S.optional(StandardNameList),
    Deployed: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeExpressionsRequest",
}) as any as S.Schema<DescribeExpressionsRequest>;
export type ExpressionStatusList = ExpressionStatus[];
export const ExpressionStatusList = S.Array(ExpressionStatus);
export interface DescribeExpressionsResponse {
  Expressions: ExpressionStatus[];
}
export const DescribeExpressionsResponse = S.suspend(() =>
  S.Struct({ Expressions: ExpressionStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeExpressionsResponse",
}) as any as S.Schema<DescribeExpressionsResponse>;
export type DynamicFieldNameList = string[];
export const DynamicFieldNameList = S.Array(S.String);
export interface DescribeIndexFieldsRequest {
  DomainName: string;
  FieldNames?: string[];
  Deployed?: boolean;
}
export const DescribeIndexFieldsRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    FieldNames: S.optional(DynamicFieldNameList),
    Deployed: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeIndexFieldsRequest",
}) as any as S.Schema<DescribeIndexFieldsRequest>;
export type IndexFieldStatusList = IndexFieldStatus[];
export const IndexFieldStatusList = S.Array(IndexFieldStatus);
export interface DescribeIndexFieldsResponse {
  IndexFields: IndexFieldStatus[];
}
export const DescribeIndexFieldsResponse = S.suspend(() =>
  S.Struct({ IndexFields: IndexFieldStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeIndexFieldsResponse",
}) as any as S.Schema<DescribeIndexFieldsResponse>;
export interface DescribeScalingParametersRequest {
  DomainName: string;
}
export const DescribeScalingParametersRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeScalingParametersRequest",
}) as any as S.Schema<DescribeScalingParametersRequest>;
export type PartitionInstanceType =
  | "search.m1.small"
  | "search.m1.large"
  | "search.m2.xlarge"
  | "search.m2.2xlarge"
  | "search.m3.medium"
  | "search.m3.large"
  | "search.m3.xlarge"
  | "search.m3.2xlarge"
  | "search.small"
  | "search.medium"
  | "search.large"
  | "search.xlarge"
  | "search.2xlarge"
  | "search.previousgeneration.small"
  | "search.previousgeneration.large"
  | "search.previousgeneration.xlarge"
  | "search.previousgeneration.2xlarge"
  | (string & {});
export const PartitionInstanceType = S.String;
export interface ScalingParameters {
  DesiredInstanceType?: PartitionInstanceType;
  DesiredReplicationCount?: number;
  DesiredPartitionCount?: number;
}
export const ScalingParameters = S.suspend(() =>
  S.Struct({
    DesiredInstanceType: S.optional(PartitionInstanceType),
    DesiredReplicationCount: S.optional(S.Number),
    DesiredPartitionCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ScalingParameters",
}) as any as S.Schema<ScalingParameters>;
export interface ScalingParametersStatus {
  Options: ScalingParameters;
  Status: OptionStatus;
}
export const ScalingParametersStatus = S.suspend(() =>
  S.Struct({ Options: ScalingParameters, Status: OptionStatus }),
).annotate({
  identifier: "ScalingParametersStatus",
}) as any as S.Schema<ScalingParametersStatus>;
export interface DescribeScalingParametersResponse {
  ScalingParameters: ScalingParametersStatus;
}
export const DescribeScalingParametersResponse = S.suspend(() =>
  S.Struct({ ScalingParameters: ScalingParametersStatus }).pipe(ns),
).annotate({
  identifier: "DescribeScalingParametersResponse",
}) as any as S.Schema<DescribeScalingParametersResponse>;
export interface DescribeServiceAccessPoliciesRequest {
  DomainName: string;
  Deployed?: boolean;
}
export const DescribeServiceAccessPoliciesRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, Deployed: S.optional(S.Boolean) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeServiceAccessPoliciesRequest",
}) as any as S.Schema<DescribeServiceAccessPoliciesRequest>;
export interface AccessPoliciesStatus {
  Options: string;
  Status: OptionStatus;
}
export const AccessPoliciesStatus = S.suspend(() =>
  S.Struct({ Options: S.String, Status: OptionStatus }),
).annotate({
  identifier: "AccessPoliciesStatus",
}) as any as S.Schema<AccessPoliciesStatus>;
export interface DescribeServiceAccessPoliciesResponse {
  AccessPolicies: AccessPoliciesStatus;
}
export const DescribeServiceAccessPoliciesResponse = S.suspend(() =>
  S.Struct({ AccessPolicies: AccessPoliciesStatus }).pipe(ns),
).annotate({
  identifier: "DescribeServiceAccessPoliciesResponse",
}) as any as S.Schema<DescribeServiceAccessPoliciesResponse>;
export interface DescribeSuggestersRequest {
  DomainName: string;
  SuggesterNames?: string[];
  Deployed?: boolean;
}
export const DescribeSuggestersRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    SuggesterNames: S.optional(StandardNameList),
    Deployed: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSuggestersRequest",
}) as any as S.Schema<DescribeSuggestersRequest>;
export type SuggesterStatusList = SuggesterStatus[];
export const SuggesterStatusList = S.Array(SuggesterStatus);
export interface DescribeSuggestersResponse {
  Suggesters: SuggesterStatus[];
}
export const DescribeSuggestersResponse = S.suspend(() =>
  S.Struct({ Suggesters: SuggesterStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeSuggestersResponse",
}) as any as S.Schema<DescribeSuggestersResponse>;
export interface IndexDocumentsRequest {
  DomainName: string;
}
export const IndexDocumentsRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "IndexDocumentsRequest",
}) as any as S.Schema<IndexDocumentsRequest>;
export interface IndexDocumentsResponse {
  FieldNames?: string[];
}
export const IndexDocumentsResponse = S.suspend(() =>
  S.Struct({ FieldNames: S.optional(FieldNameList) }).pipe(ns),
).annotate({
  identifier: "IndexDocumentsResponse",
}) as any as S.Schema<IndexDocumentsResponse>;
export interface ListDomainNamesRequest {}
export const ListDomainNamesRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainNamesRequest",
}) as any as S.Schema<ListDomainNamesRequest>;
export type DomainNameMap = { [key: string]: string | undefined };
export const DomainNameMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListDomainNamesResponse {
  DomainNames?: { [key: string]: string | undefined };
}
export const ListDomainNamesResponse = S.suspend(() =>
  S.Struct({ DomainNames: S.optional(DomainNameMap) }).pipe(ns),
).annotate({
  identifier: "ListDomainNamesResponse",
}) as any as S.Schema<ListDomainNamesResponse>;
export interface UpdateAvailabilityOptionsRequest {
  DomainName: string;
  MultiAZ: boolean;
}
export const UpdateAvailabilityOptionsRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, MultiAZ: S.Boolean }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAvailabilityOptionsRequest",
}) as any as S.Schema<UpdateAvailabilityOptionsRequest>;
export interface UpdateAvailabilityOptionsResponse {
  AvailabilityOptions?: AvailabilityOptionsStatus;
}
export const UpdateAvailabilityOptionsResponse = S.suspend(() =>
  S.Struct({ AvailabilityOptions: S.optional(AvailabilityOptionsStatus) }).pipe(
    ns,
  ),
).annotate({
  identifier: "UpdateAvailabilityOptionsResponse",
}) as any as S.Schema<UpdateAvailabilityOptionsResponse>;
export interface UpdateDomainEndpointOptionsRequest {
  DomainName: string;
  DomainEndpointOptions: DomainEndpointOptions;
}
export const UpdateDomainEndpointOptionsRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    DomainEndpointOptions: DomainEndpointOptions,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainEndpointOptionsRequest",
}) as any as S.Schema<UpdateDomainEndpointOptionsRequest>;
export interface UpdateDomainEndpointOptionsResponse {
  DomainEndpointOptions?: DomainEndpointOptionsStatus;
}
export const UpdateDomainEndpointOptionsResponse = S.suspend(() =>
  S.Struct({
    DomainEndpointOptions: S.optional(DomainEndpointOptionsStatus),
  }).pipe(ns),
).annotate({
  identifier: "UpdateDomainEndpointOptionsResponse",
}) as any as S.Schema<UpdateDomainEndpointOptionsResponse>;
export interface UpdateScalingParametersRequest {
  DomainName: string;
  ScalingParameters: ScalingParameters;
}
export const UpdateScalingParametersRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, ScalingParameters: ScalingParameters }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateScalingParametersRequest",
}) as any as S.Schema<UpdateScalingParametersRequest>;
export interface UpdateScalingParametersResponse {
  ScalingParameters: ScalingParametersStatus;
}
export const UpdateScalingParametersResponse = S.suspend(() =>
  S.Struct({ ScalingParameters: ScalingParametersStatus }).pipe(ns),
).annotate({
  identifier: "UpdateScalingParametersResponse",
}) as any as S.Schema<UpdateScalingParametersResponse>;
export interface UpdateServiceAccessPoliciesRequest {
  DomainName: string;
  AccessPolicies: string;
}
export const UpdateServiceAccessPoliciesRequest = S.suspend(() =>
  S.Struct({ DomainName: S.String, AccessPolicies: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceAccessPoliciesRequest",
}) as any as S.Schema<UpdateServiceAccessPoliciesRequest>;
export interface UpdateServiceAccessPoliciesResponse {
  AccessPolicies: AccessPoliciesStatus;
}
export const UpdateServiceAccessPoliciesResponse = S.suspend(() =>
  S.Struct({ AccessPolicies: AccessPoliciesStatus }).pipe(ns),
).annotate({
  identifier: "UpdateServiceAccessPoliciesResponse",
}) as any as S.Schema<UpdateServiceAccessPoliciesResponse>;

//# Errors
export class BaseException extends S.TaggedErrorClass<BaseException>()(
  "BaseException",
  { Code: S.optional(S.String), Message: S.optional(S.String) },
) {}
export class InternalException extends S.TaggedErrorClass<InternalException>()(
  "InternalException",
  { Code: S.optional(S.String), Message: S.optional(S.String) },
  T.AwsQueryError({ code: "InternalException", httpResponseCode: 500 }),
).pipe(C.withServerError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Code: S.optional(S.String), Message: S.optional(S.String) },
  T.AwsQueryError({ code: "ResourceNotFound", httpResponseCode: 409 }),
).pipe(C.withConflictError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { Code: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class LimitExceededException extends S.TaggedErrorClass<LimitExceededException>()(
  "LimitExceededException",
  { Code: S.optional(S.String), Message: S.optional(S.String) },
  T.AwsQueryError({ code: "LimitExceeded", httpResponseCode: 409 }),
).pipe(C.withConflictError) {}
export class ResourceAlreadyExistsException extends S.TaggedErrorClass<ResourceAlreadyExistsException>()(
  "ResourceAlreadyExistsException",
  { Code: S.optional(S.String), Message: S.optional(S.String) },
  T.AwsQueryError({ code: "ResourceAlreadyExists", httpResponseCode: 409 }),
).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class InvalidTypeException extends S.TaggedErrorClass<InvalidTypeException>()(
  "InvalidTypeException",
  { Code: S.optional(S.String), Message: S.optional(S.String) },
  T.AwsQueryError({ code: "InvalidType", httpResponseCode: 409 }),
).pipe(C.withConflictError) {}
export class DisabledOperationException extends S.TaggedErrorClass<DisabledOperationException>()(
  "DisabledOperationException",
  { Code: S.optional(S.String), Message: S.optional(S.String) },
  T.AwsQueryError({ code: "DisabledAction", httpResponseCode: 409 }),
).pipe(C.withConflictError) {}

//# Operations
/**
 * Indexes the search suggestions. For more information, see Configuring Suggesters in the *Amazon CloudSearch Developer Guide*.
 */
export const buildSuggesters: (
  input: BuildSuggestersRequest,
) => effect.Effect<
  BuildSuggestersResponse,
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BuildSuggestersRequest,
  output: BuildSuggestersResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Creates a new search domain. For more information,
 * see Creating a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const createDomain: (
  input: CreateDomainRequest,
) => effect.Effect<
  CreateDomainResponse,
  | BaseException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDomainRequest,
  output: CreateDomainResponse,
  errors: [
    BaseException,
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ValidationException,
  ],
}));
/**
 * Configures an analysis scheme that can be applied to a `text` or `text-array` field to define language-specific text processing options. For more information, see Configuring Analysis Schemes in the *Amazon CloudSearch Developer Guide*.
 */
export const defineAnalysisScheme: (
  input: DefineAnalysisSchemeRequest,
) => effect.Effect<
  DefineAnalysisSchemeResponse,
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DefineAnalysisSchemeRequest,
  output: DefineAnalysisSchemeResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Configures an `Expression` for the search domain. Used to create new expressions and modify existing ones. If the expression exists, the new configuration replaces the old one. For more information, see Configuring Expressions in the *Amazon CloudSearch Developer Guide*.
 */
export const defineExpression: (
  input: DefineExpressionRequest,
) => effect.Effect<
  DefineExpressionResponse,
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DefineExpressionRequest,
  output: DefineExpressionResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Configures an `IndexField` for the search domain. Used to create new fields and modify existing ones. You must specify the name of the domain you are configuring and an index field configuration. The index field configuration specifies a unique name, the index field type, and the options you want to configure for the field. The options you can specify depend on the `IndexFieldType`. If the field exists, the new configuration replaces the old one. For more information, see Configuring Index Fields in the *Amazon CloudSearch Developer Guide*.
 */
export const defineIndexField: (
  input: DefineIndexFieldRequest,
) => effect.Effect<
  DefineIndexFieldResponse,
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DefineIndexFieldRequest,
  output: DefineIndexFieldResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Configures a suggester for a domain. A suggester enables you to display possible matches before users finish typing their queries. When you configure a suggester, you must specify the name of the text field you want to search for possible matches and a unique name for the suggester. For more information, see Getting Search Suggestions in the *Amazon CloudSearch Developer Guide*.
 */
export const defineSuggester: (
  input: DefineSuggesterRequest,
) => effect.Effect<
  DefineSuggesterResponse,
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DefineSuggesterRequest,
  output: DefineSuggesterResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Deletes an analysis scheme. For more information, see Configuring Analysis Schemes in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteAnalysisScheme: (
  input: DeleteAnalysisSchemeRequest,
) => effect.Effect<
  DeleteAnalysisSchemeResponse,
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAnalysisSchemeRequest,
  output: DeleteAnalysisSchemeResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Permanently deletes a search domain and all of its data. Once a domain has been deleted, it cannot be recovered. For more information,
 * see Deleting a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteDomain: (
  input: DeleteDomainRequest,
) => effect.Effect<
  DeleteDomainResponse,
  BaseException | InternalException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDomainRequest,
  output: DeleteDomainResponse,
  errors: [BaseException, InternalException],
}));
/**
 * Removes an `Expression` from the search domain. For more information, see Configuring Expressions in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteExpression: (
  input: DeleteExpressionRequest,
) => effect.Effect<
  DeleteExpressionResponse,
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteExpressionRequest,
  output: DeleteExpressionResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Removes an `IndexField` from the search domain. For more information, see Configuring Index Fields in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteIndexField: (
  input: DeleteIndexFieldRequest,
) => effect.Effect<
  DeleteIndexFieldResponse,
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteIndexFieldRequest,
  output: DeleteIndexFieldResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Deletes a suggester. For more information, see Getting Search Suggestions in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteSuggester: (
  input: DeleteSuggesterRequest,
) => effect.Effect<
  DeleteSuggesterResponse,
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSuggesterRequest,
  output: DeleteSuggesterResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Gets the analysis schemes configured for a domain. An analysis scheme defines language-specific text processing options for a `text` field. Can be limited to specific analysis schemes by name. By default, shows all analysis schemes and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Configuring Analysis Schemes in the *Amazon CloudSearch Developer Guide*.
 */
export const describeAnalysisSchemes: (
  input: DescribeAnalysisSchemesRequest,
) => effect.Effect<
  DescribeAnalysisSchemesResponse,
  BaseException | InternalException | ResourceNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeAnalysisSchemesRequest,
  output: DescribeAnalysisSchemesResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
}));
/**
 * Gets the availability options configured for a domain. By default, shows the configuration with any pending changes. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Configuring Availability Options in the *Amazon CloudSearch Developer Guide*.
 */
export const describeAvailabilityOptions: (
  input: DescribeAvailabilityOptionsRequest,
) => effect.Effect<
  DescribeAvailabilityOptionsResponse,
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeAvailabilityOptionsRequest,
  output: DescribeAvailabilityOptionsResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns the domain's endpoint options, specifically whether all requests to the domain must arrive over HTTPS. For more information, see Configuring Domain Endpoint Options in the *Amazon CloudSearch Developer Guide*.
 */
export const describeDomainEndpointOptions: (
  input: DescribeDomainEndpointOptionsRequest,
) => effect.Effect<
  DescribeDomainEndpointOptionsResponse,
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeDomainEndpointOptionsRequest,
  output: DescribeDomainEndpointOptionsResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
}));
/**
 * Gets information about the search domains owned by this account. Can be limited to specific domains. Shows
 * all domains by default. To get the number of searchable documents in a domain, use the console or submit a `matchall` request to your domain's search endpoint: `q=matchall&q.parser=structured&size=0`. For more information,
 * see Getting Information about a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const describeDomains: (
  input: DescribeDomainsRequest,
) => effect.Effect<
  DescribeDomainsResponse,
  BaseException | InternalException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeDomainsRequest,
  output: DescribeDomainsResponse,
  errors: [BaseException, InternalException],
}));
/**
 * Gets the expressions configured for the search domain. Can be limited to specific expressions by name. By default, shows all expressions and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Configuring Expressions in the *Amazon CloudSearch Developer Guide*.
 */
export const describeExpressions: (
  input: DescribeExpressionsRequest,
) => effect.Effect<
  DescribeExpressionsResponse,
  BaseException | InternalException | ResourceNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeExpressionsRequest,
  output: DescribeExpressionsResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
}));
/**
 * Gets information about the index fields configured for the search domain.
 * Can be limited to specific fields by name. By default, shows all fields and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information,
 * see Getting Domain Information in the *Amazon CloudSearch Developer Guide*.
 */
export const describeIndexFields: (
  input: DescribeIndexFieldsRequest,
) => effect.Effect<
  DescribeIndexFieldsResponse,
  BaseException | InternalException | ResourceNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeIndexFieldsRequest,
  output: DescribeIndexFieldsResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
}));
/**
 * Gets the scaling parameters configured for a domain. A domain's scaling parameters specify the desired search instance type and replication count. For more information, see Configuring Scaling Options in the *Amazon CloudSearch Developer Guide*.
 */
export const describeScalingParameters: (
  input: DescribeScalingParametersRequest,
) => effect.Effect<
  DescribeScalingParametersResponse,
  BaseException | InternalException | ResourceNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeScalingParametersRequest,
  output: DescribeScalingParametersResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
}));
/**
 * Gets information about the access policies that control access to the domain's document and search endpoints. By default, shows the configuration with any pending changes. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information,
 * see Configuring Access for a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const describeServiceAccessPolicies: (
  input: DescribeServiceAccessPoliciesRequest,
) => effect.Effect<
  DescribeServiceAccessPoliciesResponse,
  BaseException | InternalException | ResourceNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeServiceAccessPoliciesRequest,
  output: DescribeServiceAccessPoliciesResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
}));
/**
 * Gets the suggesters configured for a domain. A suggester enables you to display possible matches before users finish typing their queries. Can be limited to specific suggesters by name. By default, shows all suggesters and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Getting Search Suggestions in the *Amazon CloudSearch Developer Guide*.
 */
export const describeSuggesters: (
  input: DescribeSuggestersRequest,
) => effect.Effect<
  DescribeSuggestersResponse,
  BaseException | InternalException | ResourceNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeSuggestersRequest,
  output: DescribeSuggestersResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
}));
/**
 * Tells the search domain to start indexing its documents using the latest indexing options. This operation must be invoked to activate options whose OptionStatus is `RequiresIndexDocuments`.
 */
export const indexDocuments: (
  input: IndexDocumentsRequest,
) => effect.Effect<
  IndexDocumentsResponse,
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: IndexDocumentsRequest,
  output: IndexDocumentsResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Lists all search domains owned by an account.
 */
export const listDomainNames: (
  input: ListDomainNamesRequest,
) => effect.Effect<
  ListDomainNamesResponse,
  BaseException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListDomainNamesRequest,
  output: ListDomainNamesResponse,
  errors: [BaseException],
}));
/**
 * Configures the availability options for a domain. Enabling the Multi-AZ option expands an Amazon CloudSearch domain to an additional Availability Zone in the same Region to increase fault tolerance in the event of a service disruption. Changes to the Multi-AZ option can take about half an hour to become active. For more information, see Configuring Availability Options in the *Amazon CloudSearch Developer Guide*.
 */
export const updateAvailabilityOptions: (
  input: UpdateAvailabilityOptionsRequest,
) => effect.Effect<
  UpdateAvailabilityOptionsResponse,
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAvailabilityOptionsRequest,
  output: UpdateAvailabilityOptionsResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Updates the domain's endpoint options, specifically whether all requests to the domain must arrive over HTTPS. For more information, see Configuring Domain Endpoint Options in the *Amazon CloudSearch Developer Guide*.
 */
export const updateDomainEndpointOptions: (
  input: UpdateDomainEndpointOptionsRequest,
) => effect.Effect<
  UpdateDomainEndpointOptionsResponse,
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDomainEndpointOptionsRequest,
  output: UpdateDomainEndpointOptionsResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Configures scaling parameters for a domain. A domain's scaling parameters specify the desired search instance type and replication count. Amazon CloudSearch will still automatically scale your domain based on the volume of data and traffic, but not below the desired instance type and replication count. If the Multi-AZ option is enabled, these values control the resources used per Availability Zone. For more information, see Configuring Scaling Options in the *Amazon CloudSearch Developer Guide*.
 */
export const updateScalingParameters: (
  input: UpdateScalingParametersRequest,
) => effect.Effect<
  UpdateScalingParametersResponse,
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateScalingParametersRequest,
  output: UpdateScalingParametersResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Configures the access rules that control access to the domain's document and search endpoints.
 * For more information, see
 * Configuring Access for an Amazon CloudSearch Domain.
 */
export const updateServiceAccessPolicies: (
  input: UpdateServiceAccessPoliciesRequest,
) => effect.Effect<
  UpdateServiceAccessPoliciesResponse,
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateServiceAccessPoliciesRequest,
  output: UpdateServiceAccessPoliciesResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
