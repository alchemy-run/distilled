---
title: Advertisement Status
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

[Prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Advertisement Status

##### [Get Advertisement Status](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/advertisement_status/methods/get)

Deprecated

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/status

##### [Update Prefix Dynamic Advertisement Status](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/advertisement_status/methods/edit)

Deprecated

PATCH/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/status

##### ModelsExpand Collapse

<details>

<summary>

AdvertisementStatusGetResponse object {advertised, advertised\_modified\_at }

</summary>

advertised: optional boolean

Advertisement status of the prefix. If <code>true</code>, the BGP route for the prefix is advertised to the Internet. If <code>false</code>, the BGP route is withdrawn.

<a href="#">Link to this property</a>

advertised\_modified\_at: optional string

Last time the advertisement status was changed. This field is only not ‘null’ if on demand is enabled.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.advertisement_status%20%3E%20(model)%20advertisement_status_get_response%20%3E%20(schema)>)

<details>

<summary>

AdvertisementStatusEditResponse object {advertised, advertised\_modified\_at }

</summary>

advertised: optional boolean

Advertisement status of the prefix. If <code>true</code>, the BGP route for the prefix is advertised to the Internet. If <code>false</code>, the BGP route is withdrawn.

<a href="#">Link to this property</a>

advertised\_modified\_at: optional string

Last time the advertisement status was changed. This field is only not ‘null’ if on demand is enabled.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.advertisement_status%20%3E%20(model)%20advertisement_status_edit_response%20%3E%20(schema)>)