---
title: List account commands
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Commands](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List account commands

GET/accounts/{account\_id}/dex/commands

Retrieves a paginated list of commands issued to devices under the specified account, optionally filtered by time range, device, or other parameters

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

`Cloudflare DEX Write``Cloudflare DEX Read``Zero Trust Report``Zero Trust Read`

##### P ath ParametersExpand Collapse

account\_id: string

Unique identifier linked to an account.

maxLength32

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: number

Page number of paginated results.

minimum1

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: number

Number of results per page.

maximum50

minimum1

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

command\_type: optional "pcap"or "speed-test"or "warp-diag"

Optionally filter executed commands by command type.

</summary>

One of the following:

"pcap"

<a href="#">Link to this property</a>

"speed-test"

<a href="#">Link to this property</a>

"warp-diag"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20command_type%20%3E%20(schema)>)

device\_id: optional string

Unique identifier for a device.

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20device_id%20%3E%20(schema)>)

from: optional string

Start time for the query in ISO (RFC3339 - ISO 8601) format.

formatdate-time

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20from%20%3E%20(schema)>)

<details>

<summary>

status: optional "PENDING\_EXEC"or "PENDING\_UPLOAD"or "SUCCESS"or "FAILED"

Optionally filter executed commands by status.

</summary>

One of the following:

"PENDING\_EXEC"

<a href="#">Link to this property</a>

"PENDING\_UPLOAD"

<a href="#">Link to this property</a>

"SUCCESS"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

to: optional string

End time for the query in ISO (RFC3339 - ISO 8601) format.

formatdate-time

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20to%20%3E%20(schema)>)

user\_email: optional string

Email tied to the device.

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20user_email%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {commands }

</summary>

<details>

<summary>

commands: optional array of object {id, completed\_date, created\_date, 6 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

completed\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

device\_id: optional string

<a href="#">Link to this property</a>

filename: optional string

<a href="#">Link to this property</a>

registration\_id: optional string

Unique identifier for the device registration

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

user\_email: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List account commands

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands \
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
    "commands": [
      {
        "id": "id",
        "completed_date": "2019-12-27T18:11:19.117Z",
        "created_date": "2019-12-27T18:11:19.117Z",
        "device_id": "device_id",
        "filename": "filename",
        "registration_id": "registration_id",
        "status": "status",
        "type": "type",
        "user_email": "user_email"
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
    "commands": [
      {
        "id": "id",
        "completed_date": "2019-12-27T18:11:19.117Z",
        "created_date": "2019-12-27T18:11:19.117Z",
        "device_id": "device_id",
        "filename": "filename",
        "registration_id": "registration_id",
        "status": "status",
        "type": "type",
        "user_email": "user_email"
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```