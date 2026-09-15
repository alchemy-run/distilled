---
title: Turnstile
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Turnstile

#### TurnstileWidgets

##### [List Turnstile Widgets](https://developers.cloudflare.com/api/resources/turnstile/subresources/widgets/methods/list)

GET/accounts/{account\_id}/challenges/widgets

##### [Turnstile Widget Details](https://developers.cloudflare.com/api/resources/turnstile/subresources/widgets/methods/get)

GET/accounts/{account\_id}/challenges/widgets/{sitekey}

##### [Create a Turnstile Widget](https://developers.cloudflare.com/api/resources/turnstile/subresources/widgets/methods/create)

POST/accounts/{account\_id}/challenges/widgets

##### [Update a Turnstile Widget](https://developers.cloudflare.com/api/resources/turnstile/subresources/widgets/methods/update)

PUT/accounts/{account\_id}/challenges/widgets/{sitekey}

##### [Delete a Turnstile Widget](https://developers.cloudflare.com/api/resources/turnstile/subresources/widgets/methods/delete)

DELETE/accounts/{account\_id}/challenges/widgets/{sitekey}

##### [Rotate Secret for a Turnstile Widget](https://developers.cloudflare.com/api/resources/turnstile/subresources/widgets/methods/rotate_secret)

POST/accounts/{account\_id}/challenges/widgets/{sitekey}/rotate\_secret

##### ModelsExpand Collapse

<details>

<summary>

Widget object {bot\_fight\_mode, clearance\_level, created\_on, 11 more }

A Turnstile widget’s detailed configuration

</summary>

bot\_fight\_mode: boolean

If bot\_fight\_mode is set to <code>true</code>, Cloudflare issues computationally expensive challenges in response to malicious bots (ENT only).

<a href="#">Link to this property</a>

<details>

<summary>

clearance\_level: "no\_clearance"or "jschallenge"or "managed"or "interactive"

If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance, this setting can determine the clearance level to be set

</summary>

One of the following:

"no\_clearance"

<a href="#">Link to this property</a>

"jschallenge"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

"interactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

When the widget was created.

formatdate-time

<a href="#">Link to this property</a>

domains: array of <a href="https://developers.cloudflare.com/api/resources/turnstile#(resource)%20turnstile.widgets%20%3E%20(model)%20widget_domain%20%3E%20(schema)">WidgetDomain</a>

maxLength10

<a href="#">Link to this property</a>

ephemeral\_id: boolean

Return the Ephemeral ID in /siteverify (ENT only).

<a href="#">Link to this property</a>

<details>

<summary>

mode: "non-interactive"or "invisible"or "managed"

Widget Mode

</summary>

One of the following:

"non-interactive"

<a href="#">Link to this property</a>

"invisible"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the widget was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

Human readable widget name. Not unique. Cloudflare suggests that you set this to a meaningful string to make it easier to identify your widget, and where it is used.

maxLength254

minLength1

<a href="#">Link to this property</a>

offlabel: boolean

Do not show any Cloudflare branding on the widget (ENT only).

<a href="#">Link to this property</a>

<details>

<summary>

region: "world"or "china"

Region where this widget can be used. This cannot be changed after creation.

</summary>

One of the following:

"world"

<a href="#">Link to this property</a>

"china"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

secret: string

Secret key for this widget.

<a href="#">Link to this property</a>

sitekey: string

Widget item identifier tag.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

deployed\_via: optional "wrangler"or "dashboard"or "spin"or 2 more

Origin that created this widget, recorded at creation time and immutable afterward. Server-derived from the create request; not client-settable. Omitted from the response for widgets created before this field existed.

</summary>

One of the following:

"wrangler"

<a href="#">Link to this property</a>

"dashboard"

<a href="#">Link to this property</a>

"spin"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

last\_modified\_via: optional "wrangler"or "dashboard"or "spin"or 2 more

Origin of the most recent mutation (create, update, delete, or secret rotation). Server-derived; not client-settable. Omitted for widgets last mutated before this field existed.

</summary>

One of the following:

"wrangler"

<a href="#">Link to this property</a>

"dashboard"

<a href="#">Link to this property</a>

"spin"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20turnstile.widgets%20%3E%20(model)%20widget%20%3E%20(schema)>)

WidgetDomain = string

Hosts as a hostname or IPv4/IPv6 address represented by strings. The widget will only work on these domains, and their subdomains.

[Link to this property](#)%20turnstile.widgets%20%3E%20(model)%20widget_domain%20%3E%20(schema)>)

<details>

<summary>

WidgetListResponse object {bot\_fight\_mode, clearance\_level, created\_on, 10 more }

A Turnstile Widgets configuration as it appears in listings

</summary>

bot\_fight\_mode: boolean

If bot\_fight\_mode is set to <code>true</code>, Cloudflare issues computationally expensive challenges in response to malicious bots (ENT only).

<a href="#">Link to this property</a>

<details>

<summary>

clearance\_level: "no\_clearance"or "jschallenge"or "managed"or "interactive"

If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance, this setting can determine the clearance level to be set

</summary>

One of the following:

"no\_clearance"

<a href="#">Link to this property</a>

"jschallenge"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

"interactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

When the widget was created.

formatdate-time

<a href="#">Link to this property</a>

domains: array of <a href="https://developers.cloudflare.com/api/resources/turnstile#(resource)%20turnstile.widgets%20%3E%20(model)%20widget_domain%20%3E%20(schema)">WidgetDomain</a>

maxLength10

<a href="#">Link to this property</a>

ephemeral\_id: boolean

Return the Ephemeral ID in /siteverify (ENT only).

<a href="#">Link to this property</a>

<details>

<summary>

mode: "non-interactive"or "invisible"or "managed"

Widget Mode

</summary>

One of the following:

"non-interactive"

<a href="#">Link to this property</a>

"invisible"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the widget was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

Human readable widget name. Not unique. Cloudflare suggests that you set this to a meaningful string to make it easier to identify your widget, and where it is used.

maxLength254

minLength1

<a href="#">Link to this property</a>

offlabel: boolean

Do not show any Cloudflare branding on the widget (ENT only).

<a href="#">Link to this property</a>

<details>

<summary>

region: "world"or "china"

Region where this widget can be used. This cannot be changed after creation.

</summary>

One of the following:

"world"

<a href="#">Link to this property</a>

"china"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sitekey: string

Widget item identifier tag.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

deployed\_via: optional "wrangler"or "dashboard"or "spin"or 2 more

Origin that created this widget, recorded at creation time and immutable afterward. Server-derived from the create request; not client-settable. Omitted from the response for widgets created before this field existed.

</summary>

One of the following:

"wrangler"

<a href="#">Link to this property</a>

"dashboard"

<a href="#">Link to this property</a>

"spin"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

last\_modified\_via: optional "wrangler"or "dashboard"or "spin"or 2 more

Origin of the most recent mutation (create, update, delete, or secret rotation). Server-derived; not client-settable. Omitted for widgets last mutated before this field existed.

</summary>

One of the following:

"wrangler"

<a href="#">Link to this property</a>

"dashboard"

<a href="#">Link to this property</a>

"spin"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20turnstile.widgets%20%3E%20(model)%20widget_list_response%20%3E%20(schema)>)