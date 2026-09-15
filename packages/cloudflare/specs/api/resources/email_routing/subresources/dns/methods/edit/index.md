---
title: Unlock Email Routing
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Routing](https://developers.cloudflare.com/api/resources/email_routing)

[DNS](https://developers.cloudflare.com/api/resources/email_routing/subresources/dns)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Unlock Email Routing

PATCH/zones/{zone\_id}/email/routing/dns

Unlock MX Records previously locked by Email Routing.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Zone Settings Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_routing.dns%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: optional string

Domain of your zone.

[Link to this property](#)%20email_routing.dns%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

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

[Link to this property](#)%20email_routing.dns%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_routing.dns%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_routing.dns%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/email_routing#(resource)%20email_routing%20%3E%20(model)%20settings%20%3E%20(schema)">Settings</a> { id, enabled, name, 6 more }

</summary>

id: string

Email Routing settings identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

enabled: trueor false

State of the zone settings for Email Routing.

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Domain of your zone.

<a href="#">Link to this property</a>

created: optional string

The date and time the settings have been created.

formatdate-time

<a href="#">Link to this property</a>

modified: optional string

The date and time the settings have been modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

skip\_wizard: optional trueor false

Flag to check if the user skipped the configuration wizard.

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "ready"or "unconfigured"or "misconfigured"or 2 more

Show the state of your account, and the type or configuration error.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"unconfigured"

<a href="#">Link to this property</a>

"misconfigured"

<a href="#">Link to this property</a>

"misconfigured/locked"

<a href="#">Link to this property</a>

"unlocked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

support\_subaddress: optional trueor false

Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedtag: optional string

Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_routing.dns%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Unlock Email Routing

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/dns \
    -X PATCH \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "id": "75610dab9e69410a82cf7e400a09ecec",
    "enabled": true,
    "name": "example.net",
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "skip_wizard": true,
    "status": "ready",
    "support_subaddress": true,
    "tag": "75610dab9e69410a82cf7e400a09ecec"
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
    "id": "75610dab9e69410a82cf7e400a09ecec",
    "enabled": true,
    "name": "example.net",
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "skip_wizard": true,
    "status": "ready",
    "support_subaddress": true,
    "tag": "75610dab9e69410a82cf7e400a09ecec"
  }
}
```