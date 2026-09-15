---
title: Query graph neighborhood from R2 Data Catalog
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Graph](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/graph)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Query graph neighborhood from R2 Data Catalog

GET/accounts/{account\_id}/cloudforce-one/events/graph

Expands the single-level relationship neighborhood of one or more seed nodes (event, indicator, or tag) from R2 Data Catalog. Seeds use compact id format (type:uuid), e.g. “event:550e8400-…”. Multi-seed requests merge and deduplicate results server-side. Hydrates neighbor entities with summary data from Durable Objects. Supports filtering by relationship type and dataset scope.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

Opaque pagination token. Only valid when seeds has exactly 1 entry; 400 otherwise.

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

datasetIds: optional array of string

Comma-separated dataset UUIDs to restrict neighbor scope, or one standalone scope value: ‘all’/’\*’, ‘analytics’ for isAnalytics=true datasets, or ‘operational’ for isAnalytics=false datasets. Intersected with access grants.

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20datasetIds%20%3E%20(schema)>)

direction: optional string

Edge direction relative to each seed: out (seed→neighbors), in (neighbors→seed), both (default).

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

expand: optional array of string

Comma-separated list of response sections to expand (hydrate). Allowed: `nodes`. Omitting `expand` returns identifier-only nodes.

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20expand%20%3E%20(schema)>)

hydration: optional string

Hydration strategy for neighbor nodes when expand=nodes is set. r2\_join (default): use R2 JOIN query + DO fallback. do\_only: use plain R2 query + hydrate all neighbors via Durable Objects.

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20hydration%20%3E%20(schema)>)

limit: optional number

Max neighbors per seed (default: 100, max: 1000). Values above 1000 return 400.

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

max\_nodes: optional number

Total accumulated node cap across all seeds (default: 500, max: 1000). Values above 1000 return 400.

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20max_nodes%20%3E%20(schema)>)

relationshipTypes: optional array of string

Comma-separated relationship types to filter by. Allowed: tagged\_with, appears\_in, related\_to, caused\_by, attributed\_to.

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20relationshipTypes%20%3E%20(schema)>)

seeds: optional array of string

Comma-separated compact seed ids (type:uuid). Example: seeds=event:550e8400-…,indicator:661fa920-… Provide 1–50 entries; omitting seeds returns 400.

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20seeds%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of map\[unknown]

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of map\[unknown]

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {edges, node, nodes }

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

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, edge\_count, query\_time\_ms, 6 more }

</summary>

count: number

Number of nodes in result.nodes (seeds + neighbors)

<a href="#">Link to this property</a>

edge\_count: number

Number of edges in result.edges

<a href="#">Link to this property</a>

query\_time\_ms: number

Total query time in milliseconds

<a href="#">Link to this property</a>

total\_count: number

Total count of nodes (same as count for this endpoint)

<a href="#">Link to this property</a>

cursor: optional string

Opaque pagination cursor for the next page; null when exhausted or for multi-seed requests (single-seed only)

<a href="#">Link to this property</a>

depth\_reached: optional number

Traversal depth reached (always 1 for single-level)

<a href="#">Link to this property</a>

has\_more: optional boolean

True when a cursor is available for the next page (single-seed only)

<a href="#">Link to this property</a>

seeds: optional array of string

Composite ids of the seed node(s) (type:uuid). Always an array, even for one seed.

<a href="#">Link to this property</a>

truncated: optional boolean

True when results were capped (per-seed limit or max\_nodes)

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.graph%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Query graph neighborhood from R2 Data Catalog

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/graph \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

