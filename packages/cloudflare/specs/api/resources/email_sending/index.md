---
title: Email Sending
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Email Sending

##### [Send an email](https://developers.cloudflare.com/api/resources/email_sending/methods/send)

POST/accounts/{account\_id}/email/sending/send

##### [Send a raw MIME email](https://developers.cloudflare.com/api/resources/email_sending/methods/send_raw)

POST/accounts/{account\_id}/email/sending/send\_raw

##### ModelsExpand Collapse

<details>

<summary>

EmailSendingSendResponse object {delivered, message\_id, permanent\_bounces, 2 more }

</summary>

delivered: array of string

Email addresses to which the message was delivered immediately.

<a href="#">Link to this property</a>

message\_id: string

Message ID of the sent email.

<a href="#">Link to this property</a>

permanent\_bounces: array of string

Email addresses that permanently bounced.

<a href="#">Link to this property</a>

queued: array of string

Email addresses for which delivery was queued for later.

<a href="#">Link to this property</a>

suppressed\_recipients: array of string

Email addresses dropped because they are on the suppression list. Returned when suppressed-recipient dropping is enabled for the sending subdomain; otherwise the request fails instead.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending%20%3E%20(model)%20email_sending_send_response%20%3E%20(schema)>)

<details>

<summary>

EmailSendingSendRawResponse object {delivered, message\_id, permanent\_bounces, 2 more }

</summary>

delivered: array of string

Email addresses to which the message was delivered immediately.

<a href="#">Link to this property</a>

message\_id: string

Message ID of the sent email.

<a href="#">Link to this property</a>

permanent\_bounces: array of string

Email addresses that permanently bounced.

<a href="#">Link to this property</a>

queued: array of string

Email addresses for which delivery was queued for later.

<a href="#">Link to this property</a>

suppressed\_recipients: array of string

Email addresses dropped because they are on the suppression list. Returned when suppressed-recipient dropping is enabled for the sending subdomain; otherwise the request fails instead.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending%20%3E%20(model)%20email_sending_send_raw_response%20%3E%20(schema)>)

#### Email SendingSuppressions

##### [List account Email Sending suppressions](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions/methods/list)

GET/accounts/{account\_id}/email/sending/suppressions

##### [Get account Email Sending suppression](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions/methods/get)

GET/accounts/{account\_id}/email/sending/suppressions/{suppression\_id}

##### [Create account Email Sending suppression](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions/methods/create)

POST/accounts/{account\_id}/email/sending/suppressions

##### [Update account Email Sending suppression](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions/methods/edit)

PATCH/accounts/{account\_id}/email/sending/suppressions/{suppression\_id}

##### [Delete account Email Sending suppression](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions/methods/delete)

DELETE/accounts/{account\_id}/email/sending/suppressions/{suppression\_id}

##### [Bulk import account Email Sending suppressions](https://developers.cloudflare.com/api/resources/email_sending/subresources/suppressions/methods/import)

POST/accounts/{account\_id}/email/sending/suppressions/bulk

##### ModelsExpand Collapse

<details>

<summary>

SuppressionListResponse object {id, created\_at, email, 4 more }

</summary>

id: string

Unique identifier for this suppression.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the suppression was created.

formatdate-time

<a href="#">Link to this property</a>

email: string

The suppressed email address.

formatemail

<a href="#">Link to this property</a>

expires\_at: string

When the suppression expires. Null for a permanent suppression.

formatdate-time

<a href="#">Link to this property</a>

read\_only: boolean

Whether clients may mutate this suppression. This is determined by the server and must not be inferred from <code>reason</code>.

<a href="#">Link to this property</a>

reason: string

Why the address is suppressed: <code>manual</code>, <code>complaint</code>, <code>hard_bounce</code>, <code>soft_bounce</code>, or <code>policy</code>.

<a href="#">Link to this property</a>

note: optional string

Advisory note for this suppression, if any.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(model)%20suppression_list_response%20%3E%20(schema)>)

<details>

<summary>

SuppressionGetResponse object {id, created\_at, email, 4 more }

