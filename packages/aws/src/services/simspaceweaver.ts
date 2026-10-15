import * as API from "@distilled.cloud/core/api";
import * as __L from "@distilled.cloud/core/chunks";
import * as S from "@distilled.cloud/core/schema";
import * as HttpClient from "effect/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SimSpaceWeaver",
  serviceShapeName: "SimSpaceWeaver",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "simspaceweaver" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-10-28");
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
              `https://simspaceweaver-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://simspaceweaver-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://simspaceweaver.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://simspaceweaver.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SimSpaceWeaverResourceName = string;
export type BucketName = string;
export type ObjectKeyPrefix = string;
export interface S3Destination {
  BucketName: string;
  ObjectKeyPrefix?: string;
}
export interface CreateSnapshotInput {
  Simulation: string;
  Destination: S3Destination;
}
export interface CreateSnapshotOutput {}
export interface DeleteAppInput {
  Simulation: string;
  Domain: string;
  App: string;
}
export interface DeleteAppOutput {}
export interface DeleteSimulationInput {
  Simulation: string;
}
export interface DeleteSimulationOutput {}
export type SimSpaceWeaverLongResourceName = string;
export interface DescribeAppInput {
  Simulation: string;
  Domain: string;
  App: string;
}
export type SimulationAppStatus = string;
export type SimulationAppTargetStatus = string;
export type NonEmptyString = string;
export type LaunchCommandList = string[];
export interface LaunchOverrides {
  LaunchCommands?: string[];
}
export type Description = string;
export type PortNumber = number;
export interface SimulationAppPortMapping {
  Declared?: number;
  Actual?: number;
}
export type AppPortMappings = SimulationAppPortMapping[];
export interface SimulationAppEndpointInfo {
  Address?: string;
  IngressPortMappings?: SimulationAppPortMapping[];
}
export interface DescribeAppOutput {
  Name?: string;
  Simulation?: string;
  Domain?: string;
  Status?: string;
  TargetStatus?: string;
  LaunchOverrides?: LaunchOverrides;
  Description?: string;
  EndpointInfo?: SimulationAppEndpointInfo;
}
export interface DescribeSimulationInput {
  Simulation: string;
}
export type UUID = string;
export type SimSpaceWeaverArn = string;
export type RoleArn = string;
export type SimulationStatus = string;
export type SimulationTargetStatus = string;
export type ObjectKey = string;
export interface S3Location {
  BucketName: string;
  ObjectKey: string;
}
export type OptionalString = string;
export type LogGroupArn = string;
export interface CloudWatchLogsLogGroup {
  LogGroupArn?: string;
}
export interface LogDestination {
  CloudWatchLogsLogGroup?: CloudWatchLogsLogGroup;
}
export type LogDestinations = LogDestination[];
export interface LoggingConfiguration {
  Destinations?: LogDestination[];
}
export type LifecycleManagementStrategy = string;
export interface Domain {
  Name?: string;
  Lifecycle?: string;
}
export type DomainList = Domain[];
export type ClockStatus = string;
export type ClockTargetStatus = string;
export interface SimulationClock {
  Status?: string;
  TargetStatus?: string;
}
export type SimulationClockList = SimulationClock[];
export interface LiveSimulationState {
  Domains?: Domain[];
  Clocks?: SimulationClock[];
}
export type TimeToLiveString = string;
export interface DescribeSimulationOutput {
  Name?: string;
  ExecutionId?: string;
  Arn?: string;
  Description?: string;
  RoleArn?: string;
  CreationTime?: Date;
  Status?: string;
  TargetStatus?: string;
  SchemaS3Location?: S3Location;
  SchemaError?: string;
  LoggingConfiguration?: LoggingConfiguration;
  LiveSimulationState?: LiveSimulationState;
  MaximumDuration?: string;
  SnapshotS3Location?: S3Location;
  StartError?: string;
}
export type PositiveInteger = number;
export interface ListAppsInput {
  Simulation: string;
  Domain?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface SimulationAppMetadata {
  Name?: string;
  Simulation?: string;
  Domain?: string;
  Status?: string;
  TargetStatus?: string;
}
export type SimulationAppList = SimulationAppMetadata[];
export interface ListAppsOutput {
  Apps?: SimulationAppMetadata[];
  NextToken?: string;
}
export interface ListSimulationsInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface SimulationMetadata {
  Name?: string;
  Arn?: string;
  CreationTime?: Date;
  Status?: string;
  TargetStatus?: string;
}
export type SimulationList = SimulationMetadata[];
export interface ListSimulationsOutput {
  Simulations?: SimulationMetadata[];
  NextToken?: string;
}
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface ListTagsForResourceOutput {
  Tags?: { [key: string]: string | undefined };
}
export type ClientToken = string | redacted.Redacted<string>;
export interface StartAppInput {
  ClientToken?: string | redacted.Redacted<string>;
  Simulation: string;
  Domain: string;
  Name: string;
  Description?: string;
  LaunchOverrides?: LaunchOverrides;
}
export interface StartAppOutput {
  Name?: string;
  Domain?: string;
  Simulation?: string;
}
export interface StartClockInput {
  Simulation: string;
}
export interface StartClockOutput {}
export interface StartSimulationInput {
  ClientToken?: string | redacted.Redacted<string>;
  Name: string;
  Description?: string;
  RoleArn: string;
  SchemaS3Location?: S3Location;
  MaximumDuration?: string;
  Tags?: { [key: string]: string | undefined };
  SnapshotS3Location?: S3Location;
}
export interface StartSimulationOutput {
  Arn?: string;
  ExecutionId?: string;
  CreationTime?: Date;
}
export interface StopAppInput {
  Simulation: string;
  Domain: string;
  App: string;
}
export interface StopAppOutput {}
export interface StopClockInput {
  Simulation: string;
}
export interface StopClockOutput {}
export interface StopSimulationInput {
  Simulation: string;
}
export interface StopSimulationOutput {}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceOutput {}
export type CreateSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of the specified simulation.
 * A snapshot is a file that contains simulation state data at a specific time.
 * The state data saved in a snapshot includes entity data from the State Fabric,
 * the simulation configuration specified in the schema, and the clock tick number.
 * You can use the snapshot to initialize a new simulation.
 * For more information about snapshots, see Snapshots
 * in the *SimSpace Weaver User Guide*.
 *
 * You specify a `Destination` when you create a snapshot.
 * The `Destination` is the name of an Amazon S3 bucket and an optional
 * `ObjectKeyPrefix`. The `ObjectKeyPrefix` is
 * usually the name of a folder in the bucket. SimSpace Weaver creates a
 * `snapshot` folder inside the `Destination` and
 * places the snapshot file there.
 *
 * The snapshot file is an Amazon S3 object. It has an object key with the
 * form:
 * *object-key-prefix*\/snapshot/*simulation-name*-*YYMMdd*-*HHmm*-*ss*.zip, where:
 *
 * -
 * *YY*
 * is the 2-digit year
 *
 * -
 * *MM*
 * is the 2-digit month
 *
 * -
 * *dd*
 * is the 2-digit day of the month
 *
 * -
 * *HH*
 * is the 2-digit hour (24-hour clock)
 *
 * -
 * *mm*
 * is the 2-digit minutes
 *
 * -
 * *ss*
 * is the 2-digit seconds
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotInput,
  CreateSnapshotOutput,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(273, __c17, 1) as any as S.Schema<CreateSnapshotInput>,
  output: __S(288, __c18, 0) as any as S.Schema<CreateSnapshotOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
}));

export type DeleteAppError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the instance of the given custom app.
 */
export const deleteApp: API.OperationMethod<
  DeleteAppInput,
  DeleteAppOutput,
  DeleteAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<DeleteAppInput>,
  output: __S(288, __c18, 0) as any as S.Schema<DeleteAppOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApp",
}));

export type DeleteSimulationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes all SimSpace Weaver resources assigned to the given simulation.
 *
 * Your simulation uses resources in other Amazon Web Services. This API operation doesn't delete
 * resources in other Amazon Web Services.
 */
export const deleteSimulation: API.OperationMethod<
  DeleteSimulationInput,
  DeleteSimulationOutput,
  DeleteSimulationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<DeleteSimulationInput>,
  output: __S(288, __c18, 0) as any as S.Schema<DeleteSimulationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSimulation",
}));

export type DescribeAppError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the state of the given custom app.
 */
export const describeApp: API.OperationMethod<
  DescribeAppInput,
  DescribeAppOutput,
  DescribeAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DescribeAppInput>,
  output: __S(4, __c0, 4) as any as S.Schema<DescribeAppOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApp",
}));

export type DescribeSimulationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current state of the given simulation.
 */
export const describeSimulation: API.OperationMethod<
  DescribeSimulationInput,
  DescribeSimulationOutput,
  DescribeSimulationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DescribeSimulationInput>,
  output: __S(58, __c3, 10) as any as S.Schema<DescribeSimulationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSimulation",
}));

export type ListAppsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all custom apps or service apps for the given simulation and domain.
 */
export const listApps: API.PaginatedOperationMethod<
  ListAppsInput,
  ListAppsOutput,
  ListAppsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<ListAppsInput>,
  output: __S(83, __c5, 3) as any as S.Schema<ListAppsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSimulationsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the SimSpace Weaver simulations in the Amazon Web Services account used to make the API call.
 */
export const listSimulations: API.PaginatedOperationMethod<
  ListSimulationsInput,
  ListSimulationsOutput,
  ListSimulationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<ListSimulationsInput>,
  output: __S(99, __c6, 3) as any as S.Schema<ListSimulationsOutput>,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSimulations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags on a SimSpace Weaver resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(113, __c7, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartAppError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts a custom app with the configuration specified in the simulation schema.
 */
export const startApp: API.OperationMethod<
  StartAppInput,
  StartAppOutput,
  StartAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<StartAppInput>,
  output: __S(145, __c9, 1) as any as S.Schema<StartAppOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApp",
}));

export type StartClockError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts the simulation clock.
 */
export const startClock: API.OperationMethod<
  StartClockInput,
  StartClockOutput,
  StartClockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<StartClockInput>,
  output: __S(288, __c18, 0) as any as S.Schema<StartClockOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartClock",
}));

export type StartSimulationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts a simulation with the given name. You must choose to start your
 * simulation from a schema or from a snapshot.
 * For more information about the schema, see the schema reference
 * in the *SimSpace Weaver User Guide*.
 * For more information about snapshots, see Snapshots
 * in the *SimSpace Weaver User Guide*.
 */
export const startSimulation: API.OperationMethod<
  StartSimulationInput,
  StartSimulationOutput,
  StartSimulationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<StartSimulationInput>,
  output: __S(177, __c11, 1) as any as S.Schema<StartSimulationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSimulation",
}));

export type StopAppError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops the given custom app and shuts down all of its allocated compute resources.
 */
export const stopApp: API.OperationMethod<
  StopAppInput,
  StopAppOutput,
  StopAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<StopAppInput>,
  output: __S(288, __c18, 0) as any as S.Schema<StopAppOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopApp",
}));

export type StopClockError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops the simulation clock.
 */
export const stopClock: API.OperationMethod<
  StopClockInput,
  StopClockOutput,
  StopClockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<StopClockInput>,
  output: __S(288, __c18, 0) as any as S.Schema<StopClockOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopClock",
}));

export type StopSimulationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops the given simulation.
 *
 * You can't restart a simulation after you stop it. If you want to restart a simulation, then
 * you must stop it, delete it, and start a new instance of it.
 */
export const stopSimulation: API.OperationMethod<
  StopSimulationInput,
  StopSimulationOutput,
  StopSimulationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<StopSimulationInput>,
  output: __S(288, __c18, 0) as any as S.Schema<StopSimulationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSimulation",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to a SimSpace Weaver resource. For more information about tags, see Tagging Amazon Web Services resources in the
 * *Amazon Web Services General Reference*.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<TagResourceInput>,
  output: __S(288, __c18, 0) as any as S.Schema<TagResourceOutput>,
  errors: [ResourceNotFoundException, TooManyTagsException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Removes tags from a SimSpace Weaver resource. For more information about tags, see Tagging Amazon Web Services resources in the
 * *Amazon Web Services General Reference*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(288, __c18, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Simulation: S.String.pipe(T.HttpQuery("simulation")),
          Domain: S.String.pipe(T.HttpQuery("domain")),
          App: S.String.pipe(T.HttpQuery("app")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/describeapp" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "DescribeAppInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Declared: S.optional(S.Number), Actual: S.optional(S.Number) }),
      ).annotate({
        identifier: "SimulationAppPortMapping",
      });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Address: S.optional(S.String),
          IngressPortMappings: S.optional(__S(2, __c0, 2)),
        }),
      ).annotate({
        identifier: "SimulationAppEndpointInfo",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Simulation: S.optional(S.String),
          Domain: S.optional(S.String),
          Status: S.optional(S.String),
          TargetStatus: S.optional(S.String),
          LaunchOverrides: S.optional(__S(16, __c1, 0)),
          Description: S.optional(S.String),
          EndpointInfo: S.optional(__S(3, __c0, 3)),
        }),
      ).annotate({
        identifier: "DescribeAppOutput",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LaunchCommands: S.optional(__S(32, __c2, 0)) })).annotate({
        identifier: "LaunchOverrides",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Simulation: S.String.pipe(T.HttpQuery("simulation")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/describesimulation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "DescribeSimulationInput",
      });
    case 1:
      return S.suspend(() => S.Struct({ LogGroupArn: S.optional(S.String) })).annotate({
        identifier: "CloudWatchLogsLogGroup",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ CloudWatchLogsLogGroup: S.optional(__S(49, __c3, 1)) }),
      ).annotate({ identifier: "LogDestination" });
    case 3:
      return S.Array(__S(50, __c3, 2));
    case 4:
      return S.suspend(() => S.Struct({ Destinations: S.optional(__S(51, __c3, 3)) })).annotate({
        identifier: "LoggingConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Lifecycle: S.optional(S.String) }),
      ).annotate({ identifier: "Domain" });
    case 6:
      return S.Array(__S(53, __c3, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          TargetStatus: S.optional(S.String),
        }),
      ).annotate({
        identifier: "SimulationClock",
      });
    case 8:
      return S.Array(__S(55, __c3, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Domains: S.optional(__S(54, __c3, 6)),
          Clocks: S.optional(__S(56, __c3, 8)),
        }),
      ).annotate({
        identifier: "LiveSimulationState",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ExecutionId: S.optional(S.String),
          Arn: S.optional(S.String),
          Description: S.optional(S.String),
          RoleArn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          TargetStatus: S.optional(S.String),
          SchemaS3Location: S.optional(__S(64, __c4, 0)),
          SchemaError: S.optional(S.String),
          LoggingConfiguration: S.optional(__S(52, __c3, 4)),
          LiveSimulationState: S.optional(__S(57, __c3, 9)),
          MaximumDuration: S.optional(S.String),
          SnapshotS3Location: S.optional(__S(64, __c4, 0)),
          StartError: S.optional(S.String),
        }),
      ).annotate({
        identifier: "DescribeSimulationOutput",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ BucketName: S.String, ObjectKey: S.String })).annotate({
        identifier: "S3Location",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Simulation: S.String.pipe(T.HttpQuery("simulation")),
          Domain: S.optional(S.String).pipe(T.HttpQuery("domain")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/listapps" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAppsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Simulation: S.optional(S.String),
          Domain: S.optional(S.String),
          Status: S.optional(S.String),
          TargetStatus: S.optional(S.String),
        }),
      ).annotate({
        identifier: "SimulationAppMetadata",
      });
    case 2:
      return S.Array(__S(81, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Apps: S.optional(__S(82, __c5, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAppsOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/listsimulations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "ListSimulationsInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          TargetStatus: S.optional(S.String),
        }),
      ).annotate({
        identifier: "SimulationMetadata",
      });
    case 2:
      return S.Array(__S(97, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Simulations: S.optional(__S(98, __c6, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({
        identifier: "ListSimulationsOutput",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "ListTagsForResourceInput",
      });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(128, __c8, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          Simulation: S.String,
          Domain: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          LaunchOverrides: S.optional(__S(16, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/startapp" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartAppInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Domain: S.optional(S.String),
          Simulation: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartAppOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Simulation: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/startclock" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "StartClockInput",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          Name: S.String,
          Description: S.optional(S.String),
          RoleArn: S.String,
          SchemaS3Location: S.optional(__S(64, __c4, 0)),
          MaximumDuration: S.optional(S.String),
          Tags: S.optional(__S(128, __c8, 0)),
          SnapshotS3Location: S.optional(__S(64, __c4, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/startsimulation" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "StartSimulationInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ExecutionId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({
        identifier: "StartSimulationOutput",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Simulation: S.String, Domain: S.String, App: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/stopapp" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopAppInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Simulation: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/stopclock" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopClockInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Simulation: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/stopsimulation" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "StopSimulationInput",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(128, __c8, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "TagResourceInput",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(32, __c2, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "UntagResourceInput",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BucketName: S.String, ObjectKeyPrefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3Destination" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Simulation: S.String, Destination: __S(272, __c17, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/createsnapshot" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "CreateSnapshotInput",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CreateSnapshotOutput",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Simulation: S.String.pipe(T.HttpQuery("simulation")),
          Domain: S.String.pipe(T.HttpQuery("domain")),
          App: S.String.pipe(T.HttpQuery("app")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/deleteapp" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAppInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Simulation: S.String.pipe(T.HttpQuery("simulation")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/deletesimulation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "DeleteSimulationInput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
