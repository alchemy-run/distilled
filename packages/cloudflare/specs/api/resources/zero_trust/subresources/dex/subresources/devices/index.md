---
title: Devices
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Devices

#### DevicesISPs

##### [List device ISPs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/devices/subresources/isps/methods/list)

GET/accounts/{account\_id}/dex/devices/{device\_id}/isps

##### ModelsExpand Collapse

<details>

<summary>

ISPs object {isps }

</summary>

<details>

<summary>

isps: array of object {test\_id, test\_result\_id, time\_start, ip }

</summary>

test\_id: string

The test that generated this result.

<a href="#">Link to this property</a>

test\_result\_id: string

The specific test result.

<a href="#">Link to this property</a>

time\_start: string

Timestamp of when the ISP was observed.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

ip: optional object {address, asn, aso, 4 more }

IP address information for the ISP hop. Fields marked as PII-gated (<code>name</code>, <code>address</code>, <code>netmask</code>, and all <code>location</code> sub-fields) will be returned as the literal string <code>"REDACTED"</code> for callers that do not have the PII permission. <code>asn</code>, <code>aso</code>, and <code>version</code> are always returned regardless of PII access.

</summary>

address: optional string

IP address. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

asn: optional number

Autonomous System Number.

<a href="#">Link to this property</a>

aso: optional string

Autonomous System Organization name.

<a href="#">Link to this property</a>

<details>

<summary>

location: optional object {city, country\_iso, state\_iso, zip }

Geographic location information. All fields are returned as the literal string <code>"REDACTED"</code> for callers that do not have the PII permission.

</summary>

city: optional string

City name. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

country\_iso: optional string

Country ISO code. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

state\_iso: optional string

State/province ISO code. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

zip: optional string

ZIP/postal code. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Named IP address (reverse DNS hostname when available). Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

netmask: optional string

Network mask. Returned as <code>"REDACTED"</code> without PII permission.

<a href="#">Link to this property</a>

version: optional number

IP version (<code>1</code> for IPv4, <code>2</code> for IPv6, <code>0</code> if unknown).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.devices.isps%20%3E%20(model)%20isps%20%3E%20(schema)>)