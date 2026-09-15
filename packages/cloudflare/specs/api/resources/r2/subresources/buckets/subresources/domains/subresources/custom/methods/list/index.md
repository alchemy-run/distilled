---
title: List Custom Domains of Bucket
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

# List Custom Domains of Bucket

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom

Gets a list of all custom domains registered with an existing R2 bucket.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Name of the bucket.

maxLength64

minLength3

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {domains }

</summary>

<details>

<summary>

domains: array of object {domain, enabled, status, 4 more }

</summary>

domain: string

Domain name of the custom domain to be added.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the specified custom domain.

<a href="#">Link to this property</a>

<details>

<summary>

status: object {ownership, ssl }

</summary>

<details>

<summary>

ownership: "pending"or "active"or "deactivated"or 3 more

Ownership status of the domain.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: "initializing"or "pending"or "active"or 3 more

SSL certificate status.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

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

zoneId: optional string

Zone ID of the custom domain resides in.

<a href="#">Link to this property</a>

zoneName: optional string

Zone that the custom domain resides in.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Custom Domains of Bucket

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "domains": [
      {
        "domain": "prefix.example-domain.one.com",
        "enabled": false,
        "status": {
          "ownership": "deactivated",
          "ssl": "pending"
        },
        "ciphers": [
          "string"
        ],
        "minTLS": "1.0",
        "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd",
        "zoneName": "example-domain.one.com"
      },
      {
        "domain": "prefix.example-domain.two.com",
        "enabled": true,
        "status": {
          "ownership": "active",
          "ssl": "active"
        },
        "ciphers": [
          "string"
        ],
        "minTLS": "1.0",
        "zoneId": "d9d28585d5f8f5b0f857b055bf574f19",
        "zoneName": "zoneName"
      }
    ]
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
    "domains": [
      {
        "domain": "prefix.example-domain.one.com",
        "enabled": false,
        "status": {
          "ownership": "deactivated",
          "ssl": "pending"
        },
        "ciphers": [
          "string"
        ],
        "minTLS": "1.0",
        "zoneId": "36ca64a6d92827b8a6b90be344bb1bfd",
        "zoneName": "example-domain.one.com"
      },
      {
        "domain": "prefix.example-domain.two.com",
        "enabled": true,
        "status": {
          "ownership": "active",
          "ssl": "active"
        },
        "ciphers": [
          "string"
        ],
        "minTLS": "1.0",
        "zoneId": "d9d28585d5f8f5b0f857b055bf574f19",
        "zoneName": "zoneName"
      }
    ]
  },
  "success": true
}
```