---
title: Delete a store
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Secrets Store](https://developers.cloudflare.com/api/resources/secrets_store)

[Stores](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a store

DELETE/accounts/{account\_id}/secrets\_store/stores/{store\_id}

Deletes a single store. By default, a store that still contains secrets cannot be deleted and returns HTTP 409 (Conflict) with the “store\_not\_empty” error. Pass `force=true` to cascade-delete all secrets in the store. Empty stores are always deleted regardless of the force parameter.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Secrets Store Write`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20secrets_store.stores%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

store\_id: string

maxLength32

[Link to this property](#)%20secrets_store.stores%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20store_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

force: optional boolean

When true, cascade-deletes all secrets in the store before deleting the store itself. Required when deleting a non-empty store. Without this parameter, attempting to delete a non-empty store returns 409.

[Link to this property](#)%20secrets_store.stores%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20force%20%3E%20(schema)>)

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

[Link to this property](#)%20secrets_store.stores%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20secrets_store.stores%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20secrets_store.stores%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

result: optional unknown

Result is null for delete operations.

[Link to this property](#)%20secrets_store.stores%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Delete a store

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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