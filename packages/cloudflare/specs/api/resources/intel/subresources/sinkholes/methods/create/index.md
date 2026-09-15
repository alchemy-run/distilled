---
title: Create a new sinkhole for your account
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Sinkholes](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a new sinkhole for your account

POST/accounts/{account\_id}/intel/sinkholes

Create a new sinkhole. Logs of large request bodies will be truncated, but the full request body can be recorded in R2. If you wish to record large request bodies in R2, include the R2 key ID, key secret, and bucket name in the request body.

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

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

The name of the sinkhole.

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

r2\_bucket: optional string

The name of the R2 bucket to store results. Required if you want to store large request bodies in R2.

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20r2_bucket%20%3E%20(schema)>)

r2\_id: optional string

The id of the R2 instance. Required if you want to store large request bodies in R2.

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20r2_id%20%3E%20(schema)>)

r2\_secret: optional string

The secret key for the R2 API token. Required if you want to store large request bodies in R2.

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20r2_secret%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.sinkholes%20%3E%20(model)%20sinkhole%20%3E%20(schema)">Sinkhole</a> { id, account\_tag, created\_on, 4 more }

</summary>

id: optional string

The unique identifier for the sinkhole.

<a href="#">Link to this property</a>

account\_tag: optional string

The account tag that owns this sinkhole.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the sinkhole was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the sinkhole was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the sinkhole.

<a href="#">Link to this property</a>

r2\_bucket: optional string

The name of the R2 bucket to store results.

<a href="#">Link to this property</a>

r2\_id: optional string

The id of the R2 instance.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.sinkholes%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a new sinkhole for your account

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/sinkholes \
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
  "result": {
    "id": "93defa6e909e464e8c89a85859f36d3c",
    "account_tag": "233f45e61fd1f7e21e1e154ede4q2859",
    "created_on": "2023-05-12T12:21:56.777653Z",
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "my_sinkhole",
    "r2_bucket": "my_bucket",
    "r2_id": "example_r2_id"
  }
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
  "result": {
    "id": "93defa6e909e464e8c89a85859f36d3c",
    "account_tag": "233f45e61fd1f7e21e1e154ede4q2859",
    "created_on": "2023-05-12T12:21:56.777653Z",
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "my_sinkhole",
    "r2_bucket": "my_bucket",
    "r2_id": "example_r2_id"
  }
}
```