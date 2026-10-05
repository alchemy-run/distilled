import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import type { Operation } from "../client/operation.ts";
import type { Request } from "../client/request.ts";
import type { Response } from "../client/response.ts";
import { ParseError } from "../errors.ts";
import {
  decodeMessage,
  encodeMessage,
  getStringHeader,
  stringHeader,
} from "../eventstream/codec.ts";
import * as DataExchange from "../services/dataexchange.ts";
import * as DynamoDB from "../services/dynamodb.ts";
import * as GeoMaps from "../services/geo-maps.ts";
import * as Kinesis from "../services/kinesis.ts";
import * as KMS from "../services/kms.ts";
import * as Lambda from "../services/lambda.ts";
import * as T from "../traits.ts";
import { awsJson1_0Protocol, awsJson1_1Protocol } from "./aws-json.ts";
import { restJson1Protocol } from "./rest-json.ts";

const response = (
  body: Response["body"],
  init: { status?: number; headers?: Record<string, string> } = {},
): Response => ({
  body,
  status: init.status ?? 200,
  statusText: "",
  headers: init.headers ?? {},
});

const op = (input: S.Top, output: S.Top = S.Struct({}), operationName?: string): Operation => ({
  input: input as S.Any,
  output,
  errors: [],
  ...(operationName ? { operationName } : {}),
});

const run = <A, E>(effect: Effect.Effect<A, E>) => Effect.runPromise(effect);
const runStrict = <A, E>(effect: Effect.Effect<A, E>) =>
  Effect.runPromise(effect.pipe(Effect.provide(ResponseValidation.strict)));
const flipStrict = <A, E>(effect: Effect.Effect<A, E>) => runStrict(Effect.flip(effect));

const bytes = (text: string) => new TextEncoder().encode(text);

/** A body delivered one byte per chunk, to exercise incremental reads. */
const chunked = (text: string) =>
  new ReadableStream<Uint8Array>({
    start(controller) {
      for (const byte of bytes(text)) controller.enqueue(Uint8Array.of(byte));
      controller.close();
    },
  });

const eventFrame = (headers: Record<string, string>, payload: string) =>
  run(
    encodeMessage({
      headers: Object.fromEntries(
        Object.entries(headers).map(([name, value]) => [name, stringHeader(value)]),
      ),
      payload: bytes(payload),
    }),
  );

const streamOf = (frames: Uint8Array[]) =>
  new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(frame);
      controller.close();
    },
  });

/** Decode every event-stream frame in a request body. */
const readFrames = async (body: Request["body"]) => {
  const data = new Uint8Array(await new globalThis.Response(body as ReadableStream).arrayBuffer());
  const frames: { headers: Record<string, string | undefined>; payload: string }[] = [];
  for (let offset = 0; offset < data.length;) {
    const [message, length] = await run(decodeMessage(data.subarray(offset)));
    frames.push({
      headers: {
        eventType: getStringHeader(message.headers, ":event-type"),
        contentType: getStringHeader(message.headers, ":content-type"),
      },
      payload: new TextDecoder().decode(message.payload),
    });
    offset += length;
  }
  return frames;
};

const collectText = async (stream: unknown) => {
  const chunks = await run(Stream.runCollect(stream as Stream.Stream<Uint8Array, Error>));
  return new TextDecoder().decode(
    Uint8Array.from(Array.from(chunks).flatMap((chunk) => Array.from(chunk))),
  );
};

// =============================================================================
// awsJson1_0 / awsJson1_1
// =============================================================================

