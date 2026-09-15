---
title: Create D1 Database
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[D1](https://developers.cloudflare.com/api/resources/d1)

[Database](https://developers.cloudflare.com/api/resources/d1/subresources/database)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create D1 Database

POST/accounts/{account\_id}/d1/database

Returns the created D1 database.

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

`D1 Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier tag.

maxLength32

[Link to this property](#)%20d1.database%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

D1 database name.

[Link to this property](#)%20d1.database%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

jurisdiction: optional "eu"or "fedramp"or "us"

Specify the location to restrict the D1 database to run and store data. If this option is present, the location hint is ignored.

</summary>

One of the following:

"eu"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

<details>

<summary>

primary\_location\_hint: optional "wnam"or "enam"or "weur"or 3 more

Specify the region to create the D1 primary, if available. If this option is omitted, the D1 will be created as close as possible to the current user.

</summary>

One of the following:

"wnam"

<a href="#">Link to this property</a>

"enam"

<a href="#">Link to this property</a>

"weur"

<a href="#">Link to this property</a>

"eeur"

<a href="#">Link to this property</a>

"apac"

<a href="#">Link to this property</a>

"oc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20primary_location_hint%20%3E%20(schema)>)

<details>

<summary>

read\_replication: optional object {mode }

Configuration for D1 read replication.

</summary>

<details>

<summary>

mode: "auto"or "disabled"

The read replication mode for the database. Use ‘auto’ to create replicas and allow D1 automatically place them around the world, or ‘disabled’ to not use any database replicas (it can take a few hours for all replicas to be deleted).

</summary>

One of the following:

"auto"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20read_replication%20%3E%20(schema)>)

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/d1#(resource)%20d1%20%3E%20(model)%20d1%20%3E%20(schema)">D1</a> { created\_at, file\_size, jurisdiction, 5 more }

The details of the D1 database.

</summary>

created\_at: optional string

Specifies the timestamp the resource was created as an ISO8601 string.

formatdate-time

<a href="#">Link to this property</a>

file\_size: optional number

The D1 database’s size, in bytes.

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "eu"or "fedramp"or "us"

Specify the location to restrict the D1 database to run and store data. If this option is present, the location hint is ignored.

</summary>

One of the following:

"eu"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

D1 database name.

<a href="#">Link to this property</a>

num\_tables: optional number

<a href="#">Link to this property</a>

<details>

<summary>

read\_replication: optional object {mode }

Configuration for D1 read replication.

</summary>

<details>

<summary>

mode: "auto"or "disabled"

The read replication mode for the database. Mode ‘auto’ denotes that D1 creates replicas and automatically places them around the world. Mode ‘disabled’ denotes that no database replicas are used.

</summary>

One of the following:

"auto"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uuid: optional string

D1 database identifier (UUID).

<a href="#">Link to this property</a>

version: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20d1.database%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create D1 Database

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my-database",
          "jurisdiction": "eu",
          "primary_location_hint": "wnam"
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
    "created_at": "2022-11-15T18:25:44.442097Z",
    "file_size": 12,
    "jurisdiction": "eu",
    "name": "my-database",
    "num_tables": 12,
    "read_replication": {
      "mode": "auto"
    },
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "version": "production"
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
    "created_at": "2022-11-15T18:25:44.442097Z",
    "file_size": 12,
    "jurisdiction": "eu",
    "name": "my-database",
    "num_tables": 12,
    "read_replication": {
      "mode": "auto"
    },
    "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "version": "production"
  },
  "success": true
}
```