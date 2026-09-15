---
title: Scrape
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Scrape

##### [Scrape elements.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/scrape/methods/create)

POST/accounts/{account\_id}/browser-rendering/scrape

##### ModelsExpand Collapse

<details>

<summary>

ScrapeCreateResponse = array of object {results, selector }

</summary>

<details>

<summary>

results: object {attributes, height, html, 4 more }

</summary>

<details>

<summary>

attributes: array of object {name, value }

</summary>

name: string

Attribute name.

<a href="#">Link to this property</a>

value: string

Attribute value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

height: number

Element height.

<a href="#">Link to this property</a>

html: string

HTML content.

<a href="#">Link to this property</a>

left: number

Element left.

<a href="#">Link to this property</a>

text: string

Text content.

<a href="#">Link to this property</a>

top: number

Element top.

<a href="#">Link to this property</a>

width: number

Element width.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

selector: string

Selector.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.scrape%20%3E%20(model)%20scrape_create_response%20%3E%20(schema)>)