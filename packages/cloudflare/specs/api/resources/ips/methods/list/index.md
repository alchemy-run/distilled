---
title: Cloudflare/JD Cloud IP Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[IPs](https://developers.cloudflare.com/api/resources/ips)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Cloudflare/JD Cloud IP Details

GET/ips

Get IPs used on the Cloudflare/JD Cloud network, see https://www.cloudflare.com/ips for Cloudflare IPs or https://developers.cloudflare.com/china-network/reference/infrastructure/ for JD Cloud IPs.

##### Security

##### Q uery ParametersExpand Collapse

networks: optional string

Specified as `jdcloud` to list IPs used by JD Cloud data centers.

[Link to this property](#)%20ips%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20networks%20%3E%20(schema)>)

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

[Link to this property](#)%20ips%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20ips%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20ips%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {etag, ipv4\_cidrs, ipv6\_cidrs } or object {etag, ipv4\_cidrs, ipv6\_cidrs, jdcloud\_cidrs }

</summary>

One of the following:

<details>

<summary>

PublicIPIPs object {etag, ipv4\_cidrs, ipv6\_cidrs }

</summary>

etag: optional string

A digest of the IP data. Useful for determining if the data has changed.

<a href="#">Link to this property</a>

ipv4\_cidrs: optional array of string

List of Cloudflare IPv4 CIDR addresses.

<a href="#">Link to this property</a>

ipv6\_cidrs: optional array of string

List of Cloudflare IPv6 CIDR addresses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PublicIPIPsJDCloud object {etag, ipv4\_cidrs, ipv6\_cidrs, jdcloud\_cidrs }

</summary>

etag: optional string

A digest of the IP data. Useful for determining if the data has changed.

<a href="#">Link to this property</a>

ipv4\_cidrs: optional array of string

List of Cloudflare IPv4 CIDR addresses.

<a href="#">Link to this property</a>

ipv6\_cidrs: optional array of string

List of Cloudflare IPv6 CIDR addresses.

<a href="#">Link to this property</a>

jdcloud\_cidrs: optional array of string

List IPv4 and IPv6 CIDRs, only populated if <code>?networks=jdcloud</code> is used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ips%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Cloudflare/JD Cloud IP Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/ips
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
    "etag": "a8e453d9d129a3769407127936edfdb0",
    "ipv4_cidrs": [
      "199.27.128.0/21"
    ],
    "ipv6_cidrs": [
      "2400:cb00::/32"
    ]
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
    "etag": "a8e453d9d129a3769407127936edfdb0",
    "ipv4_cidrs": [
      "199.27.128.0/21"
    ],
    "ipv6_cidrs": [
      "2400:cb00::/32"
    ]
  }
}
```