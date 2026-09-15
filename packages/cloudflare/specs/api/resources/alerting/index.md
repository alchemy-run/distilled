---
title: Alerting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Alerting

#### AlertingAvailable Alerts

##### [Get Alert Types](https://developers.cloudflare.com/api/resources/alerting/subresources/available_alerts/methods/list)

GET/accounts/{account\_id}/alerting/v3/available\_alerts

##### ModelsExpand Collapse

<details>

<summary>

AvailableAlertListResponse = map\[array of object {description, display\_name, filter\_options, type } ]

</summary>

description: optional string

Describes the alert type.

<a href="#">Link to this property</a>

display\_name: optional string

Alert type name.

<a href="#">Link to this property</a>

filter\_options: optional array of unknown

Format of additional configuration options (filters) for the alert type. Data type of filters during policy creation: Array of strings.

<a href="#">Link to this property</a>

type: optional string

Use this value when creating and updating a notification policy.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.available_alerts%20%3E%20(model)%20available_alert_list_response%20%3E%20(schema)>)

#### AlertingDestinations

#### AlertingDestinationsEligible

##### [Get delivery mechanism eligibility](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/eligible/methods/get)

GET/accounts/{account\_id}/alerting/v3/destinations/eligible

##### ModelsExpand Collapse

<details>

<summary>

EligibleGetResponse = map\[array of object {eligible, ready, type } ]

</summary>

eligible: optional boolean

Determines whether or not the account is eligible for the delivery mechanism.

<a href="#">Link to this property</a>

ready: optional boolean

Beta flag. Users can create a policy with a mechanism that is not ready, but we cannot guarantee successful delivery of notifications.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "email"or "pagerduty"or "webhook"

Determines type of delivery mechanism.

</summary>

One of the following:

"email"

<a href="#">Link to this property</a>

"pagerduty"

<a href="#">Link to this property</a>

"webhook"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.eligible%20%3E%20(model)%20eligible_get_response%20%3E%20(schema)>)

#### AlertingDestinationsPagerduty

##### [List PagerDuty services](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/pagerduty/methods/get)

GET/accounts/{account\_id}/alerting/v3/destinations/pagerduty

##### [Create PagerDuty integration token](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/pagerduty/methods/create)

POST/accounts/{account\_id}/alerting/v3/destinations/pagerduty/connect

##### [Delete PagerDuty Services](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/pagerduty/methods/delete)

DELETE/accounts/{account\_id}/alerting/v3/destinations/pagerduty

##### [Connect PagerDuty](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/pagerduty/methods/link)

GET/accounts/{account\_id}/alerting/v3/destinations/pagerduty/connect/{token\_id}

##### ModelsExpand Collapse

<details>

<summary>

Pagerduty object {id, name }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

name: optional string

The name of the pagerduty service.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.pagerduty%20%3E%20(model)%20pagerduty%20%3E%20(schema)>)

<details>

<summary>

PagerdutyCreateResponse object {id }

</summary>

id: optional string

token in form of UUID

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.pagerduty%20%3E%20(model)%20pagerduty_create_response%20%3E%20(schema)>)

<details>

<summary>

PagerdutyDeleteResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.pagerduty%20%3E%20(model)%20pagerduty_delete_response%20%3E%20(schema)>)

<details>

<summary>

PagerdutyLinkResponse object {id }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.pagerduty%20%3E%20(model)%20pagerduty_link_response%20%3E%20(schema)>)

#### AlertingDestinationsWebhooks

##### [List webhooks](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/webhooks/methods/list)

GET/accounts/{account\_id}/alerting/v3/destinations/webhooks

##### [Get a webhook](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/webhooks/methods/get)

GET/accounts/{account\_id}/alerting/v3/destinations/webhooks/{webhook\_id}

##### [Create a webhook](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/webhooks/methods/create)

POST/accounts/{account\_id}/alerting/v3/destinations/webhooks

##### [Update a webhook](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/webhooks/methods/update)

PUT/accounts/{account\_id}/alerting/v3/destinations/webhooks/{webhook\_id}

##### [Delete a webhook](https://developers.cloudflare.com/api/resources/alerting/subresources/destinations/subresources/webhooks/methods/delete)

DELETE/accounts/{account\_id}/alerting/v3/destinations/webhooks/{webhook\_id}

##### ModelsExpand Collapse

<details>

<summary>

