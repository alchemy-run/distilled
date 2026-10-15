import { describe, expect, it } from "vitest";
import * as IAM from "../services/iam.ts";
import * as KMS from "../services/kms.ts";
import * as S3 from "../services/s3.ts";
import * as STS from "../services/sts.ts";
import { getEndpointResolver, getEndpointTemplate } from "../traits.ts";
import { isVirtualHostableS3Bucket, parseArn, partition } from "./aws-functions.ts";
import { makeEndpointResolver } from "./endpoint-resolver.ts";
import partitionsData from "./partitions.json" with { type: "json" };
import { getAttr, isValidHostLabel, parseURL, substring, uriEncode } from "./standard-functions.ts";

const helpers = {
  partition,
  parseArn,
  isVirtualHostableS3Bucket,
  parseURL,
  substring,
  uriEncode,
  isValidHostLabel,
  getAttr,
  resolveTemplates: <T>(value: T): T => value,
} as any;

const regions = [
  ...new Set(partitionsData.partitions.flatMap((p) => Object.keys(p.regions))),
  "us-future-1",
];

const request = { method: "GET", path: "/", query: {}, headers: {}, body: undefined } as any;

/** The resolved endpoint and request; throws the rule set's error. */
const resolve = (op: any, input: unknown, region: string) => {
  const result = makeEndpointResolver(op)!({ input, region, request });
  if (result instanceof Error) throw result;
  return result;
};

describe("Region-only endpoint templates", () => {
  const ops = {
    "s3.listBuckets": S3.listBuckets,
    "s3.getObject": S3.getObject,
    "sts.getCallerIdentity": STS.getCallerIdentity,
    "iam.listRoles": IAM.listRoles,
    "kms.listKeys": KMS.listKeys,
  } as Record<string, any>;

  for (const [name, op] of Object.entries(ops)) {
    it(`${name} resolves as its rules do in every region`, () => {
      const rules = getEndpointResolver(op.input.ast)!;
      expect(getEndpointTemplate(rules)).toBeDefined();
      const input = name === "s3.getObject" ? { Bucket: "bench-bucket", Key: "k" } : {};
      for (const region of regions) {
        const expected = rules({ Region: region, ...input }, helpers);
        if (expected.type === "error") {
          expect(() => resolve(op, input, region)).toThrow();
          continue;
        }
        const { endpoint } = resolve(op, input, region);
        expect(JSON.parse(JSON.stringify(endpoint)), `${name} ${region}`).toEqual(
          JSON.parse(JSON.stringify(expected.endpoint)),
        );
      }
    });
  }

  it("serves Region-only calls from the template, and caches every parameter set", () => {
    const resolver = makeEndpointResolver(S3.getObject as any)!;
    const endpoint = (input: unknown) => {
      const result = resolver({ input, region: "eu-west-1", request });
      if (result instanceof Error) throw result;
      return result.endpoint;
    };
    // A templated endpoint is parsed once per region and then shared.
    const listBuckets = makeEndpointResolver(S3.listBuckets as any)!;
    const once = () => (listBuckets({ input: {}, region: "eu-west-1", request }) as any).endpoint;
    expect(once()).toBe(once());
    // Calls with context params run the rules once per parameter set.
    const c = endpoint({ Bucket: "bench-bucket", Key: "k" });
    expect(endpoint({ Bucket: "bench-bucket", Key: "k" })).toBe(c);
    expect(c.url).toBe("https://bench-bucket.s3.eu-west-1.amazonaws.com");
    expect(endpoint({ Bucket: "other-bucket", Key: "k" }).url).toBe(
      "https://other-bucket.s3.eu-west-1.amazonaws.com",
    );
  });
});
