import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CodeCommit",
  target: "CodeCommit_20150413",
  version: "2015-04-13",
  sigv4: "codecommit",
  protocol: awsJson1_1Protocol,
  xmlns: "http://codecommit.amazonaws.com/doc/2015-04-13",
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
  },
};

export class ActorDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("ActorDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class ApprovalRuleContentRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ApprovalRuleContentRequiredException")<{
    readonly message?: string;
  }> {}
export class ApprovalRuleDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("ApprovalRuleDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class ApprovalRuleNameAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ApprovalRuleNameAlreadyExistsException",
    ["AlreadyExistsError"],
  )<{ readonly message?: string }> {}
export class ApprovalRuleNameRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ApprovalRuleNameRequiredException")<{
    readonly message?: string;
  }> {}
export class ApprovalRuleTemplateContentRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "ApprovalRuleTemplateContentRequiredException",
  )<{ readonly message?: string }> {}
export class ApprovalRuleTemplateDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "ApprovalRuleTemplateDoesNotExistException",
  )<{ readonly message?: string }> {}
export class ApprovalRuleTemplateInUseException
  extends /*@__PURE__*/ TE.TaggedError("ApprovalRuleTemplateInUseException")<{
    readonly message?: string;
  }> {}
export class ApprovalRuleTemplateNameAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ApprovalRuleTemplateNameAlreadyExistsException",
    ["AlreadyExistsError"],
  )<{ readonly message?: string }> {}
export class ApprovalRuleTemplateNameRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "ApprovalRuleTemplateNameRequiredException",
  )<{ readonly message?: string }> {}
export class ApprovalStateRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ApprovalStateRequiredException")<{
    readonly message?: string;
  }> {}
export class AuthorDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("AuthorDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class BeforeCommitIdAndAfterCommitIdAreSameException
  extends /*@__PURE__*/ TE.TaggedError(
    "BeforeCommitIdAndAfterCommitIdAreSameException",
  )<{ readonly message?: string }> {}
export class BlobIdDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("BlobIdDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class BlobIdRequiredException
  extends /*@__PURE__*/ TE.TaggedError("BlobIdRequiredException")<{
    readonly message?: string;
  }> {}
export class BranchDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("BranchDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class BranchNameExistsException
  extends /*@__PURE__*/ TE.TaggedError("BranchNameExistsException")<{
    readonly message?: string;
  }> {}
export class BranchNameIsTagNameException
  extends /*@__PURE__*/ TE.TaggedError("BranchNameIsTagNameException")<{
    readonly message?: string;
  }> {}
export class BranchNameRequiredException
  extends /*@__PURE__*/ TE.TaggedError("BranchNameRequiredException")<{
    readonly message?: string;
  }> {}
export class CannotDeleteApprovalRuleFromTemplateException
  extends /*@__PURE__*/ TE.TaggedError(
    "CannotDeleteApprovalRuleFromTemplateException",
  )<{ readonly message?: string }> {}
export class CannotModifyApprovalRuleFromTemplateException
  extends /*@__PURE__*/ TE.TaggedError(
    "CannotModifyApprovalRuleFromTemplateException",
  )<{ readonly message?: string }> {}
export class ClientRequestTokenRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ClientRequestTokenRequiredException")<{
    readonly message?: string;
  }> {}
export class CommentContentRequiredException
  extends /*@__PURE__*/ TE.TaggedError("CommentContentRequiredException")<{
    readonly message?: string;
  }> {}
export class CommentContentSizeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "CommentContentSizeLimitExceededException",
  )<{ readonly message?: string }> {}
export class CommentDeletedException
  extends /*@__PURE__*/ TE.TaggedError("CommentDeletedException")<{
    readonly message?: string;
  }> {}
export class CommentDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("CommentDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class CommentIdRequiredException
  extends /*@__PURE__*/ TE.TaggedError("CommentIdRequiredException")<{
    readonly message?: string;
  }> {}
export class CommentNotCreatedByCallerException
  extends /*@__PURE__*/ TE.TaggedError("CommentNotCreatedByCallerException")<{
    readonly message?: string;
  }> {}
export class CommitDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("CommitDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class CommitIdDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("CommitIdDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class CommitIdRequiredException
  extends /*@__PURE__*/ TE.TaggedError("CommitIdRequiredException")<{
    readonly message?: string;
  }> {}
export class CommitIdsLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("CommitIdsLimitExceededException")<{
    readonly message?: string;
  }> {}
export class CommitIdsListRequiredException
  extends /*@__PURE__*/ TE.TaggedError("CommitIdsListRequiredException")<{
    readonly message?: string;
  }> {}
export class CommitMessageLengthExceededException
  extends /*@__PURE__*/ TE.TaggedError("CommitMessageLengthExceededException")<{
    readonly message?: string;
  }> {}
export class CommitRequiredException
  extends /*@__PURE__*/ TE.TaggedError("CommitRequiredException")<{
    readonly message?: string;
  }> {}
export class ConcurrentReferenceUpdateException
  extends /*@__PURE__*/ TE.TaggedError("ConcurrentReferenceUpdateException")<{
    readonly message?: string;
  }> {}
export class DefaultBranchCannotBeDeletedException
  extends /*@__PURE__*/ TE.TaggedError(
    "DefaultBranchCannotBeDeletedException",
  )<{ readonly message?: string }> {}
export class DirectoryNameConflictsWithFileNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "DirectoryNameConflictsWithFileNameException",
  )<{ readonly message?: string }> {}
export class EncryptionIntegrityChecksFailedException
  extends /*@__PURE__*/ TE.TaggedError(
    "EncryptionIntegrityChecksFailedException",
  )<{ readonly message?: string }> {}
export class EncryptionKeyAccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("EncryptionKeyAccessDeniedException", [
    "AuthError",
  ])<{ readonly message?: string }> {}
export class EncryptionKeyDisabledException
  extends /*@__PURE__*/ TE.TaggedError("EncryptionKeyDisabledException")<{
    readonly message?: string;
  }> {}
export class EncryptionKeyInvalidIdException
  extends /*@__PURE__*/ TE.TaggedError("EncryptionKeyInvalidIdException")<{
    readonly message?: string;
  }> {}
export class EncryptionKeyInvalidUsageException
  extends /*@__PURE__*/ TE.TaggedError("EncryptionKeyInvalidUsageException")<{
    readonly message?: string;
  }> {}
export class EncryptionKeyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("EncryptionKeyNotFoundException")<{
    readonly message?: string;
  }> {}
export class EncryptionKeyRequiredException
  extends /*@__PURE__*/ TE.TaggedError("EncryptionKeyRequiredException")<{
    readonly message?: string;
  }> {}
export class EncryptionKeyUnavailableException
  extends /*@__PURE__*/ TE.TaggedError("EncryptionKeyUnavailableException")<{
    readonly message?: string;
  }> {}
export class FileContentAndSourceFileSpecifiedException
  extends /*@__PURE__*/ TE.TaggedError(
    "FileContentAndSourceFileSpecifiedException",
  )<{ readonly message?: string }> {}
export class FileContentRequiredException
  extends /*@__PURE__*/ TE.TaggedError("FileContentRequiredException")<{
    readonly message?: string;
  }> {}
export class FileContentSizeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "FileContentSizeLimitExceededException",
  )<{ readonly message?: string }> {}
export class FileDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("FileDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class FileEntryRequiredException
  extends /*@__PURE__*/ TE.TaggedError("FileEntryRequiredException")<{
    readonly message?: string;
  }> {}
export class FileModeRequiredException
  extends /*@__PURE__*/ TE.TaggedError("FileModeRequiredException")<{
    readonly message?: string;
  }> {}
export class FileNameConflictsWithDirectoryNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "FileNameConflictsWithDirectoryNameException",
  )<{ readonly message?: string }> {}
export class FilePathConflictsWithSubmodulePathException
  extends /*@__PURE__*/ TE.TaggedError(
    "FilePathConflictsWithSubmodulePathException",
  )<{ readonly message?: string }> {}
export class FileTooLargeException
  extends /*@__PURE__*/ TE.TaggedError("FileTooLargeException")<{
    readonly message?: string;
  }> {}
export class FolderContentSizeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "FolderContentSizeLimitExceededException",
  )<{ readonly message?: string }> {}
export class FolderDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("FolderDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class IdempotencyParameterMismatchException
  extends /*@__PURE__*/ TE.TaggedError(
    "IdempotencyParameterMismatchException",
  )<{ readonly message?: string }> {}
export class InvalidActorArnException
  extends /*@__PURE__*/ TE.TaggedError("InvalidActorArnException")<{
    readonly message?: string;
  }> {}
export class InvalidApprovalRuleContentException
  extends /*@__PURE__*/ TE.TaggedError("InvalidApprovalRuleContentException")<{
    readonly message?: string;
  }> {}
export class InvalidApprovalRuleNameException
  extends /*@__PURE__*/ TE.TaggedError("InvalidApprovalRuleNameException")<{
    readonly message?: string;
  }> {}
export class InvalidApprovalRuleTemplateContentException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidApprovalRuleTemplateContentException",
  )<{ readonly message?: string }> {}
export class InvalidApprovalRuleTemplateDescriptionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidApprovalRuleTemplateDescriptionException",
  )<{ readonly message?: string }> {}
export class InvalidApprovalRuleTemplateNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidApprovalRuleTemplateNameException",
  )<{ readonly message?: string }> {}
export class InvalidApprovalStateException
  extends /*@__PURE__*/ TE.TaggedError("InvalidApprovalStateException")<{
    readonly message?: string;
  }> {}
export class InvalidAuthorArnException
  extends /*@__PURE__*/ TE.TaggedError("InvalidAuthorArnException")<{
    readonly message?: string;
  }> {}
export class InvalidBlobIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidBlobIdException")<{
    readonly message?: string;
  }> {}
export class InvalidBranchNameException
  extends /*@__PURE__*/ TE.TaggedError("InvalidBranchNameException")<{
    readonly message?: string;
  }> {}
export class InvalidClientRequestTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidClientRequestTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidCommentIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidCommentIdException")<{
    readonly message?: string;
  }> {}
export class InvalidCommitException
  extends /*@__PURE__*/ TE.TaggedError("InvalidCommitException")<{
    readonly message?: string;
  }> {}
export class InvalidCommitIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidCommitIdException")<{
    readonly message?: string;
  }> {}
export class InvalidConflictDetailLevelException
  extends /*@__PURE__*/ TE.TaggedError("InvalidConflictDetailLevelException")<{
    readonly message?: string;
  }> {}
export class InvalidConflictResolutionException
  extends /*@__PURE__*/ TE.TaggedError("InvalidConflictResolutionException")<{
    readonly message?: string;
  }> {}
export class InvalidConflictResolutionStrategyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidConflictResolutionStrategyException",
  )<{ readonly message?: string }> {}
export class InvalidContinuationTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidContinuationTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidDeletionParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidDeletionParameterException")<{
    readonly message?: string;
  }> {}
export class InvalidDescriptionException
  extends /*@__PURE__*/ TE.TaggedError("InvalidDescriptionException")<{
    readonly message?: string;
  }> {}
export class InvalidDestinationCommitSpecifierException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidDestinationCommitSpecifierException",
  )<{ readonly message?: string }> {}
export class InvalidEmailException
  extends /*@__PURE__*/ TE.TaggedError("InvalidEmailException")<{
    readonly message?: string;
  }> {}
export class InvalidFileLocationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidFileLocationException")<{
    readonly message?: string;
  }> {}
export class InvalidFileModeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidFileModeException")<{
    readonly message?: string;
  }> {}
export class InvalidFilePositionException
  extends /*@__PURE__*/ TE.TaggedError("InvalidFilePositionException")<{
    readonly message?: string;
  }> {}
export class InvalidMaxConflictFilesException
  extends /*@__PURE__*/ TE.TaggedError("InvalidMaxConflictFilesException")<{
    readonly message?: string;
  }> {}
export class InvalidMaxMergeHunksException
  extends /*@__PURE__*/ TE.TaggedError("InvalidMaxMergeHunksException")<{
    readonly message?: string;
  }> {}
export class InvalidMaxResultsException
  extends /*@__PURE__*/ TE.TaggedError("InvalidMaxResultsException")<{
    readonly message?: string;
  }> {}
export class InvalidMergeOptionException
  extends /*@__PURE__*/ TE.TaggedError("InvalidMergeOptionException")<{
    readonly message?: string;
  }> {}
export class InvalidOrderException
  extends /*@__PURE__*/ TE.TaggedError("InvalidOrderException")<{
    readonly message?: string;
  }> {}