Webhooks object {id, created\_at, last\_failure, 5 more }

</summary>

id: optional string

The unique identifier of a webhook

maxLength32

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the webhook destination was created.

formatdate-time

<a href="#">Link to this property</a>

last\_failure: optional string

Timestamp of the last time an attempt to dispatch a notification to this webhook failed.

formatdate-time

<a href="#">Link to this property</a>

last\_success: optional string

Timestamp of the last time Cloudflare was able to successfully dispatch a notification using this webhook.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The name of the webhook destination. This will be included in the request body when you receive a webhook notification.

<a href="#">Link to this property</a>

secret: optional string

Optional secret that will be passed in the <code>cf-webhook-auth</code> header when dispatching generic webhook notifications or formatted for supported destinations. Secrets are not returned in any API response body.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "datadog"or "discord"or "feishu"or 5 more

Type of webhook endpoint.

</summary>

One of the following:

"datadog"

<a href="#">Link to this property</a>

"discord"

<a href="#">Link to this property</a>

"feishu"

<a href="#">Link to this property</a>

"gchat"

<a href="#">Link to this property</a>

"generic"

<a href="#">Link to this property</a>

"opsgenie"

<a href="#">Link to this property</a>

"slack"

<a href="#">Link to this property</a>

"splunk"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The POST endpoint to call when dispatching a notification.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(model)%20webhooks%20%3E%20(schema)>)

<details>

<summary>

WebhookCreateResponse object {id }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(model)%20webhook_create_response%20%3E%20(schema)>)

<details>

<summary>

WebhookUpdateResponse object {id }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(model)%20webhook_update_response%20%3E%20(schema)>)

<details>

<summary>

WebhookDeleteResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.destinations.webhooks%20%3E%20(model)%20webhook_delete_response%20%3E%20(schema)>)

#### AlertingHistory

##### [List History](https://developers.cloudflare.com/api/resources/alerting/subresources/history/methods/list)

GET/accounts/{account\_id}/alerting/v3/history

##### ModelsExpand Collapse

<details>

<summary>

History object {id, alert\_body, alert\_type, 6 more }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

alert\_body: optional string

Message body included in the notification sent.

<a href="#">Link to this property</a>

alert\_type: optional string

Type of notification that has been dispatched.

<a href="#">Link to this property</a>

description: optional string

Description of the notification policy (if present).

<a href="#">Link to this property</a>

mechanism: optional string

The mechanism to which the notification has been dispatched.

<a href="#">Link to this property</a>

<details>

<summary>

mechanism\_type: optional "email"or "pagerduty"or "webhook"

The type of mechanism to which the notification has been dispatched. This can be email/pagerduty/webhook based on the mechanism configured.

</summary>

One of the following:

"email"

<a href="#">Link to this property</a>

"pagerduty"

<a href="#">Link to this property</a>

"webhook"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the policy.

<a href="#">Link to this property</a>

policy\_id: optional string

The unique identifier of a notification policy

maxLength32

<a href="#">Link to this property</a>

sent: optional string

Timestamp of when the notification was dispatched in ISO 8601 format.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.history%20%3E%20(model)%20history%20%3E%20(schema)>)

#### AlertingPolicies

##### [List Notification policies](https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/list)

GET/accounts/{account\_id}/alerting/v3/policies

##### [Get a Notification policy](https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/get)

GET/accounts/{account\_id}/alerting/v3/policies/{policy\_id}

##### [Create a Notification policy](https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/create)

POST/accounts/{account\_id}/alerting/v3/policies

##### [Update a Notification policy](https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/update)

PUT/accounts/{account\_id}/alerting/v3/policies/{policy\_id}

##### [Delete a Notification policy](https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/delete)

DELETE/accounts/{account\_id}/alerting/v3/policies/{policy\_id}

##### ModelsExpand Collapse

<details>

<summary>

Mechanism object {email, pagerduty, webhooks }

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

[Link to this property](#)%20alerting.policies%20%3E%20(model)%20mechanism%20%3E%20(schema)>)

<details>

<summary>

Policy object {id, alert\_interval, alert\_type, 7 more }

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

filters: optional <a href="https://developers.cloudflare.com/api/resources/alerting#(resource)%20alerting.policies%20%3E%20(model)%20policy_filter%20%3E%20(schema)">PolicyFilter</a> { actions, affected\_asns, affected\_components, 40 more }

Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for more details.

<a href="#">Link to this property</a>

mechanisms: optional <a href="https://developers.cloudflare.com/api/resources/alerting#(resource)%20alerting.policies%20%3E%20(model)%20mechanism%20%3E%20(schema)">Mechanism</a> { email, pagerduty, webhooks }

List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.

<a href="#">Link to this property</a>

modified: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Name of the policy.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.policies%20%3E%20(model)%20policy%20%3E%20(schema)>)

