---
title: Create build token
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Tokens](https://developers.cloudflare.com/api/resources/workers_builds/subresources/tokens)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create build token

POST/accounts/{account\_id}/builds/tokens

Create a new build authentication token

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

`Workers CI Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier.

[Link to this property](#)%20workers_builds.tokens%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

build\_token\_name: string

[Link to this property](#)%20workers_builds.tokens%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20build_token_name%20%3E%20(schema)>)

build\_token\_secret: string

[Link to this property](#)%20workers_builds.tokens%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20build_token_secret%20%3E%20(schema)>)

cloudflare\_token\_id: string

[Link to this property](#)%20workers_builds.tokens%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20cloudflare_token_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.tokens%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20workers_builds.tokens%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {build\_token\_name, build\_token\_uuid, cloudflare\_token\_id, owner\_type }

</summary>

build\_token\_name: optional string

<a href="#">Link to this property</a>

build\_token\_uuid: optional string

UUID of the build token used when deploying the Worker.

formatuuid

<a href="#">Link to this property</a>

cloudflare\_token\_id: optional string

<a href="#">Link to this property</a>

owner\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.tokens%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20workers_builds.tokens%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

<a href="#">Link to this property</a>

page: optional number

<a href="#">Link to this property</a>

per\_page: optional number

<a href="#">Link to this property</a>

total\_count: optional number

<a href="#">Link to this property</a>

total\_pages: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.tokens%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Create build token

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/tokens \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "build_token_name": "My Build Token",
          "build_token_secret": "super-secret-token",
          "cloudflare_token_id": "cf-token-123"
        }'
```

200 example

401 example

```
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "build_token_name": "My Build Token",
    "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cloudflare_token_id": "cf-token-123",
    "owner_type": "user"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

```
{
  "errors": [
    {
      "code": 12005,
      "message": "Missing token from authorization header"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

401 example

```
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": {
    "build_token_name": "My Build Token",
    "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cloudflare_token_id": "cf-token-123",
    "owner_type": "user"
  },
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

```
{
  "errors": [
    {
      "code": 12005,
      "message": "Missing token from authorization header"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```