---
title: Graph
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Graph

##### [Query graph neighborhood from R2 Data Catalog](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/graph/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/graph

##### ModelsExpand Collapse

<details>

<summary>

GraphListResponse object {edges, node, nodes }

</summary>

<details>

<summary>

edges: array of object {id, relationshipType, source, 5 more }

</summary>

id: string

Deterministic composite edge id (source→target:relationshipType)

<a href="#">Link to this property</a>

relationshipType: string

<a href="#">Link to this property</a>

source: string

Compact id of the source node (type:uuid)

<a href="#">Link to this property</a>

sourceId: string

<a href="#">Link to this property</a>

sourceType: string

<a href="#">Link to this property</a>

target: string

Compact id of the target node (type:uuid)

<a href="#">Link to this property</a>

targetId: string

<a href="#">Link to this property</a>

targetType: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

node: map\[unknown]

Focal node object (legacy single-seed). Null when unavailable.

<a href="#">Link to this property</a>

nodes: array of map\[unknown]

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(model)%20graph_list_response%20%3E%20(schema)>)