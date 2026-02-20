import { describe, expect, it } from "@effect/vitest";
import { JsonSchema } from "effect";
import * as S from "effect/Schema";

// =============================================================================
// Import real generated schemas from various services to test all schema types
// =============================================================================

// DynamoDB - awsJson1_0, has cyclic types (AttributeValue), maps, lists
import {
  AttributeValue,
  BatchGetItemInput,
  Condition,
  GetItemInput,
  GetItemOutput,
  Key,
  PutItemInput,
  QueryInput,
  ResourceNotFoundException,
  ScanInput,
} from "../src/services/dynamodb.ts";

// SNS - awsQuery, has map types with struct values
import {
  MessageAttributeMap,
  MessageAttributeValue,
  PublishInput,
} from "../src/services/sns.ts";

// S3 - restXml, has complex structures with XML traits
// Note: GetObjectInput/PutObjectInput have streaming body which doesn't work with JsonSchema
import {
  BucketAlreadyExists,
  CopyObjectRequest,
  DeleteObjectRequest,
  HeadObjectRequest,
  ListBucketsOutput,
  ListObjectsV2Output,
  ObjectList,
} from "../src/services/s3.ts";

// Lambda - restJson1, has blob types and streaming
// Note: InvokeRequest has streaming body which doesn't work with JsonSchema
import {
  CreateFunctionRequest,
  GetFunctionRequest,
  ListFunctionsRequest,
  ListFunctionsResponse,
} from "../src/services/lambda.ts";

// IAM - awsQuery, has list types and complex nested structures
import {
  CreateUserRequest,
  GetUserRequest,
  GetUserResponse,
  ListAttachedRolePoliciesResponse,
  ListUsersResponse,
  User,
} from "../src/services/iam.ts";

// EC2 - ec2Query, has extensive enum-like strings and complex structures
import {
  DescribeInstancesRequest,
  DescribeInstancesResult,
  Instance,
  Reservation,
  RunInstancesRequest,
  TerminateInstancesRequest,
} from "../src/services/ec2.ts";

// KMS - awsJson1_1, simpler structures
import {
  CreateKeyRequest,
  DecryptRequest,
  EncryptRequest,
} from "../src/services/kms.ts";

// =============================================================================
// Test helpers
// =============================================================================

/**
 * Helper to verify JSON Schema structure
 */
const toJsonSchema = (schema: S.Top) => {
  const jsonSchema = JsonSchema.toSchemaDraft07(
    S.toJsonSchemaDocument(schema).schema,
  );
  // console.log(JSON.stringify(S.toJsonSchemaDocument(schema), null, 2));
  console.log(JSON.stringify(jsonSchema, null, 2));
  return jsonSchema as any;
};

// =============================================================================
// Tests
// =============================================================================

