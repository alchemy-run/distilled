---
title: Update CSAM Scanner setting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Csam Scanner](https://developers.cloudflare.com/api/resources/csam_scanner)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update CSAM Scanner setting

PATCH/zones/{zone\_id}/settings/csam\_scanner\_third\_party

Update the CSAM Scanner configuration for a zone. Allows enabling or disabling CSAM scanning, updating the notification email, and configuring scanning sources.

When a new email is provided, email verification is triggered automatically. The `enabled` field is a toggle; the server may adjust it based on whether the notification email is verified.

Returns 403 if the zone or account is locked by Trust & Safety.

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

`Zone Settings Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier for the zone.

maxLength32

minLength1

[Link to this property](#)%20csam_scanner%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

id: optional "csam\_scanner"

The feature identifier.

[Link to this property](#)%20csam_scanner%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20id%20%3E%20(schema)>)

<details>

<summary>

value: optional object {email, enabled, resend\_email, sources }

Writable CSAM Scanner feature configuration values.

</summary>

email: optional string

Notification email address for CSAM scan results. When changed, email verification is triggered automatically.

maxLength254

<a href="#">Link to this property</a>

enabled: optional boolean

Whether CSAM scanning is enabled for this zone.

<a href="#">Link to this property</a>

resend\_email: optional boolean

Set to true to trigger re-sending the email verification. Write-only; never appears in responses (omitted when false).

<a href="#">Link to this property</a>

sources: optional map\[boolean]

Map of scanning sources and their enabled state.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20csam_scanner%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20value%20%3E%20(schema)>)

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

[Link to this property](#)%20csam_scanner%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20csam_scanner%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20csam_scanner%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, editable, modified\_on, value }

CSAM Scanner configuration for a zone.

</summary>

id: optional "csam\_scanner"

The feature identifier.

<a href="#">Link to this property</a>

editable: optional boolean

Whether the feature state can be changed. When false, the zone or account may be locked by Trust &amp; Safety.

<a href="#">Link to this property</a>

modified\_on: optional string

When the setting was last modified. Currently always null as the server does not populate this field.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {email, email\_state, enabled, 2 more }

The CSAM Scanner feature configuration values. Contains the notification email and scanning enablement settings.

</summary>

email: optional string

Notification email address for CSAM scan results. Masked in responses unless explicitly unmasked via admin endpoint.

maxLength254

<a href="#">Link to this property</a>

<details>

<summary>

email\_state: optional "valid"or "pending"or "unverified"

Current verification state of the notification email.

</summary>

One of the following:

"valid"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"unverified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Whether CSAM scanning is enabled for this zone.

<a href="#">Link to this property</a>

sources: optional map\[boolean]

Map of scanning sources and their enabled state.

<a href="#">Link to this property</a>

zone\_plan: optional string

The zone’s plan level.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20csam_scanner%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update CSAM Scanner setting

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/csam_scanner_third_party \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "csam_scanner"
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
    "id": "csam_scanner",
    "editable": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "value": {
      "email": "**********",
      "email_state": "valid",
      "enabled": true,
      "sources": {
        "source1": true
      },
      "zone_plan": "ent"
    }
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
    "id": "csam_scanner",
    "editable": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "value": {
      "email": "**********",
      "email_state": "valid",
      "enabled": true,
      "sources": {
        "source1": true
      },
      "zone_plan": "ent"
    }
  }
}
```