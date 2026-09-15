---
title: Lockdowns
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Lockdowns

##### [List Zone Lockdown rules](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns/methods/list)

GET/zones/{zone\_id}/firewall/lockdowns

##### [Get a Zone Lockdown rule](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns/methods/get)

GET/zones/{zone\_id}/firewall/lockdowns/{lock\_downs\_id}

##### [Create a Zone Lockdown rule](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns/methods/create)

POST/zones/{zone\_id}/firewall/lockdowns

##### [Update a Zone Lockdown rule](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns/methods/update)

PUT/zones/{zone\_id}/firewall/lockdowns/{lock\_downs\_id}

##### [Delete a Zone Lockdown rule](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns/methods/delete)

DELETE/zones/{zone\_id}/firewall/lockdowns/{lock\_downs\_id}

##### ModelsExpand Collapse

<details>

<summary>

Configuration = array of <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.lockdowns%20%3E%20(model)%20lockdown_ip_configuration%20%3E%20(schema)">LockdownIPConfiguration</a> { target, value } or <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.lockdowns%20%3E%20(model)%20lockdown_cidr_configuration%20%3E%20(schema)">LockdownCIDRConfiguration</a> { target, value }

A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of <code>ip</code> or <code>ip_range</code> configurations.

</summary>

One of the following:

<details>

<summary>

LockdownIPConfiguration object {target, value }

</summary>

target: optional "ip"

The configuration target. You must set the target to <code>ip</code> when specifying an IP address in the Zone Lockdown rule.

<a href="#">Link to this property</a>

value: optional string

The IP address to match. This address will be compared to the IP address of incoming requests.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

LockdownCIDRConfiguration object {target, value }

</summary>

target: optional "ip\_range"

The configuration target. You must set the target to <code>ip_range</code> when specifying an IP address range in the Zone Lockdown rule.

<a href="#">Link to this property</a>

value: optional string

The IP address range to match. You can only use prefix lengths <code>/16</code> and <code>/24</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20configuration%20%3E%20(schema)>)

<details>

<summary>

Lockdown object {id, configurations, created\_on, 4 more }

</summary>

id: string

The unique identifier of the Zone Lockdown rule.

maxLength32

<a href="#">Link to this property</a>

configurations: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.lockdowns%20%3E%20(model)%20configuration%20%3E%20(schema)">Configuration</a> { , }

A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of <code>ip</code> or <code>ip_range</code> configurations.

<a href="#">Link to this property</a>

created\_on: string

The timestamp of when the rule was created.

formatdate-time

<a href="#">Link to this property</a>

description: string

An informative summary of the rule.

maxLength1024

<a href="#">Link to this property</a>

modified\_on: string

The timestamp of when the rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

paused: boolean

When true, indicates that the rule is currently paused.

<a href="#">Link to this property</a>

urls: array of <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.lockdowns%20%3E%20(model)%20lockdown_url%20%3E%20(schema)">LockdownURL</a>

The URLs to include in the rule definition. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20lockdown%20%3E%20(schema)>)

<details>

<summary>

LockdownCIDRConfiguration object {target, value }

</summary>

target: optional "ip\_range"

The configuration target. You must set the target to <code>ip_range</code> when specifying an IP address range in the Zone Lockdown rule.

<a href="#">Link to this property</a>

value: optional string

The IP address range to match. You can only use prefix lengths <code>/16</code> and <code>/24</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20lockdown_cidr_configuration%20%3E%20(schema)>)

<details>

<summary>

LockdownIPConfiguration object {target, value }

</summary>

target: optional "ip"

The configuration target. You must set the target to <code>ip</code> when specifying an IP address in the Zone Lockdown rule.

<a href="#">Link to this property</a>

value: optional string

The IP address to match. This address will be compared to the IP address of incoming requests.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20lockdown_ip_configuration%20%3E%20(schema)>)

LockdownURL = string

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20lockdown_url%20%3E%20(schema)>)

<details>

<summary>

LockdownDeleteResponse object {id }

</summary>

id: optional string

The unique identifier of the Zone Lockdown rule.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20lockdown_delete_response%20%3E%20(schema)>)