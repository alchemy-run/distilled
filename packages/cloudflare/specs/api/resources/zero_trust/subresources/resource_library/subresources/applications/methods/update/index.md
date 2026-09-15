---
title: Update application
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Resource Library](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library)

[Applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library/subresources/applications)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update application

PATCH/accounts/{account\_id}/resource-library/applications/{id}

Replace the network matchers for a custom application and create a new version.

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

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

id: number

Returns the application ID.

formatint64

maximum4294967295

minimum0

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

hostnames: optional array of string

Hostnames matched by the application.

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20hostnames%20%3E%20(schema)>)

ip\_subnets: optional array of string

IP subnets matched by the application.

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20ip_subnets%20%3E%20(schema)>)

port\_protocols: optional array of string

Port and protocol pairs matched by the application.

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20port_protocols%20%3E%20(schema)>)

support\_domains: optional array of string

Support domains matched by the application.

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20support_domains%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Indicates whether the API call was successful.

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, application\_confidence\_score, application\_source, 15 more }

</summary>

id: number

Returns the application ID.

formatint64

maximum4294967295

minimum0

<a href="#">Link to this property</a>

application\_confidence\_score: number

Confidence score for the application. Returns -1 when no score is available.

formatfloat

<a href="#">Link to this property</a>

application\_source: string

Returns the application source.

<a href="#">Link to this property</a>

application\_type: string

Returns the application type.

<a href="#">Link to this property</a>

application\_type\_description: string

Returns the application type description.

<a href="#">Link to this property</a>

category\_id: number

Returns the category ID.

formatint64

maximum4294967295

minimum1

<a href="#">Link to this property</a>

created\_at: string

Returns the application creation time.

<a href="#">Link to this property</a>

gen\_ai\_score: number

GenAI score for the application. Returns -1 when no score is available.

formatfloat

<a href="#">Link to this property</a>

hostnames: array of string

Hostnames matched by the application.

<a href="#">Link to this property</a>

human\_id: string

Returns the human readable ID.

<a href="#">Link to this property</a>

ip\_subnets: array of string

IP subnets matched by the application.

<a href="#">Link to this property</a>

name: string

Returns the application name.

<a href="#">Link to this property</a>

port\_protocols: array of string

Port and protocol pairs matched by the application.

<a href="#">Link to this property</a>

support\_domains: array of string

Support domains matched by the application.

<a href="#">Link to this property</a>

<details>

<summary>

supported: array of "GATEWAY"or "ACCESS"or "CASB"

Cloudflare products that support this application.

</summary>

One of the following:

"GATEWAY"

<a href="#">Link to this property</a>

"ACCESS"

<a href="#">Link to this property</a>

"CASB"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

Returns the application update time.

<a href="#">Link to this property</a>

version: string

Returns the application version.

<a href="#">Link to this property</a>

application\_score\_composition: optional unknown

Returns the score composition breakdown for the application.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.resource_library.applications%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update application

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/resource-library/applications/$ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hostnames": [
            "example.com",
            "foo.com"
          ],
          "ip_subnets": [
            "192.168.1.0/24",
            "10.0.0.0/8"
          ],
          "port_protocols": [
            "tcp/80",
            "tcp/443"
          ],
          "support_domains": [
            "example.com",
            "foo.com"
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
  "success": true,
  "result": {
    "id": 498,
    "application_confidence_score": 0.92,
    "application_source": "cloudflare",
    "application_type": "Human Resources",
    "application_type_description": "Applications used to manage employees and workforce tools.",
    "category_id": 12,
    "created_at": "2025-01-01T00:00:00Z",
    "gen_ai_score": 1.5,
    "hostnames": [
      "example.com",
      "foo.com"
    ],
    "human_id": "HR",
    "ip_subnets": [
      "192.168.1.0/24",
      "10.0.0.0/8"
    ],
    "name": "HR",
    "port_protocols": [
      "tcp/80",
      "tcp/443"
    ],
    "support_domains": [
      "example.com",
      "foo.com"
    ],
    "supported": [
      "GATEWAY",
      "ACCESS"
    ],
    "updated_at": "2025-01-01T00:00:00Z",
    "version": "2025-01-01T00:00:00Z",
    "application_score_composition": {
      "categories": [
        {
          "confidence": 0.95,
          "name": "Security"
        }
      ],
      "plan": "free"
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
    "id": 498,
    "application_confidence_score": 0.92,
    "application_source": "cloudflare",
    "application_type": "Human Resources",
    "application_type_description": "Applications used to manage employees and workforce tools.",
    "category_id": 12,
    "created_at": "2025-01-01T00:00:00Z",
    "gen_ai_score": 1.5,
    "hostnames": [
      "example.com",
      "foo.com"
    ],
    "human_id": "HR",
    "ip_subnets": [
      "192.168.1.0/24",
      "10.0.0.0/8"
    ],
    "name": "HR",
    "port_protocols": [
      "tcp/80",
      "tcp/443"
    ],
    "support_domains": [
      "example.com",
      "foo.com"
    ],
    "supported": [
      "GATEWAY",
      "ACCESS"
    ],
    "updated_at": "2025-01-01T00:00:00Z",
    "version": "2025-01-01T00:00:00Z",
    "application_score_composition": {
      "categories": [
        {
          "confidence": 0.95,
          "name": "Security"
        }
      ],
      "plan": "free"
    }
  }
}
```