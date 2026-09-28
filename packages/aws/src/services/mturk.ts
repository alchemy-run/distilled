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
  sdkId: "MTurk",
  target: "MTurkRequesterServiceV20170117",
  version: "2017-01-17",
  sigv4: "mturk-requester",
  protocol: awsJson1_1Protocol,
  xmlns: "http://requester.mturk.com/2017-01-17/",
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
                `https://mturk-requester-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://mturk-requester-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mturk-requester.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (Region === "sandbox") {
            return e("https://mturk-requester-sandbox.us-east-1.amazonaws.com");
          }
          return e(
            `https://mturk-requester.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class RequestError
  extends /*@__PURE__*/ TE.TaggedError("RequestError", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string; readonly TurkErrorCode?: string }> {}
export class ServiceFault
  extends /*@__PURE__*/ TE.TaggedError("ServiceFault", ["ServerError"], {
    status: 500,
  })<{ readonly message?: string; readonly TurkErrorCode?: string }> {}
export interface AcceptQualificationRequestRequest {
  QualificationRequestId: string;
  IntegerValue?: number;
}
export interface AcceptQualificationRequestResponse {}
export type EntityId = string;
export interface ApproveAssignmentRequest {
  AssignmentId: string;
  RequesterFeedback?: string;
  OverrideRejection?: boolean;
}
export interface ApproveAssignmentResponse {}
export type CustomerId = string;
export interface AssociateQualificationWithWorkerRequest {
  QualificationTypeId: string;
  WorkerId: string;
  IntegerValue?: number;
  SendNotification?: boolean;
}
export interface AssociateQualificationWithWorkerResponse {}
export type IdempotencyToken = string;
export interface CreateAdditionalAssignmentsForHITRequest {
  HITId: string;
  NumberOfAdditionalAssignments: number;
  UniqueRequestToken?: string;
}
export interface CreateAdditionalAssignmentsForHITResponse {}
export type CurrencyAmount = string;
export type Comparator =
  | "LessThan"
  | "LessThanOrEqualTo"
  | "GreaterThan"
  | "GreaterThanOrEqualTo"
  | "EqualTo"
  | "NotEqualTo"
  | "Exists"
  | "DoesNotExist"
  | "In"
  | "NotIn"
  | (string & {});
export type IntegerList = number[];
export type CountryParameters = string;
export interface Locale {
  Country: string;
  Subdivision?: string;
}
export type LocaleList = Locale[];
export type HITAccessActions =
  | "Accept"
  | "PreviewAndAccept"
  | "DiscoverPreviewAndAccept"
  | (string & {});
export interface QualificationRequirement {
  QualificationTypeId: string;
  Comparator: Comparator;
  IntegerValues?: number[];
  LocaleValues?: Locale[];
  RequiredToPreview?: boolean;
  ActionsGuarded?: HITAccessActions;
}
export type QualificationRequirementList = QualificationRequirement[];
export type StringList = string[];
export interface ParameterMapEntry {
  Key?: string;
  Values?: string[];
}
export type ParameterMapEntryList = ParameterMapEntry[];
export interface PolicyParameter {
  Key?: string;
  Values?: string[];
  MapEntries?: ParameterMapEntry[];
}
export type PolicyParameterList = PolicyParameter[];
export interface ReviewPolicy {
  PolicyName: string;
  Parameters?: PolicyParameter[];
}
export interface HITLayoutParameter {
  Name: string;
  Value: string;
}
export type HITLayoutParameterList = HITLayoutParameter[];
export interface CreateHITRequest {
  MaxAssignments?: number;
  AutoApprovalDelayInSeconds?: number;
  LifetimeInSeconds: number;
  AssignmentDurationInSeconds: number;
  Reward: string;
  Title: string;
  Keywords?: string;
  Description: string;
  Question?: string;
  RequesterAnnotation?: string;
  QualificationRequirements?: QualificationRequirement[];
  UniqueRequestToken?: string;
  AssignmentReviewPolicy?: ReviewPolicy;
  HITReviewPolicy?: ReviewPolicy;
  HITLayoutId?: string;
  HITLayoutParameters?: HITLayoutParameter[];
}
export type HITStatus =
  | "Assignable"
  | "Unassignable"
  | "Reviewable"
  | "Reviewing"
  | "Disposed"
  | (string & {});
export type HITReviewStatus =
  | "NotReviewed"
  | "MarkedForReview"
  | "ReviewedAppropriate"
  | "ReviewedInappropriate"
  | (string & {});