describe("awsJson request serialization", () => {
  test("DynamoDB GetItem: POST / with X-Amz-Target and a JSON 1.0 body", async () => {
    const handler = awsJson1_0Protocol(
      op(DynamoDB.GetItemInput, DynamoDB.GetItemOutput, "GetItem"),
    );
    const request = await run(
      handler.serializeRequest({
        TableName: "Music",
        Key: { Artist: { S: "No One You Know" }, SongTitle: { S: "Call Me Today" } },
        ConsistentRead: true,
        ProjectionExpression: "#a",
        ExpressionAttributeNames: { "#a": "AlbumTitle" },
      }),
    );
    expect(request).toEqual({
      method: "POST",
      path: "/",
      query: {},
      headers: {
        "Content-Type": "application/x-amz-json-1.0",
        "X-Amz-Target": "DynamoDB_20120810.GetItem",
      },
      body: expect.any(String),
    });
    expect(JSON.parse(request.body as string)).toEqual({
      TableName: "Music",
      Key: { Artist: { S: "No One You Know" }, SongTitle: { S: "Call Me Today" } },
      ConsistentRead: true,
      ProjectionExpression: "#a",
      ExpressionAttributeNames: { "#a": "AlbumTitle" },
    });
  });

  test("KMS Encrypt: JSON 1.1 content type and base64 blob members", async () => {
    const handler = awsJson1_1Protocol(op(KMS.EncryptRequest, KMS.EncryptResponse, "Encrypt"));
    const request = await run(
      handler.serializeRequest({
        KeyId: "alias/example",
        Plaintext: Redacted.make(bytes("hello")),
        EncryptionContext: { purpose: "test" },
      }),
    );
    expect(request.headers).toEqual({
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": "TrentService.Encrypt",
    });
    expect(JSON.parse(request.body as string)).toEqual({
      KeyId: "alias/example",
      Plaintext: "aGVsbG8=",
      EncryptionContext: { purpose: "test" },
    });
  });

  const svc = T.AwsApiService({ sdkId: "Example", serviceShapeName: "ExampleService_20240101" });

  test("renames jsonName members and encodes timestamps per their format", async () => {
    const input = S.Struct({
      LogGroupName: S.String,
      StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
      Payload: S.optional(T.Blob),
    })
      .pipe(S.encodeKeys({ LogGroupName: "logGroupName", StartTime: "startTime" }))
      .pipe(svc)
      .annotate({ identifier: "FilterEventsRequest" });
    const request = await run(
      awsJson1_1Protocol(op(input)).serializeRequest({
        LogGroupName: "/aws/lambda/example",
        StartTime: new Date("2024-01-02T03:04:05.678Z"),
        EndTime: new Date("2024-01-02T04:00:00.000Z"),
        Payload: Uint8Array.of(0, 255),
      }),
    );
    expect(request.headers["X-Amz-Target"]).toBe("ExampleService_20240101.FilterEvents");
    // epoch-seconds truncates to whole seconds.
    expect(JSON.parse(request.body as string)).toEqual({
      logGroupName: "/aws/lambda/example",
      startTime: 1704164645,
      EndTime: "2024-01-02T04:00:00.000Z",
      Payload: "AP8=",
    });
  });

  test("ignores HTTP binding traits and keeps every member in the body", async () => {
    const input = S.Struct({
      Name: S.String.pipe(T.HttpLabel("Name")),
      Token: S.optional(S.String).pipe(T.HttpHeader("X-Token")),
      Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    })
      .pipe(T.all(svc, T.Http({ method: "GET", uri: "/things/{Name}" })))
      .annotate({ identifier: "DescribeThingInput" });
    const request = await run(
      awsJson1_0Protocol(op(input)).serializeRequest({ Name: "a", Token: "t", Limit: 5 }),
    );
    expect(request.method).toBe("POST");
    expect(request.path).toBe("/");
    expect(request.query).toEqual({});
    expect(request.headers).toEqual({
      "Content-Type": "application/x-amz-json-1.0",
      "X-Amz-Target": "ExampleService_20240101.DescribeThing",
    });
    expect(JSON.parse(request.body as string)).toEqual({ Name: "a", Token: "t", Limit: 5 });
  });

  test("derives the operation name from the input identifier when none is given", async () => {
    const target = async (identifier: string, operationName?: string, service = svc) => {
      const input = S.Struct({}).pipe(service).annotate({ identifier });
      const request = await run(
        awsJson1_1Protocol(op(input, S.Struct({}), operationName)).serializeRequest({}),
      );
      return request.headers["X-Amz-Target"];
    };
    expect(await target("ListTablesInput")).toBe("ExampleService_20240101.ListTables");
    expect(await target("ListTablesRequest")).toBe("ExampleService_20240101.ListTables");
    expect(await target("DescribeDBInstancesMessage")).toBe(
      "ExampleService_20240101.DescribeDBInstances",
    );
    // An explicit operation name wins over the input shape name.
    expect(await target("AutoScalingGroupNamesType", "DescribeAutoScalingGroups")).toBe(
      "ExampleService_20240101.DescribeAutoScalingGroups",
    );
    // Without a service shape name the sdkId is used.
    expect(await target("ListThingsRequest", undefined, T.AwsApiService({ sdkId: "Things" }))).toBe(
      "Things.ListThings",
    );
  });

  test("uses the bare operation name when the input has no service trait", async () => {
    const input = S.Struct({}).annotate({ identifier: "PingRequest" });
    const request = await run(awsJson1_0Protocol(op(input)).serializeRequest({}));
    expect(request.headers["X-Amz-Target"]).toBe("Ping");
  });

  test("sends {} for an empty or undefined input", async () => {
    const empty = S.Struct({}).pipe(svc).annotate({ identifier: "ListStreamsInput" });
    expect((await run(awsJson1_0Protocol(op(empty)).serializeRequest({}))).body).toBe("{}");
    const unit = S.Any.pipe(svc).annotate({ identifier: "ListStreamsInput" });
    expect((await run(awsJson1_0Protocol(op(unit)).serializeRequest(undefined))).body).toBe("{}");
  });

  test("reports schema encode failures as ParseError", async () => {
    const handler = awsJson1_0Protocol(
      op(DynamoDB.GetItemInput, DynamoDB.GetItemOutput, "GetItem"),
    );
    const error = await run(Effect.flip(handler.serializeRequest({ Key: {} })));
    expect(error).toBeInstanceOf(ParseError);
  });
});