export class InvalidOverrideStatusException
  extends /*@__PURE__*/ TE.TaggedError("InvalidOverrideStatusException")<{
    readonly message?: string;
  }> {}
export class InvalidParentCommitIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParentCommitIdException")<{
    readonly message?: string;
  }> {}
export class InvalidPathException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPathException")<{
    readonly message?: string;
  }> {}
export class InvalidPullRequestEventTypeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPullRequestEventTypeException")<{
    readonly message?: string;
  }> {}
export class InvalidPullRequestIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPullRequestIdException")<{
    readonly message?: string;
  }> {}
export class InvalidPullRequestStatusException
  extends /*@__PURE__*/ TE.TaggedError("InvalidPullRequestStatusException")<{
    readonly message?: string;
  }> {}
export class InvalidPullRequestStatusUpdateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPullRequestStatusUpdateException",
  )<{ readonly message?: string }> {}
export class InvalidReactionUserArnException
  extends /*@__PURE__*/ TE.TaggedError("InvalidReactionUserArnException")<{
    readonly message?: string;
  }> {}
export class InvalidReactionValueException
  extends /*@__PURE__*/ TE.TaggedError("InvalidReactionValueException")<{
    readonly message?: string;
  }> {}
export class InvalidReferenceNameException
  extends /*@__PURE__*/ TE.TaggedError("InvalidReferenceNameException")<{
    readonly message?: string;
  }> {}
export class InvalidRelativeFileVersionEnumException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRelativeFileVersionEnumException",
  )<{ readonly message?: string }> {}
export class InvalidReplacementContentException
  extends /*@__PURE__*/ TE.TaggedError("InvalidReplacementContentException")<{
    readonly message?: string;
  }> {}
export class InvalidReplacementTypeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidReplacementTypeException")<{
    readonly message?: string;
  }> {}
export class InvalidRepositoryDescriptionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRepositoryDescriptionException",
  )<{ readonly message?: string }> {}
export class InvalidRepositoryNameException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRepositoryNameException")<{
    readonly message?: string;
  }> {}
export class InvalidRepositoryTriggerBranchNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRepositoryTriggerBranchNameException",
  )<{ readonly message?: string }> {}
export class InvalidRepositoryTriggerCustomDataException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRepositoryTriggerCustomDataException",
  )<{ readonly message?: string }> {}
export class InvalidRepositoryTriggerDestinationArnException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRepositoryTriggerDestinationArnException",
  )<{ readonly message?: string }> {}
export class InvalidRepositoryTriggerEventsException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRepositoryTriggerEventsException",
  )<{ readonly message?: string }> {}
export class InvalidRepositoryTriggerNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRepositoryTriggerNameException",
  )<{ readonly message?: string }> {}
export class InvalidRepositoryTriggerRegionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRepositoryTriggerRegionException",
  )<{ readonly message?: string }> {}
export class InvalidResourceArnException
  extends /*@__PURE__*/ TE.TaggedError("InvalidResourceArnException")<{
    readonly message?: string;
  }> {}
export class InvalidRevisionIdException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRevisionIdException")<{
    readonly message?: string;
  }> {}
export class InvalidRuleContentSha256Exception
  extends /*@__PURE__*/ TE.TaggedError("InvalidRuleContentSha256Exception")<{
    readonly message?: string;
  }> {}
export class InvalidSortByException
  extends /*@__PURE__*/ TE.TaggedError("InvalidSortByException")<{
    readonly message?: string;
  }> {}
export class InvalidSourceCommitSpecifierException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSourceCommitSpecifierException",
  )<{ readonly message?: string }> {}
export class InvalidSystemTagUsageException
  extends /*@__PURE__*/ TE.TaggedError("InvalidSystemTagUsageException")<{
    readonly message?: string;
  }> {}
export class InvalidTagKeysListException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagKeysListException")<{
    readonly message?: string;
  }> {}
export class InvalidTagsMapException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagsMapException")<{
    readonly message?: string;
  }> {}
export class InvalidTargetBranchException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTargetBranchException")<{
    readonly message?: string;
  }> {}
export class InvalidTargetException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTargetException")<{
    readonly message?: string;
  }> {}
export class InvalidTargetsException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTargetsException")<{
    readonly message?: string;
  }> {}
export class InvalidTitleException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTitleException")<{
    readonly message?: string;
  }> {}
export class ManualMergeRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ManualMergeRequiredException")<{
    readonly message?: string;
  }> {}
export class MaximumBranchesExceededException
  extends /*@__PURE__*/ TE.TaggedError("MaximumBranchesExceededException")<{
    readonly message?: string;
  }> {}
export class MaximumConflictResolutionEntriesExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaximumConflictResolutionEntriesExceededException",
  )<{ readonly message?: string }> {}
export class MaximumFileContentToLoadExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaximumFileContentToLoadExceededException",
  )<{ readonly message?: string }> {}
export class MaximumFileEntriesExceededException
  extends /*@__PURE__*/ TE.TaggedError("MaximumFileEntriesExceededException")<{
    readonly message?: string;
  }> {}
export class MaximumItemsToCompareExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaximumItemsToCompareExceededException",
  )<{ readonly message?: string }> {}
export class MaximumNumberOfApprovalsExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaximumNumberOfApprovalsExceededException",
  )<{ readonly message?: string }> {}
export class MaximumOpenPullRequestsExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaximumOpenPullRequestsExceededException",
  )<{ readonly message?: string }> {}
export class MaximumRepositoryNamesExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaximumRepositoryNamesExceededException",
  )<{ readonly message?: string }> {}
export class MaximumRepositoryTriggersExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaximumRepositoryTriggersExceededException",
  )<{ readonly message?: string }> {}
export class MaximumRuleTemplatesAssociatedWithRepositoryException
  extends /*@__PURE__*/ TE.TaggedError(
    "MaximumRuleTemplatesAssociatedWithRepositoryException",
  )<{ readonly message?: string }> {}
export class MergeOptionRequiredException
  extends /*@__PURE__*/ TE.TaggedError("MergeOptionRequiredException")<{
    readonly message?: string;
  }> {}
export class MultipleConflictResolutionEntriesException
  extends /*@__PURE__*/ TE.TaggedError(
    "MultipleConflictResolutionEntriesException",
  )<{ readonly message?: string }> {}
export class MultipleRepositoriesInPullRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "MultipleRepositoriesInPullRequestException",
  )<{ readonly message?: string }> {}
export class NameLengthExceededException
  extends /*@__PURE__*/ TE.TaggedError("NameLengthExceededException")<{
    readonly message?: string;
  }> {}
export class NoChangeException
  extends /*@__PURE__*/ TE.TaggedError("NoChangeException")<{
    readonly message?: string;
  }> {}
export class NumberOfRulesExceededException
  extends /*@__PURE__*/ TE.TaggedError("NumberOfRulesExceededException")<{
    readonly message?: string;
  }> {}
export class NumberOfRuleTemplatesExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "NumberOfRuleTemplatesExceededException",
  )<{ readonly message?: string }> {}
export class OperationNotAllowedException
  extends /*@__PURE__*/ TE.TaggedError("OperationNotAllowedException")<{
    readonly message?: string;
  }> {}
export class OverrideAlreadySetException
  extends /*@__PURE__*/ TE.TaggedError("OverrideAlreadySetException")<{
    readonly message?: string;
  }> {}
export class OverrideStatusRequiredException
  extends /*@__PURE__*/ TE.TaggedError("OverrideStatusRequiredException")<{
    readonly message?: string;
  }> {}
export class ParentCommitDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("ParentCommitDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class ParentCommitIdOutdatedException
  extends /*@__PURE__*/ TE.TaggedError("ParentCommitIdOutdatedException")<{
    readonly message?: string;
  }> {}
export class ParentCommitIdRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ParentCommitIdRequiredException")<{
    readonly message?: string;
  }> {}
export class PathDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("PathDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class PathRequiredException
  extends /*@__PURE__*/ TE.TaggedError("PathRequiredException")<{
    readonly message?: string;
  }> {}
export class PullRequestAlreadyClosedException
  extends /*@__PURE__*/ TE.TaggedError("PullRequestAlreadyClosedException")<{
    readonly message?: string;
  }> {}
export class PullRequestApprovalRulesNotSatisfiedException
  extends /*@__PURE__*/ TE.TaggedError(
    "PullRequestApprovalRulesNotSatisfiedException",
  )<{ readonly message?: string }> {}
export class PullRequestCannotBeApprovedByAuthorException
  extends /*@__PURE__*/ TE.TaggedError(
    "PullRequestCannotBeApprovedByAuthorException",
  )<{ readonly message?: string }> {}
export class PullRequestDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("PullRequestDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class PullRequestIdRequiredException
  extends /*@__PURE__*/ TE.TaggedError("PullRequestIdRequiredException")<{
    readonly message?: string;
  }> {}
export class PullRequestStatusRequiredException
  extends /*@__PURE__*/ TE.TaggedError("PullRequestStatusRequiredException")<{
    readonly message?: string;
  }> {}
export class PutFileEntryConflictException
  extends /*@__PURE__*/ TE.TaggedError("PutFileEntryConflictException")<{
    readonly message?: string;
  }> {}
export class ReactionLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("ReactionLimitExceededException")<{
    readonly message?: string;
  }> {}
export class ReactionValueRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ReactionValueRequiredException")<{
    readonly message?: string;
  }> {}
export class ReferenceDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("ReferenceDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class ReferenceNameRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ReferenceNameRequiredException")<{
    readonly message?: string;
  }> {}
export class ReferenceTypeNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError("ReferenceTypeNotSupportedException")<{
    readonly message?: string;
  }> {}
export class ReplacementContentRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ReplacementContentRequiredException")<{
    readonly message?: string;
  }> {}
export class ReplacementTypeRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ReplacementTypeRequiredException")<{
    readonly message?: string;
  }> {}
export class RepositoryDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryDoesNotExistException")<{
    readonly message?: string;
  }> {}
export class RepositoryLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryLimitExceededException")<{
    readonly message?: string;
  }> {}
export class RepositoryNameExistsException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryNameExistsException")<{
    readonly message?: string;
  }> {}
export class RepositoryNameRequiredException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryNameRequiredException")<{
    readonly message?: string;
  }> {}
export class RepositoryNamesRequiredException
  extends /*@__PURE__*/ TE.TaggedError("RepositoryNamesRequiredException")<{
    readonly message?: string;
  }> {}
export class RepositoryNotAssociatedWithPullRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "RepositoryNotAssociatedWithPullRequestException",
  )<{ readonly message?: string }> {}
export class RepositoryTriggerBranchNameListRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "RepositoryTriggerBranchNameListRequiredException",
  )<{ readonly message?: string }> {}
export class RepositoryTriggerDestinationArnRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "RepositoryTriggerDestinationArnRequiredException",
  )<{ readonly message?: string }> {}
export class RepositoryTriggerEventsListRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "RepositoryTriggerEventsListRequiredException",
  )<{ readonly message?: string }> {}
export class RepositoryTriggerNameRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "RepositoryTriggerNameRequiredException",
  )<{ readonly message?: string }> {}
export class RepositoryTriggersListRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "RepositoryTriggersListRequiredException",
  )<{ readonly message?: string }> {}
export class ResourceArnRequiredException
  extends /*@__PURE__*/ TE.TaggedError("ResourceArnRequiredException")<{
    readonly message?: string;
  }> {}
export class RestrictedSourceFileException
  extends /*@__PURE__*/ TE.TaggedError("RestrictedSourceFileException")<{
    readonly message?: string;
  }> {}
export class RevisionIdRequiredException
  extends /*@__PURE__*/ TE.TaggedError("RevisionIdRequiredException")<{
    readonly message?: string;
  }> {}
export class RevisionNotCurrentException
  extends /*@__PURE__*/ TE.TaggedError("RevisionNotCurrentException")<{
    readonly message?: string;
  }> {}
export class SameFileContentException
  extends /*@__PURE__*/ TE.TaggedError("SameFileContentException")<{
    readonly message?: string;
  }> {}
export class SamePathRequestException
  extends /*@__PURE__*/ TE.TaggedError("SamePathRequestException")<{
    readonly message?: string;
  }> {}
export class SourceAndDestinationAreSameException
  extends /*@__PURE__*/ TE.TaggedError("SourceAndDestinationAreSameException")<{
    readonly message?: string;
  }> {}
export class SourceFileOrContentRequiredException
  extends /*@__PURE__*/ TE.TaggedError("SourceFileOrContentRequiredException")<{
    readonly message?: string;
  }> {}
export class TagKeysListRequiredException
  extends /*@__PURE__*/ TE.TaggedError("TagKeysListRequiredException")<{
    readonly message?: string;
  }> {}
