---
title: Resources
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Cloud Networking](https://developers.cloudflare.com/api/resources/magic_cloud_networking)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Resources

##### [List Resources](https://developers.cloudflare.com/api/resources/magic_cloud_networking/subresources/resources/methods/list)

GET/accounts/{account\_id}/magic/cloud/resources

##### [Read Resource](https://developers.cloudflare.com/api/resources/magic_cloud_networking/subresources/resources/methods/get)

GET/accounts/{account\_id}/magic/cloud/resources/{resource\_id}

##### [Export Resources](https://developers.cloudflare.com/api/resources/magic_cloud_networking/subresources/resources/methods/export)

GET/accounts/{account\_id}/magic/cloud/resources/export

##### [Preview Rego Query](https://developers.cloudflare.com/api/resources/magic_cloud_networking/subresources/resources/methods/policy_preview)

POST/accounts/{account\_id}/magic/cloud/resources/policy-preview

##### ModelsExpand Collapse

<details>

<summary>

ResourceListResponse object {id, account\_id, cloud\_type, 18 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

config: map\[unknown]

<a href="#">Link to this property</a>

deployment\_provider: string

formatuuid

<a href="#">Link to this property</a>

managed: boolean

<a href="#">Link to this property</a>

<details>

<summary>

monthly\_cost\_estimate: object {currency, monthly\_cost }

</summary>

currency: string

<a href="#">Link to this property</a>

monthly\_cost: number

formatdouble

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

native\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

observations: map\[object {first\_observed\_at, last\_observed\_at, provider\_id, resource\_id } ]

</summary>

first\_observed\_at: string

<a href="#">Link to this property</a>

last\_observed\_at: string

<a href="#">Link to this property</a>

provider\_id: string

formatuuid

<a href="#">Link to this property</a>

resource\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

provider\_ids: array of string

<a href="#">Link to this property</a>

provider\_names\_by\_id: map\[string]

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

resource\_group: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

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

<a href="#">Link to this property</a>

<details>

<summary>

sections: array of object {hidden\_items, name, visible\_items, help\_text }

</summary>

<details>

<summary>

hidden\_items: array of object {helpText, name, value }

</summary>

helpText: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {item\_type, string } or object {item\_type, yaml } or object {item\_type, yaml\_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlItem object {item\_type, yaml }

</summary>

item\_type: string

<a href="#">Link to this property</a>

yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlDiffItem object {item\_type, yaml\_diff }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

yaml\_diff: object {diff, left\_description, left\_yaml, 2 more }

</summary>

diff: string

<a href="#">Link to this property</a>

left\_description: string

<a href="#">Link to this property</a>

left\_yaml: string

<a href="#">Link to this property</a>

right\_description: string

<a href="#">Link to this property</a>

right\_yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

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

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnListItem object {item\_type, list }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

list: array of object {item\_type, string } or object {item\_type, resource\_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

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

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

visible\_items: array of object {helpText, name, value }

</summary>

helpText: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {item\_type, string } or object {item\_type, yaml } or object {item\_type, yaml\_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlItem object {item\_type, yaml }

</summary>

item\_type: string

<a href="#">Link to this property</a>

yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlDiffItem object {item\_type, yaml\_diff }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

yaml\_diff: object {diff, left\_description, left\_yaml, 2 more }

</summary>

diff: string

<a href="#">Link to this property</a>

left\_description: string

<a href="#">Link to this property</a>

left\_yaml: string

<a href="#">Link to this property</a>

right\_description: string

<a href="#">Link to this property</a>

right\_yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

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

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnListItem object {item\_type, list }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

list: array of object {item\_type, string } or object {item\_type, resource\_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

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

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

help\_text: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

state: map\[unknown]

<a href="#">Link to this property</a>

tags: map\[string]

<a href="#">Link to this property</a>

updated\_at: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

<details>

<summary>

managed\_by: optional array of object {id, client\_type, name }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

client\_type: "MAGIC\_WAN\_CLOUD\_ONRAMP"

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(model)%20resource_list_response%20%3E%20(schema)>)

<details>

<summary>

ResourceGetResponse object {id, account\_id, cloud\_type, 18 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

config: map\[unknown]

<a href="#">Link to this property</a>

deployment\_provider: string

formatuuid

<a href="#">Link to this property</a>

managed: boolean

<a href="#">Link to this property</a>

<details>

<summary>

monthly\_cost\_estimate: object {currency, monthly\_cost }

</summary>

currency: string

<a href="#">Link to this property</a>

monthly\_cost: number

formatdouble

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

native\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

observations: map\[object {first\_observed\_at, last\_observed\_at, provider\_id, resource\_id } ]

</summary>

first\_observed\_at: string

<a href="#">Link to this property</a>

last\_observed\_at: string

<a href="#">Link to this property</a>

provider\_id: string

formatuuid

<a href="#">Link to this property</a>

resource\_id: string

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

provider\_ids: array of string

<a href="#">Link to this property</a>

provider\_names\_by\_id: map\[string]

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

resource\_group: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

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

<a href="#">Link to this property</a>

<details>

<summary>

sections: array of object {hidden\_items, name, visible\_items, help\_text }

</summary>

<details>

<summary>

hidden\_items: array of object {helpText, name, value }

</summary>

helpText: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {item\_type, string } or object {item\_type, yaml } or object {item\_type, yaml\_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlItem object {item\_type, yaml }

</summary>

item\_type: string

<a href="#">Link to this property</a>

yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlDiffItem object {item\_type, yaml\_diff }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

yaml\_diff: object {diff, left\_description, left\_yaml, 2 more }

</summary>

diff: string

<a href="#">Link to this property</a>

left\_description: string

<a href="#">Link to this property</a>

left\_yaml: string

<a href="#">Link to this property</a>

right\_description: string

<a href="#">Link to this property</a>

right\_yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

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

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnListItem object {item\_type, list }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

list: array of object {item\_type, string } or object {item\_type, resource\_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

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

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

visible\_items: array of object {helpText, name, value }

</summary>

helpText: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {item\_type, string } or object {item\_type, yaml } or object {item\_type, yaml\_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlItem object {item\_type, yaml }

</summary>

item\_type: string

<a href="#">Link to this property</a>

yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnYamlDiffItem object {item\_type, yaml\_diff }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

yaml\_diff: object {diff, left\_description, left\_yaml, 2 more }

</summary>

diff: string

<a href="#">Link to this property</a>

left\_description: string

<a href="#">Link to this property</a>

left\_yaml: string

<a href="#">Link to this property</a>

right\_description: string

<a href="#">Link to this property</a>

right\_yaml: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

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

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnListItem object {item\_type, list }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

list: array of object {item\_type, string } or object {item\_type, resource\_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object {item\_type, string }

</summary>

item\_type: string

<a href="#">Link to this property</a>

string: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

McnResourcePreviewItem object {item\_type, resource\_preview }

</summary>

item\_type: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_preview: object {id, cloud\_type, detail, 3 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

cloud\_type: "AWS"or "AZURE"or "GOOGLE"or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"AZURE"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"CLOUDFLARE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

detail: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "aws\_customer\_gateway"or "aws\_egress\_only\_internet\_gateway"or "aws\_internet\_gateway"or 54 more

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

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

help\_text: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

state: map\[unknown]

<a href="#">Link to this property</a>

tags: map\[string]

<a href="#">Link to this property</a>

updated\_at: string

<a href="#">Link to this property</a>

url: string

<a href="#">Link to this property</a>

<details>

<summary>

managed\_by: optional array of object {id, client\_type, name }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

client\_type: "MAGIC\_WAN\_CLOUD\_ONRAMP"

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(model)%20resource_get_response%20%3E%20(schema)>)

ResourcePolicyPreviewResponse = string

[Link to this property](#)%20magic_cloud_networking.resources%20%3E%20(model)%20resource_policy_preview_response%20%3E%20(schema)>)