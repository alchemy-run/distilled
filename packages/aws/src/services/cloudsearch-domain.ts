import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CloudSearch Domain",
  target: "AmazonCloudSearch2013",
  version: "2013-01-01",
  sigv4: "cloudsearch",
  protocol: restJson1Protocol,
  xmlns: "http://cloudsearch.amazonaws.com/doc/2013-01-01/",
  rules: (p, _) => {
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
                `https://cloudsearchdomain-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://cloudsearchdomain-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cloudsearchdomain.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cloudsearchdomain.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class DocumentServiceException
  extends /*@__PURE__*/ TE.TaggedError("DocumentServiceException")<{
    readonly status?: string;
    readonly message?: string;
  }> {}
export class SearchException
  extends /*@__PURE__*/ TE.TaggedError("SearchException")<{
    readonly message?: string;
  }> {}
export type Cursor = string;
export type Expr = string;
export type Facet = string;
export type FilterQuery = string;
export type Highlight = string;
export type Partial = boolean;
export type Query = string;
export type QueryOptions = string;
export type QueryParser =
  | "simple"
  | "structured"
  | "lucene"
  | "dismax"
  | (string & {});
export type Return = string;
export type Size = number;
export type Sort = string;
export type Start = number;
export type Stat = string;
export interface SearchRequest {
  cursor?: string;
  expr?: string;
  facet?: string;
  filterQuery?: string;
  highlight?: string;
  partial?: boolean;
  query: string;
  queryOptions?: string;
  queryParser?: QueryParser;
  return?: string;
  size?: number;
  sort?: string;
  start?: number;
  stats?: string;
}
export interface SearchStatus {
  timems?: number;
  rid?: string;
}
export type FieldValue = string[];
export type Fields = { [key: string]: string[] | undefined };
export type Exprs = { [key: string]: string | undefined };
export type Highlights = { [key: string]: string | undefined };
export interface Hit {
  id?: string;
  fields?: { [key: string]: string[] | undefined };
  exprs?: { [key: string]: string | undefined };
  highlights?: { [key: string]: string | undefined };
}
export type HitList = Hit[];
export interface Hits {
  found?: number;
  start?: number;
  cursor?: string;
  hit?: Hit[];
}
export interface Bucket {
  value?: string;
  count?: number;
}
export type BucketList = Bucket[];
export interface BucketInfo {
  buckets?: Bucket[];
}
export type Facets = { [key: string]: BucketInfo | undefined };
export interface FieldStats {
  min?: string;
  max?: string;
  count?: number;
  missing?: number;
  sum?: number;
  sumOfSquares?: number;
  mean?: string;
  stddev?: number;
}
export type Stats = { [key: string]: FieldStats | undefined };
export interface SearchResponse {
  status?: SearchStatus;
  hits?: Hits;
  facets?: { [key: string]: BucketInfo | undefined };
  stats?: { [key: string]: FieldStats | undefined };
}
export type Suggester = string;
export type SuggestionsSize = number;
export interface SuggestRequest {
  query: string;
  suggester: string;
  size?: number;
}
export interface SuggestStatus {
  timems?: number;
  rid?: string;
}
export interface SuggestionMatch {
  suggestion?: string;
  score?: number;
  id?: string;
}
export type Suggestions = SuggestionMatch[];
export interface SuggestModel {
  query?: string;
  found?: number;
  suggestions?: SuggestionMatch[];
}
export interface SuggestResponse {
  status?: SuggestStatus;
  suggest?: SuggestModel;
}
export type ContentType =
  | "application/json"
  | "application/xml"
  | (string & {});
export interface UploadDocumentsRequest {
  documents: T.StreamingInputBody;
  contentType: ContentType;
}
export type Adds = number;
export type Deletes = number;
export interface DocumentServiceWarning {
  message?: string;
}
export type DocumentServiceWarnings = DocumentServiceWarning[];
export interface UploadDocumentsResponse {
  status?: string;
  adds?: number;
  deletes?: number;
  warnings?: DocumentServiceWarning[];
}
export type SearchError = SearchException | CommonErrors;
/**
 * Retrieves a list of documents that match the specified search criteria. How you specify the search criteria depends on which query parser you use. Amazon CloudSearch supports four query parsers:
 *
 * - `simple`: search all `text` and `text-array` fields for the specified string. Search for phrases, individual terms, and prefixes.
 *
 * - `structured`: search specific fields, construct compound queries using Boolean operators, and use advanced features such as term boosting and proximity searching.
 *
 * - `lucene`: specify search criteria using the Apache Lucene query parser syntax.
 *
 * - `dismax`: specify search criteria using the simplified subset of the Apache Lucene query parser syntax defined by the DisMax query parser.
 *
 * For more information, see Searching Your Data in the *Amazon CloudSearch Developer Guide*.
 *
 * The endpoint for submitting `Search` requests is domain-specific. You submit search requests to a domain's search endpoint. To get the search endpoint for your domain, use the Amazon CloudSearch configuration service `DescribeDomains` action. A domain's endpoints are also displayed on the domain dashboard in the Amazon CloudSearch console.
 */
export const search: API.OperationMethod<
  SearchRequest,
  SearchResponse,
  SearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2013-01-01/search?format=sdk&pretty=true",
    input: {
      cursor: D.m({ query: "cursor" }),
      expr: D.m({ query: "expr" }),
      facet: D.m({ query: "facet" }),
      filterQuery: D.m({ query: "fq" }),
      highlight: D.m({ query: "highlight" }),
      partial: D.m({ query: "partial" }),
      query: D.m({ query: "q" }),
      queryOptions: D.m({ query: "q.options" }),
      queryParser: D.m({ query: "q.parser" }),
      return: D.m({ query: "return" }),
      size: D.m({ query: "size" }),
      sort: D.m({ query: "sort" }),
      start: D.m({ query: "start" }),
      stats: D.m({ query: "stats" }),
    },
  },
  errors: [SearchException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Search",
})) as any;

export type SuggestError = SearchException | CommonErrors;
/**
 * Retrieves autocomplete suggestions for a partial query string. You can use suggestions enable you to display likely matches before users finish typing. In Amazon CloudSearch, suggestions are based on the contents of a particular text field. When you request suggestions, Amazon CloudSearch finds all of the documents whose values in the suggester field start with the specified query string. The beginning of the field must match the query string to be considered a match.
 *
 * For more information about configuring suggesters and retrieving suggestions, see Getting Suggestions in the *Amazon CloudSearch Developer Guide*.
 *
 * The endpoint for submitting `Suggest` requests is domain-specific. You submit suggest requests to a domain's search endpoint. To get the search endpoint for your domain, use the Amazon CloudSearch configuration service `DescribeDomains` action. A domain's endpoints are also displayed on the domain dashboard in the Amazon CloudSearch console.
 */
export const suggest: API.OperationMethod<
  SuggestRequest,
  SuggestResponse,
  SuggestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2013-01-01/suggest?format=sdk&pretty=true",
    input: {
      query: D.m({ query: "q" }),
      suggester: D.m({ query: "suggester" }),
      size: D.m({ query: "size" }),
    },
  },
  errors: [SearchException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Suggest",
})) as any;

export type UploadDocumentsError = DocumentServiceException | CommonErrors;
/**
 * Posts a batch of documents to a search domain for indexing. A document batch is a collection of add and delete operations that represent the documents you want to add, update, or delete from your domain. Batches can be described in either JSON or XML. Each item that you want Amazon CloudSearch to return as a search result (such as a product) is represented as a document. Every document has a unique ID and one or more fields that contain the data that you want to search and return in results. Individual documents cannot contain more than 1 MB of data. The entire batch cannot exceed 5 MB. To get the best possible upload performance, group add and delete operations in batches that are close the 5 MB limit. Submitting a large volume of single-document batches can overload a domain's document service.
 *
 * The endpoint for submitting `UploadDocuments` requests is domain-specific. To get the document endpoint for your domain, use the Amazon CloudSearch configuration service `DescribeDomains` action. A domain's endpoints are also displayed on the domain dashboard in the Amazon CloudSearch console.
 *
 * For more information about formatting your data for Amazon CloudSearch, see Preparing Your Data in the *Amazon CloudSearch Developer Guide*.
 * For more information about uploading data for indexing, see Uploading Data in the *Amazon CloudSearch Developer Guide*.
 */
export const uploadDocuments: API.OperationMethod<
  UploadDocumentsRequest,
  UploadDocumentsResponse,
  UploadDocumentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2013-01-01/documents/batch?format=sdk",
    input: {
      documents: D.m({ payload: true, shape: D.stream }),
      contentType: D.m({ header: "Content-Type" }),
    },
  },
  errors: [DocumentServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadDocuments",
})) as any;