export interface HIT {
  HITId?: string;
  HITTypeId?: string;
  HITGroupId?: string;
  HITLayoutId?: string;
  CreationTime?: Date;
  Title?: string;
  Description?: string;
  Question?: string;
  Keywords?: string;
  HITStatus?: HITStatus;
  MaxAssignments?: number;
  Reward?: string;
  AutoApprovalDelayInSeconds?: number;
  Expiration?: Date;
  AssignmentDurationInSeconds?: number;
  RequesterAnnotation?: string;
  QualificationRequirements?: QualificationRequirement[];
  HITReviewStatus?: HITReviewStatus;
  NumberOfAssignmentsPending?: number;
  NumberOfAssignmentsAvailable?: number;
  NumberOfAssignmentsCompleted?: number;
}
export interface CreateHITResponse {
  HIT?: HIT;
}
export interface CreateHITTypeRequest {
  AutoApprovalDelayInSeconds?: number;
  AssignmentDurationInSeconds: number;
  Reward: string;
  Title: string;
  Keywords?: string;
  Description: string;
  QualificationRequirements?: QualificationRequirement[];
}
export interface CreateHITTypeResponse {
  HITTypeId?: string;
}
export interface CreateHITWithHITTypeRequest {
  HITTypeId: string;
  MaxAssignments?: number;
  LifetimeInSeconds: number;
  Question?: string;
  RequesterAnnotation?: string;
  UniqueRequestToken?: string;
  AssignmentReviewPolicy?: ReviewPolicy;
  HITReviewPolicy?: ReviewPolicy;
  HITLayoutId?: string;
  HITLayoutParameters?: HITLayoutParameter[];
}
export interface CreateHITWithHITTypeResponse {
  HIT?: HIT;
}
export type QualificationTypeStatus = "Active" | "Inactive" | (string & {});
export interface CreateQualificationTypeRequest {
  Name: string;
  Keywords?: string;
  Description: string;
  QualificationTypeStatus: QualificationTypeStatus;
  RetryDelayInSeconds?: number;
  Test?: string;
  AnswerKey?: string;
  TestDurationInSeconds?: number;
  AutoGranted?: boolean;
  AutoGrantedValue?: number;
}
export interface QualificationType {
  QualificationTypeId?: string;
  CreationTime?: Date;
  Name?: string;
  Description?: string;
  Keywords?: string;
  QualificationTypeStatus?: QualificationTypeStatus;
  Test?: string;
  TestDurationInSeconds?: number;
  AnswerKey?: string;
  RetryDelayInSeconds?: number;
  IsRequestable?: boolean;
  AutoGranted?: boolean;
  AutoGrantedValue?: number;
}
export interface CreateQualificationTypeResponse {
  QualificationType?: QualificationType;
}
export interface CreateWorkerBlockRequest {
  WorkerId: string;
  Reason: string;
}
export interface CreateWorkerBlockResponse {}
export interface DeleteHITRequest {
  HITId: string;
}
export interface DeleteHITResponse {}
export interface DeleteQualificationTypeRequest {
  QualificationTypeId: string;
}
export interface DeleteQualificationTypeResponse {}
export interface DeleteWorkerBlockRequest {
  WorkerId: string;
  Reason?: string;
}
export interface DeleteWorkerBlockResponse {}
export interface DisassociateQualificationFromWorkerRequest {
  WorkerId: string;
  QualificationTypeId: string;
  Reason?: string;
}
export interface DisassociateQualificationFromWorkerResponse {}
export interface GetAccountBalanceRequest {}
export interface GetAccountBalanceResponse {
  AvailableBalance?: string;
  OnHoldBalance?: string;
}
export interface GetAssignmentRequest {
  AssignmentId: string;
}
export type AssignmentStatus =
  | "Submitted"
  | "Approved"
  | "Rejected"
  | (string & {});
