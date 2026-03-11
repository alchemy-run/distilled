import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1CreateAProjectInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  db_pass: Schema.String,
  name: Schema.String,
  organization_id: Schema.optional(Schema.String),
  organization_slug: Schema.String,
  plan: Schema.optional(Schema.Literals(["free", "pro"])),
  region: Schema.optional(
    Schema.Literals([
      "us-east-1",
      "us-east-2",
      "us-west-1",
      "us-west-2",
      "ap-east-1",
      "ap-southeast-1",
      "ap-northeast-1",
      "ap-northeast-2",
      "ap-southeast-2",
      "eu-west-1",
      "eu-west-2",
      "eu-west-3",
      "eu-north-1",
      "eu-central-1",
      "eu-central-2",
      "ca-central-1",
      "ap-south-1",
      "sa-east-1",
    ]),
  ),
  region_selection: Schema.optional(Schema.Unknown),
  kps_enabled: Schema.optional(Schema.Boolean),
  desired_instance_size: Schema.optional(
    Schema.Literals([
      "nano",
      "micro",
      "small",
      "medium",
      "large",
      "xlarge",
      "2xlarge",
      "4xlarge",
      "8xlarge",
      "12xlarge",
      "16xlarge",
      "24xlarge",
      "24xlarge_optimized_memory",
      "24xlarge_optimized_cpu",
      "24xlarge_high_memory",
      "48xlarge",
      "48xlarge_optimized_memory",
      "48xlarge_optimized_cpu",
      "48xlarge_high_memory",
    ]),
  ),
  template_url: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/v1/projects" }));
export type V1CreateAProjectInput = typeof V1CreateAProjectInput.Type;

// Output Schema
export const V1CreateAProjectOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    ref: Schema.String,
    organization_id: Schema.String,
    organization_slug: Schema.String,
    name: Schema.String,
    region: Schema.String,
    created_at: Schema.String,
    status: Schema.Literals([
      "INACTIVE",
      "ACTIVE_HEALTHY",
      "ACTIVE_UNHEALTHY",
      "COMING_UP",
      "UNKNOWN",
      "GOING_DOWN",
      "INIT_FAILED",
      "REMOVED",
      "RESTORING",
      "UPGRADING",
      "PAUSING",
      "RESTORE_FAILED",
      "RESTARTING",
      "PAUSE_FAILED",
      "RESIZING",
    ]),
  },
);
export type V1CreateAProjectOutput = typeof V1CreateAProjectOutput.Type;

// The operation
/**
 * Create a project
 */
export const v1CreateAProject = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1CreateAProjectInput,
  outputSchema: V1CreateAProjectOutput,
}));
