---
title: Get D1 Database
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[D1](https://developers.cloudflare.com/api/resources/d1)

[Database](https://developers.cloudflare.com/api/resources/d1/subresources/database)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get D1 Database

GET/accounts/{account\_id}/d1/database/{database\_id}

Returns the specified D1 database.

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

`D1 Read``D1 Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier tag.

maxLength32

[Link to this property](#)%20d1.database%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

database\_id: string

D1 database identifier (UUID).

[Link to this property](#)%20d1.database%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20database_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

fields: optional array of "uuid"or "name"or "created\_at"or 6 more

Comma-separated list of fields to include in the response. When omitted, all fields are returned.

</summary>

One of the following:

"uuid"

<a href="#">Link to this property</a>

"name"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

"version"

<a href="#">Link to this property</a>

"jurisdiction"

<a href="#">Link to this property</a>

"num\_tables"

<a href="#">Link to this property</a>

"file\_size"

<a href="#">Link to this property</a>

"running\_in\_region"

<a href="#">Link to this property</a>

"read\_replication"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20fields%20%3E%20(schema)>)

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20d1.database%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get D1 Database

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID \
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