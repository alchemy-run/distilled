> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Ledger Account

> A ledger account represents a financial account on Whop that can hold many balances.

<ResponseExample>
  ```json Example theme={null}
  {
  	"balances": [
  		{
  			"balance": 6.9,
  			"currency": "usd",
  			"pending_balance": 6.9,
  			"reserve_balance": 6.9
  		}
  	],
  	"id": "ldgr_xxxxxxxxxxxxx",
  	"ledger_type": "primary",
  	"owner": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"typename": "User",
  		"username": "johndoe42"
  	},
  	"payments_approval_status": "pending",
  	"payout_account_details": {
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
  	},
  	"settlement_time_at": "2023-12-01T05:00:00.401Z",
  	"transfer_fee": 6.9,
  	"treasury_balance": {
  		"balance": 6.9,
  		"balance_usd": 6.9,
  		"currency": "usd",
  		"pending_balance": 6.9,
  		"reserve_balance": 6.9,
  		"total_withdrawable_balance": 6.9
  	}
  }
  ```
</ResponseExample>

<ResponseField name="balances" type="array<object>" required>
  The balances associated with the account.

  <Expandable title="child attributes">
    <ResponseField name="balance" type="number" required>
      The amount of the balance.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="currency" type="Currencies" required>
      The currency of the balance.

      Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
    </ResponseField>

    <ResponseField name="pending_balance" type="number" required>
      The amount of the balance that is pending.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="reserve_balance" type="number" required>
      The amount of the balance that is reserved.

      Example: `6.9`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the ledger account.

  Example: `ldgr_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="ledger_type" type="LedgerTypes" required>
  The type of ledger account.

  Available options: `primary`, `pool`
</ResponseField>

<ResponseField name="owner" type="User or Company | null" required>
  The owner of the ledger account.

  <Expandable title="User">
    <ResponseField name="id" type="string" required>
      The unique identifier for the user.

      Example: `user_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      The user's display name shown on their public profile.

      Example: `John Doe`
    </ResponseField>

    <ResponseField name="typename" type="string" required>
      The typename of this object
    </ResponseField>

    <ResponseField name="username" type="string" required>
      The user's unique username shown on their public profile.

      Example: `johndoe42`
    </ResponseField>
  </Expandable>

  <Expandable title="Company">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company.

      Example: `biz_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="route" type="string" required>
      URL slug for the account's store page, e.g. `pickaxe` in whop.com/pickaxe.

      Example: `pickaxe`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the company shown to customers.

      Example: `Pickaxe`
    </ResponseField>

    <ResponseField name="typename" type="string" required>
      The typename of this object
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="payments_approval_status" type="PaymentsApprovalStatuses | null" required>
  The status of payments approval for the ledger account.

  Available options: `pending`, `approved`, `monitoring`, `rejected`
</ResponseField>

<ResponseField name="payout_account_details" type="object | null" required>
  The payout account associated with the LedgerAccount, if any.

  <Expandable title="child attributes">
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
  </Expandable>
</ResponseField>

<ResponseField name="settlement_time_at" type="string<date-time> | null" required>
  The settlement batch most recently posted to this account's available balance, at midnight UTC. Every payment settling in that batch carries the same `settlement_time_at`.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="transfer_fee" type="number | null" required>
  The fee for transfers, if applicable.

  Example: `6.9`
</ResponseField>

<ResponseField name="treasury_balance" type="object | null" required>
  The balance cache associated with the account by currency.

  <Expandable title="child attributes">
    <ResponseField name="balance" type="number" required>
      The amount of the balance.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="balance_usd" type="number" required>
      The balance converted to USD.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="currency" type="Currencies" required>
      The currency of the balance.

      Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
    </ResponseField>

    <ResponseField name="pending_balance" type="number" required>
      The amount of the balance that is pending.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="reserve_balance" type="number" required>
      The amount of the balance that is reserved.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="total_withdrawable_balance" type="number" required>
      The amount of the balance that is withdrawable.

      Example: `6.9`
    </ResponseField>
  </Expandable>
</ResponseField>