describe("awsJson response deserialization", () => {
  const handler = awsJson1_0Protocol(op(DynamoDB.GetItemInput, DynamoDB.GetItemOutput, "GetItem"));

  test("returns the parsed JSON document with nulls dropped", async () => {
    const body = JSON.stringify({
      Item: { Artist: { S: "No One You Know" }, Year: { N: "2015" }, Missing: null },
      ConsumedCapacity: null,
    });
    expect(await run(handler.deserializeResponse(response(body)))).toEqual({
      Item: { Artist: { S: "No One You Know" }, Year: { N: "2015" } },
    });
  });

  test("leaves wire values (epoch timestamps, base64 blobs) for the schema to decode", async () => {
    const body = '{"CreationDateTime":1.704164645678E9,"Blob":"AP8="}';
    expect(await run(handler.deserializeResponse(response(body)))).toEqual({
      CreationDateTime: 1704164645.678,
      Blob: "AP8=",
    });
  });

  test("reads UTF-8 JSON split across chunks", async () => {
    expect(
      await run(handler.deserializeResponse(response(chunked('{"Item":{"S":{"S":"café 😀"}}}')))),
    ).toEqual({ Item: { S: { S: "café 😀" } } });
  });

  for (const body of ["", "null", "42", '"text"']) {
    test(`returns {} for an empty or non-object body: ${JSON.stringify(body)}`, async () => {
      expect(await runStrict(handler.deserializeResponse(response(body)))).toEqual({});
    });
  }

  test("returns malformed JSON as read in lenient mode", async () => {
    expect(await run(handler.deserializeResponse(response("{oops")))).toBe("{oops");
  });

  test("fails malformed JSON with ParseError in strict mode", async () => {
    expect(await flipStrict(handler.deserializeResponse(response("{oops")))).toBeInstanceOf(
      ParseError,
    );
  });

  test("Kinesis SubscribeToShard: decodes events through the event schema", async () => {
    const handler = awsJson1_1Protocol(
      op(Kinesis.SubscribeToShardInput, Kinesis.SubscribeToShardOutput, "SubscribeToShard"),
    );
    const frames = await Promise.all([
      eventFrame(
        { ":message-type": "event", ":event-type": "SubscribeToShardEvent" },
        JSON.stringify({
          Records: [
            {
              SequenceNumber: "1",
              ApproximateArrivalTimestamp: 1704164645,
              Data: "aGk=",
              PartitionKey: "pk",
            },
          ],
          ContinuationSequenceNumber: "1",
          MillisBehindLatest: 0,
        }),
      ),
      eventFrame(
        { ":message-type": "exception", ":exception-type": "ResourceInUseException" },
        '{"message":"busy"}',
      ),
    ]);
    const result = (await run(handler.deserializeResponse(response(streamOf(frames))))) as {
      EventStream: Stream.Stream<Record<string, any>, Error>;
    };
    const events = Array.from(await run(Stream.runCollect(result.EventStream)));
    expect(events).toHaveLength(2);
    const record = events[0]!.SubscribeToShardEvent.Records[0];
    expect(record.ApproximateArrivalTimestamp).toEqual(new Date("2024-01-02T03:04:05.000Z"));
    expect(record.Data).toEqual(bytes("hi"));
    expect(record.PartitionKey).toBe("pk");
    expect(events[1]).toEqual({ ResourceInUseException: { message: "busy" } });
  });

  test("passes a raw streaming member's body through unread", async () => {
    const output = S.Struct({ Body: S.optional(T.StreamingOutput) });
    const body = chunked("raw");
    const result = await run(
      awsJson1_0Protocol(op(S.Any, output)).deserializeResponse(response(body)),
    );
    expect(result).toEqual({ Body: body });
  });

  test("falls back to JSON parsing when a streaming output has an empty body", async () => {
    const output = S.Struct({ Body: S.optional(T.StreamingOutput) });
    expect(
      await run(awsJson1_0Protocol(op(S.Any, output)).deserializeResponse(response(""))),
    ).toEqual({});
  });
});

describe("awsJson error deserialization", () => {
  const handler = awsJson1_0Protocol(op(DynamoDB.GetItemInput, DynamoDB.GetItemOutput, "GetItem"));
  const error = (body: string, headers: Record<string, string> = {}) =>
    run(handler.deserializeError(response(body, { status: 400, headers })));

  test("reads a bare __type shape name", async () => {
    expect(await error('{"__type":"ResourceNotFoundException","message":"Not found"}')).toEqual({
      errorCode: "ResourceNotFoundException",
      data: { message: "Not found" },
    });
  });

  test("strips the namespace from a namespace#Code __type", async () => {
    expect(
      await error(
        '{"__type":"com.amazonaws.dynamodb.v20120810#ResourceNotFoundException","message":"Requested resource not found","Extra":null}',
      ),
    ).toEqual({
      errorCode: "ResourceNotFoundException",
      data: { message: "Requested resource not found" },
    });
  });

  test("strips a trailing :http://… suffix", async () => {
    expect(
      await error(
        '{"__type":"aws.protocoltests#FooError:http://internal.amazon.com/coral/com.amazon.coral.validate/"}',
      ),
    ).toEqual({ errorCode: "FooError", data: {} });
  });

  test("falls back to a body code field", async () => {
    expect(await error('{"code":"ThrottlingException","Message":"Rate exceeded"}')).toEqual({
      errorCode: "ThrottlingException",
      data: { Message: "Rate exceeded" },
    });
  });

  test("prefers __type over code", async () => {
    expect((await error('{"__type":"A","code":"B"}')).errorCode).toBe("A");
  });

  for (const header of [
    "x-amzn-errortype",
    "X-Amzn-Errortype",
    "x-amz-errortype",
    "X-Amz-Errortype",
  ]) {
    test(`prefers the ${header} header over the body`, async () => {
      expect(
        await error('{"__type":"BodyError","message":"m"}', {
          [header]:
            "ValidationException:http://internal.amazon.com/coral/com.amazon.coral.validate/",
        }),
      ).toEqual({ errorCode: "ValidationException", data: { message: "m" } });
    });
  }

  test("takes the first of comma-joined repeated error type headers", async () => {
    expect(
      (await error("", { "x-amzn-errortype": "ThrottlingException, TooManyRequestsException" }))
        .errorCode,
    ).toBe("ThrottlingException");
  });

  test("accepts an empty body when the header carries the code", async () => {
    expect(await error("", { "x-amzn-errortype": "InternalServerError" })).toEqual({
      errorCode: "InternalServerError",
      data: {},
    });
  });

  test("reads an error body split across chunks", async () => {
    expect(
      await run(
        handler.deserializeError(
          response(chunked('{"__type":"ResourceNotFoundException"}'), { status: 400 }),
        ),
      ),
    ).toEqual({ errorCode: "ResourceNotFoundException", data: {} });
  });

  test("fails with ParseError when no error code is present", async () => {
    expect(
      await run(
        Effect.flip(handler.deserializeError(response('{"message":"m"}', { status: 400 }))),
      ),
    ).toBeInstanceOf(ParseError);
    expect(
      await run(Effect.flip(handler.deserializeError(response("", { status: 500 })))),
    ).toBeInstanceOf(ParseError);
  });

  test("fails with ParseError on a malformed error body, even in lenient mode", async () => {
    expect(
      await run(Effect.flip(handler.deserializeError(response("<html>", { status: 502 })))),
    ).toBeInstanceOf(ParseError);
  });
});

