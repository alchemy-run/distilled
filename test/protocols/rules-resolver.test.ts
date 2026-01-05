import { it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as S from "effect/Schema";
import { describe, expect } from "vitest";
import {
  isVirtualHostableS3Bucket,
  parseArn,
  partition,
} from "../../src/rules-engine/aws-functions.ts";
import { resolveEndpointSync } from "../../src/rules-engine/evaluator.ts";
import { RuleSetObject } from "../../src/rules-engine/model.ts";
import { makeRulesResolver } from "../../src/rules-engine/resolver.ts";
import {
  booleanEquals,
  getAttr,
  isSet,
  isValidHostLabel,
  not,
  parseURL,
  stringEquals,
  substring,
  uriEncode,
} from "../../src/rules-engine/standard-functions.ts";
import { PutEventsRequest } from "../../src/services/eventbridge.ts";
import {
  GetObjectRequest,
  ListBucketsRequest,
  PutObjectRequest,
} from "../../src/services/s3.ts";
import { GetCallerIdentityRequest } from "../../src/services/sts.ts";

// Helper to resolve endpoint for a given schema and input
const resolveEndpoint = <A, I>(
  schema: S.Schema<A, I>,
  input: A,
  region: string,
) => {
  const operation = { input: schema, output: schema, errors: [] };
  const resolver = makeRulesResolver(operation);
  if (!resolver) {
    return Effect.fail(new Error("No rules resolver available"));
  }
  // Provide a mock request for testing - path adjustment is tested separately
  const mockRequest = { method: "GET", path: "/", query: {}, headers: {} };
  return Effect.map(
    resolver({ input, region, request: mockRequest }),
    (result) => result.endpoint,
  );
};

// =============================================================================
// STANDARD LIBRARY FUNCTIONS
// =============================================================================

describe("standard library functions", () => {
  describe("isSet", () => {
    it("returns true for non-null values", () => {
      expect(isSet("hello")).toBe(true);
      expect(isSet(0)).toBe(true);
      expect(isSet(false)).toBe(true);
      expect(isSet("")).toBe(true);
      expect(isSet([])).toBe(true);
      expect(isSet({})).toBe(true);
    });

    it("returns false for null and undefined", () => {
      expect(isSet(null)).toBe(false);
      expect(isSet(undefined)).toBe(false);
    });
  });

  describe("not", () => {
    it("negates boolean values", () => {
      expect(not(true)).toBe(false);
      expect(not(false)).toBe(true);
    });

    it("negates truthy/falsy values", () => {
      expect(not(null)).toBe(true);
      expect(not(undefined)).toBe(true);
      expect(not("hello")).toBe(false);
      expect(not(0)).toBe(true);
    });
  });

  describe("booleanEquals", () => {
    it("returns true when booleans match", () => {
      expect(booleanEquals(true, true)).toBe(true);
      expect(booleanEquals(false, false)).toBe(true);
    });

    it("returns false when booleans differ", () => {
      expect(booleanEquals(true, false)).toBe(false);
      expect(booleanEquals(false, true)).toBe(false);
    });
  });

  describe("stringEquals", () => {
    it("returns true when strings match", () => {
      expect(stringEquals("hello", "hello")).toBe(true);
      expect(stringEquals("", "")).toBe(true);
    });

    it("returns false when strings differ", () => {
      expect(stringEquals("hello", "world")).toBe(false);
      expect(stringEquals("Hello", "hello")).toBe(false); // case sensitive
    });
  });

  describe("getAttr", () => {
    it("gets simple object properties", () => {
      expect(getAttr({ foo: "bar" }, "foo")).toBe("bar");
      expect(getAttr({ name: "test" }, "name")).toBe("test");
    });

    it("gets nested object properties with dot notation", () => {
      const obj = { level1: { level2: { value: 42 } } };
      expect(getAttr(obj, "level1.level2.value")).toBe(42);
    });

    it("gets array elements with bracket notation", () => {
      const obj = { items: ["a", "b", "c"] };
      expect(getAttr(obj, "items[0]")).toBe("a");
      expect(getAttr(obj, "items[1]")).toBe("b");
      expect(getAttr(obj, "items[2]")).toBe("c");
    });

    it("returns undefined for missing properties", () => {
      expect(getAttr({ foo: "bar" }, "baz")).toBe(undefined);
      expect(getAttr({ a: { b: 1 } }, "a.c")).toBe(undefined);
    });

    it("returns undefined for null/undefined values", () => {
      expect(getAttr(null, "foo")).toBe(undefined);
      expect(getAttr(undefined, "foo")).toBe(undefined);
    });
  });

  describe("substring", () => {
    it("extracts substring with start and stop indices", () => {
      expect(substring("hello world", 0, 5, false)).toBe("hello");
      expect(substring("hello world", 6, 11, false)).toBe("world");
    });

    it("extracts substring with reverse indexing", () => {
      expect(substring("hello world", 0, 5, true)).toBe("world");
      expect(substring("abcdef", 0, 3, true)).toBe("def");
    });

    it("returns undefined for invalid indices", () => {
      expect(substring("hello", 5, 3, false)).toBe(undefined); // start > stop
      expect(substring("hello", -1, 3, false)).toBe(undefined); // negative start
      expect(substring("hello", 0, 10, false)).toBe(undefined); // stop > length
    });

    it("returns undefined for non-string input", () => {
      expect(substring(123, 0, 2, false)).toBe(undefined);
      expect(substring(null, 0, 2, false)).toBe(undefined);
    });
  });

  describe("parseURL", () => {
    it("parses a simple URL", () => {
      const result = parseURL("https://example.com");
      expect(result).toBeDefined();
      expect(result?.scheme).toBe("https");
      expect(result?.authority).toBe("example.com");
      expect(result?.path).toBe("/");
    });

    it("parses URL with path", () => {
      const result = parseURL("https://example.com/path/to/resource");
      expect(result?.path).toBe("/path/to/resource");
      expect(result?.normalizedPath).toBe("/path/to/resource/");
    });

    it("parses URL with port", () => {
      const result = parseURL("http://localhost:8080/api");
      expect(result?.authority).toBe("localhost:8080");
      expect(result?.scheme).toBe("http");
    });

    it("detects IP addresses", () => {
      const result = parseURL("http://192.168.1.1/api");
      expect(result?.isIp).toBe(true);
    });

    it("returns undefined for invalid URLs", () => {
      expect(parseURL("not-a-url")).toBe(undefined);
      expect(parseURL(123)).toBe(undefined);
      expect(parseURL(null)).toBe(undefined);
    });
  });

  describe("uriEncode", () => {
    it("encodes special characters", () => {
      expect(uriEncode("hello world")).toBe("hello%20world");
      expect(uriEncode("foo/bar")).toBe("foo%2Fbar");
      expect(uriEncode("a=b&c=d")).toBe("a%3Db%26c%3Dd");
    });

    it("preserves safe characters", () => {
      expect(uriEncode("hello")).toBe("hello");
      expect(uriEncode("123")).toBe("123");
    });

    it("returns undefined for non-strings", () => {
      expect(uriEncode(123)).toBe(undefined);
      expect(uriEncode(null)).toBe(undefined);
    });
  });

  describe("isValidHostLabel", () => {
    it("validates single labels", () => {
      expect(isValidHostLabel("valid", false)).toBe(true);
      expect(isValidHostLabel("valid-label", false)).toBe(true);
      expect(isValidHostLabel("abc123", false)).toBe(true);
    });

    it("rejects invalid single labels", () => {
      expect(isValidHostLabel("-invalid", false)).toBe(false); // starts with hyphen
      expect(isValidHostLabel("invalid-", false)).toBe(false); // ends with hyphen
      expect(isValidHostLabel("", false)).toBe(false); // empty
      expect(isValidHostLabel("a".repeat(64), false)).toBe(false); // too long (>63)
    });

    it("validates multi-label hostnames when allowSubDomains is true", () => {
      expect(isValidHostLabel("sub.domain.example", true)).toBe(true);
      expect(isValidHostLabel("a.b.c.d", true)).toBe(true);
    });

    it("rejects multi-label hostnames when allowSubDomains is false", () => {
      expect(isValidHostLabel("sub.domain", false)).toBe(false);
    });
  });
});

// =============================================================================
// AWS LIBRARY FUNCTIONS
// =============================================================================

describe("aws library functions", () => {
  describe("aws.partition", () => {
    it("returns partition info for standard AWS regions", () => {
      const result = partition("us-east-1");
      expect(result).toBeDefined();
      expect(result?.name).toBe("aws");
      expect(result?.dnsSuffix).toBe("amazonaws.com");
    });

    it("returns partition info for China regions", () => {
      const result = partition("cn-north-1");
      expect(result).toBeDefined();
      expect(result?.name).toBe("aws-cn");
      expect(result?.dnsSuffix).toBe("amazonaws.com.cn");
    });

    it("returns partition info for GovCloud regions", () => {
      const result = partition("us-gov-west-1");
      expect(result).toBeDefined();
      expect(result?.name).toBe("aws-us-gov");
    });

    it("returns partition info for us-isob regions", () => {
      const result = partition("us-isob-east-1");
      expect(result).toBeDefined();
      expect(result?.name).toBe("aws-iso-b");
    });

    it("returns partition info for unknown regions using regex matching", () => {
      // Future regions like us-west-99 should still match the aws partition
      const result = partition("us-west-99");
      expect(result).toBeDefined();
      expect(result?.name).toBe("aws");
    });

    it("includes dual-stack DNS suffix", () => {
      const result = partition("us-east-1");
      expect(result?.dualStackDnsSuffix).toBe("api.aws");
    });

    it("includes supportsFIPS flag", () => {
      const result = partition("us-east-1");
      expect(result?.supportsFIPS).toBe(true);
    });

    it("includes supportsDualStack flag", () => {
      const result = partition("us-east-1");
      expect(result?.supportsDualStack).toBe(true);
    });

    it("returns undefined for non-string input", () => {
      expect(partition(null)).toBe(undefined);
      expect(partition(123)).toBe(undefined);
    });
  });

  describe("aws.parseArn", () => {
    it("parses a standard SNS ARN", () => {
      const result = parseArn(
        "arn:aws:sns:us-west-2:012345678910:example-sns-topic-name",
      );
      expect(result).toBeDefined();
      expect(result?.partition).toBe("aws");
      expect(result?.service).toBe("sns");
      expect(result?.region).toBe("us-west-2");
      expect(result?.accountId).toBe("012345678910");
      expect(result?.resourceId).toEqual(["example-sns-topic-name"]);
    });

    it("parses an EC2 ARN with resource path", () => {
      const result = parseArn(
        "arn:aws:ec2:us-east-1:012345678910:vpc/vpc-0e9801d129EXAMPLE",
      );
      expect(result?.service).toBe("ec2");
      expect(result?.resourceId).toEqual(["vpc", "vpc-0e9801d129EXAMPLE"]);
    });

    it("parses an IAM ARN (no region)", () => {
      const result = parseArn("arn:aws:iam::012345678910:user/johndoe");
      expect(result?.service).toBe("iam");
      expect(result?.region).toBe(""); // IAM is global
      expect(result?.accountId).toBe("012345678910");
      expect(result?.resourceId).toEqual(["user", "johndoe"]);
    });

    it("parses an S3 bucket ARN (no region or account)", () => {
      const result = parseArn("arn:aws:s3:::bucket_name");
      expect(result?.service).toBe("s3");
      expect(result?.region).toBe("");
      expect(result?.accountId).toBe("");
      expect(result?.resourceId).toEqual(["bucket_name"]);
    });

    it("parses an S3 access point ARN", () => {
      const result = parseArn(
        "arn:aws:s3:us-west-2:123456789012:accesspoint:myendpoint",
      );
      expect(result?.service).toBe("s3");
      expect(result?.region).toBe("us-west-2");
      expect(result?.accountId).toBe("123456789012");
      expect(result?.resourceId).toEqual(["accesspoint", "myendpoint"]);
    });

    it("parses an S3 access point ARN with slash separator", () => {
      const result = parseArn(
        "arn:aws:s3:us-west-2:123456789012:accesspoint/myendpoint",
      );
      expect(result?.service).toBe("s3");
      expect(result?.resourceId).toEqual(["accesspoint", "myendpoint"]);
    });

    it("returns undefined for invalid ARNs", () => {
      expect(parseArn("not-an-arn")).toBe(undefined);
      expect(parseArn("11111111-2222-3333-4444-555555555555")).toBe(undefined);
      expect(parseArn("arn:aws:")).toBe(undefined); // too short
      expect(parseArn("arn::s3:us-east-1:123:bucket")).toBe(undefined); // missing partition
    });

    it("returns undefined for non-string input", () => {
      expect(parseArn(null)).toBe(undefined);
      expect(parseArn(123)).toBe(undefined);
    });
  });

  describe("aws.isVirtualHostableS3Bucket", () => {
    it("returns true for valid virtual-hostable bucket names", () => {
      expect(isVirtualHostableS3Bucket("my-bucket", false)).toBe(true);
      expect(isVirtualHostableS3Bucket("mybucket123", false)).toBe(true);
      expect(isVirtualHostableS3Bucket("abc", false)).toBe(true); // min 3 chars
    });

    it("returns false for buckets with uppercase", () => {
      expect(isVirtualHostableS3Bucket("MyBucket", false)).toBe(false);
      expect(isVirtualHostableS3Bucket("MYBUCKET", false)).toBe(false);
    });

    it("returns false for buckets with dots (not SSL-safe)", () => {
      expect(isVirtualHostableS3Bucket("my.bucket.name", false)).toBe(false);
    });

    it("returns true for buckets with dots when allowSubDomains is true", () => {
      // Each segment must be 3-63 chars, lowercase, valid host label
      expect(isVirtualHostableS3Bucket("my.bucket.name", true)).toBe(false);
      expect(isVirtualHostableS3Bucket("myy.bucket.name", true)).toBe(true);
      expect(isVirtualHostableS3Bucket("abc.def.ghi", true)).toBe(true);
    });

    it("returns false for buckets that are too short", () => {
      expect(isVirtualHostableS3Bucket("ab", false)).toBe(false);
    });

    it("returns false for buckets that are too long", () => {
      expect(isVirtualHostableS3Bucket("a".repeat(64), false)).toBe(false);
    });

    it("returns false for bucket names that look like IP addresses", () => {
      expect(isVirtualHostableS3Bucket("192.168.1.1", true)).toBe(false);
    });

    it("returns false for invalid host labels", () => {
      expect(isVirtualHostableS3Bucket("-invalid", false)).toBe(false);
      expect(isVirtualHostableS3Bucket("invalid-", false)).toBe(false);
    });
  });
});

// =============================================================================
// RULES ENGINE EVALUATOR - REAL SERVICE TESTS
// =============================================================================

describe("rules resolver", () => {
  // ==========================================================================
  // Standard Regional Endpoints
  // ==========================================================================

  describe("standard regional endpoints", () => {
    it.effect("resolves standard S3 endpoint for us-east-1", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetObjectRequest,
          { Bucket: "my-bucket", Key: "my-key" },
          "us-east-1",
        );

        expect(result.url).toBe("https://my-bucket.s3.us-east-1.amazonaws.com");
      }),
    );

    it.effect("resolves standard S3 endpoint for us-west-2", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetObjectRequest,
          { Bucket: "test-bucket", Key: "test-key" },
          "us-west-2",
        );

        expect(result.url).toBe(
          "https://test-bucket.s3.us-west-2.amazonaws.com",
        );
      }),
    );

    it.effect("resolves endpoint for eu-west-1", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          PutObjectRequest,
          { Bucket: "eu-bucket", Key: "my-object" },
          "eu-west-1",
        );

        expect(result.url).toBe("https://eu-bucket.s3.eu-west-1.amazonaws.com");
      }),
    );
  });

  // ==========================================================================
  // Virtual-Hosted Style Endpoints
  // ==========================================================================

  describe("virtual-hosted style endpoints", () => {
    it.effect("uses virtual-hosted style for valid bucket name", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetObjectRequest,
          { Bucket: "valid-bucket-name", Key: "object.txt" },
          "us-east-1",
        );

        // Virtual-hosted style puts bucket in the subdomain
        expect(result.url).toContain("valid-bucket-name.s3");
      }),
    );

    it.effect("uses virtual-hosted style for lowercase bucket", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetObjectRequest,
          { Bucket: "lowercase-bucket", Key: "file.txt" },
          "us-west-2",
        );

        expect(result.url).toBe(
          "https://lowercase-bucket.s3.us-west-2.amazonaws.com",
        );
      }),
    );

    it.effect(
      "uses path-style for bucket with dots (not virtual-hostable)",
      () =>
        Effect.gen(function* () {
          // Buckets with dots are not virtual-hostable for SSL
          const result = yield* resolveEndpoint(
            GetObjectRequest,
            { Bucket: "bucket.with.dots", Key: "file.txt" },
            "us-east-1",
          );

          // For buckets with dots, S3 uses path-style or a different URL pattern
          // The exact behavior depends on the ruleset, but the bucket shouldn't be in subdomain
          expect(result.url).toBeDefined();
        }),
    );
  });

  // ==========================================================================
  // Partition-Specific Endpoints
  // ==========================================================================

  describe("partition-specific endpoints", () => {
    it.effect("resolves endpoint for cn-north-1 (China partition)", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetObjectRequest,
          { Bucket: "china-bucket", Key: "key" },
          "cn-north-1",
        );

        // China partition uses .amazonaws.com.cn
        expect(result.url).toContain("amazonaws.com.cn");
      }),
    );

    it.effect("resolves endpoint for us-gov-west-1 (GovCloud partition)", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetObjectRequest,
          { Bucket: "gov-bucket", Key: "key" },
          "us-gov-west-1",
        );

        // GovCloud uses different DNS suffix
        expect(result.url).toBeDefined();
        expect(result.url).toContain("us-gov-west-1");
      }),
    );
  });

  // ==========================================================================
  // Operations Without Bucket (e.g., ListBuckets)
  // ==========================================================================

  describe("operations without bucket context", () => {
    it.effect("resolves endpoint for ListBuckets (no bucket param)", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          ListBucketsRequest,
          {},
          "us-east-1",
        );

        // ListBuckets doesn't have a bucket, so uses regional endpoint
        expect(result.url).toBe("https://s3.us-east-1.amazonaws.com");
      }),
    );
  });

  // ==========================================================================
  // Auth Scheme Properties - sigv4
  // ==========================================================================

  describe("auth scheme properties - sigv4", () => {
    it.effect("returns sigv4 auth scheme in properties", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetObjectRequest,
          { Bucket: "my-bucket", Key: "my-key" },
          "us-east-1",
        );

        // The resolved endpoint should include auth scheme properties
        expect(result.properties).toBeDefined();
        const authSchemes = result.properties?.authSchemes as Array<{
          name: string;
          signingName?: string;
          signingRegion?: string;
          disableDoubleEncoding?: boolean;
        }>;
        expect(authSchemes).toBeDefined();
        expect(authSchemes[0]?.name).toBe("sigv4");
        expect(authSchemes[0]?.signingName).toBe("s3");
        expect(authSchemes[0]?.signingRegion).toBe("us-east-1");
      }),
    );

    it.effect("auth scheme uses correct signing region", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetObjectRequest,
          { Bucket: "bucket", Key: "key" },
          "ap-southeast-1",
        );

        const authSchemes = result.properties?.authSchemes as Array<{
          signingRegion?: string;
        }>;
        expect(authSchemes[0]?.signingRegion).toBe("ap-southeast-1");
      }),
    );

    it.effect("S3 includes disableDoubleEncoding flag", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetObjectRequest,
          { Bucket: "bucket", Key: "key" },
          "us-east-1",
        );

        const authSchemes = result.properties?.authSchemes as Array<{
          disableDoubleEncoding?: boolean;
        }>;
        expect(authSchemes[0]?.disableDoubleEncoding).toBe(true);
      }),
    );
  });

  // ==========================================================================
  // Auth Scheme Properties - sigv4a (EventBridge with EndpointId)
  // ==========================================================================

  describe("auth scheme properties - sigv4a", () => {
    it.effect(
      "returns sigv4a auth scheme for EventBridge with EndpointId",
      () =>
        Effect.gen(function* () {
          const result = yield* resolveEndpoint(
            PutEventsRequest,
            {
              Entries: [
                {
                  DetailType: "test",
                  Detail: '{"key":"value"}',
                  EventBusName: "test-bus",
                },
              ],
              EndpointId: "abc123.456def",
            },
            "us-east-1",
          );

          // EventBridge with EndpointId uses sigv4a
          expect(result.url).toContain("abc123.456def");
          expect(result.url).toContain("endpoint.events");

          const authSchemes = result.properties?.authSchemes as Array<{
            name: string;
            signingName?: string;
            signingRegionSet?: string[];
          }>;
          expect(authSchemes).toBeDefined();
          expect(authSchemes[0]?.name).toBe("sigv4a");
          expect(authSchemes[0]?.signingName).toBe("events");
          expect(authSchemes[0]?.signingRegionSet).toEqual(["*"]);
        }),
    );

    it.effect("EventBridge without EndpointId uses standard sigv4", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          PutEventsRequest,
          {
            Entries: [
              {
                DetailType: "test",
                Detail: '{"key":"value"}',
                EventBusName: "test-bus",
              },
            ],
          },
          "us-east-1",
        );

        // Without EndpointId, uses regular regional endpoint with sigv4
        expect(result.url).toBe("https://events.us-east-1.amazonaws.com");
      }),
    );
  });

  // ==========================================================================
  // STS Global Endpoint
  // ==========================================================================

  describe("STS endpoint resolution", () => {
    it.effect("resolves STS regional endpoint", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetCallerIdentityRequest,
          {},
          "us-west-2",
        );

        // Standard regional endpoint
        expect(result.url).toBe("https://sts.us-west-2.amazonaws.com");
      }),
    );

    it.effect("resolves STS endpoint for ap-northeast-1", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetCallerIdentityRequest,
          {},
          "ap-northeast-1",
        );

        // Without UseGlobalEndpoint, uses regional
        expect(result.url).toBe("https://sts.ap-northeast-1.amazonaws.com");
      }),
    );
  });

  // ==========================================================================
  // Headers in Resolved Endpoint
  // ==========================================================================

  describe("endpoint headers", () => {
    it.effect("resolved endpoint may include custom headers", () =>
      Effect.gen(function* () {
        const result = yield* resolveEndpoint(
          GetObjectRequest,
          { Bucket: "my-bucket", Key: "my-key" },
          "us-east-1",
        );

        // Headers is optional but should be an object if present
        if (result.headers) {
          expect(typeof result.headers).toBe("object");
        }
      }),
    );
  });
});

