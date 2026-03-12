import { describe, expect, it } from "vitest";
import { buildRequestParts, getHttpTrait } from "@distilled.cloud/core/traits";
import { transformCloudflareRequestParts } from "~/client/api";
import { CreateAssetUploadRequest } from "~/services/workers";

describe("client api", () => {
  it("maps createAssetUpload jwtToken to a bearer authorization header", () => {
    const httpTrait = getHttpTrait(CreateAssetUploadRequest.ast);
    expect(httpTrait).toBeDefined();

    const parts = buildRequestParts(
      CreateAssetUploadRequest.ast,
      httpTrait!,
      {
        accountId: "account-123",
        base64: true,
        jwtToken: "upload-session-jwt",
        body: { asset: "ZGF0YQ==" },
      },
      CreateAssetUploadRequest,
    );

    expect(parts.headers).toEqual({
      Authorization: "upload-session-jwt",
    });
    expect(parts.body).toEqual({ asset: "ZGF0YQ==" });

    const transformed = transformCloudflareRequestParts({
      pathTemplate: httpTrait!.path,
      parts,
    });

    expect(transformed.headers).toEqual({
      Authorization: "Bearer upload-session-jwt",
    });
    expect(transformed.body).toEqual({ asset: "ZGF0YQ==" });
  });

  it("does not double-prefix an existing bearer header", () => {
    const transformed = transformCloudflareRequestParts({
      pathTemplate: "/accounts/{account_id}/workers/assets/upload",
      parts: {
        path: "/accounts/account-123/workers/assets/upload",
        query: {},
        headers: { Authorization: "Bearer upload-session-jwt" },
        body: undefined,
        isMultipart: true,
      },
    });

    expect(transformed.headers).toEqual({
      Authorization: "Bearer upload-session-jwt",
    });
  });
});