export class TagPolicyException
  extends /*@__PURE__*/ TE.TaggedError("TagPolicyException")<{
    readonly message?: string;
  }> {}
export class TagsMapRequiredException
  extends /*@__PURE__*/ TE.TaggedError("TagsMapRequiredException")<{
    readonly message?: string;
  }> {}
export class TargetRequiredException
  extends /*@__PURE__*/ TE.TaggedError("TargetRequiredException")<{
    readonly message?: string;
  }> {}
export class TargetsRequiredException
  extends /*@__PURE__*/ TE.TaggedError("TargetsRequiredException")<{
    readonly message?: string;
  }> {}
export class TipOfSourceReferenceIsDifferentException
  extends /*@__PURE__*/ TE.TaggedError(
    "TipOfSourceReferenceIsDifferentException",
  )<{ readonly message?: string }> {}
export class TipsDivergenceExceededException
  extends /*@__PURE__*/ TE.TaggedError("TipsDivergenceExceededException")<{
    readonly message?: string;
  }> {}
export class TitleRequiredException
  extends /*@__PURE__*/ TE.TaggedError("TitleRequiredException")<{
    readonly message?: string;
  }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyTagsException")<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
  }> {}
export type ApprovalRuleTemplateName = string;
export type RepositoryName = string;
export interface AssociateApprovalRuleTemplateWithRepositoryInput {
  approvalRuleTemplateName: string;
  repositoryName: string;
}
export interface AssociateApprovalRuleTemplateWithRepositoryResponse {}
export type RepositoryNameList = string[];
export interface BatchAssociateApprovalRuleTemplateWithRepositoriesInput {
  approvalRuleTemplateName: string;
  repositoryNames: string[];
}
export type ErrorCode = string;
export type ErrorMessage = string;
export interface BatchAssociateApprovalRuleTemplateWithRepositoriesError_ {
  repositoryName?: string;
  errorCode?: string;
  errorMessage?: string;
}
export type BatchAssociateApprovalRuleTemplateWithRepositoriesErrorsList =
  BatchAssociateApprovalRuleTemplateWithRepositoriesError_[];
export interface BatchAssociateApprovalRuleTemplateWithRepositoriesOutput {
  associatedRepositoryNames: string[];
  errors: BatchAssociateApprovalRuleTemplateWithRepositoriesError_[];
}
export type CommitName = string;
export type MergeOptionTypeEnum =
  | "FAST_FORWARD_MERGE"
  | "SQUASH_MERGE"
  | "THREE_WAY_MERGE"
  | (string & {});
export type MaxResults = number;
export type Path = string;
export type FilePaths = string[];
export type ConflictDetailLevelTypeEnum =
  | "FILE_LEVEL"
  | "LINE_LEVEL"
  | (string & {});
export type ConflictResolutionStrategyTypeEnum =
  | "NONE"
  | "ACCEPT_SOURCE"
  | "ACCEPT_DESTINATION"
  | "AUTOMERGE"
  | (string & {});
export type NextToken = string;
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
export type FileSize = number;
export interface FileSizes {
  source?: number;
  destination?: number;
  base?: number;
}
export type FileModeTypeEnum =
  | "EXECUTABLE"
  | "NORMAL"
  | "SYMLINK"
  | (string & {});
export interface FileModes {
  source?: FileModeTypeEnum;
  destination?: FileModeTypeEnum;
  base?: FileModeTypeEnum;
}
export type ObjectTypeEnum =
  | "FILE"
  | "DIRECTORY"
  | "GIT_LINK"
  | "SYMBOLIC_LINK"
  | (string & {});
export interface ObjectTypes {
  source?: ObjectTypeEnum;
  destination?: ObjectTypeEnum;
  base?: ObjectTypeEnum;
}
export type NumberOfConflicts = number;
export type CapitalBoolean = boolean;
export interface IsBinaryFile {
  source?: boolean;
  destination?: boolean;
  base?: boolean;
}
export type IsContentConflict = boolean;
export type IsFileModeConflict = boolean;
export type IsObjectTypeConflict = boolean;
export type ChangeTypeEnum = "A" | "M" | "D" | (string & {});
export interface MergeOperations {
  source?: ChangeTypeEnum;
  destination?: ChangeTypeEnum;
}
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
export type IsHunkConflict = boolean;
export type LineNumber = number;
export type HunkContent = string;
export interface MergeHunkDetail {
  startLine?: number;
  endLine?: number;
  hunkContent?: string;
}
export interface MergeHunk {
  isConflict?: boolean;
  source?: MergeHunkDetail;
  destination?: MergeHunkDetail;
  base?: MergeHunkDetail;
}
export type MergeHunks = MergeHunk[];
export interface Conflict {
  conflictMetadata?: ConflictMetadata;
  mergeHunks?: MergeHunk[];
}
export type Conflicts = Conflict[];
export type ExceptionName = string;
export type Message = string;
export interface BatchDescribeMergeConflictsError_ {
  filePath: string;
  exceptionName: string;
  message: string;
}
export type BatchDescribeMergeConflictsErrors =
  BatchDescribeMergeConflictsError_[];
export type ObjectId = string;
export interface BatchDescribeMergeConflictsOutput {
  conflicts: Conflict[];
  nextToken?: string;
  errors?: BatchDescribeMergeConflictsError_[];
  destinationCommitId: string;
  sourceCommitId: string;
  baseCommitId?: string;
}
export interface BatchDisassociateApprovalRuleTemplateFromRepositoriesInput {
  approvalRuleTemplateName: string;
  repositoryNames: string[];
}
export interface BatchDisassociateApprovalRuleTemplateFromRepositoriesError_ {
  repositoryName?: string;
  errorCode?: string;
  errorMessage?: string;
}
export type BatchDisassociateApprovalRuleTemplateFromRepositoriesErrorsList =
  BatchDisassociateApprovalRuleTemplateFromRepositoriesError_[];
export interface BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput {
  disassociatedRepositoryNames: string[];
  errors: BatchDisassociateApprovalRuleTemplateFromRepositoriesError_[];
}
export type CommitIdsInputList = string[];
export interface BatchGetCommitsInput {
  commitIds: string[];
  repositoryName: string;
}
export type ParentList = string[];
export type Name = string;
export type Email = string;
export interface UserInfo {
  name?: string;
  email?: string;
  date?: string;
}
export type AdditionalData = string;
export interface Commit {
  commitId?: string;
  treeId?: string;
  parents?: string[];
  message?: string;
  author?: UserInfo;
  committer?: UserInfo;
  additionalData?: string;
}
export type CommitObjectsList = Commit[];
export interface BatchGetCommitsError_ {
  commitId?: string;
  errorCode?: string;
  errorMessage?: string;
}
export type BatchGetCommitsErrorsList = BatchGetCommitsError_[];
export interface BatchGetCommitsOutput {
  commits?: Commit[];
  errors?: BatchGetCommitsError_[];
}
export interface BatchGetRepositoriesInput {
  repositoryNames: string[];
}
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
export type RepositoryMetadataList = RepositoryMetadata[];
export type RepositoryNotFoundList = string[];
export type BatchGetRepositoriesErrorCodeEnum =
  | "EncryptionIntegrityChecksFailedException"
  | "EncryptionKeyAccessDeniedException"
  | "EncryptionKeyDisabledException"
  | "EncryptionKeyNotFoundException"
  | "EncryptionKeyUnavailableException"
  | "RepositoryDoesNotExistException"
  | (string & {});
export interface BatchGetRepositoriesError_ {
  repositoryId?: string;
  repositoryName?: string;
  errorCode?: BatchGetRepositoriesErrorCodeEnum;
  errorMessage?: string;
}
export type BatchGetRepositoriesErrorsList = BatchGetRepositoriesError_[];
export interface BatchGetRepositoriesOutput {
  repositories?: RepositoryMetadata[];
  repositoriesNotFound?: string[];
  errors?: BatchGetRepositoriesError_[];
}
export type ApprovalRuleTemplateContent = string;
export type ApprovalRuleTemplateDescription = string;
export interface CreateApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
  approvalRuleTemplateContent: string;
  approvalRuleTemplateDescription?: string;
}
export type ApprovalRuleTemplateId = string;
export type RuleContentSha256 = string;
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
export interface CreateApprovalRuleTemplateOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export type CommitId = string;
export interface CreateBranchInput {
  repositoryName: string;
  branchName: string;
  commitId: string;
}
export interface CreateBranchResponse {}
export type KeepEmptyFolders = boolean;
export type FileContent = Uint8Array;
export type IsMove = boolean;
export interface SourceFileSpecifier {
  filePath: string;
  isMove?: boolean;
}
export interface PutFileEntry {
  filePath: string;
  fileMode?: FileModeTypeEnum;
  fileContent?: Uint8Array;
  sourceFile?: SourceFileSpecifier;
}
export type PutFileEntries = PutFileEntry[];
export interface DeleteFileEntry {
  filePath: string;
}
export type DeleteFileEntries = DeleteFileEntry[];
export interface SetFileModeEntry {
  filePath: string;
  fileMode: FileModeTypeEnum;
}
export type SetFileModeEntries = SetFileModeEntry[];
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
export interface FileMetadata {
  absolutePath?: string;
  blobId?: string;
  fileMode?: FileModeTypeEnum;
}
export type FilesMetadata = FileMetadata[];
export interface CreateCommitOutput {
  commitId?: string;
  treeId?: string;
  filesAdded?: FileMetadata[];
  filesUpdated?: FileMetadata[];
  filesDeleted?: FileMetadata[];
}
export type Title = string;
export type Description = string;
export type ReferenceName = string;
export interface Target {
  repositoryName: string;
  sourceReference: string;
  destinationReference?: string;
}
export type TargetList = Target[];
export type ClientRequestToken = string;
export interface CreatePullRequestInput {
  title: string;
  description?: string;
  targets: Target[];
  clientRequestToken?: string;
}
export type PullRequestId = string;
export type PullRequestStatusEnum = "OPEN" | "CLOSED" | (string & {});
export type IsMerged = boolean;
export interface MergeMetadata {
  isMerged?: boolean;
  mergedBy?: string;
  mergeCommitId?: string;
  mergeOption?: MergeOptionTypeEnum;
}
export interface PullRequestTarget {
  repositoryName?: string;
  sourceReference?: string;
  destinationReference?: string;
  destinationCommit?: string;
  sourceCommit?: string;
  mergeBase?: string;
  mergeMetadata?: MergeMetadata;
}
export type PullRequestTargetList = PullRequestTarget[];
export type RevisionId = string;
export type ApprovalRuleId = string;
export type ApprovalRuleName = string;
export type ApprovalRuleContent = string;
export interface OriginApprovalRuleTemplate {
  approvalRuleTemplateId?: string;
  approvalRuleTemplateName?: string;
}
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
export type ApprovalRulesList = ApprovalRule[];
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
export interface CreatePullRequestOutput {
  pullRequest: PullRequest;
}
export interface CreatePullRequestApprovalRuleInput {
  pullRequestId: string;
  approvalRuleName: string;
  approvalRuleContent: string;
}
export interface CreatePullRequestApprovalRuleOutput {
  approvalRule: ApprovalRule;
}
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export interface CreateRepositoryInput {
  repositoryName: string;
  repositoryDescription?: string;
  tags?: { [key: string]: string | undefined };
  kmsKeyId?: string;
}
export interface CreateRepositoryOutput {
  repositoryMetadata?: RepositoryMetadata;
}
export type ReplacementTypeEnum =
  | "KEEP_BASE"
  | "KEEP_SOURCE"
  | "KEEP_DESTINATION"
  | "USE_NEW_CONTENT"
  | (string & {});
