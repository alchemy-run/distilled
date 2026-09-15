---
title: Get Account Billable Usage (Version 1, Alpha)
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

[Usage](https://developers.cloudflare.com/api/resources/billing/subresources/usage)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Account Billable Usage (Version 1, Alpha)

Deprecated: Use \`get\_account\_usage\_v1\` instead.

GET/accounts/{account\_id}/billable-usage

Returns billable usage data for the account. When no query parameters are provided, returns usage for the current billing period.

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

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

from: optional string

Start date for the usage query (ISO 8601). The provided time range must include the subscription billing cycle anchor day, otherwise no usage data is returned. Use the info endpoint to retrieve the subscription anchor day.

formatdate

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo%20%3E%20(params)%20default%20%3E%20(param)%20from%20%3E%20(schema)>)

to: optional string

End date for the usage query (ISO 8601).

formatdate

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo%20%3E%20(params)%20default%20%3E%20(param)%20to%20%3E%20(schema)>)

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

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {BilledCost, BillingAccountId, BillingAccountName, 24 more }

Contains the array of billable usage records.

</summary>

BilledCost: number

The amount invoiced for this charge. PayGo is billed directly by Cloudflare, so this equals ContractedCost.

<a href="#">Link to this property</a>

BillingAccountId: string

The identifier of the account the charge is billed to (account tag).

<a href="#">Link to this property</a>

BillingAccountName: string

The display name of the billing account. Null when the name could not be resolved.

<a href="#">Link to this property</a>

BillingCurrency: string

Specifies the billing currency code (ISO 4217).

<a href="#">Link to this property</a>

BillingPeriodStart: string

Indicates the start of the billing period. There is no <code>BillingPeriodEnd</code> counterpart; see the known gaps described on this schema.

formatdate-time

<a href="#">Link to this property</a>

ChargeCategory: "Usage"

Describes the nature of the charge. Always “Usage” for this endpoint, which only returns metered usage.

<a href="#">Link to this property</a>

ChargeClass: string

Indicates whether the row corrects a previously invoiced billing period. Always null for this endpoint, which does not return corrections.

<a href="#">Link to this property</a>

ChargeDescription: string

A human-readable summary of the charge.

<a href="#">Link to this property</a>

ChargePeriodEnd: string

Indicates the end of the charge period.

formatdate-time

<a href="#">Link to this property</a>

ChargePeriodStart: string

Indicates the start of the charge period.

formatdate-time

<a href="#">Link to this property</a>

ConsumedQuantity: number

Specifies the quantity consumed during this charge period.

<a href="#">Link to this property</a>

ConsumedUnit: string

A display name for the unit of measurement used for the product (for example, “GB-months”, “GB-seconds”). May be empty when the unit is implicit in the service name.

<a href="#">Link to this property</a>

ContractedCost: number

Specifies the cost for this charge period in the billing currency.

<a href="#">Link to this property</a>

CumulatedContractedCost: number

Specifies the cumulated cost for the billing period in the billing currency.

<a href="#">Link to this property</a>

CumulatedPricingQuantity: number

Specifies the portion of usage that is actually subject to a unit price.

<a href="#">Link to this property</a>

EffectiveCost: number

The amortized cost of the charge. PayGo has no upfront commitments, so this equals ContractedCost.

<a href="#">Link to this property</a>

HostProviderName: string

The provider that hosts the infrastructure or platform the service runs on.

<a href="#">Link to this property</a>

InvoiceIssuerName: string

The entity that issues the invoice for this charge.

<a href="#">Link to this property</a>

ListCost: number

The cost at published list prices, before any discount. PayGo has no commitment discounts, so this equals ContractedCost.

<a href="#">Link to this property</a>

PricingQuantity: number

Specifies the pricing quantity for this charge period.

<a href="#">Link to this property</a>

PricingUnit: string

The unit that PricingQuantity is expressed in. Unlike ConsumedUnit this is never empty; it falls back to “Count” when the service has no explicit unit.

<a href="#">Link to this property</a>

ServiceName: string

Identifies the Cloudflare service.

<a href="#">Link to this property</a>

ServiceProviderName: string

The provider of the purchased service.

<a href="#">Link to this property</a>

ServiceFamilyName: optional string

Identifies the product family for the Cloudflare service.

<a href="#">Link to this property</a>

SubscriptionId: optional string

The identifier for the Cloudflare subscription.

<a href="#">Link to this property</a>

ZoneId: optional string

The identifier for the Cloudflare zone (zone tag).

<a href="#">Link to this property</a>

ZoneName: optional string

The display name of the Cloudflare zone.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Indicates whether the API call was successful.

[Link to this property](#)%20billing.usage%20%3E%20(method)%20paygo%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Account Billable Usage (Version 1, Alpha)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/billable-usage \
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
      "BilledCost": 0.75,
      "BillingAccountId": "023e105f4ecef8ad9ca31a8372d0c353",
      "BillingAccountName": "Example Account",
      "BillingCurrency": "USD",
      "BillingPeriodStart": "2025-02-01T00:00:00Z",
      "ChargeCategory": "Usage",
      "ChargeClass": "ChargeClass",
      "ChargeDescription": "Workers Standard usage measured in Count",
      "ChargePeriodEnd": "2025-02-02T00:00:00Z",
      "ChargePeriodStart": "2025-02-01T00:00:00Z",
      "ConsumedQuantity": 150000,
      "ConsumedUnit": "GB-months",
      "ContractedCost": 0.75,
      "CumulatedContractedCost": 2.25,
      "CumulatedPricingQuantity": 4500000,
      "EffectiveCost": 0.75,
      "HostProviderName": "Cloudflare, Inc.",
      "InvoiceIssuerName": "Cloudflare, Inc.",
      "ListCost": 0.75,
      "PricingQuantity": 150000,
      "PricingUnit": "Count",
      "ServiceName": "Workers Standard",
      "ServiceProviderName": "Cloudflare, Inc.",
      "ServiceFamilyName": "Workers",
      "SubscriptionId": "3F3CD4CQ6N7FXO7IK6NVFJBOYA",
      "ZoneId": "023e105f4ecef8ad9ca31a8372d0c353",
      "ZoneName": "example.com"
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
      "BilledCost": 0.75,
      "BillingAccountId": "023e105f4ecef8ad9ca31a8372d0c353",
      "BillingAccountName": "Example Account",
      "BillingCurrency": "USD",
      "BillingPeriodStart": "2025-02-01T00:00:00Z",
      "ChargeCategory": "Usage",
      "ChargeClass": "ChargeClass",
      "ChargeDescription": "Workers Standard usage measured in Count",
      "ChargePeriodEnd": "2025-02-02T00:00:00Z",
      "ChargePeriodStart": "2025-02-01T00:00:00Z",
      "ConsumedQuantity": 150000,
      "ConsumedUnit": "GB-months",
      "ContractedCost": 0.75,
      "CumulatedContractedCost": 2.25,
      "CumulatedPricingQuantity": 4500000,
      "EffectiveCost": 0.75,
      "HostProviderName": "Cloudflare, Inc.",
      "InvoiceIssuerName": "Cloudflare, Inc.",
      "ListCost": 0.75,
      "PricingQuantity": 150000,
      "PricingUnit": "Count",
      "ServiceName": "Workers Standard",
      "ServiceProviderName": "Cloudflare, Inc.",
      "ServiceFamilyName": "Workers",
      "SubscriptionId": "3F3CD4CQ6N7FXO7IK6NVFJBOYA",
      "ZoneId": "023e105f4ecef8ad9ca31a8372d0c353",
      "ZoneName": "example.com"
    }
  ],
  "success": true
}
```