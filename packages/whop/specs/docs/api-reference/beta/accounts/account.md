> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Account

An Account represents a person or business on Whop that can have its own profile, wallet, and account-scoped settings. Use accounts for customers, creators, merchants, sellers, or connected businesses your integration supports.

Use the Accounts API to create accounts, list accounts visible to your credentials, retrieve or update an account, and retrieve the account associated with the current API key.

The `business_type`, `industry_group`, and `industry_type` fields classify accounts. See the [business types and industries glossary](#business-types-and-industries-glossary) for every valid value.

## Endpoints

| Endpoint                                                                                  | Request                                                                                   |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [List Accounts](/api-reference/beta/accounts/list-accounts)                               | <Badge color="blue" size="sm" stroke>GET</Badge> `/accounts`                              |
| [Create Account](/api-reference/beta/accounts/create-account)                             | <Badge color="green" size="sm" stroke>POST</Badge> `/accounts`                            |
| [Retrieve Account](/api-reference/beta/accounts/retrieve-account)                         | <Badge color="blue" size="sm" stroke>GET</Badge> `/accounts/{id}`                         |
| [Update Account](/api-reference/beta/accounts/update-account)                             | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/accounts/{id}`                     |
| [Form Company](/api-reference/beta/accounts/form-company)                                 | <Badge color="green" size="sm" stroke>POST</Badge> `/accounts/{id}/form_company`          |
| [Retrieve Account Preferences](/api-reference/beta/accounts/retrieve-account-preferences) | <Badge color="blue" size="sm" stroke>GET</Badge> `/accounts/{account_id}/preferences`     |
| [Update Account Preferences](/api-reference/beta/accounts/update-account-preferences)     | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/accounts/{account_id}/preferences` |
| [List Account Reserves](/api-reference/beta/accounts/list-account-reserves)               | <Badge color="blue" size="sm" stroke>GET</Badge> `/accounts/{account_id}/reserves`        |
| [Transfer Account Ownership](/api-reference/beta/accounts/transfer-account-ownership)     | <Badge color="green" size="sm" stroke>POST</Badge> `/accounts/{id}/transfer_ownership`    |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Account ID, prefixed `biz_`.
    </ResponseField>

    <ResponseField name="balances" type="object[]" required>
      Account holdings, each with USD value. Empty when `total_usd` is `null`.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="balance" type="string" required>
          Total amount held in native units, as a decimal string.
        </ResponseField>

        <ResponseField name="breakdown" type="object" required>
          Balance split into available, pending, and reserve amounts, as native-unit decimal strings, with the days the pending amount is expected to settle. On-chain crypto is entirely available; good\_funds and fiat cash can have pending or reserve portions.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="available" type="string" required>
              Amount you can spend, send, or withdraw now, in native units, as a decimal
              string.
            </ResponseField>

            <ResponseField name="in_transit" type="string" required>
              Amount moving between the account's own destinations, such as a treasury sweep
              to its crypto wallet or a card top-up. In native units, as a decimal string.
            </ResponseField>

            <ResponseField name="pending" type="string" required>
              Amount from recent payments still settling, in native units, as a decimal
              string.
            </ResponseField>

            <ResponseField name="pending_settlements" type="object[]" required>
              When the pending amount is expected to settle, one entry per day, earliest first. Money with no scheduled settlement day, such as a transfer in flight, is left out — so these can sum to less than `pending`, never more.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="amount" type="string" required>
                  Amount expected that day, in native units, as a decimal string.
                </ResponseField>

                <ResponseField name="date" type="string" required>
                  The day this money is expected to finish settling, as an ISO 8601 date.
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="reserve" type="string" required>
              Amount held back, in native units, as a decimal string. Retrieve the account's reserves for why it is held and when it unlocks.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="icon_url" type="string | null" required>
          Holding icon URL.
        </ResponseField>

        <ResponseField name="name" type="string" required>
          The holding's display name
        </ResponseField>

        <ResponseField name="price_usd" type="number | null" required>
          USD price per unit, or `null` when no exchange rate is available.
        </ResponseField>

        <ResponseField name="symbol" type="string" required>
          Holding display symbol, such as `USDT`, `cbBTC`, or `EUR`.
        </ResponseField>

        <ResponseField name="value_usd" type="string | null" required>
          Holding USD value, or `null` when no exchange rate is available.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="banner_image_url" type="string | null" required>
      Account banner image URL.
    </ResponseField>

    <ResponseField name="business_address" type="object | null" required>
      Account business address used to calculate tax, with `line1`, `line2`, `city`,
      `state`, `postal_code`, and `country`. `null` when no address is set.
    </ResponseField>

    <ResponseField name="business_name" type="string | null" required>
      The account's legal business name used with its tax address.
    </ResponseField>

    <ResponseField name="business_type" type="string | null" required>
      High-level business category for the account. See the [business types and
      industries
      glossary](/api-reference/beta/accounts/account#business-types-and-industries-glossary)
      for valid values.
    </ResponseField>

    <ResponseField name="can_transfer_pending_balance_to_children" type="boolean" required>
      Whether pending funds may be transferred from this platform account to its
      connected accounts.
    </ResponseField>

    <ResponseField name="capabilities" type="object | null" required>
      Payment rails enabled for this account, each `active`, `inactive`, or `pending` (onboarding or review in progress). Computed only on `retrieve` and `me` for callers with `company:balance:read` scope; `null` otherwise.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="accept_bank_payments" type="string" required>
          Bank payins: debits, transfers, and local bank rails

          Available options: `active`, `inactive`, `pending`
        </ResponseField>

        <ResponseField name="accept_bnpl_payments" type="string" required>
          Buy-now-pay-later payins; requires approval

          Available options: `active`, `inactive`, `pending`
        </ResponseField>

        <ResponseField name="accept_card_payments" type="string" required>
          Card payins, including Apple Pay and Google Pay

          Available options: `active`, `inactive`, `pending`
        </ResponseField>

        <ResponseField name="bank_deposit" type="string" required>
          Deposits by bank wire or ACH to the account's virtual bank account

          Available options: `active`, `inactive`, `pending`
        </ResponseField>

        <ResponseField name="card_deposit" type="string" required>
          Balance top-ups by charging a stored payment method

          Available options: `active`, `inactive`, `pending`
        </ResponseField>

        <ResponseField name="card_issuing" type="string" required>
          Issuing Whop cards; requires card application approval

          Available options: `active`, `inactive`, `pending`
        </ResponseField>

        <ResponseField name="crypto_deposit" type="string" required>
          On-chain deposits to the account's crypto wallet

          Available options: `active`, `inactive`, `pending`
        </ResponseField>

        <ResponseField name="crypto_payout" type="string" required>
          On-chain payouts to a crypto wallet

          Available options: `active`, `inactive`, `pending`
        </ResponseField>

        <ResponseField name="instant_payout" type="string" required>
          Instant payouts to an eligible payout destination

          Available options: `active`, `inactive`, `pending`
        </ResponseField>

        <ResponseField name="run_ads" type="string" required>
          Launching ad campaigns through Whop Ads. `inactive` while a requested ads services agreement is awaiting the account's signature.

          Available options: `active`, `inactive`, `pending`
        </ResponseField>

        <ResponseField name="standard_payout" type="string" required>
          Standard payouts to an external payout destination

          Available options: `active`, `inactive`, `pending`
        </ResponseField>

        <ResponseField name="transfer" type="string" required>
          Transfers to other accounts

          Available options: `active`, `inactive`, `pending`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="cards" type="object | null" required>
      Whop Cards application details for the account. Computed only on `retrieve` and `me` for callers with `company:balance:read` scope; `null` otherwise, or when the account has no card application.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="kind" type="string | null" required>
          Whether the card application verifies a business (`business`, KYB) or a person (`individual`, consumer identity). `null` when the application is not yet linked to a verification.

          Available options: `individual`, `business`
        </ResponseField>

        <ResponseField name="status" type="string" required>
          Where the card application stands. `approved` means cards can be issued. `needs_verification` means the applicant has not completed identity verification yet; `needs_information` means they did, but the documents were rejected for a fixable reason and must be resubmitted. `pending` and `manual_review` are in flight. `denied`, `locked`, and `canceled` are terminal.

          Available options: `approved`, `pending`, `manual_review`, `denied`, `locked`, `canceled`, `needs_verification`, `needs_information`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="collect_vat_id" type="boolean" required>
      Whether checkout shows a VAT/tax ID field for buyers to optionally enter. Does
      not require a VAT ID to purchase.
    </ResponseField>

    <ResponseField name="company_formation" type="object" required>
      Company formation state for the account, managed through [Form Company](/api-reference/beta/accounts/form-company). A `draft` `status` until the formation checkout is paid, then filing progress with downloadable documents and signatures awaiting action. Empty when the formation state is temporarily unavailable.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="documents" type="object[]">
          Formation documents available for download, such as the Articles of Organization and the EIN confirmation letter. Present once `status` leaves `draft`.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string" required>
              Document ID, prefixed `file_`.
            </ResponseField>

            <ResponseField name="name" type="string" required>
              Human-readable document name, such as `Articles of Organization`.
            </ResponseField>

            <ResponseField name="type" type="string" required>
              Document category: `articles_of_organization`, `operating_agreement`,
              `ein_letter`, `signed_ss4`, `signed_form8821`, or `mail` for postal
              correspondence received on the company's behalf.
            </ResponseField>

            <ResponseField name="url" type="string" required>
              CDN URL for downloading the document.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="ein_registered" type="boolean">
          Whether the company's EIN has been issued by the IRS. Present once `status`
          leaves `draft`.
        </ResponseField>

        <ResponseField name="legal_name" type="string | null">
          Registered company name including the entity ending, for example `Acme, LLC`.
          Present once `status` leaves `draft`.
        </ResponseField>

        <ResponseField name="signatures" type="object">
          IRS forms still awaiting a founder's signature, each with a hosted signing URL. Present once `status` leaves `draft`; empty when nothing needs signing.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="form8821" type="object">
              Signature state for IRS Form 8821, the tax information authorization. Present only while the form still needs the founder's action.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="expires_at" type="string">
                  When the signing URL expires, as an ISO 8601 timestamp. Present while `status`
                  is `pending`.
                </ResponseField>

                <ResponseField name="status" type="string" required>
                  `pending` when a signing session is ready for the founder; `unknown` when the signature state could not be determined.

                  Available options: `pending`, `unknown`
                </ResponseField>

                <ResponseField name="url" type="string">
                  Hosted signing URL where the founder completes the form. Present while `status` is `pending`.
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="ss4" type="object">
              Signature state for IRS Form SS-4, the EIN application. Present only while the form still needs the founder's action.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="expires_at" type="string">
                  When the signing URL expires, as an ISO 8601 timestamp. Present while `status`
                  is `pending`.
                </ResponseField>

                <ResponseField name="status" type="string" required>
                  `pending` when a signing session is ready for the founder; `unknown` when the signature state could not be determined.

                  Available options: `pending`, `unknown`
                </ResponseField>

                <ResponseField name="url" type="string">
                  Hosted signing URL where the founder completes the form. Present while `status` is `pending`.
                </ResponseField>
              </Accordion>
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="state_registered" type="boolean">
          Whether the state formation filing is complete. Present once `status` leaves
          `draft`.
        </ResponseField>

        <ResponseField name="status" type="string">
          Available options: `draft`, `processing`, `filed`, `rejected`, `completed`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="country" type="string | null" required>
      Country where the account is located.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the account was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="description" type="string | null" required>
      Account promotional description.
    </ResponseField>

    <ResponseField name="email" type="string | null" required>
      Account owner email address.
    </ResponseField>

    <ResponseField name="eula" type="object | null" required>
      The account's end-user license agreement document, or `null` if they have not published one.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          The file's ID, prefixed `file_`.
        </ResponseField>

        <ResponseField name="content_type" type="string | null" required>
          The file's MIME type, e.g. `application/pdf`.
        </ResponseField>

        <ResponseField name="created_at" type="string" required>
          When the file was created, as an ISO 8601 timestamp.
        </ResponseField>

        <ResponseField name="filename" type="string | null" required>
          The original filename, including its extension.
        </ResponseField>

        <ResponseField name="multipart_chunk_size" type="integer | null">
          The byte size each part (except the last) must be. Present only on create, and
          only for multipart uploads.
        </ResponseField>

        <ResponseField name="multipart_upload_id" type="string | null">
          The ID of the multipart upload, passed back to `complete`. Present only on
          create, and only for multipart uploads.
        </ResponseField>

        <ResponseField name="multipart_upload_urls" type="object[] | null">
          The presigned URL for each part. Present only on create, and only for multipart uploads.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="part_number" type="integer" required>
              The 1-based index of this part within the multipart upload.
            </ResponseField>

            <ResponseField name="url" type="string" required>
              The presigned URL to PUT this part's bytes to.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="object" type="string" required>
          The type of this object, always `file`.
        </ResponseField>

        <ResponseField name="size" type="integer | null" required>
          The file size in bytes. `null` until the upload has finished.
        </ResponseField>

        <ResponseField name="upload_headers" type="object">
          Headers to send with the upload PUT. Present only on create.
        </ResponseField>

        <ResponseField name="upload_status" type="string" required>
          Where the file is in its upload lifecycle.

          Available options: `pending`, `processing`, `ready`, `failed`
        </ResponseField>

        <ResponseField name="upload_url" type="string | null">
          Presigned URL to PUT the file's bytes to. Present only on create, and only for
          single-part uploads.
        </ResponseField>

        <ResponseField name="url" type="string | null" required>
          A URL to download the file: a permanent CDN URL for public files, a signed
          expiring URL for private ones. `null` until the upload has finished.
        </ResponseField>

        <ResponseField name="visibility" type="string" required>
          `public` files are served via an unsigned CDN URL; `private` files via a signed, expiring URL.

          Available options: `public`, `private`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="home_preferences" type="string[]" required>
      Public account home page preferences.

      Available options: `hide_member_count`, `hide_members_card`
    </ResponseField>

    <ResponseField name="industry_group" type="string | null" required>
      Account industry group. See the [business types and industries
      glossary](/api-reference/beta/accounts/account#business-types-and-industries-glossary)
      for valid values.
    </ResponseField>

    <ResponseField name="industry_type" type="string | null" required>
      Specific industry vertical for the account. See the [business types and
      industries
      glossary](/api-reference/beta/accounts/account#business-types-and-industries-glossary)
      for valid values.
    </ResponseField>

    <ResponseField name="invoice_prefix" type="string | null" required>
      Prefix used for account invoices.
    </ResponseField>

    <ResponseField name="logo_url" type="string | null" required>
      Account logo image URL.
    </ResponseField>

    <ResponseField name="metadata" type="object" required>
      Arbitrary key/value metadata supplied at account creation.
    </ResponseField>

    <ResponseField name="onboarding_type" type="string | null" required>
      Type of onboarding the account has completed.

      Available options: `platform`, `seller`
    </ResponseField>

    <ResponseField name="opengraph_image_url" type="string | null" required>
      Account Open Graph image URL.
    </ResponseField>

    <ResponseField name="opengraph_image_variant" type="string | null" required>
      Account Open Graph image variant.

      Available options: `white`, `black`, `orange`
    </ResponseField>

    <ResponseField name="other_business_description" type="string | null" required>
      Business type details when business\_type is `other`.
    </ResponseField>

    <ResponseField name="other_industry_description" type="string | null" required>
      Industry details when industry\_type is `other`.
    </ResponseField>

    <ResponseField name="owner" type="object" required>
      The single user who owns the account, whose email is the `email` above. Distinct from the `owner` role on team members, which any number of them can hold.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          User ID, prefixed `user_`.
        </ResponseField>

        <ResponseField name="name" type="string | null" required>
          Display name.
        </ResponseField>

        <ResponseField name="profile_picture" type="object" required>
          Avatar wrapper; its `url` is always present, using a generated placeholder when the user set no picture.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="url" type="string" required>
              Avatar image URL. Always present — a generated placeholder when the user set no picture.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="username" type="string" required>
          Public username.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="parent_account" type="object | null" required>
      Parent account for connected accounts, or `null` for standalone accounts.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Account ID, prefixed `biz_`.
        </ResponseField>

        <ResponseField name="logo_url" type="string | null" required>
          Account logo image URL.
        </ResponseField>

        <ResponseField name="route" type="string" required>
          Account public route identifier.
        </ResponseField>

        <ResponseField name="title" type="string" required>
          Account display name.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="payment_controls" type="object | null" required>
      Payment health controls currently applied to the account. Computed only on `retrieve` and `me` for callers with `company:balance:read` scope; `null` otherwise.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="dispute_alert_auto_refund" type="object" required>
          Automatic refund settings for pre-chargeback dispute alerts.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="locked" type="boolean" required>
              Whether the account owner is prevented from changing this threshold.
            </ResponseField>

            <ResponseField name="threshold_usd" type="number | null" required>
              Maximum dispute alert amount automatically refunded in USD. `null` when automatic refunds are disabled.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="dispute_alert_fee_usd" type="number | null" required>
          Fee charged for each dispute alert in USD. `null` when unavailable.
        </ResponseField>

        <ResponseField name="enforce_3ds" type="boolean" required>
          Whether 3-D Secure is forced on every card payment at checkout. The account
          cannot bypass it while set.
        </ResponseField>

        <ResponseField name="financing_disabled" type="boolean" required>
          Whether payment health controls explicitly disable financing. This is
          independent of financing approval in `capabilities.accept_bnpl_payments`.
        </ResponseField>

        <ResponseField name="high_risk_processing_fee_percentage" type="number" required>
          Additional processing fee percentage for high-risk processing.
        </ResponseField>

        <ResponseField name="pending_auto_topup_fee_percentage" type="number" required>
          Percentage fee charged when pending, not-yet-settled balance is advanced to
          fund the account's cards balance, where `2` means 2%. `0` when the account is
          exempt.
        </ResponseField>

        <ResponseField name="pending_balance_delay_days" type="integer" required>
          Additional days payments remain pending before becoming available.
        </ResponseField>

        <ResponseField name="reserve" type="object" required>
          Reserve currently applied to incoming payment volume.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="hold_period_days" type="integer" required>
              Number of days reserved funds are held before release.
            </ResponseField>

            <ResponseField name="percentage" type="number | null" required>
              Percentage of incoming payment volume held in reserve. `null` when no reserve is applied.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="resolution_center_auto_refund" type="object" required>
          Automatic refund settings for resolution center cases.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="card_threshold_usd" type="number | null" required>
              Maximum card-funded resolution center case amount automatically refunded in
              USD. `null` when automatic refunds are disabled for cards.
            </ResponseField>

            <ResponseField name="financing_threshold_usd" type="number | null" required>
              Maximum financing-funded resolution center case amount automatically refunded
              in USD. `null` when automatic refunds are disabled for financing.
            </ResponseField>

            <ResponseField name="locked" type="boolean" required>
              Whether the account owner is prevented from changing these thresholds.
            </ResponseField>

            <ResponseField name="paypal_threshold_usd" type="number | null" required>
              Maximum PayPal-funded resolution center case amount automatically refunded in USD. `null` when automatic refunds are disabled for PayPal.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="restricted_payment_methods" type="string[]" required>
          Card brands blocked at checkout for this account. Empty when none are blocked. The account cannot re-enable them itself.

          Available options: `card_visa`, `card_mastercard`, `card_american_express`, `card_discover_global_network`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="privacy_policy" type="object | null" required>
      The account's privacy policy document, or `null` if they have not published one.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          The file's ID, prefixed `file_`.
        </ResponseField>

        <ResponseField name="content_type" type="string | null" required>
          The file's MIME type, e.g. `application/pdf`.
        </ResponseField>

        <ResponseField name="created_at" type="string" required>
          When the file was created, as an ISO 8601 timestamp.
        </ResponseField>

        <ResponseField name="filename" type="string | null" required>
          The original filename, including its extension.
        </ResponseField>

        <ResponseField name="multipart_chunk_size" type="integer | null">
          The byte size each part (except the last) must be. Present only on create, and
          only for multipart uploads.
        </ResponseField>

        <ResponseField name="multipart_upload_id" type="string | null">
          The ID of the multipart upload, passed back to `complete`. Present only on
          create, and only for multipart uploads.
        </ResponseField>

        <ResponseField name="multipart_upload_urls" type="object[] | null">
          The presigned URL for each part. Present only on create, and only for multipart uploads.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="part_number" type="integer" required>
              The 1-based index of this part within the multipart upload.
            </ResponseField>

            <ResponseField name="url" type="string" required>
              The presigned URL to PUT this part's bytes to.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="object" type="string" required>
          The type of this object, always `file`.
        </ResponseField>

        <ResponseField name="size" type="integer | null" required>
          The file size in bytes. `null` until the upload has finished.
        </ResponseField>

        <ResponseField name="upload_headers" type="object">
          Headers to send with the upload PUT. Present only on create.
        </ResponseField>

        <ResponseField name="upload_status" type="string" required>
          Where the file is in its upload lifecycle.

          Available options: `pending`, `processing`, `ready`, `failed`
        </ResponseField>

        <ResponseField name="upload_url" type="string | null">
          Presigned URL to PUT the file's bytes to. Present only on create, and only for
          single-part uploads.
        </ResponseField>

        <ResponseField name="url" type="string | null" required>
          A URL to download the file: a permanent CDN URL for public files, a signed
          expiring URL for private ones. `null` until the upload has finished.
        </ResponseField>

        <ResponseField name="visibility" type="string" required>
          `public` files are served via an unsigned CDN URL; `private` files via a signed, expiring URL.

          Available options: `public`, `private`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="product_tax_code" type="object | null" required>
      Tax classification code applied by default to the account's products, with
      `id`, `name`, and `product_type`. `null` when no default is set.
    </ResponseField>

    <ResponseField name="recommended_actions" type="object[] | null" required>
      DEPRECATED: Use the `GET /recommended_actions?account_id=\{account_id}` endpoint instead.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="action" type="string" required>
          The recommendation; new values may be added, so handle unknown actions gracefully

          Available options: `theme_business`, `create_product`, `create_plan`, `verify_identity`, `connect_affiliate_program`, `create_promotion`, `migrate_from_stripe`, `accept_first_payment`, `launch_first_ad`, `launch_draft_campaign`, `increase_ad_budget`, `refresh_ad_creatives`, `fix_ad_billing`, `exclude_customers_from_ads`, `retarget_abandoned_checkouts`, `fix_funnel_dropoff`, `invite_team_member`, `enable_tax_collection`, `create_card`, `apply_for_financing`
        </ResponseField>

        <ResponseField name="blocked_capabilities" type="string[]" required>
          Capabilities this would unlock, or empty
        </ResponseField>

        <ResponseField name="cta" type="string" required>
          The URL the call-to-action links to
        </ResponseField>

        <ResponseField name="cta_label" type="string" required>
          Button label
        </ResponseField>

        <ResponseField name="description" type="string" required>
          Supporting copy, or empty
        </ResponseField>

        <ResponseField name="icon_url" type="string | null" required>
          Illustration icon URL, or `null`
        </ResponseField>

        <ResponseField name="impact_score" type="integer | null" required>
          Estimated impact from 0-100, or `null` when not ranked
        </ResponseField>

        <ResponseField name="reasoning" type="string | null" required>
          Why this action was recommended, or `null`
        </ResponseField>

        <ResponseField name="status" type="string" required>
          Always optional — never blocking

          Available options: `optional`
        </ResponseField>

        <ResponseField name="title" type="string" required>
          Headline for the recommendation
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="require_2fa" type="boolean" required>
      Whether authorized users must enable two-factor authentication.
    </ResponseField>

    <ResponseField name="required_actions" type="object[] | null" required>
      Actions the account owner must take to unblock capabilities like payouts and card spend, ordered by display priority. Computed only on `retrieve` and `me` for callers with `company:balance:read` scope; `null` otherwise.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="action" type="string" required>
          What the holder must do; new values may be added, so handle unknown actions gracefully

          Available options: `deposit_funds`, `submit_information_request`, `reauthorize_payout_methods`, `update_payout_profile`, `card_usage_review`, `verify_identity`, `sign_formation_documents`, `connect_fulfillment_tracker`, `setup_apple_pay_domains`, `configure_tax_remitter`, `add_vat_registration`
        </ResponseField>

        <ResponseField name="blocked_capabilities" type="string[]" required>
          Capabilities gated until this is resolved
        </ResponseField>

        <ResponseField name="cta" type="string | null" required>
          The URL the call-to-action links to, or null when there is no button
        </ResponseField>

        <ResponseField name="cta_label" type="string" required>
          Button label, or empty when there is no button
        </ResponseField>

        <ResponseField name="description" type="string" required>
          Supporting copy, or empty
        </ResponseField>

        <ResponseField name="icon_url" type="string | null" required>
          The URL of the action's illustration icon, or null if it has none
        </ResponseField>

        <ResponseField name="status" type="string" required>
          required (act now) or pending (under review)

          Available options: `required`, `pending`
        </ResponseField>

        <ResponseField name="title" type="string" required>
          Headline for the action
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="return_policy" type="object | null" required>
      The account's return policy document, or `null` if they have not published one.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          The file's ID, prefixed `file_`.
        </ResponseField>

        <ResponseField name="content_type" type="string | null" required>
          The file's MIME type, e.g. `application/pdf`.
        </ResponseField>

        <ResponseField name="created_at" type="string" required>
          When the file was created, as an ISO 8601 timestamp.
        </ResponseField>

        <ResponseField name="filename" type="string | null" required>
          The original filename, including its extension.
        </ResponseField>

        <ResponseField name="multipart_chunk_size" type="integer | null">
          The byte size each part (except the last) must be. Present only on create, and
          only for multipart uploads.
        </ResponseField>

        <ResponseField name="multipart_upload_id" type="string | null">
          The ID of the multipart upload, passed back to `complete`. Present only on
          create, and only for multipart uploads.
        </ResponseField>

        <ResponseField name="multipart_upload_urls" type="object[] | null">
          The presigned URL for each part. Present only on create, and only for multipart uploads.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="part_number" type="integer" required>
              The 1-based index of this part within the multipart upload.
            </ResponseField>

            <ResponseField name="url" type="string" required>
              The presigned URL to PUT this part's bytes to.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="object" type="string" required>
          The type of this object, always `file`.
        </ResponseField>

        <ResponseField name="size" type="integer | null" required>
          The file size in bytes. `null` until the upload has finished.
        </ResponseField>

        <ResponseField name="upload_headers" type="object">
          Headers to send with the upload PUT. Present only on create.
        </ResponseField>

        <ResponseField name="upload_status" type="string" required>
          Where the file is in its upload lifecycle.

          Available options: `pending`, `processing`, `ready`, `failed`
        </ResponseField>

        <ResponseField name="upload_url" type="string | null">
          Presigned URL to PUT the file's bytes to. Present only on create, and only for
          single-part uploads.
        </ResponseField>

        <ResponseField name="url" type="string | null" required>
          A URL to download the file: a permanent CDN URL for public files, a signed
          expiring URL for private ones. `null` until the upload has finished.
        </ResponseField>

        <ResponseField name="visibility" type="string" required>
          `public` files are served via an unsigned CDN URL; `private` files via a signed, expiring URL.

          Available options: `public`, `private`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="route" type="string" required>
      Account public route identifier.
    </ResponseField>

    <ResponseField name="send_customer_emails" type="boolean" required>
      Whether Whop sends transactional emails to customers on behalf of this
      account.
    </ResponseField>

    <ResponseField name="show_joined_whops" type="boolean" required>
      Whether the account appears in joined whops on other accounts.
    </ResponseField>

    <ResponseField name="show_reviews_dtc" type="boolean" required>
      Whether reviews are displayed on direct-to-consumer product pages.
    </ResponseField>

    <ResponseField name="show_user_directory" type="boolean" required>
      Whether the account shows users in the user directory.
    </ResponseField>

    <ResponseField name="social_links" type="object[]" required>
      Account social links.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          The ID of the social link
        </ResponseField>

        <ResponseField name="title" type="string | null" required>
          The optional display title for the social link
        </ResponseField>

        <ResponseField name="url" type="string" required>
          The social link URL
        </ResponseField>

        <ResponseField name="website" type="string" required>
          The social platform for this link

          Available options: `x`, `instagram`, `facebook`, `tiktok`, `youtube`, `linkedin`, `twitch`, `website`, `custom`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="stablecoin_rails" type="boolean" required>
      Whether the account settles on stablecoin rails — its balance is held on-chain
      as USDT and paid out over crypto, rather than as fiat cash.
    </ResponseField>

    <ResponseField name="status" type="string | null" required>
      Whether the account can operate on Whop: `active` or `suspended`. Computed on
      `list`, `retrieve`, and `me`; `null` otherwise.
    </ResponseField>

    <ResponseField name="status_reason" type="string | null" required>
      Why the account was suspended, in language safe to show the account owner.
      Computed only on `retrieve` and `me`; `null` otherwise, when `status` is not
      `suspended`, and when the suspension was recorded without a reason.
    </ResponseField>

    <ResponseField name="store_page_config" type="object" required>
      Account store page display configuration.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="accent_color" type="string | null" required>
          Accent color used on the account store page.

          Available options: `ruby`, `tomato`, `red`, `crimson`, `pink`, `plum`, `purple`, `violet`, `iris`, `cyan`, `teal`, `jade`, `green`, `grass`, `brown`, `blue`, `orange`, `indigo`, `sky`, `mint`, `yellow`, `amber`, `lime`, `lemon`, `magenta`, `gold`, `bronze`, `gray`
        </ResponseField>

        <ResponseField name="layout" type="string | null" required>
          Layout used on the account store page.

          Available options: `featured`, `compact`
        </ResponseField>

        <ResponseField name="profile_variant" type="string | null" required>
          Profile presentation used on the account store page.

          Available options: `personal`, `business`
        </ResponseField>

        <ResponseField name="whop_affiliate_link" type="boolean" required>
          Whether the account store page shows a Whop affiliate link.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="target_audience" type="string | null" required>
      Target audience for this account.
    </ResponseField>

    <ResponseField name="tax_collection_enabled_states" type="string[]" required>
      US state codes (of the 50 states plus `DC`) where the account collects tax:
      the full set when Whop remits (`tax_remitted_by` `whop`), the configured
      subset when the account self-remits (`self`), and empty when neither. On
      update, send the complete list to replace it (only allowed when `self`).
    </ResponseField>

    <ResponseField name="tax_identifiers" type="object[]" required>
      Account tax/VAT registrations. Empty when none are set.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Tax identifier ID.
        </ResponseField>

        <ResponseField name="tax_id_type" type="string" required>
          Tax ID type.

          Available options: `ad_nrt`, `ao_tin`, `ar_cuit`, `al_tin`, `am_tin`, `aw_tin`, `au_abn`, `au_arn`, `eu_vat`, `az_tin`, `bs_tin`, `bh_vat`, `bd_bin`, `bb_tin`, `by_tin`, `bj_ifu`, `bo_tin`, `ba_tin`, `br_cnpj`, `br_cpf`, `bg_uic`, `bf_ifu`, `kh_tin`, `cm_niu`, `ca_bn`, `ca_gst_hst`, `ca_pst_bc`, `ca_pst_mb`, `ca_pst_sk`, `ca_qst`, `cv_nif`, `cl_tin`, `cn_tin`, `co_nit`, `cd_nif`, `cr_tin`, `hr_oib`, `do_rcn`, `ec_ruc`, `eg_tin`, `sv_nit`, `et_tin`, `eu_oss_vat`, `ge_vat`, `gh_tin`, `de_stn`, `gb_vat`, `gn_nif`, `hk_br`, `hu_tin`, `is_vat`, `in_gst`, `id_npwp`, `il_vat`, `jp_cn`, `jp_rn`, `jp_trn`, `kz_bin`, `ke_pin`, `kg_tin`, `la_tin`, `li_uid`, `li_vat`, `my_frp`, `my_itn`, `my_sst`, `mr_nif`, `mx_rfc`, `md_vat`, `me_pib`, `ma_vat`, `np_pan`, `nz_gst`, `ng_tin`, `mk_vat`, `no_vat`, `no_voec`, `om_vat`, `pe_ruc`, `ph_tin`, `pl_nip`, `ro_tin`, `ru_inn`, `ru_kpp`, `sa_vat`, `sn_ninea`, `rs_pib`, `sg_gst`, `sg_uen`, `si_tin`, `za_vat`, `kr_brn`, `es_cif`, `ch_uid`, `ch_vat`, `tw_vat`, `tj_tin`, `tz_vat`, `th_vat`, `tr_tin`, `ug_tin`, `ua_vat`, `ae_trn`, `us_ein`, `uy_ruc`, `uz_tin`, `uz_vat`, `ve_rif`, `vn_tin`, `zm_tin`, `zw_tin`, `sr_fin`, `xi_vat`
        </ResponseField>

        <ResponseField name="tax_id_value" type="string" required>
          Tax ID value.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="tax_remitted_by" type="string | null" required>
      Who calculates and remits tax for the account: `whop` (Whop calculates and remits), `self` (Whop calculates; the account collects and remits), or `none` (neither; the account is responsible). `null` until the account enrolls in the Whop tax service.

      Available options: `whop`, `self`, `none`
    </ResponseField>

    <ResponseField name="tax_type" type="string | null" required>
      How tax is applied to the account's prices: `inclusive` (tax included in the listed price) or `exclusive` (tax added on top). Defaults to `exclusive` when unset; `null` only when the account has no payment connection.

      Available options: `inclusive`, `exclusive`
    </ResponseField>

    <ResponseField name="terms_of_service" type="object | null" required>
      The account's terms of service document, or `null` if they have not published one.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          The file's ID, prefixed `file_`.
        </ResponseField>

        <ResponseField name="content_type" type="string | null" required>
          The file's MIME type, e.g. `application/pdf`.
        </ResponseField>

        <ResponseField name="created_at" type="string" required>
          When the file was created, as an ISO 8601 timestamp.
        </ResponseField>

        <ResponseField name="filename" type="string | null" required>
          The original filename, including its extension.
        </ResponseField>

        <ResponseField name="multipart_chunk_size" type="integer | null">
          The byte size each part (except the last) must be. Present only on create, and
          only for multipart uploads.
        </ResponseField>

        <ResponseField name="multipart_upload_id" type="string | null">
          The ID of the multipart upload, passed back to `complete`. Present only on
          create, and only for multipart uploads.
        </ResponseField>

        <ResponseField name="multipart_upload_urls" type="object[] | null">
          The presigned URL for each part. Present only on create, and only for multipart uploads.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="part_number" type="integer" required>
              The 1-based index of this part within the multipart upload.
            </ResponseField>

            <ResponseField name="url" type="string" required>
              The presigned URL to PUT this part's bytes to.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="object" type="string" required>
          The type of this object, always `file`.
        </ResponseField>

        <ResponseField name="size" type="integer | null" required>
          The file size in bytes. `null` until the upload has finished.
        </ResponseField>

        <ResponseField name="upload_headers" type="object">
          Headers to send with the upload PUT. Present only on create.
        </ResponseField>

        <ResponseField name="upload_status" type="string" required>
          Where the file is in its upload lifecycle.

          Available options: `pending`, `processing`, `ready`, `failed`
        </ResponseField>

        <ResponseField name="upload_url" type="string | null">
          Presigned URL to PUT the file's bytes to. Present only on create, and only for
          single-part uploads.
        </ResponseField>

        <ResponseField name="url" type="string | null" required>
          A URL to download the file: a permanent CDN URL for public files, a signed
          expiring URL for private ones. `null` until the upload has finished.
        </ResponseField>

        <ResponseField name="visibility" type="string" required>
          `public` files are served via an unsigned CDN URL; `private` files via a signed, expiring URL.

          Available options: `public`, `private`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="three_ds_level" type="string | null" required>
      Account-level 3D Secure behavior. `mandate_challenge` requires cardholder verification on supported card payments; `null` uses the standard checkout flow.

      Available options: `mandate_challenge`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      Account display name.
    </ResponseField>

    <ResponseField name="total_earned_usd" type="number | null" required>
      Account lifetime sales, normalized to USD. Computed only on `retrieve` and
      `me` for callers with `stats:read` scope; `null` otherwise.
    </ResponseField>

    <ResponseField name="total_usd" type="string | null" required>
      Total USD value across balances with known exchange rates. Computed only on
      single-account reads (`retrieve` and `me`); `null` on list responses, writes,
      missing balance-read permission, or unavailable balance source.
    </ResponseField>

    <ResponseField name="use_logo_as_opengraph_image_fallback" type="boolean" required>
      Whether the account uses its logo as the fallback Open Graph image.
    </ResponseField>

    <ResponseField name="verification" type="object" required>
      Account identity verification status for the `individual` (KYC) and `business`
      (KYB) profiles. Each is `null` until created, otherwise a `status` of
      `not_started`, `pending`, `manual_review`, `approved`, or `rejected`.
    </ResponseField>

    <ResponseField name="volume_usd" type="number | null" required>
      Lifetime volume through the account — sales plus transfers received —
      normalized to USD. Computed only on `list` for callers with `stats:read` on
      the account; `null` otherwise.
    </ResponseField>

    <ResponseField name="wallet" type="object | null" required>
      Account primary crypto wallet, or `null` if none has been provisioned.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Wallet ID, prefixed `wallet_`.
        </ResponseField>

        <ResponseField name="address" type="string" required>
          The on-chain address of the wallet
        </ResponseField>

        <ResponseField name="network" type="string" required>
          The blockchain network the wallet lives on

          Available options: `solana`, `ethereum`, `bitcoin`
        </ResponseField>
      </Accordion>
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Account theme={null}
      {
      	"id": "biz_petalpost123",
      	"balances": [
      		{
      			"balance": "1250.5",
      			"breakdown": {
      				"available": "1200.50",
      				"in_transit": "0",
      				"pending": "50.00",
      				"reserve": "0",
      				"pending_settlements": [
      					{
      						"amount": "50.00",
      						"date": "2026-08-01"
      					}
      				]
      			},
      			"icon_url": "https://cdn.whop.com/tokens/usdt.png",
      			"name": "Tether USD",
      			"price_usd": 1,
      			"symbol": "USDT",
      			"value_usd": "1250.50"
      		},
      		{
      			"balance": "45.00",
      			"breakdown": {
      				"available": "40.00",
      				"in_transit": "0",
      				"pending": "5.00",
      				"reserve": "0",
      				"pending_settlements": [
      					{
      						"amount": "3.00",
      						"date": "2026-08-01"
      					},
      					{
      						"amount": "2.00",
      						"date": "2026-08-04"
      					}
      				]
      			},
      			"icon_url": null,
      			"name": "EUR",
      			"price_usd": 1.11,
      			"symbol": "EUR",
      			"value_usd": "50.00"
      		}
      	],
      	"banner_image_url": "https://cdn.whop.com/banner.png",
      	"business_type": "physical_products",
      	"can_transfer_pending_balance_to_children": false,
      	"country": "US",
      	"created_at": "2026-06-01T12:00:00Z",
      	"description": "Petal Post delivers fresh bouquets.",
      	"email": "hello@petalpost.example",
      	"eula": null,
      	"home_preferences": ["hide_member_count"],
      	"industry_group": "retail",
      	"industry_type": "flower_delivery_gig",
      	"invoice_prefix": "PETAL",
      	"company_formation": {
      		"status": "filed",
      		"legal_name": "Petal Post, LLC",
      		"state_registered": true,
      		"ein_registered": false,
      		"signatures": {
      			"ss4": {
      				"status": "pending",
      				"url": "https://esign.doola.com/session/sess_1a2b3c",
      				"expires_at": "2026-08-01T00:00:00Z"
      			}
      		},
      		"documents": [
      			{
      				"id": "file_petalpost123",
      				"name": "Articles of Organization",
      				"type": "articles_of_organization",
      				"url": "https://img.whop.com/documents/articles-of-organization.pdf"
      			}
      		]
      	},
      	"logo_url": "https://cdn.whop.com/logo.png",
      	"metadata": {
      		"external_merchant_id": "merchant_123"
      	},
      	"onboarding_type": "seller",
      	"opengraph_image_url": "https://cdn.whop.com/og.png",
      	"opengraph_image_variant": "black",
      	"other_business_description": "Local flower delivery",
      	"other_industry_description": "Same-day floral gifts",
      	"owner": {
      		"id": "user_xxxxxxxxxxxx",
      		"username": "petalpost",
      		"name": "Ada Flores",
      		"profile_picture": {
      			"url": "https://cdn.whop.com/user.png"
      		}
      	},
      	"parent_account": {
      		"id": "biz_platform123",
      		"title": "Petal Platform",
      		"route": "petal-platform",
      		"logo_url": "https://cdn.whop.com/petal-platform-logo.png"
      	},
      	"privacy_policy": null,
      	"require_2fa": true,
      	"collect_vat_id": false,
      	"capabilities": {
      		"accept_card_payments": "active",
      		"accept_bank_payments": "active",
      		"accept_bnpl_payments": "inactive",
      		"standard_payout": "inactive",
      		"instant_payout": "inactive",
      		"crypto_payout": "inactive",
      		"transfer": "inactive",
      		"bank_deposit": "active",
      		"crypto_deposit": "active",
      		"card_deposit": "active",
      		"card_issuing": "inactive",
      		"run_ads": "active"
      	},
      	"payment_controls": {
      		"dispute_alert_auto_refund": {
      			"threshold_usd": 250,
      			"locked": false
      		},
      		"resolution_center_auto_refund": {
      			"card_threshold_usd": null,
      			"financing_threshold_usd": null,
      			"paypal_threshold_usd": null,
      			"locked": false
      		},
      		"dispute_alert_fee_usd": 29,
      		"high_risk_processing_fee_percentage": 0,
      		"pending_auto_topup_fee_percentage": 2,
      		"pending_balance_delay_days": 0,
      		"financing_disabled": false,
      		"enforce_3ds": false,
      		"restricted_payment_methods": [],
      		"reserve": {
      			"percentage": null,
      			"hold_period_days": 90
      		}
      	},
      	"cards": {
      		"kind": "business",
      		"status": "approved"
      	},
      	"required_actions": [
      		{
      			"action": "verify_identity",
      			"status": "required",
      			"title": "Identity verification required",
      			"description": "Complete verification before your total earnings exceed $5k to continue accepting payments.",
      			"cta_label": "Verify now",
      			"cta": "https://whop.com/dashboard/biz_petalpost123/balance/?verify=true",
      			"icon_url": null,
      			"blocked_capabilities": [
      				"accept_card_payments",
      				"accept_bank_payments",
      				"standard_payout",
      				"instant_payout",
      				"crypto_payout",
      				"transfer",
      				"bank_deposit",
      				"card_issuing"
      			]
      		}
      	],
      	"recommended_actions": [
      		{
      			"action": "migrate_from_stripe",
      			"status": "optional",
      			"title": "Migrate your business from Stripe.",
      			"description": "",
      			"cta_label": "Get started",
      			"cta": "https://whop.com/dashboard/biz_petalpost123/settings/stripe-migrations/",
      			"icon_url": "https://whop.com/illustrations/orange/crane.svg",
      			"blocked_capabilities": [],
      			"reasoning": null,
      			"impact_score": null
      		},
      		{
      			"action": "accept_first_payment",
      			"status": "optional",
      			"title": "Accept your first payment.",
      			"description": "",
      			"cta_label": "Create payment link",
      			"cta": "https://whop.com/dashboard/biz_petalpost123/links/checkout/create/",
      			"icon_url": "https://whop.com/illustrations/orange/card.svg",
      			"blocked_capabilities": [],
      			"reasoning": null,
      			"impact_score": null
      		},
      		{
      			"action": "apply_for_financing",
      			"status": "optional",
      			"title": "Offer financing at checkout",
      			"description": "Let customers pay over time with buy now, pay later.",
      			"cta_label": "Apply",
      			"cta": "https://whop.com/dashboard/biz_petalpost123/settings/payments/",
      			"icon_url": "https://whop.com/illustrations/orange/piggy-bank.svg",
      			"blocked_capabilities": ["accept_bnpl_payments"],
      			"reasoning": null,
      			"impact_score": null
      		}
      	],
      	"return_policy": null,
      	"route": "petal-post",
      	"send_customer_emails": true,
      	"show_joined_whops": false,
      	"show_reviews_dtc": true,
      	"show_user_directory": false,
      	"stablecoin_rails": false,
      	"status": "active",
      	"status_reason": null,
      	"terms_of_service": null,
      	"three_ds_level": "mandate_challenge",
      	"total_earned_usd": 3450,
      	"volume_usd": 4250.5,
      	"social_links": [
      		{
      			"id": "social_petalpost123",
      			"title": "Petal Post",
      			"url": "https://petalpost.example",
      			"website": "website"
      		}
      	],
      	"store_page_config": {
      		"accent_color": "red",
      		"layout": "compact",
      		"profile_variant": "business",
      		"whop_affiliate_link": true
      	},
      	"target_audience": "Customers sending flowers locally",
      	"tax_collection_enabled_states": ["CA", "NY"],
      	"tax_remitted_by": "whop",
      	"tax_type": "exclusive",
      	"product_tax_code": {
      		"id": "ptc_CzLNn2Z058xEC1",
      		"name": "Digital Group Chat",
      		"product_type": "digital"
      	},
      	"business_address": {
      		"line1": "123 Garden Way",
      		"line2": null,
      		"city": "Austin",
      		"state": "TX",
      		"postal_code": "78701",
      		"country": "US"
      	},
      	"business_name": "Petal Post, LLC",
      	"tax_identifiers": [
      		{
      			"id": "taxid_petalpost123",
      			"tax_id_type": "us_ein",
      			"tax_id_value": "12-3456789"
      		}
      	],
      	"title": "Petal Post",
      	"total_usd": "1300.50",
      	"use_logo_as_opengraph_image_fallback": true,
      	"verification": {
      		"business": null,
      		"individual": {
      			"status": "approved"
      		}
      	},
      	"wallet": {
      		"id": "wallet_petalpost123",
      		"address": "So11111111111111111111111111111111111111112",
      		"network": "solana"
      	}
      }
      ```
    </div>
  </Column>
</Columns>

## Business types and industries glossary

Three fields classify accounts: `business_type`, `industry_group`, and `industry_type`.

Dropdown structure:

```text theme={null}
business_type
    industry_group
        industry_type
```

<AccordionGroup>
  <Accordion title="coaching_and_courses">
    <AccordionGroup>
      <Accordion title="trading_and_investing">
        `forex_trading`, `stock_trading`, `options_trading`, `crypto_trading`,
        `futures_trading`, `day_trading`, `swing_trading`,
        `algorithmic_trading`, `prop_firm_trading`, `value_investing`,
        `real_estate_investing`, `alternative_investments`,
        `penny_stock_trading`, `dividend_investing`, `index_fund_investing`,
        `gold_precious_metals`, `venture_capital_education`,
        `private_equity_education`, `technical_analysis`, `forex_scalping`,
        `ict_smc_trading`, `personalized_investment_advice`
      </Accordion>

      <Accordion title="sports_betting_and_gambling">
        `sports_betting_picks`, `fantasy_sports`, `horse_racing`,
        `poker_coaching`, `esports_betting`, `sports_analytics`, `nfl_betting`,
        `nba_betting`, `mlb_betting`, `soccer_betting`, `mma_ufc_betting`
      </Accordion>

      <Accordion title="fitness_and_athletics">
        `bodybuilding_coaching`, `strength_training`, `weight_loss_coaching`,
        `athletic_performance`, `yoga_instruction`, `martial_arts_instruction`,
        `running_coaching`, `calisthenics`, `flexibility_mobility`,
        `nutrition_coaching`, `swimming_coaching`, `cycling_coaching`,
        `boxing_coaching`, `mma_coaching`, `jiu_jitsu_coaching`,
        `wrestling_coaching`, `gymnastics_coaching`, `pilates_instruction`,
        `sports_nutrition`, `body_recomposition`, `golf_coaching`,
        `tennis_coaching`, `basketball_training`, `soccer_training`,
        `racket_sports_coaching`
      </Accordion>

      <Accordion title="health_and_wellness">
        `mental_health_coaching`, `life_coaching`, `biohacking`,
        `holistic_health`, `addiction_recovery_coaching`, `breathwork`,
        `meditation_mindfulness`, `gut_health_coaching`, `longevity_coaching`,
        `womens_health_coaching`, `mens_health_coaching`, `fertility_wellness`,
        `stress_management`, `grief_coaching`, `trauma_recovery_coaching`,
        `adhd_coaching`, `biomarker_health_coaching`
      </Accordion>

      <Accordion title="business_and_entrepreneurship">
        `ecommerce_education`, `amazon_fba_coaching`, `dropshipping_coaching`,
        `print_on_demand_coaching`, `retail_arbitrage`, `wholesale_coaching`,
        `startup_coaching`, `business_strategy`, `agency_building`,
        `smma_coaching`, `consulting_business`, `saas_entrepreneurship`,
        `local_business_coaching`, `cleaning_business_coaching`,
        `trucking_business_coaching`, `vending_machine_business`,
        `atm_business_coaching`, `car_wash_business`,
        `airbnb_business_coaching`, `private_label_coaching`, `etsy_coaching`,
        `merch_business_coaching`, `licensing_business`, `business_acquisition`,
        `women_entrepreneurship`, `affiliate_marketing_education`,
        `coaching_business_coaching`
      </Accordion>

      <Accordion title="sales_and_revenue">
        `high_ticket_sales`, `b2b_sales_coaching`, `door_to_door_sales`,
        `sales_funnel_coaching`, `appointment_setting_coaching`,
        `insurance_sales_coaching`, `car_sales_coaching`,
        `retail_sales_coaching`, `solar_sales_coaching`
      </Accordion>

      <Accordion title="marketing_and_advertising">
        `facebook_ads`, `google_ads`, `tiktok_marketing`, `youtube_marketing`,
        `instagram_growth`, `seo_coaching`, `email_marketing_coaching`,
        `copywriting_coaching`, `affiliate_marketing`, `local_seo`,
        `ai_marketing`, `webinar_marketing`, `event_marketing`,
        `saas_marketing_coaching`, `digital_marketing`
      </Accordion>

      <Accordion title="creative_and_content_creation">
        `video_editing_education`, `photography_coaching`, `music_production`,
        `ui_ux_design_education`, `clipping_education`, `ugc_creation`,
        `3d_modeling_education`, `dj_education`, `youtube_automation`,
        `blog_monetization`, `wedding_photography_education`,
        `calligraphy_lettering`, `illustration_education`,
        `fashion_design_education`, `interior_design_education`,
        `influencer_education`, `ai_content_creator_education`,
        `ai_nsfw_content_generation_education`
      </Accordion>

      <Accordion title="tech_and_development">
        `web_development_education`, `ai_ml_education`,
        `data_science_education`, `cybersecurity_education`,
        `cloud_computing_education`, `blockchain_education`,
        `no_code_education`, `automation_education`,
        `game_development_education`, `prompt_engineering`,
        `python_programming`, `javascript_programming`, `react_development`,
        `database_engineering`, `aws_certification`, `data_engineering`,
        `robotics_education`, `vr_ar_development`, `linux_sysadmin`,
        `wordpress_development`, `ai_agent_building`
      </Accordion>

      <Accordion title="real_estate">
        `real_estate_wholesaling`, `house_flipping`, `property_development`,
        `rental_property`, `airbnb_str`, `commercial_real_estate`,
        `land_investing`, `section_8_housing`, `mobile_home_investing`,
        `multifamily_investing`, `self_storage_investing`,
        `property_management_education`, `vacation_rental_management`
      </Accordion>

      <Accordion title="personal_finance">
        `credit_repair_education`, `budgeting_coaching`,
        `tax_strategy_education`, `wealth_building`, `student_loan_strategy`,
        `credit_card_optimization`
      </Accordion>

      <Accordion title="career_and_professional">
        `career_coaching`, `executive_coaching`, `management_coaching`,
        `tech_career_coaching`, `medical_career_coaching`,
        `trade_skills_education`, `va_training`, `bookkeeping_education`,
        `data_career_coaching`, `cybersecurity_career`, `consulting_career`,
        `investment_banking_career`, `law_career_coaching`,
        `nursing_career_coaching`, `teaching_career_coaching`,
        `personal_branding_career`
      </Accordion>

      <Accordion title="dating_and_relationships">
        `mens_dating_coaching`, `womens_dating_coaching`,
        `relationship_coaching`, `marriage_coaching`, `communication_coaching`,
        `masculinity_coaching`, `femininity_coaching`, `breakup_recovery`
      </Accordion>

      <Accordion title="spirituality_and_mindfulness">
        `manifestation_coaching`, `astrology_coaching`, `energy_healing`,
        `spiritual_coaching`, `faith_based_coaching`, `psychic_development`,
        `numerology_coaching`, `chakra_healing`, `shamanic_healing`,
        `biblical_coaching`, `islamic_coaching`
      </Accordion>

      <Accordion title="personal_development">
        `productivity_coaching`, `public_speaking_coaching`, `mindset_coaching`,
        `stoicism_philosophy`, `mens_self_improvement`,
        `womens_self_improvement`, `leadership_development`, `anger_management`,
        `neurolinguistic_programming`, `appearance_and_grooming_coaching`
      </Accordion>

      <Accordion title="publishing_and_info_products">
        `amazon_kdp`, `self_publishing`, `audiobook_publishing`,
        `course_creation`, `digital_product_creation`, `ghostwriting_business`,
        `template_creation`, `ai_book_publishing`
      </Accordion>

      <Accordion title="academic_and_test_prep">
        `language_learning`, `tutoring`, `college_admissions_coaching`,
        `cpa_exam_prep`, `bar_exam_prep`, `real_estate_exam_prep`,
        `medical_board_prep`, `pmp_certification_prep`,
        `aws_certification_prep`, `comptia_certification`, `ap_exam_prep`,
        `graduate_school_prep`, `scholarship_coaching`, `homeschool_education`,
        `stem_education`, `financial_certification`, `coding_bootcamp_prep`
      </Accordion>

      <Accordion title="hobbies_and_lifestyle">
        `cooking_culinary`, `travel_coaching`, `parenting_coaching`,
        `pet_training`, `gardening_education`, `diy_crafts`,
        `survival_prepping`, `baking_pastry`, `wine_sommelier`, `beer_brewing`,
        `mixology_bartending`, `woodworking`, `pottery_ceramics`,
        `knitting_crocheting`, `jewelry_making`, `aquarium_fishkeeping`,
        `bird_watching`, `astronomy_education`, `magic_illusion`,
        `car_restoration`, `motorcycle_riding`, `sailing_boating`,
        `scuba_diving`, `rock_climbing`, `skiing_snowboarding`,
        `surfing_education`, `homesteading`, `tiny_house_living`, `van_life`,
        `fashion_styling`, `floral_design`, `travel_planning_service`,
        `collectibles_coaching`
      </Accordion>

      <Accordion title="video_games_and_esports">
        `esports_coaching`, `game_specific_coaching`
      </Accordion>

      <Accordion title="legal_and_compliance">`legal_education`</Accordion>

      <Accordion title="music_and_performing_arts">
        `music_theory`, `music_business`, `acting_coaching`,
        `dance_instruction`, `voice_acting`
      </Accordion>

      <Accordion title="language_and_communication">
        `english_coaching`, `spanish_coaching`, `mandarin_coaching`,
        `french_coaching`, `german_coaching`, `japanese_coaching`,
        `korean_coaching`, `arabic_coaching`, `sign_language_education`,
        `accent_reduction`, `business_english`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="services">
    <AccordionGroup>
      <Accordion title="marketing_and_advertising">
        `smma`, `performance_marketing_agency`, `seo_agency`,
        `content_marketing_agency`, `email_marketing_agency`,
        `influencer_marketing_agency`, `pr_agency`, `branding_agency`,
        `video_marketing_agency`, `amazon_marketing_agency`,
        `podcast_marketing_agency`, `tiktok_agency`, `linkedin_agency`,
        `local_marketing_agency`, `dental_marketing_agency`,
        `real_estate_marketing_agency`, `restaurant_marketing_agency`,
        `ecommerce_marketing_agency`, `b2b_marketing_agency`,
        `growth_marketing_agency`, `affiliate_management_agency`,
        `conversion_optimization_agency`, `event_marketing_agency`,
        `click_farm_service`, `data_scraping_service`, `lead_list_sales`,
        `social_media_bot_farm`
      </Accordion>

      <Accordion title="sales_and_revenue">
        `lead_generation_agency`, `cold_email_agency`, `cold_calling_agency`,
        `sales_outsourcing`, `crm_implementation`, `appointment_setting_agency`,
        `sales_training_agency`, `revenue_operations_agency`,
        `door_to_door_sales`, `inbound_teleservices`, `outbound_telemarketing`
      </Accordion>

      <Accordion title="ai_and_automation_agencies">
        `ai_chatbot_agency`, `ai_automation_agency`, `ai_consulting`,
        `workflow_automation_agency`, `data_analytics_agency`,
        `ai_voice_agent_agency`, `ai_content_agency`, `machine_learning_agency`,
        `computer_vision_agency`
      </Accordion>

      <Accordion title="creative_and_content_creation">
        `web_design_agency`, `graphic_design_agency`, `ui_ux_agency`,
        `motion_design_agency`, `product_design_agency`, `logo_design_agency`,
        `presentation_design_agency`, `3d_visualization_agency`,
        `fashion_design_agency`, `video_clipping_agency`,
        `video_production_agency`, `ugc_agency`, `content_writing_agency`,
        `translation_agency`, `social_media_management`, `ghostwriting_agency`,
        `podcast_editing_agency`, `thumbnail_design_agency`,
        `scriptwriting_agency`, `seo_content_agency`,
        `technical_writing_agency`, `photography_service`,
        `videography_service`, `music_production_service`, `voice_over_service`,
        `event_photography`, `drone_services`, `commercial_photography`,
        `portrait_photography_service`, `real_estate_photography`,
        `food_photography_service`, `live_event_production`,
        `podcast_production_service`
      </Accordion>

      <Accordion title="tech_and_development">
        `web_development_agency`, `mobile_app_agency`,
        `saas_development_agency`, `ecommerce_development`,
        `blockchain_development_agency`, `game_development_agency`,
        `devops_agency`, `ai_development_agency`, `wordpress_agency`,
        `shopify_agency`, `api_integration_agency`, `cybersecurity_agency`,
        `data_engineering_agency`, `vr_ar_development_agency`,
        `hacking_tools_malware`, `stalkerware_monitoring`
      </Accordion>

      <Accordion title="recruiting_and_staffing">
        `tech_recruiting_agency`, `executive_recruiting`, `staffing_agency`,
        `remote_staffing`, `healthcare_recruiting`, `va_placement_agency`,
        `sales_recruiting`, `creative_recruiting`, `finance_recruiting`,
        `legal_recruiting`, `construction_staffing`, `hospitality_staffing`
      </Accordion>

      <Accordion title="customer_support_agencies">
        `customer_support_outsourcing`, `live_chat_agency`,
        `technical_support_agency`, `call_center_agency`,
        `multilingual_support_agency`, `community_management_agency`
      </Accordion>

      <Accordion title="consulting">
        `management_consulting`, `financial_consulting`, `hr_consulting`,
        `operations_consulting`, `it_consulting`, `sustainability_consulting`,
        `legal_consulting`, `compliance_consulting`, `supply_chain_consulting`,
        `change_management_consulting`, `digital_transformation_consulting`,
        `healthcare_consulting`, `real_estate_consulting`,
        `franchise_consulting`, `export_trade_consulting`,
        `nonprofit_consulting`, `education_consulting`, `cannabis_consulting`,
        `restaurant_consulting`, `m_and_a_consulting`,
        `pricing_strategy_consulting`, `brand_strategy_consulting`,
        `saas_marketing_consulting`, `done_for_you_services`,
        `prop_firm_passing_service`, `trading_account_management`,
        `done_for_you_trading`
      </Accordion>

      <Accordion title="professional_services">
        `accounting_bookkeeping`, `tax_preparation`, `legal_services`,
        `notary_services`, `insurance_brokerage`, `financial_planning_service`,
        `real_estate_services`, `property_management`, `mortgage_brokerage`,
        `immigration_services`, `patent_trademark_services`,
        `business_formation_services`, `shell_company_formation`,
        `payroll_services`, `audit_services`, `forensic_accounting`,
        `actuarial_services`, `appraisal_services`, `mediation_arbitration`,
        `background_check_services`, `bail_bond_services`, `bnpl_service`,
        `check_cashing_service`, `cloud_mining_schemes`, `consumer_lending`,
        `credit_repair_service`, `crowdfunding_platform`,
        `crypto_exchange_brokerage`, `debt_collection_agency`,
        `debt_relief_settlement`, `document_falsification`, `escrow_service`,
        `essay_mill_paper_mill`, `fake_id_services`, `fake_reference_services`,
        `foreign_exchange_service`, `government_service_facilitation`,
        `immigration_services_unlicensed`, `licensed_legal_services`,
        `payment_facilitation`, `personalized_investment_advice`,
        `personalized_tax_services`, `prediction_market_exchange`,
        `private_investigation`, `repossession_services`, `stablecoin_issuance`,
        `standalone_tipping`, `token_sales_ico`, `tokenized_rwa`,
        `unlicensed_legal_services`, `yield_staking_products`
      </Accordion>

      <Accordion title="media_and_publishing_companies">
        `record_label`, `book_publishing_house`, `news_media_outlet`,
        `radio_broadcasting`, `tv_production_company`, `film_studio`,
        `magazine_publisher`, `music_licensing_agency`,
        `talent_management_agency`, `advertising_network`, `ad_tech_platform`
      </Accordion>

      <Accordion title="home_and_trade_services">
        `cleaning_service`, `landscaping_service`, `plumbing_service`,
        `electrical_service`, `hvac_service`, `roofing_service`,
        `painting_service`, `moving_service`, `handyman_service`,
        `pest_control`, `pool_service`, `solar_installation`, `home_renovation`,
        `pressure_washing`, `junk_removal`, `garage_door_service`,
        `fencing_service`, `concrete_masonry`, `tree_service`,
        `window_cleaning`, `gutter_service`, `flooring_service`,
        `cabinet_countertop`, `home_inspection`, `septic_service`,
        `waterproofing_service`, `insulation_service`, `chimney_service`,
        `locksmith_service`, `glass_window_service`, `epoxy_coating`
      </Accordion>

      <Accordion title="security_and_investigations">
        `private_security_guard_service`, `armored_car_transport`,
        `executive_protection_bodyguard`, `event_security_service`,
        `alarm_system_installation`, `cctv_installation`,
        `private_investigation_agency`, `background_check_provider`,
        `locksmith_commercial`, `bounty_hunter_bail_enforcement`
      </Accordion>

      <Accordion title="personal_services">
        `personal_styling`, `personal_chef`, `personal_assistant_service`,
        `tutoring_service`, `pet_services`, `wedding_planning`,
        `concierge_service`, `personal_training_service`, `nanny_service`,
        `elder_care_service`, `errand_service`, `life_organization`,
        `travel_planning_service`, `relocation_service`,
        `adult_dating_services`, `escort_services`,
        `hotel_accommodation_bookings`, `mail_order_spouse`,
        `psychic_fortune_telling`, `timeshare_sales`
      </Accordion>

      <Accordion title="logistics_and_transportation_services">
        `freight_brokerage`, `courier_service`, `warehousing_service`,
        `last_mile_delivery`, `auto_transport`, `international_shipping`,
        `cold_chain_logistics`, `commercial_airline_tickets`,
        `cruise_line_bookings`
      </Accordion>

      <Accordion title="industrial_and_manufacturing">
        `contract_manufacturing`, `cnc_machining_service`,
        `3d_printing_service_commercial`, `plastic_injection_molding`,
        `metal_fabrication`, `pcba_assembly`, `chemical_manufacturing`,
        `textile_manufacturing`, `food_processing_facility`,
        `packaging_manufacturing`, `industrial_automation_integrator`,
        `mining_and_extraction`, `oil_and_gas_services`,
        `renewable_energy_generation`, `waste_management_recycling`,
        `hazardous_waste_disposal`, `aerospace_defense_contracting`
      </Accordion>

      <Accordion title="health_and_wellness_services">
        `personal_training_studio`, `nutrition_consulting`,
        `mental_health_counseling`, `physical_therapy_service`,
        `occupational_therapy_service`, `speech_therapy_service`,
        `chiropractic_service`, `acupuncture_service`,
        `massage_therapy_service`, `midwifery_doula`, `lactation_consulting`,
        `dietitian_service`, `addiction_recovery_services`, `dtc_lab_testing`,
        `iv_therapy_infusion`, `medspa_aesthetic_services`,
        `prescription_delivery_services`, `registered_dietitian_services`,
        `unlicensed_therapy_counseling`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="physical_product">
    <AccordionGroup>
      <Accordion title="clothing_and_apparel">
        `streetwear`, `athleisure`, `luxury_fashion`, `kids_clothing`,
        `custom_apparel`, `workwear`, `swimwear`, `lingerie_intimates`,
        `vintage_clothing`, `plus_size_fashion`, `maternity_clothing`,
        `sleepwear_loungewear`, `denim_brand`, `outerwear_jackets`,
        `socks_hosiery`, `costumes_cosplay`, `scrubs_medical_apparel`,
        `dance_performance_wear`, `hunting_camo_apparel`,
        `casual_everyday_clothing`
      </Accordion>

      <Accordion title="supplements_and_nutrition">
        `protein_supplements`, `vitamins_minerals`, `pre_workout`, `nootropics`,
        `herbal_supplements`, `weight_management_supplements`, `gut_health`,
        `cbd_products`, `mushroom_supplements`, `collagen_supplements`,
        `testosterone_boosters`, `sleep_supplements`, `immune_support`,
        `joint_bone_health`, `greens_powder`, `creatine_supplements`,
        `electrolyte_hydration`, `prenatal_supplements`, `kids_supplements`,
        `pet_supplements`, `ayurvedic_supplements`, `keto_supplements`,
        `cannabis_thc_products`, `cbd_hemp_products_compliant`,
        `delta8_thc_products`, `dietary_supplements`,
        `drug_precursor_chemicals`, `illegal_drugs`, `kratom_kava_products`,
        `medical_treatment_claims_product`, `nutraceutical_products`,
        `otc_medication_sales`, `performance_enhancing_drugs`,
        `research_chemicals_dangerous`, `research_peptides`,
        `sexual_enhancement_products`, `tobacco_products`, `unlicensed_rx_sales`
      </Accordion>

      <Accordion title="beauty_and_personal_care">
        `skincare`, `haircare`, `cosmetics_makeup`, `mens_grooming`,
        `fragrance`, `oral_care`, `sunscreen_spf`, `hair_growth_products`,
        `body_care`, `deodorant`, `lip_care`, `acne_treatment`, `men_skincare`,
        `baby_skincare`, `tattoo_aftercare`, `intimate_care`
      </Accordion>

      <Accordion title="fitness_equipment_and_gear">
        `home_gym_equipment`, `yoga_equipment`, `combat_sports_gear`,
        `outdoor_fitness_gear`, `wearable_fitness`, `recovery_equipment`,
        `weightlifting_equipment`, `cardio_equipment`, `gymnastics_equipment`,
        `swimming_gear`, `jump_rope_equipment`, `grip_strength_tools`,
        `sauna_cold_plunge`, `posture_correctors`
      </Accordion>

      <Accordion title="accessories">
        `jewelry`, `sunglasses_eyewear`, `bags_wallets`, `hats_headwear`,
        `phone_accessories`, `travel_accessories`, `scarves_wraps`, `belts`,
        `hair_accessories`, `tech_accessories`, `keychains_charms`,
        `custom_engraved_accessories`, `cannabis_accessories_non_drug`,
        `drug_paraphernalia`, `high_value_goods_over_500`,
        `precious_metals_stones`, `replica_counterfeit_goods`
      </Accordion>

      <Accordion title="home_and_living">
        `home_decor`, `candles_scents`, `kitchenware`, `bedding_linens`,
        `smart_home`, `cleaning_products`, `outdoor_furniture`,
        `organization_storage`, `wall_art_prints`, `rugs_carpets`,
        `lighting_fixtures`, `planters_garden_decor`, `bathroom_accessories`,
        `luxury_home_goods`, `seasonal_holiday_decor`, `pet_home_products`,
        `home_fragrance_diffusers`, `hazardous_chemicals_b2c`,
        `pre_orders_delayed_delivery`
      </Accordion>

      <Accordion title="electronics_and_gadgets">
        `audio_equipment`, `camera_equipment`, `gaming_hardware`,
        `drones_robotics`, `ev_accessories`, `charging_power`,
        `smart_wearables`, `home_security_devices`, `3d_printers`,
        `projectors_displays`, `streaming_devices`, `vr_headsets`, `e_readers`,
        `portable_tech`, `hardware_wallets`, `regulated_medical_devices`,
        `signal_jamming_devices`, `spy_cameras_hidden_recording`
      </Accordion>

      <Accordion title="food_and_beverages">
        `specialty_coffee_tea`, `health_food`, `snacks_treats`,
        `sauces_condiments`, `alcohol_spirits`, `meal_kits`, `baked_goods`,
        `beverages`, `pet_food_treats`, `protein_bars_snacks`,
        `jerky_meat_snacks`, `chocolate_confections`, `honey_sweeteners`,
        `olive_oil_vinegar`, `hot_sauce`, `dried_fruit_nuts`, `baby_food`,
        `plant_based_food`, `gluten_free_food`, `keto_food_products`,
        `subscription_food_box`, `kombucha_fermented`, `alcohol_sales`
      </Accordion>

      <Accordion title="baby_and_kids">
        `baby_products`, `kids_toys`, `kids_educational`,
        `baby_clothing_accessories`, `nursery_decor`, `kids_outdoor_play`,
        `kids_books`, `baby_safety_products`, `kids_arts_crafts`
      </Accordion>

      <Accordion title="outdoor_and_sports">
        `camping_hiking`, `fishing_gear`, `hunting_gear`, `cycling_gear`,
        `water_sports_gear`, `golf_equipment`, `snow_sports_gear`,
        `climbing_gear`, `archery_equipment`, `skateboarding_gear`,
        `pickleball_equipment`, `tennis_equipment`, `equestrian_gear`,
        `tactical_gear`, `overlanding_gear`, `explosives_fireworks`,
        `firearms_sales`, `self_defense_products`, `weapon_components`
      </Accordion>

      <Accordion title="arts_and_crafts">
        `craft_kits`, `sewing_textiles`, `stationery`, `scrapbooking_supplies`,
        `beading_jewelry_supplies`, `pottery_supplies`, `printmaking_supplies`
      </Accordion>

      <Accordion title="automotive">
        `car_accessories`, `detailing_products`, `motorcycle_gear`,
        `truck_accessories`, `off_road_parts`, `car_audio_electronics`,
        `performance_parts`, `car_care_products`, `ev_charging_accessories`
      </Accordion>

      <Accordion title="pets_and_animals">
        `dog_products`, `cat_products`, `aquarium_supplies`, `bird_supplies`,
        `reptile_supplies`, `horse_supplies`, `pet_apparel`, `pet_tech`,
        `pet_grooming_products`
      </Accordion>

      <Accordion title="home_improvement_and_tools">
        `hand_tools`, `power_tools_and_accessories`, `hardware_and_fasteners`,
        `workshop_equipment_and_storage`, `safety_and_work_gear`,
        `painting_and_building_supplies`
      </Accordion>

      <Accordion title="office_and_business_supplies">
        `office_supplies`, `desk_accessories`, `printing_supplies`,
        `shipping_packaging`
      </Accordion>

      <Accordion title="sustainability_and_eco_products">
        `reusable_products`, `solar_powered_products`
      </Accordion>

      <Accordion title="religion_and_faith">
        `christian_books_bibles`, `christian_apparel`, `christian_jewelry`,
        `christian_home_decor`, `jewish_judaica`, `jewish_books_torah`,
        `jewish_apparel`, `islamic_books_quran`, `islamic_apparel`,
        `islamic_prayer_goods`, `hindu_puja_supplies`, `hindu_books_texts`,
        `buddhist_meditation_goods`, `buddhist_books_texts`,
        `sikh_religious_goods`, `other_religious_products`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="marketplace">
    <AccordionGroup>
      <Accordion title="product_marketplaces">
        `handmade_goods_marketplace`, `vintage_resale_marketplace`,
        `electronics_marketplace`, `auto_parts_marketplace`,
        `luxury_goods_marketplace`, `collectibles_marketplace`,
        `wholesale_marketplace`, `local_goods_marketplace`,
        `sneaker_marketplace`, `book_marketplace`, `furniture_marketplace`,
        `musical_instrument_marketplace`, `art_marketplace`,
        `ticket_marketplace`, `industrial_equipment_marketplace`,
        `craft_supply_marketplace`, `baby_kids_marketplace`,
        `outdoor_gear_marketplace`, `pet_marketplace`,
        `sustainable_goods_marketplace`, `3d_weapon_files`, `alcohol_sales`,
        `cannabis_thc_products`, `cbd_hemp_products_compliant`,
        `cultural_artifacts_looted`, `delta8_thc_products`,
        `dietary_supplements`, `dropshipping_operations`, `drug_paraphernalia`,
        `drug_precursor_chemicals`, `endangered_animal_products`,
        `explosives_fireworks`, `firearms_sales`, `hazardous_chemicals_b2c`,
        `high_value_goods_over_500`, `human_body_parts_tissue`, `illegal_drugs`,
        `kratom_kava_products`, `nft_marketplace`, `nutraceutical_products`,
        `otc_medication_sales`, `penny_auction`, `performance_enhancing_drugs`,
        `pre_orders_delayed_delivery`, `precious_metals_stones`,
        `primary_event_ticketing`, `regulated_medical_devices`,
        `replica_counterfeit_goods`, `research_peptides`,
        `self_defense_products`, `sexual_enhancement_products`,
        `signal_jamming_devices`, `spy_cameras_hidden_recording`,
        `tobacco_products`, `unlicensed_rx_sales`, `weapon_components`
      </Accordion>

      <Accordion title="service_marketplaces">
        `freelancer_marketplace`, `home_services_marketplace`,
        `tutoring_marketplace`, `legal_services_marketplace`,
        `healthcare_marketplace`, `wedding_services_marketplace`,
        `creative_and_content_creation_marketplace`,
        `beauty_services_marketplace`, `fitness_trainer_marketplace`,
        `pet_services_marketplace`, `childcare_marketplace`,
        `elder_care_marketplace`, `translation_marketplace`,
        `coaching_marketplace`, `therapy_marketplace`,
        `photography_marketplace`, `dj_entertainment_marketplace`,
        `auto_services_marketplace`, `commercial_airline_tickets`,
        `cruise_line_bookings`, `freelance_marketplace_operator`,
        `hotel_accommodation_bookings`, `timeshare_sales`,
        `travel_planning_service`
      </Accordion>

      <Accordion title="rental_marketplaces">
        `equipment_rental_marketplace`, `vehicle_rental_marketplace`,
        `space_rental_marketplace`, `vacation_rental_marketplace`,
        `clothing_rental_marketplace`, `camera_gear_rental`, `rv_camper_rental`,
        `boat_rental_marketplace`, `storage_rental_marketplace`,
        `office_coworking_rental`, `parking_rental_marketplace`
      </Accordion>

      <Accordion title="food_and_hospitality_marketplaces">
        `restaurant_marketplace`, `grocery_marketplace`, `catering_marketplace`,
        `homemade_food_marketplace`, `meal_prep_marketplace`,
        `bakery_marketplace`, `farm_produce_marketplace`,
        `chef_booking_marketplace`
      </Accordion>

      <Accordion title="digital_and_education_marketplaces">
        `course_marketplace`, `template_marketplace`, `stock_media_marketplace`,
        `music_beats_marketplace`, `ebook_marketplace`,
        `plugin_theme_marketplace`, `3d_model_marketplace`,
        `prompt_marketplace`, `code_snippet_marketplace`,
        `affiliate_marketing_platform`, `game_account_selling`,
        `game_cheats_hacks`, `pirated_digital_content`,
        `unauthorized_ingame_currency`, `weapon_blueprint_distribution`
      </Accordion>

      <Accordion title="b2b_and_professional_marketplaces">
        `saas_marketplace`, `agency_marketplace`, `manufacturing_marketplace`,
        `logistics_marketplace`, `commercial_real_estate_marketplace`,
        `business_for_sale_marketplace`, `prop_trading_platform`,
        `bnpl_service`, `cloud_mining_schemes`, `crowdfunding_platform`,
        `crypto_exchange_brokerage`, `payment_facilitation`,
        `personalized_investment_advice`, `prediction_market_exchange`,
        `stablecoin_issuance`, `standalone_tipping`, `token_sales_ico`,
        `tokenized_rwa`, `yield_staking_products`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="gig_economy">
    <AccordionGroup>
      <Accordion title="delivery_and_logistics">
        `food_delivery`, `grocery_delivery`, `package_delivery`,
        `courier_service`, `moving_labor`, `alcohol_delivery`,
        `pharmacy_delivery`, `flower_delivery_gig`, `furniture_delivery_gig`,
        `catering_delivery`
      </Accordion>

      <Accordion title="transportation">
        `rideshare`, `chauffeur_service`, `bike_scooter_rental`,
        `boat_charter_gig`, `moving_truck_rental_gig`
      </Accordion>

      <Accordion title="task_and_errands">
        `assembly_installation`, `waiting_line_service`, `personal_shopping`,
        `grocery_shopping_gig`, `gift_wrapping_gig`, `notary_gig`,
        `laundry_gig`, `car_wash_gig`
      </Accordion>

      <Accordion title="home_services_gigs">
        `cleaning_gig`, `lawn_care_gig`, `handyman_gig`, `pet_care_gig`,
        `childcare_gig`, `elder_care_gig`, `painting_gig`, `snow_removal_gig`,
        `pool_cleaning_gig`, `organizing_gig`, `pressure_washing_gig`,
        `junk_removal_gig`
      </Accordion>

      <Accordion title="creative_and_content_creation">
        `freelance_design_gig`, `freelance_writing_gig`, `freelance_dev_gig`,
        `music_performance_gig`, `event_staffing_gig`, `model_talent_gig`,
        `photography_gig`, `videography_gig`, `voiceover_gig`,
        `illustration_gig`, `social_media_gig`, `dj_gig`, `face_painting_gig`,
        `clipping_gig`
      </Accordion>

      <Accordion title="professional_gigs">
        `consulting_gig`, `accounting_gig`, `legal_gig`, `healthcare_gig`,
        `teaching_gig`, `translation_gig`, `data_entry_gig`, `research_gig`,
        `virtual_assistant_gig`, `sales_gig`, `recruiting_gig`
      </Accordion>

      <Accordion title="specialized_gigs">
        `mystery_shopping`, `focus_group_gig`, `product_testing_gig`,
        `drone_pilot_gig`, `fitness_instruction_gig`, `tour_guide_gig`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="paid_group">
    <AccordionGroup>
      <Accordion title="trading_and_investing">
        `forex_signals_group`, `stock_signals_group`, `crypto_signals_group`,
        `options_alerts_group`, `futures_signals_group`,
        `trading_education_group`, `investing_community`,
        `prediction_markets_group`, `nft_alpha_group`, `penny_stock_group`,
        `dividend_investing_group`, `real_estate_investing_group`,
        `prop_firm_group`
      </Accordion>

      <Accordion title="sports_betting_and_gambling">
        `sports_picks_group`, `dfs_group`, `horse_racing_group`,
        `esports_picks_group`, `nfl_picks_group`, `nba_picks_group`,
        `soccer_picks_group`, `mlb_picks_group`, `mma_picks_group`,
        `prop_bets_group`, `fantasy_sports_free_to_play`,
        `licensed_gambling_operations`, `unlicensed_gambling`
      </Accordion>

      <Accordion title="business_and_entrepreneurship">
        `ecommerce_community`, `agency_community`, `saas_community`,
        `saas_marketing_community`, `real_estate_community`, `sales_community`,
        `affiliate_community`, `reselling_community`, `amazon_seller_community`,
        `dropshipping_community`, `freelancer_community`,
        `startup_founder_community`, `ceo_executive_community`,
        `women_business_community`, `marketing_community`,
        `ai_business_community`, `content_business_community`,
        `local_business_community`, `private_equity_community`,
        `wholesaling_community`, `coaching_business_community`,
        `make_money_online_community`
      </Accordion>

      <Accordion title="fitness_and_athletics">
        `fitness_accountability`, `nutrition_community`, `weight_loss_group`,
        `bodybuilding_community`, `running_community`, `martial_arts_community`,
        `mental_health_group`, `biohacking_community`,
        `addiction_support_group`, `yoga_community`, `crossfit_community`,
        `longevity_community`, `womens_fitness_community`,
        `postpartum_fitness_group`, `chronic_illness_support`,
        `skincare_community`
      </Accordion>

      <Accordion title="creative_and_content_creation">
        `content_creator_community`, `video_editing_community`,
        `music_producer_community`, `photography_community`,
        `writing_community`, `design_community`, `youtube_creator_community`,
        `tiktok_creator_community`, `podcast_community`, `filmmaker_community`,
        `clipping_community`, `youtube_automation_community`,
        `pirated_digital_content`
      </Accordion>

      <Accordion title="tech_and_development">
        `developer_community`, `ai_community`, `cybersecurity_community`,
        `no_code_community`, `indie_hacker_community`, `devops_community`,
        `data_science_community`, `product_community`, `open_source_community`
      </Accordion>

      <Accordion title="lifestyle_and_personal_growth">
        `dating_community`, `personal_development_community`,
        `spirituality_community`, `parenting_community`, `travel_community`,
        `networking_community`, `faith_community`, `mens_community`,
        `womens_community`, `expat_community`, `adult_community_nsfw`,
        `adult_dating_services`, `hate_violence_communities`,
        `personal_fundraising`, `political_fundraising`,
        `political_organizations`, `pornographic_content`, `registered_501c3`,
        `religious_organization`, `unregistered_charities`
      </Accordion>

      <Accordion title="video_games_and_esports">
        `gaming_community`, `game_account_selling`,
        `unauthorized_ingame_currency`
      </Accordion>

      <Accordion title="hobbies_and_lifestyle">
        `car_enthusiast_community`, `sneakerhead_community`,
        `watch_collector_community`, `wine_enthusiast_community`,
        `cigar_community`, `cooking_community`, `gardening_community`,
        `fishing_community`, `hunting_community`, `diy_maker_community`,
        `golf_community`, `collectibles_community`, `sweepstakes_raffles`,
        `event_ticket_community`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="software">
    <AccordionGroup>
      <Accordion title="trading_and_investing">
        `forex_trading_bot`, `stock_trading_platform`, `crypto_trading_bot`,
        `futures_trading_bot`, `options_flow_tool`, `portfolio_tracker`,
        `financial_modeling_software`, `accounting_software`,
        `invoicing_software`, `tax_software`, `risk_management_software`,
        `prop_trading_platform`, `backtesting_software`, `trading_indicators`,
        `market_data_feed`, `stock_research_tool`, `banking_software`,
        `lending_platform`, `insurance_software`, `bnpl_service`,
        `check_cashing_service`, `cloud_mining_schemes`, `consumer_lending`,
        `credit_repair_service`, `crypto_exchange_brokerage`,
        `crypto_trading_tools_software`, `debt_collection_agency`,
        `debt_relief_settlement`, `escrow_service`, `foreign_exchange_service`,
        `non_custodial_wallet_tools`, `payment_facilitation`,
        `prediction_market_exchange`, `stablecoin_issuance`, `token_sales_ico`,
        `tokenized_rwa`, `yield_staking_products`
      </Accordion>

      <Accordion title="ai_and_automation_software">
        `ai_outreach_tool`, `ai_chatbot_software`, `ai_writing_tool`,
        `ai_image_generator`, `ai_video_tool`, `ai_voice_tool`,
        `ai_data_analysis`, `ai_code_assistant`, `ai_meeting_assistant`,
        `workflow_automation_software`, `ai_sales_tool`, `ai_customer_support`,
        `ai_recruiting_tool`, `ai_translation_tool`, `ai_music_tool`,
        `ai_presentation_tool`, `ai_research_tool`, `ai_seo_tool`,
        `ai_social_media_tool`, `ai_phone_agent`, `ai_legal_tool`,
        `ai_healthcare_tool`, `llm_api_platform`, `ai_agent_platform`,
        `generative_ai_platform`, `celebrity_impersonation`, `deepfake_service`,
        `ai_nsfw_content_generator`
      </Accordion>

      <Accordion title="marketing_and_advertising">
        `crm_software`, `email_marketing_software`, `sms_marketing_software`,
        `seo_tool`, `landing_page_builder`, `ad_management_tool`,
        `affiliate_tracking`, `review_management`, `analytics_dashboard`,
        `lead_gen_software`, `link_in_bio_tool`, `influencer_platform`,
        `webinar_platform`, `ab_testing_tool`, `chatbot_marketing`,
        `video_sales_tool`, `proposal_software`, `competitive_intelligence`,
        `social_listening_tool`, `whatsapp_marketing_tool`,
        `click_farm_service`, `data_scraping_service`, `door_to_door_sales`,
        `inbound_teleservices`, `lead_list_sales`, `outbound_telemarketing`,
        `standalone_tipping`
      </Accordion>

      <Accordion title="e_commerce_software">
        `ecommerce_platform`, `product_research_tool`, `price_tracker`,
        `shipping_software`, `print_on_demand_software`,
        `marketplace_seller_tool`, `resale_arbitrage_tool`,
        `reseller_management_tool`, `product_review_software`,
        `returns_management`, `product_feed_management`,
        `checkout_optimization`, `wholesale_ordering`
      </Accordion>

      <Accordion title="productivity_and_business_ops">
        `project_management_software`, `team_communication`,
        `video_conferencing`, `document_collaboration`,
        `time_tracking_software`, `scheduling_software`, `hr_software`,
        `knowledge_base_software`, `form_survey_builder`, `note_taking_app`,
        `task_management`, `contract_management`, `expense_management`,
        `okr_goal_tracking`, `employee_engagement`, `onboarding_software`,
        `applicant_tracking`, `asset_management`, `facility_management`,
        `visitor_management`
      </Accordion>

      <Accordion title="tech_and_development">
        `api_management`, `hosting_platform`, `database_tool`, `devops_tool`,
        `monitoring_tool`, `testing_tool`, `code_editor`, `no_code_builder`,
        `cdn_platform`, `error_tracking`, `documentation_tool`, `webhook_tool`,
        `3d_weapon_files`, `background_check_services`,
        `document_falsification`, `fake_id_services`, `fake_reference_services`
      </Accordion>

      <Accordion title="community_and_education_software">
        `community_platform`, `event_management_software`, `webinar_software`,
        `school_management`, `newsletter_platform`, `podcast_hosting`,
        `forum_software`, `virtual_classroom`, `pirated_digital_content`,
        `primary_event_ticketing`, `ticket_marketplace`
      </Accordion>

      <Accordion title="health_and_wellness">
        `telehealth_platform`, `ehr_software`, `practice_management`,
        `mental_health_app`, `fitness_app`, `nutrition_tracking_app`,
        `wellness_app`, `patient_engagement`, `medical_billing_software`,
        `pharmacy_management`, `lab_management`, `clinical_trial_software`,
        `dental_software`, `veterinary_software`, `health_data_platform`
      </Accordion>

      <Accordion title="real_estate">
        `real_estate_crm`, `property_management_software`, `deal_analysis_tool`,
        `mls_search_tool`, `virtual_tour_software`,
        `real_estate_marketing_software`, `construction_management`,
        `home_valuation_tool`
      </Accordion>

      <Accordion title="industry_specific_software">
        `restaurant_pos`, `salon_software`, `gym_management_software`,
        `auto_shop_software`, `legal_practice_software`, `church_management`,
        `nonprofit_software`, `logistics_software`, `agriculture_software`,
        `field_service_software`, `marina_management`, `hotel_pms`,
        `childcare_management`, `cleaning_business_software`,
        `roofing_software`, `landscaping_software`, `pest_control_software`,
        `tattoo_studio_software`, `cannabis_software`, `bail_bond_services`,
        `freelance_marketplace_operator`, `private_investigation`,
        `repossession_services`
      </Accordion>

      <Accordion title="security_and_privacy_software">
        `password_manager`, `cybersecurity_software`, `identity_verification`,
        `backup_recovery`, `endpoint_protection`, `email_security`,
        `access_management`, `compliance_software`, `data_privacy_tool`,
        `hacking_tools_malware`, `stalkerware_monitoring`, `vpn_services`,
        `people_search_tool`
      </Accordion>

      <Accordion title="gaming_and_entertainment_software">
        `game_mod_tool`, `streaming_tool`, `game_server_hosting`,
        `music_software`, `video_editing_software`, `photo_editing_software`,
        `animation_software`, `audio_editing_software`,
        `screen_recording_software`, `sports_betting_tool`,
        `fantasy_sports_free_to_play`, `fantasy_sports_paid_entry`,
        `game_cheats_hacks`, `iptv_pirated_streaming`,
        `licensed_gambling_operations`, `loot_boxes_gacha`,
        `skill_contests_free_entry`, `skill_contests_paid_entry`,
        `sweepstakes_raffles`, `unlicensed_gambling`,
        `only_fans_management_software`, `pornography_platform`
      </Accordion>

      <Accordion title="communication_and_messaging_software">
        `business_phone_system`, `customer_messaging`
      </Accordion>

      <Accordion title="digital_goods_and_accounts">
        `game_account_selling`, `game_cheats_hacks`, `pirated_digital_content`,
        `unauthorized_ingame_currency`, `digital_key_reselling`,
        `streaming_account_reselling`, `subscription_account_sharing`,
        `account_generation_tool`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="telehealth">
    <AccordionGroup>
      <Accordion title="primary_and_general_care">
        `primary_care_telehealth`, `urgent_care_telehealth`,
        `pediatric_telehealth`, `geriatric_telehealth`,
        `family_medicine_telehealth`, `internal_medicine_telehealth`,
        `preventive_care_telehealth`, `licensed_online_pharmacy`,
        `telemedicine_practitioner_services`
      </Accordion>

      <Accordion title="dermatology_and_skin">
        `dermatology_telehealth`, `acne_telehealth`,
        `psoriasis_eczema_telehealth`, `skin_cancer_screening_tele`,
        `cosmetic_dermatology_tele`
      </Accordion>

      <Accordion title="mental_health_and_behavioral">
        `therapy_telehealth`, `psychiatry_telehealth`, `addiction_telehealth`,
        `couples_therapy_telehealth`, `child_psychology_telehealth`,
        `eating_disorder_telehealth`, `ptsd_trauma_telehealth`,
        `adhd_telehealth`, `anxiety_depression_telehealth`, `ocd_telehealth`,
        `grief_counseling_telehealth`, `anger_management_telehealth`,
        `family_therapy_telehealth`, `group_therapy_telehealth`,
        `licensed_psychedelic_therapy`
      </Accordion>

      <Accordion title="womens_and_mens_health">
        `womens_health_telehealth`, `mens_health_telehealth`,
        `sexual_health_telehealth`, `fertility_telehealth`,
        `hormone_therapy_telehealth`, `menopause_telehealth`,
        `prenatal_telehealth`, `postpartum_telehealth`,
        `erectile_dysfunction_tele`, `hair_loss_telehealth`,
        `birth_control_telehealth`, `sti_testing_telehealth`
      </Accordion>

      <Accordion title="dental_and_vision">
        `dental_telehealth`, `orthodontics_telehealth`, `optometry_telehealth`,
        `oral_surgery_consultation`, `vision_therapy_telehealth`
      </Accordion>

      <Accordion title="specialty_medical_care">
        `cardiology_telehealth`, `endocrinology_telehealth`,
        `neurology_telehealth`, `orthopedic_telehealth`, `allergy_telehealth`,
        `ent_telehealth`, `rheumatology_telehealth`,
        `gastroenterology_telehealth`, `infectious_disease_telehealth`,
        `pulmonology_telehealth`, `nephrology_telehealth`,
        `oncology_telehealth`, `hematology_telehealth`, `urology_telehealth`
      </Accordion>

      <Accordion title="weight_and_metabolic_health">
        `weight_management_telehealth`, `glp1_weight_loss_tele`,
        `diabetes_management_tele`, `metabolic_health_tele`,
        `bariatric_telehealth`
      </Accordion>

      <Accordion title="rehabilitation_and_therapy">
        `physical_therapy_telehealth`, `occupational_therapy_tele`,
        `speech_therapy_telehealth`, `pain_management_telehealth`,
        `cardiac_rehab_telehealth`, `pelvic_floor_telehealth`,
        `vestibular_telehealth`
      </Accordion>

      <Accordion title="sleep_and_chronic_conditions">
        `sleep_medicine_telehealth`, `chronic_disease_management`,
        `chronic_pain_telehealth`, `migraine_telehealth`,
        `asthma_copd_telehealth`
      </Accordion>

      <Accordion title="wellness_and_alternative">
        `nutrition_telehealth`, `naturopathic_telehealth`,
        `functional_medicine_telehealth`, `acupuncture_telehealth`,
        `health_coaching_telehealth`, `integrative_medicine_tele`,
        `ayurvedic_telehealth`
      </Accordion>

      <Accordion title="genetic_and_specialized">
        `genetic_counseling_telehealth`, `pharmacogenomics_tele`,
        `rare_disease_telehealth`, `second_opinion_telehealth`
      </Accordion>

      <Accordion title="veterinary">
        `vet_telehealth`, `pet_behavior_telehealth`, `exotic_pet_telehealth`,
        `equine_telehealth`, `veterinary_services`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="class_action_settlement">
    <AccordionGroup>
      <Accordion title="class_action_settlement">
        `class_action_settlement`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="events">
    <AccordionGroup>
      <Accordion title="educational_training_events">
        `mastermind_event`, `webinar_event`, `virtual_summit`, `bootcamp_event`,
        `workshop_seminar`, `hackathon`, `corporate_training_event`,
        `training_certification_event`
      </Accordion>

      <Accordion title="conference_and_expo_events">
        `convention_expo`, `conference_summit`, `industry_awards_event`,
        `product_launch_event`, `investor_demo_day`, `panel_discussion_event`,
        `pitch_competition`
      </Accordion>

      <Accordion title="social_and_networking_events">
        `meetup_event`, `dinner_event`, `alumni_event`, `community_gathering`,
        `singles_event`, `professional_happy_hour`, `women_networking_event`,
        `founders_dinner`, `industry_mixer`, `adult_community_nsfw`,
        `hate_violence_communities`, `pornographic_content`
      </Accordion>

      <Accordion title="performance_and_show_events">
        `concert_event`, `comedy_show`, `theater_performance`, `film_screening`,
        `music_festival`, `cultural_festival`, `fashion_show`, `drag_show`,
        `magic_show`, `dance_performance`, `poetry_spoken_word`,
        `art_exhibition`
      </Accordion>

      <Accordion title="social_entertainment_events">
        `party_event`, `trivia_night`, `wine_tasting_event`, `beer_festival`,
        `car_show`, `food_festival`, `fantasy_sports_free_to_play`,
        `fantasy_sports_paid_entry`, `licensed_gambling_operations`,
        `loot_boxes_gacha`, `skill_contests_free_entry`,
        `skill_contests_paid_entry`, `sweepstakes_raffles`,
        `unlicensed_gambling`
      </Accordion>

      <Accordion title="sports_and_fitness_events">
        `fitness_challenge_event`, `marathon_race`, `tournament_event`,
        `fight_event`, `yoga_retreat_event`, `outdoor_adventure_event`,
        `esports_tournament`, `obstacle_course_race`, `cycling_event`,
        `swim_meet`, `golf_tournament`, `pickleball_tournament`,
        `crossfit_competition`, `martial_arts_tournament`, `surfing_competition`
      </Accordion>

      <Accordion title="lifestyle_and_wellness_events">
        `wellness_retreat`, `spiritual_retreat`, `couples_retreat`,
        `plant_medicine_retreat`, `luxury_experience_event`, `detox_retreat`,
        `silent_retreat`, `creative_retreat`, `leadership_retreat`,
        `mens_retreat`, `womens_retreat`, `digital_detox_retreat`
      </Accordion>

      <Accordion title="charity_and_cause_events">
        `fundraiser_event`, `awareness_event`, `volunteer_event`,
        `charity_auction`, `benefit_concert`, `charity_run_walk`,
        `environmental_cleanup`, `personal_fundraising`, `registered_501c3`,
        `religious_organization`, `unregistered_charities`
      </Accordion>

      <Accordion title="family_and_community_events">
        `family_festival`, `kids_event`, `holiday_event`,
        `farmers_market_event`, `block_party`, `graduation_ceremony`,
        `memorial_event`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="newsletter">
    <AccordionGroup>
      <Accordion title="finance_and_investing">
        `stock_market_newsletter`, `crypto_newsletter`,
        `personal_finance_newsletter`, `real_estate_newsletter`,
        `fintech_newsletter`, `venture_capital_newsletter`,
        `options_trading_newsletter`, `forex_newsletter`,
        `macro_economics_newsletter`, `alternative_investing_newsletter`,
        `tax_strategy_newsletter`
      </Accordion>

      <Accordion title="business_and_entrepreneurship">
        `startup_newsletter`, `ecommerce_newsletter`, `marketing_newsletter`,
        `sales_newsletter`, `small_business_newsletter`,
        `leadership_newsletter`, `agency_newsletter`, `saas_newsletter`,
        `hr_people_newsletter`, `legal_business_newsletter`,
        `real_estate_business_newsletter`, `solopreneur_newsletter`
      </Accordion>

      <Accordion title="tech_and_ai">
        `ai_newsletter`, `tech_industry_newsletter`, `cybersecurity_newsletter`,
        `developer_newsletter`, `product_newsletter`, `devops_newsletter`,
        `open_source_newsletter`, `robotics_newsletter`,
        `climate_tech_newsletter`
      </Accordion>

      <Accordion title="health_and_wellness">
        `fitness_newsletter`, `mental_health_newsletter`,
        `longevity_newsletter`, `medical_newsletter`, `biohacking_newsletter`,
        `womens_health_newsletter`, `mens_health_newsletter`,
        `pharma_biotech_newsletter`
      </Accordion>

      <Accordion title="lifestyle_and_culture">
        `travel_newsletter`, `fashion_newsletter`, `parenting_newsletter`,
        `sports_newsletter`, `gaming_newsletter`,
        `music_entertainment_newsletter`, `book_reading_newsletter`,
        `dating_relationships_newsletter`, `home_design_newsletter`,
        `pet_newsletter`, `wine_spirits_newsletter`, `automotive_newsletter`,
        `adult_community_nsfw`, `hate_violence_communities`,
        `pornographic_content`
      </Accordion>

      <Accordion title="news_and_politics">
        `political_newsletter`, `geopolitics_newsletter`,
        `media_journalism_newsletter`, `defense_security_newsletter`,
        `legal_policy_newsletter`, `political_fundraising`,
        `political_organizations`
      </Accordion>

      <Accordion title="creative_and_education">
        `design_newsletter`, `education_newsletter`, `science_newsletter`,
        `philosophy_newsletter`, `sustainability_newsletter`,
        `architecture_newsletter`, `history_newsletter`,
        `psychology_newsletter`, `career_newsletter`
      </Accordion>

      <Accordion title="spirituality_and_personal_growth">
        `spirituality_newsletter`, `self_improvement_newsletter`,
        `productivity_newsletter`, `faith_newsletter`, `personal_fundraising`,
        `registered_501c3`, `religious_organization`, `unregistered_charities`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="brick_and_mortar">
    <AccordionGroup>
      <Accordion title="fitness_and_recreation">
        `gym_facility`, `crossfit_box`, `yoga_studio`, `pilates_studio`,
        `martial_arts_gym`, `boxing_gym`, `climbing_gym`, `dance_studio`,
        `swimming_pool`, `sports_facility`, `golf_course`, `bowling_alley`,
        `skating_rink`, `trampoline_park`, `tennis_club`, `pickleball_facility`,
        `gymnastics_center`, `spin_studio`, `barre_studio`,
        `personal_training_studio_bm`, `recovery_studio`, `indoor_soccer`,
        `batting_cage`, `shooting_range`, `archery_range`, `equestrian_center`
      </Accordion>

      <Accordion title="restaurants">
        `fine_dining`, `fast_casual_restaurant`, `steakhouse`,
        `seafood_restaurant`, `pizza_shop`, `sushi_restaurant`,
        `deli_sandwich_shop`, `bbq_restaurant`, `mexican_restaurant`,
        `italian_restaurant`, `chinese_restaurant`, `indian_restaurant`,
        `thai_restaurant`, `korean_restaurant`, `mediterranean_restaurant`,
        `vegan_vegetarian_restaurant`, `brunch_restaurant`, `ramen_noodle_shop`,
        `poke_bowl_shop`, `ethnic_restaurant`
      </Accordion>

      <Accordion title="cafes_and_quick_service">
        `coffee_shop_cafe`, `bakery`, `juice_smoothie_bar`, `ice_cream_shop`,
        `donut_shop`, `bubble_tea_shop`, `food_truck`, `fast_food`,
        `ghost_kitchen`, `food_hall_vendor`, `catering_kitchen`, `butcher_shop`,
        `cheese_shop`, `farmers_market_stall`
      </Accordion>

      <Accordion title="bars_and_breweries">
        `bar_lounge`, `brewery_taproom`, `winery_tasting`, `wine_bar`,
        `cocktail_bar`, `sports_bar`, `hookah_lounge`, `distillery`
      </Accordion>

      <Accordion title="agriculture_and_farming">
        `commercial_farming`, `livestock_ranching`,
        `hydroponic_vertical_farming`, `forestry_logging`,
        `aquaculture_fisheries`, `vineyard_winery_production`,
        `cannabis_cultivation`, `hemp_farming`, `grain_production`,
        `agricultural_cooperative`, `fertilizer_pesticide_sales`,
        `farm_equipment_sales`
      </Accordion>

      <Accordion title="retail">
        `boutique_store`, `clothing_store`, `shoe_store`, `jewelry_store`,
        `electronics_store`, `bookstore`, `pet_store`, `toy_store`,
        `sporting_goods_store`, `thrift_store`, `smoke_shop`,
        `cannabis_dispensary`, `convenience_store`, `grocery_store`,
        `liquor_store`, `florist`, `gift_shop`, `furniture_store`,
        `home_improvement_store`, `art_gallery_retail`,
        `music_instrument_store`, `outdoor_recreation_store`,
        `phone_repair_store`, `watch_store`, `bridal_shop`, `maternity_store`,
        `kids_store`, `sneaker_store`, `vintage_store`, `comic_book_store`,
        `record_store`, `craft_supply_store`, `fabric_store`,
        `health_food_store`, `vitamin_supplement_store`, `optical_store`,
        `mattress_store`, `appliance_store`, `kitchen_bath_store`,
        `tile_flooring_store`, `paint_store`, `garden_center`, `gun_store`,
        `pawn_shop`, `dollar_store`
      </Accordion>

      <Accordion title="beauty_and_wellness">
        `hair_salon`, `nail_salon`, `day_spa`, `med_spa`, `massage_studio`,
        `tattoo_parlor`, `tanning_salon`, `beauty_supply_store`,
        `lash_brow_studio`, `waxing_studio`, `sauna_bathhouse`,
        `cryotherapy_studio`, `float_sensory_studio`, `iv_therapy_lounge`,
        `teeth_whitening_studio`, `microblading_studio`, `spray_tan_studio`,
        `blowout_bar`, `mens_barbershop`, `kids_salon`
      </Accordion>

      <Accordion title="healthcare">
        `medical_office`, `dental_office`, `chiropractic_office`,
        `physical_therapy_clinic`, `optometry_office`, `dermatology_clinic`,
        `urgent_care_clinic`, `pharmacy`, `veterinary_clinic`,
        `mental_health_clinic`, `fertility_clinic`, `acupuncture_clinic`,
        `hearing_aid_center`, `orthopedic_clinic`, `pediatric_clinic`,
        `cosmetic_surgery_center`, `allergy_clinic`, `pain_management_clinic`,
        `dialysis_center`, `imaging_center`, `lab_testing_center`,
        `sleep_clinic`, `weight_loss_clinic`, `hormone_therapy_clinic`,
        `addiction_treatment_center`, `rehabilitation_center`,
        `occupational_therapy_clinic`, `speech_therapy_clinic`,
        `wound_care_center`
      </Accordion>

      <Accordion title="funeral_and_death_care">
        `funeral_home_mortuary`, `crematory_service`, `cemetery_memorial_park`,
        `casket_urn_retailer`, `pet_cremation_service`, `biohazard_cleanup`,
        `estate_liquidation`
      </Accordion>

      <Accordion title="automotive">
        `auto_repair_service`, `auto_body_shop`, `car_dealership`, `car_wash`,
        `tire_shop`, `oil_change_shop`, `auto_parts_store`, `motorcycle_shop`,
        `ev_charging_station`, `transmission_shop`, `muffler_exhaust_shop`,
        `auto_glass_shop`, `auto_upholstery_shop`, `car_audio_shop`,
        `smog_emissions_shop`, `truck_repair_shop`, `rv_repair_shop`,
        `boat_repair_shop`, `used_car_lot`, `auto_auction`
      </Accordion>

      <Accordion title="hospitality_and_lodging">
        `hotel`, `motel`, `boutique_hotel`, `bed_and_breakfast`, `hostel`,
        `resort`, `campground_rv`, `vacation_rental_property`, `extended_stay`,
        `glamping_site`, `cabin_rental`, `eco_lodge`, `retreat_center`
      </Accordion>

      <Accordion title="education_and_childcare">
        `tutoring_center`, `daycare_center`, `preschool`, `learning_center`,
        `music_school`, `art_school`, `driving_school`, `language_school`,
        `trade_school`, `coding_bootcamp_location`, `montessori_school`,
        `after_school_program`, `swim_school`, `cooking_school`,
        `test_prep_center`, `special_needs_center`, `adult_education_center`,
        `flight_school`, `cosmetology_school`
      </Accordion>

      <Accordion title="entertainment_and_leisure">
        `movie_theater`, `escape_room`, `arcade`, `mini_golf`, `laser_tag`,
        `go_kart`, `amusement_park`, `museum`, `zoo_aquarium`, `theater_venue`,
        `nightclub`, `karaoke_bar`, `comedy_club`, `live_music_venue`,
        `axe_throwing`, `virtual_reality_arcade`, `board_game_cafe`, `cat_cafe`,
        `haunted_house`, `water_park`, `indoor_playground`, `trampoline_park`,
        `concert_venue`, `drive_in_theater`, `billiards_hall`, `dart_bar`,
        `batting_cage`, `indoor_skydiving`
      </Accordion>

      <Accordion title="professional_services_storefront">
        `law_office`, `real_estate_office`, `insurance_office`,
        `accounting_office`, `bank_credit_union`, `printing_shop`,
        `shipping_center`, `dry_cleaner`, `laundromat`, `storage_facility`,
        `coworking_space`, `check_cashing`, `title_company`,
        `travel_agency_storefront`, `staffing_office`,
        `financial_advisor_office`, `immigration_office`, `bail_bonds_office`
      </Accordion>

      <Accordion title="pet_services">
        `pet_grooming`, `dog_daycare`, `pet_boarding`, `dog_training_facility`,
        `pet_spa`, `aquatic_pet_store`, `pet_bakery`, `pet_photography_studio`
      </Accordion>

      <Accordion title="home_and_trade_storefronts">
        `plumbing_showroom`, `hvac_showroom`, `solar_showroom`,
        `kitchen_design_showroom`, `bath_design_showroom`,
        `window_door_showroom`, `pool_spa_showroom`, `fireplace_showroom`,
        `countertop_showroom`
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="other">
    <AccordionGroup>
      <Accordion title="nonprofit_and_charity">
        `nonprofit_organization`, `charity_foundation`,
        `religious_organization`, `political_campaign`,
        `community_organization`, `environmental_nonprofit`,
        `education_nonprofit`, `health_nonprofit`, `animal_welfare_nonprofit`,
        `arts_culture_nonprofit`, `social_justice_nonprofit`,
        `veterans_nonprofit`, `youth_nonprofit`, `disaster_relief_nonprofit`,
        `food_bank`, `housing_nonprofit`, `personal_fundraising`,
        `registered_501c3`, `unregistered_charities`
      </Accordion>

      <Accordion title="government_and_public">
        `government_agency`, `public_utility`, `public_library`,
        `public_school`, `municipal_service`, `military_installation`,
        `embassy_consulate`, `political_fundraising`, `political_organizations`
      </Accordion>

      <Accordion title="miscellaneous">
        `niche_service`, `niche_product`, `hybrid_business`, `other_general`,
        `holding_company`, `family_office`, `cooperative`, `social_enterprise`,
        `incubator_accelerator`, `coworking_community`, `media_company`,
        `research_lab`
      </Accordion>
    </AccordionGroup>
  </Accordion>
</AccordionGroup>
