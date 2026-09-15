---
title: Get a Bookmark application
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Bookmarks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/bookmarks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a Bookmark application

Deprecated

GET/accounts/{account\_id}/access/bookmarks/{bookmark\_id}

Fetches a single Bookmark application.

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

`Access: Apps and Policies Write``Access: Apps and Policies Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.access.bookmarks%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bookmark\_id: string

UUID.

maxLength36

[Link to this property](#)%20zero_trust.access.bookmarks%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20bookmark_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.access.bookmarks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.access.bookmarks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.access.bookmarks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.bookmarks%20%3E%20(model)%20bookmark%20%3E%20(schema)">Bookmark</a> { id, app\_launcher\_visible, domain, 2 more }

</summary>

id: optional string

The unique identifier for the Bookmark application.

<a href="#">Link to this property</a>

app\_launcher\_visible: optional boolean

Displays the application in the App Launcher.

<a href="#">Link to this property</a>

domain: optional string

The domain of the Bookmark application.

<a href="#">Link to this property</a>

logo\_url: optional string

The image URL for the logo shown in the App Launcher dashboard.

<a href="#">Link to this property</a>

name: optional string

The name of the Bookmark application.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.bookmarks%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get a Bookmark application

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/bookmarks/$BOOKMARK_ID \
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
    "id": "id",
    "app_launcher_visible": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "domain": "example.com",
    "logo_url": "https://www.cloudflare.com/img/logo-web-badges/cf-logo-on-white-bg.svg",
    "name": "My Website",
    "updated_at": "2014-01-01T05:20:00.12345Z"
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
    "id": "id",
    "app_launcher_visible": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "domain": "example.com",
    "logo_url": "https://www.cloudflare.com/img/logo-web-badges/cf-logo-on-white-bg.svg",
    "name": "My Website",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```