// =============================================================================
// restJson1
// =============================================================================

describe("restJson1 request serialization: HTTP bindings", () => {
  test("Lambda Invoke: label, headers, query, and a streaming payload", async () => {
    const handler = restJson1Protocol(op(Lambda.InvocationRequest, Lambda.InvocationResponse));
    const request = await run(
      handler.serializeRequest({
        FunctionName: "arn:aws:lambda:us-east-1:123456789012:function:my-function",
        InvocationType: "RequestResponse",
        LogType: "Tail",
        Qualifier: "$LATEST",
        Payload: '{"key":"value"}',
      }),
    );
    expect(request).toEqual({
      method: "POST",
      path: "/2015-03-31/functions/arn%3Aaws%3Alambda%3Aus-east-1%3A123456789012%3Afunction%3Amy-function/invocations",
      query: { Qualifier: "$LATEST" },
      headers: {
        "X-Amz-Invocation-Type": "RequestResponse",
        "X-Amz-Log-Type": "Tail",
        "Content-Type": "application/octet-stream",
      },
      body: '{"key":"value"}',
      hasStreamingInput: true,
    });
  });

  test("Lambda Invoke: streaming payloads keep bytes and convert Effect streams", async () => {
    const handler = restJson1Protocol(op(Lambda.InvocationRequest, Lambda.InvocationResponse));
    const payload = bytes("{}");
    const fromBytes = await run(handler.serializeRequest({ FunctionName: "f", Payload: payload }));
    expect(fromBytes.body).toBe(payload);
    const fromStream = await run(
      handler.serializeRequest({
        FunctionName: "f",
        Payload: Stream.fromIterable([bytes('{"a":'), bytes("1}")]),
      }),
    );
    expect(fromStream.body).toBeInstanceOf(ReadableStream);
    expect(await new globalThis.Response(fromStream.body as ReadableStream).text()).toBe('{"a":1}');
  });

  test("Lambda Invoke without a payload sends no body", async () => {
    const handler = restJson1Protocol(op(Lambda.InvocationRequest, Lambda.InvocationResponse));
    const request = await run(handler.serializeRequest({ FunctionName: "f" }));
    expect(request.body).toBeUndefined();
    expect(request.headers).toEqual({ "Content-Type": "application/json" });
    expect(request.hasStreamingInput).toBeUndefined();
  });

  test("a Content-Type header member overrides the streaming default", async () => {
    const input = S.Struct({
      modelId: S.String.pipe(T.HttpLabel("modelId")),
      contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
      body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
    }).pipe(T.Http({ method: "POST", uri: "/model/{modelId}/invoke" }));
    const request = await run(
      restJson1Protocol(op(input)).serializeRequest({
        modelId: "anthropic.claude-v2",
        contentType: "application/json",
        body: "{}",
      }),
    );
    expect(request.path).toBe("/model/anthropic.claude-v2/invoke");
    expect(request.headers).toEqual({ "Content-Type": "application/json" });
    expect(request.hasStreamingInput).toBe(true);
  });

  test("substitutes greedy labels and labels renamed by jsonName", async () => {
    const input = S.Struct({
      ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
      TagKeys: S.Array(S.String).pipe(T.HttpQuery("tagKeys")),
    })
      .pipe(S.encodeKeys({ ResourceArn: "resourceArn" }))
      .pipe(T.Http({ method: "DELETE", uri: "/tags/{ResourceArn+}" }));
    const request = await run(
      restJson1Protocol(op(input)).serializeRequest({
        ResourceArn: "arn:aws:sqs:us-east-1:123456789012:queue",
        TagKeys: ["env", "team"],
      }),
    );
    expect(request.method).toBe("DELETE");
    expect(request.path).toBe("/tags/arn%3Aaws%3Asqs%3Aus-east-1%3A123456789012%3Aqueue");
    expect(request.query).toEqual({ tagKeys: ["env", "team"] });
  });

  test("greedy labels keep / and encode each segment; plain labels encode /", async () => {
    const input = S.Struct({
      Id: S.String.pipe(T.HttpLabel("Id")),
      Key: S.String.pipe(T.HttpLabel("Key")),
    }).pipe(T.Http({ method: "GET", uri: "/stores/{Id}/objects/{Key+}" }));
    const handler = restJson1Protocol(op(input));
    const request = await run(
      handler.serializeRequest({ Id: "a/b c", Key: "/dir/a b+c~(x)!'*/é%.txt" }),
    );
    expect(request.path).toBe(
      "/stores/a%2Fb%20c/objects//dir/a%20b%2Bc~%28x%29%21%27%2A/%C3%A9%25.txt",
    );
    const dollar = await run(handler.serializeRequest({ Id: "$&", Key: "$1/$&" }));
    expect(dollar.path).toBe("/stores/%24%26/objects/%241/%24%26");
  });

  test("encodes query and header values, including timestamps", async () => {
    const input = S.Struct({
      Id: S.String.pipe(T.HttpLabel("Id")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      IncludeDeleted: S.optional(S.Boolean).pipe(T.HttpQuery("includeDeleted")),
      After: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
        T.HttpQuery("after"),
      ),
      Before: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
        T.HttpQuery("before"),
      ),
      IfModifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
        T.HttpHeader("If-Modified-Since"),
      ),
      Priority: S.optional(S.Number).pipe(T.HttpHeader("X-Amz-Priority")),
      DryRun: S.optional(S.Boolean).pipe(T.HttpHeader("X-Amz-Dry-Run")),
      Filters: S.optional(S.Record(S.String, S.String)).pipe(T.HttpQueryParams()),
    }).pipe(T.Http({ method: "GET", uri: "/jobs/{Id}" }));
    const request = await run(
      restJson1Protocol(op(input)).serializeRequest({
        Id: "job 1",
        MaxResults: 10,
        IncludeDeleted: false,
        After: new Date("2024-01-02T03:04:05.000Z"),
        Before: new Date("2024-01-02T03:04:05.999Z"),
        IfModifiedSince: new Date("2024-01-02T03:04:05.000Z"),
        Priority: 3,
        DryRun: true,
        Filters: { status: "RUNNING" },
      }),
    );
    expect(request).toEqual({
      method: "GET",
      path: "/jobs/job%201",
      query: {
        maxResults: "10",
        includeDeleted: "false",
        after: "2024-01-02T03:04:05.000Z",
        before: "1704164645",
        status: "RUNNING",
      },
      headers: {
        "If-Modified-Since": "Tue, 02 Jan 2024 03:04:05 GMT",
        "X-Amz-Priority": "3",
        "X-Amz-Dry-Run": "true",
        "Content-Type": "application/json",
      },
    });
  });

  test("merges static URI query params without overriding bound ones", async () => {
    const input = S.Struct({
      Name: S.String.pipe(T.HttpLabel("Name")),
      Mode: S.optional(S.String).pipe(T.HttpQuery("mode")),
    }).pipe(T.Http({ method: "GET", uri: "/things/{Name}?versions&mode=all" }));
    const handler = restJson1Protocol(op(input));
    expect(await run(handler.serializeRequest({ Name: "a", Mode: "latest" }))).toMatchObject({
      path: "/things/a",
      query: { mode: "latest", versions: "" },
    });
    expect((await run(handler.serializeRequest({ Name: "a" }))).query).toEqual({
      versions: "",
      mode: "all",
    });
  });

  test("DataExchange SendApiAsset: prefix headers, query map, and a raw string payload", async () => {
    const handler = restJson1Protocol(
      op(DataExchange.SendApiAssetRequest, DataExchange.SendApiAssetResponse),
    );
    const request = await run(
      handler.serializeRequest({
        AssetId: "asset",
        DataSetId: "data-set",
        RevisionId: "revision",
        Method: "PUT",
        Path: "/v1/items",
        QueryStringParameters: { page: "2" },
        RequestHeaders: { Accept: "text/csv", Skipped: undefined },
        Body: "plain text",
      }),
    );
    expect(request).toEqual({
      method: "POST",
      path: "/v1",
      query: { page: "2" },
      headers: {
        "x-amzn-dataexchange-asset-id": "asset",
        "x-amzn-dataexchange-data-set-id": "data-set",
        "x-amzn-dataexchange-revision-id": "revision",
        "x-amzn-dataexchange-http-method": "PUT",
        "x-amzn-dataexchange-path": "/v1/items",
        "x-amzn-dataexchange-header-Accept": "text/csv",
        "Content-Type": "application/json",
      },
      body: "plain text",
    });
  });

  test("defaults to POST / without an @http trait", async () => {
    const input = S.Struct({ Name: S.optional(S.String) });
    expect(await run(restJson1Protocol(op(input)).serializeRequest({ Name: "x" }))).toMatchObject({
      method: "POST",
      path: "/",
      body: '{"Name":"x"}',
    });
  });

  test("reports schema encode failures as ParseError", async () => {
    const handler = restJson1Protocol(op(Lambda.InvocationRequest, Lambda.InvocationResponse));
    expect(await run(Effect.flip(handler.serializeRequest({ Qualifier: "1" })))).toBeInstanceOf(
      ParseError,
    );
  });
});

