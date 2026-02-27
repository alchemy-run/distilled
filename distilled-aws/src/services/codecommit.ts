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
const ns = T.XmlNamespace("http://codecommit.amazonaws.com/doc/2015-04-13");
const svc = T.AwsApiService({
  sdkId: "CodeCommit",
  serviceShapeName: "CodeCommit_20150413",
});
const auth = T.AwsAuthSigv4({ name: "codecommit" });
const ver = T.ServiceVersion("2015-04-13");
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
              `https://codecommit-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://codecommit-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codecommit.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://codecommit.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type ApprovalRuleTemplateName = string;
export type RepositoryName = string;
export type Message = string;
export type ErrorCode = string;
export type ErrorMessage = string;
export type CommitName = string;
export type MaxResults = number;
export type Path = string;
export type NextToken = string;
export type FileSize = number;
export type NumberOfConflicts = number;
export type CapitalBoolean = boolean;
export type IsContentConflict = boolean;
export type IsFileModeConflict = boolean;
export type IsObjectTypeConflict = boolean;
export type IsHunkConflict = boolean;
export type LineNumber = number;
export type HunkContent = string;
export type ExceptionName = string;
export type ObjectId = string;
export type Name = string;
export type Email = string;
export type AdditionalData = string;
export type AccountId = string;
export type RepositoryId = string;
export type RepositoryDescription = string;
export type BranchName = string;
export type LastModifiedDate = Date;
export type CreationDate = Date;
export type CloneUrlHttp = string;
export type CloneUrlSsh = string;
export type Arn = string;
export type KmsKeyId = string;
export type ApprovalRuleTemplateContent = string;
export type ApprovalRuleTemplateDescription = string;
export type ApprovalRuleTemplateId = string;
export type RuleContentSha256 = string;
export type CommitId = string;
export type KeepEmptyFolders = boolean;
export type FileContent = Uint8Array;
export type IsMove = boolean;
export type Title = string;
export type Description = string;
export type ReferenceName = string;
export type ClientRequestToken = string;
export type PullRequestId = string;
export type IsMerged = boolean;
export type RevisionId = string;
export type ApprovalRuleId = string;
export type ApprovalRuleName = string;
export type ApprovalRuleContent = string;
export type TagKey = string;
export type TagValue = string;
export type CommentId = string;
export type Content = string;
export type IsCommentDeleted = boolean;
export type ReactionValue = string;
export type Count = number;
export type EventDate = Date;
export type Approved = boolean;
export type Overridden = boolean;
export type ReactionEmoji = string;
export type ReactionShortCode = string;
export type ReactionUnicode = string;
export type Position = number;
export type Limit = number;
export type Mode = string;
export type ObjectSize = number;
export type IsMergeable = boolean;
export type RepositoryTriggersConfigurationId = string;
export type RepositoryTriggerName = string;
export type RepositoryTriggerCustomData = string;
export type ResourceArn = string;
export type RepositoryTriggerExecutionFailureMessage = string;

//# Schemas
export interface AssociateApprovalRuleTemplateWithRepositoryInput {
  approvalRuleTemplateName: string;
  repositoryName: string;
}
export const AssociateApprovalRuleTemplateWithRepositoryInput = S.suspend(() =>
  S.Struct({
    approvalRuleTemplateName: S.String,
    repositoryName: S.String,
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
  identifier: "AssociateApprovalRuleTemplateWithRepositoryInput",
}) as any as S.Schema<AssociateApprovalRuleTemplateWithRepositoryInput>;
export interface AssociateApprovalRuleTemplateWithRepositoryResponse {}
export const AssociateApprovalRuleTemplateWithRepositoryResponse = S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "AssociateApprovalRuleTemplateWithRepositoryResponse",
}) as any as S.Schema<AssociateApprovalRuleTemplateWithRepositoryResponse>;
export type RepositoryNameList = string[];
export const RepositoryNameList = S.Array(S.String);
export interface BatchAssociateApprovalRuleTemplateWithRepositoriesInput {
  approvalRuleTemplateName: string;
  repositoryNames: string[];
}
export const BatchAssociateApprovalRuleTemplateWithRepositoriesInput =
  S.suspend(() =>
    S.Struct({
      approvalRuleTemplateName: S.String,
      repositoryNames: RepositoryNameList,
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
    identifier: "BatchAssociateApprovalRuleTemplateWithRepositoriesInput",
  }) as any as S.Schema<BatchAssociateApprovalRuleTemplateWithRepositoriesInput>;
export interface BatchAssociateApprovalRuleTemplateWithRepositoriesError {
  repositoryName?: string;
  errorCode?: string;
  errorMessage?: string;
}
export const BatchAssociateApprovalRuleTemplateWithRepositoriesError =
  S.suspend(() =>
    S.Struct({
      repositoryName: S.optional(S.String),
      errorCode: S.optional(S.String),
      errorMessage: S.optional(S.String),
    }),
  ).annotate({
    identifier: "BatchAssociateApprovalRuleTemplateWithRepositoriesError",
  }) as any as S.Schema<BatchAssociateApprovalRuleTemplateWithRepositoriesError>;
export type BatchAssociateApprovalRuleTemplateWithRepositoriesErrorsList =
  BatchAssociateApprovalRuleTemplateWithRepositoriesError[];
export const BatchAssociateApprovalRuleTemplateWithRepositoriesErrorsList =
  S.Array(BatchAssociateApprovalRuleTemplateWithRepositoriesError);
export interface BatchAssociateApprovalRuleTemplateWithRepositoriesOutput {
  associatedRepositoryNames: string[];
  errors: BatchAssociateApprovalRuleTemplateWithRepositoriesError[];
}
export const BatchAssociateApprovalRuleTemplateWithRepositoriesOutput =
  S.suspend(() =>
    S.Struct({
      associatedRepositoryNames: RepositoryNameList,
      errors: BatchAssociateApprovalRuleTemplateWithRepositoriesErrorsList,
    }).pipe(ns),
  ).annotate({
    identifier: "BatchAssociateApprovalRuleTemplateWithRepositoriesOutput",
  }) as any as S.Schema<BatchAssociateApprovalRuleTemplateWithRepositoriesOutput>;
export type MergeOptionTypeEnum =
  | "FAST_FORWARD_MERGE"
  | "SQUASH_MERGE"
  | "THREE_WAY_MERGE"
  | (string & {});
export const MergeOptionTypeEnum = S.String;
export type FilePaths = string[];
export const FilePaths = S.Array(S.String);
export type ConflictDetailLevelTypeEnum =
  | "FILE_LEVEL"
  | "LINE_LEVEL"
  | (string & {});
export const ConflictDetailLevelTypeEnum = S.String;
export type ConflictResolutionStrategyTypeEnum =
  | "NONE"
  | "ACCEPT_SOURCE"
  | "ACCEPT_DESTINATION"
  | "AUTOMERGE"
  | (string & {});
export const ConflictResolutionStrategyTypeEnum = S.String;
export interface BatchDescribeMergeConflictsInput {
  repositoryName: string;
  destinationCommitSpecifier: string;
  sourceCommitSpecifier: string;
  mergeOption: MergeOptionTypeEnum;
  maxMergeHunks?: number;
  maxConflictFiles?: number;
  filePaths?: string[];
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  nextToken?: string;
}
export const BatchDescribeMergeConflictsInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    destinationCommitSpecifier: S.String,
    sourceCommitSpecifier: S.String,
    mergeOption: MergeOptionTypeEnum,
    maxMergeHunks: S.optional(S.Number),
    maxConflictFiles: S.optional(S.Number),
    filePaths: S.optional(FilePaths),
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    nextToken: S.optional(S.String),
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
  identifier: "BatchDescribeMergeConflictsInput",
}) as any as S.Schema<BatchDescribeMergeConflictsInput>;
export interface FileSizes {
  source?: number;
  destination?: number;
  base?: number;
}
export const FileSizes = S.suspend(() =>
  S.Struct({
    source: S.optional(S.Number),
    destination: S.optional(S.Number),
    base: S.optional(S.Number),
  }),
).annotate({ identifier: "FileSizes" }) as any as S.Schema<FileSizes>;
export type FileModeTypeEnum =
  | "EXECUTABLE"
  | "NORMAL"
  | "SYMLINK"
  | (string & {});
export const FileModeTypeEnum = S.String;
export interface FileModes {
  source?: FileModeTypeEnum;
  destination?: FileModeTypeEnum;
  base?: FileModeTypeEnum;
}
export const FileModes = S.suspend(() =>
  S.Struct({
    source: S.optional(FileModeTypeEnum),
    destination: S.optional(FileModeTypeEnum),
    base: S.optional(FileModeTypeEnum),
  }),
).annotate({ identifier: "FileModes" }) as any as S.Schema<FileModes>;
export type ObjectTypeEnum =
  | "FILE"
  | "DIRECTORY"
  | "GIT_LINK"
  | "SYMBOLIC_LINK"
  | (string & {});
export const ObjectTypeEnum = S.String;
export interface ObjectTypes {
  source?: ObjectTypeEnum;
  destination?: ObjectTypeEnum;
  base?: ObjectTypeEnum;
}
export const ObjectTypes = S.suspend(() =>
  S.Struct({
    source: S.optional(ObjectTypeEnum),
    destination: S.optional(ObjectTypeEnum),
    base: S.optional(ObjectTypeEnum),
  }),
).annotate({ identifier: "ObjectTypes" }) as any as S.Schema<ObjectTypes>;
export interface IsBinaryFile {
  source?: boolean;
  destination?: boolean;
  base?: boolean;
}
export const IsBinaryFile = S.suspend(() =>
  S.Struct({
    source: S.optional(S.Boolean),
    destination: S.optional(S.Boolean),
    base: S.optional(S.Boolean),
  }),
).annotate({ identifier: "IsBinaryFile" }) as any as S.Schema<IsBinaryFile>;
export type ChangeTypeEnum = "A" | "M" | "D" | (string & {});
export const ChangeTypeEnum = S.String;
export interface MergeOperations {
  source?: ChangeTypeEnum;
  destination?: ChangeTypeEnum;
}
export const MergeOperations = S.suspend(() =>
  S.Struct({
    source: S.optional(ChangeTypeEnum),
    destination: S.optional(ChangeTypeEnum),
  }),
).annotate({
  identifier: "MergeOperations",
}) as any as S.Schema<MergeOperations>;
export interface ConflictMetadata {
  filePath?: string;
  fileSizes?: FileSizes;
  fileModes?: FileModes;
  objectTypes?: ObjectTypes;
  numberOfConflicts?: number;
  isBinaryFile?: IsBinaryFile;
  contentConflict?: boolean;
  fileModeConflict?: boolean;
  objectTypeConflict?: boolean;
  mergeOperations?: MergeOperations;
}
export const ConflictMetadata = S.suspend(() =>
  S.Struct({
    filePath: S.optional(S.String),
    fileSizes: S.optional(FileSizes),
    fileModes: S.optional(FileModes),
    objectTypes: S.optional(ObjectTypes),
    numberOfConflicts: S.optional(S.Number),
    isBinaryFile: S.optional(IsBinaryFile),
    contentConflict: S.optional(S.Boolean),
    fileModeConflict: S.optional(S.Boolean),
    objectTypeConflict: S.optional(S.Boolean),
    mergeOperations: S.optional(MergeOperations),
  }),
).annotate({
  identifier: "ConflictMetadata",
}) as any as S.Schema<ConflictMetadata>;
export interface MergeHunkDetail {
  startLine?: number;
  endLine?: number;
  hunkContent?: string;
}
export const MergeHunkDetail = S.suspend(() =>
  S.Struct({
    startLine: S.optional(S.Number),
    endLine: S.optional(S.Number),
    hunkContent: S.optional(S.String),
  }),
).annotate({
  identifier: "MergeHunkDetail",
}) as any as S.Schema<MergeHunkDetail>;
export interface MergeHunk {
  isConflict?: boolean;
  source?: MergeHunkDetail;
  destination?: MergeHunkDetail;
  base?: MergeHunkDetail;
}
export const MergeHunk = S.suspend(() =>
  S.Struct({
    isConflict: S.optional(S.Boolean),
    source: S.optional(MergeHunkDetail),
    destination: S.optional(MergeHunkDetail),
    base: S.optional(MergeHunkDetail),
  }),
).annotate({ identifier: "MergeHunk" }) as any as S.Schema<MergeHunk>;
export type MergeHunks = MergeHunk[];
export const MergeHunks = S.Array(MergeHunk);
export interface Conflict {
  conflictMetadata?: ConflictMetadata;
  mergeHunks?: MergeHunk[];
}
export const Conflict = S.suspend(() =>
  S.Struct({
    conflictMetadata: S.optional(ConflictMetadata),
    mergeHunks: S.optional(MergeHunks),
  }),
).annotate({ identifier: "Conflict" }) as any as S.Schema<Conflict>;
export type Conflicts = Conflict[];
export const Conflicts = S.Array(Conflict);
export interface BatchDescribeMergeConflictsError {
  filePath: string;
  exceptionName: string;
  message: string;
}
export const BatchDescribeMergeConflictsError = S.suspend(() =>
  S.Struct({ filePath: S.String, exceptionName: S.String, message: S.String }),
).annotate({
  identifier: "BatchDescribeMergeConflictsError",
}) as any as S.Schema<BatchDescribeMergeConflictsError>;
export type BatchDescribeMergeConflictsErrors =
  BatchDescribeMergeConflictsError[];
export const BatchDescribeMergeConflictsErrors = S.Array(
  BatchDescribeMergeConflictsError,
);
export interface BatchDescribeMergeConflictsOutput {
  conflicts: Conflict[];
  nextToken?: string;
  errors?: BatchDescribeMergeConflictsError[];
  destinationCommitId: string;
  sourceCommitId: string;
  baseCommitId?: string;
}
export const BatchDescribeMergeConflictsOutput = S.suspend(() =>
  S.Struct({
    conflicts: Conflicts,
    nextToken: S.optional(S.String),
    errors: S.optional(BatchDescribeMergeConflictsErrors),
    destinationCommitId: S.String,
    sourceCommitId: S.String,
    baseCommitId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "BatchDescribeMergeConflictsOutput",
}) as any as S.Schema<BatchDescribeMergeConflictsOutput>;
export interface BatchDisassociateApprovalRuleTemplateFromRepositoriesInput {
  approvalRuleTemplateName: string;
  repositoryNames: string[];
}
export const BatchDisassociateApprovalRuleTemplateFromRepositoriesInput =
  S.suspend(() =>
    S.Struct({
      approvalRuleTemplateName: S.String,
      repositoryNames: RepositoryNameList,
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
    identifier: "BatchDisassociateApprovalRuleTemplateFromRepositoriesInput",
  }) as any as S.Schema<BatchDisassociateApprovalRuleTemplateFromRepositoriesInput>;
export interface BatchDisassociateApprovalRuleTemplateFromRepositoriesError {
  repositoryName?: string;
  errorCode?: string;
  errorMessage?: string;
}
export const BatchDisassociateApprovalRuleTemplateFromRepositoriesError =
  S.suspend(() =>
    S.Struct({
      repositoryName: S.optional(S.String),
      errorCode: S.optional(S.String),
      errorMessage: S.optional(S.String),
    }),
  ).annotate({
    identifier: "BatchDisassociateApprovalRuleTemplateFromRepositoriesError",
  }) as any as S.Schema<BatchDisassociateApprovalRuleTemplateFromRepositoriesError>;
export type BatchDisassociateApprovalRuleTemplateFromRepositoriesErrorsList =
  BatchDisassociateApprovalRuleTemplateFromRepositoriesError[];
export const BatchDisassociateApprovalRuleTemplateFromRepositoriesErrorsList =
  S.Array(BatchDisassociateApprovalRuleTemplateFromRepositoriesError);
export interface BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput {
  disassociatedRepositoryNames: string[];
  errors: BatchDisassociateApprovalRuleTemplateFromRepositoriesError[];
}
export const BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput =
  S.suspend(() =>
    S.Struct({
      disassociatedRepositoryNames: RepositoryNameList,
      errors: BatchDisassociateApprovalRuleTemplateFromRepositoriesErrorsList,
    }).pipe(ns),
  ).annotate({
    identifier: "BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput",
  }) as any as S.Schema<BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput>;
export type CommitIdsInputList = string[];
export const CommitIdsInputList = S.Array(S.String);
export interface BatchGetCommitsInput {
  commitIds: string[];
  repositoryName: string;
}
export const BatchGetCommitsInput = S.suspend(() =>
  S.Struct({ commitIds: CommitIdsInputList, repositoryName: S.String }).pipe(
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
  identifier: "BatchGetCommitsInput",
}) as any as S.Schema<BatchGetCommitsInput>;
export type ParentList = string[];
export const ParentList = S.Array(S.String);
export interface UserInfo {
  name?: string;
  email?: string;
  date?: string;
}
export const UserInfo = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    email: S.optional(S.String),
    date: S.optional(S.String),
  }),
).annotate({ identifier: "UserInfo" }) as any as S.Schema<UserInfo>;
export interface Commit {
  commitId?: string;
  treeId?: string;
  parents?: string[];
  message?: string;
  author?: UserInfo;
  committer?: UserInfo;
  additionalData?: string;
}
export const Commit = S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
    parents: S.optional(ParentList),
    message: S.optional(S.String),
    author: S.optional(UserInfo),
    committer: S.optional(UserInfo),
    additionalData: S.optional(S.String),
  }),
).annotate({ identifier: "Commit" }) as any as S.Schema<Commit>;
export type CommitObjectsList = Commit[];
export const CommitObjectsList = S.Array(Commit);
export interface BatchGetCommitsError {
  commitId?: string;
  errorCode?: string;
  errorMessage?: string;
}
export const BatchGetCommitsError = S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    errorCode: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetCommitsError",
}) as any as S.Schema<BatchGetCommitsError>;
export type BatchGetCommitsErrorsList = BatchGetCommitsError[];
export const BatchGetCommitsErrorsList = S.Array(BatchGetCommitsError);
export interface BatchGetCommitsOutput {
  commits?: Commit[];
  errors?: BatchGetCommitsError[];
}
export const BatchGetCommitsOutput = S.suspend(() =>
  S.Struct({
    commits: S.optional(CommitObjectsList),
    errors: S.optional(BatchGetCommitsErrorsList),
  }).pipe(ns),
).annotate({
  identifier: "BatchGetCommitsOutput",
}) as any as S.Schema<BatchGetCommitsOutput>;
export interface BatchGetRepositoriesInput {
  repositoryNames: string[];
}
export const BatchGetRepositoriesInput = S.suspend(() =>
  S.Struct({ repositoryNames: RepositoryNameList }).pipe(
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
  identifier: "BatchGetRepositoriesInput",
}) as any as S.Schema<BatchGetRepositoriesInput>;
export interface RepositoryMetadata {
  accountId?: string;
  repositoryId?: string;
  repositoryName?: string;
  repositoryDescription?: string;
  defaultBranch?: string;
  lastModifiedDate?: Date;
  creationDate?: Date;
  cloneUrlHttp?: string;
  cloneUrlSsh?: string;
  Arn?: string;
  kmsKeyId?: string;
}
export const RepositoryMetadata = S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    repositoryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    repositoryDescription: S.optional(S.String),
    defaultBranch: S.optional(S.String),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    cloneUrlHttp: S.optional(S.String),
    cloneUrlSsh: S.optional(S.String),
    Arn: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "RepositoryMetadata",
}) as any as S.Schema<RepositoryMetadata>;
export type RepositoryMetadataList = RepositoryMetadata[];
export const RepositoryMetadataList = S.Array(RepositoryMetadata);
export type RepositoryNotFoundList = string[];
export const RepositoryNotFoundList = S.Array(S.String);
export type BatchGetRepositoriesErrorCodeEnum =
  | "EncryptionIntegrityChecksFailedException"
  | "EncryptionKeyAccessDeniedException"
  | "EncryptionKeyDisabledException"
  | "EncryptionKeyNotFoundException"
  | "EncryptionKeyUnavailableException"
  | "RepositoryDoesNotExistException"
  | (string & {});
export const BatchGetRepositoriesErrorCodeEnum = S.String;
export interface BatchGetRepositoriesError {
  repositoryId?: string;
  repositoryName?: string;
  errorCode?: BatchGetRepositoriesErrorCodeEnum;
  errorMessage?: string;
}
export const BatchGetRepositoriesError = S.suspend(() =>
  S.Struct({
    repositoryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    errorCode: S.optional(BatchGetRepositoriesErrorCodeEnum),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetRepositoriesError",
}) as any as S.Schema<BatchGetRepositoriesError>;
export type BatchGetRepositoriesErrorsList = BatchGetRepositoriesError[];
export const BatchGetRepositoriesErrorsList = S.Array(
  BatchGetRepositoriesError,
);
export interface BatchGetRepositoriesOutput {
  repositories?: RepositoryMetadata[];
  repositoriesNotFound?: string[];
  errors?: BatchGetRepositoriesError[];
}
export const BatchGetRepositoriesOutput = S.suspend(() =>
  S.Struct({
    repositories: S.optional(RepositoryMetadataList),
    repositoriesNotFound: S.optional(RepositoryNotFoundList),
    errors: S.optional(BatchGetRepositoriesErrorsList),
  }).pipe(ns),
).annotate({
  identifier: "BatchGetRepositoriesOutput",
}) as any as S.Schema<BatchGetRepositoriesOutput>;
export interface CreateApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
  approvalRuleTemplateContent: string;
  approvalRuleTemplateDescription?: string;
}
export const CreateApprovalRuleTemplateInput = S.suspend(() =>
  S.Struct({
    approvalRuleTemplateName: S.String,
    approvalRuleTemplateContent: S.String,
    approvalRuleTemplateDescription: S.optional(S.String),
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
  identifier: "CreateApprovalRuleTemplateInput",
}) as any as S.Schema<CreateApprovalRuleTemplateInput>;
export interface ApprovalRuleTemplate {
  approvalRuleTemplateId?: string;
  approvalRuleTemplateName?: string;
  approvalRuleTemplateDescription?: string;
  approvalRuleTemplateContent?: string;
  ruleContentSha256?: string;
  lastModifiedDate?: Date;
  creationDate?: Date;
  lastModifiedUser?: string;
}
export const ApprovalRuleTemplate = S.suspend(() =>
  S.Struct({
    approvalRuleTemplateId: S.optional(S.String),
    approvalRuleTemplateName: S.optional(S.String),
    approvalRuleTemplateDescription: S.optional(S.String),
    approvalRuleTemplateContent: S.optional(S.String),
    ruleContentSha256: S.optional(S.String),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedUser: S.optional(S.String),
  }),
).annotate({
  identifier: "ApprovalRuleTemplate",
}) as any as S.Schema<ApprovalRuleTemplate>;
export interface CreateApprovalRuleTemplateOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export const CreateApprovalRuleTemplateOutput = S.suspend(() =>
  S.Struct({ approvalRuleTemplate: ApprovalRuleTemplate }).pipe(ns),
).annotate({
  identifier: "CreateApprovalRuleTemplateOutput",
}) as any as S.Schema<CreateApprovalRuleTemplateOutput>;
export interface CreateBranchInput {
  repositoryName: string;
  branchName: string;
  commitId: string;
}
export const CreateBranchInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    branchName: S.String,
    commitId: S.String,
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
  identifier: "CreateBranchInput",
}) as any as S.Schema<CreateBranchInput>;
export interface CreateBranchResponse {}
export const CreateBranchResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateBranchResponse",
}) as any as S.Schema<CreateBranchResponse>;
export interface SourceFileSpecifier {
  filePath: string;
  isMove?: boolean;
}
export const SourceFileSpecifier = S.suspend(() =>
  S.Struct({ filePath: S.String, isMove: S.optional(S.Boolean) }),
).annotate({
  identifier: "SourceFileSpecifier",
}) as any as S.Schema<SourceFileSpecifier>;
export interface PutFileEntry {
  filePath: string;
  fileMode?: FileModeTypeEnum;
  fileContent?: Uint8Array;
  sourceFile?: SourceFileSpecifier;
}
export const PutFileEntry = S.suspend(() =>
  S.Struct({
    filePath: S.String,
    fileMode: S.optional(FileModeTypeEnum),
    fileContent: S.optional(T.Blob),
    sourceFile: S.optional(SourceFileSpecifier),
  }),
).annotate({ identifier: "PutFileEntry" }) as any as S.Schema<PutFileEntry>;
export type PutFileEntries = PutFileEntry[];
export const PutFileEntries = S.Array(PutFileEntry);
export interface DeleteFileEntry {
  filePath: string;
}
export const DeleteFileEntry = S.suspend(() =>
  S.Struct({ filePath: S.String }),
).annotate({
  identifier: "DeleteFileEntry",
}) as any as S.Schema<DeleteFileEntry>;
export type DeleteFileEntries = DeleteFileEntry[];
export const DeleteFileEntries = S.Array(DeleteFileEntry);
export interface SetFileModeEntry {
  filePath: string;
  fileMode: FileModeTypeEnum;
}
export const SetFileModeEntry = S.suspend(() =>
  S.Struct({ filePath: S.String, fileMode: FileModeTypeEnum }),
).annotate({
  identifier: "SetFileModeEntry",
}) as any as S.Schema<SetFileModeEntry>;
export type SetFileModeEntries = SetFileModeEntry[];
export const SetFileModeEntries = S.Array(SetFileModeEntry);
export interface CreateCommitInput {
  repositoryName: string;
  branchName: string;
  parentCommitId?: string;
  authorName?: string;
  email?: string;
  commitMessage?: string;
  keepEmptyFolders?: boolean;
  putFiles?: PutFileEntry[];
  deleteFiles?: DeleteFileEntry[];
  setFileModes?: SetFileModeEntry[];
}
export const CreateCommitInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    branchName: S.String,
    parentCommitId: S.optional(S.String),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    commitMessage: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    putFiles: S.optional(PutFileEntries),
    deleteFiles: S.optional(DeleteFileEntries),
    setFileModes: S.optional(SetFileModeEntries),
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
  identifier: "CreateCommitInput",
}) as any as S.Schema<CreateCommitInput>;
export interface FileMetadata {
  absolutePath?: string;
  blobId?: string;
  fileMode?: FileModeTypeEnum;
}
export const FileMetadata = S.suspend(() =>
  S.Struct({
    absolutePath: S.optional(S.String),
    blobId: S.optional(S.String),
    fileMode: S.optional(FileModeTypeEnum),
  }),
).annotate({ identifier: "FileMetadata" }) as any as S.Schema<FileMetadata>;
export type FilesMetadata = FileMetadata[];
export const FilesMetadata = S.Array(FileMetadata);
export interface CreateCommitOutput {
  commitId?: string;
  treeId?: string;
  filesAdded?: FileMetadata[];
  filesUpdated?: FileMetadata[];
  filesDeleted?: FileMetadata[];
}
export const CreateCommitOutput = S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
    filesAdded: S.optional(FilesMetadata),
    filesUpdated: S.optional(FilesMetadata),
    filesDeleted: S.optional(FilesMetadata),
  }).pipe(ns),
).annotate({
  identifier: "CreateCommitOutput",
}) as any as S.Schema<CreateCommitOutput>;
export interface Target {
  repositoryName: string;
  sourceReference: string;
  destinationReference?: string;
}
export const Target = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceReference: S.String,
    destinationReference: S.optional(S.String),
  }),
).annotate({ identifier: "Target" }) as any as S.Schema<Target>;
export type TargetList = Target[];
export const TargetList = S.Array(Target);
export interface CreatePullRequestInput {
  title: string;
  description?: string;
  targets: Target[];
  clientRequestToken?: string;
}
export const CreatePullRequestInput = S.suspend(() =>
  S.Struct({
    title: S.String,
    description: S.optional(S.String),
    targets: TargetList,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
  identifier: "CreatePullRequestInput",
}) as any as S.Schema<CreatePullRequestInput>;
export type PullRequestStatusEnum = "OPEN" | "CLOSED" | (string & {});
export const PullRequestStatusEnum = S.String;
export interface MergeMetadata {
  isMerged?: boolean;
  mergedBy?: string;
  mergeCommitId?: string;
  mergeOption?: MergeOptionTypeEnum;
}
export const MergeMetadata = S.suspend(() =>
  S.Struct({
    isMerged: S.optional(S.Boolean),
    mergedBy: S.optional(S.String),
    mergeCommitId: S.optional(S.String),
    mergeOption: S.optional(MergeOptionTypeEnum),
  }),
).annotate({ identifier: "MergeMetadata" }) as any as S.Schema<MergeMetadata>;
export interface PullRequestTarget {
  repositoryName?: string;
  sourceReference?: string;
  destinationReference?: string;
  destinationCommit?: string;
  sourceCommit?: string;
  mergeBase?: string;
  mergeMetadata?: MergeMetadata;
}
export const PullRequestTarget = S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    sourceReference: S.optional(S.String),
    destinationReference: S.optional(S.String),
    destinationCommit: S.optional(S.String),
    sourceCommit: S.optional(S.String),
    mergeBase: S.optional(S.String),
    mergeMetadata: S.optional(MergeMetadata),
  }),
).annotate({
  identifier: "PullRequestTarget",
}) as any as S.Schema<PullRequestTarget>;
export type PullRequestTargetList = PullRequestTarget[];
export const PullRequestTargetList = S.Array(PullRequestTarget);
export interface OriginApprovalRuleTemplate {
  approvalRuleTemplateId?: string;
  approvalRuleTemplateName?: string;
}
export const OriginApprovalRuleTemplate = S.suspend(() =>
  S.Struct({
    approvalRuleTemplateId: S.optional(S.String),
    approvalRuleTemplateName: S.optional(S.String),
  }),
).annotate({
  identifier: "OriginApprovalRuleTemplate",
}) as any as S.Schema<OriginApprovalRuleTemplate>;
export interface ApprovalRule {
  approvalRuleId?: string;
  approvalRuleName?: string;
  approvalRuleContent?: string;
  ruleContentSha256?: string;
  lastModifiedDate?: Date;
  creationDate?: Date;
  lastModifiedUser?: string;
  originApprovalRuleTemplate?: OriginApprovalRuleTemplate;
}
export const ApprovalRule = S.suspend(() =>
  S.Struct({
    approvalRuleId: S.optional(S.String),
    approvalRuleName: S.optional(S.String),
    approvalRuleContent: S.optional(S.String),
    ruleContentSha256: S.optional(S.String),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedUser: S.optional(S.String),
    originApprovalRuleTemplate: S.optional(OriginApprovalRuleTemplate),
  }),
).annotate({ identifier: "ApprovalRule" }) as any as S.Schema<ApprovalRule>;
export type ApprovalRulesList = ApprovalRule[];
export const ApprovalRulesList = S.Array(ApprovalRule);
export interface PullRequest {
  pullRequestId?: string;
  title?: string;
  description?: string;
  lastActivityDate?: Date;
  creationDate?: Date;
  pullRequestStatus?: PullRequestStatusEnum;
  authorArn?: string;
  pullRequestTargets?: PullRequestTarget[];
  clientRequestToken?: string;
  revisionId?: string;
  approvalRules?: ApprovalRule[];
}
export const PullRequest = S.suspend(() =>
  S.Struct({
    pullRequestId: S.optional(S.String),
    title: S.optional(S.String),
    description: S.optional(S.String),
    lastActivityDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    pullRequestStatus: S.optional(PullRequestStatusEnum),
    authorArn: S.optional(S.String),
    pullRequestTargets: S.optional(PullRequestTargetList),
    clientRequestToken: S.optional(S.String),
    revisionId: S.optional(S.String),
    approvalRules: S.optional(ApprovalRulesList),
  }),
).annotate({ identifier: "PullRequest" }) as any as S.Schema<PullRequest>;
export interface CreatePullRequestOutput {
  pullRequest: PullRequest;
}
export const CreatePullRequestOutput = S.suspend(() =>
  S.Struct({ pullRequest: PullRequest }).pipe(ns),
).annotate({
  identifier: "CreatePullRequestOutput",
}) as any as S.Schema<CreatePullRequestOutput>;
export interface CreatePullRequestApprovalRuleInput {
  pullRequestId: string;
  approvalRuleName: string;
  approvalRuleContent: string;
}
export const CreatePullRequestApprovalRuleInput = S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    approvalRuleName: S.String,
    approvalRuleContent: S.String,
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
  identifier: "CreatePullRequestApprovalRuleInput",
}) as any as S.Schema<CreatePullRequestApprovalRuleInput>;
export interface CreatePullRequestApprovalRuleOutput {
  approvalRule: ApprovalRule;
}
export const CreatePullRequestApprovalRuleOutput = S.suspend(() =>
  S.Struct({ approvalRule: ApprovalRule }).pipe(ns),
).annotate({
  identifier: "CreatePullRequestApprovalRuleOutput",
}) as any as S.Schema<CreatePullRequestApprovalRuleOutput>;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = S.Record(S.String, S.String.pipe(S.optional));
export interface CreateRepositoryInput {
  repositoryName: string;
  repositoryDescription?: string;
  tags?: { [key: string]: string | undefined };
  kmsKeyId?: string;
}
export const CreateRepositoryInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    repositoryDescription: S.optional(S.String),
    tags: S.optional(TagsMap),
    kmsKeyId: S.optional(S.String),
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
  identifier: "CreateRepositoryInput",
}) as any as S.Schema<CreateRepositoryInput>;
export interface CreateRepositoryOutput {
  repositoryMetadata?: RepositoryMetadata;
}
export const CreateRepositoryOutput = S.suspend(() =>
  S.Struct({ repositoryMetadata: S.optional(RepositoryMetadata) }).pipe(ns),
).annotate({
  identifier: "CreateRepositoryOutput",
}) as any as S.Schema<CreateRepositoryOutput>;
export type ReplacementTypeEnum =
  | "KEEP_BASE"
  | "KEEP_SOURCE"
  | "KEEP_DESTINATION"
  | "USE_NEW_CONTENT"
  | (string & {});
export const ReplacementTypeEnum = S.String;
export interface ReplaceContentEntry {
  filePath: string;
  replacementType: ReplacementTypeEnum;
  content?: Uint8Array;
  fileMode?: FileModeTypeEnum;
}
export const ReplaceContentEntry = S.suspend(() =>
  S.Struct({
    filePath: S.String,
    replacementType: ReplacementTypeEnum,
    content: S.optional(T.Blob),
    fileMode: S.optional(FileModeTypeEnum),
  }),
).annotate({
  identifier: "ReplaceContentEntry",
}) as any as S.Schema<ReplaceContentEntry>;
export type ReplaceContentEntries = ReplaceContentEntry[];
export const ReplaceContentEntries = S.Array(ReplaceContentEntry);
export interface ConflictResolution {
  replaceContents?: ReplaceContentEntry[];
  deleteFiles?: DeleteFileEntry[];
  setFileModes?: SetFileModeEntry[];
}
export const ConflictResolution = S.suspend(() =>
  S.Struct({
    replaceContents: S.optional(ReplaceContentEntries),
    deleteFiles: S.optional(DeleteFileEntries),
    setFileModes: S.optional(SetFileModeEntries),
  }),
).annotate({
  identifier: "ConflictResolution",
}) as any as S.Schema<ConflictResolution>;
export interface CreateUnreferencedMergeCommitInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  mergeOption: MergeOptionTypeEnum;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  authorName?: string;
  email?: string;
  commitMessage?: string;
  keepEmptyFolders?: boolean;
  conflictResolution?: ConflictResolution;
}
export const CreateUnreferencedMergeCommitInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    mergeOption: MergeOptionTypeEnum,
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    commitMessage: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    conflictResolution: S.optional(ConflictResolution),
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
  identifier: "CreateUnreferencedMergeCommitInput",
}) as any as S.Schema<CreateUnreferencedMergeCommitInput>;
export interface CreateUnreferencedMergeCommitOutput {
  commitId?: string;
  treeId?: string;
}
export const CreateUnreferencedMergeCommitOutput = S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateUnreferencedMergeCommitOutput",
}) as any as S.Schema<CreateUnreferencedMergeCommitOutput>;
export interface DeleteApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
}
export const DeleteApprovalRuleTemplateInput = S.suspend(() =>
  S.Struct({ approvalRuleTemplateName: S.String }).pipe(
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
  identifier: "DeleteApprovalRuleTemplateInput",
}) as any as S.Schema<DeleteApprovalRuleTemplateInput>;
export interface DeleteApprovalRuleTemplateOutput {
  approvalRuleTemplateId: string;
}
export const DeleteApprovalRuleTemplateOutput = S.suspend(() =>
  S.Struct({ approvalRuleTemplateId: S.String }).pipe(ns),
).annotate({
  identifier: "DeleteApprovalRuleTemplateOutput",
}) as any as S.Schema<DeleteApprovalRuleTemplateOutput>;
export interface DeleteBranchInput {
  repositoryName: string;
  branchName: string;
}
export const DeleteBranchInput = S.suspend(() =>
  S.Struct({ repositoryName: S.String, branchName: S.String }).pipe(
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
  identifier: "DeleteBranchInput",
}) as any as S.Schema<DeleteBranchInput>;
export interface BranchInfo {
  branchName?: string;
  commitId?: string;
}
export const BranchInfo = S.suspend(() =>
  S.Struct({
    branchName: S.optional(S.String),
    commitId: S.optional(S.String),
  }),
).annotate({ identifier: "BranchInfo" }) as any as S.Schema<BranchInfo>;
export interface DeleteBranchOutput {
  deletedBranch?: BranchInfo;
}
export const DeleteBranchOutput = S.suspend(() =>
  S.Struct({ deletedBranch: S.optional(BranchInfo) }).pipe(ns),
).annotate({
  identifier: "DeleteBranchOutput",
}) as any as S.Schema<DeleteBranchOutput>;
export interface DeleteCommentContentInput {
  commentId: string;
}
export const DeleteCommentContentInput = S.suspend(() =>
  S.Struct({ commentId: S.String }).pipe(
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
  identifier: "DeleteCommentContentInput",
}) as any as S.Schema<DeleteCommentContentInput>;
export type CallerReactions = string[];
export const CallerReactions = S.Array(S.String);
export type ReactionCountsMap = { [key: string]: number | undefined };
export const ReactionCountsMap = S.Record(S.String, S.Number.pipe(S.optional));
export interface Comment {
  commentId?: string;
  content?: string;
  inReplyTo?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  authorArn?: string;
  deleted?: boolean;
  clientRequestToken?: string;
  callerReactions?: string[];
  reactionCounts?: { [key: string]: number | undefined };
}
export const Comment = S.suspend(() =>
  S.Struct({
    commentId: S.optional(S.String),
    content: S.optional(S.String),
    inReplyTo: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    authorArn: S.optional(S.String),
    deleted: S.optional(S.Boolean),
    clientRequestToken: S.optional(S.String),
    callerReactions: S.optional(CallerReactions),
    reactionCounts: S.optional(ReactionCountsMap),
  }),
).annotate({ identifier: "Comment" }) as any as S.Schema<Comment>;
export interface DeleteCommentContentOutput {
  comment?: Comment;
}
export const DeleteCommentContentOutput = S.suspend(() =>
  S.Struct({ comment: S.optional(Comment) }).pipe(ns),
).annotate({
  identifier: "DeleteCommentContentOutput",
}) as any as S.Schema<DeleteCommentContentOutput>;
export interface DeleteFileInput {
  repositoryName: string;
  branchName: string;
  filePath: string;
  parentCommitId: string;
  keepEmptyFolders?: boolean;
  commitMessage?: string;
  name?: string;
  email?: string;
}
export const DeleteFileInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    branchName: S.String,
    filePath: S.String,
    parentCommitId: S.String,
    keepEmptyFolders: S.optional(S.Boolean),
    commitMessage: S.optional(S.String),
    name: S.optional(S.String),
    email: S.optional(S.String),
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
  identifier: "DeleteFileInput",
}) as any as S.Schema<DeleteFileInput>;
export interface DeleteFileOutput {
  commitId: string;
  blobId: string;
  treeId: string;
  filePath: string;
}
export const DeleteFileOutput = S.suspend(() =>
  S.Struct({
    commitId: S.String,
    blobId: S.String,
    treeId: S.String,
    filePath: S.String,
  }).pipe(ns),
).annotate({
  identifier: "DeleteFileOutput",
}) as any as S.Schema<DeleteFileOutput>;
export interface DeletePullRequestApprovalRuleInput {
  pullRequestId: string;
  approvalRuleName: string;
}
export const DeletePullRequestApprovalRuleInput = S.suspend(() =>
  S.Struct({ pullRequestId: S.String, approvalRuleName: S.String }).pipe(
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
  identifier: "DeletePullRequestApprovalRuleInput",
}) as any as S.Schema<DeletePullRequestApprovalRuleInput>;
export interface DeletePullRequestApprovalRuleOutput {
  approvalRuleId: string;
}
export const DeletePullRequestApprovalRuleOutput = S.suspend(() =>
  S.Struct({ approvalRuleId: S.String }).pipe(ns),
).annotate({
  identifier: "DeletePullRequestApprovalRuleOutput",
}) as any as S.Schema<DeletePullRequestApprovalRuleOutput>;
export interface DeleteRepositoryInput {
  repositoryName: string;
}
export const DeleteRepositoryInput = S.suspend(() =>
  S.Struct({ repositoryName: S.String }).pipe(
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
  identifier: "DeleteRepositoryInput",
}) as any as S.Schema<DeleteRepositoryInput>;
export interface DeleteRepositoryOutput {
  repositoryId?: string;
}
export const DeleteRepositoryOutput = S.suspend(() =>
  S.Struct({ repositoryId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteRepositoryOutput",
}) as any as S.Schema<DeleteRepositoryOutput>;
export interface DescribeMergeConflictsInput {
  repositoryName: string;
  destinationCommitSpecifier: string;
  sourceCommitSpecifier: string;
  mergeOption: MergeOptionTypeEnum;
  maxMergeHunks?: number;
  filePath: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  nextToken?: string;
}
export const DescribeMergeConflictsInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    destinationCommitSpecifier: S.String,
    sourceCommitSpecifier: S.String,
    mergeOption: MergeOptionTypeEnum,
    maxMergeHunks: S.optional(S.Number),
    filePath: S.String,
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    nextToken: S.optional(S.String),
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
  identifier: "DescribeMergeConflictsInput",
}) as any as S.Schema<DescribeMergeConflictsInput>;
export interface DescribeMergeConflictsOutput {
  conflictMetadata: ConflictMetadata;
  mergeHunks: MergeHunk[];
  nextToken?: string;
  destinationCommitId: string;
  sourceCommitId: string;
  baseCommitId?: string;
}
export const DescribeMergeConflictsOutput = S.suspend(() =>
  S.Struct({
    conflictMetadata: ConflictMetadata,
    mergeHunks: MergeHunks,
    nextToken: S.optional(S.String),
    destinationCommitId: S.String,
    sourceCommitId: S.String,
    baseCommitId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeMergeConflictsOutput",
}) as any as S.Schema<DescribeMergeConflictsOutput>;
export type PullRequestEventType =
  | "PULL_REQUEST_CREATED"
  | "PULL_REQUEST_STATUS_CHANGED"
  | "PULL_REQUEST_SOURCE_REFERENCE_UPDATED"
  | "PULL_REQUEST_MERGE_STATE_CHANGED"
  | "PULL_REQUEST_APPROVAL_RULE_CREATED"
  | "PULL_REQUEST_APPROVAL_RULE_UPDATED"
  | "PULL_REQUEST_APPROVAL_RULE_DELETED"
  | "PULL_REQUEST_APPROVAL_RULE_OVERRIDDEN"
  | "PULL_REQUEST_APPROVAL_STATE_CHANGED"
  | (string & {});
export const PullRequestEventType = S.String;
export interface DescribePullRequestEventsInput {
  pullRequestId: string;
  pullRequestEventType?: PullRequestEventType;
  actorArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const DescribePullRequestEventsInput = S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    pullRequestEventType: S.optional(PullRequestEventType),
    actorArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "DescribePullRequestEventsInput",
}) as any as S.Schema<DescribePullRequestEventsInput>;
export interface PullRequestCreatedEventMetadata {
  repositoryName?: string;
  sourceCommitId?: string;
  destinationCommitId?: string;
  mergeBase?: string;
}
export const PullRequestCreatedEventMetadata = S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    sourceCommitId: S.optional(S.String),
    destinationCommitId: S.optional(S.String),
    mergeBase: S.optional(S.String),
  }),
).annotate({
  identifier: "PullRequestCreatedEventMetadata",
}) as any as S.Schema<PullRequestCreatedEventMetadata>;
export interface PullRequestStatusChangedEventMetadata {
  pullRequestStatus?: PullRequestStatusEnum;
}
export const PullRequestStatusChangedEventMetadata = S.suspend(() =>
  S.Struct({ pullRequestStatus: S.optional(PullRequestStatusEnum) }),
).annotate({
  identifier: "PullRequestStatusChangedEventMetadata",
}) as any as S.Schema<PullRequestStatusChangedEventMetadata>;
export interface PullRequestSourceReferenceUpdatedEventMetadata {
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  mergeBase?: string;
}
export const PullRequestSourceReferenceUpdatedEventMetadata = S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.optional(S.String),
    mergeBase: S.optional(S.String),
  }),
).annotate({
  identifier: "PullRequestSourceReferenceUpdatedEventMetadata",
}) as any as S.Schema<PullRequestSourceReferenceUpdatedEventMetadata>;
export interface PullRequestMergedStateChangedEventMetadata {
  repositoryName?: string;
  destinationReference?: string;
  mergeMetadata?: MergeMetadata;
}
export const PullRequestMergedStateChangedEventMetadata = S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    destinationReference: S.optional(S.String),
    mergeMetadata: S.optional(MergeMetadata),
  }),
).annotate({
  identifier: "PullRequestMergedStateChangedEventMetadata",
}) as any as S.Schema<PullRequestMergedStateChangedEventMetadata>;
export interface ApprovalRuleEventMetadata {
  approvalRuleName?: string;
  approvalRuleId?: string;
  approvalRuleContent?: string;
}
export const ApprovalRuleEventMetadata = S.suspend(() =>
  S.Struct({
    approvalRuleName: S.optional(S.String),
    approvalRuleId: S.optional(S.String),
    approvalRuleContent: S.optional(S.String),
  }),
).annotate({
  identifier: "ApprovalRuleEventMetadata",
}) as any as S.Schema<ApprovalRuleEventMetadata>;
export type ApprovalState = "APPROVE" | "REVOKE" | (string & {});
export const ApprovalState = S.String;
export interface ApprovalStateChangedEventMetadata {
  revisionId?: string;
  approvalStatus?: ApprovalState;
}
export const ApprovalStateChangedEventMetadata = S.suspend(() =>
  S.Struct({
    revisionId: S.optional(S.String),
    approvalStatus: S.optional(ApprovalState),
  }),
).annotate({
  identifier: "ApprovalStateChangedEventMetadata",
}) as any as S.Schema<ApprovalStateChangedEventMetadata>;
export type OverrideStatus = "OVERRIDE" | "REVOKE" | (string & {});
export const OverrideStatus = S.String;
export interface ApprovalRuleOverriddenEventMetadata {
  revisionId?: string;
  overrideStatus?: OverrideStatus;
}
export const ApprovalRuleOverriddenEventMetadata = S.suspend(() =>
  S.Struct({
    revisionId: S.optional(S.String),
    overrideStatus: S.optional(OverrideStatus),
  }),
).annotate({
  identifier: "ApprovalRuleOverriddenEventMetadata",
}) as any as S.Schema<ApprovalRuleOverriddenEventMetadata>;
export interface PullRequestEvent {
  pullRequestId?: string;
  eventDate?: Date;
  pullRequestEventType?: PullRequestEventType;
  actorArn?: string;
  pullRequestCreatedEventMetadata?: PullRequestCreatedEventMetadata;
  pullRequestStatusChangedEventMetadata?: PullRequestStatusChangedEventMetadata;
  pullRequestSourceReferenceUpdatedEventMetadata?: PullRequestSourceReferenceUpdatedEventMetadata;
  pullRequestMergedStateChangedEventMetadata?: PullRequestMergedStateChangedEventMetadata;
  approvalRuleEventMetadata?: ApprovalRuleEventMetadata;
  approvalStateChangedEventMetadata?: ApprovalStateChangedEventMetadata;
  approvalRuleOverriddenEventMetadata?: ApprovalRuleOverriddenEventMetadata;
}
export const PullRequestEvent = S.suspend(() =>
  S.Struct({
    pullRequestId: S.optional(S.String),
    eventDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    pullRequestEventType: S.optional(PullRequestEventType),
    actorArn: S.optional(S.String),
    pullRequestCreatedEventMetadata: S.optional(
      PullRequestCreatedEventMetadata,
    ),
    pullRequestStatusChangedEventMetadata: S.optional(
      PullRequestStatusChangedEventMetadata,
    ),
    pullRequestSourceReferenceUpdatedEventMetadata: S.optional(
      PullRequestSourceReferenceUpdatedEventMetadata,
    ),
    pullRequestMergedStateChangedEventMetadata: S.optional(
      PullRequestMergedStateChangedEventMetadata,
    ),
    approvalRuleEventMetadata: S.optional(ApprovalRuleEventMetadata),
    approvalStateChangedEventMetadata: S.optional(
      ApprovalStateChangedEventMetadata,
    ),
    approvalRuleOverriddenEventMetadata: S.optional(
      ApprovalRuleOverriddenEventMetadata,
    ),
  }),
).annotate({
  identifier: "PullRequestEvent",
}) as any as S.Schema<PullRequestEvent>;
export type PullRequestEventList = PullRequestEvent[];
export const PullRequestEventList = S.Array(PullRequestEvent);
export interface DescribePullRequestEventsOutput {
  pullRequestEvents: PullRequestEvent[];
  nextToken?: string;
}
export const DescribePullRequestEventsOutput = S.suspend(() =>
  S.Struct({
    pullRequestEvents: PullRequestEventList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribePullRequestEventsOutput",
}) as any as S.Schema<DescribePullRequestEventsOutput>;
export interface DisassociateApprovalRuleTemplateFromRepositoryInput {
  approvalRuleTemplateName: string;
  repositoryName: string;
}
export const DisassociateApprovalRuleTemplateFromRepositoryInput = S.suspend(
  () =>
    S.Struct({
      approvalRuleTemplateName: S.String,
      repositoryName: S.String,
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
  identifier: "DisassociateApprovalRuleTemplateFromRepositoryInput",
}) as any as S.Schema<DisassociateApprovalRuleTemplateFromRepositoryInput>;
export interface DisassociateApprovalRuleTemplateFromRepositoryResponse {}
export const DisassociateApprovalRuleTemplateFromRepositoryResponse = S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisassociateApprovalRuleTemplateFromRepositoryResponse",
}) as any as S.Schema<DisassociateApprovalRuleTemplateFromRepositoryResponse>;
export interface EvaluatePullRequestApprovalRulesInput {
  pullRequestId: string;
  revisionId: string;
}
export const EvaluatePullRequestApprovalRulesInput = S.suspend(() =>
  S.Struct({ pullRequestId: S.String, revisionId: S.String }).pipe(
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
  identifier: "EvaluatePullRequestApprovalRulesInput",
}) as any as S.Schema<EvaluatePullRequestApprovalRulesInput>;
export type ApprovalRulesSatisfiedList = string[];
export const ApprovalRulesSatisfiedList = S.Array(S.String);
export type ApprovalRulesNotSatisfiedList = string[];
export const ApprovalRulesNotSatisfiedList = S.Array(S.String);
export interface Evaluation {
  approved?: boolean;
  overridden?: boolean;
  approvalRulesSatisfied?: string[];
  approvalRulesNotSatisfied?: string[];
}
export const Evaluation = S.suspend(() =>
  S.Struct({
    approved: S.optional(S.Boolean),
    overridden: S.optional(S.Boolean),
    approvalRulesSatisfied: S.optional(ApprovalRulesSatisfiedList),
    approvalRulesNotSatisfied: S.optional(ApprovalRulesNotSatisfiedList),
  }),
).annotate({ identifier: "Evaluation" }) as any as S.Schema<Evaluation>;
export interface EvaluatePullRequestApprovalRulesOutput {
  evaluation: Evaluation;
}
export const EvaluatePullRequestApprovalRulesOutput = S.suspend(() =>
  S.Struct({ evaluation: Evaluation }).pipe(ns),
).annotate({
  identifier: "EvaluatePullRequestApprovalRulesOutput",
}) as any as S.Schema<EvaluatePullRequestApprovalRulesOutput>;
export interface GetApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
}
export const GetApprovalRuleTemplateInput = S.suspend(() =>
  S.Struct({ approvalRuleTemplateName: S.String }).pipe(
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
  identifier: "GetApprovalRuleTemplateInput",
}) as any as S.Schema<GetApprovalRuleTemplateInput>;
export interface GetApprovalRuleTemplateOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export const GetApprovalRuleTemplateOutput = S.suspend(() =>
  S.Struct({ approvalRuleTemplate: ApprovalRuleTemplate }).pipe(ns),
).annotate({
  identifier: "GetApprovalRuleTemplateOutput",
}) as any as S.Schema<GetApprovalRuleTemplateOutput>;
export interface GetBlobInput {
  repositoryName: string;
  blobId: string;
}
export const GetBlobInput = S.suspend(() =>
  S.Struct({ repositoryName: S.String, blobId: S.String }).pipe(
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
).annotate({ identifier: "GetBlobInput" }) as any as S.Schema<GetBlobInput>;
export interface GetBlobOutput {
  content: Uint8Array;
}
export const GetBlobOutput = S.suspend(() =>
  S.Struct({ content: T.Blob }).pipe(ns),
).annotate({ identifier: "GetBlobOutput" }) as any as S.Schema<GetBlobOutput>;
export interface GetBranchInput {
  repositoryName?: string;
  branchName?: string;
}
export const GetBranchInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    branchName: S.optional(S.String),
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
).annotate({ identifier: "GetBranchInput" }) as any as S.Schema<GetBranchInput>;
export interface GetBranchOutput {
  branch?: BranchInfo;
}
export const GetBranchOutput = S.suspend(() =>
  S.Struct({ branch: S.optional(BranchInfo) }).pipe(ns),
).annotate({
  identifier: "GetBranchOutput",
}) as any as S.Schema<GetBranchOutput>;
export interface GetCommentInput {
  commentId: string;
}
export const GetCommentInput = S.suspend(() =>
  S.Struct({ commentId: S.String }).pipe(
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
  identifier: "GetCommentInput",
}) as any as S.Schema<GetCommentInput>;
export interface GetCommentOutput {
  comment?: Comment;
}
export const GetCommentOutput = S.suspend(() =>
  S.Struct({ comment: S.optional(Comment) }).pipe(ns),
).annotate({
  identifier: "GetCommentOutput",
}) as any as S.Schema<GetCommentOutput>;
export interface GetCommentReactionsInput {
  commentId: string;
  reactionUserArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetCommentReactionsInput = S.suspend(() =>
  S.Struct({
    commentId: S.String,
    reactionUserArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetCommentReactionsInput",
}) as any as S.Schema<GetCommentReactionsInput>;
export interface ReactionValueFormats {
  emoji?: string;
  shortCode?: string;
  unicode?: string;
}
export const ReactionValueFormats = S.suspend(() =>
  S.Struct({
    emoji: S.optional(S.String),
    shortCode: S.optional(S.String),
    unicode: S.optional(S.String),
  }),
).annotate({
  identifier: "ReactionValueFormats",
}) as any as S.Schema<ReactionValueFormats>;
export type ReactionUsersList = string[];
export const ReactionUsersList = S.Array(S.String);
export interface ReactionForComment {
  reaction?: ReactionValueFormats;
  reactionUsers?: string[];
  reactionsFromDeletedUsersCount?: number;
}
export const ReactionForComment = S.suspend(() =>
  S.Struct({
    reaction: S.optional(ReactionValueFormats),
    reactionUsers: S.optional(ReactionUsersList),
    reactionsFromDeletedUsersCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ReactionForComment",
}) as any as S.Schema<ReactionForComment>;
export type ReactionsForCommentList = ReactionForComment[];
export const ReactionsForCommentList = S.Array(ReactionForComment);
export interface GetCommentReactionsOutput {
  reactionsForComment: ReactionForComment[];
  nextToken?: string;
}
export const GetCommentReactionsOutput = S.suspend(() =>
  S.Struct({
    reactionsForComment: ReactionsForCommentList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetCommentReactionsOutput",
}) as any as S.Schema<GetCommentReactionsOutput>;
export interface GetCommentsForComparedCommitInput {
  repositoryName: string;
  beforeCommitId?: string;
  afterCommitId: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetCommentsForComparedCommitInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetCommentsForComparedCommitInput",
}) as any as S.Schema<GetCommentsForComparedCommitInput>;
export type RelativeFileVersionEnum = "BEFORE" | "AFTER" | (string & {});
export const RelativeFileVersionEnum = S.String;
export interface Location {
  filePath?: string;
  filePosition?: number;
  relativeFileVersion?: RelativeFileVersionEnum;
}
export const Location = S.suspend(() =>
  S.Struct({
    filePath: S.optional(S.String),
    filePosition: S.optional(S.Number),
    relativeFileVersion: S.optional(RelativeFileVersionEnum),
  }),
).annotate({ identifier: "Location" }) as any as S.Schema<Location>;
export type Comments = Comment[];
export const Comments = S.Array(Comment);
export interface CommentsForComparedCommit {
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  beforeBlobId?: string;
  afterBlobId?: string;
  location?: Location;
  comments?: Comment[];
}
export const CommentsForComparedCommit = S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.optional(S.String),
    beforeBlobId: S.optional(S.String),
    afterBlobId: S.optional(S.String),
    location: S.optional(Location),
    comments: S.optional(Comments),
  }),
).annotate({
  identifier: "CommentsForComparedCommit",
}) as any as S.Schema<CommentsForComparedCommit>;
export type CommentsForComparedCommitData = CommentsForComparedCommit[];
export const CommentsForComparedCommitData = S.Array(CommentsForComparedCommit);
export interface GetCommentsForComparedCommitOutput {
  commentsForComparedCommitData?: CommentsForComparedCommit[];
  nextToken?: string;
}
export const GetCommentsForComparedCommitOutput = S.suspend(() =>
  S.Struct({
    commentsForComparedCommitData: S.optional(CommentsForComparedCommitData),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetCommentsForComparedCommitOutput",
}) as any as S.Schema<GetCommentsForComparedCommitOutput>;
export interface GetCommentsForPullRequestInput {
  pullRequestId: string;
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetCommentsForPullRequestInput = S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    repositoryName: S.optional(S.String),
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetCommentsForPullRequestInput",
}) as any as S.Schema<GetCommentsForPullRequestInput>;
export interface CommentsForPullRequest {
  pullRequestId?: string;
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  beforeBlobId?: string;
  afterBlobId?: string;
  location?: Location;
  comments?: Comment[];
}
export const CommentsForPullRequest = S.suspend(() =>
  S.Struct({
    pullRequestId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.optional(S.String),
    beforeBlobId: S.optional(S.String),
    afterBlobId: S.optional(S.String),
    location: S.optional(Location),
    comments: S.optional(Comments),
  }),
).annotate({
  identifier: "CommentsForPullRequest",
}) as any as S.Schema<CommentsForPullRequest>;
export type CommentsForPullRequestData = CommentsForPullRequest[];
export const CommentsForPullRequestData = S.Array(CommentsForPullRequest);
export interface GetCommentsForPullRequestOutput {
  commentsForPullRequestData?: CommentsForPullRequest[];
  nextToken?: string;
}
export const GetCommentsForPullRequestOutput = S.suspend(() =>
  S.Struct({
    commentsForPullRequestData: S.optional(CommentsForPullRequestData),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetCommentsForPullRequestOutput",
}) as any as S.Schema<GetCommentsForPullRequestOutput>;
export interface GetCommitInput {
  repositoryName: string;
  commitId: string;
}
export const GetCommitInput = S.suspend(() =>
  S.Struct({ repositoryName: S.String, commitId: S.String }).pipe(
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
).annotate({ identifier: "GetCommitInput" }) as any as S.Schema<GetCommitInput>;
export interface GetCommitOutput {
  commit: Commit;
}
export const GetCommitOutput = S.suspend(() =>
  S.Struct({ commit: Commit }).pipe(ns),
).annotate({
  identifier: "GetCommitOutput",
}) as any as S.Schema<GetCommitOutput>;
export interface GetDifferencesInput {
  repositoryName: string;
  beforeCommitSpecifier?: string;
  afterCommitSpecifier: string;
  beforePath?: string;
  afterPath?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetDifferencesInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    beforeCommitSpecifier: S.optional(S.String),
    afterCommitSpecifier: S.String,
    beforePath: S.optional(S.String),
    afterPath: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "GetDifferencesInput",
}) as any as S.Schema<GetDifferencesInput>;
export interface BlobMetadata {
  blobId?: string;
  path?: string;
  mode?: string;
}
export const BlobMetadata = S.suspend(() =>
  S.Struct({
    blobId: S.optional(S.String),
    path: S.optional(S.String),
    mode: S.optional(S.String),
  }),
).annotate({ identifier: "BlobMetadata" }) as any as S.Schema<BlobMetadata>;
export interface Difference {
  beforeBlob?: BlobMetadata;
  afterBlob?: BlobMetadata;
  changeType?: ChangeTypeEnum;
}
export const Difference = S.suspend(() =>
  S.Struct({
    beforeBlob: S.optional(BlobMetadata),
    afterBlob: S.optional(BlobMetadata),
    changeType: S.optional(ChangeTypeEnum),
  }),
).annotate({ identifier: "Difference" }) as any as S.Schema<Difference>;
export type DifferenceList = Difference[];
export const DifferenceList = S.Array(Difference);
export interface GetDifferencesOutput {
  differences?: Difference[];
  NextToken?: string;
}
export const GetDifferencesOutput = S.suspend(() =>
  S.Struct({
    differences: S.optional(DifferenceList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetDifferencesOutput",
}) as any as S.Schema<GetDifferencesOutput>;
export interface GetFileInput {
  repositoryName: string;
  commitSpecifier?: string;
  filePath: string;
}
export const GetFileInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    commitSpecifier: S.optional(S.String),
    filePath: S.String,
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
).annotate({ identifier: "GetFileInput" }) as any as S.Schema<GetFileInput>;
export interface GetFileOutput {
  commitId: string;
  blobId: string;
  filePath: string;
  fileMode: FileModeTypeEnum;
  fileSize: number;
  fileContent: Uint8Array;
}
export const GetFileOutput = S.suspend(() =>
  S.Struct({
    commitId: S.String,
    blobId: S.String,
    filePath: S.String,
    fileMode: FileModeTypeEnum,
    fileSize: S.Number,
    fileContent: T.Blob,
  }).pipe(ns),
).annotate({ identifier: "GetFileOutput" }) as any as S.Schema<GetFileOutput>;
export interface GetFolderInput {
  repositoryName: string;
  commitSpecifier?: string;
  folderPath: string;
}
export const GetFolderInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    commitSpecifier: S.optional(S.String),
    folderPath: S.String,
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
).annotate({ identifier: "GetFolderInput" }) as any as S.Schema<GetFolderInput>;
export interface Folder {
  treeId?: string;
  absolutePath?: string;
  relativePath?: string;
}
export const Folder = S.suspend(() =>
  S.Struct({
    treeId: S.optional(S.String),
    absolutePath: S.optional(S.String),
    relativePath: S.optional(S.String),
  }),
).annotate({ identifier: "Folder" }) as any as S.Schema<Folder>;
export type FolderList = Folder[];
export const FolderList = S.Array(Folder);
export interface File {
  blobId?: string;
  absolutePath?: string;
  relativePath?: string;
  fileMode?: FileModeTypeEnum;
}
export const File = S.suspend(() =>
  S.Struct({
    blobId: S.optional(S.String),
    absolutePath: S.optional(S.String),
    relativePath: S.optional(S.String),
    fileMode: S.optional(FileModeTypeEnum),
  }),
).annotate({ identifier: "File" }) as any as S.Schema<File>;
export type FileList = File[];
export const FileList = S.Array(File);
export interface SymbolicLink {
  blobId?: string;
  absolutePath?: string;
  relativePath?: string;
  fileMode?: FileModeTypeEnum;
}
export const SymbolicLink = S.suspend(() =>
  S.Struct({
    blobId: S.optional(S.String),
    absolutePath: S.optional(S.String),
    relativePath: S.optional(S.String),
    fileMode: S.optional(FileModeTypeEnum),
  }),
).annotate({ identifier: "SymbolicLink" }) as any as S.Schema<SymbolicLink>;
export type SymbolicLinkList = SymbolicLink[];
export const SymbolicLinkList = S.Array(SymbolicLink);
export interface SubModule {
  commitId?: string;
  absolutePath?: string;
  relativePath?: string;
}
export const SubModule = S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    absolutePath: S.optional(S.String),
    relativePath: S.optional(S.String),
  }),
).annotate({ identifier: "SubModule" }) as any as S.Schema<SubModule>;
export type SubModuleList = SubModule[];
export const SubModuleList = S.Array(SubModule);
export interface GetFolderOutput {
  commitId: string;
  folderPath: string;
  treeId?: string;
  subFolders?: Folder[];
  files?: File[];
  symbolicLinks?: SymbolicLink[];
  subModules?: SubModule[];
}
export const GetFolderOutput = S.suspend(() =>
  S.Struct({
    commitId: S.String,
    folderPath: S.String,
    treeId: S.optional(S.String),
    subFolders: S.optional(FolderList),
    files: S.optional(FileList),
    symbolicLinks: S.optional(SymbolicLinkList),
    subModules: S.optional(SubModuleList),
  }).pipe(ns),
).annotate({
  identifier: "GetFolderOutput",
}) as any as S.Schema<GetFolderOutput>;
export interface GetMergeCommitInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
}
export const GetMergeCommitInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
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
  identifier: "GetMergeCommitInput",
}) as any as S.Schema<GetMergeCommitInput>;
export interface GetMergeCommitOutput {
  sourceCommitId?: string;
  destinationCommitId?: string;
  baseCommitId?: string;
  mergedCommitId?: string;
}
export const GetMergeCommitOutput = S.suspend(() =>
  S.Struct({
    sourceCommitId: S.optional(S.String),
    destinationCommitId: S.optional(S.String),
    baseCommitId: S.optional(S.String),
    mergedCommitId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetMergeCommitOutput",
}) as any as S.Schema<GetMergeCommitOutput>;
export interface GetMergeConflictsInput {
  repositoryName: string;
  destinationCommitSpecifier: string;
  sourceCommitSpecifier: string;
  mergeOption: MergeOptionTypeEnum;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  maxConflictFiles?: number;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  nextToken?: string;
}
export const GetMergeConflictsInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    destinationCommitSpecifier: S.String,
    sourceCommitSpecifier: S.String,
    mergeOption: MergeOptionTypeEnum,
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    maxConflictFiles: S.optional(S.Number),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    nextToken: S.optional(S.String),
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
  identifier: "GetMergeConflictsInput",
}) as any as S.Schema<GetMergeConflictsInput>;
export type ConflictMetadataList = ConflictMetadata[];
export const ConflictMetadataList = S.Array(ConflictMetadata);
export interface GetMergeConflictsOutput {
  mergeable: boolean;
  destinationCommitId: string;
  sourceCommitId: string;
  baseCommitId?: string;
  conflictMetadataList: ConflictMetadata[];
  nextToken?: string;
}
export const GetMergeConflictsOutput = S.suspend(() =>
  S.Struct({
    mergeable: S.Boolean,
    destinationCommitId: S.String,
    sourceCommitId: S.String,
    baseCommitId: S.optional(S.String),
    conflictMetadataList: ConflictMetadataList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetMergeConflictsOutput",
}) as any as S.Schema<GetMergeConflictsOutput>;
export interface GetMergeOptionsInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
}
export const GetMergeOptionsInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
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
  identifier: "GetMergeOptionsInput",
}) as any as S.Schema<GetMergeOptionsInput>;
export type MergeOptions = MergeOptionTypeEnum[];
export const MergeOptions = S.Array(MergeOptionTypeEnum);
export interface GetMergeOptionsOutput {
  mergeOptions: MergeOptionTypeEnum[];
  sourceCommitId: string;
  destinationCommitId: string;
  baseCommitId: string;
}
export const GetMergeOptionsOutput = S.suspend(() =>
  S.Struct({
    mergeOptions: MergeOptions,
    sourceCommitId: S.String,
    destinationCommitId: S.String,
    baseCommitId: S.String,
  }).pipe(ns),
).annotate({
  identifier: "GetMergeOptionsOutput",
}) as any as S.Schema<GetMergeOptionsOutput>;
export interface GetPullRequestInput {
  pullRequestId: string;
}
export const GetPullRequestInput = S.suspend(() =>
  S.Struct({ pullRequestId: S.String }).pipe(
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
  identifier: "GetPullRequestInput",
}) as any as S.Schema<GetPullRequestInput>;
export interface GetPullRequestOutput {
  pullRequest: PullRequest;
}
export const GetPullRequestOutput = S.suspend(() =>
  S.Struct({ pullRequest: PullRequest }).pipe(ns),
).annotate({
  identifier: "GetPullRequestOutput",
}) as any as S.Schema<GetPullRequestOutput>;
export interface GetPullRequestApprovalStatesInput {
  pullRequestId: string;
  revisionId: string;
}
export const GetPullRequestApprovalStatesInput = S.suspend(() =>
  S.Struct({ pullRequestId: S.String, revisionId: S.String }).pipe(
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
  identifier: "GetPullRequestApprovalStatesInput",
}) as any as S.Schema<GetPullRequestApprovalStatesInput>;
export interface Approval {
  userArn?: string;
  approvalState?: ApprovalState;
}
export const Approval = S.suspend(() =>
  S.Struct({
    userArn: S.optional(S.String),
    approvalState: S.optional(ApprovalState),
  }),
).annotate({ identifier: "Approval" }) as any as S.Schema<Approval>;
export type ApprovalList = Approval[];
export const ApprovalList = S.Array(Approval);
export interface GetPullRequestApprovalStatesOutput {
  approvals?: Approval[];
}
export const GetPullRequestApprovalStatesOutput = S.suspend(() =>
  S.Struct({ approvals: S.optional(ApprovalList) }).pipe(ns),
).annotate({
  identifier: "GetPullRequestApprovalStatesOutput",
}) as any as S.Schema<GetPullRequestApprovalStatesOutput>;
export interface GetPullRequestOverrideStateInput {
  pullRequestId: string;
  revisionId: string;
}
export const GetPullRequestOverrideStateInput = S.suspend(() =>
  S.Struct({ pullRequestId: S.String, revisionId: S.String }).pipe(
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
  identifier: "GetPullRequestOverrideStateInput",
}) as any as S.Schema<GetPullRequestOverrideStateInput>;
export interface GetPullRequestOverrideStateOutput {
  overridden?: boolean;
  overrider?: string;
}
export const GetPullRequestOverrideStateOutput = S.suspend(() =>
  S.Struct({
    overridden: S.optional(S.Boolean),
    overrider: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetPullRequestOverrideStateOutput",
}) as any as S.Schema<GetPullRequestOverrideStateOutput>;
export interface GetRepositoryInput {
  repositoryName: string;
}
export const GetRepositoryInput = S.suspend(() =>
  S.Struct({ repositoryName: S.String }).pipe(
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
  identifier: "GetRepositoryInput",
}) as any as S.Schema<GetRepositoryInput>;
export interface GetRepositoryOutput {
  repositoryMetadata?: RepositoryMetadata;
}
export const GetRepositoryOutput = S.suspend(() =>
  S.Struct({ repositoryMetadata: S.optional(RepositoryMetadata) }).pipe(ns),
).annotate({
  identifier: "GetRepositoryOutput",
}) as any as S.Schema<GetRepositoryOutput>;
export interface GetRepositoryTriggersInput {
  repositoryName: string;
}
export const GetRepositoryTriggersInput = S.suspend(() =>
  S.Struct({ repositoryName: S.String }).pipe(
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
  identifier: "GetRepositoryTriggersInput",
}) as any as S.Schema<GetRepositoryTriggersInput>;
export type BranchNameList = string[];
export const BranchNameList = S.Array(S.String);
export type RepositoryTriggerEventEnum =
  | "all"
  | "updateReference"
  | "createReference"
  | "deleteReference"
  | (string & {});
export const RepositoryTriggerEventEnum = S.String;
export type RepositoryTriggerEventList = RepositoryTriggerEventEnum[];
export const RepositoryTriggerEventList = S.Array(RepositoryTriggerEventEnum);
export interface RepositoryTrigger {
  name: string;
  destinationArn: string;
  customData?: string;
  branches?: string[];
  events: RepositoryTriggerEventEnum[];
}
export const RepositoryTrigger = S.suspend(() =>
  S.Struct({
    name: S.String,
    destinationArn: S.String,
    customData: S.optional(S.String),
    branches: S.optional(BranchNameList),
    events: RepositoryTriggerEventList,
  }),
).annotate({
  identifier: "RepositoryTrigger",
}) as any as S.Schema<RepositoryTrigger>;
export type RepositoryTriggersList = RepositoryTrigger[];
export const RepositoryTriggersList = S.Array(RepositoryTrigger);
export interface GetRepositoryTriggersOutput {
  configurationId?: string;
  triggers?: RepositoryTrigger[];
}
export const GetRepositoryTriggersOutput = S.suspend(() =>
  S.Struct({
    configurationId: S.optional(S.String),
    triggers: S.optional(RepositoryTriggersList),
  }).pipe(ns),
).annotate({
  identifier: "GetRepositoryTriggersOutput",
}) as any as S.Schema<GetRepositoryTriggersOutput>;
export interface ListApprovalRuleTemplatesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListApprovalRuleTemplatesInput = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "ListApprovalRuleTemplatesInput",
}) as any as S.Schema<ListApprovalRuleTemplatesInput>;
export type ApprovalRuleTemplateNameList = string[];
export const ApprovalRuleTemplateNameList = S.Array(S.String);
export interface ListApprovalRuleTemplatesOutput {
  approvalRuleTemplateNames?: string[];
  nextToken?: string;
}
export const ListApprovalRuleTemplatesOutput = S.suspend(() =>
  S.Struct({
    approvalRuleTemplateNames: S.optional(ApprovalRuleTemplateNameList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListApprovalRuleTemplatesOutput",
}) as any as S.Schema<ListApprovalRuleTemplatesOutput>;
export interface ListAssociatedApprovalRuleTemplatesForRepositoryInput {
  repositoryName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssociatedApprovalRuleTemplatesForRepositoryInput = S.suspend(
  () =>
    S.Struct({
      repositoryName: S.String,
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
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
  identifier: "ListAssociatedApprovalRuleTemplatesForRepositoryInput",
}) as any as S.Schema<ListAssociatedApprovalRuleTemplatesForRepositoryInput>;
export interface ListAssociatedApprovalRuleTemplatesForRepositoryOutput {
  approvalRuleTemplateNames?: string[];
  nextToken?: string;
}
export const ListAssociatedApprovalRuleTemplatesForRepositoryOutput = S.suspend(
  () =>
    S.Struct({
      approvalRuleTemplateNames: S.optional(ApprovalRuleTemplateNameList),
      nextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListAssociatedApprovalRuleTemplatesForRepositoryOutput",
}) as any as S.Schema<ListAssociatedApprovalRuleTemplatesForRepositoryOutput>;
export interface ListBranchesInput {
  repositoryName: string;
  nextToken?: string;
}
export const ListBranchesInput = S.suspend(() =>
  S.Struct({ repositoryName: S.String, nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListBranchesInput",
}) as any as S.Schema<ListBranchesInput>;
export interface ListBranchesOutput {
  branches?: string[];
  nextToken?: string;
}
export const ListBranchesOutput = S.suspend(() =>
  S.Struct({
    branches: S.optional(BranchNameList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListBranchesOutput",
}) as any as S.Schema<ListBranchesOutput>;
export interface ListFileCommitHistoryRequest {
  repositoryName: string;
  commitSpecifier?: string;
  filePath: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListFileCommitHistoryRequest = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    commitSpecifier: S.optional(S.String),
    filePath: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
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
  identifier: "ListFileCommitHistoryRequest",
}) as any as S.Schema<ListFileCommitHistoryRequest>;
export type RevisionChildren = string[];
export const RevisionChildren = S.Array(S.String);
export interface FileVersion {
  commit?: Commit;
  blobId?: string;
  path?: string;
  revisionChildren?: string[];
}
export const FileVersion = S.suspend(() =>
  S.Struct({
    commit: S.optional(Commit),
    blobId: S.optional(S.String),
    path: S.optional(S.String),
    revisionChildren: S.optional(RevisionChildren),
  }),
).annotate({ identifier: "FileVersion" }) as any as S.Schema<FileVersion>;
export type RevisionDag = FileVersion[];
export const RevisionDag = S.Array(FileVersion);
export interface ListFileCommitHistoryResponse {
  revisionDag: FileVersion[];
  nextToken?: string;
}
export const ListFileCommitHistoryResponse = S.suspend(() =>
  S.Struct({ revisionDag: RevisionDag, nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListFileCommitHistoryResponse",
}) as any as S.Schema<ListFileCommitHistoryResponse>;
export interface ListPullRequestsInput {
  repositoryName: string;
  authorArn?: string;
  pullRequestStatus?: PullRequestStatusEnum;
  nextToken?: string;
  maxResults?: number;
}
export const ListPullRequestsInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    authorArn: S.optional(S.String),
    pullRequestStatus: S.optional(PullRequestStatusEnum),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "ListPullRequestsInput",
}) as any as S.Schema<ListPullRequestsInput>;
export type PullRequestIdList = string[];
export const PullRequestIdList = S.Array(S.String);
export interface ListPullRequestsOutput {
  pullRequestIds: string[];
  nextToken?: string;
}
export const ListPullRequestsOutput = S.suspend(() =>
  S.Struct({
    pullRequestIds: PullRequestIdList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPullRequestsOutput",
}) as any as S.Schema<ListPullRequestsOutput>;
export type SortByEnum = "repositoryName" | "lastModifiedDate" | (string & {});
export const SortByEnum = S.String;
export type OrderEnum = "ascending" | "descending" | (string & {});
export const OrderEnum = S.String;
export interface ListRepositoriesInput {
  nextToken?: string;
  sortBy?: SortByEnum;
  order?: OrderEnum;
}
export const ListRepositoriesInput = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    sortBy: S.optional(SortByEnum),
    order: S.optional(OrderEnum),
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
  identifier: "ListRepositoriesInput",
}) as any as S.Schema<ListRepositoriesInput>;
export interface RepositoryNameIdPair {
  repositoryName?: string;
  repositoryId?: string;
}
export const RepositoryNameIdPair = S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    repositoryId: S.optional(S.String),
  }),
).annotate({
  identifier: "RepositoryNameIdPair",
}) as any as S.Schema<RepositoryNameIdPair>;
export type RepositoryNameIdPairList = RepositoryNameIdPair[];
export const RepositoryNameIdPairList = S.Array(RepositoryNameIdPair);
export interface ListRepositoriesOutput {
  repositories?: RepositoryNameIdPair[];
  nextToken?: string;
}
export const ListRepositoriesOutput = S.suspend(() =>
  S.Struct({
    repositories: S.optional(RepositoryNameIdPairList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListRepositoriesOutput",
}) as any as S.Schema<ListRepositoriesOutput>;
export interface ListRepositoriesForApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListRepositoriesForApprovalRuleTemplateInput = S.suspend(() =>
  S.Struct({
    approvalRuleTemplateName: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "ListRepositoriesForApprovalRuleTemplateInput",
}) as any as S.Schema<ListRepositoriesForApprovalRuleTemplateInput>;
export interface ListRepositoriesForApprovalRuleTemplateOutput {
  repositoryNames?: string[];
  nextToken?: string;
}
export const ListRepositoriesForApprovalRuleTemplateOutput = S.suspend(() =>
  S.Struct({
    repositoryNames: S.optional(RepositoryNameList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListRepositoriesForApprovalRuleTemplateOutput",
}) as any as S.Schema<ListRepositoriesForApprovalRuleTemplateOutput>;
export interface ListTagsForResourceInput {
  resourceArn: string;
  nextToken?: string;
}
export const ListTagsForResourceInput = S.suspend(() =>
  S.Struct({ resourceArn: S.String, nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
  nextToken?: string;
}
export const ListTagsForResourceOutput = S.suspend(() =>
  S.Struct({ tags: S.optional(TagsMap), nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface MergeBranchesByFastForwardInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  targetBranch?: string;
}
export const MergeBranchesByFastForwardInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    targetBranch: S.optional(S.String),
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
  identifier: "MergeBranchesByFastForwardInput",
}) as any as S.Schema<MergeBranchesByFastForwardInput>;
export interface MergeBranchesByFastForwardOutput {
  commitId?: string;
  treeId?: string;
}
export const MergeBranchesByFastForwardOutput = S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "MergeBranchesByFastForwardOutput",
}) as any as S.Schema<MergeBranchesByFastForwardOutput>;
export interface MergeBranchesBySquashInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  targetBranch?: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  authorName?: string;
  email?: string;
  commitMessage?: string;
  keepEmptyFolders?: boolean;
  conflictResolution?: ConflictResolution;
}
export const MergeBranchesBySquashInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    targetBranch: S.optional(S.String),
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    commitMessage: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    conflictResolution: S.optional(ConflictResolution),
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
  identifier: "MergeBranchesBySquashInput",
}) as any as S.Schema<MergeBranchesBySquashInput>;
export interface MergeBranchesBySquashOutput {
  commitId?: string;
  treeId?: string;
}
export const MergeBranchesBySquashOutput = S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "MergeBranchesBySquashOutput",
}) as any as S.Schema<MergeBranchesBySquashOutput>;
export interface MergeBranchesByThreeWayInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  targetBranch?: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  authorName?: string;
  email?: string;
  commitMessage?: string;
  keepEmptyFolders?: boolean;
  conflictResolution?: ConflictResolution;
}
export const MergeBranchesByThreeWayInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    targetBranch: S.optional(S.String),
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    commitMessage: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    conflictResolution: S.optional(ConflictResolution),
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
  identifier: "MergeBranchesByThreeWayInput",
}) as any as S.Schema<MergeBranchesByThreeWayInput>;
export interface MergeBranchesByThreeWayOutput {
  commitId?: string;
  treeId?: string;
}
export const MergeBranchesByThreeWayOutput = S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "MergeBranchesByThreeWayOutput",
}) as any as S.Schema<MergeBranchesByThreeWayOutput>;
export interface MergePullRequestByFastForwardInput {
  pullRequestId: string;
  repositoryName: string;
  sourceCommitId?: string;
}
export const MergePullRequestByFastForwardInput = S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    repositoryName: S.String,
    sourceCommitId: S.optional(S.String),
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
  identifier: "MergePullRequestByFastForwardInput",
}) as any as S.Schema<MergePullRequestByFastForwardInput>;
export interface MergePullRequestByFastForwardOutput {
  pullRequest?: PullRequest;
}
export const MergePullRequestByFastForwardOutput = S.suspend(() =>
  S.Struct({ pullRequest: S.optional(PullRequest) }).pipe(ns),
).annotate({
  identifier: "MergePullRequestByFastForwardOutput",
}) as any as S.Schema<MergePullRequestByFastForwardOutput>;
export interface MergePullRequestBySquashInput {
  pullRequestId: string;
  repositoryName: string;
  sourceCommitId?: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  commitMessage?: string;
  authorName?: string;
  email?: string;
  keepEmptyFolders?: boolean;
  conflictResolution?: ConflictResolution;
}
export const MergePullRequestBySquashInput = S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    repositoryName: S.String,
    sourceCommitId: S.optional(S.String),
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    commitMessage: S.optional(S.String),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    conflictResolution: S.optional(ConflictResolution),
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
  identifier: "MergePullRequestBySquashInput",
}) as any as S.Schema<MergePullRequestBySquashInput>;
export interface MergePullRequestBySquashOutput {
  pullRequest?: PullRequest;
}
export const MergePullRequestBySquashOutput = S.suspend(() =>
  S.Struct({ pullRequest: S.optional(PullRequest) }).pipe(ns),
).annotate({
  identifier: "MergePullRequestBySquashOutput",
}) as any as S.Schema<MergePullRequestBySquashOutput>;
export interface MergePullRequestByThreeWayInput {
  pullRequestId: string;
  repositoryName: string;
  sourceCommitId?: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  commitMessage?: string;
  authorName?: string;
  email?: string;
  keepEmptyFolders?: boolean;
  conflictResolution?: ConflictResolution;
}
export const MergePullRequestByThreeWayInput = S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    repositoryName: S.String,
    sourceCommitId: S.optional(S.String),
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    commitMessage: S.optional(S.String),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    conflictResolution: S.optional(ConflictResolution),
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
  identifier: "MergePullRequestByThreeWayInput",
}) as any as S.Schema<MergePullRequestByThreeWayInput>;
export interface MergePullRequestByThreeWayOutput {
  pullRequest?: PullRequest;
}
export const MergePullRequestByThreeWayOutput = S.suspend(() =>
  S.Struct({ pullRequest: S.optional(PullRequest) }).pipe(ns),
).annotate({
  identifier: "MergePullRequestByThreeWayOutput",
}) as any as S.Schema<MergePullRequestByThreeWayOutput>;
export interface OverridePullRequestApprovalRulesInput {
  pullRequestId: string;
  revisionId: string;
  overrideStatus: OverrideStatus;
}
export const OverridePullRequestApprovalRulesInput = S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    revisionId: S.String,
    overrideStatus: OverrideStatus,
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
  identifier: "OverridePullRequestApprovalRulesInput",
}) as any as S.Schema<OverridePullRequestApprovalRulesInput>;
export interface OverridePullRequestApprovalRulesResponse {}
export const OverridePullRequestApprovalRulesResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "OverridePullRequestApprovalRulesResponse",
}) as any as S.Schema<OverridePullRequestApprovalRulesResponse>;
export interface PostCommentForComparedCommitInput {
  repositoryName: string;
  beforeCommitId?: string;
  afterCommitId: string;
  location?: Location;
  content: string;
  clientRequestToken?: string;
}
export const PostCommentForComparedCommitInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.String,
    location: S.optional(Location),
    content: S.String,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
  identifier: "PostCommentForComparedCommitInput",
}) as any as S.Schema<PostCommentForComparedCommitInput>;
export interface PostCommentForComparedCommitOutput {
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  beforeBlobId?: string;
  afterBlobId?: string;
  location?: Location;
  comment?: Comment;
}
export const PostCommentForComparedCommitOutput = S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.optional(S.String),
    beforeBlobId: S.optional(S.String),
    afterBlobId: S.optional(S.String),
    location: S.optional(Location),
    comment: S.optional(Comment),
  }).pipe(ns),
).annotate({
  identifier: "PostCommentForComparedCommitOutput",
}) as any as S.Schema<PostCommentForComparedCommitOutput>;
export interface PostCommentForPullRequestInput {
  pullRequestId: string;
  repositoryName: string;
  beforeCommitId: string;
  afterCommitId: string;
  location?: Location;
  content: string;
  clientRequestToken?: string;
}
export const PostCommentForPullRequestInput = S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    repositoryName: S.String,
    beforeCommitId: S.String,
    afterCommitId: S.String,
    location: S.optional(Location),
    content: S.String,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
  identifier: "PostCommentForPullRequestInput",
}) as any as S.Schema<PostCommentForPullRequestInput>;
export interface PostCommentForPullRequestOutput {
  repositoryName?: string;
  pullRequestId?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  beforeBlobId?: string;
  afterBlobId?: string;
  location?: Location;
  comment?: Comment;
}
export const PostCommentForPullRequestOutput = S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    pullRequestId: S.optional(S.String),
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.optional(S.String),
    beforeBlobId: S.optional(S.String),
    afterBlobId: S.optional(S.String),
    location: S.optional(Location),
    comment: S.optional(Comment),
  }).pipe(ns),
).annotate({
  identifier: "PostCommentForPullRequestOutput",
}) as any as S.Schema<PostCommentForPullRequestOutput>;
export interface PostCommentReplyInput {
  inReplyTo: string;
  clientRequestToken?: string;
  content: string;
}
export const PostCommentReplyInput = S.suspend(() =>
  S.Struct({
    inReplyTo: S.String,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    content: S.String,
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
  identifier: "PostCommentReplyInput",
}) as any as S.Schema<PostCommentReplyInput>;
export interface PostCommentReplyOutput {
  comment?: Comment;
}
export const PostCommentReplyOutput = S.suspend(() =>
  S.Struct({ comment: S.optional(Comment) }).pipe(ns),
).annotate({
  identifier: "PostCommentReplyOutput",
}) as any as S.Schema<PostCommentReplyOutput>;
export interface PutCommentReactionInput {
  commentId: string;
  reactionValue: string;
}
export const PutCommentReactionInput = S.suspend(() =>
  S.Struct({ commentId: S.String, reactionValue: S.String }).pipe(
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
  identifier: "PutCommentReactionInput",
}) as any as S.Schema<PutCommentReactionInput>;
export interface PutCommentReactionResponse {}
export const PutCommentReactionResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutCommentReactionResponse",
}) as any as S.Schema<PutCommentReactionResponse>;
export interface PutFileInput {
  repositoryName: string;
  branchName: string;
  fileContent: Uint8Array;
  filePath: string;
  fileMode?: FileModeTypeEnum;
  parentCommitId?: string;
  commitMessage?: string;
  name?: string;
  email?: string;
}
export const PutFileInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    branchName: S.String,
    fileContent: T.Blob,
    filePath: S.String,
    fileMode: S.optional(FileModeTypeEnum),
    parentCommitId: S.optional(S.String),
    commitMessage: S.optional(S.String),
    name: S.optional(S.String),
    email: S.optional(S.String),
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
).annotate({ identifier: "PutFileInput" }) as any as S.Schema<PutFileInput>;
export interface PutFileOutput {
  commitId: string;
  blobId: string;
  treeId: string;
}
export const PutFileOutput = S.suspend(() =>
  S.Struct({ commitId: S.String, blobId: S.String, treeId: S.String }).pipe(ns),
).annotate({ identifier: "PutFileOutput" }) as any as S.Schema<PutFileOutput>;
export interface PutRepositoryTriggersInput {
  repositoryName: string;
  triggers: RepositoryTrigger[];
}
export const PutRepositoryTriggersInput = S.suspend(() =>
  S.Struct({ repositoryName: S.String, triggers: RepositoryTriggersList }).pipe(
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
  identifier: "PutRepositoryTriggersInput",
}) as any as S.Schema<PutRepositoryTriggersInput>;
export interface PutRepositoryTriggersOutput {
  configurationId?: string;
}
export const PutRepositoryTriggersOutput = S.suspend(() =>
  S.Struct({ configurationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "PutRepositoryTriggersOutput",
}) as any as S.Schema<PutRepositoryTriggersOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagsMap }).pipe(
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
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export interface TestRepositoryTriggersInput {
  repositoryName: string;
  triggers: RepositoryTrigger[];
}
export const TestRepositoryTriggersInput = S.suspend(() =>
  S.Struct({ repositoryName: S.String, triggers: RepositoryTriggersList }).pipe(
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
  identifier: "TestRepositoryTriggersInput",
}) as any as S.Schema<TestRepositoryTriggersInput>;
export type RepositoryTriggerNameList = string[];
export const RepositoryTriggerNameList = S.Array(S.String);
export interface RepositoryTriggerExecutionFailure {
  trigger?: string;
  failureMessage?: string;
}
export const RepositoryTriggerExecutionFailure = S.suspend(() =>
  S.Struct({
    trigger: S.optional(S.String),
    failureMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "RepositoryTriggerExecutionFailure",
}) as any as S.Schema<RepositoryTriggerExecutionFailure>;
export type RepositoryTriggerExecutionFailureList =
  RepositoryTriggerExecutionFailure[];
export const RepositoryTriggerExecutionFailureList = S.Array(
  RepositoryTriggerExecutionFailure,
);
export interface TestRepositoryTriggersOutput {
  successfulExecutions?: string[];
  failedExecutions?: RepositoryTriggerExecutionFailure[];
}
export const TestRepositoryTriggersOutput = S.suspend(() =>
  S.Struct({
    successfulExecutions: S.optional(RepositoryTriggerNameList),
    failedExecutions: S.optional(RepositoryTriggerExecutionFailureList),
  }).pipe(ns),
).annotate({
  identifier: "TestRepositoryTriggersOutput",
}) as any as S.Schema<TestRepositoryTriggersOutput>;
export type TagKeysList = string[];
export const TagKeysList = S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeysList }).pipe(
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateApprovalRuleTemplateContentInput {
  approvalRuleTemplateName: string;
  newRuleContent: string;
  existingRuleContentSha256?: string;
}
export const UpdateApprovalRuleTemplateContentInput = S.suspend(() =>
  S.Struct({
    approvalRuleTemplateName: S.String,
    newRuleContent: S.String,
    existingRuleContentSha256: S.optional(S.String),
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
  identifier: "UpdateApprovalRuleTemplateContentInput",
}) as any as S.Schema<UpdateApprovalRuleTemplateContentInput>;
export interface UpdateApprovalRuleTemplateContentOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export const UpdateApprovalRuleTemplateContentOutput = S.suspend(() =>
  S.Struct({ approvalRuleTemplate: ApprovalRuleTemplate }).pipe(ns),
).annotate({
  identifier: "UpdateApprovalRuleTemplateContentOutput",
}) as any as S.Schema<UpdateApprovalRuleTemplateContentOutput>;
export interface UpdateApprovalRuleTemplateDescriptionInput {
  approvalRuleTemplateName: string;
  approvalRuleTemplateDescription: string;
}
export const UpdateApprovalRuleTemplateDescriptionInput = S.suspend(() =>
  S.Struct({
    approvalRuleTemplateName: S.String,
    approvalRuleTemplateDescription: S.String,
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
  identifier: "UpdateApprovalRuleTemplateDescriptionInput",
}) as any as S.Schema<UpdateApprovalRuleTemplateDescriptionInput>;
export interface UpdateApprovalRuleTemplateDescriptionOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export const UpdateApprovalRuleTemplateDescriptionOutput = S.suspend(() =>
  S.Struct({ approvalRuleTemplate: ApprovalRuleTemplate }).pipe(ns),
).annotate({
  identifier: "UpdateApprovalRuleTemplateDescriptionOutput",
}) as any as S.Schema<UpdateApprovalRuleTemplateDescriptionOutput>;
export interface UpdateApprovalRuleTemplateNameInput {
  oldApprovalRuleTemplateName: string;
  newApprovalRuleTemplateName: string;
}
export const UpdateApprovalRuleTemplateNameInput = S.suspend(() =>
  S.Struct({
    oldApprovalRuleTemplateName: S.String,
    newApprovalRuleTemplateName: S.String,
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
  identifier: "UpdateApprovalRuleTemplateNameInput",
}) as any as S.Schema<UpdateApprovalRuleTemplateNameInput>;
export interface UpdateApprovalRuleTemplateNameOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export const UpdateApprovalRuleTemplateNameOutput = S.suspend(() =>
  S.Struct({ approvalRuleTemplate: ApprovalRuleTemplate }).pipe(ns),
).annotate({
  identifier: "UpdateApprovalRuleTemplateNameOutput",
}) as any as S.Schema<UpdateApprovalRuleTemplateNameOutput>;
export interface UpdateCommentInput {
  commentId: string;
  content: string;
}
export const UpdateCommentInput = S.suspend(() =>
  S.Struct({ commentId: S.String, content: S.String }).pipe(
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
  identifier: "UpdateCommentInput",
}) as any as S.Schema<UpdateCommentInput>;
export interface UpdateCommentOutput {
  comment?: Comment;
}
export const UpdateCommentOutput = S.suspend(() =>
  S.Struct({ comment: S.optional(Comment) }).pipe(ns),
).annotate({
  identifier: "UpdateCommentOutput",
}) as any as S.Schema<UpdateCommentOutput>;
export interface UpdateDefaultBranchInput {
  repositoryName: string;
  defaultBranchName: string;
}
export const UpdateDefaultBranchInput = S.suspend(() =>
  S.Struct({ repositoryName: S.String, defaultBranchName: S.String }).pipe(
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
  identifier: "UpdateDefaultBranchInput",
}) as any as S.Schema<UpdateDefaultBranchInput>;
export interface UpdateDefaultBranchResponse {}
export const UpdateDefaultBranchResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateDefaultBranchResponse",
}) as any as S.Schema<UpdateDefaultBranchResponse>;
export interface UpdatePullRequestApprovalRuleContentInput {
  pullRequestId: string;
  approvalRuleName: string;
  existingRuleContentSha256?: string;
  newRuleContent: string;
}
export const UpdatePullRequestApprovalRuleContentInput = S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    approvalRuleName: S.String,
    existingRuleContentSha256: S.optional(S.String),
    newRuleContent: S.String,
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
  identifier: "UpdatePullRequestApprovalRuleContentInput",
}) as any as S.Schema<UpdatePullRequestApprovalRuleContentInput>;
export interface UpdatePullRequestApprovalRuleContentOutput {
  approvalRule: ApprovalRule;
}
export const UpdatePullRequestApprovalRuleContentOutput = S.suspend(() =>
  S.Struct({ approvalRule: ApprovalRule }).pipe(ns),
).annotate({
  identifier: "UpdatePullRequestApprovalRuleContentOutput",
}) as any as S.Schema<UpdatePullRequestApprovalRuleContentOutput>;
export interface UpdatePullRequestApprovalStateInput {
  pullRequestId: string;
  revisionId: string;
  approvalState: ApprovalState;
}
export const UpdatePullRequestApprovalStateInput = S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    revisionId: S.String,
    approvalState: ApprovalState,
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
  identifier: "UpdatePullRequestApprovalStateInput",
}) as any as S.Schema<UpdatePullRequestApprovalStateInput>;
export interface UpdatePullRequestApprovalStateResponse {}
export const UpdatePullRequestApprovalStateResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdatePullRequestApprovalStateResponse",
}) as any as S.Schema<UpdatePullRequestApprovalStateResponse>;
export interface UpdatePullRequestDescriptionInput {
  pullRequestId: string;
  description: string;
}
export const UpdatePullRequestDescriptionInput = S.suspend(() =>
  S.Struct({ pullRequestId: S.String, description: S.String }).pipe(
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
  identifier: "UpdatePullRequestDescriptionInput",
}) as any as S.Schema<UpdatePullRequestDescriptionInput>;
export interface UpdatePullRequestDescriptionOutput {
  pullRequest: PullRequest;
}
export const UpdatePullRequestDescriptionOutput = S.suspend(() =>
  S.Struct({ pullRequest: PullRequest }).pipe(ns),
).annotate({
  identifier: "UpdatePullRequestDescriptionOutput",
}) as any as S.Schema<UpdatePullRequestDescriptionOutput>;
export interface UpdatePullRequestStatusInput {
  pullRequestId: string;
  pullRequestStatus: PullRequestStatusEnum;
}
export const UpdatePullRequestStatusInput = S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    pullRequestStatus: PullRequestStatusEnum,
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
  identifier: "UpdatePullRequestStatusInput",
}) as any as S.Schema<UpdatePullRequestStatusInput>;
export interface UpdatePullRequestStatusOutput {
  pullRequest: PullRequest;
}
export const UpdatePullRequestStatusOutput = S.suspend(() =>
  S.Struct({ pullRequest: PullRequest }).pipe(ns),
).annotate({
  identifier: "UpdatePullRequestStatusOutput",
}) as any as S.Schema<UpdatePullRequestStatusOutput>;
export interface UpdatePullRequestTitleInput {
  pullRequestId: string;
  title: string;
}
export const UpdatePullRequestTitleInput = S.suspend(() =>
  S.Struct({ pullRequestId: S.String, title: S.String }).pipe(
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
  identifier: "UpdatePullRequestTitleInput",
}) as any as S.Schema<UpdatePullRequestTitleInput>;
export interface UpdatePullRequestTitleOutput {
  pullRequest: PullRequest;
}
export const UpdatePullRequestTitleOutput = S.suspend(() =>
  S.Struct({ pullRequest: PullRequest }).pipe(ns),
).annotate({
  identifier: "UpdatePullRequestTitleOutput",
}) as any as S.Schema<UpdatePullRequestTitleOutput>;
export interface UpdateRepositoryDescriptionInput {
  repositoryName: string;
  repositoryDescription?: string;
}
export const UpdateRepositoryDescriptionInput = S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    repositoryDescription: S.optional(S.String),
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
  identifier: "UpdateRepositoryDescriptionInput",
}) as any as S.Schema<UpdateRepositoryDescriptionInput>;
export interface UpdateRepositoryDescriptionResponse {}
export const UpdateRepositoryDescriptionResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateRepositoryDescriptionResponse",
}) as any as S.Schema<UpdateRepositoryDescriptionResponse>;
export interface UpdateRepositoryEncryptionKeyInput {
  repositoryName: string;
  kmsKeyId: string;
}
export const UpdateRepositoryEncryptionKeyInput = S.suspend(() =>
  S.Struct({ repositoryName: S.String, kmsKeyId: S.String }).pipe(
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
  identifier: "UpdateRepositoryEncryptionKeyInput",
}) as any as S.Schema<UpdateRepositoryEncryptionKeyInput>;
export interface UpdateRepositoryEncryptionKeyOutput {
  repositoryId?: string;
  kmsKeyId?: string;
  originalKmsKeyId?: string;
}
export const UpdateRepositoryEncryptionKeyOutput = S.suspend(() =>
  S.Struct({
    repositoryId: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    originalKmsKeyId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateRepositoryEncryptionKeyOutput",
}) as any as S.Schema<UpdateRepositoryEncryptionKeyOutput>;
export interface UpdateRepositoryNameInput {
  oldName: string;
  newName: string;
}
export const UpdateRepositoryNameInput = S.suspend(() =>
  S.Struct({ oldName: S.String, newName: S.String }).pipe(
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
  identifier: "UpdateRepositoryNameInput",
}) as any as S.Schema<UpdateRepositoryNameInput>;
export interface UpdateRepositoryNameResponse {}
export const UpdateRepositoryNameResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateRepositoryNameResponse",
}) as any as S.Schema<UpdateRepositoryNameResponse>;

//# Errors
export class ApprovalRuleTemplateDoesNotExistException extends S.TaggedErrorClass<ApprovalRuleTemplateDoesNotExistException>()(
  "ApprovalRuleTemplateDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class ApprovalRuleTemplateNameRequiredException extends S.TaggedErrorClass<ApprovalRuleTemplateNameRequiredException>()(
  "ApprovalRuleTemplateNameRequiredException",
  { message: S.optional(S.String) },
) {}
export class EncryptionIntegrityChecksFailedException extends S.TaggedErrorClass<EncryptionIntegrityChecksFailedException>()(
  "EncryptionIntegrityChecksFailedException",
  { message: S.optional(S.String) },
) {}
export class EncryptionKeyAccessDeniedException extends S.TaggedErrorClass<EncryptionKeyAccessDeniedException>()(
  "EncryptionKeyAccessDeniedException",
  { message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class EncryptionKeyDisabledException extends S.TaggedErrorClass<EncryptionKeyDisabledException>()(
  "EncryptionKeyDisabledException",
  { message: S.optional(S.String) },
) {}
export class EncryptionKeyNotFoundException extends S.TaggedErrorClass<EncryptionKeyNotFoundException>()(
  "EncryptionKeyNotFoundException",
  { message: S.optional(S.String) },
) {}
export class EncryptionKeyUnavailableException extends S.TaggedErrorClass<EncryptionKeyUnavailableException>()(
  "EncryptionKeyUnavailableException",
  { message: S.optional(S.String) },
) {}
export class InvalidApprovalRuleTemplateNameException extends S.TaggedErrorClass<InvalidApprovalRuleTemplateNameException>()(
  "InvalidApprovalRuleTemplateNameException",
  { message: S.optional(S.String) },
) {}
export class InvalidRepositoryNameException extends S.TaggedErrorClass<InvalidRepositoryNameException>()(
  "InvalidRepositoryNameException",
  { message: S.optional(S.String) },
) {}
export class MaximumRuleTemplatesAssociatedWithRepositoryException extends S.TaggedErrorClass<MaximumRuleTemplatesAssociatedWithRepositoryException>()(
  "MaximumRuleTemplatesAssociatedWithRepositoryException",
  { message: S.optional(S.String) },
) {}
export class RepositoryDoesNotExistException extends S.TaggedErrorClass<RepositoryDoesNotExistException>()(
  "RepositoryDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class RepositoryNameRequiredException extends S.TaggedErrorClass<RepositoryNameRequiredException>()(
  "RepositoryNameRequiredException",
  { message: S.optional(S.String) },
) {}
export class MaximumRepositoryNamesExceededException extends S.TaggedErrorClass<MaximumRepositoryNamesExceededException>()(
  "MaximumRepositoryNamesExceededException",
  { message: S.optional(S.String) },
) {}
export class RepositoryNamesRequiredException extends S.TaggedErrorClass<RepositoryNamesRequiredException>()(
  "RepositoryNamesRequiredException",
  { message: S.optional(S.String) },
) {}
export class CommitDoesNotExistException extends S.TaggedErrorClass<CommitDoesNotExistException>()(
  "CommitDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class CommitRequiredException extends S.TaggedErrorClass<CommitRequiredException>()(
  "CommitRequiredException",
  { message: S.optional(S.String) },
) {}
export class InvalidCommitException extends S.TaggedErrorClass<InvalidCommitException>()(
  "InvalidCommitException",
  { message: S.optional(S.String) },
) {}
export class InvalidConflictDetailLevelException extends S.TaggedErrorClass<InvalidConflictDetailLevelException>()(
  "InvalidConflictDetailLevelException",
  { message: S.optional(S.String) },
) {}
export class InvalidConflictResolutionStrategyException extends S.TaggedErrorClass<InvalidConflictResolutionStrategyException>()(
  "InvalidConflictResolutionStrategyException",
  { message: S.optional(S.String) },
) {}
export class InvalidContinuationTokenException extends S.TaggedErrorClass<InvalidContinuationTokenException>()(
  "InvalidContinuationTokenException",
  { message: S.optional(S.String) },
) {}
export class InvalidMaxConflictFilesException extends S.TaggedErrorClass<InvalidMaxConflictFilesException>()(
  "InvalidMaxConflictFilesException",
  { message: S.optional(S.String) },
) {}
export class InvalidMaxMergeHunksException extends S.TaggedErrorClass<InvalidMaxMergeHunksException>()(
  "InvalidMaxMergeHunksException",
  { message: S.optional(S.String) },
) {}
export class InvalidMergeOptionException extends S.TaggedErrorClass<InvalidMergeOptionException>()(
  "InvalidMergeOptionException",
  { message: S.optional(S.String) },
) {}
export class MaximumFileContentToLoadExceededException extends S.TaggedErrorClass<MaximumFileContentToLoadExceededException>()(
  "MaximumFileContentToLoadExceededException",
  { message: S.optional(S.String) },
) {}
export class MaximumItemsToCompareExceededException extends S.TaggedErrorClass<MaximumItemsToCompareExceededException>()(
  "MaximumItemsToCompareExceededException",
  { message: S.optional(S.String) },
) {}
export class MergeOptionRequiredException extends S.TaggedErrorClass<MergeOptionRequiredException>()(
  "MergeOptionRequiredException",
  { message: S.optional(S.String) },
) {}
export class TipsDivergenceExceededException extends S.TaggedErrorClass<TipsDivergenceExceededException>()(
  "TipsDivergenceExceededException",
  { message: S.optional(S.String) },
) {}
export class CommitIdsLimitExceededException extends S.TaggedErrorClass<CommitIdsLimitExceededException>()(
  "CommitIdsLimitExceededException",
  { message: S.optional(S.String) },
) {}
export class CommitIdsListRequiredException extends S.TaggedErrorClass<CommitIdsListRequiredException>()(
  "CommitIdsListRequiredException",
  { message: S.optional(S.String) },
) {}
export class ApprovalRuleTemplateContentRequiredException extends S.TaggedErrorClass<ApprovalRuleTemplateContentRequiredException>()(
  "ApprovalRuleTemplateContentRequiredException",
  { message: S.optional(S.String) },
) {}
export class ApprovalRuleTemplateNameAlreadyExistsException extends S.TaggedErrorClass<ApprovalRuleTemplateNameAlreadyExistsException>()(
  "ApprovalRuleTemplateNameAlreadyExistsException",
  { message: S.optional(S.String) },
).pipe(C.withAlreadyExistsError) {}
export class InvalidApprovalRuleTemplateContentException extends S.TaggedErrorClass<InvalidApprovalRuleTemplateContentException>()(
  "InvalidApprovalRuleTemplateContentException",
  { message: S.optional(S.String) },
) {}
export class InvalidApprovalRuleTemplateDescriptionException extends S.TaggedErrorClass<InvalidApprovalRuleTemplateDescriptionException>()(
  "InvalidApprovalRuleTemplateDescriptionException",
  { message: S.optional(S.String) },
) {}
export class NumberOfRuleTemplatesExceededException extends S.TaggedErrorClass<NumberOfRuleTemplatesExceededException>()(
  "NumberOfRuleTemplatesExceededException",
  { message: S.optional(S.String) },
) {}
export class BranchNameExistsException extends S.TaggedErrorClass<BranchNameExistsException>()(
  "BranchNameExistsException",
  { message: S.optional(S.String) },
) {}
export class BranchNameRequiredException extends S.TaggedErrorClass<BranchNameRequiredException>()(
  "BranchNameRequiredException",
  { message: S.optional(S.String) },
) {}
export class CommitIdRequiredException extends S.TaggedErrorClass<CommitIdRequiredException>()(
  "CommitIdRequiredException",
  { message: S.optional(S.String) },
) {}
export class InvalidBranchNameException extends S.TaggedErrorClass<InvalidBranchNameException>()(
  "InvalidBranchNameException",
  { message: S.optional(S.String) },
) {}
export class InvalidCommitIdException extends S.TaggedErrorClass<InvalidCommitIdException>()(
  "InvalidCommitIdException",
  { message: S.optional(S.String) },
) {}
export class BranchDoesNotExistException extends S.TaggedErrorClass<BranchDoesNotExistException>()(
  "BranchDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class BranchNameIsTagNameException extends S.TaggedErrorClass<BranchNameIsTagNameException>()(
  "BranchNameIsTagNameException",
  { message: S.optional(S.String) },
) {}
export class CommitMessageLengthExceededException extends S.TaggedErrorClass<CommitMessageLengthExceededException>()(
  "CommitMessageLengthExceededException",
  { message: S.optional(S.String) },
) {}
export class DirectoryNameConflictsWithFileNameException extends S.TaggedErrorClass<DirectoryNameConflictsWithFileNameException>()(
  "DirectoryNameConflictsWithFileNameException",
  { message: S.optional(S.String) },
) {}
export class FileContentAndSourceFileSpecifiedException extends S.TaggedErrorClass<FileContentAndSourceFileSpecifiedException>()(
  "FileContentAndSourceFileSpecifiedException",
  { message: S.optional(S.String) },
) {}
export class FileContentSizeLimitExceededException extends S.TaggedErrorClass<FileContentSizeLimitExceededException>()(
  "FileContentSizeLimitExceededException",
  { message: S.optional(S.String) },
) {}
export class FileDoesNotExistException extends S.TaggedErrorClass<FileDoesNotExistException>()(
  "FileDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class FileEntryRequiredException extends S.TaggedErrorClass<FileEntryRequiredException>()(
  "FileEntryRequiredException",
  { message: S.optional(S.String) },
) {}
export class FileModeRequiredException extends S.TaggedErrorClass<FileModeRequiredException>()(
  "FileModeRequiredException",
  { message: S.optional(S.String) },
) {}
export class FileNameConflictsWithDirectoryNameException extends S.TaggedErrorClass<FileNameConflictsWithDirectoryNameException>()(
  "FileNameConflictsWithDirectoryNameException",
  { message: S.optional(S.String) },
) {}
export class FilePathConflictsWithSubmodulePathException extends S.TaggedErrorClass<FilePathConflictsWithSubmodulePathException>()(
  "FilePathConflictsWithSubmodulePathException",
  { message: S.optional(S.String) },
) {}
export class FolderContentSizeLimitExceededException extends S.TaggedErrorClass<FolderContentSizeLimitExceededException>()(
  "FolderContentSizeLimitExceededException",
  { message: S.optional(S.String) },
) {}
export class InvalidDeletionParameterException extends S.TaggedErrorClass<InvalidDeletionParameterException>()(
  "InvalidDeletionParameterException",
  { message: S.optional(S.String) },
) {}
export class InvalidEmailException extends S.TaggedErrorClass<InvalidEmailException>()(
  "InvalidEmailException",
  { message: S.optional(S.String) },
) {}
export class InvalidFileModeException extends S.TaggedErrorClass<InvalidFileModeException>()(
  "InvalidFileModeException",
  { message: S.optional(S.String) },
) {}
export class InvalidParentCommitIdException extends S.TaggedErrorClass<InvalidParentCommitIdException>()(
  "InvalidParentCommitIdException",
  { message: S.optional(S.String) },
) {}
export class InvalidPathException extends S.TaggedErrorClass<InvalidPathException>()(
  "InvalidPathException",
  { message: S.optional(S.String) },
) {}
export class MaximumFileEntriesExceededException extends S.TaggedErrorClass<MaximumFileEntriesExceededException>()(
  "MaximumFileEntriesExceededException",
  { message: S.optional(S.String) },
) {}
export class NameLengthExceededException extends S.TaggedErrorClass<NameLengthExceededException>()(
  "NameLengthExceededException",
  { message: S.optional(S.String) },
) {}
export class NoChangeException extends S.TaggedErrorClass<NoChangeException>()(
  "NoChangeException",
  { message: S.optional(S.String) },
) {}
export class ParentCommitDoesNotExistException extends S.TaggedErrorClass<ParentCommitDoesNotExistException>()(
  "ParentCommitDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class ParentCommitIdOutdatedException extends S.TaggedErrorClass<ParentCommitIdOutdatedException>()(
  "ParentCommitIdOutdatedException",
  { message: S.optional(S.String) },
) {}
export class ParentCommitIdRequiredException extends S.TaggedErrorClass<ParentCommitIdRequiredException>()(
  "ParentCommitIdRequiredException",
  { message: S.optional(S.String) },
) {}
export class PathRequiredException extends S.TaggedErrorClass<PathRequiredException>()(
  "PathRequiredException",
  { message: S.optional(S.String) },
) {}
export class PutFileEntryConflictException extends S.TaggedErrorClass<PutFileEntryConflictException>()(
  "PutFileEntryConflictException",
  { message: S.optional(S.String) },
) {}
export class RestrictedSourceFileException extends S.TaggedErrorClass<RestrictedSourceFileException>()(
  "RestrictedSourceFileException",
  { message: S.optional(S.String) },
) {}
export class SamePathRequestException extends S.TaggedErrorClass<SamePathRequestException>()(
  "SamePathRequestException",
  { message: S.optional(S.String) },
) {}
export class SourceFileOrContentRequiredException extends S.TaggedErrorClass<SourceFileOrContentRequiredException>()(
  "SourceFileOrContentRequiredException",
  { message: S.optional(S.String) },
) {}
export class ClientRequestTokenRequiredException extends S.TaggedErrorClass<ClientRequestTokenRequiredException>()(
  "ClientRequestTokenRequiredException",
  { message: S.optional(S.String) },
) {}
export class IdempotencyParameterMismatchException extends S.TaggedErrorClass<IdempotencyParameterMismatchException>()(
  "IdempotencyParameterMismatchException",
  { message: S.optional(S.String) },
) {}
export class InvalidClientRequestTokenException extends S.TaggedErrorClass<InvalidClientRequestTokenException>()(
  "InvalidClientRequestTokenException",
  { message: S.optional(S.String) },
) {}
export class InvalidDescriptionException extends S.TaggedErrorClass<InvalidDescriptionException>()(
  "InvalidDescriptionException",
  { message: S.optional(S.String) },
) {}
export class InvalidReferenceNameException extends S.TaggedErrorClass<InvalidReferenceNameException>()(
  "InvalidReferenceNameException",
  { message: S.optional(S.String) },
) {}
export class InvalidTargetException extends S.TaggedErrorClass<InvalidTargetException>()(
  "InvalidTargetException",
  { message: S.optional(S.String) },
) {}
export class InvalidTargetsException extends S.TaggedErrorClass<InvalidTargetsException>()(
  "InvalidTargetsException",
  { message: S.optional(S.String) },
) {}
export class InvalidTitleException extends S.TaggedErrorClass<InvalidTitleException>()(
  "InvalidTitleException",
  { message: S.optional(S.String) },
) {}
export class MaximumOpenPullRequestsExceededException extends S.TaggedErrorClass<MaximumOpenPullRequestsExceededException>()(
  "MaximumOpenPullRequestsExceededException",
  { message: S.optional(S.String) },
) {}
export class MultipleRepositoriesInPullRequestException extends S.TaggedErrorClass<MultipleRepositoriesInPullRequestException>()(
  "MultipleRepositoriesInPullRequestException",
  { message: S.optional(S.String) },
) {}
export class ReferenceDoesNotExistException extends S.TaggedErrorClass<ReferenceDoesNotExistException>()(
  "ReferenceDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class ReferenceNameRequiredException extends S.TaggedErrorClass<ReferenceNameRequiredException>()(
  "ReferenceNameRequiredException",
  { message: S.optional(S.String) },
) {}
export class ReferenceTypeNotSupportedException extends S.TaggedErrorClass<ReferenceTypeNotSupportedException>()(
  "ReferenceTypeNotSupportedException",
  { message: S.optional(S.String) },
) {}
export class SourceAndDestinationAreSameException extends S.TaggedErrorClass<SourceAndDestinationAreSameException>()(
  "SourceAndDestinationAreSameException",
  { message: S.optional(S.String) },
) {}
export class TargetRequiredException extends S.TaggedErrorClass<TargetRequiredException>()(
  "TargetRequiredException",
  { message: S.optional(S.String) },
) {}
export class TargetsRequiredException extends S.TaggedErrorClass<TargetsRequiredException>()(
  "TargetsRequiredException",
  { message: S.optional(S.String) },
) {}
export class TitleRequiredException extends S.TaggedErrorClass<TitleRequiredException>()(
  "TitleRequiredException",
  { message: S.optional(S.String) },
) {}
export class ApprovalRuleContentRequiredException extends S.TaggedErrorClass<ApprovalRuleContentRequiredException>()(
  "ApprovalRuleContentRequiredException",
  { message: S.optional(S.String) },
) {}
export class ApprovalRuleNameAlreadyExistsException extends S.TaggedErrorClass<ApprovalRuleNameAlreadyExistsException>()(
  "ApprovalRuleNameAlreadyExistsException",
  { message: S.optional(S.String) },
).pipe(C.withAlreadyExistsError) {}
export class ApprovalRuleNameRequiredException extends S.TaggedErrorClass<ApprovalRuleNameRequiredException>()(
  "ApprovalRuleNameRequiredException",
  { message: S.optional(S.String) },
) {}
export class InvalidApprovalRuleContentException extends S.TaggedErrorClass<InvalidApprovalRuleContentException>()(
  "InvalidApprovalRuleContentException",
  { message: S.optional(S.String) },
) {}
export class InvalidApprovalRuleNameException extends S.TaggedErrorClass<InvalidApprovalRuleNameException>()(
  "InvalidApprovalRuleNameException",
  { message: S.optional(S.String) },
) {}
export class InvalidPullRequestIdException extends S.TaggedErrorClass<InvalidPullRequestIdException>()(
  "InvalidPullRequestIdException",
  { message: S.optional(S.String) },
) {}
export class NumberOfRulesExceededException extends S.TaggedErrorClass<NumberOfRulesExceededException>()(
  "NumberOfRulesExceededException",
  { message: S.optional(S.String) },
) {}
export class PullRequestAlreadyClosedException extends S.TaggedErrorClass<PullRequestAlreadyClosedException>()(
  "PullRequestAlreadyClosedException",
  { message: S.optional(S.String) },
) {}
export class PullRequestDoesNotExistException extends S.TaggedErrorClass<PullRequestDoesNotExistException>()(
  "PullRequestDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class PullRequestIdRequiredException extends S.TaggedErrorClass<PullRequestIdRequiredException>()(
  "PullRequestIdRequiredException",
  { message: S.optional(S.String) },
) {}
export class EncryptionKeyInvalidIdException extends S.TaggedErrorClass<EncryptionKeyInvalidIdException>()(
  "EncryptionKeyInvalidIdException",
  { message: S.optional(S.String) },
) {}
export class EncryptionKeyInvalidUsageException extends S.TaggedErrorClass<EncryptionKeyInvalidUsageException>()(
  "EncryptionKeyInvalidUsageException",
  { message: S.optional(S.String) },
) {}
export class InvalidRepositoryDescriptionException extends S.TaggedErrorClass<InvalidRepositoryDescriptionException>()(
  "InvalidRepositoryDescriptionException",
  { message: S.optional(S.String) },
) {}
export class InvalidSystemTagUsageException extends S.TaggedErrorClass<InvalidSystemTagUsageException>()(
  "InvalidSystemTagUsageException",
  { message: S.optional(S.String) },
) {}
export class InvalidTagsMapException extends S.TaggedErrorClass<InvalidTagsMapException>()(
  "InvalidTagsMapException",
  { message: S.optional(S.String) },
) {}
export class OperationNotAllowedException extends S.TaggedErrorClass<OperationNotAllowedException>()(
  "OperationNotAllowedException",
  { message: S.optional(S.String) },
) {}
export class RepositoryLimitExceededException extends S.TaggedErrorClass<RepositoryLimitExceededException>()(
  "RepositoryLimitExceededException",
  { message: S.optional(S.String) },
) {}
export class RepositoryNameExistsException extends S.TaggedErrorClass<RepositoryNameExistsException>()(
  "RepositoryNameExistsException",
  { message: S.optional(S.String) },
) {}
export class TagPolicyException extends S.TaggedErrorClass<TagPolicyException>()(
  "TagPolicyException",
  { message: S.optional(S.String) },
) {}
export class TooManyTagsException extends S.TaggedErrorClass<TooManyTagsException>()(
  "TooManyTagsException",
  { message: S.optional(S.String) },
) {}
export class ConcurrentReferenceUpdateException extends S.TaggedErrorClass<ConcurrentReferenceUpdateException>()(
  "ConcurrentReferenceUpdateException",
  { message: S.optional(S.String) },
) {}
export class InvalidConflictResolutionException extends S.TaggedErrorClass<InvalidConflictResolutionException>()(
  "InvalidConflictResolutionException",
  { message: S.optional(S.String) },
) {}
export class InvalidReplacementContentException extends S.TaggedErrorClass<InvalidReplacementContentException>()(
  "InvalidReplacementContentException",
  { message: S.optional(S.String) },
) {}
export class InvalidReplacementTypeException extends S.TaggedErrorClass<InvalidReplacementTypeException>()(
  "InvalidReplacementTypeException",
  { message: S.optional(S.String) },
) {}
export class ManualMergeRequiredException extends S.TaggedErrorClass<ManualMergeRequiredException>()(
  "ManualMergeRequiredException",
  { message: S.optional(S.String) },
) {}
export class MaximumConflictResolutionEntriesExceededException extends S.TaggedErrorClass<MaximumConflictResolutionEntriesExceededException>()(
  "MaximumConflictResolutionEntriesExceededException",
  { message: S.optional(S.String) },
) {}
export class MultipleConflictResolutionEntriesException extends S.TaggedErrorClass<MultipleConflictResolutionEntriesException>()(
  "MultipleConflictResolutionEntriesException",
  { message: S.optional(S.String) },
) {}
export class ReplacementContentRequiredException extends S.TaggedErrorClass<ReplacementContentRequiredException>()(
  "ReplacementContentRequiredException",
  { message: S.optional(S.String) },
) {}
export class ReplacementTypeRequiredException extends S.TaggedErrorClass<ReplacementTypeRequiredException>()(
  "ReplacementTypeRequiredException",
  { message: S.optional(S.String) },
) {}
export class ApprovalRuleTemplateInUseException extends S.TaggedErrorClass<ApprovalRuleTemplateInUseException>()(
  "ApprovalRuleTemplateInUseException",
  { message: S.optional(S.String) },
) {}
export class DefaultBranchCannotBeDeletedException extends S.TaggedErrorClass<DefaultBranchCannotBeDeletedException>()(
  "DefaultBranchCannotBeDeletedException",
  { message: S.optional(S.String) },
) {}
export class CommentDeletedException extends S.TaggedErrorClass<CommentDeletedException>()(
  "CommentDeletedException",
  { message: S.optional(S.String) },
) {}
export class CommentDoesNotExistException extends S.TaggedErrorClass<CommentDoesNotExistException>()(
  "CommentDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class CommentIdRequiredException extends S.TaggedErrorClass<CommentIdRequiredException>()(
  "CommentIdRequiredException",
  { message: S.optional(S.String) },
) {}
export class InvalidCommentIdException extends S.TaggedErrorClass<InvalidCommentIdException>()(
  "InvalidCommentIdException",
  { message: S.optional(S.String) },
) {}
export class CannotDeleteApprovalRuleFromTemplateException extends S.TaggedErrorClass<CannotDeleteApprovalRuleFromTemplateException>()(
  "CannotDeleteApprovalRuleFromTemplateException",
  { message: S.optional(S.String) },
) {}
export class ActorDoesNotExistException extends S.TaggedErrorClass<ActorDoesNotExistException>()(
  "ActorDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class InvalidActorArnException extends S.TaggedErrorClass<InvalidActorArnException>()(
  "InvalidActorArnException",
  { message: S.optional(S.String) },
) {}
export class InvalidMaxResultsException extends S.TaggedErrorClass<InvalidMaxResultsException>()(
  "InvalidMaxResultsException",
  { message: S.optional(S.String) },
) {}
export class InvalidPullRequestEventTypeException extends S.TaggedErrorClass<InvalidPullRequestEventTypeException>()(
  "InvalidPullRequestEventTypeException",
  { message: S.optional(S.String) },
) {}
export class InvalidRevisionIdException extends S.TaggedErrorClass<InvalidRevisionIdException>()(
  "InvalidRevisionIdException",
  { message: S.optional(S.String) },
) {}
export class RevisionIdRequiredException extends S.TaggedErrorClass<RevisionIdRequiredException>()(
  "RevisionIdRequiredException",
  { message: S.optional(S.String) },
) {}
export class RevisionNotCurrentException extends S.TaggedErrorClass<RevisionNotCurrentException>()(
  "RevisionNotCurrentException",
  { message: S.optional(S.String) },
) {}
export class BlobIdDoesNotExistException extends S.TaggedErrorClass<BlobIdDoesNotExistException>()(
  "BlobIdDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class BlobIdRequiredException extends S.TaggedErrorClass<BlobIdRequiredException>()(
  "BlobIdRequiredException",
  { message: S.optional(S.String) },
) {}
export class FileTooLargeException extends S.TaggedErrorClass<FileTooLargeException>()(
  "FileTooLargeException",
  { message: S.optional(S.String) },
) {}
export class InvalidBlobIdException extends S.TaggedErrorClass<InvalidBlobIdException>()(
  "InvalidBlobIdException",
  { message: S.optional(S.String) },
) {}
export class InvalidReactionUserArnException extends S.TaggedErrorClass<InvalidReactionUserArnException>()(
  "InvalidReactionUserArnException",
  { message: S.optional(S.String) },
) {}
export class RepositoryNotAssociatedWithPullRequestException extends S.TaggedErrorClass<RepositoryNotAssociatedWithPullRequestException>()(
  "RepositoryNotAssociatedWithPullRequestException",
  { message: S.optional(S.String) },
) {}
export class CommitIdDoesNotExistException extends S.TaggedErrorClass<CommitIdDoesNotExistException>()(
  "CommitIdDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class PathDoesNotExistException extends S.TaggedErrorClass<PathDoesNotExistException>()(
  "PathDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class FolderDoesNotExistException extends S.TaggedErrorClass<FolderDoesNotExistException>()(
  "FolderDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class InvalidDestinationCommitSpecifierException extends S.TaggedErrorClass<InvalidDestinationCommitSpecifierException>()(
  "InvalidDestinationCommitSpecifierException",
  { message: S.optional(S.String) },
) {}
export class InvalidSourceCommitSpecifierException extends S.TaggedErrorClass<InvalidSourceCommitSpecifierException>()(
  "InvalidSourceCommitSpecifierException",
  { message: S.optional(S.String) },
) {}
export class AuthorDoesNotExistException extends S.TaggedErrorClass<AuthorDoesNotExistException>()(
  "AuthorDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class InvalidAuthorArnException extends S.TaggedErrorClass<InvalidAuthorArnException>()(
  "InvalidAuthorArnException",
  { message: S.optional(S.String) },
) {}
export class InvalidPullRequestStatusException extends S.TaggedErrorClass<InvalidPullRequestStatusException>()(
  "InvalidPullRequestStatusException",
  { message: S.optional(S.String) },
) {}
export class InvalidOrderException extends S.TaggedErrorClass<InvalidOrderException>()(
  "InvalidOrderException",
  { message: S.optional(S.String) },
) {}
export class InvalidSortByException extends S.TaggedErrorClass<InvalidSortByException>()(
  "InvalidSortByException",
  { message: S.optional(S.String) },
) {}
export class InvalidResourceArnException extends S.TaggedErrorClass<InvalidResourceArnException>()(
  "InvalidResourceArnException",
  { message: S.optional(S.String) },
) {}
export class ResourceArnRequiredException extends S.TaggedErrorClass<ResourceArnRequiredException>()(
  "ResourceArnRequiredException",
  { message: S.optional(S.String) },
) {}
export class InvalidTargetBranchException extends S.TaggedErrorClass<InvalidTargetBranchException>()(
  "InvalidTargetBranchException",
  { message: S.optional(S.String) },
) {}
export class PullRequestApprovalRulesNotSatisfiedException extends S.TaggedErrorClass<PullRequestApprovalRulesNotSatisfiedException>()(
  "PullRequestApprovalRulesNotSatisfiedException",
  { message: S.optional(S.String) },
) {}
export class TipOfSourceReferenceIsDifferentException extends S.TaggedErrorClass<TipOfSourceReferenceIsDifferentException>()(
  "TipOfSourceReferenceIsDifferentException",
  { message: S.optional(S.String) },
) {}
export class InvalidOverrideStatusException extends S.TaggedErrorClass<InvalidOverrideStatusException>()(
  "InvalidOverrideStatusException",
  { message: S.optional(S.String) },
) {}
export class OverrideAlreadySetException extends S.TaggedErrorClass<OverrideAlreadySetException>()(
  "OverrideAlreadySetException",
  { message: S.optional(S.String) },
) {}
export class OverrideStatusRequiredException extends S.TaggedErrorClass<OverrideStatusRequiredException>()(
  "OverrideStatusRequiredException",
  { message: S.optional(S.String) },
) {}
export class BeforeCommitIdAndAfterCommitIdAreSameException extends S.TaggedErrorClass<BeforeCommitIdAndAfterCommitIdAreSameException>()(
  "BeforeCommitIdAndAfterCommitIdAreSameException",
  { message: S.optional(S.String) },
) {}
export class CommentContentRequiredException extends S.TaggedErrorClass<CommentContentRequiredException>()(
  "CommentContentRequiredException",
  { message: S.optional(S.String) },
) {}
export class CommentContentSizeLimitExceededException extends S.TaggedErrorClass<CommentContentSizeLimitExceededException>()(
  "CommentContentSizeLimitExceededException",
  { message: S.optional(S.String) },
) {}
export class InvalidFileLocationException extends S.TaggedErrorClass<InvalidFileLocationException>()(
  "InvalidFileLocationException",
  { message: S.optional(S.String) },
) {}
export class InvalidFilePositionException extends S.TaggedErrorClass<InvalidFilePositionException>()(
  "InvalidFilePositionException",
  { message: S.optional(S.String) },
) {}
export class InvalidRelativeFileVersionEnumException extends S.TaggedErrorClass<InvalidRelativeFileVersionEnumException>()(
  "InvalidRelativeFileVersionEnumException",
  { message: S.optional(S.String) },
) {}
export class InvalidReactionValueException extends S.TaggedErrorClass<InvalidReactionValueException>()(
  "InvalidReactionValueException",
  { message: S.optional(S.String) },
) {}
export class ReactionLimitExceededException extends S.TaggedErrorClass<ReactionLimitExceededException>()(
  "ReactionLimitExceededException",
  { message: S.optional(S.String) },
) {}
export class ReactionValueRequiredException extends S.TaggedErrorClass<ReactionValueRequiredException>()(
  "ReactionValueRequiredException",
  { message: S.optional(S.String) },
) {}
export class FileContentRequiredException extends S.TaggedErrorClass<FileContentRequiredException>()(
  "FileContentRequiredException",
  { message: S.optional(S.String) },
) {}
export class SameFileContentException extends S.TaggedErrorClass<SameFileContentException>()(
  "SameFileContentException",
  { message: S.optional(S.String) },
) {}
export class InvalidRepositoryTriggerBranchNameException extends S.TaggedErrorClass<InvalidRepositoryTriggerBranchNameException>()(
  "InvalidRepositoryTriggerBranchNameException",
  { message: S.optional(S.String) },
) {}
export class InvalidRepositoryTriggerCustomDataException extends S.TaggedErrorClass<InvalidRepositoryTriggerCustomDataException>()(
  "InvalidRepositoryTriggerCustomDataException",
  { message: S.optional(S.String) },
) {}
export class InvalidRepositoryTriggerDestinationArnException extends S.TaggedErrorClass<InvalidRepositoryTriggerDestinationArnException>()(
  "InvalidRepositoryTriggerDestinationArnException",
  { message: S.optional(S.String) },
) {}
export class InvalidRepositoryTriggerEventsException extends S.TaggedErrorClass<InvalidRepositoryTriggerEventsException>()(
  "InvalidRepositoryTriggerEventsException",
  { message: S.optional(S.String) },
) {}
export class InvalidRepositoryTriggerNameException extends S.TaggedErrorClass<InvalidRepositoryTriggerNameException>()(
  "InvalidRepositoryTriggerNameException",
  { message: S.optional(S.String) },
) {}
export class InvalidRepositoryTriggerRegionException extends S.TaggedErrorClass<InvalidRepositoryTriggerRegionException>()(
  "InvalidRepositoryTriggerRegionException",
  { message: S.optional(S.String) },
) {}
export class MaximumBranchesExceededException extends S.TaggedErrorClass<MaximumBranchesExceededException>()(
  "MaximumBranchesExceededException",
  { message: S.optional(S.String) },
) {}
export class MaximumRepositoryTriggersExceededException extends S.TaggedErrorClass<MaximumRepositoryTriggersExceededException>()(
  "MaximumRepositoryTriggersExceededException",
  { message: S.optional(S.String) },
) {}
export class RepositoryTriggerBranchNameListRequiredException extends S.TaggedErrorClass<RepositoryTriggerBranchNameListRequiredException>()(
  "RepositoryTriggerBranchNameListRequiredException",
  { message: S.optional(S.String) },
) {}
export class RepositoryTriggerDestinationArnRequiredException extends S.TaggedErrorClass<RepositoryTriggerDestinationArnRequiredException>()(
  "RepositoryTriggerDestinationArnRequiredException",
  { message: S.optional(S.String) },
) {}
export class RepositoryTriggerEventsListRequiredException extends S.TaggedErrorClass<RepositoryTriggerEventsListRequiredException>()(
  "RepositoryTriggerEventsListRequiredException",
  { message: S.optional(S.String) },
) {}
export class RepositoryTriggerNameRequiredException extends S.TaggedErrorClass<RepositoryTriggerNameRequiredException>()(
  "RepositoryTriggerNameRequiredException",
  { message: S.optional(S.String) },
) {}
export class RepositoryTriggersListRequiredException extends S.TaggedErrorClass<RepositoryTriggersListRequiredException>()(
  "RepositoryTriggersListRequiredException",
  { message: S.optional(S.String) },
) {}
export class TagsMapRequiredException extends S.TaggedErrorClass<TagsMapRequiredException>()(
  "TagsMapRequiredException",
  { message: S.optional(S.String) },
) {}
export class InvalidTagKeysListException extends S.TaggedErrorClass<InvalidTagKeysListException>()(
  "InvalidTagKeysListException",
  { message: S.optional(S.String) },
) {}
export class TagKeysListRequiredException extends S.TaggedErrorClass<TagKeysListRequiredException>()(
  "TagKeysListRequiredException",
  { message: S.optional(S.String) },
) {}
export class InvalidRuleContentSha256Exception extends S.TaggedErrorClass<InvalidRuleContentSha256Exception>()(
  "InvalidRuleContentSha256Exception",
  { message: S.optional(S.String) },
) {}
export class CommentNotCreatedByCallerException extends S.TaggedErrorClass<CommentNotCreatedByCallerException>()(
  "CommentNotCreatedByCallerException",
  { message: S.optional(S.String) },
) {}
export class ApprovalRuleDoesNotExistException extends S.TaggedErrorClass<ApprovalRuleDoesNotExistException>()(
  "ApprovalRuleDoesNotExistException",
  { message: S.optional(S.String) },
) {}
export class CannotModifyApprovalRuleFromTemplateException extends S.TaggedErrorClass<CannotModifyApprovalRuleFromTemplateException>()(
  "CannotModifyApprovalRuleFromTemplateException",
  { message: S.optional(S.String) },
) {}
export class ApprovalStateRequiredException extends S.TaggedErrorClass<ApprovalStateRequiredException>()(
  "ApprovalStateRequiredException",
  { message: S.optional(S.String) },
) {}
export class InvalidApprovalStateException extends S.TaggedErrorClass<InvalidApprovalStateException>()(
  "InvalidApprovalStateException",
  { message: S.optional(S.String) },
) {}
export class MaximumNumberOfApprovalsExceededException extends S.TaggedErrorClass<MaximumNumberOfApprovalsExceededException>()(
  "MaximumNumberOfApprovalsExceededException",
  { message: S.optional(S.String) },
) {}
export class PullRequestCannotBeApprovedByAuthorException extends S.TaggedErrorClass<PullRequestCannotBeApprovedByAuthorException>()(
  "PullRequestCannotBeApprovedByAuthorException",
  { message: S.optional(S.String) },
) {}
export class InvalidPullRequestStatusUpdateException extends S.TaggedErrorClass<InvalidPullRequestStatusUpdateException>()(
  "InvalidPullRequestStatusUpdateException",
  { message: S.optional(S.String) },
) {}
export class PullRequestStatusRequiredException extends S.TaggedErrorClass<PullRequestStatusRequiredException>()(
  "PullRequestStatusRequiredException",
  { message: S.optional(S.String) },
) {}
export class EncryptionKeyRequiredException extends S.TaggedErrorClass<EncryptionKeyRequiredException>()(
  "EncryptionKeyRequiredException",
  { message: S.optional(S.String) },
) {}

//# Operations
/**
 * Creates an association between an approval rule template and a specified repository.
 * Then, the next time a pull request is created in the repository where the destination
 * reference (if specified) matches the destination reference (branch) for the pull
 * request, an approval rule that matches the template conditions is automatically created
 * for that pull request. If no destination references are specified in the template, an
 * approval rule that matches the template contents is created for all pull requests in
 * that repository.
 */
export const associateApprovalRuleTemplateWithRepository: API.OperationMethod<
  AssociateApprovalRuleTemplateWithRepositoryInput,
  AssociateApprovalRuleTemplateWithRepositoryResponse,
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleTemplateNameException
  | InvalidRepositoryNameException
  | MaximumRuleTemplatesAssociatedWithRepositoryException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateApprovalRuleTemplateWithRepositoryInput,
  output: AssociateApprovalRuleTemplateWithRepositoryResponse,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleTemplateNameException,
    InvalidRepositoryNameException,
    MaximumRuleTemplatesAssociatedWithRepositoryException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Creates an association between an approval rule template and one or more specified repositories.
 */
export const batchAssociateApprovalRuleTemplateWithRepositories: API.OperationMethod<
  BatchAssociateApprovalRuleTemplateWithRepositoriesInput,
  BatchAssociateApprovalRuleTemplateWithRepositoriesOutput,
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleTemplateNameException
  | MaximumRepositoryNamesExceededException
  | RepositoryNamesRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchAssociateApprovalRuleTemplateWithRepositoriesInput,
  output: BatchAssociateApprovalRuleTemplateWithRepositoriesOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleTemplateNameException,
    MaximumRepositoryNamesExceededException,
    RepositoryNamesRequiredException,
  ],
}));
/**
 * Returns information about one or more merge conflicts in the attempted merge of two commit specifiers using the squash or three-way merge strategy.
 */
export const batchDescribeMergeConflicts: API.OperationMethod<
  BatchDescribeMergeConflictsInput,
  BatchDescribeMergeConflictsOutput,
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionStrategyException
  | InvalidContinuationTokenException
  | InvalidMaxConflictFilesException
  | InvalidMaxMergeHunksException
  | InvalidMergeOptionException
  | InvalidRepositoryNameException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MergeOptionRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDescribeMergeConflictsInput,
  output: BatchDescribeMergeConflictsOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionStrategyException,
    InvalidContinuationTokenException,
    InvalidMaxConflictFilesException,
    InvalidMaxMergeHunksException,
    InvalidMergeOptionException,
    InvalidRepositoryNameException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MergeOptionRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
}));
/**
 * Removes the association between an approval rule template and one or more specified repositories.
 */
export const batchDisassociateApprovalRuleTemplateFromRepositories: API.OperationMethod<
  BatchDisassociateApprovalRuleTemplateFromRepositoriesInput,
  BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput,
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleTemplateNameException
  | MaximumRepositoryNamesExceededException
  | RepositoryNamesRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDisassociateApprovalRuleTemplateFromRepositoriesInput,
  output: BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleTemplateNameException,
    MaximumRepositoryNamesExceededException,
    RepositoryNamesRequiredException,
  ],
}));
/**
 * Returns information about the contents of one or more commits in a repository.
 */
export const batchGetCommits: API.OperationMethod<
  BatchGetCommitsInput,
  BatchGetCommitsOutput,
  | CommitIdsLimitExceededException
  | CommitIdsListRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetCommitsInput,
  output: BatchGetCommitsOutput,
  errors: [
    CommitIdsLimitExceededException,
    CommitIdsListRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Returns information about one or more repositories.
 *
 * The description field for a repository accepts all HTML characters and all valid
 * Unicode characters. Applications that do not HTML-encode the description and display
 * it in a webpage can expose users to potentially malicious code. Make sure that you
 * HTML-encode the description field in any application that uses this API to display
 * the repository description on a webpage.
 */
export const batchGetRepositories: API.OperationMethod<
  BatchGetRepositoriesInput,
  BatchGetRepositoriesOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | MaximumRepositoryNamesExceededException
  | RepositoryNamesRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetRepositoriesInput,
  output: BatchGetRepositoriesOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    MaximumRepositoryNamesExceededException,
    RepositoryNamesRequiredException,
  ],
}));
/**
 * Creates a template for approval rules that can then be associated with one or more
 * repositories in your Amazon Web Services account. When you associate a template with a repository,
 * CodeCommit creates an approval rule that matches the conditions of the template for all
 * pull requests that meet the conditions of the template. For more information, see
 * AssociateApprovalRuleTemplateWithRepository.
 */
export const createApprovalRuleTemplate: API.OperationMethod<
  CreateApprovalRuleTemplateInput,
  CreateApprovalRuleTemplateOutput,
  | ApprovalRuleTemplateContentRequiredException
  | ApprovalRuleTemplateNameAlreadyExistsException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateContentException
  | InvalidApprovalRuleTemplateDescriptionException
  | InvalidApprovalRuleTemplateNameException
  | NumberOfRuleTemplatesExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateApprovalRuleTemplateInput,
  output: CreateApprovalRuleTemplateOutput,
  errors: [
    ApprovalRuleTemplateContentRequiredException,
    ApprovalRuleTemplateNameAlreadyExistsException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateContentException,
    InvalidApprovalRuleTemplateDescriptionException,
    InvalidApprovalRuleTemplateNameException,
    NumberOfRuleTemplatesExceededException,
  ],
}));
/**
 * Creates a branch in a repository and points the branch to a commit.
 *
 * Calling the create branch operation does not set a repository's default branch. To do this, call the update default branch operation.
 */
export const createBranch: API.OperationMethod<
  CreateBranchInput,
  CreateBranchResponse,
  | BranchNameExistsException
  | BranchNameRequiredException
  | CommitDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidBranchNameException
  | InvalidCommitIdException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateBranchInput,
  output: CreateBranchResponse,
  errors: [
    BranchNameExistsException,
    BranchNameRequiredException,
    CommitDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidBranchNameException,
    InvalidCommitIdException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Creates a commit for a repository on the tip of a specified branch.
 */
export const createCommit: API.OperationMethod<
  CreateCommitInput,
  CreateCommitOutput,
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitMessageLengthExceededException
  | DirectoryNameConflictsWithFileNameException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentAndSourceFileSpecifiedException
  | FileContentSizeLimitExceededException
  | FileDoesNotExistException
  | FileEntryRequiredException
  | FileModeRequiredException
  | FileNameConflictsWithDirectoryNameException
  | FilePathConflictsWithSubmodulePathException
  | FolderContentSizeLimitExceededException
  | InvalidBranchNameException
  | InvalidDeletionParameterException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidParentCommitIdException
  | InvalidPathException
  | InvalidRepositoryNameException
  | MaximumFileEntriesExceededException
  | NameLengthExceededException
  | NoChangeException
  | ParentCommitDoesNotExistException
  | ParentCommitIdOutdatedException
  | ParentCommitIdRequiredException
  | PathRequiredException
  | PutFileEntryConflictException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RestrictedSourceFileException
  | SamePathRequestException
  | SourceFileOrContentRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCommitInput,
  output: CreateCommitOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitMessageLengthExceededException,
    DirectoryNameConflictsWithFileNameException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentAndSourceFileSpecifiedException,
    FileContentSizeLimitExceededException,
    FileDoesNotExistException,
    FileEntryRequiredException,
    FileModeRequiredException,
    FileNameConflictsWithDirectoryNameException,
    FilePathConflictsWithSubmodulePathException,
    FolderContentSizeLimitExceededException,
    InvalidBranchNameException,
    InvalidDeletionParameterException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidParentCommitIdException,
    InvalidPathException,
    InvalidRepositoryNameException,
    MaximumFileEntriesExceededException,
    NameLengthExceededException,
    NoChangeException,
    ParentCommitDoesNotExistException,
    ParentCommitIdOutdatedException,
    ParentCommitIdRequiredException,
    PathRequiredException,
    PutFileEntryConflictException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RestrictedSourceFileException,
    SamePathRequestException,
    SourceFileOrContentRequiredException,
  ],
}));
/**
 * Creates a pull request in the specified repository.
 */
export const createPullRequest: API.OperationMethod<
  CreatePullRequestInput,
  CreatePullRequestOutput,
  | ClientRequestTokenRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | IdempotencyParameterMismatchException
  | InvalidClientRequestTokenException
  | InvalidDescriptionException
  | InvalidReferenceNameException
  | InvalidRepositoryNameException
  | InvalidTargetException
  | InvalidTargetsException
  | InvalidTitleException
  | MaximumOpenPullRequestsExceededException
  | MultipleRepositoriesInPullRequestException
  | ReferenceDoesNotExistException
  | ReferenceNameRequiredException
  | ReferenceTypeNotSupportedException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | SourceAndDestinationAreSameException
  | TargetRequiredException
  | TargetsRequiredException
  | TitleRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePullRequestInput,
  output: CreatePullRequestOutput,
  errors: [
    ClientRequestTokenRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    IdempotencyParameterMismatchException,
    InvalidClientRequestTokenException,
    InvalidDescriptionException,
    InvalidReferenceNameException,
    InvalidRepositoryNameException,
    InvalidTargetException,
    InvalidTargetsException,
    InvalidTitleException,
    MaximumOpenPullRequestsExceededException,
    MultipleRepositoriesInPullRequestException,
    ReferenceDoesNotExistException,
    ReferenceNameRequiredException,
    ReferenceTypeNotSupportedException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    SourceAndDestinationAreSameException,
    TargetRequiredException,
    TargetsRequiredException,
    TitleRequiredException,
  ],
}));
/**
 * Creates an approval rule for a pull request.
 */
export const createPullRequestApprovalRule: API.OperationMethod<
  CreatePullRequestApprovalRuleInput,
  CreatePullRequestApprovalRuleOutput,
  | ApprovalRuleContentRequiredException
  | ApprovalRuleNameAlreadyExistsException
  | ApprovalRuleNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleContentException
  | InvalidApprovalRuleNameException
  | InvalidPullRequestIdException
  | NumberOfRulesExceededException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePullRequestApprovalRuleInput,
  output: CreatePullRequestApprovalRuleOutput,
  errors: [
    ApprovalRuleContentRequiredException,
    ApprovalRuleNameAlreadyExistsException,
    ApprovalRuleNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleContentException,
    InvalidApprovalRuleNameException,
    InvalidPullRequestIdException,
    NumberOfRulesExceededException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
}));
/**
 * Creates a new, empty repository.
 */
export const createRepository: API.OperationMethod<
  CreateRepositoryInput,
  CreateRepositoryOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyInvalidIdException
  | EncryptionKeyInvalidUsageException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryDescriptionException
  | InvalidRepositoryNameException
  | InvalidSystemTagUsageException
  | InvalidTagsMapException
  | OperationNotAllowedException
  | RepositoryLimitExceededException
  | RepositoryNameExistsException
  | RepositoryNameRequiredException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRepositoryInput,
  output: CreateRepositoryOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyInvalidIdException,
    EncryptionKeyInvalidUsageException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryDescriptionException,
    InvalidRepositoryNameException,
    InvalidSystemTagUsageException,
    InvalidTagsMapException,
    OperationNotAllowedException,
    RepositoryLimitExceededException,
    RepositoryNameExistsException,
    RepositoryNameRequiredException,
    TagPolicyException,
    TooManyTagsException,
  ],
}));
/**
 * Creates an unreferenced commit that represents the result of merging two branches
 * using a specified merge strategy. This can help you determine the outcome of a potential
 * merge. This API cannot be used with the fast-forward merge strategy because that
 * strategy does not create a merge commit.
 *
 * This unreferenced merge commit
 * can only be accessed using the GetCommit API or through git commands such as git fetch. To retrieve this commit, you must specify its commit ID or otherwise reference it.
 */
export const createUnreferencedMergeCommit: API.OperationMethod<
  CreateUnreferencedMergeCommitInput,
  CreateUnreferencedMergeCommitOutput,
  | CommitDoesNotExistException
  | CommitMessageLengthExceededException
  | CommitRequiredException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentSizeLimitExceededException
  | FileModeRequiredException
  | FolderContentSizeLimitExceededException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionException
  | InvalidConflictResolutionStrategyException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidMergeOptionException
  | InvalidPathException
  | InvalidReplacementContentException
  | InvalidReplacementTypeException
  | InvalidRepositoryNameException
  | ManualMergeRequiredException
  | MaximumConflictResolutionEntriesExceededException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MergeOptionRequiredException
  | MultipleConflictResolutionEntriesException
  | NameLengthExceededException
  | PathRequiredException
  | ReplacementContentRequiredException
  | ReplacementTypeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUnreferencedMergeCommitInput,
  output: CreateUnreferencedMergeCommitOutput,
  errors: [
    CommitDoesNotExistException,
    CommitMessageLengthExceededException,
    CommitRequiredException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentSizeLimitExceededException,
    FileModeRequiredException,
    FolderContentSizeLimitExceededException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionException,
    InvalidConflictResolutionStrategyException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidMergeOptionException,
    InvalidPathException,
    InvalidReplacementContentException,
    InvalidReplacementTypeException,
    InvalidRepositoryNameException,
    ManualMergeRequiredException,
    MaximumConflictResolutionEntriesExceededException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MergeOptionRequiredException,
    MultipleConflictResolutionEntriesException,
    NameLengthExceededException,
    PathRequiredException,
    ReplacementContentRequiredException,
    ReplacementTypeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
}));
/**
 * Deletes a specified approval rule template. Deleting a template does not remove approval rules on pull requests already created with the template.
 */
export const deleteApprovalRuleTemplate: API.OperationMethod<
  DeleteApprovalRuleTemplateInput,
  DeleteApprovalRuleTemplateOutput,
  | ApprovalRuleTemplateInUseException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteApprovalRuleTemplateInput,
  output: DeleteApprovalRuleTemplateOutput,
  errors: [
    ApprovalRuleTemplateInUseException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
}));
/**
 * Deletes a branch from a repository, unless that branch is the default branch for the repository.
 */
export const deleteBranch: API.OperationMethod<
  DeleteBranchInput,
  DeleteBranchOutput,
  | BranchNameRequiredException
  | DefaultBranchCannotBeDeletedException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidBranchNameException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteBranchInput,
  output: DeleteBranchOutput,
  errors: [
    BranchNameRequiredException,
    DefaultBranchCannotBeDeletedException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidBranchNameException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Deletes the content of a comment made on a change, file, or commit in a repository.
 */
export const deleteCommentContent: API.OperationMethod<
  DeleteCommentContentInput,
  DeleteCommentContentOutput,
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | InvalidCommentIdException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCommentContentInput,
  output: DeleteCommentContentOutput,
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    InvalidCommentIdException,
  ],
}));
/**
 * Deletes a specified file from a specified branch. A commit is created on the branch
 * that contains the revision. The file still exists in the commits earlier to the commit
 * that contains the deletion.
 */
export const deleteFile: API.OperationMethod<
  DeleteFileInput,
  DeleteFileOutput,
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitMessageLengthExceededException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileDoesNotExistException
  | InvalidBranchNameException
  | InvalidEmailException
  | InvalidParentCommitIdException
  | InvalidPathException
  | InvalidRepositoryNameException
  | NameLengthExceededException
  | ParentCommitDoesNotExistException
  | ParentCommitIdOutdatedException
  | ParentCommitIdRequiredException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFileInput,
  output: DeleteFileOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitMessageLengthExceededException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileDoesNotExistException,
    InvalidBranchNameException,
    InvalidEmailException,
    InvalidParentCommitIdException,
    InvalidPathException,
    InvalidRepositoryNameException,
    NameLengthExceededException,
    ParentCommitDoesNotExistException,
    ParentCommitIdOutdatedException,
    ParentCommitIdRequiredException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Deletes an approval rule from a specified pull request. Approval rules can be deleted from a pull request only if the pull request is open, and if the
 * approval rule was created specifically for a pull request and not generated from an approval rule template associated with the repository where the
 * pull request was created. You cannot delete an approval rule from a merged or closed pull request.
 */
export const deletePullRequestApprovalRule: API.OperationMethod<
  DeletePullRequestApprovalRuleInput,
  DeletePullRequestApprovalRuleOutput,
  | ApprovalRuleNameRequiredException
  | CannotDeleteApprovalRuleFromTemplateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleNameException
  | InvalidPullRequestIdException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePullRequestApprovalRuleInput,
  output: DeletePullRequestApprovalRuleOutput,
  errors: [
    ApprovalRuleNameRequiredException,
    CannotDeleteApprovalRuleFromTemplateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleNameException,
    InvalidPullRequestIdException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
}));
/**
 * Deletes a repository. If a specified repository was already deleted, a null repository
 * ID is returned.
 *
 * Deleting a repository also deletes all associated objects and metadata. After a repository is
 * deleted, all future push calls to the deleted repository fail.
 */
export const deleteRepository: API.OperationMethod<
  DeleteRepositoryInput,
  DeleteRepositoryOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRepositoryInput,
  output: DeleteRepositoryOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Returns information about one or more merge conflicts in the attempted merge of two
 * commit specifiers using the squash or three-way merge strategy. If the merge option for
 * the attempted merge is specified as FAST_FORWARD_MERGE, an exception is thrown.
 */
export const describeMergeConflicts: API.OperationMethod<
  DescribeMergeConflictsInput,
  DescribeMergeConflictsOutput,
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileDoesNotExistException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionStrategyException
  | InvalidContinuationTokenException
  | InvalidMaxMergeHunksException
  | InvalidMergeOptionException
  | InvalidPathException
  | InvalidRepositoryNameException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MergeOptionRequiredException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: DescribeMergeConflictsInput,
  ) => stream.Stream<
    DescribeMergeConflictsOutput,
    | CommitDoesNotExistException
    | CommitRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | FileDoesNotExistException
    | InvalidCommitException
    | InvalidConflictDetailLevelException
    | InvalidConflictResolutionStrategyException
    | InvalidContinuationTokenException
    | InvalidMaxMergeHunksException
    | InvalidMergeOptionException
    | InvalidPathException
    | InvalidRepositoryNameException
    | MaximumFileContentToLoadExceededException
    | MaximumItemsToCompareExceededException
    | MergeOptionRequiredException
    | PathRequiredException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | TipsDivergenceExceededException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribeMergeConflictsInput,
  ) => stream.Stream<
    unknown,
    | CommitDoesNotExistException
    | CommitRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | FileDoesNotExistException
    | InvalidCommitException
    | InvalidConflictDetailLevelException
    | InvalidConflictResolutionStrategyException
    | InvalidContinuationTokenException
    | InvalidMaxMergeHunksException
    | InvalidMergeOptionException
    | InvalidPathException
    | InvalidRepositoryNameException
    | MaximumFileContentToLoadExceededException
    | MaximumItemsToCompareExceededException
    | MergeOptionRequiredException
    | PathRequiredException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | TipsDivergenceExceededException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribeMergeConflictsInput,
  output: DescribeMergeConflictsOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileDoesNotExistException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionStrategyException,
    InvalidContinuationTokenException,
    InvalidMaxMergeHunksException,
    InvalidMergeOptionException,
    InvalidPathException,
    InvalidRepositoryNameException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MergeOptionRequiredException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxMergeHunks",
  } as const,
}));
/**
 * Returns information about one or more pull request events.
 */
export const describePullRequestEvents: API.OperationMethod<
  DescribePullRequestEventsInput,
  DescribePullRequestEventsOutput,
  | ActorDoesNotExistException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidActorArnException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidPullRequestEventTypeException
  | InvalidPullRequestIdException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: DescribePullRequestEventsInput,
  ) => stream.Stream<
    DescribePullRequestEventsOutput,
    | ActorDoesNotExistException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidActorArnException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidPullRequestEventTypeException
    | InvalidPullRequestIdException
    | PullRequestDoesNotExistException
    | PullRequestIdRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: DescribePullRequestEventsInput,
  ) => stream.Stream<
    unknown,
    | ActorDoesNotExistException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidActorArnException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidPullRequestEventTypeException
    | InvalidPullRequestIdException
    | PullRequestDoesNotExistException
    | PullRequestIdRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: DescribePullRequestEventsInput,
  output: DescribePullRequestEventsOutput,
  errors: [
    ActorDoesNotExistException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidActorArnException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidPullRequestEventTypeException,
    InvalidPullRequestIdException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Removes the association between a template and a repository so that approval rules
 * based on the template are not automatically created when pull requests are created in
 * the specified repository. This does not delete any approval rules previously created for
 * pull requests through the template association.
 */
export const disassociateApprovalRuleTemplateFromRepository: API.OperationMethod<
  DisassociateApprovalRuleTemplateFromRepositoryInput,
  DisassociateApprovalRuleTemplateFromRepositoryResponse,
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleTemplateNameException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateApprovalRuleTemplateFromRepositoryInput,
  output: DisassociateApprovalRuleTemplateFromRepositoryResponse,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleTemplateNameException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Evaluates whether a pull request has met all the conditions specified in its associated approval rules.
 */
export const evaluatePullRequestApprovalRules: API.OperationMethod<
  EvaluatePullRequestApprovalRulesInput,
  EvaluatePullRequestApprovalRulesOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidPullRequestIdException
  | InvalidRevisionIdException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RevisionIdRequiredException
  | RevisionNotCurrentException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EvaluatePullRequestApprovalRulesInput,
  output: EvaluatePullRequestApprovalRulesOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidPullRequestIdException,
    InvalidRevisionIdException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RevisionIdRequiredException,
    RevisionNotCurrentException,
  ],
}));
/**
 * Returns information about a specified approval rule template.
 */
export const getApprovalRuleTemplate: API.OperationMethod<
  GetApprovalRuleTemplateInput,
  GetApprovalRuleTemplateOutput,
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApprovalRuleTemplateInput,
  output: GetApprovalRuleTemplateOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
}));
/**
 * Returns the base-64 encoded content of an individual blob in a repository.
 */
export const getBlob: API.OperationMethod<
  GetBlobInput,
  GetBlobOutput,
  | BlobIdDoesNotExistException
  | BlobIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileTooLargeException
  | InvalidBlobIdException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBlobInput,
  output: GetBlobOutput,
  errors: [
    BlobIdDoesNotExistException,
    BlobIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileTooLargeException,
    InvalidBlobIdException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Returns information about a repository branch, including its name and the last commit ID.
 */
export const getBranch: API.OperationMethod<
  GetBranchInput,
  GetBranchOutput,
  | BranchDoesNotExistException
  | BranchNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidBranchNameException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetBranchInput,
  output: GetBranchOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidBranchNameException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Returns the content of a comment made on a change, file, or commit in a repository.
 *
 * Reaction counts might include numbers from user identities who were deleted after the reaction was made. For a count of
 * reactions from active identities, use GetCommentReactions.
 */
export const getComment: API.OperationMethod<
  GetCommentInput,
  GetCommentOutput,
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommentIdException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCommentInput,
  output: GetCommentOutput,
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommentIdException,
  ],
}));
/**
 * Returns information about reactions to a specified comment ID. Reactions from users who have been deleted will not be included in the count.
 */
export const getCommentReactions: API.OperationMethod<
  GetCommentReactionsInput,
  GetCommentReactionsOutput,
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | InvalidCommentIdException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidReactionUserArnException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetCommentReactionsInput,
  ) => stream.Stream<
    GetCommentReactionsOutput,
    | CommentDeletedException
    | CommentDoesNotExistException
    | CommentIdRequiredException
    | InvalidCommentIdException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidReactionUserArnException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetCommentReactionsInput,
  ) => stream.Stream<
    unknown,
    | CommentDeletedException
    | CommentDoesNotExistException
    | CommentIdRequiredException
    | InvalidCommentIdException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidReactionUserArnException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetCommentReactionsInput,
  output: GetCommentReactionsOutput,
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    InvalidCommentIdException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidReactionUserArnException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns information about comments made on the comparison between two commits.
 *
 * Reaction counts might include numbers from user identities who were deleted after the reaction was made. For a count of
 * reactions from active identities, use GetCommentReactions.
 */
export const getCommentsForComparedCommit: API.OperationMethod<
  GetCommentsForComparedCommitInput,
  GetCommentsForComparedCommitOutput,
  | CommitDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitIdException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetCommentsForComparedCommitInput,
  ) => stream.Stream<
    GetCommentsForComparedCommitOutput,
    | CommitDoesNotExistException
    | CommitIdRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidCommitIdException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidRepositoryNameException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetCommentsForComparedCommitInput,
  ) => stream.Stream<
    unknown,
    | CommitDoesNotExistException
    | CommitIdRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidCommitIdException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidRepositoryNameException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetCommentsForComparedCommitInput,
  output: GetCommentsForComparedCommitOutput,
  errors: [
    CommitDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitIdException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns comments made on a pull request.
 *
 * Reaction counts might include numbers from user identities who were deleted after the reaction was made. For a count of
 * reactions from active identities, use GetCommentReactions.
 */
export const getCommentsForPullRequest: API.OperationMethod<
  GetCommentsForPullRequestInput,
  GetCommentsForPullRequestOutput,
  | CommitDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitIdException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidPullRequestIdException
  | InvalidRepositoryNameException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryNotAssociatedWithPullRequestException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetCommentsForPullRequestInput,
  ) => stream.Stream<
    GetCommentsForPullRequestOutput,
    | CommitDoesNotExistException
    | CommitIdRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidCommitIdException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidPullRequestIdException
    | InvalidRepositoryNameException
    | PullRequestDoesNotExistException
    | PullRequestIdRequiredException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | RepositoryNotAssociatedWithPullRequestException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetCommentsForPullRequestInput,
  ) => stream.Stream<
    unknown,
    | CommitDoesNotExistException
    | CommitIdRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidCommitIdException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidPullRequestIdException
    | InvalidRepositoryNameException
    | PullRequestDoesNotExistException
    | PullRequestIdRequiredException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | RepositoryNotAssociatedWithPullRequestException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetCommentsForPullRequestInput,
  output: GetCommentsForPullRequestOutput,
  errors: [
    CommitDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitIdException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidPullRequestIdException,
    InvalidRepositoryNameException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryNotAssociatedWithPullRequestException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns information about a commit, including commit message and committer information.
 */
export const getCommit: API.OperationMethod<
  GetCommitInput,
  GetCommitOutput,
  | CommitIdDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitIdException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCommitInput,
  output: GetCommitOutput,
  errors: [
    CommitIdDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitIdException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Returns information about the differences in a valid commit specifier (such as a
 * branch, tag, HEAD, commit ID, or other fully qualified reference). Results can be
 * limited to a specified path.
 */
export const getDifferences: API.OperationMethod<
  GetDifferencesInput,
  GetDifferencesOutput,
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidCommitIdException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidPathException
  | InvalidRepositoryNameException
  | PathDoesNotExistException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetDifferencesInput,
  ) => stream.Stream<
    GetDifferencesOutput,
    | CommitDoesNotExistException
    | CommitRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidCommitException
    | InvalidCommitIdException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidPathException
    | InvalidRepositoryNameException
    | PathDoesNotExistException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetDifferencesInput,
  ) => stream.Stream<
    unknown,
    | CommitDoesNotExistException
    | CommitRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidCommitException
    | InvalidCommitIdException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidPathException
    | InvalidRepositoryNameException
    | PathDoesNotExistException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetDifferencesInput,
  output: GetDifferencesOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidCommitIdException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidPathException,
    InvalidRepositoryNameException,
    PathDoesNotExistException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns the base-64 encoded contents of a specified file and its metadata.
 */
export const getFile: API.OperationMethod<
  GetFileInput,
  GetFileOutput,
  | CommitDoesNotExistException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileDoesNotExistException
  | FileTooLargeException
  | InvalidCommitException
  | InvalidPathException
  | InvalidRepositoryNameException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFileInput,
  output: GetFileOutput,
  errors: [
    CommitDoesNotExistException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileDoesNotExistException,
    FileTooLargeException,
    InvalidCommitException,
    InvalidPathException,
    InvalidRepositoryNameException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Returns the contents of a specified folder in a repository.
 */
export const getFolder: API.OperationMethod<
  GetFolderInput,
  GetFolderOutput,
  | CommitDoesNotExistException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FolderDoesNotExistException
  | InvalidCommitException
  | InvalidPathException
  | InvalidRepositoryNameException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFolderInput,
  output: GetFolderOutput,
  errors: [
    CommitDoesNotExistException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FolderDoesNotExistException,
    InvalidCommitException,
    InvalidPathException,
    InvalidRepositoryNameException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Returns information about a specified merge commit.
 */
export const getMergeCommit: API.OperationMethod<
  GetMergeCommitInput,
  GetMergeCommitOutput,
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionStrategyException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMergeCommitInput,
  output: GetMergeCommitOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionStrategyException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Returns information about merge conflicts between the before and after commit IDs for a pull request in a repository.
 */
export const getMergeConflicts: API.OperationMethod<
  GetMergeConflictsInput,
  GetMergeConflictsOutput,
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionStrategyException
  | InvalidContinuationTokenException
  | InvalidDestinationCommitSpecifierException
  | InvalidMaxConflictFilesException
  | InvalidMergeOptionException
  | InvalidRepositoryNameException
  | InvalidSourceCommitSpecifierException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MergeOptionRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetMergeConflictsInput,
  ) => stream.Stream<
    GetMergeConflictsOutput,
    | CommitDoesNotExistException
    | CommitRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidCommitException
    | InvalidConflictDetailLevelException
    | InvalidConflictResolutionStrategyException
    | InvalidContinuationTokenException
    | InvalidDestinationCommitSpecifierException
    | InvalidMaxConflictFilesException
    | InvalidMergeOptionException
    | InvalidRepositoryNameException
    | InvalidSourceCommitSpecifierException
    | MaximumFileContentToLoadExceededException
    | MaximumItemsToCompareExceededException
    | MergeOptionRequiredException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | TipsDivergenceExceededException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetMergeConflictsInput,
  ) => stream.Stream<
    unknown,
    | CommitDoesNotExistException
    | CommitRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidCommitException
    | InvalidConflictDetailLevelException
    | InvalidConflictResolutionStrategyException
    | InvalidContinuationTokenException
    | InvalidDestinationCommitSpecifierException
    | InvalidMaxConflictFilesException
    | InvalidMergeOptionException
    | InvalidRepositoryNameException
    | InvalidSourceCommitSpecifierException
    | MaximumFileContentToLoadExceededException
    | MaximumItemsToCompareExceededException
    | MergeOptionRequiredException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | TipsDivergenceExceededException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetMergeConflictsInput,
  output: GetMergeConflictsOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionStrategyException,
    InvalidContinuationTokenException,
    InvalidDestinationCommitSpecifierException,
    InvalidMaxConflictFilesException,
    InvalidMergeOptionException,
    InvalidRepositoryNameException,
    InvalidSourceCommitSpecifierException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MergeOptionRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxConflictFiles",
  } as const,
}));
/**
 * Returns information about the merge options available for merging two specified
 * branches. For details about why a merge option is not available, use GetMergeConflicts
 * or DescribeMergeConflicts.
 */
export const getMergeOptions: API.OperationMethod<
  GetMergeOptionsInput,
  GetMergeOptionsOutput,
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionStrategyException
  | InvalidRepositoryNameException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMergeOptionsInput,
  output: GetMergeOptionsOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionStrategyException,
    InvalidRepositoryNameException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
}));
/**
 * Gets information about a pull request in a specified repository.
 */
export const getPullRequest: API.OperationMethod<
  GetPullRequestInput,
  GetPullRequestOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidPullRequestIdException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPullRequestInput,
  output: GetPullRequestOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidPullRequestIdException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
}));
/**
 * Gets information about the approval states for a specified pull request. Approval states only apply to pull requests that have one or more
 * approval rules applied to them.
 */
export const getPullRequestApprovalStates: API.OperationMethod<
  GetPullRequestApprovalStatesInput,
  GetPullRequestApprovalStatesOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidPullRequestIdException
  | InvalidRevisionIdException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RevisionIdRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPullRequestApprovalStatesInput,
  output: GetPullRequestApprovalStatesOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidPullRequestIdException,
    InvalidRevisionIdException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RevisionIdRequiredException,
  ],
}));
/**
 * Returns information about whether approval rules have been set aside (overridden) for a
 * pull request, and if so, the Amazon Resource Name (ARN) of the user or identity that overrode the rules and their requirements for the pull request.
 */
export const getPullRequestOverrideState: API.OperationMethod<
  GetPullRequestOverrideStateInput,
  GetPullRequestOverrideStateOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidPullRequestIdException
  | InvalidRevisionIdException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RevisionIdRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPullRequestOverrideStateInput,
  output: GetPullRequestOverrideStateOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidPullRequestIdException,
    InvalidRevisionIdException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RevisionIdRequiredException,
  ],
}));
/**
 * Returns information about a repository.
 *
 * The description field for a repository accepts all HTML characters and all valid
 * Unicode characters. Applications that do not HTML-encode the description and display
 * it in a webpage can expose users to potentially malicious code. Make sure that you
 * HTML-encode the description field in any application that uses this API to display
 * the repository description on a webpage.
 */
export const getRepository: API.OperationMethod<
  GetRepositoryInput,
  GetRepositoryOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRepositoryInput,
  output: GetRepositoryOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Gets information about triggers configured for a repository.
 */
export const getRepositoryTriggers: API.OperationMethod<
  GetRepositoryTriggersInput,
  GetRepositoryTriggersOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRepositoryTriggersInput,
  output: GetRepositoryTriggersOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Lists all approval rule templates in the specified Amazon Web Services Region in your Amazon Web Services account. If
 * an Amazon Web Services Region is not specified, the Amazon Web Services Region where you are signed in is used.
 */
export const listApprovalRuleTemplates: API.OperationMethod<
  ListApprovalRuleTemplatesInput,
  ListApprovalRuleTemplatesOutput,
  InvalidContinuationTokenException | InvalidMaxResultsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListApprovalRuleTemplatesInput,
  ) => stream.Stream<
    ListApprovalRuleTemplatesOutput,
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApprovalRuleTemplatesInput,
  ) => stream.Stream<
    unknown,
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApprovalRuleTemplatesInput,
  output: ListApprovalRuleTemplatesOutput,
  errors: [InvalidContinuationTokenException, InvalidMaxResultsException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists all approval rule templates that are associated with a specified repository.
 */
export const listAssociatedApprovalRuleTemplatesForRepository: API.OperationMethod<
  ListAssociatedApprovalRuleTemplatesForRepositoryInput,
  ListAssociatedApprovalRuleTemplatesForRepositoryOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAssociatedApprovalRuleTemplatesForRepositoryInput,
  ) => stream.Stream<
    ListAssociatedApprovalRuleTemplatesForRepositoryOutput,
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidRepositoryNameException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAssociatedApprovalRuleTemplatesForRepositoryInput,
  ) => stream.Stream<
    unknown,
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidRepositoryNameException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAssociatedApprovalRuleTemplatesForRepositoryInput,
  output: ListAssociatedApprovalRuleTemplatesForRepositoryOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Gets information about one or more branches in a repository.
 */
export const listBranches: API.OperationMethod<
  ListBranchesInput,
  ListBranchesOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidContinuationTokenException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListBranchesInput,
  ) => stream.Stream<
    ListBranchesOutput,
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidContinuationTokenException
    | InvalidRepositoryNameException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListBranchesInput,
  ) => stream.Stream<
    BranchName,
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidContinuationTokenException
    | InvalidRepositoryNameException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBranchesInput,
  output: ListBranchesOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidContinuationTokenException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "branches",
  } as const,
}));
/**
 * Retrieves a list of commits and changes to a specified file.
 */
export const listFileCommitHistory: API.OperationMethod<
  ListFileCommitHistoryRequest,
  ListFileCommitHistoryResponse,
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFileCommitHistoryRequest,
  ) => stream.Stream<
    ListFileCommitHistoryResponse,
    | CommitDoesNotExistException
    | CommitRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidCommitException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidRepositoryNameException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | TipsDivergenceExceededException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFileCommitHistoryRequest,
  ) => stream.Stream<
    unknown,
    | CommitDoesNotExistException
    | CommitRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidCommitException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidRepositoryNameException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | TipsDivergenceExceededException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFileCommitHistoryRequest,
  output: ListFileCommitHistoryResponse,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a list of pull requests for a specified repository. The return list can be refined by pull request
 * status or pull request author ARN.
 */
export const listPullRequests: API.OperationMethod<
  ListPullRequestsInput,
  ListPullRequestsOutput,
  | AuthorDoesNotExistException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidAuthorArnException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidPullRequestStatusException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPullRequestsInput,
  ) => stream.Stream<
    ListPullRequestsOutput,
    | AuthorDoesNotExistException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidAuthorArnException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidPullRequestStatusException
    | InvalidRepositoryNameException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPullRequestsInput,
  ) => stream.Stream<
    unknown,
    | AuthorDoesNotExistException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidAuthorArnException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | InvalidPullRequestStatusException
    | InvalidRepositoryNameException
    | RepositoryDoesNotExistException
    | RepositoryNameRequiredException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPullRequestsInput,
  output: ListPullRequestsOutput,
  errors: [
    AuthorDoesNotExistException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidAuthorArnException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidPullRequestStatusException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Gets information about one or more repositories.
 */
export const listRepositories: API.OperationMethod<
  ListRepositoriesInput,
  ListRepositoriesOutput,
  | InvalidContinuationTokenException
  | InvalidOrderException
  | InvalidSortByException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRepositoriesInput,
  ) => stream.Stream<
    ListRepositoriesOutput,
    | InvalidContinuationTokenException
    | InvalidOrderException
    | InvalidSortByException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRepositoriesInput,
  ) => stream.Stream<
    RepositoryNameIdPair,
    | InvalidContinuationTokenException
    | InvalidOrderException
    | InvalidSortByException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRepositoriesInput,
  output: ListRepositoriesOutput,
  errors: [
    InvalidContinuationTokenException,
    InvalidOrderException,
    InvalidSortByException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositories",
  } as const,
}));
/**
 * Lists all repositories associated with the specified approval rule template.
 */
export const listRepositoriesForApprovalRuleTemplate: API.OperationMethod<
  ListRepositoriesForApprovalRuleTemplateInput,
  ListRepositoriesForApprovalRuleTemplateOutput,
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleTemplateNameException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRepositoriesForApprovalRuleTemplateInput,
  ) => stream.Stream<
    ListRepositoriesForApprovalRuleTemplateOutput,
    | ApprovalRuleTemplateDoesNotExistException
    | ApprovalRuleTemplateNameRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidApprovalRuleTemplateNameException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRepositoriesForApprovalRuleTemplateInput,
  ) => stream.Stream<
    unknown,
    | ApprovalRuleTemplateDoesNotExistException
    | ApprovalRuleTemplateNameRequiredException
    | EncryptionIntegrityChecksFailedException
    | EncryptionKeyAccessDeniedException
    | EncryptionKeyDisabledException
    | EncryptionKeyNotFoundException
    | EncryptionKeyUnavailableException
    | InvalidApprovalRuleTemplateNameException
    | InvalidContinuationTokenException
    | InvalidMaxResultsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRepositoriesForApprovalRuleTemplateInput,
  output: ListRepositoriesForApprovalRuleTemplateOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleTemplateNameException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Gets information about Amazon Web Servicestags for a specified Amazon Resource Name (ARN) in CodeCommit. For a list of valid resources in CodeCommit, see CodeCommit Resources and Operations in the CodeCommit User
 * Guide.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  | InvalidRepositoryNameException
  | InvalidResourceArnException
  | RepositoryDoesNotExistException
  | ResourceArnRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InvalidRepositoryNameException,
    InvalidResourceArnException,
    RepositoryDoesNotExistException,
    ResourceArnRequiredException,
  ],
}));
/**
 * Merges two branches using the fast-forward merge strategy.
 */
export const mergeBranchesByFastForward: API.OperationMethod<
  MergeBranchesByFastForwardInput,
  MergeBranchesByFastForwardOutput,
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitDoesNotExistException
  | CommitRequiredException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidBranchNameException
  | InvalidCommitException
  | InvalidRepositoryNameException
  | InvalidTargetBranchException
  | ManualMergeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MergeBranchesByFastForwardInput,
  output: MergeBranchesByFastForwardOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitDoesNotExistException,
    CommitRequiredException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidBranchNameException,
    InvalidCommitException,
    InvalidRepositoryNameException,
    InvalidTargetBranchException,
    ManualMergeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
}));
/**
 * Merges two branches using the squash merge strategy.
 */
export const mergeBranchesBySquash: API.OperationMethod<
  MergeBranchesBySquashInput,
  MergeBranchesBySquashOutput,
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitDoesNotExistException
  | CommitMessageLengthExceededException
  | CommitRequiredException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentSizeLimitExceededException
  | FileModeRequiredException
  | FolderContentSizeLimitExceededException
  | InvalidBranchNameException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionException
  | InvalidConflictResolutionStrategyException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidPathException
  | InvalidReplacementContentException
  | InvalidReplacementTypeException
  | InvalidRepositoryNameException
  | InvalidTargetBranchException
  | ManualMergeRequiredException
  | MaximumConflictResolutionEntriesExceededException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MultipleConflictResolutionEntriesException
  | NameLengthExceededException
  | PathRequiredException
  | ReplacementContentRequiredException
  | ReplacementTypeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MergeBranchesBySquashInput,
  output: MergeBranchesBySquashOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitDoesNotExistException,
    CommitMessageLengthExceededException,
    CommitRequiredException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentSizeLimitExceededException,
    FileModeRequiredException,
    FolderContentSizeLimitExceededException,
    InvalidBranchNameException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionException,
    InvalidConflictResolutionStrategyException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidPathException,
    InvalidReplacementContentException,
    InvalidReplacementTypeException,
    InvalidRepositoryNameException,
    InvalidTargetBranchException,
    ManualMergeRequiredException,
    MaximumConflictResolutionEntriesExceededException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MultipleConflictResolutionEntriesException,
    NameLengthExceededException,
    PathRequiredException,
    ReplacementContentRequiredException,
    ReplacementTypeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
}));
/**
 * Merges two specified branches using the three-way merge strategy.
 */
export const mergeBranchesByThreeWay: API.OperationMethod<
  MergeBranchesByThreeWayInput,
  MergeBranchesByThreeWayOutput,
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitDoesNotExistException
  | CommitMessageLengthExceededException
  | CommitRequiredException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentSizeLimitExceededException
  | FileModeRequiredException
  | FolderContentSizeLimitExceededException
  | InvalidBranchNameException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionException
  | InvalidConflictResolutionStrategyException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidPathException
  | InvalidReplacementContentException
  | InvalidReplacementTypeException
  | InvalidRepositoryNameException
  | InvalidTargetBranchException
  | ManualMergeRequiredException
  | MaximumConflictResolutionEntriesExceededException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MultipleConflictResolutionEntriesException
  | NameLengthExceededException
  | PathRequiredException
  | ReplacementContentRequiredException
  | ReplacementTypeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MergeBranchesByThreeWayInput,
  output: MergeBranchesByThreeWayOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitDoesNotExistException,
    CommitMessageLengthExceededException,
    CommitRequiredException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentSizeLimitExceededException,
    FileModeRequiredException,
    FolderContentSizeLimitExceededException,
    InvalidBranchNameException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionException,
    InvalidConflictResolutionStrategyException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidPathException,
    InvalidReplacementContentException,
    InvalidReplacementTypeException,
    InvalidRepositoryNameException,
    InvalidTargetBranchException,
    ManualMergeRequiredException,
    MaximumConflictResolutionEntriesExceededException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MultipleConflictResolutionEntriesException,
    NameLengthExceededException,
    PathRequiredException,
    ReplacementContentRequiredException,
    ReplacementTypeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
}));
/**
 * Attempts to merge the source commit of a pull request into the specified destination
 * branch for that pull request at the specified commit using the fast-forward merge strategy. If the merge is successful, it closes the pull request.
 */
export const mergePullRequestByFastForward: API.OperationMethod<
  MergePullRequestByFastForwardInput,
  MergePullRequestByFastForwardOutput,
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitIdException
  | InvalidPullRequestIdException
  | InvalidRepositoryNameException
  | ManualMergeRequiredException
  | PullRequestAlreadyClosedException
  | PullRequestApprovalRulesNotSatisfiedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | ReferenceDoesNotExistException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryNotAssociatedWithPullRequestException
  | TipOfSourceReferenceIsDifferentException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MergePullRequestByFastForwardInput,
  output: MergePullRequestByFastForwardOutput,
  errors: [
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitIdException,
    InvalidPullRequestIdException,
    InvalidRepositoryNameException,
    ManualMergeRequiredException,
    PullRequestAlreadyClosedException,
    PullRequestApprovalRulesNotSatisfiedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    ReferenceDoesNotExistException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryNotAssociatedWithPullRequestException,
    TipOfSourceReferenceIsDifferentException,
  ],
}));
/**
 * Attempts to merge the source commit of a pull request into the specified destination
 * branch for that pull request at the specified commit using the squash merge strategy. If the merge is successful, it closes the pull request.
 */
export const mergePullRequestBySquash: API.OperationMethod<
  MergePullRequestBySquashInput,
  MergePullRequestBySquashOutput,
  | CommitMessageLengthExceededException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentSizeLimitExceededException
  | FolderContentSizeLimitExceededException
  | InvalidCommitIdException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionException
  | InvalidConflictResolutionStrategyException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidPathException
  | InvalidPullRequestIdException
  | InvalidReplacementContentException
  | InvalidReplacementTypeException
  | InvalidRepositoryNameException
  | ManualMergeRequiredException
  | MaximumConflictResolutionEntriesExceededException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MultipleConflictResolutionEntriesException
  | NameLengthExceededException
  | PathRequiredException
  | PullRequestAlreadyClosedException
  | PullRequestApprovalRulesNotSatisfiedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | ReplacementContentRequiredException
  | ReplacementTypeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryNotAssociatedWithPullRequestException
  | TipOfSourceReferenceIsDifferentException
  | TipsDivergenceExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MergePullRequestBySquashInput,
  output: MergePullRequestBySquashOutput,
  errors: [
    CommitMessageLengthExceededException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentSizeLimitExceededException,
    FolderContentSizeLimitExceededException,
    InvalidCommitIdException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionException,
    InvalidConflictResolutionStrategyException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidPathException,
    InvalidPullRequestIdException,
    InvalidReplacementContentException,
    InvalidReplacementTypeException,
    InvalidRepositoryNameException,
    ManualMergeRequiredException,
    MaximumConflictResolutionEntriesExceededException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MultipleConflictResolutionEntriesException,
    NameLengthExceededException,
    PathRequiredException,
    PullRequestAlreadyClosedException,
    PullRequestApprovalRulesNotSatisfiedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    ReplacementContentRequiredException,
    ReplacementTypeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryNotAssociatedWithPullRequestException,
    TipOfSourceReferenceIsDifferentException,
    TipsDivergenceExceededException,
  ],
}));
/**
 * Attempts to merge the source commit of a pull request into the specified destination
 * branch for that pull request at the specified commit using the three-way merge strategy. If the merge is successful, it closes the pull request.
 */
export const mergePullRequestByThreeWay: API.OperationMethod<
  MergePullRequestByThreeWayInput,
  MergePullRequestByThreeWayOutput,
  | CommitMessageLengthExceededException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentSizeLimitExceededException
  | FolderContentSizeLimitExceededException
  | InvalidCommitIdException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionException
  | InvalidConflictResolutionStrategyException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidPathException
  | InvalidPullRequestIdException
  | InvalidReplacementContentException
  | InvalidReplacementTypeException
  | InvalidRepositoryNameException
  | ManualMergeRequiredException
  | MaximumConflictResolutionEntriesExceededException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MultipleConflictResolutionEntriesException
  | NameLengthExceededException
  | PathRequiredException
  | PullRequestAlreadyClosedException
  | PullRequestApprovalRulesNotSatisfiedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | ReplacementContentRequiredException
  | ReplacementTypeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryNotAssociatedWithPullRequestException
  | TipOfSourceReferenceIsDifferentException
  | TipsDivergenceExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MergePullRequestByThreeWayInput,
  output: MergePullRequestByThreeWayOutput,
  errors: [
    CommitMessageLengthExceededException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentSizeLimitExceededException,
    FolderContentSizeLimitExceededException,
    InvalidCommitIdException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionException,
    InvalidConflictResolutionStrategyException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidPathException,
    InvalidPullRequestIdException,
    InvalidReplacementContentException,
    InvalidReplacementTypeException,
    InvalidRepositoryNameException,
    ManualMergeRequiredException,
    MaximumConflictResolutionEntriesExceededException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MultipleConflictResolutionEntriesException,
    NameLengthExceededException,
    PathRequiredException,
    PullRequestAlreadyClosedException,
    PullRequestApprovalRulesNotSatisfiedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    ReplacementContentRequiredException,
    ReplacementTypeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryNotAssociatedWithPullRequestException,
    TipOfSourceReferenceIsDifferentException,
    TipsDivergenceExceededException,
  ],
}));
/**
 * Sets aside (overrides) all approval rule requirements for a specified pull request.
 */
export const overridePullRequestApprovalRules: API.OperationMethod<
  OverridePullRequestApprovalRulesInput,
  OverridePullRequestApprovalRulesResponse,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidOverrideStatusException
  | InvalidPullRequestIdException
  | InvalidRevisionIdException
  | OverrideAlreadySetException
  | OverrideStatusRequiredException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RevisionIdRequiredException
  | RevisionNotCurrentException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: OverridePullRequestApprovalRulesInput,
  output: OverridePullRequestApprovalRulesResponse,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidOverrideStatusException,
    InvalidPullRequestIdException,
    InvalidRevisionIdException,
    OverrideAlreadySetException,
    OverrideStatusRequiredException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RevisionIdRequiredException,
    RevisionNotCurrentException,
  ],
}));
/**
 * Posts a comment on the comparison between two commits.
 */
export const postCommentForComparedCommit: API.OperationMethod<
  PostCommentForComparedCommitInput,
  PostCommentForComparedCommitOutput,
  | BeforeCommitIdAndAfterCommitIdAreSameException
  | ClientRequestTokenRequiredException
  | CommentContentRequiredException
  | CommentContentSizeLimitExceededException
  | CommitDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | IdempotencyParameterMismatchException
  | InvalidClientRequestTokenException
  | InvalidCommitIdException
  | InvalidFileLocationException
  | InvalidFilePositionException
  | InvalidPathException
  | InvalidRelativeFileVersionEnumException
  | InvalidRepositoryNameException
  | PathDoesNotExistException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PostCommentForComparedCommitInput,
  output: PostCommentForComparedCommitOutput,
  errors: [
    BeforeCommitIdAndAfterCommitIdAreSameException,
    ClientRequestTokenRequiredException,
    CommentContentRequiredException,
    CommentContentSizeLimitExceededException,
    CommitDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    IdempotencyParameterMismatchException,
    InvalidClientRequestTokenException,
    InvalidCommitIdException,
    InvalidFileLocationException,
    InvalidFilePositionException,
    InvalidPathException,
    InvalidRelativeFileVersionEnumException,
    InvalidRepositoryNameException,
    PathDoesNotExistException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Posts a comment on a pull request.
 */
export const postCommentForPullRequest: API.OperationMethod<
  PostCommentForPullRequestInput,
  PostCommentForPullRequestOutput,
  | BeforeCommitIdAndAfterCommitIdAreSameException
  | ClientRequestTokenRequiredException
  | CommentContentRequiredException
  | CommentContentSizeLimitExceededException
  | CommitDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | IdempotencyParameterMismatchException
  | InvalidClientRequestTokenException
  | InvalidCommitIdException
  | InvalidFileLocationException
  | InvalidFilePositionException
  | InvalidPathException
  | InvalidPullRequestIdException
  | InvalidRelativeFileVersionEnumException
  | InvalidRepositoryNameException
  | PathDoesNotExistException
  | PathRequiredException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryNotAssociatedWithPullRequestException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PostCommentForPullRequestInput,
  output: PostCommentForPullRequestOutput,
  errors: [
    BeforeCommitIdAndAfterCommitIdAreSameException,
    ClientRequestTokenRequiredException,
    CommentContentRequiredException,
    CommentContentSizeLimitExceededException,
    CommitDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    IdempotencyParameterMismatchException,
    InvalidClientRequestTokenException,
    InvalidCommitIdException,
    InvalidFileLocationException,
    InvalidFilePositionException,
    InvalidPathException,
    InvalidPullRequestIdException,
    InvalidRelativeFileVersionEnumException,
    InvalidRepositoryNameException,
    PathDoesNotExistException,
    PathRequiredException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryNotAssociatedWithPullRequestException,
  ],
}));
/**
 * Posts a comment in reply to an existing comment on a comparison between commits or a pull request.
 */
export const postCommentReply: API.OperationMethod<
  PostCommentReplyInput,
  PostCommentReplyOutput,
  | ClientRequestTokenRequiredException
  | CommentContentRequiredException
  | CommentContentSizeLimitExceededException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | IdempotencyParameterMismatchException
  | InvalidClientRequestTokenException
  | InvalidCommentIdException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PostCommentReplyInput,
  output: PostCommentReplyOutput,
  errors: [
    ClientRequestTokenRequiredException,
    CommentContentRequiredException,
    CommentContentSizeLimitExceededException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    IdempotencyParameterMismatchException,
    InvalidClientRequestTokenException,
    InvalidCommentIdException,
  ],
}));
/**
 * Adds or updates a reaction to a specified comment for the user whose identity is used to make the request. You can only add or
 * update a reaction for yourself. You cannot add, modify, or delete a reaction for another user.
 */
export const putCommentReaction: API.OperationMethod<
  PutCommentReactionInput,
  PutCommentReactionResponse,
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | InvalidCommentIdException
  | InvalidReactionValueException
  | ReactionLimitExceededException
  | ReactionValueRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutCommentReactionInput,
  output: PutCommentReactionResponse,
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    InvalidCommentIdException,
    InvalidReactionValueException,
    ReactionLimitExceededException,
    ReactionValueRequiredException,
  ],
}));
/**
 * Adds or updates a file in a branch in an CodeCommit repository, and generates a commit for the addition in the specified branch.
 */
export const putFile: API.OperationMethod<
  PutFileInput,
  PutFileOutput,
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitMessageLengthExceededException
  | DirectoryNameConflictsWithFileNameException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentRequiredException
  | FileContentSizeLimitExceededException
  | FileNameConflictsWithDirectoryNameException
  | FilePathConflictsWithSubmodulePathException
  | FolderContentSizeLimitExceededException
  | InvalidBranchNameException
  | InvalidDeletionParameterException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidParentCommitIdException
  | InvalidPathException
  | InvalidRepositoryNameException
  | NameLengthExceededException
  | ParentCommitDoesNotExistException
  | ParentCommitIdOutdatedException
  | ParentCommitIdRequiredException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | SameFileContentException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutFileInput,
  output: PutFileOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitMessageLengthExceededException,
    DirectoryNameConflictsWithFileNameException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentRequiredException,
    FileContentSizeLimitExceededException,
    FileNameConflictsWithDirectoryNameException,
    FilePathConflictsWithSubmodulePathException,
    FolderContentSizeLimitExceededException,
    InvalidBranchNameException,
    InvalidDeletionParameterException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidParentCommitIdException,
    InvalidPathException,
    InvalidRepositoryNameException,
    NameLengthExceededException,
    ParentCommitDoesNotExistException,
    ParentCommitIdOutdatedException,
    ParentCommitIdRequiredException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    SameFileContentException,
  ],
}));
/**
 * Replaces all triggers for a repository. Used to create or delete triggers.
 */
export const putRepositoryTriggers: API.OperationMethod<
  PutRepositoryTriggersInput,
  PutRepositoryTriggersOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | InvalidRepositoryTriggerBranchNameException
  | InvalidRepositoryTriggerCustomDataException
  | InvalidRepositoryTriggerDestinationArnException
  | InvalidRepositoryTriggerEventsException
  | InvalidRepositoryTriggerNameException
  | InvalidRepositoryTriggerRegionException
  | MaximumBranchesExceededException
  | MaximumRepositoryTriggersExceededException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryTriggerBranchNameListRequiredException
  | RepositoryTriggerDestinationArnRequiredException
  | RepositoryTriggerEventsListRequiredException
  | RepositoryTriggerNameRequiredException
  | RepositoryTriggersListRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutRepositoryTriggersInput,
  output: PutRepositoryTriggersOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    InvalidRepositoryTriggerBranchNameException,
    InvalidRepositoryTriggerCustomDataException,
    InvalidRepositoryTriggerDestinationArnException,
    InvalidRepositoryTriggerEventsException,
    InvalidRepositoryTriggerNameException,
    InvalidRepositoryTriggerRegionException,
    MaximumBranchesExceededException,
    MaximumRepositoryTriggersExceededException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryTriggerBranchNameListRequiredException,
    RepositoryTriggerDestinationArnRequiredException,
    RepositoryTriggerEventsListRequiredException,
    RepositoryTriggerNameRequiredException,
    RepositoryTriggersListRequiredException,
  ],
}));
/**
 * Adds or updates tags for a resource in CodeCommit. For a list of valid resources
 * in CodeCommit, see CodeCommit Resources and Operations in the CodeCommit User
 * Guide.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  | InvalidRepositoryNameException
  | InvalidResourceArnException
  | InvalidSystemTagUsageException
  | InvalidTagsMapException
  | RepositoryDoesNotExistException
  | ResourceArnRequiredException
  | TagPolicyException
  | TagsMapRequiredException
  | TooManyTagsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceResponse,
  errors: [
    InvalidRepositoryNameException,
    InvalidResourceArnException,
    InvalidSystemTagUsageException,
    InvalidTagsMapException,
    RepositoryDoesNotExistException,
    ResourceArnRequiredException,
    TagPolicyException,
    TagsMapRequiredException,
    TooManyTagsException,
  ],
}));
/**
 * Tests the functionality of repository triggers by sending information to the trigger
 * target. If real data is available in the repository, the test sends data from the last
 * commit. If no data is available, sample data is generated.
 */
export const testRepositoryTriggers: API.OperationMethod<
  TestRepositoryTriggersInput,
  TestRepositoryTriggersOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | InvalidRepositoryTriggerBranchNameException
  | InvalidRepositoryTriggerCustomDataException
  | InvalidRepositoryTriggerDestinationArnException
  | InvalidRepositoryTriggerEventsException
  | InvalidRepositoryTriggerNameException
  | InvalidRepositoryTriggerRegionException
  | MaximumBranchesExceededException
  | MaximumRepositoryTriggersExceededException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryTriggerBranchNameListRequiredException
  | RepositoryTriggerDestinationArnRequiredException
  | RepositoryTriggerEventsListRequiredException
  | RepositoryTriggerNameRequiredException
  | RepositoryTriggersListRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestRepositoryTriggersInput,
  output: TestRepositoryTriggersOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    InvalidRepositoryTriggerBranchNameException,
    InvalidRepositoryTriggerCustomDataException,
    InvalidRepositoryTriggerDestinationArnException,
    InvalidRepositoryTriggerEventsException,
    InvalidRepositoryTriggerNameException,
    InvalidRepositoryTriggerRegionException,
    MaximumBranchesExceededException,
    MaximumRepositoryTriggersExceededException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryTriggerBranchNameListRequiredException,
    RepositoryTriggerDestinationArnRequiredException,
    RepositoryTriggerEventsListRequiredException,
    RepositoryTriggerNameRequiredException,
    RepositoryTriggersListRequiredException,
  ],
}));
/**
 * Removes tags for a resource in CodeCommit. For a list of valid resources in CodeCommit, see CodeCommit Resources and Operations in the CodeCommit User
 * Guide.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  | InvalidRepositoryNameException
  | InvalidResourceArnException
  | InvalidSystemTagUsageException
  | InvalidTagKeysListException
  | RepositoryDoesNotExistException
  | ResourceArnRequiredException
  | TagKeysListRequiredException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceResponse,
  errors: [
    InvalidRepositoryNameException,
    InvalidResourceArnException,
    InvalidSystemTagUsageException,
    InvalidTagKeysListException,
    RepositoryDoesNotExistException,
    ResourceArnRequiredException,
    TagKeysListRequiredException,
    TagPolicyException,
    TooManyTagsException,
  ],
}));
/**
 * Updates the content of an approval rule template. You can change the number of
 * required approvals, the membership of the approval rule, and whether an approval pool is
 * defined.
 */
export const updateApprovalRuleTemplateContent: API.OperationMethod<
  UpdateApprovalRuleTemplateContentInput,
  UpdateApprovalRuleTemplateContentOutput,
  | ApprovalRuleTemplateContentRequiredException
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateContentException
  | InvalidApprovalRuleTemplateNameException
  | InvalidRuleContentSha256Exception
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateApprovalRuleTemplateContentInput,
  output: UpdateApprovalRuleTemplateContentOutput,
  errors: [
    ApprovalRuleTemplateContentRequiredException,
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateContentException,
    InvalidApprovalRuleTemplateNameException,
    InvalidRuleContentSha256Exception,
  ],
}));
/**
 * Updates the description for a specified approval rule template.
 */
export const updateApprovalRuleTemplateDescription: API.OperationMethod<
  UpdateApprovalRuleTemplateDescriptionInput,
  UpdateApprovalRuleTemplateDescriptionOutput,
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateDescriptionException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateApprovalRuleTemplateDescriptionInput,
  output: UpdateApprovalRuleTemplateDescriptionOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateDescriptionException,
    InvalidApprovalRuleTemplateNameException,
  ],
}));
/**
 * Updates the name of a specified approval rule template.
 */
export const updateApprovalRuleTemplateName: API.OperationMethod<
  UpdateApprovalRuleTemplateNameInput,
  UpdateApprovalRuleTemplateNameOutput,
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameAlreadyExistsException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateApprovalRuleTemplateNameInput,
  output: UpdateApprovalRuleTemplateNameOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameAlreadyExistsException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
}));
/**
 * Replaces the contents of a comment.
 */
export const updateComment: API.OperationMethod<
  UpdateCommentInput,
  UpdateCommentOutput,
  | CommentContentRequiredException
  | CommentContentSizeLimitExceededException
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | CommentNotCreatedByCallerException
  | InvalidCommentIdException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCommentInput,
  output: UpdateCommentOutput,
  errors: [
    CommentContentRequiredException,
    CommentContentSizeLimitExceededException,
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    CommentNotCreatedByCallerException,
    InvalidCommentIdException,
  ],
}));
/**
 * Sets or changes the default branch name for the specified repository.
 *
 * If you use this operation to change the default branch name to the current default branch name, a success message is returned even though the default branch did not change.
 */
export const updateDefaultBranch: API.OperationMethod<
  UpdateDefaultBranchInput,
  UpdateDefaultBranchResponse,
  | BranchDoesNotExistException
  | BranchNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidBranchNameException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDefaultBranchInput,
  output: UpdateDefaultBranchResponse,
  errors: [
    BranchDoesNotExistException,
    BranchNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidBranchNameException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Updates the structure of an approval rule created specifically for a pull request. For example, you can change the number of required approvers and
 * the approval pool for approvers.
 */
export const updatePullRequestApprovalRuleContent: API.OperationMethod<
  UpdatePullRequestApprovalRuleContentInput,
  UpdatePullRequestApprovalRuleContentOutput,
  | ApprovalRuleContentRequiredException
  | ApprovalRuleDoesNotExistException
  | ApprovalRuleNameRequiredException
  | CannotModifyApprovalRuleFromTemplateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleContentException
  | InvalidApprovalRuleNameException
  | InvalidPullRequestIdException
  | InvalidRuleContentSha256Exception
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePullRequestApprovalRuleContentInput,
  output: UpdatePullRequestApprovalRuleContentOutput,
  errors: [
    ApprovalRuleContentRequiredException,
    ApprovalRuleDoesNotExistException,
    ApprovalRuleNameRequiredException,
    CannotModifyApprovalRuleFromTemplateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleContentException,
    InvalidApprovalRuleNameException,
    InvalidPullRequestIdException,
    InvalidRuleContentSha256Exception,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
}));
/**
 * Updates the state of a user's approval on a pull request. The user is derived from the signed-in account when the request is made.
 */
export const updatePullRequestApprovalState: API.OperationMethod<
  UpdatePullRequestApprovalStateInput,
  UpdatePullRequestApprovalStateResponse,
  | ApprovalStateRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalStateException
  | InvalidPullRequestIdException
  | InvalidRevisionIdException
  | MaximumNumberOfApprovalsExceededException
  | PullRequestAlreadyClosedException
  | PullRequestCannotBeApprovedByAuthorException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RevisionIdRequiredException
  | RevisionNotCurrentException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePullRequestApprovalStateInput,
  output: UpdatePullRequestApprovalStateResponse,
  errors: [
    ApprovalStateRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalStateException,
    InvalidPullRequestIdException,
    InvalidRevisionIdException,
    MaximumNumberOfApprovalsExceededException,
    PullRequestAlreadyClosedException,
    PullRequestCannotBeApprovedByAuthorException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RevisionIdRequiredException,
    RevisionNotCurrentException,
  ],
}));
/**
 * Replaces the contents of the description of a pull request.
 */
export const updatePullRequestDescription: API.OperationMethod<
  UpdatePullRequestDescriptionInput,
  UpdatePullRequestDescriptionOutput,
  | InvalidDescriptionException
  | InvalidPullRequestIdException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePullRequestDescriptionInput,
  output: UpdatePullRequestDescriptionOutput,
  errors: [
    InvalidDescriptionException,
    InvalidPullRequestIdException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
}));
/**
 * Updates the status of a pull request.
 */
export const updatePullRequestStatus: API.OperationMethod<
  UpdatePullRequestStatusInput,
  UpdatePullRequestStatusOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidPullRequestIdException
  | InvalidPullRequestStatusException
  | InvalidPullRequestStatusUpdateException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | PullRequestStatusRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePullRequestStatusInput,
  output: UpdatePullRequestStatusOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidPullRequestIdException,
    InvalidPullRequestStatusException,
    InvalidPullRequestStatusUpdateException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    PullRequestStatusRequiredException,
  ],
}));
/**
 * Replaces the title of a pull request.
 */
export const updatePullRequestTitle: API.OperationMethod<
  UpdatePullRequestTitleInput,
  UpdatePullRequestTitleOutput,
  | InvalidPullRequestIdException
  | InvalidTitleException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | TitleRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePullRequestTitleInput,
  output: UpdatePullRequestTitleOutput,
  errors: [
    InvalidPullRequestIdException,
    InvalidTitleException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    TitleRequiredException,
  ],
}));
/**
 * Sets or changes the comment or description for a repository.
 *
 * The description field for a repository accepts all HTML characters and all valid
 * Unicode characters. Applications that do not HTML-encode the description and display
 * it in a webpage can expose users to potentially malicious code. Make sure that you
 * HTML-encode the description field in any application that uses this API to display
 * the repository description on a webpage.
 */
export const updateRepositoryDescription: API.OperationMethod<
  UpdateRepositoryDescriptionInput,
  UpdateRepositoryDescriptionResponse,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryDescriptionException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRepositoryDescriptionInput,
  output: UpdateRepositoryDescriptionResponse,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryDescriptionException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Updates the Key Management Service encryption key used to encrypt and decrypt a CodeCommit repository.
 */
export const updateRepositoryEncryptionKey: API.OperationMethod<
  UpdateRepositoryEncryptionKeyInput,
  UpdateRepositoryEncryptionKeyOutput,
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyInvalidIdException
  | EncryptionKeyInvalidUsageException
  | EncryptionKeyNotFoundException
  | EncryptionKeyRequiredException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRepositoryEncryptionKeyInput,
  output: UpdateRepositoryEncryptionKeyOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyInvalidIdException,
    EncryptionKeyInvalidUsageException,
    EncryptionKeyNotFoundException,
    EncryptionKeyRequiredException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
}));
/**
 * Renames a repository. The repository name must be unique across the calling Amazon Web Services account.
 * Repository names are limited to 100 alphanumeric, dash, and underscore
 * characters, and cannot include certain characters. The suffix .git is prohibited. For
 * more information about the limits on repository names, see Quotas in the CodeCommit
 * User Guide.
 */
export const updateRepositoryName: API.OperationMethod<
  UpdateRepositoryNameInput,
  UpdateRepositoryNameResponse,
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameExistsException
  | RepositoryNameRequiredException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRepositoryNameInput,
  output: UpdateRepositoryNameResponse,
  errors: [
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameExistsException,
    RepositoryNameRequiredException,
  ],
}));
