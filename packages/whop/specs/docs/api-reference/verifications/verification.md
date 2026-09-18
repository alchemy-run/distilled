> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Verification

> An identity verification session used to confirm a person or entity's identity for payout account eligibility.

<Note>
  This resource has a successor in the [Whop
  API](/api-reference/beta/verifications/verification), the versioned API that
  new integrations should build on. This page stays fully supported.
</Note>

A Verification guides a person or business through the identity checks required for an account to receive payouts. Individuals complete Know Your Customer (KYC) checks, and businesses complete Know Your Business (KYB) checks. For example, create a Verification before a user's first payout. You can prefill their name and address so they can complete the hosted form without a custom verification UI. Later, use the same Verification to retrieve their verified identity data and respond to [RFIs](/developer/verification/rfis) from downstream payout providers.

Create a Verification when an account needs to be verified before transacting — typically before their first [payout](/api-reference/beta/payouts/payout). Before creating, make sure you have an [account](/api-reference/companies/company) with a ledger account (created automatically when you create the account). Don't create multiple Verifications of the same `kind` on the same account — each account supports at most one active individual (KYC) and one business (KYB) profile. The Verification transitions through multiple statuses as the user completes the process: `pending` while they're going through KYC, `approved` once identity is confirmed, `rejected` if the provider declines, and `action_required` when a payout provider needs additional information like a bank statement or tax ID.

Successful Verifications result in a fully verified identity with confirmed name, date of birth, country, and address — unlocking the account for [payouts](/api-reference/payout-accounts/payout-account). If you create a Verification with pre-fill fields (`first_name`, `address`, etc.), it automatically seeds both the verification and the hosted KYC form so the user doesn't re-enter information you already have. We recommend listening for the `identity_profile.approved` and `identity_profile.rejected` [webhooks](/api-reference/webhooks/webhook) rather than polling, to react to status changes in real time. By using Verifications, you can onboard users for payouts through a single API integration, even as the underlying KYC providers and compliance requirements change over time.

## Endpoints

| Method   | Path                                   | Description                                                                           |
| -------- | -------------------------------------- | ------------------------------------------------------------------------------------- |
| `GET`    | `/verifications?account_id={biz_ tag}` | [List verifications](/developer/verification/retrieve) for an account                 |
| `GET`    | `/verifications/{verification_id}`     | [Retrieve a single verification](/developer/verification/retrieve) by its `idpf_` tag |
| `POST`   | `/verifications`                       | [Create a verification](/developer/verification/overview) and start a KYC/KYB session |
| `PATCH`  | `/verifications/{verification_id}`     | [Update identity fields or respond to RFIs](/developer/verification/manage)           |
| `DELETE` | `/verifications/{verification_id}`     | [Soft-delete](/developer/verification/manage) and unlink from the account             |

## Statuses

| Status            | Description                                             | Next step                                                      |
| ----------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| `not_started`     | Verification exists but no KYC session has been started | Call `POST /verifications` to start                            |
| `pending`         | User needs to complete KYC at the `session_url`         | Redirect the user to `session_url`                             |
| `approved`        | KYC passed — the account can transact                   | No action needed                                               |
| `rejected`        | KYC was declined by the provider                        | Call `POST /verifications` with `restart: true`                |
| `action_required` | A payout provider needs additional information          | Check `rfis` array and [respond](/developer/verification/rfis) |

<ResponseExample>
  ```json Example theme={null}
  {
  	"id": "verf_xxxxxxxxxxxxx",
  	"last_error_code": "abandoned",
  	"last_error_reason": "Document image was too blurry to read.",
  	"status": "requires_input"
  }
  ```
</ResponseExample>

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
