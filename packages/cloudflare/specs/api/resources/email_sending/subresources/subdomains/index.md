---
title: Subdomains
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Sending](https://developers.cloudflare.com/api/resources/email_sending)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Subdomains

##### [List sending subdomains](https://developers.cloudflare.com/api/resources/email_sending/subresources/subdomains/methods/list)

GET/zones/{zone\_id}/email/sending/subdomains

##### [Get a sending subdomain](https://developers.cloudflare.com/api/resources/email_sending/subresources/subdomains/methods/get)

GET/zones/{zone\_id}/email/sending/subdomains/{subdomain\_id}

##### [Create a sending subdomain](https://developers.cloudflare.com/api/resources/email_sending/subresources/subdomains/methods/create)

POST/zones/{zone\_id}/email/sending/subdomains

##### [Update a sending subdomain](https://developers.cloudflare.com/api/resources/email_sending/subresources/subdomains/methods/edit)

PATCH/zones/{zone\_id}/email/sending/subdomains/{subdomain\_id}

##### [Delete a sending subdomain](https://developers.cloudflare.com/api/resources/email_sending/subresources/subdomains/methods/delete)

DELETE/zones/{zone\_id}/email/sending/subdomains/{subdomain\_id}

##### ModelsExpand Collapse

<details>

<summary>

SubdomainListResponse object {enabled, name, tag, 6 more }

</summary>

enabled: boolean

Whether Email Sending is enabled on this subdomain.

<a href="#">Link to this property</a>

name: string

The exact domain name or a leftmost wildcard such as <code>*.example.com</code>.

<a href="#">Link to this property</a>

tag: string

Sending subdomain identifier.

maxLength32

<a href="#">Link to this property</a>

created: optional string

The date and time the destination address has been created.

formatdate-time

<a href="#">Link to this property</a>

dkim\_selector: optional string

The DKIM selector used for email signing. Wildcard rows publish the selector and sign with <code>d=&lt;base&gt;</code>.

<a href="#">Link to this property</a>

drop\_suppressed\_recipients: optional boolean

Whether a send request that includes a recipient suppressed on this subdomain drops that recipient and still delivers to the rest, instead of failing the entire request.

<a href="#">Link to this property</a>

modified: optional string

The date and time the destination address was last modified.

formatdate-time

<a href="#">Link to this property</a>

preview\_enabled: optional boolean

Whether sent messages from this subdomain can be previewed in the activity log.

<a href="#">Link to this property</a>

return\_path\_domain: optional string

The return-path domain used for bounce handling. Wildcard rows use <code>cf-bounce.&lt;base&gt;</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.subdomains%20%3E%20(model)%20subdomain_list_response%20%3E%20(schema)>)

<details>

<summary>

SubdomainGetResponse object {enabled, name, tag, 6 more }

</summary>

enabled: boolean

Whether Email Sending is enabled on this subdomain.

<a href="#">Link to this property</a>

name: string

The exact domain name or a leftmost wildcard such as <code>*.example.com</code>.

<a href="#">Link to this property</a>

tag: string

Sending subdomain identifier.

maxLength32

<a href="#">Link to this property</a>

created: optional string

The date and time the destination address has been created.

formatdate-time

<a href="#">Link to this property</a>

dkim\_selector: optional string

The DKIM selector used for email signing. Wildcard rows publish the selector and sign with <code>d=&lt;base&gt;</code>.

<a href="#">Link to this property</a>

drop\_suppressed\_recipients: optional boolean

Whether a send request that includes a recipient suppressed on this subdomain drops that recipient and still delivers to the rest, instead of failing the entire request.

<a href="#">Link to this property</a>

modified: optional string

The date and time the destination address was last modified.

formatdate-time

<a href="#">Link to this property</a>

preview\_enabled: optional boolean

Whether sent messages from this subdomain can be previewed in the activity log.

<a href="#">Link to this property</a>

return\_path\_domain: optional string

The return-path domain used for bounce handling. Wildcard rows use <code>cf-bounce.&lt;base&gt;</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.subdomains%20%3E%20(model)%20subdomain_get_response%20%3E%20(schema)>)

<details>

<summary>

SubdomainCreateResponse object {enabled, name, tag, 6 more }

</summary>

enabled: boolean

Whether Email Sending is enabled on this subdomain.

<a href="#">Link to this property</a>

name: string

The exact domain name or a leftmost wildcard such as <code>*.example.com</code>.

<a href="#">Link to this property</a>

tag: string

Sending subdomain identifier.

maxLength32

<a href="#">Link to this property</a>

created: optional string

The date and time the destination address has been created.

formatdate-time

<a href="#">Link to this property</a>

dkim\_selector: optional string

The DKIM selector used for email signing. Wildcard rows publish the selector and sign with <code>d=&lt;base&gt;</code>.

<a href="#">Link to this property</a>

drop\_suppressed\_recipients: optional boolean

Whether a send request that includes a recipient suppressed on this subdomain drops that recipient and still delivers to the rest, instead of failing the entire request.

<a href="#">Link to this property</a>

modified: optional string

The date and time the destination address was last modified.

formatdate-time

<a href="#">Link to this property</a>

preview\_enabled: optional boolean

Whether sent messages from this subdomain can be previewed in the activity log.

<a href="#">Link to this property</a>

return\_path\_domain: optional string

The return-path domain used for bounce handling. Wildcard rows use <code>cf-bounce.&lt;base&gt;</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.subdomains%20%3E%20(model)%20subdomain_create_response%20%3E%20(schema)>)

<details>

<summary>

SubdomainEditResponse object {enabled, name, tag, 6 more }

</summary>

enabled: boolean

Whether Email Sending is enabled on this subdomain.

<a href="#">Link to this property</a>

name: string

The exact domain name or a leftmost wildcard such as <code>*.example.com</code>.

<a href="#">Link to this property</a>

tag: string

Sending subdomain identifier.

maxLength32

<a href="#">Link to this property</a>

created: optional string

The date and time the destination address has been created.

formatdate-time

<a href="#">Link to this property</a>

dkim\_selector: optional string

The DKIM selector used for email signing. Wildcard rows publish the selector and sign with <code>d=&lt;base&gt;</code>.

<a href="#">Link to this property</a>

drop\_suppressed\_recipients: optional boolean

Whether a send request that includes a recipient suppressed on this subdomain drops that recipient and still delivers to the rest, instead of failing the entire request.

<a href="#">Link to this property</a>

modified: optional string

The date and time the destination address was last modified.

formatdate-time

<a href="#">Link to this property</a>

preview\_enabled: optional boolean

Whether sent messages from this subdomain can be previewed in the activity log.

<a href="#">Link to this property</a>

return\_path\_domain: optional string

The return-path domain used for bounce handling. Wildcard rows use <code>cf-bounce.&lt;base&gt;</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.subdomains%20%3E%20(model)%20subdomain_edit_response%20%3E%20(schema)>)

<details>

<summary>

SubdomainDeleteResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.subdomains%20%3E%20(model)%20subdomain_delete_response%20%3E%20(schema)>)

#### SubdomainsDNS

##### [Get sending subdomain DNS records](https://developers.cloudflare.com/api/resources/email_sending/subresources/subdomains/subresources/dns/methods/get)

GET/zones/{zone\_id}/email/sending/subdomains/{subdomain\_id}/dns