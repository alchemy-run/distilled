/**
 * AwsProtocol.call against the encode -> execute -> decode path it replaces:
 * the same request on the wire and the same result or error, for operations
 * of every wire protocol, with and without strict validation.
 */
import * as API from "@distilled.cloud/core/api";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import * as Credentials from "../src/credentials.browser.ts";
import * as Endpoint from "../src/endpoint.ts";
import { AwsProtocol } from "../src/protocol.ts";
import * as Retry from "../src/retry.ts";
import * as DynamoDB from "../src/services/dynamodb.ts";
import * as EC2 from "../src/services/ec2.ts";
import * as KMS from "../src/services/kms.ts";
import * as Lambda from "../src/services/lambda.ts";
import * as S3 from "../src/services/s3.ts";
import * as STS from "../src/services/sts.ts";

interface Canned {
  readonly status: number;
  readonly headers?: Record<string, string>;
  readonly body: string;
}

/** What went over the wire, without the tracing headers HttpClient adds. */
const wire = (request: HttpClientRequest.HttpClientRequest) => {
  const {
    b3: _b3,
    traceparent: _traceparent,
    ...headers
  } = request.headers as Record<string, string>;
  const body = request.body;
  return {
    method: request.method,
    url: request.url,
    headers,
    body: body._tag === "Uint8Array" ? Buffer.from(body.body).toString() : (body._tag as string),
  };
};

const run = async (
  effect: (
    send: (request: HttpClientRequest.HttpClientRequest) => void,
  ) => Effect.Effect<unknown, unknown, any>,
  canned: Canned,
  layer: Layer.Layer<never> = Layer.empty,
) => {
  const sent: unknown[] = [];
  const client = HttpClient.make((request) =>
    Effect.sync(() => {
      sent.push(wire(request));
      return HttpClientResponse.fromWeb(
        request,
        new Response(canned.status === 204 ? null : canned.body, {
          status: canned.status,
          headers: canned.headers,
        }),
      );
    }),
  );
  const exit = await Effect.runPromiseExit(
    effect((r) => sent.push(r)).pipe(
      Retry.none,
      Effect.provide(layer),
      Effect.provide(
        Layer.mergeAll(
          Credentials.fromCredentials(
            {
              accessKeyId: Redacted.make("AKIDEXAMPLE"),
              secretAccessKey: Redacted.make("secret"),
              sessionToken: Redacted.make("token"),
            },
            "us-west-2",
          ),
          Layer.succeed(HttpClient.HttpClient, client),
        ),
      ),
    ) as Effect.Effect<unknown, unknown>,
  );
  return {
    sent,
    exit: Exit.isSuccess(exit)
      ? { value: exit.value }
      : {
          cause: JSON.parse(
            JSON.stringify(exit.cause, (_, v) =>
              v instanceof Error ? { ...v, message: v.message, name: v.name } : v,
            ),
          ),
        },
  };
};

const protocol = Effect.runSync(
  Effect.scoped(Effect.map(Layer.build(AwsProtocol), (ctx) => Context.get(ctx, API.Protocol))),
);

/** The operation through encode -> HttpClient -> decode, as before `call`. */
const viaEncodeDecode = (op: any, input: unknown) => {
  const config = {
    input: op.input,
    output: op.output,
    errors: op.errors,
    operationName: op.operationName,
  };
  return Effect.flatMap(HttpClient.HttpClient, (client) =>
    Effect.flatMap(protocol.encode({ input, inputAst: op.input.ast, config }), (request) =>
      Effect.flatMap(client.execute(request), (response) =>
        protocol.decode({ response, outputAst: op.output.ast, errors: op.errors, config }),
      ),
    ),
  );
};

