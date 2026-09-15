---
title: Create BGP Filter Profile
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[BGP Filter Profiles](https://developers.cloudflare.com/api/resources/magic_transit/subresources/bgp_filter_profiles)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create BGP Filter Profile

POST/accounts/{account\_id}/magic/bgp/filter\_profiles

Creates a new BGP filter profile for an account.

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

Identifier

maxLength32

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

match\_action: "allow"or "deny"

Action to take when a route matches one of the targets in this profile

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20match_action%20%3E%20(schema)>)

name: string

Friendly name for the filter profile

maxLength255

minLength1

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

targets: array of string

List of CIDR prefixes. Each entry may carry an optional suffix that specifies which prefix lengths to match relative to the prefix length N: ‘{X,Y}’ matches prefix lengths in the inclusive range \[X, Y] where N <= X <= Y <= max (max is 32 for IPv4, 128 for IPv6), ‘{X}’ matches exactly length X (equivalent to {X,X}), ’+’ is shorthand for {N, max} (the prefix and all more-specific subnets, including at length N itself; valid even when N is the maximum length). Omit the suffix to match the prefix exactly at length N.

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20targets%20%3E%20(schema)>)

description: optional string

Description of the filter profile

maxLength1024

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, description, match\_action, 4 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

description: string

Description of the filter profile

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

match\_action: "allow"or "deny"

Action to take when a route matches one of the targets in this profile

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Friendly name for the filter profile

maxLength255

minLength1

<a href="#">Link to this property</a>

targets: array of string

List of CIDR prefixes. Each entry may carry an optional suffix that specifies which prefix lengths to match relative to the prefix length N: ‘{X,Y}’ matches prefix lengths in the inclusive range \[X, Y] where N &lt;= X &lt;= Y &lt;= max (max is 32 for IPv4, 128 for IPv6), ‘{X}’ matches exactly length X (equivalent to {X,X}), ’+’ is shorthand for {N, max} (the prefix and all more-specific subnets, including at length N itself; valid even when N is the maximum length). Omit the suffix to match the prefix exactly at length N.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_transit.bgp_filter_profiles%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create BGP Filter Profile

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/bgp/filter_profiles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "match_action": "allow",
          "name": "Allowed On-Prem Imports",
          "targets": [
            "10.0.0.0/8{8,32}"
          ],
          "description": "Allowed corporate subnets from on-premises"
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
    "id": "c4a7362d577a6c3019a474fd6f485821",
    "description": "Allowed corporate subnets from on-premises",
    "match_action": "allow",
    "name": "Allowed On-Prem Imports",
    "targets": [
      "10.0.0.0/8{8,32}"
    ],
    "created_on": "2019-12-27T18:11:19.117Z",
    "modified_on": "2019-12-27T18:11:19.117Z"
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
    "id": "c4a7362d577a6c3019a474fd6f485821",
    "description": "Allowed corporate subnets from on-premises",
    "match_action": "allow",
    "name": "Allowed On-Prem Imports",
    "targets": [
      "10.0.0.0/8{8,32}"
    ],
    "created_on": "2019-12-27T18:11:19.117Z",
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```