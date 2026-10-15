import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "ManagedBlockchain Query",
  serviceShapeName: "TietonChainQueryService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "managedblockchain-query" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-05-04");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
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
              `https://managedblockchain-query-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://managedblockchain-query-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://managedblockchain-query.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://managedblockchain-query.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://managedblockchain-query.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: S.String,
      quotaCode: S.String,
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: S.String,
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(57, __c7, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type QueryNetwork = string;
export type ChainAddress = string;
export type QueryTokenId = string;
export interface TokenIdentifier {
  network: string;
  contractAddress?: string;
  tokenId?: string;
}
export interface OwnerIdentifier {
  address: string;
}
export interface BlockchainInstant {
  time?: Date;
}
export interface BatchGetTokenBalanceInputItem {
  tokenIdentifier: TokenIdentifier;
  ownerIdentifier: OwnerIdentifier;
  atBlockchainInstant?: BlockchainInstant;
}
export type GetTokenBalanceInputList = BatchGetTokenBalanceInputItem[];
export interface BatchGetTokenBalanceInput {
  getTokenBalanceInputs?: BatchGetTokenBalanceInputItem[];
}
export interface BatchGetTokenBalanceOutputItem {
  ownerIdentifier?: OwnerIdentifier;
  tokenIdentifier?: TokenIdentifier;
  balance: string;
  atBlockchainInstant: BlockchainInstant;
  lastUpdatedTime?: BlockchainInstant;
}
export type BatchGetTokenBalanceOutputList = BatchGetTokenBalanceOutputItem[];
export type ErrorType = string;
export interface BatchGetTokenBalanceErrorItem {
  tokenIdentifier?: TokenIdentifier;
  ownerIdentifier?: OwnerIdentifier;
  atBlockchainInstant?: BlockchainInstant;
  errorCode: string;
  errorMessage: string;
  errorType: string;
}
export type BatchGetTokenBalanceErrors = BatchGetTokenBalanceErrorItem[];
export interface BatchGetTokenBalanceOutput {
  tokenBalances: BatchGetTokenBalanceOutputItem[];
  errors: BatchGetTokenBalanceErrorItem[];
}
export interface ContractIdentifier {
  network: string;
  contractAddress: string;
}
export interface GetAssetContractInput {
  contractIdentifier: ContractIdentifier;
}
export type QueryTokenStandard = string;
export interface ContractMetadata {
  name?: string;
  symbol?: string;
  decimals?: number;
}
export interface GetAssetContractOutput {
  contractIdentifier: ContractIdentifier;
  tokenStandard: string;
  deployerAddress: string;
  metadata?: ContractMetadata;
}
export interface GetTokenBalanceInput {
  tokenIdentifier: TokenIdentifier;
  ownerIdentifier: OwnerIdentifier;
  atBlockchainInstant?: BlockchainInstant;
}
export interface GetTokenBalanceOutput {
  ownerIdentifier?: OwnerIdentifier;
  tokenIdentifier?: TokenIdentifier;
  balance: string;
  atBlockchainInstant: BlockchainInstant;
  lastUpdatedTime?: BlockchainInstant;
}
export type QueryTransactionHash = string;
export type QueryTransactionId = string;
export interface GetTransactionInput {
  transactionHash?: string;
  transactionId?: string;
  network: string;
}
export type BlockHash = string;
export type ConfirmationStatus = string;
export type ExecutionStatus = string;
export interface Transaction {
  network: string;
  blockHash?: string;
  transactionHash: string;
  blockNumber?: string;
  transactionTimestamp: Date;
  transactionIndex: number;
  numberOfTransactions: number;
  to: string;
  from?: string;
  contractAddress?: string;
  gasUsed?: string;
  cumulativeGasUsed?: string;
  effectiveGasPrice?: string;
  signatureV?: number;
  signatureR?: string;
  signatureS?: string;
  transactionFee?: string;
  transactionId?: string;
  confirmationStatus?: string;
  executionStatus?: string;
}
export interface GetTransactionOutput {
  transaction: Transaction;
}
export interface ContractFilter {
  network: string;
  tokenStandard: string;
  deployerAddress: string;
}
export type NextToken = string;
export interface ListAssetContractsInput {
  contractFilter: ContractFilter;
  nextToken?: string;
  maxResults?: number;
}
export interface AssetContract {
  contractIdentifier: ContractIdentifier;
  tokenStandard: string;
  deployerAddress: string;
}
export type AssetContractList = AssetContract[];
export interface ListAssetContractsOutput {
  contracts: AssetContract[];
  nextToken?: string;
}
export type ChainAddresses = string[];
export interface AddressIdentifierFilter {
  transactionEventToAddress: string[];
}
export interface TimeFilter {
  from?: BlockchainInstant;
  to?: BlockchainInstant;
}
export interface VoutFilter {
  voutSpent: boolean;
}
export type ConfirmationStatusIncludeList = string[];
export interface ConfirmationStatusFilter {
  include: string[];
}
export type ListFilteredTransactionEventsSortBy = string;
export type SortOrder = string;
export interface ListFilteredTransactionEventsSort {
  sortBy?: string;
  sortOrder?: string;
}
export interface ListFilteredTransactionEventsInput {
  network: string;
  addressIdentifierFilter: AddressIdentifierFilter;
  timeFilter?: TimeFilter;
  voutFilter?: VoutFilter;
  confirmationStatusFilter?: ConfirmationStatusFilter;
  sort?: ListFilteredTransactionEventsSort;
  nextToken?: string;
  maxResults?: number;
}
export type QueryTransactionEventType = string;
export interface TransactionEvent {
  network: string;
  transactionHash: string;
  eventType: string;
  from?: string;
  to?: string;
  value?: string;
  contractAddress?: string;
  tokenId?: string;
  transactionId?: string;
  voutIndex?: number;
  voutSpent?: boolean;
  spentVoutTransactionId?: string;
  spentVoutTransactionHash?: string;
  spentVoutIndex?: number;
  blockchainInstant?: BlockchainInstant;
  confirmationStatus?: string;
}
export type TransactionEventList = TransactionEvent[];
export interface ListFilteredTransactionEventsOutput {
  events: TransactionEvent[];
  nextToken?: string;
}
export interface OwnerFilter {
  address: string;
}
export interface TokenFilter {
  network: string;
  contractAddress?: string;
  tokenId?: string;
}
export interface ListTokenBalancesInput {
  ownerFilter?: OwnerFilter;
  tokenFilter: TokenFilter;
  nextToken?: string;
  maxResults?: number;
}
export interface TokenBalance {
  ownerIdentifier?: OwnerIdentifier;
  tokenIdentifier?: TokenIdentifier;
  balance: string;
  atBlockchainInstant: BlockchainInstant;
  lastUpdatedTime?: BlockchainInstant;
}
export type TokenBalanceList = TokenBalance[];
export interface ListTokenBalancesOutput {
  tokenBalances: TokenBalance[];
  nextToken?: string;
}
export interface ListTransactionEventsInput {
  transactionHash?: string;
  transactionId?: string;
  network: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListTransactionEventsOutput {
  events: TransactionEvent[];
  nextToken?: string;
}
export type ListTransactionsSortBy = string;
export interface ListTransactionsSort {
  sortBy?: string;
  sortOrder?: string;
}
export interface ListTransactionsInput {
  address: string;
  network: string;
  fromBlockchainInstant?: BlockchainInstant;
  toBlockchainInstant?: BlockchainInstant;
  sort?: ListTransactionsSort;
  nextToken?: string;
  maxResults?: number;
  confirmationStatusFilter?: ConfirmationStatusFilter;
}
export interface TransactionOutputItem {
  transactionHash: string;
  transactionId?: string;
  network: string;
  transactionTimestamp: Date;
  confirmationStatus?: string;
}
export type TransactionOutputList = TransactionOutputItem[];
export interface ListTransactionsOutput {
  transactions: TransactionOutputItem[];
  nextToken?: string;
}
export type ExceptionMessage = string;
export type ResourceId = string;
export type ResourceType = string;
export type ServiceCode = string;
export type QuotaCode = string;
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type BatchGetTokenBalanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the token balance for a batch of tokens by using the `BatchGetTokenBalance`
 * action for every token in the request.
 *
 * Only the native tokens BTC and ETH, and the ERC-20,
 * ERC-721, and ERC 1155 token standards are supported.
 */
export const batchGetTokenBalance: API.OperationMethod<
  BatchGetTokenBalanceInput,
  BatchGetTokenBalanceOutput,
  BatchGetTokenBalanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(66, __c8, 2) as any as S.Schema<BatchGetTokenBalanceInput>,
  output: __S(69, __c8, 5) as any as S.Schema<BatchGetTokenBalanceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTokenBalance",
}));

export type GetAssetContractError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the information about a specific contract deployed on the blockchain.
 *
 * - The Bitcoin blockchain networks do not support this
 * operation.
 *
 * - Metadata is currently only available for some `ERC-20` contracts.
 * Metadata will be available for additional contracts in the future.
 */
export const getAssetContract: API.OperationMethod<
  GetAssetContractInput,
  GetAssetContractOutput,
  GetAssetContractError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<GetAssetContractInput>,
  output: __S(98, __c12, 2) as any as S.Schema<GetAssetContractOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetContract",
}));

export type GetTokenBalanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the balance of a specific token, including native tokens, for a given address (wallet or contract) on the blockchain.
 *
 * Only the native tokens BTC and ETH, and the ERC-20,
 * ERC-721, and ERC 1155 token standards are supported.
 */
export const getTokenBalance: API.OperationMethod<
  GetTokenBalanceInput,
  GetTokenBalanceOutput,
  GetTokenBalanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<GetTokenBalanceInput>,
  output: __S(90, __c11, 2) as any as S.Schema<GetTokenBalanceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTokenBalance",
}));

export type GetTransactionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a transaction.
 *
 * This action will return transaction details for all transactions
 * that are *confirmed* on the blockchain, even if they have not reached
 * finality.
 */
export const getTransaction: API.OperationMethod<
  GetTransactionInput,
  GetTransactionOutput,
  GetTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<GetTransactionInput>,
  output: __S(122, __c15, 2) as any as S.Schema<GetTransactionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTransaction",
}));

export type ListAssetContractsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the contracts for a given contract type deployed by an address
 * (either a contract address or a wallet address).
 *
 * The Bitcoin blockchain networks do not support this
 * operation.
 */
export const listAssetContracts: API.PaginatedOperationMethod<
  ListAssetContractsInput,
  ListAssetContractsOutput,
  ListAssetContractsError,
  Credentials | HttpClient.HttpClient,
  AssetContract
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1, __c0, 1) as any as S.Schema<ListAssetContractsInput>,
  output: __S(4, __c0, 4) as any as S.Schema<ListAssetContractsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetContracts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contracts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFilteredTransactionEventsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the transaction events for an address on the blockchain.
 *
 * This operation is only supported on the Bitcoin networks.
 */
export const listFilteredTransactionEvents: API.PaginatedOperationMethod<
  ListFilteredTransactionEventsInput,
  ListFilteredTransactionEventsOutput,
  ListFilteredTransactionEventsError,
  Credentials | HttpClient.HttpClient,
  TransactionEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(11, __c1, 3) as any as S.Schema<ListFilteredTransactionEventsInput>,
  output: __S(18, __c2, 2) as any as S.Schema<ListFilteredTransactionEventsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFilteredTransactionEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTokenBalancesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action returns the following for a given blockchain network:
 *
 * - Lists all token balances owned by an address (either a contract
 * address or a wallet address).
 *
 * - Lists all token balances for all tokens created by a contract.
 *
 * - Lists all token balances for a given token.
 *
 * You must always specify the network property of
 * the `tokenFilter` when using this operation.
 */
export const listTokenBalances: API.PaginatedOperationMethod<
  ListTokenBalancesInput,
  ListTokenBalancesOutput,
  ListTokenBalancesError,
  Credentials | HttpClient.HttpClient,
  TokenBalance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<ListTokenBalancesInput>,
  output: __S(33, __c4, 1) as any as S.Schema<ListTokenBalancesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTokenBalances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tokenBalances",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTransactionEventsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the transaction events for a transaction
 *
 * This action will return transaction details for all transactions
 * that are *confirmed* on the blockchain, even if they have not reached
 * finality.
 */
export const listTransactionEvents: API.PaginatedOperationMethod<
  ListTransactionEventsInput,
  ListTransactionEventsOutput,
  ListTransactionEventsError,
  Credentials | HttpClient.HttpClient,
  TransactionEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<ListTransactionEventsInput>,
  output: __S(18, __c2, 2) as any as S.Schema<ListTransactionEventsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTransactionEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTransactionsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the transaction events for a transaction.
 */
export const listTransactions: API.PaginatedOperationMethod<
  ListTransactionsInput,
  ListTransactionsOutput,
  ListTransactionsError,
  Credentials | HttpClient.HttpClient,
  TransactionOutputItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<ListTransactionsInput>,
  output: __S(51, __c6, 3) as any as S.Schema<ListTransactionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTransactions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "transactions",
    pageSize: "maxResults",
  } as const,
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ network: S.String, tokenStandard: S.String, deployerAddress: S.String }),
      ).annotate({ identifier: "ContractFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          contractFilter: __S(0, __c0, 0),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-asset-contracts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssetContractsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          contractIdentifier: __S(104, __c13, 0),
          tokenStandard: S.String,
          deployerAddress: S.String,
        }),
      ).annotate({ identifier: "AssetContract" });
    case 3:
      return S.Array(__S(2, __c0, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ contracts: __S(3, __c0, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssetContractsOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ transactionEventToAddress: __S(24, __c3, 0) })).annotate({
        identifier: "AddressIdentifierFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ from: S.optional(__S(80, __c10, 0)), to: S.optional(__S(80, __c10, 0)) }),
      ).annotate({ identifier: "TimeFilter" });
    case 2:
      return S.suspend(() => S.Struct({ voutSpent: S.Boolean })).annotate({
        identifier: "VoutFilter",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          network: S.String,
          addressIdentifierFilter: __S(8, __c1, 0),
          timeFilter: S.optional(__S(9, __c1, 1)),
          voutFilter: S.optional(__S(10, __c1, 2)),
          confirmationStatusFilter: S.optional(__S(25, __c3, 1)),
          sort: S.optional(__S(26, __c3, 2)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-filtered-transaction-events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFilteredTransactionEventsInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          network: S.String,
          transactionHash: S.String,
          eventType: S.String,
          from: S.optional(S.String),
          to: S.optional(S.String),
          value: S.optional(S.String),
          contractAddress: S.optional(S.String),
          tokenId: S.optional(S.String),
          transactionId: S.optional(S.String),
          voutIndex: S.optional(S.Number),
          voutSpent: S.optional(S.Boolean),
          spentVoutTransactionId: S.optional(S.String),
          spentVoutTransactionHash: S.optional(S.String),
          spentVoutIndex: S.optional(S.Number),
          blockchainInstant: S.optional(__S(80, __c10, 0)),
          confirmationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransactionEvent" });
    case 1:
      return S.Array(__S(16, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ events: __S(17, __c2, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFilteredTransactionEventsOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() => S.Struct({ include: __S(24, __c3, 0) })).annotate({
        identifier: "ConfirmationStatusFilter",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ sortBy: S.optional(S.String), sortOrder: S.optional(S.String) }),
      ).annotate({ identifier: "ListFilteredTransactionEventsSort" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ownerFilter: S.optional(__S(89, __c11, 1)),
          tokenFilter: __S(88, __c11, 0),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-token-balances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTokenBalancesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tokenBalances: __S(72, __c9, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTokenBalancesOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          transactionHash: S.optional(S.String),
          transactionId: S.optional(S.String),
          network: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-transaction-events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTransactionEventsInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          address: S.String,
          network: S.String,
          fromBlockchainInstant: S.optional(__S(80, __c10, 0)),
          toBlockchainInstant: S.optional(__S(80, __c10, 0)),
          sort: S.optional(__S(26, __c3, 2)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          confirmationStatusFilter: S.optional(__S(25, __c3, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-transactions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTransactionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          transactionHash: S.String,
          transactionId: S.optional(S.String),
          network: S.String,
          transactionTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          confirmationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransactionOutputItem" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ transactions: __S(50, __c6, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTransactionsOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(56, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tokenIdentifier: __S(88, __c11, 0),
          ownerIdentifier: __S(89, __c11, 1),
          atBlockchainInstant: S.optional(__S(80, __c10, 0)),
        }),
      ).annotate({ identifier: "BatchGetTokenBalanceInputItem" });
    case 1:
      return S.Array(__S(64, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ getTokenBalanceInputs: S.optional(__S(65, __c8, 1)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/batch-get-token-balance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetTokenBalanceInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          tokenIdentifier: S.optional(__S(88, __c11, 0)),
          ownerIdentifier: S.optional(__S(89, __c11, 1)),
          atBlockchainInstant: S.optional(__S(80, __c10, 0)),
          errorCode: S.String,
          errorMessage: S.String,
          errorType: S.String,
        }),
      ).annotate({ identifier: "BatchGetTokenBalanceErrorItem" });
    case 4:
      return S.Array(__S(67, __c8, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ tokenBalances: __S(72, __c9, 0), errors: __S(68, __c8, 4) }),
      ).annotate({ identifier: "BatchGetTokenBalanceOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(90, __c11, 2));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))) }),
      ).annotate({ identifier: "BlockchainInstant" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          network: S.String,
          contractAddress: S.optional(S.String),
          tokenId: S.optional(S.String),
        }),
      ).annotate({ identifier: "TokenIdentifier" });
    case 1:
      return S.suspend(() => S.Struct({ address: S.String })).annotate({
        identifier: "OwnerIdentifier",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ownerIdentifier: S.optional(__S(89, __c11, 1)),
          tokenIdentifier: S.optional(__S(88, __c11, 0)),
          balance: S.String,
          atBlockchainInstant: __S(80, __c10, 0),
          lastUpdatedTime: S.optional(__S(80, __c10, 0)),
        }),
      ).annotate({ identifier: "BatchGetTokenBalanceOutputItem" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ contractIdentifier: __S(104, __c13, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-asset-contract" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssetContractInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          symbol: S.optional(S.String),
          decimals: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ContractMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          contractIdentifier: __S(104, __c13, 0),
          tokenStandard: S.String,
          deployerAddress: S.String,
          metadata: S.optional(__S(97, __c12, 1)),
        }),
      ).annotate({ identifier: "GetAssetContractOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ network: S.String, contractAddress: S.String })).annotate({
        identifier: "ContractIdentifier",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tokenIdentifier: __S(88, __c11, 0),
          ownerIdentifier: __S(89, __c11, 1),
          atBlockchainInstant: S.optional(__S(80, __c10, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-token-balance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTokenBalanceInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          transactionHash: S.optional(S.String),
          transactionId: S.optional(S.String),
          network: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/get-transaction" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTransactionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          network: S.String,
          blockHash: S.optional(S.String),
          transactionHash: S.String,
          blockNumber: S.optional(S.String),
          transactionTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          transactionIndex: S.Number,
          numberOfTransactions: S.Number,
          to: S.String,
          from: S.optional(S.String),
          contractAddress: S.optional(S.String),
          gasUsed: S.optional(S.String),
          cumulativeGasUsed: S.optional(S.String),
          effectiveGasPrice: S.optional(S.String),
          signatureV: S.optional(S.Number),
          signatureR: S.optional(S.String),
          signatureS: S.optional(S.String),
          transactionFee: S.optional(S.String),
          transactionId: S.optional(S.String),
          confirmationStatus: S.optional(S.String),
          executionStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Transaction" });
    case 2:
      return S.suspend(() => S.Struct({ transaction: __S(121, __c15, 1) })).annotate({
        identifier: "GetTransactionOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