const cases: Array<{
  readonly name: string;
  readonly op: any;
  readonly input: unknown;
  readonly responses: ReadonlyArray<Canned>;
}> = [
  {
    name: "S3 listBuckets (restXml)",
    op: S3.listBuckets,
    input: { MaxBuckets: 5, Prefix: "a b/c'" },
    responses: [
      {
        status: 200,
        body: `<?xml version="1.0" encoding="UTF-8"?><ListAllMyBucketsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>1</ID></Owner><Buckets><Bucket><Name>b</Name><CreationDate>2025-01-01T00:00:00.000Z</CreationDate></Bucket><Bucket><Name>c &amp; d</Name></Bucket></Buckets></ListAllMyBucketsResult>`,
      },
      { status: 200, body: "<not xml" },
      { status: 200, body: "" },
      {
        status: 403,
        body: "<Error><Code>AccessDenied</Code><Message>no</Message></Error>",
      },
      { status: 503, body: "<html><li>Code: SlowDown</li><li>Message: slow</li></html>" },
    ],
  },
  {
    name: "S3 headObject (restXml, labels and headers)",
    op: S3.headObject,
    input: { Bucket: "my-bucket", Key: "dir/a b+c~é.txt", VersionId: "v'1", Range: "bytes=0-1" },
    responses: [
      {
        status: 200,
        headers: {
          "content-length": "0",
          etag: '"e"',
          "x-amz-meta-k": "v",
          "last-modified": "Wed, 01 Jan 2025 00:00:00 GMT",
        },
        body: "",
      },
      { status: 404, headers: { "content-length": "0" }, body: "" },
    ],
  },
  {
    name: "Lambda listFunctions (restJson1)",
    op: Lambda.listFunctions,
    input: { MaxItems: 2, Marker: "m/1 2" },
    responses: [
      {
        status: 200,
        body: `{"Functions":[{"FunctionName":"f","LastModified":"x","Timeout":3}],"NextMarker":null}`,
      },
      { status: 200, body: "{bad" },
      {
        status: 429,
        headers: { "x-amzn-errortype": "TooManyRequestsException:http://x/" },
        body: `{"message":"slow","retryAfterSeconds":"2"}`,
      },
    ],
  },
  {
    name: "DynamoDB listTables (awsJson1_0)",
    op: DynamoDB.listTables,
    input: { Limit: 3, ExclusiveStartTableName: "t" },
    responses: [
      { status: 200, body: `{"TableNames":["a","b"],"LastEvaluatedTableName":"b"}` },
      {
        status: 400,
        body: `{"__type":"com.amazonaws.dynamodb.v20120810#ResourceNotFoundException","message":"x"}`,
      },
      { status: 500, body: "" },
    ],
  },
  {
    name: "KMS listKeys (awsJson1_1)",
    op: KMS.listKeys,
    input: {},
    responses: [
      { status: 200, body: `{"Keys":[{"KeyId":"k","KeyArn":"arn"}],"Truncated":false}` },
      { status: 200, body: `{"Keys":"not a list"}` },
    ],
  },
  {
    name: "STS getCallerIdentity (awsQuery)",
    op: STS.getCallerIdentity,
    input: {},
    responses: [
      {
        status: 200,
        body: `<GetCallerIdentityResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/"><GetCallerIdentityResult><Arn>arn</Arn><UserId>u</UserId><Account>1</Account></GetCallerIdentityResult><ResponseMetadata><RequestId>1</RequestId></ResponseMetadata></GetCallerIdentityResponse>`,
      },
      {
        status: 403,
        body: `<ErrorResponse><Error><Type>Sender</Type><Code>ExpiredToken</Code><Message>old</Message></Error><RequestId>r</RequestId></ErrorResponse>`,
      },
    ],
  },
  {
    name: "EC2 describeRegions (ec2Query)",
    op: EC2.describeRegions,
    input: { RegionNames: ["us-east-1", "eu west"], AllRegions: true },
    responses: [
      {
        status: 200,
        body: `<DescribeRegionsResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/"><requestId>1</requestId><regionInfo><item><regionName>us-east-1</regionName><regionEndpoint>e</regionEndpoint></item></regionInfo></DescribeRegionsResponse>`,
      },
      {
        status: 400,
        body: `<Response><Errors><Error><Code>InvalidParameterValue</Code><Message>bad</Message></Error></Errors><RequestID>r</RequestID></Response>`,
      },
    ],
  },
];

describe("AwsProtocol.call", () => {
  // Both paths sign with the current time: pin it.
  beforeAll(() => {
    vi.useFakeTimers({ toFake: ["Date"], now: Date.UTC(2026, 0, 2, 3, 4, 5) });
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  for (const { name, op, input, responses } of cases) {
    for (const [i, canned] of responses.entries()) {
      for (const [mode, layer] of [
        ["lenient", Layer.empty],
        ["strict", ResponseValidation.strict],
        ["custom endpoint", Endpoint.of("http://localhost:4566")],
      ] as const) {
        test(`${name}, response ${i}, ${mode}`, async () => {
          const before = await run(() => viaEncodeDecode(op, input), canned, layer);
          const after = await run(() => op(input), canned, layer);
          expect(after.sent).toEqual(before.sent);
          expect(after.sent.length).toBe(1);
          expect(after.exit).toEqual(before.exit);
        });
      }
    }
  }
});

describe("S3 InvalidAccessKeyId", () => {
  // Declared on every S3 operation (patches/s3.json `allOperations`).
  // What S3 answers when the request is signed with an access key it does not know.
  const invalidKey: Canned = {
    status: 403,
    body: "<Error><Code>InvalidAccessKeyId</Code><Message>The AWS Access Key Id you provided does not exist in our records.</Message><AWSAccessKeyId>AKIDEXAMPLE</AWSAccessKeyId><RequestId>r</RequestId></Error>",
  };
  const object = { Bucket: "my-bucket", Key: "k" };
  const upload = { ...object, UploadId: "u" };
  for (const [name, call] of [
    ["getObject", () => S3.getObject(object)],
    ["putObject", () => S3.putObject(object)],
    ["deleteObject", () => S3.deleteObject(object)],
    [
      "deleteObjects",
      () => S3.deleteObjects({ Bucket: "my-bucket", Delete: { Objects: [{ Key: "k" }] } }),
    ],
    ["listObjectsV2", () => S3.listObjectsV2({ Bucket: "my-bucket" })],
    ["createMultipartUpload", () => S3.createMultipartUpload(object)],
    ["uploadPart", () => S3.uploadPart({ ...upload, PartNumber: 1 })],
    ["completeMultipartUpload", () => S3.completeMultipartUpload(upload)],
    ["listParts", () => S3.listParts(upload)],
    ["abortMultipartUpload", () => S3.abortMultipartUpload(upload)],
    ["listMultipartUploads", () => S3.listMultipartUploads({ Bucket: "my-bucket" })],
    // Bucket and account operations: S3 checks the key before the operation.
    ["listBuckets", () => S3.listBuckets({})],
    ["getBucketPolicy", () => S3.getBucketPolicy({ Bucket: "my-bucket" })],
    ["copyObject", () => S3.copyObject({ ...object, CopySource: "other-bucket/k" })],
  ] as const) {
    test(`${name} fails with the typed InvalidAccessKeyId error`, async () => {
      const { exit } = await run(
        () => Effect.flip(call() as Effect.Effect<unknown, any, any>),
        invalidKey,
      );
      expect((exit as { value: { _tag: string } }).value._tag).toBe("InvalidAccessKeyId");
    });
  }
});
