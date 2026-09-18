> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Partners

The Partners API covers your Whop partner activity: the users you referred onto Whop, the businesses you referred and the earnings generated from their processing volume, and the partner leaderboard.

Use it to enroll as a Whop partner, list the users you referred, list your referred businesses and review their earnings, and see the partner leaderboard.

## Endpoints

| Endpoint                                                                                              | Request                                                                               |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [Enroll as a Whop partner](/api-reference/beta/partners/enroll-as-a-whop-partner)                     | <Badge color="green" size="sm" stroke>POST</Badge> `/partners`                        |
| [List referred businesses](/api-reference/beta/partners/list-referred-businesses)                     | <Badge color="blue" size="sm" stroke>GET</Badge> `/partners/businesses`               |
| [Retrieve a referred business](/api-reference/beta/partners/retrieve-a-referred-business)             | <Badge color="blue" size="sm" stroke>GET</Badge> `/partners/businesses/{id}`          |
| [List referred business earnings](/api-reference/beta/partners/list-referred-business-earnings)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/partners/businesses/{id}/earnings` |
| [Retrieve the leaderboard](/api-reference/beta/partners/retrieve-the-leaderboard)                     | <Badge color="blue" size="sm" stroke>GET</Badge> `/partners/leaderboard`              |
| [List the users the caller referred](/api-reference/beta/partners/list-the-users-the-caller-referred) | <Badge color="blue" size="sm" stroke>GET</Badge> `/partners/referred_users`           |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Partner business ID.
    </ResponseField>

    <ResponseField name="account" type="object | null" required>
      Referred account.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Referred account ID.
        </ResponseField>

        <ResponseField name="capabilities" type="object | null" required>
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

        <ResponseField name="logo_url" type="string | null" required>
          Referred account logo URL.
        </ResponseField>

        <ResponseField name="recommended_actions" type="object[] | null" required>
          Optional actions that unlock capabilities or grow the referred account.

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

        <ResponseField name="required_actions" type="object[] | null" required>
          Actions the referred account owner must take to unblock capabilities.

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

        <ResponseField name="route" type="string" required>
          Referred account route.
        </ResponseField>

        <ResponseField name="title" type="string" required>
          Referred account display name.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the partner business was created.
    </ResponseField>

    <ResponseField name="earnings_usd" type="object" required>
      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="completed" type="string" required>
          Commission already paid out, in USD.
        </ResponseField>

        <ResponseField name="pending" type="string" required>
          Commission scheduled but not yet paid, in USD.
        </ResponseField>

        <ResponseField name="total" type="string" required>
          Pending + completed commission, in USD.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="first_tier_partner" type="object | null" required>
      The partner who referred the business owner onto Whop (first tier). Null if there is no active first-tier partner.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          User ID, prefixed `user_`.
        </ResponseField>

        <ResponseField name="name" type="string | null" required>
          The user's display name.
        </ResponseField>

        <ResponseField name="profile_picture" type="object" required>
          The user's profile picture.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="url" type="string" required>
              The user's profile picture URL.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="username" type="string" required>
          The user's unique username.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="my_partner_tier" type="string" required>
      Which tier the caller earns on for this business: `first` (they referred the owner) or `second` (they referred the first-tier partner).

      Available options: `first`, `second`
    </ResponseField>

    <ResponseField name="object" type="string" required />

    <ResponseField name="owner" type="object | null" required>
      The owner of the referred business.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          User ID, prefixed `user_`.
        </ResponseField>

        <ResponseField name="name" type="string | null" required>
          The user's display name.
        </ResponseField>

        <ResponseField name="profile_picture" type="object" required>
          The user's profile picture.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="url" type="string" required>
              The user's profile picture URL.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="username" type="string" required>
          The user's unique username.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="payout_percentages" type="object" required>
      The referrer's commission rate for each income source, expressed as a fraction (0.3 = 30%).

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="ad_spend" type="number | null" required>
          Share of the referred business's Whop Ads spend.
        </ResponseField>

        <ResponseField name="card_interchange" type="number | null" required>
          Share of Whop's profit from card interchange.
        </ResponseField>

        <ResponseField name="sales" type="number" required>
          Share of Whop's profit from product sales.
        </ResponseField>

        <ResponseField name="transfer" type="number | null" required>
          Share of Whop's profit from platform balance transfers.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="referral_expires_at" type="string | null" required>
      When the referral expires.
    </ResponseField>

    <ResponseField name="referral_started_at" type="string | null" required>
      When the referral became active.
    </ResponseField>

    <ResponseField name="second_tier_partner" type="object | null" required>
      The second-tier partner who earns on this business (referred the first-tier partner). Null if there is no active second-tier partner.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          User ID, prefixed `user_`.
        </ResponseField>

        <ResponseField name="name" type="string | null" required>
          The user's display name.
        </ResponseField>

        <ResponseField name="profile_picture" type="object" required>
          The user's profile picture.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="url" type="string" required>
              The user's profile picture URL.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="username" type="string" required>
          The user's unique username.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="status" type="string" required>
      Current referral status.

      Available options: `active`, `removed`
    </ResponseField>

    <ResponseField name="volume_usd" type="object" required>
      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="attributed" type="string" required>
          Credited GMV (awaiting\_settlement + settled); excludes canceled and reversed,
          in USD.
        </ResponseField>

        <ResponseField name="awaiting_settlement" type="string" required>
          GMV awaiting settlement (commission not yet computed), in USD.
        </ResponseField>

        <ResponseField name="settled" type="string" required>
          GMV of pending + completed payments, in USD.
        </ResponseField>
      </Accordion>
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json PartnerBusiness theme={null}
      {
      	"id": "bref_xxxxxxxxxxxx",
      	"account": {
      		"id": "biz_xxxxxxxxxxxxxx",
      		"capabilities": {
      			"accept_bank_payments": "active",
      			"accept_bnpl_payments": "inactive",
      			"accept_card_payments": "active",
      			"bank_deposit": "inactive",
      			"card_deposit": "active",
      			"card_issuing": "inactive",
      			"crypto_deposit": "active",
      			"crypto_payout": "inactive",
      			"instant_payout": "inactive",
      			"run_ads": "active",
      			"standard_payout": "inactive",
      			"transfer": "inactive"
      		},
      		"logo_url": "https://cdn.whop.com/logo.png",
      		"recommended_actions": [
      			{
      				"action": "accept_first_payment",
      				"blocked_capabilities": [],
      				"cta": "https://whop.com/dashboard/biz_xxxxxxxxxxxxxx/links/checkout/create/",
      				"cta_label": "Create payment link",
      				"description": "",
      				"icon_url": "https://whop.com/illustrations/orange/card.svg",
      				"impact_score": null,
      				"reasoning": null,
      				"status": "optional",
      				"title": "Accept your first payment."
      			}
      		],
      		"required_actions": [
      			{
      				"action": "verify_identity",
      				"blocked_capabilities": [
      					"standard_payout",
      					"instant_payout",
      					"crypto_payout",
      					"transfer"
      				],
      				"cta": "https://whop.com/dashboard/biz_xxxxxxxxxxxxxx/balance/?verify=true",
      				"cta_label": "Verify now",
      				"description": "Complete verification to continue accepting payments.",
      				"icon_url": null,
      				"status": "required",
      				"title": "Identity verification required"
      			}
      		],
      		"route": "pickaxe",
      		"title": "Pickaxe"
      	},
      	"created_at": "2026-06-01T12:00:00Z",
      	"earnings_usd": {
      		"completed": "120.50",
      		"pending": "45.25",
      		"total": "165.75"
      	},
      	"first_tier_partner": {
      		"id": "user_yyyyyyyyyyyy",
      		"name": "Alex Partner",
      		"profile_picture": {
      			"url": "https://cdn.whop.com/user.png"
      		},
      		"username": "alexpartner"
      	},
      	"my_partner_tier": "first",
      	"object": "partner_business",
      	"owner": {
      		"id": "user_xxxxxxxxxxxx",
      		"name": "Jane Doe",
      		"profile_picture": {
      			"url": "https://cdn.whop.com/user.png"
      		},
      		"username": "jane"
      	},
      	"payout_percentages": {
      		"sales": 0.3,
      		"ad_spend": 0.015,
      		"transfer": 0.3,
      		"card_interchange": 0.3
      	},
      	"referral_expires_at": "2027-06-01T12:00:00Z",
      	"referral_started_at": "2026-06-01T12:00:00Z",
      	"second_tier_partner": {
      		"id": "user_zzzzzzzzzzzz",
      		"name": "Sam Referrer",
      		"profile_picture": {
      			"url": "https://cdn.whop.com/user.png"
      		},
      		"username": "samreferrer"
      	},
      	"status": "active",
      	"volume_usd": {
      		"attributed": "11050.00",
      		"awaiting_settlement": "250.00",
      		"settled": "10800.00"
      	}
      }
      ```
    </div>
  </Column>
</Columns>