<details>

<summary>

PolicyFilter object {actions, affected\_asns, affected\_components, 40 more }

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

[Link to this property](#)%20alerting.policies%20%3E%20(model)%20policy_filter%20%3E%20(schema)>)

<details>

<summary>

PolicyCreateResponse object {id }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.policies%20%3E%20(model)%20policy_create_response%20%3E%20(schema)>)

<details>

<summary>

PolicyUpdateResponse object {id }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.policies%20%3E%20(model)%20policy_update_response%20%3E%20(schema)>)

<details>

<summary>

PolicyDeleteResponse object {errors, messages, success, result\_info }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful

<a href="#">Link to this property</a>

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.policies%20%3E%20(model)%20policy_delete_response%20%3E%20(schema)>)

#### AlertingSilences

##### [List Silences](https://developers.cloudflare.com/api/resources/alerting/subresources/silences/methods/list)

GET/accounts/{account\_id}/alerting/v3/silences

##### [Get Silence](https://developers.cloudflare.com/api/resources/alerting/subresources/silences/methods/get)

GET/accounts/{account\_id}/alerting/v3/silences/{silence\_id}

##### [Create Silences](https://developers.cloudflare.com/api/resources/alerting/subresources/silences/methods/create)

POST/accounts/{account\_id}/alerting/v3/silences

##### [Update Silences](https://developers.cloudflare.com/api/resources/alerting/subresources/silences/methods/update)

PUT/accounts/{account\_id}/alerting/v3/silences

##### [Delete Silence](https://developers.cloudflare.com/api/resources/alerting/subresources/silences/methods/delete)

DELETE/accounts/{account\_id}/alerting/v3/silences/{silence\_id}

##### ModelsExpand Collapse

<details>

<summary>

SilenceListResponse object {id, created\_at, end\_time, 3 more }

</summary>

id: optional string

Silence ID

maxLength32

<a href="#">Link to this property</a>

created\_at: optional string

When the silence was created.

<a href="#">Link to this property</a>

end\_time: optional string

When the silence ends.

<a href="#">Link to this property</a>

policy\_id: optional string

The unique identifier of a notification policy

maxLength32

<a href="#">Link to this property</a>

start\_time: optional string

When the silence starts.

<a href="#">Link to this property</a>

updated\_at: optional string

When the silence was modified.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(model)%20silence_list_response%20%3E%20(schema)>)

<details>

<summary>

SilenceGetResponse object {id, created\_at, end\_time, 3 more }

</summary>

id: optional string

Silence ID

maxLength32

<a href="#">Link to this property</a>

created\_at: optional string

When the silence was created.

<a href="#">Link to this property</a>

end\_time: optional string

When the silence ends.

<a href="#">Link to this property</a>

policy\_id: optional string

The unique identifier of a notification policy

maxLength32

<a href="#">Link to this property</a>

start\_time: optional string

When the silence starts.

<a href="#">Link to this property</a>

updated\_at: optional string

When the silence was modified.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(model)%20silence_get_response%20%3E%20(schema)>)

<details>

<summary>

SilenceCreateResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(model)%20silence_create_response%20%3E%20(schema)>)

<details>

<summary>

SilenceUpdateResponse object {id, created\_at, end\_time, 3 more }

</summary>

id: optional string

Silence ID

maxLength32

<a href="#">Link to this property</a>

created\_at: optional string

When the silence was created.

<a href="#">Link to this property</a>

end\_time: optional string

When the silence ends.

<a href="#">Link to this property</a>

policy\_id: optional string

The unique identifier of a notification policy

maxLength32

<a href="#">Link to this property</a>

start\_time: optional string

When the silence starts.

<a href="#">Link to this property</a>

updated\_at: optional string

When the silence was modified.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(model)%20silence_update_response%20%3E%20(schema)>)

<details>

<summary>

SilenceDeleteResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.silences%20%3E%20(model)%20silence_delete_response%20%3E%20(schema)>)