---
title: Get bulk operation status
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rules Lists](https://developers.cloudflare.com/api/resources/rules)

[Lists](https://developers.cloudflare.com/api/resources/rules/subresources/lists)

[Bulk Operations](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/bulk_operations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get bulk operation status

GET/accounts/{account\_id}/rules/lists/bulk\_operations/{operation\_id}

Gets the current status of an asynchronous operation on a list.

The `status` property can have one of the following values: `pending`, `running`, `completed`, or `failed`. If the status is `failed`, the `error` property will contain a message describing the error.

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

`Account Filter Lists Edit``Account Filter Lists Read`

##### P ath ParametersExpand Collapse

account\_id: string

The Account ID for this resource.

maxLength32

minLength32

[Link to this property](#)%20rules.lists.bulk_operations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

operation\_id: string

The unique operation ID of the asynchronous action.

[Link to this property](#)%20rules.lists.bulk_operations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20operation_id%20%3E%20(schema)>)

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

[Link to this property](#)%20rules.lists.bulk_operations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20rules.lists.bulk_operations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, status } or object {id, completed, status } or object {id, completed, error, status }

</summary>

One of the following:

<details>

<summary>

ListsBulkOperationPendingOrRunning object {id, status }

</summary>

id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "running"

The current status of the asynchronous operation.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsBulkOperationCompleted object {id, completed, status }

</summary>

id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

completed: string

The RFC 3339 timestamp of when the operation was completed.

<a href="#">Link to this property</a>

status: "completed"

The current status of the asynchronous operation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsBulkOperationFailed object {id, completed, error, status }

</summary>

id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

completed: string

The RFC 3339 timestamp of when the operation was completed.

<a href="#">Link to this property</a>

error: string

A message describing the error when the status is <code>failed</code>.

<a href="#">Link to this property</a>

status: "failed"

The current status of the asynchronous operation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists.bulk_operations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20rules.lists.bulk_operations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get bulk operation status

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/bulk_operations/$OPERATION_ID \
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
  "result": {
    "id": "4da8780eeb215e6cb7f48dd981c4ea02",
    "status": "pending"
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
    "id": "4da8780eeb215e6cb7f48dd981c4ea02",
    "status": "pending"
  },
  "success": true
}
```