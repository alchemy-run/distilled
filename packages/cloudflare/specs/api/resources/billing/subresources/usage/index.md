---
title: Usage
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Usage

##### [Get Account Billable Usage Info (Version 1, Alpha)](https://developers.cloudflare.com/api/resources/billing/subresources/usage/methods/paygo_info)

Deprecated

GET/accounts/{account\_id}/billable-usage/info

##### [Get Account Billable Usage (Version 1, Alpha)](https://developers.cloudflare.com/api/resources/billing/subresources/usage/methods/paygo)

Deprecated

GET/accounts/{account\_id}/billable-usage

##### [Get Account Usage (Version 2, Alpha, Restricted)](https://developers.cloudflare.com/api/resources/billing/subresources/usage/methods/get)

Deprecated

GET/accounts/{account\_id}/billable/usage

##### [Get Account Billable Usage Info (Version 1, Alpha)](https://developers.cloudflare.com/api/resources/billing/subresources/usage/methods/get_account_usage_info_v1)

GET/accounts/{account\_id}/billable-usage/info

##### [Get Account Billable Usage (Version 1, Alpha)](https://developers.cloudflare.com/api/resources/billing/subresources/usage/methods/get_account_usage_v1)

GET/accounts/{account\_id}/billable-usage

##### [Get Account Usage (Version 2, Alpha, Restricted)](https://developers.cloudflare.com/api/resources/billing/subresources/usage/methods/get_account_usage_v2)

GET/accounts/{account\_id}/billable/usage

##### ModelsExpand Collapse

<details>

<summary>

UsagePaygoInfoResponse object {covered, subscriptions }

Contains the usage info.

</summary>

covered: boolean

Indicates whether the account is covered.

<a href="#">Link to this property</a>

<details>

<summary>

subscriptions: array of object {id, billing\_cycle\_anchor\_timestamp, start\_timestamp, end\_timestamp }

List of subscriptions for the account.

</summary>

id: string

The identifier for the Cloudflare subscription.

<a href="#">Link to this property</a>

billing\_cycle\_anchor\_timestamp: string

The subscription billing cycle anchor timestamp.

formatdate-time

<a href="#">Link to this property</a>

start\_timestamp: string

The subscription start timestamp.

formatdate-time

<a href="#">Link to this property</a>

end\_timestamp: optional string

The subscription end timestamp. Omitted for active subscriptions; present only when the subscription has been cancelled.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.usage%20%3E%20(model)%20usage_paygo_info_response%20%3E%20(schema)>)

<details>

<summary>

UsagePaygoResponse = array of object {BilledCost, BillingAccountId, BillingAccountName, 24 more }

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

[Link to this property](#)%20billing.usage%20%3E%20(model)%20usage_paygo_response%20%3E%20(schema)>)

<details>

<summary>

UsageGetResponse = array of object {BillingAccountId, BillingAccountName, ChargeCategory, 33 more }

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

[Link to this property](#)%20billing.usage%20%3E%20(model)%20usage_get_response%20%3E%20(schema)>)

<details>

<summary>

UsageGetAccountUsageInfoV1Response object {covered, subscriptions }

Contains the usage info.

</summary>

covered: boolean

Indicates whether the account is covered.

<a href="#">Link to this property</a>

<details>

<summary>

subscriptions: array of object {id, billing\_cycle\_anchor\_timestamp, start\_timestamp, end\_timestamp }

List of subscriptions for the account.

</summary>

id: string

The identifier for the Cloudflare subscription.

<a href="#">Link to this property</a>

billing\_cycle\_anchor\_timestamp: string

The subscription billing cycle anchor timestamp.

formatdate-time

<a href="#">Link to this property</a>

start\_timestamp: string

The subscription start timestamp.

formatdate-time

<a href="#">Link to this property</a>

end\_timestamp: optional string

The subscription end timestamp. Omitted for active subscriptions; present only when the subscription has been cancelled.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.usage%20%3E%20(model)%20usage_get_account_usage_info_v1_response%20%3E%20(schema)>)

<details>

<summary>

UsageGetAccountUsageV1Response = array of object {BilledCost, BillingAccountId, BillingAccountName, 24 more }

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

[Link to this property](#)%20billing.usage%20%3E%20(model)%20usage_get_account_usage_v1_response%20%3E%20(schema)>)

<details>

<summary>

UsageGetAccountUsageV2Response = array of object {BillingAccountId, BillingAccountName, ChargeCategory, 33 more }

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

[Link to this property](#)%20billing.usage%20%3E%20(model)%20usage_get_account_usage_v2_response%20%3E%20(schema)>)