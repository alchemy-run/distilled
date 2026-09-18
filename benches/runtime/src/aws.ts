/**
 * AWS runtime cases — one service per Smithy wire protocol family:
 *
 *   S3       rest-xml    ListBuckets (list) / HeadObject (metadata-style GET)
 *   DynamoDB aws-json    GetItem / PutItem
 *   Lambda   rest-json   GetFunction / Invoke (small payload)
 *   STS      aws-query   GetCallerIdentity
 *
 * Stages:
 *   encode       Schema.encodeUnknownSync(input schema)         — codec only
 *   decode       Schema.decodeUnknownSync(output schema)        — codec only, on parsed data
 *   wire-decode  makeResponseParser(op)(string body)            — XML/JSON parse + protocol
 *                                                                 deserialize + schema decode
 *   build        makeRequestBuilder(op)(input)                  — protocol serialize + middleware,
 *                                                                 no endpoint/signing
 *   call         op(input) via AwsProtocol + mocked HttpClient  — endpoint rules, SigV4,
 *                                                                 retry wrapper, deserialize, decode
 *   call-error   non-2xx canned body → typed error class
 *
 * Deep imports (`@distilled.cloud/aws/<service>`) so only the four service
 * modules load, matching how alchemy consumes the SDK.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as HttpClient from "effect/unstable/http/HttpClient";

import * as Credentials from "@distilled.cloud/aws/Credentials";
// The request builder is internal to the AWS package (not in its export map);
// reach it through the workspace so the "build" stage times the real
// serializer the protocol layer uses.
import { makeRequestBuilder } from "../../../packages/aws/src/client/request-builder.ts";
import { makeResponseParser } from "../../../packages/aws/src/client/response-parser.ts";
import type { Operation } from "../../../packages/aws/src/client/operation.ts";
import * as DynamoDB from "@distilled.cloud/aws/dynamodb";
import * as Lambda from "@distilled.cloud/aws/lambda";
import * as S3 from "@distilled.cloud/aws/s3";
import * as STS from "@distilled.cloud/aws/sts";

import {
  type Case,
  buildLayer,
  decoder,
  encoder,
  mockHttpLayer,
  runPromise,
  runSync,
} from "./harness.ts";

//#region Fixtures

const listBucketsXml = `<?xml version="1.0" encoding="UTF-8"?>
<ListAllMyBucketsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Owner><ID>1234567890abcdef</ID><DisplayName>alchemy</DisplayName></Owner>
  <Buckets>
${Array.from(
  { length: 20 },
  (_, i) =>
    `    <Bucket><Name>alchemy-bucket-${i}</Name><CreationDate>2025-01-0${(i % 9) + 1}T12:34:56.000Z</CreationDate><BucketRegion>us-east-1</BucketRegion></Bucket>`,
).join("\n")}
  </Buckets>
</ListAllMyBucketsResult>`;

const listBucketsDecoded = {
  Owner: { ID: "1234567890abcdef", DisplayName: "alchemy" },
  Buckets: Array.from({ length: 20 }, (_, i) => ({
    Name: `alchemy-bucket-${i}`,
    CreationDate: `2025-01-0${(i % 9) + 1}T12:34:56.000Z`,
    BucketRegion: "us-east-1",
  })),
};

const headObjectHeaders = {
  "content-length": "0",
  "content-type": "application/octet-stream",
  etag: '"d41d8cd98f00b204e9800998ecf8427e"',
  "last-modified": "Wed, 01 Jan 2025 12:34:56 GMT",
  "x-amz-request-id": "REQ123",
  "x-amz-id-2": "ID2",
  "x-amz-server-side-encryption": "AES256",
  "x-amz-meta-alchemy": "true",
};

const s3NoSuchBucketXml = `<?xml version="1.0" encoding="UTF-8"?>
<Error><Code>NoSuchBucket</Code><Message>The specified bucket does not exist</Message><BucketName>alchemy-missing</BucketName><RequestId>REQ123</RequestId><HostId>HOST</HostId></Error>`;

const dynamoItem = {
  pk: { S: "user#123" },
  sk: { S: "profile" },
  name: { S: "Alchemy" },
  age: { N: "42" },
  active: { BOOL: true },
  tags: { L: [{ S: "a" }, { S: "b" }, { S: "c" }] },
  address: {
    M: {
      street: { S: "1 Main St" },
      city: { S: "Springfield" },
      zip: { N: "12345" },
    },
  },
};

const getItemJson = JSON.stringify({
  Item: dynamoItem,
  ConsumedCapacity: { TableName: "alchemy-table", CapacityUnits: 0.5 },
});

const putItemJson = JSON.stringify({
  ConsumedCapacity: { TableName: "alchemy-table", CapacityUnits: 1 },
});

const dynamoNotFoundJson = JSON.stringify({
  __type: "com.amazonaws.dynamodb.v20120810#ResourceNotFoundException",
  message: "Requested resource not found: Table: alchemy-table not found",
});

const getFunctionJson = JSON.stringify({
  Configuration: {
    FunctionName: "alchemy-fn",
    FunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:alchemy-fn",
    Runtime: "nodejs22.x",
    Role: "arn:aws:iam::123456789012:role/alchemy-fn",
    Handler: "index.handler",
    CodeSize: 1234,
    Description: "",
    Timeout: 30,
    MemorySize: 256,
    LastModified: "2025-01-01T12:34:56.000+0000",
    CodeSha256: "abc123=",
    Version: "$LATEST",
    Environment: { Variables: { A: "1", B: "2", C: "3" } },
    TracingConfig: { Mode: "PassThrough" },
    RevisionId: "rev-1",
    State: "Active",
    LastUpdateStatus: "Successful",
    PackageType: "Zip",
    Architectures: ["arm64"],
    EphemeralStorage: { Size: 512 },
    SnapStart: { ApplyOn: "None", OptimizationStatus: "Off" },
    LoggingConfig: { LogFormat: "Text", LogGroup: "/aws/lambda/alchemy-fn" },
  },
  Code: {
    RepositoryType: "S3",
    Location:
      "https://awslambda-us-east-1-tasks.s3.us-east-1.amazonaws.com/snapshots/x",
  },
  Tags: { app: "alchemy", env: "bench" },
  Concurrency: { ReservedConcurrentExecutions: 10 },
});

const invokePayload = JSON.stringify({ hello: "world", n: 1 });
const invokeResponseBody = JSON.stringify({
  ok: true,
  echo: { hello: "world", n: 1 },
});

const callerIdentityXml = `<GetCallerIdentityResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/">
  <GetCallerIdentityResult>
    <Arn>arn:aws:iam::123456789012:user/alchemy</Arn>
    <UserId>AIDAEXAMPLE</UserId>
    <Account>123456789012</Account>
  </GetCallerIdentityResult>
  <ResponseMetadata><RequestId>01234567-89ab-cdef-0123-456789abcdef</RequestId></ResponseMetadata>
</GetCallerIdentityResponse>`;

//#endregion

//#region Inputs

const headObjectInput: S3.HeadObjectRequest = {
  Bucket: "alchemy-bucket",
  Key: "path/to/object.txt",
  IfNoneMatch: '"abc"',
};

const getItemInput: DynamoDB.GetItemInput = {
  TableName: "alchemy-table",
  Key: { pk: { S: "user#123" }, sk: { S: "profile" } },
  ConsistentRead: true,
};

const putItemInput: DynamoDB.PutItemInput = {
  TableName: "alchemy-table",
  Item: dynamoItem,
  ConditionExpression: "attribute_not_exists(pk)",
  ReturnConsumedCapacity: "TOTAL",
};

const getFunctionInput: Lambda.GetFunctionRequest = {
  FunctionName: "alchemy-fn",
};

const invokeInput: Lambda.InvocationRequest = {
  FunctionName: "alchemy-fn",
  InvocationType: "RequestResponse",
  Payload: invokePayload,
};

//#endregion

//#region Context

/**
 * Static mock credentials + mocked transport per canned response. The AWS
 * protocol reads Credentials and Region from the calling fiber's context on
 * every request, so this is exactly what a real caller would provide.
 */
