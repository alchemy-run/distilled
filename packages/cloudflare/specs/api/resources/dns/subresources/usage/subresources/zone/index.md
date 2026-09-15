---
title: Zone
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Usage](https://developers.cloudflare.com/api/resources/dns/subresources/usage)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Zone

##### [Get DNS Record Usage](https://developers.cloudflare.com/api/resources/dns/subresources/usage/subresources/zone/methods/get)

GET/zones/{zone\_id}/dns\_records/usage

##### ModelsExpand Collapse

<details>

<summary>

ZoneGetResponse object {record\_quota, record\_usage }

</summary>

record\_quota: number

Maximum number of DNS records allowed for the zone. Null if using account-level quota.

minimum0

<a href="#">Link to this property</a>

record\_usage: number

Current number of DNS records in the zone.

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.usage.zone%20%3E%20(model)%20zone_get_response%20%3E%20(schema)>)