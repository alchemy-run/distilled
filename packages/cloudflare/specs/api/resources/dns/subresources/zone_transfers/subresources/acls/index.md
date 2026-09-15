---
title: ACLs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Zone Transfers](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# ACLs

##### [List ACLs](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/acls/methods/list)

GET/accounts/{account\_id}/secondary\_dns/acls

##### [ACL Details](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/acls/methods/get)

GET/accounts/{account\_id}/secondary\_dns/acls/{acl\_id}

##### [Create ACL](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/acls/methods/create)

POST/accounts/{account\_id}/secondary\_dns/acls

##### [Update ACL](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/acls/methods/update)

PUT/accounts/{account\_id}/secondary\_dns/acls/{acl\_id}

##### [Delete ACL](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/acls/methods/delete)

DELETE/accounts/{account\_id}/secondary\_dns/acls/{acl\_id}

##### ModelsExpand Collapse

<details>

<summary>

ACL object {id, ip\_range, name }

</summary>

id: string

<a href="#">Link to this property</a>

ip\_range: string

Allowed IPv4/IPv6 address range of primary or secondary nameservers. This will be applied for the entire account. The IP range is used to allow additional NOTIFY IPs for secondary zones and IPs Cloudflare allows AXFR/IXFR requests from for primary zones. CIDRs are limited to a maximum of /24 for IPv4 and /64 for IPv6 respectively.

<a href="#">Link to this property</a>

name: string

The name of the acl.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.acls%20%3E%20(model)%20acl%20%3E%20(schema)>)

<details>

<summary>

ACLDeleteResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.acls%20%3E%20(model)%20acl_delete_response%20%3E%20(schema)>)