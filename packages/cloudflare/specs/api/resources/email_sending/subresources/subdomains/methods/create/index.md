---
title: Create a sending subdomain
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Sending](https://developers.cloudflare.com/api/resources/email_sending)

[Subdomains](https://developers.cloudflare.com/api/resources/email_sending/subresources/subdomains)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a sending subdomain

POST/zones/{zone\_id}/email/sending/subdomains

Creates a new sending subdomain or re-enables sending on an existing subdomain that had it disabled. If zone-level Email Sending has not been enabled yet, the zone flag is automatically set when the entitlement is present. A leftmost wildcard such as `*.example.com` is accepted only for accounts with wildcard Email Sending enabled. Wildcard senders share the base domain’s DKIM signing identity and `cf-bounce.<base>` return path.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_sending.subdomains%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

The domain name within the zone. A wildcard is allowed only as the complete leftmost label (`*.example.com`) and requires the account wildcard Email Sending entitlement.

[Link to this property](#)%20email_sending.subdomains%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

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

[Link to this property](#)%20email_sending.subdomains%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_sending.subdomains%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_sending.subdomains%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {enabled, name, tag, 6 more }

</summary>

enabled: boolean

Whether Email Sending is enabled on this subdomain.

<a href="#">Link to this property</a>

name: string

The exact domain name or a leftmost wildcard such as <code>*.example.com</code>.

<a href="#">Link to this property</a>

tag: string

Sending subdomain identifier.

maxLength32

<a href="#">Link to this property</a>

created: optional string

The date and time the destination address has been created.

formatdate-time

<a href="#">Link to this property</a>

dkim\_selector: optional string

The DKIM selector used for email signing. Wildcard rows publish the selector and sign with <code>d=&lt;base&gt;</code>.

<a href="#">Link to this property</a>

drop\_suppressed\_recipients: optional boolean

Whether a send request that includes a recipient suppressed on this subdomain drops that recipient and still delivers to the rest, instead of failing the entire request.

<a href="#">Link to this property</a>

modified: optional string

The date and time the destination address was last modified.

formatdate-time

<a href="#">Link to this property</a>

preview\_enabled: optional boolean

Whether sent messages from this subdomain can be previewed in the activity log.

<a href="#">Link to this property</a>

return\_path\_domain: optional string

The return-path domain used for bounce handling. Wildcard rows use <code>cf-bounce.&lt;base&gt;</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.subdomains%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a sending subdomain

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/sending/subdomains \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "sub.example.com"
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
    "enabled": true,
    "name": "sub.example.com",
    "tag": "aabbccdd11223344aabbccdd11223344",
    "created": "2014-01-02T02:20:00Z",
    "dkim_selector": "cf-bounce",
    "drop_suppressed_recipients": false,
    "modified": "2014-01-02T02:20:00Z",
    "preview_enabled": true,
    "return_path_domain": "cf-bounce.sub.example.com"
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
    "enabled": true,
    "name": "sub.example.com",
    "tag": "aabbccdd11223344aabbccdd11223344",
    "created": "2014-01-02T02:20:00Z",
    "dkim_selector": "cf-bounce",
    "drop_suppressed_recipients": false,
    "modified": "2014-01-02T02:20:00Z",
    "preview_enabled": true,
    "return_path_domain": "cf-bounce.sub.example.com"
  }
}
```