describe("restJson1 request serialization: bodies", () => {
  const input = S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Description: S.optional(S.String),
    MemorySize: S.optional(S.Number),
    ScheduledAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ZipFile: S.optional(T.Blob),
  })
    .pipe(S.encodeKeys({ Description: "description" }))
    .pipe(T.Http({ method: "PUT", uri: "/2015-03-31/functions/{FunctionName}/configuration" }));
  const handler = restJson1Protocol(op(input));

  test("serializes unbound members as a JSON document with wire names", async () => {
    const request = await run(
      handler.serializeRequest({
        FunctionName: "f",
        Description: "d",
        MemorySize: 256,
        ScheduledAt: new Date("2024-01-02T03:04:05.678Z"),
        ZipFile: Uint8Array.of(1, 2, 3),
      }),
    );
    expect(request.method).toBe("PUT");
    expect(request.path).toBe("/2015-03-31/functions/f/configuration");
    expect(request.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(request.body as string)).toEqual({
      description: "d",
      MemorySize: 256,
      ScheduledAt: 1704164645,
      ZipFile: "AQID",
    });
  });

  test("sends {} when body-capable members exist but none are set", async () => {
    const request = await run(handler.serializeRequest({ FunctionName: "f" }));
    expect(request.body).toBe("{}");
    expect(request.headers).toEqual({ "Content-Type": "application/json" });
  });

  test("sends no body when every member is bound outside the body (GeoMaps GetTile)", async () => {
    const handler = restJson1Protocol(op(GeoMaps.GetTileRequest, GeoMaps.GetTileResponse));
    const request = await run(
      handler.serializeRequest({
        Tileset: "vector.basemap",
        Z: Redacted.make("1"),
        X: Redacted.make("2"),
        Y: Redacted.make("3"),
        AdditionalFeatures: ["Buildings", "ContourLines"],
      }),
    );
    expect(request).toEqual({
      method: "GET",
      path: "/v2/tiles/vector.basemap/1/2/3",
      query: { "additional-features": ["Buildings", "ContourLines"] },
      headers: { "Content-Type": "application/json" },
    });
  });

  test("sends no body for a unit input", async () => {
    const request = await run(
      restJson1Protocol(
        op(S.Struct({}).pipe(T.Http({ method: "GET", uri: "/ping" }))),
      ).serializeRequest({}),
    );
    expect(request.body).toBeUndefined();
  });

  test("serializes a structure payload as the whole body", async () => {
    const input = S.Struct({
      Name: S.String.pipe(T.HttpLabel("Name")),
      Policy: S.optional(
        S.Struct({ Version: S.String, Statement: S.Array(S.Unknown) }).pipe(
          S.encodeKeys({ Version: "version" }),
        ),
      ).pipe(T.HttpPayload()),
      Ignored: S.optional(S.String),
    }).pipe(T.Http({ method: "PUT", uri: "/policies/{Name}" }));
    const request = await run(
      restJson1Protocol(op(input)).serializeRequest({
        Name: "p",
        Policy: { Version: "2012-10-17", Statement: [] },
        Ignored: "dropped",
      }),
    );
    expect(request.body).toBe('{"version":"2012-10-17","Statement":[]}');
    expect(request.headers).toEqual({ "Content-Type": "application/json" });
  });

  test("API Gateway adds Accept: application/json", async () => {
    const input = S.Struct({ restapi_id: S.String.pipe(T.HttpLabel("restapi_id")) }).pipe(
      T.all(
        T.AwsApiService({ sdkId: "API Gateway", serviceShapeName: "BackplaneControlService" }),
        T.Http({ method: "GET", uri: "/restapis/{restapi_id}" }),
      ),
    );
    const request = await run(restJson1Protocol(op(input)).serializeRequest({ restapi_id: "abc" }));
    expect(request.headers).toEqual({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
  });

  test("Glacier adds X-Amz-Glacier-Version", async () => {
    const input = S.Struct({
      accountId: S.String.pipe(T.HttpLabel("accountId")),
      vaultName: S.String.pipe(T.HttpLabel("vaultName")),
    }).pipe(
      T.all(
        T.AwsApiService({ sdkId: "Glacier", serviceShapeName: "Glacier" }),
        T.ServiceVersion("2012-06-01"),
        T.Http({ method: "GET", uri: "/{accountId}/vaults/{vaultName}" }),
      ),
    );
    const request = await run(
      restJson1Protocol(op(input)).serializeRequest({ accountId: "-", vaultName: "v" }),
    );
    expect(request.path).toBe("/-/vaults/v");
    expect(request.headers["X-Amz-Glacier-Version"]).toBe("2012-06-01");
  });
});

