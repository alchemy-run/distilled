---
title: Get a custom page
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Custom Pages](https://developers.cloudflare.com/api/resources/custom_pages)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a custom page

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_pages/{identifier}

Fetches the details of a custom page.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Zero Trust: PII Read``Account Custom Pages Write``Account Custom Pages Read``Account Settings Write``Account Settings Read`

##### P ath ParametersExpand Collapse

<details>

<summary>

identifier: "1000\_errors"or "500\_errors"or "basic\_challenge"or 7 more

Error Page Types

</summary>

One of the following:

"1000\_errors"

<a href="#">Link to this property</a>

"500\_errors"

<a href="#">Link to this property</a>

"basic\_challenge"

<a href="#">Link to this property</a>

"country\_challenge"

<a href="#">Link to this property</a>

"ip\_block"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

"ratelimit\_block"

<a href="#">Link to this property</a>

"under\_attack"

<a href="#">Link to this property</a>

"waf\_block"

<a href="#">Link to this property</a>

"waf\_challenge"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_pages%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20identifier%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20custom_pages%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20custom_pages%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20custom_pages%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20custom_pages%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20custom_pages%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_on, description, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

preview\_target: optional string

<a href="#">Link to this property</a>

required\_tokens: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "default"or "customized"

The custom page state.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"customized"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL associated with the custom page.

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_pages%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get a custom page

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/$IDENTIFIER \
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
    "id": "basic_challenge",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Basic Challenge",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "preview_target": "block:basic-sec-captcha",
    "required_tokens": [
      "::CAPTCHA_BOX::"
    ],
    "state": "default",
    "url": "http://www.example.com"
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
    "id": "basic_challenge",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Basic Challenge",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "preview_target": "block:basic-sec-captcha",
    "required_tokens": [
      "::CAPTCHA_BOX::"
    ],
    "state": "default",
    "url": "http://www.example.com"
  }
}
```