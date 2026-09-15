---
title: Enable R2 bucket as a catalog
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2 Data Catalog](https://developers.cloudflare.com/api/resources/r2_data_catalog)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Enable R2 bucket as a catalog

POST/accounts/{account\_id}/r2-catalog/{bucket\_name}/enable

Enable an R2 bucket as an Apache Iceberg catalog. This operation creates the necessary catalog infrastructure and activates the bucket for storing Iceberg metadata and data files.

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

[Link to this property](#)%20r2_data_catalog%20%3E%20(method)%20enable%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Specifies the R2 bucket name.

maxLength63

minLength3

[Link to this property](#)%20r2_data_catalog%20%3E%20(method)%20enable%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

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

[Link to this property](#)%20r2_data_catalog%20%3E%20(method)%20enable%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20r2_data_catalog%20%3E%20(method)%20enable%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20r2_data_catalog%20%3E%20(method)%20enable%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, name }

Contains response from activating an R2 bucket as a catalog.

</summary>

id: string

Use this to uniquely identify the activated catalog.

formatuuid

<a href="#">Link to this property</a>

name: string

Specifies the name of the activated catalog.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2_data_catalog%20%3E%20(method)%20enable%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Enable R2 bucket as a catalog

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2-catalog/$BUCKET_NAME/enable \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "account123_my-bucket"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "account123_my-bucket"
  },
  "success": true
}
```