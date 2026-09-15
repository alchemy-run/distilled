---
title: Get auth methods
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/applications)

[Auth Methods](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/applications/subresources/auth_methods)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get auth methods

GET/accounts/{account\_id}/one/applications/{application\_id}/auth-methods

Returns available auth methods for the specified vendor, including credential schema, instructions, and example payloads. Use this to understand what credentials are required before calling POST /v2/integrations.

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

[Link to this property](#)%20zero_trust.casb.applications.auth_methods%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

<details>

<summary>

application\_id: "ANTHROPIC"or "AWS"or "BITBUCKET"or 12 more

</summary>

One of the following:

"ANTHROPIC"

<a href="#">Link to this property</a>

"AWS"

<a href="#">Link to this property</a>

"BITBUCKET"

<a href="#">Link to this property</a>

"BOX"

<a href="#">Link to this property</a>

"CONFLUENCE"

<a href="#">Link to this property</a>

"DROPBOX"

<a href="#">Link to this property</a>

"GITHUB"

<a href="#">Link to this property</a>

"GOOGLE\_CLOUD\_PLATFORM"

<a href="#">Link to this property</a>

"GOOGLE\_WORKSPACE"

<a href="#">Link to this property</a>

"JIRA"

<a href="#">Link to this property</a>

"MICROSOFT\_INTERNAL"

<a href="#">Link to this property</a>

"OPENAI"

<a href="#">Link to this property</a>

"SALESFORCE"

<a href="#">Link to this property</a>

"SERVICENOW"

<a href="#">Link to this property</a>

"SLACK"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.applications.auth_methods%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20application_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

A page number within the paginated result set.

[Link to this property](#)%20zero_trust.casb.applications.auth_methods%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

page\_size: optional number

Number of results to return per page.

[Link to this property](#)%20zero_trust.casb.applications.auth_methods%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page_size%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

List of errors.

[Link to this property](#)%20zero_trust.casb.applications.auth_methods%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

List of messages.

[Link to this property](#)%20zero_trust.casb.applications.auth_methods%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, display\_name, human\_interaction\_required, 4 more }

List of items.

</summary>

id: string

Auth method identifier.

<a href="#">Link to this property</a>

display\_name: string

Human-readable auth method name.

<a href="#">Link to this property</a>

human\_interaction\_required: boolean

Whether setup requires human interaction or integration can be created purely using API (e.g., For OAuth can not be created without user interaction).

<a href="#">Link to this property</a>

<details>

<summary>

instructions: object {markdown }

Step-by-step instructions for obtaining credentials.

</summary>

markdown: string

Detailed instructions in markdown format.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

payload\_example: map\[unknown]

Example credentials payload with placeholder values.

<a href="#">Link to this property</a>

payload\_schema: map\[unknown]

JSON Schema for the credentials object in POST /v2/integrations request.

<a href="#">Link to this property</a>

redirect\_url: string

OAuth redirect URL for vendors requiring human interaction.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.applications.auth_methods%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, next, page, 3 more }

Pagination metadata.

</summary>

count: optional number

Number of items in current page.

<a href="#">Link to this property</a>

next: optional string

URL for next page.

formaturi

<a href="#">Link to this property</a>

page: optional number

Current page number.

<a href="#">Link to this property</a>

per\_page: optional number

Number of items per page.

<a href="#">Link to this property</a>

previous: optional string

URL for previous page.

formaturi

<a href="#">Link to this property</a>

total\_count: optional number

Total number of items.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.applications.auth_methods%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

Whether the request succeeded.

[Link to this property](#)%20zero_trust.casb.applications.auth_methods%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get auth methods

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/applications/$APPLICATION_ID/auth-methods \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "display_name": "API Key",
      "human_interaction_required": false,
      "id": "api_key",
      "instructions": {
        "markdown": "## Getting your API Key\n\n1. Log in to your admin console\n2. Navigate to Settings > API\n3. Generate a new API key"
      },
      "payload_example": {
        "api_key": "sk-xxxxxxxxxxxxxxxxxxxx"
      },
      "payload_schema": {
        "properties": {
          "api_key": {
            "description": "Your API key",
            "type": "string"
          }
        },
        "required": [
          "api_key"
        ],
        "type": "object"
      },
      "redirect_url": null
    }
  ],
  "result_info": {
    "count": 1,
    "next": null,
    "page": 1,
    "per_page": 10,
    "previous": null,
    "total_count": 1
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "display_name": "API Key",
      "human_interaction_required": false,
      "id": "api_key",
      "instructions": {
        "markdown": "## Getting your API Key\n\n1. Log in to your admin console\n2. Navigate to Settings > API\n3. Generate a new API key"
      },
      "payload_example": {
        "api_key": "sk-xxxxxxxxxxxxxxxxxxxx"
      },
      "payload_schema": {
        "properties": {
          "api_key": {
            "description": "Your API key",
            "type": "string"
          }
        },
        "required": [
          "api_key"
        ],
        "type": "object"
      },
      "redirect_url": null
    }
  ],
  "result_info": {
    "count": 1,
    "next": null,
    "page": 1,
    "per_page": 10,
    "previous": null,
    "total_count": 1
  },
  "success": true
}
```