export interface Assignment {
  AssignmentId?: string;
  WorkerId?: string;
  HITId?: string;
  AssignmentStatus?: AssignmentStatus;
  AutoApprovalTime?: Date;
  AcceptTime?: Date;
  SubmitTime?: Date;
  ApprovalTime?: Date;
  RejectionTime?: Date;
  Deadline?: Date;
  Answer?: string;
  RequesterFeedback?: string;
}
export interface GetAssignmentResponse {
  Assignment?: Assignment;
  HIT?: HIT;
}
export interface GetFileUploadURLRequest {
  AssignmentId: string;
  QuestionIdentifier: string;
}
export interface GetFileUploadURLResponse {
  FileUploadURL?: string;
}
export interface GetHITRequest {
  HITId: string;
}
export interface GetHITResponse {
  HIT?: HIT;
}
export interface GetQualificationScoreRequest {
  QualificationTypeId: string;
  WorkerId: string;
}
export type QualificationStatus = "Granted" | "Revoked" | (string & {});
export interface Qualification {
  QualificationTypeId?: string;
  WorkerId?: string;
  GrantTime?: Date;
  IntegerValue?: number;
  LocaleValue?: Locale;
  Status?: QualificationStatus;
}
export interface GetQualificationScoreResponse {
  Qualification?: Qualification;
}
export interface GetQualificationTypeRequest {
  QualificationTypeId: string;
}
export interface GetQualificationTypeResponse {
  QualificationType?: QualificationType;
}
export type PaginationToken = string;
export type ResultSize = number;
export type AssignmentStatusList = AssignmentStatus[];
export interface ListAssignmentsForHITRequest {
  HITId: string;
  NextToken?: string;
  MaxResults?: number;
  AssignmentStatuses?: AssignmentStatus[];
}
export type AssignmentList = Assignment[];
export interface ListAssignmentsForHITResponse {
  NextToken?: string;
  NumResults?: number;
  Assignments?: Assignment[];
}
export interface ListBonusPaymentsRequest {
  HITId?: string;
  AssignmentId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface BonusPayment {
  WorkerId?: string;
  BonusAmount?: string;
  AssignmentId?: string;
  Reason?: string;
  GrantTime?: Date;
}
export type BonusPaymentList = BonusPayment[];
export interface ListBonusPaymentsResponse {
  NumResults?: number;
  NextToken?: string;
  BonusPayments?: BonusPayment[];
}
export interface ListHITsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type HITList = HIT[];
export interface ListHITsResponse {
  NextToken?: string;
  NumResults?: number;
  HITs?: HIT[];
}
export interface ListHITsForQualificationTypeRequest {
  QualificationTypeId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListHITsForQualificationTypeResponse {
  NextToken?: string;
  NumResults?: number;
  HITs?: HIT[];
}
export interface ListQualificationRequestsRequest {
  QualificationTypeId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface QualificationRequest {
  QualificationRequestId?: string;
  QualificationTypeId?: string;
  WorkerId?: string;
  Test?: string;
  Answer?: string;
  SubmitTime?: Date;
}
export type QualificationRequestList = QualificationRequest[];
export interface ListQualificationRequestsResponse {
  NumResults?: number;
  NextToken?: string;
  QualificationRequests?: QualificationRequest[];
}
export interface ListQualificationTypesRequest {
  Query?: string;
  MustBeRequestable: boolean;
  MustBeOwnedByCaller?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export type QualificationTypeList = QualificationType[];
export interface ListQualificationTypesResponse {
  NumResults?: number;
  NextToken?: string;
  QualificationTypes?: QualificationType[];
}
export type ReviewableHITStatus = "Reviewable" | "Reviewing" | (string & {});
export interface ListReviewableHITsRequest {
  HITTypeId?: string;
  Status?: ReviewableHITStatus;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListReviewableHITsResponse {
  NextToken?: string;
  NumResults?: number;
  HITs?: HIT[];
}
export type ReviewPolicyLevel = "Assignment" | "HIT" | (string & {});
export type ReviewPolicyLevelList = ReviewPolicyLevel[];
export interface ListReviewPolicyResultsForHITRequest {
  HITId: string;
  PolicyLevels?: ReviewPolicyLevel[];
  RetrieveActions?: boolean;
  RetrieveResults?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export interface ReviewResultDetail {
  ActionId?: string;
  SubjectId?: string;
  SubjectType?: string;
  QuestionId?: string;
  Key?: string;
  Value?: string;
}
export type ReviewResultDetailList = ReviewResultDetail[];
export type ReviewActionStatus =
  | "Intended"
  | "Succeeded"
  | "Failed"
  | "Cancelled"
  | (string & {});
export interface ReviewActionDetail {
  ActionId?: string;
  ActionName?: string;
  TargetId?: string;
  TargetType?: string;
  Status?: ReviewActionStatus;
  CompleteTime?: Date;
  Result?: string;
  ErrorCode?: string;
}
export type ReviewActionDetailList = ReviewActionDetail[];
export interface ReviewReport {
  ReviewResults?: ReviewResultDetail[];
  ReviewActions?: ReviewActionDetail[];
}
export interface ListReviewPolicyResultsForHITResponse {
  HITId?: string;
  AssignmentReviewPolicy?: ReviewPolicy;
  HITReviewPolicy?: ReviewPolicy;
  AssignmentReviewReport?: ReviewReport;
  HITReviewReport?: ReviewReport;
  NextToken?: string;
}
export interface ListWorkerBlocksRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface WorkerBlock {
  WorkerId?: string;
  Reason?: string;
}
export type WorkerBlockList = WorkerBlock[];
export interface ListWorkerBlocksResponse {
  NextToken?: string;
  NumResults?: number;
  WorkerBlocks?: WorkerBlock[];
}
export interface ListWorkersWithQualificationTypeRequest {
  QualificationTypeId: string;
  Status?: QualificationStatus;
  NextToken?: string;
  MaxResults?: number;
}
export type QualificationList = Qualification[];
export interface ListWorkersWithQualificationTypeResponse {
  NextToken?: string;
  NumResults?: number;
  Qualifications?: Qualification[];
}
export type CustomerIdList = string[];
export interface NotifyWorkersRequest {
  Subject: string;
  MessageText: string;
  WorkerIds: string[];
}
export type NotifyWorkersFailureCode =
  | "SoftFailure"
  | "HardFailure"
  | (string & {});
export interface NotifyWorkersFailureStatus {
  NotifyWorkersFailureCode?: NotifyWorkersFailureCode;
  NotifyWorkersFailureMessage?: string;
  WorkerId?: string;
}
export type NotifyWorkersFailureStatusList = NotifyWorkersFailureStatus[];
export interface NotifyWorkersResponse {
  NotifyWorkersFailureStatuses?: NotifyWorkersFailureStatus[];
}
export interface RejectAssignmentRequest {
  AssignmentId: string;
  RequesterFeedback: string;
}
export interface RejectAssignmentResponse {}
export interface RejectQualificationRequestRequest {
  QualificationRequestId: string;
  Reason?: string;
}
export interface RejectQualificationRequestResponse {}
export interface SendBonusRequest {
  WorkerId: string;
  BonusAmount: string;
  AssignmentId: string;
  Reason: string;
  UniqueRequestToken?: string;
}
export interface SendBonusResponse {}
export type NotificationTransport = "Email" | "SQS" | "SNS" | (string & {});
export type EventType =
  | "AssignmentAccepted"
  | "AssignmentAbandoned"
  | "AssignmentReturned"
  | "AssignmentSubmitted"
  | "AssignmentRejected"
  | "AssignmentApproved"
  | "HITCreated"
  | "HITExpired"
  | "HITReviewable"
  | "HITExtended"
  | "HITDisposed"
  | "Ping"
  | (string & {});
export type EventTypeList = EventType[];
export interface NotificationSpecification {
  Destination: string;
  Transport: NotificationTransport;
  Version: string;
  EventTypes: EventType[];
}
export interface SendTestEventNotificationRequest {
  Notification: NotificationSpecification;
  TestEventType: EventType;
}
export interface SendTestEventNotificationResponse {}
export interface UpdateExpirationForHITRequest {
  HITId: string;
  ExpireAt: Date;
}
export interface UpdateExpirationForHITResponse {}
export interface UpdateHITReviewStatusRequest {
  HITId: string;
  Revert?: boolean;
}
export interface UpdateHITReviewStatusResponse {}
export interface UpdateHITTypeOfHITRequest {
  HITId: string;
  HITTypeId: string;
}
export interface UpdateHITTypeOfHITResponse {}
export interface UpdateNotificationSettingsRequest {
  HITTypeId: string;
  Notification?: NotificationSpecification;
  Active?: boolean;
}
export interface UpdateNotificationSettingsResponse {}
export interface UpdateQualificationTypeRequest {
  QualificationTypeId: string;
  Description?: string;
  QualificationTypeStatus?: QualificationTypeStatus;
  Test?: string;
  AnswerKey?: string;
  TestDurationInSeconds?: number;
  RetryDelayInSeconds?: number;
  AutoGranted?: boolean;
  AutoGrantedValue?: number;
}
export interface UpdateQualificationTypeResponse {
  QualificationType?: QualificationType;
}
export type ExceptionMessage = string;
export type TurkErrorCode = string;
export type AcceptQualificationRequestError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `AcceptQualificationRequest` operation approves a Worker's request for a Qualification.
 *
 * Only the owner of the Qualification type can grant a Qualification request for that type.
 *
 * A successful request for the `AcceptQualificationRequest` operation
 * returns with no errors and an empty body.
 */
export const acceptQualificationRequest: API.OperationMethod<
  AcceptQualificationRequestRequest,
  AcceptQualificationRequestResponse,
  AcceptQualificationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { QualificationRequestId: 0, IntegerValue: 0 },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptQualificationRequest",
})) as any;

export type ApproveAssignmentError = RequestError | ServiceFault | CommonErrors;
/**
 * The `ApproveAssignment` operation approves the results of a completed assignment.
 *
 * Approving an assignment initiates two payments from the Requester's Amazon.com account
 *
 * - The Worker who submitted the results is paid the reward specified in the HIT.
 *
 * - Amazon Mechanical Turk fees are debited.
 *
 * If the Requester's account does not have adequate funds for these payments,
 * the call to ApproveAssignment returns an exception, and the approval is not processed.
 * You can include an optional feedback message with the approval,
 * which the Worker can see in the Status section of the web site.
 *
 * You can also call this operation for assignments that were previous rejected
 * and approve them by explicitly overriding the previous rejection.
 * This only works on rejected assignments that were submitted within the previous 30 days
 * and only if the assignment's related HIT has not been deleted.
 */
export const approveAssignment: API.OperationMethod<
  ApproveAssignmentRequest,
  ApproveAssignmentResponse,
  ApproveAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AssignmentId: 0, RequesterFeedback: 0, OverrideRejection: 0 },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApproveAssignment",
})) as any;

