import * as ResponseValidation from "@distilled.cloud/core/response-validation";
/**
 * Storage data planes, no network: XML request/response bodies, header maps,
 * raw-bytes bodies, typed Storage errors, SAS URLs, and the Tables OData
 * encoding. A fake HttpClient captures each request and answers with a
 * canned Storage response.
 */
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { ARM_SCOPE, Credentials, type Config } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import * as tables from "../src/services/cosmos-tables.ts";
import * as blob from "../src/services/storage-blob.ts";
import * as datalake from "../src/services/storage-datalake.ts";
import * as file from "../src/services/storage-file.ts";
import * as queue from "../src/services/storage-queue.ts";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly body: Uint8Array | undefined;
}

interface Canned {
  readonly status?: number;
  readonly body?: string | Uint8Array<ArrayBuffer>;
  readonly headers?: Record<string, string>;
}

const BLOB = "https://acct.blob.core.windows.net";
const QUEUE = "https://acct.queue.core.windows.net";
const FILE = "https://acct.file.core.windows.net";
const DFS = "https://acct.dfs.core.windows.net";
const STORAGE_TOKEN = "Bearer aad:https://storage.azure.com/.default";

const credentials = Layer.succeed(
  Credentials,
  Effect.succeed<Config>({
    token: (scope) =>
      Effect.succeed(Redacted.make(scope === ARM_SCOPE ? "arm-token" : `aad:${scope}`)),
    subscriptionId: "00000000-0000-0000-0000-000000000001",
    apiBaseUrl: "https://management.azure.com",
  }),
);

/** Credentials that fail if anything asks for them (SAS requests must not). */
const noCredentials = Layer.succeed(
  Credentials,
  Effect.die(new Error("credentials were resolved for a SAS request")) as Effect.Effect<Config>,
);

/**
 * Run one operation against a fake client answering `canned`, in strict
 * response validation so the decoded value must match the output schema.
 */
const run = async <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  canned: Canned = {},
  creds: Layer.Layer<Credentials> = credentials,
): Promise<{ request: Captured; exit: Exit.Exit<A, E> }> => {
  const calls: Captured[] = [];
  const client = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        calls.push({
          method: request.method,
          url: url.href,
          headers: { ...request.headers },
          body: request.body._tag === "Uint8Array" ? request.body.body : undefined,
        });
        return HttpClientResponse.fromWeb(
          request,
          new Response(canned.body ?? null, {
            status: canned.status ?? 200,
            headers: canned.headers,
          }),
        );
      }),
    ),
  );
  const exit = await Effect.runPromise(
    operation.pipe(
      Retry.none,
      Effect.provide(ResponseValidation.strict),
      Effect.provide(creds),
      Effect.provide(client),
      Effect.exit,
    ),
  );
  expect(calls).toHaveLength(1);
  return { request: calls[0]!, exit };
};

const success = <A, E>(exit: Exit.Exit<A, E>): A => {
  if (Exit.isFailure(exit)) throw new Error(`expected success, got ${String(exit.cause)}`);
  return exit.value;
};

const failureTag = <A, E>(exit: Exit.Exit<A, E>): string | undefined => {
  if (Exit.isSuccess(exit)) return undefined;
  const error = exit.cause.reasons.find((r) => r._tag === "Fail");
  return (error as { error?: { _tag?: string } } | undefined)?.error?._tag;
};

const text = (bytes: Uint8Array | undefined) =>
  bytes === undefined ? undefined : new TextDecoder().decode(bytes);