export interface ReplaceContentEntry {
  filePath: string;
  replacementType: ReplacementTypeEnum;
  content?: Uint8Array;
  fileMode?: FileModeTypeEnum;
}
export type ReplaceContentEntries = ReplaceContentEntry[];
export interface ConflictResolution {
  replaceContents?: ReplaceContentEntry[];
  deleteFiles?: DeleteFileEntry[];
  setFileModes?: SetFileModeEntry[];
}
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
export interface CreateUnreferencedMergeCommitOutput {
  commitId?: string;
  treeId?: string;
}
export interface DeleteApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
}
export interface DeleteApprovalRuleTemplateOutput {
  approvalRuleTemplateId: string;
}
export interface DeleteBranchInput {
  repositoryName: string;
  branchName: string;
}
export interface BranchInfo {
  branchName?: string;
  commitId?: string;
}
export interface DeleteBranchOutput {
  deletedBranch?: BranchInfo;
}
export type CommentId = string;
export interface DeleteCommentContentInput {
  commentId: string;
}
export type Content = string;
export type IsCommentDeleted = boolean;
export type ReactionValue = string;
export type CallerReactions = string[];
export type Count = number;
export type ReactionCountsMap = { [key: string]: number | undefined };
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
export interface DeleteCommentContentOutput {
  comment?: Comment;
}
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
export interface DeleteFileOutput {
  commitId: string;
  blobId: string;
  treeId: string;
  filePath: string;
}
export interface DeletePullRequestApprovalRuleInput {
  pullRequestId: string;
  approvalRuleName: string;
}
export interface DeletePullRequestApprovalRuleOutput {
  approvalRuleId: string;
}
export interface DeleteRepositoryInput {
  repositoryName: string;
}
export interface DeleteRepositoryOutput {
  repositoryId?: string;
}
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
export interface DescribeMergeConflictsOutput {
  conflictMetadata: ConflictMetadata;
  mergeHunks: MergeHunk[];
  nextToken?: string;
  destinationCommitId: string;
  sourceCommitId: string;
  baseCommitId?: string;
}
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
export interface DescribePullRequestEventsInput {
  pullRequestId: string;
  pullRequestEventType?: PullRequestEventType;
  actorArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export type EventDate = Date;
export interface PullRequestCreatedEventMetadata {
  repositoryName?: string;
  sourceCommitId?: string;
  destinationCommitId?: string;
  mergeBase?: string;
}
export interface PullRequestStatusChangedEventMetadata {
  pullRequestStatus?: PullRequestStatusEnum;
}
export interface PullRequestSourceReferenceUpdatedEventMetadata {
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  mergeBase?: string;
}
export interface PullRequestMergedStateChangedEventMetadata {
  repositoryName?: string;
  destinationReference?: string;
  mergeMetadata?: MergeMetadata;
}
export interface ApprovalRuleEventMetadata {
  approvalRuleName?: string;
  approvalRuleId?: string;
  approvalRuleContent?: string;
}
export type ApprovalState = "APPROVE" | "REVOKE" | (string & {});
export interface ApprovalStateChangedEventMetadata {
  revisionId?: string;
  approvalStatus?: ApprovalState;
}
export type OverrideStatus = "OVERRIDE" | "REVOKE" | (string & {});
export interface ApprovalRuleOverriddenEventMetadata {
  revisionId?: string;
  overrideStatus?: OverrideStatus;
}
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
export type PullRequestEventList = PullRequestEvent[];
export interface DescribePullRequestEventsOutput {
  pullRequestEvents: PullRequestEvent[];
  nextToken?: string;
}
export interface DisassociateApprovalRuleTemplateFromRepositoryInput {
  approvalRuleTemplateName: string;
  repositoryName: string;
}
export interface DisassociateApprovalRuleTemplateFromRepositoryResponse {}
export interface EvaluatePullRequestApprovalRulesInput {
  pullRequestId: string;
  revisionId: string;
}
export type Approved = boolean;
export type Overridden = boolean;
export type ApprovalRulesSatisfiedList = string[];
export type ApprovalRulesNotSatisfiedList = string[];
export interface Evaluation {
  approved?: boolean;
  overridden?: boolean;
  approvalRulesSatisfied?: string[];
  approvalRulesNotSatisfied?: string[];
}
export interface EvaluatePullRequestApprovalRulesOutput {
  evaluation: Evaluation;
}
export interface GetApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
}
export interface GetApprovalRuleTemplateOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export interface GetBlobInput {
  repositoryName: string;
  blobId: string;
}
export interface GetBlobOutput {
  content: Uint8Array;
}
export type DiffContext = number;
export type IgnoreWhiteSpaces = boolean;
export type Limit = number;
export interface GetBlobDifferencesInput {
  repositoryName: string;
  afterBlobId: string;
  beforeBlobId?: string;
  contextLines?: number;
  ignoreWhitespace?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export type DiffChangeType = "CONTEXT" | "ADD" | "DELETE" | (string & {});
export type LineContent = string;
export interface DiffChange {
  type?: DiffChangeType;
  beforeLineNumber?: number;
  afterLineNumber?: number;
  content?: string;
}
export type DiffChangeList = DiffChange[];
export interface DiffHunk {
  beforeStartLine?: number;
  beforeLineCount?: number;
  afterStartLine?: number;
  afterLineCount?: number;
  changes?: DiffChange[];
}
export type DiffHunkList = DiffHunk[];
export type ObjectSize = number;
export interface GetBlobDifferencesOutput {
  hunks: DiffHunk[];
  isBinary: boolean;
  beforeBlobSize?: number;
  afterBlobSize: number;
  NextToken?: string;
}
export interface GetBranchInput {
  repositoryName?: string;
  branchName?: string;
}
export interface GetBranchOutput {
  branch?: BranchInfo;
}
export interface GetCommentInput {
  commentId: string;
}
export interface GetCommentOutput {
  comment?: Comment;
}
export interface GetCommentReactionsInput {
  commentId: string;
  reactionUserArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export type ReactionEmoji = string;
export type ReactionShortCode = string;
export type ReactionUnicode = string;
export interface ReactionValueFormats {
  emoji?: string;
  shortCode?: string;
  unicode?: string;
}
export type ReactionUsersList = string[];
export interface ReactionForComment {
  reaction?: ReactionValueFormats;
  reactionUsers?: string[];
  reactionsFromDeletedUsersCount?: number;
}
export type ReactionsForCommentList = ReactionForComment[];
export interface GetCommentReactionsOutput {
  reactionsForComment: ReactionForComment[];
  nextToken?: string;
}
export interface GetCommentsForComparedCommitInput {
  repositoryName: string;
  beforeCommitId?: string;
  afterCommitId: string;
  nextToken?: string;
  maxResults?: number;
}
export type Position = number;
export type RelativeFileVersionEnum = "BEFORE" | "AFTER" | (string & {});
export interface Location {
  filePath?: string;
  filePosition?: number;
  relativeFileVersion?: RelativeFileVersionEnum;
}
export type Comments = Comment[];
export interface CommentsForComparedCommit {
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  beforeBlobId?: string;
  afterBlobId?: string;
  location?: Location;
  comments?: Comment[];
}
export type CommentsForComparedCommitData = CommentsForComparedCommit[];
export interface GetCommentsForComparedCommitOutput {
  commentsForComparedCommitData?: CommentsForComparedCommit[];
  nextToken?: string;
}
export interface GetCommentsForPullRequestInput {
  pullRequestId: string;
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  nextToken?: string;
  maxResults?: number;
}
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
export type CommentsForPullRequestData = CommentsForPullRequest[];
export interface GetCommentsForPullRequestOutput {
  commentsForPullRequestData?: CommentsForPullRequest[];
  nextToken?: string;
}
export interface GetCommitInput {
  repositoryName: string;
  commitId: string;
}
export interface GetCommitOutput {
  commit: Commit;
}
export interface GetDifferencesInput {
  repositoryName: string;
  beforeCommitSpecifier?: string;
  afterCommitSpecifier: string;
  beforePath?: string;
  afterPath?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type Mode = string;
export interface BlobMetadata {
  blobId?: string;
  path?: string;
  mode?: string;
}
export interface Difference {
  beforeBlob?: BlobMetadata;
  afterBlob?: BlobMetadata;
  changeType?: ChangeTypeEnum;
}
export type DifferenceList = Difference[];
export interface GetDifferencesOutput {
  differences?: Difference[];
  NextToken?: string;
}
export interface GetFileInput {
  repositoryName: string;
  commitSpecifier?: string;
  filePath: string;
}
export interface GetFileOutput {
  commitId: string;
  blobId: string;
  filePath: string;
  fileMode: FileModeTypeEnum;
  fileSize: number;
  fileContent: Uint8Array;
}
export interface GetFolderInput {
  repositoryName: string;
  commitSpecifier?: string;
  folderPath: string;
}
export interface Folder {
  treeId?: string;
  absolutePath?: string;
  relativePath?: string;
}
export type FolderList = Folder[];
export interface File {
  blobId?: string;
  absolutePath?: string;
  relativePath?: string;
  fileMode?: FileModeTypeEnum;
}
export type FileList = File[];
export interface SymbolicLink {
  blobId?: string;
  absolutePath?: string;
  relativePath?: string;
  fileMode?: FileModeTypeEnum;
}
export type SymbolicLinkList = SymbolicLink[];
export interface SubModule {
  commitId?: string;
  absolutePath?: string;
  relativePath?: string;
}
export type SubModuleList = SubModule[];
export interface GetFolderOutput {
  commitId: string;
  folderPath: string;
  treeId?: string;
  subFolders?: Folder[];
  files?: File[];
  symbolicLinks?: SymbolicLink[];
  subModules?: SubModule[];
}
export interface GetMergeCommitInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
}
export interface GetMergeCommitOutput {
  sourceCommitId?: string;
  destinationCommitId?: string;
  baseCommitId?: string;
  mergedCommitId?: string;
}
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
export type IsMergeable = boolean;
export type ConflictMetadataList = ConflictMetadata[];
export interface GetMergeConflictsOutput {
  mergeable: boolean;
  destinationCommitId: string;
  sourceCommitId: string;
  baseCommitId?: string;
  conflictMetadataList: ConflictMetadata[];
  nextToken?: string;
}
export interface GetMergeOptionsInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
}
export type MergeOptions = MergeOptionTypeEnum[];
export interface GetMergeOptionsOutput {
  mergeOptions: MergeOptionTypeEnum[];
  sourceCommitId: string;
  destinationCommitId: string;
  baseCommitId: string;
}
export interface GetPullRequestInput {
  pullRequestId: string;
}
export interface GetPullRequestOutput {
  pullRequest: PullRequest;
}
export interface GetPullRequestApprovalStatesInput {
  pullRequestId: string;
  revisionId: string;
}
export interface Approval {
  userArn?: string;
  approvalState?: ApprovalState;
}
export type ApprovalList = Approval[];
export interface GetPullRequestApprovalStatesOutput {
  approvals?: Approval[];
}
export interface GetPullRequestOverrideStateInput {
  pullRequestId: string;
  revisionId: string;
}
export interface GetPullRequestOverrideStateOutput {
  overridden?: boolean;
  overrider?: string;
}
export interface GetRepositoryInput {
  repositoryName: string;
}
export interface GetRepositoryOutput {
  repositoryMetadata?: RepositoryMetadata;
}
export interface GetRepositoryTriggersInput {
  repositoryName: string;
}
export type RepositoryTriggersConfigurationId = string;
export type RepositoryTriggerName = string;
export type RepositoryTriggerCustomData = string;
export type BranchNameList = string[];
export type RepositoryTriggerEventEnum =
  | "all"
  | "updateReference"
  | "createReference"
  | "deleteReference"
  | (string & {});
export type RepositoryTriggerEventList = RepositoryTriggerEventEnum[];
export interface RepositoryTrigger {
  name: string;
  destinationArn: string;
  customData?: string;
  branches?: string[];
  events: RepositoryTriggerEventEnum[];
}
export type RepositoryTriggersList = RepositoryTrigger[];
export interface GetRepositoryTriggersOutput {
  configurationId?: string;
  triggers?: RepositoryTrigger[];
}
export interface ListApprovalRuleTemplatesInput {
  nextToken?: string;
  maxResults?: number;
}
export type ApprovalRuleTemplateNameList = string[];
export interface ListApprovalRuleTemplatesOutput {
  approvalRuleTemplateNames?: string[];
  nextToken?: string;
}
export interface ListAssociatedApprovalRuleTemplatesForRepositoryInput {
  repositoryName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListAssociatedApprovalRuleTemplatesForRepositoryOutput {
  approvalRuleTemplateNames?: string[];
  nextToken?: string;
}
export interface ListBranchesInput {
  repositoryName: string;
  nextToken?: string;
}
export interface ListBranchesOutput {
  branches?: string[];
  nextToken?: string;
}
export interface ListFileCommitHistoryRequest {
  repositoryName: string;
  commitSpecifier?: string;
  filePath: string;
  maxResults?: number;
  nextToken?: string;
}
export type RevisionChildren = string[];
export interface FileVersion {
  commit?: Commit;
  blobId?: string;
  path?: string;
  revisionChildren?: string[];
}
export type RevisionDag = FileVersion[];
export interface ListFileCommitHistoryResponse {
  revisionDag: FileVersion[];
  nextToken?: string;
}
export interface ListPullRequestsInput {
  repositoryName: string;
  authorArn?: string;
  pullRequestStatus?: PullRequestStatusEnum;
  nextToken?: string;
  maxResults?: number;
}
export type PullRequestIdList = string[];
export interface ListPullRequestsOutput {
  pullRequestIds: string[];
  nextToken?: string;
}
export type SortByEnum = "repositoryName" | "lastModifiedDate" | (string & {});
export type OrderEnum = "ascending" | "descending" | (string & {});
export interface ListRepositoriesInput {
  nextToken?: string;
  sortBy?: SortByEnum;
  order?: OrderEnum;
}
export interface RepositoryNameIdPair {
  repositoryName?: string;
  repositoryId?: string;
}
export type RepositoryNameIdPairList = RepositoryNameIdPair[];
export interface ListRepositoriesOutput {
  repositories?: RepositoryNameIdPair[];
  nextToken?: string;
}
export interface ListRepositoriesForApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListRepositoriesForApprovalRuleTemplateOutput {
  repositoryNames?: string[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
  nextToken?: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
  nextToken?: string;
}
export interface MergeBranchesByFastForwardInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  targetBranch?: string;
}
export interface MergeBranchesByFastForwardOutput {
  commitId?: string;
  treeId?: string;
}
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
export interface MergeBranchesBySquashOutput {
  commitId?: string;
  treeId?: string;
}
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
export interface MergeBranchesByThreeWayOutput {
  commitId?: string;
  treeId?: string;
}
export interface MergePullRequestByFastForwardInput {
  pullRequestId: string;
  repositoryName: string;
  sourceCommitId?: string;
}
export interface MergePullRequestByFastForwardOutput {
  pullRequest?: PullRequest;
}
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
export interface MergePullRequestBySquashOutput {
  pullRequest?: PullRequest;
}
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
export interface MergePullRequestByThreeWayOutput {
  pullRequest?: PullRequest;
}
export interface OverridePullRequestApprovalRulesInput {
  pullRequestId: string;
  revisionId: string;
  overrideStatus: OverrideStatus;
}
export interface OverridePullRequestApprovalRulesResponse {}
export interface PostCommentForComparedCommitInput {
  repositoryName: string;
  beforeCommitId?: string;
  afterCommitId: string;
  location?: Location;
  content: string;
  clientRequestToken?: string;
}
export interface PostCommentForComparedCommitOutput {
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  beforeBlobId?: string;
  afterBlobId?: string;
  location?: Location;
  comment?: Comment;
}
export interface PostCommentForPullRequestInput {
  pullRequestId: string;
  repositoryName: string;
  beforeCommitId: string;
  afterCommitId: string;
  location?: Location;
  content: string;
  clientRequestToken?: string;
}
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
export interface PostCommentReplyInput {
  inReplyTo: string;
  clientRequestToken?: string;
  content: string;
}
export interface PostCommentReplyOutput {
  comment?: Comment;
}
export interface PutCommentReactionInput {
  commentId: string;
  reactionValue: string;
}
export interface PutCommentReactionResponse {}
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
export interface PutFileOutput {
  commitId: string;
  blobId: string;
  treeId: string;
}
export interface PutRepositoryTriggersInput {
  repositoryName: string;
  triggers: RepositoryTrigger[];
}
export interface PutRepositoryTriggersOutput {
  configurationId?: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface TestRepositoryTriggersInput {
  repositoryName: string;
  triggers: RepositoryTrigger[];
}
export type RepositoryTriggerNameList = string[];
export type RepositoryTriggerExecutionFailureMessage = string;
export interface RepositoryTriggerExecutionFailure {
  trigger?: string;
  failureMessage?: string;
}
export type RepositoryTriggerExecutionFailureList =
  RepositoryTriggerExecutionFailure[];
export interface TestRepositoryTriggersOutput {
  successfulExecutions?: string[];
  failedExecutions?: RepositoryTriggerExecutionFailure[];
}
export type TagKeysList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApprovalRuleTemplateContentInput {
  approvalRuleTemplateName: string;
  newRuleContent: string;
  existingRuleContentSha256?: string;
}
export interface UpdateApprovalRuleTemplateContentOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export interface UpdateApprovalRuleTemplateDescriptionInput {
  approvalRuleTemplateName: string;
  approvalRuleTemplateDescription: string;
}
export interface UpdateApprovalRuleTemplateDescriptionOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export interface UpdateApprovalRuleTemplateNameInput {
  oldApprovalRuleTemplateName: string;
  newApprovalRuleTemplateName: string;
}
export interface UpdateApprovalRuleTemplateNameOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export interface UpdateCommentInput {
  commentId: string;
  content: string;
}
export interface UpdateCommentOutput {
  comment?: Comment;
}
export interface UpdateDefaultBranchInput {
  repositoryName: string;
  defaultBranchName: string;
}
export interface UpdateDefaultBranchResponse {}
export interface UpdatePullRequestApprovalRuleContentInput {
  pullRequestId: string;
  approvalRuleName: string;
  existingRuleContentSha256?: string;
  newRuleContent: string;
}
export interface UpdatePullRequestApprovalRuleContentOutput {
  approvalRule: ApprovalRule;
}
export interface UpdatePullRequestApprovalStateInput {
  pullRequestId: string;
  revisionId: string;
  approvalState: ApprovalState;
}
export interface UpdatePullRequestApprovalStateResponse {}
export interface UpdatePullRequestDescriptionInput {
  pullRequestId: string;
  description: string;
}
export interface UpdatePullRequestDescriptionOutput {
  pullRequest: PullRequest;
}
export interface UpdatePullRequestStatusInput {
  pullRequestId: string;
  pullRequestStatus: PullRequestStatusEnum;
}
export interface UpdatePullRequestStatusOutput {
  pullRequest: PullRequest;
}
export interface UpdatePullRequestTitleInput {
  pullRequestId: string;
  title: string;
}
export interface UpdatePullRequestTitleOutput {
  pullRequest: PullRequest;
}
export interface UpdateRepositoryDescriptionInput {
  repositoryName: string;
  repositoryDescription?: string;
}
export interface UpdateRepositoryDescriptionResponse {}
export interface UpdateRepositoryEncryptionKeyInput {
  repositoryName: string;
  kmsKeyId: string;
}
export interface UpdateRepositoryEncryptionKeyOutput {
  repositoryId?: string;
  kmsKeyId?: string;
  originalKmsKeyId?: string;
}
export interface UpdateRepositoryNameInput {
  oldName: string;
  newName: string;
}
export interface UpdateRepositoryNameResponse {}
export type AssociateApprovalRuleTemplateWithRepositoryError =
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
  | CommonErrors;
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
  AssociateApprovalRuleTemplateWithRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { approvalRuleTemplateName: 0, repositoryName: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApprovalRuleTemplateWithRepository",
})) as any;

export type BatchAssociateApprovalRuleTemplateWithRepositoriesError =
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
  | CommonErrors;
/**
 * Creates an association between an approval rule template and one or more specified repositories.
 */
export const batchAssociateApprovalRuleTemplateWithRepositories: API.OperationMethod<
  BatchAssociateApprovalRuleTemplateWithRepositoriesInput,
  BatchAssociateApprovalRuleTemplateWithRepositoriesOutput,
  BatchAssociateApprovalRuleTemplateWithRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { approvalRuleTemplateName: 0, repositoryNames: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateApprovalRuleTemplateWithRepositories",
})) as any;

