---
title: Get Priority Intelligence Requirement Quota
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Requests](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests)

[Priority](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/requests/subresources/priority)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Priority Intelligence Requirement Quota

GET/accounts/{account\_id}/cloudforce-one/requests/priority/quota

Retrieves quota usage for Cloudforce One priority requests.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20quota%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20quota%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20quota%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20quota%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/cloudforce_one#(resource)%20cloudforce_one.requests%20%3E%20(model)%20quota%20%3E%20(schema)">Quota</a> { anniversary\_date, quarter\_anniversary\_date, quota, remaining }

</summary>

anniversary\_date: optional string

Anniversary date is when annual quota limit is refreshed.

formatdate-time

<a href="#">Link to this property</a>

quarter\_anniversary\_date: optional string

Quarter anniversary date is when quota limit is refreshed each quarter.

formatdate-time

<a href="#">Link to this property</a>

quota: optional number

Tokens for the quarter.

<a href="#">Link to this property</a>

remaining: optional number

Tokens remaining for the quarter.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.requests.priority%20%3E%20(method)%20quota%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Priority Intelligence Requirement Quota

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/priority/quota \
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
    "anniversary_date": "2022-04-01T00:00:00Z",
    "quarter_anniversary_date": "2022-04-01T00:00:00Z",
    "quota": 120,
    "remaining": 64
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
    "anniversary_date": "2022-04-01T00:00:00Z",
    "quarter_anniversary_date": "2022-04-01T00:00:00Z",
    "quota": 120,
    "remaining": 64
  }
}
```