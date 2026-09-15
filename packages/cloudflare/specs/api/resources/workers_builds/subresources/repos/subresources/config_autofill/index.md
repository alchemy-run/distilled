---
title: Config Autofill
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Repos](https://developers.cloudflare.com/api/resources/workers_builds/subresources/repos)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Config Autofill

##### [Get repository configuration autofill](https://developers.cloudflare.com/api/resources/workers_builds/subresources/repos/subresources/config_autofill/methods/get)

GET/accounts/{account\_id}/builds/repos/{provider\_type}/{provider\_account\_id}/{repo\_id}/config\_autofill

##### ModelsExpand Collapse

<details>

<summary>

ConfigAutofillGetResponse object {config\_file, default\_worker\_name, env\_worker\_names, 2 more }

</summary>

config\_file: optional string

<a href="#">Link to this property</a>

default\_worker\_name: optional string

<a href="#">Link to this property</a>

env\_worker\_names: optional map\[string]

<a href="#">Link to this property</a>

<details>

<summary>

package\_manager: optional "npm"or "yarn"or "pnpm"or 2 more

Package manager inferred from repository lockfiles; defaults to npm when none is detected.

</summary>

One of the following:

"npm"

<a href="#">Link to this property</a>

"yarn"

<a href="#">Link to this property</a>

"pnpm"

<a href="#">Link to this property</a>

"bun"

<a href="#">Link to this property</a>

"uv"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

scripts: optional map\[string]

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(model)%20config_autofill_get_response%20%3E%20(schema)>)