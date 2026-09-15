---
title: Get sending subdomain DNS records
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Sending](https://developers.cloudflare.com/api/resources/email_sending)

[Subdomains](https://developers.cloudflare.com/api/resources/email_sending/subresources/subdomains)

[DNS](https://developers.cloudflare.com/api/resources/email_sending/subresources/subdomains/subresources/dns)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get sending subdomain DNS records

GET/zones/{zone\_id}/email/sending/subdomains/{subdomain\_id}/dns

Returns the expected DNS records for a sending subdomain.

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

[Link to this property](#)%20email_sending.subdomains.dns%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

subdomain\_id: string

Sending subdomain identifier.

maxLength32

[Link to this property](#)%20email_sending.subdomains.dns%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20subdomain_id%20%3E%20(schema)>)

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

[Link to this property](#)%20email_sending.subdomains.dns%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_sending.subdomains.dns%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_sending.subdomains.dns%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/email_routing#(resource)%20email_routing.dns%20%3E%20(model)%20dns_record%20%3E%20(schema)">DNSRecord</a> { content, name, priority, 2 more }

</summary>

content: optional string

DNS record content.

<a href="#">Link to this property</a>

name: optional string

DNS record name (or @ for the zone apex).

maxLength255

<a href="#">Link to this property</a>

priority: optional number

Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.

maximum65535

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

ttl: optional numberor 1

Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for ‘automatic’.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for ‘automatic’.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "A"or "AAAA"or "CNAME"or 15 more

DNS record type.

</summary>

One of the following:

"A"

<a href="#">Link to this property</a>

"AAAA"

<a href="#">Link to this property</a>

"CNAME"

<a href="#">Link to this property</a>

"HTTPS"

<a href="#">Link to this property</a>

"TXT"

<a href="#">Link to this property</a>

"SRV"

<a href="#">Link to this property</a>

"LOC"

<a href="#">Link to this property</a>

"MX"

<a href="#">Link to this property</a>

"NS"

<a href="#">Link to this property</a>

"CERT"

<a href="#">Link to this property</a>

"DNSKEY"

<a href="#">Link to this property</a>

"DS"

<a href="#">Link to this property</a>

"NAPTR"

<a href="#">Link to this property</a>

"SMIMEA"

<a href="#">Link to this property</a>

"SSHFP"

<a href="#">Link to this property</a>

"SVCB"

<a href="#">Link to this property</a>

"TLSA"

<a href="#">Link to this property</a>

"URI"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.subdomains.dns%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.subdomains.dns%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get sending subdomain DNS records

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/sending/subdomains/$SUBDOMAIN_ID/dns \
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
  "result": [
    {
      "content": "route1.mx.cloudflare.net",
      "name": "example.com",
      "priority": 12,
      "ttl": 1,
      "type": "NS"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
  "result": [
    {
      "content": "route1.mx.cloudflare.net",
      "name": "example.com",
      "priority": 12,
      "ttl": 1,
      "type": "NS"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```