---
title: Destinations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Alerting](https://developers.cloudflare.com/api/resources/alerting)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Destinations

#### DestinationsEligible

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

#### DestinationsPagerduty

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

#### DestinationsWebhooks

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