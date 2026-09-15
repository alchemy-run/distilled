---
title: List Hyperdrives
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Hyperdrive](https://developers.cloudflare.com/api/resources/hyperdrive)

[Configs](https://developers.cloudflare.com/api/resources/hyperdrive/subresources/configs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Hyperdrives

GET/accounts/{account\_id}/hyperdrive/configs

Returns a list of Hyperdrives.

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

`Hyperdrive Write``Hyperdrive Read`

##### P ath ParametersExpand Collapse

account\_id: string

Define configurations using a unique string identifier.

maxLength32

[Link to this property](#)%20hyperdrive.configs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20hyperdrive.configs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Maximum number of results per page.

maximum100

minimum1

[Link to this property](#)%20hyperdrive.configs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20hyperdrive.configs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20hyperdrive.configs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/hyperdrive#(resource)%20hyperdrive%20%3E%20(model)%20hyperdrive%20%3E%20(schema)">Hyperdrive</a> { id, name, origin, 6 more }

</summary>

id: string

Define configurations using a unique string identifier.

maxLength32

<a href="#">Link to this property</a>

name: string

The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.

<a href="#">Link to this property</a>

<details>

<summary>

origin: object {database, host, password, 3 more } or object {access\_client\_id, access\_client\_secret, database, 4 more } or object {database, password, scheme, 2 more }

</summary>

One of the following:

<details>

<summary>

PublicDatabase object {database, host, password, 3 more }

</summary>

database: string

Set the name of your origin database.

<a href="#">Link to this property</a>

host: string

Defines the host (hostname or IP) of your origin database.

<a href="#">Link to this property</a>

password: string

Set the password needed to access your origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

port: number

Defines the port of your origin database. Defaults to 5432 for PostgreSQL or 3306 for MySQL if not specified.

<a href="#">Link to this property</a>

<details>

<summary>

scheme: "postgres"or "postgresql"or "mysql"

Specifies the URL scheme used to connect to your origin database.

</summary>

One of the following:

"postgres"

<a href="#">Link to this property</a>

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user: string

Set the user of your origin database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessProtectedDatabaseBehindCloudflareTunnel object {access\_client\_id, access\_client\_secret, database, 4 more }

</summary>

access\_client\_id: string

Defines the Client ID of the Access token to use when connecting to the origin database.

<a href="#">Link to this property</a>

access\_client\_secret: string

Defines the Client Secret of the Access Token to use when connecting to the origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

database: string

Set the name of your origin database.

<a href="#">Link to this property</a>

host: string

Defines the host (hostname or IP) of your origin database.

<a href="#">Link to this property</a>

password: string

Set the password needed to access your origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

<details>

<summary>

scheme: "postgres"or "postgresql"or "mysql"

Specifies the URL scheme used to connect to your origin database.

</summary>

One of the following:

"postgres"

<a href="#">Link to this property</a>

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user: string

Set the user of your origin database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DatabaseReachableThroughAWorkersVPC object {database, password, scheme, 2 more }

</summary>

database: string

Set the name of your origin database.

<a href="#">Link to this property</a>

password: string

Set the password needed to access your origin database. The API never returns this write-only value.

<a href="#">Link to this property</a>

<details>

<summary>

scheme: "postgres"or "postgresql"or "mysql"

Specifies the URL scheme used to connect to your origin database.

</summary>

One of the following:

"postgres"

<a href="#">Link to this property</a>

"postgresql"

<a href="#">Link to this property</a>

"mysql"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

service\_id: string

The identifier of the Workers VPC Service to connect through. Hyperdrive will egress through the specified VPC Service to reach the origin database.

<a href="#">Link to this property</a>

user: string

Set the user of your origin database.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

caching: optional object {disabled } or object {disabled, max\_age, stale\_while\_revalidate }

</summary>

One of the following:

<details>

<summary>

HyperdriveHyperdriveCachingCommon object {disabled }

</summary>

disabled: optional boolean

Set to true to disable caching of SQL responses. Default is false.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HyperdriveHyperdriveCachingEnabled object {disabled, max\_age, stale\_while\_revalidate }

</summary>

disabled: optional boolean

Set to true to disable caching of SQL responses. Default is false.

<a href="#">Link to this property</a>

max\_age: optional number

Specify the maximum duration (in seconds) items should persist in the cache. Defaults to 60 seconds if not specified.

<a href="#">Link to this property</a>

stale\_while\_revalidate: optional number

Specify the number of seconds the cache may serve a stale response. Defaults to 15 seconds if not specified.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

Defines the creation time of the Hyperdrive configuration.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

Defines the last modified time of the Hyperdrive configuration.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

mtls: optional object {ca\_certificate\_id, mtls\_certificate\_id, sslmode }

mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.

</summary>

ca\_certificate\_id: optional string

Define CA certificate ID obtained after uploading CA cert.

<a href="#">Link to this property</a>

mtls\_certificate\_id: optional string

Define mTLS certificate ID obtained after uploading client cert.

<a href="#">Link to this property</a>

sslmode: optional string

Set SSL mode to ‘require’, ‘verify-ca’, or ‘verify-full’ to verify the CA.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

origin\_connection\_limit: optional number

The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.

Maximum allowed: 20 for free tier accounts, 100 for paid tier accounts. If not specified, defaults to 20 for free tier and 60 for paid tier. Certain Cloudflare-managed origins may be permitted a higher limit. Contact Cloudflare if you need a higher limit.

minimum5

<a href="#">Link to this property</a>

restarted\_on: optional string

Defines the last time the Hyperdrive connection pool was explicitly restarted via the restart endpoint. Omitted if the pool has never been explicitly restarted.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20hyperdrive.configs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Return the status of the API call success.

[Link to this property](#)%20hyperdrive.configs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Defines the total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Defines the current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Defines the number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Defines the total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20hyperdrive.configs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Hyperdrives

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/hyperdrive/configs \
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "example-hyperdrive",
      "origin": {
        "database": "postgres",
        "host": "database.example.com",
        "port": 5432,
        "scheme": "postgres",
        "user": "postgres"
      },
      "caching": {
        "disabled": true
      },
      "created_on": "2017-01-01T00:00:00Z",
      "modified_on": "2017-01-01T00:00:00Z",
      "mtls": {
        "ca_certificate_id": "00000000-0000-0000-0000-0000000000",
        "mtls_certificate_id": "00000000-0000-0000-0000-0000000000",
        "sslmode": "verify-full"
      },
      "origin_connection_limit": 60,
      "restarted_on": "2017-01-01T00:00:00Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "example-hyperdrive",
      "origin": {
        "database": "postgres",
        "host": "database.example.com",
        "port": 5432,
        "scheme": "postgres",
        "user": "postgres"
      },
      "caching": {
        "disabled": true
      },
      "created_on": "2017-01-01T00:00:00Z",
      "modified_on": "2017-01-01T00:00:00Z",
      "mtls": {
        "ca_certificate_id": "00000000-0000-0000-0000-0000000000",
        "mtls_certificate_id": "00000000-0000-0000-0000-0000000000",
        "sslmode": "verify-full"
      },
      "origin_connection_limit": 60,
      "restarted_on": "2017-01-01T00:00:00Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```