export type BatchDescribeMergeConflictsError =
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
  | CommonErrors;
/**
 * Returns information about one or more merge conflicts in the attempted merge of two commit specifiers using the squash or three-way merge strategy.
 */
export const batchDescribeMergeConflicts: API.OperationMethod<
  BatchDescribeMergeConflictsInput,
  BatchDescribeMergeConflictsOutput,
  BatchDescribeMergeConflictsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      destinationCommitSpecifier: 0,
      sourceCommitSpecifier: 0,
      mergeOption: 0,
      maxMergeHunks: 0,
      maxConflictFiles: 0,
      filePaths: 0,
      conflictDetailLevel: 0,
      conflictResolutionStrategy: 0,
      nextToken: 0,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDescribeMergeConflicts",
})) as any;

export type BatchDisassociateApprovalRuleTemplateFromRepositoriesError =
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
  | CommonErrors;
/**
 * Removes the association between an approval rule template and one or more specified repositories.
 */
export const batchDisassociateApprovalRuleTemplateFromRepositories: API.OperationMethod<
  BatchDisassociateApprovalRuleTemplateFromRepositoriesInput,
  BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput,
  BatchDisassociateApprovalRuleTemplateFromRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { approvalRuleTemplateName: 0, repositoryNames: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateApprovalRuleTemplateFromRepositories",
})) as any;

export type BatchGetCommitsError =
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
  | CommonErrors;
/**
 * Returns information about the contents of one or more commits in a repository.
 */
export const batchGetCommits: API.OperationMethod<
  BatchGetCommitsInput,
  BatchGetCommitsOutput,
  BatchGetCommitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { commitIds: 0, repositoryName: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCommits",
})) as any;

export type BatchGetRepositoriesError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | MaximumRepositoryNamesExceededException
  | RepositoryNamesRequiredException
  | CommonErrors;
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
  BatchGetRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryNames: 0 },
    output: { repositories: D.list(o_RepositoryMetadata) },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRepositories",
})) as any;

export type CreateApprovalRuleTemplateError =
  | ApprovalRuleTemplateContentRequiredException
  | ApprovalRuleTemplateNameAlreadyExistsException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateContentException
  | InvalidApprovalRuleTemplateDescriptionException
  | InvalidApprovalRuleTemplateNameException
  | NumberOfRuleTemplatesExceededException
  | CommonErrors;
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
  CreateApprovalRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      approvalRuleTemplateName: 0,
      approvalRuleTemplateContent: 0,
      approvalRuleTemplateDescription: 0,
    },
    output: { approvalRuleTemplate: o_ApprovalRuleTemplate },
  },
  errors: [
    ApprovalRuleTemplateContentRequiredException,
    ApprovalRuleTemplateNameAlreadyExistsException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateContentException,
    InvalidApprovalRuleTemplateDescriptionException,
    InvalidApprovalRuleTemplateNameException,
    NumberOfRuleTemplatesExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApprovalRuleTemplate",
})) as any;

export type CreateBranchError =
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
  | CommonErrors;
/**
 * Creates a branch in a repository and points the branch to a commit.
 *
 * Calling the create branch operation does not set a repository's default branch. To do this, call the update default branch operation.
 */
export const createBranch: API.OperationMethod<
  CreateBranchInput,
  CreateBranchResponse,
  CreateBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, branchName: 0, commitId: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBranch",
})) as any;

export type CreateCommitError =
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
  | CommonErrors;
/**
 * Creates a commit for a repository on the tip of a specified branch.
 */
export const createCommit: API.OperationMethod<
  CreateCommitInput,
  CreateCommitOutput,
  CreateCommitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      branchName: 0,
      parentCommitId: 0,
      authorName: 0,
      email: 0,
      commitMessage: 0,
      keepEmptyFolders: 0,
      putFiles: D.list({
        filePath: 0,
        fileMode: 0,
        fileContent: 0,
        sourceFile: { filePath: 0, isMove: 0 },
      }),
      deleteFiles: D.list(i_DeleteFileEntry),
      setFileModes: D.list(i_SetFileModeEntry),
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCommit",
})) as any;

export type CreatePullRequestError =
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
  | CommonErrors;
/**
 * Creates a pull request in the specified repository.
 */
export const createPullRequest: API.OperationMethod<
  CreatePullRequestInput,
  CreatePullRequestOutput,
  CreatePullRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      title: 0,
      description: 0,
      targets: D.list({
        repositoryName: 0,
        sourceReference: 0,
        destinationReference: 0,
      }),
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { pullRequest: o_PullRequest },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePullRequest",
})) as any;

export type CreatePullRequestApprovalRuleError =
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
  | CommonErrors;
/**
 * Creates an approval rule for a pull request.
 */
export const createPullRequestApprovalRule: API.OperationMethod<
  CreatePullRequestApprovalRuleInput,
  CreatePullRequestApprovalRuleOutput,
  CreatePullRequestApprovalRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pullRequestId: 0, approvalRuleName: 0, approvalRuleContent: 0 },
    output: { approvalRule: o_ApprovalRule },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePullRequestApprovalRule",
})) as any;

export type CreateRepositoryError =
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
  | CommonErrors;
/**
 * Creates a new, empty repository.
 */
export const createRepository: API.OperationMethod<
  CreateRepositoryInput,
  CreateRepositoryOutput,
  CreateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      repositoryDescription: 0,
      tags: 0,
      kmsKeyId: 0,
    },
    output: { repositoryMetadata: o_RepositoryMetadata },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRepository",
})) as any;

