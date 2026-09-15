---
title: Hostnames
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Hostnames

#### HostnamesSettings

#### HostnamesSettingsTLS

##### [List TLS setting for hostnames](https://developers.cloudflare.com/api/resources/hostnames/subresources/settings/subresources/tls/methods/list)

GET/zones/{zone\_id}/hostnames/settings/{setting\_id}

##### [Get TLS setting for hostname](https://developers.cloudflare.com/api/resources/hostnames/subresources/settings/subresources/tls/methods/get)

GET/zones/{zone\_id}/hostnames/settings/{setting\_id}/{hostname}

##### [Edit TLS setting for hostname](https://developers.cloudflare.com/api/resources/hostnames/subresources/settings/subresources/tls/methods/update)

PUT/zones/{zone\_id}/hostnames/settings/{setting\_id}/{hostname}

##### [Delete TLS setting for hostname](https://developers.cloudflare.com/api/resources/hostnames/subresources/settings/subresources/tls/methods/delete)

DELETE/zones/{zone\_id}/hostnames/settings/{setting\_id}/{hostname}

##### ModelsExpand Collapse

<details>

<summary>

Setting object {created\_at, hostname, status, 2 more }

</summary>

created\_at: optional string

This is the time the tls setting was originally created for this hostname.

formatdate-time

<a href="#">Link to this property</a>

hostname: optional string

The hostname for which the tls settings are set.

<a href="#">Link to this property</a>

status: optional string

Deployment status for the given tls setting.

<a href="#">Link to this property</a>

updated\_at: optional string

This is the time the tls setting was updated.

formatdate-time

<a href="#">Link to this property</a>

value: optional <a href="https://developers.cloudflare.com/api/resources/hostnames#(resource)%20hostnames.settings.tls%20%3E%20(model)%20setting_value%20%3E%20(schema)">SettingValue</a>

The TLS setting value. The type depends on the <code>setting_id</code> used in the request path:

- <code>ciphers</code>: an array of allowed cipher suite strings in BoringSSL format (e.g., <code>["ECDHE-RSA-AES128-GCM-SHA256", "AES128-GCM-SHA256"]</code>).
- <code>min_tls_version</code>: a string indicating the minimum TLS version — one of <code>"1.0"</code>, <code>"1.1"</code>, <code>"1.2"</code>, or <code>"1.3"</code> (e.g., <code>"1.2"</code>).
- <code>http2</code>: a string indicating whether HTTP/2 is enabled — <code>"on"</code> or <code>"off"</code> (e.g., <code>"on"</code>).

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20hostnames.settings.tls%20%3E%20(model)%20setting%20%3E%20(schema)>)

<details>

<summary>

SettingValue = "1.0"or "1.1"or "1.2"or 3 moreor array of string

The TLS setting value. The type depends on the <code>setting_id</code> used in the request path:

- <code>ciphers</code>: an array of allowed cipher suite strings in BoringSSL format (e.g., <code>["ECDHE-RSA-AES128-GCM-SHA256", "AES128-GCM-SHA256"]</code>).
- <code>min_tls_version</code>: a string indicating the minimum TLS version — one of <code>"1.0"</code>, <code>"1.1"</code>, <code>"1.2"</code>, or <code>"1.3"</code> (e.g., <code>"1.2"</code>).
- <code>http2</code>: a string indicating whether HTTP/2 is enabled — <code>"on"</code> or <code>"off"</code> (e.g., <code>"on"</code>).

</summary>

One of the following:

<details>

<summary>

"1.0"or "1.1"or "1.2"or 3 more

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

array of string

Used when <code>setting_id</code> is <code>ciphers</code>. An array of allowed cipher suite strings.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20hostnames.settings.tls%20%3E%20(model)%20setting_value%20%3E%20(schema)>)

<details>

<summary>

TLSListResponse object {created\_at, hostname, status, 2 more }

</summary>

created\_at: optional string

This is the time the tls setting was originally created for this hostname.

formatdate-time

<a href="#">Link to this property</a>

hostname: optional string

The hostname for which the tls settings are set.

<a href="#">Link to this property</a>

status: optional string

Deployment status for the given tls setting.

<a href="#">Link to this property</a>

updated\_at: optional string

This is the time the tls setting was updated.

formatdate-time

<a href="#">Link to this property</a>

value: optional <a href="https://developers.cloudflare.com/api/resources/hostnames#(resource)%20hostnames.settings.tls%20%3E%20(model)%20setting_value%20%3E%20(schema)">SettingValue</a>

The TLS setting value. The type depends on the <code>setting_id</code> used in the request path:

- <code>ciphers</code>: an array of allowed cipher suite strings in BoringSSL format (e.g., <code>["ECDHE-RSA-AES128-GCM-SHA256", "AES128-GCM-SHA256"]</code>).
- <code>min_tls_version</code>: a string indicating the minimum TLS version — one of <code>"1.0"</code>, <code>"1.1"</code>, <code>"1.2"</code>, or <code>"1.3"</code> (e.g., <code>"1.2"</code>).
- <code>http2</code>: a string indicating whether HTTP/2 is enabled — <code>"on"</code> or <code>"off"</code> (e.g., <code>"on"</code>).

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20hostnames.settings.tls%20%3E%20(model)%20tls_list_response%20%3E%20(schema)>)

<details>

<summary>

TLSDeleteResponse object {created\_at, hostname, status, 2 more }

</summary>

created\_at: optional string

This is the time the tls setting was originally created for this hostname.

formatdate-time

<a href="#">Link to this property</a>

hostname: optional string

The hostname for which the tls settings are set.

<a href="#">Link to this property</a>

status: optional string

Deployment status for the given tls setting.

<a href="#">Link to this property</a>

updated\_at: optional string

This is the time the tls setting was updated.

formatdate-time

<a href="#">Link to this property</a>

value: optional <a href="https://developers.cloudflare.com/api/resources/hostnames#(resource)%20hostnames.settings.tls%20%3E%20(model)%20setting_value%20%3E%20(schema)">SettingValue</a>

The TLS setting value. The type depends on the <code>setting_id</code> used in the request path:

- <code>ciphers</code>: an array of allowed cipher suite strings in BoringSSL format (e.g., <code>["ECDHE-RSA-AES128-GCM-SHA256", "AES128-GCM-SHA256"]</code>).
- <code>min_tls_version</code>: a string indicating the minimum TLS version — one of <code>"1.0"</code>, <code>"1.1"</code>, <code>"1.2"</code>, or <code>"1.3"</code> (e.g., <code>"1.2"</code>).
- <code>http2</code>: a string indicating whether HTTP/2 is enabled — <code>"on"</code> or <code>"off"</code> (e.g., <code>"on"</code>).

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20hostnames.settings.tls%20%3E%20(model)%20tls_delete_response%20%3E%20(schema)>)