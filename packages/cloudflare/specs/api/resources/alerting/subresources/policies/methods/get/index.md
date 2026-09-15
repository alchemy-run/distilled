---
title: Get a Notification policy
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Alerting](https://developers.cloudflare.com/api/resources/alerting)

[Policies](https://developers.cloudflare.com/api/resources/alerting/subresources/policies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a Notification policy

GET/accounts/{account\_id}/alerting/v3/policies/{policy\_id}

Get details for a single policy.

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

`Zero Trust: PII Read``Notifications Write``Notifications Read``Account Settings Write``Account Settings Read`

##### P ath ParametersExpand Collapse

account\_id: string

The account id

maxLength32

[Link to this property](#)%20alerting.policies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

policy\_id: string

The unique identifier of a notification policy

maxLength32

[Link to this property](#)%20alerting.policies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20policy_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

code: optional number

minimum1000

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.policies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

code: optional number

minimum1000

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.policies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful

[Link to this property](#)%20alerting.policies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/alerting#(resource)%20alerting.policies%20%3E%20(model)%20policy%20%3E%20(schema)">Policy</a> { id, alert\_interval, alert\_type, 7 more }

</summary>

id: optional string

The unique identifier of a notification policy

maxLength32

<a href="#">Link to this property</a>

alert\_interval: optional string

Optional specification of how often to re-alert from the same incident, not support on all alert types.

<a href="#">Link to this property</a>

<details>

<summary>

alert\_type: optional "abuse\_report\_alert"or "access\_custom\_certificate\_expiration\_type"or "advanced\_ddos\_attack\_l4\_alert"or 66 more

Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values.

</summary>

One of the following:

"abuse\_report\_alert"

<a href="#">Link to this property</a>

"access\_custom\_certificate\_expiration\_type"

<a href="#">Link to this property</a>

"advanced\_ddos\_attack\_l4\_alert"

<a href="#">Link to this property</a>

"advanced\_ddos\_attack\_l7\_alert"

<a href="#">Link to this property</a>

"advanced\_http\_alert\_error"

<a href="#">Link to this property</a>

"bgp\_hijack\_notification"

<a href="#">Link to this property</a>

"billing\_usage\_alert"

<a href="#">Link to this property</a>

"block\_notification\_block\_removed"

<a href="#">Link to this property</a>

"block\_notification\_new\_block"

<a href="#">Link to this property</a>

"block\_notification\_review\_rejected"

<a href="#">Link to this property</a>

"bot\_traffic\_basic\_alert"

<a href="#">Link to this property</a>

"brand\_protection\_alert"

<a href="#">Link to this property</a>

"brand\_protection\_digest"

<a href="#">Link to this property</a>

"clickhouse\_alert\_fw\_anomaly"

<a href="#">Link to this property</a>

"clickhouse\_alert\_fw\_ent\_anomaly"

<a href="#">Link to this property</a>

"cloudforce\_one\_request\_notification"

<a href="#">Link to this property</a>

"cni\_maintenance\_notification"

<a href="#">Link to this property</a>

"custom\_analytics"

<a href="#">Link to this property</a>

"custom\_bot\_detection\_alert"

<a href="#">Link to this property</a>

"custom\_ssl\_certificate\_event\_type"

<a href="#">Link to this property</a>

"dedicated\_ssl\_certificate\_event\_type"

<a href="#">Link to this property</a>

"device\_connectivity\_anomaly\_alert"

<a href="#">Link to this property</a>

"dos\_attack\_l4"

<a href="#">Link to this property</a>

"dos\_attack\_l7"

<a href="#">Link to this property</a>

"expiring\_service\_token\_alert"

<a href="#">Link to this property</a>

"failing\_logpush\_job\_disabled\_alert"

<a href="#">Link to this property</a>

"fbm\_auto\_advertisement"

<a href="#">Link to this property</a>

"fbm\_dosd\_attack"

<a href="#">Link to this property</a>

"fbm\_volumetric\_attack"

<a href="#">Link to this property</a>

"health\_check\_status\_notification"

<a href="#">Link to this property</a>

"hostname\_aop\_custom\_certificate\_expiration\_type"

<a href="#">Link to this property</a>

"http\_alert\_edge\_error"

<a href="#">Link to this property</a>

"http\_alert\_origin\_error"

<a href="#">Link to this property</a>

"image\_notification"

<a href="#">Link to this property</a>

"image\_resizing\_notification"

<a href="#">Link to this property</a>

"incident\_alert"

<a href="#">Link to this property</a>

"load\_balancing\_health\_alert"

<a href="#">Link to this property</a>

"load\_balancing\_pool\_enablement\_alert"

<a href="#">Link to this property</a>

"logo\_match\_alert"

<a href="#">Link to this property</a>

"magic\_tunnel\_health\_check\_event"

<a href="#">Link to this property</a>

"magic\_wan\_tunnel\_health"

<a href="#">Link to this property</a>

"maintenance\_event\_notification"

<a href="#">Link to this property</a>

"mtls\_certificate\_store\_certificate\_expiration\_type"

<a href="#">Link to this property</a>

"pages\_event\_alert"

<a href="#">Link to this property</a>

"radar\_notification"

<a href="#">Link to this property</a>

"real\_origin\_monitoring"

<a href="#">Link to this property</a>

"scriptmonitor\_alert\_new\_code\_change\_detections"

<a href="#">Link to this property</a>

"scriptmonitor\_alert\_new\_hosts"

<a href="#">Link to this property</a>

"scriptmonitor\_alert\_new\_malicious\_hosts"

<a href="#">Link to this property</a>

"scriptmonitor\_alert\_new\_malicious\_scripts"

<a href="#">Link to this property</a>

"scriptmonitor\_alert\_new\_malicious\_url"

<a href="#">Link to this property</a>

"scriptmonitor\_alert\_new\_max\_length\_resource\_url"

<a href="#">Link to this property</a>

"scriptmonitor\_alert\_new\_resources"

<a href="#">Link to this property</a>

"secondary\_dns\_all\_primaries\_failing"

<a href="#">Link to this property</a>

"secondary\_dns\_primaries\_failing"

<a href="#">Link to this property</a>

"secondary\_dns\_warning"

<a href="#">Link to this property</a>

"secondary\_dns\_zone\_successfully\_updated"

<a href="#">Link to this property</a>

"secondary\_dns\_zone\_validation\_warning"

<a href="#">Link to this property</a>

"security\_insights\_alert"

<a href="#">Link to this property</a>

"sentinel\_alert"

<a href="#">Link to this property</a>

"stream\_live\_notifications"

<a href="#">Link to this property</a>

"synthetic\_test\_latency\_alert"

<a href="#">Link to this property</a>

"synthetic\_test\_low\_availability\_alert"

<a href="#">Link to this property</a>

"traffic\_anomalies\_alert"

<a href="#">Link to this property</a>

"tunnel\_health\_event"

<a href="#">Link to this property</a>

"tunnel\_update\_event"

<a href="#">Link to this property</a>

"universal\_ssl\_event\_type"

<a href="#">Link to this property</a>

"web\_analytics\_metrics\_update"

<a href="#">Link to this property</a>

"zone\_aop\_custom\_certificate\_expiration\_type"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Optional description for the Notification policy.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether or not the Notification policy is enabled.

<a href="#">Link to this property</a>

<details>

<summary>

filters: optional <a href="https://developers.cloudflare.com/api/resources/alerting#(resource)%20alerting.policies%20%3E%20(model)%20policy_filter%20%3E%20(schema)">PolicyFilter</a> { actions, affected\_asns, affected\_components, 40 more }

Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for more details.

</summary>

actions: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

affected\_asns: optional array of string

Used for configuring radar\_notification

<a href="#">Link to this property</a>

affected\_components: optional array of string

Used for configuring incident\_alert

<a href="#">Link to this property</a>

affected\_locations: optional array of string

Used for configuring radar\_notification

<a href="#">Link to this property</a>

airport\_code: optional array of string

Used for configuring maintenance\_event\_notification

<a href="#">Link to this property</a>

alert\_trigger\_preferences: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

alert\_trigger\_preferences\_value: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

enabled: optional array of string

Used for configuring load\_balancing\_pool\_enablement\_alert

<a href="#">Link to this property</a>

environment: optional array of string

Used for configuring pages\_event\_alert

<a href="#">Link to this property</a>

event: optional array of string

Used for configuring pages\_event\_alert

<a href="#">Link to this property</a>

event\_source: optional array of string

Used for configuring load\_balancing\_health\_alert

<a href="#">Link to this property</a>

event\_type: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

group\_by: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

health\_check\_id: optional array of string

Used for configuring health\_check\_status\_notification

<a href="#">Link to this property</a>

<details>

<summary>

incident\_impact: optional array of "INCIDENT\_IMPACT\_NONE"or "INCIDENT\_IMPACT\_MINOR"or "INCIDENT\_IMPACT\_MAJOR"or "INCIDENT\_IMPACT\_CRITICAL"

Used for configuring incident\_alert

</summary>

One of the following:

"INCIDENT\_IMPACT\_NONE"

<a href="#">Link to this property</a>

"INCIDENT\_IMPACT\_MINOR"

<a href="#">Link to this property</a>

"INCIDENT\_IMPACT\_MAJOR"

<a href="#">Link to this property</a>

"INCIDENT\_IMPACT\_CRITICAL"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

input\_id: optional array of string

Used for configuring stream\_live\_notifications

<a href="#">Link to this property</a>

insight\_class: optional array of string

Used for configuring security\_insights\_alert

<a href="#">Link to this property</a>

limit: optional array of string

Used for configuring billing\_usage\_alert

<a href="#">Link to this property</a>

logo\_tag: optional array of string

Used for configuring logo\_match\_alert

<a href="#">Link to this property</a>

megabits\_per\_second: optional array of string

Used for configuring advanced\_ddos\_attack\_l4\_alert

<a href="#">Link to this property</a>

new\_health: optional array of string

Used for configuring load\_balancing\_health\_alert

<a href="#">Link to this property</a>

new\_status: optional array of string

Used for configuring tunnel\_health\_event

<a href="#">Link to this property</a>

packets\_per\_second: optional array of string

Used for configuring advanced\_ddos\_attack\_l4\_alert

<a href="#">Link to this property</a>

pool\_id: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

pop\_names: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

product: optional array of string

Used for configuring billing\_usage\_alert

<a href="#">Link to this property</a>

project\_id: optional array of string

Used for configuring pages\_event\_alert

<a href="#">Link to this property</a>

protocol: optional array of string

Used for configuring advanced\_ddos\_attack\_l4\_alert

<a href="#">Link to this property</a>

query\_tag: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

requests\_per\_second: optional array of string

Used for configuring advanced\_ddos\_attack\_l7\_alert

<a href="#">Link to this property</a>

selectors: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

services: optional array of string

Used for configuring clickhouse\_alert\_fw\_ent\_anomaly

<a href="#">Link to this property</a>

slo: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

status: optional array of string

Used for configuring health\_check\_status\_notification

<a href="#">Link to this property</a>

target\_hostname: optional array of string

Used for configuring advanced\_ddos\_attack\_l7\_alert

<a href="#">Link to this property</a>

target\_ip: optional array of string

Used for configuring advanced\_ddos\_attack\_l4\_alert

<a href="#">Link to this property</a>

target\_zone\_name: optional array of string

Used for configuring advanced\_ddos\_attack\_l7\_alert

<a href="#">Link to this property</a>

traffic\_exclusions: optional array of "security\_events"

Used for configuring traffic\_anomalies\_alert

<a href="#">Link to this property</a>

tunnel\_id: optional array of string

Used for configuring tunnel\_health\_event

<a href="#">Link to this property</a>

tunnel\_name: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

type: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

where: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

zones: optional array of string

Usage depends on specific alert type

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mechanisms: optional <a href="https://developers.cloudflare.com/api/resources/alerting#(resource)%20alerting.policies%20%3E%20(model)%20mechanism%20%3E%20(schema)">Mechanism</a> { email, pagerduty, webhooks }

List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.

</summary>

<details>

<summary>

email: optional array of object {id }

</summary>

id: optional string

The email address

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pagerduty: optional array of object {id }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhooks: optional array of object {id }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Name of the policy.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.policies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get a Notification policy

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/policies/$POLICY_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "0da2b59ef118439d8097bdfb215203c9",
    "alert_interval": "30m",
    "alert_type": "universal_ssl_event_type",
    "created": "2014-01-01T05:20:00.12345Z",
    "description": "Something describing the policy.",
    "enabled": true,
    "filters": {
      "actions": [
        "string"
      ],
      "affected_asns": [
        "string"
      ],
      "affected_components": [
        "string"
      ],
      "affected_locations": [
        "string"
      ],
      "airport_code": [
        "string"
      ],
      "alert_trigger_preferences": [
        "string"
      ],
      "alert_trigger_preferences_value": [
        "string"
      ],
      "enabled": [
        "string"
      ],
      "environment": [
        "string"
      ],
      "event": [
        "string"
      ],
      "event_source": [
        "string"
      ],
      "event_type": [
        "string"
      ],
      "group_by": [
        "string"
      ],
      "health_check_id": [
        "string"
      ],
      "incident_impact": [
        "INCIDENT_IMPACT_NONE"
      ],
      "input_id": [
        "string"
      ],
      "insight_class": [
        "string"
      ],
      "limit": [
        "string"
      ],
      "logo_tag": [
        "string"
      ],
      "megabits_per_second": [
        "string"
      ],
      "new_health": [
        "string"
      ],
      "new_status": [
        "string"
      ],
      "packets_per_second": [
        "string"
      ],
      "pool_id": [
        "string"
      ],
      "pop_names": [
        "string"
      ],
      "product": [
        "string"
      ],
      "project_id": [
        "string"
      ],
      "protocol": [
        "string"
      ],
      "query_tag": [
        "string"
      ],
      "requests_per_second": [
        "string"
      ],
      "selectors": [
        "string"
      ],
      "services": [
        "string"
      ],
      "slo": [
        "99.9"
      ],
      "status": [
        "string"
      ],
      "target_hostname": [
        "string"
      ],
      "target_ip": [
        "string"
      ],
      "target_zone_name": [
        "string"
      ],
      "traffic_exclusions": [
        "security_events"
      ],
      "tunnel_id": [
        "string"
      ],
      "tunnel_name": [
        "string"
      ],
      "type": [
        "string"
      ],
      "where": [
        "string"
      ],
      "zones": [
        "string"
      ]
    },
    "mechanisms": {
      "email": [
        {
          "id": "id"
        }
      ],
      "pagerduty": [
        {
          "id": "f174e90afafe4643bbbc4a0ed4fc8415"
        }
      ],
      "webhooks": [
        {
          "id": "f174e90afafe4643bbbc4a0ed4fc8415"
        }
      ]
    },
    "modified": "2014-01-01T05:20:00.12345Z",
    "name": "SSL Notification Event Policy"
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "0da2b59ef118439d8097bdfb215203c9",
    "alert_interval": "30m",
    "alert_type": "universal_ssl_event_type",
    "created": "2014-01-01T05:20:00.12345Z",
    "description": "Something describing the policy.",
    "enabled": true,
    "filters": {
      "actions": [
        "string"
      ],
      "affected_asns": [
        "string"
      ],
      "affected_components": [
        "string"
      ],
      "affected_locations": [
        "string"
      ],
      "airport_code": [
        "string"
      ],
      "alert_trigger_preferences": [
        "string"
      ],
      "alert_trigger_preferences_value": [
        "string"
      ],
      "enabled": [
        "string"
      ],
      "environment": [
        "string"
      ],
      "event": [
        "string"
      ],
      "event_source": [
        "string"
      ],
      "event_type": [
        "string"
      ],
      "group_by": [
        "string"
      ],
      "health_check_id": [
        "string"
      ],
      "incident_impact": [
        "INCIDENT_IMPACT_NONE"
      ],
      "input_id": [
        "string"
      ],
      "insight_class": [
        "string"
      ],
      "limit": [
        "string"
      ],
      "logo_tag": [
        "string"
      ],
      "megabits_per_second": [
        "string"
      ],
      "new_health": [
        "string"
      ],
      "new_status": [
        "string"
      ],
      "packets_per_second": [
        "string"
      ],
      "pool_id": [
        "string"
      ],
      "pop_names": [
        "string"
      ],
      "product": [
        "string"
      ],
      "project_id": [
        "string"
      ],
      "protocol": [
        "string"
      ],
      "query_tag": [
        "string"
      ],
      "requests_per_second": [
        "string"
      ],
      "selectors": [
        "string"
      ],
      "services": [
        "string"
      ],
      "slo": [
        "99.9"
      ],
      "status": [
        "string"
      ],
      "target_hostname": [
        "string"
      ],
      "target_ip": [
        "string"
      ],
      "target_zone_name": [
        "string"
      ],
      "traffic_exclusions": [
        "security_events"
      ],
      "tunnel_id": [
        "string"
      ],
      "tunnel_name": [
        "string"
      ],
      "type": [
        "string"
      ],
      "where": [
        "string"
      ],
      "zones": [
        "string"
      ]
    },
    "mechanisms": {
      "email": [
        {
          "id": "id"
        }
      ],
      "pagerduty": [
        {
          "id": "f174e90afafe4643bbbc4a0ed4fc8415"
        }
      ],
      "webhooks": [
        {
          "id": "f174e90afafe4643bbbc4a0ed4fc8415"
        }
      ]
    },
    "modified": "2014-01-01T05:20:00.12345Z",
    "name": "SSL Notification Event Policy"
  }
}
```