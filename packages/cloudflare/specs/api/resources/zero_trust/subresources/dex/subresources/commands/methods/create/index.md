---
title: Create account commands
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

# Create account commands

POST/accounts/{account\_id}/dex/commands

Initiate commands for up to 10 devices per account.

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

`Cloudflare DEX Write`

##### P ath ParametersExpand Collapse

account\_id: string

Unique identifier linked to an account.

maxLength32

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

commands: array of object {device\_id, type, user\_email, 2 more }

List of device-level commands to execute

</summary>

device\_id: string

Unique identifier for the physical device

<a href="#">Link to this property</a>

<details>

<summary>

type: "pcap"or "speed-test"or "warp-diag"

Type of command to execute on the device

</summary>

One of the following:

"pcap"

<a href="#">Link to this property</a>

"speed-test"

<a href="#">Link to this property</a>

"warp-diag"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user\_email: string

Email tied to the device

<a href="#">Link to this property</a>

<details>

<summary>

args: optional object {"test-all-routes" } or object {"max-file-size-mb", "packet-size-bytes", "time-limit-min" } or object {interfaces }

Command arguments. Allowed fields depend on <code>type</code>.

</summary>

One of the following:

<details>

<summary>

WARPDiagArgs object {"test-all-routes" }

</summary>

"test-all-routes": optional boolean

Test an IP address from all included or excluded ranges. Essentially the same as running ‘route get ’ and collecting the results. This option may increase the time taken to collect the warp-diag.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PCAPArgs object {"max-file-size-mb", "packet-size-bytes", "time-limit-min" }

</summary>

"max-file-size-mb": optional number

Maximum file size (in MB) for the capture file. If the capture artifact exceeds the specified max file size, it will NOT be uploaded.

minimum1

<a href="#">Link to this property</a>

"packet-size-bytes": optional number

Maximum number of bytes to save for each packet

minimum1

<a href="#">Link to this property</a>

"time-limit-min": optional number

Limit on capture duration (in minutes)

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SpeedTestArgs object {interfaces }

</summary>

<details>

<summary>

interfaces: optional array of "default"or "tunnel"

List of interfaces to run the speed test on

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"tunnel"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

registration\_id: optional string

Unique identifier for the device registration. Required for multi-user devices to target the correct user session.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20commands%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {commands }

</summary>

<details>

<summary>

commands: optional array of object {id, args, device\_id, 3 more }

List of created commands

</summary>

id: optional string

Unique identifier for the command

<a href="#">Link to this property</a>

args: optional map\[string]

Command arguments

<a href="#">Link to this property</a>

device\_id: optional string

Identifier for the device associated with the command

<a href="#">Link to this property</a>

registration\_id: optional string

Unique identifier for the device registration

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING\_EXEC"or "PENDING\_UPLOAD"or "SUCCESS"or "FAILED"

Current status of the command

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

<a href="#">Link to this property</a>

type: optional string

Type of the command (e.g., “pcap”, “speed-test”, or “warp-diag”)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Create account commands

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "commands": [
            {
              "device_id": "device_id",
              "type": "pcap",
              "user_email": "user_email"
            }
          ]
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
  "success": true,
  "result": {
    "commands": [
      {
        "id": "id",
        "args": {
          "foo": "string"
        },
        "device_id": "device_id",
        "registration_id": "registration_id",
        "status": "PENDING_EXEC",
        "type": "type"
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
        "args": {
          "foo": "string"
        },
        "device_id": "device_id",
        "registration_id": "registration_id",
        "status": "PENDING_EXEC",
        "type": "type"
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