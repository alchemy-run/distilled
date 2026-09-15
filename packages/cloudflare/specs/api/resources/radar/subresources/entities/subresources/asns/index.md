---
title: ASNs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Entities](https://developers.cloudflare.com/api/resources/radar/subresources/entities)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# ASNs

##### [List autonomous systems](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/asns/methods/list)

GET/radar/entities/asns

##### [Get AS details by ASN](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/asns/methods/get)

GET/radar/entities/asns/{asn}

##### [Get AS-level relationships by ASN](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/asns/methods/rel)

GET/radar/entities/asns/{asn}/rel

##### [Get IRR AS-SETs that an AS is a member of](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/asns/methods/as_set)

GET/radar/entities/asns/{asn}/as\_set

##### [Get AS details by IP address](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/asns/methods/ip)

GET/radar/entities/asns/ip

##### [Get AS rankings by botnet threat feed activity](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/asns/methods/botnet_threat_feed)

GET/radar/entities/asns/botnet\_threat\_feed

##### ModelsExpand Collapse

<details>

<summary>

ASNListResponse object {asns }

</summary>

<details>

<summary>

asns: array of object {asn, country, countryName, 5 more }

</summary>

asn: number

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

countryName: string

<a href="#">Link to this property</a>

<details>

<summary>

estimatedUsers: object {estimatedUsers }

</summary>

estimatedUsers: optional number

Total estimated users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

aka: optional string

<a href="#">Link to this property</a>

orgName: optional string

<a href="#">Link to this property</a>

website: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(model)%20asn_list_response%20%3E%20(schema)>)

<details>

<summary>

ASNGetResponse object {asn }

</summary>

<details>

<summary>

asn: object {asn, confidenceLevel, country, 8 more }

</summary>

asn: number

<a href="#">Link to this property</a>

confidenceLevel: number

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

countryName: string

<a href="#">Link to this property</a>

<details>

<summary>

estimatedUsers: object {locations, estimatedUsers }

</summary>

<details>

<summary>

locations: array of object {locationAlpha2, locationName, estimatedUsers }

</summary>

locationAlpha2: string

<a href="#">Link to this property</a>

locationName: string

<a href="#">Link to this property</a>

estimatedUsers: optional number

Estimated users per location.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

estimatedUsers: optional number

Total estimated users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

orgName: string

<a href="#">Link to this property</a>

<details>

<summary>

related: array of object {asn, name, aka, estimatedUsers }

</summary>

asn: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

aka: optional string

<a href="#">Link to this property</a>

estimatedUsers: optional number

Total estimated users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

source: string

Regional Internet Registry.

<a href="#">Link to this property</a>

website: string

<a href="#">Link to this property</a>

aka: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(model)%20asn_get_response%20%3E%20(schema)>)

<details>

<summary>

ASNRelResponse object {meta, rels }

</summary>

<details>

<summary>

meta: object {data\_time, query\_time, total\_peers }

</summary>

data\_time: string

<a href="#">Link to this property</a>

query\_time: string

<a href="#">Link to this property</a>

total\_peers: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rels: array of object {asn1, asn1\_country, asn1\_name, 4 more }

</summary>

asn1: number

<a href="#">Link to this property</a>

asn1\_country: string

<a href="#">Link to this property</a>

asn1\_name: string

<a href="#">Link to this property</a>

asn2: number

<a href="#">Link to this property</a>

asn2\_country: string

<a href="#">Link to this property</a>

asn2\_name: string

<a href="#">Link to this property</a>

rel: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(model)%20asn_rel_response%20%3E%20(schema)>)

<details>

<summary>

ASNAsSetResponse object {as\_sets, paths }

</summary>

<details>

<summary>

as\_sets: array of object {as\_members\_count, as\_set\_members\_count, as\_set\_upstreams\_count, 6 more }

</summary>

as\_members\_count: number

The number of AS members in the AS-SET

<a href="#">Link to this property</a>

as\_set\_members\_count: number

The number of AS-SET members in the AS-SET

<a href="#">Link to this property</a>

as\_set\_upstreams\_count: number

The number of recursive upstream AS-SETs

<a href="#">Link to this property</a>

asn\_cone\_size: number

The number of unique ASNs in the AS-SETs recursive downstream

<a href="#">Link to this property</a>

irr\_sources: array of string

The IRR sources of the AS-SET

<a href="#">Link to this property</a>

name: string

The name of the AS-SET

<a href="#">Link to this property</a>

hierarchical\_asn: optional number

The AS number following hierarchical AS-SET name

<a href="#">Link to this property</a>

inferred\_asn: optional number

The inferred AS number of the AS-SET

<a href="#">Link to this property</a>

peeringdb\_asn: optional number

The AS number matching PeeringDB record

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

paths: array of array of string

Paths from the AS-SET that include the given AS to its upstreams recursively

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(model)%20asn_as_set_response%20%3E%20(schema)>)

<details>

<summary>

ASNIPResponse object {asn }

</summary>

<details>

<summary>

asn: object {asn, country, countryName, 7 more }

</summary>

asn: number

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

countryName: string

<a href="#">Link to this property</a>

<details>

<summary>

estimatedUsers: object {locations, estimatedUsers }

</summary>

<details>

<summary>

locations: array of object {locationAlpha2, locationName, estimatedUsers }

</summary>

locationAlpha2: string

<a href="#">Link to this property</a>

locationName: string

<a href="#">Link to this property</a>

estimatedUsers: optional number

Estimated users per location.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

estimatedUsers: optional number

Total estimated users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

orgName: string

<a href="#">Link to this property</a>

<details>

<summary>

related: array of object {asn, name, aka, estimatedUsers }

</summary>

asn: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

aka: optional string

<a href="#">Link to this property</a>

estimatedUsers: optional number

Total estimated users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

source: string

Regional Internet Registry.

<a href="#">Link to this property</a>

website: string

<a href="#">Link to this property</a>

aka: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(model)%20asn_ip_response%20%3E%20(schema)>)

<details>

<summary>

ASNBotnetThreatFeedResponse object {ases, meta }

</summary>

<details>

<summary>

ases: array of object {asn, country, name, 2 more }

</summary>

asn: number

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

rank: number

<a href="#">Link to this property</a>

rankChange: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {date, total, compareDate }

</summary>

date: string

<a href="#">Link to this property</a>

total: number

<a href="#">Link to this property</a>

compareDate: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(model)%20asn_botnet_threat_feed_response%20%3E%20(schema)>)