export type AssociateQualificationWithWorkerError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `AssociateQualificationWithWorker` operation gives a Worker a
 * Qualification. `AssociateQualificationWithWorker` does not require that the Worker
 * submit a Qualification request. It gives the Qualification directly to the Worker.
 *
 * You can only assign a Qualification of a Qualification type that you created (using
 * the `CreateQualificationType` operation).
 *
 * Note: `AssociateQualificationWithWorker` does not affect any pending Qualification
 * requests for the Qualification by the Worker. If you assign a Qualification to a
 * Worker, then later grant a Qualification request made by the Worker, the granting of
 * the request may modify the Qualification score. To resolve a pending Qualification
 * request without affecting the Qualification the Worker already has, reject the
 * request with the `RejectQualificationRequest` operation.
 */
export const associateQualificationWithWorker: API.OperationMethod<
  AssociateQualificationWithWorkerRequest,
  AssociateQualificationWithWorkerResponse,
  AssociateQualificationWithWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      QualificationTypeId: 0,
      WorkerId: 0,
      IntegerValue: 0,
      SendNotification: 0,
    },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateQualificationWithWorker",
})) as any;

export type CreateAdditionalAssignmentsForHITError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `CreateAdditionalAssignmentsForHIT`
 * operation increases the maximum number of assignments of an existing HIT.
 *
 * To extend the maximum number of assignments, specify the number of additional assignments.
 *
 * - HITs created with fewer than 10 assignments cannot be extended to have 10 or more assignments. Attempting to add assignments in a way that brings the total number of assignments for a HIT from fewer than 10 assignments to 10 or more
 * assignments will result in an
 * `AWS.MechanicalTurk.InvalidMaximumAssignmentsIncrease`
 * exception.
 *
 * - HITs that were created before July 22, 2015 cannot be extended. Attempting to extend HITs that were created before July 22, 2015 will result in an
 * `AWS.MechanicalTurk.HITTooOldForExtension`
 * exception.
 */
export const createAdditionalAssignmentsForHIT: API.OperationMethod<
  CreateAdditionalAssignmentsForHITRequest,
  CreateAdditionalAssignmentsForHITResponse,
  CreateAdditionalAssignmentsForHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HITId: 0,
      NumberOfAdditionalAssignments: 0,
      UniqueRequestToken: 0,
    },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAdditionalAssignmentsForHIT",
})) as any;

export type CreateHITError = RequestError | ServiceFault | CommonErrors;
/**
 * The `CreateHIT` operation creates a new Human Intelligence Task (HIT).
 * The new HIT is made available for Workers to find and accept on the Amazon Mechanical
 * Turk website.
 *
 * This operation allows you to specify a new HIT by passing in values for the properties of the HIT, such as its title, reward amount and number of assignments. When you pass these values to `CreateHIT`, a new HIT is created for you, with a new `HITTypeID`. The HITTypeID can be used to create additional HITs in the future without needing to specify common parameters such as the title, description and reward amount each time.
 *
 * An alternative way to create HITs is to first generate a HITTypeID using the `CreateHITType` operation and then call the `CreateHITWithHITType` operation. This is the recommended best practice for Requesters who are creating large numbers of HITs.
 *
 * CreateHIT also supports several ways to provide question data: by providing a value
 * for the `Question` parameter that fully specifies the contents of the HIT, or by providing
 * a `HitLayoutId` and associated `HitLayoutParameters`.
 *
 * If a HIT is created with 10 or more maximum assignments, there is an additional fee. For more information, see
 * Amazon Mechanical Turk Pricing.
 */
export const createHIT: API.OperationMethod<
  CreateHITRequest,
  CreateHITResponse,
  CreateHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxAssignments: 0,
      AutoApprovalDelayInSeconds: 0,
      LifetimeInSeconds: 0,
      AssignmentDurationInSeconds: 0,
      Reward: 0,
      Title: 0,
      Keywords: 0,
      Description: 0,
      Question: 0,
      RequesterAnnotation: 0,
      QualificationRequirements: D.list(i_QualificationRequirement),
      UniqueRequestToken: 0,
      AssignmentReviewPolicy: i_ReviewPolicy,
      HITReviewPolicy: i_ReviewPolicy,
      HITLayoutId: 0,
      HITLayoutParameters: D.list(i_HITLayoutParameter),
    },
    output: { HIT: o_HIT },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHIT",
})) as any;

export type CreateHITTypeError = RequestError | ServiceFault | CommonErrors;
/**
 * The `CreateHITType` operation creates a new HIT type. This operation
 * allows you to define a standard set of HIT properties to use when creating HITs.
 * If you register a HIT type with values that match an existing HIT type, the HIT type
 * ID of the existing type will be returned.
 */
export const createHITType: API.OperationMethod<
  CreateHITTypeRequest,
  CreateHITTypeResponse,
  CreateHITTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoApprovalDelayInSeconds: 0,
      AssignmentDurationInSeconds: 0,
      Reward: 0,
      Title: 0,
      Keywords: 0,
      Description: 0,
      QualificationRequirements: D.list(i_QualificationRequirement),
    },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHITType",
})) as any;

export type CreateHITWithHITTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `CreateHITWithHITType` operation creates a new Human Intelligence Task (HIT)
 * using an existing HITTypeID generated by the `CreateHITType` operation.
 *
 * This is an alternative way to create HITs from the `CreateHIT` operation.
 * This is the recommended best practice for Requesters who are creating large numbers of HITs.
 *
 * CreateHITWithHITType also supports several ways to provide question data:
 * by providing a value for the `Question` parameter that fully specifies the contents of the HIT,
 * or by providing a `HitLayoutId` and associated `HitLayoutParameters`.
 *
 * If a HIT is created with 10 or more maximum assignments, there is an additional fee.
 * For more information, see Amazon Mechanical Turk Pricing.
 */
