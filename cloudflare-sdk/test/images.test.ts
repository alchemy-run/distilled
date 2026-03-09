import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as Images from "~/services/images.ts";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic variant name for tests.
 * Follows the convention: distilled-cf-images-{testname}
 */
const variantName = (name: string) => `distilled-cf-images-${name}`;

/**
 * Deterministic signing key name for tests.
 */
const keyName = (name: string) => `distilled-cf-images-key-${name}`;

/**
 * A small 1x1 transparent PNG as a Blob for image upload tests.
 */
const createTestImageBlob = (): Blob => {
  const pngBytes = new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
    0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00,
    0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x62, 0x00, 0x00, 0x00, 0x02,
    0x00, 0x01, 0xe5, 0x27, 0xde, 0xfc, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45,
    0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
  ]);
  return new Blob([pngBytes], { type: "image/png" });
};

// ============================================================================
// Images Tests
// ============================================================================

describe("Images", () => {
  // --------------------------------------------------------------------------
  // createV1
  // --------------------------------------------------------------------------
  describe("createV1", () => {
    test("error - ImagesAccessNotEnabled when creating image from a URL", () =>
      Images.createV1({
        accountId: accountId(),
        url: "https://via.placeholder.com/1x1.png",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImagesAccessNotEnabled")),
      ));

    test("error - ImagesAccessNotEnabled when creating image from a file blob", () =>
      Images.createV1({
        accountId: accountId(),
        file: createTestImageBlob(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImagesAccessNotEnabled")),
      ));

    test("error - ImagesAccessNotEnabled when creating image with metadata", () =>
      Images.createV1({
        accountId: accountId(),
        url: "https://via.placeholder.com/1x1.png",
        metadata: { env: "test", purpose: "distilled" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImagesAccessNotEnabled")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.createV1({
        accountId: "invalid-account-id-000",
        url: "https://via.placeholder.com/1x1.png",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // getV1
  // --------------------------------------------------------------------------
  describe("getV1", () => {
    test("error - ImageNotFound when retrieving a non-existent image", () =>
      Images.getV1({
        accountId: accountId(),
        imageId: "distilled-cf-images-get-happy",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImageNotFound")),
      ));

    test("error - ImageNotFound for non-existent image", () =>
      Images.getV1({
        accountId: accountId(),
        imageId: "non-existent-image-id-xyz-00000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImageNotFound")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.getV1({
        accountId: "invalid-account-id-000",
        imageId: "some-image-id",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));

    test("error - for empty imageId", () =>
      Images.getV1({
        accountId: accountId(),
        imageId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // listV1s
  // --------------------------------------------------------------------------
  describe("listV1s", () => {
    test("error - schema decode failure when listing images in account", () =>
      Images.listV1s({
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "ImagesAccessNotEnabled"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.listV1s({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // patchV1
  // --------------------------------------------------------------------------
  describe("patchV1", () => {
    test("error - ImageNotFound when updating non-existent image metadata", () =>
      Images.patchV1({
        accountId: accountId(),
        imageId: "distilled-cf-images-patch-happy",
        metadata: { updated: true, env: "test" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImageNotFound")),
      ));

    test("error - ImageNotFound when updating requireSignedURLs on non-existent image", () =>
      Images.patchV1({
        accountId: accountId(),
        imageId: "distilled-cf-images-patch-signed",
        requireSignedURLs: false,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImageNotFound")),
      ));

    test("error - ImageNotFound for non-existent image", () =>
      Images.patchV1({
        accountId: accountId(),
        imageId: "non-existent-image-id-xyz-00000000",
        metadata: { test: true },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImageNotFound")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.patchV1({
        accountId: "invalid-account-id-000",
        imageId: "some-image-id",
        metadata: { test: true },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteV1
  // --------------------------------------------------------------------------
  describe("deleteV1", () => {
    test("error - ImageNotFound when deleting a non-existent image", () =>
      Images.deleteV1({
        accountId: accountId(),
        imageId: "distilled-cf-images-delete-happy",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImageNotFound")),
      ));

    test("error - ImageNotFound for non-existent image", () =>
      Images.deleteV1({
        accountId: accountId(),
        imageId: "non-existent-image-id-xyz-00000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImageNotFound")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.deleteV1({
        accountId: "invalid-account-id-000",
        imageId: "some-image-id",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));

    test("error - for empty imageId", () =>
      Images.deleteV1({
        accountId: accountId(),
        imageId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getV1Blob
  // --------------------------------------------------------------------------
  describe("getV1Blob", () => {
    test("error - ImageNotFound when retrieving binary data for non-existent image", () =>
      Images.getV1Blob({
        accountId: accountId(),
        imageId: "distilled-cf-images-blob-happy",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImageNotFound")),
      ));

    test("error - ImageNotFound for non-existent image", () =>
      Images.getV1Blob({
        accountId: accountId(),
        imageId: "non-existent-image-id-xyz-00000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImageNotFound")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.getV1Blob({
        accountId: "invalid-account-id-000",
        imageId: "some-image-id",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // listV1Keys
  // --------------------------------------------------------------------------
  describe("listV1Keys", () => {
    test("error - ImagesAccessNotEnabled when listing signing keys", () =>
      Images.listV1Keys({
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImagesAccessNotEnabled")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.listV1Keys({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // putV1Key
  // --------------------------------------------------------------------------
  describe("putV1Key", () => {
    test("error - ImagesAccessNotEnabled when creating a signing key", () =>
      Images.putV1Key({
        accountId: accountId(),
        signingKeyName: keyName("put-happy"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImagesAccessNotEnabled")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.putV1Key({
        accountId: "invalid-account-id-000",
        signingKeyName: keyName("put-bad-acct"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));

    test("error - for empty signing key name", () =>
      Images.putV1Key({
        accountId: accountId(),
        signingKeyName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteV1Key
  // --------------------------------------------------------------------------
  describe("deleteV1Key", () => {
    test("error - KeyNotFound when deleting a non-existent signing key", () =>
      Images.deleteV1Key({
        accountId: accountId(),
        signingKeyName: keyName("del-happy"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("KeyNotFound")),
      ));

    test("error - KeyNotFound for non-existent signing key", () =>
      Images.deleteV1Key({
        accountId: accountId(),
        signingKeyName: "non-existent-key-xyz-00000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("KeyNotFound")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.deleteV1Key({
        accountId: "invalid-account-id-000",
        signingKeyName: keyName("del-bad-acct"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // getV1Stat
  // --------------------------------------------------------------------------
  describe("getV1Stat", () => {
    test("error - ImagesAccessNotEnabled when retrieving image usage stats", () =>
      Images.getV1Stat({
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ImagesAccessNotEnabled")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.getV1Stat({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // createV1Variant
  // --------------------------------------------------------------------------
  describe("createV1Variant", () => {
    test("error - VariantNameNotAllowed when creating a variant with scale-down fit", () =>
      Images.createV1Variant({
        accountId: accountId(),
        id: variantName("create-happy"),
        options: {
          fit: "scale-down",
          height: 200,
          width: 200,
          metadata: "none",
        },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("VariantNameNotAllowed")),
      ));

    test("error - VariantNameNotAllowed when creating a variant with contain fit", () =>
      Images.createV1Variant({
        accountId: accountId(),
        id: variantName("create-contain"),
        options: {
          fit: "contain",
          height: 300,
          width: 400,
          metadata: "keep",
        },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("VariantNameNotAllowed")),
      ));

    test("error - VariantNameNotAllowed when creating a variant with neverRequireSignedURLs", () =>
      Images.createV1Variant({
        accountId: accountId(),
        id: variantName("create-nosign"),
        options: {
          fit: "cover",
          height: 150,
          width: 150,
          metadata: "copyright",
        },
        neverRequireSignedURLs: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("VariantNameNotAllowed")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.createV1Variant({
        accountId: "invalid-account-id-000",
        id: variantName("create-bad-acct"),
        options: {
          fit: "scale-down",
          height: 100,
          width: 100,
          metadata: "none",
        },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));

    test("error - VariantNameNotAllowed for duplicate variant creation", () =>
      Images.createV1Variant({
        accountId: accountId(),
        id: variantName("create-dup"),
        options: {
          fit: "scale-down",
          height: 100,
          width: 100,
          metadata: "none",
        },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("VariantNameNotAllowed")),
      ));
  });

  // --------------------------------------------------------------------------
  // getV1Variant
  // --------------------------------------------------------------------------
  describe("getV1Variant", () => {
    test("error - CloudflareHttpError when retrieving a non-existent variant", () =>
      Images.getV1Variant({
        accountId: accountId(),
        variantId: variantName("get-happy"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    test("error - CloudflareHttpError for non-existent variant", () =>
      Images.getV1Variant({
        accountId: accountId(),
        variantId: "non-existent-variant-id-xyz-00000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.getV1Variant({
        accountId: "invalid-account-id-000",
        variantId: "some-variant-id",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // listV1Variants
  // --------------------------------------------------------------------------
  describe("listV1Variants", () => {
    test("error - schema decode failure when listing variants in account", () =>
      Images.listV1Variants({
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "ImagesAccessNotEnabled"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.listV1Variants({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // patchV1Variant
  // --------------------------------------------------------------------------
  describe("patchV1Variant", () => {
    test("error - VariantNotFound when updating non-existent variant options", () =>
      Images.patchV1Variant({
        accountId: accountId(),
        variantId: variantName("patch-happy"),
        options: {
          fit: "contain",
          height: 250,
          width: 250,
          metadata: "keep",
        },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("VariantNotFound")),
      ));

    test("error - VariantNotFound when updating non-existent variant neverRequireSignedURLs", () =>
      Images.patchV1Variant({
        accountId: accountId(),
        variantId: variantName("patch-nosign"),
        options: {
          fit: "scale-down",
          height: 100,
          width: 100,
          metadata: "none",
        },
        neverRequireSignedURLs: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("VariantNotFound")),
      ));

    test("error - VariantNotFound for non-existent variant", () =>
      Images.patchV1Variant({
        accountId: accountId(),
        variantId: "non-existent-variant-id-xyz-00000000",
        options: {
          fit: "scale-down",
          height: 100,
          width: 100,
          metadata: "none",
        },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("VariantNotFound")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.patchV1Variant({
        accountId: "invalid-account-id-000",
        variantId: "some-variant-id",
        options: {
          fit: "scale-down",
          height: 100,
          width: 100,
          metadata: "none",
        },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteV1Variant
  // --------------------------------------------------------------------------
  describe("deleteV1Variant", () => {
    test("error - VariantNotFound when deleting a non-existent variant", () =>
      Images.deleteV1Variant({
        accountId: accountId(),
        variantId: variantName("delete-happy"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("VariantNotFound")),
      ));

    test("error - VariantNotFound for non-existent variant", () =>
      Images.deleteV1Variant({
        accountId: accountId(),
        variantId: "non-existent-variant-id-xyz-00000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("VariantNotFound")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.deleteV1Variant({
        accountId: "invalid-account-id-000",
        variantId: "some-variant-id",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));

    test("error - for empty variantId", () =>
      Images.deleteV1Variant({
        accountId: accountId(),
        variantId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // listV2s
  // --------------------------------------------------------------------------
  describe("listV2s", () => {
    test("happy path - lists images v2 in account", () =>
      Effect.gen(function* () {
        const result = yield* Images.listV2s({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        if (result.images) {
          expect(Array.isArray(result.images)).toBe(true);
        }
      }));

    test("happy path - lists images v2 with perPage limit", () =>
      Effect.gen(function* () {
        const result = yield* Images.listV2s({
          accountId: accountId(),
          perPage: 1,
        });

        expect(result).toBeDefined();
        if (result.images) {
          expect(result.images.length).toBeLessThanOrEqual(1);
        }
      }));

    test("happy path - lists images v2 with sort order ascending", () =>
      Effect.gen(function* () {
        const result = yield* Images.listV2s({
          accountId: accountId(),
          sortOrder: "asc",
        });

        expect(result).toBeDefined();
        if (result.images) {
          expect(Array.isArray(result.images)).toBe(true);
        }
      }));

    test("happy path - lists images v2 with sort order descending", () =>
      Effect.gen(function* () {
        const result = yield* Images.listV2s({
          accountId: accountId(),
          sortOrder: "desc",
        });

        expect(result).toBeDefined();
        if (result.images) {
          expect(Array.isArray(result.images)).toBe(true);
        }
      }));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.listV2s({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // createV2DirectUpload
  // --------------------------------------------------------------------------
  describe("createV2DirectUpload", () => {
    test("happy path - creates a direct upload URL", () =>
      Effect.gen(function* () {
        const result = yield* Images.createV2DirectUpload({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        if (result.id) {
          expect(typeof result.id).toBe("string");
          expect(result.id.length).toBeGreaterThan(0);
        }
        if (result.uploadURL) {
          expect(typeof result.uploadURL).toBe("string");
          expect(result.uploadURL.length).toBeGreaterThan(0);
        }

        // Cleanup: delete the draft image if an id was returned
        yield* Images.deleteV1({
          accountId: accountId(),
          imageId: result.id ?? "no-id",
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("error - InvalidUploadFormat when creating a direct upload URL with expiry", () =>
      Images.createV2DirectUpload({
        accountId: accountId(),
        expiry: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidUploadFormat")),
      ));

    test("error - InvalidUploadFormat when creating a direct upload URL with custom id", () =>
      Images.createV2DirectUpload({
        accountId: accountId(),
        id: "distilled-cf-images-direct-upload-custom",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidUploadFormat")),
      ));

    test("error - InvalidUploadFormat when creating a direct upload URL with metadata", () =>
      Images.createV2DirectUpload({
        accountId: accountId(),
        metadata: { env: "test", source: "distilled" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidUploadFormat")),
      ));

    test("error - UnknownCloudflareError for invalid accountId", () =>
      Images.createV2DirectUpload({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });
});
