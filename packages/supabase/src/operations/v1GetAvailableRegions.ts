import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetAvailableRegionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organization_slug: Schema.String,
    continent: Schema.optional(
      Schema.Literals(["NA", "SA", "EU", "AF", "AS", "OC", "AN"]),
    ),
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
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/available-regions" }));
export type V1GetAvailableRegionsInput = typeof V1GetAvailableRegionsInput.Type;

// Output Schema
export const V1GetAvailableRegionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    recommendations: Schema.Struct({
      smartGroup: Schema.Struct({
        name: Schema.String,
        code: Schema.Literals(["americas", "emea", "apac"]),
        type: Schema.Literals(["smartGroup"]),
      }),
      specific: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          code: Schema.Literals([
            "us-east-1",
            "us-east-2",
            "us-west-1",
            "us-west-2",
            "ap-southeast-1",
            "ap-northeast-1",
            "ap-northeast-2",
            "ap-east-1",
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
          type: Schema.Literals(["specific"]),
          provider: Schema.Literals(["AWS", "FLY", "AWS_K8S", "AWS_NIMBUS"]),
          status: Schema.optional(Schema.Literals(["capacity", "other"])),
        }),
      ),
    }),
    all: Schema.Struct({
      smartGroup: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          code: Schema.Literals(["americas", "emea", "apac"]),
          type: Schema.Literals(["smartGroup"]),
        }),
      ),
      specific: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          code: Schema.Literals([
            "us-east-1",
            "us-east-2",
            "us-west-1",
            "us-west-2",
            "ap-southeast-1",
            "ap-northeast-1",
            "ap-northeast-2",
            "ap-east-1",
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
          type: Schema.Literals(["specific"]),
          provider: Schema.Literals(["AWS", "FLY", "AWS_K8S", "AWS_NIMBUS"]),
          status: Schema.optional(Schema.Literals(["capacity", "other"])),
        }),
      ),
    }),
  });
export type V1GetAvailableRegionsOutput =
  typeof V1GetAvailableRegionsOutput.Type;

// The operation
/**
 * [Beta] Gets the list of available regions that can be used for a new project
 *
 * @param organization_slug - Slug of your organization
 * @param continent - Continent code to determine regional recommendations: NA (North America), SA (South America), EU (Europe), AF (Africa), AS (Asia), OC (Oceania), AN (Antarctica)
 * @param desired_instance_size - Desired instance size. Omit this field to always default to the smallest possible size.
 */
export const v1GetAvailableRegions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetAvailableRegionsInput,
    outputSchema: V1GetAvailableRegionsOutput,
  }),
);
