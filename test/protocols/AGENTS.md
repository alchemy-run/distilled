# test/protocols

Unit tests for AWS protocol serialization/deserialization. No network calls—tests run against generated schemas.

→ Parent: [AGENTS.md](../../AGENTS.md)

## KEY PRINCIPLE

**Use REAL generated schemas from `src/services/*.ts`** — not hand-written mocks. This ensures protocol tests validate actual codegen output.

## TEST HELPERS

```typescript
// Build request from schema + instance
const buildRequest = <A, I>(schema: S.Schema<A, I>, instance: A) => {
  const operation = { input: schema, output: schema, errors: [] };
  const builder = makeRequestBuilder(operation, { protocol });
  return builder({ ...instance });
};

// Parse response using protocol
const parseResponse = <A, I>(schema: S.Schema<A, I>, response: Response) => {
  const operation = { input: schema, output: schema, errors: [] };
  const parser = makeResponseParser(operation, { protocol });
  return parser(response);
};
```

## PROTOCOL → SERVICES

| Test File                | Protocol   | Services Used                |
| ------------------------ | ---------- | ---------------------------- |
| `rest-json.test.ts`      | restJson1  | Lambda, API Gateway, Glacier |
| `rest-xml.test.ts`       | restXml    | S3, CloudFront               |
| `aws-json-1.0.test.ts`   | awsJson1_0 | DynamoDB, Step Functions     |
| `aws-json-1.1.test.ts`   | awsJson1_1 | KMS                          |
| `aws-query.test.ts`      | awsQuery   | IAM, SNS, Neptune            |
| `ec2-query.test.ts`      | ec2Query   | EC2                          |
| `rules-resolver.test.ts` | —          | Endpoint rules engine        |
| `event-stream-*.test.ts` | —          | Binary event stream codec    |

## WHAT TESTS VERIFY

**Request Serialization:**

- HTTP method, path, query params from schema traits
- Path label substitution and URI encoding
- Body encoding (JSON, XML, form-urlencoded)
- Header bindings, timestamp formats

**Response Parsing:**

- Body deserialization to typed schema
- Header extraction
- Error parsing (HTTP status → typed TaggedError)

**Rules Engine:**

- Standard functions: `isSet`, `parseURL`, `stringEquals`, `substring`
- AWS functions: `parseArn`, `partition`, `isVirtualHostableS3Bucket`
- S3 endpoint resolution: virtual-hosted, path-style, accelerate

## RUNNING

```bash
bun test:protocols                           # All
bun vitest run ./test/protocols/rest-json.test.ts  # Single
```
