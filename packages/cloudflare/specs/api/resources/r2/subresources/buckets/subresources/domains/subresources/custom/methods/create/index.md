---
title: Attach Custom Domain To Bucket
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

[Domains](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains)

[Custom](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Attach Custom Domain To Bucket

POST/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom

Register a new custom domain for an existing R2 bucket.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Name of the bucket.

maxLength64

minLength3

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

<details>

<summary>

"cf-r2-jurisdiction": optional "default"or "eu"or "us"or 2 more

Jurisdiction where objects in this bucket are guaranteed to be stored.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"fedramp-high"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

domain: string

Name of the custom domain to be added.

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20domain%20%3E%20(schema)>)

enabled: boolean

Whether to enable public bucket access at the custom domain. If undefined, the domain will be enabled.

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

zoneId: string

Zone ID of the custom domain.

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20zoneId%20%3E%20(schema)>)

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20ciphers%20%3E%20(schema)>)

<details>

<summary>

minTLS: optional "1.0"or "1.1"or "1.2"or "1.3"

Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20minTLS%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {domain, enabled, zoneId, 2 more }

</summary>

domain: string

Domain name of the affected custom domain.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the specified custom domain.

<a href="#">Link to this property</a>

zoneId: string

Zone ID of the custom domain.

<a href="#">Link to this property</a>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

minTLS: optional "1.0"or "1.1"or "1.2"or "1.3"

Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Attach Custom Domain To Bucket

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "domain": "prefix.example-domain.com",
          "enabled": true,
          "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd"
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "domain": "example-domain.com",
    "enabled": true,
    "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd",
    "ciphers": [
      "string"
    ],
    "minTLS": "1.0"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "domain": "example-domain.com",
    "enabled": true,
    "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd",
    "ciphers": [
      "string"
    ],
    "minTLS": "1.0"
  },
  "success": true
}
```