import { expect, test } from "bun:test";
import type * as Redacted from "effect/Redacted";
import type {
  GetNeonAuthEmailProviderResponse,
  NeonAuthEmailServerConfig,
  NeonAuthEmailServerConfigResponse,
  SharedEmailServer,
  StandardEmailServer,
  StandardEmailServerResponse,
  UpdateNeonAuthEmailProviderRequest,
  UpdateNeonAuthEmailProviderResponse,
  CreateProjectBranchFunctionDeploymentRequest,
  DeleteProjectBranchRequest,
  NeonFunction,
  NeonFunctionDeployment,
  Trigger,
  TriggerCreateRequest,
  TriggerUpdateRequest,
} from "./services/neon.ts";

type Assert<T extends true> = T;
type HardDeleteBoolean = Assert<
  DeleteProjectBranchRequest["hard_delete"] extends boolean | undefined
    ? true
    : false
>;
type HardDeleteOptional = Assert<
  {} extends Pick<DeleteProjectBranchRequest, "hard_delete"> ? true : false
>;
type Zip = NonNullable<CreateProjectBranchFunctionDeploymentRequest["zip"]>;
type BinaryInput = Assert<Uint8Array extends Zip ? true : false>;
type FileInput = Assert<File extends Zip ? true : false>;
type RejectTextZip = Assert<string extends Zip ? false : true>;
type Schedule = Extract<TriggerCreateRequest, { type: "schedule" }>;
type Storage = Extract<
  TriggerCreateRequest,
  { type: "storage_object_created" }
>;
type ScheduleConfigRequired = Assert<
  Schedule extends { schedule: { cron: string } } ? true : false
>;
type StorageConfigRequired = Assert<
  Storage extends { storage_object_created: { bucket_name: string } }
    ? true
    : false
>;
type UpdateDiscriminatorRequired = Assert<
  TriggerUpdateRequest extends { type: "schedule" | "storage_object_created" }
    ? true
    : false
>;

type ServiceFreeSchemas = Assert<
  [
    | (typeof NeonFunction)["DecodingServices"]
    | (typeof NeonFunctionDeployment)["DecodingServices"]
    | (typeof Trigger)["DecodingServices"]
    | (typeof TriggerCreateRequest)["DecodingServices"]
    | (typeof TriggerUpdateRequest)["DecodingServices"]
    | (typeof NeonFunction)["EncodingServices"],
  ] extends [never]
    ? true
    : false
>;

type StandardEmail = Extract<NeonAuthEmailServerConfig, { type: "standard" }>;
type SharedEmail = Extract<NeonAuthEmailServerConfig, { type: "shared" }>;
type StandardEmailResponse = Extract<
  NeonAuthEmailServerConfigResponse,
  { type: "standard" }
>;
type EmailDiscriminators = Assert<
  [
    NeonAuthEmailServerConfig["type"],
    NeonAuthEmailServerConfigResponse["type"],
  ] extends ["standard" | "shared", "standard" | "shared"]
    ? true
    : false
>;
type StandardEmailExtract = Assert<
  StandardEmailServer extends StandardEmail ? true : false
>;
type SharedEmailExtract = Assert<
  SharedEmailServer extends SharedEmail ? true : false
>;
type StandardEmailResponseExtract = Assert<
  StandardEmailServerResponse extends StandardEmailResponse ? true : false
>;
type PartialStandardEmail = Assert<
  { type: "standard" } extends StandardEmail ? true : false
>;
type PartialSharedEmail = Assert<
  { type: "shared" } extends SharedEmail ? true : false
>;
type EmailDiscriminatorRequired = Assert<
  {} extends NeonAuthEmailServerConfig ? false : true
>;
type RejectEmailDiscriminator = Assert<
  { type: "unsupported" } extends NeonAuthEmailServerConfig ? false : true
>;
type RejectPartialStandardResponse = Assert<
  { type: "standard" } extends NeonAuthEmailServerConfigResponse ? false : true
>;
type SmtpPasswordInput = Assert<
  Redacted.Redacted<string> extends StandardEmail["password"] ? true : false
>;
type SmtpPasswordResponse = Assert<
  StandardEmailResponse["password"] extends string | Redacted.Redacted<string>
    ? true
    : false
>;
type RejectNumericSmtpPassword = Assert<
  Redacted.Redacted<number> extends StandardEmail["password"] ? false : true
>;
type ServiceFreeEmailSchemas = Assert<
  [
    | (typeof NeonAuthEmailServerConfig)["DecodingServices"]
    | (typeof NeonAuthEmailServerConfig)["EncodingServices"]
    | (typeof NeonAuthEmailServerConfigResponse)["DecodingServices"]
    | (typeof NeonAuthEmailServerConfigResponse)["EncodingServices"]
    | (typeof GetNeonAuthEmailProviderResponse)["DecodingServices"]
    | (typeof GetNeonAuthEmailProviderResponse)["EncodingServices"]
    | (typeof UpdateNeonAuthEmailProviderRequest)["DecodingServices"]
    | (typeof UpdateNeonAuthEmailProviderRequest)["EncodingServices"]
    | (typeof UpdateNeonAuthEmailProviderResponse)["DecodingServices"]
    | (typeof UpdateNeonAuthEmailProviderResponse)["EncodingServices"],
  ] extends [never]
    ? true
    : false
>;

const emailAssertions: [
  EmailDiscriminators,
  StandardEmailExtract,
  SharedEmailExtract,
  StandardEmailResponseExtract,
  PartialStandardEmail,
  PartialSharedEmail,
  EmailDiscriminatorRequired,
  RejectEmailDiscriminator,
  RejectPartialStandardResponse,
  SmtpPasswordInput,
  SmtpPasswordResponse,
  RejectNumericSmtpPassword,
  ServiceFreeEmailSchemas,
] = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
];

test("email discriminator and sensitive codec assertions are included in the checked Neon project", () => {
  expect(emailAssertions.every(Boolean)).toBe(true);
});

const assertions: [
  BinaryInput,
  FileInput,
  RejectTextZip,
  ScheduleConfigRequired,
  StorageConfigRequired,
  UpdateDiscriminatorRequired,
  ServiceFreeSchemas,
  HardDeleteBoolean,
  HardDeleteOptional,
] = [true, true, true, true, true, true, true, true, true];

test("binary and discriminated trigger type assertions are included in the checked Neon project", () => {
  expect(assertions.every(Boolean)).toBe(true);
});
