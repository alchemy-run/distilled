---
title: Update Spectrum application configuration using a name for the origin
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Spectrum](https://developers.cloudflare.com/api/resources/spectrum)

[Apps](https://developers.cloudflare.com/api/resources/spectrum/subresources/apps)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Spectrum application configuration using a name for the origin

PUT/zones/{zone\_id}/spectrum/apps/{app\_id}

Updates a previously existing application’s configuration that uses a name for the origin.

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

`Zone Settings Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Zone identifier.

maxLength32

[Link to this property](#)%20spectrum.apps%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

app\_id: string

App identifier.

maxLength32

[Link to this property](#)%20spectrum.apps%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {id, created\_on, dns, 12 more } or object {id, created\_on, dns, 3 more }

</summary>

One of the following:

<details>

<summary>

SpectrumConfigAppConfig object {id, created\_on, dns, 12 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

</summary>

name: optional string

The name of the DNS record associated with the application.

formathostname

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "CNAME"or "ADDRESS"

The type of DNS record associated with the application.

</summary>

One of the following:

"CNAME"

<a href="#">Link to this property</a>

"ADDRESS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

<details>

<summary>

traffic\_type: "direct"or "http"or "https"

Determines how data travels from the edge to your origin. When set to “direct”, Spectrum will send traffic directly to your origin, and the application’s type is derived from the <code>protocol</code>. When set to “http” or “https”, Spectrum will apply Cloudflare’s HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

</summary>

One of the following:

"direct"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

"https"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

argo\_smart\_routing: optional boolean

Enables Argo Smart Routing for this application. Notes: Only available for TCP or UDP applications with traffic\_type set to “direct”.

<a href="#">Link to this property</a>

<details>

<summary>

edge\_ips: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20edge_ips%20%3E%20(schema)">EdgeIPs</a>

The anycast edge IP configuration for the hostname of this application.

</summary>

One of the following:

<details>

<summary>

Dynamic object {connectivity, type }

</summary>

<details>

<summary>

connectivity: optional "all"or "ipv4"or "ipv6"

The IP versions supported for inbound connections on Spectrum anycast IPs.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"ipv4"

<a href="#">Link to this property</a>

"ipv6"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional "dynamic"

The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Static object {ips, type }

</summary>

ips: optional array of string

The array of customer owned IPs we broadcast via anycast for this hostname and application.

<a href="#">Link to this property</a>

type: optional "static"

The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip\_firewall: optional boolean

Enables IP Access Rules for this application. Notes: Only available for TCP applications.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

<details>

<summary>

origin\_dns: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_dns%20%3E%20(schema)">OriginDNS</a> { name, ttl, type }

The name and type of DNS record for the Spectrum application.

</summary>

name: optional string

The name of the DNS record associated with the origin.

formathostname

<a href="#">Link to this property</a>

ttl: optional number

The TTL of our resolution of your DNS record in seconds.

minimum600

<a href="#">Link to this property</a>

<details>

<summary>

type: optional ""or "A"or "AAAA"or "SRV"

The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

</summary>

One of the following:

""

<a href="#">Link to this property</a>

"A"

<a href="#">Link to this property</a>

"AAAA"

<a href="#">Link to this property</a>

"SRV"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

origin\_port: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_port%20%3E%20(schema)">OriginPort</a>

The destination port at the origin. Only specified in conjunction with origin\_dns. May use an integer to specify a single origin port, for example <code>1000</code>, or a string to specify a range of origin ports, for example <code>"1000-2000"</code>. Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the “protocol” field.

maximum65535

minimum1

</summary>

One of the following:

number

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

proxy\_protocol: optional "off"or "v1"or "v2"or "simple"

Enables Proxy Protocol to the origin. Refer to <a href="https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/">Enable Proxy protocol</a> for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"v1"

<a href="#">Link to this property</a>

"v2"

<a href="#">Link to this property</a>

"simple"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls: optional "off"or "flexible"or "full"or "strict"

The type of TLS termination associated with the application.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"flexible"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SpectrumConfigPaygoAppConfig object {id, created\_on, dns, 3 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

</summary>

name: optional string

The name of the DNS record associated with the application.

formathostname

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "CNAME"or "ADDRESS"

The type of DNS record associated with the application.

</summary>

One of the following:

"CNAME"

<a href="#">Link to this property</a>

"ADDRESS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.apps%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20spectrum.apps%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20spectrum.apps%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20spectrum.apps%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_on, dns, 12 more } or object {id, created\_on, dns, 3 more }

</summary>

One of the following:

<details>

<summary>

SpectrumConfigAppConfig object {id, created\_on, dns, 12 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

</summary>

name: optional string

The name of the DNS record associated with the application.

formathostname

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "CNAME"or "ADDRESS"

The type of DNS record associated with the application.

</summary>

One of the following:

"CNAME"

<a href="#">Link to this property</a>

"ADDRESS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

<details>

<summary>

traffic\_type: "direct"or "http"or "https"

Determines how data travels from the edge to your origin. When set to “direct”, Spectrum will send traffic directly to your origin, and the application’s type is derived from the <code>protocol</code>. When set to “http” or “https”, Spectrum will apply Cloudflare’s HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

</summary>

One of the following:

"direct"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

"https"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

argo\_smart\_routing: optional boolean

Enables Argo Smart Routing for this application. Notes: Only available for TCP or UDP applications with traffic\_type set to “direct”.

<a href="#">Link to this property</a>

<details>

<summary>

edge\_ips: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20edge_ips%20%3E%20(schema)">EdgeIPs</a>

The anycast edge IP configuration for the hostname of this application.

</summary>

One of the following:

<details>

<summary>

Dynamic object {connectivity, type }

</summary>

<details>

<summary>

connectivity: optional "all"or "ipv4"or "ipv6"

The IP versions supported for inbound connections on Spectrum anycast IPs.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"ipv4"

<a href="#">Link to this property</a>

"ipv6"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional "dynamic"

The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Static object {ips, type }

</summary>

ips: optional array of string

The array of customer owned IPs we broadcast via anycast for this hostname and application.

<a href="#">Link to this property</a>

type: optional "static"

The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip\_firewall: optional boolean

Enables IP Access Rules for this application. Notes: Only available for TCP applications.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

<details>

<summary>

origin\_dns: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_dns%20%3E%20(schema)">OriginDNS</a> { name, ttl, type }

The name and type of DNS record for the Spectrum application.

</summary>

name: optional string

The name of the DNS record associated with the origin.

formathostname

<a href="#">Link to this property</a>

ttl: optional number

The TTL of our resolution of your DNS record in seconds.

minimum600

<a href="#">Link to this property</a>

<details>

<summary>

type: optional ""or "A"or "AAAA"or "SRV"

The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

</summary>

One of the following:

""

<a href="#">Link to this property</a>

"A"

<a href="#">Link to this property</a>

"AAAA"

<a href="#">Link to this property</a>

"SRV"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

origin\_port: optional <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20origin_port%20%3E%20(schema)">OriginPort</a>

The destination port at the origin. Only specified in conjunction with origin\_dns. May use an integer to specify a single origin port, for example <code>1000</code>, or a string to specify a range of origin ports, for example <code>"1000-2000"</code>. Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the “protocol” field.

maximum65535

minimum1

</summary>

One of the following:

number

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

proxy\_protocol: optional "off"or "v1"or "v2"or "simple"

Enables Proxy Protocol to the origin. Refer to <a href="https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/">Enable Proxy protocol</a> for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"v1"

<a href="#">Link to this property</a>

"v2"

<a href="#">Link to this property</a>

"simple"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls: optional "off"or "flexible"or "full"or "strict"

The type of TLS termination associated with the application.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"flexible"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SpectrumConfigPaygoAppConfig object {id, created\_on, dns, 3 more }

</summary>

id: string

App identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the Application was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dns: <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum%20%3E%20(model)%20dns%20%3E%20(schema)">DNS</a> { name, type }

The name and type of DNS record for the Spectrum application.

</summary>

name: optional string

The name of the DNS record associated with the application.

formathostname

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "CNAME"or "ADDRESS"

The type of DNS record associated with the application.

</summary>

One of the following:

"CNAME"

<a href="#">Link to this property</a>

"ADDRESS"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the Application was last modified.

formatdate-time

<a href="#">Link to this property</a>

protocol: string

The port configuration at Cloudflare’s edge. May specify a single port, for example <code>"tcp/1000"</code>, or a range of ports, for example <code>"tcp/1000-2000"</code>.

<a href="#">Link to this property</a>

origin\_direct: optional array of string

List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.apps%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update Spectrum application configuration using a name for the origin

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps/$APP_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "dns": {},
          "protocol": "tcp/22",
          "traffic_type": "direct",
          "argo_smart_routing": true,
          "origin_port": 22,
          "proxy_protocol": "off",
          "tls": "off"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "dns": {
      "name": "ssh.example.com",
      "type": "CNAME"
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "protocol": "tcp/22",
    "traffic_type": "direct",
    "argo_smart_routing": true,
    "edge_ips": {
      "connectivity": "all",
      "type": "dynamic"
    },
    "ip_firewall": false,
    "origin_direct": [
      "tcp://127.0.0.1:8080"
    ],
    "origin_dns": {
      "name": "origin.example.com",
      "ttl": 600,
      "type": ""
    },
    "origin_port": 22,
    "proxy_protocol": "off",
    "tls": "off",
    "virtual_network_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "dns": {
      "name": "ssh.example.com",
      "type": "CNAME"
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "protocol": "tcp/22",
    "traffic_type": "direct",
    "argo_smart_routing": true,
    "edge_ips": {
      "connectivity": "all",
      "type": "dynamic"
    },
    "ip_firewall": false,
    "origin_direct": [
      "tcp://127.0.0.1:8080"
    ],
    "origin_dns": {
      "name": "origin.example.com",
      "ttl": 600,
      "type": ""
    },
    "origin_port": 22,
    "proxy_protocol": "off",
    "tls": "off",
    "virtual_network_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```