export type CreateUnreferencedMergeCommitError =
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
  | CommonErrors;
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
  CreateUnreferencedMergeCommitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      sourceCommitSpecifier: 0,
      destinationCommitSpecifier: 0,
      mergeOption: 0,
      conflictDetailLevel: 0,
      conflictResolutionStrategy: 0,
      authorName: 0,
      email: 0,
      commitMessage: 0,
      keepEmptyFolders: 0,
      conflictResolution: i_ConflictResolution,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUnreferencedMergeCommit",
})) as any;

export type DeleteApprovalRuleTemplateError =
  | ApprovalRuleTemplateInUseException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors;
/**
 * Deletes a specified approval rule template. Deleting a template does not remove approval rules on pull requests already created with the template.
 */
export const deleteApprovalRuleTemplate: API.OperationMethod<
  DeleteApprovalRuleTemplateInput,
  DeleteApprovalRuleTemplateOutput,
  DeleteApprovalRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { approvalRuleTemplateName: 0 } },
  errors: [
    ApprovalRuleTemplateInUseException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApprovalRuleTemplate",
})) as any;

export type DeleteBranchError =
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
  | CommonErrors;
/**
 * Deletes a branch from a repository, unless that branch is the default branch for the repository.
 */
export const deleteBranch: API.OperationMethod<
  DeleteBranchInput,
  DeleteBranchOutput,
  DeleteBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { repositoryName: 0, branchName: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBranch",
})) as any;

export type DeleteCommentContentError =
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | InvalidCommentIdException
  | CommonErrors;
/**
 * Deletes the content of a comment made on a change, file, or commit in a repository.
 */
export const deleteCommentContent: API.OperationMethod<
  DeleteCommentContentInput,
  DeleteCommentContentOutput,
  DeleteCommentContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { commentId: 0 },
    output: { comment: o_Comment },
  },
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    InvalidCommentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCommentContent",
})) as any;

export type DeleteFileError =
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
  | CommonErrors;
/**
 * Deletes a specified file from a specified branch. A commit is created on the branch
 * that contains the revision. The file still exists in the commits earlier to the commit
 * that contains the deletion.
 */
export const deleteFile: API.OperationMethod<
  DeleteFileInput,
  DeleteFileOutput,
  DeleteFileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      branchName: 0,
      filePath: 0,
      parentCommitId: 0,
      keepEmptyFolders: 0,
      commitMessage: 0,
      name: 0,
      email: 0,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFile",
})) as any;

export type DeletePullRequestApprovalRuleError =
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
  | CommonErrors;
/**
 * Deletes an approval rule from a specified pull request. Approval rules can be deleted from a pull request only if the pull request is open, and if the
 * approval rule was created specifically for a pull request and not generated from an approval rule template associated with the repository where the
 * pull request was created. You cannot delete an approval rule from a merged or closed pull request.
 */
export const deletePullRequestApprovalRule: API.OperationMethod<
  DeletePullRequestApprovalRuleInput,
  DeletePullRequestApprovalRuleOutput,
  DeletePullRequestApprovalRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pullRequestId: 0, approvalRuleName: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePullRequestApprovalRule",
})) as any;

export type DeleteRepositoryError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryNameRequiredException
  | CommonErrors;
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
  DeleteRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { repositoryName: 0 } },
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepository",
})) as any;

export type DescribeMergeConflictsError =
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
  | CommonErrors;
/**
 * Returns information about one or more merge conflicts in the attempted merge of two
 * commit specifiers using the squash or three-way merge strategy. If the merge option for
 * the attempted merge is specified as FAST_FORWARD_MERGE, an exception is thrown.
 */
export const describeMergeConflicts: API.PaginatedOperationMethod<
  DescribeMergeConflictsInput,
  DescribeMergeConflictsOutput,
  DescribeMergeConflictsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      destinationCommitSpecifier: 0,
      sourceCommitSpecifier: 0,
      mergeOption: 0,
      maxMergeHunks: 0,
      filePath: 0,
      conflictDetailLevel: 0,
      conflictResolutionStrategy: 0,
      nextToken: 0,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMergeConflicts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxMergeHunks",
  } as const,
})) as any;

export type DescribePullRequestEventsError =
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
  | CommonErrors;
/**
 * Returns information about one or more pull request events.
 */
export const describePullRequestEvents: API.PaginatedOperationMethod<
  DescribePullRequestEventsInput,
  DescribePullRequestEventsOutput,
  DescribePullRequestEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      pullRequestId: 0,
      pullRequestEventType: 0,
      actorArn: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { pullRequestEvents: D.list({ eventDate: D.ts }) },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePullRequestEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DisassociateApprovalRuleTemplateFromRepositoryError =
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
  | CommonErrors;
/**
 * Removes the association between a template and a repository so that approval rules
 * based on the template are not automatically created when pull requests are created in
 * the specified repository. This does not delete any approval rules previously created for
 * pull requests through the template association.
 */
export const disassociateApprovalRuleTemplateFromRepository: API.OperationMethod<
  DisassociateApprovalRuleTemplateFromRepositoryInput,
  DisassociateApprovalRuleTemplateFromRepositoryResponse,
  DisassociateApprovalRuleTemplateFromRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { approvalRuleTemplateName: 0, repositoryName: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApprovalRuleTemplateFromRepository",
})) as any;

export type EvaluatePullRequestApprovalRulesError =
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
  | CommonErrors;
/**
 * Evaluates whether a pull request has met all the conditions specified in its associated approval rules.
 */
export const evaluatePullRequestApprovalRules: API.OperationMethod<
  EvaluatePullRequestApprovalRulesInput,
  EvaluatePullRequestApprovalRulesOutput,
  EvaluatePullRequestApprovalRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { pullRequestId: 0, revisionId: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EvaluatePullRequestApprovalRules",
})) as any;

export type GetApprovalRuleTemplateError =
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors;
/**
 * Returns information about a specified approval rule template.
 */
export const getApprovalRuleTemplate: API.OperationMethod<
  GetApprovalRuleTemplateInput,
  GetApprovalRuleTemplateOutput,
  GetApprovalRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { approvalRuleTemplateName: 0 },
    output: { approvalRuleTemplate: o_ApprovalRuleTemplate },
  },
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApprovalRuleTemplate",
})) as any;

export type GetBlobError =
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
  | CommonErrors;
/**
 * Returns the base-64 encoded content of an individual blob in a repository.
 */
export const getBlob: API.OperationMethod<
  GetBlobInput,
  GetBlobOutput,
  GetBlobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, blobId: 0 },
    output: { content: D.blob },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlob",
})) as any;

export type GetBlobDifferencesError =
  | BlobIdDoesNotExistException
  | BlobIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileTooLargeException
  | InvalidBlobIdException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | ValidationException
  | CommonErrors;
/**
 * Returns a structured, line-level diff between two blob versions in a repository. The
 * diff is returned as an ordered list of hunks, where each hunk represents a contiguous
 * run of changed lines together with any surrounding unchanged context lines.
 *
 * Results are paginated. Use `MaxResults` and `NextToken` to
 * retrieve additional pages.
 *
 * For the typical usage workflow, see GetDifferences.
 */
export const getBlobDifferences: API.PaginatedOperationMethod<
  GetBlobDifferencesInput,
  GetBlobDifferencesOutput,
  GetBlobDifferencesError,
  Credentials | HttpClient.HttpClient,
  DiffHunk
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      afterBlobId: 0,
      beforeBlobId: 0,
      contextLines: 0,
      ignoreWhitespace: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
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
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlobDifferences",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "hunks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetBranchError =
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
  | CommonErrors;
/**
 * Returns information about a repository branch, including its name and the last commit ID.
 */
export const getBranch: API.OperationMethod<
  GetBranchInput,
  GetBranchOutput,
  GetBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { repositoryName: 0, branchName: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBranch",
})) as any;

export type GetCommentError =
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommentIdException
  | CommonErrors;
/**
 * Returns the content of a comment made on a change, file, or commit in a repository.
 *
 * Reaction counts might include numbers from user identities who were deleted after the reaction was made. For a count of
 * reactions from active identities, use GetCommentReactions.
 */
export const getComment: API.OperationMethod<
  GetCommentInput,
  GetCommentOutput,
  GetCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { commentId: 0 },
    output: { comment: o_Comment },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComment",
})) as any;

export type GetCommentReactionsError =
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | InvalidCommentIdException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidReactionUserArnException
  | CommonErrors;
/**
 * Returns information about reactions to a specified comment ID. Reactions from users who have been deleted will not be included in the count.
 */
export const getCommentReactions: API.PaginatedOperationMethod<
  GetCommentReactionsInput,
  GetCommentReactionsOutput,
  GetCommentReactionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { commentId: 0, reactionUserArn: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    InvalidCommentIdException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidReactionUserArnException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommentReactions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetCommentsForComparedCommitError =
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
  | CommonErrors;
/**
 * Returns information about comments made on the comparison between two commits.
 *
 * Reaction counts might include numbers from user identities who were deleted after the reaction was made. For a count of
 * reactions from active identities, use GetCommentReactions.
 */
export const getCommentsForComparedCommit: API.PaginatedOperationMethod<
  GetCommentsForComparedCommitInput,
  GetCommentsForComparedCommitOutput,
  GetCommentsForComparedCommitError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      beforeCommitId: 0,
      afterCommitId: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      commentsForComparedCommitData: D.list({ comments: D.list(o_Comment) }),
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommentsForComparedCommit",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetCommentsForPullRequestError =
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
  | CommonErrors;
/**
 * Returns comments made on a pull request.
 *
 * Reaction counts might include numbers from user identities who were deleted after the reaction was made. For a count of
 * reactions from active identities, use GetCommentReactions.
 */
export const getCommentsForPullRequest: API.PaginatedOperationMethod<
  GetCommentsForPullRequestInput,
  GetCommentsForPullRequestOutput,
  GetCommentsForPullRequestError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      pullRequestId: 0,
      repositoryName: 0,
      beforeCommitId: 0,
      afterCommitId: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      commentsForPullRequestData: D.list({ comments: D.list(o_Comment) }),
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommentsForPullRequest",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetCommitError =
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
  | CommonErrors;
/**
 * Returns information about a commit, including commit message and committer information.
 */
export const getCommit: API.OperationMethod<
  GetCommitInput,
  GetCommitOutput,
  GetCommitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { repositoryName: 0, commitId: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommit",
})) as any;

export type GetDifferencesError =
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
  | CommonErrors;
/**
 * Returns information about the differences in a valid commit specifier (such as a
 * branch, tag, HEAD, commit ID, or other fully qualified reference). Results can be
 * limited to a specified path.
 *
 * For line-level diff details, pass the `beforeBlob.blobId` and
 * `afterBlob.blobId` values from a `Difference` object to GetBlobDifferences.
 */
export const getDifferences: API.PaginatedOperationMethod<
  GetDifferencesInput,
  GetDifferencesOutput,
  GetDifferencesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      beforeCommitSpecifier: 0,
      afterCommitSpecifier: 0,
      beforePath: 0,
      afterPath: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDifferences",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFileError =
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
  | CommonErrors;
/**
 * Returns the base-64 encoded contents of a specified file and its metadata.
 */
export const getFile: API.OperationMethod<
  GetFileInput,
  GetFileOutput,
  GetFileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, commitSpecifier: 0, filePath: 0 },
    output: { fileContent: D.blob },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFile",
})) as any;

export type GetFolderError =
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
  | CommonErrors;
/**
 * Returns the contents of a specified folder in a repository.
 */
export const getFolder: API.OperationMethod<
  GetFolderInput,
  GetFolderOutput,
  GetFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, commitSpecifier: 0, folderPath: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFolder",
})) as any;

export type GetMergeCommitError =
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
  | CommonErrors;
/**
 * Returns information about a specified merge commit.
 */
export const getMergeCommit: API.OperationMethod<
  GetMergeCommitInput,
  GetMergeCommitOutput,
  GetMergeCommitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      sourceCommitSpecifier: 0,
      destinationCommitSpecifier: 0,
      conflictDetailLevel: 0,
      conflictResolutionStrategy: 0,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMergeCommit",
})) as any;

export type GetMergeConflictsError =
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
  | CommonErrors;
/**
 * Returns information about merge conflicts between the before and after commit IDs for a pull request in a repository.
 */