describe("restJson1 request serialization: input event streams", () => {
  const event = S.Union([
    S.Struct({ AudioEvent: S.Struct({ AudioChunk: S.optional(T.Blob).pipe(T.EventPayload()) }) }),
    S.Struct({ ConfigurationEvent: S.Struct({ ChannelCount: S.optional(S.Number) }) }),
  ]);
  const inputFor = (stream: S.Top) =>
    S.Struct({
      SampleRate: S.Number.pipe(T.HttpHeader("x-amzn-transcribe-sample-rate")),
      AudioStream: stream.pipe(T.HttpPayload()),
    }).pipe(T.Http({ method: "POST", uri: "/stream-transcription" }));
  const events = () =>
    Stream.fromIterable([
      { ConfigurationEvent: { ChannelCount: 1 } },
      { AudioEvent: { AudioChunk: bytes("pcm") } },
    ]);

  test("writes eventPayload members as raw frames when the map is declared", async () => {
    const handler = restJson1Protocol(
      op(inputFor(T.InputEventStream(event, { AudioEvent: "AudioChunk" }))),
    );
    const request = await run(
      handler.serializeRequest({ SampleRate: 16000, AudioStream: events() }),
    );
    expect(request.headers).toEqual({
      "x-amzn-transcribe-sample-rate": "16000",
      "Content-Type": "application/vnd.amazon.eventstream",
    });
    expect(request.hasStreamingInput).toBeUndefined();
    expect(await readFrames(request.body)).toEqual([
      {
        headers: { eventType: "ConfigurationEvent", contentType: "application/json" },
        payload: '{"ChannelCount":1}',
      },
      {
        headers: { eventType: "AudioEvent", contentType: "application/octet-stream" },
        payload: "pcm",
      },
    ]);
  });

  test("writes every event as JSON without a payload map", async () => {
    const handler = restJson1Protocol(op(inputFor(T.InputEventStream(event))));
    const request = await run(
      handler.serializeRequest({
        SampleRate: 16000,
        AudioStream: Stream.fromIterable([{ _tag: "ConfigurationEvent", ChannelCount: 2 }]),
      }),
    );
    expect(request.headers["Content-Type"]).toBe("application/vnd.amazon.eventstream");
    expect(await readFrames(request.body)).toEqual([
      {
        headers: { eventType: "ConfigurationEvent", contentType: "application/json" },
        payload: '{"ChannelCount":2}',
      },
    ]);
  });
});

