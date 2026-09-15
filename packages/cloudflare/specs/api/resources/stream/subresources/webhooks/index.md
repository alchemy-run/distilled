---
title: Webhooks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Webhooks

##### [View webhook](https://developers.cloudflare.com/api/resources/stream/subresources/webhooks/methods/get)

GET/accounts/{account\_id}/stream/webhook

##### [Create VOD webhooks](https://developers.cloudflare.com/api/resources/stream/subresources/webhooks/methods/update)

PUT/accounts/{account\_id}/stream/webhook

##### [Delete webhooks](https://developers.cloudflare.com/api/resources/stream/subresources/webhooks/methods/delete)

DELETE/accounts/{account\_id}/stream/webhook

##### ModelsExpand Collapse

<details>

<summary>

WebhookGetResponse object {modified, notification\_url, notificationUrl, secret }

</summary>

modified: optional string

The date and time the webhook was last modified.

formatdate-time

<a href="#">Link to this property</a>

notification\_url: optional string

The URL where webhooks will be sent.

formaturi

<a href="#">Link to this property</a>

notificationUrl: optional string

The URL where webhooks will be sent.

formaturi

<a href="#">Link to this property</a>

secret: optional string

The secret used to verify webhook signatures.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.webhooks%20%3E%20(model)%20webhook_get_response%20%3E%20(schema)>)

<details>

<summary>

WebhookUpdateResponse object {modified, notification\_url, notificationUrl, secret }

</summary>

modified: optional string

The date and time the webhook was last modified.

formatdate-time

<a href="#">Link to this property</a>

notification\_url: optional string

The URL where webhooks will be sent.

formaturi

<a href="#">Link to this property</a>

notificationUrl: optional string

The URL where webhooks will be sent.

formaturi

<a href="#">Link to this property</a>

secret: optional string

The secret used to verify webhook signatures.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.webhooks%20%3E%20(model)%20webhook_update_response%20%3E%20(schema)>)

WebhookDeleteResponse = string

[Link to this property](#)%20stream.webhooks%20%3E%20(model)%20webhook_delete_response%20%3E%20(schema)>)