export const createHITWithHITType: API.OperationMethod<
  CreateHITWithHITTypeRequest,
  CreateHITWithHITTypeResponse,
  CreateHITWithHITTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HITTypeId: 0,
      MaxAssignments: 0,
      LifetimeInSeconds: 0,
      Question: 0,
      RequesterAnnotation: 0,
      UniqueRequestToken: 0,
      AssignmentReviewPolicy: i_ReviewPolicy,
      HITReviewPolicy: i_ReviewPolicy,
      HITLayoutId: 0,
      HITLayoutParameters: D.list(i_HITLayoutParameter),
    },
    output: { HIT: o_HIT },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHITWithHITType",
})) as any;

export type CreateQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `CreateQualificationType`
 * operation creates a new Qualification type, which is represented by a
 * `QualificationType`
 * data structure.
 */
export const createQualificationType: API.OperationMethod<
  CreateQualificationTypeRequest,
  CreateQualificationTypeResponse,
  CreateQualificationTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Keywords: 0,
      Description: 0,
      QualificationTypeStatus: 0,
      RetryDelayInSeconds: 0,
      Test: 0,
      AnswerKey: 0,
      TestDurationInSeconds: 0,
      AutoGranted: 0,
      AutoGrantedValue: 0,
    },
    output: { QualificationType: o_QualificationType },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQualificationType",
})) as any;

export type CreateWorkerBlockError = RequestError | ServiceFault | CommonErrors;
/**
 * The `CreateWorkerBlock` operation allows you to prevent a Worker from working on your HITs. For example, you can block a Worker who is producing poor quality work. You can block up to 100,000 Workers.
 */
export const createWorkerBlock: API.OperationMethod<
  CreateWorkerBlockRequest,
  CreateWorkerBlockResponse,
  CreateWorkerBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkerId: 0, Reason: 0 } },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkerBlock",
})) as any;

export type DeleteHITError = RequestError | ServiceFault | CommonErrors;
/**
 * The `DeleteHIT` operation is used to delete HIT that is no longer needed.
 * Only the Requester who created the HIT can delete it.
 *
 * You can only dispose of HITs that are in the `Reviewable` state,
 * with all of their submitted assignments already either approved or rejected.
 * If you call the DeleteHIT operation on a HIT that is not in the `Reviewable` state
 * (for example, that has not expired, or still has active assignments),
 * or on a HIT that is Reviewable but without all of its submitted assignments
 * already approved or rejected, the service will return an error.
 *
 * - HITs are automatically disposed of after 120 days.
 *
 * - After you dispose of a HIT, you can no longer approve the HIT's rejected assignments.
 *
 * - Disposed HITs are not returned in results for the ListHITs operation.
 *
 * - Disposing HITs can improve the performance of operations such as ListReviewableHITs and ListHITs.
 */
export const deleteHIT: API.OperationMethod<
  DeleteHITRequest,
  DeleteHITResponse,
  DeleteHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HITId: 0 } },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHIT",
})) as any;

export type DeleteQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `DeleteQualificationType`
 * deletes a Qualification type and deletes any HIT types that are
 * associated with the Qualification type.
 *
 * This operation does not revoke Qualifications already assigned
 * to Workers because the Qualifications might be needed for active HITs.
 * If there are any pending requests for the Qualification type, Amazon
 * Mechanical Turk rejects those requests. After you delete a
 * Qualification type, you can no longer use it to create HITs or HIT
 * types.
 *
 * DeleteQualificationType must wait for all the HITs that use
 * the deleted Qualification type to be deleted before completing. It
 * may take up to 48 hours before DeleteQualificationType completes and
 * the unique name of the Qualification type is available for reuse with
 * CreateQualificationType.
 */
export const deleteQualificationType: API.OperationMethod<
  DeleteQualificationTypeRequest,
  DeleteQualificationTypeResponse,
  DeleteQualificationTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { QualificationTypeId: 0 } },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQualificationType",
})) as any;

export type DeleteWorkerBlockError = RequestError | ServiceFault | CommonErrors;
/**
 * The `DeleteWorkerBlock` operation allows you to reinstate a blocked Worker to work on your HITs. This operation reverses the effects of the CreateWorkerBlock operation. You need the Worker ID to use this operation. If the Worker ID is missing or invalid, this operation fails and returns the message “WorkerId is invalid.” If the specified Worker is not blocked, this operation returns successfully.
 */
export const deleteWorkerBlock: API.OperationMethod<
  DeleteWorkerBlockRequest,
  DeleteWorkerBlockResponse,
  DeleteWorkerBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkerId: 0, Reason: 0 } },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkerBlock",
})) as any;

export type DisassociateQualificationFromWorkerError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `DisassociateQualificationFromWorker`
 * revokes a previously granted Qualification from a user.
 *
 * You can provide a text message explaining why the Qualification was
 * revoked. The user who had the Qualification can see this message.
 */
export const disassociateQualificationFromWorker: API.OperationMethod<
  DisassociateQualificationFromWorkerRequest,
  DisassociateQualificationFromWorkerResponse,
  DisassociateQualificationFromWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkerId: 0, QualificationTypeId: 0, Reason: 0 },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateQualificationFromWorker",
})) as any;

export type GetAccountBalanceError = RequestError | ServiceFault | CommonErrors;
/**
 * The `GetAccountBalance` operation retrieves the Prepaid HITs balance in your Amazon Mechanical Turk account if you are a Prepaid Requester.
 * Alternatively, this operation will retrieve the remaining available AWS Billing usage if you have enabled AWS Billing.
 * Note: If you have enabled AWS Billing and still have a remaining Prepaid HITs balance, this balance can be viewed on the My Account page in the Requester console.
 */
export const getAccountBalance: API.OperationMethod<
  GetAccountBalanceRequest,
  GetAccountBalanceResponse,
  GetAccountBalanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountBalance",
})) as any;

export type GetAssignmentError = RequestError | ServiceFault | CommonErrors;
/**
 * The `GetAssignment` operation retrieves the details of the specified Assignment.
 */
