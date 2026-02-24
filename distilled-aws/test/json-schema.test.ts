import { describe, expect, it } from "@effect/vitest";
import { JsonSchema } from "effect";
import * as S from "effect/Schema";

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

const toJsonSchema = (schema: S.Top) =>
  JsonSchema.toSchemaDraft07(S.toJsonSchemaDocument(schema).schema);

describe("JSON Schema Generation", () => {
  describe("Primitive Types", () => {
    it("GetUserRequest - simple string fields", () => {
      expect(toJsonSchema(GetUserRequest)).toMatchSnapshot();
    });

    it("ListFunctionsRequest - optional string and number fields", () => {
      expect(toJsonSchema(ListFunctionsRequest)).toMatchSnapshot();
    });

    it("EncryptRequest - blob types, required fields, booleans", () => {
      expect(toJsonSchema(EncryptRequest)).toMatchSnapshot();
    });
  });

  describe("Suspended Struct Schemas", () => {
    it("MessageAttributeValue - suspended struct", () => {
      expect(toJsonSchema(MessageAttributeValue)).toMatchSnapshot();
    });

    it("GetItemInput - operation input with traits", () => {
      expect(toJsonSchema(GetItemInput)).toMatchSnapshot();
    });

    it("GetItemOutput - operation output", () => {
      expect(toJsonSchema(GetItemOutput)).toMatchSnapshot();
    });
  });

  describe("Cyclic Types", () => {
    it("AttributeValue - self-referential union", () => {
      expect(toJsonSchema(AttributeValue)).toMatchSnapshot();
    });

    it("Key - record containing cyclic AttributeValue", () => {
      expect(toJsonSchema(Key)).toMatchSnapshot();
    });

    it("Condition - cyclic struct", () => {
      expect(toJsonSchema(Condition)).toMatchSnapshot();
    });
  });

  describe("Map/Record Types", () => {
    it("MessageAttributeMap - record with struct values", () => {
      expect(toJsonSchema(MessageAttributeMap)).toMatchSnapshot();
    });
  });

  describe("List/Array Types", () => {
    it("ObjectList - list of structs", () => {
      expect(toJsonSchema(ObjectList)).toMatchSnapshot();
    });

    it("ListObjectsV2Output - struct containing lists", () => {
      expect(toJsonSchema(ListObjectsV2Output)).toMatchSnapshot();
    });

    it("ListUsersResponse - nested list response", () => {
      expect(toJsonSchema(ListUsersResponse)).toMatchSnapshot();
    });
  });

  describe("Error Schemas (TaggedError)", () => {
    it("ResourceNotFoundException - DynamoDB error", () => {
      expect(toJsonSchema(ResourceNotFoundException)).toMatchSnapshot();
    });

    it("BucketAlreadyExists - S3 error", () => {
      expect(toJsonSchema(BucketAlreadyExists)).toMatchSnapshot();
    });
  });

  describe("Complex Nested Structures", () => {
    it("DescribeInstancesResult - deeply nested", () => {
      expect(toJsonSchema(DescribeInstancesResult)).toMatchSnapshot();
    });

    it("Instance - dozens of optional fields", () => {
      expect(toJsonSchema(Instance)).toMatchSnapshot();
    });

    it("CreateFunctionRequest - many fields including blobs", () => {
      expect(toJsonSchema(CreateFunctionRequest)).toMatchSnapshot();
    });
  });

  describe("Protocol-Specific Schemas", () => {
    describe("restJson1 (Lambda)", () => {
      it("GetFunctionRequest", () => {
        expect(toJsonSchema(GetFunctionRequest)).toMatchSnapshot();
      });

      it("ListFunctionsResponse", () => {
        expect(toJsonSchema(ListFunctionsResponse)).toMatchSnapshot();
      });
    });

    describe("restXml (S3)", () => {
      it("HeadObjectRequest", () => {
        expect(toJsonSchema(HeadObjectRequest)).toMatchSnapshot();
      });

      it("DeleteObjectRequest", () => {
        expect(toJsonSchema(DeleteObjectRequest)).toMatchSnapshot();
      });

      it("ListBucketsOutput", () => {
        expect(toJsonSchema(ListBucketsOutput)).toMatchSnapshot();
      });

      it("CopyObjectRequest", () => {
        expect(toJsonSchema(CopyObjectRequest)).toMatchSnapshot();
      });
    });

    describe("awsJson1_0 (DynamoDB)", () => {
      it("QueryInput", () => {
        expect(toJsonSchema(QueryInput)).toMatchSnapshot();
      });

      it("ScanInput", () => {
        expect(toJsonSchema(ScanInput)).toMatchSnapshot();
      });

      it("PutItemInput", () => {
        expect(toJsonSchema(PutItemInput)).toMatchSnapshot();
      });

      it("BatchGetItemInput", () => {
        expect(toJsonSchema(BatchGetItemInput)).toMatchSnapshot();
      });
    });

    describe("awsJson1_1 (KMS)", () => {
      it("CreateKeyRequest", () => {
        expect(toJsonSchema(CreateKeyRequest)).toMatchSnapshot();
      });

      it("DecryptRequest", () => {
        expect(toJsonSchema(DecryptRequest)).toMatchSnapshot();
      });
    });

    describe("awsQuery (IAM, SNS)", () => {
      it("CreateUserRequest", () => {
        expect(toJsonSchema(CreateUserRequest)).toMatchSnapshot();
      });

      it("GetUserResponse", () => {
        expect(toJsonSchema(GetUserResponse)).toMatchSnapshot();
      });

      it("PublishInput", () => {
        expect(toJsonSchema(PublishInput)).toMatchSnapshot();
      });

      it("ListAttachedRolePoliciesResponse", () => {
        expect(
          toJsonSchema(ListAttachedRolePoliciesResponse),
        ).toMatchSnapshot();
      });
    });

    describe("ec2Query (EC2)", () => {
      it("DescribeInstancesRequest", () => {
        expect(toJsonSchema(DescribeInstancesRequest)).toMatchSnapshot();
      });

      it("RunInstancesRequest", () => {
        expect(toJsonSchema(RunInstancesRequest)).toMatchSnapshot();
      });

      it("TerminateInstancesRequest", () => {
        expect(toJsonSchema(TerminateInstancesRequest)).toMatchSnapshot();
      });
    });
  });

  describe("Edge Cases", () => {
    it("empty struct schema", () => {
      expect(toJsonSchema(S.Struct({}))).toMatchSnapshot();
    });

    it("Reservation - deeply nested optional chains", () => {
      expect(toJsonSchema(Reservation)).toMatchSnapshot();
    });

    it("User - mixed primitive and complex fields", () => {
      expect(toJsonSchema(User)).toMatchSnapshot();
    });
  });
});
