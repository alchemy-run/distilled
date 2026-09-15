---
title: List fields
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logpush](https://developers.cloudflare.com/api/resources/logpush)

[Datasets](https://developers.cloudflare.com/api/resources/logpush/subresources/datasets)

[Fields](https://developers.cloudflare.com/api/resources/logpush/subresources/datasets/subresources/fields)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List fields

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/logpush/datasets/{dataset\_id}/fields

Lists all fields available for a dataset. The response result is. an object with key-value pairs, where keys are field names, and values are descriptions.

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

`Logs Read`

##### P ath ParametersExpand Collapse

<details>

<summary>

dataset\_id: "access\_requests"or "account\_abuse\_protection\_events"or "audit\_logs"or 34 more

Name of the dataset. A list of supported datasets can be found on the <a href="https://developers.cloudflare.com/logs/reference/log-fields/">Developer Docs</a>.

</summary>

One of the following:

"access\_requests"

<a href="#">Link to this property</a>

"account\_abuse\_protection\_events"

<a href="#">Link to this property</a>

"audit\_logs"

<a href="#">Link to this property</a>

"audit\_logs\_v2"

<a href="#">Link to this property</a>

"biso\_user\_actions"

<a href="#">Link to this property</a>

"casb\_findings"

<a href="#">Link to this property</a>

"device\_posture\_results"

<a href="#">Link to this property</a>

"dex\_application\_tests"

<a href="#">Link to this property</a>

"dex\_device\_state\_events"

<a href="#">Link to this property</a>

"dlp\_forensic\_copies"

<a href="#">Link to this property</a>

"dns\_firewall\_logs"

<a href="#">Link to this property</a>

"dns\_logs"

<a href="#">Link to this property</a>

"email\_security\_alerts"

<a href="#">Link to this property</a>

"email\_security\_post\_delivery\_events"

<a href="#">Link to this property</a>

"firewall\_events"

<a href="#">Link to this property</a>

"gateway\_dns"

<a href="#">Link to this property</a>

"gateway\_http"

<a href="#">Link to this property</a>

"gateway\_network"

<a href="#">Link to this property</a>

"http\_requests"

<a href="#">Link to this property</a>

"ipsec\_logs"

<a href="#">Link to this property</a>

"magic\_bgp\_logs"

<a href="#">Link to this property</a>

"magic\_ids\_detections"

<a href="#">Link to this property</a>

"mcp\_portal\_logs"

<a href="#">Link to this property</a>

"mnm\_flow\_logs"

<a href="#">Link to this property</a>

"nel\_reports"

<a href="#">Link to this property</a>

"network\_analytics\_logs"

<a href="#">Link to this property</a>

"page\_shield\_events"

<a href="#">Link to this property</a>

"sinkhole\_http\_logs"

<a href="#">Link to this property</a>

"spectrum\_events"

<a href="#">Link to this property</a>

"ssh\_logs"

<a href="#">Link to this property</a>

"turnstile\_events"

<a href="#">Link to this property</a>

"warp\_config\_changes"

<a href="#">Link to this property</a>

"warp\_toggle\_changes"

<a href="#">Link to this property</a>

"websocket\_analytics"

<a href="#">Link to this property</a>

"workers\_trace\_events"

<a href="#">Link to this property</a>

"zaraz\_events"

<a href="#">Link to this property</a>

"zero\_trust\_network\_sessions"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.datasets.fields%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dataset_id%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20logpush.datasets.fields%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20logpush.datasets.fields%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20logpush.datasets.fields%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20logpush.datasets.fields%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20logpush.datasets.fields%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

result: optional map\[string]

[Link to this property](#)%20logpush.datasets.fields%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List fields

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/datasets/$DATASET_ID/fields \
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
    "foo": "string"
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
    "foo": "string"
  }
}
```