export const getMergeConflicts: API.PaginatedOperationMethod<
  GetMergeConflictsInput,
  GetMergeConflictsOutput,
  GetMergeConflictsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      destinationCommitSpecifier: 0,
      sourceCommitSpecifier: 0,
      mergeOption: 0,
      conflictDetailLevel: 0,
      maxConflictFiles: 0,
      conflictResolutionStrategy: 0,
      nextToken: 0,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMergeConflicts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxConflictFiles",
  } as const,
})) as any;

export type GetMergeOptionsError =
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
  | CommonErrors;
/**
 * Returns information about the merge options available for merging two specified
 * branches. For details about why a merge option is not available, use GetMergeConflicts
 * or DescribeMergeConflicts.
 */
export const getMergeOptions: API.OperationMethod<
  GetMergeOptionsInput,
  GetMergeOptionsOutput,
  GetMergeOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      sourceCommitSpecifier: 0,
      destinationCommitSpecifier: 0,
      conflictDetailLevel: 0,
      conflictResolutionStrategy: 0,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMergeOptions",
})) as any;

export type GetPullRequestError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidPullRequestIdException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors;
/**
 * Gets information about a pull request in a specified repository.
 */
export const getPullRequest: API.OperationMethod<
  GetPullRequestInput,
  GetPullRequestOutput,
  GetPullRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pullRequestId: 0 },
    output: { pullRequest: o_PullRequest },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPullRequest",
})) as any;

export type GetPullRequestApprovalStatesError =
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
  | CommonErrors;
/**
 * Gets information about the approval states for a specified pull request. Approval states only apply to pull requests that have one or more
 * approval rules applied to them.
 */
export const getPullRequestApprovalStates: API.OperationMethod<
  GetPullRequestApprovalStatesInput,
  GetPullRequestApprovalStatesOutput,
  GetPullRequestApprovalStatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { pullRequestId: 0, revisionId: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPullRequestApprovalStates",
})) as any;

export type GetPullRequestOverrideStateError =
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
  | CommonErrors;
/**
 * Returns information about whether approval rules have been set aside (overridden) for a
 * pull request, and if so, the Amazon Resource Name (ARN) of the user or identity that overrode the rules and their requirements for the pull request.
 */
export const getPullRequestOverrideState: API.OperationMethod<
  GetPullRequestOverrideStateInput,
  GetPullRequestOverrideStateOutput,
  GetPullRequestOverrideStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { pullRequestId: 0, revisionId: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPullRequestOverrideState",
})) as any;

export type GetRepositoryError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
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
  GetRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0 },
    output: { repositoryMetadata: o_RepositoryMetadata },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepository",
})) as any;

export type GetRepositoryTriggersError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Gets information about triggers configured for a repository.
 */
export const getRepositoryTriggers: API.OperationMethod<
  GetRepositoryTriggersInput,
  GetRepositoryTriggersOutput,
  GetRepositoryTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { repositoryName: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositoryTriggers",
})) as any;

export type ListApprovalRuleTemplatesError =
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | CommonErrors;
/**
 * Lists all approval rule templates in the specified Amazon Web Services Region in your Amazon Web Services account. If
 * an Amazon Web Services Region is not specified, the Amazon Web Services Region where you are signed in is used.
 */
export const listApprovalRuleTemplates: API.PaginatedOperationMethod<
  ListApprovalRuleTemplatesInput,
  ListApprovalRuleTemplatesOutput,
  ListApprovalRuleTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
  errors: [InvalidContinuationTokenException, InvalidMaxResultsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApprovalRuleTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedApprovalRuleTemplatesForRepositoryError =
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
  | CommonErrors;
/**
 * Lists all approval rule templates that are associated with a specified repository.
 */
export const listAssociatedApprovalRuleTemplatesForRepository: API.PaginatedOperationMethod<
  ListAssociatedApprovalRuleTemplatesForRepositoryInput,
  ListAssociatedApprovalRuleTemplatesForRepositoryOutput,
  ListAssociatedApprovalRuleTemplatesForRepositoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, nextToken: 0, maxResults: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedApprovalRuleTemplatesForRepository",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBranchesError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidContinuationTokenException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Gets information about one or more branches in a repository.
 */
export const listBranches: API.PaginatedOperationMethod<
  ListBranchesInput,
  ListBranchesOutput,
  ListBranchesError,
  Credentials | HttpClient.HttpClient,
  BranchName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { repositoryName: 0, nextToken: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBranches",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "branches",
  } as const,
})) as any;

export type ListFileCommitHistoryError =
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
  | CommonErrors;
/**
 * Retrieves a list of commits and changes to a specified file.
 */
export const listFileCommitHistory: API.PaginatedOperationMethod<
  ListFileCommitHistoryRequest,
  ListFileCommitHistoryResponse,
  ListFileCommitHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      commitSpecifier: 0,
      filePath: 0,
      maxResults: 0,
      nextToken: 0,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFileCommitHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPullRequestsError =
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
  | CommonErrors;
/**
 * Returns a list of pull requests for a specified repository. The return list can be refined by pull request
 * status or pull request author ARN.
 */
export const listPullRequests: API.PaginatedOperationMethod<
  ListPullRequestsInput,
  ListPullRequestsOutput,
  ListPullRequestsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      authorArn: 0,
      pullRequestStatus: 0,
      nextToken: 0,
      maxResults: 0,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPullRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRepositoriesError =
  | InvalidContinuationTokenException
  | InvalidOrderException
  | InvalidSortByException
  | CommonErrors;
/**
 * Gets information about one or more repositories.
 */
export const listRepositories: API.PaginatedOperationMethod<
  ListRepositoriesInput,
  ListRepositoriesOutput,
  ListRepositoriesError,
  Credentials | HttpClient.HttpClient,
  RepositoryNameIdPair
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0, sortBy: 0, order: 0 } },
  errors: [
    InvalidContinuationTokenException,
    InvalidOrderException,
    InvalidSortByException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositories",
  } as const,
})) as any;

export type ListRepositoriesForApprovalRuleTemplateError =
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
  | CommonErrors;
/**
 * Lists all repositories associated with the specified approval rule template.
 */
export const listRepositoriesForApprovalRuleTemplate: API.PaginatedOperationMethod<
  ListRepositoriesForApprovalRuleTemplateInput,
  ListRepositoriesForApprovalRuleTemplateOutput,
  ListRepositoriesForApprovalRuleTemplateError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { approvalRuleTemplateName: 0, nextToken: 0, maxResults: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositoriesForApprovalRuleTemplate",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidRepositoryNameException
  | InvalidResourceArnException
  | RepositoryDoesNotExistException
  | ResourceArnRequiredException
  | CommonErrors;
/**
 * Gets information about Amazon Web Servicestags for a specified Amazon Resource Name (ARN) in CodeCommit. For a list of valid resources in CodeCommit, see CodeCommit Resources and Operations in the CodeCommit User
 * Guide.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, nextToken: 0 } },
  errors: [
    InvalidRepositoryNameException,
    InvalidResourceArnException,
    RepositoryDoesNotExistException,
    ResourceArnRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type MergeBranchesByFastForwardError =
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
  | CommonErrors;
/**
 * Merges two branches using the fast-forward merge strategy.
 */
export const mergeBranchesByFastForward: API.OperationMethod<
  MergeBranchesByFastForwardInput,
  MergeBranchesByFastForwardOutput,
  MergeBranchesByFastForwardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      sourceCommitSpecifier: 0,
      destinationCommitSpecifier: 0,
      targetBranch: 0,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergeBranchesByFastForward",
})) as any;

export type MergeBranchesBySquashError =
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
  | CommonErrors;
/**
 * Merges two branches using the squash merge strategy.
 */
export const mergeBranchesBySquash: API.OperationMethod<
  MergeBranchesBySquashInput,
  MergeBranchesBySquashOutput,
  MergeBranchesBySquashError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      sourceCommitSpecifier: 0,
      destinationCommitSpecifier: 0,
      targetBranch: 0,
      conflictDetailLevel: 0,
      conflictResolutionStrategy: 0,
      authorName: 0,
      email: 0,
      commitMessage: 0,
      keepEmptyFolders: 0,
      conflictResolution: i_ConflictResolution,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergeBranchesBySquash",
})) as any;

export type MergeBranchesByThreeWayError =
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
  | CommonErrors;
/**
 * Merges two specified branches using the three-way merge strategy.
 */
export const mergeBranchesByThreeWay: API.OperationMethod<
  MergeBranchesByThreeWayInput,
  MergeBranchesByThreeWayOutput,
  MergeBranchesByThreeWayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      sourceCommitSpecifier: 0,
      destinationCommitSpecifier: 0,
      targetBranch: 0,
      conflictDetailLevel: 0,
      conflictResolutionStrategy: 0,
      authorName: 0,
      email: 0,
      commitMessage: 0,
      keepEmptyFolders: 0,
      conflictResolution: i_ConflictResolution,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergeBranchesByThreeWay",
})) as any;

export type MergePullRequestByFastForwardError =
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
  | CommonErrors;
/**
 * Attempts to merge the source commit of a pull request into the specified destination
 * branch for that pull request at the specified commit using the fast-forward merge strategy. If the merge is successful, it closes the pull request.
 */
export const mergePullRequestByFastForward: API.OperationMethod<
  MergePullRequestByFastForwardInput,
  MergePullRequestByFastForwardOutput,
  MergePullRequestByFastForwardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pullRequestId: 0, repositoryName: 0, sourceCommitId: 0 },
    output: { pullRequest: o_PullRequest },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergePullRequestByFastForward",
})) as any;

export type MergePullRequestBySquashError =
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
  | CommonErrors;
/**
 * Attempts to merge the source commit of a pull request into the specified destination
 * branch for that pull request at the specified commit using the squash merge strategy. If the merge is successful, it closes the pull request.
 */
export const mergePullRequestBySquash: API.OperationMethod<
  MergePullRequestBySquashInput,
  MergePullRequestBySquashOutput,
  MergePullRequestBySquashError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      pullRequestId: 0,
      repositoryName: 0,
      sourceCommitId: 0,
      conflictDetailLevel: 0,
      conflictResolutionStrategy: 0,
      commitMessage: 0,
      authorName: 0,
      email: 0,
      keepEmptyFolders: 0,
      conflictResolution: i_ConflictResolution,
    },
    output: { pullRequest: o_PullRequest },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergePullRequestBySquash",
})) as any;

export type MergePullRequestByThreeWayError =
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
  | CommonErrors;
/**
 * Attempts to merge the source commit of a pull request into the specified destination
 * branch for that pull request at the specified commit using the three-way merge strategy. If the merge is successful, it closes the pull request.
 */
export const mergePullRequestByThreeWay: API.OperationMethod<
  MergePullRequestByThreeWayInput,
  MergePullRequestByThreeWayOutput,
  MergePullRequestByThreeWayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      pullRequestId: 0,
      repositoryName: 0,
      sourceCommitId: 0,
      conflictDetailLevel: 0,
      conflictResolutionStrategy: 0,
      commitMessage: 0,
      authorName: 0,
      email: 0,
      keepEmptyFolders: 0,
      conflictResolution: i_ConflictResolution,
    },
    output: { pullRequest: o_PullRequest },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergePullRequestByThreeWay",
})) as any;

export type OverridePullRequestApprovalRulesError =
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
  | CommonErrors;
/**
 * Sets aside (overrides) all approval rule requirements for a specified pull request.
 */
export const overridePullRequestApprovalRules: API.OperationMethod<
  OverridePullRequestApprovalRulesInput,
  OverridePullRequestApprovalRulesResponse,
  OverridePullRequestApprovalRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pullRequestId: 0, revisionId: 0, overrideStatus: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OverridePullRequestApprovalRules",
})) as any;

export type PostCommentForComparedCommitError =
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
  | CommonErrors;
/**
 * Posts a comment on the comparison between two commits.
 */
export const postCommentForComparedCommit: API.OperationMethod<
  PostCommentForComparedCommitInput,
  PostCommentForComparedCommitOutput,
  PostCommentForComparedCommitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      beforeCommitId: 0,
      afterCommitId: 0,
      location: i_Location,
      content: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { comment: o_Comment },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostCommentForComparedCommit",
})) as any;

export type PostCommentForPullRequestError =
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
  | CommonErrors;
/**
 * Posts a comment on a pull request.
 */
export const postCommentForPullRequest: API.OperationMethod<
  PostCommentForPullRequestInput,
  PostCommentForPullRequestOutput,
  PostCommentForPullRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      pullRequestId: 0,
      repositoryName: 0,
      beforeCommitId: 0,
      afterCommitId: 0,
      location: i_Location,
      content: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { comment: o_Comment },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostCommentForPullRequest",
})) as any;

