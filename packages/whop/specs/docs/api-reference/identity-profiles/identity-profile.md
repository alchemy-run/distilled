> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Identity Profile

> A consolidated identity or business profile synced from verification provider data.

<ResponseExample>
  ```json Example theme={null}
  {
  	"business_address": {
  		"city": "<string>",
  		"country": "<string>",
  		"line1": "<string>",
  		"line2": "<string>",
  		"postal_code": "<string>",
  		"state": "<string>"
  	},
  	"business_name": "<string>",
  	"business_structure": "<string>",
  	"country": "<string>",
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"date_of_birth": "<string>",
  	"email": "<string>",
  	"first_name": "<string>",
  	"id": "idpf_xxxxxxxxxxxxx",
  	"last_name": "<string>",
  	"linked_companies": [
  		{
  			"id": "biz_xxxxxxxxxxxxxx",
  			"title": "Pickaxe"
  		}
  	],
  	"payout_status": "connected",
  	"payouts_enabled": true,
  	"personal_address": {
  		"city": "<string>",
  		"country": "<string>",
  		"line1": "<string>",
  		"line2": "<string>",
  		"postal_code": "<string>",
  		"state": "<string>"
  	},
  	"phone": "<string>",
  	"profile_type": "<string>",
  	"status": "not_started",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"verifications": [
  		{
  			"created_at": "2023-12-01T05:00:00.401Z",
  			"id": "verf_xxxxxxxxxxxxx",
  			"last_error_code": "abandoned",
  			"last_error_reason": "Document image was too blurry to read.",
  			"session_url": "https://verify.stripe.com/session/abc123",
  			"status": "requires_input"
  		}
  	]
  }
  ```
</ResponseExample>

<ResponseField name="business_address" type="object | null" required>
  Registered business address reported by the identity provider. Present on `business` profiles.

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
  Business entity name. Present on `business` profiles.
</ResponseField>

<ResponseField name="business_structure" type="string | null" required>
  Reported legal structure of a business profile (e.g. `corp`, `llc`).
  Provider-specific values; present on `business` profiles.
</ResponseField>

<ResponseField name="country" type="string | null" required>
  ISO 3166-1 alpha-2 country code reported by the identity provider, such as
  `US` or `GB`. For individuals this is the country of citizenship or residence;
  for businesses, the country of incorporation.
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  When the identity profile was first created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="date_of_birth" type="string | null" required>
  ISO date (`YYYY-MM-DD`) reported by the identity provider. Present on
  `individual` profiles.
</ResponseField>

<ResponseField name="email" type="string | null" required>
  Email address reported by the identity provider. Typically present on
  `individual` profiles.
</ResponseField>

<ResponseField name="first_name" type="string | null" required>
  Individual's first name.
</ResponseField>

<ResponseField name="id" type="string" required>
  The tag of the identity profile (idpf\_xxx).

  Example: `idpf_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="last_name" type="string | null" required>
  Individual's last name.
</ResponseField>

<ResponseField name="linked_companies" type="array<object>" required>
  The companies this identity profile is currently linked to. Only populated for direct Whop user sessions; always empty when authenticated via API key, app, or OAuth scope (a single identity can be linked to companies the calling platform is not entitled to see).

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company.

      Example: `biz_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the company shown to customers.

      Example: `Pickaxe`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="payout_status" type="PayoutAccountCalculatedStatuses" required>
  Progress of payout-account setup for this profile, independent of holds. `connected` means onboarding is complete; a `connected` status paired with `payouts_enabled: false` indicates an active account restriction rather than incomplete setup.

  Available options: `connected`, `disabled`, `action_required`, `pending_verification`, `verification_failed`, `manual_review`, `denied`, `not_started`, `blocked_by_parent`
</ResponseField>

<ResponseField name="payouts_enabled" type="boolean" required>
  Whether this profile can receive payouts right now. True only when payout
  onboarding is complete and no payout holds are active on the linked account.
  Treat this as the single source of truth for payout readiness.
</ResponseField>

<ResponseField name="personal_address" type="object | null" required>
  Residential address reported by the identity provider. Present on `individual` profiles.

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

<ResponseField name="phone" type="string | null" required>
  Phone number reported by the identity provider. Typically present on
  `individual` profiles.
</ResponseField>

<ResponseField name="profile_type" type="string" required>
  Whether this is an 'individual' or 'business' profile.
</ResponseField>

<ResponseField name="status" type="IdentityProfileStatuses" required>
  Derived verification status across all linked verifications. Returns `action_required` whenever the profile has an open request for information (whether a verification, payout, or audit RFI) — i.e. the merchant must submit something before it is in good standing.

  Available options: `not_started`, `pending`, `manual_review`, `approved`, `rejected`, `action_required`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  When the identity profile was last synced from a verification.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="verifications" type="array<object>" required>
  All verification attempts attached to this identity profile, ordered most-recent first.

  <Expandable title="child attributes">
    <ResponseField name="created_at" type="string<date-time>" required>
      When the verification record was created.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

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

    <ResponseField name="session_url" type="string | null" required>
      A URL the user can visit to complete the verification process. Null if the session does not require user interaction.

      Example: `https://verify.stripe.com/session/abc123`
    </ResponseField>

    <ResponseField name="status" type="VerificationStatuses" required>
      The current status of this verification session.

      Available options: `requires_input`, `processing`, `verified`, `canceled`, `created`, `started`, `submitted`, `approved`, `declined`, `resubmission_requested`, `expired`, `abandoned`, `review`, `action_required`, `manual_review`
    </ResponseField>
  </Expandable>
</ResponseField>
