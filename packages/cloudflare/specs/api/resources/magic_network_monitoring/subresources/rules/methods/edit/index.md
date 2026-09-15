---
title: Update rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Network Monitoring](https://developers.cloudflare.com/api/resources/magic_network_monitoring)

[Rules](https://developers.cloudflare.com/api/resources/magic_network_monitoring/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update rule

PATCH/accounts/{account\_id}/mnm/rules/{rule\_id}

Update a network monitoring rule for account.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Magic Network Monitoring Admin``Magic Network Monitoring Config Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

rule\_id: string

The id of the rule. Must be unique.

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20rule_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

automatic\_advertisement: boolean

Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20automatic_advertisement%20%3E%20(schema)>)

name: string

The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (\_), dash (-), period (.), and tilde (\~). You can’t have a space in the rule name. Max 256 characters.

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

prefixes: array of string

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20prefixes%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20type%20%3E%20(schema)>)

bandwidth\_threshold: optional number

The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

minimum1

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20bandwidth_threshold%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20duration%20%3E%20(schema)>)

packet\_threshold: optional number

The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

minimum1

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20packet_threshold%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20prefix_match%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20zscore_sensitivity%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20zscore_target%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/magic_network_monitoring#(resource)%20magic_network_monitoring.rules%20%3E%20(model)%20magic_network_monitoring_rule%20%3E%20(schema)">MagicNetworkMonitoringRule</a> { id, automatic\_advertisement, name, 8 more }

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

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_network_monitoring.rules%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "automatic_advertisement": true,
          "name": "my_rule_1",
          "prefixes": [
            "203.0.113.1/32"
          ],
          "type": "zscore",
          "bandwidth_threshold": 1000,
          "packet_threshold": 10000,
          "prefix_match": "exact",
          "zscore_sensitivity": "high",
          "zscore_target": "bits"
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```