describe("Storage requests", () => {
  test("BlockBlob upload sends the bytes, the blob type and x-ms-meta-* headers", async () => {
    const { request, exit } = await run(
      blob.UploadBlockBlob({
        url: BLOB,
        containerName: "assets",
        blob: "hello.txt",
        body: new TextEncoder().encode("hello world"),
        xMsBlobContentType: "text/plain",
        metadata: { owner: "alchemy", stage: "dev" },
      }),
      {
        status: 201,
        headers: {
          ETag: '"0x8DC"',
          "Content-MD5": "XrY7u+Ae7tCTyyK7j1rNww==",
          "x-ms-request-server-encrypted": "true",
        },
      },
    );
    expect(request.method).toBe("PUT");
    expect(request.url).toBe(`${BLOB}/assets/hello.txt`);
    expect(request.headers.authorization).toBe(STORAGE_TOKEN);
    expect(request.headers["x-ms-version"]).toBe("2027-03-07");
    expect(request.headers["x-ms-blob-type"]).toBe("BlockBlob");
    expect(request.headers["x-ms-blob-content-type"]).toBe("text/plain");
    expect(request.headers["x-ms-meta-owner"]).toBe("alchemy");
    expect(request.headers["x-ms-meta-stage"]).toBe("dev");
    expect(new Date(request.headers["x-ms-date"]!).getTime()).not.toBeNaN();
    expect(request.headers.accept).toBeUndefined();
    expect(text(request.body)).toBe("hello world");
    expect(success(exit)).toEqual({
      eTag: '"0x8DC"',
      contentMD5: "XrY7u+Ae7tCTyyK7j1rNww==",
      xMsRequestServerEncrypted: true,
    });
  });

  test("a write with no payload sends a zero-length body", async () => {
    const { request } = await run(blob.CreateContainer({ url: BLOB, containerName: "assets" }), {
      status: 201,
    });
    expect(request.url).toBe(`${BLOB}/assets?restype=container`);
    expect(request.body).toEqual(new Uint8Array(0));
    expect(request.headers["content-length"]).toBe("0");
    expect(request.headers["content-type"]).toBeUndefined();
  });

  test("queue enqueue sends <QueueMessage><MessageText> and reads the list back", async () => {
    const { request, exit } = await run(
      queue.MessagesEnqueue({ url: QUEUE, queueName: "jobs", MessageText: "a < b & c" }),
      {
        status: 201,
        headers: { "Content-Type": "application/xml" },
        body:
          '<?xml version="1.0" encoding="utf-8"?><QueueMessagesList><QueueMessage>' +
          "<MessageId>m-1</MessageId><InsertionTime>Fri, 23 Oct 2026 10:00:00 GMT</InsertionTime>" +
          "<ExpirationTime>Fri, 30 Oct 2026 10:00:00 GMT</ExpirationTime><PopReceipt>pr-1</PopReceipt>" +
          "<TimeNextVisible>Fri, 23 Oct 2026 10:00:00 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>",
      },
    );
    expect(request.method).toBe("POST");
    expect(request.url).toBe(`${QUEUE}/jobs/messages`);
    expect(request.headers["content-type"]).toBe("application/xml");
    expect(text(request.body)).toBe(
      '<?xml version="1.0" encoding="utf-8"?><QueueMessage><MessageText>a &lt; b &amp; c</MessageText></QueueMessage>',
    );
    expect(success(exit)).toEqual([
      {
        MessageId: "m-1",
        InsertionTime: "Fri, 23 Oct 2026 10:00:00 GMT",
        ExpirationTime: "Fri, 30 Oct 2026 10:00:00 GMT",
        PopReceipt: "pr-1",
        TimeNextVisible: "Fri, 23 Oct 2026 10:00:00 GMT",
      },
    ]);
  });

  test("a container ACL sends a bare <SignedIdentifiers> list", async () => {
    const { request } = await run(
      blob.SetContainerAccessPolicy({
        url: BLOB,
        containerName: "assets",
        body: [{ Id: "read-only", AccessPolicy: { Permission: "r", Expiry: "2027-01-01" } }],
      }),
    );
    expect(request.url).toBe(`${BLOB}/assets?restype=container&comp=acl`);
    expect(text(request.body)).toBe(
      '<?xml version="1.0" encoding="utf-8"?><SignedIdentifiers><SignedIdentifier><Id>read-only</Id>' +
        "<AccessPolicy><Expiry>2027-01-01</Expiry><Permission>r</Permission></AccessPolicy>" +
        "</SignedIdentifier></SignedIdentifiers>",
    );
  });

  test("service properties wrap CORS rules in <Cors><CorsRule>", async () => {
    const { request } = await run(
      blob.SetServiceProperties({
        url: BLOB,
        Cors: [
          {
            AllowedOrigins: "*",
            AllowedMethods: "GET",
            AllowedHeaders: "*",
            ExposedHeaders: "*",
            MaxAgeInSeconds: 60,
          },
        ],
        StaticWebsite: { Enabled: true, IndexDocument: "index.html" },
      }),
      { status: 202 },
    );
    expect(request.url).toBe(`${BLOB}/?restype=service&comp=properties`);
    expect(text(request.body)).toBe(
      '<?xml version="1.0" encoding="utf-8"?><StorageServiceProperties><Cors><CorsRule>' +
        "<AllowedOrigins>*</AllowedOrigins><AllowedMethods>GET</AllowedMethods>" +
        "<AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders>" +
        "<MaxAgeInSeconds>60</MaxAgeInSeconds></CorsRule></Cors>" +
        "<StaticWebsite><Enabled>true</Enabled><IndexDocument>index.html</IndexDocument>" +
        "</StaticWebsite></StorageServiceProperties>",
    );
  });

  test("a block list sends flattened <Latest> items", async () => {
    const { request } = await run(
      blob.ListBlockBlobCommitBlock({
        url: BLOB,
        containerName: "assets",
        blob: "big.bin",
        Latest: ["YmxvY2sx", "YmxvY2sy"],
      }),
      { status: 201 },
    );
    expect(request.url).toBe(`${BLOB}/assets/big.bin?comp=blocklist`);
    expect(text(request.body)).toBe(
      '<?xml version="1.0" encoding="utf-8"?><BlockList><Latest>YmxvY2sx</Latest><Latest>YmxvY2sy</Latest></BlockList>',
    );
  });

  test("file range upload and Data Lake append send raw bytes", async () => {
    const range = await run(
      file.UploadFileRange({
        url: FILE,
        shareName: "data",
        fileName: "logs/a.txt",
        xMsRange: "bytes=0-4",
        xMsWrite: "update",
        xMsFileRequestIntent: "backup",
        body: new TextEncoder().encode("hello"),
      }),
      { status: 201 },
    );
    expect(range.request.url).toBe(`${FILE}/data/logs/a.txt?comp=range`);
    expect(range.request.headers["x-ms-range"]).toBe("bytes=0-4");
    expect(range.request.headers["x-ms-file-request-intent"]).toBe("backup");
    expect(text(range.request.body)).toBe("hello");

    const append = await run(
      datalake.PathAppendData({
        url: DFS,
        filesystem: "lake",
        path: "raw.csv",
        position: 0,
        body: new TextEncoder().encode("a,b\n"),
      }),
      { status: 202 },
    );
    expect(append.request.method).toBe("PATCH");
    expect(append.request.url).toBe(`${DFS}/lake/raw.csv?position=0&action=append`);
    expect(text(append.request.body)).toBe("a,b\n");
  });
});