describe("restJson1 response deserialization", () => {
  test("Lambda Invoke: status code, headers, and a streaming payload", async () => {
    const handler = restJson1Protocol(op(Lambda.InvocationRequest, Lambda.InvocationResponse));
    const result = (await run(
      handler.deserializeResponse(
        response(chunked('{"statusCode":200}'), {
          headers: {
            "x-amz-executed-version": "$LATEST",
            "X-Amz-Function-Error": "Unhandled",
            "x-amz-log-result": "bG9n",
            "content-type": "application/json",
          },
        }),
      ),
    )) as Record<string, unknown>;
    expect(Object.keys(result).sort()).toEqual([
      "ExecutedVersion",
      "FunctionError",
      "LogResult",
      "Payload",
      "StatusCode",
    ]);
    expect(result).toMatchObject({
      StatusCode: 200,
      ExecutedVersion: "$LATEST",
      FunctionError: "Unhandled",
      LogResult: "bG9n",
    });
    expect(await collectText(result.Payload)).toBe('{"statusCode":200}');
  });

  test("Lambda Invoke: a string body becomes a one-chunk stream", async () => {
    const handler = restJson1Protocol(op(Lambda.InvocationRequest, Lambda.InvocationResponse));
    const result = (await run(
      handler.deserializeResponse(response("null", { status: 202 })),
    )) as Record<string, unknown>;
    expect(result.StatusCode).toBe(202);
    expect(await collectText(result.Payload)).toBe("null");
  });

  test("Lambda InvokeWithResponseStream: event payload chunks bind to the payload member", async () => {
    const handler = restJson1Protocol(
      op(Lambda.InvokeWithResponseStreamRequest, Lambda.InvokeWithResponseStreamResponse),
    );
    const frames = await Promise.all([
      eventFrame({ ":message-type": "event", ":event-type": "PayloadChunk" }, '{"partial":'),
      eventFrame(
        { ":message-type": "event", ":event-type": "InvokeComplete" },
        '{"LogResult":"bG9n"}',
      ),
    ]);
    const result = (await run(
      handler.deserializeResponse(
        response(streamOf(frames), {
          headers: { "content-type": "application/vnd.amazon.eventstream" },
        }),
      ),
    )) as { StatusCode: number; ResponseStreamContentType: string; EventStream: unknown };
    expect(result.StatusCode).toBe(200);
    expect(result.ResponseStreamContentType).toBe("application/vnd.amazon.eventstream");
    const events = Array.from(
      await run(Stream.runCollect(result.EventStream as Stream.Stream<any, Error>)),
    );
    expect(Redacted.value(events[0].PayloadChunk.Payload)).toEqual(bytes('{"partial":'));
    expect(events[1]).toEqual({ InvokeComplete: { LogResult: "bG9n" } });
  });

  test("converts number and boolean header members and merges the JSON body", async () => {
    const output = S.Struct({
      ContentLength: S.optional(S.Number).pipe(T.HttpHeader("Content-Length")),
      Truncated: S.optional(S.Boolean).pipe(T.HttpHeader("X-Amz-Truncated")),
      Missing: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Missing")),
      LastModified: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
        T.HttpHeader("Last-Modified"),
      ),
      Items: S.optional(S.Array(S.String)),
      NextToken: S.optional(S.String),
    });
    const handler = restJson1Protocol(op(S.Any, output));
    expect(
      await run(
        handler.deserializeResponse(
          response('{"Items":["a"],"NextToken":null}', {
            headers: {
              "content-length": "42",
              "x-amz-truncated": "false",
              "last-modified": "Tue, 02 Jan 2024 03:04:05 GMT",
            },
          }),
        ),
      ),
    ).toEqual({
      ContentLength: 42,
      Truncated: false,
      LastModified: "Tue, 02 Jan 2024 03:04:05 GMT",
      Items: ["a"],
    });
  });

  test("collects prefix headers case-insensitively with the prefix stripped", async () => {
    const output = S.Struct({
      Metadata: S.optional(S.Record(S.String, S.String)).pipe(T.HttpPrefixHeaders("X-Amz-Meta-")),
      Absent: S.optional(S.Record(S.String, S.String)).pipe(T.HttpPrefixHeaders("x-absent-")),
    });
    const handler = restJson1Protocol(op(S.Any, output));
    expect(
      await run(
        handler.deserializeResponse(
          response("", {
            headers: { "x-amz-meta-color": "red", "X-Amz-Meta-Size": "L", "x-other": "1" },
          }),
        ),
      ),
    ).toEqual({ Metadata: { color: "red", Size: "L" } });
  });

  test("GeoMaps GetTile: a blob payload is re-encoded to base64", async () => {
    const handler = restJson1Protocol(op(GeoMaps.GetTileRequest, GeoMaps.GetTileResponse));
    const tile = Uint8Array.of(0x1a, 0x00, 0xff, 0x80);
    expect(
      await run(
        handler.deserializeResponse(
          response(new Blob([tile]).stream(), {
            headers: {
              "content-type": "application/vnd.mapbox-vector-tile",
              "x-amz-geo-pricing-bucket": "Standard",
            },
          }),
        ),
      ),
    ).toEqual({
      Blob: "GgD/gA==",
      ContentType: "application/vnd.mapbox-vector-tile",
      PricingBucket: "Standard",
    });
  });

  test("GeoMaps GetTile: an empty blob payload is omitted", async () => {
    const handler = restJson1Protocol(op(GeoMaps.GetTileRequest, GeoMaps.GetTileResponse));
    expect(
      await run(
        handler.deserializeResponse(
          response("", { headers: { "x-amz-geo-pricing-bucket": "Standard" } }),
        ),
      ),
    ).toEqual({ PricingBucket: "Standard" });
  });

  test("an empty body yields only the bound members", async () => {
    const output = S.Struct({
      StatusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
      Name: S.optional(S.String),
    });
    expect(
      await runStrict(
        restJson1Protocol(op(S.Any, output)).deserializeResponse(response("", { status: 204 })),
      ),
    ).toEqual({ StatusCode: 204 });
  });

  test("ignores a JSON array or scalar body", async () => {
    const handler = restJson1Protocol(op(S.Any, S.Struct({ Name: S.optional(S.String) })));
    for (const body of ["[1,2]", "true", "null"]) {
      expect(await runStrict(handler.deserializeResponse(response(body)))).toEqual({});
    }
  });

  test("returns malformed JSON as read in lenient mode and fails in strict mode", async () => {
    const handler = restJson1Protocol(op(S.Any, S.Struct({ Name: S.optional(S.String) })));
    expect(await run(handler.deserializeResponse(response("{oops")))).toBe("{oops");
    expect(await flipStrict(handler.deserializeResponse(response("{oops")))).toBeInstanceOf(
      ParseError,
    );
  });
});

