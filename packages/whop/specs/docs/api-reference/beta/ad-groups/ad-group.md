> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Ad Group

An Ad Group sits inside an [ad campaign](/api-reference/beta/ad-campaigns/ad-campaign) and controls delivery for [ads](/api-reference/beta/ads/ad). It sets the audience, placements, schedule, budget, and optimization goal for its ads.

Use the Ad Groups API to create ad groups in campaigns, list or retrieve targeting and delivery settings, update budgets or targeting, delete groups that should stop running, and pause or resume delivery. It can also search the ad platform's targeting taxonomy for options to target and estimate how many people a draft targeting spec can reach.

## Endpoints

| Endpoint                                                                           | Request                                                                         |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [List Ad Groups](/api-reference/beta/ad-groups/list-ad-groups)                     | <Badge color="blue" size="sm" stroke>GET</Badge> `/ad_groups`                   |
| [Create an Ad Group](/api-reference/beta/ad-groups/create-an-ad-group)             | <Badge color="green" size="sm" stroke>POST</Badge> `/ad_groups`                 |
| [Retrieve an Ad Group](/api-reference/beta/ad-groups/retrieve-an-ad-group)         | <Badge color="blue" size="sm" stroke>GET</Badge> `/ad_groups/{id}`              |
| [Update an Ad Group](/api-reference/beta/ad-groups/update-an-ad-group)             | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/ad_groups/{id}`          |
| [Delete an Ad Group](/api-reference/beta/ad-groups/delete-an-ad-group)             | <Badge color="red" size="sm" stroke>DELETE</Badge> `/ad_groups/{id}`            |
| [Duplicate an Ad Group](/api-reference/beta/ad-groups/duplicate-an-ad-group)       | <Badge color="green" size="sm" stroke>POST</Badge> `/ad_groups/{id}/duplicate`  |
| [Pause an Ad Group](/api-reference/beta/ad-groups/pause-an-ad-group)               | <Badge color="green" size="sm" stroke>POST</Badge> `/ad_groups/{id}/pause`      |
| [Unpause an Ad Group](/api-reference/beta/ad-groups/unpause-an-ad-group)           | <Badge color="green" size="sm" stroke>POST</Badge> `/ad_groups/{id}/unpause`    |
| [Estimate Ad Group Reach](/api-reference/beta/ad-groups/estimate-ad-group-reach)   | <Badge color="green" size="sm" stroke>POST</Badge> `/ad_groups/estimate_reach`  |
| [Search Targeting Options](/api-reference/beta/ad-groups/search-targeting-options) | <Badge color="blue" size="sm" stroke>GET</Badge> `/ad_groups/targeting_options` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Unique identifier for the ad group, prefixed `adgrp_`.
    </ResponseField>

    <ResponseField name="ad_campaign" type="object" required>
      The ad campaign this ad group belongs to.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          The referenced entity's id.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="added_to_cart_value" type="number" required>
      USD value attributed to add-to-cart events. Sums the value sent with each
      event, normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="added_to_carts" type="number" required>
      Whop pixel-attributed add-to-cart events, last-click.
    </ResponseField>

    <ResponseField name="audiences" type="object" required>
      Saved audiences this ad group delivers to or excludes.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="exclude" type="string[]" required>
          IDs of saved audiences excluded from delivery, prefixed `adaud_`.
        </ResponseField>

        <ResponseField name="include" type="string[]" required>
          IDs of saved audiences the ad group delivers to, prefixed `adaud_`.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="bid_type" type="string | null" required>
      How delivery bids are set in the ad auction. Target-based strategies use `desired_cost_per_result`.

      Available options: `minimum_cost`, `average_target`, `maximum_target`
    </ResponseField>

    <ResponseField name="budget_amount" type="number | null" required>
      This ad group's budget, in the ad account's currency. `null` when the budget
      is set on the campaign instead.
    </ResponseField>

    <ResponseField name="budget_type" type="string | null" required>
      Whether `budget_amount` is spent per day (`daily`) or over the ad group's full run (`lifetime`).

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

    <ResponseField name="conversion_event" type="string | null">
      The pixel event optimized for. A standard event, or any custom pixel event
      name.
    </ResponseField>

    <ResponseField name="conversion_location" type="string | null">
      Where the outcome being optimized for occurs, such as a website visit, social-profile visit, messaging conversation, ad interaction, or lead-form submission.

      Available options: `website`, `profile`, `instagram_and_facebook`, `instagram_profile`, `messaging`, `on_ad`, `instant_forms`, `instant_forms_and_messenger`, `website_and_instant_forms`
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
      When the ad group was created, as an ISO 8601 timestamp.
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
      Whether ads in this ad group are delivering right now, and if not, why. When several states apply at once, the highest-precedence one is returned.

      Available options: `all_ads_rejected`, `rejected`, `draft`, `no_ads`, `campaign_paused`, `paused`, `processing`, `issues`, `scheduled`, `completed`, `ads_off`, `learning_limited`, `learning`, `active`
    </ResponseField>

    <ResponseField name="demographics" type="object" required>
      Age, gender, and automatic-audience targeting.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="automatic" type="boolean" required>
          Whether automatic audience targeting is on (Advantage+ on Meta). When `true`,
          the platform can deliver beyond the ages, genders, and detailed targeting you
          set, treating them as suggestions.
        </ResponseField>

        <ResponseField name="gender" type="string" required>
          Gender targeted.

          Available options: `all`, `male`, `female`
        </ResponseField>

        <ResponseField name="maximum_age" type="number | null" required>
          Oldest age targeted. `null` when no maximum is set.
        </ResponseField>

        <ResponseField name="minimum_age" type="number | null" required>
          Youngest age targeted. `null` when no minimum is set.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="desired_cost_per_result" type="number | null" required>
      Cost per result to aim for (`average_target`) or never exceed
      (`maximum_target`). `null` for `minimum_cost` bidding.
    </ResponseField>

    <ResponseField name="detailed_targeting" type="object" required>
      Interest, behavior, and demographic targeting, using categories from the ad platform's targeting taxonomy. Entries across interests, behaviors, and demographics are OR'd together (anyone matching any entry is reached), matching Ads Manager's detailed-targeting box. Can't be combined with automatic audience targeting. Special ad category campaigns are limited to approved interests.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="behaviors" type="object[]" required>
          Behavior categories targeted, such as frequent travelers.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string" required>
              The ad platform's ID for the category in its targeting taxonomy.
            </ResponseField>

            <ResponseField name="behavior_type" type="string">
              On ad platforms that scope behavior categories, what this one is measured on. Send back the value the targeting\_options endpoint returned alongside the id. Absent on platforms that don't scope them.

              Available options: `video`, `creator`, `hashtag`
            </ResponseField>

            <ResponseField name="name" type="string">
              Category name, such as `Frequent travelers`.
            </ResponseField>

            <ResponseField name="period" type="number">
              On ad platforms that scope behavior categories, how many days of activity the category covers. Absent on platforms that don't scope them.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="demographics" type="object[]" required>
          Demographic categories targeted, such as life events, industries, work employers, job titles, schools, or majors. OR'd with interests and behaviors.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string" required>
              The ad platform's ID for the category in its targeting taxonomy.
            </ResponseField>

            <ResponseField name="name" type="string">
              Category name, such as `Recently moved`.
            </ResponseField>

            <ResponseField name="type" type="string" required>
              Kind of demographic the category belongs to.

              Available options: `life_events`, `industries`, `income`, `family_statuses`, `work_employers`, `work_positions`, `education_schools`, `education_majors`
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="interests" type="object[]" required>
          Interest categories targeted, such as an interest in movies.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string" required>
              The ad platform's ID for the category in its targeting taxonomy.
            </ResponseField>

            <ResponseField name="name" type="string">
              Category name, such as `Movies`.
            </ResponseField>
          </Accordion>
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="devices" type="object" required>
      Device platforms and operating systems targeted.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="operating_systems" type="object[]" required>
          Operating systems targeted. Empty targets all operating systems.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="minimum_version" type="string">
              Lowest OS version targeted, such as `18.0`. Absent when any version qualifies.
            </ResponseField>

            <ResponseField name="os" type="string" required>
              Operating system targeted.

              Available options: `ios`, `android`
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="platforms" type="string[]" required>
          Device types targeted. Empty targets all devices.

          Available options: `mobile`, `desktop`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="dynamic_creative" type="boolean">
      Whether the ad platform automatically mixes and matches this ad group's
      creatives and copy to find the best-performing combinations.
    </ResponseField>

    <ResponseField name="ends_at" type="string | null" required>
      When the ad group stops delivering, as an ISO 8601 timestamp. `null` when it
      runs until paused.
    </ResponseField>

    <ResponseField name="frequency" type="number | null" required>
      Platform-reported impressions divided by reach.
    </ResponseField>

    <ResponseField name="frequency_cap" type="object | null" required>
      Cap on how often one person sees ads from this ad group. Only available on campaigns with the `awareness` objective; `null` when uncapped.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="maximum_impressions" type="number" required>
          Most times one person can be shown ads from this ad group within the window.
        </ResponseField>

        <ResponseField name="per_days" type="number | null" required>
          Length of the rolling window, in days.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="impressions" type="number" required>
      The number of impressions.
    </ResponseField>

    <ResponseField name="issues" type="object[]" required>
      Open issues affecting this ad group and its ads. Empty when there are none.

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

    <ResponseField name="languages" type="string[]" required>
      Languages targeted, as ISO 639 codes such as `en` or `es`. A region-specific
      locale with no ISO code appears as its numeric platform locale key. Empty
      targets all languages.
    </ResponseField>

    <ResponseField name="lead_value" type="number" required>
      USD value attributed to lead events. Sums the value sent with each event,
      normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="leads" type="number" required>
      Whop pixel-attributed leads, last-click.
    </ResponseField>

    <ResponseField name="message_apps" type="string[]">
      Apps the conversation opens in when `conversion_location` is `messaging`. Empty for other conversion locations.

      Available options: `messenger`, `instagram`, `whatsapp`
    </ResponseField>

    <ResponseField name="minimum_daily_spend" type="number | null">
      Minimum the ad group tries to spend each day. `null` when no floor is set.
    </ResponseField>

    <ResponseField name="optimization_goal" type="string | null" required>
      The result the ad group's delivery is optimized to get the most of.

      Available options: `conversions`, `link_clicks`, `landing_page_views`, `reach`, `impressions`, `engagement`, `conversations`, `video_views`, `two_second_views`, `page_likes`, `social_profile`, `ad_recall_lift`, `event_responses`, `reminders_set`, `lead_generation`, `quality_lead`, `value`, `profile_and_page_engagement`
    </ResponseField>

    <ResponseField name="placements" type="object[]" required>
      Where ads can appear, per platform. Empty when placements are chosen automatically.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="platform" type="string" required>
          Publisher platform where the ad is eligible to appear.

          Available options: `facebook`, `instagram`, `messenger`, `audience_network`, `threads`, `whatsapp`
        </ResponseField>

        <ResponseField name="positions" type="string[]" required>
          Positions targeted within the platform, such as `feed` or `story`. Empty targets all of the platform's positions.
        </ResponseField>
      </Accordion>
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

    <ResponseField name="regions" type="object" required>
      Locations targeted and excluded.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="exclude" type="object" required>
          Locations excluded from targeting. Country groups can't be excluded.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="cities" type="object[]" required>
              Cities, keyed by the ad platform's location taxonomy.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="key" type="string" required>
                  The ad platform's key for the city in its location taxonomy.
                </ResponseField>

                <ResponseField name="name" type="string">
                  City name, such as `Austin`. Absent when the platform doesn't return one.
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="countries" type="string[]" required>
              Countries, as ISO 3166-1 alpha-2 codes such as `US`.
            </ResponseField>

            <ResponseField name="country_groups" type="string[]" required>
              Multi-country groups such as `worldwide` or `europe`.
            </ResponseField>

            <ResponseField name="custom_locations" type="object[]" required>
              Circular areas, each a coordinate plus a radius.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="distance_unit" type="string" required>
                  Unit for `radius`.

                  Available options: `mile`, `kilometer`
                </ResponseField>

                <ResponseField name="latitude" type="number" required>
                  Latitude of the center point.
                </ResponseField>

                <ResponseField name="longitude" type="number" required>
                  Longitude of the center point.
                </ResponseField>

                <ResponseField name="name" type="string">
                  Label for the location, such as a city or address. Absent when the location
                  has no label.
                </ResponseField>

                <ResponseField name="radius" type="number" required>
                  Radius around the center point, in `distance_unit`.
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="regions" type="string[]" required>
              US states and DC, as ISO 3166-2 codes such as `US-CA`. US territories (`PR`,
              `GU`, `VI`, `AS`, `MP`) and everywhere outside the US are targeted through
              `countries`.
            </ResponseField>

            <ResponseField name="zips" type="string[]" required>
              ZIP and postal codes, keyed by the ad platform's location taxonomy. Meta keys these `COUNTRY:CODE`, as `US:78756`.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="include" type="object" required>
          Locations the ad group targets.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="cities" type="object[]" required>
              Cities, keyed by the ad platform's location taxonomy.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="key" type="string" required>
                  The ad platform's key for the city in its location taxonomy.
                </ResponseField>

                <ResponseField name="name" type="string">
                  City name, such as `Austin`. Absent when the platform doesn't return one.
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="countries" type="string[]" required>
              Countries, as ISO 3166-1 alpha-2 codes such as `US`.
            </ResponseField>

            <ResponseField name="country_groups" type="string[]" required>
              Multi-country groups such as `worldwide` or `europe`.
            </ResponseField>

            <ResponseField name="custom_locations" type="object[]" required>
              Circular areas, each a coordinate plus a radius.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="distance_unit" type="string" required>
                  Unit for `radius`.

                  Available options: `mile`, `kilometer`
                </ResponseField>

                <ResponseField name="latitude" type="number" required>
                  Latitude of the center point.
                </ResponseField>

                <ResponseField name="longitude" type="number" required>
                  Longitude of the center point.
                </ResponseField>

                <ResponseField name="name" type="string">
                  Label for the location, such as a city or address. Absent when the location
                  has no label.
                </ResponseField>

                <ResponseField name="radius" type="number" required>
                  Radius around the center point, in `distance_unit`.
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="regions" type="string[]" required>
              US states and DC, as ISO 3166-2 codes such as `US-CA`. US territories (`PR`,
              `GU`, `VI`, `AS`, `MP`) and everywhere outside the US are targeted through
              `countries`.
            </ResponseField>

            <ResponseField name="zips" type="string[]" required>
              ZIP and postal codes, keyed by the ad platform's location taxonomy. Meta keys these `COUNTRY:CODE`, as `US:78756`.
            </ResponseField>
          </Accordion>
        </ResponseField>
      </Accordion>
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

    <ResponseField name="spend" type="number" required>
      The amount charged, in spend\_currency.
    </ResponseField>

    <ResponseField name="spend_currency" type="string | null" required>
      The ISO 4217 currency code of all monetary metrics.
    </ResponseField>

    <ResponseField name="starts_at" type="string | null" required>
      When the ad group starts delivering, as an ISO 8601 timestamp. `null` when it
      starts as soon as it's active.
    </ResponseField>

    <ResponseField name="status" type="string" required>
      Whether the ad group is enabled. `active` and `paused` are set by you; `rejected` means it failed ad review; `duplicating` is a copy still being filled in.

      Available options: `active`, `paused`, `rejected`, `duplicating`
    </ResponseField>

    <ResponseField name="submitted_application_value" type="number" required>
      USD value attributed to submit-application events. Sums the value sent with
      each event, normalized to USD; events without a value contribute 0.
    </ResponseField>

    <ResponseField name="submitted_applications" type="number" required>
      Whop pixel-attributed submit-application events, last-click.
    </ResponseField>

    <ResponseField name="title" type="string | null" required>
      Display name of the ad group.
    </ResponseField>

    <ResponseField name="unique_click_through_rate" type="number | null" required>
      Unique clicks divided by impressions, between 0 and 1.
    </ResponseField>

    <ResponseField name="unique_clicks" type="number" required>
      People who clicked, reported by the Whop pixel, counted once per person.
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the ad group was last updated, as an ISO 8601 timestamp.
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
      ```json AdGroup theme={null}
      {
      	"id": "adgrp_xxxxxxxxxxx",
      	"ad_campaign": {
      		"id": "adcamp_xxxxxxxxxx"
      	},
      	"added_to_cart_value": 1050,
      	"added_to_carts": 24,
      	"audiences": {
      		"exclude": [],
      		"include": ["adaud_xxxxxxxxxxx"]
      	},
      	"bid_type": "minimum_cost",
      	"budget_amount": 100,
      	"budget_type": "daily",
      	"click_through_rate": 0.036,
      	"clicks": 720,
      	"completed_registration_value": 0,
      	"completed_registrations": 16,
      	"contact_value": 0,
      	"contacts": 10,
      	"conversion_event": "purchase",
      	"conversion_location": "website",
      	"cost_per_added_to_cart": 8.33,
      	"cost_per_click": 0.28,
      	"cost_per_completed_registration": 12.5,
      	"cost_per_contact": 20,
      	"cost_per_lead": 13.33,
      	"cost_per_mille": 10,
      	"cost_per_purchase": 25,
      	"cost_per_result": 25,
      	"cost_per_schedule": null,
      	"cost_per_submitted_application": null,
      	"cost_per_unique_click": 0.33,
      	"cost_per_viewed_content": 0.67,
      	"created_at": "2026-06-01T12:00:00Z",
      	"custom_conversions": 5,
      	"custom_event_counts": {
      		"QualifiedCall": 4,
      		"BookedDemo": 1
      	},
      	"custom_event_values": {
      		"QualifiedCall": 2000,
      		"BookedDemo": 0
      	},
      	"delivery_status": "issues",
      	"demographics": {
      		"automatic": false,
      		"minimum_age": 21,
      		"maximum_age": 45,
      		"gender": "all"
      	},
      	"desired_cost_per_result": 30,
      	"detailed_targeting": {
      		"interests": [
      			{
      				"id": "6003139266461",
      				"name": "Movies"
      			}
      		],
      		"behaviors": [
      			{
      				"id": "6002714895372",
      				"name": "Frequent travelers",
      				"behavior_type": "video",
      				"period": 15
      			}
      		],
      		"demographics": [
      			{
      				"id": "6015559470583",
      				"name": "Recently moved",
      				"type": "life_events"
      			}
      		]
      	},
      	"devices": {
      		"platforms": ["mobile", "desktop"],
      		"operating_systems": [
      			{
      				"os": "ios",
      				"minimum_version": "18.0"
      			}
      		]
      	},
      	"dynamic_creative": false,
      	"ends_at": "2026-07-01T12:00:00Z",
      	"frequency": 1.6,
      	"frequency_cap": null,
      	"impressions": 20000,
      	"issues": [
      		{
      			"id": "adiss_xxxxxxxxxxx",
      			"message": "The audience is too narrow to deliver. Broaden the targeting to reach more people.",
      			"resource_id": "adgrp_xxxxxxxxxxx",
      			"resource_type": "ad_group"
      		}
      	],
      	"languages": ["en"],
      	"lead_value": 750,
      	"leads": 15,
      	"message_apps": [],
      	"minimum_daily_spend": 25,
      	"optimization_goal": "conversions",
      	"placements": [
      		{
      			"platform": "instagram",
      			"positions": ["stream", "story"]
      		}
      	],
      	"purchase_value": 5200,
      	"purchases": 8,
      	"reach": 12500,
      	"regions": {
      		"include": {
      			"countries": ["US"],
      			"country_groups": [],
      			"regions": ["US-CA"],
      			"cities": [
      				{
      					"key": "2418779",
      					"name": "Miami"
      				}
      			],
      			"zips": [],
      			"custom_locations": [
      				{
      					"latitude": 30.2672,
      					"longitude": -97.7431,
      					"radius": 10,
      					"distance_unit": "mile",
      					"name": "Austin, TX"
      				}
      			]
      		},
      		"exclude": {
      			"countries": [],
      			"country_groups": [],
      			"regions": [],
      			"cities": [
      				{
      					"key": "2421215",
      					"name": "Anchorage"
      				}
      			],
      			"zips": [],
      			"custom_locations": [
      				{
      					"latitude": 40.758,
      					"longitude": -73.9855,
      					"radius": 2,
      					"distance_unit": "mile",
      					"name": "Times Square"
      				}
      			]
      		}
      	},
      	"result_event": "purchase",
      	"result_event_name": null,
      	"results": 8,
      	"return_on_ad_spend": 26,
      	"schedule_value": 0,
      	"schedules": 0,
      	"spend": 200,
      	"spend_currency": "usd",
      	"starts_at": "2026-06-01T12:00:00Z",
      	"status": "active",
      	"submitted_application_value": 0,
      	"submitted_applications": 0,
      	"title": "US founders",
      	"unique_click_through_rate": 0.03,
      	"unique_clicks": 600,
      	"updated_at": "2026-06-02T12:00:00Z",
      	"viewed_content_value": 0,
      	"viewed_contents": 300
      }
      ```
    </div>
  </Column>
</Columns>
