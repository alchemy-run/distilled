/**
 * CloudFront Service Tests
 *
 * IMPORTANT: These tests require a real AWS account.
 * CloudFront is NOT available in LocalStack Community edition.
 * Tests will skip when running in LocalStack.
 */

import { expect } from "@effect/vitest";
import { Effect } from "effect";
import {
  createDistribution,
  createInvalidation,
  createOriginAccessControl,
  deleteDistribution,
  deleteOriginAccessControl,
  getDistribution,
  getDistributionConfig,
  getOriginAccessControl,
  listDistributions,
  listInvalidations,
  listOriginAccessControls,
  listTagsForResource,
  tagResource,
  untagResource,
  updateOriginAccessControl,
} from "../../src/services/cloudfront.ts";
import { test } from "../test.ts";

// Skip tests in LocalStack - CloudFront not available in Community edition
const isLocalStack = process.env.LOCAL === "true" || process.env.LOCAL === "1";

// Helper to ensure cleanup happens even on failure
const withOriginAccessControl = <A, E, R>(
  name: string,
  testFn: (id: string, etag: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    const result = yield* createOriginAccessControl({
      OriginAccessControlConfig: {
        Name: name,
        Description: "Test OAC for itty-aws",
        SigningProtocol: "sigv4",
        SigningBehavior: "always",
        OriginAccessControlOriginType: "s3",
      },
    });
    const id = result.OriginAccessControl!.Id!;
    const etag = result.ETag!;
    return yield* testFn(id, etag).pipe(
      Effect.ensuring(
        deleteOriginAccessControl({ Id: id, IfMatch: etag }).pipe(
          // Need to get latest ETag for deletion
          Effect.catchAll(() =>
            getOriginAccessControl({ Id: id }).pipe(
              Effect.flatMap((r) =>
                deleteOriginAccessControl({ Id: id, IfMatch: r.ETag! }),
              ),
              Effect.ignore,
            ),
          ),
        ),
      ),
    );
  });

// Helper for distribution cleanup with proper ETag handling
const withDistribution = <A, E, R>(
  callerReference: string,
  testFn: (id: string, etag: string, arn: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    // Create a minimal distribution with a custom origin
    const result = yield* createDistribution({
      DistributionConfig: {
        CallerReference: callerReference,
        Comment: "itty-aws test distribution",
        Enabled: false, // Disabled for testing
        Origins: {
          Quantity: 1,
          Items: [
            {
              Id: "test-origin",
              DomainName: "example.com",
              CustomOriginConfig: {
                HTTPPort: 80,
                HTTPSPort: 443,
                OriginProtocolPolicy: "https-only",
              },
            },
          ],
        },
        DefaultCacheBehavior: {
          TargetOriginId: "test-origin",
          ViewerProtocolPolicy: "redirect-to-https",
          CachePolicyId: "658327ea-f89d-4fab-a63d-7e88639e58f6", // CachingOptimized managed policy
        },
      },
    });

    const id = result.Distribution!.Id!;
    const etag = result.ETag!;
    const arn = result.Distribution!.ARN!;

    return yield* testFn(id, etag, arn).pipe(
      Effect.ensuring(
        // Get latest ETag before deletion
        getDistribution({ Id: id }).pipe(
          Effect.flatMap((r) =>
            deleteDistribution({ Id: id, IfMatch: r.ETag! }),
          ),
          Effect.ignore,
        ),
      ),
    );
  });

// ============================================================================
// Origin Access Control Tests
// ============================================================================

test(
  "create origin access control, get, list, and delete",
  Effect.gen(function* () {
    if (isLocalStack) {
      yield* Effect.logInfo(
        "Skipping test: CloudFront not available in LocalStack",
      );
      return;
    }

    yield* withOriginAccessControl("itty-cf-oac-lifecycle", (id, _etag) =>
      Effect.gen(function* () {
        // Get origin access control to verify it exists
        const oac = yield* getOriginAccessControl({ Id: id });
        expect(oac.OriginAccessControl?.Id).toEqual(id);
        expect(
          oac.OriginAccessControl?.OriginAccessControlConfig?.Name,
        ).toEqual("itty-cf-oac-lifecycle");

        // List origin access controls
        const listResult = yield* listOriginAccessControls({});
        const foundOac = listResult.OriginAccessControlList?.Items?.find(
          (o) => o.Id === id,
        );
        expect(foundOac).toBeDefined();
      }),
    );
  }),
);

