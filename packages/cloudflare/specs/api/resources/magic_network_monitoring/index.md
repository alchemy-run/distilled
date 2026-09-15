---
title: Magic Network Monitoring
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Magic Network Monitoring

#### Magic Network MonitoringVPC Flows

#### Magic Network MonitoringVPC FlowsTokens

##### [Generate authentication token for VPC flow logs export.](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/vpc_flows/subresources/tokens/methods/create)

POST/accounts/{account\_id}/mnm/vpc-flows/token

##### ModelsExpand Collapse

TokenCreateResponse = string

Authentication token to be used for VPC Flows export authentication.

[Link to this property](#)%20magic_network_monitoring.vpc_flows.tokens%20%3E%20(model)%20token_create_response%20%3E%20(schema)>)

#### Magic Network MonitoringConfigs

##### [List account configuration](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/methods/get)

GET/accounts/{account\_id}/mnm/config

##### [Create account configuration](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/methods/create)

POST/accounts/{account\_id}/mnm/config

##### [Update an entire account configuration](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/methods/update)

PUT/accounts/{account\_id}/mnm/config

##### [Update account configuration fields](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/methods/edit)

PATCH/accounts/{account\_id}/mnm/config

##### [Delete account configuration](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/methods/delete)

DELETE/accounts/{account\_id}/mnm/config

##### ModelsExpand Collapse

<details>

<summary>

Configuration object {default\_sampling, name, router\_ips, warp\_devices }

</summary>

default\_sampling: number

Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

minimum1

<a href="#">Link to this property</a>

name: string

The account name.

<a href="#">Link to this property</a>

router\_ips: array of string

<a href="#">Link to this property</a>

<details>

<summary>

warp\_devices: array of object {id, name, router\_ip }

</summary>

id: string

Unique identifier for the warp device.

<a href="#">Link to this property</a>

name: string

Name of the warp device.

<a href="#">Link to this property</a>

router\_ip: string

IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_network_monitoring.configs%20%3E%20(model)%20configuration%20%3E%20(schema)>)

#### Magic Network MonitoringConfigsFull

##### [List rules and account configuration](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/configs/subresources/full/methods/get)

GET/accounts/{account\_id}/mnm/config/full

#### Magic Network MonitoringRules

##### [List rules](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/rules/methods/list)

GET/accounts/{account\_id}/mnm/rules

##### [Get rule](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/rules/methods/get)

GET/accounts/{account\_id}/mnm/rules/{rule\_id}

##### [Create rules](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/rules/methods/create)

POST/accounts/{account\_id}/mnm/rules

##### [Update rules](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/rules/methods/update)

PUT/accounts/{account\_id}/mnm/rules

##### [Update rule](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/rules/methods/edit)

PATCH/accounts/{account\_id}/mnm/rules/{rule\_id}

##### [Delete rule](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/rules/methods/delete)

DELETE/accounts/{account\_id}/mnm/rules/{rule\_id}

##### ModelsExpand Collapse

<details>

<summary>

MagicNetworkMonitoringRule object {id, automatic\_advertisement, name, 8 more }

</summary>

id: string

The id of the rule. Must be unique.

<a href="#">Link to this property</a>

automatic\_advertisement: boolean

Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

<a href="#">Link to this property</a>

name: string

The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (\_), dash (-), period (.), and tilde (\~). You can’t have a space in the rule name. Max 256 characters.

<a href="#">Link to this property</a>

prefixes: array of string

<a href="#">Link to this property</a>

<details>

<summary>

type: "threshold"or "zscore"or "advanced\_ddos"

MNM rule type.

</summary>

One of the following:

"threshold"

<a href="#">Link to this property</a>

"zscore"

<a href="#">Link to this property</a>

"advanced\_ddos"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bandwidth\_threshold: optional number

The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

duration: optional "1m"or "5m"or "10m"or 5 more

The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values \[“1m”,“5m”,“10m”,“15m”,“20m”,“30m”,“45m”,“60m”].

</summary>

One of the following:

"1m"

<a href="#">Link to this property</a>

"5m"

<a href="#">Link to this property</a>

"10m"

<a href="#">Link to this property</a>

"15m"

<a href="#">Link to this property</a>

"20m"

<a href="#">Link to this property</a>

"30m"

<a href="#">Link to this property</a>

"45m"

<a href="#">Link to this property</a>

"60m"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

packet\_threshold: optional number

The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

prefix\_match: optional "exact"or "subnet"or "supernet"

Prefix match type to be applied for a prefix auto advertisement when using an advanced\_ddos rule.

</summary>

One of the following:

"exact"

<a href="#">Link to this property</a>

"subnet"

<a href="#">Link to this property</a>

"supernet"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zscore\_sensitivity: optional "low"or "medium"or "high"

Level of sensitivity set for zscore rules.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zscore\_target: optional "bits"or "packets"

Target of the zscore rule analysis.

</summary>

One of the following:

"bits"

<a href="#">Link to this property</a>

"packets"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(model)%20magic_network_monitoring_rule%20%3E%20(schema)>)

#### Magic Network MonitoringRulesAdvertisements

##### [Update advertisement for rule](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/rules/subresources/advertisements/methods/edit)

PATCH/accounts/{account\_id}/mnm/rules/{rule\_id}/advertisement

##### ModelsExpand Collapse

<details>

<summary>

Advertisement object {automatic\_advertisement }

</summary>

automatic\_advertisement: boolean

Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_network_monitoring.rules.advertisements%20%3E%20(model)%20advertisement%20%3E%20(schema)>)