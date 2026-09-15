---
title: Annotations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Annotations

##### [Get latest annotations](https://developers.cloudflare.com/api/resources/radar/subresources/annotations/methods/list)

GET/radar/annotations

##### ModelsExpand Collapse

<details>

<summary>

AnnotationListResponse object {annotations }

</summary>

<details>

<summary>

annotations: array of object {id, asns, asnsDetails, 15 more }

</summary>

id: string

<a href="#">Link to this property</a>

asns: array of number

<a href="#">Link to this property</a>

<details>

<summary>

asnsDetails: array of object {asn, location, name }

</summary>

asn: string

<a href="#">Link to this property</a>

<details>

<summary>

location: object {code, name }

</summary>

code: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dataSource: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

endDate: string

<a href="#">Link to this property</a>

<details>

<summary>

entities: array of object {entityName, entityType, entityValue }

</summary>

entityName: string

<a href="#">Link to this property</a>

entityType: string

<a href="#">Link to this property</a>

entityValue: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

eventType: string

<a href="#">Link to this property</a>

geoIds: array of string

<a href="#">Link to this property</a>

linkedUrl: string

<a href="#">Link to this property</a>

locations: array of string

<a href="#">Link to this property</a>

<details>

<summary>

locationsDetails: array of object {code, name }

</summary>

code: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

origins: array of string

<a href="#">Link to this property</a>

<details>

<summary>

originsDetails: array of object {name, origin }

</summary>

name: string

<a href="#">Link to this property</a>

origin: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

outage: object {outageCause, outageType }

</summary>

outageCause: string

<a href="#">Link to this property</a>

outageType: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

scope: string

<a href="#">Link to this property</a>

startDate: string

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.annotations%20%3E%20(model)%20annotation_list_response%20%3E%20(schema)>)

#### AnnotationsOutages

##### [Get latest Internet outages and anomalies](https://developers.cloudflare.com/api/resources/radar/subresources/annotations/subresources/outages/methods/get)

GET/radar/annotations/outages

##### [Get the number of outages by location](https://developers.cloudflare.com/api/resources/radar/subresources/annotations/subresources/outages/methods/locations)

GET/radar/annotations/outages/locations

##### ModelsExpand Collapse

<details>

<summary>

OutageGetResponse object {annotations }

</summary>

<details>

<summary>

annotations: array of object {id, asns, asnsDetails, 15 more }

</summary>

id: string

<a href="#">Link to this property</a>

asns: array of number

<a href="#">Link to this property</a>

<details>

<summary>

asnsDetails: array of object {asn, location, name }

</summary>

asn: string

<a href="#">Link to this property</a>

<details>

<summary>

location: object {code, name }

</summary>

code: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dataSource: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

endDate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

entities: array of object {entityName, entityType, entityValue }

</summary>

entityName: string

<a href="#">Link to this property</a>

entityType: string

<a href="#">Link to this property</a>

entityValue: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

eventType: string

<a href="#">Link to this property</a>

geoIds: array of string

<a href="#">Link to this property</a>

linkedUrl: string

<a href="#">Link to this property</a>

locations: array of string

<a href="#">Link to this property</a>

<details>

<summary>

locationsDetails: array of object {code, name }

</summary>

code: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

origins: array of string

<a href="#">Link to this property</a>

<details>

<summary>

originsDetails: array of object {name, origin }

</summary>

name: string

<a href="#">Link to this property</a>

origin: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

outage: object {outageCause, outageType }

</summary>

outageCause: string

<a href="#">Link to this property</a>

outageType: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

scope: string

<a href="#">Link to this property</a>

startDate: string

formatdate-time

<a href="#">Link to this property</a>

tags: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.annotations.outages%20%3E%20(model)%20outage_get_response%20%3E%20(schema)>)

<details>

<summary>

OutageLocationsResponse object {annotations }

</summary>

<details>

<summary>

annotations: array of object {clientCountryAlpha2, clientCountryName, value }

</summary>

clientCountryAlpha2: string

<a href="#">Link to this property</a>

clientCountryName: string

<a href="#">Link to this property</a>

value: string

A numeric string.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.annotations.outages%20%3E%20(model)%20outage_locations_response%20%3E%20(schema)>)