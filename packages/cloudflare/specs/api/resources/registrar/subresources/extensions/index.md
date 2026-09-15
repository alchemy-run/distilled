---
title: Extensions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar](https://developers.cloudflare.com/api/resources/registrar)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Extensions

##### [List extensions](https://developers.cloudflare.com/api/resources/registrar/subresources/extensions/methods/list)

GET/accounts/{account\_id}/registrar/extensions

##### [Get extension](https://developers.cloudflare.com/api/resources/registrar/subresources/extensions/methods/get)

GET/accounts/{account\_id}/registrar/extensions/{extension}

##### ModelsExpand Collapse

<details>

<summary>

ExtensionListResponse object {metadata, registration\_schema }

Extension entry with metadata and JSON Schema documents for the registration operation.

</summary>

<details>

<summary>

metadata: object {name, tld }

Extension metadata.

</summary>

name: string

The full name of the extension. For example, “co.uk”, or “uk”.

<a href="#">Link to this property</a>

tld: string

The TLD of the extension. For example, for “co.uk”, it is “uk”. For “uk”, it is “uk”.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

registration\_schema: unknown

JSON Schema describing the expected input structure for registration operations on this extension.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.extensions%20%3E%20(model)%20extension_list_response%20%3E%20(schema)>)

<details>

<summary>

ExtensionGetResponse object {metadata, registration\_schema }

Extension entry with metadata and JSON Schema documents for the registration operation.

</summary>

<details>

<summary>

metadata: object {name, tld }

Extension metadata.

</summary>

name: string

The full name of the extension. For example, “co.uk”, or “uk”.

<a href="#">Link to this property</a>

tld: string

The TLD of the extension. For example, for “co.uk”, it is “uk”. For “uk”, it is “uk”.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

registration\_schema: unknown

JSON Schema describing the expected input structure for registration operations on this extension.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.extensions%20%3E%20(model)%20extension_get_response%20%3E%20(schema)>)