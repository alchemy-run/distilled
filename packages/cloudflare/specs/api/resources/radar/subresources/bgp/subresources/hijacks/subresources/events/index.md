---
title: Events
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[BGP](https://developers.cloudflare.com/api/resources/radar/subresources/bgp)

[Hijacks](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/hijacks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Events

##### [Get BGP hijack events](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/hijacks/subresources/events/methods/list)

GET/radar/bgp/hijacks/events

##### ModelsExpand Collapse

<details>

<summary>

EventListResponse object {asn\_info, events, total\_monitors }

</summary>

<details>

<summary>

asn\_info: array of object {asn, country\_code, org\_name }

</summary>

asn: number

<a href="#">Link to this property</a>

country\_code: string

<a href="#">Link to this property</a>

org\_name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

events: array of object {id, confidence\_score, duration, 15 more }

</summary>

id: number

<a href="#">Link to this property</a>

confidence\_score: number

<a href="#">Link to this property</a>

duration: number

<a href="#">Link to this property</a>

event\_type: number

<a href="#">Link to this property</a>

hijack\_msgs\_count: number

<a href="#">Link to this property</a>

hijacker\_asn: number

<a href="#">Link to this property</a>

hijacker\_country: string

<a href="#">Link to this property</a>

is\_stale: boolean

<a href="#">Link to this property</a>

max\_hijack\_ts: string

<a href="#">Link to this property</a>

max\_msg\_ts: string

<a href="#">Link to this property</a>

min\_hijack\_ts: string

<a href="#">Link to this property</a>

on\_going\_count: number

<a href="#">Link to this property</a>

peer\_asns: array of number

<a href="#">Link to this property</a>

peer\_ip\_count: number

<a href="#">Link to this property</a>

prefixes: array of string

<a href="#">Link to this property</a>

<details>

<summary>

tags: array of object {name, score }

</summary>

name: string

<a href="#">Link to this property</a>

score: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

victim\_asns: array of number

<a href="#">Link to this property</a>

victim\_countries: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total\_monitors: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.hijacks.events%20%3E%20(model)%20event_list_response%20%3E%20(schema)>)