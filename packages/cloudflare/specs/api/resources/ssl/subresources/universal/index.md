---
title: Universal
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[SSL](https://developers.cloudflare.com/api/resources/ssl)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Universal

#### UniversalSettings

##### [Universal SSL Settings Details](https://developers.cloudflare.com/api/resources/ssl/subresources/universal/subresources/settings/methods/get)

GET/zones/{zone\_id}/ssl/universal/settings

##### [Edit Universal SSL Settings](https://developers.cloudflare.com/api/resources/ssl/subresources/universal/subresources/settings/methods/edit)

PATCH/zones/{zone\_id}/ssl/universal/settings

##### ModelsExpand Collapse

<details>

<summary>

UniversalSSLSettings object {enabled }

</summary>

enabled: optional boolean

Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there are no advanced certificates or custom certificates uploaded for the domain, visitors will be unable to access the domain over HTTPS.

By disabling Universal SSL, you understand that the following Cloudflare settings and preferences will result in visitors being unable to visit your domain unless you have uploaded a custom certificate or purchased an advanced certificate.

- HSTS
- Always Use HTTPS
- Opportunistic Encryption
- Onion Routing
- Any Page Rules redirecting traffic to HTTPS

Similarly, any HTTP redirect to HTTPS at the origin while the Cloudflare proxy is enabled will result in users being unable to visit your site without a valid certificate at Cloudflare’s edge.

If you do not have a valid custom or advanced certificate at Cloudflare’s edge and are unsure if any of the above Cloudflare settings are enabled, or if any HTTP redirects exist at your origin, we advise leaving Universal SSL enabled for your domain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.universal.settings%20%3E%20(model)%20universal_ssl_settings%20%3E%20(schema)>)