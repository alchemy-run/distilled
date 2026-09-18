> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Payout Account

> An object representing an account used for payouts.

<ResponseExample>
  ```json Example theme={null}
  {
  	"address": {
  		"city": "<string>",
  		"country": "<string>",
  		"line1": "<string>",
  		"line2": "<string>",
  		"postal_code": "<string>",
  		"state": "<string>"
  	},
  	"business_name": "<string>",
  	"business_representative": {
  		"date_of_birth": "<string>",
  		"first_name": "<string>",
  		"last_name": "<string>",
  		"middle_name": "<string>"
  	},
  	"email": "<string>",
  	"id": "poact_xxxxxxxxxxxx",
  	"latest_verification": {
  		"id": "verf_xxxxxxxxxxxxx",
  		"last_error_code": "abandoned",
  		"last_error_reason": "Document image was too blurry to read.",
  		"status": "requires_input"
  	},
  	"phone": "<string>",
  	"status": "connected"
  }
  ```
</ResponseExample>

<ResponseField name="address" type="object | null" required>
  The physical address associated with this payout account

  <Expandable title="child attributes">
    <ResponseField name="city" type="string | null" required>
      The city of the address.
    </ResponseField>

    <ResponseField name="country" type="string | null" required>
      The country of the address.
    </ResponseField>

    <ResponseField name="line1" type="string | null" required>
      The line 1 of the address.
    </ResponseField>

    <ResponseField name="line2" type="string | null" required>
      The line 2 of the address.
    </ResponseField>

    <ResponseField name="postal_code" type="string | null" required>
      The postal code of the address.
    </ResponseField>

    <ResponseField name="state" type="string | null" required>
      The state of the address.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="business_name" type="string | null" required>
  The company's legal name
</ResponseField>

<ResponseField name="business_representative" type="object | null" required>
  The business representative for this payout account

  <Expandable title="child attributes">
    <ResponseField name="date_of_birth" type="string | null" required>
      The date of birth of the business representative in ISO 8601 format
      (YYYY-MM-DD).
    </ResponseField>

    <ResponseField name="first_name" type="string | null" required>
      The first name of the business representative.
    </ResponseField>

    <ResponseField name="last_name" type="string | null" required>
      The last name of the business representative.
    </ResponseField>

    <ResponseField name="middle_name" type="string | null" required>
      The middle name of the business representative.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="email" type="string | null" required>
  The email address of the representative
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the payout account.

  Example: `poact_xxxxxxxxxxxx`
</ResponseField>

<ResponseField name="latest_verification" type="object | null" required>
  The latest verification for the connected account.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The numeric id of the verification record.

      Example: `verf_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="last_error_code" type="VerificationErrorCodes | null" required>
      The most recent error code returned during verification. Null if no error has occurred.

      Available options: `abandoned`, `consent_declined`, `country_not_supported`, `device_not_supported`, `document_expired`, `document_type_not_supported`, `document_unverified_other`, `email_unverified_other`, `email_verification_declined`, `id_number_insufficient_document_data`, `id_number_mismatch`, `id_number_unverified_other`, `phone_unverified_other`, `phone_verification_declined`, `selfie_document_missing_photo`, `selfie_face_mismatch`, `selfie_manipulated`, `selfie_unverified_other`, `under_supported_age`
    </ResponseField>

    <ResponseField name="last_error_reason" type="string | null" required>
      A human-readable explanation of the most recent verification error. Null if no error has occurred.

      Example: `Document image was too blurry to read.`
    </ResponseField>

    <ResponseField name="status" type="VerificationStatuses" required>
      The current status of this verification session.

      Available options: `requires_input`, `processing`, `verified`, `canceled`, `created`, `started`, `submitted`, `approved`, `declined`, `resubmission_requested`, `expired`, `abandoned`, `review`, `action_required`, `manual_review`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="phone" type="string | null" required>
  The business representative's phone
</ResponseField>

<ResponseField name="status" type="PayoutAccountCalculatedStatuses | null" required>
  The granular calculated status of the payout account reflecting its current KYC and payout readiness state.

  Available options: `connected`, `disabled`, `action_required`, `pending_verification`, `verification_failed`, `manual_review`, `denied`, `not_started`, `blocked_by_parent`
</ResponseField>
