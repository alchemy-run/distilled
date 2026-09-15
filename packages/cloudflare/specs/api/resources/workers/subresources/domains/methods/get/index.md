---
title: Get Domain
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Domains](https://developers.cloudflare.com/api/resources/workers/subresources/domains)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Domain

GET/accounts/{account\_id}/workers/domains/{domain\_id}

Gets information about a domain.

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

`Workers Scripts Write``Workers Scripts Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20workers.domains%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

domain\_id: string

ID of the domain.

[Link to this property](#)%20workers.domains%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20domain_id%20%3E%20(schema)>)

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

[Link to this property](#)%20workers.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20workers.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, cert\_id, environment, 4 more }

</summary>

id: string

Immutable ID of the domain.

<a href="#">Link to this property</a>

cert\_id: string

ID of the TLS certificate issued for the domain.

formatuuid

<a href="#">Link to this property</a>

Deprecatedenvironment: string

Worker environment associated with the domain.

<a href="#">Link to this property</a>

hostname: string

Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

<a href="#">Link to this property</a>

service: string

Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

<a href="#">Link to this property</a>

zone\_id: string

ID of the zone containing the domain hostname.

<a href="#">Link to this property</a>

zone\_name: string

Name of the zone containing the domain hostname.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20workers.domains%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Domain

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/domains/$DOMAIN_ID \
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
  "result": {
    "id": "dbe10b4bc17c295377eabd600e1787fd",
    "cert_id": "9fdf92c8-64c2-4a3d-b1af-e15304961145",
    "environment": "production",
    "hostname": "app.example.com",
    "service": "my-worker",
    "zone_id": "593c9c94de529bbbfaac7c53ced0447d",
    "zone_name": "example.com"
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
    "id": "dbe10b4bc17c295377eabd600e1787fd",
    "cert_id": "9fdf92c8-64c2-4a3d-b1af-e15304961145",
    "environment": "production",
    "hostname": "app.example.com",
    "service": "my-worker",
    "zone_id": "593c9c94de529bbbfaac7c53ced0447d",
    "zone_name": "example.com"
  },
  "success": true
}
```