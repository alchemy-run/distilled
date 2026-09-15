---
title: Accessibility Tree
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Accessibility Tree

##### [Get accessibility tree page](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/accessibility_tree/methods/create)

POST/accounts/{account\_id}/browser-rendering/accessibilityTree

##### ModelsExpand Collapse

<details>

<summary>

AccessibilityTreeCreateResponse object {accessibilityTree }

</summary>

<details>

<summary>

accessibilityTree: object {role, autocomplete, checked, 23 more }

Accessibility tree node

</summary>

role: string

<a href="#">Link to this property</a>

autocomplete: optional string

<a href="#">Link to this property</a>

<details>

<summary>

checked: optional booleanor "mixed"

</summary>

One of the following:

boolean

<a href="#">Link to this property</a>

"mixed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

children: optional array of unknown

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

disabled: optional boolean

<a href="#">Link to this property</a>

expanded: optional boolean

<a href="#">Link to this property</a>

focused: optional boolean

<a href="#">Link to this property</a>

haspopup: optional string

<a href="#">Link to this property</a>

invalid: optional string

<a href="#">Link to this property</a>

keyshortcuts: optional string

<a href="#">Link to this property</a>

level: optional number

<a href="#">Link to this property</a>

modal: optional boolean

<a href="#">Link to this property</a>

multiline: optional boolean

<a href="#">Link to this property</a>

multiselectable: optional boolean

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

orientation: optional string

<a href="#">Link to this property</a>

<details>

<summary>

pressed: optional booleanor "mixed"

</summary>

One of the following:

boolean

<a href="#">Link to this property</a>

"mixed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

readonly: optional boolean

<a href="#">Link to this property</a>

required: optional boolean

<a href="#">Link to this property</a>

roledescription: optional string

<a href="#">Link to this property</a>

selected: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

value: optional stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

valuemax: optional number

<a href="#">Link to this property</a>

valuemin: optional number

<a href="#">Link to this property</a>

valuetext: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.accessibility_tree%20%3E%20(model)%20accessibility_tree_create_response%20%3E%20(schema)>)