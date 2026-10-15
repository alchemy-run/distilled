/**
 * The official TypeScript SDKs, measured on the same calls as distilled's
 * programs: AWS SDK v3, the `cloudflare` package and `@google-cloud/storage`.
 *
 * Each program is the same 1 auth + 1 operation as the distilled program it
 * is compared with (`compare`). `setup` is a JS module body that exports
 * `make(transport)`: build the client once with the benchmark's mocked
 * transport and return a function that makes the call. `bundle` is the same
 * program with the SDK's default transport, the way an app would ship it.
 */
export interface OfficialProgram {
  readonly id: string;
  readonly label: string;
  /** npm package(s) measured. */
  readonly packages: ReadonlyArray<string>;
  /** The distilled program it is compared with: pkg + protocol. */
  readonly compare: { readonly pkg: string; readonly protocol: string };
  /** Module source exporting `make(transport)`; `transport` is `{ fetch, awsHandler }`. */
  readonly setup: string;
  /** Bundle entry: the program with the default transport. */
  readonly bundle: string;
}

const aws = (
  client: string,
  pkg: string,
  command: string,
  protocol: string,
  label: string,
): OfficialProgram => ({
  id: `aws-sdk-v3/${pkg.replace("@aws-sdk/client-", "")}`,
  label,
  packages: [pkg],
  compare: { pkg: "aws", protocol },
  setup: `import { ${client}, ${command} } from "${pkg}";
export const make = (t) => {
  const client = new ${client}({
    region: "us-east-1",
    credentials: { accessKeyId: "AKIA_BENCH", secretAccessKey: "bench" },
    requestHandler: t.awsHandler,
  });
  return () => client.send(new ${command}({}));
};`,
  bundle: `import { ${client}, ${command} } from "${pkg}";
const client = new ${client}({
  region: "us-east-1",
  credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY },
});
export default { fetch: () => client.send(new ${command}({})).then(() => new Response("ok")) };`,
});

export const OFFICIAL: ReadonlyArray<OfficialProgram> = [
  aws("S3Client", "@aws-sdk/client-s3", "ListBucketsCommand", "restXml", "S3 ListBuckets"),
  aws(
    "DynamoDBClient",
    "@aws-sdk/client-dynamodb",
    "ListTablesCommand",
    "awsJson1_0",
    "DynamoDB ListTables",
  ),
  aws("KMSClient", "@aws-sdk/client-kms", "ListKeysCommand", "awsJson1_1", "KMS ListKeys"),
  aws(
    "STSClient",
    "@aws-sdk/client-sts",
    "GetCallerIdentityCommand",
    "awsQuery",
    "STS GetCallerIdentity",
  ),
  aws(
    "EC2Client",
    "@aws-sdk/client-ec2",
    "DescribeRegionsCommand",
    "ec2Query",
    "EC2 DescribeRegions",
  ),
  aws(
    "LambdaClient",
    "@aws-sdk/client-lambda",
    "ListFunctionsCommand",
    "restJson1",
    "Lambda ListFunctions",
  ),
  {
    id: "cloudflare/workers.scripts.list",
    label: "Workers scripts.list",
    packages: ["cloudflare"],
    compare: { pkg: "cloudflare", protocol: "CloudflarePaginatedProtocol" },
    setup: `import Cloudflare from "cloudflare";
export const make = (t) => {
  const client = new Cloudflare({ apiToken: "bench-token", fetch: t.fetch });
  return () => client.workers.scripts.list({ account_id: "bench" });
};`,
    bundle: `import Cloudflare from "cloudflare";
const client = new Cloudflare({ apiToken: process.env.CLOUDFLARE_API_TOKEN });
export default { fetch: () => client.workers.scripts.list({ account_id: process.env.CLOUDFLARE_ACCOUNT_ID }).then(() => new Response("ok")) };`,
  },
  {
    id: "gcp/storage.getBuckets",
    label: "Storage getBuckets",
    packages: ["@google-cloud/storage"],
    compare: { pkg: "gcp", protocol: "GcpProtocol" },
    // A service-account key (generated per process) so the call signs a JWT
    // and exchanges it for a token, as a deployed app would.
    setup: `import { Storage } from "@google-cloud/storage";
export const make = (t) => {
  const client = new Storage({ projectId: "bench", credentials: { client_email: "bench@bench.iam.gserviceaccount.com", private_key: t.rsaKey } });
  return () => client.getBuckets();
};`,
    bundle: `import { Storage } from "@google-cloud/storage";
const client = new Storage({ projectId: process.env.GOOGLE_CLOUD_PROJECT });
export default { fetch: () => client.getBuckets().then(() => new Response("ok")) };`,
  },
];
