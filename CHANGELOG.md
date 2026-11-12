## v1.0.0-rc.19

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- No implicit defects in shipped SDK code, enforced by oxlint &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1102 [<samp>(0042c)</samp>](https://github.com/alchemy-run/distilled/commit/0042c8484)
- Regenerate every SDK from the latest spec mirrors &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1106 [<samp>(c52e5)</samp>](https://github.com/alchemy-run/distilled/commit/c52e552fb)
- Typed errors and schema fixes from release prep &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1099 [<samp>(ae7c1)</samp>](https://github.com/alchemy-run/distilled/commit/ae7c11528)
- **archil**:
  - One error tag per Archil error code &nbsp;-&nbsp; by **Dallen Pyrah** and **sam** in https://github.com/alchemy-run/distilled/issues/1091 [<samp>(2f289)</samp>](https://github.com/alchemy-run/distilled/commit/2f289cfde)
  - Drop ApiTokenCreationForbidden; a 401 is Unauthorized &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1131 [<samp>(72203)</samp>](https://github.com/alchemy-run/distilled/commit/72203ddf7)
- **boat-dev**:
  - Agent sign-in, the 2026-11-06 spec, and typed errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1092 [<samp>(b5ab6)</samp>](https://github.com/alchemy-run/distilled/commit/b5ab6ac53)
- **cloudflare**:
  - R2 jurisdiction as a layer, like AWS's region &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1047 [<samp>(9497c)</samp>](https://github.com/alchemy-run/distilled/commit/9497cce8c)
- **core**:
  - One debug log for every SDK, through TelemetryDebug &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1046 [<samp>(e916c)</samp>](https://github.com/alchemy-run/distilled/commit/e916ca8a5)
  - Fail with SdkError instead of dying &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1100 [<samp>(e54ca)</samp>](https://github.com/alchemy-run/distilled/commit/e54ca7b79)
- **fly-io**:
  - Mark app secret values sensitive &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1135 [<samp>(37705)</samp>](https://github.com/alchemy-run/distilled/commit/377059d8c)
- **github**:
  - GitHub App auth, OAuth code exchange and honest error types &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1079 [<samp>(0b78c)</samp>](https://github.com/alchemy-run/distilled/commit/0b78c7af3)
- **prisma**:
  - Allow Credentials without an API token &nbsp;-&nbsp; by **Will Madden** in https://github.com/alchemy-run/distilled/issues/1076 [<samp>(ed46c)</samp>](https://github.com/alchemy-run/distilled/commit/ed46c6c8d)

### &nbsp;&nbsp;&nbsp;🚀 Features

- Standalone @distilled.cloud/s3 client as the base of @distilled.cloud/aws, with a Cloudflare R2 layer &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1045 [<samp>(7eb11)</samp>](https://github.com/alchemy-run/distilled/commit/7eb11ab88)
- **anthropic**:
  - Add the Claude Platform (Anthropic) SDK &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1118 [<samp>(d2849)</samp>](https://github.com/alchemy-run/distilled/commit/d2849419c)
- **archil**:
  - Full API coverage, objects data plane and sandbox processes &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1035 [<samp>(284c8)</samp>](https://github.com/alchemy-run/distilled/commit/284c871e0)
- **aws**:
  - **ecs**: Nitro Sandbox trusted execution and Managed Instances enclaves &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1121 [<samp>(55eb5)</samp>](https://github.com/alchemy-run/distilled/commit/55eb5c827)
- **aws,cloudflare**:
  - Take the region per call as well as from a layer &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1063 [<samp>(ad5d3)</samp>](https://github.com/alchemy-run/distilled/commit/ad5d31bed)
- **boat-dev**:
  - Default org in credentials, sent as X-Boat-Org &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1112 [<samp>(6b9c8)</samp>](https://github.com/alchemy-run/distilled/commit/6b9c836d1)
- **cloudflare**:
  - List a container application's instances and Durable Objects &nbsp;-&nbsp; by **Dallen Pyrah** and **sam** in https://github.com/alchemy-run/distilled/issues/1096 [<samp>(63b5c)</samp>](https://github.com/alchemy-run/distilled/commit/63b5c7a2a)
  - **workers**: Preview observability and updatePreview &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1130 [<samp>(e4f05)</samp>](https://github.com/alchemy-run/distilled/commit/e4f052899)
- **coinflow**:
  - Add the Coinflow SDK &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1125 [<samp>(83f19)</samp>](https://github.com/alchemy-run/distilled/commit/83f19a067)
- **convex**:
  - Add the Convex SDK &nbsp;-&nbsp; by **Christian Stamati** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1030 [<samp>(b8ab1)</samp>](https://github.com/alchemy-run/distilled/commit/b8ab1c232)
- **core**:
  - Native gRPC — streaming operations, transport layers, proto3 presence, keyset pagination &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1067 [<samp>(70f72)</samp>](https://github.com/alchemy-run/distilled/commit/70f72d201)
  - GRPC over HTTP/2 on cloudflare:sockets &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1124 [<samp>(0d7c2)</samp>](https://github.com/alchemy-run/distilled/commit/0d7c21a5f)
- **daytona**:
  - Typed errors, pagination and the 2026-10-27 spec &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1034 [<samp>(a160d)</samp>](https://github.com/alchemy-run/distilled/commit/a160ded1b)
- **dokploy**:
  - Add the Dokploy SDK &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1117 [<samp>(04aa4)</samp>](https://github.com/alchemy-run/distilled/commit/04aa4f10d)
- **e2b**:
  - Add the E2B SDK &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1032 [<samp>(08100)</samp>](https://github.com/alchemy-run/distilled/commit/081009b8f)
- **entire**:
  - Add the Entire SDK &nbsp;-&nbsp; by **sam** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/986 [<samp>(33976)</samp>](https://github.com/alchemy-run/distilled/commit/33976e2a3)
- **exa**:
  - Add the Exa SDK &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1115 [<samp>(83f08)</samp>](https://github.com/alchemy-run/distilled/commit/83f081982)
- **linear**:
  - Add the Linear SDK &nbsp;-&nbsp; by **Patt O'Brien** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/698 [<samp>(4d3f4)</samp>](https://github.com/alchemy-run/distilled/commit/4d3f41e59)
- **mailchimp**:
  - Add the Mailchimp Marketing SDK &nbsp;-&nbsp; by **Jordan**, **Claude Opus 5.5** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/652 [<samp>(d2b16)</samp>](https://github.com/alchemy-run/distilled/commit/d2b16d9ea)
  - Add the Transactional API &nbsp;-&nbsp; by **Jordan**, **Claude Opus 5.5** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/653 [<samp>(f2dcd)</samp>](https://github.com/alchemy-run/distilled/commit/f2dcdf5b3)
- **modal**:
  - Speak binary gRPC and collect server streams &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1033 [<samp>(0b07e)</samp>](https://github.com/alchemy-run/distilled/commit/0b07e4d1f)
  - Call as the container over its API socket &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1081 [<samp>(14327)</samp>](https://github.com/alchemy-run/distilled/commit/14327c668)
- **netbird**:
  - Add the NetBird SDK &nbsp;-&nbsp; by **Kevin** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1024 [<samp>(287b7)</samp>](https://github.com/alchemy-run/distilled/commit/287b7e000)
- **npm**:
  - Add the npm registry SDK &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1114 [<samp>(8def0)</samp>](https://github.com/alchemy-run/distilled/commit/8def01463)
- **polymarket**:
  - Add the Polymarket SDK &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1116 [<samp>(405d9)</samp>](https://github.com/alchemy-run/distilled/commit/405d96342)
- **prisma**:
  - Management.layerS3 for Prisma buckets over @distilled.cloud/s3 &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1060 [<samp>(49fb0)</samp>](https://github.com/alchemy-run/distilled/commit/49fb00b86)
- **questrade**:
  - Add the Questrade SDK &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1136 [<samp>(7042d)</samp>](https://github.com/alchemy-run/distilled/commit/7042d14a1)
- **revenuecat**:
  - Add the RevenueCat SDK &nbsp;-&nbsp; by **Jordan**, **Claude Opus 5.5** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1027 [<samp>(f1f2e)</samp>](https://github.com/alchemy-run/distilled/commit/f1f2e476e)
- **rivet**:
  - Add the Rivet engine SDK &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1020 [<samp>(b2b4b)</samp>](https://github.com/alchemy-run/distilled/commit/b2b4b25e5)
- **steel**:
  - Add the Steel SDK &nbsp;-&nbsp; by **Matej** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1126 [<samp>(244f9)</samp>](https://github.com/alchemy-run/distilled/commit/244f9d343)
- **tailscale**:
  - Add the Tailscale SDK &nbsp;-&nbsp; by **mattespapier** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/956 [<samp>(803c6)</samp>](https://github.com/alchemy-run/distilled/commit/803c62ad6)
- **telemetry**:
  - Bedrock ConverseStream usage and finish reason from stream events &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1017 [<samp>(2a651)</samp>](https://github.com/alchemy-run/distilled/commit/2a651b24c)
- **tencentcloud**:
  - Add the Tencent Cloud SDK &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1119 [<samp>(8177f)</samp>](https://github.com/alchemy-run/distilled/commit/8177f5b51)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- One sensitive-value rule in core; debug logs and AWS encode errors redact secrets &nbsp;-&nbsp; by **Michael K (Pear)**, **TBIQ** and **sam** in https://github.com/alchemy-run/distilled/issues/1044 [<samp>(02949)</samp>](https://github.com/alchemy-run/distilled/commit/0294998ff)
- **archil**:
  - Type createBranch's conflict as Conflict &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1093 [<samp>(f6670)</samp>](https://github.com/alchemy-run/distilled/commit/f66704809)
  - CreateDisk and createApiToken always return their ids &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1094 [<samp>(c8c75)</samp>](https://github.com/alchemy-run/distilled/commit/c8c75d44c)
  - Add activeDataBytes and totalDataBytes to DiskResponse &nbsp;-&nbsp; by **Dallen Pyrah** in https://github.com/alchemy-run/distilled/issues/1090 [<samp>(86162)</samp>](https://github.com/alchemy-run/distilled/commit/86162e7e4)
- **aws**:
  - Build SSO, presign and fallback hosts from the partition's DNS suffix &nbsp;-&nbsp; by **gegi ⏾** and **Claude Opus 5.5** in https://github.com/alchemy-run/distilled/issues/1028 [<samp>(eece7)</samp>](https://github.com/alchemy-run/distilled/commit/eece7e4df)
  - Type the deletion-protected delete error on RDS, DocDB, Neptune &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1129 [<samp>(9476a)</samp>](https://github.com/alchemy-run/distilled/commit/9476ab477)
  - **ec2**: Type InvalidAddress.NotFound on describeAddresses &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1068 [<samp>(23518)</samp>](https://github.com/alchemy-run/distilled/commit/235184638)
  - **ecs**: Type ServiceRoleNotAssumable on createService/updateService &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1074 [<samp>(91bff)</samp>](https://github.com/alchemy-run/distilled/commit/91bffa802)
- **aws4signer**:
  - Send each query parameter once from AwsClient.signRequest &nbsp;-&nbsp; by **Michael K (Pear)** and **Will Madden** in https://github.com/alchemy-run/distilled/issues/1103 [<samp>(70d78)</samp>](https://github.com/alchemy-run/distilled/commit/70d781388)
- **axiom**:
  - IngestToDataset posts the edge route with its body as-is &nbsp;-&nbsp; by **Dallen Pyrah** in https://github.com/alchemy-run/distilled/issues/1095 [<samp>(08d6a)</samp>](https://github.com/alchemy-run/distilled/commit/08d6a126c)
- **build**:
  - Bundle-lib bundles a package's workspace dependencies first, even when not named &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1061 [<samp>(76b39)</samp>](https://github.com/alchemy-run/distilled/commit/76b3921dd)
- **cloudflare**:
  - Map loginPageAutoPrompt on passkeys identity providers &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1077 [<samp>(0798e)</samp>](https://github.com/alchemy-run/distilled/commit/0798edd35)
  - Give listPipelines page-mode pagination &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1085 [<samp>(46209)</samp>](https://github.com/alchemy-run/distilled/commit/46209663c)
  - Type preview on Durable Object namespace listings &nbsp;-&nbsp; by **apostoli** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1071 [<samp>(f64ec)</samp>](https://github.com/alchemy-run/distilled/commit/f64ec28eb)
  - **zero_trust**: Type AccessPolicyNotFound on getAccessPolicy &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1057 [<samp>(2332a)</samp>](https://github.com/alchemy-run/distilled/commit/2332a265d)
- **codegen**:
  - Support exact optional property types &nbsp;-&nbsp; by **Edward Bramanti** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1058 [<samp>(7f1f5)</samp>](https://github.com/alchemy-run/distilled/commit/7f1f59bfd)
- **core**:
  - An absent repeated message field decodes as [] &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1075 [<samp>(b3a4b)</samp>](https://github.com/alchemy-run/distilled/commit/b3a4baa35)
- **core,s3**:
  - Fail with InvalidInput when encoding the input throws &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1084 [<samp>(c5d5d)</samp>](https://github.com/alchemy-run/distilled/commit/c5d5d1830)
- **dev**:
  - Refuse to generate a paginated op its strategy can't walk &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1086 [<samp>(6c5dd)</samp>](https://github.com/alchemy-run/distilled/commit/6c5dd66ef)
  - Refuse to emit a streaming op without a streaming protocol &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1087 [<samp>(567bf)</samp>](https://github.com/alchemy-run/distilled/commit/567bf4fad)
  - Refuse generated gRPC and AWS configs the runtime can't call &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1088 [<samp>(d331b)</samp>](https://github.com/alchemy-run/distilled/commit/d331b534c)
- **fly-io**:
  - Type Tigris's missing-bucket error on deleteAddOn &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1051 [<samp>(451a5)</samp>](https://github.com/alchemy-run/distilled/commit/451a56c2d)
- **gcp**:
  - Drop the v1 ragManagedVertexVectorSearch model &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1023 [<samp>(44129)</samp>](https://github.com/alchemy-run/distilled/commit/44129c97a)
- **github**:
  - Re-export InvalidInput from errors &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/1062 [<samp>(1962e)</samp>](https://github.com/alchemy-run/distilled/commit/1962efe4d)
- **hetzner**:
  - Type PrimaryIpLimitExceeded on createServer and createLoadBalancer &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1059 [<samp>(5e41a)</samp>](https://github.com/alchemy-run/distilled/commit/5e41ae70c)
- **revenuecat**:
  - Share the 1.0.0-rc.18 version &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1138 [<samp>(4dc20)</samp>](https://github.com/alchemy-run/distilled/commit/4dc2095ba)
- **s3**:
  - Export the signing errors in PresignError from Presign &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/1066 [<samp>(f06b2)</samp>](https://github.com/alchemy-run/distilled/commit/f06b2b2cb)
- **stripe**:
  - Carry the HTTP status on InvalidRequestError &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1082 [<samp>(13807)</samp>](https://github.com/alchemy-run/distilled/commit/138078345)
- **telemetry**:
  - Forward the caller's trace context when no exporter is installed &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/1053 [<samp>(34fa0)</samp>](https://github.com/alchemy-run/distilled/commit/34fa02750)
- **vercel**:
  - Send DNS record fields on createRecord and scope getDomainsRecord to a team &nbsp;-&nbsp; by **Patt O'Brien** in https://github.com/alchemy-run/distilled/issues/1133 [<samp>(3a862)</samp>](https://github.com/alchemy-run/distilled/commit/3a8625876)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.18...HEAD)

---

## v1.0.0-rc.18

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- A missing credential env var fails the call with ConfigError instead of dying &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/965 [<samp>(2f873)</samp>](https://github.com/alchemy-run/distilled/commit/2f873920a)
- Region.fromEnv and Endpoint.fromEnv fail typed instead of dying &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/966 [<samp>(d570d)</samp>](https://github.com/alchemy-run/distilled/commit/d570d68a3)
- **aws**:
  - Typed failures instead of defects in credentials, presign, streams and event streams &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/958 [<samp>(7bc98)</samp>](https://github.com/alchemy-run/distilled/commit/7bc981702)
  - Refuse path and host labels that address another resource with a typed InvalidInput &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/1010 [<samp>(a9896)</samp>](https://github.com/alchemy-run/distilled/commit/a9896f87e)
- **axiom**:
  - Redact API tokens and notifier credentials in responses &nbsp;-&nbsp; by **mattespapier** in https://github.com/alchemy-run/distilled/issues/944 [<samp>(7832b)</samp>](https://github.com/alchemy-run/distilled/commit/7832b1a21)
- **core**:
  - Merge nested allOf property schemas in OpenAPI converter &nbsp;-&nbsp; by **sam** and **Michael K** in https://github.com/alchemy-run/distilled/issues/935 [<samp>(bc62a)</samp>](https://github.com/alchemy-run/distilled/commit/bc62a1fa4)
  - Config option/withDefault/orElse catch only a missing value &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/961 [<samp>(62a28)</samp>](https://github.com/alchemy-run/distilled/commit/62a28b832)
  - A ConfigProvider that cannot read its source fails with SourceError &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/962 [<samp>(4a402)</samp>](https://github.com/alchemy-run/distilled/commit/4a4028445)
  - Refuse a . or .. path label with a typed InvalidInput &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/963 [<samp>(89094)</samp>](https://github.com/alchemy-run/distilled/commit/89094c6a2)
  - One ConfigError: config readers fail with core ConfigError, ConfigMissing is removed &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/964 [<samp>(cc576)</samp>](https://github.com/alchemy-run/distilled/commit/cc5761c58)
  - Drop the NOPRIME env var &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/975 [<samp>(86bd5)</samp>](https://github.com/alchemy-run/distilled/commit/86bd53450)
- **fly-io**:
  - Redact add-on environment; mark secrets with patches &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/1012 [<samp>(36e71)</samp>](https://github.com/alchemy-run/distilled/commit/36e710da7)
- **gcp**:
  - An endpoint override that is not an absolute URL fails with ConfigError &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/971 [<samp>(ead03)</samp>](https://github.com/alchemy-run/distilled/commit/ead038919)
  - Remove dead storage pause and v1 AgentService ops; type four more errors &nbsp;-&nbsp; by **sam** and **Michael K** in https://github.com/alchemy-run/distilled/issues/997 [<samp>(275f3)</samp>](https://github.com/alchemy-run/distilled/commit/275f3a701)

### &nbsp;&nbsp;&nbsp;🚀 Features

- Telemetry with spans defined by Smithy traits, for every SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/977 [<samp>(69620)</samp>](https://github.com/alchemy-run/distilled/commit/696203b4b)
- **aws4signer**:
  - SigV4A signing for EventBridge global endpoints &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/931 [<samp>(4baa9)</samp>](https://github.com/alchemy-run/distilled/commit/4baa93c7e)
- **benches**:
  - Repo size in benchmark comments and the dashboard &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/941 [<samp>(436bd)</samp>](https://github.com/alchemy-run/distilled/commit/436bd4e9b)
- **cloudflare**:
  - Accept rollout_active_grace_period on Container application create and update &nbsp;-&nbsp; by **Andoni Enriquez**, **Claude Opus 5.5** and **Michael K** in https://github.com/alchemy-run/distilled/issues/918 [<samp>(6ac77)</samp>](https://github.com/alchemy-run/distilled/commit/6ac779136)
  - Workflow jurisdiction &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/994 [<samp>(75e95)</samp>](https://github.com/alchemy-run/distilled/commit/75e95798e)
  - Update spec to 2026-10-29 &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/999 [<samp>(c27df)</samp>](https://github.com/alchemy-run/distilled/commit/c27df876a)
  - **workers**: Type Durable Object code_update_strategy &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1021 [<samp>(b5713)</samp>](https://github.com/alchemy-run/distilled/commit/b57136bad)
- **codegen**:
  - Convert in memory under generate; stop committing .generated-specs &nbsp;-&nbsp; by **sam** and **Michael K** in https://github.com/alchemy-run/distilled/issues/933 [<samp>(ae0d5)</samp>](https://github.com/alchemy-run/distilled/commit/ae0d5e257)
- **gcp**:
  - AlloyDB executeSql and typed Spanner DDL operation ids &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/987 [<samp>(1de00)</samp>](https://github.com/alchemy-run/distilled/commit/1de00de2b)
- **github**:
  - Webhook payload types, accept media types, repos.getById &nbsp;-&nbsp; by **sam** and **Michael K** in https://github.com/alchemy-run/distilled/issues/936 [<samp>(11ae2)</samp>](https://github.com/alchemy-run/distilled/commit/11ae2046b)
  - Link-header pagination; GraphQL Query SDK &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/983 [<samp>(0418e)</samp>](https://github.com/alchemy-run/distilled/commit/0418ebc5d)
- **planetscale**:
  - Add service token access operations &nbsp;-&nbsp; by **Jason Kuhrt** and **Michael K** in https://github.com/alchemy-run/distilled/issues/1006 [<samp>(394a0)</samp>](https://github.com/alchemy-run/distilled/commit/394a0e6af)
- **prisma**:
  - Domain ownership operations and typed DomainOwnershipRequired &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1007 [<samp>(02e18)</samp>](https://github.com/alchemy-run/distilled/commit/02e187701)
- **telemetry**:
  - Semconv v1.44: Azure resource group, Bedrock GenAI attributes &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/995 [<samp>(158a0)</samp>](https://github.com/alchemy-run/distilled/commit/158a0caf1)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Typed failures for bad coinbase keys, gcp ADC files and non-Latin-1 Basic credentials &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/959 [<samp>(25796)</samp>](https://github.com/alchemy-run/distilled/commit/2579674f0)
- Withhold sensitive response bodies in seven more hand-written protocols &nbsp;-&nbsp; by **mattespapier** and **Michael K** in https://github.com/alchemy-run/distilled/issues/945 [<samp>(76c8e)</samp>](https://github.com/alchemy-run/distilled/commit/76c8e6593)
- Typed errors and schema fixes from release prep &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1022 [<samp>(f62ae)</samp>](https://github.com/alchemy-run/distilled/commit/f62ae9c6e)
- **aws**:
  - Strict mode fails a modeled event-stream event that does not match its schema &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/967 [<samp>(e4458)</samp>](https://github.com/alchemy-run/distilled/commit/e4458ec26)
  - Endpoint rule errors fail with EndpointError, not retried &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/968 [<samp>(06a73)</samp>](https://github.com/alchemy-run/distilled/commit/06a732b89)
  - Keep the original stream error instead of re-wrapping it &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/969 [<samp>(07996)</samp>](https://github.com/alchemy-run/distilled/commit/07996e201)
  - Refuse an event-stream prelude length below the 16-byte minimum &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/973 [<samp>(3f88d)</samp>](https://github.com/alchemy-run/distilled/commit/3f88de4b6)
  - Working browser builds without changing what Node loads &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/974 [<samp>(09a9a)</samp>](https://github.com/alchemy-run/distilled/commit/09a9abcf9)
  - Redact sensitive members of responses that do not match their schema &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/1011 [<samp>(be250)</samp>](https://github.com/alchemy-run/distilled/commit/be250adfa)
  - Keep sensitive members redacted in an event that fails to decode &nbsp;-&nbsp; by **mattespapier** in https://github.com/alchemy-run/distilled/issues/953 [<samp>(f529e)</samp>](https://github.com/alchemy-run/distilled/commit/f529eede3)
  - **ec2**: Type IdempotentParameterMismatch on CreateVolume and RunInstances &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/984 [<samp>(09397)</samp>](https://github.com/alchemy-run/distilled/commit/093970e1b)
  - **ecs**: Type ServiceLinkedRoleNotAssumable on PutClusterCapacityProviders &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/928 [<samp>(9eddd)</samp>](https://github.com/alchemy-run/distilled/commit/9edddffb1)
  - **s3**: Type InvalidAccessKeyId on every operation &nbsp;-&nbsp; by **Michael K** and **mattespapier** in https://github.com/alchemy-run/distilled/issues/1014 [<samp>(8ae94)</samp>](https://github.com/alchemy-run/distilled/commit/8ae945e3a)
  - **sns**: Type FifoTopicDataProtectionUnsupported on data protection policy ops &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/929 [<samp>(05f07)</samp>](https://github.com/alchemy-run/distilled/commit/05f07bf1c)
- **bench**:
  - Time added latency's call and roundtrip together &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/957 [<samp>(c7017)</samp>](https://github.com/alchemy-run/distilled/commit/c7017b88b)
- **cloudflare**:
  - Paginate queues listQueues &nbsp;-&nbsp; by **Andoni Enriquez**, **Claude Opus 5.5** and **Michael K** in https://github.com/alchemy-run/distilled/issues/919 [<samp>(c9a78)</samp>](https://github.com/alchemy-run/distilled/commit/c9a786098)
  - Stop page pagination when result_info shows the last page &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/937 [<samp>(dfd18)</samp>](https://github.com/alchemy-run/distilled/commit/dfd18f6d9)
  - Type the Container network configuration &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/988 [<samp>(f9782)</samp>](https://github.com/alchemy-run/distilled/commit/f9782bf4e)
  - Declare Forbidden on every operation &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/989 [<samp>(e3678)</samp>](https://github.com/alchemy-run/distilled/commit/e3678a32e)
  - Workflow instance params are any JSON value &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/996 [<samp>(6cd6b)</samp>](https://github.com/alchemy-run/distilled/commit/6cd6b86dd)
  - Type WorkflowInternalError on workflow instance operations &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1008 [<samp>(3f8d4)</samp>](https://github.com/alchemy-run/distilled/commit/3f8d4017d)
  - **dns**: Drop foundation_dns from DNS settings requests &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/930 [<samp>(4a11a)</samp>](https://github.com/alchemy-run/distilled/commit/4a11aeafc)
  - **email_routing**: Type patchDns missing-subdomain error &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1004 [<samp>(dde8f)</samp>](https://github.com/alchemy-run/distilled/commit/dde8f025e)
  - **workers**: Type UnknownWorkerEntrypoint on Worker uploads &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1009 [<samp>(21459)</samp>](https://github.com/alchemy-run/distilled/commit/21459ed61)
- **coinbase**:
  - Map an error body that is not the Coinbase envelope by HTTP status &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/972 [<samp>(4db06)</samp>](https://github.com/alchemy-run/distilled/commit/4db069e30)
- **core**:
  - Typed failures for body reads, reused catchers, null pages and malformed GraphQL responses &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/960 [<samp>(a9703)</samp>](https://github.com/alchemy-run/distilled/commit/a97030f1a)
  - Redact sensitive map values and list elements when decoding a response &nbsp;-&nbsp; by **mattespapier** and **Michael K** in https://github.com/alchemy-run/distilled/issues/942 [<samp>(c005d)</samp>](https://github.com/alchemy-run/distilled/commit/c005db2c8)
- **gcp**:
  - A failed metadata project-id read fails the credentials instead of leaving project unset &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/970 [<samp>(25088)</samp>](https://github.com/alchemy-run/distilled/commit/250886bf6)
  - Type Bigtable's 400 for a table that isn't ready &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/993 [<samp>(e1e01)</samp>](https://github.com/alchemy-run/distilled/commit/e1e01814b)
  - Type GovernedAgentNotFound; model v1 ragManagedVertexVectorSearch &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/1018 [<samp>(281a3)</samp>](https://github.com/alchemy-run/distilled/commit/281a3de5b)
  - **pubsub**: Type BigQueryServiceAccountNotReady on subscriptions create/patch &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/985 [<samp>(5b149)</samp>](https://github.com/alchemy-run/distilled/commit/5b149e5ae)
- **scripts**:
  - Stub service modules that export op aliases &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/926 [<samp>(032eb)</samp>](https://github.com/alchemy-run/distilled/commit/032ebf41a)
- **telemetry**:
  - Span timing for streamed responses (GenAI streams cover the stream, others end at headers) &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/1016 [<samp>(3c5d2)</samp>](https://github.com/alchemy-run/distilled/commit/3c5d2a3cd)

### &nbsp;&nbsp;&nbsp;🏎 Performance

- **build**:
  - Cut bundle-lib peak memory by building services separately &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/922 [<samp>(1ab88)</samp>](https://github.com/alchemy-run/distilled/commit/1ab88b3df)
  - Halve bundle-lib memory and cut its time 4-7x &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/934 [<samp>(26512)</samp>](https://github.com/alchemy-run/distilled/commit/26512492a)
- **codegen**:
  - Apply post-processing edits in one pass &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/938 [<samp>(0021b)</samp>](https://github.com/alchemy-run/distilled/commit/0021bace3)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.17...HEAD)

---

## v1.0.0-rc.17

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **core**: Remove lazy service stubs &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/916 [<samp>(cd361)</samp>](https://github.com/alchemy-run/distilled/commit/cd36178fa)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **cloudflare**: Type SQL custom alerts and Workers Issues automations &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/923 [<samp>(0a258)</samp>](https://github.com/alchemy-run/distilled/commit/0a25891cc)
- **core**: Opt-in lazy service stubs behind the distilled-lazy condition &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/917 [<samp>(07830)</samp>](https://github.com/alchemy-run/distilled/commit/07830aae3)
- **fly-io**: Builders service with ensureDepotRemoteBuilder &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/925 [<samp>(a245b)</samp>](https://github.com/alchemy-run/distilled/commit/a245bf5b9)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **aws**:
  - **glue**: Type Lake Formation denial on deleteDatabase &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/924 [<samp>(96cf2)</samp>](https://github.com/alchemy-run/distilled/commit/96cf26b6a)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.16...HEAD)

---

## v1.0.0-rc.16

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- Cut SDK bundle size, import memory and call latency; add per-SDK benchmark dashboard &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/873 [<samp>(c503e)</samp>](https://github.com/alchemy-run/distilled/commit/c503e2393)
- **cloudflare**: One Container application type per scheduling policy &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/909 [<samp>(ec259)</samp>](https://github.com/alchemy-run/distilled/commit/ec2590f89)
- **core**: Add the additionalProperties validation mode; strict rejects unmodeled keys &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/899 [<samp>(4e3b8)</samp>](https://github.com/alchemy-run/distilled/commit/4e3b88f8e)
- **core,railway**: Type and decode sensitive GraphQL fields as Redacted &nbsp;-&nbsp; by **mattespapier** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/869 [<samp>(b013e)</samp>](https://github.com/alchemy-run/distilled/commit/b013eeadb)
- **fly-io**: Redact newly created app deploy tokens &nbsp;-&nbsp; by **mattespapier** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/865 [<samp>(2c284)</samp>](https://github.com/alchemy-run/distilled/commit/2c284d5ac)
- **onepassword**: Add the Events, Users, OAuth and Partnership APIs; move Connect into a service &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/896 [<samp>(c661e)</samp>](https://github.com/alchemy-run/distilled/commit/c661e8e40)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **aws**:
  - Bump spec mirror for Lambda Web Functions (lambda-web, lambda-core) &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/878 [<samp>(044b6)</samp>](https://github.com/alchemy-run/distilled/commit/044b69039)
- **aws4signer**:
  - Add @distilled.cloud/aws4signer standalone SigV4 signer &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/888 [<samp>(7b13f)</samp>](https://github.com/alchemy-run/distilled/commit/7b13f2f9e)
  - AwsClient, presign and host-based scope guessing, matching aws4fetch &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/893 [<samp>(f530c)</samp>](https://github.com/alchemy-run/distilled/commit/f530c2d55)
- **boat-dev**:
  - Regenerate from the 2026-10-22 spec &nbsp;-&nbsp; by **Jeremy Osih** in https://github.com/alchemy-run/distilled/issues/904 [<samp>(cc993)</samp>](https://github.com/alchemy-run/distilled/commit/cc993734f)
- **cloudflare**:
  - Regenerate from the 2026-10-21 spec; add R2 Local Uploads ops &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/898 [<samp>(6b7ba)</samp>](https://github.com/alchemy-run/distilled/commit/6b7baf62a)
- **core,azure**:
  - Decode T.Header output members; expose Azure long-running operation headers &nbsp;-&nbsp; by **Michael K (Pear)** and **Maxwell Brown** in https://github.com/alchemy-run/distilled/issues/905 [<samp>(e4701)</samp>](https://github.com/alchemy-run/distilled/commit/e4701be45)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Run bundle-lib on Windows &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/887 [<samp>(3d770)</samp>](https://github.com/alchemy-run/distilled/commit/3d7706eb9)
- Type Cloudflare AI Search deletion-in-progress and GCP CES version-in-use errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/885 [<samp>(eb746)</samp>](https://github.com/alchemy-run/distilled/commit/eb746e257)
- **aws**:
  - Renew an expired SSO access token with the cached refresh token &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/890 [<samp>(82e0e)</samp>](https://github.com/alchemy-run/distilled/commit/82e0e9dfa)
  - Don't repeat the bucket in path-style S3 requests &nbsp;-&nbsp; by **Ethan Shumate** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/663 [<samp>(d7ed7)</samp>](https://github.com/alchemy-run/distilled/commit/d7ed7c47d)
  - Stop swallowing errors in the endpoint resolver &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/892 [<samp>(fb050)</samp>](https://github.com/alchemy-run/distilled/commit/fb05095fc)
  - Read sso-session sections from AWS_CONFIG_FILE &nbsp;-&nbsp; by **Michael K (Pear)** and **William Blazer** in https://github.com/alchemy-run/distilled/issues/912 [<samp>(3ea29)</samp>](https://github.com/alchemy-run/distilled/commit/3ea2974a3)
  - **datazone**: Type EnvironmentBlueprintConfigurationInUse on deleteEnvironmentBlueprintConfiguration &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/910 [<samp>(3d5c9)</samp>](https://github.com/alchemy-run/distilled/commit/3d5c9df64)
  - **emr-containers**: Type EksClusterConnectionUpdating on createVirtualCluster &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/908 [<samp>(338f4)</samp>](https://github.com/alchemy-run/distilled/commit/338f4c92b)
  - **lambda**: Type IAM and security-group propagation errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/879 [<samp>(a6517)</samp>](https://github.com/alchemy-run/distilled/commit/a65178cea)
  - **lambda-web**: Type ExecutionRoleNotAssumable &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/874 [<samp>(8bd88)</samp>](https://github.com/alchemy-run/distilled/commit/8bd88a5fe)
- **cloudflare**:
  - Paginate observability destinations &nbsp;-&nbsp; by **Yannic Charlon** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/881 [<samp>(f8e56)</samp>](https://github.com/alchemy-run/distilled/commit/f8e560af0)
  - Keep the response body when an error envelope has no errors[0].message &nbsp;-&nbsp; by **TBIQ007**, **TBIQ** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/827 [<samp>(8c444)</samp>](https://github.com/alchemy-run/distilled/commit/8c44428f8)
  - Stop double-wrapping the endpoint healthcheck list &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/901 [<samp>(840b9)</samp>](https://github.com/alchemy-run/distilled/commit/840b97149)
  - Keep destinationConf on observability destination responses, now optional &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/902 [<samp>(b6595)</samp>](https://github.com/alchemy-run/distilled/commit/b65951432)
  - Paginate hyperdrive listConfigs and type the name-exists error &nbsp;-&nbsp; by **Matthias Pichler** and **Claude Fable 5.1** in https://github.com/alchemy-run/distilled/issues/825 [<samp>(c63a0)</samp>](https://github.com/alchemy-run/distilled/commit/c63a0ace7)
  - **ai**: Keep slashes in runAi model names; type InputTooBig &nbsp;-&nbsp; by **sam**, **Claude Fable 5.1** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/863 [<samp>(4ba45)</samp>](https://github.com/alchemy-run/distilled/commit/4ba4575d8)
  - **r2**: PutBucketLocalUploads response omits enabled &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/911 [<samp>(6fb92)</samp>](https://github.com/alchemy-run/distilled/commit/6fb929209)
- **core**:
  - Extract large pagination arrays without stack overflow &nbsp;-&nbsp; by **Ibrahim Elkamali** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/880 [<samp>(62c61)</samp>](https://github.com/alchemy-run/distilled/commit/62c616f5b)
  - Refuse a "." or ".." path label before sending &nbsp;-&nbsp; by **mattespapier** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/840 [<samp>(4fa89)</samp>](https://github.com/alchemy-run/distilled/commit/4fa89cfbc)
  - Keep GraphQL field tables when the client is bundled &nbsp;-&nbsp; by **mattespapier** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/841 [<samp>(e59fe)</samp>](https://github.com/alchemy-run/distilled/commit/e59fe880a)
  - Unwrap Redacted GraphQL variables before encoding and field dedup &nbsp;-&nbsp; by **mattespapier** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/868 [<samp>(f7466)</samp>](https://github.com/alchemy-run/distilled/commit/f74669bdd)
  - Redact sensitive fields when a response fails to parse &nbsp;-&nbsp; by **mattespapier** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/839 [<samp>(12751)</samp>](https://github.com/alchemy-run/distilled/commit/12751a703)
- **core,turbopuffer**:
  - Keep additionalProperties on OpenAPI objects that also declare properties &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/897 [<samp>(63b16)</samp>](https://github.com/alchemy-run/distilled/commit/63b168d07)
- **digitalocean**:
  - Paginate list operations, type page links, add duplicate-key and unknown-tag errors &nbsp;-&nbsp; by **Ricardo**, **Claude Fable 5.1** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/822 [<samp>(9892e)</samp>](https://github.com/alchemy-run/distilled/commit/9892e563f)
- **doppler**:
  - Accept any secret name, null values and full config inheritance &nbsp;-&nbsp; by **Patt O'Brien** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/876 [<samp>(65aaf)</samp>](https://github.com/alchemy-run/distilled/commit/65aaf6d9b)
- **fly-io**:
  - Accept a null next_continuation_token from listSprites &nbsp;-&nbsp; by **mattespapier** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/864 [<samp>(1defd)</samp>](https://github.com/alchemy-run/distilled/commit/1defd96d3)
  - Redact sensitive fields in GraphQL add-on responses &nbsp;-&nbsp; by **mattespapier** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/867 [<samp>(45e1f)</samp>](https://github.com/alchemy-run/distilled/commit/45e1f51df)
- **gcp**:
  - Type HTTP 412 on storage objects.delete and objects.patch &nbsp;-&nbsp; by **Lucas Duailibe** in https://github.com/alchemy-run/distilled/issues/877 [<samp>(4cd62)</samp>](https://github.com/alchemy-run/distilled/commit/4cd626765)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.15...HEAD)

---

## v1.0.0-rc.15

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **cloudflare**: Ssh connection rules on reusable Access policies, keep service_auth_401_redirect &nbsp;-&nbsp; by **Damjan Znidarsic** and **Sam Goodwin** in https://github.com/alchemy-run/distilled/issues/658 [<samp>(81fea)</samp>](https://github.com/alchemy-run/distilled/commit/81fea8548)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.14...HEAD)

---

## v1.0.0-rc.14

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- Credential providers take secrets as Redacted only &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/710 [<samp>(ca81e)</samp>](https://github.com/alchemy-run/distilled/commit/ca81ed2f9)
- **gcp**: FromWorkloadIdentity credentials (workload identity federation) &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/712 [<samp>(703f0)</samp>](https://github.com/alchemy-run/distilled/commit/703f0d884)

### &nbsp;&nbsp;&nbsp;🚀 Features

- K2 + Pipelines ingest (cloudflare) and Apache Iceberg REST Catalog SDK &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/730 [<samp>(fb909)</samp>](https://github.com/alchemy-run/distilled/commit/fb909f88e)
- **acme**:
  - Convert the SDK from RFC 8555 &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/852 [<samp>(424e5)</samp>](https://github.com/alchemy-run/distilled/commit/424e54104)
- **adyen**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/759 [<samp>(a5189)</samp>](https://github.com/alchemy-run/distilled/commit/a5189aec3)
- **apache-superset**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/761 [<samp>(59ce4)</samp>](https://github.com/alchemy-run/distilled/commit/59ce4ddb4)
- **archil**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/755 [<samp>(17de2)</samp>](https://github.com/alchemy-run/distilled/commit/17de22511)
- **argocd**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/756 [<samp>(3e0f4)</samp>](https://github.com/alchemy-run/distilled/commit/3e0f47c32)
- **auth0**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/757 [<samp>(587db)</samp>](https://github.com/alchemy-run/distilled/commit/587db8a3b)
- **aws**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/743 [<samp>(8dffe)</samp>](https://github.com/alchemy-run/distilled/commit/8dffe77b3)
  - **auto-scaling**: Type InvalidIamInstanceProfile on create/updateAutoScalingGroup &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/764 [<samp>(d6ae0)</samp>](https://github.com/alchemy-run/distilled/commit/d6ae0c898)
  - **ec2**: Type ClientVpnEndpointCreationInProgress on createClientVpnEndpoint &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/830 [<samp>(2df2d)</samp>](https://github.com/alchemy-run/distilled/commit/2df2d5f4e)
  - **ses**: Type ReceiptRuleRoleNotAssumable on receipt rule create/update &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/753 [<samp>(02984)</samp>](https://github.com/alchemy-run/distilled/commit/02984c254)
- **axiom**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/742 [<samp>(0803d)</samp>](https://github.com/alchemy-run/distilled/commit/0803d6152)
- **azure**:
  - Greedy ARM scope labels and typed Azure errors &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/687 [<samp>(08829)</samp>](https://github.com/alchemy-run/distilled/commit/08829c695)
  - Quota, relationships and hybridnetwork patches + typed errors &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/719 [<samp>(877aa)</samp>](https://github.com/alchemy-run/distilled/commit/877aac922)
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/751 [<samp>(1abeb)</samp>](https://github.com/alchemy-run/distilled/commit/1abebeb9e)
- **boat-dev**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/758 [<samp>(5137b)</samp>](https://github.com/alchemy-run/distilled/commit/5137bc5a1)
- **celld, fly-io**:
  - Read the hand-written specs from their mirrors &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/854 [<samp>(676ad)</samp>](https://github.com/alchemy-run/distilled/commit/676ad9b26)
- **chronosphere**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/760 [<samp>(3f69a)</samp>](https://github.com/alchemy-run/distilled/commit/3f69a17c8)
- **clerk**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/768 [<samp>(2fb67)</samp>](https://github.com/alchemy-run/distilled/commit/2fb67bae7)
- **cloudflare**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/727 [<samp>(0807b)</samp>](https://github.com/alchemy-run/distilled/commit/0807b95e9)
  - Support Workers Issues observability &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/728 [<samp>(bd6ae)</samp>](https://github.com/alchemy-run/distilled/commit/bd6aeee52)
  - Artifacts events: Worker event triggers and subscription sources &nbsp;-&nbsp; by **Matthew Aylward**, **Butch78**, **Claude Opus 5.5** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/705 [<samp>(71e1f)</samp>](https://github.com/alchemy-run/distilled/commit/71e1fb450)
  - Add observability.issues + redact_query_string to script upload metadata &nbsp;-&nbsp; by **viz** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/700 [<samp>(9c986)</samp>](https://github.com/alchemy-run/distilled/commit/9c9862d2b)
  - Add Worker upload metadata exports &nbsp;-&nbsp; by **Alex**, **Claude Opus 5.5** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/589 [<samp>(9aff5)</samp>](https://github.com/alchemy-run/distilled/commit/9aff5a2ac)
  - Support the Durable Object Container API &nbsp;-&nbsp; by **Dan van der Merwe** and **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/685 [<samp>(490a2)</samp>](https://github.com/alchemy-run/distilled/commit/490a23b0f)
  - Exports on Worker Preview deployments &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/870 [<samp>(6e75f)</samp>](https://github.com/alchemy-run/distilled/commit/6e75fecd2)
- **codegen**:
  - Stamp distilled.generatedAt in each SDK's package.json &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/845 [<samp>(21dc2)</samp>](https://github.com/alchemy-run/distilled/commit/21dc2dddd)
  - Stamp distilled.specUpdatedAt next to generatedAt &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/846 [<samp>(cced6)</samp>](https://github.com/alchemy-run/distilled/commit/cced62a87)
- **coinbase**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/736 [<samp>(a5bb7)</samp>](https://github.com/alchemy-run/distilled/commit/a5bb7b42d)
- **coolify**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/772 [<samp>(37778)</samp>](https://github.com/alchemy-run/distilled/commit/37778a0bb)
- **core**:
  - Patch audit in core, with a generate-time patch stage &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/714 [<samp>(d7039)</samp>](https://github.com/alchemy-run/distilled/commit/d7039a080)
  - Apply Smithy patches before the verbNoun rename &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/818 [<samp>(56741)</samp>](https://github.com/alchemy-run/distilled/commit/56741e3f0)
- **customerio**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/767 [<samp>(ca07f)</samp>](https://github.com/alchemy-run/distilled/commit/ca07fd58f)
- **datadog**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/775 [<samp>(72dcf)</samp>](https://github.com/alchemy-run/distilled/commit/72dcf015a)
- **daytona**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/771 [<samp>(d6ab5)</samp>](https://github.com/alchemy-run/distilled/commit/d6ab57fd8)
- **digitalocean**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/766 [<samp>(2c751)</samp>](https://github.com/alchemy-run/distilled/commit/2c7517159)
- **discord**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/734 [<samp>(45a68)</samp>](https://github.com/alchemy-run/distilled/commit/45a68016e)
- **docker**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/769 [<samp>(01599)</samp>](https://github.com/alchemy-run/distilled/commit/01599386a)
- **doppler**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/774 [<samp>(dead2)</samp>](https://github.com/alchemy-run/distilled/commit/dead2296c)
- **elasticsearch**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/770 [<samp>(9ee11)</samp>](https://github.com/alchemy-run/distilled/commit/9ee112738)
- **expo-eas**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/737 [<samp>(0d855)</samp>](https://github.com/alchemy-run/distilled/commit/0d855ca67)
- **fly-io**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/741 [<samp>(076c2)</samp>](https://github.com/alchemy-run/distilled/commit/076c254d5)
  - Build sprites and add-ons from the spec mirror &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/849 [<samp>(b841f)</samp>](https://github.com/alchemy-run/distilled/commit/b841ff257)
- **forgejo**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/783 [<samp>(c55c1)</samp>](https://github.com/alchemy-run/distilled/commit/c55c134f0)
- **gcp**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/763 [<samp>(9b10b)</samp>](https://github.com/alchemy-run/distilled/commit/9b10b9258)
  - Application Default Credentials (fromApplicationDefault) &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/831 [<samp>(566fc)</samp>](https://github.com/alchemy-run/distilled/commit/566fc5fc0)
  - Mirror the Storage Insights v1 discovery doc &nbsp;-&nbsp; by **Bartek**, **Claude Opus 5.5**, **sam** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/828 [<samp>(1db06)</samp>](https://github.com/alchemy-run/distilled/commit/1db06c7e1)
- **github**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/773 [<samp>(c4a1e)</samp>](https://github.com/alchemy-run/distilled/commit/c4a1ecab7)
- **google-workspace**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/802 [<samp>(165c1)</samp>](https://github.com/alchemy-run/distilled/commit/165c1b0d8)
- **grafana**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/784 [<samp>(387e3)</samp>](https://github.com/alchemy-run/distilled/commit/387e30c64)
- **growthbook**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/777 [<samp>(f69da)</samp>](https://github.com/alchemy-run/distilled/commit/f69da861c)
- **gusto**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/780 [<samp>(434ef)</samp>](https://github.com/alchemy-run/distilled/commit/434efb2b4)
- **hetzner**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/740 [<samp>(9ffe1)</samp>](https://github.com/alchemy-run/distilled/commit/9ffe11447)
- **hostinger**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/778 [<samp>(dcb1b)</samp>](https://github.com/alchemy-run/distilled/commit/dcb1bf184)
- **huggingface**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/739 [<samp>(bf695)</samp>](https://github.com/alchemy-run/distilled/commit/bf695406b)
- **infisical**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/782 [<samp>(cbd3a)</samp>](https://github.com/alchemy-run/distilled/commit/cbd3a7987)
- **inngest**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/776 [<samp>(2b588)</samp>](https://github.com/alchemy-run/distilled/commit/2b5884807)
- **intercom**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/781 [<samp>(36e7f)</samp>](https://github.com/alchemy-run/distilled/commit/36e7f3d2e)
- **kubernetes**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/785 [<samp>(8d9ed)</samp>](https://github.com/alchemy-run/distilled/commit/8d9ed20bc)
- **launchdarkly**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/779 [<samp>(21466)</samp>](https://github.com/alchemy-run/distilled/commit/214667265)
- **mercury**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/788 [<samp>(8aa2d)</samp>](https://github.com/alchemy-run/distilled/commit/8aa2d0d9f)
- **metabase**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/791 [<samp>(4eacc)</samp>](https://github.com/alchemy-run/distilled/commit/4eacc9a78)
- **modal**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/738 [<samp>(eae71)</samp>](https://github.com/alchemy-run/distilled/commit/eae71fa81)
- **modrinth**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/786 [<samp>(1b53d)</samp>](https://github.com/alchemy-run/distilled/commit/1b53d50b6)
- **mongodb-atlas**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/735 [<samp>(650e6)</samp>](https://github.com/alchemy-run/distilled/commit/650e6bf50)
- **neon**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/748 [<samp>(1c946)</samp>](https://github.com/alchemy-run/distilled/commit/1c946073a)
- **notion**:
  - Add the Notion SDK &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/855 [<samp>(40a95)</samp>](https://github.com/alchemy-run/distilled/commit/40a9500a7)
- **okta**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/793 [<samp>(09275)</samp>](https://github.com/alchemy-run/distilled/commit/092750720)
- **onepassword**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/787 [<samp>(21293)</samp>](https://github.com/alchemy-run/distilled/commit/21293af0d)
- **opencode**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/794 [<samp>(6cdf6)</samp>](https://github.com/alchemy-run/distilled/commit/6cdf6f986)
- **ovh**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/790 [<samp>(3be8a)</samp>](https://github.com/alchemy-run/distilled/commit/3be8abd73)
- **paypal**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/789 [<samp>(1c9d5)</samp>](https://github.com/alchemy-run/distilled/commit/1c9d591e4)
- **plaid**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/800 [<samp>(ee0ef)</samp>](https://github.com/alchemy-run/distilled/commit/ee0ef3696)
- **planetscale**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/747 [<samp>(f6883)</samp>](https://github.com/alchemy-run/distilled/commit/f68836875)
- **polar**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/732 [<samp>(04334)</samp>](https://github.com/alchemy-run/distilled/commit/043349b95)
- **porkbun**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/796 [<samp>(7b99d)</samp>](https://github.com/alchemy-run/distilled/commit/7b99d88c9)
- **posthog**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/765 [<samp>(03f99)</samp>](https://github.com/alchemy-run/distilled/commit/03f9946a3)
- **prisma**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Kristof Siket**, **Claude Opus 5.5**, **sam** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/659 [<samp>(a8e37)</samp>](https://github.com/alchemy-run/distilled/commit/a8e3756ac)
- **railway**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/746 [<samp>(f1ab2)</samp>](https://github.com/alchemy-run/distilled/commit/f1ab215c7)
- **redis-cloud**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/803 [<samp>(ff666)</samp>](https://github.com/alchemy-run/distilled/commit/ff66635dd)
- **remote**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/795 [<samp>(bbad5)</samp>](https://github.com/alchemy-run/distilled/commit/bbad55364)
- **render**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/799 [<samp>(8623c)</samp>](https://github.com/alchemy-run/distilled/commit/8623cae72)
- **resend**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/798 [<samp>(08370)</samp>](https://github.com/alchemy-run/distilled/commit/083707f30)
- **s2**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/797 [<samp>(d2770)</samp>](https://github.com/alchemy-run/distilled/commit/d2770ac88)
- **sentry**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/801 [<samp>(f8e67)</samp>](https://github.com/alchemy-run/distilled/commit/f8e676980)
- **slack**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/816 [<samp>(a77c0)</samp>](https://github.com/alchemy-run/distilled/commit/a77c0102f)
- **slack, meilisearch**:
  - Read the spec from their mirrors &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/844 [<samp>(61283)</samp>](https://github.com/alchemy-run/distilled/commit/612830516)
- **spacetimedb**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/805 [<samp>(e5260)</samp>](https://github.com/alchemy-run/distilled/commit/e526057e1)
- **specs**:
  - Mirror Slack, fix the Meilisearch mirror, link Iceberg &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/842 [<samp>(778c6)</samp>](https://github.com/alchemy-run/distilled/commit/778c6d41c)
  - Fix the fly-io mirror and add Sprites and the GraphQL schema &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/847 [<samp>(715b1)</samp>](https://github.com/alchemy-run/distilled/commit/715b1bd70)
  - Mirror the ZeroSSL API reference &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/848 [<samp>(932b9)</samp>](https://github.com/alchemy-run/distilled/commit/932b95a96)
  - Mirror RFC 8555 for the ACME SDK &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/850 [<samp>(67746)</samp>](https://github.com/alchemy-run/distilled/commit/677463270)
  - Ship hand-written models through spec mirrors (celld, fly-io mpg) &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/853 [<samp>(3f8ab)</samp>](https://github.com/alchemy-run/distilled/commit/3f8ab328d)
- **squarespace**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/813 [<samp>(02e89)</samp>](https://github.com/alchemy-run/distilled/commit/02e891147)
- **stackit**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/810 [<samp>(72dca)</samp>](https://github.com/alchemy-run/distilled/commit/72dca34e4)
- **stripe**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/792 [<samp>(3f2f2)</samp>](https://github.com/alchemy-run/distilled/commit/3f2f2b380)
- **supabase**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/750 [<samp>(c470f)</samp>](https://github.com/alchemy-run/distilled/commit/c470fd9db)
- **surrealdb**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/804 [<samp>(5b16f)</samp>](https://github.com/alchemy-run/distilled/commit/5b16fedf0)
- **temporal**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/812 [<samp>(24f07)</samp>](https://github.com/alchemy-run/distilled/commit/24f077afa)
- **trigger-dev**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/806 [<samp>(03690)</samp>](https://github.com/alchemy-run/distilled/commit/03690c5e4)
- **turbopuffer**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/809 [<samp>(98a3a)</samp>](https://github.com/alchemy-run/distilled/commit/98a3a8d34)
- **turso**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/745 [<samp>(f8ffc)</samp>](https://github.com/alchemy-run/distilled/commit/f8ffc6166)
  - Type API token errors, redact minted tokens &nbsp;-&nbsp; by **sam** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/838 [<samp>(30219)</samp>](https://github.com/alchemy-run/distilled/commit/302193da7)
- **typesense**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/744 [<samp>(e0110)</samp>](https://github.com/alchemy-run/distilled/commit/e011014b8)
- **unkey**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/808 [<samp>(5273a)</samp>](https://github.com/alchemy-run/distilled/commit/5273a84d9)
- **vanta**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/811 [<samp>(accb3)</samp>](https://github.com/alchemy-run/distilled/commit/accb3b911)
- **vercel**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/749 [<samp>(271d3)</samp>](https://github.com/alchemy-run/distilled/commit/271d30550)
- **whop**:
  - Regenerate from the 2026-10-05 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/807 [<samp>(b403b)</samp>](https://github.com/alchemy-run/distilled/commit/b403b898b)
  - Read the spec from its mirror; regenerate from 2026-09-25 &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/843 [<samp>(9b6be)</samp>](https://github.com/alchemy-run/distilled/commit/9b6be4f8d)
- **workos**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/762 [<samp>(51943)</samp>](https://github.com/alchemy-run/distilled/commit/51943fb9b)
- **xata**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/815 [<samp>(df7be)</samp>](https://github.com/alchemy-run/distilled/commit/df7be0b95)
- **zendesk**:
  - Regenerate from the 2026-10-06 spec &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/814 [<samp>(707ca)</samp>](https://github.com/alchemy-run/distilled/commit/707ca83ab)
- **zerossl**:
  - Convert the SDK from ZeroSSL's Markdown API reference &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/851 [<samp>(4a7d0)</samp>](https://github.com/alchemy-run/distilled/commit/4a7d0e825)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **acme**:
  - Problem documents without detail decode to their typed error &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/723 [<samp>(c7e81)</samp>](https://github.com/alchemy-run/distilled/commit/c7e818d83)
- **aws**:
  - Send eventPayload members of input event streams as raw frames &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/722 [<samp>(4f3dc)</samp>](https://github.com/alchemy-run/distilled/commit/4f3dce00e)
  - Bind empty-prefix response headers and raw string payloads in restJson1 &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/720 [<samp>(8a0ce)</samp>](https://github.com/alchemy-run/distilled/commit/8a0cebf48)
  - Keep "/" in greedy URI labels &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/721 [<samp>(8ea7a)</samp>](https://github.com/alchemy-run/distilled/commit/8ea7a5cf9)
- **azure**:
  - Type ParameterOutOfRange and LocationNotAvailableForResourceGroup &nbsp;-&nbsp; by **Maxwell Brown**, **Claude Opus 5.5** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/693 [<samp>(c24c2)</samp>](https://github.com/alchemy-run/distilled/commit/c24c295ea)
- **cloudflare**:
  - Type Workers Builds repository configuration errors &nbsp;-&nbsp; by **sam** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/629 [<samp>(426af)</samp>](https://github.com/alchemy-run/distilled/commit/426af50e5)
  - Keep zone_id and domain on email.sending queue subscription sources &nbsp;-&nbsp; by **0xMilkEnjoyer** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/689 [<samp>(1117b)</samp>](https://github.com/alchemy-run/distilled/commit/1117b0ac3)
  - Keep the map when the docs list a map's value cases &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/729 [<samp>(efe6e)</samp>](https://github.com/alchemy-run/distilled/commit/efe6ea9bf)
  - Type the in-use 400 on deleteMtlsCertificate &nbsp;-&nbsp; by **TBIQ007** in https://github.com/alchemy-run/distilled/issues/829 [<samp>(2157b)</samp>](https://github.com/alchemy-run/distilled/commit/2157bf3ed)
  - Type the containers DurableObjectNamespaceNotFound error &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/859 [<samp>(7cec2)</samp>](https://github.com/alchemy-run/distilled/commit/7cec261f9)
  - Send declarative exports on dispatch script uploads &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/860 [<samp>(88818)</samp>](https://github.com/alchemy-run/distilled/commit/8881801e7)
  - Type dispatch_namespace on Durable Object namespace listings &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/861 [<samp>(f445f)</samp>](https://github.com/alchemy-run/distilled/commit/f445ff754)
  - Type WorkerHasNoVersions on getDispatchNamespaceScriptSetting &nbsp;-&nbsp; by **Pedro Toledo** in https://github.com/alchemy-run/distilled/issues/866 [<samp>(5f4a8)</samp>](https://github.com/alchemy-run/distilled/commit/5f4a89531)
  - Type hyperdrive destination_not_found as HyperdriveOriginUnavailable &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/871 [<samp>(f8064)</samp>](https://github.com/alchemy-run/distilled/commit/f8064b680)
  - **bot-management**: Decode the AI crawler policy fields &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/733 [<samp>(74082)</samp>](https://github.com/alchemy-run/distilled/commit/740826382)
- **cloudflare,aws**:
  - Fix stream live-input listing and zaraz workflow updates; add typed errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/862 [<samp>(bc87d)</samp>](https://github.com/alchemy-run/distilled/commit/bc87db82a)
- **core**:
  - RateLimit hint only when remaining is 0 &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/725 [<samp>(44ffd)</samp>](https://github.com/alchemy-run/distilled/commit/44ffd6567)
  - Send a raw body under its modeled Content-Type header &nbsp;-&nbsp; by **0xMilkEnjoyer**, **Benjamin Tang** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/662 [<samp>(f26ee)</samp>](https://github.com/alchemy-run/distilled/commit/f26eee597)
- **digitalocean**:
  - Accept 202 responses and type the droplet, firewall, and ssh key envelopes &nbsp;-&nbsp; by **Ricardo**, **Claude Opus 5.5** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/561 [<samp>(9041e)</samp>](https://github.com/alchemy-run/distilled/commit/9041e5041)
- **discord**:
  - Type NotFound on getGuild and getChannel &nbsp;-&nbsp; by **Patt O'Brien** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/699 [<samp>(c1eb0)</samp>](https://github.com/alchemy-run/distilled/commit/c1eb00ce5)
- **distilled-submodules**:
  - Detect Cloudflare's new truncated-markdown marker &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/726 [<samp>(c2798)</samp>](https://github.com/alchemy-run/distilled/commit/c27980c6f)
- **expo-eas**:
  - Map non-JSON error responses through the status map &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/724 [<samp>(fb457)</samp>](https://github.com/alchemy-run/distilled/commit/fb45799a5)
- **fly-io**:
  - Restore Sprites exec, checkpoint, labels, and Conflict shapes &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/857 [<samp>(83bd6)</samp>](https://github.com/alchemy-run/distilled/commit/83bd68e69)
- **gcp**:
  - Keep Dataplex unstructured data profile scans after a discovery flap &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/858 [<samp>(46d2d)</samp>](https://github.com/alchemy-run/distilled/commit/46d2d3b5d)
- **planetscale**:
  - Type invoice line-item subtotal as a string &nbsp;-&nbsp; by **Ethan Shumate** and **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/686 [<samp>(4d421)</samp>](https://github.com/alchemy-run/distilled/commit/4d4212647)
- **railway**:
  - Type missing login sessions on loginSessionConsume &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/832 [<samp>(45d4d)</samp>](https://github.com/alchemy-run/distilled/commit/45d4da4f8)
- **release**:
  - Create every GitHub release as Latest, never prerelease &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/837 [<samp>(4406d)</samp>](https://github.com/alchemy-run/distilled/commit/4406d5f9b)

### &nbsp;&nbsp;&nbsp;🏎 Performance

- **core**: Judge Smithy-model patches in memory in patches:audit &nbsp;-&nbsp; by **Michael K (Pear)** in https://github.com/alchemy-run/distilled/issues/817 [<samp>(42e59)</samp>](https://github.com/alchemy-run/distilled/commit/42e591a88)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.13...HEAD)

---

## v1.0.0-rc.13

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- Boolean-string flags nested in request bodies &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/604 [<samp>(2e625)</samp>](https://github.com/alchemy-run/distilled/commit/2e625a375)

### &nbsp;&nbsp;&nbsp;🚀 Features

- Distilled-sdk-update skill and `pnpm patches:audit` &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/644 [<samp>(24cd1)</samp>](https://github.com/alchemy-run/distilled/commit/24cd176a4)
- **acme, zerossl**:
  - ACME (RFC 8555) and ZeroSSL SDKs &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/542 [<samp>(183f9)</samp>](https://github.com/alchemy-run/distilled/commit/183f9df0a)
- **aws**:
  - Replace fast-xml-parser with Effect-native XML parser &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/611 [<samp>(02fa0)</samp>](https://github.com/alchemy-run/distilled/commit/02fa027d6)
  - Complete the credential-provider surface, one provider per file &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/639 [<samp>(85a6e)</samp>](https://github.com/alchemy-run/distilled/commit/85a6e12b8)
- **boat-dev**:
  - Add the Boat SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/620 [<samp>(aa301)</samp>](https://github.com/alchemy-run/distilled/commit/aa3015998)
- **celld**:
  - Add generated v0.6.0 SDK &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/621 [<samp>(751b3)</samp>](https://github.com/alchemy-run/distilled/commit/751b30b7f)
- **cloudflare**:
  - Type MCP server API and sync errors &nbsp;-&nbsp; by **Dillion Verma**, **Claude Fable 5.1** and **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/605 [<samp>(1fcac)</samp>](https://github.com/alchemy-run/distilled/commit/1fcac9f2c)
- **core**:
  - Match typed errors by response body and headers &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/654 [<samp>(28178)</samp>](https://github.com/alchemy-run/distilled/commit/281780d6f)
  - Opt-in strict response validation across every SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/673 [<samp>(03de3)</samp>](https://github.com/alchemy-run/distilled/commit/03de3f076)
- **core,railway**:
  - Replace GraphQL select client with Query.fn &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/638 [<samp>(4760c)</samp>](https://github.com/alchemy-run/distilled/commit/4760c9378)
  - Typed errors for Query.fn &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/674 [<samp>(89d7a)</samp>](https://github.com/alchemy-run/distilled/commit/89d7ae116)
  - Query.pages and Query.items stream Relay connections &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/675 [<samp>(b8012)</samp>](https://github.com/alchemy-run/distilled/commit/b8012cd55)
- **daytona**:
  - Add the Daytona SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/619 [<samp>(bc57e)</samp>](https://github.com/alchemy-run/distilled/commit/bc57ef7c2)
- **doppler,infisical**:
  - Type the login endpoints Alchemy's secret providers need &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/626 [<samp>(156a5)</samp>](https://github.com/alchemy-run/distilled/commit/156a5b03e)
- **fly-io**:
  - Regenerate from the 2026-09-23 spec &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/657 [<samp>(d9779)</samp>](https://github.com/alchemy-run/distilled/commit/d97790d09)
- **gcp**:
  - Region, Endpoint, and regional endpoint routing &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/667 [<samp>(386a0)</samp>](https://github.com/alchemy-run/distilled/commit/386a009f4)
  - Credentials carry a default region &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/668 [<samp>(8c61d)</samp>](https://github.com/alchemy-run/distilled/commit/8c61daa36)
- **neon**:
  - Support backend triggers and harden deployment contracts &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/617 [<samp>(2d172)</samp>](https://github.com/alchemy-run/distilled/commit/2d172e7dd)
- **planetscale**:
  - Regenerate from the 2026-09-22 spec &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/642 [<samp>(bab10)</samp>](https://github.com/alchemy-run/distilled/commit/bab10d09e)
- **stackit**:
  - Add the STACKIT Cloud SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/616 [<samp>(34d96)</samp>](https://github.com/alchemy-run/distilled/commit/34d9658f6)
- **website**:
  - Add distilled.cloud landing page and deploy stack &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/566 [<samp>(17ae4)</samp>](https://github.com/alchemy-run/distilled/commit/17ae44723)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Upgrade Effect to 4.0.0-rc.117 &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/637 [<samp>(5358d)</samp>](https://github.com/alchemy-run/distilled/commit/5358d6602)
- Flatten tag-split SDKs off the Services namespace &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/635 [<samp>(6a286)</samp>](https://github.com/alchemy-run/distilled/commit/6a2867667)
- Upgrade Effect to 4.0.0-rc.118 &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/679 [<samp>(1f1e8)</samp>](https://github.com/alchemy-run/distilled/commit/1f1e8a72d)
- **aws**:
  - Drop @smithy/shared-ini-file-loader, @smithy/util-base64 and @aws-sdk/types &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/609 [<samp>(8cc1a)</samp>](https://github.com/alchemy-run/distilled/commit/8cc1a3670)
  - Support S3 version selection and metadata headers &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/627 [<samp>(71455)</samp>](https://github.com/alchemy-run/distilled/commit/71455a8c2)
  - Classify unstructured REST-XML server errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/630 [<samp>(035bb)</samp>](https://github.com/alchemy-run/distilled/commit/035bb2eff)
  - **ec2**:
    - Type missing rule errors on modification &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/623 [<samp>(47cc1)</samp>](https://github.com/alchemy-run/distilled/commit/47cc1ac64)
    - Type Client VPN lifecycle errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/624 [<samp>(54100)</samp>](https://github.com/alchemy-run/distilled/commit/541008479)
- **aws,cloudflare**:
  - Type Workers preview conflict and Deadline UpdateQueue conflict &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/683 [<samp>(1f4a6)</samp>](https://github.com/alchemy-run/distilled/commit/1f4a62973)
- **cloudflare**:
  - Type queue readiness and migration errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/625 [<samp>(94049)</samp>](https://github.com/alchemy-run/distilled/commit/9404949f0)
  - Type missing DNS record errors &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/648 [<samp>(75306)</samp>](https://github.com/alchemy-run/distilled/commit/753064a04)
  - Correct Workers-for-Platforms upload metadata &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/649 [<samp>(bf909)</samp>](https://github.com/alchemy-run/distilled/commit/bf909babc)
- **core**:
  - GraphQL nullability, nullable inputs, and object Query.map &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/676 [<samp>(ceb70)</samp>](https://github.com/alchemy-run/distilled/commit/ceb704860)
- **fly-io**:
  - Type attached volume deletion errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/618 [<samp>(6acb5)</samp>](https://github.com/alchemy-run/distilled/commit/6acb5f13f)
  - Correct Machine lease and lifecycle contracts &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/628 [<samp>(6caf1)</samp>](https://github.com/alchemy-run/distilled/commit/6caf1c02c)
  - Expose IP assignment network and type NetworkNotFound &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/646 [<samp>(0e76a)</samp>](https://github.com/alchemy-run/distilled/commit/0e76a9abd)
- **gcp**:
  - Type HTTP 501 on Agent Engine sandboxes and workerPools.list &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/656 [<samp>(14d93)</samp>](https://github.com/alchemy-run/distilled/commit/14d9302b7)
  - Type disabled Secret Manager version access &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/665 [<samp>(9afd7)</samp>](https://github.com/alchemy-run/distilled/commit/9afd718ea)
  - No environment variables for the default region &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/669 [<samp>(6b83c)</samp>](https://github.com/alchemy-run/distilled/commit/6b83c9643)
  - Typed errors from alchemy live binding tests &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/678 [<samp>(6b1ad)</samp>](https://github.com/alchemy-run/distilled/commit/6b1ad0762)
  - Typed errors from alchemy's full GCP suite run &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/680 [<samp>(dc82d)</samp>](https://github.com/alchemy-run/distilled/commit/dc82d5334)
  - Type the Kafka schema-registry missing-parent error &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/681 [<samp>(94c64)</samp>](https://github.com/alchemy-run/distilled/commit/94c64d789)
- **neon**:
  - Declare createProjectBranch conflict responses &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/631 [<samp>(b00de)</samp>](https://github.com/alchemy-run/distilled/commit/b00de41fe)
- **website**:
  - Correct homepage code snippets, morph, and copy &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/645 [<samp>(1856c)</samp>](https://github.com/alchemy-run/distilled/commit/1856cd7a1)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.12...HEAD)

---

## v1.0.0-rc.12

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **aws,fly-io**: Harden provisioning and token minting &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/615 [<samp>(6287a)</samp>](https://github.com/alchemy-run/distilled/commit/6287ae25c)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.11...HEAD)

---

## v1.0.0-rc.11

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **prisma**: Rename SDK package to prisma &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/612 [<samp>(47daf)</samp>](https://github.com/alchemy-run/distilled/commit/47daffa3b)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **aws**:
  - **rds**: Type engine-version parameter errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/613 [<samp>(f5ecf)</samp>](https://github.com/alchemy-run/distilled/commit/f5ecf4dd8)
- **prisma**:
  - Type Prisma lifecycle and Hyperdrive origin errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/610 [<samp>(2a62c)</samp>](https://github.com/alchemy-run/distilled/commit/2a62c5175)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.10...HEAD)

---

## v1.0.0-rc.10

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **cloudflare**: Restore configuration wrapper on Containers create &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/602 [<samp>(97695)</samp>](https://github.com/alchemy-run/distilled/commit/9769566e8)
- **railway**: Expose only the native GraphQL client &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/588 [<samp>(c5b83)</samp>](https://github.com/alchemy-run/distilled/commit/c5b839daa)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **aws**:
  - Replace aws4fetch with Effect-native SigV4 signer &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/577 [<samp>(e8f6a)</samp>](https://github.com/alchemy-run/distilled/commit/e8f6a7c4f)
  - Inline crc32 fallback &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/582 [<samp>(2754d)</samp>](https://github.com/alchemy-run/distilled/commit/2754dd726)
  - Effect-native credential providers &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/587 [<samp>(ee6b0)</samp>](https://github.com/alchemy-run/distilled/commit/ee6b0d84d)
- **cloudflare**:
  - Worker Previews API and custom-domain previews_enabled &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/576 [<samp>(fb98d)</samp>](https://github.com/alchemy-run/distilled/commit/fb98d73bd)
  - Read specs from spec-mirror-cloudflare &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/595 [<samp>(95590)</samp>](https://github.com/alchemy-run/distilled/commit/955901612)
  - CreateUserSchema validationEnabled takes a boolean &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/599 [<samp>(36f9f)</samp>](https://github.com/alchemy-run/distilled/commit/36f9fd60e)
- **codegen**:
  - Boolean-string request members become booleans everywhere &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/600 [<samp>(95464)</samp>](https://github.com/alchemy-run/distilled/commit/95464cc03)
- **railway**:
  - Add selective Effect GraphQL code generation &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/580 [<samp>(de878)</samp>](https://github.com/alchemy-run/distilled/commit/de8784849)
  - Refresh sandbox schema and type lifecycle errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/607 [<samp>(41c91)</samp>](https://github.com/alchemy-run/distilled/commit/41c91dbd4)
- **s2**:
  - Add the S2 (s2.dev) SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/591 [<samp>(fb5ef)</samp>](https://github.com/alchemy-run/distilled/commit/fb5efddd3)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Remove invalid PURE annotations &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/558 [<samp>(17029)</samp>](https://github.com/alchemy-run/distilled/commit/17029f4fe)
- **aws**:
  - **ec2**: Type security group rule mutation errors &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/608 [<samp>(96aa9)</samp>](https://github.com/alchemy-run/distilled/commit/96aa9a695)
- **cloudflare**:
  - Reshape Containers create payload to live API &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/594 [<samp>(2713e)</samp>](https://github.com/alchemy-run/distilled/commit/2713e32ae)
  - Drop bad validationEnabled member from createUserSchema patch &nbsp;-&nbsp; by **Michael K** and **manager** in https://github.com/alchemy-run/distilled/issues/596 [<samp>(ae494)</samp>](https://github.com/alchemy-run/distilled/commit/ae494cac6)
  - Drop patch adds the docs now cover (pages, r2) &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/597 [<samp>(24ef3)</samp>](https://github.com/alchemy-run/distilled/commit/24ef3f7f8)
  - Stop the converter splitting type names that end in "or" &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/603 [<samp>(fce95)</samp>](https://github.com/alchemy-run/distilled/commit/fce951d4e)
  - Type empty-zone snippet rule deletion errors &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/606 [<samp>(a788b)</samp>](https://github.com/alchemy-run/distilled/commit/a788b889e)
- **core**:
  - Preserve nullable OpenAPI collection values &nbsp;-&nbsp; by **Rahul Mishra** in https://github.com/alchemy-run/distilled/issues/584 [<samp>(27c58)</samp>](https://github.com/alchemy-run/distilled/commit/27c5845e3)
- **deps**:
  - Update to effect 4.0.0-rc.113 &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/575 [<samp>(8ceed)</samp>](https://github.com/alchemy-run/distilled/commit/8ceedc104)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.9...HEAD)

---

## v1.0.0-rc.9

### &nbsp;&nbsp;&nbsp;🚀 Features

- Regenerate every SDK from the spec mirrors &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/480 [<samp>(6a9f0)</samp>](https://github.com/alchemy-run/distilled/commit/6a9f07851)
- **adyen**:
  - Add the Adyen SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/485 [<samp>(8b86d)</samp>](https://github.com/alchemy-run/distilled/commit/8b86d3cd7)
- **apache-superset**:
  - Add the Apache Superset SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/499 [<samp>(f241e)</samp>](https://github.com/alchemy-run/distilled/commit/f241e9a85)
- **archil**:
  - Add the Archil SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/500 [<samp>(88bca)</samp>](https://github.com/alchemy-run/distilled/commit/88bca1e6f)
- **argocd**:
  - Add the Argo CD SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/501 [<samp>(38518)</samp>](https://github.com/alchemy-run/distilled/commit/38518402e)
- **auth0**:
  - Add the Auth0 SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/492 [<samp>(e16e5)</samp>](https://github.com/alchemy-run/distilled/commit/e16e5e347)
- **chronosphere**:
  - Add the Chronosphere SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/502 [<samp>(f6d0c)</samp>](https://github.com/alchemy-run/distilled/commit/f6d0c8a97)
- **clerk**:
  - Add the Clerk SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/493 [<samp>(9f009)</samp>](https://github.com/alchemy-run/distilled/commit/9f00959b1)
- **codegen**:
  - Convert-time patches for every dialect, verbNoun by default &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/545 [<samp>(edc10)</samp>](https://github.com/alchemy-run/distilled/commit/edc107786)
  - Name operations from the route when the operationId is mechanical &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/548 [<samp>(7d2d8)</samp>](https://github.com/alchemy-run/distilled/commit/7d2d8f252)
  - Drop a redundant Swagger tag prefix from operation ids &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/549 [<samp>(fd544)</samp>](https://github.com/alchemy-run/distilled/commit/fd5440280)
- **coolify**:
  - Add the Coolify SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/486 [<samp>(285ea)</samp>](https://github.com/alchemy-run/distilled/commit/285ea7ff8)
- **customerio**:
  - Add the Customer.io SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/503 [<samp>(7b209)</samp>](https://github.com/alchemy-run/distilled/commit/7b209b176)
- **datadog**:
  - Add the Datadog SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/504 [<samp>(078c3)</samp>](https://github.com/alchemy-run/distilled/commit/078c34ea9)
- **digitalocean**:
  - Add the DigitalOcean SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/487 [<samp>(d4fd5)</samp>](https://github.com/alchemy-run/distilled/commit/d4fd55b4b)
- **docker**:
  - Add the Docker Engine SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/505 [<samp>(9dbec)</samp>](https://github.com/alchemy-run/distilled/commit/9dbecab50)
- **doppler**:
  - Add the Doppler SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/506 [<samp>(5cfc1)</samp>](https://github.com/alchemy-run/distilled/commit/5cfc1285e)
- **elasticsearch**:
  - Add the Elasticsearch SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/507 [<samp>(ce8cb)</samp>](https://github.com/alchemy-run/distilled/commit/ce8cb84bd)
- **forgejo**:
  - Add the Forgejo SDK &nbsp;-&nbsp; by **Michael K** and **Wyatt Johnson** in https://github.com/alchemy-run/distilled/issues/550 [<samp>(59272)</samp>](https://github.com/alchemy-run/distilled/commit/592725d38)
- **google-workspace**:
  - Add the Google Workspace SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/508 [<samp>(4a0e8)</samp>](https://github.com/alchemy-run/distilled/commit/4a0e8bba7)
- **grafana**:
  - Add the Grafana SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/494 [<samp>(6c27a)</samp>](https://github.com/alchemy-run/distilled/commit/6c27a941d)
- **growthbook**:
  - Add the GrowthBook SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/509 [<samp>(161b6)</samp>](https://github.com/alchemy-run/distilled/commit/161b6bcad)
- **gusto**:
  - Add the Gusto SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/510 [<samp>(733a0)</samp>](https://github.com/alchemy-run/distilled/commit/733a0d75b)
- **hetzner**:
  - PrimaryIpLimitExceeded &nbsp;-&nbsp; by **Sam Goodwin** [<samp>(cb11c)</samp>](https://github.com/alchemy-run/distilled/commit/cb11c5bf1)
- **hostinger**:
  - Add the Hostinger SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/511 [<samp>(4674d)</samp>](https://github.com/alchemy-run/distilled/commit/4674db687)
- **infisical**:
  - Add the Infisical SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/512 [<samp>(cd89b)</samp>](https://github.com/alchemy-run/distilled/commit/cd89ba837)
- **inngest**:
  - Add the Inngest SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/513 [<samp>(0c952)</samp>](https://github.com/alchemy-run/distilled/commit/0c95221e7)
- **intercom**:
  - Add the Intercom SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/514 [<samp>(eb920)</samp>](https://github.com/alchemy-run/distilled/commit/eb9203d37)
- **launchdarkly**:
  - Add the LaunchDarkly SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/515 [<samp>(9b45c)</samp>](https://github.com/alchemy-run/distilled/commit/9b45ca182)
- **meilisearch**:
  - Add the Meilisearch SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/516 [<samp>(5475b)</samp>](https://github.com/alchemy-run/distilled/commit/5475b2cfa)
- **mercury**:
  - Add the Mercury SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/517 [<samp>(bf5dd)</samp>](https://github.com/alchemy-run/distilled/commit/bf5dda2e5)
- **metabase**:
  - Add the Metabase SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/518 [<samp>(b72f4)</samp>](https://github.com/alchemy-run/distilled/commit/b72f4fed7)
- **modal**:
  - Add the Modal SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/483 [<samp>(cc93b)</samp>](https://github.com/alchemy-run/distilled/commit/cc93bf364)
- **modrinth**:
  - Add the Modrinth SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/532 [<samp>(a1ae9)</samp>](https://github.com/alchemy-run/distilled/commit/a1ae95611)
- **okta**:
  - Add the Okta SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/495 [<samp>(de23f)</samp>](https://github.com/alchemy-run/distilled/commit/de23fd76d)
- **onepassword**:
  - Add the 1Password SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/519 [<samp>(2d3a3)</samp>](https://github.com/alchemy-run/distilled/commit/2d3a33637)
- **opencode**:
  - Add the OpenCode SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/520 [<samp>(4ada7)</samp>](https://github.com/alchemy-run/distilled/commit/4ada7b1f6)
- **ovh**:
  - Add the OVH SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/521 [<samp>(417d0)</samp>](https://github.com/alchemy-run/distilled/commit/417d0ebd7)
- **paypal**:
  - Add the PayPal SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/488 [<samp>(96f31)</samp>](https://github.com/alchemy-run/distilled/commit/96f318d37)
- **plaid**:
  - Add the Plaid SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/489 [<samp>(772af)</samp>](https://github.com/alchemy-run/distilled/commit/772afcd62)
- **polar**:
  - Add the Polar SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/484 [<samp>(582ca)</samp>](https://github.com/alchemy-run/distilled/commit/582cae06d)
- **porkbun**:
  - Add the Porkbun SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/496 [<samp>(f3ab6)</samp>](https://github.com/alchemy-run/distilled/commit/f3ab6378f)
- **redis-cloud**:
  - Add the Redis Cloud SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/490 [<samp>(05b23)</samp>](https://github.com/alchemy-run/distilled/commit/05b23d8ce)
- **remote**:
  - Add the Remote.com SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/522 [<samp>(10709)</samp>](https://github.com/alchemy-run/distilled/commit/107093139)
- **render**:
  - Add the Render SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/556 [<samp>(b3dcc)</samp>](https://github.com/alchemy-run/distilled/commit/b3dcc9d1a)
- **resend**:
  - Add the Resend SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/497 [<samp>(afd76)</samp>](https://github.com/alchemy-run/distilled/commit/afd76fa50)
- **sentry**:
  - Add the Sentry SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/524 [<samp>(4a148)</samp>](https://github.com/alchemy-run/distilled/commit/4a148e712)
- **slack**:
  - Add the Slack Web API SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/551 [<samp>(3082a)</samp>](https://github.com/alchemy-run/distilled/commit/3082a3172)
- **spacetimedb**:
  - Add the SpacetimeDB SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/533 [<samp>(38ee3)</samp>](https://github.com/alchemy-run/distilled/commit/38ee39103)
- **squarespace**:
  - Add the Squarespace SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/525 [<samp>(2d417)</samp>](https://github.com/alchemy-run/distilled/commit/2d4172d89)
- **stacks**:
  - Manage the spec mirrors and the monorepo's own credentials &nbsp;-&nbsp; by **Michael K** and **Claude Opus 5 (1M context)** in https://github.com/alchemy-run/distilled/issues/445 [<samp>(8d93a)</samp>](https://github.com/alchemy-run/distilled/commit/8d93acde9)
- **stripe**:
  - Type DeleteProduct ProductHasPrices error &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/570 [<samp>(2a703)</samp>](https://github.com/alchemy-run/distilled/commit/2a703954c)
- **surrealdb**:
  - Add the SurrealDB SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/498 [<samp>(51edb)</samp>](https://github.com/alchemy-run/distilled/commit/51edbff06)
- **temporal**:
  - Add the Temporal SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/526 [<samp>(48537)</samp>](https://github.com/alchemy-run/distilled/commit/485376821)
- **trigger-dev**:
  - Add the Trigger.dev SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/527 [<samp>(48e5c)</samp>](https://github.com/alchemy-run/distilled/commit/48e5c3c88)
- **turbopuffer**:
  - Add the Turbopuffer SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/528 [<samp>(70f98)</samp>](https://github.com/alchemy-run/distilled/commit/70f980094)
- **unkey**:
  - Add the Unkey SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/529 [<samp>(79e62)</samp>](https://github.com/alchemy-run/distilled/commit/79e625385)
- **vanta**:
  - Add the Vanta SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/530 [<samp>(0fc7b)</samp>](https://github.com/alchemy-run/distilled/commit/0fc7beeeb)
- **whop**:
  - Add the Whop SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/479 [<samp>(9c565)</samp>](https://github.com/alchemy-run/distilled/commit/9c5658976)
- **xata**:
  - Add the Xata SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/491 [<samp>(76797)</samp>](https://github.com/alchemy-run/distilled/commit/767975070)
- **zendesk**:
  - Add the Zendesk SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/531 [<samp>(3c978)</samp>](https://github.com/alchemy-run/distilled/commit/3c9782409)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **aws**:
  - Key the SSO role-credentials cache on account and role &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/568 [<samp>(2035e)</samp>](https://github.com/alchemy-run/distilled/commit/2035e129d)
- **codegen**:
  - `index` is a noun inside a camel id; getIndexInfo, queryIndex, listRules &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/563 [<samp>(9572a)</samp>](https://github.com/alchemy-run/distilled/commit/9572af33b)
- **fly-io**:
  - Machines base URL is the host; the routes carry /v1 &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/564 [<samp>(c7b11)</samp>](https://github.com/alchemy-run/distilled/commit/c7b11bc6b)
- **gcp**:
  - Type IAM service-account create quota as ServiceAccountQuotaExceeded &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/571 [<samp>(af261)</samp>](https://github.com/alchemy-run/distilled/commit/af2615f88)
  - Add GcpUserAccessBinding.restrictedClientApplications &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/572 [<samp>(255e9)</samp>](https://github.com/alchemy-run/distilled/commit/255e9f53c)
- **railway**:
  - Drop platformFeatureFlags and supportTierOverride &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/562 [<samp>(78a93)</samp>](https://github.com/alchemy-run/distilled/commit/78a93045e)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.8...HEAD)

---

## v1.0.0-rc.8

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Upgrade to effect rc 112 &nbsp;-&nbsp; by **Sam Goodwin** [<samp>(809f3)</samp>](https://github.com/alchemy-run/distilled/commit/809f3d85e)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.7...HEAD)

---

## v1.0.0-rc.7

### &nbsp;&nbsp;&nbsp;🚀 Features

- **cloudflare**:
  - **email_routing**: Type WorkerScriptNotFound on rule writes &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/476 [<samp>(57e90)</samp>](https://github.com/alchemy-run/distilled/commit/57e9053f5)
- **fly-io,hetzner,railway**:
  - MachineIdentity, tagged createServer errors, slim GraphQL &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/477 [<samp>(e7f12)</samp>](https://github.com/alchemy-run/distilled/commit/e7f12dd80)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **cloudflare**: Unwrap single-type envelope wrappers in spec conversion &nbsp;-&nbsp; by **Rahul Mishra** and **Claude Fable 5** in https://github.com/alchemy-run/distilled/issues/473 [<samp>(8a55e)</samp>](https://github.com/alchemy-run/distilled/commit/8a55e2b13)
- **deps**: Update to effect 4.0.0-rc.111 &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/474 [<samp>(651cd)</samp>](https://github.com/alchemy-run/distilled/commit/651cde92e)
- **railway**: SDK DX, tcpProxyCreate, and error tags for alchemy &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/472 [<samp>(db3a1)</samp>](https://github.com/alchemy-run/distilled/commit/db3a1b539)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.6...HEAD)

---

## v1.0.0-rc.6

### &nbsp;&nbsp;&nbsp;🚀 Features

- **fly-io**: Machines patches plus Sprites, MPG, and GraphQL add-ons &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/466 [<samp>(e9427)</samp>](https://github.com/alchemy-run/distilled/commit/e9427740c)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **fly-io**: Deploy-token response and base64 PetSem payloads &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/471 [<samp>(182d3)</samp>](https://github.com/alchemy-run/distilled/commit/182d343e5)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.5...HEAD)

---

## v1.0.0-rc.5

### &nbsp;&nbsp;&nbsp;🚀 Features

- **aws**: Endpoint.fromEnv — resolve the AWS_ENDPOINT_URL override &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/451 [<samp>(45e3d)</samp>](https://github.com/alchemy-run/distilled/commit/45e3d861f)
- **hetzner**: Add the Hetzner Cloud SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/464 [<samp>(5fa46)</samp>](https://github.com/alchemy-run/distilled/commit/5fa4677b4)
- **huggingface**: Add the Hugging Face Hub API SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/449 [<samp>(4916c)</samp>](https://github.com/alchemy-run/distilled/commit/4916c3c61)
- **vercel**: Add the Vercel REST SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/446 [<samp>(05b44)</samp>](https://github.com/alchemy-run/distilled/commit/05b444fa8)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **aws**:
  - **cloudwatch**: Type UnsupportedOperation on describeInsightRules &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/450 [<samp>(e2f14)</samp>](https://github.com/alchemy-run/distilled/commit/e2f141df6)
- **cloudflare**:
  - **r2**:
    - Type the non-empty bucket rejection on deleteBucket &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/462 [<samp>(34ba2)</samp>](https://github.com/alchemy-run/distilled/commit/34ba21a5a)
    - Type the object-plane missing-bucket / missing-key rejections &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/463 [<samp>(f1218)</samp>](https://github.com/alchemy-run/distilled/commit/f1218aa53)
  - **zero_trust**:
    - Access application typed errors + inline policies on self-hosted apps &nbsp;-&nbsp; by **Michael K**, **Maximilian Schwarzmüller** and **sam** in https://github.com/alchemy-run/distilled/issues/460 [<samp>(9c978)</samp>](https://github.com/alchemy-run/distilled/commit/9c9789ee9)
- **core,aws**:
  - Honor per-call context overrides in yield-first ops; parse X-Amz-Errortype &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/467 [<samp>(8fce7)</samp>](https://github.com/alchemy-run/distilled/commit/8fce771ec)
- **deps**:
  - Update to effect 4.0.0-rc.110 &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/459 [<samp>(2627d)</samp>](https://github.com/alchemy-run/distilled/commit/2627ddaf9)
- **hetzner**:
  - Type errors and schema gaps for alchemy &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/465 [<samp>(e70eb)</samp>](https://github.com/alchemy-run/distilled/commit/e70eb61de)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.4...v1.0.0-rc.5)

---

## v1.0.0-rc.4

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **deps**: Update to effect 4.0.0-beta.104 &nbsp;-&nbsp; by **Michael K** [<samp>(9fe73)</samp>](https://github.com/alchemy-run/distilled/commit/9fe73ad02)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **discord**: Add the Discord HTTP API v10 SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/434 [<samp>(06fb0)</samp>](https://github.com/alchemy-run/distilled/commit/06fb03036)
- **github**: Add the GitHub REST SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/435 [<samp>(280d0)</samp>](https://github.com/alchemy-run/distilled/commit/280d0a741)
- **railway**: Add the Railway SDK on shared GraphQL→Smithy tooling &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/438 [<samp>(27cd2)</samp>](https://github.com/alchemy-run/distilled/commit/27cd2f886)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **cloudflare**:
  - **queues**:
    - Type deleteQueue 11005 + surface producer scriptName &nbsp;-&nbsp; by **Sam Goodwin** in https://github.com/alchemy-run/distilled/issues/432 [<samp>(6b15a)</samp>](https://github.com/alchemy-run/distilled/commit/6b15a47e9)
    - Regenerate for the effect-105 generator surface &nbsp;-&nbsp; by **Sam Goodwin** in https://github.com/alchemy-run/distilled/issues/433 [<samp>(545b2)</samp>](https://github.com/alchemy-run/distilled/commit/545b26012)
  - **zero-trust**:
    - Type Access exclude/require rules like include &nbsp;-&nbsp; by **Sam Goodwin** in https://github.com/alchemy-run/distilled/issues/430 [<samp>(d784f)</samp>](https://github.com/alchemy-run/distilled/commit/d784fd034)
- **core**:
  - Send a body on GET when the schema declares one &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/429 [<samp>(26852)</samp>](https://github.com/alchemy-run/distilled/commit/26852f05d)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.3...HEAD)

---

## v1.0.0-rc.3

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **cloudflare**:
  - Read union arm keys the docs state inline &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/424 [<samp>(26cfb)</samp>](https://github.com/alchemy-run/distilled/commit/26cfb3e6b)
  - Declare each error once per resource, not per operation &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/428 [<samp>(9cc96)</samp>](https://github.com/alchemy-run/distilled/commit/9cc967140)
- **packages**:
  - Effect is a peer, platform-bun is dev-only &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/425 [<samp>(0f46a)</samp>](https://github.com/alchemy-run/distilled/commit/0f46afa17)

### &nbsp;&nbsp;&nbsp;🏎 Performance

- Cut the cloudflare package from 94 MB to 75 MB &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/427 [<samp>(f7153)</samp>](https://github.com/alchemy-run/distilled/commit/f71532e05)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.2...HEAD)

---

## v1.0.0-rc.2

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **release**: Ship lib from the packages that never published &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/423 [<samp>(87ea4)</samp>](https://github.com/alchemy-run/distilled/commit/87ea4dda0)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.1...HEAD)

---

## v1.0.0-rc.1

### &nbsp;&nbsp;&nbsp;🚀 Features

- Refactor to use single Smithy pipeline and re-write all SDKs &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/390 [<samp>(c7395)</samp>](https://github.com/alchemy-run/distilled/commit/c73953df0)
- Point worker export condition at src .ts &nbsp;-&nbsp; by **sam** [<samp>(338c5)</samp>](https://github.com/alchemy-run/distilled/commit/338c5fab5)
- **aws**:
  - Generate simpledb from a manual spec &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/401 [<samp>(d5500)</samp>](https://github.com/alchemy-run/distilled/commit/d55002ca3)
  - Make Region optional, defaulting to the authenticated one &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/409 [<samp>(26b99)</samp>](https://github.com/alchemy-run/distilled/commit/26b9901a0)
- **cloudflare**:
  - Restore the two missing edge-preview routes + catch the class of gap that hid them &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/400 [<samp>(21f57)</samp>](https://github.com/alchemy-run/distilled/commit/21f57e5c6)
  - Workerd export condition resolves from src &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/418 [<samp>(0c91c)</samp>](https://github.com/alchemy-run/distilled/commit/0c91c17fd)
  - **workers**:
    - Stream binding kind on script-upload metadata &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/397 [<samp>(8d4ce)</samp>](https://github.com/alchemy-run/distilled/commit/8d4ced3f8)
    - Streaming_tail_consumers on script-upload metadata &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/398 [<samp>(d9c54)</samp>](https://github.com/alchemy-run/distilled/commit/d9c542cbc)
- **codegen**:
  - Let any model give an error a category &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/413 [<samp>(2a544)</samp>](https://github.com/alchemy-run/distilled/commit/2a54440c0)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **aws**:
  - Make `message` the canonical field on every error class &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/407 [<samp>(6ae24)</samp>](https://github.com/alchemy-run/distilled/commit/6ae24a0f1)
  - **scheduler**: Type ExecutionRoleNotAssumable on create/updateSchedule &nbsp;-&nbsp; by **sam** and **Claude Fable 5** [<samp>(f396b)</samp>](https://github.com/alchemy-run/distilled/commit/f396b012b)
- **cloudflare**:
  - Correct getCrawl's response schema &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/410 [<samp>(5d24b)</samp>](https://github.com/alchemy-run/distilled/commit/5d24b25ca)
  - **turnstile**: Tag a bare 404 as WidgetNotFound &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/402 [<samp>(d3a40)</samp>](https://github.com/alchemy-run/distilled/commit/d3a4017ff)
  - **workers**: Type WorkerHasNoVersions on getScript &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/414 [<samp>(1c7e3)</samp>](https://github.com/alchemy-run/distilled/commit/1c7e3d293)
- **codegen**:
  - PURE-mark generated error classes so they tree-shake &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/403 [<samp>(7822b)</samp>](https://github.com/alchemy-run/distilled/commit/7822b37f8)
  - Give `.items()` a real element type &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/404 [<samp>(c5e3b)</samp>](https://github.com/alchemy-run/distilled/commit/c5e3b2b48)
  - Stop a filtered generate from truncating the barrel &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/411 [<samp>(a9dc4)</samp>](https://github.com/alchemy-run/distilled/commit/a9dc4fbfd)
- **core**:
  - Keep `.pages`/`.items` on a yielded paginated operation &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/405 [<samp>(dc4a1)</samp>](https://github.com/alchemy-run/distilled/commit/dc4a159ed)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v0.30.3...HEAD)

---

