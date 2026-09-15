---
title: Update a sinkhole
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Sinkholes](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a sinkhole

PUT/accounts/{account\_id}/intel/sinkholes/{sinkhole\_id}

Replaces the name or R2 configuration of the specified sinkhole. This is a full replacement. All fields, including r2\_secret, must be re-supplied. Omitting r2\_secret overwrites the stored value with an empty string.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Intel Write`

##### P ath ParametersExpand Collapse

account\_id: string

An identifier for the resource.

maxLength32

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

sinkhole\_id: string

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20sinkhole_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

The name of the sinkhole.

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

r2\_bucket: optional string

The name of the R2 bucket to store results. Required if you want to store large request bodies in R2.

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20r2_bucket%20%3E%20(schema)>)

r2\_id: optional string

The id of the R2 instance. Required if you want to store large request bodies in R2.

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20r2_id%20%3E%20(schema)>)

r2\_secret: optional string

The secret key for the R2 API token. Required if you want to store large request bodies in R2.

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20r2_secret%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

result: optional unknown

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update a sinkhole

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/sinkholes/$SINKHOLE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "name"
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
  "success": true,
  "result": {}
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
  "success": true,
  "result": {}
}
```