describe("Storage responses", () => {
  test("a download returns the bytes, typed headers and the metadata map", async () => {
    const bytes = new Uint8Array([0, 1, 2, 250, 255]);
    const { request, exit } = await run(
      blob.DownloadBlob({ url: BLOB, containerName: "assets", blob: "data.bin" }),
      {
        body: bytes,
        headers: {
          "Content-Length": "5",
          "Content-Type": "application/octet-stream",
          "x-ms-blob-type": "BlockBlob",
          "x-ms-server-encrypted": "true",
          "x-ms-meta-owner": "alchemy",
          ETag: '"0x1"',
        },
      },
    );
    expect(request.method).toBe("GET");
    const out = success(exit);
    expect(out.body).toEqual(bytes);
    expect(out.contentLength).toBe(5);
    expect(out.xMsBlobType).toBe("BlockBlob");
    expect(out.xMsServerEncrypted).toBe(true);
    expect(out.metadata).toEqual({ owner: "alchemy" });
    expect(out.eTag).toBe('"0x1"');
  });

  test("a HEAD reads properties from headers only", async () => {
    const { request, exit } = await run(
      blob.GetBlobProperties({ url: BLOB, containerName: "assets", blob: "data.bin" }),
      {
        headers: {
          "Content-Length": "1024",
          "x-ms-blob-type": "BlockBlob",
          "x-ms-meta-a": "1",
          "x-ms-meta-b": "2",
        },
      },
    );
    expect(request.method).toBe("HEAD");
    const out = success(exit);
    expect(out.contentLength).toBe(1024);
    expect(out.metadata).toEqual({ a: "1", b: "2" });
  });

  test("a blob listing reads attributes, text content, flattened items and maps", async () => {
    const xml =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<EnumerationResults ServiceEndpoint="https://acct.blob.core.windows.net/" ContainerName="assets">' +
      "<MaxResults>2</MaxResults><Blobs>" +
      "<Blob><Name>a.txt</Name><Deleted>false</Deleted><Snapshot /><Properties><Last-Modified>Fri, 23 Oct 2026 10:00:00 GMT</Last-Modified>" +
      "<Etag>0x1</Etag><Content-Length>11</Content-Length><BlobType>BlockBlob</BlobType>" +
      "<ServerEncrypted>true</ServerEncrypted></Properties>" +
      "<Metadata><owner>alchemy</owner></Metadata></Blob>" +
      '<Blob><Name Encoded="true">b%2Fc.txt</Name><Deleted>false</Deleted><Snapshot /><Properties><Last-Modified>Fri, 23 Oct 2026 10:00:00 GMT</Last-Modified>' +
      "<Etag>0x2</Etag><Content-Length>0</Content-Length></Properties></Blob>" +
      "</Blobs><NextMarker>next-1</NextMarker></EnumerationResults>";
    const { request, exit } = await run(
      blob.ListContainerBlobFlatSegment({
        url: BLOB,
        containerName: "assets",
        maxresults: 2,
        include: ["metadata"],
      }),
      { headers: { "Content-Type": "application/xml", "x-ms-request-id": "r-1" }, body: xml },
    );
    expect(request.url).toBe(
      `${BLOB}/assets?maxresults=2&include=metadata&restype=container&comp=list`,
    );
    const out = success(exit);
    expect(out.ServiceEndpoint).toBe("https://acct.blob.core.windows.net/");
    expect(out.ContainerName).toBe("assets");
    expect(out.MaxResults).toBe(2);
    expect(out.NextMarker).toBe("next-1");
    expect(out.xMsRequestId).toBe("r-1");
    const [a, b] = out.Segment.BlobItems;
    expect(out.Segment.BlobItems).toHaveLength(2);
    expect(a!.Name).toEqual({ content: "a.txt" });
    expect(a!.Properties.Content_Length).toBe(11);
    expect(a!.Properties.BlobType).toBe("BlockBlob");
    expect(a!.Properties.ServerEncrypted).toBe(true);
    expect(a!.Properties.Last_Modified).toBe("Fri, 23 Oct 2026 10:00:00 GMT");
    expect(a!.Metadata).toEqual({ owner: "alchemy" });
    expect(b!.Name).toEqual({ Encoded: true, content: "b%2Fc.txt" });
  });

  test("an empty listing decodes to no items", async () => {
    const { exit } = await run(
      blob.ListContainerBlobFlatSegment({ url: BLOB, containerName: "c" }),
      {
        headers: { "Content-Type": "application/xml" },
        body:
          '<?xml version="1.0" encoding="utf-8"?>' +
          '<EnumerationResults ServiceEndpoint="https://acct.blob.core.windows.net/" ContainerName="c">' +
          "<Blobs /><NextMarker /></EnumerationResults>",
      },
    );
    expect(success(exit).Segment.BlobItems).toEqual([]);
  });

  test("a container listing reads the wrapped <Containers><Container> list", async () => {
    const { exit } = await run(blob.ListServiceContainersSegment({ url: BLOB }), {
      headers: { "Content-Type": "application/xml" },
      body:
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<EnumerationResults ServiceEndpoint="https://acct.blob.core.windows.net/"><Containers>' +
        "<Container><Name>one</Name><Properties><Last-Modified>x</Last-Modified><Etag>e1</Etag></Properties></Container>" +
        "<Container><Name>two</Name><Properties><Last-Modified>y</Last-Modified><Etag>e2</Etag></Properties></Container>" +
        "</Containers><NextMarker /></EnumerationResults>",
    });
    expect(success(exit).ContainerItems.map((c) => c.Name)).toEqual(["one", "two"]);
  });

  test("dequeued messages decode from <QueueMessagesList>", async () => {
    const { request, exit } = await run(
      queue.MessagesDequeue({ url: QUEUE, queueName: "jobs", numofmessages: 2 }),
      {
        headers: { "Content-Type": "application/xml" },
        body:
          "<QueueMessagesList>" +
          ["1", "2"]
            .map(
              (n) =>
                `<QueueMessage><MessageId>m-${n}</MessageId><InsertionTime>t</InsertionTime>` +
                `<ExpirationTime>t</ExpirationTime><PopReceipt>p-${n}</PopReceipt>` +
                `<TimeNextVisible>t</TimeNextVisible><DequeueCount>${n}</DequeueCount>` +
                `<MessageText>hello ${n}</MessageText></QueueMessage>`,
            )
            .join("") +
          "</QueueMessagesList>",
      },
    );
    expect(request.url).toBe(`${QUEUE}/jobs/messages?numofmessages=2`);
    const out = success(exit);
    expect(out.map((m) => [m.MessageId, m.PopReceipt, m.DequeueCount, m.MessageText])).toEqual([
      ["m-1", "p-1", 1, "hello 1"],
      ["m-2", "p-2", 2, "hello 2"],
    ]);
  });

  test("an empty dequeue decodes to []", async () => {
    const { exit } = await run(queue.MessagesDequeue({ url: QUEUE, queueName: "jobs" }), {
      headers: { "Content-Type": "application/xml" },
      body: '<?xml version="1.0" encoding="utf-8"?><QueueMessagesList />',
    });
    expect(success(exit)).toEqual([]);
  });
});

