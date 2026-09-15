---
title: Account Mapping
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Email](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/email)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Account Mapping

##### [Get mapping](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/email/subresources/account_mapping/methods/get)

GET/accounts/{account\_id}/dlp/email/account\_mapping

##### [Create mapping](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/email/subresources/account_mapping/methods/create)

POST/accounts/{account\_id}/dlp/email/account\_mapping

##### ModelsExpand Collapse

<details>

<summary>

AccountMappingGetResponse object {addin\_identifier\_token, auth\_requirements }

</summary>

addin\_identifier\_token: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

auth\_requirements: object {allowed\_microsoft\_organizations, type } or object {type }

</summary>

One of the following:

<details>

<summary>

object {allowed\_microsoft\_organizations, type }

</summary>

allowed\_microsoft\_organizations: array of string

<a href="#">Link to this property</a>

type: "Org"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Type object {type }

</summary>

type: "NoAuth"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.email.account_mapping%20%3E%20(model)%20account_mapping_get_response%20%3E%20(schema)>)

<details>

<summary>

AccountMappingCreateResponse object {addin\_identifier\_token, auth\_requirements }

</summary>

addin\_identifier\_token: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

auth\_requirements: object {allowed\_microsoft\_organizations, type } or object {type }

</summary>

One of the following:

<details>

<summary>

object {allowed\_microsoft\_organizations, type }

</summary>

allowed\_microsoft\_organizations: array of string

<a href="#">Link to this property</a>

type: "Org"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Type object {type }

</summary>

type: "NoAuth"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.email.account_mapping%20%3E%20(model)%20account_mapping_create_response%20%3E%20(schema)>)