describe("restJson1 error deserialization", () => {
  const handler = restJson1Protocol(op(Lambda.InvocationRequest, Lambda.InvocationResponse));
  const error = (body: string, headers: Record<string, string> = {}, status = 400) =>
    run(handler.deserializeError(response(body, { status, headers })));

  test("prefers x-amzn-errortype and sanitizes namespace and URL forms", async () => {
    expect(
      await error('{"Type":"User","message":"Function not found: arn:aws:lambda:…"}', {
        "x-amzn-errortype":
          "aws.lambda#ResourceNotFoundException:http://internal.amazon.com/coral/com.amazon.coral.validate/",
      }),
    ).toEqual({
      errorCode: "ResourceNotFoundException",
      data: { Type: "User", message: "Function not found: arn:aws:lambda:…" },
    });
  });

  for (const header of ["X-Amzn-Errortype", "x-amz-errortype", "X-Amz-Errortype"]) {
    test(`reads the ${header} header`, async () => {
      expect((await error("{}", { [header]: "TooManyRequestsException" })).errorCode).toBe(
        "TooManyRequestsException",
      );
    });
  }

  test("takes the first of comma-joined repeated error type headers", async () => {
    expect(
      (
        await error(
          "",
          { "x-amzn-errortype": "ThrottlingException, TooManyRequestsException" },
          429,
        )
      ).errorCode,
    ).toBe("ThrottlingException");
  });

  test("falls back to __type, then code, in the body", async () => {
    expect(
      await error('{"__type":"com.amazonaws.lambda#InvalidParameterValueException","message":"m"}'),
    ).toEqual({ errorCode: "InvalidParameterValueException", data: { message: "m" } });
    expect(await error('{"code":"BadRequestException","message":"m","extra":null}')).toEqual({
      errorCode: "BadRequestException",
      data: { message: "m" },
    });
  });

  test("returns an empty code with the body when no code is present", async () => {
    expect(await error('{"message":"Forbidden"}', {}, 403)).toEqual({
      errorCode: "",
      data: { message: "Forbidden" },
    });
    expect(await error("", {}, 500)).toEqual({ errorCode: "", data: {} });
  });

  test("treats a plain-text error body as the message", async () => {
    expect(await error("Failed to retrieve environment", {}, 500)).toEqual({
      errorCode: "",
      data: { message: "Failed to retrieve environment" },
    });
  });

  test("reads an error body split across chunks", async () => {
    expect(
      await run(
        handler.deserializeError(response(chunked('{"code":"ServiceException"}'), { status: 500 })),
      ),
    ).toEqual({ errorCode: "ServiceException", data: {} });
  });
});