describe("JSON Schema Generation", () => {
  describe("Primitive Types", () => {
    it("generates JSON Schema for basic struct with primitives", () => {
      // GetUserRequest has simple string fields
      const schema = toJsonSchema(GetUserRequest);
      expect(schema).toEqual({
        type: "object",
        properties: {
          UserName: {
            anyOf: [
              {
                type: "string",
              },
              {
                type: "null",
              },
            ],
          },
        },
        additionalProperties: false,
      });
    });

    it("generates JSON Schema for struct with optional fields", () => {
      // ListFunctionsRequest has optional string and number fields
      const schema = toJsonSchema(ListFunctionsRequest);
      expect(schema).toEqual({
        type: "object",
        properties: {
          MasterRegion: {
            anyOf: [
              {
                $ref: "#/definitions/String_",
              },
              {
                $ref: "#/definitions/Undefined_",
              },
            ],
          },
          FunctionVersion: {
            anyOf: [
              {
                $ref: "#/definitions/String_",
              },
              {
                $ref: "#/definitions/Undefined_",
              },
            ],
          },
          Marker: {
            anyOf: [
              {
                $ref: "#/definitions/String_",
              },
              {
                $ref: "#/definitions/Undefined_",
              },
            ],
          },
          MaxItems: {
            anyOf: [
              {
                anyOf: [
                  {
                    type: "number",
                  },
                  {
                    type: "string",
                    enum: ["NaN"],
                  },
                  {
                    type: "string",
                    enum: ["Infinity"],
                  },
                  {
                    type: "string",
                    enum: ["-Infinity"],
                  },
                ],
              },
              {
                $ref: "#/definitions/Undefined_",
              },
            ],
          },
        },
        additionalProperties: false,
      });
    });

    it("generates JSON Schema for blob types", () => {
      // EncryptRequest has a Plaintext blob field
      const schema = toJsonSchema(EncryptRequest);
      expect(schema).toEqual({
        type: "object",
        properties: {
          KeyId: {
            $ref: "#/definitions/String_",
          },
          Plaintext: {
            $ref: "#/definitions/String_",
          },
          EncryptionContext: {
            anyOf: [
              {
                type: "object",
                additionalProperties: {
                  anyOf: [
                    {
                      $ref: "#/definitions/String_",
                    },
                    {
                      $ref: "#/definitions/Undefined_",
                    },
                  ],
                },
              },
              {
                $ref: "#/definitions/Undefined_",
              },
            ],
          },
          GrantTokens: {
            anyOf: [
              {
                type: "array",
                items: {
                  $ref: "#/definitions/String_",
                },
              },
              {
                $ref: "#/definitions/Undefined_",
              },
            ],
          },
          EncryptionAlgorithm: {
            anyOf: [
              {
                $ref: "#/definitions/String_",
              },
              {
                $ref: "#/definitions/Undefined_",
              },
            ],
          },
          DryRun: {
            anyOf: [
              {
                type: "boolean",
              },
              {
                $ref: "#/definitions/Undefined_",
              },
            ],
          },
        },
        required: ["KeyId", "Plaintext"],
        additionalProperties: false,
      });
    });
  });

  describe("Suspended Struct Schemas", () => {
    it("generates JSON Schema for simple suspended struct", () => {
      // MessageAttributeValue is a suspended struct
      const schema = toJsonSchema(MessageAttributeValue);
      expect(schema).toEqual({
        type: "object",
        properties: {
          DataType: {
            $ref: "#/definitions/String_",
          },
          StringValue: {
            anyOf: [
              {
                $ref: "#/definitions/String_",
              },
              {
                $ref: "#/definitions/Undefined_",
              },
            ],
          },
          BinaryValue: {
            anyOf: [
              {
                $ref: "#/definitions/String_",
              },
              {
                $ref: "#/definitions/Undefined_",
              },
            ],
          },
        },
        required: ["DataType"],
        additionalProperties: false,
      });
    });

    it("generates JSON Schema for operation input (suspended struct with traits)", () => {
      // GetItemInput is an operation input with HTTP/service traits
      const schema = toJsonSchema(GetItemInput);
      expect(schema.$defs).toHaveProperty("GetItemInput");
    });

    it("generates JSON Schema for operation output (suspended struct)", () => {
      // GetItemOutput is an operation output
      const schema = toJsonSchema(GetItemOutput);
      expect(schema).toHaveProperty("$defs");
    });
  });

  describe("Cyclic Types", () => {
    it("generates JSON Schema for self-referential union (AttributeValue)", () => {
      // AttributeValue references itself in its list/map members
      const schema = toJsonSchema(AttributeValue);
      expect(schema.$defs).toHaveProperty("AttributeValue");
    });

    it("generates JSON Schema for struct containing cyclic type", () => {
      // GetItemInput contains Key which contains AttributeValue
      const schema = toJsonSchema(GetItemInput);
      expect(schema.$defs).toHaveProperty("GetItemInput");
    });

    it("generates JSON Schema for Condition (cyclic struct)", () => {
      // Condition is a cyclic struct
      const schema = toJsonSchema(Condition);
      expect(schema.$defs).toHaveProperty("Condition");
    });
  });

  describe("Map/Record Types", () => {
    it("generates JSON Schema for simple record with primitive values", () => {
      // Key is a Record<string, AttributeValue>
      const schema = toJsonSchema(Key);
      expect(schema).toHaveProperty("$defs");
    });

    it("generates JSON Schema for record with struct values and traits", () => {
      // MessageAttributeMap has struct values with XmlName traits
      const schema = toJsonSchema(MessageAttributeMap);
      expect(schema.$defs).toHaveProperty("MessageAttributeValue");
    });
  });

  describe("List/Array Types", () => {
    it("generates JSON Schema for list of structs", () => {
      // ObjectList is an array of S3Object
      const schema = toJsonSchema(ObjectList);
      expect(schema).toHaveProperty("$defs");
    });

    it("generates JSON Schema for struct containing lists", () => {
      // ListObjectsV2Output has Contents which is ObjectList
      const schema = toJsonSchema(ListObjectsV2Output);
      expect(schema).toHaveProperty("$defs");
    });

    it("generates JSON Schema for nested list responses", () => {
      // ListUsersResponse has Users list
      const schema = toJsonSchema(ListUsersResponse);
      expect(schema).toHaveProperty("$defs");
    });
  });

  describe("Union Types", () => {
    it("generates JSON Schema for union with struct members", () => {
      // AttributeValue is a union with many typed members
      const schema = toJsonSchema(AttributeValue);
      expect(schema.$defs?.AttributeValue).toBeDefined();
    });
  });

  describe("Error Schemas (TaggedError)", () => {
    it("generates JSON Schema for error class", () => {
      // ResourceNotFoundException is a TaggedError
      const schema = toJsonSchema(ResourceNotFoundException);
      expect(schema).toHaveProperty("$defs");
    });

    it("generates JSON Schema for S3 error class", () => {
      // BucketAlreadyExists is an S3 error
      const schema = toJsonSchema(BucketAlreadyExists);
      expect(schema).toHaveProperty("$defs");
    });
  });

  describe("Complex Nested Structures", () => {
    it("generates JSON Schema for deeply nested structures", () => {
      // DescribeInstancesResult has Reservations -> Instances -> many fields
      const schema = toJsonSchema(DescribeInstancesResult);
      expect(schema).toHaveProperty("$defs");
    });

    it("generates JSON Schema for struct with many optional fields", () => {
      // Instance has dozens of optional fields
      const schema = toJsonSchema(Instance);
      expect(schema).toHaveProperty("$defs");
    });

    it("generates JSON Schema for complex creation request", () => {
      // CreateFunctionRequest has many fields including blobs
      const schema = toJsonSchema(CreateFunctionRequest);
      expect(schema).toHaveProperty("$defs");
    });
  });

  describe("Protocol-Specific Schemas", () => {
    describe("restJson1 (Lambda)", () => {
      it("generates JSON Schema for Lambda GetFunction request", () => {
        // Note: InvokeRequest has streaming body which doesn't support JsonSchema
        const schema = toJsonSchema(GetFunctionRequest);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for Lambda list functions response", () => {
        const schema = toJsonSchema(ListFunctionsResponse);
        expect(schema).toHaveProperty("$defs");
      });
    });

    describe("restXml (S3)", () => {
      it("generates JSON Schema for S3 HeadObject request", () => {
        // Note: GetObjectInput/PutObjectInput have streaming body which doesn't support JsonSchema
        const schema = toJsonSchema(HeadObjectRequest);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for S3 DeleteObject request", () => {
        const schema = toJsonSchema(DeleteObjectRequest);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for S3 ListBuckets output", () => {
        const schema = toJsonSchema(ListBucketsOutput);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for S3 CopyObject request", () => {
        const schema = toJsonSchema(CopyObjectRequest);
        expect(schema).toHaveProperty("$defs");
      });
    });

    describe("awsJson1_0 (DynamoDB)", () => {
      it("generates JSON Schema for DynamoDB Query input", () => {
        const schema = toJsonSchema(QueryInput);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for DynamoDB Scan input", () => {
        const schema = toJsonSchema(ScanInput);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for DynamoDB PutItem input", () => {
        const schema = toJsonSchema(PutItemInput);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for DynamoDB BatchGetItem input", () => {
        const schema = toJsonSchema(BatchGetItemInput);
        expect(schema).toHaveProperty("$defs");
      });
    });

    describe("awsJson1_1 (KMS)", () => {
      it("generates JSON Schema for KMS CreateKey request", () => {
        const schema = toJsonSchema(CreateKeyRequest);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for KMS Encrypt request", () => {
        const schema = toJsonSchema(EncryptRequest);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for KMS Decrypt request", () => {
        const schema = toJsonSchema(DecryptRequest);
        expect(schema).toHaveProperty("$defs");
      });
    });

    describe("awsQuery (IAM, SNS)", () => {
      it("generates JSON Schema for IAM CreateUser request", () => {
        const schema = toJsonSchema(CreateUserRequest);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for IAM GetUser response", () => {
        const schema = toJsonSchema(GetUserResponse);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for SNS Publish input", () => {
        const schema = toJsonSchema(PublishInput);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for IAM ListAttachedRolePolicies response", () => {
        const schema = toJsonSchema(ListAttachedRolePoliciesResponse);
        expect(schema).toHaveProperty("$defs");
      });
    });

    describe("ec2Query (EC2)", () => {
      it("generates JSON Schema for EC2 DescribeInstances request", () => {
        const schema = toJsonSchema(DescribeInstancesRequest);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for EC2 RunInstances request", () => {
        const schema = toJsonSchema(RunInstancesRequest);
        expect(schema).toHaveProperty("$defs");
      });

      it("generates JSON Schema for EC2 TerminateInstances request", () => {
        const schema = toJsonSchema(TerminateInstancesRequest);
        expect(schema).toHaveProperty("$defs");
      });
    });
  });

  describe("Schema Content Validation", () => {
    it("includes correct $defs for struct schemas", () => {
      const schema = toJsonSchema(GetItemInput);
      expect(schema.$defs?.GetItemInput).toHaveProperty("type", "object");
      expect(schema.$defs?.GetItemInput).toHaveProperty("properties");
    });

    it("includes required array for non-optional fields", () => {
      const schema = toJsonSchema(GetItemInput);
      const def = schema.$defs?.GetItemInput as {
        required?: string[];
        properties?: Record<string, unknown>;
      };
      expect(def?.required).toContain("TableName");
      expect(def?.required).toContain("Key");
    });

    it("marks optional fields correctly", () => {
      const schema = toJsonSchema(GetItemInput);
      const def = schema.$defs?.GetItemInput as {
        required?: string[];
        properties?: Record<string, unknown>;
      };
      // ConsistentRead is optional
      expect(def?.required).not.toContain("ConsistentRead");
      expect(def?.properties).toHaveProperty("ConsistentRead");
    });

    it("generates $ref for nested schema references", () => {
      const schema = toJsonSchema(GetItemInput);
      // The schema should have definitions for complex cyclic types like AttributeValue
      expect(schema.$defs).toHaveProperty("AttributeValue");
      // Simple records like Key may be inlined rather than referenced
      expect(schema.$defs).toHaveProperty("GetItemInput");
    });

    it("handles array types correctly", () => {
      const schema = toJsonSchema(ObjectList);
      // ObjectList should be an array type with $defs
      expect(schema).toHaveProperty("$defs");
      expect(schema).toHaveProperty("$schema");
    });

    it("handles record/map types correctly", () => {
      const schema = toJsonSchema(Key);
      // Key is Record<string, AttributeValue>
      expect(schema).toHaveProperty("$defs");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty struct schemas", () => {
      // Some Unit-based inputs/outputs generate empty structs
      const emptyStruct = S.Struct({});
      const schema = toJsonSchema(emptyStruct);
      expect(schema).toHaveProperty("$schema");
      // Effect Schema represents empty struct as anyOf [object, array]
      expect(schema).toHaveProperty("anyOf");
    });

    it("handles deeply nested optional chains", () => {
      // Reservation -> Instances -> Instance (many levels)
      const schema = toJsonSchema(Reservation);
      expect(schema).toHaveProperty("$defs");
    });

    it("handles mixed primitive and complex fields", () => {
      // User has strings, dates, and nested structures
      const schema = toJsonSchema(User);
      expect(schema).toHaveProperty("$defs");
    });
  });
});
