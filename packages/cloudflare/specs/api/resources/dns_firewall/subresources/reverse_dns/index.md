---
title: Reverse DNS
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS Firewall](https://developers.cloudflare.com/api/resources/dns_firewall)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Reverse DNS

##### [Show DNS Firewall Cluster Reverse DNS](https://developers.cloudflare.com/api/resources/dns_firewall/subresources/reverse_dns/methods/get)

GET/accounts/{account\_id}/dns\_firewall/{dns\_firewall\_id}/reverse\_dns

##### [Update DNS Firewall Cluster Reverse DNS](https://developers.cloudflare.com/api/resources/dns_firewall/subresources/reverse_dns/methods/edit)

PATCH/accounts/{account\_id}/dns\_firewall/{dns\_firewall\_id}/reverse\_dns

##### ModelsExpand Collapse

<details>

<summary>

ReverseDNSGetResponse object {ptr }

</summary>

ptr: map\[string]

Map of cluster IP addresses to PTR record contents

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall.reverse_dns%20%3E%20(model)%20reverse_dns_get_response%20%3E%20(schema)>)

<details>

<summary>

ReverseDNSEditResponse object {ptr }

</summary>

ptr: map\[string]

Map of cluster IP addresses to PTR record contents

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall.reverse_dns%20%3E%20(model)%20reverse_dns_edit_response%20%3E%20(schema)>)