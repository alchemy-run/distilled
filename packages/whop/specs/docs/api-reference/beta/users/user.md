> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# User

A User represents a person on Whop. Users have a public profile and can buy products, join accounts, and access experiences.

Use the Users API to search for users, retrieve or update profiles, and check whether a user has access to an account, product, or experience.

## Endpoints

| Endpoint                                                                       | Request                                                                                            |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| [List Users](/api-reference/beta/users/list-users)                             | <Badge color="blue" size="sm" stroke>GET</Badge> `/users`                                          |
| [Retrieve User](/api-reference/beta/users/retrieve-user)                       | <Badge color="blue" size="sm" stroke>GET</Badge> `/users/{id}`                                     |
| [Update User](/api-reference/beta/users/update-user)                           | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/users/{id}`                                 |
| [Check User Access](/api-reference/beta/users/check-user-access)               | <Badge color="blue" size="sm" stroke>GET</Badge> `/users/{id}/access/{resource_id}`                |
| [List Recommended Actions](/api-reference/beta/users/list-recommended-actions) | <Badge color="blue" size="sm" stroke>GET</Badge> `/users/{id}/recommend_actions`                   |
| [List OAuth Grants](/api-reference/beta/users/list-oauth-grants)               | <Badge color="blue" size="sm" stroke>GET</Badge> `/users/me/oauth_grants`                          |
| [Authorize an App](/api-reference/beta/users/authorize-an-app)                 | <Badge color="green" size="sm" stroke>POST</Badge> `/users/me/oauth_grants`                        |
| [List](/api-reference/beta/users/list)                                         | <Badge color="blue" size="sm" stroke>GET</Badge> `/users/me/passkeys`                              |
| [Register](/api-reference/beta/users/register)                                 | <Badge color="green" size="sm" stroke>POST</Badge> `/users/me/passkeys`                            |
| [Delete](/api-reference/beta/users/delete)                                     | <Badge color="red" size="sm" stroke>DELETE</Badge> `/users/me/passkeys/{id}`                       |
| [Create Challenge](/api-reference/beta/users/create-challenge)                 | <Badge color="green" size="sm" stroke>POST</Badge> `/users/me/passkeys/challenge`                  |
| [Retrieve](/api-reference/beta/users/retrieve)                                 | <Badge color="blue" size="sm" stroke>GET</Badge> `/users/me/preferences`                           |
| [Update](/api-reference/beta/users/update)                                     | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/users/me/preferences`                       |
| [Set](/api-reference/beta/users/set)                                           | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/users/me/preferences/notifications`         |
| [List Experiences](/api-reference/beta/users/list-experiences)                 | <Badge color="blue" size="sm" stroke>GET</Badge> `/users/me/preferences/notifications/experiences` |
| [List Topics](/api-reference/beta/users/list-topics)                           | <Badge color="blue" size="sm" stroke>GET</Badge> `/users/me/preferences/notifications/topics`      |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      User ID, prefixed `user_`.
    </ResponseField>

    <ResponseField name="balance" type="object | null" required>
      The user's balance: personal cash + crypto + in-flight treasury deposits, plus account balances for accounts they own. Computed only on the self view (retrieved with the reserved id `me`) for callers with balance-read scope; `null` otherwise.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="businesses" type="object[]" required>
          Account balances for accounts the user owns, highest balance first. Excludes accounts with no balance.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string" required>
              The account ID, which looks like biz\_\*\*\*\*\*\*\*\*\*\*\*\*\*.
            </ResponseField>

            <ResponseField name="balance_usd" type="string" required>
              The account's total balance in USD.
            </ResponseField>

            <ResponseField name="logo_url" type="string | null" required>
              The account's logo URL.
            </ResponseField>

            <ResponseField name="name" type="string | null" required>
              The account's display name.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="businesses_total_usd" type="string" required>
          Combined USD balance across every account the user owns.
        </ResponseField>

        <ResponseField name="cash" type="object[]" required>
          Per-currency fiat cash balances.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="balance" type="number" required>
              Available balance in the native currency.
            </ResponseField>

            <ResponseField name="balance_usd" type="number" required>
              Available balance converted to USD.
            </ResponseField>

            <ResponseField name="currency" type="string" required>
              Lowercase ISO currency code, such as `usd` or `eur`.
            </ResponseField>

            <ResponseField name="in_transit_balance_usd" type="number" required>
              Balance moving to the user's own wallet or card, converted to USD.
            </ResponseField>

            <ResponseField name="pending_balance_usd" type="number" required>
              Pending balance converted to USD.
            </ResponseField>

            <ResponseField name="price_usd" type="number | null" required>
              USD price per native currency unit, or `null` when no exchange rate is
              available.
            </ResponseField>

            <ResponseField name="reserve_balance_usd" type="number" required>
              Reserved balance converted to USD.
            </ResponseField>

            <ResponseField name="total_withdrawable_balance" type="number" required>
              Withdrawable amount in the native currency.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="cash_usd" type="string" required>
          Fiat cash in USD, including pending, in-transit, and reserve.
        </ResponseField>

        <ResponseField name="crypto" type="object[]" required>
          Per-token crypto holdings in the ledger's own wallet.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="balance" type="string" required>
              Amount held in native token units, as a decimal string.
            </ResponseField>

            <ResponseField name="breakdown" type="object" required>
              Balance split into available, pending, in-transit, and reserve amounts, as native-unit decimal strings. Transfers between the user's own wallet and card are reported in `in_transit` until they arrive.

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
              Token icon URL.
            </ResponseField>

            <ResponseField name="name" type="string | null" required>
              The token's display name.
            </ResponseField>

            <ResponseField name="price_usd" type="number | null" required>
              USD price per token, or `null` when unknown.
            </ResponseField>

            <ResponseField name="symbol" type="string" required>
              Token display symbol, such as `USDT`, `XAUT`, or `cbBTC`.
            </ResponseField>

            <ResponseField name="value_usd" type="number" required>
              Holding USD value.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="crypto_usd" type="string" required>
          Crypto holdings in USD.
        </ResponseField>

        <ResponseField name="pending_usd" type="string" required>
          Fiat pending and in-transit balances, plus in-flight treasury deposits, in
          USD.
        </ResponseField>

        <ResponseField name="total_usd" type="string" required>
          The user's personal balance in USD: cash (available + pending + in-transit +
          reserve) + crypto + in-flight treasury deposits. Excludes account balances
          (see businesses\_total\_usd).
        </ResponseField>

        <ResponseField name="treasury_pending_usd" type="string" required>
          Balance-to-wallet USDT0 payouts still in flight, in USD.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="balance_history" type="object | null" required>
      The user's cumulative wallet balance over time (USD `\{ t, v }` points plus last/min/max), for the balance chart. Opt in with `include_balance_history=true` when retrieving yourself with the reserved id `me`; populated only for callers with balance-read scope and `null` otherwise. A user with no wallet activity returns an empty series.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="data" type="object[]" required>
          Cumulative balance points over the requested window, oldest first.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="t" type="integer" required>
              Point timestamp, in Unix seconds.
            </ResponseField>

            <ResponseField name="v" type="number" required>
              Cumulative wallet balance at this point, in USD.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="last" type="number" required>
          Value of the most recent point, in USD.
        </ResponseField>

        <ResponseField name="max" type="number" required>
          Maximum value across the window, in USD.
        </ResponseField>

        <ResponseField name="min" type="number" required>
          Minimum value across the window, in USD.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="banner" type="object | null" required>
      The user's profile banner wrapper. `null` when the user has no banner.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="url" type="string" required>
          Profile banner image URL.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="bio" type="string | null" required>
      The user's biography
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the user was created, as an ISO 8601 timestamp
    </ResponseField>

    <ResponseField name="earnings_usd" type="object | null" required>
      The user's gross USD income over time. Populated only on single-user self reads for callers with balance-read scope; `null` otherwise.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="first_earned_at" type="string | null" required>
          The first time the user earned gross income, as an ISO 8601 timestamp.
        </ResponseField>

        <ResponseField name="owned_accounts" type="object" required>
          Gross income from accounts the user owns or is owner-authorized on.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="last_24_hours" type="string" required>
              Gross income in USD over the last 24 hours.
            </ResponseField>

            <ResponseField name="last_30_days" type="string" required>
              Gross income in USD over the last 30 days.
            </ResponseField>

            <ResponseField name="last_7_days" type="string" required>
              Gross income in USD over the last 7 days.
            </ResponseField>

            <ResponseField name="lifetime" type="string" required>
              All-time gross income in USD.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="personal" type="object" required>
          Gross income from the user's personal wallet.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="last_24_hours" type="string" required>
              Gross income in USD over the last 24 hours.
            </ResponseField>

            <ResponseField name="last_30_days" type="string" required>
              Gross income in USD over the last 30 days.
            </ResponseField>

            <ResponseField name="last_7_days" type="string" required>
              Gross income in USD over the last 7 days.
            </ResponseField>

            <ResponseField name="lifetime" type="string" required>
              All-time gross income in USD.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="total" type="object" required>
          Gross income from the user's personal wallet plus accounts they own or are owner-authorized on.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="last_24_hours" type="string" required>
              Gross income in USD over the last 24 hours.
            </ResponseField>

            <ResponseField name="last_30_days" type="string" required>
              Gross income in USD over the last 30 days.
            </ResponseField>

            <ResponseField name="last_7_days" type="string" required>
              Gross income in USD over the last 7 days.
            </ResponseField>

            <ResponseField name="lifetime" type="string" required>
              All-time gross income in USD.
            </ResponseField>
          </Accordion>
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="email" type="string | null" required>
      The user's email address. Populated only on the self view (retrieved with the
      reserved id `me`) for callers with email-read scope; `null` otherwise, or
      while the account has no confirmed email yet.
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      The user's display name
    </ResponseField>

    <ResponseField name="profile_picture" type="object" required>
      Avatar wrapper; its `url` is always present, using a generated placeholder when the user set no picture.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="url" type="string" required>
          Avatar image URL. Always present — a generated placeholder when the user set no picture.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="social_accounts" type="object[]" required>
      Social accounts linked to the user (Discord, X/Twitter, Telegram), oldest first. Reading your own profile returns every linked account; other profiles only include what is public on Whop (the primary Discord and the X account). Empty when none are linked.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Unique identifier for the social account.
        </ResponseField>

        <ResponseField name="error" type="string | null" required>
          Why this social account currently can't be used for advertising — a failed
          share or a Meta-side restriction. Null when the account is healthy.
        </ResponseField>

        <ResponseField name="external_id" type="string | null" required>
          The platform-specific ID for this social account.
        </ResponseField>

        <ResponseField name="name" type="string | null" required>
          The display name of the social account on the platform.
        </ResponseField>

        <ResponseField name="parent_social_account" type="object | null" required>
          The social account this one belongs to on the platform, such as the Facebook page that owns an Instagram account. Null when the social account stands on its own.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string" required>
              Social account ID, prefixed `sacc_`.
            </ResponseField>

            <ResponseField name="external_id" type="string | null" required>
              The platform-specific ID for the parent social account.
            </ResponseField>

            <ResponseField name="name" type="string | null" required>
              The display name of the parent social account on the platform.
            </ResponseField>

            <ResponseField name="platform" type="string" required>
              The platform the parent social account exists on.

              Available options: `x`, `instagram`, `youtube`, `tiktok`, `facebook`, `discord`, `telegram`
            </ResponseField>

            <ResponseField name="profile_picture_url" type="string | null" required>
              The URL where the profile picture of the parent social account can be
              accessed.
            </ResponseField>

            <ResponseField name="username" type="string | null" required>
              The username of the parent social account on the platform.
            </ResponseField>

            <ResponseField name="verified" type="boolean" required>
              Whether the parent social account is verified on the platform.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="platform" type="string" required>
          The platform the social account exists on.

          Available options: `x`, `instagram`, `youtube`, `tiktok`, `facebook`, `discord`, `telegram`
        </ResponseField>

        <ResponseField name="profile_picture_url" type="string | null" required>
          The URL where the profile picture of the social account can be accessed.
        </ResponseField>

        <ResponseField name="scopes" type="string[]" required>
          Capabilities Whop retains specific to this social account. For example, Whop
          may request the ability to run advertisements that use this social account's
          identity, reflected by the presence of `advertise` in this value.
        </ResponseField>

        <ResponseField name="url" type="string | null" required>
          The URL where the social account can be accessed on the platform. Null while a
          Whop-owned page is still being provisioned.
        </ResponseField>

        <ResponseField name="username" type="string | null" required>
          The username of the social account on the platform. Null while a Whop-owned
          page is still being provisioned.
        </ResponseField>

        <ResponseField name="verified" type="boolean" required>
          Whether the social account is verified on the platform.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="staff" type="object | null" required>
      Whop staff access flags. Populated only on the self view (retrieved with the reserved id `me`) for callers with staff-read scope; `null` there for every user who is not Whop staff, and always `null` elsewhere.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="admin" type="boolean" required>
          Whether the user holds the admin staff role with a valid second factor.
        </ResponseField>

        <ResponseField name="investigation_access" type="boolean" required>
          Whether the user can open Whop-internal investigation tooling right now: a
          qualifying staff role plus their investigation toggle switched on.
        </ResponseField>

        <ResponseField name="manager" type="boolean" required>
          Whether the user holds the manager staff role with a valid second factor.
        </ResponseField>

        <ResponseField name="support" type="boolean" required>
          Whether the user holds the support staff role with a valid second factor.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="username" type="string" required>
      The user's unique username
    </ResponseField>

    <ResponseField name="verification" type="object" required>
      Identity verification status for the user's `individual` (KYC) and `business`
      (KYB) profiles. Each is `null` until created, otherwise a `status` of
      `not_started`, `pending`, `approved`, or `rejected`.
    </ResponseField>

    <ResponseField name="whop_partner_enabled_at" type="string | null" required>
      When the user became an enrolled Whop Partner, as an ISO 8601 timestamp.
      `null` if never enrolled.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json User theme={null}
      {
      	"id": "user_alex123",
      	"balance": {
      		"businesses": [
      			{
      				"id": "biz_acme123",
      				"name": "Acme Inc",
      				"logo_url": "https://cdn.whop.com/logos/acme.png",
      				"balance_usd": "14325.00"
      			}
      		],
      		"businesses_total_usd": "14325.00",
      		"cash": [
      			{
      				"currency": "usd",
      				"balance": 250,
      				"balance_usd": 250,
      				"pending_balance_usd": 0,
      				"in_transit_balance_usd": 0,
      				"price_usd": 1,
      				"reserve_balance_usd": 0,
      				"total_withdrawable_balance": 250
      			}
      		],
      		"cash_usd": "250.00",
      		"crypto": [
      			{
      				"symbol": "USDT",
      				"name": "Tether USD",
      				"balance": "500.00",
      				"breakdown": {
      					"available": "450.00",
      					"in_transit": "0",
      					"pending": "50.00",
      					"pending_settlements": [
      						{
      							"amount": "50.00",
      							"date": "2026-08-12"
      						}
      					],
      					"reserve": "0"
      				},
      				"value_usd": 500,
      				"price_usd": 1,
      				"icon_url": "https://cdn.whop.com/tokens/usdt.png"
      			}
      		],
      		"crypto_usd": "500.00",
      		"pending_usd": "0.00",
      		"total_usd": "750.00",
      		"treasury_pending_usd": "0.00"
      	},
      	"balance_history": {
      		"data": [
      			{
      				"t": 1735689600,
      				"v": 500
      			},
      			{
      				"t": 1735776000,
      				"v": 750
      			}
      		],
      		"last": 750,
      		"min": 500,
      		"max": 750
      	},
      	"bio": "Building communities on Whop.",
      	"banner": {
      		"url": "https://cdn.whop.com/banner.png"
      	},
      	"social_accounts": [
      		{
      			"id": "discord_123456789012345678",
      			"platform": "discord",
      			"username": "alex",
      			"name": "alex",
      			"url": null,
      			"profile_picture_url": "https://cdn.discordapp.com/avatars/123456789012345678/abcdef.png",
      			"verified": false,
      			"external_id": "123456789012345678",
      			"scopes": [],
      			"error": null,
      			"parent_social_account": null
      		},
      		{
      			"id": "telegram_987654321",
      			"platform": "telegram",
      			"username": "alex_tg",
      			"name": "alex_tg",
      			"url": null,
      			"profile_picture_url": null,
      			"verified": false,
      			"external_id": "987654321",
      			"scopes": [],
      			"error": null,
      			"parent_social_account": null
      		},
      		{
      			"id": "x_111222333",
      			"platform": "x",
      			"username": "alex",
      			"name": "alex",
      			"url": null,
      			"profile_picture_url": "https://pbs.twimg.com/profile_images/alex.jpg",
      			"verified": true,
      			"external_id": "111222333",
      			"scopes": [],
      			"error": null,
      			"parent_social_account": null
      		}
      	],
      	"created_at": "2026-06-01T12:00:00Z",
      	"earnings_usd": {
      		"total": {
      			"lifetime": "15075.00",
      			"last_30_days": "3425.00",
      			"last_7_days": "890.00",
      			"last_24_hours": "120.00"
      		},
      		"personal": {
      			"lifetime": "750.00",
      			"last_30_days": "250.00",
      			"last_7_days": "100.00",
      			"last_24_hours": "25.00"
      		},
      		"owned_accounts": {
      			"lifetime": "14325.00",
      			"last_30_days": "3175.00",
      			"last_7_days": "790.00",
      			"last_24_hours": "95.00"
      		},
      		"first_earned_at": "2026-06-02T15:30:00Z"
      	},
      	"name": "Alex Rivera",
      	"profile_picture": {
      		"url": "https://cdn.whop.com/avatar.png"
      	},
      	"username": "alex",
      	"verification": {
      		"business": null,
      		"individual": {
      			"status": "approved"
      		}
      	},
      	"whop_partner_enabled_at": "2026-06-10T09:00:00Z",
      	"email": "jack@whop.com",
      	"staff": null
      }
      ```
    </div>
  </Column>
</Columns>
