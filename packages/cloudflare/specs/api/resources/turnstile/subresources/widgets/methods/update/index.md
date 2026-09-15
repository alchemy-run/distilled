---
title: Update a Turnstile Widget
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Turnstile](https://developers.cloudflare.com/api/resources/turnstile)

[Widgets](https://developers.cloudflare.com/api/resources/turnstile/subresources/widgets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a Turnstile Widget

PUT/accounts/{account\_id}/challenges/widgets/{sitekey}

Update the configuration of a widget.

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

`Turnstile Sites Write``Account Settings Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

sitekey: string

Widget item identifier tag.

maxLength32

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20sitekey%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

domains: array of [WidgetDomain](<https://developers.cloudflare.com/api/resources/turnstile#(resource)%20turnstile.widgets%20%3E%20(model)%20widget_domain%20%3E%20(schema)>)

maxLength10

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20domains%20%3E%20(schema)>)

<details>

<summary>

mode: "non-interactive"or "invisible"or "managed"

Widget Mode

</summary>

One of the following:

"non-interactive"

<a href="#">Link to this property</a>

"invisible"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20mode%20%3E%20(schema)>)

name: string

Human readable widget name. Not unique. Cloudflare suggests that you set this to a meaningful string to make it easier to identify your widget, and where it is used.

maxLength254

minLength1

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

bot\_fight\_mode: optional boolean

If bot\_fight\_mode is set to `true`, Cloudflare issues computationally expensive challenges in response to malicious bots (ENT only).

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20bot_fight_mode%20%3E%20(schema)>)

<details>

<summary>

clearance\_level: optional "no\_clearance"or "jschallenge"or "managed"or "interactive"

If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance, this setting can determine the clearance level to be set

</summary>

One of the following:

"no\_clearance"

<a href="#">Link to this property</a>

"jschallenge"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

"interactive"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20clearance_level%20%3E%20(schema)>)

ephemeral\_id: optional boolean

Return the Ephemeral ID in /siteverify (ENT only).

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20ephemeral_id%20%3E%20(schema)>)

offlabel: optional boolean

Do not show any Cloudflare branding on the widget (ENT only).

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20offlabel%20%3E%20(schema)>)

<details>

<summary>

region: optional "world"or "china"

Region where this widget can be used. This cannot be changed after creation.

</summary>

One of the following:

"world"

<a href="#">Link to this property</a>

"china"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20region%20%3E%20(schema)>)

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

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/turnstile#(resource)%20turnstile.widgets%20%3E%20(model)%20widget%20%3E%20(schema)">Widget</a> { bot\_fight\_mode, clearance\_level, created\_on, 11 more }

A Turnstile widget’s detailed configuration

</summary>

bot\_fight\_mode: boolean

If bot\_fight\_mode is set to <code>true</code>, Cloudflare issues computationally expensive challenges in response to malicious bots (ENT only).

<a href="#">Link to this property</a>

<details>

<summary>

clearance\_level: "no\_clearance"or "jschallenge"or "managed"or "interactive"

If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance, this setting can determine the clearance level to be set

</summary>

One of the following:

"no\_clearance"

<a href="#">Link to this property</a>

"jschallenge"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

"interactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

When the widget was created.

formatdate-time

<a href="#">Link to this property</a>

domains: array of <a href="https://developers.cloudflare.com/api/resources/turnstile#(resource)%20turnstile.widgets%20%3E%20(model)%20widget_domain%20%3E%20(schema)">WidgetDomain</a>

maxLength10

<a href="#">Link to this property</a>

ephemeral\_id: boolean

Return the Ephemeral ID in /siteverify (ENT only).

<a href="#">Link to this property</a>

<details>

<summary>

mode: "non-interactive"or "invisible"or "managed"

Widget Mode

</summary>

One of the following:

"non-interactive"

<a href="#">Link to this property</a>

"invisible"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the widget was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

Human readable widget name. Not unique. Cloudflare suggests that you set this to a meaningful string to make it easier to identify your widget, and where it is used.

maxLength254

minLength1

<a href="#">Link to this property</a>

offlabel: boolean

Do not show any Cloudflare branding on the widget (ENT only).

<a href="#">Link to this property</a>

<details>

<summary>

region: "world"or "china"

Region where this widget can be used. This cannot be changed after creation.

</summary>

One of the following:

"world"

<a href="#">Link to this property</a>

"china"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

secret: string

Secret key for this widget.

<a href="#">Link to this property</a>

sitekey: string

Widget item identifier tag.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

deployed\_via: optional "wrangler"or "dashboard"or "spin"or 2 more

Origin that created this widget, recorded at creation time and immutable afterward. Server-derived from the create request; not client-settable. Omitted from the response for widgets created before this field existed.

</summary>

One of the following:

"wrangler"

<a href="#">Link to this property</a>

"dashboard"

<a href="#">Link to this property</a>

"spin"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

last\_modified\_via: optional "wrangler"or "dashboard"or "spin"or 2 more

Origin of the most recent mutation (create, update, delete, or secret rotation). Server-derived; not client-settable. Omitted for widgets last mutated before this field existed.

</summary>

One of the following:

"wrangler"

<a href="#">Link to this property</a>

"dashboard"

<a href="#">Link to this property</a>

"spin"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20turnstile.widgets%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update a Turnstile Widget

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "domains": [
            "203.0.113.1",
            "cloudflare.com",
            "blog.example.com"
          ],
          "mode": "invisible",
          "name": "blog.cloudflare.com login form",
          "clearance_level": "interactive"
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
    "bot_fight_mode": false,
    "clearance_level": "interactive",
    "created_on": "2014-01-01T05:20:00.123123Z",
    "domains": [
      "203.0.113.1",
      "cloudflare.com",
      "blog.example.com"
    ],
    "ephemeral_id": false,
    "mode": "invisible",
    "modified_on": "2014-01-01T05:20:00.123123Z",
    "name": "blog.cloudflare.com login form",
    "offlabel": false,
    "region": "world",
    "secret": "0x4AAF00AAAABn0R22HWm098HVBjhdsYUc",
    "sitekey": "0x4AAF00AAAABn0R22HWm-YUc",
    "deployed_via": "wrangler",
    "last_modified_via": "dashboard"
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
    "bot_fight_mode": false,
    "clearance_level": "interactive",
    "created_on": "2014-01-01T05:20:00.123123Z",
    "domains": [
      "203.0.113.1",
      "cloudflare.com",
      "blog.example.com"
    ],
    "ephemeral_id": false,
    "mode": "invisible",
    "modified_on": "2014-01-01T05:20:00.123123Z",
    "name": "blog.cloudflare.com login form",
    "offlabel": false,
    "region": "world",
    "secret": "0x4AAF00AAAABn0R22HWm098HVBjhdsYUc",
    "sitekey": "0x4AAF00AAAABn0R22HWm-YUc",
    "deployed_via": "wrangler",
    "last_modified_via": "dashboard"
  }
}
```