describe("Storage errors", () => {
  const xmlError = (code: string, status: number): Canned => ({
    status,
    headers: { "Content-Type": "application/xml", "x-ms-error-code": code },
    body:
      `<?xml version="1.0" encoding="utf-8"?><Error><Code>${code}</Code>` +
      `<Message>${code} happened.\nRequestId:r-1</Message></Error>`,
  });

  test.each([
    ["BlobNotFound", 404],
    ["ContainerNotFound", 404],
    ["BlobAlreadyExists", 409],
    ["ContainerBeingDeleted", 409],
    ["ConditionNotMet", 412],
    ["AuthorizationPermissionMismatch", 403],
    ["AuthenticationFailed", 403],
  ])("an XML %s body is typed", async (code, status) => {
    const { exit } = await run(
      blob.DownloadBlob({ url: BLOB, containerName: "c", blob: "b" }),
      xmlError(code, status),
    );
    const expected: Record<string, string> = {
      ContainerBeingDeleted: "StorageBeingDeleted",
      ConditionNotMet: "PreconditionFailed",
      AuthorizationPermissionMismatch: "SchemaRegistryStorageAccessDenied",
      AuthenticationFailed: "StorageAuthenticationFailed",
    };
    expect(failureTag(exit)).toBe(expected[code] ?? code);
  });

  test("the message of an XML error is kept", async () => {
    const { exit } = await run(
      queue.DeleteMessageId({ url: QUEUE, queueName: "q", messageid: "m", popreceipt: "p" }),
      xmlError("MessageNotFound", 404),
    );
    expect(failureTag(exit)).toBe("MessageNotFound");
    if (Exit.isFailure(exit)) {
      const reason = exit.cause.reasons.find((r) => r._tag === "Fail") as unknown as {
        error: { message?: string; code?: string };
      };
      expect(reason.error.message).toBe("MessageNotFound happened.\nRequestId:r-1");
      expect(reason.error.code).toBe("MessageNotFound");
    }
  });

  test("a HEAD failure is typed from x-ms-error-code", async () => {
    const { exit } = await run(blob.GetContainerProperties({ url: BLOB, containerName: "gone" }), {
      status: 404,
      headers: { "x-ms-error-code": "ContainerNotFound" },
    });
    expect(failureTag(exit)).toBe("ContainerNotFound");
  });

  test("a Data Lake JSON error is typed", async () => {
    const { exit } = await run(datalake.ReadPath({ url: DFS, filesystem: "lake", path: "x" }), {
      status: 404,
      headers: { "Content-Type": "application/json", "x-ms-error-code": "PathNotFound" },
      body: JSON.stringify({
        error: { code: "PathNotFound", message: "The specified path does not exist." },
      }),
    });
    expect(failureTag(exit)).toBe("PathNotFound");
  });

  test("File and Queue not-found codes are typed", async () => {
    const share = await run(file.GetShareProperties({ url: FILE, shareName: "gone" }), {
      status: 404,
      headers: { "x-ms-error-code": "ShareNotFound" },
    });
    expect(failureTag(share.exit)).toBe("ShareNotFound");
    const q = await run(queue.GetQueueProperties({ url: QUEUE, queueName: "gone" }), {
      status: 404,
      headers: { "x-ms-error-code": "QueueNotFound" },
    });
    expect(failureTag(q.exit)).toBe("QueueNotFound");
  });
});

