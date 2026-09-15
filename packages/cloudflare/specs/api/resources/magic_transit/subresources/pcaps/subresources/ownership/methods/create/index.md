---
title: Add buckets for full packet captures
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[PCAPs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps)

[Ownership](https://developers.cloudflare.com/api/resources/magic_transit/subresources/pcaps/subresources/ownership)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Add buckets for full packet captures

POST/accounts/{account\_id}/pcaps/ownership

Adds an AWS or GCP bucket to use with full packet captures.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Magic Firewall Packet Captures - Write PCAPs API`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20magic_transit.pcaps.ownership%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

destination\_conf: string

The full URI for the bucket. This field only applies to `full` packet captures.

[Link to this property](#)%20magic_transit.pcaps.ownership%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20destination_conf%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_transit.pcaps.ownership%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20magic_transit.pcaps.ownership%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.pcaps.ownership%20%3E%20(model)%20ownership%20%3E%20(schema)">Ownership</a> { id, destination\_conf, filename, 3 more }

</summary>

id: string

The bucket ID associated with the packet captures API.

maxLength32

minLength32

<a href="#">Link to this property</a>

destination\_conf: string

The full URI for the bucket. This field only applies to <code>full</code> packet captures.

<a href="#">Link to this property</a>

filename: string

The ownership challenge filename stored in the bucket.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "success"or "failed"

The status of the ownership challenge. Can be pending, success or failed.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

submitted: string

The RFC 3339 timestamp when the bucket was added to packet captures API.

<a href="#">Link to this property</a>

validated: optional string

The RFC 3339 timestamp when the bucket was validated.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.pcaps.ownership%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20magic_transit.pcaps.ownership%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Add buckets for full packet captures

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://pcaps-bucket?region=us-east-1"
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "9883874ecac311ec8475433579a6bf5f",
    "destination_conf": "s3://pcaps-bucket?region=us-east-1",
    "filename": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "validated": "2020-01-01T08:00:00Z"
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "9883874ecac311ec8475433579a6bf5f",
    "destination_conf": "s3://pcaps-bucket?region=us-east-1",
    "filename": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "validated": "2020-01-01T08:00:00Z"
  },
  "success": true
}
```