200 example

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "edges": [
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04:appears_in",
        "relationshipType": "appears_in",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetId": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetType": "indicator"
      }
    ],
    "node": null,
    "nodes": [
      {
        "attacker": "APT28",
        "category": "intrusion",
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "date": "2026-06-01T00:00:00Z",
        "event": "Attacker registered domain evil.example.com",
        "id": "event:550e8400-e29b-41d4-a716-446655440000",
        "role": "focal",
        "type": "event",
        "uuid": "550e8400-e29b-41d4-a716-446655440000"
      },
      {
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "id": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "indicatorType": "domain",
        "role": "focal",
        "type": "indicator",
        "uuid": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "value": "evil.example.com"
      },
      {
        "categoryId": "threat-actor",
        "id": "tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "type": "tag",
        "uuid": "772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "value": "APT28"
      }
    ]
  },
  "result_info": {
    "count": 3,
    "cursor": null,
    "depth_reached": 1,
    "edge_count": 1,
    "has_more": false,
    "query_time_ms": 890,
    "seeds": [
      "event:550e8400-e29b-41d4-a716-446655440000",
      "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04"
    ],
    "total_count": 3,
    "truncated": false
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "edges": [
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04:appears_in",
        "relationshipType": "appears_in",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetId": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetType": "indicator"
      },
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71:tagged_with",
        "relationshipType": "tagged_with",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "targetId": "772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "targetType": "tag"
      },
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→event:883b0f14-5a6e-4d12-ae97-1c4e5d3f9a20:related_to",
        "relationshipType": "related_to",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "event:883b0f14-5a6e-4d12-ae97-1c4e5d3f9a20",
        "targetId": "883b0f14-5a6e-4d12-ae97-1c4e5d3f9a20",
        "targetType": "event"
      }
    ],
    "node": {
      "attacker": "APT28",
      "category": "intrusion",
      "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
      "date": "2026-06-01T00:00:00Z",
      "event": "Attacker registered domain evil.example.com for C2 infrastructure",
      "id": "event:550e8400-e29b-41d4-a716-446655440000",
      "role": "focal",
      "type": "event",
      "uuid": "550e8400-e29b-41d4-a716-446655440000"
    },
    "nodes": [
      {
        "attacker": "APT28",
        "category": "intrusion",
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "date": "2026-06-01T00:00:00Z",
        "event": "Attacker registered domain evil.example.com for C2 infrastructure",
        "id": "event:550e8400-e29b-41d4-a716-446655440000",
        "role": "focal",
        "type": "event",
        "uuid": "550e8400-e29b-41d4-a716-446655440000"
      },
      {
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "id": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "indicatorType": "domain",
        "type": "indicator",
        "uuid": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "value": "evil.example.com"
      },
      {
        "categoryId": "threat-actor",
        "id": "tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "type": "tag",
        "uuid": "772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "value": "APT28"
      },
      {
        "attacker": "",
        "category": "",
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "date": "",
        "event": "",
        "id": "event:883b0f14-5a6e-4d12-ae97-1c4e5d3f9a20",
        "missing": true,
        "type": "event",
        "uuid": "883b0f14-5a6e-4d12-ae97-1c4e5d3f9a20"
      }
    ]
  },
  "result_info": {
    "count": 4,
    "cursor": null,
    "depth_reached": 1,
    "edge_count": 3,
    "has_more": false,
    "query_time_ms": 142,
    "seeds": [
      "event:550e8400-e29b-41d4-a716-446655440000"
    ],
    "total_count": 4,
    "truncated": false
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "edges": [
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04:appears_in",
        "relationshipType": "appears_in",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetId": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetType": "indicator"
      },
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71:tagged_with",
        "relationshipType": "tagged_with",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "targetId": "772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "targetType": "tag"
      }
    ],
    "node": {
      "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
      "id": "event:550e8400-e29b-41d4-a716-446655440000",
      "role": "focal",
      "type": "event",
      "uuid": "550e8400-e29b-41d4-a716-446655440000"
    },
    "nodes": [
      {
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "id": "event:550e8400-e29b-41d4-a716-446655440000",
        "role": "focal",
        "type": "event",
        "uuid": "550e8400-e29b-41d4-a716-446655440000"
      },
      {
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "id": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "type": "indicator",
        "uuid": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04"
      },
      {
        "id": "tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "type": "tag",
        "uuid": "772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71"
      }
    ]
  },
  "result_info": {
    "count": 3,
    "cursor": null,
    "depth_reached": 1,
    "edge_count": 2,
    "has_more": false,
    "query_time_ms": 42,
    "seeds": [
      "event:550e8400-e29b-41d4-a716-446655440000"
    ],
    "total_count": 3,
    "truncated": false
  },
  "success": true
}
```

##### Returns Examples

200 example

200 example

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "edges": [
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04:appears_in",
        "relationshipType": "appears_in",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetId": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetType": "indicator"
      }
    ],
    "node": null,
    "nodes": [
      {
        "attacker": "APT28",
        "category": "intrusion",
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "date": "2026-06-01T00:00:00Z",
        "event": "Attacker registered domain evil.example.com",
        "id": "event:550e8400-e29b-41d4-a716-446655440000",
        "role": "focal",
        "type": "event",
        "uuid": "550e8400-e29b-41d4-a716-446655440000"
      },
      {
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "id": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "indicatorType": "domain",
        "role": "focal",
        "type": "indicator",
        "uuid": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "value": "evil.example.com"
      },
      {
        "categoryId": "threat-actor",
        "id": "tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "type": "tag",
        "uuid": "772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "value": "APT28"
      }
    ]
  },
  "result_info": {
    "count": 3,
    "cursor": null,
    "depth_reached": 1,
    "edge_count": 1,
    "has_more": false,
    "query_time_ms": 890,
    "seeds": [
      "event:550e8400-e29b-41d4-a716-446655440000",
      "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04"
    ],
    "total_count": 3,
    "truncated": false
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "edges": [
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04:appears_in",
        "relationshipType": "appears_in",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetId": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetType": "indicator"
      },
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71:tagged_with",
        "relationshipType": "tagged_with",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "targetId": "772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "targetType": "tag"
      },
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→event:883b0f14-5a6e-4d12-ae97-1c4e5d3f9a20:related_to",
        "relationshipType": "related_to",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "event:883b0f14-5a6e-4d12-ae97-1c4e5d3f9a20",
        "targetId": "883b0f14-5a6e-4d12-ae97-1c4e5d3f9a20",
        "targetType": "event"
      }
    ],
    "node": {
      "attacker": "APT28",
      "category": "intrusion",
      "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
      "date": "2026-06-01T00:00:00Z",
      "event": "Attacker registered domain evil.example.com for C2 infrastructure",
      "id": "event:550e8400-e29b-41d4-a716-446655440000",
      "role": "focal",
      "type": "event",
      "uuid": "550e8400-e29b-41d4-a716-446655440000"
    },
    "nodes": [
      {
        "attacker": "APT28",
        "category": "intrusion",
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "date": "2026-06-01T00:00:00Z",
        "event": "Attacker registered domain evil.example.com for C2 infrastructure",
        "id": "event:550e8400-e29b-41d4-a716-446655440000",
        "role": "focal",
        "type": "event",
        "uuid": "550e8400-e29b-41d4-a716-446655440000"
      },
      {
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "id": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "indicatorType": "domain",
        "type": "indicator",
        "uuid": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "value": "evil.example.com"
      },
      {
        "categoryId": "threat-actor",
        "id": "tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "type": "tag",
        "uuid": "772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "value": "APT28"
      },
      {
        "attacker": "",
        "category": "",
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "date": "",
        "event": "",
        "id": "event:883b0f14-5a6e-4d12-ae97-1c4e5d3f9a20",
        "missing": true,
        "type": "event",
        "uuid": "883b0f14-5a6e-4d12-ae97-1c4e5d3f9a20"
      }
    ]
  },
  "result_info": {
    "count": 4,
    "cursor": null,
    "depth_reached": 1,
    "edge_count": 3,
    "has_more": false,
    "query_time_ms": 142,
    "seeds": [
      "event:550e8400-e29b-41d4-a716-446655440000"
    ],
    "total_count": 4,
    "truncated": false
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "edges": [
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04:appears_in",
        "relationshipType": "appears_in",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetId": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "targetType": "indicator"
      },
      {
        "id": "event:550e8400-e29b-41d4-a716-446655440000→tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71:tagged_with",
        "relationshipType": "tagged_with",
        "source": "event:550e8400-e29b-41d4-a716-446655440000",
        "sourceId": "550e8400-e29b-41d4-a716-446655440000",
        "sourceType": "event",
        "target": "tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "targetId": "772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "targetType": "tag"
      }
    ],
    "node": {
      "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
      "id": "event:550e8400-e29b-41d4-a716-446655440000",
      "role": "focal",
      "type": "event",
      "uuid": "550e8400-e29b-41d4-a716-446655440000"
    },
    "nodes": [
      {
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "id": "event:550e8400-e29b-41d4-a716-446655440000",
        "role": "focal",
        "type": "event",
        "uuid": "550e8400-e29b-41d4-a716-446655440000"
      },
      {
        "datasetId": "a1b2c3d4-0001-4000-8000-000000000001",
        "id": "indicator:661fa920-bbf3-4e71-9c55-2a3d8e7f1b04",
        "type": "indicator",
        "uuid": "661fa920-bbf3-4e71-9c55-2a3d8e7f1b04"
      },
      {
        "id": "tag:772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71",
        "type": "tag",
        "uuid": "772af1c8-dc4a-4a29-b3e6-4f8c9d2a6e71"
      }
    ]
  },
  "result_info": {
    "count": 3,
    "cursor": null,
    "depth_reached": 1,
    "edge_count": 2,
    "has_more": false,
    "query_time_ms": 42,
    "seeds": [
      "event:550e8400-e29b-41d4-a716-446655440000"
    ],
    "total_count": 3,
    "truncated": false
  },
  "success": true
}
```