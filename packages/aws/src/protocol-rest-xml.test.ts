import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as Credentials from "./credentials.browser.ts";
import * as Endpoint from "./endpoint.ts";
import type * as Region from "./region.ts";
import * as S3Control from "./services/s3-control.ts";
import * as S3 from "./services/s3.ts";

const credentials = {
  accessKeyId: Redacted.make("AKIAIOSFODNN7EXAMPLE"),
  secretAccessKey: Redacted.make("wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"),
  region: "us-east-1" as Region.RegionName,
  sessionToken: undefined,
};

const capture = <A, E>(
  operation: Effect.Effect<
    A,
    E,
    Credentials.Credentials | HttpClient.HttpClient
  >,
  body: string,
) =>
  Effect.gen(function* () {
    const requests: HttpClientRequest.HttpClientRequest[] = [];
    const client = HttpClient.make((request) =>
      Effect.sync(() => {
        requests.push(request);
        return HttpClientResponse.fromWeb(
          request,
          new Response(body, {
            headers: { "content-type": "application/xml" },
          }),
        );
      }),
    );
    const output = yield* operation.pipe(
      Effect.provide(
        Layer.mergeAll(
          Layer.succeed(HttpClient.HttpClient, client),
          Layer.succeed(Credentials.Credentials, Effect.succeed(credentials)),
          Endpoint.of("https://s3.us-east-1.amazonaws.com"),
        ),
      ),
    );
    expect(requests).toHaveLength(1);
    return { output, request: requests[0]! };
  });

const bucket = { Bucket: "examplebucket" };
const xmlns = "http://s3.amazonaws.com/doc/2006-03-01/";

const notificationXml = (content: string) =>
  `<NotificationConfiguration xmlns="${xmlns}">${content}</NotificationConfiguration>`;

const getNotifications = (body: string) =>
  capture(S3.getBucketNotificationConfiguration(bucket), body);

describe("AwsProtocol REST-XML empty values", () => {
  for (const element of [
    "<EventBridgeConfiguration/>",
    "<EventBridgeConfiguration></EventBridgeConfiguration>",
    `<EventBridgeConfiguration xmlns="${xmlns}"/>`,
  ]) {
    test(`preserves the modeled empty structure in ${element}`, async () => {
      const { output } = await Effect.runPromise(
        getNotifications(notificationXml(element)),
      );
      expect(output.EventBridgeConfiguration).toEqual({});
      expect(output.QueueConfigurations).toBeUndefined();
      expect(output.TopicConfigurations).toBeUndefined();
      expect(output.LambdaFunctionConfigurations).toBeUndefined();
    });
  }

  for (const body of [
    notificationXml(""),
    `<NotificationConfiguration xmlns="${xmlns}"/>`,
  ]) {
    test(`does not invent EventBridgeConfiguration in ${body}`, async () => {
      const { output } = await Effect.runPromise(getNotifications(body));
      expect(output.EventBridgeConfiguration).toBeUndefined();
      expect(output).toEqual({});
    });
  }

  test("serializes EventBridgeConfiguration {} and decodes it back", async () => {
    const { request } = await Effect.runPromise(
      capture(
        S3.putBucketNotificationConfiguration({
          ...bucket,
          NotificationConfiguration: {
            EventBridgeConfiguration: {},
            QueueConfigurations: [],
            TopicConfigurations: [],
            LambdaFunctionConfigurations: [],
          },
        }),
        "",
      ),
    );
    expect(request.method).toBe("PUT");
    expect(new URL(request.url).searchParams.has("notification")).toBe(true);
    expect(request.headers["content-type"]).toBe("application/xml");
    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    const body = await web.text();
    expect(body).toBe(
      notificationXml("<EventBridgeConfiguration></EventBridgeConfiguration>"),
    );
    const { output } = await Effect.runPromise(getNotifications(body));
    expect(output.EventBridgeConfiguration).toEqual({});
  });

  test("serializes an absent EventBridgeConfiguration without an element", async () => {
    const { request } = await Effect.runPromise(
      capture(
        S3.putBucketNotificationConfiguration({
          ...bucket,
          NotificationConfiguration: {},
        }),
        "",
      ),
    );
    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    expect(await web.text()).toBe(notificationXml(""));
  });

  test("preserves empty strings without coercing empty numbers or booleans", async () => {
    const { output } = await Effect.runPromise(
      capture(
        S3.listObjectsV2(bucket),
        `<ListBucketResult xmlns="${xmlns}"><Name>examplebucket</Name><Prefix/><Delimiter></Delimiter><MaxKeys/><IsTruncated/><KeyCount>0</KeyCount></ListBucketResult>`,
      ),
    );
    expect(output.Name).toBe("examplebucket");
    expect(output.Prefix).toBe("");
    expect(output.Delimiter).toBe("");
    expect(output.MaxKeys).toBeUndefined();
    expect(output.IsTruncated).toBeUndefined();
    expect(output.KeyCount).toBe(0);
    expect(output.Contents).toBeUndefined();
  });

  for (const content of [
    "<RoutingRules/>",
    "<RoutingRules></RoutingRules>",
    "",
  ]) {
    test(`keeps an empty or absent wrapped list undefined: ${content}`, async () => {
      const { output } = await Effect.runPromise(
        capture(
          S3.getBucketWebsite(bucket),
          `<WebsiteConfiguration xmlns="${xmlns}"><IndexDocument><Suffix>index.html</Suffix></IndexDocument>${content}</WebsiteConfiguration>`,
        ),
      );
      expect(output.IndexDocument).toEqual({ Suffix: "index.html" });
      expect(output.RoutingRules).toBeUndefined();
    });
  }

  test("preserves empty structures with optional members inside a list", async () => {
    const { output } = await Effect.runPromise(
      capture(
        S3.getBucketWebsite(bucket),
        `<WebsiteConfiguration xmlns="${xmlns}"><RoutingRules><RoutingRule><Condition/><Redirect/></RoutingRule></RoutingRules></WebsiteConfiguration>`,
      ),
    );
    expect(output.RoutingRules).toEqual([{ Condition: {}, Redirect: {} }]);
  });

  test("does not treat an empty map or timestamp as a structure", async () => {
    const { output } = await Effect.runPromise(
      capture(
        S3Control.getAccessPoint({
          AccountId: "123456789012",
          Name: "example-access-point",
        }),
        "<GetAccessPointResult><Name>example-access-point</Name><Endpoints/><CreationDate/><PublicAccessBlockConfiguration/></GetAccessPointResult>",
      ),
    );
    expect(output.Name).toBe("example-access-point");
    expect(output.Endpoints).toBeUndefined();
    expect(String(output.CreationDate)).toBe("");
    expect(output.PublicAccessBlockConfiguration).toEqual({});
  });
});
