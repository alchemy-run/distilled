---
title: Alerting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

[CT](https://developers.cloudflare.com/api/resources/zones/subresources/ct)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Alerting

##### [Get CT Alerting Subscription](https://developers.cloudflare.com/api/resources/zones/subresources/ct/subresources/alerting/methods/get)

GET/zones/{zone\_id}/ct/alerting

##### [Update CT Alerting Subscription](https://developers.cloudflare.com/api/resources/zones/subresources/ct/subresources/alerting/methods/edit)

PATCH/zones/{zone\_id}/ct/alerting

##### ModelsExpand Collapse

<details>

<summary>

CTAlertingSubscription object {enabled, emails }

Certificate Transparency alerting subscription settings for a zone.

</summary>

enabled: boolean

Whether CT alerting is enabled for the zone.

<a href="#">Link to this property</a>

emails: optional array of string

Email addresses that receive CT alert notifications for the zone. A maximum of 100 addresses may be configured. Each address must be a valid RFC 5322 email address and must not contain a comma.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.ct.alerting%20%3E%20(model)%20ct_alerting_subscription%20%3E%20(schema)>)