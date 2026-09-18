> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Shipment

> A physical shipment associated with a payment, including carrier details and tracking information.

<Note>
  This resource has a successor in the [Whop
  API](/api-reference/beta/shipments/list-shipments), the versioned API that new
  integrations should build on. This page stays fully supported.
</Note>

<ResponseExample>
  ```json Example theme={null}
  {
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"delivery_estimate": "2023-12-01T05:00:00.401Z",
  	"id": "ship_xxxxxxxxxxxxx",
  	"payment": {
  		"id": "pay_xxxxxxxxxxxxxx"
  	},
  	"service": "Priority",
  	"status": "unknown",
  	"substatus": "address_correction",
  	"tracking_code": "9400111899223456789012",
  	"updated_at": "2023-12-01T05:00:00.401Z"
  }
  ```
</ResponseExample>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the shipment was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="delivery_estimate" type="string<date-time> | null" required>
  The estimated delivery date for this shipment. Null if the carrier has not provided an estimate.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the shipment.

  Example: `ship_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="payment" type="object | null" required>
  The payment associated with this shipment. Null if the payment has been deleted or is inaccessible.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the payment.

      Example: `pay_xxxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="service" type="string | null" required>
  The shipping service level used for this shipment. Null if the carrier does not specify a service tier.

  Example: `Priority`
</ResponseField>

<ResponseField name="status" type="ShipmentStatuses" required>
  The current delivery status of this shipment.

  Available options: `unknown`, `pre_transit`, `in_transit`, `out_for_delivery`, `delivered`, `available_for_pickup`, `return_to_sender`, `failure`, `cancelled`, `error`
</ResponseField>

<ResponseField name="substatus" type="ShipmentSubstatuses | null" required>
  A more granular status providing additional detail about the shipment's current state. Null if no substatus applies.

  Available options: `address_correction`, `arrived_at_destination`, `arrived_at_facility`, `arrived_at_pickup_location`, `awaiting_information`, `substatus_cancelled`, `damaged`, `delayed`, `delivery_exception`, `departed_facility`, `departed_origin_facility`, `expired`, `substatus_failure`, `held`, `substatus_in_transit`, `label_created`, `lost`, `missorted`, `substatus_out_for_delivery`, `received_at_destination_facility`, `received_at_origin_facility`, `refused`, `return`, `status_update`, `transferred_to_destination_carrier`, `transit_exception`, `substatus_unknown`, `weather_delay`
</ResponseField>

<ResponseField name="tracking_code" type="string" required>
  The carrier-assigned tracking number used to look up shipment progress.

  Example: `9400111899223456789012`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the shipment was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>
