---
title: Get Account Usage (Version 2, Alpha, Restricted)
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

[Usage](https://developers.cloudflare.com/api/resources/billing/subresources/usage)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Account Usage (Version 2, Alpha, Restricted)

Deprecated: Use \`get\_account\_usage\_v2\` instead.

GET/accounts/{account\_id}/billable/usage

Returns cost and usage data for a single Cloudflare account, aligned with the [FinOps FOCUS v1.3](https://focus.finops.org/focus-specification/v1-3/) Cost and Usage dataset specification.

Each record represents one billable metric for one account on one day. This includes all metered usage, including usage that falls within free-tier allowances and may result in zero cost.

**Note:** Cost and pricing fields are not yet populated and will be absent from responses until billing integration is complete.

When `from` and `to` are omitted, defaults to the start of the current month through today. The maximum date range is 31 days.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### P ath ParametersExpand Collapse

account\_id: string

Represents a Cloudflare resource identifier tag.

maxLength32

[Link to this property](#)%20billing.usage%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

from: optional string

Start date for the usage query (ISO 8601). Required if `to` is set. When omitted along with `to`, defaults to the start of the current month. Filters by charge period (when consumption happened), not billing period. The maximum date range is 31 days.

formatdate

[Link to this property](#)%20billing.usage%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20from%20%3E%20(schema)>)

to: optional string

End date for the usage query (ISO 8601). Required if `from` is set. When omitted along with `from`, defaults to today. Filters by charge period (when consumption happened), not billing period. The maximum date range is 31 days.

formatdate

[Link to this property](#)%20billing.usage%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20to%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message, code }

Contains error details if the request failed.

</summary>

message: string

Describes the error or notice.

<a href="#">Link to this property</a>

code: optional number

Identifies the error or notice type.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.usage%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message, code }

Contains informational notices about the response.

</summary>

message: string

Describes the error or notice.

<a href="#">Link to this property</a>

code: optional number

Identifies the error or notice type.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.usage%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {BillingAccountId, BillingAccountName, ChargeCategory, 33 more }

Contains the array of cost and usage records.

</summary>

BillingAccountId: string

Public identifier of the Cloudflare account (account tag).

<a href="#">Link to this property</a>

BillingAccountName: string

Display name of the Cloudflare account.

<a href="#">Link to this property</a>

ChargeCategory: "Usage"

Highest-level classification of a charge based on the nature of how it gets billed. Currently only “Usage” is supported.

<a href="#">Link to this property</a>

ChargeDescription: string

Self-contained summary of the charge’s purpose and price.

<a href="#">Link to this property</a>

ChargeFrequency: "Usage-Based"

Indicates how often a charge occurs. Currently only “Usage-Based” is supported.

<a href="#">Link to this property</a>

ChargePeriodEnd: string

Exclusive end of the time interval during which the usage was consumed.

formatdate-time

<a href="#">Link to this property</a>

ChargePeriodStart: string

Inclusive start of the time interval during which the usage was consumed.

formatdate-time

<a href="#">Link to this property</a>

ConsumedQuantity: number

Measured usage amount within the charge period. Reflects raw metered consumption before pricing transformations.

<a href="#">Link to this property</a>

ConsumedUnit: string

Unit of measure for the consumed quantity (e.g., “GB”, “Requests”, “vCPU-Hours”).

<a href="#">Link to this property</a>

HostProviderName: string

Name of the entity providing the underlying infrastructure or platform.

<a href="#">Link to this property</a>

InvoiceIssuerName: string

Name of the entity responsible for invoicing for the services consumed.

<a href="#">Link to this property</a>

ServiceProviderName: string

Name of the entity that made the services available for purchase.

<a href="#">Link to this property</a>

x\_BillableMetricId: string

The unique identifier for the billable metric in the Cloudflare catalog. Cloudflare extension; replaces FOCUS SkuId.

<a href="#">Link to this property</a>

x\_BillableMetricName: string

The display name of the billable metric. Cloudflare extension; replaces FOCUS SkuMeter.

<a href="#">Link to this property</a>

BilledCost: optional number

A charge serving as the basis for invoicing, inclusive of all reduced rates and discounts while excluding the amortization of upfront charges (one-time or recurring).

<a href="#">Link to this property</a>

BillingCurrency: optional string

Currency that a charge was billed in (ISO 4217).

<a href="#">Link to this property</a>

BillingPeriodEnd: optional string

Exclusive end of the billing cycle that contains this usage record.

formatdate-time

<a href="#">Link to this property</a>

BillingPeriodStart: optional string

Inclusive start of the billing cycle that contains this usage record.

formatdate-time

<a href="#">Link to this property</a>

ChargeClass: optional "Correction"

Indicates whether the row represents a correction to one or more charges invoiced in a previous billing period.

<a href="#">Link to this property</a>

ContractedCost: optional number

Cost calculated by multiplying ContractedUnitPrice and the corresponding PricingQuantity.

<a href="#">Link to this property</a>

ContractedUnitPrice: optional number

The agreed-upon unit price for a single PricingUnit of the associated billable metric, inclusive of negotiated discounts, if present, while excluding any other discounts.

<a href="#">Link to this property</a>

EffectiveCost: optional number

The amortized cost of the charge after applying all reduced rates, discounts, and the applicable portion of relevant, prepaid purchases (one-time or recurring) that covered the charge.

<a href="#">Link to this property</a>

ListCost: optional number

Cost calculated by multiplying ListUnitPrice and the corresponding PricingQuantity.

<a href="#">Link to this property</a>

ListUnitPrice: optional number

Suggested provider-published unit price for a single PricingUnit of the associated billable metric, exclusive of any discounts.

<a href="#">Link to this property</a>

PricingQuantity: optional number

Volume of a given service used or purchased, based on the PricingUnit.

<a href="#">Link to this property</a>

PricingUnit: optional string

Provider-specified measurement unit for determining unit prices, indicating how the provider rates measured usage after applying pricing rules like block pricing.

<a href="#">Link to this property</a>

RegionId: optional string

Provider-assigned identifier for an isolated geographic area where a service is provided.

<a href="#">Link to this property</a>

RegionName: optional string

Name of an isolated geographic area where a service is provided.

<a href="#">Link to this property</a>

SubAccountId: optional string

Unique identifier assigned to a grouping of services. For Cloudflare, this is the subscription or contract ID.

<a href="#">Link to this property</a>

SubAccountName: optional string

Name assigned to a grouping of services. For Cloudflare, this is the subscription or contract display name.

<a href="#">Link to this property</a>

<details>

<summary>

Tags: optional map\[stringor true]

Tag values for the requested <code>GroupBy</code> keys. Omitted when <code>GroupBy</code> is not provided. Missing keys are omitted, and key-only tags are returned as boolean <code>true</code>. All other tag values are strings.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

true

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

x\_ProductCategoryName: optional string

The product category the charge belongs to (e.g., “Developer”, “Cloudflare One”). Cloudflare extension; replaces FOCUS ServiceCategory.

<a href="#">Link to this property</a>

x\_ProductFamilyId: optional string

The unique identifier for the product family in the Cloudflare catalog. Cloudflare extension; replaces FOCUS ServiceId.

<a href="#">Link to this property</a>

x\_ProductFamilyName: optional string

The product family the charge belongs to (e.g., “R2”, “Workers”). Cloudflare extension; replaces FOCUS ServiceName.

<a href="#">Link to this property</a>

x\_ZoneId: optional string

The identifier for the Cloudflare zone (zone tag). Cloudflare extension.

<a href="#">Link to this property</a>

x\_ZoneName: optional string

The display name of the Cloudflare zone. Cloudflare extension.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.usage%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Indicates whether the API call was successful.

[Link to this property](#)%20billing.usage%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Account Usage (Version 2, Alpha, Restricted)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/billable/usage \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "message": "message",
      "code": 0
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 0
    }
  ],
  "result": [
    {
      "BillingAccountId": "023e105f4ecef8ad9ca31a8372d0c353",
      "BillingAccountName": "My Account",
      "ChargeCategory": "Usage",
      "ChargeDescription": "Workers Standard Requests — daily usage",
      "ChargeFrequency": "Usage-Based",
      "ChargePeriodEnd": "2025-05-02T00:00:00Z",
      "ChargePeriodStart": "2025-05-01T00:00:00Z",
      "ConsumedQuantity": 150000,
      "ConsumedUnit": "Requests",
      "HostProviderName": "Cloudflare",
      "InvoiceIssuerName": "Cloudflare",
      "ServiceProviderName": "Cloudflare",
      "x_BillableMetricId": "workers_standard_requests",
      "x_BillableMetricName": "Workers Standard Requests",
      "BilledCost": 0,
      "BillingCurrency": "USD",
      "BillingPeriodEnd": "2025-06-01T00:00:00Z",
      "BillingPeriodStart": "2025-05-01T00:00:00Z",
      "ChargeClass": "Correction",
      "ContractedCost": 0.75,
      "ContractedUnitPrice": 0.000005,
      "EffectiveCost": 0,
      "ListCost": 0.75,
      "ListUnitPrice": 0.000005,
      "PricingQuantity": 150000,
      "PricingUnit": "Requests",
      "RegionId": "EEUR",
      "RegionName": "Eastern Europe",
      "SubAccountId": "c9bd752d-9ca8-411d-b804-be44a758057f",
      "SubAccountName": "My Subscription",
      "Tags": {
        "team": "fintech"
      },
      "x_ProductCategoryName": "Developer",
      "x_ProductFamilyId": "workers",
      "x_ProductFamilyName": "Workers",
      "x_ZoneId": "023e105f4ecef8ad9ca31a8372d0c353",
      "x_ZoneName": "example.com"
    }
  ],
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "message",
      "code": 0
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 0
    }
  ],
  "result": [
    {
      "BillingAccountId": "023e105f4ecef8ad9ca31a8372d0c353",
      "BillingAccountName": "My Account",
      "ChargeCategory": "Usage",
      "ChargeDescription": "Workers Standard Requests — daily usage",
      "ChargeFrequency": "Usage-Based",
      "ChargePeriodEnd": "2025-05-02T00:00:00Z",
      "ChargePeriodStart": "2025-05-01T00:00:00Z",
      "ConsumedQuantity": 150000,
      "ConsumedUnit": "Requests",
      "HostProviderName": "Cloudflare",
      "InvoiceIssuerName": "Cloudflare",
      "ServiceProviderName": "Cloudflare",
      "x_BillableMetricId": "workers_standard_requests",
      "x_BillableMetricName": "Workers Standard Requests",
      "BilledCost": 0,
      "BillingCurrency": "USD",
      "BillingPeriodEnd": "2025-06-01T00:00:00Z",
      "BillingPeriodStart": "2025-05-01T00:00:00Z",
      "ChargeClass": "Correction",
      "ContractedCost": 0.75,
      "ContractedUnitPrice": 0.000005,
      "EffectiveCost": 0,
      "ListCost": 0.75,
      "ListUnitPrice": 0.000005,
      "PricingQuantity": 150000,
      "PricingUnit": "Requests",
      "RegionId": "EEUR",
      "RegionName": "Eastern Europe",
      "SubAccountId": "c9bd752d-9ca8-411d-b804-be44a758057f",
      "SubAccountName": "My Subscription",
      "Tags": {
        "team": "fintech"
      },
      "x_ProductCategoryName": "Developer",
      "x_ProductFamilyId": "workers",
      "x_ProductFamilyName": "Workers",
      "x_ZoneId": "023e105f4ecef8ad9ca31a8372d0c353",
      "x_ZoneName": "example.com"
    }
  ],
  "success": true
}
```