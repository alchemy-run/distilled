---
title: Creates a new event
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Creates a new event

POST/accounts/{account\_id}/cloudforce-one/events/create

To create a dataset, see the [`Create Dataset`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/create/) endpoint. When `datasetId` parameter is unspecified, it will be created in a default dataset named `Cloudforce One Threat Events`.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

category: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20category%20%3E%20(schema)>)

date: string

formatdate-time

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20date%20%3E%20(schema)>)

event: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20event%20%3E%20(schema)>)

<details>

<summary>

raw: object {data, source, tlp }

</summary>

data: map\[unknown]

<a href="#">Link to this property</a>

source: optional string

<a href="#">Link to this property</a>

tlp: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20raw%20%3E%20(schema)>)

tlp: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20tlp%20%3E%20(schema)>)

accountId: optional number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20accountId%20%3E%20(schema)>)

attacker: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20attacker%20%3E%20(schema)>)

attackerCountry: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20attackerCountry%20%3E%20(schema)>)

datasetId: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20datasetId%20%3E%20(schema)>)

indicator: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20indicator%20%3E%20(schema)>)

<details>

<summary>

indicators: optional array of object {indicatorType, value }

Array of indicators for this event. Supports multiple indicators per event for complex scenarios.

</summary>

indicatorType: string

The type of indicator (e.g., DOMAIN, IP, JA3, HASH)

<a href="#">Link to this property</a>

value: string

The indicator value (e.g., domain name, IP address, hash)

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20indicators%20%3E%20(schema)>)

indicatorType: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20indicatorType%20%3E%20(schema)>)

insight: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20insight%20%3E%20(schema)>)

<details>

<summary>

source: optional object {resourceId, resourceType, system }

Controlled provenance for an event and its indicators derived from a Threat Signals article.

</summary>

resourceId: string

formatuuid

<a href="#">Link to this property</a>

resourceType: "article"

<a href="#">Link to this property</a>

system: "threat-signals"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20source%20%3E%20(schema)>)

tags: optional array of string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20tags%20%3E%20(schema)>)

targetCountry: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20targetCountry%20%3E%20(schema)>)

targetIndustry: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20targetIndustry%20%3E%20(schema)>)

##### ReturnsExpand Collapse

attacker: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20attacker>)

attackerCountry: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20attackerCountry>)

attackerCountryAlpha3: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20attackerCountryAlpha3>)

category: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20category>)

datasetId: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20datasetId>)

date: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20date>)

event: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20event>)

hasChildren: boolean

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20hasChildren>)

indicator: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20indicator>)

indicatorType: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20indicatorType>)

indicatorTypeId: number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20indicatorTypeId>)

killChain: number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20killChain>)

mitreAttack: array of string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20mitreAttack>)

mitreCapec: array of string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20mitreCapec>)

numReferenced: number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20numReferenced>)

numReferences: number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20numReferences>)

rawId: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20rawId>)

referenced: array of string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20referenced>)

referencedIds: array of number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20referencedIds>)

references: array of string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20references>)

referencesIds: array of number

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20referencesIds>)

tags: array of string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20tags>)

targetCountry: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20targetCountry>)

targetCountryAlpha3: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20targetCountryAlpha3>)

targetIndustry: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20targetIndustry>)

tlp: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20tlp>)

uuid: string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20uuid>)

insight: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20insight>)

releasabilityId: optional string

[Link to this property](#)%20cloudforce_one.threat_events%20%3E%20(model)%20threat_event_create_response%20%3E%20(schema)%20%3E%20(property)%20releasabilityId>)

### Creates a new event

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "category": "Domain Resolution",
          "date": "2022-04-01T00:00:00Z",
          "event": "An attacker registered the domain domain.com",
          "raw": {
            "data": {
              "foo": "bar"
            }
          },
          "tlp": "amber",
          "accountId": 123456,
          "attacker": "Flying Yeti",
          "attackerCountry": "CN",
          "datasetId": "durableObjectName",
          "indicator": "domain.com",
          "indicatorType": "domain",
          "insight": "This domain was likely registered for phishing purposes",
          "targetCountry": "US",
          "targetIndustry": "Agriculture"
        }'
```

200 example

```
{
  "attacker": "Flying Yeti",
  "attackerCountry": "CN",
  "attackerCountryAlpha3": "CHN",
  "category": "Domain Resolution",
  "datasetId": "dataset-example-id",
  "date": "2022-04-01T00:00:00Z",
  "event": "An attacker registered the domain domain.com",
  "hasChildren": true,
  "indicator": "domain.com",
  "indicatorType": "domain",
  "indicatorTypeId": 5,
  "killChain": 0,
  "mitreAttack": [
    " "
  ],
  "mitreCapec": [
    " "
  ],
  "numReferenced": 0,
  "numReferences": 0,
  "rawId": "453gw34w3",
  "referenced": [
    " "
  ],
  "referencedIds": [
    0
  ],
  "references": [
    " "
  ],
  "referencesIds": [
    0
  ],
  "tags": [
    "malware"
  ],
  "targetCountry": "US",
  "targetCountryAlpha3": "USA",
  "targetIndustry": "Agriculture",
  "tlp": "amber",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "insight": "insight",
  "releasabilityId": "releasabilityId"
}
```

##### Returns Examples

200 example

```
{
  "attacker": "Flying Yeti",
  "attackerCountry": "CN",
  "attackerCountryAlpha3": "CHN",
  "category": "Domain Resolution",
  "datasetId": "dataset-example-id",
  "date": "2022-04-01T00:00:00Z",
  "event": "An attacker registered the domain domain.com",
  "hasChildren": true,
  "indicator": "domain.com",
  "indicatorType": "domain",
  "indicatorTypeId": 5,
  "killChain": 0,
  "mitreAttack": [
    " "
  ],
  "mitreCapec": [
    " "
  ],
  "numReferenced": 0,
  "numReferences": 0,
  "rawId": "453gw34w3",
  "referenced": [
    " "
  ],
  "referencedIds": [
    0
  ],
  "references": [
    " "
  ],
  "referencesIds": [
    0
  ],
  "tags": [
    "malware"
  ],
  "targetCountry": "US",
  "targetCountryAlpha3": "USA",
  "targetIndustry": "Agriculture",
  "tlp": "amber",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "insight": "insight",
  "releasabilityId": "releasabilityId"
}
```