export const getAssignment: API.OperationMethod<
  GetAssignmentRequest,
  GetAssignmentResponse,
  GetAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AssignmentId: 0 },
    output: { Assignment: o_Assignment, HIT: o_HIT },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssignment",
})) as any;

export type GetFileUploadURLError = RequestError | ServiceFault | CommonErrors;
/**
 * The
 * `GetFileUploadURL`
 * operation generates and returns a temporary URL. You use the
 * temporary URL to retrieve a file uploaded by a Worker as an answer to
 * a FileUploadAnswer question for a HIT. The temporary URL is generated
 * the instant the GetFileUploadURL operation is called, and is valid
 * for 60 seconds. You can get a temporary file upload URL any time
 * until the HIT is disposed. After the HIT is disposed, any uploaded
 * files are deleted, and cannot be retrieved.
 *
 * Pending Deprecation on December 12, 2017. The Answer Specification
 * structure will no longer support the `FileUploadAnswer`
 * element to be used for the QuestionForm data structure.
 * Instead, we recommend that Requesters who want to create HITs asking
 * Workers to upload files to use Amazon S3.
 */
export const getFileUploadURL: API.OperationMethod<
  GetFileUploadURLRequest,
  GetFileUploadURLResponse,
  GetFileUploadURLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AssignmentId: 0, QuestionIdentifier: 0 },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFileUploadURL",
})) as any;

export type GetHITError = RequestError | ServiceFault | CommonErrors;
/**
 * The `GetHIT` operation retrieves the details of the specified HIT.
 */
export const getHIT: API.OperationMethod<
  GetHITRequest,
  GetHITResponse,
  GetHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HITId: 0 }, output: { HIT: o_HIT } },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHIT",
})) as any;

export type GetQualificationScoreError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `GetQualificationScore`
 * operation returns the value of a Worker's Qualification for a given
 * Qualification type.
 *
 * To get a Worker's Qualification, you must know the Worker's ID. The
 * Worker's ID is included in the assignment data returned by the
 * `ListAssignmentsForHIT`
 * operation.
 *
 * Only the owner of a Qualification type can query the value of
 * a Worker's Qualification of that type.
 */
export const getQualificationScore: API.OperationMethod<
  GetQualificationScoreRequest,
  GetQualificationScoreResponse,
  GetQualificationScoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { QualificationTypeId: 0, WorkerId: 0 },
    output: { Qualification: o_Qualification },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQualificationScore",
})) as any;

export type GetQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `GetQualificationType`operation retrieves information about a Qualification type using its ID.
 */
export const getQualificationType: API.OperationMethod<
  GetQualificationTypeRequest,
  GetQualificationTypeResponse,
  GetQualificationTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { QualificationTypeId: 0 },
    output: { QualificationType: o_QualificationType },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQualificationType",
})) as any;

export type ListAssignmentsForHITError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `ListAssignmentsForHIT`
 * operation retrieves completed assignments for a HIT. You can use this
 * operation to retrieve the results for a HIT.
 *
 * You can get assignments for a HIT at any time, even if the
 * HIT is not yet Reviewable. If a HIT requested multiple assignments,
 * and has received some results but has not yet become Reviewable, you
 * can still retrieve the partial results with this operation.
 *
 * Use the AssignmentStatus parameter to control which set of
 * assignments for a HIT are returned. The ListAssignmentsForHIT
 * operation
 * can return submitted assignments awaiting approval, or it can return
 * assignments that have already been approved or rejected. You can set
 * AssignmentStatus=Approved,Rejected to get assignments that have
 * already been approved and rejected together in one result set.
 *
 * Only the Requester who created the HIT can retrieve the
 * assignments for that HIT.
 *
 * Results are sorted and divided into numbered pages and the
 * operation returns a single page of results. You can use the
 * parameters
 * of the operation to control sorting and pagination.
 */
export const listAssignmentsForHIT: API.PaginatedOperationMethod<
  ListAssignmentsForHITRequest,
  ListAssignmentsForHITResponse,
  ListAssignmentsForHITError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { HITId: 0, NextToken: 0, MaxResults: 0, AssignmentStatuses: 0 },
    output: { Assignments: D.list(o_Assignment) },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssignmentsForHIT",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBonusPaymentsError = RequestError | ServiceFault | CommonErrors;
/**
 * The
 * `ListBonusPayments`
 * operation retrieves the amounts of bonuses you have paid to Workers
 * for a given HIT or assignment.
 */
export const listBonusPayments: API.PaginatedOperationMethod<
  ListBonusPaymentsRequest,
  ListBonusPaymentsResponse,
  ListBonusPaymentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { HITId: 0, AssignmentId: 0, NextToken: 0, MaxResults: 0 },
    output: { BonusPayments: D.list({ GrantTime: D.ts }) },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBonusPayments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHITsError = RequestError | ServiceFault | CommonErrors;
/**
 * The
 * `ListHITs`
 * operation returns all of a Requester's HITs. The operation returns
 * HITs of any status, except for HITs that have been deleted of with
 * the DeleteHIT operation or that have been auto-deleted.
 */
export const listHITs: API.PaginatedOperationMethod<
  ListHITsRequest,
  ListHITsResponse,
  ListHITsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { HITs: D.list(o_HIT) },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHITs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHITsForQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `ListHITsForQualificationType` operation returns the HITs that use
 * the given Qualification type for a Qualification requirement.
 * The operation returns HITs of any status, except for HITs that have been deleted
 * with the `DeleteHIT` operation or that have been auto-deleted.
 */
export const listHITsForQualificationType: API.PaginatedOperationMethod<
  ListHITsForQualificationTypeRequest,
  ListHITsForQualificationTypeResponse,
  ListHITsForQualificationTypeError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { QualificationTypeId: 0, NextToken: 0, MaxResults: 0 },
    output: { HITs: D.list(o_HIT) },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHITsForQualificationType",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQualificationRequestsError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `ListQualificationRequests`
 * operation retrieves requests for Qualifications of a particular
 * Qualification type. The owner of the Qualification type calls this
 * operation to poll for pending requests, and accepts them using the
 * AcceptQualification operation.
 */
