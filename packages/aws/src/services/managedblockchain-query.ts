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
  sdkId: "ManagedBlockchain Query",
  target: "TietonChainQueryService",
  version: "2023-05-04",
  sigv4: "managedblockchain-query",
  protocol: restJson1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://managedblockchain-query.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://managedblockchain-query.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
  descriptor: {
    service: svc,
    http: "POST /batch-get-token-balance",
    input: {
      getTokenBalanceInputs: D.list({
        tokenIdentifier: i_TokenIdentifier,
        ownerIdentifier: i_OwnerIdentifier,
        atBlockchainInstant: i_BlockchainInstant,
      }),
    },
    output: {
      tokenBalances: D.list({
        atBlockchainInstant: o_BlockchainInstant,
        lastUpdatedTime: o_BlockchainInstant,
      }),
      errors: D.list({ atBlockchainInstant: o_BlockchainInstant }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-asset-contract",
    input: { contractIdentifier: { network: 0, contractAddress: 0 } },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-token-balance",
    input: {
      tokenIdentifier: i_TokenIdentifier,
      ownerIdentifier: i_OwnerIdentifier,
      atBlockchainInstant: i_BlockchainInstant,
    },
    output: {
      atBlockchainInstant: o_BlockchainInstant,
      lastUpdatedTime: o_BlockchainInstant,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-transaction",
    input: { transactionHash: 0, transactionId: 0, network: 0 },
    output: { transaction: { transactionTimestamp: D.ts } },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /list-asset-contracts",
    input: {
      contractFilter: { network: 0, tokenStandard: 0, deployerAddress: 0 },
      nextToken: 0,
      maxResults: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-filtered-transaction-events",
    input: {
      network: 0,
      addressIdentifierFilter: { transactionEventToAddress: 0 },
      timeFilter: { from: i_BlockchainInstant, to: i_BlockchainInstant },
      voutFilter: { voutSpent: 0 },
      confirmationStatusFilter: i_ConfirmationStatusFilter,
      sort: { sortBy: 0, sortOrder: 0 },
      nextToken: 0,
      maxResults: 0,
    },
    output: { events: D.list(o_TransactionEvent) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-token-balances",
    input: {
      ownerFilter: { address: 0 },
      tokenFilter: { network: 0, contractAddress: 0, tokenId: 0 },
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      tokenBalances: D.list({
        atBlockchainInstant: o_BlockchainInstant,
        lastUpdatedTime: o_BlockchainInstant,
      }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-transaction-events",
    input: {
      transactionHash: 0,
      transactionId: 0,
      network: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { events: D.list(o_TransactionEvent) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-transactions",
    input: {
      address: 0,
      network: 0,
      fromBlockchainInstant: i_BlockchainInstant,
      toBlockchainInstant: i_BlockchainInstant,
      sort: { sortBy: 0, sortOrder: 0 },
      nextToken: 0,
      maxResults: 0,
      confirmationStatusFilter: i_ConfirmationStatusFilter,
    },
    output: { transactions: D.list({ transactionTimestamp: D.ts }) },
    body: true,
  },
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

const i_BlockchainInstant: D.LazyStruct = () => ({ time: 0 });
const i_ConfirmationStatusFilter: D.LazyStruct = () => ({ include: 0 });
const i_OwnerIdentifier: D.LazyStruct = () => ({ address: 0 });
const i_TokenIdentifier: D.LazyStruct = () => ({
  network: 0,
  contractAddress: 0,
  tokenId: 0,
});
const o_BlockchainInstant: D.LazyStruct = () => ({ time: D.ts });
const o_TransactionEvent: D.LazyStruct = () => ({
  blockchainInstant: o_BlockchainInstant,
});
