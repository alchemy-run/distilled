---
title: ASPA
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[BGP](https://developers.cloudflare.com/api/resources/radar/subresources/bgp)

[RPKI](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# ASPA

##### [Get ASPA objects snapshot](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki/subresources/aspa/methods/snapshot)

GET/radar/bgp/rpki/aspa/snapshot

##### [Get ASPA changes over time](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki/subresources/aspa/methods/changes)

GET/radar/bgp/rpki/aspa/changes

##### [Get ASPA count time series](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki/subresources/aspa/methods/timeseries)

GET/radar/bgp/rpki/aspa/timeseries

##### ModelsExpand Collapse

<details>

<summary>

ASPASnapshotResponse object {asnInfo, aspaObjects, meta }

</summary>

<details>

<summary>

asnInfo: object {"13335" }

</summary>

<details>

<summary>

"13335": object {asn, country, name }

</summary>

asn: number

ASN number.

<a href="#">Link to this property</a>

country: string

Alpha-2 country code.

<a href="#">Link to this property</a>

name: string

AS name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

aspaObjects: array of object {customerAsn, providers }

</summary>

customerAsn: number

The customer ASN publishing the ASPA object.

<a href="#">Link to this property</a>

providers: array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dataTime, queryTime, totalCount }

</summary>

dataTime: string

Timestamp of the underlying data.

formatdate-time

<a href="#">Link to this property</a>

queryTime: string

Timestamp when the query was executed.

formatdate-time

<a href="#">Link to this property</a>

totalCount: number

Total number of ASPA objects.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(model)%20aspa_snapshot_response%20%3E%20(schema)>)

<details>

<summary>

ASPAChangesResponse object {asnInfo, changes, meta }

</summary>

<details>

<summary>

asnInfo: object {"13335" }

</summary>

<details>

<summary>

"13335": object {asn, country, name }

</summary>

asn: number

ASN number.

<a href="#">Link to this property</a>

country: string

Alpha-2 country code.

<a href="#">Link to this property</a>

name: string

AS name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

changes: array of object {customersAdded, customersRemoved, date, 4 more }

</summary>

customersAdded: number

Number of new ASPA objects created.

<a href="#">Link to this property</a>

customersRemoved: number

Number of ASPA objects deleted.

<a href="#">Link to this property</a>

date: string

Date of the changes in ISO 8601 format.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

entries: array of object {customerAsn, providers, type }

</summary>

customerAsn: number

The customer ASN affected.

<a href="#">Link to this property</a>

providers: array of number

<a href="#">Link to this property</a>

<details>

<summary>

type: "CustomerAdded"or "CustomerRemoved"or "ProvidersAdded"or "ProvidersRemoved"

</summary>

One of the following:

"CustomerAdded"

<a href="#">Link to this property</a>

"CustomerRemoved"

<a href="#">Link to this property</a>

"ProvidersAdded"

<a href="#">Link to this property</a>

"ProvidersRemoved"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

providersAdded: number

Number of providers added to existing objects.

<a href="#">Link to this property</a>

providersRemoved: number

Number of providers removed from existing objects.

<a href="#">Link to this property</a>

totalCount: number

Running total of active ASPA objects after this day.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dataTime, queryTime }

</summary>

dataTime: string

Timestamp of the underlying data.

formatdate-time

<a href="#">Link to this property</a>

queryTime: string

Timestamp when the query was executed.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(model)%20aspa_changes_response%20%3E%20(schema)>)

<details>

<summary>

ASPATimeseriesResponse object {meta, serie\_0 }

</summary>

<details>

<summary>

meta: object {dataTime, queryTime }

</summary>

dataTime: string

Timestamp of the underlying data.

formatdate-time

<a href="#">Link to this property</a>

queryTime: string

Timestamp when the query was executed.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

serie\_0: object {timestamps, values }

</summary>

timestamps: array of string

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(model)%20aspa_timeseries_response%20%3E%20(schema)>)