test(
  "update origin access control",
  Effect.gen(function* () {
    if (isLocalStack) {
      yield* Effect.logInfo(
        "Skipping test: CloudFront not available in LocalStack",
      );
      return;
    }

    yield* withOriginAccessControl("itty-cf-oac-update", (id, etag) =>
      Effect.gen(function* () {
        // Update the OAC
        const updateResult = yield* updateOriginAccessControl({
          Id: id,
          IfMatch: etag,
          OriginAccessControlConfig: {
            Name: "itty-cf-oac-updated",
            Description: "Updated description",
            SigningProtocol: "sigv4",
            SigningBehavior: "always",
            OriginAccessControlOriginType: "s3",
          },
        });

        expect(
          updateResult.OriginAccessControl?.OriginAccessControlConfig?.Name,
        ).toEqual("itty-cf-oac-updated");
        expect(
          updateResult.OriginAccessControl?.OriginAccessControlConfig
            ?.Description,
        ).toEqual("Updated description");

        // Verify by getting it again
        const getResult = yield* getOriginAccessControl({ Id: id });
        expect(
          getResult.OriginAccessControl?.OriginAccessControlConfig?.Name,
        ).toEqual("itty-cf-oac-updated");
      }),
    );
  }),
);

// ============================================================================
// Distribution Tests
// ============================================================================

test(
  "create distribution, get, list, and delete",
  Effect.gen(function* () {
    if (isLocalStack) {
      yield* Effect.logInfo(
        "Skipping test: CloudFront not available in LocalStack",
      );
      return;
    }

    yield* withDistribution("itty-cf-dist-lifecycle", (id, _etag, _arn) =>
      Effect.gen(function* () {
        // Get distribution to verify it exists
        const dist = yield* getDistribution({ Id: id });
        expect(dist.Distribution?.Id).toEqual(id);
        expect(dist.Distribution?.DistributionConfig?.Comment).toEqual(
          "itty-aws test distribution",
        );

        // Get distribution config
        const config = yield* getDistributionConfig({ Id: id });
        expect(config.DistributionConfig?.Enabled).toBe(false);

        // List distributions
        const listResult = yield* listDistributions({});
        const foundDist = listResult.DistributionList?.Items?.find(
          (d) => d.Id === id,
        );
        expect(foundDist).toBeDefined();
      }),
    );
  }),
);

// ============================================================================
// Invalidation Tests
// ============================================================================

test(
  "create invalidation and list invalidations",
  Effect.gen(function* () {
    if (isLocalStack) {
      yield* Effect.logInfo(
        "Skipping test: CloudFront not available in LocalStack",
      );
      return;
    }

    yield* withDistribution("itty-cf-invalidation", (id, _etag, _arn) =>
      Effect.gen(function* () {
        // Create an invalidation
        const invalidation = yield* createInvalidation({
          DistributionId: id,
          InvalidationBatch: {
            CallerReference: "itty-cf-invalidation-batch",
            Paths: {
              Quantity: 1,
              Items: ["/*"],
            },
          },
        });

        expect(invalidation.Invalidation?.Id).toBeDefined();
        expect(invalidation.Invalidation?.Status).toBeDefined();

        // List invalidations
        const listResult = yield* listInvalidations({
          DistributionId: id,
        });

        const foundInvalidation = listResult.InvalidationList?.Items?.find(
          (i) => i.Id === invalidation.Invalidation!.Id,
        );
        expect(foundInvalidation).toBeDefined();
      }),
    );
  }),
);

// ============================================================================
// Tagging Tests
// ============================================================================

test(
  "tag and untag distribution",
  Effect.gen(function* () {
    if (isLocalStack) {
      yield* Effect.logInfo(
        "Skipping test: CloudFront not available in LocalStack",
      );
      return;
    }

    yield* withDistribution("itty-cf-tagging", (_id, _etag, arn) =>
      Effect.gen(function* () {
        // Add tags
        yield* tagResource({
          Resource: arn,
          Tags: {
            Items: [
              { Key: "Environment", Value: "Test" },
              { Key: "Project", Value: "itty-aws" },
            ],
          },
        });

        // List tags
        const tags = yield* listTagsForResource({ Resource: arn });
        expect(tags.Tags?.Items?.length).toBeGreaterThanOrEqual(2);

        const envTag = tags.Tags?.Items?.find((t) => t.Key === "Environment");
        expect(envTag?.Value).toEqual("Test");

        // Remove a tag
        yield* untagResource({
          Resource: arn,
          TagKeys: {
            Items: ["Environment"],
          },
        });

        // Verify tag removed
        const tagsAfter = yield* listTagsForResource({ Resource: arn });
        const envTagAfter = tagsAfter.Tags?.Items?.find(
          (t) => t.Key === "Environment",
        );
        expect(envTagAfter).toBeUndefined();

        // Project tag should still exist
        const projectTag = tagsAfter.Tags?.Items?.find(
          (t) => t.Key === "Project",
        );
        expect(projectTag?.Value).toEqual("itty-aws");
      }),
    );
  }),
);
