---
title: Patch Monitor Group
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

[Monitor Groups](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Patch Monitor Group

PATCH/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}

Apply changes to an existing monitor group, overwriting the supplied properties.

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

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20load_balancers.monitor_groups%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

monitor\_group\_id: string

[Link to this property](#)%20load_balancers.monitor_groups%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20monitor_group_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

description: string

A short description of the monitor group

[Link to this property](#)%20load_balancers.monitor_groups%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

<details>

<summary>

members: array of object {enabled, monitor\_id, monitoring\_only, 3 more }

List of monitors in this group

</summary>

enabled: boolean

Whether this monitor is enabled in the group

<a href="#">Link to this property</a>

monitor\_id: string

The ID of the Monitor to use for checking the health of origins within this pool.

<a href="#">Link to this property</a>

monitoring\_only: boolean

Whether this monitor is used for monitoring only (does not affect pool health)

<a href="#">Link to this property</a>

must\_be\_healthy: boolean

Whether this monitor must be healthy for the pool to be considered healthy

<a href="#">Link to this property</a>

created\_at: optional string

The timestamp of when the monitor was added to the group

formatdate-time

<a href="#">Link to this property</a>

updated\_at: optional string

The timestamp of when the monitor group member was last updated

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitor_groups%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20members%20%3E%20(schema)>)

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

[Link to this property](#)%20load_balancers.monitor_groups%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20load_balancers.monitor_groups%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/load_balancers#(resource)%20load_balancers.monitor_groups%20%3E%20(model)%20monitor_group%20%3E%20(schema)">MonitorGroup</a> { id, description, members, 2 more }

</summary>

id: string

The ID of the Monitor Group to use for checking the health of origins within this pool.

<a href="#">Link to this property</a>

description: string

A short description of the monitor group

<a href="#">Link to this property</a>

<details>

<summary>

members: array of object {enabled, monitor\_id, monitoring\_only, 3 more }

List of monitors in this group

</summary>

enabled: boolean

Whether this monitor is enabled in the group

<a href="#">Link to this property</a>

monitor\_id: string

The ID of the Monitor to use for checking the health of origins within this pool.

<a href="#">Link to this property</a>

monitoring\_only: boolean

Whether this monitor is used for monitoring only (does not affect pool health)

<a href="#">Link to this property</a>

must\_be\_healthy: boolean

Whether this monitor must be healthy for the pool to be considered healthy

<a href="#">Link to this property</a>

created\_at: optional string

The timestamp of when the monitor was added to the group

formatdate-time

<a href="#">Link to this property</a>

updated\_at: optional string

The timestamp of when the monitor group member was last updated

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The timestamp of when the monitor group was created

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The timestamp of when the monitor group was last updated

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitor_groups%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20load_balancers.monitor_groups%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Patch Monitor Group

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Primary datacenter monitors",
          "members": [
            {
              "enabled": true,
              "monitor_id": "monitor_id",
              "monitoring_only": false,
              "must_be_healthy": true
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
  "result": {
    "id": "id",
    "description": "Primary datacenter monitors",
    "members": [
      {
        "enabled": true,
        "monitor_id": "monitor_id",
        "monitoring_only": false,
        "must_be_healthy": true,
        "created_at": "2014-01-01T05:20:00.12345Z",
        "updated_at": "2014-01-01T05:20:00.12345Z"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z"
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
    "id": "id",
    "description": "Primary datacenter monitors",
    "members": [
      {
        "enabled": true,
        "monitor_id": "monitor_id",
        "monitoring_only": false,
        "must_be_healthy": true,
        "created_at": "2014-01-01T05:20:00.12345Z",
        "updated_at": "2014-01-01T05:20:00.12345Z"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```