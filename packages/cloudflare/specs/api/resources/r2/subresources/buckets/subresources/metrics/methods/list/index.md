---
title: Get Account-Level Metrics
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

[Metrics](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/metrics)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Account-Level Metrics

GET/accounts/{account\_id}/r2/metrics

Get Storage/Object Count Metrics across all buckets in your account. Note that Account-Level Metrics may not immediately reflect the latest data.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.metrics%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20r2.buckets.metrics%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets.metrics%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {infrequentAccess, standard }

Metrics based on the class they belong to.

</summary>

<details>

<summary>

infrequentAccess: optional object {published, uploaded }

Metrics based on what state they are in(uploaded or published).

</summary>

<details>

<summary>

published: optional object {metadataSize, objects, payloadSize }

Metrics on number of objects/amount of storage used.

</summary>

metadataSize: optional number

Amount of.

<a href="#">Link to this property</a>

objects: optional number

Number of objects stored.

<a href="#">Link to this property</a>

payloadSize: optional number

Amount of storage used by object data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

uploaded: optional object {metadataSize, objects, payloadSize }

Metrics on number of objects/amount of storage used.

</summary>

metadataSize: optional number

Amount of.

<a href="#">Link to this property</a>

objects: optional number

Number of objects stored.

<a href="#">Link to this property</a>

payloadSize: optional number

Amount of storage used by object data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

standard: optional object {published, uploaded }

Metrics based on what state they are in(uploaded or published).

</summary>

<details>

<summary>

published: optional object {metadataSize, objects, payloadSize }

Metrics on number of objects/amount of storage used.

</summary>

metadataSize: optional number

Amount of.

<a href="#">Link to this property</a>

objects: optional number

Number of objects stored.

<a href="#">Link to this property</a>

payloadSize: optional number

Amount of storage used by object data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

uploaded: optional object {metadataSize, objects, payloadSize }

Metrics on number of objects/amount of storage used.

</summary>

metadataSize: optional number

Amount of.

<a href="#">Link to this property</a>

objects: optional number

Number of objects stored.

<a href="#">Link to this property</a>

payloadSize: optional number

Amount of storage used by object data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.metrics%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets.metrics%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Account-Level Metrics

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/metrics \
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
    "infrequentAccess": {
      "published": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      },
      "uploaded": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      }
    },
    "standard": {
      "published": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      },
      "uploaded": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      }
    }
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
    "infrequentAccess": {
      "published": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      },
      "uploaded": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      }
    },
    "standard": {
      "published": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      },
      "uploaded": {
        "metadataSize": 0,
        "objects": 0,
        "payloadSize": 0
      }
    }
  },
  "success": true
}
```