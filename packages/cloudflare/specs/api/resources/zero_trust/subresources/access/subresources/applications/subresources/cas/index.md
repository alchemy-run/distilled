---
title: CAs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# CAs

##### [List short-lived certificate CAs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/cas/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/apps/ca

##### [Get a short-lived certificate CA](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/cas/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/apps/{app\_id}/ca

##### [Create a short-lived certificate CA](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/cas/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/apps/{app\_id}/ca

##### [Delete a short-lived certificate CA](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/cas/methods/delete)

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/apps/{app\_id}/ca

##### ModelsExpand Collapse

<details>

<summary>

CA object {id, aud, public\_key }

</summary>

id: optional string

The ID of the CA.

maxLength48

<a href="#">Link to this property</a>

aud: optional string

The Application Audience (AUD) tag. Identifies the application associated with the CA.

maxLength64

<a href="#">Link to this property</a>

public\_key: optional string

The public key to add to your SSH server configuration.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.cas%20%3E%20(model)%20ca%20%3E%20(schema)>)

<details>

<summary>

CADeleteResponse object {id }

</summary>

id: optional string

The ID of the CA.

maxLength48

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.cas%20%3E%20(model)%20ca_delete_response%20%3E%20(schema)>)