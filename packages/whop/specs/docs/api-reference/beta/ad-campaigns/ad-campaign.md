> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Ad Campaign

An Ad Campaign is the top-level container for paid ads on an ad network. It sets the platform, objective, and budget strategy shared by its [ad groups](/api-reference/beta/ad-groups/ad-group) and ads.

Use the Ad Campaigns API to create campaigns, list campaigns for an account, retrieve or update campaign settings, and pause or resume campaign delivery.

## Endpoints

| Endpoint                                                                                                  | Request                                                                               |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [List Ad Campaigns](/api-reference/beta/ad-campaigns/list-ad-campaigns)                                   | <Badge color="blue" size="sm" stroke>GET</Badge> `/ad_campaigns`                      |
| [Create an Ad Campaign](/api-reference/beta/ad-campaigns/create-an-ad-campaign)                           | <Badge color="green" size="sm" stroke>POST</Badge> `/ad_campaigns`                    |
| [Retrieve an Ad Campaign](/api-reference/beta/ad-campaigns/retrieve-an-ad-campaign)                       | <Badge color="blue" size="sm" stroke>GET</Badge> `/ad_campaigns/{id}`                 |
| [Update an Ad Campaign](/api-reference/beta/ad-campaigns/update-an-ad-campaign)                           | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/ad_campaigns/{id}`             |
| [Delete an Ad Campaign](/api-reference/beta/ad-campaigns/delete-an-ad-campaign)                           | <Badge color="red" size="sm" stroke>DELETE</Badge> `/ad_campaigns/{id}`               |
| [Duplicate an Ad Campaign](/api-reference/beta/ad-campaigns/duplicate-an-ad-campaign)                     | <Badge color="green" size="sm" stroke>POST</Badge> `/ad_campaigns/{id}/duplicate`     |
| [Pause an Ad Campaign](/api-reference/beta/ad-campaigns/pause-an-ad-campaign)                             | <Badge color="green" size="sm" stroke>POST</Badge> `/ad_campaigns/{id}/pause`         |
| [Retry a Failed Ad Campaign Payment](/api-reference/beta/ad-campaigns/retry-a-failed-ad-campaign-payment) | <Badge color="green" size="sm" stroke>POST</Badge> `/ad_campaigns/{id}/retry_payment` |
| [Unpause an Ad Campaign](/api-reference/beta/ad-campaigns/unpause-an-ad-campaign)                         | <Badge color="green" size="sm" stroke>POST</Badge> `/ad_campaigns/{id}/unpause`       |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Unique identifier for the ad campaign, prefixed `adcamp_`.
    </ResponseField>

    <ResponseField name="added_to_cart_value" type="number" required>
      USD value attributed to add-to-cart events. Sums the value sent with each
      event, normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="added_to_carts" type="number" required>
      Whop pixel-attributed add-to-cart events, last-click.
    </ResponseField>

    <ResponseField name="bid_type" type="string | null">
      How delivery bids in the ad auction: `minimum_cost` gets the most results for the budget, `average_target` holds an average cost per result, and `maximum_target` never bids above a cap.

      Available options: `minimum_cost`, `average_target`, `maximum_target`
    </ResponseField>

    <ResponseField name="budget_amount" type="number | null" required>
      The campaign's budget, in the ad account's currency. `null` when each ad group
      sets its own budget instead.
    </ResponseField>

    <ResponseField name="budget_optimization" type="string | null" required>
      Which level owns the budget: the whole campaign (`ad_campaign`) or each ad group individually (`ad_group`).

      Available options: `ad_campaign`, `ad_group`
    </ResponseField>

    <ResponseField name="budget_type" type="string | null" required>
      Whether `budget_amount` is spent per day (`daily`) or over the campaign's full run (`lifetime`).

      Available options: `daily`, `lifetime`
    </ResponseField>

    <ResponseField name="click_through_rate" type="number" required>
      Clicks divided by impressions, between 0 and 1.
    </ResponseField>

    <ResponseField name="clicks" type="number" required>
      The number of clicks.
    </ResponseField>

    <ResponseField name="completed_registration_value" type="number" required>
      USD value attributed to complete-registration events. Sums the value sent with
      each event, normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="completed_registrations" type="number" required>
      Whop pixel-attributed complete-registration events, last-click.
    </ResponseField>

    <ResponseField name="contact_value" type="number" required>
      USD value attributed to contact events. Sums the value sent with each event,
      normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="contacts" type="number" required>
      Whop pixel-attributed contact events, last-click.
    </ResponseField>

    <ResponseField name="cost_per_added_to_cart" type="number | null" required>
      Spend divided by attributed add-to-cart events; null when they are not the
      goal and none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_click" type="number" required>
      Spend divided by clicks; 0 when there are no clicks.
    </ResponseField>

    <ResponseField name="cost_per_completed_registration" type="number | null" required>
      Spend divided by attributed complete-registration events; null when they are
      not the goal and none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_contact" type="number | null" required>
      Spend divided by attributed contact events; null when contacts are not the
      goal and none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_lead" type="number | null" required>
      Spend divided by attributed leads; null when leads are not a goal and none are
      attributed.
    </ResponseField>

    <ResponseField name="cost_per_mille" type="number" required>
      Spend per 1,000 impressions; 0 when there are no impressions.
    </ResponseField>

    <ResponseField name="cost_per_purchase" type="number | null" required>
      Spend divided by attributed purchases; null when purchases are not a goal and
      none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_result" type="number | null" required>
      Spend divided by Whop pixel-attributed results; null when nothing
      Whop-attributable is being optimized for.
    </ResponseField>

    <ResponseField name="cost_per_schedule" type="number | null" required>
      Spend divided by attributed schedule events; null when schedules are not the
      goal and none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_submitted_application" type="number | null" required>
      Spend divided by attributed submit-application events; null when they are not
      the goal and none are attributed.
    </ResponseField>

    <ResponseField name="cost_per_unique_click" type="number | null" required>
      Spend divided by unique clicks; null when there are no unique clicks.
    </ResponseField>

    <ResponseField name="cost_per_viewed_content" type="number | null" required>
      Spend divided by attributed view-content events; null when they are not the
      goal and none are attributed.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the campaign was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="custom_conversions" type="number" required>
      Whop pixel-attributed custom (merchant-defined) conversion events, last-click,
      across all custom event names.
    </ResponseField>

    <ResponseField name="custom_event_counts" type="object" required>
      Whop pixel-attributed custom conversions, keyed by your event name with its
      last-click count as the value. Empty when no named custom events are
      attributed. Custom events fired without a name are counted in
      custom\_conversions but omitted here, so these values sum to at most
      custom\_conversions.
    </ResponseField>

    <ResponseField name="custom_event_values" type="object" required>
      Conversion value attributed to each custom event, keyed by event name like
      custom\_event\_counts. Sums the value passed to whop.track, normalized to USD;
      events fired without a value contribute 0.
    </ResponseField>

    <ResponseField name="delivery_status" type="string" required>
      Whether the campaign's ads are delivering right now, and if not, why. When several states apply at once, the highest-precedence one is returned.

      Available options: `payment_failed`, `all_ads_rejected`, `draft`, `no_ad_groups`, `no_ads`, `paused`, `processing`, `issues`, `scheduled`, `completed`, `ad_groups_off`, `active`
    </ResponseField>

    <ResponseField name="frequency" type="number | null" required>
      Platform-reported impressions divided by reach.
    </ResponseField>

    <ResponseField name="impressions" type="number" required>
      The number of impressions.
    </ResponseField>

    <ResponseField name="issues" type="object[]" required>
      Open issues affecting the campaign and its descendant ad groups and ads.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Unique identifier for the issue.
        </ResponseField>

        <ResponseField name="message" type="string" required>
          A description of what the issue is and how it can be resolved.
        </ResponseField>

        <ResponseField name="resource_id" type="string | null" required>
          The ID of the campaign, ad group, or ad the issue is attached to.
        </ResponseField>

        <ResponseField name="resource_type" type="string" required>
          The type of resource the issue is attached to.

          Available options: `ad_campaign`, `ad_group`, `ad`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="lead_value" type="number" required>
      USD value attributed to lead events. Sums the value sent with each event,
      normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="leads" type="number" required>
      Whop pixel-attributed leads, last-click.
    </ResponseField>

    <ResponseField name="objective" type="string | null" required>
      The goal the campaign optimizes toward.

      Available options: `awareness`, `traffic`, `engagement`, `leads`, `sales`
    </ResponseField>

    <ResponseField name="optimization_goal" type="string | null" required>
      The event the campaign optimizes for when a single goal is set campaign-wide.
      `null` when each ad group sets its own optimization\_goal.
    </ResponseField>

    <ResponseField name="platform" type="string" required>
      The ad network the campaign runs on.

      Available options: `meta`, `tiktok`
    </ResponseField>

    <ResponseField name="purchase_value" type="number" required>
      USD value of pixel-attributed purchases.
    </ResponseField>

    <ResponseField name="purchases" type="number" required>
      Whop pixel-attributed purchases, last-click.
    </ResponseField>

    <ResponseField name="reach" type="number" required>
      The number of unique people who saw this.
    </ResponseField>

    <ResponseField name="result_event" type="string | null" required>
      The Whop pixel conversion event whose attributed count represents results — the optimization goal, or the highest-volume attributed event for campaigns that budget per ad group. Null when the goal isn't a Whop-attributed event.

      Available options: `purchase`, `lead`, `schedule`, `submit_application`, `contact`, `complete_registration`, `view_content`, `add_to_cart`, `custom`, `messaging_conversation`
    </ResponseField>

    <ResponseField name="result_event_name" type="string | null" required>
      The merchant-defined event name when result\_event is custom; null for the
      standard events.
    </ResponseField>

    <ResponseField name="results" type="number | null" required>
      The Whop pixel-attributed count behind result\_event. When a campaign's ad
      groups optimize different goals there is no single result\_event (it is null),
      and this is instead the sum of each ad group's own attributed results. Null
      when nothing Whop-attributable is being optimized for.
    </ResponseField>

    <ResponseField name="return_on_ad_spend" type="number" required>
      Purchase value divided by spend, both in USD (a currency-neutral ratio); 0
      when there is no spend.
    </ResponseField>

    <ResponseField name="schedule_value" type="number" required>
      USD value attributed to schedule events. Sums the value sent with each event,
      normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="schedules" type="number" required>
      Whop pixel-attributed schedule events, last-click.
    </ResponseField>

    <ResponseField name="special_ad_categories" type="string[]" required>
      Regulated categories the campaign is declared under. Ads in these categories are subject to extra targeting restrictions. Empty when none apply.

      Available options: `housing`, `employment`, `financial_products`, `politics`
    </ResponseField>

    <ResponseField name="spend" type="number" required>
      The amount charged, in spend\_currency.
    </ResponseField>

    <ResponseField name="spend_currency" type="string | null" required>
      The ISO 4217 currency code of all monetary metrics.
    </ResponseField>

    <ResponseField name="status" type="string" required>
      The lifecycle status of the ad campaign.

      Available options: `active`, `paused`, `inactive`, `stale`, `pending_refund`, `payment_failed`, `draft`, `in_review`, `flagged`, `importing`, `imported`, `duplicating`
    </ResponseField>

    <ResponseField name="submitted_application_value" type="number" required>
      USD value attributed to submit-application events. Sums the value sent with
      each event, normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="submitted_applications" type="number" required>
      Whop pixel-attributed submit-application events, last-click.
    </ResponseField>

    <ResponseField name="title" type="string" required>
      Display name of the ad campaign.
    </ResponseField>

    <ResponseField name="unique_click_through_rate" type="number | null" required>
      Unique clicks divided by impressions, between 0 and 1.
    </ResponseField>

    <ResponseField name="unique_clicks" type="number" required>
      People who clicked, reported by the Whop pixel, counted once per person.
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the campaign was last updated, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="viewed_content_value" type="number" required>
      USD value attributed to view-content events. Sums the value sent with each
      event, normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="viewed_contents" type="number" required>
      Whop pixel-attributed view-content events, last-click.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json AdCampaign theme={null}
      {
      	"id": "adcamp_xxxxxxxxxx",
      	"added_to_cart_value": 2100,
      	"added_to_carts": 42,
      	"bid_type": "minimum_cost",
      	"budget_amount": 250,
      	"budget_optimization": "ad_campaign",
      	"budget_type": "daily",
      	"click_through_rate": 0.032,
      	"clicks": 1200,
      	"completed_registration_value": 0,
      	"completed_registrations": 28,
      	"contact_value": 0,
      	"contacts": 18,
      	"cost_per_added_to_cart": 17.86,
      	"cost_per_click": 0.63,
      	"cost_per_completed_registration": 26.79,
      	"cost_per_contact": 41.67,
      	"cost_per_lead": 30,
      	"cost_per_mille": 20,
      	"cost_per_purchase": 50,
      	"cost_per_result": 50,
      	"cost_per_schedule": null,
      	"cost_per_submitted_application": null,
      	"cost_per_unique_click": 0.74,
      	"cost_per_viewed_content": 1.25,
      	"created_at": "2026-06-01T12:00:00Z",
      	"custom_conversions": 10,
      	"custom_event_counts": {
      		"QualifiedCall": 7,
      		"BookedDemo": 3
      	},
      	"custom_event_values": {
      		"QualifiedCall": 3500,
      		"BookedDemo": 0
      	},
      	"delivery_status": "issues",
      	"frequency": 2.1,
      	"impressions": 37500,
      	"issues": [
      		{
      			"id": "adiss_xxxxxxxxxxx",
      			"message": "The ad's creative violates the ad network's policies. Edit the creative and resubmit for review.",
      			"resource_id": "adcamp_xxxxxxxxxx",
      			"resource_type": "ad_campaign"
      		}
      	],
      	"lead_value": 1250,
      	"leads": 25,
      	"objective": "sales",
      	"optimization_goal": "purchase",
      	"platform": "meta",
      	"purchase_value": 12600,
      	"purchases": 15,
      	"reach": 17800,
      	"result_event": "purchase",
      	"result_event_name": null,
      	"results": 15,
      	"return_on_ad_spend": 16.8,
      	"schedule_value": 0,
      	"schedules": 0,
      	"special_ad_categories": [],
      	"spend": 750,
      	"spend_currency": "usd",
      	"status": "active",
      	"submitted_application_value": 0,
      	"submitted_applications": 0,
      	"title": "Pickaxe Pro launch",
      	"unique_click_through_rate": 0.027,
      	"unique_clicks": 1010,
      	"updated_at": "2026-06-02T12:00:00Z",
      	"viewed_content_value": 0,
      	"viewed_contents": 600
      }
      ```
    </div>
  </Column>
</Columns>
