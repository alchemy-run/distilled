---
title: TSIGs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Zone Transfers](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# TSIGs

##### [List TSIGs](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/tsigs/methods/list)

GET/accounts/{account\_id}/secondary\_dns/tsigs

##### [TSIG Details](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/tsigs/methods/get)

GET/accounts/{account\_id}/secondary\_dns/tsigs/{tsig\_id}

##### [Create TSIG](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/tsigs/methods/create)

POST/accounts/{account\_id}/secondary\_dns/tsigs

##### [Update TSIG](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/tsigs/methods/update)

PUT/accounts/{account\_id}/secondary\_dns/tsigs/{tsig\_id}

##### [Delete TSIG](https://developers.cloudflare.com/api/resources/dns/subresources/zone_transfers/subresources/tsigs/methods/delete)

DELETE/accounts/{account\_id}/secondary\_dns/tsigs/{tsig\_id}

##### ModelsExpand Collapse

<details>

<summary>

TSIG object {id, algo, name, secret }

</summary>

id: string

<a href="#">Link to this property</a>

algo: string

TSIG algorithm.

<a href="#">Link to this property</a>

name: string

TSIG key name.

<a href="#">Link to this property</a>

secret: string

TSIG secret.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.tsigs%20%3E%20(model)%20tsig%20%3E%20(schema)>)

<details>

<summary>

TSIGDeleteResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.zone_transfers.tsigs%20%3E%20(model)%20tsig_delete_response%20%3E%20(schema)>)