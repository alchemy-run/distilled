---
title: Patch Waiting Room Rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Waiting Rooms](https://developers.cloudflare.com/api/resources/waiting_rooms)

[Rules](https://developers.cloudflare.com/api/resources/waiting_rooms/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Patch Waiting Room Rule

PATCH/zones/{zone\_id}/waiting\_rooms/{waiting\_room\_id}/rules/{rule\_id}

Patches a rule for a waiting room.

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

`Waiting Rooms Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

waiting\_room\_id: string

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20waiting_room_id%20%3E%20(schema)>)

rule\_id: string

The ID of the rule.

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20rule_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

action: "bypass\_waiting\_room"

The action to take when the expression matches.

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20action%20%3E%20(schema)>)

expression: string

Criteria defining when there is a match for the current rule.

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20expression%20%3E%20(schema)>)

description: optional string

The description of the rule.

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

enabled: optional boolean

When set to true, the rule is enabled.

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

<details>

<summary>

position: optional object {index } or object {before } or object {after }

Reorder the position of a rule

</summary>

One of the following:

<details>

<summary>

Index object {index }

</summary>

index: optional number

Places the rule in the exact position specified by the integer number &lt;POSITION\_NUMBER&gt;. Position numbers start with 1. Existing rules in the ruleset from the specified position number onward are shifted one position (no rule is overwritten).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Before object {before }

</summary>

before: optional string

Places the rule before rule &lt;RULE\_ID&gt;. Use this argument with an empty rule ID value ("") to set the rule as the first rule in the ruleset.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

After object {after }

</summary>

after: optional string

Places the rule after rule &lt;RULE\_ID&gt;. Use this argument with an empty rule ID value ("") to set the rule as the last rule in the ruleset.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20position%20%3E%20(schema)>)

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

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/waiting_rooms#(resource)%20waiting_rooms.rules%20%3E%20(model)%20waiting_room_rule%20%3E%20(schema)">WaitingRoomRule</a> { id, action, description, 4 more }

</summary>

id: optional string

The ID of the rule.

<a href="#">Link to this property</a>

action: optional "bypass\_waiting\_room"

The action to take when the expression matches.

<a href="#">Link to this property</a>

description: optional string

The description of the rule.

<a href="#">Link to this property</a>

enabled: optional boolean

When set to true, the rule is enabled.

<a href="#">Link to this property</a>

expression: optional string

Criteria defining when there is a match for the current rule.

<a href="#">Link to this property</a>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

version: optional string

The version of the rule.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20waiting_rooms.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Patch Waiting Room Rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "bypass_waiting_room",
          "expression": "ip.src in {10.20.30.40}",
          "description": "allow all traffic from 10.20.30.40",
          "enabled": true
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
  "result": [
    {
      "id": "25756b2dfe6e378a06b033b670413757",
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
    }
  ],
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
  "result": [
    {
      "id": "25756b2dfe6e378a06b033b670413757",
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```