describe("SAS URLs", () => {
  test("an account SAS on the url authenticates by itself", async () => {
    const { request, exit } = await run(
      blob.UploadBlockBlob({
        url: `${BLOB}/?sv=2024-11-04&ss=b&srt=co&sp=rwdlac&se=2027-01-01&sig=abc%2B%3D`,
        containerName: "$web",
        blob: "index.html",
        body: new TextEncoder().encode("<h1>hi</h1>"),
      }),
      { status: 201 },
      noCredentials,
    );
    expect(request.headers.authorization).toBeUndefined();
    expect(request.url).toBe(
      `${BLOB}/%24web/index.html?sv=2024-11-04&ss=b&srt=co&sp=rwdlac&se=2027-01-01&sig=abc%2B%3D`,
    );
    expect(success(exit)).toEqual({});
  });

  test("the SAS query follows the operation's own query", async () => {
    const { request } = await run(
      blob.ListContainerBlobFlatSegment({ url: `${BLOB}?sv=1&sig=s`, containerName: "c" }),
      {
        headers: { "Content-Type": "application/xml" },
        body: '<EnumerationResults ServiceEndpoint="x" ContainerName="c"><Blobs /></EnumerationResults>',
      },
      noCredentials,
    );
    expect(request.url).toBe(`${BLOB}/c?restype=container&comp=list&sv=1&sig=s`);
  });

  test("a url query without a signature keeps bearer auth", async () => {
    const { request } = await run(
      blob.GetBlobTags({ url: `${BLOB}?foo=bar`, containerName: "c", blob: "b" }),
      { headers: { "Content-Type": "application/xml" }, body: "<Tags><TagSet /></Tags>" },
    );
    expect(request.headers.authorization).toBe(STORAGE_TOKEN);
  });
});

