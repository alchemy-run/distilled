---
title: Get tenant
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Tenants](https://developers.cloudflare.com/api/resources/tenants)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get tenant

GET/tenants/{tenant\_id}

Retrieves a Tenant by Tenant ID.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

tenant\_id: string

[Link to this property](#)%20tenants%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20tenant_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20tenants%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20tenants%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/tenants#(resource)%20tenants%20%3E%20(model)%20tenant%20%3E%20(schema)">Tenant</a> { cdate, edate, tenant\_contacts, 9 more }

</summary>

cdate: string

formatdate-time

<a href="#">Link to this property</a>

edate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

tenant\_contacts: object {email, website }

</summary>

email: optional string

<a href="#">Link to this property</a>

website: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tenant\_labels: array of string

<a href="#">Link to this property</a>

<details>

<summary>

tenant\_metadata: object {dns }

</summary>

<details>

<summary>

dns: optional object {ns\_pool }

</summary>

<details>

<summary>

ns\_pool: object {primary, secondary }

</summary>

primary: optional string

<a href="#">Link to this property</a>

secondary: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tenant\_name: string

<a href="#">Link to this property</a>

tenant\_network: unknown

<a href="#">Link to this property</a>

tenant\_status: string

<a href="#">Link to this property</a>

tenant\_tag: string

<a href="#">Link to this property</a>

tenant\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

tenant\_units: array of object {unit\_memberships, unit\_metadata, unit\_name, 2 more }

</summary>

unit\_memberships: array of unknown

<a href="#">Link to this property</a>

unit\_metadata: unknown

<a href="#">Link to this property</a>

unit\_name: string

<a href="#">Link to this property</a>

unit\_status: string

<a href="#">Link to this property</a>

unit\_tag: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

customer\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20tenants%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20tenants%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get tenant

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/tenants/$TENANT_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [],
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
    "cdate": "2019-12-27T18:11:19.117Z",
    "edate": "2019-12-27T18:11:19.117Z",
    "tenant_contacts": {
      "email": "email",
      "website": "website"
    },
    "tenant_labels": [
      "string"
    ],
    "tenant_metadata": {
      "dns": {
        "ns_pool": {
          "primary": "primary",
          "secondary": "secondary"
        }
      }
    },
    "tenant_name": "tenant_name",
    "tenant_network": {},
    "tenant_status": "tenant_status",
    "tenant_tag": "tenant_tag",
    "tenant_type": "tenant_type",
    "tenant_units": [
      {
        "unit_memberships": [
          {}
        ],
        "unit_metadata": {},
        "unit_name": "unit_name",
        "unit_status": "unit_status",
        "unit_tag": "unit_tag"
      }
    ],
    "customer_id": "customer_id"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
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
    "cdate": "2019-12-27T18:11:19.117Z",
    "edate": "2019-12-27T18:11:19.117Z",
    "tenant_contacts": {
      "email": "email",
      "website": "website"
    },
    "tenant_labels": [
      "string"
    ],
    "tenant_metadata": {
      "dns": {
        "ns_pool": {
          "primary": "primary",
          "secondary": "secondary"
        }
      }
    },
    "tenant_name": "tenant_name",
    "tenant_network": {},
    "tenant_status": "tenant_status",
    "tenant_tag": "tenant_tag",
    "tenant_type": "tenant_type",
    "tenant_units": [
      {
        "unit_memberships": [
          {}
        ],
        "unit_metadata": {},
        "unit_name": "unit_name",
        "unit_status": "unit_status",
        "unit_tag": "unit_tag"
      }
    ],
    "customer_id": "customer_id"
  },
  "success": true
}
```