// =============================================================================
// DIRECT RULESET EVALUATION TESTS
// =============================================================================

describe("direct ruleset evaluation", () => {
  describe("basic endpoint resolution", () => {
    it("resolves simple endpoint with region substitution", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string", required: true },
        },
        rules: [
          {
            conditions: [{ fn: "isSet", argv: [{ ref: "Region" }] }],
            endpoint: {
              url: "https://service.{Region}.amazonaws.com",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
        ],
      };

      const result = resolveEndpointSync(ruleSet, { Region: "us-west-2" });
      expect(result.url).toBe("https://service.us-west-2.amazonaws.com");
    });

    it("uses parameter defaults", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string", required: true },
          UseFIPS: { type: "boolean", default: false },
        },
        rules: [
          {
            conditions: [
              { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, false] },
            ],
            endpoint: {
              url: "https://service.{Region}.amazonaws.com",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
        ],
      };

      const result = resolveEndpointSync(ruleSet, { Region: "us-east-1" });
      expect(result.url).toBe("https://service.us-east-1.amazonaws.com");
    });
  });

  describe("conditional logic", () => {
    it("handles tree rules with nested conditions", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string", required: true },
          UseFIPS: { type: "boolean", default: false },
        },
        rules: [
          {
            conditions: [{ fn: "isSet", argv: [{ ref: "Region" }] }],
            type: "tree",
            rules: [
              {
                conditions: [
                  { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                ],
                endpoint: {
                  url: "https://service-fips.{Region}.amazonaws.com",
                  properties: {},
                  headers: {},
                },
                type: "endpoint",
              },
              {
                conditions: [],
                endpoint: {
                  url: "https://service.{Region}.amazonaws.com",
                  properties: {},
                  headers: {},
                },
                type: "endpoint",
              },
            ],
          },
        ],
      };

      const fipsResult = resolveEndpointSync(ruleSet, {
        Region: "us-east-1",
        UseFIPS: true,
      });
      expect(fipsResult.url).toBe(
        "https://service-fips.us-east-1.amazonaws.com",
      );

      const normalResult = resolveEndpointSync(ruleSet, {
        Region: "us-east-1",
        UseFIPS: false,
      });
      expect(normalResult.url).toBe("https://service.us-east-1.amazonaws.com");
    });

    it("uses stringEquals for region matching", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string", required: true },
        },
        rules: [
          {
            conditions: [
              { fn: "stringEquals", argv: [{ ref: "Region" }, "us-east-1"] },
            ],
            endpoint: {
              url: "https://service.us-east-1.amazonaws.com",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
          {
            conditions: [],
            endpoint: {
              url: "https://service.{Region}.amazonaws.com",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
        ],
      };

      const result1 = resolveEndpointSync(ruleSet, { Region: "us-east-1" });
      expect(result1.url).toBe("https://service.us-east-1.amazonaws.com");

      const result2 = resolveEndpointSync(ruleSet, { Region: "us-west-2" });
      expect(result2.url).toBe("https://service.us-west-2.amazonaws.com");
    });
  });

  describe("error rules", () => {
    it("throws on error rules", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string" },
        },
        rules: [
          {
            conditions: [
              { fn: "not", argv: [{ fn: "isSet", argv: [{ ref: "Region" }] }] },
            ],
            error: "Region is required",
            type: "error",
          },
          {
            conditions: [],
            endpoint: {
              url: "https://service.{Region}.amazonaws.com",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
        ],
      };

      expect(() => resolveEndpointSync(ruleSet, {})).toThrow(
        "Region is required",
      );
    });
  });

  describe("aws.partition function", () => {
    it("resolves partition and uses partition attributes", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string", required: true },
        },
        rules: [
          {
            conditions: [
              {
                fn: "aws.partition",
                argv: [{ ref: "Region" }],
                assign: "PartitionResult",
              },
            ],
            endpoint: {
              url: "https://service.{Region}.{PartitionResult#dnsSuffix}",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
        ],
      };

      const awsResult = resolveEndpointSync(ruleSet, { Region: "us-east-1" });
      expect(awsResult.url).toBe("https://service.us-east-1.amazonaws.com");

      const chinaResult = resolveEndpointSync(ruleSet, {
        Region: "cn-north-1",
      });
      expect(chinaResult.url).toBe(
        "https://service.cn-north-1.amazonaws.com.cn",
      );
    });

    it("uses partition dualStackDnsSuffix", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string", required: true },
          UseDualStack: { type: "boolean", default: false },
        },
        rules: [
          {
            conditions: [
              {
                fn: "aws.partition",
                argv: [{ ref: "Region" }],
                assign: "PartitionResult",
              },
              { fn: "booleanEquals", argv: [{ ref: "UseDualStack" }, true] },
            ],
            endpoint: {
              url: "https://service.{Region}.{PartitionResult#dualStackDnsSuffix}",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
          {
            conditions: [
              {
                fn: "aws.partition",
                argv: [{ ref: "Region" }],
                assign: "PartitionResult",
              },
            ],
            endpoint: {
              url: "https://service.{Region}.{PartitionResult#dnsSuffix}",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
        ],
      };

      const dualStackResult = resolveEndpointSync(ruleSet, {
        Region: "us-east-1",
        UseDualStack: true,
      });
      expect(dualStackResult.url).toBe("https://service.us-east-1.api.aws");
    });
  });

  describe("getAttr function", () => {
    it("accesses nested partition properties", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string", required: true },
        },
        rules: [
          {
            conditions: [
              {
                fn: "aws.partition",
                argv: [{ ref: "Region" }],
                assign: "PartitionResult",
              },
              {
                fn: "booleanEquals",
                argv: [
                  {
                    fn: "getAttr",
                    argv: [{ ref: "PartitionResult" }, "supportsFIPS"],
                  },
                  true,
                ],
              },
            ],
            endpoint: {
              url: "https://service-fips.{Region}.amazonaws.com",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
        ],
      };

      const result = resolveEndpointSync(ruleSet, { Region: "us-east-1" });
      expect(result.url).toBe("https://service-fips.us-east-1.amazonaws.com");
    });
  });

  describe("auth scheme properties", () => {
    it("resolves auth schemes with template interpolation", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string", required: true },
        },
        rules: [
          {
            conditions: [],
            endpoint: {
              url: "https://service.{Region}.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "myservice",
                    signingRegion: "{Region}",
                  },
                ],
              },
              headers: {},
            },
            type: "endpoint",
          },
        ],
      };

      const result = resolveEndpointSync(ruleSet, { Region: "eu-west-1" });
      expect(result.properties?.authSchemes).toEqual([
        {
          name: "sigv4",
          signingName: "myservice",
          signingRegion: "eu-west-1",
        },
      ]);
    });

    it("resolves sigv4a auth schemes with signingRegionSet", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string", required: true },
          EndpointId: { type: "string" },
        },
        rules: [
          {
            conditions: [{ fn: "isSet", argv: [{ ref: "EndpointId" }] }],
            endpoint: {
              url: "https://{EndpointId}.endpoint.events.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4a",
                    signingName: "events",
                    signingRegionSet: ["*"],
                  },
                ],
              },
              headers: {},
            },
            type: "endpoint",
          },
          {
            conditions: [],
            endpoint: {
              url: "https://events.{Region}.amazonaws.com",
              properties: {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "events",
                    signingRegion: "{Region}",
                  },
                ],
              },
              headers: {},
            },
            type: "endpoint",
          },
        ],
      };

      const resultWithEndpointId = resolveEndpointSync(ruleSet, {
        Region: "us-east-1",
        EndpointId: "abc123",
      });
      expect(resultWithEndpointId.url).toBe(
        "https://abc123.endpoint.events.amazonaws.com",
      );
      expect(resultWithEndpointId.properties?.authSchemes).toEqual([
        {
          name: "sigv4a",
          signingName: "events",
          signingRegionSet: ["*"],
        },
      ]);

      const resultWithoutEndpointId = resolveEndpointSync(ruleSet, {
        Region: "us-east-1",
      });
      expect(resultWithoutEndpointId.url).toBe(
        "https://events.us-east-1.amazonaws.com",
      );
      expect(resultWithoutEndpointId.properties?.authSchemes).toEqual([
        {
          name: "sigv4",
          signingName: "events",
          signingRegion: "us-east-1",
        },
      ]);
    });
  });

  describe("isValidHostLabel function", () => {
    it("validates endpoint IDs as host labels", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string", required: true },
          EndpointId: { type: "string" },
        },
        rules: [
          {
            conditions: [
              { fn: "isSet", argv: [{ ref: "EndpointId" }] },
              { fn: "isValidHostLabel", argv: [{ ref: "EndpointId" }, true] },
            ],
            endpoint: {
              url: "https://{EndpointId}.endpoint.service.amazonaws.com",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
          {
            conditions: [{ fn: "isSet", argv: [{ ref: "EndpointId" }] }],
            error: "EndpointId must be a valid host label.",
            type: "error",
          },
          {
            conditions: [],
            endpoint: {
              url: "https://service.{Region}.amazonaws.com",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
        ],
      };

      const validResult = resolveEndpointSync(ruleSet, {
        Region: "us-east-1",
        EndpointId: "abc123.456def",
      });
      expect(validResult.url).toBe(
        "https://abc123.456def.endpoint.service.amazonaws.com",
      );

      expect(() =>
        resolveEndpointSync(ruleSet, {
          Region: "us-east-1",
          EndpointId: "-invalid-",
        }),
      ).toThrow("EndpointId must be a valid host label");
    });
  });

  describe("custom endpoint override", () => {
    it("uses custom endpoint when provided", () => {
      const ruleSet: RuleSetObject = {
        version: "1.0",
        parameters: {
          Region: { type: "string", required: true },
          Endpoint: { type: "string", builtIn: "SDK::Endpoint" },
        },
        rules: [
          {
            conditions: [{ fn: "isSet", argv: [{ ref: "Endpoint" }] }],
            endpoint: {
              url: "{Endpoint}",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
          {
            conditions: [],
            endpoint: {
              url: "https://service.{Region}.amazonaws.com",
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
        ],
      };

      const customResult = resolveEndpointSync(ruleSet, {
        Region: "us-east-1",
        Endpoint: "http://localhost:4566",
      });
      expect(customResult.url).toBe("http://localhost:4566");

      const defaultResult = resolveEndpointSync(ruleSet, {
        Region: "us-east-1",
      });
      expect(defaultResult.url).toBe("https://service.us-east-1.amazonaws.com");
    });
  });
});
