import { expect, test } from "bun:test";
import type {
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
