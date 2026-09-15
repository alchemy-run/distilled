---
title: Connectivity Precheck
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Super Slurper](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Connectivity Precheck

##### [Check source connectivity](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/connectivity_precheck/methods/source)

PUT/accounts/{account\_id}/slurper/source/connectivity-precheck

##### [Check target connectivity](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/connectivity_precheck/methods/target)

PUT/accounts/{account\_id}/slurper/target/connectivity-precheck

##### ModelsExpand Collapse

<details>

<summary>

ConnectivityPrecheckSourceResponse object {connectivityStatus }

</summary>

<details>

<summary>

connectivityStatus: optional "success"or "error"

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.connectivity_precheck%20%3E%20(model)%20connectivity_precheck_source_response%20%3E%20(schema)>)

<details>

<summary>

ConnectivityPrecheckTargetResponse object {connectivityStatus }

</summary>

<details>

<summary>

connectivityStatus: optional "success"or "error"

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.connectivity_precheck%20%3E%20(model)%20connectivity_precheck_target_response%20%3E%20(schema)>)