describe("Tables (OData JSON)", () => {
  test("insert entity sends JSON with OData headers and the Cosmos audience", async () => {
    const { request, exit } = await run(
      tables.InsertTableEntity({
        url: "https://acct.table.cosmos.azure.com",
        table: "orders",
        prefer: "return-no-content",
        body: { PartitionKey: "p1", RowKey: "r1", total: 42 },
      }),
      { status: 204 },
    );
    expect(request.method).toBe("POST");
    expect(request.url).toBe("https://acct.table.cosmos.azure.com/orders");
    expect(request.headers.authorization).toBe("Bearer aad:https://cosmos.azure.com/.default");
    expect(request.headers.accept).toBe("application/json;odata=minimalmetadata");
    expect(request.headers.dataserviceversion).toBe("3.0");
    expect(request.headers["x-ms-version"]).toBe("2019-02-02");
    expect(request.headers.prefer).toBe("return-no-content");
    expect(request.headers["content-type"]).toBe("application/json");
    expect(JSON.parse(text(request.body)!)).toEqual({
      PartitionKey: "p1",
      RowKey: "r1",
      total: 42,
    });
    expect(Exit.isSuccess(exit)).toBe(true);
  });

  test("a Storage Tables endpoint gets the Storage audience", async () => {
    const { request } = await run(
      tables.TableQueryEntities({
        url: "https://acct.table.core.windows.net",
        table: "orders",
        _filter: "PartitionKey eq 'p1'",
        _top: 10,
      }),
      { headers: { "Content-Type": "application/json" }, body: JSON.stringify({ value: [] }) },
    );
    expect(request.headers.authorization).toBe(STORAGE_TOKEN);
    expect(request.url).toBe(
      "https://acct.table.core.windows.net/orders()?%24top=10&%24filter=PartitionKey+eq+%27p1%27",
    );
  });

  test("create table posts { TableName }", async () => {
    const { request } = await run(
      tables.CreateTable({ url: "https://acct.table.core.windows.net", TableName: "orders" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
        body: '{"TableName":"orders"}',
      },
    );
    expect(request.url).toBe("https://acct.table.core.windows.net/Tables");
    expect(JSON.parse(text(request.body)!)).toEqual({ TableName: "orders" });
  });
});