export const listQualificationRequests: API.PaginatedOperationMethod<
  ListQualificationRequestsRequest,
  ListQualificationRequestsResponse,
  ListQualificationRequestsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { QualificationTypeId: 0, NextToken: 0, MaxResults: 0 },
    output: { QualificationRequests: D.list({ SubmitTime: D.ts }) },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQualificationRequests",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQualificationTypesError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `ListQualificationTypes`
 * operation returns a list of Qualification types, filtered by
 * an optional search term.
 */
export const listQualificationTypes: API.PaginatedOperationMethod<
  ListQualificationTypesRequest,
  ListQualificationTypesResponse,
  ListQualificationTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Query: 0,
      MustBeRequestable: 0,
      MustBeOwnedByCaller: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { QualificationTypes: D.list(o_QualificationType) },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQualificationTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReviewableHITsError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `ListReviewableHITs` operation retrieves the HITs with Status equal to
 * Reviewable or Status equal to Reviewing that belong to the Requester calling the operation.
 */
export const listReviewableHITs: API.PaginatedOperationMethod<
  ListReviewableHITsRequest,
  ListReviewableHITsResponse,
  ListReviewableHITsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { HITTypeId: 0, Status: 0, NextToken: 0, MaxResults: 0 },
    output: { HITs: D.list(o_HIT) },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReviewableHITs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReviewPolicyResultsForHITError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `ListReviewPolicyResultsForHIT` operation retrieves the computed results
 * and the actions taken in the course of executing your Review Policies for a given HIT.
 * For information about how to specify Review Policies when you call CreateHIT,
 * see Review Policies. The ListReviewPolicyResultsForHIT operation can return results for both
 * Assignment-level and HIT-level review results.
 */
export const listReviewPolicyResultsForHIT: API.PaginatedOperationMethod<
  ListReviewPolicyResultsForHITRequest,
  ListReviewPolicyResultsForHITResponse,
  ListReviewPolicyResultsForHITError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      HITId: 0,
      PolicyLevels: 0,
      RetrieveActions: 0,
      RetrieveResults: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      AssignmentReviewReport: o_ReviewReport,
      HITReviewReport: o_ReviewReport,
    },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReviewPolicyResultsForHIT",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkerBlocksError = RequestError | ServiceFault | CommonErrors;
/**
 * The `ListWorkersBlocks` operation retrieves a list of Workers who are blocked from working on your HITs.
 */
export const listWorkerBlocks: API.PaginatedOperationMethod<
  ListWorkerBlocksRequest,
  ListWorkerBlocksResponse,
  ListWorkerBlocksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkerBlocks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkersWithQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `ListWorkersWithQualificationType` operation returns all of the Workers
 * that have been associated with a given Qualification type.
 */
export const listWorkersWithQualificationType: API.PaginatedOperationMethod<
  ListWorkersWithQualificationTypeRequest,
  ListWorkersWithQualificationTypeResponse,
  ListWorkersWithQualificationTypeError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { QualificationTypeId: 0, Status: 0, NextToken: 0, MaxResults: 0 },
    output: { Qualifications: D.list(o_Qualification) },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkersWithQualificationType",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type NotifyWorkersError = RequestError | ServiceFault | CommonErrors;
/**
 * The
 * `NotifyWorkers`
 * operation sends an email to one or more Workers that you specify with
 * the Worker ID. You can specify up to 100 Worker IDs to send the same
 * message with a single call to the NotifyWorkers operation. The
 * NotifyWorkers operation will send a notification email to a Worker
 * only if you have previously approved or rejected work from the
 * Worker.
 */
export const notifyWorkers: API.OperationMethod<
  NotifyWorkersRequest,
  NotifyWorkersResponse,
  NotifyWorkersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Subject: 0, MessageText: 0, WorkerIds: 0 },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyWorkers",
})) as any;

export type RejectAssignmentError = RequestError | ServiceFault | CommonErrors;
/**
 * The `RejectAssignment` operation rejects the results of a completed assignment.
 *
 * You can include an optional feedback message with the rejection,
 * which the Worker can see in the Status section of the web site.
 * When you include a feedback message with the rejection,
 * it helps the Worker understand why the assignment was rejected,
 * and can improve the quality of the results the Worker submits in the future.
 *
 * Only the Requester who created the HIT can reject an assignment for the HIT.
 */
export const rejectAssignment: API.OperationMethod<
  RejectAssignmentRequest,
  RejectAssignmentResponse,
  RejectAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AssignmentId: 0, RequesterFeedback: 0 },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectAssignment",
})) as any;

export type RejectQualificationRequestError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `RejectQualificationRequest`
 * operation rejects a user's request for a Qualification.
 *
 * You can provide a text message explaining why the request was
 * rejected. The Worker who made the request can see this message.
 */
export const rejectQualificationRequest: API.OperationMethod<
  RejectQualificationRequestRequest,
  RejectQualificationRequestResponse,
  RejectQualificationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { QualificationRequestId: 0, Reason: 0 } },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectQualificationRequest",
})) as any;

export type SendBonusError = RequestError | ServiceFault | CommonErrors;
/**
 * The
 * `SendBonus`
 * operation issues a payment of money from your account to a Worker.
 * This payment happens separately from the reward you pay to the Worker
 * when you approve the Worker's assignment. The SendBonus operation
 * requires the Worker's ID and the assignment ID as parameters to
 * initiate payment of the bonus. You must include a message that
 * explains the reason for the bonus payment, as the Worker may not be
 * expecting the payment. Amazon Mechanical Turk collects a fee for
 * bonus payments, similar to the HIT listing fee. This operation fails
 * if your account does not have enough funds to pay for both the bonus
 * and the fees.
 */
export const sendBonus: API.OperationMethod<
  SendBonusRequest,
  SendBonusResponse,
  SendBonusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkerId: 0,
      BonusAmount: 0,
      AssignmentId: 0,
      Reason: 0,
      UniqueRequestToken: 0,
    },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendBonus",
})) as any;

export type SendTestEventNotificationError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `SendTestEventNotification` operation causes Amazon Mechanical Turk to send
 * a notification message as if a HIT event occurred, according to the provided
 * notification specification. This allows you to test notifications without
 * setting up notifications for a real HIT type and trying to trigger them using the website.
 * When you call this operation, the service attempts to send the test notification immediately.
 */
