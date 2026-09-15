---
title: Export Resources
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Cloud Networking](https://developers.cloudflare.com/api/resources/magic_cloud_networking)

[Resources](https://developers.cloudflare.com/api/resources/magic_cloud_networking/subresources/resources)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Export Resources

GET/accounts/{account\_id}/magic/cloud/resources/export

Export resources in the Resource Catalog as a JSON file (Closed Beta).

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Magic WAN Write``Magic WAN Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

desc: optional boolean

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20desc%20%3E%20(schema)>)

order\_by: optional string

One of \[“id”, “resource\_type”, “region”].

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

provider\_id: optional string

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20provider_id%20%3E%20(schema)>)

region: optional string

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20region%20%3E%20(schema)>)

resource\_group: optional string

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20resource_group%20%3E%20(schema)>)

resource\_id: optional array of string

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20resource_id%20%3E%20(schema)>)

<details>

<summary>

resource\_type: optional array of "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

</summary>

One of the following:

"aws\_customer\_gateway"

<a href="#">Link to this property</a>

"aws\_egress\_only\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_internet\_gateway"

<a href="#">Link to this property</a>

"aws\_instance"

<a href="#">Link to this property</a>

"aws\_network\_interface"

<a href="#">Link to this property</a>

"aws\_route"

<a href="#">Link to this property</a>

"aws\_route\_table"

<a href="#">Link to this property</a>

"aws\_route\_table\_association"

<a href="#">Link to this property</a>

"aws\_subnet"

<a href="#">Link to this property</a>

"aws\_vpc"

<a href="#">Link to this property</a>

"aws\_vpc\_ipv4\_cidr\_block\_association"

<a href="#">Link to this property</a>

"aws\_vpn\_connection"

<a href="#">Link to this property</a>

"aws\_vpn\_connection\_route"

<a href="#">Link to this property</a>

"aws\_vpn\_gateway"

<a href="#">Link to this property</a>

"aws\_security\_group"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_ingress\_rule"

<a href="#">Link to this property</a>

"aws\_vpc\_security\_group\_egress\_rule"

<a href="#">Link to this property</a>

"aws\_ec2\_managed\_prefix\_list"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_prefix\_list\_reference"

<a href="#">Link to this property</a>

"aws\_ec2\_transit\_gateway\_vpc\_attachment"

<a href="#">Link to this property</a>

"azurerm\_application\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_lb"

<a href="#">Link to this property</a>

"azurerm\_lb\_backend\_address\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_pool"

<a href="#">Link to this property</a>

"azurerm\_lb\_nat\_rule"

<a href="#">Link to this property</a>

"azurerm\_lb\_rule"

<a href="#">Link to this property</a>

"azurerm\_local\_network\_gateway"

<a href="#">Link to this property</a>

"azurerm\_network\_interface"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_application\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_backend\_address\_pool\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_interface\_security\_group\_association"

<a href="#">Link to this property</a>

"azurerm\_network\_security\_group"

<a href="#">Link to this property</a>

"azurerm\_public\_ip"

<a href="#">Link to this property</a>

"azurerm\_route"

<a href="#">Link to this property</a>

"azurerm\_route\_table"

<a href="#">Link to this property</a>

"azurerm\_subnet"

<a href="#">Link to this property</a>

"azurerm\_subnet\_route\_table\_association"

<a href="#">Link to this property</a>

"azurerm\_virtual\_machine"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway\_connection"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network"

<a href="#">Link to this property</a>

"azurerm\_virtual\_network\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_network"

<a href="#">Link to this property</a>

"google\_compute\_subnetwork"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_vpn\_tunnel"

<a href="#">Link to this property</a>

"google\_compute\_route"

<a href="#">Link to this property</a>

"google\_compute\_address"

<a href="#">Link to this property</a>

"google\_compute\_global\_address"

<a href="#">Link to this property</a>

"google\_compute\_router"

<a href="#">Link to this property</a>

"google\_compute\_interconnect\_attachment"

<a href="#">Link to this property</a>

"google\_compute\_ha\_vpn\_gateway"

<a href="#">Link to this property</a>

"google\_compute\_forwarding\_rule"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy"

<a href="#">Link to this property</a>

"google\_compute\_network\_firewall\_policy\_rule"

<a href="#">Link to this property</a>

"cloudflare\_static\_route"

<a href="#">Link to this property</a>

"cloudflare\_ipsec\_tunnel"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20resource_type%20%3E%20(schema)>)

search: optional array of string

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

v2: optional boolean

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20v2%20%3E%20(schema)>)

### Export Resources

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/resources/export \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples