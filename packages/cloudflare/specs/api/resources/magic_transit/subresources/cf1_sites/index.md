---
title: Cf1 Sites
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Cf1 Sites

##### [List CF1 Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/methods/list)

GET/accounts/{account\_id}/magic/cf1\_sites

##### [Get CF1 Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/methods/get)

GET/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}

##### [Create CF1 Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/methods/create)

POST/accounts/{account\_id}/magic/cf1\_sites

##### [Update CF1 Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/methods/update)

PATCH/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}

##### [Delete CF1 Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/methods/delete)

DELETE/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}

##### ModelsExpand Collapse

<details>

<summary>

Cf1Site object {name, id, created\_on, 3 more }

</summary>

name: string

A human-provided name describing the CF1 Site that should be unique within the account.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

A human-provided description of the CF1 Site.

<a href="#">Link to this property</a>

location: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.cf1_sites%20%3E%20(model)%20cf1_site_location%20%3E%20(schema)">Cf1SiteLocation</a> { lat, long, name }

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf1_sites%20%3E%20(model)%20cf1_site%20%3E%20(schema)>)

<details>

<summary>

Cf1SiteLocation object {lat, long, name }

</summary>

lat: optional number

Latitude of the CF1 Site.

formatfloat

<a href="#">Link to this property</a>

long: optional number

Longitude of the CF1 Site.

formatfloat

<a href="#">Link to this property</a>

name: optional string

Name of nearest town, city, or village.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf1_sites%20%3E%20(model)%20cf1_site_location%20%3E%20(schema)>)

#### Cf1 SitesRamps

##### [List CF1 Site Ramps](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/subresources/ramps/methods/list)

GET/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}/ramps

##### [Get CF1 Site Ramp](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/subresources/ramps/methods/get)

GET/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}/ramps/{ramp\_id}

##### [Create CF1 Site Ramps](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/subresources/ramps/methods/create)

POST/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}/ramps

##### [Delete CF1 Site Ramp](https://developers.cloudflare.com/api/resources/magic_transit/subresources/cf1_sites/subresources/ramps/methods/delete)

DELETE/accounts/{account\_id}/magic/cf1\_sites/{cf1\_site\_id}/ramps/{ramp\_id}

##### ModelsExpand Collapse

<details>

<summary>

Ramp object {id, created\_on, modified\_on, 8 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

formatdate-time

<a href="#">Link to this property</a>

name: string

A human-provided name describing the ramp that should be unique within the CF1 Site.

<a href="#">Link to this property</a>

type: <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.cf1_sites.ramps%20%3E%20(model)%20ramp_type%20%3E%20(schema)">RampType</a>

The type of network connection (ramp) linking a CF1 Site to Cloudflare’s network.

<a href="#">Link to this property</a>

description: optional string

A human-provided description of the ramp.

<a href="#">Link to this property</a>

<details>

<summary>

gre: optional object {managed\_by }

</summary>

managed\_by: optional string

URL reference to the source network resource that this ramp is managed by.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

gre\_interconnect: optional object {managed\_by }

</summary>

managed\_by: optional string

URL reference to the source network resource that this ramp is managed by.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ipsec: optional object {managed\_by }

</summary>

managed\_by: optional string

URL reference to the source network resource that this ramp is managed by.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mconn: optional object {managed\_by }

</summary>

managed\_by: optional string

URL reference to the source network resource that this ramp is managed by.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mpls\_interconnect: optional object {managed\_by }

</summary>

managed\_by: optional string

URL reference to the source network resource that this ramp is managed by.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf1_sites.ramps%20%3E%20(model)%20ramp%20%3E%20(schema)>)

<details>

<summary>

RampType = "gre"or "gre\_interconnect"or "mpls\_interconnect"or 2 more

The type of network connection (ramp) linking a CF1 Site to Cloudflare’s network.

</summary>

One of the following:

"gre"

<a href="#">Link to this property</a>

"gre\_interconnect"

<a href="#">Link to this property</a>

"mpls\_interconnect"

<a href="#">Link to this property</a>

"mconn"

<a href="#">Link to this property</a>

"ipsec"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.cf1_sites.ramps%20%3E%20(model)%20ramp_type%20%3E%20(schema)>)