export const sendTestEventNotification: API.OperationMethod<
  SendTestEventNotificationRequest,
  SendTestEventNotificationResponse,
  SendTestEventNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Notification: i_NotificationSpecification, TestEventType: 0 },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendTestEventNotification",
})) as any;

export type UpdateExpirationForHITError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `UpdateExpirationForHIT` operation allows you update the expiration time of a HIT.
 * If you update it to a time in the past, the HIT will be immediately expired.
 */
export const updateExpirationForHIT: API.OperationMethod<
  UpdateExpirationForHITRequest,
  UpdateExpirationForHITResponse,
  UpdateExpirationForHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HITId: 0, ExpireAt: 0 } },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExpirationForHIT",
})) as any;

export type UpdateHITReviewStatusError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `UpdateHITReviewStatus` operation updates the status of a HIT.
 * If the status is Reviewable, this operation can update the status to Reviewing,
 * or it can revert a Reviewing HIT back to the Reviewable status.
 */
export const updateHITReviewStatus: API.OperationMethod<
  UpdateHITReviewStatusRequest,
  UpdateHITReviewStatusResponse,
  UpdateHITReviewStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HITId: 0, Revert: 0 } },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHITReviewStatus",
})) as any;

export type UpdateHITTypeOfHITError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `UpdateHITTypeOfHIT`
 * operation allows you to change the HITType properties of a HIT. This
 * operation disassociates the HIT from its old HITType properties and
 * associates it with the new HITType properties. The HIT takes on the
 * properties of the new HITType in place of the old ones.
 */
export const updateHITTypeOfHIT: API.OperationMethod<
  UpdateHITTypeOfHITRequest,
  UpdateHITTypeOfHITResponse,
  UpdateHITTypeOfHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HITId: 0, HITTypeId: 0 } },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHITTypeOfHIT",
})) as any;

export type UpdateNotificationSettingsError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `UpdateNotificationSettings` operation creates, updates,
 * disables or re-enables notifications for a HIT type.
 * If you call the UpdateNotificationSettings operation for a HIT type that already has a
 * notification specification, the operation replaces the old specification with a new one.
 * You can call the UpdateNotificationSettings operation to enable or disable notifications
 * for the HIT type, without having to modify the notification specification itself by providing
 * updates to the Active status without specifying a new notification specification.
 * To change the Active status of a HIT type's notifications,
 * the HIT type must already have a notification specification,
 * or one must be provided in the same call to `UpdateNotificationSettings`.
 */
export const updateNotificationSettings: API.OperationMethod<
  UpdateNotificationSettingsRequest,
  UpdateNotificationSettingsResponse,
  UpdateNotificationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HITTypeId: 0,
      Notification: i_NotificationSpecification,
      Active: 0,
    },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotificationSettings",
})) as any;

export type UpdateQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `UpdateQualificationType`
 * operation modifies the attributes of an existing Qualification type,
 * which is represented by a QualificationType data structure. Only the
 * owner of a Qualification type can modify its attributes.
 *
 * Most attributes of a Qualification type can be changed after
 * the type has been created. However, the Name and Keywords fields
 * cannot be modified. The RetryDelayInSeconds parameter can be modified
 * or added to change the delay or to enable retries, but
 * RetryDelayInSeconds cannot be used to disable retries.
 *
 * You can use this operation to update the test for a
 * Qualification type. The test is updated based on the values specified
 * for the Test, TestDurationInSeconds and AnswerKey parameters. All
 * three parameters specify the updated test. If you are updating the
 * test for a type, you must specify the Test and TestDurationInSeconds
 * parameters. The AnswerKey parameter is optional; omitting it specifies
 * that the updated test does not have an answer key.
 *
 * If you omit the Test parameter, the test for the
 * Qualification type is unchanged. There is no way to remove a test from
 * a Qualification type that has one. If the type already has a test, you
 * cannot update it to be AutoGranted. If the Qualification type does not
 * have a test and one is provided by an update, the type will henceforth
 * have a test.
 *
 * If you want to update the test duration or answer key for an
 * existing test without changing the questions, you must specify a Test
 * parameter with the original questions, along with the updated values.
 *
 * If you provide an updated Test but no AnswerKey, the new test
 * will not have an answer key. Requests for such Qualifications must be
 * granted manually.
 *
 * You can also update the AutoGranted and AutoGrantedValue
 * attributes of the Qualification type.
 */
export const updateQualificationType: API.OperationMethod<
  UpdateQualificationTypeRequest,
  UpdateQualificationTypeResponse,
  UpdateQualificationTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      QualificationTypeId: 0,
      Description: 0,
      QualificationTypeStatus: 0,
      Test: 0,
      AnswerKey: 0,
      TestDurationInSeconds: 0,
      RetryDelayInSeconds: 0,
      AutoGranted: 0,
      AutoGrantedValue: 0,
    },
    output: { QualificationType: o_QualificationType },
  },
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQualificationType",
})) as any;

const i_HITLayoutParameter: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_NotificationSpecification: D.LazyStruct = () => ({
  Destination: 0,
  Transport: 0,
  Version: 0,
  EventTypes: 0,
});
const i_QualificationRequirement: D.LazyStruct = () => ({
  QualificationTypeId: 0,
  Comparator: 0,
  IntegerValues: 0,
  LocaleValues: D.list({ Country: 0, Subdivision: 0 }),
  RequiredToPreview: 0,
  ActionsGuarded: 0,
});
const i_ReviewPolicy: D.LazyStruct = () => ({
  PolicyName: 0,
  Parameters: D.list({
    Key: 0,
    Values: 0,
    MapEntries: D.list({ Key: 0, Values: 0 }),
  }),
});
const o_Assignment: D.LazyStruct = () => ({
  AutoApprovalTime: D.ts,
  AcceptTime: D.ts,
  SubmitTime: D.ts,
  ApprovalTime: D.ts,
  RejectionTime: D.ts,
  Deadline: D.ts,
});
const o_HIT: D.LazyStruct = () => ({ CreationTime: D.ts, Expiration: D.ts });
const o_Qualification: D.LazyStruct = () => ({ GrantTime: D.ts });
const o_QualificationType: D.LazyStruct = () => ({ CreationTime: D.ts });
const o_ReviewReport: D.LazyStruct = () => ({
  ReviewActions: D.list({ CompleteTime: D.ts }),
});
