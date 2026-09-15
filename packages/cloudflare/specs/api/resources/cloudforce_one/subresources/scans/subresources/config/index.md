---
title: Config
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Scans](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Config

##### [List Scan Configs](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/config/methods/list)

GET/accounts/{account\_id}/cloudforce-one/scans/config

##### [Create a new Scan Config](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/config/methods/create)

POST/accounts/{account\_id}/cloudforce-one/scans/config

##### [Update an existing Scan Config](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/config/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/scans/config/{config\_id}

##### [Delete a Scan Config](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/scans/subresources/config/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/scans/config/{config\_id}

##### ModelsExpand Collapse

<details>

<summary>

ConfigListResponse object {id, account\_id, frequency, 2 more }

</summary>

id: string

Defines the Config ID.

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

frequency: number

Defines the number of days between each scan (0 = One-off scan).

<a href="#">Link to this property</a>

ips: array of string

Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

<a href="#">Link to this property</a>

ports: array of string

Defines a list of ports to scan. Valid values are:“default”, “all”, or a comma-separated list of ports or range of ports (e.g. \[“1-80”, “443”]). “default” scans the 100 most commonly open ports.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(model)%20config_list_response%20%3E%20(schema)>)

<details>

<summary>

ConfigCreateResponse object {id, account\_id, frequency, 2 more }

</summary>

id: string

Defines the Config ID.

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

frequency: number

Defines the number of days between each scan (0 = One-off scan).

<a href="#">Link to this property</a>

ips: array of string

Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

<a href="#">Link to this property</a>

ports: array of string

Defines a list of ports to scan. Valid values are:“default”, “all”, or a comma-separated list of ports or range of ports (e.g. \[“1-80”, “443”]). “default” scans the 100 most commonly open ports.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(model)%20config_create_response%20%3E%20(schema)>)

<details>

<summary>

ConfigEditResponse object {id, account\_id, frequency, 2 more }

</summary>

id: string

Defines the Config ID.

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

frequency: number

Defines the number of days between each scan (0 = One-off scan).

<a href="#">Link to this property</a>

ips: array of string

Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

<a href="#">Link to this property</a>

ports: array of string

Defines a list of ports to scan. Valid values are:“default”, “all”, or a comma-separated list of ports or range of ports (e.g. \[“1-80”, “443”]). “default” scans the 100 most commonly open ports.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(model)%20config_edit_response%20%3E%20(schema)>)

ConfigDeleteResponse = unknown

[Link to this property](#)%20cloudforce_one.scans.config%20%3E%20(model)%20config_delete_response%20%3E%20(schema)>)