</summary>

id: string

Unique identifier for this suppression.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the suppression was created.

formatdate-time

<a href="#">Link to this property</a>

email: string

The suppressed email address.

formatemail

<a href="#">Link to this property</a>

expires\_at: string

When the suppression expires. Null for a permanent suppression.

formatdate-time

<a href="#">Link to this property</a>

read\_only: boolean

Whether clients may mutate this suppression. This is determined by the server and must not be inferred from <code>reason</code>.

<a href="#">Link to this property</a>

reason: string

Why the address is suppressed: <code>manual</code>, <code>complaint</code>, <code>hard_bounce</code>, <code>soft_bounce</code>, or <code>policy</code>.

<a href="#">Link to this property</a>

note: optional string

Advisory note for this suppression, if any.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(model)%20suppression_get_response%20%3E%20(schema)>)

<details>

<summary>

SuppressionCreateResponse object {id }

</summary>

id: string

The suppression’s identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(model)%20suppression_create_response%20%3E%20(schema)>)

<details>

<summary>

SuppressionEditResponse object {id, created\_at, email, 4 more }

</summary>

id: string

Unique identifier for this suppression.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the suppression was created.

formatdate-time

<a href="#">Link to this property</a>

email: string

The suppressed email address.

formatemail

<a href="#">Link to this property</a>

expires\_at: string

When the suppression expires. Null for a permanent suppression.

formatdate-time

<a href="#">Link to this property</a>

read\_only: boolean

Whether clients may mutate this suppression. This is determined by the server and must not be inferred from <code>reason</code>.

<a href="#">Link to this property</a>

reason: string

Why the address is suppressed: <code>manual</code>, <code>complaint</code>, <code>hard_bounce</code>, <code>soft_bounce</code>, or <code>policy</code>.

<a href="#">Link to this property</a>

note: optional string

Advisory note for this suppression, if any.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(model)%20suppression_edit_response%20%3E%20(schema)>)

<details>

<summary>

SuppressionDeleteResponse object {id }

</summary>

id: string

The suppression’s identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(model)%20suppression_delete_response%20%3E%20(schema)>)

<details>

<summary>

SuppressionImportResponse object {deduplicated, errors, invalid, 4 more }

</summary>

deduplicated: number

Number of items dropped because their email address repeated an earlier item in this request. Counted once and excluded from <code>items</code>.

<a href="#">Link to this property</a>

errors: number

Number of items that failed to import due to an unexpected error.

<a href="#">Link to this property</a>

invalid: number

Number of items with an invalid email address.

<a href="#">Link to this property</a>

<details>

<summary>

items: array of object {index, status, id, 2 more }

Per-item results, in the same order as the request body.

</summary>

index: number

Zero-based index of this item in the request body.

<a href="#">Link to this property</a>

<details>

<summary>

status: "processed"or "invalid"or "error"or "skipped"

Outcome for this item.

</summary>

One of the following:

"processed"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

The created or promoted suppression’s identifier. Present when <code>status</code> is <code>processed</code>.

formatuuid

<a href="#">Link to this property</a>

email: optional string

The submitted email address for this item.

formatemail

<a href="#">Link to this property</a>

error: optional string

Human-readable error message. Present when <code>status</code> is <code>invalid</code>, <code>error</code>, or <code>skipped</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

processed: number

Number of items successfully created or promoted.

<a href="#">Link to this property</a>

skipped: number

Number of items skipped because the existing suppression is not customer-managed (for example, a read-only policy suppression).

<a href="#">Link to this property</a>

total: number

Total number of items in the request body, including duplicates.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending.suppressions%20%3E%20(model)%20suppression_import_response%20%3E%20(schema)>)

#### Email SendingSubdomains

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

#### Email SendingSubdomainsDNS

##### [Get sending subdomain DNS records](https://developers.cloudflare.com/api/resources/email_sending/subresources/subdomains/subresources/dns/methods/get)

GET/zones/{zone\_id}/email/sending/subdomains/{subdomain\_id}/dns