> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

Whop Ads runs paid ads on networks like Meta directly from your Whop account. You fund campaigns from your balance. Whop handles the ad account, review, launch, and billing.

Two API calls take you from nothing to a live ad: generate a creative, then create the campaign, ad group, and ad in one request.

## Resources

| Resource                                                    | Purpose                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| [Ad Campaign](/api-reference/beta/ad-campaigns/ad-campaign) | Top-level container: objective and (optionally) budget. |
| [Ad Group](/api-reference/beta/ad-groups/ad-group)          | Targeting, placements, and budget for a set of ads.     |
| [Ad](/api-reference/beta/ads/ad)                            | The creative unit — copy, assets, destination URL.      |
| [Audience](/api-reference/beta/audiences/audience)          | A custom audience to target or exclude in ad groups.    |

## One-time setup

* **Scopes**: `media:generate`, `media:read`, `ad_campaign:create`, `ad_campaign:update`, `ad_campaign:basic:read`, `social_account:read`.
* **Facebook page**: [`GET /social_accounts`](/api-reference/beta/social-accounts/list-social-accounts) must have a `"platform": "facebook"` entry. If not, link your Meta Business account with [`POST /social_accounts/connect`](/api-reference/beta/social-accounts/connect-a-social-account) `{"platform": "meta_business", "scopes": ["advertise"], "redirect_url": "..."}` → send the user to the returned `authorize_url` — or, if you don't have a page at all, have Whop create one with [`POST /social_accounts`](/api-reference/beta/social-accounts/create-a-social-account) `{"platform": "facebook"}`.
* **Ads payment method**: connected in the dashboard (balance or card). Only launching needs it — drafts work without.

<Steps>
  <Step title="Generate a creative">
    ```bash theme={null}
    curl -X POST "https://api.whop.com/api/v1/media/generate" \
      -H "Authorization: Bearer $WHOP_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{"type": "image", "prompt": "A running club jogging across a bridge at sunrise, warm light, joyful energy"}'
    ```

    Billed from your balance (`amount_charged`; not enough balance → `402` with a `deposit_url`). Poll [`GET /media/{id}`](/api-reference/beta/media/retrieve-media-asset) until `status` is `ready`, then use `file.id`:

    ```json theme={null}
    {
    	"id": "media_Hx7qg4tZc97o",
    	"status": "ready",
    	"file": { "id": "file_Zsv4DYkrbWE7h" }
    }
    ```

    `failed` refunds the charge — tweak the prompt and retry. Video: `"type": "video"` plus optional `duration_seconds` (5/10/15), `resolution` (`480p`–`4k`), and up to 4 `reference_media` file IDs (first one seeds the opening frame).
  </Step>

  <Step title="Create and launch the ad — one request">
    [`POST /ads`](/api-reference/beta/ads/create-an-ad) with an inline `ad_group` and `ad_campaign` creates the whole tree in one transaction and launches it:

    ```bash theme={null}
    curl -X POST "https://api.whop.com/api/v1/ads" \
      -H "Authorization: Bearer $WHOP_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "title": "Run club launch ad",
        "primary_texts": ["Join 10,000 runners chasing their next PR together."],
        "headlines": ["Find your stride"],
        "call_to_action": "sign_up",
        "url": "https://whop.com/your-store-page",
        "creatives": [{"id": "file_Zsv4DYkrbWE7h"}],
        "social_accounts": [{"id": "sacc_XXXXXXXX"}],
        "ad_group": {
          "title": "US broad",
          "conversion_location": "website",
          "budget_amount": 25,
          "budget_type": "daily",
          "regions": {"include": {"countries": ["US"]}},
          "ad_campaign": {"title": "Run club growth", "platform": "meta", "objective": "sales"}
        }
      }'
    ```

    Not ready to spend? Add `"status": "draft"` to `ad_campaign`, then launch later with [`PATCH /ad_campaigns/{id}`](/api-reference/beta/ad-campaigns/update-an-ad-campaign) `{"status": "active"}`.

    | Field       | Rule                                                                                                                                         |
    | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
    | `creatives` | One entry with no `format` is required (the base asset). `square` / `vertical` / `horizontal` are optional crops on top.                     |
    | `url`       | Required for website ads. Your whop.com store page works as-is; an external page needs your [Whop pixel](/developer/guides/pixel) installed. |
    | Budget      | One level owns it: `budget_amount` on the ad group (default), or on the campaign with `budget_optimization: "ad_campaign"` — never both.     |
    | Targeting   | Omit `demographics` / `placements` / `devices` for automatic optimization. `regions` uses ISO 3166 (`"US"`, `"US-CA"`).                      |
    | `lead_form` | Only with an instant-form `conversion_location`.                                                                                             |

    To reuse existing containers, pass `ad_group_id` instead of `ad_group`, or `ad_campaign_id` instead of `ad_campaign`.
  </Step>

  <Step title="Monitor">
    Poll [`GET /ads/{id}`](/api-reference/beta/ads/retrieve-an-ad): `delivery_status` is the live state (a brief `in_review` for content moderation is normal), and `issues[]` carries a human-readable `message` for anything Meta rejected asynchronously.

    Control delivery with [`pause`](/api-reference/beta/ads/pause-an-ad) / [`unpause`](/api-reference/beta/ads/unpause-an-ad) on ads, ad groups, or campaigns. Edit copy or creatives with [`PATCH /ads/{id}`](/api-reference/beta/ads/update-an-ad) — sending `creatives` replaces the whole set, so include the base entry.
  </Step>
</Steps>

## Errors

Every gate is a `400` whose message says what to fix:

| Error contains                                   | Fix                                                                                                                           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `The Whop pixel was not detected on <url>`       | Use your own whop.com store page, or [install the pixel](/developer/guides/pixel) on the landing page.                        |
| `A Facebook page is required`                    | Connect one via `POST /social_accounts` (human OAuth step), pass it in `social_accounts`.                                     |
| `Connect an ads payment method before launching` | Create with `ad_campaign.status: "draft"`, have the user connect a payment method in the dashboard, then `PATCH` to `active`. |
| `Include a base creative`                        | Add a `creatives` entry with no `format`.                                                                                     |
| `A destination URL is required`                  | Pass `url`.                                                                                                                   |
| `budget_amount is required` / `can't be set`     | Move the budget to the right level (see the earlier field rules).                                                             |
| `402` + `deposit_url` (media)                    | Send the user to `deposit_url` to top up, then retry.                                                                         |
