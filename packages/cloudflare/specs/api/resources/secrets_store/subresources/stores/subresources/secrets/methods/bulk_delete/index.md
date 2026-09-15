---
title: Delete secrets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Secrets Store](https://developers.cloudflare.com/api/resources/secrets_store)

[Stores](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores)

[Secrets](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete secrets

DELETE/accounts/{account\_id}/secrets\_store/stores/{store\_id}/secrets

Deletes one or more secrets.

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

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20bulk_delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

store\_id: string

maxLength32

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20bulk_delete%20%3E%20(params)%20default%20%3E%20(param)%20store_id%20%3E%20(schema)>)

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

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20bulk_delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20bulk_delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20bulk_delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

result: optional unknown

Result is null for delete operations.

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20bulk_delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Delete secrets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets \
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