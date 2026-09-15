---
title: Store catalog credentials
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2 Data Catalog](https://developers.cloudflare.com/api/resources/r2_data_catalog)

[Credentials](https://developers.cloudflare.com/api/resources/r2_data_catalog/subresources/credentials)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Store catalog credentials

POST/accounts/{account\_id}/r2-catalog/{bucket\_name}/credential

Store authentication credentials for a catalog. These credentials are used to authenticate with R2 storage when performing catalog operations.

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

`Workers R2 Data Catalog Write`

##### P ath ParametersExpand Collapse

account\_id: string

Use this to identify the account.

[Link to this property](#)%20r2_data_catalog.credentials%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Specifies the R2 bucket name.

maxLength63

minLength3

[Link to this property](#)%20r2_data_catalog.credentials%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

token: string

Provides the Cloudflare API token for accessing R2.

[Link to this property](#)%20r2_data_catalog.credentials%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20token%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

Contains errors if the API call was unsuccessful.

</summary>

code: number

Specifies the error code.

<a href="#">Link to this property</a>

message: string

Describes the error.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.credentials%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

Contains informational messages.

</summary>

code: number

Specifies the message code.

<a href="#">Link to this property</a>

message: string

Contains the message text.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog.credentials%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20r2_data_catalog.credentials%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

result: optional unknown

[Link to this property](#)%20r2_data_catalog.credentials%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Store catalog credentials

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/credential \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "token": "your-cloudflare-api-token-here"
        }'
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": null,
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
  "messages": [],
  "result": null,
  "success": true
}
```