export type PostCommentReplyError =
  | ClientRequestTokenRequiredException
  | CommentContentRequiredException
  | CommentContentSizeLimitExceededException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | IdempotencyParameterMismatchException
  | InvalidClientRequestTokenException
  | InvalidCommentIdException
  | CommonErrors;
/**
 * Posts a comment in reply to an existing comment on a comparison between commits or a pull request.
 */
export const postCommentReply: API.OperationMethod<
  PostCommentReplyInput,
  PostCommentReplyOutput,
  PostCommentReplyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      inReplyTo: 0,
      clientRequestToken: D.m({ idempotency: true }),
      content: 0,
    },
    output: { comment: o_Comment },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostCommentReply",
})) as any;

export type PutCommentReactionError =
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | InvalidCommentIdException
  | InvalidReactionValueException
  | ReactionLimitExceededException
  | ReactionValueRequiredException
  | CommonErrors;
/**
 * Adds or updates a reaction to a specified comment for the user whose identity is used to make the request. You can only add or
 * update a reaction for yourself. You cannot add, modify, or delete a reaction for another user.
 */
export const putCommentReaction: API.OperationMethod<
  PutCommentReactionInput,
  PutCommentReactionResponse,
  PutCommentReactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { commentId: 0, reactionValue: 0 } },
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    InvalidCommentIdException,
    InvalidReactionValueException,
    ReactionLimitExceededException,
    ReactionValueRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCommentReaction",
})) as any;

export type PutFileError =
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
  | CommonErrors;
/**
 * Adds or updates a file in a branch in an CodeCommit repository, and generates a commit for the addition in the specified branch.
 */
export const putFile: API.OperationMethod<
  PutFileInput,
  PutFileOutput,
  PutFileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      repositoryName: 0,
      branchName: 0,
      fileContent: 0,
      filePath: 0,
      fileMode: 0,
      parentCommitId: 0,
      commitMessage: 0,
      name: 0,
      email: 0,
    },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFile",
})) as any;

export type PutRepositoryTriggersError =
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
  | CommonErrors;
/**
 * Replaces all triggers for a repository. Used to create or delete triggers.
 */
export const putRepositoryTriggers: API.OperationMethod<
  PutRepositoryTriggersInput,
  PutRepositoryTriggersOutput,
  PutRepositoryTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, triggers: D.list(i_RepositoryTrigger) },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRepositoryTriggers",
})) as any;

export type TagResourceError =
  | InvalidRepositoryNameException
  | InvalidResourceArnException
  | InvalidSystemTagUsageException
  | InvalidTagsMapException
  | RepositoryDoesNotExistException
  | ResourceArnRequiredException
  | TagPolicyException
  | TagsMapRequiredException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds or updates tags for a resource in CodeCommit. For a list of valid resources
 * in CodeCommit, see CodeCommit Resources and Operations in the CodeCommit User
 * Guide.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestRepositoryTriggersError =
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
  | CommonErrors;
/**
 * Tests the functionality of repository triggers by sending information to the trigger
 * target. If real data is available in the repository, the test sends data from the last
 * commit. If no data is available, sample data is generated.
 */
export const testRepositoryTriggers: API.OperationMethod<
  TestRepositoryTriggersInput,
  TestRepositoryTriggersOutput,
  TestRepositoryTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, triggers: D.list(i_RepositoryTrigger) },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestRepositoryTriggers",
})) as any;

export type UntagResourceError =
  | InvalidRepositoryNameException
  | InvalidResourceArnException
  | InvalidSystemTagUsageException
  | InvalidTagKeysListException
  | RepositoryDoesNotExistException
  | ResourceArnRequiredException
  | TagKeysListRequiredException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors;
/**
 * Removes tags for a resource in CodeCommit. For a list of valid resources in CodeCommit, see CodeCommit Resources and Operations in the CodeCommit User
 * Guide.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateApprovalRuleTemplateContentError =
  | ApprovalRuleTemplateContentRequiredException
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateContentException
  | InvalidApprovalRuleTemplateNameException
  | InvalidRuleContentSha256Exception
  | CommonErrors;
/**
 * Updates the content of an approval rule template. You can change the number of
 * required approvals, the membership of the approval rule, and whether an approval pool is
 * defined.
 */
export const updateApprovalRuleTemplateContent: API.OperationMethod<
  UpdateApprovalRuleTemplateContentInput,
  UpdateApprovalRuleTemplateContentOutput,
  UpdateApprovalRuleTemplateContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      approvalRuleTemplateName: 0,
      newRuleContent: 0,
      existingRuleContentSha256: 0,
    },
    output: { approvalRuleTemplate: o_ApprovalRuleTemplate },
  },
  errors: [
    ApprovalRuleTemplateContentRequiredException,
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateContentException,
    InvalidApprovalRuleTemplateNameException,
    InvalidRuleContentSha256Exception,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApprovalRuleTemplateContent",
})) as any;

export type UpdateApprovalRuleTemplateDescriptionError =
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateDescriptionException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors;
/**
 * Updates the description for a specified approval rule template.
 */
export const updateApprovalRuleTemplateDescription: API.OperationMethod<
  UpdateApprovalRuleTemplateDescriptionInput,
  UpdateApprovalRuleTemplateDescriptionOutput,
  UpdateApprovalRuleTemplateDescriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { approvalRuleTemplateName: 0, approvalRuleTemplateDescription: 0 },
    output: { approvalRuleTemplate: o_ApprovalRuleTemplate },
  },
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateDescriptionException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApprovalRuleTemplateDescription",
})) as any;

export type UpdateApprovalRuleTemplateNameError =
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameAlreadyExistsException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors;
/**
 * Updates the name of a specified approval rule template.
 */
export const updateApprovalRuleTemplateName: API.OperationMethod<
  UpdateApprovalRuleTemplateNameInput,
  UpdateApprovalRuleTemplateNameOutput,
  UpdateApprovalRuleTemplateNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { oldApprovalRuleTemplateName: 0, newApprovalRuleTemplateName: 0 },
    output: { approvalRuleTemplate: o_ApprovalRuleTemplate },
  },
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameAlreadyExistsException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApprovalRuleTemplateName",
})) as any;

export type UpdateCommentError =
  | CommentContentRequiredException
  | CommentContentSizeLimitExceededException
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | CommentNotCreatedByCallerException
  | InvalidCommentIdException
  | CommonErrors;
/**
 * Replaces the contents of a comment.
 */
export const updateComment: API.OperationMethod<
  UpdateCommentInput,
  UpdateCommentOutput,
  UpdateCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { commentId: 0, content: 0 },
    output: { comment: o_Comment },
  },
  errors: [
    CommentContentRequiredException,
    CommentContentSizeLimitExceededException,
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    CommentNotCreatedByCallerException,
    InvalidCommentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComment",
})) as any;

export type UpdateDefaultBranchError =
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
  | CommonErrors;
/**
 * Sets or changes the default branch name for the specified repository.
 *
 * If you use this operation to change the default branch name to the current default branch name, a success message is returned even though the default branch did not change.
 */
export const updateDefaultBranch: API.OperationMethod<
  UpdateDefaultBranchInput,
  UpdateDefaultBranchResponse,
  UpdateDefaultBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, defaultBranchName: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDefaultBranch",
})) as any;

export type UpdatePullRequestApprovalRuleContentError =
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
  | CommonErrors;
/**
 * Updates the structure of an approval rule created specifically for a pull request. For example, you can change the number of required approvers and
 * the approval pool for approvers.
 */
export const updatePullRequestApprovalRuleContent: API.OperationMethod<
  UpdatePullRequestApprovalRuleContentInput,
  UpdatePullRequestApprovalRuleContentOutput,
  UpdatePullRequestApprovalRuleContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      pullRequestId: 0,
      approvalRuleName: 0,
      existingRuleContentSha256: 0,
      newRuleContent: 0,
    },
    output: { approvalRule: o_ApprovalRule },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePullRequestApprovalRuleContent",
})) as any;

export type UpdatePullRequestApprovalStateError =
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
  | CommonErrors;
/**
 * Updates the state of a user's approval on a pull request. The user is derived from the signed-in account when the request is made.
 */
export const updatePullRequestApprovalState: API.OperationMethod<
  UpdatePullRequestApprovalStateInput,
  UpdatePullRequestApprovalStateResponse,
  UpdatePullRequestApprovalStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pullRequestId: 0, revisionId: 0, approvalState: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePullRequestApprovalState",
})) as any;

export type UpdatePullRequestDescriptionError =
  | InvalidDescriptionException
  | InvalidPullRequestIdException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors;
/**
 * Replaces the contents of the description of a pull request.
 */
export const updatePullRequestDescription: API.OperationMethod<
  UpdatePullRequestDescriptionInput,
  UpdatePullRequestDescriptionOutput,
  UpdatePullRequestDescriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pullRequestId: 0, description: 0 },
    output: { pullRequest: o_PullRequest },
  },
  errors: [
    InvalidDescriptionException,
    InvalidPullRequestIdException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePullRequestDescription",
})) as any;

export type UpdatePullRequestStatusError =
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
  | CommonErrors;
/**
 * Updates the status of a pull request.
 */
export const updatePullRequestStatus: API.OperationMethod<
  UpdatePullRequestStatusInput,
  UpdatePullRequestStatusOutput,
  UpdatePullRequestStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pullRequestId: 0, pullRequestStatus: 0 },
    output: { pullRequest: o_PullRequest },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePullRequestStatus",
})) as any;

export type UpdatePullRequestTitleError =
  | InvalidPullRequestIdException
  | InvalidTitleException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | TitleRequiredException
  | CommonErrors;
/**
 * Replaces the title of a pull request.
 */
export const updatePullRequestTitle: API.OperationMethod<
  UpdatePullRequestTitleInput,
  UpdatePullRequestTitleOutput,
  UpdatePullRequestTitleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pullRequestId: 0, title: 0 },
    output: { pullRequest: o_PullRequest },
  },
  errors: [
    InvalidPullRequestIdException,
    InvalidTitleException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    TitleRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePullRequestTitle",
})) as any;

export type UpdateRepositoryDescriptionError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryDescriptionException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
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
  UpdateRepositoryDescriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { repositoryName: 0, repositoryDescription: 0 },
  },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRepositoryDescription",
})) as any;

export type UpdateRepositoryEncryptionKeyError =
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
  | CommonErrors;
/**
 * Updates the Key Management Service encryption key used to encrypt and decrypt a CodeCommit repository.
 */
export const updateRepositoryEncryptionKey: API.OperationMethod<
  UpdateRepositoryEncryptionKeyInput,
  UpdateRepositoryEncryptionKeyOutput,
  UpdateRepositoryEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { repositoryName: 0, kmsKeyId: 0 } },
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
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRepositoryEncryptionKey",
})) as any;

export type UpdateRepositoryNameError =
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameExistsException
  | RepositoryNameRequiredException
  | CommonErrors;
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
  UpdateRepositoryNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { oldName: 0, newName: 0 } },
  errors: [
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameExistsException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRepositoryName",
})) as any;

const i_ConflictResolution: D.LazyStruct = () => ({
  replaceContents: D.list({
    filePath: 0,
    replacementType: 0,
    content: 0,
    fileMode: 0,
  }),
  deleteFiles: D.list(i_DeleteFileEntry),
  setFileModes: D.list(i_SetFileModeEntry),
});
const i_DeleteFileEntry: D.LazyStruct = () => ({ filePath: 0 });
const i_Location: D.LazyStruct = () => ({
  filePath: 0,
  filePosition: 0,
  relativeFileVersion: 0,
});
const i_RepositoryTrigger: D.LazyStruct = () => ({
  name: 0,
  destinationArn: 0,
  customData: 0,
  branches: 0,
  events: 0,
});
const i_SetFileModeEntry: D.LazyStruct = () => ({ filePath: 0, fileMode: 0 });
const o_ApprovalRule: D.LazyStruct = () => ({
  lastModifiedDate: D.ts,
  creationDate: D.ts,
});
const o_ApprovalRuleTemplate: D.LazyStruct = () => ({
  lastModifiedDate: D.ts,
  creationDate: D.ts,
});
const o_Comment: D.LazyStruct = () => ({
  creationDate: D.ts,
  lastModifiedDate: D.ts,
});
const o_PullRequest: D.LazyStruct = () => ({
  lastActivityDate: D.ts,
  creationDate: D.ts,
  approvalRules: D.list(o_ApprovalRule),
});
const o_RepositoryMetadata: D.LazyStruct = () => ({
  lastModifiedDate: D.ts,
  creationDate: D.ts,
});
