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
const ns = /*@__PURE__*/ T.XmlNamespace("http://codecommit.amazonaws.com/doc/2015-04-13");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CodeCommit",
  serviceShapeName: "CodeCommit_20150413",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "codecommit" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-04-13");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codecommit.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://codecommit.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://codecommit.{R}.{D}","properties":{},"headers":{}}');

export class ActorDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ActorDoesNotExistException>()("ActorDoesNotExistException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ApprovalRuleContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleContentRequiredException>()(
    "ApprovalRuleContentRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ApprovalRuleDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleDoesNotExistException>()(
    "ApprovalRuleDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ApprovalRuleNameAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleNameAlreadyExistsException>()(
    "ApprovalRuleNameAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ApprovalRuleNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleNameRequiredException>()(
    "ApprovalRuleNameRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ApprovalRuleTemplateContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleTemplateContentRequiredException>()(
    "ApprovalRuleTemplateContentRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ApprovalRuleTemplateDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleTemplateDoesNotExistException>()(
    "ApprovalRuleTemplateDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ApprovalRuleTemplateInUseException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleTemplateInUseException>()(
    "ApprovalRuleTemplateInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ApprovalRuleTemplateNameAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleTemplateNameAlreadyExistsException>()(
    "ApprovalRuleTemplateNameAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ApprovalRuleTemplateNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleTemplateNameRequiredException>()(
    "ApprovalRuleTemplateNameRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ApprovalStateRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApprovalStateRequiredException>()(
    "ApprovalStateRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class AuthorDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<AuthorDoesNotExistException>()(
    "AuthorDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class BeforeCommitIdAndAfterCommitIdAreSameException
  extends /*@__PURE__*/ S.TaggedError<BeforeCommitIdAndAfterCommitIdAreSameException>()(
    "BeforeCommitIdAndAfterCommitIdAreSameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class BlobIdDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<BlobIdDoesNotExistException>()(
    "BlobIdDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class BlobIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<BlobIdRequiredException>()("BlobIdRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class BranchDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<BranchDoesNotExistException>()(
    "BranchDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class BranchNameExistsException
  extends /*@__PURE__*/ S.TaggedError<BranchNameExistsException>()("BranchNameExistsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class BranchNameIsTagNameException
  extends /*@__PURE__*/ S.TaggedError<BranchNameIsTagNameException>()(
    "BranchNameIsTagNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class BranchNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<BranchNameRequiredException>()(
    "BranchNameRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CannotDeleteApprovalRuleFromTemplateException
  extends /*@__PURE__*/ S.TaggedError<CannotDeleteApprovalRuleFromTemplateException>()(
    "CannotDeleteApprovalRuleFromTemplateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CannotModifyApprovalRuleFromTemplateException
  extends /*@__PURE__*/ S.TaggedError<CannotModifyApprovalRuleFromTemplateException>()(
    "CannotModifyApprovalRuleFromTemplateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ClientRequestTokenRequiredException
  extends /*@__PURE__*/ S.TaggedError<ClientRequestTokenRequiredException>()(
    "ClientRequestTokenRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CommentContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<CommentContentRequiredException>()(
    "CommentContentRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CommentContentSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CommentContentSizeLimitExceededException>()(
    "CommentContentSizeLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CommentDeletedException
  extends /*@__PURE__*/ S.TaggedError<CommentDeletedException>()("CommentDeletedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class CommentDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<CommentDoesNotExistException>()(
    "CommentDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CommentIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<CommentIdRequiredException>()("CommentIdRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class CommentNotCreatedByCallerException
  extends /*@__PURE__*/ S.TaggedError<CommentNotCreatedByCallerException>()(
    "CommentNotCreatedByCallerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CommitDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<CommitDoesNotExistException>()(
    "CommitDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CommitIdDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<CommitIdDoesNotExistException>()(
    "CommitIdDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CommitIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<CommitIdRequiredException>()("CommitIdRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class CommitIdsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CommitIdsLimitExceededException>()(
    "CommitIdsLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CommitIdsListRequiredException
  extends /*@__PURE__*/ S.TaggedError<CommitIdsListRequiredException>()(
    "CommitIdsListRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CommitMessageLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<CommitMessageLengthExceededException>()(
    "CommitMessageLengthExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class CommitRequiredException
  extends /*@__PURE__*/ S.TaggedError<CommitRequiredException>()("CommitRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ConcurrentReferenceUpdateException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentReferenceUpdateException>()(
    "ConcurrentReferenceUpdateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DefaultBranchCannotBeDeletedException
  extends /*@__PURE__*/ S.TaggedError<DefaultBranchCannotBeDeletedException>()(
    "DefaultBranchCannotBeDeletedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DirectoryNameConflictsWithFileNameException
  extends /*@__PURE__*/ S.TaggedError<DirectoryNameConflictsWithFileNameException>()(
    "DirectoryNameConflictsWithFileNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class EncryptionIntegrityChecksFailedException
  extends /*@__PURE__*/ S.TaggedError<EncryptionIntegrityChecksFailedException>()(
    "EncryptionIntegrityChecksFailedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class EncryptionKeyAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyAccessDeniedException>()(
    "EncryptionKeyAccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class EncryptionKeyDisabledException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyDisabledException>()(
    "EncryptionKeyDisabledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class EncryptionKeyInvalidIdException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyInvalidIdException>()(
    "EncryptionKeyInvalidIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class EncryptionKeyInvalidUsageException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyInvalidUsageException>()(
    "EncryptionKeyInvalidUsageException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class EncryptionKeyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyNotFoundException>()(
    "EncryptionKeyNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class EncryptionKeyRequiredException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyRequiredException>()(
    "EncryptionKeyRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class EncryptionKeyUnavailableException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyUnavailableException>()(
    "EncryptionKeyUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class FileContentAndSourceFileSpecifiedException
  extends /*@__PURE__*/ S.TaggedError<FileContentAndSourceFileSpecifiedException>()(
    "FileContentAndSourceFileSpecifiedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class FileContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<FileContentRequiredException>()(
    "FileContentRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class FileContentSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<FileContentSizeLimitExceededException>()(
    "FileContentSizeLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class FileDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<FileDoesNotExistException>()("FileDoesNotExistException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class FileEntryRequiredException
  extends /*@__PURE__*/ S.TaggedError<FileEntryRequiredException>()("FileEntryRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class FileModeRequiredException
  extends /*@__PURE__*/ S.TaggedError<FileModeRequiredException>()("FileModeRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class FileNameConflictsWithDirectoryNameException
  extends /*@__PURE__*/ S.TaggedError<FileNameConflictsWithDirectoryNameException>()(
    "FileNameConflictsWithDirectoryNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class FilePathConflictsWithSubmodulePathException
  extends /*@__PURE__*/ S.TaggedError<FilePathConflictsWithSubmodulePathException>()(
    "FilePathConflictsWithSubmodulePathException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class FileTooLargeException
  extends /*@__PURE__*/ S.TaggedError<FileTooLargeException>()("FileTooLargeException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class FolderContentSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<FolderContentSizeLimitExceededException>()(
    "FolderContentSizeLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class FolderDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<FolderDoesNotExistException>()(
    "FolderDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class IdempotencyParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotencyParameterMismatchException>()(
    "IdempotencyParameterMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidActorArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidActorArnException>()("InvalidActorArnException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidApprovalRuleContentException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalRuleContentException>()(
    "InvalidApprovalRuleContentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidApprovalRuleNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalRuleNameException>()(
    "InvalidApprovalRuleNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidApprovalRuleTemplateContentException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalRuleTemplateContentException>()(
    "InvalidApprovalRuleTemplateContentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidApprovalRuleTemplateDescriptionException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalRuleTemplateDescriptionException>()(
    "InvalidApprovalRuleTemplateDescriptionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidApprovalRuleTemplateNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalRuleTemplateNameException>()(
    "InvalidApprovalRuleTemplateNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidApprovalStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalStateException>()(
    "InvalidApprovalStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidAuthorArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidAuthorArnException>()("InvalidAuthorArnException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidBlobIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidBlobIdException>()("InvalidBlobIdException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidBranchNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidBranchNameException>()("InvalidBranchNameException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidClientRequestTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidClientRequestTokenException>()(
    "InvalidClientRequestTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidCommentIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidCommentIdException>()("InvalidCommentIdException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidCommitException
  extends /*@__PURE__*/ S.TaggedError<InvalidCommitException>()("InvalidCommitException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidCommitIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidCommitIdException>()("InvalidCommitIdException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidConflictDetailLevelException
  extends /*@__PURE__*/ S.TaggedError<InvalidConflictDetailLevelException>()(
    "InvalidConflictDetailLevelException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidConflictResolutionException
  extends /*@__PURE__*/ S.TaggedError<InvalidConflictResolutionException>()(
    "InvalidConflictResolutionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidConflictResolutionStrategyException
  extends /*@__PURE__*/ S.TaggedError<InvalidConflictResolutionStrategyException>()(
    "InvalidConflictResolutionStrategyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidContinuationTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidContinuationTokenException>()(
    "InvalidContinuationTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDeletionParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeletionParameterException>()(
    "InvalidDeletionParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDescriptionException
  extends /*@__PURE__*/ S.TaggedError<InvalidDescriptionException>()(
    "InvalidDescriptionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidDestinationCommitSpecifierException
  extends /*@__PURE__*/ S.TaggedError<InvalidDestinationCommitSpecifierException>()(
    "InvalidDestinationCommitSpecifierException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidEmailException
  extends /*@__PURE__*/ S.TaggedError<InvalidEmailException>()("InvalidEmailException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidFileLocationException
  extends /*@__PURE__*/ S.TaggedError<InvalidFileLocationException>()(
    "InvalidFileLocationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidFileModeException
  extends /*@__PURE__*/ S.TaggedError<InvalidFileModeException>()("InvalidFileModeException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidFilePositionException
  extends /*@__PURE__*/ S.TaggedError<InvalidFilePositionException>()(
    "InvalidFilePositionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidMaxConflictFilesException
  extends /*@__PURE__*/ S.TaggedError<InvalidMaxConflictFilesException>()(
    "InvalidMaxConflictFilesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidMaxMergeHunksException
  extends /*@__PURE__*/ S.TaggedError<InvalidMaxMergeHunksException>()(
    "InvalidMaxMergeHunksException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidMaxResultsException
  extends /*@__PURE__*/ S.TaggedError<InvalidMaxResultsException>()("InvalidMaxResultsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidMergeOptionException
  extends /*@__PURE__*/ S.TaggedError<InvalidMergeOptionException>()(
    "InvalidMergeOptionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidOrderException
  extends /*@__PURE__*/ S.TaggedError<InvalidOrderException>()("InvalidOrderException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidOverrideStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidOverrideStatusException>()(
    "InvalidOverrideStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidParentCommitIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidParentCommitIdException>()(
    "InvalidParentCommitIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidPathException
  extends /*@__PURE__*/ S.TaggedError<InvalidPathException>()("InvalidPathException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidPullRequestEventTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidPullRequestEventTypeException>()(
    "InvalidPullRequestEventTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidPullRequestIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidPullRequestIdException>()(
    "InvalidPullRequestIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidPullRequestStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidPullRequestStatusException>()(
    "InvalidPullRequestStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidPullRequestStatusUpdateException
  extends /*@__PURE__*/ S.TaggedError<InvalidPullRequestStatusUpdateException>()(
    "InvalidPullRequestStatusUpdateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidReactionUserArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidReactionUserArnException>()(
    "InvalidReactionUserArnException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidReactionValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidReactionValueException>()(
    "InvalidReactionValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidReferenceNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidReferenceNameException>()(
    "InvalidReferenceNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRelativeFileVersionEnumException
  extends /*@__PURE__*/ S.TaggedError<InvalidRelativeFileVersionEnumException>()(
    "InvalidRelativeFileVersionEnumException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidReplacementContentException
  extends /*@__PURE__*/ S.TaggedError<InvalidReplacementContentException>()(
    "InvalidReplacementContentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidReplacementTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidReplacementTypeException>()(
    "InvalidReplacementTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryDescriptionException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryDescriptionException>()(
    "InvalidRepositoryDescriptionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryNameException>()(
    "InvalidRepositoryNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerBranchNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerBranchNameException>()(
    "InvalidRepositoryTriggerBranchNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerCustomDataException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerCustomDataException>()(
    "InvalidRepositoryTriggerCustomDataException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerDestinationArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerDestinationArnException>()(
    "InvalidRepositoryTriggerDestinationArnException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerEventsException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerEventsException>()(
    "InvalidRepositoryTriggerEventsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerNameException>()(
    "InvalidRepositoryTriggerNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerRegionException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerRegionException>()(
    "InvalidRepositoryTriggerRegionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidResourceArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceArnException>()(
    "InvalidResourceArnException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRevisionIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidRevisionIdException>()("InvalidRevisionIdException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidRuleContentSha256Exception
  extends /*@__PURE__*/ S.TaggedError<InvalidRuleContentSha256Exception>()(
    "InvalidRuleContentSha256Exception",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidSortByException
  extends /*@__PURE__*/ S.TaggedError<InvalidSortByException>()("InvalidSortByException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidSourceCommitSpecifierException
  extends /*@__PURE__*/ S.TaggedError<InvalidSourceCommitSpecifierException>()(
    "InvalidSourceCommitSpecifierException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidSystemTagUsageException
  extends /*@__PURE__*/ S.TaggedError<InvalidSystemTagUsageException>()(
    "InvalidSystemTagUsageException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidTagKeysListException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagKeysListException>()(
    "InvalidTagKeysListException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidTagsMapException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagsMapException>()("InvalidTagsMapException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTargetBranchException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetBranchException>()(
    "InvalidTargetBranchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidTargetException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetException>()("InvalidTargetException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTargetsException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetsException>()("InvalidTargetsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTitleException
  extends /*@__PURE__*/ S.TaggedError<InvalidTitleException>()("InvalidTitleException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ManualMergeRequiredException
  extends /*@__PURE__*/ S.TaggedError<ManualMergeRequiredException>()(
    "ManualMergeRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaximumBranchesExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumBranchesExceededException>()(
    "MaximumBranchesExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaximumConflictResolutionEntriesExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumConflictResolutionEntriesExceededException>()(
    "MaximumConflictResolutionEntriesExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaximumFileContentToLoadExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumFileContentToLoadExceededException>()(
    "MaximumFileContentToLoadExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaximumFileEntriesExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumFileEntriesExceededException>()(
    "MaximumFileEntriesExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaximumItemsToCompareExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumItemsToCompareExceededException>()(
    "MaximumItemsToCompareExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaximumNumberOfApprovalsExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumNumberOfApprovalsExceededException>()(
    "MaximumNumberOfApprovalsExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaximumOpenPullRequestsExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumOpenPullRequestsExceededException>()(
    "MaximumOpenPullRequestsExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaximumRepositoryNamesExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumRepositoryNamesExceededException>()(
    "MaximumRepositoryNamesExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaximumRepositoryTriggersExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumRepositoryTriggersExceededException>()(
    "MaximumRepositoryTriggersExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MaximumRuleTemplatesAssociatedWithRepositoryException
  extends /*@__PURE__*/ S.TaggedError<MaximumRuleTemplatesAssociatedWithRepositoryException>()(
    "MaximumRuleTemplatesAssociatedWithRepositoryException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MergeOptionRequiredException
  extends /*@__PURE__*/ S.TaggedError<MergeOptionRequiredException>()(
    "MergeOptionRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MultipleConflictResolutionEntriesException
  extends /*@__PURE__*/ S.TaggedError<MultipleConflictResolutionEntriesException>()(
    "MultipleConflictResolutionEntriesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MultipleRepositoriesInPullRequestException
  extends /*@__PURE__*/ S.TaggedError<MultipleRepositoriesInPullRequestException>()(
    "MultipleRepositoriesInPullRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NameLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<NameLengthExceededException>()(
    "NameLengthExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoChangeException
  extends /*@__PURE__*/ S.TaggedError<NoChangeException>()("NoChangeException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NumberOfRulesExceededException
  extends /*@__PURE__*/ S.TaggedError<NumberOfRulesExceededException>()(
    "NumberOfRulesExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NumberOfRuleTemplatesExceededException
  extends /*@__PURE__*/ S.TaggedError<NumberOfRuleTemplatesExceededException>()(
    "NumberOfRuleTemplatesExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class OperationNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotAllowedException>()(
    "OperationNotAllowedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class OverrideAlreadySetException
  extends /*@__PURE__*/ S.TaggedError<OverrideAlreadySetException>()(
    "OverrideAlreadySetException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class OverrideStatusRequiredException
  extends /*@__PURE__*/ S.TaggedError<OverrideStatusRequiredException>()(
    "OverrideStatusRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ParentCommitDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ParentCommitDoesNotExistException>()(
    "ParentCommitDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ParentCommitIdOutdatedException
  extends /*@__PURE__*/ S.TaggedError<ParentCommitIdOutdatedException>()(
    "ParentCommitIdOutdatedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ParentCommitIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<ParentCommitIdRequiredException>()(
    "ParentCommitIdRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PathDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<PathDoesNotExistException>()("PathDoesNotExistException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PathRequiredException
  extends /*@__PURE__*/ S.TaggedError<PathRequiredException>()("PathRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PullRequestAlreadyClosedException
  extends /*@__PURE__*/ S.TaggedError<PullRequestAlreadyClosedException>()(
    "PullRequestAlreadyClosedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PullRequestApprovalRulesNotSatisfiedException
  extends /*@__PURE__*/ S.TaggedError<PullRequestApprovalRulesNotSatisfiedException>()(
    "PullRequestApprovalRulesNotSatisfiedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PullRequestCannotBeApprovedByAuthorException
  extends /*@__PURE__*/ S.TaggedError<PullRequestCannotBeApprovedByAuthorException>()(
    "PullRequestCannotBeApprovedByAuthorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PullRequestDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<PullRequestDoesNotExistException>()(
    "PullRequestDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PullRequestIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<PullRequestIdRequiredException>()(
    "PullRequestIdRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PullRequestStatusRequiredException
  extends /*@__PURE__*/ S.TaggedError<PullRequestStatusRequiredException>()(
    "PullRequestStatusRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PutFileEntryConflictException
  extends /*@__PURE__*/ S.TaggedError<PutFileEntryConflictException>()(
    "PutFileEntryConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ReactionLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ReactionLimitExceededException>()(
    "ReactionLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ReactionValueRequiredException
  extends /*@__PURE__*/ S.TaggedError<ReactionValueRequiredException>()(
    "ReactionValueRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ReferenceDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ReferenceDoesNotExistException>()(
    "ReferenceDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ReferenceNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<ReferenceNameRequiredException>()(
    "ReferenceNameRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ReferenceTypeNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ReferenceTypeNotSupportedException>()(
    "ReferenceTypeNotSupportedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ReplacementContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<ReplacementContentRequiredException>()(
    "ReplacementContentRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ReplacementTypeRequiredException
  extends /*@__PURE__*/ S.TaggedError<ReplacementTypeRequiredException>()(
    "ReplacementTypeRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<RepositoryDoesNotExistException>()(
    "RepositoryDoesNotExistException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<RepositoryLimitExceededException>()(
    "RepositoryLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryNameExistsException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNameExistsException>()(
    "RepositoryNameExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNameRequiredException>()(
    "RepositoryNameRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryNamesRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNamesRequiredException>()(
    "RepositoryNamesRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryNotAssociatedWithPullRequestException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNotAssociatedWithPullRequestException>()(
    "RepositoryNotAssociatedWithPullRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryTriggerBranchNameListRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryTriggerBranchNameListRequiredException>()(
    "RepositoryTriggerBranchNameListRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryTriggerDestinationArnRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryTriggerDestinationArnRequiredException>()(
    "RepositoryTriggerDestinationArnRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryTriggerEventsListRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryTriggerEventsListRequiredException>()(
    "RepositoryTriggerEventsListRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryTriggerNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryTriggerNameRequiredException>()(
    "RepositoryTriggerNameRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RepositoryTriggersListRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryTriggersListRequiredException>()(
    "RepositoryTriggersListRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ResourceArnRequiredException
  extends /*@__PURE__*/ S.TaggedError<ResourceArnRequiredException>()(
    "ResourceArnRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RestrictedSourceFileException
  extends /*@__PURE__*/ S.TaggedError<RestrictedSourceFileException>()(
    "RestrictedSourceFileException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RevisionIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<RevisionIdRequiredException>()(
    "RevisionIdRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RevisionNotCurrentException
  extends /*@__PURE__*/ S.TaggedError<RevisionNotCurrentException>()(
    "RevisionNotCurrentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class SameFileContentException
  extends /*@__PURE__*/ S.TaggedError<SameFileContentException>()("SameFileContentException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class SamePathRequestException
  extends /*@__PURE__*/ S.TaggedError<SamePathRequestException>()("SamePathRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class SourceAndDestinationAreSameException
  extends /*@__PURE__*/ S.TaggedError<SourceAndDestinationAreSameException>()(
    "SourceAndDestinationAreSameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class SourceFileOrContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<SourceFileOrContentRequiredException>()(
    "SourceFileOrContentRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class TagKeysListRequiredException
  extends /*@__PURE__*/ S.TaggedError<TagKeysListRequiredException>()(
    "TagKeysListRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class TagPolicyException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyException>()("TagPolicyException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TagsMapRequiredException
  extends /*@__PURE__*/ S.TaggedError<TagsMapRequiredException>()("TagsMapRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TargetRequiredException
  extends /*@__PURE__*/ S.TaggedError<TargetRequiredException>()("TargetRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TargetsRequiredException
  extends /*@__PURE__*/ S.TaggedError<TargetsRequiredException>()("TargetsRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TipOfSourceReferenceIsDifferentException
  extends /*@__PURE__*/ S.TaggedError<TipOfSourceReferenceIsDifferentException>()(
    "TipOfSourceReferenceIsDifferentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class TipsDivergenceExceededException
  extends /*@__PURE__*/ S.TaggedError<TipsDivergenceExceededException>()(
    "TipsDivergenceExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class TitleRequiredException
  extends /*@__PURE__*/ S.TaggedError<TitleRequiredException>()("TitleRequiredException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()("TooManyTagsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
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
export type ConflictDetailLevelTypeEnum = "FILE_LEVEL" | "LINE_LEVEL" | (string & {});
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
export type FileModeTypeEnum = "EXECUTABLE" | "NORMAL" | "SYMLINK" | (string & {});
export interface FileModes {
  source?: FileModeTypeEnum;
  destination?: FileModeTypeEnum;
  base?: FileModeTypeEnum;
}
export type ObjectTypeEnum = "FILE" | "DIRECTORY" | "GIT_LINK" | "SYMBOLIC_LINK" | (string & {});
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
export type BatchDescribeMergeConflictsErrors = BatchDescribeMergeConflictsError_[];
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
export type RepositoryTriggerExecutionFailureList = RepositoryTriggerExecutionFailure[];
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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateApprovalRuleTemplateWithRepositoryInput>,
  output: __S(16, __c1, 0) as any as S.Schema<AssociateApprovalRuleTemplateWithRepositoryResponse>,
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
}));

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
  input: __S(
    32,
    __c2,
    0,
  ) as any as S.Schema<BatchAssociateApprovalRuleTemplateWithRepositoriesInput>,
  output: __S(
    35,
    __c2,
    3,
  ) as any as S.Schema<BatchAssociateApprovalRuleTemplateWithRepositoriesOutput>,
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
}));

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
  input: __S(64, __c4, 0) as any as S.Schema<BatchDescribeMergeConflictsInput>,
  output: __S(69, __c4, 5) as any as S.Schema<BatchDescribeMergeConflictsOutput>,
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
}));

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
  input: __S(
    112,
    __c7,
    0,
  ) as any as S.Schema<BatchDisassociateApprovalRuleTemplateFromRepositoriesInput>,
  output: __S(
    115,
    __c7,
    3,
  ) as any as S.Schema<BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<BatchGetCommitsInput>,
  output: __S(132, __c8, 4) as any as S.Schema<BatchGetCommitsOutput>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<BatchGetRepositoriesInput>,
  output: __S(164, __c10, 4) as any as S.Schema<BatchGetRepositoriesOutput>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<CreateApprovalRuleTemplateInput>,
  output: __S(209, __c13, 1) as any as S.Schema<CreateApprovalRuleTemplateOutput>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<CreateBranchInput>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateBranchResponse>,
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
}));

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
  input: __S(243, __c15, 3) as any as S.Schema<CreateCommitInput>,
  output: __S(246, __c15, 6) as any as S.Schema<CreateCommitOutput>,
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
}));

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
  input: __S(274, __c17, 2) as any as S.Schema<CreatePullRequestInput>,
  output: __S(336, __c21, 0) as any as S.Schema<CreatePullRequestOutput>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<CreatePullRequestApprovalRuleInput>,
  output: __S(368, __c23, 0) as any as S.Schema<CreatePullRequestApprovalRuleOutput>,
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
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<CreateRepositoryInput>,
  output: __S(400, __c25, 0) as any as S.Schema<CreateRepositoryOutput>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<CreateUnreferencedMergeCommitInput>,
  output: __S(448, __c28, 0) as any as S.Schema<CreateUnreferencedMergeCommitOutput>,
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
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<DeleteApprovalRuleTemplateInput>,
  output: __S(481, __c30, 1) as any as S.Schema<DeleteApprovalRuleTemplateOutput>,
  errors: [
    ApprovalRuleTemplateInUseException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApprovalRuleTemplate",
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<DeleteBranchInput>,
  output: __S(497, __c31, 1) as any as S.Schema<DeleteBranchOutput>,
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
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<DeleteCommentContentInput>,
  output: __S(560, __c35, 0) as any as S.Schema<DeleteCommentContentOutput>,
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    InvalidCommentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCommentContent",
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<DeleteFileInput>,
  output: __S(577, __c36, 1) as any as S.Schema<DeleteFileOutput>,
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
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<DeletePullRequestApprovalRuleInput>,
  output: __S(593, __c37, 1) as any as S.Schema<DeletePullRequestApprovalRuleOutput>,
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
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<DeleteRepositoryInput>,
  output: __S(609, __c38, 1) as any as S.Schema<DeleteRepositoryOutput>,
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
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<DescribeMergeConflictsInput>,
  output: __S(625, __c39, 1) as any as S.Schema<DescribeMergeConflictsOutput>,
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
  input: __S(640, __c40, 0) as any as S.Schema<DescribePullRequestEventsInput>,
  output: __S(650, __c40, 10) as any as S.Schema<DescribePullRequestEventsOutput>,
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
  input: __S(656, __c41, 0) as any as S.Schema<DisassociateApprovalRuleTemplateFromRepositoryInput>,
  output: __S(
    16,
    __c1,
    0,
  ) as any as S.Schema<DisassociateApprovalRuleTemplateFromRepositoryResponse>,
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
}));

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
  input: __S(672, __c42, 0) as any as S.Schema<EvaluatePullRequestApprovalRulesInput>,
  output: __S(674, __c42, 2) as any as S.Schema<EvaluatePullRequestApprovalRulesOutput>,
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
}));

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
  input: __S(688, __c43, 0) as any as S.Schema<GetApprovalRuleTemplateInput>,
  output: __S(209, __c13, 1) as any as S.Schema<GetApprovalRuleTemplateOutput>,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApprovalRuleTemplate",
}));

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
  input: __S(704, __c44, 0) as any as S.Schema<GetBlobInput>,
  output: __S(705, __c44, 1) as any as S.Schema<GetBlobOutput>,
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
}));

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
  input: __S(720, __c45, 0) as any as S.Schema<GetBlobDifferencesInput>,
  output: __S(725, __c45, 5) as any as S.Schema<GetBlobDifferencesOutput>,
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
  input: __S(736, __c46, 0) as any as S.Schema<GetBranchInput>,
  output: __S(737, __c46, 1) as any as S.Schema<GetBranchOutput>,
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
}));

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
  input: __S(752, __c47, 0) as any as S.Schema<GetCommentInput>,
  output: __S(560, __c35, 0) as any as S.Schema<GetCommentOutput>,
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
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<GetCommentReactionsInput>,
  output: __S(772, __c48, 4) as any as S.Schema<GetCommentReactionsOutput>,
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
  input: __S(784, __c49, 0) as any as S.Schema<GetCommentsForComparedCommitInput>,
  output: __S(787, __c49, 3) as any as S.Schema<GetCommentsForComparedCommitOutput>,
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
  input: __S(832, __c52, 0) as any as S.Schema<GetCommentsForPullRequestInput>,
  output: __S(835, __c52, 3) as any as S.Schema<GetCommentsForPullRequestOutput>,
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
  input: __S(848, __c53, 0) as any as S.Schema<GetCommitInput>,
  output: __S(849, __c53, 1) as any as S.Schema<GetCommitOutput>,
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
}));

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
  input: __S(864, __c54, 0) as any as S.Schema<GetDifferencesInput>,
  output: __S(868, __c54, 4) as any as S.Schema<GetDifferencesOutput>,
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
  input: __S(880, __c55, 0) as any as S.Schema<GetFileInput>,
  output: __S(881, __c55, 1) as any as S.Schema<GetFileOutput>,
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
}));

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
  input: __S(896, __c56, 0) as any as S.Schema<GetFolderInput>,
  output: __S(903, __c56, 7) as any as S.Schema<GetFolderOutput>,
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
}));

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
  input: __S(912, __c57, 0) as any as S.Schema<GetMergeCommitInput>,
  output: __S(913, __c57, 1) as any as S.Schema<GetMergeCommitOutput>,
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
}));

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
  input: __S(928, __c58, 0) as any as S.Schema<GetMergeConflictsInput>,
  output: __S(930, __c58, 2) as any as S.Schema<GetMergeConflictsOutput>,
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
  input: __S(944, __c59, 0) as any as S.Schema<GetMergeOptionsInput>,
  output: __S(945, __c59, 1) as any as S.Schema<GetMergeOptionsOutput>,
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
}));

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
  input: __S(976, __c61, 0) as any as S.Schema<GetPullRequestInput>,
  output: __S(336, __c21, 0) as any as S.Schema<GetPullRequestOutput>,
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
}));

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
  input: __S(992, __c62, 0) as any as S.Schema<GetPullRequestApprovalStatesInput>,
  output: __S(995, __c62, 3) as any as S.Schema<GetPullRequestApprovalStatesOutput>,
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
}));

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
  input: __S(1008, __c63, 0) as any as S.Schema<GetPullRequestOverrideStateInput>,
  output: __S(1009, __c63, 1) as any as S.Schema<GetPullRequestOverrideStateOutput>,
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
}));

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
  input: __S(1024, __c64, 0) as any as S.Schema<GetRepositoryInput>,
  output: __S(400, __c25, 0) as any as S.Schema<GetRepositoryOutput>,
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
}));

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
  input: __S(1040, __c65, 0) as any as S.Schema<GetRepositoryTriggersInput>,
  output: __S(1041, __c65, 1) as any as S.Schema<GetRepositoryTriggersOutput>,
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
}));

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
  input: __S(1072, __c67, 0) as any as S.Schema<ListApprovalRuleTemplatesInput>,
  output: __S(1088, __c68, 0) as any as S.Schema<ListApprovalRuleTemplatesOutput>,
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
  input: __S(
    1104,
    __c69,
    0,
  ) as any as S.Schema<ListAssociatedApprovalRuleTemplatesForRepositoryInput>,
  output: __S(
    1088,
    __c68,
    0,
  ) as any as S.Schema<ListAssociatedApprovalRuleTemplatesForRepositoryOutput>,
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
  input: __S(1120, __c70, 0) as any as S.Schema<ListBranchesInput>,
  output: __S(1121, __c70, 1) as any as S.Schema<ListBranchesOutput>,
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
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "branches" } as const,
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
  input: __S(1136, __c71, 0) as any as S.Schema<ListFileCommitHistoryRequest>,
  output: __S(1139, __c71, 3) as any as S.Schema<ListFileCommitHistoryResponse>,
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
  input: __S(1152, __c72, 0) as any as S.Schema<ListPullRequestsInput>,
  output: __S(1153, __c72, 1) as any as S.Schema<ListPullRequestsOutput>,
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
  input: __S(1168, __c73, 0) as any as S.Schema<ListRepositoriesInput>,
  output: __S(1171, __c73, 3) as any as S.Schema<ListRepositoriesOutput>,
  errors: [InvalidContinuationTokenException, InvalidOrderException, InvalidSortByException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositories",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "repositories" } as const,
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
  input: __S(1184, __c74, 0) as any as S.Schema<ListRepositoriesForApprovalRuleTemplateInput>,
  output: __S(1185, __c74, 1) as any as S.Schema<ListRepositoriesForApprovalRuleTemplateOutput>,
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
  input: __S(1200, __c75, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(1201, __c75, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    InvalidRepositoryNameException,
    InvalidResourceArnException,
    RepositoryDoesNotExistException,
    ResourceArnRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(1216, __c76, 0) as any as S.Schema<MergeBranchesByFastForwardInput>,
  output: __S(448, __c28, 0) as any as S.Schema<MergeBranchesByFastForwardOutput>,
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
}));

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
  input: __S(1232, __c77, 0) as any as S.Schema<MergeBranchesBySquashInput>,
  output: __S(448, __c28, 0) as any as S.Schema<MergeBranchesBySquashOutput>,
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
}));

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
  input: __S(1248, __c78, 0) as any as S.Schema<MergeBranchesByThreeWayInput>,
  output: __S(448, __c28, 0) as any as S.Schema<MergeBranchesByThreeWayOutput>,
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
}));

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
  input: __S(1264, __c79, 0) as any as S.Schema<MergePullRequestByFastForwardInput>,
  output: __S(1280, __c80, 0) as any as S.Schema<MergePullRequestByFastForwardOutput>,
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
}));

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
  input: __S(1296, __c81, 0) as any as S.Schema<MergePullRequestBySquashInput>,
  output: __S(1280, __c80, 0) as any as S.Schema<MergePullRequestBySquashOutput>,
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
}));

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
  input: __S(1312, __c82, 0) as any as S.Schema<MergePullRequestByThreeWayInput>,
  output: __S(1280, __c80, 0) as any as S.Schema<MergePullRequestByThreeWayOutput>,
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
}));

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
  input: __S(1328, __c83, 0) as any as S.Schema<OverridePullRequestApprovalRulesInput>,
  output: __S(16, __c1, 0) as any as S.Schema<OverridePullRequestApprovalRulesResponse>,
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
}));

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
  input: __S(1344, __c84, 0) as any as S.Schema<PostCommentForComparedCommitInput>,
  output: __S(1345, __c84, 1) as any as S.Schema<PostCommentForComparedCommitOutput>,
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
}));

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
  input: __S(1360, __c85, 0) as any as S.Schema<PostCommentForPullRequestInput>,
  output: __S(1361, __c85, 1) as any as S.Schema<PostCommentForPullRequestOutput>,
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
}));

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
  input: __S(1376, __c86, 0) as any as S.Schema<PostCommentReplyInput>,
  output: __S(560, __c35, 0) as any as S.Schema<PostCommentReplyOutput>,
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
}));

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
  input: __S(1392, __c87, 0) as any as S.Schema<PutCommentReactionInput>,
  output: __S(16, __c1, 0) as any as S.Schema<PutCommentReactionResponse>,
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
}));

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
  input: __S(1408, __c88, 0) as any as S.Schema<PutFileInput>,
  output: __S(1409, __c88, 1) as any as S.Schema<PutFileOutput>,
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
}));

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
  input: __S(1424, __c89, 0) as any as S.Schema<PutRepositoryTriggersInput>,
  output: __S(1425, __c89, 1) as any as S.Schema<PutRepositoryTriggersOutput>,
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
}));

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
  input: __S(1440, __c90, 0) as any as S.Schema<TagResourceInput>,
  output: __S(16, __c1, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(1456, __c91, 0) as any as S.Schema<TestRepositoryTriggersInput>,
  output: __S(1459, __c91, 3) as any as S.Schema<TestRepositoryTriggersOutput>,
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
}));

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
  input: __S(1472, __c92, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(1488, __c93, 0) as any as S.Schema<UpdateApprovalRuleTemplateContentInput>,
  output: __S(209, __c13, 1) as any as S.Schema<UpdateApprovalRuleTemplateContentOutput>,
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
}));

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
  input: __S(1504, __c94, 0) as any as S.Schema<UpdateApprovalRuleTemplateDescriptionInput>,
  output: __S(209, __c13, 1) as any as S.Schema<UpdateApprovalRuleTemplateDescriptionOutput>,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateDescriptionException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApprovalRuleTemplateDescription",
}));

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
  input: __S(1520, __c95, 0) as any as S.Schema<UpdateApprovalRuleTemplateNameInput>,
  output: __S(209, __c13, 1) as any as S.Schema<UpdateApprovalRuleTemplateNameOutput>,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameAlreadyExistsException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApprovalRuleTemplateName",
}));

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
  input: __S(1536, __c96, 0) as any as S.Schema<UpdateCommentInput>,
  output: __S(560, __c35, 0) as any as S.Schema<UpdateCommentOutput>,
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
}));

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
  input: __S(1552, __c97, 0) as any as S.Schema<UpdateDefaultBranchInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateDefaultBranchResponse>,
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
}));

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
  input: __S(1568, __c98, 0) as any as S.Schema<UpdatePullRequestApprovalRuleContentInput>,
  output: __S(368, __c23, 0) as any as S.Schema<UpdatePullRequestApprovalRuleContentOutput>,
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
}));

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
  input: __S(1584, __c99, 0) as any as S.Schema<UpdatePullRequestApprovalStateInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdatePullRequestApprovalStateResponse>,
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
}));

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
  input: __S(1600, __c100, 0) as any as S.Schema<UpdatePullRequestDescriptionInput>,
  output: __S(336, __c21, 0) as any as S.Schema<UpdatePullRequestDescriptionOutput>,
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
}));

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
  input: __S(1616, __c101, 0) as any as S.Schema<UpdatePullRequestStatusInput>,
  output: __S(336, __c21, 0) as any as S.Schema<UpdatePullRequestStatusOutput>,
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
}));

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
  input: __S(1632, __c102, 0) as any as S.Schema<UpdatePullRequestTitleInput>,
  output: __S(336, __c21, 0) as any as S.Schema<UpdatePullRequestTitleOutput>,
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
}));

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
  input: __S(1648, __c103, 0) as any as S.Schema<UpdateRepositoryDescriptionInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateRepositoryDescriptionResponse>,
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
}));

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
  input: __S(1664, __c104, 0) as any as S.Schema<UpdateRepositoryEncryptionKeyInput>,
  output: __S(1665, __c104, 1) as any as S.Schema<UpdateRepositoryEncryptionKeyOutput>,
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
}));

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
  input: __S(1680, __c105, 0) as any as S.Schema<UpdateRepositoryNameInput>,
  output: __S(16, __c1, 0) as any as S.Schema<UpdateRepositoryNameResponse>,
  errors: [
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameExistsException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRepositoryName",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ approvalRuleTemplateName: S.String, repositoryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateApprovalRuleTemplateWithRepositoryInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AssociateApprovalRuleTemplateWithRepositoryResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ approvalRuleTemplateName: S.String, repositoryNames: __S(48, __c3, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchAssociateApprovalRuleTemplateWithRepositoriesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchAssociateApprovalRuleTemplateWithRepositoriesError" });
    case 2:
      return S.Array(__S(33, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ associatedRepositoryNames: __S(48, __c3, 0), errors: __S(34, __c2, 2) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "BatchAssociateApprovalRuleTemplateWithRepositoriesOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          destinationCommitSpecifier: S.String,
          sourceCommitSpecifier: S.String,
          mergeOption: S.String,
          maxMergeHunks: S.optional(S.Number),
          maxConflictFiles: S.optional(S.Number),
          filePaths: S.optional(__S(48, __c3, 0)),
          conflictDetailLevel: S.optional(S.String),
          conflictResolutionStrategy: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchDescribeMergeConflictsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          conflictMetadata: S.optional(__S(100, __c6, 4)),
          mergeHunks: S.optional(__S(82, __c5, 2)),
        }),
      ).annotate({ identifier: "Conflict" });
    case 2:
      return S.Array(__S(65, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ filePath: S.String, exceptionName: S.String, message: S.String }),
      ).annotate({ identifier: "BatchDescribeMergeConflictsError" });
    case 4:
      return S.Array(__S(67, __c4, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          conflicts: __S(66, __c4, 2),
          nextToken: S.optional(S.String),
          errors: S.optional(__S(68, __c4, 4)),
          destinationCommitId: S.String,
          sourceCommitId: S.String,
          baseCommitId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "BatchDescribeMergeConflictsOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startLine: S.optional(S.Number),
          endLine: S.optional(S.Number),
          hunkContent: S.optional(S.String),
        }),
      ).annotate({ identifier: "MergeHunkDetail" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          isConflict: S.optional(S.Boolean),
          source: S.optional(__S(80, __c5, 0)),
          destination: S.optional(__S(80, __c5, 0)),
          base: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "MergeHunk" });
    case 2:
      return S.Array(__S(81, __c5, 1));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          source: S.optional(S.Number),
          destination: S.optional(S.Number),
          base: S.optional(S.Number),
        }),
      ).annotate({ identifier: "FileSizes" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          source: S.optional(S.String),
          destination: S.optional(S.String),
          base: S.optional(S.String),
        }),
      ).annotate({ identifier: "FileModes" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          source: S.optional(S.Boolean),
          destination: S.optional(S.Boolean),
          base: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "IsBinaryFile" });
    case 3:
      return S.suspend(() =>
        S.Struct({ source: S.optional(S.String), destination: S.optional(S.String) }),
      ).annotate({ identifier: "MergeOperations" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          filePath: S.optional(S.String),
          fileSizes: S.optional(__S(96, __c6, 0)),
          fileModes: S.optional(__S(97, __c6, 1)),
          objectTypes: S.optional(__S(97, __c6, 1)),
          numberOfConflicts: S.optional(S.Number),
          isBinaryFile: S.optional(__S(98, __c6, 2)),
          contentConflict: S.optional(S.Boolean),
          fileModeConflict: S.optional(S.Boolean),
          objectTypeConflict: S.optional(S.Boolean),
          mergeOperations: S.optional(__S(99, __c6, 3)),
        }),
      ).annotate({ identifier: "ConflictMetadata" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ approvalRuleTemplateName: S.String, repositoryNames: __S(48, __c3, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchDisassociateApprovalRuleTemplateFromRepositoriesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchDisassociateApprovalRuleTemplateFromRepositoriesError" });
    case 2:
      return S.Array(__S(113, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          disassociatedRepositoryNames: __S(48, __c3, 0),
          errors: __S(114, __c7, 2),
        }).pipe(ns),
      ).annotate({ identifier: "BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ commitIds: __S(48, __c3, 0), repositoryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetCommitsInput" });
    case 1:
      return S.Array(__S(145, __c9, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          commitId: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetCommitsError" });
    case 3:
      return S.Array(__S(130, __c8, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          commits: S.optional(__S(129, __c8, 1)),
          errors: S.optional(__S(131, __c8, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "BatchGetCommitsOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          email: S.optional(S.String),
          date: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          commitId: S.optional(S.String),
          treeId: S.optional(S.String),
          parents: S.optional(__S(48, __c3, 0)),
          message: S.optional(S.String),
          author: S.optional(__S(144, __c9, 0)),
          committer: S.optional(__S(144, __c9, 0)),
          additionalData: S.optional(S.String),
        }),
      ).annotate({ identifier: "Commit" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryNames: __S(48, __c3, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetRepositoriesInput" });
    case 1:
      return S.Array(__S(176, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          repositoryId: S.optional(S.String),
          repositoryName: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetRepositoriesError" });
    case 3:
      return S.Array(__S(162, __c10, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          repositories: S.optional(__S(161, __c10, 1)),
          repositoriesNotFound: S.optional(__S(48, __c3, 0)),
          errors: S.optional(__S(163, __c10, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "BatchGetRepositoriesOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          repositoryId: S.optional(S.String),
          repositoryName: S.optional(S.String),
          repositoryDescription: S.optional(S.String),
          defaultBranch: S.optional(S.String),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          cloneUrlHttp: S.optional(S.String),
          cloneUrlSsh: S.optional(S.String),
          Arn: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RepositoryMetadata" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          approvalRuleTemplateName: S.String,
          approvalRuleTemplateContent: S.String,
          approvalRuleTemplateDescription: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateApprovalRuleTemplateInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          approvalRuleTemplateId: S.optional(S.String),
          approvalRuleTemplateName: S.optional(S.String),
          approvalRuleTemplateDescription: S.optional(S.String),
          approvalRuleTemplateContent: S.optional(S.String),
          ruleContentSha256: S.optional(S.String),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedUser: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApprovalRuleTemplate" });
    case 1:
      return S.suspend(() =>
        S.Struct({ approvalRuleTemplate: __S(208, __c13, 0) }).pipe(ns),
      ).annotate({ identifier: "CreateApprovalRuleTemplateOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, branchName: S.String, commitId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateBranchInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ filePath: S.String, isMove: S.optional(S.Boolean) }),
      ).annotate({ identifier: "SourceFileSpecifier" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filePath: S.String,
          fileMode: S.optional(S.String),
          fileContent: S.optional(T.Blob),
          sourceFile: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "PutFileEntry" });
    case 2:
      return S.Array(__S(241, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          branchName: S.String,
          parentCommitId: S.optional(S.String),
          authorName: S.optional(S.String),
          email: S.optional(S.String),
          commitMessage: S.optional(S.String),
          keepEmptyFolders: S.optional(S.Boolean),
          putFiles: S.optional(__S(242, __c15, 2)),
          deleteFiles: S.optional(__S(257, __c16, 1)),
          setFileModes: S.optional(__S(259, __c16, 3)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCommitInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          absolutePath: S.optional(S.String),
          blobId: S.optional(S.String),
          fileMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "FileMetadata" });
    case 5:
      return S.Array(__S(244, __c15, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          commitId: S.optional(S.String),
          treeId: S.optional(S.String),
          filesAdded: S.optional(__S(245, __c15, 5)),
          filesUpdated: S.optional(__S(245, __c15, 5)),
          filesDeleted: S.optional(__S(245, __c15, 5)),
        }).pipe(ns),
      ).annotate({ identifier: "CreateCommitOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ filePath: S.String })).annotate({
        identifier: "DeleteFileEntry",
      });
    case 1:
      return S.Array(__S(256, __c16, 0));
    case 2:
      return S.suspend(() => S.Struct({ filePath: S.String, fileMode: S.String })).annotate({
        identifier: "SetFileModeEntry",
      });
    case 3:
      return S.Array(__S(258, __c16, 2));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          sourceReference: S.String,
          destinationReference: S.optional(S.String),
        }),
      ).annotate({ identifier: "Target" });
    case 1:
      return S.Array(__S(272, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          description: S.optional(S.String),
          targets: __S(273, __c17, 1),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePullRequestInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          approvalRuleTemplateId: S.optional(S.String),
          approvalRuleTemplateName: S.optional(S.String),
        }),
      ).annotate({ identifier: "OriginApprovalRuleTemplate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          approvalRuleId: S.optional(S.String),
          approvalRuleName: S.optional(S.String),
          approvalRuleContent: S.optional(S.String),
          ruleContentSha256: S.optional(S.String),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedUser: S.optional(S.String),
          originApprovalRuleTemplate: S.optional(__S(288, __c18, 0)),
        }),
      ).annotate({ identifier: "ApprovalRule" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          isMerged: S.optional(S.Boolean),
          mergedBy: S.optional(S.String),
          mergeCommitId: S.optional(S.String),
          mergeOption: S.optional(S.String),
        }),
      ).annotate({ identifier: "MergeMetadata" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          sourceReference: S.optional(S.String),
          destinationReference: S.optional(S.String),
          destinationCommit: S.optional(S.String),
          sourceCommit: S.optional(S.String),
          mergeBase: S.optional(S.String),
          mergeMetadata: S.optional(__S(304, __c19, 0)),
        }),
      ).annotate({ identifier: "PullRequestTarget" });
    case 1:
      return S.Array(__S(320, __c20, 0));
    case 2:
      return S.Array(__S(289, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          pullRequestId: S.optional(S.String),
          title: S.optional(S.String),
          description: S.optional(S.String),
          lastActivityDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          pullRequestStatus: S.optional(S.String),
          authorArn: S.optional(S.String),
          pullRequestTargets: S.optional(__S(321, __c20, 1)),
          clientRequestToken: S.optional(S.String),
          revisionId: S.optional(S.String),
          approvalRules: S.optional(__S(322, __c20, 2)),
        }),
      ).annotate({ identifier: "PullRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ pullRequest: __S(323, __c20, 3) }).pipe(ns)).annotate({
        identifier: "CreatePullRequestOutput",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pullRequestId: S.String,
          approvalRuleName: S.String,
          approvalRuleContent: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePullRequestApprovalRuleInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ approvalRule: __S(289, __c18, 1) }).pipe(ns)).annotate({
        identifier: "CreatePullRequestApprovalRuleOutput",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          repositoryDescription: S.optional(S.String),
          tags: S.optional(__S(416, __c26, 0)),
          kmsKeyId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRepositoryInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryMetadata: S.optional(__S(176, __c11, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateRepositoryOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          sourceCommitSpecifier: S.String,
          destinationCommitSpecifier: S.String,
          mergeOption: S.String,
          conflictDetailLevel: S.optional(S.String),
          conflictResolutionStrategy: S.optional(S.String),
          authorName: S.optional(S.String),
          email: S.optional(S.String),
          commitMessage: S.optional(S.String),
          keepEmptyFolders: S.optional(S.Boolean),
          conflictResolution: S.optional(__S(466, __c29, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUnreferencedMergeCommitInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ commitId: S.optional(S.String), treeId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateUnreferencedMergeCommitOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filePath: S.String,
          replacementType: S.String,
          content: S.optional(T.Blob),
          fileMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReplaceContentEntry" });
    case 1:
      return S.Array(__S(464, __c29, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          replaceContents: S.optional(__S(465, __c29, 1)),
          deleteFiles: S.optional(__S(257, __c16, 1)),
          setFileModes: S.optional(__S(259, __c16, 3)),
        }),
      ).annotate({ identifier: "ConflictResolution" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ approvalRuleTemplateName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteApprovalRuleTemplateInput" });
    case 1:
      return S.suspend(() => S.Struct({ approvalRuleTemplateId: S.String }).pipe(ns)).annotate({
        identifier: "DeleteApprovalRuleTemplateOutput",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, branchName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBranchInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ deletedBranch: S.optional(__S(512, __c32, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteBranchOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ branchName: S.optional(S.String), commitId: S.optional(S.String) }),
      ).annotate({ identifier: "BranchInfo" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ commentId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCommentContentInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          commentId: S.optional(S.String),
          content: S.optional(S.String),
          inReplyTo: S.optional(S.String),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          authorArn: S.optional(S.String),
          deleted: S.optional(S.Boolean),
          clientRequestToken: S.optional(S.String),
          callerReactions: S.optional(__S(48, __c3, 0)),
          reactionCounts: S.optional(__S(544, __c34, 0)),
        }),
      ).annotate({ identifier: "Comment" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ comment: S.optional(__S(545, __c34, 1)) }).pipe(ns),
      ).annotate({ identifier: "DeleteCommentContentOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          branchName: S.String,
          filePath: S.String,
          parentCommitId: S.String,
          keepEmptyFolders: S.optional(S.Boolean),
          commitMessage: S.optional(S.String),
          name: S.optional(S.String),
          email: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteFileInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          commitId: S.String,
          blobId: S.String,
          treeId: S.String,
          filePath: S.String,
        }).pipe(ns),
      ).annotate({ identifier: "DeleteFileOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pullRequestId: S.String, approvalRuleName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePullRequestApprovalRuleInput" });
    case 1:
      return S.suspend(() => S.Struct({ approvalRuleId: S.String }).pipe(ns)).annotate({
        identifier: "DeletePullRequestApprovalRuleOutput",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRepositoryInput" });
    case 1:
      return S.suspend(() => S.Struct({ repositoryId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "DeleteRepositoryOutput",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          destinationCommitSpecifier: S.String,
          sourceCommitSpecifier: S.String,
          mergeOption: S.String,
          maxMergeHunks: S.optional(S.Number),
          filePath: S.String,
          conflictDetailLevel: S.optional(S.String),
          conflictResolutionStrategy: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMergeConflictsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          conflictMetadata: __S(100, __c6, 4),
          mergeHunks: __S(82, __c5, 2),
          nextToken: S.optional(S.String),
          destinationCommitId: S.String,
          sourceCommitId: S.String,
          baseCommitId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMergeConflictsOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pullRequestId: S.String,
          pullRequestEventType: S.optional(S.String),
          actorArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePullRequestEventsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          sourceCommitId: S.optional(S.String),
          destinationCommitId: S.optional(S.String),
          mergeBase: S.optional(S.String),
        }),
      ).annotate({ identifier: "PullRequestCreatedEventMetadata" });
    case 2:
      return S.suspend(() => S.Struct({ pullRequestStatus: S.optional(S.String) })).annotate({
        identifier: "PullRequestStatusChangedEventMetadata",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          beforeCommitId: S.optional(S.String),
          afterCommitId: S.optional(S.String),
          mergeBase: S.optional(S.String),
        }),
      ).annotate({ identifier: "PullRequestSourceReferenceUpdatedEventMetadata" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          destinationReference: S.optional(S.String),
          mergeMetadata: S.optional(__S(304, __c19, 0)),
        }),
      ).annotate({ identifier: "PullRequestMergedStateChangedEventMetadata" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          approvalRuleName: S.optional(S.String),
          approvalRuleId: S.optional(S.String),
          approvalRuleContent: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApprovalRuleEventMetadata" });
    case 6:
      return S.suspend(() =>
        S.Struct({ revisionId: S.optional(S.String), approvalStatus: S.optional(S.String) }),
      ).annotate({ identifier: "ApprovalStateChangedEventMetadata" });
    case 7:
      return S.suspend(() =>
        S.Struct({ revisionId: S.optional(S.String), overrideStatus: S.optional(S.String) }),
      ).annotate({ identifier: "ApprovalRuleOverriddenEventMetadata" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          pullRequestId: S.optional(S.String),
          eventDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          pullRequestEventType: S.optional(S.String),
          actorArn: S.optional(S.String),
          pullRequestCreatedEventMetadata: S.optional(__S(641, __c40, 1)),
          pullRequestStatusChangedEventMetadata: S.optional(__S(642, __c40, 2)),
          pullRequestSourceReferenceUpdatedEventMetadata: S.optional(__S(643, __c40, 3)),
          pullRequestMergedStateChangedEventMetadata: S.optional(__S(644, __c40, 4)),
          approvalRuleEventMetadata: S.optional(__S(645, __c40, 5)),
          approvalStateChangedEventMetadata: S.optional(__S(646, __c40, 6)),
          approvalRuleOverriddenEventMetadata: S.optional(__S(647, __c40, 7)),
        }),
      ).annotate({ identifier: "PullRequestEvent" });
    case 9:
      return S.Array(__S(648, __c40, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ pullRequestEvents: __S(649, __c40, 9), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribePullRequestEventsOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ approvalRuleTemplateName: S.String, repositoryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateApprovalRuleTemplateFromRepositoryInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pullRequestId: S.String, revisionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EvaluatePullRequestApprovalRulesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          approved: S.optional(S.Boolean),
          overridden: S.optional(S.Boolean),
          approvalRulesSatisfied: S.optional(__S(48, __c3, 0)),
          approvalRulesNotSatisfied: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "Evaluation" });
    case 2:
      return S.suspend(() => S.Struct({ evaluation: __S(673, __c42, 1) }).pipe(ns)).annotate({
        identifier: "EvaluatePullRequestApprovalRulesOutput",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ approvalRuleTemplateName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApprovalRuleTemplateInput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, blobId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBlobInput" });
    case 1:
      return S.suspend(() => S.Struct({ content: T.Blob }).pipe(ns)).annotate({
        identifier: "GetBlobOutput",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          afterBlobId: S.String,
          beforeBlobId: S.optional(S.String),
          contextLines: S.optional(S.Number),
          ignoreWhitespace: S.optional(S.Boolean),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetBlobDifferencesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          beforeLineNumber: S.optional(S.Number),
          afterLineNumber: S.optional(S.Number),
          content: S.optional(S.String),
        }),
      ).annotate({ identifier: "DiffChange" });
    case 2:
      return S.Array(__S(721, __c45, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          beforeStartLine: S.optional(S.Number),
          beforeLineCount: S.optional(S.Number),
          afterStartLine: S.optional(S.Number),
          afterLineCount: S.optional(S.Number),
          changes: S.optional(__S(722, __c45, 2)),
        }),
      ).annotate({ identifier: "DiffHunk" });
    case 4:
      return S.Array(__S(723, __c45, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          hunks: __S(724, __c45, 4),
          isBinary: S.Boolean,
          beforeBlobSize: S.optional(S.Number),
          afterBlobSize: S.Number,
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetBlobDifferencesOutput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.optional(S.String), branchName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBranchInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ branch: S.optional(__S(512, __c32, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetBranchOutput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ commentId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCommentInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          commentId: S.String,
          reactionUserArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCommentReactionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          emoji: S.optional(S.String),
          shortCode: S.optional(S.String),
          unicode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReactionValueFormats" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          reaction: S.optional(__S(769, __c48, 1)),
          reactionUsers: S.optional(__S(48, __c3, 0)),
          reactionsFromDeletedUsersCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ReactionForComment" });
    case 3:
      return S.Array(__S(770, __c48, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ reactionsForComment: __S(771, __c48, 3), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "GetCommentReactionsOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          beforeCommitId: S.optional(S.String),
          afterCommitId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCommentsForComparedCommitInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          beforeCommitId: S.optional(S.String),
          afterCommitId: S.optional(S.String),
          beforeBlobId: S.optional(S.String),
          afterBlobId: S.optional(S.String),
          location: S.optional(__S(816, __c51, 0)),
          comments: S.optional(__S(800, __c50, 0)),
        }),
      ).annotate({ identifier: "CommentsForComparedCommit" });
    case 2:
      return S.Array(__S(785, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          commentsForComparedCommitData: S.optional(__S(786, __c49, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetCommentsForComparedCommitOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(545, __c34, 1));
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filePath: S.optional(S.String),
          filePosition: S.optional(S.Number),
          relativeFileVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Location" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pullRequestId: S.String,
          repositoryName: S.optional(S.String),
          beforeCommitId: S.optional(S.String),
          afterCommitId: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCommentsForPullRequestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pullRequestId: S.optional(S.String),
          repositoryName: S.optional(S.String),
          beforeCommitId: S.optional(S.String),
          afterCommitId: S.optional(S.String),
          beforeBlobId: S.optional(S.String),
          afterBlobId: S.optional(S.String),
          location: S.optional(__S(816, __c51, 0)),
          comments: S.optional(__S(800, __c50, 0)),
        }),
      ).annotate({ identifier: "CommentsForPullRequest" });
    case 2:
      return S.Array(__S(833, __c52, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          commentsForPullRequestData: S.optional(__S(834, __c52, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetCommentsForPullRequestOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, commitId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCommitInput" });
    case 1:
      return S.suspend(() => S.Struct({ commit: __S(145, __c9, 1) }).pipe(ns)).annotate({
        identifier: "GetCommitOutput",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          beforeCommitSpecifier: S.optional(S.String),
          afterCommitSpecifier: S.String,
          beforePath: S.optional(S.String),
          afterPath: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDifferencesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          blobId: S.optional(S.String),
          path: S.optional(S.String),
          mode: S.optional(S.String),
        }),
      ).annotate({ identifier: "BlobMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          beforeBlob: S.optional(__S(865, __c54, 1)),
          afterBlob: S.optional(__S(865, __c54, 1)),
          changeType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Difference" });
    case 3:
      return S.Array(__S(866, __c54, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          differences: S.optional(__S(867, __c54, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetDifferencesOutput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          commitSpecifier: S.optional(S.String),
          filePath: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetFileInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          commitId: S.String,
          blobId: S.String,
          filePath: S.String,
          fileMode: S.String,
          fileSize: S.Number,
          fileContent: T.Blob,
        }).pipe(ns),
      ).annotate({ identifier: "GetFileOutput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          commitSpecifier: S.optional(S.String),
          folderPath: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetFolderInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          treeId: S.optional(S.String),
          absolutePath: S.optional(S.String),
          relativePath: S.optional(S.String),
        }),
      ).annotate({ identifier: "Folder" });
    case 2:
      return S.Array(__S(897, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          blobId: S.optional(S.String),
          absolutePath: S.optional(S.String),
          relativePath: S.optional(S.String),
          fileMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "File" });
    case 4:
      return S.Array(__S(899, __c56, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          commitId: S.optional(S.String),
          absolutePath: S.optional(S.String),
          relativePath: S.optional(S.String),
        }),
      ).annotate({ identifier: "SubModule" });
    case 6:
      return S.Array(__S(901, __c56, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          commitId: S.String,
          folderPath: S.String,
          treeId: S.optional(S.String),
          subFolders: S.optional(__S(898, __c56, 2)),
          files: S.optional(__S(900, __c56, 4)),
          symbolicLinks: S.optional(__S(900, __c56, 4)),
          subModules: S.optional(__S(902, __c56, 6)),
        }).pipe(ns),
      ).annotate({ identifier: "GetFolderOutput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          sourceCommitSpecifier: S.String,
          destinationCommitSpecifier: S.String,
          conflictDetailLevel: S.optional(S.String),
          conflictResolutionStrategy: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetMergeCommitInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sourceCommitId: S.optional(S.String),
          destinationCommitId: S.optional(S.String),
          baseCommitId: S.optional(S.String),
          mergedCommitId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetMergeCommitOutput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          destinationCommitSpecifier: S.String,
          sourceCommitSpecifier: S.String,
          mergeOption: S.String,
          conflictDetailLevel: S.optional(S.String),
          maxConflictFiles: S.optional(S.Number),
          conflictResolutionStrategy: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetMergeConflictsInput" });
    case 1:
      return S.Array(__S(100, __c6, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          mergeable: S.Boolean,
          destinationCommitId: S.String,
          sourceCommitId: S.String,
          baseCommitId: S.optional(S.String),
          conflictMetadataList: __S(929, __c58, 1),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetMergeConflictsOutput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          sourceCommitSpecifier: S.String,
          destinationCommitSpecifier: S.String,
          conflictDetailLevel: S.optional(S.String),
          conflictResolutionStrategy: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetMergeOptionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          mergeOptions: __S(960, __c60, 0),
          sourceCommitId: S.String,
          destinationCommitId: S.String,
          baseCommitId: S.String,
        }).pipe(ns),
      ).annotate({ identifier: "GetMergeOptionsOutput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pullRequestId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPullRequestInput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pullRequestId: S.String, revisionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPullRequestApprovalStatesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ userArn: S.optional(S.String), approvalState: S.optional(S.String) }),
      ).annotate({ identifier: "Approval" });
    case 2:
      return S.Array(__S(993, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ approvals: S.optional(__S(994, __c62, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetPullRequestApprovalStatesOutput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pullRequestId: S.String, revisionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPullRequestOverrideStateInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ overridden: S.optional(S.Boolean), overrider: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "GetPullRequestOverrideStateOutput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRepositoryInput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRepositoryTriggersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          configurationId: S.optional(S.String),
          triggers: S.optional(__S(1057, __c66, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GetRepositoryTriggersOutput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          destinationArn: S.String,
          customData: S.optional(S.String),
          branches: S.optional(__S(48, __c3, 0)),
          events: __S(960, __c60, 0),
        }),
      ).annotate({ identifier: "RepositoryTrigger" });
    case 1:
      return S.Array(__S(1056, __c66, 0));
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApprovalRuleTemplatesInput" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          approvalRuleTemplateNames: S.optional(__S(48, __c3, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListApprovalRuleTemplatesOutput" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssociatedApprovalRuleTemplatesForRepositoryInput" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBranchesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ branches: S.optional(__S(48, __c3, 0)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListBranchesOutput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          commitSpecifier: S.optional(S.String),
          filePath: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFileCommitHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          commit: S.optional(__S(145, __c9, 1)),
          blobId: S.optional(S.String),
          path: S.optional(S.String),
          revisionChildren: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "FileVersion" });
    case 2:
      return S.Array(__S(1137, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ revisionDag: __S(1138, __c71, 2), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListFileCommitHistoryResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          authorArn: S.optional(S.String),
          pullRequestStatus: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPullRequestsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ pullRequestIds: __S(48, __c3, 0), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListPullRequestsOutput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          sortBy: S.optional(S.String),
          order: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRepositoriesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.optional(S.String), repositoryId: S.optional(S.String) }),
      ).annotate({ identifier: "RepositoryNameIdPair" });
    case 2:
      return S.Array(__S(1169, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          repositories: S.optional(__S(1170, __c73, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListRepositoriesOutput" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          approvalRuleTemplateName: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRepositoriesForApprovalRuleTemplateInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repositoryNames: S.optional(__S(48, __c3, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListRepositoriesForApprovalRuleTemplateOutput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, nextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tags: S.optional(__S(416, __c26, 0)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTagsForResourceOutput" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          sourceCommitSpecifier: S.String,
          destinationCommitSpecifier: S.String,
          targetBranch: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "MergeBranchesByFastForwardInput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          sourceCommitSpecifier: S.String,
          destinationCommitSpecifier: S.String,
          targetBranch: S.optional(S.String),
          conflictDetailLevel: S.optional(S.String),
          conflictResolutionStrategy: S.optional(S.String),
          authorName: S.optional(S.String),
          email: S.optional(S.String),
          commitMessage: S.optional(S.String),
          keepEmptyFolders: S.optional(S.Boolean),
          conflictResolution: S.optional(__S(466, __c29, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "MergeBranchesBySquashInput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          sourceCommitSpecifier: S.String,
          destinationCommitSpecifier: S.String,
          targetBranch: S.optional(S.String),
          conflictDetailLevel: S.optional(S.String),
          conflictResolutionStrategy: S.optional(S.String),
          authorName: S.optional(S.String),
          email: S.optional(S.String),
          commitMessage: S.optional(S.String),
          keepEmptyFolders: S.optional(S.Boolean),
          conflictResolution: S.optional(__S(466, __c29, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "MergeBranchesByThreeWayInput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pullRequestId: S.String,
          repositoryName: S.String,
          sourceCommitId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "MergePullRequestByFastForwardInput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pullRequest: S.optional(__S(323, __c20, 3)) }).pipe(ns),
      ).annotate({ identifier: "MergePullRequestByFastForwardOutput" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pullRequestId: S.String,
          repositoryName: S.String,
          sourceCommitId: S.optional(S.String),
          conflictDetailLevel: S.optional(S.String),
          conflictResolutionStrategy: S.optional(S.String),
          commitMessage: S.optional(S.String),
          authorName: S.optional(S.String),
          email: S.optional(S.String),
          keepEmptyFolders: S.optional(S.Boolean),
          conflictResolution: S.optional(__S(466, __c29, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "MergePullRequestBySquashInput" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pullRequestId: S.String,
          repositoryName: S.String,
          sourceCommitId: S.optional(S.String),
          conflictDetailLevel: S.optional(S.String),
          conflictResolutionStrategy: S.optional(S.String),
          commitMessage: S.optional(S.String),
          authorName: S.optional(S.String),
          email: S.optional(S.String),
          keepEmptyFolders: S.optional(S.Boolean),
          conflictResolution: S.optional(__S(466, __c29, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "MergePullRequestByThreeWayInput" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pullRequestId: S.String, revisionId: S.String, overrideStatus: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "OverridePullRequestApprovalRulesInput" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          beforeCommitId: S.optional(S.String),
          afterCommitId: S.String,
          location: S.optional(__S(816, __c51, 0)),
          content: S.String,
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PostCommentForComparedCommitInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          beforeCommitId: S.optional(S.String),
          afterCommitId: S.optional(S.String),
          beforeBlobId: S.optional(S.String),
          afterBlobId: S.optional(S.String),
          location: S.optional(__S(816, __c51, 0)),
          comment: S.optional(__S(545, __c34, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "PostCommentForComparedCommitOutput" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pullRequestId: S.String,
          repositoryName: S.String,
          beforeCommitId: S.String,
          afterCommitId: S.String,
          location: S.optional(__S(816, __c51, 0)),
          content: S.String,
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PostCommentForPullRequestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.optional(S.String),
          pullRequestId: S.optional(S.String),
          beforeCommitId: S.optional(S.String),
          afterCommitId: S.optional(S.String),
          beforeBlobId: S.optional(S.String),
          afterBlobId: S.optional(S.String),
          location: S.optional(__S(816, __c51, 0)),
          comment: S.optional(__S(545, __c34, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "PostCommentForPullRequestOutput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inReplyTo: S.String,
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          content: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PostCommentReplyInput" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ commentId: S.String, reactionValue: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutCommentReactionInput" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          repositoryName: S.String,
          branchName: S.String,
          fileContent: T.Blob,
          filePath: S.String,
          fileMode: S.optional(S.String),
          parentCommitId: S.optional(S.String),
          commitMessage: S.optional(S.String),
          name: S.optional(S.String),
          email: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutFileInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ commitId: S.String, blobId: S.String, treeId: S.String }).pipe(ns),
      ).annotate({ identifier: "PutFileOutput" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, triggers: __S(1057, __c66, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutRepositoryTriggersInput" });
    case 1:
      return S.suspend(() => S.Struct({ configurationId: S.optional(S.String) }).pipe(ns)).annotate(
        { identifier: "PutRepositoryTriggersOutput" },
      );
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(416, __c26, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, triggers: __S(1057, __c66, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TestRepositoryTriggersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ trigger: S.optional(S.String), failureMessage: S.optional(S.String) }),
      ).annotate({ identifier: "RepositoryTriggerExecutionFailure" });
    case 2:
      return S.Array(__S(1457, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          successfulExecutions: S.optional(__S(48, __c3, 0)),
          failedExecutions: S.optional(__S(1458, __c91, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "TestRepositoryTriggersOutput" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(48, __c3, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          approvalRuleTemplateName: S.String,
          newRuleContent: S.String,
          existingRuleContentSha256: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateApprovalRuleTemplateContentInput" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          approvalRuleTemplateName: S.String,
          approvalRuleTemplateDescription: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateApprovalRuleTemplateDescriptionInput" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          oldApprovalRuleTemplateName: S.String,
          newApprovalRuleTemplateName: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateApprovalRuleTemplateNameInput" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ commentId: S.String, content: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateCommentInput" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, defaultBranchName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDefaultBranchInput" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pullRequestId: S.String,
          approvalRuleName: S.String,
          existingRuleContentSha256: S.optional(S.String),
          newRuleContent: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePullRequestApprovalRuleContentInput" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pullRequestId: S.String, revisionId: S.String, approvalState: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePullRequestApprovalStateInput" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pullRequestId: S.String, description: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePullRequestDescriptionInput" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pullRequestId: S.String, pullRequestStatus: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePullRequestStatusInput" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pullRequestId: S.String, title: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePullRequestTitleInput" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, repositoryDescription: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRepositoryDescriptionInput" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ repositoryName: S.String, kmsKeyId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRepositoryEncryptionKeyInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repositoryId: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          originalKmsKeyId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateRepositoryEncryptionKeyOutput" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ oldName: S.String, newName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRepositoryNameInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