const awsContext = (canned: {
  status?: number;
  headers?: Record<string, string>;
  body?: string;
}) => buildLayer(Layer.merge(Credentials.mock, mockHttpLayer(canned)));

type Ctx = Context.Context<Credentials.Credentials | HttpClient.HttpClient>;

const builder = (op: unknown) => makeRequestBuilder(op as Operation);

/** Sync wrapper around makeRequestBuilder: serialize-only, no signing. */
const build = (op: unknown) => {
  const b = builder(op);
  return (input: unknown) => runSync(b(input));
};

/**
 * Protocol deserialize + schema decode on a string body (XML/JSON parse
 * included), without the HttpClient/response-stream plumbing. This is the
 * "decode" cost a caller actually pays per response; the plain `decode`
 * stage is the schema codec alone on already-parsed data.
 */
const parse = (op: unknown, headers: Record<string, string>, body: string) => {
  const p = makeResponseParser(op as Operation, {});
  const response = { status: 200, statusText: "OK", headers, body };
  return () => runSync(p(response));
};

//#endregion

export const awsCases = async (): Promise<Case[]> => {
  const cases: Case[] = [];

  // -- S3 rest-xml -----------------------------------------------------------
  {
    const listCtx = await awsContext({
      headers: { "content-type": "application/xml" },
      body: listBucketsXml,
    });
    const headCtx = await awsContext({ headers: headObjectHeaders });
    const errCtx = await awsContext({
      status: 404,
      headers: { "content-type": "application/xml" },
      body: s3NoSuchBucketXml,
    });
    const encodeHead = encoder(S3.HeadObjectRequest);
    const encodeList = encoder(S3.ListBucketsRequest);
    const decodeList = decoder(S3.ListBucketsOutput);
    const buildHead = build(S3.headObject);
    const buildList = build(S3.listBuckets);
    const listInput: S3.ListBucketsRequest = {};
    const callList = (ctx: Ctx) => () =>
      runPromise(Effect.provideContext(S3.listBuckets(listInput), ctx));
    const callHead = (ctx: Ctx) => () =>
      runPromise(Effect.provideContext(S3.headObject(headObjectInput), ctx));
    const callHeadErr = () =>
      runPromise(
        Effect.provideContext(
          S3.headObject(headObjectInput).pipe(Effect.flip),
          errCtx,
        ),
      );

    cases.push(
      {
        provider: "aws",
        service: "s3",
        op: "ListBuckets",
        stage: "encode",
        note: "rest-xml, empty input",
        fn: () => encodeList(listInput),
      },
      {
        provider: "aws",
        service: "s3",
        op: "ListBuckets",
        stage: "decode",
        note: "rest-xml, 20 buckets (post-XML-parse)",
        fn: () => decodeList(listBucketsDecoded),
      },
      {
        provider: "aws",
        service: "s3",
        op: "ListBuckets",
        stage: "wire-decode",
        note: "XML parse + deserialize + decode, 20 buckets",
        fn: parse(
          S3.listBuckets,
          { "content-type": "application/xml" },
          listBucketsXml,
        ),
      },
      {
        provider: "aws",
        service: "s3",
        op: "ListBuckets",
        stage: "build",
        note: "rest-xml serialize",
        fn: () => buildList(listInput),
      },
      {
        provider: "aws",
        service: "s3",
        op: "ListBuckets",
        stage: "call",
        note: "rest-xml + SigV4, 20-bucket XML body",
        fn: callList(listCtx),
      },
      {
        provider: "aws",
        service: "s3",
        op: "HeadObject",
        stage: "encode",
        note: "rest-xml, labels+headers",
        fn: () => encodeHead(headObjectInput),
      },
      {
        provider: "aws",
        service: "s3",
        op: "HeadObject",
        stage: "build",
        note: "rest-xml serialize",
        fn: () => buildHead(headObjectInput),
      },
      {
        provider: "aws",
        service: "s3",
        op: "HeadObject",
        stage: "call",
        note: "rest-xml + SigV4, header-only 200",
        fn: callHead(headCtx),
      },
      {
        provider: "aws",
        service: "s3",
        op: "HeadObject",
        stage: "call-error",
        note: "404 NoSuchBucket → typed error",
        fn: callHeadErr,
      },
    );
  }

  // -- DynamoDB aws-json -----------------------------------------------------
  {
    const getCtx = await awsContext({
      headers: { "content-type": "application/x-amz-json-1.0" },
      body: getItemJson,
    });
    const putCtx = await awsContext({
      headers: { "content-type": "application/x-amz-json-1.0" },
      body: putItemJson,
    });
    const errCtx = await awsContext({
      status: 400,
      headers: { "content-type": "application/x-amz-json-1.0" },
      body: dynamoNotFoundJson,
    });
    const encodeGet = encoder(DynamoDB.GetItemInput);
    const encodePut = encoder(DynamoDB.PutItemInput);
    const decodeGet = decoder(DynamoDB.GetItemOutput);
    const decodePut = decoder(DynamoDB.PutItemOutput);
    const getItemDecoded = JSON.parse(getItemJson);
    const putItemDecoded = JSON.parse(putItemJson);
    const buildGet = build(DynamoDB.getItem);
    const buildPut = build(DynamoDB.putItem);

    cases.push(
      {
        provider: "aws",
        service: "dynamodb",
        op: "GetItem",
        stage: "encode",
        note: "aws-json 1.0, 2-attr key",
        fn: () => encodeGet(getItemInput),
      },
      {
        provider: "aws",
        service: "dynamodb",
        op: "GetItem",
        stage: "decode",
        note: "aws-json 1.0, 7-attr item (AttributeValue union)",
        fn: () => decodeGet(getItemDecoded),
      },
      {
        provider: "aws",
        service: "dynamodb",
        op: "GetItem",
        stage: "wire-decode",
        note: "JSON parse + deserialize + decode, 7-attr item",
        fn: parse(
          DynamoDB.getItem,
          { "content-type": "application/x-amz-json-1.0" },
          getItemJson,
        ),
      },
      {
        provider: "aws",
        service: "dynamodb",
        op: "GetItem",
        stage: "build",
        note: "aws-json serialize",
        fn: () => buildGet(getItemInput),
      },
      {
        provider: "aws",
        service: "dynamodb",
        op: "GetItem",
        stage: "call",
        note: "aws-json + SigV4, 7-attr item",
        fn: () =>
          runPromise(
            Effect.provideContext(DynamoDB.getItem(getItemInput), getCtx),
          ),
      },
      {
        provider: "aws",
        service: "dynamodb",
        op: "GetItem",
        stage: "call-error",
        note: "400 ResourceNotFoundException → typed error",
        fn: () =>
          runPromise(
            Effect.provideContext(
              DynamoDB.getItem(getItemInput).pipe(Effect.flip),
              errCtx,
            ),
          ),
      },
      {
        provider: "aws",
        service: "dynamodb",
        op: "PutItem",
        stage: "encode",
        note: "aws-json 1.0, 7-attr item",
        fn: () => encodePut(putItemInput),
      },
      {
        provider: "aws",
        service: "dynamodb",
        op: "PutItem",
        stage: "decode",
        note: "aws-json 1.0, ConsumedCapacity",
        fn: () => decodePut(putItemDecoded),
      },
      {
        provider: "aws",
        service: "dynamodb",
        op: "PutItem",
        stage: "build",
        note: "aws-json serialize, 7-attr item",
        fn: () => buildPut(putItemInput),
      },
      {
        provider: "aws",
        service: "dynamodb",
        op: "PutItem",
        stage: "call",
        note: "aws-json + SigV4, 7-attr item",
        fn: () =>
          runPromise(
            Effect.provideContext(DynamoDB.putItem(putItemInput), putCtx),
          ),
      },
    );
  }

  // -- Lambda rest-json ------------------------------------------------------
  {
    const getCtx = await awsContext({
      headers: { "content-type": "application/json" },
      body: getFunctionJson,
    });
    const invokeCtx = await awsContext({
      headers: {
        "content-type": "application/json",
        "x-amz-executed-version": "$LATEST",
      },
      body: invokeResponseBody,
    });
    const encodeGet = encoder(Lambda.GetFunctionRequest);
    const encodeInvoke = encoder(Lambda.InvocationRequest);
    const decodeGet = decoder(Lambda.GetFunctionResponse);
    const getFunctionDecoded = JSON.parse(getFunctionJson);
    const buildGet = build(Lambda.getFunction);
    const buildInvoke = build(Lambda.invoke);

    cases.push(
      {
        provider: "aws",
        service: "lambda",
        op: "GetFunction",
        stage: "encode",
        note: "rest-json, label only",
        fn: () => encodeGet(getFunctionInput),
      },
      {
        provider: "aws",
        service: "lambda",
        op: "GetFunction",
        stage: "decode",
        note: "rest-json, full FunctionConfiguration",
        fn: () => decodeGet(getFunctionDecoded),
      },
      {
        provider: "aws",
        service: "lambda",
        op: "GetFunction",
        stage: "wire-decode",
        note: "JSON parse + deserialize + decode, full config",
        fn: parse(
          Lambda.getFunction,
          { "content-type": "application/json" },
          getFunctionJson,
        ),
      },
      {
        provider: "aws",
        service: "lambda",
        op: "GetFunction",
        stage: "build",
        note: "rest-json serialize",
        fn: () => buildGet(getFunctionInput),
      },
      {
        provider: "aws",
        service: "lambda",
        op: "GetFunction",
        stage: "call",
        note: "rest-json + SigV4, full config body",
        fn: () =>
          runPromise(
            Effect.provideContext(Lambda.getFunction(getFunctionInput), getCtx),
          ),
      },
      {
        provider: "aws",
        service: "lambda",
        op: "Invoke",
        stage: "encode",
        note: "rest-json, 24-byte payload",
        fn: () => encodeInvoke(invokeInput),
      },
      {
        provider: "aws",
        service: "lambda",
        op: "Invoke",
        stage: "build",
        note: "rest-json serialize, streaming payload",
        fn: () => buildInvoke(invokeInput),
      },
      {
        provider: "aws",
        service: "lambda",
        op: "Invoke",
        stage: "call",
        note: "rest-json + SigV4 (signed payload), streamed response",
        fn: () =>
          runPromise(
            Effect.provideContext(Lambda.invoke(invokeInput), invokeCtx),
          ),
      },
    );
  }

  // -- STS aws-query ---------------------------------------------------------
  {
    const ctx = await awsContext({
      headers: { "content-type": "text/xml" },
      body: callerIdentityXml,
    });
    const input: STS.GetCallerIdentityRequest = {};
    const encodeReq = encoder(STS.GetCallerIdentityRequest);
    const decodeRes = decoder(STS.GetCallerIdentityResponse);
    const decoded = {
      Arn: "arn:aws:iam::123456789012:user/alchemy",
      UserId: "AIDAEXAMPLE",
      Account: "123456789012",
    };
    const buildReq = build(STS.getCallerIdentity);

    cases.push(
      {
        provider: "aws",
        service: "sts",
        op: "GetCallerIdentity",
        stage: "encode",
        note: "aws-query, empty input",
        fn: () => encodeReq(input),
      },
      {
        provider: "aws",
        service: "sts",
        op: "GetCallerIdentity",
        stage: "decode",
        note: "aws-query, 3 fields",
        fn: () => decodeRes(decoded),
      },
      {
        provider: "aws",
        service: "sts",
        op: "GetCallerIdentity",
        stage: "wire-decode",
        note: "XML parse + Result unwrap + decode",
        fn: parse(
          STS.getCallerIdentity,
          { "content-type": "text/xml" },
          callerIdentityXml,
        ),
      },
      {
        provider: "aws",
        service: "sts",
        op: "GetCallerIdentity",
        stage: "build",
        note: "aws-query form serialize",
        fn: () => buildReq(input),
      },
      {
        provider: "aws",
        service: "sts",
        op: "GetCallerIdentity",
        stage: "call",
        note: "aws-query + SigV4, XML result",
        fn: () =>
          runPromise(Effect.provideContext(STS.getCallerIdentity(input), ctx)),
      },
    );
  }

  return cases;
};
