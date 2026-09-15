---
title: IPs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# IPs

##### [Cloudflare/JD Cloud IP Details](https://developers.cloudflare.com/api/resources/ips/methods/list)

GET/ips

##### ModelsExpand Collapse

<details>

<summary>

IPs = array of object {created\_at, ip }

The set of IPs on the Address Map.

</summary>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

ip: optional string

An IPv4 or IPv6 address.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ips%20%3E%20(model)%20ips%20%3E%20(schema)>)

<details>

<summary>

IPListResponse = object {etag, ipv4\_cidrs, ipv6\_cidrs } or object {etag, ipv4\_cidrs, ipv6\_cidrs, jdcloud\_cidrs }

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

[Link to this property](#)%20ips%20%3E%20(model)%20ip_list_response%20%3E%20(schema)>)